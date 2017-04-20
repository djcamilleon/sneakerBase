angular.module('sneakerBase', ['ui.router', 'ui.bootstrap', 'slickCarousel'])
    .config(function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/')

        $stateProvider

            .state('home', {
            url: '/',
            templateUrl: './views/home.html',
            controller: 'homeCtrl'
        })

        .state('login', {
            url: '/login',
            templateUrl: './views/login.html',
            controller: 'loginCtrl'
        })

        .state('userPage', {
            url: '/profile',
            templateUrl: '/views/userPage.html',
            controller: 'userPageCtrl'
        })

        .state('singleShoe', {
            url: '/singleShoe',
            templateUrl: '/views/singleShoeView.html',
            controller: 'singleShoeCtrl'
        })

        .state('newShoe', {
            url: '/newShoe',
            templateUrl: '/views/newShoe.html',
            controller: 'newShoeCtrl'
        })

        .state('about', {
            url: '/about',
            templateUrl: '/views/about.html'
        })

    })