angular.module('app')
    .controller('ApprovedApplications', function($scope, ApplicationService) {
        function getApprovedApplications() {
            ApplicationService.getApprovedApplications()
                .then(function(res) {
                    $scope.approvedApplications = res;
                }, function(err) {
                    console.log(err);
                });
        }

        getApprovedApplications();
    });
