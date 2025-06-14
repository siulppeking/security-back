const express = require('express');
const authRouter = express.Router();

const { register, login, info } = require('../controllers/usuarioController');
const validarCampos = require('../middlewares/validarCampos');
const { registerValidator, loginValidator } = require('../validators/authValidator');
const validateJWT = require('../middlewares/validateJWT');

authRouter.post('/register', registerValidator, validarCampos, register);
authRouter.post('/login', loginValidator, validarCampos, login);
authRouter.get('/info', validateJWT, info);


module.exports = authRouter;
