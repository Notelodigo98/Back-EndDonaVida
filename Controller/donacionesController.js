
const DonacionesModel = require("../Model/DonacionesModel");

//Creamos el registro para guardar la donacion con parametros centro, fecha de la doncación y un id que identifique al donante
exports.crearDonacion = async (req, res) => {
    var params = req.body;
    var donaciones = new DonacionesModel();

    if (params.centro && params.fecha && params.id_donante) {

        donaciones.centro = params.centro;
        donaciones.fecha = params.fecha;
        donaciones.id_donante = params.id_donante;

        donaciones.save((err) => {
            if (err){
                return res.status(500).send({
                message: 'Error al guardar la donación'
            });
            }else{
                return res.status(200).send({
                   message: 'Donacion añadida correctamente' 
                });
            } 
        });

    } else {
        res.status(200).send({
            message: 'Envía todos los datos'
        });
    }
}

//cargamos todas las donaciones que haya hecho el donante anteriormente para mostrarlas
exports.obtenerDonacion = async (req, res) => {
    var params = req.body;

    let idDonante = params.id_donante;

    let registro = await DonacionesModel.find({
        id_donante: idDonante
    });

   
        res.json(registro);
    
}

//Podemos eliminar la donación en caso de error
exports.eliminarDonacion = async (req, res) => {
    var params = req.body;
    let idDonante = params.id_donante;

    DonacionesModel.find({
        _id: params._id
    }).remove(err => {
        if (err) return res.status(500).send({
            message: 'Error al borrar donacion'
        });

        return res.status(200).send({
            message: 'Donación eliminada correctamente'
        });
    });

}