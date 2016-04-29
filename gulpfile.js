"use strict";

var gulp = require('gulp');
// JS
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var uglify = require('gulp-uglify');
// CSS
var streamqueue = require('streamqueue');
var concatCss = require('gulp-concat-css');
var cleanCSS = require('gulp-clean-css'); // same with gulp-minify-css
var autoprefixer = require('gulp-autoprefixer');
// IMG
//var imagemin = require('gulp-imagemin');
// Test
var mocha = require('gulp-mocha');
// Watch
var livereload = require('gulp-livereload');

var src = "./webapp/public/src";
var paths = {
	js: src + "/js/**/*.js",
	css: src + "/css/**/*.css",
    img: src + "/img/**/*",
	dist: "./webapp/public/dist",
};

gulp.task("default", function() {
	console.log("[Gulp] read gulpfile.js");
});

gulp.task("js", function() {
	return gulp.src(paths.js)
		.pipe(concat("smithoo.js"))
		.pipe(jshint())
		.pipe(jshint.reporter(stylish))
		//.pipe(uglify())
		.pipe(gulp.dest(paths.dist + "/js"));
});

gulp.task("css", function() {
	return gulp.src(paths.css)
		.pipe(concatCss("smithoo.css"))
		.pipe(cleanCSS({debug: true}, function(details) {
			console.log(details.name + "(origin): " + details.stats.originalSize + " byte");
			console.log(details.name + "(min): " + details.stats.minifiedSize + " byte");
		}))
		.pipe(autoprefixer())
		.pipe(gulp.dest(paths.dist + "/css"));
});

gulp.task('watch', function () {
	livereload.listen();
	gulp.watch(paths.js, ["js"]);
	gulp.watch(paths.css, ["css"]);
    //gulp.watch(paths.img, ["img"]);
});

gulp.task("build", ["css", "js" /*, "img"*/]);


