require.config({
    baseUrl: '../js',
    paths: {
        jquery: ['http://libs.baidu.com/jquery/2.0.3/jquery', 'jquery-1.8.3.min'],

    }
});
require(['jquery'], function ($) {
<<<<<<< HEAD
=======
    // 跳转商城页面
    var shopping_link = document.querySelector(".shopping_link")
    shopping_link.click = function(){
        window.open("../samsungshop.html","_blank")
    }
>>>>>>> f0c015264d62545ebe26066e8e05409210619189
    //顶部按钮下方Div
    $('<div></div>').appendTo('.nav ul li a').css({
        'display': 'block', 'width': '0', 'height': '5px', 'background': '#162d9a', 'position': 'absolute',
        'bottom': '-27px',
        'left': '0px',
        'right': '0px',
        'margin': '0 auto', 'content': "",
        'z-index': 10
    });
    $('.nav ul li').on("mouseover", function () { //未来元素无效
        $(this).children().children('div').animate({ 'width': '100%' }, 'normal')
    });
    $('.nav ul li').on("mouseleave", function () { //未来元素无效
        $(this).children().children('div').animate({ 'width': '0' }, 'fast')
    });
    //活动按钮div
    $('<div class = "e_btn"></div>').appendTo('.eve_nav a').css({
        'display': 'block', 'width': '0', 'height': '5px', 'background': '#010101', 'position': 'absolute',
        'bottom': '-15px',
        'left': '0px',
        'right': '0px',
        'margin': '0 auto', 'content': ""
    });
    $('.eve_nav a').on("click", function () { //未来元素无效
        $(".e_btn").css('width', '0')
        $(this).children('div').animate({ 'width': '100%' }, 'normal')
    });
    //输入框边框变色
    $('.ipt').focus(function () {
        $(this).css({ "border-color": "#90bafe" })
    })
    $('.ipt').blur(function () {
        $('.ipt').css({ "border-color": "#fff" })
    })
    //回到顶部
    $('body').scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.z_btn').css('display', 'block');
        } else {
            $('.z_btn').css('display', 'none');
        }
    });
    $('.z_btn').click(function () {
        $('html,body').animate({ 'scrollTop': 0 }, 500);
        return false;
    });

    //最新活动左右移动
    $(".eve_nav a:first").click(function () {
        $(".eve_swiper").animate({ 'left': 0 }, 400)
    })
    $(".eve_nav a:eq(1)").click(function () {
        $(".eve_swiper").animate({ 'left': -1898 }, 400)
    })
    $(".eve_nav a:eq(2)").click(function () {
        $(".eve_swiper").animate({ 'left': -3796 }, 400)
    })
<<<<<<< HEAD
=======
    //活动上拉
    $('body').scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('#product').animate({ 'margin-bottom': 0 }, 500);
        } else if ($(this).scrollTop() < 200){
            $('#product').animate('margin-bottom','140px');
        }
        // console.log($('#product').css("margin-bottom"))
    });
>>>>>>> f0c015264d62545ebe26066e8e05409210619189
    //请求数据
    $.ajax({
        type: 'get',
        url: '../data/index.json',
        dataType: 'json',
        cache: false, //不使用缓存
        success: function (data) {
           //请求图片
            // console.log(data.bannerPic[0].imgurl)
            $('#eve_banner').css({ 'background': 'url(' + data.bannerPic[0].imgurl + ')no-repeat center', 'background-size': 'cover' });
            $('#rec_banner').css({ 'background': 'url(' + data.bannerPic[1].imgurl + ')no-repeat center', 'background-size': 'cover' });
            $('#eve_pro_banner').css({ 'background': 'url(' + data.bannerPic[2].imgurl + ')no-repeat center', 'background-size': 'cover' });
            //请求活动板块文字
            // console.log(data.evetag[0].na)
        $('#eve .eve_event .eve_b_right ul li:eq(0) p').html("&nbsp;"+data.evetag[0].na);
            $('#eve .eve_event .eve_b_right ul li:eq(0) span').html(data.evetag[0].slogan);
        $('#eve .eve_event .eve_b_right ul li:eq(1) p').html("&nbsp;"+data.evetag[1].na);
            $('#eve .eve_event .eve_b_right ul li:eq(1) span').html(data.evetag[1].slogan);
            $('#eve .eve_event .eve_b_right ul li:eq(2) p').html("&nbsp;"+data.evetag[2].na);
            $('#eve .eve_event .eve_b_right ul li:eq(2) span').html(data.evetag[2].slogan);
            $('#eve .eve_event .eve_b_right ul li:eq(3) p').html("&nbsp;"+data.evetag[3].na);
            $('#eve .eve_event .eve_b_right ul li:eq(3) span').html(data.evetag[3].slogan);
            //请求推荐板块文字
            $('#eve .eve_b_rec .eve_b_right ul li:eq(0) p').html("&nbsp;"+data.rectag[0].na);
            $('#eve .eve_b_rec .eve_b_right ul li:eq(0) span').html(data.rectag[0].slogan);
            $('#eve .eve_b_rec .eve_b_right ul li:eq(1) p').html("&nbsp;"+data.rectag[1].na);
            $('#eve .eve_b_rec .eve_b_right ul li:eq(1) span').html(data.rectag[1].slogan);
            $('#eve .eve_b_rec .eve_b_right ul li:eq(2) p').html("&nbsp;"+data.rectag[2].na);
            $('#eve .eve_b_rec .eve_b_right ul li:eq(2) span').html(data.rectag[2].slogan);
            $('#eve .eve_b_rec .eve_b_right ul li:eq(3) p').html("&nbsp;"+data.rectag[3].na);
            $('#eve .eve_b_rec .eve_b_right ul li:eq(3) span').html(data.rectag[3].slogan);
            //请求热销产品板块文字
            $('#eve .eve_b_pro .eve_b_right ul li:eq(0) p').html("&nbsp;"+data.protag[0].na);
            $('#eve .eve_b_pro .eve_b_right ul li:eq(0) span').html(data.protag[0].slogan);
            $('#eve .eve_b_pro .eve_b_right ul li:eq(1) p').html("&nbsp;"+data.protag[1].na);
            $('#eve .eve_b_pro .eve_b_right ul li:eq(1) span').html(data.protag[1].slogan);
            $('#eve .eve_b_pro .eve_b_right ul li:eq(2) p').html("&nbsp;"+data.protag[2].na);
            $('#eve .eve_b_pro .eve_b_right ul li:eq(2) span').html(data.protag[2].slogan);
            $('#eve .eve_b_pro .eve_b_right ul li:eq(3) p').html("&nbsp;"+data.protag[3].na);
            $('#eve .eve_b_pro .eve_b_right ul li:eq(3) span').html(data.protag[3].slogan);
        },
        
        error: function () {
            alert('请求失败');
        }
    });

})