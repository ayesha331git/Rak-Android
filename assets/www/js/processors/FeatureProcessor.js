/**
 * @ngdoc Services
 * @name FeatureProcessor
 * @description
 *   Implementation of {@link FeatureProcessor}
 *   Restrict To:
 *     Element
 *
 * @param {object} http Put description for http
 * @param {object} q Put description for q
 * @param {object} location Put description for location
 */

AppController.factory('FeatureProcessor', ['$http', '$q', '$location','Logger',
                               function($http, $q, $location, Logger) {
	/**
	 * variables that will be used across this service
	 * Each feature is a group of subFeatures. What we really want to
	 * remember is the subFeatures and their workflows
	 */ 
	var allSubFeaturesList = [];
	
	return {
		
		/**
		 * The init method
		 */ 
		init: function() {
			
			/**
			 * Remember, we need to return a promise
			 */ 
			var deferred = $q.defer();
			
			/**
			 * Let us read the feature config file now. This is the FeatureProcessor
			 */
		    $http.get('navigation/featuresConfig.json').success(function(allFeaturesData) {
		    	
		    	/**
				 * Read each feature and its subFeatures
				 */
		    	var fileOpens = [];
		    	for (var feature in allFeaturesData) {
		    		var featureData = allFeaturesData[feature];
		    		var subFeatures = featureData.subFeatures;
		        			
		    		/**
		    		 * Now, iterate through each subfeature to read the workflow
		    		 */ 
		    		var subFeatureIndex = 0;
		    		for (subFeatureIndex = 0; subFeatureIndex < subFeatures.length; subFeatureIndex++) {
		    			
		    			var subFeature = subFeatures[subFeatureIndex];
		    			var workflowTemplateFile = subFeature.workflowTemplateFile;
		    			var thisFeatureJson = {};
//		    			thisFeatureJson["subFeatureName"] = subFeature.name;
		    			thisFeatureJson.subFeatureName = subFeature.name;
		    			
		    			/**
		    			 * Let us read the data file for each feature and save the promises returned by them
		    			 */
		    			
		    			Logger.debug("Processing workflow template file " + workflowTemplateFile);
		    			fileOpens.push($http.get(workflowTemplateFile));
		    		}
		    	}
		    	/**
		    	 * We have done issuing commands to read all the files
		    	 * Let us now wait for all operations to complete
		    	 */	
		    	$q.all(fileOpens).then(
    				function(payloads) {
    					/**
    					* all successfully read.
    					* Let us read all the features and save them in memory
    					*/
    					var index;
                           for (index = 0; index < payloads.length; index++) {
                               var payload = payloads[index];
                               var workflow = payload.data;
                               var subFeatureName = payload.data.subFeatureName;
                               var startPage = payload.data.startPage;
                               var thisFeatureJson = {};
//                               thisFeatureJson["workflow"] = workflow;
//                               thisFeatureJson["subFeatureName"] = subFeatureName;
//                               thisFeatureJson["startPage"] = startPage;
                               thisFeatureJson.workflow = workflow;
                               thisFeatureJson.subFeatureName = subFeatureName;
                               thisFeatureJson.startPage = startPage;
                               allSubFeaturesList.push(thisFeatureJson);
                           }

                           deferred.resolve();
    				},
		    		function(errorPayloads) {
    					/**
    					 * all error
    					 */ 
    					deferred.reject(errorPayloads);
		    		},
		    		function(updates) {
		    			deferred.update(updates);
		    		}
		    	); /** done reading all feature files */
		    }).error(function(msg, code) {
		    	/** Lets log an error here */
		    }); /** Done reading the features config file */
		    /** Let us return the promise now */
		    return deferred.promise;
		},
		/** The method which fetches the start page for a given feature */
		getStartPageForSubFeature: function(feature) {
			/** First, let us find the feature. */
			var index;
			for (index = 0; index < allSubFeaturesList.length; index++) {
				var featureJson = allSubFeaturesList[index];
				
				if (featureJson.subFeatureName == feature) {
					/** This is the one we were looking for. */
					return featureJson.startPage;
				}
			}
			/** If we are here, it means this subfeature does not exist. */
			return '';
		},
		/** The method that fetches the workflow for a given page */
		getWorkflowForSubFeature: function(subFeature) {
			/** First, let us find the feature. */
			var index;
			for (index = 0; index < allSubFeaturesList.length; index++) {
				var featureJson = allSubFeaturesList[index];
				
				if (featureJson.subFeatureName == subFeature) {
					/** This is the one we were looking for */
					return featureJson.workflow;
				}
			}
			/** If we are here, it means this subfeature does not exist */
			return '';
		}
	};
}]);