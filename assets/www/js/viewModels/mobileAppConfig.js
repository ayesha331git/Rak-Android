App.viewModels.mobileAppConfig=function(scope,Logger){
	var self=this;
	self.appConfigData = {};
	self.otherTemplates = {};
	/**
	* This utility will save the mobileAppConfig json to local variable.
	* @constructor
	* @param {object} data content of mobileAppConfig json
	*/
	self.loadMobileAppConfigData = function(data){
		self.appConfigData = data;
		//self.linkdisableTime=data.appConfigParams[2].otpLinkdisableTime;
	};
	/**
	* This utility return the templates data
	* @constructor
	*/
	self.getOtherTemplatesData = function(){
		Logger.info(" Other templates data is " + self.appConfigData.otherTemplates);
		return self.appConfigData.otherTemplates;//self.appConfigData["otherTemplates"];
	};
};