'use strict';

var gulp = require('gulp');
var rimraf = require('rimraf');
var concat = require('gulp-concat');
var concatCss = require('gulp-concat-css');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var inject = require('gulp-inject');

var paths = {
  html: 'frontend/src/index.html',
  templates: 'frontend/src/app/**/**/*.html',
  icon: 'frontend/src/favicon.ico',
  images: 'frontend/src/imgs/**/*.{png,jpg,jpeg,gif,webp,svg}',
  fonts: 'frontend/src/fonts/*.{otf,eot,svg,ttf,woff,woff2}',
  scripts: {
    app: [
      'frontend/src/*.js',
      'frontend/src/app/**/*.js'
    ],
    libs: [
      'frontend/src/libs/jquery.js',
      'frontend/src/libs/bootstrap.js',
      'frontend/src/libs/moment.js',
      'frontend/src/libs/angular.js',
      'frontend/src/libs/angular-ui-router.js',
      'frontend/src/libs/angular-sanitize.js',
      'frontend/src/libs/angular-animate.js',
      'frontend/src/libs/ngplus-overlay.js',
      'frontend/src/libs/toastr.js',
      'frontend/src/libs/lodash.js'
    ]
  },
  styles:  [
    'frontend/src/styles/*.css'
  ]
};

var dest = {
  root: 'frontend/build',
  images: 'frontend/build/img',
  scripts: 'frontend/build/js',
  styles: 'frontend/build/css',
  fonts: 'frontend/build/fonts'
};

gulp.task('clean', function (cb) {
  rimraf(dest.root, cb);
});

gulp.task('scriptsApp', function () {
  return gulp.src(paths.scripts.app)
    .pipe(concat('app.js'))
    //  .pipe(uglify())
    .pipe(gulp.dest(dest.scripts));
});

gulp.task('scriptsLibs', function () {
  return gulp.src(paths.scripts.libs)
    .pipe(uglify())
    .pipe(gulp.dest(dest.scripts));
});

gulp.task('icon', function () {
  return gulp.src(paths.icon)
    .pipe(gulp.dest(dest.root));
});

gulp.task('html', function () {
  return gulp.src(paths.html)
    .pipe(inject(gulp.src(paths.templates), {
      transform: function (filepath, file) {
        return '<script type="text/ng-template" id="' + file.relative.replace(/\\/g, '/') + '">' +
          file.contents.toString() + '</script>';
      }
    }))
    .pipe(inject(gulp.src(paths.scripts.libs), {
      transform: function (filepath, file) {
        return '<script src="js/' + file.relative + '"></script>';
      }
    }))
    .pipe(gulp.dest(dest.root));
});

gulp.task('styles', function () {
  return gulp.src(paths.styles)
    .pipe(concatCss('base.css'))
    .pipe(minifyCss())
    .pipe(gulp.dest(dest.styles));
});

gulp.task('images', function () {
  return gulp.src(paths.images)
    .pipe(gulp.dest(dest.images));
});

gulp.task('fonts', function () {
  return gulp.src(paths.fonts)
    .pipe(gulp.dest(dest.fonts));
});

gulp.task('watch', function () {
  gulp.watch(paths.html, ['html']);
  gulp.watch(paths.templates, ['html']);
  gulp.watch(paths.scripts.app, ['scriptsApp']);
  gulp.watch(paths.scripts.libs, ['scriptsLibs']);
  gulp.watch(paths.styles, ['styles']);
});

gulp.task('default', ['clean'], function () {
  gulp.start([
    'html',
    'icon',
    'scriptsApp',
    'scriptsLibs',
    'styles',
    'images',
    'fonts',
    'watch'
  ]);
});