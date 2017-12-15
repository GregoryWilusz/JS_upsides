// function literal
var add = function (a, b) {
	return a + b;
};

// Create an object (myObject) with a properties of value and increment method.
// Method takes one optional parameter. If argument is not a 'number' then use default falue of 1

var myObject = {
	value: 0,
	increment: function (inc) {
		this.value += typeof inc === 'number' ? inc : 1;
	}
};

myObject.increment();
document.writeln(myObject.value); // 1

myObject.increment(2);
document.writeln(myObject.value); // 3

myObject.increment('n');
document.writeln(myObject.value); // 4

myObject.increment('aaa');
document.writeln(myObject.value); // 5

var sum = add(3, 4);
document.writeln('var sum = ' + sum);

// We are extending myObject by 'double' method
myObject.double = function () {
	var that = this; // workaround of the problem

	var helper = function () {
		that.value = add(that.value, that.value); // 5 + 5
	};

	helper(); // we are invoking 'helper' as a function
};

// we are invoking double as a method

myObject.double();
document.writeln(myObject.value); // 10

// The pattern of constructor's invoking
// Creating a constructor named Quo which conctructs an object containg a property of 'status'
var Quo = function (string) {
	this.status = string;
};

// Adding to all of Quo's instances public method called get_status
Quo.prototype.get_status = function () {
	return this.status;
};

// Then we instantiate of Quo

var myQuo = new Quo('confused'); 
document.writeln(myQuo.get_status()); // confused

// APPLY method
// Creating an array of 2 numers and add them to each other. 

var array = [3, 8];
var sum = add.apply(null, array); // 11
document.writeln(sum);

// Creating an object containing property of 'status'
var statusObject = {
	status: 'A-OK'
};

// statusObject don't inheritance from Quo.prototype, but we can invoke (use) get_status method
// upon the statusObject although it has no get_status itself. 

document.writeln(statusObject.status);	// 'A-OK
var status = Quo.prototype.get_status.apply(statusObject);
document.writeln(status);	// 'A-OK'

// ARGUMENTS

// Creating a function which add plenty of numbers
// Note: definition of the var sum inside function don't collide with var sum defined outide
// the function . Function 'sees' only internal variable.

var sum = function () {
	var i, sum = 0;
	for (i = 0; i < arguments.length; i += 1) {
		sum += arguments[i];
	}
	return sum;
};

document.writeln(sum(4, 8, 15, 16, 23, 42)); // 108

// Exceptions

var add = function (a, b) {
	if (typeof a !== 'number' || typeof b !== 'number') {
		throw {
			name: 'TypeError',
			message: 'Function add needs numbers as arguments'
		}
	}
	return a + b;
}

// document.writeln(add(3, 'n')); // functions.js:102 Uncaught {name: "TypeError", message: "Function add needs numbers as arguments"}

// then object is passed to block of catch try's instruction:
var tryIt = function () {
	try {
		add(4, 'seven');
	} catch (e) {
		document.writeln(e.name + ': ' + e.message);
	}
}

tryIt();

// Types' extension
Function.prototype.ourMethod = function (name, func) {
	this.prototype[name] = func;
	return this;
}

// our own method 'integer' added to Number.prototype, rounded outputs to integer using 'ceil'
// or 'floor' methods.
Number.method('integer', function () {
	return Math[this < 0 ? 'ceil' : 'floor'](this);
});

document.writeln((-10/3).integer()); // -3

// our own method to delete spaces from begining and end of string:
String.method('trim', function() {
	return this.replace(/^\s+|\s+$/g, '');
});

document.writeln('"' + "      String without spaces at the begining and at the end   ".trim() + '"');























