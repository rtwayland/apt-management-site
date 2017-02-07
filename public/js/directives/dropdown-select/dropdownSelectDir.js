angular.module('app')
    .directive('dropdownSelect', function() {
        return {
            restrict: 'E',
            templateUrl: './js/directives/dropdown-select/dropdown-select.html',
            scope: {

            },
            link: function(scope, elem, attrs) {
                $('.dropdown').dropdown();
            }
        };
    });
