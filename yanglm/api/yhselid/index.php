<?php
/**
 * 根据ID查询隐患信息和照片路径
 * @author 作者：杨黎明
 * @param  id
 * @return JSON
 */
//*****************判断参数完整性
if(!isset($_POST['id'])){
	$res = '{"errcode":"1","errmsg":"请求失败！缺少参数"}';
	echo $res;
	exit;
}

//信息验证完成，
include '../../mysql/config.php'; //引入数据配置文件
include '../../mysql/mysql.php';  //引入数据库操作类

$mysql = new MMysql($configArr);

//按id查询隐患信息
$sql = "select * from z_yh where id = {$_POST['id']}";
$res = $mysql->doSql($sql);

if($res){

	//查询隐患图片表
	$sql = "select path from z_yhp where yhid = {$_POST['id']}";
	$res1 = $mysql->doSql($sql);

	$res = array(
		"errcode" => "0",
		"errmsg" => "请求成功",
		"yh" => $res,
		"path" =>$res1
	);
	$res = json_encode($res, JSON_UNESCAPED_UNICODE); //参数为json中文转义符
}else{
	$res = '{"errcode":"2","errmsg":"请求失败！无隐患记录！"}';
}

echo $res;
?>