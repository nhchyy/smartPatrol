<?php
/** 
 * 按ID查询车辆信息
 * @author 作者：杨黎明
 * @param  id  车辆信息
 * @return JSON
 */
if (isset($_POST['id'])) {
	
	include '../../mysql/config.php'; //引入数据配置文件
	include '../../mysql/mysql.php';  //引入数据库操作类
	//实例化mysql对象
	$mysql = new MMysql($configArr);
	
	//先查询自己是否有借出未还的车
	$sql = "select * from z_car where id = '{$_POST['id']}'";
	$res = $mysql->doSql($sql);

	//打包结果集
	$res = array(
			"errcode" => "0",
			"errmsg" => "请求成功",
			"car" => $res
		);
	$res = json_encode($res, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES); //参数为json中文转义符，不转义反斜杠
	echo $res;
}else{
	$res = '{"errcode":"2","errmsg":"请求失败"}';
	echo $res;
}
?>