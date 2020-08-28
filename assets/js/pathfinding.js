class Dijkstras {
  constructor() {}

  async run(grid, start, end) {
    var q = [];
    this.resetGrid(grid);
    grid[start.y][start.x].dist = 0;
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        q.push(grid[y][x]);
      }
    }

    while (!q.length == 0) {
      var v = this.findLeastDist(q);

      if (v.col == end.x && v.row == end.y) {
        this.makePath(grid, end, start);
        return;
      }

      var neighbours = this.getNeighbours(grid, v);

      for (const n in neighbours) {
        var indInQ = q.findIndex(
          (elem) => elem.x == neighbours[n].x && elem.y == neighbours[n].y
        );

        if (indInQ != -1 && neighbours[n].type != "wall") {
          var alt = v.dist + (neighbours[n].type == "weight" ? 10 : 1);
          if (neighbours[n].type != "weight") {
            await colorBlock(
              "#node-" + neighbours[n].row + "-" + neighbours[n].col,
              "#FF8B84",
              500,
              "fill"
            );
          }
          if (alt < neighbours[n].dist) {
            neighbours[n].dist = alt;
            neighbours[n].predecessor = { row: v.row, col: v.col };
          }
        }
      }
      //q.sort((a, b) => (a.dist > b.dist ? 1 : -1));
    }
  }

  resetGrid(grid) {
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        grid[y][x].dist = Infinity;
        grid[y][x].predecessor = undefined;
        if (grid[y][x].type != "wall" && grid[y][x].type != "weight")
          d3.select("#node-" + y + "-" + x).attr("fill", "#FFF");
      }
    }
  }

  getNeighbours(grid, v) {
    var nbs = [];

    if (v.col - 1 >= 0 && grid[v.row][v.col - 1]) {
      if (grid[v.row][v.col - 1].type != "wall")
        nbs.push(grid[v.row][v.col - 1]);
    }
    if (v.col + 1 < grid[0].length && grid[v.row][v.col + 1]) {
      if (grid[v.row][v.col + 1].type != "wall")
        nbs.push(grid[v.row][v.col + 1]);
    }
    if (v.row - 1 >= 0 && grid[v.row - 1][v.col]) {
      if (grid[v.row - 1][v.col].type != "wall")
        nbs.push(grid[v.row - 1][v.col]);
    }
    if (v.row + 1 < grid.length && grid[v.row + 1][v.col]) {
      if (grid[v.row + 1][v.col].type != "wall")
        nbs.push(grid[v.row + 1][v.col]);
    }

    return nbs;
  }

  findLeastDist(q) {
    var closest = { dist: Infinity };
    var ind = 0;
    for (let i = 0; i < q.length; i++) {
      if (closest.dist > q[i].dist) {
        closest = q[i];
        ind = i;
      }
    }
    q.splice(ind, 1);
    return closest;
  }

  async makePath(grid, end, start) {
    var v = grid[end.y][end.x];
    while (v.predecessor != undefined) {
      console.log(v);
      await colorBlock("#node-" + v.row + "-" + v.col, "#cc1616", 250);
      v = grid[v.predecessor.row][v.predecessor.col];
    }
    console.log(v);
  }
}
