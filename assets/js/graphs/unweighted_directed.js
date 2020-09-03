/** Class implementing an unweighted directed graph. */
class UnweightedDirectedGraph {
  /**
   * Initializes adjacency list of the graph.
   */
  constructor() {
    this.adjList = new Map();
  }

  /**
   * Adds a given vertex v to the adjacency list of the graph.
   * @param {number} v - The vertex which should be added
   */
  addVertex(v) {
    this.adjList.set(v, []);
  }

  /**
   * Adds a directed edge between two given vertices
   * @param {number} v - First vertex (source)
   * @param {number} w - Second vertex (target)
   */
  addEdge(v, w) {
    this.adjList.get(v).push(w);
  }

  /**
   * Checks if an edge exists between the two vertices.
   * @param {number} v - The first vertex
   * @param {number} w - The second vertex
   * @returns {boolean} - True if the edge exists, else false.
   */
  edgeExists(v, w) {
    var array = this.adjList.get(v);

    // edge can't exist if first vertex does not exist
    if (!array) return false;

    return array.indexOf(w) != -1 ? true : false;
  }

  /**
   * Returns the number of vertices in the graph.
   * @returns {number} - Number of vertices in the graph
   */
  getNoOfVertices() {
    return this.adjList.size;
  }

  /**
   * Returns the number of edges in the graph.
   * @returns {number} - The number of edges
   */
  getNoOfEdges() {
    var numEdges = 0;
    // count every edge in the graph
    for (let i in this.adjList) {
      numEdges += this.adjList.get(i).length;
    }

    return numEdges;
  }
}
