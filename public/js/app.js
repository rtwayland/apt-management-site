angular.module('app', ['ngSanitize', 'ngMessages', 'ui.router'])
    .run(function($rootScope) {
        $rootScope.state = 1;
    })
    .config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $urlRouterProvider.when('/applications', '/applications/pending');

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
                templateUrl: './views/public/available-properties.html'
                // controller: ''
            })
            .state('apply', {
                url: '/apply',
                templateUrl: './views/public/apply.html',
                controller: 'ApplicationCtrl'
            })
            .state('resident-login', {
                url: '/resident-login',
                templateUrl: './views/public/resident-login.html'
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
                template: '<h1>Welcome {{ username }}</h1>',
                controller: function($scope, $rootScope, LoginService) {
                    sessionStorage.setItem("state", 2);
                    $rootScope.state = 2;

                    function getUser() {
                        LoginService.getUser()
                            .then(function(res) {
                                $scope.username = res.firstName + ' ' + res.lastName;
                            }, function(err) {
                                console.log(err);
                            });
                    }
                    getUser();
                }
            })
            .state('logout', {
                url: '/logout',
                template: '',
                controller: function ($scope, $window) {
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
    });
