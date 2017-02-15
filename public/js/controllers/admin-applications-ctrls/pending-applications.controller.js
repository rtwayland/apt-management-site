angular.module('app')
    .controller('PendingApplications', function($scope, ApplicationService, EmailService) {
        function getPendingApplications() {
            ApplicationService.getPendingApplications()
                .then(function(res) {
                    $scope.pendingApplications = res;
                }, function(err) {
                    console.log(err);
                });
        }

        $scope.approveApplication = function(application) {
            // Add approved status to database
            ApplicationService.updateStatus(application._id, 'approved')
                .then(function(res) {
                    // Remove from pending section
                    removeById(application._id);

                    // Send out the approval email
                    EmailService.sendApprovedEmail(application.user.email)
                        .then(function(res) {
                            console.log(res);
                        }, function(err) {
                            console.log(err);
                        });

                }, function(err) {
                    console.log(err);
                });
        };

        $scope.declineApplication = function(application) {
            ApplicationService.updateStatus(application._id, 'declined')
                .then(function(res) {
                    removeById(application._id);

                    // Send out the denial email
                    EmailService.sendDeclinedEmail(application.user.email)
                        .then(function(res) {
                            console.log(res);
                        }, function(err) {
                            console.log(err);
                        });

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
