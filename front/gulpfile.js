const gulp = require('gulp');

const autoprefixer = require('gulp-autoprefixer');
const babelify = require('babelify');
const browser = require('browser-sync').create();
const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const cleanCSS = require('gulp-clean-css');
const concat = require("gulp-concat");
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const through = require('through2');
const uglify = require('gulp-uglify');

const browserified = through.obj(function (file, encode, callback) {
  browserify(file.path)
    .transform(babelify, {presets: ['es2015', 'stage-2']})
    .bundle(function (err, res) {
      if (err) {
        return callback(err)
      }
      file.contents = res;
      callback(null, file)
    })
    .on("error", function (err) {
      console.log("Error : " + err.message);
    });
});


/********************
 * Tasks
 ********************/


gulp.task('server', function () {
  browser.init({
    server: {
      baseDir: './dist',
      index: 'index.html'
    },
    port: 2000
  });
});

gulp.task('html', function () {
  gulp.src('src/**/*.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('sass', function () {
  gulp.src('src/assets/css/**/!(_)*.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(browser.stream());
});

gulp.task('img-copy', function () {
  gulp.src('src/assets/images/**/*')
    .pipe(gulp.dest('dist/assets/images'));
});

gulp.task('es6', function () {
  gulp.src(['!src/assets/js/vendor/*', 'src/assets/js/**/!(_)*.js'])
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(browserified)
    .pipe(buffer())
    .pipe(uglify())
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('dist/assets/js'))
});

gulp.task('js-vendor-bundle', function () {
  gulp.src([
    'src/assets/js/vendor/jquery.3.2.1.min.js'
  ])
    .pipe(plumber())
    .pipe(concat('vendor.pack.js'))
    .pipe(gulp.dest('dist/assets/js'))
});

gulp.task('bs-reload', function() {
  browser.reload();
});


/********************
 * Entry point.
 ********************/


gulp.task('default', ['server'], function () {
  gulp.watch('src/**/*.html', ['html']);
  gulp.watch('src/assets/css/**/*.scss', ['sass']);
  gulp.watch(['src/assets/js/**/*.js', '!src/assets/js/vendor/*'], ['es6']);
  gulp.watch('src/assets/js/vendor/**/*.js', ['js-vendor-bundle']);
  gulp.watch('dist/assets/js/**/*.js', ['bs-reload']);
  gulp.watch('src/assets/images/**/*', ['img-copy']);
});

gulp.task('compile', ['html', 'sass', 'es6', 'js-vendor-bundle', 'img-copy']);
