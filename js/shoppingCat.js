
require.config({
    baseUrl:'js',
    paths:{
        'jquery': ['http://libs.baidu.com/jquery/2.0.3/jquery','jquery-2.1.4.min']
    }
});

require(['jquery'],function($,){

    //从这里开始操作login中的Dom
    
    $('h2').click(function (){
        alert($(this).text());
       
    }); //模块化开发这个方式,模板
    
    // $('form').validate();
    
    // console.log(m1.attr);  //结果: 123
    // console.log(m1.ghj);  //结果:20

    // m2.fun(); //执行函数
    // header($('#header'));
    //渲染出来了 标题1 标题2

});


import{loadData1}from './ajax.js';
$(function (){
    // 加载数据
    loadData1();
    
    // // 加入购物车
    // addShoppingCart();
})



