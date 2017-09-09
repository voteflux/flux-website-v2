'use strict';
// imports
var gulp = require("gulp");
var refresh = require('gulp-refresh');
var sass = require("gulp-sass");
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var notify = require('gulp-notify');
var deploy = require('gulp-gh-pages');
var browserSync = require('browser-sync').create();


var autoprefixerOptions = {
  browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

gulp.task('serve', ['sass'], function() {
  gulp.watch('./_sass/*.scss', ['sass']);
  gulp.watch('**/*.html').on('change', browserSync.reload);
  gulp.watch("css/*.css").on('change', browserSync.reload);
  gulp.watch("js/*.js").on('change', browserSync.reload);
  // refresh.listen({basePath: './_site', start: true, port: 8000});
  browserSync.init({
    server: {
      baseDir: "./_site",
      port: 9000,
    }
  });
  gulp.watch('./_sass/*.scss', ['sass']);
});

gulp.task('sass', function() {
    return gulp.src('./_sass/*.scss')
        .pipe(sass())
        .on('error', notify.onError(function (error) {
           return 'An error occurred while compiling sass.\nLook in the console for details.\n' + error;
        }))
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(cleanCSS({debug: true}, function(details) {
            console.log("file size before" + details.name + ': ' + details.stats.originalSize);
            console.log("file size after" + details.name + ': ' + details.stats.minifiedSize);
        }))
        .pipe(gulp.dest("./css"))
        .pipe(gulp.dest("./react-signup/css"))
        .pipe(browserSync.stream());
});

gulp.task("default", ['serve']);
