<?php
/** 
 * @author 作者：杨黎明
 * @param  mobile  认证登录信息
 * @return JSON
 * @text 管理员查询接口
 */
if(isset($_POST['mobile'])){
	
	include '../../mysql/config.php'; //引入数据配置文件
	include '../../mysql/mysql.php';  //引入数据库操作类
	
	$mysql = new MMysql($configArr);
	$sql = "select id from z_user where mobile='{$_POST['mobile']}'";
	$res = $mysql->doSql($sql);
	if($res){
		$sql = "select id,name from z_user where role = 1";
		$res = $mysql->doSql($sql);
		$res = array(
				"errcode" => "0",
				"errmsg" => "请求成功",
				"admin" => $res
			);
		$res = json_encode($res, JSON_UNESCAPED_UNICODE); //参数为json中文转义符
		echo $res;
	}else{
		$res = '{"errcode":"1","errmsg":"请求失败，你不是该企业的用户"}';
		echo $res;
	}
}else{
	$res = '{"errcode":"2","errmsg":"请求失败，缺少参数"}';
	echo $res;
}
?>