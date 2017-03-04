angular.module('app')
    .controller('RentPay', function($scope, user, moment, UserService, StripeService) {
        UserService.getUserById(user._id)
            .then(function(res) {
                $scope.user = res;

                if (!$scope.user.rentPaid && todayIsInTimeFrame($scope.user.rentDueDate)) {
                    $scope.needToPayRent = true;
                    $scope.lateFees = calculateFees($scope.user.rentDueDate);
                    $scope.totalRentAmount = $scope.user.rentAmount + $scope.lateFees;
                } else {
                    $scope.needToPayRent = false;
                }
            }, function(err) {
                console.log(err);
            })

        /*********************** PAY RENT ***********************/
        $scope.payRentBank = function() {
            Stripe.setPublishableKey('pk_test_GfjALqHyZhwYmd38SfJANoe4');
            Stripe.bankAccount.createToken({
                country: 'US',
                currency: 'USD',
                routing_number: $scope.accountInfo.routingNumber,
                account_number: $scope.accountInfo.accountNumber,
                account_holder_name: $scope.accountInfo.name,
                account_holder_type: 'individual'
            }, function(status, response) {
                if (response.error) {
                    console.log('ERROR', response.error);
                } else {
                    var token = response.id;
                    StripeService.chargeBank(token, $scope.totalRentAmount, $scope.user.email)
                        .then(function(res) {
                            console.log(res);
                            if (res.status === 200) {
                                // console.log('Bank Charge went through');
                                addPaymentToUser();
                            } else {
                                console.log('Payment did not go through');
                            }
                        }, function(err) {
                            console.log(err);
                        })
                }
            });
        };

        /*********************** PAY RENT ***********************/
        $scope.payRentCard = function() {
            let rentAmount = $scope.totalRentAmount + (($scope.totalRentAmount * 0.029) + 0.3);
            Stripe.setPublishableKey('pk_test_GfjALqHyZhwYmd38SfJANoe4');
            Stripe.source.create({
                type: 'card',
                card: {
                    number: $scope.cardInfo.number,
                    cvc: $scope.cardInfo.cvc,
                    exp_month: $scope.cardInfo.month,
                    exp_year: $scope.cardInfo.year,
                },
                owner: {
                    address: {
                        postal_code: $scope.cardInfo.zip
                    }
                }
            }, function(status, response) {
                if (response.error) {
                    console.log('ERROR', response.error);
                } else {
                    var source = response.id;
                    StripeService.chargeCard(source, rentAmount, $scope.user.email)
                        .then(function(res) {
                            console.log(res);
                            if (res.status === 200) {
                                // console.log('Card charge went through');
                                addPaymentToUser();
                            } else {
                                console.log('Payment did not go through');
                            }
                        }, function(err) {
                            console.log(err);
                        })
                }
            });
        };

        /*********************** ADD PAYMENT TO USER ***********************/
        function addPaymentToUser() {
            var payment = {
                amount: $scope.totalRentAmount,
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
                            $scope.user = res;
                            $scope.needToPayRent = false;
                            $state.go('payment-success');
                        }, function(err) {
                            console.log(err);
                        })
                }, function(err) {
                    console.log(err);
                })
        }

        /*********************** TODAY IS IN TIME FRAME ***********************/
        function todayIsInTimeFrame(date) {
            let dueDate = moment(date);
            // let dueDate = moment().add(7, 'days');
            let today = moment();
            let difference = today.diff(dueDate, 'days');

            if (difference > -7) {
                return true;
            } else {
                return false;
            }
        }
        /*********************** CALCULATE FEES ***********************/
        function calculateFees(date) {
            let dueDate = moment(date);
            // let dueDate = moment().subtract(5, 'days');
            let today = moment();
            let difference = today.diff(dueDate, 'days');

            if (difference > 0) {
                return 50 + ((difference - 1) * 10);
            } else {
                return 0;
            }
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
