angular
  .module('app')
  .controller('listVendorController', listVendorCtrl);

function listVendorCtrl($scope, $http) {
	//var vm = this;
	$scope.headingTitle = "Vendor List";
	//Getting vendor list 
	var config = {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With'
            }
        }
	
	var getAllVendorUrl = "http://localhost:8070/admin/listVendor";
		
	var vendorInfo;
	
    $http.get(getAllVendorUrl, config)
        .then(
            function(response) {
            	vendorInfo = response.data;
            	console.log(vendorInfo);
            	if(vendorInfo.status=="OK"){
            		$scope.message = vendorInfo.message; 	
	           	 }else{
	           		$("#error").html(vendorInfo.message);
	           	 }            	        
            },
            function(response) {
            	$("#error").html("**403 Error (Forbidden)");
            }
        );
    
    //END of getting vendor list
	
	
	
    
};