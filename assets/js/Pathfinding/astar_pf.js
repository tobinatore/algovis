class AStar {
  constructor() {}

  async run(grid, start, end) {
    var openSet = [];
    this.resetGrid(grid);
    var start = grid[start.y][start.x];
    start.dist = 0;
    start.fScore = this.h(start, end);
    openSet.push(start);

    while (!openSet.length == 0) {
      var curr = this.findLowestFScore(openSet, end);
      curr.visited = true;
      await colorBlock(
        "#node-" + curr.row + "-" + curr.col,
        "#FF8B84",
        500,
        "fill"
      );
      if (curr.row == end.y && curr.col == end.x) {
        this.makePath(grid, end);

        break;
      }

      var nbs = this.getNeighbours(grid, curr);
      for (const nb in nbs) {
        var neighbour = nbs[nb];
        var inOpenSet =
          openSet.findIndex(
            (elem) => elem.x == neighbour.x && elem.y == neighbour.y
          ) == -1
            ? false
            : true;

        if (neighbour.visited) {
          continue;
        }

        var tentative_gScore =
          curr.dist + (neighbour.type == "weight" ? 10 : 1);

        if (inOpenSet && tentative_gScore >= nb.dist) {
          continue;
        }

        neighbour.dist = tentative_gScore;
        neighbour.predecessor = { col: curr.col, row: curr.row };
        neighbour.fScore = neighbour.dist + this.h(neighbour, end);

        if (!inOpenSet) {
          openSet.push(neighbour);
        }
      }
    }
  }

  h(node, end) {
    var manhDist = Math.abs(node.col - end.x) + Math.abs(node.row - end.y);
    return manhDist;
  }

  resetGrid(grid) {
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        grid[y][x].dist = Infinity;
        grid[y][x].fScore = Infinity;
        grid[y][x].predecessor = undefined;
        grid[y][x].visited = false;
        if (grid[y][x].type != "wall" && grid[y][x].type != "weight") {
          d3.select("#node-" + y + "-" + x).attr("fill", "#FFF");
        } else if (grid[y][x].type == "weight") {
          d3.select("#node-" + y + "-" + x).attr("fill", "#B0B0B0");
        }
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

  findLowestFScore(q, end) {
    var closest = { fScore: Infinity };
    var ind = 0;
    for (let i = 0; i < q.length; i++) {
      if (closest.fScore > q[i].fScore) {
        closest = q[i];
        ind = i;
      } else if (this.h(closest, end) > this.h(q[i], end)) {
        closest = q[i];
        ind = i;
      }
    }
    q.splice(ind, 1);
    return closest;
  }

  async makePath(grid, end) {
    await timeout(500);
    var list = [];
    var v = grid[end.y][end.x];
    list.unshift(v);
    while (v.predecessor != undefined) {
      await colorBlock("#node-" + v.row + "-" + v.col, "#cc1616", 250);
      v = grid[v.predecessor.row][v.predecessor.col];
      list.unshift(v);
    }
    list.unshift(v);
    console.log(v);
    this.makeHimRun(list);
  }

  async makeHimRun(list) {
    for (let i in list) {
      d3.select("#start")
        .transition()
        .duration(50)
        .attr("x", list[i].x)
        .attr("y", list[i].y);
      await timeout(50);
    }
    await timeout(200);
    var x = gridData[startPos.y][startPos.x].x;
    var y = gridData[startPos.y][startPos.x].y;
    d3.select("#start").attr("x", x).attr("y", y);
  }
}
