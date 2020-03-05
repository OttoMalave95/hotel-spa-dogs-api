const Hotel = require('./models/hotel');
const Perro = require('./models/perro');

module.exports = {
  async editarPerro(perro) {
    if(perro.id)var id = perro.id;
    if(perro._id) var id = perro._id;

    return Perro.findOne({_id: id}).then(data => {

      if (perro["cedula"]) data["cedula"] = perro["cedula"];
      if (perro["nombre"]) data["nombre"] = perro["nombre"];
      if (perro["especie"]) data["especie"] = perro["especie"];
      if (perro["sexo"]) data["sexo"] = perro["sexo"];
      if (perro["raza"]) data["raza"] = perro["raza"];
      if (perro["color"]) data["color"] = perro["color"];
      if (perro["registros"]) data["registros"] = perro["registros"];

      return data.save(data).then((data)=>{
        return {
          Perro: data,
          message: "Perro modificado con exito"
        };
      }).catch(err => {
        return {
          message: "Error al modificar los datos del perro"
        }
      });
    });
  },

  async editarHotel(hotel) {
    if(hotel.id)var id = hotel.id;
    if(hotel._id) var id = hotel._id;

    return Hotel.findOne({_id: id}).then(data => {

      if (hotel["nombre"]) data["nombre"] = hotel["nombre"];
      if (hotel["rif"]) data["rif"] = hotel["rif"];
      if (hotel["habitaciones"]) data["habitaciones"] = hotel["habitaciones"];
      if (hotel["spa"]["baño"]) data["spa"]["baño"] = hotel["spa"]["baño"];
      if (hotel["spa"]["peluqueria"]) data["spa"]["peluqueria"] = hotel["spa"]["peluqueria"];
      if (hotel["spa"]["manicura"]) data["spa"]["manicura"] = hotel["spa"]["manicura"];

      return data.save(data).then((data)=>{
        return {
          Hotel: data,
          message: "Hotel modificado con exito"
        };
      }).catch(err => {
        return {
          message: "Error al modificar los datos del hotel"
        }
      });
    });
  }
}
