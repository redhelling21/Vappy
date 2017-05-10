angApp.
controller('ProdCtrl', ['$mdEditDialog', '$q', '$scope', '$timeout', function ($mdEditDialog, $q, $scope, $timeout, prodService){
    $scope.counter = 1;

    $scope.selected = [];
  $scope.limitOptions = [5, 10, 15];

  $scope.options = {
    limitSelect: true,
    pageSelect: true
  };

  $scope.query = {
    order: 'name',
    limit: 5,
    page: 1
  };

  $scope.pieces = [
        {
    _id: 1,
    prix: 10,
    collection: "Pinky Poo",
    categorie: "Coussin",
    matiere: "Polaire",
    taille: "Enfant",
    commande: false,
    date_ajout: "01/01/2000",
    date_vente: "02/01/2000",
    desc: "Tunique bleue jolie"
  },
  {
    _id: 1,
    prix: 10,
    collection: "Pinky Poo",
    categorie: "Coussin",
    matiere: "Polaire",
    taille: "Enfant",
    commande: false,
    date_ajout: "01/01/2000",
    date_vente: "02/01/2000",
    desc: "Tunique bleue jolie"
  },
  {
    _id: 1,
    prix: 10,
    collection: "Pinky Poo",
    categorie: "Coussin",
    matiere: "Polaire",
    taille: "Enfant",
    commande: false,
    date_ajout: "01/01/2000",
    date_vente: "02/01/2000",
    desc: "Tunique bleue jolie"
  },
  {
    _id: 1,
    prix: 10,
    collection: "Pinky Poo",
    categorie: "Coussin",
    matiere: "Polaire",
    taille: "Enfant",
    commande: false,
    date_ajout: "01/01/2000",
    date_vente: "02/01/2000",
    desc: "Tunique bleue jolie"
  }
    ];


  $scope.toggleLimitOptions = function () {
    $scope.limitOptions = $scope.limitOptions ? undefined : [5, 10, 15];
  };

  $scope.loadStuff = function () {
    $scope.promise = $timeout(function () {
      // loading
    }, 2000);
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

    $scope.makeid = function (){
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < 5; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }
}]);
