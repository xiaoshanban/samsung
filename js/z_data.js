define(['jquery'],function($){
    return function(json,xh){
        $('.z_title').html(json[xh].type);
        $.each(json[xh].color,function(i,v){
            var $color = '<li><i style="background: '+v.rgb+'"></i>'+v.type+'</li>';
            $('#z_color').append($color);
        });
        $.each(json[xh].memory,function(i,v){
            var $memory = '<li><em>'+v.ram+'<br>'+v.rom+'<br></em><em>'+v.price+'</em></li>';
            $('.z_spe').append($memory);
        });
        $.each(json[xh].edition,function(i,v){
            var $edition = '<li>'+v+'</li>';
            $('.z_edition').append($edition);
        });
        $('.z_price_title p').html(json[xh].color[0].type+' + '+json[xh].memory[0].ram+' '+json[xh].memory[0].rom+' + '+json[xh].edition[0]);
        $('.z_price_title h2').html(json[xh].memory[0].price);
        $('.z_series').html(json[xh].series);
        $('.z_Box').css('background',json[xh].back);
        if(json[xh].code == '10'){
            $.each($('.z_imgbox img:even'),function(i,v){
                $(v).attr('src','img/z_c_'+i+'.png');
            });
            $.each($('.z_imgbox img:odd'),function(i,v){
                $(v).attr('src','img/z_c_'+i+'.jpg');
            });
        }else{
            $('.z_text_list ul li:nth-child(1)').remove();
            $.each($('.z_imgbox img:odd'),function(i,v){
                $(v).attr('src','img/z_b_'+i+'.jpg');
            });
        }
        $.each($('.z_test li'),function(i,v){
            var $ind = $(v).index();
            $(v).children().attr('src','img/z_'+json[xh].code+'min'+$ind+'_0.jpg');
            
        });
        $('.z_bigImg').attr('src','img/z_'+json[xh].code+'max0_0.jpg');
    }
});