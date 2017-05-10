const remote = require('electron').remote;
var NodePouchDB = require('pouchdb');

var prodDB = new NodePouchDB('prodDB');
var invDB = new NodePouchDB('invDB');
var venteDB = new NodePouchDB('venteDB');

var angApp = angular.module('myApp', ['ngMaterial', 'md.data.table']);
angApp.config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('blue')
        .accentPalette('orange');
});

angApp.filter('unsafe', function($sce) { return $sce.trustAsHtml; });
