
/* JavaScript content from js/cordova/cordovaHelper.js in folder common */
AppController.factory('MbaasHelperFactory', ['$rootScope', '$http', '$route', '$routeParams', '$location', '$q', '$timeout','$filter',
                                           'Logger', 'HTTPConnector','HTTPMiddlewareImpl','StepupAuthenticateProcessor','UIControlsService',
                                           function($rootScope, $http, $route, $routeParams, $location, $q, $timeout, $filter,
                                        		   Logger, HTTPConnector, HTTPMiddlewareImpl, StepupAuthenticateProcessor, UIControlsService){

	var cordovaProps = {};
	
	document.addEventListener("backbutton", onBackKeyDown, false);
	function onBackKeyDown(e) { e.preventDefault(); }

	var modifyJsonResponse = function modifyJsonResponse(jsonResponse, request){
		console.log("====jsonResponse===modifyJsonResponse==cordovaHelper=="+JSON.stringify(jsonResponse));
		var returnResponse = {};
		returnResponse.status = 200;
		returnResponse.invocationContext = null;
		returnResponse.invocationResult = {};
//		console.log("====chk errorMessage==modifyJsonResponse===cordovaHelper=="+jsonResponse.responsesList[0].errorMessage);
		if(jsonResponse.responsesList[0].errorMessage){
			console.log("====chk errorMessage==modifyJsonResponse===cordovaHelper=="+jsonResponse.responsesList[0].errorMessage);
			console.log("request.adapter ::::: "+request.adapter);
			returnResponse.invocationResult = jsonResponse.responsesList;
		} else {			
			if (request.adapter == "AuthenticationService") {
				console.log("===AuthenticationService======iff===");
				if(jsonResponse.responsesList[0].hasOwnProperty('action') || jsonResponse.responsesList[0].hasOwnProperty('actionDetails'))
					returnResponse.invocationResult = jsonResponse.responsesList[0];
				else
					returnResponse.invocationResult.response = jsonResponse.responsesList[0];
			} else {
				if(jsonResponse.responsesList[0].hasOwnProperty('action') || jsonResponse.responsesList[0].hasOwnProperty('actionDetails'))
					returnResponse.invocationResult = jsonResponse.responsesList[0];
				else	
					returnResponse.invocationResult.response = jsonResponse;
			}
			returnResponse.invocationResult.isSuccessful = true;
			returnResponse.invocationResult.statusCode = 200;
			returnResponse.invocationResult.statusReason = "OK";
		}
		console.log("====returnResponse===modifyJsonResponse==cordovaHelper=="+JSON.stringify(returnResponse));
		return returnResponse;
	};
	
	var ObjecttoParams = function ObjecttoParams(obj) {
	    var p = [];
	    for (var key in obj) {
	        p.push(key + '=' + encodeURIComponent(obj[key]));
	    }
	    console.log("===p===ObjecttoParams============="+p);
	    return p.join('&');
	};



	return{
		init : function init(){
			var def = $q.defer();
			console.log("=========cordovaHelper===init=======");
			 $http.get("js/cordova/cordovaProps.json").then(function(successResponse){
	            	console.log("=========cordovaProps.json===success======="+ JSON.stringify(successResponse));
	            	cordovaProps = successResponse;
	            	def.resolve(successResponse);
	            },function(errorResponse){
	            	console.log("=========cordovaProps.json===error======="+ JSON.stringify(errorResponse));
	            	def.reject(errorResponse);
	            });
	            return def.promise;
		},
		getEnvironment : function getEnvironment(){
			//console.log("=======getEnvironment====cordovaHelper======");
			return "CD";
		},
		initMbaasConnectivity : function initMbaasConnectivity(){ //appController Code
			console.log("=======initMbaasConnectivity====cordovaHelper======");
			var deferred = $q.defer();
			deferred.resolve(true);
			return deferred.promise;
		},
		chkIphoneIpadEnv : function chkIphoneIpadEnv(){ //appController Code
			console.log("=======chkIphoneIpadEnv====cordovaHelper======");
			return false;
			// Need to implement
		},
		chkAndroidEnv : function chkAndroidEnv(){ //appController Code
			console.log("=======chkAndroidEnv====cordovaHelper======");
			return true;
			// Need to implement
		},
		initAuthEventHandler : function initAuthEventHandler(rootScope){ //appController Code
			console.log("=======initAuthEventHandler====cordovaHelper======");
			return true;
			// Need to implement
		},
		invokeService : function invokeService(request){ //ActionProcessor Code
			console.log("inside invokeService :::: ");
			var deferred = $q.defer();
			var requestParam = JSON.stringify(request);
			console.log("=========requestParam===invokeService===cordovaHelper=========="+requestParam);
			var queryUrl = this.getValue("CONTEXT_URL");
			var finalResponse = {};			
		 	var queryData;		 	
		 	var config = {};
		 	
		   if(request.adapter == "UploadProfilePicService") {
		 		var requestParameters = JSON.parse(request.parameters[0]); 
		 		var picData = requestParameters.data;
		 		delete requestParameters.data;
		 		request.parameters[0] = JSON.stringify(requestParameters);
		 		queryData = "parameters="+JSON.stringify(request)+"&data="+picData;		 		
		 	} else {
		 		queryData = "parameters="+requestParam;	            
		 	}		
		   
		   	config = {
		                headers : {
		                    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8;'
		                }
		             }
 			 	
            $http.post(queryUrl, queryData, config).success(function(successResponse, status, headers, config) {
				
					console.log("====invokeService=====successResponse=====cordovaHelper=="+JSON.stringify(successResponse));
					
					
					if(successResponse.isSuccessful == "false") {
				    	console.log( "successResponse.isSuccessful is FALSE : "+JSON.stringify(successResponse.error));
				    	deferred.reject(successResponse);
				    }else if(successResponse.hasOwnProperty('responsesList')){
						var allResponses = successResponse.responsesList;
						var errorResponseFlag = false;
						var errorMessageStr = '';
						for (var index = 0; index < allResponses.length; index++ ) {
								var thisResponse = allResponses[index];

								if (thisResponse.errors) {
									// There was an error.
									// So, we will get all the error messages and break
									errorResponseFlag = true;
									// This is a system error. We cannot show these errors to the
									// the end user (Things like json parsing error, etc). We will
									// put a custom message here
									errorMessageStr = $rootScope.appLiterals.APP.ERROR_MESSAGE.INT_SYS_ERROR;
									break;
								}

								if (thisResponse.errorMessage) {
									// There was an error.
									// So, we will get all the error messages and break
									errorResponseFlag = true;
									errorMessageStr = thisResponse.errorMessage;
									break;
								}
								else if(thisResponse.genericErrorMsg) {
									// There is an generic error message
									// So, we will get all the error messages and break
									errorResponseFlag = true;
									errorMessageStr = thisResponse.genericErrorMsg;
									break;
								}
							}
						if(errorResponseFlag){
							console.log("inside error Message :::: "+errorResponseFlag+" ::: "+errorMessageStr);
				    		successResponse['errorMsg'] = errorMessageStr;
				    		deferred.reject(successResponse);
						}
					}
					
					if (request.adapter == "AuthenticationService" && successResponse.isSuccessful == "true") {
						$rootScope.isUserLoggedIn = true;
						console.log("==============isUserLoggedIn = true============="+JSON.stringify(successResponse.responsesList[0].MenuOptionList));
						$rootScope.dashboard.getMenuOptionDetails(successResponse.responsesList[0]);
					}
					else if (request.adapter == "LogoutService" && successResponse.isSuccessful == "true") {
						$rootScope.isUserLoggedIn = false;
					}			
					
					
					finalResponse = modifyJsonResponse(successResponse, request);
					console.log("====finalResponse===invokeService==cordovaHelper=="+JSON.stringify(finalResponse));
					deferred.resolve(finalResponse);
					
			 }).error(function(errorResponse, status, headers, config) {
				  
					//alert("Service invocation error...!!!"+errorResponse);
				 	//alert(JSON.stringify(errorResponse));
					console.log("===errorResponse===="+JSON.stringify(errorResponse));
					/*console.log("Error status: "+errorResponse.status);						
					console.log("===status===="+status);
					console.log("===headers==="+headers);
					console.log("===config===="+config);*/
					if(errorResponse == null)
						errorResponse = {"errorMsg":"Service Invocation error"};
					deferred.reject(errorResponse);
					
			 });
            
            
			return deferred.promise;		
			
		},
		initOptionsAddEventListeners : function initOptionsAddEventListeners(isMbaasConnected){
			console.log("=======initOptionsAddEventListeners====cordovaHelper======");
			return true;
		},
		chkIsUserLoggedIn : function chkIsUserLoggedIn(){
			console.log("=======chkIsUserLoggedIn====cordovaHelper======");
			return true;
		},
        getValue : function getValue(key){
        	console.log("cordovaProps.data["+key+"] ::: "+cordovaProps.data[key]);
        	return cordovaProps.data[key];
        },
		getAllDocs : function getAllDocs(){
			var deferred = $q.defer();
			console.log("====inside=====invokeService=====cordovaHelper========");
			deferred.reject(null);
			return deferred.promise;
		},
		getAllMPINHistory : function getAllMPINHistory(){
			var deferred = $q.defer();
			console.log("====inside=====getAllMPINHistory=====cordovaHelper========");
			deferred.reject(null);
			return deferred.promise;
		},
		validateAndStoreMPIN : function validateAndStoreMPIN(userId, maxMpinHistoryCount, userMPIN){
			var deferred = $q.defer();
			console.log("====inside=====validateAndStoreMPIN=====cordovaHelper========");
			deferred.reject(null);
			return deferred.promise;
		}
		
		
		
	};
}]);
