angular.module('app')
    .controller('AdminApplications', function($scope, $rootScope, ApplicationService) {
        sessionStorage.setItem("state", 3);
        $rootScope.state = 3;
    });
