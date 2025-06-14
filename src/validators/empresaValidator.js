const { check } = require('express-validator');

const crearEmpresaValidator = [
    check('ruc', 'El RUC es obligatorio').notEmpty(),
    check('razonSocial', 'La razón social es obligatoria').notEmpty()
];

const actualizarEmpresaValidator = [
    check('razonSocial', 'La razón social es obligatoria').notEmpty(),
    check('estado', 'El estado debe ser booleano').isBoolean()
];

module.exports = {
    crearEmpresaValidator,
    actualizarEmpresaValidator
};
