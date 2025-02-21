const { src, dest, watch } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const fs = require("fs");
var ghPages = require("gulp-gh-pages");

gulp.task("deploy", function () {
  return gulp.src("./dist/**/*").pipe(ghPages());
});

function css() {
  return src("./src/scss/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(dest("./dist/style/"));
}
exports.css = css;

const concat = require("gulp-concat");
function js() {
  return src("./src/js/*.js")
    .pipe(concat("script.js"))
    .pipe(dest("./dist/js/"));
}
exports.js = js;

const pug = require("gulp-pug");
function html() {
  const data = JSON.parse(fs.readFileSync("./src/data/response.json", "utf-8"));
  return src("./src/pug/*.pug")
    .pipe(pug({ pretty: true, locals: { cards: data } }))
    .pipe(dest("./dist/"));
}
exports.html = html;

exports.watch = function () {
  watch("./src/scss/**/*.scss", css);
  watch("./src/pug/**/*.pug", html);
  watch("./src/js/*.js", js);
};
