/** Class for running a Depth-first search on the grid */
class DFS {
  constructor() {}

  /**
   * Run the algorithm with the provided values.
   * @param {Object[][]} grid - A 2d array representing the grid the algorithm runs on
   * @param {Object} start - Row and column of the source node
   * @param {Object} end - Row and column of the target node
   */
  async run(grid, start, end) {
    // resetting the grid before every run
    resetGrid(grid);
    var node = grid[start.y][start.x];
    // calling the recursive dfs function and awaiting
    // the last node of the path
    var pathStart = await this.dfs(grid, end, [node]);
    this.makePath(grid, pathStart);
  }

  /**
   * A recursive function for running a depth-first search
   * on the provided grid.
   * @param {Object[][]} grid - A 2d array representing the grid the algorithm runs on
   * @param {Object} end - Row and column of the target node
   * @param {Object[]} stack - Stack of unvisited nodes
   * @returns {Object} - The target node
   */
  async dfs(grid, end, stack) {
    // run as long as there are unvisited nodes
    // or until target node has been found
    while (stack.length != 0) {
      var node = stack.pop();
      // only examine nodes that have not been seen before
      if (!node.visited) {
        if (node.row == end.y && node.col == end.x) {
          return node;
        }

        node.visited = true;
        // mark visited nodes in light red on the grid
        await colorVisited(node);

        // push other nodes to be considerated onto the stack
        if (
          node.row + 1 < grid.length &&
          grid[node.row + 1][node.col].type == "floor" &&
          grid[node.row + 1][node.col].visited != true
        ) {
          // node below current node
          stack.push(grid[node.row + 1][node.col]);
          grid[node.row + 1][node.col].predecessor = {
            col: node.col,
            row: node.row,
          };
        }
        if (
          node.col - 1 >= 0 &&
          grid[node.row][node.col - 1].type == "floor" &&
          grid[node.row][node.col - 1].visited != true
        ) {
          // node left of current node
          stack.push(grid[node.row][node.col - 1]);
          grid[node.row][node.col - 1].predecessor = {
            col: node.col,
            row: node.row,
          };
        }
        if (
          node.row - 1 >= 0 &&
          grid[node.row - 1][node.col].type == "floor" &&
          grid[node.row - 1][node.col].visited != true
        ) {
          // node above the current node
          stack.push(grid[node.row - 1][node.col]);
          grid[node.row - 1][node.col].predecessor = {
            col: node.col,
            row: node.row,
          };
        }
        if (
          node.col + 1 < grid[0].length &&
          grid[node.row][node.col + 1].type == "floor" &&
          grid[node.row][node.col + 1].visited != true
        ) {
          // node to the right of the current node
          stack.push(grid[node.row][node.col + 1]);
          grid[node.row][node.col + 1].predecessor = {
            col: node.col,
            row: node.row,
          };
        }
      }
    }
  }

  /**
   * Reads predecessors starting from the target node and colors the path.
   * @param {Object[][]} grid - 2d array of nodes representing the grid
   * @param {Object} end - Row and column of the target node
   */
  async makePath(grid, pathStart) {
    await timeout(500);
    var list = [];
    var v = pathStart;
    list.unshift(v);
    // step through predecessors until we hit the source node
    while (v.predecessor != undefined) {
      // color path red and add node to a list
      await colorBlock("#node-" + v.row + "-" + v.col, "#cc1616", 250, 15);
      v = grid[v.predecessor.row][v.predecessor.col];
      list.unshift(v);
    }
    list.unshift(v);
    // animate the stick figure
    makeHimRun(list);
  }
}
