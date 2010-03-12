/**
 * Copyright (c) 2010 Zach Young
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
 
/**
 * Stack, Queue, and Deque data structure
 * For information on a deque visit: 
 * http://www.cs.princeton.edu/introcs/43stack/ 
 */

/**
 * jslint settings: 
 * jslint white: true, onevar: true, undef: true, nomen: true, eqeqeq: true, 
 * plusplus: true, bitwise: true, regexp: true, strict: true, newcap: true, 
 * immed: true, maxlen: 80 
 */

/**
 * Stack data structure
 * A stack is a LIFO (last in first out) data structure where items are added 
 * to and removed from the top. 
 */
function Stack() {
    this.reset();
}

/**
 * pop
 * Returns (and removes) the first element off the top of the stack
 * @return {Mixed} item
 */
Stack.prototype.pop = function () {
    if (this.empty() !== true) {
        this.length -= 1;
        return this.items.pop();
    }
    return undefined;
};

/**
 * push
 * Pushes an element onto the top of the stack 
 * @param {Mixed} item
 * @return {Boolean} status
 */
Stack.prototype.push = function (item) {
    this.items.push(item);
    this.length += 1;
    return true;
};

/**
 * empty
 * Checks to see if the stack is empty
 * @return {Boolean} true on empty, false if not empty
 */
Stack.prototype.empty = function () {
    if (this.length === 0) {
        return true;
    }
    return false;
};

/**
 * reset
 * Resets the stack to be empty
 * @return {Boolean} status
 */
Stack.prototype.reset = function () {
    this.items = [];
    this.length = 0;
    return true;
};

/**
 * Queue data structure
 * A queue is a FIFO (first in) first out data structure. Items are added to 
 * the back of the queue, and items are removed from the front of the queue. 
 */
function Queue() {
    this.reset();
}

/**
 * dequeue
 * Returns (and removes) the first element from the front of the queue
 * @return {Mixed} item
 */
Queue.prototype.dequeue = function () {
    if (this.empty() !== true) {
        this.length -= 1;
        return this.items.shift();
    }
    return undefined;
};

/**
 * enqueue
 * Pushes an element onto the back of the queue 
 * @param {Mixed} item
 * @return {Boolean} status
 */
Queue.prototype.enqueue = function (item) {
    this.items.push(item);
    this.length += 1;
    return true;
};

Queue.prototype.empty = Stack.prototype.empty;
Queue.prototype.reset = Stack.prototype.reset;

/**
 * Deque data structure
 * A deque is a stack and queue where elements can be added and removed from
 * the front or the back.
 */
function Deque() {
    this.reset();
}
Deque.prototype.pop = Stack.prototype.pop;
Deque.prototype.push = Stack.prototype.push;
Deque.prototype.dequeue = Queue.prototype.dequeue;
Deque.prototype.enqueue = Queue.prototype.enqueue;
Deque.prototype.empty = Stack.prototype.empty;
Deque.prototype.reset = Stack.prototype.reset;