
const buildTarget = './build/Understanding Reactive Programming.md';

const fs          = require('fs'),
      execSync    = require('child_process').execSync;

const gulp        = require('gulp'),
      del         = require('del');

const md_files    = require('./md/sequence.json'),
      divider     = require('./md/divider.json');





gulp.task('clean', function(done) {
    del(['./build', './dist']).then(() => done());
});





gulp.task('assemble', ['clean'], function(done_cb) {

    fs.mkdirSync('./build');

    fs.writeFileSync(buildTarget, md_files.map(md => fs.readFileSync(md)).join(divider));

    done_cb();

});





gulp.task('html', ['assemble', 'clean'], function() {

    const hOpen  = '<!DOCTYPE html><html><title>Understanding Reactive Programming</title><xmp theme="united" style="display:none;">',
          hClose = '</xmp><script src="http://strapdownjs.com/v/0.2/strapdown.js"></script></html>';

    fs.mkdirSync('./dist');
    fs.writeFileSync('./dist/index.html', hOpen + fs.readFileSync(buildTarget) + hClose);

    return gulp.src(['./node_modules/strapdown/dist/**/*'])
      .pipe(gulp.dest('./dist'));

});





gulp.task('default', ['assemble', 'html']);





gulp.task('deploy', ['default'], function(done_cb) {

    execSync('git subtree push --prefix dist origin gh-pages');
    done_cb();

});
