app.config(['$translateProvider', function($translateProvider) {
  console.log(window.locales);
  $translateProvider.translations('en', window.locales['en']);
  $translateProvider.preferredLanguage('en');
}]);
