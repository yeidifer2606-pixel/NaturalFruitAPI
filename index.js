// index.js
// Punto de entrada principal del servidor API REST
// Natural Fruit - Servicio Web de Autenticación
// Evidencia GA7-220501096-AA5-EV01

const express = require('express');
const cors    = require('cors');
const app     = express();

// Puerto del servidor
const PORT = 3001;

// ===== MIDDLEWARES =====

// Habilitar CORS para permitir peticiones desde cualquier origen
app.use(cors());

// Parsear el cuerpo de las peticiones en formato JSON
app.use(express.json());

// ===== RUTAS =====

// Importar y usar las rutas de autenticación
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Ruta raíz de bienvenida
app.get('/', (req, res) => {
    res.json({
        mensaje  : 'Natural Fruit API REST - Servicio de Autenticación',
        version  : '1.0.0',
        endpoints: {
            registro : 'POST /api/auth/registro',
            login    : 'POST /api/auth/login',
            usuarios : 'GET  /api/auth/usuarios'
        }
    });
});

// ===== INICIAR SERVIDOR =====
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log('Endpoints disponibles:');
    console.log(`  POST http://localhost:${PORT}/api/auth/registro`);
    console.log(`  POST http://localhost:${PORT}/api/auth/login`);
    console.log(`  GET  http://localhost:${PORT}/api/auth/usuarios`);
});