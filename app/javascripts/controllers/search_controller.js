SearchController = function($scope, $location, $routeParams) {
  $scope.search = $routeParams.q;
  $scope.doSearch = function() {
    $location.search({ q: $scope.search }).path('/search');
  }
};

SearchController.$inject = ['$scope', '$location', '$routeParams'];
