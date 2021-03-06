

import gulp from 'gulp';
import connect from 'gulp-connect'; // Pokrece lokalni dev server
import open from 'gulp-open'; // Otvara URL u web browseru
import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import concat from 'gulp-concat';
import eslint from 'gulp-eslint';

const config = {
  port: 9000,
  devBaseUrl: 'http://localhost',
  paths: {
    html: './src/*.html',
    images: './src/images/*',
    dist: './dist',
    js: ['./src/**/*.js', './src/**/*.jsx'],
    mainJs: './src/main.jsx',
    css: [
      './src/css/style.css',
    ],
  },
};

// Pokrece lokalni dev server
gulp.task('connect', () => {
  connect.server({
    root: ['dist'],
    port: config.port,
    base: config.devBaseUrl,
    livereload: true,
  });
});

gulp.task('open', ['connect'], () => {
  gulp.src('dist/index.html').pipe(open({ uri: `${config.devBaseUrl}:${config.port}/` }));
});

gulp.task('watch', () => {
  gulp.watch(config.paths.html, ['html']);
  gulp.watch(config.paths.js, ['js']);
  gulp.watch(config.paths.css, ['css']);
});

gulp.task('html', () => {
  gulp.src(config.paths.html)
        .pipe(gulp.dest(config.paths.dist))
        .pipe(connect.reload());
});

gulp.task('css', () => {
  gulp.src(config.paths.css)
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest(`${config.paths.dist}/css`));
});

gulp.task('images', () => {
  gulp.src(config.paths.images)
    .pipe(gulp.dest(`${config.paths.dist}/images`));
});


gulp.task('js', () => {
  browserify(config.paths.mainJs, { extensions: ['.jsx'] })
        .transform(babelify, { presets: ['es2015', 'react', 'stage-0'] }).bundle()
        .on('error', console.error.bind(console))
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(`${config.paths.dist}/scripts`))
        .pipe(connect.reload());
});

gulp.task('lint', () => {
  gulp.src(config.paths.js)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('default', ['html', 'lint', 'images', 'css', 'js', 'open', 'watch']);
