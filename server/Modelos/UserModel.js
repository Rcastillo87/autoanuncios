// =======================================================================================
//  modelo de User
// =======================================================================================
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator'); //libreria que permite validar valores unicos

//roles validos por user y su mensage de alerta
let rolesValidos = {
    values: ['ADMIN-ROLE', 'USER-ROLE'],
    message: '{VALUE} no es rol valido'
};

//esquema de User para poder crearlos base de datos 
let userModel = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El Nombre es Requerido']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El Correo es Requerido']
    },
    celular: {
        type: String,
        required: false //[true, 'El Numero Celular es Requerido']
    },
    password: {
        type: String,
        required: [true, 'La Contraseña es Obligatoria']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER-ROLE',
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

//funcion que impide que se retorne el password
userModel.methods.toJSON = function() {
    let user = this;
    let userObjec = user.toObject();
    delete userObjec.password;
    return userObjec;
}

//mensage que se muestra al encontrar valores repetidos en correos y celular
userModel.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });
module.exports = mongoose.model('users', userModel); //se exporta el modelo creado