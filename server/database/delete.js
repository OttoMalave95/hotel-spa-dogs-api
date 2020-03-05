const mongoose = require('./config/mongoose-module');
var Proyecto = require('./models/proyecto');

module.exports = {
	async eliminarProyecto(proyecto) {
		if(proyecto.id) var id = proyecto.id;
    if(proyecto._id) var id = proyecto._id;
	  
	  return Proyecto.findOneAndDelete({ _id: id})
	    .then(proyecto => {
	      return {
	        message: "Proyecto eliminado"
	      };
	    })
	    .catch(err => {
	      return {
	        message: "Error al eliminar el proyecto"
	      };
	    });
	}
}