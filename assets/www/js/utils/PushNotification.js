
AppController.factory('PushNotification', ['$rootScope','PushNotificationImpl',
                               function($rootScope,PushNotificationImpl) {
	// Handle to the actual logger implementation instance.

	// It is highly possible that the constructor init was not
	// called due to bad coding practice. In order to handle such
	// a case, we either check for nulls in each method, or we initialize
	// the default instance to a push that does not print anything.
	// In this case, we choose the latter
	// Making this global as it needs to be accessed across the application
	var pushnotification = PushNotificationImpl;

	// function definitions
	return {
		/**
	  	 * The init method which sets up the push for this factory
	  	 * @constructor
	  	 */
		initialize: function(ImplInstance,scope) {
			pushnotification = ImplInstance;
			pushnotification.initialize(scope);
		},
		registerForPush: function()
		{
		    pushnotification.registerForPush();
		},
		deRegisterForPush:function()
		{
		    pushnotification.deRegisterForPush();
		},
		registerDevice:function()
		{
			console.log('==registerDevice PushNotification.js===');
			pushnotification.registerDevice();
		},
		getSubscriptionStatus : function()
		{
			return pushnotification.getSubscriptionStatus();
		},
		subscribeTopic :function(topic)
		{
			pushnotification.subscribeTopic(topic);
		},
		unSubscribeTopic :function(topic)
		{
			pushnotification.unSubscribeTopic(topic);
		},
		doAction : function(params)
		{
		    pushnotification.doAction(params);
		}
	};
}]);