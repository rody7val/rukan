var express = require('express');
var cors = require('cors');
var favicon = require('serve-favicon');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');

var app = express();  

// Configuración con la app
  // Reducir CROSS Origine
  app.use(cors());
  // Favicon
  app.use(favicon(__dirname + '/public/favicon.ico'));            
  // Localización de los ficheros estÃ¡ticos
  app.use(express.static(path.join(__dirname + '/public')));
  // Muestra un log de todos los request en la consola        
  app.use(logger('dev')); 
  // Permite cambiar el HTML con el método POST   
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  // Simula DELETE y PUT                      
  app.use(methodOverride());

var url_DB = proccess.env.DATABASE_URL || 'mongodb://localhost:27017/rukan'

// Conexión con la base de datos
mongoose.connect(url_DB, function (err){
  if (err) console.error(err.name+': '+err.message);
  else console.log("Connected to database");
});

// Rutas API
var api = require('./routes/api')(app, express);
app.use('/', api);

// Escucha en el puerto 8080 y corre el server
app.listen(8080, function() {  
  console.log('App listening on port 8080');
});