const mongoose = require('mongoose');
const DonanteSchema = mongoose.Schema({
    
    dni: {
        type: String,
        required: true,
    },

    telefono: {
        type: String,
        required: true,
    },

    contrasenia: {
        type: String,
        required: true,
    },

    sexo: {
        type: String,
        required: true,
    },

    grupo: {
        type: String,
        required: true,
    },

    nombre: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Donante', DonanteSchema);