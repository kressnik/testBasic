'use strict';

const { Router } = require('express');
const requireDirAll = require('require-dir-all');

const app = new Router();
const routesFile = requireDirAll(__dirname, { // options
  recursive: true, // recursively go through subdirectories; default value shown
  indexAsParent: false, // add content of index.js/index.json files to parent object, not to parent.index
  includeFiles: /^.*\.(js)$/, // RegExp to select files; default value shown
});

useAll(routesFile);

async function useAll(routes) {
  try {
    const use = routes => { //use all routes
      // eslint-disable-next-line no-unused-vars
      for (const [key, route] of Object.entries(routes)) {
        if (typeof route === 'function') {
          app.use(route);
        } else {
          use(route);
        }
      } //for
    };

    use(routes);
  } catch (error) {
    console.error(error);
  }
}
module.exports = app;
