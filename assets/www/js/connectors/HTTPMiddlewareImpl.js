var CAMPAIGN_SERVER = {host:"localhost", port: 8080};
/**
 * 
 */

//An implementation of HTTPConnectorImpl
// A generic http connector
AppController.factory('HTTPMiddlewareImpl', ['HTTPConnectorImpl', '$q','$http','Logger',
                               function(HTTPConnectorImpl, $q, $http,Logger) {
	// Let us extend the parent first
	angular.extend(this, HTTPConnectorImpl);
	// And now, let us implement the functions
	return {

		/**
		 * The method that initializes connectivity to HTTP Service
		 * @constructor
		 * @return a promise
		 */
		setupHTTPConnectivity: function() {
			var deferred = $q.defer();
			var request = {}; 
			request.method = 'GET'; 
			request.service = CAMPAIGN_SERVER;
//			request.headers = {};  default headers
//			request.data = {}; 
			this.invokeService(request).then(function(success){
				Logger.info('Campaign server ping: ' + JSON.stringify(success));
			},function(err){
				Logger.info('Campaign server ping error: ' + JSON.stringify(err));
			});
			return deferred.promise;
		},
		
		/**
		 * The method that invokes a service on HTTP Service
		 * @constructor
		 * @return a promise
		 */
		invokeService: function(request) {
			// Invoke the service.
			// Service details are available in the request json
			var deferred = $q.defer();
			$http({
				  method: request.method,
				  url: request.service.protocol+"://"+request.service.host+":"+request.service.port+request.service.apiEndpoint,
				  params:request.data
				}).then(function successCallback(response) {
				    // this callback will be called asynchronously
				    // when the response is available
					deferred.resolve(response);
				  }, function errorCallback(response) {
				    // called asynchronously if an error occurs
				    // or server returns response with an error status.
					  deferred.reject(response);  
				  });
			
			// return the promise
			return deferred.promise;
		},
		
		/**
		 * The method that disconnects from mbaas
		 * @constructor
		 * @return a promise
		 */
		disconnectMbaas: function() {
			// Nothing to do for now
		}
	};
}]);