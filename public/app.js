var myApp = angular.module('MyApp', ['ngMaterial', 'ui.router']);


myApp.config(RoutesConfig);


RoutesConfig.$inject = ['$stateProvider','$urlRouterProvider'];

function RoutesConfig($stateProvider,$urlRouterProvider){

    $urlRouterProvider.otherwise('/')

    var loginState = {
      name: 'login',
      url: '/',
      templateUrl: 'login.html',
    }

    var registerState = {
      name: 'registro',
      url: '/registro/',
      templateUrl: 'register.html',
    }
  
    var aboutState = {
      name: 'about',
      url: '/contenidos',
      templateUrl: 'listContenidos.html',
    }

    var formState = {
      name: 'formulario',
      url: '/fomulario/',
      templateUrl: 'formulario.html',
    }

    var datailsState = {
      name: 'detalles',
      url: '/contenidos/:id',
      templateUrl: 'detalles.html',
      controller: function($scope, $stateParams) {
        $scope.numero = $stateParams.id;
      }
    }
  
    $stateProvider.state(loginState);
    $stateProvider.state(registerState);
    $stateProvider.state(aboutState);
    $stateProvider.state(formState);
    $stateProvider.state(datailsState);

}

