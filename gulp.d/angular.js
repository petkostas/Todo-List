'use strict';
var settings = require('../project.json');
var gulp = require('gulp');
var templatecache = require('gulp-angular-templatecache');


gulp.task('build.angular.templates', function () {
  return gulp
    .src( settings.sources.files.angulartemplates )
    .pipe( templatecache( settings.destinations.files.templatecache, {standalone:true, module: 'app.templates'}) )
    .pipe( gulp.dest( settings.destinations.folders.js ) );
});
