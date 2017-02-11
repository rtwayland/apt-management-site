angular.module('app')
    .controller('ApplicationCtrl', function($scope, $state, ApplicationService) {

        $scope.fillForm = function() {
            $scope.numAddOccupants = 0;
            $scope.application = {
                user: {
                    firstName: 'MyName',
                    middleName: '',
                    lastName: 'MyLastName',
                    birthdate: new Date(),
                    email: 'email@email.com',
                    phone: '1234567890',
                    ssn: '1234567890',
                    driversLicence: '1234567890'
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

        $scope.submitApplication = function() {
            if ($scope.application.propertyName !== '' &&
                $scope.application.currentResidence.address.state !== '' &&
                $scope.application.currentEmployment.address.state !== '') {

                // console.log($scope.application);
                ApplicationService.submitApplication($scope.application)
                    .then(function(res) {
                        $state.go('home');
                    })
            } else {
                // Trigger error message
                console.log('Please fill out all the fields.');
            }
        }

        function init() {
            $scope.application = {
                propertyName: '',
                user: {
                    firstName: '',
                    middleName: '',
                    lastName: '',
                    birthdate: '',
                    email: '',
                    phone: '',
                    ssn: '',
                    driversLicence: ''
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
        }

        init();
    });
