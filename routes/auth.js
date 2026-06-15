// routes/auth.js
// Rutas del servicio web de autenticación - Natural Fruit
// Endpoints:
//   POST /api/auth/registro  → Registrar nuevo usuario
//   POST /api/auth/login     → Iniciar sesión
//   GET  /api/auth/usuarios  → Listar usuarios

const express = require('express');
const router  = express.Router();
const bcrypt  = require('bcryptjs');
const db      = require('../config/db');

// ============================================================
// POST /api/auth/registro
// Registra un nuevo usuario en la base de datos
// Body: { nombre, correo, password, rol }
// ============================================================
router.post('/registro', async (req, res) => {
    try {
        const { nombre, correo, password, rol } = req.body;

        // Validar que todos los campos estén presentes
        if (!nombre || !correo || !password) {
            return res.status(400).json({
                exito   : false,
                mensaje : 'Todos los campos son obligatorios'
            });
        }

        // Verificar si el correo ya está registrado
        const [existente] = await db.query(
            'SELECT idusuario FROM usuario WHERE correo = ?',
            [correo]
        );

        if (existente.length > 0) {
            return res.status(409).json({
                exito   : false,
                mensaje : 'El correo ya está registrado'
            });
        }

        // Encriptar la contraseña con bcrypt (10 rondas de salt)
        const passwordEncriptado = await bcrypt.hash(password, 10);

        // Insertar el nuevo usuario en la base de datos
        const [resultado] = await db.query(
            'INSERT INTO usuario (nombre, correo, password, rol) VALUES (?, ?, ?, ?)',
            [nombre, correo, passwordEncriptado, rol || 'cliente']
        );

        // Respuesta exitosa
        res.status(201).json({
            exito     : true,
            mensaje   : 'Usuario registrado correctamente',
            idusuario : resultado.insertId
        });

    } catch (error) {
        console.error('Error en registro:', error);
        res.status(500).json({
            exito   : false,
            mensaje : 'Error interno del servidor'
        });
    }
});

// ============================================================
// POST /api/auth/login
// Autentica un usuario con correo y contraseña
// Body: { correo, password }
// ============================================================
router.post('/login', async (req, res) => {
    try {
        const { correo, password } = req.body;

        // Validar que los campos estén presentes
        if (!correo || !password) {
            return res.status(400).json({
                exito   : false,
                mensaje : 'Correo y contraseña son obligatorios'
            });
        }

        // Buscar el usuario por correo en la base de datos
        const [usuarios] = await db.query(
            'SELECT * FROM usuario WHERE correo = ?',
            [correo]
        );

        // Si no existe el usuario, retornar error
        if (usuarios.length === 0) {
            return res.status(401).json({
                exito   : false,
                mensaje : 'Credenciales incorrectas'
            });
        }

        const usuario = usuarios[0];

        // Comparar la contraseña ingresada con el hash almacenado
        const passwordValido = await bcrypt.compare(password, usuario.password);

        if (!passwordValido) {
            return res.status(401).json({
                exito   : false,
                mensaje : 'Credenciales incorrectas'
            });
        }

        // Autenticación exitosa - retornar datos sin contraseña
        res.json({
            exito   : true,
            mensaje : 'Autenticación satisfactoria',
            usuario : {
                idusuario : usuario.idusuario,
                nombre    : usuario.nombre,
                correo    : usuario.correo,
                rol       : usuario.rol
            }
        });

    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({
            exito   : false,
            mensaje : 'Error interno del servidor'
        });
    }
});

// ============================================================
// GET /api/auth/usuarios
// Lista todos los usuarios registrados (sin contraseñas)
// ============================================================
router.get('/usuarios', async (req, res) => {
    try {
        const [usuarios] = await db.query(
            'SELECT idusuario, nombre, correo, rol, fechacreacion FROM usuario'
        );

        res.json({
            exito    : true,
            total    : usuarios.length,
            usuarios : usuarios
        });

    } catch (error) {
        console.error('Error al listar usuarios:', error);
        res.status(500).json({
            exito   : false,
            mensaje : 'Error interno del servidor'
        });
    }
});

module.exports = router;
