/** @module LinkedListAnimation */

/**
 * Function that pushes all nodes and arrows with indexes bigger than the
 * specified index one position to the right.
 * @param {number} pos - The index where the new node will be inserted
 */
async function pushNodes(pos) {
  let selection = "none";
  // building a selection string for d3.js
  for (let i = pos; i < list.length; i++) {
    selection += ", #g" + i;

    if (i < list.length - 1) {
      selection += ", #path" + i;
    }
  }

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

  // calculating start and end point of the arrow
  // connecting the new node to the next node
  let xy0 = {
    x: Math.round(xScale.invert(pos * 150 + 50)),
    y: Math.round(yScale.invert(50)),
  };

  let xy1 = {
    x: Math.round(xScale.invert((pos + 1) * 150 + 50)),
    y: Math.round(yScale.invert(50)),
  };

  var line = d3
    .line()
    .x(function (d) {
      return d.x;
    })
    .y(function (d) {
      return d.y;
    })
    .curve(d3.curveLinear);

  // animating the arrow
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
  let selection = "none";
  // building a selection string for d3.js
  for (let i = pos; i < list.length; i++) {
    selection += ", #g" + i;

    if (i < list.length - 1) {
      selection += ", #path" + i;
    }
  }

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
 * Function for creating a new arrow connecting two nodes.
 * @param {Object} startCoords - Coordinates of the first node.
 * @param {Object} endCoords - Coordinates of the second node.
 * @param {number} pos - The 'index' of the arrow.
 */
async function newArrow(startCoords, endCoords, pos) {
  return new Promise((resolve) => {
    // calculating start and end point
    let xy0 = {
      x: Math.round(xScale.invert(startCoords.x)),
      y: Math.round(yScale.invert(startCoords.y)),
    };

    let xy1 = {
      x: Math.round(xScale.invert(endCoords.x)),
      y: Math.round(yScale.invert(endCoords.y)),
    };

    var line = d3
      .line()
      .x(function (d) {
        return d.x;
      })
      .y(function (d) {
        return d.y;
      })
      .curve(d3.curveLinear);
    // creating line with arrow
    svg
      .select("#g-paths")
      .append("path")
      .transition()
      .duration(100)
      .attr("d", line([xy0, xy1]))
      .attr("stroke", "#171717")
      .attr("stroke-width", 4)
      .attr("marker-end", "url(#triangle)")
      .attr("fill", "none")
      .attr("id", function () {
        return "path" + (data_nodes.length - 2);
      });
    setTimeout(() => {
      resolve();
    }, 100);
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
 * Function for resetting the colors of all elements
 * after visualization has ended.
 */
async function resetColors() {
  return new Promise((resolve) => {
    // color paths black
    d3.selectAll("path").transition().duration(100).attr("stroke", "#171717");

    let circle = d3.selectAll("circle");
    let text = d3.selectAll("text");

    // color circles black and fill them white
    circle
      .transition()
      .duration(100)
      .attr("fill", "#FFF")
      .attr("stroke", "#171717");

    // color text black
    text.transition().duration(100).attr("fill", "#000");
    setTimeout(() => {
      resolve();
    }, 100);
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
  await newArrow({ x: 50, y: 150 }, { x: 50, y: 50 }, 0);
  // move succeeding nodes and arrows to the right
  // and current node into position
  await pushNodes(0);
}

/**
 * Function for animating a new ode getting added somewhere in the list.
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
    pos
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
