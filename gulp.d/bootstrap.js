'use strict';

var settings = require('../project.json');
var gulp = require('gulp');
var del = require('del');

// Build related.
require('./vendors');
require('./angular');
require('./typescript');
require('./app');
require('./watch');

gulp.task('clean.app', function(){
    console.log('Cleaning application');
    del(settings.destinations.folders.assets);
});

gulp.task('build', [
      'build.vendors',
      'build.typescript',
      'build.app',
      'build.angular.templates',
]);

gulp.task('clean', [
    'clean.app'
]);

gulp.task('dev', [
    'clean',
    'build',
    'watch'
]);
