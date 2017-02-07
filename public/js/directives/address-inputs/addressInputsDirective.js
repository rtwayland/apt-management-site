angular.module('app')
    .directive('addressInputs', function() {
        return {
            restrict: 'E',
            templateUrl: './js/directives/address-inputs/address-inputs.html',
            scope: {
                modelKey: '@',
                model: '='
            },
            link: function(scope, elem, attrs) {}
        };
    });
