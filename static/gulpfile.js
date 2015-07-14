var sourcemaps  = require('gulp-sourcemaps'),
    livereload  = require('gulp-livereload'),
    sass        = require('gulp-ruby-sass'),
    runsequence = require('run-sequence');
    uglify      = require('gulp-uglify'),
    coffee      = require('gulp-coffee'),
    concat      = require('gulp-concat'),
    notify      = require('gulp-notify'),
    gutil       = require('gulp-util'), 
    gulp        = require('gulp');

var paths = {
    globalLibs : [
      './vendor/leaflet/dist/leaflet.js',
      './vendor/leaflet-gpx/gpx.js',
      './vendor/modernizr/modernizr.js',
      './js/init.js'
    ]
}

/* Global libs */

gulp.task('global-libs', function() {
  return gulp.src(paths.globalLibs)
    .on('error', notify.onError("JavaScript compilation error"))
    .on('error', gutil.log)
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(concat("scripts.js"))
    .pipe(gulp.dest('./js/'))
    .pipe(livereload());
});

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

gulp.task('default',['watch','global-libs']);