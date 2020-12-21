
/* JavaScript content from js/viewModels/rakPayee.js in folder common */
App.viewModels.rakPayee=function(scope,rootScope, Logger,ActionProcessor){
	var self=this;
	///*RAK:2:-SelfConfirmationListFetch-Payee-Start*/
	self.rakSelfConfirmationPayeeListFetch = {};
	///*RAK:2:-SelfConfirmationListFetch-Payee-End*/
	s=self;
	self.scope=scope;
	self.rootScope=rootScope;

	self.DDMCQ={
			navigationType:''
	};
	self.disclaimerText = "";
	self.disclaimerTextForAddBiller="";
	self.billersList = [];
	self.ccBeneficiaryList = [];
	self.beneficiaryList = [];
	self.mobCashBeneficiaryList = [];
	self.currencyList = [];
	self.networkType = [];
	self.accountType = [];
	self.bankDetails = [];
	self.payeeInitServiceResponse = [];
	self.isUserAuthenticated=false;
	self.isIFSCSearchInProgress = false;
	self.beneficiaryAuthDetails = [];
	self.billerAuthDetails = [];
	self.isEditBeneficiaryMode = false;
	self.isDeleteBeneficiaryMode = false;
	self.isUserNavigatingBack = false;
	self.doShowAlertMessage = false;
	self.doShowAlertProxyFlag = false;
	self.payeeList = [];
	self.selectedPayee = {};
	self.selfHoldingAccounts = {};
	self.isBillerAuthSent = false;
	self.isShowAlert = false;
	self.isAlertAnError = false;
	self.selectedBillerIndex = -1;
	self.isPresentMentBiller = false;
	self.isAutoPaySet = false;
	self.isBackClicked=false;
	/*RAK:2:-SelfConfirmationListFetch-Payee-Start*/
	self.rakConfirmbillerList=[];
	/*RAK:2:-SelfConfirmationListFetch-Payee-End*/
	/*RAK:2:-AddBnfPage-List-Start*/
	self.rakBnfBankTypeList=[];
	self.prpmCoolingPeriod=[]; //Added for Cooling Period CR
	self.prpmCoolingPeriodAmount="";	//Added for Cooling Period CR
	self.isEligibleCoolingPeriodSmeSegment="";	//Added for Cooling Period CR
	self.rakBnfCCTypeList=[];
	self.rakCountryList = [];
	self.DDMCQCountryList = [];
	self.rakBankList = [];
	/*RAK:2:-AddBnfPage-List-End*/
	self.beneficiarySuccessDetails = [];/*RAK:2:-Successpage*/
	self.bankbnftype=" ";/*RAK:2:-AddBnfBanktype*/
	self.payeeSelected={};/*RAK:2:-BillerView*/
	self.deleteSuccess="";/*RAK:2:-BillerDelete*/
	// Intentionally kept empty as the the functionality is only to display the content.
	self.ACC_IDX = " ";
	self.ACC_IDX_TYPE = " ";
	self.cardsTab=false;//RAK:2:-Cards Tab
	self.billsTab=false;//RAK:2:-Bills Tab
	self.quickPayTab=false;
	self.confirmPayeeTab=false;//added-confirmpayee
	//DDMC
	self.ddmcBenfTab=false;
	self.ddmcServReqTab=false;
	self.ddmcTxnHistTab=false;
	self.clearDdmcTab=function()
 	{
		self.ddmcBenfTab=false;
		self.ddmcServReqTab=false;
		self.ddmcTxnHistTab=false;

 	};
 	self.clearDDSTab=function()
 	{
		self.ddsPayeeTab=false;
		self.ddsTxnHistoryTab=false;
//		self.ddsTab=false;

 	};
	//DDMC
	//date
	self.displayDate = new Date();

	/*RAK:2:-Auth mode-Start*/
	self.authType="";
	self.secAuthType="";
	self.authMode={
			OTP:0,
			TransactionPassword:1,
			None:-1,
			Both:2,
			HardToken:3,
			isTransactionPwd:false,
			isSmsOtp:false,
			isFirstAuthMode:false,
			isSecAuthMode:false,

			firstAuthMode:"",
			secAuthMode:"",

			firstAuthModeValue:"",
			secAuthModeValue:"",

		clearAuthMode:function(){
				self.authMode.isTransactionPwd=false;
				self.authMode.isSmsOtp=false;

				self.authType=self.authMode.None;
				self.secAuthType=self.authMode.None;
				self.authMode.isFirstAuthMode=false;
				self.authMode.isSecAuthMode=false;
				self.authMode.firstAuthMode="";
				self.authMode.secAuthMode="";
				self.authMode.firstAuthModeValue="";
				self.authMode.secAuthModeValue="";
		}
	};
	self.authType=self.authMode.None;
	self.secAuthType=self.authMode.None;

	//For Constants
	self.constants={
            //Biller dropdown
			OTHER:'OTHR',
			EMAAR:'EMAAR',
			DEWA:'DEWA',
			SEWA:'SEWA',
			FEWA:'FEWA',
			RAKTOLL: 'RAKTOLL-ABER', //Added for RAK Toll CR
			RAKTOLLTOPUP: 'Top-up/Recharge', //Added for RAK Toll CR
			FEWASERVICETYPE:'FewaBill',
			SALIK:'SALIK',
			SALIKSERVICETYPE:'SALIKRECHARGE',
			SERVICETYPELABEL:'Service Type',
			PAYMENTPURPOSELABEL:'Payment Purpose',
			OTHERSLABEL:'Others',
			OPTIONAL:'O',
			MANDATORY:'M',
			//Country Code
			IN:'IN',
			AE:'AE',
			UAE:'United Arab Emirates',
			INDIA:'INDIA',
			INDIA_CAMEL:'India',
			//For Confirm flow
			SUBMIT:'SUBMIT',
			REJECT:'REJECT',
			CONFIRMNOW:'CN',
			CONFIRMLATER:'CL',
			TRANSACTIONPASSWORD:'Transaction Password',
			TRANSACTIOPASSWORDSMSOTP:'Transaction PasswordSMS OTP',
			HARDTOKEN:'HardToken',
			SMSOTP:'SMS OTP',
			//EB Bnf type
			HOMEBANK:'HBK',
			OUTSIDEBANK:'ABK',
			WITHINBANK:'OBK',
			PREPAIDCARD:'SVC',
			DEMANDDRAFT:'D',
			MANAGERCHEQUE:'M',
			//TXN type
			TXNTYPEMOBCASH:'MCB',
			TXNTYPEPREPAIDCARD:'PPC',
			TXNTYPEBNF:'BNF',
			NETWORKTYPEDDMC:'DDM',
			TXNTYPEDDS:'DDS',
            //AccNo/IBAN/CCard indicator
			ACCOUNT:'A',
			ACCOUNTLABEL:'Account',
			IBAN:'I',
			CREDITCARD:'C',
			CREDITCARDLABEL:'CreditCard',
			YES:'Y',
			NO:'N',
			//Fixed/Variable amount
			FIXEDAMOUNT:'F',
			VARIABLEAMOUNT:'V',
			FIXEDAMOUNTLABEL:'Fixed',
			VARIABLEAMOUNTLABEL:'Variable',
		   //PaymentFrequency-DDS
			PAYFREQONETIME:'8',
		    DEFINEDDAYS:'X',
			TXNTYPEPMT:'IBP',
			TXNTYPEPMTLABEL:'Payments',
			ALL:'All',
			IBP:'IBP',
			ONCE:'Once',

			CEBUANA:'CASH'

	};


	/*RAK:2:-Auth mode-End*/
	self.payeeTypes = {
			/*RAK:2:-BNF module-Added for different types of beneficiaries-start*/
			RAKBANK:"RBF",
			WITHINUAEBANK:"UBF",
			OUTSIDEUAEBANK:"OBF",
			BILLER:"BILLER",
			RAKCREDITCARD:"RCC",
			WITHINUAECCARD:"UCC",
			OUTSIDEUAECCARD:"OCC",
			PREPAIDCARD:"PPC",
			AMEXCARD:'AMEXAEADXXX',
			MOBCASH:"RMC",
			DD:"DBF",
			MCHQ:"MBF",
			BANK:"BANK",
			CCARD:"CCARD",
			DDS:"DDS",
			CEBUANA:"CASH",
			PAYBILLS:"PBE",
			/*MOBCASH:8,*/
			/*SAMEBANK:"RBF",*/
			/*OTHERBANK:"UBF",*/
			/*OTHERBANKOUT:"OBF",*/
		    /*SAMECREDITCARD:"RCC",*/
		    /*OTHERCREDITCARD:"UCC",*/
			/*OTHEROUTCREDITCARD:"OCC",	*/
			/*RMC:8,*/
			NONE:-1
			/*RAK:2:-BNF module-Added for different types of beneficiaries-end*/
	};
	self.selectedPayeeType ="";

	self.beneficiaryDetails = {};
	self.selectedPayeeIndex=null;
	self.fromBenfList=false;
	self.toggleAutoPay=function(){
		self.isAutoPaySet = !self.isAutoPaySet;
	};

	self.payeeModel = {
			name:"",
			nickName:"",
			accountNumber:"",
			selectedBank:"",
			showFDAComponentFlag:"Y", //FTA
			selectedBankDisplayName:"",
			selectedCurrency:"",
			selectedBeneficaryName:"",
			selectedRoutingNumber:"",
			ifscCode:"",
			/*RAK:2:-BNF Module-Added for credit card payee and mobile cash-start*/
			creditCardNumber:"",
			creditCardNumberAmex:"",
			mobileNumber:"",
			bankCity:"",
			bankBranch:"",
		    rakBnfCountry:"",
		    rakBenfResidentCountry:"",
		    rakBnfCountryDisplayName:"",
		    rakBnfResidentCountryDisplayName:"",
		    rakInterMedBank:"",
		    rakBnkCode:"",
		    isAccIban:self.constants.ACCOUNT,
		    swiftCode:"",
		    bnfid:"",
		    isIndiaFlg:false,
			/*RAK:2:-BNF Module-Added for credit card payee and mobile cash -end*/
		    /*RAK:2:-AddBnfPage-Start*/
		    addBankBnfFlag:false,

		    editBnfFlag:false,

			addMobCashBnfFlag:false,
			confirmPayeeTab:false,
			/*RAK:2:-AddBnfPage-End*/
			payeeNotificationEmail:"",
			payeeNotificationMobile:"",
			payeeNotificationChannel1: "",
			payeeNotificationChannel2: "",
			transactionPassword:"",
			smsOtp:"",/*RAK:2:-OTP-BillReg*/
			isAuthSet:false,
			beneficiaryAddSuccessResponse:"",
			displayAccountType:true,
			rAKConfirm:"",/*RAK:2:-ConfirmPayee*/
			countryCode:"",/*RAK:2:-MobCash*/
			txnType:"",
			ifscBankName:"",
			ifscBankBranch:"",
			/*DDS*/
			ddsRegPayeeList:[],
			serviceProvider:"",
			serviceProviderDisplayName:"",
			utilityServiceList:[],
			utilityService:"",
			utilityServiceDisplayName:"",
			serviceProviderList:[],
			utilityNumber:"",
			debitFrom:"",
			accountList:[],
			accountNumberdds:"",
			accountDisplayName:"",
			isAcctFlag:false,
			creditCardList:[],
			creditCardNumberdds:"",
			creditcardDisplayName:"",
			isCredCardFlag:false,
			issuedFor:"",
			commenceDateDdsEdit:"",
			commenceDateDdsEditDisplay:"",
			commenceDateDdsTxn:"",
			commenceDateDdsTxnDisplay:"",
			commenceDateDisplay:"",
			commenceDate:"",
			commenceDay:"",
			commenceMonth:"",
			commenceYear:"",
			expiryDateDdsEdit:"",
			expiryDateDdsEditDisplay:"",
			expiryDateDisplay:"",
			expiryDateDdsTxn:"",
			expiryDateDdsTxnDisplay:"",
			expiryDate:"",
			expiryDay:"",
			expiryMonth:"",
			expiryYear:"",
			paymentFrequencyList:[],
			paymentFrequency:"",
			paymentFrequencyIndex:"",
			paymentFrequencyDisplayName:"",
			definedDays:"",
			isDefinedDaysFlg:false,
			isCommenceDateFlg:true,
			fixedVarAmount:"",
			fixedVarAmountDisplayName:"",
			isFixedFlg:false,
			fixedAmount:"",
			isVariableFlg:false,
			variableAmount:"",
			variableMaxAmount:"",
			variableMinAmount:"",
			isEditDdsPayee:false,
			isDeleteDdsPayee:false,
			ddsCancelReason:"",
			serviceHistoryList:[],
			transactionHistoryList:[],


			//IBAN
			IBANNumber:'',
			isAccIbanFlag:false,
			/*DDS*/

			beneficiaryBankCode:'',
			previousNickName: '',
			previousName:'',
			successClickFlag:false,
			rakIbanCountryList:[],
			isIbanCountry:false,
			//CHANGES DONE AS FIX OF PROUAT-3539 START
			creditCardNumberDisplay:'',
			//CHANGES DONE AS FIX OF PROUAT-3539 END

			deleteConfirmationTitle : 'Delete Payee ?',

			cashPayOutPrpmValue:'',
			cebuanaBankName:'',
			cebuanaCountry:'',

			getPayeeNotificationMobile:function(){
				return ""+self.payeeModel.payeeNotificationMobile;
			},
			getPayeeAccountNumber:function(){
				return ""+self.payeeModel.accountNumber;
			},
			/*RAK:2:-BNF Module-Added for credit card payee and mobile cash-start*/
			getPayeeCreditCardNumber:function(){
				return ""+self.payeeModel.creditCardNumber;
			},
			getPayeeMobileNumber:function(){
				return ""+self.payeeModel.mobileNumber;
			},
			getPayeeCountryCode:function(){
				return ""+self.payeeModel.countryCode;
			},
			/*RAK:2:-BNF Module-Added for credit card payee and mobile cash-end*/
			getPayeeAccountType:function(){
				return ""+self.payeeModel.accountType;
			},
			getSelectedCurrency:function(){
				self.payeeModel.currency = self.payeeModel.currency.currencyDesc || self.payeeModel.currency;
				return self.payeeModel.currency;
			},

			resetCebuanaModel: function(){
				self.payeeModel.cebuanaBankName = '';
				self.payeeModel.cebuanaCountry = '';
			},

			resetPayeeModel : function(){
				self.payeeModel.name = "";
				self.payeeModel.nickName = "";
				self.payeeModel.accountNumber = "";
				self.payeeModel.accountType = "";
				self.payeeModel.currency = "";
				self.payeeModel.networkType ="";
				self.payeeModel.selectedBank = "";
				self.payeeModel.showFDAComponentFlag = "Y" //FTA;
				self.payeeModel.selectedBankDisplayName = "";
				self.payeeModel.ifscCode = "";
				self.payeeModel.ifscBankName = "";
				self.payeeModel.ifscBankBranch = "";
				/*RAK:2:-BNF Module-Added for credit card payee and mobile cash-start*/
				self.payeeModel.creditCardNumber="",
				self.payeeModel.creditCardNumberAmex="",
				self.payeeModel.mobileNumber="",
				self.payeeModel.bankCity="",
				self.payeeModel.bankBranch="",
				self.payeeModel.rakBnfCountry="",
				self.payeeModel.rakBenfResidentCountry="";
				self.payeeModel.rakBnfCountryDisplayName="",
				self.payeeModel.rakBnfResidentCountryDisplayName="";
				self.payeeModel.rakBnkCode="",
				self.payeeModel.isAccIban=self.constants.ACCOUNT,
				self.payeeModel.rakInterMedBank="",
				self.payeeModel.swiftCode="",
				self.payeeModel.isIndiaFlg=false,
				self.payeeModel.bnfid="",
				/*RAK:2:-BNF Module-Added for credit card payee and mobile cash-end*/
				/*RAK:2:-AddBnfPage-Start*/
				self.payeeModel.addBankBnfFlag=false,
				self.payeeModel.addMobCashBnfFlag=false,
				/*RAK:2:-AddBnfPage-End*/
				self.payeeModel.confirmPayeeTab=false,

				self.payeeModel.editBnfFlag==false,
				self.payeeModel.payeeNotificationEmail = "";
				self.payeeModel.payeeNotificationMobile = "";
				self.payeeModel.transactionPassword = "";
				self.payeeModel.smsOtp = "";/*RAK:2:-BillReg*/
				self.payeeModel.isAuthSet=false;
				self.payeeModel.beneficiaryAddSuccessResponse = "";
				self.payeeModel.selectedBank= "";
				self.payeeModel.showFDAComponentFlag= "Y"; //FTA
				self.payeeModel.selectedBankDisplayName= "";
				self.payeeModel.selectedCurrency= "";
				self.payeeModel.selectedBeneficaryName= "";
				self.payeeModel.selectedRoutingNumber = "";
				self.payeeModel.displayAccountType = true;
				self.payeeModel.rAKConfirm="";/*RAK:2:-ConfirmPayee*/
				self.payeeModel.countryCode="";/*RAK:2:-MobCash*/
				self.payeeModel.txnType="";/*RAK:2:-MobCash*/
				self.authMode.isTransactionPwd=false;
				self.authMode.isSmsOtp=false;
				self.authMode.clearAuthMode();
				/*DDS*/
				self.payeeModel.ddsRegPayeeList=[];
				self.payeeModel.serviceProviderList=[];
				self.payeeModel.serviceProvider="";
				self.payeeModel.serviceProviderDisplayName="";
				self.payeeModel.utilityServiceList=[];
				self.payeeModel.utilityService="";
				self.payeeModel.utilityServiceDisplayName="";
				self.payeeModel.utilityNumber="";
				self.payeeModel.isAcctFlag=false;
				self.payeeModel.isCredCardFlag=false;
				self.payeeModel.debitFrom="";
				self.payeeModel.accountList=[];
				self.payeeModel.creditCardNumberdds="";
				self.payeeModel.accountNumberdds="";
				self.payeeModel.creditCardList=[];
				self.payeeModel.accountDisplayName="";
				self.payeeModel.creditCardDisplayName="";
				self.payeeModel.issuedFor="";
				self.payeeModel.commenceDateDdsEdit="";
				self.payeeModel.commenceDateDdsEditDisplay="";
				self.payeeModel.commenceDateDisplay="";
				self.payeeModel.commenceDateDdsTxn="";
				self.payeeModel.commenceDateDdsTxnDisplay="";
				self.payeeModel.commenceDate="";
				self.payeeModel.commenceDay="";
				self.payeeModel.commenceMonth="";
				self.payeeModel.commenceYear="";
				self.payeeModel.expiryDateDisplay="";
				self.payeeModel.expiryDateDdsTxn="";
				self.payeeModel.expiryDateDdsTxnDisplay="";
				self.payeeModel.expiryDateDdsEdit="";
				self.payeeModel.expiryDateDdsEditDisplay="";
				self.payeeModel.expiryDate="";
				self.payeeModel.expiryDay="";
				self.payeeModel.expiryMonth="";
				self.payeeModel.expiryYear="";
				self.payeeModel.paymentFrequencyList=[];
				self.payeeModel.paymentFrequency="";
				self.payeeModel.paymentFrequencyIndex="";
				self.payeeModel.paymentFrequencyDisplayName="";
				self.payeeModel.definedDays="";
				self.payeeModel.isDefinedDaysFlg=false;
				self.payeeModel.isCommenceDateFlg=true;
				self.payeeModel.isFixedFlg=false;
				self.payeeModel.isVariableFlg=false;
				self.payeeModel.fixedVarAmount="";
				self.payeeModel.fixedVarAmountDisplayName="";
				self.payeeModel.variableMaxAmount="";
				self.payeeModel.variableMinAmount="";
				self.payeeModel.isEditDdsPayee=false;
				self.payeeModel.isDeleteDdsPayee=false;
				self.payeeModel.ddsCancelReason="";
				self.payeeModel.serviceHistoryList=[];
				self.payeeModel.transactionHistoryList=[];
				self.payeeModel.IBANNumber='';
				self.payeeModel.isAccIbanFlag=false;
				/*DDS*/
				self.payeeModel.beneficiaryBankCode='';
				self.payeeModel.previousNickName='';
				self.payeeModel.previousName='';
				self.payeeModel.successClickFlag=false;
			//	self.common.fromAuthPage=false;
				
				//self.selectedPayeeType='';
				self.payeeModel.rakBnfCountryDD='';

			},

			/*RAK:2:-EditBackEventPick-Start*/
			getEditBackEvent:function(){
				var event = '';
				if(self.isEditBeneficiaryMode){
					event = 'onPayeeEditBeneficiaryAuthBackClick';
				}
				else if(self.isDeleteBeneficiaryMode){
					if(self.selectedPayeeType==self.payeeTypes.DD ||self.selectedPayeeType==self.payeeTypes.MCHQ){
						self.bankbnftype=self.constants.NETWORKTYPEDDMC;
					}
					event = 'onPayeeBeneficiaryDeleteAuthBackClick';

				}
				else{
					event='onPayeeBeneficiaryAuthBackClick';
				}

				return event;
			},
			/*RAK:2:-EditBackEventPick-Start*/
			
			//Added for Amex Card Start
			amexCardValidation:function(){
				if(self.payeeModel.selectedBank && self.payeeInitResponse.rakFindbankDetails[self.payeeModel.selectedBank]['bankRoutingNo']==self.payeeTypes.AMEXCARD){
					self.payeeModel.creditCardNumber = self.payeeModel.creditCardNumberAmex;
				}
			},
			//Added for Amex Card End

			fetchAccorIban:function(){
				rootScope.rakHome.textModelWithSpace='';
				self.payeeModel.isIbanCountry = false;
				self.payeeModel.isAccIban = self.constants.ACCOUNT;
				self.payeeModel.accountNumber = "";
				for(var cnt in self.rakIbanCountryList){
					if(self.rakIbanCountryList[cnt] == self.payeeModel.rakBnfCountry){
						self.payeeModel.isIbanCountry = true;
						self.payeeModel.isAccIban = self.constants.IBAN;
						break;
					}
				}
			},
			resetBankDetails:function(){
				self.payeeModel.isIbanCountry = false;
				self.payeeModel.isAccIban = self.constants.ACCOUNT;
				self.payeeModel.accountNumber = "";
				self.payeeModel.selectedBank = "";
				self.payeeModel.showFDAComponentFlag = "Y"; //FTA
				self.payeeModel.selectedBankDisplayName = "";
				self.payeeModel.ifscCode = "";
				self.payeeModel.ifscBankName = "";
				self.payeeModel.ifscBankBranch = "";
				self.payeeModel.bankBranch = "";
				self.payeeModel.bankCity = "";
				self.payeeModel.rakBnkCode = "";
				self.payeeModel.rakInterMedBank = "";
				self.payeeModel.swiftCode = "";
				rootScope.rakHome.textModelWithSpace='';
				//CHANGES DONE AS FIX OF PROUAT-3539 START
				self.payeeModel.creditCardNumberDisplay="";
				//CHANGES DONE AS FIX OF PROUAT-3539 END
			},


			/*RAK:2:-Payee Module-Added for payee confirmation-save-start*/
			  getRAKConfirmFlag:function(flag){
				if(flag==1){
					self.payeeModel.rAKConfirm=self.constants.CONFIRMNOW;
				}
				else{
					self.payeeModel.rAKConfirm=self.constants.CONFIRMLATER;
				}
			   },
			 /*RAK:2:-Payee Module-Added for payee confirmation-save-end*/

			 /*RAK:2:-EditMobCashFlow-Start*/
			   editMobCashBeneficiaryDetails:function(responseList){
				    if(!responseList[0].hasOwnProperty('errorMessage')  && !responseList[0].hasOwnProperty('ResendMode')){

				    	if(responseList[0].auth == self.constants.TRANSACTIONPASSWORD||responseList[0].auth == self.constants.TRANSACTIOPASSWORDSMSOTP||responseList[0].auth == self.constants.SMSOTP){//RAK:2:- Auth mode changes-added
							self.payeeModel.isAuthSet = true;
							switch(responseList[0].auth){
							case self.constants.TRANSACTIONPASSWORD:
								 self.authMode.authType=self.authMode.TransactionPassword;
								 self.authMode.isFirstAuthMode=true;
								 break;
							 case self.constants.TRANSACTIOPASSWORDSMSOTP:
								 self.authMode.authType=self.authMode.TransactionPassword;
								 self.authMode.secAuthType=self.authMode.OTP;
								 self.authMode.isFirstAuthMode=true;
								 self.authMode.isSecAuthMode=true;
								 break;
							 case self.constants.SMSOTP:
								 self.authMode.authType=self.authMode.OTP;
								 self.authMode.isFirstAuthMode=true;
								 break;
							 default:
								 self.authMode.authType=self.authMode.None;
    							         self.authMode.secAuthType=self.authMode.None;
								 break;
							 }

						}
						else{
							self.payeeModel.isAuthSet = false;
						}

					self.payeeModel.nickName = responseList[0].beneficiaryDetails.beneficiaryNickName;
					self.payeeModel.name = responseList[0].beneficiaryDetails.beneficiaryName;
					//added for validation
					self.payeeModel.previousName = responseList[0].beneficiaryDetails.beneficiaryName;
					self.payeeModel.mobileNumber = parseInt(responseList[0].beneficiaryDetails.beneficiaryAccountNumber);
					self.payeeModel.countryCode = "";
					self.payeeModel.rakBnfCountry = responseList[0].beneficiaryDetails.beneficiaryBankCountry;
					self.payeeModel.bankBranch= responseList[0].beneficiaryDetails.beneficiaryOtherBankBranch;
					self.payeeModel.bnfid=responseList[0].beneficiaryDetails.beneficiaryId;
					self.bankbnftype=responseList[0].beneficiaryDetails.bnfBankType;
					switch(self.bankbnftype){
					 case self.constants.HOMEBANK:
						 self.bankbnftype=self.payeeTypes.MOBCASH;
						 break;
					 default:
						 self.bankbnftype="";
						 break;
					 }

					return;
			      }

			   },
			   deleteMobCashBeneficiaryDetails:function(responseList){
				   if(!responseList[0].hasOwnProperty('errorMessage')  && !responseList[0].hasOwnProperty('ResendMode')){
					   if(responseList[0].auth == self.constants.TRANSACTIONPASSWORD||responseList[0].auth == self.constants.TRANSACTIOPASSWORDSMSOTP||responseList[0].auth == self.constants.SMSOTP){//RAK:2:- Auth mode changes-added
							self.payeeModel.isAuthSet = true;
							switch(responseList[0].auth){
							case self.constants.TRANSACTIONPASSWORD:
								 self.authMode.authType=self.authMode.TransactionPassword;
								 self.authMode.isFirstAuthMode=true;
								 break;
							 case self.constants.TRANSACTIOPASSWORDSMSOTP:
								 self.authMode.authType=self.authMode.TransactionPassword;
								 self.authMode.secAuthType=self.authMode.OTP;
								 self.authMode.isFirstAuthMode=true;
								 self.authMode.isSecAuthMode=true;
								 break;
							 case self.constants.SMSOTP:
								 self.authMode.authType=self.authMode.OTP;
								 self.authMode.isFirstAuthMode=true;
								 break;
							 default:
								 self.authMode.authType=self.authMode.None;
							     self.authMode.secAuthType=self.authMode.None;
								 break;
							 }

						}
						else{
							self.payeeModel.isAuthSet = false;
						}
					   self.payeeModel.nickName = responseList[0].beneficiaryDetails.beneficiaryNickName;
						self.payeeModel.name = responseList[0].beneficiaryDetails.beneficiaryName;
						self.payeeModel.mobileNumber = parseInt(responseList[0].beneficiaryDetails.beneficiaryAccountNumber);
						self.payeeModel.countryCode = "";
						self.payeeModel.rakBnfCountry = responseList[0].beneficiaryDetails.beneficiaryBankCountry;
						self.payeeModel.bankBranch= responseList[0].beneficiaryDetails.beneficiaryOtherBankBranch;
						self.payeeModel.bnfid=responseList[0].beneficiaryDetails.beneficiaryId;
						self.bankbnftype=responseList[0].beneficiaryDetails.bnfBankType;
					switch(self.bankbnftype){
					 case self.constants.HOMEBANK:
						 self.bankbnftype=self.payeeTypes.MOBCASH;
						 break;
					 default:
						 self.bankbnftype="";
						 break;
					}
				   }

			   },
			   /*RAK:2:-EditMobCashFlow-End*/
			   /*RAK:2:MobCash-PickContact-Start*/
			   getContactNumberFromPhoneBook:function(){


					openContact(function(response){
							Logger.info("mobilecontactpick" + JSON.stringify(response));
							if(response.phoneNumbers.length !== 0){
								//self.payeeModel.mobileNumber=parseInt(response.phoneNumbers[0].value);
								self.payeeModel.mobileNumber=response.phoneNumbers[0].value;
							}
							else{

								self.payeeModel.mobileNumber="";
							}
							 $('#mr-btn').click();

					},
					function(error){
						self.payeeModel.mobileNumber="";
			             $('#mr-btn').click();
					},{});
				},

				getNumber:function(num){
					if(num !== ""){
						num = num.toString().replace(/\s/g,"");
						if(WL.Client.getEnvironment() == WL.Environment.IPHONE && num.charCodeAt(0)==8234){
							num = num.substring(1,num.length-1);
						}

						num = num.toString().replace('+',"");
						 if(num.toString().indexOf(0)=='0'){

                             var num = num.toString().replace('0',"971");

                       }

						 if(num.toString().length==12 && num.toString().substring(0, 4) =="9715"){
                             self.payeeModel.mobileNumber=num;
                       }
                       else{

                             num="";
                             self.payeeModel.mobileNumber=num;
                             rootScope.showErrorPopup(rootScope.appLiterals.APP.RAK_COMMON.INVALID_CONTACT);
                       }
					}
					else
						self.payeeModel.mobileNumber=num;


					/*if(num !== ""){
						num = num.replace(/\D/g,'');
						if(num.length<=15){
							self.payeeModel.mobileNumber=num;
						}
						else{
							alert("Not a valid number.");
							num="";
							self.mobileNumber=num;
						}
					}
					else
						self.mobileNumber=num;
						}*/
				},
			   /*RAK:2:MobCash-PickContact-End*/
				/*RAK:2:-ForCCEdit*/
			  editCardBeneficiaryDetails:function(responseList){
				  if(!responseList[0].hasOwnProperty('errorMessage')){
				    self.payeeModel.nickName = responseList[0].beneficiaryDetails.beneficiaryNickName;
				    //added for validation

				    self.payeeModel.previousNickName = responseList[0].beneficiaryDetails.beneficiaryNickName;
					self.payeeModel.name = responseList[0].beneficiaryDetails.beneficiaryName;
					self.payeeModel.creditCardNumber = responseList[0].beneficiaryDetails.beneficiaryAccountNo;
					self.payeeModel.rakBnfCountry = responseList[0].beneficiaryDetails.beneficiaryBankCountry;
					self.payeeModel.beneficiaryBankCode = responseList[0].beneficiaryDetails.beneficiaryBankCode;
					self.payeeModel.selectedBank = responseList[0].beneficiaryDetails.beneficiaryBankName;
					self.payeeModel.bankBranch= responseList[0].beneficiaryDetails.beneficiaryOtherBankBranch;
					self.payeeModel.bankCity= responseList[0].beneficiaryDetails.beneficiaryBankCity;
					self.payeeModel.rakBnkCode= responseList[0].beneficiaryDetails.bankCode;
					self.payeeModel.accountNumber = responseList[0].beneficiaryDetails.beneficiaryPayDetails1;
					self.payeeModel.rakInterMedBank= responseList[0].beneficiaryDetails.beneficiaryPayDetails2;
					self.payeeModel.swiftCode= responseList[0].beneficiaryDetails.swiftCode;
					self.payeeModel.selectedRoutingNumber= responseList[0].beneficiaryDetails.ifsc;
					self.payeeModel.bnfid=responseList[0].beneficiaryDetails.beneficiaryId;
					self.bankbnftype=responseList[0].beneficiaryDetails.bnfBankType;
					switch(self.bankbnftype){
					 case self.constants.OUTSIDEBANK:
						 self.bankbnftype=self.payeeTypes.OUTSIDEUAECCARD;
						 break;
					 case self.constants.HOMEBANK:
						 self.bankbnftype=self.payeeTypes.RAKCREDITCARD;
						 break;
					 case self.constants.WITHINBANK:
						 self.bankbnftype=self.payeeTypes.WITHINUAECCARD;
						 break;
					 case self.constants.PREPAIDCARD:
						 self.bankbnftype=self.payeeTypes.PREPAIDCARD;
						 break;
					 default:
						 self.bankbnftype="";
						 break;
					 }
					return;
				  }
			  },

			  editBeneficairyDetails:function(responseList){
				  if(!responseList[0].hasOwnProperty('errorMessage')){

					//Added to check if CashPayout is enable or disable
					//self.payeeModel.cashPayOutPrpmValue = responseList[0].CashPayOutPrpmValue;

					self.payeeModel.nickName = responseList[0].beneficiaryDetails.beneficiaryNickName;
					//added for fixing nick name validation
					self.payeeModel.previousNickName = responseList[0].beneficiaryDetails.beneficiaryNickName;
					self.payeeModel.name = responseList[0].beneficiaryDetails.beneficiaryName;
					self.payeeModel.rakBnfResidentCountryDisplayName = responseList[0].beneficiaryDetails.beneficiaryCountry;

					self.payeeModel.accountNumber = responseList[0].beneficiaryDetails.beneficiaryAccountNo;
					self.payeeModel.rakBnfCountry = responseList[0].beneficiaryDetails.beneficiaryBankCountry;
					self.payeeModel.beneficiaryBankCode = responseList[0].beneficiaryDetails.beneficiaryBankCode;
					self.payeeModel.selectedBank = responseList[0].beneficiaryDetails.beneficiaryBankName;
					/*FTA Changes start*/
					
					if(self.payeeModel.selectedBank.toUpperCase()=='FEDERAL TAX AUTHORITY'){
						self.payeeModel.showFDAComponentFlag = 'N';
					}else{
						self.payeeModel.showFDAComponentFlag = 'Y';
					}
				
					/*FTA Changes End*/
					self.payeeModel.bankBranch= responseList[0].beneficiaryDetails.beneficiaryOtherBankBranch;
					self.payeeModel.bankCity= responseList[0].beneficiaryDetails.beneficiaryBankCity;
					self.payeeModel.rakBnkCode= responseList[0].beneficiaryDetails.bankCode;
					self.payeeModel.rakInterMedBank= responseList[0].beneficiaryDetails.beneficiaryPayDetails2;
					self.payeeModel.swiftCode= responseList[0].beneficiaryDetails.swiftCode;
					self.payeeModel.selectedRoutingNumber= responseList[0].beneficiaryDetails.ifsc;
					self.payeeModel.bnfid=responseList[0].beneficiaryDetails.beneficiaryId;
					self.bankbnftype=responseList[0].beneficiaryDetails.bnfBankType;
					switch(self.bankbnftype){
					 case self.constants.OUTSIDEBANK:
						 self.bankbnftype=self.payeeTypes.OUTSIDEUAEBANK;
						 break;
					 case self.constants.HOMEBANK:
						 self.bankbnftype=self.payeeTypes.RAKBANK;
						 break;
					 case self.constants.WITHINBANK:
						 self.bankbnftype=self.payeeTypes.WITHINUAEBANK;
						 break;
					 case self.constants.CEBUANA:
						 self.bankbnftype=self.payeeTypes.CEBUANA;
						 break;
					 default:
						 self.bankbnftype="";
						 break;
					 }


					return;
				  }
			  },

			  // DD Bnf
			processDDBeneficiaryAuthResponse : function(responseList){
					if(!responseList[0].hasOwnProperty('errorMessage')  && !responseList[0].hasOwnProperty('ResendMode'))
					{
						/*if(self.isDeleteBeneficiaryMode){
							self.beneficiaryAuthDetails = responseList[0];
						}*/

//						else{
								self.beneficiaryAuthDetails = responseList[0];
								if(responseList[0].hasOwnProperty('beneficiaryCountry') && self.selectedPayeeType!=self.payeeTypes.MCHQ){
									self.payeeModel.rakBnfCountryDisplayName=self.beneficiaryAuthDetails.beneficiaryCountry;
							       }


//						   }

						//RAK:2:- Auth mode changes-added
						for(var index=0;index < responseList.length;index++){
							if(responseList[index].auth == self.constants.TRANSACTIONPASSWORD||responseList[index].auth == self.constants.TRANSACTIOPASSWORDSMSOTP||responseList[index].auth == self.constants.SMSOTP){
								self.payeeModel.isAuthSet = true;
								switch(responseList[0].auth){
								 case self.constants.TRANSACTIONPASSWORD:
									 self.authMode.authType=self.authMode.TransactionPassword;
									 self.authMode.isFirstAuthMode=true;
									 break;
								 case self.constants.TRANSACTIOPASSWORDSMSOTP:
									 self.authMode.authType=self.authMode.TransactionPassword;
									 self.authMode.secAuthType=self.authMode.OTP;
									 self.authMode.isFirstAuthMode=true;
									 self.authMode.isSecAuthMode=true;
									 break;
								 case self.constants.SMSOTP:
									 self.authMode.authType=self.authMode.OTP;
									 self.authMode.isFirstAuthMode=true;
									 break;
								 default:
									 self.authMode.authType=self.authMode.None;
								     self.authMode.secAuthType=self.authMode.None;
									 break;
								 }

							}
							else{
								self.payeeModel.isAuthSet = false;
							}
						}
					}

					self.authMode.firstAuthModeValue="";
					self.authMode.secAuthModeValue="";
				},
				editDDMCBeneficiaryDetails:function(responseList){
				    if(!responseList[0].hasOwnProperty('errorMessage')){
				    	self.payeeModel.nickName = responseList[0].beneficiaryDetails.beneficiaryNickName;
				    	self.payeeModel.previousNickName = responseList[0].beneficiaryDetails.beneficiaryNickName;
						self.payeeModel.name = responseList[0].beneficiaryDetails.beneficiaryName;
						self.payeeModel.accountNumber = responseList[0].beneficiaryDetails.beneficiaryAccountNo;
						//self.payeeModel.rakBnfCountry = responseList[0].beneficiaryDetails.beneficiaryBankCountry;
						self.payeeModel.selectedBank = responseList[0].beneficiaryDetails.beneficiaryBankName;
						self.payeeModel.bnfid=responseList[0].beneficiaryDetails.beneficiaryId;
						self.bankbnftype=responseList[0].beneficiaryDetails.beneficiaryPayDetails4;
						switch(self.bankbnftype){
						 case self.constants.DEMANDDRAFT:
							 self.bankbnftype=self.payeeTypes.DD;
							 self.payeeModel.rakBnfCountry = responseList[0].beneficiaryDetails.beneficiaryBankCountry;
							 break;
						 case self.constants.MANAGERCHEQUE:
							 self.bankbnftype=self.payeeTypes.MCHQ;
							 self.payeeModel.rakBnfCountry = self.constants.UAE;
							 break;
						 default:
							 self.bankbnftype="";
							 break;
						 }
						return;
				    }

			   },
			   deleteDDMCBeneficiaryDetails:function(responseList){
				    if(!responseList[0].hasOwnProperty('errorMessage')  && !responseList[0].hasOwnProperty('ResendMode')){
				    	 if(responseList[0].auth == self.constants.TRANSACTIONPASSWORD||responseList[0].auth == self.constants.TRANSACTIOPASSWORDSMSOTP||responseList[0].auth == self.constants.SMSOTP){//RAK:2:- Auth mode changes-added
								self.payeeModel.isAuthSet = true;
								switch(responseList[0].auth){
								case self.constants.TRANSACTIONPASSWORD:
									 self.authMode.authType=self.authMode.TransactionPassword;
									 self.authMode.isFirstAuthMode=true;
									 break;
								 case self.constants.TRANSACTIOPASSWORDSMSOTP:
									 self.authMode.authType=self.authMode.TransactionPassword;
									 self.authMode.secAuthType=self.authMode.OTP;
									 self.authMode.isFirstAuthMode=true;
									 self.authMode.isSecAuthMode=true;
									 break;
								 case self.constants.SMSOTP:
									 self.authMode.authType=self.authMode.OTP;
									 self.authMode.isFirstAuthMode=true;
									 break;
								 default:
									 self.authMode.authType=self.authMode.None;
								     self.authMode.secAuthType=self.authMode.None;
									 break;
								 }

							}
							else{
								self.payeeModel.isAuthSet = false;
							}
				    	self.payeeModel.nickName = responseList[0].beneficiaryDetails.beneficiaryNickName;
						self.payeeModel.name = responseList[0].beneficiaryDetails.beneficiaryName;
						self.payeeModel.accountNumber = responseList[0].beneficiaryDetails.beneficiaryAccountNo;

						self.payeeModel.selectedBank = responseList[0].beneficiaryDetails.beneficiaryBankName;
						self.payeeModel.bnfid=responseList[0].beneficiaryDetails.beneficiaryId;
						self.bankbnftype=responseList[0].beneficiaryDetails.beneficiaryPayDetails4;
						switch(self.bankbnftype){
						 case self.constants.DEMANDDRAFT:
							 self.bankbnftype=self.payeeTypes.DD;
							 self.payeeModel.rakBnfCountry = responseList[0].beneficiaryDetails.beneficiaryBankCountry;
							 break;
						 case self.constants.MANAGERCHEQUE:
							 self.bankbnftype=self.payeeTypes.MCHQ;

							 self.payeeModel.rakBnfCountry=self.constants.UAE;
							 break;
						 default:
							 self.bankbnftype="";
							 break;
						 }
						return;
				    }

			   },
			   getDDMCCountryManager:function(payeeType){
				   switch(payeeType){
				   case self.payeeTypes.DD:
					   self.payeeModel.rakBnfCountry=self.payeeModel.rakBnfCountryDD;/*:For country display*/
					   self.rakCountryList=self.payeeInitResponse.rakcountryList;
					  // self.payeeModel.rakBnfCountry=self.payeeModel.rakBnfCountryDD;
					   /*self.rakCountryList.sort(
								function( a, b ) {
							    a = a.countryDesc.toLowerCase();
							    b = b.countryDesc.toLowerCase();

							    return a < b ? -1 : a > b ? 1 : 0;
							});
							*/
						 break;
					 case self.payeeTypes.MCHQ:
						 self.payeeModel.rakBnfCountry=self.constants.AE;
						 self.payeeModel.rakBnfCountryDisplayName=self.constants.UAE;
						 break;
					 default:
						 self.bankbnftype="";
						 break;
				   }

			   },

			   getDdsPayeeRegList:function(successResponse){
					if (successResponse.responsesList[0].hasOwnProperty("ddsPayeeList")) {
							self.payeeModel.ddsRegPayeeList = successResponse.responsesList[0].ddsPayeeList;
						}
					if(successResponse.responsesList[0].hasOwnProperty("frequencyList")){
						   self.payeeModel.paymentFrequencyList=successResponse.responsesList[0].frequencyList;
					   }

			   },

			   getInitPageDDSPayee:function(responseList){
				   if(!responseList[0].hasOwnProperty('errorMessage')){
					   self.payeeModel.debitFrom=self.constants.ACCOUNT;
					   self.payeeModel.fixedVarAmount=self.constants.FIXEDAMOUNT;
					   self.payeeModel.commenceDate=new Date(self.common.initDate);
					   self.payeeModel.expiryDate=new Date(self.common.initDate);

					   if(responseList[0].serviceList){
						   self.payeeModel.serviceProviderList=responseList[0].serviceList;
					   }
					   if(responseList[0].utilityList){
						   self.payeeModel.utilityServiceList=responseList[0].utilityList;
					   }
					   if(responseList[0].aedAccountList){
						   self.payeeModel.accountList=responseList[0].aedAccountList;
					   }
					   if(responseList[0].frequencyList){
						   self.payeeModel.paymentFrequencyList=responseList[0].frequencyList;
					   }
					   if(responseList[0].creditCardList){
						   self.payeeModel.creditCardList=responseList[0].creditCardList;
					   }
				   }

			   },
			   getserviceProviderforDDS:function(){
				   self.payeeModel.serviceProviderDisplayName=self.payeeModel.serviceProviderList[self.payeeModel.serviceProvider]['companyName'];
			   },
			   getutilityServiceforDDS:function(){
				   self.payeeModel.utilityServiceDisplayName=self.payeeModel.utilityServiceList[self.payeeModel.utilityService]['description'];
			   },
			   getPaymentFrequencyforDDS:function(){
				   self.payeeModel.paymentFrequencyDisplayName=self.payeeModel.paymentFrequencyList[self.payeeModel.paymentFrequencyIndex]['type'];
				   self.payeeModel.paymentFrequency=self.payeeModel.paymentFrequencyList[self.payeeModel.paymentFrequencyIndex]['value'];
			   },
			  getAccountForDDS:function(){
				   self.payeeModel.accountDisplayName=self.payeeModel.accountList[self.payeeModel.accountNumberdds]['accountNumber'];
			  },
              getCreditCardAccountForDDS:function(){
            	  self.payeeModel.creditCardNumberDisplayName=self.payeeModel.creditCardList[self.payeeModel.creditCardNumberdds]['creditCardNo'];
			  },
			   getDdsPayeeAddUtil:function(){


				   if(self.payeeModel.fixedVarAmount==self.constants.FIXEDAMOUNT){
					   self.payeeModel.fixedVarAmountDisplayName=self.constants.FIXEDAMOUNTLABEL;
					   self.payeeModel.isFixedFlg=true;
					   self.payeeModel.isVariableFlg=false;
				   }
				   else if(self.payeeModel.fixedVarAmount==self.constants.VARIABLEAMOUNT){
					   self.payeeModel.fixedVarAmountDisplayName=self.constants.VARIABLEAMOUNTLABEL;
					   self.payeeModel.isVariableFlg=true;
					   self.payeeModel.isFixedFlg=false;
				   }

				   if(self.payeeModel.paymentFrequency==self.constants.DEFINEDDAYS){
					   self.payeeModel.isDefinedDaysFlg=true;
				   }
				   if(self.payeeModel.paymentFrequency==self.payeeModel.PAYFREQONETIME){
					   self.payeeModel.isCommenceDateFlg=false;
					   self.payeeModel.commenceDate=new Date(self.common.expiryDate);
				   }
				 if(!self.payeeModel.isEditDdsPayee){

				   if(self.payeeModel.debitFrom==self.constants.ACCOUNT){
					   self.payeeModel.isAcctFlag=true;

				   }
				   else if(self.payeeModel.debitFrom==self.constants.CREDITCARD){
					   self.payeeModel.isCredCardFlag=true;

				   }
				   /*self.payeeModel.expiryDay=self.payeeModel.expiryDate.getDate().toString();
				   self.payeeModel.expiryMonth=self.payeeModel.expiryDate.getMonth()+1;
				   self.payeeModel.expiryMonth=self.payeeModel.expiryMonth.toString();
				   self.payeeModel.expiryYear=self.payeeModel.expiryDate.getFullYear().toString();
				   self.payeeModel.expiryDateDisplay=self.payeeModel.expiryDay+'-'+self.payeeModel.expiryMonth+'-'+self.payeeModel.expiryYear;*/

				   /*self.payeeModel.commenceDay=self.payeeModel.commenceDate.getDate().toString();
				   self.payeeModel.commenceMonth=self.payeeModel.commenceDate.getMonth()+1;
				   self.payeeModel.commenceMonth=self.payeeModel.commenceMonth.toString();
				   self.payeeModel.commenceYear=self.payeeModel.commenceDate.getFullYear().toString();
				   self.payeeModel.commenceDateDisplay=self.payeeModel.commenceDay+'-'+self.payeeModel.commenceMonth+'-'+self.payeeModel.commenceYear;*/

				   self.payeeModel.expiryDateDisplay=self.utils.setFormatedDate(self.payeeModel.expiryDate);
				   self.payeeModel.commenceDateDisplay=self.utils.setFormatedDate(self.payeeModel.commenceDate);
			      }
				 else{
					 self.payeeModel.expiryDateDdsEditDisplay=self.utils.setFormatedDate(self.payeeModel.expiryDateDdsEdit);
					 self.payeeModel.commenceDateDdsEditDisplay=self.utils.setFormatedDate(self.payeeModel.commenceDateDdsEdit);
				 }

			   },
			   getDDSDateUtil:function(){
				   self.payeeModel.expiryDateDdsTxnDisplay=self.utils.setFormatedDate(self.payeeModel.expiryDateDdsTxn);
				   self.payeeModel.commenceDateDdsTxnDisplay=self.utils.setFormatedDate(self.payeeModel.commenceDateDdsTxn);
				   if(self.payeeModel.debitFrom==self.constants.ACCOUNT){
					   self.payeeModel.isAcctFlag=true;

				   }
				   else if(self.payeeModel.debitFrom==self.constants.CREDITCARD){
					   self.payeeModel.isCredCardFlag=true;

				   }
				   /*self.payeeModel.expiryDay=self.payeeModel.expiryDate.getDate().toString();
				   self.payeeModel.expiryMonth=self.payeeModel.expiryDate.getMonth()+1;
				   self.payeeModel.expiryMonth=self.payeeModel.expiryMonth.toString();
				   self.payeeModel.expiryYear=self.payeeModel.expiryDate.getFullYear().toString();
				   self.payeeModel.expiryDateDisplay=self.payeeModel.expiryDay+'-'+self.payeeModel.expiryMonth+'-'+self.payeeModel.expiryYear;

				   self.payeeModel.commenceDay=self.payeeModel.commenceDate.getDate().toString();
				   self.payeeModel.commenceMonth=self.payeeModel.commenceDate.getMonth()+1;
				   self.payeeModel.commenceMonth=self.payeeModel.commenceMonth.toString();
				   self.payeeModel.commenceYear=self.payeeModel.commenceDate.getFullYear().toString();
				   self.payeeModel.commenceDateDisplay=self.payeeModel.commenceDay+'-'+self.payeeModel.commenceMonth+'-'+self.payeeModel.commenceYear;*/
			   },

			   getEditDDSPayeeDetails:function(){
//				   if(!responseList[0].hasOwnProperty('errorMessage')){
					   self.payeeModel.serviceProvider = self.payeeModel.ddsRegPayeeList[self.selectedPayeeIndex].serviceProvider;
					   self.payeeModel.serviceProviderDisplayName = self.payeeModel.ddsRegPayeeList[self.selectedPayeeIndex].serviceProviderDescription;
					   self.payeeModel.utilityService = self.payeeModel.ddsRegPayeeList[self.selectedPayeeIndex].utilityService;
					   self.payeeModel.utilityServiceDisplayName = self.payeeModel.ddsRegPayeeList[self.selectedPayeeIndex].utilityServiceDescription;
					   self.payeeModel.utilityNumber = self.payeeModel.ddsRegPayeeList[self.selectedPayeeIndex].utilityNumber;
					   self.payeeModel.issuedFor = self.payeeModel.ddsRegPayeeList[self.selectedPayeeIndex].issuedFor;
					   self.payeeModel.paymentFrequency = self.payeeModel.ddsRegPayeeList[self.selectedPayeeIndex].paymentFrequency;
					   self.payeeModel.paymentFrequencyIndex=self.utils.getIndexfromArray(self.payeeModel.paymentFrequency, self.payeeModel.paymentFrequencyList);
					   self.payeeModel.paymentFrequencyDisplayName=self.payeeModel.paymentFrequencyList[self.payeeModel.paymentFrequencyIndex]['type'];
					   self.payeeModel.accountNumberDisplayName = self.payeeModel.ddsRegPayeeList[self.selectedPayeeIndex].accountNumber;//Test-delete
//					   self.payeeModel.creditCardNumber =self.payeeModel.ddsRegPayeeList[self.selectedPayeeIndex].creditcardNumber;
					   self.payeeModel.commenceDateDdsEdit =new Date(self.payeeModel.ddsRegPayeeList[self.selectedPayeeIndex].commencesFrom);
					   self.payeeModel.expiryDateDdsEdit = new Date(self.payeeModel.ddsRegPayeeList[self.selectedPayeeIndex].expiresOn);
					   if(self.payeeModel.ddsRegPayeeList[self.selectedPayeeIndex].fixedAmount==self.constants.YES){
						   self.payeeModel.fixedVarAmount =self.constants.FIXEDAMOUNT;
					   }
					   if(self.payeeModel.ddsRegPayeeList[self.selectedPayeeIndex].fixedAmount==self.constants.NO){
						   self.payeeModel.fixedVarAmount =self.constants.VARIABLEAMOUNT;
					   }
					   self.payeeModel.fixedAmount = parseInt(self.payeeModel.ddsRegPayeeList[self.selectedPayeeIndex].ddsAmount);
					   self.payeeModel.variableMaxAmount = parseInt(self.payeeModel.ddsRegPayeeList[self.selectedPayeeIndex].variableMaxAmount);
					   self.payeeModel.variableMinAmount = parseInt(self.payeeModel.ddsRegPayeeList[self.selectedPayeeIndex].variableMinAmount);
					   self.payeeModel.definedDays = parseInt(self.payeeModel.ddsRegPayeeList[self.selectedPayeeIndex].definedDays);
//				   }
			   },

			   getDDSBackEvent:function(){
					var event = '';
					if(self.payeeModel.isEditDdsPayee){
						event = 'onDDSPayeeEditAuthBackClick';
					}
					else if(self.payeeModel.isDeleteDdsPayee){
						event = 'onDDSPayeeDeleteAuthBackClick';
					}
					else{
						event='onDDSPayeeAddAuthBackClick';

					}

					return event;
				},
				getDDSAuthEvent:function(){
					var event = '';
					if(self.payeeModel.isEditDdsPayee){
						event = 'onDDSPayeeEditSubmitClick';
					}
					else if(self.payeeModel.isDeleteDdsPayee){
						event = 'onDDSPayeeDeleteSubmitClick';
					}
					else{
						event='onAddSubmitDDSPayeeClick';

					}

					return event;
				},
				processDDSPayeeAuthResponse:function(responseList){
					   if(!responseList[0].hasOwnProperty('errorMessage')){
						   if(responseList[0].auth == self.constants.TRANSACTIONPASSWORD||responseList[0].auth == self.constants.TRANSACTIOPASSWORDSMSOTP||responseList[0].auth == self.constants.SMSOTP){//RAK:2:- Auth mode changes-added
								self.payeeModel.isAuthSet = true;
								switch(responseList[0].auth){
								case self.constants.TRANSACTIONPASSWORD:
									 self.authMode.authType=self.authMode.TransactionPassword;
									 self.authMode.isFirstAuthMode=true;
									 break;
								 case self.constants.TRANSACTIOPASSWORDSMSOTP:
									 self.authMode.authType=self.authMode.TransactionPassword;
									 self.authMode.secAuthType=self.authMode.OTP;
									 self.authMode.isFirstAuthMode=true;
									 self.authMode.isSecAuthMode=true;
									 break;
								 case self.constants.SMSOTP:
									 self.authMode.authType=self.authMode.OTP;
									 self.authMode.isFirstAuthMode=true;
									 break;
								 default:
									 self.authMode.authType=self.authMode.None;
								     self.authMode.secAuthType=self.authMode.None;
									 break;
								 }

							}
							else{
								self.payeeModel.isAuthSet = false;
							}


						   self.authMode.firstAuthModeValue="";
						   self.authMode.secAuthModeValue="";
					   }

				   },
				   processEditDDSPayeeAuthResponse:function(responseList){
					   if(!responseList[0].hasOwnProperty('errorMessage')){
						   if(responseList[0].auth == self.constants.TRANSACTIONPASSWORD||responseList[0].auth == self.constants.TRANSACTIOPASSWORDSMSOTP||responseList[0].auth == self.constants.SMSOTP){//RAK:2:- Auth mode changes-added
								self.payeeModel.isAuthSet = true;
								switch(responseList[0].auth){
								case self.constants.TRANSACTIONPASSWORD:
									 self.authMode.authType=self.authMode.TransactionPassword;
									 self.authMode.isFirstAuthMode=true;
									 break;
								 case self.constants.TRANSACTIOPASSWORDSMSOTP:
									 self.authMode.authType=self.authMode.TransactionPassword;
									 self.authMode.secAuthType=self.authMode.OTP;
									 self.authMode.isFirstAuthMode=true;
									 self.authMode.isSecAuthMode=true;
									 break;
								 case self.constants.SMSOTP:
									 self.authMode.authType=self.authMode.OTP;
									 self.authMode.isFirstAuthMode=true;
									 break;
								 default:
									 self.authMode.authType=self.authMode.None;
								     self.authMode.secAuthType=self.authMode.None;
									 break;
								 }

							}
							else{
								self.payeeModel.isAuthSet = false;
							}


						   self.authMode.firstAuthModeValue="";
						   self.authMode.secAuthModeValue="";
					   }

				   },
				   processDeleteDDSPayeeAuthResponse:function(responseList){
					   if(!responseList[0].hasOwnProperty('errorMessage')){
						   if(responseList[0].auth == self.constants.TRANSACTIONPASSWORD||responseList[0].auth == self.constants.TRANSACTIOPASSWORDSMSOTP||responseList[0].auth == self.constants.SMSOTP){//RAK:2:- Auth mode changes-added
								self.payeeModel.isAuthSet = true;
								switch(responseList[0].auth){
								case self.constants.TRANSACTIONPASSWORD:
									 self.authMode.authType=self.authMode.TransactionPassword;
									 self.authMode.isFirstAuthMode=true;
									 break;
								 case self.constants.TRANSACTIOPASSWORDSMSOTP:
									 self.authMode.authType=self.authMode.TransactionPassword;
									 self.authMode.secAuthType=self.authMode.OTP;
									 self.authMode.isFirstAuthMode=true;
									 self.authMode.isSecAuthMode=true;
									 break;
								 case self.constants.SMSOTP:
									 self.authMode.authType=self.authMode.OTP;
									 self.authMode.isFirstAuthMode=true;
									 break;
								 default:
									 self.authMode.authType=self.authMode.None;
								     self.authMode.secAuthType=self.authMode.None;
									 break;
								 }

							}
							else{
								self.payeeModel.isAuthSet = false;
							}


						   self.authMode.firstAuthModeValue="";
						   self.authMode.secAuthModeValue="";
					   }
					   self.payeeModel.serviceProvider = self.payeeModel.ddsRegPayeeList[self.selectedPayeeIndex].serviceProvider;
					   self.payeeModel.serviceProviderDisplayName = self.payeeModel.ddsRegPayeeList[self.selectedPayeeIndex].serviceProviderDescription;
					   self.payeeModel.utilityService = self.payeeModel.ddsRegPayeeList[self.selectedPayeeIndex].utilityService;
					   self.payeeModel.utilityServiceDisplayName = self.payeeModel.ddsRegPayeeList[self.selectedPayeeIndex].utilityServiceDescription;
					   self.payeeModel.utilityNumber = self.payeeModel.ddsRegPayeeList[self.selectedPayeeIndex].utilityNumber;
					   self.payeeModel.issuedFor = self.payeeModel.ddsRegPayeeList[self.selectedPayeeIndex].issuedFor;
					   self.payeeModel.paymentFrequency = self.payeeModel.ddsRegPayeeList[self.selectedPayeeIndex].paymentFrequency;
					   self.payeeModel.paymentFrequencyIndex=self.utils.getIndexfromArray(self.payeeModel.paymentFrequency, self.payeeModel.paymentFrequencyList);
					   self.payeeModel.paymentFrequencyDisplayName=self.payeeModel.paymentFrequencyList[self.payeeModel.paymentFrequencyIndex]['type'];
					   self.payeeModel.accountNumberDisplayName = self.payeeModel.ddsRegPayeeList[self.selectedPayeeIndex].accountNumber;
//					   self.payeeModel.creditCardNumber =self.payeeModel.ddsRegPayeeList[self.selectedPayeeIndex].creditcardNumber;
					   self.payeeModel.commenceDate =new Date(self.payeeModel.ddsRegPayeeList[self.selectedPayeeIndex].commencesFrom);
					   self.payeeModel.expiryDate = new Date(self.payeeModel.ddsRegPayeeList[self.selectedPayeeIndex].expiresOn);

					  /* self.payeeModel.expiryDay=self.payeeModel.expiryDate.getDate().toString();
					   self.payeeModel.expiryMonth=self.payeeModel.expiryDate.getMonth()+1;
					   self.payeeModel.expiryMonth=self.payeeModel.expiryMonth.toString();
					   self.payeeModel.expiryYear=self.payeeModel.expiryDate.getFullYear().toString();
					   self.payeeModel.expiryDateDisplay=self.payeeModel.expiryDay+'-'+self.payeeModel.expiryMonth+'-'+self.payeeModel.expiryYear;*/

					   /*self.payeeModel.commenceDay=self.payeeModel.commenceDate.getDate().toString();
					   self.payeeModel.commenceMonth=self.payeeModel.commenceDate.getMonth()+1;
					   self.payeeModel.commenceMonth=self.payeeModel.commenceMonth.toString();
					   self.payeeModel.commenceYear=self.payeeModel.commenceDate.getFullYear().toString();
					   self.payeeModel.commenceDateDisplay=self.payeeModel.commenceDay+'-'+self.payeeModel.commenceMonth+'-'+self.payeeModel.commenceYear;*/

					   self.payeeModel.expiryDateDisplay=self.utils.setFormatedDate(self.payeeModel.expiryDate);
					   self.payeeModel.commenceDateDisplay=self.utils.setFormatedDate(self.payeeModel.commenceDate);

					   if(self.payeeModel.ddsRegPayeeList[self.selectedPayeeIndex].fixedAmount==self.constants.YES){
						   self.payeeModel.fixedVarAmount =self.constants.FIXEDAMOUNT;
						   self.payeeModel.fixedVarAmountDisplayName=self.constants.FIXEDAMOUNTLABEL;
					   }
					   if(self.payeeModel.ddsRegPayeeList[self.selectedPayeeIndex].fixedAmount==self.constants.NO){
						   self.payeeModel.fixedVarAmount =self.constants.VARIABLEAMOUNT;
						   self.payeeModel.fixedVarAmountDisplayName=self.constants.VARIABLEAMOUNTLABEL;
					   }
					   self.payeeModel.fixedAmount = parseInt(self.payeeModel.ddsRegPayeeList[self.selectedPayeeIndex].ddsAmount);
					   self.payeeModel.variableMaxAmount = parseInt(self.payeeModel.ddsRegPayeeList[self.selectedPayeeIndex].variableMaxAmount);
					   self.payeeModel.variableMinAmount = parseInt(self.payeeModel.ddsRegPayeeList[self.selectedPayeeIndex].variableMinAmount);
					   self.payeeModel.definedDays = parseInt(self.payeeModel.ddsRegPayeeList[self.selectedPayeeIndex].definedDays);

				   },
				   processDDSPayeeSuccessResponse : function(responseList){

						self.beneficiarySuccessDetails=responseList[0];
					},
			      processDdsServiceHistoryResponse:function(responseList){
						   if(!responseList[0].hasOwnProperty('errorMessage')){
							   self.payeeModel.serviceHistoryList=responseList[0].serviceHistoryList;
						   }
						},
			       processDdsTransactionHistoryResponse:function(responseList){
							   if(!responseList[0].hasOwnProperty('errorMessage')){
								   if(responseList[0].aedAccountList){
									   self.payeeModel.accountList=responseList[0].aedAccountList;
									   self.payeeModel.commenceDateDdsTxn=new Date(self.common.initDate);
									   self.payeeModel.expiryDateDdsTxn=new Date(self.common.initDate);
									   self.payeeModel.debitFrom=self.constants.ACCOUNT;
								   }
								   if(responseList[0].creditCardList){
									   self.payeeModel.creditCardList=responseList[0].creditCardList;
								   }
								   if(responseList[0].transactionHistoryList){
									   self.payeeModel.transactionHistoryList=responseList[0].transactionHistoryList;
								   }

							   }
							},
				    getViewDDSPayeeDetails:function(){
//								   if(!responseList[0].hasOwnProperty('errorMessage')){
									   self.payeeModel.serviceProvider = self.payeeModel.ddsRegPayeeList[self.selectedPayeeIndex].serviceProvider;
									   self.payeeModel.serviceProviderDisplayName = self.payeeModel.ddsRegPayeeList[self.selectedPayeeIndex].serviceProviderDescription;
									   self.payeeModel.utilityService = self.payeeModel.ddsRegPayeeList[self.selectedPayeeIndex].utilityService;
									   self.payeeModel.utilityServiceDisplayName = self.payeeModel.ddsRegPayeeList[self.selectedPayeeIndex].utilityServiceDescription;
									   self.payeeModel.utilityNumber = self.payeeModel.ddsRegPayeeList[self.selectedPayeeIndex].utilityNumber;
									   self.payeeModel.issuedFor = self.payeeModel.ddsRegPayeeList[self.selectedPayeeIndex].issuedFor;
									   self.payeeModel.paymentFrequency = self.payeeModel.ddsRegPayeeList[self.selectedPayeeIndex].paymentFrequency;
									   self.payeeModel.paymentFrequencyIndex=self.utils.getIndexfromArray(self.payeeModel.paymentFrequency, self.payeeModel.paymentFrequencyList);
									   self.payeeModel.paymentFrequencyDisplayName=self.payeeModel.paymentFrequencyList[self.payeeModel.paymentFrequencyIndex]['type'];
									   self.payeeModel.accountNumberDisplayName = self.payeeModel.ddsRegPayeeList[self.selectedPayeeIndex].accountNumber;//Test-delete
//									   self.payeeModel.creditCardNumber =self.payeeModel.ddsRegPayeeList[self.selectedPayeeIndex].creditcardNumber;
									   self.payeeModel.commenceDate =new Date(self.payeeModel.ddsRegPayeeList[self.selectedPayeeIndex].commencesFrom);
									   self.payeeModel.expiryDate = new Date(self.payeeModel.ddsRegPayeeList[self.selectedPayeeIndex].expiresOn);
									   self.payeeModel.expiryDateDisplay=self.utils.setFormatedDate(self.payeeModel.expiryDate);
									   self.payeeModel.commenceDateDisplay=self.utils.setFormatedDate(self.payeeModel.commenceDate);
									   if(self.payeeModel.ddsRegPayeeList[self.selectedPayeeIndex].fixedAmount==self.constants.YES){
										   self.payeeModel.fixedVarAmount =self.constants.FIXEDAMOUNT;
										   self.payeeModel.fixedVarAmountDisplayName=self.constants.FIXEDAMOUNTLABEL;
									   }
									   if(self.payeeModel.ddsRegPayeeList[self.selectedPayeeIndex].fixedAmount==self.constants.NO){
										   self.payeeModel.fixedVarAmount =self.constants.VARIABLEAMOUNT;
										   self.payeeModel.fixedVarAmountDisplayName=self.constants.VARIABLEAMOUNTLABEL;
									   }
									   self.payeeModel.fixedAmount = parseInt(self.payeeModel.ddsRegPayeeList[self.selectedPayeeIndex].ddsAmount);
									   self.payeeModel.variableMaxAmount = parseInt(self.payeeModel.ddsRegPayeeList[self.selectedPayeeIndex].variableMaxAmount);
									   self.payeeModel.variableMinAmount = parseInt(self.payeeModel.ddsRegPayeeList[self.selectedPayeeIndex].variableMinAmount);
//								   }
					   },

	};
	self.billerModel = {
			name: "",
			displayName: "", // 'displayName' is the same as 'name' except that whenever we send the billerName
			nickName: "",    // to MBanking, we have to encode th biller name in a wierd format. But, we
			id: "",          // cannot show the encoded value to the user. To separate, the "presentation from
			type: "",        // from the model", we are using two variables here.
			labels: [],
			previousNickName: "",
			labelValues: new Array(11),
			autoPayPaymentType: "",
			billerThresholdAmt: "",
			accountsList: [],
			selectedAccountNickName: '',
			autoPayModes: [],
			selectedDebitAccount:'',
			selectedCurrency:'',
			autoPayStartDate:'',
			autoPayDay:'',
			autoPayMonth:'',
			autoPayYear:'',
			isBillerThresholdAmt:false,
			rAKConfirm:"",/*RAK:2:-Biller Module-Added for payee confirmation-save*/
			/*RAK:2:-BillerPayeeformatDropDownList-start*/
			rakbillerDropdownList:[],
			rakdropdown:[],
			consumerCodeflds:[],
			consumercode0:"",
    		consumercode1:"",
    		consumercode2:"",
    		consumercode3:"",
    		consumercode4:"",
    		consumercode5:"",
    		consumercode6:"",
    		consumercode7:"",
    		consumercode8:"",
    		consumercode9:"",
    		consumercode10:"",
    		isDynDropDownDisplay:false,
			/*RAK:2:-BillerPayeeformatDropDownList-end*/
			parseAutoPayDate:function(){
				if(self.billerModel.autoPayStartDate!='' && self.billerModel.autoPayStartDate!=null ){
					self.billerModel.autoPayDay=self.billerModel.autoPayStartDate.getDate()+'';
					self.billerModel.autoPayMonth = '' + (self.billerModel.autoPayStartDate.getMonth() + 1); // Remember, this is indexed from 0
					self.billerModel.autoPayYear = '' + self.billerModel.autoPayStartDate.getFullYear();
				}
			},
			/*RAK:2:-Biller Module-Added for payee confirmation-save-start*/
			  getRAKConfirmFlag:function(flag){
				if(flag==1){
					self.billerModel.rAKConfirm=self.constants.CONFIRMNOW;
				}
				else{
					self.billerModel.rAKConfirm=self.constants.CONFIRMLATER;
				}
			   },
			 /*RAK:2:-Biller Module-Added for payee confirmation-save-end*/
			 /*RAK:2:-Biller Module-Add Biller-start*/
			getConsumerCodeListForBiller:function(){
				self.billerModel.consumerCodeflds = [];
 				for (var index = 0; index < self.billerModel.labels.length; index++) {
 					var dynamicField = {};
 					//RAK DEV CHANGES SPECIFY SERVICETYPE FOR DEWA AND SALIK BILLER START
 					if(self.billerModel.displayName==self.constants.SALIK || self.billerModel.displayName==self.constants.DEWA
 							|| self.billerModel.displayName==self.constants.SEWA || self.billerModel.displayName==self.constants.FEWA){
 						self.billerModel.consumercode0 = self.billerModel.tempName;
 					}
 					//RAK DEV CHANGES SPECIFY SERVICETYPE FOR DEWA AND SALIK BILLER END
 					dynamicField.value = eval("self.billerModel.consumercode"+index);
 					dynamicField.label = self.billerModel.labels[index].payeeLabelName;
 					dynamicField.dropdown = self.billerModel.labels[index].dropdown;
 					dynamicField.pattern=self.billerModel.labels[index].payeePattern;
 					dynamicField.patternFlag=self.billerModel.labels[index].patternFlag;
 					if(dynamicField.label == 'Others' && self.billerModel.consumerCodeflds[0].value == 'Others'){
 						dynamicField.payeefieldIsRequired=true;
 					}
 					else{
 					dynamicField.payeefieldIsRequired=self.billerModel.labels[index].payeefieldIsRequired;
 					}
 					dynamicField.payeeInputSize = self.billerModel.labels[index].payeeInputSize;
 					dynamicField.payeeLabelType = self.billerModel.labels[index].payeeLabelType;
 					if(self.billerModel.labels[index].payeeLabelType == 'dropDown'){
 						for (var int = 0; int < dynamicField.dropdown.length; int++) {
 							if(dynamicField.dropdown[int].payeeLabelValue == dynamicField.value){
 								dynamicField.value = dynamicField.dropdown[int].payeeLabelDesc;
 								break;
							}
 						}
 					}
 					//for dynamic display of textbox based on dropdown values- EMAAR
 				/*	if(self.billerModel.displayName==self.constants.EMAAR && dynamicField.label==self.constants.OTHERSLABEL){
 							if((dynamicField.payeefieldIsRequired==self.constants.OPTIONAL||!dynamicField.payeefieldIsRequired)&&self.billerModel.isDynDropDownDisplay){
 								self.billerModel.consumerCodeflds.push(dynamicField);
 							}
 						}
 					else*/
 					self.billerModel.consumerCodeflds.push(dynamicField);
 				}
 				//date
 				    self.billerModel.autoPayStartDate=new Date();
					self.billerModel.autoPayDay=self.billerModel.autoPayStartDate.getDate()+'';
					self.billerModel.autoPayMonth = '' + (self.billerModel.autoPayStartDate.getMonth() + 1); // Remember, this is indexed from 0
					self.billerModel.autoPayYear = '' + self.billerModel.autoPayStartDate.getFullYear();

			},

	 			/*RAK:2:-Biller Module-Add Biller-end*/
			/*RAK:2:-to get dynamic fields based on drop down selection for Add Biller-start*/
			getDynamicOptionalFieldForBiller:function(index){

				var value=eval("self.billerModel.consumercode"+index);
				var val=eval(self.billerModel.labels[index]);
					if(self.billerModel.displayName==self.constants.EMAAR && val.payeeLabelName==self.constants.PAYMENTPURPOSELABEL){
						self.billerModel.isDynDropDownDisplay=false;
						if(value==self.constants.OTHER){
							 self.billerModel.isDynDropDownDisplay=true;
						 }
					}

			},

			/*RAK:2:-to get dynamic fields based on drop down selection for Add Biller-End*/

			 /*RAK:2:-DeleteBillerAuth-Success-Start*/
		    processDeleteBillerAuthInitResponse : function(responseList) {
			if(!responseList[0].hasOwnProperty('errorMessage')&&!responseList[1].hasOwnProperty('errorMessage')){

			self.billerAuthDetails = responseList[0].billerDetails;
			for (var delIndex = 0; delIndex < responseList[0].payeeFormat.length; delIndex++) {
				var displayFields = {};
				displayFields.label = responseList[0].payeeFormat[delIndex].field;
				displayFields.value = responseList[0].payeeFormat[delIndex].consumerCode;
				self.billerModel.labels.push(displayFields);
			}

			if(responseList[1].auth == self.constants.TRANSACTIONPASSWORD||responseList[1].auth == self.constants.TRANSACTIOPASSWORDSMSOTP||responseList[1].auth == self.constants.SMSOTP){//RAK:2:- Auth mode changes-added
				self.payeeModel.isAuthSet = true;
				switch(responseList[1].auth){
				case self.constants.TRANSACTIONPASSWORD :
					 self.authMode.authType=self.authMode.TransactionPassword;
					 self.authMode.isFirstAuthMode=true;
					 break;
				 case self.constants.TRANSACTIOPASSWORDSMSOTP:
					 self.authMode.authType=self.authMode.TransactionPassword;
					 self.authMode.secAuthType=self.authMode.OTP;
					 self.authMode.isFirstAuthMode=true;
					 self.authMode.isSecAuthMode=true;
					 break;
				 case self.constants.SMSOTP:
					 self.authMode.authType=self.authMode.OTP;
					 self.authMode.isFirstAuthMode=true;
					 break;
				 default:
					 self.authMode.authType=self.authMode.None;
				     self.authMode.secAuthType=self.authMode.None;
					 break;
				 }

			}
			else{
				self.payeeModel.isAuthSet = false;
			}
		      }

		     },
		     processDeleteSuccessResponse : function(responsesList) {
		    	 self.deleteSuccess=responsesList[0].deleteBillerResponse;
		     },
		     processEditSuccessResponse : function(responsesList) {
		    	 self.deleteSuccess=responsesList[0].deleteBillerResponse;
		     }
		    /*RAK:2:-DeleteBillerAuth-and-Success-End*/

	};

	self.billerDetailsModel = {};
	self.isEditBillerMode = false;
	self.isDeleteBillerMode = false;
	self.billerAuthStatusMessage = "";

	self.resetPayeeModule = function(){
		self.isEditBeneficiaryMode = false;
		self.isDeleteBeneficiaryMode = false;
		self.isIFSCSearchInProgress = false;
		self.payeeList = [];
		self.payeeSelected={};/*RAK:2:-BillerView*/
		self.deleteSuccess="";/*RAK:2:-BillerDelete*/
		// We need to reset the variables related to biller module as well
		self.isEditBillerMode = false;
		self.isDeleteBillerMode = false;
		self.beneficiarySuccessDetails=[];/*RAK:2:-AddBenfFTSuccessPage*/
		self.bankbnftype=" ";/*RAK:2:-AddBnfBanktype*/
		/*RAK:2:-SelfConfirmationListFetch-Payee-Start*/
		self.rakConfirmbillerList=[];
		/*RAK:2:-SelfConfirmationListFetch-Payee-End*/
		/*RAK:2:-AddBnfPage-List-Start*/
		self.rakBnfBankTypeList=[];
		self.prpmCoolingPeriod=[]; //Added for Cooling Period CR
		self.prpmCoolingPeriodAmount="";	//Added for Cooling Period CR
		self.isEligibleCoolingPeriodSmeSegment="";	//Added for Cooling Period CR
		self.rakBnfCCTypeList=[];
		self.rakCountryList = [];
		self.rakBankList = [];
		/*RAK:2:-AddBnfPage-List-End*/
//		self.beneficiarySuccessDetails = [];/*RAK:2:-Successpage*/
		self.bankbnftype=" ";/*RAK:2:-AddBnfBanktype*/
		self.payeeSelected={};/*RAK:2:-BillerView*/
		self.deleteSuccess="";/*RAK:2:-BillerDelete*/
		self.cardsTab=false;//RAK:2:-Cards Tab
		self.billsTab=false;//RAK:2:-Bills Tab
		self.authMode.isTransactionPwd=false;
		self.authMode.isSmsOtp=false;
		self.authMode.clearAuthMode();
	};

	self.resetBillerModule = function(){
		// First, reset variables related to biller module
		//if(!responseList[0].hasOwnProperty('errorMessage')){
		self.isEditBillerMode = false;
		self.isDeleteBillerMode = false;

		// We need to reset the variables related to beneficiaries module as well
		self.isEditBeneficiaryMode = false;
		self.isDeleteBeneficiaryMode = false;
		self.isIFSCSearchInProgress = false;
		self.payeeList = [];
		self.payeeSelected={};/*RAK:2:-BillerView*/
		self.deleteSuccess="";/*RAK:2:-BillerDelete*/
		self.beneficiarySuccessDetails=[];/*RAK:2:-AddBenfFTSuccessPage*/
		self.bankbnftype=" ";/*RAK:2:-AddBnfBanktype*/
		if(!self.isBackClicked)
		{
			self.billerModel.name= "";
			self.billerModel.displayName= "";
			self.billerModel.nickName= "";
			self.billerModel.previousNickName= "";
			self.billerModel.id= "";
			self.billerModel.type= "";
			self.billerModel.labels= [];
			self.billerModel.labelValues= new Array(11);
			self.billerModel.autoPayPaymentType= "";
			self.billerModel.billerThresholdAmt= "";
			self.billerModel.accountsList= [];
			self.billerModel.selectedAccountNickName= '';
			self.billerModel.autoPayModes= [];
			self.billerModel.selectedDebitAccount='';
			self.billerModel.selectedCurrency='';
			self.billerModel.autoPayStartDate='';
			self.billerModel.isBillerThresholdAmt=false;
			self.billerModel.autoPayStartDate = '';
			self.billerModel.billerThresholdAmt = '';
			self.billerModel.autoPayDay='';
			self.billerModel.autoPayMonth='';
			self.billerModel.autoPayYear='';
			self.billerModel.rakbillerDropdownList=[];/*RAK:2:-BillerPayeeformatDropDownList*/
			self.billerModel.rakdropdown=[];
			self.billerModel.consumerCodeflds=[];
			self.billerModel.consumercode0="";
			self.billerModel.consumercode1="";
			self.billerModel.consumercode2="";
			self.billerModel.consumercode3="";
			self.billerModel.consumercode4="";
			self.billerModel.consumercode5="";
			self.billerModel.consumercode6="";
			self.billerModel.consumercode7="";
			self.billerModel.consumercode8="";
			self.billerModel.consumercode9="";
			self.billerModel.consumercode10="";
			self.isBackClicked=false;
			self.isAutoPaySet = false;
			self.billerModel.isDynDropDownDisplay=false;
			/*RAK:2:-Biller Module-Added for payee confirmation-save-start*/
			self.billerModel.rAKConfirm='';
			/*RAK:2:-Biller Module-Added for payee confirmation-save-end*/
			self.authMode.isTransactionPwd=false;
			self.authMode.isSmsOtp=false;
			self.billerModel.tempName='';
			//self.common.fromAuthPage=false;

		}
		self.authMode.clearAuthMode();

	};
	self.fetchDisclaimer =  function(htmlFile) {
		//window.open('./'+htmlFile,'_new','location=no,hardwareback=no,EnableViewPortScale=yes');
		window.open(rootScope.rakHome.disclaimerURL.replace(/['"]+/g,'')+htmlFile+"?"+"parameter=new Date.getTime()",'_new','location=no,hardwareback=no,EnableViewPortScale=yes');
	};
	self.getDisclaimerText =  function() {
		self.disclaimerTextForAddBiller = rootScope.appLiterals.APP.DISCLAIMER['ADD_'+self.billerController.selectedBiller.billerName];

	};

	self.getDisclaimerForAddBenf =  function() {
		if(self.payeeModel.rakBnfCountry == self.constants.IN)
			self.disclaimerText = rootScope.appLiterals.APP.DISCLAIMER[self.selectedPayeeType+self.constants.INDIA];
		else
			self.disclaimerText = rootScope.appLiterals.APP.DISCLAIMER[self.selectedPayeeType];


		self.disclaimerTextNew = rootScope.appLiterals.APP.DISCLAIMER.ADDBENF_AUTH_COOLING.replace('%HOURS%',self.benfCoolingPeriodInterval+" "+(self.benfCoolingPeriodInterval=='1'?rootScope.appLiterals.APP.RAK_COMMON.HOUR:rootScope.appLiterals.APP.RAK_COMMON.HOURS));
	};

	self.getDisclaimerForBillPmt =  function() {
		self.disclaimerText = rootScope.appLiterals.APP.DISCLAIMER[self.payeeSelected.serviceType];

	};

	self.getDisclaimerForMultipleBillPmt =  function() {
		self.disclaimerText = rootScope.appLiterals.APP.DISCLAIMER[self.payeeSelected.serviceTypeDesc];

	};

	self.getDisclaimerForAddBiller =  function() {
		self.disclaimerText = rootScope.appLiterals.APP.DISCLAIMER.PAYEE_AUTH_COOLING.replace('%HOURS%',self.billerCoolingPeriodInterval+" "+(self.billerCoolingPeriodInterval=='1'?rootScope.appLiterals.APP.RAK_COMMON.HOUR:rootScope.appLiterals.APP.RAK_COMMON.HOURS));

	};
	self.getDisclaimerForAddCardBenf =  function() {
		self.disclaimerText = rootScope.appLiterals.APP.DISCLAIMER.ADDCCBENF_AUTH_COOLING.replace('%HOURS%',self.cardBenfCoolingPeriodInterval+" "+(self.cardBenfCoolingPeriodInterval=='1'?rootScope.appLiterals.APP.RAK_COMMON.HOUR:rootScope.appLiterals.APP.RAK_COMMON.HOURS));

	};
	/*
	 * The following billerController will handle all the processing and model for biller module.
	 *
	 */
	self.billerController = {
			billerList:[],
			selectedBiller:{},
			parseRegisteredBillerDetails:function(responsesList){
				self.billerController.billerList = responsesList[0].billerList;
				self.billerCoolingPeriodRqd =  responsesList[0].BILLERCOOLINGPERIODRQD;
				self.billerCoolingPeriodInterval =  responsesList[0].BILLERCOOLINGPERIODINTERVAL;
				//Sorting the list alphabetically
				/*self.billerController.billerList.sort(
						function(a,b){
							a = a.billerName.toLowerCase();
						    b = b.billerName.toLowerCase();
						    return a < b ? -1 : a > b ? 1 : 0;
						});*/
			}
	};

	//added to check if CashPayOut is enabled for Edit/Delete Benef
	self.isCashPayOutEnabled = function(eventName){
		if((self.selectedPayeeType == 'BANK')){
			if(self.payeeModel.selectedBank == 'CEBUANA'){
				if(self.payeeModel.cashPayOutPrpmValue=='N'){
					rootScope.showErrorPopup(rootScope.appLiterals.APP.RAK_COMMON.CEBUANA_DISABLED_MSG);
				}else{
					scope.setEvent(eventName);
				}
			}
			else{
				scope.setEvent(eventName);
			}
		}
		else{
			scope.setEvent(eventName);
		}
	};


	self.getPayeeInitForBankType = function(responseList){
		if(self.isUserNavigatingBack){
			self.isUserNavigatingBack = false;
			return;
		}
		//Add business validations if any.
		if(self.isIFSCSearchInProgress){
			self.isIFSCSearchInProgress = false;
			return;
		}
		
		if(!responseList[0].hasOwnProperty('errorMessage')){
			rootScope.rakHome.textModelWithSpace='';
		}
//		if(self.isEditBeneficiaryMode&&self.payeeModel.addBankBnfFlag){
//			self.payeeModel.nickName = responseList[0].beneficiaryDetails.beneficiaryNickName;
//			self.payeeModel.name = responseList[0].beneficiaryDetails.beneficiaryName;
//			self.payeeModel.accountNumber = responseList[0].beneficiaryDetails.beneficiaryAccountNo;
//			self.payeeModel.rakBnfCountry = responseList[0].beneficiaryDetails.beneficiaryBankCountry;
//			self.payeeModel.selectedBank = responseList[0].beneficiaryDetails.beneficiaryBankName;
//			self.payeeModel.bankBranch= responseList[0].beneficiaryDetails.beneficiaryOtherBankBranch;
//			self.payeeModel.bankCity= responseList[0].beneficiaryDetails.beneficiaryBankCity;
//			self.payeeModel.rakBnkCode= responseList[0].beneficiaryDetails.bankCode;
//			self.payeeModel.rakInterMedBank= responseList[0].beneficiaryDetails.beneficiaryPayDetails2;
//			self.payeeModel.swiftCode= responseList[0].beneficiaryDetails.swiftCode;
//			self.payeeModel.selectedRoutingNumber= responseList[0].beneficiaryDetails.ifsc;
//			self.payeeModel.bnfid=responseList[0].beneficiaryDetails.beneficiaryId;
//			self.bankbnftype=responseList[0].beneficiaryDetails.bnfBankType;
//			switch(self.bankbnftype){
//			 case self.constants.OUTSIDEBANK:
//				 self.bankbnftype=self.payeeTypes.OUTSIDEUAEBANK;
//				 break;
//			 case self.constants.HOMEBANK:
//				 self.bankbnftype=self.payeeTypes.RAKBANK;
//				 break;
//			 case self.constants.WITHINBANK:
//				 self.bankbnftype=self.payeeType.WITHINUAEBANK;
//				 break;
//			 default:
//				 self.bankbnftype="";
//				 break;
//			 }
//
//
//			return;
//		}
//		if(self.isEditBeneficiaryMode&&self.cardsTab){
//
//			self.payeeModel.nickName = responseList[0].beneficiaryDetails.beneficiaryNickName;
//			self.payeeModel.name = responseList[0].beneficiaryDetails.beneficiaryName;
//			self.payeeModel.creditCardNumber = responseList[0].beneficiaryDetails.beneficiaryAccountNo;
//			self.payeeModel.rakBnfCountry = responseList[0].beneficiaryDetails.beneficiaryBankCountry;
//			self.payeeModel.selectedBank = responseList[0].beneficiaryDetails.beneficiaryBankName;
//			self.payeeModel.bankBranch= responseList[0].beneficiaryDetails.beneficiaryOtherBankBranch;
//			self.payeeModel.bankCity= responseList[0].beneficiaryDetails.beneficiaryBankCity;
//			self.payeeModel.rakBnkCode= responseList[0].beneficiaryDetails.bankCode;
//			self.payeeModel.accountNumber = responseList[0].beneficiaryDetails.beneficiaryPayDetails1;
//			self.payeeModel.rakInterMedBank= responseList[0].beneficiaryDetails.beneficiaryPayDetails2;
//			self.payeeModel.swiftCode= responseList[0].beneficiaryDetails.swiftCode;
//			self.payeeModel.selectedRoutingNumber= responseList[0].beneficiaryDetails.ifsc;
//			self.payeeModel.bnfid=responseList[0].beneficiaryDetails.beneficiaryId;
//			self.bankbnftype=responseList[0].beneficiaryDetails.bnfBankType;
//			switch(self.bankbnftype){
//			 case "ABK":
//				 self.bankbnftype="OCC";
//				 break;
//			 case "HBK":
//				 self.bankbnftype="RCC";
//				 break;
//			 case "OBK":
//				 self.bankbnftype="UCC";
//				 break;
//			 case "SVC":
//				 self.bankbnftype="PPC";
//				 break;
//			 default:
//				 self.bankbnftype="";
//				 break;
//			 }
//			return;
//		}
		if(!responseList[0].hasOwnProperty('errorMessage')){
			
		

		if(!responseList[0].rakcountryList&& (!self.isIFSCSearchInProgress)){//RAK:2:-added
				responseList = self.payeeInitServiceResponse;
		}
		/*
		 * The following line of code will reset the entire model required for adding beneficiary
		 */
//		self.payeeModel.resetPayeeModel();

		/*RAK:2:-Commented-Start*/
//		if(responseList[0].currencyList){
		if(responseList[0].rakcountryList){
			self.payeeInitResponse = responseList[0];
		}
//		self.currencyList = self.payeeInitResponse.currencyList;
//		self.networkType = self.payeeInitResponse.networkType;
//		self.accountType = self.payeeInitResponse.accountTypeList;
		/*RAK:2:-Commented-End*/
		/*RAK:2:-For Beneficiary Type list*/
		//Sort the lists alphabetically
		self.rakBnfBankTypeList=self.payeeInitResponse.rakBankBnfList;
		self.prpmCoolingPeriod=self.payeeInitResponse.prpmCoolingPeriod.split("|"); //Added for Cooling Period CR
		self.prpmCoolingPeriodAmount=self.payeeInitResponse.prpmCoolingPeriodAmount; //Added for Cooling Period CR
		self.isEligibleCoolingPeriodSmeSegment=self.payeeInitResponse.isEligibleCoolingPeriodSmeSegment; //Added for Cooling Period CR

		//Added to check the Cebuna Benf addition is enabled or not and accordingly showing the option in DDL
		if(responseList[0].hasOwnProperty('CashPayOutPrpmValue')){
			if(responseList[0].CashPayOutPrpmValue == 'N'){
				for(var i = 0; i < self.rakBnfBankTypeList.length; i++){
					if(self.rakBnfBankTypeList[i].value == "CASH"){
						self.rakBnfBankTypeList.splice(i,1);
					}
				}
			}
		}

		self.payeeModel.cebuanaBankName=responseList[0].CashPayOutBank;
		self.payeeModel.cebuanaCountry=responseList[0].CashPayOutCountry;

		/*self.rakBnfBankTypeList.sort(
				function(a,b){
					a = a.type.toLowerCase();
				    b = b.type.toLowerCase();

				    return a < b ? -1 : a > b ? 1 : 0;
				});*/
		self.rakBnfCCTypeList=self.payeeInitResponse.rakCCBnfList;
		/*self.rakBnfCCTypeList.sort(
				function(a,b){
					a = a.type.toLowerCase();
				    b = b.type.toLowerCase();

				    return a < b ? -1 : a > b ? 1 : 0;
				});*/
		self.rakCountryList=self.payeeInitResponse.rakcountryList;
		/* XM Changes Start*/
		self.benfRestCountryList=self.payeeInitResponse.benfRestCountryList;
		/* XM Changes End*/
		self.rakIbanCountryList=self.payeeInitResponse.rakIbanCountryList.split("|");
	/*	self.rakCountryList.sort(
			function( a, b ) {
		    a = a.countryDesc.toLowerCase();
		    b = b.countryDesc.toLowerCase();

		    return a < b ? -1 : a > b ? 1 : 0;
		});*/

		/*Rak: added for DD/MCQ : Restricted Country List*/
		if(responseList[0].hasOwnProperty('DDCNTList')){
			self.DDMCQCountryList = self.payeeInitResponse.DDCNTList;

		}


		self.rakBankList =self.payeeInitResponse.rakFindbankDetails;
		//radio button preselection
		self.payeeModel.isAccIban = self.constants.ACCOUNT;

		/*if(self.selectedPayeeType==self.payeeTypes.MCHQ){
			self.payeeModel.rakBnfCountry=self.constants.AE;
			self.payeeModel.rakBnfCountryDisplayName=self.payeeInitResponse.rakcountryList[self.payeeModel.rakBnfCountry];

		};*/
//		self.rakBankList.sort(
//				function( a, b ) {
//			    a = a.bankName.toLowerCase();
//			    b = b.bankName.toLowerCase();
//
//			    return a < b ? -1 : a > b ? 1 : 0;
//			});
		/*RAK:2:-For Beneficiary Type list*/

		self.benfCoolingPeriodRqd =  responseList[0].BENFCOOLINGPERIODRQD;
		self.benfCoolingPeriodInterval =  responseList[0].BENFCOOLINGPERIODINTERVAL;

		self.cardBenfCoolingPeriodRqd =  responseList[0].CARDBENFCOOLINGPERIODRQD;
		self.cardBenfCoolingPeriodInterval =  responseList[0].CARDBENFCOOLINGPERIODINTERVAL;
		
		}

	};

	self.setAccountIndexForEditBillerFlow = function(){
		if (self.isEditBillerMode) {
			self.billerModel.autoPayStartDate = new Date(self.billerModel.autoPayStartDate);
			for(var account in self.billerModel.accountsList){
				if(self.billerModel.accountsList[account].accountID == self.billerModel.selectedAccountNickName){
					self.billerModel.selectedAccountNickName = self.billerModel.accountsList[account].accountIndex;
					break;
				}
			}
		}
	}

	self.validateNickName = function()
	{
		if (self.billerModel.previousNickName==self.billerModel.nickName)
		{
			rootScope.showErrorPopup(rootScope.appLiterals.APP.RAK_COMMON.NICKNAME_VALID);
		}
		else{
			self.payeeModel.editBnfFlag=true;
			scope.setEvent('onPayeeEditBillerClick');

		}

	};
	//
	self.validateBenfNickName = function()
	{
		/*if(self.selectedPayeeType != self.payeeTypes.CEBUANA){
			if(self.payeeModel.cashPayOutPrpmValue=='N'){
				rootScope.showErrorPopup("You can not proceed");
			}
		}*/

		 if(self.selectedPayeeType != self.payeeTypes.MOBCASH && self.payeeModel.previousNickName==self.payeeModel.nickName
				 ||self.selectedPayeeType == self.payeeTypes.MOBCASH &&  self.payeeModel.previousName==self.payeeModel.name
				 ||((self.bankbnftype==self.payeeTypes.DD || self.bankbnftype==self.payeeTypes.MCHQ) &&  self.payeeModel.previousNickName==self.payeeModel.nickName))

		{
			rootScope.showErrorPopup(rootScope.appLiterals.APP.RAK_COMMON.NICKNAME_VALID);
		}
		else{
			self.payeeModel.editBnfFlag=true;

			scope.setEvent(self.getAddPayeeEventDetails());

		}

	};

	// This method parses the backend response while specifying the details of the biller
	// It is called in two modes: Adding a biller and Editing a biller.
	self.getPayeeInitForBillerType = function(responseList) {
		// Unfortunately, the entire response format for edit biller and add biller
		// are completely different. So, we need to parse depending on the mode
		/*RAK:2:-For Add Payee biller dynamic f*/
//		if(!responseList[0].hasOwnProperty('errorMessage') && (typeof responseList[0].debitAccount != "string") && responseList[0].hasOwnProperty('debitAccount')){
			if(!responseList[0].hasOwnProperty('errorMessage')){
			self.billerModel.initBillerPageRespone = responseList[0] || self.billerModel.initBillerPageRespone;
			}
//			if(!self.isBackClicked){

				if (self.isEditBillerMode) {
					//EDIT BILLER MODE
					if( !self.isBackClicked ){
						self.billerModel.desc = self.billerModel.initBillerPageRespone.billerDetails.billerType;
						self.billerModel.nickName = self.billerModel.initBillerPageRespone.billerDetails.billerNickName;
						self.billerModel.previousNickName = self.billerModel.initBillerPageRespone.billerDetails.billerNickName;
						self.billerModel.name = self.billerModel.initBillerPageRespone.billerDetails.billerName;
						self.billerModel.displayName = self.billerModel.initBillerPageRespone.billerDetails.billerName;
						self.billerModel.autoPayModes = self.billerModel.initBillerPageRespone.autoPayMode;
						self.billerModel.labels = self.billerModel.initBillerPageRespone.payeeFormat;

						self.billerModel.accountsList = self.billerModel.initBillerPageRespone.debitAccount;

						self.isAutoPaySet = ((self.billerModel.initBillerPageRespone.billerDetails.billerAutoPay).toLowerCase() == "yes" ? true:false);
						self.billerModel.billerThresholdAmt = parseFloat(self.billerModel.initBillerPageRespone.limitAmount) || "0.00";

						for(var account in self.billerModel.initBillerPageRespone.debitAccount){
							if(self.billerModel.initBillerPageRespone.selectedAccountIndex == self.billerModel.initBillerPageRespone.debitAccount[account].accountIndex){
								//console.log(self.billerModel.initBillerPageRespone.debitAccount[account].accountID);
								self.billerModel.selectedAccountNickName = self.billerModel.initBillerPageRespone.debitAccount[account].accountID;
							}
						}
						for(var payMode in self.billerModel.autoPayModes){
							if(self.billerModel.autoPayModes[payMode].autoPayModeDesc == self.billerModel.initBillerPageRespone.billerDetails.billerAutoPayMode ){
								//console.log(self.billerModel.autoPayModes[payMode].autoPayModeDesc)
								self.billerModel.autoPayPaymentType = self.billerModel.autoPayModes[payMode].autoPayModeCode;
							}
						}

						/*
						 * Prem - 09-July-2015
						 * R2-IMPLEMENTATION
						 * DATE-FORMAT
						 * Please note the following code will change on split and join conditions during R2.
						 * Code might break without this change
						 */
						// comment by sadaisba on 23rd July 2015

						var autoPayStartDateArray = self.billerModel.initBillerPageRespone.billerDetails.billerSubscriptionDate.split(',');
						var autoPayStartDateString = autoPayStartDateArray[1] + "/" + autoPayStartDateArray[0] + "/"+ autoPayStartDateArray[2];
						self.billerModel.autoPayStartDate = new Date(autoPayStartDateString);
					}
					else
					{
						self.billerModel.selectedAccountNickName = self.billerModel.initBillerPageRespone.debitAccount[self.billerModel.selectedAccountNickName].accountID;
					}

					// We do not show any labels in Edit Mode. So, lets not even parse them
					//Requirement is to show consumer code in edit biller flow.




				} else {
					//ADD BILLER MODE

					if(!self.isBackClicked){
					self.billerModel.desc = self.billerModel.initBillerPageRespone.billerTypeDesc;
					self.billerModel.accountsList = self.billerModel.initBillerPageRespone.debitAccount;
					self.billerModel.autoPayModes = self.billerModel.initBillerPageRespone.autoPayMode;
					self.billerModel.name = self.billerModel.initBillerPageRespone.billerName;
					self.billerModel.displayName = self.billerModel.initBillerPageRespone.billerName;
					self.billerModel.id = self.billerModel.initBillerPageRespone.billerID;
					self.billerModel.type = self.billerModel.initBillerPageRespone.billerType;
					self.billerModel.nickName = self.billerModel.nickName || '';
					self.isAutoPaySet = false;
					// Let us iterate over the array of labels
					self.billerModel.labels = [];


					for (var labelIndex = 0; labelIndex < self.billerModel.initBillerPageRespone.payeeLabel.length; labelIndex++) {
						var currLabel = {};
						currLabel.payeeLabelName = self.billerModel.initBillerPageRespone.payeeLabel[labelIndex].payeeLabelName;
						currLabel.payeeLabelType = self.billerModel.initBillerPageRespone.payeeLabel[labelIndex].payeeLabelType;
						currLabel.payeeInputSize = self.billerModel.initBillerPageRespone.payeeLabel[labelIndex].payeeInputSize;
						currLabel.payeeLabelValue = "";
						currLabel.isReadOnly = false;
						currLabel.payeefieldIsRequired = self.billerModel.initBillerPageRespone.payeeLabel[labelIndex].payeefieldIsRequired;
						if(currLabel.payeefieldIsRequired!=null && currLabel.payeefieldIsRequired!=""&& currLabel.payeefieldIsRequired!=undefined){
							if(currLabel.payeefieldIsRequired==self.constants.MANDATORY){
								currLabel.payeefieldIsRequired=true;
							}
							else if(currLabel.payeefieldIsRequired==self.constants.OPTIONAL){
								currLabel.payeefieldIsRequired=false;
							}
							else
								currLabel.payeefieldIsRequired=false;
						}
						switch(self.billerModel.name){
						case self.constants.DEWA :
							if(currLabel.payeeLabelName==self.constants.SERVICETYPELABEL){
							//RAK DEV CHANGES SPECIFY SERVICETYPE FOR DEWA AND SALIK BILLER START
							self.billerModel.tempName=self.billerModel.displayName;
							self.billerModel.consumercode0= self.billerModel.displayName;
						   //RAK DEV CHANGES SPECIFY SERVICETYPE FOR DEWA AND SALIK BILLER END
							currLabel.isReadOnly = true;
							currLabel.payeefieldIsRequired=false;
							}
							 break;
						case self.constants.SEWA :
							if(currLabel.payeeLabelName==self.constants.SERVICETYPELABEL){
							//RAK DEV CHANGES SPECIFY SERVICETYPE FOR SEWA,FEWA
							self.billerModel.tempName=self.billerModel.displayName;
							self.billerModel.consumercode0= self.billerModel.displayName;
						   //RAK DEV CHANGES SPECIFY SERVICETYPE FOR DEWA,SEWA,FEWA AND SALIK BILLER END
							currLabel.isReadOnly = true;
							currLabel.payeefieldIsRequired=false;
							}
							 break;
						case self.constants.FEWA :
							if(currLabel.payeeLabelName==self.constants.SERVICETYPELABEL){
							//RAK DEV CHANGES SPECIFY SERVICETYPE FOR SEWA,FEWA
							self.billerModel.tempName=self.constants.FEWASERVICETYPE;
							self.billerModel.consumercode0= self.constants.FEWASERVICETYPE;
						   //RAK DEV CHANGES SPECIFY SERVICETYPE FOR DEWA AND SALIK BILLER END
							currLabel.isReadOnly = true;
							currLabel.payeefieldIsRequired=false;
							}
							 break;
						case self.constants.SALIK :
							if(currLabel.payeeLabelName==self.constants.SERVICETYPELABEL){
							//self.billerModel.consumercode0=self.constants.SALIKSERVICETYPE;
							//RAK DEV CHANGES SPECIFY SERVICETYPE FOR DEWA AND SALIK BILLER START
						    self.billerModel.tempName=self.constants.SALIKSERVICETYPE;
							self.billerModel.consumercode0=self.constants.SALIKSERVICETYPE;
							//RAK DEV CHANGES SPECIFY SERVICETYPE FOR DEWA AND SALIK BILLER END
							currLabel.isReadOnly = true;
							currLabel.payeefieldIsRequired=false;
							}
							 break;
						case self.constants.RAKTOLL :
							if(currLabel.payeeLabelName==self.constants.SERVICETYPELABEL){
							//self.billerModel.consumercode0=self.constants.SALIKSERVICETYPE;
							//RAK DEV CHANGES SPECIFY SERVICETYPE FOR DEWA AND SALIK BILLER START
						    self.billerModel.tempName=self.constants.RAKTOLLTOPUP;
							self.billerModel.consumercode0=self.constants.RAKTOLLTOPUP;
							//RAK DEV CHANGES SPECIFY SERVICETYPE FOR DEWA AND SALIK BILLER END
							currLabel.isReadOnly = true;
							currLabel.payeefieldIsRequired=false;
							}
							 break;
						 default:
							 break;
						}
						currLabel.payeePattern = self.billerModel.initBillerPageRespone.payeeLabel[labelIndex].payeePattern;
						currLabel.patternFlag=false;
						if(currLabel.payeePattern!=null && currLabel.payeePattern!=""&& currLabel.payeePattern!=undefined &&currLabel.payeePattern!="ALL"){
							currLabel.patternFlag=true;
						}


						if(currLabel.payeeLabelType == 'dropDown'){
							self.billerModel.rakbillerDropdownList=self.billerModel.initBillerPageRespone.payeeLabel[labelIndex].payeeDropdown;


 						currLabel.dropdown =self.billerModel.rakbillerDropdownList;
 						}

						//RAK:2:-End
						self.billerModel.labels.push(currLabel);
					}
					self.billerModel.autoPayPaymentType = self.billerModel.autoPayPaymentType || "";
					self.billerModel.selectedAccountNickName = self.billerModel.selectedAccountNickName || "";
					self.billerModel.autoPayStartDate=self.billerModel.autoPayStartDate || '';
					}
				}


				// By the time we are here, we have finished parsing the json responses.
				// The following piece of logic is common for both Edit Biller and Add Biller
				// scenarios

				if ((self.billerModel.desc == 'Presentment') ||
						(self.billerModel.desc == 'Payment and Presentment')) {
					self.isPresentMentBiller = true;
				} else {
					self.isPresentMentBiller = false;
				}

	};

	self.getPayeeInitForBillerDetails=function(responseList){
		if(!self.isBackClicked){

			self.billerDetailsModel = responseList[0].billerDetails || self.billerDetailsModel;
		}
	};

	// This method should be called before invoking the backend service. This
	// method setups the parameters as required by the biller details conf service
	self.setupBillerLabels = function() {
		self.billerModel.isBillerThresholdAmt=false;
		if(self.billerModel.autoPayPaymentType=='L' && self.billerModel.billerThresholdAmt==''){
			self.billerModel.isBillerThresholdAmt='';
		}
		// Let us iterate over the array
		for (var labelIndex = 0; labelIndex < self.billerModel.labels.length; labelIndex++) {
			self.billerModel.labelValues[labelIndex] = self.billerModel.labels[labelIndex].payeeLabelValue;
		}

		// We need to remember that the array has to have 11 elements, otherwise the app will
		// not send all the parameters
		for (;labelIndex < 11; labelIndex++) {
			self.billerModel.labelValues[labelIndex] = "";
		}


		// We also have to set the biller name according to the format MBaking expects.
		// The format of the biller name is <Biller Name>%23<Biller Id>%23<Biller Type>
		self.billerModel.name = encodeURI(self.billerModel.displayName) + '%23' +
		self.billerModel.id + '%23' + self.billerModel.type;
	};


	self.getLabelName = function(index) {
		return eval("self.billerModel.consumercode"+index);
	};

	// This method is called the first time PayeeAddBillerAuthPage is called.
	// The page is loaded for three use cases
	// 1. Add a new biller
	// 2. Edit a biller
	// 3. Delete an existing biller
	self.processBillerAuthInitResponse = function(responseList) {

		if(!responseList[0].hasOwnProperty('errorMessage')  && !responseList[0].hasOwnProperty('ResendMode')){
			self.billerAuthDetails = responseList[0];
		if(responseList[0].auth == self.constants.TRANSACTIONPASSWORD ||responseList[0].auth == self.constants.TRANSACTIOPASSWORDSMSOTP ||responseList[0].auth ==self.constants.SMSOTP ){//RAK:2:- Auth mode changes-added
			self.payeeModel.isAuthSet = true;

			switch(responseList[0].auth){
			case self.constants.TRANSACTIONPASSWORD :
				 self.authMode.authType=self.authMode.TransactionPassword;
				 self.authMode.isFirstAuthMode=true;
				 break;
			 case self.constants.TRANSACTIOPASSWORDSMSOTP:
				 self.authMode.authType=self.authMode.TransactionPassword;
				 self.authMode.secAuthType=self.authMode.OTP;
				 self.authMode.isFirstAuthMode=true;
				 self.authMode.isSecAuthMode=true;
				 break;
			 case self.constants.SMSOTP :
				 self.authMode.authType=self.authMode.OTP;
				 self.authMode.isFirstAuthMode=true;
				 break;
			 default:
				 self.authMode.authType=self.authMode.None;
			     self.authMode.secAuthType=self.authMode.None;
				 break;
			 }

		}

		else{
			self.payeeModel.isAuthSet = false;
		}
		}
	};

	// Called only when the user has submitted his transaction password and this
	// page has been refreshed again as a result of the completion of the backend
	// service.
	// Handles three use cases
	// 1. Add a new biller
	// 2. Edit a biller
	// 3. Delete an existing biller
	self.processBillerAuthStatusResponse = function(responseList) {

		// Check which field MBanking sent us the message
		// We get a different field based on the type of request.
		// It could either be
		// (i) AddBiller's Response
		// (ii) EditBiller's Response
		// (iii) DeleteBiller's Response
		if (responseList[0].addBillerResponse) {
			self.billerAuthStatusMessage = responseList[0].addBillerResponse;
		} else if (responseList[0].modifyBillerResponse) {
			self.billerAuthStatusMessage = responseList[0].modifyBillerResponse;
		} else if (responseList[0].deleteBillerResponse) {
			self.billerAuthStatusMessage = responseList[0].deleteBillerResponse;
		} else {
			// If we are here, then the only possibiity is that there was an error.
			self.billerAuthStatusMessage = responseList[0].errorMessage;
			self.isAlertAnError = false;//-stub-change to true
		}

		// We have to show the alert message now.
		// We are using this flag to explicitly show the alert message
		self.isShowAlert = false;//-stub-change to true
	};

	self.getBillerAuthPopupEvent = function(){
		var event="";
		if(self.isAlertAnError)
			event = 'onBillerAuthErrorOkClick';
		else
			event = 'onAddBillerPageCloseClick';
		self.isAlertAnError = false;
		return event;
	};

	self.accountTypeChanged = function(data){

	};
	self.processPayeeAuthResponse = function(responseList){
		if(!responseList[0].hasOwnProperty('errorMessage') && !responseList[0].hasOwnProperty('ResendMode'))
		{
			if(self.selectedPayeeType == self.payeeTypes.WITHINUAEBANK){
					self.beneficiaryAuthDetails = responseList[0];
			}
			else if(self.isDeleteBeneficiaryMode){
				self.beneficiaryAuthDetails = responseList[0];
				/*FTA Changes start*/
				
				if(responseList[0].beneficiaryDetails.beneficiaryBankName.toUpperCase()=='FEDERAL TAX AUTHORITY'){
					self.payeeModel.showFDAComponentFlag = 'N';
				}else{
					self.payeeModel.showFDAComponentFlag = 'Y';
				}
			
			/*FTA Changes End*/
				
				if(responseList[0].hasOwnProperty('benfIban')){
					self.payeeModel.ibanDisplay=self.beneficiaryAuthDetails.benfIban;
				}
			}

			else{
				if(responseList.length > 1){
						self.beneficiaryAuthDetails = responseList[1];

				}
				else{
						self.beneficiaryAuthDetails = responseList[0];
						if(responseList[0].hasOwnProperty('beneficiarySwift')){
							self.payeeModel.swiftDisplay=self.beneficiaryAuthDetails.beneficiarySwift;
						}
						if(responseList[0].hasOwnProperty('beneficiaryCCAcctName')){
							self.payeeModel.name=self.beneficiaryAuthDetails.beneficiaryCCAcctName;
						}
						if(responseList[0].hasOwnProperty('beneficiaryName')){
							self.payeeModel.name=self.beneficiaryAuthDetails.beneficiaryName;
						}
						if(responseList[0].hasOwnProperty('beneficiaryCountry')){
//							self.payeeModel.rakBnfCountry=self.beneficiaryAuthDetails.beneficiaryCountry;
							self.payeeModel.rakBnfCountryDisplayName=self.beneficiaryAuthDetails.beneficiaryCountry;
						}
						if(responseList[0].hasOwnProperty('beneficiaryResidentCountryDisplay')){
							self.payeeModel.rakBnfResidentCountryDisplayName=self.beneficiaryAuthDetails.beneficiaryResidentCountryDisplay;
						}
						if(responseList[0].hasOwnProperty('beneficiaryCity')){
//
							self.payeeModel.bankCity=self.beneficiaryAuthDetails.beneficiaryCity;

						}
						if(responseList[0].hasOwnProperty('beneficiaryIFSC')){
//							self.payeeModel.rakBnfCountry=self.beneficiaryAuthDetails.beneficiaryCountry;

							self.payeeModel.selectedRoutingNumber=self.beneficiaryAuthDetails.beneficiaryIFSC;

						}
						if(responseList[0].hasOwnProperty('beneficiaryBnkBranch')){
//
							self.payeeModel.bankBranch=self.beneficiaryAuthDetails.beneficiaryBnkBranch;

						}
						if(responseList[0].hasOwnProperty('beneficiaryBnk')){
//

								self.payeeModel.selectedBank=self.beneficiaryAuthDetails.beneficiaryBnk;
							}
						//CHANGES DONE AS FIX OF PROUAT-3539 START
						if(responseList[0].hasOwnProperty('beneficiaryAccountNo')){
//							self.payeeModel.rakBnfCountry=self.beneficiaryAuthDetails.beneficiaryCountry;

							//self.payeeModel.creditCardNumber=(self.beneficiaryAuthDetails.beneficiaryAccountNo);
							self.payeeModel.creditCardNumberDisplay=(self.beneficiaryAuthDetails.beneficiaryAccountNo);
						}
						//CHANGES DONE AS FIX OF PROUAT-3539 END

						if(responseList[0].hasOwnProperty('benfIban')){
							self.payeeModel.ibanDisplay=self.beneficiaryAuthDetails.benfIban;
						}

				}

			}

			//RAK:2:- Auth mode changes-added
			for(var index=0;index < responseList.length;index++){
				if(responseList[index].auth == self.constants.TRANSACTIONPASSWORD||responseList[index].auth == self.constants.TRANSACTIOPASSWORDSMSOTP||responseList[index].auth == self.constants.SMSOTP||responseList[index].auth == self.constants.HARDTOKEN){
					self.payeeModel.isAuthSet = true;
					switch(responseList[0].auth){
					 case self.constants.TRANSACTIONPASSWORD :
						 self.authMode.authType=self.authMode.TransactionPassword;
						 self.authMode.isFirstAuthMode=true;
						 break;
					 case self.constants.TRANSACTIOPASSWORDSMSOTP:
						 self.authMode.authType=self.authMode.TransactionPassword;
						 self.authMode.secAuthType=self.authMode.OTP;
						 self.authMode.isFirstAuthMode=true;
						 self.authMode.isSecAuthMode=true;
						 break;
					 case self.constants.SMSOTP:
						 self.authMode.authType=self.authMode.OTP;
						 self.authMode.isFirstAuthMode=true;
						 break;

					 case self.constants.HARDTOKEN:
						 self.authMode.authType=self.authMode.HardToken;
						 self.authMode.isFirstAuthMode=true;
						 break;
					 default:
						 self.authMode.authType=self.authMode.None;
					     self.authMode.secAuthType=self.authMode.None;
						 break;
					 }

				}
				else{
					self.payeeModel.isAuthSet = false;
				}
			}
		}
		if(self.isDeleteBeneficiaryMode&&self.payeeModel.addBankBnfFlag){

			self.payeeModel.nickName = responseList[0].beneficiaryDetails.beneficiaryNickName;
			self.payeeModel.name = responseList[0].beneficiaryDetails.beneficiaryName;
				self.payeeModel.rakBnfResidentCountryDisplayName = responseList[0].beneficiaryDetails.beneficiaryCountry;
			self.payeeModel.accountNumber = responseList[0].beneficiaryDetails.beneficiaryAccountNo;
			self.payeeModel.rakBnfCountry = responseList[0].beneficiaryDetails.beneficiaryBankCountry;
			self.payeeModel.selectedBank = responseList[0].beneficiaryDetails.beneficiaryBankName;
			self.payeeModel.bankBranch= responseList[0].beneficiaryDetails.beneficiaryBankName;
			self.payeeModel.bankCity= responseList[0].beneficiaryDetails.beneficiaryOtherBankBranch;
			self.payeeModel.rakBnkCode= responseList[0].beneficiaryDetails.bankCode;
			self.payeeModel.rakInterMedBank= responseList[0].beneficiaryDetails.beneficiaryPayDetails2;
			self.payeeModel.swiftCode= responseList[0].beneficiaryDetails.swiftCode;
			self.payeeModel.selectedRoutingNumber = responseList[0].beneficiaryDetails.ifsc;
			self.payeeModel.bnfid=responseList[0].beneficiaryDetails.beneficiaryId;
			self.bankbnftype=responseList[0].beneficiaryDetails.bnfBankType;
			switch(self.bankbnftype){
			 case self.constants.OUTSIDEBANK:
				 if(self.payeeModel.selectedBank=="CEBUANA"){
					 self.bankbnftype=self.payeeTypes.CEBUANA;
				 }
				 else{
					 self.bankbnftype=self.payeeTypes.OUTSIDEUAEBANK;
				 }
				 break;
			 case self.constants.HOMEBANK:
				 self.bankbnftype=self.payeeTypes.RAKBANK;
				 break;
			 case self.constants.WITHINBANK:
				 self.bankbnftype=self.payeeTypes.WITHINUAEBANK;
				 break;
			 default:
				 self.bankbnftype="";
				 break;
			 }

			return;
		}
		if(self.isDeleteBeneficiaryMode&&self.cardsTab){

			self.payeeModel.nickName = responseList[0].beneficiaryDetails.beneficiaryNickName;
			self.payeeModel.name = responseList[0].beneficiaryDetails.beneficiaryName;
			self.payeeModel.creditCardNumber = responseList[0].beneficiaryDetails.beneficiaryAccountNo;
			self.payeeModel.creditCardNumberDisplay = responseList[0].beneficiaryDetails.beneficiaryAccountNo;
			self.payeeModel.rakBnfCountry = responseList[0].beneficiaryDetails.beneficiaryBankCountry;
			self.payeeModel.selectedBank = responseList[0].beneficiaryDetails.beneficiaryBankName;
			self.payeeModel.bankBranch= responseList[0].beneficiaryDetails.beneficiaryOtherBankBranch;
			self.payeeModel.bankCity= responseList[0].beneficiaryDetails.beneficiaryBankCity;
			self.payeeModel.rakBnkCode= responseList[0].beneficiaryDetails.bankCode;
			self.payeeModel.rakInterMedBank= responseList[0].beneficiaryDetails.beneficiaryPayDetails2;
			self.payeeModel.accountNumber = responseList[0].beneficiaryDetails.beneficiaryPayDetails1;
			self.payeeModel.swiftCode= responseList[0].beneficiaryDetails.swiftCode;
			self.payeeModel.selectedRoutingNumber = responseList[0].beneficiaryDetails.ifsc;
			self.payeeModel.bnfid=responseList[0].beneficiaryDetails.beneficiaryId;
			self.bankbnftype=responseList[0].beneficiaryDetails.bnfBankType;
			switch(self.bankbnftype){
			 case self.constants.OUTSIDEBANK:
				 self.bankbnftype=self.payeeTypes.OUTSIDEUAECCARD;
				 break;
			 case self.constants.HOMEBANK:
				 self.bankbnftype=self.payeeTypes.RAKCREDITCARD;
				 break;
			 case self.constants.WITHINBANK:
				 self.bankbnftype=self.payeeTypes.WITHINUAECCARD;
				 break;
			 case self.constants.PREPAIDCARD:
				 self.bankbnftype=self.payeeTypes.PREPAIDCARD;
				 break;
			 default:
				 self.bankbnftype="";
				 break;
			 }

			return;
		}

		self.authMode.firstAuthModeValue="";
		self.authMode.secAuthModeValue="";
	};
	self.getAddPayeeEventDetails = function(){
		var event = '';
		/*RAK:-Added and Modified for Biller-BNF link-start*/
		if(self.isEditBeneficiaryMode){

			if (self.payeeTypes.MOBCASH == self.selectedPayeeType||self.bankbnftype==self.payeeTypes.MOBCASH){
				self.payeeModel.txnType=self.constants.TXNTYPEMOBCASH;
				rootScope.rak2FARegister.RegistrationModel.resolveEventFor2FA('BENF_ADD_FUND');
				event = "onPayeeMobCashBeneficiaryModifyPayeeClick";
			}
			else if(self.payeeTypes.PREPAIDCARD == self.selectedPayeeType||self.bankbnftype==self.payeeTypes.PREPAIDCARD){
				self.payeeModel.txnType=self.constants.TXNTYPEPREPAIDCARD;
				rootScope.rak2FARegister.RegistrationModel.resolveEventFor2FA('BENF_ADD_CARD');
				event = 'onPayeePPCardBeneficiaryModifyPayeeClick';
			}
			else{
				self.payeeModel.txnType=self.constants.TXNTYPEBNF;
				//Page Level Entries
				//rootScope.rak2FARegister.RegistrationModel.resolveEventFor2FA('BENF_ADD');
				event = 'onPayeeBeneficiaryHomeOtherBankModifyPayeeClick';
			}

		}
		else if(self.isDeleteBeneficiaryMode){
			event = 'onPayeeBeneficiaryDeleteAuthConfirmClick';
			rootScope.rak2FARegister.RegistrationModel.resolveEventFor2FA('BENF_ADD');

		}
		else if (self.payeeTypes.RAKBANK == self.selectedPayeeType){
			event = 'onPayeeBeneficiaryAddPayeeClick';
			rootScope.rak2FARegister.RegistrationModel.resolveEventFor2FA('BENF_ADD_FUND');
			self.bankbnftype=self.payeeTypes.RAKBANK;
             //For within UAE corporate
          if(rootScope.rakHome.userTypeIDValue=="CORPORATE"){
            rootScope.rak2FARegister.RegistrationModel.resolveEventFor2FA('ADDBENF');
          }
			

		}
		else if (self.payeeTypes.RAKCREDITCARD == self.selectedPayeeType){
			event = 'onPayeeBeneficiaryAddCardClick';
			rootScope.rak2FARegister.RegistrationModel.resolveEventFor2FA('BENF_ADD_CARD');
			self.bankbnftype=self.payeeTypes.RAKCREDITCARD;
		}
		else if (self.payeeTypes.PREPAIDCARD == self.selectedPayeeType){
			event = 'onPayeeBeneficiaryAddPPCardClick';
			rootScope.rak2FARegister.RegistrationModel.resolveEventFor2FA('BENF_ADD_CARD_PP');
			self.bankbnftype=self.payeeTypes.PREPAIDCARD;
		}
		else if(self.payeeTypes.WITHINUAEBANK == self.selectedPayeeType){
			event = 'onPayeeBeneficiaryOtherBankAddPayeeClick';
			//Page Level Entries
			//rootScope.rak2FARegister.RegistrationModel.resolveEventFor2FA('BENF_ADD');
			self.bankbnftype=self.payeeTypes.WITHINUAEBANK;
		}
		else if(self.payeeTypes.WITHINUAECCARD== self.selectedPayeeType){

			
			if(self.payeeInitResponse.rakFindbankDetails[self.payeeModel.selectedBank]['bankRoutingNo'] == self.payeeTypes.AMEXCARD){
				event = 'onPayeeBeneficiaryOtherBankAddPayeeClickAmex';
			}
			else if(self.payeeModel.isAccIbanFlag){
				event = 'onPayeeFinanceBenefAddPayeeClick';
				rootScope.rak2FARegister.RegistrationModel.resolveEventFor2FA('BENF_ADD_CARD');
			}
			else{

			event = 'onPayeeBeneficiaryOtherBankAddPayeeClick';
			//Page Level Entries
			//rootScope.rak2FARegister.RegistrationModel.resolveEventFor2FA('BENF_ADD');
			}
			self.bankbnftype=self.payeeTypes.WITHINUAECCARD;
//			self.payeeModel.selectedBank=self.payeeInitResponse.rakFindbankDetails[self.payeeModel.selectedBank]['bankName'];
			if(self.payeeModel.selectedBank){
				self.payeeModel.selectedBankDisplayName=self.payeeInitResponse.rakFindbankDetails[self.payeeModel.selectedBank]['bankName'];
			}

		}
		else if(self.payeeTypes.MCHQ == self.selectedPayeeType){
			event = 'onPayeeBeneficiaryDDAddPayeeClick';
			rootScope.rak2FARegister.RegistrationModel.resolveEventFor2FA('BENF_ADD_DD_MC');
			self.bankbnftype=self.payeeTypes.MCHQ;
		}
		else if(self.payeeTypes.OUTSIDEUAEBANK == self.selectedPayeeType){
			event = 'onPayeeBeneficiaryOtherBankOutAddPayeeClick';
			//Page Level Entries
			//rootScope.rak2FARegister.RegistrationModel.resolveEventFor2FA('BENF_ADD');
			self.bankbnftype=self.payeeTypes.OUTSIDEUAEBANK;
		}
		else if(self.payeeTypes.OUTSIDEUAECCARD == self.selectedPayeeType){
			event = 'onPayeeBeneficiaryOtherBankOutAddPayeeClick';
			//Page Level Entries
			//rootScope.rak2FARegister.RegistrationModel.resolveEventFor2FA('BENF_ADD');
			self.bankbnftype=self.payeeTypes.OUTSIDEUAECCARD;
		}
		else if(self.payeeTypes.DD == self.selectedPayeeType){
			event = 'onPayeeBeneficiaryDDAddPayeeClick';
			rootScope.rak2FARegister.RegistrationModel.resolveEventFor2FA('BENF_ADD_DD_MC');
			self.bankbnftype=self.payeeTypes.DD;
		}
		else if (self.payeeTypes.MOBCASH == self.selectedPayeeType){
			event = 'onPayeeBeneficiaryAddMobCashClick';
			rootScope.rak2FARegister.RegistrationModel.resolveEventFor2FA('BENF_ADD_MOB');
			self.bankbnftype=self.payeeTypes.MOBCASH;
		}
		else if (self.payeeTypes.PAYBILLS == self.selectedPayeeType){
			event = 'onPayeeAddBillerClick';
			rootScope.rak2FARegister.RegistrationModel.resolveEventFor2FA('BENF_ADD_BILLER');
			self.bankbnftype=self.payeeTypes.PAYBILLS;
		}
		else if (self.payeeTypes.CEBUANA == self.selectedPayeeType){
			event = 'onCebuanaPayeeBeneficiaryAddPayeeClick';
			rootScope.rak2FARegister.RegistrationModel.resolveEventFor2FA('BENF_ADD_FUND');
			self.bankbnftype=self.payeeTypes.CEBUANA;
		}
		/*else {
			event = 'onPayeeBeneficiaryOtherBankOutAddPayeeClick';
		}*/
		/*RAK:-Added and Modified for Biller-BNF link-end*/
		return event;
	};
	self.getAddPayeeAuthConfirmEventDetails = function(){
		var event = '';
		/*RAK:-Added and Modified for Biller-BNF link-start*/
		if(self.isEditBeneficiaryMode){
			if (self.payeeTypes.MOBCASH == self.selectedPayeeType||self.bankbnftype==self.payeeTypes.MOBCASH){
				event = 'onPayeeBeneficiaryMobCashModifyAuthConfirmClick';
			}
			else if(self.payeeTypes.PREPAIDCARD == self.selectedPayeeType||self.bankbnftype==self.payeeTypes.PREPAIDCARD){
				event ='onPayeeBeneficiaryPPCardModifyAuthConfirmClick';
			}
			else{
				event = 'onPayeeBeneficiaryModifyAuthConfirmClick';
			}

		}
		else if(self.isDeleteBeneficiaryMode){
			if (self.payeeTypes.MOBCASH == self.selectedPayeeType){
				event = 'onPayeeMobCashBeneficiaryDeleteAuthConfirmClick';
			}
			else if(self.payeeTypes.PREPAIDCARD == self.selectedPayeeType||self.bankbnftype==self.payeeTypes.PREPAIDCARD){
				event ='onPayeePPCardBeneficiaryDeleteAuthConfirmClick';
			}
			else{
				event = 'onPayeeBeneficiaryDeleteAuthConfirmClick';
			}

		}
		else if(self.payeeTypes.RAKBANK == self.selectedPayeeType){
			event = 'onPayeeBeneficiaryAuthConfirmClick';
			self.bankbnftype=self.payeeTypes.RAKBANK;
		}
		else if(self.payeeTypes.RAKCREDITCARD == self.selectedPayeeType){
			event = 'onPayeeBeneficiaryAuthConfirmClick';
			self.bankbnftype=self.payeeTypes.RAKCREDITCARD;
		}
		else if(self.payeeTypes.PREPAIDCARD == self.selectedPayeeType && self.payeeModel.rAKConfirm==self.constants.CONFIRMNOW){
			event = 'onRakPayeePPCBeneficiaryAuthConfirmNowClick';
			self.bankbnftype=self.payeeTypes.PREPAIDCARD;
		}
		else if(self.payeeTypes.PREPAIDCARD == self.selectedPayeeType && self.payeeModel.rAKConfirm==self.constants.CONFIRMLATER){
			event = 'onRakPayeePPCBeneficiaryAuthConfirmLaterClick';
			self.bankbnftype=self.payeeTypes.PREPAIDCARD;
		}
		else if(self.isDeleteBeneficiaryMode){
			event = 'onPayeeBeneficiaryDeleteAuthConfirmClick';
			self.doShowAlertProxyFlag=true;
		}

		else if(self.payeeTypes.MOBCASH == self.selectedPayeeType && self.payeeModel.rAKConfirm==self.constants.CONFIRMNOW){
			event = 'onRakPayeeMobCashBeneficiaryAuthConfirmNowClick';
			self.bankbnftype=self.payeeTypes.MOBCASH;
		}
		else if(self.payeeTypes.MOBCASH == self.selectedPayeeType && self.payeeModel.rAKConfirm==self.constants.CONFIRMLATER){
			event = 'onRakPayeeMobCashBeneficiaryAuthConfirmLaterClick';
			self.bankbnftype=self.payeeTypes.MOBCASH;
		}
		else if(self.payeeTypes.WITHINUAEBANK == self.selectedPayeeType){
			event = 'onPayeeBeneficiaryOtherBankAuthConfirmClick';
			self.bankbnftype=self.payeeTypes.WITHINUAEBANK;
		}
		else if(self.payeeTypes.WITHINUAECCARD == self.selectedPayeeType){
			event = 'onPayeeBeneficiaryOtherBankAuthConfirmClick';
			self.bankbnftype=self.payeeTypes.WITHINUAECCARD;
		}
		else if(self.payeeTypes.OUTSIDEUAEBANK == self.selectedPayeeType){
			event = 'onPayeeBeneficiaryOtherBankOutAuthConfirmClick';
			self.bankbnftype=self.payeeTypes.OUTSIDEUAEBANK;
		}
		else if(self.payeeTypes.OUTSIDEUAECCARD == self.selectedPayeeType){
			event = 'onPayeeBeneficiaryOtherBankOutAuthConfirmClick';
			self.bankbnftype=self.payeeTypes.OUTSIDEUAECCARD;
		}
		else if(self.payeeTypes.DD == self.selectedPayeeType){
			event = 'onPayeeDDBeneficiaryAuthConfirmClick';
			self.bankbnftype=self.payeeTypes.DD;
		}
		else if(self.payeeTypes.MCHQ == self.selectedPayeeType){
			event = 'onPayeeDDBeneficiaryAuthConfirmClick';
			self.bankbnftype=self.payeeTypes.MCHQ;
		}
		else if (self.payeeTypes.CEBUANA == self.selectedPayeeType && self.payeeModel.confirmEvent==self.constants.CONFIRMNOW){
			event = 'onPayeeBeneficiaryAuthConfirmClick';
			self.bankbnftype=self.payeeTypes.CEBUANA;
		}

		else if (self.payeeTypes.CEBUANA == self.selectedPayeeType && self.payeeModel.confirmEvent==self.constants.CONFIRMLATER){
			event = 'onPayeeBeneficiaryAuthConfirmClick';
			self.bankbnftype=self.payeeTypes.CEBUANA;
		}
		/*else{
			event = 'onPayeeBeneficiaryOtherBankAuthConfirmClick';
			self.bankbnftype="UBF";
		}*/
		/*RAK:-Added and Modified for Biller-BNF link-end*/
		if(self.payeeModel.confirmEvent=='CL'){
			self.authMode.isFirstAuthMode = false;
			self.authMode.isSecAuthMode = false;
            rootScope.rakHome.AuthPageData.isFirstAuthMode =false;
		}

		return event;
	};
	self.searchIFSCLoad = function(bankDetails){
		self.bankDetails = bankDetails[0].bankDetails;
	};
	self.processPayeeSuccessResponse = function(responseList){

		/*RAK:2:-AddBnfFTSuccessPage-Start*/
		self.beneficiarySuccessDetails=responseList[0];
		/*RAK:2:-AddBnfFTSuccessPage-End*/
	};
	self.getPayeeInitForBeneficiaryDetails=function(responseList){

		self.beneficiaryDetails = responseList[0].beneficiaryDetails || self.beneficiaryDetails;
		self.payeeModel.selectedBank= self.beneficiaryDetails.beneficaryBankName;
		self.payeeModel.currency = self.payeeModel.currency || {};
		self.payeeModel.currency.currencyDesc = self.beneficiaryDetails.beneficaryAccountCurrency;
		self.payeeModel.selectedBeneficaryName= self.beneficiaryDetails.beneficaryName;
		self.payeeModel.selectedRoutingNumber= self.beneficiaryDetails.beneficarybranchIden;
	};
	self.processPayeeDeleteInitResponse=function(responseList){
		if (self.isDeleteBillerMode === true) {
			self.payeeModel.deleteConfirmationTitle = "Delete Biller ?";
		} else {
			self.payeeModel.deleteConfirmationTitle = "Delete Payee ?";
		}

	};
	self.isDeleteCompletionLoad = function(response){

		if(response.responsesList[0].deleteBeneficiaryResponse){

			if(self.doShowAlertProxyFlag){
				self.doShowAlertMessage = true;
				self.doShowAlertProxyFlag=false;
			}


//			scope.showAlert("The selected user has been deleted successfully!");
			self.resetPayeeModule();
			return true;
		}
		return false;
	};
	self.parseSelfHoldingAccounts = function(response){
		if(response){

			self.selfHoldingAccounts = response[0].fromAccountsList;
		}
	};
	self.loadPayeeList = function(successResponse){
		if(self.payeeTypes.BANK == self.selectedPayeeType){
			self.payeeModel.addBankBnfFlag=true;
		}
		else{
			self.payeeModel.addMobCashBnfFlag=true;
		}
		if(!successResponse.responsesList[0].hasOwnProperty('errorMessage') ){
			if(!self.common.fromAuthPage){
				if(self.payeeList.length === 0){
					self.payeeList = successResponse;
					self.ccBeneficiaryList = self.payeeList.responsesList[0].ccBeneficiaryList;
					self.billersList = self.payeeList.responsesList[0].billersList;
					self.beneficiaryList = self.payeeList.responsesList[0].beneficiaryList;
					self.mobCashBeneficiaryList = self.payeeList.responsesList[0].mobCashBeneficiaryList;
					self.ddmchqBeneficiaryList =self.payeeList.responsesList[0].ddmchqBeneficiaryList;
					/* XM Changes Start*/
					if(self.payeeList.responsesList[0].hasOwnProperty("benfRestCountryList")){
						self.benfRestCountryList=self.payeeList.responsesList[0].benfRestCountryList;
					}
					/* XM Changes End*/
		//			self.payeeList = successResponse.responsesList[0].billersList.concat(successResponse.responsesList[1].beneficiaryList);

				}
			}

			//Added for Cebuana
			self.payeeModel.cashPayOutPrpmValue = successResponse.responsesList[0].CashPayOutPrpmValue;
		}


	};
	// This method will prepare the parameters that can be used to submit
	// a request to the backend for the Auto Pay uses (both Add Biller and Edit Biller modes)
	self.prepareAutoPayParams = function() {
		self.billerModel.billerThresholdAmt = '' + self.billerModel.billerThresholdAmt;

		if (self.billerModel.autoPayStartDate !== '') {
			var startDate = new Date(self.billerModel.autoPayStartDate);

			var selectedAccount=self.billerModel.accountsList.filter(function(item){
				return (item.accountNumberUnMasked === self.billerModel.selectedAccountNickName);
			});

			self.billerModel.selectedCurrency =selectedAccount.length>0? selectedAccount[0].debitAccountCurrencyCode:'';
		}
	};
	self.revertValues = function()
	{
		if(!self.billerModel.autoPayStartDate instanceof Date){
			self.billerModel.autoPayStartDate=Date.parse(self.billerModel.autoPayStartDate);
		}
		self.billerModel.billerThresholdAmt=Math.floor(self.billerModel.billerThresholdAmt);
	}
	/*RAK:2:-SelfConfirmationListFetch-Payee-Start*/
	self.rakSelfConfirmationPayeeListFetch.model={
			nickName:"",
	        payeeId:"",
            accNum:"",
  		    selectedConfBiller:{},
  		    selectedConfBillerIndex:"",
  		    isAuthSet:false,
  		    authenticationPassword:"",
  		    authMode:"",
  		    successResponse:"",
  		    action:"",
  		    isAuthSet:false,
  		    remarks:"",
  		    smsOtp:"",
  		    txnType:"",
  		    bnfType:"",
  		    billerServiceType:"",
  		    bnfName:"",
	  		beneficiaryResidentCountryDisplay:"",
  		    bnfIfsc:"",
  		    bnfSwiftCode:"",
  		    bnfBankCode:"",
  		    bnfIntermedBank:"",
  		    bnfBankName:"",
  		    bnfBankCountry:"",
  		    bnfCity:"",
  		    bnfName:"",
  		    bnfBranchName:"",
  		    bnfTypeDesc:"",
  		    payeeType:"",
  		    labels:[]
  			  };

	self.rakSelfConfirmationPayeeListFetch.CONSTANTS={
			RAKCONFIRMPAYEE_BENF:"BNF",
			RAKCONFIRMPAYEE_CARDBENF:"CBF",
			RAKCONFIRMPAYEE_BILLER:"BIL",
			RAKCONFIRMPAYEE_PREPAIDCARDS:"PPC",
			RAKCONFIRMPAYEE_MOBILECASHBENF:"MCB",
			RAKCONFIRMPAYEE_MCHQBENF:"MCHQ",
			RAKCONFIRMPAYEE_DDBENF:"DD",
			RAKCONFIRMPAYEE_CASHBENF:"CASH Payout"


	};


	self.rakSelfConfirmationPayeeListFetch.parseRAKSlfCnfPayeeListFetchInit=function(responsesList){
		if(self.isUserNavigatingBack){
			self.isUserNavigatingBack = false;
			return;
		}
		 if(!responsesList[0].hasOwnProperty('errorMessage')){
				self.rakConfirmbillerList = responsesList[0].slfconfList;
				self.prpmCoolingPeriod=responsesList[0].prpmCoolingPeriod.split("|"); //Added for Cooling Period CR
				self.prpmCoolingPeriodAmount=responsesList[0].prpmCoolingPeriodAmount; //Added for Cooling Period CR
				self.isEligibleCoolingPeriodSmeSegment=responsesList[0].isEligibleCoolingPeriodSmeSegment; //Added for Cooling Period CR
		 }
	};

	self.rakSelfConfirmationPayeeListFetch.resetModel=function(){
		self.rakSelfConfirmationPayeeListFetch.model.nickName="";
	    self.rakSelfConfirmationPayeeListFetch.model.payeeId="";
     	self.rakSelfConfirmationPayeeListFetch.model.accNum="";
     	self.rakSelfConfirmationPayeeListFetch.model.selectedConfBiller={};
     	self.rakSelfConfirmationPayeeListFetch.model.selectedConfBillerIndex="";
     	self.rakSelfConfirmationPayeeListFetch.model.authenticationPassword="";
     	self.rakSelfConfirmationPayeeListFetch.model.smsOtp="";
     	self.rakSelfConfirmationPayeeListFetch.model.authMode="";
     	self.rakSelfConfirmationPayeeListFetch.model.successResponse="";
     	self.rakConfirmbillerList=[];
     	self.rakSelfConfirmationPayeeListFetch.model.isAuthSet=false;
     	self.rakSelfConfirmationPayeeListFetch.model.remarks="";
     	self.rakSelfConfirmationPayeeListFetch.model.txnType="";
       	self.rakSelfConfirmationPayeeListFetch.model.bnfType="";
       	self.rakSelfConfirmationPayeeListFetch.model.bnfTypeDesc="";
       	self.rakSelfConfirmationPayeeListFetch.model.billerServiceType="";
       	self.rakSelfConfirmationPayeeListFetch.model.bnfName="";
       	self.rakSelfConfirmationPayeeListFetch.model.beneficiaryResidentCountryDisplay="";
       	self.rakSelfConfirmationPayeeListFetch.model.bnfIfsc="";
       	self.rakSelfConfirmationPayeeListFetch.model.bnfSwiftCode="";
       	self.rakSelfConfirmationPayeeListFetch.model.bnfBankCode="";
       	self.rakSelfConfirmationPayeeListFetch.model.bnfIntermedBank="";
       	self.rakSelfConfirmationPayeeListFetch.model.bnfBankName="";
       	self.rakSelfConfirmationPayeeListFetch.model.bnfBankCountry="";
       	self.rakSelfConfirmationPayeeListFetch.model.bnfCity="";
       	self.rakSelfConfirmationPayeeListFetch.model.bnfName="";
       	self.rakSelfConfirmationPayeeListFetch.model.bnfBranchName="";
      	self.rakSelfConfirmationPayeeListFetch.model.payeeType="";
      	self.rakSelfConfirmationPayeeListFetch.model.labels=[];

       	self.authMode.clearAuthMode();
     };

     self.rakSelfConfirmationPayeeListFetch.getAction=function(flag){
    	 if(flag==1){
    		 self.rakSelfConfirmationPayeeListFetch.model.action=self.constants.SUBMIT;
    	 }
    	 else{
    		 self.rakSelfConfirmationPayeeListFetch.model.action=self.constants.REJECT;
    	 }

     };
     self.rakSelfConfirmationPayeeListFetch.getEvent=function(){
    	 var event = '';
         if(rootScope.rakHome.AuthPageData.authType==rootScope.rakHome.AuthPageData.SoftToken){
             rootScope.rakHome.AuthPageData.firstAuthModeValue= rootScope.rakHome.AuthPageData.firstAuthModeValuePIN;

         }
        
    		if(self.rakSelfConfirmationPayeeListFetch.model.action==self.constants.SUBMIT){
    			event = 'onRakSlfConfSubmitClick';
    		}
    		else if(self.rakSelfConfirmationPayeeListFetch.model.action==self.constants.REJECT) {
    			event = 'onRakSlfConfRejectClick';
    		}


    	 return event;
     };
     /*Preview*/
     self.rakSelfConfirmationPayeeListFetch.processResponseAuth=function(responsesList){
    	 if(!responsesList[0].hasOwnProperty('errorMessage')  && !responsesList[0].hasOwnProperty('ResendMode')){
    		self.rakSelfConfirmationPayeeListFetch.model.payeeId=responsesList[0].selfConfPayeeDetails.payeeListId;
    	    self.rakSelfConfirmationPayeeListFetch.model.accNum=responsesList[0].selfConfPayeeDetails.bnfAccountNumber;
         	self.rakSelfConfirmationPayeeListFetch.model.nickName=responsesList[0].selfConfPayeeDetails.cpNickName;
         	self.rakSelfConfirmationPayeeListFetch.model.bnfTypeDesc=responsesList[0].selfConfPayeeDetails.flag;
         	self.rakSelfConfirmationPayeeListFetch.model.bnfType=responsesList[0].selfConfPayeeDetails.bnfType;
         	self.rakSelfConfirmationPayeeListFetch.model.billerServiceType=responsesList[0].selfConfPayeeDetails.bnfType;
           	self.rakSelfConfirmationPayeeListFetch.model.bnfName=responsesList[0].selfConfPayeeDetails.bnfName;
        	if(responsesList[0].selfConfPayeeDetails.hasOwnProperty('beneficiaryResidentCountryDisplay')){
        	self.rakSelfConfirmationPayeeListFetch.model.beneficiaryResidentCountryDisplay=responsesList[0].selfConfPayeeDetails.beneficiaryResidentCountryDisplay;
        	}
           	self.rakSelfConfirmationPayeeListFetch.model.bnfIfsc=responsesList[0].selfConfPayeeDetails.bnfIfsc;
           	self.rakSelfConfirmationPayeeListFetch.model.bnfSwiftCode=responsesList[0].selfConfPayeeDetails.bnfSwiftCode;
           	self.rakSelfConfirmationPayeeListFetch.model.bnfBankCode=responsesList[0].selfConfPayeeDetails.bnfBankCode;
           	self.rakSelfConfirmationPayeeListFetch.model.bnfIntermedBank=responsesList[0].selfConfPayeeDetails.bnfIntermedBank;
           	self.rakSelfConfirmationPayeeListFetch.model.bnfBankName=responsesList[0].selfConfPayeeDetails.bnfBankName;
           	self.rakSelfConfirmationPayeeListFetch.model.bnfBankCountry=responsesList[0].selfConfPayeeDetails.bnfBankCountry;
           	self.rakSelfConfirmationPayeeListFetch.model.bnfCity=responsesList[0].selfConfPayeeDetails.bnfCity;
           	self.rakSelfConfirmationPayeeListFetch.model.bnfBranchName=responsesList[0].selfConfPayeeDetails.bnfBranchName;
        	self.rakSelfConfirmationPayeeListFetch.model.payeeType=responsesList[0].selfConfPayeeDetails.payeeType;


         	if(responsesList[0].auth == self.constants.TRANSACTIONPASSWORD||responsesList[0].auth == self.constants.TRANSACTIOPASSWORDSMSOTP||responsesList[0].auth == self.constants.SMSOTP){//RAK:2:- Auth mode changes-added
    			self.payeeModel.isAuthSet = true;
    			switch(responsesList[0].auth){
    			case self.constants.TRANSACTIONPASSWORD:
					 self.authMode.authType=self.authMode.TransactionPassword;
					 self.authMode.isFirstAuthMode=true;
					 break;
				 case self.constants.TRANSACTIOPASSWORDSMSOTP:
					 self.authMode.authType=self.authMode.TransactionPassword;
					 self.authMode.secAuthType=self.authMode.OTP;
					 self.authMode.isFirstAuthMode=true;
					 self.authMode.isSecAuthMode=true;
					 break;
				 case self.constants.SMSOTP:
					 self.authMode.authType=self.authMode.OTP;
					 self.authMode.isFirstAuthMode=true;
					 break;
				 default:
					 self.authMode.authType=self.authMode.None;
				     self.authMode.secAuthType=self.authMode.None;
					 break;
			 }
         	}
         	else{
    			self.payeeModel.isAuthSet = false;
    		}
         	self.rakSelfConfirmationPayeeListFetch.model.authMode=responsesList[0].auth;

         	for (var delIndex = 0; delIndex < responsesList[0].selfConfPayeeDetails.payeeFormat.split('@').length; delIndex++) {
         		var labels = responsesList[0].selfConfPayeeDetails.payeeFormat.split('@');
				var displayFields = {};
				displayFields.label = labels[delIndex].split('^')[0];
				displayFields.value = labels[delIndex].split('^')[1];
				self.rakSelfConfirmationPayeeListFetch.model.labels.push(displayFields);
			}
    	 }
     };
     /*Submit*/
     self.rakSelfConfirmationPayeeListFetch.proceedResponse=function(responsesList){
    	 self.rakSelfConfirmationPayeeListFetch.model.successResponse = responsesList[0].RAKSlfCnfPayeeResponse;

  };

  self.rakSelfConfirmationPayeeListFetch.clearLabels=function(){
	  self.rakSelfConfirmationPayeeListFetch.model.labels=[];

};
	/*RAK:2:-SelfConfirmationListFetch-Payee-End*/
  /*RAK:2:-IFSC Search page-Start*/
  self.onRakIFSCSearchBackClickEvent=function(){
	  var event = '';
		if (self.payeeTypes.OUTSIDEUAEBANK == self.selectedPayeeType){
			event = 'onIFSCSearchBackClick';
		}
		else if (self.payeeTypes.DD == self.selectedPayeeType||self.payeeTypes.MCHQ == self.selectedPayeeType){
			event = 'onRakIFSCDDMCSearchBackClick';
		}
		else if (self.payeeTypes.OUTSIDEUAECCARD == self.selectedPayeeType){
			event = 'onRakIFSCCCSearchBackClick';
		}
		else {
			event = 'onIFSCSearchBackClick';
		}
		return event;

  };
  self.getRakSearchEvent = function(){
		var event = '';
		if (self.payeeTypes.OUTSIDEUAEBANK == self.selectedPayeeType){
			event = 'onIFSCSearchItemSelected';
		}
		else if (self.payeeTypes.DD == self.selectedPayeeType||self.payeeTypes.MCHQ == self.selectedPayeeType){
			event = 'onRakDMIFSCSearchItemSelected';
		}
		else if (self.payeeTypes.OUTSIDEUAECCARD == self.selectedPayeeType){
			event = 'onRakCCIFSCSearchItemSelected';
		}
		else {
			event = 'onIFSCSearchItemSelected';
		}
		return event;
	};
  /*RAK:2:-IFSC Search page-End*/
	/*RAK:2:-AddBnfPage-GetPayeeFTEvent-Start*/
	self.addBnfEvent=function(payeeType){
		var event='';
   	 if(payeeType==self.payeeTypes.MOBCASH){
   		 self.selectedPayeeType=self.payeeTypes.MOBCASH;
   		 event='onPopoverAddBeneficiaryMobCashClick';
   	 }
   	 else if(payeeType==self.payeeTypes.DD||payeeType==self.payeeTypes.MCHQ){
  		 event='onPopoverAddDDMCBeneficiaryClick';
   	 }
   	 else{
//   		 self.selectedPayeeType=self.payeeTypes.BANK;//-TEST-UNCOMMENT
   		self.selectedPayeeType="";//-TEST-DELETE
   		 event='onPopoverAddBeneficiarySameBankClick';

   	 }
   	 return event;
};
    /*RAK:2:-AddBnfPage-GetPayeeFTEvent-end*/

   /*RAK:2:-For Outside UAE Bank BNF-Start*/
self.checkCountry=function(country){
	if(country !="" && country !=null){
		if(country==self.constants.IN){
			self.payeeModel.isIndiaFlg=true;
		}
	}

};
      /*RAK:2:-For Outside UAE Bank BNF-End*/
     /*RAK:2:-BNFEdit-Start*/
     self.getEditBnfDetails=function(){
		 self.payeeList = successResponse.responsesList[0].beneficiaryList;
		 self.payeeModel.name=self.payeeList.responsesList[0].beneficiaryList[self.selectedPayeeIndex]['beneficiaryName'].toString();
    	 self.payeeModel.nickName=self.payeeList.responsesList[0].beneficiaryList[self.selectedPayeeIndex]['beneficiaryNickname'].toString();
    	 self.payeeModel.accountNumber=self.payeeList.responsesList[0].beneficiaryList[self.selectedPayeeIndex]['beneficiaryAccountNumber'].toString();

     };
     /*RAK:2:-BNFEdit-End*/
     /*RAK:2:-CardOnchange-End*/
     self.isFinancialInstitution=function(){

    	 self.payeeModel.accountNumber='';
    	 self.payeeModel.isAccIban=self.payeeInitResponse.rakFindbankDetails[self.payeeModel.selectedBank]['bankFinInstFlag'];
    	 self.payeeModel.selectedRoutingNumber=self.payeeInitResponse.rakFindbankDetails[self.payeeModel.selectedBank]['bankRoutingNo'];
    	if(self.payeeModel.isAccIban==self.constants.YES){
    		self.payeeModel.isAccIban=self.constants.IBAN;
    		self.payeeModel.isAccIbanFlag=true;
    	}
    	else{
    	self.payeeModel.isAccIban=self.constants.NO;
    	self.payeeModel.isAccIbanFlag=false;
    	}
     };
     /*RAK:2:-CardOnchange-Start*/

     self.common = {
    		    initDate:new Date(),
    			fromAuthPage : false,
    			flag:false,
    			displayDate:new Date(),
    			date:null,
				month:null,
				year:null,
				dd: new Date(),
				message:'',
	    		 availBal:"",
	    		 secAuthValue:'',
	    		 nextApprover:'',
	    		 securityAnswer:'',

	    		 clearBalance : function() {
	    			 self.common.availBal='';
	    		 },

	    			updateBal:function(eventName)
	    		      {


	    				ActionProcessor.setEvent(eventName).then(function(payload) {
	    					console.log("Update Balance");
	    					//console.log(JSON.stringify(payload));
	    					var response=payload;
	    					self.common.availBal=response.responsesList[0].accountAvailableBalance;

	    					if(response.responsesList[0].combinedLimit == 'Y')
	    						self.quickPay.ccCombinedLimitFlag = true;
	    					else
	    						self.quickPay.ccCombinedLimitFlag = false;

							console.log("self.quickPay.ccCombinedLimitFlag ===> "+self.quickPay.ccCombinedLimitFlag);


	    					
	    					if(self.schedule.btnSelected !='SENDAGAIN' && self.schedule.schTxnListSubmitBtn!='MODIFY'){
	    						if(self.payeeSelected.serviceType!=self.constants.RAKTOLLTOPUP){
	    							self.payBill.updateChargesQuickPay();
	    						}
	    						else{
	    							self.payBill.updateCharges();
	    						}
	    					}
	    					else if(self.schedule.schTxnListSubmitBtn=='MODIFY'){
	    						self.payBill.updateChargesSendAgain();
	    					}
	    					else{
	    						if(self.schedule.service==self.constants.RAKTOLLTOPUP){
	    								self.payBill.updateChargesSendAgain();
	    						}
	    						else{
	    							self.payBill.updateChargesQuickPaySendAgain();
	    						}
	    					}
	    					
	    					//scope.$apply();
	    					
	    				},function(errorPayload){
	    					self.common.availBal='';
	    				});
	     }

    		};

     self.utils={
    	populateCurrentDateDetails:function(){

			if(self.common.displayDate !="" && self.common.displayDate !=null){
				var date=self.common.displayDate.getDate().toString();
				var currMonth = self.common.displayDate.getMonth() + 1;
				var month=currMonth.toString();
				var year=self.common.displayDate.getFullYear().toString();
				self.common.date =date;
				self.common.month=month;
				self.common.year=year;
			}
		},
		 getIndexfromArray:function(key,array){
			    for(var i=0, j=array.length; i<j; i++) {
			        if(array[i].value==key) {
			        	if(array[i].index){
			        		return array[i].index;
			        	}
			            return i;
			        }
			    }
			    return -1;
		   },
		   setFormatedDate : function( unformatedDate ) {

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

				var formatDate = mm + '-' + dd + '-' + yyyy;

		        return formatDate;

		    },
		 setCurrentDate : function() {
		    	var today =new Date();
		        self.common.initDate =today;
		    },
		    sortBillerNameList : function(billerList,orderList){
	        	 
	        	var billerListWithOrder = _.map(billerList,function(item){

	        		    var orderObj =   _.find(orderList,function(obj){

	        		                    return obj.value==item.billerName;
	        		         }) || {};
	        		    item.position = orderObj.content || "0";
	        		    return item;
	        		}) || billerList;
	        	
	        	return _.sortBy(billerListWithOrder,function(biller){
	        		return Number(biller.position || 0);
	        	});
	        	 
	        },
     }

     self.clearTab=function()
 	{
    	self.quickPayTab=false;
 		self.billsTab=false;
 		self.billHistoryTab=false;
 		self.cardHistoryTab=false;
 		self.cardsTab=false;
 		self.outstandingTab=false;
 		self.confirmPayeeTab=false;//added-confirmpayee

 	}

     self.payBill={
    		 	successMessage:"",
    		 	recFrequencySelected:false,
    		 	billerType:"N",
    		 	amountToBeEntered:false,
    		 	recFreq:"",
    		 	txnPwd:"",
    		 	authFlag:"",
    		 	minAmount:"",
    		 	maxAmount:"",
    		 	outAmount:"",
    		 	outAmountValue:"",//Outstd Amt change in paybill
    		 	outAmountRadioDisableFlag:false,//Outstd Amt change in paybill
    		 	selectedPayee:"",
    		 	selectedFromAccount:"",
    			selectedToAccount:"",
    			selectedToBenAccount:"",
    			fromAccounts:[],
    			currencyList:[],
    			selectedCurrency:"",
    			frequencyType:[],
    			selectedFrequency:"",
    			amount:"",
    			noOfTransfer:"",
    			authStatus:false,
    			authFlag:"",
    			billerTypeList:[],
    			billerOrderList:[],
    			searchFromDate : new Date(),
	       		searchToDate : new Date(),
	       		fromSearchResult : false,
	       		searchFromDate_year:"",
	       		searchFromDate_month:"",
	       		searchFromDate_day:"",
	       		searchToDate_year:"",
	       		searchToDate_month:"",
	       		searchToDate_day:"",
	       		amountSelectionRqd:false,
	       		amountDisp:"",
	       		availBal:"",
	       		billerTxnTypeList:[],
	       		amountType:"2",
	       		selectedBillerType:self.constants.ALL,
	       		displayDate:"",
	       		poolBalMsg:"",
	       		balCheck:"false",
	       		/*RAK:2:-MultiplePay-Start*/
	       		checkBoxStatus:false,
	    		checkBoxForAmount:[],
	       		multipleTotalSelectedAmount:0.00,
	       		outStandingAmtList:[],
	       		selectedOutStandingAmtList:[],
	       		selectedOutStandingAmtListForSubmit:[],
	       		outStandingAmtMsg:"",
	       		homeCurCode:"",
	       		accountList:[],
	       		multiplePayFromAcct:"",
	       		multiplePayFromAcctDisplayName:"",
	       		fromAccSubmit:"",
	       		multiplePayFromAcctAvlBal:"",
	       		selectedMultipleBills:[],
	       		selectedMultipleBillsJson:"",
	       		multiplePayIndex:0,
	       		multiplePayUpdateIndex:0,
	       		multiplePayDate:"",
	       		getMultipleUpdateAmount:{},
	       		multipleSuccessMsg:"",
	       		isBackfromInitPage:false,
	       		isBackfromConfirmPage:false,
	       		outStandingAmountInfirstpage:0.00,
	       		outStandingAmountInfirstpageWRO:0.00,
	       		outStandingAmountInfirstpageDisplay:'0.00',
	       		outStandingAmountInfirstpageDisplayNotRoundOff:'0.00',
	       		/*RAK:2:-MultiplePay-End*/
	       		accountNumber:'',
	       		when:'',
	       		frequency:'',
	       		showFlag:false,
	       		editIconFlag:false,
	       		fromOutStandingPage:false,
	       		/*RAK:2:-MultiplePay-start*/
	       		//RAK DEV CHANGES AS FIX FOR PROUAT-1482 START
	       		fromUpdateBtn:false,
	       	    //RAK DEV CHANGES AS FIX FOR PROUAT-1482 END

	       		//added for display flag chk

	       		outStandingAmtFlag:'',
				minMaxAmtFlag:'',
				availableAmtFlag:'',
				availableAmtFlag:'',
				amtDueFlag:'',
				outDisableFlag:'',
				renewalAmt:'',
			   availBillAmt:'',
			   totalOutStandingServer:'',
			   totalOutStandingServerWithoutRoundOff:'',
			   payAgainFromHistoryBack:false,
			   displayOutAmt:'',
			   nextApprover:'',
			   editMultiBillFlag:false,
			   freeBalAmt:'', //Added for RAKToll CR
			   RAKBILLER:'', //Added for RAKToll CR
			   chargesRakToll:'',//Added for RAKToll CR
			   amountChargesRadio:'Y',//Added for RAKToll CR
			   topUpAmount:'',//Added for RAKToll CR
			   totalAmount:'',//Added for RAKToll CR
			   chargesFlag:'N',//Added for RAKToll CR
			   amountRakToll:'', //Added for RAKToll CR
			   chargesFlagBoolean:false, //Added for RAKToll CR
			   
			   //Added for Rak Toll CR Function Start
			   updateCharges:function(){
				   if(self.payeeSelected.serviceType==self.constants.RAKTOLLTOPUP && self.payBill.amount && self.payBill.selectedFromAccount){
					   ActionProcessor.setEvent('onRakTollChargesCalc').then(function(payload) {
	    					console.log("Update Balance");
	    					console.log("Update Balance" + JSON.stringify(payload));
	    					var response=payload;
	    					if(!response.responsesList[0].hasOwnProperty('errorMessage')){
		    					self.payBill.chargesRakToll=response.responsesList[0].chargesAmount;
		    					self.payBill.topUpAmount= response.responsesList[0].topUpAmount;
		    					self.payBill.totalAmount= response.responsesList[0].totalAmount;
		    					self.payBill.amountRakToll= response.responsesList[0].AMOUNT;
		    					self.payBill.chargesFlag="Y";
		    					self.payBill.chargesFlagBoolean=true;
					   		}
	    					else{
 	    						self.payBill.chargesFlag="N";
	 	    					self.payBill.chargesFlagBoolean=false;
 	    					}
	    				},function(errorPayload){
	    					self.common.availBal='';
	    				});
				   }
				   else{
					   self.payBill.chargesFlag="N"
				   }
			   },
			   
			   
			   updateChargesQuickPay:function(){
				   if(self.quickPay.billerList[self.quickPay.selectedBiller].billerName==self.constants.RAKTOLL && self.quickPay.amount && self.quickPay.selectedFromAccount){
					   self.quickPay.serviceType=self.constants.RAKTOLLTOPUP;
					   ActionProcessor.setEvent('onRakTollChargesCalc').then(function(payload) {
	    					console.log("Update Balance");
	    					console.log("Update Balance" + JSON.stringify(payload));
	    					var response=payload;
	    					if(!response.responsesList[0].hasOwnProperty('errorMessage')){
		    					self.payBill.chargesRakToll=response.responsesList[0].chargesAmount;
		    					self.payBill.topUpAmount= response.responsesList[0].topUpAmount;
		    					self.payBill.totalAmount= response.responsesList[0].totalAmount;
		    					self.payBill.amountRakToll= response.responsesList[0].AMOUNT;
		    					self.payBill.chargesFlag="Y";
		    					self.payBill.chargesFlagBoolean=true;
	    					}
	    					else{
 	    						self.payBill.chargesFlag="N";
	 	    					self.payBill.chargesFlagBoolean=false;
 	    					}
	    				},function(errorPayload){
	    					self.common.availBal='';
	    				});
				   }
				   else{
					   self.payBill.chargesFlag="N"
				   }
			   },
			   
			   updateChargesQuickPaySendAgain:function(){
				   if(self.quickPay.billerList[self.quickPay.selectedBiller].billerName==self.constants.RAKTOLL && self.quickPay.amount && self.quickPay.selectedFromAccount){
 					   self.quickPay.serviceType=self.constants.RAKTOLLTOPUP;
 					   ActionProcessor.setEvent('onRakTollChargesCalc').then(function(payload) {
 	    					console.log("Update Balance");
 	    					console.log("Update Balance" + JSON.stringify(payload));
 	    					var response=payload;
 	    					if(!response.responsesList[0].hasOwnProperty('errorMessage')){
	 	    					self.payBill.chargesRakToll=response.responsesList[0].chargesAmount;
	 	    					self.payBill.topUpAmount= response.responsesList[0].topUpAmount;
	 	    					self.payBill.totalAmount= response.responsesList[0].totalAmount;
	 	    					self.payBill.amountRakToll= response.responsesList[0].AMOUNT;
	 	    					self.payBill.chargesFlag="Y";
	 	    					self.payBill.chargesFlagBoolean=true;
 	    					}
 	    					else{
 	    						self.payBill.chargesFlag="N";
	 	    					self.payBill.chargesFlagBoolean=false;
 	    					}
 	    				},function(errorPayload){
 	    					self.common.availBal='';
 	    				});
 				   }
 				   else{
 					  self.payBill.chargesFlag="N"
 				   }
			   },
			   
			   updateChargesSendAgain:function(){
				   if(self.schedule.service==self.constants.RAKTOLLTOPUP && self.schedule.amount && self.schedule.selectedFromAccount){
					   ActionProcessor.setEvent('onRakTollChargesCalc').then(function(payload) {
	    					console.log("Update Balance");
	    					console.log("Update Balance" + JSON.stringify(payload));
	    					var response=payload;
	    					if(!response.responsesList[0].hasOwnProperty('errorMessage')){
		    					self.payBill.chargesRakToll=response.responsesList[0].chargesAmount;
		    					self.payBill.topUpAmount= response.responsesList[0].topUpAmount;
		    					self.payBill.totalAmount= response.responsesList[0].totalAmount;
		    					self.payBill.amountRakToll= response.responsesList[0].AMOUNT;
		    					self.payBill.chargesFlag="Y";
		    					self.payBill.chargesFlagBoolean=true;
	    					}
	    					else{
 	    						self.payBill.chargesFlag="N";
	 	    					self.payBill.chargesFlagBoolean=false;
 	    					}
	    				},function(errorPayload){
	    					self.common.availBal='';
	    				});
				   }
				   else{
					   self.payBill.chargesFlag="N"
				   }
			   },
			   
			 //Added for Rak Toll CR Function Start

	       	initMultiplePayFetchOutStandingAmt:function(successResponse){
	       		if(!successResponse.responsesList[0].hasOwnProperty('errorMessage') && self.payBill.isBackfromInitPage!=true){

	       			if (successResponse.responsesList[0].hasOwnProperty("outStandingAmountList")) {
	       				self.payBill.outStandingAmtList = successResponse.responsesList[0].outStandingAmountList;
	       			}
	       			if (successResponse.responsesList[0].hasOwnProperty("outstandingMsg")) {
	       				self.payBill.outStandingAmtMsg = successResponse.responsesList[0].outstandingMsg;
	       			}
	       			if (successResponse.responsesList[0].hasOwnProperty("homeCurCode")) {
	       				self.payBill.homeCurCode = successResponse.responsesList[0].homeCurCode;
	       			}
	       			if (successResponse.responsesList[0].hasOwnProperty("totalOutstandingAmount")) {
	       				self.payBill.outStandingAmountInfirstpageDisplay=successResponse.responsesList[0].totalOutstandingAmount;

	       				var amt = parseFloat(successResponse.responsesList[0].totalOutstandingAmount);
	       				self.payBill.totalOutStandingServer = Math.ceil(parseFloat(amt.toFixed(2))).toLocaleString("en-US");
	       				self.payBill.totalOutStandingServerWithoutRoundOff =amt.toFixed(2).toLocaleString("en-US");
	       			}

	       			if (successResponse.responsesList[0].hasOwnProperty("totalOutstandingAmountWithoutRoundOff")) {
	       				self.payBill.outStandingAmountInfirstpageDisplayNotRoundOff=successResponse.responsesList[0].totalOutstandingAmountWithoutRoundOff;
	       				//var amt = parseFloat(successResponse.responsesList[0].totalOutstandingAmountWithoutRoundOff);
	       				//self.payBill.totalOutStandingServerWithoutRoundOff =amt.toFixed(2).toLocaleString();
	       				self.payBill.totalOutStandingServerWithoutRoundOff = Number(self.payBill.outStandingAmountInfirstpageDisplayNotRoundOff).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2});
	       			}

	       			self.payBill.outStandingAmountInfirstpage=0.00;
	       			self.payBill.outStandingAmountInfirstpageWRO=0.00;
	       			self.payBill.multipleTotalSelectedAmount=0.00;
	       			self.payBill.outStandingAmountInfirstpageDisplay='0.00';
	       			self.payBill.outStandingAmountInfirstpageDisplayNotRoundOff='0.00';
	       			self.payBill.selectedOutStandingAmtList=[];
	       		}

	       	},
	       	getMultiplePayAmount:function(index){


	       		self.payBill.outStandingAmountInfirstpageDisplay='0.00';
	       		self.payBill.outStandingAmountInfirstpageDisplayNotRoundOff='0.00';
	       		if(self.payBill.outStandingAmtList[index]['checkedFlag']){
	       			//self.payBill.outStandingAmtList[index]['checkedFlag']=!self.payBill.outStandingAmtList[index]['checkedFlag'];
	       			if(self.payBill.outStandingAmtList[index]['outStandingAmount']){
	       				//self.payBill.multipleTotalSelectedAmount=self.payBill.multipleTotalSelectedAmount+parseFloat(self.payBill.outStandingAmtList[index]['outStandingAmount']);


	       				self.payBill.selectedMultipleBills=[];
	 					self.payBill.selectedOutStandingAmtList=[];
	 					self.payBill.outStandingAmountInfirstpage=0.00;
	 					self.payBill.outStandingAmountInfirstpageWRO=0.00;
	 					for(var temp in self.payBill.outStandingAmtList){
	 						var biller = {};
	 			       		var billerList = {};
	 			       		billerList.index=temp;
	 						billerList.outAmount=Number(self.payBill.outStandingAmtList[temp].outStandingAmountWithoutRoundOff).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2});
		 					billerList.serviceType=self.payBill.outStandingAmtList[temp].serviceType;
		 					billerList.serviceTypeDesc=self.payBill.outStandingAmtList[temp].serviceTypeDesc;
		 					billerList.currency=self.payBill.outStandingAmtList[temp].currency;
		 					billerList.conCode=self.payBill.outStandingAmtList[temp].tempConsumerCode;
		 					// Added for single bill pmt
		 					billerList.payeeListId=self.payBill.outStandingAmtList[temp].payeeListId;
		 					billerList.billerName=self.payBill.outStandingAmtList[temp].billerName;
		 					billerList.consumerCode=billerList.serviceType+'|'+billerList.conCode;
		 					billerList.billerNickName=self.payBill.outStandingAmtList[temp].billerNickName;
		 					biller.amount = self.payBill.outStandingAmtList[temp].outStandingAmount;
		 					biller.index  = self.payBill.outStandingAmtList[temp].index;
	 						if(self.payBill.outStandingAmtList[temp]['checkedFlag']){
	 							self.payBill.outStandingAmountInfirstpage=self.payBill.outStandingAmountInfirstpage+parseFloat(self.payBill.outStandingAmtList[temp]['outStandingAmount'].replace(',','').replace(',',''));
	 							self.payBill.outStandingAmountInfirstpageWRO=self.payBill.outStandingAmountInfirstpageWRO+parseFloat(self.payBill.outStandingAmtList[temp]['outStandingAmountWithoutRoundOff'].replace(',','').replace(',',''));

	 							self.payBill.selectedOutStandingAmtList.push(billerList);
	 							self.payBill.selectedMultipleBills.push(biller);
	 						}
	 					}


	       			}

	       		}
	       		else{
	       			//self.payBill.outStandingAmtList[index]['checkedFlag']=!self.payBill.outStandingAmtList[index]['checkedFlag'];
	       			if(self.payBill.outStandingAmtList[index]['outStandingAmount']){
	       			//self.payBill.multipleTotalSelectedAmount=self.payBill.multipleTotalSelectedAmount-parseFloat(self.payBill.outStandingAmtList[index]['outStandingAmount']);
	       				self.payBill.outStandingAmountInfirstpage=self.payBill.outStandingAmountInfirstpage-parseFloat(self.payBill.outStandingAmtList[index]['outStandingAmount'].replace(',','').replace(',',''));
	       				self.payBill.outStandingAmountInfirstpageWRO=self.payBill.outStandingAmountInfirstpageWRO-parseFloat(self.payBill.outStandingAmtList[index]['outStandingAmountWithoutRoundOff'].replace(',','').replace(',',''));
	       				var biller = {};
 			       		var billerList = {};
	       				billerList.outAmount=self.payBill.outStandingAmtList[index].outStandingAmount;
	 					billerList.serviceType=self.payBill.outStandingAmtList[index].serviceType;
	 					billerList.currency=self.payBill.outStandingAmtList[index].currency;
	 					billerList.conCode=self.payBill.outStandingAmtList[index].tempConsumerCode;
	 					biller.amount = self.payBill.outStandingAmtList[index].outStandingAmount;
	 					biller.index  = self.payBill.outStandingAmtList[index].index;
	       				/*var spliceIndex=self.payBill.selectedOutStandingAmtList[index].index;*/
	       				// To handle the array index positioning as splice was not working
	       				/*self.payBill.selectedOutStandingAmtList.shift();*/
	       				//self.payBill.selectedMultipleBills.pop(biller);
	 					//self.payBill.selectedOutStandingAmtList.pop(billerList);

	 					//self.payBill.selectedMultipleBills.splice(index,1);
	       				//self.payBill.selectedOutStandingAmtList.splice(index,1);


	 					for(var temp in self.payBill.selectedOutStandingAmtList){
	 						 if(self.payBill.selectedOutStandingAmtList[temp]['index']==index){
	 						    self.payBill.selectedOutStandingAmtList.splice(temp,1);
	 						    self.payBill.selectedMultipleBills.splice(temp,1);
	 						 }
	 						}
	 					console.log(self.payBill.selectedOutStandingAmtList.length);
	       			}
	       		}
	       		self.payBill.outStandingAmountInfirstpageDisplay=parseFloat(self.payBill.outStandingAmountInfirstpage.toFixed(2)).toLocaleString("en-US");
	       		self.payBill.outStandingAmountInfirstpageDisplayNotRoundOff=self.payBill.outStandingAmountInfirstpageWRO.toFixed(2).toLocaleString("en-US");
	       		self.payBill.selectedMultipleBillsJson=JSON.stringify(self.payBill.selectedMultipleBills);

	       	},
	       	getMultiplePayAllAmount:function(){
	       		//self.payBill.multipleTotalSelectedAmount=0.00;
	       		self.payBill.outStandingAmountInfirstpage=0.00;
	       		self.payBill.outStandingAmountInfirstpageWRO=0.00;
	       		self.payBill.outStandingAmountInfirstpageDisplay='0.00';
	       		self.payBill.outStandingAmountInfirstpageDisplayNotRoundOff='0.00';
	       		for(var i=0;i < self.payBill.outStandingAmtList.length;i++){
	       			var biller = {};
	       			var billerList = {};
	       			if(self.payBill.outStandingAmtList[i]['outStandingAmount']!=""){
	       				self.payBill.outStandingAmountInfirstpage=self.payBill.outStandingAmountInfirstpage+parseFloat(self.payBill.outStandingAmtList[i]['outStandingAmount'].replace(',','').replace(',',''));
	       				self.payBill.outStandingAmountInfirstpageWRO=self.payBill.outStandingAmountInfirstpageWRO+parseFloat(self.payBill.outStandingAmtList[i]['outStandingAmountWithoutRoundOff'].replace(',','').replace(',',''));
	       				//self.payBill.multipleTotalSelectedAmount=self.payBill.multipleTotalSelectedAmount+parseFloat(self.payBill.outStandingAmtList[i]['outStandingAmount']);
	       		     biller.amount = self.payBill.outStandingAmtList[i].outStandingAmount;
					 biller.index  = self.payBill.outStandingAmtList[i].index;
					 billerList.index  = self.payBill.outStandingAmtList[i].index;
					 billerList.outAmount=Number(self.payBill.outStandingAmtList[i].outStandingAmountWithoutRoundOff).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2});
	 				 billerList.serviceType=self.payBill.outStandingAmtList[i].serviceType;
	 				 self.payBill.outStandingAmtList[i].checkedFlag=true;
	 				 billerList.currency=self.payBill.outStandingAmtList[i].currency;

	 				billerList.payeeListId=self.payBill.outStandingAmtList[i].payeeListId;
 					billerList.billerName=self.payBill.outStandingAmtList[i].billerName;


	 				 billerList.conCode=self.payBill.outStandingAmtList[i].tempConsumerCode;
	 				billerList.consumerCode=billerList.serviceType+'|'+billerList.conCode;
					 self.payBill.selectedMultipleBills.push(biller);
					 self.payBill.selectedOutStandingAmtList.push(billerList);
	       			}

	       		}
	       		self.payBill.outStandingAmountInfirstpageWRO = self.payBill.outStandingAmountInfirstpageWRO.toFixed(2);
	       		self.payBill.outStandingAmountInfirstpageDisplay=self.payBill.outStandingAmountInfirstpage.toLocaleString("en-US");
	       		self.payBill.outStandingAmountInfirstpageDisplayNotRoundOff=Number(self.payBill.outStandingAmountInfirstpageWRO).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2});
	       		self.payBill.selectedMultipleBillsJson=JSON.stringify(self.payBill.selectedMultipleBills);

	       	},
	       	getEditMultipleBillPayInit:function(responseList){
				   if(!responseList[0].hasOwnProperty('errorMessage') && self.payBill.isBackfromConfirmPage!=true){
					   
					   if(responseList[0].aedAccountList){
						   self.payBill.accountList=responseList[0].aedAccountList;
					   }
					   if(responseList[0].TXNDATE){
					   self.payBill.when=responseList[0].TXNDATE;
					   }
					   if(responseList[0].totalAmount){
						   self.payBill.multipleTotalSelectedAmount=responseList[0].totalAmount.split(' ')[1];
					   }
					   
					   if(responseList[0].mutipleList){
						   self.payBill.selectedOutStandingAmtList = responseList[0].mutipleList;
						   
						   for(var temp in self.payBill.selectedOutStandingAmtList){
		 						var biller = {};
		 						if(self.payBill.editMultiBillFlag)
		 							{
		 							biller.amount = self.payBill.selectedOutStandingAmtList[temp].entryAmount;
		 							}
		 						else
		 							{
		 						biller.amount = self.payBill.selectedOutStandingAmtList[temp].multipleBillAmount;
		 							}
			 					biller.index  = self.payBill.selectedOutStandingAmtList[temp].index;
		 						self.payBill.selectedMultipleBills.push(biller);	
		 							
						   }
					   }	
					   
					   
					   self.payBill.selectedMultipleBillsJson=JSON.stringify(self.payBill.selectedMultipleBills);
					   
					   var fromAcc = responseList[0].displayAccount;
					   
					   if(self.payBill.accountList){
   				          for(var temp in self.payBill.accountList){
   			  					if(self.payBill.accountList[temp].accountNumber==fromAcc){
   			  						self.payBill.multiplePayFromAcct=self.payBill.accountList[temp].accountIndex;  
   			  						self.schedule.accountType=self.payBill.accountList[temp].accountType;
   			  						break;
   			  					}
   			  				}
     					}
					   
					   if(!self.payBill.fromUpdateBtn){
						   self.payBill.getMultipleAcctBalance(self.payBill.getPayeeEvent());
					   }

					  
					   if(self.payBill.fromUpdateBtn)
					   {
						   if(self.payBill.editMultiBillFlag)
							   {
							   for(var temp in self.payBill.selectedOutStandingAmtList){
								   self.payBill.getMultipleUpdateAmount[temp]=Math.ceil(parseFloat(self.payBill.selectedOutStandingAmtList[temp].entryAmount.replace(',','').replace(',','')));
							   }
							   }
						   //self.payBill.fromUpdateBtn=false;
					   }
					   else
					   {
						   self.payBill.multipleTotalSelectedAmount=responseList[0].totalAmount.split(' ')[1];

					   for(var temp in self.payBill.selectedOutStandingAmtList){
						   self.payBill.getMultipleUpdateAmount[temp]=Math.ceil(parseFloat(self.payBill.selectedOutStandingAmtList[temp].multipleBillAmount.replace(',','').replace(',','')));
					   }

					   }
					 		   
				   }

			   },
	       	getMultipleBillPayInit:function(responseList){
				   if(!responseList[0].hasOwnProperty('errorMessage') && self.payBill.isBackfromConfirmPage!=true){

					   // to set Amount in textbox
					   //RAK DEV CHANGES AS FIX FOR 1482 START
					   if(self.payBill.fromUpdateBtn)
					   {
						   //self.payBill.fromUpdateBtn=false;
					   }
					   else
					   {
					   self.payBill.multipleTotalSelectedAmount=Number(self.payBill.outStandingAmountInfirstpage).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2});

					   for(var temp in self.payBill.selectedOutStandingAmtList){
						   self.payBill.getMultipleUpdateAmount[temp]=Math.ceil(parseFloat(self.payBill.selectedOutStandingAmtList[temp].outAmount.replace(',','').replace(',','')));
					   }

					   }
					 //RAK DEV CHANGES AS FIX FOR 1482 END


					   if(responseList[0].aedAccountList){
						   self.payBill.accountList=responseList[0].aedAccountList;
					   }
					   if(responseList[0].TXNDATE){
					   self.payBill.when=responseList[0].TXNDATE;
					   }
				   }

			   },

				getPayeeEvent : function(responseList) {

					if(self.payBill.accountList[self.payBill.multiplePayFromAcct]['accountType'].toString()=='CCD')
						{
						  return 'onCCSelectionBalCardCall';
						}

					else {
						  return 'onAccountSelectionBalCall';
					}
				},

			getMultipleAcctBalance:function(eventName){
				ActionProcessor.setEvent(eventName).then(function(payload) {
					console.log("Update Balance");
					//console.log(JSON.stringify(payload));
					var response=payload;
					 self.payBill.multiplePayFromAcctAvlBal=response.responsesList[0].accountAvailableBalance;
					scope.$apply();
				},function(errorPayload){
					self.common.availBal='';
				});
				   self.payBill.multiplePayFromAcctAvlBal=self.payBill.accountList[self.payBill.multiplePayFromAcct]['availableBalance'];
				  // self.payBill.multiplePayFromAcctDisplayName=self.payBill.accountList[self.payBill.multiplePayFromAcct]['productCatDesc']+" "+self.payBill.accountList[self.payBill.multiplePayFromAcct]['accountNumber']+" "+self.payBill.accountList[self.payBill.multiplePayFromAcct]['accountCurrency'];
				   self.payBill.multiplePayFromAcctDisplayName=self.payBill.accountList[self.payBill.multiplePayFromAcct]['productCatDesc']+" "+self.payBill.accountList[self.payBill.multiplePayFromAcct]['displayAccountNumber']+" "+self.payBill.accountList[self.payBill.multiplePayFromAcct]['accountCurrency'];

			},
			  multiplePaymentInitUtil:function(){
				  self.payBill.multiplePayDate=self.utils.setFormatedDate(self.common.initDate);
			  },
			  multiplePaymentAmountUpdate:function(index){
				  
				  self.payBill.fromUpdateBtn=true;

				  self.payBill.multipleTotalSelectedAmount=0.00;
			
				  if(self.payBill.selectedMultipleBills){

					  for(var temp in self.payBill.selectedMultipleBills){
						  if(self.payBill.getMultipleUpdateAmount[temp]){

							  self.payBill.multipleTotalSelectedAmount=self.payBill.multipleTotalSelectedAmount+parseFloat(self.payBill.getMultipleUpdateAmount[temp]);
						  }
						  else{
							  self.payBill.multipleTotalSelectedAmount=self.payBill.multipleTotalSelectedAmount + 0.00;
						  }


					  self.payBill.selectedMultipleBills[temp]['amount']=self.payBill.getMultipleUpdateAmount[temp];

					  }

					  self.payBill.multipleTotalSelectedAmount = Number(self.payBill.multipleTotalSelectedAmount).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2});
				  }

	 				self.payBill.selectedMultipleBillsJson=JSON.stringify(self.payBill.selectedMultipleBills);

			  },
			  
			  multiplePaymentAmountUpdateForEdit:function(index){
				  
				  self.payBill.fromUpdateBtn=true;

				  self.payBill.multipleTotalSelectedAmount=0.00;
				  
				  self.payBill.selectedMultipleBills = self.payBill.selectedOutStandingAmtList;
			
				  if(self.payBill.selectedMultipleBills){

					  for(var temp in self.payBill.selectedMultipleBills){
						  if(self.payBill.getMultipleUpdateAmount[temp]){

							  self.payBill.multipleTotalSelectedAmount=self.payBill.multipleTotalSelectedAmount+parseFloat(self.payBill.getMultipleUpdateAmount[temp]);
						  }
						  else{
							  self.payBill.multipleTotalSelectedAmount=self.payBill.multipleTotalSelectedAmount + 0.00;
						  }


					  self.payBill.selectedMultipleBills[temp]['amount']=self.payBill.getMultipleUpdateAmount[temp];

					  }

					  self.payBill.multipleTotalSelectedAmount = Number(self.payBill.multipleTotalSelectedAmount).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2});
				  }

	 				self.payBill.selectedMultipleBillsJson=JSON.stringify(self.payBill.selectedMultipleBills);

			  },
			  multiplePaymentConfirm:function(responseList){
				   if(!responseList[0].hasOwnProperty('errorMessage')){
					   
					   if(responseList[0].hasOwnProperty('accountNumber')){
   		   				self.payBill.fromAccSubmit=responseList[0].accountNumber;
   		   				}
					   
					   if(responseList[0].mutipleList){
						   self.payBill.selectedOutStandingAmtListForSubmit = responseList[0].mutipleList;						   
						  
					   }
					   
					   if(responseList[0].auth == self.constants.TRANSACTIONPASSWORD||responseList[0].auth == self.constants.TRANSACTIOPASSWORDSMSOTP||responseList[0].auth == self.constants.SMSOTP){//RAK:2:- Auth mode changes-added
							self.payeeModel.isAuthSet = true;
							switch(responseList[0].auth){
							case self.constants.TRANSACTIONPASSWORD:
								 self.authMode.authType=self.authMode.TransactionPassword;
								 self.authMode.isFirstAuthMode=true;
								 break;
							 case self.constants.TRANSACTIOPASSWORDSMSOTP:
								 self.authMode.authType=self.authMode.TransactionPassword;
								 self.authMode.secAuthType=self.authMode.OTP;
								 self.authMode.isFirstAuthMode=true;
								 self.authMode.isSecAuthMode=true;
								 break;
							 case self.constants.SMSOTP:
								 self.authMode.authType=self.authMode.OTP;
								 self.authMode.isFirstAuthMode=true;
								 break;
							 default:
								 self.authMode.authType=self.authMode.None;
							     self.authMode.secAuthType=self.authMode.None;
								 break;
							 }

						}
						else{
							self.payeeModel.isAuthSet = false;
						}

				   }

			   },
			   multiplePaymentSuccess:function(responseList){
				   if(!responseList[0].hasOwnProperty('errorMessage')){
					   self.payBill.multipleSuccessMsg=responseList[0].RakMultipleBillPaySuccessMsg;
					   self.payBill.nextApprover=responseList[0].nextApprover;
					   self.payBill.refId = responseList[0].refId;
					   self.payBill.txnStatus=responseList[0].txnStatus;
				   }

			   },
	       		/*RAK:2:-MultiplePay-end*/

    		 initPayNowPage:function(responseList){

    			 self.payBill.billsTab=true;
  				 self.payBill.quickPayTab=false;
  				 self.payBill.history=false;

    				if(responseList==null){
    					return;
    				}


    				if(!responseList[0].hasOwnProperty('errorMessage')&&!self.common.fromAuthPage)
    					{
	    					if(!(responseList[0].hasOwnProperty('accountAvailableBalance') || responseList[0].hasOwnProperty('chargesAmount'))){
		    					self.payBill.outStandingAmtFlag=responseList[0].outStandingAmtFlag;
		    					self.payBill.minMaxAmtFlag=responseList[0].minMaxAmtFlag;
		    					self.payBill.availableAmtFlag=responseList[0].availableAmtFlag;
		    					self.payBill.renewalAmtFlag=responseList[0].renewalAmtFlag;
		    					self.payBill.amtDueFlag=responseList[0].amtDueFlag;
		    					self.payBill.renewalAmt=responseList[0].renewalAmt;
		    					self.payBill.availBillAmt=responseList[0].availBillAmt;
		    					self.payBill.freeBalAmt=responseList[0].freeBalAmt; //Added for RAKToll CR
		    					self.payBill.RAKBILLER=responseList[0].RAKBILLER; //Added for RAKToll CR
		    					self.payBill.outDisableFlag=responseList[0].outDisableFlag;
	    					}

	    					self.payBill.amountType = '2';
	    					self.payBill.amountToBeEntered = false;


    					}
    				if(!responseList[0].hasOwnProperty('errorMessage')&&!self.common.fromAuthPage ){
    					if(self.payeeSelected.billerName=='DEWA' || self.payeeSelected.billerName=='FEWA' || self.payeeSelected.billerName=='SEWA'
							|| self.payeeSelected.billerName=='ETISALAT' || self.payeeSelected.billerName=='DU')
    						{
    						//check for prepaid service types-Outstd Amt change in paybill
    						  if(self.payeeSelected.serviceType!='Prepaid/ Pay as you go' && self.payeeSelected.serviceType!='Wasel Recharge'){
    							  self.payBill.amountSelectionRqd=true;
    						    }

    						}

    		   			self.utils.populateCurrentDateDetails();
    		   			if(responseList.length>1){
	    					self.payBill.fromAccounts=responseList[1].fromAccountsList;
	    					self.payBill.frequencyType=responseList[1].frequencyType;
    		   			}
    		   			if(responseList[0].hasOwnProperty('minAmt')){
    		   				self.payBill.minAmount=responseList[0].minAmt;
    		   			}
    		   			if(responseList[0].hasOwnProperty('maxAmt')){
    		   				self.payBill.maxAmount=responseList[0].maxAmt;
    		   			}
    		   			if(responseList[0].hasOwnProperty('outAmt')){
    		   				self.payBill.outAmount=responseList[0].outAmt;

 		   			}
    		   			if(responseList[0].hasOwnProperty('amtDue')){
    		   				self.payBill.amountDue=responseList[0].amtDue;
    		   			}

    					//self.payBill.selectedFrequency="O";

    		   			if(self.payBill.availBillAmt!='')
    						self.payBill.displayOutAmt = self.payBill.availBillAmt;
    					else
    						self.payBill.displayOutAmt = self.payBill.outAmount;


    		   		//Outstd Amt change in paybill
    		   			if(self.payBill.displayOutAmt!=''){
			   				self.payBill.outAmountValue=self.payBill.displayOutAmt.split(" ")[1];
			   				self.payBill.outAmountValue=self.payBill.outAmountValue.split(".")[0];
			   				self.payBill.outAmountValue=Number(self.payBill.outAmountValue.replace(',',""));
			   				//if(self.payBill.outAmountValue <= 0){
			   				if(self.payBill.outDisableFlag=='Y'){
			   					self.payBill.outAmountRadioDisableFlag=true;
			   					self.payBill.amountType='1';
			   				}
    		   			}
		   			//Outstd Amt change in paybill


    				}

    			},

    			initAuthPage:function(responsesList){
    				if(!responsesList[0].hasOwnProperty('errorMessage') && rootScope.rakCorpInit.corpModel.backFlag !='Y'){

    					self.payBill.recFreq = responsesList[0].recFreq;
    					self.payBill.amountDisp = responsesList[0].amount;
    					self.payBill.displayDate = responsesList[0].txnDate;
    					self.payBill.balCheck = responsesList[0].balCheck;
    					self.payBill.poolBalMsg = responsesList[0].MESSAGE;
    					self.payBill.conCode = responsesList[0].conCode;
    					self.payBill.consumercodeValue = responsesList[0].consumercodeValue;
    					
					self.payBill.accountNumber=responsesList[0].accountNumber;
    					if(responsesList[0].auth == ""){
     						self.payBill.authStatus=false;
    						self.payBill.authFlag = "";
    					}
     					else
     					{
     						self.payBill.authStatus=true;
     						self.payBill.authFlag = responsesList[0].auth;
     					}
    				}
    			},

    			setPayBillDate:function() {
    				self.payBill.amountToBeEntered = false;
    				self.utils.populateCurrentDateDetails();
    				if(self.payBill.billerType == 'Y' && self.payBill.amountType == "1")
    					self.payBill.amountToBeEntered = true;
    				if(self.payBill.billerType == 'N')
    					self.payBill.amountToBeEntered = true;

    				if(self.payBill.selectedFrequency != 'O')
    					self.payBill.recFrequencySelected = true;
    		    },

    		    initSuccessPage:function(responsesList){
    				if(!responsesList[0].hasOwnProperty('errorMessage')){
    					self.payBill.successMessage = responsesList[0].successMsg;
    					self.payBill.refId = responsesList[0].refId;
    					self.payBill.txnStatus = responsesList[0].txnStatus;
    					self.payBill.nextApprover= responsesList[0].nextApprover;
    				}
    			},



    			getEventForPayement:function(){
    				var eventSel='';
    				if(self.payBill.selectedFrequency != 'O'){

    					eventSel='onRecPayBillNowSend';
        			}

        			else{
        				eventSel='onSinglePayBillNowSend';
        			}
    				if(self.payBill.amountType=='1'){
    					self.payBill.amountSelection = "E";
    				}
    				else{
    					self.payBill.amountSelection = "O";
    					self.payBill.amount='';
    				}

    				return eventSel;
    			},




    			clearPayBillData : function() {

    				self.payBill.noOfTransfer = '';
    				self.payBill.amount = '';
    				self.payBill.selectedFrequency = 'O';
    				self.payBill.frequencyType = '';
    				self.payBill.selectedCurrency = '';
    				self.payBill.currencyList = [];
    				self.payBill.fromAccounts = [];
    				self.payBill.selectedToBenAccount = '';
    				self.payBill.selectedToAccount = '';
    				self.payBill.selectedFromAccount = '';
    				self.payBill.selectedPayee = '';
    				self.payBill.outAmount = '';
    				self.payBill.outAmountValue = '';//Outstd Amt change in paybill
    				self.payBill.outAmountRadioDisableFlag=false;//Outstd Amt change in paybill
    				self.payBill.maxAmount = '';
    				self.payBill.minAmount = "";
    				self.payBill.authFlag = "";
    				self.payBill.txnPwd = '';
    				self.payBill.recFreq = '';
    				self.payBill.amountToBeEntered = false;
    				self.payBill.billerType = 'N';
    				self.payBill.recFrequencySelected = false;
    				self.payBill.successMessage = null;
    				self.payBill.authStatus = false;
    				self.payBill.amountSelectionRqd = false;
    				self.payBill.availBal = "";
    				self.payBill.amountType = "2";

    				self.payBill.selectedBillerType=self.constants.ALL;
    				self.payBill.fromAccount="";
    				//self.payBill.searchFromDate=new Date();
    				//self.payBill.searchToDate = new Date();
    				self.payBill.displayDate="";
    				self.payBill.poolBalMsg="";
    				self.payBill.balCheck="false";
    				/*RAK:2:-MultiplePay-Start*/
    				self.payBill.checkBoxStatus=false;
    				self.payBill.outStandingAmtList=[];
    				self.payBill.selectedOutStandingAmtList=[];
    				self.payBill.selectedOutStandingAmtListForSubmit=[];
    				self.payBill.outStandingAmtMsg="",
    				self.payBill.checkBoxForAmount=[];
    				self.payBill.homeCurCode="";
    				self.payBill.multipleTotalSelectedAmount=0.00;
    				self.payBill.accountList=[];
    				self.payBill.multiplePayFromAcct="";
    				self.payBill.multiplePayFromAcctDisplayName="";
    				self.payBill.fromAccSubmit="";
    				self.payBill.multiplePayFromAcctAvlBal="";
    				self.payBill.selectedMultipleBills=[];
    				self.payBill.selectedMultipleBillsJson="";
    				self.payBill.multiplePayIndex=0;
    				self.payBill.multiplePayUpdateIndex=0;
    				self.payBill.multiplePayDate="";
    				self.payBill.getMultipleUpdateAmount={};
    				self.payBill.multipleSuccessMsg="";
    				self.payBill.nextApprover='';
    				self.payBill.txnStatus='';
    				self.payBill.accountNumber="";
    				/*RAK:2:-MultiplePay-End*/
    				self.common.displayDate = new Date();
    				self.payBill.fromOutStandingPage = false;

    				self.payBill.outStandingAmtFlag='';
					self.payBill.minMaxAmtFlag='';
					self.payBill.availableAmtFlag='';
					self.payBill.renewalAmtFlag='';
					self.payBill.amtDueFlag='';
					self.payBill.outDisableFlag='';
					self.payBill.renewalAmt='';
					self.payBill.availBillAmt='';
					self.payBill.freeBalAmt=''; //Added for RAKToll CR
					self.payBill.RAKBILLER=''; //Added for RAKToll CR
					self.payBill.chargesRakToll=''; //Added for RAKToll CR
					self.payBill.amountChargesRadio=''; //Added for RAKToll CR
					self.payBill.topUpAmount=''; //Added for RAKToll CR
					self.payBill.totalAmount=''; //Added for RAKToll CR
					self.payBill.amountRakToll= ''; //Added for RAKToll CR
					self.payBill.amountRakToll= ''; //Added for RAKToll CR
					self.payBill.chargesFlag='N'; //Added for RAKToll CR
					self.payBill.chargesFlagBoolean=false; //Added for RAKToll CR
					self.schedule.btnSelected=''; //Added for RAKToll CR
					self.payeeSelected.serviceType='';
					self.payBill.displayOutAmt='';
					self.payBill.editMultiBillFlag = false;
					},

    			setAuthFlag:function(responsesList){
     				if(!responsesList[0].hasOwnProperty('errorMessage')){
     					if(responsesList[0].auth == "")
     						self.payBill.authStatus=false;
     					else
     					{
     						self.payBill.authStatus=true;
     						self.payBill.authFlag = responsesList[0].auth;
     					}
     				}
     			},
     			 initSearchPage : function(responseList) {
     				if(!responseList[0].hasOwnProperty('errorMessage') && !self.common.fromAuthPage){
     					if (responseList[0].hasOwnProperty("message")) {
	 						self.schedule.successMessage = responseList[0].message;

	 					}

	 					if (responseList[0].hasOwnProperty("rakBillerTypeList")) {
	 						self.payBill.billerTypeList = responseList[0].rakBillerTypeList;
	 						self.payBill.billerOrderList = responseList[0].billerOrder || [];
	 						
	 						self.payBill.billerTypeList =self.utils.sortBillerNameList(self.payBill.billerTypeList,self.payBill.billerOrderList);
	 						
	 						
							self.payBill.selectedBillerType = self.constants.ALL;

	 					}
	 					if (responseList[0].hasOwnProperty("debitAccountList")) {
	 						self.payBill.searchFromList = responseList[0].debitAccountList;

	 					}

	 					if (responseList[0].hasOwnProperty('scheduleList')) {
							self.payBill.scheduleList = responseList[0].scheduleList;
						}
	 					//self.payBill.selectedBillerType = self.payBill.billerTypeList.billerName;
	 					self.payBill.billerTxnTypeList = [{"txnTypeLabel":self.constants.ALL,"txnTypeValue":self.constants.ALL},{"txnTypeLabel":self.constants.TXNTYPEPMTLABEL,"txnTypeValue":self.constants.TXNTYPEPMT}];
     				}


 				},

 				setFutureDate : function(){
					self.payBill.searchFromDate = new Date();
					self.payBill.searchToDate = new Date().addMonths(1);

					self.payBill.displayDate = self.common.searchFromDate;
					self.utils.populateCurrentDateDetails();

					self.payBill.searchFromDate_day =self.common.date;
					self.payBill.searchFromDate_month=self.common.month;
					self.payBill.searchFromDate_year=self.common.year;


				},

 				setFromToDate : function() {
					self.common.displayDate = self.payBill.searchFromDate;
					self.utils.populateCurrentDateDetails();

					self.payBill.searchFromDate_day =self.common.date;
					self.payBill.searchFromDate_month=self.common.month;
					self.payBill.searchFromDate_year=self.common.year;

					self.common.displayDate = self.payBill.searchToDate;
					self.utils.populateCurrentDateDetails();

					self.payBill.searchToDate_day =self.common.date;
					self.payBill.searchToDate_month=self.common.month;
					self.payBill.searchToDate_year=self.common.year;

					self.common.displayDate= new Date();
				 },

 				initCompltTransferListPage : function(responseList) {
					if (responseList[0].hasOwnProperty('scheduleList')) {
						self.payBill.scheduleList = responseList[0].scheduleList;
						self.payBill.fromSearchResult = false;
					}
				},

				initScheduleTransferListPage : function(responseList) {
					if (!responseList[0].hasOwnProperty('errorMessage')) {

						if(responseList[0].hasOwnProperty('txnTypeList')){
						    self.payBill.txnTypeList=responseList[0].txnTypeList;
						}
						else if(responseList[0].hasOwnProperty('scheduleList')){
							self.payBill.scheduleList=responseList[0].scheduleList;
						}
						else{
							self.payBill.searchFromList=responseList[0].fromAccount;
						}

					}
				},

				getBalanceEvent:function(){
     				if(self.payBill.fromAccounts[self.payBill.selectedFromAccount].accountType== 'CCD'){
						self.common.updateBal('onCCDAccountSelectionBalCall');
					}
					else{
						self.common.updateBal('onAccountSelectionBalCall');
					}
     			},

     			setInitialDate : function(){
					self.common.searchToDate = new Date().addMonths(1);
					self.common.searchFromDate = new Date().addMonths(-1);

					self.common.displayDate = self.common.searchFromDate;
					self.utils.populateCurrentDateDetails();

					self.payBill.searchFromDate_day =self.common.date;
					self.payBill.searchFromDate_month=self.common.month;
					self.payBill.searchFromDate_year=self.common.year;

					self.common.displayDate = self.common.searchToDate;
					self.utils.populateCurrentDateDetails();

					self.payBill.searchToDate_day =self.common.date;
					self.payBill.searchToDate_month=self.common.month;
					self.payBill.searchToDate_year=self.common.year;

					self.payBill.searchFromDate=self.common.searchFromDate;
					self.payBill.searchToDate=self.common.searchToDate;
				},

				setInitialDateForSchedule : function(){
					self.common.searchFromDate = new Date();
					self.common.searchToDate = new Date().addMonths(1);

					self.common.displayDate = self.common.searchFromDate;
					self.utils.populateCurrentDateDetails();

					self.payBill.searchFromDate_day =self.common.date;
					self.payBill.searchFromDate_month=self.common.month;
					self.payBill.searchFromDate_year=self.common.year;

					self.common.displayDate = self.common.searchToDate;
					self.utils.populateCurrentDateDetails();

					self.payBill.searchToDate_day =self.common.date;
					self.payBill.searchToDate_month=self.common.month;
					self.payBill.searchToDate_year=self.common.year;

					self.payBill.searchFromDate=self.common.searchFromDate;
					self.payBill.searchToDate=self.common.searchToDate;
				}
     }


     /*RAK  : Pay Bill : END*/

     self.quickPay={
    		consumercode0:"",
    		consumercode1:"",
    		consumercode2:"",
    		consumercode3:"",
    		consumercode4:"",
    		consumercode5:"",
    		consumercode6:"",
    		dropdown:[],
    		consumerCodeFields:[],
    		codeName:"",
    		codeType:"",
    		codeSize:"",
 		 	recFrequencySelected:false,
 		 	billerType:"N",
 		 	amountToBeEntered:false,
 		 	recFreq:"",
 		 	txnPwd:"",
 		 	authFlag:"",
 		 	minAmount:"",
 		 	maxAmount:"",
 		 	outAmount:"",
 		 	selectedPayee:"",
 		 	selectedFromAccount:"",
 			selectedToAccount:"",
 			selectedToBenAccount:"",
 			fromAccounts:[],
 			billerList:[],
 			billerOrder:[],
 			selectedCurrency:"",
 			frequencyType:[],
 			selectedFrequency:"O",
 			amount:"",
 			noOfTransfer:"",
 			containsDD:false,
 			selectedPayeeIndex:"",
 			payeeFormatList:[],
 			consumerCodeCount:-1,
 			consumerCodeValues:[],
 			billerFields:0,
 			authStatus:false,
 			authFlag:"",
 			saveToList:false,
 			selectedBiller:"",
 			amountDisp:"",
 			billerNickname:"",
 			availBal:"",
 			displayDate:"",
 			consumerCodes:[],
 			ccCombinedLimitFlag:false,
 			nextApprover:'',
 			txnStatus:'',

 		 initPayNowPage:function(responseList){

 				self.quickPay.billsTab=false;
 				self.quickPay.quickPayTab=true;
 				self.quickPay.history=false;

 				if(responseList==null){
 					return;
 				}

 				if(!responseList[0].hasOwnProperty('errorMessage')&&!self.common.fromAuthPage && !responseList[0].hasOwnProperty('chargesAmount')){
 		   			//	self.utils.populateCurrentDateDetails();
 					/*if(!self.common.flag){
 					var date=new Date();
 					self.common.displayDate= moment(self.common.displayDate).format('DD-MM-YYYY');
 					}
 					*/
 					if(responseList[0].currentDate){
 					self.common.displayDate=responseList[0].currentDate;
 					}
 		   			if(responseList[0].hasOwnProperty('fromAccountsList'))
 		   				self.quickPay.fromAccounts=responseList[0].fromAccountsList;
 		   			if(responseList[0].hasOwnProperty('billerList')){
 		   				
 		   				var billerOrder 
 		   				self.quickPay.billerList= responseList[0].billerList;
 		   			    self.quickPay.billerOrder= responseList[0].billerOrder;
 		   			    self.quickPay.billerList = self.utils.sortBillerNameList(self.quickPay.billerList,self.quickPay.billerOrder);
 		   				
 		   			}

 					if(responseList[0].hasOwnProperty('payeeLabel')){
 						self.quickPay.consumerCodeFields = [];
 					self.quickPay.payeeFormatList = responseList[0].payeeLabel;
 					self.quickPay.billerFields = self.quickPay.payeeFormatList.length;
 					for (var index = 0; index < self.quickPay.payeeFormatList.length; index++) {

	 						var currField = {};
	 						currField.billerFieldName = self.quickPay.payeeFormatList[index].payeeLabelName;
	 						currField.billerFieldValue = "";
	 						currField.billerFieldType =  self.quickPay.payeeFormatList[index].payeeLabelType;
	 						currField.billerFieldSize =  self.quickPay.payeeFormatList[index].payeeInputSize;
	 						currField.modelName = self.quickPay.payeeFormatList[index].payeeLabelName.replace(/\s+/g,'');
	 						currField.payeefieldIsRequired=self.quickPay.payeeFormatList[index].payeefieldIsRequired;

	 						if(currField.payeefieldIsRequired){
								if(currField.payeefieldIsRequired==self.constants.MANDATORY){
									currField.payeefieldIsRequired=true;
								}
								else if(currField.payeefieldIsRequired==self.constants.OPTIONAL){
									currField.payeefieldIsRequired=false;
								}
								else{
									currField.payeefieldIsRequired=false;
								}
							}
	 						currField.pattern=self.quickPay.payeeFormatList[index].payeePattern;
		 					currField.patternFlag=self.quickPay.payeeFormatList[index].patternFlag;

		 					currField.payeeInputSize = self.quickPay.payeeFormatList[index].payeeInputSize;
		 					currField.payeeLabelType = self.quickPay.payeeFormatList[index].payeeLabelType;
	 						if(currField.billerFieldType == 'dropDown'){
	 							self.quickPay.dropdownList = self.quickPay.payeeFormatList[index].payeeDropdown;
	 						/*for (var i = 0; i < self.quickPay.dropdownList.length; i++) {
		 							var dropDown = {};
		 							dropDown.label =  self.quickPay.dropdownList[i].payeeLabelDesc;
		 							dropDown.index =  self.quickPay.dropdownList[i].index;
		 							dropDown.labelvalue =  self.quickPay.dropdownList[i].payeeLabelValue;
		 							self.quickPay.dropdown.push(dropDown);
	 							}*/
	 							currField.dropdown = self.quickPay.dropdownList;
	 						}
	 						self.quickPay.consumerCodeFields.push(currField);
	 					}
 					}
 				}

 				if(self.common.fromAuthPage){
 					if(self.quickPay.billerList[self.quickPay.selectedBiller].billerName == 'EMAAR' && self.quickPay.consumercode0 != 'OTHR') {
 						self.quickPay.consumercode1 = "";
 					}
 				}
 			},

 			initAuthPage:function(responsesList){
 				if(!responsesList[0].hasOwnProperty('errorMessage') && rootScope.rakCorpInit.corpModel.backFlag !='Y'){
 					self.quickPay.recFreq = responsesList[0].recFreq;
 					self.quickPay.amountDisp = responsesList[0].amount;
 					self.quickPay.displayDate = responsesList[0].txnDate;
 					self.payBill.balCheck = responsesList[0].balCheck;
					self.payBill.poolBalMsg = responsesList[0].MESSAGE;
					if(responsesList[0].auth == "")
 						self.quickPay.authStatus=false;
 					else
 					{
 						self.quickPay.authStatus=true;
 						self.quickPay.authFlag = responsesList[0].auth;
 					}
 				}
 			},

 			setPayBillDate:function() {
 				//self.payBill.amountToBeEntered = false;
 				self.utils.populateCurrentDateDetails();


 				if(self.quickPay.selectedFrequency != 'O')
 					self.quickPay.recFrequencySelected = true;
 		    },

 		   populateConsumerCodes:function(){
 			  

 			   if(self.quickPay.selectedBiller!=''){
	 			  if(self.quickPay.billerList[self.quickPay.selectedBiller].billerName == 'DEWA')
	 				  self.quickPay.consumercode0 = "DEWA";
	 			 if(self.quickPay.billerList[self.quickPay.selectedBiller].billerName == 'SEWA')
	 				  self.quickPay.consumercode0 = "SEWA";
	 			 if(self.quickPay.billerList[self.quickPay.selectedBiller].billerName == 'FEWA')
	 				  self.quickPay.consumercode0 = "FewaBill";
	 			  if(self.quickPay.billerList[self.quickPay.selectedBiller].billerName == 'SALIK')
	 				  self.quickPay.consumercode0 = "SALIKRECHARGE";
	 			  //Added for RAKTOLL CR
	 			 if(self.quickPay.billerList[self.quickPay.selectedBiller].billerName == self.constants.RAKTOLL){
	 				self.quickPay.consumercode0 = self.constants.RAKTOLLTOPUP;
	 				
	 			 }
	 			 //Added for RAKTOLL CR
	 			 if(self.quickPay.billerList[self.quickPay.selectedBiller].billerName == 'EMAAR' && self.quickPay.consumercode0 != 'OTHR') {
					  //need to change
	 				 self.quickPay.consumercode1 = "DUMMY";
	 			 }

	 				self.quickPay.consumerCodeValues = [];
	 				for (var index = 0; index < self.quickPay.consumerCodeFields.length; index++) {
	 					var currField = {};
	 					currField.value = eval("self.quickPay.consumercode"+index);
	 					currField.label = self.quickPay.consumerCodeFields[index].billerFieldName;
	 					currField.dropdown = self.quickPay.consumerCodeFields[index].dropdown;


	 					currField.pattern=self.quickPay.consumerCodeFields[index].payeePattern;
	 					currField.patternFlag=self.quickPay.consumerCodeFields[index].patternFlag;
	 					if(currField.label == 'Others' && self.quickPay.consumerCodeFields[index].value == 'Others'){
	 						currField.payeefieldIsRequired=true;
	 					}
	 					else{
	 						currField.payeefieldIsRequired=self.quickPay.consumerCodeFields[index].payeefieldIsRequired;
	 					}
	 					currField.payeeInputSize = self.quickPay.consumerCodeFields[index].payeeInputSize;

	 					currField.payeeLabelType = self.quickPay.consumerCodeFields[index].payeeLabelType;


	 					if(self.quickPay.consumerCodeFields[index].billerFieldType == 'dropDown'){
	 						for (var int = 0; int < currField.dropdown.length; int++) {
	 							if(currField.dropdown[int].payeeLabelValue == currField.value){
	 								currField.value = currField.dropdown[int].payeeLabelDesc;
	 								break;
								}
	 						}
	 					}

	 					self.quickPay.consumerCodeValues.push(currField);
	 				}
 			   }
 				//Populate the rest of the array values
 				/*for (;index < 7; index++) {
 					var currField = {};
 					currField.value = "";
 					currField.label = "";

 					self.quickPay.consumerCodeValues.push(currField);
 				}*/
 			   
 			},

 			setAuthFlag:function(responsesList){
 				if(!responsesList[0].hasOwnProperty('errorMessage')){
 					if(responsesList[0].auth == "")
 						self.quickPay.authStatus=false;
 					else
 					{
 						self.quickPay.authStatus=true;
 						self.quickPay.authFlag = responsesList[0].auth;
 					}
 				}
 			},

			clearQuickPayData : function() {
				self.quickPay.selectedBiller = '';
				self.quickPay.noOfTransfer = '';
				self.quickPay.amount = '';
				self.quickPay.selectedFrequency = 'O';
				self.quickPay.frequencyType = '';
				self.quickPay.selectedCurrency = '';
				self.quickPay.currencyList = [];
				self.quickPay.fromAccounts = [];
				self.quickPay.selectedToBenAccount = '';
				self.quickPay.selectedToAccount = '';
				self.quickPay.selectedFromAccount = '';
				self.quickPay.selectedPayee = '';
				self.quickPay.outAmount = '';
				self.quickPay.maxAmount = '';
				self.quickPay.minAmount = "";
				self.quickPay.authFlag = "";
				self.quickPay.txnPwd = '';
				self.quickPay.recFreq = '';
				self.quickPay.amountToBeEntered = false;
				self.quickPay.billerType = 'N';
				self.quickPay.recFrequencySelected = false;
				self.quickPay.successMessage = '';
				self.quickPay.txnStatus='';
				self.quickPay.nextApprover='';
				self.quickPay.authFlag = '';
				self.quickPay.authStatus = false;
				self.quickPay.consumerCodeValues= [];
				self.quickPay.consumerCodeFields= [];
				self.quickPay.billerFields=0;
				self.quickPay.saveToList=false;
				self.quickPay.amountDisp='';
				self.quickPay.billerNickname = '';
				self.quickPay.searchFromDate = new Date();
				self.quickPay.searchToDate = new Date();
				self.common.availBal="";
				self.quickPay.displayDate="";
				self.quickPay.consumerCodes=[];
				self.payBill.chargesRakToll=''; //Added for RAKToll CR
				self.payBill.amountChargesRadio=''; //Added for RAKToll CR
				self.payBill.topUpAmount=''; //Added for RAKToll CR
				self.payBill.totalAmount=''; //Added for RAKToll CR
				self.payBill.amountRakToll= ''; //Added for RAKToll CR
				self.payBill.chargesFlag='N'; //Added for RAKToll CR
				self.payBill.chargesFlagBoolean=false; //Added for RAKToll CR

			},

				clearBillerData : function() {

					self.quickPay.consumercode0="";
					self.quickPay.consumercode1="";
					self.quickPay.consumercode2="";
					self.quickPay.consumercode3="";
					self.quickPay.consumercode4="";
					self.quickPay.consumercode5="";
					self.quickPay.consumercode6="";
					self.quickPay.consumerCodeValues= [];
					self.quickPay.consumerCodeFields= [];
					self.quickPay.billerNickname = '';
					self.quickPay.saveToList=false;
					self.quickPay.selectedFromAccount = '';
					self.quickPay.amount = '';
					self.common.availBal = '';

			},
			initSuccessPage:function(responsesList){
				if(!responsesList[0].hasOwnProperty('errorMessage'))
					self.quickPay.successMessage = responsesList[0].successMsg;
				self.common.successMessage = responsesList[0].transferStatusMessage
					self.quickPay.txnStatus=responsesList[0].txnStatus;
					self.quickPay.nextApprover=responsesList[0].nextApprover;
				
			},

			getBalanceEvent:function(){
 				if(self.quickPay.fromAccounts[self.quickPay.selectedFromAccount].accountType== 'CCD'){
					self.common.updateBal('onCCDAccountSelectionBalCall');
				}
				else{
					self.common.updateBal('onAccountSelectionBalCall');
				}
 			},

 			initQuickPayAgainPage : function(responseList) {

      			 	 self.payBill.billsTab=false;
    				 self.payBill.quickPayTab=true;
    				 self.payBill.history=false;

      				if(responseList==null){
      					return;
      				}
      				if(self.schedule.btnSelected=='SENDAGAIN' && !self.common.fromAuthPage){

      					if(responseList[0].currentDate){
      	 					self.common.displayDate=responseList[0].currentDate;
      	 					}
      				if(responseList[0].hasOwnProperty('fromAccountsList'))
 		   				self.quickPay.fromAccounts=responseList[0].fromAccountsList;

      				self.common.availBal=responseList[0].accountAvailableBalance;


      				if(self.quickPay.fromAccounts){
				          for(var temp in self.quickPay.fromAccounts){
			  					if(self.quickPay.fromAccounts[temp].accountNumber==self.payBill.selectedCompltTxn.fromAccount){
			  						self.quickPay.selectedFromAccount=self.quickPay.fromAccounts[temp].accountIndex;
			  						self.schedule.accountType = self.quickPay.fromAccounts[temp].accountType;
			  						break;
			  					}
			  				}
					}

 		   			if(responseList[0].hasOwnProperty('billerList'))
 		   				self.quickPay.billerList=responseList[0].billerList;

	 		   		if(self.quickPay.billerList){
				          for(var temp in self.quickPay.billerList){
			  					if(self.quickPay.billerList[temp].billerId==self.payBill.selectedCompltTxn.cpEntityId){
			  						self.quickPay.selectedBiller=self.quickPay.billerList[temp].billerIndex;
			  						//self.quickPay.payeeFormatList=self.quickPay.billerList[temp].payeeFormat;
			  						self.quickPay.selectedPayeeIndex=temp.index;
			  						break;
			  					}
			  				}
					}
	 		   		//scope.setEvent('onStopTransferAuthConfirmClick');

      					self.quickPay.amount = Number(self.payBill.selectedCompltTxn.txnAmountDisp);
      					self.quickPay.billerNickname = self.payBill.selectedCompltTxn.toAccount;
      					self.quickPay.consumerCodes = self.payBill.selectedCompltTxn.consumerCode.split('|');




     					self.quickPay.consumerCodeFields = [];
     					if(responseList[0].hasOwnProperty('payeeLabel')){
     						self.quickPay.payeeFormatList = responseList[0].payeeLabel;
     					}
     					self.quickPay.billerFields = self.quickPay.payeeFormatList.length;
     					for (var index = 0; index < self.quickPay.payeeFormatList.length; index++) {

    	 						var currField = {};
    	 						currField.billerFieldName = self.quickPay.payeeFormatList[index].payeeLabelName;
    	 						currField.billerFieldValue = "";
    	 						currField.billerFieldType =  self.quickPay.payeeFormatList[index].payeeLabelType;
    	 						currField.billerFieldSize =  self.quickPay.payeeFormatList[index].payeeInputSize;
    	 						currField.modelName = self.quickPay.payeeFormatList[index].payeeLabelName.replace(/\s+/g,'');
    	 						currField.payeefieldIsRequired=self.quickPay.payeeFormatList[index].payeefieldIsRequired;

    	 						if(currField.payeefieldIsRequired){
    								if(currField.payeefieldIsRequired==self.constants.MANDATORY){
    									currField.payeefieldIsRequired=true;
    								}
    								else if(currField.payeefieldIsRequired==self.constants.OPTIONAL){
    									currField.payeefieldIsRequired=false;
    								}
    								else{
    									currField.payeefieldIsRequired=false;
    								}
    							}
    	 						currField.pattern=self.quickPay.payeeFormatList[index].payeePattern;
    		 					currField.patternFlag=self.quickPay.payeeFormatList[index].patternFlag;

    		 					currField.payeeInputSize = self.quickPay.payeeFormatList[index].payeeInputSize;
    		 					currField.payeeLabelType = self.quickPay.payeeFormatList[index].payeeLabelType;
    	 						if(currField.billerFieldType == 'dropDown'){
    	 							self.quickPay.dropdownList = self.quickPay.payeeFormatList[index].payeeDropdown;

    	 							currField.dropdown = self.quickPay.dropdownList;
    	 						}
    	 						if(self.schedule.btnSelected=='SENDAGAIN'){
    	 							eval("self.quickPay.consumercode"+index+ "=" +'self.quickPay.consumerCodes[index]');
    	 						}
    	 						self.quickPay.consumerCodeFields.push(currField);
    	 					}
     					if(self.schedule.accountType== 'CCD'){
      						self.common.updateBal('onCCDAccountSelectionBalCall');
      					}
      					else{
      						self.common.updateBal('onAccountSelectionBalCall');
      					}
  					}


      				},
      				
      				initQuickPayEditPage : function(responseList) {

         			 	 self.payBill.billsTab=false;
	       				 self.payBill.quickPayTab=true;
	       				 self.payBill.history=false;

         				if(responseList==null){
         					return;
         				}
         				if(!self.common.fromAuthPage){

         					if(responseList[0].currentDate){
         	 					self.common.displayDate=responseList[0].currentDate;
         	 					}
         				if(responseList[0].hasOwnProperty('fromAccountsList'))
    		   				self.quickPay.fromAccounts=responseList[0].fromAccountsList;

         				self.common.availBal=responseList[0].accountAvailableBalance;


         				if(self.quickPay.fromAccounts){
   				          for(var temp in self.quickPay.fromAccounts){
   			  					if(self.quickPay.fromAccounts[temp].accountNumber==self.schedule.selectedTxn.requestedBy){
   			  						self.quickPay.selectedFromAccount=self.quickPay.fromAccounts[temp].accountIndex;
   			  						self.schedule.accountType = self.quickPay.fromAccounts[temp].accountType;
   			  						break;
   			  					}
   			  				}
   					}

    		   			if(responseList[0].hasOwnProperty('billerList'))
    		   				self.quickPay.billerList=responseList[0].billerList;

   	 		   		if(self.quickPay.billerList){
   				          for(var temp in self.quickPay.billerList){
   			  					if(self.quickPay.billerList[temp].billerId==self.schedule.selectedTxn.destAccountID){
   			  						self.quickPay.selectedBiller=self.quickPay.billerList[temp].billerIndex;
   			  						self.quickPay.selectedBillerDisp=self.quickPay.billerList[temp].billerName;
   			  						//self.quickPay.payeeFormatList=self.quickPay.billerList[temp].payeeFormat;
   			  						self.quickPay.selectedPayeeIndex=temp.index;
   			  						break;
   			  					}
   			  				}
   					}
   	 		   		

         					self.quickPay.amount = Number(self.schedule.selectedTxn.txnAmountDisp);
         					self.quickPay.billerNickname = self.schedule.selectedTxn.toAccount;
         					self.quickPay.consumerCodes = responseList[0].CONSUMERCODE.split('|');




        					self.quickPay.consumerCodeFields = [];
        					if(responseList[0].hasOwnProperty('payeeLabel')){
        						self.quickPay.payeeFormatList = responseList[0].payeeLabel;
        					}
        					self.quickPay.billerFields = self.quickPay.payeeFormatList.length;
        					for (var index = 0; index < self.quickPay.payeeFormatList.length; index++) {

       	 						var currField = {};
       	 						currField.billerFieldName = self.quickPay.payeeFormatList[index].payeeLabelName;
       	 						currField.billerFieldValue = "";
       	 						currField.billerFieldType =  self.quickPay.payeeFormatList[index].payeeLabelType;
       	 						currField.billerFieldSize =  self.quickPay.payeeFormatList[index].payeeInputSize;
       	 						currField.modelName = self.quickPay.payeeFormatList[index].payeeLabelName.replace(/\s+/g,'');
       	 						currField.payeefieldIsRequired=self.quickPay.payeeFormatList[index].payeefieldIsRequired;

       	 						if(currField.payeefieldIsRequired){
       								if(currField.payeefieldIsRequired==self.constants.MANDATORY){
       									currField.payeefieldIsRequired=true;
       								}
       								else if(currField.payeefieldIsRequired==self.constants.OPTIONAL){
       									currField.payeefieldIsRequired=false;
       								}
       								else{
       									currField.payeefieldIsRequired=false;
       								}
       							}
       	 						currField.pattern=self.quickPay.payeeFormatList[index].payeePattern;
       		 					currField.patternFlag=self.quickPay.payeeFormatList[index].patternFlag;

       		 					currField.payeeInputSize = self.quickPay.payeeFormatList[index].payeeInputSize;
       		 					currField.payeeLabelType = self.quickPay.payeeFormatList[index].payeeLabelType;
       	 						if(currField.billerFieldType == 'dropDown'){
       	 							self.quickPay.dropdownList = self.quickPay.payeeFormatList[index].payeeDropdown;

       	 							currField.dropdown = self.quickPay.dropdownList;
       	 						}
       	 						if(self.schedule.schTxnListSubmitBtn=='MODIFY'){
       	 							eval("self.quickPay.consumercode"+index+ "=" +'self.quickPay.consumerCodes[index]');
       	 						}
       	 						self.quickPay.consumerCodeFields.push(currField);
       	 					}
        					if(self.schedule.accountType== 'CCD'){
         						self.common.updateBal('onCCDAccountSelectionBalCall');
         					}
         					else{
         						self.common.updateBal('onAccountSelectionBalCall');
         					}
     					}


         				}


     }

     self.payCard={
    		 cardTypeList:[],
    		 searchFromDate : new Date(),
    		 searchToDate : new Date(),
    		 fromSearchResult : false,
    		 searchFromDate_year:"",
    		 searchFromDate_month:"",
    		 searchFromDate_day:"",
    		 searchToDate_year:"",
    		 searchToDate_month:"",
    		 searchToDate_day:"",
    		 selectedCompltTxn:"",
    		 authStatus:false,
			 authFlag:'',
			 authField:'',
			statusFromHost:'',
			successMessage:'',
			fromAuthPage : false,
			reason:'',
			secTxnFlag:'',
			initiatorAcc:'',
			cardNumber:'',
			txnRefNumber:'',
			reason:'',
			serviceType:'',
			debitAmt:'',
			selectedCardType:'',
			displayAccount:'',

			totalAmount:'',
			mutipleList:[],
			totalEntry:'',
			channelId:'',
			failReason:'',
			btnClicked:'',

			chargeInd:'',
			selPurpose:'',
			selectedReason:'',
			selectedReason1:'',
			selectedReason2:'',
			selectedReason3:'',
			totalTxnAmt:'',
			beneficiaryName:'',

			remitBackFlag:false,
    		 initSearchPage : function(responseList) {
					//self.payCard.cardHistoryTab = true;
					//self.common.rakIncompleteTab = false;
					//self.common.viewHistoryTab = false;
    			 if (!responseList[0].hasOwnProperty('errorMessage')&&  !self.common.fromAuthPage){
					if (responseList[0].hasOwnProperty("rakCardTypeList")) {
						self.payCard.cardTypeList = responseList[0].rakCardTypeList;

					}

					if (responseList[0].hasOwnProperty('scheduleList')) {
						self.payCard.scheduleList = responseList[0].scheduleList;
					}



				    if(responseList[0].selectedTxnType=='')
						{
				    	self.payCard.selectedCardType =responseList[0].rakCardTypeList[0].cardCode;
						}
						//self.payCard.selectedCardType = responseList[0].selectedTxnType;
   			}

				},

				setFromToDate : function() {
					self.common.displayDate = self.payCard.searchFromDate;
					self.utils.populateCurrentDateDetails();

					self.payCard.searchFromDate_day =self.common.date;
					self.payCard.searchFromDate_month=self.common.month;
					self.payCard.searchFromDate_year=self.common.year;

					self.common.displayDate = self.payCard.searchToDate;
					self.utils.populateCurrentDateDetails();

					self.payCard.searchToDate_day =self.common.date;
					self.payCard.searchToDate_month=self.common.month;
					self.payCard.searchToDate_year=self.common.year;
				 },

				 setHistoryDate : function(){
						self.payCard.searchToDate = new Date();
						self.payCard.searchFromDate = new Date().addMonths(-1);

						self.common.displayDate = self.common.searchFromDate;
						self.utils.populateCurrentDateDetails();

						self.payCard.searchFromDate_day =self.common.date;
						self.payCard.searchFromDate_month=self.common.month;
						self.payCard.searchFromDate_year=self.common.year;


					},

				 setInitialFromToDate : function() {
					 	self.payCard.searchFromDate = new Date().addMonths(-1);
					 	self.payCard.searchToDate = new Date().addMonths(1);
						self.common.displayDate = self.payCard.searchFromDate;
						self.utils.populateCurrentDateDetails();

						self.payCard.searchFromDate_day =self.common.date;
						self.payCard.searchFromDate_month=self.common.month;
						self.payCard.searchFromDate_year=self.common.year;

						self.common.displayDate = self.payCard.searchToDate;
						self.utils.populateCurrentDateDetails();

						self.payCard.searchToDate_day =self.common.date;
						self.payCard.searchToDate_month=self.common.month;
						self.payCard.searchToDate_year=self.common.year;
					 },

				 initCompltTransferListPage : function(responseList) {
						if (responseList[0].hasOwnProperty('scheduleList')) {
							self.payCard.scheduleList = responseList[0].scheduleList;
							//self.payCard.selectedScheduleItem = responseList[0].scheduleList[0];
							self.payCard.fromSearchResult = false;
						}
					},

					clearSearchHistory : function() {
						self.payCard.cardTypeList = [],
						self.payCard.searchFromDate = new Date();
						self.payCard.searchToDate = new Date();
						self.payCard.fromSearchResult = false;
						self.payCard.searchFromDate_year = '';
						self.payCard.searchFromDate_month = '';
						self.payCard.searchFromDate_day = '';
						self.payCard.searchToDate_year = '';
						self.payCard.searchToDate_month = '';
						self.payCard.searchToDate_day = '';
						self.payCard.selectedCompltTxn = '';
						self.payCard.selectedCardType = '',
						self.payCard.statusFromHost='',
						self.payCard.authStatus=false,
						self.payCard.authFlag='',
						self.payCard.authField='',
						self.payCard.successMessage='',
						self.payCard.fromAuthPage=false,
						self.payCard.reason='',
						self.payCard.secTxnFlag='',
						self.payCard.cardNumber='',
						self.payCard.txnRefNumber='',
						self.payCard.reason='',
						self.payCard.serviceType='',
						self.payCard.debitAmt='',
						self.payCard.selectedCardType ='';
						self.payCard.displayAccount='';
						self.payCard.totalEntry='';
						self.payCard.totalAmount='';
						self.payCard.totalTxnAmt='';
	    				self.payCard.mutipleList=[];
	    				self.payCard.channelId='';
	    				self.payCard.failReason='';
	    				self.payCard.btnClicked='';

	    				self.payCard.chargeInd='';
	    				self.payCard.selPurpose='';
	    				self.payCard.selectedReason='';
	    				self.payCard.selectedReason1='';
	    				self.payCard.selectedReason2='';
	    				self.payCard.selectedReason3='';
	    				self.payCard.remitBackFlag=false;
	    				self.payCard.requestedBy='';
	    				self.payCard.approvedBy='';
	    				self.payCard.userRemarks='';
	    				self.payCard.txnStatus='';
	    				self.payCard.beneficiaryName='';
	    				
	    				
	    			},

	    			initScheduleTransferDetailsPage:function(responseList){
	    				if (responseList[0].hasOwnProperty('pmtStatus')) {
	    					self.payCard.statusFromHost = responseList[0].pmtStatus;
	    				}
	    				if (responseList[0].hasOwnProperty('toAccountDetails')){
	    					self.payCard.initiatorAcc = responseList[0].toAccountDetails;
	    				}
	    				if(responseList[0].hasOwnProperty('cardNumber')){
	    					self.payCard.cardNumber = responseList[0].cardNumber;
	    				}
	    				if (responseList[0].hasOwnProperty('txnRefNumber')){
	    					self.payCard.txnRefNumber = responseList[0].txnRefNumber;
	    				}
	    				if (responseList[0].hasOwnProperty('reason')){
	    					self.payCard.reason = responseList[0].reason;
	    				}
	    				if (responseList[0].hasOwnProperty('serviceType')){
	    					self.payCard.serviceType = responseList[0].serviceType;
	    				}
	    				if (responseList[0].hasOwnProperty('debitAmt')){
	    					self.payCard.debitAmt = responseList[0].debitAmt;
	    				}
	    				if (responseList[0].hasOwnProperty('mutipleList')){
	    					self.payCard.mutipleList = responseList[0].mutipleList;
	    				}
	    				if (responseList[0].hasOwnProperty('beneficiaryName')){
	    					self.payCard.beneficiaryName=responseList[0].beneficiaryName;
	    				}
	    				
	    				
	    				if (responseList[0].hasOwnProperty('chargesRakToll')){
	    					self.payBill.chargesRakToll=responseList[0].chargesRakToll;
	    				}
	    				if (responseList[0].hasOwnProperty('amountChargesRadio')){
	    					self.payBill.amountChargesRadio=responseList[0].amountChargesRadio;
	    				}
	    				if (responseList[0].hasOwnProperty('totalAmountRaktoll')){
	    					self.payBill.totalAmount=responseList[0].totalAmountRaktoll;
	    				}
	    				
	    				self.payCard.displayAccount=responseList[0].displayAccount;

	    				//added for multiple payment
	    				self.payCard.totalEntry=responseList[0].totalEntry;

	    				self.payCard.totalAmount=responseList[0].totalAmount;
	    				self.payCard.totalTxnAmt=responseList[0].totalTxnAmt;
	    				
	    				self.payCard.channelId=responseList[0].channelId;
	    				self.payCard.failReason=responseList[0].failReason;


	    				self.payCard.chargeInd=responseList[0].chargeInd;
	    				self.payCard.selPurpose=responseList[0].selPurpose;
	    				self.payCard.selectedReason=responseList[0].SELECTEDREASON;
	    				self.payCard.selectedReason1=responseList[0].ENTEREDREASON1;
	    				self.payCard.selectedReason2=responseList[0].ENTEREDREASON2;
	    				self.payCard.selectedReason3=responseList[0].ENTEREDREASON3;
	    				self.payCard.requestedBy=responseList[0].requestedBy;
	    				self.payCard.approvedBy=responseList[0].approvedBy;
	    				self.payCard.userRemarks=responseList[0].userRemarks;
	    				self.payCard.txnStatus=responseList[0].txnStatus;
	    				
	    				
	    			},
	    			//added for cancel flow

	    			initAuthPage : function(responsesList) {
	    				if(!responsesList[0].hasOwnProperty('errorMessage') && rootScope.rakCorpInit.corpModel.backFlag !='Y' ){
	    					
	    					rootScope.rakPayee.payCard.reason='';
	    					if (responsesList[0].hasOwnProperty('pmtStatus')) {
		    					self.payCard.statusFromHost = responsesList[0].pmtStatus;
		    					self.payCard.beneficiaryName = responsesList[0].beneficiaryName;
		    				}
	    					if(responsesList[0].auth == "")
	     						self.payCard.authStatus=false;
	     					else
	     					{
	     						self.payCard.authStatus=true;
	     						self.payCard.authFlag = responsesList[0].auth;
	     					}
	    				}

	    			},
	    			initSuccessPage : function(responseList) {
	    				self.common.nextApprover ="";
	    				self.payCard.successMessage = responseList[0].successMsg;
	    				self.common.nextApprover = responseList[0].nextApprover;
	    			}
     		},


     		self.amendStandingInst = {

     				ccSelected : "",

     				ccList : [],
     				noOfMonthsList : [],
     				debitChargeList : [],
     				dateDaysList:[],
     				debitAccSelected : "",
     				paymentPercentage : "",
     				changeSIDate : "",
     				debitAccSelected : "",
     				tempHold : "",
     				noOfMonths : "",
     				minimumAmountDue:"",
     				perentageCurrBal:"",
     				isDetailsFetched:"",
     				StandingInsStatus:"",
     				selectedDate:"",

     				responseText : [],



     				auth : "",
     				transactionPassword : "",
     				isBack : "",
     				flatAmount:"",
     				numberCheckFlag:false,
     				dReturn:'',
     		         message:"",

     				resetAmendStandingInst : function() {


     					self.amendStandingInst.responseText = [];
     					self.amendStandingInst.transactionPassword = "";

     					self.amendStandingInst.noOfMonthsList = [];
     					self.amendStandingInst.debitChargeList = [];
     					self.amendStandingInst.dateDaysList = [];

     					self.amendStandingInst.paymentPercentage = "";
     					self.amendStandingInst.selectedDate = "";
     					self.amendStandingInst.changeSIDate = "";
     					self.amendStandingInst.debitAccSelected = "";
     					self.amendStandingInst.tempHold = "";
     					self.amendStandingInst.noOfMonths = "";
     					self.amendStandingInst.perentageCurrBal = "";

     					self.amendStandingInst.previewResponse = [];
     					self.amendStandingInst.auth = "";
     					self.amendStandingInst.isDetailsFetched="";
     					self.amendStandingInst.StandingInsStatus="";
     					self.amendStandingInst.flatAmount="";


     					self.amendStandingInst.ccList = [];
     					self.RakCCStandingInstModel.isDetailsFetchedForAmendSI=false;


     					self.amendStandingInst.isBack = false;
     					self.amendStandingInst.numberCheckFlag=false;
     					self.amendStandingInst.dReturn='';
     					self.amendStandingInst.StandingInsDisplay = false;
     					self.common.message="";


     				},

     				initAmendStandingInst : function(responseList) {
     					if (!responseList[0].hasOwnProperty('errorMessage')
     							&& !self.amendStandingInst.isBack) {
     						self.amendStandingInst.isBack = false;

     						if (responseList[0].hasOwnProperty('ccList')) {
     							self.amendStandingInst.ccList = responseList[0].ccList;
     							self.amendStandingInst.ccSelected="";

     						}

     						if (responseList[0].hasOwnProperty('isDetailFetched')) {


     							self.amendStandingInst.isDetailsFetched = responseList[0].isDetailFetched;


     							if(self.RakCCStandingInstModel.isDetailsFetchedForAmendSI==true)
     								{
     								self.amendStandingInst.isDetailsFetched = "Y";
     								self.amendStandingInst.changeSIDate ='Y';
     								self.amendStandingInst.tempHold='N';

     								if (responseList[0].SIMODE== 'P') {
     									self.amendStandingInst.paymentPercentage =responseList[0].SIMODE;
     									self.amendStandingInst.perentageCurrBal =  Number(responseList[0].SIPERCENTAGE);
     		                         }

     								else if (responseList[0].SIMODE== 'M') {
     									self.amendStandingInst.paymentPercentage =responseList[0].SIMODE;
     								}

     								else if (responseList[0].SIMODE== 'F') {
     									self.amendStandingInst.paymentPercentage =responseList[0].SIMODE;
     									self.amendStandingInst.flatAmount=responseList[0].SIFLATAMOUNT;
     		                         }

     								if (responseList[0].SIPAYDAY != '') {
     									self.amendStandingInst.changeSIDate ='N';
     									self.amendStandingInst.selectedDate = responseList[0].SIPAYDAY;

     									self.amendStandingInst.ccSelected=self.RakCCStandingInstModel.selectedCreditCard;
     								}

     								if (responseList[0].SIDEBITACCNUM != '') {
     									self.amendStandingInst.debitAccSelected = responseList[0].SIDEBITACCNUM;
     		                         }

     								if (responseList[0].SITEMPHOLD == 'Y') {
     									self.amendStandingInst.tempHold = responseList[0].SITEMPHOLD;
     									self.amendStandingInst.noOfMonths=responseList[0].SITEMPHOLDMONTH;
     		                         }

     								}
     							//CHANGES DONE AS FIX OF PROUAT-1995 AND 1991 END

     							if (self.amendStandingInst.isDetailsFetched == "Y") {

     								if (responseList[0].hasOwnProperty('SIStatus')) {
     									self.amendStandingInst.StandingInsStatus = responseList[0].SIStatus;

     									if(self.amendStandingInst.StandingInsStatus == ''){
     										self.amendStandingInst.StandingInsDisplay =true;
     									}
     									else
     										{
     										self.amendStandingInst.StandingInsDisplay =false;
     										}

     								}


     		                     }

     						}

     					}
     				}
     			};

     		self.schedule={
    		 selectedBiller:'',
    		 amountSelectionRqd:false,
    		 fromAccounts:[],
    		 frequencyType:[],
    		 minAmount:'',
    		 maxAmount:'',
    		 outAmount:'',
    		 amount:'',
    		 selectedFrequency:'O',
    		 selectedFromAccount:'',
    		 billerType:'N',
    		 amountType:'1',
    		 recFrequencySelected:false,
    		 recFreq:'',
    		 amountDisp:'',
    		 authStatus:false,
    		 authFlag:'',
    		 txnPwd:'',
    		 accountType:'',
    		 noOfTransfer:'',
    		 immediateDueOn:'',
    		 btnSelected:'',

    		 ///added for stop instance

    			immediatePaymentDueOn:"",
    			dueDate:"N",
    			instanceArray: "",
    			selectAll:false,
    			instanceListJson:[],
    			instanceResultList:[],
    			isBackclicked:false,
    			isCheckBoxSelected:false,
    			stopBtnClicked:false,
    			amountDue:'',
    			stoppedTxnList:[],

//added for txn details

    			initorID:'',
    			installments:'',
    			destId:'',
    			entRemarks:'',
    			chargeInd:'',
    			selPurpose:'',
    			initorType:'',
    			recFreq:'',

    			selectedReason:'',
    			selectedReason1:'',
    			selectedReason2:'',
    			selectedReason3:'',
			cardNumber:'',
    			txnRefNumber:'',
    			reason:'',
    			serviceType:'',
    			debitAmt:'',
    			fromAcc:'',
    			noOfInstanceLeft:'',

    			///added for modify

    			outStandingAmtFlag:'',
				minMaxAmtFlag:'',
				availableAmtFlag:'',
				renewalAmtFlag:'',
				amtDueFlag:'',
				outDisableFlag:'',
				renewalAmt:'',
				availBillAmt:'',
				service:'',
				isModified:false,
				displayOutAmt:'',

				//added for paymnet status
				debitAmount:'',
				refDate:'',
				txnDate:'',
				bnfName:'',
				hostRefNo:'',
				tempTxnId:'',
				failReason:'',
				displayAccount:'',
				nextApprover:'',
				txnStatus:'',
				consumerNo:'',
    		 initEditPayNowPage : function(responseList) {

        			 self.payBill.billsTab=true;
      				 self.payBill.quickPayTab=false;
      				 self.payBill.history=false;

        				if(responseList==null){
        					return;
        				}

        				if (responseList[0].hasOwnProperty('BILLER_NAME')) {
        					self.schedule.selectedBiller =  responseList[0].BILLER_NAME;
        				}
        				/*if (responseList[0].hasOwnProperty('selectedBillerDetails')) {
        					self.schedule.selectedBiller =  responseList[0].selectedBillerDetails;
        				}*/
        				if (responseList[1].hasOwnProperty('service')) {
        					self.schedule.service = (responseList[1].service);
        				}
        				if (responseList[1].hasOwnProperty('consumerNo')) {
           					self.schedule.consumerNo = (responseList[1].consumerNo);
           				  }
        				if (responseList[1].hasOwnProperty('installments')) {
        					self.schedule.noOfTransfer = Number(responseList[1].installments);
        				}

        				if (responseList[1].hasOwnProperty('initorId')) {
        					self.schedule.initAcc = Number(responseList[1].initorId);
        				}


        				///

        				if(!responseList[0].hasOwnProperty('errorMessage')&&!self.common.fromAuthPage)
    					{
	    					if(!responseList[0].hasOwnProperty('accountAvailableBalance')){
		    					self.schedule.outStandingAmtFlag=responseList[0].outStandingAmtFlag;
		    					self.schedule.minMaxAmtFlag=responseList[0].minMaxAmtFlag;
		    					self.schedule.availableAmtFlag=responseList[0].availableAmtFlag;
		    					self.schedule.renewalAmtFlag=responseList[0].renewalAmtFlag;
		    					self.schedule.amtDueFlag=responseList[0].amtDueFlag;
		    					self.schedule.outDisableFlag=responseList[0].outDisableFlag;
		    					self.schedule.renewalAmt=responseList[0].renewalAmt;
		    					self.schedule.availBillAmt=responseList[0].availBillAmt;

	    					}

    					}
        				///
        				if(!responseList[0].hasOwnProperty('errorMessage')&&!self.common.fromAuthPage ){
        					if(self.schedule.selectedBiller=='DEWA' || self.schedule.selectedBiller=='FEWA' || self.schedule.selectedBiller=='SEWA' ||
        							self.schedule.selectedBiller=='ETISALAT' || self.schedule.selectedBiller=='DU')
        						self.schedule.amountSelectionRqd=true;

        		   			//self.utils.populateCurrentDateDetails();

        					self.schedule.fromAccounts=responseList[1].fromAccountsList;
        					self.schedule.frequencyType=responseList[1].frequencyType;
        					self.schedule.minAmount=responseList[0].minAmt;
        					self.schedule.maxAmount=responseList[0].maxAmt;
        					self.schedule.outAmount=responseList[0].outAmt;
        					self.schedule.amountDue=responseList[0].amtDue;
        					self.schedule.availBillAmt=responseList[0].availBillAmt;

        					if(self.schedule.availBillAmt!='')
        						self.schedule.displayOutAmt = self.schedule.availBillAmt;
        					else
        						self.schedule.displayOutAmt = self.schedule.outAmount;

        					//self.common.displayDate = 	new Date(self.schedule.selectedTxn.txnDate);

        					self.common.dd = new Date(self.schedule.selectedTxn.txnDate, 'DD-MM-YY');

    						if(Object.prototype.toString.call(self.common.dd) === "[object Date]"){
    							if(isNaN(self.common.dd.getTime())){
    								if(self.schedule.selectedTxn.txnDate.indexOf("/")!=-1){
    									self.common.displayDate = new Date(self.schedule.selectedTxn.txnDate.split('/')[1]+"/"+
    											self.schedule.selectedTxn.txnDate.split('/')[0]+"/"+self.schedule.selectedTxn.txnDate.split('/')[2]);
    								}
    								else{
    									self.common.displayDate = new Date(self.schedule.selectedTxn.txnDate.split('-')[1]+"/"+
    											self.schedule.selectedTxn.txnDate.split('-')[0]+"/"+self.schedule.selectedTxn.txnDate.split('-')[2]);
    								}
    							}
    							else{
    								self.common.displayDate = self.common.dd;
    							}
    						}
    						else{
    							self.common.displayDate = self.common.dd;
    						}

        					self.schedule.amount = Number(self.schedule.selectedTxn.txnAmount.replace(',',''));
        					if(self.schedule.amount == Number(self.schedule.outAmount.split(" ")[1])){
        						self.schedule.amountType = '2';
        						self.schedule.amount= self.schedule.outAmount;
        					}
        					if(rootScope.rakPendingApproval.pendingApprovalTab=='PIA'){
        						if (responseList[1].hasOwnProperty('recFreq')) {
                					var freq = responseList[1].recFreq;
                				}
	        					if(self.schedule.frequencyType){
	        				          for(var temp in self.schedule.frequencyType){
	        			  					if(self.schedule.frequencyType[temp].frequencyTypeDesc==freq){
	        			  						self.schedule.selectedFrequency=self.schedule.frequencyType[temp].frequencyTypeCode;
	        			  						self.schedule.selectedFrequencyDisp=self.schedule.frequencyType[temp].frequencyTypeDesc;
	        			  						self.schedule.noOfTransfer=responseList[1].installments;
	        			  						break;
	        			  					}
	        			  				}
	        					}
        					}else{
	        					if(self.schedule.frequencyType){
	        				          for(var temp in self.schedule.frequencyType){
	        			  					if(self.schedule.frequencyType[temp].frequencyTypeCode==self.schedule.selectedTxn.txnFrequency){
	        			  						self.schedule.selectedFrequency=self.schedule.frequencyType[temp].frequencyTypeCode;
	        			  						self.schedule.selectedFrequencyDisp=self.schedule.frequencyType[temp].frequencyTypeDesc;
	        			  						self.schedule.noOfTransfer=responseList[1].installments;
	        			  						break;
	        			  					}
	        			  				}
	        					}
        					
        					}
        					//self.schedule.selectedFrequencyDisp=self.schedule.selectedTxn.txnFrequency;

        					if(self.schedule.fromAccounts){
      				          for(var temp in self.schedule.fromAccounts){
      			  					if(self.schedule.fromAccounts[temp].accountNumber==self.schedule.initAcc){
      			  						self.schedule.selectedFromAccount=self.schedule.fromAccounts[temp].accountIndex;
      			  						self.schedule.accountType = self.schedule.fromAccounts[temp].accountType;
      			  						break;
      			  					}
      			  				}
        					}

        					if(self.schedule.accountType== 'CCD'){
        						self.common.updateBal('onCCDAccountSelectionBalCall');
        					}
        					else{
        						self.common.updateBal('onAccountSelectionBalCall');
        					}


        				}


				},

				setPayBillDate:function() {
    				self.schedule.amountToBeEntered = false;
    				self.utils.populateCurrentDateDetails();
    				if(self.schedule.billerType == 'Y' && self.schedule.amountType == "1")
    					self.schedule.amountToBeEntered = true;
    				if(self.schedule.billerType == 'N')
    					self.schedule.amountToBeEntered = true;

    				if(self.schedule.selectedFrequency != 'O')
    					self.schedule.recFrequencySelected = true;
    		    },

    			  getEventSendAgainPayement:function(){
        				var eventSel='';

        				if(self.schedule.selectedFrequency != 'O'){

    					eventSel='onRecEditPayBillNowSend';
        			}

        			else{
        				eventSel='onSingleEditPayBillSend';
        			}
    				if(self.schedule.amountType=='1'){
    					self.schedule.amountSelection = "E";
    				}
    				else{
    					self.schedule.amountSelection = "O";
    					self.schedule.amount = "";
    				}

        	    				return eventSel;


        			},


        		checkDirty:function(){

        				if(self.schedule.isModified==false && jQuery("div.modTxn").find(".ng-dirty").length!=0 && !self.schedule.fromAuthPage){
        					self.schedule.isModified= true;

        					}
        				},

    		    getEventForPayement:function(){
    				var eventSel='';

    				if(self.schedule.schTxnListSubmitBtn=='MODIFY'){
    					if(jQuery("div.modTxn").find(".ng-dirty").length==0 && !self.schedule.fromAuthPage && self.schedule.isModified == false){
    						//self.schedule.isModified = true;
    						rootScope.showErrorPopup(rootScope.appLiterals.APP.RAKSEND_MONEY.RAKTRANSFER_VIEWSCHEDULE.NOMODIFYERROR);
    						return;
    			         }

    					else{
    	    				if(self.schedule.selectedFrequency != 'O'){

    	    					eventSel='onRecEditPayBillNowSend';
    	        			}

    	        			else{
    	        				eventSel='onSingleEditPayBillSend';
    	        			}
    	    				if(self.schedule.amountType=='1'){
    	    					self.schedule.amountSelection = "E";
    	    				}
    	    				else{
    	    					self.schedule.amountSelection = "O";
    	    					self.schedule.amount = "";
    	    				}

    	    				
    	    					}
    					
    					scope.setEvent(eventSel);
    				}

    			},
    			initAuthPage:function(responsesList){
    				if(!responsesList[0].hasOwnProperty('errorMessage') && rootScope.rakCorpInit.corpModel.backFlag !='Y'){

    					self.schedule.recFreq = responsesList[0].recFreq;
    					self.schedule.amountDisp = responsesList[0].amount;
    					self.schedule.displayDate = responsesList[0].txnDate;
    					self.payBill.balCheck = responsesList[0].balCheck;
    					self.payBill.poolBalMsg = responsesList[0].MESSAGE;

    					if(responsesList[0].auth == "")
     						self.schedule.authStatus=false;
     					else
     					{
     						self.schedule.authStatus=true;
     						self.schedule.authFlag = responsesList[0].auth;
     					}
    				}
    			},
    			 initSuccessPage:function(responsesList){
     				if(!responsesList[0].hasOwnProperty('errorMessage')){
     					if(responsesList[0].hasOwnProperty('transferStatusMessage')){
     						self.schedule.successMessage = responsesList[0].transferStatusMessage;
     					}
	     				if(responsesList[0].hasOwnProperty('successMsg')){
	 						self.schedule.successMessage = responsesList[0].successMsg;
	 					}
     				}
     			},

     			initStopSuccessPage:function(responsesList){
     				if(!responsesList[0].hasOwnProperty('errorMessage'))
     					self.schedule.successMessage = responsesList[0].message;
     			},

     			getBalanceEvent:function(){
     				if(self.schedule.fromAccounts[self.schedule.selectedFromAccount].accountType== 'CCD'){
						self.common.updateBal('onCCDAccountSelectionBalCall');
					}
					else{
						self.common.updateBal('onAccountSelectionBalCall');
					}
     			},

     			clearScheduleData : function() {

     				self.schedule.selectedBiller='';
     				self.schedule.amountSelectionRqd=false;
     				self.schedule.fromAccounts=[];
     				self.schedule.frequencyType=[];
     				self.schedule.minAmount='';
     				self.schedule.maxAmount='';
     				self.schedule.outAmount='';
     				self.schedule.amount='';
     				self.schedule.selectedFrequency='O';
     				self.schedule.selectedFromAccount='';
     				self.schedule.billerType='N';
     				self.schedule.amountType='1';
     				self.schedule.recFrequencySelected=false;
     				self.schedule.recFreq='';
     				self.schedule.amountDisp='';
     				self.schedule.authStatus=false;
     				self.schedule.authFlag='';
     				self.schedule.txnPwd='';
     				self.schedule.accountType='';
     				self.schedule.noOfTransfer='';
     				self.schedule.immediateDueOn='';
     				self.schedule.nextApprover='';
     				///aded for stop instance
     				//added for modify flow



     				  self.schedule.immediatePaymentDueOn="";
     					self.schedule.dueDate="N";
     					self.schedule.instanceArray="";
     					self.schedule.selectAll=false;
     					self.schedule.instanceListJson=[];
     					self.schedule.instanceResultList=[];
     					self.schedule.isBackclicked=false;
     					self.schedule.isCheckBoxSelected=false;
     					self.schedule.stopBtnClicked=false;
     					//addeed for details fix

     					self.schedule.installments='';
     					self.schedule.initorID='';
     					self.schedule.destId='';
     					self.schedule.entRemarks='';
     					self.schedule.chargeInd='';
     					self.schedule.selPurpose='';
     					self.schedule.initorType='';
     					self.schedule.recFreq='';
     					self.schedule.selectedReason='';
     					self.schedule.selectedReason1='';
     					self.schedule.selectedReason2='';
     					self.schedule.selectedReason3='';
					self.schedule.cardNumber='';
						self.schedule.txnRefNumber='';
						self.schedule.reason='';
						self.schedule.serviceType='';
						self.schedule.debitAmt='';
						self.schedule.consumerNo ='';
	       				 
						self.schedule.noOfInstanceLeft='';
							self.schedule.btnSelected='';

							self.schedule.outStandingAmtFlag='';
	    					self.schedule.minMaxAmtFlag='';
	    					self.schedule.availableAmtFlag='';
	    					self.schedule.renewalAmtFlag='';
	    					self.schedule.amtDueFlag='';
	    					self.schedule.outDisableFlag='';
	    					self.schedule.renewalAmt='';
	    					self.schedule.availBillAmt='';
	    					self.schedule.service='';
	    					self.schedule.isModified=false;
						self.schedule.displayOutAmt='';

						self.schedule.debitAmount='';
						self.schedule.refDate='';
						self.schedule.txnDate='';
						self.schedule.bnfName='';
						self.schedule.hostRefNo='';
						self.schedule.tempTxnId='';
						self.schedule.failReason='';
						self.schedule.displayAccount='';


    			},

    			initStopTransferAuth : function(responsesList) {

    				if(!responsesList[0].hasOwnProperty('errorMessage')){
    					if(responsesList[0].hasOwnProperty('instanceList')){

    				self.schedule.immediateDueOn = responsesList[0].instanceList[0].immediatePaymentDueOn;
    				self.schedule.instanceArray=JSON.stringify(responsesList[0].instanceList);
    					}
    					if(responsesList[0].auth == "")
    							self.schedule.authStatus=false;
    						else
    						{
    							self.schedule.authStatus=true;
    							self.schedule.authFlag = responsesList[0].auth;
    						}
    				}
    			},
    			initDetails : function(responseList) {
    				if (!responseList[0].hasOwnProperty('errorMessage')) {

    					if(responseList[0].hasOwnProperty('initorID')){
							self.schedule.fromAcc = responseList[0].initorID;
						}
    						if(responseList[0].hasOwnProperty('installments')){
    							self.schedule.noOfTransfers = responseList[0].installments;
    						}
    						if(responseList[0].hasOwnProperty('recFreq')){
    							self.schedule.recFreq = responseList[0].recFreq;
    						}
    						if(responseList[0].hasOwnProperty('cardNumber')){
    	    					self.schedule.cardNumber = responseList[0].cardNumber;
    	    				}
    	    				if (responseList[0].hasOwnProperty('txnRefNumber')){
    	    					self.schedule.txnRefNumber = responseList[0].txnRefNumber;
    	    				}
    	    				if (responseList[0].hasOwnProperty('reason')){
    	    					self.schedule.reason = responseList[0].reason;
    	    				}
    	    				if (responseList[0].hasOwnProperty('serviceType')){
    	    					self.schedule.serviceType = responseList[0].serviceType;
    	    				}
    	    				if (responseList[0].hasOwnProperty('debitAmt')){
    	    					self.schedule.debitAmt = responseList[0].debitAmt;
    	    				}
    	    				if (responseList[0].hasOwnProperty('stoppedTxns')){
    	    					self.schedule.stoppedTxnList = responseList[0].stoppedTxns;
    	    				}
    	    				if (responseList[0].hasOwnProperty('displayAccount')){
    	    					self.schedule.displayAccount = responseList[0].displayAccount;
    	    				}
    	    				if (responseList[0].hasOwnProperty('chargesRakToll')){
    	    					self.payBill.chargesRakToll=responseList[0].chargesRakToll;
    	    				}
    	    				if (responseList[0].hasOwnProperty('amountChargesRadio')){
    	    					self.payBill.amountChargesRadio=responseList[0].amountChargesRadio;
    	    				}
    	    				if (responseList[0].hasOwnProperty('totalAmountRaktoll')){
    	    					self.payBill.totalAmount=responseList[0].totalAmountRaktoll;
    	    				}
    	    				self.schedule.noOfInstanceLeft=responseList[0].noOfInstanceLeft;
    					}
    			},

    			initSendAgainPage : function(responseList) {

       			 self.payBill.billsTab=true;
     				 self.payBill.quickPayTab=false;
     				 self.payBill.history=false;

       				if(responseList==null){
       					return;
       				}

       				if (responseList[0].hasOwnProperty('BILLER_NAME')) {
       					self.schedule.selectedBiller =  responseList[0].BILLER_NAME;
       				}

       				if (responseList[1].hasOwnProperty('installments') && responseList[1].installments != 1) {
       					self.schedule.noOfTransfer = Number(responseList[1].installments);
       				}

       				if (responseList[1].hasOwnProperty('initorId')) {
       					self.schedule.initAcc = Number(responseList[1].initorId);
       				}

       				if (responseList[1].hasOwnProperty('service')) {
       					self.schedule.service = (responseList[1].service);
       				  }
       				if (responseList[1].hasOwnProperty('consumerNo')) {
       					self.schedule.consumerNo = (responseList[1].consumerNo);
       				  }


       				if(!responseList[0].hasOwnProperty('errorMessage')&&!self.common.fromAuthPage)
					{
    					if(!responseList[0].hasOwnProperty('accountAvailableBalance')){
	    					self.schedule.outStandingAmtFlag=responseList[0].outStandingAmtFlag;
	    					self.schedule.minMaxAmtFlag=responseList[0].minMaxAmtFlag;
	    					self.schedule.availableAmtFlag=responseList[0].availableAmtFlag;
	    					self.schedule.renewalAmtFlag=responseList[0].renewalAmtFlag;
	    					self.schedule.amtDueFlag=responseList[0].amtDueFlag;
	    					self.schedule.outDisableFlag=responseList[0].outDisableFlag;
	    					self.schedule.renewalAmt=responseList[0].renewalAmt;
	    					self.schedule.availBillAmt=responseList[0].availBillAmt;

    					}

					}
       				if(!responseList[0].hasOwnProperty('errorMessage')&&!self.common.fromAuthPage ){
       					
       					if(self.schedule.btnSelected=='SENDAGAIN' && !self.common.fromAuthPage){
       						self.common.displayDate = new Date();
          	 				}
          					
       					if(self.schedule.selectedBiller=='DEWA' ||self.schedule.selectedBiller=='FEWA' || self.schedule.selectedBiller=='SEWA' ||
       							self.schedule.selectedBiller=='ETISALAT' || self.schedule.selectedBiller=='DU')
       						self.schedule.amountSelectionRqd=true;

       		   			//self.utils.populateCurrentDateDetails();

       					self.schedule.fromAccounts=responseList[1].fromAccountsList;
       					self.schedule.frequencyType=responseList[1].frequencyType;
       					self.schedule.minAmount=responseList[0].minAmt;
       					self.schedule.maxAmount=responseList[0].maxAmt;
       					self.schedule.outAmount=responseList[0].outAmt;
       					self.schedule.availBillAmt=responseList[0].availBillAmt;

       					if(self.schedule.availBillAmt!='')
    						self.schedule.displayOutAmt = self.schedule.availBillAmt;
    					else
    						self.schedule.displayOutAmt = self.schedule.outAmount;

       					//self.common.displayDate = 	new Date(self.payBill.selectedCompltTxn.txnDate);
       					//self.schedule.amount = Number(self.payBill.selectedCompltTxn.txnAmount);
       					self.schedule.amount = Number(self.payBill.selectedCompltTxn.txnAmountDisp);
       					/*if(self.schedule.amount == Number(self.schedule.outAmount.split(" ")[1])){
       						self.schedule.amountType = '2';
       						self.schedule.amount= self.schedule.outAmount;
       					}*/

       					if (responseList[1].freq=='R' && responseList[1].hasOwnProperty('recFreq') && responseList[1].recFreq!='') {
        					self.schedule.recFreq = responseList[1].recFreq;
        				}
       					else{
       						self.schedule.recFreq = self.constants.ONCE;
       					}

       					if(self.schedule.frequencyType!='' && self.schedule.frequencyType!=''){
       				          for(var temp in self.schedule.frequencyType){
       			  					if(self.schedule.frequencyType[temp].frequencyTypeDesc==self.schedule.recFreq){
       			  						self.schedule.selectedFrequency=self.schedule.frequencyType[temp].frequencyTypeCode;
       			  						self.schedule.selectedFrequencyDisp=self.schedule.frequencyType[temp].frequencyTypeDesc;
       			  						break;
       			  					}
       			  				}
       					}
       					//self.schedule.selectedFrequencyDisp=self.schedule.selectedTxn.txnFrequency;

       					if(self.schedule.fromAccounts){
     				          for(var temp in self.schedule.fromAccounts){
     			  					if(self.schedule.fromAccounts[temp].accountNumber==self.schedule.initAcc){
     			  						self.schedule.selectedFromAccount=self.schedule.fromAccounts[temp].accountIndex;
     			  						self.schedule.accountType = self.schedule.fromAccounts[temp].accountType;
     			  						break;
     			  					}
     			  				}
       					}

       					if(self.schedule.accountType== 'CCD'){
       						self.common.updateBal('onCCDAccountSelectionBalCall');
       					}
       					else{
       						self.common.updateBal('onAccountSelectionBalCall');
       					}


       				}

    			},
    		///added for stop instance

       				initImmediateStopTransfer : function(responsesList) {

       					if (responsesList[0].hasOwnProperty('message')) {
           					self.common.successMessage = responsesList[0].message;
           				}

        				if(!responsesList[0].hasOwnProperty('errorMessage') && !self.schedule.isBackclicked && responsesList[0].hasOwnProperty('instanceList')){
        					self.schedule.instanceList = responsesList[0].instanceList;

        					//self.schedule.immediatePaymentDueOn = responsesList[0].instanceList[].immediatePaymentDueOn;
        				}


        		},


        		initImmediateStopTransferAuth : function(responsesList) {

        			if(!responsesList[0].hasOwnProperty('errorMessage')){

        				if(responsesList[0].auth == "")
        						self.schedule.authStatus=false;
        					else
        					{
        						self.schedule.authStatus=true;
        						self.schedule.authFlag = responsesList[0].auth;
        					}
        			}
        		},

    			onStopSingleInstanceConfirm:function(){
    			self.schedule.instanceListJson=[];
    			self.schedule.instanceArray=[];

    			for(var temp in self.schedule.instanceList){
    				if(self.schedule.instanceList[temp]['checkedFlag']){
    					self.schedule.isCheckBoxSelected=true;
    					self.schedule.instanceListJson.push(self.schedule.instanceList[temp]);

    					}

    			}

    			if(!self.schedule.isCheckBoxSelected){
    				rootScope.showErrorPopup(rootScope.appLiterals.APP.RAK_COMMON.MANDFILED);
    				return;

    			}
    			self.schedule.instanceArray=JSON.stringify(self.schedule.instanceListJson);
    			self.schedule.isCheckBoxSelected=false;
    			scope.setEvent('onStopTransferAuthConfirmClick');

            },

        	getCheckBoxStatus:function(){
    			if(self.schedule.selectAll){
    				for(var temp in self.schedule.instanceList){
    					self.schedule.instanceList[temp].checkedFlag=true;
    				}

    			}

    			else{
    				for(var temp in self.schedule.instanceList){
    					self.schedule.instanceList[temp].checkedFlag=false;
    				}

    			}
    		},
    		initSuccessPage : function(responseList) {
    			self.common.successMessage = responseList[0].message;
    			self.schedule.txnStatus=responseList[0].txnStatus;
    			self.schedule.refId=responseList[0].refId;
    			if(responseList[0].successMsg){
    				self.schedule.successMessage=responseList[0].successMsg;
    			}
    			if(responseList[0].transferStatusMessage){
				       self.schedule.successMessage=responseList[0].transferStatusMessage;
        		}
    			if(responseList[0].nextApprover){
    				  self.schedule.nextApprover=responseList[0].nextApprover;
    			}
    		},

       				///ended for stop instance

    		clearSearchData:function(){
    			self.payBill.selectedBillerType =self.constants.ALL;
    			self.payBill.fromAccount='';
    			self.payBill.setInitialDateForSchedule();

    		},

    		fetchSubmitEvent : function() {
    			var selectedEvent;
    			if(self.schedule.instanceList.length - self.schedule.instanceListJson.length > 0 ){
    				selectedEvent = 'backToInstanceList';
    			}
    			else{
    				selectedEvent = 'backToCriteria';
    			}

    			return selectedEvent;
    		},

    		initSchedulehistoryDetails:function(responsesList)
    		{
    			if(!responsesList[0].hasOwnProperty('errorMessage') && !self.common.fromAuthPage){
    				self.schedule.initorID=responsesList[0].initorID;
    				self.schedule.installments=responsesList[0].installments;
    				self.schedule.entRemarks=responsesList[0].entRemarks;
    				self.schedule.selPurpose=responsesList[0].selPurpose;
    				self.schedule.initorType=responsesList[0].initorType;
    				self.schedule.recFreq=responsesList[0].recFreq;
    				self.schedule.selectedReason=responsesList[0].SELECTEDREASON;
    			    self.schedule.selectedReason1=responsesList[0].ENTEREDREASON1;
    			    self.schedule.selectedReason2=responsesList[0].ENTEREDREASON2;
    			    self.schedule.selectedReason3=responsesList[0].ENTEREDREASON3;




    			}
    		},

    		initPaymentStatusDetails:function(responsesList)
    		{
    			if(!responsesList[0].hasOwnProperty('errorMessage') && !self.common.fromAuthPage){
    				self.schedule.statusFromHost = responsesList[0].pmtStatus;
    				self.schedule.initorID=responsesList[0].initorID;
    				self.schedule.debitAmount=responsesList[0].debitAmt;
    				self.schedule.refDate=responsesList[0].REQ_DATE;
    				self.schedule.txnDate=responsesList[0].TXN_DATE;
    				self.schedule.bnfName=responsesList[0].beneficiaryName;
    				self.schedule.hostRefNo=responsesList[0].HOST_REF_NO;
    				self.schedule.tempTxnId=responsesList[0].REF_ID;
    			    self.schedule.failReason=responsesList[0].failReason;




    			}
    		}


     	}

};
