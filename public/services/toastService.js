myApp.service('toastService', ['$mdToast', function($mdToast) {

  
    var lanzar = function(texto, tipo) {
        $mdToast.show($mdToast.simple()
        .textContent(texto)
        .position("top right")
        .hideDelay(3000)
        .theme(tipo + "-toast"));
        // Could also do $mdToast.showSimple('Hello');
    };
  
    return {
        lanzar: lanzar
    };
  
}]);