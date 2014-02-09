MenuController = function($scope, MenuService) {
  $scope.showSearch = MenuService.searchShown;
};

MenuController.$inject = ['$scope', 'MenuService'];
