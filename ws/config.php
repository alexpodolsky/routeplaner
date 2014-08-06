<?php 
@session_start();
/*$host = "localhost";
$username = "hommedu1";
$password = "54011377";

$d = $_SESSION['DB_CODE'];
$db_name = "hommedu1_rpt_" . $d;*/


$host = "localhost";
$username = "root";
$password = "";
$db_name = "planner";


$dbConn = mysql_connect("$host", "$username", "$password")or die("cannot connect");
mysql_set_charset("UTF-8"); 
mysql_select_db("$db_name") or die("cannot select DB ");

//UTILS
function putInArray($queryRes){
	if(!$queryRes){
		die('Invalid query : '.mysql_error());
	}
	$results = array();
	while($row = mysql_fetch_assoc($queryRes)){
		foreach ($row as $i => $content){
			$row[$i] = utf8_encode($content);
		}
		array_push($results, $row);
	}
	return $results;
}

function formatForIn($list){
	$res = "";
	$exploded  = explode(",", $list);
	foreach ($exploded as $l) {
		if ($res != "")
			$res .= ",";
		$res .= "'$l'";
	}
	return $res;
}

?>