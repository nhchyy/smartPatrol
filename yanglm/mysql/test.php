<?php
include 'config.php';
include 'mysql.php';
//header("Content-Type: application/json;charset=utf-8");
$mysql = new MMysql($configArr);

//date_default_timezone_set('prc'); //设置时区与time配合使用为中国时区
//$time = date('Y-m-d H:i:s',time()); //获取当前时间

//直接执行sql语句
$sql = "select wjd,wwd from z_dak where mobile='15637251568' and date_format(wtime,'%Y-%m') = '2019-11'";
$res = $mysql->doSql($sql);
$newres = array();
for($i = 0; $i < count($res); $i++){
    $longitude = $res[$i]['wjd'];
    $latitude = $res[$i]['wwd'];
    $x = array(
        "longitude" => $longitude,
        "latitude" => $latitude
    );
    array_push($newres, $x );
}
var_dump($newres);
//$res = array("errcode" => 0,"errmsg" => "请求成功","userinfo" => $res);
//echo json_encode($res);
//echo '<br>';
////  JSON_UNESCAPED_UNICODE  转义为json时，有汉字需传入此参数
//$res = json_encode($num,JSON_UNESCAPED_UNICODE);
//echo $res;
//echo '<br>';
////json_decode  参数为true返回数组，$res[1]['name']；参数为false返回对象，$res[1]->name;
//$res = json_decode($res,false);
//for($i=0;$i < sizeof($res);$i++){
//  echo $res[$i]->name.'<br>';
//}
//查询数据库中所有表的名称
// $sql = "show tables";
//$num = $mysql->doSql($sql);

//插入
// $data = array(
//     'userid' => "0128765",
//     'mobile' => "18647513309",
//     'pwd' => md5('123456'),
//     'name' => '李辛艺',
//     );
// $num = $mysql->insert('z_user',$data);
// echo '添加了'.$num.'行';

//修改
// $data = array(
//     'userid' => '123',
//     'mobile' => '8861424',
//     'name' => '你好周杰伦',
// );
// $num = $mysql->where('id=2')
//              ->update('user',$data);
//echo '修改了'.$num.'行';

//删除
// $mysql->_where = 'where id=7';
// $num = $mysql->delete('user');
// echo '删除了'.$num.'行';

// //查询
// $res = $mysql->field(array('sid','aa','bbc'))
//     ->order(array('sid'=>'desc','aa'=>'asc'))
//     ->where(array('sid'=>"101",'aa'=>array('123455','>','or')))
//     ->limit(1,2)
//     ->select('t_table');
// $res = $mysql->field('sid,aa,bbc')
//     ->order('sid desc,aa asc')
//     ->where('sid=101 or aa>123455')
//     ->limit(1,2)
//     ->select('t_table');
// //获取最后执行的sql语句，无存储功能，结果为当前页面最后执行的SQL语句
// $sql = $mysql->getLastSql();
// echo $sql;


//事务
// $mysql->startTrans();
// $mysql->where(array('id!=1'))->update('user',array('userid'=>'8861395'));
// $mysql->where(array('id'=>1))->update('user',array('mobile'=>'18647510707'));
// $mysql->where(array('id!=10'))->update('user',array('name'=>'灌篮高手'));
// $res = $mysql->commit();
// if($res){
//     echo '已完成事务操作'.'<br>';
//     $num = $mysql->doSql($sql);
//     var_dump($num);
//     $res = $mysql->rollback();
//     if($res){
//         echo '<br>'.'已完成事务回滚'.'<br>';
//         $num = $mysql->doSql($sql);
//         var_dump($num);
//     }
// };
?>