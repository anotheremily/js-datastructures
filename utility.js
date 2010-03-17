/**
 * utility.js
 * A collection of utility functionality found on the Internet.
 * 
 * sources: 
 * http://javascript.crockford.com/remedial.html
 * http://www.svendtofte.com/code/curried_javascript/
 * http://www.svendtofte.com/code/usefull_prototypes/
 */

/**
 * source: http://javascript.crockford.com/remedial.html
 */
function typeOf(value) {
    var s = typeof value;
    if (s === 'object') {
        if (value) {
            if (typeof value.length === 'number' &&
                    !(value.propertyIsEnumerable('length')) &&
                    typeof value.splice === 'function') {
                s = 'array';
            }
        } else {
            s = 'null';
        }
    }
    return s;
}

/**
 * source: http://javascript.crockford.com/remedial.html
 */
function isEmpty(o) {
    var i;
    if (typeOf(o) === 'object') {
        for (i in o) {
            if (o[i] !== undefined && typeOf(o[i]) !== 'function') {
                return false;
            }
        }
    }
    return true;
}

/**
 * curry function
 * source: http://www.svendtofte.com/code/curried_javascript/
 */
function curry(func, args, space) {
    var n = func.length - args.length, //arguments still to come
        sa = Array.prototype.slice.apply(args); // saved accumulator array
    function accumulator(moreArgs, sa, n) {
        var saPrev = sa.slice(0), // to reset
            nPrev = n, // to reset
            i = 0,
            res;
        for (; i < moreArgs.length; i += 1, n -= 1) {
            sa[sa.length] = moreArgs[i];
        }
        if ((n - moreArgs.length) <= 0) {
            res = func.apply(space, sa);
            // reset vars, so curried function can be applied to new params.
            sa = saPrev;
            n  = nPrev;
            return res;
        } else {
            return function () {
                // arguments are params, so closure bussiness is avoided.
                return accumulator(arguments, sa.slice(0), n);
            };
        }
    }
    return accumulator([], sa, n);
}

/** 
 * curry function
 * better functionality than the one above i think
 * 
 * http://www.slideshare.net/douglascrockford/crockford-on-javascript-act-iii-function-the-ultimate
 *
 * usage:
 * var inc = curry( function add( a, b) {
 *     return a + b;
 * }, 1 );
 */
function curry(func) {
    var args = arguments.slice(1);
    return function () {
        return func.apply( null, 
                args.concat(arguments.slice()));
    };
}

/**
 * source: http://www.svendtofte.com/code/usefull_prototypes/
 */
Number.max = function (a, b) {
    return a < b ? b : a;
};

/**
 * source: http://www.svendtofte.com/code/usefull_prototypes/
 */
Number.min = function (a, b) {
    return a > b ? b : a;
};

/**
 * source: http://www.svendtofte.com/code/usefull_prototypes/
 */
Math.mod = function (val, mod) {
    if (val < 0) {
        while (val < 0) {
	        val += mod;
        }
        return val;
    } else {
        return val % mod;
    }
};

/**
 * String prototypes
 */

/**
 * source: http://javascript.crockford.com/remedial.html
 */
String.prototype.entityify = function () {
    return this.replace(/&/g, "&amp;").replace(/</g,
        "&lt;").replace(/>/g, "&gt;");
};

/**
 * source: http://javascript.crockford.com/remedial.html
 */
String.prototype.quote = function () {
    var c, i, l = this.length, o = '"';
    for (i = 0; i < l; i += 1) {
        c = this.charAt(i);
        if (c >= ' ') {
            if (c === '\\' || c === '"') {
                o += '\\';
            }
            o += c;
        } else {
            switch (c) {
            case '\b':
                o += '\\b';
                break;
            case '\f':
                o += '\\f';
                break;
            case '\n':
                o += '\\n';
                break;
            case '\r':
                o += '\\r';
                break;
            case '\t':
                o += '\\t';
                break;
            default:
                c = c.charCodeAt();
                o += '\\u00' + Math.floor(c / 16).toString(16) +
                    (c % 16).toString(16);
            }
        }
    }
    return o + '"';
};

/**
 * source: http://javascript.crockford.com/remedial.html
 */
String.prototype.supplant = function (o) {
    return this.replace(/{([^{}]*)}/g,
        function (a, b) {
            var r = o[b];
            return typeof r === 'string' || typeof r === 'number' ? r : a;
        }
    );
};

/**
 * source: http://www.svendtofte.com/code/usefull_prototypes/
 */
String.prototype.endsWith = function (str) {
    return (this.length - str.length) === this.lastIndexOf(str);
};

/**
 * source: http://www.svendtofte.com/code/usefull_prototypes/
 */
String.prototype.reverse = function () {
    var s = "",
        i = this.length;
    while (i > 0) {
        s += this.substring(i - 1, i);
        i -= 1;
    }
    return s;
};

/**
 * source: http://www.svendtofte.com/code/usefull_prototypes/
 * this trim was suggested by Tobias Hinnerup
 *
 * Crockford's version:
 * source: http://javascript.crockford.com/remedial.html
 * String.prototype.trim = function () {
 *     return this.replace(/^\s+|\s+$/g, "");
 * };
 */
String.prototype.trim = function () {
    return (this.replace(/^\s+/, '').replace(/\s+$/, ''));
};

/**
 * source: http://www.svendtofte.com/code/usefull_prototypes/
 */
String.prototype.toInt = function () {
    var a = [], 
        i = 0;
    for (; i < this.length; i += 1) {
        a[i] = this.charCodeAt(i);
    }
    return a;
};

/**
 * Array prototypes and helper functions
 */

/**
 * source: http://www.svendtofte.com/code/usefull_prototypes/
 */
Array.prototype.intArrayToString = function () {
    var a = '', 
        i = 0;
    for (; i < this.length; i += 1) {
        if (typeof this[i] !== "number") {
            throw new Error("Array must be all numbers");
        } else if (this[i] < 0) {
            throw new Error("Numbers must be 0 and up");
        }
        a += String.fromCharCode(this[i]);
    }
    return a;
};

/**
 * source: http://www.svendtofte.com/code/usefull_prototypes/
 */
Array.prototype.compareArrays = function (arr) {
    if (this.length !== arr.length) {
	    return false;
    }
    for (var i = 0; i < arr.length; i += 1) {
        if (this[i].compareArrays) { //likely nested array
            if (!this[i].compareArrays(arr[i])) {
	            return false;
            } else {
	            continue;
            }
        }
        if (this[i] !== arr[i]) {
	        return false;
        }
    }
    return true;
};

/**
 * source: http://www.svendtofte.com/code/usefull_prototypes/
 */
Array.prototype.map = function (fnc) {
    var a = new Array(this.length), 
        i = 0;
    for (; i < this.length; i += 1) {
        a[i] = fnc(this[i]);
    }
    return a;
};

/**
 * source: http://www.svendtofte.com/code/usefull_prototypes/
 */
Array.prototype.foldr = function (fnc, start) {
    var a = start, 
        i = this.length - 1;
    for (; i > -1; i -= 1) {
        a = fnc(this[i], a);
    }
    return a;
};

/**
 * source: http://www.svendtofte.com/code/usefull_prototypes/
 */
Array.prototype.foldl = function (fnc, start) {
    var a = start, 
        i = 0;
    for (; i < this.length; i += 1) {
        a = fnc(this[i], a);
    }
    return a;
};

/**
 * source: http://www.svendtofte.com/code/usefull_prototypes/
 */
Array.prototype.exists = function (x) {
	var i = 0;
    for (; i < this.length; i += 1) {
        if (this[i] === x) {
	        return true;
        }
    }
    return false;
};

/**
 * source: http://www.svendtofte.com/code/usefull_prototypes/
 */
Array.prototype.filter = function (fnc) {
    var a = [], 
        i = 0;
    for (; i < this.length; i += 1) {
        if (fnc(this[i])) {
            a.push(this[i]);
        }
    }
    return a;
};

/**
 * source: http://www.svendtofte.com/code/usefull_prototypes/
 */
Array.prototype.random = function () {
    return this[Math.floor((Math.random() * this.length))];
};

/** 
 * source: http://javascript.crockford.com/prototypal.html
 */
if (typeof Object.create !== 'function') {
    Object.create = function (o) {
        function F() {}
        F.prototype = o;
        return new F();
    };
}
