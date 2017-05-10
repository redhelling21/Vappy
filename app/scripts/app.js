const remote = require('electron').remote;
var NodePouchDB = require('pouchdb');

var prodDB = new NodePouchDB('prodDB');
var invDB = new NodePouchDB('invDB');
var venteDB = new NodePouchDB('venteDB');

var angApp = angular.module('myApp', ['ngMaterial', 'md.data.table', 'DAOservices']);
angApp.config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('blue')
        .accentPalette('orange');
});

angApp.filter('unsafe', function($sce) { return $sce.trustAsHtml; });

/*
var piece1 = {
    _id: 1,
    prix: 10,
    collection: "Pinky Poo",
    taille: "Enfant",
    commande: false,
    desc: "Tunique bleue jolie"
  };*/
