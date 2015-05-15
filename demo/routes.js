'use strict';

// Routes definitions for kingfish demo.

var router = require('kingfish');

// Routes for blog module
var blogRoutes = {

	// Display a single post
	'/post/?': class {

		// Render a simple string with the page contents
		renderString() {
			return 'This is the post with ID ' + this.params[0];
		}

		// Here we do not have comments or any other dynamic content--post pages
		// are completely static. So, we will just re-use the renderString method.
		// This mount method is technically optional in this case, as this is the
		// default behavior.
		mount() {
			this.element.innerHTML = this.renderString();
		}

		// This is called when moving from one blog post to another. This method
		// is optional when the parameters never change, however most of the time
		// this will not be the case.
		setParams(newParams) {
			this.params = newParams;
			this.mount();
		}
	},

	// Blog homepage
	// This handler is written completely in ES5 for demonstrative purposes.
	// You can use ES5 or ES6, but ES6 will be much easier to read.
	'/': (function() {
		var handler = function() {};
		handler.prototype.renderString = function() {
			return 'List of all the blog posts would go here';
		};
		return handler;
	})(),

	// 404 handler, /* means match everything
	// This must be defined last as routes are searched in the order they are defined,
	// if it's first it will always be a match and the other routes would never be used
	'/*': class {
		renderString() {
			return 'Could not find that page in the blog';
		}
	}
};

// Routes for the main application
module.exports = {

	// Display the blog module at /blog
	// We have /* at the end to match everything after /blog, this will be set
	// as a parameter which we will give to the blog module.
	'/blog/*': class {
		// Render the page contents as a string
		// We create a router to handle the post contents here. For slightly better
		// performance we could also create the router when this module is loaded,
		// so it is only done once.
		renderString() {
			var r = new router(blogRoutes);
			var child = r.renderString(this.params[0]);
			return 'Blog<div class="childContainer">' + child + '</div>';
		}

		// Render the page contents into the DOM element and start whatever the blog
		// module requires to work, in this case just the router.
		// A better API for modules would be to expose mount, unmount, and setParams methods
		// only, so they could be used anywhere.
		// We do not use an id on the element as we have no knowledge of the rest
		// of the page, and cannot guarantee that an id will ever be unique.
		mount() {
			// Render our own HTML with a container for the blog
			this.element.innerHTML = 'Blog<div class="childContainer"></div>';
			// Retreive the blog's container, this is going to cause a layout+paint so don't do it too often
			var childElement = this.element.getElementsByClassName('childContainer')[0];
			// Start a router for the blog
			this.childRouter = new router(blogRoutes, childElement);
			// Re-use the setParams method to display the blog contents, it knows how to do it
			this.setParams(this.params);
		}


		// Called when navigating away from /blog completely, destroy any event handlers
		// and objects created. This is actually not required as the childRouter was
		// never started, but is included for demonstration purposes.
		unmount() {
			this.childRouter.stop();
		}

		// Navigating to a new URL within /blog, send the rest of the URL to the
		// blog's route handler so it can deal with it.
		// We receive the new params as an argument so we could compare with the
		// old ones and decide what to update.
		setParams(newParams) {
			this.params = newParams;
			this.childRouter.render(this.params[0]);
		}
	},

	// Display the home page, it's just a static string and there are no URL parameters
	// so only the renderString method is needed.
	'/': class {
		renderString() {
			return `
				<p>This is the home page.</p>
				<p>Pages are rendered on the server and client. Disable Javascript and everything will continue to work. With Javascript enabled only the parts of pages that change will be repainted for super fast performance.</p>
				<p>Opening pages in a new window works properly as well.</p>
				<p>The size of all Javascript on this page is less than 10 kB minified, including this text.</p>
				`;
		}
	}

	// No 404 handler as there is a default one we are using
};
