"use strict";
/**
 * IIterator Design Pattern
 *
 * Intent: Lets you traverse elements of a coleccion without exposing its
 * underlying representation (list, stack, tree, etc.).
 */
exports.__esModule = true;
exports.iterar = exports.ColeccionNumeros = exports.ColeccionPalabras = exports.Iterator = void 0;
/**
 * Concrete Iterators implement various traversal algorithms. These classes
 * store the current traversal position at all times.
 */
var Iterator = /** @class */ (function () {
    function Iterator(coleccion, reverse) {
        if (reverse === void 0) { reverse = false; }
        /**
         * Stores the current traversal position. An iterador may have a lot of
         * other fields for storing iteration state, especially when it is supposed
         * to work with a particular kind of coleccion.
         */
        this.position = 0;
        /**
         * This variable indicates the traversal direction.
         */
        this.reverse = false;
        this.coleccion = coleccion;
        this.reverse = reverse;
        if (reverse) {
            this.position = coleccion.getCount() - 1;
        }
    }
    Iterator.prototype.rewind = function () {
        this.position = this.reverse ?
            this.coleccion.getCount() - 1 :
            0;
    };
    Iterator.prototype.current = function () {
        return this.coleccion.getItems()[this.position];
    };
    Iterator.prototype.key = function () {
        return this.position;
    };
    Iterator.prototype.next = function () {
        var item = this.current();
        this.position += this.reverse ? -1 : 1;
        return item;
    };
    Iterator.prototype.valid = function () {
        if (this.reverse) {
            return this.position >= 0;
        }
        return this.position < this.coleccion.getCount();
    };
    return Iterator;
}());
exports.Iterator = Iterator;
/**
 * Concrete Collections provide one or several methods for retrieving fresh
 * iterador instances, compatible with the coleccion class.
 */
var ColeccionPalabras = /** @class */ (function () {
    function ColeccionPalabras() {
        this.items = [];
    }
    ColeccionPalabras.prototype.getItems = function () {
        return this.items;
    };
    ColeccionPalabras.prototype.getCount = function () {
        return this.items.length;
    };
    ColeccionPalabras.prototype.addItem = function (item) {
        this.items.push(item);
    };
    ColeccionPalabras.prototype.getIterator = function () {
        return new Iterator(this);
    };
    ColeccionPalabras.prototype.getReverseIterator = function () {
        return new Iterator(this, true);
    };
    return ColeccionPalabras;
}());
exports.ColeccionPalabras = ColeccionPalabras;
var ColeccionNumeros = /** @class */ (function () {
    function ColeccionNumeros() {
        this.items = [];
    }
    ColeccionNumeros.prototype.getItems = function () {
        return this.items;
    };
    ColeccionNumeros.prototype.getCount = function () {
        return this.items.length;
    };
    ColeccionNumeros.prototype.addItem = function (item) {
        this.items.push(item);
    };
    ColeccionNumeros.prototype.getIterator = function () {
        return new Iterator(this);
    };
    ColeccionNumeros.prototype.getReverseIterator = function () {
        return new Iterator(this, true);
    };
    return ColeccionNumeros;
}());
exports.ColeccionNumeros = ColeccionNumeros;
function iterar(iterador) {
    while (iterador.valid()) {
        console.log(iterador.next());
    }
}
exports.iterar = iterar;
/**
 * The client code may or may not know about the Concrete IIterator or Collection
 * classes, depending on the level of indirection you want to keep in your
 * program.
 */
var coleccion = new ColeccionPalabras();
coleccion.addItem('Primero');
coleccion.addItem('Segundo');
coleccion.addItem('Tercero');
var iterador = coleccion.getIterator();
console.log('Recta:');
iterar(iterador);
console.log('');
console.log('Reversa:');
var iteradorreversa = coleccion.getReverseIterator();
iterar(iteradorreversa);
var coleccion2 = new ColeccionNumeros();
coleccion2.addItem(1);
coleccion2.addItem(2);
coleccion2.addItem(3);
coleccion2.addItem(4);
coleccion2.addItem(5);
var iterador2 = coleccion2.getIterator();
console.log('Straight traversal:');
iterar(iterador2);
console.log('');
console.log('Reverse traversal:');
var iteradorreversa2 = coleccion2.getReverseIterator();
iterar(iteradorreversa2);
