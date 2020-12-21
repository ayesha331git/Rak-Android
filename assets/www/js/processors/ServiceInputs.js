/**
 * @ngdoc Services
 * @name ServiceInputs
 * @description
 *   Implementation of {@link ServiceInputs}
 */

/**
 * Service Inputs module to have object/data collection based on event names rather than adding additional
 * layer of configuration.
 *
 * Arguments:
 * arguments & callback is optional in almost all the events below, only used when there is need
 * for asynchronous input collection sequence in place.
 */

var serviceInputs = {
		"MainController":function(args,callback){
			return {'input':'Main controller inputs'};
		},
		"ActionController":function(args,callback){
			return {'input':'action controller inputs'};
		},
		"UserAccountsService":function(args,callback){
			return {'input':'user accounts service'};
		},
		"RootAuthenticator":function(args,callback){
			return {'input':'rootAuth'};
		},
		"MBDemoController":function(args,callback){
			return  {
					LoginBtn:'Login',
					CancelPage:'HomePage.xml',
					USER_TYPE:'1',
					AUTHENTICATION_REQUEST:'true',
					helpPage:'Thin_SignOnRetRq',
					__JS_ENCRYPT_KEY__:'',
					JavaScriptEnabled:'N',
					deviceID:'',
					machineFingerPrint:'',
					deviceType:'',
					browserType:'',
					mbparam:'',
					unique:'disabled',
					imc_service_page:'SignOnRetRq',
					Alignment:'LEFT',
					page:'SignOnRetRq',
					serviceType:'Dynamic',
					__AUTHENTICATE__:'1',
					CorpId:'',
					PassWord:''
			};
		},
		"AuthenticationService":function(args,callback){
			return {CorpId:'',
				PassWord:''};
		}
};

var challengeHandler = {
		"userformauth":function(args,callback){
			logger.info("User form auth invoked : ");
			var data = authRealmForm.respondToChallenge();
			logger.info("Challenge response is : "+ JSON.stringify(data));
		    formAuthRealmChallengeHandler.submitLoginForm(data.reqURL, data.options, formAuthRealmChallengeHandler.submitLoginFormCallback);
		    return;
		},
		"userpinauth":function(args,callback){
			var data = authRealmMPin.respondToChallenge();
			formAuthRealmChallengeHandler.submitLoginForm(data.reqURL, data.options, formAuthRealmChallengeHandler.submitLoginFormCallback);
			return;
		}
};

/*
 * The input for navigationInputs are events in the json file, however this can be evaluated
 */
var navigationInputs = {
		"onCapchaCheckEvent":function(args,callback){
			return {'input':'catcha event'};
		}
};

var InputProcessor = {
	init:function(){
		//service manager - init if required
	},
	getInputsForType:function(action,actionType){
		switch(actionType){
		case "service":
			//Service invocation
			return this.getServiceInputs(action);
//			break;
		case "challenge":
			//Challenge Invocation
			return this.getChallengeHandlerInputs(action);
//			break;
		case "challengeresponse":
			//Challenge Response Invocation
			return this.getChallengeResponseHandler(action);
//			break;
		case "navigation":
			//Navigation invocation
			return this.getNavigationInputs(action);
//			break;
			default:
				logger.fatal("This condition should never be printed ! ServiceInputs.js");
				break;
		}
	},
	getServiceInputs:function(serviceName){
		return serviceInputs[serviceName];
	},
	getChallengeHandlerInputs:function(challengeName){
//		AuthenticationEventHandler.invokeChallengeHandler(challengeName);
	},
	getChallengeResponseHandler:function(challengeName){
//		logger.fatal("getChallengeResponseHandler : " + challengeName);
//		AuthenticationEventHandler.invokeChallengeHandler(challengeName);
//		logger.fatal("*************getChallengeResponseHandler*************");
	},
	getNavigationInputs:function(navigationName){
		return navigationInputs[navigationName];
	}
};
