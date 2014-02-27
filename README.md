# react-quickstart

A minimal React project template which combines:

  * [react-router-component][] to provide HTML5 History routing and navigation

  * [react-async][] to create "asynchronous" React components

  * [express][] to serve pre-rendered React components, assets and provide API

  * [browserify][] to provide module system for a browser

  * [npm][] to install and manage server-side and client-side dependencies

Every "page" in the application is **pre-rendered on server** so the user can
see the UI before the client code is shipped to a browser. After that
application starts functioning like a **single page application**, navigating
between "pages" without reloads.

## Project structure

Project structure is really minimal, you'd probably like to customize it for
your specific needs and taste:

    .
    ├── assets
    ├── client.js
    ├── package.json
    └── server.js

Directory `assets` is served under `/assets` URL, `client.js` module contains UI
code while `server.js` — HTTP server which serves pre-rendered React components,
assets and provide a stub for a REST API.

## Development workflow

After cloning a git repo, run:

    % npm install

to install all needed dependencies and then:

    % npm run start

to start a development server.

Now you can start edit the source code — on changes, server will be reloaded and
client code bundle will be rebuilt.

## Going "production"

To build an optimized bundle of client code run:

    % npm run build

which will produce `assets/bundle.js` build, then:

    % npm run start-prod

to start server in "production" mode (no source code watching and serving
optmized bundle to browser).

[react-router-component]: http://andreypopp.viewdocs.io/react-router-component
[react-async]: http://andreypopp.viewdocs.io/react-async
[express]: expressjs.com
[npm]: https://www.npmjs.org/
[browserify]: http://browserify.org/
