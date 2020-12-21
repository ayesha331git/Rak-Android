/**
 * @ngdoc Services
 * @name TemplateProcessor
 * @description
 *   Implementation of {@link TemplateProcessor}
 *
 *   Restrict To:
 *     Element
 *
 * @param {object} http Put description for http
 * @param {object} q Put description for q
 * @param {object} FeatureProcessor Put description for feature processor
 * @param {object} PageProcessor Put description for page processor
 */

var AppController = angular.module("AppController");
AppController.factory('TemplateProcessor', ['$http', '$q','FeatureProcessor', 'PageProcessor', 'ValidationProcessor', 'LocaleProcessor','ServerConfigProcessor','$rootScope','Logger',
                               function($http, $q, FeatureProcessor, PageProcessor, ValidationProcessor, LocaleProcessor,ServerConfigProcessor,$rootScope, Logger) {
	/**
	 * variables that will be used across this service
	 */ 
	var appConfig = {};
	
	/**
	 * function definitions
	 */ 
	return {
		/**
		* The init method which initializes processing of all configurations and templates. 
		* This function uses FeatureProcessor to process templates.
		*/
		init: function() {
			
//			if(WL.Client.getEnvironment() != WL.Environment.MOBILE_WEB ){
//				cordova.exec(function (date) {
//					$rootScope.dateFormat = date.pattern;
//				},
//	            function () {}, "Globalization", "getDatePattern", [{"options": {selector:'date'}}]);
//				
//				cordova.exec(function (currency) {
//					$rootScope.currencyFormat = currency.pattern;
//				},
//	            function () {}, "Globalization", "getCurrencyPattern", [{"currencyCode": "EUR"}]);
//				
//			}
			
			/** 
			 * Note that we will have to return a promise because the caller
			 * is waiting on us to complete some functionality
			 */
			var deferred = $q.defer();
			/**  Let us read the file now. This is the TemplateProcessor */
		    $http.get('mobileAppConfig.json').success(function(data) {
		    	/**  The first thing is to process the appconfig and do any initialization that is required. */
		    	
		    	if($rootScope.devMode)
		    		{
		    		
		    		if(window.localStorage.getItem("buildType")!=undefined && window.localStorage.getItem("buildType")!="" && window.localStorage.getItem("buildType")==="PWD")
					{
					data.appConfigParams[0].BUILD_TYPE="PWD";
					data.appConfigParams[1].BUILDTYPE="PWD";
					}
				    else if(window.localStorage.getItem("buildType")!=undefined && window.localStorage.getItem("buildType")!="" && window.localStorage.getItem("buildType")==="MPIN")
					{
					data.appConfigParams[0].BUILD_TYPE="OTP";
					data.appConfigParams[1].BUILDTYPE="MPIN";
					}
					
		           }
		    	
		    	
		    	
		    	
		    	appConfig = data;
		    	$rootScope.appVersionDetails = data;
		    	$rootScope.mobileAppConfig.loadMobileAppConfigData(data);
		    	//$rootScope.buildType=$rootScope.mobileAppConfig.appConfigData.appConfigParams[0]["BUILD_TYPE"];
		    	
		    	 /** The next step is to initialize the template processing logic */
		    	FeatureProcessor.init().then(function(featuresData) {
		    		/** If we are here everything was successful */
		    		Logger.debug("Feature processing from templates completed successfully");
		    		/** Let us initialize the page processing logic as well */
			    	PageProcessor.init().then(function(pageData) {
			    		/** If we are here everything was successful */
			    		Logger.debug("Processed pages configuration successfully");
			    		/**Lets initialize the validation processor now; */
			    		ValidationProcessor.init().then(function(validationData){
			    			Logger.debug("Validation config loaded successfully");
			    			ServerConfigProcessor.init().then(function(serverConfig) {
			    				Logger.debug("External server configuration processed successfully");
			    				deferred.resolve(serverConfig);
			    			}, function(errorServerConfigData) {
			    				Logger.debug("Error processing external server configs");
			    				deffered.resolve(errorServerConfigData);
			    			});
			    			
			    		}, function(errorValidationData){
			    			Logger.fatal("Error in loading validations config");
			    			deferred.reject(errorValidationData);
			    		});
			    		
			    	}, function(errorPageData) {
			    		Logger.fatal("Error processing pages configuration at :"+ JSON.stringify(errorPageData));
			    		deferred.reject(errorPageData);
			    	});
		    		
		    	}, function(errorFeaturesData) {
		    		/** Lets log an error and notify the caller */
		    		Logger.fatal("Error processing all template features at "+ JSON.stringify(errorFeaturesData));
		    		deferred.reject(errorFeaturesData);
		    	});
		    }).error(function(msg, code) {
		    	deferred.reject(msg);
		    });
		    
		    /** Let us return the promise now */
		    return deferred.promise;
		},
		/** The method which identifies the feature which should start the app */
		getFeatureStart: function() {
			var featureStart = appConfig.subFeatureStart;
			return featureStart;
		},
		/** The method which fetches the start page for a given feature */
		getStartPageForSubFeature: function(subFeature) {
			/** This is something that is controlled by FeatureProcessor and  PageProcessor. */
			/** Let us delegate */
			var pageName = FeatureProcessor.getStartPageForSubFeature(subFeature);
			return pageName;
		},
		/** The method which fetches the url for a given page */
		getUrlForPage: function(page) {
			/** This is something that is controlled by PageProcessor. */
			/** Let us delegate */
			return PageProcessor.getLocationUrlForPage(page);
		},
		getHelpPageTemplate: function(page) {
			/** This is something that is controlled by PageProcessor. */
			/** Let us delegate */
			return PageProcessor.getHelpPageTemplate(page);
		},
		/** The method which fetches the url for a given page */
		getWorkflowForSubFeature: function(subFeature) {
			/**
			 * This is something that is controlled by FeatureProcessor.
			 * Let us delegate
			 */
			return FeatureProcessor.getWorkflowForSubFeature(subFeature);
		},
		/**
		 * Set localized literals 
		 * @constructor
		 * @param language {string} Pass language name
		 */
		setLocalizedLiteralsForLanguage:function(language){
			language = 'ar';
			LocaleProcessor.setLocaleForLanguage(language).then(function(localeData) {
				Logger.debug("Locale configuration processed successfully");
				deferred.resolve(localeData);
			}, function(errorLocaleData) {
				Logger.debug("Error processing locale configs");
				deffered.resolve(errorLocaleData);
			});
		},
		/**
		 * The method which fetches the localized strings data.
		 */
		getLocalizedLiterals: function() {
			return LocaleProcessor.getLocalizedLiterals();
		},
		/**
		 * The method which fetches the localized strings data.
		 */
		setLocalizedLiteralsForLocale: function(locale) {
			return LocaleProcessor.setLocaleForUser(locale);
		},
		/**
		 * The method which fetches the server config data.
		 * @constructor
		 * @return {object} Fetches the server config data.
		 */
		getServerConfigForServiceName: function(service) {
			return ServerConfigProcessor.getServerConfigForServiceName(service);
		},
		/**
		 * This will return all server configuration details.
		 * @constructor
		 * @return {object} Return all server configuration details
		 */
		getAllServerConfig: function(){
			return ServerConfigProcessor.getAllServerConfig();
		}
	};
}]);