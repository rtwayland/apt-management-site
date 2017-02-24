angular.module('app')
    .controller('AdminUsers', function($scope, UserService) {
        function init() {
            UserService.getUsers()
                .then(function(res) {
                    console.log(res);
                    $scope.tenants = res;
                }, function(err) {
                    console.log(err);
                })
        }

        init();
    });
