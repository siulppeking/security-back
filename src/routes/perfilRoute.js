const express = require('express');
const validateJWT = require('../middlewares/validateJWT');
const validarCampos = require('../middlewares/validarCampos');

const {
    crearPerfil,
    listarPerfiles,
    obtenerPerfilPorId,
    actualizarPerfil,
    eliminarPerfil
} = require('../controllers/perfilController');

const {
    crearPerfilValidator,
    actualizarPerfilValidator
} = require('../validators/perfilValidator');

const routerPerfil = express.Router();

routerPerfil.use(validateJWT);

routerPerfil.post('/', crearPerfilValidator, validarCampos, crearPerfil);

routerPerfil.get('/', listarPerfiles);

routerPerfil.get('/:id', obtenerPerfilPorId);

routerPerfil.put('/:id', actualizarPerfilValidator, validarCampos, actualizarPerfil);

routerPerfil.delete('/:id', eliminarPerfil);

module.exports = routerPerfil;
