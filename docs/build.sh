#!/bin/sh

# Exit if any command fails
set -e

# Jekyll build
bundle exec jekyll build

# Minify jekyll docs
cp _site/index.html _site/index.src.html
cat _site/index.src.html | node_modules/.bin/html-minifier --remove-comments --collapse-whitespace --collapse-boolean-attributes --remove-attribute-quotes --minify-js --minify-css > _site/index.html
