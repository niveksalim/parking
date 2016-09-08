'use strict';

/**
 * @ngdoc overview
 * @name parkingApiApp
 * @description
 * # parkingApiApp
 *
 * Main module of the application.
 */
angular
  .module('parkingApiApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngMap',
    'ngMaterial'
  ])
  .constant('config', (function() {
    var resource = '';
    return {
      apiBaseUrl: resource,
      apiUrl: resource + '/api/v1'
    };
  })())
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
  });
