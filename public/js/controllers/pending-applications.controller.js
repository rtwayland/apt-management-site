angular.module('app')
    .controller('PendingApplications', function($scope, ApplicationService) {
        function getPendingApplications() {
            ApplicationService.getPendingApplications()
                .then(function(res) {
                    $scope.pendingApplications = res;
                }, function(err) {
                    console.log(err);
                });
        }

        getPendingApplications();
    });
