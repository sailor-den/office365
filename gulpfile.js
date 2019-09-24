var gulp          = require('gulp'),
		sass          = require('gulp-sass'),
		browserSync   = require('browser-sync'),
		concat        = require('gulp-concat'),
		uglify        = require('gulp-uglify-es').default,
		cleancss      = require('gulp-clean-css'),
		rename        = require('gulp-rename'),
		autoprefixer  = require('gulp-autoprefixer'),
		notify        = require('gulp-notify'),
		rsync         = require('gulp-rsync'),
		imageResize   = require('gulp-image-resize'),
		imagemin      = require('gulp-imagemin'),
		mozjpeg       = require('imagemin-mozjpeg'),
		newer         = require('gulp-newer'),
		del           = require('del');

// Local Server
gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false,
		// online: false, // Work Offline Without Internet Connection
		// tunnel: true, tunnel: "office365", // Demonstration page: http://projectname.localtunnel.me
	})
});

// Sass|Scss Styles
gulp.task('styles', function() {
	return gulp.src('app/sass/**/*.sass')
	.pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))
	.pipe(rename({ suffix: '.min', prefix : '' }))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream())
});

// JS
gulp.task('scripts', function() {
	return gulp.src([
		'app/libs/jquery-3.4.1/jquery-3.4.1.min.js',
		'app/libs/PageScroll2id/jquery.malihu.PageScroll2id.min.js',
		'app/libs/bootstrap-4.3.1/js/bootstrap.min.js',
		'app/libs/maskedinput/jquery.maskedinput.min.js',
		'app/libs/detect/detect.min.js',
		'app/libs/numberMask/jquery.numberMask.min.js',
		'app/js/common.js', // Always at the end
		])
	.pipe(concat('scripts.min.js'))
	.pipe(uglify()) // Mifify js (opt.)
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({ stream: true }))
});

// HTML Live Reload
gulp.task('code', function() {
	return gulp.src('app/*.html')
	.pipe(browserSync.reload({ stream: true }))
});

// Deploy
gulp.task('rsync', function() {
	return gulp.src('app/**')
	.pipe(rsync({
		root: 'app/',
		hostname: 'username@yousite.com',
		destination: 'yousite/public_html/',
		// include: ['*.htaccess'], // Includes files to deploy
		exclude: ['**/Thumbs.db', '**/*.DS_Store'], // Excludes files from deploy
		recursive: true,
		archive: true,
		silent: false,
		compress: true
	}))
});

// Images @x1 & @x2 + Compression | Required imagemagick (sudo apt update; sudo apt install imagemagick)
gulp.task('img1x', function() {
	return gulp.src('app/img/_src/**/*.*')
	.pipe(newer('app/img/@1x'))
	.pipe(imageResize({ width: '50%', imageMagick: true }))
	.pipe(imagemin([
		imagemin.jpegtran({ progressive: true }),
		mozjpeg({ quality: 90 })
	]))
	.pipe(gulp.dest('app/img/@1x'))
});
gulp.task('img2x', function() {
	return gulp.src('app/img/_src/**/*.*')
	.pipe(newer('app/img/@2x'))
	.pipe(imagemin([
		imagemin.jpegtran({ progressive: true }),
		mozjpeg({ quality: 90 })
	]))
	.pipe(gulp.dest('app/img/@2x'))
});
gulp.task('img', gulp.series('img1x', 'img2x'));

// Clean @*x IMG's
gulp.task('cleanimg', function() {
	return del(['app/img/@*'], { force:true })
});

gulp.task('watch', function() {
	gulp.watch('app/sass/**/*.sass', gulp.parallel('styles'));
	gulp.watch(['libs/**/*.js', 'app/js/common.js'], gulp.parallel('scripts'));
	gulp.watch('app/*.html', gulp.parallel('code'));
	gulp.watch('app/img/_src/**/*', gulp.parallel('img'));
});

gulp.task('default', gulp.parallel('styles', 'scripts', 'browser-sync', 'watch'));
