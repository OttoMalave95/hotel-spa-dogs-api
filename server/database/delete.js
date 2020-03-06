const Hotel = require('./models/hotel');
const Perro = require('./models/perro');

module.exports = {
  async retirarPerro(data) {
    if (Object.keys(data).length < 2) {
      throw {
        status: 404,
        success: false,
        message: "Debe ingresar todos los datos",
      }
    }

    data['nombre'] = data['nombre'].toUpperCase();

    const perro = await Perro.findOne({ cedula: data['cedula'], nombre: data['nombre'] });

    if (!perro) {
      throw {
        status: 404,
        success: false,
        message: "Perro no registrado",
      }
    }

    let hotel = await Hotel.findOne({});

    if (!hotel) {
      throw {
        status: 404,
        success: false,
        message: "No hay perros registrados en el hotel",
      }
    }

    const habitaciones = hotel['habitaciones'];
    const baño = hotel['spa']['baño'];
    const peluqueria = hotel['spa']['peluqueria'];
    const manicura = hotel['spa']['manicura'];
    let perro_registrado = false;
    let perro_retirado = true;

    if (habitaciones.length) {
      habitaciones.forEach(habitacion => {
        if (habitacion['perro'] && habitacion['perro']['cedula'] === perro['cedula'] && habitacion['perro']['nombre'] === perro['nombre']) {
          habitacion['perro'] = null;
          habitacion['disponible'] = true;
          perro_registrado = true;
          perro_retirado = false;
          return true;
        }
      });
    } 

    if (baño.length) {
      baño.forEach(item => {
        if (item['perro'] && item['perro']['cedula'] == perro['cedula'] && item['perro']['nombre'] == perro['nombre']) {
          item['perro'] = null;
          item['disponible'] = true;
          perro_registrado = true;
          perro_retirado = false;
          return true;
        }
      });
    }

    if (peluqueria.length) {
      peluqueria.forEach(item => {
        if (item['perro'] && item['perro']['cedula'] == perro['cedula'] && item['perro']['nombre'] == perro['nombre']) {
          item['perro'] = null;
          item['disponible'] = true;
          perro_registrado = true;
          perro_retirado = false;
          return true;
        }
      });
    }

    if (manicura.length) {
      manicura.forEach(item => {
        if (item['perro'] && item['perro']['cedula'] == perro['cedula'] && item['perro']['nombre'] == perro['nombre']) {
          item['perro'] = null;
          item['disponible'] = true;
          perro_registrado = true;
          perro_retirado = false;
          return true;
        }
      });
    }

    if (perro_retirado) {
      throw {
        status: 404,
        success: false,
        message: "El perro ya esta retirado del hotel",
      }
    }

    if (perro_registrado) {
      hotel['habitaciones'] = habitaciones;
      hotel['baño'] = baño;
      hotel['peluqueria'] = peluqueria;
      hotel['manicura'] = manicura;

      return Hotel.updateOne(hotel)
      .then((data) => {
        return {
          hotel: hotel,
          message: "Perro retirado con exito"
        };
      })
      .catch((err) => {
        throw {
          status: 500,
          success: false,
          message: err.message,
        }
      });
    } else {
      throw {
        status: 404,
        success: false,
        message: "El perro no esta registrado en el hotel",
      }
    }
  }
}