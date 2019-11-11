<?php
/**
 * 查询自己借用的车辆信息和现在还可以借用的车辆
 * @author 作者：杨黎明
 * @param 
 * @return JSON  $res  $mycar 自己借用的， $car还可以借用的
 */
if ($_SERVER["REQUEST_METHOD"] == "POST") {
	
	include '../../mysql/config.php'; //引入数据配置文件
	include '../../mysql/mysql.php';  //引入数据库操作类
	//实例化mysql对象
	$mysql = new MMysql($configArr);
	
	//先查询自己是否有借出未还的车
	$sql = "select id,cname,cno,cgzrq,cstate,clc,cpath from z_car where mobile = '{$_POST['mobile']}' order by cstate desc";
	$res1 = $mysql->doSql($sql);

	//查询可以借用的车
	$sql = "select id,cname,cno,cgzrq,cstate,clc,cpath from z_car where cstate = 0";
	$res2 = $mysql->doSql($sql);

	//打包结果集
	$res = array(
			"errcode" => "0",
			"errmsg" => "请求成功",
			"mycar" => $res1,
			"car" => $res2
		);
	$res = json_encode($res, JSON_UNESCAPED_UNICODE); //参数为json中文转义符
	echo $res;
}else{
	$res = '{"errcode":"2","errmsg":"请求失败"}';
	echo $res;
}
?>