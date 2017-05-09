angApp.
controller('HomeCtrl', function($scope, $mdToast){
	var window = remote.getCurrentWindow();
	const {ipcRenderer} = require('electron');
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
