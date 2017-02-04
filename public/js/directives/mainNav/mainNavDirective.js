angular.module('app')
    .directive('mainNav', function() {
        return {
            restrict: 'E',
            templateUrl: './js/directives/mainNav/main-nav.html',
            scope: {
                links: '='
            },
            link: function(scope, elem, attrs) {

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
