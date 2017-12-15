document.writeln('Hello, world!');
document.writeln('cat'.toUpperCase());

// method named 'method' used to creating new methods.
Function.prototype.method = function (name, func) {
	this.prototype[name] = func;
	return this;
};

var MYAPP = {}; // global variable

var empty_object = {}
var stooge = {
	first_name: "Joe",
	"last-name": "Howard"
};

MYAPP.stooge = {
	first_name: "Joe",
	"last-name": "Howard"
};

// fetching data from the object
console.log('stooge 1: ' + JSON.stringify(stooge));
console.log(stooge.first_name); // "Joe"
console.log(stooge["last-name"]); // "Howard"
console.log(stooge["middle-name"]); // undefined (property not existing)
console.log(stooge.FIRST_NAME || "(brak)"); // brak

// modification
stooge.first_name = "Jerome";
// modification (adding new property)
stooge['middle-name'] = 'Lester';
console.log('stooge 2: ' + JSON.stringify(stooge)); // {first_name: "Jerome", last-name: "Howard", middle-name: "Lester"}

// reference - in JS objects are passed through the reference, never copied!
var x = stooge;
x.nickname = "Curly";
console.log('var x: ' + JSON.stringify(x)); // {first_name: "Jerome", last-name: "Howard", middle-name: "Lester", nickname: "Curly"}
console.log('stooge 3: ' + JSON.stringify(stooge));
var nick = stooge.nickname;
console.log('nick: ' + nick); // "Curly"
console.log('stooge 4: ' + JSON.stringify(stooge)); // {first_name: "Jerome", last-name: "Howard", middle-name: "Lester", nickname: "Curly"}
// nick has a value of 'Curly' because x and stooge are refferenced to the same object

// prototype

// beget method  is added to Object function. It creates new object, using old object as a prototype
if (typeof Object.beget !== 'function') {
	Object.beget = function(o) {
		var F = function () {};
		F.prototype = o;
		return new F();
	};
}
var another_stooge = Object.beget(stooge);
console.log(another_stooge); // without modification {"first_name":"Jerome","last-name":"Howard","middle-name":"Lester"}
console.log('Prototype -> another_stooge: ' + another_stooge);

// prototype doesn't influence on object's modification. During providing some changes to the
// object, prototype will be still unchanged:
another_stooge.first_name = "Harry";
another_stooge["middle-name"] = "Moses";
another_stooge.nickname = "Moe";

stooge.profession = "actor"; // added new property to prototype object.
console.log(another_stooge.profession); // actor (immidiately shown in another_stooge object)

// enumerating (random order - for in instruction)

for (var name in another_stooge) {
	if (typeof another_stooge[name] !== 'function') {
		document.writeln(name + ': ' + another_stooge[name]);
	}
}

// enumerating (our order - using an array)

var properties = [
	'last-name',
	'first_name',
	'middle-name',
	'profession'
];

for (var i = 0; i < properties.length; i++) {
	document.writeln(properties[i] + ': ' + another_stooge[properties[i]]);
}

// deleting 
console.log(another_stooge.nickname);
delete another_stooge.nickname; // deleting nickname property from another_stooge, exposing
								// property nickname from prototype!
console.log(another_stooge.nickname);



// nested objects
MYAPP.flight = {		// added directly to MYAPP global variable
	airline: "Oceanic",
	number: 815,
	departure: {
		IATA: "SYD",
		time: "2008-29-22 14:55",
		city: "Sydey"
	},
	arrival: {
		IATA: "LAX",
		time: "2008-29-23 18:55",
		city: "Los Angeles"
	}
};

// fetching data from object
console.log(MYAPP.flight);
console.log(MYAPP.flight.departure.IATA); // "SYD"
console.log(MYAPP.flight.status || "nieznany"); // nieznany

// attempt to fetch value from z undefined (ends up with TypeError)
console.log(MYAPP.flight.equipment); // undefined
// console.log(flight.equipment.model); // TypeError exception
console.log(MYAPP.flight.equipment && flight.equipment.model); // undefined - && returns 1st expression's value

// modification
MYAPP.flight.equipment = {
	model: 'Boeing 777'
};
MYAPP.flight.status = 'delayed';
MYAPP.flight.arrival.IATA = "LAX-modified";

console.log(MYAPP.flight);

// reference
var a = {}, b = {}, c = {}; // a,b,c are referrenced to independent empty objects
a = b = c = {}; // a,b,c are referrenced to the same empty objects.

// reflection
console.log(typeof MYAPP.flight.number); // number
console.log(typeof MYAPP.flight.status); // string
console.log(typeof MYAPP.flight.arrival); // object
console.log(typeof MYAPP.flight.manifest); // undefined

console.log(typeof MYAPP.flight.toString); // function
console.log(typeof MYAPP.flight.constructor); // function

console.log(MYAPP.flight.hasOwnProperty('number')); // true
console.log(MYAPP.flight.hasOwnProperty('constructor')); // false

console.log(MYAPP);