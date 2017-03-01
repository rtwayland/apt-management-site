angular.module('app')
    .directive('sticky', function() {
        return {
            restrict: 'A',
            link: function(scope, elem, attrs) {
                $('.ui.sticky').sticky();
            }
        };
    });
