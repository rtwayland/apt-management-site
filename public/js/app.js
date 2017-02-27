angular.module('app', ['ngSanitize', 'ngMessages', 'ui.router', 'ngAnimate', 'ngTouch', 'ui.bootstrap'])
    .run(function($rootScope) {
        $rootScope.state = 1;
    })
    .config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $urlRouterProvider.when('/applications', '/applications/pending');
        $urlRouterProvider.when('/properties', '/properties/available');
        $urlRouterProvider.when('/admin-maintenance', '/admin-maintenance/pending');

        function resolveLogin(LoginService, $state) {
            return LoginService.getUser()
                .then(function(res) {
                    if (res.status === 200) {
                        return res.data;
                    } else {
                        $state.go('resident-login');
                    }
                }, function(err) {
                    console.log(err);
                    $state.go('resident-login');
                });
        }

        $stateProvider
            // PUBLIC PAGES
            .state('home', {
                url: '/',
                templateUrl: './views/public/home.html',
                controller: function($scope, $rootScope) {
                    sessionStorage.setItem("state", 1);
                    $rootScope.state = 1;
                }
            })
            .state('available-properties', {
                url: '/available-properties',
                templateUrl: './views/public/available-properties.html',
                controller: 'PropertyGallery'
            })
            .state('apply', {
                url: '/apply?propertyId',
                templateUrl: './views/public/apply.html',
                controller: 'ApplicationCtrl'
            })
            .state('resident-login', {
                url: '/resident-login',
                templateUrl: './views/public/resident-login.html',
                controller: function($scope, $rootScope) {
                    sessionStorage.setItem("state", 1);
                    $rootScope.state = 1;
                }
            })
            .state('contact', {
                url: '/contact',
                templateUrl: './views/public/contact.html'
                // controller: ''
            })
            .state('register-error', {
                url: '/register-error',
                templateUrl: './views/public/no-user.html'
                // controller: ''
            })
            // RESIDENT PAGES
            .state('resident', {
                url: '/resident',
                templateUrl: './views/resident/resident.html',
                controller: function($scope, $rootScope, user) {
                    sessionStorage.setItem("state", 2);
                    $rootScope.state = 2;
                    $scope.user = user;
                    $scope.username = user.firstName + ' ' + user.lastName;
                },
                resolve: {
                    user: resolveLogin
                }
            })
            .state('resident-maintenance', {
                url: '/resident-maintenance',
                templateUrl: './views/resident/maintenance-request.html',
                controller: 'MaintenanceRequest',
                resolve: {
                    user: resolveLogin
                }
            })
            .state('logout', {
                url: '/logout',
                template: '',
                controller: function($scope, $window) {
                    $window.location.href = '/auth/logout';
                }
            })
            // ADMIN PAGES
            .state('admin', {
                url: '/admin',
                template: '<h1>Admin Page</h1>',
                controller: function($scope, $rootScope) {
                    sessionStorage.setItem("state", 3);
                    $rootScope.state = 3;
                }
            })
            // Applications
            .state('applications', {
                url: '/applications',
                templateUrl: './views/admin/applications.html',
                controller: 'AdminApplications'
            })
            .state('applications.pending', {
                url: '/pending',
                templateUrl: './views/admin/applications/pending.html',
                controller: 'PendingApplications'
            })
            .state('applications.approved', {
                url: '/approved',
                templateUrl: './views/admin/applications/approved.html',
                controller: 'ApprovedApplications'
            })
            .state('applications.declined', {
                url: '/declined',
                templateUrl: './views/admin/applications/declined.html',
                controller: 'DeclinedApplications'
            })
            .state('application-details', {
                url: '/application-details/:id',
                templateUrl: './views/admin/application-details.html',
                controller: 'ApplicationDetails'
            })
            // Properties
            .state('properties', {
                url: '/properties',
                templateUrl: './views/admin/properties.html',
                controller: 'AdminProperties'
            })
            .state('properties.available', {
                url: '/available',
                templateUrl: './views/admin/properties/available.html',
                controller: 'AvailableProperties'
            })
            .state('properties.unavailable', {
                url: '/unavailable',
                templateUrl: './views/admin/properties/unavailable.html',
                controller: 'UnavailableProperties'
            })
            .state('properties.create', {
                url: '/create',
                templateUrl: './views/admin/properties/create.html',
                controller: 'CreateProperty'
            })
            .state('property-details', {
                url: '/property-details/:id',
                templateUrl: './views/admin/property-details.html',
                controller: 'PropertyDetails',
                resolve: {
                    property: function(PropertyService, $stateParams) {
                        return PropertyService.getPropertyById($stateParams.id)
                            .then(function(res) {
                                let tempProperty = res;
                                tempProperty.rent *= 1;
                                tempProperty.deposit *= 1;
                                tempProperty.beds *= 1;
                                tempProperty.baths *= 1;
                                if (res.year) tempProperty.year *= 1;
                                if (res.sqfeet) tempProperty.sqfeet *= 1;
                                if (res.acres) tempProperty.acres *= 1;
                                var property = tempProperty;
                                property.evenMoreAmenities = [];
                                return property
                            }, function(err) {
                                console.log(err);
                            });
                    }
                }
            })
            .state('tenants', {
                url: '/tenants',
                templateUrl: './views/admin/tenants.html',
                controller: 'AdminUsers'
            })
            .state('user-details', {
                url: '/user-details/:id',
                templateUrl: './views/admin/user-details.html',
                controller: 'UserDetails'
            })
            // Maintenance Requests
            .state('admin-maintenance', {
                url: '/admin-maintenance',
                templateUrl: './views/admin/admin-maintenance-requests.html',
                controller: 'AdminMaintenanceRequests'
            })
            .state('admin-maintenance.pending', {
                url: '/pending',
                templateUrl: './views/admin/maintenance-requests/pending.html',
                controller: 'PendingMaintenance'
            })
            .state('admin-maintenance.complete', {
                url: '/complete',
                templateUrl: './views/admin/maintenance-requests/complete.html',
                controller: 'CompleteMaintenance'
            })
            .state('request-details', {
                url: '/request-details/:id',
                templateUrl: './views/admin/maintenance-request-details.html',
                controller: 'MaintenanceDetails'
            })

    });
