'use strict';
var settings = require('../project.json');
var vendors = require('./vendors.json');
var collection = [];

// Requirements
var _ = require('lodash');
var gulp = require('gulp');
var concat = require('gulp-concat');
var del = require('del');
var cssminify = require('gulp-minify-css');

function loopVendors(lookup) {
  var return_items = [];
  _.forEach(vendors, function(n, key){
    if( vendors[key][lookup] ) {
      return_items.push(vendors[key][lookup]);
    }
  });
  return _.flatten(return_items);
}

function getVendorJS() {
  console.log('Collecting Vendor JS');
  collection['js'] = loopVendors("js");
}

function getVendorImages() {
  console.log('Collecting Vendor images');
  collection['images'] = loopVendors("images");
}

function getVendorFonts() {
  console.log('Collecting Vendor fonts');
  collection['fonts'] = loopVendors("fonts");
}

function getVendorCss() {
  console.log('Collecting Vendor CSS');
  collection['css'] = loopVendors("css");
}

function collectAssets() {
  getVendorJS();
  getVendorImages();
  getVendorFonts();
  getVendorCss();
}

gulp.task('collect.vendor.assets', function() {
  collectAssets();
});

gulp.task('build.vendor.js', function(){
  return gulp.src( collection["js"] )
    .pipe( concat( settings.destinations.files.vendorjs ) )
    .pipe( gulp.dest( settings.destinations.folders.js ) );
});

gulp.task('build.vendor.css', function(){
  return gulp.src( collection["css"] )
    .pipe( concat( settings.destinations.files.vendorcss ) )
    .pipe( cssminify() )
    .pipe( gulp.dest( settings.destinations.folders.css ) );
});

gulp.task('build.vendor.fonts', function(){
  return gulp.src( collection["fonts"] )
    .pipe( gulp.dest( settings.destinations.folders.fonts ) );
});

gulp.task('build.vendor.images', function(){
  return gulp.src( collection["images"] )
    .pipe( gulp.dest( settings.destinations.folders.images ) );
});

gulp.task('build.vendors', [
  'collect.vendor.assets',
  'build.vendor.js',
  'build.vendor.css',
  'build.vendor.fonts',
  'build.vendor.images'
]);

gulp.task('clean.vendors', function(){
  console.log("Cleaning build asset directory");
  del(settings.destinations.folders.assets, {force: true});
});
