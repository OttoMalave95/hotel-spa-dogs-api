const Hotel = require('./models/hotel');
const Perro = require('./models/perro');

module.exports = {
  async crearPerro(perro) {
    if (Object.keys(perro).length < 5) {
      throw {
        status: 404,
        success: false,
        message: "Debe ingresar todos los datos",
      }
    }

    perro['nombre'] = perro['nombre'].toUpperCase();

    const perroExiste = await Perro.findOne({ cedula: perro['cedula'], nombre: perro['nombre'] });
    if (perroExiste) {
      throw {
        status: 500,
        success: false,
        message: "Perro ya registrado",
      }
    }

    const nuevoPerro = new Perro({
      cedula: perro['cedula'],
      nombre: perro['nombre'],
      sexo: perro['sexo'],
      raza: perro['raza'],
      color: perro['color'],
      registros: 0
    });

    return nuevoPerro.save()
    .then((perro) => {
      return {
        perro: perro,
        message: "Perro registrado con exito"
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
    if (Object.keys(hotel).length < 2) {
      throw {
        status: 404,
        success: false,
        message: "Debe ingresar todos los datos",
      }
    }

    const hotelExiste = await Hotel.findOne({ rif: hotel['rif'] });
    if (hotelExiste) {
      throw {
        status: 500,
        success: false,
        message: "Hotel ya registrado",
      }
    }

    const nuevoHotel = new Hotel({
      nombre: hotel['nombre'],
      rif: hotel['rif'],
      habitaciones: [],
      spa: {
        baño: [],
        peluqueria: [],
        manicura: []
      }
    });

    return nuevoHotel.save()
    .then((hotel) => {
      return {
        hotel: hotel,
        message: "Hotel registrado con exito"
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
