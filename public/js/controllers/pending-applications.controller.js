angular.module('app')
    .controller('PendingApplications', function($scope, ApplicationService) {
        $scope.getPendingApplications = function() {
            ApplicationService.getPendingApplications()
                .then(function(res) {
                    console.log(res);
                    $scope.pendingApplications = res;
                }, function(err) {
                    console.log(err);
                });
        }
    });
