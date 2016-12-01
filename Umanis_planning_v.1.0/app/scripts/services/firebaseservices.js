'use strict';

/**
 * @ngdoc service
 * @name umanisPlanningV10App.firebaseServices
 * @description
 * # firebaseServices
 * Factory in the umanisPlanningV10App.
 */
angular.module('umanisPlanningV10App')
  .factory('firebaseServices', function ($firebaseObject) {
    // Service logic
    // ...

    // Public API here
    return {
      addNewProject: function (project) {
        firebase.database().ref('projects/' + project.name + '/').set({
          name : project.name
        });
        firebase.database().ref('projects/' + project.name + '/createdBy').set(project.createdBy);
        console.log(project.guest);
        firebase.database().ref('projects/' + project.name + '/guest').set(project.guest);
      }
    };
  });
