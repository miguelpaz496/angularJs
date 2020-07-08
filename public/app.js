
var myApp = angular.module('MyApp', ['ngMaterial', 'ui.router']);

/**
 * 
 * myApp.config(function($stateProvider) {

  var helloState = {
    name: 'hello',
    url: '/api',
  }

  var aboutState = {
    name: 'about',
    url: '/about',
  }

  $stateProvider.state(helloState);
  $stateProvider.state(aboutState);
});
 * 
 * 
 */

myApp.config(RoutesConfig);


RoutesConfig.$inject = ['$stateProvider','$urlRouterProvider'];

function RoutesConfig($stateProvider,$urlRouterProvider){

    $urlRouterProvider.otherwise('/contenidos')

    var helloState = {
      name: 'hello',
      url: '/',
    }
  
    var aboutState = {
      name: 'about',
      url: '/contenidos',
      templateUrl: 'listContenidos.html',
    }
  
    $stateProvider.state(helloState);
    $stateProvider.state(aboutState);

}

