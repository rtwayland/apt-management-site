angular.module('app')
    .directive('slider', function() {
        return {
            restrict: 'E',
            templateUrl: './js/directives/slider/slider.html',
            scope: {
                slides: '='
            },
            link: function(scope, elem, attrs) {

            },
            controller: function($scope) {
                $scope.myInterval = 5000;
                $scope.noWrapSlides = false;
                $scope.active = 0;
                var currIndex = 0;
            }
        };
    });
