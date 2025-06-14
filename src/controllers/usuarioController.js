const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

const register = async (req, res) => {
    try {
        const { username, clave, nombre, email } = req.body;

        // Validar campos obligatorios
        if (!username || !clave || !nombre) {
            return res.status(400).json({ message: 'Faltan campos obligatorios' });
        }

        // Verificar si ya existe
        const existe = await Usuario.findOne({ username });
        if (existe) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        // Encriptar clave
        const hashedClave = await bcrypt.hash(clave, 10);

        // Crear usuario
        const nuevoUsuario = new Usuario({
            username,
            clave: hashedClave,
            nombre,
            email,
        });

        const usuarioGuardado = await nuevoUsuario.save();

        res.status(201).json({
            message: 'Usuario registrado correctamente',
            data: {
                usuarioId: usuarioGuardado._id,
                username: usuarioGuardado.username,
                nombre: usuarioGuardado.nombre,
                email: usuarioGuardado.email,
            },
        });
    } catch (error) {
        console.error('Error en register:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

const login = async (req, res) => {
    try {
        const { username, clave } = req.body;

        // Buscar usuario
        const usuario = await Usuario.findOne({ username });
        if (!usuario) {
            return res.status(401).json({ type: 'unauthorized', message: 'Credenciales inválidas' });
        }

        // Verificar clave
        const claveValida = await bcrypt.compare(clave, usuario.clave);
        if (!claveValida) {
            return res.status(401).json({ type: 'unauthorized', message: 'Credenciales inválidas' });
        }

        // Generar token
        const payload = {
            uid: usuario._id
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });
        const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
        });

        res.json({
            type: 'success',
            message: 'Login exitoso',
            token,
            refreshToken
        });
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ type: 'exception', message: 'Error del servidor' });
    }
};

const info = async (req, res) => {
    try {
        const uid = req.uid;

        const usuario = await Usuario.findById(uid).select('-clave'); // Oculta la clave

        if (!usuario) {
            return res.status(404).json({
                type: 'not_found',
                message: 'Usuario no encontrado'
            });
        }

        // Aquí más adelante puedes incluir info de empresa, perfil, menú, etc.
        res.json({
            type: 'success',
            data: {
                usuarioId: usuario._id,
                nombre: usuario.nombre,
                username: usuario.username,
                email: usuario.email
            }
        });
    } catch (error) {
        console.error('Error en /auth/info:', error);
        res.status(500).json({ type: 'exception', message: 'Error del servidor' });
    }
};

module.exports = { register, login, info };
