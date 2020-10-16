/** Class for generating a maze using the growing tree algorithm. */
class GrowingTree {
  constructor() {}

  /**
   * Generates the maze using the growing tree algorithm.
   * @param {Object} cell - The starting cell, usually randomly chosen.
   */
  async startMaze(cell) {
    // filling the grid so the algorithm can carve out ways
    fillGrid();

    // declaring a list of unvisited cells
    // and a list of possible directions
    let cells = [];
    let dirs = this.populateDirections();

    let width = gridData[0].length;
    let height = gridData.length;

    cells.push(cell);

    // running as long as there are unvisited cells left
    while (cells.length != 0) {
      // shuffling the list of directions
      dirs = shuffle(dirs);

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
        if (this.cellValid(nx, ny, width, height)) {
          await this.updateCell(ny, nx, dy, dx, y, x);

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
   * Checks whether a cell can become a floor tile.
   * @param {number} nx - X-Coordinate of the cell
   * @param {number} ny - Y-Coordinate of the cell
   * @param {number} width - Width of the grid
   * @param {number} height - Height of the grid
   */
  cellValid(nx, ny, width, height) {
    return (
      nx > 0 &&
      ny > 0 &&
      nx < width &&
      ny < height &&
      gridData[ny][nx].type == "wall"
    );
  }

  /**
   * Sets the type of a cell to 'floor' and updates
   * its color on the grid.
   * @param {number} ny - Y-Coordinate of the cell
   * @param {number} nx - X-Coordinate of the cell
   * @param {number} dy - Y-offset of the currently evaluated direction
   * @param {number} dx - Xoffset of the currently evaluated direction
   * @param {number} y - Y-Coordinate of the previously checked cell
   * @param {number} x - X-Coordinate of the previously checked cell
   */
  async updateCell(ny, nx, dy, dx, y, x) {
    // set the cell to type "floor"
    // color it and add it to the list
    // of cells to check
    gridData[ny][nx].type = "floor";
    await colorBlock("#node-" + ny + "-" + nx, "#fff", 10, 0);

    // updating the cell between the other cells
    if (dx != 0) {
      gridData[y][x + dx / 2].type = "floor";
      await colorBlock("#node-" + y + "-" + (x + dx / 2), "#fff", 100, 10);
    } else {
      gridData[y + dy / 2][x].type = "floor";
      await colorBlock("#node-" + (y + dy / 2) + "-" + x, "#fff", 10, 0);
    }
  }

  /**
   * Builds the direction array.
   */
  populateDirections() {
    return [
      { dy: 0, dx: 2 },
      { dy: 2, dx: 0 },
      { dy: -2, dx: 0 },
      { dy: 0, dx: -2 },
    ];
  }
}
