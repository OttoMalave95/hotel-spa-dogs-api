const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Perro = new Schema({
  cedula: String,
  nombre: String,
  sexo: String,
  raza: String,
  color: String,
  registros: Number
});

module.exports = mongoose.model("perro", Perro, "perros");
