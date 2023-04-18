import {IIterator, Iterator, Iteratordeados} from './iteradores';

export interface ICollection {
    setitems(lista: string[]): void;
    // Llama a un iterador externo
    getIterator(): IIterator<string>;
    getReverseIterator(): IIterator<string>;
    getIteratordeados(): IIterator<string>;
    getIteratordeadosimpar(): IIterator<string>;
}

// Las colecciones concretas proveen de uno o mas metodos para llamar a iteradores compatibles

export class StringCollection implements ICollection {
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
