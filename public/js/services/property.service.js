angular.module('app')
    .service('PropertyService', function($http) {
        this.getPropertyById = function(id) {
                return $http.get('/api/property?id=' + id)
                    .then(function(res) {
                        return res.data;
                    });
            },
            this.createProperty = function(property) {
                property = angular.toJson(property);
                return $http.post('/api/property', property);
            },
            this.getAvailableProperties = function() {
                return $http.get('/api/property?status=available')
                    .then(function(res) {
                        return res.data;
                    });
            },
            this.getUnavailableProperties = function() {
                return $http.get('/api/property?status=unavailable')
                    .then(function(res) {
                        return res.data;
                    });
            },
            this.updateStatus = function(id, status) {
                let statusObj = angular.toJson({
                    status: status
                });
                return $http.put('/api/property/' + id, statusObj);
            },
            this.updateProperty = function(id, property) {
                property = angular.toJson(property);
                return $http.put('/api/property/' + id, property);
            },
            this.deleteProperty = function(id) {
                return $http.delete('/api/property/' + id);
            }
    });
