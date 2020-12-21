//function isPushSupported() {
//	var isSupported = false;
//	if (WL.Client.Push){
//		isSupported = WL.Client.Push.isPushSupported();
//	}	
//	WL.Logger.debug(isSupported);
//}
//
//function isPushSubscribed() {
//	var isSubscribed = false;
//	if (WL.Client.Push){
//		isSubscribed = WL.Client.Push.isSubscribed('FMBPush');
//	}
//	WL.Logger.debug(isSubscribed);
//	return isSubscribed;
//}
//
////---------------------------- Set up push notifications -------------------------------
//function initPush(){
//if (WL.Client.Push) {
//	
//	WL.Client.Push.onReadyToSubscribe = function() {
//		
//		WL.Logger.debug("onReadyToSubscribe");
//
//		WL.Client.Push.registerEventSourceCallback(
//				"FMBPush", 
//				"FMBNotificationService", 
//				"FMBEventSource", 
//				pushNotificationReceived);
//		// to fetch useID
////		var corpId=x2.fields.finacleUserCorporateId;
//
////		var invocationData = {
////			    adapter : 'FMBNotificationService',
////			    procedure : 'getSubscriptionStatus',
////			    parameters : [corpId]
////			};
////		WL.Client.invokeProcedure(invocationData,{
////			onSuccess : getSubscribeStatusSuccess,
////			onFailure : getSubscribeStatusFailure
////		});
//		invokeProcedure('FMBNotificationService','getSubscriptionStatus','',false);
//	
//	};
//}
//}
//
//
////Others specific to project.
//var pushSubStatus=false;
//var isUnsubscribeRequested=false;
//function getSubscriptionStatus(){
//	return pushSubStatus;
//}
//
////IsUpdate true if you want to update.
////0 first time subscribing
////1 subscribed user
////2 temporary  unsubscribed user
//function invokeProcedure(serviceName,procedureName,setSubValue,isUpdate){
//	var corpId=x2.fields.finacleUserCorporateId;
//	var invocationData = {
//		    adapter : serviceName,
//		    procedure : procedureName,
//		    parameters : [corpId,setSubValue]
//		};
//	if(isUpdate){
//		WL.Client.invokeProcedure(invocationData,{
//			onSuccess : setSubscribeStatusSuccess,
//			onFailure : subscribeStatusFailure
//		});
//	}else{
//		WL.Client.invokeProcedure(invocationData,{
//			onSuccess : getSubscribeStatusSuccess,
//			onFailure : subscribeStatusFailure
//		});
//	}
//	
//}
//
//function getSubscribeStatusSuccess(response){
////	WL.Logger.Info("getSubscribeStatusSuccess value"+JSON.stringify(response));
////	alert("getSubscribeStatusSuccess :"+JSON.stringify(response));
//
////		if(response.invocationResult.result=="1" || response.invocationResult.result=="0"){
////		doSubscribe();
//	
//	if(response.invocationResult.result=="0"){
//		
////		var r = confirm("Do you want to register for Push Notifications");
////		if (r == true) {
////			doSubscribe();
////		 } else {
////			 doSubscribe();
////			 isUnsubscribeRequested=true;			
////		 } 
//		WL.SimpleDialog.show("Push Notification",
//				"Do you want to register for Push Notifications.", [ {
//					text : 'No',
//					handler : function() {
//						doSubscribe();
//						 isUnsubscribeRequested=true;
//					}
//				}, {
//					text : 'Yes',
//					handler : function() {
//						doSubscribe();
//					}
//				} ]);
//		
//		
//	}else if(response.invocationResult.result=="1"){
//		doSubscribe();
//	}
//}
//
//function setSubscribeStatusSuccess(response){
//////	var value=response.invocationResult.result;
//////	alert(value)
////	if(response.invocationResult.result.errorCode=="successSetSub"
////		&& response.invocationResult.result.errorCode=="errorSetSub" ){
////		doSubscribe();
//		
////	alert("setSubscribeStatusSuccess :"+JSON.stringify(response));
//		if(response.invocationResult.result=='0' ||response.invocationResult.result=='2') pushSubStatus=false;
//		else if(response.invocationResult.result=='1' ) pushSubStatus=true;
////		alert(pushSubStatus);
////	}else
//}
//function subscribeStatusFailure(response){
//	WL.Logger.Info("getSubscribeStatusFailure value"+JSON.stringify(response));
//}
//
////--------------------------------- Subscribe ------------------------------------
//function doSubscribe() {
////	alert("subscribe");
//	if (WL.Client.Push) {
//		WL.Client.Push.subscribe("FMBPush", {
//			onSuccess: doSubscribeSuccess,
//			onFailure: doSubscribeFailure
//		});
//	}
//}
//
//function doSubscribeSuccess() {
//	if(isUnsubscribeRequested === false){
//	invokeProcedure('FMBNotificationService','setSubscriptionStatus','1',true);
//	}else{
//	
//		doTempUnSubscribe();
//	}
//	WL.Logger.debug("doSubscribeSuccess");
//}
//
//function doSubscribeFailure() {
//	WL.Logger.debug("doSubscribeFailure");
//}
//
////------------------------------- Unsubscribe ---------------------------------------
//
//function doTempUnSubscribe(){
////	alert("doTempUnSubscribe");
//	invokeProcedure('FMBNotificationService','setSubscriptionStatus','2',true);
//	pushSubStatus=false;
//	isUnsubscribeRequested=false;
//}
//function doUnsubscribe() {
//	
//	WL.Client.Push.unsubscribe("FMBPush", {
//		onSuccess: doUnsubscribeSuccess,
//		onFailure: doUnsubscribeFailure
//	});
//}
//
//function doUnsubscribeSuccess() {
//	
//	WL.Logger.debug("doUnsubscribeSuccess");
//}
//
//function doUnsubscribeFailure() {
//	WL.Logger.debug("doUnsubscribeFailure");
//}
//
////------------------------------- Handle received notification ---------------------------------------
//function pushNotificationReceived(props, payload) {
////	alert("pushNotificationReceived");
//	WL.Logger.debug("pushNotificationReceived invoked");
//	WL.Logger.debug("props :: " + JSON.stringify(props));
//	WL.Logger.info(JSON.stringify(payload));
//	//WL.Logger.info("payload :: " + JSON.stringify(payload));
//	var jsonStore=new App.viewModels.jsonStore();
//	jsonStore.addNotification(payload);
//}
//
////------------------------------- Handle received notification ---------------------------------------
//WL.Client.Push.onMessage = function (props, payload) {
//	var jsonStore=new App.viewModels.jsonStore();
//	jsonStore.addNotification(payload);
//};
