---
layout: default
title: Start
permalink: /
anchor: start
---

Install with npm:

```sh
npm install --save kingfish
```

In Node.js or Browserify, load it with:

```js
var Kingfish = require('kingfish');
```

Using kingfish in the browser is just two lines, plus your routes.

```js
var router = new Kingfish(routes, document.getElementById('content'));
router.start();
```

On the server, you can handle a request with:

```js
var router = new Kingfish(routes);
var content = router.renderString(url);
```

Creating a sub-router in the browser is similar:

```js
var childRouter = new Kingfish(childRoutes, document.getElementById('childContent'));
childRouter.render(subUrl);
```

Finally, creating a sub-router on the server is identical to a regular server router.

Routes are just objects, in ES6 these are very easy to create with the `class` keyword. A basic route with both a server and browser render method might look like:

```js
var routes = {
	'/post/?': class {
		renderString() {
			return 'This is the post with ID ' + this.params[0];
		}
		mount() {
			this.element.innerHTML = this.renderString();
		}
	}
}
```

Inside your route handlers you can use any libraries you choose, including Handlebars, React, Backbone, or even another router.
