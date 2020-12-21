App.viewModels.rakRegister = function(scope, UIControlsService, Logger) {

	var self = this;

	self.setFormatedDate = function( unformatedDate ) {

	     var today = new Date(unformatedDate);
	     var dd = today.getDate();
	     var mm = today.getMonth()+1; //January is 0!

	     var yyyy = today.getFullYear();
	     if(dd<10){
				dd = '0' + dd;
	     }
	     if(mm<10){
				mm = '0' + mm;
	     }

			var formatDate = dd + '/' + mm + '/' + yyyy;

	     return formatDate;

	 };
	 
	 self.constants={
			 ACCNOTYPE:'A'
	 };


	self.RegistrationModel = {
		selectedNoType:"",
		enteredAcctNo:"",
		isRetailNormal:"false",
		isRetailOr:"false",
		isRetailAnd:"false",
		isSme:"false",
		isShowMobileNo:"false",
		mobileNo:"",
		//CHANGES DONE AS FIX OF PROUAT-2445 START
		dob:null,
		//CHANGES DONE AS FIX OF PROUAT-2445 END
		formatedDate:"",
		passportNo:"",
		otp:"",
		isReGenOtpBtnClicked:false,
		sectionId:"",
		requestType:"",
		cardNo:"",
		pin:"",
		successMsg:"",
		pwdTypeFlag:"",
		changeTransactionPassword:false,
		changeLoginPassword:false,
		isProceedClicked:false,
		//CHANGES DONE AS FIX OF PRCU-1412 START
		isforgotUserIdClicked:false,
		isforgotPasswordClicked:false,
		isEnableUserIdClicked:false,
		isRegisterClicked:false,
		userIdsuccessMsg:'',
		previewDateOne:'',
		//CHANGES DONE AS FIX OF PRCU-1412 END
		
	};

	//CHANGES DONE AS FIX OF PRCU-1412 START
	self.clearFlag = function(){
	    self.RegistrationModel.isforgotUserIdClicked=false;
		self.RegistrationModel.isforgotPasswordClicked=false;
		self.RegistrationModel.isEnableUserIdClicked=false;
		self.RegistrationModel.isRegisterClicked=false;
	};
	//CHANGES DONE AS FIX OF PRCU-1412 END
	
	self.resetRegistrationModelData = function(){
		self.RegistrationModel.selectedNoType=self.constants.ACCNOTYPE;
		self.RegistrationModel.enteredAcctNo="";
		self.RegistrationModel.isRetailNormal="false";
		self.RegistrationModel.isRetailOr="false";
		self.RegistrationModel.isRetailAnd="false";
		self.RegistrationModel.isSme="false";
		self.RegistrationModel.isShowMobileNo="false";
		self.RegistrationModel.mobileNo="";
		//CHANGES DONE AS FIX OF PROUAT-2445 START
		self.RegistrationModel.dob=null,
		//CHANGES DONE AS FIX OF PROUAT-2445 START
		self.RegistrationModel.displayDate=new Date();
		self.RegistrationModel.formatedDate="";
		self.RegistrationModel.passportNo="";
		self.RegistrationModel.otp="";
		self.RegistrationModel.isReGenOtpBtnClicked=false,
		self.RegistrationModel.sectionId="";
		self.RegistrationModel.requestType="";
		self.RegistrationModel.cardNo="";
		self.RegistrationModel.pin="";
		self.RegistrationModel.successMsg="";
		self.RegistrationModel.pwdTypeFlag="";
		self.RegistrationModel.userIdsuccessMsg='';
		self.RegistrationModel.previewDateOne='';
	};

	self.initForgotPwdSelectionRadio = function(){
		if(self.RegistrationModel.requestType=="FPON"){
			self.RegistrationModel.pwdTypeFlag="S";
		}
	};
	
	self.chkOtpValidation = function(responsesList){
		self.RegistrationModel.otpCheck = responsesList[0].otpCheck;
		self.RegistrationModel.otpMessage = responsesList[0].successMsg;
	};
	
	/*self.initAccCardSelectionRadio = function(responsesList){
		if(responsesList==undefined || (responsesList!=undefined && !responsesList[0].hasOwnProperty('errorMessage'))){
			self.RegistrationModel.selectedNoType='A';
		}
	};*/

	self.initSelfRegistrationData = function(responsesList){

		if (!responsesList[0].hasOwnProperty('errorMessage')) {
			self.jsessionid=responsesList[0].sessKey;
			if (responsesList[0].hasOwnProperty('isRetailNormal')){
				self.RegistrationModel.isRetailNormal = responsesList[0].isRetailNormal;
			}
			if (responsesList[0].hasOwnProperty('isRetailOr')){
				self.RegistrationModel.isRetailOr = responsesList[0].isRetailOr;
			}
			if (responsesList[0].hasOwnProperty('isRetailAnd')){
				self.RegistrationModel.isRetailAnd = responsesList[0].isRetailAnd;
			}
			if (responsesList[0].hasOwnProperty('isRetailNormal')){
				self.RegistrationModel.isSme = responsesList[0].isSme;
			}
			if (responsesList[0].hasOwnProperty('isShowMobileNo')){
				self.RegistrationModel.isShowMobileNo = responsesList[0].isShowMobileNo;
			}
			if (responsesList[0].hasOwnProperty('mobileNo')){
				if(responsesList[0].mobileNo !='')
					self.RegistrationModel.mobileNo = responsesList[0].mobileNo;
			}
			//CHNAGES DONE AS FIX OF PROUAT-2445 START
			if (self.RegistrationModel.formatedDate==""){
				if(self.RegistrationModel.dob!=null)
					{
				  //  self.RegistrationModel.dob = self.setFormatedDate(self.RegistrationModel.dob);
					}
			}
			//CHNAGES DONE AS FIX OF PROUAT-2445 END
			
			  if (responsesList[0].hasOwnProperty('previewDate')) {
                   self.RegistrationModel.previewDateOne =        responsesList[0].previewDate;
            }
			   
			if (responsesList[0].hasOwnProperty('sectionId')){
				self.RegistrationModel.sectionId = responsesList[0].sectionId;
				
			}
		}
	};
	
	
    self.populateCurrentDateDetails = function(){
		if(self.RegistrationModel.displayDate !="" && self.RegistrationModel.displayDate !=null){
			var date=self.RegistrationModel.displayDate.getDate().toString();
			var currMonth = self.RegistrationModel.displayDate.getMonth() + 1;
			var month=currMonth.toString();
			var year=self.RegistrationModel.displayDate.getFullYear().toString();
			self.RegistrationModel.date =date;
			self.RegistrationModel.month=month;
			self.RegistrationModel.year=year;
		}
	};

	self.formatDate = function(selectedDate){
		//self.RegistrationModel.formatedDate = self.setFormatedDate(date);
		
		  	self.RegistrationModel.displayDate = selectedDate;
	  		self.populateCurrentDateDetails();
	  		self.RegistrationModel.selectedDate_day =self.RegistrationModel.date;
	  		self.RegistrationModel.selectedDate_month=self.RegistrationModel.month;
	  		self.RegistrationModel.selectedDate_year=self.RegistrationModel.year;
		
		
	};

	self.setPasswordFlag = function(){
		if(self.RegistrationModel.pwdTypeFlag=="S"){
			self.RegistrationModel.changeLoginPassword = true;
		}
		if(self.RegistrationModel.pwdTypeFlag=="T"){
			self.RegistrationModel.changeTransactionPassword = true;
		}
		if(self.RegistrationModel.pwdTypeFlag=="B"){
			self.RegistrationModel.changeLoginPassword = true;
			self.RegistrationModel.changeTransactionPassword = true;
		}
	};

	self.generateOTPServiceCall = function(){
		if(self.RegistrationModel.isReGenOtpBtnClicked){
			//rootScope.showErrorPopup("OTP Generated Successfully and Sent to your Mobile Number.","OK");
			scope.setEvent('rakGenerateOTPServiceCallEvent');
			self.RegistrationModel.isReGenOtpBtnClicked = false;
		}
	};

	self.initSelfRegistrationPostOTPConfirmData = function(responsesList){
		if (responsesList[0].hasOwnProperty('sectionId')){
			self.RegistrationModel.sectionId = responsesList[0].sectionId;
		}
		if (responsesList[0].hasOwnProperty('cardNo')){
			self.RegistrationModel.cardNo = responsesList[0].cardNo;
		}
		if (responsesList[0].hasOwnProperty('successMsg')){
			self.RegistrationModel.successMsg = responsesList[0].successMsg;
		}
		if (responsesList[0].hasOwnProperty('emailId')){
			self.LoginTxnPwdModel.email = responsesList[0].emailId;
		}
	};


	self.passwordType={
			Both:0,
			Transaction:1,
			Login:2,
			None:-1
	};

	self.LoginTxnPwdModel ={
			userId:"",
			loginPwd:"",
			loginPwdConfirm:"",
			txnPwd:"",
			txnPwdConfirm:"",
			email:"",

			strengthRules:[],
			currentPasswordType:self.passwordType.None,

			isLgnTooShort:false,
			isLgnWeak:false,
			isLgnFair:false,
			isLgnStrong:false,
			isLgnIronclad:false,

			isTxnTooShort:false,
			isTxnWeak:false,
			isTxnFair:false,
			isTxnStrong:false,
			isTxnIronclad:false,

			icDigitsRE:"",
			icSpecialsRE:"",
			weakDigitsRE:"",
			weakSpecialsRE:"",
			fairDigitsRE:"",
			fairSpecialsRE:"",
			strongDigitsRE:"",
			strongSpecialsRE:"",
			passwordStrengthLgnText:"",
			passwordStrengthTxnText:"",
			hideTxnPasswordStrength:true,
			hideLgnPasswordStrength:true,
			changeTransactionPassword:false,
			changeLoginPassword:false,

			initPasswordStrengthRules:function(response){
				if(self.RegistrationModel.sectionId=="ORSP"){
					self.clearStrengthData();
					if(!response[0].hasOwnProperty('errorMessage')){
						if(response[0].hasOwnProperty('rules')){
							self.LoginTxnPwdModel.strengthRules=response[0].rules[0];
							self.LoginTxnPwdModel.generateRegExpBasedOnRules();
						}
					}
				}
			},

			generateRegExpBasedOnRules:function(){

				//1. Check the rules for ironclad, strong, fair and weak
				//2. Create regex for each of these rules
				//Create the RegExp for ironclad rules
				var ironcladRules=self.LoginTxnPwdModel.strengthRules.ironclad;
				self.LoginTxnPwdModel.icDigitsRE = new RegExp(self.LoginTxnPwdModel.getDigitsRegExp(ironcladRules.digits));
				//self.LoginTxnPwdModel.icCharsRE = new RegExp(self.LoginTxnPwdModel.getCharsRegExp(ironcladRules.char));
				self.LoginTxnPwdModel.icSpecialsRE = new RegExp(self.LoginTxnPwdModel.getSpecialsRegExp(ironcladRules.specials));

				//Create the RegExp for strong rules
				var strongRules=self.LoginTxnPwdModel.strengthRules.strong;
				self.LoginTxnPwdModel.strongDigitsRE = new RegExp(self.LoginTxnPwdModel.getDigitsRegExp(strongRules.digits));
				//self.LoginTxnPwdModel.strongCharRE = new RegExp(self.LoginTxnPwdModel.getCharsRegExp(strongRules.char));
				self.LoginTxnPwdModel.strongSpecialsRE = new RegExp(self.LoginTxnPwdModel.getSpecialsRegExp(strongRules.specials));

				//Create the RegExp for fair rules
				var fairRules=self.LoginTxnPwdModel.strengthRules.fair;
				self.LoginTxnPwdModel.fairDigitsRE = new RegExp(self.LoginTxnPwdModel.getDigitsRegExp(fairRules.digits));
				//self.LoginTxnPwdModel.fairCharRE = new RegExp(self.LoginTxnPwdModel.getCharsRegExp(fairRules.char));
				self.LoginTxnPwdModel.fairSpecialsRE = new RegExp(self.LoginTxnPwdModel.getSpecialsRegExp(fairRules.specials));

				//Create the RegExp for weak rules
				var weakRules=self.LoginTxnPwdModel.strengthRules.weak;
				self.LoginTxnPwdModel.weakDigitsRE = new RegExp(self.LoginTxnPwdModel.getDigitsRegExp(weakRules.digits));
				//self.LoginTxnPwdModel.weakCharRE = new RegExp(self.LoginTxnPwdModel.getCharsRegExp(weakRules.char));
				self.LoginTxnPwdModel.weakSpecialsRE = new RegExp(self.LoginTxnPwdModel.getSpecialsRegExp(weakRules.specials));
			},

	};


	self.resetPwdFields = function(){
		self.LoginTxnPwdModel.userId = "";
		self.LoginTxnPwdModel.loginPwd = "";
		self.LoginTxnPwdModel.loginPwdConfirm = "";
		self.LoginTxnPwdModel.txnPwd = "";
		self.LoginTxnPwdModel.txnPwdConfirm = "";
		//self.LoginTxnPwdModel.email = "";

	};

	self.clearStrengthData = function(){
		self.LoginTxnPwdModel.isTxnTooShort=false;
		self.LoginTxnPwdModel.isTxnWeak = false;
		self.LoginTxnPwdModel.isTxnFair = false;
		self.LoginTxnPwdModel.isTxnStrong = false;
		self.LoginTxnPwdModel.isTxnIronclad = false;

		self.LoginTxnPwdModel.isLgnTooShort=false;
		self.LoginTxnPwdModel.isLgnWeak = false;
		self.LoginTxnPwdModel.isLgnFair = false;
		self.LoginTxnPwdModel.isLgnStrong = false;
		self.LoginTxnPwdModel.isLgnIronclad = false;

		self.LoginTxnPwdModel.passwordStrengthLgnText="";
		self.LoginTxnPwdModel.passwordStrengthTxnText="";
		self.LoginTxnPwdModel.hideLgnPasswordStrength=true;
		self.LoginTxnPwdModel.hideTxnPasswordStrength=true;
	},


	//This function checks the strength of the password
	self.checkPasswordStrength = function(password,isAppactivation){
		if(password.length === 0){
			if(self.LoginTxnPwdModel.currentPasswordType === self.passwordType.Transaction)
				self.LoginTxnPwdModel.hideTxnPasswordStrength=true;
			if(self.LoginTxnPwdModel.currentPasswordType == self.passwordType.Login)
				self.LoginTxnPwdModel.hideLgnPasswordStrength=true;
			return;
		}
		else{
			if(self.LoginTxnPwdModel.currentPasswordType == self.passwordType.Transaction)
				self.LoginTxnPwdModel.hideTxnPasswordStrength=false;
			if(self.LoginTxnPwdModel.currentPasswordType == self.passwordType.Login)
				self.LoginTxnPwdModel.hideLgnPasswordStrength=false;
		}
		//Check the first criteria for password strength i.e. min length
		//If password is greater than min length then proceed, else return weak

		//first set all the bools to false.
		if(self.LoginTxnPwdModel.currentPasswordType == self.passwordType.Transaction){
			self.LoginTxnPwdModel.isTxnTooShort=false;
			self.LoginTxnPwdModel.isTxnWeak = false;
			self.LoginTxnPwdModel.isTxnFair = false;
			self.LoginTxnPwdModel.isTxnStrong = false;
			self.LoginTxnPwdModel.isTxnIronclad = false;
		}
		if(self.LoginTxnPwdModel.currentPasswordType == self.passwordType.Login){
			self.LoginTxnPwdModel.isLgnTooShort=false;
			self.LoginTxnPwdModel.isLgnWeak = false;
			self.LoginTxnPwdModel.isLgnFair = false;
			self.LoginTxnPwdModel.isLgnStrong = false;
			self.LoginTxnPwdModel.isLgnIronclad = false;
		}

		var minLength=parseInt(self.LoginTxnPwdModel.strengthRules.minLengthOfPassword);
		if(password.length < minLength){
			//password is weak
			//self.LoginTxnPwdModel.isTooShort=true;
			if(self.LoginTxnPwdModel.currentPasswordType == self.passwordType.Transaction){
				self.LoginTxnPwdModel.isTxnTooShort=true;
				self.LoginTxnPwdModel.passwordStrengthTxnText = "Too Short";
			}
			else if(self.LoginTxnPwdModel.currentPasswordType == self.passwordType.Login){
				self.LoginTxnPwdModel.isLgnTooShort=true;
				self.LoginTxnPwdModel.passwordStrengthLgnText = "Too Short";
			}
			else{
				self.LoginTxnPwdModel.isTxnTooShort=true;
				self.LoginTxnPwdModel.isLgnTooShort=true;
				self.LoginTxnPwdModel.passwordStrengthLgnText = "Too Short";
				self.LoginTxnPwdModel.passwordStrengthTxnText = "Too Short";
			}
			return;
		} else{
			var weakLength= minLength + parseInt(self.LoginTxnPwdModel.strengthRules.weak.char);
			var strongLength= minLength + parseInt(self.LoginTxnPwdModel.strengthRules.strong.char);
			var fairLength=minLength + parseInt(self.LoginTxnPwdModel.strengthRules.fair.char);
			var ironcladLength=minLength + parseInt(self.LoginTxnPwdModel.strengthRules.ironclad.char);
			var ironclad=false;
			var strong=false;
			var fair=false;

			// for appactivation by cm
			if(isAppactivation){
				 weakLength= parseInt(self.LoginTxnPwdModel.strengthRules.weak.char)+parseInt(self.LoginTxnPwdModel.strengthRules.weak.digits)+parseInt(self.LoginTxnPwdModel.strengthRules.weak.specials);
				 weakLength=weakLength||1;
				 strongLength= parseInt(self.LoginTxnPwdModel.strengthRules.strong.char)+parseInt(self.LoginTxnPwdModel.strengthRules.strong.digits)+parseInt(self.LoginTxnPwdModel.strengthRules.strong.specials);
				 fairLength=parseInt(self.LoginTxnPwdModel.strengthRules.fair.char)+parseInt(self.LoginTxnPwdModel.strengthRules.fair.digits)+parseInt(self.LoginTxnPwdModel.strengthRules.fair.specials);
				 ironcladLength=parseInt(self.LoginTxnPwdModel.strengthRules.ironclad.char)+parseInt(self.LoginTxnPwdModel.strengthRules.ironclad.digits)+parseInt(self.LoginTxnPwdModel.strengthRules.ironclad.specials);
			}

			//check for ironclad first
			if(password.length >= ironcladLength){
				ironclad = self.LoginTxnPwdModel.icDigitsRE.test(password) &&
				self.LoginTxnPwdModel.icSpecialsRE.test(password);
				//self.LoginTxnPwdModel.icCharsRE.test(password);
				if(self.LoginTxnPwdModel.currentPasswordType == self.passwordType.Transaction)
					self.LoginTxnPwdModel.isTxnIronclad=ironclad;
				else if(self.LoginTxnPwdModel.currentPasswordType == self.passwordType.Login)
					self.LoginTxnPwdModel.isLgnIronclad=ironclad;
				else{
					self.LoginTxnPwdModel.isTxnIronclad=ironclad;
					self.LoginTxnPwdModel.isLgnIronclad=ironclad;
				}
			}
			//if the password is not iron clad then check for strong
			if(!ironclad){
				//set everything else to false
				if(self.LoginTxnPwdModel.currentPasswordType == self.passwordType.Transaction){
					self.LoginTxnPwdModel.isTxnWeak = false;
					self.LoginTxnPwdModel.isTxnFair = false;
				}
				if(self.LoginTxnPwdModel.currentPasswordType == self.passwordType.Login){
					self.LoginTxnPwdModel.isLgnWeak = false;
					self.LoginTxnPwdModel.isLgnFair = false;
				}
				if(LoginTxnPwdModel.length >= strongLength){
					strong = self.LoginTxnPwdModel.strongDigitsRE.test(password) &&
					self.LoginTxnPwdModel.strongSpecialsRE.test(password);// &&
					//self.LoginTxnPwdModel.strongCharRE.test(password);
					if(self.LoginTxnPwdModel.currentPasswordType == self.passwordType.Transaction)
						self.LoginTxnPwdModel.isTxnStrong=strong;
					else if(self.LoginTxnPwdModel.currentPasswordType == self.passwordType.Login)
						self.LoginTxnPwdModel.isLgnStrong=strong;
					else{
						self.LoginTxnPwdModel.isTxnStrong=strong;
						self.LoginTxnPwdModel.isLgnStrong=strong;
					}
				}
				//if the password is not strong, then check fair
				if(!strong){
					if(self.LoginTxnPwdModel.currentPasswordType == self.passwordType.Transaction)
						self.LoginTxnPwdModel.isTxnWeak = false;
					if(self.LoginTxnPwdModel.currentPasswordType == self.passwordType.Login)
						self.LoginTxnPwdModel.isLgnWeak = false;
					if(LoginTxnPwdModel.length >= fairLength){
						fair=self.LoginTxnPwdModel.fairDigitsRE.test(password) &&
						self.LoginTxnPwdModel.fairSpecialsRE.test(password);// &&
						//self.LoginTxnPwdModel.fairCharRE.test(password);
						if(self.LoginTxnPwdModel.currentPasswordType == self.passwordType.Transaction)
							self.LoginTxnPwdModel.isTxnFair=fair;
						else if(self.LoginTxnPwdModel.currentPasswordType == self.passwordType.Login)
							self.LoginTxnPwdModel.isLgnFair=fair;
						else{
							self.LoginTxnPwdModel.isTxnFair=fair;
							self.LoginTxnPwdModel.isLgnFair=fair;
						}
					}
					//if the password is not fair then it is weak
					if(!fair){
						if(self.LoginTxnPwdModel.currentPasswordType == self.passwordType.Transaction){
							self.LoginTxnPwdModel.isTxnWeak=true;
							self.LoginTxnPwdModel.passwordStrengthTxnText="Weak";
						}
						else if(self.LoginTxnPwdModel.currentPasswordType == self.passwordType.Login){
							self.LoginTxnPwdModel.isLgnWeak=true;
							self.LoginTxnPwdModel.passwordStrengthLgnText="Weak";
						}
						else{
							self.LoginTxnPwdModel.isTxnWeak=true;
							self.LoginTxnPwdModel.isLgnWeak=true;
							self.LoginTxnPwdModel.passwordStrengthLgnText="Weak";
							self.LoginTxnPwdModel.passwordStrengthTxnText="Weak";
						}

					}else{
						if(self.LoginTxnPwdModel.currentPasswordType == self.passwordType.Transaction){
							self.LoginTxnPwdModel.passwordStrengthTxnText="Fair";
						}
						else if(self.LoginTxnPwdModel.currentPasswordType == self.passwordType.Login){
							self.LoginTxnPwdModel.passwordStrengthLgnText="Fair";
						}
						else{
							self.LoginTxnPwdModel.passwordStrengthLgnText="Fair";
							self.LoginTxnPwdModel.passwordStrengthTxnText="Fair";
						}
					}
				}else{
					if(self.LoginTxnPwdModel.currentPasswordType == self.passwordType.Transaction){
						self.LoginTxnPwdModel.passwordStrengthTxnText="Strong";
					}
					else if(self.LoginTxnPwdModel.currentPasswordType == self.passwordType.Login){
						self.LoginTxnPwdModel.passwordStrengthLgnText="Strong";
					}
					else{
						self.LoginTxnPwdModel.passwordStrengthLgnText="Strong";
						self.LoginTxnPwdModel.passwordStrengthTxnText="Strong";
					}
				}
			}else{
				if(self.LoginTxnPwdModel.currentPasswordType == self.passwordType.Transaction){
					self.LoginTxnPwdModel.passwordStrengthTxnText="Very Strong";
				}
				else if(self.LoginTxnPwdModel.currentPasswordType == self.passwordType.Login){
					self.LoginTxnPwdModel.passwordStrengthLgnText="Very Strong";
				}
				else{
					self.LoginTxnPwdModel.passwordStrengthLgnText="Very Strong";
					self.LoginTxnPwdModel.passwordStrengthTxnText="Very Strong";
				}
			}
		}
	};

	self.initSuccessPageMsg = function(responsesList){
		if(!responsesList[0].hasOwnProperty('errorMessage')){
			if (responsesList[0].hasOwnProperty('successMsg')){
				self.RegistrationModel.successMsg = responsesList[0].successMsg;
			}
		}
	}

	
	self.common={
			successMsg:"",
			flag:false,
			userIdsuccessMsg:'',
	};
	self.initSuccess = function(responsesList){
		if(!responsesList[0].hasOwnProperty('errorMessage')){
			if (responsesList[0].hasOwnProperty('successMsg')){
				self.common.successMsg = responsesList[0].successMsg;
			}
		}
	};
	
	self.validateUserResponse=function(responsesList){
		if (responsesList[0].hasOwnProperty('userIDsuccessMsg')){
			self.RegistrationModel.userIdsuccessMsg = responsesList[0].userIDsuccessMsg;
		}
		else{
			self.RegistrationModel.userIdsuccessMsg='';
		}
	};
	
	self.validateUserID = function(){
		if(self.RegistrationModel.requestType=='ORON'){
			
		
			
			
		self.common.flag=true;
		scope.setEvent('checkUserIdAvailability');
		}
		
	};
	
	






};