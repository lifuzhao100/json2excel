const gulp = require('gulp')
const parcel = require('gulp-parcel')
gulp.task('default', ['html', 'json', 'js'])
gulp.task('html', () => {
  gulp.src('src/pages/*.html',{ read: false })
      .pipe(parcel({
          outDir: 'dist/pages',
          publicURL: './'
      }, {source: './'}))
})
gulp.task('json', () => {
    gulp.src('src/**/*.json')
        .pipe(gulp.dest('dist'))
})
gulp.task('js', () => {
    gulp.src(['src/*.js'], { read: false})
        .pipe(parcel({
            outDir: 'dist',
            publicURL: './'
        }, {source: './'}))
})
gulp.task('watch', ['default'], () => {
    gulp.watch(['src/pages/**/*.html', 'src/pages/**/*.js'], ['html'])
    gulp.watch('src/**/*.json', ['json'])
    gulp.watch(['src/*.js'], ['js'])
})
