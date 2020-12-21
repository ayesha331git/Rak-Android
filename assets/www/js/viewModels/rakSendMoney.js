
/* JavaScript content from js/viewModels/rakSendMoney.js in folder common */
App.viewModels.rakSendMoney = function(scope, rootScope,Logger,ActionProcessor) {

	var self = this;
	//m1 = self;
	self.scope = scope;
	self.rootScope = rootScope;
	self.acceptTermscondition="N";
	self.sendMoneyTab = true;
	self.benfTab = false;
	self.history = false;
	self.isOprAvailabel=false;
	self.noOprAccounts=false;
	self.noCCAccounts=false;
	self.operativeList={};
	self.cebCountry='PH';
	self.indiaCountry='IN';
	self.limitDispFlag="N";

	self.clearTab = function() {
		self.sendMoneyTab = false;
		self.benfTab = false;
		self.history = false;
		self.sendMoney.bankTransferTab = false;
		self.sendMoney.rakMoneyTab = false;
		self.sendMoney.mobileCashTab = false;
		self.common.scheduleTransferTab = false;
		self.common.rakIncompleteTab = false;
		self.common.viewHistoryTab = false;

	}

	self.cardOnlyCustCheck=function(responseList){
		self.operativeList=responseList.operativeAccountsList;
		if(self.operativeList.length==0){
			self.isOprAvailabel=true;
			self.noOprAccounts=true;
		}
		if(responseList.ccList.length==0){
			self.noCCAccounts=true;
		}
	};
	self.cardOnlyCustFunction=function(responseList){

		/*if(self.isOprAvailabel){
			rootScope.showErrorPopup(rootScope.appLiterals.APP.RAKSEND_MONEY.RAKTRANSFERS_PAYNOW_PAGE.ELIGIBITYCHEK);
			return;
		}
		else{
			scope.setGlobalEvent('onRakMoveMoneyClick');
		}*/

		scope.setGlobalEvent('onRakMoveMoneyClick');

	};

	self.RAKSENDMONEYBENFTYPE={
			OWNACT:"OWNACT",
			RAKBANK:"RBF",
			WITHINUAE:"UBF",
			OUTSIDEUAE:"OBF",
			CASHPAYOUT:"CASH"
		};
	self.getExchangePopUp=function(){
		self.common.exchangePopUp=true;
	};



	// To be removed once the step up authentication



		self.checkTermsAndConditionFlg=function(){

				if(self.acceptTermscondition && self.acceptTermscondition==='N' ){
				rootScope.showErrorPopup(rootScope.appLiterals.APP.RAK_COMMON.SELECTTERMSANDCONDITION);
				self.acceptTermscondition="N";
				}
			else {
				scope.setEvent('onStepupAuthenticateTermAndConditionProceedClick');
				self.acceptTermscondition="Y";
			}

			};

			self.fetchDisclaimer =  function(htmlFile) {
				window.open(rootScope.rakHome.disclaimerURL.replace(/['"]+/g,'')+htmlFile+"?"+"parameter=new Date.getTime()",'_new','location=no,hardwareback=no,EnableViewPortScale=yes');
			};




	//


	self.alterTxnCurrenyArray=function(){
		if(self.sendMoney.currencyList){
			for(var temp in self.sendMoney.currencyList){
				self.sendMoney.currencyList[temp]['currencyDesc']=self.sendMoney.currencyList[temp]['currencyDesc']+" "+rootScope.appLiterals.APP.RAKSEND_MONEY.RAKTRANSFERS_PAYNOW_PAGE.TRANSFERCURR;

			}

		}


	}


	self.alterTxnCurrenyArrayForRakMoney=function(){
		if(self.rakMoney.currencyList){
			for(var temp in self.rakMoney.currencyList){
				self.rakMoney.currencyList[temp]['currencyDesc']=self.rakMoney.currencyList[temp]['currencyDesc']+" "+rootScope.appLiterals.APP.RAKSEND_MONEY.RAKTRANSFERS_PAYNOW_PAGE.TRANSFERCURR;

			}

		}


	}

	self.regenerateOtp=function(eventName){

		var msg=rootScope.rakHome.otpModel.otpModeSelected==rootScope.rakHome.otpModel.MODESCONSTANT.SMS ? rootScope.appLiterals.APP.RAK_COMMON.OTP_MSG :rootScope.appLiterals.APP.RAK_COMMON.OTP_EMAIL_MSG;

				ActionProcessor.setEvent(eventName).then(function(payload) {

					//console.log(JSON.stringify(payload));
					var response=payload;
					if(!response.responsesList[0].hasOwnProperty("errorMessage")){
						rootScope.showErrorPopup(msg);
					}

				},function(errorPayload){
					self.common.availBal='';
					self.common.availLimitBal='';
				});



	}
	self.setIsFTA=function(){
			if(self.sendMoney.nickName != 'FTABen')
				{
				self.sendMoney.isNotFTA = true;
				}
		};
	// Added Util Function START//
	self.utils = {
		parseNumbers : function() {


			if (self.sendMoney.amount != null) {

				self.common.amount = self.sendMoney.amount.toString();
			}

		},
		
		findIndex : function(list, value, key) {
			var stringData = JSON.stringify(list);
			var parsedData = JSON.parse(stringData);
			return parsedData.map(function(a) {
				return a[key];
			}).indexOf(value);
		},
		
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

			self.common.fromIndex = '';
			self.common.toIndex = '';
			self.common.currency = null;
			self.common.displayAmt = null;
			self.common.date = null;
			self.common.month = null;
			self.common.year = null;
			self.common.authType = self.authMode.None;
			self.common.authValue = null;
			self.common.isAuthSet = false;
			self.common.remarks = "";
			self.common.successMessage = "";
			self.common.nextApprover='';
			self.common.currencyList = [];
			self.common.ownAccounts = [];
			self.common.displayDate = new Date();
			self.common.selectedFromAccount = '';
			self.common.transactionDate = null;
			self.common.isStatusError = false;
			self.common.frequencyTypeList = [];
			self.common.frequencyType = null;
			self.common.freqType = null;
			self.common.installments = null;
			self.common.noOfDays = null;
			self.common.scheduleType = "";
			self.common.isNoOfDayEmpty = false;
			self.common.isScheduleTransfer = false;
			// added for RAK funds Transfer landing Page Started//

			self.common.toDisplayString = null;
			self.common.beneficiaryResidentCountryDisplay='';
			self.common.amount = null;
			self.common.currency == null;
			self.common.reason = null;
			self.common.txnType = null;
			self.common.noOfTransfer = null;
			self.common.beneficaryNickName = null;
			self.common.charges = null;
			self.common.purpose = null;
			self.common.remtCurr = null;
			self.common.creditAmt=null;
			self.common.chargeAmt=null;
			self.common.availBal=null;
			self.common.availCashLimit=null;
			//Added for entity limit
			
			self.common.availEntityLimit=null;
			self.rootScope.rakPayee.isBeneficiaryHistoryMode=false;
			self.rootScope.rakPayee.common.fromAuthPage=false;
            self.common.fromAuthPage=false;
            self.common.exchangePopUp=false;
            self.common.convertedAmt='';

            self.common.reason1='';
			self.common.reason2='';
			self.common.reason3='';
			self.common.message='';

			self.common.beneficiaryAccountNumber='';
			self.common.exchangeRate='';
			self.common.refId='';
			self.common.exchangeAmt='';
			self.common.isIFSC=false;
			self.common.secAuthValue='';
			self.common.securityAnswer='';
			self.common.exchangeRateCall=false;
			self.common.promocode='';
			self.common.registeredForSoftToken=false;
			self.common.beneficaryName = null;
			// RAK added for clearing the data ENDED//////////////
		}
	// Util Function Ended///
	};

	self.common = {

		fromIndex : null,
		toIndex : null,
		currency : null,
		amount : null,
		displayAmt : null,
		date : null,
		month : null,
		year : null,
		authType : null,
		authValue : "",
		isAuthSet : false,
		remarks : "",
		successMessage : "",
		currencyList : [],
		ownAccounts : [],
		// dont change use it if you want empty value
		emptyString : "",
		displayDate : new Date(),
		selectedFromAccount : null,
		transactionDate : null,
		fromDisplayString : null,
		// payType:'Now', //PayType is either 'Now' or 'Schedule'. Move this to
		// an emun if needed.
		isStatusError : false,
		frequencyTypeList : [],
		frequencyType : null,
		scheduleType : "",// Single or Recurring. if single the blank,
		// recurring is R
		isScheduleTransfer : false,
		searchFrom : null, // Complete, Incomplete, Schedule
		searchFromDate : new Date(),
		searchToDate : new Date(),
		fromSearchResult : false,
		fromAuthPage : false,

		// RAK added for confirmation screen
		toDisplayString : "",
		beneficiaryResidentCountryDisplay:'',
		amount : "",
		currency : "",
		transactionDate : "",
		reason : "",
		txnType : "",
		noOfTransfer : "",
		beneficaryNickName : "",
		charges : "",
		purpose : "",
		remtCurr : "",
		creditAmt:'',
		chargeAmt:'',
		// RAK for Schedule transfer

		searchFromList : [],
		searchToList : [],
		selectedSearchFrom : "",
		selectedFromIndex : null,
		selectedFromType : null,
		searchFrom : null, // Complete, Incomplete, Schedule
		scheduleList : [],
		selectedScheduleItem : null,
		balCheck : false,
		availBal:'',
		//Added for Limit En
		availEntityLimit:'',
		availCashLimit:'',
		exchangePopUp:false,
		convertedAmt:'',
		IBANNO:'',
	reason1:'',
	reason2:'',
	reason3:'',
	message:'',
	exchangeRate:'',
	beneficiaryAccountNumber:'',
	dd: new Date(),
	refId:'',
	exchangeAmt:'',
	isIFSC:false,
	secAuthValue:'',
	securityAnswer:'',
	exchangeRateCall:false,
	promocode:'',
	nextApprover:'',
	registeredForSoftToken:false,
	beneficaryName : "",
	availLimitBal:"",
	dailAvailLimitBal:"",
		clearCommonErrorArray : function() {
			scope.pageErrorArr = null;
		},

		clearSearchData : function() {
			self.common.searchFromList = [];

			self.common.selectedSearchFrom = "";

			self.common.searchFromDate = new Date();
			self.common.searchToDate = new Date();
		},
		initSearchPage : function(responseList) {
			self.common.scheduleTransferTab = true;
			self.common.rakIncompleteTab = false;
			self.common.viewHistoryTab = false;

			if (responseList[0].hasOwnProperty("fromAccount")) {
				self.common.searchFromList = responseList[0].fromAccount;

			}

			/*
			 * else { if(responseList[0].hasOwnProperty("fromAccount")){
			 * self.common.searchFromList=responseList[0].fromAccount;
			 *
			 * self.common.addAllToTransferList(); } }
			 */
		},

		updateBal:function(eventName)
      {
			//Service Enhancement changes START
			if(self.sendMoney.isBenfFlow){
				var txnType;
				switch (self.sendMoney.selectedBenType) {
				case self.RAKSENDMONEYBENFTYPE.OWN:
					txnType = 'OWN';
					break;
				case self.RAKSENDMONEYBENFTYPE.RAKBANK:
					txnType = 'WRB';
					break;	
	
				case self.RAKSENDMONEYBENFTYPE.WITHINUAE:
					txnType = 'WCT';
					break;
	
				case self.RAKSENDMONEYBENFTYPE.OUTUAE:
					txnType = 'OCT';
					break;
					
				default:
					break;
				}
				
				self.sendMoney.txnType = txnType;
			}
			
			//Service Enhancement changes END


		ActionProcessor.setEvent(eventName).then(function(payload) {
			console.log("Update Balance");
			//console.log(JSON.stringify(payload));
			var response=payload;
			self.common.availBal=response.responsesList[0].accountAvailableBalance;
			self.common.availLimitBal=response.responsesList[0].accountEntityBalance;
			self.common.availCashLimit=response.responsesList[0].accountAvailableCashLimit;
			self.common.dailAvailLimitBal=response.responsesList[0].accountDailyAvailableLimitBalance;
			//added for entity limit change
			scope.$apply();
		},function(errorPayload){
			self.common.availBal='';
			self.common.availCashLimit='';
			self.common.availLimitBal='';
			self.common.dailAvailLimitBal='';
			
		});


      },
	/*
	 * addAllToTransferList:function(){ from={ "accountNumber": "",
	 *
	 * "accountBalance": "", "subAccountTypeDesc": "", "index":
	 * self.common.searchFromList.length };
	 *
	 * self.common.searchFromList.push(from);
	 *
	 * self.common.selectedSearchFrom=self.common.searchFromList.length-1;
	 *
	 * self.common.selectedFromType = ""; self.common.selectedFromIndex = ""; },
	 */

	};

	self.authMode = {
		OTP : 0,
		TransactionPassword : 1,
		None : -1
	};


	self.RAKSENDMONEYBENFTYPE = {
			OWN : "OWNACT",
			RAKBANK:"RBF",
			WITHINUAE:"UBF",
			OUTUAE:"OBF"

		};


	self.RAKSENDMONEYTXNTYPE={
		OWN:"OWN",
		RAKBANK:"WRB",
		WITHINUAE:"WCT",
		OUTSIDEUAE:"OCT",
		RAKMONEY:"RMT"
	};

	// Added for RAK SendMoney Landing Page//
	self.sendMoney = {
		selectedBenType : "",
		selectedBenTypeFlag: "Y",
		beneficaryTypes : [],
		selectedFromAccount : '',
		selectedToAccount : "",
		selectedToBenAccount : "",
		ownAccounts : [],
		benAccounts : [],
		fromAccounts : [],
		currencyList : [],
		selectedCurrency : "",
		frequencyType : [],
		selectedFrequency : "O",
		amount : "",
		reason : "",
		selectedpromoCode : "",
		promoCode : [],
		eligibleAmount : "",
		noOfTransfer : "",
		beneficiaryList : [],
		beneficiaryNickName : "",
		beneficiaryAccountNumber : "",
		beneficiaryIndex : "",
		frequencyTypeDesc : "",
		selectedPromoCode:'',
		charges : [],
		purpose : [],
		purposeListUpdated : [],
		selectedCharges : "",
		selectedPurpose : "",
		selectedPurposeDesc : "",
		remCurrencyList : [],
		remitCurrency : [],
		txnCurrencyArray:[],
		remitCrnFilter:[],
		selectedRCurr : "",
		subAccountTypeDesc : "",
		isAll : false,
		transactionType : "",
		isBenfSelected : false,
		divSelection : false,
		availBal : '',
		exchangeRate:'',
		dummyTxntype:'',
		debitCrn:'',
		creditCrn:'',
		txnType:'',
		creditAccount:'',
		reasonList:[],
		selectedReason:'',
		selectedReason1:'',
		selectedReason2:'',
		selectedReason3:'',
		confirmed:false,
		isFromPayeeFlow:false,
		isBenfFlow:false,
		ownCurrencyList:[],
			rakBenfBankName:'',  //FTA
		benfRestCountryList:[],
		rakBenfResidentCountry:'',
		beneficiaryAccountNum:'',
		promoCodeForFT:[],
		promoCodeForREM:[],
		isPromoSelected:false,
		payAgainRecFreq:'',
		selectedpromoCodeForServer:'',
		showResidentCountryField:'',
		showFDAComponentFlag:'',  //FTA
		FTA_TAX:'TAX', //FTA
		refId:'',
		isNotFTA:false,
		showUBFResidentCountry:'',
		withinUAEBenfCountryAvailable:'',

		//added for modify flow
		accountSelected:'',
		initorType:'',
		accountSelectedSelf:'',
		isModified:false,

		getBalanceEvent:function(){
				if(self.sendMoney.fromAccounts[self.sendMoney.selectedFromAccount].accountType== 'CCD'){
				self.common.updateBal('onCCDAccountSelectionBalCall');
				}
				else{
					self.common.updateBal('onAccountSelectionBalCall');
				}
		},

		clearSelfTransfersData : function() {
			self.sendMoney.selectedBenType = '';
			self.sendMoney.selectedBenTypeFlag = "Y"; // Added for access level CR change
			self.sendMoney.beneficaryTypes = [];
			self.sendMoney.selectedFromAccount = '';
			self.sendMoney.selectedFromAccountNew = '';
			self.sendMoney.selectedToAccount = '';
			self.sendMoney.selectedToBenAccount = '';
			self.sendMoney.ownAccounts = [];
			self.sendMoney.benAccounts = [];
			self.sendMoney.benfRestCountryList=[];
			self.sendMoney.showResidentCountryField='';
			self.sendMoney.showUBFResidentCountry ='';
			self.sendMoney.rakBenfResidentCountry='';
			
			self.sendMoney.showFDAComponentFlag='Y'; //FTA
			self.sendMoney.rakBenfBankName=''; //FTA
			self.sendMoney.fromAccounts = [];
			self.sendMoney.currencyList = [];
			self.sendMoney.selectedCurrency = '';
			self.sendMoney.frequencyType = null;
			self.sendMoney.selectedFrequency = '';
			self.sendMoney.amount = null;
			self.sendMoney.noOfTransfer = "";
			self.sendMoney.reason = "";
			self.sendMoney.selectedpromoCode = '';
			self.sendMoney.promoCode = [];
			self.sendMoney.eligibleAmount = null;
			self.sendMoney.beneficiaryList = [];
			self.sendMoney.beneficiaryNickName = null;
			self.sendMoney.beneficiaryAccountNumber = null;
			self.sendMoney.beneficiaryIndex = null;
			self.sendMoney.frequencyTypeDesc = null;
			self.sendMoney.charges = null;
			self.sendMoney.purpose = null;
			self.sendMoney.purposeListUpdated = null;
			self.sendMoney.selectedCharges = '';
			self.sendMoney.selectedPurpose = '';
			self.sendMoney.selectedPurposeDesc = '';
			self.sendMoney.RemcurrencyList = [];
			self.sendMoney.selectedRCurr = '';
			self.sendMoney.subAccountTypeDesc = null;
			self.sendMoney.transactionType = null;
			self.sendMoney.availBal = null;
			self.sendMoney.exchangeRate=null;
			self.sendMoney.dummyTxntype=null;
			self.sendMoney.debitCrn=null;
			self.sendMoney.creditCrn=null;
			self.sendMoney.txnType=null;
			self.sendMoney.remitCrnFilter=[];
			self.sendMoney.reasonList=[];
			self.sendMoney.reasonListForTxrn=[];
			self.sendMoney.topTenReasonForUBF_AED=[];
			self.sendMoney.topTenReasonForUBF_FCY=[];
			self.sendMoney.topTenReasonForOBF=[];
			self.sendMoney.selectedReason='';
			self.sendMoney.selectedReason1="";
			self.sendMoney.selectedReason2="";
			self.sendMoney.selectedReason3="";
			self.sendMoney.txnCurrencyArray=[];
			self.common.availBal=null;
			self.common.availCashLimit=null;
			self.sendMoney.creditAccount=null;
			self.sendMoney.isFromPayeeFlow=false;
			self.sendMoney.isBenfFlow=false;
			self.sendMoney.ownCurrencyList=[];
			self.sendMoney.beneficiaryAccountNum='';
			self.sendMoney.promoCodeForFT=[],
			self.sendMoney.promoCodeForREM=[],
			self.sendMoney.isPromoSelected=false;
			self.sendMoney.selectedpromoCodeForServer='';
			self.schedule.schTxnListSubmitBtn="";
			self.sendMoney.accountSelected='';
			self.sendMoney.initorType='';
			self.sendMoney.payAgainRecFreq='';
			self.sendMoney.accountSelectedSelf='';
			self.sendMoney.showUBFResidentCountry='';
			self.sendMoney.withinUAEBenfCountryAvailable='';
			
			self.sendMoney.isModified=false;
			self.rakMoney.exchangeRate='';
                   	self.sendMoney.isNotFTA = false;
			// Added for clearing common data
	self.utils.clearCommonData();

		},

		getStaticText : function() {

			if (self.sendMoney.selectedCharges == 'ALL20') {
				self.sendMoney.isAll = true;
			} else {
				self.sendMoney.isAll = false;
			}
		},
		
		clearBenfResidentDetails : function() {

			self.sendMoney.showUBFResidentCountry='';
			self.sendMoney.withinUAEBenfCountryAvailable='';
			self.sendMoney.showResidentCountryField='';
		
		},

		getDefaultTransCurr : function() {
			if (self.sendMoney.selectedFromAccountNew) {
				self.sendMoney.getAccountIndex();
			}
			
			self.sendMoney.selectedCurrency='';
			if (self.sendMoney.selectedFromAccount) {
				self.sendMoney.selectedCurrency = self.sendMoney.fromAccounts[self.sendMoney.selectedFromAccount]['currencyCode']
						.toString();
				self.sendMoney.debitCrn=self.sendMoney.selectedCurrency;


			}
		},
		
		
		getAccountIndex: function(){
			var index = self.utils.findIndex(
					self.sendMoney.fromAccounts,
					self.sendMoney.selectAccNo,
					'accountNumber');
			self.sendMoney.selectedFromAccount = index.toString();
			
		},

		filterCurrencyArray: function(){
			self.sendMoney.txnCurrencyArray=[];
			var benType='';
			if (self.sendMoney.selectedToBenAccount && self.sendMoney.selectedToBenAccount!=0) {
				var benfCountry=self.sendMoney.benAccounts[self.sendMoney.selectedToBenAccount]['beneficiaryCountry'].toString();
				benType= self.sendMoney.benAccounts[self.sendMoney.selectedToBenAccount]['beneficiaryType'].toString();

				for(var temp in self.sendMoney.remitCrnFilter){
					if(benfCountry==self.sendMoney.remitCrnFilter[temp]['filterCode']){
						self.sendMoney.creditCrn=self.sendMoney.remitCrnFilter[temp]['filterDesc'];

						/*self.sendMoney.selectedRCurr=self.sendMoney.creditCrn;*/
						break;
					}
				}

			}

			else{
				benType=self.RAKSENDMONEYBENFTYPE.OWN;
				if(benType=='OWNACT' && self.sendMoney.selectedToAccount){
					self.sendMoney.creditCrn=self.sendMoney.ownAccounts[self.sendMoney.selectedToAccount]['currencyCode'];
				}

			}


			if (self.sendMoney.selectedFromAccount) {
				self.sendMoney.debitCrn = self.sendMoney.fromAccounts[self.sendMoney.selectedFromAccount]['currencyCode'].toString();

			}



			if(benType!=self.RAKSENDMONEYBENFTYPE.OWNACT && benType!=self.RAKSENDMONEYBENFTYPE.RAKBANK){

			for(var temp in self.sendMoney.currencyList){
				if(self.sendMoney.currencyList[temp]['currencyCode']==self.sendMoney.debitCrn){
					//self.sendMoney.currencyList[temp]['currencyDesc']=self.sendMoney.currencyList[temp]['currencyDesc']+" "+rootScope.appLiterals.APP.RAKSEND_MONEY.RAKTRANSFERS_PAYNOW_PAGE.TRANSFERCURR;
					self.sendMoney.txnCurrencyArray.push(self.sendMoney.currencyList[temp]);
					self.sendMoney.selectedCurrency=self.sendMoney.debitCrn;
				}
				else if(self.sendMoney.selectedRCurr && !self.sendMoney.txnCurrencyArray.hasOwnProperty[self.sendMoney.selectedRCurr] && self.sendMoney.currencyList[temp]['currencyCode']==self.sendMoney.selectedRCurr){
					//self.sendMoney.currencyList[temp]['currencyDesc']=self.sendMoney.currencyList[temp]['currencyDesc']+" "+rootScope.appLiterals.APP.RAKSEND_MONEY.RAKTRANSFERS_PAYNOW_PAGE.TRANSFERCURR;
					self.sendMoney.txnCurrencyArray.push(self.sendMoney.currencyList[temp]);
				}
			}
			}

			else{
				for(var temp in self.sendMoney.ownCurrencyList){
					if(self.sendMoney.ownCurrencyList[temp]['currencyCode']==self.sendMoney.debitCrn){

						self.sendMoney.txnCurrencyArray.push(self.sendMoney.ownCurrencyList[temp]);
					}
					else if(self.sendMoney.selectedRCurr && !self.sendMoney.txnCurrencyArray.hasOwnProperty[self.sendMoney.selectedRCurr] && self.sendMoney.ownCurrencyList[temp]['currencyCode']==self.sendMoney.selectedRCurr){

						self.sendMoney.txnCurrencyArray.push(self.sendMoney.ownCurrencyList[temp]);
					}
				}
			}

			// for clearing amount and Exchange rate field on selection of benf and debit account
			self.sendMoney.refreshValueforExchangeRate();

		},

		populateTransactionCurrencyForPromoCode :function(selectedPromoCodeTranCurrency){
			self.sendMoney.txnCurrencyArray=[];
			for(var temp in self.sendMoney.ownCurrencyList){
				if(self.sendMoney.ownCurrencyList[temp]['currencyCode']==selectedPromoCodeTranCurrency){

					self.sendMoney.txnCurrencyArray.push(self.sendMoney.ownCurrencyList[temp]);
					break;
				}
			}
		},

		getPurposeList : function() {

			if (self.sendMoney.selectedToBenAccount != undefined) {



				var benType = self.sendMoney.benAccounts[self.sendMoney.selectedToBenAccount]['beneficiaryType']
						.toString();

				// Added for Promo code changes

				self.sendMoney.promoCode=[];
				if(benType &&  self.sendMoney.promoCodeForFT && (benType==self.RAKSENDMONEYBENFTYPE.OWN || benType==self.RAKSENDMONEYBENFTYPE.RAKBANK)){
					self.sendMoney.promoCode=self.sendMoney.promoCodeForFT;
				}
				else if(self.sendMoney.promoCodeForREM){
					self.sendMoney.promoCode= self.sendMoney.promoCodeForREM;
				}
				this.refreshReasonList();

			}
		},
		refreshReasonList : function(){

			var benType = self.sendMoney.benAccounts[self.sendMoney.selectedToBenAccount]['beneficiaryType'].toString();
			var tempReasonList = self.sendMoney.reasonList;
			self.sendMoney.selectedReason='';
			self.sendMoney.selectedReason1='';
			self.sendMoney.selectedReason2='';
			self.sendMoney.selectedReason3='';
			self.sendMoney.selectedPurpose = '';

			 if (benType == 'UBF' && self.sendMoney.selectedRCurr == "AED") {
					scope.setEvent('getPurposeListService');
			 } else{
				// self.sendMoney.reasonList = self.sendMoney.reasonListForTxrn;
				 this.updatetop10ReasonList();
			 }
		},
		
		refreshBenfResidentCountry : function(){
			
			var benType = self.sendMoney.benAccounts[self.sendMoney.selectedToBenAccount]['beneficiaryType'].toString();
						
			 if(self.sendMoney.selectedToBenAccount){
				 var withinUAEBenfCountryAvailable = self.sendMoney.benAccounts[self.sendMoney.selectedToBenAccount]['withinUAEBenfCountryAvailable']
				 self.sendMoney.withinUAEBenfCountryAvailable= withinUAEBenfCountryAvailable ;
				 
				 
				 
				 if (benType == 'UBF' && self.sendMoney.selectedRCurr && self.sendMoney.selectedRCurr != "AED" && withinUAEBenfCountryAvailable && withinUAEBenfCountryAvailable=='N') {
					 self.sendMoney.showUBFResidentCountry = "YES";
					 self.sendMoney.rakBenfResidentCountry='';
				 } else{
					 self.sendMoney.showUBFResidentCountry = "NO";
				 }
			 }
		},
		
		
		updatetop10ReasonList : function(){
			var sendMoneyObj = self.sendMoney || this;
			var benType       = self.sendMoney.benAccounts[self.sendMoney.selectedToBenAccount]['beneficiaryType'].toString();
			var currency      = self.sendMoney.selectedRCurr;
			var currentReasonList =  self.sendMoney.reasonListForTxrn;
			var currentPurposeList = self.sendMoney.purpose;
			var topTenUBF_AED = self.sendMoney.topTenReasonForUBF_AED;
			var topTenUBF_FCY = self.sendMoney.topTenReasonForUBF_FCY;
			var topTenOBF = self.sendMoney.topTenReasonForOBF;
			if(benType == self.RAKSENDMONEYBENFTYPE.WITHINUAE) {
				    sendMoneyObj.purpose =  this.getSortedReasonList(currentPurposeList,topTenUBF_AED);
					sendMoneyObj.reasonListForTxrn = this.getSortedReasonList(currentReasonList,topTenUBF_FCY);
			} else {
				   sendMoneyObj.reasonListForTxrn = this.getSortedReasonList(currentReasonList,topTenOBF);
			}
		},
		getSortedReasonList: function(completeList,topTenReason){
			var orderedTopTenList         = [];
			var orderedTopTenListMap      = [];
			var orderedOtherReasonListMap = [];
			var currentReasonList =  completeList;
			    orderedTopTenList =  _.sortBy(topTenReason,function(item){
					return Number(item.filterDesc);
			});
			orderedTopTenListMap = _.compact(_.map(orderedTopTenList,function(val){
									   return _.find(currentReasonList,function(obj){
									                  return (obj.purposeCode || obj.reasonCode)  == val.filterCode;
									  });
								}));
			orderedOtherReasonListMap = _.sortBy(_.reject(
												currentReasonList, function(reasonObj) {
											return _.find(orderedTopTenListMap, function(topTenObj) {
												return (topTenObj.purposeCode || topTenObj.reasonCode ) ==
													(reasonObj.purposeCode || reasonObj.reasonCode)
											});
										}), function(reason) {
									return (reason.reasonDesc || reason.purposeDesc)
								});
			return _.compact(_.union(orderedTopTenListMap,orderedOtherReasonListMap));
		},

		getRemCurrencyPrepopulate:function(){
			if (self.sendMoney.selectedToBenAccount != undefined && self.sendMoney.selectedToBenAccount!=0) {
			var benfCountry=self.sendMoney.benAccounts[self.sendMoney.selectedToBenAccount]['beneficiaryCountry'].toString();
			var benType = self.sendMoney.benAccounts[self.sendMoney.selectedToBenAccount]['beneficiaryType'].toString();
			if(benType!=self.RAKSENDMONEYBENFTYPE.RAKBANK){
			var flag=false;
			for(var temp in self.sendMoney.remitCrnFilter){
				if(benfCountry==self.sendMoney.remitCrnFilter[temp]['filterCode']){
					flag=true;
					self.sendMoney.selectedRCurr=self.sendMoney.remitCrnFilter[temp]['filterDesc'];
					self.sendMoney.creditCrn=self.sendMoney.selectedRCurr;
					break;
				}
			}
			if(!flag)
			{
				self.sendMoney.selectedRCurr="";
			}
		}
			else{
				self.sendMoney.selectedRCurr=self.sendMoney.creditCrn;
			}
			}

	        var remCurrTemp='';
			for(var temp in self.sendMoney.RemcurrencyList){
				if(self.sendMoney.selectedRCurr===self.sendMoney.RemcurrencyList[temp]['currencyCode']){
					remCurrTemp=self.sendMoney.RemcurrencyList[temp]['currencyCode'];
					break;
				}
				else{
					remCurrTemp="";
				}
			}
			self.sendMoney.selectedRCurr=remCurrTemp;

		},

		promoCodeSelected:function(){

		if(self.sendMoney.selectedpromoCode){


			// to check if Select Promo code is selected. This will reset all the fields preselected.
			if(self.sendMoney.selectedpromoCode=='NA'){
				self.sendMoney.isPromoSelected=false;
				self.sendMoney.amount='';
				self.sendMoney.getEventForBenf();
				self.sendMoney.getDefaultTransCurr();
				self.sendMoney.getRemCurrencyPrepopulate();
				self.sendMoney.exchangeRate='';
				self.sendMoney.dummyTxntype=self.sendMoney.dummyTxntype.indexOf("|") ? self.sendMoney.dummyTxntype.split("|")[0] : self.sendMoney.dummyTxntype;
				self.sendMoney.selectedpromoCodeForServer="";
				return;
			}
			self.sendMoney.isPromoSelected=true;
			self.sendMoney.dummyTxntype=(self.sendMoney.selectedBenType && self.sendMoney.selectedBenType==self.RAKSENDMONEYBENFTYPE.OWN) ? "XFR_TRANSFER" :"PMT_TRANSFER";
			var selectedPromoCode=Number(self.sendMoney.selectedpromoCode)+1;
			self.sendMoney.selectedRCurr=self.sendMoney.promoCode[selectedPromoCode]['remcrn'].toString();
			self.sendMoney.selectedCurrency=self.sendMoney.promoCode[selectedPromoCode]['txncrn'].toString();
			self.sendMoney.debitCrn=self.sendMoney.promoCode[selectedPromoCode]['accntcrn'].toString()
			self.sendMoney.populateTransactionCurrencyForPromoCode(self.sendMoney.selectedCurrency);
			self.sendMoney.amount=Number(self.sendMoney.promoCode[selectedPromoCode]['dealamount'].toString());
			self.sendMoney.dummyTxntype=self.sendMoney.dummyTxntype+"|"+self.sendMoney.promoCode[selectedPromoCode]['dealnumber'].toString();
			self.sendMoney.selectedpromoCodeForServer=self.sendMoney.promoCode[selectedPromoCode]['dealnumber'].toString();
			self.sendMoney.selectedFromAccountDisp=self.sendMoney.fromAccounts[self.sendMoney.selectedFromAccount].subAccountTypeDesc+"-"+self.sendMoney.fromAccounts[self.sendMoney.selectedFromAccount].accountNumber+
			"-"+self.sendMoney.fromAccounts[self.sendMoney.selectedFromAccount].currencyCode;
			self.sendMoney.selectedToAccountDisp=self.sendMoney.selectedToAccount ? self.sendMoney.ownAccounts[self.sendMoney.selectedToAccount].subAccountTypeDesc+"-"+self.sendMoney.ownAccounts[self.sendMoney.selectedToAccount].accountNumber+
			"-"+self.sendMoney.ownAccounts[self.sendMoney.selectedToAccount].currencyCode : "";
			self.sendMoney.getKeyUp();
		}

		},
		
		/* XM Changes Start*/
		
		getresidentCountryForBenf:function(){
			self.sendMoney.rakBenfResidentCountry='';
			if (self.sendMoney.benAccounts && self.sendMoney.selectedToBenAccount) {
				var residentCountryAvailable=self.sendMoney.benAccounts[self.sendMoney.selectedToBenAccount]['benefResidentCountryAvailable'].toString();
				if(residentCountryAvailable && residentCountryAvailable=='N'){
					self.sendMoney.showResidentCountryField = 'Y';
				}else{
					self.sendMoney.showResidentCountryField = 'N';
				}
			}
			
		},
		
		/* XM Changes End*/
		
		//FTA Changes start
		
		getBankNameFlagBenf:function(responseList){
			self.sendMoney.rakBenfBankName='';
			if (self.sendMoney.benAccounts && self.sendMoney.selectedToBenAccount) {
				self.sendMoney.rakBenfBankName=self.sendMoney.benAccounts[self.sendMoney.selectedToBenAccount]['bankName'].toString().toUpperCase();
				if(self.sendMoney.rakBenfBankName=='FEDERAL TAX AUTHORITY'){
					self.sendMoney.showFDAComponentFlag = 'N';
					//self.sendMoney.selectedPurpose='TAX';
					for(var temp in self.sendMoney.purpose){
		  					if(self.sendMoney.purpose[temp].purposeCode==self.sendMoney.FTA_TAX){
		  						self.sendMoney.selectedPurpose=self.sendMoney.purpose[temp].purposeCode;
		  						self.sendMoney.selectedPurposeDisplay=self.sendMoney.purpose[temp].purposeDesc; //FTA
		  						break;
		  					}
		  				}
					
					self.sendMoney.selectedChargesDisp='All Charges to my Account';
					self.sendMoney.selectedFrequencyDisp='Once';
				}else{
					self.sendMoney.showFDAComponentFlag = 'Y';
				}
			}
			
		},
		
		setFTAFieldsDefault:function(){
			
			if (self.sendMoney.showFDAComponentFlag=='N') {
				
				self.sendMoney.selectedFrequency = 'O';
				self.sendMoney.selectedCharges ='O';
				self.sendMoney.selectedPurpose = 'TAX'	;	
				
			}
			
		},
		
		//FTA Changes END

		clearFields:function(){
			self.sendMoney.exchangeRate='';
			self.sendMoney.amount = '';
			self.sendMoney.noOfTransfer = "";
			self.sendMoney.reason = "";
			self.sendMoney.selectedReason='';
			self.sendMoney.selectedPurpose='';
			self.sendMoney.selectedCharges='';
			self.sendMoney.exchangeRate='';
			self.sendMoney.selectedCurrency='';
			self.common.fromAuthPage=false;
			self.common.exchangePopUp=false;
			self.common.selectedReason='';
			self.sendMoney.selectedRCurr='';
			self.sendMoney.isPromoSelected=false;
			self.sendMoney.selectedReason='';
			self.sendMoney.selectedReason1='';
			self.sendMoney.selectedReason2='';
			self.sendMoney.selectedReason3='';
			self.sendMoney.selectedFromAccount='';
			self.sendMoney.selectedFromAccountNew='';
			self.sendMoney.isPromoSelected=false;
			self.sendMoney.selectedpromoCode='';
			self.sendMoney.dummyTxntype='';
			self.sendMoney.selectedpromoCodeForServer='';
			self.common.availBal='';
			self.common.availCashLimit='';
		    // Added limit entity
			self.common.availEntityLimit='';
			self.schedule.schTxnListSubmitBtn="";
			self.sendMoney.initorType='';
			self.sendMoney.payAgainRecFreq='';
			self.sendMoney.rakBenfResidentCountry='';
			self.sendMoney.showResidentCountryField='';
			self.sendMoney.showUBFResidentCountry ='';
			
				self.sendMoney.rakBenfBankName='';  //FTA
			self.sendMoney.showFDAComponentFlag='Y';  //FTA
			self.common.displayDate = new Date();
			self.sendMoney.selectedBenTypeFlag = "Y"; // Added for access level CR change
			
		},

		refreshValueforExchangeRate :function(){
			self.sendMoney.exchangeRate='';
			self.sendMoney.amount = '';
		},


		getEventForBenf : function() {
			if (self.sendMoney.selectedToBenAccount != "") {
				switch (self.sendMoney.selectedToBenAccount) {
				case "0":

					if(self.sendMoney.ownAccounts && self.sendMoney.ownAccounts.length==1){
						self.sendMoney.selectedBenType='';
						rootScope.showErrorPopup(rootScope.appLiterals.APP.RAKSEND_MONEY.RAKTRANSFERS_PAYNOW_PAGE.SELFACCOUNTSMSG);
						return;
					}
					self.sendMoney.selectedBenType = self.RAKSENDMONEYBENFTYPE.OWN;
					self.sendMoney.dummyTxntype="XFR_TRANSFER";
					if(self.sendMoney.selectedToAccount){
					self.sendMoney.creditCrn=self.sendMoney.ownAccounts[self.sendMoney.selectedToAccount]['currencyCode'].toString()
					self.sendMoney.creditAccount=(Number(self.sendMoney.selectedToAccount)+1).toString();
					self.sendMoney.selectedRCurr=self.sendMoney.creditCrn;
					self.sendMoney.beneficiaryAccountNum='';
					}
					break;

				default:
					self.sendMoney.selectedBenType = self.sendMoney.benAccounts[self.sendMoney.selectedToBenAccount]['beneficiaryType'].toString();
				    self.sendMoney.dummyTxntype="PMT_TRANSFER";
				    self.sendMoney.creditCrn=self.sendMoney.selectedBenType==self.RAKSENDMONEYBENFTYPE.RAKBANK ? self.sendMoney.benAccounts[self.sendMoney.selectedToBenAccount]['currencyCode']:self.sendMoney.creditCrn;
				    self.sendMoney.creditAccount=self.sendMoney.selectedToBenAccount.toString();
				    self.sendMoney.beneficiaryAccountNum=rootScope.appLiterals.APP.RAKSEND_MONEY.RAKTRANSFERS_AUTHPAGE.BENEFICIARYACCOUNT+"  "+self.sendMoney.benAccounts[self.sendMoney.selectedToBenAccount]['beneficiaryAccountNumber'];
				    break;
				}
				// to enable exchange rate fetch
				self.sendMoney.isBenfSelected=true;


			}
		},

		getKeyUp : function() {
			WL.Logger.info("Exchange Rate call credit curr"+self.sendMoney.creditCrn + " Debit curr "+self.sendMoney.debitCrn +"Rem Curreny"+self.sendMoney.selectedRCurr);
			self.sendMoney.creditCrn=self.sendMoney.selectedRCurr ? self.sendMoney.selectedRCurr : self.sendMoney.creditCrn;
			//self.sendMoney.creditAccount = Number(self.sendMoney.creditAccount)+1;
			self.common.fromAuthPage=false;
			self.common.exchangeRateCall=false;

			if(self.sendMoney.creditCrn && self.sendMoney.debitCrn){
            if(!self.sendMoney.selectedpromoCode){
			self.sendMoney.creditCrn=self.sendMoney.selectedBenType==self.RAKSENDMONEYBENFTYPE.OWN ? self.sendMoney.ownAccounts[self.sendMoney.selectedToAccount]['currencyCode'].toString() :self.sendMoney.creditCrn;
            }

			WL.Logger.info("Exchange Rate call credit curr"+self.sendMoney.creditCrn + " Debit curr "+self.sendMoney.debitCrn);
			if (self.sendMoney.creditCrn!=self.sendMoney.debitCrn) {
			    switch(self.sendMoney.selectedBenType){
			    case self.RAKSENDMONEYBENFTYPE.OWN:
			    	self.sendMoney.txnType=self.RAKSENDMONEYTXNTYPE.OWN;
			    	break;
			    case self.RAKSENDMONEYBENFTYPE.RAKBANK:
			    	self.sendMoney.txnType=self.RAKSENDMONEYTXNTYPE.RAKBANK;
			    	break;
			    case self.RAKSENDMONEYBENFTYPE.WITHINUAE:
			    	self.sendMoney.txnType=self.RAKSENDMONEYTXNTYPE.WITHINUAE;
			    	break;
			    case self.RAKSENDMONEYBENFTYPE.OUTUAE:
			    	self.sendMoney.txnType=self.RAKSENDMONEYTXNTYPE.OUTSIDEUAE;
			    	break;
			   default:
				   break;


			    }
					scope.setEvent('exchangeRateClick');
					// Added for RAK Dual hit call handling
					rootScope.callInProgress=true;

					self.common.exchangeRateCall=true;
					self.sendMoney.isBenfSelected = false;

			}
			}


		},
		setTxnType : function()
		{
			switch(self.sendMoney.selectedBenType){
		    case self.RAKSENDMONEYBENFTYPE.OWN:
		    	self.sendMoney.txnType=self.RAKSENDMONEYTXNTYPE.OWN;
		    	if(self.sendMoney.fromAccountsListOwn.length < 1) {
		    		self.sendMoney.selectedBenTypeFlag = "Y"; // Added for access level CR change
		    		rootScope.showErrorPopup(rootScope.appLiterals.APP.RAKSEND_MONEY.RAKTRANSFERS_PAYNOW_PAGE.ACCESS_LEVEL_ERROR_MSG);
		    	}
		    	else {
		    		self.sendMoney.selectedBenTypeFlag = "N"; // Added for access level CR change
		    	}
		    	break;
		    case self.RAKSENDMONEYBENFTYPE.RAKBANK:
		    	self.sendMoney.txnType=self.RAKSENDMONEYTXNTYPE.RAKBANK;
		    	if(self.sendMoney.fromAccountsListRbf.length < 1) {
		    		self.sendMoney.selectedBenTypeFlag = "Y"; // Added for access level CR change
		    		rootScope.showErrorPopup(rootScope.appLiterals.APP.RAKSEND_MONEY.RAKTRANSFERS_PAYNOW_PAGE.ACCESS_LEVEL_ERROR_MSG);
		    	}
		    	else {
		    		self.sendMoney.selectedBenTypeFlag = "N"; // Added for access level CR change
		    	}
		    	break;
		    case self.RAKSENDMONEYBENFTYPE.WITHINUAE:
		    	self.sendMoney.txnType=self.RAKSENDMONEYTXNTYPE.WITHINUAE;
		    	if(self.sendMoney.fromAccountsListUbf.length < 1) {
		    		self.sendMoney.selectedBenTypeFlag = "Y"; // Added for access level CR change
		    		rootScope.showErrorPopup(rootScope.appLiterals.APP.RAKSEND_MONEY.RAKTRANSFERS_PAYNOW_PAGE.ACCESS_LEVEL_ERROR_MSG);
		    	}
		    	else {
		    		self.sendMoney.selectedBenTypeFlag = "N"; // Added for access level CR change
		    	}
		    	break;
		    case self.RAKSENDMONEYBENFTYPE.OUTUAE:
		    	self.sendMoney.txnType=self.RAKSENDMONEYTXNTYPE.OUTSIDEUAE;
		    	if(self.sendMoney.fromAccountsListObf.length < 1) {
		    		self.sendMoney.selectedBenTypeFlag = "Y"; // Added for access level CR change
		    		rootScope.showErrorPopup(rootScope.appLiterals.APP.RAKSEND_MONEY.RAKTRANSFERS_PAYNOW_PAGE.ACCESS_LEVEL_ERROR_MSG);
		    	}
		    	else {
		    		self.sendMoney.selectedBenTypeFlag = "N"; // Added for access level CR change
		    	}
		    	break;
		   default:
			   break;


		    }
		},
		getKeyUpForEdit : function() {

			if(jQuery("div.modTxn").find(".ng-dirty").length!=0){
				self.sendMoney.isModified = true;
	         }

			WL.Logger.info("Exchange Rate call credit curr"+self.sendMoney.creditCrn + " Debit curr "+self.sendMoney.debitCrn +"Rem Curreny"+self.sendMoney.selectedRCurr);
			//self.sendMoney.creditCrn=self.sendMoney.selectedRCurr;
			self.sendMoney.creditCrn=self.sendMoney.selectedRCurr ? self.sendMoney.selectedRCurr : self.sendMoney.creditCrn;
			//self.sendMoney.creditAccount = Number(self.sendMoney.creditAccount)+1;
			self.common.fromAuthPage=false;

			if(self.sendMoney.creditCrn && self.sendMoney.debitCrn){

			self.sendMoney.creditCrn=self.sendMoney.selectedBenType==self.RAKSENDMONEYBENFTYPE.OWN ? self.sendMoney.ownAccounts[self.sendMoney.selectedToAccount]['currencyCode'].toString() :self.sendMoney.creditCrn;
			WL.Logger.info("Exchange Rate call credit curr"+self.sendMoney.creditCrn + " Debit curr "+self.sendMoney.debitCrn);
			if (self.sendMoney.creditCrn!=self.sendMoney.debitCrn) {
			    switch(self.sendMoney.selectedBenType){
			    case self.RAKSENDMONEYBENFTYPE.OWN:
			    	self.sendMoney.txnType=self.RAKSENDMONEYTXNTYPE.OWN;
			    	break;
			    case self.RAKSENDMONEYBENFTYPE.RAKBANK:
			    	self.sendMoney.txnType=self.RAKSENDMONEYTXNTYPE.RAKBANK;
			    	break;
			    case self.RAKSENDMONEYBENFTYPE.WITHINUAE:
			    	self.sendMoney.txnType=self.RAKSENDMONEYTXNTYPE.WITHINUAE;
			    	break;
			    case self.RAKSENDMONEYBENFTYPE.OUTUAE:
			    	self.sendMoney.txnType=self.RAKSENDMONEYTXNTYPE.OUTSIDEUAE;
			    	break;
			   default:
				   break;


			    }
					scope.setEvent('exchangeRateClick');
					// Added for RAK Dual hit call handling
					rootScope.callInProgress=true;
					self.common.exchangeRateCall=true;
					self.sendMoney.isBenfSelected = false;

			}
			}


		},
		getEventForTransfer : function() {
			self.utils.populateCurrentDateDetails();
			self.sendMoney.noOfTransfer=self.sendMoney.selectedFrequency=='O' ? '':self.sendMoney.noOfTransfer;
			var eventSel = '';

			WL.Logger.info('Send Money Event selection criteria: '
					+ self.sendMoney.selectedBenType + ""
					+ self.sendMoney.selectedFrequency + ""
					+ self.sendMoney.selectedCharges);
			if (self.sendMoney.selectedBenType != "undefined"
					&& self.sendMoney.selectedFrequency != "undefined") {
				var frequencyType = '';
				frequencyType = self.sendMoney.selectedFrequency == 'O' ? "O"
						: "REC";

				switch (self.sendMoney.selectedBenType + frequencyType) {
				case self.RAKSENDMONEYBENFTYPE.OWN+"O":
					eventSel = 'onSelfTransfersClick';
					break;
				case self.RAKSENDMONEYBENFTYPE.OWN+"REC":
					eventSel = 'onRecOWNTransfersClick';
					break;
				case self.RAKSENDMONEYBENFTYPE.RAKBANK+"O":
					eventSel = 'onRAKSingleTransfersClick';
					break;
				case self.RAKSENDMONEYBENFTYPE.RAKBANK+"REC":
					eventSel = 'onRAKRecTransfersClick';
					break;

				case self.RAKSENDMONEYBENFTYPE.WITHINUAE+"O":
					eventSel = 'onWithinUAESingleTransfersClick';
					break;

				case self.RAKSENDMONEYBENFTYPE.WITHINUAE+"REC":
					eventSel = 'onWithinUAERecTransfersClick';
					break;

				case self.RAKSENDMONEYBENFTYPE.OUTUAE+"O":
					eventSel = 'onOutsideUAESingleTransfersClick';
					break;

				case self.RAKSENDMONEYBENFTYPE.OUTUAE+"REC":
					eventSel = 'onOutsideUAERecTransfersClick';
					break;
				default:
					break;
				}

				WL.Logger.info('Send money event selected' + eventSel);
			}

			return eventSel.toString();
		},

		getConfirmEventForTransfer : function() {
			self.utils.populateCurrentDateDetails();
			var eventSel = '';

			WL.Logger.info('Send Money Event selection criteria: '
					+ self.sendMoney.selectedBenType + ""
					+ self.sendMoney.selectedFrequency + ""
					+ self.sendMoney.selectedCharges);
			if (self.sendMoney.selectedFrequency != "undefined") {
				var frequencyType = '';
				frequencyType = self.sendMoney.selectedFrequency == 'O' ? "O"
						: "REC";

				switch (frequencyType) {
				case "O":
					eventSel = 'onSingleMoneyTransfersClick';
					break;
				case "REC":
					eventSel = 'onRecMoneyTransfersClick';
					break;

				default:
					break;
				}

				WL.Logger.info('Send money event selected' + eventSel);
			}

			return eventSel.toString();
		},
		initFromBenfPage:function(index){
			self.sendMoney.selectedToBenAccount=index;

			// check for segregating rak money flow with send money flow
		if(rootScope.rakPayee.payeeSelected && rootScope.userTypeValue=="1" && (rootScope.rakPayee.payeeSelected.bnfBankCountry==self.indiaCountry ||
				(rootScope.rakPayee.payeeSelected.bnfBankCountry==self.cebCountry && !rootScope.rakPayee.payeeSelected.beneficiaryAccountNumber))){
			self.rakMoney.isFromPayeeFlow=true;
			self.rakMoney.selectedToBenAccount=index;
			scope.setEvent('onInitiateRakMoneyTransferFromPayee');
		}
		else{
			self.sendMoney.isFromPayeeFlow=true;
			scope.setEvent('onInitiateTransferFromPayee');
		}
		},

		initPayNowPage : function(responseList) {

			self.sendMoney.bankTransferTab = true;
			self.sendMoney.rakMoneyTab = false;
			self.sendMoney.mobileCashTab = false;

			if (responseList == null) {
				return;
			}

			if (responseList[0].hasOwnProperty('mobBenfTypeList')){
				self.mobileCash.benfTypeList=responseList[0].mobBenfTypeList;
				}

			if (!responseList[0].hasOwnProperty('errorMessage') && !self.common.fromAuthPage) {

            if (responseList[0].hasOwnProperty('accountLedgerBalance')) {
				self.sendMoney.availBal = responseList[0].accountLedgerBalance;
			}

            else  if (responseList[0].hasOwnProperty('exchangeRate')) {
				self.sendMoney.exchangeRate = responseList[0].exchangeRate;
				self.common.exchangeAmt=responseList[0].convertedAmt;
			}

            else if (responseList[0].hasOwnProperty('purposeListUpdated')) {
				self.sendMoney.purpose = responseList[0].purposeListUpdated;
				this.updatetop10ReasonList();
			}

            else  {
					// getting the TO list for fisrt Loading of Page
            	if(responseList[0].hasOwnProperty('RESPONSEPAGE') && responseList[0].RESPONSEPAGE=='RAKSENDMONEY'){
					self.utils.populateCurrentDateDetails();

					self.sendMoney.benAccounts = responseList[0].beneficiaryList;
					if (responseList[0].hasOwnProperty('benfRestCountryList')) {
						self.sendMoney.benfRestCountryList = responseList[0].benfRestCountryList;
					}
					// self.sendMoney.ownAccounts = responseList[0].fromAccountsList;
					self.sendMoney.ownAccounts = responseList[0].toAccountsList;
					self.sendMoney.fromAccounts = responseList[0].fromAccountsList;
					
					//Added for access level CR changes start
					self.sendMoney.fromAccountsListOwn = responseList[0].fromAccountsListOwn;
					self.sendMoney.fromAccountsListRbf = responseList[0].fromAccountsListRbf;
					self.sendMoney.fromAccountsListUbf = responseList[0].fromAccountsListUbf;
					self.sendMoney.fromAccountsListObf = responseList[0].fromAccountsListObf;
					//Added for access level CR changes end
					
					self.sendMoney.currencyList = responseList[0].currencyList;
					self.sendMoney.ownCurrencyList=responseList[0].ownCurrencyList;
					self.sendMoney.frequencyType = responseList[0].frequencyType;
					self.sendMoney.promoCode = responseList[0].promoList;
					self.sendMoney.charges = responseList[0].chargeList;
					self.sendMoney.purpose = responseList[0].purposeList;
					self.sendMoney.RemcurrencyList = responseList[0].remCurrencyList;
					self.sendMoney.remitCurrency = responseList[0].remitCurrency;
					self.sendMoney.remitCrnFilter=responseList[0].remCrnFilter;
					self.sendMoney.reasonList=responseList[0].reasonList;
					self.sendMoney.reasonListForTxrn=responseList[0].reasonListForTxrn;
					self.sendMoney.subAccountTypeDesc = responseList[0].fromAccountsList[0].subAccountTypeDesc;
					self.sendMoney.selectedFrequency="O";
					self.sendMoney.promoCodeForFT= responseList[0].promoCodeForFT;
					self.sendMoney.promoCodeForREM= responseList[0].promoCodeForREM;
					self.sendMoney.topTenReasonForUBF_AED = responseList[0].topTenReasonForUBF_AED || [];	
					self.sendMoney.topTenReasonForUBF_FCY = responseList[0].topTenReasonForUBF_FCY || [];
					self.sendMoney.topTenReasonForOBF = responseList[0].topTenReasonForOBF || [];
				// This below code is applicable only for Payee to send money transition
					if(self.sendMoney.isFromPayeeFlow){
						self.sendMoney.clearFields();
						self.sendMoney.selectedToBenAccount=responseList[0].selectedBenf;
						self.sendMoney.getEventForBenf();
						self.sendMoney.setTxnType();
						/*self.sendMoney.getPurposeList();*/
						self.sendMoney.getRemCurrencyPrepopulate();
						self.sendMoney.filterCurrencyArray();
						self.sendMoney.getresidentCountryForBenf();
						self.sendMoney.getBankNameFlagBenf(responseList); //FTA
						self.sendMoney.isFromPayeeFlow=false;
						this.updatetop10ReasonList();
						//HD 1742380
						if(self.sendMoney.reasonListForTxrn==''){
							self.sendMoney.reasonListForTxrn = responseList[0].reasonListForTxrn;
							self.sendMoney.topTenReasonForUBF_AED = responseList[0].topTenReasonForUBF_AED;	
							self.sendMoney.topTenReasonForUBF_FCY = responseList[0].topTenReasonForUBF_FCY;
							self.sendMoney.topTenReasonForOBF = responseList[0].topTenReasonForOBF;
						}
					}
					// This below code is applicable only for Payee to send money transition


					//self.alterTxnCurrenyArray();

				}
            }
			}

		},
		submitExchangeChk:function(){
			if(self.common.exchangeRate){
				self.common.exchangeRateCall=true;
			}
			else{
				self.common.exchangeRateCall=false;
			}
		},
		// RAk Added for confirmation page init

		resubmitAuth:function(responseList){
			if(!responseList[0].hasOwnProperty('errorMessage') && rootScope.rakCorpInit.corpModel.backFlag !='Y'){
			self.sendMoney.selectedReason= responseList[0].selectedReason;
			self.sendMoney.selectedReason1 = responseList[0].selectedReason1;
			self.sendMoney.selectedReason2 = responseList[0].selectedReason2;
			self.sendMoney.selectedReason3 = responseList[0].selectedReason3;
			}
		},
		initAuthPage : function(responseList) {

			if (!responseList[0].hasOwnProperty('errorMessage') && rootScope.rakCorpInit.corpModel.backFlag !='Y') {
				self.common.transactionDate = self.common.displayDate
						.toLocaleDateString();// responseList[0].txnDate;

				self.common.fromDisplayString = responseList[0].fromAccountId;
				self.common.toDisplayString = responseList[0].toAccountId;
				if(responseList[0].hasOwnProperty('beneficiaryResidentCountryDisplay')){
					self.common.beneficiaryResidentCountryDisplay = responseList[0].beneficiaryResidentCountryDisplay;
				}
				self.common.amount = responseList[0].entryAMT;
				self.common.currency = responseList[0].txnCurrency;
				self.common.transactionDate = responseList[0].txnDate;
				self.common.reason = responseList[0].remarks;
				self.common.txnType = responseList[0].txnType;
				self.common.noOfTransfer = responseList[0].recNoInstall;
				self.common.charges = responseList[0].CHARGES;
				self.common.purpose = responseList[0].PURPOSE;
				self.common.remtCurr = responseList[0].REMTCURR;
				self.common.frequencyType = responseList[0].recFreq;
				if(responseList[0].hasOwnProperty('freqType')) {
					self.common.freqType = responseList[0].freqType;
				}
				self.common.beneficaryNickName = responseList[0].beneficaryNickName;
				if(responseList[0].hasOwnProperty('beneficaryName')) {
					self.common.beneficaryName = responseList[0].beneficaryName;
				}
				self.common.nickname = responseList[0].nickname;
				self.common.balCheck = responseList[0].balCheck;
				self.common.creditAmt = responseList[0].CREDIT_AMOUNT;
				self.common.chargeAmt = responseList[0].CHARGE_AMOUNT;
				self.common.reason1 = responseList[0].REASON1;
				self.common.reason2 = responseList[0].REASON2;
				self.common.reason3 = responseList[0].REASON3;
				//Added for IBAN
				self.common.IBANNO = responseList[0].BENFACCNO;
				self.common.message=responseList[0].MESSAGE;
				//Added for Card Remittance
				self.common.cashLimit=responseList[0].CASH_LIMIT;
				self.common.retailLimit=responseList[0].RETAIL_LIMIT_OUT;

		/*		 if(self.schedule.schTxnListSubmitBtn && self.schedule.schTxnListSubmitBtn=='MODIFY')	{
				    	self.common.message=self.common.message && self.common.message.substring(self.common.message.lastIndexOf(".")+1) ? self.common.message.substring(self.common.message.lastIndexOf(".")+1) : self.common.message;
				    }*/

				self.common.beneficiaryAccountNumber=responseList[0].beneficiaryAccountNumber;

				self.common.promocode=responseList[0].PROMOCODESEL;

				self.common.exchangeRate= responseList[0].EFFECTIVERATE;
				self.common.convertedAmt= responseList[0].CONVERTEDAMT;
				//RAK:3:: Fix for Issue 1806 START
				if(responseList[0].hasOwnProperty('selectedPurposeDesc')) {
					self.sendMoney.selectedPurposeDesc = responseList[0].selectedPurposeDesc;
				}
				//RAK:3:: Fix for Issue 1806 END

				self.common.registeredForSoftToken= responseList[0].registeredForSoftToken;
			}

			if (responseList[0].hasOwnProperty("auth")) {
				authResponse = responseList[0].auth;
				WL.Logger.info('Auth value' + authResponse);
			} else if (responseList[0].hasOwnProperty('authentication'))
				authResponse = responseList[0].auth;
			else {

				authResponse = "";
			}

			if (!responseList[0].hasOwnProperty('errorMessage')) {
				if (authResponse == "SMS OTP") {
					self.common.authType = self.authMode.OTP;
					self.common.isAuthSet = true;
				} else if (authResponse == "Transaction Password") {

					self.common.authType = self.authMode.TransactionPassword;
					WL.Logger.info('value for transaction Password'
							+ self.common.authType)
					self.common.isAuthSet = true;
				} else {
					self.common.authType = self.authMode.None;
					self.common.isAuthSet = false;
				}
			}

		},
		// RAk added for confiramation page event call
		getAuthConfirmEvent : function() {
			var eventSel = '';

			if (self.sendMoney.selectedBenType != "undefined"
					&& self.sendMoney.selectedFrequency != "undefined") {
				if(self.schedule.schTxnListSubmitBtn=='MODIFY' && rootScope.rakPendingApproval.pendingApprovalTab!='PIA'){
					eventSel = 'onConfirmModifyTransferClick';
				}
				else if(self.schedule.schTxnListSubmitBtn=='MODIFY' && rootScope.rakPendingApproval.pendingApprovalTab=='PIA'){
					eventSel = 'onConfirmModifyIncompTransferClick';
				}
				else if(self.schedule.schTxnListSubmitBtn=='SUBMIT'){
					eventSel = 'onConfirmSubmitSelfTransfersClick';
				}
				else{
					var frequencyType = '';
					frequencyType = self.sendMoney.selectedFrequency == 'O' ? "O"
							: "REC";

						switch (self.sendMoney.selectedBenType + frequencyType) {
						case self.RAKSENDMONEYBENFTYPE.OWN+"O":
							eventSel = 'onConfirmSelfTransfersClick';
							break;

						case self.RAKSENDMONEYBENFTYPE.OWN+"REC":
							eventSel = 'onRecOWNTransfersConfirmClick';
							break;

						case self.RAKSENDMONEYBENFTYPE.RAKBANK+"O":
							eventSel = 'onRAKSingleTransfersConfirmClick';
							break;

						case self.RAKSENDMONEYBENFTYPE.RAKBANK+"REC":
							eventSel = 'onRAKRecTransfersConfirmClick';
							break;

						case self.RAKSENDMONEYBENFTYPE.WITHINUAE+"O":
							eventSel = 'onWithinUAESingleTransfersConfirm';
							break;

						case self.RAKSENDMONEYBENFTYPE.WITHINUAE+"REC":
							eventSel = 'onWithinUAERecSelfTransfersConfirm';
							break;

						case self.RAKSENDMONEYBENFTYPE.OUTUAE+"O":
							eventSel = 'onOutsideUAESingleTransfersConfirm';
							break;

						case self.RAKSENDMONEYBENFTYPE.OUTUAE+"REC":
							eventSel = 'onOutsideUAERecSelfTransfersConfirm';
							break;
						default:
							break;
						}
				}

				WL.Logger.info('Send money auth Confirm submit' + eventSel);
			}

			return eventSel.toString();
		},

		getAuthConfirmationEvent : function() {
			var eventSel = '';

			if (self.sendMoney.selectedFrequency != "undefined") {
				var frequencyType = '';
				frequencyType = self.sendMoney.selectedFrequency == 'O' ? "O"
						: "REC";

				switch (frequencyType) {
				case "O":
					eventSel = 'onRakMoneySingleTransfersConfirm';
					break;

				case "REC":
					eventSel = 'onRakMoneyRecTransfersConfirm';
					break;

				default:
					break;
				}

				WL.Logger.info('Send money auth Confirm submit' + eventSel);
			}

			return eventSel.toString();
		},
		// RAK added for Success page init Method

		initSuccessPage : function(responseList) {
			self.common.successMessage = responseList[0].transferStatusMessage;
			self.common.refId=responseList[0].REQUESTID;
			if (responseList[0].hasOwnProperty('transferBeneficiaryResponse')) {
				self.common.successMessage = responseList[0].transferBeneficiaryResponse;
				self.common.refId=responseList[0].REQUESTID;
			}
			if (responseList[0].hasOwnProperty('messagedescription')) {
				self.common.successMessage = responseList[0].messagedescription;
				self.common.refId=responseList[0].REQUESTID;
			}
			if (responseList[0].hasOwnProperty('nextApprover')) {
				self.common.nextApprover = responseList[0].nextApprover;

			}
		},
		getSelectedCurrencyFilter : function() {
			if (!self.sendMoney.selectedToBenAccount == '') {
				self.sendMoney.selectedRCurr = self.sendMoney.benAccounts[self.sendMoney.selectedToBenAccount]['beneficiaryAccountCurrency']
						.toString();

			}
		},

		initPayNowEditPage : function(responseList) {

			var txnType='';
			var histTxnType='';

			if(rootScope.rakPendingApproval.pendingApprovalTab=='PIA'){
				txnType=self.schedule.selectedTxn.effTxnType;
				histTxnType=self.schedule.selectedTxn.effTxnType;
			}
			else{
				txnType=self.schedule.selectedTxn.txnType;
				histTxnType=self.txnHistory.txnType
			}

			self.sendMoney.bankTransferTab = true;
			self.sendMoney.rakMoneyTab = false;
			self.sendMoney.mobileCashTab = false;

			if (responseList == null) {
				return;
			}

			 if (responseList[0] && responseList[0].hasOwnProperty('recFreq')) {
  				self.sendMoney.payAgainRecFreq = responseList[0].recFreq;
  			}

		if (!responseList[0].hasOwnProperty('errorMessage') && !self.common.fromAuthPage) {

			if (txnType==self.RAKSENDMONEYTXNTYPE.RAKMONEY && responseList[0].hasOwnProperty('rakMoneyPurposeList')) {
				self.rakMoney.purpose = responseList[0].rakMoneyPurposeList;
			}



			if (responseList[0].hasOwnProperty('accountLedgerBalance')) {
				self.sendMoney.availBal = responseList[0].accountLedgerBalance;
			}

            else  if (responseList[0].hasOwnProperty('exchangeRate')) {
				self.sendMoney.exchangeRate = responseList[0].exchangeRate;
				self.common.exchangeAmt=responseList[0].convertedAmt;
			}

            else if (responseList[0].hasOwnProperty('purposeListUpdated')) {
				self.sendMoney.purpose = responseList[0].purposeListUpdated;
				this.updatetop10ReasonList();
			}

            else  {
					// getting the TO list for fisrt Loading of Page
            	if(responseList[0].hasOwnProperty('RESPONSEPAGE') && responseList[0].RESPONSEPAGE=='RAKSENDMONEY'){
					self.utils.populateCurrentDateDetails();

					self.sendMoney.benAccounts = responseList[0].beneficiaryList;
					//self.sendMoney.ownAccounts = responseList[0].fromAccountsList;
					self.sendMoney.ownAccounts = responseList[0].toAccountsList;
					if (responseList[0].hasOwnProperty('benfRestCountryList')) {
						self.sendMoney.benfRestCountryList = responseList[0].benfRestCountryList;
					}
					self.sendMoney.fromAccounts = responseList[0].fromAccountsList;
					self.sendMoney.fromAccountsOwn = responseList[0].fromAccountsListOwn;
					self.sendMoney.fromAccountsRbf = responseList[0].fromAccountsListRbf;
					self.sendMoney.fromAccountsUbf = responseList[0].fromAccountsListUbf;
					self.sendMoney.fromAccountsObf = responseList[0].fromAccountsListObf;
					self.sendMoney.currencyList = responseList[0].currencyList;
					self.sendMoney.frequencyType = responseList[0].frequencyType;
					self.sendMoney.ownCurrencyList=responseList[0].ownCurrencyList;
					self.sendMoney.promoCode = responseList[0].promoList;
					self.sendMoney.charges = responseList[0].chargeList;
					self.sendMoney.purpose = responseList[0].purposeList;
					self.sendMoney.RemcurrencyList = responseList[0].remCurrencyList;
					self.sendMoney.remitCurrency = responseList[0].remitCurrency;
					self.sendMoney.remitCrnFilter=responseList[0].remCrnFilter;
					self.sendMoney.reasonList=responseList[0].reasonList;
					self.sendMoney.reasonListForTxrn=responseList[0].reasonListForTxrn;
					self.sendMoney.subAccountTypeDesc = responseList[0].fromAccountsList[0].subAccountTypeDesc;
					self.sendMoney.selectedFrequency="O";
					self.sendMoney.promoCodeForFT= responseList[0].promoCodeForFT;
					self.sendMoney.promoCodeForREM= responseList[0].promoCodeForREM;
					self.sendMoney.topTenReasonForUBF_AED = responseList[0].topTenReasonForUBF_AED;	
					self.sendMoney.topTenReasonForUBF_FCY = responseList[0].topTenReasonForUBF_FCY;
					self.sendMoney.topTenReasonForOBF = responseList[0].topTenReasonForOBF;
					//self.sendMoney.selectedPurpose='TAX'; //FTA
					
  						/*for(var temp in self.sendMoney.purpose){
		  					if(self.sendMoney.purpose[temp].purposeCode==self.sendMoney.FTA_TAX){
		  						self.sendMoney.selectedPurpose=self.sendMoney.purpose[temp].purposeCode;
		  						self.sendMoney.selectedPurposeDisplay=self.sendMoney.purpose[temp].purposeDesc; //FTA
		  						break;
		  					}
		  				}*/
  					
  					
					
					self.sendMoney.selectedCharges='All Charges to my Account'; //FTA
					self.sendMoney.selectedFrequency='Once'; //FTA


				}
            }

           if((self.schedule.schTxnListSubmitBtn=='MODIFY' || self.schedule.schTxnListSubmitBtn=='AGAIN') && self.common.exchangeRateCall==false){

        	   /*if (self.schedule.selectedTxn.txnType == 'WCT') {
   				scope.setEvent('getPurposeListService');

   				}*/
        	   self.sendMoney.initorType = responseList[0].initorType;
        	   if (responseList[0].hasOwnProperty('initorId')) {
					self.schedule.initAcc = Number(responseList[0].initorId);
				}
        	   	
        	    //if(self.schedule.schTxnListSubmitBtn=='MODIFY') {
					if(self.sendMoney.fromAccounts){
				          for(var temp in self.sendMoney.fromAccounts){
			  					if(self.sendMoney.fromAccounts[temp].accountNumber==self.schedule.initAcc){
			  						self.sendMoney.selectedFromAccount=self.sendMoney.fromAccounts[temp].accountIndex;
			  						break;
			  					}
			  				}
					}
        	   // }
        	   
        	   if(txnType==self.RAKSENDMONEYTXNTYPE.OWN && self.schedule.schTxnListSubmitBtn=='AGAIN') {
       	   		if(self.sendMoney.fromAccountsOwn){
     		          for(var temp in self.sendMoney.fromAccountsOwn){
     	  					if(self.sendMoney.fromAccountsOwn[temp].accountNumber==self.schedule.initAcc){
     	  						self.sendMoney.selectedFromAccountNew=self.sendMoney.fromAccountsOwn[temp].accountIndex;
     	  						break;
     	  					}
     	  				}
       	   		}
       	   	}
       	   	
       	   	if(txnType==self.RAKSENDMONEYTXNTYPE.RAKBANK && self.schedule.schTxnListSubmitBtn=='AGAIN') {
       	   		if(self.sendMoney.fromAccountsRbf){
     		          for(var temp in self.sendMoney.fromAccountsRbf){
     	  					if(self.sendMoney.fromAccountsRbf[temp].accountNumber==self.schedule.initAcc){
     	  						self.sendMoney.selectedFromAccountNew=self.sendMoney.fromAccountsRbf[temp].accountIndex;
     	  						break;
     	  					}
     	  				}
       	   		}
       	   	}
       	   	
       	   	if(txnType==self.RAKSENDMONEYTXNTYPE.WITHINUAE && self.schedule.schTxnListSubmitBtn=='AGAIN') {
       	   		if(self.sendMoney.fromAccountsListUbf){
     		          for(var temp in self.sendMoney.fromAccountsListUbf){
     	  					if(self.sendMoney.fromAccountsListUbf[temp].accountNumber==self.schedule.initAcc){
     	  						self.sendMoney.selectedFromAccountNew=self.sendMoney.fromAccountsListUbf[temp].accountIndex;
     	  						break;
     	  					}
     	  				}
       	   		}
       	   	}
       	   	
       	   	if(txnType==self.RAKSENDMONEYTXNTYPE.OUTSIDEUAE && self.schedule.schTxnListSubmitBtn=='AGAIN') {
       	   		if(self.sendMoney.fromAccountsListObf){
     		          for(var temp in self.sendMoney.fromAccountsListObf){
     	  					if(self.sendMoney.fromAccountsListObf[temp].accountNumber==self.schedule.initAcc){
     	  						self.sendMoney.selectedFromAccountNew=self.sendMoney.fromAccountsListObf[temp].accountIndex;
     	  						break;
     	  					}
     	  				}
       	   		}
       	   	}

				if (responseList[0].hasOwnProperty('destId')) {
					self.schedule.destAcc =responseList[0].destId;
				}
				if(self.sendMoney.ownAccounts){
			          for(var temp in self.sendMoney.ownAccounts){
		  					if(self.sendMoney.ownAccounts[temp].accountNumber==self.schedule.destAcc){
		  						self.sendMoney.selectedToAccount=self.sendMoney.ownAccounts[temp].accountIndex;
		  						break;
		  					}
		  				}
				}
				if(txnType==self.RAKSENDMONEYTXNTYPE.OWN){
					self.sendMoney.selectedToAccountDisp=self.sendMoney.selectedToAccount ? self.sendMoney.ownAccounts[self.sendMoney.selectedToAccount].subAccountTypeDesc+"-"+self.sendMoney.ownAccounts[self.sendMoney.selectedToAccount].accountNumber+
							"-"+self.sendMoney.ownAccounts[self.sendMoney.selectedToAccount].currencyCode : "";
				self.sendMoney.filterCurrencyArray();
				}
				//self.common.updateBal('onAccountSelectionBalCall');

				self.sendMoney.selectedCurrency = self.schedule.selectedTxn.txnCurrency;
				self.sendMoney.amount = Number(self.schedule.selectedTxn.txnAmountDisp);
				if(self.schedule.schTxnListSubmitBtn=='MODIFY' && txnType!=self.RAKSENDMONEYTXNTYPE.RAKMONEY){
					//self.common.displayDate = new Date(self.schedule.selectedTxn.txnDate);

					self.common.dd = new Date(self.schedule.selectedTxn.txnDate,'DD-MM-YY');

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
				}
				else if(self.schedule.schTxnListSubmitBtn=='AGAIN' || txnType==self.RAKSENDMONEYTXNTYPE.RAKMONEY){
					self.common.displayDate = new Date();
				}



 

				if(self.rakMoney.purpose){
			          for(var temp in self.rakMoney.purpose){
		  					if(self.rakMoney.purpose[temp].purposeCode==responseList[0].selPurpose){
		  						self.rakMoney.selectedPurpose=self.rakMoney.purpose[temp].purposeCode;
		  						break;
		  					}
		  				}
				}

				if(txnType==self.RAKSENDMONEYTXNTYPE.RAKMONEY){
					self.sendMoney.selectedFrequency='O';
					self.sendMoney.selectedFrequencyDisp='Once';

					self.sendMoney.selectedCharges = 'O';
					self.sendMoney.selectedChargesDisplay = 'All Charges to my Account';
				}
				else{
					if(self.sendMoney.charges){
				          for(var temp in self.sendMoney.charges){
			  					if(self.sendMoney.charges[temp].chargeCode==responseList[0].chargeInd){
			  						self.sendMoney.selectedCharges=self.sendMoney.charges[temp].chargeCode;
			  						self.sendMoney.selectedChargesDisplay=self.sendMoney.charges[temp].chargeDesc; //FTA
			  						break;
			  					}
			  				}
					}

					if(self.sendMoney.frequencyType){
				          for(var temp in self.sendMoney.frequencyType){
			  					if(self.sendMoney.frequencyType[temp].frequencyTypeCode==self.sendMoney.payAgainRecFreq){
			  						self.sendMoney.selectedFrequency=self.sendMoney.frequencyType[temp].frequencyTypeCode;
			  						self.sendMoney.selectedFrequencyDisp=self.sendMoney.frequencyType[temp].frequencyTypeDesc;
			  						break;
			  					}
			  				}
					}
				}

				//self.sendMoney.selectedFrequencyDisp=self.schedule.selectedTxn.txnFrequency;
				self.schedule.toAccountDisp = rootScope.appLiterals.APP.RAKSEND_MONEY.RAKTRANSFERS_PAYNOW_PAGE.PLCHOLDER_TO +" : "+self.schedule.selectedTxn.toAccount;
				//self.sendMoney.selectedToAccount = self.schedule.selectedTxn.toAccount;

				//added for modify  flow for ticket fix
				if (self.sendMoney.benAccounts) {
					switch (txnType) {
					case self.RAKSENDMONEYTXNTYPE.OWN:
						self.sendMoney.accountSelected= rootScope.appLiterals.APP.RAKSEND_MONEY.RAKTRANSFERS_PAYNOW_PAGE.SELF;


						break;
					default:
						for(var temp in self.sendMoney.benAccounts){

							if(self.sendMoney.benAccounts[temp].beneficiaryNickName==self.schedule.selectedTxn.toAccount){
							self.sendMoney.accountSelected=self.sendMoney.benAccounts[temp].beneficiaryName;
							}
						}

					    break;
					}

				}
				//ended for modify  flow for ticket fix

				if(self.sendMoney.benAccounts){
					switch (histTxnType) {
					case self.RAKSENDMONEYTXNTYPE.OWN:
						self.sendMoney.selectedToBenAccount= self.sendMoney.benAccounts[0].beneficiaryIndex;


						break;
					default:
			          for(var temp in self.sendMoney.benAccounts){
		  					if(self.sendMoney.benAccounts[temp].beneficiaryNickName==self.schedule.selectedTxn.toAccount){
		  						self.sendMoney.selectedBenType=self.sendMoney.benAccounts[temp].beneficiaryType;
		  						self.sendMoney.selectedToBenAccount = self.sendMoney.benAccounts[temp].beneficiaryIndex;
		  						break;
		  					}
		  				}
				}
				}

				if(txnType==self.RAKSENDMONEYTXNTYPE.RAKMONEY){
					//self.sendMoney.benfUpdatedIndex = Number(self.sendMoney.selectedToBenAccount)+1;
					self.sendMoney.benfUpdatedIndex = Number(self.sendMoney.selectedToBenAccount);
				}



				if(self.sendMoney.selectedBenType==self.RAKSENDMONEYBENFTYPE.OUTUAE){
					self.sendMoney.cpType='O';
					self.sendMoney.creditAccount=(Number(self.sendMoney.selectedToAccount)+1).toString();
				}
				else{
					self.sendMoney.cpType='P';
					self.sendMoney.creditAccount=self.sendMoney.selectedToBenAccount.toString();
				}

				if (self.sendMoney.selectedToBenAccount != undefined && self.sendMoney.selectedToBenAccount!=0) {
					var benfCountry=self.sendMoney.benAccounts[self.sendMoney.selectedToBenAccount]['beneficiaryCountry'].toString();
					var benType = self.sendMoney.benAccounts[self.sendMoney.selectedToBenAccount]['beneficiaryType'].toString();
					/* XM Changes Start*/
					var residentCountryAvailable =self.sendMoney.benAccounts[self.sendMoney.selectedToBenAccount].benefResidentCountryAvailable;
  					if(residentCountryAvailable && residentCountryAvailable=='N'){
  						self.sendMoney.showResidentCountryField = 'Y';
  					}else{
  						self.sendMoney.showResidentCountryField = 'N';
  					}
  					
  					
					/* XM Changes End*/
					
					/*FTA  changes start*/
  					self.sendMoney.rakBenfBankName=self.sendMoney.benAccounts[self.sendMoney.selectedToBenAccount]['bankName'].toString().toUpperCase();
  					if(self.sendMoney.rakBenfBankName=='FEDERAL TAX AUTHORITY'){
  						self.sendMoney.showFDAComponentFlag = 'N';
  					}else{
  						self.sendMoney.showFDAComponentFlag = 'Y';
  					}
					/*FTA  changes End*/

					if(benType!=self.RAKSENDMONEYBENFTYPE.RAKBANK){
						for(var temp in self.sendMoney.remitCrnFilter){
							if(benfCountry==self.sendMoney.remitCrnFilter[temp]['filterCode']){

								self.sendMoney.selectedRCurr=self.sendMoney.remitCrnFilter[temp]['filterDesc'];
								self.sendMoney.creditCrn=self.sendMoney.selectedRCurr;
								break;
							}
						}
					}
				}



				self.sendMoney.txnCurrencyArray=[];
				if (self.sendMoney.selectedToBenAccount != undefined && self.sendMoney.selectedToBenAccount!=0) {
					var benfCountry=self.sendMoney.benAccounts[self.sendMoney.selectedToBenAccount]['beneficiaryCountry'].toString();
					var benType = self.sendMoney.benAccounts[self.sendMoney.selectedToBenAccount]['beneficiaryType'].toString();

					if(benType==self.RAKSENDMONEYBENFTYPE.OWN && self.sendMoney.selectedToAccount!=undefined){
						self.sendMoney.creditCrn=self.sendMoney.ownAccounts[self.sendMoney.selectedToAccount]['currencyCode'];
					}
					else{
							for(var temp in self.sendMoney.remitCrnFilter){
									if(benfCountry==self.sendMoney.remitCrnFilter[temp]['filterCode']){
										//HD 1680399 START
										self.sendMoney.selectedRCurr=self.sendMoney.remitCrnFilter[temp]['filterDesc'];
										//HD 1680399 END
										self.sendMoney.creditCrn=self.sendMoney.selectedRCurr;
										break;
									}

							}
						}
					}


				if (self.sendMoney.selectedFromAccount != undefined && self.sendMoney.selectedFromAccount !="") {
					self.sendMoney.selectedCurrency = self.sendMoney.fromAccounts[self.sendMoney.selectedFromAccount]['currencyCode']
							.toString();
					self.sendMoney.debitCrn=self.sendMoney.selectedCurrency;

				}
				else{
				self.sendMoney.selectedRCurr=responseList[0].REMITTANCE_CRNCY ? responseList[0].REMITTANCE_CRNCY :self.sendMoney.selectedRCurr;
				self.sendMoney.debitCrn=responseList[0].TXN_CRN ? responseList[0].TXN_CRN :self.sendMoney.debitCrn;
				}

				self.sendMoney.selectedRCurr=responseList[0].REMITTANCE_CRNCY ? responseList[0].REMITTANCE_CRNCY :self.sendMoney.selectedRCurr;
				for(var temp in self.sendMoney.currencyList){
					if(self.sendMoney.currencyList[temp]['currencyCode']==self.sendMoney.debitCrn || self.sendMoney.currencyList[temp]['currencyCode']==self.sendMoney.selectedRCurr){
						self.sendMoney.txnCurrencyArray.push(self.sendMoney.currencyList[temp]);
						self.sendMoney.selectedCurrency=responseList[0].TXN_CRN;
					}
					else if(self.sendMoney.selectedRCurr!=null && self.sendMoney.selectedRCurr!='' && !self.sendMoney.txnCurrencyArray.hasOwnProperty[self.sendMoney.selectedRCurr] && self.sendMoney.currencyList[temp]['currencyCode']==self.sendMoney.selectedRCurr){
						self.sendMoney.txnCurrencyArray.push(self.sendMoney.currencyList[temp]);
					}
				}

				if (responseList[0].hasOwnProperty('installments') && responseList[0].installments != 1) {
					self.sendMoney.noOfTransfer = Number(responseList[0].installments);
				}
				
					/* XM Changes Start*/
				if (self.sendMoney.selectedToBenAccount != undefined && self.sendMoney.selectedToBenAccount!=0) {
					
					var benType = self.sendMoney.benAccounts[self.sendMoney.selectedToBenAccount]['beneficiaryType'].toString();
					/* XM Changes Start*/
					
  					
  					 var withinUAEBenfCountryAvailable = self.sendMoney.benAccounts[self.sendMoney.selectedToBenAccount]['withinUAEBenfCountryAvailable']
					 self.sendMoney.withinUAEBenfCountryAvailable= withinUAEBenfCountryAvailable ;
					 
					 if (benType == 'UBF' && self.sendMoney.selectedRCurr && self.sendMoney.selectedRCurr != "AED" && withinUAEBenfCountryAvailable && withinUAEBenfCountryAvailable=='N') {
						 self.sendMoney.showUBFResidentCountry = "YES";
					 } else{
						 self.sendMoney.showUBFResidentCountry = "NO";
					 }
					/* XM Changes End*/
  					
				
				}
				/* XM Changes End*/
				
				this.updatetop10ReasonList();

				if(self.sendMoney.purpose){
			          for(var temp in self.sendMoney.purpose){
		  					if(self.sendMoney.purpose[temp].purposeCode==responseList[0].selPurpose){
		  						self.sendMoney.selectedPurpose=self.sendMoney.purpose[temp].purposeCode;
		  						break;
		  					}
		  				}
				}
				if(self.sendMoney.rakBenfBankName=='FEDERAL TAX AUTHORITY'){
					for(var temp in self.sendMoney.purpose){
	  					if(self.sendMoney.purpose[temp].purposeCode==self.sendMoney.FTA_TAX){
	  						self.sendMoney.selectedPurpose=self.sendMoney.purpose[temp].purposeCode;
	  						self.sendMoney.selectedPurposeDisplay=self.sendMoney.purpose[temp].purposeDesc; //FTA
	  						break;
	  					}
	  				}
				}
				
				if(txnType==self.RAKSENDMONEYTXNTYPE.OWN || txnType==self.RAKSENDMONEYTXNTYPE.RAKBANK){
					self.sendMoney.selectedReason = responseList[0].entRemarks;
				}
				else if(txnType==self.RAKSENDMONEYTXNTYPE.WITHINUAE || txnType==self.RAKSENDMONEYTXNTYPE.OUTSIDEUAE
						|| txnType==self.RAKSENDMONEYTXNTYPE.RAKMONEY){
					var reasonArray = responseList[0].entRemarks.split('~');

					var reasonListForTxrn = self.sendMoney.reasonListForTxrn;

					if(self.schedule.selectedTxn.txnType==self.RAKSENDMONEYTXNTYPE.WITHINUAE && self.schedule.selectedTxn.txnCurrency == "AED"){
						 reasonListForTxrn = self.sendMoney.reasonList;
					}
					if(self.sendMoney.reasonList){
				          for(var temp in reasonListForTxrn){
			  					if(reasonListForTxrn[temp].reasonCode==reasonArray[0]){
			  						self.sendMoney.selectedReason=reasonListForTxrn[temp].reasonCode;
			  						break;
			  					}
			  				}

					}



					self.sendMoney.selectedReason1 = reasonArray[1];
					self.sendMoney.selectedReason2 = reasonArray[2];
					self.sendMoney.selectedReason3 = reasonArray[3];
				}

				self.sendMoney.getEventForBenf();


				if(txnType==self.RAKSENDMONEYTXNTYPE.RAKMONEY){
					self.rakMoney.fromAccounts = self.sendMoney.fromAccounts;
					self.rakMoney.selectedFromAccount = self.sendMoney.selectedFromAccount;
					self.rakMoney.getBalanceEvent();
				}
				else{
					self.common.updateBal('onAccountSelectionBalCall');
				}

				self.schedule.schTxnListSubmitBtn="";

           }


		}

	},

	getEventForModifyTransfer : function() {
		if(self.schedule.schTxnListSubmitBtn=='MODIFY'){
			if(jQuery("div.modTxn").find(".ng-dirty").length==0 && !self.common.fromAuthPage && self.sendMoney.isModified == false){

				rootScope.showErrorPopup(rootScope.appLiterals.APP.RAKSEND_MONEY.RAKTRANSFER_VIEWSCHEDULE.NOMODIFYERROR);
				return;
	         }
			else{
				self.sendMoney.isModified = true;
			}
		}

		self.utils.populateCurrentDateDetails();
		var eventSel = '';

		WL.Logger.info('Send Money Event selection criteria: '
				+ self.sendMoney.selectedBenType + ""
				+ self.sendMoney.selectedFrequency + ""
				+ self.sendMoney.selectedCharges);
		if (self.sendMoney.selectedBenType != "undefined"
				&& self.sendMoney.selectedFrequency != "undefined") {
			var frequencyType = '';
			frequencyType = self.sendMoney.selectedFrequency == 'O' ? "O"
					: "REC";

			switch (self.sendMoney.selectedBenType + frequencyType) {
			case self.RAKSENDMONEYBENFTYPE.OWN+"O":
				eventSel = 'onSelfTransfersClick';
				break;
			case self.RAKSENDMONEYBENFTYPE.OWN+"REC":
				eventSel = 'onRecOWNTransfersClick';
				break;
			case self.RAKSENDMONEYBENFTYPE.RAKBANK+"O":
				eventSel = 'onRAKSingleTransfersClick';
				break;
			case self.RAKSENDMONEYBENFTYPE.RAKBANK+"REC":
				eventSel = 'onRAKRecTransfersClick';
				break;

			case self.RAKSENDMONEYBENFTYPE.WITHINUAE+"O":
				eventSel = 'onWithinUAESingleTransfersClick';
				break;

			case self.RAKSENDMONEYBENFTYPE.WITHINUAE+"REC":
				eventSel = 'onWithinUAERecTransfersClick';
				break;

			case self.RAKSENDMONEYBENFTYPE.OUTUAE+"O":
				//fix for HD
				if(self.schedule.selectedTxn.txnType==self.RAKSENDMONEYTXNTYPE.RAKMONEY && rootScope.userTypeValue=="1"){
					eventSel = 'onSingleMoneyModifyTransfersClick';
				}
				else{
					eventSel = 'onOutsideUAESingleTransfersClick';
				}

				break;

			case self.RAKSENDMONEYBENFTYPE.OUTUAE+"REC":
				//fix for HD
				if(self.schedule.selectedTxn.txnType==self.RAKSENDMONEYTXNTYPE.RAKMONEY && rootScope.userTypeValue=="1"){
					eventSel = 'onRecMoneyModifyTransfersClick';
				}
				else{
					eventSel = 'onOutsideUAERecTransfersClick';
				}
				break;
			default:
				break;
			}

			WL.Logger.info('Send money event selected' + eventSel);
		}

		return eventSel.toString();
	}

	};




   self.RAKMONEYCRNCODE = {
			INR : "INR",
			PHP : "PHP"


		};

	// rak Money starts here

	self.rakMoney = {
	selectedBenType : '',
	beneficaryTypes : [],
	selectedFromAccount : '',
	selectedToAccount : "",
	selectedToBenAccount : '',
	ownAccounts : [],
	benAccounts : [],
	fromAccounts : [],
	currencyList : [],
	selectedCurrency : "",
	frequencyType : [],
	selectedFrequency : "O",
	amount : "",
	reason : "",
	selectedpromoCode : "",
	promoCode : [],
	eligibleAmount : "",
	noOfTransfer : "",
	beneficiaryList : [],
	beneficiaryNickName : "",
	beneficiaryAccountNumber : "",
	beneficiaryIndex : "",
	frequencyTypeDesc : "",
	charges : [],
	purpose : [],
	purposeListUpdated : [],
	txnCurrencyArray:[],
	selectedCharges : "",
	selectedPurpose : "",
	remCurrencyList : [],
	remitCurrency : [],
	remitCrnFilter:[],
	selectedRCurr : "",
	subAccountTypeDesc : "",
	isAll : false,
	transactionType : "",
	isBenfSelected : false,
	divSelection : false,
	availBal : '',
	exchangeRate:'',
	dummyTxntype:'',
	debitCrn:'',
	creditCrn:'',
	txnType:'',
	reasonList:[],
	selectedReason:'',
	selectedReason1:'',
	selectedReason2:'',
	selectedReason3:'',
	benfUpdatedIndex:'',
	convertedAmt:'',
	beneficiaryAccountNum:'',
	promoCodeForFT:[],
	promoCodeForREM:[],
	isPromoSelected:false,
	selectedpromoCodeForServer:'',
	bankDetails:[],
	selectedRoutingNumber:'',
	ifscBankName:'',
	ifscBankBranch:'',
	ifscCode:'',
	selectedRoutingNumber:'',
	isBenfFlow:false,
	displayTxnDate:'',
	selectedFrequencyDisp:'',

	clearSelfTransfersData : function() {
		self.rakMoney.selectedBenType = '';
		self.rakMoney.beneficaryTypes = [];
		self.rakMoney.selectedFromAccount = '';
		self.rakMoney.selectedToAccount = '';
		self.rakMoney.selectedToBenAccount = '';
		self.rakMoney.ownAccounts = [];
		self.rakMoney.benAccounts = [];
		self.rakMoney.fromAccounts = [];
		self.rakMoney.currencyList = [];
		self.rakMoney.selectedCurrency = '';
		self.rakMoney.frequencyType = null;
		self.rakMoney.selectedFrequency = null;
		self.rakMoney.amount = null;
		self.rakMoney.noOfTransfer = "";
		self.rakMoney.reason = "";
		self.rakMoney.selectedpromoCode = "";
		self.rakMoney.promoCode = [];
		self.rakMoney.eligibleAmount = null;
		self.rakMoney.beneficiaryList = null;
		self.rakMoney.beneficiaryNickName = null;
		self.rakMoney.beneficiaryAccountNumber = null;
		self.rakMoney.beneficiaryIndex = null;
		self.rakMoney.frequencyTypeDesc = null;
		self.rakMoney.charges = [];
		self.rakMoney.purpose = [];
		self.rakMoney.purposeListUpdated = [];
		self.rakMoney.selectedCharges = '';
		self.rakMoney.txnCurrencyArray=[];
		self.rakMoney.RemcurrencyList = null;
		self.rakMoney.selectedRCurr = '';
		self.rakMoney.subAccountTypeDesc = null;
		self.rakMoney.transactionType = null;
		self.rakMoney.availBal = null;
	    // added entity limit
		self.rakMoney.entitylimit = null;
		
	
		self.rakMoney.exchangeRate='';
		self.rakMoney.dummyTxntype='';
		self.rakMoney.debitCrn=null;
		self.rakMoney.creditCrn=null;
		self.rakMoney.txnType=null;
		self.rakMoney.remitCrnFilter=null;
		self.rakMoney.reasonList=null;
		self.rakMoney.selectedReason='';
		self.rakMoney.selectedReason1="";
		self.rakMoney.selectedReason2="";
		self.rakMoney.selectedReason3="";
		self.rakMoney.benfUpdatedIndex=null;
		self.common.availBal=null;
		self.common.availCashLimit=null;
		//Added for entity limit
		self.common.availEntityLimit=null;
		
		
		self.rakMoney.convertedAmt='';
		self.rakMoney.beneficiaryAccountNum='';

		self.rakMoney.promoCodeForFT=[];
		self.rakMoney.promoCodeForREM=[];
		self.rakMoney.isPromoSelected=false;
		self.rakMoney.selectedpromoCodeForServer='';
		// Added for clearing common data
		self.utils.clearCommonData();
		self.schedule.schTxnListSubmitBtn="";
		self.rakMoney.bankDetails=[];
		self.rakMoney.selectedRoutingNumber='';
		self.rakMoney.ifscBankName='';
		self.rakMoney.ifscBankBranch='';
		self.rakMoney.ifscCode='';
		self.rakMoney.selectedRoutingNumber='';
		self.rakMoney.isBenfFlow=false;
		self.rakMoney.selectedPurpose='';
		self.rakMoney.displayTxnDate='';
		self.rakMoney.selectedFrequencyDisp='';
	},

	refreshValueforExchangeRate :function(){
		self.rakMoney.exchangeRate='';
		self.rakMoney.amount = '';
	},
	getBalanceEvent:function(){
			if(self.rakMoney.fromAccounts[self.rakMoney.selectedFromAccount].accountType== 'CCD'){
			self.common.updateBal('onCCDAccountSelectionBalCall');
		}
		else{
			self.common.updateBal('onAccountSelectionBalCall');
		}
		},


	getDefaultTransCurr : function() {

		if (self.rakMoney.selectedFromAccount != undefined && self.rakMoney.selectedFromAccount!='') {
		if (self.rakMoney.selectedFromAccount != undefined) {
			//HD 1743660 START
			//self.rakMoney.selectedCurrency = self.rakMoney.fromAccounts[self.rakMoney.selectedFromAccount]['currencyCode']
			//		.toString();
			//self.rakMoney.debitCrn=self.rakMoney.selectedCurrency;
			self.rakMoney.debitCrn = self.rakMoney.fromAccounts[self.rakMoney.selectedFromAccount]['currencyCode']
					.toString();
			//HD 1743660 END

		}
		}
	},

	clearFields:function(){
		self.rakMoney.exchangeRate=null;
		self.rakMoney.amount = null;
		self.rakMoney.noOfTransfer = "";
		self.rakMoney.reason = "";
		self.rakMoney.selectedFromAccount = '';
		self.rakMoney.convertedAmt='';
		self.rakMoney.isPromoSelected=false;
		self.rakMoney.selectedpromoCodeForServer='';
		self.rakMoney.selectedpromoCode = '';
		self.common.isIFSC=false;
		self.rakMoney.ifscBankName='';
		self.rakMoney.ifscBankBranch='';
		self.rakMoney.ifscCode='';
		self.rakMoney.selectedRoutingNumber='';
		self.common.availBal='';
		self.rakMoney.selectedReason='';
		self.common.availLimitBal='';
		self.common.dailAvailLimitBal='';
	},
	filterCurrencyArray: function(){
		self.rakMoney.txnCurrencyArray=[];
		self.rakMoney.dummyTxntype="PMT_TRANSFER";
		if (self.rakMoney.selectedToBenAccount) {
			var benfCountry=self.rakMoney.benAccounts[self.rakMoney.selectedToBenAccount]['beneficiaryCountry'].toString();

			var paymentDetails=self.rakMoney.benAccounts[self.rakMoney.selectedToBenAccount]['paymentDetails'].toString();

			var checkPaymentDetail=paymentDetails.substring(0,paymentDetails.indexOf('|'));
			if(!checkPaymentDetail && benfCountry != self.cebCountry){
				self.common.isIFSC=true;
			}

			for(var temp in self.rakMoney.remitCrnFilter){
				if(benfCountry==self.rakMoney.remitCrnFilter[temp]['filterCode']){
					self.rakMoney.creditCrn=self.rakMoney.remitCrnFilter[temp]['filterDesc'];
					//self.rakMoney.creditCrn=self.rakMoney.selectedRCurr;
					break;
				}

		}
			}

		var benType = self.rakMoney.benAccounts[self.rakMoney.selectedToBenAccount]['beneficiaryType'].toString();
		self.rakMoney.selectedBenType = benType;

		if (self.rakMoney.selectedFromAccount != undefined && self.rakMoney.selectedFromAccount !="") {
			self.rakMoney.debitCrn = self.rakMoney.fromAccounts[self.rakMoney.selectedFromAccount]['currencyCode']
					.toString();
			//self.rakMoney.debitCrn=self.rakMoney.selectedCurrency;

		}
		//HD 1743660 START
		else if(self.rakMoney.selectedFromAccount==""){
			self.rakMoney.debitCrn ='';
		}
		//HD 1743660 END

		for(var temp in self.rakMoney.currencyList){
			if(self.rakMoney.currencyList[temp]['currencyCode']==self.rakMoney.debitCrn){
				//self.rakMoney.currencyList[temp]['currencyDesc']=self.rakMoney.currencyList[temp]['currencyDesc']+" "+rootScope.appLiterals.APP.RAKSEND_MONEY.RAKTRANSFERS_PAYNOW_PAGE.TRANSFERCURR;
				self.rakMoney.txnCurrencyArray.push(self.rakMoney.currencyList[temp]);
			}
			else if(self.rakMoney.selectedRCurr!=null && self.rakMoney.selectedRCurr!='' && !self.rakMoney.txnCurrencyArray.hasOwnProperty[self.rakMoney.selectedRCurr] && self.rakMoney.currencyList[temp]['currencyCode']==self.rakMoney.selectedRCurr){
				//self.rakMoney.currencyList[temp]['currencyDesc']=self.rakMoney.currencyList[temp]['currencyDesc']+" "+rootScope.appLiterals.APP.RAKSEND_MONEY.RAKTRANSFERS_PAYNOW_PAGE.TRANSFERCURR;
				self.rakMoney.txnCurrencyArray.push(self.rakMoney.currencyList[temp]);
			}

		}

		//if(self.cebCountry==self.rakMoney.benAccounts[self.rakMoney.selectedToBenAccount]['beneficiaryCountry'].toString()){
				//&& self.rakMoney.benAccounts[self.rakMoney.selectedToBenAccount]['beneficiaryType'] == self.RAKSENDMONEYBENFTYPE.CASHPAYOUT){
			self.rakMoney.selectedCharges = 'O';
			self.rakMoney.selectedChargesDisplay = 'All Charges to my Account';
		//}

	},

	populateTransactionCurrencyForPromoCode :function(selectedPromoCodeTranCurrency){
		self.rakMoney.txnCurrencyArray=[];
		for(var temp in self.rakMoney.currencyList){
			if(self.rakMoney.currencyList[temp]['currencyCode']==selectedPromoCodeTranCurrency){

				self.rakMoney.txnCurrencyArray.push(self.rakMoney.currencyList[temp]);
				break;
			}
		}
	},

	getRemCurrencyPrepopulate:function(){
		if (self.rakMoney.selectedToBenAccount != undefined && self.rakMoney.selectedToBenAccount!='') {

		self.rakMoney.promoCode=[];
		if(self.rakMoney.promoCodeForREM){
          var index=0;
		  for(var temp in self.rakMoney.promoCodeForREM)	{
			  if(self.RAKMONEYCRNCODE.INR==self.rakMoney.promoCodeForREM[temp]['remcrn'].toString() || self.rakMoney.promoCodeForREM[temp]['index']=='NA' ){
				  self.rakMoney.promoCode[index]=self.rakMoney.promoCodeForREM[temp];
				  index++;
			  }
		  }

		}
		var benfCountry=self.rakMoney.benAccounts[self.rakMoney.selectedToBenAccount]['beneficiaryCountry'].toString();
		self.rakMoney.beneficiaryAccountNum=rootScope.appLiterals.APP.RAKSEND_MONEY.RAKTRANSFERS_AUTHPAGE.BENEFICIARYACCOUNT+self.rakMoney.benAccounts[self.rakMoney.selectedToBenAccount]['beneficiaryAccountNumber'];
		var benType = self.rakMoney.benAccounts[self.rakMoney.selectedToBenAccount]['beneficiaryType'].toString();
		var flag=false;
		for(var temp in self.rakMoney.remitCrnFilter){
			if(benfCountry==self.rakMoney.remitCrnFilter[temp]['filterCode']){
				flag=true;
				self.rakMoney.selectedRCurr=self.rakMoney.remitCrnFilter[temp]['filterDesc'];
				self.rakMoney.creditCrn=self.rakMoney.selectedRCurr;
				//HD 1743660 START
				self.rakMoney.selectedCurrency=self.rakMoney.selectedRCurr;
				//HD 1743660 END
				break;
			}
		}
		if(!flag)
		{
			self.rakMoney.selectedRCurr="";
		}

		}

	},

	updateBenfIndex : function() {
		if (self.rakMoney.selectedToBenAccount != "") {

			self.rakMoney.benfUpdatedIndex = Number(self.rakMoney.selectedToBenAccount)+1;


		}
	},

	promoCodeSelected:function(){

		if(self.rakMoney.selectedpromoCode){
			// to check if Select Promo code is selected. This will reset all the fields preselected.
			if(self.rakMoney.selectedpromoCode=='0'){
				self.rakMoney.isPromoSelected=false;
				self.rakMoney.amount='';
				self.rakMoney.filterCurrencyArray();
				self.rakMoney.getDefaultTransCurr();
				self.rakMoney.getRemCurrencyPrepopulate();
				self.rakMoney.exchangeRate='';
				self.rakMoney.dummyTxntype=self.rakMoney.dummyTxntype.indexOf("|") ? self.rakMoney.dummyTxntype.split("|")[0] : self.rakMoney.dummyTxntype;
				self.rakMoney.selectedpromoCodeForServer="";
				return;
			}
			self.rakMoney.dummyTxntype="PMT_TRANSFER";
			var selectedPromoCode=Number(self.rakMoney.selectedpromoCode);
			self.rakMoney.isPromoSelected=true;
			self.rakMoney.selectedRCurr=self.rakMoney.promoCode[selectedPromoCode]['remcrn'].toString();
			self.rakMoney.selectedCurrency=self.rakMoney.promoCode[selectedPromoCode]['txncrn'].toString();
			self.rakMoney.amount=Number(self.rakMoney.promoCode[selectedPromoCode]['dealamount'].toString());
			self.rakMoney.populateTransactionCurrencyForPromoCode(self.rakMoney.selectedCurrency);
			self.rakMoney.dummyTxntype=self.rakMoney.dummyTxntype+"|"+self.rakMoney.promoCode[selectedPromoCode]['dealnumber'].toString();
			self.rakMoney.selectedpromoCodeForServer=self.rakMoney.promoCode[selectedPromoCode]['dealnumber'].toString();
			self.rakMoney.getKeyUp();
		}

		},

	searchIFSCLoad :function(bankDetails){
		self.rakMoney.bankDetails=[];
		self.rakMoney.bankDetails = bankDetails[0].bankDetails;
		self.rakMoney.totalDisplayValue=20;
	},

	loadMore :function(bankDetails){

		self.rakMoney.totalDisplayValue= self.rakMoney.totalDisplayValue + 20;
	},


	getKeyUp : function() {
	self.common.fromAuthPage=false;
		WL.Logger.info("Exchange Rate call credit curr"+self.rakMoney.creditCrn + " Debit curr "+self.rakMoney.debitCrn);
			self.rakMoney.creditCrn=self.rakMoney.selectedRCurr;
		self.rakMoney.benfUpdatedIndex = Number(self.rakMoney.selectedToBenAccount)+1;
		if(self.rakMoney.creditCrn!=undefined && self.rakMoney.debitCrn!=undefined){


		if (self.rakMoney.creditCrn!=self.rakMoney.debitCrn) {
			self.rakMoney.txnType="RMT";


				scope.setEvent('exchangeRateClick');
				// Added for RAK Dual hit call handling
				rootScope.callInProgress=true;
				self.rakMoney.isBenfSelected = false;

		}
		}


	},
	getEventForTransfer : function() {
		self.utils.populateCurrentDateDetails();
		var eventSel = '';

		WL.Logger.info('Send Money Event selection criteria: '
				+ self.rakMoney.selectedBenType + ""
				+ self.rakMoney.selectedFrequency + ""
				+ self.rakMoney.selectedCharges);
		if (self.rakMoney.selectedBenType != "undefined"
				&& self.rakMoney.selectedFrequency != "undefined") {
			var frequencyType = '';
			eventSel = self.rakMoney.selectedFrequency == 'O' ? "onSingleMoneyTransfersClick"
					: "onRecMoneyTransfersClick";



			WL.Logger.info('Send money event selected' + eventSel);
		}

		return eventSel.toString();
	},

	getConfirmEventForTransfer : function() {
		self.utils.populateCurrentDateDetails();
		var eventSel = '';

		WL.Logger.info('Send Money Event selection criteria: '
				+ self.rakMoney.selectedBenType + ""
				+ self.rakMoney.selectedFrequency + ""
				+ self.rakMoney.selectedCharges);
		if (self.rakMoney.selectedFrequency != "undefined") {
			var frequencyType = '';
			eventSel = self.rakMoney.selectedFrequency == 'O' ? "onSingleMoneyTransfersClick"
					: "onSingleMoneyTransfersClick";



			WL.Logger.info('Send money event selected' + eventSel);
		}

		return eventSel.toString();
	},

	initPayNowPage : function(responseList) {

		self.sendMoney.bankTransferTab = false;
		self.sendMoney.rakMoneyTab = true;
		self.sendMoney.mobileCashTab = false;

		if (responseList == null) {
			return;
		}

		if (!responseList[0].hasOwnProperty('errorMessage') && !self.common.fromAuthPage) {

        if (responseList[0].hasOwnProperty('accountLedgerBalance')) {
			self.rakMoney.availBal = responseList[0].accountLedgerBalance;
		}

        else  if (responseList[0].hasOwnProperty('exchangeRate')) {
			self.rakMoney.exchangeRate = responseList[0].exchangeRate;

			self.common.exchangeAmt=responseList[0].convertedAmt;
		}

        else if (responseList[0].hasOwnProperty('purposeListUpdated')) {
			self.rakMoney.purposeListUpdated = responseList[0].purposeListUpdated;
		}

        else  {
				// getting the TO list for fisrt Loading of Page
        	if(responseList[0].hasOwnProperty('RESPONSEPAGE') && responseList[0].RESPONSEPAGE=='RAKMONEY'){
				self.utils.populateCurrentDateDetails();

				self.rakMoney.benAccounts = responseList[0].beneficiaryList;
				self.rakMoney.ownAccounts = responseList[0].fromAccountsList;
				self.rakMoney.fromAccounts = responseList[0].fromAccountsList;
				self.rakMoney.currencyList = responseList[0].currencyList;
				self.rakMoney.frequencyType = responseList[0].frequencyType;
				self.rakMoney.promoCode = responseList[0].promoList;
				self.rakMoney.charges = responseList[0].chargeList;
				self.rakMoney.purpose = responseList[0].purposeList;
				self.rakMoney.RemcurrencyList = responseList[0].remCurrencyList;
				self.rakMoney.remitCurrency = responseList[0].remitCurrency;
				self.rakMoney.remitCrnFilter=responseList[0].remCrnFilter;
				self.rakMoney.reasonList=responseList[0].reasonList;


				self.rakMoney.subAccountTypeDesc = responseList[0].fromAccountsList[0].subAccountTypeDesc;
				self.rakMoney.promoCodeForFT= responseList[0].promoCodeForFT;
				self.rakMoney.promoCodeForREM= responseList[0].promoCodeForREM;
				self.rakMoney.selectedFrequency="O";

				self.rakMoney.displayTxnDate=responseList[0].TXN_DATE_DISP;


				// This below code is applicable only for Payee to rak money transition
				if(self.rakMoney.isFromPayeeFlow){
					self.rakMoney.clearFields();
					self.rakMoney.selectedToBenAccount=responseList[0].selectedBenf;
					//self.rakMoney.getEventForBenf();
					/*self.sendMoney.getPurposeList();*/
					self.rakMoney.getRemCurrencyPrepopulate();
					self.rakMoney.filterCurrencyArray();
					self.rakMoney.isFromPayeeFlow=false;
				}
				// This below code is applicable only for Payee to rak money transition

				//self.alterTxnCurrenyArrayForRakMoney();

			}
        }

        self.rakMoney.selectedFrequencyDisp='Once';
		}

	},

	// RAk Added for confirmation page init

	initAuthPage : function(responseList) {

		if (!responseList[0].hasOwnProperty('errorMessage') && rootScope.rakCorpInit.corpModel.backFlag !='Y') {
			self.common.transactionDate = self.common.displayDate
					.toLocaleDateString();// responseList[0].txnDate;

			self.common.fromDisplayString = responseList[0].fromAccountId;
			self.common.toDisplayString = responseList[0].toAccountId;
			self.common.amount = responseList[0].entryAMT;
			self.common.currency = responseList[0].txnCurrency;
			self.common.transactionDate = responseList[0].txnDate;
			self.common.reason = responseList[0].remarks;
			self.common.txnType = responseList[0].txnType;
			self.common.noOfTransfer = responseList[0].recNoInstall;
			self.common.charges = responseList[0].CHARGES;
			self.common.purpose = responseList[0].PURPOSE;
			self.common.remtCurr = responseList[0].REMTCURR;
			self.common.frequencyType = responseList[0].recFreq;
			self.common.beneficaryNickName = responseList[0].beneficaryNickName;
			self.common.balCheck = responseList[0].balCheck;
			self.common.creditAmt = responseList[0].CREDIT_AMOUNT;
			self.common.chargeAmt = responseList[0].CHARGE_AMOUNT;
			self.common.reason1 = responseList[0].REASON1;
			self.common.reason2 = responseList[0].REASON2;
			self.common.reason3 = responseList[0].REASON3;
			self.common.message=responseList[0].MESSAGE;
			self.common.beneficiaryAccountNumber=responseList[0].beneficiaryAccountNumber;
			self.common.exchangeRate= responseList[0].EFFECTIVERATE;
			self.common.convertedAmt=responseList[0].CONVERTEDAMT;
			self.common.promocode=responseList[0].PROMOCODESEL;
		}

		if (responseList[0].hasOwnProperty("auth")) {
			authResponse = responseList[0].auth;
			WL.Logger.info('Auth value' + authResponse);
		} else if (responseList[0].hasOwnProperty('authentication'))
			authResponse = responseList[0].auth;
		else {

			authResponse = "";
		}

		if (!responseList[0].hasOwnProperty('errorMessage')) {
			if (authResponse == "SMS OTP") {
				self.common.authType = self.authMode.OTP;
				self.common.isAuthSet = true;
			} else if (authResponse == "Transaction Password") {

				self.common.authType = self.authMode.TransactionPassword;
				WL.Logger.info('value for transaction Password'
						+ self.common.authType)
				self.common.isAuthSet = true;
			} else {
				self.common.authType = self.authMode.None;
				self.common.isAuthSet = false;
			}
		}

	},


	getAuthConfirmationEvent : function() {
		var eventSel = '';

		if (self.rakMoney.selectedFrequency != "undefined") {
			if(self.schedule.schTxnListSubmitBtn=='MODIFY'){
				eventSel = 'onConfirmModifyTransferClick';
			}
			else{
				var frequencyType = '';
				frequencyType = self.rakMoney.selectedFrequency == 'O' ? "O"
						: "REC";

				switch (frequencyType) {
				case "O":
					eventSel = 'onRakMoneySingleTransfersConfirm';
					break;

				case "REC":
					eventSel = 'onRakMoneyRecTransfersConfirm';
					break;

				default:
					break;
				}
			}

			WL.Logger.info('Send money auth Confirm submit' + eventSel);
		}

		return eventSel.toString();
	},
	// RAK added for Success page init Method

	initSuccessPage : function(responseList) {
		self.common.successMessage = responseList[0].transferStatusMessage;
		self.common.refId=responseList[0].REQUESTID;
		if (responseList[0].hasOwnProperty('transferBeneficiaryResponse')) {
			self.common.successMessage = responseList[0].transferBeneficiaryResponse;
			self.common.refId=responseList[0].REQUESTID;

		}
		if (responseList[0].hasOwnProperty('messagedescription')) {
			self.common.successMessage = responseList[0].messagedescription;
			self.common.refId=responseList[0].REQUESTID;
		}

	},
	getSelectedCurrencyFilter : function() {
		if (!self.rakMoney.selectedToBenAccount == '') {
			self.rakMoney.selectedRCurr = self.rakMoney.benAccounts[self.rakMoney.selectedToBenAccount]['beneficiaryAccountCurrency']
					.toString();

		}
	},

	initPayAgainPage : function(responseList) {

		self.sendMoney.bankTransferTab = false;
		self.sendMoney.rakMoneyTab = true;
		self.sendMoney.mobileCashTab = false;

		if (responseList == null) {
			return;
		}

	if (!responseList[0].hasOwnProperty('errorMessage') && !self.common.fromAuthPage) {

		if (self.schedule.selectedTxn.txnType=='RMT' && responseList[0].hasOwnProperty('rakMoneyPurposeList')) {
			self.rakMoney.purpose = responseList[0].rakMoneyPurposeList;
		}




        if (responseList[0].hasOwnProperty('accountLedgerBalance')) {
			self.rakMoney.availBal = responseList[0].accountLedgerBalance;
		}

        else  if (responseList[0].hasOwnProperty('exchangeRate')) {
			self.rakMoney.exchangeRate = responseList[0].exchangeRate;

			self.common.exchangeAmt=responseList[0].convertedAmt;
		}

        else if (responseList[0].hasOwnProperty('purposeListUpdated')) {
			self.rakMoney.purposeListUpdated = responseList[0].purposeListUpdated;
		}

        else  {
				// getting the TO list for fisrt Loading of Page
        	if(responseList[0].hasOwnProperty('RESPONSEPAGE') && responseList[0].RESPONSEPAGE=='RAKMONEY'){
				self.utils.populateCurrentDateDetails();

				self.rakMoney.benAccounts = responseList[0].beneficiaryList;
				self.rakMoney.ownAccounts = responseList[0].fromAccountsList;
				self.rakMoney.fromAccounts = responseList[0].fromAccountsList;
				self.rakMoney.currencyList = responseList[0].currencyList;
				self.rakMoney.frequencyType = responseList[0].frequencyType;
				self.rakMoney.promoCode = responseList[0].promoList;
				self.rakMoney.charges = responseList[0].chargeList;
				self.rakMoney.purpose = responseList[0].purposeList;
				self.rakMoney.RemcurrencyList = responseList[0].remCurrencyList;
				self.rakMoney.remitCurrency = responseList[0].remitCurrency;
				self.rakMoney.remitCrnFilter=responseList[0].remCrnFilter;
				self.rakMoney.reasonList=responseList[0].reasonList;

				self.rakMoney.reasonListForTxrn=responseList[0].reasonListForTxrn;

				self.rakMoney.subAccountTypeDesc = responseList[0].fromAccountsList[0].subAccountTypeDesc;
				self.rakMoney.promoCodeForFT= responseList[0].promoCodeForFT;
				self.rakMoney.promoCodeForREM= responseList[0].promoCodeForREM;
				self.rakMoney.selectedFrequency="O";
				self.sendMoney.selectedFrequencyDisp='Once';

				self.rakMoney.displayTxnDate=responseList[0].TXN_DATE_DISP;
				//self.alterTxnCurrenyArrayForRakMoney();

			}
        }


       if(self.schedule.schTxnListSubmitBtn=='MODIFY' || self.schedule.schTxnListSubmitBtn=='AGAIN'){


    	   self.sendMoney.initorType = responseList[0].initorType;
    	   if (responseList[0].hasOwnProperty('initorId')) {
				self.schedule.initAcc = Number(responseList[0].initorId);
			}

			if(self.rakMoney.fromAccounts){
		          for(var temp in self.rakMoney.fromAccounts){
	  					if(self.rakMoney.fromAccounts[temp].accountNumber==self.schedule.initAcc){
	  						self.rakMoney.selectedFromAccount=self.rakMoney.fromAccounts[temp].accountIndex;
	  						break;
	  					}
	  				}
			}

			if (self.rakMoney.selectedFromAccount != undefined && self.rakMoney.selectedFromAccount!='') {
				if (self.rakMoney.selectedFromAccount != undefined) {
					self.rakMoney.selectedCurrency = self.rakMoney.fromAccounts[self.rakMoney.selectedFromAccount]['currencyCode']
							.toString();
					self.rakMoney.debitCrn=self.rakMoney.selectedCurrency;

				}
				}

			if (responseList[0].hasOwnProperty('destId')) {
				self.schedule.destAcc =responseList[0].destId;
			}


			self.rakMoney.selectedCurrency = self.schedule.selectedTxn.txnCurrency;
			self.rakMoney.amount = Number(self.schedule.selectedTxn.txnAmountDisp);
			if(self.schedule.schTxnListSubmitBtn=='MODIFY'){
				//self.common.displayDate = new Date(self.schedule.selectedTxn.txnDate);

				self.common.dd = new Date(self.schedule.selectedTxn.txnDate,'DD-MM-YY');

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
			}

			else if(self.schedule.schTxnListSubmitBtn=='AGAIN'){
				self.common.displayDate = new Date();
			}



			if(self.rakMoney.purpose){
		          for(var temp in self.rakMoney.purpose){
	  					if(self.rakMoney.purpose[temp].purposeCode==responseList[0].selPurpose){
	  						self.rakMoney.selectedPurpose=self.rakMoney.purpose[temp].purposeCode;
	  						break;
	  					}
	  				}
			}

		/*	if(self.rakMoney.frequencyType){
		          for(var temp in self.rakMoney.frequencyType){
	  					if(self.rakMoney.frequencyType[temp].frequencyTypeCode==self.sendMoney.payAgainRecFreq){
	  						self.rakMoney.selectedFrequency=self.rakMoney.frequencyType[temp].frequencyTypeCode;
	  						self.rakMoney.selectedFrequencyDisp=self.rakMoney.frequencyType[temp].frequencyTypeDesc;
	  						break;
	  					}
	  				}
			}*/

			//self.sendMoney.selectedFrequencyDisp=self.schedule.selectedTxn.txnFrequency;
			self.schedule.toAccountDisp = rootScope.appLiterals.APP.RAKSEND_MONEY.RAKTRANSFERS_PAYNOW_PAGE.PLCHOLDER_TO +" : "+self.schedule.selectedTxn.toAccount;
			//self.sendMoney.selectedToAccount = self.schedule.selectedTxn.toAccount;


			if(self.rakMoney.benAccounts){

		          for(var temp in self.rakMoney.benAccounts){
	  					if(self.rakMoney.benAccounts[temp].beneficiaryNickName==self.schedule.selectedTxn.toAccount){
	  						self.rakMoney.selectedBenType=self.rakMoney.benAccounts[temp].beneficiaryType;
	  						self.rakMoney.selectedToBenAccount = self.rakMoney.benAccounts[temp].beneficiaryIndex;
	  						break;
	  					}
	  				}
			}

			if(self.rakMoney.charges){
				/*if(self.cebCountry==self.rakMoney.benAccounts[self.rakMoney.selectedToBenAccount]['beneficiaryCountry'].toString()){
					self.rakMoney.selectedCharges = 'O';
					self.rakMoney.selectedChargesDisplay = 'All Charges to my Account';
				}
				else{
		          for(var temp in self.rakMoney.charges){
	  					if(self.rakMoney.charges[temp].chargeCode==responseList[0].chargeInd){
	  						self.rakMoney.selectedCharges=self.rakMoney.charges[temp].chargeCode;
	  						break;
	  					}
	  				}
				}*/

				self.rakMoney.selectedCharges = 'O';
				self.rakMoney.selectedChargesDisplay = 'All Charges to my Account';
			}


			if (self.rakMoney.selectedToBenAccount != undefined && self.rakMoney.selectedToBenAccount!='') {

			self.rakMoney.promoCode=[];
			if(self.rakMoney.promoCodeForREM){

			  for(var temp in self.rakMoney.promoCodeForREM)	{
				  if(self.RAKMONEYCRNCODE.INR==self.rakMoney.promoCodeForREM[temp]['remcrn'].toString()){
					  self.rakMoney.promoCode.push(self.rakMoney.promoCodeForREM[temp]);
				  }
			  }

			}
			var benfCountry=self.rakMoney.benAccounts[self.rakMoney.selectedToBenAccount]['beneficiaryCountry'].toString();
			self.rakMoney.beneficiaryAccountNum=rootScope.appLiterals.APP.RAKSEND_MONEY.RAKTRANSFERS_AUTHPAGE.BENEFICIARYACCOUNT+self.rakMoney.benAccounts[self.rakMoney.selectedToBenAccount]['beneficiaryAccountNumber'];
			var benType = self.rakMoney.benAccounts[self.rakMoney.selectedToBenAccount]['beneficiaryType'].toString();
			var flag=false;
			for(var temp in self.rakMoney.remitCrnFilter){
				if(benfCountry==self.rakMoney.remitCrnFilter[temp]['filterCode']){
					flag=true;
					self.rakMoney.selectedRCurr=self.rakMoney.remitCrnFilter[temp]['filterDesc'];
					self.rakMoney.creditCrn=self.rakMoney.selectedRCurr;
					break;
				}
			}
				if(!flag)
					{
						self.rakMoney.selectedRCurr="";
					}

			}


			self.rakMoney.txnCurrencyArray=[];
			self.rakMoney.dummyTxntype="PMT_TRANSFER";
			if (self.rakMoney.selectedToBenAccount) {
				var benfCountry=self.rakMoney.benAccounts[self.rakMoney.selectedToBenAccount]['beneficiaryCountry'].toString();

				var paymentDetails=self.rakMoney.benAccounts[self.rakMoney.selectedToBenAccount]['paymentDetails'].toString();

				var checkPaymentDetail=paymentDetails.substring(0,paymentDetails.indexOf('|'));
				if(!checkPaymentDetail && benfCountry != self.cebCountry){
					self.common.isIFSC=true;
				}

				for(var temp in self.rakMoney.remitCrnFilter){
					if(benfCountry==self.rakMoney.remitCrnFilter[temp]['filterCode']){
						self.rakMoney.creditCrn=self.rakMoney.remitCrnFilter[temp]['filterDesc'];
						//self.rakMoney.creditCrn=self.rakMoney.selectedRCurr;
						break;
					}

			}
				}

			var benType = self.rakMoney.benAccounts[self.rakMoney.selectedToBenAccount]['beneficiaryType'].toString();
			self.rakMoney.selectedBenType = benType;

			if (self.rakMoney.selectedFromAccount != undefined && self.rakMoney.selectedFromAccount !="") {
				self.rakMoney.debitCrn = self.rakMoney.fromAccounts[self.rakMoney.selectedFromAccount]['currencyCode']
						.toString();
				//self.rakMoney.debitCrn=self.rakMoney.selectedCurrency;

			}

			for(var temp in self.rakMoney.currencyList){
				if(self.rakMoney.currencyList[temp]['currencyCode']==self.rakMoney.debitCrn){
					//self.rakMoney.currencyList[temp]['currencyDesc']=self.rakMoney.currencyList[temp]['currencyDesc']+" "+rootScope.appLiterals.APP.RAKSEND_MONEY.RAKTRANSFERS_PAYNOW_PAGE.TRANSFERCURR;
					self.rakMoney.txnCurrencyArray.push(self.rakMoney.currencyList[temp]);
				}
				else if(self.rakMoney.selectedRCurr!=null && self.rakMoney.selectedRCurr!='' && !self.rakMoney.txnCurrencyArray.hasOwnProperty[self.rakMoney.selectedRCurr] && self.rakMoney.currencyList[temp]['currencyCode']==self.rakMoney.selectedRCurr){
					//self.rakMoney.currencyList[temp]['currencyDesc']=self.rakMoney.currencyList[temp]['currencyDesc']+" "+rootScope.appLiterals.APP.RAKSEND_MONEY.RAKTRANSFERS_PAYNOW_PAGE.TRANSFERCURR;
					self.rakMoney.txnCurrencyArray.push(self.rakMoney.currencyList[temp]);
				}

			}



			if(self.schedule.selectedTxn.txnType==self.RAKSENDMONEYTXNTYPE.RAKMONEY){
				//self.sendMoney.benfUpdatedIndex = Number(self.sendMoney.selectedToBenAccount)+1;
				self.sendMoney.benfUpdatedIndex = Number(self.sendMoney.selectedToBenAccount);
			}



			if(self.sendMoney.selectedBenType==self.RAKSENDMONEYBENFTYPE.OUTUAE){
				self.sendMoney.cpType='O';
				self.sendMoney.creditAccount=(Number(self.sendMoney.selectedToAccount)+1).toString();
			}
			else{
				self.sendMoney.cpType='P';
				self.sendMoney.creditAccount=self.sendMoney.selectedToBenAccount.toString();
			}

			if (self.sendMoney.selectedToBenAccount != undefined && self.sendMoney.selectedToBenAccount!=0) {
				var benfCountry=self.sendMoney.benAccounts[self.sendMoney.selectedToBenAccount]['beneficiaryCountry'].toString();
				var benType = self.sendMoney.benAccounts[self.sendMoney.selectedToBenAccount]['beneficiaryType'].toString();
				if(benType!=self.RAKSENDMONEYBENFTYPE.RAKBANK){
					for(var temp in self.sendMoney.remitCrnFilter){
						if(benfCountry==self.sendMoney.remitCrnFilter[temp]['filterCode']){

							self.sendMoney.selectedRCurr=self.sendMoney.remitCrnFilter[temp]['filterDesc'];
							self.sendMoney.creditCrn=self.sendMoney.selectedRCurr;
							break;
						}
					}
				}
			}



			self.sendMoney.txnCurrencyArray=[];
			if (self.sendMoney.selectedToBenAccount != undefined && self.sendMoney.selectedToBenAccount!=0) {
				var benfCountry=self.sendMoney.benAccounts[self.sendMoney.selectedToBenAccount]['beneficiaryCountry'].toString();
				var benType = self.sendMoney.benAccounts[self.sendMoney.selectedToBenAccount]['beneficiaryType'].toString();

				if(benType==self.RAKSENDMONEYBENFTYPE.OWN && self.sendMoney.selectedToAccount!=undefined){
					self.sendMoney.creditCrn=self.sendMoney.ownAccounts[self.sendMoney.selectedToAccount]['currencyCode'];
				}
				else{
						for(var temp in self.sendMoney.remitCrnFilter){
								if(benfCountry==self.sendMoney.remitCrnFilter[temp]['filterCode']){
									self.sendMoney.creditCrn=self.sendMoney.selectedRCurr;
									break;
								}

						}
					}
				}


			if (self.sendMoney.selectedFromAccount != undefined && self.sendMoney.selectedFromAccount !="") {
				self.sendMoney.selectedCurrency = self.sendMoney.fromAccounts[self.sendMoney.selectedFromAccount]['currencyCode']
						.toString();
				self.sendMoney.debitCrn=self.sendMoney.selectedCurrency;

			}

			for(var temp in self.sendMoney.currencyList){
				if(self.sendMoney.currencyList[temp]['currencyCode']==self.sendMoney.debitCrn || self.sendMoney.currencyList[temp]['currencyCode']==self.sendMoney.creditCrn){
					self.sendMoney.txnCurrencyArray.push(self.sendMoney.currencyList[temp]);
				}
				else if(self.sendMoney.selectedRCurr!=null && self.sendMoney.selectedRCurr!='' && !self.sendMoney.txnCurrencyArray.hasOwnProperty[self.sendMoney.selectedRCurr] && self.sendMoney.currencyList[temp]['currencyCode']==self.sendMoney.selectedRCurr){
					self.sendMoney.txnCurrencyArray.push(self.sendMoney.currencyList[temp]);
				}
			}

			if (responseList[0].hasOwnProperty('installments') && responseList[0].installments != 1) {
				self.rakMoney.noOfTransfer = Number(responseList[0].installments);
			}


				var reasonArray = responseList[0].entRemarks.split('~');
				if(self.rakMoney.reasonList){
			          for(var temp in self.rakMoney.reasonList){
		  					if(self.rakMoney.reasonList[temp].reasonCode==reasonArray[0]){
		  						self.rakMoney.selectedReason=self.rakMoney.reasonList[temp].reasonCode;
		  						break;
		  					}
		  				}

				}

				self.rakMoney.selectedRCurr=responseList[0].REMITTANCE_CRNCY ? responseList[0].REMITTANCE_CRNCY :self.rakMoney.selectedRCurr;
				self.rakMoney.selectedCurrency=responseList[0].TXN_CRN ? responseList[0].TXN_CRN :self.rakMoney.selectedCurrency;

				self.rakMoney.selectedReason1 = reasonArray[1];
				self.rakMoney.selectedReason2 = reasonArray[2];
				self.rakMoney.selectedReason3 = reasonArray[3];


				self.rakMoney.getBalanceEvent();
			//self.common.updateBal('onAccountSelectionBalCall');

			self.schedule.schTxnListSubmitBtn="";

       }


	}

}

	};



	// //////////////////////////////////////////SCHDULE////////////////////////
	self.schedule = {
		scheduleList : [],
		selectedScheduleItem : null,
		scheduleNickName : null,
		scheduleName : null,
		isStopImmediate : false,
		confirmationText : null,
		isScheduleStopped : false,
		isAuthSent : false,
		editSchedule : false,

		// RAK added for Schedule Transfer
		toAccount : null,
		fromAccount : '',
		txnReferenceId : null,
		txnAmount : null,
		txnDate : null,
		txnTypeList:[],
		searchFromList:[],
		selectedTxnType:'',
		txnTypeSelected:false,
		schTxnListPageRadioSelected:false,
		schTxnListPageRadioIndex:"",
		schTxnListSubmitBtn:"",
		selectedSchTxnIndex:"",

		selectedTransRefId:"",
		selectedTransType:"",
		selectedTransDate:"",
		selectedTransFromAcctNo:"",
		selectedTransBenfName:"",
		selectedTransTxnCurrency:"",
		selectedTransTxnAmt:"",
		selectedTransReqBy:"",
		selectedTransFreq:"",
		selectedTransType:"",
		txnPwd:"",
		toAccountDisp:"",
		immediatePaymentDueOn:"",
		dueDate:"N",
		instanceArray: "",
		selectAll:false,
		instanceListJson:[],
		instanceResultList:[],
		isBackclicked:false,
		isCheckBoxSelected:false,
		authStatus:false,
		authFlag:'',
		remarks:'',

		destDetails:'',
		toAccountDetails:'',

		/// added for transaction history
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
		selectedCharges:'',
		stopBtnClicked:false,
		debitAmount:'',
		chargeAmount:'',
		chargeAmount:'',
		purposeDesc:'',
		chargeDesc:'',
		reasonDesc:'',
		displayAccount:'',
		channelId:'',
		failReason:'',
		stoppedTxnList:[],
		noOfInstanceLeft:'',
		beneficiaryName:'',
		fileSequenceNumber:'',//File Upload CR changes
		txnType:'',//File Upload CR changes


		clearScheduleTransferData : function() {
			self.schedule.scheduleList = [];
			self.schedule.selectedScheduleItem = null;
			self.schedule.scheduleNickName = null;
			self.schedule.scheduleName = null;
			self.schedule.isStopImmediate = false;
			self.schedule.confirmationText = null,
			self.schedule.isScheduleStopped = false;
			self.schedule.isAuthSent = false;
            self.schedule.txnTypeList=[];
			// Rak added for Schedule Transfer
			self.schedule.toAccount = null;
			self.schedule.fromAccount = '';
			self.schedule.txnDate = null;
			self.schedule.txnReferenceId = null;
			self.schedule.selectedTxnType='';
			self.schedule.searchFromList=[];
			self.schedule.txnTypeSelected=false;
			self.schedule.schTxnListPageRadioSelected=false;
			self.schedule.selectedSchTxnIndex="";
			self.schedule.schTxnListPageRadioIndex="";
			self.schedule.schTxnListSubmitBtn="";

			self.schedule.selectedTransRefId="";
			self.schedule.selectedTransType="";
			self.schedule.selectedTransDate="";
			self.schedule.selectedTransFromAcctNo="";
			self.schedule.selectedTransBenfName="";
			self.schedule.selectedTransTxnCurrency="";
			self.schedule.selectedTransTxnAmt="";
			self.schedule.selectedTransReqBy="";
			self.schedule.selectedTransFreq="";
			self.schedule.selectedTransTypeDesc="";
			self.schedule.toAccountDisp="";
			self.schedule.immediatePaymentDueOn="";
			self.schedule.dueDate="N";
			self.schedule.instanceArray="";
			self.schedule.selectAll=false;
			self.schedule.instanceListJson=[];
			self.schedule.instanceResultList=[];
			self.schedule.isBackclicked=false;
			self.schedule.isCheckBoxSelected=false;
			self.schedule.authStatus=false;
			self.schedule.authFlag='';
			self.schedule.remarks='';
			self.schedule.toAccountDetails='';
			self.schedule.destDetails='';
			//added for transaction details mofificatio
			//added for txn details ticket  fix
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
			self.schedule.selectedCharges='';
			self.schedule.stopBtnClicked=false;
			self.schedule.displayAccount='';
			self.schedule.channelId='';
			self.schedule.failReason='';
			self.schedule.stoppedTxnList=[];
			self.schedule.noOfInstanceLeft='';
			self.schedule.requestedBy='';
			self.schedule.approvedBy='';
			self.schedule.userRemarks='';
			self.schedule.requestedBy='';
			self.schedule.txnStatus='';
			self.schedule.beneficiaryName='';
			
			//File Upload CR changes start
			self.schedule.fileSequenceNumber='';
			self.schedule.txnType='';
			//File Upload CR changes end

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
		onTxnTypeSelected:function(){
			self.schedule.txnTypeSelected=true;
		},
		initScheduleTransferListPage : function(responseList) {
			if (!responseList[0].hasOwnProperty('errorMessage')) {
				if(responseList[0].hasOwnProperty('message')){
				    self.common.successMessage=responseList[0].message;
				}

				if(responseList[0].hasOwnProperty('txnTypeList')){
				    self.schedule.txnTypeList=responseList[0].txnTypeList;
				}
				if(responseList[0].hasOwnProperty('scheduleList')){
					self.schedule.scheduleList=responseList[0].scheduleList;
				}
				if(responseList[0].hasOwnProperty('fromAccount')){
					self.schedule.searchFromList=responseList[0].fromAccount;
				}
				if(responseList[0].hasOwnProperty('selectedTxnType')){
					self.schedule.selectedTxnType = responseList[0].selectedTxnType;
				}
			}
		},

		onSelectTxnFromList : function(){
			var index = self.schedule.selectedSchTxnIndex;
			for(var i = 0;i<self.schedule.scheduleList.length;i++ ){
				if (i==index){
					self.schedule.selectedTransRefId=self.schedule.scheduleList[i].txnReferenceId;
					self.schedule.selectedTransType=self.schedule.scheduleList[i].txnType;
					self.schedule.selectedTransDate=self.schedule.scheduleList[i].txnDate;
					self.schedule.selectedTransFromAcctNo=self.schedule.scheduleList[i].fromAccount;
					self.schedule.selectedTransBenfName=self.schedule.scheduleList[i].bnfName;
					self.schedule.selectedTransTxnAmt=self.schedule.scheduleList[i].txnCurrency + " " +self.schedule.scheduleList[i].txnAmount;
					self.schedule.selectedTransReqBy=self.schedule.scheduleList[i].requestedBy;
					self.schedule.selectedTransFreq = self.schedule.scheduleList[i].txnFrequency;
				}
			}
			for(var j = 0; j < self.schedule.txnTypeList.length; j++){
				if(self.schedule.txnTypeList[j].txnTypeCode==self.schedule.selectedTransType){
					self.schedule.selectedTransTypeDesc = self.schedule.txnTypeList[j].txnTypedesc;
				}

			}
		},


		//added for transaction details fetch
		initSchedulehistoryDetails:function(responsesList)
		{
			if(!responsesList[0].hasOwnProperty('errorMessage') && !self.common.fromAuthPage  && rootScope.rakCorpInit.corpModel.backFlag !='Y'){
				self.schedule.initorID=responsesList[0].initorID;
				self.schedule.installments=responsesList[0].installments;
				self.schedule.entRemarks=responsesList[0].entRemarks;
				self.schedule.chargeInd=responsesList[0].chargeInd;
				self.schedule.selPurpose=responsesList[0].selPurpose;
				self.schedule.initorType=responsesList[0].initorType;
				self.schedule.recFreq=responsesList[0].recFreq;
				self.schedule.selectedReason=responsesList[0].SELECTEDREASON;
			    self.schedule.selectedReason1=responsesList[0].ENTEREDREASON1;
			    self.schedule.selectedReason2=responsesList[0].ENTEREDREASON2;
			    self.schedule.selectedReason3=responsesList[0].ENTEREDREASON3;
			    self.schedule.displayAccount=responsesList[0].displayAccount;
			    self.schedule.channelId=responsesList[0].channelId;
			    self.schedule.noOfInstanceLeft=responsesList[0].noOfInstanceLeft;
			    self.schedule.beneficiaryName=responsesList[0].beneficiaryName;
			    self.schedule.isFileUploadTxn=responsesList[0].isFileUploadTxn;
                self.schedule.txnAmount=responsesList[0].totalAmount;
			    self.schedule.destId=responsesList[0].destId;
			    self.schedule.debitAmount=responsesList[0].debitAmt;
			    self.schedule.chargeAmount=responsesList[0].chargeAmt;
			    self.schedule.failReason=responsesList[0].failReason;
			    self.schedule.requestedBy=responsesList[0].requestedBy;
			    self.schedule.txnStatus=responsesList[0].txnStatus;
			    self.schedule.approvedBy=responsesList[0].approvedBy;
			    self.schedule.userRemarks=responsesList[0].userRemarks;
	                      if(responsesList[0].txnType && responsesList[0].txnType==self.RAKSENDMONEYTXNTYPE.OWN || responsesList[0].txnType==self.RAKSENDMONEYTXNTYPE.RAKBANK){
					self.schedule.selectedReason = responsesList[0].entRemarks;
				}
				if(self.schedule.selectedTxn.txnType==self.RAKSENDMONEYTXNTYPE.OWN || self.schedule.selectedTxn.txnType==self.RAKSENDMONEYTXNTYPE.RAKBANK){
					self.schedule.selectedReason = responsesList[0].entRemarks;
				}
				
				//Added for file upload UAT issues start
				self.schedule.fileSequenceNumber=responsesList[0].fileSequenceNumber;
				self.schedule.txnType=responsesList[0].txnType;
				//Added for file upload UAT issues end

			}
		},
		initStopTransferAuth : function(responsesList) {

			if(!responsesList[0].hasOwnProperty('errorMessage') && rootScope.rakCorpInit.corpModel.backFlag !='Y'){
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


		initImmediateStopTransfer : function(responsesList) {

			if(responsesList[0].hasOwnProperty('message')){
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
		initStopTransferAfterAuth : function(responseList) {
			if (responseList[0].hasOwnProperty('errorMessage')) {
				self.common.isStatusError = true;
				self.common.successMessage = responseList[0].errorMessage;
			} else
				self.common.successMessage = responseList[0].scheduleStopresponse;
			self.schedule.isScheduleStopped = true;
			self.schedule.isAuthSent = false;
		},
		setupUpdateTransfer : function() {
			self.schedule.editSchedule = true;
			if (self.schedule.selectedScheduleItem.type == 'BN') {
				self.transfers.selectedBeneficiary = self.transfers.selectedScheduleItem;
			}
			if (self.schedule.selectedScheduleItem.type == 'BL') {
				self.billPayment.selectedBiller = self.transfers.selectedScheduleItem;
			}
			if (self.schedule.selectedScheduleItem.type == 'SL') {
				self.transfers.selectedBeneficiary = self.transfers.selectedScheduleItem;
			}
		},
		getDetailsEvent : function() {
			if (self.schedule.selectedScheduleItem.flag == "R")
				return 'onScheduleRecurringSelectClick';
			else
				return 'onScheduleSingleSelectClick';
		},
		// getUpdateTransferEvent:function(){
		// if(self.schedule.selectedScheduleItem.type == 'BN' ||
		// self.schedule.selectedScheduleItem.type == 'SL'){
		// if(self.schedule.selectedScheduleItem.flag == "R")
		// return "onRecurringBeneficiaryEditClick";
		// else
		// return "onSingleBeneficiaryEditClick";
		// }
		// if(self.schedule.selectedScheduleItem.type == 'BL'){
		// if(self.schedule.selectedScheduleItem.flag == "R")
		// return "onRecurringBillEditClick";
		// else
		// return "onSingleBillEditClick";
		// }
		// // if(self.schedule.selectedScheduleItem.type == 'SL'){
		// // return "onUpdateTransferSelfClick";
		// // }
		// },
		getStopTransferYesEvent : function() {
			if (self.schedule.selectedScheduleItem.flag == "R") {
				if (self.schedule.isStopImmediate) {
					if (self.schedule.selectedScheduleItem.type == 'BN') {
						return 'onBeneficiaryImmediateStopClick';
					}
					if (self.schedule.selectedScheduleItem.type == 'BL') {
						return 'onBillImmediateStopClick';
					}
					if (self.schedule.selectedScheduleItem.type == 'CC') {
						return 'onCreditCardImmediateStopClick';
					}
					if (self.schedule.selectedScheduleItem.type == 'SL') {
						return 'onSelfImmediateStopClick';
					}
				} else {
					if (self.schedule.selectedScheduleItem.type == 'BN') {
						return 'onBeneficiaryCompleteStopClick';
					}
					if (self.schedule.selectedScheduleItem.type == 'BL') {
						return 'onBillCompleteStopClick';
					}
					if (self.schedule.selectedScheduleItem.type == 'CC') {
						return 'onCreditCardCompleteStopClick';
					}
					if (self.schedule.selectedScheduleItem.type == 'SL') {
						return 'onSelfCompleteStopClick';
					}
				}
			} else {
				if (self.schedule.selectedScheduleItem.type == 'BN') {
					return 'onSingleBeneficiaryStopClick';
				}
				if (self.schedule.selectedScheduleItem.type == 'BL') {
					return 'onSingleBillStopClick';
				}
				if (self.schedule.selectedScheduleItem.type == 'CC') {
					return 'onSingleCreditCardStopClick';
				}
				if (self.schedule.selectedScheduleItem.type == 'SL') {
					return 'onSingleSelfStopClick';
				}
			}
		},
		getStopTransferAuthEvent : function() {
			if (self.schedule.isStopImmediate) {
				if (self.schedule.selectedScheduleItem.type == 'BN') {
					return 'onBeneficiaryImmediateAuthClick';
				}
				if (self.schedule.selectedScheduleItem.type == 'BL') {
					return 'onBillImmediateAuthClick';
				}
				if (self.schedule.selectedScheduleItem.type == 'CC') {
					return 'onCreditCardImmediateAuthClick';
				}
				if (self.schedule.selectedScheduleItem.type == 'SL') {
					return 'onSelfImmediateAuthClick';
				}
			} else {
				if (self.schedule.selectedScheduleItem.type == 'BN') {
					return 'onBeneficiaryCompleteAuthClick';
				}
				if (self.schedule.selectedScheduleItem.type == 'BL') {
					return 'onBillCompleteAuthClick';
				}
				if (self.schedule.selectedScheduleItem.type == 'CC') {
					return 'onCreditCardCompleteAuthClick';
				}
				if (self.schedule.selectedScheduleItem.type == 'SL') {
					return 'onSelfCompleteAuthClick';
				}
			}
		},

		initSuccessPage : function(responseList) {
			self.common.successMessage = responseList[0].message;
		},

		setBenType : function() {
			if (self.schedule.selectedTxn.txnType == "OWN") {
				self.sendMoney.selectedBenType = "OWNACT";
			}
			else{
				self.sendMoney.dummyTxntype="PMT_TRANSFER";
				}

			self.sendMoney.isBenfSelected=true;
		},

		initDetails : function(responseList) {
			if (!responseList[0].hasOwnProperty('errorMessage')) {

					if(responseList[0].hasOwnProperty('installments')){
						self.schedule.noOfTransfers = responseList[0].installments;
					}
					if(responseList[0].hasOwnProperty('recFreq')){
						self.schedule.recFreq = responseList[0].recFreq;
					}

					if(responseList[0].hasOwnProperty('toAccountDetails')){
						self.schedule.toAccountDetails = responseList[0].toAccountDetails;
					}
					if(responseList[0].hasOwnProperty('destDetails')){
						self.schedule.destDetails = responseList[0].destDetails;
					}
					if (responseList[0].hasOwnProperty('stoppedTxns')){
    					self.schedule.stoppedTxnList = responseList[0].stoppedTxns;
    				}
				}
		},

		clearSearchData:function(){
			self.schedule.selectedTxnType ='';
			self.schedule.fromAccount='';
			self.common.searchFromDate = new Date();
			self.common.searchToDate = new Date();

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
		}

	};

	self.txnHistory={
   		 txnTypeList:[],
   		 searchFromDate : null,
   		 searchToDate : null,
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
		reason:'',
		directView:"",


		/// added for transaction history
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
		selectedCharges:'',
		tempTxnId:'',
		debitAmount:'',
		refDate:'',
		txnDate:'',
		bnfName:'',
		hostRefNo:'',

		channelId:'',
		failReason:'',
   		 initSearchPage : function(responseList) {
					//self.payCard.cardHistoryTab = true;
					//self.common.rakIncompleteTab = false;
					//self.common.viewHistoryTab = false;
   			if (!responseList[0].hasOwnProperty('errorMessage')&&  !self.common.fromAuthPage){
					if (responseList[0].hasOwnProperty("rakTxnTypeList")) {
						self.txnHistory.txnTypeList = responseList[0].rakTxnTypeList;

					}

					if (responseList[0].hasOwnProperty('scheduleList')) {
						self.txnHistory.scheduleList = responseList[0].scheduleList;
					}
				/*		self.txnHistory.searchFromDate = new Date(responseList[0].fromDate);
						self.txnHistory.searchToDate = new Date(responseList[0].toDate);*/
					   if(responseList[0].selectedTxnType=='')
						{
				    	self.txnHistory.selectedTxnType =responseList[0].rakTxnTypeList[0].txnTypeCode;
						}
					   else{
						self.txnHistory.selectedTxnType = responseList[0].selectedTxnType;
					   }
   			}
				},

				getLandingPageToDate : function(format) {
					var fromDate = new Date();
					return fromDate;
				},
				getLandingPageFromDate : function(format) {
					var toDate = new Date().addMonths(-1);
					return toDate;
				},


				setFutureDate : function(){
					self.common.searchFromDate = new Date();
					self.common.searchToDate = new Date().addMonths(1);

					self.common.displayDate = self.common.searchFromDate;
					self.utils.populateCurrentDateDetails();

					self.txnHistory.searchFromDate_day =self.common.date;
					self.txnHistory.searchFromDate_month=self.common.month;
					self.txnHistory.searchFromDate_year=self.common.year;

					self.common.displayDate = self.common.searchToDate;
					self.utils.populateCurrentDateDetails();

					self.txnHistory.searchToDate_day =self.common.date;
					self.txnHistory.searchToDate_month=self.common.month;
					self.txnHistory.searchToDate_year=self.common.year;

					self.txnHistory.searchFromDate=self.common.searchFromDate;
					self.txnHistory.searchToDate=self.common.searchToDate;
				},

				setInitialDate : function(){
					self.common.searchToDate = new Date().addMonths(1);
					self.common.searchFromDate = new Date().addMonths(-1);

					self.common.displayDate = self.common.searchFromDate;
					self.utils.populateCurrentDateDetails();

					self.txnHistory.searchFromDate_day =self.common.date;
					self.txnHistory.searchFromDate_month=self.common.month;
					self.txnHistory.searchFromDate_year=self.common.year;

					self.common.displayDate = self.common.searchToDate;
					self.utils.populateCurrentDateDetails();

					self.txnHistory.searchToDate_day =self.common.date;
					self.txnHistory.searchToDate_month=self.common.month;
					self.txnHistory.searchToDate_year=self.common.year;

					self.txnHistory.searchFromDate=self.common.searchFromDate;
					self.txnHistory.searchToDate=self.common.searchToDate;
				},

				setFromToDate : function() {
					self.common.displayDate = self.txnHistory.searchFromDate;
					self.utils.populateCurrentDateDetails();

					self.txnHistory.searchFromDate_day =self.common.date;
					self.txnHistory.searchFromDate_month=self.common.month;
					self.txnHistory.searchFromDate_year=self.common.year;

					self.common.displayDate = self.txnHistory.searchToDate;
					self.utils.populateCurrentDateDetails();

					self.txnHistory.searchToDate_day =self.common.date;
					self.txnHistory.searchToDate_month=self.common.month;
					self.txnHistory.searchToDate_year=self.common.year;
				 },

				 initCompltTransferListPage : function(responseList) {
					 if (!responseList[0].hasOwnProperty('errorMessage')){
						if (responseList[0].hasOwnProperty('scheduleList')) {
							self.txnHistory.scheduleList = responseList[0].scheduleList;
							//self.payCard.selectedScheduleItem = responseList[0].scheduleList[0];
							self.txnHistory.fromSearchResult = false;
						}
					 }
					},

					clearSearchHistory : function() {
						self.txnHistory.txnTypeList = [],
						self.txnHistory.searchFromDate = '',
						self.txnHistory.searchToDate = '',
						self.txnHistory.fromSearchResult = false,
						self.txnHistory.searchFromDate_year = '',
						self.txnHistory.searchFromDate_month = '',
						self.txnHistory.searchFromDate_day = '',
						self.txnHistory.searchToDate_year = '',
						self.txnHistory.searchToDate_month = '',
						self.txnHistory.searchToDate_day = '',
						self.txnHistory.selectedCompltTxn = '',
						self.txnHistory.selectedTxnType = '',
						self.txnHistory.authStatus=false,
						self.txnHistory.authFlag='',
						self.txnHistory.authField='',
						self.txnHistory.reason='',
						self.txnHistory.tempTxnId='';

						//added for txnhistory
						self.txnHistory.initorID='',
						self.txnHistory.installments='',
						self.txnHistory.destId='',
						self.txnHistory.entRemarks='',
						self.txnHistory.chargeInd='',
						self.txnHistory.selPurpose='',
						self.txnHistory.initorType='',
						self.txnHistory.recFreq='',
						self.txnHistory.selectedReason='',
						self.txnHistory.selectedReason1='',
						self.txnHistory.selectedReason2='',
						self.txnHistory.selectedReason3='',
						self.txnHistory.selectedCharges='',
						self.txnHistory.displayAccount='',
						self.txnHistory.channelId='',
						self.txnHistory.debitAmount='',
						self.txnHistory.refDate='',
						self.txnHistory.txnDate='',
						self.txnHistory.bnfName='',
						self.txnHistory.hostRefNo='',
						self.txnHistory.failReason=''


	    			},
	    			initAuthPage : function(responsesList) {
	    				if(!responsesList[0].hasOwnProperty('errorMessage') && rootScope.rakCorpInit.corpModel.backFlag !='Y'){
	    					self.txnHistory.reason='';
	    					if (responsesList[0].hasOwnProperty('pmtStatus')) {
		    					self.txnHistory.statusFromHost = responsesList[0].pmtStatus;
		    					self.txnHistory.initorID=responsesList[0].initorID;
		    					self.txnHistory.debitAmount=responsesList[0].debitAmt;
								self.txnHistory.refDate=responsesList[0].REQ_DATE;
								self.txnHistory.txnDate=responsesList[0].TXN_DATE;
								self.txnHistory.bnfName=responsesList[0].beneficiaryName;
								self.txnHistory.hostRefNo=responsesList[0].HOST_REF_NO;
								self.txnHistory.tempTxnId=responsesList[0].REF_ID;
								self.txnHistory.failReason=responsesList[0].failReason;
		    				}
	    					if(responsesList[0].auth == "")
	     						self.txnHistory.authStatus=false;
	     					else
	     					{
	     						self.txnHistory.authStatus=true;
	     						self.txnHistory.authFlag = responsesList[0].auth;
	     					}
	    				}

	    			},
	    			initSuccessPage : function(responseList) {
	    				self.common.successMessage = responseList[0].successMsg;
	    				self.common.nextApprover = responseList[0].nextApprover;
	    			},

	    			//added for txn history


	    			initSchedulehistoryDetails:function(responsesList)
	    			{
	    				if(!responsesList[0].hasOwnProperty('errorMessage')){
	    					self.txnHistory.initorID=responsesList[0].initorID;
	    					self.txnHistory.installments=responsesList[0].installments;
	    					self.txnHistory.entRemarks=responsesList[0].entRemarks;
	    					self.txnHistory.chargeInd=responsesList[0].chargeInd;
	    					self.txnHistory.selPurpose=responsesList[0].selPurpose;
	    					self.txnHistory.initorType=responsesList[0].initorType;
	    					self.txnHistory.recFreq=responsesList[0].recFreq;
	    					self.txnHistory.selectedReason=responsesList[0].SELECTEDREASON;
	    				    self.txnHistory.selectedReason1=responsesList[0].ENTEREDREASON1;
	    				    self.txnHistory.selectedReason2=responsesList[0].ENTEREDREASON2;
	    				    self.txnHistory.selectedReason3=responsesList[0].ENTEREDREASON3;
	    				    self.txnHistory.destId=responsesList[0].destId;
	    				    self.txnHistory.displayAccount=responsesList[0].displayAccount;
	    				    self.txnHistory.channelId=responsesList[0].channelId;
	    				   /*
	    					if(self.schedule.selectedTxn.txnType==self.RAKSENDMONEYTXNTYPE.OWN || self.schedule.selectedTxn.txnType==self.RAKSENDMONEYTXNTYPE.RAKBANK){
	    						self.txnHistory.selectedReason = responsesList[0].entRemarks;
	    					}*/

	    				}
	    			},






    };

	self.mobileCash={
			fromAccounts:[],
			benfList:[],
			selectedBenf:'',
			selectedFromAccount:'',
			amountDisp:'',
			authStatus:false,
			authFlag:'',
			selectedBenfType:'',
			isBenfTypeSelected:false,
			benfTypeList:[],
			selfTxn:'Self',
			benfTxn:'Benf',
			fromBenfScreen:false,
			Beneficiary:'',
			mcTransferType:'',

			initFromBenfPage: function(){
				  self.mobileCash.selectedBenf=rootScope.rakPayee.selectedPayeeIndex;
					self.mobileCash.Beneficiary=rootScope.rakPayee.payeeSelected;
			},
			initPayNowPage : function(responseList) {

				self.sendMoney.bankTransferTab = false;
				self.sendMoney.rakMoneyTab = false;
				self.sendMoney.mobileCashTab = true;

				if (responseList[0].hasOwnProperty('mobBenfTypeList')){
				self.mobileCash.benfTypeList=responseList[0].mobBenfTypeList;
				}
				//self.mobileCash.benfTypeList=[{"benfDesc":"Self Withdrawal","benfCode":"Self"},{"benfDesc":"Beneficiary Withdrawal","benfCode":"Benf"}];
				if (responseList == null) {
					return;
				}

				if (!responseList[0].hasOwnProperty('errorMessage') && !self.common.fromAuthPage) {

			        if (responseList[0].hasOwnProperty('fromAccountsList')) {
						self.mobileCash.fromAccounts = responseList[0].fromAccountsList;
					}
			        if (responseList[0].hasOwnProperty('customerName')) {
			        	self.mobileCash.custName = responseList[0].customerName;
			        }

			        if (responseList[0].hasOwnProperty('benefVoList')) {
						self.mobileCash.benfList = responseList[0].benefVoList;
					}



				}

			},

			initAuthPage : function(responsesList) {

				if(!responsesList[0].hasOwnProperty('errorMessage') && rootScope.rakCorpInit.corpModel.backFlag !='Y'){
					self.common.balCheck = responsesList[0].balCheck;
					self.mobileCash.amountDisp = responsesList[0].amount;
					self.common.message=responsesList[0].MESSAGE;

					if(responsesList[0].auth == "")
 						self.mobileCash.authStatus=false;
 					else
 					{
 						self.mobileCash.authStatus=true;
 						self.mobileCash.authFlag = responsesList[0].auth;
 					}
				}
			},

			initSuccessPage : function(responseList) {

				if (responseList[0].hasOwnProperty('successMsg')) {
					self.common.successMessage = responseList[0].successMsg;
				}
				if(responseList[0].hasOwnProperty('nextApprover')){
					self.common.nextApprover = responseList[0].nextApprover;
				}

				if (responseList[0].hasOwnProperty('mcTransferType')) {
					self.mobileCash.mcTransferType = responseList[0].mcTransferType;
				}


			},

			clearFields:function(){
				self.mobileCash.selectedFromAccount='';
				self.mobileCash.amount = '';
				self.common.balCheck = false;
				self.mobileCash.selectedBenf = '';
				self.mobileCash.fromBenfScreen = false;
				self.common.availBal = null;
				self.common.availCashLimit = null;
				//Added for entity limit
				self.common.availEntityLimit = null;
				
				
				self.common.fromAuthPage=false;

			},

			getEvent:function(){
				var eventSel='';

				switch(self.mobileCash.selectedBenfType){

				case self.mobileCash.selfTxn:
					eventSel='onSelfMobileCashTransferClick';
				    break;

				case self.mobileCash.benfTxn:
					eventSel='onBenfMobileCashTransferClick';
				    break;

				default:
				    break;
				}

				return eventSel;
			},


			getSuccessEvent:function(){
				var eventSel='';

				if(self.mobileCash.fromBenfScreen){
					eventSel = 'onInitiateMobileCashBenfTransfer';
					self.mobileCash.fromBenfScreen = true;
				}
				else{
					if(self.mobileCash.mcTransferType=='Benf')
						eventSel = 'onBenfMobileCashTransferClick';
					else if(self.mobileCash.mcTransferType=='Self')
						eventSel = 'onSelfMobileCashTransferClick';

				}

				return eventSel;
			}

	};


	self.MOBILECASHHISTORYTXNTYPE={
			SELF:"Self",
			BENF:"Benf"
		};

	self.mobileCashHistory={
	   		 searchFromDate : null,
	   		 searchToDate : null,
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
			reason:'',
			scheduleList:'',
			selectedIndex:'',//Added for MCBHistory
			requestedBy:'',
			approvedBy:'',

					getLandingPageToDate : function(format) {
						var fromDate = moment();
						return fromDate.format(format);
					},
					getLandingPageFromDate : function(format) {
						var toDate = moment().subtract(7, 'days');
						return toDate.format(format);
					},

					setFromToDate : function() {
						self.common.displayDate = self.mobileCashHistory.searchFromDate;
						self.utils.populateCurrentDateDetails();

						self.mobileCashHistory.searchFromDate_day =self.common.date;
						self.mobileCashHistory.searchFromDate_month=self.common.month;
						self.mobileCashHistory.searchFromDate_year=self.common.year;

						self.common.displayDate = self.mobileCashHistory.searchToDate;
						self.utils.populateCurrentDateDetails();

						self.mobileCashHistory.searchToDate_day =self.common.date;
						self.mobileCashHistory.searchToDate_month=self.common.month;
						self.mobileCashHistory.searchToDate_year=self.common.year;
					 },

					 initCompltTransferListPage : function(responseList) {
							if (responseList[0].hasOwnProperty('scheduleList')) {
								self.mobileCashHistory.scheduleList = responseList[0].scheduleList;
								//self.payCard.selectedScheduleItem = responseList[0].scheduleList[0];
								self.mobileCashHistory.fromSearchResult = false;
							}
							/*if (responseList[0].hasOwnProperty('fromDate')) {
								self.mobileCashHistory.searchFromDate = new Date(responseList[0].fromDate);
							}
							if (responseList[0].hasOwnProperty('toDate')) {
								self.mobileCashHistory.searchToDate = new Date(responseList[0].toDate);
							}*/
						},
						historyDetail:function(responsesList){
							self.mobileCashHistory.requestedBy=self.mobileCashHistory.scheduleList[self.mobileCashHistory.selectedIndex].requestedBy;
							self.mobileCashHistory.approvedBy=self.mobileCashHistory.scheduleList[self.mobileCashHistory.selectedIndex].approvedBy;
						},
						clearSearchHistory : function() {
							self.mobileCashHistory.searchFromDate = null,
							self.mobileCashHistory.searchToDate = null,
							self.mobileCashHistory.fromSearchResult = false,
							self.mobileCashHistory.searchFromDate_year = null,
							self.mobileCashHistory.searchFromDate_month = null,
							self.mobileCashHistory.searchFromDate_day = null,
							self.mobileCashHistory.searchToDate_year = null,
							self.mobileCashHistory.searchToDate_month = null,
							self.mobileCashHistory.searchToDate_day = null,
							self.mobileCashHistory.selectedCompltTxn = null,

							self.mobileCashHistory.authStatus=false,
							self.mobileCashHistory.authFlag='',
							self.mobileCashHistory.authField='',
							self.mobileCashHistory.reason='',
							self.mobileCashHistory.scheduleList='',
							self.mobileCashHistory.selectedIndex='',
							self.mobileCashHistory.requestedBy='',
							self.mobileCashHistory.approvedBy=''
		    			},

		    			initSendAgainPage : function(responseList) {


		    				self.sendMoney.bankTransferTab = false;
		    				self.sendMoney.rakMoneyTab = false;
		    				self.sendMoney.mobileCashTab = true;
		    				//self.mobileCash.benfTypeList=[{"benfDesc":"Self Withdrawal","benfCode":"Self"},{"benfDesc":"Beneficiary Withdrawal","benfCode":"Benf"}];
		    				if (responseList[0].hasOwnProperty('mobBenfTypeList')) {
		    				self.mobileCash.benfTypeList=responseList[0].mobBenfTypeList;
		    				}

		    				if (responseList == null) {
		    					return;
		    				}

		    				if (!responseList[0].hasOwnProperty('errorMessage') && !self.common.fromAuthPage) {

		    			        if (responseList[0].hasOwnProperty('fromAccountsList')) {
		    						self.mobileCash.fromAccounts = responseList[0].fromAccountsList;
		    					}
		    			        if (responseList[0].hasOwnProperty('customerName')) {
		    			        	self.mobileCash.custName = responseList[0].customerName;
		    			        }

		    			        if (responseList[0].hasOwnProperty('benefVoList')) {
		    						self.mobileCash.benfList = responseList[0].benefVoList;
		    					}

		    			        //self.mobileCash.selectedBenf=self.rootScope.rakPayee.selectedPayeeIndex;
		    					//self.mobileCash.Beneficiary=self.rootScope.rakPayee.payeeSelected;
		    			        if(self.mobileCashHistory.selectedCompltTxn!=''){
			    			        self.mobileCash.selectedBenfType = self.mobileCashHistory.selectedCompltTxn.txnType;
				    				self.mobileCash.selectedBenf = self.mobileCashHistory.selectedCompltTxn.benfName;
				    				self.mobileCash.selectedFromAccount = self.mobileCashHistory.selectedCompltTxn.fromAccount;
				    				self.mobileCash.amount = Number(self.mobileCashHistory.selectedCompltTxn.txnAmount.split(" ")[1]);

				    				for(var temp in self.mobileCash.fromAccounts){
				    					if(self.mobileCash.fromAccounts[temp].accountNumber==self.mobileCashHistory.selectedCompltTxn.fromAccount){
				    						self.mobileCash.selectedFromAccount=self.mobileCash.fromAccounts[temp].accountIndex;
				    						break;
				    					}
				    				}

				    				for(var temp in self.mobileCash.benfList){
				    					if(self.mobileCash.benfList[temp].beneficiaryName==self.mobileCashHistory.selectedCompltTxn.benfName){
				    						self.mobileCash.selectedBenf=self.mobileCash.benfList[temp].beneficiaryIndex;
				    						break;
				    					}
				    				}
		    			        }



		    				}


						},

						getSendAgainEvent:function(){
							var eventSel='';

							if(self.mobileCashHistory.selectedCompltTxn.txnType == 'Self'){
								eventSel = 'onMobileCashSendAgainSelf';
							}
							else{
								eventSel = 'onMobileCashSendAgainBenf';
								self.mobileCash.fromBenfScreen = false;
							}

							return eventSel;
						},


						getAuthEvent:function(){
							var eventSel='';

							if(self.mobileCashHistory.selectedCompltTxn.txnType == 'Self'){
								eventSel = 'onMobileCashTransferSend';
							}
							else{
								eventSel = 'onMobileCashBenfTransferSend';
							}

							return eventSel;
						},

						initAuthPage : function(responsesList) {
		    				if(!responsesList[0].hasOwnProperty('errorMessage') && rootScope.rakCorpInit.corpModel.backFlag !='Y'){
		    					if(responsesList[0].auth == "")
		     						self.mobileCashHistory.authStatus=false;
		     					else
		     					{
		     						self.mobileCashHistory.authStatus=true;
		     						self.mobileCashHistory.authFlag = responsesList[0].auth;
		     					}
		    				}

		    			},

						initSuccessPage : function(responseList) {
		    				self.common.successMessage = responseList[0].message;
		    			},
		    			setInitialDate : function(){
							self.common.searchToDate = new Date();
							self.common.searchFromDate = new Date().addDays(-7);
							self.common.displayDate = self.common.searchFromDate;
							self.utils.populateCurrentDateDetails();
							self.mobileCashHistory.searchFromDate_day =self.common.date;
							self.mobileCashHistory.searchFromDate_month=self.common.month;
							self.mobileCashHistory.searchFromDate_year=self.common.year;
							self.common.displayDate = self.common.searchToDate;
							self.utils.populateCurrentDateDetails();
							self.mobileCashHistory.searchToDate_day =self.common.date;
							self.mobileCashHistory.searchToDate_month=self.common.month;
							self.mobileCashHistory.searchToDate_year=self.common.year;
							self.mobileCashHistory.searchFromDate=self.common.searchFromDate;
							self.mobileCashHistory.searchToDate=self.common.searchToDate;
		    			}


	    };

};