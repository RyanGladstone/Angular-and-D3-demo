'use strict';

/**
 * @ngdoc function
 * @name angularAndD3App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularAndD3App
 */
angular.module('angularAndD3App')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
