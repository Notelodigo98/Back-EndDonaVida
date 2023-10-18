const mongoose = require('mongoose');
const ReservasSchema = mongoose.Schema({
grupo: {
    type: String,
},

cant:{
    type: String,
}
});

module.exports = mongoose.model('Reservas', ReservasSchema);