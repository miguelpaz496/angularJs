module.exports = (sequelize, Sequelize) => {
    const Usuario = sequelize.define("usuario", {
    nombre: {
        type: Sequelize.STRING,
    },
    correo: {
        type: Sequelize.STRING
    },
    contrasena: {
        type: Sequelize.TEXT
    }},
    {
        timestamps: false
    });
  
    return Usuario;
};


