'use strict'

const express = require('express');
var path = require('path');
const app = express();

const { Client } = require('pg');
var connectionString = "postgres://postgres:postgres@localhost:5432/pruebaContenido";

const client = new Client({
    connectionString: connectionString
});

client.connect();

var categorias = [];

var inicio = false;

function categorizar ( contenidos ){



    categorias.forEach(categoria => {
        
        categoria.contenidos = {}

        let greaterTen = contenidos.filter(contenido => categoria.id == contenido.categoria_id );

        categoria.contenidos = greaterTen;
        
    });

    return categorias

}


app.get('/api', function (req, res, next) {


    client.query('SELECT * FROM contenido', function (err, result) {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        //console.log(result.rows)
        var respuesta = categorizar(result.rows)
        console.log(respuesta)
        //res.json(result.rows);
        res.json(respuesta);
        //res.status(200).send(result.rows);
    });
});

//app.use(express.static(__dirname + '/public'));


app.get('/',function(req,res){

    if(!inicio){
        client.query('SELECT * FROM categoria', function (err, result) {
            if (err) {
                console.log(err);
            }
            console.log(result.rows);
            inicio = true;
            categorias = result.rows;
        });

    }



    
    res.sendFile(path.join(__dirname+'/public/index.html'));
});
   
app.use(express.static(path.join(__dirname+'/public')));


app.use('/scripts', express.static(__dirname + '/node_modules/'));


app.listen('3000', function() {
  console.log('Servidor web escuchando en el puerto 3000');
});