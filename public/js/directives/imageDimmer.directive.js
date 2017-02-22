angular.module('app')
    .directive('imageDimmer', function() {
        return {
            restrict: 'A',
            link: function(scope, elem, attrs) {
                $('.special.cards .image').dimmer({
                    on: 'hover'
                });
            }
        };
    });
