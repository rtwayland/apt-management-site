angular.module('app')
    .controller('UserDetails', function($scope, $state, UserService) {
        $scope.editing = false;
        $scope.rentEdit = false;

        function init() {
            UserService.getUserById($state.params.id)
                .then(function(res) {
                    console.log(res);
                    $scope.user = res;
                    $scope.user.rentDueDate = new Date($scope.user.rentDueDate);
                }, function(err) {
                    console.log(err);
                })
        }
        /**************** Edits for User Info ****************/
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

        /**************** Edits for Rent Info ****************/
        $scope.editRent = function() {
            $scope.rentEdit = true;
            $scope.rentTempVars = {
                due: $scope.user.rentDueDate,
                amount: $scope.user.rentAmount
            }
        }
        $scope.cancelEditRent = function() {
            $scope.rentEdit = false;
            $scope.user.rentDueDate = $scope.rentTempVars.due;
            $scope.user.rentAmount = $scope.rentTempVars.amount;
        }
        $scope.saveEditRent = function() {
            $scope.rentEdit = false;
            UserService.updateUser($scope.user._id, $scope.user)
                .then(function(res) {
                    console.log(res);
                }, function(err) {
                    console.log(err);
                })
        }

        init();
    });
