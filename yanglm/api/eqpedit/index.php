<?php
/**
 * @author 作者：杨黎明
 * @param  $_POST['id'] 设备账号，
 * @return JSON
 * @text 设备修改加运维API
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
//*****************判断要修改的设备信息完整性
if(!isset($_POST['address'])){
	$res = '{"errcode":"6","errmsg":"请求失败！缺少所在机房地址参数"}';
	echo $res;
	exit;
}
if(!isset($_POST['longtitude'])){
	$res = '{"errcode":"7","errmsg":"请求失败！缺少机房经度参数"}';
	echo $res;
	exit;
}
if(!isset($_POST['latitude'])){
	$res = '{"errcode":"8","errmsg":"请求失败！缺少机房纬度参数"}';
	echo $res;
	exit;
}
if(!isset($_POST['principal_name'])){
	$res = '{"errcode":"9","errmsg":"请求失败！缺少责任人姓名参数"}';
	echo $res;
	exit;
}
if(!isset($_POST['principal_tel'])){
	$res = '{"errcode":"10","errmsg":"请求失败！缺少责任人电话参数"}';
	echo $res;
	exit;
}
if(!isset($_POST['mfr_tel'])){
	$res = '{"errcode":"11","errmsg":"请求失败！缺少厂家负责人联系电话参数"}';
	echo $res;
	exit;
}
if(!isset($_POST['comment'])){
	$res = '{"errcode":"12","errmsg":"请求失败！缺少备注信息参数"}';
	echo $res;
	exit;
}
//信息验证完成，开始修改设备信息	
include '../../mysql/config.php'; //引入数据配置文件
include '../../mysql/mysql.php';  //引入数据库操作类
date_default_timezone_set('prc'); //设置时区与time配合使用为中国时区
$time = date('Y-m-d H:i:s',time()); //获取当前时间

$mysql = new MMysql($configArr);

$data = array(
	"adwz" => $_POST['address'],
	"adjd" => $_POST['longtitude'],
	"adwd" => $_POST['latitude'],
	"pname" => $_POST['principal_name'],
	"ptel" => $_POST['principal_tel'],
	"mtel" => $_POST['mfr_tel'],
	"etext" => $_POST['comment']
	);
$num = $mysql->where("id={$_POST['eqp_id']}")
             ->update('z_eqp',$data);
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
	$res = '{"errcode":"0","errmsg":"请求成功！已修改设备信息，并完成新增巡检日志"}';
	echo $res;
}else{
	$res = '{"errcode":"13","errmsg":"请求失败！已修改设备信息，但新增巡检日志失败，请重试！"}';
	echo $res;
}
?>