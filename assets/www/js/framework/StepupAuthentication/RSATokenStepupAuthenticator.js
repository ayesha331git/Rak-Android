AppController.factory('RSATokenStepupAuthenticator', ['StepupAuthenticateProcessor', '$q','$rootScope','Logger',
                                                      function(StepupAuthenticateProcessor, $q, $rootScope, Logger) {
	
	function RSATokenStepupAuthenticator(options){
		//Basic initialization if any.
	}
	RSATokenStepupAuthenticator.prototype = Object.create(StepupAuthenticateProcessor.constructor.prototype);
	RSATokenStepupAuthenticator.prototype.constructor = RSATokenStepupAuthenticator;
	
	/*
	 * Standard framework extensions.
	 * Follow the signature below for other authenticators.
	 */
	RSATokenStepupAuthenticator.prototype.init = function(){
		StepupAuthenticateProcessor.template.RSA_SECURE_ID = {
				"successPage":{
					"subFeature": "StepupAuth",
					"pageName": "StepupAuthenticateRSATokenPage"
				}
			};
	}
	return new RSATokenStepupAuthenticator();
}]);