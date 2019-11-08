<?php
/**
 * @author 作者：杨黎明
 * @param  
 * @return JSON
 * @text 添加打卡日志信息，10分钟内不允许重复打卡
 */
//*****************判断添加打卡日志信息完整性
if(!isset($_POST['wjd'])){
	$res = '{"errcode":"1","errmsg":"请求失败！缺少打卡经度参数"}';
	echo $res;
	exit;
}
if(!isset($_POST['wwd'])){
	$res = '{"errcode":"2","errmsg":"请求失败！缺少打卡维度参数"}';
	echo $res;
	exit;
}
if(!isset($_POST['mobile'])){
	$res = '{"errcode":"3","errmsg":"请求失败！缺少打卡人手机号码参数"}';
	echo $res;
	exit;
}
if(!isset($_POST['name'])){
	$res = '{"errcode":"4","errmsg":"请求失败！缺少打卡人姓名参数"}';
	echo $res;
	exit;
}

//信息验证完成，开始插入巡检日志
include '../../mysql/config.php'; //引入数据配置文件
include '../../mysql/mysql.php';  //引入数据库操作类
date_default_timezone_set('prc'); //设置时区与time配合使用为中国时区
$time = date('Y-m-d H:i:s',time()); //获取当前时间
$mysql = new MMysql($configArr);

//获取最后一条打卡日志
$sql = "select wtime from z_dak where mobile='{$_POST['mobile']}' order by id desc limit 1";
$res = $mysql->doSql($sql);

//当前时间 unix 时间戳
$time1 = strtotime($time);
//最近一条打卡日志 unix 时间戳
$time2 = strtotime($res[0]['wtime']);

//差额10分钟以上，可以再次打卡
if(($time1 - $time2)/60 > 10) {
	//插入打卡日志
	$data = array(
		"wjd" => $_POST['wjd'],
		"wwd" => $_POST['wwd'],
		"wtime" => $time,
		"mobile" => $_POST['mobile'],
		"name" => $_POST['name']
		);
	$row = $mysql->insert('z_dak',$data);
	if($row){
		$res = array(
			"errcode" => "0",
			"errmsg" => "请求成功，已生成最新打卡记录"
		);
	}else{
		$res = array(
			"errcode" => "5",
			"errmsg" => "生成最新打卡记录失败，请重试打卡"
		);
	}
}else{
	$res = array(
		"errcode" => "6",
		"errmsg" => "打卡失败，您的打卡频率过高，请在最新打卡记录10分钟后再打卡"
	);
}

$res = json_encode($res, JSON_UNESCAPED_UNICODE); //参数为json中文转义符
echo $res;
?>