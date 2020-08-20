class UnweightedUndirectedGraph{
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

class UnweightedDirectedGraph{
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

class WeightedUndirectedGraph{
    constructor(){
        this.adjList = new Map();
    }

    addVertex(v){
        this.adjList.set(v, []);
    }

    addEdge(v, w){ 
        
        if(!this.edgeExists(v,w)){
            var length = Math.round(Math.sqrt(Math.pow((v.x - w.x),2)+Math.pow((v.y - w.y),2)));
            this.adjList.get(v.id).push({id:w.id, len:length});
            this.adjList.get(w.id).push({id:v.id, len:length});
        }
    }

    edgeExists(v,w){
        var array = this.adjList.get(v);
        if(!array) return false;
            
        for (let i=0; i<array.length; i++) {
            if (array[i].id === w) {
                return true;
            }
        }
            
        return false;        
    }

    getNoOfVertices(){
        return this.adjList.length;
    }

    getSecondVertex(vertex){
        for(let i = 0; i < this.adjList.size; i++){
            for (let j = 0; j < this.adjList.get(i).length; j++) {
                if(this.adjList.get(i)[j] == vertex){
                    return i;
                }
            }
        }
    }

    getEdgeLength(v1,v2){
        var array = this.adjList.get(v1);        
        for (let i=0; i<array.length; i++) {
            if (array[i].id === v2) {
              return array[i].len;
            }
          }
    }
};
