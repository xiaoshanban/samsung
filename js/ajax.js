export function loadData1() {
    // 加载数据
    $.ajax({
        type: 'get',
        url: './data/shoppingCat.json',
        dataType: 'json',
        success: function (data) {
            var results = '';
            $.each(data,function (index,value) {
                results += '<div class="s_col_goods"><img class="s_col_img" src="'+value.imgurl+'" alt=""><h2>'+value.title+'</h2><p>'+value.price+'</p><a href="#"class="a_shoppcart">加入购物车</a></div>';
            });
            $('.s_new-recommend-list-cen').html(results);
        }
    });

    
}





