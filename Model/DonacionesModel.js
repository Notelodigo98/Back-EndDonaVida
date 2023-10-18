const mongoose = require('mongoose');
const DonacionesSchema = mongoose.Schema({
    
    centro: {
        type: String,
        required: true,
    },

    fecha: {
        type: String,
        required: true,
    },

    id_donante: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Donaciones', DonacionesSchema);