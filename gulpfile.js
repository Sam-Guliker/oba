var gulp = require('gulp');
var browserSync = require('browser-sync');

gulp.task('browser-sync', function () {
	browserSync.init(['*.html', './static/css/styles.css'], {
		server: {
			baseDir: './'
		}
	});
});

gulp.task('default', ['browser-sync'], function () {
	gulp.watch('static/css/*.css'); // Watching all scss changes on changes in the background
});
