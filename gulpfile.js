'use-strict';

const del = require('del');
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const runSequence = require('run-sequence');
const browserSync = require('browser-sync')


/**
 * PATHS
 */
let paths = {
    src: {
        pug: [
            './src/**/*.pug',
            '!./src/**/*.mixin.pug'
        ],
        js: './src/**/*.js',
        scss: './src/**/*.scss',
        images: './src/images/**/*'
    },

    dependencies: {
        js: [
            'node_modules/rxjs/bundles/Rx.js',
            'node_modules/ramda/dist/ramda.js',
            'node_modules/redux/dist/redux.js',
            'node_modules/redux-thunk/dist/redux-thunk.js',
            'node_modules/setimmediate/setimmediate.js'
        ]
    },

    polymer: {
        src: './polymer/src',
        images: './polymer/images',
        vendor: './polymer/vendor'
    }
};

/**
 * OPTIONS
 */
let options = {
    pug: {
        doctype: 'html',
    },
    autoprefixer: {
        browsers: ['last 2 versions', 'iOS 7'],
        cascade: false
    },
    sass: {
        errLogToConsole: true,
        outputStyle: 'expanded'
    }
};


/**
 * CLEAN
 */
gulp.task('clean', (cb) => {
    return del([paths.polymer.src, paths.polymer.vendor, paths.polymer.images], cb);
});

gulp.task('dependencies', () => {
    return gulp.src(paths.dependencies.js)
        .pipe(gulp.dest(paths.polymer.vendor));
});

/**
 * APP
 * Compiles the .pug -> .html
 *
 * Includes scripts which get transpiled with babel if filterd.
 * https://github.com/jstransformers/jstransformer-babel
 */
gulp.task('app', ['dependencies'], () => {
    return gulp.src(paths.src.pug)
        .pipe($.pug(options.pug))
        .on('error', (e) => console.log(e))
        .pipe(gulp.dest(paths.polymer.src))
        .pipe(browserSync.reload({
            stream: true
        }));
});

/**
 * STYLES
 */
gulp.task('styles', () => {
    return gulp.src(paths.src.scss)
        .pipe($.sass().on('error', $.sass.logError))
        .pipe($.autoprefixer(options.autoprefixer))
        .pipe($.styleModules())
        .pipe(gulp.dest(paths.polymer.src))
        .pipe(browserSync.reload({
            stream: true
        }));
});

// TODO Copy + Optimize Images

/**
 * BROWSER SYNC
 */
gulp.task('browserSync', () => {
    browserSync.init({
        proxy: {
            target: "http://localhost:8080",
        },
        open: false,
        reloadOnRestart: true
    });
});


gulp.task('default', () => {
    runSequence('clean', 'app', 'styles');
});

gulp.task('watch', ['default', 'browserSync'], () => {
    gulp.watch(paths.src.pug, ['app']);
    gulp.watch(paths.src.js, ['app']);
    gulp.watch(paths.src.scss, ['styles']);
});
