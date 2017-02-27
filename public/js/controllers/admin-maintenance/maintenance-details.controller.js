angular.module('app')
    .controller('MaintenanceDetails', function($scope, $state, MaintenanceRequestService) {
        function getRequest() {
            MaintenanceRequestService.getRequestById($state.params.id)
                .then(function(res) {
                    $scope.request = res;
                }, function(err) {
                    console.log(err);
                });
        }
        $scope.completeRequest = function() {
            MaintenanceRequestService.completeRequest($scope.request._id)
                .then(function(res) {
                    $state.go('admin-maintenance');
                }, function(err) {
                    console.log(err);
                })
        }

        getRequest();
    });
