const { body } = require('express-validator');

exports.registerValidator = [
    body('username')
        .notEmpty().withMessage('El username es obligatorio')
        .isLength({ min: 4 }).withMessage('El username debe tener al menos 4 caracteres'),
    body('clave')
        .notEmpty().withMessage('La clave es obligatoria')
        .isLength({ min: 6 }).withMessage('La clave debe tener al menos 6 caracteres'),
    body('nombre')
        .notEmpty().withMessage('El nombre es obligatorio'),
    body('email')
        .optional()
        .isEmail().withMessage('El email no es válido'),
];

exports.loginValidator = [
    body('username')
        .notEmpty().withMessage('El username es obligatorio'),
    body('clave')
        .notEmpty().withMessage('La clave es obligatoria'),
];