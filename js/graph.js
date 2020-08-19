class UndirectedGraph{
    constructor(){
        this.adjList = new Map();
    }

    addVertex(v){
        this.adjList.set(v, []);
    }

    addEdge(v, w){ 
        
        if(!this.edgeExists(v,w)){
            this.adjList.get(v).push(w);
            this.adjList.get(w).push(v);
        }
    }

    edgeExists(v,w){
        var array = this.adjList.get(v);
    
        if(!array) return false;
        return (array.indexOf(w) != -1) ? true : false;
    }

    getNoOfVertices(){
        return this.adjList.length;
    }
};

class DirectedGraph{
    constructor(){
        this.adjList = new Map();
    }

    addVertex(v){
        this.adjList.set(v, []);
    }

    addEdge(v, w){
        this.adjList.get(v).push(w);
    }

    getNoOfVertices(){
        return this.adjList.length;
    }
}