'use strict';

var settings = require('../project.json');
var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
// Typescript
var ts = require('gulp-typescript');
var tsd = require('gulp-tsd');
var merge = require('merge-stream');

// A typescript project used by gulp-typescript to support incremental compilation of scripts.
var tsProject = ts.createProject({
  declarationFiles: true,
  noExternalResolve: true,
  target: 'ES5',
  sortOutput: true
});

// Helper task to reinstall typings from the tsd.json file.
gulp.task('typings', function(callback) {
  tsd({
    command: 'reinstall',
    config: './tsd.json'
  }, callback);
});

gulp.task('build.typescript', function(callback) {
  var sourceStream = gulp.src( settings.sources.files.typescript );
  return merge(
      sourceStream,
      gulp.src( settings.sources.files.typings )
    )
    .pipe( sourcemaps.init() )
    .pipe( ts(tsProject) )
    .js
    .pipe( concat( settings.destinations.files.minjs ) )
    // .pipe( uglify() )
    .pipe( sourcemaps.write() )
    .pipe( gulp.dest( settings.destinations.folders.js ) )
    ;
});
