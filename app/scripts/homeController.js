angApp.
controller('HomeCtrl', function($scope){
	var window = remote.getCurrentWindow();
	const {ipcRenderer} = require('electron');
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
