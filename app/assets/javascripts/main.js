var app = angular.module('tekusage', ['ngRoute', 'app.controllers']);
app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  console.log("here");
  $routeProvider.when('/companies', {
    templateUrl: 'partials/companies/list.html',
    controller:  CompaniesListController,
    resolve:     { companies: function() { return  []; }}
  });
  $routeProvider.otherwise({ redirectTo: '/companies' });
}]);
