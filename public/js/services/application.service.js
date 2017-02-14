angular.module('app')
    .service('ApplicationService', function($http) {
        this.submitApplication = function(application) {
                return $http.post('/api/application', application)
                    .then(function(res) {
                        return res.data;
                    });
            },
            this.getPendingApplications = function() {
                return $http.get('/api/application?applicationStatus=pending')
                    .then(function(res) {
                        return res.data;
                    });
            },
            this.getApprovedApplications = function() {
                return $http.get('/api/application?applicationStatus=approved')
                    .then(function(res) {
                        return res.data;
                    });
            },
            this.getDeclinedApplications = function() {
                return $http.get('/api/application?applicationStatus=declined')
                    .then(function(res) {
                        return res.data;
                    });
            },
            this.getApplicationById = function(id) {
                console.log(id);
                return $http.get('/api/application?id=' + id)
                    .then(function(res) {
                        console.log('Single Application from Service\n', res);
                        return res.data;
                    });
            },
            this.updateStatus = function(id, status) {
                let statusObj = angular.toJson({
                    applicationStatus: status
                });
                return $http.put('/api/application/' + id, statusObj);
            },
            this.deleteApplication = function(id) {
                return $http.delete('/api/application/' + id);
            }
    });
