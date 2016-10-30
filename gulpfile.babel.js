import gulp from 'gulp';
import config from './app/config';
import connect from 'gulp-connect';
import babel from 'gulp-babel';
import sass from 'gulp-sass';
import concat from 'gulp-concat';
import constant from 'gulp-ng-constant';
import addsrc from 'gulp-add-src';
import replace from 'gulp-replace';
import htmlreplace from 'gulp-html-replace';
import uglify from 'gulp-uglify';
import minifyCss from 'gulp-minify-css';
import ngAnnotate from 'gulp-ng-annotate';
import clean from 'gulp-clean';
import run from 'run-sequence';
import jshint from 'gulp-jshint';
import history from 'connect-history-api-fallback';

const ENV = process.env.NODE_ENV || 'development';
const PREFIX = new Date().getTime().toString();
const PATHS = {
  js: [
    'app/**/*.module.js',
    'app/**/**.js'
  ],
  templates: 'app/**/*.tpl.html',
  index: 'app/index.html',
  sass: 'app/assets/styles/app.scss',
  sassAll: 'app/**/*.scss',
  assets: 'app/assets/images/**/*',
  bower: 'bower_components/**/*',
  font_awesome_fonts: 'bower_components/components-font-awesome/fonts/*'
};

gulp.task('prepare', [
  'js',
  'sass',
  'copy:templates',
  'copy:assets',
  'copy:bower',
  'copy:fontawesome_fonts'
]);

gulp.task('run', cb => {
  run('clean', [
    'index',
    'prepare',
    'watch',
    'connect',
  ], cb);
});

gulp.task('built', cb => {
  run('clean', 'prepare', [
    'index:compressed',
    'compress:js',
    'compress:css'
  ], 'clean-deploy', cb);
});

gulp.task('js', () => {
  return constant({
      name: 'app.config',
      constants: config.constants[ENV],
      stream: true
    })
    .pipe(addsrc(PATHS.js))
    .pipe(jshint({ esnext: true }))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(babel())
    .on('error', function (err) {
      console.log(err.stack);
      this.emit('end');
    })
    .pipe(replace(/([^]+)/g, '(function(){$1})();'))
    .pipe(concat('app.js'))
    .pipe(gulp.dest('dist/'))
    .pipe(connect.reload());
});

gulp.task('sass', () => {
  return gulp.src(PATHS.sass)
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(gulp.dest('dist/'))
    .pipe(connect.reload());
});

gulp.task('connect', () => {
  connect.server({
    root: 'dist',
    livereload: true,
    middleware: () => [ history() ]
  });
});

gulp.task('index', () => {
  return gulp.src(PATHS.index)
    .pipe(htmlreplace({
      css: config.libs.styles.concat('app.css'),
      js: config.libs.scripts.concat('app.js')
    }))
    .pipe(gulp.dest('dist/'))
    .pipe(connect.reload());
});

gulp.task('index:compressed', () => {
  return gulp.src(PATHS.index)
    .pipe(htmlreplace({
      css: `app-${PREFIX}.min.css`,
      js: `app-${PREFIX}.min.js`
    }))
    .pipe(gulp.dest('dist/'))
    .pipe(connect.reload());
});

gulp.task('copy:fontawesome_fonts', ()=>{
  return gulp.src(PATHS.font_awesome_fonts)
      .pipe(gulp.dest('dist/fonts'))
      .pipe(connect.reload());
});

gulp.task('copy:assets', () => {
  return gulp.src(PATHS.assets)
    .pipe(gulp.dest('dist/assets'))
    .pipe(connect.reload());
});

gulp.task('copy:templates', () => {
  return gulp.src(PATHS.templates)
    .pipe(gulp.dest('dist/'))
    .pipe(connect.reload());
});

gulp.task('copy:bower', () => {
  return gulp.src(PATHS.bower)
    .pipe(gulp.dest('dist/'));
});

gulp.task('watch', () => {
  gulp.watch(PATHS.js, ['js']);
  gulp.watch(PATHS.sassAll, ['sass']);
  gulp.watch(PATHS.templates, ['copy:templates']);
  gulp.watch(PATHS.index, ['index:development']);
  gulp.watch(PATHS.assets, ['copy:assets']);
});

gulp.task('clean', () => {
  return gulp.src('dist/')
    .pipe(clean({ force: true }));
});

gulp.task('lint', () => {
  return gulp.src(PATHS.js)
    .pipe(jshint({ esnext: true }))
    .pipe(jshint.reporter('default'));
});

gulp.task('compress:js', () => {
  return gulp.src(config.libs.scripts.concat('/app.js').map(i => `./dist/${i}`))
    .pipe(ngAnnotate())
    .pipe(concat(`app-${PREFIX}.min.js`))
    .pipe(uglify())
    .pipe(gulp.dest('dist/'));
});

gulp.task('compress:css', () => {
  return gulp.src(config.libs.styles.concat('/app.css').map(i => `./dist/${i}`))
    .pipe(concat(`app-${PREFIX}.min.css`))
    .pipe(minifyCss())
    .pipe(gulp.dest('dist/'));
});

gulp.task('clean-deploy', () => {
  return gulp.src(['dist/app.js', 'dist/app.css'])
    .pipe(clean({ force: true }));
});