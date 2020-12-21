
/* JavaScript content from js/mfp/MFPPushImpl.js in folder common */
var AppController = angular.module("AppController");
// An implementation of PushNotificationImpl for cordova
// Contains only methods specific to cordova
AppController.factory('FMBPushNotificationImpl', ['$rootScope','PushNotificationImpl','MBaaS', 'ActionProcessor',
                               function($rootScope,PushNotificationImpl,MBaaS, ActionProcessor ) {
	// Let us extend the parent first
	angular.extend(this, PushNotificationImpl);

	var deviceToken;


	return {

			initialize : function(scope){
				this.scope = scope;

				var onPushPluginReady = function (){
//MFP8 Push Changes - Yogesh Strat
					MFPPush.initialize(
							function(successResponse) {
						        WL.Logger.debug("Successfully intialized");
						        MFPPush.registerNotificationsCallback(notificationReceived);

						    }, function(failureResponse) {
						    	navigator.notification.alert("Failed to initialize");
    				},null);
//MFP8 Push Changes - Yogesh End(added null Parameter at end)

					//callback for notification received
					var notificationReceived = function(data) {
					        console.log("MFPPushImpl-data:"+JSON.stringify(data));
						    var callBack = MBaaS.getActionReceiver("MyActionReceiverId");
							data = typeof data.payload === "object" ? data.payload : JSON.parse(data.payload) ;
							if(data.isClicked)
							{
								$rootScope.notifications.getAllNotification($rootScope.customerId);
							}
							if(data.wasTapped){
								data = JSON.parse(data.data);
								data["isClicked"] = "true";
								data["action"] = "pushData";
								data["wasTapped"] = true;
								$rootScope.notifications.getAllNotification($rootScope.customerId);
							}
							if(data.action === "openURL")
							{
							   var received = {"data":data.link ,"action":data.action};
							}
							else if(data.action === "makeCall"){
							   received = {"data":data.call,"action":data.action};
							}
							else
							{
								received = {"data":data,"action":data.action};
								//data.payload.message = data.alert;
								//var pushData = JSON.parse(data.payload);
								//pushData.message = data.alert;
								//data.payload = pushData;
								console.log("MFPPushImpl-data:"+JSON.stringify(data));
								//$rootScope.notifications.addNotification(data);
							}
							if(ActionProcessor.isAppInitialized())
							{
								callBack(received);
							}
							else
							{
								setTimeout(callBack(received),2000);
							}
						  }
//						  //,
//						  //function(msg){
//						//	console.log('onNotification callback successfully registered: ' + msg);
//						//  },
//						//  function(err){
//						//	console.log('Error registering onNotification callback: ' + err);
//						//  }
//					//);

				};
				document.addEventListener("deviceready",onPushPluginReady,false);
			},

    		registerForPush: function() {

                registerDevice();
    		},

    		deRegisterForPush: function() {
                 unregisterDevice();
    		},

			registerDevice:function(){
				console.log('==registerDevice MFPPushImpl.js===');
				initPush();
			},
			getSubscriptionStatus : function()
			{
				return getSubscriptionStatus();
			},
			subscribeTopic :function(topic)
			{
				//
			},
			unSubscribeTopic :function(topic)
			{
				//
			},
			doAction : function(param){
				console.log("inside doAction of cordovaPushImpl");
				console.log("daxin : params"+param);
    		}

    	};
}]);
