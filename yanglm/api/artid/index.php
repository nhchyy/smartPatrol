<?php

/** 
 * 按ID文章查询接口
 * @author 作者：杨黎明
 * @param  artid  文章id
 * @return JSON $res
 */

if(isset($_GET['artid'])){
	
	include '../../mysql/config.php'; //引入数据配置文件
	include '../../mysql/mysql.php';  //引入数据库操作类
	
	$mysql = new MMysql($configArr);
	$sql = "select * from z_art where id='{$_GET['artid']}'";
	$res = $mysql->doSql($sql);
	if($res){
		$res = array(
				"errcode" => "0",
				"errmsg" => "请求成功",
				"xq" => $res
			);
		$res = json_encode($res, JSON_UNESCAPED_UNICODE); //参数为json中文转义符
		echo $res;
	}else{
		$res = '{"errcode":"1","errmsg":"请求失败，手机号不合规"}';
		echo $res;
	}
}else{
	$res = '{"errcode":"2","errmsg":"请求失败，缺少参数"}';
	echo $res;
}
?>