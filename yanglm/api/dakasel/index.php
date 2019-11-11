<?php
/**
 * 按天查询当天的打卡日志
 * @author 作者：杨黎明
 * @param  mobile是11位手机号码   date是日期参数，日期格式为  2019-01-01
 * @return JSON
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
$sql = "select wjd,wwd,wtime,wz from z_dak where mobile='{$_POST['mobile']}' and date(wtime) = '{$_POST['date']}'";
$res = $mysql->doSql($sql);

if($res){
	//当天打卡次数
	$num = count($res);

	//修改数组res键名，重新组装数组，前台直接显示地图位置
	$newres = array();
	for($i = 0; $i < $num; $i++){
		$x = array(
			"id" => $i + 1,
			"longitude" => $res[$i]['wjd'],
			"latitude" => $res[$i]['wwd'],
			"title" => substr($res[$i]['wtime'],10,8).'在'.$res[$i]['wz'].'打卡'
		);
		array_push($newres, $x ); //组装最新数组
	}

	$res = array(
		"errcode" => "0",
		"errmsg" => "请求成功",
		"markers" => $newres  //所有经纬度位置
	);
	$res = json_encode($res, JSON_UNESCAPED_UNICODE); //参数为json中文转义符
	echo $res;
}else{
	$res = '{"errcode":"3","errmsg":"请求失败！今天没有打卡记录！"}';
	echo $res;
}
?>