angular.module('app')
    .service('MaintenanceRequestService', function($http) {
        this.createRequest = function(request) {
            return $http.post('/api/maintenance', request);
        }
    });
