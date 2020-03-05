var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Perro = new Schema({
  cedula: String,
  nombre: String,
  especie: String,
  sexo: String,
  raza: String,
  color: String,
  registros: Number
});

module.exports = mongoose.model("perro", Perro, "perros");
