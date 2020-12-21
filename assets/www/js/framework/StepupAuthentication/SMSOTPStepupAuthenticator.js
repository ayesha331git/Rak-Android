AppController.factory('SMSOTPStepupAuthenticator', ['StepupAuthenticateProcessor', '$q','$rootScope','Logger',
                                                      function(StepupAuthenticateProcessor, $q, $rootScope, Logger) {
	
	function SMSOTPStepupAuthenticator(options){
		//Basic initialization if any.
	}
	SMSOTPStepupAuthenticator.prototype = Object.create(StepupAuthenticateProcessor.constructor.prototype);
	SMSOTPStepupAuthenticator.prototype.constructor = SMSOTPStepupAuthenticator;
	
	/*
	 * Standard framework extensions.
	 * Follow the signature below for other authenticators.
	 */
	SMSOTPStepupAuthenticator.prototype.init = function(){
		//Initialize model for SMS_OTP
		$rootScope.stepupAuthentication.SMS_OTP = {
				"smsOTP":""
		};
		
		StepupAuthenticateProcessor.template.SMS_OTP = {
				"successPage":{
					"subFeature": "StepupAuth",
					"pageName": "StepupAuthenticateOTPPage"
				}
			};
	}
	return new SMSOTPStepupAuthenticator();
}]);