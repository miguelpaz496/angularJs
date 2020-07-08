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

    /** 
     * 


    // Retrieve all published Tutorials
    router.get("/published", tutorials.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", tutorials.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", tutorials.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", tutorials.delete);
  
    // Create a new Tutorial
    router.delete("/", tutorials.deleteAll);

    */
  
    app.use('/usuarios', router);
  };