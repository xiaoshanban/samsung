/*
 * 6.0增加了透明度的动画
 */

function animate(ele,attr,target,timeSpeed){
	clearInterval(ele.timer);
	ele.timer = setInterval(function(){
	
		var current = 0;
		if(attr == "opacity"){
			current = getStyle(ele,attr) * 100;
		}else{
			current = parseInt(getStyle(ele,attr));
		}
		var speed = (target - current)/10;
		speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
		if(current == target){
			clearInterval(ele.timer);
		}else{
			if(attr == "opacity"){
				ele.style[attr] = (current + speed) / 100;
			}else{
				ele.style[attr] = current + speed + "px";
			}

		}
	},timeSpeed);
}
function getStyle(ele,attr){
	return window.getComputedStyle ? window.getComputedStyle(ele,null)[attr] : ele.currentStyle[attr];

}