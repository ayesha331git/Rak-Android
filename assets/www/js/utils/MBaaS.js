var AppController = angular.module("AppController");
// This factory provides access to the underlying MBaaS.
// It acts like a manager as well allowing the application
// to setup the mbaas
AppController.factory('MBaaS', ['MBaaSImpl',
                               function(MBaaSImpl) {
	// Handle to the actual mbaas implementation instance
	
	// Default to an empty implementation so that we don't
	// hit TypeErrors or undefined errors in Javascript.
	// It is possible that bad coding practice led to a situation
	// where the init was not called appropriately.
	var mbaasInstance = MBaaSImpl;
	
	var fileName = "";
	// function definitions
	return {
		/**
	  	 * The init method which sets up the connectors for this factory
	  	 * @constructor
	  	 */
		init: function(mbaasImplInstance) {
			mbaasInstance = mbaasImplInstance;
		},
		
		/**
	  	 * The method that initializes connectivity to mbaas
	  	 * @constructor
	  	 */
		setupMbaasConnectivity: function() {
			// delegate to the underlying implementation
			return mbaasInstance.setupMbaasConnectivity();
		},
		
		/**
	  	 * The method that invokes a service on mbaas
	  	 * @constructor
	  	 */
		invokeService: function(request) {
			// delegate to the underlying implementation
			return mbaasInstance.invokeService(request);
		},

		/**
	  	 * The method that disconnects from mbaas
	  	 * @constructor
	  	 */
		disconnectMbaas: function() {
			// delegate to the underlying implementation
			return mbaasInstance.disconnectMbaas();
		},
		
		isAndroidEnv: function() {
			return mbaasInstance.isAndroidEnv();
		},
		isIPhoneEnv: function() {
			return mbaasInstance.isIPhoneEnv();
		},
		isIPadEnv: function() {
			return mbaasInstance.isIPadEnv();
		},
		isMobileWEBEnv: function() {
			return mbaasInstance.isMobileWEBEnv();
		},
		getDeviceId: function(callBackJsON){
			return mbaasInstance.getDeviceId(callBackJsON);
		},
		logoutFromFMBRealm: function(){
			return mbaasInstance.logoutFromFMBRealm();
		},
		platformInit: function(initOptions,UIControlsService,rootScope){
			return mbaasInstance.platformInit(initOptions,UIControlsService,rootScope);
		},
		getJSONStore: function(){
			return mbaasInstance.getJSONStore();
		},
		showSimpleDialog: function(header,body,buttonText,handlerFunc){
			return mbaasInstance.showSimpleDialog(header,body,buttonText,handlerFunc);
		},
		reloadApp: function(){
			return mbaasInstance.reloadApp();
		},
		setServerUrl: function(serverURL,setServerURLSuccess,setServerURLFailure){
			return mbaasInstance.setServerUrl(serverURL,setServerURLSuccess,setServerURLFailure);
		},
		getServerUrl: function(getServerURLSuccess, getServerURLFailure){
			return mbaasInstance.getServerUrl(getServerURLSuccess, getServerURLFailure);
		},
		isServerConnected: function(){
			return mbaasInstance.isServerConnected();
		},
		repondChallenge: function(challengeHandler,parameters,invokeProcedure){
			return mbaasInstance.repondChallenge(challengeHandler,parameters,invokeProcedure);
		},
		enableEncryption: function(){
			return mbaasInstance.enableEncryption();
		},
		getIPInfo: function(rootScope){
			return mbaasInstance.getIPInfo(rootScope);
		},
		isPreviewEnv: function(){
			return mbaasInstance.isPreviewEnv();
		},
		getEnvironment: function(){
			return mbaasInstance.getEnvironment();
		},
		isStepupRealmAvailable: function(){
			return mbaasInstance.isStepupRealmAvailable();
		},
		addActionReceiver: function(actionReceiverName,actionReceiver){
			return mbaasInstance.addActionReceiver(actionReceiverName,actionReceiver);
		},
		overrideBackButton: function(callBack){
			return mbaasInstance.overrideBackButton(callBack);
		},
		onLoadLoginCallReqd: function(){
			return mbaasInstance.onLoadLoginCallReqd();
		},
		setTermsAndConditionUrl: function (data) {
	        fileName = data;
	    },
	    getTermsAndConditionUrl: function () {
	        return fileName;
		},
		     getActionReceiver: function(actionReceiverName){
            return mbaasInstance.getActionReceiver(actionReceiverName);
        }
	};
}]);