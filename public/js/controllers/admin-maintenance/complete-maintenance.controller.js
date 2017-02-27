angular.module('app')
    .controller('CompleteMaintenance', function($scope, MaintenanceRequestService) {
        function getCompleteRequests() {
            MaintenanceRequestService.getRequestsByStatus('complete')
                .then(function(res) {
                    $scope.completeRequests = res;
                }, function(err) {
                    console.log(err);
                })
        }

        $scope.deleteRequest = function(id) {
            MaintenanceRequestService.delete(id)
                .then(function(res) {
                    removeById(id);
                }, function(err) {
                    console.log(err);
                })
        }

        function removeById(id) {
            for (var i = 0; i < $scope.completeRequests.length; i++) {
                if ($scope.completeRequests[i]._id === id) {
                    $scope.completeRequests.splice(i, 1);
                    break;
                }
            }
        }
        getCompleteRequests();
    });
