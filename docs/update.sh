#!/bin/sh

# Exit if any command fails
set -e

wget https://github.com/paulrayes/cloudy-skies/archive/master.zip
unzip -o master.zip
cp -R cloudy-skies-master/* .
rm -rf cloudy-skies-master
rm master.zip
bundle update
npm install
