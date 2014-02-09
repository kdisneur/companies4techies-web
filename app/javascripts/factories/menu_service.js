var MenuService = function() {
  var searchShown = false;

  return {
    showSearch: function() { searchShown = true; },
    hideSearch: function() { searchShown = false; },
    searchShown: function() { return searchShown; }
  };
};

app.factory('MenuService', MenuService);
