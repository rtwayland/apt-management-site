angular.module('app')
    .directive('semanticAccordion', function() {
        return {
            restrict: 'A',
            link: function(scope, elem, attrs) {
                $('.ui.accordion').accordion();
            }
        };
    });
