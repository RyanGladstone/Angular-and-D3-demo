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

    // Should be d3Data?
    $scope.d3Data = [
      { name: 'Greg', score: 98 },
      { name: 'Ari', score: 96 },
      { name: 'Q', score: 75 },
      { name: 'Loser', score: 48 }
    ];
              


  });
