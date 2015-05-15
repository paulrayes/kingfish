cloudy-skies
============

Single-page theme and starter kit for Jekyll sites.

See it in action at [rayes.io/kingfish](http://www.rayes.io/kingfish).

Install
-------

Download this repository and install dependencies with:

```sh
sudo apt-get install nodejs ruby-full
sudo gem install bundler
wget -O - https://github.com/paulrayes/cloudy-skies/raw/master/update.sh | sh
```

The update script may ask for your sudo password to install additional gems.

Create your pages, for example `000-intro.md`, add add contents such as the following:

```
---
layout: default
title: Intro
permalink: /
anchor: intro
---

Insert your page contents here. The four pieces of metadata above are required.
```

Pages are sorted alphabetically, thus the numerical prefix allows you to order them however you want. The permalink of all pages must be `/`. The anchor is used for the URL hash.

Create a `_config.yml` file with the following contents, but with your site's information:

```yml
# Site settings
title: cloudy-skies
email: paul@rayes.io
description: Single-page theme and starter kit for Jekyll sites
baseurl: "/cloudy-skies" # the subpath of your site, e.g. /blog
url: "http://www.rayes.io" # the base hostname & protocol for your site
github: paulrayes/cloudy-skies
npm: cloudy-skies
prodFontUrl: /cloudy-skies/fonts/
ga: UA-XXXXXXXX-1 # Google Analytics

# Build settings
markdown: kramdown

kramdown:
  input: GFM # GitHub-flavored markdown for more features
  syntax_highlighter: rouge # Allows us to use ```-style fenced code blocks

# Don't need these
exclude: [node_modules, Gemfile, README.md, LICENSE, watch.sh, build.sh, package.json]
```

Finally create a `includes/footer.md` file with your desired footer contents, such as the following which I use for library documentation sites:

```md
Copyright © 2015 Paul Rayes.

Except where otherwise noted, contents of this documentation is licensed under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/).

Source code licensed under the Apache 2.0 license.
```

Usage
-----

There are two convenience scripts included:

- `build.sh`: Builds the site, then minifies the resulting HTML page.
- `watch.sh`: Builds the site, and re-builds if files change. Does not minify.

Set the environment variable JEKYLL_ENV to "production" for a deployment-ready build.:

```sh
JEKYLL_ENV=production sh build.sh
```

These scripts do not start the jekyll server as I usually use my own.

In production, the web fonts location can be changed. This is for cacheability if you have multiple sites running this theme, so you can host a single copy of the "fonts" folder for all sites.

Updating
--------

Assuming you do not edit any of the included files, updating is easy. Just run the following:

```sh
wget -O - https://github.com/paulrayes/cloudy-skies/raw/master/update.sh | sh
```

You should not run your current copy of `update.sh` instead, because it may have changed.

LICENSE
-------

```
   Copyright 2015 Paul Rayes

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
```
