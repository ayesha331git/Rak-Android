App.viewModels.rakAccounts = function(scope,rootScope, Logger) {

	var self = this;
	
	self.myProducts={
			navigationType:'',
			navigationFlag:false
		
	};
	
	
	
	self.backNavigation = function() {
		
		if(self.myProducts.navigationFlag==false)
		{
			scope.setGlobalEvent('onDashboardClick');
		}
		else if(self.myProducts.navigationType=='ProductsAccounts' && self.myProducts.navigationFlag==true)
			{
				scope.setGlobalEvent('onOperativeListClick');
			}
		else if(self.myProducts.navigationType=='TradeAccounts' && self.myProducts.navigationFlag==true)
		{
			scope.setGlobalEvent('onTradeAccountListClick');
		}
		
		else if(self.myProducts.navigationType=='ProductsCards' && self.myProducts.navigationFlag==true)
		{
			scope.setGlobalEvent('onCreditAccountClick');
		}
		else if(self.myProducts.navigationType=='ProductsDeposit' && self.myProducts.navigationFlag==true)
		{
			scope.setGlobalEvent('onDepositListClick');
		}
		else if(self.myProducts.navigationType=='ProductsLoan' && self.myProducts.navigationFlag==true)
		{
			scope.setGlobalEvent('onLoanListClick');
		}
		else if(self.myProducts.navigationType=='ProductsInvestment' && self.myProducts.navigationFlag==true)
		{
			scope.setGlobalEvent('onInvestmentListClick');
		}
		else if(self.myProducts.navigationType=='ProductsGold' && self.myProducts.navigationFlag==true)
		{
			scope.setGlobalEvent('onGoldListClick');
		}
		
		
	};


	
	self.RAKAccountsModel = {
		iban : " ",
		branch : "",
		currency : "",
		currentBal : "",
		legderBal : "",
		availableBal : "",
		unclearFunds : "",
		overDraftLimit : "",
		amountOnHold : "",
		netAvailBal : "",
		depAmount : "",
		depStartDate : "",
		revBalance : "",
		debAccNo : "",
		jointstatus : "",
		jointName1 : "",
		jointName2 : "",
		jointName3 : "",
		maturityInstruction : "",
		nomination : "",
		operativeResponse : [],
		operativeTransactions:[],
		selectedAccount : "",
		positionValue : "",
		index : "",
		acccountIndex : "",
		paymentMode : "",
		operativeAccounts : [],
		tradeFinanceAccounts:[],
		depositAccounts : [],
		loanAccounts : [],
		goldAccounts : [],
		creditAccounts : [],
		invtAccounts:[],
		invPortfolioList:[],
		accountsResponse : [],
		loanAssetDetails:[],
		trxSearchFlag : false,
		type : "",
		selectedAccountTemp : "",
		nickName : "",
		accountChequeStatus : "",
		accountChequeDate : "",
		accountChequeNumber : "",
		accountBranchname : "",
		accountBankName : "",
		accountCurrency : "",
		accountChequeBranchId : "",
		accountDrawnAmount : "",
		tempchequeNumber : "",
		accountType : "",
		goldSellRate : "",
		goldBuyRate : "",
		goldCostPrice : "",
		goldInAed : "",
		productType : "",
		disbursedAmt : "",
		outstandingLoan : "",
		sanctionDate : "",
		frequency:"",
		interestRate : "",
		nextInstallmentDate : "",
		paymentMode : "",
		fundingAccNumber : "",
		overDueAmount : "",
		tenor : "",
		totalAmtPaid : "",
		installmentAmt : "",
		totalAmtPaid : "",
		rakbankaccount : "",
		agreementNumber : "",
		loanPeriodMonths : "",
		loanPeriodDays : "",
		periodMonths : "",
		periodDays : "",
		currency : "",
		creditCardNo : "",
		currentBalance : "",
		totalAmountDue : "",
		minAmtDue : "",
		dueDate : "",
		availableCreditLimit : "",
		statementDate : "",
		totalcreditlimit : "",
		availableCashLimit : "",
		expDate : "",
		totalCashLimit : "",
		cardHolderName : "",
		customerLimit : "",
		nameOnCard : "",
		Literals_openingBal : "",
		Literals_closingBal : "",
		Literals_earnedPoints : "",
		Literals_redeemedPoints : "",
		tempIndex : "0",
		accountNickName:"",
		subAccountType:"",
		yearList: [],
		monthList: [],
		date : "",
		month : "",
		year :"",
		maturityDate:"",
		TxnType:"1",
		transactionsList:[],
		sanctionLimit:"",
		maturityAmount:"",
		assetType:"",
		assetDesc:"",
		manufacture:"",
		mainAccountType:"",
		dealer:"",
		regNo:"",
		regEmiNumber:"",
		propertyLoc:"",
		houseNum:"",
		streetName:"",
		developerName:"",
		constructionStatus:"",
		projectName:"",
		displayFullRemarks:null,
		transactionsPortfolioList:[],
		trxDetailsPortfolioFlag:"",
		monthSelected:"",
		tempYearList:"",
		isIslamicPresent:false,
		isConventionalPresent:false,
		profileSelectedAccount:"",
		clearTxnList:"",
		ccCombinedLimitFlag:false,
		rollOverAmt:"",
		pdfMsgMail:"",
		showPopup :false,
		loanLimit:"",
		odExpiryDate:"",
		subType:'',
		goldAmtInXAU:""
};

self.AccountConstant={

		ACCOUNT_OPR:'OPR',
		ACCOUNT_DEP:'DEP',
		ACCOUNT_LON:'LON',
		ACCOUNT_GLD:'GLD',
		ACCOUNT_CCD:'CCD',
		ACCOUNT_MTF:'MTF',



};
		
self.initCCPrimaryTransactionRecords =function(position){
	if(self.RAKAccountsModel.operativeTransactions){
	for(var i=0;i<self.RAKAccountsModel.operativeTransactions.length;i++){
		if(position==i){
			//showing cross image on click of particular transaction
			self.RAKAccountsModel.operativeTransactions[i].fullRmrks=!self.RAKAccountsModel.operativeTransactions[i].fullRmrks;
			continue;
		}
	  //showing all other transactions with dot	image
	  self.RAKAccountsModel.operativeTransactions[i].fullRmrks=false;
	}
	}
};

self.initCCSecondaryTransactionRecords =function(position){
	if(self.RAKAccountsModel.secondaryCCTransactions){
	for(var i=0;i<self.RAKAccountsModel.secondaryCCTransactions.length;i++){
		if(position==i){
			//showing cross image on click of particular transaction
			self.RAKAccountsModel.secondaryCCTransactions[i].fullRmrks=!self.RAKAccountsModel.secondaryCCTransactions[i].fullRmrks;
			continue;
		}
	  //showing all other transactions with dot	image
	  self.RAKAccountsModel.secondaryCCTransactions[i].fullRmrks=false;
	}
	}
};

//CHANGES DONE AS FIX OF PROUAT-3750 and PRCU-1727 START
self.initTransactionRecords =function(position){
	if(self.RAKAccountsModel.accountsTransaction){
	for(var i=0;i<self.RAKAccountsModel.accountsTransaction.length;i++){
		if(position==i){
			//showing cross image on click of particular transaction
			self.RAKAccountsModel.accountsTransaction[i].fullRmrks=!self.RAKAccountsModel.accountsTransaction[i].fullRmrks;
			continue;
		}
	  //showing all other transactions with dot	image
	  self.RAKAccountsModel.accountsTransaction[i].fullRmrks=false;
	}
	}
};


self.checkDiv=function(input){
	console.log('DIV TESTING'+input);
	self.initTransactionRecords(20000);
	
	if(jQuery('span.image_2x').is(':visible')){
		
		jQuery('span.image_2x').click(function(event)
			{
			 event.stopPropagation();
			});
	}
	return;
};
//CHANGES DONE AS FIX OF PROUAT-3750 and PRCU-1727 END

		self.getInvList = function(response){
			
			//self.invGoldList=response[1].hasOwnProperty('goldAccountsList');
			if (response!=null && response[1].hasOwnProperty('goldAccountsList')){
			self.goldAccountsList=response[1].goldAccountsList;
			}
			
			
			//self.invList=response[0].hasOwnProperty('invAccountsList');
		};

	self.populateCurrentDateDetails = function() {

		var count = 0;
		var date = new Date();
		date.setMonth(date.getMonth() - 1);
		var monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
				"Aug", "Sep", "Oct", "Nov", "Dec" ];
		var result = [];
		var temp;
		while (count < 11) {
			temp = monthNames[date.getMonth()] + "-" + date.getFullYear();
			result.push({
				"yearName" : temp,
				"yearValue" : date.getMonth() + 1 + "-" + date.getFullYear()
			});
			count++;
			date.setMonth(date.getMonth() - 1);
		}
		return result;

	};
	self.setIslamicflagDisplay = function(response,key) {

		if(response.hasOwnProperty(key)){

			var acctList = response[key];
			var acctStatus = {"isIslamic":false,"isConventional":false};
			jQuery(acctList).each(function(index,value){
				if (null != value){

				if(value.isIslamicAcct=='Y'){
					acctStatus.isIslamic=true;
				} else if(value.isIslamicAcct!='Y'){
					acctStatus.isConventional=true;
				}
			}
			});
			return acctStatus;
		}
	};

		self.onInvPortfolioChange=function (){
			self.RAKAccountsModel.trxDetailsPortfolioFlag =false;
			return "onInvPortfolioChange";
		};


	self.chequeLodgedDetails = function(responseList) {

		if (responseList == null) {
			return;
		}

		if (!responseList[0].hasOwnProperty('errorMessage')) {
		}

		self.RAKAccountsModel.accountChequeStatus = responseList[0].accountChequeStatus;
		self.RAKAccountsModel.accountChequeDate = responseList[0].accountChequeDate;
		self.RAKAccountsModel.accountChequeNumber = responseList[0].accountChequeNumber;
		self.RAKAccountsModel.accountBranchname = responseList[0].accountBranchname;
		self.RAKAccountsModel.accountBankName = responseList[0].accountBankName;
		self.RAKAccountsModel.accountCurrency = responseList[0].accountCurrency;
		self.RAKAccountsModel.accountChequeBranchId = responseList[0].accountChequeBranchId;
		self.RAKAccountsModel.accountDrawnAmount = responseList[0].accountDrawnAmount;

	};


	self.transactionRemarks=function(index){
		self.RAKAccountsModel.displayFullRemarks=null;

	};
	self.showTxnRmrks=function(remarks){
		self.RAKAccountsModel.displayFullRemarks=remarks;
	};
	self.swiperFalg = "unClicked";

	self.initPage = function(responsesList, accountType) {
		if (responsesList == null) {
			return;
		}
		self.RAKAccountsModel.accountType = accountType;

		if(self.swiperFalg == "unClicked"){
			
		if (accountType == "OPR") {

			if (responsesList[2] != null) {
			self.RAKAccountsModel.iban = responsesList[2].accountIbanNumber;
			self.RAKAccountsModel.branch = responsesList[2].accountbranch;
			self.RAKAccountsModel.currency = responsesList[2].accountCurrencyCode;
			self.RAKAccountsModel.legderBal = responsesList[2].accountLedgerBalance;
		  //self.RAKAccountsModel.availableBal = responsesList[2].accountAvailableBalance;
			self.RAKAccountsModel.unclearFunds = responsesList[2].accountUnClearBalance;
			self.RAKAccountsModel.overDraftLimit = responsesList[2].accountOverDraftLimit;
			self.RAKAccountsModel.amountOnHold = responsesList[2].accountAmtHold;
			self.RAKAccountsModel.currentBal = responsesList[2].accountAvailableBalance;
			self.RAKAccountsModel.netAvailBal = responsesList[2].accountnetAvailableBalance;
			self.RAKAccountsModel.accountNickName = responsesList[2].accountNickName;
			self.RAKAccountsModel.odExpiryDate = responsesList[2].odExpiryDate;
			}
			else if (responsesList[0] != null && !(responsesList[0].hasOwnProperty('errorMessage')) && !(responsesList[0].hasOwnProperty('updateNickName'))){
				self.RAKAccountsModel.iban = responsesList[0].accountIbanNumber;
				self.RAKAccountsModel.branch = responsesList[0].accountbranch;
				self.RAKAccountsModel.currency = responsesList[0].accountCurrencyCode;
				self.RAKAccountsModel.legderBal = responsesList[0].accountLedgerBalance;
			  //self.RAKAccountsModel.availableBal = responsesList[0].accountAvailableBalance;
				self.RAKAccountsModel.unclearFunds = responsesList[0].accountUnClearBalance;
				self.RAKAccountsModel.overDraftLimit = responsesList[0].accountOverDraftLimit;
				self.RAKAccountsModel.amountOnHold = responsesList[0].accountAmtHold;
				self.RAKAccountsModel.currentBal = responsesList[0].accountAvailableBalance;
				self.RAKAccountsModel.netAvailBal = responsesList[0].accountnetAvailableBalance;
				self.RAKAccountsModel.accountNickName = responsesList[0].accountNickName;
				self.RAKAccountsModel.odExpiryDate = responsesList[0].odExpiryDate;
			}
		}

		if (accountType == "GLD") {
			console.log("Rak Account Gold Inside");
			if (responsesList[0] != null && !(responsesList[0].hasOwnProperty('errorMessage')) && !(responsesList[0].hasOwnProperty('updateNickName'))){
			self.RAKAccountsModel.goldSellRate = responsesList[0].goldSellRate;
			self.RAKAccountsModel.goldBuyRate = responsesList[0].goldBuyRate;
			self.RAKAccountsModel.goldCostPrice = responsesList[0].goldCostPrice;
			self.RAKAccountsModel.goldInAed = responsesList[0].goldAmtInAed;
			self.RAKAccountsModel.iban = responsesList[0].accountIbanNumber;
			self.RAKAccountsModel.branch = responsesList[0].accountbranch;
			self.RAKAccountsModel.currency = responsesList[0].accountCurrencyCode;
			self.RAKAccountsModel.legderBal = responsesList[0].accountLedgerBalance;
			self.RAKAccountsModel.availableBal = responsesList[0].accountAvailableBalance;
			self.RAKAccountsModel.unclearFunds = responsesList[0].accountUnClearBalance;
			self.RAKAccountsModel.overDraftLimit = responsesList[0].accountOverDraftLimit;
			self.RAKAccountsModel.amountOnHold = responsesList[0].accountAmtHold;
			self.RAKAccountsModel.currentBal = responsesList[0].accountAvailableBalance;
			self.RAKAccountsModel.netAvailBal = responsesList[0].accounteffectiveBalance;
			self.RAKAccountsModel.accountNickName = responsesList[0].accountNickName;
			self.RAKAccountsModel.goldAmtInXAU = responsesList[0].goldAmtInXAU;
			}

		}

		if (accountType == "LON") {

			if (responsesList[2] != null) {
			self.RAKAccountsModel.productType = responsesList[2].loanType;
			self.RAKAccountsModel.disbursedAmt = responsesList[2].disbursedAmount;
			self.RAKAccountsModel.outstandingLoan = responsesList[2].outstandingLoan;
			self.RAKAccountsModel.sanctionDate = responsesList[2].sanctionDate;
			self.RAKAccountsModel.interestRate = responsesList[2].interestRate;
			self.RAKAccountsModel.nextInstallmentDate = interestRate = responsesList[2].nextInstallmentDate;
			//self.RAKAccountsModel.paymentMode = responsesList[2].paymentMode;
			//CR
				self.RAKAccountsModel.maturityDate = responsesList[1].maturityDate;
				//CR
			self.RAKAccountsModel.fundingAccNumber = responsesList[2].fundingAccNumber;
			self.RAKAccountsModel.overDueAmount = responsesList[2].overDueAmount;
			self.RAKAccountsModel.tenor = responsesList[2].tenor;
			self.RAKAccountsModel.assetType=responsesList[2].assetType;
			self.RAKAccountsModel.totalAmtPaid = responsesList[2].totalAmtPaid;
			self.RAKAccountsModel.installmentAmt = responsesList[2].emiAmount;
			self.RAKAccountsModel.totalAmtPaid = responsesList[2].totalAmtPaid;
			self.RAKAccountsModel.rakbankaccount = responsesList[2].rakbankaccount;
			if(null != responsesList[2].agreementNumber){
				self.RAKAccountsModel.agreementNumber = responsesList[2].agreementNumber;
				}
		  //self.RAKAccountsModel.agreementNumber = responsesList[2].agreementNumber;
			self.RAKAccountsModel.loanPeriodMonths = responsesList[2].loanPeriodMonths;
			self.RAKAccountsModel.loanPeriodDays = responsesList[2].loanPeriodDays;
			self.RAKAccountsModel.currency = responsesList[2].currency;
			self.RAKAccountsModel.installmentAmount = responsesList[2].installmentAmount;
			self.RAKAccountsModel.frequency = responsesList[2].frequency;
			}
			else if (responsesList[0] != null && !(responsesList[0].hasOwnProperty('errorMessage')) && !(responsesList[0].hasOwnProperty('updateNickName'))){
				self.RAKAccountsModel.accountNickName=responsesList[0].accountNickName;
				self.RAKAccountsModel.productType = responsesList[0].loanType;
				self.RAKAccountsModel.disbursedAmt = responsesList[0].disbursedAmount;
				self.RAKAccountsModel.outstandingLoan = responsesList[0].outstandingLoan;
				self.RAKAccountsModel.sanctionDate = responsesList[0].sanctionDate;
				self.RAKAccountsModel.interestRate = responsesList[0].interestRate;
				self.RAKAccountsModel.nextInstallmentDate = interestRate = responsesList[0].nextInstallmentDate;
				self.RAKAccountsModel.paymentMode = responsesList[0].paymentMode;
				//CR
				self.RAKAccountsModel.maturityDate = responsesList[0].maturityDate;
				//CR
				self.RAKAccountsModel.fundingAccNumber = responsesList[0].fundingAccNumber;
				self.RAKAccountsModel.overDueAmount = responsesList[0].overDueAmount;
				self.RAKAccountsModel.tenor = responsesList[0].tenor;
				self.RAKAccountsModel.assetType=responsesList[0].assetType;
				self.RAKAccountsModel.totalAmtPaid = responsesList[0].totalAmtPaid;
				self.RAKAccountsModel.installmentAmt = responsesList[0].emiAmount;
				self.RAKAccountsModel.totalAmtPaid = responsesList[0].totalAmtPaid;
				self.RAKAccountsModel.rakbankaccount = responsesList[0].rakbankaccount;
				if(null != responsesList[0].agreementNumber){
				self.RAKAccountsModel.agreementNumber = responsesList[0].agreementNumber;
				}
				self.RAKAccountsModel.loanPeriodMonths = responsesList[0].loanPeriodMonths;
				self.RAKAccountsModel.loanPeriodDays = responsesList[0].loanPeriodDays;
				self.RAKAccountsModel.currency = responsesList[0].currency;
				self.RAKAccountsModel.installmentAmount = responsesList[0].installmentAmount;
				self.RAKAccountsModel.frequency = responsesList[0].frequency;
			}
			if (responsesList[0] != null && !(responsesList[0].hasOwnProperty('errorMessage')) && !(responsesList[0].hasOwnProperty('updateNickName'))){

				if (self.RAKAccountsModel.assetType == 'AUTO'){
				self.RAKAccountsModel.assetDesc=responsesList[0].assetDesc;
				self.RAKAccountsModel.manufacture=responsesList[0].manufacture;
				self.RAKAccountsModel.mainAccountType=responsesList[0].mainAccountType;
				self.RAKAccountsModel.dealer=responsesList[0].dealer;
				self.RAKAccountsModel.regNo=responsesList[0].regNo;
				self.RAKAccountsModel.regEmiNumber=responsesList[0].regEmiNumber;
				self.RAKAccountsModel.disbursedAmt = responsesList[0].disbursedAmount;
				self.RAKAccountsModel.outstandingLoan = responsesList[0].outstandingLoan;
				}
				if (self.RAKAccountsModel.assetType == 'HOME'){
				self.RAKAccountsModel.propertyLoc=responsesList[0].propertyLoc;
				self.RAKAccountsModel.houseNum=responsesList[0].houseNum;
				self.RAKAccountsModel.streetName=responsesList[0].streetName;
				self.RAKAccountsModel.developerName=responsesList[0].developerName;
				self.RAKAccountsModel.constructionStatus=responsesList[0].constructionStatus;
				self.RAKAccountsModel.projectName=responsesList[0].projectName;
				self.RAKAccountsModel.disbursedAmt = responsesList[0].disbursedAmount;
				self.RAKAccountsModel.outstandingLoan = responsesList[0].outstandingLoan;
			}

		}
		//Fix for PROINT-1139
		if(responsesList[0] != null && responsesList[0].hasOwnProperty('errorMessage')){
				self.RAKAccountsModel.loanAssetDisplay=false;
			}
			
		}

		if (accountType == "CCD") {

			if (responsesList[1] != null) {
				self.RAKAccountsModel.accountNickName = responsesList[1].accountNickName;
				self.RAKAccountsModel.currentBalance = responsesList[1].currentBalance;
				self.RAKAccountsModel.creditCardNo = responsesList[1].creditCardNumber;
				self.RAKAccountsModel.totalAmountDue = responsesList[1].totalAmountDue;
				self.RAKAccountsModel.minAmtDue = responsesList[1].minAmtDue;
				self.RAKAccountsModel.dueDate = responsesList[1].dueDate;
				self.RAKAccountsModel.statementDate = responsesList[1].statementDate;
				self.RAKAccountsModel.totalcreditlimit = responsesList[1].totalCreditLimit;
				self.RAKAccountsModel.expDate = responsesList[1].expDate;
				self.RAKAccountsModel.availableCreditLimit = responsesList[1].availableCreditLimit;
				self.RAKAccountsModel.availableCashLimit = responsesList[1].availableCashLimit;
				self.RAKAccountsModel.totalCashLimit = responsesList[1].totalCashLimit;
				self.RAKAccountsModel.cardHolderName = responsesList[1].cardHolderName;
				self.RAKAccountsModel.customerLimit = responsesList[1].customerLimit;
				self.RAKAccountsModel.nameOnCard = responsesList[1].nameOnCard;
				self.RAKAccountsModel.cardBin = responsesList[1].cardBin;
				self.RAKAccountsModel.nextPaymentDate = responsesList[1].nextPaymentDate;
				self.RAKAccountsModel.lastPaymentDate = responsesList[1].lastPaymentDate;
				self.RAKAccountsModel.amountPaid = responsesList[1].amountPaid;
				self.RAKAccountsModel.rewardClosingBalance = responsesList[1].rewardClosingBalance;
				self.RAKAccountsModel.rewardOpeningBalance = responsesList[1].rewardOpeningBalance;
				self.RAKAccountsModel.rewardEarnedPoints = responsesList[1].rewardEarnedPoints;
				self.RAKAccountsModel.rewardRedeemedPoints = responsesList[1].rewardRedeemedPoints;
				if(responsesList[1].combinedLimit == 'Y') 
						self.RAKAccountsModel.ccCombinedLimitFlag = true;
				else 	self.RAKAccountsModel.ccCombinedLimitFlag = false;
				//console.log("self.RAKAccountsModel.ccCombinedLimitFlag"+self.RAKAccountsModel.ccCombinedLimitFlag);
			}
			else if (responsesList[0] != null && !(responsesList[0].hasOwnProperty('errorMessage')) && !(responsesList[0].hasOwnProperty('updateNickName'))){
			self.RAKAccountsModel.accountNickName = responsesList[0].accountNickName;
			self.RAKAccountsModel.currentBalance = responsesList[0].currentBalance;
			self.RAKAccountsModel.creditCardNo = responsesList[0].creditCardNumber;
			self.RAKAccountsModel.totalAmountDue = responsesList[0].totalAmountDue;
			self.RAKAccountsModel.minAmtDue = responsesList[0].minAmtDue;
			self.RAKAccountsModel.dueDate = responsesList[0].dueDate;
			self.RAKAccountsModel.statementDate = responsesList[0].statementDate;
			self.RAKAccountsModel.totalcreditlimit = responsesList[0].totalCreditLimit;
			self.RAKAccountsModel.expDate = responsesList[0].expDate;
			self.RAKAccountsModel.availableCreditLimit = responsesList[0].availableCreditLimit;
			self.RAKAccountsModel.availableCashLimit = responsesList[0].availableCashLimit;
			self.RAKAccountsModel.totalCashLimit = responsesList[0].totalCashLimit;
			self.RAKAccountsModel.cardHolderName = responsesList[0].cardHolderName;
			self.RAKAccountsModel.customerLimit = responsesList[0].customerLimit;
			self.RAKAccountsModel.nameOnCard = responsesList[0].nameOnCard;
			self.RAKAccountsModel.cardBin = responsesList[0].cardBin;
			self.RAKAccountsModel.nextPaymentDate = responsesList[0].nextPaymentDate;
			self.RAKAccountsModel.lastPaymentDate = responsesList[0].lastPaymentDate;
			self.RAKAccountsModel.amountPaid = responsesList[0].amountPaid;
			self.RAKAccountsModel.rewardClosingBalance = responsesList[0].rewardClosingBalance;
			self.RAKAccountsModel.rewardOpeningBalance = responsesList[0].rewardOpeningBalance;
			self.RAKAccountsModel.rewardEarnedPoints = responsesList[0].rewardEarnedPoints;
			self.RAKAccountsModel.rewardRedeemedPoints = responsesList[0].rewardRedeemedPoints;
			if(responsesList[0].combinedLimit == 'Y') 
				self.RAKAccountsModel.ccCombinedLimitFlag = true;
			else 	self.RAKAccountsModel.ccCombinedLimitFlag = false;
			//console.log("self.RAKAccountsModel.ccCombinedLimitFlag"+self.RAKAccountsModel.ccCombinedLimitFlag);
			
			}
			if ((self.RAKAccountsModel.cardBin) == "GenCard") {

				/*self.RAKAccountsModel.Literals_openingBal = scope.appLiterals.APP.RAK_ACCOUNTS.ACCOUNTS_DETAILS_PAGE.GENCARD_OPENINGBAL;
				self.RAKAccountsModel.Literals_closingBal = scope.appLiterals.APP.RAK_ACCOUNTS.ACCOUNTS_DETAILS_PAGE.GENCARD_CLOSINGBAL;
				self.RAKAccountsModel.Literals_earnedPoints = scope.appLiterals.APP.RAK_ACCOUNTS.ACCOUNTS_DETAILS_PAGE.GENCARD_EARNEDPOINTS;
				self.RAKAccountsModel.Literals_redeemedPoints = scope.appLiterals.APP.RAK_ACCOUNTS.ACCOUNTS_DETAILS_PAGE.GENCARD_REDEEMEDPOINTS;*/
				self.RAKAccountsModel.Literals_openingBal = scope.appLiterals.APP.RAK_ACCOUNTS.ACCOUNTS_DETAILS_PAGE.POINTCARD_OPENINGBAL;
				self.RAKAccountsModel.Literals_closingBal = scope.appLiterals.APP.RAK_ACCOUNTS.ACCOUNTS_DETAILS_PAGE.POINTCARD_CLOSINGBAL;
				self.RAKAccountsModel.Literals_earnedPoints = scope.appLiterals.APP.RAK_ACCOUNTS.ACCOUNTS_DETAILS_PAGE.POINTCARD_EARNEDPOINTS;
				self.RAKAccountsModel.Literals_redeemedPoints =scope.appLiterals.APP.RAK_ACCOUNTS.ACCOUNTS_DETAILS_PAGE.POINTCARD_REDEEMEDPOINTS;

			}
			else if ((self.RAKAccountsModel.cardBin) == "GoldCard") {

				/*self.RAKAccountsModel.Literals_openingBal = scope.appLiterals.APP.RAK_ACCOUNTS.ACCOUNTS_DETAILS_PAGE.GOLD_OPENINGBAL;
				self.RAKAccountsModel.Literals_closingBal = scope.appLiterals.APP.RAK_ACCOUNTS.ACCOUNTS_DETAILS_PAGE.GOLD_CLOSINGBAL;
				self.RAKAccountsModel.Literals_earnedPoints = scope.appLiterals.APP.RAK_ACCOUNTS.ACCOUNTS_DETAILS_PAGE.GOLD_EARNEDPOINTS;
				self.RAKAccountsModel.Literals_redeemedPoints = scope.appLiterals.APP.RAK_ACCOUNTS.ACCOUNTS_DETAILS_PAGE.GOLD_REDEEMEDPOINTS;*/
				self.RAKAccountsModel.Literals_openingBal = scope.appLiterals.APP.RAK_ACCOUNTS.ACCOUNTS_DETAILS_PAGE.POINTCARD_OPENINGBAL;
				self.RAKAccountsModel.Literals_closingBal = scope.appLiterals.APP.RAK_ACCOUNTS.ACCOUNTS_DETAILS_PAGE.POINTCARD_CLOSINGBAL;
				self.RAKAccountsModel.Literals_earnedPoints = scope.appLiterals.APP.RAK_ACCOUNTS.ACCOUNTS_DETAILS_PAGE.POINTCARD_EARNEDPOINTS;
				self.RAKAccountsModel.Literals_redeemedPoints =scope.appLiterals.APP.RAK_ACCOUNTS.ACCOUNTS_DETAILS_PAGE.POINTCARD_REDEEMEDPOINTS;

			}
			else if ((self.RAKAccountsModel.cardBin) == "PointCard"
					|| (self.RAKAccountsModel.cardBin) == "AmountCard") {

			/*	self.RAKAccountsModel.Literals_openingBal = scope.appLiterals.APP.RAK_ACCOUNTS.ACCOUNTS_DETAILS_PAGE.POINTCARD_OPENINGBAL;
				self.RAKAccountsModel.Literals_closingBal = scope.appLiterals.APP.RAK_ACCOUNTS.ACCOUNTS_DETAILS_PAGE.POINTCARD_CLOSINGBAL;
				self.RAKAccountsModel.Literals_earnedPoints = scope.appLiterals.APP.RAK_ACCOUNTS.ACCOUNTS_DETAILS_PAGE.POINTCARD_EARNEDPOINTS;
				self.RAKAccountsModel.Literals_redeemedPoints =scope.appLiterals.APP.RAK_ACCOUNTS.ACCOUNTS_DETAILS_PAGE.POINTCARD_REDEEMEDPOINTS;*/
				self.RAKAccountsModel.Literals_openingBal = scope.appLiterals.APP.RAK_ACCOUNTS.ACCOUNTS_DETAILS_PAGE.POINTCARD_OPENINGBAL;
				self.RAKAccountsModel.Literals_closingBal = scope.appLiterals.APP.RAK_ACCOUNTS.ACCOUNTS_DETAILS_PAGE.POINTCARD_CLOSINGBAL;
				self.RAKAccountsModel.Literals_earnedPoints = scope.appLiterals.APP.RAK_ACCOUNTS.ACCOUNTS_DETAILS_PAGE.POINTCARD_EARNEDPOINTS;
				self.RAKAccountsModel.Literals_redeemedPoints =scope.appLiterals.APP.RAK_ACCOUNTS.ACCOUNTS_DETAILS_PAGE.POINTCARD_REDEEMEDPOINTS;


			}
			else {
				/*self.RAKAccountsModel.Literals_openingBal = scope.appLiterals.APP.RAK_ACCOUNTS.ACCOUNTS_DETAILS_PAGE.GENCARD_OPENINGBAL;
				self.RAKAccountsModel.Literals_closingBal = scope.appLiterals.APP.RAK_ACCOUNTS.ACCOUNTS_DETAILS_PAGE.GENCARD_CLOSINGBAL;
				self.RAKAccountsModel.Literals_earnedPoints = scope.appLiterals.APP.RAK_ACCOUNTS.ACCOUNTS_DETAILS_PAGE.CARD_EARNEDPOINTS;
				self.RAKAccountsModel.Literals_redeemedPoints =scope.appLiterals.APP.RAK_ACCOUNTS.ACCOUNTS_DETAILS_PAGE.CARD_REDEEMEDPOINTS;*/
				self.RAKAccountsModel.Literals_openingBal = scope.appLiterals.APP.RAK_ACCOUNTS.ACCOUNTS_DETAILS_PAGE.POINTCARD_OPENINGBAL;
				self.RAKAccountsModel.Literals_closingBal = scope.appLiterals.APP.RAK_ACCOUNTS.ACCOUNTS_DETAILS_PAGE.POINTCARD_CLOSINGBAL;
				self.RAKAccountsModel.Literals_earnedPoints = scope.appLiterals.APP.RAK_ACCOUNTS.ACCOUNTS_DETAILS_PAGE.POINTCARD_EARNEDPOINTS;
				self.RAKAccountsModel.Literals_redeemedPoints =scope.appLiterals.APP.RAK_ACCOUNTS.ACCOUNTS_DETAILS_PAGE.POINTCARD_REDEEMEDPOINTS;
			}
			
			
			if (responsesList[0].hasOwnProperty('ccTxnDetailsList')) {
				self.RAKAccountsModel.operativeTransactions=responsesList[0].ccTxnDetailsList;
			}
			
			if (responsesList[0].hasOwnProperty('ccSecTxnDetailsList')) {
				self.RAKAccountsModel.secondaryCCTransactions=responsesList[0].ccSecTxnDetailsList;
			}
			
			if (responsesList[2].hasOwnProperty('ccTxnDetailsList')) {
				self.RAKAccountsModel.operativeTransactions=responsesList[2].ccTxnDetailsList;
			}
			
			if (responsesList[2].hasOwnProperty('ccSecTxnDetailsList')) {
				self.RAKAccountsModel.secondaryCCTransactions=responsesList[2].ccSecTxnDetailsList;
				
			}
			
			if(responsesList[0].hasOwnProperty('errorCode')){
				self.RAKAccountsModel.secondaryCCTransactions=[];
				self.RAKAccountsModel.operativeTransactions=[];
			}
			
			if(responsesList[2].hasOwnProperty('errorCode')){
				self.RAKAccountsModel.secondaryCCTransactions=[];
				self.RAKAccountsModel.operativeTransactions=[];
			}

		}

		if (accountType == "DEP") {

			if (responsesList[2] != null) {
			self.RAKAccountsModel.depAmount = responsesList[2].depositeAmount;
			self.RAKAccountsModel.depStartDate = responsesList[2].depositestartDate;
			self.RAKAccountsModel.revBalance = responsesList[2].reversedBalance;
			self.RAKAccountsModel.debAccNo = responsesList[2].debitAccountNumber;
			self.RAKAccountsModel.jointstatus = responsesList[2].jointAccountFlag;
			self.RAKAccountsModel.jointName1 = responsesList[2].jointAccount1;
			self.RAKAccountsModel.jointName2 = responsesList[2].jointAccount2;
			self.RAKAccountsModel.jointName3 = responsesList[2].jointAccount3;
			self.RAKAccountsModel.maturityInstruction = responsesList[2].maturityInstruction;
			self.RAKAccountsModel.nomination = responsesList[2].nomination;
			self.RAKAccountsModel.branch = responsesList[2].accountbranch;
			self.RAKAccountsModel.paymentMode = responsesList[2].paymentMode;
			self.RAKAccountsModel.interestRate=responsesList[2].interestRate;
			self.RAKAccountsModel.periodMonths = responsesList[2].tenurePeriodMonths;
			self.RAKAccountsModel.periodDays = responsesList[2].tenurePeriodDays;
			self.RAKAccountsModel.maturityDate=responsesList[2].maturityDate;
			self.RAKAccountsModel.rollOverAmt=responsesList[2].renewBal;
			//RAK DEV CHANGES SHOWING MATURITY AMOUNT FROM SERVER START
			self.RAKAccountsModel.maturityAmount=responsesList[2].maturityAmount;

			}
			else if (responsesList[0] != null && !(responsesList[0].hasOwnProperty('errorMessage')) && !(responsesList[0].hasOwnProperty('updateNickName'))){
				self.RAKAccountsModel.depAmount = responsesList[0].depositeAmount;
				self.RAKAccountsModel.depStartDate = responsesList[0].depositestartDate;
				self.RAKAccountsModel.revBalance = responsesList[0].reversedBalance;
				self.RAKAccountsModel.debAccNo = responsesList[0].debitAccountNumber;
				self.RAKAccountsModel.jointstatus = responsesList[0].jointAccountFlag;
				self.RAKAccountsModel.jointName1 = responsesList[0].jointAccount1;
				self.RAKAccountsModel.jointName2 = responsesList[0].jointAccount2;
				self.RAKAccountsModel.jointName3 = responsesList[0].jointAccount3;
				self.RAKAccountsModel.maturityInstruction = responsesList[0].maturityInstruction;
				self.RAKAccountsModel.nomination = responsesList[0].nomination;
				self.RAKAccountsModel.branch = responsesList[0].accountbranch;
				self.RAKAccountsModel.paymentMode = responsesList[0].paymentMode;
				self.RAKAccountsModel.interestRate=responsesList[0].interestRate;
				self.RAKAccountsModel.periodMonths = responsesList[0].tenurePeriodMonths;
				self.RAKAccountsModel.periodDays = responsesList[0].tenurePeriodDays;
				self.RAKAccountsModel.maturityDate=responsesList[0].maturityDate;
				self.RAKAccountsModel.rollOverAmt=responsesList[0].renewBal;
				//RAK DEV CHANGES SHOWING MATURITY AMOUNT FROM SERVER START
				self.RAKAccountsModel.maturityAmount=responsesList[0].maturityAmount;
			}

		}

	}	
		
		// added by  - start
		if((self.accType == "OPR" || self.accType == "CCD" || self.accType == "DEP" || self.accType == "LON" || self.accType == "TRADE" ||
				self.accType == "GLD") && self.swiperFalg == "clicked"  ){
			// Operative
			if(accountType == "OPR") 
			{
				if (responsesList[1] != null && !(responsesList[1].hasOwnProperty('errorMessage')) && !(responsesList[1].hasOwnProperty('updateNickName'))){
			self.RAKAccountsModel.iban = responsesList[1].accountIbanNumber;
			self.RAKAccountsModel.branch = responsesList[1].accountbranch;
			self.RAKAccountsModel.currency = responsesList[1].accountCurrencyCode;
			self.RAKAccountsModel.legderBal = responsesList[1].accountLedgerBalance;
			self.RAKAccountsModel.unclearFunds = responsesList[1].accountUnClearBalance;
			self.RAKAccountsModel.overDraftLimit = responsesList[1].accountOverDraftLimit;
			self.RAKAccountsModel.amountOnHold = responsesList[1].accountAmtHold;
			self.RAKAccountsModel.currentBal = responsesList[1].accountAvailableBalance;
			self.RAKAccountsModel.netAvailBal = responsesList[1].accountnetAvailableBalance;
			self.RAKAccountsModel.accountNickName = responsesList[1].accountNickName;
			self.RAKAccountsModel.odExpiryDate = responsesList[1].odExpiryDate;
			self.RAKAccountsModel.loanLimit=responsesList[1].LoanLimit;
				}
				
			}
			
			// Gold
			if (accountType == "GLD") {
				console.log("Rak Account Gold Inside");
				if (responsesList[1] != null && !(responsesList[1].hasOwnProperty('errorMessage')) && !(responsesList[1].hasOwnProperty('updateNickName'))){
				self.RAKAccountsModel.goldSellRate = responsesList[1].goldSellRate;
				self.RAKAccountsModel.goldBuyRate = responsesList[1].goldBuyRate;
				self.RAKAccountsModel.goldCostPrice = responsesList[1].goldCostPrice;
				self.RAKAccountsModel.goldInAed = responsesList[1].goldAmtInAed;
				self.RAKAccountsModel.iban = responsesList[1].accountIbanNumber;
				self.RAKAccountsModel.branch = responsesList[1].accountbranch;
				self.RAKAccountsModel.currency = responsesList[1].accountCurrencyCode;
				self.RAKAccountsModel.legderBal = responsesList[1].accountLedgerBalance;
				self.RAKAccountsModel.availableBal = responsesList[1].accountAvailableBalance;
				self.RAKAccountsModel.unclearFunds = responsesList[1].accountUnClearBalance;
				self.RAKAccountsModel.overDraftLimit = responsesList[1].accountOverDraftLimit;
				self.RAKAccountsModel.amountOnHold = responsesList[1].accountAmtHold;
				self.RAKAccountsModel.currentBal = responsesList[1].accountAvailableBalance;
				self.RAKAccountsModel.netAvailBal = responsesList[1].accounteffectiveBalance;
				self.RAKAccountsModel.accountNickName = responsesList[1].accountNickName;
				self.RAKAccountsModel.goldAmtInXAU = responsesList[1].goldAmtInXAU;
				}

			}
			
			
			//loan
			if (accountType == "LON") {

				if (responsesList[1] != null) {
				self.RAKAccountsModel.productType = responsesList[1].loanType;
				self.RAKAccountsModel.disbursedAmt = responsesList[1].disbursedAmount;
				self.RAKAccountsModel.outstandingLoan = responsesList[1].outstandingLoan;
				self.RAKAccountsModel.sanctionDate = responsesList[1].sanctionDate;
				self.RAKAccountsModel.maturityDate = responsesList[1].maturityDate;
				self.RAKAccountsModel.interestRate = responsesList[1].interestRate;
				self.RAKAccountsModel.nextInstallmentDate = interestRate = responsesList[1].nextInstallmentDate;
				self.RAKAccountsModel.paymentMode = responsesList[1].paymentMode;
				self.RAKAccountsModel.fundingAccNumber = responsesList[1].fundingAccNumber;
				self.RAKAccountsModel.overDueAmount = responsesList[1].overDueAmount;
				self.RAKAccountsModel.tenor = responsesList[1].tenor;
				self.RAKAccountsModel.assetType=responsesList[1].assetType;
				self.RAKAccountsModel.totalAmtPaid = responsesList[1].totalAmtPaid;
				self.RAKAccountsModel.installmentAmt = responsesList[1].emiAmount;
				self.RAKAccountsModel.totalAmtPaid = responsesList[1].totalAmtPaid;
				self.RAKAccountsModel.rakbankaccount = responsesList[1].rakbankaccount;
				if(null != responsesList[1].agreementNumber){
					self.RAKAccountsModel.agreementNumber = responsesList[1].agreementNumber;
					}
			  //self.RAKAccountsModel.agreementNumber = responsesList[2].agreementNumber;
				self.RAKAccountsModel.loanPeriodMonths = responsesList[1].loanPeriodMonths;
				self.RAKAccountsModel.loanPeriodDays = responsesList[1].loanPeriodDays;
				self.RAKAccountsModel.currency = responsesList[1].currency;
				self.RAKAccountsModel.installmentAmount = responsesList[1].installmentAmount;
				self.RAKAccountsModel.frequency = responsesList[1].frequency;
				}
				
				if (responsesList[1] != null && !(responsesList[1].hasOwnProperty('errorMessage')) && !(responsesList[1].hasOwnProperty('updateNickName'))){
					
					if (self.RAKAccountsModel.assetType == 'AUTO'){
					self.RAKAccountsModel.assetDesc=responsesList[1].assetDesc;
					self.RAKAccountsModel.manufacture=responsesList[1].manufacture;
					self.RAKAccountsModel.mainAccountType=responsesList[1].mainAccountType;
					self.RAKAccountsModel.dealer=responsesList[1].dealer;
					self.RAKAccountsModel.regNo=responsesList[1].regNo;
					self.RAKAccountsModel.regEmiNumber=responsesList[1].regEmiNumber;
					self.RAKAccountsModel.disbursedAmt = responsesList[1].disbursedAmount;
					self.RAKAccountsModel.outstandingLoan = responsesList[1].outstandingLoan;
					}
					if (self.RAKAccountsModel.assetType == 'HOME'){
					self.RAKAccountsModel.propertyLoc=responsesList[1].propertyLoc;
					self.RAKAccountsModel.houseNum=responsesList[1].houseNum;
					self.RAKAccountsModel.streetName=responsesList[1].streetName;
					self.RAKAccountsModel.developerName=responsesList[1].developerName;
					self.RAKAccountsModel.constructionStatus=responsesList[1].constructionStatus;
					self.RAKAccountsModel.projectName=responsesList[1].projectName;
					self.RAKAccountsModel.disbursedAmt = responsesList[1].disbursedAmount;
					self.RAKAccountsModel.outstandingLoan = responsesList[1].outstandingLoan;
				}

			}
			}
			
			//CCD
			if (accountType == "CCD") {

				if (responsesList[1] != null && !(responsesList[1].hasOwnProperty('errorMessage')) && !(responsesList[1].hasOwnProperty('updateNickName'))) {
					self.RAKAccountsModel.accountNickName = responsesList[1].accountNickName;
					self.RAKAccountsModel.currentBalance = responsesList[1].currentBalance;
					self.RAKAccountsModel.creditCardNo = responsesList[1].creditCardNumber;
					self.RAKAccountsModel.totalAmountDue = responsesList[1].totalAmountDue;
					self.RAKAccountsModel.minAmtDue = responsesList[1].minAmtDue;
					self.RAKAccountsModel.dueDate = responsesList[1].dueDate;
					self.RAKAccountsModel.statementDate = responsesList[1].statementDate;
					self.RAKAccountsModel.totalcreditlimit = responsesList[1].totalCreditLimit;
					self.RAKAccountsModel.expDate = responsesList[1].expDate;
					self.RAKAccountsModel.availableCreditLimit = responsesList[1].availableCreditLimit;
					self.RAKAccountsModel.availableCashLimit = responsesList[1].availableCashLimit;
					self.RAKAccountsModel.totalCashLimit = responsesList[1].totalCashLimit;
					self.RAKAccountsModel.cardHolderName = responsesList[1].cardHolderName;
					self.RAKAccountsModel.customerLimit = responsesList[1].customerLimit;
					self.RAKAccountsModel.nameOnCard = responsesList[1].nameOnCard;
					self.RAKAccountsModel.cardBin = responsesList[1].cardBin;
					self.RAKAccountsModel.rewardClosingBalance = responsesList[1].rewardClosingBalance;
					self.RAKAccountsModel.rewardOpeningBalance = responsesList[1].rewardOpeningBalance;
					self.RAKAccountsModel.rewardEarnedPoints = responsesList[1].rewardEarnedPoints;
					self.RAKAccountsModel.rewardRedeemedPoints = responsesList[1].rewardRedeemedPoints;
					if(responsesList[1].combinedLimit == 'Y') 
						self.RAKAccountsModel.ccCombinedLimitFlag = true;
					else 	self.RAKAccountsModel.ccCombinedLimitFlag = false;
					//console.log("self.RAKAccountsModel.ccCombinedLimitFlag"+self.RAKAccountsModel.ccCombinedLimitFlag);
				}

				if ((self.RAKAccountsModel.cardBin) == "GenCard") {
					
					/*self.RAKAccountsModel.Literals_openingBal = scope.appLiterals.APP.RAK_ACCOUNTS.ACCOUNTS_DETAILS_PAGE.GENCARD_OPENINGBAL;
					self.RAKAccountsModel.Literals_closingBal = scope.appLiterals.APP.RAK_ACCOUNTS.ACCOUNTS_DETAILS_PAGE.GENCARD_CLOSINGBAL;
					self.RAKAccountsModel.Literals_earnedPoints = scope.appLiterals.APP.RAK_ACCOUNTS.ACCOUNTS_DETAILS_PAGE.GENCARD_EARNEDPOINTS;
					self.RAKAccountsModel.Literals_redeemedPoints = scope.appLiterals.APP.RAK_ACCOUNTS.ACCOUNTS_DETAILS_PAGE.GENCARD_REDEEMEDPOINTS;*/
					self.RAKAccountsModel.Literals_openingBal = scope.appLiterals.APP.RAK_ACCOUNTS.ACCOUNTS_DETAILS_PAGE.POINTCARD_OPENINGBAL;
					self.RAKAccountsModel.Literals_closingBal = scope.appLiterals.APP.RAK_ACCOUNTS.ACCOUNTS_DETAILS_PAGE.POINTCARD_CLOSINGBAL;
					self.RAKAccountsModel.Literals_earnedPoints = scope.appLiterals.APP.RAK_ACCOUNTS.ACCOUNTS_DETAILS_PAGE.POINTCARD_EARNEDPOINTS;
					self.RAKAccountsModel.Literals_redeemedPoints =scope.appLiterals.APP.RAK_ACCOUNTS.ACCOUNTS_DETAILS_PAGE.POINTCARD_REDEEMEDPOINTS;

				}
				else if ((self.RAKAccountsModel.cardBin) == "GoldCard") {
					
					/*self.RAKAccountsModel.Literals_openingBal = scope.appLiterals.APP.RAK_ACCOUNTS.ACCOUNTS_DETAILS_PAGE.GOLD_OPENINGBAL;
					self.RAKAccountsModel.Literals_closingBal = scope.appLiterals.APP.RAK_ACCOUNTS.ACCOUNTS_DETAILS_PAGE.GOLD_CLOSINGBAL;
					self.RAKAccountsModel.Literals_earnedPoints = scope.appLiterals.APP.RAK_ACCOUNTS.ACCOUNTS_DETAILS_PAGE.GOLD_EARNEDPOINTS;
					self.RAKAccountsModel.Literals_redeemedPoints = scope.appLiterals.APP.RAK_ACCOUNTS.ACCOUNTS_DETAILS_PAGE.GOLD_REDEEMEDPOINTS;*/
					self.RAKAccountsModel.Literals_openingBal = scope.appLiterals.APP.RAK_ACCOUNTS.ACCOUNTS_DETAILS_PAGE.POINTCARD_OPENINGBAL;
					self.RAKAccountsModel.Literals_closingBal = scope.appLiterals.APP.RAK_ACCOUNTS.ACCOUNTS_DETAILS_PAGE.POINTCARD_CLOSINGBAL;
					self.RAKAccountsModel.Literals_earnedPoints = scope.appLiterals.APP.RAK_ACCOUNTS.ACCOUNTS_DETAILS_PAGE.POINTCARD_EARNEDPOINTS;
					self.RAKAccountsModel.Literals_redeemedPoints =scope.appLiterals.APP.RAK_ACCOUNTS.ACCOUNTS_DETAILS_PAGE.POINTCARD_REDEEMEDPOINTS;

				}
				else if ((self.RAKAccountsModel.cardBin) == "PointCard"
						|| (self.RAKAccountsModel.cardBin) == "AmountCard") {
					
				/*	self.RAKAccountsModel.Literals_openingBal = scope.appLiterals.APP.RAK_ACCOUNTS.ACCOUNTS_DETAILS_PAGE.POINTCARD_OPENINGBAL;
					self.RAKAccountsModel.Literals_closingBal = scope.appLiterals.APP.RAK_ACCOUNTS.ACCOUNTS_DETAILS_PAGE.POINTCARD_CLOSINGBAL;
					self.RAKAccountsModel.Literals_earnedPoints = scope.appLiterals.APP.RAK_ACCOUNTS.ACCOUNTS_DETAILS_PAGE.POINTCARD_EARNEDPOINTS;
					self.RAKAccountsModel.Literals_redeemedPoints =scope.appLiterals.APP.RAK_ACCOUNTS.ACCOUNTS_DETAILS_PAGE.POINTCARD_REDEEMEDPOINTS;*/
					self.RAKAccountsModel.Literals_openingBal = scope.appLiterals.APP.RAK_ACCOUNTS.ACCOUNTS_DETAILS_PAGE.POINTCARD_OPENINGBAL;
					self.RAKAccountsModel.Literals_closingBal = scope.appLiterals.APP.RAK_ACCOUNTS.ACCOUNTS_DETAILS_PAGE.POINTCARD_CLOSINGBAL;
					self.RAKAccountsModel.Literals_earnedPoints = scope.appLiterals.APP.RAK_ACCOUNTS.ACCOUNTS_DETAILS_PAGE.POINTCARD_EARNEDPOINTS;
					self.RAKAccountsModel.Literals_redeemedPoints =scope.appLiterals.APP.RAK_ACCOUNTS.ACCOUNTS_DETAILS_PAGE.POINTCARD_REDEEMEDPOINTS;


				}
				else {
					/*self.RAKAccountsModel.Literals_openingBal = scope.appLiterals.APP.RAK_ACCOUNTS.ACCOUNTS_DETAILS_PAGE.GENCARD_OPENINGBAL;
					self.RAKAccountsModel.Literals_closingBal = scope.appLiterals.APP.RAK_ACCOUNTS.ACCOUNTS_DETAILS_PAGE.GENCARD_CLOSINGBAL;
					self.RAKAccountsModel.Literals_earnedPoints = scope.appLiterals.APP.RAK_ACCOUNTS.ACCOUNTS_DETAILS_PAGE.CARD_EARNEDPOINTS;
					self.RAKAccountsModel.Literals_redeemedPoints =scope.appLiterals.APP.RAK_ACCOUNTS.ACCOUNTS_DETAILS_PAGE.CARD_REDEEMEDPOINTS;*/
					self.RAKAccountsModel.Literals_openingBal = scope.appLiterals.APP.RAK_ACCOUNTS.ACCOUNTS_DETAILS_PAGE.POINTCARD_OPENINGBAL;
					self.RAKAccountsModel.Literals_closingBal = scope.appLiterals.APP.RAK_ACCOUNTS.ACCOUNTS_DETAILS_PAGE.POINTCARD_CLOSINGBAL;
					self.RAKAccountsModel.Literals_earnedPoints = scope.appLiterals.APP.RAK_ACCOUNTS.ACCOUNTS_DETAILS_PAGE.POINTCARD_EARNEDPOINTS;
					self.RAKAccountsModel.Literals_redeemedPoints =scope.appLiterals.APP.RAK_ACCOUNTS.ACCOUNTS_DETAILS_PAGE.POINTCARD_REDEEMEDPOINTS;
				}

			}

			
			//deposit
			if (accountType == "DEP") {

				if (responsesList[1] != null) {
				self.RAKAccountsModel.depAmount = responsesList[1].depositeAmount;
				self.RAKAccountsModel.depStartDate = responsesList[1].depositestartDate;
				self.RAKAccountsModel.revBalance = responsesList[1].reversedBalance;
				self.RAKAccountsModel.debAccNo = responsesList[1].debitAccountNumber;
				self.RAKAccountsModel.jointstatus = responsesList[1].jointAccountFlag;
				self.RAKAccountsModel.jointName1 = responsesList[1].jointAccount1;
				self.RAKAccountsModel.jointName2 = responsesList[1].jointAccount2;
				self.RAKAccountsModel.jointName3 = responsesList[1].jointAccount3;
				self.RAKAccountsModel.maturityInstruction = responsesList[1].maturityInstruction;
				self.RAKAccountsModel.nomination = responsesList[1].nomination;
				self.RAKAccountsModel.branch = responsesList[1].accountbranch;
				self.RAKAccountsModel.paymentMode = responsesList[1].paymentMode;
				self.RAKAccountsModel.interestRate=responsesList[1].interestRate;
				self.RAKAccountsModel.periodMonths = responsesList[1].tenurePeriodMonths;
				self.RAKAccountsModel.periodDays = responsesList[1].tenurePeriodDays;
				self.RAKAccountsModel.maturityDate=responsesList[1].maturityDate;
				self.RAKAccountsModel.rollOverAmt=responsesList[1].renewBal;
				//RAK DEV CHANGES SHOWING MATURITY AMOUNT FROM SERVER START
				self.RAKAccountsModel.maturityAmount=responsesList[1].maturityAmount;
				
				}
			}
			
			
			//self.accType = "XXX";
			
			
		}
		// added by  - end
		
		
		setTimeout(function(){jQuery('[name="byTrnxChoice"][checked]').click();},30);
	};
	
	//Added by  For swiper call
	self.swiperEventCall=function(){
		
		setTimeout(function(){var swiper = new Swiper('.swiper-container');},2000);
		
	};
	//added for swiper call in login screen
	self.loginSwiperEventCall=function(){
		 var swipeCount = 0;
	        var lastCount = 0;
		setTimeout(function(){var swiper = new Swiper('.swiper-container', {
	        pagination: '.swiper-pagination',
	        paginationClickable: true,
	                            onSlideChangeEnd:function(){
	                            lastCount=swipeCount;
	                           
	                            },
	                            onReachEnd:function(){
	                          
	                            if(lastCount == swipeCount){
	                            setTimeout(function(){
	                                       
	                                       jQuery("#touchSwipe").click();lastCount++;
	                                       },350);
	                            }
	                            
	                            }
	                            
	    });},2000);
		
	};
	
	self.getEvent = function(accountType,subAccType) {

		self.RAKAccountsModel.trxSearchFlag = false;
		self.RAKAccountsModel.selectedAccountTemp = "OtherScreen";

		switch (accountType) {
		case "OPR":
			self.RAKAccountsModel.type = "OPR";
			self.RAKAccountsModel.subAccountType=subAccType;
			if(self.RAKAccountsModel.subAccountType=="CAA"){
			return "onTradeAccountListClick";
			break;
			}
			else{
				return "onOprAccountListClick";
				break;
				}
			
		case "DEP":
			self.RAKAccountsModel.type = "DEP";
			self.RAKAccountsModel.subAccountType=subAccType;
			return "onDepositAccountListClick";
			break;
		case "LON":
			self.RAKAccountsModel.type = "LON";
			self.RAKAccountsModel.subAccountType=subAccType;
			return "onLoanAccountListClick";
			break;
		case "GLD":
			self.RAKAccountsModel.type = "GLD";
			self.RAKAccountsModel.subAccountType=subAccType;
			return "onGoldAccountListClick";
			break;

		case "CCD":
			self.RAKAccountsModel.type = "CCD";
			self.RAKAccountsModel.subAccountType=subAccType;
			return "onCreditAccountListClick";
			break;

		case "MTF":
			self.RAKAccountsModel.type = "MTF";
			self.RAKAccountsModel.subAccountType=subAccType;
			return "onInvAccountListClick";
			break;
		default:
			break;

		}
	};

	self.setEventTransaction = function() {

		self.RAKAccountsModel.trxSearchFlag = true;
	};

	self.accountList = function(response) {

	if (response!=null && !response[0].hasOwnProperty['errorMessage']){

		if (response[0].hasOwnProperty('operativeAccountsList')) {
			self.RAKAccountsModel.operativeAccounts = response[0].operativeAccountsList;
			self.RAKAccountsModel.accountType = "OPR";
			self.RAKAccountsModel.subType = "OPR";
			self.RAKAccountsModel.pageName="Android_OprBalance";
			self.RAKAccountsModel.requestID="ANDROID_OPR_BALANCE";
			self.RAKAccountsModel.successPage="Android_OprBalance_JSON.jsp";
			if(response[1].hasOwnProperty('LoanLimit')){
			self.RAKAccountsModel.loanLimit=response[1].LoanLimit;
			}

		}
		
		if (response[0].hasOwnProperty('tradeFinAccountsList')) {
			self.RAKAccountsModel.tradeFinanceAccounts = response[0].tradeFinAccountsList;
			self.RAKAccountsModel.accountType = "OPR";
			self.RAKAccountsModel.subType = "CAA";
			self.RAKAccountsModel.pageName="Android_OprBalance";
			self.RAKAccountsModel.requestID="ANDROID_OPR_BALANCE";
			self.RAKAccountsModel.successPage="Android_OprBalance_JSON.jsp";
			if(response[1].hasOwnProperty('LoanLimit')){
			self.RAKAccountsModel.loanLimit=response[1].LoanLimit;
			}

		}
		if (response[0].hasOwnProperty('depositAccountsList')) {
			self.RAKAccountsModel.depositAccounts = response[0].depositAccountsList;
			self.RAKAccountsModel.accountType = "DEP";
			self.RAKAccountsModel.pageName="Android_Dep_Balance_Ministatement";
			self.RAKAccountsModel.requestID="ANDROID_DEP_ACDETAILS";
			self.RAKAccountsModel.successPage="Android_Dep_Balance_JSON.jsp";
		}
		if (response[0].hasOwnProperty('loanAccountsList')) {
			self.RAKAccountsModel.loanAccounts = response[0].loanAccountsList;
			self.RAKAccountsModel.accountType = "LON";
			self.RAKAccountsModel.pageName="Android_Lon_Balance_Ministatement";
			self.RAKAccountsModel.requestID="ANDROID_LON_ACDETAILS";
			self.RAKAccountsModel.successPage="Android_Lon_Balance_Ministatement_JSON.jsp";
		}
		if (response[0].hasOwnProperty('goldAccountsList')) {
			self.RAKAccountsModel.goldAccounts = response[0].goldAccountsList;
			self.RAKAccountsModel.accountType = "GLD";
			self.RAKAccountsModel.pageName="RAK_GoldAccount";
			self.RAKAccountsModel.requestID="ANDROID_OPR_BALANCE";
			self.RAKAccountsModel.successPage="RAK_GoldAccount_JSON.jsp";
		}
		if (response[0].hasOwnProperty('ccList')) {
			self.RAKAccountsModel.creditAccounts = response[0].ccList;
			self.RAKAccountsModel.accountType = "CCD";
			//Rak  Not needed will be removed
			self.RAKAccountsModel.pageName="Android_CCDetails";
			self.RAKAccountsModel.requestID="ANDROID_CC_DETAILS";
			self.RAKAccountsModel.successPage="RAKAndroid_CCViewDetails_JSON.jsp";
		}

		if (response[0].hasOwnProperty('invAccountsList')) {
			self.RAKAccountsModel.invtAccounts = response[0].invAccountsList;
			self.RAKAccountsModel.accountType = "MTF";
		}
		if (response[0].hasOwnProperty('invTxnDetailsList')) {
			self.RAKAccountsModel.invPortfolioList = response[0].invTxnDetailsList;
			//self.RAKAccountsModel.transactionsPortfolioList=response[0].invTxnDetailsList;
			self.RAKAccountsModel.accountType = "MTF";
		}

	}
	// Added to clear any error message --Inside Account List
	jQuery(response).each(function(index,value){
		if(value.hasOwnProperty('errorMessage')){
			if (self.RAKAccountsModel.clearTxnList != "N"){
			self.RAKAccountsModel.transactionsList=[];
			self.RAKAccountsModel.accountsTransaction=[];
			self.RAKAccountsModel.secondaryCCTransactions=[];
			self.RAKAccountsModel.operativeTransactions=[];
			self.RAKAccountsModel.loanAssetDetails=[];
			}

		}
	});

	if (response!=null && !response[0].hasOwnProperty['errorMessage']){

		
		
		if (response[0].hasOwnProperty('ActPDFMsg')) {
			self.RAKAccountsModel.pdfMsgMail = response[0].ActPDFMsg;
			if(self.RAKAccountsModel.pdfMsgMail!="")
			{
				self.RAKAccountsModel.showPopup = true;
				}
			else{
				self.RAKAccountsModel.showPopup = false;
			}
			
		}
		if (response[0].hasOwnProperty('invPortfolioDetails')) {
			self.RAKAccountsModel.accountsTransaction=response[0].invPortfolioDetails;
			//response[1].transactions=[];
		}

		if (response[0].hasOwnProperty('transactions')) {
			self.RAKAccountsModel.accountsTransaction=response[0].transactions;
			//response[1].transactions=[];
		}
		if (response[0].hasOwnProperty('transactionList')) {

			self.RAKAccountsModel.accountsTransaction=response[0].transactionList;
			//response[1].transactionList=[];
		}
		if (response[0].hasOwnProperty('loanAssetDetails')) {

			self.RAKAccountsModel.loanAssetDetails=response[0].loanAssetDetails;
			//self.RAKAccountsModel.loanAssetDisplay= true;
		}

		if (response[0].hasOwnProperty('ccTxnDetailsList')) {
			self.RAKAccountsModel.operativeTransactions=response[0].ccTxnDetailsList;

		}
		if (response[0].hasOwnProperty('ccSecTxnDetailsList')) {
			self.RAKAccountsModel.secondaryCCTransactions=response[0].ccSecTxnDetailsList;

		}
		if (response[0].hasOwnProperty('loanAmortizationDetails')) {
			self.RAKAccountsModel.loanAmortizationList=response[0].loanAmortizationDetails;

		}

		if (response[0].hasOwnProperty('monthList')) {
			self.RAKAccountsModel.monthList=response[0].monthList;
		}
		if (response[0].hasOwnProperty('yearList')) {
			self.RAKAccountsModel.yearList=response[0].yearList;
		}
	}
	else {

	if (response[0].hasOwnProperty('errorMessage')){

		self.RAKAccountsModel.transactionsList=[];
		self.RAKAccountsModel.accountsTransaction=[];
	}
	}


	if (response!=null && response[1]!=null && !response[1].hasOwnProperty['errorMessage']){
		if (response[1].hasOwnProperty('transactions')) {
			self.RAKAccountsModel.accountsTransaction=response[1].transactions;
			//response[1].transactions=[];
		}

		//Rak  for Investement Portfolio Transaction Details
		if (response[1].hasOwnProperty('invPortfolioDetails')) {
			self.RAKAccountsModel.accountsTransaction=response[1].invPortfolioDetails;
			//response[1].transactions=[];
		}
		if (response[1].hasOwnProperty('transactionList')) {

			self.RAKAccountsModel.accountsTransaction=response[1].transactionList;
			//response[1].transactionList=[];
		}
		if (response[1].hasOwnProperty('ccTxnDetailsList')) {
			//self.RAKAccountsModel.operativeTransactions=response[1].transactionList;
			self.RAKAccountsModel.accountsTransaction=response[1].ccTxnDetailsList;
			//response[1].ccTxnDetailsList=[];
		}
		if (response[1].hasOwnProperty('ccSecTxnDetailsList')) {
			self.RAKAccountsModel.secondaryCCTransactions=response[1].ccSecTxnDetailsList;

		}
		if (response[1].hasOwnProperty('loanAmortizationDetails')) {
			self.RAKAccountsModel.loanAmortizationList=response[1].loanAmortizationDetails;

		}
		if (response[1].hasOwnProperty('invTxnDetailsList')) {
			self.RAKAccountsModel.transactionsList=response[1].invTxnDetailsList;
			//self.RAKAccountsModel.transactionsPortfolioList=response[1].invTxnDetailsList;
		}
		if (response[1].hasOwnProperty('yearList')) {
			self.RAKAccountsModel.yearList=response[1].yearList;
		}
		if (response[1].hasOwnProperty('monthList')) {
			self.RAKAccountsModel.monthList=response[1].monthList;
		}

	}
	else {

		//Commented To test the scenerio of -ve cases -- 
/*		if (response[1].hasOwnProperty('errorMessage')){

			self.RAKAccountsModel.transactionsList=[];
			self.RAKAccountsModel.accountsTransaction=[];
		}	*/

	}


	if (response!=null && response[2]!=null  && !response[2].hasOwnProperty['errorMessage']){
		if (response[2].hasOwnProperty('ccTxnDetailsList')) {

			self.RAKAccountsModel.operativeTransactions=response[2].ccTxnDetailsList;
		}
		if (response[2].hasOwnProperty('ccSecTxnDetailsList')) {
			self.RAKAccountsModel.secondaryCCTransactions=response[2].ccSecTxnDetailsList;
			
		}
	
	}

	};
	
	// modified by   - Start
	self.accountListSwiper = function(responsesList) {
		
	if (self.swiperFalg == "clicked"){
			
		self.RAKAccountsModel.selectedAccount = self.selectedIndex;
		
	if (responsesList!=null && !responsesList[0].hasOwnProperty['errorMessage']){
		
		if (responsesList[0].hasOwnProperty('operativeAccountsList')) {
			self.RAKAccountsModel.operativeAccounts = responsesList[0].operativeAccountsList;
			

		}
		if (responsesList[0].hasOwnProperty('tradeFinAccountsList')) {
			self.RAKAccountsModel.tradeFinanceAccounts = responsesList[0].tradeFinAccountsList;
			

		}
	
		if (responsesList[0].hasOwnProperty('depositAccountsList')) {
			self.RAKAccountsModel.depositAccounts = responsesList[0].depositAccountsList;
			
		}
		if (responsesList[0].hasOwnProperty('loanAccountsList')) {
			self.RAKAccountsModel.loanAccounts = responsesList[0].loanAccountsList;
			
		}
		if (responsesList[0].hasOwnProperty('goldAccountsList')) {
			self.RAKAccountsModel.goldAccounts = responsesList[0].goldAccountsList;
			
		}
		if (responsesList[0].hasOwnProperty('ccList')) {
			self.RAKAccountsModel.creditAccounts = responsesList[0].ccList;
			
		}
		
		if (responsesList[0].hasOwnProperty('invAccountsList')) {
			self.RAKAccountsModel.invtAccounts = responsesList[0].invAccountsList;										
			self.RAKAccountsModel.accountType = "MTF";
		}
		if (responsesList[0].hasOwnProperty('invTxnDetailsList')) {
			self.RAKAccountsModel.invPortfolioList = responsesList[0].invTxnDetailsList;
			//self.RAKAccountsModel.transactionsPortfolioList=response[0].invTxnDetailsList;
			self.RAKAccountsModel.accountType = "MTF";
		}
		
	}
	self.swiperFalg = "unClicked";
		}
	};
//modified by Yadeh - end

	self.clearPage = function() {

		self.RAKAccountsModel.operativeAccounts=[];
		self.RAKAccountsModel.loanAccounts=[];
		self.RAKAccountsModel.creditAccounts=[];
		self.RAKAccountsModel.goldAccounts=[];
		self.RAKAccountsModel.loanAccounts=[];
		self.RAKAccountsModel.depositAccounts=[];
		self.RAKAccountsModel.loanLimit="";
		self.RAKAccountsModel.tradeFinanceAccounts=[];

	};
	self.handlePullDown = function(elem) {
		var pullDwnELem = jQuery(elem.target);
		jQuery('.rakPullDownMenu').slideUp();
		
		// jQuery('.col-sm-11').unbind('click');
		if (pullDwnELem.hasClass("pullOpen")) {
			pullDwnELem.removeClass("pullOpen");
			
		} else if(jQuery('.rakBlockBackgrnd').length){
			jQuery('.rakPullDownMenu').hide();
			pullDwnELem.find('pullOpen').removeClass("pullOpen");
			jQuery(".rakBlockBackgrnd").remove();
			jQuery('.rakPullDownBottomBlocker').remove();
            jQuery('.rakPullDownTopBlocker').remove();
            jQuery('.account-page').css('position','');
		}
		else{
			jQuery(".rakPullDown").removeClass("pullOpen");
			pullDwnELem.addClass("pullOpen");
			pullDwnELem.before('<div class="rakBlockBackgrnd"></div>');
			if(jQuery('.rak-back-header:visible')){
				jQuery('.account-page').css('position','absolute');
				}else{
					jQuery(".icons-block").prepend('<div class="rakPullDownBottomBlocker"/>');
		            jQuery(".navbar-fixed-top").prepend('<div class="rakPullDownTopBlocker"/>');
				}
			
			pullDwnELem.siblings('ul').slideDown();
			
			jQuery('.col-sm-11,.rakBlockBackgrnd').bind('click', function() {
				jQuery('.rakPullDownMenu').slideUp();
				pullDwnELem.removeClass("pullOpen");
				pullDwnELem.parent().removeClass("rakBlockBackgrnd");
				jQuery('.rakPullDownBottomBlocker').remove();
                jQuery('.rakPullDownTopBlocker').remove();
				jQuery('.col-sm-11').unbind('click');
			});
			elem.preventDefault();
			elem.stopImmediatePropagation();
			return false;
		}

	};



	//RAK:3: : Investment Portfolio View Statement START

	self.RakInvestmentPortfolioViewStmt={
		acctNo:"",
		acctMgr:"",
		acctType:"",
		stmtDate:"",

		addLine1:"",
		addLine2:"",
		addLine3:"",
		addLine4:"",
		addLine5:"",
		zip:"",
		poBox:"",
		city:"",
		country:"",

		trnasList:[],

		initRakInvestmentPortfolioViewStmtData:function(responsesList){
			if (responsesList!=null && !responsesList[0].hasOwnProperty('errorMessage')){
				if(responsesList[0].hasOwnProperty('acctNo'))
					self.RakInvestmentPortfolioViewStmt.acctNo = responsesList[0].acctNo;
				if(responsesList[0].hasOwnProperty('acctMgr'))
					self.RakInvestmentPortfolioViewStmt.acctMgr = responsesList[0].acctMgr;
				if(responsesList[0].hasOwnProperty('acctType'))
					self.RakInvestmentPortfolioViewStmt.acctType = responsesList[0].acctType;
				if(responsesList[0].hasOwnProperty('stmtDate'))
					self.RakInvestmentPortfolioViewStmt.stmtDate = responsesList[0].stmtDate;
				if(responsesList[0].hasOwnProperty('addLine1'))
					self.RakInvestmentPortfolioViewStmt.addLine1 = responsesList[0].addLine1;
				if(responsesList[0].hasOwnProperty('addLine2'))
					self.RakInvestmentPortfolioViewStmt.addLine2 = responsesList[0].addLine2;
				if(responsesList[0].hasOwnProperty('addLine3'))
					self.RakInvestmentPortfolioViewStmt.addLine3 = responsesList[0].addLine3;
				if(responsesList[0].hasOwnProperty('addLine4'))
					self.RakInvestmentPortfolioViewStmt.addLine4 = responsesList[0].addLine4;
				if(responsesList[0].hasOwnProperty('addLine5'))
					self.RakInvestmentPortfolioViewStmt.addLine5 = responsesList[0].addLine5;
				if(responsesList[0].hasOwnProperty('zip'))
					self.RakInvestmentPortfolioViewStmt.zip = responsesList[0].zip;
				if(responsesList[0].hasOwnProperty('poBox'))
					self.RakInvestmentPortfolioViewStmt.poBox = responsesList[0].poBox;
				if(responsesList[0].hasOwnProperty('city'))
					self.RakInvestmentPortfolioViewStmt.city = responsesList[0].city;
				if(responsesList[0].hasOwnProperty('country'))
					self.RakInvestmentPortfolioViewStmt.country = responsesList[0].country;
				if(responsesList[0].hasOwnProperty('transList'))
					self.RakInvestmentPortfolioViewStmt.transList = responsesList[0].transList;
			}

		},

		resetRakInvestmentPortfolioViewStmtData:function(){
			self.RakInvestmentPortfolioViewStmt.acctNo="";
			self.RakInvestmentPortfolioViewStmt.acctMgr="";
			self.RakInvestmentPortfolioViewStmt.acctType="";
			self.RakInvestmentPortfolioViewStmt.stmtDate="";

			self.RakInvestmentPortfolioViewStmt.addLine1="";
			self.RakInvestmentPortfolioViewStmt.addLine2="";
			self.RakInvestmentPortfolioViewStmt.addLine3="";
			self.RakInvestmentPortfolioViewStmt.addLine4="";
			self.RakInvestmentPortfolioViewStmt.addLine5="";
			self.RakInvestmentPortfolioViewStmt.zip="";
			self.RakInvestmentPortfolioViewStmt.poBox="";
			self.RakInvestmentPortfolioViewStmt.city="";
			self.RakInvestmentPortfolioViewStmt.country="";

			self.RakInvestmentPortfolioViewStmt.trnasList=[];
		}

	};


	//RAK:3: : Investment Portfolio View Statement END


	//RAK::6  : Investment Portfolio Evaluation START
	self.RakInvestmentEvaluation={
		acctHolderName:"",
		rmName:"",
		accountId:'',
		evalDate:"",
			invTxnDetailsList:[],
			resetRakInvestmentEvaluation:function()
			{
				self.RakInvestmentEvaluation.acctHolderName="";
				self.RakInvestmentEvaluation.rmName="";
					self.RakInvestmentEvaluation.accountId='';
					self.RakInvestmentEvaluation.evalDate="";
					self.RakInvestmentEvaluation.invTxnDetailsList=[];

			}
	};

	self.rakInvestmentEvaluationInit=function(responsesList)
	{
		if (!responsesList[0].hasOwnProperty('errorMessage'))
		{
    	if (responsesList[0].hasOwnProperty('holderName'))
		{
	self.RakInvestmentEvaluation.acctHolderName=responsesList[0].holderName;
		}

    	if (responsesList[0].hasOwnProperty('accountId'))
		{
	self.RakInvestmentEvaluation.accountId=responsesList[0].accountId;
		}

    	if (responsesList[0].hasOwnProperty('rmName'))
		{
	self.RakInvestmentEvaluation.rmName=responsesList[0].rmName;
		}
    	if (responsesList[0].hasOwnProperty('evalDate'))
		{
	self.RakInvestmentEvaluation.evalDate=responsesList[0].evalDate;
		}
    	if (responsesList[0].hasOwnProperty('invTxnDetailsList'))
		{
	self.RakInvestmentEvaluation.invTxnDetailsList=responsesList[0].invTxnDetailsList;
	}
    	}
    	};
	//RAK::6  : Investment Portfolio Evaluation END

	// RAK  Rak Valuation START

	self.RakValuationEnroll={

			accountType:"",
			ccdList:[],
			oprList:[],

			isEligibleToEnroll:false,
			isACOpr:false,
			isACCcd:false,
			isBothType: false,
			accountId:"",
			packageList:"",
			acceptTermsCheck1:'N',
			acceptTermsCheck2:'N',
			packageItem:"",
			packageName:"",
			packageCharge:"",
			authStatus:true,
			authMode :"",
			txnPwd:"",
			successMessage:"",
			accountNumber:"",
			isTermsAccepted:false,

			clicked:false,
			resetRakValuationEnrollAccountId:function()
			{
				self.RakValuationEnroll.accountId="";
			},


				resetRakValuationEnrollHome:function()
				{
					self.RakValuationEnroll.accountType="";
					self.RakValuationEnroll.ccdList=[];
					self.RakValuationEnroll.oprList=[];
					self.RakValuationEnroll.isEligibleToEnroll=false;
					self.RakValuationEnroll.isACOpr=false;
					self.RakValuationEnroll.isACCcd=false;
					self.RakValuationEnroll.isBothType=false;
					self.RakValuationEnroll.packageList="";
					self.RakValuationEnroll.acceptTermsCheck1="";
					self.RakValuationEnroll.acceptTermsCheck2="";
					self.RakValuationEnroll.packageItem="";
					self.RakValuationEnroll.packageName="";
					self.RakValuationEnroll.packageCharge="";
					self.RakValuationEnroll.authStatus=true;
					self.RakValuationEnroll.txnPwd="";
					self.RakValuationEnroll.authMode="";
					self.RakValuationEnroll.accountNumber="";
					self.RakValuationEnroll.successMessage="";
					self.RakValuationEnroll.accountId="";
					self.RakValuationEnroll.isTermsAccepted=false;
					self.RakValuationEnroll.clicked=false;
				},

				checkForRadioBtnClicked:function()
				{
					if (self.RakValuationEnroll.isBothType==true && self.RakValuationEnroll.clicked==false)
					{
						//rootScope.showErrorPopup(rootScope.appLiterals.APP.RAK_COMMON.MANDFILED);
						scope.setEvent('onRAKValuationEnrollNextClick');
					}
					if (self.RakValuationEnroll.isBothType==true && self.RakValuationEnroll.clicked==true)
					{
						if(self.RakValuationEnroll.accountId ==null || self.RakValuationEnroll.accountId == "")
						{
							rootScope.showErrorPopup(rootScope.appLiterals.APP.RAK_COMMON.MANDFILED);
						}
						else{
							scope.setEvent('onRAKValuationEnrollNextClick');
						}
					}
					if (self.RakValuationEnroll.isBothType==false && self.RakValuationEnroll.clicked==false)
					{
						if(self.RakValuationEnroll.accountId ==null || self.RakValuationEnroll.accountId == "")
						{
							rootScope.showErrorPopup(rootScope.appLiterals.APP.RAK_COMMON.MANDFILED);
						}
						else{
							scope.setEvent('onRAKValuationEnrollNextClick');
						}
					}
				},

				resetRakValuationEnrollContinue:function()
				{


					self.RakValuationEnroll.acceptTermsCheck1="";
					self.RakValuationEnroll.acceptTermsCheck2="";
					self.RakValuationEnroll.packageItem="";
					self.RakValuationEnroll.packageName="";
					self.RakValuationEnroll.packageCharge="";
					self.RakValuationEnroll.authStatus=true;
					self.RakValuationEnroll.txnPwd="";
					self.RakValuationEnroll.authMode="";
					self.RakValuationEnroll.isTermsAccepted=false;
					self.RakValuationEnroll.successMessage="";
				},
				resetRakValuationEnrollConfirm:function()
				{


					self.RakValuationEnroll.authStatus=true;
					self.RakValuationEnroll.txnPwd="";
					self.RakValuationEnroll.authMode="";

					self.RakValuationEnroll.successMessage="";

					if (self.RakValuationEnroll.acceptTermsCheck1=='Y' && self.RakValuationEnroll.acceptTermsCheck2=='Y')
						{
						self.RakValuationEnroll.isTermsAccepted=true;
						}
					else
						{
						rootScope.showErrorPopup(rootScope.appLiterals.APP.RAK_COMMON.TERMS_CONDITION);
						self.RakValuationEnroll.isTermsAccepted=false;
						}

				}

	};


	self.rakValuationEnrollInit=function(responsesList)
	{
		if (!responsesList[0].hasOwnProperty('errorMessage'))
		{


			if (responsesList[0].hasOwnProperty('creditCardList'))
			{
				self.RakValuationEnroll.ccdList=responsesList[0].creditCardList;
			}
			if (responsesList[0].hasOwnProperty('operativeAccountsList'))
			{
				self.RakValuationEnroll.oprList=responsesList[0].operativeAccountsList;
			}
		}

		if  (self.RakValuationEnroll.ccdList.length==0&& self.RakValuationEnroll.oprList.length==0)
		{
			self.RakValuationEnroll.isEligibleToEnroll= false;

		}
		else
		{
			self.RakValuationEnroll.isEligibleToEnroll= true;
		}

		if(self.RakValuationEnroll.ccdList.length==0 && self.RakValuationEnroll.oprList!=0)
		{
			self.RakValuationEnroll.isACOpr=true;
			self.RakValuationEnroll.accountType ='ODA';
		}
		else
			if(self.RakValuationEnroll.ccdList.length!=0 && self.RakValuationEnroll.oprList==0)
			{
				self.RakValuationEnroll.isACCcd=true;
				self.RakValuationEnroll.accountType ='CCD';
			}
			else
				if(self.RakValuationEnroll.ccdList.length!=0 && self.RakValuationEnroll.oprList!=0) {

					self.RakValuationEnroll.isBothType=true;
				}

	};// END  of Enroll Init


// Start of  2 Enroll Html  Package Details
	self.rakValuationEnrollFetchPackageList=function(responsesList)
	{

		if (!responsesList[0].hasOwnProperty('errorMessage'))
		{


			if (responsesList[0].hasOwnProperty('packageList'))
			{
				self.RakValuationEnroll.packageList=responsesList[0].packageList;
			}


					if (self.RakValuationEnroll.accountType == "CCD" )
					{
						for (var i =0 ; i < self.RakValuationEnroll.ccdList.length ; i++)
				{
							if (self.RakValuationEnroll.ccdList[i].creditIndex==self.RakValuationEnroll.accountId)
					{
								self.RakValuationEnroll.accountNumber = self.RakValuationEnroll.ccdList[i].creditCardNumber;
					}

				}
						}
					else if (self.RakValuationEnroll.accountType == "ODA" )
						{

						for (var i =0 ; i < self.RakValuationEnroll.oprList.length ; i++)
						{
									if (self.RakValuationEnroll.oprList[i].accountIndex==self.RakValuationEnroll.accountId)
							{
										self.RakValuationEnroll.accountNumber = self.RakValuationEnroll.oprList[i].accountId;
							}

						}
						}




		}

	};

	self.rakValuationEnrollConfirm=function(responsesList)
	{

		for (var i =0 ; i < self.RakValuationEnroll.packageList.length ; i++)

		{
			if (self.RakValuationEnroll.packageList[i].index==self.RakValuationEnroll.packageItem){
			self.RakValuationEnroll.packageName = self.RakValuationEnroll.packageList[i].packageName;
			self.RakValuationEnroll.packageCharge = self.RakValuationEnroll.packageList[i].amount;
			}

		}

		if (!responsesList[0].hasOwnProperty('errorMessage'))
		{
			if(responsesList[0].auth == "")
				self.RakValuationEnroll.authStatus=false;
			else 
			{
				self.RakValuationEnroll.authStatus=true;
				self.RakValuationEnroll.authMode = responsesList[0].auth;
			}

		}


	};

	 self.rakValuationEnrollSuccess=function(responselist){

	    	if (!responselist[0].hasOwnProperty('errorMessage'))
			{
			self.RakValuationEnroll.successMessage=responselist[0].successRequest;
			}
	 };
// Start of Valuation  and Upgrade

	self.RakValuationUpgradeValuation={

			accountType:"",
			ccdList:[],
			oprList:[],
			utilBankingList:[],
			utilNonBankingList:[],
			isEligibleToEnroll:false,
			isACOpr:false,
			isACCcd:false,
			isBothType: false,
			accountId:"",
			packageList:[],
			acceptTermsCheck1:'N',
			acceptTermsCheck2:'N',
			packageItem:"",
			packageName:"",
			packageCharge:"",
			authStatus:true,
			authMode :"",
			txnPwd:"",
			successMessage:"",
			oprAccSel:"",
			ccdAccSel:"",
			accountNumber:"",
			isViewDetails:[],
			bankingRemBal:"",
			bankinfFreq:"",
			isRadioClick:false,
			isTermsAccepted:false,
			radioValidation:true,
			resetRakValuationUpgradeViewDetails:function(index)
			{
			self.RakValuationUpgradeValuation.isViewDetails[index]=false;
			},
			resetRakAccSelRadio:function()
			{
				self.RakValuationUpgradeValuation.oprAccSel="";
			},

			resetRakCcdSelRadio:function()
			{
				self.RakValuationUpgradeValuation.ccdAccSel="";
			},
			resetRakValuationUpgradeValuationHome:function()
			{
				self.RakValuationUpgradeValuation.accountType="";
				self.RakValuationUpgradeValuation.ccdList=[];
				self.RakValuationUpgradeValuation.accountId="";
				self.RakValuationUpgradeValuation.oprList=[];
				self.RakValuationUpgradeValuation.isEligibleToEnroll=false;
				self.RakValuationUpgradeValuation.isACOpr=false;
				self.RakValuationUpgradeValuation.isACCcd=false;
				self.RakValuationUpgradeValuation.isBothType=false;
				self.RakValuationUpgradeValuation.packageList=[];
				self.RakValuationUpgradeValuation.acceptTermsCheck1="";
				self.RakValuationUpgradeValuation.acceptTermsCheck2="";
				self.RakValuationUpgradeValuation.packageItem="";
				self.RakValuationUpgradeValuation.packageName="";
				self.RakValuationUpgradeValuation.packageCharge="";
				self.RakValuationUpgradeValuation.authStatus=true;
				self.RakValuationUpgradeValuation.txnPwd="";
				self.RakValuationUpgradeValuation.authMode="";
				self.RakValuationUpgradeValuation.accountNumber="";
				self.RakValuationUpgradeValuation.successMessage="";
				self.RakValuationUpgradeValuation.oprAccSel="";
				self.RakValuationUpgradeValuation.ccdAccSel="";
			},
			resetRakValuationUpgradeValuationContinue:function()
			{

				self.RakValuationUpgradeValuation.packageList="";
				self.RakValuationUpgradeValuation.acceptTermsCheck1="";
				self.RakValuationUpgradeValuation.acceptTermsCheck2="";
				self.RakValuationUpgradeValuation.packageItem="";
				self.RakValuationUpgradeValuation.packageName="";
				self.RakValuationUpgradeValuation.packageCharge="";
				self.RakValuationUpgradeValuation.authStatus=true;
				self.RakValuationUpgradeValuation.txnPwd="";
				self.RakValuationUpgradeValuation.authMode="";
				self.RakValuationUpgradeValuation.accountNumber="";
				self.RakValuationUpgradeValuation.successMessage="";
			},
			resetRakValuationUpgradeHomeReturn:function()
			{


				self.RakValuationUpgradeValuation.accountNumber="";
				self.RakValuationUpgradeValuation.accountType="";
				self.RakValuationUpgradeValuation.accountId='';
				self.RakValuationUpgradeValuation.oprAccSel="";
				self.RakValuationUpgradeValuation.ccdAccSel="";
				self.RakValuationUpgradeValuation.isRadioClick=false;
			},
			resetRakValuationUpgradeConfirm:function()
			{


				self.RakValuationUpgradeValuation.authStatus=true;
				self.RakValuationUpgradeValuation.txnPwd="";
				self.RakValuationUpgradeValuation.authMode="";

				self.RakValuationUpgradeValuation.successMessage="";

				if (self.RakValuationUpgradeValuation.acceptTermsCheck1=='Y' && self.RakValuationUpgradeValuation.acceptTermsCheck2=='Y')
					{
					self.RakValuationUpgradeValuation.isTermsAccepted=true;
					}
				else
					{

					rootScope.showErrorPopup(rootScope.appLiterals.APP.RAK_COMMON.TERMS_CONDITION);
					self.RakValuationUpgradeValuation.isTermsAccepted=false;
					}

			}



	};


	self.rakValuationUpdgradeValueInit=function(responsesList)
	{
		self.RakValuationUpgradeValuation.isRadioClick=false;
		self.RakValuationUpgradeValuation.radioValidation=true;
		
		if (!responsesList[0].hasOwnProperty('errorMessage'))
		{


			if (responsesList[0].hasOwnProperty('creditCardList'))
			{
				self.RakValuationUpgradeValuation.ccdList=responsesList[0].creditCardList;

			}
			if (responsesList[0].hasOwnProperty('operativeAccountsList'))
			{
				self.RakValuationUpgradeValuation.oprList=responsesList[0].operativeAccountsList;
			}
		}

		if  (self.RakValuationUpgradeValuation.ccdList.length==0&& self.RakValuationUpgradeValuation.oprList.length==0)
		{
			self.RakValuationUpgradeValuation.isEligibleToEnroll= false;

		}
		else
		{
			self.RakValuationUpgradeValuation.isEligibleToEnroll= true;
		}

		if(self.RakValuationUpgradeValuation.ccdList.length==0 && self.RakValuationUpgradeValuation.oprList!=0)
		{
			self.RakValuationUpgradeValuation.isACOpr=true;
			self.RakValuationUpgradeValuation.accountType ='ODA';
		}
		else
			if(self.RakValuationUpgradeValuation.ccdList.length!=0 && self.RakValuationUpgradeValuation.oprList==0)
			{
				self.RakValuationUpgradeValuation.isACCcd=true;
				self.RakValuationUpgradeValuation.accountType ='CCD';
			}
			else
				if(self.RakValuationUpgradeValuation.ccdList.length!=0 && self.RakValuationUpgradeValuation.oprList!=0) {

					self.RakValuationUpgradeValuation.isBothType=true;
				}

	}; // End of Init



	self.rakValuationUpggradeValue=function()
	{
		if(self.RakValuationUpgradeValuation.ccdAccSel!='')
		{  self.RakValuationUpgradeValuation.isRadioClick=true;
			for (var i =0 ; i < self.RakValuationUpgradeValuation.ccdList.length ; i++)

			{  if (self.RakValuationUpgradeValuation.ccdList[i].creditIndex==self.RakValuationUpgradeValuation.ccdAccSel)

			{
				self.RakValuationUpgradeValuation.accountId = self.RakValuationUpgradeValuation.ccdList[i].creditIndex;
				self.RakValuationUpgradeValuation.accountType ='CCD';
			}
			}
		}
		else if (self.RakValuationUpgradeValuation.oprAccSel!='')
			{  self.RakValuationUpgradeValuation.isRadioClick=true;
				for (var i =0 ; i < self.RakValuationUpgradeValuation.oprList.length ; i++)

				{  if (self.RakValuationUpgradeValuation.oprList[i].accountIndex==self.RakValuationUpgradeValuation.oprAccSel)
				{	self.RakValuationUpgradeValuation.accountId = self.RakValuationUpgradeValuation.oprList[i].accountIndex;
				self.RakValuationUpgradeValuation.accountType ='ODA';
				}
				}

			}

		///added for validation

		if(!self.RakValuationUpgradeValuation.isRadioClick && self.RakValuationUpgradeValuation.radioValidation){
			rootScope.showErrorPopup(rootScope.appLiterals.APP.RAK_COMMON.ACCOUNTCREDIT);
			self.RakValuationUpgradeValuation.isRadioClick=false;
			self.RakValuationUpgradeValuation.radioValidation=true;
		}

	};

	//RAK  Rak Valuation END

	self.rakValuationUpgradeValuationFetchPackageList=function(responsesList)
	{

		if (!responsesList[0].hasOwnProperty('errorMessage'))
		{


			if (responsesList[0].hasOwnProperty('packageList'))
			{
				self.RakValuationUpgradeValuation.packageList=responsesList[0].packageList;
			}


					if (self.RakValuationUpgradeValuation.accountType == "CCD" )
					{
						for (var i =0 ; i < self.RakValuationUpgradeValuation.ccdList.length ; i++)
				{
							if (self.RakValuationUpgradeValuation.ccdList[i].creditIndex==self.RakValuationUpgradeValuation.accountId)
					{
								self.RakValuationUpgradeValuation.accountNumber = self.RakValuationUpgradeValuation.ccdList[i].creditCardNumber;
					}

				}
						}
					else if (self.RakValuationUpgradeValuation.accountType == "ODA" )
						{

						for (var i =0 ; i < self.RakValuationUpgradeValuation.oprList.length ; i++)
						{
									if (self.RakValuationUpgradeValuation.oprList[i].accountIndex==self.RakValuationUpgradeValuation.accountId)
							{
										self.RakValuationUpgradeValuation.accountNumber = self.RakValuationUpgradeValuation.oprList[i].accountId;
							}

						}
						}




		}

	};

	self.rakValuationUpgradeValuationConfirm=function(responsesList)
	{

		for (var i =0 ; i < self.RakValuationUpgradeValuation.packageList.length ; i++)

		{  if (self.RakValuationUpgradeValuation.packageList[i].index==self.RakValuationUpgradeValuation.packageItem)
			self.RakValuationUpgradeValuation.packageName = self.RakValuationUpgradeValuation.packageList[i].packageName;
		self.RakValuationUpgradeValuation.packageCharge = self.RakValuationUpgradeValuation.packageList[i].amount;

		}

		if (!responsesList[0].hasOwnProperty('errorMessage'))
		{
			if(responsesList[0].auth == "")
				self.RakValuationUpgradeValuation.authStatus=false;
			else 
			{
				self.RakValuationUpgradeValuation.authStatus=true;
				self.RakValuationUpgradeValuation.authMode = responsesList[0].auth;
			}

		}


	};

	 self.rakValuationUpgradeValuationSuccess=function(responselist){

	    	if (!responselist[0].hasOwnProperty('errorMessage'))
			{
			self.RakValuationUpgradeValuation.successMessage=responselist[0].successRequest;
			}
	 };


		self.rakValuationUtilizationInit=function(responsesList)
		{



			if (!responsesList[0].hasOwnProperty('errorMessage'))
			{
				if (responsesList[0].hasOwnProperty('bankingList'))
				{
					self.RakValuationUpgradeValuation.utilBankingList=responsesList[0].bankingList;
				}

				if (responsesList[0].hasOwnProperty('nonBankingsList'))
				{
					self.RakValuationUpgradeValuation.utilNonBankingList=responsesList[0].nonBankingsList;
				}

			}

			if (self.RakValuationUpgradeValuation.accountType == "CCD" )
			{
				for (var i =0 ; i < self.RakValuationUpgradeValuation.ccdList.length ; i++)
		{
					if (self.RakValuationUpgradeValuation.ccdList[i].creditIndex==self.RakValuationUpgradeValuation.accountId)
			{
						self.RakValuationUpgradeValuation.accountNumber = self.RakValuationUpgradeValuation.ccdList[i].creditCardNumber;
						self.RakValuationUpgradeValuation.packageName=self.RakValuationUpgradeValuation.ccdList[i].creditCardPack;
			}

		}
				}
			else if (self.RakValuationUpgradeValuation.accountType == "ODA" )
				{

				for (var i =0 ; i < self.RakValuationUpgradeValuation.oprList.length ; i++)
				{
							if (self.RakValuationUpgradeValuation.oprList[i].accountIndex==self.RakValuationUpgradeValuation.accountId)
					{
								self.RakValuationUpgradeValuation.accountNumber = self.RakValuationUpgradeValuation.oprList[i].accountId;
								self.RakValuationUpgradeValuation.packageName=self.RakValuationUpgradeValuation.oprList[i].accountPack;
					}

				}
				}




		};


		self.rakValuationUtilizationViewDetails=function(index)
		{
			self.RakValuationUpgradeValuation.isViewDetails[index]=true;

		};


		
		
		self.swiperFunctionAccList = function()
		 {

			
				
				if (self.accType == "OPR") {
				//	self.RAKAccountsModel.operativeAccounts = response[0].operativeAccountsList;
					self.RAKAccountsModel.accountType = "OPR";
					//self.RAKAccountsModel.subAccountType = "OPR";
					self.RAKAccountsModel.subType = "OPR";
					self.RAKAccountsModel.pageName="Android_OprBalance";
					self.RAKAccountsModel.requestID="ANDROID_OPR_BALANCE";
					self.RAKAccountsModel.successPage="Android_OprBalance_JSON.jsp";
					
					scope.setEvent('onClickOfAccountInfo');

				}
				if (self.accType == "TRADE") {
					//	self.RAKAccountsModel.operativeAccounts = response[0].operativeAccountsList;
						self.RAKAccountsModel.accountType = "OPR";
						//self.RAKAccountsModel.subAccountType = "OPR";
						self.RAKAccountsModel.subType="CAA";
						self.RAKAccountsModel.pageName="Android_OprBalance";
						self.RAKAccountsModel.requestID="ANDROID_OPR_BALANCE";
						self.RAKAccountsModel.successPage="Android_OprBalance_JSON.jsp";
						
						scope.setEvent('onTradeClickOfAccountInfo');

				}
				if (self.accType == "DEP") {
				//	self.RAKAccountsModel.depositAccounts = response[0].depositAccountsList;
					self.RAKAccountsModel.accountType = "DEP";
					self.RAKAccountsModel.pageName="Android_Dep_Balance_Ministatement";
					self.RAKAccountsModel.requestID="ANDROID_DEP_ACDETAILS";
					self.RAKAccountsModel.successPage="Android_Dep_Balance_JSON.jsp";
					
					scope.setEvent('onClickOfAccountInfo');
				}
				if (self.accType == "LON") {
				//	self.RAKAccountsModel.loanAccounts = response[0].loanAccountsList;
					self.RAKAccountsModel.accountType = "LON";
					self.RAKAccountsModel.pageName="Android_Lon_Balance_Ministatement";
					self.RAKAccountsModel.requestID="ANDROID_LON_ACDETAILS";
					self.RAKAccountsModel.successPage="Android_Lon_Balance_Ministatement_JSON.jsp";
					
					scope.setEvent('onClickOfAccountInfo');
				}
				if (self.accType == "GLD") {
				//	self.RAKAccountsModel.goldAccounts = response[0].goldAccountsList;
					self.RAKAccountsModel.accountType = "GLD";
					self.RAKAccountsModel.pageName="RAK_GoldAccount";
					self.RAKAccountsModel.requestID="ANDROID_OPR_BALANCE";
					self.RAKAccountsModel.successPage="RAK_GoldAccount_JSON.jsp";
					
					scope.setEvent('onClickOfAccountInfo');
				}
				if (self.accType == "CCD") {
				//	self.RAKAccountsModel.creditAccounts = response[0].ccList;
					self.RAKAccountsModel.accountType = "CCD";
					//Rak  Not needed will be removed 
					self.RAKAccountsModel.pageName="Android_CCDetails";
					self.RAKAccountsModel.requestID="ANDROID_CC_DETAILS";
					self.RAKAccountsModel.successPage="RAKAndroid_CCViewDetails_JSON.jsp";
					
					if (self.cardType =="SUP"){
						scope.setEvent('onSuppCCViewClick');
					}
					else{
					scope.setEvent('onCCViewSwiperInfoClick');
					//scope.setEvent('onCCViewClick');
					}
					
				}
				self.swiperFalg = "clicked";
				
				/*if (response[0].hasOwnProperty('invAccountsList')) {
					self.RAKAccountsModel.invtAccounts = response[0].invAccountsList;										
					self.RAKAccountsModel.accountType = "MTF";
				}
				if (response[0].hasOwnProperty('invTxnDetailsList')) {
					self.RAKAccountsModel.invPortfolioList = response[0].invTxnDetailsList;
					//self.RAKAccountsModel.transactionsPortfolioList=response[0].invTxnDetailsList;
					self.RAKAccountsModel.accountType = "MTF";
				}*/
			//	self.testEmptyStr="";
				
				
				
			};
		
		
		


};

