import gulp from 'gulp'
/** ts 编译 */
import typescript from 'gulp-typescript'
/** rollup typescript2 */
import rolluptypescript2 from 'rollup-plugin-typescript2'
/** rollup */
import rollupEach from 'gulp-rollup-each'
/** 编译es6 */
import babel from 'gulp-babel'
/** js 压缩 */
import uglify from 'gulp-uglify'
/** sass 编译 */
import sass from 'gulp-sass'
/** css 压缩 */
import csso from 'gulp-csso'
/** css 前缀补全 */
import autoprefixer from 'gulp-autoprefixer'
/** 重命名 */
import rename from 'gulp-rename'
/** sourceMaps */
import sourceMaps from 'gulp-sourcemaps'
/** 清理目录 */
import del from 'del'
import path from 'path'

/** 判断执行环境 */
const isProduction = process.env.NODE_ENV === 'production'

/** 项目根目录 */
const basePath = path.join(__dirname, 'src')
/** 临时输出目录 */
const tmpPath = path.join(__dirname, '.tmp')

/** 最终输出目录 */
const buildPath = path.join(__dirname, 'dist', 'assets')

/**
 * 编译css js 等  如果需要 压缩，先 编译到 .tmp目录下
 * 后 再压缩 到 dist 目录下
 */

/** 编译 scss */
gulp.task('compresSASS', () => {
  return gulp.src([
    `${basePath}/scss/**/*.scss`,
    `!${basePath}/scss/**/_*.scss`
  ])
  .pipe(sourceMaps.init())
  .pipe(sass.sync({ outputStyle: 'expanded' }).on('error', sass.logError))
  .pipe(autoprefixer())
  .pipe(sourceMaps.write('.'))
  .pipe(gulp.dest(`${tmpPath}/css`))
})

/**
 * 如果是工具包的话 直接打包成文件 js
 * 否则 按照 原来的目录输出 js
 * @example
 * `lib/index.ts --> lib.ts`
 * `home/sayhello.ts --> home/sayhello.ts`
 * @param {boolean} isLib
 */
function tsRename (isLib) {
  return rename((parsedPath) => {
    if (isLib) {
      parsedPath.basename = path.basename(parsedPath.dirname);
      parsedPath.dirname = path.dirname(parsedPath.dirname);
    }
    parsedPath.extname = '.js';
  });
}

/**
 * 编译typescript
 * rollup 打包编译
 */
gulp.task('CompileTS', () => {
  return gulp.src([
    `${basePath}/**/*.ts`
  ])
  .pipe(sourceMaps.init())
  .pipe(rollupEach({
    output: {
      format: 'amd'
    },
    plugins: [
      rolluptypescript2({
        tsconfig: `${basePath}/tsconfig.json`,
        cacheRoot: tmpPath
      })
    ],
  }))
  .pipe(tsRename(true))
  .pipe(sourceMaps.write('.'))
  .pipe(gulp.dest(`${buildPath}/js`))
})

/** 编译ES6 */
gulp.task('CompileES6', () => {
  return gulp.src(`${basePath}/js/**/*.mjs`)
    .pipe(sourceMaps.init())
    .pipe(babel({
      presets: [["@babel/env", { modules: 'amd' }]],
      plugins: [
        "@babel/plugin-transform-react-jsx",
        // ["@babel/plugin-transform-runtime", { helpers: true }],
        // "@babel/plugin-external-helpers",
        ["@babel/plugin-proposal-class-properties", { loose: true }],
      ],
    }))
    .pipe(rename({ extname: '.js' }))
    .pipe(sourceMaps.write('.'))
    .pipe(gulp.dest(`${tmpPath}/js`))
})

/** 压缩css */
gulp.task('compresCSS', () => {
  if (isProduction) {
    return gulp.src([
      `${basePath}/css/**/*.css`,
      `${tmpPath}/css/**/*.css`,
    ])
    .pipe(csso())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(`${buildPath}/css`))
  }
  return gulp.src([
    `${basePath}/css/**/*.css`,
    `${tmpPath}/css/**/*.css`,
    `${tmpPath}/css/**/*.map`,
  ])
  .pipe(gulp.dest(`${buildPath}/css`))
})

/** 压缩JS */
// gulp.task('compresJS', gulp.parallel([
//   'compresJS:js',
//   'compresJS:plugins',
//   'compresJS:lib'
// ]))

gulp.task('compresJS:js', () => {
  if (isProduction) {
    return gulp.src([
      `${basePath}/js/**/*.js`,
      `${tmpPath}/js/**/*.js`,
    ])
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(`${buildPath}/js`))
  }

  return gulp.src([
    `${basePath}/js/**/*.js`,
    `${tmpPath}/js/**/*.js`,
    `${tmpPath}/js/**/*.map`,
  ])
  .pipe(gulp.dest(`${buildPath}/js`))
})

gulp.task('compresJS:plugins', () => {
  if (isProduction) {
    return gulp.src([
      `${basePath}/plugins/**/*.js`,
      `${tmpPath}/plugins/**/*.js`,
    ])
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(`${buildPath}/plugins`))
  }

  return gulp.src([
    `${basePath}/plugins/**/*.js`,
    `${tmpPath}/plugins/**/*.js`,
    `${tmpPath}/plugins/**/*.map`,
  ])
  .pipe(gulp.dest(`${buildPath}/plugins`))
})

gulp.task('compresJS:lib', () => {
  if (isProduction) {
    return gulp.src([
      `${basePath}/lib/**/*.js`,
      `${tmpPath}/lib/**/*.js`,
    ])
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(`${buildPath}/lib`))
  }

  return gulp.src([
    `${basePath}/lib/**/*.js`,
    `${tmpPath}/lib/**/*.js`,
    `${tmpPath}/lib/**/*.map`,
  ])
  .pipe(gulp.dest(`${buildPath}/lib`))
})

/** 清理目录 */
gulp.task('clean', () => {
  return del('.tmp')
})

gulp.task('default', gulp.series([
  'clean',
  gulp.parallel(
    [
      gulp.series([
        'compresSASS',
        'compresCSS'
      ]),
      gulp.series([
        'CompileTS',
        'CompileES6',
        gulp.parallel([
          'compresJS:js',
          'compresJS:plugins',
          'compresJS:lib'
        ])
      ])
    ]
  )
]))
