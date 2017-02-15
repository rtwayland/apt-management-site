angular.module('app')
    .service('EmailService', function($http) {
        this.sendApprovedEmail = function(email) {
                let emailObj = angular.toJson({
                    emailTo: email
                });

                return $http.post('/api/email-approval', emailObj);
            },
            this.sendDeclinedEmail = function(email) {
                let emailObj = angular.toJson({
                    emailTo: email
                });

                return $http.post('/api/email-denial', emailObj);
            }
    });
