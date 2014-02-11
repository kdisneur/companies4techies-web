app.config(['$translateProvider', function($translateProvider) {
  $translateProvider.translations('en', window.locales['en']);
  $translateProvider.preferredLanguage('en');
}]);
