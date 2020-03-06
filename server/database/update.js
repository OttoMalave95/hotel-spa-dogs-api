const Hotel = require('./models/hotel');
const Perro = require('./models/perro');
const create = require('./create');

module.exports = {
  async asignarHabitacionPerro(data) {
    if (Object.keys(data).length < 2) {
      throw {
        status: 500,
        success: false,
        message: "Debe ingresar todos los datos",
      }
    }

    const perro = await Perro.findOne({ cedula: data['cedula'], nombre: data['nombre'] });

    if (!perro) {
      throw {
        status: 500,
        success: false,
        message: "Perro no resgistrado",
      }
    }

    let hotel = await Hotel.findOne({});

    if (!hotel) {
      let data = {
        nombre: "Hotel de Perros",
        rif: "1234"
      }
      const nuevo_hotel = await create.crearHotel(data);
      hotel = nuevo_hotel.hotel;
    }

    const habitaciones = hotel.habitaciones;

    if (habitaciones.length) {
      habitaciones.forEach(habitacion => {
        if (habitacion['perro'] && habitacion['perro']['cedula'] == perro['cedula'] && habitacion['perro']['nombre'] == perro['nombre']) {
          throw {
            status: 500,
            success: false,
            message: "El perro ya tiene una habitación asignada",
          }
        }
      });

      let perro_asignado = false;

      habitaciones.forEach(habitacion => {
        if (habitacion['disponible']) {
          habitacion['perro'] = perro;
          habitacion['disponible'] = false;
          perro_asignado = true;
          break;
        }
      });

      if (!perro_asignado) {
        habitaciones.push({
          "perro": perro,
          "disponible": false,
          "numero": habitaciones.length + 1
        });
      }
    } else {
      habitaciones.push({
        "perro": perro,
        "disponible": false,
        "numero": 1
      });
    }

    perro.registros += 1;
    await perro.save();

    hotel.habitaciones = habitaciones;

    return hotel.save()
      .then((data) => {
        return {
          hotel: data,
          message: "Perro asginado a una habitación"
        };
      })
      .catch((err) => {
        throw {
          status: 500,
          success: false,
          message: err.message,
        }
      });
  },

  async retirarPerro(data) {
    if (Object.keys(data).length < 2) {
      throw {
        status: 500,
        success: false,
        message: "Debe ingresar todos los datos",
      }
    }

    const perro = await Perro.findOne({ cedula: data['cedula'], nombre: data['nombre'] });

    if (!perro) {
      throw {
        status: 500,
        success: false,
        message: "Perro no resgistrado",
      }
    }

    let hotel = await Hotel.findOne({});

    if (!hotel) {
      throw {
        status: 500,
        success: false,
        message: "No hay perros registrados en el hotel",
      }
    }

    const habitaciones = hotel['habitaciones'];
    const baño = hotel['habitaciones']['spa']['baño'];
    const peluqueria = hotel['habitaciones']['spa']['peluqueria'];
    const manicura = hotel['habitaciones']['spa']['manicura'];
    let perro_registrado = false;

    if (habitaciones.length) {
      habitaciones.forEach(habitacion => {
        if (habitacion['perro'] && habitacion['perro']['cedula'] == perro['cedula'] && habitacion['perro']['nombre'] == perro['nombre']) {
          habitacion['perro'] = null;
          habitacion['disponible'] = true;
          perro_registrado = true;
          break;
        }
      });
    } 

    if (baño.length) {
      baño.forEach(item => {
        if (item['perro'] && item['perro']['cedula'] == perro['cedula'] && item['perro']['nombre'] == perro['nombre']) {
          item['perro'] = null;
          item['disponible'] = true;
          perro_registrado = true;
          break;
        }
      });
    }

    if (peluqueria.length) {
      peluqueria.forEach(item => {
        if (item['perro'] && item['perro']['cedula'] == perro['cedula'] && item['perro']['nombre'] == perro['nombre']) {
          item['perro'] = null;
          item['disponible'] = true;
          perro_registrado = true;
          break;
        }
      });
    }

    if (manicura.length) {
      manicura.forEach(item => {
        if (item['perro'] && item['perro']['cedula'] == perro['cedula'] && item['perro']['nombre'] == perro['nombre']) {
          item['perro'] = null;
          item['disponible'] = true;
          perro_registrado = true;
          break;
        }
      });
    }
    
    if (perro_registrado) {
      hotel.habitaciones = habitaciones;
      hotel.baño = baño;
      hotel.peluqueria = peluqueria;
      hotel.manicura = manicura;

      return hotel.save()
      .then((data) => {
        return {
          hotel: data,
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
        status: 500,
        success: false,
        message: "El perro no esta registrado en el hotel",
      }
    }
  }
}
