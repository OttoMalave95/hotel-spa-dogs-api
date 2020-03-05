var mongoose = require("./config/mongoose-module");
var Proyecto = require("./models/proyecto");

module.exports = {

  async editarProyecto(proyecto) {
    if(proyecto.id)var id = proyecto.id;
    if(proyecto._id) var id = proyecto._id;

    return Proyecto.findOne({_id: id}).then(data => {
      
      if (proyecto["titulo"]) data["titulo"] = proyecto["titulo"];
      if (proyecto["objetivo"]) data["objetivo"] = proyecto["objetivo"];
      if (proyecto["tipo_proyecto"]) data["tipo_proyecto"] = proyecto["tipo_proyecto"];
      if (proyecto["presupuesto"]) data["presupuesto"] = proyecto["presupuesto"];
      if (proyecto["materiales"]) data["materiales"] = proyecto["materiales"];
      if (proyecto["duracion"]) data["duracion"] = proyecto["duracion"];
      if (proyecto["nombre"]) data["responsable"]["nombre"] = proyecto["nombre"];
      if (proyecto["apellido"]) data["responsable"]["apellido"] = proyecto["apellido"];
      if (proyecto["cedula"]) data["responsable"]["cedula"] = proyecto["cedula"];
      if (proyecto["correo_electronico"]) data["responsable"]["correo_electronico"] = proyecto["correo_electronico"];
      
      return data.save(data).then((data)=>{
        return {
          Proyecto: data,
          message: "Proyecto modificado con exito"
        };
      }).catch(err => {
        return {
          message: "Error al modificar los datos del proyecto"
        }
      });
    });
  }
}
