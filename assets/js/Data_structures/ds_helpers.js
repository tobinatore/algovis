/** @module DataStructuresHelperFunctions */

/**
 * Function which determines the index and node of a
 * (doubly) linked list which will either be the successor
 * of a new node or deleted.
 * @param {number} index - The index where to start
 * @param {number} pos - The target index
 * @param {Object} node - The node where the algorithm starts
 * @returns - The final index and list node
 */
async function getIndexAndCurrent(index, pos, node) {
  while (index != pos) {
    node = node.next;
    await highlightCode(15);
    await highlight(index, "#CC1616", false);
    await highlightCode(16);
    await timeout(200);
    index++;
  }
  return [index, node];
}
