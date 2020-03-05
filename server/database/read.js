const Hotel = require('./models/hotel');
const Perro = require('./models/perro');

module.exports = {
  async obtenerPerros() {
    return Perro.find()
      .then(perros => {
        return perros;
      })
      .catch(() => {
        return {
          status: 404,
          message: "No existen perros"
        };
      });
  },

  async obtenerPerro(cedula, nombre) {
    return Perro.findOne({ cedula: cedula, nombre: nombre })
      .then(perro => {
        return perro;
      })
      .catch(() => {
        return {
          status: 404,
          message: "perro no encontrado"
        };
      });
  },

  async obtenerHoteles() {
    return Hotel.find()
      .then(hoteles => {
        return hoteles;
      })
      .catch(() => {
        return {
          status: 404,
          message: "No existen hoteles"
        };
      });
  },

  async obtenerHotel(rif) {
    return Hotel.findOne({ rif: rif })
      .then(hotel => {
        return hotel;
      })
      .catch(() => {
        return {
          status: 404,
          message: "hotel no encontrado"
        };
      });
  }
};
