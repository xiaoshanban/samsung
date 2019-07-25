$(function(){
// banner 的轮播图
  var mySwiper1 = new Swiper ('.swp1', {
        loop: true, // 循环模式选项
        autoplay:true,
        simulateTouch : false,//禁止鼠标模拟
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
          bulletActiveClass: 'my-bullet-active',
          clickable :true,
        }
  }); 
// 活动专区轮播图
var mySwiper3 = new Swiper ('.swp3', {
      loop: true, // 循环模式选项
      autoplay:true,
      
      simulateTouch : false,//禁止鼠标模拟
      // 如果需要分页器
      pagination: {
        el: '.swiper-pagination',
        bulletActiveClass: 'my-bullet-active',
        clickable :true,
      }
});   
 


  // swiper添加的事件
    mySwiper1.el.onmouseover = function(){
        mySwiper1.autoplay.stop();
    };
    mySwiper1.el.onmouseleave = function(){
        mySwiper1.autoplay.start();
    };

  //配件自动切换选项卡 
    $('.tabs').tabslet({
      active:0,           //第几个选项卡开始
      autorotate:true,    //设置自动切换效果
      delay:5000,         //设置切换时间
      animation: true,    //设置过渡效果
      controls: {         //设置左右按钮控制选项卡切换
        prev: '.prev',
        next: '.next'
      }
    });

    //网页吸顶
    var nav =$('.y_header');
    var win= $(window);
    var sc = $(document);
    win.scroll(function(){
      if(sc.scrollTop() >= 36 ){
        nav.css({"position" :'fixed' , "top" : "0" , "z-index":"100"});
      }else{
        nav.css("position" , "relative");
      }
    });

    //返回顶部
    $("#returnTop").click(function () {
      var speed=200;//滑动的速度
      $('body,html').animate({ scrollTop: 0 }, speed);
      return false;
    });

    // 在线咨询窗口弹出关闭
    $('.y_consultation').click(function(){
      $('.y_consultation_inner').css({"display":"block"});
      $('.y_consultation').css({"display":"none"});
      $('.inclose').click(function(){
        $('.y_consultation_inner').css("display","none");
        $('.y_consultation').css({"display":"block"});
      })
    })

    //拖拽方法
    $(document).on("mousedown",".y_consultation_inner",function(e){
      var el=$(this);
          var os = el.offset(); 
          dx = e.pageX-os.left, 
          dy = e.pageY-os.top;
          $(document).on('mousemove.drag', function(e){ 
            el.offset({top: e.pageY-dy, left: e.pageX-dx}); 
        });
        $(document).on("mouseup",".y_consultation_inner",function(e){
         
            $(document).off('mousemove.drag'); 
        });
        return false;
    });
  
 

    //在最顶部 返回顶部效果隐藏
    $(document).scroll(function(){
      var  scrollTop =  $(document).scrollTop();
      var  bodyHeight = $(window).height();
      if(scrollTop > bodyHeight){
          $(".y_retruntop").show();
      }else{
          $(".y_retruntop").hide();
      }
  });
    
  
  //二级导航 显示模块
  $('.y_nav_menu').hover(function(){
    $(this).find(".y_submenus").stop().slideToggle(200)
  });

  // 热销块 点击记录code值
  $('.y_hot_product').on('click', 'div img',function(){
    
    var code = $(this).parent().attr('code');
       
        localStorage.setItem('goods',code);
        location.href = 'details.html';
  });

    //获取本周热销模块数据
    $.ajax({
      url:'data/y_json.json',
      type:'get',
      dataType: 'json',
      cache: false,
      success :function(data){
        //热销模块
        var result1 = '';
        $.each(data.hot_product,function(index,item){
          result1 += '<div class="y_hp_list" code = "'+item.code+'"><img src="'+item.imgurl+'"><h3>'+item.title+'</h3><p>'+item.descrip+'</p><p class="sspan">'+item.price+'<del>'+item.del+'<del></p></div>';
        })
        $('.y_hot_product').html(result1);

        // 推荐模块1
        var result2 = '';
        $.each(data.recommend_product1,function(index,item){
          result2 += ' <div class="y_tabs_info"><a href="#"><img src="'+item.imgurl+'"></a><h4>'+item.title+'</h4><p>'+item.descrip+'</p><span>'+item.price+'<del>'+item.del+'</del></span></div>';
        })
        $('.y_recomm1').html(result2);

        // 推荐模块2
        var result3 = '';
        $.each(data.recommend_product2,function(index,item){
          result3 += ' <div class="y_tabs_info"><a href="#"><img src="'+item.imgurl+'"></a><h4>'+item.title+'</h4><p>'+item.descrip+'</p><span>'+item.price+'<del>'+item.del+'</del></span></div>';
        })
        $('.y_recomm2').html(result3);

        // 推荐模块3
        var result4 = '';
        $.each(data.recommend_product3,function(index,item){
          result4 += ' <div class="y_tabs_info"><a href="#"><img src="'+item.imgurl+'"></a><h4>'+item.title+'</h4><p>'+item.descrip+'</p><span>'+item.price+'<del>'+item.del+'</del></span></div>';
        })
        $('.y_recomm3').html(result4);

        // 推荐模块4
        var result5 = '';
        $.each(data.recommend_product4,function(index,item){
          result5 += ' <div class="y_tabs_info"><a href="#"><img src="'+item.imgurl+'"></a><h4>'+item.title+'</h4><p>'+item.descrip+'</p><span>'+item.price+'<del>'+item.del+'</del></span></div>';
        })
        $('.y_recomm4').html(result5);



      }
    })
  
  




});






