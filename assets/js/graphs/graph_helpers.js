/** @module GraphHelperFunctions */

/**
 * Function for calculating the lenght of an edge.
 * @param {Object} v - First vertex
 * @param {Object} w - Second vertex
 * @returns {number} - Lenght of the edge
 */
function calculateEdgeLength(v, w) {
  return Math.round(Math.sqrt(Math.pow(v.x - w.x, 2) + Math.pow(v.y - w.y, 2)));
}

/**
 * Function for retrieving the length of the edge
 * between two vertices.
 * @param {Object[]} array - List of nodes connected to the first vertex
 * @param {Object} v2 - The second vertex
 * @returns {number} - The length of the edge or -1 if it doesn't exist
 */
function findEdgelLength(array, v2) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].id === v2) {
      return array[i].len;
    }
  }
  return -1;
}

/**
 * Checks whether an edge exists between two vertices.
 * @param {Object[]} array - List of neighbours of first vertex
 * @param {Object} w - Second vertex
 * @returns {boolean} - True if edge exists, false if not
 */
function checkEdge(array, w) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].id === w) {
      return true;
    }
  }
  return false;
}
