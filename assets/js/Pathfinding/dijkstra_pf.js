/** Class for running Dijkstra's algorithm on the grid */
class Dijkstras {
  constructor() {}

  /**
   * Run the algorithm with the provided values.
   * @param {Object[][]} grid - A 2d array representing the grid the algorithm runs on
   * @param {Object} start - Row and column of the source node
   * @param {Object} end - Row and column of the target node
   */
  async run(grid, start, end) {
    var q = makeQueueFromGrid(grid);
    // reset grid in case this isn't the first run
    this.resetGrid(grid);
    grid[start.y][start.x].dist = 0;

    // run as long as there are unvisited nodes
    while (!q.length == 0) {
      var v = this.findLeastDist(q);

      // current node is the target node
      // -> print path and break
      if (v.col == end.x && v.row == end.y) {
        makePath(grid, end, start);
        return;
      }

      // get adjacent nodes
      var neighbours = getNeighbours(grid, v);

      for (const n in neighbours) {
        // get index of neighbour in queue
        // or -1 if it is not an element of q
        var indInQ = findIndex(q, neighbours, n);

        // check if node has not been visited and is not a wall
        if (indInQ != -1 && neighbours[n].type != "wall") {
          // calculate new distance by adding either 1 or 10 (-> node is a weight)
          // to the current distance
          var alt = v.dist + (neighbours[n].type == "weight" ? 10 : 1);

          // only color the node pink if it isn't a weight
          // so the grey color of the weights is preserved
          if (neighbours[n].type != "weight") {
            await colorVisited(neighbours[n]);
          }

          // update distance and predecessor if new path is shorter
          if (alt < neighbours[n].dist) {
            updateNode(neighbours[n], v, alt);
          }
        }
      }
    }
  }
  /**
   * Resets the grid and every node.
   * @param {Object[][]} grid - 2d array of objects representing the grid
   */
  resetGrid(grid) {
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        // reset distances, fScores, predecessors and visited status
        grid[y][x].dist = Infinity;
        grid[y][x].fScore = Infinity;
        grid[y][x].predecessor = undefined;
        grid[y][x].visited = false;
        // reset colors
        if (grid[y][x].type != "wall" && grid[y][x].type != "weight") {
          // floor nodes are white
          d3.select("#node-" + y + "-" + x).attr("fill", "#FFF");
        } else if (grid[y][x].type == "weight") {
          // weigths are grey
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
    // initialize closest with a distance of infinity
    var closest = { dist: Infinity };
    var ind = 0;

    return getClosestNode(q, closest, ind);
  }
}
