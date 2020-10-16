/** @module StackAnimation */

/**
 * Creates the visual representation of a single
 * stack element.
 * @param {number} pos - The index of the element on the stack
 * @returns {Object} - The finished groups of SVG elements
 */
function createStackSVG(pos) {
  // creating a new group to contain rect and text of the node
  var groups = svg
    .selectAll("rect")
    .data(data_nodes)
    .enter()
    .append("g")
    .attr("id", function (d, i) {
      return "g" + i;
    });
  // creating new rect
  groups
    .append("rect")
    .attr("x", function (d) {
      return xScale(d.x);
    })
    .attr("y", function (d) {
      return yScale(d.y);
    })
    .transition()
    .duration(500)
    .attr("width", "120px")
    .attr("height", "50px")
    .attr("fill", "white")
    .attr("stroke", "#171717")
    .attr("stroke-width", strokeWidth)
    .attr("id", function (d, i) {
      return "rect" + pos;
    });

  return groups;
}

/**
 * Adds the text with the data to a single stack element.
 * @param {Object} groups - The group of SVG elements
 *                          representing that part of the stack
 * @param {number} data - The data which the label displays
 * @param {number} pos - The index of the element on the stack
 */
function labelStackElement(groups, data, pos) {
  // creating the text
  groups
    .append("text")
    .text(data)
    .attr("id", function (d, i) {
      return "node-text" + pos;
    })
    .attr("x", function (d) {
      console.log();
      switch (String(data).length) {
        case 1:
          return xScale(d.x) + 57;
        case 2:
          return xScale(d.x) + 54;
        case 3:
          return xScale(d.x) + 51;

        default:
          return xScale(d.x) + 51;
      }
    })
    .attr("y", function (d) {
      return yScale(d.y) + 35;
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "18px")
    .attr("font-weight", "bold");
}

/**
 * Function for creating a new element on the stack.
 * @param {number[]} coords - The coordinates where the new element will be created
 * @param {number} data - The data the element contains
 */
async function newStackElement(coords, data) {
  return new Promise((resolve) => {
    let pos = stack.size;

    var newData = calculatePosition(coords);

    // Pushing coordinates to the array
    data_nodes.push(newData);
    let groups = createStackSVG(pos);
    // timeout, so the text appears when the rect is nearly finished
    setTimeout(() => {
      labelStackElement(groups, data, pos);
    }, 300);

    setTimeout(() => {
      resolve();
    }, 350);
  }, 350);
}

/**
 * Entry animation for new elements of the stack.
 * @param {number} pos - The index number of the element
 */
async function slideIntoPositionStack(pos) {
  d3.select("#g" + pos)
    .transition()
    .duration(300)
    .attr("transform", "translate(100,100)");
}

/**
 * Function to delete an SVG element representing a node from the canvas.
 */
async function deleteStackNode() {
  let pos = stack.size - 1;
  d3.select("#g" + pos)
    .transition()
    .ease(d3.easeExp)
    .duration(500)

    .attr("transform", "translate(0,0)")
    .style("opacity", 0);
  await timeout(510);
  d3.select("#g" + pos).remove();
  data_nodes.pop();
}

/**
 * Function which highlights the node returned by the peek function.
 */
async function peekStack() {
  let pos = stack.size - 1;
  d3.select("#rect" + pos)
    .transition()
    .duration(300)
    .attr("stroke", "#CC1616");
  setTimeout(() => {
    d3.select("#rect" + pos)
      .transition()
      .duration(300)
      .attr("stroke", "#171717");
  }, 500);
}
