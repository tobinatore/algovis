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
    resetGrid(grid);

    // declare "queue" for holding all unvisited nodes
    // and set distance of starting point to 0
    var q = makeQueueFromGrid(grid);
    grid[start.y][start.x].dist = 0;

    // run as long as there are nodes in the queue
    // or until target has been found
    while (!q.length == 0) {
      var v = this.findLeastDist(q);

      // current node is target node, highlight path
      // and break
      if (v.col == end.x && v.row == end.y) {
        makePath(grid, end, start);
        return;
      }

      var neighbours = getNeighbours(grid, v);

      // examine every neighbour of the current cell
      for (const n in neighbours) {
        var indInQ = findIndex(q, neighbours, n);

        // if the currently considered neighbour has not been
        // visited and it isn't a wall
        if (indInQ != -1 && neighbours[n].type != "wall") {
          var alt = v.dist + 1;
          // weight nodes do not get special treatment, however
          // they shouldn't be colored in either.
          if (neighbours[n].type != "weight") {
            await colorVisited(neighbours[n]);
          }
          // current path to that node is shorter than the one pre-
          // viously found -> update node
          if (alt < neighbours[n].dist) {
            updateNode(neighbours[n], v, alt);
          }
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

    return getClosestNode(q, closest, ind);
  }
}
