HomeController = function($scope, Company) {
  $scope.technologies = ['ruby', 'node.js', 'python', '.net', 'java'];
  $scope.companies    = Company.search(undefined, function(companies) {
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
  };

  init();
};

HomeController.$inject = ['$scope', 'Company'];
