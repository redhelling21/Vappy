angApp.
controller('HomeCtrl', function($scope){
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


});
