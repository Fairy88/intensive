const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const watch = require('gulp-watch');
const sass = require('gulp-sass');
//Gulp Task для компиляции SCSS
gulp.task('scss', function() {
    return gulp.src('./src/scss/main.scss')
    .pipe(sass())
    .pipe(gulp.dest('./src/css/'))
    .pipe(browserSync.stream());
});
//Gulp Task для поднятия локального сервера
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "./src/"
        }
    });
});
// Следим за браузером и обновляем файлы
gulp.task("watch", function() {
    watch(['./src/*.html','./src/*.js', './src/img/*.*'], gulp.parallel(browserSync.reload));
    watch ('./src/scss/**/*.scss', function(){
        setTimeout(gulp.parallel('scss'), 1000);
    })
});

// Task запуска
gulp.task('default', gulp.series('scss', gulp.parallel('server', 'watch')));