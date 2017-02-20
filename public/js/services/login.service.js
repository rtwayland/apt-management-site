angular.module('app')
    .service('LoginService', function($http, $q) {
        this.getUser = function() {
            var defer = $q.defer();
            $http.get('/auth/user')
                .then(function(res) {
                    defer.resolve(res.data);
                })
            return defer.promise;
        }
    });
