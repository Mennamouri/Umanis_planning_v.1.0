'use strict';

/**
 * @ngdoc function
 * @name umanisPlanningV10App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the umanisPlanningV10App
 */
angular.module('umanisPlanningV10App')
  .controller('MainCtrl', function ($rootScope, $scope, $mdDialog, $firebaseObject,firebaseServices, $firebaseArray) {
    var ref = firebase.database().ref().child("projects");
    $scope.projectsList = $firebaseArray(ref);
    $scope.checkForGuest = function(proj){
      var valueToReturn = false;
      if(proj.guest){
        proj.guest.forEach(function (p) {
          if(p == $rootScope.user.email)
            valueToReturn = true;
        });
      }
      return valueToReturn;
    };

    $scope.selectedProject = {
      name : '',
      createdBy : {id : '', login : ''},
      guest : [],
      task : []
    };
    $scope.status = '  ';
    $scope.customFullscreen = false;
    $scope.eventSources = $scope.selectedProject.task ? $scope.selectedProject.task : [];
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
    $scope.changeSelectedProject = function(proj){
      if(proj.createdBy.login == $rootScope.user.email || $scope.checkForGuest(proj))
        $scope.selectedProject = proj;
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
    $scope.saveTask = function(task){
      task.start = task.start.getTime();
      task.end = task.end.getTime();
      firebaseServices.saveTaskInProject($scope.selectedProject.name, task);
    };
    $scope.addTask = function(){
      var date = new Date();
      var d = date.getDate();
      var m = date.getMonth();
      var y = date.getFullYear();
      var newTask = {
        id : date.getTime().toString(),
        start : new Date(y, m, d).toString(),
        end : new Date(y, m, d + 1).toString(),
        target : $rootScope.user.email,
        title : 'Insert a title',
        description : 'Insert a description'
      };
      console.log(new Date(y, m, d));
      firebaseServices.saveTaskInProject($scope.selectedProject.name,newTask);
    };
  });
