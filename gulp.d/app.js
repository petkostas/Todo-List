'use strict';
var settings = require('../project.json');
var gulp = require('gulp');
var sass = require('gulp-sass');
var cssminify = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var merge = require('merge-stream');
var concat = require('gulp-concat');

gulp.task('build.app.images', function(){
  return gulp.src( settings.sources.files.siteimages )
    .pipe( gulp.dest( settings.destinations.folders.images ) )
    ;
});

// We Include also the scss for typescripts.
gulp.task('build.app.scss', function(){
  var sourceStream = gulp.src( settings.sources.files.scss );
  return merge(
    sourceStream,
    gulp.src( settings.sources.files.sitecss )
  )
    .pipe( sourcemaps.init() )
    .pipe( sass({errLogToConsole: true, precision: 8}) )
    .pipe( concat( settings.destinations.files.mincss ) )
    .pipe( cssminify() )
    .pipe( sourcemaps.write() )
    .pipe( gulp.dest( settings.destinations.folders.css ) )
    ;
});

gulp.task('build.app', [
  'build.app.images',
  'build.app.scss'
]);
