ELASTICSEARCH_HOST=${ELASTICSEARCH_HOST:-localhost}
ELASTICSEARCH_PORT=${ELASTICSEARCH_PORT:-9200}
elasticsearch_url="http://${ELASTICSEARCH_HOST}:${ELASTICSEARCH_PORT}"

[ -f companies.json ] && rm companies.json
for company in companies/*; do
  echo  '{ "index" : { "_type" : "company" }}
  '$(cat ${company} | tr '\n' ' ') >> companies.json
done

curl -XDELETE "${elasticsearch_url}/myapp"
curl -XPOST "${elasticsearch_url}/myapp" -d @elasticsearch/mapping.json
curl -s -XPOST "${elasticsearch_url}/myapp/_bulk" --data-binary @companies.json
