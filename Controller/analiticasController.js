const AnaliticasModel = require("../Model/AnaliticasModel");

// Obtenemos todas las analiticas para ver los resultados ya que antes de la extracción de la donación
// se obtiene una muestra de sangre para analizar si es válida o no para donar

exports.obtenerAnaliticas = async (req, res) => {
    var params = req.body;
    try {
        if (params.id_donante) {
            let idDonante = params.id_donante;

            let analitica = await AnaliticasModel.find({
                id_donante: idDonante
            });


            res.json(analitica);


        }

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}