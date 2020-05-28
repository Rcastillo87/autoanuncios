// =======================================================================================
//  funciones CRUD User 
// =======================================================================================

//librerias requeridas 
const express = require('express'); //programa de utilidad HTTP y middleware
const app = express();
const bcrypt = require('bcrypt'); //requerida pára encriptar informacion sensible como password  
const User = require('../Modelos/UserModel'); //importacion de modelo user
//const { verificarToken, verificaAdmin_Role } = require('../middlewares/autenticacion');
const _ = require('underscore'); //libreria con aplicaciones varias ver documentacion en la web 

//realiza una peticion GET atravez de /user 
app.get('/user', /*verificarToken,*/ (req, res) => {

    //parametros de la busqueda 
    let desde = Number(req.query.desde) || 0;
    let limite = Number(req.query.limite) || 5;

    //esta realiza una busqueda tipo select en la tabla users, esta posee tiene cierta configracion 
    User.find({ estado: true }, 'nombre email role estado google img') //filtro por 'estado: true' y solo muestra los valores del string  
        .skip(desde) //se realiza la busqueda iniciado desde el valor de 'desde'
        .limit(limite) //limite de valores a buscar 'limite'
        .exec((err, user) => { //realiza un retorno de la busqueda 
            if (err) { //retorna un json con error 400 si se cumple la condicion 
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            //esta realiza un conteo de todos los valores en 'estado: true' 
            User.countDocuments({ estado: true }, (err, conteo) => {
                res.json({ //respuesta del conteo
                    ok: true,
                    conteo: conteo,
                    user
                });
            });

        });
});

//realiza una peticion POST atravez de /user
app.post('/user', /*[verificarToken, verificaAdmin_Role],*/ (req, res) => {
    let body = req.body; //captura la estructura del request enviada 
    //crea una instancia de la clase User e ingresa sus atributos
    let user = new User({
        nombre: body.nombre,
        email: body.email,
        celular: body.celular,
        password: bcrypt.hashSync(body.password, 10), //encripta la contraseña
        role: body.role
    });

    //se guarda el objeto user en base de datos 
    user.save((err, userBD) => {
        if (err) { //retorna un json con error 400 si se cumple la condicion 
            return res.status(500).json({
                ok: false,
                err
            });
        }
        res.json({ //muestra un json con la respuesta
            ok: true,
            user: userBD
        });
    });
});

//realiza una peticion PUT atravez de /user ademas de captura un id
app.put('/user/:id', /*[verificarToken, verificaAdmin_Role],*/ (req, res) => {
    let id = req.params.id; // captura del id
    let body = _.pick(req.body, ['nombre', 'email', 'role', 'estado', 'celular']); //se capturan los valores del request y se filtran dejando solo indicados en el arreglo

    //realiza la actualizacion de la bd, ademas de realizar valizaciones con respecto al UserModel libreria mongoose-unique-validator 
    User.findOneAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, userBD) => {
        if (err) { //retorna un json con error 400 si se cumple la condicion 
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!userBD) { //retorna un json error si el user es nulo
            return res.status(400).json({
                ok: false,
                err: { message: 'usuario no encontrado' }
            });
        }
        res.json({ //muestra un json con la respuesta
            ok: true,
            user: userBD
        });
    });
});

//realiza una peticion DELETE atravez de /user ademas de captura un id
app.delete('/user/:id', /*[verificarToken, verificaAdmin_Role],*/ (req, res) => {
    let id = req.params.id; //captura de id
    let cambioEstado = { estado: false }; //para borrado fisico
    //funcion que actualiza el estado de de user para inavilitarlo en bd
    User.findOneAndUpdate(id, cambioEstado, { new: true, runValidators: true, context: 'query' }, (err, userDelete) => {
        //Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {      //borrado fisico de la BD
        if (err) { //retorna un json con error 400 si se cumple la condicion 
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!userDelete) { //retorna un json error si el user es nulo
            return res.status(400).json({
                ok: false,
                err: { message: 'usuario no encontrado' }
            });
        }
        res.json({ //muestra un json con la respuesta
            ok: true,
            user: userDelete
        });
    });
});

module.exports = app;