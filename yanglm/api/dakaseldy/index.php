<?php
/**
 * 停用
 * 按月查打卡记录，返回月打卡日志，行驶里程，天安门周长倍数
 * @author 作者：杨黎明
 * @param  mobile是11位手机号码   date是日期参数，日期格式为  2019-01-01
 * @return JSON
 */

//*****************判断添加打卡日志信息完整性
if(!isset($_POST['mobile'])){
	$res = '{"errcode":"1","errmsg":"请求失败！缺少打卡人手机号码参数"}';
	echo $res;
	exit;
}
if(!isset($_POST['date'])){
	$res = '{"errcode":"2","errmsg":"请求失败！缺少日期参数"}';
	echo $res;
	exit;
}
exit;
//接口停用


//信息验证完成，开始插入巡检日志
include '../../mysql/config.php'; //引入数据配置文件
include '../../mysql/mysql.php';  //引入数据库操作类

$mysql = new MMysql($configArr);

//取当月打卡日志信息
$sql = "select wjd,wwd from z_dak where mobile='{$_POST['mobile']}' and date_format(wtime,'%Y-%m') = '{$_POST['date']}'";
$res = $mysql->doSql($sql);

if($res){
	//当月打卡次数
	$num = count($res);
	$range = 0;
	//计算距离
	for($i = 0; $i < $num-1; $i++){
		//计算每两次打卡点间的距离，单位米
		$range += getdistance($res[$i]['wjd'],$res[$i+1]['wjd'],$res[$i]['wwd'],$res[$i+1]['wwd']);
	}
	$range = round($range/1000, 2);  //计算为公里数
	$row = ceil($range/2.76);  //计算天安门广场周长倍数

	//修改数组res键名，重新组装数组
	$newres = array();
	for($i = 0; $i < $num; $i++){
		$longitude = $res[$i]['wjd'];
		$latitude = $res[$i]['wwd'];
		$j = $i + 1;
		$x = array(
			"id" => $i + 1,
			"longitude" => $longitude,
			"latitude" => $latitude,
			"title" => "第" . $j . "次"
		);
		array_push($newres, $x ); //组装最新数组
	}

	$res = array(
		"errcode" => "0",
		"errmsg" => "请求成功",
		"num" => $num,  //打卡次数
		"range" => $range,  //打卡位置距离，单位：公里
		"row" => $row,   //天安门广场周长倍数
		"markers" => $newres  //所有经纬度位置
	);
	$res = json_encode($res, JSON_UNESCAPED_UNICODE); //参数为json中文转义符
	echo $res;
}else{
	$res = '{"errcode":"3","errmsg":"请求失败！当月没有打卡记录！"}';
	echo $res;
}

/**

*求两个已知经纬度之间的距离,单位为米
*@param lng1,lng2 经度
*@param lat1,lat2 纬度
*@return float 距离，单位米
**/
function getdistance($lng1, $lat1, $lng2, $lat2){

    //将角度转为狐度
    $radLat1 = deg2rad($lat1);//deg2rad()函数将角度转换为弧度
    $radLat2 = deg2rad($lat2);
    $radLng1 = deg2rad($lng1);
    $radLng2  =deg2rad($lng2);
    $a = $radLat1-$radLat2;
    $b = $radLng1-$radLng2;

    $s = 2*asin(sqrt(pow(sin($a/2),2)+cos($radLat1)*cos($radLat2)*pow(sin($b/2),2)))*6378.137*1000;
    return $s;
}
?>