myApp.controller('contrlA', function($scope, $http) {
  $http({
    method: 'GET',
    url: '/contenidos'
    }).then(function (response){
      $scope.categoriasList = response.data
      console.log($scope.categoriasList)
    },function (error){
      console.log(error)
  });

});