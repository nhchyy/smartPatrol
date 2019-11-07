<?php
/** 
 * @author 作者：杨黎明
 * @param  $_POST['mobile']用户账号，$_POST['pwd']用户密码，$_POST['type']登陆入口：1微信小程序、2APP、3钉钉
 * @return JSON
 * @text 用户登录认证接口，服务器认证账号密码，从钉钉服务器取用户信息
 */
if((isset($_POST['mobile']))&&(isset($_POST['pwd']))&&(isset($_POST['type']))){
	
	include '../../mysql/config.php'; //引入数据配置文件
	include '../../mysql/mysql.php';  //引入数据库操作类
	
	$mysql = new MMysql($configArr);
	$pwd = md5($_POST['pwd']);
	$sql = "select mobile,name,role from z_user where mobile='{$_POST['mobile']}' and pwd='{$pwd}'";
	$res = $mysql->doSql($sql);
	if($res){
		$mobile = $res[0]['mobile'];
		$name = $res[0]['name'];
		$role = $res[0]['role'];
		$res = array(
					"errcode" => "0",
					"errmsg" => "请求成功",
					"name" => $name,
					"mobile" => $mobile,
					"role" => $role
			);
		$res = json_encode($res, JSON_UNESCAPED_UNICODE); //参数为json中文转义符
		echo $res;
	}else{
		$res = '{"errcode":"1","errmsg":"用户名或密码错误"}';
		echo $res;
	}
}else{
	$res = '{"errcode":"2","errmsg":"缺少参数"}';
	echo $res;
}
?>