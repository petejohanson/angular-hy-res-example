'use strict';

angular.module('angularHyResExampleApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap',
  'angular-hy-res-hal',
  'angular-hy-res-siren',
  'angular-hy-res-link-header',
  'angular-hy-res-json'
])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
  });
