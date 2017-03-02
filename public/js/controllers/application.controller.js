angular.module('app')
    .controller('ApplicationCtrl', function($scope, $state, $window, ApplicationService, StripeService, PropertyService) {
        $scope.applicationFee = 20;
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
                    StripeService.chargeBank(token, $scope.applicationFee, $scope.application.user.email)
                        .then(function(res) {
                            console.log(res);
                            if (res.status === 200) {
                                console.log('Bank Charge went through');
                                // submitApplication();
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
            let feeAmount = $scope.applicationFee + (($scope.applicationFee * 0.029) + 0.3);
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
                    StripeService.chargeCard(source, feeAmount, $scope.application.user.email)
                        .then(function(res) {
                            console.log(res);
                            if (res.status === 200) {
                                console.log('Card charge went through');
                                // submitApplication();
                            } else {
                                console.log('Payment did not go through');
                            }
                        }, function(err) {
                            console.log(err);
                        })
                }
            });
        };

        $scope.fillForm = function() {
            $scope.numAddOccupants = 0;
            $scope.application = {
                propertyId: '58af6bbbd7f98eba360e310f',
                user: {
                    firstName: 'MyName',
                    middleName: '',
                    lastName: 'MyLastName',
                    birthdate: new Date(),
                    email: 'email@email.com',
                    phone: '1234567890',
                    ssn: '123456789',
                    driversLicence: '1234567890',
                    relations: []
                },
                emergency: {
                    firstName: 'John',
                    lastName: 'Doe',
                    email: 'myemail@email.com',
                    phone: '9384980912'
                },
                currentResidence: {
                    address: {
                        street: '123 N 123 E',
                        city: 'Somewhere',
                        state: 'ID',
                        zip: '12345'
                    },
                    monthlyRent: '1045',
                    beginningDate: new Date(),
                    reasonForMoving: 'Work relocation',
                    managerName: 'MyManager',
                    managerPhone: '1234567890'
                },
                currentEmployment: {
                    employer: 'TestEmployer',
                    occupation: 'Developer',
                    startDate: new Date(),
                    address: {
                        street: '123 N 123 E',
                        city: 'Somewhere',
                        state: 'ID',
                        zip: '12345'
                    },
                    supervisorName: 'Wes',
                    supervisorPhone: '1234567890',
                    monthlyPay: '3000'
                },
                bankInfo: {
                    checking: {
                        name: 'MyBank',
                        balance: '5000'
                    },
                    savings: {
                        name: 'MyBank',
                        balance: '12000'
                    }
                },
                references: [{
                        name: 'RelName',
                        phone: '1234567890',
                        relationship: 'Mother'
                    },
                    {
                        name: 'FriendName',
                        phone: '1234567890',
                        relationship: 'Friend'
                    }
                ],
                generalInfo: {
                    hasBeenLate: 'true',
                    lateExplaination: 'We forgot...We got it in the next week, though!',
                    hasHadLawsuit: 'false',
                    lawsuitExplaination: '',
                    hasNegativeCredit: 'false',
                    creditExplaination: ''
                },
                additionalQuestions: '',
                signature: 'My Sig',
                signDate: new Date(),
                applicationStatus: 'pending'
            }

        }

        function submitApplication() {
            if ($scope.application.propertyId !== '' &&
                $scope.application.currentResidence.address.state !== '' &&
                $scope.application.currentEmployment.address.state !== '') {
                PropertyService.getPropertyById($scope.application.propertyId)
                    .then(function(res) {
                        if (res.address.unit) {
                            $scope.application.propertyName = res.name + ' ' + res.address.unit;
                        } else {
                            $scope.application.propertyName = res.name;
                        }

                        // console.log($scope.application);
                        ApplicationService.submitApplication($scope.application)
                            .then(function(res) {
                                $state.go('home');
                            })
                    }, function(err) {
                        console.log(err);
                    })

            } else {
                // Trigger error message
                console.log('Please fill out all the fields.');
            }
        }

        function init() {
            $scope.application = {
                propertyId: '',
                user: {
                    firstName: '',
                    middleName: '',
                    lastName: '',
                    birthdate: '',
                    email: '',
                    phone: '',
                    ssn: '',
                    driversLicence: '',
                    relations: []
                },
                emergency: {
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: ''
                },
                currentResidence: {
                    address: {
                        street: '',
                        city: '',
                        state: '',
                        zip: ''
                    },
                    monthlyRent: '',
                    beginningDate: '',
                    reasonForMoving: '',
                    managerName: '',
                    managerPhone: ''
                },
                currentEmployment: {
                    employer: '',
                    occupation: '',
                    startDate: '',
                    address: {
                        street: '',
                        city: '',
                        state: '',
                        zip: ''
                    },
                    supervisorName: '',
                    supervisorPhone: '',
                    monthlyPay: ''
                },
                bankInfo: {
                    checking: {
                        name: '',
                        balance: ''
                    },
                    savings: {
                        name: '',
                        balance: ''
                    }
                },
                references: [{
                        name: '',
                        phone: '',
                        relationship: ''
                    },
                    {
                        name: '',
                        phone: '',
                        relationship: ''
                    }
                ],
                generalInfo: {
                    hasBeenLate: '',
                    lateExplaination: '',
                    hasHadLawsuit: '',
                    lawsuitExplaination: '',
                    hasNegativeCredit: '',
                    creditExplaination: ''
                },
                additionalQuestions: '',
                signature: '',
                signDate: new Date(),
                applicationStatus: 'pending'
            }

            PropertyService.getAvailableProperties()
                .then(function(res) {
                    var properies = res;
                    $scope.propertyOptions = [];
                    for (var i = 0; i < properies.length; i++) {
                        if (properies[i].address.unit) {
                            let name = properies[i].name + ' #' + properies[i].address.unit;
                            var option = {
                                value: properies[i]._id,
                                name: name
                            }
                        } else {
                            var option = {
                                value: properies[i]._id,
                                name: properies[i].name
                            }
                        }
                        $scope.propertyOptions.push(option);
                    }

                    if ($state.params.propertyId) {
                        // console.log($state.params);
                        $scope.application.propertyId = $state.params.propertyId;
                        $scope.propertySelected = true;
                    } else {
                        $scope.propertySelected = false;
                    }
                    // console.log($scope.propertySelected);
                }, function(err) {
                    console.log(err);
                });
        }

        init();
    });
