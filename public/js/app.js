angular.module('app', ['ngSanitize', 'ngMessages', 'ui.router'])
    .run(function($rootScope) {
        $rootScope.state = 1;
    })
    .config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: './views/public/home.html',
                controller: function($scope, $rootScope) {
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
                    $rootScope.state = 2;
                }
            })
            .state('admin', {
                url: '/admin',
                template: '<h1>Admin Page</h1>',
                controller: function($scope, $rootScope) {
                    $rootScope.state = 3;
                }
            })
    });
