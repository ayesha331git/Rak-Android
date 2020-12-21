var AppController = angular.module("AppController");
//An interface that defines methods for mbaas implementation classes
//Each implementation of this interface will represent the mbaas
//specific to a platform
AppController.factory('MBaaSImpl', ['$q',
                               function($q) {
	// Handle to the actual mbaas implementation instance
	var mbaasInstance = null;
	
	// function definitions
	// Note that all methods are expected to return a promise
	return {

		/**
	  	 * The method that initializes connectivity to mbaas
	  	 * @constructor
	  	 * @return a promise
	  	 */
		setupMbaasConnectivity: function() {
			// Nothing to do. Leave it to the child
		},
		
		/**
	  	 * The method that invokes a service on mbaas
	  	 * @constructor
	  	 * @return a promise
	  	 */
		invokeService: function(request) {
			// Nothing to do. Leave it to the child
		},
		
		/**
	  	 * The method that disconnects from mbaas
	  	 * @constructor
	  	 * @return a promise
	  	 */
		disconnectMbaas: function() {
			// Nothing to do. Leave it to the child
		},
		isAndroidEnv: function() {
			// Nothing to do. Leave it to the child.
		},
		isIPhoneEnv: function() {
			// Nothing to do. Leave it to the child.
		},
		isIPadEnv: function() {
			// Nothing to do. Leave it to the child.
		},
		isMobileWEBEnv: function() {
			// Nothing to do. Leave it to the child.
		},
		getDeviceId: function(callBackJsON){
			// Nothing to do. Leave it to the child.
		},
		logoutFromFMBRealm: function(){
			// Nothing to do. Leave it to the child.
		},
		platformInit: function(initOptions,UIControlsService,rootScope){
			// Nothing to do. Leave it to the child.
		},
		getJSONStore: function(){
			// Nothing to do. Leave it to the child.
		},
		showSimpleDialog: function(header,body,buttonText,handlerFunc){
			// Nothing to do. Leave it to the child.
		},
		reloadApp: function(){
			// Nothing to do. Leave it to the child.
		},
		setServerUrl: function(serverURL,setServerURLSuccess,setServerURLFailure){
			// Nothing to do. Leave it to the child.
		},
		getServerUrl: function(getServerURLSuccess, getServerURLFailure){
			// Nothing to do. Leave it to the child.
		},
		isServerConnected: function(){
			// Nothing to do. Leave it to the child.
		},
		repondChallenge: function(challengeHandler,parameters,invokeProcedure){
			// Nothing to do. Leave it to the child.
		},
		enableEncryption: function(){
			// Nothing to do. Leave it to the child.
		},
		getIPInfo: function(rootScope){
			// Nothing to do. Leave it to the child.
		},
		isPreviewEnv: function(){
			// Nothing to do. Leave it to the child.
		},
		getEnvironment: function(){
			// Nothing to do. Leave it to the child.
		},
		isStepupRealmAvailable: function(){
			// Nothing to do. Leave it to the child.
		},
		addActionReceiver: function(actionReceiverName,actionReceiver){
			// Nothing to do. Leave it to the child.
		},
		overrideBackButton: function(callBack){
			// Nothing to do. Leave it to the child.
		},
		onLoadLoginCallReqd: function(){
			// Nothing to do. Leave it to the child.
		},
		getActionReceiver: function(actionReceiverName){
        	// Nothing to do. Leave it to the child.
        }
	};
}]);