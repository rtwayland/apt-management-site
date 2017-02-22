angular.module('app')
    .directive('imageSlider', function() {
        return {
            restrict: 'E',
            templateUrl: './js/directives/image-slider/image-slider.html',
            scope: {
                photos: '='
            },
            link: function(scope, elem, attrs) {
                $('.slider').glide({
                    autoplay: false,
                    arrowsWrapperClass: 'slider-arrows',
                    arrowRightText: '',
                    arrowLeftText: ''
                });
                console.log(scope.photos);
            }
        };
    });
