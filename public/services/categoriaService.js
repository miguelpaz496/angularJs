myApp.service('categoriaService', ['$window', function($window) {
    var categorias = [];
  
    var setCategorias = function(lista) {
        categorias = lista;
    };
  
    var getCategorias = function(){
        return $window.localStorage.getItem("cate");
    };
  
    return {
        setCategorias: setCategorias,
        getCategorias: getCategorias
    };
  
}]);