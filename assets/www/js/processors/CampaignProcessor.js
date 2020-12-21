AppController.factory('CampaignProcessor', ['$http', '$q','$rootScope','Logger',
                               function($http, $q, $rootScope, Logger) {
	/**
	 * variables that will be used across this service
	 */ 
	var campaign = {};
	
	return {
		/**
		 * The init method which initializes processing of all external server configurations
		 */ 
		init: function(campaignResponse) {
			
			if(typeof campaignResponse.data.advertisements == "undefined"){
				Logger.info('Campaign Response data invalid');
				$rootScope.showCampaignFlag=false;
				return;
			}
			var responseData=campaignResponse.data.advertisements[0];
			Logger.info('Campaign Processed : '+ JSON.stringify(campaignResponse));
			/**
			 * For popup 
			 */
			if(responseData.showtimePreferences.impressionDisplayType=='POPUP'){
				$rootScope.showCampaignOverlay("");
				$('.popup-campaign:first').html(responseData.showtimePreferences.impressionContent.payLoad.content);
				return;
			}
			/**
			 * For advertisement type 
			 */
			if(responseData.showtimePreferences.impressionDisplayType=='INLINE'){
				$rootScope.showCampaignFlag=true;
				$('#campaignContainer').html(responseData.showtimePreferences.impressionContent.payLoad.content);
			}
		}
	};
}]);