var app = angular.module('app', ['ngRoute','ngResource']);
app.config(['$routeProvider','$locationProvider',function($routeProvider, $locationProvider){
//	$locationProvider.html5Mode(true);
//	$routeProvider
//    	.when('/admin',{
//    		templateUrl: 'index.html',
//            controller: 'adminController'
//    	})
//        .when('/list_vendor',{
//            templateUrl: '/views/list_vendor.html',
//            controller: 'listVendorController'
//        })
//        .when('/create_vendor',{
//            templateUrl: '/views/create_vendor.html',
//            controller: 'createController'
//        })
//        .otherwise(
//            { redirectTo: '/'}
//        );
}]);

app.controller('loginController',loginCtrl);

function loginCtrl($scope, $http, $httpParamSerializer) {	
	$scope.data = {
	        "grant_type":"password", 
	        "username": "", 
	        "password": ""
    };
	
	$scope.hideMessage = function(){
    	$scope.result_failure=0;  
    }
	
	$scope.userLogin = function(){		
		
		
		$scope.encoded = btoa("client:secret"); 
	    var config = {
	        method: 'POST',
	        url: "/uaa/oauth/token",
	        headers: {
	            "Authorization": "Basic " + $scope.encoded,
	            "Content-type": "application/x-www-form-urlencoded;"
	        },
	        data: $httpParamSerializer($scope.data)
	    }
	    $http(config).then(
    		function(data){
    			var token = data.data['access_token'];
    			window.localStorage.setItem("access_token",token);
    		},
    		function(error){
    			$scope.result_failure=1;  
            	$scope.result_success=0;
            	$("#unauthorized").html("Unauthorized");
	    }); 
	};
}
