// Include Gulp
var gulp = require('gulp');

// Include Plugins
var clean           = require('gulp-clean');
var concat          = require('gulp-concat');
var less            = require('gulp-less');
var lessAutoPrefix  = require('less-plugin-autoprefix');
var autoprefix      = new lessAutoPrefix({browsers: ['last 3 versions']});
var lesshint        = require('gulp-lesshint');
var notify          = require('gulp-notify');
var rename          = require('gulp-rename');
var uglify          = require('gulp-uglifycss');

// Log Errors
function logError(e){
  console.error.bind(e);
  this.emit('end');
}

// Lint Task
gulp.task('lint',function(){
  return gulp.src('./src/less/*.less')
    .pipe(lesshint())
    .pipe(lesshint.reporter())
    .on('error', logError)
    .pipe(lesshint.failOnError())
    .pipe(notify({message:'Linting task complete.'}));
});

// Less Task
gulp.task('less',function(){
  return gulp.src('./src/less/main.less')
    .pipe(less({
      strictMath: 'on',
      plugins: [autoprefix]
    }))
    .on('error', logError)
    .pipe(rename('flowgrid.css'))
    .pipe(gulp.dest('./dist/css'))
    .pipe(notify({message:'Less task complete.'}));
});

// Uglify Task
gulp.task('uglify',function(){
  return gulp.src('./dist/css/flowgrid.css')
    .pipe(uglify({
      "maxLineLen": 80,
      "uglyComments": true
    }))
    .on('error', logError)
    .pipe(rename('flowrid.min.css'))
    .pipe(gulp.dest('./dist/css'))
    .pipe(notify({message:'Uglify task complete'}));
});

// Clean Task
gulp.task('clean',function(){
  return gulp.src(['./dist/css/*.css'],{read:false})
    .pipe(clean());
});

// Watch files for changes
gulp.task('watch', function(){
  gulp.watch('./src/less/*.less', ['lint','less','uglify']);
});

// Default Task
gulp.task('default',['clean','lint','less','uglify']);
