<?php
/**
 * @author 作者：杨黎明
 * @param  
 * @return JSON
 * @text 按时间查询打卡日志，通过mobile
 */
//*****************判断添加打卡日志信息完整性
if(!isset($_POST['mobile'])){
	$res = '{"errcode":"1","errmsg":"请求失败！缺少打卡人手机号码参数"}';
	echo $res;
	exit;
}
if(!isset($_POST['date'])){
	$res = '{"errcode":"2","errmsg":"请求失败！缺少日期参数"}';
	echo $res;
	exit;
}

//信息验证完成，开始插入巡检日志
include '../../mysql/config.php'; //引入数据配置文件
include '../../mysql/mysql.php';  //引入数据库操作类

$mysql = new MMysql($configArr);

//取当月打卡日志信息
//$sql = "select wtime from z_dak where mobile='{$_POST['mobile']}' and date_format(wtime,'%Y-%m') = DATE_FORMAT(now(), '%Y-%m') order by wtime desc";
$sql = "select wtime from z_dak where mobile='{$_POST['mobile']}' and date(wtime)='{$_POST['date']}' order by id";
$res = $mysql->doSql($sql);
if($res){
	$res = array(
		"errcode" => "0",
		"errmsg" => "请求成功",
		"dak_log" => $res
	);
	$res = json_encode($res, JSON_UNESCAPED_UNICODE); //参数为json中文转义符
	echo $res;
}else{
	$res = '{"errcode":"3","errmsg":"请求失败！你选择的日期没有打卡记录！"}';
	echo $res;
}
?>