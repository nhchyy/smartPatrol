<?php
/** 
 * @author 作者：杨黎明
 * @param  car  
 * @return JSON
 * @text 按ID查询车辆信息
 */
if ($_SERVER["REQUEST_METHOD"] == "POST") {
	
	include '../../mysql/config.php'; //引入数据配置文件
	include '../../mysql/mysql.php';  //引入数据库操作类
	//实例化mysql对象
	$mysql = new MMysql($configArr);

	date_default_timezone_set('prc'); //设置时区与time配合使用为中国时区
	$time = date('Y-m-d H:i:s',time()); //获取当前时间
	
	//新增借车日志
	$data = array(
		"carid" => $_POST['id'],
		"ldd" => $_POST['ldd'],
		"ldate" => $_POST['ldate'],
		"lyy" => $_POST['lyy'],
		"mobile" => $_POST['mobile'],
		"name" => $_POST['name'],
		"stime" => $time
		);
	$mysql->insert('z_car_log',$data);

	//查询插入log表的id
	$sql = "select max(id) as id from z_car_log where mobile = '{$_POST['mobile']}'";
	$res = $mysql->doSql($sql);
	$id = $res[0]['id'];

	//修改车辆信息表
	$data = array(
		"cstate" => 1,
		"logid" => $id,
		"mobile" => $_POST['mobile']
		);
	$num = $mysql->where("id={$_POST['id']}")
				 ->update('z_car',$data);
	
	//输出用户
	$res = '{"errcode":"0","errmsg":"请求成功！"}';
	echo $res;
}else{
	$res = '{"errcode":"2","errmsg":"请求失败"}';
	echo $res;
}
?>