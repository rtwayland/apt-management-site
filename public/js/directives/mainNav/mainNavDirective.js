angular.module('app')
    .directive('mainNav', function() {
      return {
          restrict: 'E',
          templateUrl: './js/directives/mainNav/main-nav.html',
          scope: {
            links: '='
          },
          link: function(scope, elem, attrs) {

          }
      };
    });
