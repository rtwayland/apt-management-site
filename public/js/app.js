angular.module('app', ['ngSanitize', 'ngMessages', 'ui.router'])
.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: './views/home.html'
            // controller: ''
        })
        .state('properties', {
            url: '/properties',
            templateUrl: './views/properties.html'
            // controller: ''
        })
        .state('apply', {
            url: '/apply',
            templateUrl: './views/apply.html'
            // controller: ''
        })
        .state('loginSignup', {
            url: '/login-signup',
            templateUrl: './views/login-signup.html'
            // controller: ''
        })
});
