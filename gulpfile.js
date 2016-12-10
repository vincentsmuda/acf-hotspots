/*
 *
 *  Modules
 *
 */

var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    sourcemaps = require('gulp-sourcemaps'),
    babel = require('gulp-babel'),
    notify = require('gulp-notify'),
    concat = require('gulp-concat'),
    paths  = require('./resources/scripts/settings/paths.js');

/*
 *
 *  TASKS
 *
 */

gulp.task('scss', function() {

  return gulp.src([paths.scssSrc + '**/*.scss'])
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.cssDest))
    .pipe(notify('Processed SCSS'));

});

gulp.task('js', function() {

  return gulp.src([paths.jsSrc + '**/*.js', '!vendor/*.js'])
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat('acf-hotspots-render.js'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.jsDest))
    .pipe(notify('Processed JS'));

});

gulp.task('js_vendors', function() {

  return gulp.src(paths.jsVendors)
    .pipe(uglify())
    .pipe(gulp.dest(paths.jsDest + 'vendor/'))
    .pipe(notify('Processed JS Vendors'));

});

gulp.task('css_vendors', function() {

  return gulp.src(paths.cssVendors)
    .pipe(cleanCSS())
    .pipe(gulp.dest(paths.cssDest + 'vendor/'))
    .pipe(notify('Processed CSS Vendors'));

});

gulp.task('html', function() {});
gulp.task('images', function() {});

gulp.task('ftp', function() {
  return gulp.src('./public/**/*')
    .pipe(plumber())
    .pipe(ftp(ftp_settings))
    .pipe(notify('Uploaded file'));
});

gulp.task('watchers', function(){
  gulp.watch(paths.scssSrc + '**/*.scss', ['scss']);
  gulp.watch([paths.jsSrc + '**/*.js', '!vendor/*.js'], ['js']);
});

gulp.task('default', [
  'scss',
  'js',
  'js_vendors',
  'css_vendors',
  'html',
  'images',
  'watchers'
]);
