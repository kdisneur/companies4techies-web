# Tekusage

## Installation

```shell
git submodule init
git submodule update
cd dist
git checkout gh-pages
cd ..
nvm use
bash bootstrap.sh
```

## Development

```shell
ELASTICSEARCH_HOST=xxx.xxx.xxx.xxx:9200 npm start
```

## Production

```shell
ELASTICSEARCH_HOST=xxx.xxx.xxx.xxx:9200 npm run-script deploy
```
