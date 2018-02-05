const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

const compileFile = ['./src/server/**/*.js'];
const isDev = process.env.NODE_ENV === 'development';

gulp.task('lint', () => {
  return gulp.src(compileFile)
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.eslint.failAfterError());
});

gulp.task('compile', ['lint'], () => {
  gulp.src(compileFile)
    .pipe($.babel({
      presets: ['env'],
      plugins: ['transform-runtime']
    }))
    .pipe(gulp.dest('./bin/server'))
});

if (isDev) {
  gulp.task('server', ['compile'], () => {
    let stream = $.nodemon({
      script: 'bin/server/app.js',
      watch: ["bin/server"],
      delay: 1000
    });

    return stream
  })

  gulp.task('default', ['server']);

  const watcher = gulp.watch(compileFile, ['compile']);

  watcher.on('change', e => {
    console.log('File ' + e.path + ' was ' + e.type + ', running tasks...');
  })
} else {
  gulp.task('default', ['compile']);
}
