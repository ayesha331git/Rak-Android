AppController.factory('TermsConditionsStepupAuthenticator', ['StepupAuthenticateProcessor', '$q','$rootScope','Logger',
                                                      function(StepupAuthenticateProcessor, $q, $rootScope, Logger) {
	
	function TermsConditionsStepupAuthenticator(options){
		//Basic initialization if any.
	}
	TermsConditionsStepupAuthenticator.prototype = Object.create(StepupAuthenticateProcessor.constructor.prototype);
	TermsConditionsStepupAuthenticator.prototype.constructor = TermsConditionsStepupAuthenticator;
	
	
	
	
	/*
	 * Standard framework extensions.
	 * Follow the signature below for other authenticators.
	 */
	TermsConditionsStepupAuthenticator.prototype.init = function(){
		// Initializing a model for the terms & conditions factory.
		$rootScope.stepupAuthentication.TERMS_AND_CONDITIONS = {
				setTermsConditionsHTMLContent:function(){
					$("#termsConditions").html($rootScope.stepupAuthentication.response.actionDetails[0].params.TermsAndConditionsContent);
					//$rootScope.stepupAuthentication.response.actionDetails[0].UserTypeValue;
				}
		};
		StepupAuthenticateProcessor.template.TERMS_AND_CONDITIONS = {
				"successPage":{
					"subFeature": "StepupAuth",
					"pageName": "StepupAuthenticateTermsAndConditionsPage"
				}
			};
	}
	return new TermsConditionsStepupAuthenticator();
}]);