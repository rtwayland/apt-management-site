angular.module('app')
    .controller('DeclinedApplications', function($scope, ApplicationService, EmailService) {
        function getDeclinedApplications() {
            ApplicationService.getDeclinedApplications()
                .then(function(res) {
                    $scope.declinedApplications = res;
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

                    // Create the user
                    UserService.createUser(application)
                        .then(function(res) {
                            console.log('User from Ctrl', res);
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

                }, function(err) {
                    console.log(err);
                });
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
