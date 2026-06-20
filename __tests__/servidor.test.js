// Pruebas de servidor - API REST Natural Fruit
// Proyecto: Natural Fruit - Pulpería de Frutas

const fetch = require('node-fetch');

const API_URL = 'http://localhost:8080/PulperiaVentasWeb/FrutasApi';

test('El servidor responde con status 200', async () => {
    const response = await fetch(API_URL);
    expect(response.status).toBe(200);
}, 10000);

test('La API retorna un arreglo de frutas', async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    expect(Array.isArray(data)).toBe(true);
}, 10000);

test('La API retorna al menos una fruta', async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    expect(data.length).toBeGreaterThan(0);
}, 10000);

test('Cada fruta tiene los campos requeridos', async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    const fruta = data[0];
    expect(fruta).toHaveProperty('id');
    expect(fruta).toHaveProperty('nombre');
    expect(fruta).toHaveProperty('precio');
    expect(fruta).toHaveProperty('stock');
}, 10000);

test('El precio de cada fruta es mayor a cero', async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    data.forEach(fruta => {
        expect(fruta.precio).toBeGreaterThan(0);
    });
}, 10000);

test('El stock de cada fruta no es negativo', async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    data.forEach(fruta => {
        expect(fruta.stock).toBeGreaterThanOrEqual(0);
    });
}, 10000);