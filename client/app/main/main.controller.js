'use strict';

angular.module('angularHyResExampleApp')
  .controller('MainCtrl', function ($scope, $http, hrRoot) {
    $scope.root = new hrRoot('/api').follow();

    $scope.root.$promise.then(function(r) {
      $scope.type = r.$links('things')[0];
    });
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
      if (!$scope.resource.$if(rel)) {
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
