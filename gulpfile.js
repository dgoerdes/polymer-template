'use-strict';

const del = require('del');
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const runSequence = require('run-sequence');
const browserSync = require('browser-sync');


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

    // Compiled app and optimized static files output.
    dist: {
        root: './dist',
        images: './dist/images'
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
    return del(paths.dist.root, cb);
});

/**
 * LINT JS
 */
gulp.task('jslint', () => {
    return gulp.src(paths.src.js)
        .pipe($.eslint())
        .pipe($.eslint.formatEach());
});

/**
 * LINT SASS
 */
gulp.task('sasslint', () => {
    return gulp.src(paths.src.scss)
        .pipe($.sassLint())
        .pipe($.sassLint.format());
});

/**
 * APP
 * Compiles the .pug -> .html
 *
 * Includes scripts which get transpiled with babel if filterd.
 * https://github.com/jstransformers/jstransformer-babel
 */
gulp.task('app', ['jslint', 'sasslint'], () => {
    return gulp.src(paths.src.pug)
        .pipe($.pug(options.pug))
        .on('error', (e) => console.log(e))
        .pipe(gulp.dest(paths.dist.root))
        .pipe(browserSync.reload({
            stream: true
        }));
});

// TODO: Add postCSS autoprefixer task for inlined styles

/**
 * IMAGES
 * Optimizes images for web.
 */
gulp.task('images', () => {
    return gulp.src(paths.src.images)
        .pipe($.imagemin())
        .pipe(gulp.dest(paths.dist.images));
});

/**
 * SERVE DEV
 */
gulp.task('serve:dev', () => {
    browserSync.init({
        server: {
            baseDir: './',
            index: 'index.html'
        },
        port: 3000,
        open: false,
        reloadOnRestart: true
    });
});

/**
 * SERVE BUILD
 */
gulp.task('serve:build', () => {
    browserSync.init({
        server: {
            baseDir: './build/bundled/',
            index: 'index.html'
        },
        port: 4000,
        open: false,
        reloadOnRestart: true
    });
});

gulp.task('default', () => {
    runSequence(
        'clean',
        ['app', 'images']
    );
});

gulp.task('watch', ['default', 'serve:dev'], () => {
    gulp.watch(paths.src.pug, ['app']);
    gulp.watch(paths.src.js, ['app']);
    gulp.watch(paths.src.scss, ['app']);
    gulp.watch(paths.src.images, ['images']);
});
