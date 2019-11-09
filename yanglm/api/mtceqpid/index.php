<?php
/** 
 * 通过设备id查询巡检日志接口
 * @author 作者：杨黎明
 * @param  eqp_id
 * @return JSON
 */
if(isset($_POST['eqp_id'])){
	
	include '../../mysql/config.php'; //引入数据配置文件
	include '../../mysql/mysql.php';  //引入数据库操作类
	
	$mysql = new MMysql($configArr);
	$sql = "select * from z_mtc where eid='{$_POST['eqp_id']}' order by id desc";
	$res = $mysql->doSql($sql);
	if($res){
		$res = array(
			"errcode" => "0",
			"errmsg" => "请求成功",
			"mtclog" => $res
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