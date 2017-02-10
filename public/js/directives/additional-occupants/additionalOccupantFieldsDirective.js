angular.module('app')
    .directive('additionalOccupantFields', function() {
        return {
            restrict: 'E',
            templateUrl: './js/directives/additional-occupants/additional-occupant-fields.html',
            scope: {
                num: '=',
                model: '='
            },
            link: function(scope, elem, attrs) {
                scope.getNumOccupants = function() {
                    return new Array(scope.num);
                }
            }
        };
    });
