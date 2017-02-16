angular.module('app')
    .controller('AdminProperties', function($scope, $rootScope) {
        sessionStorage.setItem("state", 3);
        $rootScope.state = 3;
    });
