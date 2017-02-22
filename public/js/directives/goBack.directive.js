angular.module('app')
    .directive('goBack', function($window) {
        return {
            restrict: 'A',
            link: function(scope, elem, attrs) {
                elem.on('click', function() {
                    $window.history.back();
                });
            }
        };
    });
