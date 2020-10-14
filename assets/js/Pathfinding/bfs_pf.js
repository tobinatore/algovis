/** Class for running a Breadth-first search on the grid */
class BFS {
  constructor() {}

  /**
   * Run the algorithm with the provided values.
   * @param {Object[][]} grid - A 2d array representing the grid the algorithm runs on
   * @param {Object} start - Row and column of the source node
   * @param {Object} end - Row and column of the target node
   */
  async run(grid, start, end) {
    this.resetGrid(grid);

    // declare "queue" for holding all unvisited nodes
    // and set distance of starting point to 0
    var q = [];
    grid[start.y][start.x].dist = 0;

    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        q.push(grid[y][x]);
      }
    }

    // run as long as there are nodes in the queue
    // or until target has been found
    while (!q.length == 0) {
      var v = this.findLeastDist(q);

      // current node is target node, highlight path
      // and break
      if (v.col == end.x && v.row == end.y) {
        this.makePath(grid, end, start);
        return;
      }

      var neighbours = getNeighbours(grid, v);

      // examine every neighbour of the current cell
      for (const n in neighbours) {
        var indInQ = q.findIndex(
          (elem) => elem.x == neighbours[n].x && elem.y == neighbours[n].y
        );

        // if the currently considered neighbour has not been
        // visited and it isn't a wall
        if (indInQ != -1 && neighbours[n].type != "wall") {
          var alt = v.dist + 1;
          // weight nodes do not get special treatment, however
          // they shouldn't be colored in either.
          if (neighbours[n].type != "weight") {
            await colorBlock(
              "#node-" + neighbours[n].row + "-" + neighbours[n].col,
              "#FF8B84",
              500,
              30,
              "fill"
            );
          }
          // current path to that node is shorter than the one pre-
          // viously found -> update node
          if (alt < neighbours[n].dist) {
            neighbours[n].dist = alt;
            neighbours[n].predecessor = { row: v.row, col: v.col };
          }
        }
      }
    }
  }

  /**
   * Resets the grid and every node to their initial state.
   * @param {Object[][]} grid - 2d array of objects representing the grid
   */
  resetGrid(grid) {
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        // reset distances, fScores and predecessors
        grid[y][x].dist = Infinity;
        grid[y][x].fScore = Infinity;
        grid[y][x].predecessor = undefined;
        // Reset the colors of floor and weight tiles
        if (grid[y][x].type != "wall" && grid[y][x].type != "weight") {
          d3.select("#node-" + y + "-" + x).attr("fill", "#FFF");
        } else if (grid[y][x].type == "weight") {
          d3.select("#node-" + y + "-" + x).attr("fill", "#B0B0B0");
        }
      }
    }
  }

  /**
   * Finds the node with the lowest total distance, removes it from the list
   * and returns it.
   * @param {Object[]} q - List of all unvisited nodes
   * @returns {Object} - The node with the lowest total distance
   */
  findLeastDist(q) {
    var closest = { dist: Infinity };
    var ind = 0;
    // step through the list of unvisited nodes and continually
    // update closest with the values of the closest node
    for (let i = 0; i < q.length; i++) {
      if (closest.dist > q[i].dist) {
        closest = q[i];
        ind = i;
      }
    }
    q.splice(ind, 1);
    return closest;
  }

  /**
   * Reads predecessors starting from the target node and colors the path.
   * @param {Object[][]} grid - 2d array of nodes representing the grid
   * @param {Object} end - Row and column of the target node
   */
  async makePath(grid, end) {
    await timeout(500);
    var list = [];
    var v = grid[end.y][end.x];
    list.unshift(v);
    // step through the predecessors until we hit the start node.
    // color every node on the way and save the path in a list.
    while (v.predecessor != undefined) {
      await colorBlock("#node-" + v.row + "-" + v.col, "#cc1616", 250, 15);
      v = grid[v.predecessor.row][v.predecessor.col];
      list.unshift(v);
    }
    list.unshift(v);
    // animate the stick figure
    makeHimRun(list);
  }
}
