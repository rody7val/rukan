var mongoose = require("mongoose")
require('mongoose-double')(mongoose);
var Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;

// Esquema del modelo
var AnuncioSchema = new Schema({
	titulo: String,
	imagen: String,
	lat: SchemaTypes.Double,
	lng: SchemaTypes.Double,
  	created: {
        type: Date,
        default: Date.now
    }
});

// Definición de modelos
module.exports = mongoose.model('Anuncio', AnuncioSchema);

