AppController.factory('ServerConfigProcessor', ['$http', '$q','Logger',
                               function($http, $q, Logger) {
	/** 
	 * variables that will be used across this service
	 */
	var serverConfig = {};
	
	return {
		
		/** 
		 * The init method which initializes processing of all externl server configurations
		 */
		init: function() {
			
			/** 
			 * Note that we will have to return a promise because the caller
			 * is waiting on us to complete some functionality
			 */
			
			var deferred = $q.defer();
			/** 
			 * Let us read the file now.
			 */
		    $http.get('navigation/externalServersConfig.json').success(function(data) {
		    	/** 
				 * The only thing to do is to process the server config file
				 */
		    	serverConfig = data;
		    	Logger.debug("Finished processing Server configuration");
		    	deferred.resolve(data);
		    }).error(function(msg, code) {
		    	deferred.reject(msg);
		    });
		    /** 
			 * Let us return the promise now
			 */
		    return deferred.promise;
		},
		/**
		 * Return all server configuration details
		 * @constructor
		 * @return {object} Return all server configuration details
		 */
		getAllServerConfig : function(){
			Logger.fatal("getServerConfigForField json: " + JSON.stringify(serverConfig));	
			return serverConfig;
		},
		/**
		 * Return  server configuration details for a particular field
		 * @constructor
		 * @param {object} filed A particular key name
		 * @return {object} Return  server configuration details for a particular field
		 */
		getServerConfigForServiceName : function(field){
			Logger.fatal("getServerConfigForField json: " + JSON.stringify(serverConfig));	
			return serverConfig[field];
		}
	};
}]);