angular.module('app')
    .controller('ResidentInfoEdit', function($scope, user, UserService) {
        UserService.getUserById(user._id)
            .then(function(res) {
                $scope.user = res;
            }, function(err) {
                console.log(err);
            });
            
        $scope.editing = false;

        /**************** Edits for User Info ****************/
        $scope.edit = function() {
            $scope.editing = true;
            $scope.tempVars = {
                phone: $scope.user.phone,
                emergency: {
                    firstName: $scope.user.emergency.firstName,
                    lastName: $scope.user.emergency.lastName,
                    email: $scope.user.emergency.email,
                    phone: $scope.user.emergency.phone,
                }
            }
        }
        $scope.cancelEdit = function() {
            $scope.editing = false;
            $scope.user.phone = $scope.tempVars.phone;
            $scope.user.emergency = $scope.tempVars.emergency;
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
    });
