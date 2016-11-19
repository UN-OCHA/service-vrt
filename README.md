Simple Check
====================

**CSS regression testing**. A [CasperJS](http://github.com/n1k0/casperjs) module for automating visual regression testing with [PhantomJS 2](http://github.com/ariya/phantomjs/) or [SlimerJS](http://slimerjs.org/) and [Resemble.js](http://huddle.github.com/Resemble.js/).

PhantomCSS takes screenshots captured by CasperJS and compares them to baseline images using [Resemble.js](http://huddle.github.com/Resemble.js/) to test for rgb pixel differences. PhantomCSS then generates image diffs to help you find the cause.

The intention of this repository is to allow the ops team to quickly verify a series of URLs before / after infrastructure changes are made. Perhaps in the future it may be extended to a full visual regression testing suite.

# How

From the command line/terminal run:

* `casperjs test unocha.org/test-all.js`

The original demo is also available, you can run it from the command line:

* `casperjs test demo/testsuite.js --verbose --log-level=debug`

Installation instructions are available from: https://github.com/Huddle/PhantomCSS

# Credits

This project is a clone of the Huddle PhantomCSS project.
