<?php
	@session_start();
	include("clients_db_connect.php");	
	$email = $_REQUEST['email'];
	$password = md5($_REQUEST['password']);
	$sql = mysql_query("SELECT * FROM Clients WHERE EMAIL='$email' AND PASSWORD='$password'");
	if (mysql_num_rows($sql) > 0) {
		$row = mysql_fetch_assoc($sql);
		$_SESSION['DB_CODE'] = $row["DB_CODE"];
		echo 'success';
	} else
		echo 'fail';
?>