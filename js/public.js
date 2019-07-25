//判断一个数是否是素数。
function isPrime(num){
	//var flag = true;
	//不是素数的情况 flag=false;
	for (var i = 2; i < num; i++) {
		if(num % i == 0){
			//flag = false;
			//break;
			return false;//只要执行到这里就说明num不是一个素数，可以结果程序，整个函数就返回false
		}
	}
	return true;//如果以上代码都不是执行，说明num就是一个素数。
}
//根据id名称获取元素对象
function $id(id){
	return document.getElementById(id);
}
//求两个数之间的随机数
function getRand(min,max){
	return parseInt(Math.random()*(max-min+1) + min);
}
//随机获取十六进制颜色值
function getColor(){
	//#4435ff
	var color = "#";
	var str = "0123456789abcdef";
	for (var i = 0; i < 6; i++) {
		var rand = getRand(0,15);
		color += str.charAt(rand)
	}
	return color;
}
//随机获取num长度的随机验证码
function getYZM(num){
	var yzm = "";
	//43aGtT 随机从ASCII码表中来
	for (var i = 0; i < num; i++) {
		var code = getRand(48,122);
		if((code >= 48 && code <= 57) || (code >= 65 && code <= 90) || (code >= 97 && code <= 122)){
			var ch = String.fromCharCode(code)
			yzm += ch;
		}else{
			i--;
		}
	}
	return yzm;
}
//自定义的本地化时间
function dateToString(date){//date传递时间对象
	//xx年xx月xx日 xx:xx:xx 星期x
	var week = ["星期天","星期一","星期二","星期三","星期四","星期五","星期六"]
	var str = "";
	var y = date.getFullYear();
	var m = date.getMonth()+1;
	var d = date.getDate();
	var h = date.getHours();
	var f = date.getMinutes();
	var s = date.getSeconds();
	var w = date.getDay()
	
	str += y + "年" + getDB(m) + "月" + getDB(d) + "日 ";
	str += getDB(h) + ":" + getDB(f) + ":" + getDB(s) + " ";
	str += week[w];
	return str;
}
function getDB(num){
	return num < 10 ? "0" + num : num;
}
//获取两个时间之间的时间差的秒数
function difTime(startTime,endTime){
	return (endTime.getTime() - startTime.getTime())/1000;
}
//
//兼容ie8浏览器实现通过className获取元素集合。
function getEleByClassName(className){
	var eleArr = [];//用来保存通过className获取到的元素
	var allEle = document.getElementsByTagName("*");//获取页面所有元素
	//alert(allEle.length)
	for (var i = 0; i < allEle.length; i++) {
		if(allEle[i].className == className){
			eleArr.push(allEle[i]);
		}
	}
	return eleArr;
}
//跨浏览器兼容ie8获取所有的子元素节点集合。(因为在ie8下node.children包含注释节点)
function getChildren(node){
	var nodes = node.children;
	var nodeArr = [];
	for (var i = 0; i < nodes.length; i++) {
		if(nodes[i].nodeType == 1){
			nodeArr.push(nodes[i]);
		}
	}
	return nodeArr;
}
//跨浏览器兼容ie8获取第一个子元素节点。
function getFirstChild(pNode){
	var children = pNode.children;
	for (var i = 0; i < children.length; i++) {
		if(children[i].nodeType == 1){
			return children[i];
		}
	}
	return null;
}
//跨浏览器兼容ie8获取e.button属性
function getButton(eve){
	if(eve){//高版本浏览器
		return eve.button;
	}else{//ie8及以下
		var button = event.button;
		switch(button){
			case 1:
				return 0;
			case 4:
				return 1;
			case 2:
				return 2;
			
		}
	}
}
//跨浏览器兼容ie8实现事件监听
function addEvent(ele,event,callBack,flag){//
	//ele:表示要注册的事件对象
	//event：事件本身
	//ele.addEventListener(event,fn,flag);
	if(ele.addEventListener){//现代浏览器
		if(flag){
			ele.addEventListener(event,callBack,flag);
		}else{
			ele.addEventListener(event,callBack);
		}
	}else{//ie8
		ele.attachEvent("on" + event,callBack);
	}
}
//跨浏览器兼容ie8获取事件对象的page属性。
function getPage(e){
	var sLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
	var sTop = document.documentElement.scrollTop || document.body.scrollTop;
	return {
		x : e.clientX + sLeft,
		y : e.clientY + sTop
	}
}
//去掉字符串前后空格
function myTrim(str){
	return str.replace(/(^\s*|\s*$)/g,"");
}
//实现替换敏感字符
function replaceSensitChar(str,sensitChar,char){
	var reg = new RegExp(sensitChar,"ig");
	//return str.split(sensitChar).join(char);
	return str.replace(reg,char);
}