'use strict';

angular.module('angularHyResExampleApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl',
        resolve: {
          root: function(hrRoot) {
            /*jshint newcap: false */
            return hrRoot('/api').follow().$promise;
          }
        }
      });
  });
