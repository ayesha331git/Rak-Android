AppController.factory('PhoneFormatConfigProcessor', ['$http', '$q','Logger','$rootScope',
                               function($http, $q, Logger, $rootScope) {
	/**
	 * variables that will be used across this service
	 */ 
	var phoneFormatConfig = {};
	var countryCodeMap = {};
	var allConfig = [];
	
	return {
		
		/**
		 * The init method which initializes processing of all phone formatting configurations
		 * @constructor
		 * @return {object} Return all phone formats from JSON file
		 */ 
		init: function() {
			Logger.debug("Initializing phone formatting configuration");
			/**
			 * Note that we will have to return a promise because the caller
			 * is waiting on us to complete some functionality
			 */ 
			var deferred = $q.defer();
			/**
			 * Let us read the file now.
			 */
		    $http.get('js/utils/PhoneFormatConfig.json').success(function(data) {
		    	/**
				 * The only thing to do is to process the phone format config file
				 */
		    	phoneFormatConfig = data;
		    	Logger.debug("Finished processing phone formatting configuration");
		    	deferred.resolve(data);
		    }).error(function(msg, code) {
		    	Logger.debug("Error in processing phone formatting configuration::msg:: "+msg+", code:: "+code);
		    	deferred.reject(msg);
		    });
		    
		    /** 
		     * Let us return the promise now
		     */
		    return deferred.promise;
		},
		getAllCountriesConfig: function(){
			Logger.debug("getAllCountriesConfig:: phoneFormatConfig:: "+phoneFormatConfig);
			
			if(allConfig==null || allConfig.length==0){
				var i = 0;
				for (var key in phoneFormatConfig) {
					if (phoneFormatConfig.hasOwnProperty(key)) {
						//here key will be the value for the JSON object
						var countryConfig = phoneFormatConfig[key];
						var countryCode=countryConfig["COUNTRY_CODE"];
						var labelVal=countryCode+"(+"+key+")";
						Logger.info("For "+key+" config is "+countryConfig.toString());
						countryCodeMap[countryCode]=key;
						allConfig[i] = { "label": labelVal, "value": key};
						i++;
					}
				}
			}
			return allConfig;
		},
		getPhoneFormatConfig: function(country){
			Logger.debug("getPhoneFormatConfig Input params:: country:: "+country);
			if(country==undefined){
				throw new Error("getPhoneFormatConfig Error:: country is blank");
			}
			var phoneConfig = phoneFormatConfig[country];
			if(phoneConfig == undefined){
				throw new Error("getPhoneFormatConfig Error:: Phone Format is not defined for the country");
			}
			return phoneConfig;
		},
		validateCountry: function(country){
			Logger.debug("validateCountry Input params:: country:: "+country);
			if(country==undefined){
				throw new Error("validateCountry Error:: country is blank");
			}
			country = country+"";
			var phoneConfig = phoneFormatConfig[country];
			if(phoneConfig == undefined){
				return false;
			}else{
				return true;
			}
		},
		getCurrentCountry: function(){
			Logger.info("$rootScope.currentCountry:: "+$rootScope.currentCountry);
			if(!$rootScope.currentCountry){
				$rootScope.currentCountry=$rootScope.mobileAppConfig.appConfigData.defaultCountryCode;
				/*$.get('http://ipinfo.io', function() {}, "jsonp").always(function(resp) {
					var countryCode = (resp && resp.country) ? resp.country : "";
					$rootScope.currentCountry = countryCode;
				});*/
			}
			
			if($rootScope.currentCountry){
				this.getAllCountriesConfig();
				var countryCode = countryCodeMap[$rootScope.currentCountry];
				if(countryCode == undefined){
					throw new Error("getCurrentCountry Error:: Cannot assign device country");
				}
				return countryCode;
			}
			
		}
	};
}]);