angApp.
controller('ProdCtrl', ['$scope',  'prodService', '$mdDialog', function ($scope, prodService, $mdDialog){
    var prod = this;
    var nextID = 1;
    $scope.counter = 1;
    $scope.selected = [];
    $scope.limitOptions = [10, 20, 30, 50];
    $scope.options = {
        limitSelect: true,
        pageSelect: true
    };

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

    $scope.addTest = function(){
        var piece1 = {
            _id: $scope.counter.toString(),
            prix: Math.floor(Math.random() * 1000),
            collection: $scope.makeid(),
            categorie: $scope.makeid(),
            matiere: $scope.makeid(),
            taille: $scope.makeid(),
            commande: false,
            date_ajout: new Date(),
            date_vente: null,
            desc: $scope.makeid()
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
                commande: false,
                date_ajout: new Date(),
                date_vente: null,
                desc: $scope.makeid()
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
        $mdDialog.show({
          controller: AddPieceController,
          contollerAs: prod,
          templateUrl: 'views/addPieceForm.html',
          parent: angular.element(document.body),
          targetEvent: $event,
          clickOutsideToClose:true
      }).then(function(answer) {
        prodService.producePiece({
            _id: nextID.toString(),
            prix: answer.prix,
            collection: answer.collection,
            categorie: answer.categorie,
            matiere: answer.matiere,
            taille: answer.taille,
            commande: answer.commande,
            date_ajout: new Date(),
            date_vente: null,
            desc: answer.desc
        });
        $scope.loadStuff();
        prod.desc = '';
        prod.prix = 0;
        prod.collection = '';
        prod.categorie = '';
        prod.matiere = '';
        prod.taille = '';
        prod.commande =  false;
    });
  }

  function AddPieceController($scope, $mdDialog){
    var prod = this;
    $scope.categories = ['Veste', 'Chapeau', 'Testé'];
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
