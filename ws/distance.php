<?php

// http://routeplannertool.com/ws/distance.php?places=[{%22lat%22:37.775125,%22lng%22:-122.419306},{%22lat%22:47.180864,%22lng%22:5.811026}]
// http://routeplannertool.com/ws/distance.php?places=[{%22lat%22:37.775125,%22lng%22:-122.419306},{%22lat%22:47.180864,%22lng%22:5.811026},{%22lat%22:37.340684,%22lng%22:-121.899018}]
// http://routeplannertool.com/ws/distance.php?groups=2&places=[{%22lat%22:37.34172542,%22lng%22:-122.4497796},{%22lat%22:37.02438671,%22lng%22:-121.46348159},{%22lat%22:37.38629344,%22lng%22:-122.52543644},{%22lat%22:37.69364576,%22lng%22:-121.61546945},{%22lat%22:37.43774515,%22lng%22:-122.4921351},{%22lat%22:37.1184662,%22lng%22:-121.81525661},{%22lat%22:37.37723037,%22lng%22:-121.52723418},{%22lat%22:37.20141217,%22lng%22:-122.47925483},{%22lat%22:37.77376604,%22lng%22:-121.71318206},{%22lat%22:37.29583271,%22lng%22:-122.2840542},{%22lat%22:36.82708232,%22lng%22:-121.84705962},{%22lat%22:37.45634827,%22lng%22:-121.45720211},{%22lat%22:37.37964288,%22lng%22:-122.00535534},{%22lat%22:37.25119804,%22lng%22:-122.56316761},{%22lat%22:37.57119231,%22lng%22:-121.48618562},{%22lat%22:37.19373577,%22lng%22:-121.62427104},{%22lat%22:37.19942002,%22lng%22:-121.25342702},{%22lat%22:37.09781746,%22lng%22:-122.12206294},{%22lat%22:37.46547049,%22lng%22:-122.05561434},{%22lat%22:36.96886661,%22lng%22:-121.90509884}]

$p = stripslashes($_GET["places"]);
$nbGroups = stripslashes($_GET["groups"]);

$places = json_decode($p, true);
$distances = array();

for ($i=0; $i < count($places); $i++) { 
	$place = $places[$i];
  $distances[$i] = array();
	for ($j=$i+1; $j < count($places); $j++) { 
    $dist = distanceBetween($place, $places[$j]);
    $distances[$i][$j] = $dist;
	}
}

//print_r($places);

print_r(createGroups());
print_r($places);

function createGroups() {
  global $places, $nbGroups;
  $start = $places[0];
  $groups = initGroups();  
  while (count(array_values($places)) > 0) {
      $latSpan = getBounds($places, "lat");
      $lngSpan = getBounds($places, "lng");
      $latSpan

  }
  return $groups;
}

function initGroups() {
  global $places, $nbGroups;
  $groups = array();
  for ($i = 0; $i < $nbGroups; $i++){
    $group = array();
    $group[] = $places[0];
    $groups[] = $group;
  }
  unset($places[0]);
  return $groups;
}

function getBounds($places, $l){
  $res = array();
  $res[0] = 1000;
  $res[1] = -1000;
  $res[2] = "";
  $res[3] = "";
  foreach ($places as $k => $p) {
    $val = (double) ($p[$l]);
    if ($val > $res[1]){
      $res[1] = $val;
      $res[3] = $k;
    }      
    if ($val < $res[0]) {
      $res[0] = $val;
      $res[2] = $k;
    }
  }
  return $res;
}

function getClosestFrom($distances, $d, $max){
  $res = getDistancesFrom($distances, $d);
  asort($res, SORT_NUMERIC);
  return array_slice($res, 1, $max, true);
}

function getFarthestFrom($distances, $d, $max){
  $res = getDistancesFrom($distances, $d);
  arsort($res, SORT_NUMERIC);
  return array_slice($res, 0, $max, true);
}

function distanceBetween($place1, $place2) {
  $R = 6371; 
  $dLat  = deg2rad($place2["lat"] - $place1["lat"]);
  $dLong = deg2rad($place2["lng"] - $place1["lng"]);

  $a = sin($dLat/2) * sin($dLat/2) + cos(deg2rad($place1["lat"])) * cos(deg2rad($place2["lat"])) * sin($dLong/2) * sin($dLong/2);
  $c = 2 * atan2(sqrt($a), sqrt(1-$a));
  return round($R * $c, 2);
}

function getDistancesFrom($distances, $d) {
  $dists = array();
  for ($i=0; $i < count($distances); $i++) {
    if ($i == $d)
      $dists[$i] = 0;
    else
      $dists[$i] = readDistanceBetween($distances, $d, $i);
  }
  return $dists;
}

function readDistanceBetween($distances, $d1, $d2) {
  if ($d1 < $d2)
    return $distances[$d1][$d2];
  else
    return $distances[$d2][$d1];
}

?>