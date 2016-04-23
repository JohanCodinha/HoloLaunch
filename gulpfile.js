
/* ----------------------------------------------------------------
 * gulpfile.js
 * 
 * A starter gulpfile.
 * 
 * Menu:
 *  packages
 *  options
 *  taskss
 * ---------------------------------------------------------------- */


/* ----------------------------------------------------------------
 * $requires
 * ---------------------------------------------------------------- */
var gulp         = require('gulp');
var less         = require('gulp-less');
var inject       = require('gulp-inject');
var notify       = require('gulp-notify');
var rename       = require("gulp-rename");
var plumber      = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');
var wiredep      = require('wiredep').stream;
var config       = require('./gulpConfig.json');

var concat       = require('gulp-concat');
var uglify       = require('gulp-uglify');


/* ----------------------------------------------------------------
 * $options
 * ---------------------------------------------------------------- */
var paths = {
	less : ['less/*.less']
};

var opts = {
	autoprefixer : ['last 8 versions'],
	less : {
		path: ['less/*.less'], // The directory where all the less files are. This directory will be under watch
		main: 'less/lightgrid.less', // Main less file to compile
		output: '', // Leaving output to blank will not rename the output file
		dest: 'css' // Will output the compiled css into the css directory
	}
};


/* ----------------------------------------------------------------
 * $tasks
 * ---------------------------------------------------------------- */
// Compiles less files
gulp.task('less', function() {
	var onError = function(err) {
		notify.onError({
			title:    "Gulp",
			subtitle: "Failure!",
			message:  "Error: <%= error.message %>",
			sound:    "Beep"
		})(err);

		this.emit('end');
	};
	return gulp.src(config.less.main)
		.pipe(plumber({errorHandler: onError}))
		.pipe(less())
		.pipe(autoprefixer({
			browsers: opts.autoprefixer
		}))
		.pipe(rename(function (path) {
			if(config.less.output) {
				var fileName = config.less.output.split('.');
				path.basename = fileName[0];
				path.extname = '.' + fileName[1];
			}
		}))
		.pipe(gulp.dest(config.less.dest))
		.pipe(notify('Compiled <%= file.relative %>'));
});

gulp.task('js', function() {
		var onError = function(err) {
				notify.onError({
						title:    "Gulp",
						subtitle: "Failure!",
						message:  "Error: <%= error.message %>",
						sound:    "Beep"
				})(err);

				this.emit('end');
		};
		
		return gulp.src(config.js.main)
				.pipe(plumber({errorHandler: onError}))
				.pipe(concat('all.js'))
				.pipe(rename(function (path) {
				if(config.js.output) {
						var fileName = config.less.output.split('.');
						path.basename = fileName[0];
						path.extname = '.' + fileName[1];
				}
		}))
				.pipe(gulp.dest(config.js.dest))
				.pipe(notify('Compiled <%= file.relative %>'));
});

// Watches directories and/or files
gulp.task('watch', function() {
	gulp.watch(config.less.path, ['less']);
	gulp.watch(config.js.main, ['js']);
});

gulp.task('init', function() {
	notify('Gulp started');
});

gulp.task('buildHtml', function() {
	var onError = function(err) {
		notify.onError({
			title:    "Gulp",
			subtitle: "Failure!",
			message:  "Error: <%= error.message %>",
			sound:    "Beep"
		})(err);

		this.emit('end');
	};
	gulp.src(config.html.main)
		.pipe(plumber({errorHandler: onError}))
		.pipe(notify('Injecting scripts in ' + config.html.main))
		.pipe(wiredep({
			devDependencies: true,
			directory: './bower_components',
			bowerJson: require('./bower.json'),
			overrides : {
/*				'Sortable' : {
					'main' : ['Sortable.js']
				}*/
			},
			onError : onError
		}))
		.pipe(inject(gulp.src(config.js.path), {
		 	read     : false,
			relative : true
		}))
		.pipe(inject(gulp.src(config.css.path), {
		 	read     : false,
			relative : true
		}))
		.pipe(gulp.dest(__dirname + '/' + config.html.main));
});

// Default task
gulp.task('default', ['init', 'less', 'js', 'watch']);

/*
 * Build task
 * Sets scripts inside html using wiredep
 */
gulp.task('build',['buildHtml'])