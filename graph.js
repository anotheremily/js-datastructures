/**
 * graph.js
 * Lazy/Dirty Directed Graph
 *
 *
 * API Inspiration: http://dimacs.rutgers.edu/~berryj/manual/node106.html
 *
 * Methods:
 *
 * Vertex createVertex(data) - creates a vertex
 * Number addVertex(Vertex v) - adds a vertex
 * Boolean removeVertex(vid) - removes a vertex
 *
 * Number addEdge(Number v1id, Number v2id) - adds an edge
 * Boolean removeEdge(eid) - removes an edge
 *
 * Boolean persist() - persist the graph to the datastore
 * Void reset() - resets the graph
 *
 */
"use strict";

function Graph() {
    this.reset();
}

/**
 * addVertex()
 * Adds a vertex to the Graph
 * @param {Object} data to be stored in the vertex
 * @return {Mixed} vertex id or false on failure
 */
Graph.prototype.addVertex = function (v) {
	var vid = false;
	/**
	 * If the data is an object, save it and assign vid to the index of
	 * this new item in the array
	 */
	if (typeOf(v) === 'object') {
		/**
		 * Testing will need to be conducted to ensure that this is a safe
		 * operation. If items are removed from the array, then problems
		 * could arise with indexes.
		 */
		vid = this.vertices.push(v) - 1;
	}
	return vid;
};

/**
 * removeVertex()
 * Removes a vertex from the graph. The edges and paths containing the vertex
 * will remain in the Graph, but will point to undefined. Graph.clean() will
 * remove these references.
 * @param {Number} vertex id
 * @return {Boolean} true on removal, false if not removed (or already removed)
 */
Graph.prototype.removeVertex = function (vid) {
	return this.items.remove(vid);
};

/**
 * addEdge()
 * Position of first and second implies direction
 * @param {Number} Id for vertex 1
 * @param {Number} Id for vertex 2
 * @return {Mixed} Id of edge or false on failure.
 */
Graph.prototype.addEdge = function (v1, v2) {
	var eid = false;
	if (typeOf(v1) === 'number' && typeOf(v2) === 'number') {
		eid = this.edges.push([v1, v2]) - 1;
	}
	return eid;
};

/**
 * removeEdge()
 * Removes an edge from the graph
 */
Graph.prototype.removeEdge = function (eid) {
	return this.edges.remove(eid);
};

/**
 * addPath()
 * Adds a path to the graph
 */
Graph.prototype.addPath = function (edges) {
	var path = [], 
		pid = 0;
	if (typeOf(edges) === 'array') {
		edges.foreach(function (edge, idx) {
			var eid = 0;
			eid = this.addEdge(edge);
			path.push(eid);
		});
	}
	pid = this.paths.push(path) - 1;
	return pid;	
};

/**
 * removePath()
 * Removes a path to the graph
 */
Graph.prototype.removePath = function (pid) {
	return this.paths.remove(pid);
};

/**
 * clean()
 * Cleans the graph. Removes edges and paths with one or more member no longer
 * in the graph. 
 * @return {Number} count of edges/paths removed
 */
Graph.prototype.clean = function () {
	var ctr = 0;
	this.edges.foreach(function (edge, idx) {
	    if (edge[0] === undefined || edge[1] === undefined) {
		    this.edges[idx] = undefined;
		    ctr += 1;
	    }
	});
	
	this.paths.foreach(function (path, idx) {
		path.foreach(function (edge, eidx) {
			if (this.edges[edge] === undefined) {
				this.paths[idx] = undefined;
				ctr += 1;
			}
		});
	});
	return ctr;
};

/**
 * reset()
 * Reinitializes the graph
 */
Graph.prototype.reset = function () {
    /**
     * {Integer} maxSize
     * The max size of the graph. If size is exceeded, the least used entries
     * will be removed. If needed, they will be pulled back in with a database
     * call
     */
    this.maxSize = 1000;

    /**
     * {Array} vertices
     * Stored vertices (array of vertices with meta information with objects
     */
    this.vertices = [];

    /**
     * {Array} edges
     * Stored edges in the current graph (array of sets [vertex1,vertex2]
     */
    this.edges = [];

    /**
     * {Array} paths
     * Stored paths in the current graph (array of edges)
     */
    this.paths = [];
};