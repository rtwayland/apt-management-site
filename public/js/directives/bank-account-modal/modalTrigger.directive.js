angular.module('app')
    .directive('bankModalTrigger', function() {
        return {
            restrict: 'A',
            scope: {
                htmlID: '@bankModalTrigger'
            },
            link: function(scope, elem, attrs) {
                elem.on('click', function(event) {
                    event.preventDefault();
                    let id = '#' + scope.htmlID;
                    $(id).modal('show');
                });
            }
        };
    });
