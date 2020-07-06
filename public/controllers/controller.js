myApp.controller('contrlA', function($scope, $http) {
  $scope.firstName = "John";
  $scope.lastName = "Doe";

  

  $http({
    method: 'GET',
    url: '/api'
    }).then(function (response){
      $scope.categoriasList = response.data
      console.log($scope.categoriasList)
    },function (error){
      console.log(error)

    });

});