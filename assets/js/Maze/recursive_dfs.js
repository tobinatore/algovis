/** Class for generating a maze using recursive DFS */
class RecursiveDFS {
  constructor() {}

  /**
   * Fills the whole grid with wall tiles and caals the
   * function which generates the maze.
   * @param {Object} cell - X and Y coordinates of the randomly chosen starting cell
   */
  async startMaze(cell) {
    fillGrid();
    await this.generateMaze(cell);
  }

  /**
   * Generates the maze by recursively calling itself
   * and carving out a random path.
   * @param {Object} cell - X and Y coordinates of the randomly chosen starting cell
   */
  async generateMaze(cell) {
    var x = cell.x;
    var y = cell.y;

    // Setting the starting cell to type 'floor'
    gridData[y][x].type = "floor";
    await colorBlock("#node-" + y + "-" + x, "#FFF", 100, 10);

    // getting the neighbouring cells in random order
    var neighbours = shuffle(this.getNeighbours(cell));

    // looping through the list of neighbours and recursively calling
    // this function to build a path through the grid
    for (const nb in neighbours) {
      if (this.adjacentRooms(neighbours[nb]) <= 2) {
        await this.generateMaze(neighbours[nb]);
      }
    }
  }

  /**
   * Returns the number of cells adjacent to the input cell which have the type 'floor'.
   * @param {Object} cell - X and Y coordinates of the cell whose neighbours we want
   * @returns {number} - Number of cells with type 'floor' adjacent to current cell
   */
  adjacentRooms(cell) {
    var x = cell.x;
    var y = cell.y;

    return this.adjacentDiagonal(x, y) + this.adjacentPerpendicular(x, y);
  }

  /**
   * Counts the number of diagonally adjacent cells of type "floor".
   * @param {number} x - X-Coordinate of the cell
   * @param {number} y - Y-Coordinate of the cell
   */
  adjacentDiagonal(x, y) {
    let adj = 0;
    if (x - 1 >= 0 && y - 1 >= 0 && gridData[y - 1][x - 1].type == "floor") {
      // top-left
      adj++;
    }
    if (
      x - 1 >= 0 &&
      y + 1 < gridData.length &&
      gridData[y + 1][x - 1].type == "floor"
    ) {
      // bottom-left
      adj++;
    }
    if (
      y - 1 >= 0 &&
      x + 1 < gridData[0].length &&
      gridData[y - 1][x + 1].type == "floor"
    ) {
      // top-right
      adj++;
    }
    if (
      y + 1 < gridData.length &&
      x + 1 < gridData[0].length &&
      gridData[y + 1][x + 1].type == "floor"
    ) {
      // bottom-right
      adj++;
    }

    return adj;
  }

  /**
   * Counts the number of perpendicular adjacent cells of type "floor".
   * @param {number} x - X-Coordinate of the cell
   * @param {number} y - Y-Coordinate of the cell
   */
  adjacentPerpendicular(x, y) {
    let adj = 0;
    if (x - 1 >= 0 && gridData[y][x - 1].type == "floor") {
      // left
      adj++;
    }

    if (x + 1 < gridData[0].length && gridData[y][x + 1].type == "floor") {
      // right
      adj++;
    }
    if (y - 1 >= 0 && gridData[y - 1][x].type == "floor") {
      //top
      adj++;
    }
    if (y + 1 < gridData.length && gridData[y + 1][x].type == "floor") {
      //bottom
      adj++;
    }
    return adj;
  }

  /**
   * Returns all cells adjacent to the currently examined cell.
   * @param {Object} cell - The node for which we want the neighbours
   * @returns {Object[]} -The list of adjacent cells
   */
  getNeighbours(cell) {
    var x = cell.x;
    var y = cell.y;

    var nbs = [];

    if (x - 1 >= 1 && gridData[y][x - 1]) {
      if (gridData[y][x - 1].type == "wall")
        // left
        nbs.push({ x: gridData[y][x - 1].col, y: gridData[y][x - 1].row });
    }
    if (x + 1 < gridData[0].length - 1 && gridData[y][x + 1]) {
      if (gridData[y][x + 1].type == "wall")
        //right
        nbs.push({ x: gridData[y][x + 1].col, y: gridData[y][x + 1].row });
    }
    if (y - 1 >= 1 && gridData[y - 1][x]) {
      if (gridData[y - 1][x].type == "wall")
        //top
        nbs.push({ x: gridData[y - 1][x].col, y: gridData[y - 1][x].row });
    }
    if (y + 1 < gridData.length - 1 && gridData[y + 1][x]) {
      if (gridData[y + 1][x].type == "wall")
        //bottom
        nbs.push({ x: gridData[y + 1][x].col, y: gridData[y + 1][x].row });
    }

    return nbs;
  }
}
