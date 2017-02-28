angular.module('app')
    .directive('mainNav', function() {
        return {
            restrict: 'E',
            templateUrl: './js/directives/mainNav/main-nav.html',
            scope: {
                state: '='
            },
            link: function(scope, elem, attrs) {
                scope.toggleMenu = function() {
                    $('#nav-collapse').sidebar('toggle');
                }
            },
            controller: function($scope) {
              var publicNavLinks = [{
                      link: 'available-properties',
                      name: 'Availabilities'
                  },
                  {
                      link: 'apply',
                      name: 'Apply Now'
                  },
                  {
                      link: 'contact',
                      name: 'Contact Us'
                  },
                  {
                      link: 'resident-login',
                      name: 'Resident Login'
                  }
              ];
              var residentNavLinks = [{
                      link: 'resident-maintenance',
                      name: 'Maintenance Request'
                  },
                  {
                      link: 'rentPay',
                      name: 'Pay Rent'
                  },
                  {
                      link: 'logout',
                      name: 'Log Out'
                  }
              ];
              var adminNavLinks = [{
                      link: 'applications',
                      name: 'Applications'
                  },
                  {
                      link: 'admin-maintenance',
                      name: 'Maintenance Requests'
                  },
                  {
                      link: 'tenants',
                      name: 'Tenants'
                  },
                  {
                      link: 'properties',
                      name: 'Properties'
                  },
                  {
                      link: 'logout',
                      name: 'Log Out'
                  }
              ];

              function updateNav() {
                  switch ($scope.state) {
                      case 1:
                          $scope.links = publicNavLinks;
                          break;
                      case 2:
                          $scope.links = residentNavLinks;
                          break;
                      case 3:
                          $scope.links = adminNavLinks;
                          break;
                      default:
                          $scope.links = publicNavLinks;
                          break;
                  }
              }

              $scope.$watch('state', () => {
                  updateNav();
              });

              updateNav();
            }
        };
    });
