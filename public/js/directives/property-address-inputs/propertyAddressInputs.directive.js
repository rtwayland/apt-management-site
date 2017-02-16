angular.module('app')
    .directive('propertyAddressInputs', function() {
        return {
            restrict: 'E',
            templateUrl: './js/directives/property-address-inputs/property-address-inputs.html',
            scope: {
                modelKey: '@',
                model: '='
            },
            link: function(scope, elem, attrs) {}
        };
    });
