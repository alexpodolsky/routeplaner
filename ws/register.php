<?php
	@session_start();
	include("clients_db_connect.php");
	$full_name = $_REQUEST['full_name'];
	$user_name = $_REQUEST['user_name'];
	$email = $_REQUEST['email'];
	$password = md5($_REQUEST['password']);
	$sql = mysql_query("SELECT * FROM Clients WHERE EMAIL='$email'");
	if (mysql_num_rows($sql) > 0){
		echo 'exist';
	}else{
		$result = mysql_query("INSERT INTO Clients (FULL_NAME, USER_NAME, EMAIL, PASSWORD) VALUES('$full_name', '$user_name', '$email', '$password')");
		if ($result)
			echo 'success';
		else
			echo 'fail';
	}
?>