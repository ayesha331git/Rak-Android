/*
*
    COPYRIGHT LICENSE: This information contains sample code provided in source code form. You may copy, modify, and distribute
    these sample programs in any form without payment to IBM® for the purposes of developing, using, marketing or distributing
    application programs conforming to the application programming interface for the operating platform for which the sample code is written.
    Notwithstanding anything to the contrary, IBM PROVIDES THE SAMPLE SOURCE CODE ON AN "AS IS" BASIS AND IBM DISCLAIMS ALL WARRANTIES,
    EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, ANY IMPLIED WARRANTIES OR CONDITIONS OF MERCHANTABILITY, SATISFACTORY QUALITY,
    FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND ANY WARRANTY OR CONDITION OF NON-INFRINGEMENT. IBM SHALL NOT BE LIABLE FOR ANY DIRECT,
    INDIRECT, INCIDENTAL, SPECIAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE USE OR OPERATION OF THE SAMPLE SOURCE CODE.
    IBM HAS NO OBLIGATION TO PROVIDE MAINTENANCE, SUPPORT, UPDATES, ENHANCEMENTS OR MODIFICATIONS TO THE SAMPLE SOURCE CODE.

*/

//This authenticator is invoked when the RootAuthenticator adapter is invoked. 
var formAuthRealmChallengeHandler;
if(typeof WL === 'undefined')
	formAuthRealmChallengeHandler = {};
else
	formAuthRealmChallengeHandler = WL.Client.createChallengeHandler("FinacleFormAuthRealm");

formAuthRealmChallengeHandler.isCustomResponse = function(response) {
    if (!response || !response.responseJSON) {
        return false;
    }
    
    if (response.responseJSON.authStatus) //authStatus is set by the Java native custom login module
    	return true;
    else 
    	return false;
};

formAuthRealmChallengeHandler.handleChallenge = function(response){
	var authStatus = response.responseJSON.authStatus;
	var authMode = response.responseJSON.authMode;
	logger.info("Challenge recieved : " + JSON.stringify(response.responseJSON));
	if (authStatus == "required"){
		if(authMode == "userformauth") 
				authRealmForm.init(); 
		else 
				authRealmMPin.init();
	} else if (authStatus == "complete"){
		if( authMode == "userformauth" )
			authRealmForm.onChallengeSuccess(); 
		else
			authRealmMPin.onChallengeSuccess();
		
		formAuthRealmChallengeHandler.submitSuccess();
	}
};

formAuthRealmChallengeHandler.submitLoginFormCallback = function(response) {
    var isLoginFormResponse = formAuthRealmChallengeHandler.isCustomResponse(response);
    if (isLoginFormResponse){
    	formAuthRealmChallengeHandler.handleChallenge(response); //Challenge is received from MBaaS
    }
};

//$(document).on('click','#loginButton', function () {
//	var data = authRealmForm.respondToChallenge();
//    formAuthRealmChallengeHandler.submitLoginForm(data.reqURL, data.options, formAuthRealmChallengeHandler.submitLoginFormCallback);
//});

$(document).on('click','#cancelButton',function () {
	//If there is a cancel button in the screen, on user tap, execute actions below.
	formAuthRealmChallengeHandler.submitFailure();
});

//$(document).on('click','#mpinLoginButton', function () {
//	var data = authRealmMPin.respondToChallenge();
//    formAuthRealmChallengeHandler.submitLoginForm(data.reqURL, data.options, formAuthRealmChallengeHandler.submitLoginFormCallback);
//});

$(document).on('click','#cancelButton',function () {
	//If there is a cancel button in the screen, on user tap, execute actions below.
	formAuthRealmChallengeHandler.submitFailure();
});


