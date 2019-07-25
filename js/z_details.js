
require.config({
    baseUrl: 'js',
    paths: {
        jquery: ['jquery-1.8.3.min'],
        load:'z_load',
        data:'z_data'
    }
});

require(['jquery','data','load'],function($,data,load){
    var xh = localStorage.getItem('goods') ?  localStorage.getItem('goods') : 'S10';
    $('.z_header').load('html/head.html');
    $('.z_footer').load('html/foot.html');
    $.ajax({
        type:'get',
        dataType:'json',
        url:'data/details.json',
        cache:false,
        success:function(json){
            var code = json[xh].code;
            data(json,xh);
            load(code);
        },
        error:function(code){
            console.log(code);
        }
    });
    
});