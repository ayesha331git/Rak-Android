
/* JavaScript content from js/processors/QRCodeModelConfigProcessor.js in folder common */

/* JavaScript content from js/processors/QRCodeModelConfigProcessor.js in folder common */
AppController.factory('QRCodeModelConfigProcessor', ['$http', '$q','Logger','$rootScope',
                               function($http, $q, Logger,$rootScope) {
	/**
	 * variables that will be used across this service
	 */ 
	var QRScanConfig = {};
	
	
	return {
		
		/**
		 * The init method which initializes processing of all currency configurations
		 * @constructor
		 * @return {object} Return all currencies from JSON file
		 */ 
		init: function() {
			Logger.debug("Initiliazing scan code model configuration");
			/**
			 * Note that we will have to return a promise because the caller
			 * is waiting on us to complete some functionality
			 */ 
			var deferred = $q.defer();
			/**
			 * Let us read the file now.
			 */
		    $http.get('js/utils/QRCodeMappingConfig.json').success(function(data) {
		    	
		    	QRScanConfig = data;
		    	
		    	deferred.resolve(data);
		    }).error(function(msg, code) {
		    	
		    	deferred.reject(msg);
		    });
		    
		    /** 
		     * Let us return the promise now
		     */
		    return deferred.promise;
		},
		QRScannedPopulateModel: function(QRCodeScanJson){
			
			var Configproperties = {};
			var Scanproperties = {};
			
			
			
			var ScanPageKey = Object.keys(QRCodeScanJson)[0];
			
			Configproperties = QRScanConfig[ScanPageKey.toString()];
			
			Scanproperties = QRCodeScanJson[ScanPageKey.toString()];
			
			for(var properties in Configproperties)
			{
				
				//Configproperties[properties]=Scanproperties[properties];			
				
				eval(Configproperties[properties]+"= Scanproperties[properties];");				
							
				//alert($rootScope.moveMoney.billPayment.billerDataFromQRCode.billerName);
			
			}
			
			
		}
		
	};
}]);