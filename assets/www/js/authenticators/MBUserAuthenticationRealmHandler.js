//MFP-8 Changes - Changed entire file
var singleStepAuthRealmChallengeHandler;
var userLoginChallengeHandler;
var authstatus = false;
var parForLogin;
if(typeof WL === 'undefined')
	singleStepAuthRealmChallengeHandler = {};
singleStepAuthRealmChallengeHandler.isChallengeInProgress = false;
singleStepAuthRealmChallengeHandler.initialize = function(){
	this.isChallengeInProgress = false;
	return this;
};

singleStepAuthRealmChallengeHandler.isUserLoggedIn = function(realm){
	console.log("===singleStepAuthRealmChallengeHandler.isUserLoggedIn===");
	realm = realm ? realm : "UserLogin";
	console.log("GlobalAuthenticationHandler isUserLoggedIn invoked for realm : "+ realm);
	var authstatus = true;
	console.log("GlobalAuthenticationHandler isUserLoggedIn authstatus : "+ authstatus);
	return authstatus;
}

singleStepAuthRealmChallengeHandler.callActionPro=function(action,response){
	console.log("===singleStepAuthRealmChallengeHandler.callActionPro===");
	console.log("Action triggered "+action+" "+response);
	singleStepAuthRealmChallengeHandler.trigger(action,response);
};

singleStepAuthRealmChallengeHandler.respondChallenge = function(parameters,callbacks){
	console.log("===singleStepAuthRealmChallengeHandler.respondChallenge===");
	console.log("input "+parameters)
	console.log("input in string "+JSON.stringify(parameters))
	if (userLoginChallengeHandler.isChallengeInProgress){
		userLoginChallengeHandler.submitChallengeAnswer({'parameters':parameters});
	}else{
		console.log("parameters "+parameters);
		WLAuthorizationManager.login("UserLogin",{'parameters':parameters}).then(
			function () {
				WL.Logger.debug("login onSuccess");
				console.log("Security login cleared  ");
			},
			function (response) {
				WL.Logger.debug("login onFailure: " + JSON.stringify(response));
				console.log("response 1 "+JSON.stringify(response));
				console.log("authstatus "+authstatus);
			}
		);
	}
};

singleStepAuthRealmChallengeHandler.respondFailure = function(){
	console.log("===singleStepAuthRealmChallengeHandler.respondFailure===");
	singleStepAuthRealmChallengeHandler.submitFailure();
};

//Add singleStepAuthRealmChallengeHandler to MicroEvent for the event emitter to listen for registered events.
MicroEvent.mixin(singleStepAuthRealmChallengeHandler);

function createUserLoginChallengeHandler() {
	console.log("===singleStepAuthRealmChallengeHandler.createUserLoginChallengeHandler===");
	console.log("Security handler created");
    userLoginChallengeHandler = WL.Client.createSecurityCheckChallengeHandler('UserLogin');
    userLoginChallengeHandler.handleChallenge = function(challenge) {
		console.log("=======Security handleChallenge() called=========="+JSON.stringify(challenge, null, 4));
		if (challenge.responseJSON){
			var tempJson = challenge.responseJSON;
			challenge.responseJSON = {};
			challenge.responseJSON = JSON.parse(tempJson);
		}

		var statusMsg = (challenge.errorMsg !== null) ? challenge.errorMsg : "";
		console.log("=========Logs========="+statusMsg);
		console.log("==challenge==="+JSON.stringify(challenge, null, 4));
		alert('Challenge created!!');
		userLoginChallengeHandler.isChallengeInProgress = true;
		var authRequired = challenge.authRequired;
		console.log("========authRequired========="+authRequired);

		if (authRequired === true){
			userLoginChallengeHandler.isChallengeInProgress  = true;
			singleStepAuthRealmChallengeHandler.isChallengeInProgress  = true;
			console.log("GlobalAuthenticationHandler handle challenge failure");
			singleStepAuthRealmChallengeHandler.callActionPro('authRequired', challenge.responseJSON);
			if (challenge.responseJSON != undefined && challenge.responseJSON.result){ //must be handled
				console.log("Invalid credentials.");
				singleStepAuthRealmChallengeHandler.callActionPro('authFailure', challenge);
			}
/*
			if (challenge.responseJSON){
				console.log("Invalid credentials.");
				var json = challenge.responseJSON;
				singleStepAuthRealmChallengeHandler.callActionPro('authFailure', json);
			}else{
				singleStepAuthRealmChallengeHandler.callActionPro('authRequired', challenge.responseJSON);
			}
*/
		} else if (authRequired === false){
			console.log("GlobalAuthenticationHandler handle challenge success");
			userLoginChallengeHandler.isChallengeInProgress = false;
			var json = JSON.parse(challenge.responseJSON.substring(0, challenge.responseJSON.length));
			singleStepAuthRealmChallengeHandler.callActionPro('authSuccess', json);
			userLoginChallengeHandler.submitSuccess();
		}
    	 return;
    };

    userLoginChallengeHandler.handleSuccess = function(data) {
		console.log("===userLoginChallengeHandler.handleSuccess===");
		singleStepAuthRealmChallengeHandler.isChallengeInProgress = false;// MFP 8 Chaitu Changes
		userLoginChallengeHandler.isChallengeInProgress = false;
    	console.log("Security handleSuccess() called ");
        console.log("handleSuccess data -->", JSON.stringify(data, null, 4));
        singleStepAuthRealmChallengeHandler.callActionPro('authSuccess', data);// MFP 8 Chaitu Changes
    };

    userLoginChallengeHandler.handleFailure = function(error) {
		console.log("===userLoginChallengeHandler.handleFailure===");
		console.log("handleFailure data -->",error);
		console.log("Security handleFailure() called");
    };
    return userLoginChallengeHandler;
}
