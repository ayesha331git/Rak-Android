/**
 * Extension framework for Payee.js viewModel
 */

/*
 * Sample implementation is defined in PayeeLandingListpgae.html with this 
 * payee.x.extensionTest();payee.testOverride(); line of code.
*/
App.viewModels.extensions.payee=function(payeeProductInstance,Logger){
	var self = this;
	self.extensionData = {};
	self.extensionTest = function(){
		Logger.info("Extension Working");
		return {"data":"Extension works"};
	}
	self.functionToOverride = function(){
		Logger.info("functionToOverride - Customization code invoked.");
	}
	// if there is a method named testOverride defined under viewModels/payee.js file
	payeeProductInstance.testOverride = function(){
		Logger.info('Override from customization code');
	}
};