<?php
/** 
 * 借车申请，插入借车日志表，修改车辆状态
 * @author 作者：杨黎明
 * @param  id,ldd,ldate,lyy,mobile,name
 * @return JSON
 */

//*****************判断巡检日志信息完整性
if(!isset($_POST['id'])){
	$res = '{"errcode":"1","errmsg":"请求失败！缺少车辆id参数"}';
	echo $res;
	exit;
}
if(!isset($_POST['ldd'])){
	$res = '{"errcode":"2","errmsg":"请求失败！缺少目的地参数"}';
	echo $res;
	exit;
}
if(!isset($_POST['ldate'])){
	$res = '{"errcode":"3","errmsg":"请求失败！缺少预计归还时间参数"}';
	echo $res;
	exit;
}
if(!isset($_POST['lyy'])){
	$res = '{"errcode":"4","errmsg":"请求失败！缺少借车原因参数"}';
	echo $res;
	exit;
}
if(!isset($_POST['mobile'])){
	$res = '{"errcode":"5","errmsg":"请求失败！缺少借车人电话参数"}';
	echo $res;
	exit;
}
if(!isset($_POST['name'])){
	$res = '{"errcode":"6","errmsg":"请求失败！缺少借车人姓名参数"}';
	echo $res;
	exit;
}

//参数验证完成，开始操作
	
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
?>