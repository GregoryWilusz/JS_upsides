document.writeln('Hello, world!');


// poniższa metoda o nazwie method będzie
// używana do tworzenia nowych metod

Function.prototype.method = function (name, func) {
	this.prototype[name] = func;
	return this;
};