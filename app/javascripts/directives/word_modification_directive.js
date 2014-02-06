WordModificationDirective = function(WordModificationService) {
  return {
    template: '<a href="#!/companies-using-{{wordModification}}">{{wordModification}}</a>',
    replace:  true,
    link: function(scope, element, attrs) {
      var updateWord = function() {
        word_list = scope.$eval(attrs.wordModification);
        scope.wordModification = word_list[_.random(0, (word_list.length - 1))];
      }
      WordModificationService.onWordModification(scope, updateWord);
      updateWord();
    }
  }
};

app.directive('wordModification', ['WordModificationService', WordModificationDirective]);
