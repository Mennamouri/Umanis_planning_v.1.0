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
app.run(function ($rootScope, $location, $window) {
  $rootScope.user = null;
  if($window.localStorage.getItem('user')){
    $rootScope.user = JSON.parse($window.localStorage.getItem('user'));
  }
  $rootScope.$on( "$routeChangeStart", function(event, next, current) {
    if ( $rootScope.user == null ) {
      if (next.templateUrl !== "views/login.html" && next.templateUrl !== "views/signup.html" )
        $location.path( "/login" );
      }
    });
  });
