AppController.factory('MenuProfileConfigProcessor', ['$http', '$q','Logger',
                               function($http, $q, Logger) {
	/**
	 * variables that will be used across this service
	 */ 
	var menuProfileConfig = {};
	
	return {
		
		/**
		 * The init method which initializes processing of all externl menuProfile configurations
		 * @constructor
		 * @return {object} Return all menus from JSON file
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
		    $http.get('navigation/menuProfileConfig.json').success(function(data) {
		    	/**
				 * The only thing to do is to process the menuProfile config file
				 */
		    	menuProfileConfig = data;
		    	Logger.debug("Finished processing menuProfile configuration");
		    	deferred.resolve(data);
		    }).error(function(msg, code) {
		    	deferred.reject(msg);
		    });
		    
		    /** 
		     * Let us return the promise now
		     */
		    return deferred.promise;
		}
	};
}]);