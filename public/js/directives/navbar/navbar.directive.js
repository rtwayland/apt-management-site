angular.module('app')
    .directive('navbar', function($window) {
        return {
            restrict: 'E',
            templateUrl: './js/directives/navbar/navbar.html',
            scope: {
                state: '='
            },
            link: function(scope, elem, attrs) {
                let width = $window.innerWidth;
                if (width <= 750) {
                    scope.isMobile = true;
                } else {
                    scope.isMobile = false;
                    scope.isToggled = false;
                }
                angular.element($window).bind('resize', function() {

                    let width = $window.innerWidth;
                    if (width <= 750) {
                        scope.isMobile = true;
                    } else {
                        scope.isMobile = false;
                        scope.isToggled = false;
                    }

                    // $digest required as resize event
                    // is outside of angular
                    scope.$digest();
                });

            },
            controller: function($scope) {
                var publicNavLinks = [{
                        link: 'home',
                        name: 'Home'
                    },
                    {
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
                        link: 'all-properties-map',
                        name: 'Map'
                    },
                    {
                        link: 'resident-login',
                        name: 'Resident Login'
                    }
                ];
                var residentNavLinks = [{
                        link: 'home',
                        name: 'Home'
                    },
                    {
                        link: 'resident-info',
                        name: 'My Info'
                    },
                    {
                        link: 'resident-rent',
                        name: 'Pay Rent'
                    },
                    {
                        link: 'resident-maintenance',
                        name: 'Maintenance'
                    },
                    {
                        link: 'logout',
                        name: 'Log Out'
                    }
                ];

                var adminNavLinks = [{
                        link: 'admin',
                        name: 'Admin Home'
                    },
                    {
                        link: 'applications',
                        name: 'Applications'
                    },
                    {
                        link: 'tenants',
                        name: 'Tenants'
                    },
                    {
                        link: 'admin-maintenance',
                        name: 'Maintenance'
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

                    let length = $scope.links.length;
                    let mid = Math.ceil(length / 2);

                    $scope.left = $scope.links.slice(0, mid);
                    $scope.right = $scope.links.slice(mid, length);
                }

                $scope.$watch('state', () => {
                    updateNav();
                });

                updateNav();
            }
        };
    });
