'use strict';

angular.module('solrAngularDemoApp')
  .directive('searchResults', function () {
    return {
      scope: {
        solrUrl: '=',
        displayField: '=',
        query: '&',
        results: '&'
      },
      restrict: 'E',
      controller: function($scope, $http) {
        console.log('Searching for ' + $scope.query + ' at ' + $scope.solrUrl);
        $scope.$watch('query', function() {
          $http(
            {method: 'JSONP',
             url: $scope.solrUrl,
             params:{'json.wrf': 'JSON_CALLBACK',
                    'q': $scope.query,
                    'fl': $scope.displayField}
            })
            .success(function(data) {
              var docs = data.response.docs;
              console.log('search success!');
              $scope.results.docs = docs;

            }).error(function() {
              console.log('Search failed!');
            });
        });
      },
      template: '<input ng-model="query" name="Search"></input>' +
                '<h2>Search Results for {{query}}</h2>' +
                '<span ng-repeat="doc in results.docs">' +
                '  <p>{{doc[displayField]}}</p>'  +
                '</span>'
    };
  });
