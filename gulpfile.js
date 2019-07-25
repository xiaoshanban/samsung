// 加载需要的包
var gulp = require('gulp');
// var concat = require('gulp-concat');
// var minify = require('gulp-minify-css');
// var uglify = require('gulp-uglify');
// var imagemin = require('gulp-imagemin');

// var concat = require('gulp-concat');
// var minify = require('gulp-minify-css');
// var uglify = require('gulp-uglify');
// var imagemin = require('gulp-imagemin');
var server = require('browser-sync').create();//执行函数返回服务对象
var load = require('gulp-load-plugins')();//其他gulp插件都集合在load对象上



// gulp.task('default',function (){//默认任务: gulp
//     console.log('hello world');
// })


// gulp.task('mytask',function (){//执行定义的任务: gulp mytask
//     console.log('执行mytask任务');
// })


// gulp.task('task1',function (){
//     console.log('执行task1任务');
// })
// gulp.task('task2',function (){
//     console.log('执行task2任务');
// })
// gulp.task('task',['task1','task2'],function (){//有依赖任务列表
//     console.log('执行task任务');
// })


// gulp.task('default',['task','task1','task2'],function (){//执行多任务
//     console.log('执行task任务');
// })


// 先执行当前任务，再执行依赖任务（有异步代码）
// gulp.task('task1',function (){
//     setTimeout(function (){
//         console.log('执行task1任务');
//     },2000);
// })
// gulp.task('task2',['task1'],function (){
//     console.log('执行task2任务');
// })


// 先执行依赖任务，再执行当前任务
// gulp.task('task1',function (done){
//     setTimeout(function (){
//         console.log('执行task1任务');
//         done();//告诉当前任务，依赖任务执行完成了
//     },4000);
// })
// gulp.task('task2',['task1'],function (){
//     console.log('执行task2任务');
// })


// gulp.task('task1',function (){
//     gulp.src('./a.js')// 读取1文件
//     gulp.src(['./a.js','./b.js'])// 读取2文件
//     gulp.src('**/*.css')// 读取根目录下的所有css文件
//     gulp.src('css/*.css')//读取css目录下的所有css文件
// });


// gulp.task('mytask',function (){
//     gulp.src('css/*.css')//读取css目录下的所有css文件
//     .pipe(gulp.dest('./dist/'))// 把读取到的文件写入dist目录
// });


// gulp.task('change',function (){
//     console.log('监视的文件有变动');
// })
// gulp.task('listen',function (){
//     gulp.watch('css/*.css',['change']);
// })


// gulp.task('listen',function (){
//     gulp.watch('css/*.css',function (event){
//         console.log('监视的文件有变动');
//         console.log(event.type);//变动的类型：added为新增，deleted为删除，changed为改变
//     });
// })



// 合并文件（js css）
gulp.task('concat',function (){
    gulp.src('css/*.css')
    .pipe(load.concat('main.css'))//合并文件
    .pipe(gulp.dest('./dist/'))
});

// 合并压缩文件
gulp.task('minifyCss',function (){
    gulp.src('css/*.css')
    .pipe(load.concat('main.min.css'))//合并
    .pipe(load.minify())//压缩
    .pipe(gulp.dest('./dist/'))
})

// 压缩js文件
gulp.task('uglifyJS',function (){
    gulp.src('js/*.js')
    .pipe(load.uglify())//压缩
    .pipe(gulp.dest('./dist/'))
})

// 压缩图片
gulp.task('imagemin',function (){
    gulp.src(['./img/*.png','./img/*.jpg'])
    .pipe(load.imagemin())// 压缩图片
    .pipe(gulp.dest('./dist/img/'))
});

// 自动刷新
gulp.task('server',function (){
    server.init({
        server: './',
        port: 3002
    });
    gulp.watch(['./*.html','./css/*.css','./js/*.js']).on('change',server.reload)
});

