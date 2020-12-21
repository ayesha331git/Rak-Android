
var AppController = angular.module("AppController");
// This factory provides access to the underlying http service.
// It acts like a manager as well allowing the application
// to setup the http service
AppController.factory('HTTPConnector', ['HTTPConnectorImpl',
                               function(HTTPConnectorImpl) {
	// Handle to the actual http implementation instance
	
	// Default to an empty implementation so that we don't
	// hit TypeErrors or undefined errors in Javascript.
	// It is possible that bad coding practice led to a situation
	// where the init was not called appropriately.
	var httpInstance = HTTPConnectorImpl;
	
	// function definitions
	return {
		/**
		 * The init method which sets up the connectors for this factory
		 * @constructor
		 */
		init: function(httpImplInstance) {
			httpInstance = httpImplInstance;
		},
		
		/**
		 * The method that initializes connectivity to mbaas
		 * @constructor
		 */
		setupHTTPConnectivity: function() {
			// delegate to the underlying implementation
			return httpInstance.setupHTTPConnectivity();
		},
		
		/**
		 * The method that invokes a service on http service
		 * @constructor
		 */
		invokeService: function(request) {
			// delegate to the underlying implementation
			return httpInstance.invokeService(request);
		},

		/**
		 * The method that disconnects from http service
		 * @constructor
		 */
		disconnect: function() {
			// delegate to the underlying implementation
			return httpInstance.disconnect();
		}
	};
}]);