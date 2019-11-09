<?php
/** 
 * 归还车辆
 * @author 作者：杨黎明
 * @param 
 * @return JSON $res
 */
if ($_SERVER["REQUEST_METHOD"] == "POST") {
	
	include '../../mysql/config.php'; //引入数据配置文件
	include '../../mysql/mysql.php';  //引入数据库操作类
	//实例化mysql对象
	$mysql = new MMysql($configArr);

	date_default_timezone_set('prc'); //设置时区与time配合使用为中国时区
	$time = date('Y-m-d H:i:s',time()); //获取当前时间

	//查询logid和里程数
	$sql = "select clc,logid from z_car where id = '{$_POST['carid']}'";
	$res = $mysql->doSql($sql);
	$logid = $res[0]['logid'];
	$clc = $_POST['clc'] - $res[0]['clc'];

	//修改车辆信息表
	$data = array(
		"cstate" => 0,
		"logid" => 0,
		"clc" => $_POST['clc'],
		"mobile" => ''
		);
	$num = $mysql->where("id={$_POST['carid']}")
				 ->update('z_car',$data);

	//修改车辆借出log日志表
	$data = array(
		"gtime" => $time
		);
	$num = $mysql->where("id={$logid}")
				 ->update('z_car_log',$data);
	
	//输出用户
	$res = array(
			"errcode" => "0",
			"errmsg" => "请求成功",
			"clc" => $clc
		);
	$res = json_encode($res, JSON_UNESCAPED_UNICODE); //参数为json中文转义符
	echo $res;
}else{
	$res = '{"errcode":"1","errmsg":"请求失败"}';
	echo $res;
}
?>