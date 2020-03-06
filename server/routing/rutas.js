const express = require("express");
const api = express.Router();
const read = require("../database/read");
const create = require("../database/create");
const update = require("../database/update");
const remove = require("../database/delete");

api.route("/").get((req, res) => {
  console.log('ruta raiz');
  res.send({ message: "Hola Mundo" });
});

// api.route("/perro").post((req, res) => {

// });

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
