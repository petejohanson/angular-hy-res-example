'use strict';

angular.module('angularHyResExampleApp')
  .controller('MainCtrl', function ($scope, $http, hrRoot) {
    $scope.root = new hrRoot('/api').follow();

    $scope.root.$promise.then(function(r) {
      $scope.type = r.$link('things')[0];
    });
    $scope.resource = null;

    $scope.$watch('type', function(type) {
      if (!type) {
        $scope.resource = null;
        return;
      }

      $scope.resource = type.follow();
    });

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
