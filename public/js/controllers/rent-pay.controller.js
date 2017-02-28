angular.module('app')
    .controller('RentPay', function($scope, user, UserService, PaymentService) {
        $scope.user = user;
        console.log('User in rent', user);
        if (!$scope.user.rentPaid) {
            $scope.needToPayRent = true;
        } else {
            $scope.needToPayRent = false;
        }

        $scope.payRent = function() {
            var payment = {
                amount: '1100',
                date: new Date(),
                email: $scope.user.email,
                userid: $scope.user._id
            }
            // PaymentService.addPayment(payment)
            //     .then(function(res) {
                    UserService.payRent($scope.user._id, payment)
                        .then(function(res) {
                            console.log(res);
                        }, function(err) {
                            console.log(err);
                        })
                // }, function(err) {
                //     console.log(err);
                // })

        }
    });
