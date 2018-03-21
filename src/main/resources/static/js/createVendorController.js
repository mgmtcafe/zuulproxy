angular
  .module('app')
  .controller('createController', createVendorCtrl);

function createVendorCtrl($scope, $http) {
	//var vm = this;
	$scope.result_success=0;
	$scope.result_failure=0;
	$scope.headingTitle = "Create Vendor";
	$scope.location;
	
	//Getting location list 
	var config = {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With'
            }
        }
	var getAllLocationUrl = "http://localhost:8080/location/getLocationByAddress/kolkata";
	var locationInfo;
    $http.get(getAllLocationUrl, config)
        .then(
            function(response) {
            	locationInfo = response.data;
            	//console.log(locationInfo);
            	if(locationInfo.status=="OK"){
            		$scope.message = locationInfo.message; 
            		
	           	 }else{
	           		$("#error").html(locationInfo.message);
	           	 }            	        
            },
            function(response) {
            	$("#error").html("**403 Error (Forbidden)");
            }

        );
    //END of getting location list
    
    //Posting values to create Vendor   
    $scope.vendorDetails = {
            "vendorName": "",
            "vendorEmail": "",
            "vendorContact": "",
            "vendorLocationId": "",
            "vendorAddress": ""
            
        };

    $scope.postVendorData = function() {
        var postVendorDataUrl = "http://localhost:8070/admin/createVendor";
        for(var i in locationInfo.message){	
	    	if($scope.location==(locationInfo.message[i].address+", "+locationInfo.message[i].code))      	
	    		$scope.vendorDetails.vendorLocationId=locationInfo.message[i].id;
    	}
        $http.post(postVendorDataUrl, $scope.vendorDetails, config)
            .then(
                function(response) {  
                	if(response.data.status=="OK"){
                		console.log(response.data);
                		$scope.result_success=1;
                		$scope.result_failure=0;
                		$("#outcome-created").html("Vendor Created Successfully!");
                	}
                	else{
                		$scope.result_failure=1; 
                		$scope.result_success=0;
                		console.log(response.data);
                		$("#outcome-notcreated").html("Duplicate Vendor. Vendor not created.");
            		}
                	
                },
                function(response) {
                	$scope.result_failure=1;  
                	$scope.result_success=0;
                	$("#outcome-notcreated").html("Could not create Vendor..");
                }
            );
    	}
    //END of Posting values to create Vendor 
    
    //Hide msg
    $scope.hideMessage = function(){
    	$scope.result_failure=0;  
    	$scope.result_success=0;
    }
    //End Hide msg
    
        
};


