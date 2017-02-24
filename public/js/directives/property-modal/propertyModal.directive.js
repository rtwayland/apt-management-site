angular.module('app')
    .directive('propertyModal', function() {
        return {
            restrict: 'E',
            templateUrl: './js/directives/property-modal/property-modal.html',
            scope: {
                property: '='
            },
            link: function(scope, elem, attrs) {

            },
            controller: function($scope, $state) {
                $scope.goToApplication = function(name, unit) {
                    if (unit) {
                        let propertyName = name + ' ' + unit;
                        $state.go('apply', {propertyName: propertyName});
                    } else {
                        $state.go('apply', {propertyName: name});
                    }
                }
            }
        };
    });
