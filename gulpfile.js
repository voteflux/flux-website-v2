'use strict';

var gulp = require("gulp");
var browserSync = require("browser-sync");
var sass = require("gulp-sass");
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');

var autoprefixerOptions = {
  browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};


gulp.task('serve', ['sass'], function() {
  browserSync.init(null, {
    server: {
      baseDir: './_site'
    },
    port: 9000,
    notify: false
  });
});

gulp.watch("./_sass/*.scss", ['sass']);
gulp.watch("**/*.html").on('change', browserSync.reload);
gulp.watch("**/*.css").on('change', browserSync.reload);
gulp.watch("**/*.js").on('change', browserSync.reload);


gulp.task('sass', function() {
    return gulp.src("./_sass/*.scss")
        .pipe(sass())
        .pipe(autoprefixer(autoprefixerOptions))
         .pipe(cleanCSS({debug: true}, function(details) {
            console.log(details.name + ': ' + details.stats.originalSize);
            console.log(details.name + ': ' + details.stats.minifiedSize);
        }))
        .pipe(gulp.dest("./css"))
        .pipe(browserSync.stream());
});


gulp.task("default", ['serve']);


















// gulp.task('browser-sync', function(){
//     browserSync.init(null, {
//         server: {
//         baseDir: './_site'
//     },
//         port: 9000,
//         notify: false
//     })
// })

// gulp.task('html',function(){
//     return browserSync.reload();
// });

// gulp.task('css',function(){
//     return browserSync.reload({stream:true});
// });

// gulp.task('js',function(){
//     return browserSync.reload();
// });

// gulp.task('sass', function() {
//   return gulp.src("./_sass/*.scss")
//     .pipe(sass().on('error, sass.logError'))
//     .pipe(gulp.dest('../css'));
// });

// gulp.task("default", ['browser-sync'], function(){
//     gulp.watch("**/*.html", ['html']);
//     gulp.watch("**/*.css", ['css']);
//     gulp.watch("**/*.js", ['js']);
// });
