WordModificationDirective = function(WordModificationService) {
  return {
    template: '<a href="#!/companies-using-{{wordModification}}">{{wordModification}}</a>',
    replace:  true,
    link: function(scope, element, attrs) {
      var updateWord = function() {
        word_list = scope.$eval(attrs.wordModification);
        first     = word_list.shift();
        word_list.push(first);

        scope.wordModification = first;
      }
      WordModificationService.onWordModification(scope, updateWord);
      updateWord();
    }
  }
};

app.directive('wordModification', ['WordModificationService', WordModificationDirective]);
