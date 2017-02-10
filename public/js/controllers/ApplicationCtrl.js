angular.module('app')
    .controller('ApplicationCtrl', function($scope) {
        $scope.fillForm = function() {
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
                        state: 'SomeState',
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
                      state: 'SomeState',
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
                signDate: new Date()
            }

        }

        $scope.submitApplication = function(isValid) {
            console.log('Application Form\n', $scope.application);
            if (isValid) {}
        }
    });
