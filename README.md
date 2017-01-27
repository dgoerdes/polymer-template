# Polymer-Template with Pug, Babel and SCSS

## Prerequesites
* Install yarn - https://yarnpkg.com/en/docs/getting-started


## Setup
Run `yarn` in the root directory to install all dependencies.


## Dev
Run `npm start` to build and watch all files and start a dev server.


## Installing further dependencies
As Polymer somehow uses bower for all dependencies and some are not correctly available on npm
the best way would be to install all polymer dependencies with `bower install`.

Use `yarn add` for all other dependencies available on npm.


## Build
The general build of the app done by the default gulp task, like it is done on watch mode.
The polymer-cli is then used to optimize and bundle the app.

To get a ready to use build just execute `npm run build`.
To test the bundled app execute `npm run serveBundle`.
