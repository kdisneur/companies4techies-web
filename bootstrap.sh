VERSION=${VERSION:-0.90.10}
app_name="elasticsearch-${VERSION}"
tgz_name="${app_name}.tar.gz"

sudo apt-get install -y openjdk-7-jre zip
wget http://download.elasticsearch.org/kibana/kibana/kibana-latest.zip
unzip kibana-latest.zip
mv kibana-latest kibana
mv kibana elasticsearch/.
rm kibana-latest.zip
ln -s elasticsearch/kibana-companies-dashboards.json elasticsearch/kibana/app/dashboards/companies.json
wget "https://download.elasticsearch.org/elasticsearch/elasticsearch/${tgz_name}"
tar zxf ${tgz_name}
mv ${app_name} elasticsearch/elasticsearch
rm ${tgz_name}

elasticsearch/elasticsearch/bin/elasticsearch
bash load_data.sh

bundle
rbenv rehash
npm install -g brunch bower
bower install
npm install
