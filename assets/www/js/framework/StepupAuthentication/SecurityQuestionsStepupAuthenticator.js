AppController.factory('SecurityQuestionsStepupAuthenticator', ['StepupAuthenticateProcessor', '$q','$rootScope','Logger',
                                                      function(StepupAuthenticateProcessor, $q, $rootScope, Logger) {
	
	function SecurityQuestionsStepupAuthenticator(options){
		//Basic initialization if any.
	}
	SecurityQuestionsStepupAuthenticator.prototype = Object.create(StepupAuthenticateProcessor.constructor.prototype);
	SecurityQuestionsStepupAuthenticator.prototype.constructor = SecurityQuestionsStepupAuthenticator;
	
	/*
	 * Standard framework extensions.
	 * Follow the signature below for other authenticators.
	 */
	SecurityQuestionsStepupAuthenticator.prototype.init = function(){
		$rootScope.stepupAuthentication.SECURITY_QUESTIONS = {
				"answer":""
		};
		StepupAuthenticateProcessor.template.SECURITY_QUESTIONS = {
				"successPage":{
					"subFeature": "StepupAuth",
					"pageName": "StepupAuthenticateQuestionPage"
				}
			};
	};
	return new SecurityQuestionsStepupAuthenticator();
}]);