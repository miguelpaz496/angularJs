myApp.controller('contrlA', function($scope, $http, $window) {
  $http({
    method: 'GET',
    url: '/contenidos'
    }).then(function (response){
      $scope.categoriasList = response.data
      //console.log($scope.categoriasList)
    },function (error){
      console.log(error)
  });

});

myApp.controller('principal', function($scope, $mdSidenav) {

  $scope.toggleMenu = function () {
    $mdSidenav('menuList').toggle()
  }


});

/**
 *     headers: {
      'Authorization': 'Bearer ' + $window.localStorage.getItem('token')
    }
*/


myApp.controller('form_contenido', ['$scope', 'multipartForm', function($scope, multipartForm) {

  $scope.contenido = {};

  $scope.upload = function () {
    angular.element(document.querySelector('#fileInput')).click();
  };
  //console.log("formulario")

  $scope.nuevoContenido = function () {
    var fromDate = new Date($scope.contenido.fecha_limite);
    $scope.contenido.fecha_limite = new Date(fromDate).toDateString("yyyy-MM-dd");

    var uploadUrl = '/contenidos/';
    multipartForm.post(uploadUrl, $scope.contenido)
  }
  

}]);

myApp.controller('login_contenido', function($scope, $http, $window ) {

  $scope.usuario = {};


  $scope.loginUsuario = function () {

    $http({
      method: 'POST',
      url: '/usuarios/login',
      data: $scope.usuario
      }).then(function (response){
        
        console.log(response)
        //$localStorage.token = response.data.token;
        $window.localStorage.setItem('token', response.data.token);
        $window.localStorage.setItem('correo', response.data.usuario.correo);
        //$window.localStorage.setItem('nombre', response.data.usuario.correo);
        $scope.usuario = {};
        console.log("guardado")
        window.location = "/#!/contenidos"
        console.log("guardado")
      },function (error){
        console.log(error)
    });

  }

  $scope.verLocal = function () {

    console.log($window.localStorage.getItem('token'));
    console.log($window.localStorage.getItem('usuario'));

  }

  $scope.logout = function () {

    $window.localStorage.clear()
  }


});


myApp.controller('registrar_contenido', function($scope, $http, $window ) {

  $scope.usuario = {};


  $scope.registrarUsuario = function () {

    $http({
      method: 'POST',
      url: '/usuarios/register',
      data: $scope.usuario
      }).then(function (response){
        
        console.log(response)
        $scope.usuario = {};

      },function (error){
        console.log(error)
    });

  }
  

});


myApp.controller('detalles_contenido', function($scope, $http, $window ) {

  $scope.contenido = {};
  

  $http({
    method: 'GET',
    url: '/contenidos/'+$scope.numero,
    //params: {id: $scope.numero}
    }).then(function (response){
      
      $scope.contenido = response.data

    },function (error){
      console.log(error)
  });
});


