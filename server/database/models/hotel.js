const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Hotel = new Schema({
  nombre: String,
  rif: String,
  habitaciones: Array,
  spa: {
    baño: Array,
    peluqueria: Array,
    manicura: Array
  }
});

module.exports = mongoose.model("hotel", Hotel, "hoteles");
