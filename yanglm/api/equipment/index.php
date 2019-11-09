<?php
/** 
 * 按ID查询设备
 * @author 作者：杨黎明
 * @param  $_POST['id'] 设备id，
 * @return JSON
 */
if(isset($_POST['id'])){
	
	include '../../mysql/config.php'; //引入数据配置文件
	include '../../mysql/mysql.php';  //引入数据库操作类
	
	$mysql = new MMysql($configArr);
	$sql = "select * from z_eqp where id='{$_POST['id']}'";
	$res = $mysql->doSql($sql);
	if($res){
		$res = array(
					"errcode" => "0",
					"errmsg" => "请求成功",
					"id" => $res[0]['id'],
					"eqp_type" => $res[0]['etype'],
					"eqp_name" => $res[0]['ename'],
					"address" => $res[0]['adwz'],
					"longtitude" => $res[0]['adjd'],
					"latitude" => $res[0]['adwd'],
					"principal_name" => $res[0]['pname'],
					"principal_tel" => $res[0]['ptel'],
					"mfr_name" => $res[0]['mname'],
					"mfr_tel" => $res[0]['mtel'],
					"comment" => $res[0]['etext']
			);
		$res = json_encode($res, JSON_UNESCAPED_UNICODE); //参数为json中文转义符
		echo $res;
	}else{
		$res = '{"errcode":"1","errmsg":"设备ID不存在"}';
		echo $res;
	}
}else{
	$res = '{"errcode":"2","errmsg":"缺少参数"}';
	echo $res;
}
?>