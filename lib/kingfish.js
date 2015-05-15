'use strict';

// Router object, used on both server and browser

class router {

	// Initialize the router
	constructor(routes, element) {
		this.routes = routes;
		this.element = element;
		this.currentRoute = undefined;

		// Determine which click event to use (lifted from page.js)
		this.clickEvent = (typeof document !== 'undefined') && document.ontouchstart ? 'touchstart' : 'click';

		// Process the routes
		for (let path in routes) {
			let route = this.routes[path];
			route.prototype.path = path;
			let regexp = path;
			regexp = regexp.replace('/?', '/([^/]*)'); // Numerical parameters
			regexp = regexp.replace('/*', '(.*)'); // Catch-all parameter
			regexp = '^' + regexp + '$'; // Match the entire string
			route.regexp = new RegExp(regexp, 'i'); // Make the case-insensitive regular expression object
		}
	}

	// Route a given path and render to a string
	// Mainly used for server-side rendering
	renderString(url) {
		if (process.browser) {
			// Lol no stahp
			if (process.env.NODE_ENV !== "production") console.log('Do not use renderString on the client.');
		} else {
			var startTime = Date.now();
			var params = {};
			var matchedRoute;

			// Search for a route matching the given path
			for (let path in this.routes) {
				let route = this.routes[path];
				let result = url.match(route.regexp);
				if (result) {
					matchedRoute = route;
					params = result.slice(1, result.length);
					break;
				}
			}

			if (!matchedRoute) {

				// Oh no we couldn't find a route, do a 404
				// For a custom 404, create a "/*" handler
				if (process.env.NODE_ENV !== "production") console.log('No route found for url: ' + url);
				return [404, '404'];

			} else {

				// We found the route, render it
				// On the server there is no concept of mounting or having a previous route
				var handler = new (matchedRoute)();
				handler.params = params;
				var string = handler.renderString();
				if (process.env.NODE_ENV !== "production") console.log('Rendered ' + handler.path + ' in ' + (Date.now() - startTime) + 'ms');
				return string;

			}
		}
	}

	// Route a given path and mount the handler on the client
	// Do not use on the server
	render(url) {
		var startTime = Date.now();
		var params = {};
		var matchedRoute;
		// Search for a route matching the given path
		for (let r in this.routes) {
			let route = this.routes[r];
			let result = url.match(route.regexp);
			if (result) {
				matchedRoute = route;
				params = result.slice(1, result.length);
				break;
			}
		}

		if (!matchedRoute) {

			// Oh no we couldn't find a route, do a 404
			// For a custom 404, create a "/*" handler
			if (process.env.NODE_ENV !== "production") console.log('No route found for url: ' + url + ' in ' + (Date.now() - startTime) + 'ms');
			this.element.innerHTML = '404';
			return;

		} else if (typeof this.currentRoute !== 'undefined' && matchedRoute.prototype.path === this.currentRoute.path) {

			// We found the route, and it's the same as the current one
			// Update the params for the handler
			if (typeof this.currentRoute.setParams === 'function') {
				this.currentRoute.setParams(params);
			} else if (process.env.NODE_ENV !== "production") {
				let s = 'No setParams method found for route ' + this.currentRoute.path + '. This is necessary to update when the URL changes.';
				console.log(s);
				this.element.innerHTML = s;
			}

			if (process.env.NODE_ENV !== "production") console.log('Updated ' + this.currentRoute.path + ' in ' + (Date.now() - startTime) + 'ms');

		} else {

			// We found the route, and it's different from the current one
			// Unmount the current handler
			if (typeof this.currentRoute !== 'undefined' && typeof this.currentRoute.unmount === 'function') {
				this.currentRoute.unmount();
				if (process.env.NODE_ENV !== "production") console.log('Unmounted ' + this.currentRoute.path);
			}

			// Create the new handler
			let handler = new (matchedRoute)();
			handler.params = params;
			handler.element = this.element;
			this.currentRoute = handler;

			// Finally mount or render the handler
			if (typeof handler.mount === 'function') {
				handler.mount(this.element);
			} else if (typeof handler.renderString === 'function') {
				this.element.innerHTML = handler.renderString();
			} else if (process.env.NODE_ENV !== "production") {
				let s = 'No mount or renderString method present for route ' + this.currentRoute.path + '. This is necessary to display anything.';
				console.log(s);
				this.element.innerHTML = s;
			}

			if (process.env.NODE_ENV !== "production") console.log('Mounted ' + this.currentRoute.path + ' in ' + (Date.now() - startTime) + 'ms');
		}
	}

	// Event handler for back/forward buttons
	onpopstate(e) {
		e.preventDefault();
		this.render(location.pathname + location.hash);
	}

	// Helper functions for onclick
	isSameOrigin(href) {
		// Checks if a href is on the same origin as us, taken from page.js
		// https://github.com/visionmedia/page.js
		var origin = location.protocol + '//' + location.hostname;
		if (location.port) {
			origin += ':' + location.port;
		}
		return (href && (href.indexOf(origin) === 0));
	}
	which(e) {
		// Something to do which checking for a mouse event of some sort, not completely sure.
		// Lifted directly from page.js
		// https://github.com/visionmedia/page.js
		e = e || window.event;
		return (e.which === null ? e.button : e.which);
	}

	// Click handler for the entire document
	onclick(e) {
		// Some checks to make sure it's a link we want to hijack, mostly lifed from page.js
		// https://github.com/visionmedia/page.js

		// Not entirely sure what this checks but page.js had it so it's probably useful somewhere
		if (this.which(e) !== 1) {
			return;
		}

		// Check if we're holding a special key down, that changes the default
		// link behavior.
		if (e.metaKey || e.ctrlKey || e.shiftKey) {
			return;
		}

		// Check if some other event handler has already called preventDefault
		if (e.defaultPrevented) {
			return;
		}

		// Ensure we clicked on a link and not something else
		// Necessary because we're listening to clicks on the entire document
		var el = e.target;
		while (el && el.nodeName !== 'A') {
			el = el.parentNode;
		}
		if (!el || el.nodeName !== 'A') {
			return;
		}

		// Ignore if tag has
		// 1. "download" attribute
		// 2. rel="external" attribute
		if (el.hasAttribute('download') || el.getAttribute('rel') === 'external') {
			return;
		}

		// Get the URL we're going to for the remaining checks
		var link = el.getAttribute('href');

		// Check if the target is set, if so it's doing something different, usually
		// opening in a new tab.
		if (el.target) {
			return;
		}

		// Check the x-origin, if it's different we're going to another website
		// Also checks if the protocol changed, like going from http to https or mailto
		if (!this.isSameOrigin(el.href)) {
			return;
		}

		e.preventDefault();

		history.pushState(undefined, '', link);
		this.render(link);
	}

	// Start the router
	// Hijack link clicks and the back button
	start() {
		window.addEventListener('popstate', this.onpopstate.bind(this), false);
		window.addEventListener(this.clickEvent, this.onclick.bind(this), false);
		this.render(location.pathname + location.hash);
	}

	// Cleans up event listeners created by start
	stop() {
		window.removeEventListener('popstate', this.onpopstate, false);
		window.removeEventListener(this.clickEvent, this.onclick, false);
	}
}
module.exports = router;
