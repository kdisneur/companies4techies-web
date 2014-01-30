CompaniesListController = function($scope, Company, queryString) {
  $scope.companies = Company.search(queryString, function(companies) {
    $scope.$apply(function() {
      $scope.companies = companies;
    });
  });

  $scope.companiesPartialName = function() {
    template_name = ($scope.companies && $scope.companies.length > 0) ? 'companies' : 'empty'
    return 'partials/companies/' + template_name + '.html';
  };

  $scope.addCompanyFromGithub = function() {
    url  = 'https://github.com/kdisneur/website/issues/new?';
    url += 'title=Add%20a%20company';
    url += '&body=';
    url += '*%20Name:%0A';
    url += '*%20Website:%0A';
    url += '*%20Technologies:%0A';
    url += '*%20Number%20of%20employees:%0A';
    url += '*%20Type:%0A';
    url += '*%20Addresses:%0A';

    window.location.href = url;
  };
};

CompaniesListController.$inject = ['$scope', 'Company', 'queryString'];
