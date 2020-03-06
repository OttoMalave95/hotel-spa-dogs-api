const express = require("express");
const api = express.Router();
const read = require("../database/read");
const create = require("../database/create");
const update = require("../database/update");
const remove = require("../database/delete");

api.route("/").get((req, res) => {
  res.send({ message: "Hola Mundo" });
});

api.route("/perros").post((req, res) => {
  create.crearPerro(req.body)
    .then((data) => {
      res.send(data);
    })
    .catch(err => {
      res.status(err.status).send(err);
    });
});

api.route("/hotel/asignar-habitacion-perro").post((req, res) => {
  update.asignarHabitacionPerro(req.body)
    .then((data) => {
      res.send(data);
    })
    .catch(err => {
      res.status(err.status).send(err);
    });
});

api.route("/spa/asignar-baño-perro").put((req, res) => {
  update.asignarBañoPerro(req.body)
    .then((data) => {
      res.send(data);
    })
    .catch(err => {
      res.status(err.status).send(err);
    });
});

api.route("/spa/asignar-peluqueria-perro").put((req, res) => {
  update.asignarPeluqueriaPerro(req.body)
    .then((data) => {
      res.send(data);
    })
    .catch(err => {
      res.status(err.status).send(err);
    });
});

api.route("/spa/asignar-manicura-perro").put((req, res) => {
  update.asignarManicuraPerro(req.body)
    .then((data) => {
      res.send(data);
    })
    .catch(err => {
      res.status(err.status).send(err);
    });
});

api.route("/retirar-perro").delete((req, res) => {
  remove.retirarPerro(req.body)
    .then((data) => {
      res.send(data);
    })
    .catch(err => {
      res.status(err.status).send(err);
    });
});

api.route("/sitios-ocupados").get((req, res) => {
  read.obtenerSitiosOcupados()
    .then((data) => {
      res.send(data);
    })
    .catch(err => {
      res.status(err.status).send(err);
    });
});

api.route("/cantidad-registros").get((req, res) => {
  read.cantidadRegistrosPerro(req.query)
    .then((data) => {
      res.send(data);
    })
    .catch(err => {
      res.status(err.status).send(err);
    });
});

api.route("/listado-perros").get((req, res) => {
  read.ListadoPerros()
    .then((data) => {
      res.send(data);
    })
    .catch(err => {
      res.status(err.status).send(err);
    });
});

module.exports = api;
