angular.module('app')
    .controller('UserDetails', function($scope, $state, UserService) {
        $scope.editing = false;

        function init() {
            UserService.getUserById($state.params.id)
                .then(function(res) {
                    console.log(res);
                    $scope.user = res;
                }, function(err) {
                    console.log(err);
                })
        }
        $scope.edit = function() {
            $scope.editing = true;
            $scope.tempVars = {
                email: $scope.user.email,
                phone: $scope.user.phone
            }
        }
        $scope.cancelEdit = function() {
            $scope.editing = false;
            $scope.user.email = $scope.tempVars.email;
            $scope.user.phone = $scope.tempVars.phone;
        }
        $scope.saveEdit = function() {
            $scope.editing = false;
            UserService.updateUser($scope.user._id, $scope.user)
                .then(function(res) {
                    console.log(res);
                }, function(err) {
                    console.log(err);
                })
        }
        init();
    });
