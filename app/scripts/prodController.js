angApp.
controller('ProdCtrl', function($scope, prodService){
    $scope.selected = [];

    $scope.query = {
        order: 'name',
        limit: 5,
        page: 1
    };

    function success(desserts) {
        $scope.desserts = desserts;
    }

    $scope.getDesserts = function () {
        $scope.promise = $nutrition.desserts.get($scope.query, success).$promise;
    };
});
