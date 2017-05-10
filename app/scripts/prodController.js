angApp.
controller('ProdCtrl', ['$mdEditDialog', '$q', '$scope', '$timeout', 'prodService', function ($mdEditDialog, $q, $scope, $timeout, prodService){
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
            console.log(doc);
            $scope.pieces = doc;
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
}]);
