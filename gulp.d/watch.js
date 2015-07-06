'use strict';

var settings = require('../project.json');
var gulp = require('gulp');
var watch = require('gulp-watch');

gulp.task('watch.typescript', function() {
    watch( settings.watchers.typescript, { verbose: true }, function(files, cb) {
        console.log('Building Typescript');
        gulp.start('build.typescript');
    });
});

gulp.task('watch.angular.templates', function() {
    watch( settings.watchers.angulartemplates, { verbose: true }, function(files, cb){
        console.log('Building Angular templates');
        gulp.start('build.angular.templates');
    });
});

gulp.task('watch.scss', function() {
    watch( settings.watchers.scss, { verbose: true }, function(files, cb){
        console.log('Building SCSS');
        gulp.start('build.app.scss');
    });
});

gulp.task('watch', [
    'watch.typescript',
    'watch.angular.templates',
    'watch.scss'
]);
