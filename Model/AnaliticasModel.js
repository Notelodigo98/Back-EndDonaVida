const mongoose = require('mongoose');
const AnaliticasSchema = mongoose.Schema({
    
    fecha: {
        type: String,
        required: true,
    },

    id_donante: {
        type: String,
        required: true,
    },

    ruta: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Analiticas', AnaliticasSchema);