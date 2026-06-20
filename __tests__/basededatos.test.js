// Pruebas de base de datos - MySQL Natural Fruit
// Proyecto: Natural Fruit - Pulpería de Frutas

const mysql = require('mysql2/promise');

const config = {
    host:     'localhost',
    user:     'root',
    password: '260603Ym.',
    database: 'pulperia_frutas_web',
    port:      3306
};

test('Conectar a MySQL correctamente', async () => {
    const conexion = await mysql.createConnection(config);
    expect(conexion).toBeDefined();
    await conexion.end();
}, 10000);

test('La tabla fruta existe y tiene registros', async () => {
    const conexion = await mysql.createConnection(config);
    const [rows] = await conexion.query('SELECT * FROM fruta');
    expect(rows.length).toBeGreaterThan(0);
    await conexion.end();
}, 10000);

test('Cada fruta tiene nombre y precio válidos', async () => {
    const conexion = await mysql.createConnection(config);
    const [rows] = await conexion.query('SELECT * FROM fruta');
    rows.forEach(fruta => {
        expect(fruta.nombre).toBeTruthy();
       expect(parseFloat(fruta.precioporkilo)).toBeGreaterThan(0);
    });
    await conexion.end();
}, 10000);

test('La tabla fruta tiene 15 registros', async () => {
    const conexion = await mysql.createConnection(config);
    const [rows] = await conexion.query('SELECT COUNT(*) as total FROM fruta');
    expect(rows[0].total).toBe(15);
    await conexion.end();
}, 10000);

test('Consulta por nombre retorna Banano', async () => {
    const conexion = await mysql.createConnection(config);
    const [rows] = await conexion.query(
        "SELECT * FROM fruta WHERE nombre = 'Banano'"
    );
    expect(rows.length).toBeGreaterThan(0);
    expect(rows[0].nombre).toBe('Banano');
    await conexion.end();
}, 10000);

test('La tabla usuario existe y tiene registros', async () => {
    const conexion = await mysql.createConnection(config);
    const [rows] = await conexion.query('SELECT * FROM usuario');
    expect(rows.length).toBeGreaterThan(0);
    await conexion.end();
}, 10000);

test('La tabla venta existe', async () => {
    const conexion = await mysql.createConnection(config);
    const [rows] = await conexion.query('SELECT COUNT(*) as total FROM venta');
    expect(rows[0].total).toBeGreaterThanOrEqual(0);
    await conexion.end();
}, 10000);