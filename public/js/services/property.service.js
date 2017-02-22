angular.module('app')
    .service('PropertyService', function($http) {
        this.getPropertyById = function(id) {
                return $http.get('/api/apartment?id=' + id)
                    .then(function(res) {
                        return res.data;
                    });
            },
            this.createProperty = function(property) {
                property = angular.toJson(property);
                console.log(property);
                return $http.post('/api/apartment', property);
            },
            this.getAvailableProperties = function() {
                return $http.get('/api/apartment?status=available')
                    .then(function(res) {
                        return res.data;
                    });
            },
            this.getUnavailableProperties = function() {
                return $http.get('/api/apartment?status=unavailable')
                    .then(function(res) {
                        return res.data;
                    });
            },
            this.updateStatus = function(id, status) {
                let statusObj = angular.toJson({
                    status: status
                });
                return $http.put('/api/apartment/' + id, statusObj);
            },
            this.updateProperty = function(id, property) {
                property = angular.toJson(property);
                return $http.put('/api/apartment/' + id, property);
            },
            this.deleteProperty = function(id) {
                return $http.delete('/api/apartment/' + id);
            }
    });
