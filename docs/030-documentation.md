---
layout: default
title: Docs
permalink: /
anchor: documentation
---

## API

When you `require('kingfish')` you will get back a constructor for the Kingfish object. Create the object with the following two parameters:

- Routes definition object as defined below
- DOM element to render into (browser only)

On the server, the resulting object instance will have just one method:

- `renderString(url)`
    - Routes the given URL, calls the `renderString` method of the route handler, and returns the resulting content
    - Environment: server only

On the browser, it will have three:

- `start()`
    - Starts the client-side router. Hijacks link clicks, listens to URL changes, and listens to the back/forward buttons.
    - Environment: browser only
- `stop()`
    - Stops the client-side router and removes all event listeners.
    - Environment: browser only
- `render(url)`
    - Routes the given URL and calls either the `mount` or `setParams` method of the route handler. If you called `start`, this will never be necessary--it will call this method automatically when needed.
    - Environment: browser only

An important part of modular applications is the ability to define sub-routes. With kingfish, this is done by creating a sub-router.

On the server, there is no difference between a regular router and a sub-router.

In the browser, create the sub-router the same way, but use the `render` method instead of calling `start`. You will need to call it every time the URL changes.

See the demo application for an example of how to use all the above methods, located in the "demo" folder of the GitHub repository.

## Routes definition

The routes definition is an object with keys equal to the route patterns to match. These patterns support two special character sequences for extracting parameters:

- `/?` matches anything except for `/`
- `/*` matches anything including `/`, generally this would be placed at the end of a pattern when you have another router inside the handler

The values in the routes definition are objects (I recommend using ES6 classes for readability) with the following properties and methods:

- `element`: The DOM element to render into. This is the same element passed into the router constructor.
- `params`: Array of matched URL parameters. This is set automatically before `mount()` is called the first time, but is never automatically changed after that.
- `renderString()`: Should return a string representing the entire content, used primarily for server-side rendering.
- `mount()`: Called when first entering a route, you are responsible for rendering your content into `this.element`. Browser-only.
- `setParams(newParams)`: Called when the URL parameters change, but the route stays the same, with an array of params. Browser-only.
- `unmount()`: Called when leaving a route, here you should clean up any event handlers or data bindings you created to prevent bugs and memory leaks. Browser-only.

For server-side rendering, `renderString` is the only method you need. For client-side rendering, you need either `renderString` or `mount`; if both are present, `mount` will be used. If you have URL parameters you should implement `setParams` as well, and you will get a warning if it does not exist when the parameters change.
