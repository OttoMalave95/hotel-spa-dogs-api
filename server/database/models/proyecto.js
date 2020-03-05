var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Proyecto = new Schema({
  _id: Schema.Types.ObjectId,
  titulo: String,
  objetivo: String,
  tipo_proyecto: String,
  presupuesto: Number,
  materiales: [String],
  duracion: String,
  responsable: {
    nombre: String,
    apellido: String,
    cedula: String,
    correo_electronico: {
      type: String,
      lowercase: true
    }
  }
});

module.exports = mongoose.model("proyecto", Proyecto, "proyectos");
