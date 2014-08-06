<?php
	@session_start();
	if ($_REQUEST['action'] == 'set'){
		$_SESSION['logged_in'] = $_REQUEST['logged_in'];
	}else if ($_REQUEST['action'] == 'get'){
		echo $_SESSION['logged_in'];
	}
?>