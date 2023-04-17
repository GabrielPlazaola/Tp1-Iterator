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
    setitems(lista: string[]): void;
    // Llama a un iterador externo
    getIterator(): IIterator<string>;
    getReverseIterator(): IIterator<string>;
    getIteratordeados(): IIterator<string>;
    getIteratordeadosimpar(): IIterator<string>;
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

class Iteratordeados implements IIterator<string> {
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

// Las colecciones concretas proveen de uno o mas metodos para llamar a iteradores compatibles

class ColeccionPalabras implements Aggregator {
    private items: string[] = [];

    setitems(lista: string[]): void{
        this.items = lista;
    }

    getItems(): string[] {
        return this.items;
    }

    getcount(): number {
        return this.items.length;
    }

    getIterator(): IIterator<string> {
        return new Iterator(this);
    }

    getReverseIterator(): IIterator<string> {
        return new Iterator(this, true);
    }

    getIteratordeados(): IIterator<string> {
        return new Iteratordeados(this);
    }

    getIteratordeadosimpar(): IIterator<string> {
        return new Iteratordeados(this, true);
    }
}

export class Aplicacion {
    private coleccion: Aggregator;
    private iterador: IIterator<string>;

    constructor() {
        this.coleccion = new ColeccionPalabras;
    }

    recorrer(lista: string[]) {
        this.coleccion.setitems(lista);
        this.iterador = this.coleccion.getIterator();
        return this.iterar(this.iterador);
    }

    recorreralreves(lista: string[]) {
        this.coleccion.setitems(lista);
        this.iterador = this.coleccion.getReverseIterator();
        return this.iterar(this.iterador);
    }

    recorrerdeados(lista: string[]) {
        this.coleccion.setitems(lista);
        this.iterador = this.coleccion.getIteratordeados();
        return this.iterar(this.iterador);
    }

    recorrerdeadosimpar(lista: string[]) {
        this.coleccion.setitems(lista);
        this.iterador = this.coleccion.getIteratordeadosimpar();
        return this.iterar(this.iterador);
    }

    private iterar(iterador: IIterator<string>) {
        var lista: string[] = [];
        while (iterador.valid()) {
            lista.push(iterador.next())
        }
        return lista
    }

}
