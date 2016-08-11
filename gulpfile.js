/*global -$ */
'use strict';
// generated on 2016-07-15 using generator-modern-frontend 0.2.9
var fs = require('fs');
var path = require('path');
var del = require('del');

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var through2 = require('through2');
var browserify = require('browserify');
var awspublish = require('gulp-awspublish');
var RevAll = require('gulp-rev-all');

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

gulp.task('javascript-vendor', function () {
  // copy vendor stuff that isn't a bower package
  return gulp.src([
    'app/js/vendor/**/*.*'
  ]).pipe(gulp.dest('dist/js/vendor/'));
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
    .pipe(assets)
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.csso()))
    .pipe(assets.restore())
    .pipe($.useref())
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

gulp.task('extras', ['javascript-vendor'], function () {
  return gulp.src([
    'app/*.*',
    '!app/*.html'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
});

gulp.task('clean', function ( done ) {
  clean('.tmp');
  clean('.rev');
  clean('dist', done);
});

gulp.task('clean-s3-cache', function ( done ) {
  clean('./.awspublish-timschoch.com', done);
});

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

gulp.task('rev', ['build'], function () {
  var revAll = new RevAll({
    dontSearchFile: [/js\/vendor\/*/g, '.pdf', '.png', '.jpg']
  });

  return gulp.src('./dist/**/*')
    .pipe(revAll.revision())
    .pipe(gulp.dest('.rev'))

    // add manifest file
    .pipe(revAll.manifestFile())
    .pipe(gulp.dest('.rev'))

    // add version file
    .pipe(revAll.versionFile())
    .pipe(gulp.dest('.rev'));
});

gulp.task('publish', ['clean'], function () {
  gulp.start('s3');
});

gulp.task('republish', ['clean-s3-cache'], function () {
  gulp.start('publish');
});

// publish to amazon s3
gulp.task('s3', ['rev'], function () {
  var aws = JSON.parse(fs.readFileSync( './.aws.json' ));
  // create a new publisher using S3 options
  // http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#constructor-property
  // https://www.npmjs.com/package/gulp-awspublish
  // https://www.npmjs.com/package/gulp-cloudfront
  aws.cloudfront.patternIndex = /^index\.[a-f0-9]{8}\.html(\.gz)*$/gi;
  var publisher = awspublish.create( aws.s3 );

  // define custom headers
  var headers = {
    'Cache-Control': 'max-age=315360000, no-transform, public'
  };

  return gulp.src('./.rev/**')
    // gzip, Set Content-Encoding headers and add .gz extension
    .pipe(awspublish.gzip())

    // publisher will add Content-Length, Content-Type and headers specified above
    // If not specified it will set x-amz-acl to public-read by default
    .pipe(publisher.publish(headers))

    // create a cache file to speed up consecutive uploads
    .pipe(publisher.cache())

    // update CloudFront distribution Default Root Object to latest revisioned index.html
    .pipe($.cloudfront(aws.cloudfront))

    // delete old files from the bucket
    .pipe(publisher.sync())

    // print upload updates to console
    .pipe(awspublish.reporter());
});

gulp.task('cloudfront', function () {
  var aws = JSON.parse(fs.readFileSync( './.aws.json' ));
  // create a new publisher using S3 options
  // http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#constructor-property
  // https://www.npmjs.com/package/gulp-awspublish
  // https://www.npmjs.com/package/gulp-cloudfront
  aws.cloudfront.patternIndex = /^index\.[a-f0-9]{8}\.html(\.gz)*$/gi;
  console.dir(aws);

  return gulp.src('.rev/**')
    .pipe($.cloudfront(aws.cloudfront));

});

gulp.task('build', ['html', 'images', 'fonts', 'extras'], function (done) {
  // gulp.src('dist/**/*')
  //   .pipe($.size({ title: 'build', gzip: true }));

  done();
});

gulp.task('default', ['clean'], function () {
  gulp.start('build');
});


/* helper functions */
function clean(path, done) {
    log('Cleaning: ' + $.util.colors.blue(path));
    del(path, done);
}

function log(msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}