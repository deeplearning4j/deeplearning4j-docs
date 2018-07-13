var gulp = require('gulp'); //default
var sass = require('gulp-sass');//sass complie
var concat = require('gulp-concat'); //compile js plugins into one file
var concatCss = require('gulp-concat-css');//compile css plugins into one file
var watch = require('gulp-watch'); //sass compile to css

gulp.task('sass', function () {
    return gulp.src('scss/**/*.scss')
            .pipe(sass().on('error', sass.logError))
            .pipe(gulp.dest('css/'));
});
gulp.task('watch', function () {
    gulp.watch('scss/**/*.scss', ['sass']);
    gulp.watch('js/**/*.js', ['concatJs']);
});

gulp.task('concatJs', function () {
    return gulp.src(
            [
                'vendor/jquery/dist/jquery.min.js',
                'vendor/bootstrap/dist/js/bootstrap.bundle.min.js',
                'js/jquery.easing.min.js',
                'vendor/waypoints/lib/jquery.waypoints.min.js',
                'js/jquery.countTo.js',
                'js/jquery.preloader.min.js',
                'vendor/theia-sticky-sidebar/dist/theia-sticky-sidebar.min.js',
                'js/imagesloaded.pkgd.min.js',
                'vendor/jquery-knob/dist/jquery.knob.min.js',
                'js/smooth-scroll.min.js',
                'vendor/particles.js/particles.min.js',
                'js/jquery.sticky.js'
            ])
            .pipe(concat('plugins.js'))
            .pipe(gulp.dest('js/plugins/'));
});

gulp.task('concatCss', function () {
    return gulp.src([
        'vendor/themify-icons/css/themify-icons.css',
        'vendor/bootstrap/dist/css/bootstrap.min.css'
    ])
            .pipe(concatCss("plugins/plugins.css"))
            .pipe(gulp.dest('css/'));
});