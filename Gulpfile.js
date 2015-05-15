'use strict';

var gulp = require('gulp');
var tasks = require('tollan-gulp');

gulp.task('default', function() {
	return Promise.all([
		tasks.composite.scripts()
	]).then(function() {
		return;
	}).catch(function(err) {
		throw (err);
	});
});

gulp.task('setWatch', function() {
	tasks.config.watch = true;
});

gulp.task('watch', ['setWatch', 'default'], function() {
	return tasks.watch.scripts();
});
