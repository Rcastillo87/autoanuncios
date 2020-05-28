// =======================================================================================
//  configuracion de la base de datos no-sql
// =======================================================================================
const mongoose = require('mongoose'); //importa libreria
//configuracion previa del base de datos
const config = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
};

mongoose.connect(process.env.URLDB, config); //se establece coneccion a la bd  usando variables global URLDB de config
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:')); // enlaza el track de error a la consola (proceso actual)
db.once('open', () => {
    console.log('en linea BD'); // si esta todo ok, imprime esto
});