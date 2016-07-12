
const fs       = require('fs');

const gulp     = require('gulp'),
      del      = require('del');

const md_files = require('./md/sequence.json'),
      divider  = require('./md/divider.json');





gulp.task('clean', function(done) {
    del(['./build']).then(() => done());
});





gulp.task('assemble', ['clean'], function() {

    fs.mkdirSync('./build');

    fs.writeFileSync(
        './build/Understanding Reactive Programming.md',
        md_files.map(md => fs.readFileSync(md)).join(divider)
    );

});





gulp.task('default', ['assemble']);
