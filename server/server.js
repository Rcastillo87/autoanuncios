// =======================================================================================
//  Archivo de arranque o inicio de la app 
// =======================================================================================
require('./Config/config'); //configuracion de las variables generales de sistema
require('./Config/Conection'); // configuracion y uso de la base de datos 

//importacion de librerias 
const path = require('path'); //módulo contiene utilidades para manejar y transformar rutas de archivos
const express = require('express'); //programa de utilidad HTTP y middleware
const app = express();
const bodyParser = require('body-parser'); //Analiza los bodys de las solicitud entrantes en un middleware disponibles bajo la propiedad req.body.

// configuracion y uso de  bodyParser(), nos permite el uso de los metodos de tipo POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(require('./Rutas/Rutas'));
//app.use(express.static(path.resolve(__dirname, '../public')))

//se establese la comunicacion a travez del puerto configurado en config
app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});