<?php
	$uploaddir = 'uploads/'; 

	$fname = time().basename($_FILES['file']['name']);

	$file = $uploaddir . $fname; 
	if (move_uploaded_file($_FILES['file']['tmp_name'], $file)) { 
	  echo $file;
	} else {
		echo "";
	}		
?>