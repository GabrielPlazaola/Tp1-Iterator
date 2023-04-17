Para correr los tests se debe escribir 'npm test' en el root.

Código: ./src/index.ts
Test: ./tests/index.test.ts

export class ColeccionNumeros extends Coleccion implements Aggregator {
    private items: number[] = [];

    public getItems(): number[] {
        return this.items;
    }

    public getCount(): number {
        return this.items.length;
    }

    public addItem(item: number): void {
        this.items.push(item);
    }

    public getIterator(): IIterator<number> {
        return new Iterator(this);
    }

    public getReverseIterator(): IIterator<number> {
        return new Iterator(this, true);
    }
}