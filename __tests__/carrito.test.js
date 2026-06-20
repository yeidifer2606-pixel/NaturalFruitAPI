// Pruebas unitarias - Módulo Carrito
// Proyecto: Natural Fruit - Pulpería de Frutas

function agregarProducto(carrito, producto) {
    const existe = carrito.find(p => p.id === producto.id);
    if (existe) {
        return carrito.map(p =>
            p.id === producto.id
                ? { ...p, cantidad: p.cantidad + 1 }
                : p
        );
    }
    return [...carrito, { ...producto, cantidad: 1 }];
}

function quitarProducto(carrito, id) {
    return carrito
        .map(p => p.id === id ? { ...p, cantidad: p.cantidad - 1 } : p)
        .filter(p => p.cantidad > 0);
}

function calcularTotal(carrito) {
    return carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
}

test('Agregar producto nuevo al carrito', () => {
    const carrito = [];
    const producto = { id: 1, nombre: 'Banano', precio: 1800 };
    const resultado = agregarProducto(carrito, producto);
    expect(resultado).toHaveLength(1);
    expect(resultado[0].nombre).toBe('Banano');
});

test('Agregar producto existente aumenta la cantidad', () => {
    const carrito = [{ id: 1, nombre: 'Banano', precio: 1800, cantidad: 1 }];
    const resultado = agregarProducto(carrito, { id: 1, nombre: 'Banano', precio: 1800 });
    expect(resultado[0].cantidad).toBe(2);
});

test('Quitar producto reduce la cantidad', () => {
    const carrito = [{ id: 1, nombre: 'Banano', precio: 1800, cantidad: 2 }];
    const resultado = quitarProducto(carrito, 1);
    expect(resultado[0].cantidad).toBe(1);
});

test('Quitar producto con cantidad 1 lo elimina del carrito', () => {
    const carrito = [{ id: 1, nombre: 'Banano', precio: 1800, cantidad: 1 }];
    const resultado = quitarProducto(carrito, 1);
    expect(resultado).toHaveLength(0);
});

test('Calcular total del carrito correctamente', () => {
    const carrito = [
        { id: 1, precio: 1800, cantidad: 2 },
        { id: 2, precio: 6000, cantidad: 1 }
    ];
    expect(calcularTotal(carrito)).toBe(9600);
});