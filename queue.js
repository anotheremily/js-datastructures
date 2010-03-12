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
 * jslint settings: 
 * jslint white: true, onevar: true, undef: true, nomen: true, eqeqeq: true, 
 * plusplus: true, bitwise: true, regexp: true, strict: true, newcap: true, 
 * immed: true, maxlen: 80 
 */

/**
 * Requires stack.js
 */

/**
 * Queue data structure
 * A queue is a FIFO (first in) first out data structure. Items are added to 
 * the back of the queue, and items are removed from the front of the queue. 
 * 
 * For information on these data structures visit: 
 * http://www.cs.princeton.edu/introcs/43stack/ 
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
