// @ts-nocheck
const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const minifyCSS = require('gulp-minify-css');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const htmlreplace = require('gulp-html-replace');
const minify = require('gulp-minify');
const htmlmin = require('gulp-htmlmin');
const babel = require('gulp-babel')
const surge = require('gulp-surge')

// compile sass to css
gulp.task('sass', () => {
	return gulp
		.src(['node_modules/bootstrap/scss/bootstrap.scss',
			'src/scss/*.scss'])
		.pipe(plumber())
		.pipe(sass())
		.pipe(gulp.dest('src/css'))
		.pipe(browserSync.stream());
});

gulp.task('js', () => {
	return gulp
		.src([
			'node_modules/angular/angular.js',
			'node_modules/angular-resource/angular-resource.js',
			'node_modules/angular-route/angular-route.js',	
		])
		.pipe(plumber())
		.pipe(gulp.dest('src/js'))
		.pipe(browserSync.stream());
});

gulp.task('serve', ['sass'],  () => {
	browserSync.init({
		server: './src'
	});
    gulp.watch(['src/scss/*.scss'], ['sass']);
	gulp.watch(['src/js/*.js'], ['js']);
	gulp.watch(['src/*']);
	gulp.watch('src/*.html').on('change', browserSync.reload);
});

gulp.task('development', () => {
	return gulp
		.src('src/css/style.css')
		.pipe(plumber())
		.pipe(gulp.dest('dist'));
});


/**
 * Images Minify
 */
gulp.task('minifyImages', function () {
	gulp.src('src/assets/*')
		.pipe(plumber())
		.pipe(imagemin())
		.pipe(gulp.dest('dist/assets'))
});

gulp.task('dev', ['js', 'serve', 'development']);
gulp.task('prod', ['deploy']);

