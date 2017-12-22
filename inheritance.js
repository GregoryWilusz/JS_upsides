Function.prototype.method = function (name, func) {
	this.prototype[name] = func;
	return this;
}

Function.method('new', function () {
	// Tworzymy nowy obiekt dziedziczący z prototypu konstruktora
	var that = Object.beget(this.prototype);

	// Wywołujemy konstruktor, wiążąc this do nowego obiektu
	var other = this.apply(that, arguments); 

	// Jeśli zwracana wartość nie jest obiektem, podmień ją na nowo utworzony obiekt
	return (typeof other === 'object' && other) || that;
});

// Możemy zdefiniować konstruktor i rozszerzyć jego prototyp

var Mammal = function (name) {
	this.name = name;
};

Mammal.prototype.get_name = function () {
	return this.name;
};

Mammal.prototype.says = function () {
	return this.saying || '';
};

// Tworzymy instancję

var MyMammal = new Mammal('Ricky');
var name = MyMammal.get_name(); // 'Ricky'

document.writeln('MyMammal\'s name: ' + name);

// Następnie możemy utworzyć inną pseudoklasę dziedziczącą z Mammal, definiując jej konstruktor i zastępująć jej
// prototyp instancją Mammal:

var Cat = function (name) {
	this.name = name;
	this.saying = 'meow';
};

// Zastępujemy Cat.prototype instancją Mammal

Cat.prototype = new Mammal();

// Rozszerzamy nowy prototyp metodami purr i get_name:

Cat.prototype.purr = function (n) {
	var i, s = '';
	for(i = 0; i < n; i++) {
		if (s) {
			s += '-';
		}
		s += 'r';
	}
	return s;
};

Cat.prototype.get_name = function () {
	return this.says() + ' ' + this.name + ' ' + this.says();
};

var myCat = new Cat('Kitty');

var says = myCat.says(); // 'meow'
document.writeln('says: ' + says);

var purr = myCat.purr(5); // 'r-r-r-r-r'
document.writeln('purr(5): ' + purr);

var name = myCat.get_name();
document.writeln('myCat.get_name: ' + name);

// ----

Function.method('inherits', function (Parent) {
	this.prototype = new Parent;
	return this;
});

// Obie te metody zwracają this, więc możemy je wykorzystać przy łączeniu wywołań. Możemy teraz utworzyć nasz obiekt
// NewCat za pomocą jednej instrukcji:

var NewCat = function (name) {
	this.name = name;
	this.saying = 'MEOW';
}.
	inherits(Mammal).
	method('purr', function (n) {
		var i, s = '';
		for (i=0; i<n; i++) {
			if (s) {
				s += '-';
			}
			s += 'R';
		}
		return s;
	}).
	method('get_name', function () {
		return this.says() + ' ' + this.name + ' ' + this.says();
	});

	document.writeln(NewCat);