angular.module('app')
    .directive('slider', function() {
        return {
            restrict: 'E',
            templateUrl: './js/directives/slider/slider.html',
            scope: {
                slides: '='
            },
            link: function(scope, elem, attrs) {
                setTimeout(function() {
                    var rightArrow = $('<i class="angle right icon glyphicon glyphicon-chevron-right"></i>');
                    var leftArrow = $('<i class="angle left icon glyphicon glyphicon-chevron-left"></i>');
                    $('.glyphicon-chevron-right').replaceWith(rightArrow);
                    $('.glyphicon-chevron-left').replaceWith(leftArrow);
                }, 0);
            },
            controller: function($scope) {
                $scope.myInterval = 5000;
                $scope.noWrapSlides = false;
                $scope.active = 0;
                var currIndex = 0;
            }
        };
    });
