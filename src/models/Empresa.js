const { Schema, model } = require('mongoose');

const empresaSchema = new Schema({
    ruc: {
        type: String,
        required: true,
        unique: true
    },
    razonSocial: {
        type: String,
        required: true
    },
    direccion: {
        type: String
    },
    telefono: {
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

const Empresa = model('empresas', empresaSchema);

module.exports = Empresa;
