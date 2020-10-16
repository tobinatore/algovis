/** Class for generating a maze using the sidewinder algorithm */
class Sidewinder {
  constructor() {}

  /**
   * Function for running the sidewinder algorithm to generate a maze.
   * Works similiar to the binary tree generator but has the advantage
   * that only one side is a complete straight passage.
   */
  async startMaze() {
    var runStart = 0;
    // fill the grid with walls, so the algorithm can carve a way
    fillGrid();

    var height = gridData.length;
    var width = gridData[0].length;

    // loop over the whole grid, as the algorithm builds the maze row by row
    for (let y = 1; y < height - 1; y += 2) {
      runStart = 1;
      for (let x = 1; x < width - 1; x += 2) {
        // set the type of the current tile to 'floor'
        gridData[y][x].type = "floor";
        await colorBlock("#node-" + y + "-" + x, "#FFFFFF", 100, 10);

        // carve passages up, if at the last tile of the row or
        // a random number is 0
        if (y > 1 && (x + 1 == width - 1 || Math.round(Math.random()) == 0)) {
          // calculate position of the way up
          let cell = runStart + Math.round(Math.random() * (x - runStart));
          // make sure that the way up is positioned below a tile thats a floor
          // -> cell has to be odd of colCount is odd or even if colCount is even
          let colOdd = gridData[y].length % 2 != 0;

          if (colOdd) {
            cell = cell % 2 == 0 ? cell + 1 : cell;
          } else {
            cell = cell % 2 == 0 ? cell : cell + 1;
          }

          // set the type of the chosen tiles to 'floor'
          gridData[y][cell].type = "floor";
          await colorBlock("#node-" + y + "-" + cell, "#FFFFFF", 100, 10);
          gridData[y - 1][cell].type = "floor";
          await colorBlock("#node-" + (y - 1) + "-" + cell, "#FFFFFF", 100, 10);

          // next run starts at position current tile + 2
          runStart = x + 2;
        } else if (x + 1 < width - 1) {
          // set the tile to the left of the current tile to 'floor'
          gridData[y][x + 1].type = "floor";
          await colorBlock("#node-" + y + "-" + (x + 1), "#FFFFFF", 100, 10);
        }
      }
    }
  }
}
