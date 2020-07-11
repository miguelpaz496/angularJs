const db = require("../models");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = db.usuario;
const Op = db.Sequelize.Op;

// Crear y guardar un nuevo usuario

var BCRYPT_SALT_ROUNDS = 10;

exports.create = (req, res) => {

    console.log(req.body)
    let {nombre, correo, contrasena, contrasena2} = req.body;
    // Validate request
    if (!nombre && (contrasena === contrasena2)) {
        res.status(400).send({
        message: "Error con el registro"
        });
        return;
    }

    
    bcrypt.hash(contrasena, BCRYPT_SALT_ROUNDS)
    .then(function(hashedPassword) {
        contrasena = hashedPassword;
        Usuario.create( {nombre, correo, contrasena})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Algun error ocurrio mientras se creaba en usuario."
        });
    });
    })
    .catch(function(error){
        console.log("Error saving user: ");
        console.log(error);
        next();
    });

};

exports.findByEmail = (req, res) => {

    let {correo, contrasena} = req.body;

    Usuario.findAll({
        raw: true,
        where: {
            correo: {
                [Op.eq]: correo
            } 
        }
    })
    .then(function(data) {
        if(!data[0]){
            return res.status(403).send({mensaje: "no hay registro2"});
        }
        bcrypt.compare(contrasena, data[0].contrasena, function (err, samePassword){
            if(err){
                return res.status(403).send({mensaje: "no hay registro3"});
            }
            if(!samePassword){
                res.status(403).send({mensaje: "no hay registro4"});
            }

            const token = jwt.sign({
                correo: data[0].correo,
                usuarioId: data[0].id
            },
            "MysecretKEY",
            {
                expiresIn: "1h"
            });
            res.status(200).send({
                mensaje: "login exitoso",
                token: token,
                usuario:{
                    correo: data[0].correo,
                    usuarioId: data[0].id
                }
            });

        });
    })
    .catch(err => {
        res.status(500).send({
          message:
            err.message || "ocurrio algun error."
        });
    });
};


exports.findAll = (req, res) => {
    
    Usuario.findAll()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
    });
};



/**
 * 



// Recibir todos lo usuario sd ela base de datos
exports.findAll = (req, res) => {
  
};

// Encontrar un usuario por Id
exports.findOne = (req, res) => {
  
};

// Actualizar un usuario por id
exports.update = (req, res) => {
  
};

// Eliminar un usuario
exports.delete = (req, res) => {
  
};

// Eliminar todos los usuarios
exports.deleteAll = (req, res) => {
  
};


 */