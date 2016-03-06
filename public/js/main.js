angular
  .module('rukan', ['ngRoute'])
  .controller('MainController', MainController)
  .controller('AboutController', AboutController)
  .controller('ContactController', ContactController)
  // Configuración de las rutas
  .config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl : 'pages/home.html',
            controller  : 'MainController'
        })
        .when('/acerca', {
            templateUrl : 'pages/acerca.html',
            controller  : 'AboutController'
        })
        .when('/contacto', {
            templateUrl : 'pages/contacto.html',
            controller  : 'ContactController'
        })
        .otherwise({
            redirectTo: '/'
        });
  });

function MainController ($scope, $http, $location) {
  $scope.formData = {};
  $scope.nav = '/';

  // Cuando se cargue la página, pide del API todos los Anuncios
  $http.get('/api/anuncios')
    .success(function(data) {
      $scope.anuncios = data;
      console.log(data)
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });

  // Cuando se añade un nuevo Anuncio, manda el texto a la API
  $scope.crearAnuncio = function (){
    $http.post('/api/anuncio', $scope.formData)
      .success(function(data){
        $scope.formData = {};
        $scope.anuncios = data;
        console.log(data);
      })
      .error(function(data) {
        console.log('Error:' + data);
      });
  }

  // Borra un Anuncio despues de checkearlo como acabado
  $scope.borrarAnuncio = function(id) {
    $http.delete('/api/anuncio/' + id)
      .success(function(data) {
        $scope.anuncios = data;
        console.log(data);
      })
      .error(function(data) {
        console.log('Error:' + data);
      });
  };

  // Activacion del menu
  $scope.menuClass = function(page) {
    var current = $location.path().substring(1);
    return page === current ? "active" : "";
  };
}

function AboutController ($scope) {
    $scope.nav = 'about';
}

function ContactController ($scope) {
    $scope.nav = 'contact';
}