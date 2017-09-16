var gulp = require('gulp');
var babelify = require('babelify');
var browserify = require('browserify');
var vinylSourceStream = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var eslint = require('gulp-eslint');
var watchify = require('watchify');
var ngannotate = require('browserify-ngannotate');
var plugins = require('gulp-load-plugins')({
    lazy: false
});
var replace = require('gulp-replace');
var notify = require('gulp-notify');
var merge = require('utils-merge');
var vinylBuffer = require('vinyl-buffer');

gulp.task('lint', function() {
    return gulp.src('./source/**/*.js')
        .pipe(eslint({
            configFile: 'eslint.json'
        }))
        .pipe(eslint.format())
    //.pipe(eslint.failAfterError());
});

gulp.task('html-dev', function() {
    var timestamp = new Date().getTime();
    return gulp.src('source/**/*.html')
        .pipe(replace('<TIMESTAMP>', timestamp))
        .pipe(replace('<BASE_URL>', '/output/'))
        .pipe(gulp.dest('output/'));
    //.pipe(plugins.connect.reload());
});

gulp.task('css-dev', function() {
    return gulp.src('./source/**/*.css')
    .pipe(gulp.dest('output/'));
    //.pipe(eslint.failAfterError());
});

/* Compile all script files into one put minified JS file. */
gulp.task('scripts-dev', ['lint'], function() {

    var args = merge(watchify.args, {
        debug: true
    });
    var sourceApp = './source/app.js';
    var sources = browserify(sourceApp, args)
        .plugin(watchify, {
            ignoreWatch: ['**/node_modules/**', '**/bower_components/**']
        })
        .transform(babelify.configure({
            presets: ["es2015"]
        }))
        .transform(ngannotate)
        .on('update', function() {
            bundle(sources);
        });

    return bundle(sources);
});


// Completes the final file outputs
function bundle(bundler) {
    return bundler.bundle()
        .on('error', function(err) {
            console.log(err);
        })
        .pipe(vinylSourceStream('main.min.js'))
        .pipe(vinylBuffer())
        .pipe(gulp.dest('./output/scripts/'))
        .pipe(notify({
            message: 'Generated file: <%= file.relative %>',
        }));
}

gulp.task('default', ['scripts-dev', 'html-dev', 'css-dev']);
