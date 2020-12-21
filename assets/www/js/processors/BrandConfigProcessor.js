AppController.factory('BrandConfigProcessor', ['$http', '$q','Logger','$rootScope',
                               function($http, $q, Logger, $rootScope) {
	/**
	 * variables that will be used across this service
	 */ 
	var brandConfig = {};
	
	return {
		
		/**
		 * The init method which initializes processing of all brand css configurations
		 * @constructor
		 * @return {object} Return all brand configs from JSON file
		 */ 
		init: function() {
			Logger.debug("Initializing brand css configuration");
			/**
			 * Note that we will have to return a promise because the caller
			 * is waiting on us to complete some functionality
			 */ 
			var deferred = $q.defer();
			/**
			 * Let us read the file now.
			 */
		    $http.get('js/utils/BrandCSSConfig.json').success(function(data) {
		    	/**
				 * The only thing to do is to process the brand config file
				 */
		    	brandConfig = data;
		    	Logger.debug("Finished processing brand css configuration");
		    	deferred.resolve(data);
		    }).error(function(msg, code) {
		    	Logger.debug("Error in processing brand css configuration::msg:: "+msg+", code:: "+code);
		    	deferred.reject(msg);
		    });
		    
		    /** 
		     * Let us return the promise now
		     */
		    return deferred.promise;
		},
		getBrandCSSPath: function(cssKey){
			Logger.debug("getBrandCSSPath:: segmentName:: "+cssKey);
			var returnCSSPath="";
			var inputBrandConfig = brandConfig[cssKey];
			if(inputBrandConfig){
				returnCSSPath = inputBrandConfig[$rootScope.selectedLocale.locale];
				if(!returnCSSPath){
					returnCSSPath = inputBrandConfig[$rootScope.mobileAppConfig.appConfigData.defaultLocale.locale];
				}
			}
			return returnCSSPath;
		},
		setBrandForUser: function(responseList){
			//NOTE - needs to be handled in switch profile - an option would be to clear off brandCSSPath from rootscope when profile is switched
			if(!$rootScope.brandCSSPath){
				if(responseList.UserAppPrefrences.Formatting.otherAppParameters.segment){
					var segmentName=this.getKeyForBranding(responseList);
					$rootScope.brandCSSPath = this.getBrandCSSPath(segmentName);
				}
			}
		},
		getKeyForBranding: function(responseList){
			var segmentName=responseList.UserAppPrefrences.Formatting.otherAppParameters.segment;
			return segmentName;
		}
	};
}]);