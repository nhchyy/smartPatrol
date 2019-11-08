<?php
/**
 * @author 作者：杨黎明
 * @param  
 * @return JSON
 * @text 上传隐患照片API
 */
//*****************判断上传图片信息完整性
if(!isset($_FILES['file']['name'])){
	$res = '{"errcode":"1","errmsg":"没有要上传的文件"}';
	echo $res;
	exit;
}

//定义头信息
header("Content-Type: application/json;charset=utf-8");
date_default_timezone_set('prc');//设置时区与time配合使用为中国时区

$tmp_file=$_FILES['file']['tmp_name'];
$file_types=explode(".",$_FILES['file']['name']);
$file_type=$file_types[count($file_types)-1];

/*设置上传路径*/
$savePath='../../dimg/';

/*以时间加3位随机数来命名上传的文件*/
$str = date('YmdHis',time()).mt_rand(100, 999);
$file_name = $str.".".$file_type;

/*是否上传成功*/
if(copy($tmp_file,$savePath.$file_name)){
	//$res = '{"errcode":"0","errmsg":"请求成功","path":"http://112.93.119.181:8090/zhyw/dimg/'.$file_name.'"}';
	$res = '{"errcode":"0","errmsg":"请求成功","path":"'.$file_name.'"}';
	echo $res;
}else{
	$res = '{"errcode":"2","errmsg":"文件上传失败，请重试"}';
	echo $res;
}
?>