angular.module('app')
    .service('PropertyService', function($http) {
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
        }
    });
