angular.module('app')
    .directive('mainNav', function() {
        return {
            restrict: 'E',
            templateUrl: './js/directives/mainNav/main-nav.html',
            scope: {
                links: '='
            },
            link: function(scope, elem, attrs) {
                $('.right.menu.open').on('click', function(event) {
                    event.preventDefault();
                    $('.ui.vertical.menu').slideToggle();
                });
                $('.ui.dropdown').dropdown();
            },
            controller: function($scope) {
                function getListItemWidth() {
                    var numLinks = $scope.links.length;
                    var width = 100 / numLinks;
                    $scope.listItemWidth = `${width}%`;
                }

                $scope.$watch('links', (newVal, oldVal) => {
                    if (newVal != oldVal) {
                        getListItemWidth();
                    }
                })

                getListItemWidth();
            }
        };
    });
