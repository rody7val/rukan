var Anuncio = require('../models/anuncio');

// GET para buscar anuncios por ciudad
exports.search = function (req, res){
    var geocoder = require('geocoder');
    geocoder.geocode(req.params.search, function(err, data){
      if(err) {
        res.send(err);
        return;
      }
      res.json(data);
    })
}

// GET de todos los Anuncios
exports.all = function (req, res) {  
    Anuncio.find({}, function(err, anuncios) {
      if(err) {
        res.send(err);
        return;
      }
      res.json(anuncios);
    });
}

// POST que crea un Anuncio y devuelve todos tras la creación
exports.new = function (req, res) {  
    var anuncio = new Anuncio({
      titulo: req.body.titulo
    });

    anuncio.save(function (err){
      if(err) {
        res.send(err);
        return;
      }
      Anuncio.find(function(err, anuncios) {
        if(err){
          res.send(err);
          return;
        }
        res.json(anuncios);
      });
    });
}

// DELETE un Anuncio específico y devuelve todos tras borrarlo.
exports.delete = function (req, res) {  
    Anuncio.remove({
        _id: req.params.anuncio
    }, function(err) {
        if(err){
          res.send(err);
          return;
        }

        Anuncio.find(function(err, anuncio) {
          if(err){
            res.send(err);
            return;
          }
          res.json(anuncio);
        });
    });
}

// Carga una vista HTML simple donde irá nuestra Single App Page
// Angular Manejará el Frontend
exports.sendFile = function (req, res, next) {  
    res.sendFile('./public/index.html');
}