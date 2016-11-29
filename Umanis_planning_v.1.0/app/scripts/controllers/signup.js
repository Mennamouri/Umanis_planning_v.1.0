'use strict';

/**
 * @ngdoc function
 * @name umanisPlanningV10App.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the umanisPlanningV10App
 */
angular.module('umanisPlanningV10App')
  .controller('SignupCtrl', function ($scope, $rootScope, $firebaseAuth, $window) {
    var auth = $firebaseAuth();
    $scope.error = null;
    $scope.message = null;
    $scope.newUser = {
      login : '',
      pwd : '',
      pwdConfirm : ''
    };
    $scope.createAccount = function(){
      if($scope.newUser.pwd != $scope.newUser.pwdConfirm)
      {
        $scope.error = {message : "Password are not identical"};
        return 0;
      }
      if($scope.newUser.pwd.length < 8)
      {
        $scope.error = {message : "Password must be at least 8 characters"};
        return 0;
      }
      auth.$createUserWithEmailAndPassword($scope.newUser.login, $scope.newUser.pwd)
        .then(function(firebaseUser) {
          $rootScope.user = firebaseUser;
          $window.location.href = '#/';
        }).catch(function(error) {
        $scope.error = error;
      });
    };

  });
