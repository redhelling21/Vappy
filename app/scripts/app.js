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

    this.sortByField = function(field, lim, sk){
        console.log("sort by fields :");
        console.log(field);
        console.log(lim);
        console.log(sk);
        return prodDB.find({
          selector: {
            prix: {$gte: null}
          },
          sort: ['prix'],
          limit: lim,
          skip: sk
        });
    }

    this.filterByFieldValue = function(){

    }
});


