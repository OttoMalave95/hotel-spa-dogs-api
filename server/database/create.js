const mongoose = require('./config/mongoose-module');
var Proyecto = require('./models/proyecto');
module.exports = {

  async nuevoProyecto(proyecto) {
    
    const nuevoProyecto = new Proyecto({
      '_id': new mongoose.Types.ObjectId(),
      'titulo': proyecto['titulo'],
      'objetivo': proyecto['objetivo'],
      'tipo_proyecto': proyecto['tipo_proyecto'],
      'presupuesto':proyecto['presupuesto'],
      'materiales': proyecto['materiales'],
      'duracion': proyecto['duracion'],
      'responsable':{
        'nombre': proyecto['nombre'],
        'apellido': proyecto['apellido'],
        'cedula': proyecto['cedula'],
        'correo_electronico': proyecto['correo_electronico'],
      }
    })
    return nuevoProyecto.save()
    .then((proyecto) => {
      return {
        proyecto: proyecto,
        message: "Se registro el proyecto satisfactoriamente"
      };
    })
    .catch((err) => {
      throw {
        status: 500,
        success: false,
        message: err.message,
      }
    })
  },
}
