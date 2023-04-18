import { Aplicacion } from '../src/aplicacion';

var aplicacion1 = new Aplicacion
var lista1: string[] = ["a", "b", "c", "d", "e"]

describe('testing index file', () => {
  test('recorrer', () => {   
    expect(aplicacion1.recorrer(lista1)).toEqual( ["a", "b", "c", "d", "e"] );
  });

  test('recorrer al reves', () => {   
    expect(aplicacion1.recorreralreves(lista1)).toEqual( ["e", "d", "c", "b", "a"] );
  });

  test('recorrer de a 2', () => {   
    expect(aplicacion1.recorrerdeados(lista1)).toEqual( ["a", "c", "e"] );
  });

  test('recorrer de a 2 impar', () => {   
    expect(aplicacion1.recorrerdeadosimpar(lista1)).toEqual( ["b", "d"] );
  });

  test('recorrer lista vacia', () => {   
    expect(aplicacion1.recorrer([])).toEqual( [] );
  });
});
