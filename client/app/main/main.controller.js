'use strict';

angular.module('angularHyperResourceExampleApp')
  .controller('MainCtrl', function ($scope, $http, hrResource) {
    $scope.resource = hrResource('/api/things').get();

    $scope.follow = function(rel) {
      if (!$scope.resource.$link(rel)) {
        return;
      }

      $scope.resource = $scope.resource.$follow(rel);
    };

    $scope.section = function(s) {
      if (s === null) {
        return;
      }

      $scope.resource = $scope.resource.$followLink(s);
    };
  });
