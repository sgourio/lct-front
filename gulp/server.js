'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var browserSync = require('browser-sync');

var util = require('util');

var middleware = require('./proxy');

module.exports = function(options) {

  function browserSyncInit(baseDir, browser) {
    browser = browser === undefined ? 'default' : browser;

    var routes = null;
    if(baseDir === options.src || (util.isArray(baseDir) && baseDir.indexOf(options.src) !== -1)) {
      routes = {
        '/bower_components': 'bower_components',
        '/account/picture': '/home/sgourio/workspace/scrabble/images'
      };
    }

    //var server = {
    //  baseDir: baseDir,
    //  routes: routes
    //};
    //
    //gutil.log('Proxy ' + middleware().length);
    //if(middleware().length > 0) {
    //  server.middleware = middleware();
    //}

    browserSync.create().init({
      startPath: '/',
      server: {
        baseDir: baseDir,
        routes: routes,
        middleware: middleware()
      },
      browser: "google chrome",
      online: false,
      open: false
    });

    //browserSync.create().init({
    //  port:4000,
    //  online: false,
    //  open: false,
    //  proxy: {
    //    target: 'http://localhost:8080/',
    //    ws: true,
    //    middleware: function (req, res, next) {
    //      console.log(req.url);
    //      next();
    //    }
    //  },
    //  socket: {
    //    port: 4001
    //  },
    //  ui: {
    //    port: 3005
    //  },
    //  browser: browser
    //});
  }

  //browserSync.use(browserSyncSpa({
  //  selector: '[ng-app]'// Only needed for angular apps
  //}));

  gulp.task('serve', ['watch'], function () {
    browserSyncInit([options.tmp + '/serve', '/home/sgourio/workspace/scrabble/images', options.src]);
  });

  gulp.task('serve:dist', ['build'], function () {
    browserSyncInit(options.dist);
  });

  gulp.task('serve:e2e', ['inject'], function () {
    browserSyncInit([options.tmp + '/serve', options.src], []);
  });

  gulp.task('serve:e2e-dist', ['build'], function () {
    browserSyncInit(options.dist, []);
  });
};
