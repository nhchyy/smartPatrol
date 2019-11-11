<?php
/*
 * 本地服务器用户明细与本企业钉钉端用户明细比对，更新同步用户，账号默认手机号码，默认密码md5(123456)
 * @author  作者：杨黎明
 * @text 
 */
header('Content-type:text/html;charset=utf-8');
include "../../ddsdk/dd_token.php";
include '../../mysql/config.php';
include '../../mysql/mysql.php';
//定义mysql类
$mysql = new MMysql($configArr);

//第一步获取token,正常情况下access_token有效期为7200秒，有效期内重复获取返回相同结果，并自动续期
$access_token = ddtoken();

//第二部获取部门id
$c = new DingTalkClient(DingTalkConstant::$CALL_TYPE_OAPI, DingTalkConstant::$METHOD_GET , DingTalkConstant::$FORMAT_JSON);
$req = new OapiDepartmentListRequest();
$req->setId("1");  //1为顶级部门，即企业
$res = $c->execute($req,$access_token,"https://oapi.dingtalk.com/department/list");
if($res->errcode == 0){
	//逐一获取相关的获取id用户信息
	$sum = 0; //初始化insert数据库总量
	for($i = 0; $i < sizeof($res->department); $i++ ){
		$dep = $res->department[$i]->name;
		$req = new OapiUserListbypageRequest();
		$req->setDepartmentId($res->department[$i]->id );
		$req->setOffset(0);
		$req->setSize(100);
		$res1 = $c->execute($req,$access_token,"https://oapi.dingtalk.com/user/listbypage");
		//逐一获取部门id的用户，并插入数据库
		$row1 = sizeof($res1->userlist);
		for($j = 0; $j < $row1; $j++ ){
			$userid = $res1->userlist[$j]->userid;  //钉钉端userid
			$mobile = $res1->userlist[$j]->mobile; //钉钉端手机号码
			$name = $res1->userlist[$j]->name; //钉钉端手机号码
			//判断账号是否已经存在
			$sql = "SELECT * FROM Z_USER WHERE USERID='{$userid}'";
			$res2 = $mysql->doSql($sql);
			if(!$res2){
				$data = array(
					'userid' => $userid,  //钉钉端userid
					'mobile' => $mobile,  //钉钉端手机号码
					'name' => $name,  //钉钉端手机号码
					'dep' => $dep,  //部门名称
					'pwd' => md5('123456'),//账户密码默认123456的md5加密值
					);
				$sum += $mysql->insert('z_user',$data); //插入数据库
			}
		}
	}
	$res = array(
		"errcode" => 0,
		"num" => $sum
	);
	$res = json_encode($res, JSON_UNESCAPED_UNICODE); //参数为json中文转义符
}else{
	$res = '{"errcode":1}';
}
echo $res;
?>