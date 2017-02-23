angular.module('app')
    .directive('imageSlider', function($window) {
        return {
            restrict: 'E',
            templateUrl: './js/directives/image-slider/image-slider.html',
            scope: {
                photos: '=',
                size: '='
            },
            link: function(scope, elem, attrs) {
                scope.changeWidthHeight = function() {
                    // console.log('Changing width');
                    var parentWidth = elem.parent('.slider-container').width();
                    // var img = $('.slide');
                    // var currentImge = $(img[scope.currentIndex]);
                    // console.log('THe el', currentImge);
                    // console.log("Image", img[scope.currentIndex]);
                    // var imageHeight = currentImge[0].height;
                    // console.log("Image height", imageHeight);
                    elem.children('.slider').width(parentWidth);
                    elem.children('.slider').height(parentWidth / 2);
                    // elem.children('.slider').height(imageHeight / 2);
                }

                scope.changeWidthHeight();

                // $('.view-trigger').on('click', function(event) {
                //     setTimeout(function() {
                //         scope.changeWidthHeight();
                //
                //     }, 1000);
                // });
                angular.element($window).bind('resize', function() {
                    scope.changeWidthHeight()
                    // manuall $digest required as resize event
                    // is outside of angular
                    scope.$digest();
                });


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
