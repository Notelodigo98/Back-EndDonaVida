const RecogidasModel = require("../Model/PuntosRecogidaModel");


//Según la provincia en la que te encuentres, va a darte los puntos de donación más cercanos a ti
exports.puntosRecogida = async (req, res) => {
    var params = req.body;
    try {
            let provincias=params.provincia;

            let puntos = await RecogidasModel.find({provincia:provincias});

            res.json(puntos);
           
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

//Guarda las recogida de sangre de los puntos cercanos para donar
exports.crearrecogida = async (req, res) => {
    var params = req.body;
    var donaciones = new RecogidasModel();

    if (params.direccion && params.horaInicio && params.provincia && params.horaFin) {

        donaciones.direccion = params.direccion;
        donaciones.horaInicio = params.horaInicio;
        donaciones.provincia = params.provincia;
        donaciones.horaFin = params.horaFin;

        donaciones.save((err) => {
            if (err) return res.status(500).send({
                message: 'Error al guardar la donación'
            });
        });

    } else {
        res.status(200).send({
            message: "Envía todos los datos"
        });
    }
}