var myApp = angular.module('MyApp', ['ngMaterial', 'ui.router']);


myApp.config(RoutesConfig);

myApp.config(ThemeConfig);


ThemeConfig.$inject = ['$mdThemingProvider'];

function ThemeConfig($mdThemingProvider){
  $mdThemingProvider.theme('success-toast');
  $mdThemingProvider.theme('error-toast');
  $mdThemingProvider.theme('info-toast')
  $mdThemingProvider.theme('default')
    .primaryPalette('tealPalette',{
      'default': '600'
    })
    .accentPalette('green')

  
      // Teal palette
      $mdThemingProvider.definePalette('tealPalette', {
        '50': 'E0F2F1',
        '100': 'B2DFDB',
        '200': '80CBC4',
        '300': '4DB6AC',
        '400': '26A69A',
        '500': '009688',
        '600': '00897B',
        '700': '00796B',
        '800': '00695C',
        '900': '004D40',
        'A100': 'A7FFEB',
        'A200': '64FFDA',
        'A400': '1DE9B6',
        'A700': '00BFA5',
        'contrastDefaultColor': 'light',   
                                           

        'contrastDarkColors': ['50', '100', 
            '200', '300', '400', 'A100'],
        'contrastLightColors': undefined    
    });

          // Teal palette
          $mdThemingProvider.definePalette('blueLightPalette', {
            '50': 'E1F5FE',
            '100': 'B3E5FC',
            '200': '81D4FA',
            '300': '29B6F6',
            '400': '29B6F6',
            '500': '03A9F4',
            '600': '039BE5',
            '700': '0288D1',
            '800': '0277BD',
            '900': '01579B',
            'A100': '80D8FF',
            'A200': '40C4FF',
            'A400': '00B0FF',
            'A700': '0091EA',
            'contrastDefaultColor': 'light',    
                                                
    
            'contrastDarkColors': ['50', '100', 
                '200', '300', '400', 'A100'],
            'contrastLightColors': undefined   
        });
}


RoutesConfig.$inject = ['$stateProvider','$urlRouterProvider'];

function RoutesConfig($stateProvider,$urlRouterProvider){

    $urlRouterProvider.otherwise('/')

    var homeState = {
      name: 'home',
      url: '/',
      templateUrl: 'listContenidos.html',
    }

    var loginState = {
      name: 'login',
      url: '/login',
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


    $stateProvider.state(homeState);
    $stateProvider.state(loginState);
    $stateProvider.state(registerState);
    $stateProvider.state(aboutState);
    $stateProvider.state(formState);
    $stateProvider.state(datailsState);

}

