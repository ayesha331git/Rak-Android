
/* JavaScript content from js/viewModels/appActivation.js in folder common */

/* JavaScript content from js/viewModels/appActivation.js in folder common */
App.viewModels.appActivation=function(rootScope,utils,scope,jsonStore,logger,EncryptDecryptService,q,MBaaS){


		var self=this;
		self.touchIdEnable = false;
		self.userId = '';
		self.clientId = '';
		self.userMPIN = "";
		self.confirmMPIN="";
		self.isActivation="false";
		self.maxDeviceDeactivate = false;
		self.otpLinkenable=true;
		self.isMaxDevice = false;
		self.keyChainServiceName = "Finacle";
		self.userMPINHistory=[];//770314
		self.touchBack=false;
		self.appActId = '';
		self.appActPwd = '';
			self.biometricTypeIphone = '';

        self.clearMPINData = function(){
    		self.userId="";
    		self.seed = "";
    		self.userMPIN = "";
    		self.confirmMPIN="";
    		self.userOTP = "";
    		self.smsOTPMessage = "";
    		self.cardType="";
    		self.deviceName="";
    		self.eventName="";
    		self.licenseStoreSuccess="FALSE";
    		self.clientId="";
    		self.authenticateOTP="";
    		self.cardNumber1="";
    		self.cardNumber2="";
    		self.cardNumber3="";
    		self.cardNumber4="";
    		self.isValidcardNumber=false;
    		self.cardName="";
    		self.cardExpiryMonth="";
    		self.cardExpiryYear="";
    		self.atmPin="";
    		self.atmPinValidator="";
    		self.CVVAndPinMaxLength="";
    		self.isForgotMPINClick=false;
    		self.userMPIN=self.oldMPIN=self.confirmMPIN='';
    		self.isForgotMPINPasswordClick = false;
    		self.isActivation="false";
    		self.appActId="";
    		self.appActPwd="";
		self.biometricTypeIphone="";
        };

		self.checkUserMPINExistance = function(){
//			if(self.isForgotMPINPasswordClick){
//				self.userId = rootScope.myProfile.userID;
//			}
			if( self.userId === ''){
//				 $('#submitButton').click();
				if(self.isForgotMPINPasswordClick){
					self.userId = rootScope.myProfile.userID;
					scope.setEvent('onForgotPwdUserIDAuthClick');
				}else{
					scope.setEvent('onAppActivationProceedClick');
				}

			}
			else{
				mAuth(function (response) {
					//if(WL.Client.getEnvironment() == WL.Environment.IPHONE || WL.Client.getEnvironment() == WL.Environment.IPAD){
					if(MBaaS.isIPhoneEnv() || MBaaS.isIPadEnv()){
	            		response=JSON.parse(response);
	            	}
					 if(response.status){
						 	self.clientId=response.clientID;
						 	if(self.isForgotMPINClick){
						 			// $('#submitButton').click();
						 		//Uncommented below setEvent
									 scope.setEvent('onAppActivationProceedClick');
							 }else{
								// $('#submitButton').click();
								 // comment by sadasiba on 22nd Jan 2016
//								 rootScope.showErrorPopup("You are already an activated user. Please Login.");
//								 $('#redirectLoginButton').click();
//								 scope.setEvent('onCustomerIdCancelClick');  // not required
							 }
					 }else{
						 if(self.isForgotMPINClick || self.isForgotMPINPasswordClick){
							 rootScope.showErrorPopup(rootScope.appLiterals.APP.ERROR_MESSAGE.ACTIVATE_USER);
                            //Uncommented below setEvent
//							 $('#redirectLoginButton').click();
                            scope.setEvent('onCustomerIdCancelClick');
						 }else{
							// $('#submitButton').click();
//							 scope.setEvent('onAppActivationProceedClick');
						 }
					 }
				  } , function (response) {
				  },"userExist",[{"userID":self.userId}]);
			}
		};
        self.activeUser = function(){

        	if(self.userMPIN === '' || self.confirmMPIN === ''  || self.deviceName === '' ){
        		self.userMPIN = '';
        		self.confirmMPIN = '';
        		scope.setEvent("onAppActivationSetMPINSubmitClick");
        	}
        	else{
        		// added by cm
        		if(self.userMPIN != self.confirmMPIN ){
                    scope.setEvent("onAppActivationSetMPINSubmitClick");
                    self.clearSetMPINData();
                    return false;
                }
        		// check with the local rules if password passes the MPIN rules
            	var pwdValid=self.mpinRulesValidator();
//            	alert(pwdValid);
            	if(!pwdValid){
            		self.clearSetMPINData();
            		return pwdValid;
            	}
        				//FIXME: Processing Screen will be shown till promise is executed
		    			rootScope.showProcessingOverlay = true;
					var promise = self.getMPINHistory();
					promise.then(function() {
						var removeSpaceInUserId = self.userId.replace(/ /g,'');
						var userIdToUpperCase = removeSpaceInUserId.toUpperCase();
						rootScope.showProcessingOverlay = false;
								if (self.maxMpinHistoryCount !== 0
										&& self.userMPINHistory.length !== 0
										&& self.userMPINHistory[userIdToUpperCase] != undefined
										&& self.userMPINHistory[userIdToUpperCase].mPINs
												.indexOf(self.userMPIN) != -1) {
									rootScope
											.showErrorPopup(rootScope.appLiterals.APP.ERROR_MESSAGE.MPIN_NEW
													+ self.maxMpinHistoryCount
													+ rootScope.appLiterals.APP.ERROR_MESSAGE.MPINS);
									self.clearSetMPINData();
									return false;
								}

                mAuth(function (response) {
                	//if(WL.Client.getEnvironment() == WL.Environment.IPHONE || WL.Client.getEnvironment() == WL.Environment.IPAD){
					if(MBaaS.isIPhoneEnv() || MBaaS.isIPadEnv()){
                		response=JSON.parse(response);
                	}
                	if(response.status){
                		self.licenseStoreSuccess = "TRUE";
                		//796409 - storeMPIN() - contains storage based on prev 3 mPINS - Not going to save Current mPIN, so commenting below code
                		// save mpin to jsonstore
                		//if(self.maxMpinHistoryCount !== 0){
                		//	self.storeMPIN();
            			//}

                		// if Touch ID is there then save
            			if(self.touchIdEnable && self.isForgotMPINClick){
            				self.setKeyChain("MPIN",self.keyChainServiceName,self.userMPIN);
            			}
            			//set event
            			scope.setEvent('onAppActivationSetMPINSubmitClick');
                	}
                	else{
                		//self.licenseStoreSuccess = "FALSE";
                		scope.setEvent('onAppActivationSetMPINSubmitClick');
                	}
//                	self.clientId = response.clientID;
                	//$("#setMPINClick").click();
                	self.clearSetMPINData();
                  },function (response) {
                  },
        		"active",[{"userMPIN":self.userMPIN,"userID":self.userId,"clientID":self.clientId,"userOTP":self.authenticateOTP,"seed":self.seed}]);
        	},function(error){
	              });;
			}

		};
        self.activeUserForTouchIDSet = function(){
        	if(self.userMPIN === ''){
        		scope.setEvent("onAppActivationSetMPINSubmitClick");
        	}
        	else if(self.touchIdEnable && rootScope.fields.finacleUserPassword != self.userMPIN && rootScope.appVersionDetails.appConfigParams[1].BUILDTYPE == "MPIN" ){
//        		alert(rootScope.fields.finacleUserPassword);
        		self.userMPIN = '';
        		rootScope.showErrorPopup(rootScope.appLiterals.APP.ERROR_MESSAGE.MPIN_ERROR);
        	}
        	else{
        		mAuth(function (response) {
                	//if(WL.Client.getEnvironment() == WL.Environment.IPHONE || WL.Client.getEnvironment() == WL.Environment.IPAD){
					if(MBaaS.isIPhoneEnv() || MBaaS.isIPadEnv()){
                		response=JSON.parse(response);
                	}
                	if(response.status){
                		self.licenseStoreSuccess = "TRUE";
                        self.setKeyChain("masterUserID",self.keyChainServiceName,rootScope.fields.masterUserID);// Added for Touch id- password flow
                		self.setKeyChain("username",self.keyChainServiceName,self.userId);
                		self.setKeyChain("MPIN",self.keyChainServiceName,self.userMPIN);
                		self.setKeyChain("touchIDActivationStatus",self.keyChainServiceName,"true");
                		self.setKeyChain("isResignedActivation",self.keyChainServiceName,"true");
                	}
                	/*else{
                		self.licenseStoreSuccess = "FALSE";
                	}*/
//                	self.clientId = response.clientID;
                      //Uncommented below setEvent
//                	$("#setMPINClick").click();
                      scope.setEvent("onAppActivationSetMPINSubmitClick");
                	self.clearSetMPINData();
                  } , function (response) {
                      // Modified for Touch id- password flow
                      if (rootScope.appVersionDetails.appConfigParams[1].BUILDTYPE == 'PWD'){
                      self.userMPIN = '';
                      self.loginPwd =  '';
                      rootScope.fields.finacleUserPassword = '';
                      }
                      },"active",[{"userMPIN":self.userMPIN,"userID":self.userId,"clientID":self.clientId,"userOTP":self.authenticateOTP,"seed":self.seed}]);
        	}

		};
    //1829- check current user's touch id registration status
    self.checkForTouchIDStatusOfUser = function(){

        cordova.exec(function(result){
                     //console.log(result);
                     if(result.toUpperCase()==rootScope.fields.finacleUserCorporateId.toUpperCase()){

                     self.isCurrentUserRegisteredForTouchId = true;
                     if (rootScope.isTouchIDActivation){
                        self.isTouchIDActivationModel = "Yes";
                     }
                     else{
                        self.isTouchIDActivationModel = "No";
                     }

                     }
                     else{
                        self.isCurrentUserRegisteredForTouchId = false;
                        self.isTouchIDActivationModel = "No";
                     }

                     },function(result){

                     console.log(result);
                     }, "Keychain", "getForKey",["username", self.keyChainServiceName]);
		};
		self.loginUser = function(){
			if( rootScope.fields.finacleUserCorporateId !== '' && rootScope.fields.finacleUserPassword !== ''){
                // Modified for Touch id- password flow
                if (rootScope.appVersionDetails.appConfigParams[1].BUILDTYPE == 'PWD'){
                    if(rootScope.touchIDLoginUser == true){
                        //Uncommented below setEvent
                                           $("#PWDLogin").click();
                        //scope.setEvent("onPwdLoginClickforTouchID");
                    }

                }
                else{
                    mAuth(function (response) {
                          //if(WL.Client.getEnvironment() == WL.Environment.IPHONE || WL.Client.getEnvironment() == WL.Environment.IPAD){
						if(MBaaS.isIPhoneEnv() || MBaaS.isIPadEnv()){
                          response=JSON.parse(response);
                          }
                          self.clientId = response.clientID;
                          if(self.clientId === ''){
                          rootScope.fields.finacleUserCorporateId = '';
                          rootScope.fields.finacleUserPassword = '';
                          rootScope.showAlert(rootScope.appLiterals.APP.ERROR_MESSAGE.ACTIVATE_USER);
                          rootScope.$apply();
                          }
                          else{
                          self.userOTP = response.otp.toString();
                          self.userMPIN = rootScope.fields.finacleUserPassword;
                          //Uncommented below setEvent
//                          $("#MPINLogin").click();
                          scope.setEvent("onMPINLoginClick");
                          }
                          //	              		scope.setEvent('onMPINLoginClick');
                          //	              	}
                          } , function (response) {
                          },"login",[{"userMPIN":rootScope.fields.finacleUserPassword,"userID":rootScope.fields.finacleUserCorporateId}]);

                }

			}
			else{
//			$("#MPINLogin").click();
				scope.setEvent('onMPINLoginClick');
			}
		};
        self.deleteUser = function(){
        mAuth(function (response) {
              //alert(response);
              } , function (response) {
              },"deleteUser",[{"userMPIN":self.userMPIN,"userID":self.userId}]);
        };
        self.setMaxDevice = function(){
        		scope.isMaxDevice = true;
        };
		self.initAppActivationOTPPage = function(responseList){
			if(!responseList[0].hasOwnProperty('errorMessage')){
				// 770785
				if (responseList[0].hasOwnProperty('isActivatedUser') && responseList[0].isActivatedUser===true){
					rootScope.showConfirmBox(rootScope.appLiterals.APP.ERROR_MESSAGE.ACTIVE_USER,rootScope.appLiterals.APP.BUTTON_TEXT.OK,"",function(){scope.setGlobalEvent('onLoginClick');},false);
					}
				self.smsOTPMessage = responseList[0].SMSOTP+"";
				self.sessionId=responseList[0].sessKey;
	    		self.mparam=responseList[0].mbParam;
	    		self.regenerateOTPTimeoutInSeconds=responseList[0].regenerateOTPTimeoutInSeconds;
	    		if(!self.isForgotMPINClick){
		    		self.activeDevice = responseList[0].userActivatedDeviceCount;
		    		self.maxDeviceCount = responseList[0].maxDeviceCount;
		    		//self.activeDevice = 3;
		    		//self.maxDeviceCount = 3;
		    		if(!scope.isMaxDevice && self.activeDevice >= self.maxDeviceCount && !rootScope.isUserLoggedIn){
		    			scope.setEvent('onMaxDeviceInfo');
		    		}
	    		}
			}
		};
		self.maxDeactivate = function(){
		 scope.setEvent('onDeActClick');
		};
		self.initAppActivationCreditCardAndDebitCardPage = function(responseList){
			if(!responseList[0].hasOwnProperty('errorMessage')){
//				if(rootScope.utils.touchIdEnable){
//	    			self.clientId = "1234";
//			 		self.seed = "d6uLGuFTEQrdkDRa0J5tfgqmgGR7Xz+ftfe/fo4/IcfLdgKQGhKZyecFOKfZ4nCB";
//			 		self.userMPIN = Math.floor((Math.random() * 10000) + 1000).toString();
//			 	    self.deviceName = window.device.platform +"_"+self.clientId;
//	    		}
				self.cardType = responseList[0].flag;
				if(self.cardType == "CREDIT"){
					self.CVVAndPinMaxLength=3;
				}else{
					self.CVVAndPinMaxLength=4;
				}
				self.months = utils.range(1,12);
				var currentYear = parseInt(rootScope.fields.currentYear);
				self.years = utils.range(currentYear,currentYear+10);
				self.sessionId=responseList[0].sessKey;
	    		self.mparam=responseList[0].mbParam;
			}
		};
		self.validateDCAndCC = function(){

			if( self.cardNumber1 === '' && self.cardNumber2=== '' && self.cardNumber3=== '' && self.cardNumber4=== '' ){
				self.isValidcardNumber=false;
			}
			else if( self.cardNumber1.length < 4  || self.cardNumber2.length < 4 || self.cardNumber3.length < 4  || self.cardNumber4.length < 4 )
			{
				self.isValidcardNumber=true;
				rootScope.showErrorPopup(rootScope.appLiterals.APP.REGISTER.SET_MPIN.ENTER_VALID_CARD_NO);
			}
			else
			{
				self.isValidcardNumber=false;
			}
		};

		self.refreshPIN = function(){
			if(self.cardType == "CREDIT"){
				if(/^[0-9]*$/.test(self.atmPin) === false || self.atmPin.length < self.CVVAndPinMaxLength  || self.isValidcardNumber===true || self.cardExpiryMonth==="" || self.cardExpiryYear==="" || self.cardNumber1 === '' || self.cardNumber2 === '' || self.cardNumber3 === '' || self.cardNumber4 === ''  ) {
					self.atmPin = '';
				}
			}
			else{
				if(/^[0-9]*$/.test(self.atmPin) === false || self.atmPin.length < self.CVVAndPinMaxLength ||  self.isValidcardNumber===true || self.cardName === "" || self.cardNumber1 === "" || self.cardNumber2 === '' || self.cardNumber3 === '' || self.cardNumber4 === ''  ) {
					self.atmPin = '';
				}
			}
		};

		self.changePin = function(userId){
			if(self.oldMPIN !== '' && self.userMPIN !== '' && self.confirmMPIN !== '' &&  self.userMPIN==self.confirmMPIN){
				var pwdValid=false;
				if(userId){
					self.userId=userId;
				}else{
					userId=self.userId;
				}
				// check with the local rules if password passes the MPIN rules
				pwdValid=self.mpinRulesValidator();
	        	if(!pwdValid){
	        		self.clearSetMPINData();
	        		return pwdValid;
	        		}
				//if(self.maxMpinHistoryCount !== 0 && scope.checkMPIN(userId,self.userMPIN)){
				//FIXME: Processing Screen will be shown till promise is executed
    				rootScope.showProcessingOverlay = true;
					var promise = self.getMPINHistory();
					promise.then(function() {
						var removeSpaceInUserId = self.userId.replace(/ /g,'');
						var userIdToUpperCase = removeSpaceInUserId.toUpperCase();
		    			rootScope.showProcessingOverlay = false;
						console.log("self.oldMPIN:"+self.oldMPIN);
		    			console.log("self.userMPIN:"+self.userMPIN);
		    			console.log("self.maxMpinHistoryCount:"+self.maxMpinHistoryCount);
		    			console.log("self.userMPINHistory:");
					    //796409 - Change in new mPIN validation based on new conditions
		    			if ( self.oldMPIN == self.userMPIN
		    					|| (self.maxMpinHistoryCount !== 0
		    							&& self.userMPINHistory.length !== 0
		    							&& self.userMPINHistory[userIdToUpperCase] != undefined
		    							&& ((self.maxMpinHistoryCount != self.userMPINHistory[userIdToUpperCase].mPINs.length
		    									&& self.userMPINHistory[userIdToUpperCase].mPINs.indexOf(self.userMPIN) != -1)
		    									||(self.maxMpinHistoryCount == self.userMPINHistory[userIdToUpperCase].mPINs.length
		    											&& self.userMPINHistory[userIdToUpperCase].mPINs.indexOf(self.userMPIN) != 0))))
		    			{
									rootScope
											.showErrorPopup(rootScope.appLiterals.APP.ERROR_MESSAGE.MPIN_MODIFY_ERROR
													+ ' '
													+ self.maxMpinHistoryCount
													+ ' '
													+ rootScope.appLiterals.APP.ERROR_MESSAGE.MPINS);
									self.clearSetMPINData();
									return false;
								}

				mAuth(function (response) {

					//if(WL.Client.getEnvironment() == WL.Environment.IPHONE || WL.Client.getEnvironment() == WL.Environment.IPAD){
					if(MBaaS.isIPhoneEnv() || MBaaS.isIPadEnv()){
	            		response=JSON.parse(response);
	            	}

	              	if(response){
	              		self.otp=self.clientId='';
	            		self.changeMPINDone=response.changeMPINDone;
	            		if(self.changeMPINDone=='FALSE'){
	            		self.otp=response.otp;
	            		self.clientId=response.clientID;
	            		}else{
	            		    //796409  pass old mPIN to save, means existing mPIN
	            			// save mpin to jsonstore
	            			if(self.maxMpinHistoryCount !== 0){
	            				self.storeMPIN(self.oldMPIN);
	            			}

	            			// if Touch ID is there then save
	            			if(self.touchIdEnable){
	            				self.setKeyChain("MPIN",self.keyChainServiceName,self.userMPIN);
	            			}

	            		}

//	            		scope.setEvent('onSubmitClick');
	            	//	$("#changeMPINSubmit").click();
	            		scope.setEvent('onSubmitClick');
	            	}
	            	else{
	            		rootScope.showErrorPopup(rootScope.appLiterals.APP.ERROR_MESSAGE.MPIN_NOT_CHANGED);
	            	}
	              } , function (response) {
	            	  rootScope.showErrorPopup(rootScope.appLiterals.APP.ERROR_MESSAGE.MPIN_UPDATE_ERROR);
	                  },"change",[{"oldPin":self.oldMPIN,"userID":userId,"newPin":self.userMPIN}]);

			},function(error){
            });;
			}
			else{
//				$("#MPINLogin").click();
                self.clearSetMPINData();
				scope.setEvent('onSubmitClick');
			}
		};
		self.initAppActivationSetMPINPage = function(responseList){

//			if(self.activeDevice >= self.maxDeviceCount && !self.maxDeviceDeactivate ){
//				scope.setEvent('onManageDevicePage');
//			}
			//Commenting the below : This should be called during Activation flow irrespective touch id is enabled or not.
			// if(!rootScope.isTouchIDActivation){// Fix for 766359- changed for self.touchIdEnable to rootScope.isTouchIDActivation
			if(rootScope.register.isActivation==="true"){
                 if(self.activeDevice!='' && self.maxDeviceCount!=''){
                    if(self.activeDevice >= self.maxDeviceCount && !self.maxDeviceDeactivate ){
                        scope.setEvent('onManageDevicePage');
                    }
                }

            }

			if(responseList[0].hasOwnProperty('errorMessage')){
					//if(WL.Client.getEnvironment() == WL.Environment.IPHONE || WL.Client.getEnvironment() == WL.Environment.IPAD){
					if(MBaaS.isIPhoneEnv() || MBaaS.isIPadEnv()){
						self.deleteUser();
					}
			}
			else{
				if(self.isForgotMPINClick){
					self.deviceName = responseList[0].deviceName;
				}
				else{
					self.deviceName = window.device.platform +"_"+responseList[0].License[0].clientId;
					logger.info(' Device Name :'+ self.deviceName);
				}

				self.sessionId=responseList[0].sessKey;
	    		self.mparam=responseList[0].mbParam;
	    		self.clientId=responseList[0].License[0].clientId;
	    		self.seed=responseList[0].License[0].seed;
	    		self.setMpinRules(responseList);

	    		//Added for Don't have user id flow - start
            	if(self.userId===undefined || self.userId.length==0){
            		self.userId=responseList[0].License[0].userId;
            	}
            	//Added for Don't have user id flow - end
			}
		};
		self.initAppActivationSetMPINPageForTouchID = function(responseList){
			if(!responseList[0].hasOwnProperty('errorMessage')){

				self.userId = responseList[0].License[0].userId;
	    		self.clientId=responseList[0].License[0].clientId;
	    		self.seed=responseList[0].License[0].seed;
	    		self.deviceName = window.device.platform +"_"+responseList[0].License[0].clientId;
				logger.info(' Device Name :'+ self.deviceName);

				if(rootScope.appVersionDetails.appConfigParams[1].BUILDTYPE == 'PWD'){
//					self.userMPIN = Math.floor((Math.random() * 10000) + 1000).toString();
                    // Modified for Touch id- password flow
                    self.loginPwd = EncryptDecryptService.encryption(rootScope.fields.finacleUserPassword);

                    self.userMPIN = self.loginPwd;
			 		self.confirmMPIN = self.userMPIN;
			 		self.activeUserForTouchIDSet();
				}else{
                    self.setKeyChain("masterUserID",self.keyChainServiceName,rootScope.fields.masterUserID);// Added for Touch id- password flow
					self.setKeyChain("username",self.keyChainServiceName,self.userId);
            		self.setKeyChain("MPIN","servicename",self.userMPIN);
            		rootScope.touchIDLoginUser = true;
					//rootScope.fields.finacleUserPassword
					self.userMPIN = rootScope.fields.finacleUserPassword;
					self.setKeyChain("MPIN",self.keyChainServiceName,self.userMPIN);
					self.setKeyChain("touchIDActivationStatus",self.keyChainServiceName,"true");
					self.setKeyChain("isResignedActivation",self.keyChainServiceName,"true");
            		scope.setEvent("onActivateTouchIDClick");
				}
			}
		};
		self.setMpinRules=function(responseList){
			if(!responseList[0].hasOwnProperty('errorMessage')){
			self.mpinRules=responseList[0].mpinRules[0];
			self.maxMpinHistoryCount=self.mpinRules.maxMpinHistory *1;
			}
		};
		self.initAppActivationSuccessPage = function(responseList){
			if(!responseList[0].hasOwnProperty('errorMessage')){
				self.message = responseList[0].message;
				if(typeof self.message == 'undefined'){
					self.message = rootScope.appLiterals.APP.ERROR_MESSAGE["TOUCH_ID_SUCC_ACTIVATED"+biometricType];
				}
			}
		};
		self.disableOTPClick = function(){
			self.otpLinkenable=false;
			setTimeout(function(){
				self.otpLinkenable=true;
				rootScope.$apply();
			},self.regenerateOTPTimeoutInSeconds *1000);
		};
		self.specialCharlist=function(str) {
			    var pattern=/^[a-zA-Z0-9- ]*$/;
			    var result="";
			    for (var i = 0; i < str.length; i++) {
			          if (pattern.test(str.charAt(i)) === false) {
			        	  result+=str.charAt(i);
			          }
			    }
		    return result;
		};

		self.specialCharValidator=function(str,allowedChar){
			var result=true;
			for (var i = 0; i < str.length; i++) {
				 if (allowedChar.indexOf(str.charAt(i)) == -1) {
					 return false;
				 }
			}
			return result;
		};
		self.mpinRulesValidator=function(){
			var password=self.userMPIN;
			var minLength=self.mpinRules.minLength*1;
			maxLength=self.mpinRules.maxLength*1;
			splCharMandatory=self.mpinRules.splCharMandatory;
			splCharset=self.mpinRules.splCharset;
			digitMandatory=self.mpinRules.digitMandatory;
			numericPatternExclude=self.mpinRules.numericPatternExclude||self.mpinRules.numberCharactersExclude;//excluded number pattern ?
			alphaMandatory=self.mpinRules.alphaMandatory; // ?
			charactersCaseType=self.mpinRules.charactersCaseType;// values U/L/B
			alphaPatternExclude=self.mpinRules.alphaPatternExclude||self.mpinRules.alphaCharExclude;// format?
			fourDistinctChar=self.mpinRules.fourDistinctChar;//?
			isNumericOnly=self.mpinRules.isNumericOnly;
			var pinLength=password.length;
			if(pinLength>=minLength && pinLength<=maxLength){
				//special char handling
				var specialChars=self.specialCharlist(password);
				if(splCharMandatory =='Y'){

					if(specialChars.length>0){

					}else{
						rootScope.showErrorPopup(rootScope.appLiterals.APP.ERROR_MESSAGE.SPEC_CHAR+rootScope.appLiterals.APP.REGISTRATION.TXT_AUTHENTICATION_TYPES.MPIN);
						return false;
					}
				}
				if(specialChars.length>0){
					var isAllowed=self.specialCharValidator(specialChars,splCharset);
					if(!isAllowed){
						rootScope.showErrorPopup(rootScope.appLiterals.APP.REGISTRATION.TXT_AUTHENTICATION_TYPES.MPIN+rootScope.appLiterals.APP.ERROR_MESSAGE.PRE_SPEC+splCharset+rootScope.appLiterals.APP.ERROR_MESSAGE.ONLY);
						return false;
					}
				}

				//isNumericOnly
				if(isNumericOnly=='Y'){
					var isnum = /^\d+$/.test(password);
					if(!isnum){
						rootScope.showErrorPopup(rootScope.appLiterals.APP.REGISTRATION.TXT_AUTHENTICATION_TYPES.MPIN+rootScope.appLiterals.APP.ERROR_MESSAGE.IS_NUMERIC_ONLY);
						return false;
					}
				}

				// digit handling
				if(digitMandatory=='Y'){
					if(!(/[0-9]/.test(password))){
						rootScope.showErrorPopup(rootScope.appLiterals.APP.REGISTRATION.TXT_AUTHENTICATION_TYPES.MPIN+rootScope.appLiterals.APP.ERROR_MESSAGE.DIGIT);
						return false;
					}
				}
				// special chra exclude
				var numericPatternExcludeArr=numericPatternExclude.split(',');
				var num;
				for(num=0;num<numericPatternExcludeArr.length;num++){
					if(password.indexOf(numericPatternExcludeArr[num])!=-1){
						rootScope.showErrorPopup(rootScope.appLiterals.APP.REGISTRATION.TXT_AUTHENTICATION_TYPES.MPIN+rootScope.appLiterals.APP.ERROR_MESSAGE.EXC_CHAR+ numericPatternExclude);
						return false;
					}
				}
				// alphabet validation handling
				if(alphaMandatory=='Y'){
					if(!(/[A-Z]/i.test(password))){
						rootScope.showErrorPopup(rootScope.appLiterals.APP.ERROR_MESSAGE.ALPHA+rootScope.appLiterals.APP.REGISTRATION.TXT_AUTHENTICATION_TYPES.MPIN);
						return false;
					}
				}

				// upper and lower case
				if(charactersCaseType=="U"){
					alphaExists= /[a-z]/.test(password);
					if(alphaExists){
						rootScope.showErrorPopup(rootScope.appLiterals.APP.REGISTRATION.TXT_AUTHENTICATION_TYPES.MPIN+rootScope.appLiterals.APP.ERROR_MESSAGE.LOW_CASE);
						return false;
					}
				}
				else if (charactersCaseType=="L"){
					alphaExists= /[A-Z]/.test(password);
					if(alphaExists){
						rootScope.showErrorPopup(rootScope.appLiterals.APP.REGISTRATION.TXT_AUTHENTICATION_TYPES.MPIN+rootScope.appLiterals.APP.ERROR_MESSAGE.UP_CASE);
						return false;
					}
				}
				// char exclude pattern
				var alphaPatternExcludeArr=alphaPatternExclude.split(',');
				for(num=0;num<alphaPatternExcludeArr.length;num++){
					if(password.indexOf(alphaPatternExcludeArr[num])!=-1){
						rootScope.showErrorPopup(rootScope.appLiterals.APP.REGISTRATION.TXT_AUTHENTICATION_TYPES.MPIN+rootScope.appLiterals.APP.ERROR_MESSAGE.EXC_CHAR+alphaPatternExclude);
						return false;
					}
				}
				// Distinct character handling
				if(fourDistinctChar=='Y'){
					var distinctCount= password.replace(/(.)(?=.*\1)/g, "").length;
					if(distinctCount<4){
						rootScope.showErrorPopup(rootScope.appLiterals.APP.REGISTRATION.TXT_AUTHENTICATION_TYPES.MPIN+rootScope.appLiterals.APP.ERROR_MESSAGE.DIS_CHAR);
						return false;
					}
				}
			}
			else{
				if(pinLength<minLength)
					rootScope.showErrorPopup(rootScope.appLiterals.APP.REGISTRATION.TXT_AUTHENTICATION_TYPES.MPIN+rootScope.appLiterals.APP.ERROR_MESSAGE.MIN_CHAR+minLength +rootScope.appLiterals.APP.ERROR_MESSAGE.CHARC);
				else
					rootScope.showErrorPopup(rootScope.appLiterals.APP.REGISTRATION.TXT_AUTHENTICATION_TYPES.MPIN+rootScope.appLiterals.APP.ERROR_MESSAGE.MAX_CHAR+maxLength +rootScope.appLiterals.APP.ERROR_MESSAGE.CHARC);
				return false;
			}
			return true;
		};

		self.clearSetMPINData = function(){
			rootScope.resetPageError();
			self.userMPIN = '';
        	self.confirmMPIN = '';
        	self.oldMPIN='';
        	rootScope.myProfile.password.hideLgnPasswordStrength=true;
		};
		////////////////// Touch ID Activation //////////////////
		// Modified for Touch id- password flow
		self.touchIdAvailable = function(){
            		var promise = self.checkTouchIDStatus();

            promise.then(function() {
               if (!self.isTouchIdNotEnrolled){
                   rootScope.displayTouchIDPopup = true;
                         //			self.touchIdEnable = true;
                         //			self.userId = "RMBPWC1";
                         //			self.username = rootScope.loginUsername;
                         //			self.clientId = "";
                         //			 alert("isResignedActivationStatus"+rootScope.isResignedActivationStatus);
                         //	         alert("isTouchIDActivation"+rootScope.isTouchIDActivation);
                         if (typeof self.isCurrentUserRegisteredForTouchId != 'undefined' && !self.isCurrentUserRegisteredForTouchId){//1829- show prompt message based on touch id registration status
                         rootScope.showConfirmBox(rootScope.appLiterals.APP.ERROR_MESSAGE["TOUCH_ID_USER_ALREADY_REGISTERED"+biometricType],"Yes","Cancel",
                            function(){
                                rootScope.confirmResult = true;
                                self.callBackFunctionForConfirnBox();
                            }, self.isTouchIDActivationModel = "No");
                         }
                         else{
                         rootScope.showConfirmBox(rootScope.appLiterals.APP.ERROR_MESSAGE["TOUCHID_REG"+biometricType],"Yes","Cancel",
                            function(){
                                rootScope.confirmResult = true;
                                self.callBackFunctionForConfirnBox();
                            }, self.isTouchIDActivationModel = "No");
                         }
                         }
                         else{
                         rootScope.showErrorPopup(self.touchIDErrorMsg);
                         rootScope.appActivation.setKeyChain("isResignedActivation",self.keyChainServiceName,"true");
                         }
                         },function(error){
                         });;
		};

		self.callBackFunctionForConfirnBox = function(){
			if(rootScope.confirmResult){//1829- verify user's fingerprint before registration of touch id
                window.plugins.touchid.verifyFingerprintWithCustomPasswordFallback(rootScope.appLiterals.APP.ERROR_MESSAGE.SCAN_YOUR_FINGERPRINT, function(msg) {
                    self.userId = rootScope.fields.finacleUserCorporateId;
                    scope.setEvent('onAppActivationProceedClick');
                },
                function(msg) {
                    rootScope.isTouchIDActivation = false;
                }
                );
			}else{
				rootScope.appActivation.setKeyChain("isResignedActivation",self.keyChainServiceName,"true");
			}
		};

		self.checkTouchIDStatus = function(){
//			alert('called');
			var deferred = q.defer();
//			if(WL.Client.getEnvironment() == WL.Environment.IPHONE || WL.Client.getEnvironment() == WL.Environment.IPAD){
			if(MBaaS.isIPhoneEnv() || MBaaS.isIPadEnv()){
                self.isTouchIdNotEnrolled = false;
				cordova.exec(function(response){
					self.touchIdEnable = true;
					self.biometricTypeIphone = response;
                    if(self.biometricTypeIphone=="face"){
                    	rootScope.biometricType="_F";
                    }
                    else{
                    	rootScope.biometricType="";
                    }
//					alert('TouchID Available Suc Status' + response );
					cordova.exec(function(response){
//						 alert('TouchID Activation Status' + response );
						if(response == "true"){
                            rootScope.isTouchIDActivation = true;
                            rootScope.isTouchIDLogin = true;
                            }else{
                               rootScope.isTouchIDActivation = false;
                               rootScope.isTouchIDLogin = false;
                            }
                                 deferred.resolve();
					}, function(response){
//						rootScope.isTouchIDenable = false;
						rootScope.isTouchIDLogin = false;
//						alert('touchIDActivationStatus fail'+response);
                        deferred.resolve();
					}, "Keychain", "getForKey",["touchIDActivationStatus", self.keyChainServiceName]);
				},
				function(response){
//					alert('TouchID Available Fail Status' + response );
//					rootScope.isTouchIDenable = false;
					rootScope.isTouchIDLogin = false;
                             // Modified for Touch id- password flow
                             if (response.code == -7){
                             self.touchIdEnable = true;
                             self.isTouchIdNotEnrolled = true;
                             self.touchIDErrorMsg = response.localizedDescription;
                             }
                             else{
                             self.isTouchIdNotEnrolled = false;
                             self.touchIdEnable = false;
                             }
                             deferred.resolve();

				}, "TouchID", "isAvailable", []);
		  }
			else if(MBaaS.isAndroidEnv()){
				console.log('Inside finger print check');
				rootScope.biometricType="_A";
				FingerprintAuth.isAvailable(function(successResult){
                	console.log("is available Success"+successResult.isHardwareDetected);
                	console.log("successResult.hasEnrolledFingerprints"+successResult.hasEnrolledFingerprints);
                	self.touchIdEnable = successResult.hasEnrolledFingerprints;
                	FPretrieveStatus(function(successResponse){
                		console.log("Success for retrieve status"+successResponse);
                		rootScope.isTouchIDActivation=successResponse;
                		rootScope.isTouchIDLogin = successResponse;
                	},
                	function(errorResp){
                		console.log("error for retrieve status"+errorResp);
                	},[]);


                	if(successResult.hasEnrolledFingerprints){
                		self.isTouchIdNotEnrolled = false;
                	}
                	deferred.resolve();
                },
                function(message){
                	self.touchIdEnable = false;
                	console.log("is available failure"+message);
                });
			}
          		return deferred.promise;
		};

		self.checkResignedActivationStatus = function(){
			//if(WL.Client.getEnvironment() == WL.Environment.IPHONE || WL.Client.getEnvironment() == WL.Environment.IPAD){
			if(MBaaS.isIPhoneEnv() || MBaaS.isIPadEnv()){
			cordova.exec(function(response){

//				alert("server response-"+response);

				if(response == "true"){
					rootScope.isResignedActivationStatus = true;
				}else{
					rootScope.isResignedActivationStatus = false;
				}

//				alert('ResignedActivationStatus suc-'+response);

			}, function(response){
//				alert('ResignedActivationStatus fail-'+response);
				rootScope.isResignedActivationStatus = false;
			}, "Keychain", "getForKey",["isResignedActivation", self.keyChainServiceName]);
		  }
		};
		 self.touchId = function(){
//			    alert('touchId');
			    var promise = self.checkTouchIDStatus();

             promise.then(function() {
                          if (self.isTouchIdNotEnrolled){
                          rootScope.showErrorPopup(self.touchIDErrorMsg);
                          rootScope.isTouchIDActivation = false;
                          }
                          else{

                        	  if(MBaaS.isIPhoneEnv() || MBaaS.isIPadEnv()){

                          rootScope.touchIDLoginUser=true;
                          // rak customisation changes
                          window.plugins.touchid.verifyFingerprint(rootScope.appLiterals.APP.ERROR_MESSAGE.SCAN_YOUR_FINGERPRINT, function(msg) {
                        	  cordova.exec(function(response){
                                  rootScope.fields.finacleUserCorporateId = response;
                                  cordova.exec(function(response){
                                               rootScope.fields.finacleUserPassword = response;
                                               if(rootScope.isStubbedVersion){
                                               $("#stubLogin").click();
                                               }
                                               else{
                                               self.loginUser();
                                               }
                                               }, null, "Keychain", "getForKey",["MPIN", self.keyChainServiceName]);

                                  }, null, "Keychain", "getForKey",["username", self.keyChainServiceName]);

                     },
                     function(msg) {
                     if (msg.code==-1 && msg.localizedDescription=='Biometry is locked out.'){
                     self.touchIDIncorrectAttempt = rootScope.appLiterals.APP.ERROR_MESSAGE["TOUCH_ID_FIVE_INCORRECT_FINGERPRINTS"+biometricType];
                     rootScope.isTouchIDLogin = false;
                     rootScope.isTouchIDActivation = false;
                     self.setKeyChain("touchIDActivationStatus",self.keyChainServiceName,"false");
                     rootScope.showErrorPopup(self.touchIDIncorrectAttempt);
                     rootScope.$apply();
                     self.touchIDIncorrectAttempt="";
                    }


                     }
                     );
                        	  }

                        	  else if(MBaaS.isAndroidEnv()){

                        		  rootScope.touchIDLoginUser=true;

                        		  FPretrieveDetails(function(response){
                        			  console.log("The retrieved details from Device"+JSON.stringify(response));
                        			  //rootScope.fields.finacleUserCorporateId=response.id;
                        			  //rootScope.fields.finacleUserPassword=response.code;
                        			  self.appActId=response.id;
                        			  self.appActPwd=response.code;

                        			  var appId=WL.Client.getAppProperty(WL.AppProperty.APP_DISPLAY_NAME);


                            		  var decryptConfig = {
                            				    clientId: appId,
                            				    //username:rootScope.fields.finacleUserCorporateId,
                            				    username:self.appActId,
                            				    token: response.token,
                            				    disableBackup:false
                            				   
                            				};

                            				FingerprintAuth.decrypt(decryptConfig, successCallback, errorCallback);

                            				function successCallback(result) {
                            				    console.log("successCallback(): " + JSON.stringify(result));
                            				    if (result.withFingerprint) {
                            				        console.log("Successful biometric authentication.");
                            				        rootScope.fields.finacleUserCorporateId=self.appActId;
                            				        rootScope.fields.finacleUserPassword=self.appActPwd;
                            				        self.loginUser();
                            				    }
                            				    if (result.withBackup) {
                            				        console.log("Backup biometric authentication.");
                            				        rootScope.fields.finacleUserCorporateId=self.appActId;
                            				        rootScope.fields.finacleUserPassword=self.appActPwd;
                            				        self.loginUser();
                            				    }
                            				}

                            				function errorCallback(error) {
                            				    if (error === "Cancelled") {
                            				        console.log("FingerprintAuth Dialog Cancelled!");  
                            				        rootScope.fields.finacleUserCorporateId='';
                            				        rootScope.fields.finacleUserPassword='';
                            				        jQuery('[ng-model="fields.finacleUserCorporateId"]').val("");
                                                	jQuery('[ng-model="fields.finacleUserPassword"]').val("");
                            				    } else {
                            				        console.log("FingerprintAuth Error: " + error);
                            				    }
                            				}

                        		  },
                        		  function(errorResponse){

                        		  },{});




                        	  }
                          }
             },function(error){
             });;

		    };

		self.setKeyChain = function(key,servicename,value){
//			alert(self.keyChainServiceName);
//			alert(key+value+servicename);
			cordova.exec(function(response){
//					alert("succ"+response);
				}, function(response){
//					alert(response)
				}, "Keychain", "setForKey",[key, servicename, value]);
		};

		self.getKeyChain = function(key, servicename){
//			alert("succ"+response);
			cordova.exec(function(response){
//			alert(response);
			}, null, "Keychain", "getForKey",[key, servicename]);
		};
		self.toggleClick=function(){
			if(self.isTouchIDActivationModel == "No" && self.isCurrentUserRegisteredForTouchId){
//				self.touchIdEnable = false;
				rootScope.isTouchIDLogin = false;
				rootScope.isTouchIDActivation = false;
				self.setKeyChain("touchIDActivationStatus",self.keyChainServiceName,"false");
//				self.setKeyChain("isResignedActivation",self.keyChainServiceName,"true");
			}else{
//				alert('False');
//				self.touchIdEnable = true;
//				rootScope.isTouchIDLogin = true;
				self.touchIdAvailable();
			}
		};

		//770314
		self.getMPINHistory=function(){
			var deferred = q.defer();
			if(self.maxMpinHistoryCount !== 0){
			jsonStore.getAllMPINHistory(function(err,result){
				if(err){
					Logger.info(err);
				}
				if(result.length>0){
					self.userMPINHistory = result[0].json;
				}
				deferred.resolve();
			});
			}
			else{
				deferred.resolve();
			}
			return deferred.promise;
		};

		//796409 - added mPINtoStore parameter.
		self.storeMPIN=function(mPINtoStore){
			var removeSpaceInUserId = self.userId.replace(/ /g,'');
			//796409 - Passed mPIN passed to this function instead of current mPIN
			jsonStore.validateAndStoreMPIN(removeSpaceInUserId.toUpperCase(),self.maxMpinHistoryCount,mPINtoStore,
          			function(err,result){
        			if(err){
        				Logger.info(err);
        			}
        			else if(result){
        				Logger.info("jsonStore.validateAndStoreMPIN is success");
        			}
        		});
		};
};