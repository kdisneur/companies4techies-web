CompaniesListController = function($scope, CompanyService, MenuService, queryString) {
  $scope.map = {
    center: { latitude: 8.385, longitude: -3.23},
    zoom:   2,
    options: {
      styles: [
        {
          featureType: 'water',
          stylers: [
            { 'color': '#f0f0f0' }
          ]
        },
        {
          featureType: 'landscape',
          stylers: [
            { weight:    0.1 },
            { hue:       '#ff8800' },
            { lightness: -29 }
          ]
        },
        {
          stylers: [
            { visibility: 'simplified' },
            { gamma:      1 },
            { saturation: -100 },
            { lightness:  10 }
          ]
        }
      ]
    }
  };

  $scope.companies = [];
  $scope.locations = [];
  $scope.page      = 1;
  $scope.nextPage  = function() {
    $scope.fetchingData = true;
    CompanyService.search(queryString, $scope.page, function(companies) {
      if (companies.length == 0) return;

      _.each(companies, function(company) {
        $scope.companies.push(company);
        buildLocations(company, function(location) { $scope.locations.push(location); });
      });
      $scope.fetchingData = false;
      $scope.page++;
    });
  };

  $scope.companiesPartialName = function() {
    template_name = 'companies'//($scope.companies && $scope.companies.length > 0) ? 'companies' : 'empty'
    return 'partials/companies/' + template_name + '.html';
  };

  $scope.goToCompany = function(company_id) {
    console.log('go to ');
    console.log(company_id);
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

  var buildLocations = function(company, callback) {
    _.each(company.locations, function(location) {
      callback({
        latitude:     location.coordinates.lat,
        longitude:    location.coordinates.lon,
        company_id:   company._id,
        company_name: company.name,
        icon:         '/images/marker.png',
        goToCompany:  function() { console.log(company) }
      });
    });
  };

  init = function() {
    MenuService.showSearch();
    $scope.nextPage();
  };

  init();
};

CompaniesListController.$inject = ['$scope', 'CompanyService', 'MenuService', 'queryString'];
