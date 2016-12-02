'use strict';

/**
 * @ngdoc function
 * @name umanisPlanningV10App.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the umanisPlanningV10App
 */
angular.module('umanisPlanningV10App')
  .controller('LoginCtrl', function ($scope, $rootScope, $firebaseAuth, $window) {
    var auth = $firebaseAuth();
    $scope.newUser = {
      login: '',
      pwd: ''
    };
    $scope.signIn = function() {
      auth.$signInWithEmailAndPassword($scope.newUser.login, $scope.newUser.pwd).then(function(firebaseUser) {
        $rootScope.user = firebaseUser;
        $window.localStorage.setItem('user',JSON.stringify($rootScope.user));
        $window.location.href = '#/';
      }).catch(function(error) {
        $scope.error = error;
      });
    };
  });
