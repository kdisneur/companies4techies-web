HomeController = function($scope, CompanyService, MenuService) {
  $scope.technologies = ['ruby', 'node.js', 'python', '.net', 'java'];
  $scope.companies    = CompanyService.search(undefined, 1, function(companies) {
    $scope.$apply(function() {
      $scope.companies = companies;
    });
  });

  $scope.companiesPartialName = function() {
    template_name = ($scope.companies && $scope.companies.length > 0) ? 'companies' : 'empty'
    return 'partials/companies/' + template_name + '.html';
  };

  var init = function() {
    new WOW().init();
    MenuService.hideSearch();
  };

  init();
};

HomeController.$inject = ['$scope', 'CompanyService', 'MenuService'];
