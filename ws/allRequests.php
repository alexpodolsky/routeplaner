<?php
include ("config.php");

function getData($table){
	$sql = "SELECT * FROM $table";	
	$res = mysql_query($sql);
	return putInArray($res);
}

function getDestinations($driver) {
	$dests = array();
	$sql = "SELECT JOBS FROM Routes WHERE DRIVER ='". $driver ."' AND STATUS = 'CREATED' ORDER BY ID ASC";	
	$res = mysql_query($sql);
	$res = putInArray($res);
	if (count($res) == 0)
		return array();
	else {
		$destIds = explode(",", $res[0]["JOBS"]);
		foreach ($destIds as $destId) {
			$sql = "SELECT * FROM Jobs WHERE ID ='". $destId ."'";	
			$res = mysql_query($sql);
			$res = putInArray($res);
			array_push($dests, $res);
		}
		return $dests;
	}
}

function updateLocation($driverKey, $lat, $lng){
    	mysql_query("SET NAMES 'utf8'");
    	date_default_timezone_set('America/Los_Angeles');
    	$sql = "SELECT LOCATION_HISTORY FROM Drivers WHERE ID ='". $driverKey ."'";
	$res = mysql_query($sql);
	$res = putInArray($res);
	$locs = json_decode($res[0]["LOCATION_HISTORY"]);
	$newLoc =  array();
	$newLoc["lat"] = $lat;
	$newLoc["lng"] = $lng;
	$newLoc["date"] = date("F j, g:i:s a");	
	array_push($locs, $newLoc);
	
	$sql = "UPDATE Drivers SET `LOCATION_HISTORY` = '" . json_encode($locs) ."'  WHERE `ID` = '". $driverKey . "'";
	$res = mysql_query($sql);
	return $res;
}

function createRoutes($routes){
	$res = true;	
	foreach ($routes as $i => $route) {		
		$jobIds = array();
		foreach ($route->destinations as $j => $dest) {
			$id = createJob($dest);
			array_push($jobIds, $id);
		}
		$driver = mysql_real_escape_string($route->driver->ID);
		$jobs = "";
		$inc = 0;
		foreach ($route->order as $k => $index) {
			print_r("ok");
			if ($jobs == "")
				$jobs .=  $jobIds[$index];
			else
				$jobs .=  ",".$jobIds[$index];
			$inc++;
		}
		$res &= mysql_insert('Routes', array(
		    'JOBS' => $jobs,
		    'DRIVER' => $driver
		));
	}
	return $res;
}

function createJob($dest) {
	$res = mysql_insert('Jobs', array(
	    'LAT' => mysql_real_escape_string($dest->lat),
	    'LNG' => mysql_real_escape_string($dest->lng),
	    'ADDRESS' => mysql_real_escape_string($dest->address),
	    'FIELDS' => json_encode($dest->fields)
	));
	if ($res) {
		$sql = "SELECT * FROM Jobs WHERE ADDRESS ='". $dest->address ."' ORDER BY ID DESC";	
		$res = mysql_query($sql);
		$res = putInArray($res);
		return $res[0]['ID'];
	}
	else return null;
}

function mysql_insert($table, $inserts) {
    $values = array_map('mysql_real_escape_string', array_values($inserts));
    $keys = array_keys($inserts);
        
    return mysql_query('INSERT INTO `'.$table.'` (`'.implode('`,`', $keys).'`) VALUES (\''.implode('\',\'', $values).'\')');
}

?>