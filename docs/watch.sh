#!/bin/sh

# Exit if any command fails
set -e

# Jekyll build
bundle exec jekyll build --watch
