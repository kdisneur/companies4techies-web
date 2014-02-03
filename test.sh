curl 'http://localhost:9200/tekusage/company/_search?pretty=true' -XPOST -d '
{
   "query": {
     "filtered": {
       "query" : {
         "term":  { "technologies": "ruby" }
       },
       "filter": {
         "nested": {
           "path": "locations",
           "query": {
             "bool" : {
               "must" : [
                 { "match": { "locations.country": "France" }},
                 { "match": { "locations.city": "Lille" }}
               ]
             }
           }
         }
       }
     }
   },
   "facets" : {
     "locations_city": {
       "terms" : {
         "field" : "locations.city"
       },
       "nested" : "locations"
     },
     "locations_country": {
       "terms" : {
         "field" : "locations.country"
       },
       "nested" : "locations"
     },
     "technologies": {
       "terms" : {
         "field" : "technologies"
       }
     }
   }
 }'
