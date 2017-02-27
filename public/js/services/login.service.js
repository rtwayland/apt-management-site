angular.module('app')
    .service('LoginService', function($http) {
        this.getUser = function() {
            return $http.get('/auth/user');
        }
    });
