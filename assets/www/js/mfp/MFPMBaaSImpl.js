var AppController = angular.module("AppController");
//An implementation of MBaaSImpl for worklight
//Contains only methods specific to worklight (mobile first platform)
AppController.factory('FMBMBaaSImpl', ['MBaaSImpl', '$q','$http','$rootScope','Logger',
                               function(MBaaSImpl, $q, $http,$rootScope,Logger) {
	// Let us extend the parent first
	angular.extend(this, MBaaSImpl);
	// And now, let us implement the functions

	self.receiverCallback = {};
	return {
		
		// The method that initializes connectivity to mbaas
		// @return a promise
		setupMbaasConnectivity: function() {
			var deferred = $q.defer();
			
			// Establish connectivity to MBaaS
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
			//Added for remote disable feature
			wlInitOptions.showCloseOnRemoteDisableDenial = false;
			// The time we wait till we give up is 5 minutes.
			wlInitOptions.timeout = 300000;
	                // MFP-8 Changes start
			// Let us now initialize worklight
			//WL.Client.init(wlInitOptions);
			deferred.resolve();
                        // MFP-8 Changes end
			// return the promise
			return deferred.promise;
		},
		getValue : function getValue(key){
        	console.log("cordovaProps.data["+key+"] ::: "+cordovaProps.data[key]);
        	return cordovaProps.data[key];
        },
		// The method that invokes a service on mbaas
		// @return a promise
		invokeService: function(request) {
			// Invoke the service.
			// Service details are available in the request json
			WL.Logger.config({autoSendLogs: false});
			var deferred = $q.defer();
			

			console.log("adapter: " + request.adapter);
			console.log("procedure: " + request.procedure);
			console.log("parameters: " + request.parameters);
			console.log("The invocation data is: " + JSON.stringify(request));
			console.log("Making WLResourceRequest request..1 " + JSON.stringify(request));

			var parsedParameter = JSON.parse(request.parameters);
			var serviceName = parsedParameter.SERVICE_NAME;
				       // Code to call java adapter GenericJavaService
                                       // MFP-8 Changes start
                                       var resourceRequest;
              if(request.adapter == 'AuthenticationService' && serviceName != 'RakSetUserIdentifyForPush' && serviceName != 'RakCorpNonLogin2FASIDTService'){
                console.log("===ifff===");
                procedure = 'processRequest';
                resourceRequest = new WLResourceRequest("/adapters/"+request.adapter+"/"+request.procedure,WLResourceRequest.POST,300000);
		        var reqStr = JSON.stringify(request.parameters);
		        var params = [reqStr];
		        var newParams = {'params' : JSON.stringify(params)};
		        console.log("newParams: " + JSON.stringify(newParams));
                resourceRequest.sendFormParameters(newParams).then(function onSuccess(response){
		    	    	       console.log("===ifff==AuthenticationService===");
                                          console.log("FMB_100 Response If AuthenticationService --> "+JSON.stringify(response, null, 4));
                                          if(response.responseJSON.response.hasOwnProperty("errorMessage")){
                                                                              console.log("===ifff==errorMessage==");
                                                                              response.invocationResult = {};
                                                                              response.invocationResult.isSuccessful = response.responseJSON.response.isSuccessful;
                                                                              response.invocationResult.response = JSON.stringify(response.responseJSON.response);
                                                                          }
                                                                          else{
                                                                              console.log("===elseee==errorMessage==");
                                                                              response = response.responseJSON;
                                                                              console.log("==response=stringify=sendFormParameters==="+JSON.stringify(response, null, 4));
                                                                              response.invocationResult = {};
                                                                              response.invocationResult = response.response;
                                                                          }
                                                                          console.log("FMB_102 ---> ", JSON.stringify(response, null, 4));
                                                                          deferred.resolve(response);
                                                                       },function onFailure(errorResponse){
                                                                                          console.log("===failure===sendFormParameters=="+JSON.stringify(errorResponse));
                                                                                          deferred.reject(errorResponse);
                                                                                          });
                                       }
                                       else{
                                       console.log("Not AuthenticationService");
                                       var procedure = 'processRequest';
                                       resourceRequest = new WLResourceRequest("/adapters/"+request.adapter+"/"+procedure,WLResourceRequest.POST,300000);
                                       var reqStr = JSON.stringify(request.parameters);
                                       var params = [reqStr];
                                       var newParams = {'params' : JSON.stringify(params)};
                                       console.log("newParams: " + JSON.stringify(newParams));
                                       resourceRequest.sendFormParameters(newParams).then(
                                                                                          function onSuccess(response){
                                                                                          console.log("===nott==AuthenticationService===");
                                                                                          console.log("request.adapter else -------> "+JSON.stringify(response));
                                                                                         console.log("===nott==AuthenticationService===");
                                                                                                                                   console.log("request.adapter else -------> "+JSON.stringify(response));
                                                                                                                                   response.invocationResult = {};
                                                                                                                                   response.invocationResult.isSuccessful = response.responseJSON.response.isSuccessful;
                                                                                                                                   response.invocationResult.response = JSON.stringify(response.responseJSON.response);
                                                                                                                                   console.log("==22==response=stringify=sendFormParameters==="+JSON.stringify(response));
                                                                                                                                   deferred.resolve(response);
                                                                                          },function onFailure(errorResponse){
                                                                                          console.log("===failure===sendFormParameters=="+JSON.stringify(errorResponse));
                                                                                          deferred.reject(errorResponse);
                                                                                          });
                                       }
                                       // MFP-8 Changes end
			
			// return the promise
			return deferred.promise;
		},
		// The method that disconnects from mbaas
		// @return a promise
		disconnectMbaas: function() {
			// Nothing to do for now
		},
		isAndroidEnv: function() {

		    if(device && device.platform === 'Android'){
        		      return true;
        		    }
        		    else {
        		     return false;
        		    }
			/*if(WL.Client.getEnvironment() == WL.Environment.ANDROID)
				return true;
			else
				return false;*/
		},
		isIPhoneEnv: function() {

		    if(device && device.platform === 'iOS'){
		      return true;
		    }
		    else {
		     return false;
		    }
//			if(WL.Client.getEnvironment() == WL.Environment.IPHONE)
//				return true;
//			else
//				return false;
		},
		isIPadEnv: function() {
			if(WL.Client.getEnvironment() == WL.Environment.IPAD)
				return true;
			else
				return false;
		},
		isMobileWEBEnv: function() {
//        console.log("TO BE REMOVED "+device.platform);
//            if(WL.Client.getEnvironment() == WL.Environment.MOBILE_WEB || WL.Client.getEnvironment() == WL.Environment.DESKTOPBROWSER)
//                return true;
//            else
				return false;
		},
		getDeviceId: function(callBackJsON){
                                       //MFP-8 Changes start
                                       //WL.Device.getID(callBackJsON);
                                       if(device){
                                       if(callBackJsON){
                                       if(device.uuid)
                                       {
                                       callBackJsON.onSuccess({ deviceID: device.uuid});
                                       }
                                       else{
                                       callBackJsON.onFailure("not found");
                                       }
                                       }
                                       return device.uuid;
                                       }else{
                                       return "ABCDE-FGHIJ-KLMNOP";
                                       }
                                       //MFP-8 Chaitu Changes end
		},
		logoutFromFMBRealm: function(){
         	//MFP-8 Changes start
		/*	WL.Client.logout("SingleStepAuthRealm",{onSuccess: function(response){
				WL.Logger.info("Logout triggered success : "+ JSON.stringify(response));
				setTimeout(function(){
					WL.Client.reloadApp();
				},1);
			},
			onFailure:function(errorResponse){
				WL.Logger.info("Logout triggered failed : "+ JSON.stringify(errorResponse));
				setTimeout(function(){
					WL.Client.reloadApp();
				},1);
			}
			});*/
                                       WLAuthorizationManager.logout("UserLogin").then(
                                                                                       function (successResp) {
                                                                                       console.log("===logout onSuccess=="+JSON.stringify(successResp, null, 4));
                                                                                       WL.Client.reloadApp();
                                                                                       },
                                                                                       function (errorResponse) {
                                                                                       console.log("logout onFailure: " + JSON.stringify(errorResponse, null, 4));
                                                                                       //WL.Client.reloadApp();
                                                                                       });
                                      //MFP-8 Changes end
		},
		platformInit: function(initOptions,UIControlsService,rootScope){
			//MFP-8 Changes
			//WL.Client.init(initOptions);
			initOptions.onSuccess();
		},
		getJSONStore: function(){
			return WL.JSONStore;
		},
		showSimpleDialog: function(header,body,buttonText,handlerFunc){
			WL.SimpleDialog.show(header,body,
			[{text: buttonText, handler: handlerFunc}])
		},
		reloadApp: function(){
			WL.Client.reloadApp();
		},
		setServerUrl: function(serverURL,setServerURLSuccess,setServerURLFailure){
			WL.App.setServerUrl(serverURL,setServerURLSuccess,setServerURLFailure);
		},
		getServerUrl: function(getServerURLSuccess, getServerURLFailure){
			WL.App.getServerUrl(self.getServerURLSuccess, self.getServerURLFailure)
		},
		isServerConnected: function(){
			return WL.Events.WORKLIGHT_IS_DISCONNECTED;
		},
		repondChallenge: function(challengeHandler,parameters,invokeProcedure){
			challengeHandler.respondChallenge(parameters);
		},
		enableEncryption: function(){
			return true;
		},
		getIPInfo: function(rootScope){
			if(WL.Client.getEnvironment() == WL.Environment.ANDROID || WL.Client.getEnvironment() == WL.Environment.IPHONE || WL.Client.getEnvironment() == WL.Environment.IPAD ){
				WL.Device.getNetworkInfo(function (networkInfo) {
					console.log ("Ip address of device "+networkInfo.ipAddress);
					$rootScope.IPADDRESS=networkInfo.ipAddress;
				});
			}
		},
		isPreviewEnv: function(){
			if(WL.Client.getEnvironment() == WL.Environment.PREVIEW)
				return true;
			else
				return false;
		},
		getEnvironment: function(){
			return WL.StaticAppProps.ENVIRONMENT;
		},
		isStepupRealmAvailable: function(){
			return true;
		},
		addEventListener: function(actionReceiver){
        	document.addEventListener("deviceready",  actionReceiver, false);
        },
		addActionReceiver: function(actionReceiverName,actionReceiver){
			//WL.App.addActionReceiver(actionReceiverName, actionReceiver);
			self.receiverCallback[actionReceiverName] = actionReceiver;
		},
		overrideBackButton: function(callBack){
                                       // //MFP-8 Changes
                                       //WL.App.overrideBackButton(callBack);
                                       document.addEventListener("backbutton", callBack, false);
		},
		onLoadLoginCallReqd: function(){
			return true;
		},
		getActionReceiver: function(actionReceiverName){
        	return self.receiverCallback[actionReceiverName];
		},

		getEnvironmentType: function(){

		  document.addEventListener('deviceReady')

		}
	};
}]);