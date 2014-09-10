var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
 
gulp.task('default', function() {
    return browserify('./exampleTest.js')
        .bundle()
        //Pass desired output filename to vinyl-source-stream
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./build/'));
});