App.viewModels.StepupAuthenticate=function(Logger,scope,rootScope){	
	var self=this;
	
	self.acceptTermscondition="N";
	self.termsAndConditionLogin="N";
	/**
	 * This utility will initialise variable
	 * @constructor
	 * @param {string} msg- messege to be displayed on alert box
	 */
	self.reset=function(){
		self.primaryAuthMode='';
		self.secondaryAuthMode='';
		self.primaryAuthModeVal='';
		self.secondaryAuthModeVal='';
		self.primaryAuthModeValidation=false;
		self.authorization_action='';
		self.actionDetails=[];
		self.RSAorOTP='';
		self.questionIds='';
		self.answers='';
		self.selectedQuestions=[];
		self.termsAndConditionLogin="N";
	};
	self.reset();
	self.otpLinkenable=true;
	self.acceptTermscondition="N";
	/**
	 * It will capture step up response
	 * @constructor
	 * @param {string} msg- messege to be displayed on alert box
	 */
	self.initResponse = function(responseList) {
		rootScope.isAuthorizationFlow=false;
		rootScope.isSecondaryAuthModeVal=false;
		// 772495
		if ((responseList[0] != undefined && responseList[0]
				.hasOwnProperty('errorMessage'))
				|| (responseList[1] != undefined && responseList[1]
						.hasOwnProperty('errorMessage'))
				|| (responseList != undefined && responseList
						.hasOwnProperty('errorMessage'))) {
			// empty all the variables
			// 772495
			self.clearFields(); // clearing variables
			return false;
		}else{
			self.authorization_action='';
			self.actionDetails=[];
			self.setNormalAuthorizationModes(responseList);
			if (responseList.hasOwnProperty('action')) {
				self.authorization_action = responseList.action;
				self.actionDetails = responseList.actionDetails;
			} else if (responseList[0].hasOwnProperty('authorization_action')) {
				self.authorization_action = responseList[0].authorization_action;
				self.actionDetails = responseList[0].actionDetails;
			}
			// 770446
			else if (responseList[1] != undefined
					&& responseList[1].hasOwnProperty('authorization_action')) {
				self.authorization_action = responseList[1].authorization_action;
				self.actionDetails = responseList[1].actionDetails;
			}
			
			if(self.authorization_action){
				self.secondaryAuthModeValidation=true;
				rootScope.isSecondaryAuthModeVal=true;
				rootScope.secondaryAuthModeVal=self.authorization_action;
			}
		}
	};
	
	self.setNormalAuthorizationModes=function(responseList){
		if (responseList !=undefined && responseList.hasOwnProperty('auth')) {
			self.primaryAuthMode=responseList.auth;
			self.secondaryAuthMode='';
		}else if (responseList[0] != undefined && responseList[0].hasOwnProperty('auth')) {
			self.primaryAuthMode=responseList[0].auth;
			self.secondaryAuthMode='';
		}else if (responseList[1] != undefined && responseList[1].hasOwnProperty('auth')) {
			self.primaryAuthMode=responseList[1].auth;
			self.secondaryAuthMode='';
		}else if (responseList[2] != undefined && responseList[2].hasOwnProperty('auth')) {
			self.primaryAuthMode=responseList[2].auth;
			self.secondaryAuthMode='';
		}
		
		if(self.primaryAuthMode){
			self.primaryAuthModeValidation=true;
			rootScope.isAuthorizationFlow=true;
		}
		
		self.primaryAuthModeVal='';
		self.secondaryAuthModeVal='';
		
	};
	
	//772495
	self.clearFields=function(){
		self.RSAorOTP='';
		self.questionIds='';
		self.answers='';
		//self.primaryAuthMode='';
		//self.secondaryAuthMode='';
		self.primaryAuthModeVal='';
		self.secondaryAuthModeVal='';
		if(_.isUndefined(self.primaryAuthMode) || self.primaryAuthMode==null || self.primaryAuthMode==""){
			self.primaryAuthModeValidation=false;
		}
	};
	
	self.disableOTPClick=function(){
        self.otpLinkenable=false;
        if(_.isUndefined(self.actionDetails[0])){
        	setTimeout(function(){
                self.otpLinkenable=true;
                rootScope.$apply();
            },1000);
        }else{
        	setTimeout(function(){
                self.otpLinkenable=true;
                rootScope.$apply();
            },self.actionDetails[0].params.regenerateOTPTimeoutInSeconds *1000);
        }
    };
    self.disablePrimaryOTPClick=function(){
        self.otpLinkenable=false;
        if(_.isUndefined(self.primaryAuthMode)){
        	setTimeout(function(){
                self.otpLinkenable=true;
                rootScope.$apply();
            },1000);
        }else{
        	setTimeout(function(){
                self.otpLinkenable=true;
                rootScope.$apply();
            },120 *1000);
        }
    };
    
		self.selectedQuestionHandler=function(){
			var selectedDetails=[];
			var res=[];
			var count=0;
			selectedDetails=self.actionDetails[0].params.Questions;
			
			for(var i=0;i<selectedDetails.length;i++){
				if(self.selectedQuestions[i]){
					res.push(selectedDetails[i].questionId+','+selectedDetails[i].answer);
					count++;
			}
				}
			
			self.answers=res.join("|");
			self.loopcount=count.toString();
			
			return self.answers;
			};
			
			self.initSuccessPage=function(responseList){
					self.successMessage=responseList.setSecQuestMessage;
			},
			
	
	/**
	 * this utility will convert array key to string
	 * @constructor
	 */
	self.onContinueClick = function(){		
		if(self.actionDetails!=undefined && self.actionDetails.length != 0 && self.actionDetails[0].params.hasOwnProperty("Questions")){
			var res=[];
			for(var count=0;count<self.actionDetails[0].params.Questions.length; count++){
				res.push(self.actionDetails[0].params.Questions[count].questionId+','+self.actionDetails[0].params.Questions[count].answer);
			}
			self.answers=res.join("|");
			self.loopcount=count.toString();
		}
		return self.answers;
	};
	
	self.checkTermsAndConditionFlg=function(){
		
			if(self.acceptTermscondition && self.acceptTermscondition==='N' ){
			rootScope.showErrorPopup(rootScope.appLiterals.APP.RAK_COMMON.SELECTTERMSANDCONDITION);
			self.acceptTermscondition="N";
			}
		else {
			scope.setEvent('onStepupAuthenticateTermAndConditionProceedClick');
			self.acceptTermscondition="Y";
			self.termsAndConditionLogin="Y";
		}
		
		};
	
	
};