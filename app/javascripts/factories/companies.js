CompanyFinder = function() {
  var query = function(queryString) {
    if (queryString == null) return { match_all: {} };

    return {
      filtered: {
        filter: {
          bool: {
            must: _.reduce(queryString, function(memo, value, field) {
              object = { term: {} };
              object['term'][field] = value;
              memo.push(object);
              return memo;
            }, [])
          }
        }
      }
    };
  };

  return {
    host:    '192.168.0.33:9200',
    indices: 'tekusage',
    types:   'company',
    search: function(queryString, callback) {
      new elasticsearch.Client({ host: this.host, log: 'trace'}).search({
        index: this.indices,
        type:  this.types,
        body:  { query: query(queryString) }
      }, function(error, results, status) {
        callback(_.map(results.hits.hits, function(hit) { return hit._source }));
      });
    }
  };
}

app.factory('Company', CompanyFinder);