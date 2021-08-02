const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');

gulp.task('server', function () {
    browserSync.init({
        server: {
            baseDir: './dist',
        },
    });
});

gulp.task('styles', function () {
    return gulp
        .src('./src/sass/**/*.+(scss|sass|css)')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(rename({ prefix: '', suffix: '.min' }))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream());
});

gulp.task('html', function () {
    return gulp
        .src('./src/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.stream());
});

gulp.task('scripts', function () {
    return gulp.src('./src/js/**/*.js').pipe(gulp.dest('./dist/js')).pipe(browserSync.stream());
});

gulp.task('icons', function () {
    return gulp.src('./src/icons/**/*').pipe(gulp.dest('./dist/icons')).pipe(browserSync.stream());
});

gulp.task('images', function () {
    return gulp
        .src('./src/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/img'))
        .pipe(browserSync.stream());
});

gulp.task('watch', function () {
    gulp.watch('./src/sass/**/*.+(scss|sass|css)', gulp.parallel('styles'));
    gulp.watch('./src/*.html').on('change', gulp.parallel('html'));
    gulp.watch('./src/js/**/*.js').on('change', gulp.parallel('scripts'));
    gulp.watch('./src/img/**/*').on('all', gulp.parallel('images'));
    gulp.watch('./src/icons/**/*').on('all', gulp.parallel('icons'));
});

gulp.task(
    'default',
    gulp.parallel('watch', 'server', 'styles', 'html', 'scripts', 'icons', 'images')
);
