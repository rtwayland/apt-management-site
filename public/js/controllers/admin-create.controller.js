angular.module('app')
    .controller('AdminCreate', function($scope, UserService) {
        $scope.createAdmin = function() {
            $scope.newAdmin.isAdmin = true;
            UserService.createAdmin($scope.newAdmin)
                .then(function(res) {
                    $scope.newAdmin = {};
                    $scope.adminCreationForm.$setPristine();
                }, function(err) {
                    console.log(err);
                });
        }
    });
