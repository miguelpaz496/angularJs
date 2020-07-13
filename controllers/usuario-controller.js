const db = require("../models");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = db.usuario;
const Categoria = db.categoria;
const Op = db.Sequelize.Op;

// Crear y guardar un nuevo usuario

var BCRYPT_SALT_ROUNDS = 10;

var selectInfo = {};

exports.create = (req, res) => {

    console.log(req.body)
    let {nombre, correo, contrasena, contrasena2} = req.body;
    // Validate request
    if ( contrasena != contrasena2) {
        return res.status(203).send({
        message: "Error con el registro"
        });

    }

    
    bcrypt.hash(contrasena, BCRYPT_SALT_ROUNDS)
    .then(function(hashedPassword) {
        contrasena = hashedPassword;
        Usuario.create( {nombre, correo, contrasena})
        .then(data => {
            return res.send({
                message:
                "El usuario " +  correo + " ha sido registrado"
            });
        })
        .catch(err => {
            if (err.message === "llave duplicada viola restricción de unicidad «usuarios_correo_key»"){
                return res.status(203).send({
                    message:
                    "El correo ya se encuentra registrado."
                });
            }else{
                return res.status(500).send({
                    message:
                    err.message || "Algun error ocurrio mientras se creaba en usuario."
                });
            }

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

    Categoria.findAll({raw: true})
    .then(data => {
        selectInfo = data;
    })
    .catch(err => {
        return res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
    });

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
            return res.status(203).send({message: "Verifique la informacion e intente de nuevo"});
        }
        bcrypt.compare(contrasena, data[0].contrasena, function (err, samePassword){
            if(err){
                return res.status(403).send({message: "problemas del servidor"});
            }
            if(!samePassword){
                return res.status(203).send({message: "Verifique la informacion e intente de nuevo"});
            }



            console.log(selectInfo);
            const token = jwt.sign({
                correo: data[0].correo,
                usuarioId: data[0].id
            },
            "MysecretKEY",
            {
                expiresIn: "1h"
            });
            res.status(200).send({
                message: "login exitoso",
                token: token,
                usuario:{
                    correo: data[0].correo,
                    usuarioId: data[0].id
                },
                categorias: selectInfo
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

