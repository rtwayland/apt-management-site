angular.module('app')
    .controller('DeclinedApplications', function($scope, ApplicationService) {
        function getDeclinedApplications() {
            ApplicationService.getDeclinedApplications()
                .then(function(res) {
                    $scope.declinedApplications = res;
                }, function(err) {
                    console.log(err);
                });
        }

        getDeclinedApplications();
    });
