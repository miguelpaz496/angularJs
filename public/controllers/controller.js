myApp.controller('contrlA', function($scope, $http) {
  $http({
    method: 'GET',
    url: '/contenidos'
    }).then(function (response){
      $scope.categoriasList = response.data

    },function (error){
      console.log(error)
  });

});

myApp.controller('principal', function($scope, $mdSidenav,  $window) {

  $scope.toggleMenu = function () {
    $mdSidenav('menuList').toggle()
  };

  var user = $window.localStorage.getItem('token');

  $scope.button_log = false;

  if(user){
    $scope.button_log = true;
  }

  $scope.logout = function () {

    $window.localStorage.clear()
    window.location = "/"
  };

});


myApp.controller('form_contenido', ['$scope','multipartForm', 'categoriaService',  function($scope, multipartForm , categoriaService) {

 
  $scope.contenido = {};
  $scope.nombreImagen = "";

  $scope.cate_select = JSON.parse(categoriaService.getCategorias())

  $scope.upload = function () {
    angular.element(document.querySelector('#fileInput')).click();
  };


  $scope.nuevoContenido = function () {

    var fromDate = new Date($scope.contenido.fecha_limite);
    $scope.contenido.fecha_limite = new Date(fromDate).toDateString("yyyy-MM-dd");

    var uploadUrl = '/contenidos/';
    multipartForm.post(uploadUrl, $scope.contenido)
    $scope.contenido = {};
    $scope.contenidoForm.$setPristine();
    $scope.contenidoForm.$setUntouched();
  }
  

}]);

myApp.controller('login_contenido', function($scope, $http, $window, categoriaService, toastService ) {

  $scope.usuario = {};



  $scope.loginUsuario = function () {

    $http({
      method: 'POST',
      url: '/usuarios/login',
      data: $scope.usuario
      }).then(function (response){

        if(response.status === 200){

          $window.localStorage.setItem('token', response.data.token);
          $window.localStorage.setItem('correo', response.data.usuario.correo);
          $window.localStorage.setItem('cate', JSON.stringify(response.data.categorias));
          
          $scope.usuario = {};
          categoriaService.setCategorias(JSON.stringify(response.data.categorias));

          $scope.loginForm.$setPristine();
          $scope.loginForm.$setUntouched();

          window.location = "/"


        }else{
          console.log(response)
          toastService.lanzar(response.data.message,"info");
        }
        


      },function (error){
        console.log(error)
        toastService.lanzar(error.data.mensaje,"error");
    });

  }

});


myApp.controller('registrar_contenido', function($scope, $http, $window, toastService ) {

  $scope.usuario = {};


  $scope.registrarUsuario = function () {

    $http({
      method: 'POST',
      url: '/usuarios/register',
      data: $scope.usuario
      }).then(function (response){

        if(response.status === 200){

          $scope.usuario = {};
          toastService.lanzar(response.data.message,"success");
          $scope.registerForm.$setPristine();
          $scope.registerForm.$setUntouched();
          window.location = "#!/login"

        }else{
          console.log(response)
          toastService.lanzar(response.data.message,"info");
        }
        
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
    }).then(function (response){
      

      if(response.status === 200){

        $scope.contenido = response.data

      }else{
        $scope.contenido = {titulo: '', mensaje: response.data.message}
      }



    },function (error){
      console.log(error)
  });
});


