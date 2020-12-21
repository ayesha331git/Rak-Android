var AppController = angular.module("AppController");
//An interface that defines methods for http service implementation classes
//Each implementation of this interface will represent the http service
AppController.factory('HTTPConnectorImpl', ['$q',
                               function($q) {
	// Handle to the actual http service implementation instance
	var httpInstance = null;
	
	// function definitions
	// Note that all methods are expected to return a promise
	return {
		
		/**
		 * The method that initializes connectivity to http service
		 * @constructor
		 * @return a promise
		 */
		setupHTTPConnectivity: function() {
			// Nothing to do. Leave it to the child
		},
		
		/**
		 * The method that invokes a service on http service
		 * @constructor
		 * @return a promise
		 */
		invokeService: function(request) {
			// Nothing to do. Leave it to the child
		},
		
		/**
		 * The method that disconnects from http service
		 * @constructor
		 * @return a promise
		 */
		disconnect: function() {
			// Nothing to do. Leave it to the child
		}
	};
}]);