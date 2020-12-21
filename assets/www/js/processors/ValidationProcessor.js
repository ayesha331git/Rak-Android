AppController.factory('ValidationProcessor', ['$http', '$q','Logger',
                               function($http, $q, Logger) {
	// variables that will be used across this service
	var validationConfig = {};
	
	// function definitions
	return {
		
		// The init method which initializes processing of all validation configurations
		init: function() {
			
			// Note that we will have to return a promise because the caller
			// is waiting on us to complete some functionality
			var deferred = $q.defer();
			// Let us read the file now. 
			//This contains the validations that have to be run for each field.
		    $http.get('navigation/validationsConfig.json').success(function(data) {
		    	// The only thing to do is to process the validationsconfig file
		    	validationConfig = data;
		    	Logger.debug("Finished processing validations configuration");
		    	deferred.resolve(data);
		    }).error(function(msg, code) {
		    	deferred.reject(msg);
		    });
		    
		    // Let us return the promise now
		    return deferred.promise;
		},
		getValidationsForField : function(field){
			//Logger.fatal("getValidationsForField json: " + JSON.stringify(validationConfig));	
			return validationConfig[field];
		}
	};
}]);