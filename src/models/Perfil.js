const { Schema, model } = require('mongoose');

const PerfilSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    descripcion: {
        type: String
    },
    estado: {
        type: Boolean,
        default: true
    },
    fechaRegistro: {
        type: Date,
        default: Date.now
    }
});

const Perfil = model('Perfil', PerfilSchema);

module.exports = Perfil;
