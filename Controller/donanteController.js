const DonanteModel = require("../Model/DonanteModel");
var bcrypt = require('bcrypt');
var token = require('../services/token');


//Login del usuario a la plataforma
exports.loginUser = async (req, res) => {
	var params = req.body;

	var nombre = params.nombre;
	var contrasenia = params.contrasenia;

	DonanteModel.findOne({
		nombre: nombre
	}, (err, user) => {
		if (err) return res.status(500).send({
			message: 'Error en la petición'
		});

		if (user) {
			bcrypt.compare(contrasenia, user.contrasenia, (err, check) => {
				if (check) {
					if (params.gettoken) {
						// 	//generar y devolver token
						return res.status(200).send({
							token: token.createToken(user)
						});
					} else {
						// 	//devolver datos de usuario
						user.contrasenia = undefined;
						return res.status(200).send({
							user
						});
					}

				} else {
					return res.status(200).send({
						message: 'Contraseña incorrecta'
					});
				}
			});
		} else {
			return res.status(200).send({
				message: 'El usuario no se ha podido identificar'
			});
		}
	});
}

//Registro del donante en la plataforma
exports.crearDonante = async (req, res) => {
	var params = req.body;
	var donante = new DonanteModel();
	let expresionregular = /^\d{8}[a-zA-Z]$/;//Validar DNI
	var expresionRegular1 = /^([0-9]+){9}$/; //con esto vamos a validar el numero tlf
	var numero
	var letr
	var letra

	if (params.nombre && params.dni &&
		params.telefono && params.grupo && params.sexo && params.contrasenia) {

		let dni = params.dni;

		if (expresionregular.test(params.dni) == true) {
			numero = dni.substr(0, dni.length - 1);
			letr = dni.substr(dni.length - 1, 1);
			numero = numero % 23;
			letra = 'TRWAGMYFPDXBNJZSQVHLCKET';
			letra = letra.substring(numero, numero + 1);
			if (letra != letr.toUpperCase()) {
				return res.status(200).send({
					message: 'La letra del DNI no coincide o los numeros son erróneos.'
				});
			}
		} else {
			res.status(200).send({
				message: 'Formato DNI no válido'
			});
		}


		if (expresionRegular1.test(params.telefono)==false) {
			return res.status(200).send({
				message: 'Número de teléfono incorrecto'
			});
		}

		donante.nombre = params.nombre;
		donante.dni = params.dni;
		donante.telefono = params.telefono;
		donante.grupo = params.grupo;
		donante.sexo = params.sexo;
		donante.contrasenia = params.contrasenia;

		// Controlar usuarios duplicados
		DonanteModel.find({
			$or: [{
					nombre: donante.nombre.toLowerCase()
				},
				{
					contrasenia: donante.contrasenia.toLowerCase(),
					dni: donante.dni.toLowerCase()
				}
			]
		}).exec((err, users) => {
			if (err) return res.status(500).send({
				message: 'Error en la petición de usuarios'
			});

			if (users && users.length >= 1) {
				return res.status(200).send({
					message: 'El usuario que intentas registrar ya existe'
				});
			} else {

				// Cifra la password y me guarda los datos 
				bcrypt.hash(params.contrasenia, 10, (err, hash) => {
					donante.contrasenia = hash;

					donante.save((err, userStored) => {
						if (err) return res.status(500).send({
							message: 'Error al guardar el usuario'
						});

						if (userStored) {
							res.status(200).send({
								user: userStored
							});
						} else {
							res.status(404).send({
								message: 'No se ha registrado el usuario'
							});
						}

					});
				});

			}
		});

	} else {
		res.status(200).send({
			message: 'Envía todos los datos'
		});
	}
}