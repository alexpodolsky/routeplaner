<?php
include ("allRequests.php");

$driver = $_GET["dr"];
$lat = $_GET["la"];
$lng = $_GET["ln"];

echo json_encode(updateLocation($driver, $lat, $lng));
?>