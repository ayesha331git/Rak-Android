App.viewModels.rakCreditCard=function(Logger){
	var self=this;
	// declare variables here
	self.creditAcCount = 0;
	self.customerInfo=null;
	self.accounts=[];
	
	self.currencyCode=null;
	self.statmentDate=null;
	self.selectedFromDate=new Date();
	
	self.toDateDay = '';
	self.toDateMonth = '';
	self.toDateYear = '';
	
	self.scheduleDate= new Date().addDays(1);
	self.scheduleDateDay = self.scheduleDate.getDate().toString();
	self.scheduleDateMonth = (self.scheduleDate.getMonth() +  1).toString();
	self.scheduleDateYear = self.scheduleDate.getFullYear().toString();
	
	self.isCCSearch=false;
	self.isViewDetails=false;
	self.ccIndex=0;
	self.ccIndexStr='';
	self.selectedAccount=null;
	self.cardDetails=null;
	self.currAccountDetails=null;
	self.ccTxnHistory=null;
	self.authPaymentModel=null;
	// variables for init call
	self.emptyStr='';
	self.emptyString='';
	self.outStandingAmt=null;
	self.txnPwdStr='Transaction Password';
	self.otpPwdStr='SMS OTP';
	self.selectedAcIndex=0;
	self.remarks='';
	self.holidayList=[];
	self.isPayment=true;
	
	self.selectedFrequency=null;
	self.everyNdays=null;
	self.noOfInstallments="";
	self.selectedHolidayCode=null;
	self.isBack=false;
	self.isNdays=null;
	/*self.primaryCard=[];
	self.suppCard=[];
	self.productCategory='';*/
	// all functions here 
	
	self.getList = function(responseList){
		self.viewFlag1=false;
		self.viewFlag2=false;

		self.customerInfo = responseList;
	//added to remove the console error
		//if (null != responseList.hasOwnProperty("ccList")){
		
        self.customerName = responseList.customerName;
        self.ccList = responseList.ccList;
        if(self.ccList != null)
        	self.creditAcCount = self.ccList.length;
        
        
        self.primaryCard=[];
        jQuery(responseList.ccList).each(function(index,value){
        	if(value.isPrimary=="Y")
        	{
        		self.primaryCard.push(value);
        	}
        });
        
        
         self.suppCard=[];
         jQuery(responseList.ccList).each(function(index,value){
        	if(value.isPrimary=="N")
        	{
        		self.suppCard.push(value);
        	}
        	});
       /* if (self.primarySuppFlag=='Y'|| self.productCategory=='P' ) {
		
        	self.primaryCard= self.ccList;
        	}
        	if(self.suppFlag =='Y' && self.productCategory=='S'){
        	self.suppCard= self.ccList;
        	}*/
        
	//	}
	};
	self.selectFromDate = function(){
		self.fromDateDay = self.selectedFromDate.getDate().toString();
		self.fromDateMonth = (self.selectedFromDate.getMonth() +  1).toString();
		self.fromDateYear = self.selectedFromDate.getFullYear().toString();
		if(!(self.selectedToDate instanceof Date)){
			self.toDateDay = '';
			self.toDateMonth = '';
			self.toDateYear = '';
		}
		//return;
	};
	self.selectFromDate();
	self.selectToDate = function(){
		self.toDateDay = self.selectedToDate.getDate().toString();
		self.toDateMonth = (self.selectedToDate.getMonth() +  1).toString();
		self.toDateYear = self.selectedToDate.getFullYear().toString();
		//return;
	};
	self.selectScheduleDate = function(){
		self.scheduleDateDay = self.scheduleDate.getDate().toString();
		self.scheduleDateMonth = (self.scheduleDate.getMonth() +  1).toString();
		self.scheduleDateYear = self.scheduleDate.getFullYear().toString();
		//return;
	};
	self.selectedCC=function(){
		self.ccIndexStr=self.ccIndex+'';
		//self.selectedOprAccount = self.ccList[self.ccIndex]; 
		//self.selectAcccountMax = self.ccList.length;
	};
	self.responseAcDetails=function(response){
		self.isViewDetails=false;
		
		// this call receives response of 2 adapters together
		if(response.responsesList.length>1){
		self.cardDetails=response.responsesList[0];
		self.currencyCode=self.cardDetails.currencyCode;
		self.outStandingAmt=self.cardDetails.totalOutstandingAmount;
		self.statmentDate=self.cardDetails.statementDate.split(' ')[0];
		self.ccTxnHistory=response.responsesList[1].ccTxnDetailsList;
		self.isCCSearch=false;
		}
		else{
			if(response.hasOwnProperty('responsesList')){
			if(!response.responsesList[0].hasOwnProperty('errorMessage') && response.responsesList[0].hasOwnProperty('ccTxnDetailsList')){
			self.ccTxnHistory=response.responsesList[0].ccTxnDetailsList;
			self.isCCSearch=false;	
				}	
			}
		}
		self.selectedFromDate=null;
		self.selectedToDate=null;	
	};
	self.goResponseViewDetail=function(response){
		if(response.responsesList.length>1)
			{
			self.responseAcDetails(response);
			}
		else
		{
			if(!response.responsesList[0].hasOwnProperty('errorMessage') && !response.responsesList[0].hasOwnProperty('noOfRecs')){
		self.cardDetails=response.responsesList[0];
			}
		}
	};
	self.resetFilterDates=function(){
		self.selectedFromDate=null;
		self.selectedToDate=null;	
	};
	// credit card payment function
	self.responsePaymentInit=function(response){
		self.noOfInstallments=self.noOfInstallments*1;
		if(!self.isBack){
		self.isPayment=true;
		self.accounts=response.responsesList[0].fromAccounts;
		self.selectedAcIndex=0;
		self.remarks='';
		self.holidayList=response.responsesList[0].holidayList;
		self.paymentFrequency=response.responsesList[0].paymentFrequency;
		self.outStandingAmt=self.outStandingAmt *1;
		self.selectedFrequency='';
		self.everyNdays='';
		self.scheduleDate='';
		self.noOfInstallments='';
		self.selectedHolidayCode='';
		self.selectedFromDate=new Date();
		}
		self.isBack=false;
	};
	// credit card payment continue function
	self.responsePaymentContinue=function(response){
		//self.res=response;
		if(! response.responsesList[0].hasOwnProperty('errorMessage')){
		self.authPaymentModel=response.responsesList[0];
		self.authPaymentModel.authMode =self.authPaymentModel.auth;
		}
		self.authPaymentModel.auth='';
	};
	// credit card payment success
	self.responsePaymentSuccess=function(response){
		self.paymentSuccessModel=response.responsesList[0];
	};
	self.changeToString=function(){
		self.everyNdays=self.everyNdays + '';
		self.noOfInstallments=self.noOfInstallments+ '';		
		self.selectedAcIndex=self.selectedAcIndex + '';
	};
	
	self.onFreqencyChange=function(){
		self.isNdays=null;
		if(self.selectedFrequency=="N")
			{
			self.isNdays=true;
			}
	};
};