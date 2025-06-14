const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  clave: {
    type: String,
    required: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    sparse: true,
    lowercase: true,
    trim: true,
  },
  estado: {
    type: String,
    enum: ['ACTIVO', 'INACTIVO', 'BLOQUEADO'],
    default: 'ACTIVO',
  },
  fechaRegistro: {
    type: Date,
    default: Date.now,
  },
  ultimoLogin: {
    type: Date,
  },
  intentosFallidos: {
    type: Number,
    default: 0,
  },
});

const Usuario = mongoose.model('usuarios', usuarioSchema)
module.exports = Usuario;
