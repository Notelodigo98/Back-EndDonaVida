'use strict'

var token = require('jwt-simple');
var moment = require('moment');
const DonanteModel = require('../Model/DonanteModel');
var secret = 'token';

exports.createToken = function(Donantes){
	var payload = {
        dni: Donantes.dni,
		nombre: Donantes.nombre,
        telefono:Donantes.telefono,
        contrasenia:Donantes.contrasenia,
        sexo:Donantes.sexo,
        grupo:Donantes.grupo,
        iat: moment().unix(),
		exp: moment().add(30, 'days').unix
	};

	return token.encode(payload, secret);
};