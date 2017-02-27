angular.module('app')
    .controller('AdminMaintenanceRequests', function($scope, $rootScope, MaintenanceRequestService) {
        sessionStorage.setItem("state", 3);
        $rootScope.state = 3;
    });
