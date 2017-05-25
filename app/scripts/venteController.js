angApp.
controller('VenteCtrl', ['$scope',  'venteService', '$mdDialog', '$mdToast', function ($scope, venteService, $mdDialog, $mdToast){
    $scope.selected = [];
    var {ipcRenderer} = require('electron');
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

    $scope.pieces = venteService.getAllDocs();

    $scope.toggleLimitOptions = function () {
        $scope.limitOptions = $scope.limitOptions ? undefined : [10, 20, 30, 50];
    };

    $scope.loadStuff = function () {
        $scope.promise = venteService.getAllDocs();
        $scope.promise.then(function(doc){
            $scope.pieces = doc;
            nextID = doc.total_rows + 1;
        });
    };

    $scope.export = function(){
        $scope.promise = venteService.export();
    }
}]);
