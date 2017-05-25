angApp.
controller('ProdCtrl', ['$scope',  'prodService', '$mdDialog', '$mdToast', '$filter', function ($scope, prodService, $mdDialog, $mdToast, $filter){
    var prod = this;
    var nextID = 1;
    var {ipcRenderer} = require('electron');
    var lastCollection = "Printemps/Eté";
    var lastSize = "Enfant";
    var lastDSize = "3 ans";
    var lastCategory = "Veste";
    $scope.counter = 1;
    $scope.selected = [];
    $scope.limitOptions = [10, 20, 30, 50];
    $scope.options = {
        limitSelect: true,
        pageSelect: true
    };
    $scope.filter = {
        search: ''
    }
    $scope.query = {
        order: 'doc.prix',
        limit: 20,
        page: 1
    };

    $scope.pieces = prodService.getAllDocs();

    $scope.toggleLimitOptions = function () {
        $scope.limitOptions = $scope.limitOptions ? undefined : [10, 20, 30, 50];
    };

    $scope.loadStuff = function () {
        $scope.promise = prodService.getAllDocs();
        $scope.promise.then(function(doc){
            $scope.pieces = doc;
            nextID = doc.total_rows + 1;
        });
    }

    $scope.export = function(){
        $scope.promise = prodService.export();
    }

    ipcRenderer.on('exportDataBase-reply', (event, arg) => {
            $mdToast.show(
              $mdToast.simple()
                .textContent('Export réussi !')
                .position('bottom left right')
                .hideDelay(3000)
            );
    });

    $scope.addTest = function(){
        var piece1 = {
            _id: $scope.counter.toString(),
            prix: Math.floor(Math.random() * 1000),
            collection: $scope.makeid(),
            categorie: $scope.makeid(),
            matiere: $scope.makeid(),
            taille: $scope.makeid(),
            d_taille: $scope.makeid(),
            commande: false,
            date_ajout: new Date(),
            desc: $scope.makeid(),
            dest: $scope.makeid()
        };
        prodDB.put(piece1);
        $scope.counter++;
    }

    $scope.addMassTest = function(){

        for(i = 0; i< 5000; i++){
            var piece1 = {
                _id: $scope.counter.toString(),
                prix: Math.floor(Math.random() * 1000),
                collection: $scope.makeid(),
                categorie: $scope.makeid(),
                matiere: $scope.makeid(),
                taille: $scope.makeid(),
                d_taille: $scope.makeid(),
                commande: false,
                date_ajout: new Date(),
                desc: $scope.makeid(),
                dest: $scope.makeid()
            };
            $scope.counter++;
            prodDB.put(piece1);

        }

    }

    $scope.makeid = function (){
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < 5; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    $scope.showAddPieceForm = function($event){
        $scope.loadStuff();
        console.log($scope.lastCollection)
        $mdDialog.show({
          controller: AddPieceController,
          contollerAs: prod,
          templateUrl: 'views/addPieceForm.html',
          parent: angular.element(document.body),
          targetEvent: $event,
          clickOutsideToClose:true,
          locals: {
              lastCollection: lastCollection,
              lastSize: lastSize,
              lastDSize: lastDSize,
              lastCategory: lastCategory
          }
      }).then(function(answer) {
        prodService.producePiece({
            _id: nextID.toString(),
            prix: answer.prix,
            collection: answer.collection,
            categorie: answer.categorie,
            matiere: answer.matiere,
            taille: answer.taille,
            d_taille: answer.d_taille,
            commande: answer.commande,
            date_ajout: $filter('date')(new Date(), 'dd/MM/yy'),
            desc: answer.desc,
            dest: answer.commande ? answer.dest : ""
        });
        lastCollection = answer.collection;
        lastSize = answer.taille;
        lastDSize = answer.d_taille;
        lastCategory = answer.categorie;

        $scope.loadStuff();
    });
  }

  function AddPieceController($scope, $mdDialog, lastCollection, lastSize, lastDSize, lastCategory){
    $scope.prod = this;
    this.collection = lastCollection;
    this.taille = lastSize;
    this.d_taille = lastDSize;
    this.categorie = lastCategory;
    $scope.categories = ['Veste', 'Chapeau', 'Testé'];
    $scope.tailles_adulte = ['S', 'M', 'L', 'XL', 'XXL'];
    $scope.tailles_enfant = ['3 ans', '6 ans', '9 ans', '12 ans'];
    console.log($scope);
    $scope.cancel = function($event) {
        $mdDialog.cancel();
    };
    $scope.finish = function($event) {
        $mdDialog.hide();
    };
    $scope.answer = function(answer) {
        $mdDialog.hide(answer);
    }
}
}]);
