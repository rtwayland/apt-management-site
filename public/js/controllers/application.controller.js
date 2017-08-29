angular.module('app')
    .controller('ApplicationCtrl', function($scope, $sanitize, $state, $window, ApplicationService, StripeService, PropertyService) {
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
                                // console.log('Bank Charge went through');
                                submitApplication();
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
                                // console.log('Card charge went through');
                                submitApplication();
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
                propertyId: '58af206ae7037ba5cf54485b',
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
                        state: '',
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
                        state: '',
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

        $scope.submitApplication = () => {
            checkGeneralInfo();
            $scope.application = sanitizeData($scope.application);
            PropertyService.getPropertyById($scope.application.propertyId)
                .then(function(res) {
                    if (res.address.unit) {
                        $scope.application.propertyName = res.name + ' ' + res.address.unit;
                    } else {
                        $scope.application.propertyName = res.name;
                    }

                    ApplicationService.submitApplication($scope.application)
                        .then(function(res) {
                            $state.go('application-success');
                        })
                }, function(err) {
                    console.log(err);
                })
        }

        function checkGeneralInfo() {
            if ($scope.application.generalInfo.hasBeenLate == 'false') {
                $scope.application.generalInfo.lateExplaination = '';
            }
            if ($scope.application.generalInfo.hasHadLawsuit == 'false') {
                $scope.application.generalInfo.lawsuitExplaination = '';
            }
            if ($scope.application.generalInfo.hasNegativeCredit == 'false') {
                $scope.application.generalInfo.creditExplaination = '';
            }
        }

        function sanitizeData(original) {
            let sanitizedData = {
                propertyId: $sanitize(original.propertyId),
                user: {
                    firstName: $sanitize(original.user.firstName),
                    middleName: $sanitize(original.user.middleName),
                    lastName: $sanitize(original.user.lastName),
                    birthdate: $sanitize(original.user.birthdate),
                    email: $sanitize(original.user.email),
                    phone: $sanitize(original.user.phone),
                    ssn: $sanitize(original.user.ssn),
                    driversLicence: $sanitize(original.user.driversLicence),
                    relations: $sanitize(original.user.relations)
                },
                emergency: {
                    firstName: $sanitize(original.emergency.firstName),
                    lastName: $sanitize(original.emergency.lastName),
                    email: $sanitize(original.emergency.email),
                    phone: $sanitize(original.emergency.phone)
                },
                currentResidence: {
                    address: {
                        street: $sanitize(original.currentResidence.address.street),
                        city: $sanitize(original.currentResidence.address.city),
                        state: $sanitize(original.currentResidence.address.state),
                        zip: $sanitize(original.currentResidence.address.zip)
                    },
                    monthlyRent: $sanitize(original.currentResidence.monthlyRent),
                    beginningDate: $sanitize(original.currentResidence.beginningDate),
                    reasonForMoving: $sanitize(original.currentResidence.reasonForMoving),
                    managerName: $sanitize(original.currentResidence.managerName),
                    managerPhone: $sanitize(original.currentResidence.managerPhone)
                },
                currentEmployment: {
                    employer: $sanitize(original.currentEmployment.employer),
                    occupation: $sanitize(original.currentEmployment.occupation),
                    startDate: $sanitize(original.currentEmployment.startDate),
                    address: {
                        street: $sanitize(original.currentEmployment.address.street),
                        city: $sanitize(original.currentEmployment.address.city),
                        state: $sanitize(original.currentEmployment.address.state),
                        zip: $sanitize(original.currentEmployment.address.zip)
                    },
                    supervisorName: $sanitize(original.currentEmployment.supervisorName),
                    supervisorPhone: $sanitize(original.currentEmployment.supervisorPhone),
                    monthlyPay: $sanitize(original.currentEmployment.monthlyPay)
                },
                bankInfo: {
                    checking: {
                        name: $sanitize(original.bankInfo.checking.name),
                        balance: $sanitize(original.bankInfo.checking.balance)
                    },
                    savings: {
                        name: $sanitize(original.bankInfo.savings.name),
                        balance: $sanitize(original.bankInfo.savings.balance)
                    }
                },
                references: [{
                        name: $sanitize(original.references[0].name),
                        phone: $sanitize(original.references[0].phone),
                        relationship: $sanitize(original.references[0].relationship)
                    },
                    {
                        name: $sanitize(original.references[1].name),
                        phone: $sanitize(original.references[1].phone),
                        relationship: $sanitize(original.references[1].relationship)
                    }
                ],
                generalInfo: {
                    hasBeenLate: $sanitize(original.generalInfo.hasBeenLate),
                    lateExplaination: $sanitize(original.generalInfo.lateExplaination),
                    hasHadLawsuit: $sanitize(original.generalInfo.hasHadLawsuit),
                    lawsuitExplaination: $sanitize(original.generalInfo.lawsuitExplaination),
                    hasNegativeCredit: $sanitize(original.generalInfo.hasNegativeCredit),
                    creditExplaination: $sanitize(original.generalInfo.creditExplaination)
                },
                additionalQuestions: $sanitize(original.additionalQuestions),
                signature: $sanitize(original.signature),
                signDate: $sanitize(original.signDate),
                applicationStatus: 'pending'
            }

            return sanitizedData;
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
                        $scope.application.propertyId = $state.params.propertyId;
                        $scope.propertyRequired = false;
                    } else {
                        $scope.propertyRequired = true;
                    }
                }, function(err) {
                    console.log(err);
                });
        }

        init();
    });
