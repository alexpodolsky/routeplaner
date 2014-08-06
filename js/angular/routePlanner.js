function routePlannerController($scope, $http, $location) {

	$http.get('ws/session.php?action=get').success(function(data){
		if (data != 'TRUE'){
			window.location.href = 'login.html';
		}
	});

	$scope.directionsService = new google.maps.DirectionsService();
	$scope.mustOptimize = true;
	$scope.map;
	$scope.map_small;
	$scope.maps = [];
	$scope.routes = [];
	var bounds;
	var traffic;

	$scope.initController = function() {
		$("#directions-panel").empty();
		$scope.dispatching = false;
		$scope.showTraffic = false;
		$scope.step_1 = true;
		$scope.step_2 = false;
		$scope.step_3 = false;
		$scope.creatingRoutes = false;
		$scope.startFrom = {address : '', lat : null, lng : null};
		$scope.destinations = [{address : '', lat : null, lng : null, fields: {}}];

		var mapDiv = document.getElementById('mapCanvas');
		var mapDiv_small = document.getElementById('mapCanvas_small');

		$scope.map_small = new google.maps.Map(mapDiv_small, {
		  center: new google.maps.LatLng(37.520619,-122.250795),
		  zoom: 9
		});

		$scope.map = new google.maps.Map(mapDiv, {
		  center: new google.maps.LatLng(37.520619,-122.250795),
		  zoom: 9
		});

		$http.get('ws/get.php?d=Config').success(function(data){
			$scope.config = data[0];
			$scope.config.CUSTOM_FIELDS = eval('('+$scope.config.CUSTOM_FIELDS+')');
		});

		$http.get('ws/get.php?d=Drivers').success(function(data){
			$scope.drivers = data;
		});

		traffic = new google.maps.TrafficLayer();
		bounds = new google.maps.LatLngBounds();
	}

	$scope.initDirectionsMap = function(){
		var drivers = $scope.getDriversWithDestinations();
		for (var d in drivers) {
			var driver = drivers[d];
			$("#directions-panel"+driver.ID).empty();
			var mapDiv = document.getElementById('mapCanvas'+driver.ID);
			var map = new google.maps.Map(mapDiv, {
			  center: new google.maps.LatLng(37.520619,-122.250795),
			  zoom: 9
			});
			$scope.maps.push(map);
			var directionsDisplay = new google.maps.DirectionsRenderer({map:  map, draggable: true});
			directionsDisplay.setPanel(document.getElementById('directions-panel'+driver.ID));
			$scope.planRoute(driver, map, directionsDisplay);
		}
	}

	$scope.addDestination = function() {
		$scope.destinations.push({address : '', lat : null, lng : null, fields : {}});
	}

	$scope.initAutocomplete = function(dest, id){
		if (! dest.autocomplete) {
			var input = document.getElementById('dest'+id);
			var autocomplete = new google.maps.places.Autocomplete(input, { componentRestrictions: {country : "us"}});
			dest.autocomplete = true;
		    google.maps.event.addListener(autocomplete, 'place_changed', function() {
				var place = autocomplete.getPlace();
				dest.address = place.formatted_address;
			    if (!place.geometry) {
			      $(input.parentNode).removeClass('has-success').addClass('has-error');
			      dest.lat = null;
			      dest.lng = null;
			    } else {
			    	$(input.parentNode).removeClass('has-error').addClass('has-success');
			    	dest.lat = place.geometry.location.lat();
			    	dest.lng = place.geometry.location.lng();
			    }
			    $scope.$apply();
			    if (id > 0)
			    	$scope.updateMarker(dest, place.name, "greypin.png");
		  	});
		}
	}

	$scope.updateMarker = function(dest, text, icon) {
		var latlng = new google.maps.LatLng(dest.lat, dest.lng);
		if (dest.marker) {
			dest.marker.setIcon("img/map/"+icon);
			if (dest.lat && dest.lng)
				dest.marker.setPosition(latlng);
			else {
				dest.marker.setMap(null);
				dest.marker = null;
			}				
		} else {
			dest.marker = $scope.addMarker(dest.lat, dest.lng, text, "img/map/"+icon);
		}
		bounds.extend(latlng);
		$scope.map_small.fitBounds(bounds);
		$scope.map.fitBounds(bounds);
	}

	$scope.assignRoutes =  function() {
		$scope.dispatching = true;
		$scope.step_1 = false;
		$scope.step_2 = true;
		setTimeout(function() {
			google.maps.event.trigger($scope.map, 'resize');
			$scope.map.fitBounds(bounds);
		}, 100);
	}

	$scope.toggleTraffic = function(){
		$scope.showTraffic = ! $scope.showTraffic;
		if ($scope.showTraffic)
			traffic.setMap($scope.map);
		else
			traffic.setMap(null);
	}

	$scope.planRoute = function(driver, map, display) {
		var start = new google.maps.LatLng($scope.startFrom.lat, $scope.startFrom.lng);
		 var request = {
		    origin: start,
		    destination: start,
		    optimizeWaypoints: $scope.mustOptimize,
		    durationInTraffic: true,
		    provideRouteAlternatives: true,
		    waypoints: $scope.getWaypoints(driver),
		    travelMode: google.maps.TravelMode.DRIVING
		 };
  		$scope.directionsService.route(request, function(response, status) {
		    if (status == google.maps.DirectionsStatus.OK) {
		    	display.setMap(map);
		      	display.setDirections(response);
		      	var route = { 	driver : driver, 
		      				 	destinations: $scope.getDestinations(driver),
		      				 	order: response.routes[0].waypoint_order
		      				 };
		      	$scope.routes.push(route);
		    } else if (status == google.maps.DirectionsStatus.ZERO_RESULTS) {
				alert("Could not find a route between these addresses");
			 } else {
				alert("Directions request failed");
			 }
  		});
	}

	$scope.getWaypoints = function(driver) {
		var waypoints = [];
		var dests = $scope.getDestinations(driver);
		for (var i in dests) {
			var d = dests[i];
 			waypoints.push({location: new google.maps.LatLng(d.lat, d.lng)});
		}
		return waypoints;
	}

	$scope.getDestinations = function(driver) {
		var dests = [];
		for (var i in $scope.destinations) {
			var d = $scope.destinations[i];
			if (d.marker.driverId == driver.ID)
	 			dests.push({ address : d.address, lat: d.lat, lng : d.lng, fields: d.fields });
		}
		return dests;
	}

	$scope.addMarker = function(lat, lng, title, icon){
		var latlng = new google.maps.LatLng(lat, lng);
		var marker = new google.maps.Marker({
			position: latlng,
			map: $scope.map_small,
			animation: google.maps.Animation.DROP,
			title: title,
			icon: icon
		});

		var marker = new google.maps.Marker({
			position: latlng,
			map: $scope.map,
			animation: google.maps.Animation.DROP,
			title: title,
			icon: icon
		});
		bounds.extend(latlng);
		$scope.map_small.fitBounds(bounds);
		$scope.map.fitBounds(bounds);

		google.maps.event.addListener(marker, 'click', function() {
			if ($scope.selectedDriver) {
				marker.setIcon("img/map/pin"+$scope.selectedDriverIndex+".png");
				marker.driverId = $scope.selectedDriver.ID;
			} else {
				marker.setIcon("img/map/greypin.png");
				marker.driverId = null;
			}
		});
		return marker;
	}

	$scope.selectDriver = function(index, driver) {
		$scope.selectedDriver = driver;
		$scope.selectedDriverIndex = index;
	}

	$scope.getDriversWithDestinations = function() {
		var drivers = [];
		for (var i in $scope.destinations) {
			var dest = $scope.destinations[i];
			if (dest.marker.driverId) {
				var driver = $scope.findDriverById(dest.marker.driverId);
				if ($.inArray(driver, drivers) == -1)
					drivers.push(driver);
			}
		}
		return drivers;
	}

	$scope.createRoutes = function(){
		$scope.creatingRoutes = true;
		$scope.dispatching = false;
		$scope.step_2 = false;
		$scope.step_1 = false;
		$scope.step_3 = true;
		setTimeout(function(){
			$scope.initDirectionsMap();
		}, 200);
	}
	$scope.findDriverById = function(id) {
		for (var i in $scope.drivers) {
			if ($scope.drivers[i].ID == id)
				return $scope.drivers[i];
		}
		return null;
	}
	
	$scope.resizeMap = function() {
		setTimeout(function(){
			for (var m in $scope.maps){
				var map = $scope.maps[m];
				google.maps.event.trigger(map, 'resize');  
			}
		}, 100);
	}

	$scope.sendRoutes = function(){
		$http({ method: 'POST', url: 'ws/createRoutes.php?', data: $scope.routes, headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
			.success(function(data){
				if (data != "false") {
			 		Messenger().post({
					  message: 'Routes sent to drivers',
					  type: 'success'
					});	
			 	} else {
			 		Messenger().post({
					  message: 'Error while creating routes. Please try again.',
					  type: 'error'
					});
			 	}
		});
	}

	$scope.addDestination_csv = function(file){
		$http.get('ws/csvImport.php?file='+file.xhr.response)
			.success(function(data){
				$scope.destinations.splice(0, data.length);
				for (var i=0; i < data.length; i++){
					$scope.destinations.push({address : data[i][0], lat : null, lng : null, fields : {}});
				}
				var dest;
				setTimeout(function(){
					$scope.$apply(function(){
						var length = data.length;
						$scope.async_func(0);
					});
				}, 1000);
		});
	}

	$scope.async_func = function(currentIndex){

		if(currentIndex == $scope.destinations.length)
			return;
		else{
			var formatted_addr;
			var geocoder = new google.maps.Geocoder();
			dest = $scope.destinations[currentIndex];
			geocoder.geocode({
		            address: dest.address
		        }, function(locResult,status) {
		        	if(status == google.maps.GeocoderStatus.OK){
			            dest.lat = locResult[0].geometry.location.lat();
			            dest.lng = locResult[0].geometry.location.lng();
			            formatted_addr = locResult[0].formatted_address;
						dest.marker = $scope.addMarker(dest.lat, dest.lng, formatted_addr, "img/map/greypin.png");
						//$scope.updateMarker(dest, formatted_addr, "greypin.png");
						currentIndex ++;
						$scope.async_func(currentIndex);
					}
					else{
						alert("Google map doesn't recognize below address:"+$scope.destinations[currentIndex].address);
					}
		    });	
		}
	}

	$scope.goto_step1 = function(){
		console.log('test');
		$scope.dispatching = false;
		$scope.step_1 = true;
		$scope.step_2 = false;
	}
	$scope.goto_step2 = function(){
		$scope.dispatching = true;
		$scope.step_1 = false;
		$scope.step_2 = true;
		$scope.step_3 = false;
		$scope.creatingRoutes = false;
	}

	$scope.initController();
}