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

        $scope.approveApplication = function(id) {
            ApplicationService.updateStatus(id, 'approved')
                .then(function(res) {
                    removeById(id);
                }, function(err) {
                    console.log(err);
                })
        };

        $scope.declineApplication = function(id) {
            ApplicationService.updateStatus(id, 'declined')
                .then(function(res) {
                    removeById(id);
                }, function(err) {
                    console.log(err);
                })
        };

        function removeById(id) {
            for (var i = 0; i < $scope.pendingApplications.length; i++) {
                if ($scope.pendingApplications[i]._id === id) {
                    $scope.pendingApplications.splice(i, 1);
                    break;
                }
            }
        }

        getPendingApplications();
    });
