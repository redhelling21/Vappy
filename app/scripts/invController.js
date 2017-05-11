angApp.
controller('InvCtrl', ['$scope',  'invService', '$mdDialog', function ($scope, invService, $mdDialog){
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

    $scope.sell = function(piece){
        invDB.remove(piece);
        delete piece._rev;
        piece.date_vente = new Date();
        venteDB.put(piece);
        $scope.loadStuff();
    }

    $scope.pieces = invService.getAllDocs();

    $scope.toggleLimitOptions = function () {
        $scope.limitOptions = $scope.limitOptions ? undefined : [10, 20, 30, 50];
    };

    $scope.loadStuff = function () {
        $scope.promise = invService.getAllDocs();
        $scope.promise.then(function(doc){
            $scope.pieces = doc;
            nextID = doc.total_rows + 1;
        });
    }
}]);
