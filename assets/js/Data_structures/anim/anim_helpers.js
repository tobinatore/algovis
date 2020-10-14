/** @module DSAnimationHelperFunctions */
/**
 * Function for creating a new node in the linked list.
 * @param {number[]} coords - The coordinates where the new node will be created
 * @param {number} data - The data the node contains
 * @param {number} pos - The 'index' in the list
 */
async function newNode(coords, data, pos) {
  return new Promise((resolve) => {
    var newData = {
      x: Math.round(xScale.invert(coords[0])),
      y: Math.round(yScale.invert(coords[1])),
    };

    // Pushing coordinates to the array
    data_nodes.push(newData);

    // creating a new group to contain circle and text of the node
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
  let xy0 = {
    x: Math.round(xScale.invert(start[0])),
    y: Math.round(yScale.invert(start[1])),
  };

  let xy1 = {
    x: Math.round(xScale.invert(start[0] + 20)),
    y: Math.round(yScale.invert(start[1])),
  };

  let xy2 = {
    x: Math.round(xScale.invert(end[0])),
    y: Math.round(yScale.invert(end[1])),
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
