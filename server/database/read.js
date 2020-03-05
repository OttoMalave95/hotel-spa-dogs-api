var mongoose = require("./config/mongoose-module");
var Proyecto = require("./models/proyecto");

module.exports = {

  async obtenerProyecto(id) {
    return Proyecto.findOne({ _id: id})
      .then(proyecto => {
        if (!proyecto) throw err;
        return proyecto;
      })
      .catch(() => {
        return {
          status: 404,
          message: "proyecto no encontrado"
        };
      });
  },

  async obtenerProyectos() {
    return Proyecto.find()
      .then(proyectos => {
        if (!proyectos) {
          throw err;
          console.log('proyectos: ', proyectos);
        } else {
          return proyectos;
          console.log('proyectos: ', proyectos);
        }
          
      })
      .catch(() => {
        return {
          status: 404,
          message: "no existen proyectos"
        };
      });
  },

};
