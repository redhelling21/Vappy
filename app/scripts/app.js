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
        venteDB.put(piece);
      }
    }

    this.export = function(){
      return this.getAllDocs()
              .then(function(doc){
                  var temp = [];
                  doc.rows.forEach(function(element){
                      temp = temp.concat(element.doc);
                  });
                  console.log(temp);
                  ipcRenderer.send('exportProd', temp);
              });
    }
});

angApp.service("invService", function(){
    this.getAllDocs = function(){
        return invDB.allDocs({include_docs: true, descending: true});
    }

    this.export = function(){
      return this.getAllDocs()
              .then(function(doc){
                  var temp = [];
                  doc.rows.forEach(function(element){
                      temp = temp.concat(element.doc);
                  });
                  console.log(temp);
                  ipcRenderer.send('exportInv', temp);
              });
    }
});

angApp.service("venteService", function(){
    this.getAllDocs = function(){
        return venteDB.allDocs({include_docs: true, descending: true});
    }

    this.export = function(){
      return this.getAllDocs()
              .then(function(doc){
                  var temp = [];
                  doc.rows.forEach(function(element){
                      temp = temp.concat(element.doc);
                  });
                  console.log(temp);
                  ipcRenderer.send('exportVente', temp);
              });
    }
});
