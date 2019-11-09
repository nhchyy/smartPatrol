<?php
/**
 * 查询所有用户
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

$sql = "select mobile,name,dep from z_user order by id";
$res = $mysql->doSql($sql);
if($res){
	$res = array(
		"errcode" => "0",
		"errmsg" => "请求成功",
		"list" => $res
	);
	$res = json_encode($res, JSON_UNESCAPED_UNICODE); //参数为json中文转义符
	echo $res;
}else{
	$res = '{"errcode":"2","errmsg":"请求失败"}';
	echo $res;
}
?>