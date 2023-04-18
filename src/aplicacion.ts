import {ICollection, StringCollection} from './colecciones';
import {IIterator} from './iteradores';

export class Aplicacion {
    private coleccion: ICollection;
    private iterador: IIterator<string>;

    constructor() {
        this.coleccion = new StringCollection;
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
