const DonanteModel = require("../Model/DonanteModel");
const DonacionesModel = require("../Model/DonacionesModel");

//Si el paciente ha donado hace mas de 3 meses en caso de ser hombre o 4 en caso de ser mujer, va a dejarte realizar la donación
//En caso contrario, va a saltar un mensaje de error y no podrá efectuarse la donación
exports.obtenerDonacion = async (req, res) => {
    var params = req.body;
    let idDonante = params.id_donante;
    let sexo = params.sexo;
    let donar = false;
    let meses = 3;

    let registro = await DonacionesModel.find({
        id_donante: idDonante
    });

    if (registro == 0) {
        res.status(200).json({
            message: 'Dirigete a tu centro de donación más cercano para poder efectuar la recogida, Gracias por colaborar.'
        });
    } else {

        if (sexo == 1) {
            meses = 4;
        } else {
            meses = 3;
        }

        for (let i = 0; i < registro.length; i++) {
            let hoy = new Date();
            let fechaDonacion = registro[i]._doc.fecha;
            let donacion = fechaDonacion.split('-');
            let fechaEnDate = new Date(donacion[2], donacion[1], donacion[0]);
            fechaEnDate.setMonth(fechaEnDate.getMonth() + meses);
            if (fechaEnDate < hoy) {
                donar = true;
            } else {
                donar = false;
            }
        }
        if (donar == true) {
            res.status(200).json({
                message: 'Dirigete a tu centro de donación más cercano para poder efectuar la recogida, Gracias por colaborar.'
            });
        } else {
            res.status(200).json({
                message: 'Aún no han pasado ' + meses + ' meses desde tu última donación, pero agradeceríamos mucho la difusión. Gracias por colaborar.'
            });
        }

        if (registro.length <= 0) {
            res.status(404).json({
                message: 'No existe el donante'
            });

        } else {
            res.json(registro);
        }
    }
}