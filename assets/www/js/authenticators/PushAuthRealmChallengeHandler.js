//This authenticator is invoked when the RootAuthenticator adapter is invoked. 
var pushAuthRealmChallengeHandler;
if(typeof WL === 'undefined')
	pushAuthRealmChallengeHandler = {};
else
	pushAuthRealmChallengeHandler = WL.Client.createChallengeHandler("PushNotificationAuthRealm");

pushAuthRealmChallengeHandler.isCustomResponse = function(response) {
	WL.logger.info("Challenge recieved: isCustomResponse : " + JSON.stringify(response));
	return true;
//    if (!response || !response.responseJSON) {
//        return false;
//    }
//    
//    if (response.responseJSON.authStatus) //authStatus is set by the Java native custom login module
//    	return true;
//    else 
//    	return false;
};

pushAuthRealmChallengeHandler.handleChallenge = function(response){
	WL.logger.info("Challenge recieved: handleChallenge : " + JSON.stringify(response));
	var authStatus = response.responseJSON.authStatus;
	var authMode = response.responseJSON.authMode;
	pushAuthRealmChallengeHandler.submitSuccess();
//	if (authStatus == "required"){
////		authMode == "userformauth" ?authRealmForm.init() : authRealmMPin.init();
//	} else if (authStatus == "complete"){
////		authMode == "userformauth" ?authRealmForm.onChallengeSuccess() : authRealmMPin.onChallengeSuccess();
//		pushAuthRealmChallengeHandler.submitSuccess();
//	}
};

pushAuthRealmChallengeHandler.submitLoginFormCallback = function(response) {
	WL.logger.info("Challenge recieved: submitLoginFormCallback : " + JSON.stringify(response));
    var isLoginFormResponse = pushAuthRealmChallengeHandler.isCustomResponse(response);
    pushAuthRealmChallengeHandler.handleChallenge(response); //Challenge is received from MBaaS
//    if (isLoginFormResponse){
//    	
//    }
};

//$(document).on('click','#loginButton', function () {
//	var data = authRealmForm.respondToChallenge();
//    pushAuthRealmChallengeHandler.submitLoginForm(data.reqURL, data.options, pushAuthRealmChallengeHandler.submitLoginFormCallback);
//});

$(document).on('click','#cancelButton',function () {
	//If there is a cancel button in the screen, on user tap, execute actions below.
	pushAuthRealmChallengeHandler.submitFailure();
});

//$(document).on('click','#mpinLoginButton', function () {
//	var data = authRealmMPin.respondToChallenge();
//    pushAuthRealmChallengeHandler.submitLoginForm(data.reqURL, data.options, pushAuthRealmChallengeHandler.submitLoginFormCallback);
//});

$(document).on('click','#cancelButton',function () {
	//If there is a cancel button in the screen, on user tap, execute actions below.
	pushAuthRealmChallengeHandler.submitFailure();
});


