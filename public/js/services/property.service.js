angular.module('app')
    .service('PropertyService', function($http) {
        this.createProperty = function(property) {
            // property = angular.toJson(property);
            console.log(property);
        }
    });
