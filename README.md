[kingfish](http://www.rayes.io/kingfish/)
========

Router for byte-conscious isomorphic applications designed for use with Browserify.

After using several different routers I decided none of them were quite what I wanted. So, I wrote my own.
This router is loosly inspired by the Express router, react-router, and page.js.

Tested on Node.js 0.12.

[rayes.io/kingfish](http://www.rayes.io/kingfish/)

Get Started
-----------

Install with npm:

```sh
npm install --save kingfish
```

In Node.js or Browserify, load it with:

```js
var kingfish = require('kingfish');
```

Using kingfish in the browser is just two lines, plus your routes.

```js
var router = new kingfish(routes, document.getElementById('content'));
router.start();
```

On the server, you can handle a request with:

```js
var router = new kingfish(routes);
var content = router.renderString(url);
```

Creating a sub-router in the browser is similar:

```js
var childRouter = new kingfish(childRoutes, document.getElementById('childContent'));
childRouter.render(subUrl);
```

Finally creating a sub-router on the server:

```js
var childRouter = new kingfish(childRoutes);
var childContent = childRouter.renderString(subUrl);
```

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

Demo
----

See the `demo` folder for a complete demo using every feature.

Documentation
-------------

[Read the full documentation here](http://www.rayes.io/kingfish/).

Demo
----

See the `demo` folder for a complete demo using every feature.

License
-------

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
