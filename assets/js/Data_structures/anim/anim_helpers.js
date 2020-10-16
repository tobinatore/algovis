/** @module DSAnimationHelperFunctions */

var line = d3
  .line()
  .x(function (d) {
    return d.x;
  })
  .y(function (d) {
    return d.y;
  })
  .curve(d3.curveLinear);

/**
 * Creates the SVG representation of a new node
 *  for a (doubly) linked list.
 * @param {number} pos - The "index" of the new node
 * @returns {Object} - The group of SVG elements
 */
function createSVGElems(pos) {
  var groups = svg
    .selectAll("circle")
    .data(data_nodes)
    .enter()
    .append("g")
    .attr("id", function (d, i) {
      return "g" + i;
    });
  // creating new circle
  groups
    .append("circle")
    .attr("cx", function (d) {
      return xScale(d.x);
    })
    .attr("cy", function (d) {
      return yScale(d.y);
    })
    .transition()
    .duration(500)
    .attr("r", radius)
    .attr("fill", "white")
    .attr("stroke", "#171717")
    .attr("stroke-width", strokeWidth)
    .attr("id", function (d, i) {
      return "circle" + pos;
    });

  return groups;
}

/**
 * Function for creating a new node in the linked list.
 * @param {number[]} coords - The coordinates where the new node will be created
 * @param {number} data - The data the node contains
 * @param {number} pos - The 'index' in the list
 */
async function newNode(coords, data, pos) {
  return new Promise((resolve) => {
    var newData = calculatePosition(coords);

    // Pushing coordinates to the array
    data_nodes.push(newData);

    // creating a new group to contain circle and text of the node
    let groups = createSVGElems(pos);

    // timeout, so the text appears when the circle is nearly finished
    setTimeout(() => {
      // creating the text
      groups
        .append("text")
        .text(data)
        .attr("id", function (d, i) {
          return "node-text" + pos;
        })
        .attr("x", function (d) {
          return xScale(d.x) - 8;
        })
        .attr("y", function (d) {
          return yScale(d.y) + 5;
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", "18px")
        .attr("font-weight", "bold");
    }, 300);

    setTimeout(() => {
      resolve();
    }, 350);
  }, 350);
}

/**
 * Function for animating an arrow going from one node to another.
 * @param {string} id - The id of the SVG element representing the arrow.
 * @param {number[]} start - The coordinates of the start point.
 * @param {number[]} end - The coordinates of the end point.
 */
async function rerouteArrow(id, start, end) {
  // calculating positions
  let xy0 = calculatePosition(start);

  let xy1 = {
    x: Math.round(xScale.invert(start[0] + 20)),
    y: Math.round(yScale.invert(start[1])),
  };

  let xy2 = calculatePosition(end);

  // animating the line
  d3.select(id)
    .attr("transform", "translate(0,0)")
    .attr("d", line([xy0, xy1]))
    .attr("marker-end", null)
    .transition()
    .duration(500)
    .attr("d", line([xy0, xy2]));

  await timeout(425);
  // adding the arrow head to the line
  d3.select(id).attr("marker-end", "url(#triangle)");
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
      d3.select("#path" + index + "-2")
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
 * Function for smoothly sliding an arrow between 2 positions.
 * Used for moving the arrow head with the node it points to.
 * @param {string} id - Id of the SVG element representing the arrow.
 * @param {number[]} start - Coordinates where the arrow starts.
 * @param {number[]} end - Coordinates where the arrow ends
 */
async function slideArrow(id, start, end) {
  // calculating start and end point
  let xy0 = {
    x: Math.round(xScale.invert(start[0])),
    y: Math.round(yScale.invert(start[1])),
  };

  let xy1 = {
    x: Math.round(xScale.invert(end[0])),
    y: Math.round(yScale.invert(end[1])),
  };

  // animating the arrow
  d3.select(id)
    .transition()
    .duration(500)
    .attr("d", line([xy0, xy1]));
}

/**
 * Function to delete an SVG element representing a node from the canvas.
 * @param {number} pos - The index of the element
 */
async function deleteNode(pos) {
  d3.select("#g" + pos)
    .transition()
    .ease(d3.easeExp)
    .duration(500)

    .attr("transform", function () {
      let transform = d3.select(this).attr("transform");
      if (transform == null) {
        return "translate(0, 60)";
      } else {
        let currTranslate = transform.match(/^\d+|\d+\b|-\d+|\d+(?=\w)/g);
        let x = Number(currTranslate[0]);
        return "translate(" + x + ", 60)";
      }
    })
    .style("opacity", 0);
  await timeout(510);
  d3.select("#g" + pos).remove();
}

/**
 * Function for resetting the colors of all linked list elements
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
 * Function for creating a new arrow connecting two nodes.
 * @param {Object} startCoords - Coordinates of the first node.
 * @param {Object} endCoords - Coordinates of the second node.
 * @param {boolean} opp - Whether an arrow facing the opposite direction should be created.
 */
async function newArrow(startCoords, endCoords, opp) {
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

    if (opp) {
      svg
        .select("#g-paths")
        .append("path")
        .transition()
        .duration(100)
        .attr("d", line([xy1, xy0]))
        .attr("stroke", "#171717")
        .attr("stroke-width", 4)
        .attr("marker-end", "url(#triangle)")
        .attr("fill", "none")
        .attr("id", function () {
          return "path" + (data_nodes.length - 2) + "-2";
        });
    }

    setTimeout(() => {
      resolve();
    }, 100);
  });
}

/**
 * Function for calculating the X and Y coordinates
 * between which a line will be drawn.
 * @param {number} pos - The "index" of the line
 */
function calcXYVals(pos) {
  let xy0 = {
    x: Math.round(xScale.invert(pos * 150 + 50)),
    y: Math.round(yScale.invert(50)),
  };

  let xy1 = {
    x: Math.round(xScale.invert((pos + 1) * 150 + 50)),
    y: Math.round(yScale.invert(50)),
  };

  return [xy0, xy1];
}

/**
 * Function for creating a selection string,
 * used to select nodes and arrows for pushing / pulling.
 * @param {number} pos - The position after which nodes / arrows are affected
 * @param {boolean} doubly - Signifies whether it's a doubly linked list
 * @returns {Stirng} - The selection string
 */
function buildSelection(pos, doubly) {
  let selection = "none";
  for (let i = pos; i < list.length; i++) {
    selection += ", #g" + i;

    if (i < list.length - 1) {
      selection += ", #path" + i;
      if (doubly) {
        selection += ", #path" + i + "-2";
      }
    }
  }

  return selection;
}

function calculatePosition(coords) {
  return {
    x: Math.round(xScale.invert(coords[0])),
    y: Math.round(yScale.invert(coords[1])),
  };
}
