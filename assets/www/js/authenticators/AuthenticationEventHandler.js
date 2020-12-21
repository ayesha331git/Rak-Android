AppController.factory('AuthenticationEventHandler', ['$http', '$q', '$location','$rootScope','TemplateProcessor','Logger',
                               function($http, $q, $location,$rootScope,TemplateProcessor,Logger) {
	// variables that will be used across this service
	var authRealmForm = {};
	var _instance = {};
	var _$scope = {};
	/* IMPORTANT READ FIRST BEFORE EDITING THIS CODE
	 * purposefully adding a wrong auth realm name below. this realm handling via angular does not let the worklight
	 * handler to respond to challenge success completion. this code will no more handle authentication.
	 * Instead use MBUserAuthenticationRealmHandler.js under authenticators
	 */
	var globalAuthenticationHandler;
	if(typeof WL === 'undefined')
		globalAuthenticationHandler = {};
	else
		globalAuthenticationHandler = WL.Client.createChallengeHandler("SingleStepAuthRealmd");
	 /**
	 * purposefully adding a wrong auth realm name below. this realm handling via angular does not let the worklight
	 * handler to respond to challenge success completion. this code will no more handle authentication.
	 * Instead use MBUserAuthenticationRealmHandler.js under authenticators
	 * @constructor
	 */
	globalAuthenticationHandler.isCustomResponse = function(response) {
	    if (!response || !response.responseJSON) {
	        return false;
	    }
	    if (response.responseJSON.authStatus) //authStatus is set by the Java native custom login module
	    	return true;
	    else 
	    	return false;
	};
	
	 /**
	 * handler to respond to challenge success completion. this code will no more handle authentication.
	 * @constructor
	 */
	globalAuthenticationHandler.handleChallenge = function(response){
		Logger.fatal("GlobalAuthenticationHandler handle challenge");
		_instance.handleAuthenticationChallenge(response);
	};
	
	/**
	 * submit LoginForm Callback
	 * @constructor
	 */
	globalAuthenticationHandler.submitLoginFormCallback = function(response) {
	    var isLoginFormResponse = globalAuthenticationHandler.isCustomResponse(response);
	    if (isLoginFormResponse){
	    	globalAuthenticationHandler.handleChallenge(response); //Challenge is received from MBaaS
	    }
	};
	// function definitions
	return {
		/**
		 *  The init method which initializes the templates framework.
		 * @constructor
		 */
		init: function() {
			_instance = this;
			Logger.fatal("$scope : "+  JSON.stringify(_$scope));
			if(!globalAuthenticationHandler){
				globalAuthenticationHandler = WL.Client.createChallengeHandler("SingleStepAuthRealmd");
			} else {
				Logger.fatal("GlobalAuthenticationHandler is already initialized");
			}
		},
		/**
		 *  The handle Authentication Challenge method which handles Authentication.
		 * @constructor
		 */
		handleAuthenticationChallenge:function(response){
			var authStatus = response.responseJSON.authStatus;
			var authMode = response.responseJSON.authMode;
			Logger.fatal("GlobalAuthenticationHandler : invoked for " + authMode + " With status : "+ authStatus);
			if (authStatus == "required"){
				$location.path('resources/loginFeaturePinPage');
				$rootScope.$apply();
				Logger.fatal("Challenge handler screen launched for : "+ authMode);
//				if(authMode == "userformauth"){
//					$location.path('resources/loginFeatureLoginPage');
//					$rootScope.$apply();
//					Logger.fatal("Challenge handler screen launched for : "+ authMode);
//				}
//				if(authMode == "userpinauth"){
//					$location.path('resources/loginFeaturePinPage');
//					$rootScope.$apply();
//					Logger.fatal("Challenge handler screen launched for : "+ authMode);
//				}
			} else if (authStatus == "complete"){
				$('#usernameInputField').val('');
				$('#passwordInputField').val('');
				Logger.fatal("Challenge response successful for authRealmForm");
				globalAuthenticationHandler.submitSuccess();
				$rootScope.$apply();
				
//				if(authMode == "userformauth"){
//					$('#usernameInputField').val('');
//					$('#passwordInputField').val('');
//					Logger.fatal("Challenge response successful for authRealmForm");
//					globalAuthenticationHandler.submitSuccess();
//					$rootScope.$apply();
//				}
//				if(authMode == "userpinauth"){
//					$('#mpinInputField').val('');
//					Logger.fatal("Challenge response successful authRealmMPin");
//					globalAuthenticationHandler.submitSuccess();
//					$rootScope.$apply();
//				}
				
				Logger.fatal("Challenge handled and response completed for : "+ authMode);
			}
		},
		/**
		 *  The invoke Challenge Handler method.
		 * @constructor
		 */
		invokeChallengeHandler:function(challenge){
			Logger.fatal("Challenge invokeChallenge");
		},
		/**
		 *  The customForm Challenge Handler method.
		 * @constructor
		 */
		customFormChallengeHandler:function(){
			var challengeResponse = {};
//			challengeResponse.reqURL = '/userformauth';
			Logger.fatal("Challenge user name : ");
//			var value = $rootScope.respondToChallenge();
			Logger.fatal("Challenge user name vales :  ");
//			var userName = $rootScope.$eval(fields.finacleUserCorporateId);
//			var passWord = $rootScope.$eval(fields.finacleUserPassword);
//			Logger.fatal("Challenge user name : "+ userName + " and password : "+ passWord);
			var options = {};
		   /* options.parameters = {
	    		CorpId : "j****",
	    		PassWord : "*****"
		    };*/
		    options.parameters = $rootScope.mobileAppConfig.appConfigData.AUTH_HANDLER_PARAMS;
		    console.log("options.parameters : "+options.parameters);
		    options.headers = {};
		    challengeResponse.options = options;
		    Logger.fatal("Challenge response for Form: "+ JSON.stringify(challengeResponse));
		    var invocationData = {
		    		adapter : "AuthenticationService",
		    		procedure : "submitAuthentication",
		    		parameters : [options.parameters]
		    };
		    Logger.fatal("Challenge invocation data "+ JSON.stringify(invocationData));
		    globalAuthenticationHandler.submitAdapterAuthentication(invocationData,{});
//		    globalAuthenticationHandler.submitLoginForm(challengeResponse, challengeResponse.options, globalAuthenticationHandler.submitLoginFormCallback);
		},
		/**
		 *  The customMPin Challenge Handler method.
		 * @constructor
		 */
		customMPinChallengeHandler:function(){
			var challengeResponse = {};
			challengeResponse.reqURL = '/userpinauth';
		    var options = {};
		    options.parameters = {
		        mpin : $('#mpinInputField').val()
		    };
		    options.headers = {};
		    challengeResponse.options = options;
		    Logger.fatal("Challenge response for MPin: "+ JSON.stringify(challengeResponse));
		    globalAuthenticationHandler.submitLoginForm(challengeResponse.reqURL, challengeResponse.options, globalAuthenticationHandler.submitLoginFormCallback);
		},
		
		/**
		 *  The get Authentication Handler method.
		 * @constructor
		 */
		getAuthenticationHandler: function() {
			return globalAuthenticationHandler;
		}
	};
}]);