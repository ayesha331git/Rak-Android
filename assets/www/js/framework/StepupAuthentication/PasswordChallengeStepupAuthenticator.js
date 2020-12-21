
/* JavaScript content from js/framework/StepupAuthentication/PasswordChallengeStepupAuthenticator.js in folder common */
AppController.factory('PasswordChallengeStepupAuthenticator', ['StepupAuthenticateProcessor', '$q','$rootScope','Logger',
                                                      function(StepupAuthenticateProcessor, $q, $rootScope, Logger) {
	
	function PasswordChallengeStepupAuthenticator(options){
		//Basic initialization if any.
	}
	PasswordChallengeStepupAuthenticator.prototype = Object.create(StepupAuthenticateProcessor.constructor.prototype);
	PasswordChallengeStepupAuthenticator.prototype.constructor = PasswordChallengeStepupAuthenticator;
	
	/*
	 * Standard framework extensions.
	 * Follow the signature below for other authenticators.
	 */
	PasswordChallengeStepupAuthenticator.prototype.init = function(){
		//Initialize model for PASSWORD_CHALLENGE
		$rootScope.stepupAuthentication.PASSWORD_CHALLENGE = {
				"strPasswordChallenge":""
		};
		
		StepupAuthenticateProcessor.template.PASSWORD_CHALLENGE = {
				"successPage":{
					"subFeature": "StepupAuth",
					"pageName": "StepupAuthenticatePasswordChallengePage"
				}
			};
	}
	return new PasswordChallengeStepupAuthenticator();
}]);