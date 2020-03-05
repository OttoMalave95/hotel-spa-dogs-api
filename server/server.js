"use strict";
var express = require("express");
var body_parser = require("body-parser");
var morgan = require("morgan");
var config = require("./database/config/configuracion.js");
var Proyecto = require("./database/models/proyecto");
var proyectos = require('./routing/rutas_proyectos');

var app = express();

app.use(morgan("tiny"));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(body_parser.urlencoded({ extended: true }));
app.use(body_parser.json());

//Rutas del api del servidor
var api = express.Router();
app.use("/api", api);

api.use('/proyectos', proyectos);

app.listen((process.env.PORT || 3000),"0.0.0.0", function() {
  console.log("Ejecutando en el puerto: "+ (process.env.PORT || 3000));
});
