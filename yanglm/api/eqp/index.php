<?php
/** 
 * @author 作者：杨黎明
 * @param  
 * @return JSON
 * @text 查询所有设备接口
 */
if ($_SERVER["REQUEST_METHOD"] == "POST") {
	
	include '../../mysql/config.php'; //引入数据配置文件
	include '../../mysql/mysql.php';  //引入数据库操作类
	
	$mysql = new MMysql($configArr);

	$sql = "select * from z_eqp";
	$res = $mysql->doSql($sql);
	$res = array(
			"errcode" => "0",
			"errmsg" => "请求成功",
			"art" => $res
		);
	$res = json_encode($res, JSON_UNESCAPED_UNICODE); //参数为json中文转义符
	echo $res;
}else{
	$res = '{"errcode":"2","errmsg":"请求失败，方式错误"}';
	echo $res;
}
?>