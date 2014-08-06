<?php
include ("allRequests.php");

$d = mysql_real_escape_string($_GET["d"]);

echo json_encode(getData($d));
?>