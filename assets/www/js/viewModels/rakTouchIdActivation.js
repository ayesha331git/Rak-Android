
/* JavaScript content from js/viewModels/rakTouchIdActivation.js in folder common */

/* JavaScript content from js/viewModels/rakTouchIdActivation.js in folder common */

/* JavaScript content from js/viewModels/appActivation.js in folder common */
App.viewModels.rakTouchIdActivation=function(rootScope,utils,scope,jsonStore,logger,EncryptDecryptService,$q,MBaaS){

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
    		self.licenseStoreSuccess="";
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
					if(WL.Client.getEnvironment() == WL.Environment.IPHONE || WL.Client.getEnvironment() == WL.Environment.IPAD){
	            		response=JSON.parse(response);
	            	}
					 if(response.status){
						 	self.clientId=response.clientID;
						 	if(self.isForgotMPINClick){
						 			 $('#submitButton').click();
//									 scope.setEvent('onAppActivationProceedClick');
							 }else{
								 $('#submitButton').click();
								 // comment by sadasiba on 22nd Jan 2016
//								 rootScope.showErrorPopup("You are already an activated user. Please Login.");
//								 $('#redirectLoginButton').click();
//								 scope.setEvent('onCustomerIdCancelClick');  // not required
							 }
					 }else{
						 if(self.isForgotMPINClick || self.isForgotMPINPasswordClick){
							 rootScope.showErrorPopup(rootScope.appLiterals.APP.ERROR_MESSAGE.ACTIVATE_USER);
							 $('#redirectLoginButton').click();
						 }else{
							 $('#submitButton').click();
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
        		if(self.maxMpinHistoryCount !== 0){
					var promise = self.getMPINHistory();
					promise.then(function() {

				if(self.userMPINHistory.length>0 && self.userMPINHistory[userId].mPINs.indexOf(self.oldMPIN)){
					rootScope.showErrorPopup(rootScope.appLiterals.APP.ERROR_MESSAGE.MPIN_NEW+self.maxMpinHistoryCount +rootScope.appLiterals.APP.ERROR_MESSAGE.MPINS);
					self.clearSetMPINData();
					return false;
				}
					},function(error){
		              });;
				}
        		// check with the local rules if password passes the MPIN rules
            	var pwdValid=self.mpinRulesValidator();
//            	alert(pwdValid);
            	if(!pwdValid){
            		self.clearSetMPINData();
            		return pwdValid;
            	}

                mAuth(function (response) {
                	if(WL.Client.getEnvironment() == WL.Environment.IPHONE || WL.Client.getEnvironment() == WL.Environment.IPAD){
                		response=JSON.parse(response);
                	}
                	if(response.status){
                		self.licenseStoreSuccess = "TRUE";
                		// save mpin to jsonstore
                		if(self.maxMpinHistoryCount !== 0){
            				var promise = self.storeMPIN();
            				promise.then(function() {
            				},function(error){
      		              });;
            			}

                		// if Touch ID is there then save
            			if(self.touchIdEnable && self.isForgotMPINClick){
            				self.setKeyChain("MPIN",self.keyChainServiceName,self.userMPIN);
            			}
                	}
                	else{
                		self.licenseStoreSuccess = "FALSE";
                	}
//                	self.clientId = response.clientID;
                	$("#setMPINClick").click();
                	self.clearSetMPINData();
                  } , function (response) {
                      },"active",[{"userMPIN":self.userMPIN,"userID":self.userId,"clientID":self.clientId,"userOTP":self.authenticateOTP,"seed":self.seed}]);
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
                	if(WL.Client.getEnvironment() == WL.Environment.IPHONE || WL.Client.getEnvironment() == WL.Environment.IPAD){
                		response=JSON.parse(response);
                	}
                		//1829
                		if(null!=self.getKeyChain("touchIDActivationStatus",self.keyChainServiceName) &&
                				true===self.getKeyChain("touchIDActivationStatus",self.keyChainServiceName)
                				&& null!=self.getKeyChain("username",self.keyChainServiceName) &&
                				self.userId!=self.getKeyChain("username",self.keyChainServiceName)){
                			rootScope.showErrorPopup(rootScope.appLiterals.APP.ERROR_MESSAGE["TOUCH_ID_MULTIPLE_USERS_NOT_ALLOWED"+biometricType]);
                		}
                	if(response.status){
                		self.licenseStoreSuccess = "TRUE";
                		self.setKeyChain("username",self.keyChainServiceName,self.userId);
                		self.setKeyChain("MPIN",self.keyChainServiceName,self.userMPIN);
                		self.setKeyChain("touchIDActivationStatus",self.keyChainServiceName,"true");
                		self.setKeyChain("isResignedActivation",self.keyChainServiceName,"true");
                	}
                	else{
                		self.licenseStoreSuccess = "FALSE";
                	}
//                	self.clientId = response.clientID;
                	$("#setMPINClick").click();
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
		self.loginUser = function(){
			if( rootScope.fields.finacleUserCorporateId !== '' && rootScope.fields.finacleUserPassword !== ''){
                // Modified for Touch id- password flow
                if (rootScope.appVersionDetails.appConfigParams[1].BUILDTYPE == 'PWD'){
                    $("#PWDLogin").click();
                }
                else{
                    mAuth(function (response) {
                          if(WL.Client.getEnvironment() == WL.Environment.IPHONE || WL.Client.getEnvironment() == WL.Environment.IPAD){
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
                          $("#MPINLogin").click();
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
				//if(self.maxMpinHistoryCount !== 0 && scope.checkMPIN(userId,self.userMPIN)){
				if(self.maxMpinHistoryCount !== 0){
					var promise = self.getMPINHistory();
					promise.then(function() {

				if(self.userMPINHistory.length>0 && self.userMPINHistory[userId].mPINs.indexOf(self.oldMPIN)){
					rootScope.showErrorPopup(rootScope.appLiterals.APP.ERROR_MESSAGE.MPIN_MODIFY_ERROR+' '+self.maxMpinHistoryCount +' '+rootScope.appLiterals.APP.ERROR_MESSAGE.MPINS);
					self.clearSetMPINData();
					return false;
				}
					},function(error){
		              });;
				}
	        	pwdValid=self.mpinRulesValidator();
	        	if(!pwdValid){
	        		self.clearSetMPINData();
	        		return pwdValid;
	        		}

//	        	// remove this piece of code
//	        	jsonStore.validateAndStoreMPIN(userId,self.maxMpinHistoryCount,self.userMPIN,
//              			function(err,result){
//            			if(err){
//            				Logger.info(err); return;
//            			}
//            			rootScope.myProfile.userMPINHistory = result[0].json;
//            		});
//	        	scope.setEvent('onSubmitClick');
//	        	return;

				mAuth(function (response) {

					if(WL.Client.getEnvironment() == WL.Environment.IPHONE || WL.Client.getEnvironment() == WL.Environment.IPAD){
	            		response=JSON.parse(response);
	            	}

	              	if(response){
	              		self.otp=self.clientId='';
	            		self.changeMPINDone=response.changeMPINDone;
	            		if(self.changeMPINDone=='FALSE'){
	            		self.otp=response.otp;
	            		self.clientId=response.clientID;
	            		}else{
	            			// save mpin to jsonstore
	            			if(self.maxMpinHistoryCount !== 0){
	            				var promise = self.storeMPIN();
	            				promise.then(function() {
	            				},function(error){
	      		              });;
	            			}

	            			// if Touch ID is there then save
	            			if(self.touchIdEnable){
	            				self.setKeyChain("MPIN",self.keyChainServiceName,self.userMPIN);
	            			}

	            		}

//	            		scope.setEvent('onSubmitClick');
	            		$("#changeMPINSubmit").click();

	            	}
	            	else{
	            		rootScope.showErrorPopup(rootScope.appLiterals.APP.ERROR_MESSAGE.MPIN_NOT_CHANGED);
	            	}
	              } , function (response) {
	            	  rootScope.showErrorPopup(rootScope.appLiterals.APP.ERROR_MESSAGE.MPIN_UPDATE_ERROR);
	                  },"change",[{"oldPin":self.oldMPIN,"userID":userId,"newPin":self.userMPIN}]);
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

			 if(!self.touchIdEnable){
	                if(self.activeDevice >= self.maxDeviceCount && !self.maxDeviceDeactivate ){
	                    scope.setEvent('onManageDevicePage');
	                }
	            }

			if(responseList[0].hasOwnProperty('errorMessage')){
					if(WL.Client.getEnvironment() == WL.Environment.IPHONE || WL.Client.getEnvironment() == WL.Environment.IPAD){
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
					//1829
            		if(null!=self.getKeyChain("touchIDActivationStatus",self.keyChainServiceName) &&
            				true===self.getKeyChain("touchIDActivationStatus",self.keyChainServiceName)
            				&& null!=self.getKeyChain("username",self.keyChainServiceName) &&
            				self.userId!=self.getKeyChain("username",self.keyChainServiceName)){
            			rootScope.showErrorPopup(rootScope.appLiterals.APP.ERROR_MESSAGE.TOUCH_ID_MULTIPLE_USERS_NOT_ALLOWED);
            		}
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
            self.checkTouchIDStatus();
            if (!self.isTouchIdNotEnrolled){
                rootScope.displayTouchIDPopup = true;
                //			self.touchIdEnable = true;
                //			self.userId = "RMBPWC1";
                //			self.username = rootScope.loginUsername;
                //			self.clientId = "";
                //			 alert("isResignedActivationStatus"+rootScope.isResignedActivationStatus);
                //	         alert("isTouchIDActivation"+rootScope.isTouchIDActivation);
                rootScope.showConfirmBox(rootScope.appLiterals.APP.ERROR_MESSAGE.TOUCHID_REG,"Yes","Cancel",self.callBackFunctionForConfirnBox);
            }
            else{
                rootScope.showErrorPopup(self.touchIDErrorMsg);
                rootScope.appActivation.setKeyChain("isResignedActivation",self.keyChainServiceName,"true");
            }
		};

		self.callBackFunctionForConfirnBox = function(){
			if(rootScope.confirmResult){
				self.userId = rootScope.fields.finacleUserCorporateId;
				scope.setEvent('onAppActivationProceedClick');
			}else{
				rootScope.appActivation.setKeyChain("isResignedActivation",self.keyChainServiceName,"true");
			}
		};

		self.checkTouchIDStatus = function(){
//			alert('called');
			if(WL.Client.getEnvironment() == WL.Environment.IPHONE || WL.Client.getEnvironment() == WL.Environment.IPAD){
				cordova.exec(function(response){
					self.touchIdEnable = true;
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
					}, function(response){
//						rootScope.isTouchIDenable = false;
						rootScope.isTouchIDLogin = false;
//						alert('touchIDActivationStatus fail'+response);
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

				}, "TouchID", "isAvailable", []);
		  }
		};

		self.checkResignedActivationStatus = function(){
			if(WL.Client.getEnvironment() == WL.Environment.IPHONE || WL.Client.getEnvironment() == WL.Environment.IPAD){
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
			    rootScope.touchIDLoginUser=true;
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
		        	   rootScope.showErrorPopup( msg );
		            	}
		            );
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
			if(rootScope.isTouchIDActivation){
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
			var deferred = $q.defer();
			jsonStore.getAllMPINHistory(function(err,result){
				if(err){
					Logger.info(err);
				}
				if(result.length>0){
					self.userMPINHistory = result[0].json;
				}
				deferred.resolve();
			});
			return deferred.promise;
		};

		self.storeMPIN=function(){
			var deferred = $q.defer();
			jsonStore.validateAndStoreMPIN(self.userId,self.maxMpinHistoryCount,self.userMPIN,
          			function(err,result){
        			if(err){
        				Logger.info(err);
        			}
        			//rootScope.myProfile.userMPINHistory = result[0].json;
        			Logger.info("jsonStore.validateAndStoreMPIN is success");
        			deferred.resolve();
        		});
			return deferred.promise;
		};

		self.touchIdRegister='N';

		self.toggleRegClick=function(){
            console.log("isTouchIDLogin"+ rootScope.isTouchIDLogin);
              console.log("isTouchIDActivation" + rootScope.isTouchIDActivation);
if(WL.Client.getEnvironment() != WL.Environment.ANDROID){
		//	rootScope.isTouchIDLogin=!rootScope.isTouchIDLogin;
			if(rootScope.isTouchIDActivation && rootScope.isTouchIDLogin){

                if(null!=rootScope.appActivation.getKeyChain("touchIDActivationStatus",rootScope.appActivation.keyChainServiceName) &&
                   true===rootScope.appActivation.getKeyChain("touchIDActivationStatus",self.keyChainServiceName)
                   && null!=rootScope.appActivation.getKeyChain("username",rootScope.appActivation.keyChainServiceName) &&
                   rootScope.fields.finacleUserCorporateId!=rootScope.appActivation.getKeyChain("username",rootScope.appActivation.keyChainServiceName)){
                    rootScope.showErrorPopup(rootScope.appLiterals.APP.ERROR_MESSAGE.TOUCH_ID_MULTIPLE_USERS_NOT_ALLOWED);
                    return;
                }
                console.log("isTouchIDActivation" + rootScope.isTouchIDActivation);
				self.touchIdRegister="N";
				rootScope.appActivation.setKeyChain("isResignedActivation",self.keyChainServiceName,"false");
                rootScope.appActivation.setKeyChain("touchIDActivationStatus",rootScope.appActivation.keyChainServiceName,"false");
                rootScope.isTouchIDLogin=false;
                rootScope.isTouchIDActivation=false;

			}else if(!rootScope.isTouchIDActivation && !rootScope.isTouchIDLogin){

				 self.keychainPwd = EncryptDecryptService.encryption(rootScope.fields.finacleUserPassword);

                console.log("Username "+rootScope.fields.finacleUserCorporateId);
                console.log("MPIN "+self.keychainPwd);

		         rootScope.appActivation.setKeyChain("username",rootScope.appActivation.keyChainServiceName,rootScope.fields.finacleUserCorporateId);
		         rootScope.appActivation.setKeyChain("MPIN",rootScope.appActivation.keyChainServiceName,self.keychainPwd);
		         rootScope.appActivation.setKeyChain("isResignedActivation",rootScope.appActivation.keyChainServiceName,"true");
		         rootScope.appActivation.setKeyChain("touchIDActivationStatus",rootScope.appActivation.keyChainServiceName,"true");
                rootScope.appActivation.setKeyChain("registeredCIFID",rootScope.appActivation.keyChainServiceName,rootScope.customerId);
		         self.keychainPwd = '';
                rootScope.isTouchIDLogin=true;
                rootScope.isTouchIDActivation=true;

				self.touchIdRegister="Y";
                console.log("getkey chain function  ");


		       }
}
			else if(WL.Client.getEnvironment() == WL.Environment.ANDROID){
				console.log("Inside activation for Android");
				var appId=WL.Client.getAppProperty(WL.AppProperty.APP_DISPLAY_NAME);
				console.log("Activation for android "+rootScope.fields.finacleUserCorporateId +" Password "+rootScope.fields.finacleUserPassword);
				if(rootScope.isTouchIDActivation && rootScope.isTouchIDLogin){
					rootScope.isTouchIDActivation= false;
					rootScope.isTouchIDLogin=false;
					 FPstoreDetails(function(successResp){
			            	console.log("Stored Success fully for deregistration");
			            },function(errorResponse){
			            	console.log("Storage failure");
			            },'','','','','');
					
					
				}
				else if(!rootScope.isTouchIDActivation && !rootScope.isTouchIDLogin){
				self.keychainPwd = EncryptDecryptService.encryption(rootScope.fields.finacleUserPassword);
				var encryptConfig = {
					    clientId: appId,
					    username: rootScope.fields.finacleUserCorporateId,
					    password: self.keychainPwd,
					    disableBackup:true
					   
					 
					};
				FingerprintAuth.encrypt(encryptConfig, successCallback, errorCallback);

				function successCallback(result) {
				    console.log("successCallback(): " + JSON.stringify(result));
				    if (result.withFingerprint) {
				    	rootScope.isTouchIDLogin=true;
			            rootScope.isTouchIDActivation=true;
			            
			           
			            FPstoreDetails(function(successResp){
			            	console.log("Stored Success fully for registration");
			            },function(errorResponse){
			            	console.log("Storage failure");
			            },rootScope.fields.finacleUserCorporateId,self.keychainPwd,result.token,"true",rootScope.customerId);
			            rootScope.$apply();
				        console.log("Successfully encrypted credentials.");
				        
				        console.log("Encrypted credentials: " + result.token);  
				    } else if (result.withBackup) {
				    	 console.log("backup option disabled");  
				    
				    }
				}

				function errorCallback(error) {
				    if (error === "Cancelled") {
				        console.log("FingerprintAuth Dialog Cancelled!");
				    } else {
				        console.log("FingerprintAuth Error: " + error);
				    }
				}
			}
			}
		};

		self.touchIdReg={
            // For Quick login Flag
				touchIdEnableForRak:false,
            // For Touch Id register Flow Flag
				touchIdRegFlowForRak:false,
                userIdPwdChange:false,
                isReRegister:false,
                retailLoginQuickBalance:"N",
                authorization_action:'',
                swtchApp:'N',
        		actionDetails:[],
        		isChangeFlow:false,
        		fromLoggedInflow:false,
        		faceIDEnabled:false,

				initLoginFlag:function(){
					rootScope.quickBalValue='N';
					rootScope.touchIdFlow='N';
                    rootScope.passwordChangeFlow='N';
                    //added for iPhn 10
                    if(MBaaS.isIPhoneEnv() && window.device.model && (window.device.model=='iPhone10.3' ||window.device.model=='iPhone10.6')){
                    	 faceIDEnabled=true;
                    }
                    else{
                    	 faceIDEnabled=false;
                    }
                    rootScope.envTypeAndroid='N';
                    // CHANGES FOR RAK MFP 8
                    console.log("ANDROID CHECK TO BE REMOVED");
                    if(MBaaS.isAndroidEnv()){
                     rootScope.envTypeAndroid='Y';
                    }

//                    if(WL.Environment.ANDROID==WL.Client.getEnvironment()){
//                    	rootScope.envTypeAndroid='Y';
//                    }
                    // CHANGES FOR RAK MFP 8
				},

				initTouchActivationLoginPage:function(){
					rootScope.touchIdFlow='Y';
                    rootScope.quickBalValue='Y';
                    rootScope.passwordChangeFlow='Y';
                    rootScope.isUserLoggedIn=false;
                    self.touchIdReg.isReRegister=false;
                    self.touchIdReg.retailLoginQuickBalance="N";

				},

				initRegResponse:function(responseList){
					if ((responseList[0] != undefined && responseList[0]
					.hasOwnProperty('errorMessage'))
					|| (responseList[1] != undefined && responseList[1]
							.hasOwnProperty('errorMessage'))
					|| (responseList != undefined && responseList
							.hasOwnProperty('errorMessage'))) {

				return false;
			}
			// 772495
			else if (responseList.hasOwnProperty('action')) {
				self.touchIdReg.authorization_action = responseList.action;
				self.touchIdReg.actionDetails = responseList.actionDetails;
				self.touchIdReg.isChangeFlow=true;
				self.touchIdReg.swtchApp = responseList.swtchApp;
			} else if (responseList[0].hasOwnProperty('authorization_action')) {
				self.touchIdReg.authorization_action = responseList[0].authorization_action;
				self.touchIdReg.actionDetails = responseList[0].actionDetails;
			}
			// 770446
			else if (responseList[1] != undefined
					&& responseList[1].hasOwnProperty('authorization_action')) {
				self.touchIdReg.authorization_action = responseList[1].authorization_action;
				self.touchIdReg.actionDetails = responseList[1].actionDetails;
			}
				},


        submitReRegisterFlow:function(){
        	 self.touchIdReg.isReRegister=true;
        	 self.touchIdReg.retailLoginQuickBalance="Y";
        	  rootScope.quickBalValue='N';
            if(!(rootScope.fields.finacleUserCorporateId || rootScope.fields.finacleUserPassword)){
                rootScope.pageErrorArr['rootScope.fields.finacleUserCorporateId']=rootScope.fields.finacleUserCorporateId ? "":null;
                rootScope.pageErrorArr['rootScope.fields.finacleUserPassword']=rootScope.fields.finacleUserCorporateId ? "":null;
                return;
            }

             rootScope.isUserLoggedIn=true;

        },

				initTouchIdActivationPage:function(){
                    console.log("Passowrd change flow"+rootScope.passwordChangeFlow);


                    if(rootScope.passwordChangeFlow && rootScope.passwordChangeFlow=='Y' && !self.touchIdReg.fromLoggedInflow){
                        rootScope.isTouchIDActivation=false;
                        rootScope.isTouchIDLogin=false;
                        rootScope.$apply();
                    }
                    else{
                        rootScope.appActivation.checkTouchIDStatus();
                    }
                    console.log("touchidlogin value "+rootScope.isTouchIDLogin);
                    console.log("isTouchIDActivation value "+rootScope.isTouchIDActivation);
				},

				swipeLeftForBalance:function(){
					if(rootScope.appActivation.touchIdEnable){
						scope.setEvent('onSwipeForQuickBalancePage');
					}
				},

           initTouchRegistration :function(){

               if(self.touchIdReg.touchIdRegFlowForRak){
                   scope.setEvent("enableTouchId");
               }

               if(rootScope.quickBalValue=='Y'){
                   scope.setEvent('moveToQuickBalance');
               }

            },

        addPwdtoKeyChain:function(){
            console.log("INSIDE RAK TOUCH ACTIVATION");
            if(self.touchIdReg.userIdPwdChange){
                rootScope.appActivation.setKeyChain("username",rootScope.appActivation.keyChainServiceName,rootScope.fields.finacleUserCorporateId);
                rootScope.myProfile.addPwdToKeychain();

            }

            self.touchIdReg.userIdPwdChange=false;

        },

        fireTouchLogin:function(){
            rootScope.quickBalValue='Y';

            console.log('Before call for Quick Balance'+rootScope.quickBalValue);
            scope.setEvent('onPwdLoginClickforTouchID');
        },

        swipeForTouchId:function(position){
            // Added below line incase user deletes Fingerprint from device when app is still running
            //rootScope.isTouchIDActivation=false;
            //rootScope.isTouchIDActivation=rootScope.appActivation.getKeyChain("touchIDActivationStatus",rootScope.appActivation.keyChainServiceName);
            //rootScope.appActivation.checkTouchIDStatus();
//            rootScope.$apply();
            if(!rootScope.$$phase){
                console.log("Safe root scope apply");

                rootScope.$apply();
            }else{
                 console.log("Skipped root scope apply as it was already in progress");

            }

            if(WL.Client.getEnvironment() == WL.Environment.IPHONE || WL.Client.getEnvironment() == WL.Environment.IPAD){

            cordova.exec(function(response){
                         console.log("Inside swipe call fr extra param"+response);
                         rootScope.customerId=response;

                         }, function(response){
                         //				alert('ResignedActivationStatus fail-'+response);
                         rootScope.customerid = response;
                         }, "Keychain", "getForKey",["registeredCIFID", rootScope.appActivation.keyChainServiceName]);
            }


            console.log("rootScope.appActivation.touchIdEnable"+rootScope.appActivation.touchIdEnable +"rootScope.isTouchIDLogin"+rootScope.isTouchIDLogin+"rootScope.isTouchIDActivation"+rootScope.isTouchIDActivation+"rootScope.appActivation.isTouchIdNotEnrolled"+rootScope.appActivation.isTouchIdNotEnrolled);
            if(rootScope.appActivation.touchIdEnable && rootScope.isTouchIDLogin && rootScope.isTouchIDActivation && !rootScope.appActivation.isTouchIdNotEnrolled ){

                console.log("Inside touch id call"+(!rootScope.appActivation.isTouchIdNotEnrolled));
                FPretrieveDetails(function(response){
                	console.log("The retrieved details from Device"+JSON.stringify(response));
                	rootScope.customerId=response.registeredCIFID;
                },
                function(errorResponse){
      			  
      		  },{});
                rootScope.appActivation.touchId();
            }
//        }
        
//        else if(WL.Client.getEnvironment() == WL.Environment.ANDROID){
//        	
//        }
		}
};
}
		