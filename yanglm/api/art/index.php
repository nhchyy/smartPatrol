<?php
/** 
 * @author 作者：杨黎明
 * @param  leib  按类别查询文章列表  1、实时新闻   2、榜样力量   3、安全教育
 * @return JSON
 * @text 文章查询接口  
 */
if(isset($_GET['leib'])){
	
	include '../../mysql/config.php'; //引入数据配置文件
	include '../../mysql/mysql.php';  //引入数据库操作类
	
	$mysql = new MMysql($configArr);

	$sql = "select id,title,stime,username,make from z_art where leib={$_GET['leib']} order by stime desc";
	$res = $mysql->doSql($sql);
	$res = array(
			"errcode" => "0",
			"errmsg" => "请求成功",
			"art" => $res
		);
	$res = json_encode($res, JSON_UNESCAPED_UNICODE); //参数为json中文转义符
	echo $res;
}else{
	$res = '{"errcode":"2","errmsg":"请求失败，缺少参数"}';
	echo $res;
}
?>