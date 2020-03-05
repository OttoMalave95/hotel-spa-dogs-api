var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Hotel = new Schema({
  nombre: String,
  rif: String,
  habitaciones: Array,
  spa: {
    baño: Array,
    peluqueria: Array,
    corte_uñas: Array
  }
});

module.exports = mongoose.model("hotel", Hotel, "hoteles");
