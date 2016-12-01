'use strict';

/**
 * @ngdoc function
 * @name umanisPlanningV10App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the umanisPlanningV10App
 */
angular.module('umanisPlanningV10App')
  .controller('MainCtrl', function ($rootScope, $scope, $mdDialog, $firebaseObject,firebaseServices) {
    var ref = firebase.database().ref();
    $scope.status = '  ';
    $scope.customFullscreen = false;
    $scope.projectsList = [];
    $scope.eventSources = [];
    $scope.uiConfig = {
      calendar:{
        editable: true,
        header:{
          left: 'month agendaWeek agendaDay',
          center: 'title',
          right: 'today prev,next'
        },
        eventClick: $scope.alertEventOnClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize
      }
    };

    $scope.showCreateProjectPopup = function(ev) {
      $mdDialog.show({
        controller: DialogController,
        templateUrl: '../views/templates/create_project_temp.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
      })
        .then(function(answer) {
          $scope.status = 'You said the information was "' + answer + '".';
        }, function() {
          $scope.status = 'You cancelled the dialog.';
        });
    };
    function DialogController($scope, $mdDialog) {
      $scope.newProject = {
        name : '',
        createdBy : {id : $rootScope.user.uid, login : $rootScope.user.email},
        guest : [],
        task : []
      };

      $scope.tmpGuest = "";
      $scope.cancel = function() {
        $mdDialog.cancel();
      };
      $scope.addGuest = function(){
        if($scope.tmpGuest != ''){
          $scope.newProject.guest.unshift($scope.tmpGuest);
          $scope.tmpGuest = '';
        }
      };
      $scope.removeGuest = function(i){
        $scope.newProject.guest.splice(i, 1);
      };
      $scope.addProject = function () {
        firebaseServices.addNewProject($scope.newProject);
        $mdDialog.cancel();
      };
    }
  });
