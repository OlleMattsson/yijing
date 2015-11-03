var gulp = require("gulp"),
	rjs = require("requirejs"),
	clean = require("gulp-clean"),
    appDir = "./src",
    distDir = "./dist"
	;

gulp.task("optimise", function(callback) {
    rjs.optimize({
        appDir: appDir,
        baseUrl: "./",
        dir: distDir,
        mainConfigFile: appDir + "/index.js",
        useStrict: true,
        skipDirOptimize: true,
        removeCombined: true,
        //optimize: 'none',
        modules: [{
            name: "index"
        }],
    }, function(buildResponse) {
        console.log("build response", buildResponse);
        callback();
    }, callback);
});

gulp.task("watch", function() {
    gulp.watch([
        appDir + "/img/**",
        appDir + "/models/**",
        appDir + "/script/**",
        appDir + "/style/**",
        appDir + "/templates/**",
        appDir + "/views/**",
        appDir + "/*.*"
    ], ["optimise"]);
});



gulp.task("clean", function() {
    gulp.src('./dist', {read: false})
    .pipe(clean())
    .on('error', function(error) {
        console.log(error);
    })
});

gulp.task("default", ["optimise"]);
