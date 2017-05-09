const remote = require('electron').remote;

var angApp = angular.module('myApp', ['ngMaterial']);
angApp.config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('blue')
        .accentPalette('orange');
});
angApp.filter('unsafe', function($sce) { return $sce.trustAsHtml; });
