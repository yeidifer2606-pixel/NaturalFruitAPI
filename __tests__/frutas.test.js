
function validarFruta(fruta) {
    if (!fruta.nombre) return false;
    if (fruta.precio <= 0) return false;
    if (fruta.stock < 0) return false;
    if (!fruta.codigo.startsWith('FRU')) return false;
    return true;
}

function filtrarDisponibles(frutas) {
    return frutas.filter(f => f.stock > 0);
}

function calcularPrecioTotal(precio, cantidad) {
    return precio * cantidad;
}

test('Fruta válida pasa la validación', () => {
    const fruta = { nombre: 'Banano', precio: 1800, stock: 99, codigo: 'FRU001' };
    expect(validarFruta(fruta)).toBe(true);
});

test('Fruta sin nombre no es válida', () => {
    const fruta = { nombre: '', precio: 1800, stock: 99, codigo: 'FRU001' };
    expect(validarFruta(fruta)).toBe(false);
});

test('Fruta con precio negativo no es válida', () => {
    const fruta = { nombre: 'Banano', precio: -100, stock: 99, codigo: 'FRU001' };
    expect(validarFruta(fruta)).toBe(false);
});

test('Fruta con stock negativo no es válida', () => {
    const fruta = { nombre: 'Banano', precio: 1800, stock: -5, codigo: 'FRU001' };
    expect(validarFruta(fruta)).toBe(false);
});

test('Filtrar frutas disponibles excluye las agotadas', () => {
    const frutas = [
        { nombre: 'Banano', stock: 99 },
        { nombre: 'Fresa',  stock: 0  },
        { nombre: 'Mango',  stock: 55 }
    ];
    const disponibles = filtrarDisponibles(frutas);
    expect(disponibles).toHaveLength(2);
    expect(disponibles.find(f => f.nombre === 'Fresa')).toBeUndefined();
});

test('Calcular precio total por cantidad', () => {
    expect(calcularPrecioTotal(1800, 3)).toBe(5400);
});