var gulp = require('gulp');
var coffeescript = require('gulp-coffeescript');

gulp.task('coffee', function() {
    gulp.src('./**/*.coffee')
        .pipe(coffeescript({bare: true}).on('error', console.log))
        .pipe(gulp.dest('./'));
});

gulp.task('default', function() {
    gulp.watch('./**/*.coffee', ['coffee'])
});