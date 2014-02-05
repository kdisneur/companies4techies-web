app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider.when('/companies-using-:technology-in-:city,:country', {
    templateUrl: 'partials/companies/list.html',
    controller:  CompaniesListController,
    resolve:     {
      queryString: function($route) {
        return {
          main: {
            technologies: $route.current.params.technology
          },
          locations: {
            country: $route.current.params.country,
            city:    $route.current.params.city
          }
        }
      }
    }
  });

  $routeProvider.when('/companies-using-:technology', {
    templateUrl: 'partials/companies/list.html',
    controller:  CompaniesListController,
    resolve:     {
      queryString: function($route) {
        return { main: { technologies: $route.current.params.technology }};
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
