var gulp = require("gulp");
var ts = require("gulp-typescript");
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');
var tsProject = ts.createProject("tsconfig.json");

gulp.task('compile-typescript', function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("dist"));
});

gulp.task('concat', function () {
    return gulp.src(['src/prepend.js', 'dist/typescript-compiled.js', 'src/append.js'])
        .pipe(concat('readmore-database-import.user.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', function () {
    return gulp.src('dist/typescript-compiled.js')
        .pipe(clean({force: true}));
});

gulp.task("default", function () {
    runSequence('compile-typescript', 'concat', 'clean');
});

gulp.task("watch", function () {
    gulp.watch('src/**/*.ts', ['default']);
    gulp.watch('src/append.js', ['default']);
    gulp.watch('src/prepend.js', ['default']);
});