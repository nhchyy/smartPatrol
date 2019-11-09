<?php
/**
 * 模糊查询设备信息
 * @author 作者：杨黎明
 * @param  
 * @return JSON
 */
if ($_SERVER["REQUEST_METHOD"] == "POST") {

	include '../../mysql/config.php'; //引入数据配置文件
	include '../../mysql/mysql.php';  //引入数据库操作类

	$mysql = new MMysql($configArr);

	if($_POST['type'] == ''){
		$sql = "SELECT * FROM z_eqp WHERE ename LIKE '%{$_POST['ename']}%' and adwz LIKE '%{$_POST['wz']}%' 
				and mname like '%{$_POST['mname']}%' and pname LIKE '%{$_POST['pname']}%'";
	}else{
		$sql = "SELECT * FROM z_eqp WHERE etype='{$_POST['type']}' and ename LIKE '%{$_POST['ename']}%' and 
				adwz LIKE '%{$_POST['wz']}%' and mname like '%{$_POST['mname']}%' and pname LIKE '%{$_POST['pname']}%'";
	}
	$res = $mysql->doSql($sql);

	$res = array(
		"errcode" => "0",
		"errmsg" => "请求成功",
		"eqp" => $res
	);
	$res = json_encode($res, JSON_UNESCAPED_UNICODE); //参数为json中文转义符
	echo $res;
}else{
	$res = '{"errcode":"1","errmsg":"请求失败！"}';
	echo $res;
}
?>