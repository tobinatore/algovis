class RecursiveDFS {
  constructor() {}

  async startMaze(cell) {
    this.fillGrid();
    await this.generateMaze(cell);
  }

  async generateMaze(cell) {
    var x = cell.x;
    var y = cell.y;
    gridData[y][x].type = "floor";
    await colorBlock("#node-" + y + "-" + x, "#FFF", 500);
    var neighbours = this.shuffle(this.getNeighbours(cell));
    for (const nb in neighbours) {
      if (this.adjacentRooms(neighbours[nb]) <= 2) {
        await this.generateMaze(neighbours[nb]);
      }
    }
  }

  adjacentRooms(cell) {
    var adj = 0;
    var x = cell.x;
    var y = cell.y;

    if (x - 1 >= 0 && gridData[y][x - 1].type == "floor") {
      adj++;
    }
    if (x - 1 >= 0 && y - 1 >= 0 && gridData[y - 1][x - 1].type == "floor") {
      adj++;
    }
    if (
      x - 1 >= 0 &&
      y + 1 < gridData.length &&
      gridData[y + 1][x - 1].type == "floor"
    ) {
      adj++;
    }
    if (
      y - 1 >= 0 &&
      x + 1 < gridData[0].length &&
      gridData[y - 1][x + 1].type == "floor"
    ) {
      adj++;
    }
    if (
      y + 1 < gridData.length &&
      x + 1 < gridData[0].length &&
      gridData[y + 1][x + 1].type == "floor"
    ) {
      adj++;
    }
    if (x + 1 < gridData[0].length && gridData[y][x + 1].type == "floor") {
      adj++;
    }
    if (y - 1 >= 0 && gridData[y - 1][x].type == "floor") {
      adj++;
    }
    if (y + 1 < gridData.length && gridData[y + 1][x].type == "floor") {
      adj++;
    }

    return adj;
  }

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

  getNeighbours(cell) {
    var x = cell.x;
    var y = cell.y;

    var nbs = [];

    if (x - 1 >= 1 && gridData[y][x - 1]) {
      if (gridData[y][x - 1].type == "wall")
        nbs.push({ x: gridData[y][x - 1].col, y: gridData[y][x - 1].row });
    }
    if (x + 1 < gridData[0].length - 1 && gridData[y][x + 1]) {
      if (gridData[y][x + 1].type == "wall")
        nbs.push({ x: gridData[y][x + 1].col, y: gridData[y][x + 1].row });
    }
    if (y - 1 >= 1 && gridData[y - 1][x]) {
      if (gridData[y - 1][x].type == "wall")
        nbs.push({ x: gridData[y - 1][x].col, y: gridData[y - 1][x].row });
    }
    if (y + 1 < gridData.length - 1 && gridData[y + 1][x]) {
      if (gridData[y + 1][x].type == "wall")
        nbs.push({ x: gridData[y + 1][x].col, y: gridData[y + 1][x].row });
    }

    return nbs;
  }

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
}
