/** Class for generating a maze using the growing tree algorithm. */
class GrowingTree {
  constructor() {}

  /**
   * Generates the maze using the growing tree algorithm.
   * @param {Object} cell - The starting cell, usually randomly chosen.
   */
  async startMaze(cell) {
    // filling the grid so the algorithm can carve out ways
    this.fillGrid();

    // declaring a list of unvisited cells
    // and a list of possible directions
    let cells = [];
    let dirs = [
      { dy: 0, dx: 2 },
      { dy: 2, dx: 0 },
      { dy: -2, dx: 0 },
      { dy: 0, dx: -2 },
    ];

    let width = gridData[0].length;
    let height = gridData.length;

    cells.push(cell);

    // running as long as there are unvisited cells left
    while (cells.length != 0) {
      // shuffling the list of directions
      dirs = this.shuffle(dirs);

      let index = Math.round(Math.random() * (cells.length - 1));

      let x = cells[index].x;
      let y = cells[index].y;

      gridData[y][x].type = "floor";
      await colorBlock("#node-" + y + "-" + x, "#fff", 100, 10);

      // looping over the list of directions to check for unvisited neighbours
      for (const direction in dirs) {
        let dx = dirs[direction].dx;
        let dy = dirs[direction].dy;

        let nx = x + dx;
        let ny = y + dy;

        // check if the cell in the current direction
        // is within bounds and unvisited
        if (
          nx > 0 &&
          ny > 0 &&
          nx < width &&
          ny < height &&
          gridData[ny][nx].type == "wall"
        ) {
          // set the cell to type "floor"
          // color it and add it to the list
          // of cells to check
          gridData[ny][nx].type = "floor";
          await colorBlock("#node-" + ny + "-" + nx, "#fff", 10, 0);

          // updating the cell between the other cells
          if (dx != 0) {
            gridData[y][x + dx / 2].type = "floor";
            await colorBlock(
              "#node-" + y + "-" + (x + dx / 2),
              "#fff",
              100,
              10
            );
          } else {
            gridData[y + dy / 2][x].type = "floor";
            await colorBlock("#node-" + (y + dy / 2) + "-" + x, "#fff", 10, 0);
          }

          cells.push({ x: nx, y: ny });
          index = undefined;
          break;
        }
      }
      // there were nor unvisited neighbours
      // -> delete cell from the list
      if (index != undefined) {
        cells.splice(index, 1);
      }
    }
  }

  /**
   * Fills the grid with walls as preparation for the algorithm.
   */
  fillGrid() {
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
  shuffle(array) {
    var j, x, i;
    for (i = array.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = array[i];
      array[i] = array[j];
      array[j] = x;
    }
    return array;
  }
}
