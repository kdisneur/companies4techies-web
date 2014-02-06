WordModificationService = function($rootScope) {
  var WORD_MODIFICATION_TICK = "e:wordModication";
  var wordModificationTick = function() {
    $rootScope.$broadcast(WORD_MODIFICATION_TICK);
  };

  setInterval(function() {
    wordModificationTick();
    $rootScope.$apply();
  }, 1000 * 2);

  return {
    wordModificationTick: wordModificationTick,
    onWordModification: function($scope, handler) {
      $scope.$on(WORD_MODIFICATION_TICK, function() {
        handler();
      });
    }
  };
};

app.factory('WordModificationService', ['$rootScope', WordModificationService]);
