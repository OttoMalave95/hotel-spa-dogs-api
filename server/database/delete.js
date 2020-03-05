const Hotel = require('./models/hotel');
const Perro = require('./models/perro');

module.exports = {
	async eliminarPerro(perroId) {
		return Perro.findOneAndDelete({ _id: perroId})
	    .then(perro => {
	      return {
	        message: "Perro eliminado"
	      };
	    })
	    .catch(err => {
	      return {
	        message: "Error al eliminar el perro"
	      };
	    });
	},

	async eliminarHotel(hotelId) {
		return Hotel.findOneAndDelete({ _id: hotelId})
	    .then(hotel => {
	      return {
	        message: "Hotel eliminado"
	      };
	    })
	    .catch(err => {
	      return {
	        message: "Error al eliminar el hotel"
	      };
	    });
	}
}