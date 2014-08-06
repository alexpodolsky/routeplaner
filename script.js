// create the module and name it msd3App
var msd3App = angular.module('msd3App', ['ngRoute', 'ui.bootstrap']);

// configure our routes
msd3App.config(function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			templateUrl : 'pages/main.html',
			controller  : 'mainController'
		})
		.when('/planner', {
			templateUrl : 'pages/planner.html',
			controller  : 'routePlannerController'
		})
		.when('/map', {
			templateUrl : 'pages/realtimemap.html',
			controller  : 'realTimeMapController'
		});
});

//create the module for register/login
var loginApp = angular.module('loginApp', ['ngRoute']);
loginApp.config(function($routeProvider){
	$routeProvider
		.when('/login', {
			templateUrl : 'login.html',
			controller : 'loginController'
		});
});

//create controller for register/login
loginApp.controller('loginController', function($scope, $rootScope, $http, $location, $route) {
//$scope.master = {};
	$scope.login = function(user) {
		$scope.master = angular.copy(user);
		$http.get('ws/login_check.php?email='+user.email+'&password='+user.password).success(function(data){
			if (data != 'fail'){
				$http.get('ws/session.php?action=set&logged_in=TRUE').success(function(data){
					window.location.href = 'index.html';
				});

			}else{
				$http.get('ws/session.php?action=set&logged_in=FALSE').success(function(data){
					alert('Wrong Email or Password!');
				});
			}
		});
    };
	$scope.register = function(reg) {
		$scope.master = angular.copy(reg);
		$http.get('ws/register.php?full_name='+reg.full_name+'&user_name='+reg.user_name+'&email='+reg.email+'&password='+reg.password).success(function(data){
			if (data != 'fail'){
				alert('You are registered now.');
				window.location.href = 'login.html';
			}else if (data == 'exist'){
				alert('You are already registered with this Email address.');
			}else{
				alert('Registration failed. Please try later.');
			}
		});
    };
});


// create the controller and inject Angular's $scope
msd3App.controller('mainController', function($scope, $rootScope, $location, $http) {
	$scope.logout = function(){
		$http.get('ws/session.php?action=set&logged_in=FALSE').success(function(data){
			window.location.href = 'login.html';
		});
	};
	$http.get('ws/session.php?action=get').success(function(data){
		if (data != 'TRUE'){
			window.location.href = 'login.html';
		}
	});
});
msd3App.directive("datepicker", function () {
    return {
        restrict: 'A',
        require : 'ngModel',
        link : function (scope, element, attrs, ngModelCtrl) {
            $(function(){
                var date = ngModelCtrl.$viewValue;
                element.datepicker({
                	dateFormat:"yy-mm-dd",
                	beforeShow: function(){    
				        $(".ui-datepicker").css('font-size', 12) 
				    }
                });
            });
        }
    }
});
/*msd3App.directive('hboTabs', function() {
    return {
        restrict: 'A',
        link: function(scope, elm, attrs) {
            var jqueryElm = $(elm[0]);
            $(jqueryElm).tabs()
        }
    };
});*/
msd3App.directive('dropzone', function() {
    return {
        restrict: 'A',
        link: function(scope, elm, attrs) {
        	var jqueryElm = $(elm[0]);
        	$(jqueryElm).dropzone({
        		init : function(){
        			this.on("complete", function(file){
        				scope.addDestination_csv(file);
        			});
        		},
			    paramName: "file", // The name that will be used to transfer the file
			    maxFilesize: 10.5, // MB
			  
				addRemoveLinks : true,
				dictResponseError: 'Error while uploading file!',
				
				//change the previewTemplate to use Bootstrap progress bars
				previewTemplate: "<div class=\"dz-preview dz-file-preview\">\n  <div class=\"dz-details\">\n    <div class=\"dz-filename\"><span data-dz-name></span></div>\n    <div class=\"dz-size\" data-dz-size></div>\n    <img data-dz-thumbnail />\n  </div>\n  <div class=\"progress progress-sm progress-striped active\"><div class=\"progress-bar progress-bar-success\" data-dz-uploadprogress></div></div>\n  <div class=\"dz-success-mark\"><span></span></div>\n  <div class=\"dz-error-mark\"><span></span></div>\n  <div class=\"dz-error-message\"><span data-dz-errormessage></span></div>\n</div>"
        	})
        }
    }
});
Messenger.options = {
	maxMessages: 5,
	extraClasses: 'messenger-fixed messenger-on-top',
	theme: 'flat',
	messageDefaults : {
		showCloseButton: true, hideAfter: 5
	}
};