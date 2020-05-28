// =======================================================================================
//  rutas generales de cada uno de los servicios
// =======================================================================================
//librerias requeridas
const express = require('express');
const app = express();

//modulos y funciones requeridos para cada ruta o servicio
app.use(require('./UserRutas'));

module.exports = app; //se exportan rutas