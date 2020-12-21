App.viewModels.rakPayCards = function(scope,rootscope, UIControlsService, ActionProcessor) {

	var self = this;
	m1 = self;
	self.scope=scope;
	self.rootscope = rootscope;
	self.acceptTermscondition="N";

/*	self.sendMoneyTab = true;
	self.benfTab = false;
	self.history = false;
*/
	// TABS STARTS HERE
	self.payCards = true;
	self.benfTab = false;
	self.history = false;

	self.clearTab = function() {
		self.payCards = false;
		self.cardsTab = false;
		self.cardHistoryTab = false;
		self.nonRakPayCards.bankTransferTab = false;
	/*	self.nonRakPayCards.rakMoneyTab = false;
		self.nonRakPayCards.mobileCashTab = false;
		self.common.scheduleTransferTab = false;
		self.common.rakIncompleteTab = false;
		self.common.viewHistoryTab = false;*/
	}
	
	
	self.setXauValue = function(responseList) {
		self.xau = responseList.xauEquivalent;
		self.buyRate = responseList.buyRate;
		self.sellRate = responseList.sellRate;
	}


	self.alterTxnCurrenyArray=function(){
		if(self.ownCards.currencyList){
			for(var temp in self.ownCards.currencyList){
				self.ownCards.currencyList[temp]['currencyDesc']=self.ownCards.currencyList[temp]['currencyDesc']+" "+rootscope.appLiterals.APP.RAKSEND_MONEY.RAKTRANSFERS_PAYNOW_PAGE.TRANSFERCURR;

			}

		}


	}

	self.getExchangePopUp=function(){
		self.common.exchangePopUp=true;
	}

	// Added Util Function START//
	self.utils = {
		parseNumbers : function() {


			if (self.ownCards.amount != null) {

				self.common.amount = self.ownCards.amount.toString();
			}

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

			self.common.fromIndex = null;
			self.common.toIndex = null;
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
			self.common.currencyList = [];
			self.common.ownAccounts = [];
			self.common.displayDate = new Date();
			self.common.selectedFromAccount = null;
			self.common.transactionDate = null;
			self.common.isStatusError = false;
			self.common.frequencyTypeList = [];
			self.common.frequencyType = null;
			self.common.freqType = null;
			self.common.beneficaryName = null;
			self.common.installments = null;
			self.common.noOfDays = null;
			self.common.scheduleType = "";
			self.common.isNoOfDayEmpty = false;
			self.common.isScheduleTransfer = false;
			// added for RAK funds Transfer landing Page Started//
			self.common.valueAmount='';
			self.common.creditAmount='';
			self.common.toDisplayString = null;
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
			self.common.lastStatmentBal='';
			self.common.currentBal='';
			self.common.minAmtDue='';
			self.common.paymentDueDate='';
			self.common.toCardId='';
			self.rootscope.rakPayee.common.fromAuthPage=false;
			self.common.fromAuthPage=false;
			self.common.exchangeRate='';
			self.common.exchangePopUp=false;

			self.common.convertedAmt='';

			self.common.reason1='';
			self.common.reason2='';
			self.common.reason3='';
			self.common.message='';
			self.common.beneficiaryResidentCountryDisplay='';
			self.common.beneficiaryAccountNumber='';

			self.common.exchangeRate='';
			self.common.refId='';
			self.common.nextApprover='';
			self.common.currentRate='';
			self.rootscope.rakPayee.fromBenfList=false;
			self.common.effectiveRate='';
			self.common.exchangeRateCall=false;
			self.acceptTermscondition="N";
			self.common.eqtXAU='';
			self.common.eqtValues='';

			// RAK added for clearing the data ENDED//////////////
		}
	// Util Function Ended///
	};

	self.common = {
		toCardId :'',
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
		selpromocode: null,
		lastStatmentBal:'',
		currentBal:'',
		minAmtDue:'',
		paymentDueDate:'',
		// payType:'Now', //PayType is either 'Now' or 'Schedule'. Move this to
		// an emun if needed.
		isStatusError : false,
		frequencyTypeList : [],
		frequencyType : null,
		freqType : null,
		beneficaryName : null,
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
		creditLimit:'',
		searchFromList : [],
		searchToList : [],
		selectedSearchFrom : "",
		selectedFromIndex : null,
		selectedFromType : null,
		searchFrom : null, // Complete, Incomplete, Schedule
		searchFromDate : new Date(),
		searchToDate : new Date(),
		scheduleList : [],
		selectedScheduleItem : null,
		balCheck : false,
		availBal :'',
		valueAmount:'',
		creditAmount:'',
		exchangeRate:'',
		exchangePopUp:false,
		convertedAmt:'',
		reason1:'',
		reason2:'',
		reason3:'',
		message:'',
		beneficiaryResidentCountryDisplay:'',
		beneficiaryAccountNumber:'',
		dd: new Date(),
		exchangeRate:'',
		refId:'',
		nextApprover:'',
		secAuthValue:'',
		securityAnswer:'',
		currentRate:'',
		effectiveRate:'',
		exchangeRateCall:false,
		

		updateBal:function(eventName)
	      {
			if(self.ownCards.selectedFromAccount){
			ActionProcessor.setEvent(eventName).then(function(payload) {
			console.log("Update Balance");
			console.log(JSON.stringify(payload));
			var response=payload;
			self.common.availBal=response.responsesList[0].accountAvailableBalance;
			//rootscope.$apply();
			},function(errorPayload){
				self.common.availBal='';
			})
			
	      }

	}
	};

	self.authMode = {
		OTP : 0,
		TransactionPassword : 1,
		None : -1
	};


	self.CardsBenTypeConstant={
		WITHINUAE:"UCC",
		OUTSIDEUAE:"OCC",
		RAKCARDS:"RCC",
		PREPAIDCARDS:"PPC"
	};

	self.TxnTypeConstant={
			OWNCARDS:"OCP",
			RAKCARDS:"RCP",
			WITHINUAE:"NCP",
			OUTSIDEUAE:"WCP",
			PREPAIDCARDS:"SVC",
			ALL:"All"
		};

	self.CONSTANTS={
		SISTATUS:"A",
		CHARGESALLTYPE:"O"
	};

	self.setFutureDate = function(){
		self.common.searchFromDate = new Date();
		self.common.searchToDate = new Date().addMonths(1);

		self.common.displayDate = self.common.searchFromDate;
		self.utils.populateCurrentDateDetails();

		self.common.searchFromDate_day =self.common.date;
		self.common.searchFromDate_month=self.common.month;
		self.common.searchFromDate_year=self.common.year;

		self.common.displayDate = self.common.searchToDate;
		self.utils.populateCurrentDateDetails();

		self.common.searchToDate_day =self.common.date;
		self.common.searchToDate_month=self.common.month;
		self.common.searchToDate_year=self.common.year;

		self.rakInvGold.searchFromDate = self.common.searchFromDate;
		self.rakInvGold.searchToDate = self.common.searchToDate;

	};



	self.ownCards={
			benfTypeList:[],
			fromAccounts:[],
			ownCardsList:[],
			cardsBenfList:[],
			amount:'',
			ownamount:'',
			isCardBenfTypeSelected:false,
			isCardSelected:false,
			isBenfAccountSelected:false,
			selectedCardBenfType:'',
			selectedOwnCard:'',
			selectedPPCard:'',
			selectedBenfCard:'',
			selectedFromAccount:'',
			lastStatmentBalance:'',
			currentBalance:'',
			minAmountDue:'',
			totAmountDue:'',
			paymentDueDate:'',
			availBal:'',
			remarks:'',
			minAmtTab:true,
			totAmtTab:false,
			othAmtTab:false,
			siAmt:'',
			siDate:'',
			siStatus:'',
			siStatusDisplay:'',
			selectedBenType : '',
			showResidentCountryField:'',
			showUBFResidentCountry:'',
			beneficaryTypes : [],

			selectedToAccount : '',
			selectedToBenAccount : '',
			ownAccounts : [],
			benAccounts : [],
			rakBenfResidentCountry:'',
			benfRestCountryList:[],
			fromAccounts : [],
			currencyList : [],
			selectedCurrency : '',
			frequencyType : [],
			selectedFrequency :'O',
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
			selectedCharges : '',
			selectedPurpose : '',
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
			reasonList:[],
			selectedReason:'',
			selectedReason1:'',
			selectedReason2:'',
			selectedReason3:'',
			benfUpdatedIndex:'',
			cardPaymentDetails:'',
			showReasonThirdField:true,
			payeeId:'',
			exchangeRate:'',
			convertedAmt:'',
			beneficiaryAccountNum:'',
			isPromoSelected:false,
			selectedpromoCode:'',
			promoCodeForFT:[],
			promoCodeForREM:[],
			isPromoSelected:false,
			selectedpromoCodeForServerdealnumber:'',
			isModified:false,
			amtType:'M',
			selectedFromAccountDisp:'',
			payAgainInstallments:'',
			payAgainRecFreq:'',
			noAccounts:false,
			transactionPurposeCodeForNBFI:'',
			
			errMessage:'N',

			
			checkCardType:function(){
				if(rootScope.rakSendMoney.noOprAccounts && rootScope.rakSendMoney.noCCAccounts){
					self.ownCards.noAccounts = true;
				}
				else{
					if(self.ownCards.selectedCardBenfType == 'SVC'){
						self.ownCards.clearFields();
						self.ownCards.selectedToBenAccount='';
						self.ownCards.clearAmountTab();
						scope.setEvent('onPayCardbenfTypeSel');
						self.ownCards.noAccounts = false;
					}
					
					else{
						if(rootScope.rakSendMoney.noOprAccounts){
							self.ownCards.noAccounts = true;
						}
						else{
							self.ownCards.clearFields();
							self.ownCards.selectedToBenAccount='';
							self.ownCards.clearAmountTab();
							scope.setEvent('onPayCardbenfTypeSel');
							self.ownCards.noAccounts = false;
						}
					}
				}
				
			},

			clearOwnCardsData:function(){
				self.ownCards.benfTypeList=[];
				self.ownCards.fromAccounts=[];
				self.ownCards.ownCardsList=[];
				self.ownCards.cardsBenfList=[];
				self.ownCards.amount='';
				self.ownCards.ownamount='';
				self.ownCards.showResidentCountryField='';
				self.ownCards.showUBFResidentCountry='';
				self.ownCards.siStatusDisplay='',
				self.ownCards.isBenfAccountSelected=false;
				self.ownCards.isCardBenfTypeSelected=false;
				self.ownCards.selectedCardBenfType='';
				self.ownCards.selectedOwnCard='';
				self.ownCards.selectedPPCard='';
				self.ownCards.selectedBenfCard='';
				self.ownCards.selectedFromAccount='';
				self.ownCards.availBal='';
				self.ownCards.lastStatmentBalance='';
				self.ownCards.currentBalance='';
				self.ownCards.minAmountDue='';
				self.ownCards.totAmountDue='';
				self.ownCards.paymentDueDate='';
				self.ownCards.siAmt='';
				self.ownCards.siDate='';
				self.ownCards.siStatus='';
				self.ownCards.remarks='';
				self.ownCards.minAmtTab=false;
				self.ownCards.totAmtTab=false;
				self.ownCards.othAmt=false;
				self.ownCards.isCardSelected=false;
				self.ownCards.selectedBenType = null;
				self.ownCards.beneficaryTypes = null;
				self.ownCards.selectedFromAccount = '';
				self.ownCards.selectedToAccount = '';
				self.ownCards.selectedToBenAccount = '';
				self.ownCards.ownAccounts = [];
				self.ownCards.benAccounts = [];
				self.ownCards.rakBenfResidentCountry='';
				self.ownCards.benfRestCountryList=[];
				self.ownCards.fromAccounts = [];
				self.ownCards.currencyList = [];
				self.ownCards.selectedCurrency = '';
				self.ownCards.frequencyType = [];
				self.ownCards.selectedFrequency = 'O';
				self.ownCards.amount = null;
				self.ownCards.noOfTransfer = "";
				self.ownCards.reason = "";
				self.ownCards.selectedpromoCode = '';
				self.ownCards.promoCode = [];
				self.ownCards.eligibleAmount = null;
				self.ownCards.beneficiaryList = null;
				self.ownCards.beneficiaryNickName = null;
				self.ownCards.beneficiaryAccountNumber = null;
				self.ownCards.beneficiaryIndex = null;
				self.ownCards.frequencyTypeDesc = null;
				self.ownCards.charges = [];
				self.ownCards.purpose = [];
				self.ownCards.purposeListUpdated = [];
				self.ownCards.selectedCharges = '';
				self.ownCards.selectedPurpose = '';
				self.ownCards.RemcurrencyList = [];
				self.ownCards.selectedRCurr = '';
				self.ownCards.subAccountTypeDesc = null;
				self.ownCards.transactionType = null;
				self.ownCards.availBal = null;
				self.ownCards.exchangeRate=null;
				self.ownCards.dummyTxntype=null;
				self.ownCards.debitCrn=null;
				self.ownCards.creditCrn=null;
				self.ownCards.txnType=null;
				self.ownCards.remitCrnFilter=[];
				self.ownCards.reasonList=[];
				self.ownCards.selectedReason='';
				self.ownCards.selectedReason1="";
				self.ownCards.selectedReason2="";
				self.ownCards.selectedReason3="";
				self.ownCards.txnCurrencyArray=null;
				self.ownCards.benfUpdatedIndex=null;
				self.ownCards.cardPaymentDetails=null;
				self.ownCards.showReasonThirdField=true;
				self.ownCards.payeeId='';

				self.ownCards.convertedAmt='';
				self.ownCards.beneficiaryAccountNum='';
				self.ownCards.isPromoSelected=false;
				self.ownCards.selectedpromoCode='';
				self.ownCards.promoCodeForFT=[];
				self.ownCards.promoCodeForREM=[];
				self.ownCards.isPromoSelected=false;
				self.ownCards.selectedpromoCodeForServer='';

				//RAK DEV CHNAGES FOR PROUAT-741 START
				self.ownCards.lastStatmentBalanceDisplaying='';
				self.ownCards.minAmountDueDisplaying='';
				self.ownCards.isModified=false;
				self.ownCards.amtType='';
				self.ownCards.selectedFromAccountDisp='';
				self.ownCards.noAccounts = false;
				self.ownCards.payAgainRecFreq='';
				self.ownCards.payAgainInstallments='';
			},

			clearAmountTab:function(){
				self.ownCards.minAmtTab=false;
				self.ownCards.totAmtTab=false;
				self.ownCards.othAmtTab=false;
			},
			clearFields:function(){
				self.ownCards.exchangeRate=null;
				self.ownCards.amount = null;
				self.ownCards.noOfTransfer = "";
				self.ownCards.reason = "";
				self.ownCards.isBenfAccountSelected=false;
				self.ownCards.selectedFromAccount='';
				self.common.availBal='';
				self.ownCards.benfUpdatedIndex='';
				self.ownCards.ownamount='';
				self.ownCards.showResidentCountryField='';
				self.ownCards.showUBFResidentCountry='';
				self.ownCards.rakBenfResidentCountry='';
				self.ownCards.siStatus='';
				self.ownCards.isCardSelected=false;
				self.ownCards.selectedPPCard="";
				self.ownCards.selectedFrequency='O';
				self.ownCards.creditLimit="";
				self.ownCards.selectedRCurr="";
				self.ownCards.selectedCurrency="";
				self.common.displayDate=new Date();
				self.ownCards.selectedBenfCard="";
				self.ownCards.selectedFromAccount="";
				self.ownCards.amount="";
				scope.rakPayee.payCard.selectedCompltTxn="";
				self.common.fromAuthPage=false;
				self.ownCards.convertedAmt='';
				self.ownCards.selectedOwnCard='';

				self.ownCards.isPromoSelected=false;
				self.ownCards.selectedpromoCode='';
				self.common.availBal='';
				self.ownCards.selectedpromoCodeForServer='';
				self.ownCards.dummyTxntype='';

				self.ownCards.selectedReason='';
				self.ownCards.selectedReason1='';
				self.ownCards.selectedReason2='';
				self.ownCards.selectedReason3='';
				self.ownCards.selectedCharges='';
				self.ownCards.isModified=false;
				
				

			},
			setAmount:function(){
				if(self.ownCards.minAmtTab){
					self.ownCards.ownamount= self.ownCards.minAmountDue.toString();
				}
				else if(self.ownCards.totAmtTab){
					self.ownCards.ownamount= self.ownCards.lastStatmentBalanceDisplay.toString();
				}
				else if(self.ownCards.othAmtTab){
					self.ownCards.ownamount='';
				}

			},

			getEventForCardsConfirm:function(){
				var eventSel='';
				switch(self.ownCards.selectedCardBenfType){

				case self.TxnTypeConstant.OWNCARDS:
					eventSel="onOwnCardsSendClick";
					//self.ownCards.benfUpdatedIndex=Number(self.ownCards.selectedOwnCard)+1;
					self.ownCards.ownamount=self.ownCards.minAmtTab ? self.ownCards.minAmountDue.toString() :self.ownCards.ownamount;
					self.ownCards.dummyTxntype="XFR_TRANSFER";
				    break;

				case self.TxnTypeConstant.RAKCARDS:
					eventSel="onRakCardsSendClick";
					self.ownCards.benfUpdatedIndex=Number(self.ownCards.selectedBenfCard)+1;
					self.ownCards.dummyTxntype="PMT_TRANSFER";
				    break;

				default:
				    break;
				}

				return eventSel;
			},
			getStaticText : function() {

				if (self.ownCards.selectedCharges == 'ALL20') {
					self.ownCards.isAll = true;
				} else {
					self.ownCards.isAll = false;
				}
			},

			editDirtyCheck : function() {
				var eventSel='';
				if(self.schedule.schTxnListSubmitBtn=='MODIFY' && rootScope.rakPendingApproval.pendingApprovalTab!='PIA'){
					if(jQuery("div.modTxn").find(".ng-dirty").length==0 && !self.common.fromAuthPage && self.ownCards.isModified == false){
					
						rootscope.showErrorPopup(rootscope.appLiterals.APP.RAKSEND_MONEY.RAKTRANSFER_VIEWSCHEDULE.NOMODIFYERROR);
						return;
			         }
					else{
						self.ownCards.isModified = true;
						eventSel="onPrepaidCardSendClick";
						
					}
				}
				
				else if(self.schedule.schTxnListSubmitBtn=='MODIFY' && rootScope.rakPendingApproval.pendingApprovalTab=='PIA'){
					eventSel="onPrepaidCardSendClick";
				}
				
				scope.setEvent(eventSel);
			},

			getPurposeList : function() {

				if (self.ownCards.selectedToBenAccount) {

					var benType = self.ownCards.benAccounts[self.ownCards.selectedToBenAccount]['cardBeneficiaryType']
							.toString();

					var paymentDetails= self.ownCards.benAccounts[self.ownCards.selectedToBenAccount]['cardPaymentDetails'].toString();
					if(self.ownCards.selectedBenType==self.CardsBenTypeConstant.WITHINUAE){
						//Financial
						if(paymentDetails && paymentDetails.length >4 && paymentDetails.indexOf('|')==-1){
							self.ownCards.selectedPurpose = self.ownCards.transactionPurposeCodeForNBFI;
							if(rootScope.dashboard.userType=='1'){							
								self.ownCards.selectedPurposeDisp="Credit Card Payments";
								self.ownCards.selectedReason="CRP";
							}
							else {
								self.ownCards.selectedPurposeDisp="Corporate Card Payment";
								self.ownCards.selectedReason="CCP";
							}
							/*else{							
								self.ownCards.selectedPurposeDisp="Credit Card Payments";
								self.ownCards.selectedReason="CRP";
							}*/
							
						}
						//Non - Financial
						else{
							if(rootScope.dashboard.userType=='1'){
								self.ownCards.selectedPurpose="CRP";
								self.ownCards.selectedReason="CRP";
								self.ownCards.selectedPurposeDisp="Credit Card Payments";
							}
							else{
								self.ownCards.selectedPurpose="CCP";
								self.ownCards.selectedReason="CCP";
								self.ownCards.selectedPurposeDisp="Corporate Card Payment";
							}
							/*else{
								self.ownCards.selectedPurpose="CRP";
								self.ownCards.selectedReason="CRP";
								self.ownCards.selectedPurposeDisp="Credit Card Payments";
							}*/
						}
					}

					// Added for Promo code changes

					self.ownCards.promoCode=[];

						self.ownCards.promoCode= self.ownCards.promoCodeForREM;
						self.common.fromAuthPage=false;

				}
			},

			populateTransactionCurrencyForPromoCode :function(selectedPromoCodeTranCurrency){
				self.ownCards.txnCurrencyArray=[];
				for(var temp in self.ownCards.currencyList){
					if(self.ownCards.currencyList[temp]['currencyCode']==selectedPromoCodeTranCurrency){

						self.ownCards.txnCurrencyArray.push(self.ownCards.currencyList[temp]);
						break;
					}
				}
			},

			promoCodeSelected:function(){

				if(self.ownCards.selectedpromoCode){

					if(self.ownCards.selectedpromoCode=='NA'){
						self.ownCards.isPromoSelected=false;
						self.ownCards.amount='';
						self.ownCards.getDefaultTransCurr();
						self.ownCards.getRemCurrencyPrepopulate();
						self.ownCards.exchangeRate='';
						self.ownCards.dummyTxntype=self.ownCards.dummyTxntype.indexOf("|") ? self.ownCards.dummyTxntype.split("|")[0] : self.ownCards.dummyTxntype;
						self.ownCards.selectedpromoCodeForServer="";
						return;
					}
					var selectedPromoCode=Number(self.ownCards.selectedpromoCode)+1;
					self.ownCards.isPromoSelected=true;
					self.ownCards.selectedRCurr=self.ownCards.promoCode[selectedPromoCode]['remcrn'].toString();
					self.ownCards.selectedCurrency=self.ownCards.promoCode[selectedPromoCode]['txncrn'].toString();
					self.ownCards.populateTransactionCurrencyForPromoCode(self.ownCards.selectedCurrency);
					self.ownCards.amount=Number(self.ownCards.promoCode[selectedPromoCode]['dealamount'].toString());
					self.ownCards.dummyTxntype=self.ownCards.dummyTxntype+"|"+self.ownCards.promoCode[selectedPromoCode]['dealnumber'].toString();
					self.ownCards.selectedpromoCodeForServer=self.ownCards.promoCode[selectedPromoCode]['dealnumber'].toString();
					self.ownCards.selectedFromAccountDisp = self.ownCards.fromAccounts[self.ownCards.selectedFromAccount].subAccountTypeDesc+"-"+self.ownCards.fromAccounts[self.ownCards.selectedFromAccount].accountNumber
					+"-"+self.ownCards.fromAccounts[self.ownCards.selectedFromAccount].currencyCode;
					self.common.fromAuthPage=false;
					self.ownCards.getKeyUp();
				}
			},

			getDefaultTransCurr : function() {
				if (self.ownCards.selectedToBenAccount != undefined) {
				if (self.ownCards.selectedFromAccount != undefined) {
					self.ownCards.selectedCurrency = self.ownCards.fromAccounts[self.ownCards.selectedFromAccount]['currencyCode']
							.toString();
					self.ownCards.debitCrn=self.ownCards.selectedCurrency;

				}
				}
			},

			filterCurrencyArray: function(){
				self.ownCards.txnCurrencyArray=[];
				if (self.ownCards.selectedToBenAccount) {
					var benfCountry=self.ownCards.benAccounts[self.ownCards.selectedToBenAccount]['cardBeneficiaryCountry'].toString();
					var benType = self.ownCards.benAccounts[self.ownCards.selectedToBenAccount]['cardBeneficiaryType'].toString();



					for(var temp in self.ownCards.remitCrnFilter){
						if(benfCountry==self.ownCards.remitCrnFilter[temp]['filterCode']){
							self.ownCards.creditCrn=self.ownCards.selectedRCurr;

							break;
						}
					}
				}


				if (self.ownCards.selectedFromAccount != undefined && self.ownCards.selectedFromAccount!='') {
					self.ownCards.selectedCurrency = self.ownCards.fromAccounts[self.ownCards.selectedFromAccount]['currencyCode']
							.toString();
					self.ownCards.debitCrn=self.ownCards.selectedCurrency;

				}

				for(var temp in self.ownCards.currencyList){
					if(self.ownCards.currencyList[temp]['currencyCode']==self.ownCards.debitCrn || self.ownCards.currencyList[temp]['currencyCode']==self.ownCards.creditCrn){
						//self.ownCards.currencyList[temp]['currencyDesc']=self.ownCards.currencyList[temp]['currencyDesc']+" "+rootScope.appLiterals.APP.RAKSEND_MONEY.RAKTRANSFERS_PAYNOW_PAGE.TRANSFERCURR;
						self.ownCards.txnCurrencyArray.push(self.ownCards.currencyList[temp]);
					}
					else if(self.ownCards.selectedRCurr!=null && self.ownCards.selectedRCurr!='' && !self.ownCards.txnCurrencyArray.hasOwnProperty[self.ownCards.selectedRCurr] && self.ownCards.currencyList[temp]['currencyCode']==self.ownCards.selectedRCurr){
						//self.sendMoney.currencyList[temp]['currencyDesc']=self.sendMoney.currencyList[temp]['currencyDesc']+" "+rootScope.appLiterals.APP.RAKSEND_MONEY.RAKTRANSFERS_PAYNOW_PAGE.TRANSFERCURR;
						self.ownCards.txnCurrencyArray.push(self.ownCards.currencyList[temp]);
					}

				}

				// Resetting the models for exchange rate refresh
				
				

			},
			
			refreshBenfResidentCountry:function(){
				if(self.ownCards.benAccounts && self.ownCards.selectedToBenAccount){
					
					var benType = self.ownCards.benAccounts[self.ownCards.selectedToBenAccount]['cardBeneficiaryType'].toString();
					 var withinUAEBenfCountryAvailable = self.ownCards.benAccounts[self.ownCards.selectedToBenAccount]['withinUAEBenfCountryAvailable'];
					 self.ownCards.withinUAEBenfCountryAvailable= withinUAEBenfCountryAvailable ;
					 
					 if (benType == 'UCC' && self.ownCards.selectedRCurr && self.ownCards.selectedRCurr != "AED" && withinUAEBenfCountryAvailable && withinUAEBenfCountryAvailable=='N') {
						 self.ownCards.showUBFResidentCountry = "YES";
						 self.ownCards.rakBenfResidentCountry='';
					 } else{
						 self.ownCards.showUBFResidentCountry = "NO";
					 }
				}


			},

			refreshValueforExchangeRate:function(){
				self.ownCards.exchangeRate='';
				self.ownCards.amount='';
			},
			
			/* XM Changes Start*/
			getresidentCountryForBenf:function(){
				self.ownCards.showResidentCountryField = 'N';
				if(self.ownCards.benAccounts && self.ownCards.selectedToBenAccount){
					self.ownCards.rakBenfResidentCountry='';
					var residentCountryAvailable=self.ownCards.benAccounts[self.ownCards.selectedToBenAccount]['benefResidentCountryAvailable'].toString();
					if(residentCountryAvailable && residentCountryAvailable=='N'){
						self.ownCards.showResidentCountryField = 'Y';
					}else{
						self.ownCards.showResidentCountryField = 'N';
					}
					
					var benType = self.ownCards.benAccounts[self.ownCards.selectedToBenAccount]['cardBeneficiaryType'].toString();
					 var withinUAEBenfCountryAvailable = self.ownCards.benAccounts[self.ownCards.selectedToBenAccount]['withinUAEBenfCountryAvailable'];
					 self.ownCards.withinUAEBenfCountryAvailable= withinUAEBenfCountryAvailable ;
					 
					 if (benType == 'UCC' && self.ownCards.selectedRCurr && self.ownCards.selectedRCurr != "AED" && withinUAEBenfCountryAvailable && withinUAEBenfCountryAvailable=='N') {
						 self.ownCards.showUBFResidentCountry = "YES";
					 } else{
						 self.ownCards.showUBFResidentCountry = "NO";
					 }
				}
				
			
				
			},
			
		
			/* XM Changes End*/


			getRemCurrencyPrepopulate:function(){
				if (self.ownCards.selectedToBenAccount != undefined) {
				self.common.fromAuthPage=false;
				var benfCountry=self.ownCards.benAccounts[self.ownCards.selectedToBenAccount]['cardBeneficiaryCountry'].toString();
				var benType = self.ownCards.benAccounts[self.ownCards.selectedToBenAccount]['cardBeneficiaryType'].toString();
				var flag=false;
				for(var temp in self.ownCards.remitCrnFilter){
					if(benfCountry==self.ownCards.remitCrnFilter[temp]['filterCode']){
						flag=true;
						self.ownCards.selectedRCurr=self.ownCards.remitCrnFilter[temp]['filterDesc'];
						self.ownCards.creditCrn=self.ownCards.selectedRCurr;
						break;
					}

			}
				if(!flag)
				{
					self.sendMoney.selectedRCurr="";
				}

				}

			},

			getBenfAccountNum:function(){
				self.ownCards.beneficiaryAccountNum=rootscope.appLiterals.APP.RAKPAYCARDS.RAKPAYCARDS_AUTHPAGE.BENEFICIARYACCOUNT+self.ownCards.cardsBenfList[self.ownCards.selectedBenfCard]['cardNumber'].toString();
			},

			getEventForBenf : function() {
				if (self.ownCards.selectedToBenAccount != "") {
					self.ownCards.selectedBenType = self.ownCards.benAccounts[self.ownCards.selectedToBenAccount]['cardBeneficiaryType'].toString();
					if(self.ownCards.selectedBenType!='' && self.ownCards.selectedBenType!=undefined && (self.ownCards.selectedBenType==self.CardsBenTypeConstant.WITHINUAE || self.ownCards.selectedBenType==self.CardsBenTypeConstant.OUTSIDEUAE)) {
						if(self.ownCards.selectedBenType==self.CardsBenTypeConstant.WITHINUAE && self.ownCards.fromAccountsNCP.length<1) {
							rootScope.showErrorPopup(rootScope.appLiterals.APP.RAKSEND_MONEY.RAKTRANSFERS_PAYNOW_PAGE.ACCESS_LEVEL_ERROR_MSG);
							self.ownCards.fromAccounts = "";
						}
						else if(self.ownCards.selectedBenType==self.CardsBenTypeConstant.OUTSIDEUAE && self.ownCards.fromAccountsWCP.length<1){
							rootScope.showErrorPopup(rootScope.appLiterals.APP.RAKSEND_MONEY.RAKTRANSFERS_PAYNOW_PAGE.ACCESS_LEVEL_ERROR_MSG);
							self.ownCards.fromAccounts = "";
						}
						else {
							self.ownCards.cardPaymentDetails=self.ownCards.benAccounts[self.ownCards.selectedToBenAccount]['cardPaymentDetails'].toString();
							self.ownCards.beneficiaryAccountNum=rootscope.appLiterals.APP.RAKPAYCARDS.RAKPAYCARDS_AUTHPAGE.BENEFICIARYACCOUNT+self.ownCards.benAccounts[self.ownCards.selectedToBenAccount]['cardNumber'].toString();
							if(self.ownCards.cardPaymentDetails!='' && self.ownCards.cardPaymentDetails!=undefined && self.ownCards.cardPaymentDetails.length >2){
								self.ownCards.showReasonThirdField=false;
							}
							self.ownCards.dummyTxntype="PMT_TRANSFER";
						    // to enable exchange rate fetch
							self.ownCards.isBenfSelected=true;
							if(self.ownCards.selectedBenType==self.CardsBenTypeConstant.WITHINUAE) {
								self.ownCards.fromAccounts = self.ownCards.fromAccountsNCP;
							}
							if(self.ownCards.selectedBenType==self.CardsBenTypeConstant.OUTSIDEUAE) {
								self.ownCards.fromAccounts = self.ownCards.fromAccountsWCP;
							}
						}
					}
					else {
						self.ownCards.cardPaymentDetails=self.ownCards.benAccounts[self.ownCards.selectedToBenAccount]['cardPaymentDetails'].toString();
						self.ownCards.beneficiaryAccountNum=rootscope.appLiterals.APP.RAKPAYCARDS.RAKPAYCARDS_AUTHPAGE.BENEFICIARYACCOUNT+self.ownCards.benAccounts[self.ownCards.selectedToBenAccount]['cardNumber'].toString();
						if(self.ownCards.cardPaymentDetails!='' && self.ownCards.cardPaymentDetails!=undefined && self.ownCards.cardPaymentDetails.length >2){
							self.ownCards.showReasonThirdField=false;
						}
						self.ownCards.dummyTxntype="PMT_TRANSFER";
					    // to enable exchange rate fetch
						self.ownCards.isBenfSelected=true;
					}

				}
			},

			getKeyUp : function() {
				WL.Logger.info("Exchange Rate call credit curr"+self.ownCards.creditCrn + " Debit curr "+self.ownCards.debitCrn);
				self.ownCards.benfUpdatedIndex = Number(self.ownCards.selectedToBenAccount)+1;
				self.ownCards.creditCrn=self.ownCards.selectedRCurr;
				self.common.fromAuthPage=false;
				if(self.ownCards.creditCrn!=undefined && self.ownCards.creditCrn!='' && self.ownCards.creditCrn!=null && self.ownCards.debitCrn!=undefined && self.ownCards.debitCrn!='' && self.ownCards.debitCrn!=null){

				if (self.ownCards.creditCrn!=self.ownCards.debitCrn) {
				    switch(self.ownCards.selectedBenType){

				    case self.CardsBenTypeConstant.WITHINUAE:
				    	self.ownCards.txnType=self.TxnTypeConstant.WITHINUAE;
				    	break;
				    case self.CardsBenTypeConstant.OUTSIDEUAE:
				    	self.ownCards.txnType=self.TxnTypeConstant.OUTSIDEUAE;
				    	break;
				   default:
					   break;


				    }
						scope.setEvent('exchangeRateClick');
						// Added for RAK Dual hit call handling
						rootscope.callInProgress=true;
						self.common.exchangeRateCall=true;
						self.ownCards.isBenfSelected = false;

				}
				}


			},

			getKeyUpForEdit : function() {

				if(jQuery("div.modTxn").find(".ng-dirty").length!=0){
					self.ownCards.isModified = true;
		         }

				WL.Logger.info("Exchange Rate call credit curr"+self.ownCards.creditCrn + " Debit curr "+self.ownCards.debitCrn);
				self.ownCards.benfUpdatedIndex = Number(self.ownCards.selectedToBenAccount)+1;
				self.ownCards.creditCrn=self.ownCards.selectedRCurr;
				self.common.fromAuthPage=false;
				if(self.ownCards.creditCrn!=undefined && self.ownCards.creditCrn!='' && self.ownCards.creditCrn!=null && self.ownCards.debitCrn!=undefined && self.ownCards.debitCrn!='' && self.ownCards.debitCrn!=null){

				if (self.ownCards.creditCrn!=self.ownCards.debitCrn) {
				    switch(self.ownCards.selectedBenType){

				    case self.CardsBenTypeConstant.WITHINUAE:
				    	self.ownCards.txnType=self.TxnTypeConstant.WITHINUAE;
				    	break;
				    case self.CardsBenTypeConstant.OUTSIDEUAE:
				    	self.ownCards.txnType=self.TxnTypeConstant.OUTSIDEUAE;
				    	break;
				   default:
					   break;


				    }
						scope.setEvent('exchangeRateClick');
						// Added for RAK Dual hit call handling
						rootscope.callInProgress=true;
						self.common.exchangeRateCall=true;
						self.ownCards.isBenfSelected = false;

				}
				}


			},

			getEventForTransfer : function() {
				if(self.schedule.schTxnListSubmitBtn=='MODIFY'){
					if(jQuery("div.modTxn").find(".ng-dirty").length==0 && !self.common.fromAuthPage && self.ownCards.isModified == false){
						
						rootscope.showErrorPopup(rootscope.appLiterals.APP.RAKSEND_MONEY.RAKTRANSFER_VIEWSCHEDULE.NOMODIFYERROR);
						return;
			         }
					else{
					self.ownCards.isModified = true;
					}
				}
				self.ownCards.benfUpdatedIndex = Number(self.ownCards.selectedToBenAccount)+1;
				self.utils.populateCurrentDateDetails();
				var eventSel = '';

				switch(self.ownCards.selectedBenType){

			    case self.CardsBenTypeConstant.WITHINUAE:
			    	self.ownCards.txnType=self.TxnTypeConstant.WITHINUAE;
			    	break;
			    case self.CardsBenTypeConstant.OUTSIDEUAE:
			    	self.ownCards.txnType=self.TxnTypeConstant.OUTSIDEUAE;
			    	break;
			   default:
				   break;


			    }
				WL.Logger.info('pay cards Event selection criteria: '
						+ self.ownCards.selectedBenType + ""
						+ self.ownCards.selectedFrequency + ""
						+ self.ownCards.selectedCharges);
				if (self.ownCards.selectedBenType != "undefined"
						&& self.ownCards.selectedFrequency != "undefined") {
					var frequencyType = '';
					frequencyType = self.ownCards.selectedFrequency == 'O' ? "O"
							: "REC";

					switch (self.ownCards.selectedBenType + frequencyType) {

					case self.CardsBenTypeConstant.WITHINUAE+"O":
						eventSel = 'onWithinUAESingleTransfersClick';
						break;

					case self.CardsBenTypeConstant.WITHINUAE+"REC":
						eventSel = 'onWithinUAERecTransfersClick';
						break;
					case self.CardsBenTypeConstant.OUTSIDEUAE+"O":
						eventSel = 'onOutsideUAESingleTransfersClick';
						break;

					case self.CardsBenTypeConstant.OUTSIDEUAE+"REC":
						eventSel = 'onOutsideUAERecTransfersClick';
						break;
					default:
						eventSel = 'onWithinUAESingleTransfersClick';
						break;
					}

					WL.Logger.info('pay cards  event selected' + eventSel);
				}

				return eventSel.toString();
			},
			getAuthConfirmEventForCards: function(){
				var eventSelected='';
				switch(self.ownCards.selectedCardBenfType){

				case self.TxnTypeConstant.OWNCARDS:
					eventSelected="onOwnCardsSubmit";
					break;
				case self.TxnTypeConstant.RAKCARDS:
					eventSelected="onRakCardsSubmit";
					break;
				case self.TxnTypeConstant.PREPAIDCARDS:
					eventSelected="onPrepaidCardsSubmit";
					break;
				default:
					break;
				}
				 return eventSelected;
			},
			getConfirmEventForTransfer : function() {
				self.utils.populateCurrentDateDetails();
				var eventSel = '';

				WL.Logger.info('pay cards Event selection criteria: '
						+ self.ownCards.selectedBenType + ""
						+ self.ownCards.selectedFrequency + ""
						+ self.ownCards.selectedCharges);
				if (self.ownCards.selectedFrequency != "undefined") {
					var frequencyType = '';
					frequencyType = self.ownCards.selectedFrequency == 'O' ? "O"
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

			initFromBenfPage:function(payeeId,bnfType,eventName){

				self.ownCards.payeeId=payeeId;
				self.ownCards.clearFields();




				switch(bnfType){

				case self.CardsBenTypeConstant.RAKCARDS:
					    self.ownCards.selectedCardBenfType=self.TxnTypeConstant.RAKCARDS;
					    self.ownCards.isCardSelected=true;
					    self.ownCards.isCardBenfTypeSelected=true;
					    self.ownCards.selectedBenType=self.CardsBenTypeConstant.RAKCARDS;
				    	self.ownCards.txnType=self.TxnTypeConstant.RAKCARDS;
				    	break;
			    case self.CardsBenTypeConstant.WITHINUAE:
			    	self.ownCards.selectedCardBenfType=self.TxnTypeConstant.WITHINUAE;
			    	self.ownCards.isBenfAccountSelected=true;
			    	self.ownCards.selectedBenType=self.CardsBenTypeConstant.WITHINUAE;
			    	self.ownCards.txnType=self.TxnTypeConstant.WITHINUAE;
			    	break;
			    case self.CardsBenTypeConstant.OUTSIDEUAE:
			    	self.ownCards.selectedCardBenfType=self.TxnTypeConstant.WITHINUAE;
			    	self.ownCards.selectedBenType=self.CardsBenTypeConstant.OUTSIDEUAE;
		    	    self.ownCards.isBenfAccountSelected=true;
			    	self.ownCards.txnType=self.TxnTypeConstant.OUTSIDEUAE;
			    	break;
			    case self.CardsBenTypeConstant.PREPAIDCARDS:
			    	self.ownCards.selectedCardBenfType=self.TxnTypeConstant.PREPAIDCARDS;
			    	self.ownCards.txnType=self.TxnTypeConstant.PREPAIDCARDS;
			    	self.ownCards.isBenfAccountSelected=true;
			    	break;
			    default:
			    	break;

				}

				ActionProcessor.setEvent(eventName).then(function(payload) {
					console.log("Benf call");
					console.log(JSON.stringify(payload));
					var response=payload;
					self.ownCards.selectedRCurr=response.responsesList[0].selectedbenfRemCrn;
					self.ownCards.selectedPPCard=response.responsesList[0].selectedBenfIndex;
					self.ownCards.benAccounts = response.responsesList[0].cardsBenfList;
					self.ownCards.selectedToBenAccount=response.responsesList[0].selectedBenfIndex;
					/* XM Changes Start*/
					 if (response.responsesList[0].hasOwnProperty('isResidentCountryField')) {
						var isResidentCountryField = response.responsesList[0].isResidentCountryField;
						self.ownCards.showResidentCountryField=(isResidentCountryField && isResidentCountryField=='N') ?  'Y' :'N';
					 }
					 
					 if (response.responsesList[0].hasOwnProperty('isResidentCountryWithinUAE')) {
							var isResidentCountryWithinUAE = response.responsesList[0].isResidentCountryField;
							self.ownCards.showUBFResidentCountry=(isResidentCountryWithinUAE && isResidentCountryWithinUAE=='N') ?  'YES' :'NO';
						 }
					 /* XM Changes End*/
					self.ownCards.selectedBenfCard=response.responsesList[0].selectedBenfIndex;
					self.ownCards.creditLimit=response.responsesList[0].availCreditLimit;
					self.ownCards.purpose=response.responsesList[0].purposeListUpdated;
					if(self.ownCards.selectedCardBenfType && self.ownCards.selectedCardBenfType==self.TxnTypeConstant.WITHINUAE){
					self.ownCards.getPurposeList();
					}
					//rootscope.$apply();
					},function(errorPayload){

					});

			},


			initPayNowPage:function(responseList){
				
				if(responseList[0].hasOwnProperty('errorMessage') && responseList[0].hasOwnProperty('errorCode') &&
						(responseList[0].errorCode=='100820' || responseList[0].errorCode=='0000')){
					self.ownCards.errMessage='Y';
					
				}
				else{
					self.ownCards.errMessage='N';
				}
				
				
				if (!responseList[0].hasOwnProperty('errorMessage') && !self.common.fromAuthPage) {
					
					self.ownCards.errMessage='N';

					self.ownCards.amtType = 'M';

					if (responseList[0].hasOwnProperty('message')) {
	     				self.common.successMessage= responseList[0].message;
	     			}

					if(!!responseList[0].transactionPurposeCodeForNBFI){
						self.ownCards.transactionPurposeCodeForNBFI =   responseList[0].transactionPurposeCodeForNBFI;
					}
					
		           if(self.ownCards.selectedCardBenfType!=undefined && self.ownCards.selectedCardBenfType==self.TxnTypeConstant.WITHINUAE){

		        	     if (responseList[0].hasOwnProperty('exchangeRate')) {
		     				self.ownCards.exchangeRate = responseList[0].exchangeRate;
		     				self.ownCards.convertedAmt= responseList[0].convertedAmt;
		     			}
		        	     else if (responseList[0].hasOwnProperty('purposeListUpdated')) {
		     				self.ownCards.purpose = responseList[0].purposeListUpdated;
		     			}
		                 else  {
		     					// getting the TO list for fisrt Loading of Page
		     					self.utils.populateCurrentDateDetails();
		     					self.ownCards.purpose=responseList[0].purposeList;
		     					self.ownCards.benAccounts = responseList[0].cardsBenfList;
		     					/* XM Changes Start*/
		     					if (responseList[0].hasOwnProperty('benfRestCountryList')) {
		     						self.ownCards.benfRestCountryList = responseList[0].benfRestCountryList;
		     					}
		     					/* XM Changes End*/
		     					self.ownCards.ownAccounts = responseList[0].fromAccountsList;
		     					self.ownCards.fromAccounts = responseList[0].fromAccountsList;
		     					self.ownCards.currencyList = responseList[0].currencyList;
		     					self.ownCards.frequencyType = responseList[0].frequencyType;
		     					self.ownCards.promoCode = responseList[0].promoList;
		     					self.ownCards.promoCodeForFT= responseList[0].promoCodeForFT;
		    					self.ownCards.promoCodeForREM= responseList[0].promoCodeForREM;
		     					self.ownCards.charges = responseList[0].chargeList;

		     					self.ownCards.RemcurrencyList = responseList[0].remCurrencyList;
		     					self.ownCards.remitCurrency = responseList[0].remitCurrency;
		     					self.ownCards.remitCrnFilter=responseList[0].remCrnFilter;
		     					self.ownCards.reasonList=responseList[0].reasonList;
		     					/*self.ownCards.subAccountTypeDesc = responseList[0].fromAccountsList.subAccountTypeDesc;*/
		     					self.ownCards.selectedFrequency="O";

		     					//self.alterTxnCurrenyArray();

		     				}
		            }



		            else if(responseList[0].hasOwnProperty('availCreditLimit') && responseList[0].availCreditLimit){
		            	self.ownCards.creditLimit	= responseList[0].availCreditLimit;
					}

		            else{
         //RAK DEV CHANGES FOR PROUAT-741 START
		            	self.ownCards.lastStatmentBalanceDisplaying=responseList[0].lastStatmentBalanceDisplaying;
		            	self.ownCards.minAmountDueDisplaying=responseList[0].minAmountDueDisplaying;
		//RAK DEV CHANGES FOR PROUAT-741 END
		            	self.ownCards.lastStatmentBalanceDisplay=responseList[0].lastStatmentBalance;
		            	self.ownCards.lastStatmentBalance=responseList[0].lastStatmentBalance;
						self.ownCards.currentBalance=responseList[0].currentBalance;
						self.ownCards.minAmountDue=responseList[0].minAmountDue;
						self.ownCards.minAmountDueDisplay=responseList[0].minAmountDue;
						self.ownCards.totAmountDue=responseList[0].totAmountDue;
						self.ownCards.paymentDueDate=responseList[0].paymentDueDate;
						self.ownCards.siAmt=responseList[0].siAmt;;
						self.ownCards.siDate=responseList[0].siDate;;
						self.ownCards.siStatusDisplay=responseList[0].siStatusDesc;
						self.ownCards.siStatus=responseList[0].siStatus;
						self.ownCards.minAmtTab=true;
						if(self.ownCards.selectedCardBenfType && self.ownCards.minAmountDue && (self.ownCards.selectedCardBenfType==self.TxnTypeConstant.OWNCARDS || self.ownCards.selectedCardBenfType==self.TxnTypeConstant.RAKCARDS)){
							self.ownCards.amount= Number(self.ownCards.minAmountDue);
							 if(self.ownCards.selectedCardBenfType==self.TxnTypeConstant.RAKCARDS)
							{
								 self.ownCards.amount='';
							}
						}

					//	self.ownCards.isCardSelected=true;

		            }


		           // Added below

		           if(responseList[0].hasOwnProperty('fromAccountsList')){
		            	self.ownCards.ownCardsList = responseList[0].ownCardsList;
						self.ownCards.fromAccounts = responseList[0].fromAccountsList;
						self.ownCards.fromAccountsNCP = responseList[0].fromAccountsListNCP;
						self.ownCards.fromAccountsWCP = responseList[0].fromAccountsListWCP;
						self.ownCards.cardsBenfList = responseList[0].cardsBenfList;
						self.ownCards.frequencyType = responseList[0].frequencyType;
						self.ownCards.isBenfAccountSelected=true;
						self.ownCards.isCardBenfTypeSelected=true;
		            }

		            if(responseList[0].hasOwnProperty('benfTypeList') ){
		            	self.ownCards.benfTypeList	= responseList[0].benfTypeList;
					}

		           //for pay cards schedule
		           if(responseList[0].hasOwnProperty('benfTypeList') ){
		            	self.ownCards.benfTypeList	= responseList[0].benfTypeList;
					}


		           if(responseList[0].selectedTxnType=='')
		          		{
		          	self.ownCards.selectedCardBenfType =responseList[0].benfTypeList[0].benfDesc;
		          	}

			}

			},

			//RAK DEV added for changing event on basis of mainaccountype start
			getPayEvent : function(responseList) {
				if(self.ownCards.fromAccounts[self.ownCards.selectedFromAccount]['mainAccountType'].toString()=='OPR')
					{
					  return 'onNonRakAccountSelectionBalCall';
					}
				else if(self.ownCards.fromAccounts[self.ownCards.selectedFromAccount]['mainAccountType'].toString()=='CCD')
					{
					  return 'onNonRakAccountSelectionBalCardCall';
					}
			},
			//RAK DEV added for changing event on basis of mainaccountype start

			// RAk Added for confirmation page init
			reSubmitAuth:function(responseList){
				if(!responseList[0].hasOwnProperty('errorMessage') && rootScope.rakCorpInit.corpModel.backFlag !='Y'){
				self.ownCards.selectedPurposeDisp=responseList[0].selectedReason;
				}
			},
			initAuthPage : function(responseList) {

				if (!responseList[0].hasOwnProperty('errorMessage') && rootScope.rakCorpInit.corpModel.backFlag !='Y') {
					self.common.transactionDate = self.common.displayDate
							.toLocaleDateString();// responseList[0].txnDate;

					self.common.fromDisplayString = responseList[0].fromAccountId;
					self.common.toDisplayString = responseList[0].beneficaryNickName;
					if(responseList[0].hasOwnProperty('beneficaryName')) {
						self.common.beneficaryName = responseList[0].beneficaryName;
					}
					self.common.toCardId = responseList[0].toCardId;
					
					if(responseList[0].hasOwnProperty('TOTAL_TXN_AMT_DISPLAY')){
						self.common.amount = responseList[0].TOTAL_TXN_AMT_DISPLAY;
					}
					else{
						self.common.amount = responseList[0].entryAMT;
					}
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
					self.common.balCheck = responseList[0].balCheck;
					self.common.lastStatmentBal= responseList[0].lastStatmentBalanceDisplay;
					self.common.currentBal= responseList[0].currentBalanceDisplay;
					self.common.minAmtDue= responseList[0].minAmountDueDisplay;
					self.common.paymentDueDate=responseList[0].paymentDueDate;
					self.common.creditAmt = responseList[0].CREDIT_AMOUNT;
					self.common.chargeAmt = responseList[0].CHARGE_AMOUNT;
					self.common.reason = responseList[0].remarks;
					self.common.reason1 = responseList[0].REASON1;
					self.common.reason2 = responseList[0].REASON2;
					self.common.reason3 = responseList[0].REASON3;
					self.common.message=responseList[0].MESSAGE;
					/* XM Changes Start*/
					if(responseList[0].hasOwnProperty('beneficiaryResidentCountryDisplay')){
						self.common.beneficiaryResidentCountryDisplay = responseList[0].beneficiaryResidentCountryDisplay;
					}
					/* XM Changes End*/

					self.common.selectedReason = responseList[0].selectedReason;
					self.common.selectedReason1 = responseList[0].selectedReason1;
					self.common.selectedReason2 = responseList[0].selectedReason2;
					self.common.selectedReason3 = responseList[0].selectedReason3;

				    if(self.schedule.schTxnListSubmitBtn && self.schedule.schTxnListSubmitBtn=='MODIFY')	{
				    	self.common.message=self.common.message && self.common.message.substring(self.common.message.lastIndexOf(".")+1) ? self.common.message.substring(self.common.message.lastIndexOf(".")+1) : self.common.message;
				    }

					self.common.beneficiaryAccountNumber=responseList[0].beneficiaryAccountNumber;

					self.common.exchangeRate= responseList[0].EFFECTIVERATE;
					self.common.convertedAmt= responseList[0].CONVERTEDAMT;
					self.common.selpromocode=responseList[0].PROMOCODESEL;
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

			initPPCardAuthPage : function(responseList) {

				self.common.reason = self.ownCards.reason;

				if (!responseList[0].hasOwnProperty('errorMessage') &&  rootScope.rakCorpInit.corpModel.backFlag !='Y') {
					self.common.transactionDate = self.common.displayDate
							.toLocaleDateString();// responseList[0].txnDate;

					self.common.fromDisplayString = responseList[0].fromAccountId;
					self.common.toDisplayString = responseList[0].beneficaryNickName;
					self.common.amount = responseList[0].entryAMT;
					self.common.transactionDate = responseList[0].txnDate;
					self.common.txnType = responseList[0].txnType;
					self.common.frequencyType = responseList[0].recFreq;
					self.common.beneficaryNickName = responseList[0].beneficaryNickName;
					self.common.balCheck = responseList[0].balCheck;
					self.common.currency = responseList[0].txnCurrency;
					self.common.noOfTransfer = responseList[0].recNoInstall;
					self.common.beneficiaryAccountNumber = responseList[0].beneficiaryAccountNumber;
					self.common.message=responseList[0].MESSAGE;
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
			//Commenting for testing
			getAuthConfirmEvent : function() {
				var eventSel = '';

				if (self.ownCards.selectedBenType != "undefined"
						&& self.ownCards.selectedFrequency != "undefined") {
				if(self.schedule.schTxnListSubmitBtn=='MODIFY' && rootScope.rakPendingApproval.pendingApprovalTab!='PIA'){
					eventSel = 'onConfirmModifyTransferClick';
				}
				else if(self.schedule.schTxnListSubmitBtn=='MODIFY' && rootScope.rakPendingApproval.pendingApprovalTab=='PIA'){
					eventSel = 'onConfirmModifyIncompTransferClick';
				}
				else if(self.schedule.schTxnListSubmitBtn=='SUBMIT'){
					eventSel = 'onConfirmSubmitIncompTransferClick';
				}
				else
				{
					var frequencyType = '';
					frequencyType = self.ownCards.selectedFrequency == 'O' ? "O"
							: "REC";

					switch (self.ownCards.selectedBenType + frequencyType) {


					case self.CardsBenTypeConstant.WITHINUAE+"O":
						eventSel = 'onWithinUAESingleTransfersConfirm';
						break;

					case self.CardsBenTypeConstant.WITHINUAE+"REC":
						eventSel = 'onWithinUAERecSelfTransfersConfirm';
						break;

					case self.CardsBenTypeConstant.OUTSIDEUAE+"O":
						eventSel = 'onOutsideUAESingleTransfersConfirm';
						break;

					case self.CardsBenTypeConstant.OUTSIDEUAE+"REC":
						eventSel = 'onOutsideUAERecSelfTransfersConfirm';
						break;
					default:
						break;
					}
					}
					WL.Logger.info('Pay Cards auth Confirm submit' + eventSel);
				}

				return eventSel.toString();
			},

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

			
			onRakCardSelCall:function(){
				if(self.ownCards.selectedBenfCard){
				scope.setEvent('onBenfCardSelected');
				}
			},
			onPrepaidSelCall:function(){
				if(self.ownCards.selectedPPCard){
					scope.setEvent('onPPCardSelected');
				}
			},
			
			
			initSendAgainPage: function(responseList){
				// if(self.ownCards.fromSearch==true){
		        	  // self.ownCards.fromSearch=false;
				
				if(responseList[0].hasOwnProperty('errorMessage') && responseList[0].hasOwnProperty('errorCode') &&
						(responseList[0].errorCode=='100820' || responseList[0].errorCode=='0000')){
					self.ownCards.errMessage='Y';
					
				}
				else{
					self.ownCards.errMessage='N';
				}
				if (!responseList[0].hasOwnProperty('errorMessage') && !self.common.fromAuthPage) {
					
					self.ownCards.errMessage='N';

					if(self.ownCards.selectedCardBenfType=='All'){
						self.ownCards.selectedCardBenfType = rootscope.rakPayee.payCard.selectedCompltTxn.txnType;
					}
					   if (responseList[0].hasOwnProperty('exchangeRate')) {
						   
						   self.ownCards.exchangeRate = responseList[0].exchangeRate;
						   self.ownCards.convertedAmt = responseList[0].convertedAmt;
							
						}
					
					if (responseList[1]  && responseList[1].hasOwnProperty('installments') && responseList[1].installments!=1) {
						 self.ownCards.noOfTransfer = Number(responseList[1].installments);
       				}

					
					 if (responseList[1] && responseList[1].hasOwnProperty('recFreq')) {
		     				self.ownCards.payAgainRecFreq = responseList[1].recFreq;
		     			}
					self.ownCards.reason = responseList[0].entRemarks;
					//added for remarks
					if(self.ownCards.selectedCardBenfType==self.TxnTypeConstant.WITHINUAE ||self.ownCards.selectedCardBenfType==self.TxnTypeConstant.OUTSIDEUAE){
						if(!responseList[0].hasOwnProperty('exchangeRate')){
					self.ownCards.selectedReason=responseList[0].SELECTEDREASON;
				    self.ownCards.selectedReason1=responseList[0].ENTEREDREASON1;
				    self.ownCards.selectedReason2=responseList[0].ENTEREDREASON2;
				    self.ownCards.selectedReason3=responseList[0].ENTEREDREASON3;
						}
					}

					//self.ownCards.selectedCardBenfType = self.rootscope.rakPayee.payCard.selectedCardType;
					if(self.ownCards.selectedCardBenfType==self.TxnTypeConstant.OUTSIDEUAE)
						self.ownCards.selectedCardBenfType = self.TxnTypeConstant.WITHINUAE;


					if(self.ownCards.fromSearch==true){
						self.ownCards.fromSearch=false;
						if(self.ownCards.selectedCardBenfType!=undefined && self.ownCards.selectedCardBenfType==self.TxnTypeConstant.WITHINUAE){

			        	     if (responseList[0].hasOwnProperty('exchangeRate')) {
			     				self.ownCards.exchangeRate = responseList[0].exchangeRate;
			     			}
			        	     else if (responseList[0].hasOwnProperty('purposeListUpdated')) {
				     				self.ownCards.purpose = responseList[0].purposeListUpdated;
				     			}
			                 else  {
			     					// getting the TO list for fisrt Loading of Page
			     					self.utils.populateCurrentDateDetails();

			     					self.ownCards.benAccounts = responseList[0].cardsBenfList;
			     					/* XM Changes Start*/
			     					if (responseList[0].hasOwnProperty('benfRestCountryList')) {
			     						self.ownCards.benfRestCountryList = responseList[0].benfRestCountryList;
			     					}
			     					/* XM Changes End*/
			     					self.ownCards.ownAccounts = responseList[0].fromAccountsList;
			     					self.ownCards.fromAccounts = responseList[0].fromAccountsList;
			     					self.ownCards.currencyList = responseList[0].currencyList;
			     					self.ownCards.frequencyType = responseList[0].frequencyType;
			     					self.ownCards.promoCode = responseList[0].promoList;
			     					self.ownCards.charges = responseList[0].chargeList;
			     					self.ownCards.purpose = responseList[0].purposeList;
			     					self.ownCards.promoCodeForFT= responseList[0].promoCodeForFT;
			    					self.ownCards.promoCodeForREM= responseList[0].promoCodeForREM;
			    					self.ownCards.promoCode=[];
                                    self.ownCards.promoCode= self.ownCards.promoCodeForREM;
			    					
			     					self.ownCards.RemcurrencyList = responseList[0].remCurrencyList;
			     					self.ownCards.remitCurrency = responseList[0].remitCurrency;
			     					self.ownCards.remitCrnFilter=responseList[0].remCrnFilter;
			     					self.ownCards.reasonList=responseList[0].reasonList;
			     					/*self.ownCards.subAccountTypeDesc = responseList[0].fromAccountsList.subAccountTypeDesc;*/
			     					self.ownCards.selectedFrequency="O";

			     				}
			            }
			            if(responseList[0].hasOwnProperty('fromAccountsList')){
			            	self.ownCards.ownCardsList = responseList[0].ownCardsList;
							self.ownCards.fromAccounts = responseList[0].fromAccountsList;
							//Access level 
							self.ownCards.fromAccountsNCP = responseList[0].fromAccountsListNCP;
							self.ownCards.fromAccountsWCP = responseList[0].fromAccountsListWCP;
							self.ownCards.cardsBenfList = responseList[0].cardsBenfList;
							self.ownCards.frequencyType = responseList[0].frequencyType;
							self.ownCards.isBenfAccountSelected=true;
			            }
			            if(responseList.length>1 && responseList[1].hasOwnProperty('benfTypeList') ){
			            	self.ownCards.benfTypeList	= responseList[1].benfTypeList;
						}
			            if(self.rootscope.rakPayee.payCard.selectedCompltTxn!='' && self.rootscope.rakPayee.payCard.selectedCompltTxn!=null){
						  self.ownCards.selectedTxn = self.rootscope.rakPayee.payCard.selectedCompltTxn;
				          if(self.ownCards.benAccounts!='' && self.ownCards.benAccounts!=null){
						        for(var temp in self.ownCards.benAccounts){
				  					if(self.ownCards.benAccounts[temp].cardbeneficiaryNickName==self.ownCards.selectedTxn.toAccount){
				  						self.ownCards.selectedToBenAccount=self.ownCards.benAccounts[temp].cardIndex;
										/* XM Changes Start*/
				  						var residentCountryAvailable =self.ownCards.benAccounts[temp].benefResidentCountryAvailable;
				  						if(residentCountryAvailable && residentCountryAvailable=='N'){
				  							self.ownCards.showResidentCountryField = 'Y';
				  						}else{
				  							self.ownCards.showResidentCountryField = 'N';
				  						}
				  						
				  					
				  					
										/* XM Changes End*/
				  						break;
				  					}
				  				}

						        if (self.ownCards.selectedToBenAccount != "") {
									self.ownCards.selectedBenType = self.ownCards.benAccounts[self.ownCards.selectedToBenAccount]['cardBeneficiaryType'].toString();
									self.ownCards.cardPaymentDetails=self.ownCards.benAccounts[self.ownCards.selectedToBenAccount]['cardPaymentDetails'].toString();
									if(self.ownCards.cardPaymentDetails!='' && self.ownCards.cardPaymentDetails!=undefined && self.ownCards.cardPaymentDetails.length >2){
										self.ownCards.showReasonThirdField=false;
									}
									self.ownCards.dummyTxntype="PMT_TRANSFER";
								    // to enable exchange rate fetch
									self.ownCards.isBenfSelected=true;

								}
				          }
					          if(self.ownCards.ownCardsList!='' && self.ownCards.ownCardsList!=''){
							          for(var temp in self.ownCards.ownCardsList){
						  					if(self.ownCards.ownCardsList[temp].unmaskedCardNumber==self.ownCards.selectedTxn.cpEntityId){
						  						self.ownCards.selectedOwnCard=self.ownCards.ownCardsList[temp].cardIndex;
						  						break;
						  					}
						  				}

							          //scope.setEvent('onCardSelected');
					          }

					          if(self.ownCards.cardsBenfList!='' && self.ownCards.cardsBenfList!=''){
						          for(var temp in self.ownCards.cardsBenfList){
					  					if(self.ownCards.cardsBenfList[temp].cardbeneficiaryNickName==self.ownCards.selectedTxn.toAccount){
					  						self.ownCards.selectedPPCard=self.ownCards.cardsBenfList[temp].cardIndex;
					  						self.ownCards.selectedBenfCard=self.ownCards.cardsBenfList[temp].cardIndex;
					  						break;
					  					}
					  				}
					          }

				          if (responseList[0].hasOwnProperty('initorId')) {
								self.schedule.initAcc = responseList[0].initorId;
							}

					        for(var temp in self.ownCards.fromAccounts){
			  					if(self.ownCards.fromAccounts[temp].accountNumber==self.schedule.initAcc){
			  						self.ownCards.selectedFromAccount=self.ownCards.fromAccounts[temp].accountIndex;
			  						break;
			  					}
			  				}

					        self.common.updateBal('onNonRakAccountSelectionBalCall');
					        //scope.setEvent('''');
					        if(self.ownCards.benAccounts!='' && self.ownCards.benAccounts!=null){
								var benfCountry=self.ownCards.benAccounts[self.ownCards.selectedToBenAccount]['cardBeneficiaryCountry'].toString();

								for(var temp in self.ownCards.remitCrnFilter){
									if(benfCountry==self.ownCards.remitCrnFilter[temp]['filterCode']){

										self.ownCards.selectedRCurr=self.ownCards.remitCrnFilter[temp]['filterDesc'];
										self.ownCards.creditCrn=self.ownCards.selectedRCurr;
										break;
									}
								}
					        }

							self.ownCards.selectedCurrency = self.ownCards.selectedTxn.txnCurrency;
							self.ownCards.debitCrn=self.ownCards.selectedCurrency;

							 if(self.ownCards.currencyList!='' && self.ownCards.currencyList!=null){
								self.ownCards.txnCurrencyArray=[];
								for(var temp in self.ownCards.currencyList){
									if(self.ownCards.currencyList[temp]['currencyCode']==self.ownCards.debitCrn || self.ownCards.currencyList[temp]['currencyCode']==self.ownCards.creditCrn){
										self.ownCards.txnCurrencyArray.push(self.ownCards.currencyList[temp]);
									}

								}
							 }

							 self.ownCards.selectedRCurr=self.ownCards.remitCurrency ?  self.ownCards.remitCurrency :self.ownCards.selectedRCurr;

							 if(self.ownCards.RemcurrencyList!='' && self.ownCards.RemcurrencyList!=null){
								for(var temp in self.ownCards.RemcurrencyList){
				  					if(self.ownCards.RemcurrencyList[temp].currencyCode==self.ownCards.selectedRCurr){
				  						self.ownCards.selectedRCurr=self.ownCards.RemcurrencyList[temp].currencyCode;
				  						break;
				  					}
				  				}
							 }
                            // Added to replace commas in selected amount . This helps in prepopulating the amount field.
							self.ownCards.selectedTxn.txnAmount=self.ownCards.selectedTxn.txnAmount && self.ownCards.selectedTxn.txnAmount.indexOf(",") ? self.ownCards.selectedTxn.txnAmount.replace(/,/g,"") : self.ownCards.selectedTxn.txnAmount;
							self.ownCards.amount = Number(self.ownCards.selectedTxn.txnAmount);
							//self.common.displayDate = new Date(self.ownCards.selectedTxn.txnDate);

							if(self.ownCards.frequencyType!='' && self.ownCards.frequencyType!=null){
								for(var temp in self.ownCards.frequencyType){
				  					if(self.ownCards.frequencyType[temp].frequencyTypeCode==self.ownCards.payAgainRecFreq){
				  						self.ownCards.selectedFrequency=self.ownCards.frequencyType[temp].frequencyTypeCode;
				  						break;
				  					}
				  				}
							}

							// for handling pre selection of purpose , charges remarks drop down and entered remarks

							    self.ownCards.selectedCharges=responseList[0].SELECTEDCHARGES;
								self.ownCards.selectedPurpose=responseList[0].SELECTEDPURPOSE;
						        self.ownCards.selectedReason=responseList[0].SELECTEDREASON;
						        self.ownCards.selectedReason1=responseList[0].ENTEREDREASON1;
						        self.ownCards.selectedReason2=responseList[0].ENTEREDREASON2;
						        self.ownCards.selectedReason3=responseList[0].ENTEREDREASON3;

						        if(self.ownCards.benAccounts){
							        for(var temp in self.ownCards.benAccounts){
					  					if(self.ownCards.benAccounts[temp].cardbeneficiaryNickName==self.ownCards.selectedTxn.toAccount){
											/* XM Changes Start*/
					  					
					  						
					  						var benType = self.ownCards.benAccounts[temp]['cardBeneficiaryType'].toString();
					  						 var withinUAEBenfCountryAvailable = self.ownCards.benAccounts[temp]['withinUAEBenfCountryAvailable'];
					  						 self.ownCards.withinUAEBenfCountryAvailable= withinUAEBenfCountryAvailable ;
					  						 
					  						 if (benType == 'UCC' && self.ownCards.selectedRCurr && self.ownCards.selectedRCurr != "AED" && withinUAEBenfCountryAvailable && withinUAEBenfCountryAvailable=='N') {
					  							 self.ownCards.showUBFResidentCountry = "YES";
					  						 } else{
					  							 self.ownCards.showUBFResidentCountry = "NO";
					  						 }
					  					
											/* XM Changes End*/
					  						break;
					  					}
					  				}

							      
					          }


						    	if(self.ownCards.selectedBenType==self.CardsBenTypeConstant.WITHINUAE){
						    								if(self.ownCards.cardPaymentDetails && self.ownCards.cardPaymentDetails.length >4 && self.ownCards.cardPaymentDetails.indexOf('|')==-1){
						    									self.ownCards.selectedPurpose= self.ownCards.transactionPurposeCodeForNBFI;
						    									if(rootScope.dashboard.userType=='1'){							
						    										self.ownCards.selectedPurposeDisp="Credit Card Payments";
						    										self.ownCards.selectedReason="CRP";
						    									}
						    									else {
						    										self.ownCards.selectedPurposeDisp="Corporate Card Payment";
						    										self.ownCards.selectedReason="CCP";
						    									}
						    									
						    								}
						    								else{

						    									if(rootScope.dashboard.userType=='1'){
						    										self.ownCards.selectedPurpose="CRP";
						    										self.ownCards.selectedReason="CRP";
						    										self.ownCards.selectedPurposeDisp="Credit Card Payments";
						    									}
						    									else {
						    										self.ownCards.selectedPurpose="CCP";
						    										self.ownCards.selectedReason="CCP";
						    										self.ownCards.selectedPurposeDisp="Corporate Card Payment";
						    									}
						    								}
						    								
						    								}
								//self.ownCards.selectedPurposeDisp=self.ownCards.selectedPurpose=="CRP" ? "Credit Card Payments" : self.ownCards.selectedPurpose==self.ownCards.transactionPurposeCodeForNBFI ?  "Remittance" : "" ;

					}

							if(responseList[0].hasOwnProperty('availCreditLimit') ){
				            	self.ownCards.creditLimit	= responseList[0].availCreditLimit;
							}


				            if(self.ownCards.selectedCardBenfType!=undefined && self.ownCards.selectedCardBenfType==self.TxnTypeConstant.OWNCARDS)	{
				            	self.ownCards.lastStatmentBalanceDisplay=responseList[0].lastStatmentBalance.indexOf("-") > -1 ? (responseList[0].lastStatmentBalance).replace("-","") :responseList[0].lastStatmentBalance;
				            	self.ownCards.lastStatmentBalance=rootscope.appLiterals.APP.RAKPAYCARDS.RAKPAYCARDSINITPAGE.LASTSTATEMENT+" "+(responseList[0].lastStatmentBalance.indexOf("-") > -1 ? (responseList[0].lastStatmentBalance).replace("-","") :responseList[0].lastStatmentBalance);
								self.ownCards.currentBalance=rootscope.appLiterals.APP.RAKPAYCARDS.RAKPAYCARDSINITPAGE.CURRBAL+" "+(responseList[0].currentBalance.indexOf("-") > -1 ? (responseList[0].currentBalance).replace("-","") :responseList[0].currentBalance);
								self.ownCards.minAmountDue=responseList[0].minAmountDue.indexOf("-") > -1 ? (responseList[0].minAmountDue).replace("-","") :responseList[0].minAmountDue;
								self.ownCards.minAmountDueDisplay=rootscope.appLiterals.APP.RAKPAYCARDS.RAKPAYCARDSINITPAGE.MINAMTDUE+" "+(responseList[0].minAmountDue.indexOf("-") > -1 ? (responseList[0].minAmountDue).replace("-","") :responseList[0].minAmountDue);
								self.ownCards.totAmountDue=responseList[0].totAmountDue;
								self.ownCards.paymentDueDate=rootscope.appLiterals.APP.RAKPAYCARDS.RAKPAYCARDSINITPAGE.PAYMENTDUEDATE+" "+responseList[0].paymentDueDate;
								self.ownCards.siAmt=rootscope.appLiterals.APP.RAKPAYCARDS.RAKPAYCARDSINITPAGE.STANDINGINSTRAMT+" "+responseList[0].siAmt;;
								self.ownCards.siDate=rootscope.appLiterals.APP.RAKPAYCARDS.RAKPAYCARDSINITPAGE.STANDINGINSTRDATE+" "+responseList[0].siDate;;
								self.ownCards.siStatusDisplay=rootscope.appLiterals.APP.RAKPAYCARDS.RAKPAYCARDSINITPAGE.Status+" "+responseList[0].siStatusDesc;
								self.ownCards.siStatus=responseList[0].siStatus;
								self.ownCards.minAmtTab=true;
								if(self.ownCards.selectedCardBenfType!=undefined && self.ownCards.selectedCardBenfType==self.TxnTypeConstant.OWNCARDS)
									self.ownCards.amount= self.ownCards.minAmountDue.toString();
								self.ownCards.ownamount= Number(self.ownCards.selectedTxn.txnAmount);
								//added for reason

								self.ownCards.reason = responseList[0].entRemarks;
								if(self.ownCards.ownamount){
									self.ownCards.minAmtTab=false;
									self.ownCards.othAmtTab=true;
								}
								else{
									self.ownCards.othAmtTab=false;
								}

				            }
							//self.ownCards.isCardSelected=true;
					}
					else{


			            if(responseList[0].hasOwnProperty('availCreditLimit') ){
			            	self.ownCards.creditLimit	= responseList[0].availCreditLimit;
						}


			            if(self.ownCards.selectedCardBenfType!=undefined && self.ownCards.selectedCardBenfType==self.TxnTypeConstant.OWNCARDS)	{
			            	self.ownCards.lastStatmentBalanceDisplay=responseList[0].lastStatmentBalance;
			            	self.ownCards.lastStatmentBalance=rootscope.appLiterals.APP.RAKPAYCARDS.RAKPAYCARDSINITPAGE.LASTSTATEMENT+" "+responseList[0].lastStatmentBalance;
							self.ownCards.currentBalance=rootscope.appLiterals.APP.RAKPAYCARDS.RAKPAYCARDSINITPAGE.CURRBAL+" "+responseList[0].currentBalance;
							self.ownCards.minAmountDue=responseList[0].minAmountDue;
							self.ownCards.minAmountDueDisplay=rootscope.appLiterals.APP.RAKPAYCARDS.RAKPAYCARDSINITPAGE.MINAMTDUE+" "+responseList[0].minAmountDue;
							self.ownCards.totAmountDue=responseList[0].totAmountDue;
							self.ownCards.paymentDueDate=rootscope.appLiterals.APP.RAKPAYCARDS.RAKPAYCARDSINITPAGE.PAYMENTDUEDATE+" "+responseList[0].paymentDueDate;
							self.ownCards.siAmt=rootscope.appLiterals.APP.RAKPAYCARDS.RAKPAYCARDSINITPAGE.STANDINGINSTRAMT+" "+responseList[0].siAmt;;
							self.ownCards.siDate=rootscope.appLiterals.APP.RAKPAYCARDS.RAKPAYCARDSINITPAGE.STANDINGINSTRDATE+" "+responseList[0].siDate;;
							self.ownCards.siStatusDisplay=rootscope.appLiterals.APP.RAKPAYCARDS.RAKPAYCARDSINITPAGE.Status+" "+responseList[0].siStatusDesc;
							self.ownCards.siStatus=responseList[0].siStatus;
							self.ownCards.minAmtTab=true;

							self.ownCards.reason = responseList[0].entRemarks;
							if(self.ownCards.selectedCardBenfType!=undefined && self.ownCards.selectedCardBenfType==self.TxnTypeConstant.OWNCARDS)
								self.ownCards.amount= self.ownCards.minAmountDue.toString();
							self.ownCards.ownamount= Number(self.ownCards.selectedTxn.txnAmount);
			            }
						self.ownCards.isCardSelected=true;
					}

		           }

				//}
			}


	};





	// Added for RAK SendMoney Landing Page//
	self.nonRakPayCards = {
		selectedBenType : "",
		beneficaryTypes : [],
		selectedFromAccount : "",
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
		charges : [],
		purpose : [],
		purposeListUpdated : [],
		selectedCharges : "",
		selectedPurpose : "",
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
		reasonList:[],
		selectedReason:'',
		selectedReason1:'',
		selectedReason2:'',
		selectedReason3:'',
		benfUpdatedIndex:'',

		clearSelfTransfersData : function() {
			self.nonRakPayCards.selectedBenType = '';
			self.nonRakPayCards.beneficaryTypes = '';
			self.nonRakPayCards.selectedFromAccount = '';
			self.nonRakPayCards.selectedToAccount = '';
			self.nonRakPayCards.selectedToBenAccount = '';
			self.nonRakPayCards.ownAccounts = [];
			self.nonRakPayCards.benAccounts = [];
			self.nonRakPayCards.fromAccounts = [];
			self.nonRakPayCards.currencyList = [];
			self.nonRakPayCards.selectedCurrency = '';
			self.nonRakPayCards.frequencyType = '';
			self.nonRakPayCards.selectedFrequency = '';
			self.nonRakPayCards.amount = '';
			self.nonRakPayCards.noOfTransfer = "";
			self.nonRakPayCards.reason = "";
			self.nonRakPayCards.selectedpromoCode = '';
			self.nonRakPayCards.promoCode = '';
			self.nonRakPayCards.eligibleAmount = '';
			self.nonRakPayCards.beneficiaryList = [];
			self.nonRakPayCards.beneficiaryNickName = '';
			self.nonRakPayCards.beneficiaryAccountNumber = '';
			self.nonRakPayCards.beneficiaryIndex = '';
			self.nonRakPayCards.frequencyTypeDesc = '';
			self.nonRakPayCards.charges = [];
			self.nonRakPayCards.purpose = [];
			self.nonRakPayCards.purposeListUpdated = '';
			self.nonRakPayCards.selectedCharges = '';
			self.nonRakPayCards.selectedPurpose = '';
			self.nonRakPayCards.RemcurrencyList = [];
			self.nonRakPayCards.selectedRCurr = '';
			self.nonRakPayCards.subAccountTypeDesc = '';
			self.nonRakPayCards.transactionType = '';
			self.nonRakPayCards.availBal = '';
			self.nonRakPayCards.exchangeRate='';
			self.nonRakPayCards.dummyTxntype='';
			self.nonRakPayCards.debitCrn='';
			self.nonRakPayCards.creditCrn='';
			self.nonRakPayCards.txnType='';
			self.nonRakPayCards.remitCrnFilter=[];
			self.nonRakPayCards.reasonList=[];
			self.nonRakPayCards.selectedReason='';
			self.nonRakPayCards.selectedReason1="";
			self.nonRakPayCards.selectedReason2="";
			self.nonRakPayCards.selectedReason3="";
			self.nonRakPayCards.txnCurrencyArray=null;
			self.nonRakPayCards.benfUpdatedIndex=null;

		},

		getStaticText : function() {

			if (self.nonRakPayCards.selectedCharges == 'ALL20') {
				self.nonRakPayCards.isAll = true;
			} else {
				self.nonRakPayCards.isAll = false;
			}
		},

		getPurposeList : function() {

			if (self.nonRakPayCards.selectedToBenAccount != undefined) {

				var benType = self.nonRakPayCards.benAccounts[self.nonRakPayCards.selectedToBenAccount]['cardBeneficiaryType']
						.toString();

				if (benType == 'UCC') {
					rootscope.setEvent('getPurposeListService');
				}
			}
		},

		getDefaultTransCurr : function() {
			if (self.nonRakPayCards.selectedToBenAccount != undefined) {
			if (self.nonRakPayCards.selectedFromAccount != undefined) {
				self.nonRakPayCards.selectedCurrency = self.nonRakPayCards.fromAccounts[self.nonRakPayCards.selectedFromAccount]['currencyCode']
						.toString();
				self.nonRakPayCards.debitCrn=self.nonRakPayCards.selectedCurrency;

			}
			}
		},

		filterCurrencyArray: function(){
			self.nonRakPayCards.txnCurrencyArray=[];
			if (self.nonRakPayCards.selectedToBenAccount != undefined) {
				var benfCountry=self.nonRakPayCards.benAccounts[self.nonRakPayCards.selectedToBenAccount]['cardBeneficiaryCountry'].toString();
				var benType = self.nonRakPayCards.benAccounts[self.nonRakPayCards.selectedToBenAccount]['cardBeneficiaryType'].toString();



				for(var temp in self.nonRakPayCards.remitCrnFilter){
					if(benfCountry==self.nonRakPayCards.remitCrnFilter[temp]['filterCode']){
						self.nonRakPayCards.creditCrn=self.nonRakPayCards.selectedRCurr;
						//alert(self.nonRakPayCards.creditCrn);
						break;
					}
				}
			}


			if (self.nonRakPayCards.selectedFromAccount != undefined) {
				self.nonRakPayCards.selectedCurrency = self.nonRakPayCards.fromAccounts[self.nonRakPayCards.selectedFromAccount]['currencyCode']
						.toString();
				self.nonRakPayCards.debitCrn=self.nonRakPayCards.selectedCurrency;

			}

			for(var temp in self.nonRakPayCards.currencyList){
				if(self.nonRakPayCards.currencyList[temp]['currencyCode']==self.nonRakPayCards.debitCrn || self.nonRakPayCards.currencyList[temp]['currencyCode']==self.nonRakPayCards.creditCrn){
					self.nonRakPayCards.txnCurrencyArray.push(self.nonRakPayCards.currencyList[temp]);
				}

			}

		},



		getRemCurrencyPrepopulate:function(){
			if (self.nonRakPayCards.selectedToBenAccount != undefined && self.nonRakPayCards.selectedToBenAccount!=0) {
			var benfCountry=self.nonRakPayCards.benAccounts[self.nonRakPayCards.selectedToBenAccount]['cardBeneficiaryCountry'].toString();
			var benType = self.nonRakPayCards.benAccounts[self.nonRakPayCards.selectedToBenAccount]['cardBeneficiaryType'].toString();

			for(var temp in self.nonRakPayCards.remitCrnFilter){
				if(benfCountry==self.nonRakPayCards.remitCrnFilter[temp]['filterCode']){

					self.nonRakPayCards.selectedRCurr=self.nonRakPayCards.remitCrnFilter[temp]['filterDesc'];
					self.nonRakPayCards.creditCrn=self.nonRakPayCards.selectedRCurr;
					break;
				}

		}
			}

		},


		getEventForBenf : function() {
			if (self.nonRakPayCards.selectedToBenAccount != "") {

				self.nonRakPayCards.selectedBenType = self.nonRakPayCards.benAccounts[self.nonRakPayCards.selectedToBenAccount]['cardBeneficiaryType'].toString();
			    self.nonRakPayCards.dummyTxntype="PMT_TRANSFER";
			    self.nonRakPayCards.creditCrn=self.nonRakPayCards.creditCrn;

				// to enable exchange rate fetch
				self.nonRakPayCards.isBenfSelected=true;

			}
		},

		getKeyUp : function() {
			WL.Logger.info("Exchange Rate call credit curr"+self.nonRakPayCards.creditCrn + " Debit curr "+self.nonRakPayCards.debitCrn);
			self.nonRakPayCards.benfUpdatedIndex = Number(self.nonRakPayCards.selectedToBenAccount)+1;

			if(self.nonRakPayCards.creditCrn!=undefined && self.nonRakPayCards.creditCrn!='' && self.nonRakPayCards.debitCrn!=undefined && self.nonRakPayCards.debitCrn!='' && self.nonRakPayCards.creditCrn!=null && self.nonRakPayCards.debitCrn!=null){

			if (self.nonRakPayCards.creditCrn!=self.nonRakPayCards.debitCrn) {
			    switch(self.nonRakPayCards.selectedBenType){

			    case "UCC":
			    	self.nonRakPayCards.txnType="WCP";
			    	break;
			    case "OCC":
			    	self.nonRakPayCards.txnType="NCP";
			    	break;
			   default:
				   break;


			    }
					rootscope.setEvent('exchangeRateClick');
					self.nonRakPayCards.isBenfSelected = false;
					self.common.exchangeRateCall=true;

			}
			}


		},
		getEventForTransfer : function() {
			self.utils.populateCurrentDateDetails();
			var eventSel = '';

			WL.Logger.info('pay cards Event selection criteria: '
					+ self.nonRakPayCards.selectedBenType + ""
					+ self.nonRakPayCards.selectedFrequency + ""
					+ self.nonRakPayCards.selectedCharges);
			if (self.nonRakPayCards.selectedBenType != "undefined"
					&& self.nonRakPayCards.selectedFrequency != "undefined") {
				var frequencyType = '';
				frequencyType = self.nonRakPayCards.selectedFrequency == 'O' ? "O"
						: "REC";

				switch (self.nonRakPayCards.selectedBenType + frequencyType) {

				case "UCCO":
					eventSel = 'onWithinUAESingleTransfersClick';
					break;

				case "UCCREC":
					eventSel = 'onWithinUAERecTransfersClick';
					break;
				case "OCCO":
					eventSel = 'onOutsideUAESingleTransfersClick';
					break;

				case "OCCREC":
					eventSel = 'onOutsideUAERecTransfersClick';
					break;
				default:
					break;
				}

				WL.Logger.info('pay cards  event selected' + eventSel);
			}

			return eventSel.toString();
		},

		getConfirmEventForTransfer : function() {
			self.utils.populateCurrentDateDetails();
			var eventSel = '';

			WL.Logger.info('pay cards Event selection criteria: '
					+ self.nonRakPayCards.selectedBenType + ""
					+ self.nonRakPayCards.selectedFrequency + ""
					+ self.nonRakPayCards.selectedCharges);
			if (self.nonRakPayCards.selectedFrequency != "undefined") {
				var frequencyType = '';
				frequencyType = self.nonRakPayCards.selectedFrequency == 'O' ? "O"
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

		initPayNowPage : function(responseList) {

			self.nonRakPayCards.bankTransferTab = true;
			self.nonRakPayCards.rakMoneyTab = false;
			self.nonRakPayCards.mobileCashTab = false;

			if (responseList == null) {
				return;
			}

			if (!responseList[0].hasOwnProperty('errorMessage') && !self.common.fromAuthPage) {

            if (responseList[0].hasOwnProperty('accountLedgerBalance')) {
				self.nonRakPayCards.availBal = responseList[0].accountLedgerBalance;
			}

            else  if (responseList[0].hasOwnProperty('exchangeRate')) {
				self.nonRakPayCards.exchangeRate = responseList[0].exchangeRate;
			}

            else  {
					// getting the TO list for fisrt Loading of Page
					self.utils.populateCurrentDateDetails();

					self.nonRakPayCards.benAccounts = responseList[0].cardsBenfList;
					self.nonRakPayCards.ownAccounts = responseList[0].fromAccountsList;
					self.nonRakPayCards.fromAccounts = responseList[0].fromAccountsList;
					self.nonRakPayCards.currencyList = responseList[0].currencyList;
					self.nonRakPayCards.frequencyType = responseList[0].frequencyType;
					self.nonRakPayCards.promoCode = responseList[0].promoList;
					self.nonRakPayCards.charges = responseList[0].chargeList;

					self.nonRakPayCards.RemcurrencyList = responseList[0].remCurrencyList;
					self.nonRakPayCards.remitCurrency = responseList[0].remitCurrency;
					self.nonRakPayCards.remitCrnFilter=responseList[0].remCrnFilter;
					self.nonRakPayCards.reasonList=responseList[0].reasonList;
					self.nonRakPayCards.subAccountTypeDesc = responseList[0].fromAccountsList[0].subAccountTypeDesc;
					self.nonRakPayCards.selectedFrequency="O";

				}

			}

		},

		// RAk Added for confirmation page init

		initAuthPage : function(responseList) {

			if (!responseList[0].hasOwnProperty('errorMessage')) {
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
		//Commenting for testing
		getAuthConfirmEvent : function() {
			var eventSel = '';

			if (self.nonRakPayCards.selectedBenType != "undefined"
					&& self.nonRakPayCards.selectedFrequency != "undefined") {
				var frequencyType = '';
				frequencyType = self.nonRakPayCards.selectedFrequency == 'O' ? "O"
						: "REC";

				switch (self.nonRakPayCards.selectedBenType + frequencyType) {


				case "UCCO":
					eventSel = 'onWithinUAESingleTransfersConfirm';
					break;

				case "UCCREC":
					eventSel = 'onWithinUAERecSelfTransfersConfirm';
					break;

				case "OCCO":
					eventSel = 'onOutsideUAESingleTransfersConfirm';
					break;

				case "OCCREC":
					eventSel = 'onOutsideUAERecSelfTransfersConfirm';
					break;
				default:
					break;
				}

				WL.Logger.info('Send money auth Confirm submit' + eventSel);
			}

			return eventSel.toString();
		},

	/*	getAuthConfirmationEvent : function() {
			var eventSel = '';

			if (self.nonRakPayCards.selectedFrequency != "undefined") {
				var frequencyType = '';
				frequencyType = self.nonRakPayCards.selectedFrequency == 'O' ? "O"
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
		},*/
		// RAK added for Success page init Method

		initSuccessPage : function(responseList) {
			self.common.successMessage = responseList[0].transferStatusMessage;
			if (responseList[0].hasOwnProperty('transferBeneficiaryResponse')) {
				self.common.successMessage = responseList[0].transferBeneficiaryResponse;
			}
			if (responseList[0].hasOwnProperty('messagedescription')) {
				self.common.successMessage = responseList[0].messagedescription;
			}

		},
		getSelectedCurrencyFilter : function() {
			if (!self.nonRakPayCards.selectedToBenAccount == '') {
				self.nonRakPayCards.selectedRCurr = self.nonRakPayCards.benAccounts[self.nonRakPayCards.selectedToBenAccount]['beneficiaryAccountCurrency']
						.toString();

			}
		}

	};

		// Added for Gold Buy sell Page//

	self.BuySellGoldTypeConstant={
		BUY:"GBU",
		SELL:"GSE",
		RAKCARDS:"RCC",
		DEFAULTCURRENCY:"GRM"
	};
	self.BUYSELLGOLDTRANSACTIONTYPE={
			BUY:"TXNBUY",
			SELLTOACCOUNT:"TXNSELLACT",
			SELLTOBENF:"TXNSELLBNF"

		};

	self.rakInvGold = {
		selectedBenType : "",
		selectedFromAccount : "",
	    selectedToBenAccount : "",
	    selectedToAccount : '',
		benAccounts : [],
		fromAccounts : [],
		goldAccounts:[],
		selectedGoldAccount:'',
		frequencyType : [],
		selectedFrequency : 'O',
		quantity : "",
		goldRate : "",
		goldRateinCurrency : "",
		convertedAmt: "",
		noOfTransfer : "",
		beneficiaryList : [],
		Buy:false,
		Sell:false,
		History:false,
		txnType:'',
		eventName:'',
		reasonList:[],
		selectedGoldAccountForExchange:'',
		transactionType:'',
		//RAK DEV CHANGES FOR FETCHING SELECTED BENEFICIARY INDEX FOR BUY/SELL GOLD PAY AGAIN START
		selectedBeneficiaryIndex:'',
		selectedGoldIndex:'',
		selectedGoldAccNum:'',
		selectedGoldAccountDisplay:'',
		selectedBeneficiaryDisplay:'',
		selectedBenfFlag:false,
		exchangeFlag:false,
		selectedFromIndex:'',
		creditIndex:'',
		//RAK DEV CHANGES FOR FETCHING SELECTED BENEFICIARY INDEX FOR BUY/SELL GOLD PAY AGAIN END
		onBenfTypeSelected:false,
		txnTypeList:[],
		fromAccountList:[],
		searchFromDate: new Date(),
		searchToDate: new Date(),
		scheduleList: [],


		immediatePaymentDueOn:"",
		instanceArray: "",
		selectAll:false,
		instanceListJson:[],
		instanceResultList:[],
		isBackclicked:false,
		authStatus:false,
		authFlag:'',
		authField:'',
		isCheckBoxSelected:false,
		mode:'',
		authStatus:false,
		authFlag:'',
		remarks:'',
		txnClikedBtn:'',

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
		debitAmount:'',
		stopBtnClicked : false,
		eventExcecutedFlag : false,
		noOfInstanceLeft:'',
		channelId:'',
		stoppedTxnList: [],

		clearSelfTransfersData : function() {
			self.rakInvGold.selectedBenType = '';
			self.rakInvGold.selectedFromAccount = '';
			self.rakInvGold.selectedToAccount = '';
			self.rakInvGold.selectedToBenAccount = '';
			self.rakInvGold.benAccounts = [];
			self.rakInvGold.goldAccounts = [];
			self.rakInvGold.selectedGoldAccount = '';
			self.rakInvGold.fromAccounts = [];
			self.rakInvGold.frequencyType = [];
			self.rakInvGold.selectedFrequency = 'O';
			self.rakInvGold.quantity = '';
			self.rakInvGold.noOfTransfer = "";
			self.rakInvGold.reason = "";
			self.rakInvGold.goldRate = '';
			self.rakInvGold.goldRateinCurrency='';
			self.rakInvGold.convertedAmt='';
			self.rakInvGold.beneficiaryList = [];
			self.rakInvGold.Buy = false;
			self.rakInvGold.Sell = false;
			self.rakInvGold.History = false;
			self.rakInvGold.eventName="";
			self.rakInvGold.selectedGoldAccountForExchange='';
			self.rakInvGold.transactionType='';
			self.rakInvGold.onBenfTypeSelected=false;
			self.rakInvGold.schTxnListSubmitBtn="";

			self.rakInvGold.instanceListJson=[];
			self.rakInvGold.instanceResultList=[];
			self.rakInvGold.isBackclicked=false;
			self.rakInvGold.authStatus=false;
			self.rakInvGold.authFlag='';
			self.rakInvGold.authField='';
			self.rakInvGold.immediatePaymentDueOn="";
			self.rakInvGold.dueDate="N";
			self.rakInvGold.instanceArray="";
			self.rakInvGold.selectAll=false;
			self.rakInvGold.isBackclicked=false;
			self.rakInvGold.isCheckBoxSelected=false;
			self.rakInvGold.mode='';
			self.rakInvGold.authStatus=false;
			self.rakInvGold.authFlag='';
			self.rakInvGold.remarks='';
			self.rakInvGold.txnClikedBtn='';
			self.rakInvGold.channelId='';
			self.rakInvGold.stoppedTxnList=[];
			self.common.effectiveRate='';

			/*// added for txn details ticket fix
			self.rakInvGold.installments='';
			self.rakInvGold.initorID='';
			self.rakInvGold.destId='';
			self.rakInvGold.entRemarks='';
			self.rakInvGold.selPurpose='';
			self.rakInvGold.initorType='';
			self.rakInvGold.recFreq='';
			self.rakInvGold.selectedReason='';
			self.rakInvGold.selectedReason1='';
			self.rakInvGold.selectedReason2='';
			self.rakInvGold.selectedReason3='';
			self.rakInvGold.cardNumber='';
			self.rakInvGold.debitAmount='';
			self.rakInvGold.stopBtnClicked = false;
			self.rakInvGold.noOfInstanceLeft='';*/
		},

		clearSearchHistory : function() {

				self.rakInvGold.txnTypeList = [],
				self.rakInvGold.searchFromDate = '',
				self.rakInvGold.searchToDate = '',
				self.rakInvGold.fromSearchResult = false,
				self.rakInvGold.searchFromDate_year = '',
				self.rakInvGold.searchFromDate_month = '',
				self.rakInvGold.searchFromDate_day = '',
				self.rakInvGold.searchToDate_year = '',
				self.rakInvGold.searchToDate_month = '',
				self.rakInvGold.searchToDate_day = '',
				self.rakInvGold.selectedCompltTxn = '',
				self.rakInvGold.selectedTxnType = '',
				self.rakInvGold.authStatus=false,
				self.rakInvGold.authFlag='',
				self.rakInvGold.authField='',
				self.rakInvGold.reason='',
				self.rakInvGold.searchFromDate = new Date(),
				self.rakInvGold.searchToDate = new Date(),
				self.rakInvGold.scheduleList = [],
				self.rakInvGold.fromAccount = '',
				self.rakInvGold.schTxnListSubmitBtn="",
				self.rakInvGold.txnClikedBtn='',

				//added for txn details ticket  fix
				self.rakInvGold.installments='',
				self.rakInvGold.initorID='',
				self.rakInvGold.destId='',
				self.rakInvGold.entRemarks='',
				self.rakInvGold.selPurpose='',
				self.rakInvGold.initorType='',
				self.rakInvGold.recFreq='',
				self.rakInvGold.selectedReason='',
				self.rakInvGold.selectedReason1='',
				self.rakInvGold.selectedReason2='',
				self.rakInvGold.selectedReason3='',
				self.rakInvGold.cardNumber='',
				self.rakInvGold.debitAmount='',
				self.rakInvGold.noOfInstanceLeft='',
				self.rakInvGold.displayAccount='',
				self.rakInvGold.channelId='',
				self.common.effectiveRate='',
				self.rakInvGold.goldRate = '',
				self.rakInvGold.goldRateinCurrency='',
				self.rakInvGold.convertedAmt='',
				self.common.availBal='',
				self.common.eqtValues=''

		},

		setFromToDate : function() {
			self.common.displayDate = self.rakInvGold.searchFromDate;
			self.utils.populateCurrentDateDetails();

			self.rakInvGold.searchFromDate_day =self.common.date;
			self.rakInvGold.searchFromDate_month=self.common.month;
			self.rakInvGold.searchFromDate_year=self.common.year;

			self.common.displayDate = self.rakInvGold.searchToDate;
			self.utils.populateCurrentDateDetails();

			self.rakInvGold.searchToDate_day =self.common.date;
			self.rakInvGold.searchToDate_month=self.common.month;
			self.rakInvGold.searchToDate_year=self.common.year;
		 },

		clearTab: function() {
			self.rakInvGold.Buy = false;
			self.rakInvGold.Sell = false;
			self.rakInvGold.History = false;

		},

        clearFields:function(){
        	self.rakInvGold.selectedToAccount='';
        	self.rakInvGold.onBenfTypeSelected=false;
        	self.rakInvGold.selectedToBenAccount='';
        	//RAK DEV CHANGES CLEARING ALL FIELDS IN BUY/SELL INITIATE PAGE START
        	//self.rakInvGold.selectedGoldAccount='';
        	//self.rakInvGold.selectedToBenAccount='';
        	//self.rakInvGold.quantity='';
        	//self.rakInvGold.selectedFrequency='';
        	//self.common.availBal='';
            //RAK DEV CHANGES CLEARING ALL FIELDS IN BUY/SELL INITIATE PAGE START
        },

		updateForBalCall:function(eventName){
			self.rakInvGold.selectedCurrency=self.rakInvGold.fromAccounts[self.rakInvGold.selectedFromAccount]['currencyCode'];
			self.rakInvGold.dummyTxntype="XFR_TRANSFER";
			self.rakInvGold.benfUpdatedIndex=(self.rakInvGold.selectedGoldAccount!=null && self.rakInvGold.selectedGoldAccount!='')? Number(self.rakInvGold.selectedGoldAccount): 0;
			self.rakInvGold.amount=(self.rakInvGold.quantity!=null && self.rakInvGold.quantity!='')? self.rakInvGold.quantity: 0;
			//self.rakInvGold.amount=0;
			self.rakInvGold.transactionType=self.BUYSELLGOLDTRANSACTIONTYPE.BUY;
			self.rakInvGold.selectedRCurr=self.BuySellGoldTypeConstant.DEFAULTCURRENCY;
			scope.setEvent(eventName);


		},
		updateForBalCallSendAgain:function(eventName){
			self.rakInvGold.selectedCurrency=self.rakInvGold.fromAccounts[self.rakInvGold.selectedFromAccount]['currencyCode'];
			//self.rakInvGold.dummyTxntype="XFR_TRANSFER";
			self.rakInvGold.benfUpdatedIndex=(self.rakInvGold.selectedGoldAccount!=null && self.rakInvGold.selectedGoldAccount!='')? Number(self.rakInvGold.selectedGoldAccount): 0;
			self.rakInvGold.amount=0;
			//self.rakInvGold.transactionType=self.BUYSELLGOLDTRANSACTIONTYPE.BUY;
			self.rakInvGold.selectedRCurr=self.BuySellGoldTypeConstant.DEFAULTCURRENCY;
			
			ActionProcessor.setEvent(eventName).then(function(payload) {
				console.log("Update Balance");
				console.log(JSON.stringify(payload));
				var response=payload;
				self.common.availBal=response.responsesList[0].accountAvailableBalance;
				scope.$apply();
			},function(errorPayload){
				self.common.availBal='';
			});
			//scope.setEvent(eventName);


		},
		
		updateBalCallSendAgain:function(eventName){
						
			ActionProcessor.setEvent(eventName).then(function(payload) {
				console.log("Update Balance");
				console.log(JSON.stringify(payload));
				var response=payload;
				self.common.availBal=response.responsesList[0].accountAvailableBalance;
				scope.$apply();
			},function(errorPayload){
				self.common.availBal='';
			});
			//scope.setEvent(eventName);


		},
		onSelfSelected:function(){
			self.rakInvGold.convertedAmt='';
			if(self.rakInvGold.selectedToBenAccount!=null && self.rakInvGold.selectedToBenAccount!='' && self.rakInvGold.selectedToBenAccount=='0'){
				self.rakInvGold.selectedBenType="OWNACT";
			}
			else {
				self.rakInvGold.selectedBenType="";
			}
		},
		onBenfSelected:function(eventName){

			self.common.fromAuthPage=false;
			if(self.rakInvGold.selectedToAccount!=null && self.rakInvGold.selectedToAccount!='' && self.rakInvGold.selectedBenType=="OWNACT"){
				self.rakInvGold.selectedCurrency=self.BuySellGoldTypeConstant.DEFAULTCURRENCY;
				self.rakInvGold.selectedGoldAccountForExchange=(self.rakInvGold.selectedGoldAccount!=null && self.rakInvGold.selectedGoldAccount!='')? self.rakInvGold.selectedGoldAccount: 0;
				self.rakInvGold.benfUpdatedIndex=Number(self.rakInvGold.selectedToAccount);
				self.rakInvGold.dummyTxntype="XFR_TRANSFER";
				self.rakInvGold.amount=0;
				self.rakInvGold.selectedRCurr=self.rakInvGold.fromAccounts[self.rakInvGold.selectedToAccount]['currencyCode'];
				self.rakInvGold.creditIndex=self.rakInvGold.benfUpdatedIndex.toString();

			}
			else{

				self.rakInvGold.selectedGoldAccountForExchange=(self.rakInvGold.selectedGoldAccount!=null && self.rakInvGold.selectedGoldAccount!='')? self.rakInvGold.selectedGoldAccount: 0;
				//self.rakInvGold.benfUpdatedIndex=Number(self.rakInvGold.selectedToBenAccount)+1;
				self.rakInvGold.benfUpdatedIndex=Number(self.rakInvGold.selectedToBenAccount);
				
				self.rakInvGold.creditIndex=self.rakInvGold.benfUpdatedIndex.toString();


				self.rakInvGold.amount=0;
				 if(self.rakInvGold.quantity=='' || self.rakInvGold.quantity=='0' || self.rakInvGold.quantity==null)
				  {
					  rootscope.rakSendMoney.common.exchangePopUp=false;
				  }
				  if(rootscope.rakSendMoney.common.exchangePopUp==true)
				  {
					   self.rakInvGold.amount=self.rakInvGold.quantity;
				  }

				if(self.rakInvGold.txnType==self.BuySellGoldTypeConstant.BUY){
					self.rakInvGold.selectedRCurr=self.BuySellGoldTypeConstant.DEFAULTCURRENCY;
					self.rakInvGold.selectedCurrency=self.rakInvGold.fromAccounts[self.rakInvGold.selectedFromAccount]['currencyCode'];
					self.rakInvGold.dummyTxntype="XFR_TRANSFER";
					self.rakInvGold.transactionType=self.BUYSELLGOLDTRANSACTIONTYPE.BUY;
				}
				else{
					self.rakInvGold.selectedRCurr= self.rakInvGold.benAccounts[self.rakInvGold.selectedToBenAccount]['currencyCode'];
					self.rakInvGold.selectedCurrency=self.BuySellGoldTypeConstant.DEFAULTCURRENCY;
					self.rakInvGold.transactionType=self.BUYSELLGOLDTRANSACTIONTYPE.SELLTOBENF;
					self.rakInvGold.dummyTxntype="PMT_TRANSFER";
				}

			}
			if(self.rakInvGold.selectedToBenAccount!='0' && self.rakInvGold.selectedToBenAccount){
				if(self.rakInvGold.selectedRCurr==self.rakInvGold.selectedCurrency){
					self.rakInvGold.onBenfTypeSelected=true;
					// show current rate as buy and sell are of same GOLD currencies
					self.common.currentRate='1.00';
					self.common.effectiveRate='1.00';
					
					if(self.rakInvGold.quantity!=''){
						self.common.eqtValues=rootscope.appLiterals.APP.RAKBUYSELLGOLD.RAKBUYSELLGOLDAUTHPAGE.EQTVALUES+ rootscope.appLiterals.APP.RAKBUYSELLGOLD.RAKBUYSELLGOLDAUTHPAGE.XAU+" "+ (parseFloat((self.xau * self.rakInvGold.quantity).toFixed(2)));
					}
				}else{
			     scope.setEvent(eventName);
			     
			  // Added for RAK Dual hit call handling
					rootScope.callInProgress=true;
			     self.rakInvGold.eventExcecutedFlag=true;
			     self.common.currentRate='';
				}
		    }
		},

		onToAccountSelected:function(eventName){
			rootScope.rakSendMoney.getExchangePopUp();
			if(self.rakInvGold.txnType==self.BuySellGoldTypeConstant.SELL){
			self.rakInvGold.transactionType=self.BUYSELLGOLDTRANSACTIONTYPE.SELLTOACCOUNT;
			}

			if(self.rakInvGold.selectedToAccount!='')
			{
				self.rakInvGold.eventExcecutedFlag=false;
			}
			  if(self.rakInvGold.quantity=='' || self.rakInvGold.quantity=='0' || self.rakInvGold.quantity==null)
			  {
				  rootscope.rakSendMoney.common.exchangePopUp=false;
			  }
			  if(rootscope.rakSendMoney.common.exchangePopUp==true)
				{
				   self.rakInvGold.amount=self.rakInvGold.quantity;
				}
			 if(self.rakInvGold.eventExcecutedFlag==false)
			 {
			 scope.setEvent(eventName);
			 
			// Added for RAK Dual hit call handling
				rootScope.callInProgress=true;
		     }
		},

		updateBalForSelectedGoldAccount:function(eventName){
			self.rakInvGold.onBenfTypeSelected=true;
		ActionProcessor.setEvent(eventName).then(function(payload) {
			console.log("Update Balance");
			console.log(JSON.stringify(payload));
			var response=payload;
			self.common.availBal=response.responsesList[0].accountAvailableBalance;
			//rootscope.$apply();
			},function(errorPayload){
				self.common.availBal='';
			})
		},

		getEventForGoldsConfirm : function() {
			self.utils.populateCurrentDateDetails();
			var eventSel='';
			var frequencyType = '';
			var txnType=self.rakInvGold.txnType;

			frequencyType = self.rakInvGold.selectedFrequency == 'O' ? "O"
					: "REC";
			switch(txnType+frequencyType){
			case self.BuySellGoldTypeConstant.BUY+"O":
				eventSel='onBuyGoldProceedClick';
				self.rakInvGold.noOfTransfer="0";
				self.rakInvGold.eventName="onBuySellGoldSingleClick";
				break;
			case self.BuySellGoldTypeConstant.BUY+"REC":
				eventSel='onBuySellGoldRecClick';
				self.rakInvGold.eventName="onBuySellGoldRecClick";
			    break;
			case self.BuySellGoldTypeConstant.SELL+"O":
				eventSel='onSellGoldBenfProceedClick';
				self.rakInvGold.noOfTransfer="0";
				self.rakInvGold.eventName="onBuySellGoldSingleClick";
				self.acceptTermscondition="Y";
				break;
			case self.BuySellGoldTypeConstant.SELL+"REC":
				eventSel='onSellGoldBenfProceedRecClick';
				self.rakInvGold.eventName="onBuySellGoldRecClick";
				self.acceptTermscondition="Y";
			    break;
			default:
			    break;

			}
			return eventSel.toString();
		},

		initPayNowPage : function(responseList) {


			if (responseList == null) {
				return;
			}

			if (!responseList[0].hasOwnProperty('errorMessage') && !self.common.fromAuthPage) {


					// getting the TO list for fisrt Loading of Page
				if(responseList[0].hasOwnProperty('exchangeRate')){
					if(responseList[0].accountAvailableBalance!= undefined)
					{
				    self.common.availBal=responseList[0].accountAvailableBalance;
					}
					if(responseList[0].exchangeRateFlag=='Y')
						{
						self.rakInvGold.goldRate=responseList[0].exchangeRate;
						}
					else
						{
						//self.rakInvGold.goldRate=responseList[0].exchangeRate;
						self.rakInvGold.goldRateinCurrency=responseList[0].exchangeRate;
						self.rakInvGold.convertedAmt=responseList[0].convertedAmt;
						
						
						if(self.rakInvGold.convertedAmt && responseList[0].XAUGRAMEQT){
							self.common.eqtValues=rootscope.appLiterals.APP.RAKBUYSELLGOLD.RAKBUYSELLGOLDAUTHPAGE.EQTVALUES+self.rakInvGold.convertedAmt+" "+rootscope.appLiterals.APP.RAKBUYSELLGOLD.RAKBUYSELLGOLDAUTHPAGE.OR+" "+rootscope.appLiterals.APP.RAKBUYSELLGOLD.RAKBUYSELLGOLDAUTHPAGE.XAU+" "+responseList[0].XAUGRAMEQT;
						}
						else if(self.rakInvGold.convertedAmt=='' && responseList[0].XAUGRAMEQT){
							self.common.eqtValues=rootscope.appLiterals.APP.RAKBUYSELLGOLD.RAKBUYSELLGOLDAUTHPAGE.EQTVALUES+ rootscope.appLiterals.APP.RAKBUYSELLGOLD.RAKBUYSELLGOLDAUTHPAGE.XAU+" "+responseList[0].XAUGRAMEQT;
						}
						
					}
					//self.rakInvGold.goldRate=responseList[0].exchangeRate;
					self.rakInvGold.onBenfTypeSelected=true;
					
					if(self.rakInvGold.txnClikedBtn=='SENDAGAIN')
					{
						self.rakInvGold.goldRate=responseList[0].exchangeRate;
					}
				}

				else if	(self.rakInvGold.txnClikedBtn=='SENDAGAIN' && responseList[0].hasOwnProperty('RESPONSEPAGE')){

					self.rakInvGold.selectedFrequency='O';
					if(responseList[0].recFreq){
					self.rakInvGold.selectedFrequency = responseList[0].recFreq;
					self.rakInvGold.noOfTransfer = Number(responseList[0].installments);
					}


					//self.rakInvGold.selectedFrequency = responseList[1].recFreq;
				}
				else{
					self.utils.populateCurrentDateDetails();

					if(responseList[0].hasOwnProperty('beneficiaryList'))
					{
					self.rakInvGold.benAccounts = responseList[0].beneficiaryList;
					}

					if(responseList[0].hasOwnProperty('goldAccountList'))
				    {
					self.rakInvGold.goldAccounts = responseList[0].goldAccountList;
				    }

					if(responseList[0].hasOwnProperty('fromAccountList'))
					{
						self.rakInvGold.fromAccounts = responseList[0].fromAccountList;
					}

					if(responseList[0].hasOwnProperty('frequencyType'))
					{
					self.rakInvGold.frequencyType = responseList[0].frequencyType;
					}
					
					
					if(self.rakInvGold.txnType==self.BuySellGoldTypeConstant.SELL){
						self.rakInvGold.selectedGoldAccount='0';
						self.rakInvGold.updateBalForSelectedGoldAccount('onGoldAccountSelectionBalCall');
					}

				}
				
				if(responseList[0].hasOwnProperty('beneficiaryList'))
				{
				self.rakInvGold.benAccounts = responseList[0].beneficiaryList;
				}
			}

		},

		// RAk Added for confirmation page init

		initAuthPage : function(responseList) {

			if (!responseList[0].hasOwnProperty('errorMessage')) {
				self.common.transactionDate = self.common.displayDate
						.toLocaleDateString();// responseList[0].txnDate;

				self.common.fromDisplayString = responseList[0].fromAccountId;
				self.common.toDisplayString = responseList[0].toAccountId;
				self.common.amount = responseList[0].entryAMT;
				self.common.currency = responseList[0].txnCurrency;
				self.common.valueAmount=responseList[0].VALUEAMOUNT;
				self.common.creditAmount=responseList[0].CREDITAMOUNT;
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
				self.common.message=responseList[0].MESSAGE;
				self.common.eqtXAU=responseList[0].XAUGRAMEQT;

				if (responseList[0].hasOwnProperty('EFFECTIVERATE'))
					{self.common.effectiveRate= responseList[0].EFFECTIVERATE;
					}
				if(self.common.effectiveRate==''){
					self.common.effectiveRate='1.00'
				}

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
		//Commenting for testing
		getEventForGoldsSubmit : function() {

			var eventSel='';
			var frequencyType = '';
			frequencyType = self.rakInvGold.selectedFrequency == 'O' ? "O"
					: "REC";

			if(self.rakInvGold.schTxnListSubmitBtn=='MODIFY'){
				eventSel = 'onConfirmModifyTransferClick';
			}
			else{
				switch(frequencyType){
				case "O":
					eventSel='onBuyGoldSingleConfirmClick';
					self.rakInvGold.eventName="SingleSubmit";
					break;
				case "REC":
					eventSel='onBuyGoldRecConfirmClick';
					self.rakInvGold.eventName="RecSubmit";
				    break;
				default:
				    break;

				}
			}
			return eventSel.toString();
		},


		initSuccessPage : function(responseList) {
			self.common.successMessage = responseList[0].transferStatusMessage;
			if (responseList[0].hasOwnProperty('transferBeneficiaryResponse')) {
				self.common.successMessage = responseList[0].transferBeneficiaryResponse;
			}
			if (responseList[0].hasOwnProperty('messagedescription')) {
				self.common.successMessage = responseList[0].messagedescription;
			}

		},

		resolveLandingPage:function(){
					var eventName='';
					self.rakInvGold.clearTab();
					switch(self.rakInvGold.txnType){

					case self.BuySellGoldTypeConstant.BUY:
						self.rakInvGold.Buy=true;
						eventName="onBuyGoldClick";
						break;
					case self.BuySellGoldTypeConstant.SELL:
						self.rakInvGold.Sell=true;
						eventName="onSellGoldClick";
						break;
					default:
						break;


					}
					return eventName;
		},

		initScheduleTransferListPage : function(responseList) {
			if (!responseList[0].hasOwnProperty('errorMessage') && !self.rakInvGold.editBack) {

				if (responseList[0].hasOwnProperty('message')) {
					self.common.successMessage = responseList[0].message;
				}

				if(responseList[0].hasOwnProperty('transactionTypeList')){
				    self.rakInvGold.txnTypeList=responseList[0].transactionTypeList;
				}
				if(responseList[0].hasOwnProperty('fromAccountList')){
					self.rakInvGold.fromAccountList=responseList[0].fromAccountList;
				}

				if(responseList[0].hasOwnProperty('scheduleList')){
					self.rakInvGold.scheduleList=responseList[0].scheduleList;
				}

				if(responseList[0].hasOwnProperty('selectedTxnType')){
					self.rakInvGold.selectedTxnType = responseList[0].selectedTxnType;
				}

			}
		},

		initEditPayNowPage : function(responseList) {
			self.rakInvGold.txnType = self.rakInvGold.selectedTxn.txnType;
			if(self.rakInvGold.txnType == self.BuySellGoldTypeConstant.BUY){
				self.rakInvGold.Buy = true;
				self.rakInvGold.Sell = false;
			}
			else if(self.rakInvGold.txnType == self.BuySellGoldTypeConstant.SELL){
				self.rakInvGold.Buy = false;
				self.rakInvGold.Sell = true;
			}
			self.rakInvGold.History = false;

			if (responseList == null) {
				return;
			}

			if (!responseList[0].hasOwnProperty('errorMessage') && !self.common.fromAuthPage) {
				if(responseList[0].hasOwnProperty('accountAvailableBalance')){
					self.common.availBal=responseList[0].accountAvailableBalance;
				}

					// getting the TO list for fisrt Loading of Page
				if(responseList[0].hasOwnProperty('exchangeRate')){
					//self.common.availBal=responseList[0].accountAvailableBalance;
					self.rakInvGold.goldRate=responseList[0].exchangeRate;
					self.rakInvGold.onBenfTypeSelected=true;
					self.rakInvGold.convertedAmt=responseList[0].convertedAmt;
					
					if(self.rakInvGold.convertedAmt && responseList[0].XAUGRAMEQT){
						self.common.eqtValues=rootscope.appLiterals.APP.RAKBUYSELLGOLD.RAKBUYSELLGOLDAUTHPAGE.EQTVALUES+self.rakInvGold.convertedAmt+" "+rootscope.appLiterals.APP.RAKBUYSELLGOLD.RAKBUYSELLGOLDAUTHPAGE.OR+" "+rootscope.appLiterals.APP.RAKBUYSELLGOLD.RAKBUYSELLGOLDAUTHPAGE.XAU+" "+responseList[0].XAUGRAMEQT;
					}
					else if(self.rakInvGold.convertedAmt=='' && responseList[0].XAUGRAMEQT){
						self.common.eqtValues=rootscope.appLiterals.APP.RAKBUYSELLGOLD.RAKBUYSELLGOLDAUTHPAGE.EQTVALUES+ rootscope.appLiterals.APP.RAKBUYSELLGOLD.RAKBUYSELLGOLDAUTHPAGE.XAU+" "+responseList[0].XAUGRAMEQT;
					}
					
					self.common.eqtXAU=responseList[0].XAUGRAMEQT;
					return;
				}
				else{
					self.utils.populateCurrentDateDetails();

					self.rakInvGold.benAccounts = responseList[0].beneficiaryList;
					self.rakInvGold.goldAccounts = responseList[0].goldAccountList;
					self.rakInvGold.fromAccounts = responseList[0].fromAccountList;
					self.rakInvGold.frequencyType = responseList[0].frequencyType;

					self.rakInvGold.selectedFrequency="O";
				}

				if(self.rakInvGold.schTxnListSubmitBtn=='MODIFY'  && self.common.exchangeRateCall==false){
					//$scope.setEvent('onAccountSelectionBalExchgCall');

					if (responseList[0].hasOwnProperty('initorId')) {
						self.rakInvGold.initAcc = Number(responseList[0].initorId);
					}
					//BUY GOLD
					if(self.rakInvGold.txnType == self.BuySellGoldTypeConstant.BUY){
						if (responseList[0].hasOwnProperty('destId')) {
							self.rakInvGold.destAcc = Number(responseList[0].destId);
						}

						if(self.rakInvGold.goldAccounts!='' && self.rakInvGold.goldAccounts!=''){
					          for(var temp in self.rakInvGold.goldAccounts){
				  					if(self.rakInvGold.goldAccounts[temp].accountNumber==self.rakInvGold.destAcc){
				  						self.rakInvGold.selectedGoldAccount=self.rakInvGold.goldAccounts[temp].accountIndex;
				  						self.rakInvGold.selectedGoldAccountDisp=rootscope.appLiterals.APP.RAKBUYSELLGOLD.RAKBUYSELLGOLDINITPAGE.TO +" : "+self.rakInvGold.selectedTxn.toAccount;
				  						break;
				  					}
				  				}
						}
						if(self.rakInvGold.fromAccounts!='' && self.rakInvGold.fromAccounts!=''){
					          for(var temp in self.rakInvGold.fromAccounts){
				  					if(self.rakInvGold.fromAccounts[temp].accountNumber==self.rakInvGold.initAcc){
				  						self.rakInvGold.selectedFromAccount=self.rakInvGold.fromAccounts[temp].accountIndex;
				  						break;
				  					}
				  				}
						}

						self.rakInvGold.selectedCurrency=self.rakInvGold.fromAccounts[self.rakInvGold.selectedFromAccount]['currencyCode'];
						self.rakInvGold.dummyTxntype="XFR_TRANSFER";
						self.rakInvGold.benfUpdatedIndex=(self.rakInvGold.selectedGoldAccount!=null && self.rakInvGold.selectedGoldAccount!='')? Number(self.rakInvGold.selectedGoldAccount): 0;
						self.rakInvGold.amount=Number(self.rakInvGold.selectedTxn.txnAmount);
						self.rakInvGold.transactionType=self.BUYSELLGOLDTRANSACTIONTYPE.BUY;
						self.rakInvGold.selectedRCurr=self.BuySellGoldTypeConstant.DEFAULTCURRENCY;

						scope.setEvent('onAccountSelectionBalExchgCall');
					}
					//SELL GOLD
					else if(self.rakInvGold.txnType == self.BuySellGoldTypeConstant.SELL){
						if (responseList[0].hasOwnProperty('destId')) {
							self.rakInvGold.destAcc = Number(responseList[0].destId);
						}
						if(self.rakInvGold.benAccounts!='' && self.rakInvGold.benAccounts!=''){
					          for(var temp in self.rakInvGold.benAccounts){
				  					if(self.rakInvGold.benAccounts[temp].payeeListId==self.rakInvGold.destAcc){
				  						self.rakInvGold.selectedToBenAccount=self.rakInvGold.benAccounts[temp].beneficiaryIndex;
				  						self.rakInvGold.selectedToBenAccountDisp=rootscope.appLiterals.APP.RAKBUYSELLGOLD.RAKBUYSELLGOLDINITPAGE.TO +" : "+self.rakInvGold.selectedTxn.toAccount;
				  						self.rakInvGold.transactionType=self.BUYSELLGOLDTRANSACTIONTYPE.SELLTOBENF;
				  						self.rakInvGold.onBenfSelected('onExchangeCall');
				  						break;
				  					}
				  					else{
				  						self.rakInvGold.transactionType=self.BUYSELLGOLDTRANSACTIONTYPE.SELLTOACCOUNT;

				  					}
				  				}
						}

						if(self.rakInvGold.transactionType==self.BUYSELLGOLDTRANSACTIONTYPE.SELLTOACCOUNT){
							self.rakInvGold.selectedBenType='OWNACT';
							self.rakInvGold.selectedToBenAccount=self.rakInvGold.benAccounts[0].beneficiaryIndex;
							if(self.rakInvGold.fromAccounts){
						          for(var temp in self.rakInvGold.fromAccounts){
					  					if(self.rakInvGold.fromAccounts[temp].accountNumber==self.rakInvGold.destAcc){
					  						self.rakInvGold.selectedToAccount=self.rakInvGold.fromAccounts[temp].accountIndex;
					  						self.rakInvGold.selectedToAccountDisp=rootscope.appLiterals.APP.RAKBUYSELLGOLD.RAKBUYSELLGOLDINITPAGE.TO +" : "+self.rakInvGold.selectedTxn.toAccount;
					  						self.rakInvGold.benfUpdatedIndex=Number(self.rakInvGold.selectedToAccount);
					  						self.rakInvGold.selectedRCurr=self.BuySellGoldTypeConstant.DEFAULTCURRENCY;
					  						self.rakInvGold.dummyTxntype="XFR_TRANSFER";
					  						//self.rakInvGold.onBenfSelected('onExchangeCall');
											//self.rakInvGold.onToAccountSelected('onExchangeCall');
					  						break;
					  					}
					  				}
							}

						}
						if (responseList[0].hasOwnProperty('initorId')) {
							self.rakInvGold.initAcc = Number(responseList[0].initorId);
						}
						if(self.rakInvGold.goldAccounts!='' && self.rakInvGold.goldAccounts!=''){
					          for(var temp in self.rakInvGold.goldAccounts){
				  					if(self.rakInvGold.goldAccounts[temp].accountNumber==self.rakInvGold.initAcc){
				  						self.rakInvGold.selectedGoldAccount=self.rakInvGold.goldAccounts[temp].accountIndex;
				  						//self.rakInvGold.updateBalForSelectedGoldAccountModify('onGoldAccountSelectionBalCall');
				  						break;
				  					}
				  				}
						}



					}

					//self.rakInvGold.updateForBalCall('onAccountSelectionBalExchgCall');


					self.rakInvGold.quantity = Number(self.rakInvGold.selectedTxn.txnAmount);
					//self.common.displayDate = new Date(self.rakInvGold.selectedTxn.txnDate);


					//self.common.dd = new Date(self.rakInvGold.selectedTxn.txnDate);
					self.common.dd = new Date(self.rakInvGold.selectedTxn.txnDate,'DD-MM-YY');
					if(Object.prototype.toString.call(self.common.dd) === "[object Date]"){
						if(isNaN(self.common.dd.getTime())){
							if(self.rakInvGold.selectedTxn.txnDate.indexOf("/")!=-1){
								self.common.displayDate = new Date(self.rakInvGold.selectedTxn.txnDate.split('/')[1]+"/"+
										self.rakInvGold.selectedTxn.txnDate.split('/')[0]+"/"+self.rakInvGold.selectedTxn.txnDate.split('/')[2]);
							}
							else{
								self.common.displayDate = new Date(self.rakInvGold.selectedTxn.txnDate.split('-')[1]+"/"+
										self.rakInvGold.selectedTxn.txnDate.split('-')[0]+"/"+self.rakInvGold.selectedTxn.txnDate.split('-')[2]);
							}
						}
						else{
							self.common.displayDate = self.common.dd;
						}
					}
					else{
						self.common.displayDate = self.common.dd;
					}

					if(self.rakInvGold.frequencyType){
						for(var temp in self.rakInvGold.frequencyType){
		  					if(self.rakInvGold.frequencyType[temp].frequencyTypeCode==self.rakInvGold.selectedTxn.txnFrequency){
		  						self.rakInvGold.selectedFrequency=self.rakInvGold.frequencyType[temp].frequencyTypeCode;
		  						self.rakInvGold.selectedFrequencyDisp = self.rakInvGold.frequencyType[temp].frequencyTypeDesc;
		  						break;
		  					}
		  				}
					}

					if (responseList[0].hasOwnProperty('installments') && responseList[0].installments != 1) {
						self.rakInvGold.noOfTransfer = Number(responseList[0].installments);
					}
				}

				self.rakInvGold.schTxnListSubmitBtn = "";
			}

		},

		initDetails : function(responseList) {
			if (!responseList[0].hasOwnProperty('errorMessage')) {

					if(responseList[0].hasOwnProperty('installments')){
						self.rakInvGold.noOfTransfers = responseList[0].installments;
					}
					if(responseList[0].hasOwnProperty('recFreq')){
						self.rakInvGold.recFreq = responseList[0].recFreq;
					}

				}
		},

		initStopTransferAuth : function(responsesList) {

			if(!responsesList[0].hasOwnProperty('errorMessage')){
				self.rakInvGold.immediateDueOn = responsesList[0].immediatePaymentDueOn;
				self.rakInvGold.instanceArray = JSON
				.stringify(responsesList[0].instanceList);
				if (responsesList[0].auth == "")
					self.rakInvGold.authStatus = false;
				else {
					self.rakInvGold.authStatus = true;
					self.common.isAuthSet = true;
					self.rakInvGold.authFlag = responsesList[0].auth;
				}
			}
		},
		//added for stop instance

		initImmediateStopTransfer : function(responsesList) {

			if(!responsesList[0].hasOwnProperty('errorMessage')){
				if(responsesList[0].hasOwnProperty('message')){
					self.common.successMessage = responsesList[0].message;
				}

				if(!responsesList[0].hasOwnProperty('errorMessage') && !self.rakInvGold.isBackclicked && responsesList[0].hasOwnProperty('instanceList')){
					self.rakInvGold.instanceList = responsesList[0].instanceList;

				}

			}
		},

		onStopSingleInstanceConfirm:function(){
			self.rakInvGold.instanceListJson=[];
			self.rakInvGold.instanceArray=[];

			for(var temp in self.rakInvGold.instanceList){
				if(self.rakInvGold.instanceList[temp]['checkedFlag']){
					self.rakInvGold.isCheckBoxSelected=true;
					self.rakInvGold.instanceListJson.push(self.rakInvGold.instanceList[temp]);

					}

			}

			if(!self.rakInvGold.isCheckBoxSelected){
				rootscope.showErrorPopup(rootscope.appLiterals.APP.RAK_COMMON.MANDFILED);
				return;

			}
			self.rakInvGold.instanceArray=JSON.stringify(self.rakInvGold.instanceListJson);
			self.rakInvGold.isCheckBoxSelected=false;
			scope.setEvent('onStopTransferAuthConfirmClick');

        },

    	getCheckBoxStatus:function(){
			if(self.rakInvGold.selectAll){
				for(var temp in self.rakInvGold.instanceList){
					self.rakInvGold.instanceList[temp].checkedFlag=true;
				}

			}

			else{
				for(var temp in self.rakInvGold.instanceList){
					self.rakInvGold.instanceList[temp].checkedFlag=false;
				}

			}
		},

		initImmediateStopTransferAuth : function(responsesList) {

			if(!responsesList[0].hasOwnProperty('errorMessage')){

				if(responsesList[0].auth == "")
						self.rakInvGold.authStatus=false;
					else
					{
						self.rakInvGold.authStatus=true;
						self.rakInvGold.authFlag = responsesList[0].auth;
					}
			}
		},

		initStopInstanceSuccessPage : function(responseList) {
			self.common.successMessage = responseList[0].message;
		},

		fetchSubmitEvent : function() {
			var selectedEvent;
			if (self.rakInvGold.instanceList.length
					- self.rakInvGold.instanceListJson.length > 0) {
				selectedEvent = 'backToInstanceList';
			} else {
				selectedEvent = 'backToCriteria';
			}

			return selectedEvent;
		},

		// ///ended//////////////



		updateBalForSelectedGoldAccountModify:function(eventName){
			self.rakInvGold.onBenfTypeSelected=true;
		ActionProcessor.setEvent(eventName).then(function(payload) {
			console.log("Update Balance");
			//console.log(JSON.stringify(payload));
			var response=payload;
			self.common.availBal=response.responsesList[0].accountAvailableBalance;
			self.rakInvGold.onBenfSelected('onExchangeCall');
			self.rakInvGold.onToAccountSelected('onExchangeCall');
			//rootscope.$apply();
			},function(errorPayload){
				//self.common.availBal='';
			})
		},

		//added for history details


		initSchedulehistoryDetails:function(responsesList)
			{
			if(!responsesList[0].hasOwnProperty('errorMessage') && !self.common.fromAuthPage ){
				self.rakInvGold.initorID=responsesList[0].initorID;
				self.rakInvGold.destId=responsesList[0].destId;
				self.rakInvGold.installments=responsesList[0].installments;
				self.rakInvGold.entRemarks=responsesList[0].entRemarks;
				self.rakInvGold.selPurpose=responsesList[0].selPurpose;
				self.rakInvGold.initorType=responsesList[0].initorType;
				self.rakInvGold.recFreq=responsesList[0].recFreq;
				self.rakInvGold.cardNumber=responsesList[0].cardNumber;
				self.rakInvGold.selectedReason=responsesList[0].SELECTEDREASON;
			    self.rakInvGold.selectedReason1=responsesList[0].ENTEREDREASON1;
			    self.rakInvGold.selectedReason2=responsesList[0].ENTEREDREASON2;
			    self.rakInvGold.selectedReason3=responsesList[0].ENTEREDREASON3;
			    self.rakInvGold.debitAmount=responsesList[0].debitAmt;
				self.rakInvGold.noOfInstanceLeft=responsesList[0].noOfInstanceLeft;
				self.rakInvGold.displayAccount=responsesList[0].displayAccount;

				self.rakInvGold.channelId=responsesList[0].channelId;

				if (responsesList[0].hasOwnProperty('stoppedTxns')){
					self.rakInvGold.stoppedTxnList = responsesList[0].stoppedTxns;
				}
				
				if(responsesList[0].hasOwnProperty('XAUGRAMEQT')){
					self.common.eqtXAU=responsesList[0].XAUGRAMEQT;
				}


			}
		},
		
		getKeyUp : function() {
			//self.getExchangePopUp();
			
			self.rakInvGold.amount=self.rakInvGold.quantity;
			
			/*if(self.rakInvGold.txnClikedBtn=='SENDAGAIN')
			{
				scope.setEvent('onAccountSelectionBalExchgCall');
			}
			
			else{*/
			
				if(self.rakInvGold.txnType==self.BuySellGoldTypeConstant.BUY && self.rakInvGold.selectedGoldAccount){
					/*self.rakInvGold.selectedRCurr=self.BuySellGoldTypeConstant.DEFAULTCURRENCY;
					self.rakInvGold.selectedCurrency=self.rakInvGold.fromAccounts[self.rakInvGold.selectedFromAccount]['currencyCode'];
					self.rakInvGold.dummyTxntype="XFR_TRANSFER";
					self.rakInvGold.transactionType=self.BUYSELLGOLDTRANSACTIONTYPE.BUY;
					scope.setEvent('onBuyExchangeCall');*/
					
					 rootScope.rakSendMoney.getExchangePopUp();
					 self.rakInvGold.onBenfSelected('onExchangeCall');
					 self.rakInvGold.onToAccountSelected('onBuyExchangeCall');
					 
					
					
				}
				
				
				else if(self.rakInvGold.txnType==self.BuySellGoldTypeConstant.SELL ){
					  if((self.rakInvGold.selectedBenType=='OWNACT' && self.rakInvGold.selectedToAccount) || (self.rakInvGold.selectedBenType!='OWNACT' && self.rakInvGold.selectedToBenAccount)){
						 /* scope.setEvent('onExchangeCallFetchCurrencyRate');*/
						  
						  rootScope.rakSendMoney.getExchangePopUp();
						  self.rakInvGold.onBenfSelected('onExchangeCall');
						  if(self.rakInvGold.selectedBenType=='OWNACT'){
							  self.rakInvGold.onToAccountSelected('onExchangeCallFetchCurrencyRate');
						  }
						  
						
					  }
				}
			//}
			
			
			
			//self.rakInvGold.onBenfSelected('onExchangeCall');
			//self.rakInvGold.onToAccountSelected('onBuyExchangeCall');
		}

	};

	self.schedule = {
		txnTypeSelected:false,
		schTxnListSubmitBtn:"",
		scheduleList : [],
		txnPwd:"",
		toAccountDisp:"",


		 ///added for stop instance


		immediatePaymentDueOn:"",
		dueDate:"N",
		instanceArray: "",
		selectAll:false,
		instanceListJson:[],
		instanceResultList:[],
		isBackclicked:false,
		authStatus:false,
		authFlag:'',
		authField:'',
		isCheckBoxSelected:false,
		mode:'',
		authStatus:false,
		authFlag:'',
		remarks:'',
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
		cardNumber:'',
		debitAmount:'',
		chargeAmount:'',
		displayAccount:'',
		stoppedTxnList: [],
		beneficiaryName: '',

		clearSchedulePayCardsData : function() {
			self.schedule.txnTypeSelected=false;
			self.ownCards.selectedCardBenfType='';
			self.common.searchFromDate = new Date();
			self.common.searchToDate = new Date();
			self.schedule.schTxnListSubmitBtn = '';
			self.schedule.toAccountDisp = '';
			self.schedule.schTxnListSubmitBtn = '';
			self.schedule.txnPwd='';

			///aded for stop instance

			self.schedule.instanceListJson=[];
			self.schedule.instanceResultList=[];
			self.schedule.isBackclicked=false;
			self.schedule.authStatus=false;
			self.schedule.authFlag='';
			self.schedule.authField='';
			self.schedule.immediatePaymentDueOn="";
			self.schedule.dueDate="N";
			self.schedule.instanceArray="";
			self.schedule.selectAll=false;
			self.schedule.isBackclicked=false;
			self.schedule.isCheckBoxSelected=false;
			self.schedule.mode='';
			self.schedule.authStatus=false;
			self.schedule.authFlag='';
			self.schedule.remarks='';
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
			self.schedule.cardNumber='';
			self.schedule.debitAmount='';
			self.schedule.chargeAmount='';
			self.schedule.displayAccount='';
			self.schedule.scheduleList = [];
			self.schedule.stoppedTxnList = [];
			self.schedule.beneficiaryName = '';


		},
		clearSearchData:function(){
			self.ownCards.selectedFromAccount ='';
			self.ownCards.selectedCardBenfType='';
			self.common.searchFromDate = new Date();
			self.common.searchToDate = new Date();

		},
		onTxnTypeSelected:function(){
			self.schedule.txnTypeSelected=true;
		},
		setModifyFormatedDate : function( unformattedDate ) {
			var str = unformattedDate;
			var res = str.split("/");
			var formatDate = res[2]+", "+res[1]+", "+res[0];

			return formatDate;
		},
		initScheduleTransferListPage : function(responseList) {
			if (!responseList[0].hasOwnProperty('errorMessage')) {

				if(responseList[0].hasOwnProperty('txnTypeList')){
				    self.schedule.txnTypeList=responseList[0].txnTypeList;
				}
				if(responseList[0].hasOwnProperty('scheduleList')){
					self.schedule.scheduleList=responseList[0].scheduleList;
				}
				if(responseList[0].hasOwnProperty('fromAccount')){
					self.schedule.searchFromList=responseList[0].fromAccount;
				}

			}
		},
		initPayNowEditPage : function(responseList) {

		self.payCards = true;
		self.cardsTab = false;
		self.cardHistoryTab = false;
		self.nonRakPayCards.bankTransferTab = false;

			if (responseList == null) {
				return;
			}

		if (!responseList[0].hasOwnProperty('errorMessage') && !self.common.fromAuthPage) {/*

            if (responseList[0].hasOwnProperty('accountLedgerBalance')) {
				self.ownCards.availBal = responseList[0].accountLedgerBalance;
			}

            else  if (responseList[0].hasOwnProperty('exchangeRate')) {
				self.ownCards.exchangeRate = responseList[0].exchangeRate;
			}

            else if (responseList[0].hasOwnProperty('purposeListUpdated')) {
				self.ownCards.purpose = responseList[0].purposeListUpdated;
			}

            else  {
					// getting the TO list for fisrt Loading of Page
            	if(responseList[0].hasOwnProperty('RESPONSEPAGE') && responseList[0].RESPONSEPAGE=='RAKSENDMONEY'){
					self.utils.populateCurrentDateDetails();

					self.ownCards.benAccounts = responseList[0].beneficiaryList;
					self.ownCards.ownAccounts = responseList[0].fromAccountsList;
					self.ownCards.fromAccounts = responseList[0].fromAccountsList;
					self.ownCards.currencyList = responseList[0].currencyList;
					self.ownCards.frequencyType = responseList[0].frequencyType;
					self.ownCards.promoCode = responseList[0].promoList;
					self.ownCards.charges = responseList[0].chargeList;
					self.ownCards.purpose = responseList[0].purposeList;
					self.ownCards.RemcurrencyList = responseList[0].remCurrencyList;
					self.ownCards.remitCurrency = responseList[0].remitCurrency;
					self.ownCards.remitCrnFilter=responseList[0].remCrnFilter;
					self.ownCards.reasonList=responseList[0].reasonList;
					self.ownCards.subAccountTypeDesc = responseList[0].fromAccountsList[0].subAccountTypeDesc;
					self.common.creditAmt = responseList[0].CREDIT_AMOUNT;
					self.common.chargeAmt = responseList[0].CHARGE_AMOUNT;
					self.ownCards.selectedFrequency="O";
				}
            }
           if(self.schedule.schTxnListSubmitBtn=='MODIFY'){
				if(self.ownCards.fromAccounts!='' && self.ownCards.fromAccounts!=''){
			          for(var temp in self.ownCards.fromAccounts){
		  					if(self.ownCards.fromAccounts[temp].accountNickName==self.schedule.selectedTxn.fromAccount){
		  						self.ownCards.selectedFromAccount=self.ownCards.fromAccounts[temp].accountIndex;
		  						break;
		  					}
		  				}
				}
				//alert("CAME HEREEEEE");
				//self.common.updateBal('onAccountSelectionBalCall');
				self.common.updateBal('onNonRakAccountSelectionBalCall');

				self.ownCards.selectedCurrency = self.schedule.selectedTxn.txnCurrency;
				self.ownCards.amount = Number(self.schedule.selectedTxn.txnAmount);
				self.common.displayDate = new Date(self.schedule.setModifyFormatedDate(self.schedule.selectedTxn.txnDate));

				if(self.ownCards.frequencyType!='' && self.ownCards.frequencyType!=''){
			          for(var temp in self.ownCards.frequencyType){
		  					if(self.ownCards.frequencyType[temp].frequencyTypeDesc==self.schedule.selectedTxn.txnFrequency){
		  						self.ownCards.selectedFrequency=self.ownCards.frequencyType[temp].frequencyTypeCode;
		  						break;
		  					}
		  				}
				}

				self.schedule.toAccountDisp = rootscope.appLiterals.APP.RAKSEND_MONEY.RAKTRANSFERS_PAYNOW_PAGE.PLCHOLDER_TO +" : "+self.schedule.selectedTxn.toAccount;
				if(self.ownCards.benAccounts!='' && self.ownCards.benAccounts!=''){
			          for(var temp in self.ownCards.benAccounts){
		  					if(self.ownCards.benAccounts[temp].cardbeneficiaryNickName==self.schedule.selectedTxn.toAccount){
		  						self.ownCards.selectedToBenAccount = self.ownCards.benAccounts[temp].cardIndex;
		  						break;
		  					}
		  				}
				}
				self.ownCards.benfUpdatedIndex = Number(self.ownCards.selectedToBenAccount)+1;
				if (self.ownCards.selectedToBenAccount!="" && self.ownCards.selectedToBenAccount != undefined) {
					var benfCountry=self.ownCards.benAccounts[self.ownCards.selectedToBenAccount]['cardBeneficiaryCountry'].toString();
					var benType = self.ownCards.benAccounts[self.ownCards.selectedToBenAccount]['cardBeneficiaryType'].toString();
		  			self.ownCards.selectedCardBenfType=benType;
					self.ownCards.selectedBenType=benType;
					for(var temp in self.ownCards.remitCrnFilter){
						if(benfCountry==self.ownCards.remitCrnFilter[temp]['filterCode']){
							self.ownCards.selectedRCurr=self.ownCards.remitCrnFilter[temp]['filterDesc'];
							self.ownCards.creditCrn=self.ownCards.selectedRCurr;

							break;
						}
					}
				}


				self.ownCards.txnCurrencyArray=[];
				if (self.ownCards.selectedToBenAccount != undefined && self.ownCards.selectedToBenAccount!=0) {
					var benfCountry=self.ownCards.benAccounts[self.ownCards.selectedToBenAccount]['cardBeneficiaryCountry'].toString();
					var benType = self.ownCards.benAccounts[self.ownCards.selectedToBenAccount]['cardBeneficiaryType'].toString();
					//alert("benType  2222222 ::-->>"+benType);
					if(benType==self.CardsBenTypeConstant.OWNCARDS && self.ownCards.selectedToAccount!=undefined){
						self.ownCards.creditCrn=self.ownCards.ownAccounts[self.ownCards.selectedToAccount]['currencyCode'];
					}
					else{
							for(var temp in self.ownCards.remitCrnFilter){
									if(benfCountry==self.ownCards.remitCrnFilter[temp]['filterCode']){
										self.ownCards.creditCrn=self.ownCards.selectedRCurr;
										break;
									}

							}
						}
					}

				if (self.ownCards.selectedFromAccount != undefined && self.ownCards.selectedFromAccount !="") {
					self.ownCards.selectedCurrency = self.ownCards.fromAccounts[self.ownCards.selectedFromAccount]['currencyCode']
							.toString();
					self.ownCards.debitCrn=self.ownCards.selectedCurrency;

				}

				for(var temp in self.ownCards.RemcurrencyList){
					if(self.ownCards.RemcurrencyList[temp]['currencyCode']==self.ownCards.debitCrn || self.ownCards.RemcurrencyList[temp]['currencyCode']==self.ownCards.creditCrn){
						self.ownCards.txnCurrencyArray.push(self.ownCards.RemcurrencyList[temp]);
					}
					else if(self.ownCards.selectedRCurr!=null && self.ownCards.selectedRCurr!='' && !self.ownCards.txnCurrencyArray.hasOwnProperty[self.ownCards.selectedRCurr] && self.ownCards.RemcurrencyList[temp]['currencyCode']==self.ownCards.selectedRCurr){
						self.ownCards.txnCurrencyArray.push(self.ownCards.RemcurrencyList[temp]);
					}
				}

				switch(self.ownCards.selectedBenType){
				    case self.CardsBenTypeConstant.WITHINUAE:
				    	self.ownCards.txnType=self.TxnTypeConstant.WITHINUAE;
				    	break;
				    case self.CardsBenTypeConstant.OUTSIDEUAE:
				    	self.ownCards.txnType=self.TxnTypeConstant.OUTSIDEUAE;
				    	break;
				    default:
					    break;
				}
           }
		*/

			// if(self.ownCards.fromSearch==true){
	        	  // self.ownCards.fromSearch=false;
			if (!responseList[0].hasOwnProperty('errorMessage') && !self.common.fromAuthPage) {

				/*if(self.ownCards.selectedCardBenfType=='All'){
					self.ownCards.selectedCardBenfType = self.schedule.selectedTxn.txnType;
				}*/

				//self.ownCards.selectedCardBenfType = self.rootscope.rakPayee.payCard.selectedCardType;
				if(self.ownCards.selectedCardBenfType==self.TxnTypeConstant.OUTSIDEUAE)
					self.ownCards.selectedCardBenfType = self.TxnTypeConstant.WITHINUAE;



					if(self.ownCards.selectedCardBenfType!=undefined && self.ownCards.selectedCardBenfType==self.TxnTypeConstant.WITHINUAE){

		        	     if (responseList[0].hasOwnProperty('exchangeRate')) {
		     				self.ownCards.exchangeRate = responseList[0].exchangeRate;
		     				self.ownCards.convertedAmt=responseList[0].convertedAmt;
		     			}
		        	     else if (responseList[0].hasOwnProperty('purposeListUpdated')) {
			     				self.ownCards.purpose = responseList[0].purposeListUpdated;
			     			}
		                 else  {
		     					// getting the TO list for fisrt Loading of Page
		     					self.utils.populateCurrentDateDetails();

		     					self.ownCards.benAccounts = responseList[0].cardsBenfList;
		     					self.ownCards.ownAccounts = responseList[0].fromAccountsList;
		     					self.ownCards.fromAccounts = responseList[0].fromAccountsList;
		     					self.ownCards.currencyList = responseList[0].currencyList;
		     					self.ownCards.frequencyType = responseList[0].frequencyType;
		     					self.ownCards.promoCode = responseList[0].promoList;
		     					self.ownCards.charges = responseList[0].chargeList;
		     					self.ownCards.purpose = responseList[0].purposeList;

		     					self.ownCards.RemcurrencyList = responseList[0].remCurrencyList;
		     					self.ownCards.remitCurrency = responseList[0].remitCurrency;
		     					self.ownCards.remitCrnFilter=responseList[0].remCrnFilter;
		     					self.ownCards.reasonList=responseList[0].reasonList;
		     					/*self.ownCards.subAccountTypeDesc = responseList[0].fromAccountsList.subAccountTypeDesc;*/
		     					/* XM Changes Start*/
		     					if (responseList[0].hasOwnProperty('benfRestCountryList')) {
		     						self.ownCards.benfRestCountryList = responseList[0].benfRestCountryList;
		     					}
		     					/* XM Changes End*/
		     					self.ownCards.selectedFrequency="O";

		     				}
		            }

					if(self.schedule.schTxnListSubmitBtn=='MODIFY'  && self.common.exchangeRateCall==false){

		            if(responseList[0].hasOwnProperty('fromAccountsList')){
		            	self.ownCards.ownCardsList = responseList[0].ownCardsList;
						self.ownCards.fromAccounts = responseList[0].fromAccountsList;
						self.ownCards.cardsBenfList = responseList[0].cardsBenfList;
						self.ownCards.frequencyType = responseList[0].frequencyType;
						self.ownCards.isBenfAccountSelected=true;
		            }
		            if(responseList.length>1 && responseList[1].hasOwnProperty('benfTypeList') ){
		            	self.ownCards.benfTypeList	= responseList[1].benfTypeList;
					}
		            if(self.schedule.selectedTxn!='' && self.schedule.selectedTxn!=null){
					  self.ownCards.selectedTxn = self.schedule.selectedTxn;
			          if(self.ownCards.benAccounts!='' && self.ownCards.benAccounts!=null){
					        for(var temp in self.ownCards.benAccounts){
			  					if(self.ownCards.benAccounts[temp].cardbeneficiaryNickName==self.ownCards.selectedTxn.toAccount){
			  						self.ownCards.selectedToBenAccount=self.ownCards.benAccounts[temp].cardIndex;
			  						break;
			  					}
			  				}

					        if (self.ownCards.selectedToBenAccount != "") {
								self.ownCards.selectedBenType = self.ownCards.benAccounts[self.ownCards.selectedToBenAccount]['cardBeneficiaryType'].toString();
								self.ownCards.cardPaymentDetails=self.ownCards.benAccounts[self.ownCards.selectedToBenAccount]['cardPaymentDetails'].toString();
								if(self.ownCards.cardPaymentDetails!='' && self.ownCards.cardPaymentDetails!=undefined && self.ownCards.cardPaymentDetails.length >2){
									self.ownCards.showReasonThirdField=false;
								}


								//var paymentDetails= self.ownCards.benAccounts[self.ownCards.selectedToBenAccount]['cardPaymentDetails'].toString();
								if(self.ownCards.selectedBenType==self.CardsBenTypeConstant.WITHINUAE){
								if(self.ownCards.cardPaymentDetails && self.ownCards.cardPaymentDetails.length >4 && self.ownCards.cardPaymentDetails.indexOf('|')==-1){
									self.ownCards.selectedPurpose= self.ownCards.transactionPurposeCodeForNBFI;
									if(rootScope.dashboard.userType=='1'){							
										self.ownCards.selectedPurposeDisp="Credit Card Payments";
										self.ownCards.selectedReason="CRP";
									}
									else {
										self.ownCards.selectedPurposeDisp="Corporate Card Payment";
										self.ownCards.selectedReason="CCP";
									}
									
								}
								else{

									if(rootScope.dashboard.userType=='1'){
										self.ownCards.selectedPurpose="CRP";
										self.ownCards.selectedReason="CRP";
										self.ownCards.selectedPurposeDisp="Credit Card Payments";
									}
									else {
										self.ownCards.selectedPurpose="CCP";
										self.ownCards.selectedReason="CCP";
										self.ownCards.selectedPurposeDisp="Corporate Card Payment";
									}
								}
								
								}
								
								/*for(var temp in self.ownCards.purpose){
									if(self.ownCards.selectedPurpose && self.ownCards.purpose[temp].purposeCode==self.ownCards.selectedPurpose){
										self.ownCards.selectedPurposeDisp=self.ownCards.purpose[temp].purposeDesc;
									}
								}*/
								
								self.ownCards.dummyTxntype="PMT_TRANSFER";
							    // to enable exchange rate fetch
								self.ownCards.isBenfSelected=true;

							}
			          }
				          if(self.ownCards.ownCardsList!='' && self.ownCards.ownCardsList!=''){
						          for(var temp in self.ownCards.ownCardsList){
					  					if(self.ownCards.ownCardsList[temp].unmaskedCardNumber==self.ownCards.selectedTxn.cpEntityId){
					  						self.ownCards.selectedOwnCard=self.ownCards.ownCardsList[temp].cardIndex;
					  						break;
					  					}
					  				}

						          //scope.setEvent('onCardSelected');
				          }

				          if(self.ownCards.cardsBenfList!='' && self.ownCards.cardsBenfList!=''){
					          for(var temp in self.ownCards.cardsBenfList){
				  					if(self.ownCards.cardsBenfList[temp].cardbeneficiaryNickName==self.ownCards.selectedTxn.toAccount){
				  						self.ownCards.selectedPPCard=self.ownCards.cardsBenfList[temp].cardIndex;
				  						self.ownCards.selectedBenfCard=self.ownCards.cardsBenfList[temp].cardIndex;
				  						break;
				  					}
				  				}
				          }

				          if (responseList[0].hasOwnProperty('initorId')) {
		       					self.ownCards.initAcc = Number(responseList[0].initorId);
		       				}
				        for(var temp in self.ownCards.fromAccounts){
		  					if(self.ownCards.fromAccounts[temp].accountNumberUnMasked==self.ownCards.initAcc){
		  						self.ownCards.selectedFromAccount=self.ownCards.fromAccounts[temp].accountIndex;
		  						break;
		  					}
		  				}

				        if(self.ownCards.fromAccounts[self.ownCards.selectedFromAccount]['mainAccountType'].toString()=='OPR')
						{
				        	 self.common.updateBal('onNonRakAccountSelectionBalCall');
						}
				        else if(self.ownCards.fromAccounts[self.ownCards.selectedFromAccount]['mainAccountType'].toString()=='CCD')
						{
				        	 self.common.updateBal('onNonRakAccountSelectionBalCardCall');
						}

				        //scope.setEvent('''');
				        if(self.ownCards.benAccounts!='' && self.ownCards.benAccounts!=null){
							var benfCountry=self.ownCards.benAccounts[self.ownCards.selectedToBenAccount]['cardBeneficiaryCountry'].toString();

							for(var temp in self.ownCards.remitCrnFilter){
								if(benfCountry==self.ownCards.remitCrnFilter[temp]['filterCode']){

									self.ownCards.selectedRCurr=self.ownCards.remitCrnFilter[temp]['filterDesc'];
									self.ownCards.creditCrn=self.ownCards.selectedRCurr;
									break;
								}
							}
				        }

						self.ownCards.selectedCurrency = self.ownCards.selectedTxn.txnCurrency;
						self.ownCards.debitCrn=self.ownCards.selectedCurrency;

						 if(self.ownCards.currencyList!='' && self.ownCards.currencyList!=null){
							self.ownCards.txnCurrencyArray=[];
							for(var temp in self.ownCards.currencyList){
								if(self.ownCards.currencyList[temp]['currencyCode']==self.ownCards.debitCrn || self.ownCards.currencyList[temp]['currencyCode']==self.ownCards.creditCrn){
									self.ownCards.txnCurrencyArray.push(self.ownCards.currencyList[temp]);
								}

							}
						 }
                      self.ownCards.selectedRCurr=self.ownCards.remitCurrency ?  self.ownCards.remitCurrency :self.ownCards.selectedRCurr;
						 if(self.ownCards.RemcurrencyList!='' && self.ownCards.RemcurrencyList!=null){
							for(var temp in self.ownCards.RemcurrencyList){
			  					if(self.ownCards.RemcurrencyList[temp].currencyCode==self.ownCards.selectedRCurr){
			  						self.ownCards.selectedRCurr=self.ownCards.RemcurrencyList[temp].currencyCode;
			  						break;
			  					}
			  				}
						 }
						 if (responseList[0].hasOwnProperty('entRemarks')) {
							 self.ownCards.reason = responseList[0].entRemarks;
	        				}

						 if (responseList[0].hasOwnProperty('installments') && responseList[0].installments!=1) {
							 self.ownCards.noOfTransfer = Number(responseList[0].installments);
	        				}


						self.ownCards.amount = Number(self.ownCards.selectedTxn.txnAmount.replace(',',''));
						self.common.dd = new Date(self.ownCards.selectedTxn.txnDate, 'DD-MM-YY');

						if(Object.prototype.toString.call(self.common.dd) === "[object Date]"){
							if(isNaN(self.common.dd.getTime())){
								if(self.ownCards.selectedTxn.txnDate.indexOf("/")!=-1){
									self.common.displayDate = new Date(self.ownCards.selectedTxn.txnDate.split('/')[1]+"/"+
											self.ownCards.selectedTxn.txnDate.split('/')[0]+"/"+self.ownCards.selectedTxn.txnDate.split('/')[2]);
								}
								else{
									self.common.displayDate = new Date(self.ownCards.selectedTxn.txnDate.split('-')[1]+"/"+
											self.ownCards.selectedTxn.txnDate.split('-')[0]+"/"+self.ownCards.selectedTxn.txnDate.split('-')[2]);
								}
							}
							else{
								self.common.displayDate = self.common.dd;
							}
						}
						else{
							self.common.displayDate = self.common.dd;
						}

						if(self.ownCards.charges!='' && self.ownCards.charges!=''){
					          for(var temp in self.ownCards.charges){
				  					if(self.ownCards.charges[temp].chargeCode==responseList[0].chargeInd){
				  						self.ownCards.selectedCharges=self.ownCards.charges[temp].chargeCode;
				  						break;
				  					}
				  				}
						}

						if(self.ownCards.frequencyType!='' && self.ownCards.frequencyType!=null){
							for(var temp in self.ownCards.frequencyType){
			  					if(self.ownCards.frequencyType[temp].frequencyTypeCode==self.ownCards.selectedTxn.txnFrequency){
			  						self.ownCards.selectedFrequency=self.ownCards.frequencyType[temp].frequencyTypeCode;
			  						self.ownCards.selectedFrequencyDisp = self.ownCards.frequencyType[temp].frequencyTypeDesc;
			  						break;
			  					}
			  				}
						}
						//self.ownCards.selectedFrequencyDisp=self.ownCards.selectedTxn.txnFrequency;
						self.schedule.toAccountDisp = rootscope.appLiterals.APP.RAKSEND_MONEY.RAKTRANSFERS_PAYNOW_PAGE.PLCHOLDER_TO +" : "+self.schedule.selectedTxn.toAccount;
				}

						if(responseList[0].hasOwnProperty('availCreditLimit') ){
			            	self.ownCards.creditLimit	= responseList[0].availCreditLimit;
						}
						if(self.ownCards.benAccounts && self.ownCards.selectedToBenAccount){
							self.ownCards.rakBenfResidentCountry='';
						
							
							var benType = self.ownCards.benAccounts[self.ownCards.selectedToBenAccount]['cardBeneficiaryType'].toString();
							 var withinUAEBenfCountryAvailable = self.ownCards.benAccounts[self.ownCards.selectedToBenAccount]['withinUAEBenfCountryAvailable'];
							 self.ownCards.withinUAEBenfCountryAvailable= withinUAEBenfCountryAvailable ;
							 
							 if (benType == 'UCC' && self.ownCards.selectedRCurr && self.ownCards.selectedRCurr != "AED" && withinUAEBenfCountryAvailable && withinUAEBenfCountryAvailable=='N') {
								 self.ownCards.showUBFResidentCountry = "YES";
							 } else{
								 self.ownCards.showUBFResidentCountry = "NO";
							 }
						}
						
						var txnType='';

						if(rootScope.rakPendingApproval.pendingApprovalTab=='PIA'){
							txnType = self.schedule.selectedTxn.effTxnType;
						}
						else{
							txnType = self.schedule.selectedTxn.txnType;
						}

						if(txnType==self.TxnTypeConstant.WITHINUAE ||
								txnType==self.TxnTypeConstant.OUTSIDEUAE){
							if(responseList[0].entRemarks!='' && responseList[0].entRemarks!=undefined){
								var reasonArray = responseList[0].entRemarks.split('~');
								
								
								if(reasonArray && reasonArray[0] && reasonArray[0].length > 10 ){
									reasonArray.splice(0,1);
								}
								
								
								if(self.ownCards.reasonList!='' && self.ownCards.reasonList!=''){
							          for(var temp in self.ownCards.reasonList){
						  					if(self.ownCards.reasonList[temp].reasonCode==reasonArray[0]){
						  						self.ownCards.selectedReason=self.ownCards.reasonList[temp].reasonCode;
						  						break;
						  					}
						  				}
								}

								self.ownCards.reason1 = reasonArray[1];
								self.ownCards.reason2 = reasonArray[2];
								self.ownCards.reason3 = reasonArray[3];
								
								self.ownCards.selectedReason1 = reasonArray[1];
								self.ownCards.selectedReason2 = reasonArray[2];
								self.ownCards.selectedReason3 = reasonArray[3];
							}
						}
						else{
							self.ownCards.selectedReason = responseList[0].entRemarks;
						}


			            if(self.ownCards.selectedCardBenfType!=undefined && self.ownCards.selectedCardBenfType==self.TxnTypeConstant.OWNCARDS)	{
			            	self.ownCards.lastStatmentBalanceDisplay=responseList[0].lastStatmentBalance;
			            	self.ownCards.lastStatmentBalance=rootscope.appLiterals.APP.RAKPAYCARDS.RAKPAYCARDSINITPAGE.LASTSTATEMENT+" "+responseList[0].lastStatmentBalance;
							self.ownCards.currentBalance=rootscope.appLiterals.APP.RAKPAYCARDS.RAKPAYCARDSINITPAGE.CURRBAL+" "+responseList[0].currentBalance;
							self.ownCards.minAmountDue=responseList[0].minAmountDue;
							self.ownCards.minAmountDueDisplay=rootscope.appLiterals.APP.RAKPAYCARDS.RAKPAYCARDSINITPAGE.MINAMTDUE+" "+responseList[0].minAmountDue;
							self.ownCards.totAmountDue=responseList[0].totAmountDue;
							self.ownCards.paymentDueDate=rootscope.appLiterals.APP.RAKPAYCARDS.RAKPAYCARDSINITPAGE.PAYMENTDUEDATE+" "+responseList[0].paymentDueDate;
							self.ownCards.siAmt=rootscope.appLiterals.APP.RAKPAYCARDS.RAKPAYCARDSINITPAGE.STANDINGINSTRAMT+" "+responseList[0].siAmt;;
							self.ownCards.siDate=rootscope.appLiterals.APP.RAKPAYCARDS.RAKPAYCARDSINITPAGE.STANDINGINSTRDATE+" "+responseList[0].siDate;;
							self.ownCards.siStatusDisplay=rootscope.appLiterals.APP.RAKPAYCARDS.RAKPAYCARDSINITPAGE.Status+" "+responseList[0].siStatusDesc;
							self.ownCards.siStatus=responseList[0].siStatus;
							self.ownCards.minAmtTab=true;
							if(self.ownCards.selectedCardBenfType!=undefined && self.ownCards.selectedCardBenfType==self.TxnTypeConstant.OWNCARDS)
								self.ownCards.amount= self.ownCards.minAmountDue.toString();

							self.ownCards.ownamount= Number(self.ownCards.selectedTxn.txnAmount);
			            }
					}
						//self.ownCards.isCardSelected=true;
					
					
					// Added for exhange rate data handling
					if(self.common.exchangeRateCall){
					self.ownCards.exchangeRate = responseList[0].exchangeRate;
     				self.ownCards.convertedAmt=responseList[0].convertedAmt;

					}

	           }

			//}

		}
	},

	initSchedulehistoryDetails:function(responsesList)
	{
		if(!responsesList[0].hasOwnProperty('errorMessage') && !self.common.fromAuthPage && rootScope.rakCorpInit.corpModel.backFlag !='Y' ){
			self.schedule.initorID=responsesList[0].initorID;
			self.schedule.installments=responsesList[0].installments;
			self.schedule.entRemarks=responsesList[0].entRemarks;
			self.schedule.chargeInd=responsesList[0].chargeInd;
			self.schedule.selPurpose=responsesList[0].selPurpose;
			self.schedule.initorType=responsesList[0].initorType;
			self.schedule.recFreq=responsesList[0].recFreq;
			self.schedule.cardNumber=responsesList[0].cardNumber;
			self.schedule.selectedReason=responsesList[0].SELECTEDREASON;
		    self.schedule.selectedReason1=responsesList[0].ENTEREDREASON1;
		    self.schedule.selectedReason2=responsesList[0].ENTEREDREASON2;
		    self.schedule.selectedReason3=responsesList[0].ENTEREDREASON3;
		    self.schedule.debitAmount=responsesList[0].debitAmt;
		    self.schedule.chargeAmount=responsesList[0].chargeAmt;
		    self.schedule.displayAccount=responsesList[0].displayAccount;
		    self.schedule.noOfInstanceLeft=responsesList[0].noOfInstanceLeft;
		    self.schedule.beneficiaryName=responsesList[0].beneficiaryName;
		    
		    if (responsesList[0].hasOwnProperty('stoppedTxns')){
				self.schedule.stoppedTxnList = responsesList[0].stoppedTxns;
			}

		}
	},
	initStopTransferAuth : function(responsesList) {
		if(!responsesList[0].hasOwnProperty('errorMessage') && rootScope.rakCorpInit.corpModel.backFlag !='Y'){
			if(responsesList[0].hasOwnProperty('instanceList')){

				self.schedule.immediateDueOn = responsesList[0].instanceList[0].immediatePaymentDueOn;
				self.schedule.instanceArray=JSON.stringify(responsesList[0].instanceList);

			if(responsesList[0].auth == ""){
					self.schedule.authStatus=false;
					self.common.isAuthSet = false;
			}
				else
				{
					self.schedule.authStatus=true;
					self.common.isAuthSet = true;
					self.schedule.authFlag = responsesList[0].auth;
				}
		}
		}
	},
	/*	initStopTransferAfterAuth : function(responseList) {
		if (responseList[0].hasOwnProperty('errorMessage')) {
			self.common.isStatusError = true;
			self.common.successMessage = responseList[0].errorMessage;
		} else
			self.common.successMessage = responseList[0].scheduleStopresponse;
		self.schedule.isScheduleStopped = true;
		self.schedule.isAuthSent = false;
		},*/

		getSubmitEvent : function(){
			var event;
			if(self.schedule.schTxnListSubmitBtn=='MODIFY' && rootScope.rakPendingApproval.pendingApprovalTab!='PIA'){
				event = "onConfirmModifyTransferClick";
			}
			else if(self.schedule.schTxnListSubmitBtn=='MODIFY' && rootScope.rakPendingApproval.pendingApprovalTab=='PIA'){
				event = "onPPCardsSubmit";
			}
			else{
				event = "onPPCardsSubmit";
			}

			return event;
		},

		///
//added for stop instance

		initImmediateStopTransfer : function(responsesList) {

			if(!responsesList[0].hasOwnProperty('errorMessage')){
				if(responsesList[0].hasOwnProperty('message')){
					self.common.successMessage = responsesList[0].message;
				}

				if(!responsesList[0].hasOwnProperty('errorMessage') && !self.schedule.isBackclicked && responsesList[0].hasOwnProperty('instanceList')){
					self.schedule.instanceList = responsesList[0].instanceList;

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
				rootscope.showErrorPopup(rootscope.appLiterals.APP.RAK_COMMON.MANDFILED);
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

		initStopInstanceSuccessPage : function(responseList) {
			self.common.successMessage = responseList[0].message;
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
	   	//RAK DEV CHNAGES FOR BUY/SELL GOLD HISTORY START
	   		transactionTypeList:[],
	   		selectedTransactionType:"",
	   	//RAK DEV CHNAGES FOR BUY/SELL GOLD HISTORY END
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
			//RAK DEV CHNAGES SENDING TXN_TYPE START
			selectedBuySellAgainTxnType:"",
			fromInitPage:false,
			message:'',
			//RAK DEV CHNAGES SENDING TXN_TYPE END
			directView:"",
			transaction:[],
			transactionIndex:"",
			cardNumber:"",
			debitAmt:"",
			channelId:'',
			failReason:'',


			initDetailsPage:function(responseList){

				if(responseList[0].hasOwnProperty('cardNumber')){
					self.txnHistory.cardNumber = responseList[0].cardNumber;
				}
				if(responseList[0].hasOwnProperty('debitAmt')){
					self.txnHistory.debitAmt = responseList[0].debitAmt;
				}
				
				if(responseList[0].hasOwnProperty('XAUGRAMEQT')){
					self.common.eqtXAU=responseList[0].XAUGRAMEQT;
				}

				self.txnHistory.channelId=responseList[0].channelId;
				self.txnHistory.failReason=responseList[0].failReason;


			},

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

						//RAK DEV CHNAGES FOR BUY/SELL GOLD HISTORY START
						if (responseList[0].hasOwnProperty('transactionTypeList')) {
							self.txnHistory.transactionTypeList = responseList[0].transactionTypeList;
						}

					    if(responseList[0].selectedTxnType=='')
							{
							self.txnHistory.selectedTransactionType=responseList[0].transactionTypeList[0].tranCode;
							}
						//RAK DEV CHNAGES FOR BUY/SELL GOLD HISTORY END

                          self.txnHistory.selectedTxnType = responseList[0].selectedTxnType;

                          //RAK DEV CHANGES FOR PROUAT START
                          self.txnHistory.message=responseList[0].message;
                          //RAK DEV CHANGES FOR PROUAT END
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

					//RAK DEV CHANGES FOR BUY/SELL GOLD AGAIN START
					getTransactionDetails : function() {
						if(self.rakInvGold.exchangeFlag==true && scope.rakPayee.payCard.selectedCompltTxn.txnType=='Buy Gold')
							{
							 self.rakInvGold.dummyTxntype="XFR_TRANSFER";
							self.rakInvGold.transactionType = self.BUYSELLGOLDTRANSACTIONTYPE.BUY;

							if(self.rakInvGold.frequencyType && self.rakInvGold.selectedFrequency && self.rakInvGold.selectedFrequency!='O' ){
											for(var temp in self.rakInvGold.frequencyType){
							  					if(self.rakInvGold.frequencyType[temp].frequencyTypeDesc==self.rakInvGold.selectedFrequency){
							  						self.rakInvGold.selectedFrequency=self.rakInvGold.frequencyType[temp].frequencyTypeCode;
							  						self.rakInvGold.selectedFrequencyDisp = self.rakInvGold.frequencyType[temp].frequencyTypeDesc;
							  						break;
							  					}
							  				}
										}


							//self.rakInvGold.selectedFrequency=scope.rakPayee.payCard.selectedCompltTxn.freqType;
							self.rakInvGold.quantity=Number(scope.rakPayee.payCard.selectedCompltTxn.txnAmount);
							self.rakInvGold.selectedGoldAccount=scope.rakPayee.payCard.selectedCompltTxn.toAccount;

							 //RAK DEV CHANGES FETCHING FROM ACCOUNT SELECTED ACCOUNT INDEX START
							for(var i=0;i<self.rakInvGold.fromAccounts.length;i++)
							{
								if(scope.rakPayee.payCard.selectedCompltTxn.fromAccount==self.rakInvGold.fromAccounts[i].accountNumber)
									{
									  self.rakInvGold.selectedBeneficiaryIndex=self.rakInvGold.fromAccounts[i].accountIndex;
							         }
							}

							for(var j=0;j<self.rakInvGold.goldAccounts.length;j++)
							{
								if(scope.rakPayee.payCard.selectedCompltTxn.toAccount==self.rakInvGold.goldAccounts[j].accountNumber)
									 {
									  self.rakInvGold.selectedGoldIndex=self.rakInvGold.goldAccounts[j].accountIndex;
									  self.rakInvGold.selectedGoldAccNum=self.rakInvGold.goldAccounts[j].accountNumber;
							         }
							}
							self.rakInvGold.selectedFromAccount=self.rakInvGold.selectedBeneficiaryIndex;
							self.rakInvGold.selectedGoldAccountDisplay=self.rakInvGold.selectedGoldAccNum;
							self.rakInvGold.selectedGoldAccount=self.rakInvGold.selectedGoldIndex;


							if(self.rakInvGold.exchangeFlag==true)
							{
							self.rakInvGold.exchangeFlag=false;
							self.rakInvGold.updateForBalCallSendAgain('onAccountSelectionBalExchgCall');
							}

								self.rakInvGold.creditIndex=self.rakInvGold.selectedGoldIndex;
						}

						//RAK DEV CHNAGES FOR SELL GOLD AGAIN START (&& self.rakInvGold.exchangeFlag==true)
						else if(self.rakInvGold.exchangeFlag==true && scope.rakPayee.payCard.selectedCompltTxn.txnType=='Sell Gold')
							{


							if(self.rakInvGold.frequencyType){
											for(var temp in self.rakInvGold.frequencyType){
												if(self.rakInvGold.frequencyType[temp].frequencyTypeDesc==self.rakInvGold.selectedFrequency){
							  						self.rakInvGold.selectedFrequency=self.rakInvGold.frequencyType[temp].frequencyTypeCode;
							  						self.rakInvGold.selectedFrequencyDisp = self.rakInvGold.frequencyType[temp].frequencyTypeDesc;
							  						break;
							  					}
							  				}
										}


							//self.rakInvGold.selectedFrequency=scope.rakPayee.payCard.selectedCompltTxn.freqType;
							self.rakInvGold.quantity=Number(scope.rakPayee.payCard.selectedCompltTxn.txnAmount);
							self.rakInvGold.selectedGoldAccount=scope.rakPayee.payCard.selectedCompltTxn.toAccount;
							 //RAK DEV CHANGES FETCHING FROM ACCOUNT SELECTED ACCOUNT INDEX START

							for(var i=0;i<self.rakInvGold.benAccounts.length;i++)
							{
								if(scope.rakPayee.payCard.selectedCompltTxn.benfNickName==self.rakInvGold.benAccounts[i].beneficiaryNickName)
									{
									  self.rakInvGold.selectedBeneficiaryIndex=self.rakInvGold.benAccounts[i].beneficiaryIndex;
									  self.rakInvGold.selectedBeneficiaryDisplay=self.rakInvGold.benAccounts[i].bankName+" "+self.rakInvGold.benAccounts[i].beneficiaryNickName;
									  self.rakInvGold.selectedRCurr=self.rakInvGold.benAccounts[i].beneficiaryAccountCurrency;
									  self.rakInvGold.selectedBenfFlag=true;
									  self.rakInvGold.transactionType='TXNSELLBNF';
									  self.rakInvGold.dummyTxntype='PMT_TRANSFER';
									  self.rakInvGold.selectedBenType='';
									  break;
							         }
							}

							for(var k=0;k<self.rakInvGold.fromAccounts.length;k++)
							{
								if(scope.rakPayee.payCard.selectedCompltTxn.toAccount==self.rakInvGold.fromAccounts[k].accountNumber)
									{
									  self.rakInvGold.selectedFromIndex=self.rakInvGold.fromAccounts[k].accountIndex;
									  self.rakInvGold.selectedBenfFlag=false;
									  self.rakInvGold.selectedRCurr=self.rakInvGold.fromAccounts[k].currencyCode;
									  self.rakInvGold.transactionType='TXNSELLACT';
									  self.rakInvGold.dummyTxntype="XFR_TRANSFER";
									  self.rakInvGold.selectedBenType='OWNACT';
									  break;
							         }
							}



				           for(var j=0;j<self.rakInvGold.goldAccounts.length;j++)
							{
								if(scope.rakPayee.payCard.selectedCompltTxn.fromAccount==self.rakInvGold.goldAccounts[j].accountNumber)
									 {
									  self.rakInvGold.selectedGoldIndex=self.rakInvGold.goldAccounts[j].accountIndex;
									  self.rakInvGold.selectedGoldAccNum=self.rakInvGold.goldAccounts[j].accountNumber;
									  break;
							         }
							}

				            if(self.rakInvGold.selectedBeneficiaryIndex!='')
				        	{
				            self.rakInvGold.selectedToBenAccount=self.rakInvGold.selectedBeneficiaryIndex;
				        	}

				            if(self.rakInvGold.selectedFromIndex!='')
				        	{
							self.rakInvGold.selectedToAccount=self.rakInvGold.selectedFromIndex;
				        	}

				            if(self.rakInvGold.selectedGoldAccNum!='')
				        	{
							self.rakInvGold.selectedGoldAccountDisplay=self.rakInvGold.selectedGoldAccNum;
							}

				            if(self.rakInvGold.selectedGoldIndex!='')
				        	{
							self.rakInvGold.selectedGoldAccount=self.rakInvGold.selectedGoldIndex;
				        	}

				            //RAK DEV CHANGES FOR SENDING CREDIT ACC INDEX FOR SELF OR BENF TYPE START
                            if(self.rakInvGold.selectedBenType=='OWNACT')
                            	{
                            	self.rakInvGold.creditIndex=self.rakInvGold.selectedToAccount;
                            	}
                            else
                            	{
                            	self.rakInvGold.creditIndex=self.rakInvGold.selectedToBenAccount;
                            	}


				            if(self.rakInvGold.exchangeFlag)
							{
							self.rakInvGold.exchangeFlag=false;
							self.rakInvGold.selectedFromAccount=self.rakInvGold.selectedGoldAccount;
							self.rakInvGold.updateBalCallSendAgain('onAccountSelectionBalExchgCall');
							//scope.setEvent('onGoldAccountSelectionBalCall');
							}

						}

						},

					getPageEvent: function() {
						if(scope.rakPayee.payCard.selectedCompltTxn.txnType=='Buy Gold')
							{
							   self.txnHistory.selectedBuySellAgainTxnType='GBU';
							   self.rakInvGold.clearTab();
							   self.rakInvGold.Buy=true;
							   self.txnHistory.fromInitPage=false;
							  return 'onRAKBuyGoldInitiateFromHistory';
							}
						else if(scope.rakPayee.payCard.selectedCompltTxn.txnType=='Sell Gold')
							{
							    self.txnHistory.selectedBuySellAgainTxnType='GSE';
							    self.rakInvGold.clearTab();
							    self.rakInvGold.Sell=true;
							    self.txnHistory.fromInitPage=false;
							    return 'onRAKSellGoldInitiateFromHistory';
							}
						},


						getEventForGoldsBack: function() {
						   if(self.txnHistory.fromInitPage==true || self.rakInvGold.Buy==true|| self.rakInvGold.Sell==true)
							  {
							   return 'onTransfersAuthBackClick';
							  }
							else if(self.txnHistory.selectedBuySellAgainTxnType=='GBU')
								{
								  return 'onRAKBuyGoldBack';
								}
							else if(self.txnHistory.selectedBuySellAgainTxnType=='GSE')
								{
								   return 'onRAKSellGoldBack';
								}
							},


					//RAK DEV CHANGES FOR BUY/SELL GOLD AGAIN END

					//RAK DEV CHANGES SHOWING STATUS OF TRANSACTION IN BUY/SELL GOLD TRANSACTION HISTORTY START
					getBuySellTransactionStatus : function() {
						rootscope.showAlert('Transaction Status is :'+rootscope.rakPayee.payCard.selectedCompltTxn.txnStatus);
						},
				   //RAK DEV CHANGES SHOWING STATUS OF TRANSACTION IN BUY/SELL GOLD TRANSACTION HISTORTY END

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
							self.txnHistory.transactionIndex='',
							self.txnHistory.transaction=[],
							self.txnHistory.channelId='',
							self.txnHistory.failReason=''

		    			},
		    			initAuthPage : function(responsesList) {
		    				if(!responsesList[0].hasOwnProperty('errorMessage')){


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
		    				self.common.successMessage = responseList[0].message;
		    			}






	    };
};