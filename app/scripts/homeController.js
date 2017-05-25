angApp.
controller('HomeCtrl', ['$scope', 'prodService', 'invService', 'venteService', function($scope, prodService, invService, venteService){
    var window = remote.getCurrentWindow();
    $scope.json2xls = require('electron').remote.require('json2xls');
    ipcRenderer = require('electron').ipcRenderer;
    $scope.counter = 10;
    $scope.title = "Vappy";
    $scope.closeW = function(){
        window.close();
    }
    $scope.maxW = function(){
        if (!window.isMaximized()) {
            window.maximize();
        } else {
            window.unmaximize();
        }
    }
    $scope.reduceW = function(){
        window.minimize();
    }

    $scope.export_all = function(){
        console.log("coucou");
        prodService.export();
        invService.export();
        venteService.export();
    }

}]);
