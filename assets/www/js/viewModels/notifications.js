
/* JavaScript content from js/viewModels/notifications.js in folder common */
App.viewModels.notifications=function(Logger, scope, rootScope, $timeout){
	var self=this; // Maximum number of notifications to be displayed in app’s notification centre
	var maxNotifications = 10;
	self.notificationsList=[];
	self.selNotifications={};

	/**
	 * Add the notification when application in foreground - User Logged in
	 */

	 self.addNotification = function(data){
		console.log('data is:'+data);
		//Ravi changes for updating push message in Notification List . //Fix for TOL :893627
		//rootScope.pushNotificationHandler.addNotification(data);	//commented as this adds duplicate record
			var pushPayload = JSON.parse(data.payload);
            var userId = pushPayload["userId"];
            if(userId == rootScope.fields.finacleUserCorporateId || userId =="__ALL__"){
                //rootScope.unreadCount = rootScope.unreadCount+1;
                //localStorage.UnreadNotifications = rootScope.unreadCount;

                $timeout(function(){
									console.log('getAllNotification timer start');
									self.getAllNotification(userId);
								},1000);
								console.log('getAllNotification timer end');
                //rootScope.$apply();
            }
		//Ravi changes for updating push message in Notification List. //Fix for TOL :893627
	 };
	/**
	* Get the notification while app launch
	* @constructor
	*/
  self.getAllNotificationFirst=function(userId){
	  userId=userId||'__ALL__';
	  //console.log('calling for noti first time');
	  userId=userId.toUpperCase();
  	  //TOL-854295  - JSONStore replacement for MADP Android
	  //		- Changed the code to support JSONStore and SharedPreference
	  rootScope.jsonStore.getNotifications(userId,maxNotifications, function(notifications){

		  if(rootScope.appVersionDetails.appConfigParams[1].BUILDTYPE == 'MPIN'){
			  rootScope.myProfile.getMPINsHistory();
			}
		  self.notificationsList  =notifications;
		  if(!rootScope.$$phase)
		{
		  rootScope.$apply();
		}
	  });
  };
  /**
	* Get the notification while on dashboard / login
	* @constructor
	*/
  self.getAllNotification=function(userId){
	  userId=userId||'__ALL__';
	  //console.log('calling for noti');
	  userId=userId.toUpperCase();
	  //TOL-854295  - JSONStore replacement for MADP Android
	  //		- Changed the code to support JSONStore and SharedPreference
        rootScope.pushNotificationHandler.getNotifications(userId.toUpperCase(),maxNotifications,function(notifications){
            self.notificationsList = notifications;
            console.log("self.notificationsList:", self.notificationsList);
            rootScope.$apply();
        });

	  /*rootScope.jsonStore.getNotifications(userId,maxNotifications, function(notifications){
		  var res=[];
		  for(var i=notifications.length-1;i>=0;i--){
			  if(notifications[i].json.exceptUser){
				  if(notifications[i].json.exceptUser.indexOf(rootScope.fields.finacleUserCorporateId.toUpperCase())!=-1){
					  res.push(notifications[i]);
				  }
			  }else{
				  if (res.length==maxNotifications){
//                    res.splice(maxNotifications-1,1);
                    self.removeNotifications(notifications[i]._id,notifications[i].json.type,userId);
				  }
				  else{
					  res.push(notifications[i]);
				  }
			  }
		  }

		  self.notificationsList=res;
		  rootScope.$apply();
	  });
	  */
  };
  /**
	* Remove all the notification
	* @constructor
	*/
  self.removeAllNotification=function(userId){
	  userId=userId||'__ALL__';
	  //console.log('calling for noti')
	  userId=userId.toUpperCase();
	  rootScope.pushNotificationHandler.removeAllNotification(self.notificationsList,userId,function(){
		  self.notificationsList=[];
		  rootScope.$apply();
	  });
  };
  /**
	* Remove the notification
	* @constructor
	*/
  self.removeNotifications=function(id,type,userId){
	  rootScope.pushNotificationHandler.removeNotification(id,type,userId.toUpperCase(),function(){
	  var index;
	for (var i = 0; i < self.notificationsList.length ; i++) {
            if (self.notificationsList[i]._id == id) {
                index = i;
            }
	}
		  self.notificationsList.splice(index, 1);
		  rootScope.$apply();
	  });
  };

  self.clearPushData=function(){
	rootScope.pushData = {};
  };
  /**
	* Displays the delete notification icon
	* @constructor
	*/
  self.isDisplayable=function(notice){
		//Ravi changes for Push
		//console.log(JSON.stringify(notice,null,4));
		if(notice.json.deleteFlag){
			var result = notice.json.deleteFlag.indexOf(rootScope.fields.finacleUserCorporateId.toUpperCase())==-1 ? true:false;
			//console.log("==notification.js==>>>>>>>>deleteFlag result for User "+result);
			return result;
		}
		//Ravi Changes for Push - END
		var res=  notice.json.exceptUser===undefined ? true:notice.json.exceptUser.indexOf(rootScope.fields.finacleUserCorporateId.toUpperCase())==-1;
		//console.log("yoyo=",res);
		return res;
  };

  self.isNotificationEmpty = function(allNotificationList){
  for(var i=allNotificationList.length-1;i>=0;i--){
			  if(self.isDisplayable(allNotificationList[i])){
				 return false;
			  }
	}
	return true;
  };
  /**
	* Displays the detail of any notification
	* @constructor
	*/
  self.displayNotification=function(){
			var htmlContent;
            if(typeof self.selNotifications.json.payload == 'string'){
                self.selNotifications.json.payload = JSON.parse(self.selNotifications.json.payload);
            }
            else if(self.selNotifications.json.payload == undefined){
                self.selNotifications.json["payload"] = {};

                if(self.selNotifications.json.hasOwnProperty("content")){
                    self.selNotifications.json.payload['content'] = self.selNotifications.json.content;
                }
                if(self.selNotifications.json.hasOwnProperty("message")){
                    self.selNotifications.json.payload['message'] = self.selNotifications.json.message;
                }
            }
            setTimeout(function(){
                htmlContent = self.selNotifications.json.payload.message ;
                  if(self.selNotifications.json.payload.hasOwnProperty("content")){
                    htmlContent = htmlContent + "<br>"+self.selNotifications.json.payload.content;
                }
                $('#notiContainer').html(htmlContent);
            },200);
  };

//************TOL 829039  Start***********************//
   self.OpenNotificationURL=function()
   {
        if(self.selNotifications.json.targettype.toLowerCase()=="link")
		{
                  window.open(self.selNotifications.json.target, '_blank', 'height=570,width=520,scrollbars=yes,status=yes');
                  return;
        }
    };
    //TOL-893693 - changed the Condition
    self.openLink=function(){
          if(self.selNotifications.json.link != undefined && self.selNotifications.json.link!=""){
              window.open(self.selNotifications.json.link, '_blank', 'height=570,width=520,scrollbars=yes,status=yes');
              return;
          }
      };


    //TOL-893693 CALL button for notifications - changed 'call' to 'CALL' in notifications.openDialler() and added button in NotificationViewPage.html
      self.openDialler=function(){
          if(self.selNotifications.json.CALL != undefined && self.selNotifications.json.CALL !=""){
              window.open('tel:'+self.selNotifications.json.CALL, '_system');
              return;
          }
      };
//************TOL 829039  End***********************//***********************//
  /**
	* Setting the notification according to target_type
	* @constructor
	*/
  self.notifyAction=function(){
	  rootScope.pushData = self.selNotifications.json;
	  if(self.selNotifications.json.targettype.toLowerCase()=="link"){
		  //************TOL 829039 Start*************//
		  scope.setEvent('onViewNotifClick');
		 // window.open(self.selNotifications.json.target, '_blank', 'height=570,width=520,scrollbars=yes,status=yes');
		  //************TOL 829039 End*************//
		  return;
	  }
	    else if(rootScope.pushData.userId.toUpperCase() =="__ALL__")
		  {
			Logger.debug("props :: " + JSON.stringify(rootScope.pushData));
			if(rootScope.pushData.eventName == undefined){
			scope.setEvent('onViewNotifClick');
			}
		  else{
		  self.callEventFromNotification();
			//scope.setGlobalEvent(rootScope.pushData.eventName);
		  }
		  }
	  else{
//		  scope.setEvent('onViewNotifClick');

			Logger.debug("props :: " + JSON.stringify(rootScope.pushData));
			// handle data if user is logged in
			if (rootScope.isUserLoggedIn
					&& rootScope.pushData.userId == rootScope.fields.finacleUserCorporateId.toUpperCase()) {
		if(rootScope.pushData.eventName == undefined){
			scope.setEvent('onViewNotifClick');
			}
		else{
			self.callEventFromNotification();
			//scope.setGlobalEvent(rootScope.pushData.eventName);
			}
			}
	  }
  };
    //TOL=829014
    self.removeNotificationOnSlide=function(notificationId,type,userId){
        rootScope.showConfirmBox(
            "Do you want to delete this notification ?",
            "Yes",
            "No",
            function() {
                self.removeNotifications(notificationId,type,userId);
            },
            function() {
                //do nothing
            },
            true
        );
  };

  self.callEventFromNotification = function()  {
	rootScope.reinitialiseViewModel();
/*	if(rootScope.pushData.eventName == "BillPayNotification"){
		rootScope.fundTransfer.utils.initiatePayment(['BillPayment'],rootScope.pushData.eventName);
		}
		else{*/
		scope.setGlobalEvent(rootScope.pushData.eventName);
		//}
  };
};