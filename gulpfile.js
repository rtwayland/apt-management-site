var gulp = require('gulp'),
    del = require('del'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    CacheBuster = require('gulp-cachebust'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    print = require('gulp-print'),
    babel = require('gulp-babel');

var cachebust = new CacheBuster();

gulp.task('build-css', function() {
    return gulp.src('./public/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(cachebust.resources())
        .pipe(concat('main.css'))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./dist'));
});


gulp.task('build-js', function() {
    return gulp.src('public/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(print())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('bundle.js'))
        //.pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/js'));
});

gulp.task('build', ['build-css', 'build-js'], function() {
    return gulp.src('./public/**/*.html')
        .pipe(cachebust.references())
        .pipe(gulp.dest('./dist'));
});

gulp.task('watch', function() {
    return gulp.watch(['./public/**/*.html', './public/**/*.*css', './public/**/_*.*css', './public/js/**/*.js'], ['build']);
});

gulp.task('default', ['watch', 'build']);
