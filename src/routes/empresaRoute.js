const express = require('express');
const validateJWT = require('../middlewares/validateJWT');
const validarCampos = require('../middlewares/validarCampos');

const {
    crearEmpresa,
    listarEmpresas,
    obtenerEmpresaPorId,
    actualizarEmpresa,
    eliminarEmpresa
} = require('../controllers/empresaController');

const {
    crearEmpresaValidator,
    actualizarEmpresaValidator
} = require('../validators/empresaValidator');

const empresaRouter = express.Router();

empresaRouter.use(validateJWT);

empresaRouter.post('/', crearEmpresaValidator, validarCampos, crearEmpresa);
empresaRouter.get('/', listarEmpresas);
empresaRouter.get('/:id', obtenerEmpresaPorId);
empresaRouter.put('/:id', actualizarEmpresaValidator, validarCampos, actualizarEmpresa);
empresaRouter.delete('/:id', eliminarEmpresa);

module.exports = empresaRouter;
