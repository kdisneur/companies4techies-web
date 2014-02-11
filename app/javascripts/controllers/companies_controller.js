CompaniesListController = function($scope, CompanyService, MenuService, queryString) {
  $scope.map       = function() {
    var boundbox = new google.maps.LatLngBounds();
    _.each($scope.locations(), function(location) { boundbox.extend(new google.maps.LatLng(location.latitude, location.longitude)) });
    point = boundbox.getCenter();
    return { latitude: point.lat(), longitude: point.lng() };
  };

  $scope.companies = [];
  $scope.page      = 1;
  $scope.nextPage  = function() {
    $scope.fetchingData = true;
    CompanyService.search(queryString, $scope.page, function(companies) {
      if (companies.length == 0) return;

      $scope.$apply(function() {
        _.each(companies, function(company) { $scope.companies.push(company) });
        $scope.fetchingData = false;
        $scope.page++;
      });
    });
  };

  $scope.locations = function() {
    return _.reduce($scope.companies, function(locations, company) {
      return _.flatten(_.zip(locations, _.map(company.locations, function(location) {
        return {
          latitude:     location.coordinates.lat,
          longitude:    location.coordinates.lon,
          company_id:   company._id,
          company_name: company.name
        };
      })));
    }, []);
  };

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

  init = function() {
    MenuService.showSearch();
    $scope.nextPage();
  };

  init();
};

CompaniesListController.$inject = ['$scope', 'CompanyService', 'MenuService', 'queryString'];
