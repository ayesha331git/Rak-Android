/**
 * A view model for authentication across the application. This will be used based on requirements in 
 * specific modules.
 */

App.viewModels.AuthenticationModel = function(){
	var self = this;
	self.authenticationType = {
			OTP:"otp equivalent in service layer",
			TRANSACTIONPASSWORD:"transaction password equivalent in service layer"
	};
	self.authentication = {
		otp:"4 digit number",
		transactionPassword:"alphanumeric",
		isUserAuthenticated:false,
		isInProgress:false,
		authenticationRequest:{},
		authenticationResponse:{}
	};
};

