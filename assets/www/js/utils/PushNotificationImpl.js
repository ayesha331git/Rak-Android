var AppController = angular.module("AppController");
// An interface that defines methods for push notification implementation classes
// Each implementation of this interface will represent the push functions
// specific to a platform
AppController.factory('PushNotificationImpl', [
                               function() {
	
	// function definitions
	return {

	    	initialize:function(scope){
                //do nothing
    		},
    		registerForPush: function()
    		{
    		    //do nothing
    		},
			deRegisterForPush:function()
    		{
    		     //do nothing
    		},
			registerDevice:function(){
			
			},
			getSubscriptionStatus : function(){
			
			},
			subscribeTopic:function(){
			
			},
			unSubscribeTopic:function(){
			
			},			
    		doAction : function(params){
    		//do nothing
    		console.log("daxin doaction on PushImpl.js");
    		}
	};
}]);