App.viewModels.rakMyProfile = function(jsonStore, Logger,rootScope,scope){

	var self = this;
	self.rootScope = rootScope;
	self.passwordType={
			Both:0,
			Transaction:1,
			Login:2,
			MPINLogin:3,
			None:-1
	};

	self.updateNickName={
			navigationType:'',
			transactionPassword:''
	};
	self.minSize=1;
	self.maxSize=5242880; //5 MB(5*1024*1024)
	self.imageFormat="PNG,JPG";

	self.common = {


			displayDate:new Date(),
			date:null,
			month:null,
			year:null,
			message:''

		};

	// Added Util Function START//
	self.utils = {

		populateCurrentDateDetails : function() {
			if (self.common.displayDate != ""
					&& self.common.displayDate != null) {
				var date = self.common.displayDate.getDate().toString();
				var currMonth = self.common.displayDate.getMonth() + 1;
				var month = currMonth.toString();
				var year = self.common.displayDate.getFullYear().toString();
				self.common.date = date;
				self.common.month = month;
				self.common.year = year;
			}
		},
		getDateWithFormat : function(type, format) {
			var value = '';
			type == 'from' ? value = self.common.searchFromDate
					: value = self.common.searchToDate;
			var date = moment(value);
			return date.format(format);
		},
		getLandingPageFromDate : function(format) {
			var fromDate = moment();
			return fromDate.format(format);
		},
		getLandingPageToDate : function(format) {
			var toDate = moment().add(30, 'days');
			return toDate.format(format);
		},
		clearCommonData : function() {



			self.common.date = null;
			self.common.month = null;
			self.common.year = null;

			self.common.displayDate = new Date();

			self.common.toDisplayString = null;
			self.common.message='';


		}
	// Util Function Ended///
	};
	
	

	self.oldPassword='';
	self.newPassword='';
	self.confirmPassword='';

	self.txnOldPassword='';
	self.txnNewPassword='';
	self.txnConfirmPassword='';

	self.oldForceTxnPassword = '';
	self.newForceTxnPassword = '';
	self.confirmForceTxnPassword = '';

	self.oldForceLoginPassword = '';
	self.newForceLoginPassword = '';
	self.confirmForceLoginPassword = '';

	self.loginPwdExp = false;
	self.txnPwdExp = false;

	self.forGotPasswordMessage = '';

	self.userID	= '';
	self.authenticateOTP = '';

	self.hardToken='';
	/**
	 * Function to reset all the password enabled fields.
	 * @constructor
	 */
	self.resetPwdFields = function(){

		self.userID= '';
		self.oldPassword='';
		self.newPassword='';
		self.confirmPassword='';

		self.txnOldPassword='';
		self.txnNewPassword='';
		self.txnConfirmPassword='';

		self.oldForceTxnPassword = '';
		self.newForceTxnPassword = '';
		self.confirmForceTxnPassword = '';

		self.oldForceLoginPassword = '';
		self.newForceLoginPassword = '';
		self.confirmForceLoginPassword = '';

		self.authenticateOTP = '';

		self.passwordMessageString = '';
		self.hardToken='';
//		rootScope.finacleUserCorporateId = 'User Name';
//		rootScope.finacleUserPassword = 'Password';
//		console.log(rootScope);
	};
	
	self.HardTokenOnLoad = function(response) {

		if (response.RSAVALUE === 'TRUE') {
			//self.loginPwdExp = true;
			//self.loginPwdChk = "LginPwd";
		}
		 if (response.hasOwnProperty('cifId')){
             rootScope.rakHome.cifId = response.cifId;
             rootScope.customerId=response.cifId;
           }
		self.sessionId = response.sessKey;
		self.mparam = response.mbParam;
		//console.log(response);

		
	};

	/**
	* All the password fields are resetted and also for password strength fields
	* @constructor
	*/

	self.password={
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

			isMPINTooShort:false,
			isMPINWeak:false,
			isMPINFair:false,
			isMPINStrong:false,
			isMPINIronclad:false,

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
			passwordStrengthMPINText:"",
			hideTxnPasswordStrength:true,
			hideLgnPasswordStrength:true,
			hideMPINLgnPasswordStrength:true,
			changeTransactionPassword:false,
			changeLoginPassword:false,

			initPasswordStrengthRules:function(response){
				self.password.clearStrengthData();
				if(!response[0].hasOwnProperty('errorMessage')){
				self.password.strengthRules=response[0].rules[0];
				self.password.generateRegExpBasedOnRules();
				}
			},

			/**
			* Password Rules are generated according to the Regular Expression Values.
			* Check the rules for ironclad, strong, fair and weak.
			* Create regex for each of these rules.
			* Create the RegExp for ironclad rules.
			* @constructor
			*/
			generateRegExpBasedOnRules:function(){

				//1. Check the rules for ironclad, strong, fair and weak
				//2. Create regex for each of these rules
				//Create the RegExp for ironclad rules
				var ironcladRules=self.password.strengthRules.ironclad;
				self.password.icDigitsRE = new RegExp(self.password.getDigitsRegExp(ironcladRules.digits));
				//self.password.icCharsRE = new RegExp(self.password.getCharsRegExp(ironcladRules.char));
				self.password.icSpecialsRE = new RegExp(self.password.getSpecialsRegExp(ironcladRules.specials));

				//Create the RegExp for strong rules
				var strongRules=self.password.strengthRules.strong;
				self.password.strongDigitsRE = new RegExp(self.password.getDigitsRegExp(strongRules.digits));
				//self.password.strongCharRE = new RegExp(self.password.getCharsRegExp(strongRules.char));
				self.password.strongSpecialsRE = new RegExp(self.password.getSpecialsRegExp(strongRules.specials));

				//Create the RegExp for fair rules
				var fairRules=self.password.strengthRules.fair;
				self.password.fairDigitsRE = new RegExp(self.password.getDigitsRegExp(fairRules.digits));
				//self.password.fairCharRE = new RegExp(self.password.getCharsRegExp(fairRules.char));
				self.password.fairSpecialsRE = new RegExp(self.password.getSpecialsRegExp(fairRules.specials));

				//Create the RegExp for weak rules
				var weakRules=self.password.strengthRules.weak;
				self.password.weakDigitsRE = new RegExp(self.password.getDigitsRegExp(weakRules.digits));
				//self.password.weakCharRE = new RegExp(self.password.getCharsRegExp(weakRules.char));
				self.password.weakSpecialsRE = new RegExp(self.password.getSpecialsRegExp(weakRules.specials));
			},

			/**
			* This function checks the strength of the password
			* @constructor
			*/
			checkPasswordStrength:function(password,isAppactivation){
				if(password.length === 0){
					if(self.password.currentPasswordType === self.passwordType.Transaction)
						self.password.hideTxnPasswordStrength=true;
					if(self.password.currentPasswordType === self.passwordType.Login)
						self.password.hideLgnPasswordStrength=true;
					if(self.password.currentPasswordType === self.passwordType.MPINLogin)
						self.password.hideMPINLgnPasswordStrength=true;
					return;
				}
				else{
					if(self.password.currentPasswordType === self.passwordType.Transaction)
						self.password.hideTxnPasswordStrength=false;
					if(self.password.currentPasswordType === self.passwordType.Login)
						self.password.hideLgnPasswordStrength=false;
					if(self.password.currentPasswordType === self.passwordType.MPINLogin)
						self.password.hideMPINLgnPasswordStrength=false;
				}
				//Check the first criteria for password strength i.e. min length
				//If password is greater than min length then proceed, else return weak

				//first set all the bools to false.
				if(self.password.currentPasswordType === self.passwordType.Transaction){
					self.password.isTxnTooShort=false;
					self.password.isTxnWeak = false;
					self.password.isTxnFair = false;
					self.password.isTxnStrong = false;
					self.password.isTxnIronclad = false;
				}
				if(self.password.currentPasswordType === self.passwordType.Login){
					self.password.isLgnTooShort=false;
					self.password.isLgnWeak = false;
					self.password.isLgnFair = false;
					self.password.isLgnStrong = false;
					self.password.isLgnIronclad = false;
				}
				if(self.password.currentPasswordType === self.passwordType.MPINLogin){
					self.password.isMPINTooShort=false;
					self.password.isMPINWeak = false;
					self.password.isMPINFair = false;
					self.password.isMPINStrong = false;
					self.password.isMPINIronclad = false;
				}

				var minLength=parseInt(self.password.strengthRules.minLengthOfPassword);
				if(password.length < minLength){
					//password is weak
					//self.password.isTooShort=true;
					if(self.password.currentPasswordType === self.passwordType.Transaction){
						self.password.isTxnTooShort=true;
						self.password.passwordStrengthTxnText = "Too Short";
					}
					else if(self.password.currentPasswordType === self.passwordType.Login){
						self.password.isLgnTooShort=true;
						self.password.passwordStrengthLgnText = "Too Short";
					}
					else if(self.password.currentPasswordType === self.passwordType.MPINLogin){
						self.password.isMPINTooShort=true;
						self.password.passwordStrengthMPINText = "Too Short";
					}
					else{
						self.password.isTxnTooShort=true;
						self.password.isLgnTooShort=true;
						self.password.isMPINTooShort=true;
						self.password.passwordStrengthLgnText = "Too Short";
						self.password.passwordStrengthTxnText = "Too Short";
						self.password.passwordStrengthMPINText = "Too Short";
					}
					return;
				} else{
					var weakLength= minLength + parseInt(self.password.strengthRules.weak.char);
					var strongLength= minLength + parseInt(self.password.strengthRules.strong.char);
					var fairLength=minLength + parseInt(self.password.strengthRules.fair.char);
					var ironcladLength=minLength + parseInt(self.password.strengthRules.ironclad.char);
					var ironclad=false;
					var strong=false;
					var fair=false;

					// for appactivation by cm
					if(isAppactivation){
						 weakLength= parseInt(self.password.strengthRules.weak.char)+parseInt(self.password.strengthRules.weak.digits)+parseInt(self.password.strengthRules.weak.specials);
						 weakLength=weakLength||1;
						 strongLength= parseInt(self.password.strengthRules.strong.char)+parseInt(self.password.strengthRules.strong.digits)+parseInt(self.password.strengthRules.strong.specials);
						 fairLength=parseInt(self.password.strengthRules.fair.char)+parseInt(self.password.strengthRules.fair.digits)+parseInt(self.password.strengthRules.fair.specials);
						 ironcladLength=parseInt(self.password.strengthRules.ironclad.char)+parseInt(self.password.strengthRules.ironclad.digits)+parseInt(self.password.strengthRules.ironclad.specials);
					}

					//check for ironclad first
					if(password.length >= ironcladLength){
						ironclad = self.password.icDigitsRE.test(password) &&
						self.password.icSpecialsRE.test(password);
						//self.password.icCharsRE.test(password);
						if(self.password.currentPasswordType === self.passwordType.Transaction)
							self.password.isTxnIronclad=ironclad;
						else if(self.password.currentPasswordType === self.passwordType.Login)
							self.password.isLgnIronclad=ironclad;
						else if(self.password.currentPasswordType === self.passwordType.MPINLogin)
							self.password.isMPINIronclad=ironclad;
						else{
							self.password.isTxnIronclad=ironclad;
							self.password.isLgnIronclad=ironclad;
							self.password.isMPINIronclad=ironclad;
						}
					}
					//if the password is not iron clad then check for strong
					if(!ironclad){
						//set everything else to false
						if(self.password.currentPasswordType === self.passwordType.Transaction){
							self.password.isTxnWeak = false;
							self.password.isTxnFair = false;
						}
						if(self.password.currentPasswordType === self.passwordType.Login){
							self.password.isLgnWeak = false;
							self.password.isLgnFair = false;
						}
						if(self.password.currentPasswordType === self.passwordType.MPINLogin){
							self.password.isMPINWeak = false;
							self.password.isMPINFair = false;
						}
						if(password.length >= strongLength){
							strong = self.password.strongDigitsRE.test(password) &&
							self.password.strongSpecialsRE.test(password);// &&
							//self.password.strongCharRE.test(password);
							if(self.password.currentPasswordType === self.passwordType.Transaction)
								self.password.isTxnStrong=strong;
							else if(self.password.currentPasswordType === self.passwordType.Login)
								self.password.isLgnStrong=strong;
							else if(self.password.currentPasswordType === self.passwordType.MPINLogin)
								self.password.isMPINStrong=strong;
							else{
								self.password.isTxnStrong=strong;
								self.password.isLgnStrong=strong;
								self.password.isMPINStrong=strong;
							}
						}
						//if the password is not strong, then check fair
						if(!strong){
							if(self.password.currentPasswordType === self.passwordType.Transaction)
								self.password.isTxnWeak = false;
							if(self.password.currentPasswordType === self.passwordType.Login)
								self.password.isLgnWeak = false;
							if(password.length >= fairLength){
								fair=self.password.fairDigitsRE.test(password) &&
								self.password.fairSpecialsRE.test(password);// &&
								//self.password.fairCharRE.test(password);
								if(self.password.currentPasswordType === self.passwordType.Transaction)
									self.password.isTxnFair=fair;
								else if(self.password.currentPasswordType === self.passwordType.Login)
									self.password.isLgnFair=fair;
								else if(self.password.currentPasswordType === self.passwordType.MPINLogin)
									self.password.isMPINFair=fair;
								else{
									self.password.isTxnFair=fair;
									self.password.isLgnFair=fair;
									self.password.isMPINFair=fair;
								}
							}
							//if the password is not fair then it is weak
							if(!fair){
								if(self.password.currentPasswordType === self.passwordType.Transaction){
									self.password.isTxnWeak=true;
									self.password.passwordStrengthTxnText="Weak";
								}
								else if(self.password.currentPasswordType === self.passwordType.Login){
									self.password.isLgnWeak=true;
									self.password.passwordStrengthLgnText="Weak";
								}
								else if(self.password.currentPasswordType === self.passwordType.MPINLogin){
									self.password.isMPINWeak=true;
									self.password.passwordStrengthMPINText="Weak";
								}
								else{
									self.password.isTxnWeak=true;
									self.password.isLgnWeak=true;
									self.password.isMPINWeak=true;
									self.password.passwordStrengthLgnText="Weak";
									self.password.passwordStrengthTxnText="Weak";
									self.password.passwordStrengthMPINText="Weak";
								}

							}else{
								if(self.password.currentPasswordType === self.passwordType.Transaction){
									self.password.passwordStrengthTxnText="Fair";
								}
								else if(self.password.currentPasswordType === self.passwordType.Login){
									self.password.passwordStrengthLgnText="Fair";
								}
								else if(self.password.currentPasswordType === self.passwordType.MPINLogin){
									self.password.passwordStrengthMPINText="Fair";
								}
								else{
									self.password.passwordStrengthLgnText="Fair";
									self.password.passwordStrengthTxnText="Fair";
									self.password.passwordStrengthMPINText="Fair";
								}
							}
						}else{
							if(self.password.currentPasswordType === self.passwordType.Transaction){
								self.password.passwordStrengthTxnText="Strong";
							}
							else if(self.password.currentPasswordType === self.passwordType.Login){
								self.password.passwordStrengthLgnText="Strong";
							}
							else if(self.password.currentPasswordType === self.passwordType.MPINLogin){
								self.password.passwordStrengthMPINText="Strong";
							}
							else{
								self.password.passwordStrengthLgnText="Strong";
								self.password.passwordStrengthTxnText="Strong";
								self.password.passwordStrengthMPINText="Strong";
							}
						}
					}else{
						if(self.password.currentPasswordType === self.passwordType.Transaction){
							self.password.passwordStrengthTxnText="Very Strong";
						}
						else if(self.password.currentPasswordType === self.passwordType.Login){
							self.password.passwordStrengthLgnText="Very Strong";
						}
						else if(self.password.currentPasswordType === self.passwordType.MPINLogin){
							self.password.passwordStrengthMPINText="Very Strong";
						}
						else{
							self.password.passwordStrengthLgnText="Very Strong";
							self.password.passwordStrengthTxnText="Very Strong";
							self.password.passwordStrengthMPINText="Very Strong";
						}
					}
				}
			},

			/**
			 * Clear the password strength Indicator
			 * @constructor
			 */
			clearStrengthData:function(){
				self.password.isTxnTooShort=false;
				self.password.isTxnWeak = false;
				self.password.isTxnFair = false;
				self.password.isTxnStrong = false;
				self.password.isTxnIronclad = false;

				self.password.isLgnTooShort=false;
				self.password.isLgnWeak = false;
				self.password.isLgnFair = false;
				self.password.isLgnStrong = false;
				self.password.isLgnIronclad = false;

				self.password.isMPINTooShort=false;
				self.password.isMPINWeak = false;
				self.password.isMPINFair = false;
				self.password.isMPINStrong = false;
				self.password.isMPINIronclad = false;

				self.password.passwordStrengthLgnText="";
				self.password.passwordStrengthTxnText="";
				self.password.passwordStrengthMPINText="";
				self.password.hideLgnPasswordStrength=true;
				self.password.hideTxnPasswordStrength=true;
				self.password.hideMPINLgnPasswordStrength=true;
			},

			/**
			 * Creates the regexp for characters - both lower and upper case
			 * @constructor
			 */
			getCharsRegExp:function(charCount){
				var charRule="";
					for(index=0;index<charCount;index++){
						if(charCount === 1){
							charRule="[a-zA-Z]";
							break;
						}
						else{
							charRule += ".*[a-zA-Z]";
						}
					}
				return charRule;
			},

			/**
			 * This function will return a regexp for specials Characters
			 * @constructor
			 */
			getSpecialsRegExp:function(specialsCount){
				var specialRule="";
					for(index=0;index<specialsCount;index++){
						if(specialsCount === 1){
							specialRule="[!,@,#,$,%,\^,&,*,?,_,~,<,>]";
							break;
						}
						else{
							specialRule += ".*[!,@,#,$,%,\^,&,*,?,_,~,<,>]";
						}
					}
				return specialRule;
			},
			/**
			 * This function will return a regexp for digits
			 * @constructor
			 */
			getDigitsRegExp:function(digitsCount){
				var digitsRule="";
				for(var index=0;index<digitsCount;index++){
					if(digitsCount === 1){
						digitsRule="[0-9]";
						break;
					}
					else{
						digitsRule += ".*[0-9]";
					}
				}
				return digitsRule;
			},
	};


	/////////////////////////////////// Update Nickname //////////////
	self.updateNickname = {

			nicknameDetails:[],
			submitNicknameDetails:[],
			authStatus:false,
			transactionPassword:'',
			selectedIndexArray:[],
			selectedNicknameArray:[],
			selectedIndexAsString:'',
			selectedNicknameAsString:'',
			isDisabled:false,
			isLandingPage:true,
			nickname:[],
			isNicknameModified:false,
			auth:'',

			clearNicknameDetails:function(){
				self.updateNickname.nicknameDetails=[];
				self.updateNickname.submitNicknameDetails=[];
				self.updateNickname.authStatus=false;
				self.updateNickname.transactionPassword='';
				self.updateNickname.selectedIndexArray=[];
				self.updateNickname.selectedNicknameArray=[];
				self.updateNickname.selectedIndexAsString='';
				self.updateNickname.selectedNicknameAsString='';
				self.updateNickname.isDisabled=false;
				self.updateNickname.isLandingPage=true;
				self.updateNickname.isNicknameModified=false;
				self.updateNickname.nickname=[];
				self.updateNickname.auth='';

			},

			inputModified:function(){
				self.updateNickname.isNicknameModified=true;
			},

			initNicknameDetails:function(responseList){
				if(self.updateNickname.isLandingPage){
					self.updateNickname.nicknameDetails = responseList[0].updateNickName;
					self.updateNickname.isLandingPage = false;
				}
			},
			submitNicknameResponseDetails:function(responseList){
				if(!responseList[0].hasOwnProperty('errorMessage')){
					self.updateNickname.submitNicknameDetails = responseList[0].updateNickName;

					if(responseList[0].hasOwnProperty('auth')){
						self.updateNickname.auth = responseList[0].auth;
					}
					if(responseList[0].auth === 'Transaction Password'){
						self.updateNickname.authStatus = true;
					}
				}
			},
			selectedChangeNicknameIndex:function(index){
				if(self.updateNickname.selectedIndexArray.indexOf(index) === -1){
					self.updateNickname.selectedIndexArray.push(index);
					self.updateNickname.isDisabled = true;
				// self.updateNickname.selectedIndexAsString =
				// self.updateNickname.selectedIndexArray.toString();
				}
			},
			updateNicknameModelData:function(index){
				self.updateNickname.nickname[index] = self.updateNickname.nicknameDetails[index].accountNickName;
			},
			continueClick:function(){
			self.updateNickname.selectedNicknameArray = [];
				for (var index = 0; index < self.updateNickname.selectedIndexArray.length; index++) {
					self.updateNickname.selectedNicknameArray.push(self.updateNickname.nickname[self.updateNickname.selectedIndexArray[index]]);
				}
				self.updateNickname.selectedIndexAsString 	 = self.updateNickname.selectedIndexArray.toString();
				self.updateNickname.selectedNicknameAsString = self.updateNickname.selectedNicknameArray.toString();
			}
	};

	// added for update user ids
	self.updateIdInitResponse={
			masterID:"",
			channelList:[]
	};

	self.updateIdModel = {

			masterID:"",
			channelList:"",
			Userid:[],
			UserIndex:[],
			confirmResponse:"",
			transactionPwD:"",
			auth:"",
			strUpdateIndex:"",
			strUpdateIds:"",
			responseText:[],
		isUserIdModified:false,
		editFlag:[],

		inputModified:function(){
			self.updateIdModel.isUserIdModified=true;
	    },

			resetUpdateIDModel : function(){
				self.updateIdModel.confirmResponse="";
				self.updateIdModel.Userid=[];
			self.updateIdModel.editFlag = [];
				self.updateIdModel.UserIndex=[];
				self.updateIdModel.transactionPwD="";
				self.updateIdModel.strUpdateIndex="";
				self.updateIdModel.isBack=false;
			self.updateIdModel.isUserIdModified=false;
				self.updateIdModel.strUpdateIds="";
			}
	};

	self.initUpdateIdPage = function(responseList){
		if(!responseList[0].hasOwnProperty('errorMessage') && !self.updateIdModel.isBack){
			self.updateIdModel.isBack=false;
			self.updateIdInitResponse.masterID=responseList[0].masterId;
			self.updateIdInitResponse.channelList=responseList[0].channelList;
			self.updateIdInitResponse.warningMessage= responseList[0].warningMessage;
			self.updateIdInitResponse.isUserIdshared= responseList[0].isUserIdshared;
		}
		self.indexLoop=0;
	};
    self.checkUserIdPreference = function(index) {
    	for (var i = 0; i < self.updateIdInitResponse.channelList.length; i++) {
			if (i != index){
				self.updateIdModel.editFlag[i] = false;
			}

			else{
				self.updateIdModel.editFlag[i]=true;
			}
			}
	};

	self.changeValue = function(userIndex){
		if( self.updateIdModel.UserIndex.indexOf(userIndex)===-1 ){
			self.updateIdModel.UserIndex[self.indexLoop]=userIndex;
			self.indexLoop++;
		}
	};

	self.updateList=function(value){

		self.updateIdModel.Userid[value]=self.updateIdInitResponse.channelList[value].userId;
	};

	self.convertToString = function(){
		var indexOf;
		self.userIndexString="";
		self.userIdString="";
		
		if (self.updateIdModel.UserIndex.length ==0)
		{
			rootScope.showErrorPopup(rootScope.appLiterals.APP.RAKERRORMSG.VALIDATORTYPEMSG.UPDATE_USER_ID);

		}
		else{
				for(i=0;i< self.updateIdModel.UserIndex.length;i++)
				{
					indexOf=parseInt(self.updateIdModel.UserIndex[i]);
					self.userIndexString = self.userIndexString+self.updateIdModel.UserIndex[i]+",";
					self.userIdString = self.userIdString+self.updateIdModel.Userid[indexOf]+",";
				}
				self.userIndexString=self.userIndexString.substring(0, self.userIndexString.length - 1);
				self.userIdString=self.userIdString.substring(0, self.userIdString.length - 1);
				self.updateIdModel.strUpdateIndex=self.userIndexString;
				self.updateIdModel.strUpdateIds= self.userIdString;
				
				scope.setEvent('onNNConfirmClick');
		}
	};

	self.initUpdateIdConfirm=function(responseList){
		if(!responseList[0].hasOwnProperty('errorMessage')){
			self.updateIdModel.confirmResponse=responseList[0];
			self.updateIdModel.auth=responseList[0].auth;
			self.updateIdModel.transactionPwD="";
		}
		self.updateIdModel.transactionPwD="";
	};

	self.initUpdateIdSuccesspage = function(responseList)
	{
		self.updateIdModel.responseText=responseList[0].successMessage;
	};

/* RAK:5: - Update Personal Details : START */

	self.updatePersonalProfile = {
			nameList : [],
			emailID : "",
			title:"",
			firstName:"",
			middleName:"",
			lastName:"",
			fullName:"",

			emirateID:"",

			mailAddress:"",
			offAddress:"",
			address1:"",
			address2:"",
			address3:"",
			street:"",
			pobox:"",
			city:"",
			country:"",

			preferred:"",

			offaddress1:"",
			offaddress2:"",
			offaddress3:"",
			offStreet:"",
			offpobox:"",
			offcity:"",
			offcountry:"",
			
			head_offaddress1:"",
			head_offaddress2:"",
			head_offaddress3:"",
			head_offStreet:"",
			head_offpobox:"",
			head_offcity:"",
			head_offcountry:"",


			offpreferred:"",

			homeCountrycode:"",
			homeNumber:"",

			homeTwoCountrycode:"",
			homeNumberTwo:"",

			OffCountrycode:"",
			offNumber:"",

			OffTwoCountrycode:"",
			offNumberTwo:"",

			faxHome_CC:"",
			faxHome:"",

			faxOffOne_CC:"",
			faxOffOne:"",

			faxOffTwo_CC:"",
			faxOffTwo:"",


			preferredAddressType:"",

			transactionPassword:"",
			auth:"",

			previewResponse:[],
			isBack:"",



			homePrefer:"",
			homeTwoPrefer:"",
			OffPrefer:"",
			OffTwoPrefer:"",
			countryList:[],
			uaeCityList:[],
			boolHomeOne:false,
			boolHomeTwo:false,
			boolOfficeOne:false,
			boolOfficeTwo:false,
			boolHomeFax:false,
			boolOffFaxOne:false,
			boolOffFaxTwo:false,
			
			boolHomeOne_CC:false,
			boolHomeTwo_CC:false,
			boolOfficeOne_CC:false,
			boolOfficeTwo_CC:false,
			boolHomeFax_CC:false,
			boolOffFaxOne_CC:false,
			boolOffFaxTwo_CC:false,
			
			dateExpiry:new Date(),
			dateExpiry_day:"",
			dateExpiry_month:"",
			dateExpiry_year:"",
			preferredAddressTypeServer:"",
			expDate: new Date(),
			/*RAK:2:-CitySearch-Start*/
			citySearchText:"",
			cityList : [],
//			cityCode : "",
			cityDesc :"",
			offCityDesc:"",
			head_offCityDesc:"",
			isOfficeCity:false,
			isHomeCity:false,
			isHeadOfficeCity:false,
			userTypeValue:"",
			//CHANGES DONE AS FIX OF PROUAT-2131 START
			previewDateOne:"",
			//CHANGES DONE AS FIX OF PROUAT-2131 END
			isDirty:"",
			
			//RAK OECD changes
			flag:"",
			changes:"",
			
			
			countryDesc:"",
			offcountrydesc:"",
			head_offcountrydesc:"",
			VALID_CITY_TYPE :{
				1: 'country' ,
				3: 'head_offcountry',
				2: 'offcountry'
			},
			
			/*RAK:2:-CitySearch-End*/



			resetUpdatePersonalProfileModel : function() {

				self.updatePersonalProfile.nameList = [];
				self.updatePersonalProfile.title = "";
				self.updatePersonalProfile.firstName = "";
				self.updatePersonalProfile.middleName = "";
				self.updatePersonalProfile.lastName = "";
				//RAK OECD changes
				self.updatePersonalProfile.flag = "";
				self.updatePersonalProfile.changes = "";


				self.updatePersonalProfile.emirateID = "";
				self.updatePersonalProfile.emailID = "";
				
				self.updatePersonalProfile.address1 = "";
				self.updatePersonalProfile.address2 = "";
				self.updatePersonalProfile.address3 = "";
				self.updatePersonalProfile.street = "";
				self.updatePersonalProfile.pobox = "";
				self.updatePersonalProfile.city = "";
				self.updatePersonalProfile.country = "";
				
				self.updatePersonalProfile.preferred = "";
				
				self.updatePersonalProfile.head_offaddress1 = "";
				self.updatePersonalProfile.head_offaddress2 = "";
				self.updatePersonalProfile.head_offaddress3 = "";
				self.updatePersonalProfile.head_offStreet = "";
				self.updatePersonalProfile.head_offpobox = "";
				self.updatePersonalProfile.head_offcity = "";
				self.updatePersonalProfile.head_offcountry = "";
				
				self.updatePersonalProfile.offaddress1 = "";
				self.updatePersonalProfile.offaddress2 = "";
				self.updatePersonalProfile.offaddress3 = "";
				self.updatePersonalProfile.offStreet = "";
				self.updatePersonalProfile.offpobox = "";
				self.updatePersonalProfile.offcity = "";
				self.updatePersonalProfile.offcountry = "";
				
				self.updatePersonalProfile.offpreferred = "";
				self.updatePersonalProfile.mailAddress = "";
				self.updatePersonalProfile.offAddress = "";

				self.updatePersonalProfile.offNumber = "";
				self.updatePersonalProfile.homeNumber = "";
				self.updatePersonalProfile.offNumberTwo = "";
				self.updatePersonalProfile.homeNumberTwo = "";
				self.updatePersonalProfile.faxHome_CC = "";
				self.updatePersonalProfile.faxOffOne_CC = "";
				self.updatePersonalProfile.faxOffTwo_CC = "";
				self.updatePersonalProfile.faxHome = "";
				self.updatePersonalProfile.faxOffOne = "";
				self.updatePersonalProfile.faxOffTwo = "";
				
				self.updatePersonalProfile.offNumberInit = false;
				self.updatePersonalProfile.homeNumberInit = false;
				self.updatePersonalProfile.offNumberTwoInit = false;
				self.updatePersonalProfile.homeNumberTwoInit = false;
				self.updatePersonalProfile.faxHome_CCInit = false;
				self.updatePersonalProfile.faxOffOne_CCInit = false;
				self.updatePersonalProfile.faxOffTwo_CCInit = false;
				self.updatePersonalProfile.faxHomeInit = false;
				self.updatePersonalProfile.faxOffOneInit = false;
				self.updatePersonalProfile.faxOffTwoInit = false;
				
				self.updatePersonalProfile.preferredAddressType = "";
				self.updatePersonalProfile.transactionPassword = "";
				self.updatePersonalProfile.auth = "";
				self.updatePersonalProfile.previewResponse = [];
				self.updatePersonalProfile.countryList = [];
				self.updatePersonalProfile.uaeCityList = [];
				self.updatePersonalProfile.isBack = false;
				self.updatePersonalProfile.OffTwoCountrycode = "";
				self.updatePersonalProfile.OffCountrycode = "";
				self.updatePersonalProfile.homeTwoCountrycode = "";
				self.updatePersonalProfile.homeCountrycode = "";
				self.updatePersonalProfile.homePrefer = "";
				self.updatePersonalProfile.homeTwoPrefer = "";
				self.updatePersonalProfile.OffPrefer = "";
				self.updatePersonalProfile.OffTwoPrefer = "";
				self.updatePersonalProfile.countryList = "";
				self.updatePersonalProfile.dateExpiry = new Date();
				self.updatePersonalProfile.dateExpiry_day = "";
				self.updatePersonalProfile.dateExpiry_month = "";
				self.updatePersonalProfile.dateExpiry_year = "";
				self.updatePersonalProfile.preferredAddressTypeServer = "";

				self.updatePersonalProfile.boolHomeOne = false;
				self.updatePersonalProfile.boolHomeTwo = false;
				self.updatePersonalProfile.boolOfficeOne = false;
				self.updatePersonalProfile.boolOfficeTwo = false;
				self.updatePersonalProfile.boolHomeFax = false;
				self.updatePersonalProfile.boolOffFaxOne = false;
				self.updatePersonalProfile.boolOffFaxTwo = false;
				
				self.updatePersonalProfile.boolHomeOne_CC = false;
				self.updatePersonalProfile.boolHomeTwo_CC = false;
				self.updatePersonalProfile.boolOfficeOne_CC = false;
				self.updatePersonalProfile.boolOfficeTwo_CC = false;
				self.updatePersonalProfile.boolHomeFax_CC = false;
				self.updatePersonalProfile.boolOffFaxOne_CC = false;
				self.updatePersonalProfile.boolOffFaxTwo_CC = false;
				
				self.updatePersonalProfile.expDate = new Date();
				/*RAK:2:-CitySearch-Start*/
				self.updatePersonalProfile.citySearchText = [];
				self.updatePersonalProfile.cityList = [];
//				self.updatePersonalProfile.cityCode = "";
				self.updatePersonalProfile.cityDesc = "";
				self.updatePersonalProfile.offCityDesc = "";
				self.updatePersonalProfile.head_offCityDesc = "";
				self.updatePersonalProfile.isOfficeCity=false;
				self.updatePersonalProfile.isHomeCity=false;
				self.updatePersonalProfile.isHeadOfficeCity=false;
				self.updatePersonalProfile.userTypeValue ="";
				self.updatePersonalProfile.isDirty = false;
				
				self.updatePersonalProfile.countryDesc="";
				self.updatePersonalProfile.offcountrydesc ="";
				self.updatePersonalProfile.head_offcountrydesc = "";
				/*RAK:2:-CitySearch-End*/

				//CHANGES DONE AS FIX OF PROUAT-2131 START
				self.updatePersonalProfile.previewDateOne="";
				//CHANGES DONE AS FIX OF PROUAT-2131 END
				  self.common.message="";
			}

		};

	self.setExpiryDate = function() {
		self.common.displayDate = self.updatePersonalProfile.dateExpiry;
		self.utils.populateCurrentDateDetails();

		self.updatePersonalProfile.dateExpiry_day =self.common.date;
		self.updatePersonalProfile.dateExpiry_month=self.common.month;
		self.updatePersonalProfile.dateExpiry_year=self.common.year;


	 };
	 //RAK OECD Changes
	 self.setFlagFalse= function() {
			//self.updatePersonalProfile.flag="false";
			self.updatePersonalProfile.popUpflag="false";
};

		self.setOECDPopUPFlag= function() {
			self.updatePersonalProfile.popUpflag="true";
		};

     self.validateCity = function(onCountryChange,cityType){
    	  var uaeCities = self.updatePersonalProfile.uaeCityList;
    	  var UAE = "AE";
    	  var EMPTY ="";
    	  var cityTypeList = self.updatePersonalProfile.VALID_CITY_TYPE;
		  var isOfficeCity = self.updatePersonalProfile.isOfficeCity ||
		  				cityTypeList[2] === cityType;
		  var isHomeCity = self.updatePersonalProfile.isHomeCity || 
		  				cityTypeList[1] === cityType ;
		  var isHeadOfficeCity = self.updatePersonalProfile.isHeadOfficeCity ||
		  				cityTypeList[3] === cityType;
	      var cityLabel = "city";
	      var countryLabel = "country";
	      var cityDescLabel = "cityDesc";


		  cityLabel =  isOfficeCity  ? "offcity" : 
			  (isHeadOfficeCity ? "head_offcity" : cityLabel);
		  countryLabel =  isOfficeCity  ? "offcountry" : 
			  (isHeadOfficeCity ? "head_offcountry" : countryLabel);
		  cityDescLabel =  isOfficeCity  ? "offCityDesc" : 
			  (isHeadOfficeCity ? "head_offCityDesc" : cityDescLabel);
		  var currentCity = self.updatePersonalProfile[cityLabel];
		  var currentCountry = self.updatePersonalProfile[countryLabel];
		  var isValidUAECity =	!!_.filter(uaeCities,function(cityObj){
			  					return cityObj.value == currentCity}).length;
		    if(!!onCountryChange && 
		    		( (isValidUAECity && currentCountry != UAE) ||
					  (!isValidUAECity && currentCountry == UAE)) ){
				 self.updatePersonalProfile[cityLabel]= EMPTY;
				 self.updatePersonalProfile[cityDescLabel]= EMPTY;
			} else if(isValidUAECity && currentCountry != UAE){
				 self.updatePersonalProfile[countryLabel] = UAE;
			} else if(!isValidUAECity && currentCountry == UAE){
				 self.updatePersonalProfile[countryLabel] = EMPTY;
			}  
			
			self.updatePersonalProfile.isOfficeCity=false;
			self.updatePersonalProfile.isHomeCity=false;
			self.updatePersonalProfile.isHeadOfficeCity=false;
			self.updatePersonalProfile.isDirty = true;
     };
		self.initUpdatePersonalProfile = function(responseList) {
			self.updatePersonalProfile.isOfficeCity = !!self.updatePersonalProfile.isOfficeCity;
			self.updatePersonalProfile.isHomeCity = !!self.updatePersonalProfile.isHomeCity;
			self.updatePersonalProfile.isHeadOfficeCity = !!self.updatePersonalProfile.isHeadOfficeCity;
			
			if (!responseList[0].hasOwnProperty('errorMessage'))
			{
				if (responseList[0].hasOwnProperty('UserTypeValue')) {
					self.updatePersonalProfile.userTypeValue = responseList[0].UserTypeValue;
				}
				
				if (self.updatePersonalProfile.userTypeValue != "") {
				

				if (responseList[0].hasOwnProperty('country')) {
					self.updatePersonalProfile.countryList = responseList[0].country;
				}
				if (responseList[0].hasOwnProperty('uaeCityList')) {
					self.updatePersonalProfile.uaeCityList = responseList[0].uaeCityList;
				}


				if (responseList[0].hasOwnProperty('NameParameters')) {
					self.updatePersonalProfile.nameList = responseList[0].NameParameters;
					self.updatePersonalProfile.title = self.updatePersonalProfile.nameList[0].title;
					self.updatePersonalProfile.firstName = self.updatePersonalProfile.nameList[0].firstName;
					self.updatePersonalProfile.middleName = self.updatePersonalProfile.nameList[0].middleName;
					self.updatePersonalProfile.lastName = self.updatePersonalProfile.nameList[0].lastName;
					self.updatePersonalProfile.fullName = self.updatePersonalProfile.title + ' ' + self.updatePersonalProfile.firstName + ' ' + self.updatePersonalProfile.middleName + ' ' + self.updatePersonalProfile.lastName;

				}


				if (responseList[0].hasOwnProperty('EmirateID') && !(responseList[0].EmirateID == '')) {
					self.updatePersonalProfile.emirateID = Number(responseList[0].EmirateID[0].ENumber);
					//CHANGES DONE AS FIX OF PROUAT-2901 START
					self.updatePersonalProfile.expDate = new Date(responseList[0].EmirateID[0].EExpiry,'DD-MM-YY');
					//CHANGES DONE AS FIX OF PROUAT-2901 END


					if(Object.prototype.toString.call(self.updatePersonalProfile.expDate) === "[object Date]"){
						if(isNaN(self.updatePersonalProfile.expDate.getTime())){
							if(responseList[0].EmirateID[0].EExpiry.indexOf("/")!=-1){
								self.updatePersonalProfile.dateExpiry = new Date(responseList[0].EmirateID[0].EExpiry.split('/')[1]+"/"+
										responseList[0].EmirateID[0].EExpiry.split('/')[0]+"/"+responseList[0].EmirateID[0].EExpiry.split('/')[2]);
							}
							else{
								self.updatePersonalProfile.dateExpiry = new Date(responseList[0].EmirateID[0].EExpiry.split('-')[1]+"/"+
										responseList[0].EmirateID[0].EExpiry.split('-')[0]+"/"+responseList[0].EmirateID[0].EExpiry.split('-')[2]);
							}
						}
						else{
							self.updatePersonalProfile.dateExpiry = self.updatePersonalProfile.expDate;
						}
					}
					else{
						self.updatePersonalProfile.dateExpiry = self.updatePersonalProfile.expDate;
					}

				}

				if(responseList[0].hasOwnProperty('homeAddressList') && !(responseList[0].homeAddressList == '')){
					self.updatePersonalProfile.address1 = responseList[0].homeAddressList[0].address1; 
					self.updatePersonalProfile.address2 = responseList[0].homeAddressList[0].address2;
					self.updatePersonalProfile.address3 = responseList[0].homeAddressList[0].address3;
					self.updatePersonalProfile.street = responseList[0].homeAddressList[0].street;
					self.updatePersonalProfile.pobox = 	responseList[0].homeAddressList[0].poBox;
					self.updatePersonalProfile.city = 	responseList[0].homeAddressList[0].city;
					self.updatePersonalProfile.cityDesc=responseList[0].homeAddressList[0].cityDescription;
					self.updatePersonalProfile.country = 	responseList[0].homeAddressList[0].country;


				}
				if(responseList[0].hasOwnProperty('offAddressList')&& !(responseList[0].offAddressList == '')){
					self.updatePersonalProfile.offaddress1 = responseList[0].offAddressList[0].address1;
					self.updatePersonalProfile.offaddress2 = responseList[0].offAddressList[0].address2;
					self.updatePersonalProfile.offaddress3 = responseList[0].offAddressList[0].address3;
					self.updatePersonalProfile.offStreet = responseList[0].offAddressList[0].street;
					self.updatePersonalProfile.offpobox = 	responseList[0].offAddressList[0].poBox;
					self.updatePersonalProfile.offcity = 	responseList[0].offAddressList[0].city;
					self.updatePersonalProfile.offCityDesc=responseList[0].offAddressList[0].cityDescription;
					self.updatePersonalProfile.offcountry = 	responseList[0].offAddressList[0].country;

				}

				if(responseList[0].hasOwnProperty('preferredAddress')){
					self.updatePersonalProfile.preferredAddressType = responseList[0].preferredAddress[0].addressType;
					
					if(self.updatePersonalProfile.preferredAddressType=="Head Office"){
						self.updatePersonalProfile.preferredAddressType="HEAD";
					}

				}

				if(responseList[0].hasOwnProperty('resPhnList')&& !(responseList[0].resPhnList == '')){
					self.updatePersonalProfile.homeNumber = responseList[0].resPhnList[0].resPhn;
					self.updatePersonalProfile.homeCountrycode = responseList[0].resPhnList[0].resCountry;
					self.updatePersonalProfile.homeNumberInit=true;


				}
				if(responseList[0].hasOwnProperty('homePhno2')&& !(responseList[0].homePhno2 == '')){
					self.updatePersonalProfile.homeNumberTwo = responseList[0].homePhno2[0].resPhn;
					self.updatePersonalProfile.homeTwoCountrycode = responseList[0].homePhno2[0].resCountry;
					self.updatePersonalProfile.homeNumberTwoInit=true;


				}

				if(responseList[0].hasOwnProperty('offPhnList')&& !(responseList[0].offPhnList == '')){
					self.updatePersonalProfile.offNumber = responseList[0].offPhnList[0].offPhn;
					self.updatePersonalProfile.OffCountrycode = responseList[0].offPhnList[0].offCountry;
					self.updatePersonalProfile.offNumberInit=true;


				}
				if(responseList[0].hasOwnProperty('offPhn2')&& !(responseList[0].offPhn2 == '')){
					self.updatePersonalProfile.offNumberTwo = responseList[0].offPhn2[0].offPhn;
					self.updatePersonalProfile.OffTwoCountrycode = responseList[0].offPhn2[0].offCountry;
					self.updatePersonalProfile.offNumberTwoInit=true;

				}

				if(responseList[0].hasOwnProperty('faxNoHome')&& !(responseList[0].faxNoHome == '')){
					self.updatePersonalProfile.faxHome = responseList[0].faxNoHome[0].faxNo;
					self.updatePersonalProfile.faxHome_CC = responseList[0].faxNoHome[0].country;
					self.updatePersonalProfile.faxHomeInit=true;

				}

				if(responseList[0].hasOwnProperty('faxNo1')&& !(responseList[0].faxNo1 == '')){
					self.updatePersonalProfile.faxOffOne = responseList[0].faxNo1[0].faxNo;
					self.updatePersonalProfile.faxOffOne_CC = responseList[0].faxNo1[0].country;
					self.updatePersonalProfile.faxOffOneInit=true;

				}
				if(responseList[0].hasOwnProperty('faxNo2')&& !(responseList[0].faxNo2 == '')){
					self.updatePersonalProfile.faxOffTwo = responseList[0].faxNo2[0].faxNo;
					self.updatePersonalProfile.faxOffTwo_CC = responseList[0].faxNo2[0].country;
					self.updatePersonalProfile.faxOffTwoInit=true;

				}
				
				
				if(responseList[0].hasOwnProperty('HeadOfficeAddress') && !(responseList[0].HeadOfficeAddress == '')){
					self.updatePersonalProfile.head_offaddress1 = responseList[0].HeadOfficeAddress[0].address1;
					self.updatePersonalProfile.head_offaddress2 = responseList[0].HeadOfficeAddress[0].address2;
					self.updatePersonalProfile.head_offaddress3 = responseList[0].HeadOfficeAddress[0].address3;
					/*	self.updatePersonalProfile.head_offStreet = "";*/
					self.updatePersonalProfile.head_offpobox = 	responseList[0].HeadOfficeAddress[0].poBox;
					self.updatePersonalProfile.head_offcity = 	responseList[0].HeadOfficeAddress[0].city;
					self.updatePersonalProfile.head_offCityDesc= responseList[0].HeadOfficeAddress[0].cityDescription;
					self.updatePersonalProfile.head_offcountry = 	responseList[0].HeadOfficeAddress[0].country;
					self.updatePersonalProfile.mailAddress = self.updatePersonalProfile.head_offaddress1 + ' ' + self.updatePersonalProfile.head_offaddress2;


				}
				
				self.validateCity()
				
				
				

			}

			}

		};
		/*RAK:2:-CitySearch-Start*/
		self.getCitySearchList=function(responseList){			
			if (responseList[0].hasOwnProperty('cityList')) {
					self.updatePersonalProfile.cityList= responseList[0].cityList;
				}
		};
		/*RAK:2:-CitySearch-end*/
		
		self.checkDirty=function(){
			
			if(self.updatePersonalProfile.isDirty==false && jQuery("#modProfile").find(".ng-dirty").length!=0 && !self.updatePersonalProfile.isBack){
				self.updatePersonalProfile.isDirty= true;
                
				}
			
			
		};
		
		self.chkUpdateValue=function(){
			
			if(self.updatePersonalProfile.isDirty==false && jQuery("#modProfile").find(".ng-dirty").length==0 && !self.updatePersonalProfile.isBack){
				rootScope.showErrorPopup(rootScope.appLiterals.APP.RAKERRORMSG.RAKMODIFIEDVALUES);
                return;                
			}
			else{
				self.setExpiryDate();
				self.updatePersonalProfileContinue();
				scope.setEvent('onUpdatePPEditClick');
				
			}
			
		};
		self.updatePersonalProfileContinue = function() {


			if(self.updatePersonalProfile.preferredAddressType == "RESIDENCE" )
				self.updatePersonalProfile.preferredAddressTypeServer = "ROH";
			else if(self.updatePersonalProfile.preferredAddressType == "OFFICE" )
						self.updatePersonalProfile.preferredAddressTypeServer = "O";
			else if(self.updatePersonalProfile.preferredAddressType == "HEAD" )
				self.updatePersonalProfile.preferredAddressTypeServer = "H";


			if (self.updatePersonalProfile.userTypeValue != "2") {
				if(self.updatePersonalProfile.homeCountrycode!=null && self.updatePersonalProfile.homeCountrycode!="" )
					self.updatePersonalProfile.boolHomeOne = true;
				else
					self.updatePersonalProfile.boolHomeOne = false;
				
				if(self.updatePersonalProfile.faxHome_CC!=null && self.updatePersonalProfile.faxHome_CC!="")
					self.updatePersonalProfile.boolHomeFax = true;
				else
					self.updatePersonalProfile.boolHomeFax = false;
				
				if(self.updatePersonalProfile.homeTwoCountrycode!=null && self.updatePersonalProfile.homeTwoCountrycode!="")
					self.updatePersonalProfile.boolHomeTwo = true;
				else
					self.updatePersonalProfile.boolHomeTwo = false;
				
				
				
				if(self.updatePersonalProfile.homeNumber!=null && self.updatePersonalProfile.homeNumber!="" )
					self.updatePersonalProfile.boolHomeOne_CC = true;
				else
					self.updatePersonalProfile.boolHomeOne_CC = false;
				
				if(self.updatePersonalProfile.faxHome!=null && self.updatePersonalProfile.faxHome!="")
					self.updatePersonalProfile.boolHomeFax_CC = true;
				else
					self.updatePersonalProfile.boolHomeFax_CC = false;
				
				if(self.updatePersonalProfile.homeNumberTwo!=null && self.updatePersonalProfile.homeNumberTwo!="")
					self.updatePersonalProfile.boolHomeTwo_CC = true;
				else
					self.updatePersonalProfile.boolHomeTwo_CC = false;
				
			}

			

			if(self.updatePersonalProfile.OffCountrycode!=null && self.updatePersonalProfile.OffCountrycode!="")
				self.updatePersonalProfile.boolOfficeOne = true;
			else
				self.updatePersonalProfile.boolOfficeOne = false;

			if(self.updatePersonalProfile.OffTwoCountrycode!=null && self.updatePersonalProfile.OffTwoCountrycode!="")
				self.updatePersonalProfile.boolOfficeTwo = true;
			else
				self.updatePersonalProfile.boolOfficeTwo = false;
			


			if(self.updatePersonalProfile.offNumber!=null && self.updatePersonalProfile.offNumber!="")
				self.updatePersonalProfile.boolOfficeOne_CC = true;
			else
				self.updatePersonalProfile.boolOfficeOne_CC = false;

			if(self.updatePersonalProfile.offNumberTwo!=null && self.updatePersonalProfile.offNumberTwo!="")
				self.updatePersonalProfile.boolOfficeTwo_CC = true;
			else
				self.updatePersonalProfile.boolOfficeTwo_CC = false;

			
			

			if(self.updatePersonalProfile.faxOffOne_CC!=null && self.updatePersonalProfile.faxOffOne_CC!="")
				self.updatePersonalProfile.boolOffFaxOne = true;
			else
				self.updatePersonalProfile.boolOffFaxOne = false;

			if(self.updatePersonalProfile.faxOffTwo_CC!=null && self.updatePersonalProfile.faxOffTwo_CC!="")
				self.updatePersonalProfile.boolOffFaxTwo = true;
			else
				self.updatePersonalProfile.boolOffFaxTwo = false;
			


			if(self.updatePersonalProfile.faxOffOne!=null && self.updatePersonalProfile.faxOffOne!="")
				self.updatePersonalProfile.boolOffFaxOne_CC = true;
			else
				self.updatePersonalProfile.boolOffFaxOne_CC = false;

			if(self.updatePersonalProfile.faxOffTwo!=null && self.updatePersonalProfile.faxOffTwo!="")
				self.updatePersonalProfile.boolOffFaxTwo_CC = true;
			else
				self.updatePersonalProfile.boolOffFaxTwo_CC = false;


		};

		self.initUpdatePersonalProfileConfirm = function(responsesList) {
			if (!responsesList[0].hasOwnProperty('errorMessage')) {

				self.updatePersonalProfile.previewResponse = responsesList[0];
				self.updatePersonalProfile.auth = responsesList[0].auth;
				self.updatePersonalProfile.transactionPassword = "";

				//CHANGES DONE AS FIX OF PROUAT-2131 START	
				//RAK OECD changes
				if (responsesList[0].hasOwnProperty('flag')) {
					self.updatePersonalProfile.flag = responsesList[0].flag;
					
				}
				if (responsesList[0].hasOwnProperty('changes')) {
					self.updatePersonalProfile.changes = responsesList[0].changes;
					
				}
                 if (responsesList[0].hasOwnProperty('CountryDisplay')) {
									self.updatePersonalProfile.countryDesc = responsesList[0].CountryDisplay;
								}
                 
                 if (responsesList[0].hasOwnProperty('previewDate')) {
						self.updatePersonalProfile.previewDateOne = responsesList[0].previewDate;
					}
                 
                 if (responsesList[0].hasOwnProperty('OffCountryDisplay')) {
						self.updatePersonalProfile.offcountrydesc = responsesList[0].OffCountryDisplay;
					}
                 
                 if (responsesList[0].hasOwnProperty('HeadCountryDisplay')) {
						self.updatePersonalProfile.head_offcountrydesc = responsesList[0].HeadCountryDisplay;
					}
				//CHANGES DONE AS FIX OF PROUAT-2131 END	
                 self.common.message=responsesList[0].MESSAGE ? responsesList[0].MESSAGE :'';

			}
			self.updatePersonalProfile.transactionPassword = "";
		};

	/* RAK:5: - Update Personal Details : END */
	self.viewPersonalProfile = {
			nameList : [],
			emailID : "",
			title:"",
			firstName:"",
			middleName:"",
			lastName:"",
			fullName:"",
			passportNumber:"",
			emirateID:"",
			passportNumber:"",
			mailAddress:"",
			offAddress:"",
			address1:"",
			address2:"",
			address3:"",
			address4:"",
			pobox:"",
			city:"",
			country:"",
			offaddress1:"",
			offaddress2:"",
			offpobox:"",
			offcity:"",
			offcountry:"",
			address1:"",
			homeNumber:"",
			offNumber:"",
			mobileNumber:"",
			userTypeValue:"",
			faxNumber:"",
			TradeLicenceNumber:"",
			preferredAddressType:"",
			preferredAddressTypeDesc:"",



			resetViewPersonalProfileModel : function() {

				self.viewPersonalProfile.nameList = [];
				self.viewPersonalProfile.title = "";
				self.viewPersonalProfile.firstName = "";
				self.viewPersonalProfile.middleName = "";
				self.viewPersonalProfile.lastName = "";
				self.viewPersonalProfile.passportNumber = "";
				self.viewPersonalProfile.emirateID = "";
				self.viewPersonalProfile.emailID = "";
				self.viewPersonalProfile.address1 = "";
				self.viewPersonalProfile.address2 = "";
				self.viewPersonalProfile.address3 = "";
				self.viewPersonalProfile.address4 = "";
				self.viewPersonalProfile.pobox = "";
				self.viewPersonalProfile.city = "";
				self.viewPersonalProfile.country = "";
				self.viewPersonalProfile.offaddress1 = "";
				self.viewPersonalProfile.offaddress2 = "";
				self.viewPersonalProfile.offpobox = "";
				self.viewPersonalProfile.offcity = "";
				self.viewPersonalProfile.offcountry = "";
				self.viewPersonalProfile.mailAddress = "";
				self.viewPersonalProfile.offAddress = "";
				self.viewPersonalProfile.mobileNumber = "";
				self.viewPersonalProfile.offNumber = "";
				self.viewPersonalProfile.homeNumber = "";
				self.viewPersonalProfile.UserTypeValue = "";
				self.viewPersonalProfile.TradeLicenceNumber = "";
				self.viewPersonalProfile.faxNumber = "";
				self.viewPersonalProfile.preferredAddressType = "";
				self.viewPersonalProfile.preferredAddressTypeDesc = "";
				
				
				


			}

		};

		self.initViewPersonalProfile = function(responseList) {
			if (!responseList[0].hasOwnProperty('errorMessage'))
			{
				
				if (responseList[0].hasOwnProperty('UserTypeValue')) {
					self.viewPersonalProfile.userTypeValue = responseList[0].UserTypeValue;
				}
				
				if (self.viewPersonalProfile.userTypeValue != "") {
					switch (self.viewPersonalProfile.userTypeValue) {
					case "2":
						if (responseList[0].hasOwnProperty('NameParameters')) {
							self.viewPersonalProfile.nameList = responseList[0].NameParameters;
							self.viewPersonalProfile.title = self.viewPersonalProfile.nameList[0].title;
							self.viewPersonalProfile.firstName = self.viewPersonalProfile.nameList[0].firstName;
							self.viewPersonalProfile.middleName = self.viewPersonalProfile.nameList[0].middleName;
							self.viewPersonalProfile.lastName = self.viewPersonalProfile.nameList[0].lastName;
							self.viewPersonalProfile.fullName = self.viewPersonalProfile.title + ' ' + self.viewPersonalProfile.firstName + ' ' + self.viewPersonalProfile.middleName + ' ' + self.viewPersonalProfile.lastName;
		
						}
						
						if (responseList[0].hasOwnProperty('TradeLicence') && !(responseList[0].TradeLicence == '')) {
							self.viewPersonalProfile.TradeLicenceNumber = responseList[0].TradeLicence[0].TNumber;
						}
						
						if(responseList[0].hasOwnProperty('preferredAddress')&& !(responseList[0].preferredAddress == '')){
							self.viewPersonalProfile.preferredAddressType = responseList[0].preferredAddress[0].addressType;
							self.viewPersonalProfile.preferredAddressTypeDesc = responseList[0].preferredAddress[0].addressTypeDesc;

						}
						
						if(responseList[0].hasOwnProperty('offAddressList') && !(responseList[0].offAddressList == '')){
							self.viewPersonalProfile.offaddress1 = responseList[0].offAddressList[0].address1;
							self.viewPersonalProfile.offaddress2 = responseList[0].offAddressList[0].address2;
							self.viewPersonalProfile.offaddress3 = responseList[0].offAddressList[0].address3;
							self.viewPersonalProfile.offpobox = 	responseList[0].offAddressList[0].poBox;
							self.viewPersonalProfile.offcity = 	responseList[0].offAddressList[0].city;
							self.viewPersonalProfile.offcountry = 	responseList[0].offAddressList[0].country;
							self.viewPersonalProfile.offAddress = self.viewPersonalProfile.offaddress1 + ' ' + self.viewPersonalProfile.offaddress2 + ' ' + self.viewPersonalProfile.offaddress3;
		
						}
						
						if(responseList[0].hasOwnProperty('HeadOfficeAddress') && !(responseList[0].HeadOfficeAddress == '')){
							self.viewPersonalProfile.address1 = responseList[0].HeadOfficeAddress[0].address1;
							self.viewPersonalProfile.address2 = responseList[0].HeadOfficeAddress[0].address2;
							self.viewPersonalProfile.address3 = responseList[0].HeadOfficeAddress[0].address3;
							self.viewPersonalProfile.pobox = 	responseList[0].HeadOfficeAddress[0].poBox;
							self.viewPersonalProfile.city = 	responseList[0].HeadOfficeAddress[0].city;
							self.viewPersonalProfile.country = 	responseList[0].HeadOfficeAddress[0].country;
							self.viewPersonalProfile.mailAddress = self.viewPersonalProfile.address1 + ' ' + self.viewPersonalProfile.address2 + ' ' + self.viewPersonalProfile.address3;
		
		
						}
						
						if(responseList[0].hasOwnProperty('FaxList') && !(responseList[0].FaxList == '')){
							self.viewPersonalProfile.faxNumber = responseList[0].FaxList[0].faxNo;
		
						}
		
						if(responseList[0].hasOwnProperty('offPhnList') && !(responseList[0].offPhnList == '')){
							self.viewPersonalProfile.offNumber = responseList[0].offPhnList[0].offPhn;
		
						}
		
		
						if(responseList[0].hasOwnProperty('contactNumber') && !(responseList[0].contactNumber == '')){
							self.viewPersonalProfile.mobileNumber = responseList[0].contactNumber[0].phnNumber;
		
						}
						
						
						
						break;
						
					default:	
						if (responseList[0].hasOwnProperty('NameParameters')) {
							self.viewPersonalProfile.nameList = responseList[0].NameParameters;
							self.viewPersonalProfile.title = self.viewPersonalProfile.nameList[0].title;
							self.viewPersonalProfile.firstName = self.viewPersonalProfile.nameList[0].firstName;
							self.viewPersonalProfile.middleName = self.viewPersonalProfile.nameList[0].middleName;
							self.viewPersonalProfile.lastName = self.viewPersonalProfile.nameList[0].lastName;
							self.viewPersonalProfile.fullName = self.viewPersonalProfile.title + ' ' + self.viewPersonalProfile.firstName + ' ' + self.viewPersonalProfile.middleName + ' ' + self.viewPersonalProfile.lastName;
		
						}
					
					if(responseList[0].hasOwnProperty('preferredAddress')&& !(responseList[0].preferredAddress == '')){
						self.viewPersonalProfile.preferredAddressType = responseList[0].preferredAddress[0].addressType;
						self.viewPersonalProfile.preferredAddressTypeDesc = responseList[0].preferredAddress[0].addressTypeDesc;

					}
		
						if (responseList[0].hasOwnProperty('PassportNumber') && !(responseList[0].PassportNumber == '')) {
							self.viewPersonalProfile.passportNumber = responseList[0].PassportNumber[0].PNumber;
						}
						if (responseList[0].hasOwnProperty('EmirateID') && !(responseList[0].EmirateID == '')) {
							self.viewPersonalProfile.emirateID = responseList[0].EmirateID[0].ENumber;
						}
						if (responseList[0].hasOwnProperty('emailList') && !(responseList[0].emailList == '')) {
							self.viewPersonalProfile.emailID = responseList[0].emailList[0].email;
						}
						if(responseList[0].hasOwnProperty('homeAddressList') && !(responseList[0].homeAddressList == '')){
							self.viewPersonalProfile.address1 = responseList[0].homeAddressList[0].address1;
							self.viewPersonalProfile.address2 = responseList[0].homeAddressList[0].address2;
							self.viewPersonalProfile.address3 = responseList[0].homeAddressList[0].address3;
							self.viewPersonalProfile.address4 = responseList[0].homeAddressList[0].address4;
							self.viewPersonalProfile.pobox = 	responseList[0].homeAddressList[0].poBox;
							self.viewPersonalProfile.city = 	responseList[0].homeAddressList[0].city;
							self.viewPersonalProfile.country = 	responseList[0].homeAddressList[0].country;
							self.viewPersonalProfile.mailAddress = self.viewPersonalProfile.address1 + ' ' + self.viewPersonalProfile.address2 + ' ' + self.viewPersonalProfile.address3 + ' ' + self.viewPersonalProfile.address4;
		
		
						}
						if(responseList[0].hasOwnProperty('offAddressList') && !(responseList[0].offAddressList == '')){
							self.viewPersonalProfile.offaddress1 = responseList[0].offAddressList[0].address1;
							self.viewPersonalProfile.offaddress2 = responseList[0].offAddressList[0].address2;
							self.viewPersonalProfile.offaddress3 = responseList[0].offAddressList[0].address3;
							self.viewPersonalProfile.offpobox = 	responseList[0].offAddressList[0].poBox;
							self.viewPersonalProfile.offcity = 	responseList[0].offAddressList[0].city;
							self.viewPersonalProfile.offcountry = 	responseList[0].offAddressList[0].country;
							self.viewPersonalProfile.offAddress = self.viewPersonalProfile.offaddress1 + ' ' + self.viewPersonalProfile.offaddress2  + ' ' + self.viewPersonalProfile.offaddress3;
		
						}
		
						if(responseList[0].hasOwnProperty('resPhnList') && !(responseList[0].resPhnList == '')){
							self.viewPersonalProfile.homeNumber = responseList[0].resPhnList[0].resPhn;
		
						}
		
						if(responseList[0].hasOwnProperty('offPhnList') && !(responseList[0].offPhnList == '')){
							self.viewPersonalProfile.offNumber = responseList[0].offPhnList[0].offPhn;
		
						}
		
		
						if(responseList[0].hasOwnProperty('contactNumber') && !(responseList[0].contactNumber == '')){
							self.viewPersonalProfile.mobileNumber = responseList[0].contactNumber[0].phnNumber;
		
						}
					}

				}
			}

		};
		
		self.picImage = function(){
	        
		      
        	
            openPhotos(function(response){
           
           	  if(WL.Client.getEnvironment() == WL.Environment.IPHONE || WL.Client.getEnvironment() == WL.Environment.IPAD){
                	 response = JSON.parse(response);
                	 rootScope.showErrorPopup(rootScope.appLiterals.APP.RAK_FILE_MESSAGE.ATTACHED);
                	 rootScope.$apply();
                }
            
            if(response.image!=""){
           	 self.userProfilePicTemp=response.image;
           	 rootScope.showErrorPopup(rootScope.appLiterals.APP.RAK_FILE_MESSAGE.ATTACHED);
           	 rootScope.$apply();
             /*   ActionProcessor.setEvent("uploadProfilePic").then(function(data){
                      
                     
                     
                      
                      if(data.responsesList[0].successMessage=="SUCCESS"){
                   	     rootScope.displayToast(rootScope.appLiterals.APP.SUCCESS_MESSAGE.PROFILE_PHOTO_SUCCESS_MSG);
                            self.userProfilePicPresent=true;
                            self.userProfilePic = "data:image/jpeg;base64,"+response.image;
                            rootScope.$apply();

                         }
                     
                },function(error){
                      //Error reading framework.json file. Handle this with a retry.
                     alert(response.errorMessage); 
                });;*/
          	}
           
            },function(response){
			 alert(response.errorMessage);
			 },self.minSize,self.maxSize,rootScope.selectedLocale.locale,self.imageFormat);

   
		};

		self.initialiseForceChangeFlow=function(){
			rootScope.stepupAuthentication.isForceChangePwdFlow=false;
		};
		
		self.enableLoginScenario=function(){
			rootScope.isUserLoggedIn=true;
		 if(!rootScope.$$phase){
			rootScope.$apply();
		 }	
		};
		
		self.isUserLoggedInScenario=function(){
			rootScope.isUserLoggedIn=false;
		 if(!rootScope.$$phase){
			rootScope.$apply();
		 }	
		};
		self.disableLoginScenario=function(){
			rootScope.stepupAuthentication.isCompleted = false;
			rootScope.stepupAuthentication.isForceChangePwdFlow=true;
			rootScope.isUserLoggedIn=false;
		 if(!rootScope.$$phase){
			rootScope.$apply();
		 }	
		};
		
		self.HardTokenLoginScenario=function(){
			rootScope.stepupAuthentication.isCompleted = false;
			rootScope.stepupAuthentication.isForceChangePwdFlow=true;
			rootScope.isUserLoggedIn=false;
		 if(!rootScope.$$phase){
			rootScope.$apply();
		 }	
		};
		self.reLoadLoginPage=function(){
			rootScope.reloadFunction();
		};
		
		self.checkImageUploaded = function(){
			if(!self.userProfilePicTemp){
				rootScope.showErrorPopup(rootScope.appLiterals.APP.RAK_FILE_MESSAGE.NOIMAGE);
				return;
			}
			
			scope.setEvent("onTLUploadContinueClick");
		};

};