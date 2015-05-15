'use strict';

// Server-side code for kingfish demo using express

// Dependencies
var fs = require('fs');
var express = require('express');
var compression = require('compression');
var serveStatic = require('serve-static');
var app = express();

app.use(compression());

// Serve our static files, including the jekyll documentation site
app.use('/', serveStatic(__dirname + '/build'));
app.use('/kingfish', serveStatic(__dirname + '/../docs/_site'));

// Create the router
var router = require('kingfish');
var routes = require('./routes');
var r = new router(routes);

// Handle everything not handled above, these will be handled by kingfish.
app.get('*', function(req, res) {
	// Load our HTML template into memory
	// In production you should do this when creating the router, I am doing it
	// on every request so I can change the template and not have to restart the
	// server.
	var html = fs.readFileSync(__dirname + '/index.html').toString();

	// Render the page for the request URL
	var statusCode = 200;
	var content = r.renderString(req.originalUrl);

	// RenderString will return either a string, which corresponds to status 200,
	// or an array. If it's an array we need to change our status code.
	if (Array.isArray(content)) {
		statusCode = content[0];
		content = content[1];
	}

	// Place the rendered contents into the template
	// You will probably want to use something more powerful like Handlebars or DoT to do this.
	html = html.replace('<div id="content"></div>', '<div id="content">' + content + '</div>');

	// Send the final page to the user
	res.setHeader('Content-Type', 'text/html');
	res.status(statusCode).send(html);
});

// Start listening to requests
app.listen(8080);

console.log('Demo server listening at localhost:8080');
