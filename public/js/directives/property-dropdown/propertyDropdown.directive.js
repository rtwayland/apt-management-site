angular.module('app')
    .directive('propertyDropdown', function() {
        return {
            restrict: 'E',
            templateUrl: './js/directives/property-dropdown/property-dropdown.html',
            scope: {
                model: '=',
                options: '='
            },
            link: function(scope, elem, attrs) {

            }
        };
    });
