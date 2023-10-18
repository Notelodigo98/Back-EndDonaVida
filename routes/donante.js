const express=require('express');
const router= express.Router();
const donanteController= require('../Controller/donanteController');
const reservasController=require('../Controller/reservasController');
const puntosrecogidaController=require('../Controller/PuntosRecogidaController');
const donacionesController=require('../Controller/donacionesController');
const analiticasController=require('../Controller/analiticasController');
const comprobarDonanteController=require('../Controller/comprobarDonanteController')

router.post('/analiticas', analiticasController.obtenerAnaliticas);
router.post('/entrar', donanteController.loginUser);
router.post('/registro', donanteController.crearDonante);
router.post('/reservas', reservasController.obtenerReservas);
router.post('/puntos', puntosrecogidaController.puntosRecogida);
router.post('/donaciones', donacionesController.crearDonacion);
router.post('/obtenerdonacion', donacionesController.obtenerDonacion);
router.post('/eliminarDonacion', donacionesController.eliminarDonacion);
router.post('/crearpunto', puntosrecogidaController.crearrecogida);
router.post('/comprobar', comprobarDonanteController.obtenerDonacion);
module.exports=router;