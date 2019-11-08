<?php
/**
 * @author 作者：杨黎明
 * @param  
 * @return JSON
 * @text 单独添加巡检日志API
 */
//*****************判断巡检日志信息完整性
if(!isset($_POST['eqp_id'])){
	$res = '{"errcode":"1","errmsg":"请求失败！缺少设备ID参数"}';
	echo $res;
	exit;
}
if(!isset($_POST['mtc_type'])){
	$res = '{"errcode":"2","errmsg":"请求失败！缺少维护类型参数"}';
	echo $res;
	exit;
}
if(!isset($_POST['maintainer_name'])){
	$res = '{"errcode":"3","errmsg":"请求失败！缺少维护员姓名参数"}';
	echo $res;
	exit;
}
if(!isset($_POST['maintainer_tel'])){
	$res = '{"errcode":"4","errmsg":"请求失败！缺少维护员电话参数"}';
	echo $res;
	exit;
}
if(!isset($_POST['description'])){
	$res = '{"errcode":"5","errmsg":"请求失败！缺少描述信息参数"}';
	echo $res;
	exit;
}

//信息验证完成，开始插入巡检日志
include '../../mysql/config.php'; //引入数据配置文件
include '../../mysql/mysql.php';  //引入数据库操作类
date_default_timezone_set('prc'); //设置时区与time配合使用为中国时区
$time = date('Y-m-d H:i:s',time()); //获取当前时间

$mysql = new MMysql($configArr);

//插入巡检日志
$data = array(
	"eid" => $_POST['eqp_id'],
	"mtime" => $time,
	"mtype" => $_POST['mtc_type'],
	"mname" => $_POST['maintainer_name'],
	"mtel" => $_POST['maintainer_tel'],
	"mdes" => $_POST['description']
	);
$row = $mysql->insert('z_mtc',$data);
if($row){
	$res = '{"errcode":"0","errmsg":"请求成功！巡检日志添加成功"}';
	echo $res;
}else{
	$res = '{"errcode":"6","errmsg":"请求失败！巡检日志添加失败，请重试！"}';
	echo $res;
}
?>