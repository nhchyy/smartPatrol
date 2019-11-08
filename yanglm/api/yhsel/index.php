<?php
/**
 * @author 作者：杨黎明
 * @param  
 * @return JSON
 * @text 取最新的20条隐患上报信息
 */
//*****************判断参数完整性
if(!isset($_POST['mobile'])){
	$res = '{"errcode":"1","errmsg":"请求失败！缺少手机号码参数"}';
	echo $res;
	exit;
}

//信息验证完成，开始插入巡检日志
include '../../mysql/config.php'; //引入数据配置文件
include '../../mysql/mysql.php';  //引入数据库操作类

$mysql = new MMysql($configArr);

//取最新的20条隐患上报信息
$sql = "select * from z_yh order by id desc limit 20";
$res = $mysql->doSql($sql);
if($res){
	$res = array(
		"errcode" => "0",
		"errmsg" => "请求成功",
		"yh_log" => $res
	);
	$res = json_encode($res, JSON_UNESCAPED_UNICODE); //参数为json中文转义符
	echo $res;
}else{
	$res = '{"errcode":"2","errmsg":"请求失败！你选择的日期没有打卡记录！"}';
	echo $res;
}
?>