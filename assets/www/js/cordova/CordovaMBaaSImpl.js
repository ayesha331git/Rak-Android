
/* JavaScript content from js/cordova/CordovaMBaaSImpl.js in folder common */
var AppController = angular.module("AppController");
//An implementation of MBaaSImpl for worklight
//Contains only methods specific to worklight (mobile first platform)
AppController.factory('FMBMBaaSImpl', ['MBaaSImpl', '$q','$http','$rootScope','$location','TemplateProcessor','UIControlsService', 'ActionProcessor',
                               function(MBaaSImpl, $q, $http, $rootScope,$location,TemplateProcessor,UIControlsService, ActionProcessor) {
	// Let us extend the parent first
	angular.extend(this, MBaaSImpl);
	
	var locDevice;
	
	document.addEventListener("deviceready", onDeviceReadyRead, false);
	self.devServerUrlCollectionName = 'devServerUrl';
	self.devServerUrlFromJsOnStore = '';
	
	self.devServerUrlCollections = {
    		devServerUrl: {
    		}
  	};
	
	self.options = {
        // Optional username, default 'jsonstore'.
        username: '',
        password: '',
        // Optional local key generation flag, default false.
        localKeyGen: false
    };
	
	self.addDevServerUrl = function(devServerUrl,callback) {
    	self.removeAllDevServerUrl();
        var data={};
    	JSONStore.init(self.devServerUrlCollections, self.options)
    	        .then(function() {
    	        	console.log('inside init');
    	                       
    	                        var addOptions = {
    	                            markDirty: true
    	                        };
    	                        
    	                      
    	                        data['devServerUrl']=devServerUrl;
    	                        JSONStore.get(self.devServerUrlCollectionName).add(data, addOptions)
    	                            .then(function(success) {
    	                            	
    	                            	console.log('inside getting',success);
										self.devServerUrlFromJsOnStore = devServerUrl;
    	                            	if(callback)
    	                            		callback(null, "SUCCESS");
    	                                //self.close();
    	                            });
    	                   
    	            })

    	        .fail(function(errorObject) {
    	            // Handle failure for any of the previous JSONStore operations
    	            Logger.info("failed added json data...");
    	        });
    	    };
    	    
    	    
    	    self.getDevServerUrl = function(callback) {

    	    	
    	        JSONStore.init(self.devServerUrlCollections, self.options)
    	            .then(function() {
    	                // handle success
    	               
    	                var options = {
    	                	    limit: 10 //returns a maximum of 10 documents
    	                };
    	                
    	                
    	                JSONStore.get(self.devServerUrlCollectionName)
    	                .findAll(options)
    	                .then(function(arrayResults) {
               
    	                        //self.close();
    	                        devServerUrls = [];
    	                        for (var i = 0; i < arrayResults.length; i++) {
    	                            var obj = {};
    	                            obj.devServerUrl = arrayResults[i].json.devServerUrl;
    	                            devServerUrls.push(obj);
    	                        }
								if(devServerUrls.length>0){
									self.devServerUrlFromJsOnStore = devServerUrls[0].devServerUrl;
									if(callback)
										callback(devServerUrls[0].devServerUrl);										
								}
    	                    })
    	                .fail(function(errorObject) {
    	                        Logger.info("failed getdata json data...");
    	                        callback('Failed to get USER IDs', null);
    	                        // handle failure
    	                    });
    	            }).fail(function(errorObject) {
    	            alert("Failed to retrive");
    	            callback('Failed to connect to JSON Store', null);
    	        });

    	    };
    	    
    	    
    	    
    	    self.removeAllDevServerUrl=function(){
    	    	JSONStore.init(self.devServerUrlCollections, self.options)
    	    	.then(function() {
    	    		
    		    	JSONStore.get(self.devServerUrlCollectionName).clear()
    	    	});

    	    };
	function onDeviceReadyRead() {
	    console.log("===ondevice ready===");
		locDevice = device;
		getDevServerUrl();
		//Dynamic generation of JSON Creds	- start
		console.log("===ondevice ready==locDevice==", locDevice);
		if(locDevice && (locDevice.platform=="Android" || locDevice.platform=="iOS")){
            ActionProcessor.jsonCreds("CMI").then(function(jsonCredsResponse){
                var index = jsonCredsResponse.indexOf(":");
                self.options.username = jsonCredsResponse.slice(0, index);
                self.options.password = jsonCredsResponse.slice(index+1, jsonCredsResponse.length);
                console.log("===self.options==222==="+JSON.stringify(self.options));
            }, function(errorResponse){
                console.log("==CMI====errorResponse==", JSON.stringify(errorResponse));
            });
        }
        else{
            console.log("==CMI====elseee==");
        }
		//Dynamic generation of JSON Creds	- end
	}
	var onBackKeyDown = function(e) { 
		e.preventDefault(); 
	};
	document.addEventListener("backbutton", onBackKeyDown, false);
	
	var cordovaProps = {};
	
	var modifyJsonResponse = function modifyJsonResponse(jsonResponse, request){
		console.log("====jsonResponse===modifyJsonResponse==cordovaHelper=="+JSON.stringify(jsonResponse));
		var returnResponse = {};
		returnResponse.status = 200;
		returnResponse.invocationContext = null;
		returnResponse.invocationResult = {};
//		console.log("====chk errorMessage==modifyJsonResponse===cordovaHelper=="+jsonResponse.responsesList[0].errorMessage);
		if(!jsonResponse.hasOwnProperty("responsesList")){
			if(jsonResponse.hasOwnProperty("error"))
				jsonResponse.errorMsg = jsonResponse.error;
			return jsonResponse;
		}
		if(jsonResponse.responsesList[0].errorMessage || jsonResponse.errorMsg){
			console.log("====chk errorMessage==modifyJsonResponse===cordovaHelper=="+jsonResponse.responsesList[0].errorMessage);
			console.log("request.adapter ::::: "+request.adapter);
			returnResponse.invocationResult.response = JSON.stringify(jsonResponse);
		} else {			
			if (request.adapter == "AuthenticationService") {
				console.log("===AuthenticationService======iff===");
				if(jsonResponse.responsesList[0].hasOwnProperty('action') || jsonResponse.responsesList[0].hasOwnProperty('actionDetails'))
					returnResponse.invocationResult = jsonResponse.responsesList[0];
				else
					returnResponse.invocationResult.response = jsonResponse.responsesList[0];
			}else if(request.adapter == "SMSOTPStepupAuthenticatorService" || request.adapter == "SecurityQuestionsStepupAuthenticatorService"){
				
					returnResponse.invocationResult.response = jsonResponse.responsesList[0];				
					$rootScope.stepupAuthentication.isCompleted=true;
					$rootScope.stepupAuthentication.isEnabled=false;
			}else {
				if(!returnResponse.hasOwnProperty('authorization_action') && (returnResponse.hasOwnProperty('action') || returnResponse.hasOwnProperty('actionDetails')))
					returnResponse.invocationResult = jsonResponse.responsesList[0];
				else	
					returnResponse.invocationResult.response = jsonResponse;
			}
			returnResponse.invocationResult.isSuccessful = true;
			returnResponse.invocationResult.statusCode = 200;
			returnResponse.invocationResult.statusReason = "OK";
		}
		returnResponse.invocationResult.isSuccessful = true;
		returnResponse.invocationResult.statusCode = 200;
		returnResponse.invocationResult.statusReason = "OK";
		console.log("====returnResponse===modifyJsonResponse==cordovaHelper=="+JSON.stringify(returnResponse));
		console.log("====returnResponse===modifyJsonResponse==cordovaHelper=="+JSON.stringify(returnResponse));
		return returnResponse;
	};
	var getValue = function getValue(key){
        	console.log("cordovaProps.data["+key+"] ::: "+cordovaProps.data[key]);
        	return cordovaProps.data[key];
        };
	
	var ObjecttoParams = function ObjecttoParams(obj) {
	    var p = [];
	    for (var key in obj) {
	        p.push(key + '=' + encodeURIComponent(obj[key]));
	    }
	    console.log("===p===ObjecttoParams============="+p);
	    return p.join('&');
	};

	
	// And now, let us implement the functions
	return {
		
		// The method that initializes connectivity to mbaas
		// @return a promise
		setupMbaasConnectivity: function() {
			var deferred = $q.defer();
			
			$http.get("js/cordova/cordovaProps.json").then(function(successResponse){
	            	console.log("=========cordovaProps.json===success======="+ JSON.stringify(successResponse));
	            	cordovaProps = successResponse;
	            	deferred.resolve(successResponse);
	            },function(errorResponse){
	            	console.log("=========cordovaProps.json===error======="+ JSON.stringify(errorResponse));
	            	deferred.reject(errorResponse);
	            });
			/* This function should be used to check the initial security checks and make the connection with 
			MBaaSWeb service call */
			
			/*// Establish connectivity to MBaaS
			wlInitOptions.onSuccess = function() {
				WL.Logger.fatal("Worklight initialized successfully");
				// Keep the promise
				deferred.resolve();
			};
			wlInitOptions.onFailure = function() {
				// There was an error connecting to worklight server
				WL.Logger.fatal("Error initializing worklight");
				// Keep the promise
				deferred.reject();
			};
			
			// The time we wait till we give up is 5 minutes.
			wlInitOptions.timeout = 300000;
			// Let us now initialize worklight
			WL.Client.init(wlInitOptions);
			
			// return the promise*/
			return deferred.promise;
		},
		// The method that invokes a service on mbaas
		// @return a promise
		invokeService: function(request) {
			console.log("inside invokeService :::: ");
			var deferred = $q.defer();
			var requestParam = JSON.stringify(request);
			console.log("=========requestParam===invokeService===cordovaHelper=========="+requestParam);
			var queryUrl = getValue("CONTEXT_URL");
			if(devServerUrlFromJsOnStore != undefined && devServerUrlFromJsOnStore != '')
				queryUrl = devServerUrlFromJsOnStore;
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
				var encodeParam = encodeURIComponent(requestParam);
		 		queryData = "parameters="+encodeParam;	 
		 		console.log("=========requestParam===Encoding complete");
		 	}		
		   
		   	config = {
		                headers : {
		                    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8;'
		                }
		             }
 			 	
			console.log("queryData "+queryData);
			console.log("queryUrl "+queryUrl);
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
									if(thisResponse.hasOwnProperty("forceLoginPassword") && thisResponse.forceLoginPassword){
										var authResponse = {"responseJSON":{"result":""},"invocationResult":{"isSuccessful":"","statusCode":"","statusReason":""}};
										authResponse.responseJSON.result = thisResponse;
										authResponse.invocationResult.isSuccessful = true;
										authResponse.invocationResult.statusCode = 200;
										authResponse.invocationResult.statusReason = "OK";
										singleStepAuthRealmChallengeHandler.trigger('authFailure',authResponse);
										deferred.resolve();
										return deferred.promise();
									}
									else {
									errorResponseFlag = true;
									errorMessageStr = thisResponse.errorMessage;
									}
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
				    		//deferred.reject(successResponse);
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
		// The method that disconnects from mbaas
		// @return a promise
		disconnectMbaas: function() {
			// Nothing to do for now
			return false;
		},
		isAndroidEnv: function() {
			if(locDevice && locDevice.platform=="Android")
				return true;
			else 
				return false;
		},
		isMobileWeb: function(){
			if(locDevice){
				if(locDevice.platform=="browser")
					return true;
				else
					return false;
			}else{
				return true;
			}
		},
		isIPhoneEnv: function() {
			if(locDevice && locDevice.platform=="iOS")
				return true;
			else
				return false;
		},
		isIPadEnv: function() {
			if(locDevice && locDevice.platform=="iOS")
				return true;
			else
				return false;
		},
		isMobileWEBEnv: function() {
			if(locDevice){
				if(locDevice && locDevice.platform=="browser")
					return true;
				else
					return false;
			}else{
				return true;
			}
		},
		getDeviceId: function(callBackJsON){
			return locDevice.uuid;
		},
		logoutFromFMBRealm: function(){
			currentPage = 'RetailUserLoginPage';
			currentSubFeature = 'RetailUserLogin';
			$rootScope.isUserLoggedIn = false;
			$location.path(TemplateProcessor.getUrlForPage('RetailUserLoginPage'));
			$rootScope.$apply();
		},
		platformInit: function(initOptions,UIControlsService,rootScope){
			// will be implemented based on the need
			initOptions.onSuccess();
		},
		getJSONStore: function(){
			if(JSONStore != null)
				return JSONStore;
			else
				return null;
		},
		showSimpleDialog: function(header,body,buttonText,handlerFunc){
			UIControlsService.showAlertOverlayScreen(body, buttonText);
			//implementation logic to be written	
		},
		reloadApp: function(){
			//impelementation logic to be written
			currentPage = 'RetailUserLoginPage';
			currentSubFeature = 'RetailUserLogin';
			$rootScope.isUserLoggedIn = false;
			$location.path(TemplateProcessor.getUrlForPage('RetailUserLoginPage'));
			$rootScope.$apply();
		},
		setServerUrl: function(serverURL,setServerURLSuccess,setServerURLFailure){
			addDevServerUrl(serverURL,setServerURLSuccess);
			// Nothing to do. Leave it to the child.
		},
		getServerUrl: function(getServerURLSuccess, getServerURLFailure){
			getDevServerUrl(getServerURLSuccess);
			// Nothing to do. Leave it to the child.s
		},
		isServerConnected: function(){
			return true;
		},
		repondChallenge: function(challengeHandler,parameters,invokeProcedure){
			invokeProcedure();
		},
		enableEncryption: function(){
			return false;
		},
		getIPInfo: function(rootScope){
			
		},
		isPreviewEnv: function(){
			return false;
		},
		getEnvironment: function(){
			return locDevice.platform;
		},
		isStepupRealmAvailable: function(){
			return false;
		},
		overrideBackButton: function(callBack){
			document.addEventListener("backbutton", callBack, false);
			//onBackKeyDown = callBack;
		},
		addEventListener: function(actionReceiver){
			document.addEventListener("deviceready",  actionReceiver, false);
		},
		addActionReceiver: function(actionReceiverName,actionReceiver){
			// Nothing to do. Leave it to the child.
		},
		onLoadLoginCallReqd: function(){
			return false;
		}
		
	};
}]);