"use strict";
exports.__esModule = true;
exports.ColeccionPalabras = void 0;
// Iterador concreto que implementa varios algoritmos de iteracion
var Iterator = /** @class */ (function () {
    function Iterator(coleccion, reverse) {
        if (reverse === void 0) { reverse = false; }
        // Guarda la posicion actual
        this.position = 0;
        // Guarda la direccion transversal
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
// Las colecciones concretas proveen de uno o mas metodos para llamar a iteradores compatibles
var ColeccionPalabras = /** @class */ (function () {
    function ColeccionPalabras() {
        this.items = [];
    }
    ColeccionPalabras.prototype.setitems = function (lista) {
        this.items = lista;
    };
    ColeccionPalabras.prototype.getItems = function () {
        return this.items;
    };
    ColeccionPalabras.prototype.getCount = function () {
        return this.items.length;
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
var Aplicacion = /** @class */ (function () {
    function Aplicacion() {
        this.coleccion = new ColeccionPalabras;
    }
    Aplicacion.prototype.recorrer = function (lista) {
        this.coleccion.setitems(lista);
        this.iterador = this.coleccion.getIterator();
        return this.iterar(this.iterador);
    };
    Aplicacion.prototype.recorreralreves = function (lista) {
        this.coleccion.setitems(lista);
        this.iterador = this.coleccion.getReverseIterator();
        return this.iterar(this.iterador);
    };
    Aplicacion.prototype.iterar = function (iterador) {
        var lista = [];
        while (iterador.valid()) {
            lista.push(iterador.next());
        }
        return lista;
    };
    return Aplicacion;
}());
var aplicacion1 = new Aplicacion;
var lista1 = aplicacion1.recorrer(["a", "b", "c", "d"]);
var lista2 = aplicacion1.recorreralreves(["a", "b", "c", "d"]);
console.log(lista1);
console.log(lista2);
