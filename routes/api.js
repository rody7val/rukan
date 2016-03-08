// Controllers
var anuncioController = require('../controllers/anuncio_controller');

module.exports = function (app, express) {

  var api = express.Router();

  app.get('/api/search/:search', anuncioController.search);
  app.get('/api/anuncios', anuncioController.all);
  app.post('/api/anuncio', anuncioController.new);
  app.delete('/api/anuncio/:anuncio', anuncioController.delete);
  app.get('*', anuncioController.sendFile);

  return api;

}