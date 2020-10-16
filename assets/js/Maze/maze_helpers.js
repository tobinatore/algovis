/** @module MazeGenerationHelperFunctions */

/**
 * Fills the grid with walls as preparation for the algorithm.
 */
function fillGrid() {
  for (let y = 0; y < gridData.length; y++) {
    for (let x = 0; x < gridData[y].length; x++) {
      gridData[y][x].type = "wall";
      d3.select("#node-" + y + "-" + x)
        .transition()
        .duration(500)
        .attr("fill", "#171717");
    }
  }
}

/**
 * Fisher-Yates shuffle for shuffling the list of neighbouring cells.
 * @param {Object[]} array - The list of neighbouring cells
 * @returns {Object[]} - The shuffled list
 */
function shuffle(array) {
  var j, x, i;
  for (i = array.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = array[i];
    array[i] = array[j];
    array[j] = x;
  }
  return array;
}
