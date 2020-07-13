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

        let grupo = contenidos.filter(contenido => categoria.id == contenido.categoria_id );

        categoria.contenidos = grupo;
        
        categoria.numero = grupo.length ? true : false;
        
    });

    return misCategorias

}

function compararFecha (fecha) {

    var date = new Date();

    disponible = false;

    mydate=new Date(fecha);

    if(mydate>date){
        disponible = true;
    }

    return disponible;

}

exports.findAll = (req, res) => {

    if(!inicio){
        Categoria.findAll({raw: true})
        .then(data => {

            misCategorias = data
            inicio = true;
        })
        .catch(err => {
            return res.status(500).send({
              message:
                err.message || "Some error occurred while retrieving tutorials."
            });
        });
    }

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



exports.create = (req, res) => {

    
    let {titulo, enlace, contenido, fecha_limite, etiqueta, categoria_id} = req.body;

    if (!req.file) {
            return res.status(400).send({
                message: "El formato del archivo no corresponde a png o jpeg"
        });
    }
    imagen = req.file.filename
    if (!titulo) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
        return;
    }

    Contenido.create({titulo, imagen, enlace, contenido, fecha_limite, etiqueta, categoria_id})
    .then(data => {
        res.status(200).send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Algun error ocurrio mientras se creaba en usuario."
        });
    })
    
};


exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Contenido.findByPk(id)
    .then(data => {

        if(data == null){
            return res.status(203).send({message: "Contenido no existe"});
        }

        let {titulo, enlace, contenido, imagen,fecha_limite, etiqueta, categoria_id} = data;

        var disponible = compararFecha(fecha_limite);

        res.status(200).send( {titulo, enlace, contenido, imagen,fecha_limite, etiqueta, categoria_id, disponible});
    })
    .catch(err => {
        res.status(500).send({
          message: "Error with id=" + id
        });
    });
};
