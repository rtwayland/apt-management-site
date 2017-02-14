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
        $scope.approveApplication = function(id) {
            ApplicationService.updateStatus(id, 'approved')
                .then(function(res) {
                    removeById(id);
                }, function(err) {
                    console.log(err);
                })
        };

        $scope.deleteApplication = function(id) {
            ApplicationService.deleteApplication(id)
                .then(function(res) {
                    removeById(id);
                }, function(err) {
                    console.log(err);
                })
        };

        function removeById(id) {
            for (var i = 0; i < $scope.declinedApplications.length; i++) {
                if ($scope.declinedApplications[i]._id === id) {
                    $scope.declinedApplications.splice(i, 1);
                    break;
                }
            }
        }
        getDeclinedApplications();
    });
