var gulp = require('gulp');
var connect = require('gulp-connect');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var mainBowerFiles = require('main-bower-files');
var filter = require('gulp-filter');
var app = './dist/';

gulp.task('vendors', function () {
    var mainFiles = mainBowerFiles();
    console.log(mainFiles);
    return gulp.src(mainBowerFiles())
        .pipe(filter('**/*.js'))
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest(app + 'scripts'));
});

gulp.task('scripts', function () {
    gulp.src('app/script/**/*.js')
        .pipe(concat('script.js'))
        .pipe(gulp.dest(app + 'scripts'))
        .pipe(connect.reload());
});

gulp.task('css', function () {
    gulp.src('app/css/**/*.css')
        .pipe(concat('style.css'))
        .pipe(gulp.dest(app + 'css'))
        .pipe(connect.reload());
});

gulp.task('html', function(){
   gulp.src('app/**/*.html')
       .pipe(gulp.dest(app))
       .pipe(connect.reload());
});

gulp.task('connect', function () {
    connect.server({
        livereload: true,
        root: app,
        port: 8000
    });
});

gulp.task('watch',function(){
    gulp.watch('app/**/*.css',['css']);
    gulp.watch('js/*.js',['scripts']);
    gulp.watch('**/*.html',['html']);
});

gulp.task('default', [
    'vendors',
    'watch',
    'css',
    'html',
    'connect'
]);