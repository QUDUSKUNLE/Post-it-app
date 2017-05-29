import gulp from 'gulp';
import browserify from 'browserify';
import reactify from 'reactify'; // Converts jsx to js
import source from 'vinyl-source-stream'; // Converts string to a stream

gulp.task('browserify', () => {
    browserify('./src/js/main.js')
        .transform('reactify')
        .bundle()
        .pipe(source('main.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('copy', () => {
    gulp.src('src/index.html')
        .pipe(gulp.dest('dist'));
    gulp.src('src/css/*.*')
        .pipe(gulp.dest('dist/css'));
    gulp.src('src/js/vendors/*.*')
        .pipe(gulp.dest('dist/js'));
});

gulp.task('default', ['browserify', 'copy'], () => {
    return gulp.watch('src/**/*.*', ['browserify', 'copy']);
});