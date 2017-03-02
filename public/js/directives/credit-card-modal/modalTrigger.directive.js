angular.module('app')
    .directive('cardModalTrigger', function() {
        return {
            restrict: 'A',
            scope: {
                htmlID: '@cardModalTrigger'
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
