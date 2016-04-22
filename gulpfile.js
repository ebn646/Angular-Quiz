var gulp = require('gulp');
var sass = require('gulp-sass');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var nodemon = require('gulp-nodemon');

gulp.task('sass', function(){
    var s = $.size();

    return gulp.src('./scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.reload({
            stream: true
        }))
        .pipe(s)
        .pipe($.notify({
            onLast: true,
            message: function() {
                return 'Total CSS size ' + s.prettySize;
            }
        }));
});

gulp.task('browser-sync', ['nodemon'], function() {
    browserSync.init(null, {
        proxy: "http://localhost:3000",
        files: ["./**/*.*"],
        browser: "google chrome",
        port: 7000,
        baseDir: './'
    });
});

gulp.task('watch', ['browser-sync'], function (){
    gulp.watch('./scss/**/*.scss', ['sass']);
    gulp.watch('./views/*.html', browserSync.reload);
    gulp.watch('./js/**/*.js', browserSync.reload);
});

gulp.task('useref', function(){
    return gulp.src('./*.html')
        .pipe(useref())
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest('_build'))
});

gulp.task('nodemon', function (cb) {

    var started = false;

    return nodemon({
        script: 'server.js'
    }).on('start', function () {
        // to avoid nodemon being started multiple times
        // thanks @matthisk
        if (!started) {
            cb();
            started = true;
        }
    });
});

gulp.task('default', ['browser-sync','watch'], function () {
});

