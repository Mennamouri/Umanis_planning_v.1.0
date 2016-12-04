angular.module('umanisPlanningV10App')
  .controller('HeaderCtrl', function ($rootScope, $scope,$window){
    $scope.logout = function(){
    $rootScope.user = null;
    $window.localStorage.removeItem('user');
    $window.location.href = '#/login';
    };
  });
