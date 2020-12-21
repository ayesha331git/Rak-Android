AppController.factory('rakPostLoginIntermidiateScreen', ['StepupAuthenticateProcessor', '$q','$rootScope','Logger',
                                                      function(StepupAuthenticateProcessor, $q, $rootScope, Logger) {
	
	function rakPostLoginIntermidiateScreen(options){
		//Basic initialization if any.
	}
	rakPostLoginIntermidiateScreen.prototype = Object.create(StepupAuthenticateProcessor.constructor.prototype);
	rakPostLoginIntermidiateScreen.prototype.constructor = rakPostLoginIntermidiateScreen;
	
	/*
	 * Standard framework extensions.
	 * Follow the signature below for other authenticators.
	 */
	rakPostLoginIntermidiateScreen.prototype.init = function(){
		//Initialize a model for the processing support in the HTMLs
		$rootScope.stepupAuthentication.SET_SEAMLESS_LOGIN = {
				"rakSeamLessLogin":[]
		};
		StepupAuthenticateProcessor.template.SET_SEAMLESS_LOGIN = {
				"successPage":{
					"subFeature": "rakPostLoginIntermidiateScreen",
					"pageName": "RakSeamLessLoginPage"
				}
			};
	}
	return new rakPostLoginIntermidiateScreen();
}]);