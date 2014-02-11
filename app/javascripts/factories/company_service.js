var CompanyService = function() {
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
    if (queryString.fulltext != null) return { multi_match: { query: queryString.fulltext, fields: ['technologies^2', 'types', 'name'] }};

    return { filtered: _.extend({}, normalQuery(queryString.main), locationQuery(queryString.locations))};
  };

  return {
    host:    $PROCESS_ENV_ELASTICSEARCH_HOST,
    indices: 'tekusage',
    types:   'company',
    search: function(queryString, page, callback) {
      var size = 25;
      new elasticsearch.Client({ host: this.host, log: 'trace'}).search({
        index: this.indices,
        type:  this.types,
        body:  { query: query(queryString) },
        from:  (page-1) * size,
        size:  size
      }, function(error, results, status) {
        callback(_.map(results.hits.hits, function(hit) { return hit._source }));
      });
    }
  };
};

app.factory('CompanyService', CompanyService);
