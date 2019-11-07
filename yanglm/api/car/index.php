<?php
/** 
 * @author 作者：杨黎明
 * @param  car  
 * @return JSON
 * @text 查询车辆信息
 */
if ($_SERVER["REQUEST_METHOD"] == "POST") {
	
	include '../../mysql/config.php'; //引入数据配置文件
	include '../../mysql/mysql.php';  //引入数据库操作类
	//实例化mysql对象
	$mysql = new MMysql($configArr);
	
	//先查询自己是否有借出未还的车
	$sql = "select id,cname,ctype,cno,cgzrq,cstate,clc from z_car where mobile = '{$_POST['mobile']}'";
	$res1 = $mysql->doSql($sql);

	//查询可以借用的车
	$sql = "select id,cname,ctype,cno,cgzrq,clc from z_car where cstate = 0";
	$res2 = $mysql->doSql($sql);

	//打包结果集
	$res = array(
			"errcode" => "0",
			"errmsg" => "请求成功",
			"mycar" => $res1,
			"car" => $res2
		);
	$res = json_encode($res, JSON_UNESCAPED_UNICODE); //参数为json中文转义符
	echo $res;
}else{
	$res = '{"errcode":"2","errmsg":"请求失败"}';
	echo $res;
}
?>