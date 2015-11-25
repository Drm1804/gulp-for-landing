var gulp = require('gulp');
var connect = require('gulp-connect');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var mainBowerFiles = require('main-bower-files');
var filter = require('gulp-filter');
var dist = './dist/';

gulp.task('vendors', function () {
    var mainFiles = mainBowerFiles();
    console.log(mainFiles);
    return gulp.src(mainBowerFiles())
        .pipe(filter('**/*.js'))
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest(dist + 'scripts'));
});

gulp.task('scripts', function () {
    gulp.src('app/script/**/*')
        .pipe(concat('script.js'))
        .pipe(gulp.dest(dist + 'scripts'))
        .pipe(connect.reload());
});

gulp.task('css', function () {
    gulp.src('app/css/**/*.css')
        .pipe(concat('style.css'))
        .pipe(gulp.dest(dist + 'css'))
        .pipe(connect.reload());
});

gulp.task('html', function(){
    gulp.src('app/**/*.html')
        .pipe(gulp.dest(dist))
        .pipe(connect.reload());
});

gulp.task('fonts', function(){
    gulp.src('app/fonts/**/*')
        .pipe(gulp.dest(dist + 'fonts'))
        .pipe(connect.reload());
});

gulp.task('img', function(){
    gulp.src('app/img/**/*')
        .pipe(gulp.dest(dist + 'img'))
        .pipe(connect.reload());
});

gulp.task('connect', function () {
    connect.server({
        livereload: true,
        root: dist,
        port: 8000
    });
});

gulp.task('watch',function(){
    gulp.watch('app/**/*.css',['css']);
    gulp.watch('app/**/*.js',['scripts']);
    gulp.watch('app/**/*.html',['html']);
});

gulp.task('default', [
    'vendors',
    'watch',
    'css',
    'scripts',
    'fonts',
    'img',
    'html',
    'connect'
]);