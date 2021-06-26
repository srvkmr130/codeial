const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));// minify the css --->   temp.min.css    in this format
const cssnano = require('gulp-cssnano'); // converts css into one line
const rev = require('gulp-rev'); // associate hash(randon key) with the file name so browser reloadsthe entire asset this prevents loading from cache

const uglify = require('gulp-uglify-es').default;
const imagemin = require('gulp-imagemin');
const del = require('del');

gulp.task('css',function(done){
    console.log('*************************************');
    console.log('1. Minifying css...');
    gulp.src('./assets/sass/**/*.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest('./assets.css'));

     gulp.src('./assets/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
})

gulp.task('js',function(done){
    console.log('*************************************');
    console.log('2. Minifying js...');
    gulp.src('./assets/**/*.js')
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd:'public',
        merge:true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});

gulp.task('images',function(done){
    console.log('*************************************');
    console.log('3. Minifying images...');
    gulp.src('./assets/**/*.+(png|jpg|gif|svg|jpeg')
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd:'public',
        merge:true
    }));
    done();
});

// Empty the public/assets directory
gulp.task('clean:assets',function(done){
    console.log('*************************************');
    console.log('0. PRE-REQ - Deleting existing assets directory');
    del.sync('./public/assets');
    done();
});

// pipeline - created build defination
gulp.task('build', gulp.series('clean:assets','css','js','images'),function(done){
    console.log('Building tasks....');
    done();
}) 