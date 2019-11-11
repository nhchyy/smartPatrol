<?php
/** 
 * 综合查询接口，查询PC端首页各项数据
 * @author 作者：杨黎明
 * @param  mobile
 * @return JSON
 */
if (isset($_GET['mobile'])) {

	include_once '../../admin/inc/config.php';
	include_once '../../admin/inc/mysql.php';
	$link = connect();

	//巡检日志数量
	$query = "SELECT COUNT(id) FROM z_mtc";
	$xjrz = num($link,$query);
	//打卡记录数量
	$query = "SELECT COUNT(id) FROM z_dak";
	$dkjl = num($link,$query);
	//设备数量
	$query = "SELECT COUNT(id) FROM z_eqp";
	$sbzl = num($link,$query);
	//用户数量
	$query = "SELECT COUNT(id) FROM z_user";
	$yhzl = num($link,$query);
	//隐患数量
	$query = "SELECT COUNT(id) FROM z_yh WHERE XSTATE = 0";
	$yhsl = num($link,$query);
	//资讯数量
	$query = "SELECT COUNT(id) FROM z_art";
	$zxsl = num($link,$query);
	//汽车数量和可用数量
	$query = "SELECT COUNT(*) AS A,SUM(CASE WHEN LOGID=0 THEN 1 ELSE 0 END) AS B FROM Z_CAR";
	$result=execute($link, $query);
	$data=mysqli_fetch_assoc($result);
	//组装JSON
	$res = array(
		"errcode" => 0,
		"xjrz" => $xjrz,
		"dkjl" => $dkjl,
		"sbzl" => $sbzl,
		"yhzl" => $yhzl,
		"yhsl" => $yhsl,
		"zxsl" => $zxsl,
		"xycl" => $data['A'],
		"sycl" => $data['B']
	);
	$res = json_encode($res, JSON_UNESCAPED_UNICODE); //参数为json中文转义符
	echo $res;
}else{
	$res = '{"errcode":"1","errmsg":"请求失败！缺少参数！"}';
	echo $res;
}
?>