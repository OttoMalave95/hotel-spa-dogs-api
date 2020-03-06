const Hotel = require('./models/hotel');
const Perro = require('./models/perro');
const create = require('./create');

module.exports = {
  async asignarHabitacionPerro(data) {
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
      let data = {
        nombre: "Hotel de Perros",
        rif: "1234"
      }
      const nuevo_hotel = await create.crearHotel(data);
      hotel = nuevo_hotel.hotel;
    }

    const habitaciones = hotel['habitaciones'];

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

      const habitacion_disponible = habitaciones.find(item => item['disponible']);

      habitaciones.forEach(habitacion => {
        if (habitacion_disponible && habitacion['numero'] == habitacion_disponible['numero']) {
          habitacion['perro'] = perro;
          habitacion['disponible'] = false;
          perro_asignado = true;
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

    hotel['habitaciones'] = habitaciones;

    return Hotel.updateOne(hotel)
      .then((data) => {
        return {
          hotel: hotel,
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

  async asignarBañoPerro(data) {
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
      let data = {
        nombre: "Hotel de Perros",
        rif: "1234"
      }
      const nuevo_hotel = await create.crearHotel(data);
      hotel = nuevo_hotel.hotel;
    }

    const baño = hotel['spa']['baño'];

    if (baño.length) {
      baño.forEach(item => {
        if (item['perro'] && item['perro']['cedula'] == perro['cedula'] && item['perro']['nombre'] == perro['nombre']) {
          throw {
            status: 500,
            success: false,
            message: "El perro ya tiene asignado un baño",
          }
        }
      });

      let perro_asignado = false;

      const baño_disponible = baño.find(item => item['disponible']);

      baño.forEach(item => {
        if (baño_disponible && item['numero'] == baño_disponible['numero']) {
          item['perro'] = perro;
          item['disponible'] = false;
          perro_asignado = true;
        }
      });

      if (!perro_asignado) {
        baño.push({
          "perro": perro,
          "disponible": false,
          "numero": baño.length + 1
        });
      }
    } else {
      baño.push({
        "perro": perro,
        "disponible": false,
        "numero": 1
      });
    }

    perro.registros += 1;
    await perro.save();

    hotel['spa']['baño'] = baño;

    return Hotel.updateOne(hotel)
      .then((data) => {
        return {
          hotel: hotel,
          message: "Perro asginado a un baño"
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

  async asignarPeluqueriaPerro(data) {
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
      let data = {
        nombre: "Hotel de Perros",
        rif: "1234"
      }
      const nuevo_hotel = await create.crearHotel(data);
      hotel = nuevo_hotel.hotel;
    }

    const peluqueria = hotel['spa']['peluqueria'];

    if (peluqueria.length) {
      peluqueria.forEach(item => {
        if (item['perro'] && item['perro']['cedula'] == perro['cedula'] && item['perro']['nombre'] == perro['nombre']) {
          throw {
            status: 500,
            success: false,
            message: "El perro ya esta asignado en la peluqueria",
          }
        }
      });

      let perro_asignado = false;

      const peluqueria_disponible = peluqueria.find(item => item['disponible']);

      peluqueria.forEach(item => {
        if (peluqueria_disponible && item['numero'] == peluqueria_disponible['numero']) {
          item['perro'] = perro;
          item['disponible'] = false;
          perro_asignado = true;
        }
      });

      if (!perro_asignado) {
        peluqueria.push({
          "perro": perro,
          "disponible": false,
          "numero": peluqueria.length + 1
        });
      }
    } else {
      peluqueria.push({
        "perro": perro,
        "disponible": false,
        "numero": 1
      });
    }

    perro.registros += 1;
    await perro.save();

    hotel['spa']['peluqueria'] = peluqueria;

    return Hotel.updateOne(hotel)
      .then((data) => {
        return {
          hotel: hotel,
          message: "Perro asginado en la peluqueria"
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

  async asignarManicuraPerro(data) {
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
      let data = {
        nombre: "Hotel de Perros",
        rif: "1234"
      }
      const nuevo_hotel = await create.crearHotel(data);
      hotel = nuevo_hotel.hotel;
    }

    const manicura = hotel['spa']['manicura'];

    if (manicura.length) {
      manicura.forEach(item => {
        if (item['perro'] && item['perro']['cedula'] == perro['cedula'] && item['perro']['nombre'] == perro['nombre']) {
          throw {
            status: 500,
            success: false,
            message: "El perro ya esta asignado en la manicura",
          }
        }
      });

      let perro_asignado = false;

      const manicura_disponible = manicura.find(item => item['disponible']);

      manicura.forEach(item => {
        if (manicura_disponible && item['numero'] == manicura_disponible['numero']) {
          item['perro'] = perro;
          item['disponible'] = false;
          perro_asignado = true;
        }
      });

      if (!perro_asignado) {
        manicura.push({
          "perro": perro,
          "disponible": false,
          "numero": manicura.length + 1
        });
      }
    } else {
      manicura.push({
        "perro": perro,
        "disponible": false,
        "numero": 1
      });
    }

    perro.registros += 1;
    await perro.save();

    hotel['spa']['manicura'] = manicura;

    return Hotel.updateOne(hotel)
      .then((data) => {
        return {
          hotel: hotel,
          message: "Perro asginado en la manicura"
        };
      })
      .catch((err) => {
        throw {
          status: 500,
          success: false,
          message: err.message,
        }
      });
  }
}
