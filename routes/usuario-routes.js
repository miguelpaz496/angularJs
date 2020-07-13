module.exports = app => {
    const usuarios = require("../controllers/usuario-controller.js");
    const auth = require("../middleware/auth.js")
  
    var router = require("express").Router();
  

    // crear un nuevo usuario
    router.post("/register", usuarios.create);

    // recibir todos los usurios
    router.get("/", usuarios.findAll);

    // buscar un usuario por el correo
    router.post("/login", usuarios.findByEmail);

    app.use('/usuarios', router);
  };