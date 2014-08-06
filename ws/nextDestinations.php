<?php
@session_start();
if (! isset($_SESSION['DB_CODE'])) {
	$_SESSION['DB_CODE'] = $_REQUEST["c"];
}
	
include ("allRequests.php");

$d = mysql_real_escape_string($_REQUEST["d"]);

echo json_encode(getDestinations($d));
?>