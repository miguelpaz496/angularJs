module.exports = app => {
    const contenidos = require("../controllers/contenido-controller.js");
    const auth = require("../middleware/auth.js")
    const upload = require("../middleware/uploading.js")
  
    var router = require("express").Router();
  

    // crear un nuevo usuario
    router.post("/", upload.single("imagen"), contenidos.create);

    // recibir todos los usurios
    router.get("/", contenidos.findAll);

    router.get("/:id", contenidos.findOne);


    app.use('/contenidos', router);
  };