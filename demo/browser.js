'use strict';

// Browser-side code for kingfish demo

// Create the router
var router = require('kingfish');
var routes = require('./routes');
var r = new router(routes, document.getElementById('content'));

// Handle the current URL and start listening to link clicks and back/forward buttons
r.start();
