angular.module('app')
    .controller('CreateProperty', function($scope) {
        $scope.submitProperty = function() {
            console.log('Property', $scope.property);
        }
    });
