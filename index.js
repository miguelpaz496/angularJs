'use strict'

const express = require('express');
var bodyParser = require('body-parser')
var path = require('path');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

require("./routes/usuario-routes")(app);
require("./routes/contenido-routes")(app);


app.use(express.static(path.join(__dirname+'/public')));


app.use('/scripts', express.static(__dirname + '/node_modules/'));


app.listen('3000', function() {
  console.log('Servidor web escuchando en el puerto 3000');
});