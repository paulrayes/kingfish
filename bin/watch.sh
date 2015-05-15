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
${BIN}gulp watch | ${BIN}bunyan --output short --color --time local &

# Jekyll build
(cd ${DIR}/docs && sh watch.sh) &

# Start the demo server
(cd ${DIR} && ${BIN}nodemon demo/server.js)
