'use strict';

const playerApp = angular.module('playerApp', ['ngResource','ngRoute'])
    .config(function($routeProvider,$locationProvider){
       

        $routeProvider.when('/musics',
        {
            templateUrl:'views/listMusic.html',
            controller: 'MusicController'
        });
        $routeProvider.when('/music/:musicId',
        {
            templateUrl:'views/detailMusic.html',
            controller: 'DetailMusicController'
        });
        $routeProvider.when('/login',
        {
            templateUrl:'views/login.html',
            controller: 'LoginController'
        });
        $routeProvider.when('/register',
        {
            templateUrl:'views/register.html',
            controller: 'RegisterController'
        });
        $routeProvider.otherwise({redirectTo:'/login'})
        $locationProvider.html5Mode(true);
    });