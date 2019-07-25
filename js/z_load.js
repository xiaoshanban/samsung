
define(['jquery'],function($){
   return function(code){
    var $list1 = $('.z_little_imglist1 img');
    var $list2 = $('.z_little_imglist2 img');
    var $price = $('.z_price_title p');
    var $price1 = $('.z_price_title h2');
    var $none = $('.z_none');
    var $color = $('.z_class_color li:nth-child(1)').text();
    var $ram = $('.z_spe li:nth-child(1)').children().eq(0).text();;
    var $ver = $('.z_edition li:nth-child(1)').text();;
    var num = code;
    //放大镜
   $('.z_little').bind('mouseenter',function(e){
       e.stopPropagation();
       $('.z_masking').css({'display':'block','cursor':'crosshair',width:188,height:188});
       $('.z_bigImg').width(900);
       $('.z_large').animate({
            left:600,
            top:190,
            opacity:1,
            width:400,
            height:400
       },400);
   });

   $('.z_little').bind('mouseleave',function(e){
      e.stopPropagation();
       $('.z_masking').css({'display':'none'});
       $('.z_large').animate({
            left:300,
            top:370,
            opacity:0,
            width:0,
            height:0
     },400);
   });


   $('.z_little').mousemove(function(e){
        var $thisL = $(this).offset().left;
        var $thisT = $(this).offset().top;
        var $l = e.pageX - $thisL - $('.z_masking').width()/2;
        var $t = e.pageY - $thisT - $('.z_masking').width()/2;
        var $maxL = $(this).width() - $('.z_masking').width();
        var $maxT = $(this).height() - $('.z_masking').height();
        $l = $l < 0 ? 0 : ($l > $maxL ? $maxL : $l);
        $t = $t < 0 ? 0 : ($t > $maxT ? $maxT : $t);
        $('.z_masking').css({
            left:$l,
            top:$t
        });
        var $bigImgLeft = $l * ($('.z_bigImg').width() - $('.z_large').width()) / ($(this).width() - $('.z_masking').width());
		var $bigImgTop = $t * ($('.z_bigImg').height() - $('.z_large').height()) / ($(this).height() - $('.z_masking').height());
       
        
        $('.z_bigImg').css({
            left:-$bigImgLeft,
            top:-$bigImgTop
        });
    });
    var box = document.querySelector('.z_little');
    var bigImg = document.querySelector('.z_bigImg');
    
    
    document.querySelector('.z_masking').onmousewheel = function(event) {
        var dir = event.wheelDelta > 0 ? 'Up' : 'Down';
        if (dir == 'Up') {
            if($(this).width() <= 188){
                $(this).width(188);
                $(this).height(188);
            }else{
                $(this).css({
                    width:$(this).width()-10,
                    height:$(this).height()-10
                    
                 });
                 $('.z_bigImg').css('width',$('.z_bigImg').width()+21);
                 var l = event.pageX - box.offsetLeft - this.offsetWidth/2;
                 var t = event.pageY - box.offsetTop - this.offsetHeight/2;
                 this.style.left = l+'px';
                 this.style.top = t+'px';
                 var $bigImgLeft = l * ($('.z_bigImg').width() - $('.z_large').width()) / ($('.z_little').width() - $('.z_masking').width());
                 var $bigImgTop = t * ($('.z_bigImg').height() - $('.z_large').height()) / ($('.z_little').height() - $('.z_masking').height());
                
                 $('.z_bigImg').css({
                     left:-$bigImgLeft,
                     top:-$bigImgTop
                 });
            }
        } else {
           if($(this).width() >= 378){
                $(this).width(378);
                $(this).height(378);
           }else{
                $(this).css({
                    width:$(this).width()+10,
                    height:$(this).height()+10

                });
                $('.z_bigImg').css('width',$('.z_bigImg').width()-21);
                var l = event.pageX - box.offsetLeft - this.offsetWidth/2;
                var t = event.pageY - box.offsetTop - this.offsetHeight/2;
                this.style.left = l+'px';
                this.style.top = t+'px';
                var $bigImgLeft = l * ($('.z_bigImg').width() - $('.z_large').width()) / ($('.z_little').width() - $('.z_masking').width());
                var $bigImgTop = t * ($('.z_bigImg').height() - $('.z_large').height()) / ($('.z_little').height() - $('.z_masking').height());
               
                $('.z_bigImg').css({
                    left:-$bigImgLeft,
                    top:-$bigImgTop
                });
           }
          
        }
        return false;

    }


    $('.z_spe').on('click','li',function(){
        $(this).siblings().css('border-color', '#eee');
        $(this).css('border-color', '#1428a0');
        $ram = $(this).children().eq(0).text();
        $price1.html($(this).children().eq(1).text());
        $price.html($color + ' +  '+ $ram + ' + ' + $ver);
        
   });
   

   $('.z_edition').on('click','li',function(){
        $(this).siblings().css('border-color', '#eee');
        $(this).css('border-color', '#1428a0');
        $ver =  $(this).text();
        $price.html($color + ' +  '+ $ram + ' + ' + $ver);
   });
   
   $('.z_class_gift').on('click','li',function(){
        $(this).siblings().css('border-color', '#eee');
        $(this).css('border-color', '#1428a0');
        var index = $(this).index();
        $none.eq(index).siblings().css('display', 'none');
        $none.eq(index).toggle();
        return false;
   });

   $(document).click(function(){
        $none.css('display', 'none');
   });




   var falg = 0;
    $('.z_class_color').on('click','li',function(){
        var index = $(this).index();
        falg = index;
        var $this = $(this);
        var $text = $this.text();
        $this.siblings().css('border-color', '#eee');
        $this.css('border-color', '#1428a0');
        $('.z_bigImg').attr('src','img/z_'+num+'max'+falg2+'_'+index+'.jpg');
        $.each($list1,function(j,v){
            $(v).attr('src','img/z_'+num+'min'+j+'_'+falg+'.jpg');
            $list2.eq(j).attr('src','img/z_'+num+'min'+j+'_'+falg+'.jpg');
        });
        $color = $text;
        $price.html($color + ' +  '+ $ram + ' + ' + $ver);

    });


    var falg2 = 0;
    $('.z_little_imglist2').on('click','li',function(){
        var index = $(this).index();
        falg2 = index;
        $('.z_little_imglist1').css('top',-425*index);
        $(this).siblings().css('border-color', '#fff');
        $(this).css('border-color', '#1428a0');
        $('.z_bigImg').attr('src','img/z_'+num+'max'+index+'_'+falg+'.jpg');
    });


    var index = 0;
    $('.z_list_left').css({
        'cursor':'not-allowed',
        'color':'#eee'
    });

    $('.z_list_right').click(function(event){
        window.getSelection().removeAllRanges();
        $('.z_list_left').css({
            'cursor':'pointer',
            'color':'rgb(116, 114, 114)'
        });
        if(index == 3){
            return false;
        }else{
            index++;
        }
        $('.z_little_imglist2').animate({left:-120*index});
        if(index == 3){
            $(this).css({
                'cursor':'not-allowed',
                'color':'#eee'
            });
        }
    });
    
    
    $('.z_list_left').click(function(event){
        window.getSelection().removeAllRanges();
        $('.z_list_right').css({
            'cursor':'pointer',
            'color':'rgb(116, 114, 114)'
        });
        if(index == 0){
            return false;
        }else{
            index--;
        }
        $('.z_little_imglist2').animate({left:-120*index});
        if(index == 0){
            $(this).css({
                'cursor':'not-allowed',
                'color':'#eee'
            });
        }
    });



    //跳转
    $('.z_nav').click(function(){
        var index = $('.z_nav').index($(this));
        $('.z_nav').css({'border-color':'transparent',color:'#333','font-weight':'normal'});
        $(this).css({'border-color': '#1428a0',color:'#1428a0','font-weight':'bold'});
        var $top = $('.z_gund').eq(index).offset().top;
        $('html,body').animate({'scrollTop':$top},600);
    });



    // 隐藏
    $('.z_kaig').click(function(){
        switch($(this).html()){
            case '-':
                $(this).html('+');
                break;
            case '+':
                $(this).html('-');
        }
        $('.z_more').toggle();
        return false;
    });

    $(window).scroll(function(){
        if( $(this).scrollTop() > 200){
            $('.z_btn').css('display','block');
        }else{
            $('.z_btn').css('display','none');
        }
    });

    $('.z_btn').click(function(){
        $('html,body').animate({'scrollTop':0},500);
        return false;
    });
}
});