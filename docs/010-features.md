---
layout: default
title: Features
permalink: /
anchor: features
---

kingfish has the following featureset:

- **Isomorphic**: The route definitions and handlers should be identical on the client and server. Server-specific code can easily be removed with browserify transformations. This makes it easier to maintain your application.
- **Small size**: Minified this is 5kB, gzipped it is smaller, although I expect it to grow a little bit more. This makes it load quickly and leaves more space for your application code.
- **Small API**: The route handler API has only four methods, and the router itself has only two (one for client and one for server). This makes it easy to learn and use.
- **Sub-routers**: These are inspired by express.Router to allow for modularity in routes, and to allow you to plug another routing system into a piece of your application.
- **Partial page changes**: A rendered page should not be completely thrown away when the URL changes. If only the URL parameters change, you should be able to update to reflect that. If part of the URL changes but the first part stays the same, only part of the page should be thrown away; this is easy with sub-routers.
- **Helpful errors**: The router should catch most things you might do wrong and explain exactly how to fix it. React does this, and I believe every library should.

Planned features:

- **Asynchronous**: Rendering should be asynchronous on the server to allow you to load data. I plan to implement this by allowing the `renderString` handler method to return a promise, this should be enough to handle most use cases.
- **URL prefix**: Run in a sub-directory, so the entire website can be in a sub-directory or so this router can be used inside another application.
- **Tests**: yup
- **Events**: The router should emit an event when the route changes, so you can update other parts of your application.
