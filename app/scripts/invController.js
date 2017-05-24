angApp.
controller('InvCtrl', ['$scope',  'invService', '$mdDialog', '$mdToast', function ($scope, invService, $mdDialog, $mdToast){
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

    $scope.sell = function(piece){
        invDB.remove(piece);
        delete piece._rev;
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
    };

    $scope.export = function(){
        $scope.promise = invService.getAllDocs()
            .then(function(doc){
                var temp = [];
                doc.rows.forEach(function(element){
                    temp = temp.concat(element.doc);
                });
                console.log(temp);
                ipcRenderer.send('exportInv', temp);
            });
    }
}]);
