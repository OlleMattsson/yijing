var gulp = require("gulp"),
	rjs = require("requirejs"),
	clean = require("gulp-clean"),
    jsoncombine = require("gulp-jsoncombine"),
    gzip = require("gulp-gzip"),
    gulpSequence = require('gulp-sequence'),
    uglify = require('gulp-uglify'),
    appDir = "src",
    distDir = "./dist"
	;

gulp.task("optimise", function(callback) {
    rjs.optimize({
        appDir: "",   // copy everything from here
        dir: "./js-dist",       // to here
        baseUrl: "./src",        
        mainConfigFile: "./src/index.js",
        useStrict: true,
        skipDirOptimize: true,
        removeCombined: true,
        optimize: 'none',
        modules: [{
            name: "index"
        }],
    }, function(buildResponse) {
        console.log("build response: ", buildResponse);
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

gulp.task("copyfiles", function () {

    gulp.src( [ './src/index.html', 
                './src/style.css'])
    .pipe( gulp.dest('./dist') )

    gulp.src('./js-dist/index.js')
    .pipe( uglify() )
    .pipe( gulp.dest('./dist') )
    .on('error', function(error) {
        console.log("uglify", error);
    })

    gulp.src('./src/static/yijing.json')
    .pipe( gulp.dest( './dist/static'))
    
    gulp.src('./src/bower_components/requirejs/require.js')
    .pipe( gulp.dest( './dist/bower_components/requirejs'));
    
    gulp.src('./src/bower_components/bootstrap/dist/js/bootstrap.min.js')
    .pipe( gulp.dest('./dist/bower_components/bootstrap/dist/js'));
    
    gulp.src('./src/bower_components/bootstrap/dist/css/bootstrap.css')
    .pipe( gulp.dest( './dist/bower_components/bootstrap/dist/css'));
        
})



gulp.task("clean", function() {
    gulp.src('./js-dist', {read: false})
    .pipe(clean())
    .on('error', function(error) {
        console.log(error);
    })
});

gulp.task("cleanjsdist", function() {
    gulp.src('./js-dist', {read: false})
    .pipe(clean())
    .on('error', function(error) {
        console.log(error);
    })
});

gulp.task("yijing", function() {
    gulp.src("./src/static/iching/*.json")
        .pipe(jsoncombine("yijing.json",function(data){ 
            return new Buffer(JSON.stringify(data));
         }))
        //.pipe(gzip())
        .pipe(gulp.dest("./src/static"));
});

 
gulp.task('default', gulpSequence( "optimise", "copyfiles"));

//gulp.task("", ["optimise", "build", "cleanjsdist"]);
gulp.task("y", ["yijing"]);
