---
layout: default
title: Contributing
permalink: /
anchor: contributing
---

Bug requests and pull requests are welcome. Keep the following in mind:

- Follow the existing code style. All code must pass lint. Do not change the eslint config to make it pass.
- Any new features must be either included in the existing demo, or added to a second demo.
- If you are adding a feature, please suggest it on the bug tracker to start a dialog about the best way to implement it.
- Any changes to the API presented when kingfish is required must be documented

To develop, checkout the repository from GitHub and install the dependencies:

- Install Ruby. This is required for the documentation site, which is built using Jekyll. You need at least version 2.0, check with `ruby --version`.
- Install Bundler, the Ruby dependency manager: `gem install bundler`
- Install the Node.js dependencies: `npm install`

Run build scripts with npm:

- `npm run start`: Builds the module, demo, docs, and runs the demo server
- `npm run watch`: Builds the module, demo, docs, runs the demo server, and re-builds when files change.

Set NODE_ENV to the following to affect the build process. This affects the build of the module, demo, and docs.

- `NODE_ENV=development`: Quickest build times, all debugging turned on, no minification
- `NODE_ENV=staging`: Debugging turned on, minification turned on
- `NODE_ENV=production`: Debugging turned off, Minification turned on
