const db = require("../models");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Contenido = db.contenido;
const Categoria = db.categoria;
const Op = db.Sequelize.Op;

var misCategorias = [];

var inicio = false;

function categorizar ( contenidos ){

    misCategorias.forEach(categoria => {
        
        categoria.contenidos = {}

        let greaterTen = contenidos.filter(contenido => categoria.id == contenido.categoria_id );

        categoria.contenidos = greaterTen;
        
    });

    return misCategorias

}

exports.findAll = (req, res) => {

        Categoria.findAll({raw: true})
        .then(data => {

            misCategorias = data
            console.log(misCategorias)
            //return res.send(data);
        })
        .catch(err => {
            return res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving tutorials."
            });
        });



    //res.send({mensaje: "final"});

    Contenido.findAll({raw: true})
    .then(data => {
        respuesta = categorizar( data )
        res.send(respuesta);
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
 * 
// Crear y guardar un nuevo usuario

var BCRYPT_SALT_ROUNDS = 10;

exports.create = (req, res) => {

    console.log(req.body)
    let {nombre, correo, contrasena} = req.body;
    // Validate request
    if (!nombre) {
        res.status(400).send({
        message: "Content can not be empty!"
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

// Encontrar un contenido por Id
exports.findOne = (req, res) => {

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
                res.status(200).send({mensaje: "no hay registro4"});
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
                token: token
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
  
};

// Actualizar un contenido por id
exports.update = (req, res) => {
  
};

// Eliminar un contenido
exports.delete = (req, res) => {
  
};
  
};


 */