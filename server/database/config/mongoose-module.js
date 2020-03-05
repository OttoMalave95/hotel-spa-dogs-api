const mongoose = require("mongoose");
const config = require("./configuracion");
mongoose.connect(config.database,{poolSize: 4, autoIndex: false, useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log("Conectado a la base de datos");
})
.catch(err=>{
    console.log("error de conexion con la base de datos de mongo");
});
mongoose.Promise = global.Promise;
module.exports = mongoose;
