angular.module('app')
    .controller('NavCtrl', function($scope, $rootScope) {
        var publicNavLinks = [{
                link: 'home',
                name: 'Home'
            },
            {
                link: 'properties',
                name: 'Properties'
            },
            {
                link: 'apply',
                name: 'Apply'
            },
            {
                link: 'contact',
                name: 'Contact'
            },
            {
                link: 'loginSignup',
                name: 'Resident Login / Signup'
            }
        ];
        var residentNavLinks = [{
                link: 'home',
                name: 'Home'
            },
            {
                link: 'maintenance',
                name: 'Maintenance Request'
            },
            {
                link: 'rentPay',
                name: 'Pay Rent'
            }
        ];
        var adminNavLinks = [{
                link: 'home',
                name: 'Home'
            },
            {
                link: 'maintenanceRequests',
                name: 'Maintenance Requests'
            },
            {
                link: 'tenents',
                name: 'Tenent Info'
            },
            {
                link: 'propertyInfo',
                name: 'Property Info'
            }
        ];

        function updateNav() {
            switch ($rootScope.state) {
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

        $rootScope.$watch('state', (newVal, oldVal) => {
            if (newVal != oldVal) {
                updateNav();
            }
        });

        updateNav();
    });
