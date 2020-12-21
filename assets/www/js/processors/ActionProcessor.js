/**
 * @ngdoc Services
 * @name ActionProcessor
 * @description
 *   Implementation of {@link ActionProcessor}

 * @param {object} http Put description for http
 * @param {object} rootScope Put description for rootScope
 * @param {object} q Put description for q
 * @param {object} location Put description for location
 * @param {object} TemplateProcessor Put description for template processor
 * @param {object} AuthenticationEventHandler Put description for authentication event handler
 * @param {object} EncryptedCacheService Put description for encrypted cache service
 */

AppController.factory('ActionProcessor', ['$http','$injector','$rootScope', '$q', '$location', '$timeout', 'TemplateProcessor', 'EncryptedCacheService', 'ValidationService','UIControlsService','EncryptDecryptService', 'UIStubsService', 'MBaaS','Logger','HTTPConnector','CampaignProcessor','LocaleProcessor','MenuProfileConfigProcessor','StepupAuthenticateProcessor','MenuUIAccessProcessor',
                                          function($http,$injector,$rootScope, $q, $location, $timeout, TemplateProcessor, EncryptedCacheService, ValidationService,UIControlsService,EncryptDecryptService, UIStubsService, MBaaS, Logger,HTTPConnector,CampaignProcessor,LocaleProcessor,MenuProfileConfigProcessor,StepupAuthenticateProcessor,MenuUIAccessProcessor) {

	// variables that will be used across this service
	var featuresList;
	var appInitialized = false;
	var currentPage = '';
	var currentSubFeature = '';
	var currentSuccessResponse = {};
	var currentErrorResponse = {};
	var invokedFromLoginFlow = false;
	var encryptionEnabled = false;
	var isMbaasConnected = true;
	var serverConfig = {};
	var callJsEncrypt = true;
	var enableURLEncrypt = true;
	//var enableURLEncrypt = false;
	var clientTimeOut=600000;
	var finacleApptimer ='';
    var sessionStartTime = '';
    var sessionEndTime = '';

	var  isSessionTimeout='';
	singleStepAuthRealmChallengeHandler.initialize();
	singleStepAuthRealmChallengeHandler.bind('authRequired',function(data){
		//remove the spinner here.
		console.log("authRequired event triggered");
		//fire the setEvent for opening up login page click.
		//CHANGES DONE AS FIX OF PROUAT-3645 START
		if(currentPage == "RetailUserLoginPage" || currentPage == "RakTouchIdRegLoginPage"){
			return;
		}
		//CHANGES DONE AS FIX OF PROUAT-3645 END
		if(currentPage == "FinacleLocationListPage" || currentPage == "FinacleLocationDetailsPage" ||currentPage == "RakFinacleLocationDetailsPage"){
			return;
		}
		console.log("Redirecting to login screen now.");
			if(currentPage == "RetailUserLoginPage"){
		if($rootScope.inputStyle=="material")
			{
			UIControlsService.showDialogBox(undefined,$rootScope.appLiterals.APP.ERROR_MESSAGE.INVALID_SES,$rootScope.appLiterals.APP.BUTTON_TEXT.OK,undefined,function(){
				setGlobalEvent("onErrorPageOKClick");
				},undefined);
			}
		else{
			UIControlsService.showAlertOverlayScreen($rootScope.appLiterals.APP.ERROR_MESSAGE.INVALID_SES,$rootScope.appLiterals.APP.BUTTON_TEXT.OK);
		}

		redirectToLoginOnSessionTimeout();
		}
	});
	singleStepAuthRealmChallengeHandler.bind('authFailure',function(data){


         // MFP 8 changes
         //data.responseJSON.result = JSON.parse(data.user.attributes.queryParams);
         $rootScope.showLoaderForLoginFLow = false;
         $rootScope.$apply();
          // MFP 8 changes

		// For force change password flow, credentials are being cleared on click of OK button in success screen.
		if(typeof data.responseJSON.result.RSAVALUE != 'undefined' && data.responseJSON.result.RSAVALUE=="TRUE"){
			displayErrorMessage = data.responseJSON.result.errorMessage;
			$rootScope.HardTokenModel = data.responseJSON.result;

		}

		else if(typeof data.responseJSON.result.RSAVALUE != 'undefined' && data.responseJSON.result.RSAVALUE=="SOFT_TOKEN"){
			displayErrorMessage = data.responseJSON.result.errorMessage;
			$rootScope.HardTokenModel = data.responseJSON.result;

		}
		else{
		if( data.responseJSON.result.forceLoginPassword == "TRUE" || data.responseJSON.result.forceTxnPassword == "TRUE")
		{
			MF.log(data.responseJSON.result.errorMessage);
			displayErrorMessage = data.responseJSON.result.errorMessage;
			$rootScope.forcePasswordModel = data.responseJSON.result;
			//new App.viewModels.myProfile().forcePasswordMessagePageOnLoad(data.responseJSON.result);
		}
		else
		{
            $rootScope.fields.finacleUserCorporateId ='';
            $rootScope.fields.finacleUserPassword ='';
            $rootScope.fields.finacleCorporateId ='';
			MF.log(data.responseJSON.result.errorMessage);

			// Server not responding valid JSON.
			if (typeof data.responseJSON.result.errorMessage === "undefined")
			{
//				displayErrorMessage = data.responseJSON.result;
// FS Ticket 781395 and 782708
				if(currentPage == "RetailUserLoginPage"){
					$rootScope.checkLoginPageNetworkDown=true;
				}
				displayErrorMessage = $rootScope.appLiterals.APP.ERROR_MESSAGE.CON_ERROR;
			}
			else
			{
				displayErrorMessage = data.responseJSON.result.errorMessage;
			}

			if(data.responseJSON.result.errorCode=='88888888'){
				UIControlsService.showApplicationSwitchScreen(data.responseJSON.result.errorMessage, $rootScope.appLiterals.APP.BUTTON_TEXT.OK);
			}
			else{
			if($rootScope.inputStyle=="material"){
				UIControlsService.showDialogBox(undefined,displayErrorMessage,$rootScope.appLiterals.APP.BUTTON_TEXT.OK,undefined,function(){
					setGlobalEvent("onErrorPageOKClick");
					},undefined);
			}
			else{
				UIControlsService.showAlertOverlayScreen(displayErrorMessage, $rootScope.appLiterals.APP.BUTTON_TEXT.OK);
				}

		}
		}
		}
		if(MBaaS.isStepupRealmAvailable()){
		$rootScope.$apply();
		invokedFromLoginFlow = true;
		}
		if( (typeof data.responseJSON.result.RSAVALUE != 'undefined' && data.responseJSON.result.RSAVALUE=="TRUE")
				&& $rootScope.appVersionDetails.appConfigParams[1].BUILDTYPE == 'PWD'){
			redirectToHardTokenPage();
		}

		else if( (typeof data.responseJSON.result.RSAVALUE != 'undefined' && data.responseJSON.result.RSAVALUE=="SOFT_TOKEN")
				&& $rootScope.appVersionDetails.appConfigParams[1].BUILDTYPE == 'PWD'){
			redirectToSoftTokenPage(data.responseJSON.result);
		}
		else{
		if( (data.responseJSON.result.forceLoginPassword == "TRUE" || data.responseJSON.result.forceTxnPassword == "TRUE")
				&& $rootScope.appVersionDetails.appConfigParams[1].BUILDTYPE == 'PWD')
		{
			redirectToExpireLoginOnError();
		}
		else
		{
			//CHANGES DONE AS FIX OF PROUAT-3645 START
			if(currentPage!="RakTouchIdRegLoginPage")
				{
				redirectToLoginOnError();
				}
			else
				{
				redirectToTouchLoginOnError();
				}
			//CHANGES DONE AS FIX OF PROUAT-3645 END

		}
		}
		invokedFromLoginFlow = false;

	});
	singleStepAuthRealmChallengeHandler.bind('authSuccess',function(data){
		$rootScope.isUserLoggedIn = true;
		data.result = JSON.parse(data.user.attributes.queryParams);
		if(typeof data.result.RSAVALUE != 'undefined' && data.result.RSAVALUE=="TRUE"){
			displayErrorMessage = data.result.errorMessage;
			$rootScope.HardTokenModel = data.result;
		//	redirectToHardTokenPage();

		}

		else if(typeof data.result.RSAVALUE != 'undefined' && data.result.RSAVALUE=="SOFT_TOKEN"){
			displayErrorMessage = data.result.errorMessage;
			$rootScope.HardTokenModel = data.result;
		//	redirectToSoftTokenPage(data.result);

		}

		//remove the spinner here.
		 // MFP 8 changes
		 setTimeout(function(){
		  $rootScope.showLoaderForLoginFLow = false;
          $rootScope.$apply();
		 },400);

		  // MFP 8 changes
		console.log("authSuccess event emitted");
	});


	var redirectToLoginOnError = function (){
		currentPage = 'RetailUserLoginPage';
		currentSubFeature = 'RetailUserLogin';
		$location.path(TemplateProcessor.getUrlForPage('RetailUserLoginPage'));
		$rootScope.$apply();
	};
	//FS Ticket 781395 and 782708 Below function added
	var redirectToPreviousPageOnError = function (){
		$location.path(TemplateProcessor.getUrlForPage(currentPage));
		isMbaasConnected = true;
		singleStepAuthRealmChallengeHandler.isChallengeInProgress = false;
		$rootScope.$apply();
	};

	//CHANGES DONE AS FIX OF PROUAT-3645 START
	var redirectToTouchLoginOnError=function (){
		currentPage = 'RakTouchIdRegLoginPage';
		currentSubFeature = 'RetailUserLogin';
		$location.path(TemplateProcessor.getUrlForPage('RakTouchIdRegLoginPage'));
		$rootScope.$apply();
	};
	//CHANGES DONE AS FIX OF PROUAT-3645 END
	var logoutFromMFPRealm = function(){
		/*WL.Client.logout("SingleStepAuthRealm",{onSuccess: function(response){
			console.log("Logout triggered success : ");
			setTimeout(function(){
				WL.Client.reloadApp();
			},1);
		},
		onFailure:function(errorResponse){
			console.log("Logout triggered failed : ");
			setTimeout(function(){
				WL.Client.reloadApp();
			},1);
		}
		});*/
		MBaaS.logoutFromFMBRealm();
	};

	var redirectToLoginOnSessionTimeout = function (){
//		setTimeout(function(){
//		WL.Client.reloadApp();
//		},3000);
		logoutFromMFPRealm();
	};
	var checkIfMapPageIsLoaded = function(){
		if(currentPage == "FinacleLocationListPage" || currentPage == "FinacleLocationDetailsPage" ||currentPage == "RakFinacleLocationDetailsPage"){
			$rootScope.fields.isMapPage = true;
		}
		else{
			$rootScope.fields.isMapPage = false;
		}
	};

	var redirectToExpireLoginOnError = function (){
		currentPage = 'RakForcePasswordChangeMessage';
		currentSubFeature = 'rakMyProfile';
		$location.path(TemplateProcessor.getUrlForPage('RakForcePasswordChangeMessage'));
		$rootScope.callInProgress=false;
		$rootScope.$apply();
	};


	var redirectToHardTokenPage = function (){
		currentPage = 'RakHardTokenPage';
		currentSubFeature = 'rakMyProfile';
		$location.path(TemplateProcessor.getUrlForPage('RakHardTokenPage'));
		$rootScope.callInProgress=false;
		$rootScope.$apply();
	};


	var redirectToSoftTokenPage = function (response){

		currentSubFeature = 'rak2FARegister';
		if(response.RegisteredForSoftTokenYES){
		$location.path(TemplateProcessor.getUrlForPage('RakCorp2FAGenerateTokenEnterPin'));
		currentPage = 'RakCorp2FAGenerateTokenEnterPin';
		}
		if(response.RegisteredForSoftTokenNo){
			$location.path(TemplateProcessor.getUrlForPage('RakCorp2FASelfRegPopupPage'));
			currentPage = 'RakCorp2FASelfRegPopupPage';
		}
		/*if(response.CORP_SOFT_TOKEN_REQNO){
			$location.path(TemplateProcessor.getUrlForPage('RakCorp2FAMobileNoPage'));
		}*/
		$rootScope.callInProgress=false;
		$rootScope.$apply();
	};
	$rootScope.setSingleStepRealmAuthFailure = function(){
	/*	if(MBaaS.isStepupRealmAvailable())
		singleStepAuthRealmChallengeHandler.submitFailure();*/
		singleStepAuthRealmChallengeHandler.isChallengeInProgress = false;
		console.log("auth is Failure " + singleStepAuthRealmChallengeHandler);
	};
	$rootScope.setLocalizedLiteralsForLocale = function(locale) {
		return TemplateProcessor.setLocalizedLiteralsForLocale(locale);
	};
	/*
	 * The following will consolidate all the functions for MF invocation
	 * However, this will be an angular service going forward, abstracting all the worklight WL calls
	 */
	var MF = {
			//
			getCurrentLocation:function(callback,options){
				options = {
						enableHighAccuracy: false,
						timeout: 5000,
						maximumAge: 0
				};
				function success(pos) {

					$rootScope.currentLocation = {"isSuccess":true,"position":pos,"isInProgress":false};
					$rootScope.map = { center: {latitude:pos.coords.latitude,
						longitude:pos.coords.longitude}, zoom: 10 };
					$rootScope.marker = {
							id: 0,
							coords : {
								latitude: pos.coords.latitude ,
								longitude:  pos.coords.longitude
							},
							options: { draggable: true },
							events: {
								dragend: function (marker, eventName, args) {
									var lat = marker.getPosition().lat();
									var lon = marker.getPosition().lng();
									$rootScope.marker.options = {
											draggable: true,
											labelContent: "Hello",
											labelAnchor: "100 0",
											labelClass: "marker-labels"
									};
								},
//								click:function(marker,eventName,args){
//								$rootScope.showMarkerInfoFlag = {"isVisible":true};
//								alert("Map marker");
//								$rootScope.$apply();
								click: function(marker, eventName, args) {
//									MF.log('shomarkerflag '+ $rootScope.showMarkerInfoFlag);
//									$rootScope.showMarkerInfoFlag = true;
									$rootScope.showMarkerInfo();
									MF.log('shomarkerflag '+ $rootScope.showMarkerInfoFlag);
								}
//								}
							},
							control:{}
					};
					pos.coords.latitude = pos.coords.latitude.toFixed(4); // by default returns high precision data, this is to increase search boundaries.
					pos.coords.longitude = pos.coords.longitude.toFixed(4); // by default returns high precision data, this is to increase search boundaries.
					var crd = pos.coords;
					MF.log('Your current position is:');
					MF.log('Latitude : ' + crd.latitude);
					MF.log('Longitude: ' + crd.longitude);
					MF.log('More or less ' + crd.accuracy + ' meters.');
					callback.onSuccess(pos);
				}
				function error(err) {
					$rootScope.currentLocation = {"isSuccess":false,"position":{},"isInProgress":false};
					MF.log('ERROR(' + err.code + '): ' + err.message);
					callback.onFailure(err);
				}
				$rootScope.currentLocation = {"isSuccess":false,"position":{},"isInProgress":true};
				navigator.geolocation.getCurrentPosition(success, error, options);
			},
			log:function(message){
				console.log(message);
			}
	};



	/*
	 * invokeMFPHTTPService - Is used only for invoking mobilefirst services/adapters. It operates over HTTP.
	 * callback(error,response) -
	 * First argument if not null, indicates no error. example : if (error){ // invocation failed }
	 * The following abstracted function must be part of DI environment, where in different
	 * connectors must be able to plug in and play.
	 * This abstraction below is WIP. Will move to a angular service.
	 */

	 // request.adapter == 'AuthenticationService'
	var invokeMFPHTTPService = function(request,callback,showLoaderFlag){
		console.log("The invocation data in global method is " + JSON.stringify(request));

		$rootScope.prevRequest = request;

		if($rootScope.isStubbedVersion){
			$timeout(
					function() {
						// For Rak customisation
						var modRequestParams=JSON.parse(request.parameters);
						var modRequest = {
								adapter: modRequestParams.SERVICE_NAME,
								procedure: "processRequest",
								parameters: request.parameters
						};
						$rootScope.prevRequest.adapter=modRequestParams.SERVICE_NAME;
						var response = UIStubsService.getResponse(modRequest);
						console.log('--stubresponse--', response);
						// For Rak customisation
						if ($rootScope.prevRequest.adapter == "AuthenticationService") {
							$rootScope.isUserLoggedIn = true;
						}

						if ($rootScope.prevRequest.adapter == "LogoutService") {
							$rootScope.isUserLoggedIn = false;
						}

						isMbaasConnected = true;
						console.log("invokeMFPHTTPService success ");
						if(!angular.isUndefined(response.invocationResult.isSuccessful)){
							console.log("is successful -> ");
						}
						var isSuccessful = response.invocationResult.isSuccessful;
						if(response.invocationResult.response){
							// If we are here, it means this service invocation was a success.
							// However, before we conclude that the service invocation was successful,
							// we have to check for situations where MBanking/EBanking/CoreBanking were not
							// down. Interestingly, when one of these back end systems is down, we get
							// a successful message from mBaas. The only way to find out that everything
							// went fine is to check for the errors flag and errorMessage flag.
							// To check if there were errors, let us run through all the responses

							var responseJson=null;
							// put check for JSON OBJ
							if( typeof response.invocationResult.response =="object"){
								responseJson = response.invocationResult.response;
								callback(false, responseJson);
								return;
							}
							else{
								responseJson = JSON.parse(response.invocationResult.response);
							}
							var allResponses = responseJson.responsesList;
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
							}

							// Let us see if there was an error
							if (errorResponseFlag) {
								// There was an error
								// Let us show the error. If the error message is more than 100 characters, trim
								// it.


								if($rootScope.inputStyle=="material"){
									UIControlsService.showDialogBox(undefined,errorMessageStr,$rootScope.appLiterals.APP.BUTTON_TEXT.OK,undefined,function(){
										setGlobalEvent("onErrorPageOKClick");
										},undefined);
								}
								else{
									UIControlsService.showAlertOverlayScreen(errorMessageStr, $rootScope.appLiterals.APP.BUTTON_TEXT.OK);
								}
								callback(responseJson, responseJson);
							} else {
								// There was no error. This was a successful invocation
								// The flag indicates there was no error
//								StepupAuthenticateProcessor.processRequest(responseJson);
								StepupAuthenticateProcessor.processRequest(thisResponse).then(function(stepUpObject){
									callback(!isSuccessful,responseJson);
								},
								function(error){
									callback(!isSuccessful,responseJson);
								});
									//callback(false, responseJson);
							}
						}else{
//							new StepupAuthenticateProcessor();
							if(!StepupAuthenticateProcessor._isInitialized){
								StepupAuthenticateProcessor.init().then(function(){
									StepupAuthenticateProcessor.processRequest(response).then(function(stepUpObject){
										StepupAuthenticateProcessor._isInitialized = true;
										callback(!isSuccessful,response);

									},
									function(error){
										StepupAuthenticateProcessor._isInitialized = false;
										callback(!isSuccessful,response);
									});
								},function(error){
									//Error reading framework.json file. Handle this with a retry.
									StepupAuthenticateProcessor._isInitialized = false;
								});
							}
							else{
								StepupAuthenticateProcessor.processRequest(response).then(function(stepUpObject){
									callback(!isSuccessful,response);
								},
								function(error){
									callback(!isSuccessful,response);
								});
							}
						}
					},
					200
			);


			return;
		}

		var invokeProcedure = function(){
			MBaaS.invokeService(request).then(
					function(response){

						isMbaasConnected = true;
						console.log("invokeMFPHTTPService success ");
						if(!angular.isUndefined(response.invocationResult.isSuccessful)){
							console.log("is successful -> ");
						}
						var isSuccessful = response.invocationResult.isSuccessful;
						if(response.invocationResult.response){
							// If we are here, it means this service invocation was a success.
							// However, before we conclude that the service invocation was successful,
							// we have to check for situations where MBanking/EBanking/CoreBanking were not
							// down. Interestingly, when one of these back end systems is down, we get
							// a successful message from mBaas. The only way to find out that everything
							// went fine is to check for the errors flag and errorMessage flag.
							// To check if there were errors, let us run through all the responses
							var responseJson=null;
							// put check for JSON OBJ
							if( typeof response.invocationResult.response =="object"){
								responseJson = response.invocationResult.response;
								callback(false, responseJson);
								return;
							}
							else{
								responseJson = JSON.parse(response.invocationResult.response);
							}
							var allResponses = responseJson.responsesList;
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

								if (thisResponse.errorMessage || thisResponse.genericErrorMsg) {
									// There was an error.
									// So, we will get all the error messages and break
									if ( thisResponse.RSAVALUE=="TRUE"){
										$rootScope.HardTokenModel = thisResponse;
										redirectToHardTokenPage();

									}
									if ( thisResponse.RSAVALUE=="SOFT_TOKEN"){
										$rootScope.HardTokenModel = thisResponse;
										redirectToSoftTokenPage(thisResponse);

									}
									else{
									if( thisResponse.forceLoginPassword == "TRUE" || thisResponse.forceTxnPassword == "TRUE")
									{
										$rootScope.forcePasswordModel = thisResponse;
										redirectToExpireLoginOnError();
									}
									else
									{
									errorResponseFlag = true;
									if(thisResponse.errorCode==104){
										thisResponse.genericErrorMsg=$rootScope.appLiterals.APP.ERROR_MESSAGE.CUSTOM_showHostDownScreen_104;
										$rootScope.setSingleStepRealmAuthFailure();
									}
									}
									errorMessageStr = thisResponse.errorMessage || thisResponse.genericErrorMsg;
									break;
									}
								}
							}

							// Let us see if there was an error
							if (errorResponseFlag) {
								// There was an error
								// Let us show the error. If the error message is more than 100 characters, trim
								// it.


								if($rootScope.inputStyle=="material"){
									UIControlsService.showDialogBox(undefined,errorMessageStr,$rootScope.appLiterals.APP.BUTTON_TEXT.OK,undefined,function(){
										setGlobalEvent("onErrorPageOKClick");
										},undefined);
								}
								else{
									UIControlsService.showAlertOverlayScreen(errorMessageStr, $rootScope.appLiterals.APP.BUTTON_TEXT.OK);
								}

								callback(responseJson, responseJson);
							} else {
								// There was no error. This was a successful invocation
								// The flag indicates there was no error
//								StepupAuthenticateProcessor.processRequest(thisResponse).then(function(stepUpObject){
//									callback(!isSuccessful,responseJson);
//								},
//								function(error){
//									callback(!isSuccessful,responseJson);
//								});

								//Required to initialize the Stepup Authenticator here as well

								///adde for rak customization
								if(!StepupAuthenticateProcessor._isInitialized){
									StepupAuthenticateProcessor.init().then(function(){
										StepupAuthenticateProcessor.processRequest(thisResponse).then(function(stepUpObject){
											StepupAuthenticateProcessor._isInitialized = true;
											callback(!isSuccessful,responseJson);

										},
										function(error){
											StepupAuthenticateProcessor._isInitialized = false;
											callback(!isSuccessful,responseJson);
										});
									},function(error){
										//Error reading framework.json file. Handle this with a retry.
										StepupAuthenticateProcessor._isInitialized = false;
									});
								}
								else{
									StepupAuthenticateProcessor.processRequest(thisResponse).then(function(stepUpObject){
										callback(!isSuccessful,responseJson);
									},
									function(error){
										callback(!isSuccessful,responseJson);
									});
								}

								//callback(false, responseJson);
							}
						}else{
							if(!StepupAuthenticateProcessor._isInitialized){
								StepupAuthenticateProcessor.init().then(function(){
									StepupAuthenticateProcessor.processRequest(response).then(function(stepUpObject){
										StepupAuthenticateProcessor._isInitialized = true;
										callback(!isSuccessful,response);

									},
									function(error){
										StepupAuthenticateProcessor._isInitialized = false;
										callback(!isSuccessful,response);
									});
								},function(error){
									//Error reading framework.json file. Handle this with a retry.
									StepupAuthenticateProcessor._isInitialized = false;
								});
							}
							else{
								StepupAuthenticateProcessor.processRequest(response).then(function(stepUpObject){
									callback(!isSuccessful,response);
								},
								function(error){
									callback(!isSuccessful,response);
								});
							}
						}
					},
					function(errorResponse){
						if(MBaaS.disconnectMbaas())
						isMbaasConnected = false;
						if(errorResponse.errorCode=="PROCEDURE_ERROR"){
							errorResponse.errorMsg=$rootScope.appLiterals.APP.ERROR_MESSAGE.CUSTOM_INVOCATION_ERROR;
						}
//FS Ticket 781395 and 782708
						if (errorResponse.errorMsg==null || (errorResponse.errorCode == "UNEXPECTED_ERROR" || errorResponse.errorCode == "UNRESPONSIVE_HOST") && errorResponse.errorMsg !=$rootScope.appLiterals.APP.ERROR_MESSAGE.CUSTOM_WIFI_ERROR){
							 var msg=errorResponse.errorMsg;
							 							 console.log("Printed msg is"+msg);
							 							 console.log("The message is"+(msg && msg.indexOf('version=')!=-1));

							 						     if(msg && msg.indexOf('version=')!=-1){
							 								 errorResponse.errorMsg=MBaaS.isAndroidEnv()  ? $rootScope.appLiterals.APP.ERROR_MESSAGE.ANDROID_MSG : $rootScope.appLiterals.APP.ERROR_MESSAGE.IPHONE_MSG;
							 							 }
							 						     else{
							 						    	 errorResponse.errorMsg=$rootScope.appLiterals.APP.ERROR_MESSAGE.CON_ERROR;
						     }

                            if(currentPage == "RetailUserLoginPage"){
                				$rootScope.checkLoginPageNetworkDown=true;
                			}
                            }

						if (errorResponse.errorMsg!=null  && errorResponse.errorCode == "UNRESPONSIVE_HOST" && errorResponse.errorMsg == $rootScope.appLiterals.APP.ERROR_MESSAGE.CUSTOM_WIFI_ERROR){
							errorResponse.errorMsg=$rootScope.appLiterals.APP.ERROR_MESSAGE.RAKCUSTOM_WIFI_ERROR;
                            if(currentPage == "RetailUserLoginPage"){
                				$rootScope.checkLoginPageNetworkDown=true;
                			}
                            }
						console.log("invokeMFPHTTPService Failure ");
//						$location.path(TemplateProcessor.getUrlForPage(currentPage));
//						$rootScope.$apply();

                        // MFP 8 Changes for Remote disable changes

                        if(!errorResponse.errorCode === "APPLICATION_DISABLED") {

// MFP 8 Changes for Remote disable changes

						if($rootScope.inputStyle=="material"){
							UIControlsService.showDialogBox(undefined,errorResponse.errorMsg,$rootScope.appLiterals.APP.BUTTON_TEXT.OK,undefined,function(){

								setGlobalEvent("onErrorPageOKClick");
								},undefined);
						}else{
							UIControlsService.showAlertOverlayScreen(errorResponse.errorMsg, $rootScope.appLiterals.APP.BUTTON_TEXT.OK);
						}
						  // MFP 8 Changes for Remote disable changes
}
  // MFP 8 Changes for Remote disable changes

						callback(errorResponse,null);
					}

			);
			// End of MBaaS.invokeService
		};
		/*
		 * The following a network check callback, invoked in every service invocation
		 * This code will check reachabilty before invoking a service, gives additional scope to
		 * handle network related errors
		 */
		wlInitOptions.onSuccess = function() {
			console.log("Initialized worklight for MFP : "+ isMbaasConnected);
			if(isMbaasConnected){
				invokeProcedure();
			}
			else{
//FS Ticket 781395 and 782708
				if(currentPage == "RetailUserLoginPage"){
					$rootScope.checkLoginPageNetworkDown=true;
				}


				if($rootScope.inputStyle=="material"){
					UIControlsService.showDialogBox(undefined,$rootScope.appLiterals.APP.ERROR_MESSAGE.CON_ERROR,$rootScope.appLiterals.APP.BUTTON_TEXT.OK,undefined,function(){
						setGlobalEvent("onErrorPageOKClick");
						},undefined);
				}else{
					UIControlsService.showAlertOverlayScreen($rootScope.appLiterals.APP.ERROR_MESSAGE.CON_ERROR, $rootScope.appLiterals.APP.BUTTON_TEXT.OK);
				}
				//FS Ticket 781395 and 782708 Below 1 line added
				redirectToPreviousPageOnError();
				return;
			}
			if(singleStepAuthRealmChallengeHandler.isChallengeInProgress){
				// This is make sure the authentication challenge flow is not opening up the loader
				if(isMbaasConnected){
					$location.path('/navigation/common/resources/FinacleLoaderPage');

					$rootScope.$apply();
				}
			}
		};
		wlInitOptions.onFailure = function() {
			console.log("Error initializing worklight in MFP");
		};
		wlInitOptions.timeout = 300000;
		// Let us now initialize worklight
		//WL.Client.init(wlInitOptions);
		MBaaS.platformInit(wlInitOptions,UIControlsService,$rootScope);
		/*
		 * The following event is registered to capture all network errors during the course of usage in the app.
		 */
		if(MBaaS.isStepupRealmAvailable()){
		document.addEventListener(MBaaS.isServerConnected(), function(data){
			console.log('Not Connected : '+ JSON.stringify(data));
//FS Ticket 781395 and 782708
				if(currentPage == "RetailUserLoginPage"){
					$rootScope.checkLoginPageNetworkDown=true;
				}


			if($rootScope.inputStyle=="material"){
				UIControlsService.showDialogBox(undefined,$rootScope.appLiterals.APP.ERROR_MESSAGE.CON_ERROR,$rootScope.appLiterals.APP.BUTTON_TEXT.OK,undefined,function(){
					setGlobalEvent("onErrorPageOKClick");
					},undefined);
			}else{
				UIControlsService.showAlertOverlayScreen($rootScope.appLiterals.APP.ERROR_MESSAGE.CON_ERROR, $rootScope.appLiterals.APP.BUTTON_TEXT.OK);
			}

//			redirectToLoginOnError();
//FS Ticket 781395 and 782708 Below 1 line added
			redirectToPreviousPageOnError();
			return;
//			WL.Client.reloadApp(); // TODO : implement app reload when there are any critical errors.
		}, false);
		document.addEventListener(MBaaS.isServerConnected(), function(data){
			console.log('Connected to Worklight Server: '+ JSON.stringify(data));
		}, false);
		}

//		WL.Device.getNetworkInfo(function (networkInfo) {
//		console.log("Found IP : " + networkInfo.ipAddress + " with status : "+ networkInfo.isNetworkConnected);
//		console.log("Challenge in progress : "+ singleStepAuthRealmChallengeHandler.isChallengeInProgress);
//		if(!networkInfo.isNetworkConnected){
//		UIControlsService.showAlertOverlayScreen("You're not connected to the internet, please check your connection and try again.", "OK");
//		return;
//		}
//		else{
////		if(isMbaasConnected){
////		invokeProcedure();
////		}
////		else{
////		UIControlsService.showAlertOverlayScreen("Looks like the banking server is not available, please try again later.", "OK");
////		return;
////		}

//		}
//		});
	};

	/*
	 * getModelParameters is used to generate parameters specified service invocation.
	 * All request to mbaas will contain only one param which is the json object (with values)
	 * as specified in the template file.
	 * Remember, we cannot send mbaasParams as json object because the worklight js engine
	 * on mbaas throws an error "Cannot find default value for object". In order to avoid
	 * that, we need to stringify the param and send it to the caller.
	 * The reason behind this error is, JSON objects get encoded before sending and received the same way
	 * or the JSON.parse is invoked by ddefault in the receiving end of mobilefirst service/adapter.
	 * This abstraction below is WIP. Will move to a angular service.
	 */
	var getModelParameters = function(eventInfoParams,currentActionType){
		var mbaasParams = {}; var sensitiveKeys = []; var encryptedSensitiveKeys = [];
		var parameters = []; var paramValue = '';
		// Let us pass the parameters a required for the service
	var promises = [];
	//console.log("===WL.Client.getEnvironment()====="+WL.Client.getEnvironment());
	var modelParametersDefer = $q.defer();
	// Let us pass the parameters a required for the service
	//console.log("====eventInfoParams======"+JSON.stringify(eventInfoParams));
	angular.forEach(eventInfoParams.parameters, function(paramKeyValue, paramKey){
		var selfEncryptedKeys = eventInfoParams.encryptedSensitiveFields;

		if(encryptionEnable){
			var encryptedKeys = eventInfoParams.sensitiveFields;

			var breakFlag = false;
			angular.forEach(encryptedKeys, function(value, key){


				if(!breakFlag){

					if(eventInfoParams.parameters[paramKey] == encryptedKeys[key]){
						// added by cm
						if(paramKey=="DYNAMIC_VARS"){
							dynamicKeyValueCreator(paramKey, eventInfoParams, mbaasParams,encryptionEnable,sensitiveKeys);
							breakFlag = true;
						}else{
							//sweet spot.
							var deferred = $q.defer();

							paramValue = $rootScope.$eval(encryptedKeys[key]);

							encryptDecrypt(paramValue).then(function(encryptedParam){
								//console.log("==init=="+item+"=="+successResp);

								mbaasParams[paramKey] = encryptedParam;
								sensitiveKeys.push(paramKey);
								deferred.resolve(encryptedParam);
							}, function(errorResponse){
								console.log("===errorResponse===="+errorResponse);
							});
							promises.push(deferred.promise);
							breakFlag = true;
						}
					}
					else{
						// added by CM
						if(paramKey=="DYNAMIC_VARS"){
							dynamicKeyValueCreator(paramKey, eventInfoParams, mbaasParams,encryptionEnable,sensitiveKeys);
						}else{
						paramValue = $rootScope.$eval(eventInfoParams.parameters[paramKey]);
						mbaasParams[paramKey] = paramValue;
						}
					}
					}
				});
			}
			else{
				// added by CM
				if(paramKey=="DYNAMIC_VARS"){
					dynamicKeyValueCreator(paramKey, eventInfoParams, mbaasParams,encryptionEnable,sensitiveKeys);
				}else{
				paramValue = $rootScope.$eval(eventInfoParams.parameters[paramKey]);
				mbaasParams[paramKey] = paramValue;
				}
			}
			// Added for Touch id-password flow
			for (var key in selfEncryptedKeys){
                		console.log("Value assessed ");
                		if(eventInfoParams.parameters[paramKey] == selfEncryptedKeys[key]){
                   			paramValue = $rootScope.$eval(selfEncryptedKeys[key]);
                   			mbaasParams[paramKey] = paramValue;
                   			encryptedSensitiveKeys.push(paramKey);
                		}
           		}
		});
	$q.all(promises).then(
		function(results) {

			/*if(encryptedSensitiveKeys.length!=0){
				mbaasParams.encryptedSensitiveKeys = encryptedSensitiveKeys;
			}
			if(encryptionEnable){
				mbaasParams.sensitiveKeys = sensitiveKeys;
			}*/
			for(var confCounter=0;confCounter<$rootScope.mobileAppConfig.appConfigData.appConfigParams.length;confCounter++){
				var keyname =Object.keys($rootScope.mobileAppConfig.appConfigData.appConfigParams[confCounter])[0];
				mbaasParams[keyname] = $rootScope.mobileAppConfig.appConfigData.appConfigParams[confCounter][keyname];
			}
			mbaasParams.USER_REQUEST_ID=$rootScope.userRequestId;

			//Fix for 769183
			if(!(MBaaS.isMobileWEBEnv())){
				$rootScope.machineFingerPrint= navigator.userAgent + "||" + device.model +"||"+device.manufacturer+"||"+device.uuid+"||"+$rootScope.appBuildType+ "||"+ device.version + "||"+$rootScope.mobileAppConfig.appConfigData.appDetails.appVersion+"||"+MBaaS.getEnvironment();
			} else {
				$rootScope.machineFingerPrint= navigator.userAgent+"||"+$rootScope.mobileAppConfig.appConfigData.appDetails.appVersion + "||"+MBaaS.getEnvironment();
			}
			//$rootScope.machineFingerPrint='machinefingerprint';
			if($rootScope.devMode===true && $rootScope.setBankId!=undefined && $rootScope.setBankId!="" && $rootScope.setBankId!=""){

				mbaasParams.BANK_ID =$rootScope.setBankId;

			}
			else{
				mbaasParams.BANK_ID =$rootScope.mobileAppConfig.appConfigData.multiEntity.bankid;
			}
                        mbaasParams.SERVICE_NAME=eventInfoParams.action;
                        mbaasParams.accountParam=$rootScope.fields.accountParam;
			mbaasParams.MBLocale = $rootScope.MBLocale;
			if(typeof currentActionType != 'undefined' && currentActionType == 'serviceExternal'){
				parameters.push(mbaasParams);
				//return parameters;
				modelParametersDefer.resolve(parameters);
			}
			/**
			 * MachineFingerPrint added
			 */
			mbaasParams.machineFingerPrint=$rootScope.machineFingerPrint;
			/**
			 * IPADDRESS added
			 */
			mbaasParams.IPADDRESS=$rootScope.IPADDRESS;

			/**
			 * adding device id
			 */
			mbaasParams.deviceID=$rootScope.analytics.deviceProfile.deviceID;
			/**
			 * adding app version
			 */
			mbaasParams.APP_VERSION=$rootScope.mobileAppConfig.appConfigData.appDetails.appVersion;

			mbaasParams.USER_FOR_LOGGER=$rootScope.fields.finacleUserCorporateId;

			//mbaasParams["adapter"]=eventInfoParams.action; // for MB node server support
			if(!(MBaaS.isMobileWEBEnv())){
				var params = JSON.stringify(mbaasParams);
				if(enableURLEncrypt){
					encryptURL(function(successResponse){
						//secureData = successResponse;
						var secureParams = {};
						//secureParams.id=successResponse;

						var cipherParams = successResponse.slice(0,successResponse.indexOf(":"));
						var hashValue = successResponse.slice(successResponse.indexOf(":")+1,successResponse.length);

						//console.log("=======cipherParams========="+cipherParams);
						//console.log("=======hashValue========="+hashValue);
						secureParams.cdata=cipherParams;
						secureParams.hdata=hashValue;
						secureParams.SERVICE_NAME=mbaasParams.SERVICE_NAME;
						parameters.push(JSON.stringify(secureParams));
						//console.log("=======encrypted parameters========="+parameters);
						modelParametersDefer.resolve(parameters);
					}, function(errorResponse){
						secureData = errorResponse;
			        	modelParametersDefer.reject(errorResponse);
					}, [params],MBaaS);
				} else {
					getHashForURL(function(successResponse){
						var secureParams = {};
						var hashValue = successResponse;
						//console.log("=======hashValue========="+hashValue);
						secureParams.rid=hashValue;
						secureParams.urlParams=params;
						secureParams.SERVICE_NAME=mbaasParams.SERVICE_NAME;
						parameters.push(JSON.stringify(secureParams));
						//console.log("=======plain params with hashcode========="+parameters);
						modelParametersDefer.resolve(parameters);
					}, function(errorResponse){
						secureData = errorResponse;
			        	modelParametersDefer.reject(errorResponse);
					}, [params],MBaaS);
				}
				//console.log("=======completed hashing=========..1"+parameters);
			} else {
				parameters.push(JSON.stringify(mbaasParams));
				//console.log("=======plain parameters========="+parameters);
				modelParametersDefer.resolve(parameters);
			}
		},
		function(response) {
        	//console.log("=======response========="+response);
        	modelParametersDefer.reject(response);
        }
	);
	return modelParametersDefer.promise;
	};

	var encryptDecrypt = function encryptDecrypt(paramValue){
		var deferred = $q.defer();
		var encryptedParam = '';
		if(MBaaS.isAndroidEnv() || MBaaS.isIPhoneEnv() || MBaaS.isIPadEnv()){
			// ANDROID
			console.log("===Android===encryptDecrypt====");
			callJsEncrypt = false;
			encryptParam(function(successResponse){
				encryptedParam = successResponse;
				deferred.resolve(encryptedParam);
			}, function(errorResponse){
				encryptedParam = errorResponse;
				deferred.reject(encryptedParam);
			}, [paramValue]);
		}
		if(callJsEncrypt){
			console.log("===ifff===encryptDecrypt====");
			encryptedParam = EncryptDecryptService.encryption(paramValue); //JS
			deferred.resolve(encryptedParam);
		}
//		deferred.resolve(encryptedParam);
		return deferred.promise;
	};

	 $rootScope.reloadFunction=function(){
		 $rootScope.rakEDirham.clearEdirhamPreloginData();
		 logoutFromMFPRealm();
	   	  WL.Client.reloadApp();
	     };
	     //2FA Registration Flow
	     $rootScope.reloadFunction2FA=function(){
			 logoutFromMFPRealm();
			 setTimeout(function(){
			 		WL.Client.reloadApp();
			 },100);

		     };
		  //2FA Registration Flow
	     $rootScope.hideSessionTimeValueAlert=function() {
             $rootScope.sessionTimeValue = false;
           };

	// changes for client timeout
	function clientSessionTimeout() {
		 clearInterval(finacleApptimer);
         isSessionTimeout="true";
		console.log("SHOW CLIENT SESSION TIMEOUT >>>>>>>> FUNCTION");
		if(!$rootScope.isUserLoggedIn){
			redirectToLoginOnSessionTimeout();
		}
		else{
		setTimeout(function(){
			 $location.path("navigation/common/resources/RakFinacleConfirmationPage");
	            $rootScope.sessionTimeValue = true;
	          	console.log("Safe root scope apply");
	            $rootScope.$apply();
		},200);
		}

	};
    function startSessionTimer(){
            sessionEndTime = new Date().getTime();
            if(sessionEndTime - sessionStartTime>=clientTimeOut){
                        clientSessionTimeout();
            }else{
                        setTimeout(startSessionTimer,1000);
            }

    }
	var dynamicKeyValueCreator=function(paramKey, eventInfoParams, mbaasParams, encryptionEnable,sensitiveKeys){
		var paramKeyArr=eventInfoParams.parameters[paramKey];
		for(var paramCount=0; paramCount< paramKeyArr.length;paramCount++){
		var paramStringArr=paramKeyArr[paramCount].split(',');
		var list=$rootScope.$eval(paramStringArr[0]);
		var key =paramStringArr[1];
		var dynamicKeyName =paramStringArr[2];
			for (var count=0; count<list.length;count++){
				var paramVal=list[count][key];
				if(encryptionEnable==true){
					paramVal = EncryptDecryptService.encryption(paramVal);
					console.log("Value after encryption: ");
					sensitiveKeys.push(dynamicKeyName+(count+1));
				}else
				mbaasParams[dynamicKeyName+(count+1)] = paramVal;
			}
		}
	}
	/*
	 * getNextActionSequenceObject will return the object for next course of action decisions.
	 */
	var getNextActionSequenceObject = function(eventInfo){
		var nextPage = eventInfo.successPage;
		var nextSubFeatureName = '';
		var nextPageName = '';
		// Check if the next page is within the same workflow
		// or a different one
		if (nextPage.hasOwnProperty('subFeature')) {
			// OK, we are moving to a new sub-feature
			if(nextPage.subFeature == "__currentSubFeature__"){
				nextSubFeatureName = currentSubFeature;
			}else{
				nextSubFeatureName = nextPage.subFeature;
			}

			if(nextPage.pageName == "__currentPage__"){
				nextPageName = currentPage;
			}else{
				nextPageName = nextPage.pageName;
			}
		} else {
			// We are going to be in the same subFeature.
			nextSubFeatureName = currentSubFeature;
			if(nextPage.pageName == "__currentPage__"){
				nextPageName = currentPage;
			}else{
				nextPageName = nextPage.pageName;
			}
		}
		console.log("The next page is " + nextPageName);
		console.log("The next subFeature is " + nextSubFeatureName);
		// let us fetch the url for the page
		var pageUrl = TemplateProcessor.getUrlForPage(nextPageName);
		console.log("The next page is " + nextPageName + " with url " + pageUrl);
		console.log("The next subFeature is " + nextSubFeatureName);
		return {"nextPageName":nextPageName,"nextSubFeatureName":nextSubFeatureName,"pageUrl":pageUrl};
	};

	/* Suhas --start
	 * getNextActionSequenceObjectForServiceCall will return the object for
	 * next course (for a service call only) based on condition in prev response.
	 */
	var getNextActionSequenceObjectForServiceCall = function(eventInfo, response) {
	    var nextPage = eventInfo.successPage;
	    var nextSubFeatureName = '';
	    var nextPageName = '';
	    var typeOfSuccessPage = Object.prototype.toString.call(nextPage);

	    // If different pages are to be configured as next page based on condition,
	    //configure it as an array in workflow.json. For example:
	    /*
			  "successPage": [
	                    {
	                    	"condition":"needRSAEnrollment",
	                        "subFeature": "RSAService",
	                        "pageName": "RSAEnrollPage"
	                        },
	                        {
	                        "condition":"isRSAEnrolled",
	                        "subFeature": "RSAService",
	                        "pageName": "RetailUserDashboardPage"
	                        }

	                    ],
	           The below code checks for the variable needRSAEnrollment in the response
	           it has to be either true or false (Not "true" but true).
		*/
	    if (typeOfSuccessPage == "[object Array]") {

	      console.log("The success page configuration is an array.");
	      console.log("Condition is a must in workflow json and response!!");

	      for (index in nextPage) {

	        var condition = nextPage[index].condition;
	        console.log("Condition[" + index + "]-->" + condition);

            if (response.hasOwnProperty('invocationResult')){
                  if (typeof response.invocationResult[""+condition+""] != 'undefined') {

                      if (eval(response.invocationResult[""+condition+""])) {

                           if (nextPage[index].hasOwnProperty('subFeature')) {
                              // OK, we are moving to a new sub-feature
                              nextSubFeatureName = nextPage[index].subFeature;
                              nextPageName = nextPage[index].pageName;
                           } else {
                              // We are going to be in the same subFeature.
                              nextSubFeatureName = currentSubFeature;
                              nextPageName = nextPage[index].pageName;
                           }
                       }
                   }
              }
              else if (response.hasOwnProperty('responsesList')){
                   if (typeof response.responsesList[0][""+condition+""] != 'undefined') {

                      if (response.responsesList[0][""+condition+""]) {

                          if (nextPage[index].hasOwnProperty('subFeature')) {
                             // OK, we are moving to a new sub-feature
                             nextSubFeatureName = nextPage[index].subFeature;
                             nextPageName = nextPage[index].pageName;
                          } else {
                             // We are going to be in the same subFeature.
                             nextSubFeatureName = currentSubFeature;
                             nextPageName = nextPage[index].pageName;
                          }
                      }
                   }
              }
	      }
	    } else {
	      // Check if the next page is within the same workflow
	      // or a different one
	      if (nextPage.hasOwnProperty('subFeature')) {
	        // OK, we are moving to a new sub-feature
	        nextSubFeatureName = nextPage.subFeature;
	        nextPageName = nextPage.pageName;
	      } else {
	        // We are going to be in the same subFeature.
	        nextSubFeatureName = currentSubFeature;
	        nextPageName = nextPage.pageName;
	      }
	      // let us fetch the url for the page
	    }


		var pageUrl = TemplateProcessor.getUrlForPage(nextPageName);
		console.log("The next page is " + nextPageName + " with url " + pageUrl);
		console.log("The next subFeature is " + nextSubFeatureName);
		return {"nextPageName":nextPageName,"nextSubFeatureName":nextSubFeatureName,"pageUrl":pageUrl};
	};
	//Suhas --end
	var setGlobalEvent = function(eventName,timeout,options,eventListlength,callback){

		var deferred = $q.defer();
		// changes for client timeout
//		clearInterval(finacleApptimer);
//		finacleApptimer= setInterval (clientSessionTimeout, clientTimeOut);

		 sessionStartTime = new Date().getTime();

		var currentEventInfo = null;
		console.log("The event called was " + eventName + " in " + currentPage);
//		checkIfMapPageIsLoaded();
		/*
		 * Exceptional case as this event will have no hierarchy to check for now.
		 * However, error alert event will have feature hierarchies in upcoming sprints.
		 */
		if(eventName == "onErrorPageOKClick"){
			// Let us return the promise here, without which the caller will not
			// wait for us to return
			if(currentErrorResponse.hasOwnProperty("responsesList") && currentErrorResponse.responsesList[0].errorCode === "55555")
			{
				//Do Nothing
			}
			else
			{
				UIControlsService.hideAlertOverlayScreen();
			}
			if(rootScope.stepupAuthentication.isCompleted==false && $rootScope.isUserLoggedIn && !$rootScope.isUserLoggedIn){
				$rootScope.isUserLoggedIn = false;
			}
			//Handle session timeout.
			/*Added 104 error response for the issue PCONV-149*/
			if(isSessionTimeout=="true" ||(currentErrorResponse.hasOwnProperty("responsesList") && (currentErrorResponse.responsesList[0].errorCode === 101 || currentErrorResponse.responsesList[0].errorCode === 102 || currentErrorResponse.responsesList[0].errorCode === 104 || currentErrorResponse.responsesList[0].errorCode === "55555"))){
				if(currentErrorResponse.responsesList[0].errorCode === "55555")
					{
					appInitialized = false;
					isSessionTimeout="false";
					 rootScope.reloadFunction();

					}
				else
					{
						appInitialized = false;
						logoutFromMFPRealm();
							isSessionTimeout="false";
					}
			}
					return deferred.promise;
		} else if(eventName == "onErrorPageOKOnlCheckClick") {
			       UIControlsService.hideAlertOverlayScreen();
			       return deferred.promise;

			 if((currentErrorResponse.hasOwnProperty("responsesList") && (currentErrorResponse.responsesList[0].errorCode === 88888888))){
				 $rootScope.blockLogin=true;
				rakHome.redirectPage();
				 //UIControlsService.showAlertOverlayScreen($rootScope.appLiterals.APP.ERROR_MESSAGE.INVALID_SES,$rootScope.appLiterals.APP.BUTTON_TEXT.OK);

				}
			return deferred.promise;
		}
		var workflow = TemplateProcessor.getWorkflowForSubFeature("FinacleCommon");
		workflow.pageNavigation.forEach(function(key,value){
			var globalEvents = workflow.pageNavigation[value][workflow.startPage];
			if(angular.isUndefined(globalEvents)){
				//Handle event not found error here, the return (below) inside forEach equals break.
				return;
			}
			globalEvents.forEach(function(i,v){
				if(globalEvents[v].eventName == eventName){
					console.log("Global event info match in : "+ JSON.stringify(globalEvents[v]));
					currentEventInfo = globalEvents[v];
					return;
				}
				else{
					//Handle additional conditions here
					return;
				}
			});
		});

		console.log("Global event details : " + JSON.stringify(currentEventInfo));
		var formValid = true;
		if(currentEventInfo.validation == 'true'){
			console.log("Validations enabled for page: " + currentPage);
			var validationParams = currentEventInfo.validationParams;
			formValid = ValidationService.performValidation(validationParams);
			if(!formValid){
				$rootScope.callInProgress=false;
				deferred.reject();
			}
		}
		if(!formValid){
			//return
			$rootScope.callInProgress=false;
			deferred.reject();

			return;
		}
		if(MBaaS.enableEncryption() && currentEventInfo.hasOwnProperty('encryptionEnabled')){
			encryptionEnable = currentEventInfo.encryptionEnabled;
		}
		else{
			encryptionEnable = false;
		}
		var nextActionObject={};
		if(currentEventInfo.actionType == "show"){
			//Traverse to the fixed popover confirmation page designed.
			UIControlsService.showConfirmationScreen(currentEventInfo.message.title, currentEventInfo.message.body, currentEventInfo.message.ok, currentEventInfo.message.cancel);
		    $rootScope.callInProgress=false;
		}
		else if(currentEventInfo.actionType == "confirmCancel"){
			//Cancel button touched
			var pageUrl = TemplateProcessor.getUrlForPage(currentPage);
			console.log("Global confirmation Cancel touched : "+ currentPage + " -- url "+ pageUrl);
			$location.path(pageUrl);
			$rootScope.callInProgress=false;
		}
		else if(currentEventInfo.actionType == "confirmOK" || currentEventInfo.actionType == "service" || currentEventInfo.actionType== "serviceNoNavigation"){
			//OK button touched
			console.log("Global confirmation OK touched");
			//TODO:: Temporarily added check for regenerate OTP, need to remove after confirmation from Suresh
			if(currentEventInfo.action.indexOf('Service') > -1 || currentEventInfo.action=="RegenerateSMSOTP"){

//				parameters = getModelParameters(currentEventInfo);
				getModelParameters(currentEventInfo).then(function(parameters){

					if(!MBaaS.isMobileWEBEnv()){
						 invocationData = {
								adapter: "GenericService",
								procedure: "processRequest",
								parameters: parameters
						};
					}
					else{
					 invocationData = {
							adapter: "GenericService",
							procedure: "processRequest",
							parameters: parameters,
							compressResponse: true
					};
					}
				if(currentEventInfo.actionType != "serviceNoNavigation"){
					$rootScope.showLogoutConfirmationHide();
					$location.path('/navigation/common/resources/FinacleLoaderPage');

				}

				console.log("The invocation data is " + JSON.stringify(invocationData));
				invokeMFPHTTPService(invocationData, function(error,response){
					if(error){
					    $rootScope.currentResponseCount++;
						//handle error
						console.log("Error in MFP invocation :" + error );
						console.log('Service invocation returned an error');
						currentErrorResponse = error;
						// Let us launch the error page
						var errorPage = currentEventInfo.errorPage;
						var pageUrl = TemplateProcessor.getUrlForPage(errorPage.pageName);
						console.log("The next page is " + errorPage + " with url " + pageUrl);
						if (errorPage.hasOwnProperty('subFeature')) {
							// OK, we are moving to a new sub-feature
							currentSubFeature = errorPage.subFeature;
						}
						currentPage = errorPage.pageName;

						$location.path(pageUrl);
						deferred.resolve(error);

						return;
					}
					/* parallelization Code START*/
					 if(response)
						{
						 $rootScope.currentResponseCount++;
						if(callback!=undefined && callback!="")
						{
							/*callback value is $rootScope.dashboard.updateTxns
							 eval(function_Name)(Params) accepts the function name as
							 a string and and evaluates and invokes the same
							 */
							console.log(" call Back envoked " + callback + " for Event  " + eventName );
							eval(callback)(response);
						}
						}
					 /* parallelization Code END*/
					console.log('Service invocation was successful');

					//Check for adaptive/stepup authentication flow.
					if($rootScope.stepupAuthentication.isEnabled && currentEventInfo.eventName !='onGenerateOTPClick'){
						$rootScope.stepupAuthentication.currentState = currentEventInfo.successPage;
						currentEventInfo.successPage = $rootScope.stepupAuthentication.format.successPage;
					}
					if($rootScope.stepupAuthentication.isCompleted){
						currentEventInfo = $rootScope.stepupAuthentication.currentState;
						$rootScope.stepupAuthentication.currentState = null;
						$rootScope.stepupAuthentication.isCompleted = false;
						$rootScope.StepupAuthenticate.termsAndConditionLogin="N";
					}


					// Let us launch the next page
					nextActionObject = getNextActionSequenceObject(currentEventInfo);
					currentSuccessResponse = response;


					if(currentEventInfo.actionType == "service"){
						if(eventListlength===undefined || eventListlength==="" || eventListlength===1)
						{
							$location.path(nextActionObject.pageUrl);
						}
						else if(eventListlength===$rootScope.currentResponseCount)
						{
						console.log("All responses obtained hence navigating to " + nextActionObject.pageUrl );
						$location.path(nextActionObject.pageUrl);
						}

					}
					// We have all we need to move to the net page
					// Now that we have moved, let us remember which page we are in
					currentSubFeature = nextActionObject.nextSubFeatureName;
					currentPage = nextActionObject.nextPageName;
					if(currentEventInfo.actionType == "confirmOK"){
						if($rootScope.isStubbedVersion){
							$rootScope.isUserLoggedIn = false;
							$location.path(nextActionObject.pageUrl);
							$rootScope.$apply();

							console.log("Logout triggered success : "+ JSON.stringify(response));
							return;
						}
						logoutFromMFPRealm();
					}
					if($rootScope.isToggleMenuVisible){

					}
					deferred.resolve(response);
				},false);
									},function(error){
										parameters = null;
										deferred.reject(error);
				});
			}
			else{
				//Assuming just a navigation could be a possible transition type
				nextActionObject = getNextActionSequenceObject(currentEventInfo);
				$location.path(nextActionObject.pageUrl);

				// Now that we have moved, let us remember which page we are in
				currentSubFeature = nextActionObject.nextSubFeatureName;
				currentPage = nextActionObject.nextPageName;
			}
		} else if(currentEventInfo.actionType == "navigation") {
			nextActionObject = getNextActionSequenceObject(currentEventInfo);

			console.log("All responses obtained hence navigating to " + nextActionObject.pageUrl );
			$location.path(nextActionObject.pageUrl);

			// Now that we have moved, let us remember which page we are in
			currentSubFeature = nextActionObject.nextSubFeatureName;
			currentPage = nextActionObject.nextPageName;
			 $rootScope.callInProgress=false;
		}

		// We have found the event by the time we are here
		// Let us invoke the service

		//added for support the global event in case of help enabled
		if($rootScope.toggleHelp && currentEventInfo.actionType != "show" && currentEventInfo.actionType != "confirmCancel"){
			$rootScope.toggleHelp = false;
		}
		return deferred.promise;

	//online check
	/*else{
			UIControlsService.showDialogBox(undefined,$rootScope.appLiterals.APP.ERROR_MESSAGE.NET_ERROR,$rootScope.appLiterals.APP.BUTTON_TEXT.OK,undefined,undefined,undefined);
			//UIControlsService.showAlertOverlayScreen($rootScope.appLiterals.APP.ERROR_MESSAGE.NET_ERROR, $rootScope.appLiterals.APP.BUTTON_TEXT.OK);
	    }*/
	};

	//Dynamic generation of JSON Creds	- start
	var jsonCreds = function jsonCreds(calledFrom){
	    console.log("===calledFrom===", calledFrom);
		var jsonCredsDefer = $q.defer();
		getJSONCreds(function(successResponse){
		    console.log("===successResponse====");
		    var index = successResponse.indexOf(":");
		    $rootScope.jsonUser = successResponse.slice(0,index);
		    $rootScope.jsonpswd = successResponse.slice(index+1,successResponse.length);
		    console.log("user is:");
		    console.log("pswd is:");
		    jsonCredsDefer.resolve(successResponse);
		}, function(errorResponse){
		    console.log("===ifff==failed===json creds==errorResponse==");
		    console.log(errorResponse);
		    jsonCredsDefer.reject(errorResponse);
		});
		return jsonCredsDefer.promise;
	};
	//Dynamic generation of JSON Creds	- end

	// function definitions
	return {

		// The init method which initializes the templates framework.
		// This function uses TemplateProcessor to process templates.
		init: function() {
			//rak Customizaqtion
			 //clearInterval(finacleApptimer);
              sessionStartTime = new Date().getTime();
              startSessionTimer();
			  //finacleApptimer= setInterval (clientSessionTimeout, clientTimeOut);
			// Note that we will have to return a promise because the caller
			// is waiting on us to complete this functionality
			var deferred = $q.defer();
			//Open the encrypted cache
//			EncryptedCacheService.openCache();

			//initialize the JSONStore credentials
			if(MBaaS.isAndroidEnv() || MBaaS.isIPhoneEnv() || MBaaS.isIPadEnv()){
				getJSONCreds(function(successResponse){
					console.log("===successResponse====", successResponse);
					var index = successResponse.indexOf(":");
					$rootScope.jsonUser = successResponse.slice(0,index);
					$rootScope.jsonpswd = successResponse.slice(index+1,successResponse.length);
					console.log("user is:");
					console.log("pswd is:");
					console.log("===$rootScope.jsonStore==111===");
					$rootScope.jsonStore.options.username = successResponse.slice(0,index);
					$rootScope.jsonStore.options.password = successResponse.slice(index+1,successResponse.length);
					console.log("===$rootScope.jsonStore==222===", $rootScope.jsonStore.options);
				}, function(errorResponse){
					//console.log(errorResponse);
				});
			}
			//End initialization
			// Three things to do here.
			// Step 1. Initialize the TemplateProcessor
			// Step 2. Find out the launcher page
			// Step 3. Launch the first page

			// Let us initialize TemplateProcessor now
			TemplateProcessor.init().then(
					function(payload) {
						LocaleProcessor.init($rootScope.appVersionDetails).then(function(localeData) {
							MenuProfileConfigProcessor.init().then(function(menuProfileData) {
								MenuUIAccessProcessor.init().then(function(menuUIData) {
								console.log("Locale configuration processed successfully : ");
								console.log("TemplateProcessor's init completed successfully");
								appInitialized = true;
								//console.log("menu profile's init completed successfully"+JSON.stringify(menuProfileData));
							$rootScope.menuList=menuUIData.menuItems;
								$rootScope.favoriteList=menuProfileData.menuItems;

								// app literal values mapping for constant
								$rootScope.monthList=localeData.APP.CONSTANTS.MONTHS.split(',');
								$rootScope.days=localeData.APP.CONSTANTS.DAYS.split(',');

								// Step 2. Let's preload the server configurations file
								// This is required if there are any external server call in the init of first launch page
								serverConfig = TemplateProcessor.getAllServerConfig();
								// Step 3. Let us now find out the launcher page
								var featureStart = TemplateProcessor.getFeatureStart();
								currentSubFeature = featureStart;
								console.log("The subfeature to start is " + featureStart);
								var pageName="";
								pageName = TemplateProcessor.getStartPageForSubFeature(featureStart);
								if(!(MBaaS.isMobileWEBEnv())){
									$rootScope.isPluginEnabled =true;
								}
								else
									{
									$rootScope.isPluginEnabled =false;
									}
								//added for corporate
								if(localStorage.getItem("PageType") && localStorage.getItem("PageType") =='Corp' && window.localStorage.getItem("rememberUserIdStatus") == "true"){
									//pageName="RakCorpUserLoginPage";
									pageName="RetailUserLoginPage";
							//	pageName="RakCorpUserLoginPage";
									$rootScope.isCorpcheked =true;
									$rootScope.headerLogo='app_logo_wrap img-responsive';
									$rootScope.isRetailcheked =false;


								}

								else if(localStorage.getItem("PageType") && localStorage.getItem("PageType") =='Ret' && window.localStorage.getItem("rememberUserIdStatus") == "true"){
									//pageName="RakCorpUserLoginPage";
									pageName="RetailUserLoginPage";
									$rootScope.isRetailcheked =true;
									 $rootScope.headerLogo='app_logo_wrap_sme img-responsive';
									 $rootScope.isCorpcheked =false;
								}
								else{
									 pageName = TemplateProcessor.getStartPageForSubFeature(featureStart);
									 $rootScope.isCorpcheked =false;
									 $rootScope.isRetailcheked =false;
								}
								currentPage = pageName;
								var launchPage = TemplateProcessor.getUrlForPage(pageName);
								console.log("The start page is " + pageName + " with url " + launchPage);
								// Step 3. Let us now launch the page
								$location.path(launchPage);

								// Notify the one who is waiting on this promise
								deferred.resolve(payload);
								deferred.resolve(localeData);
		    				deferred.resolve(menuUIData);
								deferred.resolve(menuProfileData);
							}, function(errorMenuUIData)
			    				{
			    					console.log("Error processing menu UI Access Configs");
				    				deffered.resolve(errorMenuUIData);
			    				});
							}, function(errorLocaleData) {
								console.log("Error processing menu Profile configs");
								deffered.resolve(errorLocaleData);
							});
						}, function(errorLocaleData) {
							console.log("Error processing locale configs");
							deffered.resolve(errorLocaleData);
						});


					}, function(errorPayload) {
						console.log("Error processing templates");
						deferred.reject(errorPayload);
					});

			// Let us return the promise now
			return deferred.promise;
		},
		jsonCreds : jsonCreds,
		// A method that tracks if the app was initialized
		isAppInitialized: function() {
			return appInitialized;
		},
		isUserLoggedIn:function(){
			console.log("isUserLoggedIn in actionprocessor");

			// This snippet is used to controll the isUserLoggedIn during stubbed mode
			if($rootScope.isStubbedVersion){
				return $rootScope.isUserLoggedIn;
			}

			// This is returned in a normal mode
			return singleStepAuthRealmChallengeHandler.isUserLoggedIn("");
		},
		registerNetworkReachability:function(callback){
			if(!callback){
				console.log("Signature for registerNetworkReachability is : registerNetworkReachability(callback). Error aborting.");
				return;
			}
//			WL.Device.get
		},
		setGlobalEvent: setGlobalEvent,
		setEvent: function(eventName,flag,callback,eventListlength) {

			var deferred = $q.defer();
			// changes for client timeout
			// clearInterval(finacleApptimer);
              sessionStartTime = new Date().getTime();
			  //finacleApptimer= setInterval (clientSessionTimeout, clientTimeOut);
			// We should not reset the cached responses.
			// Finacle mobile app will reuse cached responses.
			//currentSuccessResponse = {}; currentErrorResponse = {};
			console.log("The event called was " + eventName + " in " + currentPage);
//			checkIfMapPageIsLoaded();
			if (invokedFromLoginFlow || (eventName == 'onLoginLoad' && !MBaaS.onLoadLoginCallReqd())) {
				// This is a special case handling for the loginFlow event.
				// Here, the onLoginLoad() event gets called within the procesing
				// of onLoginClick. We need to have to this check for handling
				// invalid login scenarios.
				console.log("Will not execute this event");
				deferred.resolve();
				return;
			}
			if((!MBaaS.isStepupRealmAvailable()) && (eventName == "onProfileClick"))
				currentSubFeature="RetailUserLogin";

			var workflow = TemplateProcessor.getWorkflowForSubFeature(currentSubFeature);
			// Let us identify the service to be invoked for this event
			var allPages = workflow.pageNavigation;
			// First, find the current page
			var index;
			for (index = 0; index < allPages.length; index++) {
				var thisPage = allPages[index];
				if (thisPage.hasOwnProperty(currentPage)) {
					// We found the page.
					break;
				}
			}
			// By the time we are here, we have found the page. Just in case, we have not, then it is
			// a serious exception
			if (index >= allPages.length) {
				console.log("Serious error. A page that was present in the configs has gone missing:" + currentPage);
				deferred.error({error: 'Internal error'});
				return;
			}
			// We found the page. Let us find the details of the event now
			var eventsIndex = 0;
			var currentPageEventsList = (allPages[index])[currentPage];
			// Let us now find the event and the corresponding action
			for (; eventsIndex < currentPageEventsList.length; eventsIndex++) {
				if (currentPageEventsList[eventsIndex].eventName == eventName) {
					// We found the event
					break;
				}
			}
			// We have found the event by the time we are here
			// Let us invoke the service
			var currentEventInfo = currentPageEventsList[eventsIndex];
			console.log("currentEventInfo---------------->" + currentEventInfo)

			//console.log("parameters are Alpesh--------------->" + currentEventInfo.parameters)
			//Perform validations on the form if the validations is enabled.
			var formValid = true;

			// Check if the value is not defined. If so, then set it false by default.
			if (_.isUndefined(currentEventInfo.validation)) {
				currentEventInfo.validation = false;
			}

			//CHECK IF AUTH COMPONENT IS THERE
			console.log("Is Authorization required:: "+$rootScope.isAuthorizationFlow);
			if($rootScope.isAuthorizationFlow && currentEventInfo.validation == 'true'){
				//currentEventInfo.validation = 'true';
				if(currentEventInfo.validationParams){
					currentEventInfo.validationParams.push("StepupAuthenticate.primaryAuthModeVal");
				}else{
					currentEventInfo.validationParams = ["StepupAuthenticate.primaryAuthModeVal"];
				}

				if($rootScope.isSecondaryAuthModeVal){
					if($rootScope.secondaryAuthModeVal=="SMS_OTP" || $rootScope.secondaryAuthModeVal=="RSA_SECURE_ID"){
						currentEventInfo.validationParams.push("StepupAuthenticate.RSAorOTP");
					}
					$rootScope.isSecondaryAuthModeVal=false;
				}

				//TODO :: Encryption
				/*currentEventInfo.encryptionEnabled = true;
				if(currentEventInfo.sensitiveFields){
					currentEventInfo.sensitiveFields.push("StepupAuthenticate.primaryAuthModeVal");
				}else{
					currentEventInfo.sensitiveFields = ["StepupAuthenticate.primaryAuthModeVal"];
				}*/

				if(currentEventInfo.parameters){
					currentEventInfo.parameters["Mode"]="StepupAuthenticate.primaryAuthModeVal";
				}else{
					currentEventInfo.parameters = {"Mode" : "StepupAuthenticate.primaryAuthModeVal"};
				}

				$rootScope.isAuthorizationFlow=false;
			}else{
				$rootScope.isAuthorizationFlow=false;
				$rootScope.isSecondaryAuthModeVal=false;
				if(currentEventInfo.validation == 'true' && !currentEventInfo.validationParams){
					currentEventInfo.validation = 'false';
				}
			}

//			if($rootScope.isPassword){
////			alert('password field');
//			var passwordText = $("input[type='password']:first").val();
//			if(passwordText.match(' ')){
//			UIControlsService.showValidationAlert('Password should not allow spaces');
//			$("input[type='password']:first").css({"border-color": "red",
//			"border-width":"1px",
//			"border-style":"solid"});
//			return false;
//			}
//			else{
//			$rootScope.isPassword = false;
//			$("input[type='password']:first").css({"border-color": "#C1E0FF",
//			"border-width":"1px",
//			"border-style":"solid"});
//			}

//			}

			if(currentEventInfo.validation == 'true'){
				console.log("Validations enabled for page: " + currentPage);
				var validationParams = currentEventInfo.validationParams;
				formValid = ValidationService.performValidation(validationParams);

				// If there are errors, then check if a popup is required. If so, display it
				if(!formValid){
                    $rootScope.callInProgress=false;
					var keyArr = Object.keys($rootScope.pageErrorCode);
					for (var i = 0; i < keyArr.length; i++) {
						if(currentEventInfo.validationErrorMessage && currentEventInfo.validationErrorMessage !== null){
							for (var j = 0; j < currentEventInfo.validationErrorMessage.length; j++) {
								var key = Object.keys(currentEventInfo.validationErrorMessage[j])[0];
								if ($rootScope.pageErrorCode[keyArr[i]] == key) {
									/* Commented by sudharsan to fetch message form literals
									UIControlsService.showValidationAlert(currentEventInfo.validationErrorMessage[j][key]); */
									var errMess=$rootScope.$eval('appLiterals.'+currentEventInfo.validationErrorMessage[j][key]);
									console.log("ErrorMessage: "+errMess);
									if($rootScope.inputStyle=="material"){
										UIControlsService.showDialogBox('',errMess);
									}else{
										UIControlsService.showValidationAlert(errMess);
									}

									deferred.reject();
								}
							}
						}
						deferred.reject();
					}
				}
			}

			// If there is no validation error, then proceed.
			if(formValid){
				if(MBaaS.enableEncryption() && currentEventInfo.hasOwnProperty('encryptionEnabled')){
					encryptionEnable = currentEventInfo.encryptionEnabled;
				}
				else{
					encryptionEnable = false;
				}

				var service = currentEventInfo.action;
				var actionType = currentEventInfo.actionType;
				console.log("The action to invoke is " + service +" with type : "+ actionType);

				//parameters = getModelParameters(currentEventInfo,actionType);
				console.log("Parameters to be posted are  ");

				if(eventName == "onOkClick"){ // This feature is now moved
					//WL.Client.logout("SingleStepAuthRealm");
					MBaaS.logoutFromFMBRealm();
					$rootScope.isUserLoggedIn = false;
					console.log("Logout triggered");
				}
				if(MBaaS.isStepupRealmAvailable() && actionType == 'challengeresponse'){
					console.log("getChallengeResponseHandler " + service );
					//parameters = getModelParameters(currentEventInfo);
					getModelParameters(currentEventInfo).then(function(parameters){
						console.log("Parameters to be posted are challengeresponse " + JSON.stringify(parameters));
						if(isMbaasConnected){
							$location.path('/navigation/common/resources/FinacleLoaderPage');
							$rootScope.showLoaderForLoginFLow = true;

						}
						singleStepAuthRealmChallengeHandler.respondChallenge(parameters, function(errorResponse){
                          console.log("WOOO HOO"+ JSON.stringify(errorResponse));
                          if(errorResponse.errorCode && errorResponse.errorCode =="APPLICATION_DISABLED"){
                           $rootScope.callInProgress = false;
                           $rootScope.showLoaderForLoginFLow = false;
                           $rootScope.$apply();
                          }
						});
						$rootScope.callInProgress = false;
						console.log("*************getChallengeResponseHandler*************");
					},function(error){
					    $rootScope.callInProgress = false;
						parameters = null;
						deferred.reject();
					});
					 $rootScope.callInProgress = false;
					 $rootScope.showLoaderForLoginFLow = false;
                     $rootScope.$apply();
					deferred.resolve();
					return deferred.promise;
				}

				var nextActionObject = {};
				getModelParameters(currentEventInfo,actionType).then(function(parameters){
					console.log("Parameters to be posted are  ");
				if(actionType == 'navigation'){
					console.log("*************navigation*************");
				    nextActionObject = getNextActionSequenceObject(currentEventInfo);
					// We have all we need to move to the net page
					$location.path(nextActionObject.pageUrl);

					// Now that we have moved, let us remember which page we are in
					currentSubFeature = nextActionObject.nextSubFeatureName;
					currentPage = nextActionObject.nextPageName;
					deferred.resolve();
					return deferred.promise;
				}
				// actionType is for help icon functionality
				else if(actionType == 'helpNavigation'){
					console.log("*************helpNavigation*************");
					nextActionObject = getNextActionSequenceObject(currentEventInfo);
					//$location.path(nextActionObject.pageUrl);
					var pageUrl = TemplateProcessor.getUrlForPage(nextActionObject.nextPageName);
					$rootScope.showHelpIcon=true; // always true for helpnavigation
					// read the content of html fill in a div and overlay the div
					$rootScope.toggleHelp = !$rootScope.toggleHelp;
					if($rootScope.toggleHelp){
						$.ajax({
							url:pageUrl+'.html',
							async:false,
							success:function(data){
								$('#helpContent').html(data);
							}
						});
					}
					deferred.resolve();
					return deferred.promise;
				}
				else if(actionType == 'serviceExternal'){
					var request = {};
					if(typeof serverConfig[currentEventInfo.action] == 'undefined'){
						console.log("Server configuration missing for the action :" + currentEventInfo.action);
						console.log("Aborting action now. Check your configuration in navigation/externalServersConfig.json and try again");
						deferred.reject();
						return deferred.promise;
					}
					console.log('serverConfig[currentEventInfo.action] : '+ serverConfig[currentEventInfo.action]);
					var serviceConfig = serverConfig[currentEventInfo.action];
					request.service = {};
					request.service.protocol = serviceConfig.protocol;
					request.service.host = serviceConfig.host;
					request.service.port = serviceConfig.port;
					request.service.apiEndpoint = serviceConfig.apiEndpoints[currentEventInfo.apiEndpoint];
					request.method = currentEventInfo.method;
					parameters.analytics = [$rootScope.analytics.deviceProfile,$rootScope.analytics.userProfile];
					request.data = parameters;

					//TODO: Improve error handling in serviceExternal
					HTTPConnector.invokeService(request).then(function(success){
						console.log("Invoked HTTP service successfuly : ");
//						$injector.get(serviceConfig.serviceFactoryHandler[0])['init'](success,currentEventInfo.apiEndpoint);
						$injector.get(serviceConfig.serviceFactoryHandler[0]).init(success,currentEventInfo.apiEndpoint);
						deferred.resolve(success);
					},
					function(error){
						console.log("HTTP service invocation failed : ");
						deferred.reject(error);
					});
					return deferred.promise;
				}
				/**
				 * If we are here, the type of action is service or serviceNoNavigation
				 * Sequence for handling service invocation is detailed below.
				 * The following execution is for workflows with type : service in the JSON configs.
				 * If the actiontype is "service", the following sequence of steps of will be
				 * executed.
				 * 1. Redirect the user to "loader" page
				 * 2. Invoke the service and check the response
				 * 3. If the service invocation was successful, take the user to the next page.
				 * 4. If the service invocation is an error, take the user to the error page (if error page is not
				 * defined, then take the user to the default error page)
				 */

				// Step 1: Let us execute the first step where the loading screen is displayed.
				if((typeof flag == 'undefined') && (actionType != "serviceNoNavigation")){
					if(isMbaasConnected){
						$location.path('/navigation/common/resources/FinacleLoaderPage');

					}
				}

				// Step 2: Invoke the service
//				parameters = getModelParameters(currentEventInfo);
//				console.log("Parameters to be posted are  " + JSON.stringify(parameters));
				var showLoaderFlag = true;
				if(actionType == "serviceNoNavigation"){
					showLoaderFlag = false;
					$rootScope.popoverObject = {
							eventName:eventName,
							response:null,
							isSuccess:false,
							isInProgress:true
					};
					console.log("serviceNoNavigation - flag set to false");
				}

                // || service=='RakSetUserIdentifyForPush'
			   if(service && (service=='EzmComServerAdapter' || service=='RakCorpNonLogin2FASIDTService')){
            	   	console.log("Ezm RakSetUserIdentifyForPush  call Service");
			   }
               else{
if(MBaaS.isMobileWEBEnv()){
				service=service=="AuthenticationService"? "AuthenticationService":"GenericService";
}
else{
	service=service=="AuthenticationService"? "AuthenticationService":"GenericService";
}
               }
				var invocationData = {
						adapter: service,
						procedure: "processRequest",
						parameters: parameters,
						compressResponse: true
				};
//				console.log("The invocation data is " + JSON.stringify(invocationData));
				invokeMFPHTTPService(invocationData, function(error,response){
					if($rootScope.showOverlayFlag)
					{
					$rootScope.showOverlayFlag=false;
					}
					if(error){
						$rootScope.currentResponseCount++;
						//handle error
						console.log("Error in MFP invocation :" + error );
						console.log('Service invocation returned an error');
						currentErrorResponse = error;

						// This is a minor hack and needs to be revisited.
						// There are situations where the backend returns a response
						// with an error message. In those situations, we will still
						// need to parse the response in the UI. Hence, we will set the
						// successreponse to the response we received from the caller.
						currentSuccessResponse = response;
						// Let us launch the error page
						var errorPage = currentEventInfo.errorPage;
						console.log('The error page is ' + JSON.stringify(errorPage));
						var pageUrl = TemplateProcessor.getUrlForPage(errorPage.pageName);
						console.log("The next page is " + errorPage + " with url " + pageUrl);

						// This action type will not just navigate but invoke service.
						if(actionType == 'serviceNoNavigation'){
							$rootScope.popoverObject = {
									eventName:eventName,
									response:currentSuccessResponse,
									isSuccess:true,
									isInProgress:false
							};
							deferred.resolve(response);
							return deferred.promise;
						}
						else{
							$location.path(pageUrl);

						}
						// We have all we need to move to the next page
						// Now that we have moved, let us remember which page we are in
						if (errorPage.hasOwnProperty('subFeature')) {
							// OK, we are moving to a new sub-feature
							currentSubFeature = errorPage.subFeature;
						}

						currentPage = errorPage.pageName;
						deferred.resolve(response);
						return;
					}
					/* parallelization Code START*/
					 if(response)
						{
						 $rootScope.currentResponseCount++;
						if(callback!=undefined && callback!="")
						{
							/*callback value is $rootScope.dashboard.updateTxns
							 eval(function_Name)(Params) accepts the function name as
							 a string and and evaluates and invokes the same
							 */
							console.log(" call Back envoked " + callback + " for Event  " + eventName );
							eval(callback)(response);
						}
						}
					 /* parallelization Code END*/

//					console.log("Success in MFP invocation :" + JSON.stringify(response));
					console.log('Service invocation was successful');


					//Check for adaptive/stepup authentication flow.
					if($rootScope.stepupAuthentication.isEnabled && currentEventInfo.eventName !='onGenerateOTPClick'){
					    //This below if condition is kept here as a fix for FS defect No.796345
					    if(currentEventInfo.eventName != 'onSubmitButtonClick'){
						    $rootScope.stepupAuthentication.currentState = currentEventInfo.successPage;
						    currentEventInfo.successPage = $rootScope.stepupAuthentication.format.successPage;
					    }
					}
					if($rootScope.stepupAuthentication.isCompleted){
						currentEventInfo.successPage = $rootScope.stepupAuthentication.currentState;
						$rootScope.stepupAuthentication.currentState = null;
						$rootScope.stepupAuthentication.isCompleted = false;
					}
					  if ($rootScope.stepupAuthentication.isErrorPage)
                      {
						 currentEventInfo.successPage = $rootScope.stepupAuthentication.currentState;
                         logoutFromMFPRealm();
                      }

					// Let us launch the next page
					var nextActionObject = getNextActionSequenceObjectForServiceCall(currentEventInfo,response);
					currentSuccessResponse = response;
					// This action type will not just navigate but invoke service.
					if(nextActionObject.nextPageName == "Rak2FADeRegInit_PreLogin"){
						$rootScope.isUserLoggedIn = false;
					}


					if(actionType == 'serviceNoNavigation'){
						$rootScope.popoverObject = {
								eventName:eventName,
								response:currentSuccessResponse,
								isSuccess:true,
								isInProgress:false
						};
						deferred.resolve(response);
						return deferred.promise;
					}
					else{
						/* parallelization Code START*/
						/* code changes so that new changes does not impact existing flow */
						if(eventListlength===undefined || eventListlength==="" || eventListlength===1)
						{
							$location.path(nextActionObject.pageUrl);
						}
						else if(eventListlength===$rootScope.currentResponseCount)
						{
							console.log("All responses obtained hence navigating to " + nextActionObject.pageUrl );
							$location.path(nextActionObject.pageUrl);
						}
						/* parallelization Code END*/
					}
					// We have all we need to move to the next page
					// Now that we have moved, let us remember which page we are in
					currentSubFeature = nextActionObject.nextSubFeatureName;
					currentPage = nextActionObject.nextPageName;
					deferred.resolve(response);
					},showLoaderFlag);
				},function(error){
					parameters = null;
					deferred.reject(error);
				});
				return deferred.promise;
			}
			/*else{
				UIControlsService.showDialogBox(undefined,$rootScope.appLiterals.APP.ERROR_MESSAGE.NET_ERROR,$rootScope.appLiterals.APP.BUTTON_TEXT.OK,undefined,undefined,undefined);
			//UIControlsService.showAlertOverlayScreen($rootScope.appLiterals.APP.ERROR_MESSAGE.NET_ERROR, $rootScope.appLiterals.APP.BUTTON_TEXT.OK);
			}*/
		},
		getSuccessResponse:function(){
			return currentSuccessResponse;
		},
		getErrorResponse:function(){
			return currentErrorResponse;
		},
		// Method that fetches the entire literals mapping
		getLocalizedLiterals: function() {
			return TemplateProcessor.getLocalizedLiterals();
		},
		getCurrentPage: function(){
			return currentPage;
		},
		getHelpPageTemplate: function(page) {
			return TemplateProcessor.getHelpPageTemplate(page);
		},
		// Method resets the client session timeout. In case of Closing chat window Else block is executed and loads application accordingly.
		resetTimer :function(flag){
			if(flag==='update'){
				console.log("RESET TIMER UPDATE EXECUTED >>>>>>>>>>>>>>");
				clientTimeOut=1800000;
			}
			else{
				console.log("RESET TIMER RESET EXECUTED >>>>>>>>>>>>>>");
				clientTimeOut=600000;
				startSessionTimer();

			}
		}
	};
}]);
