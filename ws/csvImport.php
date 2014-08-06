<?php
	include('lib/Csv_import.php');

	$csv_obj = new Csv_import();

	$file = $_REQUEST['file'];

	$ret = $csv_obj->parse_file($file);

	echo json_encode($ret);
?>