const ReservasModel = require("../Model/ReservasModel");
const {
    param
} = require("../routes/donante");

//Las reservas actuales de los centros de transfusiones
exports.obtenerReservas = async (req, res) => {
    var params = req.body;
    var reservas = ReservasModel();

    try{
        if (params.grupo) {

           ReservasModel.findOne({
                grupo: params.grupo}, (err,ReservasModel) =>{

                    if(ReservasModel){
                         res.status(200).send({
                            ReservasModel
                        }) 
                    }
                }
            );

          
    
        }else{
            res.status(200).send({
                message: 'Error'
            });
        }
    }catch (error){
        res.status(200).send({
            message: 'Envía todos los datos'
        });
    }
  
}