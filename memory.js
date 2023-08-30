
function Memory() {this.nodes = {}; this.lastId = 0;};
const prefix = "node.";

Memory.prototype.saveNode = function(jsn) {
    try {
        localStorage.setItem(prefix + jsn.id, JSON.stringify(jsn));
        this.nodes[jsn.id] = jsn;
    }
    catch(e) {
        alert("Failed to save: " + e);
    }
};

Memory.prototype.loadNode = function(id) {
    let n = localStorage.getItem(prefix + id);
    if(n) {
        this.nodes[id] = JSON.parse(n);
    }
    
    return n;
};

Memory.prototype.nextId = function() {
    return ++this.lastId;
};

Memory.prototype.loadAllNodes = function() {
    for (var key in localStorage) {
        if(key.startsWith(prefix)) {
            var id = parseInt(key.substring(5));
            if(id > this.lastId) this.lastId = id;
            this.loadNode(id);
        }
    }
};
