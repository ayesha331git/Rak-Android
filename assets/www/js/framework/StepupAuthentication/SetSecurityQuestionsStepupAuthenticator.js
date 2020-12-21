AppController.factory('SetSecurityQuestionsStepupAuthenticator', ['StepupAuthenticateProcessor', '$q','$rootScope','Logger',
                                                      function(StepupAuthenticateProcessor, $q, $rootScope, Logger) {
	
	function SetSecurityQuestionsStepupAuthenticator(options){
		//Basic initialization if any.
	}
	SetSecurityQuestionsStepupAuthenticator.prototype = Object.create(StepupAuthenticateProcessor.constructor.prototype);
	SetSecurityQuestionsStepupAuthenticator.prototype.constructor = SetSecurityQuestionsStepupAuthenticator;
	
	/*
	 * Standard framework extensions.
	 * Follow the signature below for other authenticators.
	 */
	SetSecurityQuestionsStepupAuthenticator.prototype.init = function(){
		//Initialize a model for the processing support in the HTMLs
		$rootScope.stepupAuthentication.SET_SECURITY_QUESTIONS = {
				"selectedQuestions":[]
		};
		StepupAuthenticateProcessor.template.SET_SECURITY_QUESTIONS = {
				"successPage":{
					"subFeature": "StepupAuth",
					"pageName": "StepupAuthenticateSetQuestionPage"
				}
			};
		StepupAuthenticateProcessor.template.SET_SECURITY_QUESTIONS_SUCCESS = {
				"successPage":{
					"subFeature": "StepupAuth",
					"pageName": "StepupAuthenticateSuccessPage"
				}
			};
	}
	return new SetSecurityQuestionsStepupAuthenticator();
}]);