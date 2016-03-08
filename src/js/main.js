require('angular');
require('angular-route');
require('leaflet');
require('angular-leaflet-directive');

angular
  .module('rukan', ['ngRoute', 'leaflet-directive'])
  .controller('MainController', MainController)
  .controller('AboutController', AboutController)
  .controller('ContactController', ContactController)
  .controller('CreateController', CreateController)
  // Configuración de las rutas
  .config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl : 'pages/buscar.html',
            controller  : 'MainController'
        })
        .when('/crear', {
            templateUrl : 'pages/crear.html',
            controller  : 'CreateController'
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


function MainController($scope, $http, $location){

  $scope.formData = {};
  $scope.page = 'home';
  $scope.map = {};
  $scope.markers = {};

  $scope.buscarAnuncio = function(search){
    $http.get('/api/search/' + search)
      .success(function(data){
        $scope.formData = {};
        $scope.busquedas = data.results;
        console.log(data);
      })
      .error(function(data) {
        console.log('Error:' + data);
      });
  }

  $scope.localizarBusqueda = function(location){
    $location.search({c: location.lat+':'+location.lng+':4'});
    $scope.markers = {
      osloMarker: {
        lat: location.lat,
        lng: location.lng,
        message: "I want to travel here!",
        focus: true,
        draggable: false
      }
    }
  }

  // Activacion del menu
  $scope.menuClass = function(page) {
    var current = $location.path().substring(1);
    return page === current ? "active" : "";
  };

}

function CreateController ($scope, $http) {

  $scope.formData = {};
  $scope.page = 'crear';

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

}

function AboutController ($scope) {
    $scope.page = 'about';
}

function ContactController ($scope) {
    $scope.page = 'contact';
}