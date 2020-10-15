/** @module DSAnimationHelperFunctions */

/**
 * Function for calculating the lenght of an edge.
 * @param {Object} v - First vertex
 * @param {Object} w - Second vertex
 * @returns {number} - Lenght of the edge
 */
function calculateEdgeLength(v, w) {
  return Math.round(Math.sqrt(Math.pow(v.x - w.x, 2) + Math.pow(v.y - w.y, 2)));
}
