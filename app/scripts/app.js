const remote = require('electron').remote;
var NodePouchDB = require('pouchdb');
var leveldbDB = new NodePouchDB('mydb-leveldb');

var angApp = angular.module('myApp', ['ngMaterial', 'md.data.table']);
angApp.config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('blue')
        .accentPalette('orange');
});

angApp.filter('unsafe', function($sce) { return $sce.trustAsHtml; });
