angular.module('app', ['ngSanitize', 'ngMessages', 'ui.router'])
    .run(function($rootScope) {
        $rootScope.state = 1;
    })
    .config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $urlRouterProvider.when('/applications', '/applications/pending');

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: './views/public/home.html',
                controller: function($scope, $rootScope) {
                    sessionStorage.setItem("state", 1);
                    $rootScope.state = 1;
                }
            })
            .state('properties', {
                url: '/properties',
                templateUrl: './views/public/properties.html'
                // controller: ''
            })
            .state('apply', {
                url: '/apply',
                templateUrl: './views/public/apply.html',
                controller: 'ApplicationCtrl'
            })
            .state('loginSignup', {
                url: '/login-signup',
                templateUrl: './views/public/login-signup.html'
                // controller: ''
            })
            .state('contact', {
                url: '/contact',
                templateUrl: './views/public/contact.html'
                // controller: ''
            })
            .state('resident', {
                url: '/resident',
                template: '<h1>Resident Page</h1>',
                controller: function($scope, $rootScope) {
                    sessionStorage.setItem("state", 2);
                    $rootScope.state = 2;
                }
            })
            .state('admin', {
                url: '/admin',
                template: '<h1>Admin Page</h1>',
                controller: function($scope, $rootScope) {
                    sessionStorage.setItem("state", 3);
                    $rootScope.state = 3;
                }
            })
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
                templateUrl: './views/admin/applications/approved.html'
                // controller: 'PendingApplications'
            })
            .state('applications.declined', {
                url: '/declined',
                templateUrl: './views/admin/applications/declined.html'
                // controller: 'PendingApplications'
            })
            .state('application-details', {
                url: '/application-details/:id',
                templateUrl: './views/admin/application-details.html',
                controller: 'ApplicationDetails'
            })
    });
