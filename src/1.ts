interface IIterator<T> {
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

interface Aggregator {
    // Llama a un iterador externo
    getIterator(): IIterator<string>;
    getReverseIterator(): IIterator<string>;
}

// Iterador concreto que implementa varios algoritmos de iteracion

class Iterator implements IIterator<string> {
    private coleccion: ColeccionPalabras;

    // Guarda la posicion actual
    private position: number = 0;

    // Guarda la direccion transversal
    private reverse: boolean = false;

    constructor(coleccion: ColeccionPalabras, reverse: boolean = false) {
        this.coleccion = coleccion;
        this.reverse = reverse;

        if (reverse) {
            this.position = coleccion.getCount() - 1;
        }
    }

    public rewind() {
        this.position = this.reverse ?
            this.coleccion.getCount() - 1 :
            0;
    }

    public current(): string {
        return this.coleccion.getItems()[this.position];
    }

    public key(): number {
        return this.position;
    }

    public next(): string {
        const item = this.current();
        this.position += this.reverse ? -1 : 1;
        return item;
    }

    public valid(): boolean {
        if (this.reverse) {
            return this.position >= 0;
        }

        return this.position < this.coleccion.getCount();
    }
}

// Las colecciones concretas proveen de uno o mas metodos para llamar a iteradores compatibles

export class ColeccionPalabras implements Aggregator {
    private items: string[] = [];

    public getItems(): string[] {
        return this.items;
    }

    public getCount(): number {
        return this.items.length;
    }

    public addItem(item: string): void {
        this.items.push(item);
    }

    public getIterator(): IIterator<string> {
        return new Iterator(this);
    }

    public getReverseIterator(): IIterator<string> {
        return new Iterator(this, true);
    }
}

export function iterar(iterador) {
    while (iterador.valid()) {
        console.log(iterador.next());
    }
}


const coleccion = new ColeccionPalabras();
coleccion.addItem('Primero');
coleccion.addItem('Segundo');
coleccion.addItem('Tercero');

const iterador = coleccion.getIterator();

console.log('Recta:');
iterar(iterador);

console.log('');
console.log('Reversa:');
const iteradorreversa = coleccion.getReverseIterator();
iterar(iteradorreversa);

const coleccion2 = new ColeccionPalabras();
coleccion2.addItem("1");
coleccion2.addItem("2");
coleccion2.addItem("3");
coleccion2.addItem("4");
coleccion2.addItem("5");

const iterador2 = coleccion2.getIterator();

console.log('Straight traversal:');
iterar(iterador2);

console.log('');
console.log('Reverse traversal:');
const iteradorreversa2 = coleccion2.getReverseIterator();
iterar(iteradorreversa2);
