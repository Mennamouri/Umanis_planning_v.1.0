'use strict';

/**
 * @ngdoc overview
 * @name umanisPlanningV10App
 * @description
 * # umanisPlanningV10App
 *
 * Main module of the application.
 */
var app = angular
  .module('umanisPlanningV10App', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    "firebase",
    "ui.calendar",
    "ngMaterial"
  ]);
  app.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl',
        controllerAs: 'signup'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
app.run(function ($rootScope, $location) {
  $rootScope.user = null;
  $rootScope.$on( "$routeChangeStart", function(event, next, current) {
    if ( $rootScope.user == null ) {
        $location.path( "/login" );
      }
    });
  });
