angular.module('app')
    .controller('PendingMaintenance', function($scope, MaintenanceRequestService) {
        function getRequests() {
            MaintenanceRequestService.getRequestsByStatus('pending')
                .then(function(res) {
                    $scope.pendingRequests = res;
                }, function(err) {
                    console.log(err);
                })
        }

        $scope.completeRequest = function(request) {
            MaintenanceRequestService.completeRequest(request._id)
                .then(function(res) {
                    console.log(res);
                    removeById(request._id);
                }, function(err) {
                    console.log(err);
                })
        }

        function removeById(id) {
            for (var i = 0; i < $scope.pendingRequests.length; i++) {
                if ($scope.pendingRequests[i]._id === id) {
                    $scope.pendingRequests.splice(i, 1);
                    break;
                }
            }
        }

        getRequests();
    });
