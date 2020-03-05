const Hotel = require('./models/hotel');
const Perro = require('./models/perro');

module.exports = {
  async crearPerro(perro) {
    const nuevoPerro = new Perro({
      cedula: perro['cedula'],
      nombre: perro['nombre'],
      especie: perro['especie'],
      sexo: perro['sexo'],
      raza: perro['raza'],
      color: perro['color'],
      registros: perro['registros']
    })
    return nuevoPerro.save()
    .then((perro) => {
      return {
        perro: perro,
        message: "Se registro el perro satisfactoriamente"
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

  async crearHotel(hotel) {
    const nuevoHotel = new Hotel({
      nombre: hotel['nombre'],
      rif: hotel['rif'],
      habitaciones: [],
      spa: {
        baño: [],
        peluqueria: [],
        manicura: []
      }
    })
    return nuevoHotel.save()
    .then((hotel) => {
      return {
        hotel: hotel,
        message: "Se registro el hotel satisfactoriamente"
      };
    })
    .catch((err) => {
      throw {
        status: 500,
        success: false,
        message: err.message,
      }
    })
  }
}
