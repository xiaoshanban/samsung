require.config({
    baseUrl:'js',
    paths:{
        'jquery': ['http://libs.baidu.com/jquery/2.0.3/jquery','jquery-2.1.4.min']
    }
});

require(['jquery'],function($){

    //从这里开始操作login中的Dom
    
    // $('h2').click(function (){
    //     alert($(this).text());
       
    // }); //模块化开发这个方式,模板
    
    // $('form').validate();
    
    /*=======================tel go=======================*/ 
    $('.tel').focus(function(){
        $('.s_text1').css({
            color:'#1428a0',
            fontSize:"12px",
        })
        $('.tel').css({
            height:'60px',
            color:'#1428a0',
            borderBottom: '2px solid #1428a0'
        })

        $('.tel').blur(function(){
            $('.tel').css({
                height:'20px',
                borderBottom: '1px solid #DDD'
            });
            $('.s_text1').css({
                color:'#767676',
                fontSize:"20px",
            });

        })


    });
    /*=======================tel End=======================*/ 


    /*=======================pass go=======================*/ 
    $('.pass').focus(function(){
        $('.s_text2').css({
            color:'#1428a0',
            fontSize:"12px",
        })
        $('.pass').css({
            height:'60px',
            borderBottom: '2px solid #1428a0',
            color:'#1428a0',
        })

        $('.pass').blur(function(){
            $('.pass').css({
                height:'20px',
                borderBottom: '1px solid #DDD'
            });
            $('.s_text2').css({
                color:'#767676',
                fontSize:"20px",
            });

        })


    });
    /*=======================pass End=======================*/ 

    /*=======================yanzhengma go=======================*/ 
    $('.yanzhengma').focus(function(){
        $('.s_text3').css({
            color:'#1428a0',
            fontSize:"12px",
        })
        $('.yanzhengma').css({
            height:'60px',
            color:'#1428a0',
            borderBottom: '2px solid #1428a0'
        })

        $('.yanzhengma').blur(function(){
            $('.yanzhengma').css({
                height:'20px',
                borderBottom: '1px solid #DDD'
            });
            $('.s_text3').css({
                color:'#767676',
                fontSize:"20px",
            });

        })


    });
    /*=======================yanzhengma End=======================*/ 


    /*=======================pass Eut1=======================*/ 
    $('.but1').click(function(){
        $('#s_icon').css({
            display:'block',
        });
        $('.but1').css({
            background:'#1428A0',
            border:'2px solid #4D90FE'
        });
       
        $('.but1').click(function(){
            $('.but1').css({
                background:'#DDD',
                border:'2px solid #BDC3C9'
            });
            $('#s_icon').css({
                display:'none',
            });

            $('.but1').click(function(){
                $('.but1').css({
                    background:'#1428A0',
                    border:'2px solid #4D90FE'
                });
            });
        });


    });
    /*=======================pass but1 End=======================*/ 

  
    $('.s_btn').click(function () {
       
       var  reg_phone = localStorage.getItem("reg_phone");
       var  reg_pwd = localStorage.getItem("reg_pwd");

       console.log(localStorage.getItem("reg_phone"));
       console.log(localStorage.getItem("reg_pwd"));
       
      var tel_val = $('.tel').val();
      var pass_val = $('.pass').val();

       if((reg_phone==tel_val) && (pass_val==reg_pwd)){
        $.ajax({
            url: 'data/text1.txt',
            type: 'get',
            // data: 'user='+$('.user').val()+'&pass='+$('.pass').val().....,
            data: $('form').serialize(),//序列化成可提交的数据
            cache: false,//不使用缓存
            dataType: 'text',
            success: function (data) {
                $('.con').text(data);
                alert('登入成功');
            //   登入成功进入首页
			location.href = "samsungeshop.html";
            }
        });
   
       }else{
        alert('账号有误');
        return false;
       }
       
    });


});