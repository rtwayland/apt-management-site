angular.module('app')
    .service('ApplicationService', function($http) {
        this.submitApplication = function(application) {
            return $http.post('/api/application', application)
                .then(function(res) {
                    console.log(res);
                    return res.data;
                });
        }
    });
