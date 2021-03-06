$.ajax({cache:false});
/*
 * Main.js - generated by IBM MFP, used to initialize worklight js calls.
 * Manages the push notification implementation related to IBM MFP's push notification services.
 * Can be excluded when moving out of IBM MFP.
*/
function wlCommonInit(){
	localeFromSDonLoad();
    // MFP-8 Changes start
    createUserLoginChallengeHandler();
	console.log("before bootstrap in wlCommonInit() *************************************");
	angular.bootstrap(document, ['FinacleMobileApp']);

	document.addEventListener("backbutton", function(e) {
	    e.preventDefault();
	}, false);

        // MFP-8 Changes end
	WL.ClientMessages.applicationDenied="Important Information";
	WL.ClientMessages.unexpectedError="Unable to detect internet connection on your mobile. Please check your data package or Wi-Fi settings.";
	WL.ClientMessages.unresponsiveHost="Unable to detect internet connection on your mobile. Please check your data package or Wi-Fi settings.";
	WL.Device.getNetworkInfo(function (networkInfo) {


		if(networkInfo.networkConnectionType=="mobile" || networkInfo.networkConnectionType=="WIFI"){


		}
		else{
			WL.ClientMessages.unresponsiveHost="Application is unable to detect internet connection on your mobile. Please check your data package or Wi-Fi settings."


		}

	});

    MFPPush.initialize(function(successResponse) {
		// navigator.notification.alert("Push Successfully intialized");
		console.log("Push Successfully intialized");
	}, function(failureResponse) {
		// navigator.notification.alert("Failed to initialize");
		console.log("Failed to initialize");
	},null);

}
function connectSuccess() {
	WL.Logger.info("Successfully connected to Finacle Banking Service(MBaaS)");
}

/*
 * invoked when MBaaS is not reachable. Crash situation, can be handled in desired ways in future.
 */
function connectFailure() {
	//WL.Logger.fatal ("Failed connecting to MobileFirst Server.");
	WL.Logger.fatal ("Sorry we are unable to process your request. Please try again later.");

	WL.SimpleDialog.show($rootScope.appLiterals.APP.ERROR_MESSAGE.ALERT, $rootScope.appLiterals.APP.ERROR_MESSAGE.CON_ERROR,
			[{
				text : 'Reload',
				handler : WL.Client.reloadapp()
			},
			{
				text: 'Close',
				handler : function() {}
			}]
		);
}

//This method is invoked after loading the main HTML and successful initialization of the Worklight runtime.
function wlEnvInit(){
	wlCommonInit();
	/*Commented for rak customization please dont uncomment*/
	if(WL.Client.getEnvironment() == WL.Environment.ANDROID){
//	WL.App.BackgroundHandler.setOnAppEnteringBackground(WL.App.BackgroundHandler.hideView);
	}
	// Environment initialization code goes here
}

/*
 * Use the following piece of code to customize the direct update interface if required.
var directUpdateCustomListener = {
		onStart: function(totalSize){
			//show custom progress dialog
		},
		onProgress: function(status,totalSize,completedSize){
			//update custom progress dialog
		},
		onFinish: function(status){

			if (status == 'SUCCESS'){
				//show success message
				WL.Client.reloadApp();
			}
			else {
				//show custom error message

				//submitFailure must be called is case of error
				wl_directUpdateChallengeHandler.submitFailure();
			}
		}
};

*/

wl_directUpdateChallengeHandler.handleDirectUpdate = function(directUpdateData, directUpdateContext) {
	// custom WL.SimpleDialog for Direct Update
	var customDialogTitle = 'RAK BANK';
	var customDialogMessage = 'There is a new update available for the , download now to get the new features !';
	var customButtonText1 = 'Update Application';
	var customButtonText2 = 'Later';

	WL.SimpleDialog.show(customDialogTitle, customDialogMessage, [{
		text : customButtonText1,
		handler : function() {
		directUpdateContext.start();
		/* Use the following code have a custom direct update interface, please note comment the line above this comment
		 * in that case.
		 *
		 * directUpdateContext.start(directUpdateCustomListener);
		 */
		}
	}]);
};

//TODO Mahesh - MFP8-Push

//Others specific to project.
var pushSubStatus=false;
var isUnsubscribeRequested=false;

function getSubscriptionStatus(){
	return pushSubStatus;
}
function isPushSupported() {
	var isSupported = false;
    MFPPush.isPushSupported(
        function(successResponse) {
            WL.Logger.debug("Push Supported: " + successResponse);
            isSupported = successResponse;
        }, function(failureResponse) {
            WL.Logger.debug("Failed to get push support status");
        }
    );
}
//Removing isPushSubscribed() - not using anywhere and discontinued in MFP8

//---------------------------- Set up push notifications -------------------------------
function initPush(){
console.log('init push');
    SubscriptionCheck();
}


function SubscriptionCheck() {
    WLAuthorizationManager.obtainAccessToken("push.mobileclient").then(
            function(accessToken){
            console.log("==Ravi==:accessToken:"+accessToken);
	    MFPPush.getSubscriptions(function(subscriptions) {
            console.log("==Ravi==:Subscriptions"+JSON.stringify(subscriptions));
            obj = JSON.parse(JSON.stringify(subscriptions));
            if(obj.length > 0 ){ //default tag: "Push.ALL"
            					//already subscribed
            					pushSubStatus = true;
            				}else{
            				// MFP 8 RAK specific changes
            				    rootScope.rakHome.pushPopUpClick();

                            }
			/*WL.SimpleDialog.show("Push Notification", "Do you want to register for Push Notifications.",
			[
				{
					text : 'No',
					handler :function() {
						window.localStorage.setItem('userPushRegisterPref','N');	//Ravi changes for updating push message pop . TOL : 893667
					}
				},
				{
					text : 'Yes',
					handler : function() {
						registerDevice();
						window.localStorage.setItem('userPushRegisterPref','Y');	//Ravi changes for updating push message pop . TOL : 893667
					}
				}
			]);*/
WL.Logger.debug(JSON.stringify(subscriptions));
	}, function(failureResponse){
		console.log("Failed to get subscriptions:" + JSON.stringify(failureResponse));
	})
	},
    		function(error){
    			console.log("Failed to obtain token:" + JSON.stringify(error));
    		}
    		);
}


//TODO Mahesh - MFP8-Push

function initPushForLogin(pushType){
	// MFP 8 Changes Removing below code and invoking push call
	registerDevice();
}

//--------------------------------- Subscribe ------------------------------------
function registerDevice() {
    WLAuthorizationManager.obtainAccessToken("push.mobileclient").then(
        function(accessToken){
			console.log("==Ravi==:accessToken:"+accessToken);
            MFPPush.registerDevice(
                null,
                function(successResponse) {
					pushSubStatus = true;
                  	console.log("Successfully registered");
					  navigator.notification.alert("Successfully registered");
					  registerTag();
					  window.localStorage.setItem('userPushRegisterPref','Y');	//Ravi changes for updating push message pop. TOL : 893667
                },
                function(failureResponse) {
					console.log("Failed to register device:" + JSON.stringify(failureResponse));
					navigator.notification.alert("registration failed "+JSON.stringify(failureResponse));
					pushSubStatus = false;
                }
            )
        },
		function(error){
			console.log("Failed to obtain token:" + JSON.stringify(error));
		}
    );
}

//------------------------------- Unsubscribe ---------------------------------------
function unregisterDevice() {
    WLAuthorizationManager.obtainAccessToken("push.mobileclient").then(
        MFPPush.unregisterDevice(
           function(successResponse) {
                pushSubStatus = false;
                console.log("Unregistered successfully");
				navigator.notification.alert("Unregistered successfully");
				window.localStorage.setItem('userPushRegisterPref','N');	//Ravi changes for updating push message pop. TOL : 893667
           },
           function(failureResponse){
               navigator.notification.alert("Failed to unregister");
               console.log("Failed to unregister:" + JSON.stringify(failureResponse));
           }
        )
    );
}

function getTags() {
    MFPPush.getTags (
        function(tags) {
            console.log("The tags are------->"+JSON.stringify(tags));
    },
        function() {
            console.log("Failed to get tags");
        }
    );
}

function initPush(pushType){

	var config2FAPushType = rootScope.mobileAppConfig.appConfigData.SoftToken_PUSH;

	// MFP 8 changes
	/*if (WL.Client.Push && pushType && pushType==config2FAPushType) {*/
      if (pushType && pushType==config2FAPushType) {
      registerDevice();

//		WL.Client.Push.onReadyToSubscribe = function() {
//
//			WL.Logger.debug("onReadyToSubscribe");
//
//			WL.Client.Push.registerEventSourceCallback(
//					"SoftTokenPush",
//					"SoftTokenPushNotification",
//					"SoftTokenEventSource",
//					pushNotificationReceived);
//
//			invokeProcedure('SoftTokenPushNotification','getSubscriptionStatus','',false,pushType);
//
//		};
	}

// MFP 8 changes
	// else if (WL.Client.Push) {

    else {


    // MFP 8 changes
	/*WL.Client.Push.onReadyToSubscribe = function() {

		WL.Logger.debug("onReadyToSubscribe");

		WL.Client.Push.registerEventSourceCallback(
				"FMBPush",
				"FMBNotificationService",
				"FMBEventSource",
				pushNotificationReceived);*/
		// to fetch useID
//		var corpId=x2.fields.finacleUserCorporateId;

//		var invocationData = {
//			    adapter : 'FMBNotificationService',
//			    procedure : 'getSubscriptionStatus',
//			    parameters : [corpId]
//			};
//		WL.Client.invokeProcedure(invocationData,{
//			onSuccess : getSubscribeStatusSuccess,
//			onFailure : getSubscribeStatusFailure
//		});
		//invokeProcedure('FMBNotificationService','getSubscriptionStatus','',false,'');
		var modifiedCIF=rootScope.customerId;
		if(modifiedCIF && modifiedCIF.indexOf('.')){
			modifiedCIF=modifiedCIF.replace('.','');
		}
		retrieveDetails(function (successResponse) {
            console.log('successResponse --> ');

            if(WL.Client.getEnvironment() == WL.Environment.IPHONE){
            	self.registered = successResponse.result.split("#")[0];
                self.regFlag = successResponse.result.split("#")[1];
            }
            else{
            	self.registered = successResponse.split("#")[0];
                self.regFlag = successResponse.split("#")[1];
            }


            console.log('self.registered --> '+self.registered);
            console.log('self.regFlag --> '+self.regFlag);

           if(self.registered == "false" && self.regFlag != "N"){
           rootScope.rakHome.pushPopUpClick();
           isUnsubscribeRequested=rootScope.isUnsubscribeRequested;
           }

            } , function (errorResponse) {
            },modifiedCIF);



	//TO be removed after 2-3 releases START

//    if(WL.Client.getEnvironment() == WL.Environment.IPHONE){
//        WL.Logger.debug("onReadyToSubscribe new iphone push block");
//
//        registerDevice();
//// MFP 8 changes
////        WL.Client.Push.registerEventSourceCallback(
////                "FMBPush",
////                "FMBNotificationService",
////                "FMBEventSource",
////                pushNotificationReceived);
//
//
//        retrieveDetails(function (successResponse) {
//            console.log('successResponse --> '+successResponse);
//
//            if(WL.Client.getEnvironment() == WL.Environment.IPHONE){
//                self.registered = successResponse.result.split("#")[0];
//                self.regFlag = successResponse.result.split("#")[1];
//                self.tempRegIphoneFlag = regFlag.split("|")[1];
//            //    comsole.log('tempRegIphoneFlag --> '+self.tempRegIphoneFlag);
//            }
//            else{
//                self.registered = successResponse.split("#")[0];
//                self.regFlag = successResponse.split("#")[1];
//            }
//
//
//            console.log('self.registered --> '+self.registered);
//            console.log('self.regFlag --> '+self.regFlag);
//
//           if(self.registered == "false" && self.regFlag != "N"){
//               rootScope.rakHome.pushPopUpClick();
//               isUnsubscribeRequested=rootScope.isUnsubscribeRequested;
//           }
//
//           else if(self.registered == "true" && !self.tempRegIphoneFlag){
//               console.log('inside iphone push condition');
//               rootScope.rakHome.doSubscribeNotification();
//             }
//
//            } , function (errorResponse) {
//            },rootScope.customerId);
//    }
	//TO be removed after 2-3 releases END

}
}


// MFP8 RAK changes
// MFP8 RAK changes
function registerTag(){

	var customerType=rootScope.customerType;
	var tagName=null;


	if(customerType){
	switch(customerType){
	case "PBD":
		tagName="PBD";

		break;
	case "PAM":
		tagName="PAM";

		break;
	case "PSL":
		tagName="PSL";

		break;
	case "CBD":
		tagName="CBD";

		break;
	case "SME":
		tagName="SME";

		break;
	default:
		tagName="";

		break;
	}
 WLAuthorizationManager.obtainAccessToken("push.mobileclient").then(
        function(accessToken){
    	MFPPush.subscribe(tagName, function(success){
		            console.log("TAG SUBSCRIPTION SUCCESSFULL");
                  	}, function(failure){
                     console.log("TAG SUBSCRIPTION FAILED");
                  	});
},
 	function(error){
 			console.log("Failed to obtain token:" + JSON.stringify(error));
 	}
     );
}

};


function subscribeTag(){
	console.log("TAG subscription starts here");
	var customerType=rootScope.customerType;
	var tagName=null;
	if(customerType){
	switch(customerType){
	case "PBD":
		tagName="PBD";
		break;
	case "PAM":
		tagName="PAM";
		break;
	case "PSL":
		tagName="PSL";
		break;
	case "CBD":
		tagName="CBD";
		break;
	case "SME":
		tagName="SME";
		break;
	default:
		tagName="";
		break;
	}

	if(null!=tagName && tagName.length>0){
		console.log("TAG SUSBCRIPTION STATUS"+WL.Client.Push.isTagSubscribed(tagName));
		if(!WL.Client.Push.isTagSubscribed(tagName)){
			console.log("TAG SUSBCRIPTION FOR TAG "+tagName);
			WL.Client.Push.subscribeTag(tagName,{
				onSuccess:onTagSubscriptionSuccess,
				onFailure:onTagSubscriptionFailure
			});
		}

	}

}
}

function onTagSubscriptionSuccess(response){
	console.log("Tag subscription success");

}

function onTagSubscriptionFailure(response){
	console.log("Tag subscription failure");
}


//Others specific to project.
var pushSubStatus=false;
var isUnsubscribeRequested=false;
function getSubscriptionStatus(){
	//Ravi changes for updating push message pop. TOL : 893667
	pushSubStatus=false;
	var pushUserPref = window.localStorage.getItem('userPushRegisterPref');
	if(pushUserPref === 'Y')
		pushSubStatus = true;
	//Ravi changes for updating push message pop. TOL : 893667
	return pushSubStatus;
}

//IsUpdate true if you want to update.
//0 first time subscribing
//1 subscribed user
//2 temporary  unsubscribed user
function invokeProcedure(serviceName,procedureName,setSubValue,isUpdate,pushType){
	var corpId=rootScope.customerId;
	var modifiedCIF=rootScope.customerId;
	if(modifiedCIF && modifiedCIF.indexOf('.')){
		modifiedCIF=modifiedCIF.replace('.','');
	}
	var config2FAPushType = rootScope.mobileAppConfig.appConfigData.SoftToken_PUSH;
	var invocationData = {
		    adapter : serviceName,
		    procedure : procedureName,
		    parameters : [modifiedCIF,setSubValue]
		};
	if(isUpdate){
		WL.Client.invokeProcedure(invocationData,{
			onSuccess : setSubscribeStatusSuccess,
			onFailure : subscribeStatusFailure
		});
	}
	else
	if (pushType && pushType==config2FAPushType) {
		WL.Client.invokeProcedure(invocationData,{
			onSuccess : getSoftTokenSubscribeStatusSuccess,
			onFailure : subscribeStatusFailure
		});
	}
	else{
		WL.Client.invokeProcedure(invocationData,{
			onSuccess : getSubscribeStatusSuccess,
			onFailure : subscribeStatusFailure
		});
	}

}

function getSoftTokenSubscribeStatusSuccess(response){

	if(response.invocationResult.result=="0"){
		doSubscribeSoftTokenPush();
		isUnsubscribeRequested=rootScope.isUnsubscribeRequested;
	}
	else if(response.invocationResult.result=="1"){
		doSubscribeSoftTokenPush();
	}
}

function getSubscribeStatusSuccess(response){
//	WL.Logger.Info("getSubscribeStatusSuccess value"+JSON.stringify(response));
//	alert("getSubscribeStatusSuccess :"+JSON.stringify(response));

//		if(response.invocationResult.result=="1" || response.invocationResult.result=="0"){
//		doSubscribe();

	if(response.invocationResult.result=="0"){

//		var r = confirm("Do you want to register for Push Notifications");
//		if (r == true) {
//			doSubscribe();
//		 } else {
//			 doSubscribe();
//			 isUnsubscribeRequested=true;
//		 }

// changed for rak customisation changed from $rootScope to rootscope
	/*	WL.SimpleDialog.show(rootScope.appLiterals.APP.ERROR_MESSAGE.PUSH_NOTIFY,
				rootScope.appLiterals.APP.ERROR_MESSAGE.PUSH_NOT_REG, [ {
					text : 'No',
					handler : function() {
						doSubscribe();
						 isUnsubscribeRequested=true;
					}
				}, {
					text : 'Yes',
					handler : function() {
						doSubscribe();
					}
				} ]);*/
		rootScope.rakHome.pushPopUpClick();
		isUnsubscribeRequested=rootScope.isUnsubscribeRequested;


	}else if(response.invocationResult.result=="1"){
		doSubscribe();
	}
}

function setSubscribeStatusSuccess(response){
////	var value=response.invocationResult.result;
////	alert(value)
//	if(response.invocationResult.result.errorCode=="successSetSub"
//		&& response.invocationResult.result.errorCode=="errorSetSub" ){
//		doSubscribe();

//	alert("setSubscribeStatusSuccess :"+JSON.stringify(response));
		if(response.invocationResult.result=='0' ||response.invocationResult.result=='2') pushSubStatus=false;
		else if(response.invocationResult.result=='1' ) pushSubStatus=true;
//		alert(pushSubStatus);
//	}else
}
function subscribeStatusFailure(response){
	WL.Logger.Info("getSubscribeStatusFailure value"+JSON.stringify(response));
}

//--------------------------------- Subscribe ------------------------------------

function doSubscribeSoftTokenPush() {
//	alert("subscribe");
	if (WL.Client.Push) {
		WL.Client.Push.subscribe("SoftTokenPush", {
			onSuccess: doSubscribeSoftTokenSuccess,
			onFailure: doSubscribeFailure
		});
	}
}
function doSubscribe() {
//	alert("subscribe");
	if (WL.Client.Push) {
		WL.Client.Push.subscribe("FMBPush", {
			onSuccess: doSubscribeSuccess,
			onFailure: doSubscribeFailure
		});
	}
}

function doSubscribeSuccess() {
	if(isUnsubscribeRequested === false){
	invokeProcedure('FMBNotificationService','setSubscriptionStatus','1',true);
	// added for push tag subscription

	subscribeTag();

	}else{

		doTempUnSubscribe();
	}
	WL.Logger.debug("doSubscribeSuccess");
}

function doSubscribeSoftTokenSuccess() {
	var config2FAPushType = rootScope.mobileAppConfig.appConfigData.SoftToken_PUSH;
	if(isUnsubscribeRequested === false){
	invokeProcedure('SoftTokenPushNotification','setSubscriptionStatus','1',true,config2FAPushType);
	// added for push tag subscription

	//subscribeTag();

	}else{
		WL.Logger.debug("UnSubscribe");
		//doTempUnSubscribe();
	}
	WL.Logger.debug("doSubscribeSuccess");
}

function doSubscribeFailure() {
	WL.Logger.debug("doSubscribeFailure");
}

//------------------------------- Unsubscribe ---------------------------------------

function doTempUnSubscribe(){
//	alert("doTempUnSubscribe");
	invokeProcedure('FMBNotificationService','setSubscriptionStatus','2',true);
	pushSubStatus=false;
	isUnsubscribeRequested=false;
}
function doUnsubscribe() {

	WL.Client.Push.unsubscribe("FMBPush", {
		onSuccess: doUnsubscribeSuccess,
		onFailure: doUnsubscribeFailure
	});
}

function doUnsubscribeSuccess() {

	WL.Logger.debug("doUnsubscribeSuccess");
}

function doUnsubscribeFailure() {
	WL.Logger.debug("doUnsubscribeFailure");
}

//------------------------------- Handle received notification ---------------------------------------
function pushNotificationReceived(props, payload) {
//	alert("pushNotificationReceived");
//	WL.Logger.debug("pushNotificationReceived invoked");
//	WL.Logger.debug("props :: " + JSON.stringify(props));
//	WL.Logger.info(JSON.stringify(payload));
//	//WL.Logger.info("payload :: " + JSON.stringify(payload));
//	var jsonStore=new App.viewModels.jsonStore();
//	jsonStore.addNotification(payload);
}

//------------------------------- Handle received notification ---------------------------------------
WL.Client.Push.onMessage = function (props, payload) {
//	alert("onmessage");
//	WL.SimpleDialog.show("RAK Notification", "Provider notification data: " + JSON.stringify(props), [ {
//	    text : 'Close',
//	    handler : function() {
//	    	WL.SimpleDialog.show("FMB Notification", "Application notification data: " + JSON.stringify(payload), [ {
//	    	    text : 'Close',
//	    	    handler : function() {}
//	    	  }]);
//	    }
//	}]);
	//var jsonStore=new App.viewModels.jsonStore();
	//jsonStore.addNotification(payload);
};
	function localeFromSDonLoad() {
	    document.addEventListener("deviceready", onDeviceReady, false);
	}

	function onDeviceReady() {
	    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, localeFS, fail);
	}

	function localeFS(fileSystem) {
	    fileSystem.root.getFile("Literals_en.json", null, localeFileEntry, fail);
	}

	function localeFileEntry(fileEntry) {
	    fileEntry.file(localeFile, fail);
	}

	function localeFile(file){
		   readAsText(file);

	}

	function readAsText(file) {
	    var reader = new FileReader();
	    reader.onloadend = function(evt) {

	        localeFromSD(JSON.parse(evt.target.result));
	    };
	    reader.readAsText(file);
	}

	function fail(evt) {
	//Yogesh Commented this for iPhone button click issue
	    //console.log(evt.target.error.code);
	}

	function localeFromSD(localedata) {
		var objLit = localedata;
		if(objLit) {
		 var $rootScope = angular.element(document.getElementById("finController")).scope().$root;
		  $rootScope.$apply(function () {
			 $rootScope.applit = objLit;

		  });
		}
	}
WL.Client.Push.getInteractivePushCategories = function(){
  var categories = [{
    //Category identifier, this is used while sending the notification.
    id : "app",
    //Optional array of actions to show the action buttons along with the message.
    actions: [
      {
        //Action identifier
        id : "app_ok",

        //Action title to be displayed as part of the notification button.
        title : "Proceed",
        //Optional mode to run the action in foreground or background. 1-foreground. 0-background. Default is foreground.
        mode: 1,

        //Optional property to mark the action button in red color. Default is false.
        destructive: false,

        //Optional property to set if authentication is required or not before running the action.(Screen lock).
        //For foreground, this property is always true.
        authenticationRequired: true
      },
      {
        id : "app_nok",
        title : "Cancel",
        mode: 1,
        destructive: false,
        authenticationRequired: true
      }
    ],
    //Optional list of actions that is needed to show in the case alert.
    //If it is not specified, then the first four actions will be shown.
    defaultContextActions: ['app_ok','app_nok'],

    //Optional list of actions that is needed to show in the notification center, lock screen.
    //If it is not specified, then the first two actions will be shown.
    minimalContextActions: ['app_ok','app_nok']
  },
  {
    //Category identifier, this is used while sending the notification.
    id : "link",
    //Optional array of actions to show the action buttons along with the message.
    actions: [
      {
        //Action identifier
        id : "link_ok",

        //Action title to be displayed as part of the notification button.
        title : "Link",
        //Optional mode to run the action in foreground or background. 1-foreground. 0-background. Default is foreground.
        mode: 1,

        //Optional property to mark the action button in red color. Default is false.
        destructive: false,

        //Optional property to set if authentication is required or not before running the action.(Screen lock).
        //For foreground, this property is always true.
        authenticationRequired: true
      },
      {
        id : "link_nok",
        title : "Cancel",
        mode: 1,
        destructive: false,
        authenticationRequired: true
      }
    ],
    //Optional list of actions that is needed to show in the case alert.
    //If it is not specified, then the first four actions will be shown.
    defaultContextActions: ['link_ok','link_nok'],

    //Optional list of actions that is needed to show in the notification center, lock screen.
    //If it is not specified, then the first two actions will be shown.
    minimalContextActions: ['link_ok','link_nok']
  }
  ];
  return categories;
};
