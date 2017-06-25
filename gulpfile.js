'use strict';

const gulp = require('gulp');
const less = require('gulp-less');
const del = require('del');
const debug = require('gulp-debug');
const autoprefixer = require('gulp-autoprefixer');
const newer = require('gulp-newer');
const remember = require('gulp-remember');
const cached = require('gulp-cached');
const path = require('path');
const browserSync = require('browser-sync').create();
const pug = require('gulp-pug');
const order = require("gulp-order");
const concat = require('gulp-concat');
const minifyCSS = require('gulp-minify-css');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const notify = require( 'gulp-notify' );


gulp.task('styles', function() {
	return gulp.src(['frontend/**/*.less', '!frontend/**/blocks/**/*.less', "!frontend/**/main.less"])
	.pipe(sourcemaps.init())
	.pipe(less().on ('error', notify.onError({
			message: "<%= error.message %>",
			title  : "Less Error!"
		})))
	.pipe(autoprefixer())
	.pipe(minifyCSS())
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('public'));
});

gulp.task('clean', function() {
	return del('public');
});

gulp.task('wiews', function() {
	return gulp.src(['frontend/wievs/*.pug', '!frontend/**/includes/*.*'])
		// .pipe(cached('wievs'))
		// .pipe(remember('wievs'))
		.pipe(newer('wievs'))
		.pipe(pug().on ('error', notify.onError({
			message: "<%= error.message %>",
			title  : "Pug Error!"
		})))
		.pipe(gulp.dest('public'));
})

gulp.task('scripts', function() {
	return gulp.src(['frontend/**/*.js'])
		.pipe(sourcemaps.init())
		.pipe(cached('scripts'))
		.pipe(remember('scripts'))
		.pipe(newer('scripts'))
		.pipe(debug({title: 'scripts'}))
		.pipe(order([
			'frontend/libs/jquery-1.9.1.min.js',
			'frontend/**/*.js'
		]).on ('error', notify.onError({
			message: "<%= error.message %>",
			title  : "Pug Error!"
		})))
		.pipe(uglify())
		.pipe(concat('./scripts/main.js'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('public'));
});

gulp.task('assets', function() {
	return gulp.src('frontend/assets/**/*.*', {since: gulp.lastRun('assets')})
		.pipe(cached('assets'))
		.pipe(remember('assets'))
		.pipe(newer('assets'))
		.pipe(debug({title: 'assets'}))
		.pipe(gulp.dest('public'));
});

gulp.task('build', gulp.series('clean', gulp.parallel('styles', 'assets', 'wiews', 'scripts')));

gulp.task('watch', function() {
	gulp.watch('frontend/styles/**/*.*', gulp.series('styles'));
	gulp.watch('frontend/assets/**/*.*', gulp.series('assets'));
	gulp.watch('frontend/wievs/**/*.*', gulp.series('wiews'));
	gulp.watch('frontend/js/**/*.*', gulp.series('scripts'));

});

gulp.task('serve', function() {
	browserSync.init({
		server: 'public'
	});

	browserSync.watch('public/**/*.*').on('change', browserSync.reload);
});

gulp.task('dev',
	gulp.series('build', gulp.parallel('watch', 'serve'))
);

