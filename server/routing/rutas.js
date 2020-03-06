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

api.route("/perros").post((req, res) => {
  create.crearPerro(req.body)
    .then((data) => {
      res.send(data);
    })
    .catch(err => {
      res.status(err.status).send(err);
    });
});

api.route("/hotel/asignar-habitacion-perro").put((req, res) => {
  update.asignarHabitacionPerro(req.body)
    .then((data) => {
      res.send(data);
    })
    .catch(err => {
      res.status(err.status).send(err);
    });
});

api.route("/hotel/retirar-perro").put((req, res) => {
  update.retirarPerro(req.body)
    .then((data) => {
      res.send(data);
    })
    .catch(err => {
      res.status(err.status).send(err);
    });
});

module.exports = api;
