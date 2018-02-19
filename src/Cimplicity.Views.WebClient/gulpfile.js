/// <binding Clean='clean' AfterBuild='copy:app'/>
"use strict";

var gulp = require('gulp');
var config = require('./gulp.config')();
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var changed = require('gulp-changed');
var cleanCSS = require('gulp-clean-css');
var clean = require('gulp-clean');
var rename = require('gulp-rename');
var pump = require('pump');
var $ = require('gulp-load-plugins')({ lazy: true });


//***********************************************************************************
//* Task to clean up 'dest' directories
//***********************************************************************************
gulp.task("clean:js", function (cb) {
    return gulp.src('wwwroot/js/*.min.js', { read: false }).pipe(clean());
});
gulp.task("clean:css", function (cb) {
    return gulp.src(config.cssDestDir + '/*.css', { read: false }).pipe(clean());
});

gulp.task("clean", ["clean:js", "clean:css"]);


//***********************************************************************************
//* Task to minify files in production
//***********************************************************************************
gulp.task('minify:css', function () {
    return gulp.src(config.cssDestDir)
        .pipe(cleanCSS())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(config.cssDestDir));
});

gulp.task('minify', ['minify:css']);


//***********************************************************************************
//* Task to copy extra files (like HTML templates) in production
//***********************************************************************************
// Gulp task to copy HTML files to output directory
gulp.task('copy:html_to_dist', function() {
    gulp.src(config.htmlSource)
        .pipe(gulp.dest(config.htmlDest));
});



//***********************************************************************************
//* Task to handle style files (SCSS, CSS, etc)
//***********************************************************************************
gulp.task('copy:css_to_dist', function() {
    gulp.src(config.cssSrc)
        .pipe(gulp.dest(config.cssDestDir));
});


//***********************************************************************************
//* Task to copy assets
//***********************************************************************************
gulp.task("copy:images", function () {
    gulp.src(config.imagesDirSrc + "/*.*")
        .pipe(gulp.dest(config.imagesDirDest + "/"));
});

gulp.task('copy:all_assets', [
    'copy:images'
]);


//***********************************************************************************
//* Task to copy dependencies (lib, etc.) to dist
//***********************************************************************************
gulp.task("copy:angular", function () {

    return gulp.src(config.angular,
        { base: config.node_modules + "@angular/" })
        .pipe(gulp.dest(config.lib + "@angular/"));
});
gulp.task("copy:angularWebApi", function () {
    return gulp.src(config.angularWebApi,
        { base: config.node_modules })
        .pipe(gulp.dest(config.lib));
});
gulp.task("copy:corejs", function () {
    return gulp.src(config.corejs,
        { base: config.node_modules })
        .pipe(gulp.dest(config.lib));
});
gulp.task("copy:zonejs", function () {
    return gulp.src(config.zonejs,
        { base: config.node_modules })
        .pipe(gulp.dest(config.lib));
});
gulp.task("copy:reflectjs", function () {
    return gulp.src(config.reflectjs,
        { base: config.node_modules })
        .pipe(gulp.dest(config.lib));
});
gulp.task("copy:systemjs", function () {
    return gulp.src(config.systemjs,
        { base: config.node_modules })
        .pipe(gulp.dest(config.lib));
});
gulp.task("copy:rxjs", function () {
    return gulp.src(config.rxjs,
        { base: config.node_modules })
        .pipe(gulp.dest(config.lib));
});
// gulp.task("copy:app", ["publish-app-wwwroot:js"], function () {
//     return gulp.src(config.appOther)
//         .pipe(gulp.dest(config.destApp));
// });
gulp.task("copy:index", function () {
    return gulp.src(config.index)
        .pipe(gulp.dest(config.indexDest));
});
gulp.task("copy:jasmine", function () {
    return gulp.src(config.jasminejs,
        { base: config.node_modules + "jasmine-core/lib" })
        .pipe(gulp.dest(config.lib));
});
gulp.task("copy:es6-shim", function () {
    return gulp.src(config.shim_es6,
        { base: config.node_modules + "es6-shim" })
        .pipe(gulp.dest(config.lib + "es6-shim"));
});
gulp.task("copy:es5-shim", function () {
    return gulp.src(config.shim_es5,
        { base: config.node_modules + "es5-shim" })
        .pipe(gulp.dest(config.lib + "es5-shim"));
});
gulp.task("copy:signalr", function () {
    return gulp.src(config.signalr,
        { base: config.node_modules + "@aspnet" })
        .pipe(gulp.dest(config.lib));
});
gulp.task("copy:plugin_babel", function () {
    return gulp.src(config.plugin_babel,
        { base: config.node_modules + "systemjs-plugin-babel" })
        .pipe(gulp.dest(config.lib + "systemjs-plugin-babel"));
});

gulp.task("copy:moment", function () {
    return gulp.src(config.moment,
        { base: config.node_modules + "moment" })
        .pipe(gulp.dest(config.lib + "moment"));
});

gulp.task("dependencies", [
    "copy:angular",
    "copy:angularWebApi",
    "copy:corejs",
    "copy:zonejs",
    "copy:reflectjs",
    "copy:systemjs",
    "copy:rxjs",
    "copy:jasmine",
    //"copy:app",
    "copy:es6-shim",
    "copy:es5-shim",
    //"copy:index",
    "copy:signalr",
    "copy:plugin_babel",
    "copy:moment"
]);


//***********************************************************************************
//* Task to allow easy and fast debug
//***********************************************************************************
gulp.task('debug:create-fake-min-js', function (www) {
    return pump([
            gulp.src(config.sourceAppDir + "/**/*.js"),
            uglify(),
            rename({ suffix: '.min' }),
            gulp.dest(config.destApp)
        ],
        www)
});

gulp.task('copy:all-js-dir', function() {
    gulp.src(config.jsFilesSrc)
        .pipe(gulp.dest(config.jsDest));
});

gulp.task("debug:copy-minimal", [
    "clean:css",
    "copy:css_to_dist",
    "copy:html_to_dist",
    "copy:all-js-dir"
]);





gulp.task('publish-app-wwwroot:js', function (www) {
    return pump([
            gulp.src("app/**/*.js"),
            uglify(),
            rename({ suffix: '.min' }),
            gulp.dest(config.destApp)
        ],
        www);
});




//Valutare, eventualmente, di concatenare tutti i file js in uno solo e minimizzarlo
//gulp.task('all-in-one', function (cb) {
//    pump([
//        gulp.src("app/**/*.js"),
//        concat("all-in-one.js"),
//        uglify(),
//        rename({ suffix: '.min' }),
//        gulp.dest(config.destApp + '/dist')
//    ],
//        cb)
//});


gulp.task('copy-changed:app', function (chg) {
    return pump([
            gulp.src(config.sourceApp),
            changed(config.destApp),
            uglify(),
            rename({ suffix: '.min' }),
            gulp.dest(config.destApp)
        ],
        chg);
});
gulp.task("default", ["clean", 'minify', "dependencies"])
    .on('end',
    function () {
        return gulp.watch(config.app, ["copy-changed:app"]);
    });
