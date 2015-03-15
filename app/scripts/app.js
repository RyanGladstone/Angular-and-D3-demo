'use strict';

/**
 * @ngdoc overview
 * @name angularAndD3App
 * @description
 * # angularAndD3App
 *
 * Main module of the application.
 */

/* jshint undef: false, unused: false */
 

var angularAndD3App = angular.module('angularAndD3App', [
    'ngAnimate',
    'ngResource',
    'ngRoute',
    'ngSanitize'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

angularAndD3App.factory('d3Service', ['$document', '$q', '$rootScope',
    function($document, $q, $rootScope) {
     
     var d = $q.defer();
     
     function onScriptLoad() {
       // Load client into browswer
       $rootScope.$apply(function() { d.resolve(window.d3); });
     }
     
     // Create a script tag with d3 as the source
     // and call our onScriptLoad callback when it
     // has been loaded
     var scriptTag = $document[0].createElement('script');
     scriptTag.type = 'text/javascript';
     scriptTag.async = true;
     scriptTag.src = 'http://d3js.org/d3.v3.min.js';
     scriptTag.onreadystatechange = function () {
       if (this.readyState === 'complete') {
         onScriptLoad();
       }
     };
     scriptTag.onload = onScriptLoad;
     
     var s = $document[0].getElementsByTagName('body')[0];
     s.appendChild(scriptTag);
     
     return {
       d3: function() { return d.promise; }
     };

  }]);




angularAndD3App.directive('d3Bars', 
  ['$window', '$timeout', 'd3Service', 
    function($window, $timeout, d3Service) {

      return {
        restrict: 'EA',
        scope: {
          data: '=' // bi-directional data binding
        },
        link: function(scope, element, attrs) {
          d3Service.d3().then(function(d3) {
            
            var margin = parseInt(attrs.margin) || 20,
                barHeight = parseInt(attrs.barHeight) || 20,
                barPadding = parseInt(attrs.barPadding) || 5;
                
              // d3 is the raw d3 object
              var svg = d3.select(element[0])
                    .append('svg')
                    .style('width', '100%');
                    
              // Browser onresize event
              window.onresize = function() {
                scope.$apply();
              };
            
              // Watch for resize event
              scope.$watch( function() {
                return angular.element($window)[0].innerWidth;
              }, function() {
                scope.render(scope.data);
              });

              // Watch for data changes
              scope.$watch('data', function(newVals, oldVals) {
                return scope.render(newVals);
              }, true);
              
              scope.render = function(data) {
                // our custom d3 code
                
                // remove all previous items before render
                svg.selectAll('*').remove();

                // If we don't pass any data, return out of the element
                if (!data) {
                  return;
                }

                // setup variables
                var width = d3.select(element[0]).node().offsetWidth - margin,
                  // calculate the height
                  height = scope.data.length * (barHeight + barPadding),
                  // use the category20() scale function for multicolor support
                  color = d3.scale.category20(),
                  // our xScale
                  xScale = d3.scale.linear()
                    .domain([0, d3.max(data, function(d) {
                      return d.score;
                    })])
                    .range([0, width]);

                  // set the height based on the calculations above
                  svg.attr('height', height);

                  svg.selectAll('rect')
                    .data(data).enter()
                    .append('rect')
                    .attr('height', barHeight)
                    .attr('width', 140)
                    .attr('x', Math.round(margin/2))
                    .attr('y', function(d,i) {
                      return i * (barHeight + barPadding);
                    })
                    .attr('fill', function(d) { return color(d.score); })
                    .transition()
                    .duration(1000)
                    .attr('width', function(d) {
                      return xScale(d.score);
                    });


              };
    
          });
      }};
}]);






