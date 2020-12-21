
App.viewModels.notifications=function(Logger, scope, rootScope){
	var self=this; // Maximum number of notifications to be displayed in app’s notification centre
	var maxNotifications = 10;
	var self=this;
	self.notificationsList=[];
	self.selNotifications={};
	/**
	* Get the notification while app launch
	* @constructor
	*/
  self.getAllNotificationFirst=function(userId){
	  userId=userId||'__ALL__';
	  //console.log('calling for noti first time');
	  rootScope.jsonStore.getNotifications(userId,function(notifications){
		  
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
	  console.log("Inside get Notification "+userId);
	  rootScope.jsonStore.getNotifications(userId,function(notifications){
		  var res=[];
                  console.log("Inside get Notification "+notifications.length);
		  for(var i=notifications.length-1;i>=0;i--){
			  if(notifications[i].json.exceptUser){
				  if(notifications[i].json.exceptUser.indexOf(rootScope.customerId)==-1){
					  res.push(notifications[i]);
				  }
			  }else{
				  if (res.length==maxNotifications){
//                    res.splice(maxNotifications-1,1);
					  setTimeout(function(){
						  self.removeNotifications(notifications[i]._id,notifications[i].json.type,userId);
					  },200);
                    
				  }
				  else{
					  res.push(notifications[i]);
				  }
			  }
		  }
		  self.notificationsList=res;
		  rootScope.$apply();
	  });
  };
  /**
	* Remove all the notification
	* @constructor
	*/
  self.removeAllNotification=function(userId){
	  userId=userId||'__ALL__';
	  //console.log('calling for noti')
	  rootScope.jsonStore.removeAllNotification(self.notificationsList,userId,function(){
		  self.notificationsList=[];
		  rootScope.$apply();
	  });
  };
  /**
	* Remove the notification
	* @constructor
	*/
  self.removeNotifications=function(id,type,userId){
	  rootScope.jsonStore.removeNotification(id,type,userId,function(){
		  var index=-1;
		  var i=0;
		  for(var temp in self.notificationsList){
			  
			  if(self.notificationsList[temp]._id===id){
				  index=i;
				  break;
			  }
			  i++;
		  }
		  console.log("The id in remove notifications"+id);
		  console.log("The Notifications in remove notifications"+JSON.stringify(self.notificationsList));
		  console.log("The index obtained"+index);
		  self.notificationsList.splice(index, 1);
		  rootScope.$apply();
	  });
  };
  /**
	* Displays the delete notification icon 
	* @constructor
	*/
  self.isDisplayable=function(notice){
	var res=  notice.json.exceptUser===undefined ? true:notice.json.exceptUser.indexOf(rootScope.customerId)==-1;
	//console.log("yoyo=",res);
	var today=moment(new Date());
		var expiryDate=moment(notice.json.expiresOn);
		// Added for RAK customisation
		if(today > expiryDate){
			res=false;
		}
	
	console.log("IS DISPLAYABLE"+res);
	return res;  
  };
  /**
	* Displays the detail of any notification
	* @constructor
	*/
  self.displayNotification=function(){
	  setTimeout(function(){
		  $('#notiContainer').html(self.selNotifications.json.payload.content);
		  },200);
  };
  /**
	* Setting the notification according to target_type
	* @constructor
	*/
  self.notifyAction=function(){
	  if(self.selNotifications.json.targettype=="link"){
		  window.open(self.selNotifications.json.target, '_blank', 'height=570,width=520,scrollbars=yes,status=yes');
		  return;
	  }
	    else if(rootScope.pushData.userId =="__ALL__")
		  {
		  rootScope.pushData = self.selNotifications.json;
			WL.Logger.debug("props :: " + JSON.stringify(rootScope.pushData));
		  scope.setGlobalEvent(rootScope.pushData.eventName);
		  
		  }
	  else{
//		  scope.setEvent('onViewNotifClick'); 
		  
		  rootScope.pushData = self.selNotifications.json;
			WL.Logger.debug("props :: " + JSON.stringify(rootScope.pushData));
			// handle data if user is logged in
			if (rootScope.isUserLoggedIn
					&& rootScope.pushData.userId == rootScope.customerId
					&& rootScope.pushData.isClicked == "true") {
				//rootScope.pushData.isClicked = "false";
				scope.setGlobalEvent(rootScope.pushData.eventName);
			}
	  }
  };
};