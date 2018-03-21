var app = angular.module('app', ['ngRoute','ngResource']);
app.config(['$routeProvider','$locationProvider',function($routeProvider, $locationProvider){
}]);
app.controller('loginController',loginCtrl);

function loginCtrl($scope, $http, $httpParamSerializer) {
	console.log("hello");
	$scope.data = {
	        grant_type:"password", 
	        username: "admin@admin.com", 
	        password: "admin", 
    };
	$scope.encoded = btoa("client:secret"); 
    var req = {
        method: 'POST',
        url: "/uaa/oauth/token",
        headers: {
            "Authorization": "Basic " + $scope.encoded,
            "Content-type": "application/x-www-form-urlencoded;"
        },
        data: $httpParamSerializer($scope.data)
    }
    $http(req).then(function(data){
    	console.log(data);
        /*$http.defaults.headers.common.Authorization = 
          'Bearer ' + data.data.access_token;*/
    	alert(data.data.access_token);
        //$cookies.put("access_token", data.data.access_token);
        //window.location.href="index";
    }); 
}
