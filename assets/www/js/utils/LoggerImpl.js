var AppController = angular.module("AppController");
// An interface that defines methods for logging implementation classes
// Each implementation of this interface will represent the logger functions
// specific to a platform
AppController.factory('LoggerImpl', [
                               function() {
	
	// function definitions
	return {
		/**
	  	 * The method that logs the message at info level
	  	 * @constructor
	  	 */
		info: function(message) {
			// Nothing to do. Leave it to the child
		},
		
		/**
	  	 * The method that logs the message at debug level
	  	 * @constructor
	  	 */
		debug: function(message) {
			// Nothing to do. Leave it to the child
		},
		
		/**
	  	 * The method that logs the message at fatal level
	  	 * @constructor
	  	 */
		fatal: function(message) {
			// Nothing to do. Leave it to the child
		}
	};
}]);