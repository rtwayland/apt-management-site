angular.module('app')
    .controller('NavCtrl', function($scope, $rootScope) {
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
                link: 'maintenance',
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
                link: 'maintenanceRequests',
                name: 'Maintenance Requests'
            },
            {
                link: 'tenents',
                name: 'Tenents'
            },
            {
                link: 'properties',
                name: 'Properties'
            }
        ];

        function updateNav() {
            switch (sessionStorage.state) {
                case '1':
                    $scope.links = publicNavLinks;
                    break;
                case '2':
                    $scope.links = residentNavLinks;
                    break;
                case '3':
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
