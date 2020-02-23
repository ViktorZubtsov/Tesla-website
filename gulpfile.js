let gulp = require('gulp'),
      sass = require('gulp-sass'),
      sourcemaps = require('gulp-sourcemaps'),
      pug = require('gulp-pug'),
      fontmin = require('gulp-fontmin'),
      browserSync = require("browser-sync"),
      debug = require('gulp-debug'),
      del = require('del'),
      cleanCSS = require('gulp-clean-css'),
      image = require('gulp-image'),
      minify = require('gulp-minify'),
      autoprefixer = require('gulp-autoprefixer'),
      spritesmith = require('gulp.spritesmith'),
      concat = require('gulp-concat');



//   1. directories
//   2. dev
//   3. build


gulp.task('directories', function () {
  return gulp.src('*.*', {read: false})
    .pipe(gulp.dest('./src/pages'))
    .pipe(gulp.dest('./src/img'))
    .pipe(gulp.dest('./src/img/sprite'))
    .pipe(gulp.dest('./src/fonts'))
    .pipe(gulp.dest('./src/js'))
    .pipe(gulp.dest('./src/lib'))
    .pipe(gulp.dest('./src/modules'))
    .pipe(gulp.dest('./src/sass'))
    .pipe(gulp.dest('./src/sass/base'))
    .pipe(gulp.dest('./src/sass/component'))
    .pipe(gulp.dest('./src/sass/layout'));
});

//  2. dev

gulp.task('html', function() {
  return gulp.src(["./src/*.html", "./src/pages/*.html"])
    .pipe(debug({title: 'html'}))
    .pipe(gulp.dest("./public"));
});

gulp.task('pug', function() {
  return gulp.src(["./src/index.pug", "./src/pages/*.pug"])
    .pipe(pug({pretty: '\t'}))  // generate file pug
    .pipe(pug())
    .pipe(debug({title: 'build-pug'}))
    .pipe(gulp.dest("./public"));
});

sass.compiler = require('node-sass');
gulp.task('sass', function () {
  return gulp.src('./src//sass/**/style.sass')
    .pipe(debug({title: 'src'}))
    .pipe(sourcemaps.init())  
    .pipe(sass().on('error', sass.logError))
    .pipe(debug({title: 'sass'}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/css'));
});

gulp.task('clean', function () {
  return del('./public');
});

gulp.task('js', function() {
  return gulp.src('./src/js/*.js')
    .pipe(concat('script.js'))
    .pipe(debug('js'))
    .pipe(gulp.dest('./public/js'));
});

gulp.task('fonts', function () {
  return gulp.src('src/fonts/*.ttf')
    .pipe(fontmin({
        text: 'text',
    }))
    .pipe(debug('fonts'))
    .pipe(gulp.dest('./public/fonts'));
});

gulp.task('image', function () {
  return gulp.src(['./src/img/*.png', './src/img/*.svg', './src/img/*.jpg'])
    .pipe(image())
    .pipe(debug({title: 'image'}))
    .pipe(gulp.dest('./public/img'));
});

gulp.task('sprite', function() {
  let spriteData = 
      gulp.src('./src/img/sprite/*.*') 
          .pipe(spritesmith({
              imgName: 'sprite.png',
              cssName: '_sprite.sass',
              padding: 10,
              imgPath: '../img/sprite.png',
          }));
  spriteData.img.pipe(gulp.dest('./public/img')); 
  spriteData.css.pipe(gulp.dest('./src/sass/base')); 
  return spriteData;
});

gulp.task('lib', function copy() {
  const { src, dest } = require('gulp');
    return src('./src/lib/*')
      .pipe(dest('./public/lib/'));
});



gulp.task('relation', gulp.series (
  `clean`,
  gulp.parallel( 'html', `sass`, `js`, 'fonts' , 'image', 'sprite' ,'lib')
));

gulp.task('relation+pug', gulp.series (
  `clean`,
  gulp.parallel( 'pug', `sass`, `js`, 'fonts' , 'image', 'sprite' ,'lib')
));


gulp.task('watch', function () {
  gulp.watch(`./src/**/index.html`, gulp.series(`html`))
  gulp.watch(`./src/pages/*.html`, gulp.series(`html`))
  gulp.watch(`./src/**/index.pug`, gulp.series(`pug`))
  gulp.watch(`./src/pages/*.pug`, gulp.series(`pug`))
  gulp.watch(`./src/modules/*.pug`, gulp.series(`pug`))
  gulp.watch(`./src/sass/**/*.sass`, gulp.series(`sass`))
  gulp.watch(`./src/js/**/*.js`, gulp.series(`js`))
  gulp.watch(`./src/fonts/**/*.ttf`, gulp.series(`fonts`)) 
  gulp.watch(`./src/img/*`, gulp.series(`image`)) 
  gulp.watch(`./src/img/sprite/*`, gulp.series(`sprite`)) 
  gulp.watch(`./src/lib/*`, gulp.series(`lib`)) 
});

gulp.task('serve', function () {
  browserSync.init({
    server: `../Tesla website/public`
  });
  browserSync.watch(`../Tesla website/**/*.*`).on(`change`, browserSync.reload);
});

// basic command

gulp.task('dev',
  gulp.series (`relation`, gulp.parallel(`watch`, 'serve')));

gulp.task('dev+pug',
  gulp.series (`relation+pug`, gulp.parallel(`watch`, 'serve')));





//  3. build

gulp.task('build-pug', function() {
  return gulp.src(["./src/index.pug", "./src/pages/*.pug"])
    .pipe(pug({pretty: '\t'}))  // generate file pug
    .pipe(pug())
    .pipe(debug({title: 'build-pug'}))
    .pipe(gulp.dest("./build"));
});

gulp.task('pages-html', function() {
  return gulp.src("./src/pages/*.html")
    .pipe(debug({title: 'build-html'}))
    .pipe(gulp.dest("./build"));
});


gulp.task('build-html', function() {
  return gulp.src(["./src/index.html", "./src/pages/*.html"])
    .pipe(debug({title: 'build-html'}))
    .pipe(gulp.dest("./build"));
});

gulp.task('compress-sass', function () {
  return gulp.src('./src//sass/**/style.sass')
    .pipe(debug({title: 'src'}))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./build/css'))
    .pipe(autoprefixer({
        cascade: false
  }))
  .pipe(cleanCSS({compatibility: 'ie8'}))
  .pipe(debug({title: 'compress-sass'}))
  .pipe(gulp.dest('./build/css'));
});
 
gulp.task('build-image', function () {
  return gulp.src('./src/img/*.png', './src/img/*.svg', './src/img/*.jpg')
    .pipe(image())
    .pipe(debug({title: 'build-image'}))
    .pipe(gulp.dest('./build/img'));
});
 
gulp.task('build-sprite', function() {
  var spriteData = 
      gulp.src('./src/img/sprite/*.*') 
          .pipe(spritesmith({
              imgName: 'sprite.png',
              cssName: '_sprite.sass',
              padding: 10,
              imgPath: '../img/sprite.png',
          }));

  spriteData.img.pipe(gulp.dest('./build/img')); 
  spriteData.css.pipe(gulp.dest('./src/sass/base')); 

  return spriteData;
});

gulp.task('compress-js', function() {
  return gulp.src(['./src/js/*.js', './src/js/*.mjs'])
    .pipe(concat('script.js'))
    .pipe(minify())
    .pipe(debug({title: 'compress-js'}))
    .pipe(gulp.dest('./build/js'));
});

gulp.task('build-fonts', function () {
  return gulp.src('src/fonts/*.ttf')
    .pipe(fontmin({
        text: 'text',
    }))
    .pipe(debug({title: 'build-fonts'}))
    .pipe(gulp.dest('./build/fonts'));
});

gulp.task('build-clean', function () {
  return del('./build')
});


gulp.task('build-lib', function copy() {
  const { src, dest } = require('gulp');
    return src('./src/lib/*')
      .pipe(dest('./build/lib/'));
});


gulp.task('build', gulp.series (
  `build-clean`,
  gulp.parallel(`build-html`, `compress-sass`, 'build-image', 'build-sprite', 'compress-js', 'build-fonts', 'build-lib')
));

gulp.task('build+pug', gulp.series (
  `build-clean`,
  gulp.parallel(`build-pug`,  `pages-html`, `compress-sass`, 'build-image', 'build-sprite', 'compress-js', 'build-fonts', 'build-lib')
));









