<?php
/**
 * @author 作者：杨黎明
 * @param  
 * @return 添加用户
 */
//*****************判断巡检日志信息完整性
if(!isset($_POST['mobile'])){
	$res = '{"errcode":"1","errmsg":"请求失败！缺少手机号码参数"}';
	echo $res;
	exit;
}
if(!isset($_POST['pwd'])){
	$res = '{"errcode":"2","errmsg":"请求失败！缺少密码参数"}';
	echo $res;
	exit;
}
if(!isset($_POST['name'])){
	$res = '{"errcode":"3","errmsg":"请求失败！缺少姓名参数"}';
	echo $res;
	exit;
}

//信息验证完成，开始插入巡检日志
include '../../mysql/config.php'; //引入数据配置文件
include '../../mysql/mysql.php';  //引入数据库操作类

$mysql = new MMysql($configArr);

//插入用户
$data = array(
	"mobile" => $_POST['mobile'],
	"pwd" => md5($_POST['pwd']),
	"name" => $_POST['name']
	);
$row = $mysql->insert('z_user',$data);
if($row){
	$res = '{"errcode":"0","errmsg":"请求成功！用户注册成功"}';
	echo $res;
}else{
	$res = '{"errcode":"4","errmsg":"注册失败！请重试！"}';
	echo $res;
}
?>