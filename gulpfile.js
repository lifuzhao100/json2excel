const gulp = require('gulp')
const parcel = require('gulp-parcel')
gulp.task('default', ['json', 'js'])
gulp.task('json', () => {
    gulp.src('src/**/*.json')
        .pipe(gulp.dest('dist'))
})
gulp.task('js', () => {
    gulp.src(['src/*.js'], {read: false})
        .pipe(parcel({
            outDir: 'dist',
            publicURL: './'
        }, {source: 'src'}))
        .pipe(gulp.dest('dist'))
})
gulp.task('watch', ['default'], () => {
    gulp.watch(['src/**/*.html', 'src/pages/**/*.js'], ['html'])
    gulp.watch('src/**/*.json', ['json'])
    gulp.watch(['src/**/*.js', '!src/pages/**/*.js'], ['js'])
})