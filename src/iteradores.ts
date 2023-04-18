import {Aggregator, ColeccionPalabras} from './colecciones'

export interface IIterator<T> {
    // Retorna elemento actual
    current(): T;

    // Retorna elemento actual y se mueve al siguiente
    next(): T;

    // Retorna la llave del elemento actual
    key(): number;

    // Chequea que la posicion actual sea valida
    valid(): boolean;

    // Reinicia al iterador a su primera posicion
    rewind(): void;
}

// Iterador concreto que implementa varios algoritmos de iteracion

export class Iterator implements IIterator<string> {
    private coleccion: ColeccionPalabras;

    // Guarda la posicion actual
    private position: number = 0;

    // Guarda la direccion transversal
    private reverse: boolean = false;

    constructor(coleccion: ColeccionPalabras, reverse: boolean = false) {
        this.coleccion = coleccion;
        this.reverse = reverse;

        if (reverse) {
            this.position = coleccion.getcount() - 1;
        }
    }

    rewind() {
        this.position = this.reverse ?
            this.coleccion.getcount() - 1 :
            0;
    }

    current(): string {
        return this.coleccion.getItems()[this.position];
    }

    key(): number {
        return this.position;
    }

    next(): string {
        const item = this.current();
        this.position += this.reverse ? -1 : 1;
        return item;
    }

    valid(): boolean {
        if (this.reverse) {
            return this.position >= 0;
        }

        return this.position < this.coleccion.getcount();
    }
}

export class Iteratordeados implements IIterator<string> {
    private coleccion: ColeccionPalabras;

    private position: number = 0;

    private impar: boolean = false;

    constructor(coleccion: ColeccionPalabras, impar: boolean = false) {
        this.coleccion = coleccion;
        this.impar = impar;

        if (impar) {
            this.position = 1;
        }
    }

    rewind() {
        this.position = this.impar ?
            1:
            0;
    }

    current(): string {
        return this.coleccion.getItems()[this.position];
    }

    key(): number {
        return this.position;
    }

    next(): string {
        const item = this.current();
        this.position += 2;
        return item;
    }

    valid(): boolean {
        return this.position < this.coleccion.getcount();
    }
}