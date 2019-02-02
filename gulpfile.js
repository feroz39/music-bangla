const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

gulp.task('sass', ()=>
    gulp.src(['node_modules/materialize-css/sass/materialize.scss', 'src/sass/style.scss'])
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('src/css'))
);

gulp.task('concat', ()=>
        gulp.src(
            [
                'node_modules/jquery/dist/jquery.min.js',
                'node_modules/materialize-css/dist/js/materialize.min.js',
            ])
        .pipe(concat('vendor.js'))
        .pipe(uglify())
        .pipe(gulp.dest('src/js/'))
);

gulp.task('sassWatch', function () {
    gulp.watch(['src/sass/*.scss', 'src/sass/**/*.scss'], gulp.series('sass'));
});

gulp.task('default', gulp.series('sass', 'concat', 'sassWatch'));