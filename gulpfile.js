const gulp = require('gulp')
const uglify = require('gulp-uglify')
const babel = require('gulp-babel')
const cleanCSS = require('gulp-clean-css')
const gutil = require('gulp-util')
const rev = require('gulp-rev')

const revCollector = require('gulp-rev-collector')

const runSequence = require('run-sequence')
const del = require('del')

/**
 * 压缩js
 */
gulp.task('task:js', () => {
  return gulp.src('./static/js/*.js')
    .pipe(babel())
    .pipe(uglify())
    .pipe(rev())
    .on('error', function (err) {
      gutil.log(gutil.colors.red('[Error]'), err.toString());
    })
    .pipe(gulp.dest('dist/static/js'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('dist/rev/js'))
})

/**
 * 压缩图片
 */
gulp.task('task:img', () => {
  return gulp.src('./static/img/*')
    .pipe(rev())
    .pipe(gulp.dest('dist/static/img'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('dist/rev/img'))
})

/**
 * 替换原css中的图片,输出到cache文件夹
 */

gulp.task('rev:css', () => {
  return gulp.src(['./dist/rev/img/*', './static/css/*.css'])
    .pipe(revCollector({
      replaceReved: true,
    }))
    .pipe(gulp.dest('dist/cache/css'))
})

/**
 * 压缩css
 */
gulp.task('task:css', () => {
  return gulp.src('dist/cache/css/*.css')
    .pipe(cleanCSS())
    .pipe(rev())
    .pipe(gulp.dest('dist/static/css'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('dist/rev/css'))
})



/**
 * 替换jade中的元素
 */
gulp.task('rev:jade', function () {
  return gulp.src(['./dist/rev/**/*.json', './views/*.jade'])
    .pipe(revCollector({
      replaceReved: true,//允许替换, 已经被替换过的文件
      dirReplacements: {
        'css': './css',
        'js': './js',
        'img': './js'
      }
    }))
    .pipe(gulp.dest('dist/html'))
})

/**
 * 删除rev文件夹
 */
gulp.task('clean:rev', function () {
  return del([
    'dist/rev',
    'dist/cache'
  ]);
})

/**
 * 执行打包任务
 */
gulp.task('build', function (callback) {
  runSequence('task:img',
    'rev:css',
    ['task:css', 'task:js'],
    'rev:jade',
    'clean:rev',
    callback)
});