angular.module('app')
    .controller('ApplicationCtrl', function($scope) {
      $scope.application = {

      }
      var user = {
        firstName: '',
        middleName: '',
        lastName: '',
        birthdate: '',
        email: '',
        phone: '',
        ssn: '',
        driversLicence: ''
      }
      var currentResidence = {
        street: '',
        city: '',
        state: '',
        zip: ''
      }
    });
