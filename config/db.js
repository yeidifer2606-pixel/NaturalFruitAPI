// config/db.js
// Configuración de la conexión a la base de datos MySQL
// Proyecto: Natural Fruit - Pulpería Frutas Web

const mysql = require('mysql2');

// Crear pool de conexiones para mejor rendimiento
const pool = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : '260603Ym.',          // ← tu contraseña de MySQL (si no tiene, déjala vacía)
    database : 'pulperia_frutas_web',
    port     : 3306
});

// Exportar pool con soporte de promesas
module.exports = pool.promise();