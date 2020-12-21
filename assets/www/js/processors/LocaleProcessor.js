AppController.factory('LocaleProcessor', ['$http', '$q','Logger','$rootScope','$window','MBaaS',
                               function($http, $q, Logger,$rootScope,$window,MBaaS) {
	/** variables that will be used across this service */
	var thisUserLocale = ''; // Contains the current locale setting for the user
	var literals = {}; var localeDirection = '';

	return {
		/**
		 * The init method which initializes processing of locales
		 * param: Expects the mobile app configuration as an input as
		 * localte settings are part of mobile app settings
		 */

		init: function(mobileAppConfig) {
			/**
			 * Note that we will have to return a promise because the caller
			 * is waiting on us to complete some functionality
			 */

			var deferred = $q.defer();
			var selectedLocale = JSON.parse($window.localStorage.getItem("MBLocale"));
				if (!selectedLocale)
					selectedLocale= mobileAppConfig.defaultLocale;


			this.setLocaleForUser(selectedLocale).then(function(localeData) {
				Logger.debug("Read the locale successfully");
				deferred.resolve(localeData);
			}, function(errorLocaleData) {
				Logger.fatal("Error processing locale configs");
				deffered.resolve(errorLocaleData);
			});

			//if(WL.Client.getEnvironment() == WL.Environment.ANDROID){
			if(MBaaS.isAndroidEnv()){
			  this.getStubdata();
			}
		    /** Let us return the promise now */
		    return deferred.promise;
		},
		setLocaleForLanguage:function(language){
			/** to be implemented */
		},
		/** The method which sets the locale for this user */
		setLocaleForUser: function(locale) {
			/** Note that we will have to return a promise because the caller
			* is waiting on us to complete some functionality
			*/
			var deferred = $q.defer();
			var localeFilePath = '';
			/**
			* Let us now process the locale
			* Remember the locale we are setting to
			*/
			thisUserLocale = locale.locale;
			$rootScope.MBLocale= thisUserLocale;
			localeDirection = locale.isRTL ? "rtl":"ltr";
			$rootScope.direction = locale.isRTL;
			$rootScope.appLiteralDirection=localeDirection;
				var applitO = $rootScope.applit;
				if(applitO != undefined || applitO != null){
					$rootScope.appLiterals=applitO;
					literals = applitO;
					deferred.resolve(literals);
				} else {
					// Let us now process the locale
					// Remember the locale we are setting to

					//localeFilePath = 'http://172.21.214.202:8088/LiteralsJSON/Literals_' + thisUserLocale + '.json';
					localeFilePath = 'locale/Literals_' + thisUserLocale + '.json';
					// Let us read the locale file now
		    $http.get(localeFilePath).success(function(fileData) {
		    	/** The only thing to do is to load the contents of the literal file */
		    	$rootScope.appLiterals=fileData;
		    	literals = fileData;
		    	Logger.debug("Successfully set the locale to " + JSON.stringify(locale));
		    	/** Setting css based on locale */

		    	$rootScope.localeCSS=locale.css;
		    	deferred.resolve(fileData);
		    }).error(function(msg, code) {
		    	deferred.reject(msg);
		    });
			}
		    /** Let us return the promise now */
		    return deferred.promise;
		},
		 getStubdata:function(){


	        		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
				    	 fileSystem.root.getFile("Stubdata.json", null, function (fileEntry){
				    		 fileEntry.file(function(fileData){
				    			 var reader = new FileReader();
				                  reader.onloadend = function (evt) {
									  console.log('--evt--', evt);
				                    if (typeof(evt.target.result) !== undefined || evt.target.result !== null) {
				                    	Logger.info('Loading Stub data from SD Card');
				                        var objLit = JSON.parse(evt.target.result);
				                        $rootScope.stubdata = objLit;
				                    } else if (typeof(evt.target.error) !== undefined || evt.target.error !== null) {
				                    	console.log(evt.target.error);
				                    } else {
				                    	console.log('READER_ONLOADEND_ERR');
				                    }
				                  };

				                  reader.readAsText(fileData);

				    		 },function (err) {
				    			 console.log(err.code);
						      });

					    	 },function (err) {
					    		 console.log(err.code);
					         });
					    }, function (err) {
					    	console.log(err.code);
				        });


			},
		/** The method which fetches the current literals data */
		/**
		 * Return all literals from JSON file
		 * @constructor
		 * @return {object} Return all literals
		 */
		getLocalizedLiterals: function() {
			return {"literals":literals, "direction":localeDirection};
		}
	};
}]);
