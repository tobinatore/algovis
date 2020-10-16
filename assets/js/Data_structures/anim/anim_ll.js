/** @module LinkedListAnimation */

function pushAnimation(selection, pos) {
  // moving the whole selection to the right
  // and updating the id's to reflect the change in position
  d3.selectAll(selection)
    .transition()
    .duration(500)
    .attr("transform", function () {
      let transform = d3.select(this).attr("transform");
      if (transform == null) {
        return "translate( 150, 0)";
      } else {
        let currTranslate = transform.match(/^\d+|\d+\b|-\d+|\d+(?=\w)/g);
        let x = Number(currTranslate[0]) + 150;
        let y = currTranslate[1];
        return "translate(" + x + ", " + y + ")";
      }
    })
    .attr("id", function () {
      let currNum = Number(this.id.match(/^\d+|\d+\b|-\d+|\d+(?=\w)/i)[0]);
      let test = this.id.substring(0, this.id.length - 1) + (currNum + 1);
      return test;
    })
    .attr("class", "moved");

  // updating the y-Coordinate of the newly created node,
  // so it is in line with the other nodes. Also updating the id
  d3.select("#g" + list.length)
    .filter(function () {
      return !this.classList.contains("moved");
    })
    .transition()
    .duration(500)
    .attr("transform", "translate(0,-100)")
    .attr("id", "g" + pos);
}

/**
 * Function that pushes all nodes and arrows with indexes bigger than the
 * specified index one position to the right.
 * @param {number} pos - The index where the new node will be inserted
 */
async function pushNodes(pos) {
  // building a selection string for d3.js
  let selection = buildSelection(pos, false);
  pushAnimation(selection, pos);
  // calculating start and end point of the arrow
  // connecting the new node to the next node
  let xyVals = calcXYVals(pos);

  let xy0 = xyVals[0];
  let xy1 = xyVals[1];

  // animating the arrow
  // "line()" on line 73 is defined in anim_helpers.js
  d3.select("#path" + (list.length - 1))
    .filter(function () {
      return !this.classList.contains("moved");
    })
    .transition()
    .duration(500)
    .attr("d", line([xy0, xy1]))
    .attr("id", "path" + pos);

  // if the new node is not the head...
  if (pos != 0) {
    // ...animate the arrow connecting the
    // previous node to the new node
    let start = [(pos - 1) * 150 + 50, 50];
    let end = [pos * 150 + 50, 50];
    await slideArrow("#path" + (pos - 1), start, end);
  }

  await timeout(510);
  // remove the temporary classes used for filtering
  svg.selectAll("*").attr("class", null);
}

/**
 * Function that pulls all nodes and arrows with indexes bigger than the
 * specified index one position to the left.
 * @param {number} pos - The index where the new node will be after the deleted node
 */
async function pullNodes(pos) {
  let selection = buildSelection(pos, false);

  d3.selectAll(selection)
    .transition()
    .duration(500)
    .attr("transform", function () {
      let transform = d3.select(this).attr("transform");
      if (transform == null) {
        return "translate(-150, 0)";
      } else {
        let currTranslate = transform.match(/^\d+|\d+\b|-\d+|\d+(?=\w)/g);
        let x = Number(currTranslate[0]) - 150;
        let y = currTranslate[1];
        return "translate(" + x + ", " + y + ")";
      }
    })
    .attr("id", function () {
      let currNum = Number(this.id.match(/^\d+|\d+\b|-\d+|\d+(?=\w)/i)[0]);
      let test = this.id.substring(0, this.id.length - 1) + (currNum - 1);
      return test;
    });
}

/**
 * Function to remove an arrow from the SVG canvas.
 * @param {Object} pos - The index of the arrow.
 */
async function removeArrow(pos) {
  d3.select("#path" + pos)
    .transition()
    .duration(500)
    .style("opacity", 0);
  await timeout(510);
  d3.select("#path" + pos).remove();
}

/**
 * Function for highlighting which nodes and arrows
 * are currently getting checked.
 * @param {number} index - The index of the element to highlight.
 * @param {string} color - The highlight color (in hex -> eg. #CC1616)
 * @param {boolean} onlyNode - Signifies that only the corresponding node should be colored.
 */
async function highlight(index, color, onlyNode) {
  return new Promise((resolve) => {
    if (!onlyNode) {
      // color paths red
      d3.select("#path" + index)
        .transition()
        .duration(1000)
        .attr("stroke", color);
    }

    let circle = d3.select("#g" + index).select("circle");

    // stroke and fill circles red
    circle
      .transition()
      .duration(1000)
      .attr("fill", color)
      .attr("stroke", color);

    let text = d3.select("#g" + index).select("text");
    // color text inside of the circles white
    text.transition().duration(1000).attr("fill", "#FFF");
    setTimeout(() => {
      resolve();
    }, 1000);
  });
}

/**
 * Function for animating a new head getting added to the list.
 * @param {number} data - The data the new node contains.
 */
async function animateNewHead(data) {
  // coordinates are always the same for new heads
  let coords = [50, 150];
  // create node
  await newNode(coords, data, 0);
  // create arrow pointing to successor
  await newArrow({ x: 50, y: 150 }, { x: 50, y: 50 }, false);
  // move succeeding nodes and arrows to the right
  // and current node into position
  await pushNodes(0);
}

/**
 * Function for animating a new node getting added somewhere in the list.
 * @param {number} pos - Position in the list.
 * @param {number} data - Data the node contains.
 */
async function newMidNode(pos, data) {
  // calculate coordinates
  let coords = [pos * 150 + 50, 150];
  // create new node
  await newNode(coords, data, pos);
  await highlight(list.length, "#0DC1D9", true);
  await highlightCode(12);
  // create new arrow pointing to the node's successor
  await newArrow(
    { x: pos * 150 + 50, y: 150 },
    { x: pos * 150 + 50, y: 50 },
    false
  );
  // new coordinates for the arrow coming from the nodes predecessor
  let arrowStart = [(pos - 1) * 150 + 50, 50];
  let arrowEnd = [pos * 150 + 50, 150];
  // animate the arrow coming from the node's predecessor
  await highlightCode(13);
  await rerouteArrow("#path" + (pos - 1), arrowStart, arrowEnd);
  await timeout(1000);
  // move succeding nodes to the right.
  await pushNodes(pos);
  // update end point for the arrow coming from the predecessor
  arrowEnd = [pos * 150 + 50, 50];
  // animate the arrow sliding up with the node
  await slideArrow("#path" + (pos - 1), arrowStart, arrowEnd);
}
