var gulp = require("gulp");
var browserSync = require("browser-sync");

gulp.task("browser-sync", function() {
  browserSync({
    server: {
      baseDir: "./"
    },
    notify: false,
    open: false,
    files: ["./js/*.js", "./style/*.css"]
  });
});

gulp.task("default", ["browser-sync"]);
