module.exports = (sequelize, Sequelize) => {
    const Contenido = sequelize.define("contenido", {
    titulo: {
        type: Sequelize.STRING,
    },
    imagen: {
        type: Sequelize.STRING
    },
    enlace: {
        type: Sequelize.STRING
    },
    contenido: {
        type: Sequelize.TEXT
    },
    fecha_limite: {
        type: Sequelize.TIME
    },
    etiqueta: {
        type: Sequelize.STRING
    },
    categoria_id: {
        type: Sequelize.INTEGER
    },
    });
  
    return Contenido;
};
