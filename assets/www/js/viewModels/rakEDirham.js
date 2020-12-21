App.viewModels.rakEDirham = function(Logger, scope, rootScope,UIControlsService,ActionProcessor,window,timeout,$filter,$interval) {
	
	var self = this;
	
		rootScope.isRegistered='';
	
	
		self.eDirhamDetails = {
				pin:null,
				confirmPin:null,
				isTouchId:true,
				accountArr:[],
				accountModel:'',
				pinFlag:true,
				enableTouchFlag:false,
				acctFlag:false,
				isEDWRegistered:true,
				pinConfirmFlag:false,
				acctNickName:'',
				txnDate:new Date(),
				fromWelcomePage:false
				
		};
		self.eDirhamTokenGeneration = {
				
				isTokenGenerate:false,
				pin:'',
				token:'',
				isTimer:true,
				amount:null,
				merchantName:'',
				expiry:null,
				timer:null,
				callTxnServiceFlag:true,
				txnPollingDetails:null,
				approvalStatus:'A',
				timerStatus:'T',
				counter:0,
				countdown:null,
				authTimer:null,
				fromAuthPage:false,
				authCountdown:null,
				authIntervalId:null,
				authCounter:0
				
				
		};
		self.eDirhamSettings = {
				blockEdirham:false,
				isAcctSet:true,
				isChangePin:false,
				isRegistered:false,
				edAccountId:'',
				BlockStatus:'B',
				isAcctBlocked:'',
				blockNewStatus:''
		};
		self.eDirhamHistory = {
				search:true,
				fromDate:new Date().addMonths(-1),
				toDate:new Date(),
				selectedTransferList:null,
				schTxnListSubmitBtn:'',
				selectedMcfRef:'',
				historyList:[],
				fromDate_year:"",
				fromDate_month:"",
				fromDate_day:"",
				toDate_year:"",
				toDate_month:"",
				toDate_day:"",
		};
		self.common = {
				authStatus:'',
				authMode:'',
				message:'',
				txnPswd:'',
				isAuthSet:false,
				authValue:null,
				authType:null,
				sucMsg:'',
				errorMsg:'',
				date:"",
				month:"",
				year:"",
				displayDate:null,
				txnType:'EDS',
				txnTypeReg:'EDM',
				hideMenuFlag:false,
				customizeApprovalSuccMsg:''
				
		};
		self.tokenRequest = {
				acctModel:'',
				acctArray:[],
				acceptTermscondition:'N',
				selectedAccount:'',
				otp:'',
				otpExp:null,
				timer:null,
				isTimer:true
		}
		self.authMode = {
				OTP : 0,
				TransactionPassword : 1,
				None : -1
			};
	self.utils ={
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
			setFromToDate : function() {
				self.common.displayDate = self.eDirhamHistory.fromDate;
				self.utils.populateCurrentDateDetails();

				self.eDirhamHistory.fromDate_day =self.common.date;
				self.eDirhamHistory.fromDate_month=self.common.month;
				self.eDirhamHistory.fromDate_year=self.common.year;

				self.common.displayDate = self.eDirhamHistory.toDate;
				self.utils.populateCurrentDateDetails();

				self.eDirhamHistory.toDate_day =self.common.date;
				self.eDirhamHistory.toDate_month=self.common.month;
				self.eDirhamHistory.toDate_year=self.common.year;
			 },
	}
		
	self.clearTab = function() {
		
		self.eDirhamDetails.isTouchId=true;
		self.eDirhamDetails.accountArr=[];
		self.eDirhamDetails.isEDWRegistered=true;
		self.eDirhamDetails.acctNickName='';
		self.eDirhamDetails.txnDate=new Date();
		self.eDirhamDetails.fromWelcomePage=false;
		self.eDirhamDetails.accountModel='';
		self.eDirhamDetails.confirmPin='';
		self.eDirhamDetails.pin='';
		self.eDirhamDetails.pinFlag=true;
		self.eDirhamDetails.enableTouchFlag=false;
		self.eDirhamDetails.acctFlag=false;
		self.eDirhamDetails.pinConfirmFlag=false;
		self.eDirhamSettings.blockEdirham=false;
		self.eDirhamSettings.isAcctSet=true;
		self.eDirhamSettings.isChangePin=false;
		self.eDirhamTokenGeneration.isTokenGenerate=false;
		self.eDirhamTokenGeneration.pin='';
		self.eDirhamTokenGeneration.token='';
		self.eDirhamTokenGeneration.isTimer=true;
		self.eDirhamTokenGeneration.amount=null;
		self.eDirhamTokenGeneration.merchantName='';
		self.eDirhamTokenGeneration.expiry=null;
		self.eDirhamTokenGeneration.timer=null;
		self.eDirhamTokenGeneration.callTxnServiceFlag=true;
		self.eDirhamTokenGeneration.txnPollingDetails=null;
		self.eDirhamTokenGeneration.approvalStatus='A';
		self.eDirhamHistory.search=true;
		self.eDirhamHistory.fromDate=new Date().addMonths(-1);
		self.eDirhamHistory.toDate=new Date();
		self.eDirhamHistory.selectedTransferList=null;
		self.eDirhamHistory.schTxnListSubmitBtn='';
		self.eDirhamHistory.selectedMcfRef='';
		self.eDirhamHistory.historyList=[];
		self.eDirhamHistory.fromDate_year="";
		self.eDirhamHistory.fromDate_month="";
		self.eDirhamHistory.fromDate_day="";
		self.eDirhamHistory.toDate_year="";
		self.eDirhamHistory.toDate_month="";
		self.eDirhamHistory.toDate_day="";
		self.common.authStatus='';
		self.common.authMode='';
		self.common.message='';
		self.common.txnPswd='';
		self.common.isAuthSet=false;
		self.common.authValue=null;
		self.common.authType=null;
		self.common.sucMsg='';
		self.common.errorMsg='';
		self.common.date="";
		self.common.month="";
		self.common.year="";
		self.tokenRequest.displayDate=null;
		self.tokenRequest.acctModel='';
		self.tokenRequest.acctArray=[];
		self.tokenRequest.acceptTermscondition='N';
		self.tokenRequest.selectedAccount='';
		self.tokenRequest.otp='';
		self.tokenRequest.otpExp=null;
		self.tokenRequest.timer=null;
		self.tokenRequest.isTimer=true;
		

	}
		
	self.setEDirhamFlag = function(flagVal)
	{
		window.localStorage.setItem('isEDhirhamAuth',flagVal);
		//window.localStorage.setItem('isEDhirhamMenuFlag',flagVal);
		//window.localStorage.setItem('isEDhirhamMenuFlag',flagVal);
	};
	self.setEdirhamMenuFlag= function(flagVal)
	{
		window.localStorage.setItem('isEDhirhamMenuFlag',flagVal);
	}
	self.getRegEvent = function()
	{
		self.eDirhamDetails.isEDWRegistered=false;
		if(!self.eDirhamDetails.isEDWRegistered)
		{
			window.localStorage.setItem('isEDhirhamAuth','true');
			
			scope.setEvent('onRetailClick');
		}
		else
		{
			self.eDirhamDetails.pinFlag=true;
			scope.setEvent('onRegisterUserClick');

		}	
	}
	self.getNavigationPage = function()
	{
		if(rootScope.isEdhirhamAuth=='true')
		{
		scope.setEvent('onEDirhamClick');
		}
	}
	self.timerFinished = function()
	{
		self.eDirhamTokenGeneration.isTimer=false;
		self.eDirhamTokenGeneration.callTxnServiceFlag=true;
		rootScope.rakEDirham.stopInterval();
		ActionProcessor.setEvent('onEdirhamTxnTimeoutClick').then(function(payload) {

			//console.log(JSON.stringify(payload));
			var response=payload;
			if(!response.responsesList[0].hasOwnProperty("errorMessage")){
			//	rootScope.showErrorPopup(msg);
				
			}
			

		},function(errorPayload){
		
		});
		if(!self.eDirhamTokenGeneration.fromAuthPage)
			{
			UIControlsService.showValidationAlert(rootScope.appLiterals.APP.EDIRHAM.TOKEN_EXP_ERROR,'OK');
			}
		else
			{
			UIControlsService.showValidationAlert(rootScope.appLiterals.APP.EDIRHAM.AUTH_TIME_EXP_ERROR,'OK')
			}
		
		
		
		
	}
	self.onTokenGenerateClick = function()
	{
		self.eDirhamTokenGeneration.isTimer=true;
        scope.$broadcast('timer-start');
        self.eDirhamTokenGeneration.isTimer= true;
        self.eDirhamTokenGeneration.callTxnServiceFlag=true;
	}
	self.getEdirhamDetailsEvent = function()
	{
		self.eDirhamTokenGeneration.isTokenGenerate=false;
		if(self.eDirhamTokenGeneration.isTokenGenerate)
		{
			scope.setEvent('onEDirhamAuthClick');
		}
		else
		{
			
			scope.setEvent('onEDirhamClick');
		}
	}
	self.clearEdirhamPreloginData= function()
	{
		 window.localStorage.setItem('isEDhirhamMenuFlag','false');
	}
	self.initEdirham=function(responseList)
	{
		
		self.eDirhamDetails.isTouchId=rootScope.appActivation.touchIdEnable;
		/*if( window.localStorage.getItem('isEDhirhamAuth')=="true")
			{
			self.common.hideMenuFlag=true;
			}
		else
			{
			self.common.hideMenuFlag=false;
			}*/
		
		 if (!responseList.hasOwnProperty('errorMessage')) {
				if(responseList.acctSummaryList)
				{
					if(responseList.acctSummaryList.length<=0)
					{
						if(window.localStorage.getItem('isEDhirhamAuth')=='true')
						{
							/*rootScope.fields.finacleUserCorporateId = null; 
							rootScope.fields.finacleUserPassword = null; */
							UIControlsService.showAlertScreen(undefined,rootScope.appLiterals.APP.EDIRHAM.EDIRHAM_NO_ACCT_ERROR,'OK',undefined);
							//scope.setEvent('onDiscoverAplyClick');
							
						}
						else
							{
							UIControlsService.showValidationAlert(rootScope.appLiterals.APP.EDIRHAM.EDIRHAM_NO_ACCT_ERROR,'OK');
							rootScope.rakServiceReq.RakDiscApply.resetRakDiscApplyData();
							rootScope.rakServiceReq.RakDiscApply.isFirstTimeFlag=true;
							scope.setGlobalEvent('onDiscAndapplyLinkClicked');
							}
						
					}

					else
						{
						self.eDirhamDetails.accountArr=responseList.acctSummaryList;
						self.eDirhamSettings.isRegistered=responseList.edRegistration;
						rootScope.isRegistered=responseList.edRegistration;
						self.eDirhamSettings.isAcctBlocked=responseList.edBlock;
						rootScope.rakHome.checkUserType(responseList);
						rootScope.rakHome.getBurgerMenuHeaderContent(responseList);
						rootScope.rakHome.checkForPremiumUser(responseList);
						}
					
				}
				else if(!responseList.responsesList[0].hasOwnProperty('errorMessage'))
					{
						if(responseList.responsesList[0].acctSummaryList)
							{
							if(responseList.responsesList[0].acctSummaryList.length<=0)
							{
								if(window.localStorage.getItem('isEDhirhamAuth')=='false')
								{
									
									UIControlsService.showAlertScreen(undefined,rootScope.appLiterals.APP.EDIRHAM.EDIRHAM_NO_ACCT_ERROR,'OK',undefined);
									//scope.setGlobalEvent('onLogoutClickOK');
									//scope.setEvent('onDiscoverAplyClick');
									
								}
								else
									{
									UIControlsService.showValidationAlert(rootScope.appLiterals.APP.EDIRHAM.EDIRHAM_NO_ACCT_ERROR,'OK');
									rootScope.rakServiceReq.RakDiscApply.resetRakDiscApplyData();
									rootScope.rakServiceReq.RakDiscApply.isFirstTimeFlag=true;
									scope.setGlobalEvent('onDiscAndapplyLinkClicked');
									//scope.setGlobalEvent('onDiscoverApplyClick');
									}
								
							}
							else
							{
								self.eDirhamDetails.accountArr=responseList.responsesList[0].acctSummaryList;
								self.eDirhamSettings.isRegistered=responseList.responsesList[0].edRegistration;
								self.eDirhamSettings.isAcctBlocked=responseList.responsesList[0].edBlock;
								rootScope.rakHome.checkUserType(responseList.responsesList[0]);
								rootScope.rakHome.getBurgerMenuHeaderContent(responseList.responsesList[0]);
								rootScope.rakHome.checkForPremiumUser(responseList.responsesList[0]);
							}
							
							
							}

					}
			 }
		 window.localStorage.setItem('isEDhirhamAuth','false');
		if(self.eDirhamSettings.isRegistered=='Y')
		{
			scope.setEvent('onEdirhamOverviewClick')
		}
		
	}
	self.getAuthConfirmEvent=function()
	{
		
			var eventSel = '';
			eventSel='onEdirhamSuccClick';
			return eventSel.toString();
	},
	self.pinRegisterSubmit = function() {
		if (self.eDirhamDetails.pin===self.eDirhamDetails.confirmPin) {
			scope.setEvent('onEdirhamSetPinNextClick');
			
		}
		else if(self.eDirhamDetails.pin!=self.eDirhamDetails.confirmPin && self.eDirhamDetails.pin && self.eDirhamDetails.confirmPin)
		{
			UIControlsService.showValidationAlert(rootScope.appLiterals.APP.EDIRHAM.VALID_PINREGISTER,'OK')
		}
		else if(!self.eDirhamDetails.pin || !self.eDirhamDetails.confirmPin)
		{
			UIControlsService.showValidationAlert(rootScope.appLiterals.APP.EDIRHAM.VALID_CONFIRM_PN,'OK')
		}
		
	}
	self.initRAKEDirhamRegConfirm = function(responsesList) {
		
		for(var l=0; l<self.eDirhamDetails.accountArr.length; l++)
		{
		if(self.eDirhamDetails.accountModel==self.eDirhamDetails.accountArr[l].index)
			{
			self.eDirhamDetails.acctNickName=self.eDirhamDetails.accountArr[l].subAcctType+"-"+self.eDirhamDetails.accountArr[l].acctNo+ "-"+ self.eDirhamDetails.accountArr[l].accountCurrencyCode;
			}
		}
		if (responsesList[0].hasOwnProperty('auth')) {
			if (responsesList[0].auth == "")
				self.common.authStatus = false;
			else {
				self.common.authStatus = true;
				self.common.authMode = responsesList[0].auth;
			}
			/* Added for dup chk */
			self.common.message = responsesList[0].MESSAGE ? responsesList[0].MESSAGE
					: '';
		}
		if (!responsesList[0].hasOwnProperty('errorMessage')) {
			if (self.common.authMode == "SOTP") {
				self.common.authType = self.authMode.OTP;
				self.common.isAuthSet = true;
			} else if (self.common.authMode == "STKN") {

				self.common.authType = self.authMode.TransactionPassword;
				WL.Logger.info('value for transaction Password'
						+ self.common.authType)
				self.common.isAuthSet = true;
			} else {
				self.common.authType = self.authMode.None;
				self.common.isAuthSet = false;
			}
		}

	};
	self.initRAKDirhamRegSuccess = function(responsesList) {
		if (!responsesList[0].hasOwnProperty('errorMessage'))
		{
				for(var l=0; l<self.eDirhamDetails.accountArr.length; l++)
				{
					if(self.eDirhamDetails.accountModel==self.eDirhamDetails.accountArr[l].index)
					{
					self.eDirhamDetails.acctNickName=self.eDirhamDetails.accountArr[l].subAcctType+"-"+self.eDirhamDetails.accountArr[l].acctNo+ "-"+ self.eDirhamDetails.accountArr[l].accountCurrencyCode;
					}
				}
			self.common.sucMsg = responsesList[0].successMsg;
			self.eDirhamSettings.isRegistered=responsesList[0].edRegistration;
		}
			
		if (responsesList[0].hasOwnProperty('errorMessage'))
			{
			self.common.sucMsg = responsesList[0].errorMessage;
			self.eDirhamSettings.isRegistered=responsesList[0].edRegistration;
			}
			
	};
	self.getPostLoginNavigation=function()
	{
		if(self.eDirhamSettings.isRegistered=='Y')
		{
			scope.setGlobalEvent("onDirhamMenuClick");
		}
		else
		{
			scope.setGlobalEvent("onDirhamMenuRegClick")
		}
	};
	self.initUpdateEdirham= function(responseList)
	{
		if(!responseList.hasOwnProperty('errorMessage'))
		{
		
		if(responseList.acctSummaryList)
		{
			self.eDirhamDetails.accountArr=responseList.acctSummaryList;
			self.eDirhamSettings.edAccountId=responseList.edAccountId;
			//self.eDirhamSettings.isRegistered=responseList.edRegistration;
		}
		else
		{
			self.eDirhamDetails.accountArr=responseList.responsesList[0].acctSummaryList;
			//self.eDirhamSettings.edAccountId=responseList.responsesList[0].edAccountId;
			//self.eDirhamSettings.isRegistered=responseList.responsesList[0].edRegistration;
		}
		ActionProcessor.setEvent('onEdirhamFetchDetailsClick').then(function(payload) {

			//console.log(JSON.stringify(payload));
			var response=payload;
			if(!response.responsesList[0].hasOwnProperty("errorMessage")){
			//	rootScope.showErrorPopup(msg);
				self.eDirhamSettings.edAccountId=response.responsesList[0].edAccountId;
			}
			

		},function(errorPayload){
			self.eDirhamSettings.edAccountId='';
		});
		}
		
	};
	self.getEdToken = function(responseList)
	{
		if(!responseList[0].hasOwnProperty('errorMessage'))
		{
			self.eDirhamTokenGeneration.token=null;
			self.eDirhamTokenGeneration.expiry=null;
			self.eDirhamTokenGeneration.fromAuthPage=false;
			
			if(responseList[0].edBauError=="" || responseList[0].edBauError==null)
			{
				self.eDirhamTokenGeneration.token=responseList[0].edToken;
				self.eDirhamTokenGeneration.expiry= parseInt(responseList[0].edTokenExp);
				if(responseList[0].edTxnAuthExp)
				{
					self.eDirhamTokenGeneration.authTimer= parseInt(responseList[0].edTxnAuthExp);
				}
				else
				{
					self.eDirhamTokenGeneration.authTimer= parseInt(rootScope.mobileAppConfig.appConfigData.EDIRHAM_AUTH_TIMER);
				}
				
				self.onTokenGenerateClick();
				 self.eDirhamTokenGeneration.countdown = self.eDirhamTokenGeneration.expiry;
                 var startTime = new Date();
                 self.eDirhamTokenGeneration.intervalId= $interval(function(){
                        var actualTime = new Date();
                        self.eDirhamTokenGeneration.counter = Math.floor((actualTime - startTime) / 1000);
                				self.eDirhamTokenGeneration.countdown = self.eDirhamTokenGeneration.expiry - self.eDirhamTokenGeneration.counter;
                    }, 1000);
				// self.eDirhamTokenGeneration.intervalId = $interval(function(){console.log(self.eDirhamTokenGeneration.expiry--)},1000);
				
				//self.eDirhamTokenGeneration.timer=parseInt(responseList[0].edTokenExp)/60;
				self.txnCallBackFxn();
			}
			else
			{
			
				scope.setEvent("onBackClick");
				UIControlsService.showValidationAlert(responseList[0].edBauError,'OK')
				
			}
		
		}
		
		
	};
	self.stopInterval=function()
	{
		
			self.eDirhamTokenGeneration.countdown=null;
			$interval.cancel(self.eDirhamTokenGeneration.intervalId);
		
		
	}
	self.stopAuthInterval=function()
	{
		self.eDirhamTokenGeneration.authCountdown=null;
		$interval.cancel(self.eDirhamTokenGeneration.authIntervalId);
	}
	self.txnCallBackFxn = function()
	{
		if(parseInt(self.eDirhamTokenGeneration.countdown)<=0)
		{
			self.eDirhamTokenGeneration.callTxnServiceFlag=false;
			self.eDirhamTokenGeneration.isTimer=false;
			self.timerFinished();
		}
		if(self.eDirhamTokenGeneration.callTxnServiceFlag && self.eDirhamTokenGeneration.isTimer)
		{
			setTimeout(function() {
			ActionProcessor.setEvent('onEdirhamTxnClick').then(function(payload) {

				//console.log(JSON.stringify(payload));
				var response=payload;
				if(response.responsesList[0].edPollingSuccessFlag=="true"){
				//	rootScope.showErrorPopup(msg);
					self.eDirhamTokenGeneration.callTxnServiceFlag=false;
					self.eDirhamTokenGeneration.txnPollingDetails=response.responsesList[0].edmTxnPollingDetailsList;
					if(self.eDirhamTokenGeneration.txnPollingDetails.txnStatus=="BRJ")
						{
						scope.setEvent('onBackClick');
						UIControlsService.showValidationAlert(rootScope.appLiterals.APP.EDIRHAM.DECLINE_CUSTOM_MSG,'OK')
						}
					else
					{
						scope.setEvent('onEdirhamTxnSuccessClick');
					}
					
				}
				else
				{
					if(response.responsesList[0].isValidationFail=="false")
					{
						self.eDirhamTokenGeneration.callTxnServiceFlag=true;
						self.txnCallBackFxn();
					}
					else
						{
						self.eDirhamTokenGeneration.callTxnServiceFlag=false;
						scope.setEvent('onBackClick');
						UIControlsService.showValidationAlert(response.responsesList[0].ERROR_MSG,'OK')
						}
					
				}

			},function(errorPayload){
				self.eDirhamTokenGeneration.callTxnServiceFlag=true;
				self.txnCallBackFxn();
			});
			},2000);
		}

	}
	self.initBlockEdirham = function(responseList)
	{
		//self.eDirhamTokenGeneration.token=responseList[0].edToken;
		if(self.eDirhamSettings.isAcctBlocked=='B')
		{
			self.eDirhamSettings.blockEdirham=true;
		}
		else
		{
			self.eDirhamSettings.blockEdirham=false;
		}
		if(!self.eDirhamSettings.blockEdirham)
		{
			self.eDirhamSettings.BlockStatus='B'
		}
		else
		{
			self.eDirhamSettings.BlockStatus='A'
		}
		if(!responseList.hasOwnProperty('errorMessage'))
		{
		self.eDirhamSettings.edAccountId=responseList.edAccountId;
		}
	};
	self.initRAKDirhamBlockSuccess = function(responsesList)
	{
		if (!responsesList[0].hasOwnProperty('errorMessage'))
		{
			self.common.sucMsg = responsesList[0].successMsg;
			
				self.eDirhamSettings.isAcctBlocked=responsesList[0].BlockStatus;
			
		}
			
		if (responsesList[0].hasOwnProperty('errorMessage'))
			self.common.sucMsg = responsesList[0].errorMessage;
	};
	self.initRAKEDirhamBlockConfirm = function(responsesList) {
		
		if (responsesList[0].hasOwnProperty('auth')) {
			if (responsesList[0].auth == "")
				self.common.authStatus = false;
			else {
				self.common.authStatus = true;
				self.common.authMode = responsesList[0].auth;
			}
			/* Added for dup chk */
			self.common.message = responsesList[0].MESSAGE ? responsesList[0].MESSAGE
					: '';
		}
		if (!responsesList[0].hasOwnProperty('errorMessage')) {
			self.eDirhamSettings.blockNewStatus=responsesList[0].EdBlockNewStatus;
			if (self.common.authMode == "SOTP") {
				self.common.authType = self.authMode.OTP;
				self.common.isAuthSet = true;
			} else if (self.common.authMode == "STKN") {

				self.common.authType = self.authMode.TransactionPassword;
				WL.Logger.info('value for transaction Password'
						+ self.common.authType)
				self.common.isAuthSet = true;
			} else {
				self.common.authType = self.authMode.None;
				self.common.isAuthSet = false;
			}
		}

	};
	self.initTokenGenerateRequest = function(responseList)
	{
		self.tokenRequest.acctModel='';
		self.tokenRequest.acceptTermscondition='N';
		if (!responseList.hasOwnProperty('errorMessage')) {
		self.tokenRequest.acctArray=responseList.OprAcctList;
		}
	}
	self.tokenRequestSetEvent = function()
	{
		if(self.tokenRequest.acceptTermscondition=='N')
		{
			rootScope.showErrorPopup(rootScope.appLiterals.APP.RAK_SERVICES.RAK_INV_OPEN.TERMS_COND_ERROR);
		}
		else
		{
			scope.setEvent('onEdirhamTokenRequestConfirmClick');
		}
	};
	self.initTokenRequestPreview= function()
	{
		for(var l=0;l<self.tokenRequest.acctArray.length;l++)
			{
			if(self.tokenRequest.acctArray[l].accountIndex==self.tokenRequest.acctModel)
				{
				self.tokenRequest.selectedAccount=self.tokenRequest.acctArray[l].acctTypeDesc + '-' + self.tokenRequest.acctArray[l].accountNumber+'-'+self.tokenRequest.acctArray[l].currencyCode;
				}
			}
		
	};
	self.initTxnHistoryPage = function(responseList)
	{
		
		if (!responseList[0].hasOwnProperty('errorMessage')) {
		self.eDirhamHistory.historyList=responseList[0].edmTxnHistoryListList;
		}
	}
	self.initTxnHistoryDetails=function(responseList)
	{
		
		self.eDirhamHistory.fromDate=new Date().addMonths(-1);
		self.eDirhamHistory.toDate=new Date();
		/*self.eDirhamHistory.selectedFromDate=($filter('date')(new Date(self.eDirhamHistory.fromDate), "dd/MM/yyyy"));
		self.eDirhamHistory.selectedToDate=($filter('date')(new Date(self.eDirhamHistory.toDate), "dd/MM/yyyy"));*/
		
			self.eDirhamHistory.selectedTransferList=responseList[0].edmTxnDetailsList;
			
	}
	self.getFormattedDates = function(){
		/*self.eDirhamHistory.selectedFromDate=($filter('date')(new Date(self.eDirhamHistory.fromDate), "dd/MM/yyyy"));
		self.eDirhamHistory.selectedToDate=($filter('date')(new Date(self.eDirhamHistory.toDate), "dd/MM/yyyy"));*/
		if(self.eDirhamHistory.toDate<self.eDirhamHistory.fromDate)
			{
			UIControlsService.showValidationAlert(rootScope.appLiterals.APP.EDIRHAM.REJECT_CUSTOM_MSG,'OK')
			}
		else
			{
			ActionProcessor.setEvent('onHistoryClick').then(function(payload) {

				//console.log(JSON.stringify(payload));
				var response=payload;
				if(!response.responsesList[0].hasOwnProperty("errorMessage")){
				//	rootScope.showErrorPopup(msg);
					//self.eDirhamSettings.edAccountId=response.responsesList[0].edAccountId;
					self.eDirhamHistory.historyList=response.responsesList[0].edmTxnHistoryListList;
				}
				

			},function(errorPayload){
				self.eDirhamHistory.historyList=[];
			});
			}

	};
	self.requestOtpInit = function(responsesList)
	{
		if(!responsesList[0].hasOwnProperty('errorMessage'))
		{

			self.common.sucMsg = responsesList[0].successMsg;
		}
		//self.txnCallBackFxn();
		
	};
	self.nativeTimerFinished = function()
	{
		self.tokenRequest.isTimer=false;
	}
	self.nativeTokenGenerateClick = function()
	{
		self.tokenRequest.isTimer=true;
        scope.$broadcast('timer-start');
        self.tokenRequest.isTimer= true;
	};
	self.initApproveStatusSuccess = function(responsesList) {
		if (!responsesList[0].hasOwnProperty('errorMessage'))
			{
			if(self.eDirhamTokenGeneration.approvalStatus=='A')
				{
				self.common.customizeApprovalSuccMsg=rootScope.appLiterals.APP.EDIRHAM.APPRV_CUSTOM_MSG;
				}
			else
				{
				self.common.customizeApprovalSuccMsg=rootScope.appLiterals.APP.EDIRHAM.REJECT_CUSTOM_MSG;
				}
			self.common.sucMsg = self.common.customizeApprovalSuccMsg+responsesList[0].mcfRefNo;
			}
			
		if (responsesList[0].hasOwnProperty('errorMessage'))
			self.common.sucMsg = responsesList[0].errorMessage;
	};
	self.validateFundingAccount=function()
	{
		if(self.eDirhamDetails.accountArr[self.eDirhamDetails.accountModel].acctNo!=self.eDirhamSettings.edAccountId)
		{
		scope.setEvent('onRAKEDirhamUpdateContinueClick')
		}
	else
		{
		UIControlsService.showValidationAlert(rootScope.appLiterals.APP.EDIRHAM.EDIRHAM_VALIDATE_FUND_ACCT_ERR,'OK')
		}
	};
	self.getHideMenuFlagValue=function()
	{
		if(window.localStorage.getItem('isEDhirhamAuth')=="true")
		{
			window.localStorage.setItem('isEDhirhamMenuFlag',"true");
		}
		else
		{
			window.localStorage.setItem('isEDhirhamMenuFlag',"false");
		}
	};
	self.initTxnApprove= function()
	{
	//	self.eDirhamTokenGeneration.authTimer= parseInt(rootScope.mobileAppConfig.appConfigData.EDIRHAM_AUTH_TIMER);
		self.eDirhamTokenGeneration.fromAuthPage=true;
		
		 self.eDirhamTokenGeneration.authCountdown = self.eDirhamTokenGeneration.authTimer;
         var startTime = new Date();
         self.eDirhamTokenGeneration.authIntervalId= $interval(function(){
                var actualTime = new Date();
                self.eDirhamTokenGeneration.authCounter = Math.floor((actualTime - startTime) / 1000);
        				self.eDirhamTokenGeneration.authCountdown = self.eDirhamTokenGeneration.authTimer - self.eDirhamTokenGeneration.authCounter;
            }, 1000);
		
	}
};