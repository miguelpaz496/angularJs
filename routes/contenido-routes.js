module.exports = app => {
    const contenidos = require("../controllers/contenido-controller.js");
    //const auth = require("../middleware/auth.js")
  
    var router = require("express").Router();
  

    // crear un nuevo usuario
    //router.post("/", contenidos.create);

    // recibir todos los usurios
    router.get("/", contenidos.findAll);



    /** 
     * 
  
    // encontrar un contenido por id
    // buscar un usuario por el correo
    router.post("/login", usuarios.findByEmail);
    router.get("/:id", tutorials.findOne);
  
    // actualizar un contenido por id
    router.put("/:id", tutorials.update);
  
    // eliminar un contenido por id
    router.delete("/:id", tutorials.delete);


    */
  
    app.use('/contenidos', router);
  };