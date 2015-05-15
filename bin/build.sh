#!/bin/sh

# Exit if any command fails
set -e

DIR=$(pwd)
BIN=$(pwd)/node_modules/.bin/

if [ "$NODE_ENV" = "production" ]
then
	export JEKYLL_ENV="production"
fi

# Main build
${BIN}gulp | ${BIN}bunyan --output short --color --time local

# Jekyll build
cd ${DIR}/docs
bundle exec jekyll build

# Minify jekyll docs
cd ${DIR}/docs/_site
cp index.html index.src.html
cat index.src.html | ${BIN}html-minifier --remove-comments --collapse-whitespace --collapse-boolean-attributes --remove-attribute-quotes --minify-js --minify-css > index.html

# Start the demo server
cd ${DIR}
${BIN}babel-node demo/server.js
