/** Implementation of an unweighted undirected graph */
class UnweightedUndirectedGraph {
  /**
   * Initializes the adjacency list of the graph.
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
   * Adds an undirected edge between two given vertices
   * @param {number} v - First vertex
   * @param {number} w - Second vertex
   */
  addEdge(v, w) {
    // check whether edge already exists
    // only add it if this isn't the case.
    if (!this.edgeExists(v, w)) {
      this.adjList.get(v).push(w);
      this.adjList.get(w).push(v);
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
    // There can't be and edge,
    // if the first vertex doesn't exist
    if (!array) return false;
    // else check whether the index of the second
    // vertex in the list of neighbours is -1
    // return true if it isn't -1, else return false.
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
    // count the length of every entry in the
    // adjacency list
    for (let i in this.adjList) {
      numEdges += this.adjList.get(i).length;
    }

    // divide that number by 2
    // -> graph is undirected,
    // so every edge appears twice
    return numEdges / 2;
  }
}
