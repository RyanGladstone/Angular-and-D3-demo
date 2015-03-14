'use strict';

/**
 * @ngdoc function
 * @name angularAndD3App.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the angularAndD3App
 */
angular.module('angularAndD3App')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
