/** Class implementing a weighted undirected graph. */
class WeightedUndirectedGraph {
  /** Initializes adjacency list. */
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
   * Adds an undirected weighted edge between two given vertices
   * @param {Object} v - First vertex
   * @param {Object} w - Second vertex
   */
  addEdge(v, w) {
    // only add edge if it's not a duplicate
    if (!this.edgeExists(v, w)) {
      // calculate length of edge based on
      // the positions of the two vertices­
      var length = calculateEdgeLength(v, w);

      // add the edges to the adjacency list
      this.adjList.get(v.id).push({ id: w.id, len: length });
      this.adjList.get(w.id).push({ id: v.id, len: length });
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
    // vertex 1 does not exist
    // -> edge can't exist
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
    // count every egde in the adjacency list
    for (let i in this.adjList) {
      numEdges += this.adjList.get(i).length;
    }

    // divide number of edges by 2
    // as every edge appears twice (-> undirected  graph)
    return numEdges / 2;
  }

  /**
   * Find the other vertex of an edge based on one vertex.
   * @param {number} vertex - The known vertex the edge connects to
   * @returns {number} - The second vertex of the edge
   */
  getSecondVertex(vertex) {
    for (let i = 0; i < this.adjList.size; i++) {
      for (let j = 0; j < this.adjList.get(i).length; j++) {
        if (this.adjList.get(i)[j] == vertex) {
          return i;
        }
      }
    }
  }

  /**
   * Returns the length of an edge defined by two vertices.
   * @param {number} v1 - The first vertex
   * @param {number} v2 - The second vertex
   * @returns {number} - The length of the edge or -1 if the edge doesn't exist
   */
  getEdgeLength(v1, v2) {
    var array = this.adjList.get(v1);
    return findEdgelLength(array, v2);
  }
}
