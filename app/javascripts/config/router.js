app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(false).hashPrefix('!');
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

  $routeProvider.when('/', {
    templateUrl: 'partials/home/index.html',
    controller:  HomeController
  });

  $routeProvider.when('/search', {
    templateUrl: 'partials/companies/list.html',
    controller:  CompaniesListController,
    resolve: {
      queryString: function($route) { return { fulltext: $route.current.params.q }; }
    }
  });

  $routeProvider.when('/404', {
    templateUrl: 'partials/404.html'
  });

  $routeProvider.otherwise({ templateUrl: 'partials/404.html' });
}]);
