<?php
/**
 * @author 作者：杨黎明
 * @param  
 * @return JSON
 * @text 添加隐患上报API
 */
//*****************判断巡检日志信息完整性
if(!isset($_POST['xtype'])){
	$res = '{"errcode":"1","errmsg":"请求失败！缺少隐患类型参数"}';
	echo $res;
	exit;
}
if(!isset($_POST['xwz'])){
	$res = '{"errcode":"2","errmsg":"请求失败！缺少隐患位置参数"}';
	echo $res;
	exit;
}
if(!isset($_POST['xwt'])){
	$res = '{"errcode":"3","errmsg":"请求失败！缺少隐患问题描述参数"}';
	echo $res;
	exit;
}
if(!isset($_POST['xjd'])){
	$res = '{"errcode":"4","errmsg":"请求失败！缺少隐患地点经度参数"}';
	echo $res;
	exit;
}
if(!isset($_POST['xwd'])){
	$res = '{"errcode":"5","errmsg":"请求失败！缺少隐患地点纬度参数"}';
	echo $res;
	exit;
}
if(!isset($_POST['xmobile'])){
	$res = '{"errcode":"6","errmsg":"请求失败！缺少上报人电话参数"}';
	echo $res;
	exit;
}
if(!isset($_POST['xname'])){
	$res = '{"errcode":"7","errmsg":"请求失败！缺少上报人姓名参数"}';
	echo $res;
	exit;
}
if(!isset($_POST['ximgpath'])){
	$res = '{"errcode":"8","errmsg":"请求失败！没有要上传的图片文件"}';
	echo $res;
	exit;
}

//信息验证完成，开始插入隐患数据
include_once '../../mysql/config.php';
include_once '../../mysql/mysql.php';

header("Content-Type: application/json;charset=utf-8");
date_default_timezone_set('prc');//设置时区与time配合使用为中国时区
$time = date('Y-m-d H:i:s',time()); //获取当前时间

//POST的from方式，传递过来的数组转换为以逗号分隔的字符串。此处将字符串重新转换为数组
$path = explode(",", $_POST['ximgpath']);

$mysql = new MMysql($configArr);

//插入隐患表
$data = array(
	"xtype" => $_POST['xtype'],
	"xwz" => $_POST['xwz'],
	"xwt" => $_POST['xwt'],
	"xjd" => $_POST['xjd'],
	"xwd" => $_POST['xwd'],
	"xmobile" => $_POST['xmobile'],
	"xname" => $_POST['xname'],
	"xtime" => $time
	);
$row = $mysql->insert('z_yh',$data);
if($row){
	$sql = "select id from z_yh where xmobile = '{$_POST['xmobile']}' order by id desc limit 1";
	$res = $mysql->doSql($sql);
	$j = 0;
	//插入隐患照片路径
	for($i = 0; $i < sizeof($path); $i++){
		$data = array(
			"yhid" => $res[0]['id'],
			"path" => "http://112.93.119.181:8090/zhyw/dimg/" . $path[$i],
			"img" => $path[$i]
		);
		$j += $mysql->insert('z_yhp',$data);
	}
	if($i == $j){
		$res = '{"errcode":"0","errmsg":"请求成功！隐患上报成功"}';
		echo $res;
	}
}else{
	//insert数据库失败
	$res = '{"errcode":"9","errmsg":"请求失败！请重试！"}';
	echo $res;
}
?>