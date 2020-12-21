
/* JavaScript content from js/cordova/CordovaLoggerImpl.js in folder common */
var AppController = angular.module("AppController");
// An implementation of LoggerImpl for worklight
// Contains only methods specific to worklight (mobile first platform)
AppController.factory('FMBLoggerImpl', ['LoggerImpl',
                               function(LoggerImpl) {
	// Let us extend the parent first
	angular.extend(this, LoggerImpl);
	// And now, let us implement the functions
	return {
		// The method that logs the message at info level
		info: function(message) {
			console.log(message);
		},
		// The method that logs the message at debug level
		debug: function(message) {
			console.log(message);
		},
		// The method that logs the message at fatal level
		fatal: function(message) {
			console.log(message);
		}
	};
	
}]);