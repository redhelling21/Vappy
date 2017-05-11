const remote = require('electron').remote;
var NodePouchDB = require('pouchdb');
NodePouchDB.plugin(require('pouchdb-find'));

var prodDB = new NodePouchDB('prodDB');
var invDB = new NodePouchDB('invDB');
var venteDB = new NodePouchDB('venteDB');

/*prodDB.createIndex({
  index: {
    fields: ['prix', 'collection', 'matiere', 'taille', 'commande', 'date_ajout', 'date_vente']
  }
});*/

var angApp = angular.module('myApp', ['ngMaterial', 'md.data.table', 'ngMessages']);
angApp.config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('blue')
        .accentPalette('orange');
});

angApp.filter('unsafe', function($sce) { return $sce.trustAsHtml; });

angApp.service("prodService", function(){
    this.getAllDocs = function(){
        return prodDB.allDocs({include_docs: true, descending: true});
    }

    this.producePiece = function(piece){
      prodDB.put(piece);
      if(piece.commande != true){
        invDB.put(piece);
      }else{
        piece.date_vente = new Date();
        venteDB.put(piece);
      }

    }
});

angApp.service("invService", function(){
    this.getAllDocs = function(){
        return invDB.allDocs({include_docs: true, descending: true});
    }
});

angApp.service("venteService", function(){
    this.getAllDocs = function(){
        return venteDB.allDocs({include_docs: true, descending: true});
    }
});

