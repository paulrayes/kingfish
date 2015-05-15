kingfish demo
=============

This demonstrates how to use kingfish to build a very simple application.

To see the demo, clone this repo, run the following, then point your browser to `http://localhost:8080`.

	cd demo
	npm install
	npm start

This will build the code using Browserify, minify it, and start a webserver.

Routes should be organized by module. In this example, we have the application,
and a blog module. The blog module has complete control over the DOM inside
the element it is given by the application, and should never touch any DOM outside
it. The only exception might be to create an element at the end of the body/head
to load styles, scripts, or display a modal.

Inside your mount and setParams methods you are free to use any libraries you
want to render your view, including jQuery, React, etc. I recommend using the
simplest/smallest one that will do what you need--don't include React for mainly
static content, for example. I generally use something big like React for highly
dynamic pages (account management, administration, ecommerce checkout, etc) and
load it asynchronously only when it's needed, and something simpler like Handlebars
for mostly static pages. Why? React is 129KB and Handlebars is 10KB. This
difference isn't huge compared to images you will likely have, but will have
an effect, particularly on mobile. Also, the React code will take longer to
parse--each kilobyte takes about 1ms to parse, React will delay you 129ms.

For best perceived performance renderString should be used to render as much
of the page as possible. Content that is the same for every use is easy; per-
user content is harder. If you cannot render some content on the server (or
decide it is too much work) then render a loading indicator; don't leave it blank.
