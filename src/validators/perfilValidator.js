const { check } = require('express-validator');

const crearPerfilValidator = [
    check('nombre', 'El nombre es obligatorio').notEmpty().trim(),
    check('nombre', 'El nombre debe tener al menos 3 caracteres').isLength({ min: 3 })
];

const actualizarPerfilValidator = [
    check('nombre', 'El nombre es obligatorio').notEmpty().trim(),
    check('estado', 'El estado debe ser booleano').isBoolean()
];

module.exports = {
    crearPerfilValidator,
    actualizarPerfilValidator
};
