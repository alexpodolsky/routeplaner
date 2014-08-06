<?php

$host = "localhost";
$username = "root";
$password = "";

$dbConn = mysql_connect("$host", "$username", "$password")or die("cannot connect");
mysql_set_charset("UTF-8"); 
mysql_query("SET NAMES 'UTF8'");
mysql_select_db("planner") or die("cannot select DB");
	
?>