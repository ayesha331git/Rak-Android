/**
 * @ngdoc Controllers
 * @name appController
 * @description
 *   Implementation of {@link appController}
 * @param {object} scope Put description for scope
 * @param {object} rootScope Put description for rootScope
 * @param {object} http Put description for http
 * @param {object} route Put description for route
 * @param {object} routeParams Put description for route params
 * @param {object} location Put description for location
 * @param {object} q Put description for q
 * @param {object} ActionProcessor Put description for action processor
 * @param {object} AuthenticationEventHandler Put description for authentication event handler
 */
AppController.controller("AppController", ['$scope', '$rootScope', '$http', '$route', '$routeParams', '$location', '$q', '$timeout','$filter','$parse','$window',
                                           'ActionProcessor' ,'UIControlsService', 'UIStubsService',
                                           'Logger', 'FMBLoggerImpl',  'MBaaS', 'FMBMBaaSImpl','HTTPConnector','HTTPMiddlewareImpl','StepupAuthenticateProcessor','CurrencyConfigProcessor','PhoneFormatConfigProcessor','ExtMultiBrandingService','QRCodeModelConfigProcessor','EncryptDecryptService','$mdSidenav','$mdDateLocale', '$mdDialog','$location', '$mdMedia','$interval','PushNotification','FMBPushNotificationImpl',
                                           function($scope, $rootScope, $http, $route, $routeParams, $location, $q, $timeout,$filter,$parse,$window,
                                        		   ActionProcessor,  UIControlsService, UIStubsService,
                                        		   Logger, FMBLoggerImpl, MBaaS, FMBMBaaSImpl,HTTPConnector,HTTPMiddlewareImpl,StepupAuthenticateProcessor,CurrencyConfigProcessor,PhoneFormatConfigProcessor,ExtMultiBrandingService,QRCodeModelConfigProcessor,EncryptDecryptService, $mdSidenav, $mdDateLocale, $mdDialog,$location, $mdMedia,$interval,PushNotification,FMBPushNotificationImpl) {


	/*Material Left Menu navigation*/
	$scope.toggleLeftMenu = function() {
	    $mdSidenav('left').toggle();
	  };

	$scope.openLeftMenu = function(isSidenavOpen) {
	//Yogesh Added 788556
		if($location.path() ==="/navigation/common/resources/FinacleLoaderPage")
         {
              return;
         }
		if(isSidenavOpen) {
			$scope.toggleLeftMenu();
		}
	};
	$scope.closeLeftMenu = function(isSidenavOpen) {
	//Yogesh Added 788556
		if($location.path() ==="/navigation/common/resources/FinacleLoaderPage")
         {
              return;
         }
		if(!isSidenavOpen) {
			$scope.toggleLeftMenu();
		}
	}
	/*Material Left Menu navigation*/

	// Initialize method. This method is called when the app launches HTTPConnector,HTTPMiddlewareImpl
	/**
	 * It will start initialization of all the processes
	 * @constructor
	 */
	 $rootScope.checkTheme=false;
	 $rootScope.blockLogin=false;

	$rootScope.checkBGColor=false;
$rootScope.eDirhamAcctType='OPR';

$rootScope.applicationID="RAKCORP"
//FS Ticket 781395 and 782708
	 $rootScope.checkLoginPageNetworkDown=false;
	 $rootScope.hideMenuFlag=false;
	 if($window.localStorage.getItem('isEDhirhamAuth')=="" || $window.localStorage.getItem('isEDhirhamAuth')==null)
	 {
		 $window.localStorage.setItem('isEDhirhamAuth','false');
	 }
	 $rootScope.isEdhirhamAuth=$window.localStorage.getItem('isEDhirhamAuth');
	 if( window.localStorage.getItem('isEDhirhamMenuFlag')=="true")
		{
		 		$rootScope.hideMenuFlag=true;
		}
	else
		{
					$rootScope.hideMenuFlag=false;
		}


	// MFP 8 Login Flow
	$rootScope.showLoaderForLoginFLow = false;

	 
	// $rootScope.checkAppSwitch=false;
	$scope.initializeApp = function() {
		 console.log("APP INITIALISATIONS STARTS TO BE REMOVED 1");
		$scope.successResponse = ActionProcessor.getSuccessResponse();
		$scope.errorResponse = ActionProcessor.getErrorResponse();
		Logger.fatal("Success and error callback registered !" + $scope.successResponse);

		if (ActionProcessor.isAppInitialized()) {
			// This method gets called every time a new page is routed to.
			// We need this check without which we end up in an infinite loop with
			// each page launch triggering an app launch

			 /* added for theme color check */
	            if($rootScope.checkTheme===true)
	            {
	               //if(!(WL.Client.getEnvironment() == WL.Environment.MOBILE_WEB || WL.Client.getEnvironment() == WL.Environment.DESKTOPBROWSER))
					if(!(MBaaS.isMobileWEBEnv()))
	                {
	                    if(typeof($rootScope.userRequestId) == "undefined")
	                      $rootScope.loadTheme();
	                }
	            }
			/*theme color check end*/						   
			
			//Runtime checksum
			if($rootScope.checkBGColor===true)
			{
				var currentPage = ActionProcessor.getCurrentPage();
				if(currentPage == "RetailUserLoginPage" ){
					if(MBaaS.isAndroidEnv())
					{
						$rootScope.loadBGColor();
					}
				}
			}
			
			$rootScope.MF.getCurrentLocation({
				onSuccess:function(data){
					$rootScope.MF.log("Current location identification successful : "+ JSON.stringify(data));
				},
				onFailure:function(error){
					$rootScope.MF.log("Current location identification failed. : "+ JSON.stringify(error));
				}
			}, {});
			return;
		}

		x2=$rootScope;
		// Setup the Constants
		//Set the enableLog to true to enable WL Logger
		$rootScope.enableLog=false;
		// Step up authentication - default values set.
		$rootScope.stepupAuthentication = {};
		$rootScope.stepupAuthentication.isEnabled = false;
		$rootScope.isAuthorizationFlow=false;
		$rootScope.stepupAuthentication.response = null;
		$rootScope.stepupAuthentication.isErrorPage=false;

		// changes
		$rootScope.enableIPFetch = false;
		$rootScope.enableDeviceIDFetch = false;


		$rootScope.headerLogo='app_logo_wrap img-responsive';

		// Analytics for mobile marketing default values set.
		$rootScope.analytics = {};
		$rootScope.analytics.deviceProfile = {
				deviceID:'',
				userAgent:'',
				location:{}
		};
		$rootScope.analytics.userProfile = {
				location:{},
				customerName:''
		};


		// Added for RAK dual hit check

		$rootScope.callInProgress = false;
		// Added for RAK dual hit check


		// Added for RAK Login page flow
		$rootScope.isReloadReqd=false;
        // Added for RAK Login page flow


		//initialize all viewmodels here
		$rootScope.devMode = true;

		$rootScope.isCorpcheked =false;
		 $rootScope.isRetailcheked =false;
		 $rootScope.isPluginEnabled =false;


		if($rootScope.devMode === true) {
			if(window.localStorage.getItem("isStubbed")!=null && window.localStorage.getItem("isStubbed")!="" && window.localStorage.getItem("isStubbed")=="true" ){

				$rootScope.isStubbedVersion =true;
			}
			else
			{
				$rootScope.isStubbedVersion = false;
			}

		}
		else{
			$rootScope.isStubbedVersion = false;

		}
		$rootScope.isStubbedVersion =false;
		$rootScope.homeCurrencyCode=null;
		$rootScope.isitReloading=true;
		// Touch ID variables
		$rootScope.displayTouchIDPopup = false;

		//772297 start
		$rootScope.serverBusinessDate = null;
		//772297 end
		$rootScope.isTouchIDLogin = false;
		$rootScope.isTouchIDActivation = false;
		$rootScope.isResignedActivationStatus = false;
		$rootScope.touchIDLoginUser = false;
		$rootScope.biometricType = "";
		//770314
		$rootScope.showProcessingOverlay = false;
		//$rootScope.isEstatus = false;
		/* commented for 771484 */
		//$rootScope.statusOfRequest = false;

		$rootScope.WIDTH = $(window).width();
		$rootScope.HEIGHT = $(window).height();
		$rootScope.inputStyle = "materialNot";
		$rootScope.appBuildType ="Phone";

		// Push Changes Start
		$rootScope.pushInitSuccess = false;
		$rootScope.isMFP8 = true;
		// Push Changes End


	//	$rootScope.applicationID = WL.Client.getAppProperty(WL.AppProperty.APP_DISPLAY_NAME);
	//	 $rootScope.applicationVersion =WL.Client.getAppProperty(WL.AppProperty.APP_VERSION);
		 //console.log ("applicationID######   "+ $rootScope.applicationID);
		 //console.log ("applicationVersion######   "+$rootScope.applicationVersion);
		if($rootScope.devMode !== true) {
			//alert("IP Fetch:"+$rootScope.enableIPFetch);
			if($rootScope.enableIPFetch===true){
			MBaaS.getIPInfo($rootScope);
			if(WL.Client.getEnvironment() == WL.Environment.ANDROID || WL.Client.getEnvironment() == WL.Environment.IPHONE || WL.Client.getEnvironment() == WL.Environment.IPAD ){
				WL.Device.getNetworkInfo(function (networkInfo) {
					//console.log ("Ip address of device "+networkInfo.ipAddress);
					$rootScope.IPADDRESS=networkInfo.ipAddress;
				});
			}
		}
		//console.log("IPAddress"+$rootScope.IPADDRESS);

		/*
		 * code to get device ID using worklight
		 */


		if($rootScope.enableDeviceIDFetch===true){
			//alert("Fetching ID");
			//if(!(WL.Client.getEnvironment() == WL.Environment.MOBILE_WEB || WL.Client.getEnvironment() == WL.Environment.DESKTOPBROWSER))
			if(!MBaaS.isMobileWEBEnv())
			{
				MBaaS.getDeviceId({onSuccess : function(o) {
					console.log ("getID: " + o);
					$rootScope.analytics.deviceProfile.deviceID = o.deviceID;
			    }, onFailure : function(e) {
			    	console.log ("Error getting ID: " + e);
			    	$rootScope.analytics.deviceProfile.deviceID = 'ABCDEFG-HIJK-1234-5678-MNOPQR';
				    }});
				}
			}
		} /*else {
			$rootScope.analytics.deviceProfile.deviceID = 'ABCDEFG-HIJK-1234-5678-MNOPQR';
		}*/
		$rootScope.analytics.deviceProfile.userAgent = navigator.userAgent;

		//end changes for fetching device ID

		// Let us first complete Step 1
		//MFP-8 Commented
		//Logger.init(FMBLoggerImpl);

		// Now, let us move to step 2 where we initialize mbaas connectivity
		MBaaS.init(FMBMBaaSImpl);

		/**
		 * It will re-initialise ViewModel and clear memory of viewmodel.
		 * @constructor
		 */
		$rootScope.reinitialiseViewModel=function(){

			$rootScope.appVersion=null;

			$rootScope.notifications=null;

			$rootScope.home=new App.viewModels.home($rootScope.isStubbedVersion);
			$rootScope.AuthenticationModel=new App.viewModels.AuthenticationModel();
			$rootScope.appVersion=new App.viewModels.appVersion(Logger,$rootScope,CurrencyConfigProcessor);

		    $rootScope.notifications=new App.viewModels.notifications(Logger, $scope, $rootScope, $timeout);
		     $rootScope.StepupAuthenticate=new App.viewModels.StepupAuthenticate(Logger, $scope,$rootScope);
		};

		$rootScope.home=new App.viewModels.home($rootScope.isStubbedVersion);
		$rootScope.AuthenticationModel=new App.viewModels.AuthenticationModel();
		$rootScope.jsonStore=new App.viewModels.jsonStore(Logger, $scope, $http, MBaaS);
		$rootScope.dashboard=new App.viewModels.dashboard($rootScope,$scope,$filter,Logger,CurrencyConfigProcessor,$mdDateLocale,ExtMultiBrandingService,$rootScope.jsonStore,MBaaS, ActionProcessor,PushNotification);

		$rootScope.pushNotificationHandler=new App.viewModels.pushNotificationHandler(Logger, MBaaS, $rootScope, $rootScope.keyStorage,$filter,$q, ActionProcessor);	//Ravi changes for Push

		$rootScope.myProfile=new App.viewModels.myProfile($rootScope.jsonStore,Logger,$rootScope,$scope,ActionProcessor,CurrencyConfigProcessor,$window,EncryptDecryptService,MBaaS,UIControlsService,$mdDialog,PushNotification);
		$rootScope.appVersion=new App.viewModels.appVersion(Logger,$rootScope);

		$rootScope.mobileAppConfig = new App.viewModels.mobileAppConfig($scope,Logger);
		$rootScope.utils=new App.viewModels.utils(Logger);
	    $rootScope.appActivation=new App.viewModels.appActivation($rootScope,$rootScope.utils,$scope,$rootScope.jsonStore,Logger,EncryptDecryptService,$q,MBaaS);
		$rootScope.notifications=new App.viewModels.notifications(Logger, $scope, $rootScope, $timeout);

		$rootScope.StepupAuthenticate=new App.viewModels.StepupAuthenticate(Logger, $scope,$rootScope);
		$rootScope.menuProfile = new App.viewModels.menuProfile($rootScope, Logger);
		// RAK specific view models loaded from here
		$rootScope.rakHome=new App.viewModels.rakHome($rootScope.isStubbedVersion,Logger,ActionProcessor,$scope,$rootScope,UIControlsService);

		//RAK: added for service req
		$rootScope.rakServiceReq=new App.viewModels.rakServiceReq($scope, $rootScope, UIControlsService,Logger,ActionProcessor,MBaaS);
                //addded for 2FA integration
                 $rootScope.rak2FARegister=new App.viewModels.rak2FARegister($rootScope,$scope,UIControlsService,Logger,ActionProcessor);
		//RAK:3: added for Locate Us

		//RAK:  - added for Fund Tfr
		$rootScope.rakFundTfr=new App.viewModels.rakFundTfr($scope, $rootScope, UIControlsService,Logger);
		//RAK:  - added for Fund Tfr

		$rootScope.rakLocateUs=new App.viewModels.rakLocateUs($scope,UIControlsService,Logger,$rootScope);
		//RAK:3: added for Online register
		$rootScope.rakRegister=new App.viewModels.rakRegister($scope,UIControlsService,Logger);
		//RAK:added for transaction

		$rootScope.rakSendMoney=new App.viewModels.rakSendMoney($scope,$rootScope,Logger,ActionProcessor);
		$rootScope.rakAccounts=new App.viewModels.rakAccounts($scope,$rootScope,Logger);
		//RAK:  - added for Trade fin
		$rootScope.rakTradeFinance=new App.viewModels.rakTradeFinance($scope,$rootScope,Logger);
		//RAK:  - added for Trade fin
        $rootScope.rakContactUs=new App.viewModels.rakContactUs($rootScope,UIControlsService);
		$rootScope.rakMails=new App.viewModels.rakMails($rootScope,Logger);
		//RAK:added for My Profile
		$rootScope.rakMyProfile=new App.viewModels.rakMyProfile($rootScope.jsonStore,Logger,$rootScope,$scope);
		/* RAK:Sindhu: Added for Beneficiary Management module customization-Start*/
		$rootScope.rakPayee=new App.viewModels.rakPayee($scope,$rootScope,Logger,ActionProcessor);
		/*RAK:Sindhu: Added for Beneficiary Management module customization-End*/
		$rootScope.wcmclienthandlers=new App.viewModels.wcmclienthandlers($scope,$rootScope,Logger,ActionProcessor);

		 $rootScope.rakPayCards=new App.viewModels.rakPayCards($scope,$rootScope,UIControlsService,ActionProcessor);

		 $rootScope.rakCreditCard=new App.viewModels.rakCreditCard(Logger);
		 $rootScope.rakTouchIdActivation=new App.viewModels.rakTouchIdActivation($rootScope,$rootScope.utils,$scope,$rootScope.jsonStore,Logger,EncryptDecryptService,$q,MBaaS);

		 /*RAK  Added for Seam Less Login START*/
		 $rootScope.rakSeamLessLogin=new App.viewModels.rakSeamLessLogin($scope, $rootScope, UIControlsService,Logger);
		 /*RAK  Added for Seam Less Login END*/
		 $rootScope.rakCorpInit = new App.viewModels.rakCorpInit($scope,$rootScope, Logger);

		 $rootScope.rakPendingApproval=new App.viewModels.rakPendingApproval(Logger, $scope, $rootScope);
		 $rootScope.rakELMSApproval=new App.viewModels.rakELMSApproval(Logger, $scope, $rootScope);
		 $rootScope.rakEDirham=new App.viewModels.rakEDirham(Logger, $scope, $rootScope,UIControlsService,ActionProcessor,$window,$timeout,$filter,$interval);
		 
		 	// RAK specific view models loaded ends

		//Extensions for the viewModels declared here.
		App.viewModels.plugins = new App.viewModels.extensions.plugins($rootScope,App,Logger);
		//App.viewModels.plugins.initPlugins();

		$rootScope.forcePasswordModel = {};
		$rootScope.HardTokenModel={};
		$rootScope.appVersionDetails = {};
		$rootScope.isUserLoggedIn = '';
		$rootScope.pushData={};
		$rootScope.showOverlayFlag=false;
		// empty str for entire application
		$rootScope.emptyStr='';

		//$rootScope.dateFormat=$rootScope.mobileAppConfig.appConfigData.dateFormat; //"MM/DD/YY";
		//$rootScope.deviceDateFormat=$rootScope.mobileAppConfig.appConfigData.dateFormat; //"MM/DD/YY";
		//$rootScope.appFormatFormat=$rootScope.mobileAppConfig.appConfigData.dateFormat; //"MM/DD/YY";
		$rootScope.userDateFormat='';

		//$rootScope.txnpwdString=$rootScope.mobileAppConfig.appConfigData.TXN_PWD; //'Transaction Password';
		//$rootScope.otpString=$rootScope.mobileAppConfig.appConfigData.SMS_OTP; //'SMS OTP';

		$("#map-wrapper").css("height", $(window).height() + "px");
		$("#map-wrapper").css("width", $(window).width() + "px");
		$("#map-wrapper").css("top", "0");

		// Flag to show and hide the Alert messages
		$rootScope.showAlertFlag = false;
		$rootScope.showCampaignFlag = false;
		$rootScope.noValue=undefined;
		// Flag to show and hide the loading screen for maps
		$rootScope.loadMapFlag = false;

		$scope.locatorFirstCall = true;
		$rootScope.unreadCount = 0; // unread push notifications count
        console.log("Push notification initalises ");
		 	//MFP8- Push Change
        		//Initialize Push notification
        setTimeout(function()
                    {
                        PushNotification.initialize(FMBPushNotificationImpl,$scope);
                    } ,3000);
//		if(WL.Client.getEnvironment() == WL.Environment.IPHONE || WL.Client.getEnvironment() == WL.Environment.IPAD){
//			alert('iOS');
//			appActivation.checkTouchIDStatus();
//			appActivation.checkResignedActivationStatus();
//		}

		/**
		 * It will check MPIN if already used or not
		 * @constructor
		 * @param {string} userId- userId of currently active user
		 * @param {string} mpin - new mpin user want to set.
		 */
		//770314
		/*$scope.checkMPIN=function(userId, mpin){
			var res=false;
			if($rootScope.myProfile.userMPINHistory)
				if($rootScope.myProfile.userMPINHistory[userId])
					res= $rootScope.myProfile.userMPINHistory[userId].mPINs.indexOf(mpin) != -1;
			return res;
		};	*/
		// Flag for help page transition
		$rootScope.toggleHelp = false;
		$rootScope.showHelpIcon=false;
		//$rootScope.userRequestId="123456789";



		$rootScope.byDateFlag=false;

		$rootScope.showBurgerMenu = function(){
			$('.app-burger').show()
		};

		/**
		 * It will show alert
		 * @constructor
		 * @param {string} msg- messege to be displayed on alert box
		 */
		$rootScope.showAlert = function(msg){
			if(msg != " "){
				//UIControlsService.showSuccessOverlayScreen(msg);
				if($rootScope.inputStyle=="material"){
				UIControlsService.showDialogBox(undefined,msg,undefined,undefined,function(){
					$scope.setGlobalEvent("onErrorPageOKClick");
				},undefined);
				}
				else{
					UIControlsService.showSuccessOverlayScreen(msg);
				}
				//$rootScope.$apply();
			}
		};

		/**
		 * It will show alert and stay in same page.
		 * @constructor
		 * @param {string} msg- messege to be displayed on alert box
		 */
		$rootScope.showAlertReturnSamePage = function(msg){
			if(msg != " "){
				if($rootScope.inputStyle=="material"){
				UIControlsService.showDialogBox(undefined,msg);
				}
				else{

					UIControlsService.showAlertReturnSamePageOverlayScreen(msg);
				}
				//$rootScope.$apply();
			}
		};

		//772297 start
		/**
		 * It will parse the serverBusiness date and create a date object.
		 * @constructor
		 * @param {string} dateObj-
		 */
		$rootScope.formatServerDate = function(dateObj){

			var userDF = $rootScope.userDateFormat;
			var userDFSeperator = $rootScope.userDateFormatSeperator;
			if(!_.isUndefined(dateObj) && dateObj != null && userDF.indexOf(userDFSeperator)!=-1 && dateObj.indexOf(userDFSeperator)!=-1){

				var splitFormat = userDF.split(userDFSeperator);
				var formatSize = splitFormat.length;
				var i=0;
				var dayFormat = "";
				var monthFormat = "";
				var yearFormat = "";
				var dayIndex, monthIndex, yearIndex;
				while(i<formatSize){
					var tempFormat = splitFormat[i];
					if(tempFormat.indexOf("Y")!=-1 || tempFormat.indexOf("y")!=-1){
						yearFormat = tempFormat;
						yearIndex = i;
					}else if(tempFormat.indexOf("D")!=-1 || tempFormat.indexOf("d")!=-1){
						dayFormat = tempFormat;
						dayIndex = i;
					}else if(tempFormat.indexOf("M")!=-1 || tempFormat.indexOf("m")!=-1){
						monthFormat = tempFormat;
						monthIndex = i;
					}
					i++;
				}
				var dayString = "";
				var monthString = "";
				var yearString = "";
				var dateSplit = dateObj.split(userDFSeperator);
				if(dateSplit.length>=3){
					dayString = dateSplit[dayIndex];
					monthString = dateSplit[monthIndex];
					yearString = dateSplit[yearIndex];
				}

				if(yearString!=null && yearString!="" && yearString.indexOf(" ")!=-1){
					yearString = yearString.substring(0,yearString.indexOf(" "));
					//Logger.debug("year:: "+yearString);
				}

				//checking for year if its a 2 digit format
				if(yearFormat.length==2 && yearString.length==2){
					var currDate = new Date();
					var currYear = currDate.getFullYear();
					var sCurrYear = currYear.toString();
					var yearInTwoDigit = parseInt(sCurrYear.substring(sCurrYear.length-2, sCurrYear.length));
					var yearPrefix = parseInt(sCurrYear.substring(0,sCurrYear.length-2));

					if((yearInTwoDigit+10)<parseInt(yearString)){
						yearString = (yearPrefix-1) + yearString;
					}else{
						yearString = yearPrefix + yearString;
					}
				}
				if(monthFormat.length==2){
					monthString = parseInt(monthString)-1;
				}else if(monthFormat.length==3){
					if(monthString.toUpperCase()=="JAN" ){
						monthString = 0;
					}else if(monthString.toUpperCase()=="FEB" ){
						monthString = 1;
					}else if(monthString.toUpperCase()=="MAR" ){
						monthString = 2;
					}else if(monthString.toUpperCase()=="APR" ){
						monthString = 3;
					}else if(monthString.toUpperCase()=="MAY" ){
						monthString = 4;
					}else if(monthString.toUpperCase()=="JUN" ){
						monthString = 5;
					}else if(monthString.toUpperCase()=="JUL" ){
						monthString = 6;
					}else if(monthString.toUpperCase()=="AUG" ){
						monthString = 7;
					}else if(monthString.toUpperCase()=="SEP" ){
						monthString = 8;
					}else if(monthString.toUpperCase()=="OCT" ){
						monthString = 9;
					}else if(monthString.toUpperCase()=="NOV" ){
						monthString = 10;
					}else if(monthString.toUpperCase()=="DEC" ){
						monthString = 11;
					}
				}
				//Logger.debug("Year:: "+yearString+", month:: "+monthString+", day:: "+dayString);

				if(isNaN(yearString) || isNaN(monthString) || isNaN(dayString)){
					//Logger.info("Input date is not in user date format");
					return "Invalid Date";
				}

				var tempDateObj = new Date(yearString, monthString, dayString);
				//Logger.debug("Date:: "+tempDateObj);
				return tempDateObj;

			}
			else{
				return new Date();
			}


		};
		//772297 end

		/**
		 * It will hide Validation Alert.
		 * @constructor
		 */
		$rootScope.hideAlertReturnSamePage = function() {
			UIControlsService.hideAlertReturnSamePageOverlayScreen();
		};
		/**
		 * It will show confirm box with callback function support
		 * @constructor
		 * @param {string} msg- messege to be displayed on confirm box
		 * @param {string} ok - 'ok' button text
		 * @param {string} cancel - 'cancel' button text
		 * @param {function} callback - callback function on click of 'ok' button
		 * @param {boolean} noSuccessIcon - boolean to handle the icon to be displayed.
		 */
		$rootScope.showConfirmBox = function(msg,ok,cancel,okCallback,cancelCallback, noSuccessIcon){
			if(msg != " "){
				if($rootScope.inputStyle=="material"){

				UIControlsService.showDialogBox(undefined,msg,ok,cancel,okCallback,cancelCallback);
				}
				else{
					UIControlsService.showConfirmOverlay(msg,ok,cancel,callback, noSuccessIcon);
				}
				//$rootScope.$apply();
			}
		};

		/**
		 * It will confirmation messege.
		 * @constructor
		 * @param {string} msg- messege to be displayed on alert box
		 */
		$rootScope.rejectBillConfirm=function(msg){
			$rootScope.showConfirmBox(msg,'OK',undefined,function(){$scope.setGlobalEvent('onMoveMoneyClick');});
		};

/* fix for 771382 */
		/*
		$rootScope.showLogoutConfirmation=function(){
			//$rootScope.showLogoutConfirmationFlag=true;
			var confirmationObj = {
					title : 'Logout',
					body : 'Are you sure you want to logout?',
					okText : 'No',
					cancelText : 'Yes'
			};
			UIControlsService.showDialogBox(confirmationObj.title, confirmationObj.body, confirmationObj.okText, confirmationObj.cancelText,
			function(){
				$scope.setGlobalEvent("onLogoutClickCancel");
			},function(){
				$scope.setGlobalEvent("onLogoutClickOK");
			});
		};
		*/
		// Commented the above and provided the below fix for the  FS: 792909
		$rootScope.showLogoutConfirmation=function(){
			$rootScope.showLogoutConfirmationFlag=true;
			rootScope.pushNotificationHandler.closePushCollection(); // Push Changes
		};
		$rootScope.showHelpPage=function(){
			var currentPage = ActionProcessor.getCurrentPage();
			//Get help page name from PagesConfig
			var helpPageName = ActionProcessor.getHelpPageTemplate(currentPage);
			if(helpPageName){
				helpPageName = "navigation/help/"+$rootScope.selectedLocale.locale+"/"+helpPageName;
			}
			Logger.info("helpPageName:: "+helpPageName);
			var confirmationObj = {
					title : $rootScope.appLiterals.APP.CREDIT_CARD.HELP.TXT_HELP,		//
					body : helpPageName,
					okText : $rootScope.appLiterals.APP.COMMON.BUTTON.DONE		//
			};
			UIControlsService.showHelpPage(confirmationObj.title, confirmationObj.body, confirmationObj.okText,
			function(){
				$scope.setGlobalEvent("onLogoutClickCancel");
			});
		};


		$rootScope.showLogoutConfirmationHide=function(){
			$rootScope.showLogoutConfirmationFlag=false;
		};
/* fix for 771382 */
		/**
		 * It will validate max length.
		 * @constructor
		 * @param {event} e- current event in scope
		 * @param {string} value- string passed as param
		 * @param {number} len- max allowed length
		 */
		$rootScope.validateMaxLength = function(e,value,len){
			if(value.length >= len){
				e.preventDefault();
			}
		};

	/*	$scope.$watch("fields.trxnSearchByDateOption", function(newValue, oldValue) {
			if(newValue){
				document.getElementById("tmpLastNTxn").value = '';
				document.getElementById("tmpLastNTxn").disabled = true;
//				document.getElementById("tmpLastNTxn").readOnly = true;
			}
			else{
				if(document.getElementById("tmpLastNTxn"))
					document.getElementById("tmpLastNTxn").disabled = false;
//				document.getElementById("tmpLastNTxn").readOnly = false;
			}

		});*/

		$scope.$watch("services.serviceRequestStatusModel.referenceID", function(newValue, oldValue) {
			var regex = new RegExp($rootScope.mobileAppConfig.appConfigData.alphaNumericRegex); // /^[a-zA-Z0-9]*$/;
			var flag = regex.test(newValue);

			if (newValue && newValue.length > 10 || !flag ) {
				$rootScope.services.serviceRequestStatusModel.referenceID = oldValue;
			}
		});

		/**
		 * It will validate Alphanumeric with max length.
		 * @constructor
		 * @param {event} e- current event in scope
		 * @param {string} value- string passed as param
		 * @param {number} len- max allowed length
		 */
		$rootScope.validateAlphanumericWithMaxLength = function(e,value,len){
			var res = String.fromCharCode(e.charCode);
			var regex = new RegExp($rootScope.mobileAppConfig.appConfigData.alphaNumericRegex); // /^[a-zA-Z0-9]*$/;
			var flag = regex.test(res);

			if(value.length >= len || !flag ){
				e.preventDefault();
			}
		};

		/**
		 * It will call on change of last n txn field of account transaction details.
		 * @constructor
		 * @param {event} event- current event in scope
		 */
		/*$rootScope.onLastNTxnChange = function(event){

			var lastNTxn = document.getElementById("tmpLastNTxn").value;

			if(lastNTxn){
				$rootScope.dashboard.displayDateOption=false;
			}
			else{
				$rootScope.dashboard.displayDateOption=true;
			}
		};*/

		$rootScope.showCurrencyFormat = function(balance){
			var currencySign = '';
			var currencyInformation = balance.split(" ");
			var currencyformat = $filter('currency')(currencyInformation[0], currencyInformation[1],2) ;

			if(currencyformat.indexOf(')') >= 0 ){
				currencyformat = currencyformat.substr(1,currencyformat.length-2);
				currencySign = "-";
			}

			return currencySign + currencyformat.substr(3,currencyformat.length);
		}
		/**
		 * It will show Error Popup.
		 * @constructor
		 * @param {string} msg- Error messege to be displayed
		 * @param {string} okText- 'Ok' button code
		 */
		$rootScope.showErrorPopup = function(msg, okText){
			UIControlsService.showAlertOverlayScreen(msg, okText);
			//UIControlsService.showDialogBox(undefined,msg,okText,undefined,function(){
				//$scope.setGlobalEvent("onErrorPageOKClick");
			//},undefined);
			//$rootScope.$apply();
		};

		/**
		 * It will show Campaign overlay.
		 * @constructor
		 * @param {string} msg- Campaign overlay to be displayed
		 */
		$rootScope.showCampaignOverlay = function(msg){
			if(msg != " "){
				//UIControlsService.showCampaignOverlayScreen(msg);
				if($rootScope.inputStyle=="material"){
				UIControlsService.showDialogBox(undefined,msg,undefined,undefined,undefined,undefined);
				}
				else{
					UIControlsService.showCampaignOverlayScreen(msg);
				}
			}
		};
		/**
		 * It will display Toast Message.
		 *
		 */


		 $rootScope.displayToast = function(msg){

			 if(msg != " "){
				UIControlsService.displayToast(msg);
				//$rootScope.$apply();
			}
	};
		/**
		 * It will hide Campaign overlay.
		 * @constructor
		 */
		$rootScope.hideCampaignOverlay = function(){
			UIControlsService.hideCampaignOverlayScreen();
			//$rootScope.$apply();
		};

		/**
		 * It will hide Alert.
		 * @constructor
		 */
		$rootScope.hideAlert = function(){
			UIControlsService.hideAlertOverlayScreen();
		};

		/**
		 * It will check for array and set some default values if array is undefined.
		 * @constructor
		 * @param {string} value- notification channel value
		 * @param {string} returnValue- Default Value if 'value' is null
		 */
		$rootScope.setNotificationChannelType=function(value,returnValue){
			console.log(value,returnValue);
			if(value!=='' && value!='null' && value!='undefined'){
				return returnValue;
			}
			return '';
		};

		/**
		 * It will check if array exists.
		 * @constructor
		 * @param {Array} array- Array of notification
		 * @param {string} key- if array is valid then return the key of array.
		 */
		$rootScope.getValueIfArray=function(array,key){
			return array?array[key]:"";
		};

		/**
		 * It will get date from day.
		 * @constructor
		 * @param {Date} currentDate- current Date
		 */
		$rootScope.findDayFromDate = function(currentDate){
			if(currentDate === ""){
				return "";
			}
			//return currentDate.getDate().toString();
			var currentDay = currentDate.getDate();
			if (currentDay < 10)
			{
				currentDay = '0' + currentDay;
			}
			return currentDay.toString();
		};


		/**
		 * It will get month from day.
		 * @constructor
		 * @param {Date} currentDate- current Date
		 */
		$rootScope.findMonthFromDate = function(currentDate){
			if(currentDate === ""){
				return "";
			}
			//return currentDate.getMonth() + 1.toString();
			var currentMonth = currentDate.getMonth() + 1;
			if (currentMonth < 10)
			{
				currentMonth = '0' + currentMonth;
			}
			return currentMonth.toString();
		};

		/**
		 * It will get year from day.
		 * @constructor
		 * @param {Date} currentDate- current Date
		 */
		$rootScope.findYearFromDate = function(currentDate){
			if(currentDate === ""){
				return "";
			}
			return currentDate.getFullYear().toString();
		};

		/**
		 * It will hide Validation Alert.
		 * @constructor
		 */
		$rootScope.hideValidationAlert = function() {
			UIControlsService.hideValidationAlert();
		};
		/**
		 * It will hide confirm box.
		 * @constructor
		 * @param {flag} result- flag tell whether to execute callback function or not.
		 */
		$rootScope.hideConfirmBox = function(result) {
			$rootScope.confirmResult=result;
			UIControlsService.hideConfirmBox();
		};
		/**
		 * It will hide confirm box.
		 * @constructor
		 */
		  $rootScope.resetTouchIDUser = function(){
              //$rootScope.touchIDLoginUser = false;
             // $rootScope.isTouchIDLogin = false;

			 // added for touch ID SVT issue
			  WL.Client.logout("SingleStepAuthRealm",{onSuccess: function(response){
					WL.Logger.info("Logout triggered success : ");
					setTimeout(function(){
					//	WL.Client.reloadApp();
					});
				},
				onFailure:function(errorResponse){
					WL.Logger.info("Logout triggered failed : ");
					setTimeout(function(){
						//WL.Client.reloadApp();
					});
				}
				});
		  };

		  /**
			 * It will clear session id.
			 * Pre-login session data needs to be cleared, before invoking login flow.
			 * Hence called during init of RetailUserLoginPage.html
			 */
			  $rootScope.resetSessionID = function(){
				  $rootScope.fields.finacleUserSessionId = '';
			  };
		  /**
			 * It will hide confirm box.
			 * @constructor
			 * @param {string} dateStringArg- get day, month & year from dateStringArg(dd,mm,yyyy);
			 */
		$rootScope.formattedDateString=function(dateStringArg){

			var explodeArray = dateStringArg.split(",");
			var tempVar = explodeArray[0];
			explodeArray[0] = explodeArray[1];
			explodeArray[1] = tempVar;

			dateStringArg = explodeArray.join(",");

			var dateString = new Date(dateStringArg.replace(/,/g, "/"));
			return dateString;
		};

		// We have to define all the master fields here
		$rootScope.fields = {
				finacleUserCorporateId:'', finacleUserPassword:'', finacleUserSessionId: '', finacleCorporateId:'', finacleMbParam: '',
				currentDate: '', currentMonth: '', currentYear: '',loginUsername:''};

		$rootScope.fields.campaign = {};
		 $http.get('mobileAppConfig.json').success(function(data) {
			         $rootScope.mobileAppConfig.loadMobileAppConfigData(data);
                     $rootScope.fields.campaign.apikey = $rootScope.mobileAppConfig.appConfigData.API_KEY;
                     $rootScope.machineFingerPrint=$rootScope.mobileAppConfig.appConfigData.MACHINE_PRINT;
                     $rootScope.IPADDRESS=$rootScope.mobileAppConfig.appConfigData.IP_ADDRESS;
                     $scope.helloTo.title =$rootScope.mobileAppConfig.appConfigData.WORLD_ANGULARJS;
                     $scope.helloTo.title2 = $rootScope.mobileAppConfig.appConfigData.OK;
                     $rootScope.dateFormat=$rootScope.mobileAppConfig.appConfigData.dateFormat; //"MM/DD/YY";
                     $rootScope.deviceDateFormat=$rootScope.mobileAppConfig.appConfigData.dateFormat; //"MM/DD/YY";
                     $rootScope.appFormatFormat=$rootScope.mobileAppConfig.appConfigData.dateFormat; //"MM/DD/YY";
                     $rootScope.txnpwdString=$rootScope.mobileAppConfig.appConfigData.TXN_PWD; //'Transaction Password';
                     $rootScope.otpString=$rootScope.mobileAppConfig.appConfigData.SMS_OTP; //'SMS OTP';

		 });
		//$rootScope.fields.campaign.apikey=$rootScope.mobileAppConfig.appConfigData.API_KEY; // 'edbb289a7b686a8765c26dea198f78ca';
		// literals will contain all the globalized values for literals/string used in the app
		$rootScope.appLiterals = {};
		$rootScope.selectedLocale={};
		$rootScope.localeCSS="";
		//$rootScope.machineFingerPrint="machinePrint"; //$rootScope.mobileAppConfig.appConfigData.MACHINE_PRINT; // "machinePrint";
		//$rootScope.IPADDRESS="127.0.0.0"; //$rootScope.mobileAppConfig.appConfigData.IP_ADDRESS; // "127.0.0.0";
		$scope.helloTo = {};
		//$scope.helloTo.title = $rootScope.mobileAppConfig.appConfigData.WORLD_ANGULARJS; // "World, AngularJS";
		//$scope.helloTo.title2 = $rootScope.mobileAppConfig.appConfigData.OK; // "OK";
		$scope.allFeatureTemplates = [];
		$scope.numFeatures = 0;
		$scope.atmBranchDetails = {};
		$rootScope.mapAction = "";
		$rootScope.fields.isSearchInProgress=false;
		$rootScope.currentCity="";
		$rootScope.currentCountry="";
		$rootScope.fields.isMapPage=false;
		//$rootScope.isOnlineChkRequired=$rootScope.mobileAppConfig.appConfigData.IS_ONLINE_CHK_REQUIRED;
		$rootScope.isOnlineChkRequired=true;

		// Let us initialize the date fields that are used in multiple places
		$rootScope.currentDateObj = new Date();
		$rootScope.fields.currentDate = '' + $rootScope.currentDateObj.getDate();
		$rootScope.fields.currentMonth = '' + ($rootScope.currentDateObj.getMonth() + 1); // Remember, this is indexed from 0
		$rootScope.fields.currentYear = '' + $rootScope.currentDateObj.getFullYear();
		$rootScope.resetPageError=function(){
			$rootScope.pageErrorArr={};
		};

		/**
		 * It will hide confirm box.
		 * @constructor
		 * @param {number} selectedLocationType- selected location type.
		 */
		$scope.getSelectedLocationDetails = function(selectedLocationType){
			Logger.info('On Selected location type : ' + selectedLocationType);
			//added for locate us
			//return selectedLocationType === 0? {type:"BRANCH"}:{type:"ATM"};
			return selectedLocationType === 0? {marker:"B"}:{marker:"A"};
		};
		/**
		 * This function will call native plugin and get gps coords.
		 * @constructor
		 */
		$scope.getGpsCoords=function(){
	var deferred = $q.defer();
			GPSStatusCheck(function (response) {
				$rootScope.isGPS=false;
			//modified for rak customization
				if(response == "false")
				{
					//modified for rak
					$rootScope.currentLocation = {"isSuccess":false,"position":null,"isInProgress":false};

					//UIControlsService.showAlertOverlayScreen($rootScope.appLiterals.APP.RAK_COMMON.RAKLOC_SETTING_ON, $rootScope.appLiterals.APP.BUTTON_TEXT.OK);
					//return;
					$rootScope.isGPS=true;
					//ActionProcessor.reDirectToLoginPage();
				}
				else
				{
					//if(WL.Client.getEnvironment() == WL.Environment.IPHONE || WL.Client.getEnvironment() == WL.Environment.IPAD){
					if(MBaaS.isIPhoneEnv() || MBaaS.isIPadEnv()){
						response = JSON.parse(response);
					}
					var pos={};
					pos.coords=response;
					//alert(JSON.stringify(response));
					pos.coords.latitude = pos.coords.latitude*1;
					pos.coords.longitude = pos.coords.longitude*1;
					pos.coords.accuracy=pos.coords.accuracy*1;
					//alert(JSON.stringify(pos)+"   ==="   +pos.coords.longitude +"  ");
					$rootScope.currentLocation = {"isSuccess":true,"position":pos,"isInProgress":false};
					$rootScope.analytics.userProfile.location = $rootScope.currentLocation;
					$rootScope.analytics.deviceProfile.location = $rootScope.currentLocation;
					pos.coords.latitude = pos.coords.latitude.toFixed(4);
					pos.coords.longitude = pos.coords.longitude.toFixed(4);
					// start of city extraction
					if($rootScope.currentCity!==null && $rootScope.currentCity!==""){
						var latlng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
						var geocoder = new google.maps.Geocoder();
						geocoder.geocode({'latLng': latlng}, function(results, status) {
							if (status == google.maps.GeocoderStatus.OK) {
								if (results[1]) {
									$.each(results,function(i, address_component) {
										if (address_component.types[0] == "locality") {
											$rootScope.currentCity = address_component.address_components[0].long_name;
											$rootScope.currentLocation.currentCity = $rootScope.currentCity;
											$rootScope.analytics.userProfile.location = $rootScope.currentLocation;
											$rootScope.analytics.deviceProfile.location = $rootScope.currentLocation;
										}
									});
								} else {
									UIControlsService.showAlertOverlayScreen($rootScope.appLiterals.APP.ERROR_MESSAGE.NO_RESULT,$rootScope.appLiterals.APP.BUTTON_TEXT.OK);
								}
							} else {
								//commented for RAK
								//UIControlsService.showAlertOverlayScreen($rootScope.appLiterals.APP.ERROR_MESSAGE.GEO_FAILURE + status,$rootScope.appLiterals.APP.BUTTON_TEXT.OK);
							}
						});
					}
					//end of user's address
                    deferred.resolve("success");
					$rootScope.$apply();
					return;
				}
			},function(error){},{});
			return deferred.promise;
		};

		$rootScope.MF = {
				//
				getCurrentLocation:function(callback,options){
					console.log("***Inside $rootScope.MF.getCurrentLocation()***");
					if($rootScope.fields.isMapPage){
						$scope.getGpsCoords();
						$rootScope.fields.isMapPage=false;
						return;
					}

					if(typeof $rootScope.currentLocation != 'undefined' && $rootScope.currentLocation.position !== null){
						if($rootScope.currentLocation.hasOwnProperty("position")){
							$rootScope.MF.log('Location identified already ');
							return;
						}
					}
					function success(pos) {
						$rootScope.currentLocation = {"isSuccess":true,"position":pos,"isInProgress":false};
						// $rootScope.map = { center: {latitude: centerPos.latitude, longitude: centerPos.longitude}, zoom: 12};

						pos.coords.latitude = pos.coords.latitude.toFixed(4); // by default returns high precision data, this is to increase search boundaries.
						pos.coords.longitude = pos.coords.longitude.toFixed(4); // by default returns high precision data, this is to increase search boundaries.
						var crd = pos.coords;
						$rootScope.MF.log('Your current position is:');
						$rootScope.MF.log('Latitude : ' + crd.latitude);
						$rootScope.MF.log('Longitude: ' + crd.longitude);
						$rootScope.MF.log('More or less ' + crd.accuracy + ' meters.');

						// cityname using network ip
//						$.get("http://ipinfo.io", function (response) {
//						$rootScope.currentCity=response.city;
//						}, "jsonp");

						// getting the address of user

						var latlng = new google.maps.LatLng(crd.latitude, crd.longitude);
						var geocoder = new google.maps.Geocoder();
						geocoder.geocode({'latLng': latlng}, function(results, status) {
							if (status == google.maps.GeocoderStatus.OK) {
								if (results[1]) {
									$.each(results,function(i, address_component) {
										if (address_component.types[0] == "locality") {
											$rootScope.currentCity = address_component.address_components[0].long_name;
										}else if (address_component.types[0] == "country") {
											$rootScope.currentCountry = address_component.address_components[0].short_name;
										}
									});
								} else {
									//alert($rootScope.appLiterals.APP.ERROR_MESSAGE.NO_RESULT);
								}
							} else {
								//commented for RAK
								//alert($rootScope.appLiterals.APP.ERROR_MESSAGE.GEO_FAILURE + status);
							}
						});
						//end of user's address
						//791308 - Changing the value only when getting location details
						$scope.locatorFirstCall = false;
						callback.onSuccess(pos);
					}

					function error(err) {

						$rootScope.currentLocation = {"isSuccess":false,"position":null,"isInProgress":false};
						$rootScope.MF.log('LOCATION ERROR(' + err.code + '): ' + err.message);
//						alert("Either your location services are disabled or there is no connectivity in the phone,Please check your location settings.");
						callback.onFailure(err);
					}

					options = {
							enableHighAccuracy: true,
							timeout: 60000,
							maximumAge: 0
					};
					if($scope.locatorFirstCall){
						$rootScope.currentLocation = {"isSuccess":false,"position":{},"isInProgress":true};
						navigator.geolocation.getCurrentPosition(success, error, options);
						//791308 - Changing the value only when got the location details
						//$scope.locatorFirstCall=false;
					}
				},
				log:function(message){
					Logger.fatal(message);
				}
		};

		// A flag to trac if the user is logged in or not?
		if (angular.isUndefined($rootScope.isUserLoggedIn)){
			$rootScope.isUserLoggedIn = false;
		}


		// Three things to do here
		// Step 1. Initialize Logger
		// Step 2. Initialize mbaas (In this case, it is worklight)
		// Step 3. Initialize App framework by invoking ActionProcessor
		// The ActionProcessor is expected to launch the app's starting page

		// Let us first complete Step 1
		//Logger.init(FMBLoggerImpl);

		// Now, let us move to step 2 where we initialize mbaas connectivity
		//MBaaS.init(FMBMBaaSImpl);
		MBaaS.setupMbaasConnectivity().then(
				function(successMessage) {
					Logger.fatal("Connectivity to MBaaS established successfully");

					// Step 3. Let us now initialize the app framework.
					ActionProcessor.init().then(
							function(payload) {
								Logger.fatal("App framework initialized successfully");
								// MFP-8 - Commented as AuthenticationEventHandler no more
								//	AuthenticationEventHandler.init($scope);
								// Now that the framework is initialized, let us cache
								// the localized string literals
//								$rootScope.appLiterals = ActionProcessor.getLocalizedLiterals().literals;
//								$rootScope.appLiteralDirection = ActionProcessor.getLocalizedLiterals().direction;
//								Logger.fatal("The locale direction detected : " + JSON.stringify($rootScope.appLiteralDirection));
								var jsnselectedLocale = JSON.parse($window.localStorage.getItem("MBLocale"));
								if (jsnselectedLocale==null)
									$rootScope.selectedLocale.locale=$rootScope.mobileAppConfig.appConfigData.defaultLocale.locale;
								else
									$rootScope.selectedLocale.locale= jsnselectedLocale.locale;
							}, function(errorPayload) {
								Logger.fatal("Error initializing app framework");
							});
				},
				function(errorMessage) {
					// There was an error connecting to mbaas.
					// We can't do much in this case. Give up!!
					Logger.fatal("Error setting connectivity to mbaas");
				}
		);
		HTTPConnector.init(HTTPMiddlewareImpl);
		Logger.fatal("External HTTP Connector initialized");
		//Currency Config
		Logger.info("AppController initializing currency config::START");
		CurrencyConfigProcessor.init();
		Logger.info("AppController initializing currency config::END");
		QRCodeModelConfigProcessor.init();
		Logger.info("AppController initializing phone format config::START");
		PhoneFormatConfigProcessor.init();
		Logger.info("AppController initializing phone format config::END");

		Logger.info("AppController initializing brand config::START");
		ExtMultiBrandingService.init();
		Logger.info("AppController initializing brand config::END");

		/*
		 * Check if it is the first time launch, use it for future reference.
		 * A simplified implementation, can be used for initialization
		 * For more information: http://stackoverflow.com/a/32278413/257453
		 *
		var count = window.localStorage.getItem('hasRun');
		if(count){
			Logger.info("second time app launch");
		}else{
		  // set variable in localstore
		  window.localStorage.setItem('hasRun',1);
		  Logger.info("first time app launch");
		}
		 */

//		WL.Device.getID({onSuccess:function(deviceID){
//		Logger.info("Device ID fetched successfully :"+ JSON.stringify(deviceID));
//		},onFailure:function(error){
//		Logger.info("Error in fetching device ID :"+ JSON.stringify(error));
//		}
//		});
		// If we have reached here, it means we are done initializing the app
		Logger.info("Finished initializing the app");

		$scope.checkPhoneEnvironmet();
	};
	$scope.$on('$viewContentLoaded', function(){
		//Here your view content is fully loaded !!
		$("input").attr("dir",$rootScope.appLiteralDirection);
		// RAK Swiper menu changes
		console.log("BEFORE SWIPER");
		$timeout(function(){var swiper = new Swiper('.swiper-container');},2000);
		//RakCustomization
		jQuery('.mCustomScrollbar').mCustomScrollbar();
		// RAK Swiper menu changes

		$timeout(function(){
			/*   $('select').mobiscroll().select({
				   theme: 'rakbank',
				   display: 'bottom',

                   minWidth: 200
               });

			   if( jQuery('.mbsc-control-ev').length){
				   jQuery(".mbsc-control-ev").addClass('newDrop');
			   }*/


		},100);
		if( jQuery('.rakPullDownBottomBlocker').length){
			jQuery('.rak-scroll').removeClass('rakPullTransform');
            jQuery('.rakPullTransform').removeClass('rakPullTransform');
            jQuery('.rakPullDownBlocker').remove();
            jQuery('.rakPullDownBottomBlocker').remove();
            jQuery('.rakPullDownTopBlocker').remove();
		}
	});

	/**
	 * It will call set global event
	 * @constructor
	 * @param {string} eventName- event name.
	 * @param {number} timeout- timeout in order to call event after some time (optional).
	 * @param {object} options- options (optional).
	 */
	$scope.setGlobalEvent = function(eventName, timeout, options){

		// Added for RAK Dual hit call handling
		if($rootScope.callInProgress){
			return
		}
        $rootScope.callInProgress=true;
		/* parallelization  Code START*/
		/* Events are sent in setEvent(EventName|callback,EventName|callback,..) format */
		$rootScope.currentResponseCount=0;
		eventList = eventName.split(",");
		callback="";
		/* parallelization  Code END*/
		//UIControlsService.toggleHideMenu();
		genUserReqId();
		// This is a hack. If the event was 'onErrorPageOKClick', then ActionProcessor
		// does not return a promise.
		if (eventName == "onErrorPageOKClick") {
			ActionProcessor.setGlobalEvent(eventName,timeout, options);
			// Added for RAK Dual hit call handling
			$rootScope.callInProgress=false;

			Logger.fatal("Global State machine completed successfully with onErrorPageOKClick");
		} else {

			if(timeout){
				$location.path('/navigation/common/resources/FinacleLoaderPage');
				$rootScope.$apply();
				setTimeout(function(){
					ActionProcessor.setGlobalEvent(eventName, timeout,options).then(function(payload){
						Logger.fatal("Global State machine completed successfully : "+ payload);
					});
				},timeout);
			}else{
				 /* parallelization Code START*/
				 for (var i=0; i<eventList.length; i++){
					 /* Each Event EventName|callback  is separated into Event and callbacks and
					  * calls are made to ActionProcessor.setEvent */
					 event=eventList[i].split("|");
					 if(event.length>1){
						Logger.info(" Event " + event[0] + " called with call back  " + event[1]);
						callback =event[1];
					  }
					 /* parallelization Code START*/
					 /* Parameter name  of ActionProcessor.setEvent method changed */
				ActionProcessor.setGlobalEvent(event[0], timeout,options,eventList.length,callback).then(function(payload){
					// Added for RAK Dual hit call handling
					$rootScope.callInProgress=false;
					Logger.fatal("Global State machine completed successfully : "+ payload);
				});
				 }
			}
		}
	};
	// The method invoked by partial HTML templates when they are
	// changing states
	/**
	 * It will call set event
	 * @constructor
	 * @param {string} eventName- event name.
	 * @param {number} timeout- timeout in order to call event after some time (optional).
	 * @param {object} options- options (optional).
	 */
	$scope.setEvent = function(eventName, flag, refreshSuccessResponse) {


		if($rootScope.callInProgress){
			return
		}
		if(eventName!='onLoginLoad'){
	    	$rootScope.callInProgress=true;
	    }
		genUserReqId();
		if(eventName instanceof Array){
			//Handle array based setEvent flow
		}
		/* parallelization  Code START*/
		/* Events are sent in setEvent(EventName|callback,EventName|callback,..) format */
		$rootScope.currentResponseCount=0;
		eventList = eventName.split(",");
		callback="";
		/* parallelization  Code END*/
		// Just delegate this event call to the ActionProcessor
		if(refreshSuccessResponse!==false){
		$scope.successResponse = {}; $scope.errorResponse = {};
		}
	 /* parallelization Code START*/
	 for (var i=0; i<eventList.length; i++){
		 /* Each Event EventName|callback  is separated into Event and callbacks and
		  * calls are made to ActionProcessor.setEvent */
		 event=eventList[i].split("|");
		 if(event.length>1){
			Logger.info(" Event " + event[0] + " called with call back  " + event[1]);
			callback =event[1];
		  }
		 /* parallelization Code START*/
		 /* Parameter name  of ActionProcessor.setEvent method changed */
		 ActionProcessor.setEvent(event[0],flag,callback,eventList.length).
		then(function(payload) {

			// Added for RAK Dual hit call handling
			$rootScope.callInProgress=false;

			if(refreshSuccessResponse!==false){
			$scope.successResponse = payload;
			Logger.fatal("State machine completed successfully : "+ JSON.stringify(payload));
			if(typeof payload =='undefined'){
				Logger.fatal("Payload is empty this cannot happen. Check page load event for the respective pages");
				return;
			}
			// For responses that come from the chaining logic, we need to have this
			// check
			// We need to reset mbParam everytime we receive a response from mBaas
			var mbParam = '';
			var resp = {};
			if(typeof payload.invocationResult =='undefined')
				payload.invocationResult=payload;

			if(payload.invocationResult.response){
				$scope.successResponse = JSON.parse(payload.invocationResult.response);
				resp = $scope.successResponse;
				mbParam = $scope.successResponse.mbParam;
			} else {
				resp = $scope.successResponse.invocationResult;
				mbParam = $scope.successResponse.invocationResult.mbParam;
			}

			$rootScope.fields.finacleMbParam = mbParam;
			calculateExtraparam(resp,mbParam);
			Logger.fatal("The mbParam is " + mbParam);

			if($rootScope.rakSeamLessLogin.RakSeamLessLoginModel.sessionClear && $rootScope.rakSeamLessLogin.RakSeamLessLoginModel.sessionClear=="YES")
			{
				$rootScope.fields.finacleUserSessionId ='';
				//$rootScope.stepupAuthentication.isCompleted=true;
				$rootScope.rakSeamLessLogin.RakSeamLessLoginModel.sessionClear="NO";
			}

					// If user session id was not set, we need to reset it
					if ($rootScope.fields.finacleUserSessionId === '' || typeof($rootScope.fields.finacleUserSessionId) == "undefined") {
						// The session is set only once: when the user logs in for the
						// first time
						var sessKey;
						// added for stepup authentication completed flow
						if($scope.successResponse.hasOwnProperty('responsesList')){
							sessKey = $scope.successResponse.responsesList[0].sessKey;
						}
						else{
							sessKey = $scope.successResponse.invocationResult.sessKey;
						}
						$rootScope.fields.finacleUserSessionId = sessKey;
						Logger.fatal("Setting the user's session to " + sessKey);
						//MFP-8 Commented this, as API for getting the User Login status from Realm is removed.
						//$rootScope.isUserLoggedIn = ActionProcessor.isUserLoggedIn();
//						$rootScope.isUserLoggedIn = true; //just during stubbed testing
						Logger.fatal("AppController : is user logged in "+ $rootScope.fields.isUserLoggedIn);
					}
					Logger.fatal("The user's session key is " + $rootScope.fields.finacleUserSessionId);
//					if(true){
//					$("p,input").attr("dir","rtl");
//					}
				}
			}, function(errorPayload) {
			// Added for RAK Dual hit call handling
			$rootScope.callInProgress=false;
			$scope.errorResponse = errorPayload;
			Logger.fatal("Error running the state machine");
		});
	};
	};

	function genUserReqId(){
		/**
		 * changes for random ID generation for user request ID
		 */
		var randID = Math.random().toString();
	    var randomValue;
	    if(randID.length > 2)
	        randomValue = randID.slice(2);
	       else
	        randomValue = randID;

	    if(randomValue.length < 16){
	    	randomValue = $rootScope.padLeft(16,randomValue,'0');
	    } else if(randomValue.length > 16){
	    	randomValue = randomValue.slice(0, 16);
	    }

	    $rootScope.userRequestId=randomValue;
	    if($rootScope.checkTheme===true  || $rootScope.checkBGColor===true){
		    //if(!(WL.Client.getEnvironment() == WL.Environment.MOBILE_WEB || WL.Client.getEnvironment() == WL.Environment.DESKTOPBROWSER))
			if(!(MBaaS.isMobileWEBEnv()))
			{
			    if($rootScope.themeAvailable===true){
			    	var x = Math.floor((Math.random() * 9) + 1);
			    	$rootScope.userRequestId = x + $rootScope.userRequestId;
			    }
			}
	    }
	    return;
	}
	
	
	function calculateExtraparam(resp,mbparam){
		var metaParam;
		if(resp.hasOwnProperty("responsesList")){
			metaParam =JSON.stringify(resp["responsesList"]);
		}
		else{
			metaParam =resp;
			metaParam = JSON.stringify(metaParam);
		}
		metaParam = metaParam.replace(/[^a-zA-Z0-9]/g,"");
		var metaParamLen = sum(metaParam);
		var paramArr = mbparam && mbparam.indexOf("YREBC")!=-1 ? mbparam.split("YREBC"):[];
		var serverParam =  paramArr[0] ? paramArr[0] : mbparam;
		var tempHash = CryptoJS.HmacSHA512(metaParamLen+""+serverParam,"hshdh3747hhkmvnke");
		$rootScope.fields.accountParam = CryptoJS.enc.Base64.stringify(tempHash);
	}
	function sum(text) {
        var a = 1, b = 0;
        for (var index = 0; index < text.length; ++index) {
            a = (a + text.charCodeAt(index)) % 65521;
            b = (b + a) % 65521;
        }
        return (b << 16) | a;
    }

	/**
	 * It will navigate user to given page
	 * @constructor
	 * @param {string} path- path of the page to navigate.
	 */
	$scope.gotoPage = function(path) {
		$scope.showMenu = true;
		$scope.toggleShowMenu();

		$location.path(path);

	};

	/**
	 * It will toggle burger Menu
	 * @constructor
	 */
	$scope.toggleShowMenu = function() {
		if(_.isUndefined($scope.showMenu)){
			$scope.showMenu = false;
		}

		$scope.showMenu = !$scope.showMenu;

		$rootScope.changeStyleforML();
	};
	$rootScope.addClassNameForMenuChange = "";
	$rootScope.changeStyleforML=function()
	{
		var localeDirection=$rootScope.appLiteralDirection;

		/*var marginLeft = $("#fms-content").css("margin-left");
		var marginRight = $("#fms-content").css("margin-right");*/

		if( localeDirection!=undefined && localeDirection=="rtl") {
			if ($rootScope.addClassNameForMenuChange == "") {
				$rootScope.addClassNameForMenuChange = "openMenuNav";
				/*$("#fms-content").css("margin-right", "-28em");
				$("#fms-content").css("margin-left", "0");
				$(".finacle-container").css({"position": "relative", "width": "100%"});
				$(".absolute").css({"position": "fixed", "width": "100%"});*/
			} else {

				$rootScope.addClassNameForMenuChange = "";
				/*$("#fms-content").css("margin-right", "0");
				$("#fms-content").css("margin-left", "0");
				$(".finacle-container").css({"position": "fixed", "width": "100%"});
				$(".absolute").css({"position": "absolute", "width": "100%"});*/
			}
		}
		else {

			if ($rootScope.addClassNameForMenuChange == "") {
				$rootScope.addClassNameForMenuChange = "openMenuNav";
				/*$("#fms-content").css("margin-left", "-28em");
				$("#fms-content").css("margin-right", "0");
				$(".finacle-container").css({"position": "relative", "width": "100%"});
				$(".absolute").css({"position": "fixed", "width": "100%"});*/
			} else {

				$rootScope.addClassNameForMenuChange = "";
				/*$("#fms-content").css("margin-left", "0");
				$("#fms-content").css("margin-right", "0");
				$(".finacle-container").css({"position": "fixed", "width": "100%"});
				$(".absolute").css({"position": "absolute", "width": "100%"});*/
			}
		}


	};


/*	$rootScope.changeStyleforMLonLoad=function()
	{
		var localeDirection=$rootScope.appLiteralDirection;
		var marginLeft = $("#fms-content").css("margin-left");
		var marginRight = $("#fms-content").css("margin-right");

		if( localeDirection!=undefined && localeDirection=="rtl") {
			if ($rootScope.addClassNameForMenuChange == "") {
				$("#fms-content").css("margin-right", "-28em");

				$(".finacle-container").css({"position": "relative", "width": "100%"});
				$(".absolute").css({"position": "fixed", "width": "100%"});
			} else {
				$("#fms-content").css("margin-right", "0");

				$(".finacle-container").css({"position": "fixed", "width": "100%"});
				$(".absolute").css({"position": "absolute", "width": "100%"});
			}
		}
		else {

			if ($rootScope.addClassNameForMenuChange == "") {
				$("#fms-content").css("margin-left", "-28em");

				$(".finacle-container").css({"position": "relative", "width": "100%"});
				$(".absolute").css({"position": "fixed", "width": "100%"});
			} else {
				$("#fms-content").css("margin-left", "0");

				$(".finacle-container").css({"position": "fixed", "width": "100%"});
				$(".absolute").css({"position": "absolute", "width": "100%"});
			}
		}
		$rootScope.isitReloading=false;

	};*/


	/**
	 * It will toggle swipe menu
	 * @constructor
	 */
	$scope.toggleSwipeMenu = function() {
		var margin = $("#fms-content").css("margin-left");
		if (margin == "0px" && !$scope.swipeRight) {
			$scope.toggleShowMenu();
		} else if(margin != "0px" && $scope.swipeRight) {
			$scope.toggleShowMenu();
		}

	};
	/**
	 * It will return boolean for menu
	 * @constructor
	 */
	$scope.isToggleMenuVisible = function(){
		return $scope.showMenu;
	};
	$scope.toggleHideMenu = function(){
		$scope.showMenu = true;
		$scope.toggleShowMenu();
	};

	/**
	 * This is a utility function to split the money into Main money and the fractions
	 * @constructor
	 * @param {float/string} money- money to be parsed
	 */
	$scope.parseMoney = function(money, currency) {

		if(currency==undefined || currency==null || currency==""){
			currency = $rootScope.homeCurrencyCode;
		}

		if(money!=undefined && (money.indexOf(" ")!=-1 || money.indexOf("|")!=-1)){
			var tempMoney;
			if(money.indexOf(" ")!=-1){
				tempMoney = money.split(" ");
			}else{
				tempMoney = money.split("|");
			}

			if(tempMoney.length==2){
				var actualCurrency, actualMoney = "";
				if(isNaN(parseFloat(tempMoney[1]))){
					actualCurrency = tempMoney[1];
					currency = tempMoney[1];
				}else if(isNaN(parseFloat(tempMoney[0]))){
					actualCurrency = tempMoney[0];
					currency = tempMoney[0];
				}

				if(!isNaN(parseFloat(tempMoney[0]))){
					actualMoney = tempMoney[0];
					money = tempMoney[0];
				}else if(!isNaN(parseFloat(tempMoney[1]))){
					actualMoney = tempMoney[1];
					money = tempMoney[1];
				}
				//Logger.info("actualCurrency:: "+actualCurrency+", actualMoney:: "+actualMoney);
			}
		}

		return UIControlsService.parseMoney(money, currency);
	};
	/**
	 * This is a transaction search utility
	 * @constructor
	 * @param {object} option- option
	 * @param {date} date1- from date
	 * @param {date} date2- to date
	 */
	$scope.transactionSearchSetup = function(option, date1, date2) {
		UIControlsService.transactionSearchSetup(option, date1, date2);
	};

	/**
	 * Utility method used to set the values of an array to false.
	 * This method is primarily used for situations where an set of.
	 * tick marks or buttons or enabled and where we cannot use any of
	 * @constructor
	 * @param {Array} listOfVals- list of value which will be false in checkbox.
	 */
	$scope.setArrayValuesToFalse = function(listOfVals) {
		for (var i = 0; i < listOfVals.length; i++ ) {
			listOfVals[i] = false;
		}
	};
	/**
	 * Utility method used to get the dynamic month list.
	 * @constructor
	 * @param {string} key1- keyname to get object value
	 * @param {string} key2- keyname to get object value
	 * @param {boolean} isSamevalue- bool to compare
	 * @param {Array} monthList- array of monthlist
	 */
	$scope.dynamicMonthList=function(key1, key2, isSamevalue, monthList){
		var res=[];
		var months=monthList||$rootScope.monthList;
		var obj={};
		months.forEach(function(item,index){
			obj={};
			obj[key1]=item+"";
			if(isSamevalue){
				obj[key2]=item+"";
				}
				else{
					obj[key2]=index+1+""; // month start from 1;
				}
				res.push(obj);
		});
		return res;
	};

	/**
	 * Utility method used to get the dynamic month list.
	 * @constructor
	 * @param {string} key1- keyname to get object value
	 * @param {string} key2- keyname to get object value
	 * @param {boolean} isSamevalue- bool to compare
	 * @param {Array} dayList- array of dayList
	 */
	$scope.dynamicDayList=function(key1, key2, isSamevalue, dayList){
		var res=[];
		var days=dayList||$rootScope.days;
		var obj={};
		days.forEach(function(item,index){
			obj={};
			obj[key1]=item+"";
			if(isSamevalue){
				obj[key2]=item+"";
				}
				else{
					obj[key2]=index+1+""; // day start from 1;
				}
				res.push(obj);
		});
		//console.log(res);
		return res;
	};

	/**
	 * Utility method used to get the dynamic integer list.
	 * @constructor
	 * @param {string} key1- keyname to get object value
	 * @param {string} key2- keyname to get object value
	 * @param {number} start- starting integer
	 * @param {number} end-  ending integer
	 */
	$scope.dynamicIntList=function(key1, key2, start, end){ // start end will be integer in sorting order
		var res=[];

		var obj={};
		for(var i=start;i<=end;i++){
			obj={};
			obj[key1]=obj[key2]=i+"";
			res.push(obj);
		}
		return res;
	};

	/**
	 * Utility method that returns the current date as Date object.
	 * @constructor
	 */
	$scope.getCurrentDate = function() {
		return new Date();
	};

	/**
	 * Utility method that returns the current month as
	 * @constructor
	 */
	$scope.getCurrentMonthStr = function() {
		var date = new Date();
		var month = '';

		switch (date.getMonth()) {
		case 0:
			month = $rootScope.appLiterals.APP.MONTHS.JAN;
			break;
		case 1:
			month = $rootScope.appLiterals.APP.MONTHS.FEB;
			break;
		case 2:
			month = $rootScope.appLiterals.APP.MONTHS.MAR;
			break;
		case 3:
			month = $rootScope.appLiterals.APP.MONTHS.APR;
			break;
		case 4:
			month = $rootScope.appLiterals.APP.MONTHS.MAY;
			break;
		case 5:
			month = $rootScope.appLiterals.APP.MONTHS.JUN;
			break;
		case 6:
			month = $rootScope.appLiterals.APP.MONTHS.JUL;
			break;
		case 7:
			month = $rootScope.appLiterals.APP.MONTHS.AUG;
			break;
		case 8:
			month = $rootScope.appLiterals.APP.MONTHS.SEP;
			break;
		case 9:
			month = $rootScope.appLiterals.APP.MONTHS.OCT;
			break;
		case 10:
			month = $rootScope.appLiterals.APP.MONTHS.NOV;
			break;
		case 11:
			month = $rootScope.appLiterals.APP.MONTHS.DEC;
			break;
		}
		return month;
	};

	// Utility method that returns an array of options which can be used by fin-input
	// for type "dropdown"

	/**
	 * Utility method that returns an array of options which can be used by fin-input
	 * @constructor
	 * @param {Array} dataArr- Actual list for dropdown
	 * @param {Array} keyStr-
	 * @param {Array} valueStr-
	 * @param {string} beginStrArr-
	 * @param {string} endStrArr-
	 */
	$scope.createDropDownOptionArray = function(dataArr, keyStr, valueStr, beginStrArr, endStrArr) {
		return UIControlsService.createDropDownOptionArray(dataArr, keyStr, valueStr, beginStrArr, endStrArr);
	};
	/**
	 * Utility method that returns an array of Account options which can be used by fin-input
	 * @constructor
	 * @param {Array} dataArr- Actual list for dropdown
	 * @param {Array} keyStr-
	 * @param {Array} valueStr-
	 * @param {string} beginStrArr-
	 * @param {string} endStrArr-
	 */
	$scope.createDropDownOptionAccountArray = function(dataArr, keyStr, valueStr, beginStrArr, endStrArr) {
		return UIControlsService.createDropDownOptionAccountArray(dataArr, keyStr, valueStr, beginStrArr, endStrArr);
	};


	// MAPS APIS
	// uiGmapGoogleMapApi.then(function(maps) {
	//        console.log("HERE HERE");
	// 	$rootScope.maps = maps;
	//        $rootScope.loadMapFlag = true;
	//        google.maps.event.addListener($rootScope.gMap, 'center_changed', function() {
	// 		$rootScope.loadMapFlag = false;
	// 	});
	// });

	/**
	 * Utility method that set Map Center
	 * @constructor
	 * @param {object} location- User current location
	 */
	$scope.setMapCenter = function(location) {
		 /* Rak customization dont change*/
		$rootScope.loadMapFlag = false;
		/*location.latitude;
		location.latitude;
*/		$rootScope.showMarkerInfoFlag = false;
		$scope.showMarkerInfo();
	};
	/**
	 * Utility method that set Map Center
	 * @constructor
	 * @param {object} coords- User current location co-ordinates
	 */
	$scope.setMapsMarker = function(coords){

		$rootScope.mapAction = "SHOWMARKER";
		coords = coords ? coords: $rootScope.fields.selectedLocation;

		$rootScope.marker = {
				id: 0,
				coords : {
					latitude: coords.latitude ,
					longitude: coords.longitude
				},
				options: { draggable: false },
				events: {
					click: function(marker, eventName, args) {
						Logger.info(JSON.stringify(args.coords.latitude));
						$scope.showMarkerInfo();
					}
				},
				control:{}
		};
	};

	/**
	 * Utility method that show Marker Info
	 * @constructor
	 */
	$scope.showMarkerInfo = function() {
		// display the maker info
		if ($rootScope.showMarkerInfoFlag !=true)
			$rootScope.showMarkerInfoFlag = true;
		else
			$rootScope.showMarkerInfoFlag = false;

		// Adjust the top. This is done to make the marker work in Android phones.
		// The timeout is required for the div to be visible
		$timeout(function() {
			//var top = $(window).height() - $("#marker-info").height() - $(".navbar").height();
			$("#marker-info").css("top", top + "px");
		}, 10);

	};

	/**
	 * Utility method that hide Marker Info
	 * @constructor
	 */
	$scope.hideMarkerInfo = function() {
		$rootScope.showMarkerInfoFlag = false;
	};

	/**
	 * Utility method that show Marker Info
	 * @constructor
	 * @param {string} action- map action
	 */
	$scope.setMapAction = function(action) {
		$rootScope.mapAction = action;
	};

	/**
	 * Utility method that give direction from current location to given coords.
	 * @constructor
	 */
	$scope.getDirection = function () {

		$rootScope.mapAction = $rootScope.mobileAppConfig.appConfigData.GET_DIRECTION;
		$rootScope.gMarker.setMap(null);
/*Rak customization please dnt change*/
		$rootScope.loadMapFlag = true;
		$rootScope.showMarkerFlag = false;
		// alert('custom control clicked!');
		Logger.info("Lat long : start "+ $rootScope.currentLocation.position.coords.latitude + "--  " + $rootScope.currentLocation.position.coords.longitude);
		Logger.info("Lat long : end "+ $rootScope.fields.selectedLocation.latitude + "--  " + $rootScope.fields.selectedLocation.longitude);
		var start = new google.maps.LatLng($rootScope.currentLocation.position.coords.latitude,$rootScope.currentLocation.position.coords.longitude);
		var end = new google.maps.LatLng($rootScope.fields.selectedLocation.latitude,$rootScope.fields.selectedLocation.longitude);

		var request = {
				origin:start,
				destination:end,
				travelMode: $rootScope.maps.TravelMode.DRIVING
		};

		$rootScope.directionsService = new $rootScope.maps.DirectionsService();

		$rootScope.directionsDisplay = new google.maps.DirectionsRenderer();
		$rootScope.directionsDisplay.setMap($rootScope.gMap);


		$rootScope.directionsService.route(request, function(response, status) {
			if (status == $rootScope.maps.DirectionsStatus.OK) {
				$rootScope.directionsDisplay.setDirections(response);
			}
		});

	};

	/**
	 * Utility method that that opens map application and shows directions from current location to the highlighted marker.
	 * @constructor
	 */
	$scope.showDirections = function () {
//		window.location = 'http://maps.google.com/maps?saddr='+$rootScope.currentLocation.position.coords.latitude+','+$rootScope.currentLocation.position.coords.longitude+'&daddr='+$rootScope.fields.selectedLocation.latitude+','+$rootScope.fields.selectedLocation.longitude;
//		window.location = 'http://maps.google.com/maps?saddr=12.849787,77.666198&daddr=12.284169,76.641853';
		var url = 'https://maps.google.com/maps?saddr='+$rootScope.currentLocation.position.coords.latitude+','+$rootScope.currentLocation.position.coords.longitude+'&daddr='+$rootScope.fields.selectedLocation.latitude+','+$rootScope.fields.selectedLocation.longitude;
		// Fix for 768024. To open map application in android
		//if(WL.Client.getEnvironment() == WL.Environment.ANDROID)
		if(MBaaS.isAndroidEnv())
			navigator.app.loadUrl(url,{openExternal : true});
		else
			window.open(url,"WindowName","location,resizable,scrollbras,status");
	};

	$scope.reFormatPhoneNumber = function(countryModelName, phoneModelName, actualField){
		var countryModel = $parse(countryModelName);
		var country = countryModel($scope);
		Logger.info("In reformat phone number:: "+country);
		var phoneMask = PhoneFormatConfigProcessor.getPhoneFormatConfig(""+country).FORMAT;

		/*var phoneModel = $parse(phoneModelName);
		var phone = phoneModel($scope);*/

		var phoneMaskModelName = phoneModelName+"__phoneMask__";
		if(actualField){
			phoneMaskModelName = actualField+"__phoneMask__";
		}

		var phoneMaskModel = $parse(phoneMaskModelName);
		var phoneMaskValue = phoneMaskModel($scope);
		phoneMaskModel.assign($scope,phoneMask);
		if(!$rootScope.$$phase){
			Logger.debug("Safe root scope apply");
			$rootScope.$apply();
		}else{
			Logger.debug("Skipped root scope apply as it was already in progress");
		}

		/*if(phone){
			//var tempElem=document.getElementById("mobileRecharge.mobileNumber");
			var angEl = angular.element(document.querySelector('#mobileRecharge\\.mobileNumber'));
			angEl.attr("phone-mask",phoneMask);
			//tempElem.setAttribute("phone-mask",phoneMask);
		}else{
			//var tempElem=document.getElementById("mobileRecharge.mobileNumber");
			//tempElem.setAttribute("phone-mask",phoneMask);
			var angEl = angular.element(document.querySelector('#mobileRecharge\\.mobileNumber'));
			angEl.attr("phone-mask",phoneMask);
		}*/
	}
	$scope.formatAmountCrn = function(amountField, currencyField, index) {

		//Logger.debug("Input Fields for format amount:: amount field:: "+amountField+", currency field:: "+currencyField);
		var amount=0.0;
		var currency = "";
		var amountModel;
		var currencyModel;
		try{
			currencyModel = $parse(currencyField);
			currency = currencyModel($scope);
			//Logger.debug("In formatAmountCrn, Currency using $parse:: "+currency);

			//to handle array fields
			if(index!=undefined){
				if(isNaN(index) && index == "ALL"){
					//handle parsing for all fields ??

					amountModelArray = $parse(amountField);
					amountArray = amountModelArray($scope);
					var totSize = amountArray.length;
					var count = 0;
					//Logger.debug("totSize array:: "+totSize);
					while(count<totSize){
						amountModel = $parse(amountField+"["+count+"]");
						var currencyActual = currency;
						if(currency!=undefined && currency.constructor == Array){
							currencyActual = currency[count];
						}

						var formattedArrayAmount = CurrencyConfigProcessor.formatAmount(amountArray[count], currencyActual);
						if(formattedArrayAmount!=undefined){
							amountModel.assign($scope,formattedArrayAmount);
							//$rootScope.$apply();
						}
						count++;
					}
					if(!$rootScope.$$phase){
						//Logger.debug("Safe root scope apply");
						$rootScope.$apply();
					}else{
						//Logger.debug("Skipped root scope apply as it was already in progress");
					}
					return;
				}else if(!isNaN(index)){
					//Logger.debug("index:: "+index);
					amountField = amountField.replace("$index",index);

					if(currencyField.indexOf("$index")!=-1){
						currencyField = currencyField.replace("$index",index);
						currencyModel = $parse(currencyField);
						currency = currencyModel($scope);
					}

					//Logger.debug("Indexed amount field:: "+amountField);
				}
			}

			amountModel = $parse(amountField);
			amount = amountModel($scope);
			//Logger.debug("In formatAmountCrn, amount using $parse:: "+amount);
			var formattedAmount="";
			if(index){
				formattedAmount = CurrencyConfigProcessor.formatAmount(amount, currency,false,true);
			}else{
				formattedAmount = CurrencyConfigProcessor.formatAmount(amount, currency);
			}

			//Logger.debug("formatted amount:: "+formattedAmount);
			if(formattedAmount!=undefined){
				amountModel.assign($scope,formattedAmount);
				if(!$rootScope.$$phase){
					//Logger.debug("Safe root scope apply");
					$rootScope.$apply();
				}else{
					//Logger.debug("Skipped root scope apply as it was already in progress");
				}
			}
		}catch(error){
			Logger.info("Error in parsing fields for amount format:: "+error);
		}

		//Logger.debug("Amount formatted succesfully");
		return "";
	};

	$scope.unFormatAmount = function(amountField, currencyField, index) {

		//Logger.debug("Input Fields for unFormat amount:: amount field:: "+amountField+", currency field:: "+currencyField);
		var amount=0.0;
		var currency = "";
		var amountModel;
		var currencyModel;
		try{

			//to handle array fields
			if(index!=undefined){
				if(isNaN(index)){
					// Do Nothing as of now
				}else{
					//Logger.debug("index:: "+index);
					amountField = amountField.replace("$index",index);

					if(currencyField.indexOf("$index")!=-1){
						currencyField = currencyField.replace("$index",index);
						//Logger.debug("Indexed currency field:: "+currencyField);
					}

					//Logger.debug("Indexed amount field:: "+amountField);
				}
			}

			amountModel = $parse(amountField);
			amount = amountModel($scope);
			//Logger.debug("In formatAmountCrn, amount using $parse:: "+amount);

			currencyModel = $parse(currencyField);
			currency = currencyModel($scope);
			//Logger.debug("In formatAmountCrn, Currency using $parse:: "+currency);

			var unFormattedAmount = CurrencyConfigProcessor.unFormatAmount(amount, currency);

			//Logger.debug("formatted amount:: "+unFormattedAmount);
			amountModel.assign($scope,unFormattedAmount);
			$rootScope.$apply();
		}catch(error){
			Logger.info("Error in parsing fields for amount format:: "+error);
		}

		//Logger.debug("Amount unformatted succesfully");
		return "";
	};

$scope.checkPhoneEnvironmet = function() {
		$rootScope.forDevice_class = "";
		document.addEventListener("deviceready", function(){
			if(MBaaS.isIPhoneEnv())
			{
			  $rootScope.forDevice_class = "IosDeviceClass";

			}
			else if(MBaaS.isAndroidEnv())
			{
			$rootScope.forDevice_class = "AndroidDeviceClass";
			console.log("App version is: "+AppVersion.version);
			console.log("App build is: "+device.uuid);
//			RareloopAppVersion.prototype.getInfo(function (successResponse) {
//                console.log("RareloopAppVersion.prototype.getInfo --> " + successResponse);
//                },
//                function (errorResponse) {
//                       }
//             );

			}
		else
			{

			$rootScope.forDevice_class = "otherDevicesClass";
			}
		},false);
	}

	// changes..
	/* changes for theme check */
		$rootScope.loadTheme = function loadTheme(){
			getThemeColor(function (response) {
				console.log("1. Latest check in root scope Response is:"+response);
				if(response=="red"){
					console.log("Theme is red");
					//$rootScope.showModalErrorPopup("Device rooted");
					$rootScope.themeAvailable = true;
					//WL.App.close();//Exiting the application
					return ;
				}
				else
				{
					return ;
				}
			} , function (response) {

			},MBaaS);
		};
		/* changes for theme color end */
		
		/* changes for BGColor start */
		$rootScope.loadBGColor = function loadBGColor(){
			getBGColor(function (response) {
				//console.log("Latest BG Color Response is:"+response);
				if(response=="red"){
					console.log("BG Color is red");
					$rootScope.themeAvailable = true;
					return ;
				}
				else
				{
					return ;
				}
			} , function (response) {
				
			});
		};	
		/* changes for BGColor end */
 
		$rootScope.padLeft = function(width, string, padding) { 
    	   return (width <= string.length) ? string : $rootScope.padLeft(width, padding + string, padding);
       };


	    //To test payee delete dialog box
       $scope.openPayeeBenfDeleteConfirmDialogBox = function(){
    	   $rootScope.payee.PayeeDeleteAlertResponse(function(title,msg){
    		   UIControlsService.showDialogBox(title,msg,$rootScope.appLiterals.APP.COMMON.BUTTON.YES,$rootScope.appLiterals.APP.COMMON.BUTTON.CANCEL,function(){
    			   $rootScope.payee.isDeleteBeneficiaryMode=true ; $scope.setEvent("onDeletePayeeConfirmationYesClick");
    		   },function(){
    			   $scope.setEvent("onDeletePayeeConfirmationNoClick");
    		   });
    	   });
       };

       //To test biller delete dialog box
       $scope.openPayeeBillerDeleteConfirmDialogBox = function(){
    	   $rootScope.payee.BillerDeleteAlertResponse(function(title,msg){
    		   UIControlsService.showDialogBox(title,msg,$rootScope.appLiterals.APP.COMMON.BUTTON.YES,
    				   $rootScope.appLiterals.APP.COMMON.BUTTON.CANCEL,function(){
    			   $rootScope.payee.isDeleteBeneficiaryMode=true ; $scope.setEvent("onDeleteBillerConfirmationYesClick");
    		   },function(){
    			   $scope.setEvent("onDeleteBillerConfirmationNoClick");
    		   });
    	   });
       };

$scope.exitAppConfirmBox = function(){		
	if(MBaaS.isAndroidEnv()){
			UIControlsService.showDialogBox($rootScope.appLiterals.APP.MAILS.CNFRM_PAGE.YOUR_BANK,$rootScope.appLiterals.APP.MAILS.CNFRM_PAGE.EXIT_APP_TEXT,$rootScope.appLiterals.APP.MAILS.CNFRM_PAGE.YES,$rootScope.appLiterals.APP.MAILS.CNFRM_PAGE.NO,		
			function(){		
		   		navigator.app.exitApp();		
	   		},function(){		
	   			$scope.setGlobalEvent('onLoginClick');		
	   		});  
	}
};
	   
	   
	   
	   
		
	//remove mail confirmation page and open dialog box for mail confirmation												   
		$scope.mailConfirmBox = function(){		
    	var mailEvent = $rootScope.mails.compose.getSendEvent();		
    	if(mailEvent === 'onSubjectEmptySendClick'){		
    		   UIControlsService.showDialogBox($rootScope.appLiterals.APP.MAILS.CNFRM_PAGE.TXT_MISSUB,$rootScope.appLiterals.APP.MAILS.CNFRM_PAGE.TXT1,$rootScope.appLiterals.APP.MAILS.CNFRM_PAGE.BTN_SEND,$rootScope.appLiterals.APP.MAILS.CNFRM_PAGE.BTN_CAN,		
       				function(){		
       			   		$rootScope.mails.compose.isSendClicked=true;		
       			   		$scope.setEvent($rootScope.mails.fromInbox ? "onReplySendConfirmClick" : "onSendConfirmClick");		
       		   		},function(){		
       		   			$rootScope.mails.compose.isCancelClicked=true;		
       		   			$scope.setEvent("onCancelConfirmClick");		
       		   		});   		   		
    	}else{		
    		   $scope.setEvent(mailEvent);		
    	}  	   		
    }
	// Initialize this app
	$scope.initializeApp();
}]);