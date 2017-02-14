angular.module('app')
    .directive('navToggle', function() {
        return {
            restrict: 'A',
            scope: {

            },
            link: function(scope, elem, attrs) {
                $('.item').on('click', function(event) {
                    // event.preventDefault();
                    $(this).addClass('active');
                    $(this).siblings('.item').removeClass('active');
                });
            }
        };
    });
