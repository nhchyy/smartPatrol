<?php
/**
 * 按手机号码查询用户是否存在
 * @author 作者：杨黎明
 * @param  mobile
 * @return JSON
 */
//*****************判断参数完整性
if(!isset($_POST['mobile'])){
	$res = '{"errcode":"1","errmsg":"请求失败！缺少手机号码参数"}';
	echo $res;
	exit;
}

//信息验证完成
include '../../mysql/config.php'; //引入数据配置文件
include '../../mysql/mysql.php';  //引入数据库操作类

$mysql = new MMysql($configArr);

$sql = "select count(*) as num from z_user where mobile = '{$_POST['mobile']}'";
$res = $mysql->doSql($sql);
if($res[0]['num'] == 0){
	$res = array(
		"errcode" => "0",
		"errmsg" => "请求成功，可以使用此号码注册"
	);
	$res = json_encode($res, JSON_UNESCAPED_UNICODE); //参数为json中文转义符
	echo $res;
}else{
	$res = '{"errcode":"2","errmsg":"该手机号码已存在！"}';
	echo $res;
}
?>