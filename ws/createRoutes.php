<?php
include ("allRequests.php");

$p = file_get_contents("php://input");
$object = json_decode($p);

echo json_encode(createRoutes($object));
?>