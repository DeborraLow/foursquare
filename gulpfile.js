var gulp = require("gulp"),
	sass = require("gulp-sass"),
	bourbon = require("node-bourbon"),
	autoprefixer = require("gulp-autoprefixer"),//ベンダープレフィックス付与
	uglify = require("gulp-uglify"),//js圧縮
	plumber = require("gulp-plumber"),//エラー時にwatchを止めない
	cleanCss = require("gulp-clean-css"),//CSS圧縮
	browser = require("browser-sync"),
	sourcemaps = require("gulp-sourcemaps"),
	ssi = require ('browsersync-ssi');

const DIR = {//プログラムを吐き出すディレクトリ
	root : "./public",
	wp   :  {　// 吐き出す先
		output_css : "./public/wordpress/wp-content/themes/foursquare/assets/css",
		output_js : "./public/wordpress/wp-content/themes/foursquare/assets/js"
	},
	src  :  {// Souceディレクリ
		input_sass : "./src/sass/**/*.scss",
		input_js : "./src/js/**/*.js"
	}
}


/*----------------------------
 *browserSyncgulp
------------------------------*/
gulp.task("browsersync", function() {
    browser({
        server: {
            baseDir: DIR.root,
			middleware : ssi({
				baseDir: DIR.root,
				ext: '.html'
			})
		},
    });
});
/*----------------------------
 *sass
------------------------------*/
gulp.task("sass",function(){
	gulp.src(DIR.src.input_sass)
	.pipe(plumber())
	.pipe(sourcemaps.init())
	.pipe(autoprefixer())
	.pipe(sass({includePaths: bourbon.includePaths}))
	.pipe(cleanCss())
	.pipe(sourcemaps.write("../sourcemaps"))
	.pipe(gulp.dest(DIR.wp.output_css));　//出力先
});

/*----------------------------
 *jsの圧縮
------------------------------*/
gulp.task("js",function(){
	gulp.src([DIR.src.input_js])
	.pipe(plumber())
    .pipe(uglify())
    .pipe(gulp.dest(DIR.wp.output_js));
});


/*----------------------------
 *Watch対象のファイル
------------------------------*/
gulp.task("watch",function(){
	gulp.watch([DIR.src.input_js],["js"]);
	gulp.watch(DIR.src.input_sass,["sass"]);

	// gulp.watch(DIR.wp.output_js + '/**/*.js', browser.reload);
  	// gulp.watch(DIR.wp.output_css + '/**/*.css', browser.reload);
  	// gulp.watch(DIR.root + '/wordpress/wp-content/themes/foursquare/**/*.php', browser.reload);
});

gulp.task('default', ["browsersync","watch","js","sass"]);
