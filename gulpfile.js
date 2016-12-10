/*
 *
 *  Modules
 *
 */

var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    ftp = require('gulp-ftp'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    sourcemaps = require('gulp-sourcemaps'),
    babel = require('gulp-babel'),
    notify = require('gulp-notify'),
    concat = require('gulp-concat'),
    ftp_settings = require('./resources/scripts/settings/ftp.js')
    paths  = require('./resources/scripts/settings/paths.js');

/*
 *
 *  FUNCTIONS
 *
 */

function uploadToFtp(event) {
  var ftp_path = ftp_settings.remotePath,
      temp_path = event.path.split('/public')[1].split('/');
  temp_path.pop();
  ftp_path += temp_path.join('/')+'/';
  console.log(event);
  gulp.src(event.path)
    .pipe(ftp({
      host: ftp_settings.host,
      user: ftp_settings.user,
      pass: ftp_settings.pass,
      remotePath: ftp_path
    }))
    .pipe(notify('Uploaded file'));
}

/*
 *
 *  TASKS
 *
 */

gulp.task('scss', function() {

  return gulp.src([paths.scssSrc + '**/*.scss'])
    //.pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    //.pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.cssDest))
    .pipe(notify('Processed SCSS'));

});

gulp.task('js', function() {

  return gulp.src([paths.jsSrc + '**/*.js', '!vendor/*.js'])
    //.pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat('all.js'))
    //.pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.jsDest))
    .pipe(notify('Processed JS'));

});

gulp.task('js_vendors', function() {

  return gulp.src(paths.jsVendors)
    //.pipe(sourcemaps.init())
    // .pipe(babel())
    .pipe(uglify())
    //.pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.jsDest + 'vendor/'))
    .pipe(notify('Processed JS Vendors'));

});

gulp.task('css_vendors', function() {

  return gulp.src(paths.cssVendors)
    //.pipe(sourcemaps.init())
    .pipe(cleanCSS())
    //.pipe(sourcemaps.write('./'))
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
  gulp.watch([
    paths.dest+'**/*.php',
    paths.dest+'**/*.css',
    paths.dest+'**/*.js'
  ]).on('change', function () {
    browserSync.reload();
  });
  gulp.watch(['./public/**/*'])
    .on('add', uploadToFtp)
    .on('change', uploadToFtp);
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