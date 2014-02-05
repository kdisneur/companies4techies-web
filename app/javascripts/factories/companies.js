CompanyFinder = function() {
  var computeLocationTerms = function(memo, value, field) {
    object = { term: {} };
    object['term']['locations.' + field] = value;
    memo.push(object);
    return memo;
  };

  var computeTerms = function(memo, value, field) {
    object = { term: {} };
    object['term'][field] = value;
    memo.push(object);
    return memo;
  };

  var locationQuery = function(queryString) {
    if (!queryString) return {};

    return {
      filter: {
        nested: {
          path: 'locations',
          query: {
            bool: {
              must: _.reduce(queryString, computeLocationTerms, [])
            }
          }
        }
      }
    };
  };

  var normalQuery = function(queryString) {
    return {
      query: {
        bool: {
          must: _.reduce(queryString, computeTerms, [])
        }
      }
    };
  };

  var query = function(queryString) {
    if (queryString == null) return { match_all: {} };
    return { filtered: _.extend({}, normalQuery(queryString.main), locationQuery(queryString.locations))};
  };

  return {
    host:    '192.168.0.39:9200',
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
