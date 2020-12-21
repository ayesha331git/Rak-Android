
AppController.factory('Logger', ['LoggerImpl',
                               function(LoggerImpl) {
	// Handle to the actual logger implementation instance.
	
	// It is highly possible that the constructor init was not
	// called due to bad coding practice. In order to handle such
	// a case, we either check for nulls in each method, or we initialize
	// the default instance to a logger that does not print anything.
	// In this case, we choose the latter
	// Making this global as it needs to be accessed across the application
	logger = LoggerImpl; 
	
	// function definitions
	return {
		
		/**
	  	 * The init method which sets up the logger for this factory
	  	 * @constructor
	  	 */
		init: function(loggerImplInstance) {
			logger = loggerImplInstance;
		},
		/**
	  	 * The method that logs the message at info level
	  	 * @constructor
	  	 */
		info: function(message) {
			//logger.info(message);
		},
		
		/**
	  	 * The method that logs the message at debug level
	  	 * @constructor
	  	 */
		debug: function(message) {
			//logger.debug(message);
		},
		/**
	  	 * The method that logs the message at fatal level
	  	 * @constructor
	  	 */
		fatal: function(message) {
			//logger.fatal(message);
		}
	};
}]);