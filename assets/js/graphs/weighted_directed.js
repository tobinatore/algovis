/** Class implementing a weighted directed graph */
class WeightedDirectedGraph {
  /** Initializes adjacency list */
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
   * Adds a directed weighted edge between two given vertices
   * @param {Object} v - First vertex
   * @param {Object} w - Second vertex
   */
  addEdge(v, w) {
    if (!this.edgeExists(v, w)) {
      // calculating length of the edge using the
      // distance formula d=√((x_2-x_1)²+(y_2-y_1)²)
      var length = calculateEdgeLenght(v, w);
      this.adjList.get(v.id).push({ id: w.id, len: length });
    }
  }

  /**
   * Checks if an edge exists between the two vertices.
   * @param {number} v - The first vertex
   * @param {number} w - The second vertex
   * @returns {boolean} - True if the edge exists, else false.
   */
  edgeExists(v, w) {
    var array = this.adjList.get(v);

    if (!array) return false;
    return checkEdge(array, w);
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
    for (let i in this.adjList) {
      numEdges += this.adjList.get(i).length;
    }

    return numEdges; // Directed Graph -> Every edge counts
  }

  /**
   * Returns the length of an edge defined by two vertices.
   * @param {number} v1 - The first vertex
   * @param {number} v2 - The second vertex
   * @returns {number} - The length of the edge or -1 if the edge doesn't exist
   */
  getEdgeLength(v1, v2) {
    var array = this.adjList.get(v1);
    return findEdgeLength(array, v2);
  }
}
