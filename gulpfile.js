var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var livereload = require('gulp-livereload');

function prettyLog (label, text) {
  gutil.log( gutil.colors.bold("  " + label + " | ") + text );
}

function errorReporter (err){
  gutil.log( gutil.colors.red("Error: ") + gutil.colors.yellow(err.plugin) );
  if (err.message)    { prettyLog("message", err.message); }
  if (err.fileName)   { prettyLog("file", err.fileName); }
  if (err.lineNumber) { prettyLog("line", err.lineNumber); }
  return this.emit('end');
};

gulp.task('scss', function() {
  gulp.src('scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'development'
    }).on('error', errorReporter))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./css'))
});

gulp.task('css', ['scss'], function () {
  livereload.listen();
  gulp.watch(['scss/**/*.scss'], ['scss']);
  gulp.watch('css/**/*').on('change', livereload.changed).on('error', errorReporter);
});

gulp.task('default', ['scss'], function() {
  livereload.listen();
  gulp.watch(['scss/**/*.scss'], ['scss']);
  gulp.watch('css/**/*').on('change', livereload.changed).on('error', errorReporter);
});
