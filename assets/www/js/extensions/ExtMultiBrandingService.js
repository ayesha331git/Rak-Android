AppController.factory('ExtMultiBrandingService', ['$http', '$rootScope','BrandConfigProcessor','Logger',
                                          function($http, $rootScope,BrandConfigProcessor,Logger) {
var ExtMultiBrandingService = Object.create(BrandConfigProcessor);

// uncomment to override "getKeyForBranding"

/*ExtMultiBrandingService.getKeyForBranding = function(responseList) {
				Logger.info('override  getKeyForBranding called');
				var currDate = new Date();
				var hours = currDate.getHours();
				var CSSKey = "";
				if(hours>15){
					CSSKey = "DARKTHEME";
				}else{
					CSSKey = responseList.UserAppPrefrences.Formatting.otherAppParameters.segment;
				}
				return "";
			}*/
			return ExtMultiBrandingService;
		} ]);