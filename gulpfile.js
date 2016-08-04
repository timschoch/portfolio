/*global -$ */
'use strict';
// generated on 2016-07-15 using generator-modern-frontend 0.2.9
var fs = require('fs');
var path = require('path');

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var through2 = require('through2');
var browserify = require('browserify');
var awspublish = require('gulp-awspublish');

var isDevelopment = (process.env.ENVIRONMENT !== "production");


gulp.task('stylesheet', function () {
  return gulp.src('app/css/main.scss')
    .pipe($.if(isDevelopment, $.sourcemaps.init()))
    .pipe($.sass({
      outputStyle: 'nested', // libsass doesn't support expanded yet
      precision: 10,
      includePaths: ['.', './bower_components/breakpoint-sass/stylesheets'],
      onError: console.error.bind(console, 'Sass error:')
    }))
    .on('error', function (error) {
      console.log(error.stack);
      this.emit('end');
    })
    .pipe($.postcss([
      require('autoprefixer-core')({browsers: ['last 1 version']})
    ]))
    .pipe($.if(isDevelopment, $.sourcemaps.write()))
    .pipe(gulp.dest('.tmp/css'))
    .pipe(reload({stream: true}));
});



gulp.task('javascript', function () {
  return gulp.src('app/js/main.js')
    .pipe(through2.obj(function (file, enc, next){ // workaround for https://github.com/babel/babelify/issues/46
      browserify({
        entries: file.path,
        debug: isDevelopment
      }).bundle(function(err, res){
        if (err) { return next(err); }

        file.contents = res;
        next(null, file);
      });
    }))
    .on('error', function (error) {
      console.log(error.stack);
      this.emit('end');
    })
    .pipe(gulp.dest('dist/js'))
    .pipe($.if(isDevelopment, $.sourcemaps.init({loadMaps: true})))
    .pipe($.if(isDevelopment, $.sourcemaps.write('.')))
    .pipe(gulp.dest('.tmp/js'));
});

gulp.task('jshint', function () {
  return gulp.src('app/js/**/*.js')
    .pipe(reload({stream: true, once: true}))
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
});

gulp.task('html', ['javascript', 'stylesheet'], function () {
  var assets = $.useref.assets({ searchPath: ['.tmp', 'app/*.html', '.'] });

  return gulp.src('app/*.html')
    .pipe(assets) // load assets
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.csso()))
    .pipe($.rev()) // rename *only* the concatenated files
    .pipe(assets.restore()) // restore filter
    .pipe($.useref()) //
    .pipe($.revReplace()) // substitute new file names
    .pipe($.if('*.html', $.minifyHtml({conditionals: true, loose: true})))
    .pipe(gulp.dest('dist'));
});

gulp.task('images', function () {
  return gulp.src('app/images/**/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true,
      // don't remove IDs from SVGs, they are often used
      // as hooks for embedding and styling
      svgoPlugins: [{cleanupIDs: false}]
    })))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('fonts', function () {
  var pattern = 'app/fonts/**/*'
  return gulp.src(require('main-bower-files')({
    filter: '**/*.{eot,svg,ttf,woff,woff2}'
  }).concat(pattern))
    .pipe(gulp.dest('.tmp/fonts'))
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('extras', function () {
  return gulp.src([
    'app/*.*',
    '!app/*.html'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
});

gulp.task('clean', require('del').bind(null, ['.tmp', 'dist']));

gulp.task('serve', ['stylesheet', 'javascript', 'fonts'], function () {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['.tmp', 'app'],
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });

  // watch for changes
  gulp.watch([
    'app/*.html',
    '.tmp/js/*.{js,jsx}',
    'app/images/**/*',
    '.tmp/fonts/**/*'
  ]).on('change', reload);

  gulp.watch(['app/css/**/*.scss'], ['stylesheet']);
  gulp.watch('app/js/**/*.{js,jsx}', ['javascript']);
  gulp.watch('app/fonts/**/*', ['fonts']);
});

gulp.task('serve:dist', function () {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['dist']
    }
  });
});

// inject bower components
gulp.task('wiredep', function () {
  var wiredep = require('wiredep').stream;

  gulp.src('app/css/*.scss')
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)+/
    }))
    .pipe(gulp.dest('app/css'));

  gulp.src('app/*.html')
    .pipe(wiredep({
      // exclude: ['bootstrap-sass-official'],
      ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe(gulp.dest('app'));
});

// publish to amazon s3
gulp.task('publish', ['build'], function () {
  var aws = JSON.parse(fs.readFileSync( './.aws.json' ));
  // create a new publisher using S3 options
  // http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#constructor-property
  var publisher = awspublish.create( aws );

  // define custom headers
  var headers = {
    'Cache-Control': 'max-age=315360000, no-transform, public'
    // ...
  };

  return gulp.src('./dist/**')
     // gzip, Set Content-Encoding headers and add .gz extension
    .pipe(awspublish.gzip())

    // publisher will add Content-Length, Content-Type and headers specified above
    // If not specified it will set x-amz-acl to public-read by default
    .pipe(publisher.publish(headers))

    // create a cache file to speed up consecutive uploads
    .pipe(publisher.cache())

     // print upload updates to console
    .pipe(awspublish.reporter());
});

gulp.task('build', ['html', 'images', 'fonts', 'extras'], function () {
  return gulp.src('dist/**/*')
    .pipe($.size({ title: 'build', gzip: true }));
});

gulp.task('default', ['clean'], function () {
  gulp.start('build');
});
