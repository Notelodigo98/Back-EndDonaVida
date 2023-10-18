const mongoose = require('mongoose');
const PuntosRecogidaSchema = mongoose.Schema({
    
    direccion: {
        type: String,
        required: true,
    },

    horaInicio: {
        type: String,
        required: true,
    },

    horaFin: {
        type: String,
        required: true,
    },

    provincia: {
        type: String,
        required: true,
    }

});

module.exports = mongoose.model('puntosrecogida', PuntosRecogidaSchema);