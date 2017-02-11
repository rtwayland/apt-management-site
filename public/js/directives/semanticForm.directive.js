angular.module('app')
    .directive('semanticForm', function() {
        return {
            restrict: 'A',
            link: function(scope, elem, attrs) {
                $('.dropdown').dropdown();
            }
        };
    });
