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

// ------------------------------------------------------------------------------------------
// Step #1: We are extending myObject by 'double' method
myObject.double = function () {
	var that = this;  // Step #2: workaround of the problem - creating that and assigning to this

	var helper = function () {
		that.value = add(that.value, that.value); // 5 + 5
	};

	helper(); // Step #3: we are invoking 'helper' as a function
};

// Step #4: we are invoking double as a method

myObject.double();
document.writeln('myObject.double(): ' + myObject.value); // 10

// ------------------------------------------------------------------------------------------
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
document.writeln('myQuo.get_status(): ' + myQuo.get_status()); // confused

// ------------------------------------------------------------------------------------------
// APPLY method (letting construct an array of object, which may be passed to invoking method and to
// choise of 'this' value.


// Creating an array of 2 numbers and add them to each other. 
var array = [3, 8];
var sum = add.apply(null, array); // 11
document.writeln('var sum = add.apply(null, array (var array = [3,8])): ' + sum);

// Creating an object containing property of 'status'
var statusObject = {
	status: 'A-OK'
};

// statusObject don't inheritance from Quo.prototype, but we can invoke (use) get_status() method
// upon the statusObject although it has no get_status itself. 
document.writeln('statusObject.status: ' + statusObject.status);	// 'A-OK
var status = Quo.prototype.get_status.apply(statusObject);
document.writeln('var status = Quo.prototype.get_status.apply(statusObject): ' + status);	// 'A-OK'

// ------------------------------------------------------------------------------------------
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

document.writeln('sum(4, 8, 15, 16, 23, 42): ' + sum(4, 8, 15, 16, 23, 42)); // 108

// ------------------------------------------------------------------------------------------
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

// document.writeln(add(3, 'n')); // functions.js:102 Uncaught {name: "TypeError", message: 
// "Function add needs numbers as arguments"}

// then object is passed to block of catch try's instruction:
var tryIt = function () {
	try {
		add(4, 'seven');
	} catch (e) {
		document.writeln(e.name + ': ' + e.message);
	}
}

tryIt(); // commented to let execute the rest of the code below

// ------------------------------------------------------------------------------------------
// Types' extension

// Extending Function.prototype we can make method of 'ourMethod' available to EVERY function! Pattern code below:
Function.prototype.ourMethod = function (name, func) {
	this.prototype[name] = func;
	return this;
}

// our own method 'integer' added to Number.prototype, rounded outputs to integer using either 'ceil' (when this < 0)
// or 'floor' methods (this > 0).
Number.ourMethod('integer', function () { // reference to Function.proprotype 'pattern' of extnding type function
	return Math[this < 0 ? 'ceil' : 'floor'](this);
});

document.writeln('(-10/3).integer(): ' + (-10/3).integer()); // -3
document.writeln('(10/3).integer(): ' + (10/3).integer()); // 3

// our own method to delete spaces from begining and end of string:
String.ourMethod('trim', function() {
	return this.replace(/^\s+|\s+$/g, '');
});

document.writeln('"      String without spaces at the begining and at the end  \".trim()      "');
document.writeln('"' + "      String without spaces at the begining and at the end   ".trim() + '"');

// ------------------------------------------------------------------------------------------
// Recursion (rekurencja) - function invokes itself (in)directly to solve big issue divided into smaller problems

var hanoi = function (disc, source, auxiliary, destination) {
	if (disc > 0) {
		hanoi(disc - 1, source, destination, auxiliary); // auxiliary = helper
		document.writeln(`Przenoszenie dysku ${disc} z ${source} do ${destination}`);
		hanoi(disc - 1, auxiliary, source, destination);
	}
}

hanoi(3, 'Source', 'Helper', 'Destination');


// Another example: We are defining walkTheDOM function which visits every node of the tree in order stated in
// HTML source, starting from pointed node, and invoking passed function on every node. walkTheDOM function
// invoking itself in order to transform (process) children nodes.
var walkTheDOM = function walk(node, func) {
	func(node);
	node = node.firstChild;
	while (node) {
		walk(node, func);
		node = node.nextSibling;
	}
};

// Now we are defining getElementByAttribute function which fetch attribute's name and optional value
// requiring matching. Then invoke walkTheDOM function, passing into it the function searching attribute by name 
// in particular node. Matched attributes are collecting into an array of results. 
var getElementByAttribute = function (attr, value) {
	var results = [];

	walkTheDOM(document.body, function (node) {
		var actual = node.nodeType === 1 && node.getAttribute(attr);
		if (typeof actual === 'string' && (actual ===  value || typeof value !== 'string')) {
			results.push(mode);
		}
	});

	return results;
}

// Tail recursion (rekurencja końcowa)

// We are creating factorial (silnia) function which uses tail recursion, because it returns the result of 
// executing itself. JS doesn't optimize such kind of invokes. 

var factorial = function factorial(i, a) {
	a = a || 1;
	if (i < 2) {
		return a;
	} else {
		return factorial(i - 1, a * i);
	}
};

document.writeln('factorial(4): ' + factorial(4)); // 24 

// ------------------------------------------------------------------------------------------
// SCOPE

var foo = function () {
	var a = 3, b = 5;
	console.log('#1 after foo() vars\' declaration: ' + a, b);
	var bar = function () {
		var b = 7, c = 11;
		// here a=3, b=7, c=11

		a += b + c; // here is an assignment
		// here a=21, b=7, c=11
		console.log('#2 after bar() vars\' declaration: ' + a, b, c);
	};

	// here a=3, b=5, c is undefined
	console.log('#3 outside bar(): ' + a, b);
	bar(); // if we won't invoke bar() function, a, b would have benn always equals to 3 and 5! 
	// here a=21, b=5, c is undefined!!!
	console.log('#4 after bar() has been invoked: ' + a, b);
};

foo();

// ------------------------------------------------------------------------------------------
// CLOSURES - domknięcia (kontynuacja przykładu z ww.)

var myObject = function () {
	var value = 0;

	// we will return in this function an object's literal instead of initializing an object by object's literal
	return {
		increment: function (inc) {
			value += typeof inc === 'number' ? inc : 1;
		},
		getValue: function () {
			return value;
		}
	}
}();

// ---

// we are creating quo function, which creates an object containing get_status method and private property 
// of 'status'

var quo = function (status) {
	return {
		get_status: function () {
			return status;			// status is private property now.
		}
	}
}

// creating an instance of quo

var myQuo = quo('Confused #2');
document.writeln('myQuo.get_status(): ' + myQuo.get_status()); 

// ---

// We are defining a function which sets the DOM's node color to yellow and then fade it into white. 

var fade = function (node) {
	var level = 1;
	var step = function () {
		var hex = level.toString(16);
		console.log('hex: ' + hex);
		node.style.background = '#FFFF' + hex + hex;
		if (level < 15) {
			level++;
			setTimeout(step, 100);
		}
	};
	setTimeout(step, 100);
};

fade(document.body);

// ---

var addTheHandlers = function (nodes) {
	var i;
	for (i = 0; i < nodes.length; i++) {
		nodes[i].onclick = function (i) {
			return function (e) {
				alert(i);
			};
		}(i);
	}
};

// ------------------------------------------------------------------------------------------
// MODULES

String.ourMethod('deentityify', function () {
	// tabela encji. Mapuje nazwy encji na odpowiadające im znaki.
	var entity = {
		quot: '"',
		lt: '<',
		gt: '>'
	};

	// zwraca metodę deentityify
	return function () {

	// To jest metoda deentityify. Wywołuje ona standardową metodę replace, wyszukując fragmentów tekstu
	// zaczynających się od '&' a kończących się na ';'. Jeśli znaki zawarte wewnątrz takiego fragmentu 
	// znajdują się w tabeli encji, cała encja jest zastępowana znakiem z tabeli. Funkcja używa regexp.

		return this.replace( /&([^&;]+);/g, function (a, b) {
			var r = entity[b];
			return typeof r === 'string' ? r : a; 
		}
		);
	};
}());

document.writeln('\'&lt;&quot;&gt;\.deentityify(): ' + '&lt;&quot;&gt;'.deentityify()); // <">

// ---

var serialMaker = function () {
	// tworzymy obiekt, który generuje niepowtarzające się identyfikatory. Id składa się z 2 części:
	// prefiksu i numeru sekwencyjnego. Obiekt posiada metody do ustawiania prefiksu i nr-u sekwencyjnego, oraz
	// metodę gensym, która generuje identyfikatory.

	var prefix = '';
	var seq = 0;
	return {
		set_prefix: function (p) {
			prefix = String(p);
		},
		set_seq: function (s) {
			seq = s;
		},
		gensym: function () {
			var result = prefix + seq;
			seq++;
			return result;
		}
	};
};

var seqer = serialMaker();
seqer.set_prefix('Q');
seqer.set_seq(1000);
var unique = seqer.gensym(); // generuje 'Q1000'

// ------------------------------------------------------------------------------------------
// KASKADOWE ŁĄCZENIE WYWOŁAŃ

// getElement('MyBoxDiv').
// 	move(350, 150).
// 	width(100).
// 	height(100).
// 	color('red').
// 	border('10px outset').
// 	padding('4px').
// 	appendText("Please wait").
// 	on('mousedown', function (m) {
// 		this.startDrag(m, this.getNinth(m));
// 	}).
// 	on('mousemove', 'drag').
// 	on('mouseup', 'stopDrag').
// 	later(2000, function () {
// 		this.
// 		color('yellow').
// 		setHTML('Hello!').
// 		slide(400, 40, 200, 200);
// 	}).
// 	tip('This window can be moved');


// ------------------------------------------------------------------------------------------
// FUNKCJA CURRY

Function.ourMethod('curry', function () {
	var slice = Array.prototype.slice,
	args = slice.apply(arguments),
	that = this;
	return function () {
		return that.apply(null, args.concat(slice.apply(arguments)));
	};
}); 

var add1 = add.curry(1);	// 1
document.writeln('Using a curry function - add1(6): ' + add1(6));  // 7


// ------------------------------------------------------------------------------------------
// MEMORIZATION

// ex. Fibonacci number, we use recursion function to compute the numbers and also the memorization.
var memorizer = function (memo, fundamental) {
	var shell = function (n) {
		var result = memo[n];
		if (typeof result !== 'number') {
			result = fundamental(shell, n);
			memo[n] = result;
		}
		return result;
	};
	return shell;
}

var fibonacci = memorizer([0, 1], function(shell, n) {
	return shell(n-1) + shell(n-2);
});

document.writeln('Fibonacci number (1-10): ');
for (var i = 0; i <= 10; i++) {
	document.writeln(i + ': ' + fibonacci(i));
}

// --- Factorial function rewritten using memorization:

var factorialMemo = memorizer([1,1], function(shell, n) {
	return n * shell(n-1);
});

document.writeln('factorialMemo(4): ' + factorialMemo(4));

// ------------------------------------------------------------------------------------------


// ------------------------------------------------------------------------------------------






