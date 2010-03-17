/**
 * set.js
 * Set implementation in JavaScript
 * API from: http://en.wikipedia.org/wiki/Set_(computer_science)#Operations
 */
"use strict";

function Set() {
	this.reset();
}

/**
 * function union
 * Returns a union of this set and the set that is passed into it.
 * @param {Set} t
 * @return {Set} union of this and t
 */
Set.prototype.union = function (t) {
	var ret = new Set();
	t.
};

/**
 * function intersection
 * Returns an intersection of this set and the set that is passed into it.
 * @param {Set} t
 * @return {Set} intersection of this and t
 */
Set.prototype.intersection = function (t) {
};

/**
 * function difference
 * Returns an difference of this set and the set that is passed into it.
 * @param {Set} t
 * @return {Set} difference of this and t
 */
Set.prototype.difference = function (t) {
};

/**
 * function subset
 * Returns if the set that is passed in is a subset of this set.
 * @param {Set} t
 * @return {Boolean} true if it is a subset, false if not
 */
Set.prototype.subset = function (t) {
};

/**
 * 
 */
Set.prototype.sum = function () {
};

/**
 * 
 */
Set.prototype.nearest = function () {
};

/**
 * 
 */
Set.prototype.pop = function () {
};

/**
 * 
 */
Set.prototype.find = function (pred) {
};

/**
 * 
 */
Set.prototype.add = function (element) {
	if (this.elementOf(element) === false) {
		this.elements.push(element);
		return true;
	}
	return false;
};

/**
 * function remove()
 * Removes an element from a set
 * @param {Mixed} element to be removed
 * @return {Boolean} status of removal 
 */
Set.prototype.remove = function (element) {
	var status = false;
	this.elements.foreach(function (el, idx) {
		if (el === element) {
			this.elements.splice(idx, 1);
			status = true;
		}
	});
	return status;
};

/**
 * 
 */
Set.prototype.capacity = function () {
	return this.maxSize;
};

/**
 * 
 */
Set.prototype.pick = function () {
};

/**
 * 
 */
Set.prototype.elementOf = function (element) {
};

/**
 * 
 */
Set.prototype.empty = function () {
	return this.size === 0 ? true : false;
};

/**
 * 
 */
Set.prototype.size = function () {
	return this.size;
};

/**
 * 
 */
Set.prototype.enumerate = function () {
};

/**
 * 
 */
Set.prototype.pick = function () {
};

/**
 * 
 */
Set.prototype.build = function (elements) {
};

Set.prototype.toArray = function () {
	
}

/**
 * 
 */
Set.prototype.reset = function () {
	this.elements = [];
	this.size = 0;
	this.maxSize = 1000;
	this.name = '';
};