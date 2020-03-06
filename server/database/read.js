const Hotel = require('./models/hotel');
const Perro = require('./models/perro');

module.exports = {
  async obtenerSitiosOcupados() {
    const hotel = await Hotel.findOne({});

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
    let catidad_habitaciones = 0;
    let catidad_baño = 0;
    let catidad_peluqueria = 0;
    let catidad_manicura = 0;

    if (habitaciones.length) {
      habitaciones.forEach(item => {
        if (!item['disponible']) catidad_habitaciones += 1;
      });
    }

    if (baño.length) {
      baño.forEach(item => {
        if (!item['disponible']) catidad_baño += 1;
      });
    }

    if (peluqueria.length) {
      peluqueria.forEach(item => {
        if (!item['disponible']) catidad_peluqueria += 1;
      });
    }

    if (manicura.length) {
      manicura.forEach(item => {
        if (!item['disponible']) catidad_manicura += 1;
      });
    }

    return {
      catidad_habitaciones: catidad_habitaciones,
      catidad_baño: catidad_baño,
      catidad_peluqueria: catidad_peluqueria,
      catidad_manicura: catidad_manicura
    }
  },

  async cantidadRegistrosPerro(data) {
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

    return {
      registros: perro.registros
    }
  },

  async ListadoPerros(data) {

    let lista_perros = [];

    const hotel = await Hotel.findOne({});

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

    if (habitaciones.length) {
      habitaciones.forEach(item => {
        if (!item['disponible']) lista_perros.push({ perro: item['perro'], sitio: 'habitacion', numero: item['numero'] });
      });
    }

    if (baño.length) {
      baño.forEach(item => {
        if (!item['disponible']) lista_perros.push({ perro: item['perro'], sitio: 'baño', numero: item['numero'] });
      });
    }

    if (peluqueria.length) {
      peluqueria.forEach(item => {
        if (!item['disponible']) lista_perros.push({ perro: item['perro'], sitio: 'peluqueria', numero: item['numero'] });
      });
    }

    if (manicura.length) {
      manicura.forEach(item => {
        if (!item['disponible']) lista_perros.push({ perro: item['perro'], sitio: 'manicura', numero: item['numero'] });
      });
    }

    if (lista_perros.length) {
      return {
        listado: lista_perros
      }
    } else {
      throw {
        status: 500,
        success: false,
        message: "No hay perros registrados en el hotel",
      }
    }
  }
};
