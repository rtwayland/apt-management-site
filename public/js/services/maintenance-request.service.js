angular.module('app')
    .service('MaintenanceRequestService', function($http) {
        this.createRequest = function(request) {
                return $http.post('/api/maintenance', request);
            },
            this.getRequestsByStatus = function(status) {
                return $http.get('/api/maintenance?status=' + status)
                    .then(function(res) {
                        return res.data;
                    }, function(err) {
                        console.log(err);
                    })
            },
            this.getRequestById = function(id) {
                return $http.get('/api/maintenance?id=' + id)
                    .then(function(res) {
                        return res.data;
                    });
            },
            this.completeRequest = function(id) {
                let statusObj = {
                    status: 'complete',
                    completionDate: new Date()
                };
                return $http.put('/api/maintenance/' + id, statusObj);
            },
            this.delete = function(id) {
                return $http.delete('/api/maintenance/' + id);
            }
    });
