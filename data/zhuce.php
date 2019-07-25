<?php
	 header("Content-Type:text/html;charset=utf-8");
 	 $phoneNum = $_GET["phoneNum"];
 	 $pwd = $_GET["pwd"];
 	 //连接数据源
 	 $conn = mysqli_connect("localhost","root","","huawei");
 	 //设置字符编码
 	 mysqli_query($conn,"set names utf-8");
 	 // 创建查询语句
 	 $selectSql = "select phoneNum from user";
 	 
 	 $row = mysqli_query($conn,$selectSql);
 	 $flag = false;//用户名不存在
 	 while($resultArr = mysqli_fetch_array($row)){
 	 	if($phoneNum == $resultArr["phoneNum"]){
 	 		$flag = true;
 	 		break;
 	 	};
 	 }
 	 if($flag){
 	 		echo "2";
// 	 		echo "<script>alert('手机号已被注册，请重新注册');location.href = '../register.html';</script>";
// 	 	return "手机号已被注册";
 	 }else{
 	 	$sql = "insert into user (phoneNum,pwd) values ('$phoneNum','$pwd')";
 	 	$result = mysqli_query($conn,$sql);
 	 	if($result){
// 	 		echo "<script>alert('注册成功');location.href = '../index.html';</script>";
			echo "1";
 		}else{
// 			echo "<script>alert('注册失败');location.href = '../register.html';</script>";
			echo "0";
 	 	}
 	 }
 	 
 	 
