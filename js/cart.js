//从url中获取用户名
//根据用户名从localStorage中拿到所有要购买的商品信息
//从后台拿到所有的商品数据
//通过遍历商品数据和localStorage中的信息
//根据匹配的bid找到对应的那个商品数据
//把对应的数据填充到页面
	$(function(){
		new ShowCartsData().init();
	})
	function ShowCartsData(){
		if(!ShowCartsData.property){
			ShowCartsData.property = {
				phoneNum : location.search.split("=")[1],
				oCarts : $(".mate_selected_all"),
				goods : [],
				init : function(){
					//显示信息
//					alert(1);
					this.showGoodsInfo();
					//向后台发送请求，拿到所有数据
					this.getGoods();
				},
				getGoods: function(){
					$.getJSON("./data/shoppingCat.json",function(res){
						//保存所有商品数据
						this.goods = res;
						//在页面显示所有对应的商品数据
						this.showGoodsInfo();
						//对页面进行数据增删改查
						new SelectEvent().init();
					}.bind(this));
				},
				getStorGoods : function(){
					if(localStorage.getItem(this.phoneNum + "goods")){
						var storGoodsStr = localStorage.getItem(this.phoneNum + "goods");
						return JSON.parse(storGoodsStr);
					}else{
						return null;
					}
				},
				showGoodsInfo :function(){//在页面显示商品数据
					if(this.getStorGoods()){
						var cartGoodsInfoJson = this.getStorGoods();
						//console.log(cartGoodsInfoJson);
						var str = "";
						//遍历商品数据和localstorage的信息
						for (var i = 0; i < this.goods.length; i++) {
							for(var j = 0;j < cartGoodsInfoJson.length; j++){
								//根据匹配的bid找到对应的那个商品的数据
								if(this.goods[i].bid == cartGoodsInfoJson[j].bid){
//									console.log(this.goods[i].price);
									str += `		
										<div class = "mate_selected">
											<label class ="p_checkone">
												<input type="checkbox" name="" class="checkone" value="" />
												<a href ="mate20_details.html" class ="p-img">
													<img src ="${this.goods[i].src}" class ="cartShowImg"/>
													
												</a>
											</label>
											<ul >
												<li><span>${this.goods[i].phoneName}</span></li>
												<li><span class="goodPrice">${this.goods[i].price}</span></li>
												<li>
													<div class="p-stock">
														<div class="p-stock-area">
															<input type="text" class="goodNum"" value = "${cartGoodsInfoJson[j].num}"/>
															<input class ="bid" type ="hidden" value = "${cartGoodsInfoJson[j].bid}" />
															<p class="p-stock-btn">
																<input type="button" value="+" class="add"></input>
																<input type="button" value="-" class="jian"></input>
															</p>
														</div>
													</div>
												</li>
												<li><span class="goodTotalPrice">${cartGoodsInfoJson[j].num * this.goods[i].price}</span></li>
												<li>
													<span class ="p_del">删除</sapn>
												</li>
											</ul>
										</div>
									`;
								}
								
							}
						}
	
						this.oCarts.html(str);
					}
					
				}
				
			}
		}
		return ShowCartsData.property;
	}
	class SelectEvent{
		constructor(){
			this.checkAll = $("#checkall");
			this.deslection = $("#del_cart_sel");//取消选择
			this.totalCount = $("#num_total");
			this.cartNum = $("#num");
			this.totalPrice = $("#price_total");
			this.checkOneBox = $(".checkone");
			
			this.jian = $(".jian");
			this.add = $(".add");
			this.bid = $(".bid");
			this.delCartGoods = $(".del_selected");//删除所选
			this.delOneS = $(".p_del");
			this.computeGoods = new ComputeGoods();
		}
		init(){
			this.selectAll();	
			this.selectOne();
			this.deslectionAll();
			this.addEvent();//+操作
			this.jianEvent();//-操作
			this.delGoodsInSelected();//删除所有被选中的商品
			this.delOne();
		}
		selectAll(){
			var _this = this;
			this.checkAll.click(function(){
				//点击全选按钮，全部选中
//				console.log(_this.checkOneBox);
				if($(this).prop("checked")){
					//所有都选中
					_this.checkOneBox.prop("checked",true);
					//禁止当前选择所有按钮
					$(this).prop("disabled",true);
					//取消选择按钮解禁
					_this.deslection.prop("disabled",false);
					//取消选择按钮变成未选中状态
					_this.deslection.prop("checked",false);
					
					//开始计算数量
					//console.log(_this.computeGoods.computeTotalNum());
					var num =_this.computeGoods.computeTotalNum();
					_this.totalCount.html(num);
					//计算总价
					var price = _this.computeGoods.computeTotalPrice();
					_this.totalPrice.html(price);
				}
			})
		}
		selectOne(){//选择单个
			var _this = this;
			this.checkOneBox.click(function(){
				var checked = false;//表示未被选中
				var unCheck = false;//表示所有的都选中了
				_this.checkOneBox.each(function(index,ele){
					if($(ele).prop("checked")){//有一个被选中
						checked = true;//有一个被选中
					}else{//有一个未被选中
						unCheck = true;
					}
				});
				if(unCheck){//有一个未被选中
					_this.checkAll.prop("disabled",false);//全选解禁
					_this.checkAll.prop("checked",false);
				}else{
					//所有的都被选中
					_this.checkAll.prop("disabled",true);
					_this.checkAll.prop("checked",true);
				}
				if(checked){//只要有一个被选中
					//取消按钮解禁，变可选
					_this.deslection.prop("disabled",false);
					
					_this.deslection.prop("checked",false);
				}else{//表示没有被选中的
					//
					_this.deslection.prop("disabled",true);
					
					_this.deslection.prop("checked",true);
				}
				
				//计算数量和总价
				var computeNum = _this.computeGoods.computeSelectOneNum();
				var computePrice = _this.computeGoods.computeSelectOnePrice();
				_this.totalCount.html(computeNum);
				_this.totalPrice.html(computePrice);
				_this.cartNum.html(computeNum);
			});
		}
		deslectionAll(){//取消全选
//			console.log(_this.deslection);
			var _this = this;
			_this.deslection.click(function(){
//				alert(1);
				_this.checkOneBox.prop("checked",false);
				//当前取消选择按钮禁止点击
				$(this).prop("disabled",true);
				//全选按钮解除禁止
				_this.checkAll.prop("disabled",false);
				//取消选中
				_this.checkAll.prop("checked",false);
				//商品总数量和价格置0
				_this.totalCount.html(0);
				_this.totalPrice.html(0);
			});
		}
		//加操作
		addEvent(){
			var _this = this;
			this.add.click(function(){
				//根据bid作添加操作+1
				//alert(1);
				var bid = $(this).parent().parent().find(".bid").val();
				//alert(bid);
				_this.computeGoods.setNumAndPrice(bid,1);//每次加1
				
				var computeNum = _this.computeGoods.computeSelectOneNum();
				var computePrice = _this.computeGoods.computeSelectOnePrice();
				
				_this.totalCount.html(computeNum);
				_this.totalPrice.html(computePrice);
				_this.cartNum.html(computeNum);
			});
		}
	
		//减操作
		jianEvent(){
			var _this = this;
			this.jian.click(function(){
				//alert($(this).parent().parent().find(".goodNum").val());
				var bid = $(this).parent().parent().find(".bid").val();
				
				if($(this).parent().parent().find(".goodNum").val() > 0){
					_this.computeGoods.setNumAndPrice(bid,-1);
				}else{//当减到0时，作删除操作
					$(this).parent().parent().parent().parent().parent().parent().remove();
					//stor删除购物车中的一条信息
					_this.computeGoods.delGoodByBid(bid);
				}
				
				//计算数量，总价
				var computeNum = _this.computeGoods.computeSelectOneNum();
				var computePrice = _this.computeGoods.computeSelectOnePrice();
				
				_this.totalCount.html(computeNum);
				_this.totalPrice.html(computePrice);
				_this.cartNum.html(computeNum);
			});
		}
		//单个删除
		delOne(){
			var _this = this;
			this.delOneS.click(function(){
				var bid = $(this).parent().parent().find(".bid").val();
				//alert(bid);
				
				$(this).parent().parent().parent().remove();
				_this.computeGoods.delGoodByBid(bid);
				//console.log( $(this).parent().parent().find(".goodPrice"));
				 //$(this).parent().parent().find(".goodNum").val(0);
				 //$(this).parent().parent().find(".goodPrice").html(0);
				
				var computeNum = _this.computeGoods.computeSelectOneNum();
				var computePrice = _this.computeGoods.computeSelectOnePrice();
				
				_this.totalCount.html(computeNum);
				_this.totalPrice.html(computePrice);
				_this.cartNum.html(computeNum);
				
				//location.reload();
				
			})
		}
		
		//删除所选操作
		delGoodsInSelected(){
			var _this = this;
			this.delCartGoods.click(function(){
				//遍历所有商品，查看哪个被选中，找到所有被选中的商品的Bid
				//根据bid来删除信息
				_this.checkOneBox.each(function(index,ele){
					if($(ele).prop("checked")){
						var bid = _this.bid.eq(index).val();
						_this.computeGoods.delGoodByBid(bid);
						$(ele).parent().parent().remove();
						_this.totalCount.html(0);
						_this.totalPrice.html(0);
					}
				})
			})
		}
	}
	//1.点击全选时，计算商品总数和需付金额
	//2.取消选择时，商品总数和需付金额为0
	//3.选中单个时，遍历有几个商品是选中的，根据计算的来计算商品总数和金额
	/*<label class ="p_checkone">
		<input type="checkbox" name="" class="checkone" value="" />
		<a href ="mate20_details.html" class ="p-img">
			<img src ="${this.goods[i].src}" class ="cartShowImg"/>
			<input class ="bid" type ="hidden" value = "${cartGoodsInfoJson[j].bid}" />
		</a>
	</label>
	<ul >
		<li><span>${this.goods[i].phoneName}</span></li>
		<li><span class="goodPrice">${this.goods[i].price}</span></li>
		<li>
			<div class="p-stock">
				<div class="p-stock-area">
					<input type="text" class="goodNum"" value = "${cartGoodsInfoJson[j].num}"/>
					<p class="p-stock-btn">
						<input type="button" value="+" class="add"></input>
						<input type="button" value="-" class="jian"></input>
					</p>
				</div>
			</div>
		</li>
		<li><span class="goodTotalPrice">${cartGoodsInfoJson[j].num * this.goods[i].price}</span></li>
		<li>
			<a href="#" class ="p_del">删除</a>
		</li>
	</ul>*/
	class ComputeGoods{
		constructor(){
			this.checkOneBox = $(".checkone");
			this.goodNum = $(".goodNum");
			this.goodPrice = $(".goodPrice");
			this.goodTotalPrice = $(".goodTotalPrice");
			this.goodBid = $(".bid");
			this.mate_selected_all = $(".mate_selected_all");
			this.goodUl = $(".mate_selected_all").find(".mate_selected");
			//拿到stor的Json数据
			this.storGoodsJson = new ShowCartsData().getStorGoods();
			this.phoneNum = new ShowCartsData().phoneNum;
			
		}
		computeTotalNum(){
			var num = 0;
			var gNum = this.mate_selected_all.find(".goodNum");
			gNum.each(function(index,ele){
				num += Number($(ele).val());
			})
			return num;
		}
		computeTotalPrice(){
			var price = 0;
			var tPrice = this.mate_selected_all.find(".goodTotalPrice");
			var _this = this;
			tPrice.each(function(index,ele){
				price += Number($(ele).html());
			})
			return price;
		}
		computeSelectOneNum(){//根据选择时产生的bid对应的计算条数
			var tNum = 0;
			var oneBox = this.mate_selected_all.find(".checkone");
			oneBox.each(function(index,ele){
				console.log($(ele).prop("checked"));
				if($(ele).prop("checked")){
					tNum += Number($(ele).parent().parent().find(".goodNum").val());
				}
			});
			return tNum;
			
		}
		computeSelectOnePrice(){
			var tPrice = 0;
			var oneBox = this.mate_selected_all.find(".checkone");
			oneBox.each(function(index,ele){
				if($(ele).prop("checked")){
					tPrice += Number($(ele).parent().parent().find(".goodTotalPrice").html());
					
				}
			});
			return tPrice;
		}
		setNumAndPrice(bid,num){
			var _this = this;
			this.goodUl.each(function(index,ele){
				console.log(index);
				if($(ele).find(".bid").val() == bid){
					var gNum = Number(_this.goodNum.eq(index).val());
					_this.goodNum.eq(index).val(gNum+num);
					var gPrice = _this.goodNum.eq(index).val() * _this.goodPrice.eq(index).html();
					_this.goodTotalPrice.eq(index).html(gPrice);
					
					//在原购物车中对应的bid的数量+num
					for (var i = 0; i < _this.storGoodsJson.length; i++) {
						if(_this.storGoodsJson[i].bid == bid){
							_this.storGoodsJson[i].num += num;
						}
					}
					//_this.storGoodsJson[index].num += num;
					//更新购物车
					_this.updateCart();
				}
			});
		}
		updateCart(){
			var storGoodsStr = JSON.stringify(this.storGoodsJson);
			localStorage.setItem(this.phoneNum+"goods",storGoodsStr);
		}
		delGoodByBid(bid){
			//删除this.storGoodsJson中对应的这一条信息
			for (var i = 0; i < this.storGoodsJson.length; i++) {
			 	if(this.storGoodsJson[i].bid == bid){
			 		this.storGoodsJson.splice(i,1);
			 		this.updateCart();
			 		break;
			 	}
			}
		}
	}
