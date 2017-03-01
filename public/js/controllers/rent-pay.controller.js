angular.module('app')
    .controller('RentPay', function($scope, user, UserService) {
        UserService.getUserById(user._id)
            .then(function(res) {
                console.log(res);
                $scope.user = res;
                if (!$scope.user.rentPaid) {
                    $scope.needToPayRent = true;
                } else {
                    $scope.needToPayRent = false;
                }
            }, function(err) {
                console.log(err);
            })
        /*********************** PAY RENT ***********************/
        $scope.payRent = function() {
            var payment = {
                amount: $scope.user.rentAmount,
                date: new Date(),
                email: $scope.user.email,
                userid: $scope.user._id
            }

            $scope.user.rentDueDate = incrementDueDate($scope.user.rentDueDate);
            $scope.user.rentPaid = true;

            UserService.updateUser($scope.user._id, $scope.user)
                .then(function(res) {
                    UserService.payRent($scope.user._id, payment)
                        .then(function(res) {
                            console.log(res);
                            $scope.user = res;
                            $scope.needToPayRent = false;
                        }, function(err) {
                            console.log(err);
                        })
                }, function(err) {
                    console.log(err);
                })


        }

        /*********************** INCREMENT DUE DATE ***********************/
        function incrementDueDate(date) {
            let now = new Date(date);
            if (now.getMonth() == 11) {
                return new Date(now.getFullYear() + 1, 0, 1);
            } else {
                return new Date(now.getFullYear(), now.getMonth() + 1, 1);
            }
        }
    });
