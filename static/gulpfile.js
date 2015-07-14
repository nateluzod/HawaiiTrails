var sourcemaps  = require('gulp-sourcemaps'),
    livereload  = require('gulp-livereload'),
    sass        = require('gulp-ruby-sass'),
    runsequence = require('run-sequence');
    uglify      = require('gulp-uglify'),
    coffee      = require('gulp-coffee'),
    notify      = require('gulp-notify'),
    gutil       = require('gulp-util'), 
    gulp        = require('gulp');

/* Sass */

gulp.task('sass', function(){
  return sass('./css/sass/style.scss', {
    style:      'compressed',
    quiet:      false,
    noCache:    true
  })
  .pipe(sourcemaps.init())
  .on('error',  notify.onError("SASS compilation error"))
  .on('error',  gutil.log)
  .pipe(livereload())
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('./css/') 
  );
});    

/* Watch */

gulp.task('watch', function(){
  gulp.watch('./css/sass/**/*.scss', function(){
    gulp.run('sass');
  })
});

/* Default task */

gulp.task('default',['watch']);