angular.module('app')
    .directive('additionalAmenityFields', function() {
        return {
            restrict: 'E',
            templateUrl: './js/directives/additional-amenities/additional-amenity-fields.html',
            scope: {
                num: '=',
                model: '=',
                deleteItem: '&'
            },
            link: function(scope, elem, attrs) {
                scope.getNumOccupants = function() {
                    return new Array(scope.num);
                }
            }
        };
    });
