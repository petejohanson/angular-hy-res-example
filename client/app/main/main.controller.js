'use strict';

angular.module('angularHyResExampleApp')
  .controller('MainCtrl', function ($scope, $http, root) {
    $scope.root = root;
    $scope.type = root.$links('things')[0];
    $scope.resource = null;

    var updateResource = function(r) {
      $scope.resource = r;
      $scope.items = r.$followAll('item');
    };

    $scope.$watch('type', function(type) {
      if (!type) {
        $scope.resource = null;
        return;
      }

      updateResource(type.follow());
    });

    $scope.follow = function(rel) {
      if (!$scope.resource.$has(rel)) {
        return;
      }
      updateResource($scope.resource.$followOne(rel));
    };

    $scope.section = function(s) {
      if (s === null) {
        return;
      }

      updateResource(s.follow());
    };
  });
