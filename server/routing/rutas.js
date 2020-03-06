var express = require("express");
var api = express.Router();
var read = require("../database/read");
var create = require("../database/create");
var update = require("../database/update");
var remove = require("../database/delete");

api.route("/").get((req, res) => {
  console.log('ruta raiz');
  res.send({ message: "Hola Mundo" });
});

api.route("/proyecto").post((req, res) => {
  var proyecto = req.body;
  create.nuevoProyecto(proyecto)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.send({ message: err.message });
    });
})
.get((req, res) => {
  var proyecto_id = req.query.id;
  read
    .obtenerProyecto(proyecto_id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.send(err);
    });
});

api.route("/editarProyecto").post((req, res) => {
  var Proyecto = req.body;
  update
    .editarProyecto(Proyecto)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.send({ message: err.message });
    });
});

api.route("/eliminarProyecto").post((req, res) => {
  var Proyecto = req.body;
  remove
    .eliminarProyecto(Proyecto)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.send({ message: err.message });
    });
})

api.route("/proyectos").get((req, res) => {
  read.obtenerProyectos()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res.send({ message: err.message });
    });
});

module.exports = api;
