var app = angular.module('tekusage', ['ngRoute']);

;CompaniesListController = function($scope, Company, queryString) {
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

;CompanyFinder = function() {
  var computeLocationTerms = function(memo, value, field) {
    object = { match: {} };
    object['locations.' + field] = value;
    memo.push(object);
    return memo;
  };

  var computeTerms = function(memo, value, field) {
    object = { term: {} };
    object['term'][field] = value;
    memo.push(object);
    return memo;
  };

  var locationQuery = function(queryString) {
    if (!!queryString) return {};

    return {
      filter: {
        nested: {
          path: 'locations',
          query: {
            bool: {
              must: _.reduce(queryString, computeLocationTerms, [])
            }
          }
        }
      }
    };
  };

  var normalQuery = function(queryString) {
    return {
      filtered: { query: _.reduce(queryString, computeTerms, []) }
    };
  };

  var query = function(queryString) {
    if (queryString == null) return { match_all: {} };
    return _.extend({}, normalQuery(queryString), locationQuery(queryString['locations']));
  };

  return {
    host:    '192.168.1.51:9200',
    indices: 'tekusage',
    types:   'company',
    search: function(queryString, callback) {
      new elasticsearch.Client({ host: this.host, log: 'trace'}).search({
        index: this.indices,
        type:  this.types,
        body:  { query: query(queryString) }
      }, function(error, results, status) {
        callback(_.map(results.hits.hits, function(hit) { return hit._source }));
      });
    }
  };
}

app.factory('Company', CompanyFinder);

;app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider.when('/companies-using-:technology-in-:city,:country', {
    templateUrl: 'partials/companies/list.html',
    controller:  CompaniesListController,
    resolve:     {
      queryString: function($route) {
        return {
          'technologies':      $route.current.params.technology,
          'company.locations.country': $route.current.params.country,
          'company.locations.city':    $route.current.params.city
        }
      }
    }
  });

  $routeProvider.when('/companies-using-:technology', {
    templateUrl: 'partials/companies/list.html',
    controller:  CompaniesListController,
    resolve:     {
      queryString: function($route) {
        return { 'technologies': $route.current.params.technology };
      }
    }
  });

  $routeProvider.when('/companies', {
    templateUrl: 'partials/companies/list.html',
    controller:  CompaniesListController,
    resolve: {
      queryString: function() { return null; },
    }
  });

  $routeProvider.otherwise({ redirectTo: '/companies' });
}]);

;
//# sourceMappingURL=app.js.map