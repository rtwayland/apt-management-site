angular.module('app')
    .directive('imageSlider', function() {
        return {
            restrict: 'E',
            templateUrl: './js/directives/image-slider/image-slider.html',
            scope: {
                photos: '='
                // htmlID: '@'
            },
            link: function(scope, elem, attrs) {
                // let id = '#' + scope.htmlID;
                console.log(scope.photos);

            },
            controller: function($scope) {
                $scope.direction = 'left';
                $scope.currentIndex = 0;

                $scope.setCurrentSlideIndex = function(index) {
                    $scope.direction = (index > $scope.currentIndex) ? 'left' : 'right';
                    $scope.currentIndex = index;
                };

                $scope.isCurrentSlideIndex = function(index) {
                    return $scope.currentIndex === index;
                };

                $scope.prevSlide = function() {
                    $scope.direction = 'left';
                    $scope.currentIndex = ($scope.currentIndex < $scope.photos.length - 1) ? ++$scope.currentIndex : 0;
                };

                $scope.nextSlide = function() {
                    $scope.direction = 'right';
                    $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.photos.length - 1;
                };
            }
        };
    });
