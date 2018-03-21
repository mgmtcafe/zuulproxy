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
	
	$scope.userLogin = function(){		
		//var token ="eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MjE2NDY4NDEsInVzZXJfbmFtZSI6ImFkbWluQGFkbWluLmNvbSIsImF1dGhvcml0aWVzIjpbIlZFTkRPUiIsIkFETUlOIl0sImp0aSI6IjA3ZDQzNjY0LWNmY2UtNDc4MC04MDg1LTVhZjgzOWExMGI0NCIsImNsaWVudF9pZCI6ImNsaWVudCIsInNjb3BlIjpbInJlYWQiLCJ3cml0ZSIsIm9wZW5pZCJdfQ.caky9X49XNdzgQYsme3g_ixUD48y4sncV3PISjmm-4vEtkN6KJe5Wm3jRDBdebI3Vt00t9WD_2jKSO5t1UIxR8EqTiygnBiGUqgaanMsf5AKfmE7_mTEoHS0OfAaMjfC4tkmWhUB47y-OJqJLH2-gOKux16QiXK9X2vT3BR6ChfRw-Ynt9QANrB92YV24K3AMdKCqNhOf0eaOVqfhs3xpJS53J-shVJ43TkwvSzsmwNlHnk3pf45NRYMZcpub6oyTm2sFTUBb8n40e12XfYEXcst_pFkt8GLVz81E6flkNYq51_bIyZitps6OAAbGlu2thx3viggB7b1lk3jgX2-tg";
		
		//window.localStorage.setItem("access_token",token);
		
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
	    $http(config).then(function(data){
	    	console.log(data.error);
	    }); 
	    
	    
	};
}
