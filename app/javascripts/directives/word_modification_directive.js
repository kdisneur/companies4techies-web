WordModificationDirective = function(WordModificationService) {
  return {
    template: '<a href="#!/companies-using-{{wordModification}}">{{wordModification}}</a>',
    replace:  true,
    link: function(scope, element, attrs) {
      var updateWord = function() {
        word_list = scope.$eval(attrs.wordModification);
        first     = word_list.shift();
        word_list.push(first);

        $(element).removeClass('animated fadeOutDown');
        scope.wordModification = first;
        $(element).addClass('animated fadeInDown');
        $(element).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
          $(element).removeClass('animated fadeInDown');
          $(element).addClass('animated fadeOutDown');
        });
      }
      WordModificationService.onWordModification(scope, updateWord);
      updateWord();
    }
  }
};

app.directive('wordModification', ['WordModificationService', WordModificationDirective]);
