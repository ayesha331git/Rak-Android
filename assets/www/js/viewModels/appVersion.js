App.viewModels.appVersion=function(Logger,scope){
	var self=this;
    self.releaseDetails = '';
    self.featuresAvailable = '';
    self.featuresAvailableText = '';
    self.featuresData = '';
    
    /**
	* This utility will fetch app current version
	* @constructor
	*/
	self.getAppVersionDetails = function(appLiterals){
//		scope.setSingleStepRealmAuthFailure();
		/* Commented by sudharsan for gettings messages from Literals
		self.releaseDetails = appVersionDetails.version.releaseNoteParagraph1.split("+");	
		self.featuresAvailable = appVersionDetails.version.releaseNoteParagraph2.split("+");
		*/
		self.releaseDetails = appLiterals.APP.version.releaseNoteParagraph1.split("+");	
		self.featuresAvailable = appLiterals.APP.version.releaseNoteParagraph2.split("+");
		self.featuresAvailableText = self.featuresAvailable.shift();
	};
	/**
	* Setting event according to isUserLoggedIn flag
	* @constructor
	* @param {object} isUserLoggedIn return true/false
	*/
	self.getAppVersionCloseEventName = function(isUserLoggedIn){
		if(isUserLoggedIn)
		{
			return 'closeAppVersion';
		}
		return 'closeWithoutLoginAppVersion';
	};
};