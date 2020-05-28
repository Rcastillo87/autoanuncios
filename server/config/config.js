// ============================
//  Configuracion de los parmetros de uso general de la app 
// ============================

// ============================
//  Base de datos - configuracion de uso del servidor  local o de produccion
// ============================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'; //variable de uso de entorno
let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/AutoAnuncios';
} else {
    urlDB = process.env.MONGO_URI;
}
process.env.URLDB = urlDB;

// ============================
//  Base de datos - configuracion de cliente local o de produccion
// ============================
process.env.CLIENT_ID = process.env.CLIENT_ID || "465870055122-9b2p8a32olb4ejcf69c9uhfpfu7g2iak.apps.googleusercontent.com";

// ============================
//  Puerto - uso local o de produccion 
// ============================
process.env.PORT = process.env.PORT || 3000;

// ============================
//  Vencimiento del Token
// ============================
process.env.CADUCIDAD_TOKEN = '48h';

// ============================
//  SEED de autenticación
// ============================
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';