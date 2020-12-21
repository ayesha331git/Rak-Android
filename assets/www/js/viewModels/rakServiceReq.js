
/* JavaScript content from js/viewModels/rakServiceReq.js in folder common */
App.viewModels.rakServiceReq = function(scope, rootScope,UIControlsService,Logger,ActionProcessor,MBaaS) {
	
	var self = this;
	self.rootScope = rootScope;
	self.acceptTermscondition="N";
	self.showErrorMsg=false;
	self.rakServicesModel= {
			expandFlag:""
	};
	
		
	/* FOR SERVICE LANDING PAGE : START */
	
	//RAK SAGE changes Start
	self.sage={
			sageFlag:false,
			imageValueList:["legislation","tracks","encryption","cloud","accountant"]
	};
	
	//Added by Kamesh for Branch Delivery option hiding: START
	self.setBranchDelOptFlg=function(responseList){
	self.hideBranchDelOpt=responseList.hideBranchDelOpt;
	self.branchDelOptHideSrList=responseList.branchDelOptHideSrList;
	};
	//Added by Kamesh for Branch Delivery option hiding: END


self.sageUrl=function(){
	
	//corp4 Sage URL
	 /*window.open("https://rakbank.accounting.sageone.ae/Landing/Default.aspx",'_system','location=no,hardwareback=no');*/
	
	//corp3 Sage URL
	window.open("https://business.accounting.sageone.ae/Signup/ResellerDefault.aspx?internalreferralreference=TESTINGENVIRONMENT",'_system','location=no,hardwareback=no');
	
	//Production Sage URL
	//window.open("https://business.accounting.sageone.ae/Landing/Default.aspx",'_system','location=no,hardwareback=no');

 };
 
 
 self.sagePopUp = function(){
	 
	 var event = "onRegisterForSageClick";
	 
	 ActionProcessor.setEvent(event).then(function(payload) {
		 console.log("Response for Sage ");
         var data={};
         data = payload.responsesList[0];
         
         if (!data.hasOwnProperty('errorMessage')) {
         console.log("Success Block for Sage");
         self.sage.sageFlag = true;
             
         }
        

         },function(errorPayload){
         console.log("Error Block for Sage");
     });
	 
 };
//RAK SAGE Changes End
 
// RAK TOKEN DE-REG PRE-LOGIN CR CHANGES START
 self.rakTokenTutorialUrl=function(){
		
		window.open("https://www.youtube.com/watch?v=M1XvNLqDNcU",'_system','location=no,hardwareback=no');

	 };
// RAK TOKEN DE-REG PRE-LOGIN CR CHANGES END
 
 
	self.expandMenu=function(elem){
        jQuery('.reqSubMenu').slideUp();
        var listElem = jQuery(elem.target).parent();
        if(listElem.hasClass('rakExpand')){
            listElem.removeClass('rakExpand');
        }
        else{
            jQuery('.rakExpand').removeClass('rakExpand');
            listElem.children('ul').slideDown();
            listElem.addClass('rakExpand');
        }
	};
	self.expandSpecificMenu = function(){
		console.log("JEET @@@ : "+self.rakServicesModel.expandFlag);
		if(self.rakServicesModel.expandFlag){
			var elem = jQuery('#'+self.rakServicesModel.expandFlag);
			elem.children('ul').show();
			elem.addClass('rakExpand');
		}

	};
	/* FOR SERVICE LANDING PAGE : END */
	//Date : Set current Date
    //Send date in dd/MM/yyyy format to the server
    //Description : in html for input type = date; put model="RakServices.common.initDate"
    // on html load : put ng-init="RakServices.setCurrentDate();
    //on continue button click : ng-click="RakServices.setDateContinueClick();"

    self.common={

                initDate:new Date(),
			    date:null,
				month:null,
				year:null,
				fromAuthPage:false,
				displayDate:new Date(),
				message:'',
				availBal:'',
				EmiratesIdAvailable:"Y",
				deliveryChannel:"Delivery to registered address",
				collectBranch:"Collect from Branch- ",
				accountsOpenDisplayDate:"",
				termsFlag:'N',

					updateBal:function(eventName)
				      {


						ActionProcessor.setEvent(eventName).then(function(payload) {
							console.log("Update Balance");
							//console.log(JSON.stringify(payload));
							var response=payload;
							self.common.availBal=response.responsesList[0].accountAvailableBalance;
							scope.$apply();
						},function(errorPayload){
							self.common.availBal='';
						});


				      },

    };

    self.clearCommonData =function(){
    	self.common.initDate=new Date();
    	self.common.date=null;
    	self.common.month=null;
    	self.common.year=null;
    	self.common.fromAuthPage=false;
    	self.common.displayDate=new Date();
    	self.common.message='';
    	self.common.availBal='';
    	self.common.EmiratesIdAvailable='Y';
    };

    self.populateCurrentDateDetails = function(){
    	self.common.date ="";
		self.common.month="";
		self.common.year="";
		if(self.common.displayDate !="" && self.common.displayDate !=null){
			
			var date=self.common.displayDate.getDate().toString();
			var currMonth = self.common.displayDate.getMonth() + 1;
			var month=currMonth.toString();
			var year=self.common.displayDate.getFullYear().toString();
			self.common.date =date;
			self.common.month=month;
			self.common.year=year;
		}
	}


    self.setCurrentDate = function() {
    	var today =new Date();
        self.common.initDate =today;
    };

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

		var formatDate = mm + '-' + dd + '-' + yyyy;

        return formatDate;

    };
//added for 1B testing for 2HTMLS

    self.fetchDisclaimer =  function(htmlFile) {
		window.open(rootScope.rakHome.disclaimerURL.replace(/['"]+/g,'')+htmlFile+"?"+"parameter=new Date.getTime()",'_new','location=no,hardwareback=no,EnableViewPortScale=yes');	
	};

	//added for 1B testing for 2HTMLS
	
	 self.fetchTestDisclaimer =  function(htmlFile) {
			window.open(rootScope.rakHome.disclaimerURL.replace(/['"]+/g,'')+htmlFile+"?"+"parameter=new Date.getTime()",'_new','location=no,hardwareback=no,EnableViewPortScale=yes');	
		};
	
	self.fetchPdf =  function(url) {
		window.open(url,'_system','location=no,hardwareback=no,EnableViewPortScale=yes');	
	};

	self.fetchTermsUrl =  function(url) {
		window.open(rootScope.rakHome.disclaimerURL.replace(/['"]+/g,'')+url+"?"+"parameter=new Date.getTime()",'_system','location=no,hardwareback=no,EnableViewPortScale=yes');	
		/*if(WL.Client.getEnvironment() == WL.Environment.IPHONE){
			window.open(url,'_blank','location=no,hardwareback=no,EnableViewPortScale=yes');
		}
		else{
		// call the pdf generator
		RakPDFGenerator(function (response) {
			 Logger.info("=====inside pdf success: ");
		  } , function (response) {
			  Logger.info("=====inside pdf error: ");
			  self.errdata="error";
			  },"",url,rootScope.selectedLocale.locale);
		}

*/
		//window.open('https://conv.rakbankonline.ae/MBAWeb4/apps/services/www/RAKBANK/mobilewebapp/default/'+url,'_system','location=no,hardwareback=no,EnableViewPortScale=yes');
	};

    self.setDateContinueClick = function() {

        self.common.initDate = self.setFormatedDate(self.common.initDate);
    };


	self.setServerFormatedDate = function(unformatedDate) {

		var today = new Date(unformatedDate);
		var dd = today.getDate();
		var mm = today.getMonth() + 1; // January is 0!

		var yyyy = today.getFullYear();
		if (dd < 10) {
			dd = '0' + dd;
		}
		if (mm < 10) {
			mm = '0' + mm;
		}

		var formatDate = mm + '-' + dd + '-' + yyyy;

		return formatDate;

	};


    //Date END



    /* ################################################################################################################# */
	// Customization Done : START

    	//RAK:3:  - Added for Early Credit Card Renewal Request: START

		self.RAKEarlyCardRenewal={
			cardNoList:[],
			branchList:[],
			reasonList:[],
			emirateList:[],
        emiBranchList:[],

        emiCategorizedBranchList:[]
		};

		self.RAKEarlyCardRenewalModel={
			expiryDate:"",
			expDateNF:"",
			selectedCCNo:"",
			selectedBranch:"",
			selectedReason:"",
			selectedReasonDesc:"",
			isGoBtnClicked:false,
			isBranchOptionSelected:true,
			cardNo:"",
			branchName:"",
			auth:"",
			authMode:"",
			authStatus:true,
			txnPwd:"",
			otp:"",
			delChannel:"",
			successMessage:"",
			emirateSeletected:"",
		isEmiSelected:false,
        emiSelDesc:"",
        message:"",
        //CHANGES DONE AS FIX OF PROUAT-2281 START
        others:""
       //CHANGES DONE AS FIX OF PROUAT-2281 END
		};

		self.resetRAKEarlyCardRenewal=function(){
			self.RAKEarlyCardRenewalModel.expiryDate="";
			self.RAKEarlyCardRenewalModel.expDateNF="";
			self.RAKEarlyCardRenewalModel.selectedCCNo="";
			self.RAKEarlyCardRenewalModel.selectedBranch="";
			self.RAKEarlyCardRenewalModel.branchName="";
			self.RAKEarlyCardRenewalModel.selectedReason="";
			self.RAKEarlyCardRenewalModel.selectedReasonDesc="";
			self.RAKEarlyCardRenewalModel.isGoBtnClicked=false;
			self.RAKEarlyCardRenewalModel.isBranchOptionSelected=true;
			self.RAKEarlyCardRenewalModel.auth="";
			self.RAKEarlyCardRenewalModel.authMode="";
			self.RAKEarlyCardRenewalModel.authStatus=true;
			self.RAKEarlyCardRenewalModel.txnPwd="";
			self.RAKEarlyCardRenewalModel.otp="";

			self.RAKEarlyCardRenewalModel.emirateSeletected= "";

		self.RAKEarlyCardRenewalModel.isEmiSelected=false;
		self.RAKEarlyCardRenewalModel.emiSelDesc= "";

		self.common.message="";
		//CHANGES DONE AS FIX OF PROUAT-2281 START
		self.RAKEarlyCardRenewalModel.others="";
		self.RAKEarlyCardRenewalModel.otherFlag="";
       //CHANGES DONE AS FIX OF PROUAT-2281 END
		};
//Added by  For Emirates based Branch Dropdown Change
    self.RAKEarlyCardRenewalOptionChange = function() {

	var branchListCount = 0;
	var emBranchDesc = [];
	self.RAKEarlyCardRenewal.emiCategorizedBranchList = [];
	self.RAKEarlyCardRenewalModel.isEmiSelected = true;
	for (var x = 0; x < self.RAKEarlyCardRenewal.emiBranchList.length; x++) {
		if (self.RAKEarlyCardRenewal.emiBranchList[x].code == self.RAKEarlyCardRenewalModel.emirateSeletected) {
			emBranchDesc = self.RAKEarlyCardRenewal.emiBranchList[x].codeDesc
					.split("|");
			break;
		}
	}

	for (var x = 0; x < emBranchDesc.length; x++) {
		for (var y = 0; y < self.RAKEarlyCardRenewal.branchList.length; y++) {
			if (emBranchDesc[x] == self.RAKEarlyCardRenewal.branchList[y].branchIndex) {
				self.RAKEarlyCardRenewal.emiCategorizedBranchList[branchListCount] = self.RAKEarlyCardRenewal.branchList[y];
				branchListCount++;
			}
		}
	}

};
// added by  end

		self.initRAKEarlyCardRenewal=function(responsesList){
			if(!responsesList[0].hasOwnProperty('errorMessage')){
				if(responsesList[0].hasOwnProperty('cardNoList'))
					self.RAKEarlyCardRenewal.cardNoList = responsesList[0].cardNoList;
				if(responsesList[0].hasOwnProperty('branchListArray'))
					self.RAKEarlyCardRenewal.branchList = responsesList[0].branchListArray;
				if(responsesList[0].hasOwnProperty('reasonList'))
					self.RAKEarlyCardRenewal.reasonList = responsesList[0].reasonList;
				if(responsesList[0].hasOwnProperty('expiryDate')){
					self.RAKEarlyCardRenewalModel.expDateNF = responsesList[0].expiryDate;
					self.RAKEarlyCardRenewalModel.expiryDate = responsesList[0].expiryDate;
				}
				if(responsesList[0].hasOwnProperty('selectedCCNo')){
					self.RAKEarlyCardRenewalModel.selectedCCNo = responsesList[0].selectedCCNo;
					self.RAKEarlyCardRenewalModel.isGoBtnClicked= true;
				}
				//added by 
			/*if (responsesList[0].hasOwnProperty('OprAcctBranchList'))
				self.RakDCApplyModel.OprAcctBranchList = responsesList[0].OprAcctBranchList;*/

			if (responsesList[0].hasOwnProperty('emirateList')) {
				self.RAKEarlyCardRenewal.emirateList = responsesList[0].emirateList;
			}

			if (responsesList[0].hasOwnProperty('emiBranchList')) {
				self.RAKEarlyCardRenewal.emiBranchList = responsesList[0].emiBranchList;
			}
			}
		};

		self.onCardChange= function(){
			self.RAKEarlyCardRenewalModel.isGoBtnClicked = false;
		};

		self.RAKToggleClick = function(){
			if(self.RAKEarlyCardRenewalModel.isBranchOptionSelected){
				self.RAKEarlyCardRenewalModel.isBranchOptionSelected=false;
			}else{
				self.RAKEarlyCardRenewalModel.isBranchOptionSelected=true;
			}
		};

		self.setBranchIndex = function(){
			if (self.RAKEarlyCardRenewalModel.isBranchOptionSelected==false){
				self.RAKEarlyCardRenewalModel.selectedBranch="";
				self.RAKEarlyCardRenewalModel.branchName="";
			}
			// Added By  For Emirate Desc

		for (var x = 0; x < self.RAKEarlyCardRenewal.emirateList.length; x++) {
			if (self.RAKEarlyCardRenewal.emirateList[x].code == self.RAKEarlyCardRenewalModel.emirateSeletected) {
				self.RAKEarlyCardRenewalModel.emiSelDesc = self.RAKEarlyCardRenewal.emirateList[x].codeDesc;
			}
		}
		};

		self.initRAKEarlyCardRenewalPreviewConfirm = function(responsesList){
			if(!responsesList[0].hasOwnProperty('errorMessage')){
				if(responsesList[0].hasOwnProperty('selectedReasonDesc'))
					self.RAKEarlyCardRenewalModel.selectedReasonDesc = responsesList[0].selectedReasonDesc;
				if(responsesList[0].hasOwnProperty('cardNo'))
					self.RAKEarlyCardRenewalModel.cardNo= responsesList[0].cardNo;
				if(responsesList[0].hasOwnProperty('branchDetails'))
					self.RAKEarlyCardRenewalModel.branchName= responsesList[0].branchDetails;
				if(responsesList[0].auth == "")
					self.RAKEarlyCardRenewalModel.authStatus=false;
				else
				{
					self.RAKEarlyCardRenewalModel.authStatus=true;
					self.RAKEarlyCardRenewalModel.authMode = responsesList[0].auth;
				}
				self.common.message=responsesList[0].MESSAGE ? responsesList[0].MESSAGE :'';
			}
		};

		self.initRAKEarlyCardRenewalSucess = function(responsesList){
			if(!responsesList[0].hasOwnProperty('errorMessage'))
				self.RAKEarlyCardRenewalModel.successMessage = responsesList[0].successMsg;
		};


		//CHANGES DONE AS FIX OF PROUAT-2281 START
		self.getOtherFlag = function(){
			if(self.RAKEarlyCardRenewalModel.selectedReason=='Others')
     			{
     			self.RAKEarlyCardRenewalModel.otherFlag=true;
     			self.RAKEarlyCardRenewalModel.others="";
     			}
     		  else{
     			self.RAKEarlyCardRenewalModel.otherFlag=false;
     		    }
		};
		//CHANGES DONE AS FIX OF PROUAT-2281 END

		//RAK:3:  - Added for Early Credit Card Renewal Request: END


    	//RAK:3: - Added for Pre-Closure Of Loan :START

    	self.RAKLoanPreClosureAcctArrays={
    		loanAcctList:[],
    		debitAcctList:[]
    	};

    	self.RAKLoanPreClosureModel={
    		selectedLoanAcct:"",
    		selectedDebitAcct:"",
			successMessage:"",
			authFlag:"N",
			auth:"",
			authMode:"",
			authStatus:false,
			txnPwd:"",
			otp:"",

			//Fetch Screen - added by 
		loanProductName : "",
		currency : "",
		nextInstallmentDate : "",
		nextInstallmentAmount : "",
		loanAmount : "",
		loanOverdueAmount : "",
		loanOutstanding : "",

    	};

    	self.resetRAKLoanPreClosureData=function(){
    		self.RAKLoanPreClosureModel.selectedLoanAcct="";
    		self.RAKLoanPreClosureModel.selectedDebitAcct="";
    		self.RAKLoanPreClosureModel.successMessage="";
    		self.RAKLoanPreClosureModel.authFlag="N";
    		self.RAKLoanPreClosureModel.auth="";
			self.RAKLoanPreClosureModel.authMode="";
			self.RAKLoanPreClosureModel.authStatus=false;
			self.RAKLoanPreClosureModel.txnPwd="";
			self.RAKLoanPreClosureModel.otp="";

			//Fetch Screen - added by 
		self.RAKLoanPreClosureModel.loanProductName = "";
		self.RAKLoanPreClosureModel.currency = "";
		self.RAKLoanPreClosureModel.nextInstallmentDate = "";
		self.RAKLoanPreClosureModel.nextInstallmentAmount = "";
		self.RAKLoanPreClosureModel.loanAmount = "";
		self.RAKLoanPreClosureModel.loanOverdueAmount = "";
		self.RAKLoanPreClosureModel.loanOutstanding = "";

		self.common.message="";
    	};

    	self.initRAKLoanPreClosureData=function(responsesList){
    		if(!responsesList[0].hasOwnProperty('errorMessage')){
				if(responsesList[0].hasOwnProperty('debitAccountList'))
					self.RAKLoanPreClosureAcctArrays.debitAcctList = responsesList[0].debitAccountList;
				if(responsesList[0].hasOwnProperty('loanAccountList'))
					self.RAKLoanPreClosureAcctArrays.loanAcctList = responsesList[0].loanAccountList;

				// fetch screen - added by 
				if (responsesList[0].hasOwnProperty('PRODUCT')) {
					self.RAKLoanPreClosureModel.loanProductName = responsesList[0].PRODUCT;
				}
				if (responsesList[0].hasOwnProperty('CURRENCYCODE')) {
					self.RAKLoanPreClosureModel.currency = responsesList[0].CURRENCYCODE;
				}
				if (responsesList[0].hasOwnProperty('NEXTINSTALLMENTDATE')) {
					self.RAKLoanPreClosureModel.nextInstallmentDate = responsesList[0].NEXTINSTALLMENTDATE;
				}
				if (responsesList[0].hasOwnProperty('INSTALLMENTAMT')) {
					self.RAKLoanPreClosureModel.nextInstallmentAmount = responsesList[0].INSTALLMENTAMT;
				}
				if (responsesList[0].hasOwnProperty('LOANAMT')) {
					self.RAKLoanPreClosureModel.loanAmount = responsesList[0].LOANAMT;
				}
				if (responsesList[0].hasOwnProperty('OVERDUEAMT')) {
					self.RAKLoanPreClosureModel.loanOverdueAmount = responsesList[0].OVERDUEAMT;
				}
				if (responsesList[0].hasOwnProperty('OUTSTANDINGAMT')) {
					self.RAKLoanPreClosureModel.loanOutstanding = responsesList[0].OUTSTANDINGAMT;
				}
    		}
    	};

    	self.initRAKLoanPreClosureConfirm=function(responsesList){
			if(!responsesList[0].hasOwnProperty('errorMessage')){
				if(responsesList[0].hasOwnProperty('authFlag'))
				{
					self.RAKLoanPreClosureModel.authFlag = responsesList[0].authFlag;

					if(self.RAKLoanPreClosureModel.authFlag == "Y"){
						if(responsesList[0].auth == "")
							self.RAKLoanPreClosureModel.authStatus=false;
						else
						{
							self.RAKLoanPreClosureModel.authStatus=true;
							self.RAKLoanPreClosureModel.authMode = responsesList[0].auth;
						}
					}
				}

				self.common.message=responsesList[0].MESSAGE ? responsesList[0].MESSAGE :'';
			}
		};

		self.initRAKLoanPreClosureConfirmSuccess = function(responsesList){
			if(!responsesList[0].hasOwnProperty('errorMessage'))
				self.RAKLoanPreClosureModel.successMessage = responsesList[0].successMsg;
		};

    	//RAK:3: - Added for Pre-Closure Of Loan :END


		//RAK:3: - Added for Operative Account: Balance Confirmation Request : START

		self.RAKOprAcctBalConfLists={
			accountList:[],
			branchList:[],
			forAccounts:[]
		};

		self.RAKOprAcctBalConfReq = {
			selectedDate:new Date(),
			addressdTo:"",
			address:"",
			selectedAcctNo:"",
			selectedLang:"",
			selectedDelMode:"address",
			isSelectedDelModeBranch:false,
			selectedbranch:"",
			selectedBranchDesc:"",
			mobile:"",
			mobileNoString:"",
			notes:"",
			authFlag:"N",
			auth:"",
			authMode:"",
			authStatus:false,
			txnPwd:"",
			otp:"",
			registeredAddress:"",
			successMessage:"",
			mobileNoString:"",
			selectedAccountNumber:"",
			previewDateOne:"",
			//CHANGES FOR OPERATIVE ACCOUNT DATE DISPALY IN USER DATE FORMAT START
			selectedDate_day:"",
			selectedDate_month:"",
			selectedDate_year:"",
			//CHANGES FOR OPERATIVE ACCOUNT DATE DISPALY IN USER DATE FORMAT END
			selectedDelModeToServer:"",
			emirateList:[],
            emiBranchList:[],
            emirateSeletected:"",
            emiCategorizedBranchList:[],
            isEmiSelected:false,
            emiSelDesc:"",
            isDuplicateReqPresent:"Y",
            dupliMsg:"",
            selectedForAcc:""
		};

		self.resetRAKOprAcctBalConfReqData=function(){
			self.RAKOprAcctBalConfReq.selectedDate= new Date();
			self.RAKOprAcctBalConfReq.addressdTo="";
			self.RAKOprAcctBalConfReq.address="";
			self.RAKOprAcctBalConfReq.selectedbranch="";
			self.RAKOprAcctBalConfReq.selectedBranchDesc="";
			self.RAKOprAcctBalConfReq.notes="";
			self.RAKOprAcctBalConfReq.registeredAddress="";
			self.RAKOprAcctBalConfReq.mobile="";
			self.RAKOprAcctBalConfReq.mobileNoString="";
			self.RAKOprAcctBalConfReq.selectedAcctNo="";
			self.RAKOprAcctBalConfReq.isSelectedDelModeBranch=false;
			self.RAKOprAcctBalConfReq.selectedbranch="";
			self.RAKOprAcctBalConfReq.authFlag="N";
			self.RAKOprAcctBalConfReq.auth="";
			self.RAKOprAcctBalConfReq.authMode="";
			self.RAKOprAcctBalConfReq.authStatus=false;
			self.RAKOprAcctBalConfReq.txnPwd="";
			self.RAKOprAcctBalConfReq.otp="";
			self.RAKOprAcctBalConfReq.successMessage="";
			self.RAKOprAcctBalConfReq.mobileNoString="";
			self.RAKOprAcctBalConfReq.selectedAccountNumber="";
			self.RAKOprAcctBalConfReq.selectedDelModeToServer="";
			self.RAKOprAcctBalConfReq.selectedLang="English";
			self.RAKOprAcctBalConfReq.selectedDelMode=rootScope.appLiterals.APP.RAK_SERVICES.RAKOPRACCTBALCONF.DELMYADD;
			self.RAKOprAcctBalConfReq.previewDateOne = "";
			//CHANGES FOR OPERATIVE ACCOUNT DATE DISPALY IN USER DATE FORMAT START
			self.RAKOprAcctBalConfReq.selectedDate_day ="";
	  		self.RAKOprAcctBalConfReq.selectedDate_month="";
	  		self.RAKOprAcctBalConfReq.selectedDate_year="";
			//CHANGES FOR OPERATIVE ACCOUNT DATE DISPALY IN USER DATE FORMAT END
			self.RAKOprAcctBalConfReq.emirateList=[];
            self.RAKOprAcctBalConfReq.emiBranchList=[];
            self.RAKOprAcctBalConfReq.emirateSeletected="";
            self.RAKOprAcctBalConfReq.emiCategorizedBranchList=[];
            self.RAKOprAcctBalConfReq.isEmiSelected=false;
            self.RAKOprAcctBalConfReq.selectedForAcc="";
		};

		//CHANGES FOR OPERATIVE ACCOUNT DATE DISPALY IN USER DATE FORMAT START
		  self.setRAKOprAcctBalConfDate = function() {
	    	    self.common.displayDate = self.RAKOprAcctBalConfReq.selectedDate;
		  		self.populateCurrentDateDetails(self.RAKOprAcctBalConfReq.selectedDate);
		  		self.RAKOprAcctBalConfReq.selectedDate_day =self.common.date;
		  		self.RAKOprAcctBalConfReq.selectedDate_month=self.common.month;
		  		self.RAKOprAcctBalConfReq.selectedDate_year=self.common.year;
		   };
	   //CHANGES FOR OPERATIVE ACCOUNT DATE DISPALY IN USER DATE FORMAT END

		self.initRAKOprAcctBalConfReqData=function(responsesList){
			if(!responsesList[0].hasOwnProperty('errorMessage')){
				if(responsesList[0].hasOwnProperty('accountList'))
					self.RAKOprAcctBalConfLists.accountList = responsesList[0].accountList;
				if(responsesList[0].hasOwnProperty('forAccounts'))
					self.RAKOprAcctBalConfLists.forAccounts = responsesList[0].forAccounts;
				if(responsesList[0].hasOwnProperty('branchListArray'))
					self.RAKOprAcctBalConfLists.branchList = responsesList[0].branchListArray;

					if(responsesList[0].hasOwnProperty('emirateList')){
                      self.RAKOprAcctBalConfLists.emirateList = responsesList[0].emirateList;
                }

                if(responsesList[0].hasOwnProperty('emiBranchList')){
                      self.RAKOprAcctBalConfLists.emiBranchList = responsesList[0].emiBranchList;
                }

                if(responsesList[0].hasOwnProperty('registeredAddress') && !(responsesList[0].registeredAddress == '' )){
                	 self.RAKOprAcctBalConfReq.registeredAddress = responsesList[0].registeredAddress[0].address;
                }

			}
		};
// Added by  For Emirates based Branch Dropdown Change
	self.rakOprAcctBalConfBranchOptionChange = function() {

		var branchListCount = 0;
		var emBranchDesc = [];
		self.RAKOprAcctBalConfLists.emiCategorizedBranchList = [];
		self.RAKOprAcctBalConfReq.selectedbranch='';
		self.RAKOprAcctBalConfReq.isEmiSelected = true;
		for (var x = 0; x < self.RAKOprAcctBalConfLists.emiBranchList.length; x++) {
			if (self.RAKOprAcctBalConfLists.emiBranchList[x].code == self.RAKOprAcctBalConfReq.emirateSeletected) {
				emBranchDesc = self.RAKOprAcctBalConfLists.emiBranchList[x].codeDesc
						.split("|");
				break;
			}
		}

		for (var x = 0; x < emBranchDesc.length; x++) {
			for (var y = 0; y < self.RAKOprAcctBalConfLists.branchList.length; y++) {
				if (emBranchDesc[x] == self.RAKOprAcctBalConfLists.branchList[y].branchIndex) {
					self.RAKOprAcctBalConfLists.emiCategorizedBranchList[branchListCount] = self.RAKOprAcctBalConfLists.branchList[y];
					branchListCount++;
				}
			}
		}

	};
		self.mobileNoToString=function(){
			self.RAKOprAcctBalConfReq.mobileNoString = self.RAKOprAcctBalConfReq.mobile+"";
		};

		self.DELMODETYPECONSTANTS={
						TOMYADD:"Deliver to my Address",
						TOAUDITOR:"Deliver to Auditor",
						COLLECTFROMBRNCH:"Collect from Branch"
					};

				self.DELMODETYPECONSTANTSVAL={
						TOMYADD:"TOADD",
						TOAUDITOR:"TOAUD",
						COLLECTFROMBRNCH:"TOBRNCH"
					};

				self.checkForDelModeBranch=function(){

					switch(self.RAKOprAcctBalConfReq.selectedDelMode){

					case self.DELMODETYPECONSTANTS.TOMYADD:
						self.RAKOprAcctBalConfReq.selectedbranch="";
						self.RAKOprAcctBalConfReq.selectedDelModeToServer=self.DELMODETYPECONSTANTSVAL.TOMYADD;
						self.RAKOprAcctBalConfReq.isSelectedDelModeBranch=false;
						break;

					case self.DELMODETYPECONSTANTS.TOAUDITOR:
						self.RAKOprAcctBalConfReq.selectedbranch="";
						self.RAKOprAcctBalConfReq.selectedDelModeToServer=self.DELMODETYPECONSTANTSVAL.TOAUDITOR;
						self.RAKOprAcctBalConfReq.isSelectedDelModeBranch=false;
						break;

					case self.DELMODETYPECONSTANTS.COLLECTFROMBRNCH:
						self.RAKOprAcctBalConfReq.isSelectedDelModeBranch=true;
						self.RAKOprAcctBalConfReq.selectedDelModeToServer=self.DELMODETYPECONSTANTSVAL.COLLECTFROMBRNCH;
						break;

					default:
						break;

					}


		};

		self.setRAKOprAcctBalConfReqDate = function() {
			//CHANGES SENDING DATE AS DAY,MONTH AND YEAR START
	        //self.RAKOprAcctBalConfReq.selectedDate = self.setFormatedDate(self.common.initDate);
	        self.RAKOprAcctBalConfReq.selectedDate = self.common.initDate;
	      //CHANGES SENDING DATE AS DAY,MONTH AND YEAR END
	    };

		/*self.confirmRAKOprAcctBalConfReq=function(responsesList){
			if(!responsesList[0].hasOwnProperty('errorMessage')){
				if(responsesList[0].hasOwnProperty('selectedAccountNumber')){
					self.RAKOprAcctBalConfReq.selectedAccountNumber = responsesList[0].selectedAccountNumber;
				}
				if(responsesList[0].hasOwnProperty('selectedBranchDesc')){
					self.RAKOprAcctBalConfReq.selectedBranchDesc = responsesList[0].selectedBranchDesc;
				}
				if (responsesList[0].hasOwnProperty('previewDate')) {
					self.RAKOprAcctBalConfReq.previewDateOne = 	responsesList[0].previewDate;
				}

				if(responsesList[0].hasOwnProperty('authFlag'))
				{
					self.RAKOprAcctBalConfReq.authFlag = responsesList[0].authFlag;
					if(self.RAKOprAcctBalConfReq.authFlag == "Y"){
						if(responsesList[0].auth == "")
							self.RAKOprAcctBalConfReq.authStatus=false;
						else
						{
							self.RAKOprAcctBalConfReq.authStatus=true;
							self.RAKOprAcctBalConfReq.authMode = responsesList[0].auth;
						}
					}
				}
			}
		};

		for (var x=0; x<self.RAKOprAcctBalConfReq.emiCategorizedBranchList.length;x++)
        {
        if (self.RAKOprAcctBalConfReq.emiCategorizedBranchList[x].branchIndex==self.RAKOprAcctBalConfReq.selectedbranch)
        {
              self.RAKOprAcctBalConfReq.selectedBranchDesc=self.RAKOprAcctBalConfReq.emiCategorizedBranchList[x].branchName;
        }
        }


        //Added By  For Emirate Desc

  for (var x=0; x<self.RAKOprAcctBalConfReq.emirateList.length;x++)
  {
  if (self.RAKOprAcctBalConfReq.emirateList[x].code==self.RAKOprAcctBalConfReq.emirateSeletected)
  {
        self.RAKOprAcctBalConfReq.emiSelDesc =self.RAKOprAcctBalConfReq.emirateList[x].codeDesc;
  }
  }
  };*/
	    self.confirmRAKOprAcctBalConfReq=function(responsesList){
            if(!responsesList[0].hasOwnProperty('errorMessage')){
                  if(responsesList[0].hasOwnProperty('selectedAccountNumber')){
                         self.RAKOprAcctBalConfReq.selectedAccountNumber = responsesList[0].selectedAccountNumber;
                  }
                  
                  if(responsesList[0].hasOwnProperty('selectedForAccountNo')){
                      self.RAKOprAcctBalConfReq.selectedForAccountNo = responsesList[0].selectedForAccountNo;
                  }
                  if(responsesList[0].hasOwnProperty('selectedBranchDesc')){
                         self.RAKOprAcctBalConfReq.selectedBranchDesc = responsesList[0].selectedBranchDesc;
                  }
                  if (responsesList[0].hasOwnProperty('previewDate')) {
                         self.RAKOprAcctBalConfReq.previewDateOne =        responsesList[0].previewDate;
                  }

                  if(responsesList[0].hasOwnProperty('authFlag'))
                  {
                         self.RAKOprAcctBalConfReq.authFlag = responsesList[0].authFlag;
                         if(self.RAKOprAcctBalConfReq.authFlag == "Y"){
                                if(responsesList[0].auth == "")
                                       self.RAKOprAcctBalConfReq.authStatus=false;
                                else
                                {
                                       self.RAKOprAcctBalConfReq.authStatus=true;
                                       self.RAKOprAcctBalConfReq.authMode = responsesList[0].auth;
                                }
                         }
                  }

                  self.common.message=responsesList[0].MESSAGE ? responsesList[0].MESSAGE :'';
            }


     for (var x=0; x<self.RAKOprAcctBalConfReq.emiCategorizedBranchList.length;x++)
{
if (self.RAKOprAcctBalConfReq.emiCategorizedBranchList[x].branchIndex==self.RAKOprAcctBalConfReq.selectedbranch)
{
     self.RAKOprAcctBalConfReq.selectedBranchDesc=self.RAKOprAcctBalConfReq.emiCategorizedBranchList[x].branchName;
}
}


//Added By  For Emirate Desc

for (var x=0; x<self.RAKOprAcctBalConfLists.emirateList.length;x++)
{
if (self.RAKOprAcctBalConfLists.emirateList[x].code==self.RAKOprAcctBalConfReq.emirateSeletected)
{
self.RAKOprAcctBalConfReq.emiSelDesc =self.RAKOprAcctBalConfLists.emirateList[x].codeDesc;
}
}
};

		self.initRAKOprAcctBalConfReqSucess = function(responsesList){
			if(!responsesList[0].hasOwnProperty('errorMessage'))
				self.RAKOprAcctBalConfReq.successMessage = responsesList[0].successMsg;
		};

		//RAK:3: - Added for Operative Account: Balance Confirmation Request : END


		//RAK:3:  - Added for RAKDirect Registration Request: START

		self.RAKDirRegReqModel={
				acctHolderName:"",
				selectedName:"",
				mbResponse:"",
				successMessage:"",
				authFlag:"N",
				auth:"",
				authMode:"",
				authStatus:false,
				txnPwd:"",
				otp:"",
				message:""
		};

		self.resetRAKDirRegReqModel=function(){
				acctHolderName="";
				selectedName="";
				authFlag="N";
		    	auth="";
				authMode="";
				authStatus=false;
				txnPwd="";
				otp="";

				self.common.message="";
		};

		self.initRAKDirReg = function(responsesList){
			//self.RAKDirRegReqModel.acctHolderName = responseList[0].acctName;
			/*self.RAKDirRegReqModel.mbResponse = responsesList[0];
			self.RAKDirRegReqModel.acctHolderName = self.RAKDirRegReqModel.mbResponse.acctName;
			*/

			if (!responsesList[0].hasOwnProperty('errorMessage')) {
				if (responsesList[0].hasOwnProperty('acctName')) {
					self.RAKDirRegReqModel.acctHolderName = responsesList[0].acctName
				}
			}

		};


		self.initRAKDirRegConfirm = function(responsesList) {
			if (!responsesList[0].hasOwnProperty('errorMessage')) {
				if (responsesList[0].auth == "")
					self.RAKDirRegReqModel.authStatus = false;
				else {
					self.RAKDirRegReqModel.authStatus = true;
					self.RAKDirRegReqModel.authMode = responsesList[0].auth;
				}
				/* Added for dup chk */
				self.common.message=responsesList[0].MESSAGE ? responsesList[0].MESSAGE :'';
			}

		};

		self.initRAKDirRegSuccess = function(responsesList){
			if(!responsesList[0].hasOwnProperty('errorMessage'))
				self.RAKDirRegReqModel.successMessage = responsesList[0].successMsg;
			if(responsesList[0].hasOwnProperty('errorMessage'))
				self.RAKDirRegReqModel.successMessage = responsesList[0].errorMessage;
		};


		//RAK:3: - Added for RAKDirect Registration Request: End



		//RAK:3:  - Added for Alert Preference Request: START

		self.RAKAlertPrefLists={
			dndList:[],
			sortedDnd1List:[]
		};

		self.RAKAlertPrefModel={
			promoFlag:"",
			name:"",
			mobileNo1:"",
			mobileNo2:"",
			email:"",
			selectedDnd1From:"",
			selectedDnd2From:"",
			selectedDnd3From:"",
			selectedDnd4From:"",
			selectedDnd1To:"",
			selectedDnd2To:"",
			selectedDnd3To:"",
			selectedDnd4To:"",
			selectedDnd1FromDesc:"",
			selectedDnd2FromDesc:"",
			selectedDnd3FromDesc:"",
			selectedDnd4FromDesc:"",
			selectedDnd1ToDesc:"",
			selectedDnd2ToDesc:"",
			selectedDnd3ToDesc:"",
			selectedDnd4ToDesc:"",
			isPromoMsgEnabled:false,
			promoMsg:"N",
			promoMsgText:"Disabled",
			auth:"",
			authMode:"",
			authStatus:true,
			txnPwd:"",
			otp:"",
			successMessage:""

		};

		self.resetRAKAlertPref=function(){
			self.RAKAlertPrefModel.promoFlag="";
			self.RAKAlertPrefModel.name="";
			self.RAKAlertPrefModel.mobileNo1="";
			self.RAKAlertPrefModel.mobileNo2="";
			self.RAKAlertPrefModel.email="";
			self.RAKAlertPrefModel.selectedDnd1From="";
			self.RAKAlertPrefModel.selectedDnd2From="";
			self.RAKAlertPrefModel.selectedDnd3From="";
			self.RAKAlertPrefModel.selectedDnd4From="";
			self.RAKAlertPrefModel.selectedDnd1To="";
			self.RAKAlertPrefModel.selectedDnd2To="";
			self.RAKAlertPrefModel.selectedDnd3To="";
			self.RAKAlertPrefModel.selectedDnd4To="";
			self.RAKAlertPrefModel.selectedDnd1FromDesc="";
			self.RAKAlertPrefModel.selectedDnd2FromDesc="";
			self.RAKAlertPrefModel.selectedDnd3FromDesc="";
			self.RAKAlertPrefModel.selectedDnd4FromDesc="";
			self.RAKAlertPrefModel.selectedDnd1ToDesc="";
			self.RAKAlertPrefModel.selectedDnd2ToDesc="";
			self.RAKAlertPrefModel.selectedDnd3ToDesc="";
			self.RAKAlertPrefModel.selectedDnd4ToDesc="";
			self.RAKAlertPrefModel.isPromoMsgEnabled=false;
			self.RAKAlertPrefModel.promoMsgTxt="Disabled";
			self.common.message="";
		};

		self.bubbleSort = function(arr) {
			var len = arr.length;
			for (var i = len - 1; i >= 0; i--) {
				for (var j = 1; j <= i; j++) {
					if (parseFloat(arr[j - 1]) > parseFloat(arr[j])) {
						var temp = arr[j - 1];
						arr[j - 1] = arr[j];
						arr[j] = temp;
					}
				}
			}
			return arr;
		};

		self.sortEm=function(a,b){
			return parseInt(b.dndTime) < parseInt(a.dndTime) ? 1 : -1;
		};

		self.initRAKAlertPref=function(responsesList){
			if(!responsesList[0].hasOwnProperty('errorMessage')){
				
				if(responsesList[0].hasOwnProperty('promoFlag')){
					
					if(responsesList[0].promoFlag == 'Y'){
						self.RAKAlertPrefModel.promoFlag = false;
						self.RAKAlertPrefModel.promoMsgTxt = "Enabled";
					}
					else{
						self.RAKAlertPrefModel.promoFlag = true;
						self.RAKAlertPrefModel.promoMsgTxt = "Disabled";
					}
				}
				if(responsesList[0].hasOwnProperty('name'))
					self.RAKAlertPrefModel.name = responsesList[0].name;
				if(responsesList[0].hasOwnProperty('mobileNo1'))
					self.RAKAlertPrefModel.mobileNo1 = responsesList[0].mobileNo1;
				if(responsesList[0].hasOwnProperty('mobileNo2'))
					self.RAKAlertPrefModel.mobileNo2 = responsesList[0].mobileNo2;
				if(responsesList[0].hasOwnProperty('email'))
					self.RAKAlertPrefModel.email = responsesList[0].email;
				if(responsesList[0].hasOwnProperty('dndTimeFrom1'))
					self.RAKAlertPrefModel.selectedDnd1From = responsesList[0].dndTimeFrom1;
				if(responsesList[0].hasOwnProperty('dndTimeFrom2'))
					self.RAKAlertPrefModel.selectedDnd2From = responsesList[0].dndTimeFrom2;
				if(responsesList[0].hasOwnProperty('dndTimeFrom3'))
					self.RAKAlertPrefModel.selectedDnd3From = responsesList[0].dndTimeFrom3;
				if(responsesList[0].hasOwnProperty('dndTimeFrom4'))
					self.RAKAlertPrefModel.selectedDnd4From = responsesList[0].dndTimeFrom4;
				if(responsesList[0].hasOwnProperty('dndTimeTo1'))
					self.RAKAlertPrefModel.selectedDnd1To = responsesList[0].dndTimeTo1;
				if(responsesList[0].hasOwnProperty('dndTimeTo2'))
					self.RAKAlertPrefModel.selectedDnd2To = responsesList[0].dndTimeTo2;
				if(responsesList[0].hasOwnProperty('dndTimeTo3'))
					self.RAKAlertPrefModel.selectedDnd3To = responsesList[0].dndTimeTo3;
				if(responsesList[0].hasOwnProperty('dndTimeTo4'))
					self.RAKAlertPrefModel.selectedDnd4To = responsesList[0].dndTimeTo4;

				if(responsesList[0].hasOwnProperty('dndList')){
					self.RAKAlertPrefLists.dndList = responsesList[0].dndList;
					self.RAKAlertPrefLists.sortedDnd1List =  jQuery(self.RAKAlertPrefLists.dndList).sort(self.sortEm).toArray();
				}

				if(responsesList[0].hasOwnProperty('promoMsg'))
					self.RAKAlertPrefModel.promoMsg=responsesList[0].promoMsg;

				if(responsesList[0].hasOwnProperty('isPromoMsgTrue')){
					if(responsesList[0].isPromoMsgTrue=="true"){
						self.RAKAlertPrefModel.isPromoMsgEnabled=true;
						self.RAKAlertPrefModel.promoMsgTxt="Enabled";
					}
					else{
						self.RAKAlertPrefModel.isPromoMsgEnabled=false;
						self.RAKAlertPrefModel.promoMsgTxt="Disabled";
					}
				}

				self.onDndTime1FromChanged();
				self.onDndTime2FromChanged();
				self.onDndTime3FromChanged();
				self.onDndTime4FromChanged();
				self.onDndTime1ToChanged();
				self.onDndTime2ToChanged();
				self.onDndTime3ToChanged();
				self.onDndTime4ToChanged();

			}
		};


		self.onDndTime1FromChanged = function(){
			for(var i=0;i<self.RAKAlertPrefLists.sortedDnd1List.length;i++)
			{
				if(self.RAKAlertPrefLists.sortedDnd1List[i].dndCode == self.RAKAlertPrefModel.selectedDnd1From){
					self.RAKAlertPrefModel.selectedDnd1FromDesc = self.RAKAlertPrefLists.sortedDnd1List[i].dndTime;
				}
			}
		};
		self.onDndTime2FromChanged = function(){
			for(var i=0;i<self.RAKAlertPrefLists.sortedDnd1List.length;i++)
			{
				if(self.RAKAlertPrefLists.sortedDnd1List[i].dndCode == self.RAKAlertPrefModel.selectedDnd2From){
					self.RAKAlertPrefModel.selectedDnd2FromDesc = self.RAKAlertPrefLists.sortedDnd1List[i].dndTime;
				}
			}
		};
		self.onDndTime3FromChanged = function(){
			for(var i=0;i<self.RAKAlertPrefLists.sortedDnd1List.length;i++)
			{
				if(self.RAKAlertPrefLists.sortedDnd1List[i].dndCode == self.RAKAlertPrefModel.selectedDnd3From){
					self.RAKAlertPrefModel.selectedDnd3FromDesc = self.RAKAlertPrefLists.sortedDnd1List[i].dndTime;
				}
			}
		};
		self.onDndTime4FromChanged = function(){
			for(var i=0;i<self.RAKAlertPrefLists.sortedDnd1List.length;i++)
			{
				if(self.RAKAlertPrefLists.sortedDnd1List[i].dndCode == self.RAKAlertPrefModel.selectedDnd4From){
					self.RAKAlertPrefModel.selectedDnd4FromDesc = self.RAKAlertPrefLists.sortedDnd1List[i].dndTime;
				}
			}
		};
		self.onDndTime1ToChanged = function(){
			for(var i=0;i<self.RAKAlertPrefLists.sortedDnd1List.length;i++)
			{
				if(self.RAKAlertPrefLists.sortedDnd1List[i].dndCode == self.RAKAlertPrefModel.selectedDnd1To){
					self.RAKAlertPrefModel.selectedDnd1ToDesc = self.RAKAlertPrefLists.sortedDnd1List[i].dndTime;
				}
			}
		};
		self.onDndTime2ToChanged = function(){
			for(var i=0;i<self.RAKAlertPrefLists.sortedDnd1List.length;i++)
			{
				if(self.RAKAlertPrefLists.sortedDnd1List[i].dndCode == self.RAKAlertPrefModel.selectedDnd2To){
					self.RAKAlertPrefModel.selectedDnd2ToDesc = self.RAKAlertPrefLists.sortedDnd1List[i].dndTime;
				}
			}
		};
		self.onDndTime3ToChanged = function(){
			for(var i=0;i<self.RAKAlertPrefLists.sortedDnd1List.length;i++)
			{
				if(self.RAKAlertPrefLists.sortedDnd1List[i].dndCode == self.RAKAlertPrefModel.selectedDnd3To){
					self.RAKAlertPrefModel.selectedDnd3ToDesc = self.RAKAlertPrefLists.sortedDnd1List[i].dndTime;
				}
			}
		};
		self.onDndTime4ToChanged = function(){
			for(var i=0;i<self.RAKAlertPrefLists.sortedDnd1List.length;i++)
			{
				if(self.RAKAlertPrefLists.sortedDnd1List[i].dndCode == self.RAKAlertPrefModel.selectedDnd4To){
					self.RAKAlertPrefModel.selectedDnd4ToDesc = self.RAKAlertPrefLists.sortedDnd1List[i].dndTime;
				}
			}
		};

		self.promoMsgCheckBoxClicked=function(){
			/*if(self.RAKAlertPrefModel.isPromoMsgTrue==true){
				self.RAKAlertPrefModel.isPromoMsgTrue=false;
				self.RAKAlertPrefModel.isPromoMsgEnabled=false;
				self.RAKAlertPrefModel.promoMsgTxt="Disabled";
			}
			else{
				self.RAKAlertPrefModel.isPromoMsgTrue=true;
				self.RAKAlertPrefModel.isPromoMsgEnabled=true;
				self.RAKAlertPrefModel.promoMsgTxt="Enabled";
			}*/
			if(self.RAKAlertPrefModel.isPromoMsgEnabled==true){
				self.RAKAlertPrefModel.promoMsgTxt="Enabled";
				self.RAKAlertPrefModel.promoFlag = true;
			}
			else{
				self.RAKAlertPrefModel.promoMsgTxt="Disabled";
				self.RAKAlertPrefModel.promoFlag = false;
			}
		};

		self.confirmRAKAlertPref=function(responsesList){
			if(!responsesList[0].hasOwnProperty('errorMessage')){

				self.common.message=responsesList[0].MESSAGE ? responsesList[0].MESSAGE :'';

				if(responsesList[0].hasOwnProperty('dndTime1FromDesc'))
					self.RAKAlertPrefModel.selectedDnd1FromDesc=responsesList[0].dndTime1FromDesc;
				if(responsesList[0].hasOwnProperty('dndTime2FromDesc'))
					self.RAKAlertPrefModel.selectedDnd2FromDesc=responsesList[0].dndTime2FromDesc;
				if(responsesList[0].hasOwnProperty('dndTime3FromDesc'))
					self.RAKAlertPrefModel.selectedDnd3FromDesc=responsesList[0].dndTime3FromDesc;
				if(responsesList[0].hasOwnProperty('dndTime4FromDesc'))
					self.RAKAlertPrefModel.selectedDnd4FromDesc=responsesList[0].dndTime4FromDesc;
				if(responsesList[0].hasOwnProperty('dndTime1ToDesc'))
					self.RAKAlertPrefModel.selectedDnd1ToDesc=responsesList[0].dndTime1ToDesc;
				if(responsesList[0].hasOwnProperty('dndTime2ToDesc'))
					self.RAKAlertPrefModel.selectedDnd2ToDesc=responsesList[0].dndTime2ToDesc;
				if(responsesList[0].hasOwnProperty('dndTime3ToDesc'))
					self.RAKAlertPrefModel.selectedDnd3ToDesc=responsesList[0].dndTime3ToDesc;
				if(responsesList[0].hasOwnProperty('dndTime4ToDesc'))
					self.RAKAlertPrefModel.selectedDnd4ToDesc=responsesList[0].dndTime4ToDesc;

				if(responsesList[0].auth == "")
					self.RAKAlertPrefModel.authStatus=false;
				else
				{
					self.RAKAlertPrefModel.authStatus=true;
					self.RAKAlertPrefModel.authMode = responsesList[0].auth;
				}
			}
		};

		self.initRAKAlertPrefSucess = function(responsesList){
			if(!responsesList[0].hasOwnProperty('errorMessage'))
				self.RAKAlertPrefModel.successMessage = responsesList[0].successMsg;
		};

		//RAK:3:  - Added for Alert Preference Request: END

		//RAK:3:  - Added for Credit Card - Request for Physical Stmt : START
		self.CCardStmtReq ={
				cardList:[],
				monthList:[],
				yearList:[],
				validFromDateRange:"",

				selectedCardIndex:"",
				selectedFromMonth:"",
				selectedFromYear:"",
				selectedToMonth:"",
				selectedToYear:"",

				selectedCardNumber:"",
				selectedFromMonthDesc:"",
				selectedFromYearDesc:"",
				selectedToMonthDesc:"",
				selectedToYearDesc:"",
				fromDate:"",
				toDate:"",

				auth:"",
				authMode:"",
				authStatus:true,
				txnPwd:"",

				successMessage:"",

				resetRakCSRData : function(){
					self.CCardStmtReq.cardList=[];
					self.CCardStmtReq.monthList=[];
					self.CCardStmtReq.yearList=[];
					self.CCardStmtReq.validFromDateRange="";
					self.CCardStmtReq.selectedCardIndex="";
					self.CCardStmtReq.selectedFromMonth="";
					self.CCardStmtReq.selectedFromYear="";
					self.CCardStmtReq.selectedToMonth="";
					self.CCardStmtReq.selectedToYear="";
					self.CCardStmtReq.selectedCardNumber="";
					self.CCardStmtReq.selectedFromMonthDesc="",
					self.CCardStmtReq.selectedFromYearDesc="";
					self.CCardStmtReq.selectedToMonthDesc="";
					self.CCardStmtReq.selectedToYearDesc="";
					self.CCardStmtReq.fromDate="";
					self.CCardStmtReq.toDate="";
					self.CCardStmtReq.auth="";
					self.CCardStmtReq.authMode="";
					self.CCardStmtReq.authStatus=true;
					self.CCardStmtReq.txnPwd="";
					self.CCardStmtReq.successMessage="";
					self.common.message='';
				},


				sortMonth : function(a,b){
					return parseInt(b.monthCode) < parseInt(a.monthCode) ? 1 : -1;
				},

				sortYear : function(a,b){
					return parseInt(b.yearCode) < parseInt(a.yearCode) ? 1 : -1;
				},

				initRakCSRInitData : function(responsesList){
					if(!responsesList[0].hasOwnProperty('errorMessage')){
						if(responsesList[0].hasOwnProperty('cardNoList')){
							self.CCardStmtReq.cardList=responsesList[0].cardNoList;
						}
						if(responsesList[0].hasOwnProperty('monthList')){
							self.CCardStmtReq.monthList = jQuery(responsesList[0].monthList).sort(self.CCardStmtReq.sortMonth).toArray();
						}
						if(responsesList[0].hasOwnProperty('yearList')){
							self.CCardStmtReq.yearList = jQuery(responsesList[0].yearList).sort(self.CCardStmtReq.sortYear).toArray();
						}
						if(responsesList[0].hasOwnProperty('yearRange')){
							self.CCardStmtReq.validFromDateRange = responsesList[0].yearRange;
						}
						if(responsesList[0].hasOwnProperty('custFullName')){
							self.RakDiscApply.name=responsesList[0].custFullName;
						}
						if(responsesList[0].hasOwnProperty('phoneNo')){
							self.RakDiscApply.mobileNo=responsesList[0].phoneNo;
						}
						if(responsesList[0].hasOwnProperty('emailId')){
							self.RakDiscApply.email=responsesList[0].emailId;
						}
					}
				},

				setDateValueForValidation: function(){
					for( var i = 0; i < self.CCardStmtReq.monthList.length ; i++){
						if (self.CCardStmtReq.selectedFromMonth != "" || self.CCardStmtReq.selectedFromMonth != null){
							if(self.CCardStmtReq.selectedFromMonth == self.CCardStmtReq.monthList[i].monthCode){
								self.CCardStmtReq.selectedFromMonthDesc = self.CCardStmtReq.monthList[i].monthDesc;
							}
						}
						if (self.CCardStmtReq.selectedToMonth != "" || self.CCardStmtReq.selectedToMonth != null){
							if(self.CCardStmtReq.selectedToMonth == self.CCardStmtReq.monthList[i].monthCode){
								self.CCardStmtReq.selectedToMonthDesc = self.CCardStmtReq.monthList[i].monthDesc;
							}
						}
					}
					for( var i = 0; i < self.CCardStmtReq.yearList.length ; i++){
						if (self.CCardStmtReq.selectedFromYear != "" || self.CCardStmtReq.selectedFromYear != null){
							if(self.CCardStmtReq.selectedFromYear == self.CCardStmtReq.yearList[i].yearCode){
								self.CCardStmtReq.selectedFromYearDesc = self.CCardStmtReq.yearList[i].yearDesc;
							}
						}
						if (self.CCardStmtReq.selectedToYear != "" || self.CCardStmtReq.selectedToYear != null){
							if(self.CCardStmtReq.selectedToYear == self.CCardStmtReq.yearList[i].yearCode){
								self.CCardStmtReq.selectedToYearDesc = self.CCardStmtReq.yearList[i].yearDesc;
							}
						}
					}

					self.CCardStmtReq.fromDate = self.CCardStmtReq.selectedFromMonthDesc + ", " + self.CCardStmtReq.selectedFromYearDesc;
					self.CCardStmtReq.toDate = self.CCardStmtReq.selectedToMonthDesc + ", " + self.CCardStmtReq.selectedToYearDesc;


				},

				initRakCSRConfirmData : function(responsesList) {
					if (!responsesList[0].hasOwnProperty('errorMessage')) {

						self.common.message=responsesList[0].MESSAGE ? responsesList[0].MESSAGE :'';
						if(responsesList[0].hasOwnProperty('selectedCardNumber')){
							self.CCardStmtReq.selectedCardNumber=responsesList[0].selectedCardNumber;
						}
						if (responsesList[0].auth == ""){
							self.CCardStmtReq.authStatus = false;
						}
						else {
							self.CCardStmtReq.authStatus = true;
							self.CCardStmtReq.authMode = responsesList[0].auth;
						}
					}
					else{
						self.CCardStmtReq.txnPwd = "";
					}
				},

				initRakCSRSucessData : function(responsesList) {
					if (!responsesList[0].hasOwnProperty('errorMessage')) {
						if(responsesList[0].hasOwnProperty('successMsg')){
							self.CCardStmtReq.successMessage=responsesList[0].successMsg;
						}
					}
				}
		};

		//RAK:3:  - Added for Credit Card - Request for Physical Stmt : END

	// Customization Done : END

	/* ################################################################################################################# */

		// changes fetching response string from server and setting to html for Early Card Renewal Request liststart
	self.RakEarlDebitCardRenewal = {
		debcardList : [],
		branchList : [],
		reasonList : [],
		emirateList : [],
		emiBranchList : [],
		previewResponse : [],
		flag : "",
		otherCode:"",
		otherDesc:"",
		selecteddebcard : "",
		delieveryChannel : "",
		selectedBranch : "",
		selectedReason : "",
		expiryDate : "",
		serverExpiryDate : "",
		isDetailsFetched : "",
		isBack : "",
		auth : "",
		transactionPassword : "",
		expDateRange : "",
		validationExpiryDate : "",
		boolBranch : "",
		isOthersMandatory:false,
		emirateSelected:"",
	    	emiCategorizedBranchList:[],
	    	isEmiSelected:false,
	    	emiSelDesc:"",
		message:"",

		resetRakEarlDebitCardRenewal : function() {

			self.RakEarlDebitCardRenewal.emirateList = [];
			self.RakEarlDebitCardRenewal.emiBranchList = [];
			self.RakEarlDebitCardRenewal.debcardList = [];
			self.RakEarlDebitCardRenewal.branchList = [];
			self.RakEarlDebitCardRenewal.reasonList = [];
			self.RakEarlDebitCardRenewal.previewResponse = [];
			self.RakEarlDebitCardRenewal.flag = "";
			self.RakEarlDebitCardRenewal.selecteddebcard = "";
			self.RakEarlDebitCardRenewal.delieveryChannel = "";
			self.RakEarlDebitCardRenewal.selectedBranch = "";
			self.RakEarlDebitCardRenewal.selectedReason = "";
			self.RakEarlDebitCardRenewal.otherCode = "";
			self.RakEarlDebitCardRenewal.otherDesc = "";
			self.RakEarlDebitCardRenewal.isDetailsFetched = "N";
			self.RakEarlDebitCardRenewal.expiryDate = "";
			self.RakEarlDebitCardRenewal.serverExpiryDate = "";
			self.RakEarlDebitCardRenewal.isBack = false;
			self.RakEarlDebitCardRenewal.auth = "";
			self.RakEarlDebitCardRenewal.transactionPassword = "";
			self.RakEarlDebitCardRenewal.expDateRange = "";
			self.RakEarlDebitCardRenewal.validationExpiryDate = "";
			self.RakEarlDebitCardRenewal.boolBranch = false;
			self.RakEarlDebitCardRenewal.isOthersMandatory = false;
			self.RakEarlDebitCardRenewal.emirateSelected= "";
			self.RakEarlDebitCardRenewal.emiCategorizedBranchList= "";
			self.RakEarlDebitCardRenewal.isEmiSelected=false;
			self.RakEarlDebitCardRenewal.emiSelDesc= "";
			self.common.message = "";
		}

	};

	self.rakEarlyCardRenewBranchOptionChange = function() {

		var branchListCount = 0;
		var emBranchDesc = [];
		self.RakEarlDebitCardRenewal.selectedBranch = "";
		self.RakEarlDebitCardRenewal.emiCategorizedBranchList = [];
		self.RakEarlDebitCardRenewal.isEmiSelected = true;
		for (var x = 0; x < self.RakEarlDebitCardRenewal.emiBranchList.length; x++) {
			if (self.RakEarlDebitCardRenewal.emiBranchList[x].code == self.RakEarlDebitCardRenewal.emirateSelected) {
				emBranchDesc = self.RakEarlDebitCardRenewal.emiBranchList[x].codeDesc
						.split("|");
				break;
			}
		}

		for (var x = 0; x < emBranchDesc.length; x++) {
			for (var y = 0; y < self.RakEarlDebitCardRenewal.branchList.length; y++) {
				if (emBranchDesc[x] == self.RakEarlDebitCardRenewal.branchList[y].code) {
					self.RakEarlDebitCardRenewal.emiCategorizedBranchList[branchListCount] = self.RakEarlDebitCardRenewal.branchList[y];
					branchListCount++;
				}
			}
		}

	};

	self.initRakEarlDebitCardRenewal = function(responsesList) {

		if (!responsesList[0].hasOwnProperty('errorMessage')
				&& !self.RakEarlDebitCardRenewal.isBack) {

			self.RakEarlDebitCardRenewal.isBack = false;


			if (self.RakEarlDebitCardRenewal.isDetailsFetched == "N") {
				self.RakEarlDebitCardRenewal.debcardList = responsesList[0].debitCardList;
				self.RakEarlDebitCardRenewal.expDateRange = responsesList[0].expiryDateRange;
				self.RakEarlDebitCardRenewal.branchList = responsesList[0].DelieveryBranchList;
				self.RakEarlDebitCardRenewal.reasonList = responsesList[0].Reason;
				self.RakEarlDebitCardRenewal.emirateList = responsesList[0].emirateList;
				self.RakEarlDebitCardRenewal.emiBranchList = responsesList[0].emiBranchList;
				if (responsesList[0].hasOwnProperty('ReasonOther') && !(responsesList[0].ReasonOther == ''))
				{
					self.RakEarlDebitCardRenewal.otherCode = responsesList[0].ReasonOther[0].code;
				}

			}

		}

	};

	self.RakEarlDebitCardRenewalContinue = function() {
		if (self.RakEarlDebitCardRenewal.delieveryChannel == "B") {
			self.RakEarlDebitCardRenewal.boolBranch = true;
		} else
			self.RakEarlDebitCardRenewal.boolBranch = false;

		if (self.RakEarlDebitCardRenewal.selectedReason==self.RakEarlDebitCardRenewal.otherCode) {
			self.RakEarlDebitCardRenewal.isOthersMandatory = true;
		} else
			self.RakEarlDebitCardRenewal.isOthersMandatory = false;

	};

	self.initRakEarlDebitCardRenewalConfirm = function(responsesList) {
		if (!responsesList[0].hasOwnProperty('errorMessage')) {

			self.RakEarlDebitCardRenewal.previewResponse = responsesList[0];
			self.RakEarlDebitCardRenewal.auth = responsesList[0].auth;
			self.RakEarlDebitCardRenewal.transactionPassword = "";
                       self.common.message=responsesList[0].MESSAGE ? responsesList[0].MESSAGE :'';
		}
		self.RakEarlDebitCardRenewal.transactionPassword = "";

		 for (var x=0; x<self.RakEarlDebitCardRenewal.emiCategorizedBranchList.length;x++)
		 {
			 if (self.RakEarlDebitCardRenewal.emiCategorizedBranchList[x].code==self.RakEarlDebitCardRenewal.selectedBranch)
			 {
			      self.RakEarlDebitCardRenewal.selectedBranchDesc=self.RakEarlDebitCardRenewal.emiCategorizedBranchList[x].description;
			 }
		 }

		 for (var x=0; x<self.RakEarlDebitCardRenewal.emirateList.length;x++)
		 {
			 if (self.RakEarlDebitCardRenewal.emirateList[x].code==self.RakEarlDebitCardRenewal.emirateSelected)
			 {
			 self.RakEarlDebitCardRenewal.emiSelDesc =self.RakEarlDebitCardRenewal.emirateList[x].codeDesc;
			 }
		 }
	};

	self.RakEarlyDebitCardRenewalShowOtherfields = function() {

		if (self.RakEarlDebitCardRenewal.selecteddebcard != "") {

			self.RakEarlDebitCardRenewal.isDetailsFetched = "Y";
			self.RakEarlDebitCardRenewal.isBack = false;
			self.RakEarlDebitCardRenewal.expiryDate = self.RakEarlDebitCardRenewal.debcardList[self.RakEarlDebitCardRenewal.selecteddebcard].expiryDate;

// Rak  : changes to pick proper date

			//self.RakEarlDebitCardRenewal.expiryDate = self.setFormatedDate(self.RakEarlDebitCardRenewal.expiryDate);

			/*var mm = self.RakEarlDebitCardRenewal.expiryDate.split('-')[0];
			var dd = self.RakEarlDebitCardRenewal.expiryDate.split('-')[1];
			var yy = self.RakEarlDebitCardRenewal.expiryDate.split('-')[2]
					.split(' ')[0];
			self.RakEarlDebitCardRenewal.validationExpiryDate = new Date(yy,
					mm - 1, dd);
			self.RakEarlDebitCardRenewal.serverExpiryDate = self
					.setServerFormatedDate(self.RakEarlDebitCardRenewal.expiryDate);*/
		}
	};

	// changes fetching response string from server and setting to html
	// for Early Card Renewal Request list end

	/*
	 * START 555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555
	 */
	/* Customization : START*/


	/* Debit Report Capture: START */
   			self.RakDebitReportCaptureModel={
					cardNoList:[],
					captureList:[],
					branchList:[],
				selectedCCNo:"",
				selectedBranch:"",
				branchName:"",
				captureFlag:false,
				delieveryMode:"",
				selectedCapture:"",
				bankName:"",
				atmBranchName:"",
			    isBranchOptionSelected:true,
				cardNo:"",
				auth:"",
				authMode:"",
				authStatus:true,
				txnPwd:"",
				otp:"",
				delChannel:"",
				successMessage:"",
				transactionPassword:"",
				selectedBranchContinue:"",
				selectedCaptureContinue:"",
				captureCode:"",
				auth:"",
				boolBranch:false,
				emirateList:[],
				emirateSeletected:"",
				emiCategorizedBranchList:[],
				isEmiSelected:false,
				registeredAddress:"",
				emiBranchList:[]
			};

   			self.rakDebitReportCaptureChange = function() {

   				self.RakDebitReportCaptureModel.selectedBranch="";
   				var branchListCount = 0;
   				var emBranchDesc = [];
   				self.RakDebitReportCaptureModel.emiCategorizedBranchList = [];
   				self.RakDebitReportCaptureModel.isEmiSelected = true;
   				for (var x = 0; x < self.RakDebitReportCaptureModel.emiBranchList.length; x++) {
   					if (self.RakDebitReportCaptureModel.emiBranchList[x].code == self.RakDebitReportCaptureModel.emirateSeletected) {
   						emBranchDesc = self.RakDebitReportCaptureModel.emiBranchList[x].codeDesc
   								.split("|");
   						break;
   					}
   				}

   				for (var x = 0; x < emBranchDesc.length; x++) {
   					for (var y = 0; y < self.RakDebitReportCaptureModel.branchList.length; y++) {
   						if (emBranchDesc[x] == self.RakDebitReportCaptureModel.branchList[y].branchCode) {
   							self.RakDebitReportCaptureModel.emiCategorizedBranchList[branchListCount] = self.RakDebitReportCaptureModel.branchList[y];
   							branchListCount++;
   						}
   					}
   				}

   			};

			self.resetRakDebitReportCapture=function(){
				self.RakDebitReportCaptureModel.cardNoList="";
				self.RakDebitReportCaptureModel.captureList="";
				self.RakDebitReportCaptureModel.branchList="";
				self.RakDebitReportCaptureModel.bankName="";
				self.RakDebitReportCaptureModel.atmBranchName="";
				self.RakDebitReportCaptureModel.delieveryMode="";
				self.RakDebitReportCaptureModel.selectedCapture="";
				self.RakDebitReportCaptureModel.selectedCCNo="";
				self.RakDebitReportCaptureModel.selectedBranch="";
				self.RakDebitReportCaptureModel.branchName="";
			    self.RakDebitReportCaptureModel.isBranchOptionSelected=true;
			    self.RakDebitReportCaptureModel.captureFlag=false;
				self.RakDebitReportCaptureModel.auth="";
				self.RakDebitReportCaptureModel.authMode="";
				self.RakDebitReportCaptureModel.authStatus=true;
				self.RakDebitReportCaptureModel.txnPwd="";
				self.RakDebitReportCaptureModel.otp="";
				self.RakDebitReportCaptureModel.transactionPassword="";
				self.RakDebitReportCaptureModel.selectedBranchContinue="";
				self.RakDebitReportCaptureModel.selectedCaptureContinue="";
				self.RakDebitReportCaptureModel.captureCode="";
				self.RakDebitReportCaptureModel.boolBranch=false;
				self.RakDebitReportCaptureModel.auth="";
				self.RakDebitReportCaptureModel.emirateList=[];
				self.RakDebitReportCaptureModel.emirateSeletected="";
				self.RakDebitReportCaptureModel.emiCategorizedBranchList=[];
				self.RakDebitReportCaptureModel.isEmiSelected=false;
				self.RakDebitReportCaptureModel.registeredAddress="";
				self.RakDebitReportCaptureModel.emiBranchList=[];
				self.common.message="";

			};

			self.initRakDebitReportCapture=function(responsesList){
				if(!responsesList[0].hasOwnProperty('errorMessage')){
					if(responsesList[0].hasOwnProperty('cardNoList'))
						{
						self.RakDebitReportCaptureModel.cardNoList = responsesList[0].cardNoList;
				        self.RakDebitReportCaptureModel.branchList = responsesList[0].branchListArray;
				        self.RakDebitReportCaptureModel.captureList = responsesList[0].captureList;

						}
					if( responsesList[0].hasOwnProperty('captureListCode') && !(responsesList[0].captureListCode == '')){
						self.RakDebitReportCaptureModel.captureCode = responsesList[0].captureListCode[0].code;

					}

					if (responsesList[0].hasOwnProperty('emirateList')) {
						self.RakDebitReportCaptureModel.emirateList = responsesList[0].emirateList;
					}

					if (responsesList[0].hasOwnProperty('emiBranchList')) {
						self.RakDebitReportCaptureModel.emiBranchList = responsesList[0].emiBranchList;
					}
					
					  if(responsesList[0].hasOwnProperty('registeredAddress') && !(responsesList[0].registeredAddress == '' )){
		                	 self.RakDebitReportCaptureModel.registeredAddress =  responsesList[0].registeredAddress[0].address;
		                }

			    }
			};

			self.checkingDebitCaptureDetails=function(){

				if(self.RakDebitReportCaptureModel.selectedCapture == self.RakDebitReportCaptureModel.captureCode)
				{
					self.RakDebitReportCaptureModel.captureFlag=true;
				}
				else
				{	self.RakDebitReportCaptureModel.captureFlag = false;
					self.RakDebitReportCaptureModel.bankName="";
				}


			};

			self.captureDebitContinue=function(){
				if( self.RakDebitReportCaptureModel.delieveryMode=='Branch')
					self.RakDebitReportCaptureModel.boolBranch=true;
				else
				{
					self.RakDebitReportCaptureModel.boolBranch=false;
					self.RakDebitReportCaptureModel.selectedBranch="";
				}

			};

			self.RakDebitReportCaptureContinue = function(responsesList){
				if(!responsesList[0].hasOwnProperty('errorMessage')){

					self.common.message=responsesList[0].MESSAGE ? responsesList[0].MESSAGE :'';
					
					if(responsesList[0].auth == "")
						self.GenericAuthorizationVariable.authStatus=false;
					else
					{	self.RakDebitReportCaptureModel.auth = responsesList[0].auth;
						self.GenericAuthorizationVariable.authStatus=true;
						self.GenericAuthorizationVariable.authMode = responsesList[0].auth;
					}



					if(responsesList[0].hasOwnProperty("cardNo")){
						self.RakDebitReportCaptureModel.cardNoContinue = responsesList[0].cardNo;
					}

					if(responsesList[0].hasOwnProperty("selectedBranchDesc")){
						self.RakDebitReportCaptureModel.selectedBranchContinue = responsesList[0].selectedBranchDesc;
					}

					if(responsesList[0].hasOwnProperty("selectedCaptureDesc")){
						self.RakDebitReportCaptureModel.selectedCaptureContinue = responsesList[0].selectedCaptureDesc;
					}

					//Added By  for Branch Desc
					for (var x=0; x<self.RakDebitReportCaptureModel.emiCategorizedBranchList.length;x++)
						{
							if (self.RakDebitReportCaptureModel.emiCategorizedBranchList[x].code==self.RakDebitReportCaptureModel.branchName)
							{
								self.RakDebitReportCaptureModel.branchSelected=self.RakDebitReportCaptureModel.emiCategorizedBranchList[x].codeDesc;
							}
						}


					//Added By  For Emirate Desc

			    	for (var x=0; x<self.RakDebitReportCaptureModel.emirateList.length;x++)
						{
							if (self.RakDebitReportCaptureModel.emirateList[x].code==self.RakDebitReportCaptureModel.emirateSeletected)
							{
								self.RakDebitReportCaptureModel.emiSelDesc =self.RakDebitReportCaptureModel.emirateList[x].codeDesc;
							}
						}


				}
			};
	/* Debit Report Capture: END */

	/*  Amend Standing Instruction: Start */
			
			
			self.rakAmmendSINewTermDate=function()
			{
				if(self.amendStandingInst.holdSISelected == 'T'){
					self.amendStandingInst.confirmToDate=self.setFormatedDate(self.amendStandingInst.toDate).toString();
					self.amendStandingInst.confirmFromDate=self.setFormatedDate(self.amendStandingInst.fromDate).toString();
				self.common.displayDate = self.amendStandingInst.fromDate;
				self.populateCurrentDateDetails();

				self.amendStandingInst.fromDate_day =self.common.date;
				self.amendStandingInst.fromDate_month=self.common.month;
				self.amendStandingInst.fromDate_year=self.common.year;

				self.common.displayDate = self.amendStandingInst.toDate;
				self.populateCurrentDateDetails();

				self.amendStandingInst.toDate_day =self.common.date;
				self.amendStandingInst.toDate_month=self.common.month;
				self.amendStandingInst.toDate_year=self.common.year;
			}
			else{
				self.amendStandingInst.fromDate_day ="";
				self.amendStandingInst.fromDate_month="";
				self.amendStandingInst.fromDate_year="";

				self.amendStandingInst.toDate_day ="";
				self.amendStandingInst.toDate_month="";
				self.amendStandingInst.toDate_year="";
			}

			
			};
	self.amendStandingInst = {
		// initial Screen
		ccSelected : "",

		ccList : [],
		noOfMonthsList : [],
		debitChargeList : [],
		holdSI:[],
		dateDaysList:[],
		debitAccSelected : "",
		paymentPercentage : "",
		changeSIDate : "",
		debitAccSelected : "",
		holdSISelected:"",
		tempHold : "",
		noOfMonths : "",
		minimumAmountDue:"",
		perentageCurrBal:"",
		isDetailsFetched:"",
		StandingInsStatus:"",
		selectedDate:"",

		responseText : [],
		// For Confirm Screen
		previewResponse : [],

		auth : "",
		transactionPassword : "",
		isBack : "",
		flatAmount:"",
		numberCheckFlag:false,
		dReturn:'',
         message:"",
         toDate:new Date(),
		fromDate:new Date(),
		previewDateOne:"",
		previewDateTwo:"",
		

		resetAmendStandingInst : function() {


			self.amendStandingInst.responseText = [];
			self.amendStandingInst.transactionPassword = "";

			self.amendStandingInst.noOfMonthsList = [];
			self.amendStandingInst.holdSI=[];
			self.amendStandingInst.holdSISelected = "";
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

			//CHANGES DONE AS FIX OF PROUAT-1995 AND 1991 START
			self.amendStandingInst.ccList = [];
			self.RakCCStandingInstModel.isDetailsFetchedForAmendSI=false;
			//CHANGES DONE AS FIX OF PROUAT-1995 AND 1991 END

			self.amendStandingInst.isBack = false;
			self.amendStandingInst.numberCheckFlag=false;
			self.amendStandingInst.dReturn='';
			self.amendStandingInst.StandingInsDisplay = false;
			self.common.message="";
			self.amendStandingInst.toDate="";
			self.amendStandingInst.fromDate=new Date();
			self.amendStandingInst.previewDateOne="";
			self.amendStandingInst.previewDateTwo="";


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

					//CHANGES DONE AS FIX OF PROUAT-1995 AND 1991 START
					/*if(self.RakCCStandingInstModel.isDetailsFetchedForAmendSI==true)
						{*/
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
                            if(self.RakCCStandingInstModel.selectedCreditCard!='')
                            {
							self.amendStandingInst.ccSelected=self.RakCCStandingInstModel.selectedCreditCard;
                            }
						}

						if (responseList[0].SIDEBITACCNUM != '' && responseList[0].SIDEBITACCNUM!=undefined) {
							self.amendStandingInst.debitAccSelected=responseList[0].SIDEBITACCNUM;
                         }

						if (responseList[0].SITEMPHOLD == 'Y') {
							self.amendStandingInst.tempHold = responseList[0].SITEMPHOLD;
							self.amendStandingInst.holdSISelected =responseList[0].SITEMPHOLD;
							self.amendStandingInst.noOfMonths=responseList[0].SITEMPHOLDMONTH;
                         }

						//}
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

						if (responseList[0].hasOwnProperty('debitAccList')) {
							self.amendStandingInst.debitChargeList = responseList[0].debitAccList;

						}
						if (responseList[0].hasOwnProperty('noOfMonths')) {
							self.amendStandingInst.noOfMonthsList = responseList[0].noOfMonths;

						}

						if (responseList[0].hasOwnProperty('dateDays')) {
							self.amendStandingInst.dateDaysList = responseList[0].dateDays;
						}
						if (responseList[0].hasOwnProperty('holdSI')) {
							self.amendStandingInst.holdSI = responseList[0].holdSI;

						}
                     }

				}

			}
		}
	};


	self.RakamendStandingInstHideFields = function() {
		self.amendStandingInst.isDetailsFetched = "N";
		self.amendStandingInst.isBack = false;
	};
	

	self.RakamendStandingfetchDetails = function() {
		if(self.RakCCStandingInstModel.selectedCreditCard!=null &&  self.RakCCStandingInstModel.selectedCreditCard!='')
		{
			scope.setEvent('onRAKCCDetailsSIFetchClick');
		}
	
	};
	
	




	self.initAmendStandingInstConfirm = function(responsesList) {
		self.amendStandingInst.transactionPassword = "";
		if (!responsesList[0].hasOwnProperty('errorMessage')) {

			self.amendStandingInst.previewResponse = responsesList[0];
			if (responsesList[0].hasOwnProperty('auth')) {
				self.amendStandingInst.auth = responsesList[0].auth;

			}
			if (responsesList[0].hasOwnProperty('creditCard')) {
				self.amendStandingInst.ccSelectedContinue = responsesList[0].creditCard;

			}

			if (responsesList[0].hasOwnProperty('DebitAcc')) {
				self.amendStandingInst.debAccNumberContinue = responsesList[0].DebitAcc;

			}
			if (responsesList[0].hasOwnProperty('previewDate')) {
				self.amendStandingInst.previewDateOne = responsesList[0].previewDate;
			}
			if (responsesList[0].hasOwnProperty('previewDateTwo')) {
				self.amendStandingInst.previewDateTwo = responsesList[0].previewDateTwo;
			}



			self.common.message=responsesList[0].MESSAGE ? responsesList[0].MESSAGE :'';

		}

	};
	/*  Amend Standing Instruction: END */


	/* RAK:5 - Stop Cheque : START */
	self.stopCheques={};
   self.stopCheques.isEnquiryStopChequesFlow = function(){
    	if(self.statusInquiry.model.isStopChequeFlow){
    		self.stopCheques.model.pageUserInputs.singleChequeNumber = parseInt(self.statusInquiry.model.stopChequeNumber);
    	}
        self.statusInquiry.model.isStopChequeFlow = false;
    };


    self.stopCheques.model = {
    	isSingleChequeFlow:true,
    	accountNumberList:[],
    	reasonList:[],
    	pageUserInputs:{},
    	seletedAccountNumber:'',
    	selectedChequeNumber:'',
    	selectedResponseCode:'',
    	stopChequeResponse:'',
    	authenticationPassword:'',
    	isAuth:false
    };
    self.stopCheques.resetModel = function(){
    	self.stopCheques.model.isSingleChequeFlow = true;
    	self.stopCheques.model.accountNumberList = [];
    	self.stopCheques.model.reasonList = [];
    	self.stopCheques.model.pageUserInputs = {};
    	self.stopCheques.model.seletedAccountNumber = '';
    	self.stopCheques.model.selectedChequeNumber = '';
    	self.stopCheques.model.selectedResponseCode = '';
    	self.stopCheques.model.stopChequeResponse = '';
    	self.stopCheques.model.authenticationPassword = '';
    	self.stopCheques.model.isBack=false;
    	self.stopCheques.model.isAuth=false;
    };


    self.stopCheques.parseStopChequeInitResponse = function(response){
    	if(!self.stopCheques.model.isBack){
    	if(response.responsesList[0].accountNumberList){
    		self.stopCheques.model.stopChequeInitResponse = response;
    	}
	    	self.stopCheques.model.accountNumberList = response.responsesList[0].accountNumberList || self.stopCheques.model.stopChequeInitResponse.responsesList[0].accountNumberList;
	    	self.stopCheques.model.reasonList = response.responsesList[0].reasonList || self.stopCheques.model.stopChequeInitResponse.responsesList[0].reasonList;
    	 }

    	self.stopCheques.model.isBack=false;
    };
    self.stopCheques.fireEventForChequeStop = function(){
    	self.stopCheques.model.isSingleChequeFlow ? scope.setEvent('onStopAuthClick'):scope.setEvent('onStopSeriesAuthClick');
    };
    self.stopCheques.parseStopChequeAuthResponse = function(response){

    	if(response.responsesList[0].accountNumber){
    		self.stopCheques.model.stopChequeAuthResponse = response.responsesList[0];
    		self.stopCheques.model.authenticationPassword="";

    		if(response.responsesList[0].auth == ""){
    			self.stopCheques.model.isAuth = false;
    		}
    		else{
    			self.stopCheques.model.isAuth = true;
    			//CHNAGES SAVING AUTH MODE START
    			self.GenericAuthorizationVariable.authMode = response.responsesList[0].auth;
    			//CHNAGES SAVING AUTH MODE END
    		}

    	}
    		self.stopCheques.model.authenticationPassword="";
    		self.stopCheques.model.authPageInput={}; // added by CM
	    	self.stopCheques.model.authPageInput.accountNumber = response.responsesList[0].accountNumber || self.stopCheques.model.stopChequeAuthResponse.accountNumber;
//	    	self.stopCheques.model.authPageInput.singleChequeNumber = response.responsesList[0].chequeNumber || self.stopCheques.model.stopChequeAuthResponse.chequeNumber;
	    	self.stopCheques.model.authPageInput.reasonCode = response.responsesList[0].reasonCodeDisplay || self.stopCheques.model.stopChequeAuthResponse.reasonCodeDisplay;

    };
    self.stopCheques.parseStopChequeSuccessResponse = function(response){
    	self.stopCheques.model.stopChequeResponse = response.responsesList[0].stopChequeResponse || self.stopCheques.model.stopChequeResponse;
    };
    self.stopCheques.resetSingleSeriesOnTabSwitch = function(){
        self.stopCheques.model.pageUserInputs = {};
    }
    self.stopCheques.getServiceInputFor = function(identifier){
    	var returnValue = '';
    	switch (identifier) {
		case 'CHEQUE_NUMBER':

			returnValue = self.stopCheques.model.isSingleChequeFlow ? self.stopCheques.model.pageUserInputs.singleChequeNumber : " ";
			break;
		case 'REASON_CODE':

			returnValue = self.stopCheques.model.pageUserInputs.reasonCode;
			break;
		case 'ChequeNoFrom':

			returnValue = self.stopCheques.model.isSingleChequeFlow ? " ":self.stopCheques.model.pageUserInputs.fromChequeNumber;
			break;
		case 'ChequeNoTo':

			returnValue = self.stopCheques.model.isSingleChequeFlow ? " ":self.stopCheques.model.pageUserInputs.toChequeNumber;
			break;
		case 'ChequeTypeSelection':

			returnValue = self.stopCheques.model.isSingleChequeFlow ? "Single":"Series";
			break;
		case 'Mode':

			returnValue = self.authenticate.authPassword;
			break;
		default:
			break;
		}
    	return returnValue.toString();
    };

/* RAK:5: - Stop Cheque : END */

	/* RAK:5: - Credit Card: Credit Limit Change Request : START */


	self.numberOfMonths=function(a,b){
		return parseInt(b.numdesc) < parseInt(a.numdesc) ? 1 : -1;
	};

	// credit card limit change
	self.creditCardLimitChange={
	//init page  credit card limit change
		ccList:[],
		limitSizeInit:0,
		remarksSizeInit:0,
		ccSelected:"",
		newLimitAmt:"",
		note:"",
		newLimitAmtString:"",
		isDetailFetched:"",
		totalLimit:"",
		noOfMonthsList:[],
		limitList:[],
		sortedMonthList:[],
		noOfMonths:"",
		limitChange:"",
		requestTo:"",
		tempCode:"",
		isBack:"",
		//continue page credit card limit change
		cardNoContinue: "",
	    newLimitContinue: "",
	    remarksContinue: "",
	    authTypeContinue: "",
	    limitContinue: "",
	    monthsContinue: "",
	    auth:"",
	    boolTemp:false,
	    message:"",
	    ccCombinedLimitFlag:false,

		resetCreditCardLimitChangeModel : function() {



			self.creditCardLimitChange.newLimitAmt = "";
			self.creditCardLimitChange.note = "";
			self.creditCardLimitChange.newLimitAmtString = "";
			self.creditCardLimitChange.isDetailFetched = "";
			self.creditCardLimitChange.totalLimit = "";
			self.creditCardLimitChange.noOfMonthsList = [];
			self.creditCardLimitChange.limitList = [];
			self.creditCardLimitChange.sortedMonthList = [];
			self.creditCardLimitChange.noOfMonths = "";
			self.creditCardLimitChange.limitChange = "";
			self.creditCardLimitChange.requestTo = "";
			self.creditCardLimitChange.tempCode = "";
			self.creditCardLimitChange.isBack = false;
			self.creditCardLimitChange.cardNoContinue = "";
			self.creditCardLimitChange.newLimitContinue = "";
			self.creditCardLimitChange.remarksContinue = "";
			self.creditCardLimitChange.authTypeContinue = "";
			self.creditCardLimitChange.limitContinue = "";
			self.creditCardLimitChange.monthsContinue = "";
			self.creditCardLimitChange.auth = "";

			self.common.message = "";

			self.creditCardLimitChange.ccCombinedLimitFlag = false;
		},

		/**
		* Initialize Credit card limit module
		* @constructor
		*/
		init:function(response){

		if (!response.hasOwnProperty('errorMessage')
					&& !self.creditCardLimitChange.isBack) {

				self.creditCardLimitChange.isBack = false;

			if( response.hasOwnProperty('ccList')){
				this.ccSelected="";
				this.newLimitAmt="";
				this.note="";
				this.newLimitAmtString="";
				this.ccList=response.ccList;

			}

			self.creditCardLimitChange.isDetailsFetched = response.isDetailFetched;

			if (self.creditCardLimitChange.isDetailsFetched == "Y") {
				if( response.hasOwnProperty('totalCreditLimit')){
					this.totalLimit = response.totalCreditLimit;

				}
				if( response.hasOwnProperty('noOfMonths')){
					this.noOfMonthsList = response.noOfMonths;
					this.sortedMonthList =  jQuery(this.noOfMonthsList).sort(self.numberOfMonths).toArray();

				}
				if( response.hasOwnProperty('limit')){
					this.limitList = response.limit;
					this.sortedLimitList =  jQuery(this.limitList).sort(self.numberOfMonths).toArray();

				}
				if( response.hasOwnProperty('TemporaryCode') && !(response.TemporaryCode == '')){
					this.tempCode = response.TemporaryCode[0].tempCode;

				}

				if (response.hasOwnProperty('combinedLimit'))
				{
					if(response.combinedLimit == 'Y')
						self.creditCardLimitChange.ccCombinedLimitFlag = true;
					else
						self.creditCardLimitChange.ccCombinedLimitFlag = false;
				}

			}
		}

		},

		continueClick:function(){

			if(self.creditCardLimitChange.limitChange == self.creditCardLimitChange.tempCode)
				self.creditCardLimitChange.boolTemp = true;
			else
				self.creditCardLimitChange.boolTemp = false;
		},


	    /**
		* Initialize Credit card limit continueInit module
		* @constructor
		*/
		continueInit:function(response){
			this.auth="";
			if( response.hasOwnProperty('cardNo')){
			//this.auth="";
				this.cardNoContinue=response.cardNo;
				this.newLimitContinue=response.newLimit;
				this.monthsContinue=response.selectedMonthDesc;
				this.limitContinue=response.selectedLimitDesc;
				this.remarksContinue=response.remarks;
				this.authTypeContinue=response.auth;

				self.common.message=response.MESSAGE ? response.MESSAGE : '';
			}

		},

	//Success page  credit card limit change

		creditcardChangeLimitResponse: "",
	    cardNoSuccess: "",
	    newLimitSuccess: "",
	    remarksSuccess: "",

	    /**
		* Initialize Credit card limit successInit module
		* @constructor
		*/
		successInit:function(response){
			if( response.hasOwnProperty('creditcardChangeLimitResponse')){
				this.creditcardChangeLimitResponse=response.creditcardChangeLimitResponse;
				this.cardNoSuccess=response.cardNo;
				this.newLimitSuccess=response.newLimit;
				this.remarksSuccess=response.remarks;
			}

		}


	};

	self.RakCreditCardLimitChangeHideFields = function() {
		self.creditCardLimitChange.isDetailsFetched = "N";
		self.creditCardLimitChange.isBack = false;
	};

	/* RAK:5: - Credit Card: Credit Limit Change Request : END */
	/* RAK:5: - Status Of Service Request : START */

	self.serviceRequestStatusModel= {
			searchStatus:false,
			response:[],
			searchResponse:[],
			requestTypeResponse:[],
			resetrequestTypeResponse:[],
			requestTypeList:[],
			resetrequestTypeList:[],
			requestType:'',
			requestTypeSelected:'',
			referenceID:'',
			fromDate:'',
			fromDateClear:'',
			toDate:'',
			toDateClear:'',
			isBackClick:false,
			isCloseClick:false,
			dateStringFormat:'dd-MM-yy',
			emptyValue:'',
			messageString:'',
			dateFieldSelected:false,
			selectedItemName:'',
			emptyPendingRecord:false,
			validationError:false,
			isDefaultFromDate:false,
			isDefaultToDate:false,
			configDay:'',
			selectedSR:'',
			selectedRefId:'',
			selectedRequestId:'',
			isFromSRStatusFlow : false,
			eventExecuted : '',
			successPage : '',
			detailModel : {},
			resetConfigDays:'',
			resetFlag:false,
			cardFlag:'',
			isSRorTF:'SR',

			resetServiceRequestStatusModel : function(){
				self.serviceRequestStatusModel.response=[];
				self.serviceRequestStatusModel.delinkedSR='';
				self.serviceRequestStatusModel.resetServiceRequestStatusSearchForm();
				self.serviceRequestStatusModel.selectedSR = '';
				self.serviceRequestStatusModel.selectedRefId = '';
				self.serviceRequestStatusModel.selectedRequestId = '';
				self.serviceRequestStatusModel.isFromSRStatusFlow = false;
				self.serviceRequestStatusModel.eventExecuted = '';
				self.serviceRequestStatusModel.successPage = '';
				self.serviceRequestStatusModel.detailModel = {};
				self.serviceRequestStatusModel.cardFlag='';
			},
			resetServiceRequestStatusSearchForm : function(){
				self.serviceRequestStatusModel.searchStatus=false;
				self.serviceRequestStatusModel.searchResponse=[];
				self.serviceRequestStatusModel.requestTypeResponse=[];
				self.serviceRequestStatusModel.requestTypeList=[];
				self.serviceRequestStatusModel.requestTypeSelected='';
				self.serviceRequestStatusModel.requestType='';
				self.serviceRequestStatusModel.referenceID='';
				self.serviceRequestStatusModel.fromDate='';
				self.serviceRequestStatusModel.toDate='';
				self.serviceRequestStatusModel.isBackClick=false;
				self.serviceRequestStatusModel.isCloseClick=false;
				self.serviceRequestStatusModel.messageString='';
				self.serviceRequestStatusModel.dateFieldSelected=false;
				self.serviceRequestStatusModel.selectedItemName='';
				self.serviceRequestStatusModel.emptyPendingRecord=false;
				self.serviceRequestStatusModel.validationError=false;
				self.serviceRequestStatusModel.isDefaultFromDate=false;
				self.serviceRequestStatusModel.isDefaultToDate=false;
				self.serviceRequestStatusModel.configDay='';
				self.serviceRequestStatusModel.selectedRefId = '';
				self.serviceRequestStatusModel.selectedRequestId = '';
				self.serviceRequestStatusModel.isFromSRStatusFlow = false;
				self.serviceRequestStatusModel.eventExecuted = '';
				self.serviceRequestStatusModel.successPage = '';
				self.serviceRequestStatusModel.detailModel = {};
				self.serviceRequestStatusModel.cardFlag='';
			},
			serviceRequestInitService:function(responseList){
				if(!responseList[0].hasOwnProperty('errorMessage')  && !self.serviceRequestStatusModel.isCloseClick && !self.serviceRequestStatusModel.isBackClick){
					self.serviceRequestStatusModel.response = responseList[0].requestList;
					self.serviceRequestStatusModel.delinkedSR = responseList[0].delinkedSR;
					if(!self.serviceRequestStatusModel.response.length){
						self.serviceRequestStatusModel.emptyPendingRecord=true;
					}
				}
			},
			initForm:function(responseList){
				if(!responseList[0].hasOwnProperty('errorMessage')  && !self.serviceRequestStatusModel.isBackClick){
					self.serviceRequestStatusModel.requestTypeResponse = responseList[0].status;
					if(self.serviceRequestStatusModel.isSRorTF=="TF")
					{self.serviceRequestStatusModel.requestTypeList = responseList[0].requestType;
					
					self.serviceRequestStatusModel.requestTypeList.sort(
							function(a,b){
								a = a.content.toLowerCase();
							    b = b.content.toLowerCase();

							    return a < b ? -1 : a > b ? 1 : 0;
							});
					
					
					self.serviceRequestStatusModel.requestTypeResponse.sort(
							function(a,b){
								a = a.content.toLowerCase();
							    b = b.content.toLowerCase();

							    return a < b ? -1 : a > b ? 1 : 0;
							});
					}
					else{
					self.serviceRequestStatusModel.requestTypeList = responseList[0].requestTypeList;
					}
					self.serviceRequestStatusModel.configDay = parseInt(responseList[0].defaultDateRangeForSearch);
					
					self.serviceRequestStatusModel.resetConfigDays=self.serviceRequestStatusModel.configDay;
					self.serviceRequestStatusModel.resetrequestTypeResponse=self.serviceRequestStatusModel.requestTypeResponse;
					self.serviceRequestStatusModel.resetrequestTypeList=self.serviceRequestStatusModel.requestTypeList;
					self.serviceRequestStatusModel.requestTypeSelected="All";
					self.serviceRequestStatusModel.requestType="ALL";
//					self.serviceRequestStatusModel.configDay = 365;
				
					self.serviceRequestStatusModel.referenceID='';
					self.serviceRequestStatusModel.messageString='';
					self.serviceRequestStatusModel.fromDate='';
					self.serviceRequestStatusModel.toDate='';
				}

				if(self.serviceRequestStatusModel.requestType == "All"){
					self.serviceRequestStatusModel.requestType = "";
				}
				if(self.serviceRequestStatusModel.isDefaultFromDate){
					self.serviceRequestStatusModel.fromDate = "";
				}
				if(self.serviceRequestStatusModel.isDefaultToDate){
					self.serviceRequestStatusModel.toDate = "";
				}
			},
			searchClick:function(){

				// Check for reference ID

				var regex = /^[a-zA-Z0-9]*$/;
			    var flag = regex.test(self.serviceRequestStatusModel.referenceID);

				if(parseInt(self.serviceRequestStatusModel.referenceID) == 0 || !flag || self.serviceRequestStatusModel.referenceID.length > 10  ){
					self.serviceRequestStatusModel.validationError=true;
				}
				else{
					self.serviceRequestStatusModel.validationError=false;
				}
				
				self.common.displayDate = self.serviceRequestStatusModel.fromDate;
				self.populateCurrentDateDetails();
		  		self.serviceRequestStatusModel.fromDate_day =self.common.date;
		  		self.serviceRequestStatusModel.fromDate_month=self.common.month;
		  		self.serviceRequestStatusModel.fromDate_year=self.common.year;
		  		
		  		self.common.displayDate = self.serviceRequestStatusModel.toDate;
		  		self.populateCurrentDateDetails();
		  		self.serviceRequestStatusModel.toDate_day =self.common.date;
		  		self.serviceRequestStatusModel.toDate_month=self.common.month;
		  		self.serviceRequestStatusModel.toDate_year=self.common.year;

				// Check date field
		  		/*var currentDate = new Date();

				if( self.serviceRequestStatusModel.fromDate instanceof Date && self.serviceRequestStatusModel.toDate instanceof Date && self.serviceRequestStatusModel.fromDate > self.serviceRequestStatusModel.toDate ){
					self.serviceRequestStatusModel.validationError=true;
				}
				if( self.serviceRequestStatusModel.fromDate > currentDate || self.serviceRequestStatusModel.toDate > currentDate  ){
					self.serviceRequestStatusModel.validationError=true;
				}

				if(!(self.serviceRequestStatusModel.fromDate instanceof Date)){
					self.serviceRequestStatusModel.isDefaultFromDate = true;
				}
				else{
					self.serviceRequestStatusModel.isDefaultFromDate = false;
				}

				if(!(self.serviceRequestStatusModel.toDate instanceof Date)){
					self.serviceRequestStatusModel.isDefaultToDate=true;
				}
				else{
					self.serviceRequestStatusModel.isDefaultToDate=false;
				}*/

				if(!self.serviceRequestStatusModel.validationError){

					if(self.serviceRequestStatusModel.requestType==''){
						self.serviceRequestStatusModel.requestType = "All";
					}

					/*if(!(self.serviceRequestStatusModel.fromDate instanceof Date)){
						if(self.serviceRequestStatusModel.toDate instanceof Date){
							var currentDate = new Date(self.serviceRequestStatusModel.toDate);
						}
						else{
							var currentDate = new Date();
						}
						if(self.serviceRequestStatusModel.resetFlag==false)
						{
						self.serviceRequestStatusModel.fromDate = new Date( currentDate.setDate(currentDate.getDate() - self.serviceRequestStatusModel.configDay));
						}
					}

					if(!(self.serviceRequestStatusModel.toDate instanceof Date)){
						if(self.serviceRequestStatusModel.resetFlag==false)
						{
						self.serviceRequestStatusModel.toDate = new Date();
						}
					}*/
				}
			},
			resettingsearchClick:function(){
				var currentDate = new Date();
				self.serviceRequestStatusModel.fromDate = new Date( currentDate.setDate(currentDate.getDate() - self.serviceRequestStatusModel.resetConfigDays));
				self.serviceRequestStatusModel.fromDateClear=self.serviceRequestStatusModel.fromDate;
				self.serviceRequestStatusModel.fromDate='';
                self.serviceRequestStatusModel.toDate = new Date();
                self.serviceRequestStatusModel.toDateClear=self.serviceRequestStatusModel.toDate;
                self.serviceRequestStatusModel.toDate='';
                self.serviceRequestStatusModel.requestTypeSelected="All";
				self.serviceRequestStatusModel.requestType="ALL";
				self.serviceRequestStatusModel.resetFlag=true;
			},
			sendingDateOnButtonClick:function(){
				if(self.serviceRequestStatusModel.toDate=='')
				{
				self.serviceRequestStatusModel.toDate=self.serviceRequestStatusModel.toDateClear;
				}
				if(self.serviceRequestStatusModel.fromDate=='')
				{
				self.serviceRequestStatusModel.fromDate=self.serviceRequestStatusModel.fromDateClear;
				}
			},
			resetBackData:function()
			{
				self.serviceRequestStatusModel.requestTypeResponse=self.serviceRequestStatusModel.resetrequestTypeResponse;
				self.serviceRequestStatusModel.requestTypeList=self.serviceRequestStatusModel.resetrequestTypeList;
				self.serviceRequestStatusModel.requestTypeSelected="All";
				self.serviceRequestStatusModel.requestType="ALL";
				self.serviceRequestStatusModel.toDate='';
				self.serviceRequestStatusModel.fromDate='';
				self.serviceRequestStatusModel.referenceID='';
				self.serviceRequestStatusModel.messageString='';
				self.serviceRequestStatusModel.selectedItemName='';
				
			},
			selelctedItem:function(value){
				self.serviceRequestStatusModel.selectedItemName =  value;
			},
			displayMessage:function(){
				if(!self.serviceRequestStatusModel.isBackClick){
				self.serviceRequestStatusModel.messageString = '';

				if(self.serviceRequestStatusModel.referenceID != ''){
					self.serviceRequestStatusModel.dateFieldSelected=false;
					self.serviceRequestStatusModel.messageString = "Reference ID " + self.serviceRequestStatusModel.referenceID;
				}
				else{
					if(self.serviceRequestStatusModel.fromDate != ''){
						self.serviceRequestStatusModel.dateFieldSelected=true;
					}
					else{
						self.serviceRequestStatusModel.dateFieldSelected=false;
					}

					if(self.serviceRequestStatusModel.requestType != ''){
						if(self.serviceRequestStatusModel.requestType == "All"){
							self.serviceRequestStatusModel.messageString = self.serviceRequestStatusModel.requestType;
						}
						else{
							if(self.serviceRequestStatusModel.fromDate instanceof Date && self.serviceRequestStatusModel.toDate instanceof Date && ( !self.serviceRequestStatusModel.isDefaultFromDate || !self.serviceRequestStatusModel.isDefaultToDate)) {
								self.serviceRequestStatusModel.dateFieldSelected=true;
							}
							else{
								self.serviceRequestStatusModel.dateFieldSelected=false;
							}

							self.serviceRequestStatusModel.messageString = self.serviceRequestStatusModel.selectedItemName;
						}

						self.serviceRequestStatusModel.messageString  += " Requests ";
					}
				}
			}
			},
			serviceRequestSearchResultService:function(responseList){
				if (!responseList[0].hasOwnProperty('errorMessage') && !self.serviceRequestStatusModel.isBackClick) {
					self.serviceRequestStatusModel.searchResponse = responseList[0].requestList;
					self.serviceRequestStatusModel.delinkedSR = responseList[0].delinkedSR;
				}
			},
			//RAK: Added for fething  details of selected reference Id/ SR : START
			getEventName : function(SR){
				self.serviceRequestStatusModel.selectedRefId = SR.referenceId;
				self.serviceRequestStatusModel.selectedRequestId = SR.requestId;
				self.serviceRequestStatusModel.isFromSRStatusFlow = true;
				self.serviceRequestStatusModel.eventExecuted = "SRReqStatusDetails";
				if(self.serviceRequestStatusModel.isSRorTF=="TF"){
					
					rootScope.rakTradeFinance.isTfsrApprRejClicked="N";
					rootScope.rakTradeFinance.tfServiceRequestStatusModel.selectedRefId = SR.referenceId;;
					rootScope.rakTradeFinance.tfServiceRequestStatusModel.selectedRequestId = SR.requestId;
					rootScope.rakTradeFinance.tfsrDetItem.tfsrDesc = SR.requestDescription;
					scope.setEvent("onRakTFServiceRequestDetailsFetch");	
				}
				else if(self.serviceRequestStatusModel.selectedRequestId!='MCR'){
					scope.setEvent("onRakServiceRequestDetailsFetch");			
				}
			},
			rakFetchSRStatusDetResponse:function(responseList){
				//self.showErrorMsg=false;
				self.serviceRequestStatusModel.detailModel = responseList[0];
				self.serviceRequestStatusModel.detailModel.srHeader = rootScope.$eval(self.serviceRequestStatusModel.detailModel.srHeader);
				if(self.serviceRequestStatusModel.detailModel.labelKeySet){
					self.serviceRequestStatusModel.detailModel.labelKeySetArr=[];
					var res=self.serviceRequestStatusModel.detailModel.labelKeySet.split('|');
					for(var v=0;v<res.length-1;v++){
						var resArr =res[v].split('^');
						var labetStr = rootScope.$eval(resArr[0]);
						var obj={label:labetStr,value:self.serviceRequestStatusModel.detailModel[resArr[1]]};
						self.serviceRequestStatusModel.detailModel.labelKeySetArr.push(obj);
					}
					self.serviceRequestStatusModel.detailModel.labelKeySetArr = self.serviceRequestStatusModel.rakPopulateStatusReqCheck(self.serviceRequestStatusModel.detailModel.labelKeySetArr);
				}
				return true;
			},
			rakPopulateStatusReqCheck:function(labelKeySetArr){
				self.serviceRequestStatusModel.detailModel.labelKeySetArrModified=[];
				switch(self.serviceRequestStatusModel.selectedRequestId){
				case "LIP":
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[0].label,value:labelKeySetArr[0].value});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[1].label,value:labelKeySetArr[1].value+" "+rootScope.appLiterals.APP.RAK_SERVICES.RAK_INSTALLMENT_POSTPONE.Installment});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[2].label,value:labelKeySetArr[2].value});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[3].label,value:labelKeySetArr[3].value});
					break;
				
				case "AAS":
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[0].label,value:labelKeySetArr[0].value});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[1].label,value:labelKeySetArr[1].value});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[2].label,value:labelKeySetArr[2].value});
					break;
					
				//Added for SIP -investement Subscription
					
				case "SIP":
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[0].label,value:labelKeySetArr[0].value});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[1].label,value:"0"+labelKeySetArr[2].value+labelKeySetArr[1].value});
					break;	
					
				case "TDC":
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[0].label,value:labelKeySetArr[0].value});
					
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:rootScope.appLiterals.APP.RAK_SERVICES.RAK_CLOSURETD.TXT_PRE_MAT_INTS,value:rootScope.appLiterals.APP.RAK_SERVICES.RAK_CLOSURETD.TXT_PRE_MAT_INT_RADIO});
					
					/*self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[1].label,value:labelKeySetArr[1].value});*/
					
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[1].label,value:labelKeySetArr[1].value});
					
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[2].label,value:labelKeySetArr[2].value});
					if(labelKeySetArr[3].value != '')
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[3].label,value:labelKeySetArr[3].value});
					break;
				case "ADC":
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[0].label,
								value:labelKeySetArr[0].value});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[1].label,
								value:labelKeySetArr[1].value});					
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[2].label,
								value:(labelKeySetArr[2].value == 'B')?rootScope.appLiterals.APP.RAKDCAPPLYSR.DCAPPLY_DISPATCH_BRANCH:rootScope.appLiterals.APP.RAKDCAPPLYSR.DCAPPLY_DISPATCH_ADDRESS});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:(labelKeySetArr[2].value == 'B')?rootScope.appLiterals.APP.RAKDCAPPLYSR.DCAPPLY_DISPATCH_BRANCH:rootScope.appLiterals.APP.RAKDCAPPLYSR.DCAPPLY_ADDRESS,
								value:(labelKeySetArr[2].value == 'B')?labelKeySetArr[3].value:labelKeySetArr[4].value});
					break;
				case "DEC":
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[0].label,
								value:labelKeySetArr[0].value});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[1].label,
								value:labelKeySetArr[1].value});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[3].label,
								value:labelKeySetArr[3].value});
					if(labelKeySetArr[2].value == 'O'){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[4].label,
									value:labelKeySetArr[4].value});
					}
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[5].label,
								value:(labelKeySetArr[5].value == 'B')?rootScope.appLiterals.APP.RAK_SERVICES.RENEW_DEBIT_CARD.BRANCH:rootScope.appLiterals.APP.RAK_SERVICES.RENEW_DEBIT_CARD.COURIER});
					if(labelKeySetArr[5].value == 'B'){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:rootScope.appLiterals.APP.RAK_SERVICES.RAKOPRACCTBALCONF.BRANCHNAME,
									value:labelKeySetArr[6].value});
					}
					break;
				case "TBD":
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[0].label,
								value:labelKeySetArr[0].value});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[1].label,
								value:labelKeySetArr[1].value});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[2].label,
								value:labelKeySetArr[2].value});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[3].label,
								value:labelKeySetArr[3].value});
					if(labelKeySetArr[3].value == 'Others'){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[4].label,
									value:labelKeySetArr[4].value});
					}
					break;
				case "UDC":
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[0].label,
								value:labelKeySetArr[0].value});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[1].label,
								value:labelKeySetArr[1].value});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[2].label,
								value:labelKeySetArr[2].value});
					if(labelKeySetArr[2].value == 'Others'){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[3].label,
									value:labelKeySetArr[3].value});
					}
					break;
				case "RCR":
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[0].label,
								value:labelKeySetArr[0].value});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[1].label,
								value:labelKeySetArr[1].value});
					var dispatchMode = labelKeySetArr[1].value;
					
					if(dispatchMode == rootScope.appLiterals.APP.RAK_SERVICES.RAK_DEBIT_REPLACEMENT.BRANCH){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[9].label,
									value:labelKeySetArr[9].value});
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[10].label,
									value:labelKeySetArr[10].value});
					}
					if(dispatchMode == rootScope.appLiterals.APP.RAK_SERVICES.RAK_DEBIT_REPLACEMENT.COURIER){	
						var delAdd = labelKeySetArr[2].value;
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[2].label,
									value:labelKeySetArr[2].value});
						if(delAdd == rootScope.appLiterals.APP.RAK_SERVICES.RAK_DEBIT_REPLACEMENT.REGADD){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[3].label,
									value:labelKeySetArr[3].value});
						}
						else if(delAdd == rootScope.appLiterals.APP.RAK_SERVICES.RAK_DEBIT_REPLACEMENT.OTHERADD){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[4].label,
									value:labelKeySetArr[4].value});
						}
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[5].label,
									value:labelKeySetArr[5].value});
						var authRec = labelKeySetArr[5].value;
						if(authRec == rootScope.appLiterals.APP.RAK_SERVICES.RAK_DEBIT_REPLACEMENT.AUTHPERSON){
							self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
									{label:labelKeySetArr[6].label,
										value:labelKeySetArr[6].value});
							self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
									{label:labelKeySetArr[8].label,
										value:labelKeySetArr[8].value});
						}
						
						else if(authRec == rootScope.appLiterals.APP.RAK_SERVICES.RAK_DEBIT_REPLACEMENT.SELF){						
						
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[7].label,
									value:labelKeySetArr[7].value});
						}
						
					}
					break;
				case "GLD":
					if(labelKeySetArr[1].value){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push({label:labelKeySetArr[0].label,value:labelKeySetArr[0].value});
					}
					else{
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push({label:rootScope.appLiterals.APP.RAKGLDACCOPEN.REF_ACCOUNT,value:labelKeySetArr[0].value});
					}
					if(labelKeySetArr[1].value){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push({label:labelKeySetArr[1].label,value:labelKeySetArr[1].value});
					}
					if(labelKeySetArr[3].value){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push({label:labelKeySetArr[2].label,value:labelKeySetArr[8].value+" "+labelKeySetArr[3].value+rootScope.appLiterals.APP.RAKGLDACCOPEN.PER_GRAM});
					}
					if(labelKeySetArr[4].value){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push({label:labelKeySetArr[4].label,value:labelKeySetArr[4].value+" "+rootScope.appLiterals.APP.RAKGLDACCOPEN.OR+" "+rootScope.appLiterals.APP.RAKGLDACCOPEN.XAU_LABEL+" "+labelKeySetArr[5].value });
					}
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push({label:labelKeySetArr[6].label,value:labelKeySetArr[6].value});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push({label:labelKeySetArr[7].label,value:labelKeySetArr[7].value});
					break;
				case "CHK":
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[0].label,
								value:labelKeySetArr[0].value});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[1].label,
								value:labelKeySetArr[1].value});
					if(labelKeySetArr[2].value == 'B'){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:rootScope.appLiterals.APP.RAK_SERVICES.RAK_COMMUN_BOOK.TXT_DISPMODE,
									value:rootScope.appLiterals.APP.RAK_SERVICES.RAK_COMMUN_BOOK.TXT_DISPBRANCH});
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[3].label,
									value:labelKeySetArr[3].value});
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[4].label,
									value:labelKeySetArr[4].value});
					}
					else if(labelKeySetArr[2].value == 'C'){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:rootScope.appLiterals.APP.RAK_SERVICES.RAK_COMMUN_BOOK.TXT_DISPMODE,
									value:rootScope.appLiterals.APP.RAK_SERVICES.RAK_COMMUN_BOOK.TXT_DISPCOURIER});
						/*self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[5].label,
									value:labelKeySetArr[5].value});*/
						if(labelKeySetArr[5].value == 'Registered Address'){
							self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
									{label:labelKeySetArr[6].label,
										value:labelKeySetArr[6].value});
						}
						else if(labelKeySetArr[5].value == 'Other Address'){
							self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
									{label:labelKeySetArr[7].label,
										value:labelKeySetArr[7].value});
						}
						else if(labelKeySetArr[5].value =='' && labelKeySetArr[7].value==''){
							self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
									{label:labelKeySetArr[6].label,
										value:labelKeySetArr[6].value});
						}
						//Changes done as a part of Authorized Person CR start
						if(labelKeySetArr[13].value == 'Authorized Person'){
							self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
									{label:labelKeySetArr[9].label,
										value:labelKeySetArr[9].value});
							self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
									{label:labelKeySetArr[11].label,
										value:labelKeySetArr[10].value + labelKeySetArr[11].value});
							self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
									{label:labelKeySetArr[12].label,
										value:labelKeySetArr[12].value});
						}
						//Changes done as a part of Authorized Person CR End
						
					}
						if(rootScope.dashboard.userType!='2' && labelKeySetArr[13].value != 'Authorized Person')
						{
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[8].label,
									value:labelKeySetArr[8].value});
						}
					break;
				case "UPD":
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified = self.serviceRequestStatusModel.createUPDFinalStatsDetailsArray(labelKeySetArr);
					break;
				case "APR":
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[0].label,
								value:labelKeySetArr[0].value});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[1].label,
								value:labelKeySetArr[1].value});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[2].label,
								value:labelKeySetArr[2].value});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[3].label,
								value:labelKeySetArr[3].value});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[4].label,
								value:labelKeySetArr[4].value+" hrs to "+labelKeySetArr[8].value+" hrs"});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[5].label,
								value:labelKeySetArr[5].value+" hrs to "+labelKeySetArr[9].value+" hrs"});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[6].label,
								value:labelKeySetArr[6].value+" hrs to "+labelKeySetArr[10].value+" hrs"});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[7].label,
								value:labelKeySetArr[7].value+" hrs to "+labelKeySetArr[11].value+" hrs"});
					if(labelKeySetArr[12].value == 'SUC'){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:rootScope.appLiterals.APP.RAK_SERVICES.RAKALERTPREF.TXT_PROMOMSG,
									value:"Yes"});
					}
					if(labelKeySetArr[12].value != 'SUC'){
							self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
									{label:rootScope.appLiterals.APP.RAK_SERVICES.RAKALERTPREF.TXT_PROMOMSG,
										value:"No"});
					}
					break;
				
				case "CSC":
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[0].label,
								value:labelKeySetArr[0].value});
					if(labelKeySetArr[1].value == 'A'){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[1].label,
								value:rootScope.appLiterals.APP.RAK_SERVICES.RAK_CC_SMARTCASH.MY_RAKBANK});
					}
					else {
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[1].label,
									value:rootScope.appLiterals.APP.RAK_SERVICES.RAK_CC_SMARTCASH.MY_OTHERBANK});
					}
					if(labelKeySetArr[1].value == 'A'){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:rootScope.appLiterals.APP.RAK_SERVICES.RAK_CC_SMARTCASH.MY_RAKBANK,
								value:labelKeySetArr[2].value});
					}
					else {
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:rootScope.appLiterals.APP.RAK_SERVICES.RAK_CC_SMARTCASH.MY_OTHERBANK,
									value:labelKeySetArr[3].value});
					}
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[4].label,
								value:labelKeySetArr[4].value});
					break;

				case "DDM":
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[0].label,
								value:labelKeySetArr[0].value});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[1].label,
								value:labelKeySetArr[1].value});	
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[2].label,
								value:labelKeySetArr[2].value});
					if(labelKeySetArr[3].value != "" && labelKeySetArr[3].value != null){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[3].label,
								value:labelKeySetArr[3].value});
				          }
					
					if(null!= labelKeySetArr[7].value  && labelKeySetArr[7].value != ""){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[7].label,
								value:labelKeySetArr[7].value});
				        }
					
					if(labelKeySetArr[8].value != "" && labelKeySetArr[8].value != null){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[8].label,
								value:labelKeySetArr[8].value});	
					}
					
					if(labelKeySetArr[4].value != "" && labelKeySetArr[4].value != null){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[4].label,
								value:labelKeySetArr[4].value});
				          }
					if(labelKeySetArr[6].value != "" && labelKeySetArr[6].value != null){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[6].label,
								value:labelKeySetArr[6].value});
				          }
					
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[9].label,
								value:labelKeySetArr[9].value});	
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[10].label,
								value:labelKeySetArr[10].value});	
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[11].label,
								value:labelKeySetArr[11].value});
					if(labelKeySetArr[12].value != "" && labelKeySetArr[12].value != null){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[12].label,
								value:labelKeySetArr[12].value});
					}
					if(labelKeySetArr[13].value != "" && labelKeySetArr[13].value != null){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[13].label,
								value:labelKeySetArr[13].value});
				     }
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[14].label,
								value:labelKeySetArr[14].value});
				    
					if(labelKeySetArr[15].value != "" && labelKeySetArr[15].value != null){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[15].label,
								value:labelKeySetArr[15].value});
				     }
					if(labelKeySetArr[16].value != "" && labelKeySetArr[16].value != null){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[16].label,
								value:labelKeySetArr[16].value});
					}
					if(labelKeySetArr[17].value != "" && labelKeySetArr[17].value != null){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[17].label,
								value:labelKeySetArr[17].value});
					}
					if(labelKeySetArr[18].value != "" && labelKeySetArr[18].value != null){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[18].label,
								value:labelKeySetArr[18].value});
					}
					break;
				case "DBR":
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[0].label,
								value:labelKeySetArr[0].value});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[1].label,
								value:labelKeySetArr[1].value});	
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[2].label,
								value:(labelKeySetArr[2].value == 'Y')?rootScope.appLiterals.APP.RAK_SERVICES.RAKOPRISLAMICACCOPEN.DEBIT_ACC_YES:rootScope.appLiterals.APP.RAK_SERVICES.RAKOPRISLAMICACCOPEN.DEBIT_ACC_NO});
					if(labelKeySetArr[0].value =="" || labelKeySetArr[0].value ==null){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[3].label,
									value:labelKeySetArr[3].value});
					}
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[4].label,
								value:labelKeySetArr[4].value});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[5].label,
								 value:labelKeySetArr[5].value});
					if(labelKeySetArr[0].value !="" && labelKeySetArr[0].value !=null && labelKeySetArr[3].value=='JOINTOR'){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[3].label,
									value:labelKeySetArr[3].value});
					}
					break;
				
				case "TSO":
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[0].label,	value:labelKeySetArr[0].value});
					
					if(labelKeySetArr[1].value == 'DPV'){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:rootScope.appLiterals.APP.RAK_SERVICES.RAK_DEP_OPEN_NEW.PERIOD,	value:labelKeySetArr[2].value});
					}
					else
					{
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:rootScope.appLiterals.APP.RAK_SERVICES.RAK_DEP_OPEN_NEW.FROM_DATE,	value:labelKeySetArr[3].value});
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:rootScope.appLiterals.APP.RAK_SERVICES.RAK_DEP_OPEN_NEW.TO_DATE,	value:labelKeySetArr[4].value});
					}
					
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[5].label,	value:labelKeySetArr[5].value});
					
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[6].label,	value:labelKeySetArr[6].value});
					
					if(labelKeySetArr[8].value == 'OMA'){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:rootScope.appLiterals.APP.RAK_SERVICES.RAK_DEP_OPEN_NEW.MATURITY,	value:rootScope.appLiterals.APP.RAK_SERVICES.RAK_DEP_OPEN_NEW.RADIO1 +" - "+ labelKeySetArr[7].value});
					}
					else
					{
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:rootScope.appLiterals.APP.RAK_SERVICES.RAK_DEP_OPEN_NEW.MATURITY,	value:rootScope.appLiterals.APP.RAK_SERVICES.RAK_DEP_OPEN_NEW.RADIO2});
						
						if(labelKeySetArr[9].value == 'PFA')
							self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
									{label:rootScope.appLiterals.APP.RAK_SERVICES.RAK_DEP_OPEN_NEW.PROFIT_HANDLE,	value:rootScope.appLiterals.APP.RAK_SERVICES.RAK_DEP_OPEN_NEW.CREDIT_PROFIT +" - "+ labelKeySetArr[10].value});
						
						if(labelKeySetArr[9].value == 'IHR')
							self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
									{label:rootScope.appLiterals.APP.RAK_SERVICES.RAK_DEP_OPEN_NEW.PROFIT_HANDLE,	value:rootScope.appLiterals.APP.RAK_SERVICES.RAK_DEP_OPEN_NEW.RADIO4});
					}
					
										
					break;
					
				case "TDO":
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[0].label,	value:labelKeySetArr[0].value});
					
					if(labelKeySetArr[1].value == 'DPV'){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:rootScope.appLiterals.APP.RAK_SERVICES.RAK_DEP_OPEN_NEW.PERIOD,	value:labelKeySetArr[2].value});
					}
					else
					{
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:rootScope.appLiterals.APP.RAK_SERVICES.RAK_DEP_OPEN_NEW.FROM_DATE,	value:labelKeySetArr[3].value});
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:rootScope.appLiterals.APP.RAK_SERVICES.RAK_DEP_OPEN_NEW.TO_DATE,	value:labelKeySetArr[4].value});
					}
					
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[5].label,	value:labelKeySetArr[5].value});
					
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[6].label,	value:labelKeySetArr[6].value});
					
					if(labelKeySetArr[8].value == 'OMA'){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:rootScope.appLiterals.APP.RAK_SERVICES.RAK_DEP_OPEN_NEW.MATURITY,	value:rootScope.appLiterals.APP.RAK_SERVICES.RAK_DEP_OPEN_NEW.RADIO1 +" - "+ labelKeySetArr[7].value});
					}
					else
					{
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:rootScope.appLiterals.APP.RAK_SERVICES.RAK_DEP_OPEN_NEW.MATURITY,	value:rootScope.appLiterals.APP.RAK_SERVICES.RAK_DEP_OPEN_NEW.RADIO2});
						
						if(labelKeySetArr[9].value == 'IHA')
							self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
									{label:rootScope.appLiterals.APP.RAK_SERVICES.RAK_DEP_OPEN_NEW.PROFIT_HANDLE,	value:rootScope.appLiterals.APP.RAK_SERVICES.RAK_DEP_OPEN_NEW.CREDIT_PROFIT +" - "+ labelKeySetArr[10].value});
						
						if(labelKeySetArr[9].value == 'IHR')
							self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
									{label:rootScope.appLiterals.APP.RAK_SERVICES.RAK_DEP_OPEN_NEW.PROFIT_HANDLE,	value:rootScope.appLiterals.APP.RAK_SERVICES.RAK_DEP_OPEN_NEW.RADIO4});
					}
					
					if(labelKeySetArr[1].value == 'DPV'){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:rootScope.appLiterals.APP.RAK_SERVICES.RAK_DEP_OPEN_NEW.RATE,	value:labelKeySetArr[11].value});
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:rootScope.appLiterals.APP.RAK_SERVICES.RAK_DEP_OPEN_NEW.MAT_AMT,	value:labelKeySetArr[12].value});
					}
										
					break;
				
				case "TDM":
					
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[0].label,	value:labelKeySetArr[0].value});
					
					if(labelKeySetArr[9].value == 'C'){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:rootScope.appLiterals.APP.RAK_SERVICES.RAKAMENDMATURITY.CREDIT_INTEREST_TO_MY_ACCOUNT,	value:labelKeySetArr[1].value});
					}
					else if(labelKeySetArr[9].value == 'I')
					{
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:rootScope.appLiterals.APP.RAK_SERVICES.RAKAMENDMATURITY.INCREASE_AMOUNT_DEP,	value:labelKeySetArr[2].value});
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:rootScope.appLiterals.APP.RAK_SERVICES.RAKAMENDMATURITY.AND_DEBIT_ACCOUNT_NUM,	value:labelKeySetArr[3].value});
					}
					else if(labelKeySetArr[9].value == 'D')
					{
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:rootScope.appLiterals.APP.RAK_SERVICES.RAKAMENDMATURITY.DECREASE_AMOUNT_DEP,	value:labelKeySetArr[4].value});
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:rootScope.appLiterals.APP.RAK_SERVICES.RAKAMENDMATURITY.AND_CREDIT_ACCOUNT_NUM,	value:labelKeySetArr[5].value});
					}
					else if(labelKeySetArr[9].value == 'CTD')
					{
						if(labelKeySetArr[6].value == 'RegP')
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:rootScope.appLiterals.APP.RAK_SERVICES.RAKAMENDMATURITY.REGULAR_PERIOD,	value:labelKeySetArr[10].value});
						if(labelKeySetArr[6].value == 'Date')
						{
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:rootScope.appLiterals.APP.RAK_SERVICES.RAKAMENDMATURITY.FROM_DATE,	value:labelKeySetArr[7].value});
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:rootScope.appLiterals.APP.RAK_SERVICES.RAKAMENDMATURITY.TO_DATE,	value:labelKeySetArr[8].value});
						}
					}
					
					break;
					
				case "RSR":
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[0].label,	value:labelKeySetArr[0].value});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[2].label,	value:labelKeySetArr[2].value});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[3].label,	value:labelKeySetArr[3].value});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[4].label,
								value:(labelKeySetArr[4].value == 'B')?rootScope.appLiterals.APP.RAKOPRACCDUPSTMTSR.OPRACCDUPSTMT_DISPATCH_BRANCH:rootScope.appLiterals.APP.RAKOPRACCDUPSTMTSR.OPRACCDUPSTMT_DISPATCH_ADDRESS});
					
					
					if(labelKeySetArr[4].value == 'B'){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[5].label,	value:labelKeySetArr[5].value});
					}
					
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[6].label,	value:labelKeySetArr[6].value});
									
					break;
					
				case "TDR":
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[0].label,	value:labelKeySetArr[0].value});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[1].label,	value:labelKeySetArr[1].value});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[2].label,	value:labelKeySetArr[2].value});
					
					//sib changes done as fix of PROUAT-6401 start
					if(labelKeySetArr[3].value == 'FPV'){
					   self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:rootScope.appLiterals.APP.RAK_SERVICES.RAKTERMDEPOSIT.RENEWAL_PERIOD,value:labelKeySetArr[11].value});
					}
					//sib changes done as fix of PROUAT-6401 end
					
					
					//sib changes done as fix of PROUAT-6399 start
					else if(labelKeySetArr[3].value == 'Date'){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:rootScope.appLiterals.APP.RAK_SERVICES.RAKTERMDEPOSIT.RENEWAL_PERIOD,
									value:labelKeySetArr[4].label+" "+labelKeySetArr[4].value+" "+
									labelKeySetArr[5].label+" "+labelKeySetArr[5].value});
					}
					//sib changes done as fix of PROUAT-6399 end
					
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[6].label,	value:labelKeySetArr[6].value});
					
					if(labelKeySetArr[7].value == 'PA'){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:rootScope.appLiterals.APP.RAK_SERVICES.RAKTERMDEPOSIT.ON_MATURITY,	value:rootScope.appLiterals.APP.RAK_SERVICES.RAKTERMDEPOSIT.CREDIT_PROCEED_TO_MY_ACCOUNT});
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:rootScope.appLiterals.APP.RAK_SERVICES.RAKTERMDEPOSIT.ON_MATURITY_Account_Number,	value:labelKeySetArr[8].value});
					}
					else if(labelKeySetArr[7].value == 'Auto'){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:rootScope.appLiterals.APP.RAK_SERVICES.RAKTERMDEPOSIT.ON_MATURITY,	value:rootScope.appLiterals.APP.RAK_SERVICES.RAKTERMDEPOSIT.AUTO_ROLLOVER});
						if(labelKeySetArr[9].value == 'IA'){
							self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
									{label:rootScope.appLiterals.APP.RAK_SERVICES.RAKTERMDEPOSIT.INTEREST_HANDLING,	value:labelKeySetArr[10].value});
						}
						if(labelKeySetArr[9].value == 'DepositAmt'){
							self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
									{label:rootScope.appLiterals.APP.RAK_SERVICES.RAKTERMDEPOSIT.INTEREST_HANDLING,	value:rootScope.appLiterals.APP.RAK_SERVICES.RAKTERMDEPOSIT.ADD_INTEREST_TO_DEPOSIT_AMOUNT});
						}
					}
									
					break;
					
				case "CSI":
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[0].label,	value:labelKeySetArr[0].value});
					
					if(labelKeySetArr[1].value == 'F')
						{
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[1].label,	value:rootScope.appLiterals.APP.RAKCCSTANDINGINST.FLAT_AMT});
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:rootScope.appLiterals.APP.RAKCCSTANDINGINST.FLAT_AMT,	value:labelKeySetArr[2].value});
						}
					else if(labelKeySetArr[1].value == 'M')
						{
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[1].label,	value:rootScope.appLiterals.APP.RAKCCSTANDINGINST.MIN_AMT_DUE});
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:rootScope.appLiterals.APP.RAKCCSTANDINGINST.MIN_AMT_DUE,	value:labelKeySetArr[2].value});
						}
					else if(labelKeySetArr[1].value == 'P')
						{
						/*self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[1].label,	value:rootScope.appLiterals.APP.RAKCCSTANDINGINST.CURR_STMT_BAL});*/						
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:rootScope.appLiterals.APP.RAKCCSTANDINGINST.CURR_STMT_BAL,
									value:labelKeySetArr[6].value+" "+rootScope.appLiterals.APP.RAKCCSTANDINGINST.CURR_STMT_BAL});
						}
					
					if(labelKeySetArr[3].value == 'N')
						{
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[3].label,	value:labelKeySetArr[4].value+"-"+" "+rootScope.appLiterals.APP.RAKCCSTANDINGINST.DOM_SRSTATUS});
						}
					else 
						{
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[3].label,	value:rootScope.appLiterals.APP.RAKCCSTANDINGINST.PMT_DUE_DATE});
						}
					
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[5].label,	value:labelKeySetArr[5].value});
					break;	
					
				case "TLU":
					
					
					if(labelKeySetArr[0].value == ''){
						self.showErrorMsg=true;
					}
					else{
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[0].label,	value:labelKeySetArr[0].value});
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[1].label,	value:labelKeySetArr[1].value});
					}
			
					break;
				case "CCC":
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[0].label,value:labelKeySetArr[0].value});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[1].label,value:labelKeySetArr[1].value});
					if(labelKeySetArr[1].value == 'OTHERS'){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[2].label,value:labelKeySetArr[2].value});
					}
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[3].label,value:labelKeySetArr[3].value});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[4].label,value:labelKeySetArr[4].value.split("|")[1].split(".")[0]});
					if(labelKeySetArr[5].value =='B'){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[5].label,value:rootScope.appLiterals.APP.RAK_SERVICES.RAK_CC_CHEQ_REQ.BRANCH});
					}else if(labelKeySetArr[5].value =='C'){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[5].label,value:rootScope.appLiterals.APP.RAK_SERVICES.RAK_CC_CHEQ_REQ.COURIER});
					}else if(labelKeySetArr[5].value =='T'){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[5].label,value:rootScope.appLiterals.APP.RAK_SERVICES.RAK_CC_CHEQ_REQ.ACC});
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[6].label,value:labelKeySetArr[6].value});
					}
					if(labelKeySetArr[5].value =='B'){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[7].label,value:labelKeySetArr[7].value});
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[8].label,value:labelKeySetArr[8].value});
					}
					break;
				case "UBC":
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[0].label,value:labelKeySetArr[0].value});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[1].label,value:labelKeySetArr[1].value});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[2].label,value:labelKeySetArr[2].value});
					if(labelKeySetArr[2].value =='Others'){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[3].label,value:labelKeySetArr[3].value});
					}
					break;
				case "RCC":
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[0].label,value:labelKeySetArr[0].value});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[1].label,value:labelKeySetArr[1].value});
					if(labelKeySetArr[2].value !=''){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[2].label,value:labelKeySetArr[2].value});
					}
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[3].label,value:labelKeySetArr[3].value});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[4].label,value:labelKeySetArr[4].value});
					if(labelKeySetArr[4].value =='Branch'){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[5].label,value:labelKeySetArr[5].value});
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[6].label,value:labelKeySetArr[6].value});
					}
						
					break;
				case "EVB":
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[0].label,value:labelKeySetArr[0].value});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[1].label,value:labelKeySetArr[1].value});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[2].label,value:labelKeySetArr[2].value.split("|")[1].split(".")[0]});
					
					break;
				case "OBC":
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[0].label,value:labelKeySetArr[0].value});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[1].label,value:labelKeySetArr[1].value});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[2].label,value:labelKeySetArr[2].value});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[3].label,value:labelKeySetArr[3].value});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[4].label,value:labelKeySetArr[4].value});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[5].label,value:labelKeySetArr[5].value});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[6].label,value:labelKeySetArr[6].value});
					if(labelKeySetArr[6].value == 'Collect from Branch')
						{
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[7].label,value:labelKeySetArr[7].value});
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[8].label,value:labelKeySetArr[8].value});
						}
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[9].label,value:labelKeySetArr[9].value});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[10].label,value:labelKeySetArr[10].value});
					break;
					
				case "BRL":
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[0].label,value:labelKeySetArr[0].value});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[1].label,value:labelKeySetArr[1].value});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[2].label,value:labelKeySetArr[2].value});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[3].label,value:labelKeySetArr[3].value=='E' ? rootScope.appLiterals.APP.RAK_SERVICES.RAKBANKREFLETTER.ENGLISH : rootScope.appLiterals.APP.RAK_SERVICES.RAKBANKREFLETTER.ARABIC });
					
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[4].label,value:labelKeySetArr[4].value });
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[5].label,value:labelKeySetArr[5].value});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[6].label,value:labelKeySetArr[6].value});
					
					var tempStr='';
					
				
					
					
					tempStr=labelKeySetArr[10].value=='Y'  ? rootScope.appLiterals.APP.RAK_SERVICES.RAKBANKREFLETTER.BANKADD :"";
					tempStr=labelKeySetArr[9].value=='Y'  ? tempStr ? tempStr+", "+rootScope.appLiterals.APP.RAK_SERVICES.RAKBANKREFLETTER.IBAN : rootScope.appLiterals.APP.RAK_SERVICES.RAKBANKREFLETTER.IBAN   :tempStr ;
					tempStr=labelKeySetArr[8].value=='Y'  ? tempStr ? tempStr+", "+rootScope.appLiterals.APP.RAK_SERVICES.RAKBANKREFLETTER.SWIFT : rootScope.appLiterals.APP.RAK_SERVICES.RAKBANKREFLETTER.SWIFT   :tempStr ;
					tempStr=labelKeySetArr[7].value=='Y' ? tempStr ? tempStr+", "+rootScope.appLiterals.APP.RAK_SERVICES.RAKBANKREFLETTER.ACCOUNTCURRENCY : rootScope.appLiterals.APP.RAK_SERVICES.RAKBANKREFLETTER.ACCOUNTCURRENCY   :tempStr ;


					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[8].label,value:tempStr});

					
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[11].label,value:labelKeySetArr[11].value});
					
					
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[12].label,value:labelKeySetArr[12].value=='B' ? rootScope.appLiterals.APP.RAK_SERVICES.RAKBANKREFLETTER.COLLECTBRANCH : rootScope.appLiterals.APP.RAK_SERVICES.RAKBANKREFLETTER.DELMYADD });
					
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[13].label,value:labelKeySetArr[13].value});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[14].label,value:labelKeySetArr[14].value});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[15].label,value:labelKeySetArr[15].value});
					break;

				case "RCS":
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[0].label,value:labelKeySetArr[0].value});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[1].label,value:labelKeySetArr[1].value+" "+labelKeySetArr[2].value});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[3].label,value:labelKeySetArr[3].value+" "+labelKeySetArr[4].value});					
					break;
				case "BCC":
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[0].label,value:labelKeySetArr[0].value});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[1].label,value:labelKeySetArr[1].value});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[2].label,value:labelKeySetArr[2].value});
					if(labelKeySetArr[2].value == 'Others'){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[3].label,value:labelKeySetArr[3].value});
					}
					break;
				case "IIR":
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[0].label,value:labelKeySetArr[0].value});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[1].label,value:labelKeySetArr[1].value});
					
					if(labelKeySetArr[2].value == 'A'){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[2].label,value:"All Nominal Amount"});
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[3].label,value:labelKeySetArr[3].value});
					}else if(labelKeySetArr[2].value == 'PN'){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[2].label,value:"Part Nominal Amount"});
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[4].label,value:labelKeySetArr[4].value});
					}
					if(labelKeySetArr[5].value == 'AU'){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[5].label,value:"All Units"});
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[6].label,value:labelKeySetArr[6].value});
					}else if(labelKeySetArr[5].value == 'PU'){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[5].label,value:"Partial Units"});
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[7].label,value:labelKeySetArr[7].value});
					}
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[8].label,value:labelKeySetArr[8].value});
					break;
				case "CCL":
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[0].label+""+rootScope.appLiterals.APP.RAK_SERVICES.RAK_CHNG_CNFRMPAGE.TXT_FR,value:labelKeySetArr[0].value});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[1].label,value:labelKeySetArr[1].value});
					if(labelKeySetArr[2].value=='Increase'){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[2].label,value:rootScope.appLiterals.APP.RAK_SERVICES.RAK_CHNG_CCLIMPAG.PH_INC_LT});
						}else if(labelKeySetArr[2].value=='Decrease'){
							self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
									{label:labelKeySetArr[2].label,value:rootScope.appLiterals.APP.RAK_SERVICES.RAK_CHNG_CCLIMPAG.PH_DEC_LT});
						}
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[3].label,value:labelKeySetArr[3].value});
					if(labelKeySetArr[3].value == 'Temporary'){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[4].label,value:labelKeySetArr[4].value});
					}
					
					break;
				case "LBC":
					/*if(labelKeySetArr[0].value == 'LC'){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:rootScope.appLiterals.APP.RAK_SERVICES.RAK_LC_NLC.REQ_LC_OR_NLC,value:"Liabililty Certificate"});
					}else{
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:rootScope.appLiterals.APP.RAK_SERVICES.RAK_LC_NLC.REQ_LC_OR_NLC,value:"No-Liabililty Certificate"});
					}*/
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[1].label,value:labelKeySetArr[1].value});
						
					/*if(labelKeySetArr[1].value =='ALL'){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:rootScope.appLiterals.APP.RAK_SERVICES.RAK_LC_NLC.ACCOUNT_SELECTED,value:"All Accounts"});
					}
					else if(labelKeySetArr[1].value=='LAA'){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:rootScope.appLiterals.APP.RAK_SERVICES.RAK_LC_NLC.ACCOUNT_SELECTED,value:"Loan or Finance Accounts"});
					}
					else{
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:rootScope.appLiterals.APP.RAK_SERVICES.RAK_LC_NLC.ACCOUNT_SELECTED,value:"Credit Card Accounts"});
					}
					if(labelKeySetArr[1].value!='LAA' || labelKeySetArr[0].value != 'LC'){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[2].label,value:labelKeySetArr[2].value});
					}
					if(labelKeySetArr[1].value!='CCD' || labelKeySetArr[0].value != 'LC'){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[3].label,value:labelKeySetArr[3].value});
					}*/
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[2].label,value:labelKeySetArr[2].value});
					if(labelKeySetArr[3].value=='E'){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[3].label,value:"English"});
					}
					else{
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[3].label,value:"Arabic"});
					}
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[4].label,value:labelKeySetArr[4].value});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[5].label,value:labelKeySetArr[5].value});
					var disp_mode=labelKeySetArr[5].value.toUpperCase();
					if(disp_mode=="COLLECT FROM BRANCH"){			
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[6].label,value:labelKeySetArr[6].value});
					}
					if(disp_mode=="DELIVER TO MY ADDRESS"){
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[7].label,value:labelKeySetArr[7].value});
					}
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[8].label,value:labelKeySetArr[8].value});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[9].label,value:labelKeySetArr[9].value});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[10].label,value:labelKeySetArr[10].value});
					break;
				case "CBT":
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[0].label,
								value:labelKeySetArr[0].value});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[1].label,
								value:labelKeySetArr[1].value});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[2].label,
								value:labelKeySetArr[2].value});				
  				    self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[3].label,
									value:labelKeySetArr[3].value});					
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[4].label,
								value:labelKeySetArr[4].value});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[5].label,						
								value:labelKeySetArr[5].value});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[6].label,
								value:labelKeySetArr[6].value});
					/*self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[7].label,
								value:labelKeySetArr[7].value});*/
					if(labelKeySetArr[8].value =='B'){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[7].label,
								value:rootScope.appLiterals.APP.RAK_SERVICES.RAK_CC_BAL_TRANSFER.BRANCH});
				     }
					if(labelKeySetArr[8].value =='C'){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[7].label,
								value: rootScope.appLiterals.APP.RAK_SERVICES.RAK_CC_BAL_TRANSFER.COURIER});
				     }
					if(labelKeySetArr[8].value =='B'){
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[9].label,
								value:labelKeySetArr[9].value});
					}
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[10].label,
								value:labelKeySetArr[10].value});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[11].label,
								value:labelKeySetArr[11].value});	
					break;
				case "ASI":
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[0].label,
								value:labelKeySetArr[0].value});
					if(labelKeySetArr[1].value =='P'){
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[1].label,
								value:rootScope.appLiterals.APP.RAK_SERVICES.RAK_AMEND_SI.PH_PER_CURR_BAL});
					
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[3].label,
								value:labelKeySetArr[3].value+" "+rootScope.appLiterals.APP.RAK_SERVICES.RAK_AMEND_SI.TXT_PERCENTAGE_SIGN});
					}
					if(labelKeySetArr[1].value =='M'){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[1].label,
									value:rootScope.appLiterals.APP.RAK_SERVICES.RAK_AMEND_SI.PH_MIN_AMT_DUE});
						}
					if(labelKeySetArr[1].value =='F'){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[1].label,
									value:rootScope.appLiterals.APP.RAK_SERVICES.RAK_AMEND_SI.PH_FLAT_AMT});
						
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[2].label,
									value:labelKeySetArr[2].value});
						}
				
				if(labelKeySetArr[4].value =='Y'){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[4].label,
									value:rootScope.appLiterals.APP.RAK_SERVICES.RAK_AMEND_SI.PH_PYMT_DUE_DATE});
					}
					if(labelKeySetArr[4].value =='N'){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[4].label,
									value:rootScope.appLiterals.APP.RAK_SERVICES.RAK_AMEND_SI.PH_DAYS_DATE});
					}
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[5].label,
								value:labelKeySetArr[5].value});
					if(labelKeySetArr[4].value =='N'){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[6].label,
								value:labelKeySetArr[6].value});
					}
					if(labelKeySetArr[7].value =='N' || labelKeySetArr[7].value =='P'){
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[7].label,
								value:rootScope.appLiterals.APP.RAK_SERVICES.RAK_AMEND_SI.PH_PERMANENT});
					}
					if(labelKeySetArr[7].value =='T'){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[7].label,
									value:rootScope.appLiterals.APP.RAK_SERVICES.RAK_AMEND_SI.PH_TEMP});
						}
					
							
					if(labelKeySetArr[7].value =='T'){
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[8].label,
								value:labelKeySetArr[8].value});
					}
					
					if(labelKeySetArr[7].value =='T'){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[9].label,
									value:labelKeySetArr[9].value});
						}
					if(labelKeySetArr[7].value =='T'){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[10].label,
									value:labelKeySetArr[10].value});
						}
					break;
				case "TSC":
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[0].label,
								value:labelKeySetArr[0].value});					
					if(labelKeySetArr[1].value !="" && labelKeySetArr[1].value !=null){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[1].label,
								value:labelKeySetArr[1].value});	
					}
					if(labelKeySetArr[2].value !="" && labelKeySetArr[2].value !=null){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[2].label,
								value:labelKeySetArr[2].value});	
					}
					if(labelKeySetArr[3].value !="" && labelKeySetArr[3].value !=null){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[3].label,
								value:labelKeySetArr[3].value});
					}
					if(labelKeySetArr[4].value !="" && labelKeySetArr[4].value !=null){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[4].label,
								value:labelKeySetArr[4].value});
					}
					if(labelKeySetArr[5].value !="" && labelKeySetArr[5].value !=null){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[5].label,
								value:labelKeySetArr[5].value});	
					}
					if(labelKeySetArr[6].value !="" &&labelKeySetArr[6].value !=null){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[6].label,
									value:labelKeySetArr[6].value});
					}
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[7].label,
								value:labelKeySetArr[7].value});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[8].label,
								value:rootScope.appLiterals.APP.RAK_SERVICES.RAK_CLOSURETD.TXT_CREDIT_TO_ISL+" "+labelKeySetArr[8].value});
					if(labelKeySetArr[9].value !="" &&labelKeySetArr[9].value !=null){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[9].label,
								value:labelKeySetArr[9].value});
					}
					
						
									
					break;
				case "TSA":
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[0].label,
								value:labelKeySetArr[0].value});					
					if(labelKeySetArr[1].value !="" && labelKeySetArr[1].value !=null){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[1].label,
								value:labelKeySetArr[1].value});
					}
					if(labelKeySetArr[2].value !="" && labelKeySetArr[2].value !=null){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[2].label,
								value:labelKeySetArr[2].value});	
					}
					if(labelKeySetArr[3].value !="" && labelKeySetArr[3].value !=null){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[3].label,
								value:labelKeySetArr[3].value});
					}
					if(labelKeySetArr[4].value !="" && labelKeySetArr[4].value !=null){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[4].label,
								value:labelKeySetArr[4].value});
					}
					if(labelKeySetArr[5].value !="" && labelKeySetArr[5].value !=null){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[5].label,
								value:labelKeySetArr[5].value});
					}
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[6].label,
									value:labelKeySetArr[6].value});												
									
					break;
				case "CPS":
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[0].label,
								value:labelKeySetArr[0].value});							
					if(labelKeySetArr[1].value !="" && labelKeySetArr[1].value !=null){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[1].label,
									value:rootScope.appLiterals.APP.RAK_SERVICES.RAK_CC_PIN_SET.PINMASK});
					}
					if(labelKeySetArr[2].value !="" && labelKeySetArr[2].value !=null){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[2].label,
								value:rootScope.appLiterals.APP.RAK_SERVICES.RAK_CC_PIN_SET.PINMASK});
					}
													
					break;
					
				case "CAO":		
					if(labelKeySetArr[0].value !="" && labelKeySetArr[0].value !=null){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[0].label,
								value:labelKeySetArr[0].value});
					}
					if(labelKeySetArr[1].value !="" && labelKeySetArr[1].value !=null){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[1].label,
								value:labelKeySetArr[1].value});
					}
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[2].label,
								value:(labelKeySetArr[2].value == 'Y')?rootScope.appLiterals.APP.RAK_SERVICES.RAKOPRCURRACCOPEN.DEBIT_ACC_YES:rootScope.appLiterals.APP.RAK_SERVICES.RAKOPRCURRACCOPEN.DEBIT_ACC_NO});
					
					if(labelKeySetArr[3].value !="" && labelKeySetArr[3].value !=null){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[3].label,
								value:labelKeySetArr[3].value});
					}
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[4].label,	value:labelKeySetArr[4].value.split(" ")[0]});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[5].label,
								value:(labelKeySetArr[5].value == 'Y')?rootScope.appLiterals.APP.RAK_SERVICES.RAKOPRCURRACCOPEN.UAERESIDENT_Y:rootScope.appLiterals.APP.RAK_SERVICES.RAKOPRCURRACCOPEN.UAERESIDENT_N});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[6].label,	value:labelKeySetArr[6].value.split(" ")[0]});
					if(labelKeySetArr[7].value !="" && labelKeySetArr[7].value !=null){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[7].label,
								value:labelKeySetArr[7].value});
					}	
					if(labelKeySetArr[8].value !="" && labelKeySetArr[8].value !=null){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[8].label,
									value:(labelKeySetArr[8].value == 'Y')?rootScope.appLiterals.APP.RAK_SERVICES.RAKOPRCURRACCOPEN.CHKBOOKRQD_Y:rootScope.appLiterals.APP.RAK_SERVICES.RAKOPRCURRACCOPEN.CHKBOOKRQD_N});
					}
					if(labelKeySetArr[9].value !="" && labelKeySetArr[9].value !=null){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[9].label,
									value:(labelKeySetArr[9].value == 'Y')?rootScope.appLiterals.APP.RAK_SERVICES.RAKOPRCURRACCOPEN.INTRSTRAKVALUE_Y:rootScope.appLiterals.APP.RAK_SERVICES.RAKOPRCURRACCOPEN.INTRSTRAKVALUE_N});
					}
					
					break;
				case "LTR":
					if(labelKeySetArr[0].value !="" && labelKeySetArr[0].value !=null){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[0].label,
								value:labelKeySetArr[0].value});
				      }
					if(labelKeySetArr[1].value !="" && labelKeySetArr[1].value !=null){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[1].label,
								value:labelKeySetArr[1].value});	
					}
					if(labelKeySetArr[2].value !="" && labelKeySetArr[2].value !=null){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[2].label,
								value:labelKeySetArr[2].value});		
					}
					if(labelKeySetArr[3].value !="" && labelKeySetArr[3].value !=null){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[3].label,
								value:labelKeySetArr[3].value});	
					}
					if(labelKeySetArr[4].value !="" && labelKeySetArr[4].value !=null){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[4].label,
								value:labelKeySetArr[4].value});
					}
					if(labelKeySetArr[5].value !="" && labelKeySetArr[5].value !=null){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[5].label,
								value:labelKeySetArr[5].value});	
					}
					if(labelKeySetArr[6].value !="" &&labelKeySetArr[6].value !=null){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[6].label,
									value:labelKeySetArr[6].value});
					}
					if(labelKeySetArr[7].value !="" && labelKeySetArr[7].value !=null){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[7].label,
								value:labelKeySetArr[7].value});
					}
					if(labelKeySetArr[8].value !="" && labelKeySetArr[8].value !=null){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[8].label,
								value:labelKeySetArr[8].value});
					}
					if(labelKeySetArr[9].value !="" &&labelKeySetArr[9].value !=null){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[9].label,
								value:labelKeySetArr[9].value});
					}										
													
					break;
					
					case "FSR":		
					if(labelKeySetArr[0].value !="" && labelKeySetArr[0].value !=null){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[0].label,
								value:labelKeySetArr[0].value});
					}
					if(labelKeySetArr[1].value !="" && labelKeySetArr[1].value !=null){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[1].label,
								value:labelKeySetArr[1].value});
					}
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[2].label,
								value:(labelKeySetArr[2].value == 'Y')?rootScope.appLiterals.APP.RAK_SERVICES.RAKOPRFSACCOPEN.DEBIT_ACC_YES:rootScope.appLiterals.APP.RAK_SERVICES.RAKOPRFSACCOPEN.DEBIT_ACC_NO});
					
					if(labelKeySetArr[3].value !="" && labelKeySetArr[3].value !=null){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[3].label,
								value:labelKeySetArr[3].value});
					}
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[4].label,	value:labelKeySetArr[4].value.split(" ")[0]});
					
					if(labelKeySetArr[5].value !="" && labelKeySetArr[5].value !=null){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[5].label,
									value:(labelKeySetArr[5].value == 'Y')?rootScope.appLiterals.APP.RAK_SERVICES.RAKOPRFSACCOPEN.INTRSTRAKVALUE_Y:rootScope.appLiterals.APP.RAK_SERVICES.RAKOPRFSACCOPEN.INTRSTRAKVALUE_N});
					}
					
					break;
					
				case "SBO":		
					if(labelKeySetArr[0].value !="" && labelKeySetArr[0].value !=null){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[0].label,
								value:labelKeySetArr[0].value});
					}
					if(labelKeySetArr[1].value !="" && labelKeySetArr[1].value !=null){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[1].label,
								value:labelKeySetArr[1].value});
					}
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[2].label,
								value:(labelKeySetArr[2].value == 'Y')?rootScope.appLiterals.APP.RAK_SERVICES.RAKOPRSAVACCOPEN.DEBIT_ACC_YES:rootScope.appLiterals.APP.RAK_SERVICES.RAKOPRSAVACCOPEN.DEBIT_ACC_NO});
					
					if(labelKeySetArr[3].value !="" && labelKeySetArr[3].value !=null){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[3].label,
								value:labelKeySetArr[3].value});
					}
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[4].label,	value:labelKeySetArr[4].value.split(" ")[0]});
					
					if(labelKeySetArr[5].value !="" && labelKeySetArr[5].value !=null){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[5].label,
								value:labelKeySetArr[5].value});
					}
					
					if(labelKeySetArr[6].value !="" && labelKeySetArr[6].value !=null){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[6].label,
								value:labelKeySetArr[6].value});
					}
					
					break;
					
				case "EVN":		
					if(labelKeySetArr[0].value !="" && labelKeySetArr[0].value !=null){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[0].label,
								value:labelKeySetArr[0].value});
					}
					if(labelKeySetArr[1].value !="" && labelKeySetArr[1].value !=null){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[1].label,
								value:labelKeySetArr[1].value});
					}
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[2].label,
								value:(labelKeySetArr[2].value == 'Y')?rootScope.appLiterals.APP.RAK_SERVICES.RAKOPREVANACCOPEN.DEBIT_ACC_YES:rootScope.appLiterals.APP.RAK_SERVICES.RAKOPREVANACCOPEN.DEBIT_ACC_NO});
					
					if(labelKeySetArr[3].value !="" && labelKeySetArr[3].value !=null){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[3].label,
								value:labelKeySetArr[3].value});
					}
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[4].label,	value:labelKeySetArr[4].value.split(" ")[0]});
					
					if(labelKeySetArr[5].value !="" && labelKeySetArr[5].value !=null){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[5].label,
								value:labelKeySetArr[5].value});
					}
					
					if(labelKeySetArr[6].value !="" && labelKeySetArr[6].value !=null){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[6].label,
								value:labelKeySetArr[6].value});
					}
					
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[7].label,
								value:(labelKeySetArr[7].value == 'Y')?rootScope.appLiterals.APP.RAK_SERVICES.RAKOPREVANACCOPEN.INTEREST_YES:rootScope.appLiterals.APP.RAK_SERVICES.RAKOPREVANACCOPEN.INTEREST_NO});
					
					break;
					
						//Apply for prepaid card start
				case "PPC":
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[0].label,value:labelKeySetArr[0].value});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[1].label,value:labelKeySetArr[1].value+labelKeySetArr[2].value+labelKeySetArr[3].value});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[4].label,value:labelKeySetArr[4].value});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[5].label,value:labelKeySetArr[5].value});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[6].label,value:labelKeySetArr[6].value});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[7].label,value:labelKeySetArr[7].value});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[8].label,value:labelKeySetArr[8].value});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[9].label,value:labelKeySetArr[9].value});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[10].label,value:labelKeySetArr[10].value});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[11].label,value:labelKeySetArr[11].value});
					break;	
		//Apply for prepaid card end
		
					   //EASY PAYMENT PLAN START
				case "CAE":
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[0].label,value:labelKeySetArr[0].value});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[1].label,value:labelKeySetArr[1].value});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[2].label,value:labelKeySetArr[2].value});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[3].label,value:labelKeySetArr[3].value});
					
					if(labelKeySetArr[4].value =="A" )
					{
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[4].label,value:rootScope.appLiterals.APP.RAK_SERVICES.RAK_CONVERT_EMI.AMEX});
					
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[8].label,value:labelKeySetArr[8].value});
					}
					
					else if(labelKeySetArr[4].value =="V" )
					{
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[4].label,value:rootScope.appLiterals.APP.RAK_SERVICES.RAK_CONVERT_EMI.VISA_CARD});
					
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[8].label,value:labelKeySetArr[8].value});
					}
					
					else if(labelKeySetArr[4].value =="O" )
					{
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[4].label,value:rootScope.appLiterals.APP.RAK_SERVICES.RAK_CONVERT_EMI.OTHERS});
					
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[5].label,value:labelKeySetArr[5].value});
					}
					
					else if(labelKeySetArr[4].value =="M" )
					{
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[4].label,value:rootScope.appLiterals.APP.RAK_SERVICES.RAK_CONVERT_EMI.MASETR_CARD});
					
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[8].label,value:labelKeySetArr[8].value});
					}
					
					if(labelKeySetArr[6].value =="OTF" )
					{
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[6].label,value:rootScope.appLiterals.APP.RAK_SERVICES.RAK_CONVERT_EMI.ONE_TIME_FEE});
					}
					
					else if(labelKeySetArr[6].value =="INT" )
					{
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[6].label,value:rootScope.appLiterals.APP.RAK_SERVICES.RAK_CONVERT_EMI.INTEREST});
					}
					
					if(labelKeySetArr[7].value =="W" ){
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[7].label,value:rootScope.appLiterals.APP.RAK_SERVICES.RAK_CONVERT_EMI.WEEKLY});
					}
					
					else if(labelKeySetArr[7].value =="H" ){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[7].label,value:rootScope.appLiterals.APP.RAK_SERVICES.RAK_CONVERT_EMI.HALF_YEARLY});
						}
					else if(labelKeySetArr[7].value =="Q" ){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[7].label,value:rootScope.appLiterals.APP.RAK_SERVICES.RAK_CONVERT_EMI.QUATERLY});
						}
					else if(labelKeySetArr[7].value =="M" ){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[7].label,value:rootScope.appLiterals.APP.RAK_SERVICES.RAK_CONVERT_EMI.MONTHLY});
						}
					
				break;	
			//EASY PAYMENT PLAN END
				
			//Renewal Term Deposit Islamic Start
				case "TSR":
                    self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
                                {label:labelKeySetArr[0].label,      value:labelKeySetArr[0].value});
                    
                    self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
                                {label:labelKeySetArr[1].label,      value:labelKeySetArr[1].value});
                    if(labelKeySetArr[3].value == 'FPV'){
                          self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
                                      {label:labelKeySetArr[4].label,      value:labelKeySetArr[4].value});
                    }else if(labelKeySetArr[3].value == 'Date'){
                          
                          self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
                                      {label:labelKeySetArr[4].label,      value:labelKeySetArr[5].label+" "+labelKeySetArr[5].value+" "+labelKeySetArr[6].label+" "+labelKeySetArr[6].value});
                    }
                    self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
                                {label:labelKeySetArr[7].label,      value:labelKeySetArr[7].value});
                    if(labelKeySetArr[8].value =='PA'){
                          self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
                                      {label:labelKeySetArr[8].label,      value:rootScope.appLiterals.APP.RAK_SERVICES.RAKTERMDEPOSIT.CREDIT_PROCEED_TO_MY_ACCOUNT});
                          self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
                                      {label:labelKeySetArr[9].label,      value:labelKeySetArr[9].value});
                    }else if(labelKeySetArr[8].value =='Auto'){
                          self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
                                      {label:labelKeySetArr[8].label,      value:rootScope.appLiterals.APP.RAK_SERVICES.RAKTERMDEPOSIT.AUTO_ROLLOVER});
                          self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
                                      {label:labelKeySetArr[10].label,      value:labelKeySetArr[10].value});
                    }
                    break;
                  //Renewal Term Deposit Islamic End
                    
               //Credit Card Renewal Request Start     
				case "CCR":
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[0].label,value:labelKeySetArr[0].value});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[1].label,value:labelKeySetArr[1].value});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[2].label,value:labelKeySetArr[2].value});
					if(labelKeySetArr[2].value == 'Others')
				    {
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[3].label,value:labelKeySetArr[3].value});
					}
					
					if(labelKeySetArr[4].value == 'C')
					{	
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[4].label,value:self.common.deliveryChannel});	
					}
					
					if(labelKeySetArr[4].value == 'B')
					{
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[5].label,value:labelKeySetArr[5].value});
					
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[6].label,value:rootScope.appLiterals.APP.RAK_SERVICES.RAKECR.TXT_BRANCH+"-"+labelKeySetArr[6].value});
					}
				
					break;	
				//Credit Card Renewal Request End     
					//buisenee elite Subscribe
					case "SBE":
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[0].label,	value:rootScope.appLiterals.APP.RAK_SERVICES.RAK_SERV_LANDPG.SME_BUSINESS_ELITE_SUB});
								break;
					//buisness elite unSubscribe
					case "UBE":
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[0].label,	value:rootScope.appLiterals.APP.RAK_SERVICES.RAK_SERV_LANDPG.SME_BUSINESS_ELITE_UNSUB});
								break;
					//Replace Credit Card Start
				case "DCR":
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[0].label,
								value:labelKeySetArr[0].value});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[1].label,
								value:labelKeySetArr[1].value});
					var dispatchMode = labelKeySetArr[1].value;
					
					if(dispatchMode == rootScope.appLiterals.APP.RAK_SERVICES.RAK_CREDIT_REPLACEMENT.BRANCH){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[9].label,
									value:labelKeySetArr[9].value});
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[10].label,
									value:labelKeySetArr[10].value});
					}
					if(dispatchMode == rootScope.appLiterals.APP.RAK_SERVICES.RAK_CREDIT_REPLACEMENT.COURIER){	
						var delAdd = labelKeySetArr[2].value;
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[2].label,
									value:labelKeySetArr[2].value});
						if(delAdd == rootScope.appLiterals.APP.RAK_SERVICES.RAK_CREDIT_REPLACEMENT.REGADD){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[3].label,
									value:labelKeySetArr[3].value});
						}
						else if(delAdd == rootScope.appLiterals.APP.RAK_SERVICES.RAK_CREDIT_REPLACEMENT.OTHERADD){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[4].label,
									value:labelKeySetArr[4].value});
						}
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[5].label,
									value:labelKeySetArr[5].value});
						var authRec = labelKeySetArr[5].value;
						if(authRec == rootScope.appLiterals.APP.RAK_SERVICES.RAK_CREDIT_REPLACEMENT.AUTHPERSON){
							self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
									{label:labelKeySetArr[6].label,
										value:labelKeySetArr[6].value});
							self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
									{label:labelKeySetArr[8].label,
										value:labelKeySetArr[8].value});
						}
						
						else if(authRec == rootScope.appLiterals.APP.RAK_SERVICES.RAK_CREDIT_REPLACEMENT.SELF){						
						
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[7].label,
									value:labelKeySetArr[7].value});
						}
					}
					break;
						
					case "GRR":
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[0].label,value:labelKeySetArr[0].value+"-"+rootScope.appLiterals.APP.RAKGLDACCOPEN.GRM});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[1].label,value:labelKeySetArr[1].value});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[2].label,value:labelKeySetArr[2].value});
					if(labelKeySetArr[3].value && labelKeySetArr[3].value==1){
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[3].label,value:labelKeySetArr[3].value.split(".")[0]+" "+rootScope.appLiterals.APP.RAKINVESTMENTSR.REDEEMGOLD_GRAM});
					}
					else{
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[3].label,value:labelKeySetArr[3].value.split(".")[0]+" "+rootScope.appLiterals.APP.RAKINVESTMENTSR.REDEEMGOLD_GRAMS});
					}
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[4].label,value:labelKeySetArr[4].value});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[5].label,value:labelKeySetArr[5].value});
					self.serviceRequestStatusModel.qty1 = labelKeySetArr[6].value.split(".")[0] ;
					self.serviceRequestStatusModel.total1 = labelKeySetArr[7].value.split(".")[0];
					self.serviceRequestStatusModel.qty5 = labelKeySetArr[8].value.split(".")[0] ;
					self.serviceRequestStatusModel.total5 = labelKeySetArr[9].value.split(".")[0] ;
					self.serviceRequestStatusModel.qty10 = labelKeySetArr[10].value.split(".")[0] ;
					self.serviceRequestStatusModel.total10 = labelKeySetArr[11].value.split(".")[0] ;
					self.serviceRequestStatusModel.qty20 = labelKeySetArr[12].value.split(".")[0] ;
					self.serviceRequestStatusModel.total20 = labelKeySetArr[13].value.split(".")[0] ;
					self.serviceRequestStatusModel.qty50 = labelKeySetArr[14].value.split(".")[0] ;
					self.serviceRequestStatusModel.total50 =labelKeySetArr[15].value.split(".")[0] ;
					self.serviceRequestStatusModel.qty100 = labelKeySetArr[16].value.split(".")[0] ;
					self.serviceRequestStatusModel.total100 = labelKeySetArr[17].value.split(".")[0] ;
					break;	
					case "WSR":
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[0].label,value:labelKeySetArr[0].value});	
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[1].label,value:labelKeySetArr[1].value});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[2].label,value:labelKeySetArr[2].value});
					break;
					//RAK OECD Changes
				case "UOE":
					/*self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[0].label,value:labelKeySetArr[0].value});*/	
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[1].label,value:labelKeySetArr[1].value});
					/*self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[26].label,value:labelKeySetArr[26].value});	
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[27].label,value:labelKeySetArr[27].value});*/
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[28].label,value:labelKeySetArr[28].value});	
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[29].label,value:labelKeySetArr[29].value});
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[30].label,value:labelKeySetArr[30].value});	
					
					
					self.serviceRequestStatusModel.cntTaxRes = labelKeySetArr[2].value ;
					self.serviceRequestStatusModel.cntTaxRes1 = labelKeySetArr[3].value ;
					self.serviceRequestStatusModel.cntTaxRes2 = labelKeySetArr[4].value ;
					self.serviceRequestStatusModel.cntTaxRes3 = labelKeySetArr[5].value ;
					self.serviceRequestStatusModel.cntTaxRes4 = labelKeySetArr[6].value ;
					self.serviceRequestStatusModel.cntTaxRes5 = labelKeySetArr[7].value ;
					
					self.serviceRequestStatusModel.tinNumberAvail = labelKeySetArr[8].value ;
					self.serviceRequestStatusModel.tinNumberAvail1 = labelKeySetArr[9].value ;
					self.serviceRequestStatusModel.tinNumberAvail2 = labelKeySetArr[10].value ;
					self.serviceRequestStatusModel.tinNumberAvail3 = labelKeySetArr[11].value ;
					self.serviceRequestStatusModel.tinNumberAvail4 = labelKeySetArr[12].value ;
					self.serviceRequestStatusModel.tinNumberAvail5 = labelKeySetArr[13].value ;
					
					self.serviceRequestStatusModel.tinNumber = labelKeySetArr[14].value ;
					self.serviceRequestStatusModel.tinNumber1 = labelKeySetArr[15].value ;
					self.serviceRequestStatusModel.tinNumber2 = labelKeySetArr[16].value ;
					self.serviceRequestStatusModel.tinNumber3 = labelKeySetArr[17].value ;
					self.serviceRequestStatusModel.tinNumber4 = labelKeySetArr[18].value ;
					self.serviceRequestStatusModel.tinNumber5 = labelKeySetArr[19].value ;
					
					self.serviceRequestStatusModel.noTinReason = labelKeySetArr[20].value ;
					self.serviceRequestStatusModel.noTinReason1 = labelKeySetArr[21].value ;
					self.serviceRequestStatusModel.noTinReason2 = labelKeySetArr[22].value ;
					self.serviceRequestStatusModel.noTinReason3 = labelKeySetArr[23].value ;
					self.serviceRequestStatusModel.noTinReason4 = labelKeySetArr[24].value ;
					self.serviceRequestStatusModel.noTinReason5 = labelKeySetArr[25].value ;
					break;
				case "ACD":
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[0].label,value:labelKeySetArr[0].value});	
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[1].label,value:labelKeySetArr[1].value});
					if(labelKeySetArr[2].value!=""){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[2].label,value:labelKeySetArr[2].value});
					}
					break;
				case "DAC":
					if(labelKeySetArr[0].value!=""){
						if(labelKeySetArr[0].value=="B"){
							labelKeySetArr[0].value=rootScope.appLiterals.APP.RAK_SERVICES.RAKDACBLOCK.DAC_BLOCK_CONFIRM;
						}
						if(labelKeySetArr[0].value=="A"){
							labelKeySetArr[0].value=rootScope.appLiterals.APP.RAK_SERVICES.RAKDACBLOCK.DAC_APPLY_CONFIRM;					
												}
						if(labelKeySetArr[0].value=="P"){
							labelKeySetArr[0].value=rootScope.appLiterals.APP.RAK_SERVICES.RAKDACBLOCK.DAC_PIN_CONFIRM;
						}
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[0].label,value:labelKeySetArr[0].value});
					}
					if(labelKeySetArr[1].value!=""){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[1].label,value:labelKeySetArr[1].value});
					}
					if(labelKeySetArr[2].value!=""){
						var cifNameSplit = labelKeySetArr[2].value.split("-");
						var name = cifNameSplit[0];
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[3].label,value:name});
						var cif = cifNameSplit[1];
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[2].label,value:cif});
					}
					if(labelKeySetArr[3].value!=""){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[3].label,value:labelKeySetArr[3].value});
					}
					if(labelKeySetArr[4].value!=""){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[4].label,value:labelKeySetArr[4].value});
					}
					if(labelKeySetArr[5].value!=""){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[5].label,value:labelKeySetArr[5].value});
					}
					if(labelKeySetArr[6].value!=""){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[6].label,value:labelKeySetArr[6].value});
					}
					if(labelKeySetArr[7].value!=""){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[7].label,value:labelKeySetArr[7].value});
					}
					if(labelKeySetArr[8].value!=""){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[8].label,value:labelKeySetArr[8].value});
					}
					if(labelKeySetArr[9].value!=""){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[9].label,value:labelKeySetArr[9].value});
					}
					if(labelKeySetArr[10].value!=""){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[10].label,value:labelKeySetArr[10].value});
					}
					if(labelKeySetArr[11].value!=""){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[11].label,value:labelKeySetArr[11].value});
					}
					if(labelKeySetArr[12].value!=""){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[12].label,value:labelKeySetArr[12].value});
					}
					if(labelKeySetArr[13].value!=""){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[13].label,value:labelKeySetArr[13].value});
					}
					/* if(labelKeySetArr[14].value!=""){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[14].label,value:labelKeySetArr[14].value});
					} */
					if(labelKeySetArr[15].value!=""){
						labelKeySetArr[15].value=labelKeySetArr[14].value+labelKeySetArr[15].value;
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[15].label,value:labelKeySetArr[15].value});
					}
					if(labelKeySetArr[16].value!=""){
						if(labelKeySetArr[16].value=="F"){
							labelKeySetArr[16].value=rootScope.appLiterals.APP.RAK_SERVICES.RAKDACBLOCK.DAC_GENDER_FEMALE;
						}
						else{
							labelKeySetArr[16].value=rootScope.appLiterals.APP.RAK_SERVICES.RAKDACBLOCK.DAC_GENDER_MALE;
						}
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[16].label,value:labelKeySetArr[16].value});
					}
					if(labelKeySetArr[17].value!=""){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[17].label,value:labelKeySetArr[17].value});
					}
					if(labelKeySetArr[18].value!=""){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[18].label,value:labelKeySetArr[18].value});
					}
					if(labelKeySetArr[19].value!="" && labelKeySetArr[0].value=="A" && labelKeySetArr[23].value=="N"){
						if(labelKeySetArr[19].value=="Y"){
							labelKeySetArr[19].value=rootScope.appLiterals.APP.RAK_SERVICES.RAKDACBLOCK.DAC_UAE_RESIDENT_YES;
						}
						else{
							labelKeySetArr[19].value=rootScope.appLiterals.APP.RAK_SERVICES.RAKDACBLOCK.DAC_UAE_RESIDENT_NO;
						}
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[19].label,value:labelKeySetArr[19].value});
					}
					if(labelKeySetArr[20].value!=""){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[20].label,value:labelKeySetArr[20].value});
					}
					if(labelKeySetArr[21].value!=""){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[21].label,value:labelKeySetArr[21].value});
					}
					if(labelKeySetArr[22].value!=""){
						self.serviceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[22].label,value:labelKeySetArr[22].value});
					}
					break;
				default:
					self.serviceRequestStatusModel.detailModel.labelKeySetArrModified = labelKeySetArr;
					break;
				}
				return self.serviceRequestStatusModel.detailModel.labelKeySetArrModified;
			},
			createUPDFinalStatsDetailsArray:function(labelKeySetArr){
				var updatedUPDStatDetArr = [];
				var userType = labelKeySetArr[0].value;
				updatedUPDStatDetArr.push({label:labelKeySetArr[1].label, value:labelKeySetArr[1].value});
				
				if(userType != '2'){
					updatedUPDStatDetArr.push(
					{label:labelKeySetArr[2].label,
					value:(labelKeySetArr[2].value == 'Residence')?rootScope.appLiterals.APP.RAK_SERVICES.RAK_UPDATEPP.TXT_RESD:rootScope.appLiterals.APP.RAK_SERVICES.RAK_UPDATEPP.TXT_OFF});
					updatedUPDStatDetArr.push({label:"SrStatusSubHeader", value:rootScope.appLiterals.APP.RAK_SERVICES.RAK_UPDATEPP.TXT_RESADD});
					for(var i=3; i<=9; i++){					
					updatedUPDStatDetArr.push({label:labelKeySetArr[i].label, value:labelKeySetArr[i].value});
					}
					updatedUPDStatDetArr.push({label:"SrStatusSubHeader", value:rootScope.appLiterals.APP.RAK_SERVICES.RAK_UPDATEPP.TXT_HEAD_OFFADD});
					for(var i=10; i<=15; i++){					
					updatedUPDStatDetArr.push({label:labelKeySetArr[i].label, value:labelKeySetArr[i].value});
					}
				}
					updatedUPDStatDetArr.push({label:"SrStatusSubHeader", value:rootScope.appLiterals.APP.RAK_SERVICES.RAK_UPDATEPP.TXT_OFFADD});
					for(var i=16; i<=21; i++){					
					updatedUPDStatDetArr.push({label:labelKeySetArr[i].label, value:labelKeySetArr[i].value});
					}
					updatedUPDStatDetArr.push({label:"SrStatusSubHeader", value:rootScope.appLiterals.APP.RAK_SERVICES.RAK_UPDATEPP.TXT_CONTACTDEAT});
				if(userType != '2'){
					for(var i=22; i<=25; i++){					
					updatedUPDStatDetArr.push({label:labelKeySetArr[i].label, value:labelKeySetArr[i].value});
					}
				}
					for(var i=26; i<=29; i++){					
					updatedUPDStatDetArr.push({label:labelKeySetArr[i].label, value:labelKeySetArr[i].value});
					}
				if(userType != '2'){
					for(var i=30; i<=31; i++){					
					updatedUPDStatDetArr.push({label:labelKeySetArr[i].label, value:labelKeySetArr[i].value});
					}
				}
					for(var i=32; i<=35; i++){					
					updatedUPDStatDetArr.push({label:labelKeySetArr[i].label, value:labelKeySetArr[i].value});
					}
				if(userType != '2'){
					updatedUPDStatDetArr.push({label:labelKeySetArr[36].label, value:labelKeySetArr[36].value});
					updatedUPDStatDetArr.push({label:labelKeySetArr[37].label, value:labelKeySetArr[37].value});
				}
				
				return updatedUPDStatDetArr;
			}
			//RAK: Added for fething  details of selected reference Id/ SR : END
	};

	/* RAK:5: - Status Of Service Request : END */


	/* RAK:5: - Closure of Term Deposit : START */

	self.RakClosureTermDepositModel = {
		selectedAccountNumber : "",
		accountList : [],
		creditAccountList : [],
		accountNumber : "",
		depositAccount : "",
		transactionPassword : "",
		responseText : "",
		confirmResponse : [],
		auth : "",
		authStatus : true,
		isDetailsFetched : "",
		ReferenceNumber : "",
		FDAccNumber : "",
		intRate : "",
		intTillDate : "",
		FDstartDate : "",
		FDmaturityDate : "",
		FDmaturityAmount : "",
		onlineMode : "",
		debaccount : "",
		actionDate : "",
		isBack : "",
		FDDepositAmount : '',
		currency : '',
		upliftmentInstructions : '',
		selectedCreditAccount : '',
		remarks : '',
		formattedActionDate : new Date(),
		previewActionDate : '',
		closureType : "",
		previewFDNumber : "",
		previewCreditAcc : "",
		eventToBeExecusted : "",
		hifRequestID : "",
		dateFlag:false,   //CHANGES FOR DATE VALIDATION
		actionDate_day:"", //CHANGES SENDING SPLITTING DATE INTO DAY
		actionDate_month:"", //CHANGES SENDING SPLITTING DATE INTO MONTH
		actionDate_year:"",  //CHANGES SENDING SPLITTING DATE INTO YEAR
		ReqId:"",
		HIFRequestID:"",
		eventId:"",

		resetRakClosureTermDepositModel : function() {

			self.RakClosureTermDepositModel.selectedCreditAccount = "";

			self.RakClosureTermDepositModel.transactionPassword = "";
			self.RakClosureTermDepositModel.responseText = "";
			self.RakClosureTermDepositModel.confirmResponse = [];

			self.RakClosureTermDepositModel.authStatus = true;

			self.RakClosureTermDepositModel.accountNumber = "";
			self.RakClosureTermDepositModel.currency = "";

			self.RakClosureTermDepositModel.ReferenceNumber = "";
			self.RakClosureTermDepositModel.FDAccNumber = "";
			self.RakClosureTermDepositModel.intRate = "";
			self.RakClosureTermDepositModel.intTillDate = "";
			self.RakClosureTermDepositModel.FDstartDate = "";
			self.RakClosureTermDepositModel.FDmaturityDate = "";
			self.RakClosureTermDepositModel.FDmaturityAmount = "";
			self.RakClosureTermDepositModel.transactionPassword = "";
			self.RakClosureTermDepositModel.remarks = "";
			self.RakClosureTermDepositModel.formattedActionDate = "";
			self.RakClosureTermDepositModel.auth = "";
			self.RakClosureTermDepositModel.actionDate = new Date();
			self.RakClosureTermDepositModel.previewFDNumber = "";
			self.RakClosureTermDepositModel.previewCreditAcc = "";

			self.RakClosureTermDepositModel.eventToBeExecusted = "";
			self.RakClosureTermDepositModel.hifRequestID = "";

			self.RakClosureTermDepositModel.isBack = false;
			self.RakClosureTermDepositModel.dateFlag = false;  //CHANGES FOR DATE VALIDATION
			self.RakClosureTermDepositModel.actionDate_day =""; //CHANGES SENDING SPLITTING DATE INTO DAY
	  		self.RakClosureTermDepositModel.actionDate_month=""; //CHANGES SENDING SPLITTING DATE INTO MONTH
	  		self.RakClosureTermDepositModel.actionDate_year=""; //CHANGES SENDING SPLITTING DATE INTO YEAR

	  		self.RakClosureTermDepositModel.ReqId = "";
	  		self.RakClosureTermDepositModel.HIFRequestID = "";
	  		self.RakClosureTermDepositModel.eventId = "";
	  		self.common.message = "";
			self.RakClosureTermDepositModel.upliftmentInstructions='';
		}
	};


	self.RakClosureHideOtherfields = function() {
		self.RakClosureTermDepositModel.isDetailsFetched = "N";
		self.RakClosureTermDepositModel.isBack = false;
	};

	//CHANGES SPLITTING DATE INTO DAY,MONTH AND YEAR  AND SENDING TO SERVER START
	   self.setRakClosureDepositDate = function() {
  	    self.common.displayDate = self.RakClosureTermDepositModel.actionDate;
	  		self.populateCurrentDateDetails(self.RakClosureTermDepositModel.actionDate);
	  		self.RakClosureTermDepositModel.actionDate_day =self.common.date;
	  		self.RakClosureTermDepositModel.actionDate_month=self.common.month;
	  		self.RakClosureTermDepositModel.actionDate_year=self.common.year;
	   };
	 //CHANGES SPLITTING DATE INTO DAY,MONTH AND YEAR  AND SENDING TO SERVER END

	self.initRakClosureTermDeposit = function(responseList) {

		if (!responseList[0].hasOwnProperty('errorMessage')
				&& !self.RakClosureTermDepositModel.isBack) {

			self.RakClosureTermDepositModel.isBack = false;
			if (responseList[0].hasOwnProperty('depositAccountsList')) {
				self.RakClosureTermDepositModel.depositAccountsList = responseList[0].depositAccountsList;
			}
			self.RakClosureTermDepositModel.isDetailsFetched = responseList[0].isDetailFetched;

			if (self.RakClosureTermDepositModel.isDetailsFetched == "Y") {

				if (responseList[0].hasOwnProperty('depRefNumber')) {
					self.RakClosureTermDepositModel.ReferenceNumber =responseList[0].depRefNumber;
				}
				if (responseList[0].hasOwnProperty('FDAccountNumber')) {
					self.RakClosureTermDepositModel.FDAccNumber = responseList[0].FDAccountNumber;
				}

				if (responseList[0].hasOwnProperty('interestRate')) {
					if(responseList[0].interestRate == '')
						self.RakClosureTermDepositModel.intRate = 0.00;
					else
						self.RakClosureTermDepositModel.intRate = responseList[0].interestRate;
				}

				if (responseList[0].hasOwnProperty('interestTillDate')) {
					self.RakClosureTermDepositModel.intTillDate = responseList[0].interestTillDate;
				}

				if (responseList[0].hasOwnProperty('startDate')) {
					self.RakClosureTermDepositModel.FDstartDate = responseList[0].startDate;
				}

				if (responseList[0].hasOwnProperty('maturityDate')) {
					self.RakClosureTermDepositModel.FDmaturityDate = responseList[0].maturityDate;
				}
				if (responseList[0].hasOwnProperty('REQUESTID')) {
					self.RakClosureTermDepositModel.ReqId = responseList[0].REQUESTID;

					if(self.RakClosureTermDepositModel.ReqId == 'TDC'){
						self.RakClosureTermDepositModel.HIFRequestID = 'RAK_CLOSURE_TD_PREVIEW_CONFIRM';
						self.RakClosureTermDepositModel.eventId = 'ContinueRq';
					}
					else if(self.RakClosureTermDepositModel.ReqId == 'TSC'){
						self.RakClosureTermDepositModel.HIFRequestID = 'RAK_ISLAMIC_CLOSURE_TD_PREVIEW_CONFIRM';
						self.RakClosureTermDepositModel.eventId = 'ContinueIslamicRq';
					}
				}
				self.RakClosureTermDepositModel.currency = responseList[0].currencyCode;
				self.RakClosureTermDepositModel.FDmaturityAmount = responseList[0].maturityAmount;
				self.RakClosureTermDepositModel.FDDepositAmount = responseList[0].depositAmount;
				if (responseList[0].hasOwnProperty('creditAccountsList')) {
					self.RakClosureTermDepositModel.creditAccList = responseList[0].creditAccountsList;
				}

			}
		}

	};

	self.rakClosureTDContinueClick = function() {

		self.RakClosureTermDepositModel.previewActionDate = self
				.setFormatedDate(self.RakClosureTermDepositModel.actionDate);
		self.RakClosureTermDepositModel.formattedActionDate = self
				.setServerFormatedDate(self.RakClosureTermDepositModel.actionDate);

		//CHANGES FOR DATE VALIDATION START
		if(self.RakClosureTermDepositModel.actionDate!='')
			{
			self.RakClosureTermDepositModel.dateFlag = true;
			}
		//CHANGES FOR DATE VALIDATION END
	};

	self.initClosureTDConfirm = function(responseList) {
		if (!responseList[0].hasOwnProperty('errorMessage')) {
			self.RakClosureTermDepositModel.confirmResponse = responseList[0];
			self.RakClosureTermDepositModel.previewFDNumber = responseList[0].FDNumber;
			self.RakClosureTermDepositModel.previewCreditAcc = responseList[0].CreditAccountNum;
			self.RakClosureTermDepositModel.auth = responseList[0].auth;
			self.RakClosureTermDepositModel.transactionPassword = "";
			self.RakClosureTermDepositModel.previewActionDate=responseList[0].ActionDate;
			if(self.RakClosureTermDepositModel.actionDate!='')
			{
			self.RakClosureTermDepositModel.dateFlag = true;
			}
			self.common.message=responseList[0].MESSAGE ? responseList[0].MESSAGE :'';
			if (self.RakClosureTermDepositModel.closureType == "TDC") {
				self.RakClosureTermDepositModel.eventToBeExecusted = "CTDSubmitOnlineRq";
				self.RakClosureTermDepositModel.hifRequestID = "RAK_CTD_SUBMIT_ONLINE";

			} else if (self.RakClosureTermDepositModel.closureType == "TSC") {
				self.RakClosureTermDepositModel.eventToBeExecusted = "ICTSubmitOnlineRq";
				self.RakClosureTermDepositModel.hifRequestID = "RAK_ICT_SUBMIT_ONLINE";

			}
		}

		self.RakClosureTermDepositModel.transactionPassword = "";
	};

	self.initClosureTDSuccess = function(responseList) {

		if (responseList[0].successMessage) {
			self.RakClosureTermDepositModel.responseText = responseList[0].successMessage;
		}

	}

	/* RAK:5: - Closure of Term Deposit : END */


	/*  Changed for block debit card and Block Credit Card : Start */
	//CHANGES SENDING SENDING DATE IN DAY,MONTH AND YEAR FORMAT START
	self.blockCreditCardModel = {
		blockCreditCardNumber : "",
		remarks : "",
		responseText : [],
		transactionPassword : "",
		creditCardList : [],
		CardType : "",
		selectedReason : "",
		place : "",
		selectDate : new Date(),
		initDate : new Date(),
		displayDate : new Date(),
		// For Confirm Screen
		previewResponse : [],
		auth : "",
		lostDate : new Date(),
		lostDate_day:"",
		lostDate_month:"",
		lostDate_year:"",
		isBack : false,
		previewDateOne:"",

		resetBlockCreditCardModel : function() {
			self.blockCreditCardModel.blockCreditCardNumber = "";
			self.blockCreditCardModel.remarks = "";
			self.blockCreditCardModel.responseText = [];
			self.blockCreditCardModel.transactionPassword = "";
			self.blockCreditCardModel.creditCardList = [];
			self.blockCreditCardModel.selectedReason = "";
			self.blockCreditCardModel.place = "";
			self.blockCreditCardModel.selectDate = "";
			self.blockCreditCardModel.previewResponse = [];
			self.blockCreditCardModel.auth = "";
			self.blockCreditCardModel.lostDate = "";
			self.blockCreditCardModel.lostDate_day = "";
			self.blockCreditCardModel.lostDate_month = "";
			self.blockCreditCardModel.lostDate_year = "";
			self.blockCreditCardModel.isBack = false;
			self.blockCreditCardModel.previewDateOne = "";
			self.common.message="";
		},
		/*
		 * RAK :  : To add the card type for debit or credit card, based
		 * on card type, literals are changed : Start
		 */
		setDebCardType : function() {
			self.blockCreditCardModel.CardType = "Debit";

		},

		setCredCardType : function() {
			self.blockCreditCardModel.CardType = "Credit";

		},

		/*
		 * RAK :  : To add the card type for debit or credit card, based
		 * on card type, literals are changed : END
		 */

		initBlockCreditCard : function(responseList) {
			if (!responseList[0].hasOwnProperty('errorMessage')
					&& !self.blockCreditCardModel.isBack) {
				self.populateCurrentDateDetails();
				self.blockCreditCardModel.isBack = false;
				self.blockCreditCardModel.creditCardList = responseList[0].creditCardList;
				self.blockCreditCardModel.reasonList = responseList[0].reasonList;

			}
		}
	};
	//CHANGES SENDING LOST DATE IN SPILLINF FORMAT START
	self.convertDateFormat = function() {

		self.blockCreditCardModel.selectDate = self
				.setFormatedDate(self.blockCreditCardModel.lostDate);


	  		self.populateCurrentDateDetails();
	  		self.blockCreditCardModel.lostDate_day =self.common.date;
	  		self.blockCreditCardModel.lostDate_month=self.common.month;
	  		self.blockCreditCardModel.lostDate_year=self.common.year;
	};
	//CHANGES SENDING LOST DATE IN SPILLINF FORMAT END
	self.initBlockCreditCardConfirm = function(responsesList) {
		if (!responsesList[0].hasOwnProperty('errorMessage')) {

			self.common.message=responsesList[0].MESSAGE ? responsesList[0].MESSAGE :'';

			self.blockCreditCardModel.previewResponse = responsesList[0];
			self.blockCreditCardModel.auth = responsesList[0].auth;
			self.blockCreditCardModel.transactionPassword = "";

			if (responsesList[0].hasOwnProperty('previewDate')) {
				self.blockCreditCardModel.previewDateOne = responsesList[0].previewDate;
			}
			if (responsesList[0].hasOwnProperty('reasonSelected')) {
				self.blockCreditCardModel.previewReason = responsesList[0].reasonSelected;
			}


		}
		self.blockCreditCardModel.transactionPassword = "";
	};
	//CHANGES SENDING SENDING DATE IN DAY,MONTH AND YEAR FORMAT END
	/*  Changed for block debit card and Block Credit Card : END */

	/*  Temporary Release Letter: Start */
	self.temporaryReleaseLetter = {
		// initial Screen
		loanAgreementNumber : "",
		travelCountry : "",
		dateTravel : "",
		dateReturn : "",
		loanNumberList : [],
		countryList : [],
		debitChargeList : [],
		debitAccSelected : "",
		selectedBranch : "",
		noOfDays : "",
		contNumber : "",
		notes : "",
		isDaysCalulated : "",
		branchList : [],
		responseText : [],
		// For Confirm Screen
		previewResponse : [],

		auth : "",
		transactionPassword : "",
		isBack : "",
		backContNumber : "",
		backNoOfDays : "",
		backDateTravel : "",
		backDateReturn : "",
		debAccNumber: "",
		lnNumber : "",

		dateTravel_day:"",
		dateTravel_month:"",
		dateTravel_year:"",

		dateReturn_day:"",
		dateReturn_month:"",
		dateReturn_year:"",

		previewDateOne:"",
		previewDateTwo:"",
		emirateList:[],
        emiBranchList:[],
        emirateSeletected:"",
        emiCategorizedBranchList:[],
        isEmiSelected:false,
        emiSelDesc:"",



		resetTemporaryReleaseLetter : function() {
			self.temporaryReleaseLetter.loanAgreementNumber = "";
			self.temporaryReleaseLetter.travelCountry = "";
			self.temporaryReleaseLetter.responseText = [];
			self.temporaryReleaseLetter.transactionPassword = "";
			self.temporaryReleaseLetter.loanNumberList = [];
			self.temporaryReleaseLetter.countryList = [];
			self.temporaryReleaseLetter.debitChargeList = [];
			self.temporaryReleaseLetter.branchList = [];
			self.temporaryReleaseLetter.dateTravel = "";
			self.temporaryReleaseLetter.dateReturn = "";
			self.temporaryReleaseLetter.debitAccSelected = "";
			self.temporaryReleaseLetter.selectedBranch = "";
			self.temporaryReleaseLetter.noOfDays = "";
			self.temporaryReleaseLetter.contNumber = "";
			self.temporaryReleaseLetter.notes = "";
			self.temporaryReleaseLetter.previewResponse = [];
			self.temporaryReleaseLetter.auth = "";
			self.temporaryReleaseLetter.isDaysCalulated = "N";
			self.temporaryReleaseLetter.isBack = false;
			self.temporaryReleaseLetter.backContNumber = "";
			self.temporaryReleaseLetter.backNoOfDays = "";
			self.temporaryReleaseLetter.backDateTravel = "";
			self.temporaryReleaseLetter.backDateReturn = "";
			self.temporaryReleaseLetter.lnNumber = "";
			self.temporaryReleaseLetter.debAccNumber = "";

			self.temporaryReleaseLetter.previewDateOne = "";
			self.temporaryReleaseLetter.previewDateTwo = "";


			self.temporaryReleaseLetter.dateTravel_day = "";
			self.temporaryReleaseLetter.dateTravel_month = "";
			self.temporaryReleaseLetter.dateTravel_year = "";
			self.temporaryReleaseLetter.dateReturn_day = "";
			self.temporaryReleaseLetter.dateReturn_month = "";
			self.temporaryReleaseLetter.dateReturn_year = "";

			self.temporaryReleaseLetter.emirateList= "";
			self.temporaryReleaseLetter.emiBranchList= "";
			self.temporaryReleaseLetter.emirateSeletected= "";
			self.temporaryReleaseLetter.emiCategorizedBranchList= "";
			self.temporaryReleaseLetter.isEmiSelected=false;
			self.temporaryReleaseLetter.emiSelDesc= "";

			self.common.message="";



		},

		initTemporaryReleaseLetter : function(responseList) {
			if (!responseList[0].hasOwnProperty('errorMessage')
					&& !self.temporaryReleaseLetter.isBack) {
				self.temporaryReleaseLetter.isBack = false;
				if(responseList[0].hasOwnProperty('loanNumberList')){
					self.temporaryReleaseLetter.loanNumberList = responseList[0].loanNumberList;
				}
				if(responseList[0].hasOwnProperty('branchList')){
					self.temporaryReleaseLetter.branchList = responseList[0].branchList;
				}
				if(responseList[0].hasOwnProperty('country')){
					self.temporaryReleaseLetter.countryList = responseList[0].country;
				}
				if(responseList[0].hasOwnProperty('debitAccList')){
					self.temporaryReleaseLetter.debitChargeList = responseList[0].debitAccList;
				}
				//added by 
				/*if (responseList[0].hasOwnProperty('OprAcctBranchList'))
					self.temporaryReleaseLetter.OprAcctBranchList = responseList[0].branchList;*/

				if (responseList[0].hasOwnProperty('emirateList')) {
					self.temporaryReleaseLetter.emirateList = responseList[0].emirateList;
				}

				if (responseList[0].hasOwnProperty('emiBranchList')) {
					self.temporaryReleaseLetter.emiBranchList = responseList[0].emiBranchList;
				}
				//added by  - end

			}
			else if(responseList[0].hasOwnProperty('errorMessage') && !self.temporaryReleaseLetter.isBack){
				self.temporaryReleaseLetter.isDaysCalulated = "N";
			}
			else {
				self.temporaryReleaseLetter.contNumber = self.temporaryReleaseLetter.backContNumber;
				self.temporaryReleaseLetter.noOfDays = self.temporaryReleaseLetter.backNoOfDays;
			}
		}
	};

	//Added by  For Emirates based Branch Dropdown Change
    self.temporaryReleaseLetterOptionChange = function() {

	var branchListCount = 0;
	var emBranchDesc = [];
	self.temporaryReleaseLetter.emiCategorizedBranchList = [];
	self.temporaryReleaseLetter.isEmiSelected = true;
	for (var x = 0; x < self.temporaryReleaseLetter.emiBranchList.length; x++) {
		if (self.temporaryReleaseLetter.emiBranchList[x].code == self.temporaryReleaseLetter.emirateSeletected) {
			emBranchDesc = self.temporaryReleaseLetter.emiBranchList[x].codeDesc
					.split("|");
			break;
		}
	}

	for (var x = 0; x < emBranchDesc.length; x++) {
		for (var y = 0; y < self.temporaryReleaseLetter.branchList.length; y++) {
			if (emBranchDesc[x] == self.temporaryReleaseLetter.branchList[y].branchIndex) {
				self.temporaryReleaseLetter.emiCategorizedBranchList[branchListCount] = self.temporaryReleaseLetter.branchList[y];
				branchListCount++;
			}
		}
	}

};
// added by  end

	self.tempReleaseLetterHideFields = function() {
		self.temporaryReleaseLetter.isDaysCalulated = "N";
		self.temporaryReleaseLetter.noOfDays = "";
	};

	self.calculateNoOfDays = function() {
		if (self.temporaryReleaseLetter.dateTravel != ""
				&& self.temporaryReleaseLetter.dateReturn != "") {
			var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
			var firstDate = new Date(self.temporaryReleaseLetter.dateTravel);
			var secondDate = new Date(self.temporaryReleaseLetter.dateReturn);

			var diffDays = Math.round(Math
					.abs((firstDate.getTime() - secondDate.getTime())
							/ (oneDay)));

			if (diffDays == 0)
				self.temporaryReleaseLetter.noOfDays = "1";
			else
				self.temporaryReleaseLetter.noOfDays = diffDays;

			self.temporaryReleaseLetter.isDaysCalulated = "Y";
		}


		self.common.displayDate = self.temporaryReleaseLetter.dateTravel;
		self.populateCurrentDateDetails(self.temporaryReleaseLetter.dateTravel);

		self.temporaryReleaseLetter.dateTravel_day =self.common.date;
		self.temporaryReleaseLetter.dateTravel_month=self.common.month;
		self.temporaryReleaseLetter.dateTravel_year=self.common.year;

		self.common.displayDate = self.temporaryReleaseLetter.dateReturn;
		self.populateCurrentDateDetails(self.temporaryReleaseLetter.dateReturn);

		self.temporaryReleaseLetter.dateReturn_day =self.common.date;
		self.temporaryReleaseLetter.dateReturn_month=self.common.month;
		self.temporaryReleaseLetter.dateReturn_year=self.common.year;

		self.temporaryReleaseLetter.dTravel = self
		.setFormatedDate(self.temporaryReleaseLetter.dateTravel);
self.temporaryReleaseLetter.dReturn = self
		.setFormatedDate(self.temporaryReleaseLetter.dateReturn);
	};

	self.releaseLetterContinue = function() {
		var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
		var firstDate = new Date(self.temporaryReleaseLetter.dateTravel);
		var secondDate = new Date(self.temporaryReleaseLetter.dateReturn);

		var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate
				.getTime())
				/ (oneDay)));
		if (diffDays == 0)
			self.temporaryReleaseLetter.noOfDays = "1";
		else
			self.temporaryReleaseLetter.noOfDays = diffDays;

		self.temporaryReleaseLetter.backContNumber = self.temporaryReleaseLetter.contNumber;
		self.temporaryReleaseLetter.backNoOfDays = self.temporaryReleaseLetter.noOfDays;
		self.temporaryReleaseLetter.backDateTravel = self.temporaryReleaseLetter.dateTravel;
		self.temporaryReleaseLetter.backDateReturn = self.temporaryReleaseLetter.dateReturn;
/*
		self.temporaryReleaseLetter.contNumber = self.temporaryReleaseLetter.contNumber
				+ '';*/
		self.temporaryReleaseLetter.noOfDays = self.temporaryReleaseLetter.noOfDays
				+ '';

		 self.common.displayDate = self.temporaryReleaseLetter.dateTravel;
		self.populateCurrentDateDetails(self.temporaryReleaseLetter.dateTravel);

		self.temporaryReleaseLetter.dateTravel_day =self.common.date;
		self.temporaryReleaseLetter.dateTravel_month=self.common.month;
		self.temporaryReleaseLetter.dateTravel_year=self.common.year;

		self.common.displayDate = self.temporaryReleaseLetter.dateReturn;
		self.populateCurrentDateDetails(self.temporaryReleaseLetter.dateReturn);

		self.temporaryReleaseLetter.dateReturn_day =self.common.date;
		self.temporaryReleaseLetter.dateReturn_month=self.common.month;
		self.temporaryReleaseLetter.dateReturn_year=self.common.year;

		self.temporaryReleaseLetter.dTravel = self
				.setFormatedDate(self.temporaryReleaseLetter.dateTravel);
		self.temporaryReleaseLetter.dReturn = self
				.setFormatedDate(self.temporaryReleaseLetter.dateReturn);

	};

	self.initTemporaryReleaseLetterConfirm = function(responsesList) {
		if (!responsesList[0].hasOwnProperty('errorMessage')) {

			self.common.message=responsesList[0].MESSAGE ? responsesList[0].MESSAGE :'';

			self.temporaryReleaseLetter.previewResponse = responsesList[0];
			self.temporaryReleaseLetter.auth = responsesList[0].auth;
			self.temporaryReleaseLetter.transactionPassword = "";
			self.temporaryReleaseLetter.lnNumber = responsesList[0].SelectedLoanNumber;
			self.temporaryReleaseLetter.debAccNumber = responsesList[0].SelectedDebitAccNumber;

			if (responsesList[0].hasOwnProperty('previewDate')) {
				self.temporaryReleaseLetter.previewDateOne = responsesList[0].previewDate;
			}
			if (responsesList[0].hasOwnProperty('previewDateTwo')) {
				self.temporaryReleaseLetter.previewDateTwo = responsesList[0].previewDateTwo;
			}

		}
		self.temporaryReleaseLetter.transactionPassword = "";
		//added by 
		for (var x=0; x<self.temporaryReleaseLetter.emirateList.length;x++)
		{
		if (self.temporaryReleaseLetter.emirateList[x].code==self.temporaryReleaseLetter.emirateSeletected)
		{
			self.temporaryReleaseLetter.emiSelDesc =self.temporaryReleaseLetter.emirateList[x].codeDesc;
		}
		}
	};
	/*  Temporary Release Letter: END */

	/*  Apply New Cheque Book Request : Start */

	self.checkBookRequest = {};

	self.chequeBookRequest = {

		isDeliveryAddSet : '',
		isDispatchModeSet : '',
		isAuthorizedPersonSet : '',
		otherAddress : '',
		//added by 
		emirateList:[],
        emiBranchList:[],
        emirateSeletected:"",
        emiCategorizedBranchList:[],
        isEmiSelected:false,
        mobilePrefixList:[],

	

		resetDispatchModeChange : function() {
			
			if (self.chequeBookRequest.isDispatchModeSet == "B") {
				
				self.checkBookRequest.model.AuthName='';
				self.checkBookRequest.model.AuthMobile='';
				self.checkBookRequest.model.mobilePrefix='';
				self.checkBookRequest.model.AuthEid='';
				
				self.checkBookRequest.model.AuthName='';
				self.checkBookRequest.model.AuthMobile='';
				//self.checkBookRequest.model.mobilePrefix='';
				self.checkBookRequest.model.AuthEid='';
				
				
				
				//Changes done as a part of Cheque book req Authorized person CR
				if(rootScope.rakHome.userTypeIDValue!='CORPORATE'){
					self.chequeBookRequest.isDeliveryAddSet = '';
				}
				self.chequeBookRequest.isDeliveryDetSet = '';
				self.chequeBookRequest.isAuthorizedPersonSet = '';
				self.checkBookRequest.model.selectedAddress1 = '';
				self.checkBookRequest.model.selectedAddress2 = '';
				self.checkBookRequest.model.selectedAddress3 = '';
				self.checkBookRequest.model.selectedCountry = '';
				self.checkBookRequest.model.Address = '';
			
				self.checkBookRequest.model.recipientName = '';
				
			}
			
			
			
		},
		resetDeliveryAddress : function() {

			if(self.chequeBookRequest.isDeliveryAddSet=='Registered Address'){
				self.checkBookRequest.model.selectedAddress1 = '';
				self.checkBookRequest.model.selectedAddress2 = '';
				self.checkBookRequest.model.selectedAddress3 = '';
				self.checkBookRequest.model.selectedCountry = '';
				self.checkBookRequest.model.Address = '';
				//self.chequeBookRequest.isDeliveryDetSet='Self';
				self.chequeBookRequest.isDeliveryDetSet='';
				
			}else{
				self.checkBookRequest.model.AuthName='';
				self.checkBookRequest.model.AuthMobile='';
				//self.checkBookRequest.model.mobilePrefix='';
				self.checkBookRequest.model.AuthEid='';
			}
		
			
		},
		
		resetDeliverTo : function() {
			
			if (self.chequeBookRequest.isDeliveryDetSet == "Self") {
				
				self.checkBookRequest.model.AuthName='';
				self.checkBookRequest.model.AuthMobile='';
				self.checkBookRequest.model.mobilePrefix='';
				self.checkBookRequest.model.AuthEid='';
				
			}
			else {
				
			}
			
			
			
		},
	};

	self.checkBookRequest.model = {
		selectedfromAccountNumber : '',
		selectedCheque : '',
		selectedCountry : '',
		selectedChargeAccount : '',
		selectedAddress1 : '',
		selectedAddress2 : '',
		selectedAddress3 : '',
		selectedAddresseeName : 'Testuser',
		authenticationPassword : '',
		chequeRequestResponse : '',
		AccountID : '',
		AddresseeName : '',
		Address1 : '',
		Address2 : '',
		Address3 : '',
		Address4 : '',
		Address : '',
		authMode : '',
		Branch : '',
		AuthName : '',
		requestChequeProceedResponse : [],
		recipientName : '',
		seletedBranch : '',
		seletedBranchDesc : '',
		contactNumber : '',
		registeredAddress : '',
		ContactNumber : '',
		previewContactNumber : '',
		isBack : '',
		boolDispatch : false,
		boolAddress : false,
		boolAuthPersion : false,
		selAccount : '',
		selfNumber : '',
		customerName:'',
		boolAuthName:false,
		boolAuthMobile:false,
		boolAuthEid:false,
		boolMobilePrefix:false,
		
		

	};

	self.checkBookRequest.resetModel = function() {
		self.checkBookRequest.model.selectedfromAccountNumber = '';
		self.checkBookRequest.model.selectedCheque = '';
		self.checkBookRequest.model.selectedCountry = '';
		self.checkBookRequest.model.selectedChargeAccount = '';
		self.checkBookRequest.model.selectedAddress1 = '';
		self.checkBookRequest.model.selectedAddress2 = '';
		self.checkBookRequest.model.selectedAddress3 = '';
		self.checkBookRequest.model.selectedAddresseeName = '';
		self.checkBookRequest.model.authenticationPassword = '';
		self.checkBookRequest.model.chequeRequestResponse = '';
		self.checkBookRequest.model.seletedBranchDesc = '';

		self.checkBookRequest.model.AccountID = '';
		self.checkBookRequest.model.AddresseeName = '';
		self.checkBookRequest.model.Address1 = '';
		self.checkBookRequest.model.Address2 = '';
		self.checkBookRequest.model.Address3 = '';
		self.checkBookRequest.model.Address4 = '';
		self.checkBookRequest.model.Address = '';
		self.checkBookRequest.model.authMode = '';
		self.checkBookRequest.model.registeredAddress = '';
		self.checkBookRequest.model.recipientName = '';
		self.checkBookRequest.model.seletedBranch = '';
		self.checkBookRequest.model.contactNumber = '';
		self.checkBookRequest.model.isBack = false;
		self.checkBookRequest.model.selAccount = '';

		self.chequeBookRequest.isDeliveryAddSet = '';
		self.chequeBookRequest.isDispatchModeSet = 'C';
		self.chequeBookRequest.isAuthorizedPersonSet = '';
		self.chequeBookRequest.otherAddress = '';
		self.checkBookRequest.model.selfNumber = '';
		self.checkBookRequest.model.customerName = '';
		//added by 
		self.checkBookRequest.emirateList=[];
		self.checkBookRequest.emiBranchList=[];
		self.checkBookRequest.emirateSeletected='';
		self.checkBookRequest.emiCategorizedBranchList=[];
		self.checkBookRequest.isEmiSelected=false;
		self.common.message = "";
		
		//RAK Cheque Book Request Authorized person changes start
		//self.chequeBookRequest.isDeliveryDetSet ='Self';
		self.chequeBookRequest.isDeliveryDetSet ='';
		self.checkBookRequest.model.AuthName='';
		self.checkBookRequest.model.AuthMobile='';
		self.checkBookRequest.model.mobilePrefix='';
		self.checkBookRequest.model.AuthEid='';
		self.checkBookRequest.mobilePrefixList=[];
		self.checkBookRequest.subSegFlag = 'N';
		if(rootScope.rakHome.userTypeIDValue=='CORPORATE')
		{
			self.chequeBookRequest.isDeliveryAddSet='Registered Address';
		}
		//RAK Cheque Book Request Authorized person changes end


	};

	self.rakChequeBookContinue = function() {
		
		/*if(rootScope.rakHome.userTypeIDValue=='CORPORATE')
		{
			self.chequeBookRequest.isDeliveryAddSet='Registered Address';
		}*/

		if (self.chequeBookRequest.isDispatchModeSet == "B") {
			self.checkBookRequest.model.boolDispatch = true;

			
			
			//Changes done as a part of Cheque book req Authorized person CR
			if(rootScope.rakHome.userTypeIDValue=='CORPORATE'){
				self.chequeBookRequest.isDeliveryAddSet = '';
			}
			self.chequeBookRequest.isAuthorizedPersonSet = '';
			self.checkBookRequest.model.boolAuthPersion = false;
			self.checkBookRequest.model.boolAddress = false;
			
			self.checkBookRequest.model.boolAuthName = false;
			self.checkBookRequest.model.boolAuthMobile = false;
			self.checkBookRequest.model.boolAuthEid = false;
			self.checkBookRequest.model.boolMobilePrefix = false;

			self.checkBookRequest.model.selectedAddress1 = '';
			self.checkBookRequest.model.selectedAddress2 = '';
			self.checkBookRequest.model.selectedAddress3 = '';
			self.checkBookRequest.model.selectedCountry = '';
			self.checkBookRequest.model.Address = '';
			self.checkBookRequest.model.registeredAddress = '';
			self.checkBookRequest.model.recipientName = '';
			//self.checkBookRequest.model.selfNumber = '';
			self.checkBookRequest.model.customerName ='';

			self.checkBookRequest.model.contactNumber = '';
		} else {
			self.checkBookRequest.model.boolDispatch = false;
			self.checkBookRequest.model.seletedBranch = '';

			if (self.chequeBookRequest.isDeliveryAddSet == "Other Address") {
				self.checkBookRequest.model.boolAddress = true;
				self.checkBookRequest.model.Address = self.checkBookRequest.model.selectedAddress1
						+ ", "
						+ self.checkBookRequest.model.selectedAddress2
						+ ", "
						+ self.checkBookRequest.model.selectedAddress3
						+ ", " + self.checkBookRequest.model.selectedCountry;
				
				
				self.checkBookRequest.model.boolAuthName = false;
				self.checkBookRequest.model.boolAuthMobile = false;
				self.checkBookRequest.model.boolAuthEid = false;
				self.checkBookRequest.model.boolMobilePrefix = false;
				self.chequeBookRequest.isDeliveryDetSet='';

			} else {
				//				self.checkBookRequest.model.boolAuthPersion = false;
				self.checkBookRequest.model.boolAddress = false;
				self.checkBookRequest.model.Address = '';
				//				self.checkBookRequest.model.contactNumber='';
				//				self.checkBookRequest.model.previewContactNumber ='';
				self.checkBookRequest.model.selectedAddress1 = '';
				self.checkBookRequest.model.selectedAddress2 = '';
				self.checkBookRequest.model.selectedAddress3 = '';
				self.checkBookRequest.model.selectedCountry = '';
				self.checkBookRequest.model.Address = '';

				//				self.checkBookRequest.model.registeredAddress = '';
				//				self.checkBookRequest.model.recipientName = '';

			}

			if (self.chequeBookRequest.isDeliveryDetSet == "Authorized Person") {
				self.checkBookRequest.model.boolAuthPersion = true;
				self.checkBookRequest.model.customerName ='';
				self.checkBookRequest.model.previewContactNumber = self.checkBookRequest.model.contactNumber
						+ '';
				self.checkBookRequest.model.selfNumber = '';
				
				self.checkBookRequest.model.boolAuthName = true;
				self.checkBookRequest.model.boolAuthMobile = true;
				self.checkBookRequest.model.boolAuthEid = true;
				self.checkBookRequest.model.boolMobilePrefix = true;
				
			} else  {
				self.checkBookRequest.model.boolAuthPersion = false;
				self.checkBookRequest.model.selfNumber = self.checkBookRequest.contactNumber
						+ '';
				self.checkBookRequest.model.contactNumber = '';
				self.checkBookRequest.model.previewContactNumber = '';
				
				self.checkBookRequest.model.boolAuthName = false;
				self.checkBookRequest.model.boolAuthMobile = false;
				self.checkBookRequest.model.boolAuthEid = false;
				self.checkBookRequest.model.boolMobilePrefix = false;
			}

		}
		//added by 
		for (var x=0; x<self.checkBookRequest.emirateList.length;x++)
		{
		if (self.checkBookRequest.emirateList[x].code==self.checkBookRequest.emirateSeletected)
		{
			self.checkBookRequest.emiSelDesc =self.checkBookRequest.emirateList[x].codeDesc;
		}
		}

	};

	self.checkBookRequest.parseChequeBookRequestInit = function(response) {

		if (typeof response.responsesList[0].fromAccountNo == 'object'
				&& !self.checkBookRequest.model.isBack) {
			self.checkBookRequest.model.isBack = false;

			self.checkBookRequest.chequeBookInitResponse = response.responsesList[0];

			self.checkBookRequest.fromAccountNumbers = self.checkBookRequest.chequeBookInitResponse.fromAccountNo;
			self.checkBookRequest.noOfCheques = self.checkBookRequest.chequeBookInitResponse.noOfChequeLeaves;
			self.checkBookRequest.countryList = self.checkBookRequest.chequeBookInitResponse.country;
			self.checkBookRequest.branches = self.checkBookRequest.chequeBookInitResponse.branchList;
			//added by  - start
			self.checkBookRequest.branchList = self.checkBookRequest.chequeBookInitResponse.branchList;
			self.checkBookRequest.emirateList = self.checkBookRequest.chequeBookInitResponse.emirateList;
			self.checkBookRequest.emiBranchList = self.checkBookRequest.chequeBookInitResponse.emiBranchList;
			//added by  - end
			self.checkBookRequest.registeredAddress = self.checkBookRequest.chequeBookInitResponse.registeredAddress[0].address;
			self.checkBookRequest.contactNumber = self.checkBookRequest.chequeBookInitResponse.contactNumber[0].phnNumber;
			self.checkBookRequest.model.customerName = self.checkBookRequest.chequeBookInitResponse.CustName[0].name;
			
			//RAK Cheque Book Request Authorized person changes start
			self.checkBookRequest.mobilePrefixList = self.checkBookRequest.chequeBookInitResponse.mobilePrefixList;
			self.checkBookRequest.subSegFlag = self.checkBookRequest.chequeBookInitResponse.subSegFlag;
			//RAK Cheque Book Request Authorized person changes End
			
			//self.checkBookRequest.model.mobilePrefix = self.checkBookRequest.chequeBookInitResponse.mobilePrefix;
			
			
		}

	};

	self.checkBookRequest.parseRequestChequeProceedResponse = function(response) {

		if (!response.responsesList[0].hasOwnProperty('errorMessage')){

			self.checkBookRequest.model.requestChequeProceedResponse = response.responsesList[0];

			self.checkBookRequest.model.authMode = response.responsesList[0].auth
					|| self.checkBookRequest.model.requestChequeProceedResponse.auth;
			self.checkBookRequest.model.selAccount = response.responsesList[0].AccountNumber;
			self.checkBookRequest.model.seletedBranchDesc = response.responsesList[0].selectedBranchDesc;

			self.common.message=response.responsesList[0].MESSAGE ? response.responsesList[0].MESSAGE :'';
		}

	};

	// added by  - start

	self.rakCheckBookRequestOptionChange = function() {

		var branchListCount = 0;
		var emBranchDesc = [];
		self.checkBookRequest.emiCategorizedBranchList = [];
		self.checkBookRequest.isEmiSelected = true;
		self.checkBookRequest.model.seletedBranch = '';
		for (var x = 0; x < self.checkBookRequest.emiBranchList.length; x++) {
			if (self.checkBookRequest.emiBranchList[x].code == self.checkBookRequest.emirateSeletected) {
				emBranchDesc = self.checkBookRequest.emiBranchList[x].codeDesc
						.split("|");
				break;
			}
		}

		for (var x = 0; x < emBranchDesc.length; x++) {
			for (var y = 0; y < self.checkBookRequest.branchList.length; y++) {
				if (emBranchDesc[x] == self.checkBookRequest.branchList[y].branchIndex) {
					self.checkBookRequest.emiCategorizedBranchList[branchListCount] = self.checkBookRequest.branchList[y];
					branchListCount++;
				}
			}
		}

	};

	self.checkBookRequest.parseChequeBookRequestSubmit = function(response) {

		if (response.responsesList[0].chequeRequestResponse) {
			self.checkBookRequest.model.chequeRequestResponse = response.responsesList[0].chequeRequestResponse;
		}
	};

	/*  Apply New Cheque Book Request : END */

		// Start Deposit Open New Acct Term Conventional

		self.RakDepositOpenNewTermReq =
		{
				oprList:[],
				periodList:[],
				currencyList:[],
				accNo:"",
				currency:"",
				period:"",
				amount:"",
				toDate:'',
				fromDate:'',
				confirmToDate:new Date(),
				confirmFromDate:new Date(),
				maturity:"OMA",
				creditProceed:"",
				interestHandling:"",
				authStatus:false,
				authMode :"",
				txnPwd:"",
				successMessage:"",
				currencyAcc:[],
				matAccount:"",
				intHandlingAccount:"",
				interestRate:"",
				matAmt:"",
				amtAED:"",
				amtUSD:"",
				linkRqd:"",
				paramAmt:"",
				confirmAmt:"",
				matAccReq:false,
				intAccReq:false,
				intHandlingReq:false,
				depPeriodSelection:"",
				selectedPeriod:"",
				intHandlingMode:"",
				periodDesc:"",
				fromAccountId:"",

				resetRakDepositOpenNewTermHome:function()
				{
					self.RakDepositOpenNewTermReq.oprList=[];
					self.RakDepositOpenNewTermReq.currencyList=[];
					self.RakDepositOpenNewTermReq.periodList="";
					self.RakDepositOpenNewTermReq.period="";
					self.RakDepositOpenNewTermReq.currency="";
					self.RakDepositOpenNewTermReq.toDate=new Date();
					self.RakDepositOpenNewTermReq.fromDate=new Date();
					self.RakDepositOpenNewTermReq.accNo="";
					self.RakDepositOpenNewTermReq.currencyAcc=[];
					self.RakDepositOpenNewTermReq.amount=[];
					self.RakDepositOpenNewTermReq.matAmt="";
					self.RakDepositOpenNewTermReq.amtAED="";
					self.RakDepositOpenNewTermReq.amtUSD="";
					self.RakDepositOpenNewTermReq.linkRqd="";
					self.RakDepositOpenNewTermReq.confirmAmt="";
					self.RakDepositOpenNewTermReq.paramAmt="";
					self.RakDepositOpenNewTermReq.intHandlingAccount="";
					self.RakDepositOpenNewTermReq.intAccReq=false;
					self.RakDepositOpenNewTermReq.matAccReq=false;
					self.RakDepositOpenNewTermReq.intHandlingReq=false;
					self.RakDepositOpenNewTermReq.successMessage="";
					self.RakDepositOpenNewTermReq.txnPwd="";
					self.RakDepositOpenNewTermReq.authMode=false;
					self.RakDepositOpenNewTermReq.authStatus="";
					self.RakDepositOpenNewTermReq.selectedPeriod="";
					self.RakDepositOpenNewTermReq.intHandlingMode="";
					self.RakDepositOpenNewTermReq.depPeriodSelection="";
					self.RakDepositOpenNewTermReq.periodDesc="";
					self.RakDepositOpenNewTermReq.matAccount="";
					self.common.fromAuthPage=false;
					self.RakDepositOpenNewTermReq.fromAccountId='';



				},

				resetRakDepositOpenNewTermConfirm:function()
				{
					self.RakDepositOpenNewTermReq.successMessage="";
					self.RakDepositOpenNewTermReq.txnPwd="";
					self.RakDepositOpenNewTermReq.authMode=false;
					self.RakDepositOpenNewTermReq.authStatus="";
				}




		};

		//: Disc And Apply -- START
		self.setRakDepositOpenNewTermInitBackBtnClicked = function(){
			if (self.RakDiscApply.discAndApplyFlowFlag == true){
				self.RakDiscApply.discAndApplyFlowFlag = false;
				scope.setEvent('onDiscAndapplyBackClicked');
			}
			else{
				scope.setEvent('onRAKOpenDepositNewTermInitBackClick');
			}
		};
		//: Disc And Apply -- END

		self.rakDepositOpenNewTermInit=function(responsesList)
		{
			if (self.RakDiscApply.isRequestComesFromDiscApply == true){
				self.RakDiscApply.isRequestComesFromDiscApply = false;
				self.RakDepositOpenNewTermReq.resetRakDepositOpenNewTermHome();
			}
		if(!responsesList[0].hasOwnProperty('errorMessage') && !self.common.fromAuthPage){
			self.RakDepositOpenNewTermReq.depPeriodSelection = "DPV";
			self.RakDepositOpenNewTermReq.maturity = "OMA";
			self.RakDepositOpenNewTermReq.interestHandling = "IHA";
			if (responsesList[0].hasOwnProperty('periodList')) {
				self.RakDepositOpenNewTermReq.periodList=responsesList[0].periodList;
			}
			if (responsesList[0].hasOwnProperty('operativeAccountsList')) {
				self.RakDepositOpenNewTermReq.oprList=responsesList[0].operativeAccountsList;
				//self.RakDepositOpenNewTermReq.currencyAcc=responsesList[0].operativeAccountsList;
			}

			if (responsesList[0].hasOwnProperty('currencyList')) {
				self.RakDepositOpenNewTermReq.currencyList=responsesList[0].currencyList;

			}

			if (responsesList[0].hasOwnProperty('amtAED')) {
				self.RakDepositOpenNewTermReq.amtAED=responsesList[0].amtAED;

			}

			if (responsesList[0].hasOwnProperty('amtUSD')) {
				self.RakDepositOpenNewTermReq.amtUSD=responsesList[0].amtUSD;

			}
			
			if (responsesList[0].hasOwnProperty('linkRqd')) {
				self.RakDepositOpenNewTermReq.linkRqd=responsesList[0].linkRqd;

			}
		}

		};

		self.rakDepositOpenNewTermSameCurrencyAccFilter=function()
		{
			var x = 0;
			var currency = "";
			self.RakDepositOpenNewTermReq.currencyAcc=[];
			for (var i=0 ; i < self.RakDepositOpenNewTermReq.oprList.length;i++)

			{
				if (self.RakDepositOpenNewTermReq.oprList[i].accountIndex == self.RakDepositOpenNewTermReq.accNo)
				{
					currency = self.RakDepositOpenNewTermReq.oprList[i].currency;
					break;

				}
			}

			for (var i=0 ; i < self.RakDepositOpenNewTermReq.oprList.length;i++ )
				if (self.RakDepositOpenNewTermReq.oprList[i].currency==currency)

				{
					self.RakDepositOpenNewTermReq.currencyAcc[x]=self.RakDepositOpenNewTermReq.oprList[i];
					x++;
				}



		};


		self.rakDepositOpenNewTermConfirm=function(responsesList){



			if (!responsesList[0].hasOwnProperty('errorMessage'))
			{
				if(responsesList[0].auth == "")
					self.RakDepositOpenNewTermReq.authStatus=false;
				else
				{
					self.RakDepositOpenNewTermReq.authStatus=true;
					self.RakDepositOpenNewTermReq.authMode = responsesList[0].auth;
				}

				self.common.message=responsesList[0].MESSAGE ? responsesList[0].MESSAGE :'';

			
			self.RakDepositOpenNewTermReq.confirmAmt =responsesList[0].depAmount;
			self.RakDepositOpenNewTermReq.fromAccountId=responsesList[0].fromAccountId;
			

			if (responsesList[0].hasOwnProperty('previewDate')) {
				self.RakDepositOpenNewTermReq.confirmFromDate = responsesList[0].previewDate;
			}
			if (responsesList[0].hasOwnProperty('previewDateTwo')) {
				self.RakDepositOpenNewTermReq.confirmToDate = responsesList[0].previewDateTwo;
			}
			
			if (responsesList[0].hasOwnProperty('maturityAmt'))
			{
				self.RakDepositOpenNewTermReq.matAmt =responsesList[0].maturityAmt;
			}
			if (responsesList[0].hasOwnProperty('interestRate'))
			{
			self.RakDepositOpenNewTermReq.interestRate =responsesList[0].interestRate;
			}
			}
		};

		self.rakDepositOpenNewTermDate=function()
		{
			if(self.RakDepositOpenNewTermReq.depPeriodSelection == 'DPD'){
			/*	self.RakDepositOpenNewTermReq.confirmToDate=self.setFormatedDate(self.RakDepositOpenNewTermReq.toDate).toString();
				self.RakDepositOpenNewTermReq.confirmFromDate=self.setFormatedDate(self.RakDepositOpenNewTermReq.fromDate).toString();*/
			self.common.displayDate = self.RakDepositOpenNewTermReq.fromDate;
			self.populateCurrentDateDetails();

			self.RakDepositOpenNewTermReq.fromDate_day =self.common.date;
			self.RakDepositOpenNewTermReq.fromDate_month=self.common.month;
			self.RakDepositOpenNewTermReq.fromDate_year=self.common.year;

			self.common.displayDate = self.RakDepositOpenNewTermReq.toDate;
			self.populateCurrentDateDetails();

			self.RakDepositOpenNewTermReq.toDate_day =self.common.date;
			self.RakDepositOpenNewTermReq.toDate_month=self.common.month;
			self.RakDepositOpenNewTermReq.toDate_year=self.common.year;
		}
		else{
			self.RakDepositOpenNewTermReq.fromDate_day ="";
			self.RakDepositOpenNewTermReq.fromDate_month="";
			self.RakDepositOpenNewTermReq.fromDate_year="";

			self.RakDepositOpenNewTermReq.toDate_day ="";
			self.RakDepositOpenNewTermReq.toDate_month="";
			self.RakDepositOpenNewTermReq.toDate_year="";

			for(var temp in self.RakDepositOpenNewTermReq.periodList){
					if(self.RakDepositOpenNewTermReq.periodList[temp].periodIndex==self.RakDepositOpenNewTermReq.period){
						self.RakDepositOpenNewTermReq.periodDesc = self.RakDepositOpenNewTermReq.periodList[temp].periodDesc;
						break;
					}
				}

			}
			//self.RakDepositOpenNewTermReq.confirmAmt=self.RakDepositOpenNewTermReq.amount.toString();
		};


		self.rakDepositOpenNewTermSuccess=function(responselist){

			if (!responselist[0].hasOwnProperty('errorMessage'))
			{
				self.RakDepositOpenNewTermReq.successMessage=responselist[0].successRequest;
			}
		};

		self.rakDepositOpenNewTermAmtCheck=function()
		{
			if (self.RakDepositOpenNewTermReq.currency=="AED")
			{
				self.RakDepositOpenNewTermReq.paramAmt= self.RakDepositOpenNewTermReq.amtAED;

			}

			else
				if (self.RakDepositOpenNewTermReq.currency=="USD")
				{
					self.RakDepositOpenNewTermReq.paramAmt= self.RakDepositOpenNewTermReq.amtUSD;

				}



		};


		self.RakDepositOpenNewTermCheckForValidations=function()
		{
			if(self.RakDepositOpenNewTermReq.maturity=="OMA")
				self.RakDepositOpenNewTermReq.matAccReq=true;

			if (self.RakDepositOpenNewTermReq.maturity=="OMR" && self.RakDepositOpenNewTermReq.interestHandling=="IHA" )
				self.RakDepositOpenNewTermReq.intAccReq=true;

			if (self.RakDepositOpenNewTermReq.maturity=="OMR")
				self.RakDepositOpenNewTermReq.intHandlingReq=true;
		};


		// End Deposit Open New Acct Term Conventional


		/*START  Deposit Open New Acct Term ISLAMIC*/

		self.RakIslamicDepositOpenNewTermReq =
		{
				oprList:[],
				periodList:[],
				currencyList:[],
				accNo:"",
				currency:"",
				period:"",
				amount:"",
				toDate:'',
				fromDate:'',
				confirmToDate:new Date(),
				confirmFromDate:new Date(),
				maturity:"",
				autoRoll:"",
				authStatus:false,
				authMode :"",
				txnPwd:"",
				successMessage:"",
				currencyAcc:[],
				matAccount:"",
				autoRollAccount:"",
				interestRate:"",
				matAmt:"",
				amtAED:"",
				amtUSD:"",
				linkRqd:"",
				paramAmt:"",
				confirmAmt:"",
				matAccReq:false,
				intAccReq:false,
				autoRoll:false,
				profit:"",
				depPeriodSelection:"",
				periodDesc:"",
				message:"",
				fromAccountId:"",
				
				resetRakIslamicDepositOpenNewTermHome:function()
				{
					self.RakIslamicDepositOpenNewTermReq.oprList=[];
					self.RakIslamicDepositOpenNewTermReq.currencyList=[];
					self.RakIslamicDepositOpenNewTermReq.periodList="";
					self.RakIslamicDepositOpenNewTermReq.period="";
					self.RakIslamicDepositOpenNewTermReq.currency="";
					self.RakIslamicDepositOpenNewTermReq.toDate="";
					self.RakIslamicDepositOpenNewTermReq.fromDate=new Date();
					self.RakIslamicDepositOpenNewTermReq.accNo="";
					self.RakIslamicDepositOpenNewTermReq.currencyAcc=[];
					self.RakIslamicDepositOpenNewTermReq.amount=[];
					self.RakIslamicDepositOpenNewTermReq.matAmt="";
					self.RakIslamicDepositOpenNewTermReq.amtAED="";
					self.RakIslamicDepositOpenNewTermReq.amtUSD="";
					self.RakIslamicDepositOpenNewTermReq.linkRqd="";
					self.RakIslamicDepositOpenNewTermReq.confirmAmt="";
					self.RakIslamicDepositOpenNewTermReq.paramAmt="";
					self.RakIslamicDepositOpenNewTermReq.intHandlingAccount="";
					self.RakIslamicDepositOpenNewTermReq.intAccReq=false;
					self.RakIslamicDepositOpenNewTermReq.matAccReq=false;
					self.RakIslamicDepositOpenNewTermReq.intHandlingReq=false;
					self.RakIslamicDepositOpenNewTermReq.successMessage="";
					self.RakIslamicDepositOpenNewTermReq.txnPwd="";
					self.RakIslamicDepositOpenNewTermReq.authMode=false;
					self.RakIslamicDepositOpenNewTermReq.authStatus="";
					self.RakIslamicDepositOpenNewTermReq.depPeriodSelection="";
					self.RakIslamicDepositOpenNewTermReq.periodDesc="";
					self.RakIslamicDepositOpenNewTermReq.matAccount="";
					self.common.fromAuthPage=false;
					self.common.message="";
					self.RakIslamicDepositOpenNewTermReq.fromAccountId="";

				},

				resetRakIslamicDepositOpenNewTermConfirm:function()
				{
					self.RakIslamicDepositOpenNewTermReq.successMessage="";
					self.RakIslamicDepositOpenNewTermReq.txnPwd="";
					self.RakIslamicDepositOpenNewTermReq.authMode=false;
					self.RakIslamicDepositOpenNewTermReq.authStatus="";
					self.common.message="";
				}







		};


		self.rakIslamicDepositOpenNewTermInit=function(responsesList)
		{

			if(!responsesList[0].hasOwnProperty('errorMessage') && !self.common.fromAuthPage){
				self.RakIslamicDepositOpenNewTermReq.depPeriodSelection = "DPV";
				self.RakIslamicDepositOpenNewTermReq.maturity = "OMA";
				self.RakIslamicDepositOpenNewTermReq.interestHandling = 'IHA';
				if (responsesList[0].hasOwnProperty('periodList')) {
					self.RakIslamicDepositOpenNewTermReq.periodList=responsesList[0].periodList;
				}
				if (responsesList[0].hasOwnProperty('operativeAccountsList')) {
					self.RakIslamicDepositOpenNewTermReq.oprList=responsesList[0].operativeAccountsList;
					//self.RakIslamicDepositOpenNewTermReq.currencyAcc=responsesList[0].operativeAccountsList;
				}

				if (responsesList[0].hasOwnProperty('currencyList')) {
					self.RakIslamicDepositOpenNewTermReq.currencyList=responsesList[0].currencyList;

				}

				if (responsesList[0].hasOwnProperty('amtAED')) {
					self.RakIslamicDepositOpenNewTermReq.amtAED=responsesList[0].amtAED;

				}

				if (responsesList[0].hasOwnProperty('amtUSD')) {
					self.RakIslamicDepositOpenNewTermReq.amtUSD=responsesList[0].amtUSD;

				}
				if (responsesList[0].hasOwnProperty('linkRqd')) {
					self.RakIslamicDepositOpenNewTermReq.linkRqd=responsesList[0].linkRqd;

				}
			}

		};

		self.rakIslamicDepositOpenNewTermSameCurrencyAccFilter=function()
		{
			var x = 0;
			var currency = "";
			self.RakIslamicDepositOpenNewTermReq.currencyAcc=[];
			for (var i=0 ; i < self.RakIslamicDepositOpenNewTermReq.oprList.length;i++)

			{
				if (self.RakIslamicDepositOpenNewTermReq.oprList[i].accountIndex == self.RakIslamicDepositOpenNewTermReq.accNo)
				{
					currency = self.RakIslamicDepositOpenNewTermReq.oprList[i].currency;
					break;

				}
			}

			for (var i=0 ; i < self.RakIslamicDepositOpenNewTermReq.oprList.length;i++ )
				if (self.RakIslamicDepositOpenNewTermReq.oprList[i].currency==currency)

				{
					self.RakIslamicDepositOpenNewTermReq.currencyAcc[x]=self.RakIslamicDepositOpenNewTermReq.oprList[i];
					x++;
				}



		};


		self.rakIslamicDepositOpenNewTermConfirm=function(responsesList){



			if (!responsesList[0].hasOwnProperty('errorMessage'))
			{
				if(responsesList[0].auth == "")
					self.RakIslamicDepositOpenNewTermReq.authStatus=false;
				else 
				{
					self.RakIslamicDepositOpenNewTermReq.authStatus=true;
					self.RakIslamicDepositOpenNewTermReq.authMode = responsesList[0].auth;
				}

				//CHANGES DONE AS FIX OF UAT ISSUE AS AMOUNT WAS CLEARED OF ERROR START
				self.RakIslamicDepositOpenNewTermReq.confirmAmt =responsesList[0].depAmount;
				self.RakIslamicDepositOpenNewTermReq.fromAccountId=responsesList[0].fromAccountId;
				//CHANGES DONE AS FIX OF UAT ISSUE AS AMOUNT WAS CLEARED OF ERROR END
				
				self.common.message=responsesList[0].MESSAGE ? responsesList[0].MESSAGE :'';
			}

			if (responsesList[0].hasOwnProperty('maturityAmt'))
			{
				self.RakIslamicDepositOpenNewTermReq.matAmt =responsesList[0].maturityAmt;
			}
			if (responsesList[0].hasOwnProperty('interestRate'))
			{
				self.RakIslamicDepositOpenNewTermReq.interestRate =responsesList[0].interestRatet;
			}
			
			if (responsesList[0].hasOwnProperty('previewDate')) {
				self.RakIslamicDepositOpenNewTermReq.confirmFromDate = responsesList[0].previewDate;
			}
			if (responsesList[0].hasOwnProperty('previewDateTwo')) {
				self.RakIslamicDepositOpenNewTermReq.confirmToDate = responsesList[0].previewDateTwo;
			}

			//CHANGES DONE AS FIX OF UAT ISSUE AS AMOUNT WAS CLEARED OF ERROR START
			//self.RakIslamicDepositOpenNewTermReq.confirmAmt =responsesList[0].depAmount;
			//CHANGES DONE AS FIX OF UAT ISSUE AS AMOUNT WAS CLEARED OF ERROR END
		};

		self.rakIslamicDepositOpenNewTermDate=function()
		{
			if(self.RakIslamicDepositOpenNewTermReq.depPeriodSelection == 'DPD'){
			/*	self.RakIslamicDepositOpenNewTermReq.confirmToDate=self.setFormatedDate(self.RakIslamicDepositOpenNewTermReq.toDate).toString();
				self.RakIslamicDepositOpenNewTermReq.confirmFromDate=self.setFormatedDate(self.RakIslamicDepositOpenNewTermReq.fromDate).toString();*/

				self.common.displayDate = self.RakIslamicDepositOpenNewTermReq.fromDate;
				self.populateCurrentDateDetails();

				self.RakIslamicDepositOpenNewTermReq.fromDate_day =self.common.date;
				self.RakIslamicDepositOpenNewTermReq.fromDate_month=self.common.month;
				self.RakIslamicDepositOpenNewTermReq.fromDate_year=self.common.year;

				self.common.displayDate = self.RakIslamicDepositOpenNewTermReq.toDate;
				self.populateCurrentDateDetails();

				self.RakIslamicDepositOpenNewTermReq.toDate_day =self.common.date;
				self.RakIslamicDepositOpenNewTermReq.toDate_month=self.common.month;
				self.RakIslamicDepositOpenNewTermReq.toDate_year=self.common.year;
			}
			else{
				self.RakIslamicDepositOpenNewTermReq.fromDate_day ="";
				self.RakIslamicDepositOpenNewTermReq.fromDate_month="";
				self.RakIslamicDepositOpenNewTermReq.fromDate_year="";

				self.RakIslamicDepositOpenNewTermReq.toDate_day ="";
				self.RakIslamicDepositOpenNewTermReq.toDate_month="";
				self.RakIslamicDepositOpenNewTermReq.toDate_year="";

				for(var temp in self.RakIslamicDepositOpenNewTermReq.periodList){
					if(self.RakIslamicDepositOpenNewTermReq.periodList[temp].periodIndex==self.RakIslamicDepositOpenNewTermReq.period){
						self.RakIslamicDepositOpenNewTermReq.periodDesc = self.RakIslamicDepositOpenNewTermReq.periodList[temp].periodDesc;
						break;
					}
				}
			}
			//self.RakIslamicDepositOpenNewTermReq.confirmAmt=self.RakIslamicDepositOpenNewTermReq.amount.toString();


		};


		self.rakIslamicDepositOpenNewTermSuccess=function(responselist){

			if (!responselist[0].hasOwnProperty('errorMessage'))
			{
				self.RakIslamicDepositOpenNewTermReq.successMessage=responselist[0].successRequest;
			}
		};

		self.rakIslamicDepositOpenNewTermAmtCheck=function()
		{
			if (self.RakIslamicDepositOpenNewTermReq.currency=="AED")
			{
				self.RakIslamicDepositOpenNewTermReq.paramAmt= self.RakIslamicDepositOpenNewTermReq.amtAED;

			}

			else
				if (self.RakIslamicDepositOpenNewTermReq.currency=="USD")
				{
					self.RakIslamicDepositOpenNewTermReq.paramAmt= self.RakIslamicDepositOpenNewTermReq.amtUSD;

				}



		};


		self.RakIslamicDepositOpenNewTermCheckForValidations=function()
		{
			if(self.RakIslamicDepositOpenNewTermReq.maturity=="OMA")
				self.RakIslamicDepositOpenNewTermReq.matAccReq=true;

			if (self.RakIslamicDepositOpenNewTermReq.maturity=="OMR" && self.RakIslamicDepositOpenNewTermReq.interestHandling=="IHA" )
				self.RakIslamicDepositOpenNewTermReq.intAccReq=true;

			if (self.RakIslamicDepositOpenNewTermReq.maturity=="OMR")
				self.RakIslamicDepositOpenNewTermReq.intHandlingReq=true;
		};

		//: Disc And Apply -- START
		self.setIslamicRakDepositOpenNewTermInitBackBtnClicked = function(){
			if (self.RakDiscApply.discAndApplyFlowFlag == true){
				self.RakDiscApply.discAndApplyFlowFlag = false;
				scope.setEvent('onDiscAndapplyBackClicked');
			}
			else{
				scope.setEvent('onRAKOpenDepositNewTermInitBackClick');
			}
		};
		//: Disc And Apply -- END


		/*END Deposit Open New Acct Term ISLAMIC */



	/* Customization : END*/

	/*
	 * END 555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555
	 */

	 /* LOAN REPAYMENT MODULE */
	 	/*START  for loan repay */


	self.RAKLoanRepayAccList=
	{
		lonList:[],
		oprList:[],
		payType:"",
		amount:"",
		selectedLon:"",
		selectedOpr:"",
		agreementNo:"",
		sancAmt:"",
		outStdLoan:"",
		overDueAmt:"",
		loanType:"",
		currency:"",
		instAmt:"",
		instDate:"",
		loanAcctId:"",
			authStatus:true,
			authMode :"",
			txnPwd:"",
			amountConfirm:"",
			successMessage:"",

				resetLoanRepayHome :function()
				{self.RAKLoanRepayAccList.lonList=[];
					self.RAKLoanRepayAccList.oprList=[];
					self.RAKLoanRepayAccList.selectedLon="";
					self.RAKLoanRepayAccList.selectedOpr="";
					self.RAKLoanRepayAccList.payType="";
					self.RAKLoanRepayAccList.amount="";
					self.RAKLoanRepayAccList.agreementNo="";
					self.RAKLoanRepayAccList.sancAmt="";
					self.RAKLoanRepayAccList.outStdLoan="";
					self.RAKLoanRepayAccList.overDueAmt="";
					self.RAKLoanRepayAccList.loanType="";
					self.RAKLoanRepayAccList.currency="";
					self.RAKLoanRepayAccList.instAmt="";
					self.RAKLoanRepayAccList.instDate="";
					self.RAKLoanRepayAccList.loanAcctId="";
					self.common.message="";
				},
			resetLoanRepayConfirm :function()
				{
				self.RAKLoanRepayAccList.amountConfirm	=self.RAKLoanRepayAccList.amount.toString();
					self.RAKLoanRepayAccList.txnPwd="";
				}
	};

	self.initLoanRepayHome=function(responsesList) {
		if (responsesList[0].hasOwnProperty('loanAccountsList')) {
		self.RAKLoanRepayAccList.lonList=responsesList[0].loanAccountsList;
		}
		if (responsesList[0].hasOwnProperty('operativeAccountsList')) {
		self.RAKLoanRepayAccList.oprList=responsesList[0].operativeAccountsList;
		}
		/*-UI Changes-Start*/
		if (responsesList[0].hasOwnProperty('agreementNumber')) {
			self.RAKLoanRepayAccList.agreementNo=responsesList[0].agreementNumber;
		}
		if (responsesList[0].hasOwnProperty('sanctionAmount')) {
			self.RAKLoanRepayAccList.sancAmt=responsesList[0].sanctionAmount;
		}
		if (responsesList[0].hasOwnProperty('outstandingLoan')) {
			self.RAKLoanRepayAccList.outStdLoan=responsesList[0].outstandingLoan;
		}
		if (responsesList[0].hasOwnProperty('overDueAmount')) {
			self.RAKLoanRepayAccList.overDueAmt=responsesList[0].overDueAmount;
		}
		if (responsesList[0].hasOwnProperty('loanType')) {
			self.RAKLoanRepayAccList.loanType=responsesList[0].loanType;
		}
		if (responsesList[0].hasOwnProperty('currency')) {
			self.RAKLoanRepayAccList.currency=responsesList[0].currency;
		}
		if (responsesList[0].hasOwnProperty('installmentAmount')) {
			self.RAKLoanRepayAccList.instAmt=responsesList[0].installmentAmount;
		}
		if (responsesList[0].hasOwnProperty('nextInstallmentDate')) {
			self.RAKLoanRepayAccList.instDate=responsesList[0].nextInstallmentDate;
		}

		/*-UI Changes-End*/
	};

self.loanRepayUtil=function(){
		 self.RAKLoanRepayAccList.selectedLon=self.RAKLoanRepayAccList.lonList[self.RAKLoanRepayAccList.loanAcctId]['accountId'];
};



	self.loanRepayConfirm=function(responsesList) {
		if (!responsesList[0].hasOwnProperty('errorMessage'))
		{
			if(responsesList[0].auth == "")
				self.RAKLoanRepayAccList.authStatus=false;
			else
			{
				self.RAKLoanRepayAccList.authStatus=true;
				self.RAKLoanRepayAccList.authMode = responsesList[0].auth;
			}
				if (responsesList[0].hasOwnProperty('payAmt')) {

			self.RAKLoanRepayAccList.amount = responsesList[0].payAmt;
			}

		self.common.message=responsesList[0].MESSAGE ? responsesList[0].MESSAGE :'';
		}
	};

	self.loanRepaySuccess=function(responselist){
		if (!responselist[0].hasOwnProperty('errorMessage'))
		{
		self.RAKLoanRepayAccList.successMessage=responselist[0].successRequest;
		}
	};

	 /*RAK : 6 :  LOAN REPAYMENT MODULE*/


	 /*RAK::1: :FIXED Added for Advance Against Salary: Start */
		self.AdvanceSalaryData = {
				accountsList:[],
				accountNumberList:[],
				accountNumber:'',
				eligibleAmount:'',
				advanceSalary:'',
				authStatus:true,
				currencycode:"",
				eligibleAmountDisplay:"",
				isAuth:false,
				isOnline:"false",
				SalaccountNumber:"",
				eligibleAmountNumeric:"",
				transactionPassword:"",
				authFlag:"",
				flag:false,
				backFlag:false,
				advanceSalaryNum:"",
				clearAdvanceSalaryData:function(){
					self.AdvanceSalaryData.accountNumberList = [];
					self.AdvanceSalaryData.SalaccountNumber='';
					self.AdvanceSalaryData.accountNumber = '';
					self.AdvanceSalaryData.currencycode = '';
					self.AdvanceSalaryData.eligibleAmount = '';
					self.AdvanceSalaryData.eligibleAmountDisplay = '';
					self.AdvanceSalaryData.advanceSalary = '';
					self.AdvanceSalaryData.isAuth = false;
					self.AdvanceSalaryData.isOnline = "false";
					self.AdvanceSalaryData.transactionPassword='';
					self.AdvanceSalaryData.authStatus=true;
					self.AdvanceSalaryData.eligibleAmountDisplay="";
					self.AdvanceSalaryData.eligibleAmountNumeric="";
					self.AdvanceSalaryData.flag=false;
					self.AdvanceSalaryData.advanceSalaryNum="";
					self.AdvanceSalaryData.backFlag=false;
					self.AdvanceSalaryData.authFlag="";
					self.common.fromAuthPage=false;
					self.common.message="";

				},

				//CHANGES FOR ADVANCE AGAINST SALARY START
				initAdvanceSalaryData:function(responsesList){

					if(!responsesList[0].hasOwnProperty('errorMessage') && !self.common.fromAuthPage)
					{
					if(responsesList[0].hasOwnProperty('accountsList'))
						{
						self.AdvanceSalaryData.accountNumberList = responsesList[0].accountsList;
						self.AdvanceSalaryData.eligibleAmount = rootScope.appLiterals.APP.RAK_SERVICES.RAK_ADVANCE_SALARY.ADVANCE_AMOUNT;
						}

					else if(responsesList[0].hasOwnProperty('totalEligibleAmount')){
						self.AdvanceSalaryData.eligibleAmount=responsesList[0].eligibleAmount;
						self.AdvanceSalaryData.eligibleAmountNumeric=responsesList[0].eligibleAmountNum;
						self.AdvanceSalaryData.currencycode = responsesList[0].eligibleCurrency;
						self.AdvanceSalaryData.eligibleAmountDisplay = responsesList[0].totalEligibleAmount;
						self.AdvanceSalaryData.advanceSalary=Number(self.AdvanceSalaryData.eligibleAmountNumeric);
						self.AdvanceSalaryData.flag=true;
					}

					self.AdvanceSalaryData.isOnline = responsesList[0].isOnline;

					}

					else if(self.AdvanceSalaryData.backFlag && !self.AdvanceSalaryData.authStatus){
						self.AdvanceSalaryData.backFlag=false;
					}

					else
					{
					self.AdvanceSalaryData.eligibleAmount = rootScope.appLiterals.APP.RAK_SERVICES.RAK_ADVANCE_SALARY.ADVANCE_AMOUNT;
					self.AdvanceSalaryData.currencycode ="";
					//self.AdvanceSalaryData.eligibleAmountDisplay = "";
					//self.AdvanceSalaryData.advanceSalary="";
					//self.AdvanceSalaryData.flag=false;
					}
				},
				
				/*advanceEligiblityChk:function(){
					if(self.AdvanceSalaryData.eligibleAmount==rootScope.appLiterals.APP.RAK_SERVICES.RAK_ADVANCE_SALARY.ADVANCE_AMOUNT){
						rootScope.showErrorPopup(rootScope.appLiterals.APP.RAKERRORMSG.AASCHK);
						
					}
					else{
						
						scope.setEvent('onSalaryConfirmClick');
					}
					
				}*/


	  };


		self.initAdvanceSalaryDataConfirmPage=function(responsesList){

			if(!responsesList[0].hasOwnProperty('errorMessage')){
				self.AdvanceSalaryData.isOnline = responsesList[0].isOnline;
				self.AdvanceSalaryData.SalaccountNumber=responsesList[0].accountNumber;
				//CHANGES SETTING FORMATTED INPUT ADVANCED AMOUNT START
				//self.AdvanceSalaryData.advanceSalary=Number(responsesList[0].advanceSalary);
				//self.AdvanceSalaryData.advanceSalary=responsesList[0].advanceSalaryNum;
				self.AdvanceSalaryData.advanceSalaryNum=responsesList[0].advanceSalaryNum;
				//CHANGES SETTING FORMATTED INPUT ADVANCED AMOUNT END
				if(responsesList[0].auth == ""){
					self.AdvanceSalaryData.authStatus=true;
				}
				else{
				   self.AdvanceSalaryData.authStatus=false;
				   self.AdvanceSalaryData.authFlag=responsesList[0].auth;
				}

				self.common.message=responsesList[0].MESSAGE ? responsesList[0].MESSAGE :'';
			}

			}
		/*RAK::1: :FIXED Added for Advance Against Salary: END */

		/*RAK::1: :Added for Credit Card Replacement: START */

		self.ReplacementCCData = {
				creditCardList:[],
				branchList:[],
				authStatus:true,
				isAuth:false,
				isOnline:"false",
				creditCardNumber:'',
				branchName:'',
				otherAdress:'',
				registeredAddress:'',
				transactionPassword:"",
				isDispatchModeSet:'',
				isDeliveryAddSet:'',
				OtherAdd:false,
				AuthrizedPerson:'',
				authorizedRecipient:'',
				contactNumber:'',
				mobileNo:'',
				creditcardNo:'',
				otherAddress:'',
				authContactNumber:'',

				isCourier:false,
		        isBranch:false,
		        isRegAdd:false,
		        isOtherAdd:false,
		        isSelf:false,
		        isAuthPerson:false,
		        errorFlag:false,
		        isBack:false,
		        authContactNumberString:'',
				//Added by  for Emirate DropDown
				emirateList:[],
		        emiBranchList:[],
		        emirateSeletected:"",
		        emiCategorizedBranchList:[],
		        isEmiSelected:false,
		        emiSelDesc:"",
		        reasonList:[],
		        reasonName:"",
		        flag:false,
		        otherFlag:false,
		        
				clearReplacementCCData:function(){

					self.ReplacementCCData.creditCardList = [];
					self.ReplacementCCData.branchList=[];
					self.ReplacementCCData.isAuth = false;
				    self.ReplacementCCData.branchName='';
				    self.ReplacementCCData.creditCardNumber='';
				    self.ReplacementCCData.otherAdress='';
					self.ReplacementCCData.transactionPassword='';
					self.ReplacementCCData.isDispatchModeSet = '';
					self.ReplacementCCData.authStatus=true;
					self.ReplacementCCData.isDeliveryAddSet='';
					self.ReplacementCCData.otherAdd=false;
					self.ReplacementCCData.authContactNumber='';
					self.ReplacementCCData.authContactNumberString='';
					self.ReplacementCCData.otherAddress='';
					self.ReplacementCCData.AuthrizedPerson='';
					self.ReplacementCCData.registeredAddress='';
					self.ReplacementCCData.authorizedRecipient='';
					self.ReplacementCCData.contactNumber='';
					self.ReplacementCCData.mobileNo='';
					self.ReplacementCCData.creditcardNo='';
					self.ReplacementCCData.errorFlag=false;
					self.ReplacementCCData.isBack=false;
					self.ReplacementCCData.emirateList = [];
					self.ReplacementCCData.emiBranchList=[];
					self.ReplacementCCData.emirateSeletected = "";
				    self.ReplacementCCData.emiCategorizedBranchList=[];
				    self.ReplacementCCData.emiSelDesc="";
				    self.ReplacementCCData.reasonList=[];
				    self.ReplacementCCData.reasonName='';
				    self.ReplacementCCData.flag=false;
					self.ReplacementCCData.otherFlag=false;
				},

				continueReplacementCCData:function(){

					if(self.ReplacementCCData.authContactNumber=='' || self.ReplacementCCData.authContactNumber==null)
						self.ReplacementCCData.authContactNumberString = "";
					else
						self.ReplacementCCData.authContactNumberString = self.ReplacementCCData.authContactNumber.toString();
				},
				
				getReasonValue:function(){
					if(self.ReplacementCCData.reasonName=='Others')
						{
						self.ReplacementCCData.flag=true;
						self.ReplacementCCData.otherFlag=true;
						self.ReplacementCCData.other="";
						}
					else{
						self.ReplacementCCData.flag=false;
						self.ReplacementCCData.otherFlag=false;
					}
				},

			/*	onClickNumber:function(){
					self.ReplacementCCData.authContactNumber= self.ReplacementCCData.authContactNumber+"";
					self.ReplacementCCData.mobileNo = self.ReplacementCCData.mobileNo+"";
					self.ReplacementCCData.contactNumber=self.ReplacementCCData.contactNumber+"";
					self.ReplacementCCData.isDispatchModeSet=self.ReplacementCCData.isDispatchModeSet+"";
				},*/

				/*onBackClickNumber:function(){
					self.ReplacementCCData.authContactNumber=Number (self.ReplacementCCData.authContactNumber);
					self.ReplacementCCData.mobileNo =Number (self.ReplacementCCData.mobileNo);
					self.ReplacementCCData.contactNumber=Number(self.ReplacementCCData.contactNumber);
					if(self.ReplacementCCData.isDispatchModeSet=="false")
						{
						self.ReplacementCCData.isDispatchModeSet=false;
						}
					else{
						self.ReplacementCCData.isDispatchModeSet=Boolean(self.ReplacementCCData.isDispatchModeSet);
					}

				},*/
				initReplacementCCData:function(responsesList){
					if (!responsesList[0].hasOwnProperty('errorMessage') && !self.ReplacementCCData.isBack) {

						if(responsesList[0].hasOwnProperty('creditCardList')){
							self.ReplacementCCData.creditCardList = responsesList[0].creditCardList;

						}
						if(responsesList[0].hasOwnProperty('branchList')){
							self.ReplacementCCData.branchList = responsesList[0].branchList;
						}
						if(responsesList[0].hasOwnProperty('registeredAddress')){
							self.ReplacementCCData.registeredAddress = responsesList[0].registeredAddress[0].address;
						}
						if(responsesList[0].hasOwnProperty('contactNumber')){
							self.ReplacementCCData.contactNumber=responsesList[0].contactNumber[0].phnNumber;
						}

						if(responsesList[0].hasOwnProperty('emirateList')){
							self.ReplacementCCData.emirateList = responsesList[0].emirateList;
						}

						if(responsesList[0].hasOwnProperty('emiBranchList')){
							self.ReplacementCCData.emiBranchList = responsesList[0].emiBranchList;
						}
						
						if(responsesList[0].hasOwnProperty('reasonList')){
							self.ReplacementCCData.reasonList = responsesList[0].reasonList;
						}



						}
				}


	  };

		self.initReplacementCCDataConfirmPage=function(responsesList){

			if(!responsesList[0].hasOwnProperty('errorMessage')){
				//alert(responsesList[0].creditCardNumber);
				//self.ReplacementDCData.isOnline = responsesList[0].isOnline;
				self.common.message=responsesList[0].MESSAGE ? responsesList[0].MESSAGE :'';
				self.ReplacementCCData.creditcardNo=responsesList[0].creditCardNumber;

				/*if(responsesList[0].hasOwnProperty("selectedBranchDesc")){
					self.ReplacementCCData.branchSelected = responsesList[0].selectedBranchDesc;
				}*/

				if(responsesList[0].auth == ""){
					self.ReplacementCCData.authStatus=false;
				}
				else{
				   self.ReplacementCCData.authStatus=true;
				   self.ReplacementCCData.authMode = responsesList[0].auth;
				}
			}

			//Added By  for Branch Desc
	for (var x=0; x<self.ReplacementCCData.emiCategorizedBranchList.length;x++)
				{
				if (self.ReplacementCCData.emiCategorizedBranchList[x].code==self.ReplacementCCData.branchName)
				{
					self.ReplacementCCData.branchSelected=self.ReplacementCCData.emiCategorizedBranchList[x].codeDesc;
				}
				}


	//Added By  For Emirate Desc

    		for (var x=0; x<self.ReplacementCCData.emirateList.length;x++)
			{
			if (self.ReplacementCCData.emirateList[x].code==self.ReplacementCCData.emirateSeletected)
			{
				self.ReplacementCCData.emiSelDesc =self.ReplacementCCData.emirateList[x].codeDesc;
			}
			}
			}


				self.rakReplacementCCContinueClick=function()
		{
			if (self.ReplacementCCData.isDispatchModeSet == false)//if Courier
				{
				 self.ReplacementCCData.branchName='';
				   }
			else (self.ReplacementCCData.isDispatchModeSet == true)//if branch
			{

				    self.ReplacementCCData.otherAdress='';
					self.ReplacementCCData.isDeliveryAddSet='';
					self.ReplacementCCData.otherAdd=false;
					self.ReplacementCCData.authContactNumber='';
					self.ReplacementCCData.authContactNumberString='';
					self.ReplacementCCData.otherAddress='';
					self.ReplacementCCData.AuthrizedPerson='';
				/*	self.ReplacementCCData.registeredAddress='';*/
					self.ReplacementCCData.authorizedRecipient='';



			}
		}
		//Added by  For Emirates based Branch Dropdown Change
		self.rakReplacementCCBranchOptionChange=function(){

			var branchListCount= 0;
            var emBranchDesc=[];
            self.ReplacementCCData.emiCategorizedBranchList=[];
            self.ReplacementCCData.isEmiSelected=true;
			for(var x=0; x< self.ReplacementCCData.emiBranchList.length;x++ )
				{
				if (self.ReplacementCCData.emiBranchList[x].code==self.ReplacementCCData.emirateSeletected)
				{	emBranchDesc =  self.ReplacementCCData.emiBranchList[x].codeDesc.split("|");
				break;
				}}

			for (var x = 0 ; x< emBranchDesc.length; x++  )
			{
				for (var y= 0 ; y <self.ReplacementCCData.branchList.length;y++)
					{
					if (emBranchDesc[x]==self.ReplacementCCData.branchList[y].code)
						{
						self.ReplacementCCData.emiCategorizedBranchList[branchListCount] =self.ReplacementCCData.branchList[y];
						branchListCount++;
						}
					}
			}

			};

		/*RAK::1: :Added for Credit Card Replacement: END */

		/*RAK::1: :Added for Evantgae Balanace Order: START */
			self.EvantageData = {
					EvaAccountsList:[],

					accountNumberList:[],
					EvaAccountNumber:'',
					accountNumber:'',
					balance:'',
					authStatus:true,
					isAuth:false,
					isOnline:"false",

					transactionPassword:"",
					authFlag:"",


					clearEvantageData:function(){
						self.EvantageData.EvaAccountsList = [];
						self.EvantageData.accountNumberList = [];

						self.EvantageData.accountNumber = '';
						self.EvantageData.EvaAccountNumber = '';
						self.EvantageData.balance = '';

						self.EvantageData.isAuth = false;
						self.EvantageData.isOnline = "false";
						self.EvantageData.transactionPassword='';
						self.EvantageData.authStatus=true;
						self.EvantageData.authFlag='';
					 	self.common.message='';
					},

					onClickBalance:function(){
						self.EvantageData.balance = self.EvantageData.balance+"";
					},
					initEvantageData:function(responseList){
						if(!responseList[0].hasOwnProperty('errorMessage') && !self.common.fromAuthPage){
							if(responseList[0].hasOwnProperty('EvaAccountsList')){
								self.EvantageData.EvaAccountsList = responseList[0].EvaAccountsList;
							}
							if(responseList[0].hasOwnProperty('accountNumberList')){
								self.EvantageData.accountNumberList = responseList[0].accountNumberList;
							}
						}



					},

		  };
		//added by  for evantgae confirm page
		self.initEvantageBalanceConfirmPage = function(responsesList){
			if(!responsesList[0].hasOwnProperty('errorMessage')){
				if(responsesList[0].auth == ""){
					self.EvantageData.authStatus=false;
				}
				else{
				   self.EvantageData.authStatus=true;
				   self.EvantageData.authFlag = responsesList[0].auth;
				}

				//self.EvantageData.EvaAccountNumber=responsesList[0].EvaAccountNumber;
				//self.EvantageData.accountNumber=responsesList[0].accountNumber;
				//self.EvantageData.balance=responsesList[0].balance;
				self.common.message=responsesList[0].MESSAGE ? responsesList[0].MESSAGE :'';
			}

		}

		/*RAK::1: :Added for Evantgae Balanace Order: END */

		/*RAK: Added by  forTEmp blocked card replacement  */
		/*RAK : CHANGED REQUEST ID  blocked card replacement FROM CRC(CREDIT CARD REPLACEMENT) TO BCC(TEMP BLOCK CREDIT CARD) START */
		self.BlockedCreditCardData={
		creditCardList:[],
		reasonList:[],
		creditCardNumber:'',
		creditCardNum:'',
		reasonName:'',
		other:'',
		authStatus:true,
		isAuth:false,
		isOnline:"false",
		otherFlag:false,
		transactionPassword:"",
		expDate:"",
		expDateFlag:false,
		flag:false,
		authMode:"",
		message:"",

		//CHANGES FOR EXPIRY DATE START
		clearBlockedCreditCard:function(){
			self.BlockedCreditCardData.creditCardList = [];
			self.BlockedCreditCardData.reasonList = [];
			self.BlockedCreditCardData.creditCardNumber = '';
			self.BlockedCreditCardData.creditCardNum='';
			self.BlockedCreditCardData.reasonName = '';
			self.BlockedCreditCardData.other = '';
			self.BlockedCreditCardData.expDate='';
			self.BlockedCreditCardData.isAuth = false;
			self.BlockedCreditCardData.isOnline = "false";
			self.BlockedCreditCardData.otherFlag = false;
			self.BlockedCreditCardData.transactionPassword='';
			self.BlockedCreditCardData.authStatus=true;
			self.BlockedCreditCardData.expDateFlag=false;
			self.BlockedCreditCardData.authMode='';
			self.common.message='';
		},

		getReasonValue:function(){
		if(self.BlockedCreditCardData.reasonName=='Others')
			{
			self.BlockedCreditCardData.flag=true;
			self.BlockedCreditCardData.otherFlag=true;
			self.BlockedCreditCardData.other="";
			}
		else{
			self.BlockedCreditCardData.flag=false;
			self.BlockedCreditCardData.otherFlag=false;
		}
		},


		initBlockedCreditCardData:function(responseList){
			if(!responseList[0].hasOwnProperty('errorMessage')){
			if(responseList[0].hasOwnProperty('creditCardList')){
				self.BlockedCreditCardData.creditCardList = responseList[0].creditCardList;
			}
			if(responseList[0].hasOwnProperty('reasonList')){
				self.BlockedCreditCardData.reasonList = responseList[0].reasonList;
			}



			if(responseList[0].hasOwnProperty('expDate'))
			self.BlockedCreditCardData.expDate=responseList[0].expDate;
	     }

		},
		};

		self.initBlockedCreditCardConfirmPage = function(responsesList){
			if(!responsesList[0].hasOwnProperty('errorMessage')){
				if(responsesList[0].auth == ""){
					self.BlockedCreditCardData.authStatus=true;
				}
				else{
				   self.BlockedCreditCardData.authStatus=false;
				   self.BlockedCreditCardData.authMode = responsesList[0].auth;
				}

				self.BlockedCreditCardData.creditCardNumber=responsesList[0].creditCardNumber;
				//self.BlockedCreditCardData.displayDate=responsesList[0].displayDate;
				self.BlockedCreditCardData.reasonName=responsesList[0].reasonName;
				//self.BlockedCreditCardData.other=responsesList[0].other;

				self.common.message=responsesList[0].MESSAGE ? responsesList[0].MESSAGE :'';
			}

		};


		self.ReplacementDCData = {
				debitCardList:[],
				branchList:[],
				authStatus:true,
				isAuth:false,
				isOnline:"false",
				debitcardNumber:'',
				branchName:'',
				otherAdress:'',
				registeredAddress:'',
				transactionPassword:"",
				isDispatchModeSet:false,
				isDeliveryAddSet:false,
				OtherAdd:false,
				AuthrizedPerson:false,
				authorizedRecipient:'',
				contactNumber:'',
				mobileNo:'',
				debitcardNo:'',
				otherAddress:'',
				authContactNumber:'',

				isCourier:false,
		        isBranch:false,
		        isRegAdd:false,
		        isOtherAdd:false,
		        isSelf:false,
		        isAuthPerson:false,
		        authMode:"",

				emirateList:[],
        emiBranchList:[],
        emirateSeletected:"",
        emiCategorizedBranchList:[],
        isEmiSelected:false,
        emiSelDesc:"",
		message:"",

				clearReplacementDCData:function(){

					self.ReplacementDCData.debitCardList = [];
					self.ReplacementDCData.branchList=[];
					self.ReplacementDCData.isAuth = false;
				    self.ReplacementDCData.branchName='';
				    self.ReplacementDCData.debitcardNumber='';
				    self.ReplacementDCData.otherAdress='';
					self.ReplacementDCData.transactionPassword='';
					 self.ReplacementDCData.isDispatchModeSet = false;
					self.ReplacementDCData.authStatus=true;
					self.ReplacementDCData.isDeliveryAddSet=false;
					self.ReplacementDCData.otherAdd=false;
					self.ReplacementDCData.authContactNumber='';
					self.ReplacementDCData.otherAddress='';
					self.ReplacementDCData.AuthrizedPerson=false;
					self.ReplacementDCData.registeredAddress='';
					self.ReplacementDCData.authorizedRecipient='';
					self.ReplacementDCData.contactNumber='';
					self.ReplacementDCData.mobileNo='';
					self.ReplacementDCData.debitcardNo='';
					self.ReplacementDCData.authMode='';

					self.ReplacementDCData.emirateList= "";
			self.ReplacementDCData.emiBranchList= "";
			self.ReplacementDCData.emirateSeletected= "";
			self.ReplacementDCData.emiCategorizedBranchList= "";
			self.ReplacementDCData.isEmiSelected=false;
			self.ReplacementDCData.emiSelDesc= "";
			self.common.message="";
				},

				/*onClickNumber:function(){
					self.ReplacementDCData.authContactNumber= self.ReplacementDCData.authContactNumber+"";
					self.ReplacementDCData.mobileNo = self.ReplacementDCData.mobileNo+"";
					self.ReplacementDCData.contactNumber=self.ReplacementDCData.contactNumber+"";
					//self.ReplacementDCData.AuthrizedPerson=self.ReplacementDCData.AuthrizedPerson+"";
					//self.ReplacementDCData.isDispatchModeSet=self.ReplacementDCData.isDispatchModeSet+"";
					//self.ReplacementDCData.isDeliveryAddSet=self.ReplacementDCData.isDeliveryAddSet+"";
				},*/
				/*onBackClickNumber:function(){
					self.ReplacementDCData.authContactNumber=Number (self.ReplacementDCData.authContactNumber);
					self.ReplacementDCData.mobileNo = Number(self.ReplacementDCData.mobileNo);
					self.ReplacementDCData.contactNumber=Number(self.ReplacementDCData.contactNumber);

					if(self.ReplacementDCData.AuthrizedPerson=="false")
						{
						self.ReplacementDCData.AuthrizedPerson=false;
						}
					else
						{
						self.ReplacementDCData.AuthrizedPerson=Boolean(self.ReplacementDCData.AuthrizedPerson);
						}
					if(self.ReplacementDCData.isDispatchModeSet=="false"){
						self.ReplacementDCData.isDispatchModeSet=false;
					}
					else
						{
						self.ReplacementDCData.isDispatchModeSet=Boolean(self.ReplacementDCData.isDispatchModeSet);
						}
					if(self.ReplacementDCData.isDeliveryAddSet=="false")
						{
						self.ReplacementDCData.isDeliveryAddSet=false;
						}
					else{
						self.ReplacementDCData.isDeliveryAddSet=Boolean(self.ReplacementDCData.isDeliveryAddSet);
					}

				},*/
				initReplacementDCData:function(responsesList){

					if(responsesList[0].hasOwnProperty('debitCardList')){
						self.ReplacementDCData.debitCardList = responsesList[0].debitCardList;
					}
					if(responsesList[0].hasOwnProperty('branchList')){
						self.ReplacementDCData.branchList = responsesList[0].branchList;
					}

					//added by 
			/*if (responsesList[0].hasOwnProperty('OprAcctBranchList'))
				self.RakDCApplyModel.OprAcctBranchList = responsesList[0].OprAcctBranchList;*/

			if (responsesList[0].hasOwnProperty('emirateList')) {
				self.ReplacementDCData.emirateList = responsesList[0].emirateList;
			}

			if (responsesList[0].hasOwnProperty('emiBranchList')) {
				self.ReplacementDCData.emiBranchList = responsesList[0].emiBranchList;
			}
			//added by  - END
					if(responsesList[0].registeredAddress.length >0){
						self.ReplacementDCData.registeredAddress = responsesList[0].registeredAddress[0].address;
					}
					self.ReplacementDCData.contactNumber=responsesList[0].contactNumber[0].phnNumber;



				}


	  };

	  //Added by  For Emirates based Branch Dropdown Change
    self.ReplacementDCDataOptionChange = function() {

	var branchListCount = 0;
	var emBranchDesc = [];
	self.ReplacementDCData.emiCategorizedBranchList = [];
	self.ReplacementDCData.isEmiSelected = true;
	for (var x = 0; x < self.ReplacementDCData.emiBranchList.length; x++) {
		if (self.ReplacementDCData.emiBranchList[x].code == self.ReplacementDCData.emirateSeletected) {
			emBranchDesc = self.ReplacementDCData.emiBranchList[x].codeDesc
					.split("|");
			break;
		}
	}

	for (var x = 0; x < emBranchDesc.length; x++) {
		for (var y = 0; y < self.ReplacementDCData.branchList.length; y++) {
			if (emBranchDesc[x] == self.ReplacementDCData.branchList[y].branchCode) {
				self.ReplacementDCData.emiCategorizedBranchList[branchListCount] = self.ReplacementDCData.branchList[y];
				branchListCount++;
			}
		}
	}

};
// added by  end

		self.initReplacementDCDataConfirmPage=function(responsesList){

			if(!responsesList[0].hasOwnProperty('errorMessage')){
				//alert(responsesList[0].debitCardNumber);
				//self.ReplacementDCData.isOnline = responsesList[0].isOnline;
				self.ReplacementDCData.debitcardNo=responsesList[0].debitCardNumber;
				self.ReplacementDCData.branchSelected=responsesList[0].branchName;
				if(responsesList[0].auth == ""){
					self.ReplacementDCData.authStatus=false;
				}
				else{
				   self.ReplacementDCData.authStatus=true;
				   self.ReplacementDCData.authMode=responsesList[0].auth;
				}
				
				self.common.message=responsesList[0].MESSAGE ? responsesList[0].MESSAGE :'';
			}

			// Added By  For Emirate Desc

		for (var x = 0; x < self.ReplacementDCData.emirateList.length; x++) {
			if (self.ReplacementDCData.emirateList[x].code == self.ReplacementDCData.emirateSeletected) {
				self.ReplacementDCData.emiSelDesc = self.ReplacementDCData.emirateList[x].codeDesc;
			}
		}

			};

		/*RAK::1: :Added for Debit Card Replacement: END */

		/*RAK :Open operative savings account : START*/

	self.RAKOprSavingAcctOpenLists={
			refAcctNoList:[],
			branchForKITList:[]
		};

	self.RAKOprSavingAcctOpenReq = {
			selectedDate_year:"",
			selectedDate_month:"",
			selectedDate_day:"",
			selectedDate:new Date(),
			expDate:new Date(),
			selectedRefNo:"",
			selectedCrn:"",
			EmiratesId:"",
			debitCardRqd:"",
			selectedBranch:"",
			authFlag:"",
			auth:"",
			authMode:"",
			authStatus:false,
			txnPwd:"",
			otp:"",
			successMessage:"",
			isOnline:"",
			branchNameContinue:"",
			hasOperAccounts:false,
			message:"",
		};

	self.initOprSavingAcctOpen=function(responsesList){
		if(!responsesList[0].hasOwnProperty('errorMessage') && !self.common.fromAuthPage){
			//PROUAT-1427: no Default Selection of currency
			//self.RAKOprSavingAcctOpenReq.selectedCrn = rootScope.appLiterals.APP.RAK_SERVICES.RAKOPRSAVACCOPEN.AED;
			self.RAKOprSavingAcctOpenReq.selectedCrn = "";

				self.RAKOprSavingAcctOpenLists.refAcctNoList = responsesList[0].refAcctNoList;
				if(self.RAKOprSavingAcctOpenLists.refAcctNoList.length != 0)
					self.RAKOprSavingAcctOpenReq.hasOperAccounts=true;

				self.RAKOprSavingAcctOpenLists.branchForKITList = responsesList[0].branchForKITList;
				self.common.EmiratesIdAvailable = responsesList[0].EMIRATEIDAVAILABLE;
				self.RAKOprSavingAcctOpenReq.EmiratesId = responsesList[0].ENumber;
				
				
				if(self.common.EmiratesIdAvailable=='Y'){
					self.RAKOprSavingAcctOpenReq.expDate = new Date(responsesList[0].EExpiry);
					self.common.accountsOpenDisplayDate = responsesList[0].EExpiry;
				}
				else{
					self.RAKOprSavingAcctOpenReq.expDate = new Date();
				}
			
			
				if(Object.prototype.toString.call(self.RAKOprSavingAcctOpenReq.expDate) === "[object Date]"){
					if(isNaN(self.RAKOprSavingAcctOpenReq.expDate.getTime())){
						if(responsesList[0].EExpiry.indexOf("/")!=-1){
							self.RAKOprSavingAcctOpenReq.selectedDate = new Date(responsesList[0].EExpiry.split('/')[1]+"/"+
									responsesList[0].EExpiry.split('/')[0]+"/"+responsesList[0].EExpiry.split('/')[2]);
						}
						else{
							self.RAKOprSavingAcctOpenReq.selectedDate = new Date(responsesList[0].EExpiry.split('-')[1]+"/"+
									responsesList[0].EExpiry.split('-')[0]+"/"+responsesList[0].EExpiry.split('-')[2]);
						}
					}
					else{
						self.RAKOprSavingAcctOpenReq.selectedDate = self.RAKOprSavingAcctOpenReq.expDate;
					}
				}
				else{
					self.RAKOprSavingAcctOpenReq.selectedDate = self.RAKOprSavingAcctOpenReq.expDate;
				}
				

		}
	};

	//: Disc And Apply -- START
	self.setRakOpenOprSavAcctInitBackBtnClicked = function(){
		if (self.RakDiscApply.discAndApplyFlowFlag == true){
			self.RakDiscApply.discAndApplyFlowFlag = false;
			scope.setEvent('onDiscAndapplyBackClicked');
		}
		else{
			scope.setEvent('onRAKOprSavingAcctOpenBackClick');
		}
	};
	//: Disc And Apply -- END

	self.setRAKOprSavingAcctOpenReqDate = function() {
		self.common.displayDate = self.RAKOprSavingAcctOpenReq.selectedDate;
		self.populateCurrentDateDetails(self.RAKOprSavingAcctOpenReq.selectedDate);

		self.RAKOprSavingAcctOpenReq.selectedDate_day =self.common.date;
		self.RAKOprSavingAcctOpenReq.selectedDate_month=self.common.month;
		self.RAKOprSavingAcctOpenReq.selectedDate_year=self.common.year;
    };

    self.confirmRAKOprSavingAcctOpenReq=function(responsesList){
		if(!responsesList[0].hasOwnProperty('errorMessage')){
			if(responsesList[0].hasOwnProperty("auth")){
				self.RAKOprSavingAcctOpenReq.authFlag = responsesList[0].auth;
			}
			if(responsesList[0].hasOwnProperty("selectedBranchDesc")){
				self.RAKOprSavingAcctOpenReq.branchNameContinue = responsesList[0].selectedBranchDesc;
			}
			self.common.message=responsesList[0].MESSAGE ? responsesList[0].MESSAGE :'';
		}
	};

	self.initRAKOprSavingAcctOpenReqSucess = function(responsesList){
		if(!responsesList[0].hasOwnProperty('errorMessage'))
			self.RAKOprSavingAcctOpenReq.successMessage = responsesList[0].successMsg;
	};

	//: Disc And Apply -- START
	self.setRAKOprSavingAcctOpenSuccessHomeBtnClicked = function(){
		if (self.RakDiscApply.discAndApplyFlowFlag == true){
			self.RakDiscApply.discAndApplyFlowFlag = false;
			scope.setEvent('onDiscAndapplyBackClicked');
		}
		else{
		/*	scope.setEvent('onRAKOprSavingAcctOpenOkClick');*/
			scope.setGlobalEvent("onDashboardClick");
		}
	};
	//: Disc And Apply -- END

	self.resetRAKOprSavingAcctOpenReqData=function(){
		self.RAKOprSavingAcctOpenReq.selectedDate_year="";
		self.RAKOprSavingAcctOpenReq.selectedDate_month="";
		self.RAKOprSavingAcctOpenReq.selectedDate_day="";
		self.RAKOprSavingAcctOpenReq.selectedDate= "";
		self.RAKOprSavingAcctOpenReq.selectedRefNo="";
		self.RAKOprSavingAcctOpenReq.selectedCrn="";
		self.RAKOprSavingAcctOpenReq.EmiratesId="";
		self.RAKOprSavingAcctOpenReq.selectedBranch="";
		self.RAKOprSavingAcctOpenReq.authFlag="";
		self.RAKOprSavingAcctOpenReq.auth="";
		self.RAKOprSavingAcctOpenReq.authMode="";
		self.RAKOprSavingAcctOpenReq.authStatus=false;
		self.RAKOprSavingAcctOpenReq.txnPwd="";
		self.RAKOprSavingAcctOpenReq.otp="";
		self.RAKOprSavingAcctOpenReq.successMessage="";
		self.RAKOprSavingAcctOpenReq.debitCardRqd="";
		self.RAKOprSavingAcctOpenReq.branchNameContinue="";
		self.RAKOprSavingAcctOpenReq.hasOperAccounts=false;
		self.common.fromAuthPage=false;
		self.common.message="";
		self.acceptTermscondition='N';
	};

	/*RAK : Open operative savings account : END*/

	/*RAK : Open Evantage Account: START*/

	self.RAKOprEvantageAcctOpenLists={
			refAcctNoList:[],
			branchList:[]
		};

	self.RAKOprEvantageAcctOpenReq = {
			selectedDate_year:"",
			selectedDate_month:"",
			selectedDate_day:"",
			selectedDate:new Date(),
			expDate:new Date(),
			selectedRefNo:"",
			selectedBranch:"",
			selectedCrn:"",
			debitCardRqd:"",
			EmiratesId:"",
			operationMode:"",
			interestBearing:"",
			authFlag:"",
			auth:"",
			authMode:"",
			authStatus:false,
			txnPwd:"",
			otp:"",
			successMessage:"",
			branchNameContinue:"",
			hasOperAccounts:false,
			isJointORAccount:false,
			message:'',
		};

	self.initOprEvantageAcctOpen=function(responsesList){
		if (self.RakDiscApply.isRequestComesFromDiscApply == true){
			self.RakDiscApply.isRequestComesFromDiscApply = false;
			self.resetRAKOprEvantageAcctOpenReqData();
		}
		if(!responsesList[0].hasOwnProperty('errorMessage') && !self.common.fromAuthPage){
				/*self.RAKOprEvantageAcctOpenReq.selectedCrn = rootScope.appLiterals.APP.RAK_SERVICES.RAKOPREVANACCOPEN.AED;*/
				self.RAKOprEvantageAcctOpenReq.selectedCrn ='';


				//CHANGES DONE AS FIX OF 1636 and 1633 START
				self.RAKOprEvantageAcctOpenReq.debitCardRqd = rootScope.appLiterals.APP.RAK_SERVICES.RAKOPRFSACCOPEN.DEBIT_ACC_YES;
				self.RAKOprEvantageAcctOpenReq.debitCardRqd = '';
				self.RAKOprEvantageAcctOpenReq.interestBearing = 'No';
				//CHANGES DONE AS FIX OF 1636 and 1633 END

				self.RAKOprEvantageAcctOpenReq.operationMode = rootScope.appLiterals.APP.RAK_SERVICES.RAKOPREVANACCOPEN.MODE_SINGLE;
				self.RAKOprEvantageAcctOpenLists.refAcctNoList = responsesList[0].refAcctNoList;
				if(self.RAKOprEvantageAcctOpenLists.refAcctNoList.length != 0)
					self.RAKOprEvantageAcctOpenReq.hasOperAccounts=true;

				self.RAKOprEvantageAcctOpenLists.branchList = responsesList[0].branchList;
				self.common.EmiratesIdAvailable = responsesList[0].EMIRATEIDAVAILABLE;
				self.RAKOprEvantageAcctOpenReq.EmiratesId = responsesList[0].ENumber;
				
				
				if(self.common.EmiratesIdAvailable=='Y'){
					self.RAKOprEvantageAcctOpenReq.expDate = new Date(responsesList[0].EExpiry);
					self.common.accountsOpenDisplayDate = responsesList[0].EExpiry;
				}
				else{
					self.RAKOprEvantageAcctOpenReq.expDate = new Date();
				}
			
			
				if(Object.prototype.toString.call(self.RAKOprEvantageAcctOpenReq.expDate) === "[object Date]"){
					if(isNaN(self.RAKOprEvantageAcctOpenReq.expDate.getTime())){
						if(responsesList[0].EExpiry.indexOf("/")!=-1){
							self.RAKOprEvantageAcctOpenReq.selectedDate = new Date(responsesList[0].EExpiry.split('/')[1]+"/"+
									responsesList[0].EExpiry.split('/')[0]+"/"+responsesList[0].EExpiry.split('/')[2]);
						}
						else{
							self.RAKOprEvantageAcctOpenReq.selectedDate = new Date(responsesList[0].EExpiry.split('-')[1]+"/"+
									responsesList[0].EExpiry.split('-')[0]+"/"+responsesList[0].EExpiry.split('-')[2]);
						}
					}
					else{
						self.RAKOprEvantageAcctOpenReq.selectedDate = self.RAKOprEvantageAcctOpenReq.expDate;
					}
				}
				else{
					self.RAKOprEvantageAcctOpenReq.selectedDate = self.RAKOprEvantageAcctOpenReq.expDate;
				}
				

		}

	};

	self.setRAKOprEvantageAcctOpenReqDate = function() {
		if(self.RAKOprEvantageAcctOpenReq.selectedRefNo!='' && self.RAKOprEvantageAcctOpenReq.selectedRefNo != undefined){
			if(self.RAKOprEvantageAcctOpenReq.hasOperAccounts==true && self.RAKOprEvantageAcctOpenLists.refAcctNoList[self.RAKOprEvantageAcctOpenReq.selectedRefNo].mode == 'JOINTOR'){
					self.RAKOprEvantageAcctOpenReq.isJointORAccount = true;
			}
		}

        self.common.displayDate = self.RAKOprEvantageAcctOpenReq.selectedDate;
		self.populateCurrentDateDetails(self.RAKOprEvantageAcctOpenReq.selectedDate);

		self.RAKOprEvantageAcctOpenReq.selectedDate_day =self.common.date;
		self.RAKOprEvantageAcctOpenReq.selectedDate_month=self.common.month;
		self.RAKOprEvantageAcctOpenReq.selectedDate_year=self.common.year;
    };

    self.confirmRAKOprEvantageAcctOpenReq=function(responsesList){
		if(!responsesList[0].hasOwnProperty('errorMessage')){
			if(responsesList[0].hasOwnProperty("auth")){
				self.RAKOprEvantageAcctOpenReq.authFlag = responsesList[0].auth;
			}
			if(responsesList[0].hasOwnProperty("selectedBranchDesc")){
				self.RAKOprEvantageAcctOpenReq.branchNameContinue = responsesList[0].selectedBranchDesc;
			}
			self.common.message=responsesList[0].MESSAGE ? responsesList[0].MESSAGE :'';
		}
	};

	self.initRAKOprEvantageAcctOpenReqSucess = function(responsesList){
		if(!responsesList[0].hasOwnProperty('errorMessage'))
			self.RAKOprEvantageAcctOpenReq.successMessage = responsesList[0].successMsg;
	};

	//: Disc And Apply -- START
	self.setRAKOprEvantageAcctSuccessHomeBtnClicked = function(){
		if (self.RakDiscApply.discAndApplyFlowFlag == true){
			self.RakDiscApply.discAndApplyFlowFlag = false;
			scope.setEvent('onDiscAndapplyBackClicked');
		}
		else{
			/*scope.setEvent('onRAKOprEvantageAcctOpenOkClick');*/
			scope.setGlobalEvent("onDashboardClick");
		}
	};
	//: Disc And Apply -- END

	self.resetRAKOprEvantageAcctOpenReqData=function(){
		self.RAKOprEvantageAcctOpenReq.selectedDate_year="";
		self.RAKOprEvantageAcctOpenReq.selectedDate_month="";
		self.RAKOprEvantageAcctOpenReq.selectedDate_day="";
		self.RAKOprEvantageAcctOpenReq.selectedDate= "";
		self.RAKOprEvantageAcctOpenReq.selectedRefNo="";
		self.RAKOprEvantageAcctOpenReq.selectedCrn="";
		self.RAKOprEvantageAcctOpenReq.EmiratesId="";
		self.RAKOprEvantageAcctOpenReq.debitCardRqd="";
		self.RAKOprEvantageAcctOpenReq.operationMode="";
		self.RAKOprEvantageAcctOpenReq.interestBearing="";
		self.RAKOprEvantageAcctOpenReq.authFlag="";
		self.RAKOprEvantageAcctOpenReq.auth="";
		self.RAKOprEvantageAcctOpenReq.authMode="";
		self.RAKOprEvantageAcctOpenReq.authStatus=false;
		self.RAKOprEvantageAcctOpenReq.txnPwd="";
		self.RAKOprEvantageAcctOpenReq.otp="";
		self.RAKOprEvantageAcctOpenReq.successMessage="";
		self.RAKOprEvantageAcctOpenReq.selectedBranch="";
		self.RAKOprEvantageAcctOpenReq.hasOperAccounts=false;
		self.RAKOprEvantageAcctOpenReq.isJointORAccount=false;
		self.common.fromAuthPage=false;
		self.RAKOprEvantageAcctOpenReq.branchNameContinue="";
		self.common.message="";
	};

	//: Disc And Apply -- START
	self.setRakEvantageInitBackBtnClicked = function(){
		if (self.RakDiscApply.discAndApplyFlowFlag == true){
			self.RakDiscApply.discAndApplyFlowFlag = false;
			scope.setEvent('onDiscAndapplyBackClicked');
		}
		else{
			scope.setEvent('onRAKOprEvantageAcctOpenBackClick');
		}
	};
	//: Disc And Apply -- END



	/*RAK : Open Evantage Account: END*/

	/*RAK : Open FS Account: START*/

	 self.RAKOprFSAcctOpenLists={

				refAcctNoList:[],
				branchList:[]
			};

		self.RAKOprFSAcctOpenReq = {
				selectedDate_year:"",
				selectedDate_month:"",
				selectedDate_day:"",
				selectedDate:new Date(),
				expDate:new Date(),
				selectedRefNo:"",
				selectedBranch:"",
				selectedCrn:"",
				debitCardRqd:"",
				EmiratesId:"",
				operationMode:"",
				interestBearing:"",
				authFlag:"",
				auth:"",
				authMode:"",
				authStatus:false,
				txnPwd:"",
				otp:"",
				successMessage:"",
				branchNameContinue:"",
				hasOperAccounts:false,
				isJointORAccount:false,
				isAEDSelected:false,
				message:"",
				
				emirateList:[],
		        emiBranchList:[],
		        emirateSeletected:"",
		        emiCategorizedBranchList:[],
		        isEmiSelected:false,
		        emiSelDesc:"",

			};

	self.initOprFSAcctOpen=function(responsesList){

		if (self.RakDiscApply.isRequestComesFromDiscApply == true){
			self.RakDiscApply.isRequestComesFromDiscApply = false;
			self.resetRAKOprFSAcctOpenReqData();
		}
		if(!responsesList[0].hasOwnProperty('errorMessage')){

			if(!responsesList[0].hasOwnProperty('errorMessage') && !self.common.fromAuthPage){
				/*self.RAKOprFSAcctOpenReq.selectedCrn = rootScope.appLiterals.APP.RAK_SERVICES.RAKOPRFSACCOPEN.AED;*/
				self.RAKOprFSAcctOpenReq.selectedCrn = '';
				self.RAKOprFSAcctOpenReq.debitCardRqd = 'Yes';
				self.RAKOprFSAcctOpenReq.operationMode = rootScope.appLiterals.APP.RAK_SERVICES.RAKOPRFSACCOPEN.MODE_SINGLE;



				if(responsesList[0].hasOwnProperty('refAcctNoList')){
					self.RAKOprFSAcctOpenLists.refAcctNoList = responsesList[0].refAcctNoList;
				}

					if(self.RAKOprFSAcctOpenLists.refAcctNoList.length != 0){
						self.RAKOprFSAcctOpenReq.hasOperAccounts=true;
					}

				if(responsesList[0].hasOwnProperty('branchList')){
					self.RAKOprFSAcctOpenReq.branchList = responsesList[0].branchList;
				}
				
				if (responsesList[0].hasOwnProperty('emirateList')) {
					self.RAKOprFSAcctOpenReq.emirateList = responsesList[0].emirateList;
				}

				if (responsesList[0].hasOwnProperty('emiBranchList')) {
					self.RAKOprFSAcctOpenReq.emiBranchList = responsesList[0].emiBranchList;
				}
				
				self.common.EmiratesIdAvailable = responsesList[0].EMIRATEIDAVAILABLE;
				self.RAKOprFSAcctOpenReq.EmiratesId = responsesList[0].ENumber;
				
				
				if(self.common.EmiratesIdAvailable=='Y'){
					self.RAKOprFSAcctOpenReq.expDate = new Date(responsesList[0].EExpiry);
					self.common.accountsOpenDisplayDate = responsesList[0].EExpiry;
				}
				else{
					self.RAKOprFSAcctOpenReq.expDate = new Date();
				}
			
			
				if(Object.prototype.toString.call(self.RAKOprFSAcctOpenReq.expDate) === "[object Date]"){
					if(isNaN(self.RAKOprFSAcctOpenReq.expDate.getTime())){
						if(responsesList[0].EExpiry.indexOf("/")!=-1){
							self.RAKOprFSAcctOpenReq.selectedDate = new Date(responsesList[0].EExpiry.split('/')[1]+"/"+
									responsesList[0].EExpiry.split('/')[0]+"/"+responsesList[0].EExpiry.split('/')[2]);
						}
						else{
							self.RAKOprFSAcctOpenReq.selectedDate = new Date(responsesList[0].EExpiry.split('-')[1]+"/"+
									responsesList[0].EExpiry.split('-')[0]+"/"+responsesList[0].EExpiry.split('-')[2]);
						}
					}
					else{
						self.RAKOprFSAcctOpenReq.selectedDate = self.RAKOprFSAcctOpenReq.expDate;
					}
				}
				else{
					self.RAKOprFSAcctOpenReq.selectedDate = self.RAKOprFSAcctOpenReq.expDate;
				}
				
				
				


			}

		}
	};
	
	 self.RAKOprFSAcctOpenReqOptionChange = function() {

			var branchListCount = 0;
			var emBranchDesc = [];
			self.RAKOprFSAcctOpenReq.emiCategorizedBranchList = [];
			self.RAKOprFSAcctOpenReq.isEmiSelected = true;
			self.RAKOprFSAcctOpenReq.selectedBranch='';
			for (var x = 0; x < self.RAKOprFSAcctOpenReq.emiBranchList.length; x++) {
				if (self.RAKOprFSAcctOpenReq.emiBranchList[x].code == self.RAKOprFSAcctOpenReq.emirateSeletected) {
					emBranchDesc = self.RAKOprFSAcctOpenReq.emiBranchList[x].codeDesc
							.split("|");
					break;
				}
			}

			for (var x = 0; x < emBranchDesc.length; x++) {
				for (var y = 0; y < self.RAKOprFSAcctOpenReq.branchList.length; y++) {
					if (emBranchDesc[x] == self.RAKOprFSAcctOpenReq.branchList[y].branchIndex) {
						self.RAKOprFSAcctOpenReq.emiCategorizedBranchList[branchListCount] = self.RAKOprFSAcctOpenReq.branchList[y];
						branchListCount++;
					}
				}
			}

		};
	

	//: Disc And Apply -- START
	self.setRakOpenOprFsAcctInitBackBtnClicked = function(){
		if (self.RakDiscApply.discAndApplyFlowFlag == true){
			self.RakDiscApply.discAndApplyFlowFlag = false;
			scope.setEvent('onDiscAndapplyBackClicked');
		}
		else{
			scope.setEvent('onRAKOprFSAcctOpenBackClick');
		}
	};
	//: Disc And Apply -- END

	self.setRAKOprFSAcctOpenReqDate = function() {
		if(self.RAKOprFSAcctOpenReq.selectedRefNo!='' && self.RAKOprFSAcctOpenReq.selectedRefNo!=undefined){
			if(self.RAKOprFSAcctOpenReq.hasOperAccounts==true && self.RAKOprFSAcctOpenLists.refAcctNoList[self.RAKOprFSAcctOpenReq.selectedRefNo].mode == 'JOINTOR'){
				self.RAKOprFSAcctOpenReq.isJointORAccount = true;
			}
		}
		if(self.RAKOprFSAcctOpenReq.selectedCrn == 'AED'){
			self.RAKOprFSAcctOpenReq.isAEDSelected = true;
		}
		else{
			self.RAKOprFSAcctOpenReq.debitCardRqd = 'No';
		}
		self.common.displayDate = self.RAKOprFSAcctOpenReq.selectedDate;
		self.populateCurrentDateDetails(self.RAKOprFSAcctOpenReq.selectedDate);

		self.RAKOprFSAcctOpenReq.selectedDate_day =self.common.date;
		self.RAKOprFSAcctOpenReq.selectedDate_month=self.common.month;
		self.RAKOprFSAcctOpenReq.selectedDate_year=self.common.year;
	};

	 self.confirmRAKOprFSAcctOpenReq=function(responsesList){
			if(!responsesList[0].hasOwnProperty('errorMessage')){
				if(responsesList[0].hasOwnProperty("auth")){
					self.RAKOprFSAcctOpenReq.authFlag = responsesList[0].auth;
				}
				if(responsesList[0].hasOwnProperty("selectedBranchDesc")){
					self.RAKOprFSAcctOpenReq.branchNameContinue = responsesList[0].selectedBranchDesc;
				}
				self.common.message=responsesList[0].MESSAGE ? responsesList[0].MESSAGE :'';
				
				
				for (var x=0; x<self.RAKOprFSAcctOpenReq.emirateList.length;x++)
				{
				if (self.RAKOprFSAcctOpenReq.emirateList[x].code==self.RAKOprFSAcctOpenReq.emirateSeletected)
				{
					self.RAKOprFSAcctOpenReq.emiSelDesc =self.RAKOprFSAcctOpenReq.emirateList[x].codeDesc;
				}
				}
			}
		};

		self.initRAKOprFSAcctOpenReqSucess = function(responsesList){
			if(!responsesList[0].hasOwnProperty('errorMessage'))
				self.RAKOprFSAcctOpenReq.successMessage = responsesList[0].successMsg;
		};

		//: Disc And Apply -- START
		self.setRAKOprFSAcctOpenSuccessHomeBtnClicked = function(){
			if (self.RakDiscApply.discAndApplyFlowFlag == true){
				self.RakDiscApply.discAndApplyFlowFlag = false;
				scope.setEvent('onDiscAndapplyBackClicked');
			}
			else{
				/*scope.setEvent('onRAKOprFSAcctOpenOkClick');*/
				scope.setGlobalEvent("onDashboardClick");
			}
		};
		//: Disc And Apply -- END


		self.resetRAKOprFSAcctOpenReqData=function(){
			self.RAKOprFSAcctOpenReq.selectedDate_year="";
			self.RAKOprFSAcctOpenReq.selectedDate_month="";
			self.RAKOprFSAcctOpenReq.selectedDate_day="";
			self.RAKOprFSAcctOpenReq.selectedDate= "";
			self.RAKOprFSAcctOpenReq.selectedRefNo="";
			self.RAKOprFSAcctOpenReq.selectedCrn="";
			self.RAKOprFSAcctOpenReq.EmiratesId="";
			self.RAKOprFSAcctOpenReq.selectedBranch="";
			self.RAKOprFSAcctOpenReq.authFlag="";
			self.RAKOprFSAcctOpenReq.auth="";
			self.RAKOprFSAcctOpenReq.authMode="";
			self.RAKOprFSAcctOpenReq.authStatus=false;
			self.RAKOprFSAcctOpenReq.txnPwd="";
			self.RAKOprFSAcctOpenReq.otp="";
			self.RAKOprFSAcctOpenReq.successMessage="";
			self.RAKOprFSAcctOpenReq.debitCardRqd="";
			self.RAKOprFSAcctOpenReq.branchNameContinue="";
			self.RAKOprFSAcctOpenReq.hasOperAccounts=false;
			self.common.fromAuthPage=false;
			self.RAKOprFSAcctOpenReq.isJointORAccount=false;
			self.RAKOprFSAcctOpenReq.isAEDSelected=false;
			self.common.message="";
			
			self.RAKOprFSAcctOpenReq.emirateList= "";
			self.RAKOprFSAcctOpenReq.emiBranchList= "";
			self.RAKOprFSAcctOpenReq.emirateSeletected= "";
			self.RAKOprFSAcctOpenReq.emiCategorizedBranchList= "";
			self.RAKOprFSAcctOpenReq.isEmiSelected=false;
			self.RAKOprFSAcctOpenReq.emiSelDesc= "";
		};


	/*RAK : Open FS Account: END*/

		/*RAK : Open Current Account: START*/

		self.RAKOprCurrentAcctOpenLists={
				refAcctNoList:[],
				branchForKITList:[]
			};

		self.RAKOprCurrentAcctOpenReq = {
				selectedDate_year:"",
				selectedDate_month:"",
				selectedDate_day:"",
				selectedDate:new Date(),
				expDate:new Date(),
				selectedRefNo:"",
				selectedBranch:"",
				selectedCrn:"",
				debitCardRqd:"",
				EmiratesId:"",
				uaeResident:"",
				chkBookRqd:"",
				intrstRAKValue:"",
				authFlag:"",
				auth:"",
				authMode:"",
				authStatus:false,
				txnPwd:"",
				otp:"",
				successMessage:"",
				hasOperAccounts:false,
				visaExpiryDate_year:"",
				visaExpiryDate_month:"",
				visaExpiryDate_day:"",
				visaExpiryDate:new Date(),
				isUaeResident:false,
				isAEDSelected:false,
				isChqBookRqd:false,
				branchNameContinue:"",
				isIntrstRAKValueRqd:false,
				message:"",
				previewDateOne:"",
				
			};

		self.initOprCurrentAcctOpen=function(responsesList){
			if (self.RakDiscApply.isRequestComesFromDiscApply == true){
				self.RakDiscApply.isRequestComesFromDiscApply = false;
				self.resetRAKOprCurrentAcctOpenReqData();
			}
			if(!responsesList[0].hasOwnProperty('errorMessage') && !self.common.fromAuthPage){
				//PROUAT-1432: no Default Selection of currency
				/*self.RAKOprCurrentAcctOpenReq.selectedCrn = rootScope.appLiterals.APP.RAK_SERVICES.RAKOPRFSACCOPEN.AED;*/
				self.RAKOprCurrentAcctOpenReq.selectedCrn = '';
				self.RAKOprCurrentAcctOpenReq.uaeResident = '';


					self.RAKOprCurrentAcctOpenLists.refAcctNoList = responsesList[0].refAcctNoList;
					if(self.RAKOprCurrentAcctOpenLists.refAcctNoList.length != 0)
						self.RAKOprCurrentAcctOpenReq.hasOperAccounts=true;

					self.RAKOprCurrentAcctOpenLists.branchForKITList = responsesList[0].branchForKITList;
					
					
					self.common.EmiratesIdAvailable = responsesList[0].EMIRATEIDAVAILABLE;
					self.RAKOprCurrentAcctOpenReq.EmiratesId = responsesList[0].ENumber;
					
					
					if(self.common.EmiratesIdAvailable=='Y'){
						self.RAKOprCurrentAcctOpenReq.expDate = new Date(responsesList[0].EExpiry);
						self.common.accountsOpenDisplayDate = responsesList[0].EExpiry;
					}
					else{
						self.RAKOprCurrentAcctOpenReq.expDate = new Date();
					}
				
				
					if(Object.prototype.toString.call(self.RAKOprCurrentAcctOpenReq.expDate) === "[object Date]"){
						if(isNaN(self.RAKOprCurrentAcctOpenReq.expDate.getTime())){
							if(responsesList[0].EExpiry.indexOf("/")!=-1){
								self.RAKOprCurrentAcctOpenReq.selectedDate = new Date(responsesList[0].EExpiry.split('/')[1]+"/"+
										responsesList[0].EExpiry.split('/')[0]+"/"+responsesList[0].EExpiry.split('/')[2]);
							}
							else{
								self.RAKOprCurrentAcctOpenReq.selectedDate = new Date(responsesList[0].EExpiry.split('-')[1]+"/"+
										responsesList[0].EExpiry.split('-')[0]+"/"+responsesList[0].EExpiry.split('-')[2]);
							}
						}
						else{
							self.RAKOprCurrentAcctOpenReq.selectedDate = self.RAKOprCurrentAcctOpenReq.expDate;
						}
					}
					else{
						self.RAKOprCurrentAcctOpenReq.selectedDate = self.RAKOprCurrentAcctOpenReq.expDate;
					}
					
					
					
					

			}


		};

		//: Disc And Apply -- START
		self.setRakOpenCurrAcctInitBackBtnClicked = function(){
			if (self.RakDiscApply.discAndApplyFlowFlag == true){
				self.RakDiscApply.discAndApplyFlowFlag = false;
				scope.setEvent('onDiscAndapplyBackClicked');
			}
			else{
				scope.setEvent('onRAKOprCurrentAcctOpenBackClick');
			}
		};
		//: Disc And Apply -- END

		//: Disc And Apply -- START
		self.setRakOpenCuurAcctInitBackBtnClicked = function(){
			if (self.RakDiscApply.discAndApplyFlowFlag == true){
				self.RakDiscApply.discAndApplyFlowFlag = false;
				scope.setEvent('onDiscAndapplyBackClicked');
			}
			else{
				scope.setEvent('onRAKOprCurrentAcctOpenBackClick');
			}
		};
		//: Disc And Apply -- END

		self.setRAKOprCurrentAcctOpenReqDate = function() {

			if(self.RAKOprCurrentAcctOpenReq.uaeResident == 'Yes')
				self.RAKOprCurrentAcctOpenReq.isUaeResident = true;
			else
				self.RAKOprCurrentAcctOpenReq.isUaeResident = false;

			if(self.RAKOprCurrentAcctOpenReq.selectedCrn == 'AED')
				self.RAKOprCurrentAcctOpenReq.isAEDSelected = true;
			else
				self.RAKOprCurrentAcctOpenReq.isAEDSelected = false;

			if(self.RAKOprCurrentAcctOpenReq.isAEDSelected==true && self.RAKOprCurrentAcctOpenReq.hasOperAccounts==true){
				self.RAKOprCurrentAcctOpenReq.isChqBookRqd = true;
				self.RAKOprCurrentAcctOpenReq.isIntrstRAKValueRqd = true;
			}
			else{
				self.RAKOprCurrentAcctOpenReq.isChqBookRqd = false;
				self.RAKOprCurrentAcctOpenReq.isIntrstRAKValueRqd = false;
			}



			self.common.displayDate = self.RAKOprCurrentAcctOpenReq.selectedDate;
			self.populateCurrentDateDetails(self.RAKOprCurrentAcctOpenReq.selectedDate);

			self.RAKOprCurrentAcctOpenReq.selectedDate_day =self.common.date;
			self.RAKOprCurrentAcctOpenReq.selectedDate_month=self.common.month;
			self.RAKOprCurrentAcctOpenReq.selectedDate_year=self.common.year;

			self.common.displayDate = self.RAKOprCurrentAcctOpenReq.visaExpiryDate;
			self.populateCurrentDateDetails(self.RAKOprCurrentAcctOpenReq.visaExpiryDate);

			self.RAKOprCurrentAcctOpenReq.visaExpiryDate_day =self.common.date;
			self.RAKOprCurrentAcctOpenReq.visaExpiryDate_month=self.common.month;
			self.RAKOprCurrentAcctOpenReq.visaExpiryDate_year=self.common.year;

	    };


		self.confirmRAKOprCurrentAcctOpenReq=function(responsesList){
			if(!responsesList[0].hasOwnProperty('errorMessage')){
				if(responsesList[0].hasOwnProperty("auth")){
					self.RAKOprCurrentAcctOpenReq.authFlag = responsesList[0].auth;
				}
				if(responsesList[0].hasOwnProperty("selectedBranchDesc")){
					self.RAKOprCurrentAcctOpenReq.branchNameContinue = responsesList[0].selectedBranchDesc;
				}
				self.common.message=responsesList[0].MESSAGE ? responsesList[0].MESSAGE :'';
				
				if (responsesList[0].hasOwnProperty('previewDate')) {
					self.RAKOprCurrentAcctOpenReq.previewDateOne = responsesList[0].previewDate;
				}
			}
		};

		self.initRAKOprCurrentAcctOpenReqSucess = function(responsesList){
			if(!responsesList[0].hasOwnProperty('errorMessage'))
				self.RAKOprCurrentAcctOpenReq.successMessage = responsesList[0].successMsg;
		};

		//: Disc And Apply -- START
		self.setRAKOprCurrentAcctOpenSuccessHomeBtnClicked = function(){
			if (self.RakDiscApply.discAndApplyFlowFlag == true){
				self.RakDiscApply.discAndApplyFlowFlag = false;
				scope.setEvent('onDiscAndapplyBackClicked');
			}
			else{
				/*scope.setEvent('onRAKOprCurrentAcctOpenOkClick');*/
				scope.setGlobalEvent("onDashboardClick");
			}
		};
		//: Disc And Apply -- END

		self.resetRAKOprCurrentAcctOpenReqData=function(){
			self.RAKOprCurrentAcctOpenReq.selectedDate_year="";
			self.RAKOprCurrentAcctOpenReq.selectedDate_month="";
			self.RAKOprCurrentAcctOpenReq.selectedDate_day="";
			self.RAKOprCurrentAcctOpenReq.selectedDate= "";
			self.RAKOprCurrentAcctOpenReq.visaExpiryDate_year="";
			self.RAKOprCurrentAcctOpenReq.visaExpiryDate_month="";
			self.RAKOprCurrentAcctOpenReq.visaExpiryDate_day="";
			self.RAKOprCurrentAcctOpenReq.visaExpiryDate= "";
			self.RAKOprCurrentAcctOpenReq.chkBookRqd="No";
			self.RAKOprCurrentAcctOpenReq.intrstRAKValue="No";
			self.RAKOprCurrentAcctOpenReq.uaeResident="";
			self.RAKOprCurrentAcctOpenReq.selectedRefNo="";
			self.RAKOprCurrentAcctOpenReq.selectedCrn="";
			self.RAKOprCurrentAcctOpenReq.EmiratesId="";
			self.RAKOprCurrentAcctOpenReq.selectedBranch="";
			self.RAKOprCurrentAcctOpenReq.authFlag="";
			self.RAKOprCurrentAcctOpenReq.auth="";
			self.RAKOprCurrentAcctOpenReq.authMode="";
			self.RAKOprCurrentAcctOpenReq.authStatus=false;
			self.RAKOprCurrentAcctOpenReq.txnPwd="";
			self.RAKOprCurrentAcctOpenReq.otp="";
			self.RAKOprCurrentAcctOpenReq.successMessage="";
			self.RAKOprCurrentAcctOpenReq.debitCardRqd="";
			self.RAKOprCurrentAcctOpenReq.hasOperAccounts=false;
			self.RAKOprCurrentAcctOpenReq.isUaeResident=false;
			self.common.fromAuthPage=false;
			self.RAKOprCurrentAcctOpenReq.isAEDSelected=false;
			self.RAKOprCurrentAcctOpenReq.branchNameContinue="";
			self.common.message="";
			self.RAKOprCurrentAcctOpenReq.EmiratesIdAvailable="Y";
			self.acceptTermscondition='N';
			self.RAKOprCurrentAcctOpenReq.previewDateOne = "";

		};

		/*RAK : Open Current Account: END*/

		/*RAK : Open Islamic Account: START*/

		 	self.RAKOprIslamicAcctOpenLists={

					refAcctNoList:[],
					branchList:[],
					emirateList:[],
					emiBranchList:[]
				};

			self.RAKOprIslamicAcctOpenReq = {
					selectedDate_year:"",
					selectedDate_month:"",
					selectedDate_day:"",
					selectedDate:new Date(),
					expDate:new Date(),
					selectedRefNo:"",
					selectedBranch:"",
					selectedCrn:"",
					debitCardRqd:"",
					EmiratesId:"",
					operationMode:"",
					interestBearing:"",
					authFlag:"",
					auth:"",
					authMode:"",
					authStatus:false,
					txnPwd:"",
					otp:"",
					branchNameContinue:"",
					successMessage:"",
					hasOperAccounts:false,
					isJointORAccount:false,
					isAEDSelected:false,
					message:"",
					  emirateSeletected:"",
				        emiCategorizedBranchList:[],
				        isEmiSelected:false,
				        emiSelDesc:"",
				};

		self.initOprIslamicAcctOpen=function(responsesList){
			if (self.RakDiscApply.isRequestComesFromDiscApply == true){
				self.RakDiscApply.isRequestComesFromDiscApply = false;
				self.resetRAKOprIslamicAcctOpenReqData();
			}
				if(!responsesList[0].hasOwnProperty('errorMessage') && !self.common.fromAuthPage){
					self.RAKOprIslamicAcctOpenReq.operationMode = rootScope.appLiterals.APP.RAK_SERVICES.RAKOPRISLAMICACCOPEN.MODE_SINGLE;
					self.RAKOprIslamicAcctOpenReq.debitCardRqd = '';



						self.RAKOprIslamicAcctOpenLists.refAcctNoList = responsesList[0].refAcctNoList;
						if(self.RAKOprIslamicAcctOpenLists.refAcctNoList.length != 0)
							self.RAKOprIslamicAcctOpenReq.hasOperAccounts=true;

						
						
						if(responsesList[0].hasOwnProperty('branchList')){
							self.RAKOprIslamicAcctOpenLists.branchList = responsesList[0].branchList;
						}
						
						if (responsesList[0].hasOwnProperty('emirateList')) {
							self.RAKOprIslamicAcctOpenLists.emirateList = responsesList[0].emirateList;
						}

						if (responsesList[0].hasOwnProperty('emiBranchList')) {
							self.RAKOprIslamicAcctOpenLists.emiBranchList = responsesList[0].emiBranchList;
						}
						
						self.common.EmiratesIdAvailable = responsesList[0].EMIRATEIDAVAILABLE;
						self.RAKOprIslamicAcctOpenReq.EmiratesId = responsesList[0].ENumber;
						
						
						if(self.common.EmiratesIdAvailable=='Y'){
							self.RAKOprIslamicAcctOpenReq.expDate = new Date(responsesList[0].EExpiry);
							self.common.accountsOpenDisplayDate = responsesList[0].EExpiry;
						}
						else{
							self.RAKOprIslamicAcctOpenReq.expDate = new Date();
						}
					
					
						if(Object.prototype.toString.call(self.RAKOprIslamicAcctOpenReq.expDate) === "[object Date]"){
							if(isNaN(self.RAKOprIslamicAcctOpenReq.expDate.getTime())){
								if(responsesList[0].EExpiry.indexOf("/")!=-1){
									self.RAKOprIslamicAcctOpenReq.selectedDate = new Date(responsesList[0].EExpiry.split('/')[1]+"/"+
											responsesList[0].EExpiry.split('/')[0]+"/"+responsesList[0].EExpiry.split('/')[2]);
								}
								else{
									self.RAKOprIslamicAcctOpenReq.selectedDate = new Date(responsesList[0].EExpiry.split('-')[1]+"/"+
											responsesList[0].EExpiry.split('-')[0]+"/"+responsesList[0].EExpiry.split('-')[2]);
								}
							}
							else{
								self.RAKOprIslamicAcctOpenReq.selectedDate = self.RAKOprIslamicAcctOpenReq.expDate;
							}
						}
						else{
							self.RAKOprIslamicAcctOpenReq.selectedDate = self.RAKOprIslamicAcctOpenReq.expDate;
						}
						

				}


		};
		
		 self.RakOprIslamicAcctOpenOptionChange = function() {

				var branchListCount = 0;
				var emBranchDesc = [];
				self.RAKOprIslamicAcctOpenReq.emiCategorizedBranchList = [];
				self.RAKOprIslamicAcctOpenReq.isEmiSelected = true;
				self.RAKOprIslamicAcctOpenReq.selectedBranch='';
				for (var x = 0; x < self.RAKOprIslamicAcctOpenLists.emiBranchList.length; x++) {
					if (self.RAKOprIslamicAcctOpenLists.emiBranchList[x].code == self.RAKOprIslamicAcctOpenReq.emirateSeletected) {
						emBranchDesc = self.RAKOprIslamicAcctOpenLists.emiBranchList[x].codeDesc
								.split("|");
						break;
					}
				}

				for (var x = 0; x < emBranchDesc.length; x++) {
					for (var y = 0; y < self.RAKOprIslamicAcctOpenLists.branchList.length; y++) {
						if (emBranchDesc[x] == self.RAKOprIslamicAcctOpenLists.branchList[y].branchIndex) {
							self.RAKOprIslamicAcctOpenReq.emiCategorizedBranchList[branchListCount] = self.RAKOprIslamicAcctOpenLists.branchList[y];
							branchListCount++;
						}
					}
				}

		};

		//: Disc And Apply -- START
		self.setRakOprIslamicAcctOpenBackBtnClicked = function(){
			if (self.RakDiscApply.discAndApplyFlowFlag == true){
				self.RakDiscApply.discAndApplyFlowFlag = false;
				scope.setEvent('onDiscAndapplyBackClicked');
			}
			else{
				scope.setEvent('onRAKOprIslamicAcctOpenBackClick');
			}
		};
		//: Disc And Apply -- END

		self.setRAKOprIslamicAcctOpenReqDate = function() {
			if(self.RAKOprIslamicAcctOpenReq.selectedRefNo!='' && self.RAKOprIslamicAcctOpenReq.selectedRefNo != undefined){
				if(self.RAKOprIslamicAcctOpenReq.hasOperAccounts==true && self.RAKOprIslamicAcctOpenLists.refAcctNoList[self.RAKOprIslamicAcctOpenReq.selectedRefNo].mode == 'JOINTOR'){
					self.RAKOprIslamicAcctOpenReq.isJointORAccount = true;
				}
			}

			if(self.RAKOprIslamicAcctOpenReq.selectedCrn == 'AED'){
				self.RAKOprIslamicAcctOpenReq.isAEDSelected = true;
			}
			self.common.displayDate = self.RAKOprIslamicAcctOpenReq.selectedDate;
			self.populateCurrentDateDetails(self.RAKOprIslamicAcctOpenReq.selectedDate);

			self.RAKOprIslamicAcctOpenReq.selectedDate_day =self.common.date;
			self.RAKOprIslamicAcctOpenReq.selectedDate_month=self.common.month;
			self.RAKOprIslamicAcctOpenReq.selectedDate_year=self.common.year;
		};

		 self.confirmRAKOprIslamicAcctOpenReq=function(responsesList){
				if(!responsesList[0].hasOwnProperty('errorMessage')){
					if(responsesList[0].hasOwnProperty("auth")){
						self.RAKOprIslamicAcctOpenReq.authFlag = responsesList[0].auth;
					}
					if(responsesList[0].hasOwnProperty("selectedBranchDesc")){
						self.RAKOprIslamicAcctOpenReq.branchNameContinue = responsesList[0].selectedBranchDesc;
					}
					self.common.message=responsesList[0].MESSAGE ? responsesList[0].MESSAGE :'';
				}
			};

			self.initRAKOprIslamicAcctOpenReqSucess = function(responsesList){
				if(!responsesList[0].hasOwnProperty('errorMessage'))
					self.RAKOprIslamicAcctOpenReq.successMessage = responsesList[0].successMsg;
			};

			//: Disc And Apply -- START
			self.setRAKOprIslamicAcctOpenSuccessHomeBtnClicked = function(){
				if (self.RakDiscApply.discAndApplyFlowFlag == true){
					self.RakDiscApply.discAndApplyFlowFlag = false;
					scope.setEvent('onDiscAndapplyBackClicked');
				}
				else{
					/*scope.setEvent('onRAKOprIslamicAcctOpenOkClick');*/
					scope.setGlobalEvent("onDashboardClick");
				}
			};
			//: Disc And Apply -- END

			self.resetRAKOprIslamicAcctOpenReqData=function(){
				self.RAKOprIslamicAcctOpenReq.selectedDate_year="";
				self.RAKOprIslamicAcctOpenReq.selectedDate_month="";
				self.RAKOprIslamicAcctOpenReq.selectedDate_day="";
				self.RAKOprIslamicAcctOpenReq.selectedDate= "";
				self.RAKOprIslamicAcctOpenReq.selectedRefNo="";
				self.RAKOprIslamicAcctOpenReq.selectedCrn="";
				self.RAKOprIslamicAcctOpenReq.EmiratesId="";
				self.RAKOprIslamicAcctOpenReq.selectedBranch="";
				self.RAKOprIslamicAcctOpenReq.authFlag="";
				self.RAKOprIslamicAcctOpenReq.auth="";
				self.RAKOprIslamicAcctOpenReq.authMode="";
				self.RAKOprIslamicAcctOpenReq.authStatus=false;
				self.RAKOprIslamicAcctOpenReq.txnPwd="";
				self.RAKOprIslamicAcctOpenReq.otp="";
				self.RAKOprIslamicAcctOpenReq.successMessage="";
				self.RAKOprIslamicAcctOpenReq.debitCardRqd="";
				self.RAKOprIslamicAcctOpenReq.hasOperAccounts=false;
				self.RAKOprIslamicAcctOpenReq.isJointORAccount=false;
				self.RAKOprIslamicAcctOpenReq.branchNameContinue="";
				self.RAKOprIslamicAcctOpenReq.isAEDSelected=false;
				self.common.fromAuthPage=false;
				self.common.message="";
				
				self.RAKOprIslamicAcctOpenLists.emirateList= "";
				self.RAKOprIslamicAcctOpenLists.emiBranchList= "";
				self.RAKOprIslamicAcctOpenReq.emirateSeletected= "";
				self.RAKOprIslamicAcctOpenReq.emiCategorizedBranchList= "";
				self.RAKOprIslamicAcctOpenReq.isEmiSelected=false;
				self.RAKOprIslamicAcctOpenReq.emiSelDesc= "";
			};

		/*RAK : Open Islamic Account: END*/



	/*RAK ::  Start for Debit Card Block and Unblock */
	self.rakUnblockDebitCardBlock={
			cardList:[],
			expDate:"",
			reason:"",
			other:"",
			selectedCard:"",
			reasonList:[],
			confirmExpDate:"",
			authStatus:true,
			authMode :"",
			txnPwd:"",
			successMessage:"",
			otherMandatory:"true",
			confirmedReason:"",
			confirmedCard:"",
			expDateFlag:false,
			message:"",

			resetUnblockDebitCardBlockConfirm :function()
			{
				self.rakUnblockDebitCardBlock.txnPwd="";
				self.rakUnblockDebitCardBlock.confirmedReason= "";
				self.common.message="";
			}
	};

	self.rakUnblockDebitCardBlockInit=function(responselist){
		if (!responselist[0].hasOwnProperty('errorMessage'))
		{

		if (responselist[0].hasOwnProperty('debitCardList'))
		{
			self.rakUnblockDebitCardBlock.cardList=responselist[0].debitCardList;
		}
		if (responselist[0].hasOwnProperty('reasonList'))
		{
			self.rakUnblockDebitCardBlock.reasonList=responselist[0].reasonList;
		}
		}
	};


	self.rakUnblockDebitCardBlockSuccess=function(responselist){

		if (!responselist[0].hasOwnProperty('errorMessage'))
		{
			self.rakUnblockDebitCardBlock.successMessage=responselist[0].successRequest;
		}
	};
	self.rakUnblockDebitCardBlockDate=function()
	{
		self.rakUnblockDebitCardBlock.confirmExpDate=self.rakUnblockDebitCardBlock.expDate.toString();
	};

	self.rakUnblockDebitCardBlockSetExpiryDate=function()
	{
		//CHANGES TO SHOW EXPIRY DATE IN IOS DEVICE INSTEAD OF NAN-NAN-NAN START
		//self.rakUnblockDebitCardBlock.expDate= self.setFormatedDate(self.rakUnblockDebitCardBlock.cardList[self.rakUnblockDebitCardBlock.selectedCard].expiryDate);
		self.rakUnblockDebitCardBlock.expDate= self.rakUnblockDebitCardBlock.cardList[self.rakUnblockDebitCardBlock.selectedCard].expiryDate;
		//CHANGES TO SHOW EXPIRY DATE IN IOS DEVICE INSTEAD OF NAN-NAN-NAN END
	};

	self.rakUnblockDebitCardBlockConfirm=function(responsesList){


for (var i =0 ; i < self.rakUnblockDebitCardBlock.reasonList.length ; i++)

		{  if (self.rakUnblockDebitCardBlock.reasonList[i].reasonIndex==self.rakUnblockDebitCardBlock.reason)
			self.rakUnblockDebitCardBlock.confirmedReason = self.rakUnblockDebitCardBlock.reasonList[i].reasonDesc;

		}


		if (!responsesList[0].hasOwnProperty('errorMessage'))
		{
			if(responsesList[0].auth == "")
				self.rakUnblockDebitCardBlock.authStatus=false;
			else 
			{
				self.rakUnblockDebitCardBlock.authStatus=true;
				self.rakUnblockDebitCardBlock.authMode = responsesList[0].auth;
			}

		}

		if (responsesList[0].hasOwnProperty('cardNo'))
		{
			self.rakUnblockDebitCardBlock.confirmedCard =responsesList[0].cardNo;
		}

		self.common.message=responsesList[0].MESSAGE ? responsesList[0].MESSAGE :'';
	};

	self.resetUnblockDebitCardBlockHome =function()
	{
		self.rakUnblockDebitCardBlock.cardList=[];
		self.rakUnblockDebitCardBlock.reasonList=[];
		self.rakUnblockDebitCardBlock.selectedCard="";
		self.rakUnblockDebitCardBlock.reason="";
		self.rakUnblockDebitCardBlock.other="";
		self.rakUnblockDebitCardBlock.expDate="";
		self.rakUnblockDebitCardBlock.otherMandatory=false;
		self.rakUnblockDebitCardBlock.confirmedReason= "";
		self.rakUnblockDebitCardBlock.expDateFlag=false;
	};
	self.rakUnblockDebitCardBlockOthers=function()
	{
		if (self.rakUnblockDebitCardBlock.reason=='Others'){
			self.rakUnblockDebitCardBlock.otherMandatory=true;
		}
		else{
			self.rakUnblockDebitCardBlock.otherMandatory=false;
		}

	};



	self.rakTempDebitCardBlock={
			cardList:[],
			expDate:"",
			reason:"",
			other:"",
			selectedCard:"",
			confirmedCard:"",
			reasonList:[],
			confirmExpDate:"",
			authStatus:true,
			authMode :"",
			txnPwd:"",
			successMessage:"",
			confirmedReason:"",
			otherMandatory:false,
			expDateFlag:false,
			message:"",
			accountNumber:"",

	};

	self.rakTempDebitCardBlockInit=function(responselist){
		if (!responselist[0].hasOwnProperty('errorMessage'))
		{
		if (responselist[0].hasOwnProperty('debitCardList'))
		{
			self.rakTempDebitCardBlock.cardList=responselist[0].debitCardList;
		}
		if (responselist[0].hasOwnProperty('reasonList'))
		{
			self.rakTempDebitCardBlock.reasonList=responselist[0].reasonList;
		}
		}

	};

		self.rakTempBlockDebitCardSetExpiryDate=function()
	{

		self.rakTempDebitCardBlock.expDate= self.rakTempDebitCardBlock.cardList[self.rakTempDebitCardBlock.selectedCard].expiryDate;
		self.rakTempDebitCardBlock.accountNumber= self.rakTempDebitCardBlock.cardList[self.rakTempDebitCardBlock.selectedCard].accountNumber;
		self.rakTempDebitCardBlock.expDateFlag=true;
	};



	self.rakTempDebitCardBlockSuccess=function(responselist){

		if (!responselist[0].hasOwnProperty('errorMessage'))
		{
			self.rakTempDebitCardBlock.successMessage=responselist[0].successRequest;
		}
	};
/*	self.rakTempDebitCardBlockDate=function()
	{
		//self.rakTempDebitCardBlock.confirmExpDate=self.rakTempDebitCardBlock.expDate.toString();

		self.common.displayDate = self.rakTempDebitCardBlock.expDate;
		self.populateCurrentDateDetails(self.rakTempDebitCardBlock.expDate);

		self.rakTempDebitCardBlock.expDate_day =self.common.date;
		self.rakTempDebitCardBlock.expDate_month=self.common.month;
		self.rakTempDebitCardBlock.expDate_year=self.common.year;
	};*/

	self.resetTempDebitCardBlockConfirm = function()
	{
		self.rakTempDebitCardBlock.txnPwd="";
		self.rakTempDebitCardBlock.confirmedReason= "";
	};

	self.rakTempDebitCardBlockConfirm=function(responsesList){

		for (var i =0 ; i < self.rakTempDebitCardBlock.reasonList.length ; i++)

		{  if (self.rakTempDebitCardBlock.reasonList[i].reasonIndex==self.rakTempDebitCardBlock.reason)
			self.rakTempDebitCardBlock.confirmedReason = self.rakTempDebitCardBlock.reasonList[i].reasonDesc;

		}
		
		if (!responsesList[0].hasOwnProperty('errorMessage'))
		{
			if(responsesList[0].auth == "")
				self.rakTempDebitCardBlock.authStatus=false;
			else 
			{
				self.rakTempDebitCardBlock.authStatus=true;
				self.rakTempDebitCardBlock.authMode = responsesList[0].auth;
			}
			
			self.common.message=responsesList[0].MESSAGE ? responsesList[0].MESSAGE :'';

		}

		if (responsesList[0].hasOwnProperty('cardNo'))
		{
			self.rakTempDebitCardBlock.confirmedCard =responsesList[0].cardNo;
		}
	};

	self.rakTempDebitCardBlockOthers=function()
	{
		if (self.rakTempDebitCardBlock.reason=='Others'){
			self.rakTempDebitCardBlock.otherMandatory=true;
	}
	else{
		self.rakTempDebitCardBlock.otherMandatory=false;
	}

	};
	self.resetTempDebitCardBlockHome =function()
	{
		self.rakTempDebitCardBlock.cardList=[];
		self.rakTempDebitCardBlock.reasonList=[];
		self.rakTempDebitCardBlock.selectedCard="";
		self.rakTempDebitCardBlock.reason="";
		self.rakTempDebitCardBlock.other="";
		self.rakTempDebitCardBlock.expDate="";
		self.rakTempDebitCardBlock.otherMandatory=false;
		self.rakTempDebitCardBlock.confirmedReason= "";
		self.rakTempDebitCardBlock.expDateFlag=false;
		self.common.message="";
		self.rakTempDebitCardBlock.accountNumber="";
	};



	/*RAK ::  End for Debit Card Block and Unblock */
	/*RAK ::6  START for Credit Card  Unblock */
				   self.RakUnblockCreditCardBlock={
			    		cardList:[],
			    		expDate:"",
			    		reason:"",
			    		other:"",
			    		selectedCard:"",
			    		reasonList:[],
			    		confirmExpDate:"",
			    		authStatus:true,
						authMode :"",
						txnPwd:"",
						successMessage:"",
						confirmedCard:"",
						confirmedReason:"",
						otherMandatory:false,
						expDateFlag:false,
						isDetailsFetched:"",

						resetUnblockCreditCardBlockHome :function()
						{
							self.RakUnblockCreditCardBlock.cardList=[];
						self.RakUnblockCreditCardBlock.reasonList=[];
							self.RakUnblockCreditCardBlock.selectedCard="";
							self.RakUnblockCreditCardBlock.reason="";
							self.RakUnblockCreditCardBlock.other="";
							self.RakUnblockCreditCardBlock.expDate="";
				           self.RakUnblockCreditCardBlock.otherMandatory=false;
				           self.RakUnblockCreditCardBlock.expDateFlag=false;
						   self.RakUnblockCreditCardBlock.confirmedReason= "";
						   self.RakUnblockCreditCardBlock.isDetailsFetched="N";
						   self.common.message="";

						},
					resetUnblockCreditCardBlockConfirm :function()
						{
							self.RakUnblockCreditCardBlock.txnPwd="";
							self.RakUnblockCreditCardBlock.confirmedReason= "";
						}
			    };

			    self.rakUnblockCreditCardBlockInit=function(responselist){
				if (!responselist[0].hasOwnProperty('errorMessage'))
					{
			    	if (responselist[0].hasOwnProperty('creditCardList'))
					{
			    	self.RakUnblockCreditCardBlock.cardList=responselist[0].creditCardList;
					}
			    	if (responselist[0].hasOwnProperty('isDetailFetched'))
					{
						self.RakUnblockCreditCardBlock.isDetailsFetched = responselist[0].isDetailFetched;
					}
			    	if (responselist[0].hasOwnProperty('reasonList'))
					{
			    	self.RakUnblockCreditCardBlock.reasonList=responselist[0].reasonList;
					}
					if (responselist[0].hasOwnProperty('expDate'))
		{
			self.RakUnblockCreditCardBlock.expDate = responselist[0].expDate;
		}


					}
					else{
						self.RakUnblockCreditCardBlock.isDetailsFetched = 'N';
					}
			    };


			    self.rakUnblockCreditCardBlockSuccess=function(responselist){

			    	if (!responselist[0].hasOwnProperty('errorMessage'))
					{
					self.RakUnblockCreditCardBlock.successMessage=responselist[0].successRequest;
					}



			    };
			    self.rakUnblockCreditCardBlockDate=function()
			    {
			  self.RakUnblockCreditCardBlock.confirmExpDate=self.RakUnblockCreditCardBlock.expDate;
			    };


			    self.rakUnblockCreditCardBlockConfirm=function(responsesList){


		for (var i =0 ; i < self.RakUnblockCreditCardBlock.reasonList.length ; i++)

			{  if (self.RakUnblockCreditCardBlock.reasonList[i].reasonIndex==self.RakUnblockCreditCardBlock.reason)
				self.RakUnblockCreditCardBlock.confirmedReason = self.RakUnblockCreditCardBlock.reasonList[i].reasonDesc;

			}

			    	if (!responsesList[0].hasOwnProperty('errorMessage'))
					{
						if(responsesList[0].auth == "")
						self.RakUnblockCreditCardBlock.authStatus=false;
					else 
					{
						self.RakUnblockCreditCardBlock.authStatus=true;
						self.RakUnblockCreditCardBlock.authMode = responsesList[0].auth;
					}

				}

			    	if (responsesList[0].hasOwnProperty('cardNo'))
					{
					self.RakUnblockCreditCardBlock.confirmedCard =responsesList[0].cardNo;
					}

			    	self.common.message=responsesList[0].MESSAGE ? responsesList[0].MESSAGE :'';
			    };
				 self.rakUnblockCreditOthers=function()
			    {
			    	if (self.RakUnblockCreditCardBlock.reason=='Others'){
			    		self.RakUnblockCreditCardBlock.otherMandatory=true;
			    	}
			    	else{
			    		self.RakUnblockCreditCardBlock.otherMandatory=false;
			    	}

			    };
	/*RAK ::6  END for Credit Card  Unblock */


	/* RAK : APPLY FOR PERPAID CARD : Start */
		self.applyForPrepaidCard = {
				//initial screen
				accountNumberList : [],
				creditCardList : [],
				accountNumber : "",
				creditCardNumber : "",
				accountIndex : "",
				creditIndex : "",
				acctFlag :"",
				//Fetch Screen
				titleList : [],
				titleName : "",
				fullNameList : "",
				address1 : "",
				address2 : "",
				address3 : "",
				pobox : "",
				emirateList : [],
				emirate : "",

				country:"",
				countryCode : "",
				mobilePrefixList : [],
				mobilePrefix:"",
				mobileNumber: "",
				mobileprefixDesc:"",
				mobileprefixCode:"",

				officePrefixList:[],
				officePrefix:"",
				officeNumber:"",
				phnPrefixDesc:"",
				phnPrefixCode:"",


				residentialPrefixList:[],
				residentialPrefix:"",
				residentialNumber:"",

				faxPrefixList:[],
				faxPrefix:"",
				faxNumber:"",

				emailAddress:"",

				auth : "",
				transactionPassword : "",
				prepaidCardSuccessMessage : "",
				mobileNumberString:"",
				isDispatchModeSet:"",
				isSelectYourCardSet:"",

				salutationCode:"",
				salutationDesc:"",
				emirateCode:"",
				boolAccount:false,
				boolCredit:false,

				nationality:"",
				dob:"",
				mobilePrefixCodeSent:"",
				officePrefixCodeSent:"",
				residentialPrefixCodeSent:"",
				faxPrefixCodeSent:"",

				//CHANGES DONE AS FIX OF PROUAT-2177 START
				 emirateSeletected:"",
				 emiratesList:[],
				 emiBranchList:[],
				 OprAcctBranchList:[],
				 emiCategorizedBranchList:[],
				 selectedBranchId:"",
				 isEmiSelected: false,
				//CHANGES DONE AS FIX OF PROUAT-2177 END
				 message: "",
				/*boolTitle:false,
				boolAddress1:false,
				boolAddress2:false,
				boolAddress3:false,*/

				resetApplyForPrepaidCard : function(){
					//initial screen
					self.applyForPrepaidCard.accountNumberList = [];
					self.applyForPrepaidCard.creditCardList = [];
					self.applyForPrepaidCard.accountNumber = "";
					self.applyForPrepaidCard.accountIndex = "";
					self.applyForPrepaidCard.creditCardNumber = "";
					self.applyForPrepaidCard.creditIndex = "";
					//Fetch Screen
					self.applyForPrepaidCard.titleList = [];
					self.applyForPrepaidCard.titleName = "";
					self.applyForPrepaidCard.fullName = "";
					self.applyForPrepaidCard.address1 = "";
					self.applyForPrepaidCard.address2 = "";
					self.applyForPrepaidCard.address3 = "";
					self.applyForPrepaidCard.pobox = "";
					self.applyForPrepaidCard.emirateList = [];
					self.applyForPrepaidCard.emirate = "";
					self.applyForPrepaidCard.country = "";

					self.applyForPrepaidCard.countryCode = "";

					self.applyForPrepaidCard.mobilePrefixList = [];
					self.applyForPrepaidCard.mobilePrefix = "";
					self.applyForPrepaidCard.mobileNumber = "";
					self.applyForPrepaidCard.mobileprefixDesc = "";
					self.applyForPrepaidCard.mobileprefixCode = "";


					self.applyForPrepaidCard.officePrefixList = [];
					self.applyForPrepaidCard.officePrefix = "";
					self.applyForPrepaidCard.officeNumber = "";
					self.applyForPrepaidCard.phnPrefixDesc = "";
					self.applyForPrepaidCard.phnPrefixCode = "";

					self.applyForPrepaidCard.residentialPrefixList = [];
					self.applyForPrepaidCard.residentialPrefix = "";
					self.applyForPrepaidCard.residentialNumber = "";

					self.applyForPrepaidCard.faxPrefixList = [];
					self.applyForPrepaidCard.faxPrefix = "";
					self.applyForPrepaidCard.faxNumber = "";

					self.applyForPrepaidCard.emailAddress="";

					self.applyForPrepaidCard.auth="";
					self.applyForPrepaidCard.transactionPassword="";
					self.applyForPrepaidCard.prepaidCardSuccessMessage="";
					self.applyForPrepaidCard.mobileNumberString="";
					self.applyForPrepaidCard.isDispatchModeSet="";
					self.applyForPrepaidCard.isSelectYourCardSet="";

					self.applyForPrepaidCard.salutationCode="";
					self.applyForPrepaidCard.salutationDesc="";
					self.applyForPrepaidCard.emirateCode="";

					self.applyForPrepaidCard.boolAccount=false;
					self.applyForPrepaidCard.boolCredit=false;

					self.applyForPrepaidCard.nationality="";
					self.applyForPrepaidCard.dob="";
					self.applyForPrepaidCard.mobilePrefixCodeSent="";
					self.applyForPrepaidCard.residentialPrefixCodeSent="";
					self.applyForPrepaidCard.faxPrefixCodeSent="";
					self.applyForPrepaidCard.officePrefixCodeSent="";

					//CHANGES DONE AS FIX OF PROUAT-2177 START
					self.applyForPrepaidCard.emiratesList = [];
					self.applyForPrepaidCard.emiBranchList = [];
					self.applyForPrepaidCard.OprAcctBranchList = [];
					self.applyForPrepaidCard.emiCategorizedBranchList = [];
					self.applyForPrepaidCard.isEmiSelected=false;
					//CHANGES DONE AS FIX OF PROUAT-2177 END

					self.common.message="";
					self.acceptTermscondition='N';
				},


		preApplyForPrepaidCard:function(responseList){
			if (self.RakDiscApply.isRequestComesFromDiscApply == true){
				self.RakDiscApply.isRequestComesFromDiscApply = false;
				self.applyForPrepaidCard.resetApplyForPrepaidCard();
			}
						if(responseList[0].hasOwnProperty('FromccountsList')){
							self.applyForPrepaidCard.accountNumberList = responseList[0].FromccountsList;

						}
						if(responseList[0].hasOwnProperty('creditCardList')){
							self.applyForPrepaidCard.creditCardList = responseList[0].creditCardList;
						}
						self.applyForPrepaidCard.isBack = false;

		},

		//Amol: Disc And Apply -- START
		setRakPPCInitBackBtnClicked : function(){
			if (self.RakDiscApply.discAndApplyFlowFlag == true){
				self.RakDiscApply.discAndApplyFlowFlag = false;
				scope.setEvent('onDiscAndapplyBackClicked');
			}
			else{
				scope.setEvent('onApplyForPrepaidCardPreCloseClick');
			}
		},
		//: Disc And Apply -- END


		initApplyForPrepaidCard:function(responsesList){

                 //CHANGES DONE AS FIX OF PROUAT-2177 START
			      if(responsesList[0].hasOwnProperty('emirateList')){
	              self.applyForPrepaidCard.emiratesList = responsesList[0].emirateList;
	                 }


	              if(responsesList[0].hasOwnProperty('emiBranchList')){
	                    self.applyForPrepaidCard.emiBranchList = responsesList[0].emiBranchList;
	              }

	              if(responsesList[0].hasOwnProperty('OprAcctBranchList'))
	               {
	                    self.applyForPrepaidCard.emiCategorizedBranchList = responsesList[0].OprAcctBranchList;
	               }
			    //CHANGES DONE AS FIX OF PROUAT-2177 END

				if(responsesList[0].hasOwnProperty('salutationList')){
				self.applyForPrepaidCard.titleList = responsesList[0].salutationList;
				}
				if(responsesList[0].hasOwnProperty('TITLE')){
					self.applyForPrepaidCard.salutationCode = responsesList[0].TITLE;
				}
				if(responsesList[0].hasOwnProperty('EMIRATE')){
					self.applyForPrepaidCard.emirateCode = responsesList[0].EMIRATE;
				}
				if(responsesList[0].hasOwnProperty('fullNameList')
						&& (responsesList[0].fullNameList).length != 0){
				self.applyForPrepaidCard.fullName = responsesList[0].fullNameList[0].firstName + ' '
														+ responsesList[0].fullNameList[0].middleName + ' '
															+ responsesList[0].fullNameList[0].lastName;
				/*self.applyForPrepaidCard.titleName = responsesList[0].fullNameList[0].title;*/
				//self.applyForPrepaidCard.salutationCode = "3";
				for(var i=0; i < (self.applyForPrepaidCard.titleList).length; i++){

					if((self.applyForPrepaidCard.titleList[i]).salutationDesc == responsesList[0].fullNameList[0].title)
					{
						self.applyForPrepaidCard.salutationCode = (self.applyForPrepaidCard.titleList[i]).salutationCode;
					}
				}
				self.applyForPrepaidCard.firstName =  responsesList[0].fullNameList[0].firstName;
				self.applyForPrepaidCard.lastName =	responsesList[0].fullNameList[0].lastName;
				}
				if(responsesList[0].hasOwnProperty('addressList')
						&& (responsesList[0].addressList).length != 0){
					self.applyForPrepaidCard.address1 = responsesList[0].addressList[0].address1;
					self.applyForPrepaidCard.address2 = responsesList[0].addressList[0].address2;
					self.applyForPrepaidCard.address3 = responsesList[0].addressList[0].address3;
					self.applyForPrepaidCard.pobox = 	responsesList[0].addressList[0].poBox;
				}
				if(responsesList[0].hasOwnProperty('EmirateList')){
				self.applyForPrepaidCard.emirateList = responsesList[0].EmirateList;
				}

				self.applyForPrepaidCard.country = 'U.A.E';
				self.applyForPrepaidCard.countrySent = 'AE';

				self.applyForPrepaidCard.countryCodeSent = '971';
				self.applyForPrepaidCard.countryCode = '+971';
				if(responsesList[0].hasOwnProperty('mobilePrefixList')){
				self.applyForPrepaidCard.mobilePrefixList = responsesList[0].mobilePrefixList;

				}
				if(responsesList[0].hasOwnProperty('contactNumber')
						&& (responsesList[0].contactNumber).length != 0){

					if(responsesList[0].contactNumber[0].phnNumber != '')
						{
						    self.applyForPrepaidCard.mobileNumber=Number(responsesList[0].contactNumber[0].phnNumber.split("971")[1]);
						    //self.applyForPrepaidCard.mobileNumber=Number(responsesList[0].contactNumber[0].phnNumber);
						}
				}
				if(responsesList[0].hasOwnProperty('phnPrefixList')){
				self.applyForPrepaidCard.officePrefixList = responsesList[0].phnPrefixList;
				}
				if(responsesList[0].hasOwnProperty('offPhnList')
							&& (responsesList[0].offPhnList).length != 0){
					if(responsesList[0].offPhnList[0].offPhn != '')
						{
						self.applyForPrepaidCard.officeNumber = Number(responsesList[0].offPhnList[0].offPhn.split("971")[1]);
						//self.applyForPrepaidCard.officeNumber = Number(responsesList[0].offPhnList[0].offPhn);
						}
				}
				if(responsesList[0].hasOwnProperty('phnPrefixList')){
				self.applyForPrepaidCard.residentialPrefixList = responsesList[0].phnPrefixList;
				}
				if(responsesList[0].hasOwnProperty('resPhnList')
						&& (responsesList[0].resPhnList).length != 0){
					if(responsesList[0].resPhnList[0].resPhn != '')
						{
						self.applyForPrepaidCard.residentialNumber = Number(responsesList[0].resPhnList[0].resPhn.split("971")[1]);
						//self.applyForPrepaidCard.residentialNumber = Number(responsesList[0].resPhnList[0].resPhn);
						}
				}
				if(responsesList[0].hasOwnProperty('phnPrefixList')){
				self.applyForPrepaidCard.faxPrefixList = responsesList[0].phnPrefixList;
				}
				if(responsesList[0].hasOwnProperty('faxNumberList')
						&& (responsesList[0].faxNumberList).length != 0 )
				{
					if (responsesList[0].faxNumberList[0].faxNumber != '')
					{
						self.applyForPrepaidCard.faxNumber = Number(responsesList[0].faxNumberList[0].faxNumber.split("971")[1]);
						//self.applyForPrepaidCard.faxNumber = Number(responsesList[0].faxNumberList[0].faxNumber);
					}
				}
				if(responsesList[0].hasOwnProperty('emailList')
						&& (responsesList[0].emailList).length != 0 ){
				self.applyForPrepaidCard.emailAddress = responsesList[0].emailList[0].email;
				}

				if(responsesList[0].hasOwnProperty('hostRequestAdditionalList')
						&& (responsesList[0].hostRequestAdditionalList).length != 0 ){
					self.applyForPrepaidCard.nationality = responsesList[0].hostRequestAdditionalList[0].nationality;
					self.applyForPrepaidCard.dob = responsesList[0].hostRequestAdditionalList[0].dob;

					}


				if(self.RakDiscApply.selectedSubMenu.prodId == 'CPBPC'){
					self.applyForPrepaidCard.isSelectYourCardSet = 'MWC';
				}
				else if(self.RakDiscApply.selectedSubMenu.prodId == 'CPBLP'){
					self.applyForPrepaidCard.isSelectYourCardSet = 'BC';
				}
				else if(self.RakDiscApply.selectedSubMenu.prodId == 'CPLPC'){
					self.applyForPrepaidCard.isSelectYourCardSet = 'LC';
				}
				self.applyForPrepaidCard.isBack = false;
			}
		};
		//self.applyForPrepaidCard.boolAccount=true;
		//self.applyForPrepaidCard.boolCredit=true;
		self.applyForPrepaidCardAccountHideFields = function(){
			//self.applyForPrepaidCard.creditIndex='';
			self.applyForPrepaidCard.boolAccount=true;
			self.applyForPrepaidCard.boolCredit=false;
		};
		self.applyForPrepaidCardCreditHideFields = function(){
			//self.applyForPrepaidCard.accountIndex='';
			self.applyForPrepaidCard.boolCredit=true;
			self.applyForPrepaidCard.boolAccount=false;
		};
		
		self.applyForPrepaidCardCreditContinue = function(){
			//self.applyForPrepaidCard.accountIndex='';
			if(self.applyForPrepaidCard.boolCredit)
				{
				self.applyForPrepaidCard.accountIndex='';
				}
			else if(self.applyForPrepaidCard.boolAccount)
			{
				self.applyForPrepaidCard.creditIndex='';
			}
		};

		self.applyForPrepaidCard.continueClick=function(){
			self.applyForPrepaidCard.mobileNumberString = self.applyForPrepaidCard.mobileNumber ?  self.applyForPrepaidCard.mobileNumber+'' :'';
			self.applyForPrepaidCard.officeNumberString = self.applyForPrepaidCard.officeNumber ?  self.applyForPrepaidCard.officeNumber+'' :'';
			self.applyForPrepaidCard.residentialNumberString = self.applyForPrepaidCard.residentialNumber ?  self.applyForPrepaidCard.residentialNumber+'' :'';
			self.applyForPrepaidCard.faxNumberString = self.applyForPrepaidCard.faxNumber ?  self.applyForPrepaidCard.faxNumber+'' :'';

			if (self.applyForPrepaidCard.accountIndex != ""){
				self.applyForPrepaidCard.paymentMode = "A";
			}
			else if (self.applyForPrepaidCard.creditIndex != ""){
				self.applyForPrepaidCard.paymentMode ="C";
			}
			
			
			if (self.applyForPrepaidCard.isDispatchModeSet=='BR')
			{
				self.applyForPrepaidCard.isEmiSelected=true;
			}
			else
			{
				self.applyForPrepaidCard.isEmiSelected=false;
			}

			var d = new Date();
			var n = d.getTime();
			self.applyForPrepaidCard.transactionRef = n.toString();
		};



		self.initApplyForPrepaidCardConfirm = function(responsesList) {
			if (!responsesList[0].hasOwnProperty('errorMessage')) {

				self.applyForPrepaidCard.previewResponse = responsesList[0];
				self.applyForPrepaidCard.auth = responsesList[0].auth;

				self.applyForPrepaidCard.transactionPassword = "";
				
				self.common.message=responsesList[0].MESSAGE ? responsesList[0].MESSAGE :'';
			}
			self.applyForPrepaidCard.transactionPassword = "";

			if(responsesList[0].hasOwnProperty('salutationDesc'))
				self.applyForPrepaidCard.salutationDesc = responsesList[0].salutationDesc;

			self.applyForPrepaidCard.fullTitleName=self.applyForPrepaidCard.salutationDesc+' '
														+self.applyForPrepaidCard.fullName;
			self.applyForPrepaidCard.mailingAddress=self.applyForPrepaidCard.address1
														+','+' '+self.applyForPrepaidCard.address2
															+','+' '+self.applyForPrepaidCard.address3;

			self.applyForPrepaidCard.fullMobNum=self.applyForPrepaidCard.countryCode+'-'+
													self.applyForPrepaidCard.mobilePrefix+'-'+
														self.applyForPrepaidCard.mobileNumber;


			if(responsesList[0].hasOwnProperty('accountNumber'))
				self.applyForPrepaidCard.accountNumber = responsesList[0].accountNumber;

			if(responsesList[0].hasOwnProperty('creditCardNumber'))
				self.applyForPrepaidCard.creditCardNumber = responsesList[0].creditCardNumber;

			if(responsesList[0].hasOwnProperty('emirateDesc'))
				self.applyForPrepaidCard.emirateDesc = responsesList[0].emirateDesc;


			for (var k=0; k < (self.applyForPrepaidCard.mobilePrefixList).length ; k++){
				if ((self.applyForPrepaidCard.mobilePrefixList[k]).mobileprefixDesc ==
															self.applyForPrepaidCard.mobilePrefix)
				{
					self.applyForPrepaidCard.mobilePrefixCodeSent = (self.applyForPrepaidCard.mobilePrefixList[k]).mobileprefixCode;
				}
			}

			for (var k=0; k < (self.applyForPrepaidCard.officePrefixList).length ; k++){
				if ((self.applyForPrepaidCard.officePrefixList[k]).phnPrefixDesc ==
															self.applyForPrepaidCard.officePrefix)
				{
					self.applyForPrepaidCard.officePrefixCodeSent = (self.applyForPrepaidCard.officePrefixList[k]).phnPrefixCode;
				}
			}

			for (var k=0; k < (self.applyForPrepaidCard.residentialPrefixList).length ; k++){
				if ((self.applyForPrepaidCard.residentialPrefixList[k]).phnPrefixDesc ==
															self.applyForPrepaidCard.residentialPrefix)
				{
					self.applyForPrepaidCard.residentialPrefixCodeSent = (self.applyForPrepaidCard.residentialPrefixList[k]).phnPrefixCode;
				}
			}

			for (var k=0; k < (self.applyForPrepaidCard.faxPrefixList).length ; k++){
				if ((self.applyForPrepaidCard.faxPrefixList[k]).phnPrefixDesc ==
															self.applyForPrepaidCard.faxPrefix)
				{
					self.applyForPrepaidCard.faxPrefixCodeSent = (self.applyForPrepaidCard.faxPrefixList[k]).phnPrefixCode;
				}
			}

			if (self.applyForPrepaidCard.isDispatchModeSet == "BR"){
				self.applyForPrepaidCard.dispatchedMode = "Branch Pickup";
			}
			else {
				self.applyForPrepaidCard.dispatchedMode = "Courier Delivery";
			}

			if (self.applyForPrepaidCard.isSelectYourCardSet == "MWC"){
				self.applyForPrepaidCard.selectedCard =  rootScope.appLiterals.APP.RAK_SERVICES.RAK_PREPAID_CARD.TYPE_BAYANI;
			}
			else if(self.applyForPrepaidCard.isSelectYourCardSet == "BC"){
				self.applyForPrepaidCard.selectedCard = rootScope.appLiterals.APP.RAK_SERVICES.RAK_PREPAID_CARD.TYPE_BLING;
			}
			else {
				self.applyForPrepaidCard.selectedCard = rootScope.appLiterals.APP.RAK_SERVICES.RAK_PREPAID_CARD.TYPE_LOADED;
			}


			if (self.applyForPrepaidCard.accountIndex != ""){
				self.applyForPrepaidCard.paymentMode = "A";
			}
			if (self.applyForPrepaidCard.creditIndex != ""){
				self.applyForPrepaidCard.paymentMode ="C";
			}
};


//CHANGES DONE AS FIX OF PROUAT-2177 START
        self.rakapplyForPrepaidCardBranchOptionChange = function() {
        var branchListCount = 0;
        var emBranchDesc = [];
        self.applyForPrepaidCard.OprAcctBranchList = [];
        self.applyForPrepaidCard.isEmiSelected = true;
        for (var x = 0; x < self.applyForPrepaidCard.emiBranchList.length; x++) {
        	if (self.applyForPrepaidCard.emiBranchList[x].code == self.applyForPrepaidCard.emirateSeletected) {
			emBranchDesc = self.applyForPrepaidCard.emiBranchList[x].codeDesc
					.split("|");
			break;
        	}
       }

        for (var x = 0; x < emBranchDesc.length; x++) {
        	for (var y = 0; y < self.applyForPrepaidCard.emiCategorizedBranchList.length; y++) {
        		if (emBranchDesc[x] == self.applyForPrepaidCard.emiCategorizedBranchList[y].branchId) {
        			self.applyForPrepaidCard.OprAcctBranchList[branchListCount] = self.applyForPrepaidCard.emiCategorizedBranchList[y];
        			branchListCount++;
        		}
        	}
        }
};
//CHANGES DONE AS FIX OF PROUAT-2177 END

		self.clearBranchDetails = function() {
			self.applyForPrepaidCard.emirateSeletected='';
			self.applyForPrepaidCard.isEmiSelected=false;
			self.applyForPrepaidCard.selectedBranchId='';
		};

		self.applyForPrepaidCard.confirmContinueClick = function(){
			var d = new Date();
			var n = d.getTime();
			self.applyForPrepaidCard.transactionRef = n.toString();
		};

		self.initApplyForPrepaidCardSuccess = function(responsesList) {
			self.applyForPrepaidCard.prepaidCardSuccessMessage = responsesList[0].prepaidCardSuccessMessage;
		};

		//: Disc And Apply -- START
		self.setApplyForPrepaidCardSuccessHomeBtnClicked = function(){
			if (self.RakDiscApply.discAndApplyFlowFlag == true){
				self.RakDiscApply.discAndApplyFlowFlag = false;
				scope.setEvent('onDiscAndapplyBackClicked');
			}
			else{
				scope.setEvent('onApplyForPrepaidCardDoneClick');
			}
		};
		//: Disc And Apply -- END


		/* RAK : APPLY FOR PERPAID CARD : End */


		// - Added for Investment SR Redeem Gold Request : START
		self.RAKInvRedeemGoldAcctArrays={
	    		invGoldAcctList:[],
	    		invChargeAcctList:[],
	    		invGoldAcctBranchList:[],
				invKiloList:[],
				invSortedKiloList:[],
				invGramList:[],
				invSortedGramList:[],
				/*-UIchanges-Start*/
				emirateList:[],
                emiBranchList:[],
                emiCategorizedBranchList:[],
                /*-UIchanges-End*/

	    };

		self.RAKInvRedeemGoldAcctModel={
	    		selectedGoldAcct:"",
	    		selectedChargeAcct:"",
	    		selectedBranchId:"",
	    		selectedKilo:"",
	    		selectedGram: "",
				successMessage:"",
				authFlag:"N",
				authMode:"",
				authStatus:false,
				txnPwd:"",
				remarks:"",
				/*-UIchanges-Start*/
				selectedBranchIdDisplayName:"",
                emirateSeletected:"",
                emirateSeletectedDisplayName:"",
                emirateSeletectedCode:"",
                isEmiSelected:false,
                quantity1:"",
                quantity2:"",
                quantity3:"",
                quantity4:"",
                quantity5:"",
                quantity6:"",
                selectedGoldUnit1:"",
                selectedGoldUnit2:"",
                selectedGoldUnit3:"",
                selectedGoldUnit4:"",
                selectedGoldUnit5:"",
                selectedGoldUnit6:"",
                /*-UIchanges-End*/
                getKeyUp : function() {
                	self.RAKInvRedeemGoldAcctModel.redemptionAmount=Number(self.RAKInvRedeemGoldAcctModel.selectedGoldUnit1 *	self.RAKInvRedeemGoldAcctModel.quantity1 +
                			self.RAKInvRedeemGoldAcctModel.selectedGoldUnit2 * self.RAKInvRedeemGoldAcctModel.quantity2 + 
                			self.RAKInvRedeemGoldAcctModel.selectedGoldUnit3 * self.RAKInvRedeemGoldAcctModel.quantity3 +
                			self.RAKInvRedeemGoldAcctModel.selectedGoldUnit4 * self.RAKInvRedeemGoldAcctModel.quantity4 +
                			self.RAKInvRedeemGoldAcctModel.selectedGoldUnit5 * self.RAKInvRedeemGoldAcctModel.quantity5 +
							self.RAKInvRedeemGoldAcctModel.selectedGoldUnit6 * self.RAKInvRedeemGoldAcctModel.quantity6);
                }

	    	};
		self.sortKilo=function(a,b){
			return parseInt(b.kiloNumber) < parseInt(a.kiloNumber) ? 1 : -1;
		};
		self.sortGram=function(a,b){
			return parseInt(b.gramNumber) < parseInt(a.gramNumber) ? 1 : -1;
		};
		self.fetchRAKInvRedeemGoldAcctData=function(responsesList){
    		if(!responsesList[0].hasOwnProperty('errorMessage') && !self.common.fromAuthPage){
				if(responsesList[0].hasOwnProperty('invChargeAcctList'))
					self.RAKInvRedeemGoldAcctArrays.invChargeAcctList = responsesList[0].invChargeAcctList;
				if(responsesList[0].hasOwnProperty('invGoldAcctList'))
					self.RAKInvRedeemGoldAcctArrays.invGoldAcctList = responsesList[0].invGoldAcctList;
				if(responsesList[0].hasOwnProperty('invGoldAcctBranchList'))
					self.RAKInvRedeemGoldAcctArrays.invGoldAcctBranchList = responsesList[0].invGoldAcctBranchList;
				/*if(responsesList[0].hasOwnProperty('invKiloList')){
					self.RAKInvRedeemGoldAcctArrays.invKiloList = responsesList[0].invKiloList;
					self.RAKInvRedeemGoldAcctArrays.invSortedKiloList =  jQuery(self.RAKInvRedeemGoldAcctArrays.invKiloList).sort(self.sortKilo).toArray();
				}
				if(responsesList[0].hasOwnProperty('invGramList')){
					self.RAKInvRedeemGoldAcctArrays.invGramList = responsesList[0].invGramList;
					self.RAKInvRedeemGoldAcctArrays.invSortedGramList =  jQuery(self.RAKInvRedeemGoldAcctArrays.invGramList).sort(self.sortGram).toArray();
				}*/
				if(responsesList[0].hasOwnProperty('invGoldUnitList')){
					self.RAKInvRedeemGoldAcctArrays.invGoldUnitList = responsesList[0].invGoldUnitList;
					//self.RAKInvRedeemGoldAcctArrays.invSortedGramList =  jQuery(self.RAKInvRedeemGoldAcctArrays.invGramList).sort(self.sortGram).toArray();
				}
				/*-UIchanges-Start*/

                if(responsesList[0].hasOwnProperty('emirateList')){
                    self.RAKInvRedeemGoldAcctArrays.emirateList = responsesList[0].emirateList;
                  }

                if(responsesList[0].hasOwnProperty('emiBranchList')){
                    self.RAKInvRedeemGoldAcctArrays.emiBranchList = responsesList[0].emiBranchList;
                   }
                if(responsesList[0].hasOwnProperty('RakGoldInvAccId')&&responsesList[0].hasOwnProperty('RakGoldInvAccCurr')&&responsesList[0].hasOwnProperty('RakGoldInvAccCatDesc')){
                    self.RAKInvRedeemGoldAcctModel.selectedGoldAcct = responsesList[0].RakGoldInvAccCatDesc+'-'+responsesList[0].RakGoldInvAccId+'-'+responsesList[0].RakGoldInvAccCurr;
                   }

                /*-UIchanges-End*/
    		}
    	};
    	/*-UIchanges-Start*/
    	self.getGoldSelectedBranch=function(){
    		if(self.RAKInvRedeemGoldAcctModel.selectedBranchId!=''){
    			self.RAKInvRedeemGoldAcctModel.selectedBranchIdDisplayName=self.RAKInvRedeemGoldAcctArrays.invGoldAcctBranchList[self.RAKInvRedeemGoldAcctModel.selectedBranchId].branchCode;
    		}

    	};
    	self.getEmiratesBranch=function(){
    		self.RAKInvRedeemGoldAcctModel.selectedBranchId='';
    		self.RAKInvRedeemGoldAcctModel.emirateSeletectedDisplayName=self.RAKInvRedeemGoldAcctArrays.emirateList[self.RAKInvRedeemGoldAcctModel.emirateSeletected].codeDesc;
			self.RAKInvRedeemGoldAcctModel.emirateSeletectedCode=self.RAKInvRedeemGoldAcctArrays.emirateList[self.RAKInvRedeemGoldAcctModel.emirateSeletected].code;
            var branchListCount= 0;
            var emBranchDesc=[];
            self.RAKInvRedeemGoldAcctArrays.emiCategorizedBranchList=[];
            self.RAKInvRedeemGoldAcctModel.isEmiSelected=true;
            for(var x=0; x< self.RAKInvRedeemGoldAcctArrays.emiBranchList.length;x++ )
               {
                  if (self.RAKInvRedeemGoldAcctArrays.emiBranchList[x].code==self.RAKInvRedeemGoldAcctModel.emirateSeletectedCode){
                	  //CHANGES DONE AS FIX OF PROUAT-2087 START
                	   // emBranchDesc =  self.RAKInvRedeemGoldAcctArrays.emiBranchList[x].codeDesc.split("|");
                	    emBranchDesc =  self.RAKInvRedeemGoldAcctArrays.emiBranchList[x].codeDesc.trim();
                	    emBranchDesc =  emBranchDesc.split("|");
                	  //CHANGES DONE AS FIX OF PROUAT-2087 END
                        break;
                        }
                  }

                  for (var x = 0 ; x< emBranchDesc.length; x++  ){
                      for (var y= 0 ; y <self.RAKInvRedeemGoldAcctArrays.invGoldAcctBranchList.length;y++){
                           if (emBranchDesc[x]==self.RAKInvRedeemGoldAcctArrays.invGoldAcctBranchList[y].branchId){
                                self.RAKInvRedeemGoldAcctArrays.emiCategorizedBranchList[branchListCount] =self.RAKInvRedeemGoldAcctArrays.invGoldAcctBranchList[y];
                                branchListCount++;
                                }
                             }
                          }

    	};
    	/*-UIchanges-End*/
    	self.confirmRAKInvRedeemGold = function(responsesList){
    		if(!responsesList[0].hasOwnProperty('errorMessage')){
				if(responsesList[0].hasOwnProperty('authFlag'))
				{
					self.RAKInvRedeemGoldAcctModel.authFlag = responsesList[0].authFlag;

					if(self.RAKInvRedeemGoldAcctModel.authFlag == "Y"){
						if(responsesList[0].auth == "")
							self.RAKInvRedeemGoldAcctModel.authStatus=false;
						else
						{
							self.RAKInvRedeemGoldAcctModel.authStatus=true;
							self.RAKInvRedeemGoldAcctModel.authMode = responsesList[0].auth;
						}
					}
					self.RAKInvRedeemGoldAcctModel.weight1=responsesList[0].weight1;
					self.RAKInvRedeemGoldAcctModel.total1=responsesList[0].total1;
					self.RAKInvRedeemGoldAcctModel.weight5=responsesList[0].weight5;
					self.RAKInvRedeemGoldAcctModel.total5=responsesList[0].total5;
					self.RAKInvRedeemGoldAcctModel.weight10=responsesList[0].weight10;
					self.RAKInvRedeemGoldAcctModel.total10=responsesList[0].total10;
					self.RAKInvRedeemGoldAcctModel.weight20=responsesList[0].weight20;
					self.RAKInvRedeemGoldAcctModel.total20=responsesList[0].total20;
					self.RAKInvRedeemGoldAcctModel.weight50=responsesList[0].weight50;
					self.RAKInvRedeemGoldAcctModel.total50=responsesList[0].total50;
					self.RAKInvRedeemGoldAcctModel.weight100=responsesList[0].weight100;
					self.RAKInvRedeemGoldAcctModel.total100=responsesList[0].total100;
				}

				self.common.message=responsesList[0].MESSAGE ? responsesList[0].MESSAGE :'';
			}
    	};
    	self.initRAKInvRedeemGoldConfirmSuccess = function(responsesList){
			if(!responsesList[0].hasOwnProperty('errorMessage'))
				self.RAKInvRedeemGoldAcctModel.successMessage = responsesList[0].successMsg;
		};
		self.resetRAKInvRedeemGoldInitDetails=function(){
			self.RAKInvRedeemGoldAcctArrays.invGoldAcctList = [];
			self.RAKInvRedeemGoldAcctArrays.invChargeAcctList = [];
			self.RAKInvRedeemGoldAcctArrays.invGoldAcctBranchList = [];
			self.RAKInvRedeemGoldAcctArrays.invKiloList = [];
			self.RAKInvRedeemGoldAcctArrays.invGramList = [];
			self.RAKInvRedeemGoldAcctModel.selectedGoldAcct="";
			self.RAKInvRedeemGoldAcctModel.selectedChargeAcct="";
			self.RAKInvRedeemGoldAcctModel.selectedBranchId="";
			self.RAKInvRedeemGoldAcctModel.selectedKilo="";
			self.RAKInvRedeemGoldAcctModel.selectedGram="";
			self.RAKInvRedeemGoldAcctModel.remarks="";
			self.RAKInvRedeemGoldAcctModel.txnPwd="";
			/*-UIchanges-Start*/
			self.RAKInvRedeemGoldAcctArrays.emirateList=[];
			self.RAKInvRedeemGoldAcctArrays.emiBranchList=[];
			self.RAKInvRedeemGoldAcctArrays.emiCategorizedBranchList=[];
			self.RAKInvRedeemGoldAcctModel.emirateSeletected="";
			self.RAKInvRedeemGoldAcctModel.emirateSeletectedDisplayName="";
			self.RAKInvRedeemGoldAcctModel.emirateSeletectedCode="";
			self.RAKInvRedeemGoldAcctModel.isEmiSelected=false;
            /*-UIchanges-End*/
			self.common.fromAuthPage=false;
			self.RAKInvRedeemGoldAcctModel.selectedGoldUnit1="";
			self.RAKInvRedeemGoldAcctModel.selectedGoldUnit2="";
			self.RAKInvRedeemGoldAcctModel.selectedGoldUnit3="";
			self.RAKInvRedeemGoldAcctModel.selectedGoldUnit4="";
			self.RAKInvRedeemGoldAcctModel.selectedGoldUnit5="";
			self.RAKInvRedeemGoldAcctModel.selectedGoldUnit6="";
			self.RAKInvRedeemGoldAcctModel.quantity1="";
			self.RAKInvRedeemGoldAcctModel.quantity2="";
			self.RAKInvRedeemGoldAcctModel.quantity3="";
			self.RAKInvRedeemGoldAcctModel.quantity4="";
			self.RAKInvRedeemGoldAcctModel.quantity5="";
			self.RAKInvRedeemGoldAcctModel.quantity6="";
			self.RAKInvRedeemGoldAcctModel.add1=false;
			self.RAKInvRedeemGoldAcctModel.add2=false;
			self.RAKInvRedeemGoldAcctModel.add3=false;
			self.RAKInvRedeemGoldAcctModel.add4=false;
			self.RAKInvRedeemGoldAcctModel.add5=false;
			self.RAKInvRedeemGoldAcctModel.redemptionAmount="";
		};
		// - Added for Investment SR Redeem Gold Request : END
		// - Added for Loans Finances – Application for Mortgage Loan Amal Home Finance : START
		self.RAKLoanMortgageAmalHomeFinModel={
				isMortgageLoanSelected:"Mortgage Loan",
				ApplicantName:"",//Fetched from CIF Data
//				DOBList:[],
				DOB:"",//Fetched from CIF data.
				MaritalStatList:[],
				selectedMaritalStat:"",
				Nationality:"",//Fetched from CIF Data
//				NationalityList:[],
				isUAEResident:"Yes",
				LengthOfStayinUAE:"",
				POBox:"",
				EmiratesList:[],//Fetched from COCD Table
				selectedEmirate:"",
				TeleNoOff:"",//Fetched from CIF Data
				TeleNoRes:"",//Fetched from CIF Data
				FaxNo:"",//Fetched from CIF Data
//				MobPrefixesList:[],
				MobileNo:"",//Fetched from CIF Data
				EmailNo:"",//Fetched from CIF Data
				EmploymentTypeList:[],
				selectedEmpType:"",
				GrossFixedSalMonth:"",
				AgeOfBusiMonth:"",
				ProfShareLastYr:"",
				NameOfProp:"",
				LocOfPropList:[],
				selectedLocOfProp:"",
				NameOfDevList:[],
				selectedDev:"",
				TotLnFinRqd:"",
				PerOfLnFinYr:"",
				OthBankLnFinList:[],
				selectedOthBankLnFin:"",
				authFlag:"N",
				authMode:"",
				authStatus:false,
				txnPwd:"",
				successMessage:""
		};

		self.fetchRAKLoanMortgageAmalHomeFinDetails = function(responsesList){
			if(!responsesList[0].hasOwnProperty('errorMessage')){
				if(responsesList[0].hasOwnProperty('ApplicantName'))
					self.RAKLoanMortgageAmalHomeFinModel.ApplicantName = responsesList[0].ApplicantName;
				if(responsesList[0].hasOwnProperty('DOB'))
					self.RAKLoanMortgageAmalHomeFinModel.DOB = responsesList[0].DOB;
				if(responsesList[0].hasOwnProperty('MaritalStatList'))
					self.RAKLoanMortgageAmalHomeFinModel.MaritalStatList = responsesList[0].MaritalStatList;
				if(responsesList[0].hasOwnProperty('Nationality'))
					self.RAKLoanMortgageAmalHomeFinModel.Nationality = responsesList[0].Nationality;
				if(responsesList[0].hasOwnProperty('TeleNoOff'))
					self.RAKLoanMortgageAmalHomeFinModel.TeleNoOff = responsesList[0].TeleNoOff;
				if(responsesList[0].hasOwnProperty('TeleNoRes'))
					self.RAKLoanMortgageAmalHomeFinModel.TeleNoRes = responsesList[0].TeleNoRes;
				if(responsesList[0].hasOwnProperty('MobileNo'))
					self.RAKLoanMortgageAmalHomeFinModel.MobileNo = responsesList[0].MobileNo;
				if(responsesList[0].hasOwnProperty('FaxNo'))
					self.RAKLoanMortgageAmalHomeFinModel.FaxNo = responsesList[0].FaxNo;
				if(responsesList[0].hasOwnProperty('EmailNo'))
					self.RAKLoanMortgageAmalHomeFinModel.EmailNo = responsesList[0].EmailNo;
				if(responsesList[0].hasOwnProperty('EmiratesList'))
					self.RAKLoanMortgageAmalHomeFinModel.EmiratesList = responsesList[0].EmiratesList;
				if(responsesList[0].hasOwnProperty('EmploymentTypeList'))
					self.RAKLoanMortgageAmalHomeFinModel.EmploymentTypeList = responsesList[0].EmploymentTypeList;
				if(responsesList[0].hasOwnProperty('LocOfPropList'))
					self.RAKLoanMortgageAmalHomeFinModel.LocOfPropList = responsesList[0].LocOfPropList;
				if(responsesList[0].hasOwnProperty('NameOfDevList'))
					self.RAKLoanMortgageAmalHomeFinModel.NameOfDevList = responsesList[0].NameOfDevList;
				if(responsesList[0].hasOwnProperty('OthBankLnFinList'))
					self.RAKLoanMortgageAmalHomeFinModel.OthBankLnFinList = responsesList[0].OthBankLnFinList;
			}
		};
		self.resetRAKLoanMortgageAmalHomeFinDetails=function(){
			self.RAKLoanMortgageAmalHomeFinModel.isMortgageLoanSelected=true;
			self.RAKLoanMortgageAmalHomeFinModel.ApplicantName="";
			self.RAKLoanMortgageAmalHomeFinModel.DOB="";
			self.RAKLoanMortgageAmalHomeFinModel.MaritalStatList=[];
			self.RAKLoanMortgageAmalHomeFinModel.selectedMaritalStat="";
			self.RAKLoanMortgageAmalHomeFinModel.Nationality="";
			self.RAKLoanMortgageAmalHomeFinModel.isUAEResident=true;
			self.RAKLoanMortgageAmalHomeFinModel.LengthOfStayinUAE="";
			self.RAKLoanMortgageAmalHomeFinModel.POBox="";
			self.RAKLoanMortgageAmalHomeFinModel.EmiratesList=[];
			self.RAKLoanMortgageAmalHomeFinModel.selectedEmirate="";
			self.RAKLoanMortgageAmalHomeFinModel.TeleNoOff="";
			self.RAKLoanMortgageAmalHomeFinModel.TeleNoRes="";
			self.RAKLoanMortgageAmalHomeFinModel.FaxNo="";
			self.RAKLoanMortgageAmalHomeFinModel.MobileNo="";
			self.RAKLoanMortgageAmalHomeFinModel.EmailNo="";
			self.RAKLoanMortgageAmalHomeFinModel.EmploymentTypeList=[];
			self.RAKLoanMortgageAmalHomeFinModel.selectedEmpType="";
			self.RAKLoanMortgageAmalHomeFinModel.GrossFixedSalMonth="";
			self.RAKLoanMortgageAmalHomeFinModel.AgeOfBusiMonth="";
			self.RAKLoanMortgageAmalHomeFinModel.ProfShareLastYr="";
			self.RAKLoanMortgageAmalHomeFinModel.NameOfProp="";
			self.RAKLoanMortgageAmalHomeFinModel.LocOfPropList=[];
			self.RAKLoanMortgageAmalHomeFinModel.selectedLocOfProp="";
			self.RAKLoanMortgageAmalHomeFinModel.NameOfDevList=[];
			self.RAKLoanMortgageAmalHomeFinModel.selectedDev="";
			self.RAKLoanMortgageAmalHomeFinModel.TotLnFinRqd="";
			self.RAKLoanMortgageAmalHomeFinModel.PerOfLnFinYr="";
			self.RAKLoanMortgageAmalHomeFinModel.OthBankLnFinList=[];
			self.RAKLoanMortgageAmalHomeFinModel.selectedOthBankLnFin="";
			self.common.message="";
		};
    	self.confirmRAKLoanMortgageAmalHomeFin = function(responsesList){
    		if(!responsesList[0].hasOwnProperty('errorMessage')){
				if(responsesList[0].hasOwnProperty('authFlag'))
				{
					self.RAKLoanMortgageAmalHomeFinModel.authFlag = responsesList[0].authFlag;

					if(self.RAKLoanMortgageAmalHomeFinModel.authFlag == "Y"){
						if(responsesList[0].auth == "")
							self.RAKLoanMortgageAmalHomeFinModel.authStatus=false;
						else
						{
							self.RAKLoanMortgageAmalHomeFinModel.authStatus=true;
							self.RAKLoanMortgageAmalHomeFinModel.authMode = responsesList[0].auth;
						}
					}
				}
				if(responsesList[0].hasOwnProperty('GrossFixSalaryPerMnth')){
					self.RAKLoanMortgageAmalHomeFinModel.GrossFixedSalMonth = responsesList[0].GrossFixSalaryPerMnth;
				}
				if(responsesList[0].hasOwnProperty('TotalLoanFinRqd')){
					self.RAKLoanMortgageAmalHomeFinModel.TotLnFinRqd = responsesList[0].TotalLoanFinRqd;
				}
				self.common.message=responsesList[0].MESSAGE ? responsesList[0].MESSAGE :'';
			}
    	};
    	self.initRAKLoanMortgageAmalHomeFinSuccess = function(responsesList){
			if(!responsesList[0].hasOwnProperty('errorMessage'))
				self.RAKLoanMortgageAmalHomeFinModel.successMessage = responsesList[0].successMsg;
		};
		// - Added for Loans Finances – Application for Mortgage Loan Amal Home Finance : END
		// - Added for Operative Accounts – Duplicate Statement Request : START
		//self.setFormatedDate
		self.RakOprAccDupStmtModel={
	    		OprAcctList:[],
	    		selectedOprAcct:"",
	    		OprAcctBranchList:[],
	    		selectedBranchId:"",
	    		selectedBranchIdSend:"",
	    		isBranchIdValidationRqd:false,
	    		isBranchOrAddress: "",
	    		branchOrAddressToSend: "",
	    		fromDatePeriod:"",
	    		toDatePeriod:"",
	    		formattedFromDatePeriod:new Date(),
	    		formattedToDatePeriod:new Date(),
				successMessage:"",
				authFlag:"N",
				authMode:"",
				authStatus:false,
				txnPwd:"",
				previewDateOne:"",
				previewDateTwo:"",

				remarks:"",
				emirateList:[],
				emiBranchList:[],
				emirateSeletected:"",
				emiCategorizedBranchList:[],
				isEmiSelected:false,
				emiSelDesc:""

	    };

		//Added by  For Emirates based Branch Dropdown Change
	    self.rakOprAccDupStmtBranchOptionChange = function() {

		var branchListCount = 0;
		var emBranchDesc = [];
		self.RakOprAccDupStmtModel.OprAcctBranchList = [];
		self.RakOprAccDupStmtModel.selectedBranchId='';
		self.RakOprAccDupStmtModel.isEmiSelected = true;
		for (var x = 0; x < self.RakOprAccDupStmtModel.emiBranchList.length; x++) {
			if (self.RakOprAccDupStmtModel.emiBranchList[x].code == self.RakOprAccDupStmtModel.emirateSeletected) {
				emBranchDesc = self.RakOprAccDupStmtModel.emiBranchList[x].codeDesc
						.split("|");
				break;
			}
		}

		for (var x = 0; x < emBranchDesc.length; x++) {
			for (var y = 0; y < self.RakOprAccDupStmtModel.emiCategorizedBranchList.length; y++) {
				if (emBranchDesc[x] == self.RakOprAccDupStmtModel.emiCategorizedBranchList[y].branchId) {
					self.RakOprAccDupStmtModel.OprAcctBranchList[branchListCount] = self.RakOprAccDupStmtModel.emiCategorizedBranchList[y];
					branchListCount++;
				}
			}
		}

	};

		self.branchIdValidationRqdCheck=function(){
			if(self.RakOprAccDupStmtModel.isBranchOrAddress=="Collect from Branch"){
				self.RakOprAccDupStmtModel.isBranchIdValidationRqd = true;
				self.RakOprAccDupStmtModel.branchOrAddressToSend = "B";
			// To validate branch id
				if(self.RakOprAccDupStmtModel.selectedBranchId){
                self.RakOprAccDupStmtModel.selectedBranchIdSend = self.RakOprAccDupStmtModel.emiCategorizedBranchList[self.RakOprAccDupStmtModel.selectedBranchId].branchId;
				}

			}
			else{
				self.RakOprAccDupStmtModel.isBranchIdValidationRqd = false;
				self.RakOprAccDupStmtModel.branchOrAddressToSend = "C";
				self.RakOprAccDupStmtModel.selectedBranchIdSend = "";
			}
			// Added By  For Emirate Desc

		for (var x = 0; x < self.RakOprAccDupStmtModel.emirateList.length; x++) {
			if (self.RakOprAccDupStmtModel.emirateList[x].code == self.RakOprAccDupStmtModel.emirateSeletected) {
				self.RakOprAccDupStmtModel.emiSelDesc = self.RakOprAccDupStmtModel.emirateList[x].codeDesc;
			}
		}
		};
		self.fetchRakOprAccDupStmtInitData=function(responsesList){
    		if(!responsesList[0].hasOwnProperty('errorMessage')){
				if(responsesList[0].hasOwnProperty('OprAcctList'))
					self.RakOprAccDupStmtModel.OprAcctList = responsesList[0].OprAcctList;
				/*if(responsesList[0].hasOwnProperty('OprAcctBranchList'))
					self.RakOprAccDupStmtModel.OprAcctBranchList = responsesList[0].OprAcctBranchList;*/

                if(responsesList[0].hasOwnProperty('OprAcctBranchList'))
                    self.RakOprAccDupStmtModel.emiCategorizedBranchList = responsesList[0].OprAcctBranchList;
                if(responsesList[0].hasOwnProperty('emirateList')){
              self.RakOprAccDupStmtModel.emirateList = responsesList[0].emirateList;
                 }


              if(responsesList[0].hasOwnProperty('emiBranchList')){
                    self.RakOprAccDupStmtModel.emiBranchList = responsesList[0].emiBranchList;
              }
    		}
    	};

    	//CHANGES SENDING DAY,MONTH AND YEAR FOR DUPLICATE STATEMENT REQUEST START
    	self.sendFormattedDate = function(){
    		/*self.RakOprAccDupStmtModel.formattedFromDatePeriod = self.setFormatedDate(self.RakOprAccDupStmtModel.fromDatePeriod);
    		self.RakOprAccDupStmtModel.formattedToDatePeriod = self.setFormatedDate(self.RakOprAccDupStmtModel.toDatePeriod);

    		var fromDate = new Date(self.RakOprAccDupStmtModel.formattedFromDatePeriod);
    		self.RakOprAccDupStmtModel.fromDate_day = fromDate.getDate();
    		self.RakOprAccDupStmtModel.fromDate_month = fromDate.getMonth() + 1; // January is 0!

    		self.RakOprAccDupStmtModel.fromDate_year = fromDate.getFullYear();
            if(self.RakOprAccDupStmtModel.fromDate_day<10){
            	self.RakOprAccDupStmtModel.fromDate_day = '0' + self.RakOprAccDupStmtModel.fromDate_day;
            }
            if(self.RakOprAccDupStmtModel.fromDate_month<10){
            	self.RakOprAccDupStmtModel.fromDate_month = '0' + self.RakOprAccDupStmtModel.fromDate_month;
            }


    		var toDate = new Date(self.RakOprAccDupStmtModel.formattedToDatePeriod);
    		self.RakOprAccDupStmtModel.toDate_day = toDate.getDate();
    		self.RakOprAccDupStmtModel.toDate_month = toDate.getMonth() + 1; // January is 0!

    		self.RakOprAccDupStmtModel.toDate_year = toDate.getFullYear();
            if(self.RakOprAccDupStmtModel.toDate_day<10){
            	self.RakOprAccDupStmtModel.toDate_day = '0' + self.RakOprAccDupStmtModel.toDate_day;
            }
            if(self.RakOprAccDupStmtModel.toDate_month<10){
            	self.RakOprAccDupStmtModel.toDate_month = '0' + self.RakOprAccDupStmtModel.toDate_month;
            }*/

    		 self.common.displayDate = self.RakOprAccDupStmtModel.fromDatePeriod;
		  		self.populateCurrentDateDetails(self.RakOprAccDupStmtModel.fromDatePeriod);
		  		self.RakOprAccDupStmtModel.fromDate_day=self.common.date;
		  		self.RakOprAccDupStmtModel.fromDate_month=self.common.month;
		  		self.RakOprAccDupStmtModel.fromDate_year=self.common.year;


		  	self.common.displayDate = self.RakOprAccDupStmtModel.toDatePeriod;
		  		self.populateCurrentDateDetails(self.RakOprAccDupStmtModel.toDatePeriod);
		  		self.RakOprAccDupStmtModel.toDate_day=self.common.date;
		  		self.RakOprAccDupStmtModel.toDate_month=self.common.month;
		  		self.RakOprAccDupStmtModel.toDate_year=self.common.year;
    	};
    	//CHANGES SENDING DAY,MONTH AND YEAR FOR DUPLICATE STATEMENT REQUEST END

    	self.resetRakOprAccDupStmtInitDetails=function(){
    		self.RakOprAccDupStmtModel.OprAcctList=[];
    		self.RakOprAccDupStmtModel.selectedOprAcct="";
    		self.RakOprAccDupStmtModel.OprAcctBranchList=[];
    		self.RakOprAccDupStmtModel.selectedBranchId="";
    		self.RakOprAccDupStmtModel.isBranchOrAddress= rootScope.appLiterals.APP.RAKOPRACCDUPSTMTSR.OPRACCDUPSTMT_DISPATCH_ADDRESS;
    		self.RakOprAccDupStmtModel.fromDatePeriod="";
    		self.RakOprAccDupStmtModel.toDatePeriod="";
    		self.RakOprAccDupStmtModel.successMessage="";
    		self.RakOprAccDupStmtModel.authFlag="N";
    		self.RakOprAccDupStmtModel.authMode="";
    		self.RakOprAccDupStmtModel.authStatus=false;
    		self.RakOprAccDupStmtModel.txnPwd="";
    		self.RakOprAccDupStmtModel.remarks="";
    		self.RakOprAccDupStmtModel.previewDateOne = "";
    		self.RakOprAccDupStmtModel.previewDateTwo = "";
			self.RakOprAccDupStmtModel.emirateList= "";
		self.RakOprAccDupStmtModel.emiBranchList= "";
		self.RakOprAccDupStmtModel.emirateSeletected= "";
		self.RakOprAccDupStmtModel.emiCategorizedBranchList= "";
		self.RakOprAccDupStmtModel.isEmiSelected=false;
		self.RakOprAccDupStmtModel.emiSelDesc= "";

    	};
    	self.confirmRakOprAccDupStmt = function(responsesList){
    		if(!responsesList[0].hasOwnProperty('errorMessage')){
				if(responsesList[0].hasOwnProperty('authFlag'))
				{
					self.RakOprAccDupStmtModel.authFlag = responsesList[0].authFlag;

					if(self.RakOprAccDupStmtModel.authFlag == "Y"){
						if(responsesList[0].auth == "")
							self.RakOprAccDupStmtModel.authStatus=false;
						else
						{
							self.RakOprAccDupStmtModel.authStatus=true;
							self.RakOprAccDupStmtModel.authMode = responsesList[0].auth;
						}
					}
				}

				if (responsesList[0].hasOwnProperty('previewDate')) {
					self.RakOprAccDupStmtModel.previewDateOne = responsesList[0].previewDate;
				}
				if (responsesList[0].hasOwnProperty('previewDateTwo')) {
					self.RakOprAccDupStmtModel.previewDateTwo = responsesList[0].previewDateTwo;
				}

				self.common.message=responsesList[0].MESSAGE ? responsesList[0].MESSAGE :'';
			}
    	};
    	self.initRakOprAccDupStmtConfirmSuccess = function(responsesList){
			if(!responsesList[0].hasOwnProperty('errorMessage'))
				self.RakOprAccDupStmtModel.successMessage = responsesList[0].successMsg;
		};
		// - Added for Operative Accounts – Duplicate Statement Request : END
		// Added for Debit Cards Apply for Debit Card Request : START
		self.RakDCApplyModel={
	    		OprAcctList:[],
	    		selectedOprAcct:"",
				MobileNo:"",//Fetched from CIF Data and Masked
	    		OprAcctBranchList:[],
	    		selectedBranchId:"",
	    		selectedBranchIdSend:"",
	    		isBranchIdValidationRqd:false,
	    		isAddressValidationRqd:false,
	    		isBranchOrAddress: "",
	    		branchOrAddressToSend: "",
	    		mailingAddress: "",
				successMessage:"",
				authFlag:"N",
				authMode:"",
				authStatus:false,
				txnPwd:"",
				remarks:"",
				emirateList:[],
        emiBranchList:[],
        emirateSeletected:"",
        emiCategorizedBranchList:[],
        isEmiSelected:false,
        emiSelDesc:""

	    };
		//Added by  For Emirates based Branch Dropdown Change
    self.rakDCApplyModelOptionChange = function() {

	var branchListCount = 0;
	var emBranchDesc = [];
	self.RakDCApplyModel.emiCategorizedBranchList = [];
	self.RakDCApplyModel.isEmiSelected = true;
	for (var x = 0; x < self.RakDCApplyModel.emiBranchList.length; x++) {
		if (self.RakDCApplyModel.emiBranchList[x].code == self.RakDCApplyModel.emirateSeletected) {
			emBranchDesc = self.RakDCApplyModel.emiBranchList[x].codeDesc
					.split("|");
			break;
		}
	}

	for (var x = 0; x < emBranchDesc.length; x++) {
		for (var y = 0; y < self.RakDCApplyModel.OprAcctBranchList.length; y++) {
			if (emBranchDesc[x] == self.RakDCApplyModel.OprAcctBranchList[y].branchId) {
				self.RakDCApplyModel.emiCategorizedBranchList[branchListCount] = self.RakDCApplyModel.OprAcctBranchList[y];
				branchListCount++;
			}
		}
	}

};
// added by  end
		self.branchOrAddressRqdCheck=function(){
			if(self.RakDCApplyModel.isBranchOrAddress=="Collect from Branch"){
				self.RakDCApplyModel.isBranchIdValidationRqd = true;
				self.RakDCApplyModel.isAddressValidationRqd = false;
				self.RakDCApplyModel.branchOrAddressToSend = "BRANCH";
				if(self.RakDCApplyModel.selectedBranchId!="")
				self.RakDCApplyModel.selectedBranchIdSend = self.RakDCApplyModel.OprAcctBranchList[self.RakDCApplyModel.selectedBranchId].branchId;
			}
			else{
				self.RakDCApplyModel.isBranchIdValidationRqd = false;
				self.RakDCApplyModel.isAddressValidationRqd = true;
				self.RakDCApplyModel.branchOrAddressToSend = "COURIER";
				self.RakDCApplyModel.selectedBranchIdSend = "";
			}
			// Added By  For Emirate Desc

		for (var x = 0; x < self.RakDCApplyModel.emirateList.length; x++) {
			if (self.RakDCApplyModel.emirateList[x].code == self.RakDCApplyModel.emirateSeletected) {
				self.RakDCApplyModel.emiSelDesc = self.RakDCApplyModel.emirateList[x].codeDesc;
			}
		}
		};
		self.fetchRakDCApplyInitData=function(responsesList){
			if (self.RakDiscApply.isRequestComesFromDiscApply == true){
				self.RakDiscApply.isRequestComesFromDiscApply = false;
				self.resetRakDCApplyInitDetails();
			}
    		if(!responsesList[0].hasOwnProperty('errorMessage') && !self.common.fromAuthPage){
    			self.RakDCApplyModel.isBranchOrAddress=rootScope.appLiterals.APP.RAKDCAPPLYSR.DCAPPLY_DISPATCH_ADDRESS;
				if(responsesList[0].hasOwnProperty('OprAcctList'))
					self.RakDCApplyModel.OprAcctList = responsesList[0].OprAcctList;
				if(responsesList[0].hasOwnProperty('OprAcctBranchList'))
					self.RakDCApplyModel.OprAcctBranchList = responsesList[0].OprAcctBranchList;
				if(responsesList[0].hasOwnProperty('MobileNo'))
					self.RakDCApplyModel.MobileNo = responsesList[0].MobileNo;

					//added by 
			if (responsesList[0].hasOwnProperty('OprAcctBranchList'))
				self.RakDCApplyModel.OprAcctBranchList = responsesList[0].OprAcctBranchList;

			if (responsesList[0].hasOwnProperty('emirateList')) {
				self.RakDCApplyModel.emirateList = responsesList[0].emirateList;
			}

			if (responsesList[0].hasOwnProperty('emiBranchList')) {
				self.RakDCApplyModel.emiBranchList = responsesList[0].emiBranchList;
			}
    		}
    	};

    	//: Disc And Apply -- START
    	self.setRakDCApplyInitBackBtnClicked = function(){
    		if (self.RakDiscApply.discAndApplyFlowFlag == true){
    			self.RakDiscApply.discAndApplyFlowFlag = false;
    			scope.setEvent('onDiscAndapplyBackClicked');
    		}
    		else{
    			scope.setEvent('onRakDCApplyInitBackClick');
    		}
    	};
    	//: Disc And Apply -- END
    	
    	self.setRakGoldApplyInitBackBtnClicked = function(){
    		if (self.RakDiscApply.discAndApplyFlowFlag == true){
    			self.RakDiscApply.discAndApplyFlowFlag = false;
    			scope.setEvent('onDiscAndapplyBackClicked');
    		}
    		else{
    			scope.setEvent('onRAKInvOpenGoldAccBackClick');
    		}
    	};


    	self.confirmRakDCApply = function(responsesList){
    		if(!responsesList[0].hasOwnProperty('errorMessage')){
    			self.common.message=responsesList[0].MESSAGE ? responsesList[0].MESSAGE :'';
				if(responsesList[0].hasOwnProperty('authFlag'))
				{
					self.RakDCApplyModel.authFlag = responsesList[0].authFlag;

					if(self.RakDCApplyModel.authFlag == "Y"){
						if(responsesList[0].auth == "")
							self.RakDCApplyModel.authStatus=false;
						else
						{
							self.RakDCApplyModel.authStatus=true;
							self.RakDCApplyModel.authMode = responsesList[0].auth;
						}
					}
				}
			}
    	};
    	self.initRakDCApplyConfirmSuccess = function(responsesList){
			if(!responsesList[0].hasOwnProperty('errorMessage'))
				self.RakDCApplyModel.successMessage = responsesList[0].successMsg;
		};

		//: Disc And Apply -- START
		self.setRakDCApplySuccessHomeBtnClicked = function(){
			if (self.RakDiscApply.discAndApplyFlowFlag == true){
				self.RakDiscApply.discAndApplyFlowFlag = false;
				scope.setEvent('onDiscAndapplyBackClicked');
			}
			else{
				scope.setEvent('onRakDCApplySuccessOkClick');
			}
		};
		//: Disc And Apply -- END

		self.resetRakDCApplyInitDetails=function(){
			self.RakDCApplyModel.OprAcctList=[];
			self.RakDCApplyModel.selectedOprAcct="";
			self.RakDCApplyModel.MobileNo="";//Fetched from CIF Data and Masked
			self.RakDCApplyModel.OprAcctBranchList=[];
			self.RakDCApplyModel.selectedBranchId="";
			self.RakDCApplyModel.isBranchIdValidationRqd=false;
			self.RakDCApplyModel.isAddressValidationRqd=false;
			self.RakDCApplyModel.isBranchOrAddress= rootScope.appLiterals.APP.RAKDCAPPLYSR.DCAPPLY_DISPATCH_BRANCH;
			self.RakDCApplyModel.branchOrAddressToSend= "";
			self.RakDCApplyModel.mailingAddress= "";
			self.RakDCApplyModel.successMessage="";
			self.RakDCApplyModel.authFlag="N";
			self.RakDCApplyModel.authMode="";
			self.RakDCApplyModel.authStatus=false;
			self.RakDCApplyModel.txnPwd="";
			self.RakDCApplyModel.remarks="";
			self.RakDCApplyModel.emirateList= "";
		self.RakDCApplyModel.emiBranchList= "";
		self.RakDCApplyModel.emirateSeletected= "";
		self.RakDCApplyModel.emiCategorizedBranchList= "";
		self.RakDCApplyModel.isEmiSelected=false;
		self.RakDCApplyModel.emiSelDesc= "";
		self.common.message="";
		};
		// Added for Debit Cards Apply for Debit Card Request : END

	/* RAK : LOAN/FINANCE- INSTALLMENT POSTPONEMENT REQUEST : Start */
		self.installmentPostponement = {
				//PRE screen
				loanAccountNumberList : [],
				accountNumber : "",

				//Fetch Screen
				loanProductName:"",
				currency:"",
				nextInstallmentDate:"",
				nextInstallmentAmount:"",
				loanAmount:"",
				loanOverdueAmount:"",
				loanOutstanding:"",
				noOfPostponeList:[],
				postponeDesc:"",
				postponeCode:"",
				mobileNumber:"",
				notes:"",


			//reset function invoked at Landing page
			resetInstallmentPostponement : function(){
				//PRE screen
				self.installmentPostponement.loanAccountNumberList = [];
				self.installmentPostponement.accountNumber = "";

				//Fetch Screen

				self.installmentPostponement.currency = "";
				self.installmentPostponement.nextInstallmentDate = "";
				self.installmentPostponement.nextInstallmentAmount = "";
				self.installmentPostponement.loanAmount = "";
				self.installmentPostponement.loanOverdueAmount = "";
				self.installmentPostponement.loanProductName = "";
				self.installmentPostponement.loanOutstanding = "";
				self.installmentPostponement.noOfPostponeList = [];
				self.installmentPostponement.postponeDesc = "";
				self.installmentPostponement.postponeCode = "";
				self.installmentPostponement.mobileNumber = "";
				self.installmentPostponement.notes = "";
				self.common.message="";
			},

			preInstallmentPostponement:function(responsesList){
				if(responsesList[0].hasOwnProperty('loanAccountList')){
					self.installmentPostponement.loanAccountNumberList = responsesList[0].loanAccountList;
				}

				self.installmentPostponement.isBack = false;

			},
			fetchInstallmentPostponement:function(responsesList){
				if(responsesList[0].hasOwnProperty('loanAccountList')){
					self.installmentPostponement.loanAccountNumberList = responsesList[0].loanAccountList;
				}
				if(responsesList[0].hasOwnProperty('PRODUCT')){
					self.installmentPostponement.loanProductName = responsesList[0].PRODUCT;
				}
				if(responsesList[0].hasOwnProperty('CURRENCYCODE')){
					self.installmentPostponement.currency = responsesList[0].CURRENCYCODE;
				}
				if(responsesList[0].hasOwnProperty('NEXTINSTALLMENTDATE')){
					self.installmentPostponement.nextInstallmentDate = responsesList[0].NEXTINSTALLMENTDATE;
				}
				if(responsesList[0].hasOwnProperty('INSTALLMENTAMT')){
					self.installmentPostponement.nextInstallmentAmount = responsesList[0].INSTALLMENTAMT;
				}
				if(responsesList[0].hasOwnProperty('LOANAMT')){
					self.installmentPostponement.loanAmount = responsesList[0].LOANAMT;
				}
				if(responsesList[0].hasOwnProperty('OVERDUEAMT')){
					self.installmentPostponement.loanOverdueAmount = responsesList[0].OVERDUEAMT;
				}
				if(responsesList[0].hasOwnProperty('OUTSTANDINGAMT')){
					self.installmentPostponement.loanOutstanding = responsesList[0].OUTSTANDINGAMT;
				}
				if(responsesList[0].hasOwnProperty('noofpostponelist')){
					self.installmentPostponement.noOfPostponeList = responsesList[0].noofpostponelist;
				}

				self.installmentPostponement.isBack = false;
			}
		};

		self.installmentPostponement.continueClick=function(){
			self.installmentPostponement.mobileNumberString = self.installmentPostponement.mobileNumber+'';
		};

		self.confirmInstallmentPostponement = function(responsesList) {
			if (!responsesList[0].hasOwnProperty('errorMessage')) {
				self.common.message=responsesList[0].MESSAGE ? responsesList[0].MESSAGE :'';
				self.installmentPostponement.previewResponse = responsesList[0];
				self.installmentPostponement.auth = responsesList[0].auth;
				self.installmentPostponement.transactionPassword = "";
			}
			self.installmentPostponement.transactionPassword = "";

			if(responsesList[0].hasOwnProperty('postponeDesc'))
				self.installmentPostponement.postponeDesc = responsesList[0].postponeDesc;
		};

		self.successInstallmentPostponement = function(responsesList) {
			self.installmentPostponement.installmentPostponementSuccessMessage = responsesList[0].installmentPostponementSuccessMessage;
		};

		/* RAK : LOAN/FINANCE- INSTALLMENT POSTPONEMENT REQUEST : End */

/*----------------------------------------------------------------------------------------------*/

/*----------------------------------------------------------------------------------------------*/
		// - Added for Loans Finances Permanent Release Letter Request : START
		self.RakLoanFinPRLModel={
	    		LonAcctList:[],
	    		selectedLonAcct:"",
	    		duplicateRequestSelected:"",
	    		duplicateRequestToSend:"",
	    		DrAcctList:[],
	    		selectedDrAcct:"",
	    		isDrAcctValidationRqd:false,
	    		branchList:[],
	    		selectedBranchId:"",
				MobileNo:"",
				notes:"",
				successMessage:"",
				authFlag:"N",
				authMode:"",
				authStatus:false,
				txnPwd:"",
				selectedBranchDesc:"",
				emirateSeletected:""
		};
		
		//Added Newly 
		
	    self.RakLoanFinPRLOptionChange = function() {

	    	var branchListCount = 0;
	    	var emBranchDesc = [];
	    	self.RakLoanFinPRLModel.emiCategorizedBranchList = [];
	    	self.RakLoanFinPRLModel.isEmiSelected = true;
	    	//self.RAKEarlyCardRenewalModel.isEmiSelected = true;
	    	for (var x = 0; x < self.RakLoanFinPRLModel.emiBranchList.length; x++) {
	    		if (self.RakLoanFinPRLModel.emiBranchList[x].code == self.RakLoanFinPRLModel.emirateSeletected) {
	    			emBranchDesc = self.RakLoanFinPRLModel.emiBranchList[x].codeDesc
	    					.split("|");
	    			break;
	    		}
	    	}

	    	for (var x = 0; x < emBranchDesc.length; x++) {
	    		for (var y = 0; y < self.RakLoanFinPRLModel.branchList.length; y++) {
	    			if (emBranchDesc[x] == self.RakLoanFinPRLModel.branchList[y].branchId) {
	    				self.RakLoanFinPRLModel.emiCategorizedBranchList[branchListCount] = self.RakLoanFinPRLModel.branchList[y];
	    				branchListCount++;
	    			}
	    		}
	    	}

	    };
	    
		self.setLoanPreClouserBranchIndex = function(){
			if (self.RakLoanFinPRLModel.isBranchOptionSelected==false){
				self.RakLoanFinPRLModel.selectedBranch="";
				self.RakLoanFinPRLModel.branchName="";
			}
			

		for (var x = 0; x < self.RakLoanFinPRLModel.emirateList.length; x++) {
			if (self.RakLoanFinPRLModel.emirateList[x].code == self.RakLoanFinPRLModel.emirateSeletected) {
				self.RakLoanFinPRLModel.emiSelDesc = self.RakLoanFinPRLModel.emirateList[x].codeDesc;
			}
		}
		};
	    
	    //END
		
		
		self.fetchRakLoanFinPRLInitData=function(responsesList){
    		if(!responsesList[0].hasOwnProperty('errorMessage')){
				if(responsesList[0].hasOwnProperty('LonAcctList'))
					self.RakLoanFinPRLModel.LonAcctList = responsesList[0].LonAcctList;
				if(responsesList[0].hasOwnProperty('DrAcctList'))
					self.RakLoanFinPRLModel.DrAcctList = responsesList[0].DrAcctList;
				if(responsesList[0].hasOwnProperty('branchList')){
					self.RakLoanFinPRLModel.branchList = responsesList[0].branchList;
				}
				if (responsesList[0].hasOwnProperty('emirateList')) {
					self.RakLoanFinPRLModel.emirateList = responsesList[0].emirateList;
				}

				if (responsesList[0].hasOwnProperty('emiBranchList')) {
					self.RakLoanFinPRLModel.emiBranchList = responsesList[0].emiBranchList;
				}
    		}
    	};
		self.drAcctValidationRqdCheck=function(){
			if(self.RakLoanFinPRLModel.duplicateRequestSelected=="Yes"){
				self.RakLoanFinPRLModel.isDrAcctValidationRqd = true;
				self.RakLoanFinPRLModel.duplicateRequestToSend = "Y";
			}
			else{
				self.RakLoanFinPRLModel.isDrAcctValidationRqd = false;
				self.RakLoanFinPRLModel.duplicateRequestToSend = "N";
			}
		};
		self.resetRakLoanFinPRLInitDetails=function(){
			self.RakLoanFinPRLModel.LonAcctList=[];
			self.RakLoanFinPRLModel.selectedLonAcct="";
			self.RakLoanFinPRLModel.duplicateRequestSelected="";
			self.RakLoanFinPRLModel.duplicateRequestToSend="";
			self.RakLoanFinPRLModel.DrAcctList=[];
			self.RakLoanFinPRLModel.selectedDrAcct="";
			self.RakLoanFinPRLModel.isDrAcctValidationRqd=false;
			self.RakLoanFinPRLModel.branchList=[];
			self.RakLoanFinPRLModel.selectedBranchId="";
			self.RakLoanFinPRLModel.MobileNo="";
			self.RakLoanFinPRLModel.notes="";
			self.RakLoanFinPRLModel.successMessage="";
			self.RakLoanFinPRLModel.authFlag="N";
			self.RakLoanFinPRLModel.authMode="";
			self.RakLoanFinPRLModel.authStatus=false;
			self.RakLoanFinPRLModel.txnPwd="";
			self.common.message="";
			self.RakLoanFinPRLModel.emirateSeletected= "";
			self.RakLoanFinPRLModel.isEmiSelected=false;
			self.RakLoanFinPRLModel.emiSelDesc= "";
			self.RakLoanFinPRLModel.selectedBranchDesc="";
		};
    	self.confirmRakLoanFinPRL = function(responsesList){
    		if(!responsesList[0].hasOwnProperty('errorMessage')){
				if(responsesList[0].hasOwnProperty('authFlag'))
				{
					self.common.message=responsesList[0].MESSAGE ? responsesList[0].MESSAGE :'';

					self.RakLoanFinPRLModel.authFlag = responsesList[0].authFlag;
					self.RakLoanFinPRLModel.selectedBranchDesc = responsesList[0].selectedBranchDesc;

					if(self.RakLoanFinPRLModel.authFlag == "Y"){
						if(responsesList[0].auth == "")
							self.RakLoanFinPRLModel.authStatus=false;
						else
						{
							self.RakLoanFinPRLModel.authStatus=true;
							self.RakLoanFinPRLModel.authMode = responsesList[0].auth;
						}
					}
				}
			}
    	};
    	self.initRakLoanFinPRLConfirmSuccess = function(responsesList){
			if(!responsesList[0].hasOwnProperty('errorMessage'))
				self.RakLoanFinPRLModel.successMessage = responsesList[0].successMsg;
		};
		// - Added for Loans Finances Permanent Release Letter Request : END
		/*DEPOSIT ACCOUNTS SERVICE REQUEST AMEND TERM DEPOSIT STARTED */
			     self.RAKAmmendDeposit={
						depaccountList:[],
						debitopraccountList:[],
						debitopraccountListincrease:[],
						debitopraccountListdecrease:[],
						period:[],
						selectedperiod:"",
						selectedDepAccNo:"",
						selectedDebitOprAccNo:"",
						flag:false,
						instructions:"",
						increaseamtdepval:"",
						selecteddebitopraccountListincrease:"",
						decreaseamtdepval:"",
						selecteddebitopraccountListdecrease:"",
						selectedperiod:"",
						regularperiodvalue:"",
						fromDate:new Date(),
						toDate:new Date(),
						toDate_day:"",
						toDate_month:"",
						toDate_year:"",
						fromDateFormatted:"",
						toDateFormatted:"",
						creditFlag:false,
						increaseflag:false,
						decreaseflag:false,
						changetenureperiodflag:false,
						changetenuredateflag:false,
						changetenureflag:false,
						//CHANGES DONE AS FIX FOR PROUAT-1700 START
				        selectedInterest:"",
					    selectedInterestAccuredTillDate:""
					  //CHANGES DONE AS FIX FOR PROUAT-1700 END
						};


			    self.clearRAKAmmendDepositData=function(){
				    self.RAKAmmendDeposit.depaccountList=null;
				    self.RAKAmmendDeposit.debitopraccountList=null;
				    self.RAKAmmendDeposit.debitopraccountListincrease=null;
				    self.RAKAmmendDeposit.debitopraccountListdecrease=null;
				    self.RAKAmmendDeposit.period=null;
				    self.RAKAmmendDeposit.selectedperiod="";
				    self.RAKAmmendDeposit.selectedDepAccNo="";
				    self.RAKAmmendDeposit.selectedDebitOprAccNo="";
				    self.RAKAmmendDeposit.flag=false;
				    self.RAKAmmendDeposit.instructions="";
				    self.RAKAmmendDeposit.increaseamtdepval="";
				    self.RAKAmmendDeposit.selecteddebitopraccountListincrease="";
				    self.RAKAmmendDeposit.decreaseamtdepval="";
				    self.RAKAmmendDeposit.selecteddebitopraccountListdecrease="";
				    self.RAKAmmendDeposit.selectedperiod="";
				    self.RAKAmmendDeposit.regularperiodvalue="";
				    self.RAKAmmendDeposit.fromDate="";
				    self.RAKAmmendDeposit.toDate= new Date();
				    self.RAKAmmendDeposit.toDate_day="";
				    self.RAKAmmendDeposit.toDate_month="";
				    self.RAKAmmendDeposit.toDate_year="";
				    self.RAKAmmendDeposit.fromDateFormatted="";
				    self.RAKAmmendDeposit.toDateFormatted="";
				    self.RAKAmmendDeposit.changetenureperiodflag=false;
				    self.RAKAmmendDeposit.changetenuredateflag=false;
				    self.RAKAmmendDeposit.decreaseflag=false;
				    self.RAKAmmendDeposit.increaseflag=false;
				    self.RAKAmmendDeposit.creditFlag=false;
				    self.RAKAmmendDeposit.changetenureflag=false;
				  //CHANGES DONE AS FIX FOR PROUAT-1700 START
				    self.RAKAmmendDeposit.selectedInterest="";
				    self.RAKAmmendDeposit.selectedInterestAccuredTillDate="";
				  //CHANGES DONE AS FIX FOR PROUAT-1700 END
				    self.common.message = "";
				   };

			      self.initRAKAmmendDeposit=function(responsesList){
			    	  if(!responsesList[0].hasOwnProperty('errorMessage')){

			    	  if(responsesList[0].hasOwnProperty('depositAccountsList'))
			    		  self.RAKAmmendDeposit.depaccountList=responsesList[0].depositAccountsList;

			    	  //CHANGES FOR AMEND MATURITY DEP VALUES READ ONLY  START
			    	  else if(responsesList[0].hasOwnProperty('operativeAccountsList'))
		    		  {
						  self.RAKAmmendDeposit.debitopraccountList=responsesList[0].operativeAccountsList;
				          self.RAKAmmendDeposit.debitopraccountListincrease=responsesList[0].operativeAccountsList;
				          self.RAKAmmendDeposit.debitopraccountListdecrease=responsesList[0].operativeAccountsList;
						  self.RAKAmmendDeposit.period=responsesList[0].Period;

						  self.RAKAmmendDeposit.selectedepaccountnum=responsesList[0].accountNumber;
						  self.RAKAmmendDeposit.selectedepstartDate=responsesList[0].depositestartDate;
						  self.RAKAmmendDeposit.selectedepmaturityendDate=responsesList[0].maturityDate;
                          self.RAKAmmendDeposit.selectedepamount=responsesList[0].depositeAmount;
						  self.RAKAmmendDeposit.selectedmaturityamount=responsesList[0].maturityAmount;

						  //CHANGES DONE AS FIX FOR PROUAT-1700 and PROUAT-2857 START
						  self.RAKAmmendDeposit.selectedInterest=responsesList[0].interestRate;
						  if(self.RAKAmmendDeposit.selectedInterest=='')
							  {
							  self.RAKAmmendDeposit.selectedInterest='0.00';
							  }
						  self.RAKAmmendDeposit.selectedInterestAccuredTillDate=responsesList[0].interestAccuredTillDate;
						  //CHANGES DONE AS FIX FOR PROUAT-1700 and PROUAT-2857 END
		    		  }
			    	  }
			    	//CHANGES FOR AMEND MATURITY DEP VALUES READ ONLY END
			    	};

			    	
			    	 self.clearDyanmicAmmendDepValue=function()
				      {
				    	  switch(self.RAKAmmendDeposit.instructions.toString())
				    	  {
				    	  case "C":
				    		  self.RAKAmmendDeposit.increaseamtdepval='';
				    		  self.RAKAmmendDeposit.selecteddebitopraccountListincrease='';
				    		  self.RAKAmmendDeposit.decreaseamtdepval='';
				    		  self.RAKAmmendDeposit.selecteddebitopraccountListdecrease='';
				    		  self.RAKAmmendDeposit.regularperiodvalue='';
				    		  self.RAKAmmendDeposit.selectedperiod='';
				    		  self.RAKAmmendDeposit.toDate='';
				    		 break;
				    	  case "I":
				    		  self.RAKAmmendDeposit.selectedDebitOprAccNo='';
				    		  self.RAKAmmendDeposit.decreaseamtdepval='';
				    		  self.RAKAmmendDeposit.selecteddebitopraccountListdecrease='';
				    		  self.RAKAmmendDeposit.regularperiodvalue='';
				    		  self.RAKAmmendDeposit.selectedperiod='';
				    		  self.RAKAmmendDeposit.toDate='';
				    		 break;
				    	  case "D":
				    		  self.RAKAmmendDeposit.selectedDebitOprAccNo='';
				    		  self.RAKAmmendDeposit.increaseamtdepval=''; 
				    		  self.RAKAmmendDeposit.selecteddebitopraccountListincrease='';
				    		  self.RAKAmmendDeposit.regularperiodvalue='';
				    		  self.RAKAmmendDeposit.selectedperiod='';
				    		  self.RAKAmmendDeposit.toDate='';
				    		 break;
				    	  case "CTD":
				    		  self.RAKAmmendDeposit.selectedDebitOprAccNo='';
				    		  self.RAKAmmendDeposit.increaseamtdepval='';  
				    		  self.RAKAmmendDeposit.selecteddebitopraccountListincrease='';
				    		  self.RAKAmmendDeposit.decreaseamtdepval='';
				    		  self.RAKAmmendDeposit.selecteddebitopraccountListdecrease='';
				    		  if(self.RAKAmmendDeposit.regularperiodvalue=='RegP')
				    		  {
				    			  self.RAKAmmendDeposit.toDate='';
				    		  }
				    		  else if(self.RAKAmmendDeposit.regularperiodvalue=='Date')
							  {
				    			  self.RAKAmmendDeposit.selectedperiod='';
							  }
				    		 break;
                           }

				      };

				      self.checkHiddenFieldForAmmendDepValue=function()
				      {
				    	  switch(self.RAKAmmendDeposit.instructions.toString())
				    	  {
				    	  case "C":
				    		  self.RAKAmmendDeposit.creditFlag=true;
				    		 break;
				    	  case "I":
				    		  self.RAKAmmendDeposit.increaseflag=true;
				    		 break;
				    	  case "D":
				    		  self.RAKAmmendDeposit.decreaseflag=true;
				    		 break;
				    	  case "CTD":
				    		  self.RAKAmmendDeposit.changetenureflag=true;
				    		  if(self.RAKAmmendDeposit.regularperiodvalue=='RegP')
				    		  {
				    		       self.RAKAmmendDeposit.changetenureperiodflag=true;
				    		       break;
				    		  }
				    		  else if(self.RAKAmmendDeposit.regularperiodvalue=='Date')
							  {
							  self.RAKAmmendDeposit.changetenuredateflag=true;
							  break;
							  }
				    		  else break;

				    	  }

				      };
				      self.flagClear=function()
				      {
				    	  self.RAKAmmendDeposit.creditFlag=false;
				    	  self.RAKAmmendDeposit.increaseflag=false;
				    	  self.RAKAmmendDeposit.decreaseflag=false;
				    	  self.RAKAmmendDeposit.changetenureflag=false;
				    	  self.RAKAmmendDeposit.changetenureperiodflag=false;
				    	  self.RAKAmmendDeposit.changetenuredateflag=false;
				      };

				      self.setRAKAmmendDepositDate = function() {
				    	  if(self.RAKAmmendDeposit.toDate!='')
				    	   {
				    	    self.common.displayDate = self.RAKAmmendDeposit.toDate;
					  		self.populateCurrentDateDetails(self.RAKAmmendDeposit.toDate);
					  		self.RAKAmmendDeposit.toDate_day =self.common.date;
					  		self.RAKAmmendDeposit.toDate_month=self.common.month;
					  		self.RAKAmmendDeposit.toDate_year=self.common.year;
				    	   }
				    	  else
				    		  {
				    		    self.common.displayDate = new Date();
						  		self.populateCurrentDateDetails(self.RAKAmmendDeposit.toDate);
						  		self.RAKAmmendDeposit.toDate_day =self.common.date;
						  		self.RAKAmmendDeposit.toDate_month=self.common.month;
						  		self.RAKAmmendDeposit.toDate_year=self.common.year;
				    		  }
					   };
					self.GenericAuthorizationVariable={
							auth:"",
							authStatus:true,
							authMode:"",
							transactionPassword:"",
					};

					self.initGenericConfirmationMethod = function(responsesList){
						if(!responsesList[0].hasOwnProperty('errorMessage')){
							
							if (responsesList[0].hasOwnProperty('selectedDesc'))
							{
								self.RAKRenewalTermDeposit.selectedperiodDesc=responsesList[0].selectedDesc;
							
							}
							if (responsesList[0].hasOwnProperty('previewDate'))
							{
								self.RAKRenewalTermDeposit.previewDate=responsesList[0].previewDate;
							
							}
							if (responsesList[0].hasOwnProperty('previewDateTwo'))
							{
								self.RAKRenewalTermDeposit.previewDateTwo=responsesList[0].previewDateTwo;
							
							}

							self.common.message=responsesList[0].MESSAGE ? responsesList[0].MESSAGE :'';

							if(responsesList[0].auth == "")
								self.GenericAuthorizationVariable.authStatus=false;


							else
							{
								self.GenericAuthorizationVariable.authStatus=true;
								self.GenericAuthorizationVariable.authMode = responsesList[0].auth;
							}
						if(self.RAKChangeReportCapture.captureList){
							for(var temp in self.RAKChangeReportCapture.captureList){
			  					if(self.RAKChangeReportCapture.captureList[temp].code==self.RAKChangeReportCaptureModel.selectedCapture){
			  						self.RAKChangeReportCaptureModel.selectedCaptureDesc=self.RAKChangeReportCapture.captureList[temp].description;
			  						break;
			  					}
			  				}
						}

							//CHANGES DONE AS FIX OF PROUAT-2857 START
													if(responsesList[0].TO_DATE != "")
														{
														self.RAKAmmendDeposit.toDateFormatted=responsesList[0].TO_DATE;
														}
													//CHANGES DONE AS FIX OF PROUAT-2857 END



						}
					};

					//CHANGES FOR AMEND ISLAMIC DEPOSIT START
						 self.RAKAmmendIslamicDeposit={
									selectedDepAccNo:"",
									instructions:"",
									selectedDebitOprAccNo:""
							};

						 self.clearRAKAmmendDepositIslamicData=function(){
								self.RAKAmmendIslamicDeposit.selectedDepAccNo="";
								self.RAKAmmendIslamicDeposit.instructions="";
								self.RAKAmmendIslamicDeposit.selectedDebitOprAccNo="";
							   };
				//CHANGES FOR AMEND ISLAMIC DEPOSIT END

					self.showRAKAmmendDepFormattedDate=function(){
						self.RAKAmmendDeposit.formattedToDateSend = self.setFormatedDate(self.RAKAmmendDeposit.toDate);
						self.RAKAmmendDeposit.formattedToDate = new Date(self.RAKAmmendDeposit.toDate.toString());
					};
		/*DEPOSIT ACCOUNTS SERVICE REQUEST AMEND TERM DEPOSIT ENDED */

		/*RAK ::6  Opr Evantage Mail Cheque Request START*/
	self.RakOprEvantageMailChqReq={

			reason:"",
			amtNum:"",
			amtWords:"",
			quantity:"",
			benName:"",
			txnPwd:"",
			reasonList:[],
			authStatus:true,
			authMode :"",
			txnPwd:"",
			quantityCheck:false,
			successMessage:"",
			others:"",
			othersLength:false,
			counter:0,
			othersMandatory:false,
			removeOption:"",
			EditOption:"",
			nameArray:new Array(4),
			quantityArray:new Array(4),
			amtWrdsArray:new Array(4),
			amtArray:new Array(4),
			reasonArray:new Array(4),
			othersArray:new Array(4),
			counterCheck:false,
			nameFinalArray:new Array(4),
			quantityFinalArray:new Array(4),
			amtWrdsFinalArray:new Array(4),
			amtFinalArray:new Array(4),
			reasonFinalArray:new Array(4),
			othersFinalArray:new Array(4),
				amtConfirmArray:[],

			resetRakOprEvantageMailChqHome :function()
			{
				self.RakOprEvantageMailChqReq.authMode ="";
				self.RakOprEvantageMailChqReq.reasonList=[];
				self.RakOprEvantageMailChqReq.amtNum="";
				self.RakOprEvantageMailChqReq.reason="";
				self.RakOprEvantageMailChqReq.amtWords="";
				self.RakOprEvantageMailChqReq.benName="";
				self.RakOprEvantageMailChqReq.txnPwd="";
				self.RakOprEvantageMailChqReq.counter=0;
				self.RakOprEvantageMailChqReq.counterString="0";
				self.RakOprEvantageMailChqReq.nameArray=new Array(4);
				self.RakOprEvantageMailChqReq.amtArray=new Array(4);
				self.RakOprEvantageMailChqReq.amtWrdsArray=new Array(4);
				self.RakOprEvantageMailChqReq.othersMandatory=false;
				self.RakOprEvantageMailChqReq.quantityArray=new Array(4);
				self.RakOprEvantageMailChqReq.reasonArray=new Array(4);
				self.RakOprEvantageMailChqReq.othersArray =new Array(4);
				self.RakOprEvantageMailChqReq.removeOption="";
				self.RakOprEvantageMailChqReq.EditOption="";
				self.RakOprEvantageMailChqReq.successMessage="";
				self.RakOprEvantageMailChqReq.counterCheck=false;
				self.RakOprEvantageMailChqReq.nameFinalArray=new Array(4);
				self.RakOprEvantageMailChqReq.amtFinalArray=new Array(4);
				self.RakOprEvantageMailChqReq.amtWrdsFinalArray=new Array(4);
				self.RakOprEvantageMailChqReq.othersFinalMandatory=false;
				self.RakOprEvantageMailChqReq.quantityFinalArray=new Array(4);
				self.RakOprEvantageMailChqReq.reasonFinalArray=new Array(4);
				self.RakOprEvantageMailChqReq.othersFinalArray =new Array(4);
				self.RakOprEvantageMailChqReq.amtConfirmArray="";
				self.RakOprEvantageMailChqReq.quantity="";
				self.RakOprEvantageMailChqReq.others="";
			},
			resetRakOprEvantageMailChqConfirm :function()
			{
				self.RakOprEvantageMailChqReq.txnPwd="";
				self.RakOprEvantageMailChqReq.counterCheck=false;
				self.RakOprEvantageMailChqReq.othersMandatory=false;
				self.RakOprEvantageMailChqReq.amtConfirmArray= self.RakOprEvantageMailChqReq.amtArray.toString();
			},
			rakRakOprEvantageMailChqReqOthers:function()
			{
				if (self.RakOprEvantageMailChqReq.reason=='Others')
					self.RakOprEvantageMailChqReq.otherMandatory=true;

			}

	};

	self.rakOprEvantageMailChqReqInit=function(responselist){


		if (!responselist[0].hasOwnProperty('errorMessage'))
		{
		if (responselist[0].hasOwnProperty('reasonList'))
		{
			self.RakOprEvantageMailChqReq.reasonList=responselist[0].reasonList;
		}
		}
	};

	self.rakOprEvantageMailChqReqConfirm=function(responsesList){



		if (!responsesList[0].hasOwnProperty('errorMessage'))
		{
			if(responsesList[0].auth == "")
				self.RakOprEvantageMailChqReq.authStatus=false;
			else
			{
				self.RakOprEvantageMailChqReq.authStatus=true;
				self.RakOprEvantageMailChqReq.authMode = responsesList[0].auth;
			}

			if (responsesList[0].hasOwnProperty('payAmt'))
			{
				self.RakOprEvantageMailChqReq.amtConfirmArray=responsesList[0].payAmt;
			}

			self.common.message=responsesList[0].MESSAGE ? responsesList[0].MESSAGE :'';

		}
		self.common.message=responsesList[0].MESSAGE;
		self.RakOprEvantageMailChqReq.amtNum=self.RakOprEvantageMailChqReq.amtNum.toString();
		self.RakOprEvantageMailChqReq.quantity=self.RakOprEvantageMailChqReq.quantity.toString();


	};

	self.rakOprEvantageMailChqReqCheckQuantity=function()
	{

		if(self.RakOprEvantageMailChqReq.quantity<99)
		{
			self.RakOprEvantageMailChqReq.quantityCheck=true;
		}
		else
			self.RakOprEvantageMailChqReq.quantityCheck=false;

		if (self.RakOprEvantageMailChqReq.othersMandatory== true && self.RakOprEvantageMailChqReq.others!="" &&  self.RakOprEvantageMailChqReq.others.length <=70 )
			self.RakOprEvantageMailChqReq.othersLength = true;
		else
			self.RakOprEvantageMailChqReq.othersLength= false;



	};
	self.rakOprEvantageMailChqReqSuccess=function(responselist){

		if (!responselist[0].hasOwnProperty('errorMessage'))
		{
			self.RakOprEvantageMailChqReq.successMessage=responselist[0].successRequest;
		}


	};

	self.rakOprEvantageMailChqReqAddToList=function(){
		self.RakOprEvantageMailChqReq.amtNum=self.RakOprEvantageMailChqReq.amtNum!=null? self.RakOprEvantageMailChqReq.amtNum :"";
		
		// Commented as WorAround to handle single record
		/* if (self.RakOprEvantageMailChqReq.counter==4 )
			{

			rootScope.showErrorPopup(rootScope.appLiterals.APP.RAKERRORMSG.VALIDATORTYPEMSG.isMax4Number);


			}
		else*/ 
		// Commented as WorkAround to handle single record
		
		if (self.RakOprEvantageMailChqReq.quantity!="" && self.RakOprEvantageMailChqReq.quantity>99 )
			{
			rootScope.showErrorPopup(rootScope.appLiterals.APP.RAKERRORMSG.VALIDATORTYPEMSG.isQuantity99);
            return;


			}
		else if (self.RakOprEvantageMailChqReq.quantity!="" && self.RakOprEvantageMailChqReq.quantity<=0 )
		{
			rootScope.showErrorPopup(rootScope.appLiterals.APP.RAKERRORMSG.VALIDATORTYPEMSG.isQuantityZero);

            return;

		}
		/*else if(/^[a-zA-Z0-9]+([ ][a-zA-Z0-9]+)*$/.test(self.RakOprEvantageMailChqReq.amtWords) === false) {

			rootScope.pageErrorArr["rakServiceReq.RakOprEvantageMailChqReq.amtWords"]=rootScope.appLiterals.APP.RAKERRORMSG.VALIDATORTYPEMSG['isAlphaNumericWithSpace'];



		}*/
		else
		if(self.RakOprEvantageMailChqReq.counter<4 && self.RakOprEvantageMailChqReq.benName!=""  && self.RakOprEvantageMailChqReq.quantity!="" && 
				self.RakOprEvantageMailChqReq.quantity<=99 && self.RakOprEvantageMailChqReq.quantity>=1 &&  self.RakOprEvantageMailChqReq.reason!="" &&
				((self.RakOprEvantageMailChqReq.amtNum!="" && self.RakOprEvantageMailChqReq.amtWords!="") || (self.RakOprEvantageMailChqReq.amtNum=="" && self.RakOprEvantageMailChqReq.amtWords=="")))
		{
			
			// Added as WorAround to handle single record
			if(self.RakOprEvantageMailChqReq.quantity<99)
			{
				self.RakOprEvantageMailChqReq.quantityCheck=true;
			}
			else
				self.RakOprEvantageMailChqReq.quantityCheck=false;

			if (self.RakOprEvantageMailChqReq.othersMandatory== true && self.RakOprEvantageMailChqReq.others!="" &&  self.RakOprEvantageMailChqReq.others.length <=70 )
				self.RakOprEvantageMailChqReq.othersLength = true;
			else
				self.RakOprEvantageMailChqReq.othersLength= false;
			
			
			
			if (self.RakOprEvantageMailChqReq.counter >=0)
			{
				self.RakOprEvantageMailChqReq.counterCheck = true;
			}
			else
				{
				self.RakOprEvantageMailChqReq.counterCheck = false;
				}
			
			
			if (self.RakOprEvantageMailChqReq.reason=='Others')
				self.RakOprEvantageMailChqReq.otherMandatory=true;

		
			
			// Added as WorAround to handle single record
			

			// Commented as WorAround to handle single record	
	/*		if(self.RakOprEvantageMailChqReq.EditOption!=""){
				
				if (self.RakOprEvantageMailChqReq.othersMandatory== true && self.RakOprEvantageMailChqReq.others!="" &&  self.RakOprEvantageMailChqReq.others.length <=70 )
				{
					self.RakOprEvantageMailChqReq.nameArray[self.RakOprEvantageMailChqReq.EditOption]=self.RakOprEvantageMailChqReq.benName.toString();
					if(self.RakOprEvantageMailChqReq.amtNum != '')
					self.RakOprEvantageMailChqReq.amtArray[self.RakOprEvantageMailChqReq.EditOption]=self.RakOprEvantageMailChqReq.amtNum.toString();
					if(self.RakOprEvantageMailChqReq.amtWords != '')
					self.RakOprEvantageMailChqReq.amtWrdsArray[self.RakOprEvantageMailChqReq.EditOption]=self.RakOprEvantageMailChqReq.amtWords.toString();
					self.RakOprEvantageMailChqReq.quantityArray[self.RakOprEvantageMailChqReq.EditOption]=Number(self.RakOprEvantageMailChqReq.quantity);
					self.RakOprEvantageMailChqReq.reasonArray[self.RakOprEvantageMailChqReq.EditOption]=self.RakOprEvantageMailChqReq.reason.toString();
					self.RakOprEvantageMailChqReq.othersArray[self.RakOprEvantageMailChqReq.EditOption]=self.RakOprEvantageMailChqReq.others.toString();



					self.RakOprEvantageMailChqReq.EditOption="";
					self.RakOprEvantageMailChqReq.counterCheck=true;


					self.RakOprEvantageMailChqReq.amtNum="";
					self.RakOprEvantageMailChqReq.reason="";
					self.RakOprEvantageMailChqReq.amtWords="";
					self.RakOprEvantageMailChqReq.benName="";
					self.RakOprEvantageMailChqReq.others="";
					self.RakOprEvantageMailChqReq.quantity="";
					self.RakOprEvantageMailChqReq.othersMandatory=false;
					self.RakOprEvantageMailChqReq.quantityCheck=false;
				}

				else
					if(self.RakOprEvantageMailChqReq.othersMandatory== false)
					{
						self.RakOprEvantageMailChqReq.nameArray[self.RakOprEvantageMailChqReq.EditOption]=self.RakOprEvantageMailChqReq.benName.toString();
						if(self.RakOprEvantageMailChqReq.amtNum != '')
						self.RakOprEvantageMailChqReq.amtArray[self.RakOprEvantageMailChqReq.EditOption]=self.RakOprEvantageMailChqReq.amtNum.toString();
						if(self.RakOprEvantageMailChqReq.amtWords != '')
						self.RakOprEvantageMailChqReq.amtWrdsArray[self.RakOprEvantageMailChqReq.EditOption]=self.RakOprEvantageMailChqReq.amtWords.toString();
						self.RakOprEvantageMailChqReq.quantityArray[self.RakOprEvantageMailChqReq.EditOption]=Number(self.RakOprEvantageMailChqReq.quantity);
						self.RakOprEvantageMailChqReq.reasonArray[self.RakOprEvantageMailChqReq.EditOption]=self.RakOprEvantageMailChqReq.reason.toString();
						self.RakOprEvantageMailChqReq.othersArray[self.RakOprEvantageMailChqReq.EditOption]= "%null%";

						self.RakOprEvantageMailChqReq.EditOption="";
						self.RakOprEvantageMailChqReq.counterCheck=true;


						self.RakOprEvantageMailChqReq.amtNum="";
						self.RakOprEvantageMailChqReq.reason="";
						self.RakOprEvantageMailChqReq.amtWords="";
						self.RakOprEvantageMailChqReq.benName="";
						self.RakOprEvantageMailChqReq.others="";
						self.RakOprEvantageMailChqReq.quantity="";
						self.RakOprEvantageMailChqReq.othersMandatory=false;
						self.RakOprEvantageMailChqReq.quantityCheck=false;

					}
				self.RakOprEvantageMailChqOthers();
				self.rakOprEvantageMailChqReqCheckQuantity();
				
				self.RakOprEvantageMailChqCheckCounterValue();
				self.RakOprEvantageMailChqReq.rakRakOprEvantageMailChqReqOthers();
				scope.setEvent('onRAKOprEvantageMailChqReqConfirmClick');
				
				
			}
			else
				{*/
				
				/*scope.setEvent('onRAKOprEvantageMailChqReqAddListClick');*/
			
			// Commented as WorkAround to handle single record

			// Added as WorkAround to handle single record
			self.RakOprEvantageMailChqReq.nameArray=[];
			self.RakOprEvantageMailChqReq.amtArray=[];
			self.RakOprEvantageMailChqReq.amtWrdsArray=[];
			self.RakOprEvantageMailChqReq.reasonArray=[];
			self.RakOprEvantageMailChqReq.othersArray=[];
			self.RakOprEvantageMailChqReq.counter=0;
			// Added as WorkAround to handle single record
			
			if (self.RakOprEvantageMailChqReq.othersMandatory== true && self.RakOprEvantageMailChqReq.others!="" &&  self.RakOprEvantageMailChqReq.others.length <=70 )
			{
				self.RakOprEvantageMailChqReq.nameArray[self.RakOprEvantageMailChqReq.counter]=self.RakOprEvantageMailChqReq.benName.toString();
				self.RakOprEvantageMailChqReq.amtArray[self.RakOprEvantageMailChqReq.counter]=self.RakOprEvantageMailChqReq.amtNum.toString();
				self.RakOprEvantageMailChqReq.amtWrdsArray[self.RakOprEvantageMailChqReq.counter]=self.RakOprEvantageMailChqReq.amtWords.toString();
				self.RakOprEvantageMailChqReq.quantityArray[self.RakOprEvantageMailChqReq.counter]=self.RakOprEvantageMailChqReq.quantity.toString();
				self.RakOprEvantageMailChqReq.reasonArray[self.RakOprEvantageMailChqReq.counter]=self.RakOprEvantageMailChqReq.reason.toString();
				self.RakOprEvantageMailChqReq.othersArray[self.RakOprEvantageMailChqReq.counter]=self.RakOprEvantageMailChqReq.others.toString();


// Commented as WorkAround to handle single record
			/*	self.RakOprEvantageMailChqReq.counter++;
				self.RakOprEvantageMailChqReq.counterCheck=true;


				self.RakOprEvantageMailChqReq.amtNum="";
				self.RakOprEvantageMailChqReq.reason="";
				self.RakOprEvantageMailChqReq.amtWords="";
				self.RakOprEvantageMailChqReq.benName="";
				self.RakOprEvantageMailChqReq.others="";
				self.RakOprEvantageMailChqReq.quantity="";
				self.RakOprEvantageMailChqReq.othersMandatory=false;
				self.RakOprEvantageMailChqReq.quantityCheck=false;*/
				
// Commented as WorAround to handle single record				
			}

			else
				if(self.RakOprEvantageMailChqReq.othersMandatory== false)
				{
					self.RakOprEvantageMailChqReq.nameArray[self.RakOprEvantageMailChqReq.counter]=self.RakOprEvantageMailChqReq.benName.toString();
					self.RakOprEvantageMailChqReq.amtArray[self.RakOprEvantageMailChqReq.counter]=self.RakOprEvantageMailChqReq.amtNum.toString();
					self.RakOprEvantageMailChqReq.amtWrdsArray[self.RakOprEvantageMailChqReq.counter]=self.RakOprEvantageMailChqReq.amtWords.toString();
					self.RakOprEvantageMailChqReq.quantityArray[self.RakOprEvantageMailChqReq.counter]=self.RakOprEvantageMailChqReq.quantity.toString();
					self.RakOprEvantageMailChqReq.reasonArray[self.RakOprEvantageMailChqReq.counter]=self.RakOprEvantageMailChqReq.reason.toString();
					self.RakOprEvantageMailChqReq.othersArray[self.RakOprEvantageMailChqReq.counter]= "%null%";

					// Commented as WorkAround to handle single record
					/*self.RakOprEvantageMailChqReq.counter++;
					self.RakOprEvantageMailChqReq.counterCheck=true;


					self.RakOprEvantageMailChqReq.amtNum="";
					self.RakOprEvantageMailChqReq.reason="";
					self.RakOprEvantageMailChqReq.amtWords="";
					self.RakOprEvantageMailChqReq.benName="";
					self.RakOprEvantageMailChqReq.others="";
					self.RakOprEvantageMailChqReq.quantity="";
					self.RakOprEvantageMailChqReq.othersMandatory=false;
					self.RakOprEvantageMailChqReq.quantityCheck=false;*/

					// Commented as WorkAround to handle single record
				}
			
			
			}
		scope.setEvent('onRAKOprEvantageMailChqReqConfirmClick');
			
		// Commented as WorkAround to handle single record
	//}
		// Commented as WorkAround to handle single record
		
	};
	
	self.RakOprEvantageMailChqEditList = function()
	{
		var index= self.RakOprEvantageMailChqReq.EditOption;
		if(index!="")
			{
			
			self.RakOprEvantageMailChqReq.benName  = self.RakOprEvantageMailChqReq.nameArray[index];
			self.RakOprEvantageMailChqReq.amtNum  = Number(self.RakOprEvantageMailChqReq.amtArray[index]);
			self.RakOprEvantageMailChqReq.amtWords  = self.RakOprEvantageMailChqReq.amtWrdsArray[index];
			self.RakOprEvantageMailChqReq.quantity  = self.RakOprEvantageMailChqReq.quantityArray[index];
			self.RakOprEvantageMailChqReq.reason  = self.RakOprEvantageMailChqReq.reasonArray[index];
			self.RakOprEvantageMailChqReq.others  = self.RakOprEvantageMailChqReq.othersArray[index];
	
			self.RakOprEvantageMailChqReq.amtConfirmArray[index];
		
			
			
			scope.setEvent('onRakOprEvantageMailChqConfirmEditClick');

		}
		
	};


	self.RakOprEvantageMailChqRemoveFromList = function()
	{
		var index= self.RakOprEvantageMailChqReq.removeOption;
		if(index!="")
		{self.RakOprEvantageMailChqReq.nameArray.splice(index,1);
		self.RakOprEvantageMailChqReq.amtArray.splice(index,1);
		self.RakOprEvantageMailChqReq.amtWrdsArray.splice(index,1);
		self.RakOprEvantageMailChqReq.quantityArray.splice(index,1);
		self.RakOprEvantageMailChqReq.reasonArray.splice(index,1);
		self.RakOprEvantageMailChqReq.othersArray.splice(index,1);

		self.RakOprEvantageMailChqReq.amtConfirmArray.splice(index,1);
		self.RakOprEvantageMailChqReq.counter--;
		self.RakOprEvantageMailChqReq.removeOption="";

		}
		
		if(self.RakOprEvantageMailChqReq.counter==0){
			scope.setEvent('onRAKOprEvantageMailChqConfirmBackClick');
		}

	};

	self.RakOprEvantageMailChqArrayaToString=function()
	{ var i = 0;
		for (i=0; i<=self.RakOprEvantageMailChqReq.counter; i ++)
		{
			self.RakOprEvantageMailChqReq.nameFinalArray[i]=self.RakOprEvantageMailChqReq.nameArray[i];
			self.RakOprEvantageMailChqReq.amtFinalArray[i]=self.RakOprEvantageMailChqReq.amtArray[i];
			self.RakOprEvantageMailChqReq.amtWrdsFinalArray[i]=self.RakOprEvantageMailChqReq.amtWrdsArray[i];

			self.RakOprEvantageMailChqReq.quantityFinalArray[i]=	self.RakOprEvantageMailChqReq.quantityArray[i];
			self.RakOprEvantageMailChqReq.reasonFinalArray[i]=self.RakOprEvantageMailChqReq.reasonArray[i];
			self.RakOprEvantageMailChqReq.othersFinalArray[i] = self.RakOprEvantageMailChqReq.othersArray[i];
		}
	self.RakOprEvantageMailChqReq.nameFinalArray=self.RakOprEvantageMailChqReq.nameFinalArray.toString();
	self.RakOprEvantageMailChqReq.amtFinalArray=self.RakOprEvantageMailChqReq.amtFinalArray.toString();
	self.RakOprEvantageMailChqReq.amtWrdsFinalArray=self.RakOprEvantageMailChqReq.amtWrdsFinalArray.toString();

	self.RakOprEvantageMailChqReq.quantityFinalArray=	self.RakOprEvantageMailChqReq.quantityFinalArray.toString();
	self.RakOprEvantageMailChqReq.reasonFinalArray=self.RakOprEvantageMailChqReq.reasonFinalArray.toString();
	self.RakOprEvantageMailChqReq.othersFinalArray = self.RakOprEvantageMailChqReq.othersFinalArray.toString();
	};

	self.RakOprEvantageMailChqOthers=function()
	{
		if (self.RakOprEvantageMailChqReq.reason=='Others'){
			self.RakOprEvantageMailChqReq.othersMandatory=true;
		}
		else{
			self.RakOprEvantageMailChqReq.othersMandatory=false;
		}
	};

	self.RakOprEvantageMailChqCheckCounterValue= function()
	{
		// Commented as WorkAround to handle single record
		//if (self.RakOprEvantageMailChqReq.counter >=0)
		// Commented as WorkAround to handle single record
		
		
		if (self.RakOprEvantageMailChqReq.counter >=0)
		{
			self.RakOprEvantageMailChqReq.counterCheck = true;
		}
		else
			{
			self.RakOprEvantageMailChqReq.counterCheck = false;
			
			// Commented as WorkAround to handle single record
			//rootScope.showErrorPopup(rootScope.appLiterals.APP.RAK_SERVICES.RAK_OPR_EVMAILCHQ.ATLEAST_ONE_BENF);
			// Commented as WorkAround to handle single record
			}

	};
	/*RAK ::6  Opr Evantage Mail Cheque Request END*/
		/*DEPOSIT ACCOUNTS SERVICE REQUEST RENEWAL TERM DEPOSIT STARTED*/
					  self.RAKRenewalTermDeposit={
								depaccountList:[],
								debitopraccountList:[],
								maturityopraccountList:[],
								InterestHandlingopraccountList:[],
								currency:[],
								period:[],
								selectedperiod:"",
								selectedDepAccNo:"",
								selectedcurrency:"",
								selectedOprAccNo:"",
								selectedDebitOprAccNo:"",
								selectedMaturityOprAccNo:"",
								renewalamount:"",
								renewalamountcurreny:"",
								interesttobecapitalized:"",
								renewalperiod:"",
								debitaccountnumber:"",
								onmaturity:"",
								onamturityradiobtn:"",
								interesthandling:"",
								fromDate:new Date(),
								fromDate_day:"",
								fromDate_month:"",
								fromDate_year:"",
								toDate:new Date(),
								toDate_day:"",
								toDate_month:"",
								toDate_year:"",
								fromDateformatted:"",
								toDateformatted:"",
								flag:false,
								selectedIAOprAccNo:"",
								selecteddepreferencenum:"",
								selectedepaccountnum:"",
								selectedepstartDate:"",
								selectedepmaturityendDate:"",
								selectedepamount:"",
								selectedmaturityamount:"",
								minrenewalamount:0,
								daterequiredflag:"",
								minrenewalamountflag:false,
								periodflag:false,
								dateflag:false,
								proceedtomyaccountflag:false,
								autoflag:false,
								creditinteresthandlingaccountflag:false,
								addinteresthandlingaccountflag:false,
								intRate:'',
								intTillDate:'',
								selectedperiodDesc:'',
								previewDate:'',
								previewDateTwo:'',
								//CHANGES DONE AS FIX OF PROUAT-2640 START
								isIslamicClicked:false,
								//CHANGES DONE AS FIX OF PROUAT-2640 END
								};


						self.clearRAKRenewalTermDepositData=function(){
							    self.RAKRenewalTermDeposit.debitopraccountList=null;
						        self.RAKRenewalTermDeposit.maturityopraccountList=null;
						        self.RAKRenewalTermDeposit.InterestHandlingopraccountList=null;
							    self.RAKRenewalTermDeposit.depaccountList=null;
							    self.RAKRenewalTermDeposit.currency=null;
							    self.RAKRenewalTermDeposit.period=null;
								self.RAKRenewalTermDeposit.selectedperiod="",
								self.RAKRenewalTermDeposit.selectedDepAccNo="",
								self.RAKRenewalTermDeposit.selectedcurrency="",
								self.RAKRenewalTermDeposit.selectedOprAccNo="",
								self.RAKRenewalTermDeposit.selectedDebitOprAccNo="",
								self.RAKRenewalTermDeposit.selectedMaturityOprAccNo="",
								self.RAKRenewalTermDeposit.renewalamount="",
								self.RAKRenewalTermDeposit.renewalamountcurreny="",
								self.RAKRenewalTermDeposit.interesttobecapitalized="",
								self.RAKRenewalTermDeposit.renewalperiod="",
								self.RAKRenewalTermDeposit.debitaccountnumber="",
								self.RAKRenewalTermDeposit.onmaturity="",
								self.RAKRenewalTermDeposit.onamturityradiobtn="",
								self.RAKRenewalTermDeposit.interesthandling="",
								self.RAKRenewalTermDeposit.fromDate=new Date(),
								self.RAKRenewalTermDeposit.toDate=new Date(),
								self.RAKRenewalTermDeposit.fromDateformatted="",
								self.RAKRenewalTermDeposit.toDateformatted="",
								self.RAKRenewalTermDeposit.flag=false;
								self.RAKRenewalTermDeposit.selectedIAOprAccNo="";
								self.RAKRenewalTermDeposit.selecteddepreferencenum="";
								self.RAKRenewalTermDeposit.selectedepaccountnum="";
								self.RAKRenewalTermDeposit.selectedepstartDate="";
								self.RAKRenewalTermDeposit.selectedepmaturityendDate="";
								self.RAKRenewalTermDeposit.selectedepamount="";
								self.RAKRenewalTermDeposit.selectedmaturityamount="";
								self.RAKRenewalTermDeposit.minrenewalamount=0;
								self.RAKRenewalTermDeposit.daterequiredflag="";
								self.RAKRenewalTermDeposit.minrenewalamountflag=false;
								self.RAKRenewalTermDeposit.periodflag=false;
								self.RAKRenewalTermDeposit.dateflag=false;
								self.RAKRenewalTermDeposit.proceedtomyaccountflag=false;
								self.RAKRenewalTermDeposit.autoflag=false;
								self.RAKRenewalTermDeposit.creditinteresthandlingaccountflag=false;
								self.RAKRenewalTermDeposit.addinteresthandlingaccountflag=false;
								self.RAKRenewalTermDeposit.fromDate_day="";
								self.RAKRenewalTermDeposit.fromDate_month="";
								self.RAKRenewalTermDeposit.fromDate_year="";
								self.RAKRenewalTermDeposit.toDate_day="";
								self.RAKRenewalTermDeposit.toDate_month="";
								self.RAKRenewalTermDeposit.toDate_year="";
								self.common.message="";
								self.RAKRenewalTermDeposit.intRate="";
								self.RAKRenewalTermDeposit.intTillDate="";
								//CHANGES DONE AS FIX OF PROUAT-2640 START
								self.RAKRenewalTermDeposit.isIslamicClicked=false;
								//CHANGES DONE AS FIX OF PROUAT-2640 END
								self.RAKRenewalTermDeposit.selectedperiodDesc="";
								self.RAKRenewalTermDeposit.previewDate="";
								self.RAKRenewalTermDeposit.previewDateTwo="";
							};


						self.initRAKRenewalTermDeposit=function(responsesList){
							if(!responsesList[0].hasOwnProperty('errorMessage')){

							//CHANGES DONE AS FIX OF PROUAT-2578 AND PROUAT-2640 START

								if(self.RAKRenewalTermDeposit.interesttobecapitalized=='')
								{
								self.RAKRenewalTermDeposit.interesttobecapitalized='';
								}
								if(self.RAKRenewalTermDeposit.renewalperiod=='')
								{
									self.RAKRenewalTermDeposit.renewalperiod='';
								}
								if(self.RAKRenewalTermDeposit.onamturityradiobtn=='')
								{
									self.RAKRenewalTermDeposit.onamturityradiobtn='';
									if(self.RAKRenewalTermDeposit.isIslamicClicked)
										{
										self.RAKRenewalTermDeposit.interesthandling='';
										}
									else
										{
										self.RAKRenewalTermDeposit.interesthandling='';
										}
								}
							//CHANGES DONE AS FIX OF PROUAT-2578 AND PROUAT-2640 END

							if(responsesList[0].hasOwnProperty("depositAccountsList"))
							self.RAKRenewalTermDeposit.depaccountList=responsesList[0].depositAccountsList;
							
							if(responsesList[0].hasOwnProperty("accountAvailableBalance"))
								self.common.availBal=responsesList[0].accountAvailableBalance;
							

							//CHANGS TO SHOW DETAILS IN READ ONLY FORMAT AND MERGING LITERALS START
							 if(responsesList[0].hasOwnProperty("operativeAccountsList"))
							{
								/*self.RAKRenewalTermDeposit.selectedepaccountnum=rootScope.appLiterals.APP.RAK_SERVICES.RAKTERMDEPOSIT.DEPOSIT_REFERENCE_NUMBER+"  "+responsesList[0].accountNumber;
						        self.RAKRenewalTermDeposit.selectedepstartDate=rootScope.appLiterals.APP.RAK_SERVICES.RAKTERMDEPOSIT.DEPOSIT_START_DATE+"  "+responsesList[0].depositestartDate;
							    self.RAKRenewalTermDeposit.selectedepmaturityendDate=rootScope.appLiterals.APP.RAK_SERVICES.RAKTERMDEPOSIT.DEPOSIT_MATURITY_DATE+"  "+responsesList[0].maturityDate;
							    self.RAKRenewalTermDeposit.selectedepamount=rootScope.appLiterals.APP.RAK_SERVICES.RAKTERMDEPOSIT.DEPOSIT_AMOUNT+"  "+responsesList[0].depositeAmount;
							    self.RAKRenewalTermDeposit.selectedmaturityamount=rootScope.appLiterals.APP.RAK_SERVICES.RAKTERMDEPOSIT.MATURITY_AMOUNT+"  "+responsesList[0].maturityAmount;*/
								self.RAKRenewalTermDeposit.selectedepaccountnum=responsesList[0].accountNumber;
						        self.RAKRenewalTermDeposit.selectedepstartDate=responsesList[0].depositestartDate;
							    self.RAKRenewalTermDeposit.selectedepmaturityendDate=responsesList[0].maturityDate;
							    self.RAKRenewalTermDeposit.selectedepamount=responsesList[0].depositeAmount;
							    self.RAKRenewalTermDeposit.selectedmaturityamount=responsesList[0].maturityAmount;
							   self.RAKRenewalTermDeposit.debitopraccountList=responsesList[0].operativeAccountsList;
								self.RAKRenewalTermDeposit.currency=responsesList[0].Currency;
								self.RAKRenewalTermDeposit.period=responsesList[0].Period;
								self.RAKRenewalTermDeposit.intRate=responsesList[0].interestRate;
								self.RAKRenewalTermDeposit.intTillDate=responsesList[0].interestTillDate;
							}
							//CHANGS TO SHOW DETAILS IN READ ONLY FORMAT AND MERGING LITERALS END

							 if(responsesList[0].hasOwnProperty("operativeSelectedCurrencyAccountsList"))
								{
									self.RAKRenewalTermDeposit.maturityopraccountList=responsesList[0].operativeSelectedCurrencyAccountsList;
								    self.RAKRenewalTermDeposit.InterestHandlingopraccountList=responsesList[0].operativeSelectedCurrencyAccountsList;
								    self.RAKRenewalTermDeposit.minrenewalamount=responsesList[0].RENEWAL_MIN_AMOUNT;
								}
							}

						};

						self.RAKRenewalTermDepositflagClear=function()
					      {
							self.RAKRenewalTermDeposit.periodflag=false;
							self.RAKRenewalTermDeposit.dateflag=false;
							self.RAKRenewalTermDeposit.proceedtomyaccountflag=false;
							self.RAKRenewalTermDeposit.autoflag=false;
							self.RAKRenewalTermDeposit.creditinteresthandlingaccountflag=false;
							self.RAKRenewalTermDeposit.addinteresthandlingaccountflag=false;
							self.RAKRenewalTermDeposit.minrenewalamountflag=false;
					      };

						self.checkHiddenFieldValue=function()
						{
							if(self.RAKRenewalTermDeposit.renewalperiod.toString()=="FPV")self.RAKRenewalTermDeposit.periodflag=true;
							if(self.RAKRenewalTermDeposit.renewalperiod.toString()=="Date")self.RAKRenewalTermDeposit.dateflag=true;
							if(self.RAKRenewalTermDeposit.onamturityradiobtn.toString()=="PA")self.RAKRenewalTermDeposit.proceedtomyaccountflag=true;
							if(self.RAKRenewalTermDeposit.onamturityradiobtn.toString()=="Auto")self.RAKRenewalTermDeposit.autoflag=true;
							if(self.RAKRenewalTermDeposit.onamturityradiobtn.toString()=="Auto" && self.RAKRenewalTermDeposit.interesthandling.toString()=="IA")
								self.RAKRenewalTermDeposit.creditinteresthandlingaccountflag=true;
							if(self.RAKRenewalTermDeposit.onamturityradiobtn.toString()=="Auto" && self.RAKRenewalTermDeposit.interesthandling.toString()=="DepositAmt")
								self.RAKRenewalTermDeposit.addinteresthandlingaccountflag=true;

						};

					   self.setRAKRenewalTermDepositDate = function() {
						    self.common.displayDate = self.RAKRenewalTermDeposit.fromDate;
					  		self.populateCurrentDateDetails(self.RAKRenewalTermDeposit.fromDate);
					  	    self.RAKRenewalTermDeposit.fromDate_day =self.common.date;
					  		self.RAKRenewalTermDeposit.fromDate_month=self.common.month;
					  		self.RAKRenewalTermDeposit.fromDate_year=self.common.year;

					  	    self.common.displayDate = self.RAKRenewalTermDeposit.toDate;
					  		self.populateCurrentDateDetails(self.RAKRenewalTermDeposit.toDate);
						  	self.RAKRenewalTermDeposit.toDate_day =self.common.date;
					  		self.RAKRenewalTermDeposit.toDate_month=self.common.month;
					  		self.RAKRenewalTermDeposit.toDate_year=self.common.year;
					      };

					    //: Disc And Apply -- START
						self.setRakDepositOpenNewTermSuccessHomeBtnClicked = function(){
							if (self.RakDiscApply.discAndApplyFlowFlag == true){
								self.RakDiscApply.discAndApplyFlowFlag = false;
								scope.setEvent('onDiscAndapplyBackClicked');
							}
							else{
								scope.setEvent('onCancelClick');
							}
						};
						//: Disc And Apply -- END

	/*DEPOSIT ACCOUNTS SERVICE REQUEST RENEWAL TERM DEPOSIT ENDED	*/


	/* RAK : LOAN/FINANCE- LC or NLC REQUEST : Start */
	self.lcOrNlc = {
			//init screen
			loanFinAccList : [],
			loanFinAcc : "",
			creditCardList : [],
			creditCard : "",
			debitOprAccList : [],
			debitOprAcc : "",
			branchList : [],
			branchName : "",
			isRequestFor : "NLC",
			isSelectAccount : "ALL",
			isLanguage : "",
			isDispatchMode : "", 
			addressedTo : "",
			mobileNumber : "",
			notes : "",
			boolLoan : false,
			boolCredit : false,
			//CHANGES DONE AS FIX OF PROUAT-2485  START
		   isEmiSelected : false,
		   selectedBranchId:"",
		   selectedBranchIdSend:"",
		   OprAcctBranchList:[],
           emirateList:[],
		   emiBranchList:[],
		   emirateSeletected:"",
		   emiCategorizedBranchList:[],
			//CHANGES DONE AS FIX OF PROUAT-2485  END
		   acctountNumber:"",
		   accountType:"",
		   isCollectFromBranch:"",


		//reset function invoked at Landing page
		resetLcOrNlc : function(){
			self.lcOrNlc.loanFinAccList = [];
			self.lcOrNlc.loanFinAcc = "";
			self.lcOrNlc.creditCardList = [];
			self.lcOrNlc.creditCard = "";
			self.lcOrNlc.debitOprAccList = [];
			self.lcOrNlc.debitOprAcc = "";
			self.lcOrNlc.branchList = [];
			self.lcOrNlc.branchName = "";
			self.lcOrNlc.isRequestFor = "";
			self.lcOrNlc.isSelectAccount = "";
			self.lcOrNlc.isLanguage = "";
			self.lcOrNlc.isDispatchMode = rootScope.appLiterals.APP.RAK_SERVICES.RAK_LC_NLC.CUSTOM_DELIVER_ADDRESS;
			self.lcOrNlc.addressedTo = "";
			self.lcOrNlc.mobileNumber = "";
			self.lcOrNlc.registeredAddress = "";
			self.lcOrNlc.notes = "";
			self.lcOrNlc.boolLoan = true;
			self.lcOrNlc.boolCredit = true;
			self.lcOrNlc.mainAccType="";
			self.lcOrNlc.creditCardNumber="";
			self.lcOrNlc.confirmedBranch="";
			//CHANGES DONE AS FIX OF PROUAT-2485  START
			self.lcOrNlc.selectedBranchId="";
			self.lcOrNlc.selectedBranchIdSend="";
			self.lcOrNlc.OprAcctBranchList=[];
			self.lcOrNlc.emirateList=[];
			self.lcOrNlc.emiBranchList=[];
			self.lcOrNlc.emirateSeletected="";
			self.lcOrNlc.emiCategorizedBranchList=[];
			self.lcOrNlc.isEmiSelected=false;
			self.lcOrNlc.isCollectFromBranch=false;
			//CHANGES DONE AS FIX OF PROUAT-2485  END
			self.common.message="";
			self.lcOrNlc.acctountNumber = "";
			self.lcOrNlc.accountType="";

		},
		resetLcORNlcContinue:function()
		{
			self.lcOrNlc.auth="";
			self.lcOrNlc.transactionPassword="";
		},


		initLcOrNlc:function(responsesList){
			if(responsesList[0].hasOwnProperty('mobileNo')){
				self.lcOrNlc.mobileNumber =  responsesList[0].mobileNo;
			}
			if(responsesList[0].hasOwnProperty('loanFinAccList')){
				self.lcOrNlc.loanFinAccList = responsesList[0].loanFinAccList;
			}
			if(responsesList[0].hasOwnProperty('creditCardList')){
				self.lcOrNlc.creditCardList = responsesList[0].creditCardList;
			}
			if(responsesList[0].hasOwnProperty('debitOprAccList')){
				self.lcOrNlc.debitOprAccList = responsesList[0].debitOprAccList;
			}
			if(responsesList[0].hasOwnProperty('OprAccList')){
				self.lcOrNlc.OprAccList = responsesList[0].OprAccList;
			}
			if(responsesList[0].hasOwnProperty('branchList')){
				self.lcOrNlc.branchList = responsesList[0].branchList;
			}

			//CHANGES DONE AS FIX OF PROUAT-2485  START
			      if(responsesList[0].hasOwnProperty('emirateList'))
			      {
	                 self.lcOrNlc.emirateList = responsesList[0].emirateList;
	              }
                  if(responsesList[0].hasOwnProperty('emiBranchList'))
                  {
	                    self.lcOrNlc.emiBranchList = responsesList[0].emiBranchList;
	              }
	              if(responsesList[0].hasOwnProperty('OprAcctBranchList'))
	              {
						self.lcOrNlc.OprAcctBranchList = responsesList[0].OprAcctBranchList;
	              }
	              if(responsesList[0].hasOwnProperty('registeredAddress'))
	              {
						self.lcOrNlc.registeredAddress = responsesList[0].registeredAddress[0].address;
	              }
	              if(responsesList[0].hasOwnProperty('CORP_CUST_NAME'))
	              {
						self.lcOrNlc.compName = responsesList[0].CORP_CUST_NAME;
	              }
			//CHANGES DONE AS FIX OF PROUAT-2485  END

			self.lcOrNlc.isBack = false;

		}
	};

	//CHANGES DONE AS FIX OF PROUAT-2485 START
	self.lcOrNlc.raklcOrNlcBranchOptionChange = function(){
		var branchListCount = 0;
		var emBranchDesc = [];
		self.lcOrNlc.emiCategorizedBranchList = [];
		self.lcOrNlc.isEmiSelected = true;
		for (var x = 0; x < self.lcOrNlc.emiBranchList.length; x++) {
			if (self.lcOrNlc.emiBranchList[x].code == self.lcOrNlc.emirateSeletected) {
				emBranchDesc = self.lcOrNlc.emiBranchList[x].codeDesc
						.split("|");
				break;
			}
		}

		for (var x = 0; x < emBranchDesc.length; x++) {
			for (var y = 0; y < self.lcOrNlc.OprAcctBranchList.length; y++) {
				if (emBranchDesc[x] == self.lcOrNlc.OprAcctBranchList[y].branchId) {
					self.lcOrNlc.emiCategorizedBranchList[branchListCount] = self.lcOrNlc.OprAcctBranchList[y];
					branchListCount++;
				}
			}
        }


		for (var x = 0; x < self.lcOrNlc.emirateList.length; x++) {
			if (self.lcOrNlc.emirateList[x].code == self.lcOrNlc.emirateSeletected) {
				self.lcOrNlc.emiSelDesc = self.lcOrNlc.emirateList[x].codeDesc;
			}
          }
	};

	self.lcOrNlc.branchIdValidationRqdCheck = function(){
		if(self.lcOrNlc.selectedBranchId){
            self.lcOrNlc.selectedBranchIdSend = self.lcOrNlc.OprAcctBranchList[self.lcOrNlc.selectedBranchId].branchId;
			}
	};
	//CHANGES DONE AS FIX OF PROUAT-2485 END

	self.lcOrNlc.continueClick = function(){
		self.lcOrNlc.mobileNumberString = self.lcOrNlc.mobileNumber+'';

		for (var i =0 ; i < self.lcOrNlc.branchList.length ; i++)

		{  if (self.lcOrNlc.branchList[i].branchIndex==self.lcOrNlc.branchName)
		{	self.lcOrNlc.confirmedBranch = self.lcOrNlc.branchList[i].branchName;
		break;
		}
		}
	};

	self.confirmLcOrNlc = function(responsesList) {

		if (!responsesList[0].hasOwnProperty('errorMessage')) {

			self.lcOrNlc.previewResponse = responsesList[0];
			self.lcOrNlc.acctountNumber = responsesList[0].DEBIT_ACCOUNT1;
			self.lcOrNlc.accountType = responsesList[0].ACCOUNT_TYPE;
			self.lcOrNlc.auth = responsesList[0].auth;
			self.lcOrNlc.transactionPassword = "";
			self.common.message=responsesList[0].MESSAGE ? responsesList[0].MESSAGE :'';
		}
		self.lcOrNlc.transactionPassword = "";


		if(self.lcOrNlc.isRequestFor=='LC'){
			self.lcOrNlc.isRequested='Liabililty Certificate';
		}
		else{
			self.lcOrNlc.isRequested='No Liabililty Certificate';
		}


		if(self.lcOrNlc.isSelectAccount=='ALL'){
			self.lcOrNlc.isSelectedAcc = 'All Accounts';
		}
		else if(self.lcOrNlc.isSelectAccount=='LAA'){
			self.lcOrNlc.isSelectedAcc = 'Loan or Finance Accounts';
		}
		else{
			self.lcOrNlc.isSelectedAcc = 'Credit Card Accounts';
		}


		if(self.lcOrNlc.isLanguage=='E'){
			self.lcOrNlc.isLangSelected='English';
		}
		else{
			self.lcOrNlc.isLangSelected='Arabic';
		}
	};

	self.successLcOrNlc = function(responsesList) {
		self.lcOrNlc.lcOrNlcSuccessMessage = responsesList[0].lcOrNlcSuccessMessage;
	};

	self.setLcOrNlcMainAccType= function()
	{
		if (self.lcOrNlc.isSelectAccount=="LAA")
			{
			self.lcOrNlc.mainAccType="LON";
			self.lcOrNlc.creditCardNumber="";
			self.lcOrNlc.boolLoan = true;
			self.lcOrNlc.boolCredit = false;

			}
		else if(self.lcOrNlc.isSelectAccount=="CCD")
		{
				self.lcOrNlc.mainAccType="CCD";
				self.lcOrNlc.loanFinAcc="";
				self.lcOrNlc.boolLoan = false;
				self.lcOrNlc.boolCredit = true;


		}else if(self.lcOrNlc.isSelectAccount=="ALL")
		{
				self.lcOrNlc.creditCardNumber="";
			self.lcOrNlc.loanFinAcc="";
			self.lcOrNlc.boolLoan = false;
			self.lcOrNlc.boolCredit = false;


	}

	};
	/* RAK : LOAN/FINANCE- LC or NLC REQUEST : End */
//----------------------------------------------------------------------------------------------------------------
					    // - Added for Open Gold Account Request : START

    self.tnCMsgCheckBoxClicked = function(){
		/*if(self.RakInvOpenGoldAccModel.isTnCAccepted && self.RakInvOpenGoldAccModel.isTnCAccepted==='N' ){
			rootScope.showErrorPopup(rootScope.appLiterals.APP.RAKGLDACCOPEN.TERMSNCONDITION);
			self.RakInvOpenGoldAccModel.isTnCAccepted="N";
		}
		else {
			scope.setEvent('onRAKInvGoldAccOpenConfirmClick');
			self.RakInvOpenGoldAccModel.isTnCAccepted="Y";
			}*/
    	
    	scope.setEvent('onRAKInvGoldAccOpenConfirmClick');
		//self.RakInvOpenGoldAccModel.isTnCAccepted="Y";
  };
					      self.RakInvOpenGoldAccModel={
						    		OprAcctList:[],
						    		selectedOprAcct:"",
						    		selectedBranchId:"",
						    		isSingleOrJoint: "",
						    		modeOfOperation:"",
						    		singleOrJointToSend: "",
						    		isTnCAccepted:"N",
						    		isTnCCheckBoxTicked:"",
						    		serviceCallHostOrRM:"",
									successMessage:"",
									authFlag:"N",
									authMode:"",
									authStatus:false,
									txnPwd:"",
									availBal:'',
									updateBal:function(eventName)
								      {
                                            ActionProcessor.setEvent(eventName).then(function(payload) {
											console.log("Update Balance");
											console.log(JSON.stringify(payload));
											var response=payload;
											self.RakInvOpenGoldAccModel.availBal=response.responsesList[0].accountAvailableBalance;
											scope.$apply();
										},function(errorPayload){
											self.RakInvOpenGoldAccModel.availBal='';
										});
								      },
									getKeyUp : function() {
										if(self.RakInvOpenGoldAccModel.quantity && self.RakInvOpenGoldAccModel.quantity!=0){
										scope.setEvent('onExchangeCall');		
										// Added for RAK Dual hit call handling
										rootScope.callInProgress=true;
										}
										else{
											self.RakInvOpenGoldAccModel.buyRate='';
										}
									}

						  };

					      self.RakShowAlertForJointAcc = function(){
					    	  //alert("Account will be opened in offline mode");
					    	  rootScope.showErrorPopup("Account will be opened in offline mode");
					      };
					    self.isSelectedAccSingleOrJoint=function(){
					    	self.RakInvOpenGoldAccModel.modeOfOperation = self.RakInvOpenGoldAccModel.OprAcctList[self.RakInvOpenGoldAccModel.selectedOprAcct].modeOfOperation;
					    };
						self.singleOrJointRqdCheck=function(){
							/*if(self.RakInvOpenGoldAccModel.modeOfOperation != "SOLE")
							{
							if(self.RakInvOpenGoldAccModel.isSingleOrJoint=="Single"){
								self.RakInvOpenGoldAccModel.singleOrJointToSend = "Singly";
								self.RakInvOpenGoldAccModel.serviceCallHostOrRM = "onRAKInvRedeemGoldSubmitToHOSTClick";
							}
							else{
								self.RakInvOpenGoldAccModel.singleOrJointToSend = "Jointly";
								self.RakInvOpenGoldAccModel.serviceCallHostOrRM = "onRAKInvRedeemGoldSubmitToRMClick";
							}
							}
							else{
								self.RakInvOpenGoldAccModel.isSingleOrJoint = "Single";
								self.RakInvOpenGoldAccModel.singleOrJointToSend = "Singly";
								self.RakInvOpenGoldAccModel.serviceCallHostOrRM = "onRAKInvRedeemGoldSubmitToHOSTClick";
							}*/
							self.RakInvOpenGoldAccModel.isSingleOrJoint = "Single";
							self.RakInvOpenGoldAccModel.singleOrJointToSend = "Singly";
							self.RakInvOpenGoldAccModel.serviceCallHostOrRM = "onRAKInvRedeemGoldSubmitToHOSTClick";
						};
						self.fetchRAKInvOpenGoldAccData=function(responsesList){
					    	  if(!responsesList[0].hasOwnProperty('errorMessage')){
					    	  if(responsesList[0].hasOwnProperty('OprAcctList'))
				    		  {
								  self.RakInvOpenGoldAccModel.OprAcctList=responsesList[0].OprAcctList;
					    		  }
						    	  if(responsesList[0].hasOwnProperty('convertedAmt'))
					    		  {
									  self.RakInvOpenGoldAccModel.eqtAmt=responsesList[0].convertedAmt;
					    		  }
						    	  if(responsesList[0].hasOwnProperty('XAUGRAMEQT'))
					    		  {
									  self.RakInvOpenGoldAccModel.eqtXau=responsesList[0].XAUGRAMEQT;
					    		  }
						    	  if(responsesList[0].hasOwnProperty('EFFECTIVERATE'))
					    		  {
									  self.RakInvOpenGoldAccModel.buyRate=responsesList[0].EFFECTIVERATE;
				    		  }
					    	  }
					    	};
					    self.resetRAKInvOpenGoldAccDetails=function(){
					    	self.RakInvOpenGoldAccModel.OprAcctList=[];
					    	self.RakInvOpenGoldAccModel.selectedOprAcct="";
					    	self.RakInvOpenGoldAccModel.selectedBranchId="";
					    	self.RakInvOpenGoldAccModel.isSingleOrJoint="";
					    	self.RakInvOpenGoldAccModel.modeOfOperation="";
					    	self.RakInvOpenGoldAccModel.singleOrJointToSend="";
					    	self.RakInvOpenGoldAccModel.isTnCAccepted="N";
					    	self.RakInvOpenGoldAccModel.isTnCCheckBoxTicked="";
					    	self.RakInvOpenGoldAccModel.serviceCallHostOrRM="";
					    	self.RakInvOpenGoldAccModel.successMessage="";
					    	self.RakInvOpenGoldAccModel.authFlag="N";
					    	self.RakInvOpenGoldAccModel.authMode="";
					    	self.RakInvOpenGoldAccModel.authStatus=false;
					    	self.RakInvOpenGoldAccModel.txnPwd="";
					    	self.acceptTermscondition='N';
					    	self.RakInvOpenGoldAccModel.quantity="";
					    	self.RakInvOpenGoldAccModel.buyRate="";
					    	self.RakInvOpenGoldAccModel.eqtAmt="";
					    	self.RakInvOpenGoldAccModel.eqtXau="";
					    	self.RakInvOpenGoldAccModel.remarks="";
					    };

					    self.setRAKInvGoldAccOpenData=function(){
					    	self.singleOrJointRqdCheck();
					    	self.tnCMsgCheckBoxClicked();
					    };
					    self.confirmRakInvGoldAccOpen = function(responsesList){
				    		if(!responsesList[0].hasOwnProperty('errorMessage')){
								if(responsesList[0].hasOwnProperty('authFlag'))
								{
									self.RakInvOpenGoldAccModel.authFlag = responsesList[0].authFlag;

									if(self.RakInvOpenGoldAccModel.authFlag == "Y"){
										if(responsesList[0].auth == "")
											self.RakInvOpenGoldAccModel.authStatus=false;
										else
										{
											self.RakInvOpenGoldAccModel.authStatus=true;
											self.RakInvOpenGoldAccModel.authMode = responsesList[0].auth;
										}
									}
								}
							}
				    	};
				    	self.initRakInvGoldAccOpenSuccess = function(responsesList){
							if(!responsesList[0].hasOwnProperty('errorMessage'))
								self.RakInvOpenGoldAccModel.successMessage = responsesList[0].txnSuccessMsg;
								self.RakInvOpenGoldAccModel.openSuccessMessage = responsesList[0].openSuccessMsg;
						};
					    // - Added for Open Gold Account Request : END
//----------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------
					    // - Added for Debit Cards Cash Back Redemption Request : START
						self.RakDCCashBkRedemModel={
					    		DebitCardList:[],
					    		selectedDebitCard:"",
					    		cashBackAvailableAmt:"",
					    		showCashBackAvailable:false,
					    		userEnteredRedeemAmount:"",
					    		redeemAmtForValidation:"",
					    		showRedeemAmount:false,
					    		minRedeemAmt:"",
					    		maxRedeemAmt:"",
								successMessage:"",
								authFlag:"N",
								authMode:"",
								authStatus:false,
								txnPwd:"",
								redeemAmtDisplay:"",
						};
					    self.resetRAKDCCashBkRedemDetails=function(){
					    	self.RakDCCashBkRedemModel.DebitCardList=[];
					    	self.RakDCCashBkRedemModel.selectedDebitCard="";
					    	self.RakDCCashBkRedemModel.cashBackAvailableAmt="";
					    	self.RakDCCashBkRedemModel.showCashBackAvailable=false;
					    	self.RakDCCashBkRedemModel.userEnteredRedeemAmount="";
					    	self.RakDCCashBkRedemModel.redeemAmtForValidation="";
					    	self.RakDCCashBkRedemModel.showRedeemAmount=false;
					    	self.RakDCCashBkRedemModel.minRedeemAmt="";
					    	self.RakDCCashBkRedemModel.maxRedeemAmt="";
					    	self.RakDCCashBkRedemModel.successMessage="";
					    	self.RakDCCashBkRedemModel.authFlag="N";
					    	self.RakDCCashBkRedemModel.authMode="";
					    	self.RakDCCashBkRedemModel.authStatus=false;
					    	self.RakDCCashBkRedemModel.txnPwd="";
					    	self.common.message="";
					    	self.RakDCCashBkRedemModel.redeemAmtDisplay="";
					    };
						self.fetchRAKDCCashBkRedemData=function(responsesList){
				    	  if(!responsesList[0].hasOwnProperty('errorMessage')){
				    	  if(responsesList[0].hasOwnProperty('DebitCardList'))
			    		  {
							  self.RakDCCashBkRedemModel.DebitCardList=responsesList[0].DebitCardList;
			    		  }
				    	  if(responsesList[0].hasOwnProperty('MinRedeemAmt'))
			    		  {
							  self.RakDCCashBkRedemModel.minRedeemAmt=responsesList[0].MinRedeemAmt;
			    		  }
				    	  if(responsesList[0].hasOwnProperty('MaxRedeemAmt'))
			    		  {
							  self.RakDCCashBkRedemModel.maxRedeemAmt=responsesList[0].MaxRedeemAmt;
			    		  }
				    	  }
				    	};
				    	self.setRakDCBCashBackAvlAmt=function(){
				    		self.RakDCCashBkRedemModel.cashBackAvailableAmt = self.RakDCCashBkRedemModel.DebitCardList[self.RakDCCashBkRedemModel.selectedDebitCard].cashBackAvailable;
				    	};
				    	self.showRakDCBCashBackAndRedeemAmt=function(){
				    		if(self.RakDCCashBkRedemModel.cashBackAvailableAmt != ""){
				    			self.RakDCCashBkRedemModel.showCashBackAvailable=true;
				    			self.RakDCCashBkRedemModel.showRedeemAmount=true;
				    		}
				    		else {
				    			self.RakDCCashBkRedemModel.showCashBackAvailable=false;
				    			self.RakDCCashBkRedemModel.showRedeemAmount=false;
				    			rootScope.showErrorPopup("You don't have any Cash Back available for this card");
//				    			alert("You don't have any Cash Back available for this card");
				    		}
				    	};
					    self.confirmRakDCCashBkRedem = function(responsesList){
				    		if(!responsesList[0].hasOwnProperty('errorMessage')){
				    			self.common.message=responsesList[0].MESSAGE ? responsesList[0].MESSAGE :'';
								if(responsesList[0].hasOwnProperty('authFlag'))
								{
									self.RakDCCashBkRedemModel.authFlag = responsesList[0].authFlag;
									 self.RakDCCashBkRedemModel.redeemAmtDisplay=responsesList[0].redeemAmt;
									if(self.RakDCCashBkRedemModel.authFlag == "Y"){
										if(responsesList[0].auth == "")
											self.RakDCCashBkRedemModel.authStatus=false;
										else
										{
											self.RakDCCashBkRedemModel.authStatus=true;
											self.RakDCCashBkRedemModel.authMode = responsesList[0].auth;
										}
									}
								}
							}
				    	};
				    	self.initRakDCCashBkRedemSuccess = function(responsesList){
							if(!responsesList[0].hasOwnProperty('errorMessage'))
								self.RakDCCashBkRedemModel.successMessage = responsesList[0].successMsg;
						};
						self.validateRakDCCashBkRedemMinMaxRedeemAmt=function(){
							if(!(self.RakDCCashBkRedemModel.userEnteredRedeemAmount !="" &&
									(self.RakDCCashBkRedemModel.userEnteredRedeemAmount >= self.RakDCCashBkRedemModel.minRedeemAmt) &&
										(self.RakDCCashBkRedemModel.userEnteredRedeemAmount <= self.RakDCCashBkRedemModel.maxRedeemAmt))){
								self.RakDCCashBkRedemModel.userEnteredRedeemAmount = "";
								rootScope.showErrorPopup("Redeem Amount must be between "+self.RakDCCashBkRedemModel.minRedeemAmt+" and "+self.RakDCCashBkRedemModel.maxRedeemAmt);
								//alert("Redeem Amount must be between "+self.RakDCCashBkRedemModel.minRedeemAmt+" and "+self.RakDCCashBkRedemModel.maxRedeemAmt);
							}
						};
					    // - Added for Debit Cards Cash Back Redemption Request : END
//----------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------
						// - Added for General Requests e Statements : START
						self.RakGenRqEStmtModel={
							isReqNotPresent:false,
							isReqAlreadyPresent:false,
							isStmtCreditCardSelected:false,
							isStmtAccountsSelected:false,
							isAdviceRemitSelected:false,
							isAdviceDepositSelected:false,
							showCreditCard:false,
							showAccounts:false,
							showRemittance:false,
							showDeposit:false,
							deliveryModeSelected:"",
							isRestOfPageRqdToBeShown:false,
							isEitherAccOrCCSelected:false,
							primaryEmail:"",
							secondaryEmail:"",
							faxNo:0,
							faxNoFromCIF:"",
							faxNoFromEB:"",
							emailSelected:false,
							faxSelected:false,
							isSubscribed:"",
							MobileNumber:"",
							actionIdToSend:"",
							backPageToGoFromConfPage:"",
							successMessage:"",
							authFlag:"N",
							authMode:"",
							authStatus:false,
							txnPwd:"",
							isBack:false,
						};
						self.restOfPageRqdtoBeShown=function(){

							if(self.RakGenRqEStmtModel.isStmtCreditCardSelected || self.RakGenRqEStmtModel.isStmtAccountsSelected){
								self.RakGenRqEStmtModel.isEitherAccOrCCSelected = true;
							}
							else {
								self.RakGenRqEStmtModel.isEitherAccOrCCSelected = false;
							}


							if(self.RakGenRqEStmtModel.isStmtCreditCardSelected || self.RakGenRqEStmtModel.isStmtAccountsSelected || self.RakGenRqEStmtModel.isAdviceRemitSelected || self.RakGenRqEStmtModel.isAdviceDepositSelected){
								self.RakGenRqEStmtModel.isRestOfPageRqdToBeShown = true;
							}
							else {
								self.RakGenRqEStmtModel.isRestOfPageRqdToBeShown = false;
							}
						};
						self.fetchRakGenRqEStmtInitData=function(responsesList){
							if(!responsesList[0].hasOwnProperty('errorMessage') && !self.RakGenRqEStmtModel.isBack){
								if(responsesList[0].hasOwnProperty('isSubscribed')){
									self.RakGenRqEStmtModel.isSubscribed = responsesList[0].isSubscribed;
								}
							
								if(self.RakGenRqEStmtModel.isSubscribed == "N"){
									self.RakGenRqEStmtModel.deliveryModeSelected='Email';
									self.RakGenRqEStmtModel.isReqNotPresent = true;
									if(responsesList[0].hasOwnProperty('FaxNumberFromCIF')){
										self.RakGenRqEStmtModel.faxNoFromCIF = responsesList[0].FaxNumberFromCIF;
										if(self.RakGenRqEStmtModel.faxNoFromCIF != ""){
											self.RakGenRqEStmtModel.faxNo = parseInt(self.RakGenRqEStmtModel.faxNoFromCIF);
										}
										else {
											self.RakGenRqEStmtModel.faxNo = self.RakGenRqEStmtModel.faxNoFromCIF;
										}
									}
									if(responsesList[0].hasOwnProperty('PrimaryEmailFromCIF')){
										self.RakGenRqEStmtModel.primaryEmail = responsesList[0].PrimaryEmailFromCIF;
									}
									if(responsesList[0].hasOwnProperty('SecondaryEmailFromCIF')){
										self.RakGenRqEStmtModel.secondaryEmail = responsesList[0].SecondaryEmailFromCIF;
									}
									if(responsesList[0].hasOwnProperty('isActiveDeposit')){
										if((responsesList[0].isActiveDeposit) == "Y"){
											self.RakGenRqEStmtModel.isAdviceDepositSelected = true;
											self.RakGenRqEStmtModel.showDeposit = true;
										}
										else {
											self.RakGenRqEStmtModel.isAdviceDepositSelected = false;
											self.RakGenRqEStmtModel.showDeposit = false;
										}
									}
									if(responsesList[0].hasOwnProperty('isActiveOpr')){
										if((responsesList[0].isActiveOpr) == "Y"){
											self.RakGenRqEStmtModel.isStmtAccountsSelected = true;
											self.RakGenRqEStmtModel.isAdviceRemitSelected = true;
											self.RakGenRqEStmtModel.showAccounts = true;
											self.RakGenRqEStmtModel.showRemittance = true;
										}
										else {
											self.RakGenRqEStmtModel.isStmtAccountsSelected = false;
											self.RakGenRqEStmtModel.isAdviceRemitSelected = false;
											self.RakGenRqEStmtModel.showAccounts = false;
											self.RakGenRqEStmtModel.showRemittance = false;
										}
									}
									if(responsesList[0].hasOwnProperty('isActiveCC')){
										if((responsesList[0].isActiveCC) == "Y"){
											self.RakGenRqEStmtModel.isStmtCreditCardSelected = true;
											self.RakGenRqEStmtModel.showCreditCard = true;
										}
										else {
											self.RakGenRqEStmtModel.isStmtCreditCardSelected = false;
											self.RakGenRqEStmtModel.showCreditCard = false;
										}
									}
								}
								else {
									self.RakGenRqEStmtModel.isReqAlreadyPresent = true;
									if(responsesList[0].hasOwnProperty('FaxNumberFromEB')){
										self.RakGenRqEStmtModel.faxNoFromEB = responsesList[0].FaxNumberFromEB;
										if(self.RakGenRqEStmtModel.faxNoFromEB != ""){
											self.RakGenRqEStmtModel.faxNo = parseInt(self.RakGenRqEStmtModel.faxNoFromEB);
										}
										else {
											self.RakGenRqEStmtModel.faxNo = self.RakGenRqEStmtModel.faxNoFromEB;
										}
									}
									if(responsesList[0].hasOwnProperty('PrimaryEmailFromEB')){
										self.RakGenRqEStmtModel.primaryEmail = responsesList[0].PrimaryEmailFromEB;
									}
									if(responsesList[0].hasOwnProperty('SecondaryEmailFromCIF')){
										self.RakGenRqEStmtModel.secondaryEmail = responsesList[0].SecondaryEmailFromEB;
									}
									if(responsesList[0].hasOwnProperty('AccountFromEB')){
										if((responsesList[0].AccountFromEB) != "N"){
											self.RakGenRqEStmtModel.isStmtAccountsSelected = true;
										}
										else {
											self.RakGenRqEStmtModel.isStmtAccountsSelected = false;
										}
									}
									if(responsesList[0].hasOwnProperty('isActiveOpr')){
										if((responsesList[0].isActiveOpr) == "Y"){
											self.RakGenRqEStmtModel.showAccounts = true;
											self.RakGenRqEStmtModel.showRemittance = true;
										}
										else {
											self.RakGenRqEStmtModel.showAccounts = false;
											self.RakGenRqEStmtModel.showRemittance = false;
										}
									}
									if(responsesList[0].hasOwnProperty('CreditCardFromEB')){
										if((responsesList[0].CreditCardFromEB) != "N"){
											self.RakGenRqEStmtModel.isStmtCreditCardSelected = true;
										}
										else {
											self.RakGenRqEStmtModel.isStmtCreditCardSelected = false;
										}
									}
									if(responsesList[0].hasOwnProperty('isActiveCC')){
										if((responsesList[0].isActiveCC) == "Y"){
											self.RakGenRqEStmtModel.showCreditCard = true;
										}
										else {
											self.RakGenRqEStmtModel.showCreditCard = false;
										}
									}
									if(responsesList[0].hasOwnProperty('DepositFromEB')){
										if((responsesList[0].DepositFromEB) != "N"){
											self.RakGenRqEStmtModel.isAdviceDepositSelected = true;
										}
										else {
											self.RakGenRqEStmtModel.isAdviceDepositSelected = false;
										}
									}
									if(responsesList[0].hasOwnProperty('isActiveDeposit')){
										if((responsesList[0].isActiveDeposit) == "Y"){
											self.RakGenRqEStmtModel.showDeposit = true;
										}
										else {
											self.RakGenRqEStmtModel.showDeposit = false;
										}
									}
									if(responsesList[0].hasOwnProperty('RemittanceFromEB')){
										if((responsesList[0].RemittanceFromEB) != "N"){
											self.RakGenRqEStmtModel.isAdviceRemitSelected = true;
										}
										else {
											self.RakGenRqEStmtModel.isAdviceRemitSelected = false;
										}
									}
									if(responsesList[0].hasOwnProperty('DeliveryByFromEB')){
										if((responsesList[0].DeliveryByFromEB) == "E"){
											self.RakGenRqEStmtModel.deliveryModeSelected = "Email";
										}
										else if((responsesList[0].DeliveryByFromEB) == "F"){
											self.RakGenRqEStmtModel.deliveryModeSelected = "Fax";
										}
									}
									if(responsesList[0].hasOwnProperty('MobileNumberFromEB')){
										self.RakGenRqEStmtModel.MobileNumber = responsesList[0].MobileNumberFromEB;
									}
								}
							}
						};
						self.resetRakGenRqEStmtDetails=function(){
							self.RakGenRqEStmtModel.isReqNotPresent=false;
							self.RakGenRqEStmtModel.isReqAlreadyPresent=false;
							self.RakGenRqEStmtModel.isStmtCreditCardSelected=false;
							self.RakGenRqEStmtModel.isStmtAccountsSelected=false;
							self.RakGenRqEStmtModel.isAdviceRemitSelected=false;
							self.RakGenRqEStmtModel.isAdviceDepositSelected=false;
							self.RakGenRqEStmtModel.deliveryModeSelected="";
							self.RakGenRqEStmtModel.isRestOfPageRqdToBeShown=false;
							self.RakGenRqEStmtModel.isEitherAccOrCCSelected=false;
							self.RakGenRqEStmtModel.primaryEmail="";
							self.RakGenRqEStmtModel.secondaryEmail="";
							self.RakGenRqEStmtModel.faxNo=0;
							self.RakGenRqEStmtModel.faxNoFromCIF="";
							self.RakGenRqEStmtModel.faxNoFromEB="";
							self.RakGenRqEStmtModel.emailSelected=false;
							self.RakGenRqEStmtModel.faxSelected=false;
							self.RakGenRqEStmtModel.isSubscribed="";
							self.RakGenRqEStmtModel.MobileNumber="";
							self.RakGenRqEStmtModel.actionIdToSend="";
							self.RakGenRqEStmtModel.backPageToGoFromConfPage="";
							self.RakGenRqEStmtModel.successMessage="";
							self.RakGenRqEStmtModel.authFlag="N";
							self.RakGenRqEStmtModel.authMode="";
							self.RakGenRqEStmtModel.authStatus=false;
							self.RakGenRqEStmtModel.txnPwd="";
							self.RakGenRqEStmtModel.isBack=false;

						};
					    self.confirmRakGenRqEStmt = function(responsesList){
				    		if(!responsesList[0].hasOwnProperty('errorMessage')){
								if(responsesList[0].hasOwnProperty('authFlag'))
								{
									self.RakGenRqEStmtModel.authFlag = responsesList[0].authFlag;

									if(self.RakGenRqEStmtModel.authFlag == "Y"){
										if(responsesList[0].auth == "")
											self.RakGenRqEStmtModel.authStatus=false;
										else
										{
											self.RakGenRqEStmtModel.authStatus=true;
											self.RakGenRqEStmtModel.authMode = responsesList[0].auth;
										}
									}
								}
							}
				    	};
				    	self.initRakGenRqEStmtSuccess = function(responsesList){
							if(!responsesList[0].hasOwnProperty('errorMessage'))
								self.RakGenRqEStmtModel.successMessage = responsesList[0].successMsg;
						};
						self.emailOrFaxRqdCheck=function(){
							if(self.RakGenRqEStmtModel.deliveryModeSelected=="Email"){
								self.RakGenRqEStmtModel.emailSelected = true;
								self.RakGenRqEStmtModel.faxSelected = false;
							}
							else {
								self.RakGenRqEStmtModel.emailSelected = false;
								self.RakGenRqEStmtModel.faxSelected = true;
							}
							if(self.RakGenRqEStmtModel.isStmtCreditCardSelected==false && self.RakGenRqEStmtModel.isStmtAccountsSelected==false){
								rootScope.showErrorPopup('Select mandatory fields to Proceed');
								
							}
							else{
								scope.setEvent('onRAKGenRqEStmtSubscribeConfirmClick');
							}
						};
						self.detectBackPageFromConf=function(){
							if(self.RakGenRqEStmtModel.actionIdToSend == "MODIFY") {
								self.RakGenRqEStmtModel.backPageToGoFromConfPage = "onRAKGenRqEStmtConfirmBackClickModify";
							}
							else {
								self.RakGenRqEStmtModel.backPageToGoFromConfPage = "onRAKGenRqEStmtConfirmBackClick";
							}
						};
						// - Added for General Requests e Statements : END
//----------------------------------------------------------------------------------------------------------------

// RAK:  - Added for Apply For Add-on Card

						self.RAKApplyAddOnCard = {
							activePrimaryCCList:[],
							selectedCardNo:"",
							salutationList:[],
							cardHolderName:"",
							embossingName:"",
							passportNumber:"",
							expiryDate:"",
							nationalityList:[],
							visaNumber:"",
							visaExpiryDate:"",
							residenceType:"",
							dateOfBirth:"",
							motherMaidenName:"",
							occupation:"",
							mobileNumber:"",
							emailId:"",
							emiratedId:"",
							emiratesIdExpiryDate:"",
							limitOnCard:"",
							relationshipList:[],
							deliveryMode:"",
							primaryCardHolderDec:"",
							acceptance:"",
							genderList:[]
						};

						self.resetApplyAddOnCard = function(){

						};
						self.initApplyAddOnCard=function(responsesList){
							if(!responsesList[0].hasOwnProperty('errorMessage')){
								if(responsesList[0].hasOwnProperty('cardNoList'))
									self.RAKApplyAddOnCard.activePrimaryCCList = responsesList[0].cardNoList;
								if(responsesList[0].hasOwnProperty('salutationList'))
									self.RAKApplyAddOnCard.salutationList = responsesList[0].salutationList;
								if(responsesList[0].hasOwnProperty('nationalityList'))
									self.RAKApplyAddOnCard.nationalityList = responsesList[0].nationalityList;
								if(responsesList[0].hasOwnProperty('genderList'))
									self.RAKApplyAddOnCard.genderList = responsesList[0].genderList;
								if(responsesList[0].hasOwnProperty('relationshipList'))
									self.RAKApplyAddOnCard.relationshipList = responsesList[0].relationshipList;

							}
						};

//RAK  - end


					//CHANGES FOR REPROT CAPTURE CREDIT CARD SERVICE REQUEST START
				      self.RAKChangeReportCapture={
								cardNoList:[],
								captureList:[],
								branchList:[],
								//added by 
								emirateList : [],
								emiBranchList : [],
								emirateSeletected : "",
								emiCategorizedBranchList : [],
								isEmiSelected : false,
								message : ""
								};

							self.RAKChangeReportCaptureModel={
								selectedCCNo:"",
								selectedBranch:"",
								branchName:"",
								captureFlag:false,
								delieveryMode:"",
								selectedCapture:"",
								bankName:"",
								atmBranchName:"",
							    isBranchOptionSelected:true,
								cardNo:"",
								auth:"",
								authMode:"",
								authStatus:true,
								txnPwd:"",
								otp:"",
								registeredAddress:"",
								delChannel:"",
								successMessage:"",
								boolBranch:false
							};

							self.resetRAKChangeReportCapture=function(){
								self.RAKChangeReportCapture.cardNoList="";
								self.RAKChangeReportCapture.captureList="";
								self.RAKChangeReportCapture.branchList="";
								self.RAKChangeReportCaptureModel.bankName="";
								self.RAKChangeReportCaptureModel.atmBranchName="";
								self.RAKChangeReportCaptureModel.delieveryMode="";
								self.RAKChangeReportCaptureModel.selectedCapture="";
								self.RAKChangeReportCaptureModel.selectedCCNo="";
								self.RAKChangeReportCaptureModel.selectedBranch="";
								self.RAKChangeReportCaptureModel.branchName="";
							    self.RAKChangeReportCaptureModel.isBranchOptionSelected=true;
							    self.RAKChangeReportCaptureModel.captureFlag=false;
								self.RAKChangeReportCaptureModel.auth="";
								self.RAKChangeReportCaptureModel.authMode="";
								self.RAKChangeReportCaptureModel.authStatus=true;
								self.RAKChangeReportCaptureModel.txnPwd="";
								self.RAKChangeReportCaptureModel.otp="";
								self.RAKChangeReportCaptureModel.boolBranch=false;
								self.RAKChangeReportCapture.registeredAddress="";
								
								self.RAKChangeReportCapture.emirateList = "";
								self.RAKChangeReportCapture.emiBranchList = "";
								self.RAKChangeReportCapture.emirateSeletected = "";
								self.RAKChangeReportCapture.emiCategorizedBranchList = "";
								self.RAKChangeReportCapture.isEmiSelected = false;
								self.common.message="";
							};
//Added by  For Emirates based Branch Dropdown Change - start
	    self.rakChangeReportCaptureChange = function() {

		var branchListCount = 0;
		var emBranchDesc = [];
		self.RAKChangeReportCapture.emiCategorizedBranchList = [];
		self.RAKChangeReportCapture.isEmiSelected = true;
		for (var x = 0; x < self.RAKChangeReportCapture.emiBranchList.length; x++) {
			if (self.RAKChangeReportCapture.emiBranchList[x].code == self.RAKChangeReportCapture.emirateSeletected) {
				emBranchDesc = self.RAKChangeReportCapture.emiBranchList[x].codeDesc
						.split("|");
				break;
			}
		}

		for (var x = 0; x < emBranchDesc.length; x++) {
			for (var y = 0; y < self.RAKChangeReportCapture.branchList.length; y++) {
				if (emBranchDesc[x] == self.RAKChangeReportCapture.branchList[y].branchCode) {
					self.RAKChangeReportCapture.emiCategorizedBranchList[branchListCount] = self.RAKChangeReportCapture.branchList[y];
					branchListCount++;
				}
			}
		}

	};
	//Added by  For Emirates based Branch Dropdown Change - end
							self.initRAKChangeReportCapture=function(responsesList){
								if(!responsesList[0].hasOwnProperty('errorMessage')){
									if(responsesList[0].hasOwnProperty('cardNoList'))
										{
										self.RAKChangeReportCapture.cardNoList = responsesList[0].cardNoList;
								        self.RAKChangeReportCapture.branchList = responsesList[0].branchListArray;
								        self.RAKChangeReportCapture.captureList = responsesList[0].captureList;
										}
										//added by 
									if (responsesList[0].hasOwnProperty('emirateList')) {
										self.RAKChangeReportCapture.emirateList = responsesList[0].emirateList;
									}

									if (responsesList[0].hasOwnProperty('emiBranchList')) {
										self.RAKChangeReportCapture.emiBranchList = responsesList[0].emiBranchList;
									}
									 if(responsesList[0].hasOwnProperty('registeredAddress') && !(responsesList[0].registeredAddress == '' )){
					                	 self.RAKChangeReportCapture.registeredAddress = responsesList[0].registeredAddress[0].address;
					                }
								
							    }
							};

							self.checkingCaptureDetails=function(){
								if(self.RAKChangeReportCaptureModel.selectedCapture==rootScope.appLiterals.APP.RAK_SERVICES.RAKREPORTCAPTURECARD.NON_RAK_BANK_ATM)
										{
									          self.RAKChangeReportCaptureModel.captureFlag=true;
									    }
								else
									{
									self.RAKChangeReportCaptureModel.captureFlag=false;
									self.RAKChangeReportCaptureModel.bankName="";
									}

							};

							self.captureContinue=function(){
								if( self.RAKChangeReportCaptureModel.delieveryMode=='Branch')
									self.RAKChangeReportCaptureModel.boolBranch=true;
								else
								{
									self.RAKChangeReportCaptureModel.boolBranch=false;
									self.RAKChangeReportCaptureModel.selectedBranch="";
								}
								//added by 
								for (var x=0; x<self.RAKChangeReportCapture.emirateList.length;x++)
								{
								if (self.RAKChangeReportCapture.emirateList[x].code==self.RAKChangeReportCapture.emirateSeletected)
								{
									self.RAKChangeReportCapture.emiSelDesc =self.RAKChangeReportCapture.emirateList[x].codeDesc;
								}
								}

							};
						//CHANGES FOR REPROT CAPTURE CREDIT CARD SERVICE REQUEST END


						//CHANGES FOR CHANGE BILLING DATE CREDIT CARD SERVICE REQUEST START
							self.RAKChangeBillDateData={
									creditCardList:[],
									periodList:[],
									creditCardNumber:'',
									creditCardNum:'',
									selectedPeriod:'',
									authStatus:true,
									isAuth:false,
									isOnline:"false",
									transactionPassword:"",
									dueDate:"",
									dueDateFlag:false,
									flag:false,
									authMode:"",

									//CHANGES FOR EXPIRY DATE START
									clearBlockedCreditCard:function(){
										self.RAKChangeBillDateData.creditCardList = [];
										self.RAKChangeBillDateData.periodList = [];
									    self.RAKChangeBillDateData.creditCardNumber = '';
									    self.RAKChangeBillDateData.selectedPeriod = '';
										self.RAKChangeBillDateData.creditCardNum='';
									    self.RAKChangeBillDateData.dueDate='';
										self.RAKChangeBillDateData.isAuth = false;
										self.RAKChangeBillDateData.isOnline = "false";
										self.RAKChangeBillDateData.transactionPassword='';
										self.RAKChangeBillDateData.authStatus=true;
										self.RAKChangeBillDateData.dueDateFlag=false;
										self.RAKChangeBillDateData.authMode='';
										self.common.message="";
									},




									initRAKChangeBillDateData:function(responseList){
										if(!responseList[0].hasOwnProperty('errorMessage')){
										if(responseList[0].hasOwnProperty('creditCardList')){
											self.RAKChangeBillDateData.creditCardList = responseList[0].creditCardList;
										}
										if(responseList[0].hasOwnProperty('dueDate'))
										{
											self.RAKChangeBillDateData.periodList = responseList[0].Period;
											self.RAKChangeBillDateData.dueDate=responseList[0].dueDate;
										}

								     }

									},
									};




							//CHANGES FOR CHANGE BILLING DATE CREDIT CARD SERVICE REQUEST START

//----------------------------------------------------------------------------------------------------------//
						/* RAK : INVESTMENT SUBSCRIPTIONS : Start */

						self.investmentSubscription = {
								//initial screen

								productList : [],
								productDesc : "",

								testArray : new Array(),

								mobilePrefixList : [],
								mobilePrefix:"",
								mobileNumber: "",
								mobileprefixDesc:"",
								mobileprefixCode:"",



								auth : "",
								transactionPassword : "",
								prepaidCardSuccessMessage : "",
								mobileNumberString:"",

								mobilePrefixCodeSent:"",


								resetInvestmentSubscription : function(){
									//initial screen
									self.investmentSubscription.productList = [];
									self.investmentSubscription.productDesc = "";

									self.investmentSubscription.testArray = new Array();

									self.investmentSubscription.mobilePrefixList = [];
									self.investmentSubscription.mobilePrefix = "";
									self.investmentSubscription.mobileNumber = "";
									self.investmentSubscription.mobileprefixDesc = "";
									self.investmentSubscription.mobileprefixCode = "";




									self.investmentSubscription.auth="";
									self.investmentSubscription.transactionPassword="";
									self.investmentSubscription.prepaidCardSuccessMessage="";
									self.investmentSubscription.mobileNumberString="";

									self.investmentSubscription.mobilePrefixCodeSent="";
									self.common.message="";
								},





						initInvestmentSubscription:function(responsesList){

							//self.investmentSubscription.productArray = new Array();


								if (responsesList[0].hasOwnProperty('productList')) {
									self.investmentSubscription.productList = responsesList[0].productList;

									for (var k = 0 ; k<(self.investmentSubscription.productList).length; k++){
										(self.investmentSubscription.testArray).push({productName:self.investmentSubscription.productList[k].productDesc,
											productCode:self.investmentSubscription.productList[k].productCode,
											flag:false

										});
										}


								}


								if(responsesList[0].hasOwnProperty('mobilePrefixList')){
								self.investmentSubscription.mobilePrefixList = responsesList[0].mobilePrefixList;

								}

								self.investmentSubscription.isBack = false;
							}
						};

						self.setMobilePrifixCode = function(){
							for (var k=0; k < (self.investmentSubscription.mobilePrefixList).length ; k++){
								if ((self.investmentSubscription.mobilePrefixList[k]).mobileprefixDesc ==
																			self.investmentSubscription.mobilePrefix)
								{
									self.investmentSubscription.mobilePrefixCodeSent = (self.investmentSubscription.mobilePrefixList[k]).mobileprefixCode;
								}
							}
						};

						self.investmentSubscriptionConfirm = function(responsesList) {
							if (!responsesList[0].hasOwnProperty('errorMessage')) {

								self.common.message=responsesList[0].MESSAGE ? responsesList[0].MESSAGE :'';

								self.investmentSubscription.previewResponse = responsesList[0];
								self.investmentSubscription.auth = responsesList[0].auth;

								self.investmentSubscription.transactionPassword = "";
							}
							self.investmentSubscription.transactionPassword = "";



							self.investmentSubscription.fullMobNum=self.investmentSubscription.mobilePrefix+'-'+
																		self.investmentSubscription.mobileNumber;




							for (var k=0; k < (self.investmentSubscription.mobilePrefixList).length ; k++){
								if ((self.investmentSubscription.mobilePrefixList[k]).mobileprefixDesc ==
																			self.investmentSubscription.mobilePrefix)
								{
									self.investmentSubscription.mobilePrefixCodeSent = (self.investmentSubscription.mobilePrefixList[k]).mobileprefixCode;
								}
							}



						};


						self.investmentSubscriptionSuccess = function(responsesList) {
							self.investmentSubscription.investmentSubscriptionSuccessMessage = responsesList[0].investmentSubscriptionSuccessMessage;
						};

						self.CheckBoxClicked = function(){

							self.investmentSubscription.productsSend = "";
							self.investmentSubscription.testFlag = "";
							self.investmentSubscription.testArrayShow = new Array();
							for(var j=0; j<self.investmentSubscription.testArray.length; j++){
								if (self.investmentSubscription.testArray[j].flag == true){
									self.investmentSubscription.testFlag = 'Y';

								}
							}


						if(self.investmentSubscription.testFlag == 'Y')
								{
							serialNo = 0;
							for(var j=0; j<self.investmentSubscription.testArray.length; j++)
								{

									if(self.investmentSubscription.testArray[j].flag == true){

										serialNo = serialNo + 1;

										self.investmentSubscription.testArrayShow.push
										({prdtName:self.investmentSubscription.testArray[j].productName,
											prdtCode:self.investmentSubscription.testArray[j].productCode,
												sno:serialNo});
										}
									}


							if(self.investmentSubscription.testArrayShow.length == 1){
								self.investmentSubscription.productsSend = self.investmentSubscription.testArrayShow[0].prdtCode;

								}
							else
								{
								self.investmentSubscription.productsSend = self.investmentSubscription.testArrayShow[0].prdtCode;

							for(var s=1; s<self.investmentSubscription.testArrayShow.length; s++)
							{
								self.investmentSubscription.productsSend = self.investmentSubscription.productsSend + "|" + self.investmentSubscription.testArrayShow[s].prdtCode;

								}

								}
							self.investmentSubscription.mobileNumberString = self.investmentSubscription.mobileNumber+'';

											scope.setEvent('onSelectForProducts');
								}


						else
							rootScope.showErrorPopup('Select Atleast One to Proceed');

						};

						/* RAK : INVESTMENT SUBSCRIPTIONS : End */
//----------------------------------------------------------------------------------------------------------//
						// - Added for Credit Card Setup Standing Instruction Request : START
						self.RakCCStandingInstModel={
								CreditCardList:[],
					    		selectedCreditCard:"",
					    		OprAccList:[],
					    		selectedOprAcc:"",
					    		isCurrStmtBalOrMinAmtOrFlatAmt:"",
					    		perOfCurrentStatementBal:"",
					    		flatAmount:"",
					    		selectedMonthlyPmtPercentage:"",
					    		isDOMorPmtDueDt:"",
					    		isDOMorPmtDueDtSend:"",
					    		dateOfMnthList:[],
					    		selectedDateOfMonth:"",
					    		isNotAlreadyStandingInst:false,
					    		isAlreadyStandingInst:false,
					    		SIStatus:"",
					    		isPerOfCurrentStatementBalSelected:false,
					    		isFlatAmountSelected:false,
					    		isDOMSelected:false,
								successMessage:"",
								authFlag:"N",
								authMode:"",
								authStatus:false,
								txnPwd:"",
								//CHANGES DONE AS FIX OF 1995 START
								isDetailsFetchedForAmendSI:false
								//CHANGES DONE AS FIX OF 1995 END
						};
						self.resetRakCCStandingInstData=function(){
							self.RakCCStandingInstModel.CreditCardList=[];
							self.RakCCStandingInstModel.selectedCreditCard="";
							self.RakCCStandingInstModel.OprAccList=[];
							self.RakCCStandingInstModel.selectedOprAcc="";
							self.RakCCStandingInstModel.isCurrStmtBalOrMinAmtOrFlatAmt="";
							self.RakCCStandingInstModel.perOfCurrentStatementBal="";
							self.RakCCStandingInstModel.flatAmount="";
							self.RakCCStandingInstModel.selectedMonthlyPmtPercentage="";
							self.RakCCStandingInstModel.isDOMorPmtDueDt="";
							self.RakCCStandingInstModel.isDOMorPmtDueDtSend="";
							self.RakCCStandingInstModel.dateOfMnthList=[];
							self.RakCCStandingInstModel.selectedDateOfMonth="";
							self.RakCCStandingInstModel.isNotAlreadyStandingInst=false;
							self.RakCCStandingInstModel.isAlreadyStandingInst=false;
							self.RakCCStandingInstModel.SIStatus="";
							self.RakCCStandingInstModel.isPerOfCurrentStatementBalSelected=false;
							self.RakCCStandingInstModel.isFlatAmountSelected=false;
							self.RakCCStandingInstModel.isDOMSelected=false;
							self.RakCCStandingInstModel.successMessage="";
							self.RakCCStandingInstModel.authFlag="N";
							self.RakCCStandingInstModel.authMode="";
							self.RakCCStandingInstModel.authStatus=false;
							self.RakCCStandingInstModel.txnPwd="";
							//CHANGES DONE AS FIX OF 1995 START
							self.RakCCStandingInstModel.isDetailsFetchedForAmendSI=false;
							//CHANGES DONE AS FIX OF 1995 END
						};
						self.detectDOMorPmtDueDtSend=function(){
							if(self.RakCCStandingInstModel.isDOMorPmtDueDt == rootScope.appLiterals.APP.RAKCCSTANDINGINST.DOM) {
								self.RakCCStandingInstModel.isDOMorPmtDueDtSend = "N";
							}
							else if(self.RakCCStandingInstModel.isDOMorPmtDueDt == rootScope.appLiterals.APP.RAKCCSTANDINGINST.PMT_DUE_DATE) {
								self.RakCCStandingInstModel.isDOMorPmtDueDtSend = "Y";
							}
						};
						self.detectMonthlyPmtPer=function(){
							if(self.RakCCStandingInstModel.isCurrStmtBalOrMinAmtOrFlatAmt == rootScope.appLiterals.APP.RAKCCSTANDINGINST.CURR_STMT_BAL) {
								self.RakCCStandingInstModel.selectedMonthlyPmtPercentage = "P";
								self.RakCCStandingInstModel.flatAmount="";
							}
							else if(self.RakCCStandingInstModel.isCurrStmtBalOrMinAmtOrFlatAmt == rootScope.appLiterals.APP.RAKCCSTANDINGINST.MIN_AMT_DUE) {
								self.RakCCStandingInstModel.selectedMonthlyPmtPercentage = "M";
								self.RakCCStandingInstModel.flatAmount="";
							}
							else if(self.RakCCStandingInstModel.isCurrStmtBalOrMinAmtOrFlatAmt == rootScope.appLiterals.APP.RAKCCSTANDINGINST.FLAT_AMT) {
								self.RakCCStandingInstModel.selectedMonthlyPmtPercentage = "F";
							}
						};
						self.sortDOM=function(a,b){
							return parseInt(b.dateOfMnthCode) < parseInt(a.dateOfMnthCode) ? 1 : -1;
						};
						self.fetchRAKCCStandingInstInitData=function(responsesList){
				    	  if(!responsesList[0].hasOwnProperty('errorMessage') && !self.common.fromAuthPage){
				    		  self.RakCCStandingInstModel.isCurrStmtBalOrMinAmtOrFlatAmt=rootScope.appLiterals.APP.RAKCCSTANDINGINST.FLAT_AMT;
				    		  self.RakCCStandingInstModel.isDOMorPmtDueDt=rootScope.appLiterals.APP.RAKCCSTANDINGINST.PMT_DUE_DATE;
				    	  if(responsesList[0].hasOwnProperty('CreditCardList'))
			    		  {
							  self.RakCCStandingInstModel.CreditCardList=responsesList[0].CreditCardList;
			    		  }
				    	  if(responsesList[0].hasOwnProperty('OprAccList'))
			    		  {
							  self.RakCCStandingInstModel.OprAccList=responsesList[0].OprAccList;
			    		  }
				    	  if(responsesList[0].hasOwnProperty('dateOfMnthList'))
			    		  {
							  self.RakCCStandingInstModel.dateOfMnthList =  jQuery(responsesList[0].dateOfMnthList).sort(self.sortDOM).toArray();
			    		  }
				    	  if(responsesList[0].hasOwnProperty('SIStatus'))
			    		  {
							  self.RakCCStandingInstModel.SIStatus=responsesList[0].SIStatus;

							  if(self.RakCCStandingInstModel.SIStatus == "A") {
								  self.RakCCStandingInstModel.isAlreadyStandingInst=true;
								  self.RakCCStandingInstModel.isNotAlreadyStandingInst=false;
							  }
							  else {
								  self.RakCCStandingInstModel.isAlreadyStandingInst=false;
								  self.RakCCStandingInstModel.isNotAlreadyStandingInst=true;
							  }
			    		  }
				    	  }
				    	};
				    	self.confirmRAKCCStandingInst = function(responsesList){
				    		if(!responsesList[0].hasOwnProperty('errorMessage')){
								if(responsesList[0].hasOwnProperty('authFlag'))
								{
									self.RakCCStandingInstModel.authFlag = responsesList[0].authFlag;

									if(self.RakCCStandingInstModel.authFlag == "Y"){
										if(responsesList[0].auth == "")
											self.RakCCStandingInstModel.authStatus=false;
										else
										{
											self.RakCCStandingInstModel.authStatus=true;
											self.RakCCStandingInstModel.authMode = responsesList[0].auth;
										}
									}
								}
								if(responsesList[0].hasOwnProperty('flatAmount')){
									if(responsesList[0].flatAmount != "")
										self.RakCCStandingInstModel.flatAmountDisp = responsesList[0].flatAmount;
								}
								self.common.message=responsesList[0].MESSAGE ? responsesList[0].MESSAGE :'';

							}
				    	};
				    	self.initRAKCCStandingInstSuccess = function(responsesList){
							if(!responsesList[0].hasOwnProperty('errorMessage'))
								self.RakCCStandingInstModel.successMessage = responsesList[0].successMsg;
						};
						self.detectSelectedOptionsForValidation=function(){
							if(self.RakCCStandingInstModel.isCurrStmtBalOrMinAmtOrFlatAmt == rootScope.appLiterals.APP.RAKCCSTANDINGINST.CURR_STMT_BAL) {
								self.RakCCStandingInstModel.isPerOfCurrentStatementBalSelected = true;
							}
							else {
								self.RakCCStandingInstModel.isPerOfCurrentStatementBalSelected = false;
							}

							if(self.RakCCStandingInstModel.isCurrStmtBalOrMinAmtOrFlatAmt == rootScope.appLiterals.APP.RAKCCSTANDINGINST.FLAT_AMT) {
								self.RakCCStandingInstModel.isFlatAmountSelected = true;
							}
							else {
								self.RakCCStandingInstModel.isFlatAmountSelected = false;
							}

							if(self.RakCCStandingInstModel.isDOMorPmtDueDt == rootScope.appLiterals.APP.RAKCCSTANDINGINST.DOM) {
								self.RakCCStandingInstModel.isDOMSelected = true;
							}
							else {
								self.RakCCStandingInstModel.isDOMSelected = false;
							}
						};
						// - Added for Credit Card Setup Standing Instruction Request : END
//----------------------------------------------------------------------------------------------------------------
						// - Added for Apply for Credit Card : START
						self.RakApplyCCModel={
								MobileNo:0,
								MobNoFromCif:"",
								EmailId:"",
								CustomerName:"",
								Remarks:"",
								ApplyType:"",
								ApplyTypeDesc:"",
								ServiceId:"",
								RequestId:"",
								successMessage:"",
								authFlag:"N",
								authMode:"",
								authStatus:false,
								txnPwd:""
						};
						self.resetRakApplyCCData=function(){
							self.RakApplyCCModel.MobileNo=0;
							self.RakApplyCCModel.MobNoFromCif="";
							self.RakApplyCCModel.EmailId="";
							self.RakApplyCCModel.CustomerName="";
							self.RakApplyCCModel.Remarks="";
							self.RakApplyCCModel.ApplyType="";
							self.RakApplyCCModel.ApplyTypeDesc="";
							self.RakApplyCCModel.ServiceId="";
							self.RakApplyCCModel.RequestId="";
							self.RakApplyCCModel.successMessage="";
							self.RakApplyCCModel.authFlag="N";
							self.RakApplyCCModel.authMode="";
							self.RakApplyCCModel.authStatus=false;
							self.RakApplyCCModel.txnPwd="";
						};
						self.setApplyTypeDesc=function(){
							if(self.RakApplyCCModel.ApplyType == "APPLYCC") {
								self.RakApplyCCModel.ApplyTypeDesc=rootScope.appLiterals.APP.RAK_SERVICES.RAK_SERV_LANDPG.APPLY_CC;
							}
							if(self.RakApplyCCModel.ApplyType == "APPLYADDON") {
								self.RakApplyCCModel.ApplyTypeDesc=rootScope.appLiterals.APP.RAK_SERVICES.RAK_SERV_LANDPG.APPLY_ADDON;
							}
							if(self.RakApplyCCModel.ApplyType == "APPLYINSU") {
								self.RakApplyCCModel.ApplyTypeDesc=rootScope.appLiterals.APP.RAK_SERVICES.RAK_SERV_LANDPG.APPLY_INSURANCE;
							}
						};
						self.detectServiceIdAndReqId=function(){
							if(self.RakApplyCCModel.ApplyType == "APPLYCC") {
								self.RakApplyCCModel.ServiceId="MACCCS";
								self.RakApplyCCModel.RequestId="ACC";
							}
							if(self.RakApplyCCModel.ApplyType == "APPLYADDON") {
								self.RakApplyCCModel.ServiceId="MAACCS";
								self.RakApplyCCModel.RequestId="ADS";
							}
							if(self.RakApplyCCModel.ApplyType == "APPLYINSU") {
								self.RakApplyCCModel.ServiceId="MAICCS";
								self.RakApplyCCModel.RequestId="AIS";
							}
						};
						self.fetchRakApplyCCData=function(responsesList){
				    	  if(!responsesList[0].hasOwnProperty('errorMessage')){
				    	  if(responsesList[0].hasOwnProperty('MobNoFromCif'))
			    		  {
							  self.RakApplyCCModel.MobNoFromCif=responsesList[0].MobNoFromCif;
								if(self.RakGenRqEStmtModel.MobNoFromCif != ""){
									self.RakApplyCCModel.MobileNo = parseInt(self.RakApplyCCModel.MobNoFromCif);
								}
								else {
									self.RakApplyCCModel.MobileNo = self.RakApplyCCModel.MobNoFromCif;
								}
			    		  }
				    	  if(responsesList[0].hasOwnProperty('EmailId'))
			    		  {
							  self.RakApplyCCModel.EmailId=responsesList[0].EmailId;
			    		  }
				    	  if(responsesList[0].hasOwnProperty('CustomerName'))
			    		  {
							  self.RakApplyCCModel.CustomerName =  responsesList[0].CustomerName;
			    		  }
				    	  }
					    };
					    self.confirmRakApplyCC = function(responsesList){
				    		if(!responsesList[0].hasOwnProperty('errorMessage')){
								if(responsesList[0].hasOwnProperty('authFlag'))
								{
									self.RakApplyCCModel.authFlag = responsesList[0].authFlag;

									if(self.RakApplyCCModel.authFlag == "Y"){
										if(responsesList[0].auth == "")
											self.RakApplyCCModel.authStatus=false;
										else
										{
											self.RakApplyCCModel.authStatus=true;
											self.RakApplyCCModel.authMode = responsesList[0].auth;
										}
									}
								}
							}
					    };
				    	self.initRakApplyCCSuccess = function(responsesList){
							if(!responsesList[0].hasOwnProperty('errorMessage'))
								self.RakApplyCCModel.successMessage = responsesList[0].successMsg;
						};
						// - Added for Apply for Credit Card : END
//----------------------------------------------------------------------------------------------------------------



	/*RAK  CREDIT CARD BALANCE TRANSFER START*/
	self.RakCreditCardBalanceTransfer ={
			cardList:[],
			availCreditLimit:"",
			availLimt:"",
			bnkTypeList:[],
			bnkType:"",
			bankNamesList:[],
			bankName:"",
			otherBnkCC:"",
			balanceTransferAmt:"",
			deliveryChannelList:[],
			deliveryChannelListWithoutUAEFTS:[],
			deliveryChannel:"",
			confirmDelChannel:"",
			managerChq:"",
			branchList:[],
			branch:"",
			confirmedBranch:"",
			balanceTransferList:[],
			balanceTransfer:"",
			remarks:"",
			authMode:"",
			txnPwd:"",
			successMessage:"",
			confirmedCard:"",
			btMinTransfer:"",
			btMaxTransfer:"",
			rakCCCodesList:[],
			selectedCard:"",
			uaeftEligList:[],
			isUaeftElig:false,
			isOtherBnkCC:false,
			isManChqMandatory:false,
			eligibleAmount:"",
			eligAmt:"",
			eligString:"",
			availString:"",
			isBalAmtElig:false,
			isDetailsFetched:"",
			isBranchChecked:false,

			resetRakCCBalanceTransferHome :function()
	       {
				self.RakCreditCardBalanceTransfer.cardList=[];
				self.RakCreditCardBalanceTransfer.availCreditLimit="";
				self.RakCreditCardBalanceTransfer.bnkTypeList=[];
				self.RakCreditCardBalanceTransfer.bnkType="";
				self.RakCreditCardBalanceTransfer.bankNamesList=[];
				self.RakCreditCardBalanceTransfer.bankName="";
				self.RakCreditCardBalanceTransfer.otherBnkCC="";
				self.RakCreditCardBalanceTransfer.balanceTransferAmt="";
				self.RakCreditCardBalanceTransfer.deliveryChannelList=[];
				self.RakCreditCardBalanceTransfer.deliveryChannelListWithoutUAEFTS=[];
				self.RakCreditCardBalanceTransfer.deliveryChannel="";
				self.RakCreditCardBalanceTransfer.confirmDelChannel="";
				self.RakCreditCardBalanceTransfer.managerChq="";
				self.RakCreditCardBalanceTransfer.branchList=[];
				self.RakCreditCardBalanceTransfer.branch="";
				self.RakCreditCardBalanceTransfer.confirmedBranch="";
				self.RakCreditCardBalanceTransfer.balanceTransferList=[];
				self.RakCreditCardBalanceTransfer.balanceTransfer="";
				self.RakCreditCardBalanceTransfer.remarks="";
				self.RakCreditCardBalanceTransfer.authMode="";
				self.RakCreditCardBalanceTransfer.txnPwd="";
				self.RakCreditCardBalanceTransfer.successMessage="";
				self.RakCreditCardBalanceTransfer.confirmedCard="";
				self.RakCreditCardBalanceTransfer.btMinTransfer="";
				self.RakCreditCardBalanceTransfer.btMaxTransfer="";
				self.RakCreditCardBalanceTransfer.rakCCCodesList=[];
				self.RakCreditCardBalanceTransfer.selectedCard="";
				self.RakCreditCardBalanceTransfer.uaeftEligList=[];
				self.RakCreditCardBalanceTransfer.isUaeftElig=false;
				self.RakCreditCardBalanceTransfer.isOtherBnkCC=false;
				self.RakCreditCardBalanceTransfer.isManChqMandatory=false;
			self.RakCreditCardBalanceTransfer.eligibleAmount="";
			self.RakCreditCardBalanceTransfer.eligString="";
			self.RakCreditCardBalanceTransfer.availString="";
			self.RakCreditCardBalanceTransfer.isBalAmtElig=false;

			self.RakCreditCardBalanceTransfer.isDetailsFetched = "N";
			self.RakCreditCardBalanceTransfer.isBranchChecked=false;
			self.common.message="";

			},

			resetRakCCBalanceTransferDetails :function(){
				self.RakCreditCardBalanceTransfer.eligibleAmount="";
				self.RakCreditCardBalanceTransfer.availCreditLimit="";
			},

			rakCCBalanceTransferContinue :function()
			{
				self.RakCreditCardBalanceTransfer.authMode="";
				self.RakCreditCardBalanceTransfer.txnPwd="";
				self.RakCreditCardBalanceTransfer.successMessage="";
				self.RakCreditCardBalanceTransfer.isBranchChecked=false;

				if (self.RakCreditCardBalanceTransfer.isUaeftElig!=true || (self.RakCreditCardBalanceTransfer.deliveryChannel && self.RakCreditCardBalanceTransfer.deliveryChannelList[self.RakCreditCardBalanceTransfer.deliveryChannel].code=='M'))
				{
				self.RakCreditCardBalanceTransfer.isManChqMandatory=true;

				if(self.RakCreditCardBalanceTransfer.managerChq && self.RakCreditCardBalanceTransfer.managerChq=='B'){
					self.RakCreditCardBalanceTransfer.isBranchChecked=true;
				}

				}


/*				self.RakCreditCardBalanceTransfer.balanceTransferAmt=self.RakCreditCardBalanceTransfer.balanceTransferAmt ? self.RakCreditCardBalanceTransfer.balanceTransferAmt.toString() :'';
				self.RakCreditCardBalanceTransfer.otherBnkCC=self.RakCreditCardBalanceTransfer.otherBnkCC ? self.RakCreditCardBalanceTransfer.otherBnkCC.toString() :'';*/

				var eligString=self.RakCreditCardBalanceTransfer.eligString.toString();
				var elig = eligString.split(" ");

				for (var i=0;i<elig.length;i++)
					{
					if (!(isNaN(elig[i])))
						{
						self.RakCreditCardBalanceTransfer.eligAmt=elig[i];
						break;
						}

					}

				var availString  = self.RakCreditCardBalanceTransfer.availString.toString();

				var avail =availString.split(" ");
				for (var i=0;i<avail.length;i++)
				{
				if (!(isNaN(avail[i])))
					{
					self.RakCreditCardBalanceTransfer.availLimt=avail[i];
					break;
					}

				}

				if (parseFloat(self.RakCreditCardBalanceTransfer.availLimt)>parseFloat(self.RakCreditCardBalanceTransfer.balanceTransferAmt)
						&& parseFloat(self.RakCreditCardBalanceTransfer.eligAmt)>parseFloat(self.RakCreditCardBalanceTransfer.balanceTransferAmt) &&
						parseFloat(self.RakCreditCardBalanceTransfer.btMaxTransfer)>parseFloat(self.RakCreditCardBalanceTransfer.balanceTransferAmt)
						&& parseFloat(self.RakCreditCardBalanceTransfer.btMinTransfer)<parseFloat(self.RakCreditCardBalanceTransfer.balanceTransferAmt))
					{
					self.RakCreditCardBalanceTransfer.isBalAmtElig=true;
					}

			},
			rakCCBalanceTransferSubmit :function()
			{
				if (self.RakCreditCardBalanceTransfer.isUaeftElig&& self.RakCreditCardBalanceTransfer.deliveryChannel && self.RakCreditCardBalanceTransfer.deliveryChannelList[self.RakCreditCardBalanceTransfer.deliveryChannel].code=='M'&&self.RakCreditCardBalanceTransfer.managerChq=='B')
				{
					self.RakCreditCardBalanceTransfer.confirmDelChannel=self.RakCreditCardBalanceTransfer.deliveryChannelList[self.RakCreditCardBalanceTransfer.deliveryChannel].code;
					self.RakCreditCardBalanceTransfer.confirmedBranch=self.RakCreditCardBalanceTransfer.branchList[self.RakCreditCardBalanceTransfer.branch].code;
				}
				else
					if (self.RakCreditCardBalanceTransfer.deliveryChannel && self.RakCreditCardBalanceTransfer.isUaeftElig!=true && self.RakCreditCardBalanceTransfer.managerChq=='B')
					{
						self.RakCreditCardBalanceTransfer.confirmDelChannel='M';
						self.RakCreditCardBalanceTransfer.confirmedBranch=self.RakCreditCardBalanceTransfer.branchList[self.RakCreditCardBalanceTransfer.branch].code;

					}

					else if(self.RakCreditCardBalanceTransfer.deliveryChannel && self.RakCreditCardBalanceTransfer.isUaeftElig && self.RakCreditCardBalanceTransfer.deliveryChannelList[self.RakCreditCardBalanceTransfer.deliveryChannel].code=='M'&&self.RakCreditCardBalanceTransfer.managerChq=='C')
					{
						self.RakCreditCardBalanceTransfer.confirmDelChannel=self.RakCreditCardBalanceTransfer.deliveryChannelList[self.RakCreditCardBalanceTransfer.deliveryChannel].code;
						self.RakCreditCardBalanceTransfer.confirmedBranch="";

					}
					else if (self.RakCreditCardBalanceTransfer.deliveryChannel && self.RakCreditCardBalanceTransfer.isUaeftElig!=true && self.RakCreditCardBalanceTransfer.managerChq=='C')
					{
						self.RakCreditCardBalanceTransfer.confirmDelChannel='M';
						self.RakCreditCardBalanceTransfer.confirmedBranch="";

					}else if (self.RakCreditCardBalanceTransfer.deliveryChannel && self.RakCreditCardBalanceTransfer.isUaeftElig && self.RakCreditCardBalanceTransfer.deliveryChannelList[self.RakCreditCardBalanceTransfer.deliveryChannel].code!='M')
						{
						self.RakCreditCardBalanceTransfer.confirmDelChannel=self.RakCreditCardBalanceTransfer.deliveryChannelList[self.RakCreditCardBalanceTransfer.deliveryChannel].code;
						self.RakCreditCardBalanceTransfer.confirmedBranch="";

						}
			}
};

	self.RakCCBTHideOtherfields = function() {
		self.RakCreditCardBalanceTransfer.isDetailsFetched = "N";
		self.RakCreditCardBalanceTransfer.isBack = false;
	};

	self.rakCreditCardBalanceTransferInit=function(responselist){
		if (!responselist[0].hasOwnProperty('errorMessage'))
		{
			if (responselist[0].hasOwnProperty('isDetailFetched'))
			{
				self.RakCreditCardBalanceTransfer.isDetailsFetched = responselist[0].isDetailFetched;
			}

			if (responselist[0].hasOwnProperty('creditCardList'))
			{
				self.RakCreditCardBalanceTransfer.cardList=responselist[0].creditCardList;
			}
			if (responselist[0].hasOwnProperty('otherbankCCTypeList'))
			{
				self.RakCreditCardBalanceTransfer.bnkTypeList=responselist[0].otherbankCCTypeList;
			}
			if (responselist[0].hasOwnProperty('otherbankCCNameList'))
			{
				self.RakCreditCardBalanceTransfer.bankNamesList = responselist[0].otherbankCCNameList;
			}

			if (responselist[0].hasOwnProperty('branchList'))
			{
				self.RakCreditCardBalanceTransfer.branchList = responselist[0].branchList;
			}
			if (responselist[0].hasOwnProperty('deliveryChannelList'))
			{
				self.RakCreditCardBalanceTransfer.deliveryChannelList = responselist[0].deliveryChannelList;
				self.RakCreditCardBalanceTransfer.deliveryChannelListWithoutUAEFTS = responselist[0].deliveryChannelListWithoutUAEFTS;
			}
			if (responselist[0].hasOwnProperty('branchTransferList'))
			{
				self.RakCreditCardBalanceTransfer.balanceTransferList = responselist[0].branchTransferList;
			}


			if (responselist[0].hasOwnProperty('branchTransferList'))
			{
				self.RakCreditCardBalanceTransfer.balanceTransferList = responselist[0].branchTransferList;
			}
			if (responselist[0].hasOwnProperty('rakCCCodesList'))
			{
				self.RakCreditCardBalanceTransfer.rakCCCodesList = responselist[0].rakCCCodesList;
			}
			if (responselist[0].hasOwnProperty('btMinAmt'))
			{
				self.RakCreditCardBalanceTransfer.btMinTransfer = responselist[0].btMinAmt;
			}
			if (responselist[0].hasOwnProperty('btMaxAmt'))
			{
				self.RakCreditCardBalanceTransfer.btMaxTransfer = responselist[0].btMaxAmt;
			}

			if (self.RakCreditCardBalanceTransfer.isDetailsFetched == "Y") {

				if (responselist[0].hasOwnProperty('availCredLimit'))
				{
					self.RakCreditCardBalanceTransfer.availCreditLimit = responselist[0].availCredLimit;
				}
				if (responselist[0].hasOwnProperty('eligibleLimit'))
				{
					self.RakCreditCardBalanceTransfer.eligibleAmount = responselist[0].eligibleLimit;
				}
			}
			if (responselist[0].hasOwnProperty('uaeftEligList'))
			{
				self.RakCreditCardBalanceTransfer.uaeftEligList = responselist[0].uaeftEligList;
			}
			if (responselist[0].hasOwnProperty('availLimit'))
			{
				self.RakCreditCardBalanceTransfer.availString = responselist[0].availLimit;
			}
			if (responselist[0].hasOwnProperty('eligLimit'))
			{
				self.RakCreditCardBalanceTransfer.eligString = responselist[0].eligLimit;
			}

		}
	};


	self.rakCreditCardBalanceTransferSuccess=function(responselist){

		if (!responselist[0].hasOwnProperty('errorMessage'))
		{
			self.RakCreditCardBalanceTransfer.successMessage=responselist[0].successRequest;
		}


	};


	self.rakCreditCardBalanceTransferUaeftEligibilityCheck=function(){
		self.RakCreditCardBalanceTransfer.isUaeftElig=false;
		for (var i = 0 ; i < self.RakCreditCardBalanceTransfer.uaeftEligList.length ; i++ )
		{
			if (self.RakCreditCardBalanceTransfer.bankNamesList[self.RakCreditCardBalanceTransfer.bankName].code==self.RakCreditCardBalanceTransfer.uaeftEligList[i].code)
			{
				self.RakCreditCardBalanceTransfer.isUaeftElig=true;
				break;
			}
		}

	};

	self.rakCreditCardBalanceTransferOtherBankCard = function()
	{
		var tempCCNUM=self.RakCreditCardBalanceTransfer.otherBnkCC ? self.RakCreditCardBalanceTransfer.otherBnkCC.toString():'';
		for (var i = 0 ; i < self.RakCreditCardBalanceTransfer.rakCCCodesList.length ; i++ )
		{
			if (tempCCNUM.substring(0, 5) != self.RakCreditCardBalanceTransfer.rakCCCodesList[i].codeDesc)

			{

				self.RakCreditCardBalanceTransfer.isOtherBnkCC=true;
				break;
			}
		}
	};

	self.rakCreditCardBalanceTransferConfirm=function(responsesList){



		if (!responsesList[0].hasOwnProperty('errorMessage'))
		{
			self.common.message=responsesList[0].MESSAGE ? responsesList[0].MESSAGE :'';
			if(responsesList[0].auth == "")
				self.RakCreditCardBalanceTransfer.authStatus=false;
			else 
			{
				self.RakCreditCardBalanceTransfer.authStatus=true;
				self.RakCreditCardBalanceTransfer.authMode = responsesList[0].auth;
			}

		}


	};

	/*RAK  CREDIT CARD BALANCE TRANSFER END*/

		/*RAK  CC TXN DISPUTE START*/

	self.RakCCTxnDisputeSR={
			cardList:[],
			selectedCard:"",
			toDate:"",
			fromDate:"",
			confirmToDate:"",
			confirmFrmDate:"",
			isTxnListPresent:false,
			txnList:"",
			txnSel:"",
			authStatus:true,
			authMode :"",
			txnPwd:"",
			successMessage:"",
			toDate_day :"",
			toDate_month:"",
			toDate_year :"",
			fromDate_day :"",
			fromDate_month:"",
			fromDate_year :"",

			rakCCTxnDisputeTxn:function()
			{
				self.RakCCTxnDisputeSR.confirmToDate=self.RakCCTxnDisputeSR.toDate.toString();
				self.RakCCTxnDisputeSR.confirmFrmDate=self.RakCCTxnDisputeSR.fromDate.toString();

				self.common.displayDate = self.RakCCTxnDisputeSR.toDate;
				self.populateCurrentDateDetails(self.RakCCTxnDisputeSR.toDate);

				self.RakCCTxnDisputeSR.toDate_day =self.common.date;
				self.RakCCTxnDisputeSR.toDate_month=self.common.month;
				self.RakCCTxnDisputeSR.toDate_year=self.common.year;

				self.common.displayDate = self.RakCCTxnDisputeSR.fromDate;
				self.populateCurrentDateDetails(self.RakCCTxnDisputeSR.fromDate);

				self.RakCCTxnDisputeSR.fromDate_day =self.common.date;
				self.RakCCTxnDisputeSR.fromDate_month=self.common.month;
				self.RakCCTxnDisputeSR.fromDate_year=self.common.year;


			},
			resetRakCCTxnDisputeHome:function()
			{
				self.RakCCTxnDisputeSR.cardList=[];
				self.RakCCTxnDisputeSR.selectedCard="";
				self.RakCCTxnDisputeSR.toDate="";
				self.RakCCTxnDisputeSR.fromDate="";
				self.RakCCTxnDisputeSR.isTxnListPresent=false;
				self.RakCCTxnDisputeSR.txnList="";
				self.RakCCTxnDisputeSR.txnSel="";
				self.RakCCTxnDisputeSR.authStatus=true;
				self.RakCCTxnDisputeSR.authMode ="";
				self.RakCCTxnDisputeSR.txnPwd="";
				self.RakCCTxnDisputeSR.successMessage="";
				self.common.message="";
			},
			resetRakCCTxnDisputeConfirm:function()
			{
				self.RakCCTxnDisputeSR.authStatus=true;
				self.RakCCTxnDisputeSR.authMode ="";
				self.RakCCTxnDisputeSR.txnPwd="";
				self.RakCCTxnDisputeSR.successMessage="";
			}
	};

	self.rakCCTxnDisputeInit=function(responselist){
		if (!responselist[0].hasOwnProperty('errorMessage'))
		{
			if (responselist[0].hasOwnProperty('cardNoList'))
			{
				self.RakCCTxnDisputeSR.cardList=responselist[0].cardNoList;
			}
			if (responselist[0].hasOwnProperty('ccTxnDetailsList'))
			{
				self.RakCCTxnDisputeSR.txnList=responselist[0].ccTxnDetailsList;
				self.RakCCTxnDisputeSR.isTxnListPresent=true;

			}
			}
	};


	self.rakCCTxnDisputeSRConfirm=function(responsesList){



		if (!responsesList[0].hasOwnProperty('errorMessage'))
		{
			if(responsesList[0].auth == "")
				self.RakCCTxnDisputeSR.authStatus=false;
			else 
			{
				self.RakCCTxnDisputeSR.authStatus=true;
				self.RakCCTxnDisputeSR.authMode = responsesList[0].auth;
			}

			self.common.message=responsesList[0].MESSAGE ? responsesList[0].MESSAGE :'';

		}


	};


	self.rakCCTxnDisputeSRSuccess=function(responselist){

		if (!responselist[0].hasOwnProperty('errorMessage'))
		{
			self.RakCCTxnDisputeSR.successMessage=responselist[0].successRequest;
		}


	};

	/*RAK  CC TXN DISPUTE END*/
	/*RAK  CREDIT CARD CHEQUE REQUEST START*/
	self.RakCCChequeRequestSR={
			cardList:[],
			selectedCard:"",
		     popList:[],
		     selectedPop:"",
			branchList:[],
			selectedBranch:"",
			benName:"",
			otherCode:"",
			amount:"",
			availCredLimit:"",
			numAvailLimit:"",
			btMinAmt:"",
			btMaxAmt:"",
			eligLimit:"",
			numEligLimit:"",
		   confirmedBranch:"",
		   delivChannel:"",
		   others:"",
		   amtFormat:"",
			authStatus:true,
			authMode :"",
			txnPwd:"",
			successMessage:"",
			isAmtElig:false,
			isLimitFetched:"N",
			isOthersMandatory:false,
			isBranchMandatory:false,
		isDetailsFetched : "",
		emirateList:[],
        emiBranchList:[],
        emirateSeletected:"",
        emiCategorizedBranchList:[],
        isEmiSelected:false,
        emiSelDesc:"",
        //CHANGES DONE AS FIX OF PROUAT-2278 START
         iban:"",
        //CHANGES DONE AS FIX OF PROUAT-2278 END
         
         //ConstantsValue
         MYRAKBANKACCOUNT:'A',
         OTHERRAKBANK:'O',
         isRakAccount:false,
         isIban:false,
         transferAmtTo:'',
         oprAcctId:'',
         oprAccountList:[],
         

			rakCCChequeRequestContinue:function()
			{
				
				
				self.RakCCChequeRequestSR.amount = 	self.RakCCChequeRequestSR.amount.toString();

				if (self.RakCCChequeRequestSR.delivChannel=='B')
					{
					self.RakCCChequeRequestSR.confirmedBranch=self.RakCCChequeRequestSR.branchList[self.RakCCChequeRequestSR.selectedBranch].code;
					}
				else {
					self.RakCCChequeRequestSR.confirmedBranch="";
				}


				if (parseFloat(self.RakCCChequeRequestSR.numAvailLimit)>parseFloat(self.RakCCChequeRequestSR.amount)
						&& parseFloat(self.RakCCChequeRequestSR.numEligLimit)>parseFloat(self.RakCCChequeRequestSR.amount) &&
						parseFloat(self.RakCCChequeRequestSR.btMaxAmt)>parseFloat(self.RakCCChequeRequestSR.amount)
						&& parseFloat(self.RakCCChequeRequestSR.btMinAmt)<parseFloat(self.RakCCChequeRequestSR.amount))
					{
					self.RakCCChequeRequestSR.isAmtElig=true;
					}

				if (self.RakCCChequeRequestSR.popList[self.RakCCChequeRequestSR.selectedPop].codeDesc=='OTHERS')
					{
					self.RakCCChequeRequestSR.isOthersMandatory=true;

					}
				else
					{
					self.RakCCChequeRequestSR.isOthersMandatory=false;
					self.RakCCChequeRequestSR.others="";

					}

				if (self.RakCCChequeRequestSR.delivChannel=='B')
					{
					self.RakCCChequeRequestSR.isBranchMandatory=true;
					}
				else
					{
					self.RakCCChequeRequestSR.isBranchMandatory=false;
					}

				

			for (var x = 0; x < self.RakCCChequeRequestSR.emirateList.length; x++) {
				if (self.RakCCChequeRequestSR.emirateList[x].code == self.RakCCChequeRequestSR.emirateSeletected) {
					self.RakCCChequeRequestSR.emiSelDesc = self.RakCCChequeRequestSR.emirateList[x].codeDesc;
				}
			}

			},
			resetCCChequeRequestHome:function()
			{
				self.RakCCChequeRequestSR.cardList=[];
				self.RakCCChequeRequestSR.selectedCard="";
				self.RakCCChequeRequestSR.popList=[];
				self.RakCCChequeRequestSR.selectedPop="";
				self.RakCCChequeRequestSR.branchList=[];
				self.RakCCChequeRequestSR.selectedBranch="";
				self.RakCCChequeRequestSR.benName="";
				self.RakCCChequeRequestSR.otherCode="";
				self.RakCCChequeRequestSR.amount="";
				self.RakCCChequeRequestSR.isLimitFetched="N";
				self.RakCCChequeRequestSR.availCredLimit="";
				self.RakCCChequeRequestSR.numAvailLimit="";
				self.RakCCChequeRequestSR.btMinAmt="";
				self.RakCCChequeRequestSR.btMaxAmt="";
				self.RakCCChequeRequestSR.eligLimit="";
				self.RakCCChequeRequestSR.numEligLimit="";
				self.RakCCChequeRequestSR.confirmedBranch="";
			   self.RakCCChequeRequestSR.delivChannel="";
			   self.RakCCChequeRequestSR.others="";
			   self.RakCCChequeRequestSR.amtFormat="";
			   self.RakCCChequeRequestSR.authStatus=true;
			   self.RakCCChequeRequestSR.authMode ="";
			   self.RakCCChequeRequestSR.txnPwd="";
			   self.RakCCChequeRequestSR.successMessage="";
			   self.RakCCChequeRequestSR.isAmtElig=false;
			   self.RakCCChequeRequestSR.isOthersMandatory=false;
			   self.RakCCChequeRequestSR.isBranchMandatory=false;
			   self.RakCCChequeRequestSR.isDetailsFetched="N";
			//added by 
			self.RakCCChequeRequestSR.emirateList= "";
			self.RakCCChequeRequestSR.emiBranchList= "";
			self.RakCCChequeRequestSR.emirateSeletected= "";
			self.RakCCChequeRequestSR.emiCategorizedBranchList= "";
			self.RakCCChequeRequestSR.isEmiSelected=false;
			self.RakCCChequeRequestSR.emiSelDesc= "";
			//CHANGES DONE AS FIX OF PROUAT-2278 START
			self.RakCCChequeRequestSR.iban="";
	        //CHANGES DONE AS FIX OF PROUAT-2278 END
			self.common.message="";
			self.RakCCChequeRequestSR.isRakAccount=false;
			self.RakCCChequeRequestSR.isIban=false;
			self.RakCCChequeRequestSR.transferAmtTo=self.RakCCChequeRequestSR.MYRAKBANKACCOUNT;
			self.RakCCChequeRequestSR.oprAcctId="";
			self.RakCCChequeRequestSR.oprAccountList=[];
			},
			resetCCChequeRequestConfirm:function()
			{
				   self.RakCCChequeRequestSR.authStatus=true;
				   self.RakCCChequeRequestSR.authMode ="";
				   self.RakCCChequeRequestSR.txnPwd="";
				   self.RakCCChequeRequestSR.successMessage="";
				   self.RakCCChequeRequestSR.amtFormat="";
			}
	};

	self.RakCCHideOtherfields = function() {
		self.RakCCChequeRequestSR.isDetailsFetched = "N";

		self.RakCCChequeRequestSR.isBack = false;
	};
	//Added by  - start
	self.RakCCdefauldPOPset = function(){
		self.RakCCChequeRequestSR.selectedPop="";

	};

	//Added by  For Emirates based Branch Dropdown Change
    self.RakCCChequeRequestSROptionChange = function() {

	var branchListCount = 0;
	var emBranchDesc = [];
	self.RakCCChequeRequestSR.emiCategorizedBranchList = [];
	self.RakCCChequeRequestSR.isEmiSelected = true;
	for (var x = 0; x < self.RakCCChequeRequestSR.emiBranchList.length; x++) {
		if (self.RakCCChequeRequestSR.emiBranchList[x].code == self.RakCCChequeRequestSR.emirateSeletected) {
			emBranchDesc = self.RakCCChequeRequestSR.emiBranchList[x].codeDesc
					.split("|");
			break;
		}
	}

	for (var x = 0; x < emBranchDesc.length; x++) {
		for (var y = 0; y < self.RakCCChequeRequestSR.branchList.length; y++) {
			if (emBranchDesc[x] == self.RakCCChequeRequestSR.branchList[y].code) {
				self.RakCCChequeRequestSR.emiCategorizedBranchList[branchListCount] = self.RakCCChequeRequestSR.branchList[y];
				branchListCount++;
			}
		}
	}

};
// added by  end

	self.rakCCChequeRequestSRInit=function(responselist){
		if (!responselist[0].hasOwnProperty('errorMessage'))
		{
			
			
			if (responselist[0].hasOwnProperty('oprAccountList'))
			{
				self.RakCCChequeRequestSR.oprAccountList = responselist[0].oprAccountList;
			}
			if (responselist[0].hasOwnProperty('isDetailFetched'))
			{
				self.RakCCChequeRequestSR.isDetailsFetched = responselist[0].isDetailFetched;
			}
			if (responselist[0].hasOwnProperty('isLimitFetched'))
			{
				self.RakCCChequeRequestSR.isLimitFetched = responselist[0].isLimitFetched;
			}
			if (responselist[0].hasOwnProperty('creditCardList'))
			{
				self.RakCCChequeRequestSR.cardList=responselist[0].creditCardList;
			}
			if (responselist[0].hasOwnProperty('prpmOtherCode') && !(responselist[0].prpmOtherCode == ''))
			{
				self.RakCCChequeRequestSR.otherCode=responselist[0].OtherCode[0].codeOther;
			}
			if (responselist[0].hasOwnProperty('branchList'))
			{
				self.RakCCChequeRequestSR.branchList=responselist[0].branchList;


			}
			if (responselist[0].hasOwnProperty('popList'))
			{
				self.RakCCChequeRequestSR.popList=responselist[0].popList;

			}
			//added by 
			/*if (responsesList[0].hasOwnProperty('OprAcctBranchList'))
				self.RakDCApplyModel.OprAcctBranchList = responsesList[0].OprAcctBranchList;*/

			if (responselist[0].hasOwnProperty('emirateList')) {
				self.RakCCChequeRequestSR.emirateList = responselist[0].emirateList;
			}

			if (responselist[0].hasOwnProperty('emiBranchList')) {
				self.RakCCChequeRequestSR.emiBranchList = responselist[0].emiBranchList;
			}
			//added by  - end
			if (self.RakCCChequeRequestSR.isDetailsFetched == "Y") {
				if (responselist[0].hasOwnProperty('eligibleLimit'))
				{
					self.RakCCChequeRequestSR.eligLimit=responselist[0].eligibleLimit;

				}

			}

			if (self.RakCCChequeRequestSR.isLimitFetched == "Y") {

				if (responselist[0].hasOwnProperty('availCredLimit'))
				{
					self.RakCCChequeRequestSR.availCredLimit=responselist[0].availCredLimit;

				}
			}

			if (responselist[0].hasOwnProperty('btMaxAmt'))
			{
				self.RakCCChequeRequestSR.btMaxAmt=responselist[0].btMaxAmt;

			}if (responselist[0].hasOwnProperty('btMinAmt'))
			{
				self.RakCCChequeRequestSR.btMinAmt=responselist[0].btMinAmt;

			}
			if (responselist[0].hasOwnProperty('availLimit'))
			{
				self.RakCCChequeRequestSR.numAvailLimit=responselist[0].availLimit;

			}if (responselist[0].hasOwnProperty('eligLimit'))
			{
				self.RakCCChequeRequestSR.numEligLimit=responselist[0].eligLimit;

			}

		}
	};

	self.rakCCChequeRequestSRConfirm = function(responsesList) {



		if (!responsesList[0].hasOwnProperty('errorMessage'))
		{
			self.common.message=responsesList[0].MESSAGE ? responsesList[0].MESSAGE :'';
			if(responsesList[0].auth == "")
				self.RakCCChequeRequestSR.authStatus=false;
			else 
			{
				self.RakCCChequeRequestSR.authStatus=true;
				self.RakCCChequeRequestSR.authMode = responsesList[0].auth;
			}

			if (responsesList[0].hasOwnProperty('amtFormat'))
			{
				self.RakCCChequeRequestSR.amtFormat=responsesList[0].amtFormat;

			}

		}

	};

	self.rakCCChequeRequestSRSuccess = function(responselist) {

		if (!responselist[0].hasOwnProperty('errorMessage'))
		{
			self.RakCCChequeRequestSR.successMessage=responselist[0].successRequest;
		}

	};



	/*RAK  CREDIT CARD CHEQUE REQUEST END*/

	/* For Operative Accounts Demand Draft/Managers Cheque*/

	self.RakOperativeDDCheque={
			OprAcctList:[],
    		selectedOprAcct:'',
    		requestList:[],
    		selectedReq:'',
    		bnfList:[],
    		selectedBnf:'',
    		beneficiaryList:[],
    		purposeList:[],
    		selectedPurpose:'',
    		branchList:[],
    		selectedBranch:[],
    		txnbenfTypeArr:[],
    		validIdList:[],
    		correspondingBankList:[],
    		cityList:[],
    		benfType:'',
    		benfTypeSelected:'',
    		authorize:false,
    		contact:' ',
    		selectedValidId:'',
    		idNumber:'',
    		RakSelectedRequestIDModel:'',
    		selectedCorrsBank:'',
    		selectedCity:'',
    		selectedFlag:'N',
    		selectedOprAcctCn:'',
			//selectedOprAcctCn:'',
			selectedBnfNameCn:'',
			bnfBankNameCn:'',
			bnfCountryNameCn:'',
			bnfAccCurrencyCn:'',
			selectedCorrsBankCn:'',
			selectedPurposeCn:'',
			benfTypeCn:'',
			authorizeNameCn:'',
			contactCn:'',
			selectedValidIdCn:'',
			idNumberCn:'',
			selectedCityCn:'',
			benfddcrnList:'',
			txnbenfTypeNewArr:[],
			tempCountryBenf:'',
			selBeneficiaryAccountCurrency:'',
			name:'',
			selfAuth:true,
			selectedBnfToServer:'',
			emirateList:[],
        emiBranchList:[],
        emirateSeletected:"",
        emiCategorizedBranchList:[],
        isEmiSelected:false,
        emiSelDesc:"",
        isDetailSelected:false,
        selectedDelMode:"",
        registeredAddress:"",
        isDelModeBranchVisible:true,

			currBenfArray:function(){
				if(self.RakOperativeDDCheque.selectedBnf)
				{self.RakOperativeDDCheque.isDetailSelected =true;
					self.RakOperativeDDCheque.tempCountryBenf=self.RakOperativeDDCheque.txnbenfTypeNewArr[self.RakOperativeDDCheque.selectedBnf].bnfBankCountry;
	
					for(var curTemp in self.RakOperativeDDCheque.benfddcrnList){
						curBnf=self.RakOperativeDDCheque.benfddcrnList[curTemp]['crnCode'].toString();
						if(self.RakOperativeDDCheque.tempCountryBenf==curBnf){
							self.RakOperativeDDCheque.selBeneficiaryAccountCurrency=self.RakOperativeDDCheque.benfddcrnList[curTemp].crnDesc;
						}
	
					}
				}
				else
					{
					self.RakOperativeDDCheque.isDetailSelected =false;
					
					}
			
				
			},
		/*
			resetAuthorizeValue:function(){


			if(self.RakOperativeDDCheque.authorize == false){
				self.RakOperativeDDCheque.name=" ";
				self.RakOperativeDDCheque.contact=" ";
				self.RakOperativeDDCheque.selectedValidId=" ";
				self.RakOperativeDDCheque.idNumber=" ";
				self.RakOperativeDDCheque.authorize="Self";
				self.RakOperativeDDCheque.selfAuth=false;
			}
			else {
				//self.RakOperativeDDCheque.authorize="Authorize";
				self.RakOperativeDDCheque.authorize=true;
			}


			},*/



   filterBenfArray: function(){
		self.RakOperativeDDCheque.txnbenfTypeArr=[];
		self.RakOperativeDDCheque.txnbenfTypeNewArr=[];
		self.RakOperativeDDCheque.selectedBnf='';

		if (self.RakOperativeDDCheque.selectedReq) {

			//var benfTypeSelected=self.RakOperativeDDCheque.beneficiaryList[self.RakOperativeDDCheque.selectedReq]['bnfType'].toString();
			//=self.RakOperativeDDCheque.requestList[self.RakOperativeDDCheque.selectedReq][''];
			//self.RakOperativeDDCheque.requestList[self.RakOperativeDDCheque.selectedReq];

			self.RakOperativeDDCheque.RakSelectedRequestIDModel=self.RakOperativeDDCheque.requestList[self.RakOperativeDDCheque.selectedReq]['code'];

			if (self.RakOperativeDDCheque.requestList[self.RakOperativeDDCheque.selectedReq]['code'].toString()=='DD'){
				benfTypeSelected="DBF";
			}
			if (self.RakOperativeDDCheque.requestList[self.RakOperativeDDCheque.selectedReq]['code'].toString()=='MCHQ'){
				benfTypeSelected="MBF";
			}

			for(var temp in self.RakOperativeDDCheque.beneficiaryList){
				benfType=self.RakOperativeDDCheque.beneficiaryList[temp]['bnfType'].toString();
				if(benfTypeSelected==benfType){
					//self.rakMoney.creditCrn=self.rakMoney.remitCrnFilter[temp]['filterDesc'];
					//self.rakMoney.creditCrn=self.rakMoney.selectedRCurr;
					self.RakOperativeDDCheque.txnbenfTypeNewArr.push(self.RakOperativeDDCheque.beneficiaryList[temp]);
					//self.RakOperativeDDCheque.txnbenfTypeArr.push({'label':self.RakOperativeDDCheque.beneficiaryList[temp]["beneficiaryName"],'value':temp});
					//break;
				}

			}
		}


	},


	};

	self.authorizeFields=function(){

		if (self.RakOperativeDDCheque.authorize == false){
			self.RakOperativeDDCheque.name="";
			self.RakOperativeDDCheque.contact="";
			self.RakOperativeDDCheque.selectedValidId="";
			self.RakOperativeDDCheque.idNumber="";
			//self.RakOperativeDDCheque.authorize="";

		}


	};

	//Added by  For Emirates based Branch Dropdown Change
    self.RakOperativeDDChequeOptionChange = function() {

	var branchListCount = 0;
	var emBranchDesc = [];
	self.RakOperativeDDCheque.emiCategorizedBranchList = [];
	self.RakOperativeDDCheque.isEmiSelected = true;
	for (var x = 0; x < self.RakOperativeDDCheque.emiBranchList.length; x++) {
		if (self.RakOperativeDDCheque.emiBranchList[x].code == self.RakOperativeDDCheque.emirateSeletected) {
			emBranchDesc = self.RakOperativeDDCheque.emiBranchList[x].codeDesc
					.split("|");
			break;
		}
	}

	for (var x = 0; x < emBranchDesc.length; x++) {
		for (var y = 0; y < self.RakOperativeDDCheque.branchList.length; y++) {
			if (emBranchDesc[x] == self.RakOperativeDDCheque.branchList[y].branchCode) {
				self.RakOperativeDDCheque.emiCategorizedBranchList[branchListCount] = self.RakOperativeDDCheque.branchList[y];
				branchListCount++;
			}
		}
	}

};
// added by  end

	self.confirmValues=function(){

		if(null!= self.RakOperativeDDCheque.selectedOprAcct && ""!=self.RakOperativeDDCheque.selectedOprAcct){
		self.RakOperativeDDCheque.selectedOprAcctCn=self.RakOperativeDDCheque.OprAcctList[self.RakOperativeDDCheque.selectedOprAcct].accountId;
		}
		if(null!= self.RakOperativeDDCheque.selectedBnf && ""!=self.RakOperativeDDCheque.selectedBnf){
		self.RakOperativeDDCheque.selectedBnfNameCn=self.RakOperativeDDCheque.txnbenfTypeNewArr[self.RakOperativeDDCheque.selectedBnf].beneficiaryName;
		self.RakOperativeDDCheque.bnfBankNameCn=self.RakOperativeDDCheque.txnbenfTypeNewArr[self.RakOperativeDDCheque.selectedBnf].beneficiaryBankName;
		self.RakOperativeDDCheque.bnfCountryNameCn=self.RakOperativeDDCheque.txnbenfTypeNewArr[self.RakOperativeDDCheque.selectedBnf].bnfBankCountryDesc;
		self.RakOperativeDDCheque.bnfAccCurrencyCn=self.RakOperativeDDCheque.txnbenfTypeNewArr[self.RakOperativeDDCheque.selectedBnf].beneficiaryAccountCurrency;
		self.RakOperativeDDCheque.selectedBnfToServer=self.RakOperativeDDCheque.txnbenfTypeNewArr[self.RakOperativeDDCheque.selectedBnf].beneficiaryIndex;
		}
		if(null!= self.RakOperativeDDCheque.selectedPurpose && ""!=self.RakOperativeDDCheque.selectedPurpose){
		self.RakOperativeDDCheque.selectedPurposeCn=self.RakOperativeDDCheque.purposeList[self.RakOperativeDDCheque.selectedPurpose].purDesc;
		}
		if(null!= self.RakOperativeDDCheque.selectedBranch && ""!=self.RakOperativeDDCheque.selectedBranch){
		self.RakOperativeDDCheque.benfTypeCn=self.RakOperativeDDCheque.branchList[self.RakOperativeDDCheque.selectedBranch].branchDesc;
		}
		self.RakOperativeDDCheque.authorizeNameCn=self.RakOperativeDDCheque.name;
		self.RakOperativeDDCheque.contactCn=self.RakOperativeDDCheque.contact;
		self.RakOperativeDDCheque.idNumberCn=self.RakOperativeDDCheque.idNumber;

		if(null!= self.RakOperativeDDCheque.selectedCorrsBank && ""!=self.RakOperativeDDCheque.selectedCorrsBank){
			self.RakOperativeDDCheque.selectedCorrsBankCn=self.RakOperativeDDCheque.correspondingBankList[self.RakOperativeDDCheque.selectedCorrsBank].bankDesc;
			}
			else{
				self.RakOperativeDDCheque.selectedCorrsBank="";
			}
		if (null!=self.RakOperativeDDCheque.selectedCity && ""!= self.RakOperativeDDCheque.selectedCity){
		self.RakOperativeDDCheque.selectedCityCn=self.RakOperativeDDCheque.cityList[self.RakOperativeDDCheque.selectedCity].cityDesc;
		}
		else{
			self.RakOperativeDDCheque.selectedCity="";
		}
		if(null != self.RakOperativeDDCheque.selectedValidId && ("" != self.RakOperativeDDCheque.selectedValidId)){
		self.RakOperativeDDCheque.selectedValidIdCn=self.RakOperativeDDCheque.validIdList[self.RakOperativeDDCheque.selectedValidId].validDesc;
		}
		else {
			self.RakOperativeDDCheque.selectedValidIdCn="";
		}

		// Added By  For Emirate Desc

		for (var x = 0; x < self.RakOperativeDDCheque.emirateList.length; x++) {
			if (self.RakOperativeDDCheque.emirateList[x].code == self.RakOperativeDDCheque.emirateSeletected) {
				self.RakOperativeDDCheque.emiSelDesc = self.RakOperativeDDCheque.emirateList[x].codeDesc;
			}
		}

		/*Added by Kamesh for intoducting courier delivery option: START*/
		if(self.RakOperativeDDCheque.isDelModeBranchVisible==false){
			self.RakOperativeDDCheque.selectedDelMode="Courier to Registered address";
		}else{
			self.RakOperativeDDCheque.selectedDelMode="";
			self.RakOperativeDDCheque.registeredAddress="";
		}
		/*Added by Kamesh for intoducting courier delivery option: END*/

	};

	self.resetRAKOprDDData= function(){


		self.RakOperativeDDCheque.selectedOprAcct='';
		self.RakOperativeDDCheque.selectedReq='';
		self.RakOperativeDDCheque.selectedBnf='';
		self.RakOperativeDDCheque.selectedPurpose='';
		self.RakOperativeDDCheque.benfType='';
		self.RakOperativeDDCheque.authorize='';
		self.RakOperativeDDCheque.contact='';
		self.RakOperativeDDCheque.selectedValidId='';
		self.RakOperativeDDCheque.idNumber='';
		self.RakOperativeDDCheque.selectedCorrsBank='';
		self.RakOperativeDDCheque.selectedCity='';
		self.RakOperativeDDCheque.benfddcrnList='';
		self.RakOperativeDDCheque.authorize='';
		self.RakOperativeDDCheque.name='';
		self.RakOperativeDDCheque.amount='';
		self.RakOperativeDDCheque.selectedCity='';
		self.GenericAuthorizationVariable.transactionPassword='';
		self.RakOperativeDDCheque.selectedPurpose='';
		self.RakOperativeDDCheque.selectedBranch='';
		self.RakOperativeDDCheque.emirateList= "";
		self.RakOperativeDDCheque.emiBranchList= "";
		self.RakOperativeDDCheque.emirateSeletected= "";
		self.RakOperativeDDCheque.emiCategorizedBranchList= "";
		self.RakOperativeDDCheque.isEmiSelected=false;
		self.RakOperativeDDCheque.emiSelDesc= "";
		self.RakOperativeDDCheque.exchangeRate="";
		self.RakOperativeDDCheque.fetchExFlag="";
		self.common.message='';
		self.RakOperativeDDCheque.selectedDelMode="";
		self.RakOperativeDDCheque.registeredAddress="";
		self.RakOperativeDDCheque.isDelModeBranchVisible=true;

	};
	self.fetchAccList=function(responsesList){


		//self.RakOperativeDDCheque.name="";
		//self.RakOperativeDDCheque.contact="";
		//self.RakOperativeDDCheque.selectedValidId="";
		//self.RakOperativeDDCheque.idNumber="";
		//self.RakOperativeDDCheque.authorize="";
		self.RakOperativeDDChequeisInitiatedMode=false;
		
		/*Added by Kamesh for Introducing Courier option: START*/
		if(self.branchDelOptHideSrList.includes('DMC') && self.hideBranchDelOpt=='Y'){
			self.RakOperativeDDCheque.isDelModeBranchVisible =false;
		}else{
			self.RakOperativeDDCheque.isDelModeBranchVisible =true;
		}
		/*Added by Kamesh for Introducing Courier option: END*/

		if(self.RakOperativeDDCheque.fetchExFlag == 'Y'){
		if(responsesList[0].hasOwnProperty('exchangeRate')){
			self.RakOperativeDDCheque.exchangeRate=responsesList[0].exchangeRate;
			self.RakOperativeDDCheque.fetchExFlag='N';
		}
		}
		if(!responsesList[0].hasOwnProperty('errorMessage')){
			if(responsesList[0].hasOwnProperty('OprAcctList')){
				self.RakOperativeDDCheque.OprAcctList = responsesList[0].OprAcctList;
			}
			if(responsesList[0].hasOwnProperty('DDRequestList')){
				self.RakOperativeDDCheque.requestList=responsesList[0].DDRequestList;
			}
			if(responsesList[0].hasOwnProperty('beneficiaryList')){
				self.RakOperativeDDCheque.beneficiaryList=responsesList[0].beneficiaryList;
			}
			if(responsesList[0].hasOwnProperty('purposeList')){
				self.RakOperativeDDCheque.purposeList=responsesList[0].purposeList;
			}
			if(responsesList[0].hasOwnProperty('branchList')){
				self.RakOperativeDDCheque.branchList=responsesList[0].branchList;
			}
			if(responsesList[0].hasOwnProperty('validIdList')){
				self.RakOperativeDDCheque.validIdList=responsesList[0].validIdList;
			}
		if(responsesList[0].hasOwnProperty('correspondingBankList'))
				self.RakOperativeDDCheque.correspondingBankList=responsesList[0].correspondingBankList;
			if(responsesList[0].hasOwnProperty('cityList'))
				self.RakOperativeDDCheque.cityList=responsesList[0].cityList;
			if(responsesList[0].hasOwnProperty('benfddcrnList'))
				self.RakOperativeDDCheque.benfddcrnList=responsesList[0].benfddcrnList;


			//ADDED BY 
			if (responsesList[0].hasOwnProperty('emirateList')) {
				self.RakOperativeDDCheque.emirateList = responsesList[0].emirateList;
			}

			if (responsesList[0].hasOwnProperty('emiBranchList')) {
				self.RakOperativeDDCheque.emiBranchList = responsesList[0].emiBranchList;
			}

			/*Added by Kamesh for introducing Courier option: START*/
			if(responsesList[0].hasOwnProperty('registeredAddress') && !(responsesList[0].registeredAddress == '' )){
           	 self.RakOperativeDDCheque.registeredAddress = responsesList[0].registeredAddress[0].address;
           }
			/*Added by Kamesh for introducing Courier option: END*/


		}
	};

	/**/

	//----------------------------------------------------------------------------------------------------------//


						/* RAK : Credit Card - Conversion to EMI : Start */
						self.CCConvertionEmi = {
								//initial screen

								creditCardList : [],
								creditCardNumber : "",
								creditIndex : "",
								tranStartDate : "",
								tranEndDate : "",

								merchantList : [],
								merchantDesc : "",
								merchantCode : "",
								merchantOthers : "",

								tenorList : [],
								tenorDesc : "",
								tenorCode : "",

								chargeTypeList : [],
								chargeTypeDesc : "",
								chargeTypeCode : "",

								//Fetch Screen
								txnSearchList : [],
								testArray : new Array(),

								clickedFlag : 'N',

								auth : "",
								transactionPassword : "",
								convertEMISuccessMessage : "",

								selectedData: "",

								flag : false,
								//CHNAGES FROM CREDIT ACCOUNT TO CONVERSION OF EMI START
								accountFlag : false,
								//CHNAGES FROM CREDIT ACCOUNT TO CONVERSION OF EMI END
								boolMerchant : false,
								isTxnListPresent : false,

								  //CHNAGES ADDING ONE MISSED UNDEFINED VARIABLE START
                                  tranDate:new Date(),
                                  //CHNAGES ADDING ONE MISSED UNDEFINED VARIABLE END


								resetCCConvertionEmi : function(){
									//initial screen

									self.CCConvertionEmi.creditCardList = [];
									self.CCConvertionEmi.creditCardNumber = "";
									self.CCConvertionEmi.creditIndex = "";
									self.CCConvertionEmi.tranStartDate = "";
									self.CCConvertionEmi.tranEndDate = "";

									self.CCConvertionEmi.merchantList = [];
									self.CCConvertionEmi.merchantDesc = "";
									self.CCConvertionEmi.merchantCode = "";

									self.CCConvertionEmi.merchantOthers = "";

									self.CCConvertionEmi.tenorList = [];
									self.CCConvertionEmi.tenorDesc = "";
									self.CCConvertionEmi.tenorCode = "";

									self.CCConvertionEmi.chargeTypeList = [];
									self.CCConvertionEmi.chargeTypeDesc = "";
									self.CCConvertionEmi.chargeTypeCode = "";

									//Fetch Screen
									self.CCConvertionEmi.testArray = new Array();
									self.CCConvertionEmi.txnSearchList = [];

									self.CCConvertionEmi.clickedFlag = 'N';

									self.CCConvertionEmi.auth="";
									self.CCConvertionEmi.transactionPassword="";
									self.CCConvertionEmi.convertEMISuccessMessage="";

									self.CCConvertionEmi.flag=false;

									self.CCConvertionEmi.selectedData = "";
									self.CCConvertionEmi.boolMerchant = false;

									self.CCConvertionEmi.isTxnListPresent=false;
									//CHNAGES FROM CREDIT ACCOUNT TO CONVERSION OF EMI START
									self.CCConvertionEmi.accountFlag=false;
									//CHNAGES FROM CREDIT ACCOUNT TO CONVERSION OF EMI END

									//CHANGES RESSTING ONE UNDEFINED VARIABLE START
									self.CCConvertionEmi.tranDate=new Date();
									//CHANGES RESSTING ONE UNDEFINED VARIABLE END
									self.common.message="";
								},

								//CHNAGES FROM CREDIT CARD TO CONVERSION OF EMI START
								getSendEvent:function(){
									    if(self.CCConvertionEmi.accountFlag)
											return 'onRakCreditCardAccountBack';
										else
											{
											return 'onCCConvertionEmiDetailsBackClick';
											self.CCConvertionEmi.accountFlag=false;
											}
									},

									clearingList:function(){
										self.CCConvertionEmi.txnSearchList = [];
										self.CCConvertionEmi.testArray= new Array();
									},
								//CHNAGES FROM CREDIT CARD TO CONVERSION OF EMI END

								preCCConvertionEmi:function(responseList){

									if (!responseList[0].hasOwnProperty('errorMessage')) {


									if(responseList[0].hasOwnProperty('creditCardList')){
											self.CCConvertionEmi.creditCardList = responseList[0].creditCardList;
										}


										if(responseList[0].hasOwnProperty('merchantList')){
											self.CCConvertionEmi.merchantList = responseList[0].merchantList;
										}

										if(responseList[0].hasOwnProperty('tenorList')){
											self.CCConvertionEmi.tenorList = responseList[0].tenorList;
										}

										if(responseList[0].hasOwnProperty('chargeTypeList')){
											self.CCConvertionEmi.chargeTypeList = responseList[0].chargeTypeList;
										}

										//CHANGES FROM CREDIT CARD TO CONVERSION TO EMI START
										if(responseList[0].hasOwnProperty('transactionDate')){
											self.CCConvertionEmi.tranDate = responseList[0].transactionDate;
											self.CCConvertionEmi.accountFlag=true;
										}

										if(responseList[0].hasOwnProperty('billingAmount')){
											self.CCConvertionEmi.txnAmountAEDBillShow = responseList[0].billingAmount;
											//Changed for Conversion
											self.CCConvertionEmi.txnAmountAEDBill=(self.CCConvertionEmi.txnAmountAEDBillShow).split(" ")[1];
										}

										if(responseList[0].hasOwnProperty('originalAmount')){
											self.CCConvertionEmi.txnAmountOriginalShow = responseList[0].originalAmount;
											self.CCConvertionEmi.txnAmountOriginal = (self.CCConvertionEmi.txnAmountOriginalShow).split(" ")[1];
										}
										if(responseList[0].hasOwnProperty('creditCardNum')){
											self.CCConvertionEmi.creditCardNumber = responseList[0].creditCardNum;
										}
											if(responseList[0].hasOwnProperty('txndesc')){
											self.CCConvertionEmi.tranDesc = responseList[0].txndesc;
										}
										//CHANGES FROM CREDIT CARD TO CONVERSION TO EMI END

										if(responseList[0].hasOwnProperty('txnSearchList')){
											self.CCConvertionEmi.txnSearchList = responseList[0].txnSearchList;
											for (var k = 0 ; k<(self.CCConvertionEmi.txnSearchList).length; k++){
												(self.CCConvertionEmi.testArray).push({txnSearchDate:self.CCConvertionEmi.txnSearchList[k].txnSearchDate,
													txnOriginalAmount:self.CCConvertionEmi.txnSearchList[k].txnOriginalAmount,
													txnBillingAmount:self.CCConvertionEmi.txnSearchList[k].txnBillingAmount,
													txnTypeDesc:self.CCConvertionEmi.txnSearchList[k].txnTypeDesc,
													ind:self.CCConvertionEmi.txnSearchList[k].index
												});
												}
											if ((self.CCConvertionEmi.txnSearchList).length != 0){
													self.CCConvertionEmi.isTxnListPresent=true;
											}
											}
									}

									if(responseList[0].hasOwnProperty('NO_OF_DAYS_EMI')){
										self.CCConvertionEmi.NO_OF_DAYS_EMI = responseList[0].NO_OF_DAYS_EMI;
									}

										self.CCConvertionEmi.isBack = false;

						}
						};

						self.CCConvertionEmi.continueClick=function(){

						    self.CCConvertionEmi.tranStartMonth = ((self.CCConvertionEmi.tranStartDate).getMonth() + 1).toString();
							self.CCConvertionEmi.tranStartDay = (self.CCConvertionEmi.tranStartDate).getDate().toString();
							self.CCConvertionEmi.tranStartYear = (self.CCConvertionEmi.tranStartDate).getFullYear().toString();

						    self.CCConvertionEmi.tranEndMonth = ((self.CCConvertionEmi.tranEndDate).getMonth() + 1).toString();
							self.CCConvertionEmi.tranEndDay = (self.CCConvertionEmi.tranEndDate).getDate().toString();
							self.CCConvertionEmi.tranEndYear = (self.CCConvertionEmi.tranEndDate).getFullYear().toString();
						};


						self.CCConvertionEmi.RadioBoxClicked=function(){

							for(var i=0; i < (self.CCConvertionEmi.testArray).length; i++){

								if((self.CCConvertionEmi.selectedData) == self.CCConvertionEmi.testArray[i].ind)
								{
									self.CCConvertionEmi.tranDate = (self.CCConvertionEmi.testArray[i]).txnSearchDate;
									self.CCConvertionEmi.tranDesc = (self.CCConvertionEmi.testArray[i]).txnTypeDesc;
									self.CCConvertionEmi.txnAmountOriginal = ((self.CCConvertionEmi.testArray[i]).txnOriginalAmount).split(" ")[0];
									self.CCConvertionEmi.txnAmountOriginalShow = (self.CCConvertionEmi.testArray[i]).txnOriginalAmount;
									self.CCConvertionEmi.txnAmountAEDBill = ((self.CCConvertionEmi.testArray[i]).txnBillingAmount).split(" ")[0];
									self.CCConvertionEmi.txnAmountAEDBillShow = (self.CCConvertionEmi.testArray[i]).txnBillingAmount;
								}
							}

                          for(var i=0; i < (self.CCConvertionEmi.creditCardList).length; i++){

								if((self.CCConvertionEmi.creditIndex) == self.CCConvertionEmi.creditCardList[i].index)
								{
									self.CCConvertionEmi.creditCardNumber = (self.CCConvertionEmi.creditCardList[i]).creditCardNumber;
								}
							}

							scope.setEvent('onSelectForConvertionEmiDetails');


				

						};

						self.CCConvertionEmiShowValidateFields = function(){
							if (self.CCConvertionEmi.merchantCode == 'O'){
								self.CCConvertionEmi.boolMerchant = true;
							}
							else{
								self.CCConvertionEmi.boolMerchant = false;
							}
						};

						self.confirmCCConvertionEmi = function(responsesList) {
							if (!responsesList[0].hasOwnProperty('errorMessage')) {

								self.CCConvertionEmi.previewResponse = responsesList[0];
								self.CCConvertionEmi.auth = responsesList[0].auth;

								self.CCConvertionEmi.transactionPassword = "";

								self.common.message=responsesList[0].MESSAGE ? responsesList[0].MESSAGE :'';
							}
							self.CCConvertionEmi.transactionPassword = "";




							for(var i=0; i < (self.CCConvertionEmi.merchantList).length; i++){

								if((self.CCConvertionEmi.merchantCode) == self.CCConvertionEmi.merchantList[i].merchantCode)
								{
									self.CCConvertionEmi.merchantDesc = (self.CCConvertionEmi.merchantList[i]).merchantDesc;
								}
							}

							for(var i=0; i < (self.CCConvertionEmi.chargeTypeList).length; i++){

								if((self.CCConvertionEmi.chargeTypeCode) == self.CCConvertionEmi.chargeTypeList[i].chargeTypeCode)
								{
									self.CCConvertionEmi.chargeTypeDesc = (self.CCConvertionEmi.chargeTypeList[i]).chargeTypeDesc;
								}
							}

							for(var i=0; i < (self.CCConvertionEmi.tenorList).length; i++){

								if((self.CCConvertionEmi.tenorCode) == self.CCConvertionEmi.tenorList[i].tenorCode)
								{
									self.CCConvertionEmi.tenorDesc = (self.CCConvertionEmi.tenorList[i]).tenorDesc;
								}
							}

							if (self.CCConvertionEmi.merchantCode == 'O'){
								self.CCConvertionEmi.merchantOthersText = self.CCConvertionEmi.merchantOthers;
							}
							else
							{
							self.CCConvertionEmi.merchantOthersText = "";
							}

						};

						self.setMerchantText = function() {
							if (self.CCConvertionEmi.merchantCode == 'O'){
								self.CCConvertionEmi.merchantOthersText = self.CCConvertionEmi.merchantOthers;
							}
							else
							{
							self.CCConvertionEmi.merchantOthersText = "";
							}
						};



						self.successCCConvertionEmi = function(responsesList) {

							if (!responsesList[0].hasOwnProperty('errorMessage')){
							self.CCConvertionEmi.convertEMISuccessMessage = responsesList[0].convertEMISuccessMessage;
							}

						};


						/* RAK : Credit Card - Conversion to EMI : End */
	//----------------------------------------------------------------------------------------------------------//
	// ----------------------------------------------------------------------------------------------------------------
	//  - Added for Credit or Debit Card Pin Reissue : START
	self.RAKCCDCPinReissueModel = {
		CCDCPinReissueCardFetchEvent : "",
		CCorDCPinReissue : "",
		CardDropDownPlaceHolderText : "",
		CardConfirmPageText : "",
		CCDCCardList : [],
		selectedCCDCCard : "",
		onCCDCCardFinalSubmitEvent : "",
		enteredOTP : "",
		otpFromEB : "",
		enteredCVV : "",
		isOneCCorDCSelectedFromDropDown : false,
		dobFromCif : "",
		dateOfBirth : "",
		dob_year : "",
		dob_month : "",
		dob_day : "",
		txnPwdForInitPage : "",
		ReqId : "",
		HIFReqIdFetchOTP : "",
		EventIdFetchOTP : "",
		successMessage : "",
		authFlag : "N",
		authMode : "",
		authStatus : false,
		txnPwd : "",
		dateOfBirthDisp:"",
		//CHANGES DONE AS FIX OF PROUAT-3893 START
		newpin:"",
		status:"",
	    //CHANGES DONE AS FIX OF PROUAT-3893 END
	};
	self.setRAKCCDCPinReissueDate = function() {
		self.common.displayDate = self.RAKCCDCPinReissueModel.dateOfBirth;
		self.populateCurrentDateDetails();

		self.RAKCCDCPinReissueModel.dob_day =self.common.date;
		self.RAKCCDCPinReissueModel.dob_month=self.common.month;
		self.RAKCCDCPinReissueModel.dob_year=self.common.year;
    };
	self.resetRAKCCDCPinReissueDetails = function() {
		self.RAKCCDCPinReissueModel.CCDCPinReissueCardFetchEvent = "";
		self.RAKCCDCPinReissueModel.CCorDCPinReissue = "";
		self.RAKCCDCPinReissueModel.CardDropDownPlaceHolderText = "";
		self.RAKCCDCPinReissueModel.CardConfirmPageText = "";
		self.RAKCCDCPinReissueModel.CCDCCardList = [];
		self.RAKCCDCPinReissueModel.selectedCCDCCard = "";
		self.RAKCCDCPinReissueModel.onCCDCCardFinalSubmitEvent = "";
		self.RAKCCDCPinReissueModel.enteredOTP = "";
		self.RAKCCDCPinReissueModel.otpFromEB = "";
		self.RAKCCDCPinReissueModel.enteredCVV = "";
		self.RAKCCDCPinReissueModel.isOneCCorDCSelectedFromDropDown = false;
		self.RAKCCDCPinReissueModel.dobFromCif = "";
		self.RAKCCDCPinReissueModel.dateOfBirth = "";
		self.RAKCCDCPinReissueModel.dob_year = "";
		self.RAKCCDCPinReissueModel.dob_month = "";
		self.RAKCCDCPinReissueModel.dob_day = "";
		self.RAKCCDCPinReissueModel.txnPwdForInitPage = "";
		self.RAKCCDCPinReissueModel.ReqId = "";
		self.RAKCCDCPinReissueModel.HIFReqIdFetchOTP = "";
		self.RAKCCDCPinReissueModel.EventIdFetchOTP = "";
		self.RAKCCDCPinReissueModel.successMessage = "";
		self.RAKCCDCPinReissueModel.authFlag = "N";
		self.RAKCCDCPinReissueModel.authMode = "";
		self.RAKCCDCPinReissueModel.authStatus = false;
		self.RAKCCDCPinReissueModel.txnPwd = "";
		self.RAKCCDCPinReissueModel.dateOfBirthDisp = "";
		self.common.message='';
	};
	self.setModifyFormatedDate = function(unformattedDate) {
		var str = unformattedDate;
		var res = str.split("/");
		var formatDate = res[2] + ", " + res[1] + ", " + res[0];

		return formatDate;
	};
	self.detectCCDCPinReissueCardFetchEvent = function() {
		if (self.RAKCCDCPinReissueModel.CCorDCPinReissue == "CC_PINREISSUE") {
			self.RAKCCDCPinReissueModel.CCDCPinReissueCardFetchEvent = "onRakCCPinReissueCardsListFetchClick";
		}
		if (self.RAKCCDCPinReissueModel.CCorDCPinReissue == "DC_PINREISSUE") {
			self.RAKCCDCPinReissueModel.CCDCPinReissueCardFetchEvent = "onRakDCPinReissueCardsListFetchClick";
		}
	};
	self.setDataForCCorDC = function() {
		if (self.RAKCCDCPinReissueModel.CCorDCPinReissue == "CC_PINREISSUE") {
			self.RAKCCDCPinReissueModel.CardDropDownPlaceHolderText = rootScope.appLiterals.APP.RAK_CC_DC_PIN_REISSUE.CC_NUMBER_SEL;
			self.RAKCCDCPinReissueModel.CardConfirmPageText = rootScope.appLiterals.APP.RAK_CC_DC_PIN_REISSUE.CC_NUMBER;
			self.RAKCCDCPinReissueModel.ReqId = "CPR";
			self.RAKCCDCPinReissueModel.HIFReqIdFetchOTP = "RAK_CC_PINREISSUE_FETCHOTP";
			self.RAKCCDCPinReissueModel.EventIdFetchOTP = "FetchOTPCC";
			self.RAKCCDCPinReissueModel.onCCDCCardFinalSubmitEvent = "onRakCCPinReissueFinalSubmitClick";
		}
		if (self.RAKCCDCPinReissueModel.CCorDCPinReissue == "DC_PINREISSUE") {
			self.RAKCCDCPinReissueModel.CardDropDownPlaceHolderText = rootScope.appLiterals.APP.RAK_CC_DC_PIN_REISSUE.DC_NUMBER_SEL;
			self.RAKCCDCPinReissueModel.CardConfirmPageText = rootScope.appLiterals.APP.RAK_CC_DC_PIN_REISSUE.DC_NUMBER;
			self.RAKCCDCPinReissueModel.ReqId = "PRR";
			self.RAKCCDCPinReissueModel.HIFReqIdFetchOTP = "RAK_DC_PINREISSUE_FETCHOTP";
			self.RAKCCDCPinReissueModel.EventIdFetchOTP = "FetchOTPDC";
			self.RAKCCDCPinReissueModel.onCCDCCardFinalSubmitEvent = "onRakDCPinReissueFinalSubmitClick";
		}
	};
	self.fetchRAKCCDCPinReissueData = function(responsesList) {
		if (!responsesList[0].hasOwnProperty('errorMessage')) {
			if (responsesList[0].hasOwnProperty('CCDCCardList')) {
				self.RAKCCDCPinReissueModel.CCDCCardList = responsesList[0].CCDCCardList;
			}
			if (responsesList[0].hasOwnProperty('dobFromCif')) {
				self.RAKCCDCPinReissueModel.dobFromCif = responsesList[0].dobFromCif;
			}
			if (responsesList[0].hasOwnProperty('otpFromEB')) {
				self.RAKCCDCPinReissueModel.isOneCCorDCSelectedFromDropDown = true;
				self.RAKCCDCPinReissueModel.otpFromEB = responsesList[0].otpFromEB;
			}
		} else {
			/*self.RAKCCDCPinReissueModel.isOneCCorDCSelectedFromDropDown = false;
			self.RAKCCDCPinReissueModel.selectedCCDCCard = "";
			self.RAKCCDCPinReissueModel.enteredOTP= "";
			self.RAKCCDCPinReissueModel.enteredCVV= "";
			self.RAKCCDCPinReissueModel.dateOfBirth="";*/
		}
	};
	self.setDateWithFormat = function() {
		var today = new Date(self.RAKCCDCPinReissueModel.dateOfBirth);
		var dd = today.getDate();
		var mm = today.getMonth() + 1; //January is 0!

		var yyyy = today.getFullYear();
		if (dd < 10) {
			dd = '0' + dd;
		}
		if (mm < 10) {
			mm = '0' + mm;
		}

		var formatDate = mm + '/' + dd + '/' + yyyy;

		self.RAKCCDCPinReissueModel.dob_year = yyyy;
		self.RAKCCDCPinReissueModel.dob_month = mm;
		self.RAKCCDCPinReissueModel.dob_day = dd;

		self.RAKCCDCPinReissueModel.dateOfBirth = formatDate;
	};
	self.confirmRAKCCDCPinReissue = function(responsesList) {
		if (!responsesList[0].hasOwnProperty('errorMessage')) {
			if (responsesList[0].hasOwnProperty('authFlag')) {
				self.RAKCCDCPinReissueModel.authFlag = responsesList[0].authFlag;

				if (self.RAKCCDCPinReissueModel.authFlag == "Y") {
					if (responsesList[0].auth == "")
						self.RAKCCDCPinReissueModel.authStatus = false;
					else {
						self.RAKCCDCPinReissueModel.authStatus = true;
						self.RAKCCDCPinReissueModel.authMode = responsesList[0].auth;
					}
				}
			}

			self.RAKCCDCPinReissueModel.dateOfBirthDisp = responsesList[0].dob;

			self.common.message=responsesList[0].MESSAGE ? responsesList[0].MESSAGE :'';
		}
	};
	self.initRAKCCDCPinReissueSuccess = function(responsesList) {
		if (!responsesList[0].hasOwnProperty('errorMessage'))
			{
			//CHANGES DONE AS FIX OF PROUAT-3893 START
			self.RAKCCDCPinReissueModel.successMessage = responsesList[0].successMsg;
			self.RAKCCDCPinReissueModel.newpin = responsesList[0].NewPin;
			self.RAKCCDCPinReissueModel.status = responsesList[0].status;
		     //CHANGES DONE AS FIX OF PROUAT-3893 END
			}
	};
	// - Added for Credit or Debit Card Pin Reissue : END
	//----------------------------------------------------------------------------------------------------------------


	/*RAK  INVESTMENT OPEN ACCOUNT START*/
	self.RakInvOpenAccSRConstants={/*-UIchanges*/
			AEDCURRENCY:'AED',
			USDCURRENCY:'USD',

	},
	self.RakInvOpenAccSR={
			accList:[],
			selectedAcc:"",
			toDate:"",
			invAmtNum:"",
			invAmtCurr:"",/*-UIchanges*/
			invAmt:"",
			invAmtFormat:"",
			excRate:"",
			isExcRate:false,
			debAmt:"",
			isDebRate:false,
			kyc1:"",
			kyc2:"",
			kyc3:"",
			kyc4:"",
			kyc5:"",
			mcq1:"",
			mcq2:"",
			mcq3:"",
			mcq8:"",
			mcq5:"",
			mcq6:"",
			mcq7:"",
			mcq9:"",
			txnSel:"",
			isTCMandatory:false,
			authStatus:true,
			authMode :"",
			txnPwd:"",
			acceptTermsCheck:'N',
			successMessage:"",

			rakInvOpenAccSRContinue:function()
			{

				self.RakInvOpenAccSR.kyc1=self.RakInvOpenAccSR.kyc1.toString();
				self.RakInvOpenAccSR.kyc2=self.RakInvOpenAccSR.kyc2.toString();
				self.RakInvOpenAccSR.kyc3=self.RakInvOpenAccSR.kyc3.toString();
				self.RakInvOpenAccSR.kyc4=self.RakInvOpenAccSR.kyc4.toString();
				self.RakInvOpenAccSR.kyc5=self.RakInvOpenAccSR.kyc5.toString();




			},
			resetRakInvOpenAccSRHome:function()
			{
				self.RakInvOpenAccSR.accList=[];
				self.RakInvOpenAccSR.selectedAcc="";
				self.RakInvOpenAccSR.toDate="";
				self.RakInvOpenAccSR.invAmt="";
				self.RakInvOpenAccSR.invAmtNum="";
				self.RakInvOpenAccSR.invAmtCurr="";/*-UIchanges*/
				self.RakInvOpenAccSR.invAmtFormat="";
				self.RakInvOpenAccSR.excRate="";
				self.RakInvOpenAccSR.isExcRate=false;
				self.RakInvOpenAccSR.debAmt="";
				self.RakInvOpenAccSR.isDebRate=false;
				self.RakInvOpenAccSR.kyc1="";
				self.RakInvOpenAccSR.kyc2="";
				self.RakInvOpenAccSR.kyc3="";
				self.RakInvOpenAccSR.kyc4="";
				self.RakInvOpenAccSR.kyc5="";
				self.RakInvOpenAccSR.mcq1="";
				self.RakInvOpenAccSR.mcq2="";
				self.RakInvOpenAccSR.mcq3="";
				self.RakInvOpenAccSR.mcq8="";
				self.RakInvOpenAccSR.mcq5="";
				self.RakInvOpenAccSR.mcq6="";
				self.RakInvOpenAccSR.mcq7="";
				self.RakInvOpenAccSR.mcq9="";
				self.RakInvOpenAccSR.txnSel="";
				self.RakInvOpenAccSR.authStatus=true;
				self.RakInvOpenAccSR.authMode ="";
				self.RakInvOpenAccSR.txnPwd="";
				self.RakInvOpenAccSR.acceptTermsCheck='N';
				self.RakInvOpenAccSR.successMessage="";
				self.common.message="";

			},
			resetRakInvOpenAccSRConfirm:function()
			{
				self.RakInvOpenAccSR.invAmtFormat="";
				self.RakInvOpenAccSR.txnSel="";
				self.RakInvOpenAccSR.authStatus=true;
				self.RakInvOpenAccSR.authMode ="";
				self.RakInvOpenAccSR.txnPwd="";
				self.RakInvOpenAccSR.successMessage="";

			},
			resetRakInvOpenAccSRExcRate:function()
			{
				self.RakInvOpenAccSR.excRate="";
				self.RakInvOpenAccSR.isExcRate=false;
				self.RakInvOpenAccSR.debAmt="";
				self.RakInvOpenAccSR.isDebRate=false;

			},
			resetRakInvOpenAccSRMCQ:function()
			{
				if (self.RakInvOpenAccSR.acceptTermsCheck=='Y')
			{
				self.RakInvOpenAccSR.isTCMandatory=true;
			}
			else
				{
				self.RakInvOpenAccSR.isTCMandatory=false;
				}

				self.RakInvOpenAccSR.kyc1="";
				self.RakInvOpenAccSR.kyc2="";
				self.RakInvOpenAccSR.kyc3="";
				self.RakInvOpenAccSR.kyc4="";
				self.RakInvOpenAccSR.kyc5="";
				self.RakInvOpenAccSR.mcq1="";
				self.RakInvOpenAccSR.mcq2="";
				self.RakInvOpenAccSR.mcq3="";
				self.RakInvOpenAccSR.mcq8="";
				self.RakInvOpenAccSR.mcq5="";
				self.RakInvOpenAccSR.mcq6="";
				self.RakInvOpenAccSR.mcq7="";
				self.RakInvOpenAccSR.mcq9="";
				self.RakInvOpenAccSR.txnSel="";
				self.RakInvOpenAccSR.authStatus=true;
				self.RakInvOpenAccSR.authMode ="";
				self.RakInvOpenAccSR.txnPwd="";

				self.RakInvOpenAccSR.successMessage="";

			}

	};

	self.rakInvOpenAccSRInit=function(responselist){
		if (!responselist[0].hasOwnProperty('errorMessage'))
		{
			if (responselist[0].hasOwnProperty('accList'))
			{
				self.RakInvOpenAccSR.accList=responselist[0].accList;
			}
			if (responselist[0].hasOwnProperty('excRate'))
			{
				self.RakInvOpenAccSR.excRate=responselist[0].excRate;
				self.RakInvOpenAccSR.isExcRate=true;

			}
			if (responselist[0].hasOwnProperty('debAmt'))
			{
				self.RakInvOpenAccSR.debAmt=responselist[0].debAmt;
				self.RakInvOpenAccSR.isDebRate=true;

			}
		}
	};

	self.rakInvOpenAccSRContinue=function()
	{
		self.RakInvOpenAccSR.invAmt=self.RakInvOpenAccSR.invAmtNum.toString();
		
	};
	
	
	self.rakInvSetEvent=function()
	{
		if(self.RakInvOpenAccSR.acceptTermsCheck=='N'){
			rootScope.showErrorPopup(rootScope.appLiterals.APP.RAK_SERVICES.RAK_INV_OPEN.TERMS_COND_ERROR);
		}
		else{
			self.RakInvOpenAccSR.invAmt=self.RakInvOpenAccSR.invAmtNum.toString();
			scope.setEvent('onRAKInvOpenContClick');
			
		}
	};
	self.rakInvOpenAccSRConfirm=function(responsesList){



		if (!responsesList[0].hasOwnProperty('errorMessage'))
		{
			self.common.message=responsesList[0].MESSAGE ? responsesList[0].MESSAGE :'';
			
			if(responsesList[0].auth == "")
				self.RakInvOpenAccSR.authStatus=false;
			else 
			{
				self.RakInvOpenAccSR.authStatus=true;
				self.RakInvOpenAccSR.authMode = responsesList[0].auth;
			}

			if (responsesList[0].hasOwnProperty('invAmtFormat'))
			{
				self.RakInvOpenAccSR.invAmtFormat=responsesList[0].invAmtFormat;

			}

		}


	};


	self.rakInvOpenAccSRSuccess=function(responselist){

		if (!responselist[0].hasOwnProperty('errorMessage'))
		{
			self.RakInvOpenAccSR.successMessage=responselist[0].successRequest;
		}


	};
	/*RAK  INVESTMENT OPEN ACCOUNT END*/
	// ----------------------------------------------------------------------------------------------------------------
	//  - Added for Credit Cards Cash Back Redemption Request : START
	self.RakCCCashBkRedemModel = {
		CreditCardList : [],
		selectedCreditCard : "",
		isCCDetailsFetched : false,
		cardType:"",
		cashBackAvailableAmt : "",
		showCashBackAvailable : false,
		userEnteredRedeemAmount : "",
		redeemAmtForValidation : "",
		redeemAmtDisplay:'',
		showRedeemAmount : false,
		minRedeemAmt : "",
		maxRedeemAmt : "",
		successMessage : "",
		authFlag : "N",
		authMode : "",
		authStatus : false,
		txnPwd : ""
	};
	self.resetRAKCCCashBkRedemDetails = function() {
		self.RakCCCashBkRedemModel.CreditCardList = [];
		self.RakCCCashBkRedemModel.selectedCreditCard = "";
		self.RakCCCashBkRedemModel.isCCDetailsFetched = false;
		self.RakCCCashBkRedemModel.cardType = "";
		self.RakCCCashBkRedemModel.cashBackAvailableAmt = "";
		self.RakCCCashBkRedemModel.showCashBackAvailable = false;
		self.RakCCCashBkRedemModel.userEnteredRedeemAmount = "";
		self.RakCCCashBkRedemModel.redeemAmtForValidation = "";
		self.RakCCCashBkRedemModel.showRedeemAmount = false;
		self.RakCCCashBkRedemModel.minRedeemAmt = "";
		self.RakCCCashBkRedemModel.maxRedeemAmt = "";
		self.RakCCCashBkRedemModel.successMessage = "";
		self.RakCCCashBkRedemModel.authFlag = "N";
		self.RakCCCashBkRedemModel.authMode = "";
		self.RakCCCashBkRedemModel.authStatus = false;
		self.RakCCCashBkRedemModel.txnPwd = "";
		self.common.message="";
		self.RakCCCashBkRedemModel.redeemAmtDisplay='';
	};
	self.fetchRAKCCCashBkRedemData = function(responsesList) {
		if (!responsesList[0].hasOwnProperty('errorMessage')) {
			if (responsesList[0].hasOwnProperty('CreditCardList')) {
				self.RakCCCashBkRedemModel.CreditCardList = responsesList[0].CreditCardList;
			}
			if (responsesList[0].hasOwnProperty('MinRedeemAmt')) {
				self.RakCCCashBkRedemModel.minRedeemAmt = responsesList[0].MinRedeemAmt;
			}
			if (responsesList[0].hasOwnProperty('MaxRedeemAmt')) {
				self.RakCCCashBkRedemModel.maxRedeemAmt = responsesList[0].MaxRedeemAmt;
			}
			if (responsesList[0].hasOwnProperty('cardType')) {
				self.RakCCCashBkRedemModel.cardType = responsesList[0].cardType;
			}
			if (responsesList[0].hasOwnProperty('cashBackAvailableAmt')) {
				self.RakCCCashBkRedemModel.cashBackAvailableAmt = responsesList[0].cashBackAvailableAmt;
				self.showRakCCBCashBackAndRedeemAmt();
			}
		}
	};
	self.setRakCCBCashBackAvlAmt = function() {
		self.RakCCCashBkRedemModel.cashBackAvailableAmt = self.RakCCCashBkRedemModel.CreditCardList[self.RakCCCashBkRedemModel.selectedCreditCard].cashBackAvailable;
	};
	self.showRakCCBCashBackAndRedeemAmt = function() {
		if (self.RakCCCashBkRedemModel.cashBackAvailableAmt != "") {
			self.RakCCCashBkRedemModel.showCashBackAvailable = true;
			self.RakCCCashBkRedemModel.showRedeemAmount = true;
			self.RakCCCashBkRedemModel.isCCDetailsFetched = true;
		} else {
			self.RakCCCashBkRedemModel.showCashBackAvailable = false;
			self.RakCCCashBkRedemModel.showRedeemAmount = false;
			self.RakCCCashBkRedemModel.isCCDetailsFetched = false;
			rootScope
					.showErrorPopup(rootScope.appLiterals.APP.RAKCCCASHBKREDEM.CCB_CASH_BACK_NOT_AVL_TXT);
		}
	};
	self.confirmRakCCCashBkRedem = function(responsesList) {
		if (!responsesList[0].hasOwnProperty('errorMessage')) {
			self.common.message=responsesList[0].MESSAGE ? responsesList[0].MESSAGE :'';
			if (responsesList[0].hasOwnProperty('authFlag')) {
				self.RakCCCashBkRedemModel.authFlag = responsesList[0].authFlag;
                                self.RakCCCashBkRedemModel.redeemAmtDisplay=responsesList[0].redeemAmt;
				if (self.RakCCCashBkRedemModel.authFlag == "Y") {
					if (responsesList[0].auth == "")
						self.RakCCCashBkRedemModel.authStatus = false;
					else {
						self.RakCCCashBkRedemModel.authStatus = true;
						self.RakCCCashBkRedemModel.authMode = responsesList[0].auth;
					}
				}
			}
		}
	};
	self.initRakCCCashBkRedemSuccess = function(responsesList) {
		if (!responsesList[0].hasOwnProperty('errorMessage'))
			self.RakCCCashBkRedemModel.successMessage = responsesList[0].successMsg;
	};
	self.validateRakCCCashBkRedemMinMaxRedeemAmt = function() {
		if (!(self.RakCCCashBkRedemModel.userEnteredRedeemAmount != ""
				&& (self.RakCCCashBkRedemModel.userEnteredRedeemAmount >= self.RakCCCashBkRedemModel.minRedeemAmt) && (self.RakCCCashBkRedemModel.userEnteredRedeemAmount <= self.RakCCCashBkRedemModel.maxRedeemAmt))) {
			self.RakCCCashBkRedemModel.userEnteredRedeemAmount = "";
			rootScope.showErrorPopup("Redeem Amount must be between "
					+ self.RakCCCashBkRedemModel.minRedeemAmt + " and "
					+ self.RakCCCashBkRedemModel.maxRedeemAmt);
		}
	};
	//  - Added for Credit Cards Cash Back Redemption Request : END
	// ----------------------------------------------------------------------------------------------------------------
	//----------------------------------------------------------------------------------------------------------//
						/* RAK : Operative Account - Stop Cheque Request : Start */

						self.stopChequeReq = {

								operativeAccountList : [],
								oprAccountDesc : "",
								operativeIndex : "",

								isModeSet : "",

								singleChequeNum : "",
								fromChequeNum : "",
								toChequeNum : "",

								stopReasonList : [],
								stopReasonDesc : "",
								reasonPrefix : "",

								isTnCAccepted : "",

								boolSingle : true,
								boolMultiple : true,

								boolTnC : true,

								tranStartDate : new Date(),
								tranEndDate : new Date(),
								isTxnListPresent : false,

								auth : "",
								transactionPassword : "",
								stopChequeReqSuccessMessage : "",


								resetstopChequeReq : function(){

									self.stopChequeReq.operativeAccountList = [];
									self.stopChequeReq.oprAccountDesc = "";
									self.stopChequeReq.operativeIndex = "";

									self.stopChequeReq.tranStartDate = new Date();
									self.stopChequeReq.tranEndDate = new Date();

									self.stopChequeReq.isModeSet = "";

									self.stopChequeReq.singleChequeNum = "";
									self.stopChequeReq.fromChequeNum = "";
									self.stopChequeReq.toChequeNum = "";

									self.stopChequeReq.stopReasonList = [];
									self.stopChequeReq.stopReasonDesc = "";
									self.stopChequeReq.reasonPrefix = "";

									self.stopChequeReq.isTnCAccepted = "";

									self.stopChequeReq.boolSingle = true;
									self.stopChequeReq.boolMultiple = true;

									self.stopChequeReq.boolTnC = true;


									self.stopChequeReq.isTxnListPresent = false;

									self.stopChequeReq.auth="";
									self.stopChequeReq.transactionPassword="";
									self.stopChequeReq.stopChequeReqSuccessMessage="";
									self.common.message='';

								},


								initstopChequeReq : function(responseList){

									if (!responseList[0].hasOwnProperty('errorMessage')) {


									if(responseList[0].hasOwnProperty('operativeAccountList')){
											self.stopChequeReq.operativeAccountList = responseList[0].operativeAccountList;
										}

									if(responseList[0].hasOwnProperty('chqBookSearchList')){
										self.stopChequeReq.testArray = new Array();
										self.stopChequeReq.chqBookSearchList = responseList[0].chqBookSearchList;
										for (var k = 0 ; k<(self.stopChequeReq.chqBookSearchList).length; k++){
											(self.stopChequeReq.testArray).push({chqBookNum:self.stopChequeReq.chqBookSearchList[k].chqBookNum,
													chqBookNoOfLeaves:self.stopChequeReq.chqBookSearchList[k].chqBookNoOfLeaves,
													chqBookIssueDate:(self.stopChequeReq.chqBookSearchList[k].chqBookIssueDate).split(" ")[0],
															ind:self.stopChequeReq.chqBookSearchList[k].index
											});
											}
										if ((self.stopChequeReq.chqBookSearchList).length != 0){
												self.stopChequeReq.isTxnListPresent=true;
										}
										}



									}

										self.stopChequeReq.isBack = false;
								},



								statusstopChequeReq : function(responseList){

									if (!responseList[0].hasOwnProperty('errorMessage')) {


										if(responseList[0].hasOwnProperty('chqBookStatusList')){
											self.stopChequeReq.testArrayStatus = new Array();
											self.stopChequeReq.chqBookStatusList = responseList[0].chqBookStatusList;

											for (var k = 0 ; k<(self.stopChequeReq.chqBookStatusList).length; k++){
												(self.stopChequeReq.testArrayStatus).push({chqNums:self.stopChequeReq.chqBookStatusList[k].chqNumbers,
													chqStatus:self.stopChequeReq.chqBookStatusList[k].status,
													flag:false,
																ind:self.stopChequeReq.chqBookStatusList[k].index
												});
												}

											}



										}

											self.stopChequeReq.isBack = false;
								}

						};



						self.stopChequeReq.continueClick=function(){



							self.stopChequeReq.tranStartMonth = ((self.stopChequeReq.tranStartDate).getMonth() + 1).toString();
							self.stopChequeReq.tranStartDay = (self.stopChequeReq.tranStartDate).getDate().toString();
							self.stopChequeReq.tranStartYear = (self.stopChequeReq.tranStartDate).getFullYear().toString();



							self.stopChequeReq.tranEndMonth = ((self.stopChequeReq.tranEndDate).getMonth() + 1).toString();
							self.stopChequeReq.tranEndDay = (self.stopChequeReq.tranEndDate).getDate().toString();
							self.stopChequeReq.tranEndYear = (self.stopChequeReq.tranEndDate).getFullYear().toString();


						};


						self.stopChequeReq.continueClickAfterClick=function(){

							for (var t=0; t<self.stopChequeReq.testArray.length; t++){
								if (self.stopChequeReq.testArray[t].chqBookNum == self.stopChequeReq.selectedChqBook)
									{
									self.stopChequeReq.noOfLeaves = (self.stopChequeReq.testArray[t].chqBookNoOfLeaves).toString();
									}
							}
							self.stopChequeReq.selChqBkSent = self.stopChequeReq.selectedChqBook + "|" +
																	self.stopChequeReq.noOfLeaves ;

							self.stopChequeReq.selChqBk = (self.stopChequeReq.selectedChqBook).toString();
							/* to be sent - start*/

							self.stopChequeReq.firstChequeOfChqBook = (self.stopChequeReq.selectedChqBook).toString();

							/* to be sent - end*/

						scope.setEvent('onSelectedChqBookClick');
					};



						self.stopChequeReq.statusContinueClick=function(){

						//self.investmentSubscription.productsSend = "";
						self.stopChequeReq.testFlag = "";
						self.stopChequeReq.testArrayShow = new Array();
						for(var j=0; j<self.stopChequeReq.testArrayStatus.length; j++){
							if (self.stopChequeReq.testArrayStatus[j].flag == true){
								self.stopChequeReq.testFlag = 'Y';

							}
						}


						if(self.stopChequeReq.testFlag == 'Y')
						{
							self.stopChequeReq.chequeStatusValiditytruth = 'No';
							self.stopChequeReq.chequeStatusValidityfalse = 'No';
							for(var j=0; j<self.stopChequeReq.testArrayStatus.length; j++)
							{
								if(self.stopChequeReq.testArrayStatus[j].flag == true){

								if( ((self.stopChequeReq.testArrayStatus[j].chqStatus).toUpperCase() == "UNUSED") ||
									((self.stopChequeReq.testArrayStatus[j].chqStatus).toUpperCase() == "REJECTED"))
								{

									self.stopChequeReq.chequeStatusValiditytruth = 'Yes';
								}
								else{
									self.stopChequeReq.chequeStatusValidityfalse = 'Yes';
								}
								}

							}
						}
					else
						{
						rootScope.showErrorPopup('Select Atleast One to Proceed');

						}


						if(self.stopChequeReq.chequeStatusValiditytruth == 'Yes' && self.stopChequeReq.chequeStatusValidityfalse != 'Yes')
							{
						//serialNo = 0;
						for(var j=0; j<self.stopChequeReq.testArrayStatus.length; j++)
							{

								if(self.stopChequeReq.testArrayStatus[j].flag == true){

									//serialNo = serialNo + 1;

									self.stopChequeReq.testArrayShow.push
									({chqNumShow:self.stopChequeReq.testArrayStatus[j].chqNums,
										StatusShow:self.stopChequeReq.testArrayStatus[j].chqStatus
											});
									}

								}
						// to be sent - start
						if(self.stopChequeReq.testArrayShow.length > 1){
							var w = self.stopChequeReq.testArrayShow.length;
							self.stopChequeReq.firstChequeSent = (self.stopChequeReq.testArrayShow[0].chqNumShow).toString();
							self.stopChequeReq.lastChequeSent = (self.stopChequeReq.testArrayShow[w-1].chqNumShow).toString();
						}
						// to be sent - end
						if(self.stopChequeReq.testArrayShow.length == 1){
							self.stopChequeReq.chqNumsSend = (self.stopChequeReq.testArrayShow[0].chqNumShow).toString();
							self.stopChequeReq.firstChequeSent = self.stopChequeReq.chqNumsSend;
							self.stopChequeReq.lastChequeSent = self.stopChequeReq.chqNumsSend;
							}
						else
							{
							self.stopChequeReq.chqNumsSend = self.stopChequeReq.testArrayShow[0].chqNumShow;

						for(var s=1; s<self.stopChequeReq.testArrayShow.length; s++)
							{
							self.stopChequeReq.chqNumsSend = self.stopChequeReq.chqNumsSend + "," + self.stopChequeReq.testArrayShow[s].chqNumShow;

							}

							}
						scope.setEvent('onSelectForConfirmChqStatus');
							}

						else
							{
							rootScope.showErrorPopup('Select Unused or Rejected to Proceed');
							}



				};



						self.confirmstopChequeReq = function(responsesList) {
							if (!responsesList[0].hasOwnProperty('errorMessage')) {

								self.stopChequeReq.previewResponse = responsesList[0];
								self.stopChequeReq.auth = responsesList[0].auth;

								self.stopChequeReq.transactionPassword = "";
								self.common.message=responsesList[0].MESSAGE ? responsesList[0].MESSAGE :'';
							}
							self.stopChequeReq.transactionPassword = "";


							for(var i=0; i < (self.stopChequeReq.operativeAccountList).length; i++){

								if((self.stopChequeReq.operativeIndex) == self.stopChequeReq.operativeAccountList[i].index)
								{
									self.stopChequeReq.oprAccountDesc = (self.stopChequeReq.operativeAccountList[i]).oprAccountDesc;
								}
							}


						};


						self.successstopChequeReq = function(responsesList) {

							if (!responsesList[0].hasOwnProperty('errorMessage')){
							self.stopChequeReq.stopChequeReqSuccessMessage = responsesList[0].stopChequeReqSuccessMessage;
							}

						};


						/* RAK : Operative Account - Stop Cheque Request : End */

//--------------------------------------------------------------------------------------------------------------

	/*RAK  CC PIN SET START*/

	self.RakCCPinSetSR = {
		accList : [],
		selectedAcc : "",
		pin : "",
		numPin : "",
		confirmedPin : "",
		numConfirmPin : "",
		isPinMatch : false,
		authStatus : true,
		authMode : "",
		txnPwd : "",

		successMessage : "",

		rakCCPinSetSRContinue : function() {

			if (parseFloat(self.RakCCPinSetSR.numPin) == parseFloat(self.RakCCPinSetSR.numConfirmPin)) {
				self.RakCCPinSetSR.isPinMatch = true;

			} else {
				self.RakCCPinSetSR.isPinMatch = false;
			}
			self.RakCCPinSetSR.pin = self.RakCCPinSetSR.numPin.toString();
			self.RakCCPinSetSR.confirmedPin = self.RakCCPinSetSR.numConfirmPin
					.toString();

		},
		resetRakCCPinSetSRHome : function() {
			self.RakCCPinSetSR.accList = [];
			self.RakCCPinSetSR.selectedAcc = "";
			self.RakCCPinSetSR.pin = "";
			self.RakCCPinSetSR.numPin = "";
			self.RakCCPinSetSR.confirmedPin = "";
			self.RakCCPinSetSR.numConfirmPin = "";
			self.RakCCPinSetSR.isPinMatch = false;
			self.RakCCPinSetSR.authStatus = true;
			self.RakCCPinSetSR.authMode = "";
			self.RakCCPinSetSR.txnPwd = "";
			self.RakCCPinSetSR.successMessage = "";
			self.common.message="";
		},
		resetRakCCPinSetSRConfirm : function() {

			self.RakCCPinSetSR.authStatus = true;
			self.RakCCPinSetSR.authMode = "";
			self.RakCCPinSetSR.txnPwd = "";
			self.RakCCPinSetSR.successMessage = "";
			self.common.message="";
		}

	};

	self.rakCCPinSetSRInit = function(responselist) {
		if (!responselist[0].hasOwnProperty('errorMessage')) {
			if (responselist[0].hasOwnProperty('creditCardList')) {
				self.RakCCPinSetSR.accList = responselist[0].creditCardList;
			}

		}
	};

	self.rakCCPinSetSRConfirm = function(responsesList) {

		if (!responsesList[0].hasOwnProperty('errorMessage')) {
			
			self.common.message=responsesList[0].MESSAGE ? responsesList[0].MESSAGE :'';
			
			if (responsesList[0].auth == "")
				self.RakCCPinSetSR.authStatus = false;
			else  {
				self.RakCCPinSetSR.authStatus = true;
				self.RakCCPinSetSR.authMode = responsesList[0].auth;
			}

		}

	};

	self.rakCCPinSetSRSuccess = function(responselist) {

		if (!responselist[0].hasOwnProperty('errorMessage')) {
			self.RakCCPinSetSR.successMessage = responselist[0].successRequest;
		}

	};
	/*RAK  CC PIN SET END*/

	/*-TransactionLimitChange-Start*/
	self.transactionLimitChangeRqConstants={
			TRANSACTIONPASSWORD:'Transaction Password',
	        TRANSACTIOPASSWORDSMSOTP:'Transaction PasswordSMS OTP',
	        SMSOTP:'SMS OTP',
	};
	self.transactionLimitChangeRq={

			sameCurrencyTransferLimit :"",
			crossCurrencyTransferLimit : "",
			isAuthSet:false,
			authType : "",
	        secAuthType: "",
	        mintxnlimit: "",
			OTP:0,
			TransactionPassword:1,
			None:-1,
			Both:2,

			isTransactionPwd:false,
			isSmsOtp:false,
			isFirstAuthMode:false,
			isSecAuthMode:false,

			firstAuthMode:"",
			secAuthMode:"",

			firstAuthModeValue:"",
			secAuthModeValue:"",

	        trasactionLimitSuccessMsg:"",
	        disclaimerTxt:"",

	     resetTransactionLimitChangeModel: function(){
	    	 self.transactionLimitChangeRq.sameCurrencyTransferLimit = "";
	    	 self.transactionLimitChangeRq.crossCurrencyTransferLimit = "";
	    	 self.transactionLimitChangeRq.isAuthSet=false;
	    	 self.transactionLimitChangeRq.authType = "";
	    	 self.transactionLimitChangeRq.secAuthType ="";

	    	 self.transactionLimitChangeRq.OTP=0;
	    	 self.transactionLimitChangeRq.TransactionPassword=1;
	    	 self.transactionLimitChangeRq.None=-1;
	    	 self.transactionLimitChangeRq.Both=2;

	    	 self.transactionLimitChangeRq.isTransactionPwd=false;
	    	 self.transactionLimitChangeRq.isSmsOtp=false;
	    	 self.transactionLimitChangeRq.isFirstAuthMode=false;
	    	 self.transactionLimitChangeRq.isSecAuthMode=false;

	    	 self.transactionLimitChangeRq.firstAuthMode="";
	    	 self.transactionLimitChangeRq.secAuthMode="";

	    	 self.transactionLimitChangeRq.firstAuthModeValue="";
	    	 self.transactionLimitChangeRq.secAuthModeValue="";
	    	 self.transactionLimitChangeRq.mintxnlimit="";
	    	 self.transactionLimitChangeRq.authType=self.transactionLimitChangeRq.None;
	    	 self.transactionLimitChangeRq.secAuthType=self.transactionLimitChangeRq.None;

	    	 self.transactionLimitChangeRq.trasactionLimitSuccessMsg="";
	    	 self.acceptTermscondition='N';
	    	 self.transactionLimitChangeRq.disclaimerTxt="";
	     },

	     initTransactionLimitChange:function(){
	    	 self.transactionLimitChangeRq.authType=self.transactionLimitChangeRq.None;
	    	 self.transactionLimitChangeRq.secAuthType=self.transactionLimitChangeRq.None;
	     },
	     
	     initTransactionLimit:function(responsesList){
	    	 if(responsesList[0].hasOwnProperty('txn_min_limit')){
		    	 self.transactionLimitChangeRq.mintxnlimit=responsesList[0].txn_min_limit;
		    	 //self.transactionLimitChangeRq.disclaimerTxt=rootScope.appLiterals.APP.DISCLAIMER.RAK_DAILY_LIMI_UPDATE_RET+self.transactionLimitChangeRq.mintxnlimit+rootScope.appLiterals.APP.DISCLAIMER.RAK_DAILY_LIMI_UPDATE_RET1;
		    	 self.transactionLimitChangeRq.disclaimerTxt=rootScope.appLiterals.APP.DISCLAIMER.RAK_DAILY_LIMI_UPDATE_RET1;
	    	 }
	    },
	     
	     previewTransactionLimitChange :function(responsesList) {
	    	if (!responsesList[0].hasOwnProperty("errorMessage")) {
	    		self.common.message=responsesList[0].MESSAGE ? responsesList[0].MESSAGE :'';
	    	     if(responsesList[0].auth == self.transactionLimitChangeRqConstants.TRANSACTIONPASSWORD||responsesList[0].auth == self.transactionLimitChangeRqConstants.TRANSACTIOPASSWORDSMSOTP||responsesList[0].auth == self.transactionLimitChangeRqConstants.SMSOTP){
					self.transactionLimitChangeRq.isAuthSet = true;
					switch(responsesList[0].auth){
					case self.transactionLimitChangeRqConstants.TRANSACTIONPASSWORD:
						 self.transactionLimitChangeRq.authType=self.transactionLimitChangeRq.TransactionPassword;
						 self.transactionLimitChangeRq.isFirstAuthMode=true;
						 break;
					 case self.transactionLimitChangeRqConstants.TRANSACTIOPASSWORDSMSOTP:
						 self.transactionLimitChangeRq.authType=self.transactionLimitChangeRq.TransactionPassword;
						 self.transactionLimitChangeRq.secAuthType=self.transactionLimitChangeRq.OTP;
						 self.transactionLimitChangeRq.isFirstAuthMode=true;
						 self.transactionLimitChangeRq.isSecAuthMode=true;
						 break;
					 case self.transactionLimitChangeRqConstants.SMSOTP:
						 self.transactionLimitChangeRq.authType=self.transactionLimitChangeRq.OTP;
						 self.transactionLimitChangeRq.isFirstAuthMode=true;
						 break;
					 default:
						 self.transactionLimitChangeRq.authType=self.transactionLimitChangeRq.None;
						 self.transactionLimitChangeRq.secAuthType=self.transactionLimitChangeRq.None;
						 break;
					 }

				  }
				else{
					self.transactionLimitChangeRq.isAuthSet = false;
				}
	    	 }
	     },
         successTransactionLimitChange :function(responseList) {
        		if (responseList[0].hasOwnProperty("successTLCMsg")) {
        			self.transactionLimitChangeRq.trasactionLimitSuccessMsg=responseList[0].successTLCMsg;
        		}

	     },

	};
	/*-TransactionLimitChange-End*/
	//--------------------------------------------------------------------------------------------------------------
	//  - Added for Know Your Client Profile Renewal : START
		self.RakKYCRenModel = {
			totMonthlyCrCash : "",
			totMonthlyCrNonCash : "",
			totMonthlyCr : "",
			maxAmtExpctdCash : "",
			maxAmtExpctdNonCash : "",
			percentageTMCCash : "",
			percentageTMCNonCash : "",
			isMaxAmtLessThanTotAmt : true,
			successMessage : "",
			authFlag : "N",
			authMode : "",
			authStatus : false,
			txnPwd : ""
		};
		self.resetRakKYCRenDetails = function() {
			self.RakKYCRenModel.totMonthlyCrCash = "";
			self.RakKYCRenModel.totMonthlyCrNonCash = "";
			self.RakKYCRenModel.totMonthlyCr = "";
			self.RakKYCRenModel.maxAmtExpctdCash = "";
			self.RakKYCRenModel.maxAmtExpctdNonCash = "";
			self.RakKYCRenModel.percentageTMCCash = "";
			self.RakKYCRenModel.percentageTMCNonCash = "";
			self.RakKYCRenModel.isMaxAmtLessThanTotAmt = true;
			self.RakKYCRenModel.successMessage = "";
			self.RakKYCRenModel.authFlag = "N";
			self.RakKYCRenModel.authMode = "";
			self.RakKYCRenModel.authStatus = false;
			self.RakKYCRenModel.txnPwd = "";
			self.common.message="";
		};
		self.calcRakKYCTotMonthlyCr = function() {

			if(self.RakKYCRenModel.totMonthlyCrCash == "")
				self.RakKYCRenModel.totMonthlyCrCash = "0";

			if(self.RakKYCRenModel.totMonthlyCrNonCash == "")
				self.RakKYCRenModel.totMonthlyCrNonCash = "0";

			self.RakKYCRenModel.totMonthlyCr = parseInt(self.RakKYCRenModel.totMonthlyCrCash) + parseInt(self.RakKYCRenModel.totMonthlyCrNonCash);
		};

		self.calcKYCAmtPercentage = function() {
			var temp = parseInt(self.RakKYCRenModel.totMonthlyCrCash) + parseInt(self.RakKYCRenModel.maxAmtExpctdCash);
			var temp2 = parseInt(self.RakKYCRenModel.totMonthlyCrCash) + parseInt(self.RakKYCRenModel.totMonthlyCrNonCash);

			self.RakKYCRenModel.percentageTMCCash = parseInt((temp/temp2)*100);

			var temp3 = parseInt(self.RakKYCRenModel.totMonthlyCrNonCash) + parseInt(self.RakKYCRenModel.maxAmtExpctdNonCash);
			var temp4 = parseInt(self.RakKYCRenModel.maxAmtExpctdCash) + parseInt(self.RakKYCRenModel.maxAmtExpctdNonCash);

			self.RakKYCRenModel.percentageTMCNonCash = parseInt((temp3/temp4)*100);

		};
		self.confirmRakKYCRen = function(responsesList) {
			if (!responsesList[0].hasOwnProperty('errorMessage')) {
				if (responsesList[0].hasOwnProperty('authFlag')) {
					self.RakKYCRenModel.authFlag = responsesList[0].authFlag;

					if (self.RakKYCRenModel.authFlag == "Y") {
						if (responsesList[0].auth == "")
							self.RakKYCRenModel.authStatus = false;
						else {
							self.RakKYCRenModel.authStatus = true;
							self.RakKYCRenModel.authMode = responsesList[0].auth;
						}
					}
				}
				self.common.message=responsesList[0].MESSAGE ? responsesList[0].MESSAGE :'';
			}
		};
		self.initRakKYCRenSuccess = function(responsesList) {
			if (!responsesList[0].hasOwnProperty('errorMessage'))
				self.RakKYCRenModel.successMessage = responsesList[0].successMsg;
		};
	//  - Added for Know Your Client Profile Renewal : END
	// ----------------------------------------------------------------------------------------------------------------

	/*-InvestmentRedemption-Start*/
	self.investmentRedemptionRqConstants={
			ALLNOMINALAMOUNT:'A',
			ALLNOMINALAMOUNTDESC:'All Nominal Amount',
			PARTNOMINALAMOUNT:'PN',
			PARTNOMINALAMOUNTDESC:'Part Nominal Amount',
			ALLUNITS:'AU',
			ALLUNITSDESC:'All Units',
			PARTUNITS:'PU',
			PARTUNITSDESC:'Partial Units',
			MUTUALFUNDS:'MUTUAL FUNDS',
			BONDS:'BONDS',

	},
    self.investmentRedemptionRq={

			investmentAccList:[],
			investmentNameList:[],
			oprAccountList:[],
			oprAcctId:"",
            investmentId:"",
			nameOfInvestment : "",
			amount:"",
			amountDisplayName:"",
			allNominalAmount:"",
			isAllNominalAmount:false,
			partNominalAmount:"",
			isPartNominalAmount:false,
			noOfUnits:"",
			allUnits:"",
			isAllUnits:false,
			partialUnits:"",
			isPartialUnits:false,
			creditAcount:"",
			invAccountId:"",
			invAccountType:"",
			invMainAcctType:"",
			invAccountCurr:"",
			investmentProductName:"",
			noOfUnitsDisplayName:"",
			oprAccIdDisplayName:"",
			investmentProductType:"",

			isAuthSet:false,
			authType : "",
	        secAuthType: "",

			OTP:0,
			TransactionPassword:1,
			None:-1,
			Both:2,

			isTransactionPwd:false,
			isSmsOtp:false,
			isFirstAuthMode:false,
			isSecAuthMode:false,

			firstAuthMode:"",
			secAuthMode:"",

			firstAuthModeValue:"",
			secAuthModeValue:"",
			investmentProductTypeCode:"",
			allNominalAmountDisp:"",

	        trasactionLimitSuccessMsg:"",
	        allNominalCurrency:"",

	     resetInvestmentRedemptionRqModel: function(){
	    	 self.investmentRedemptionRq.investmentAccList = [];
	    	 self.investmentRedemptionRq.investmentNameList = [];
	    	 self.investmentRedemptionRq.oprAccountList=[];
	    	 self.investmentRedemptionRq.oprAcctId="";
	    	 self.investmentRedemptionRq.investmentId = "";
	    	 self.investmentRedemptionRq.nameOfInvestment = "";
	    	 self.investmentRedemptionRq.amount = "";
	    	 self.investmentRedemptionRq.allNominalAmount="";
	    	 self.investmentRedemptionRq.partNominalAmount="";
	    	 self.investmentRedemptionRq.noOfUnits="";
	    	 self.investmentRedemptionRq.allUnits="";
	    	 self.investmentRedemptionRq.partialUnits="";
	    	 self.investmentRedemptionRq.creditAcount = "";
	    	 self.investmentRedemptionRq.invAccountId="";
	    	 self.investmentRedemptionRq.invAccountType="";
	    	 self.investmentRedemptionRq.invMainAcctType="";
	    	 self.investmentRedemptionRq.invAccountCurr="";
	    	 self.investmentRedemptionRq.investmentProductName="";
	    	 self.investmentRedemptionRq.amountDisplayName="";
	    	 self.investmentRedemptionRq.noOfUnitsDisplayName="";
	    	 self.investmentRedemptionRq.oprAccIdDisplayName="";
	    	 self.investmentRedemptionRq.investmentProductType="";
	    	 self.investmentRedemptionRq.investmentProductTypeCode="";
	    	 self.investmentRedemptionRq.isAllNominalAmount=false;
	    	 self.investmentRedemptionRq.isPartNominalAmount=false;
	    	 self.investmentRedemptionRq.isAllUnits=false;
	    	 self.investmentRedemptionRq.isPartialUnits=false;

	    	 self.investmentRedemptionRq.isAuthSet=false;
	    	 self.investmentRedemptionRq.authType = "";
	    	 self.investmentRedemptionRq.secAuthType ="";

	    	 self.investmentRedemptionRq.OTP=0;
	    	 self.investmentRedemptionRq.TransactionPassword=1;
	    	 self.investmentRedemptionRq.None=-1;
	    	 self.investmentRedemptionRq.Both=2;

	    	 self.investmentRedemptionRq.isTransactionPwd=false;
	    	 self.investmentRedemptionRq.isSmsOtp=false;
	    	 self.investmentRedemptionRq.isFirstAuthMode=false;
	    	 self.investmentRedemptionRq.isSecAuthMode=false;

	    	 self.investmentRedemptionRq.firstAuthMode="";
	    	 self.investmentRedemptionRq.secAuthMode="";

	    	 self.investmentRedemptionRq.firstAuthModeValue="";
	    	 self.investmentRedemptionRq.secAuthModeValue="";

	    	 self.investmentRedemptionRq.authType=self.investmentRedemptionRq.None;
	    	 self.investmentRedemptionRq.secAuthType=self.investmentRedemptionRq.None;

	    	 self.investmentRedemptionRq.investmentRedmptionSuccessMsg="";
	    	 self.common.message="";
	    	 self.investmentRedemptionRq.allNominalAmountDisp="";
	    	 self.investmentRedemptionRq.allNominalCurrency="";
	     },

	     initInvestmentRedemptionRequest : function(responselist) {
	    	 self.investmentRedemptionRq.amount=self.investmentRedemptionRqConstants.ALLNOMINALAMOUNT;
	    	 self.investmentRedemptionRq.noOfUnits=self.investmentRedemptionRqConstants.ALLUNITS;
	 		if (!responselist[0].hasOwnProperty('errorMessage')) {
	 			if (responselist[0].hasOwnProperty('investmentAccList')) {
	 				self.investmentRedemptionRq.investmentAccList = responselist[0].investmentAccList;
	 			}
	 			if (responselist[0].hasOwnProperty('invTxnDetailsList')) {
	 				self.investmentRedemptionRq.investmentNameList = responselist[0].invTxnDetailsList;
	 			}
	 			if(responselist[0].hasOwnProperty('oprAcctList')){
	 				self.investmentRedemptionRq.oprAccountList=responselist[0].oprAcctList;
	 			}

	 		}
	 		/* self.investmentRedemptionRq.amount = self.investmentRedemptionRqConstants.ALLNOMINALAMOUNT;
	    	 self.investmentRedemptionRq.noOfUnits = self.investmentRedemptionRqConstants.ALLUNITS;*/
	 	},
	 	getAccountDetailsUtil:function(){
	 		 self.investmentRedemptionRq.invAccountId=self.investmentRedemptionRq.investmentAccList[self.investmentRedemptionRq.investmentId]['accountId'];
	 		 self.investmentRedemptionRq.invAccountType=self.investmentRedemptionRq.investmentAccList[self.investmentRedemptionRq.investmentId]['accType'];
	 		 self.investmentRedemptionRq.invMainAcctType=self.investmentRedemptionRq.investmentAccList[self.investmentRedemptionRq.investmentId]['mainAccType'];
	 		 self.investmentRedemptionRq.invAccountCurr=self.investmentRedemptionRq.investmentAccList[self.investmentRedemptionRq.investmentId]['accountCurrency'];
	 	},
	 	getInvestmentDetailsUtil:function(){
	 		 self.investmentRedemptionRq.allNominalAmount=(self.investmentRedemptionRq.investmentNameList[self.investmentRedemptionRq.nameOfInvestment]['marketValue']).split(" ")[1];
	 		 self.investmentRedemptionRq.allNominalAmountDisp=(self.investmentRedemptionRq.investmentNameList[self.investmentRedemptionRq.nameOfInvestment]['marketValue']);
	 		 self.investmentRedemptionRq.allNominalCurrency=(self.investmentRedemptionRq.investmentNameList[self.investmentRedemptionRq.nameOfInvestment]['marketValue']).split(" ")[0];	
	 		 self.investmentRedemptionRq.allNominalAmountTemp=parseFloat(self.investmentRedemptionRq.allNominalAmount.replace(",",""));
	 		 self.investmentRedemptionRq.allUnits=self.investmentRedemptionRq.investmentNameList[self.investmentRedemptionRq.nameOfInvestment]['quantity'];
	 		 self.investmentRedemptionRq.allUnitsTemp=parseFloat(self.investmentRedemptionRq.allUnits.replace(",",""));
	 		 self.investmentRedemptionRq.investmentProductName=self.investmentRedemptionRq.investmentNameList[self.investmentRedemptionRq.nameOfInvestment]['productName'];
	 		 self.investmentRedemptionRq.investmentProductType=self.investmentRedemptionRq.investmentNameList[self.investmentRedemptionRq.nameOfInvestment]['productType'];
	 		 self.investmentRedemptionRq.investmentProductTypeCode=self.investmentRedemptionRq.investmentNameList[self.investmentRedemptionRq.nameOfInvestment]['productTypeCode'];
	 	},

	 	getInvestmentConfirmUtil:function(){
	 		if(self.investmentRedemptionRq.amount==self.investmentRedemptionRqConstants.ALLNOMINALAMOUNT){
	 			self.investmentRedemptionRq.isAllNominalAmount=true;
	 			self.investmentRedemptionRq.isPartNominalAmount=false;
	 		}
	 		if(self.investmentRedemptionRq.amount==self.investmentRedemptionRqConstants.PARTNOMINALAMOUNT){
	 			self.investmentRedemptionRq.isAllNominalAmount=false;
	 			self.investmentRedemptionRq.isPartNominalAmount=true;
	 		}
	 		if(self.investmentRedemptionRq.noOfUnits==self.investmentRedemptionRqConstants.ALLUNITS){
        		self.investmentRedemptionRq.isAllUnits=true;
        		self.investmentRedemptionRq.isPartialUnits=false;
	 		}
	 		if(self.investmentRedemptionRq.noOfUnits==self.investmentRedemptionRqConstants.PARTUNITS){
	 			self.investmentRedemptionRq.isAllUnits=false;
        		self.investmentRedemptionRq.isPartialUnits=true;
	 		}

	 	},


	     previewInvestmentRedemptionRq :function(responsesList) {
	    	if (!responsesList[0].hasOwnProperty("errorMessage")) {
	    	     if(responsesList[0].auth == self.transactionLimitChangeRqConstants.TRANSACTIONPASSWORD||responsesList[0].auth == self.transactionLimitChangeRqConstants.TRANSACTIOPASSWORDSMSOTP||responsesList[0].auth == self.transactionLimitChangeRqConstants.SMSOTP){
					self.investmentRedemptionRq.isAuthSet = true;
					switch(responsesList[0].auth){
					case self.transactionLimitChangeRqConstants.TRANSACTIONPASSWORD:
						 self.investmentRedemptionRq.authType=self.investmentRedemptionRq.TransactionPassword;
						 self.investmentRedemptionRq.isFirstAuthMode=true;
						 break;
					 case self.transactionLimitChangeRqConstants.TRANSACTIOPASSWORDSMSOTP:
						 self.investmentRedemptionRq.authType=self.investmentRedemptionRq.TransactionPassword;
						 self.investmentRedemptionRq.secAuthType=self.investmentRedemptionRq.OTP;
						 self.investmentRedemptionRq.isFirstAuthMode=true;
						 self.investmentRedemptionRq.isSecAuthMode=true;
						 break;
					 case self.transactionLimitChangeRqConstants.SMSOTP:
						 self.investmentRedemptionRq.authType=self.investmentRedemptionRq.OTP;
						 self.investmentRedemptionRq.isFirstAuthMode=true;
						 break;
					 default:
						 self.investmentRedemptionRq.authType=self.investmentRedemptionRq.None;
						 self.investmentRedemptionRq.secAuthType=self.investmentRedemptionRq.None;
						 break;
					 }

				  }
				else{
					self.investmentRedemptionRq.isAuthSet = false;
				}
	    	     self.common.message=responsesList[0].MESSAGE ? responsesList[0].MESSAGE :'';
	    	 }
	    	      switch(self.investmentRedemptionRq.amount){
	    	         case self.investmentRedemptionRqConstants.ALLNOMINALAMOUNT:
	    	        	  self.investmentRedemptionRq.amountDisplayName=self.investmentRedemptionRqConstants.ALLNOMINALAMOUNTDESC;
	    	              break;
	    	         case self.investmentRedemptionRqConstants.PARTNOMINALAMOUNT:
	    	        	  self.investmentRedemptionRq.amountDisplayName=self.investmentRedemptionRqConstants.PARTNOMINALAMOUNTDESC;
	    	        	  break;
	    	         default:
	    	        	 self.investmentRedemptionRq.amountDisplayName="";
	    		          break;
	    	        }
	    	     switch(self.investmentRedemptionRq.noOfUnits){
	                case self.investmentRedemptionRqConstants.ALLUNITS:
	        	         self.investmentRedemptionRq.noOfUnitsDisplayName=self.investmentRedemptionRqConstants.ALLUNITSDESC;
	                     break;
	                case self.investmentRedemptionRqConstants.PARTUNITS:
	        	         self.investmentRedemptionRq.noOfUnitsDisplayName=self.investmentRedemptionRqConstants.PARTUNITSDESC;
	        	         break;
	                default:
	        	         self.investmentRedemptionRq.noOfUnitsDisplayName="";
		                 break;
	                 }
	    	    self.investmentRedemptionRq.oprAccIdDisplayName=self.investmentRedemptionRq.oprAccountList[self.investmentRedemptionRq.oprAcctId]['accountId'];

	     },
         successInvestmentRedemptionRq :function(responseList) {
        		if (responseList[0].hasOwnProperty("invRedemptionSuccessMsg")) {
        			self.investmentRedemptionRq.investmentRedmptionSuccessMsg=responseList[0].invRedemptionSuccessMsg;
        		}

	     },

	};
	/*-InvestmentRedemption-End*/

	self.RakDiscApply = {
		acctMenuList:[],
		credCardMenuList:[],
		debitCardMenuList:[],
		insuranceMenuList:[],
		depositMenuList:[],
		loansMenuList:[],
		othersMenuList:[],
		prepaidCardMenuList:[],
		selectedSubMenu:"",
		name:"",
		mobileNo:"",
		email:"",
		selectedProd:"",
		selectedProdId:"",
		selectedProdCatg:"",
		remarks:"",
		auth:"",
		authStatus:false,
		authMode:"",
		otp:"",
		successMsg:"",
		discAndApplyFlowFlag:false,
		isFirstTimeFlag:false,
		isRequestComesFromDiscApply:false,
		setGoldProductDetails: function(responsesList){	
			if(self.RakDiscApply.fromDashboard && responsesList[0].hasOwnProperty("acctList")){
			self.RakDiscApply.acctMenuList = responsesList[0].acctList;
			for(var i=0;i<self.RakDiscApply.acctMenuList.length;i++)
				{
					if(self.RakDiscApply.acctMenuList[i].prodId=='CPGLD'){
					self.RakDiscApply.contentId=self.RakDiscApply.acctMenuList[i].contentId;
						self.RakDiscApply.selectedSubMenu={contentId:self.RakDiscApply.acctMenuList[i].contentId,displayOrder:self.RakDiscApply.acctMenuList[i].displayOrder,
								extBaseUrl:self.RakDiscApply.acctMenuList[i].extBaseUrl,headerText:self.RakDiscApply.acctMenuList[i].headerText,
								isCrosssell:self.RakDiscApply.acctMenuList[i].isCrosssell, isIslamic:self.RakDiscApply.acctMenuList[i].isIslamic, 
								prodCatg:self.RakDiscApply.acctMenuList[i].prodCatg,prodId:self.RakDiscApply.acctMenuList[i].prodId,
								intBaseUrl:self.RakDiscApply.acctMenuList[i].intBaseUrl };
						break;
					}
				}
			}
			//self.RakDiscApply.selectedSubMenu={contentId:'60415ad0-5494-45be-b014-bce17e4af687',displayOrder:'9',extBaseUrl:'',headerText:'Gold Account',
					//isCrosssell:'N', isIslamic:'N', prodCatg:'OPA',prodId:'CPGLD',intBaseUrl:'onRAKInvOpenGoldAccInitClick' };
		},

		resetRakDiscApplyData: function(){
			self.rakServicesModel.expandFlag="";
			self.RakDiscApply.acctMenuList = [];
			self.RakDiscApply.credCardMenuList = [];
			self.RakDiscApply.debitCardMenuList = [];
			self.RakDiscApply.insuranceMenuList = [];
			self.RakDiscApply.depositMenuList = [];
			self.RakDiscApply.loansMenuList = [];
			self.RakDiscApply.othersMenuList = [];
			self.RakDiscApply.prepaidCardMenuList = [];
			self.RakDiscApply.selectedSubMenu = '';
			self.RakDiscApply.name = "";
			self.RakDiscApply.mobileNo = "";
			self.RakDiscApply.email = "";
			self.RakDiscApply.selectedProd = "";
			self.RakDiscApply.selectedProdId = "";
			self.RakDiscApply.remarks = "";
			self.RakDiscApply.auth = "";
			self.RakDiscApply.authStatus = false;
			self.RakDiscApply.authMode = "";
			self.RakDiscApply.otp = "";
			self.RakDiscApply.successMsg = "";
			self.RakDiscApply.selectedProdCatg = "";
			self.RakDiscApply.discAndApplyFlowFlag = false;
			self.RakDiscApply.isFirstTimeFlag = false;
			self.RakDiscApply.isRequestComesFromDiscApply = false;
			self.RakDiscApply.fromDashboard = false;
		},

		initDiscApplyData : function(responsesList){
			if ((self.RakDiscApply.isFirstTimeFlag) && (!responsesList[0].hasOwnProperty("errorMessage"))) {
				self.RakDiscApply.acctMenuList = responsesList[0].acctList;
				self.RakDiscApply.credCardMenuList = responsesList[0].creditCardList;
				self.RakDiscApply.debitCardMenuList = responsesList[0].debitCardList;
				self.RakDiscApply.insuranceMenuList = responsesList[0].insuranceList;
				self.RakDiscApply.depositMenuList = responsesList[0].depositList;
				self.RakDiscApply.loansMenuList = responsesList[0].loanList;
				self.RakDiscApply.othersMenuList = responsesList[0].generalList;
				self.RakDiscApply.prepaidCardMenuList = responsesList[0].prepaidCardList;
				self.RakDiscApply.isFirstTimeFlag =  false;
			}
		},

		clearUserDetails : function(){
			self.RakDiscApply.name = "";
			self.RakDiscApply.mobileNo = "";
			self.RakDiscApply.email = "";
			self.RakDiscApply.remarks = "";
		},

		setEventForDiscApplyApplyNow : function(){
			if(self.RakDiscApply.selectedSubMenu.isCrosssell && self.RakDiscApply.selectedSubMenu.isCrosssell == "Y"){
				self.RakDiscApply.selectedProd = self.RakDiscApply.selectedSubMenu.headerText;
				self.RakDiscApply.selectedProdId = self.RakDiscApply.selectedSubMenu.prodId;
				self.RakDiscApply.selectedProdCatg = self.RakDiscApply.selectedSubMenu.prodCatg;
				scope.setEvent('onDiscApplyApplyNowBtnClick');
			}
			else{
				self.RakDiscApply.discAndApplyFlowFlag = true;
				self.RakDiscApply.isRequestComesFromDiscApply = true;
				scope.setEvent(self.RakDiscApply.selectedSubMenu.intBaseUrl);
			}

		},

		initDiscApplyDetailsConfirmData : function(responsesList) {
			if (!responsesList[0].hasOwnProperty('errorMessage')) {
				if (responsesList[0].auth == "")
					self.RakDiscApply.authStatus = false;
				else {
					self.RakDiscApply.authStatus = true;
					self.RakDiscApply.authMode = responsesList[0].auth;
				}
			}

		},

		initDiscApplyDetailsSuccessData : function(responsesList) {
			if (!responsesList[0].hasOwnProperty("errorMessage")) {
				self.RakDiscApply.successMsg = responsesList[0].successMessage;
			}

		},
		
		resetAccountServices: function(){
			
			self.resetRAKOprSavingAcctOpenReqData();
			self.resetRAKOprEvantageAcctOpenReqData();
			self.resetRAKOprCurrentAcctOpenReqData();
			self.resetRAKOprIslamicAcctOpenReqData();
			self.resetRAKOprFSAcctOpenReqData();
			self.applyForPrepaidCard.resetApplyForPrepaidCard();
			self.RakIslamicDepositOpenNewTermReq.resetRakIslamicDepositOpenNewTermHome();
			self.acceptTermscondition='N';
			self.resetRAKInvOpenGoldAccDetails();
		}
	}

	/*-CC-SmartCash-Start*/
	self.ccSmartCashRqConstants={
			MYRAKBANKACCOUNT:'A',
			MYOTHERBANKWITHINUAE:'O',

	},
    self.ccSmartCashRq={

			ccAccountList:[],
			ccAccountId:"",
			displayCcAccountNumber:"",
			oprAccountList:[],
			oprAcctId:"",
			displayOprAccountNumber:"",
			avlCredLimit:"",
			avlCreditAmount:0.00,
			cardExpDate:"",
			transferCashTo:"",
			displayNametransferCashTo:"",
			iban:"",
			smartCashAmount:"",
	    	isRakAccount:false,
	    	isIban:false,
	    	cardCrnNumber:"",
	    	cardExpDay:"",
		    cardExpMonth:"",
			cardExpYear:"",
			cardExpDateDisplay:"",


			isAuthSet:false,
			authType : "",
	        secAuthType: "",

			OTP:0,
			TransactionPassword:1,
			None:-1,
			Both:2,

			isTransactionPwd:false,
			isSmsOtp:false,
			isFirstAuthMode:false,
			isSecAuthMode:false,

			firstAuthMode:"",
			secAuthMode:"",

			firstAuthModeValue:"",
			secAuthModeValue:"",
			isBack:false,

	        trasactionLimitSuccessMsg:"",

	     resetCcSmartCashRqModel: function(){
	    	 self.ccSmartCashRq.ccAccountList = [];
	    	 self.ccSmartCashRq.ccAccountId="",
	    	 self.ccSmartCashRq.displayCcAccountNumber="",
	    	 self.ccSmartCashRq.oprAccountList=[];
	    	 self.ccSmartCashRq.oprAcctId="";
	    	 self.ccSmartCashRq.displayOprAccountNumber="",
	    	 self.ccSmartCashRq.avlCredLimit="",
	    	 self.ccSmartCashRq.avlCreditAmount=0.00,
	    	 self.ccSmartCashRq.transferCashTo="",
	    	 self.ccSmartCashRq.displayNametransferCashTo="",
	    	 self.ccSmartCashRq.iban="",
	    	 self.ccSmartCashRq.smartCashAmount="",
	    	 self.ccSmartCashRq.isRakAccount=false,
	    	 self.ccSmartCashRq.isIban=false,
	    	 self.ccSmartCashRq.cardCrnNumber="",
	    	 self.ccSmartCashRq.cardExpDate="",
	    	 self.ccSmartCashRq.cardExpDay="",
		     self.ccSmartCashRq.cardExpMonth="",
			 self.ccSmartCashRq.cardExpYear="",
			 self.ccSmartCashRq.cardExpDateDisplay="",


	    	 self.ccSmartCashRq.isAuthSet=false;
	    	 self.ccSmartCashRq.authType = "";
	    	 self.ccSmartCashRq.secAuthType ="";

	    	 self.ccSmartCashRq.OTP=0;
	    	 self.ccSmartCashRq.TransactionPassword=1;
	    	 self.ccSmartCashRq.None=-1;
	    	 self.ccSmartCashRq.Both=2;

	    	 self.ccSmartCashRq.isTransactionPwd=false;
	    	 self.ccSmartCashRq.isSmsOtp=false;
	    	 self.ccSmartCashRq.isFirstAuthMode=false;
	    	 self.ccSmartCashRq.isSecAuthMode=false;

	    	 self.ccSmartCashRq.firstAuthMode="";
	    	 self.ccSmartCashRq.secAuthMode="";

	    	 self.ccSmartCashRq.firstAuthModeValue="";
	    	 self.ccSmartCashRq.secAuthModeValue="";

	    	 self.ccSmartCashRq.authType=self.ccSmartCashRq.None;
	    	 self.ccSmartCashRq.secAuthType=self.ccSmartCashRq.None;

	    	 self.ccSmartCashRq.investmentRedmptionSuccessMsg="";
	    	 self.common.message="";
	    	 self.ccSmartCashRq.isBack=false;
	     },

	     initCcSmartCashRequest : function(responselist) {
	 		if (!responselist[0].hasOwnProperty('errorMessage') && !self.ccSmartCashRq.isBack) {
	 			if (responselist[0].hasOwnProperty('ccAccountList')) {
	 				self.ccSmartCashRq.ccAccountList = responselist[0].ccAccountList;
	 			}
	 			if(responselist[0].hasOwnProperty('oprAccountList')){
	 				self.ccSmartCashRq.oprAccountList=responselist[0].oprAccountList;
	 			}
	 			if(responselist[0].hasOwnProperty('accountAvailableBalance')){
	 				self.ccSmartCashRq.avlCredLimit=responselist[0].accountAvailableBalance;
	 				var temp= (responselist[0].accountAvailableBalance).replace(",","");
	 				self.ccSmartCashRq.avlCreditAmount=parseInt(temp.split(" ")[1]);
	 			}
	 			if(responselist[0].hasOwnProperty('cardCrnNumber')){
	 				self.ccSmartCashRq.cardCrnNumber=responselist[0].cardCrnNumber;
	 			}
	 			if(responselist[0].hasOwnProperty('cardExpDate')){
	 				self.ccSmartCashRq.cardExpDate=responselist[0].cardExpDate;
	 			}
	 			
	 			 self.ccSmartCashRq.amount = self.ccSmartCashRqConstants.ALLNOMINALAMOUNT;
		    	 self.ccSmartCashRq.noOfUnits = self.ccSmartCashRqConstants.ALLUNITS;
		    	 self.ccSmartCashRq.transferCashTo=self.ccSmartCashRqConstants.MYRAKBANKACCOUNT;
		    	 self.ccSmartCashRq.isRakAccount=true;
		 		 self.ccSmartCashRq.isIban=false;

	 		}
	 		
	 	},
	 	getCcAccountDetailsUtil:function(){
	 		 self.ccSmartCashRq.displayCcAccountNumber=self.ccSmartCashRq.ccAccountList[self.ccSmartCashRq.ccAccountId]['creditCardNo'];
//  	 		 self.ccSmartCashRq.avlCredLimit=self.ccSmartCashRq.ccAccountList[self.ccSmartCashRq.ccAccountId]['availableCreditLimit'];
	 	},
	 	getOprAccountDetailsUtil:function(){
	 		 self.ccSmartCashRq.displayOprAccountNumber=self.ccSmartCashRq.oprAccountList[self.ccSmartCashRq.oprAcctId]['accountNumber'];
	 	},

	 	getTransferCashToUtil:function(){
	 		if(self.ccSmartCashRq.transferCashTo==self.ccSmartCashRqConstants.MYRAKBANKACCOUNT){
	 			self.ccSmartCashRq.isRakAccount=true;
	 			self.ccSmartCashRq.isIban=false;
	 			self.ccSmartCashRq.iban='';
	 		}
	 		if(self.ccSmartCashRq.transferCashTo==self.ccSmartCashRqConstants.MYOTHERBANKWITHINUAE){
	 			self.ccSmartCashRq.isRakAccount=false;
	 			self.ccSmartCashRq.isIban=true;
	 			self.ccSmartCashRq.oprAcctId='';
	 		}

	 	},


	     previewCcSmartCashRq :function(responsesList) {
	    	if (!responsesList[0].hasOwnProperty("errorMessage")) {
	    	     if(responsesList[0].auth == self.transactionLimitChangeRqConstants.TRANSACTIONPASSWORD||responsesList[0].auth == self.transactionLimitChangeRqConstants.TRANSACTIOPASSWORDSMSOTP||responsesList[0].auth == self.transactionLimitChangeRqConstants.SMSOTP){
					self.ccSmartCashRq.isAuthSet = true;
					switch(responsesList[0].auth){
					case self.transactionLimitChangeRqConstants.TRANSACTIONPASSWORD:
						 self.ccSmartCashRq.authType=self.ccSmartCashRq.TransactionPassword;
						 self.ccSmartCashRq.isFirstAuthMode=true;
						 break;
					 case self.transactionLimitChangeRqConstants.TRANSACTIOPASSWORDSMSOTP:
						 self.ccSmartCashRq.authType=self.ccSmartCashRq.TransactionPassword;
						 self.ccSmartCashRq.secAuthType=self.ccSmartCashRq.OTP;
						 self.ccSmartCashRq.isFirstAuthMode=true;
						 self.ccSmartCashRq.isSecAuthMode=true;
						 break;
					 case self.transactionLimitChangeRqConstants.SMSOTP:
						 self.ccSmartCashRq.authType=self.ccSmartCashRq.OTP;
						 self.ccSmartCashRq.isFirstAuthMode=true;
						 break;
					 default:
						 self.ccSmartCashRq.authType=self.ccSmartCashRq.None;
						 self.ccSmartCashRq.secAuthType=self.ccSmartCashRq.None;
						 break;
					 }

					self.common.message=responsesList[0].MESSAGE ? responsesList[0].MESSAGE :'';

				  }
				else{
					self.ccSmartCashRq.isAuthSet = false;
				}
	    	 }

	     },
         successCcSmartCashRq :function(responseList) {
        		if (responseList[0].hasOwnProperty("smartCardSuccessMsg")) {
        			self.ccSmartCashRq.ccSmartCashSuccessMsg=responseList[0].smartCardSuccessMsg;
        		}

	     },

	};
	/*-CC-SmartCash-End*/
//-----------------------------------------------------------------------------------------------------------------
	//  - Added for RAK Connect : START
	self.RAKConnectModel = {
			alertTypeList : [],
			selectedAlertType : "",
			selectedAlertTypeIndex : "",
			OprAccList : [],
			OprAccListWithAll : new Array(),
			selectedAccNum : "",
			CreditCardList : [],
			CreditCardListWithAll : new Array(),
			selectedCCNum : "",
			freqList : [],
			selectedFreq : "",
			selectedFreqCode : "",
			dateOfMnthList : [],
			selectedDom : "",
			dayOfWeekList: [],
			selectedDayOfWeekList: [],
			dowArray : new Array(),
			newAlertDataArray : new Array(),
			newAlertCounter : 0,
			isDeleteButton : false,
			rakConnSetupNewAlert : false,
			rakConnManageExisting : false,
			editableAlertIndex : "",
			editableCustomAlertIndex : "",
			customAlertList : [],
			customAlertDataArray : new Array(),
			finalSubmitArray : new Array(),
			selectedAccOrCcNum : "",
			ExistingAccountsList : [],
	//The final variables to send to EB START
			finalAlertID2Send : "",
			finalAlertID2SendType:"",
			finalAlertIDDesc2Send : "",
			finalAlertCode2Send : "",
			finalAccountID2Send : "",
			finalAlertFreq2Send : "",
			finalDay2Send : "",
			finalMonday2Send : "",
			finalTuesday2Send : "",
			finalWednesday2Send : "",
			finalThursday2Send : "",
			finalFriday2Send : "",
			finalSaturday2Send : "",
			finalSunday2Send : "",
			finalRemarks2Send : "",
			finalRemove2Send : "",
			//final variables for new change START
			finalDbts2Send : "",
			finalHostId2Send : "",
			finalDcId2Send : "",
			finalLangId2Send : "",
			finalChannelInfoString2Send : "",
			finalInputParamString2Send : "",
			//final variables for new change END
	//The final variables to send to EB END
			isExistingAlertDeleted : false,
	// For Validations START
			isAlertTypeValidatnRqd : false,
			isAccValidatnRqd : false,
			isCcValidatnRqd : false,
			isFreqValidatnRqd : false,
			isDomValidatnRqd : false,
			isDowValidatnRqd : false,
			pageValidation : false,
	// For Validations END
			accIdIndex2Send : "",
			ccIdIndex2Send : "",
			successMessage : "",
			authFlag : "N",
			authMode : "",
			authStatus : false,
			txnPwd : "",
			selectedSubAlertFreqDesc:'',
			isEditOrDelFlow:false,
			successMsg : "",
			connectInitFlag : false,
			manageExistFlag : false,
		};
	self.resetRAKConnectDetails = function(){
			self.RAKConnectModel.alertTypeList = [];
			self.RAKConnectModel.selectedAlertType = "";
			self.RAKConnectModel.selectedAlertTypeIndex = "";
			self.RAKConnectModel.OprAccList = [];
			self.RAKConnectModel.OprAccListWithAll = new Array();
			self.RAKConnectModel.selectedAccNum = "";
			self.RAKConnectModel.CreditCardList = [];
			self.RAKConnectModel.CreditCardListWithAll = new Array();
			self.RAKConnectModel.selectedCCNum = "";
			self.RAKConnectModel.freqList = [];
			self.RAKConnectModel.selectedFreq = "";
			self.RAKConnectModel.selectedFreqCode = "";
			self.RAKConnectModel.dateOfMnthList = [];
			self.RAKConnectModel.selectedDom = "";
			self.RAKConnectModel.dayOfWeekList = [];
			self.RAKConnectModel.selectedDayOfWeekList = [];
			self.RAKConnectModel.dowArray = new Array();
			self.RAKConnectModel.newAlertDataArray = new Array();
			self.RAKConnectModel.newAlertCounter = 0;
			self.RAKConnectModel.isDeleteButton = false;
			self.RAKConnectModel.rakConnSetupNewAlert = false;
			self.RAKConnectModel.rakConnManageExisting = false;
			self.RAKConnectModel.editableAlertIndex = "";
			self.RAKConnectModel.editableCustomAlertIndex = "";
			self.RAKConnectModel.customAlertList = [];
			self.RAKConnectModel.customAlertDataArray = new Array();
			self.RAKConnectModel.finalSubmitArray = new Array();
			self.RAKConnectModel.selectedAccOrCcNum = "";
			self.RAKConnectModel.ExistingAccountsList = [];
//Reset the final variables to send to EB START
			self.RAKConnectModel.finalAlertID2Send = "";
			self.RAKConnectModel.finalAlertID2SendType = "";
			self.RAKConnectModel.finalAlertIDDesc2Send = "";
			self.RAKConnectModel.finalAlertCode2Send = "";
			self.RAKConnectModel.finalAccountID2Send = "";
			self.RAKConnectModel.finalAlertFreq2Send = "";
			self.RAKConnectModel.finalDay2Send = "";
			self.RAKConnectModel.finalMonday2Send = "";
			self.RAKConnectModel.finalTuesday2Send = "";
			self.RAKConnectModel.finalWednesday2Send = "";
			self.RAKConnectModel.finalThursday2Send = "";
			self.RAKConnectModel.finalFriday2Send = "";
			self.RAKConnectModel.finalSaturday2Send = "";
			self.RAKConnectModel.finalSunday2Send = "";
			self.RAKConnectModel.finalRemarks2Send = "";
			self.RAKConnectModel.finalRemove2Send = "";
			//Reset final variables for new change START
			self.RAKConnectModel.finalDbts2Send = "";
			self.RAKConnectModel.finalHostId2Send = "";
			self.RAKConnectModel.finalDcId2Send = "";
			self.RAKConnectModel.finalLangId2Send = "";
			self.RAKConnectModel.finalChannelInfoString2Send = "";
			self.RAKConnectModel.finalInputParamString2Send = "";
			//Reset final variables for new change END
//Reset the final variables to send to EB END
			self.RAKConnectModel.isExistingAlertDeleted = false;
	// For Validations START
			self.RAKConnectModel.isAlertTypeValidatnRqd = false;
			self.RAKConnectModel.isAccValidatnRqd = false;
			self.RAKConnectModel.isCcValidatnRqd = false;
			self.RAKConnectModel.isFreqValidatnRqd = false;
			self.RAKConnectModel.isDomValidatnRqd = false;
			self.RAKConnectModel.isDowValidatnRqd = false;
			self.RAKConnectModel.pageValidation = false;
	// For Validations END
			self.RAKConnectModel.accIdIndex2Send = "";
			self.RAKConnectModel.ccIdIndex2Send = "";
			self.RAKConnectModel.successMessage = "";
			self.RAKConnectModel.authFlag = "N";
			self.RAKConnectModel.authMode = "";
			self.RAKConnectModel.authStatus = false;
			self.RAKConnectModel.txnPwd = "";
			self.RAKConnectModel.selectedSubAlertFreqDesc='';
			self.RAKConnectModel.isEditOrDelFlow=false;
			self.RAKConnectModel.successMsg = "";
			self.RAKConnectModel.connectInitFlag = false;
			self.RAKConnectModel.manageExistFlag = false;
	};
	self.sortDOM=function(a,b){
		return parseInt(b.dateOfMnthCode) < parseInt(a.dateOfMnthCode) ? 1 : -1;
	};
	self.sortDOW=function(a,b){
		var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
		return days.indexOf(a.dayOfWeekDesc) > days.indexOf(b.dayOfWeekDesc) ? 1 : -1;
	};
	self.fetchRAKConnectInitData = function(responsesList) {
		if (!responsesList[0].hasOwnProperty('errorMessage')) {
			if (responsesList[0].hasOwnProperty('CreditCardList')) {
				self.RAKConnectModel.CreditCardList = responsesList[0].CreditCardList;
			}
			if (responsesList[0].hasOwnProperty('OprAccList')) {
				self.RAKConnectModel.OprAccList = responsesList[0].OprAccList;
			}
			if (responsesList[0].hasOwnProperty('freqList')) {
				self.RAKConnectModel.freqList = responsesList[0].freqList;
			}
			if (responsesList[0].hasOwnProperty('dateOfMnthList')) {
				self.RAKConnectModel.dateOfMnthList =  jQuery(responsesList[0].dateOfMnthList).sort(self.sortDOM).toArray();
			}
			if (responsesList[0].hasOwnProperty('alertTypeList')) {
				self.RAKConnectModel.alertTypeList = responsesList[0].alertTypeList;
			}
			if (responsesList[0].hasOwnProperty('dayOfWeekList')) {
				self.RAKConnectModel.dayOfWeekList = jQuery(responsesList[0].dayOfWeekList).sort(self.sortDOW).toArray();
			}
			if (responsesList[0].hasOwnProperty('customAlertList')) {
				self.RAKConnectModel.customAlertList = responsesList[0].customAlertList;
				if(!self.RAKConnectModel.isEditOrDelFlow){
					self.fillCustomAlertArray();
				}
				self.RAKConnectModel.isEditOrDelFlow=false
				
			}
			if (responsesList[0].hasOwnProperty('successMsg')) {
				self.RAKConnectModel.successMsg = responsesList[0].successMsg;
				if(self.RAKConnectModel.connectInitFlag==true){
					self.RAKConnectModel.manageExistFlag=false;
				}
				if(self.RAKConnectModel.manageExistFlag==true){					
					self.RAKConnectModel.connectInitFlag=false;
				}
			}
//			if (responsesList[0].hasOwnProperty('ExistingAccountsList')) {
//				self.RAKConnectModel.ExistingAccountsList = responsesList[0].ExistingAccountsList;
//			}
		}
	};
	self.detectFreqCodeSelected = function(){
		if(self.RAKConnectModel.selectedFreq == 'Daily')
			self.RAKConnectModel.selectedFreqCode = "D";
		else if(self.RAKConnectModel.selectedFreq == 'Monthly')
			self.RAKConnectModel.selectedFreqCode = "M";
		else if(self.RAKConnectModel.selectedFreq == 'Weekly')
			self.RAKConnectModel.selectedFreqCode = "W";
		else
			self.RAKConnectModel.selectedFreqCode = "R";
	};
	self.fetchDaysOfWeek = function(){
		self.RAKConnectModel.dowArray = new Array();
		for (var k = 0 ; k<(self.RAKConnectModel.dayOfWeekList).length; k++){
			(self.RAKConnectModel.dowArray).push({dayOfWeekDesc:self.RAKConnectModel.dayOfWeekList[k].dayOfWeekDesc,
				dayOfWeekCode:self.RAKConnectModel.dayOfWeekList[k].dayOfWeekCode,
				flag:false
			});
		}
	};

	self.saveNewAlertData = function(){
		var accNo = "";
		var accId = "";
		var accIdx = "";
		var ccNo = "";
		var ccId = "";
		var ccIdx = "";
		if(self.RAKConnectModel.selectedAccNum != "") {
			accNo =self.RAKConnectModel.OprAccList[self.RAKConnectModel.selectedAccNum].accountNumber;

			accIdx = self.RAKConnectModel.selectedAccNum;
			accId = self.RAKConnectModel.OprAccList[self.RAKConnectModel.selectedAccNum].accIDIndex;
			self.RAKConnectModel.selectedAccOrCcNum = accId;
		}
		if(self.RAKConnectModel.selectedCCNum != "") {
			ccNo =self.RAKConnectModel.CreditCardList[self.RAKConnectModel.selectedCCNum].creditcardNumber;

			ccIdx = self.RAKConnectModel.selectedCCNum;
			ccId = self.RAKConnectModel.CreditCardList[self.RAKConnectModel.selectedCCNum].ccIDIndex;
			self.RAKConnectModel.selectedAccOrCcNum = ccId;
		}

		(self.RAKConnectModel.newAlertDataArray).push({
			alertType:self.RAKConnectModel.alertTypeList[self.RAKConnectModel.selectedAlertType].alertTypeDesc,
			alertId:self.RAKConnectModel.alertTypeList[self.RAKConnectModel.selectedAlertType].alertTypeID,
			alertCode:self.RAKConnectModel.alertTypeList[self.RAKConnectModel.selectedAlertType].alertTypeCode,
			alertTypeIndex:self.RAKConnectModel.selectedAlertType,
			accountNum:accNo,
			accIndex:accIdx,
			ccNum:ccNo,
			ccIndex:ccIdx,
			accOrCcNo:self.RAKConnectModel.selectedAccOrCcNum,
			freqType:self.RAKConnectModel.selectedFreq,
			freqTypeCode:self.RAKConnectModel.selectedFreqCode,
			selDom:self.RAKConnectModel.selectedDom,
			selDow:self.RAKConnectModel.dowArray,
			alertDbts:self.RAKConnectModel.alertTypeList[self.RAKConnectModel.selectedAlertType].alertTypeDbts,
			alertHostId:self.RAKConnectModel.alertTypeList[self.RAKConnectModel.selectedAlertType].alertTypeHostId,
			alertDcId:self.RAKConnectModel.alertTypeList[self.RAKConnectModel.selectedAlertType].alertTypeDcId,
			alertLangId:self.RAKConnectModel.alertTypeList[self.RAKConnectModel.selectedAlertType].alertTypeLangId,
			alertChannelInfoString:self.RAKConnectModel.alertTypeList[self.RAKConnectModel.selectedAlertType].alertTypeChannelInfoString,
			alertInputParamString:self.RAKConnectModel.alertTypeList[self.RAKConnectModel.selectedAlertType].alertTypeInputParamString,
			newAlCounter:self.RAKConnectModel.newAlertCounter
		});
		self.RAKConnectModel.newAlertCounter++;
	};
	self.detectIfAlreadyPresentAlert = function(){
		var isAlertPresent = false;
		if(self.RAKConnectModel.selectedAccNum && self.RAKConnectModel.selectedAlertType)
		{
			var accNo =self.RAKConnectModel.OprAccList[self.RAKConnectModel.selectedAccNum].accountNumber;
			for (var k = 0 ; k<(self.RAKConnectModel.newAlertDataArray).length; k++){
				if(self.RAKConnectModel.selectedAlertType == self.RAKConnectModel.newAlertDataArray[k].alertTypeIndex
						&& self.RAKConnectModel.selectedAccNum == self.RAKConnectModel.newAlertDataArray[k].accIndex){
					rootScope.showErrorPopup(rootScope.appLiterals.APP.RAKCONNECT.ALERT_ALREADY_PRESENT_ERR_MSG);
					isAlertPresent = true;
					break;
				}
			}
			var alertDesc=self.RAKConnectModel.alertTypeList[self.RAKConnectModel.selectedAlertType].alertTypeDesc;
			for (var k = 0 ; k<(self.RAKConnectModel.customAlertList).length; k++){
				if(alertDesc == self.RAKConnectModel.customAlertList[k].subAlertIDDesccription
						&& accNo == self.RAKConnectModel.customAlertList[k].subAccountID){
					rootScope.showErrorPopup(rootScope.appLiterals.APP.RAKCONNECT.ALERT_ALREADY_PRESENT_ERR_MSG);
					isAlertPresent = true;
					break;
				}
			}
			
			
			
		}
		
		
		if(self.RAKConnectModel.selectedCCNum && self.RAKConnectModel.selectedAlertType)
		{
			var ccNo=self.RAKConnectModel.CreditCardList[self.RAKConnectModel.selectedCCNum].creditcardNumber;
			for (var k = 0 ; k<(self.RAKConnectModel.newAlertDataArray).length; k++){
				if(self.RAKConnectModel.selectedAlertType == self.RAKConnectModel.newAlertDataArray[k].alertTypeIndex
						&& self.RAKConnectModel.selectedCCNum == self.RAKConnectModel.newAlertDataArray[k].accIndex){
					rootScope.showErrorPopup(rootScope.appLiterals.APP.RAKCONNECT.ALERT_ALREADY_PRESENT_ERR_MSG);
					isAlertPresent = true;
					break;
				}
			}
			
			for (var k = 0 ; k<(self.RAKConnectModel.customAlertList).length; k++){
				if(self.RAKConnectModel.selectedAlertType == self.RAKConnectModel.customAlertList[k].subAlertIndex
						&& ccNo == self.RAKConnectModel.customAlertList[k].subAccountID){
					rootScope.showErrorPopup(rootScope.appLiterals.APP.RAKCONNECT.ALERT_ALREADY_PRESENT_ERR_MSG);
					isAlertPresent = true;
					break;
				}
			}
			
			
			
		}
		
		
	
/*		for (var k = 0 ; k<(self.RAKConnectModel.newAlertDataArray).length; k++){
			if(self.RAKConnectModel.selectedAlertType == self.RAKConnectModel.newAlertDataArray[k].alertTypeIndex
					&& self.RAKConnectModel.selectedAccNum == self.RAKConnectModel.newAlertDataArray[k].accIndex
					&& self.RAKConnectModel.selectedAccNum !=""){
				rootScope.showErrorPopup(rootScope.appLiterals.APP.RAKCONNECT.ALERT_ALREADY_PRESENT_ERR_MSG);
				isAlertPresent = true;
				break;
			}
			else if(self.RAKConnectModel.selectedAlertType == self.RAKConnectModel.newAlertDataArray[k].alertTypeIndex
					&& self.RAKConnectModel.selectedCCNum == self.RAKConnectModel.newAlertDataArray[k].ccIndex
					&& self.RAKConnectModel.selectedCCNum !=""){
				rootScope.showErrorPopup(rootScope.appLiterals.APP.RAKCONNECT.ALERT_ALREADY_PRESENT_ERR_MSG);
				isAlertPresent = true;
				break;
			}
			else
				isAlertPresent = false;
		}*/
		if(!isAlertPresent){
			self.detectFreqCodeSelected();
			self.saveNewAlertData();
			scope.setEvent('onRAKConnectAddNewAlertSaveClick');
		}
	};

	self.updateNewAlertData = function(){
		//self.detectWhetherPageValidation();
		if(rootScope.RakPageValidation){
		self.RAKConnectModel.newAlertDataArray[self.RAKConnectModel.editableAlertIndex].alertTypeIndex = self.RAKConnectModel.selectedAlertType;
		self.RAKConnectModel.newAlertDataArray[self.RAKConnectModel.editableAlertIndex].accIndex = self.RAKConnectModel.selectedAccNum;
		self.RAKConnectModel.newAlertDataArray[self.RAKConnectModel.editableAlertIndex].ccIndex = self.RAKConnectModel.selectedCCNum;
		self.RAKConnectModel.newAlertDataArray[self.RAKConnectModel.editableAlertIndex].freqType = self.RAKConnectModel.selectedFreq;
		self.RAKConnectModel.newAlertDataArray[self.RAKConnectModel.editableAlertIndex].freqTypeCode = self.RAKConnectModel.selectedFreqCode;
		self.RAKConnectModel.newAlertDataArray[self.RAKConnectModel.editableAlertIndex].selDom = self.RAKConnectModel.selectedDom;
		self.RAKConnectModel.newAlertDataArray[self.RAKConnectModel.editableAlertIndex].selDow = self.RAKConnectModel.dowArray;
		}
	};
	self.deleteNewlyAddedAlert = function(indexVal){
		self.RAKConnectModel.newAlertDataArray.splice(indexVal, 1);
		scope.setEvent('onRAKConnectNewAlertsDelClick');
	};
	self.resetRAKConnectNewAlertData = function(){
		self.RAKConnectModel.selectedAlertType = "";
		self.RAKConnectModel.selectedAccNum = "";
		self.RAKConnectModel.selectedCCNum = "";
		self.RAKConnectModel.selectedFreq = "";
		self.RAKConnectModel.selectedFreqCode = "";
		self.RAKConnectModel.selectedDom = "";
		self.RAKConnectModel.selectedDayOfWeekList = [];
		self.RAKConnectModel.dowArray = new Array();
		self.RAKConnectModel.isAlertTypeValidatnRqd = false;
		self.RAKConnectModel.isAccValidatnRqd = false;
		self.RAKConnectModel.isCcValidatnRqd = false;
		self.RAKConnectModel.isFreqValidatnRqd = false;
		self.RAKConnectModel.isDomValidatnRqd = false;
		self.RAKConnectModel.isDowValidatnRqd = false;
		self.RAKConnectModel.pageValidation = false;
	};
	self.loadEditPageData = function(){
		self.RAKConnectModel.selectedAlertType = self.RAKConnectModel.newAlertDataArray[self.RAKConnectModel.editableAlertIndex].alertTypeIndex;
		self.RAKConnectModel.selectedAccNum = self.RAKConnectModel.newAlertDataArray[self.RAKConnectModel.editableAlertIndex].accIndex;
		self.RAKConnectModel.selectedCCNum = self.RAKConnectModel.newAlertDataArray[self.RAKConnectModel.editableAlertIndex].ccIndex;
		self.RAKConnectModel.selectedFreq = self.RAKConnectModel.newAlertDataArray[self.RAKConnectModel.editableAlertIndex].freqType;
		self.RAKConnectModel.selectedFreqCode = self.RAKConnectModel.newAlertDataArray[self.RAKConnectModel.editableAlertIndex].freqTypeCode;
		self.RAKConnectModel.selectedDom = self.RAKConnectModel.newAlertDataArray[self.RAKConnectModel.editableAlertIndex].selDom;
		self.RAKConnectModel.dowArray = self.RAKConnectModel.newAlertDataArray[self.RAKConnectModel.editableAlertIndex].selDow;
	};
	self.activateSetupNewAlertsTab = function(){
		self.RAKConnectModel.rakConnSetupNewAlert = true;
		self.RAKConnectModel.rakConnManageExisting = false;
	};
	self.activateManageExistingTab = function(){
		self.fillCustomAlertArray();
		self.RAKConnectModel.rakConnSetupNewAlert = false;
		self.RAKConnectModel.rakConnManageExisting = true;
	};
	self.fillCustomAlertArray = function(isReload){
	
		if(self.RAKConnectModel.customAlertDataArray.length == 0) {
		for (var k = 0 ; k<(self.RAKConnectModel.customAlertList).length; k++){
			(self.RAKConnectModel.customAlertDataArray).push({
				subAlertID:self.RAKConnectModel.customAlertList[k].subAlertID,
				subAlertIDType:self.RAKConnectModel.customAlertList[k].subAlertIDType,
				subAlertIDDesccription:self.RAKConnectModel.customAlertList[k].subAlertIDDesccription,
				subAccountID:self.RAKConnectModel.customAlertList[k].subAlertIndex,
				subAlertFreq:self.RAKConnectModel.customAlertList[k].subAlertFreq,
				subDay:self.RAKConnectModel.customAlertList[k].subDay,
				subMonday:self.RAKConnectModel.customAlertList[k].subMonday,
				subTuesday:self.RAKConnectModel.customAlertList[k].subTuesday,
				subWednesday:self.RAKConnectModel.customAlertList[k].subWednesday,
				subThursday:self.RAKConnectModel.customAlertList[k].subThursday,
				subFriday:self.RAKConnectModel.customAlertList[k].subFriday,
				subSaturday:self.RAKConnectModel.customAlertList[k].subSaturday,
				subSunday:self.RAKConnectModel.customAlertList[k].subSunday,
				subRemarks:self.RAKConnectModel.customAlertList[k].subRemarks,
				subRemove:self.RAKConnectModel.customAlertList[k].subRemove,
				subDbts:self.RAKConnectModel.customAlertList[k].subDbts,
				subHostId:self.RAKConnectModel.customAlertList[k].subHostId,
				subDcId:self.RAKConnectModel.customAlertList[k].subDcId,
				subLangId:self.RAKConnectModel.customAlertList[k].subLangId,
				subChannelInfoString:self.RAKConnectModel.customAlertList[k].subChannelInfoString,
				subInputParamString:self.RAKConnectModel.customAlertList[k].subInputParamString,
				subAlertIndex:self.RAKConnectModel.customAlertList[k].subAlertIndex
			});
		}
		}
		
		else{
			self.RAKConnectModel.customAlertDataArray=new Array();
			for (var k = 0 ; k<(self.RAKConnectModel.customAlertList).length; k++){
				(self.RAKConnectModel.customAlertDataArray).push({
					subAlertID:self.RAKConnectModel.customAlertList[k].subAlertID,
					subAlertIDType:self.RAKConnectModel.customAlertList[k].subAlertIDType,
					subAlertIDDesccription:self.RAKConnectModel.customAlertList[k].subAlertIDDesccription,
					subAccountID:self.RAKConnectModel.customAlertList[k].subAlertIndex,
					subAlertFreq:self.RAKConnectModel.customAlertList[k].subAlertFreq,
					subDay:self.RAKConnectModel.customAlertList[k].subDay,
					subMonday:self.RAKConnectModel.customAlertList[k].subMonday,
					subTuesday:self.RAKConnectModel.customAlertList[k].subTuesday,
					subWednesday:self.RAKConnectModel.customAlertList[k].subWednesday,
					subThursday:self.RAKConnectModel.customAlertList[k].subThursday,
					subFriday:self.RAKConnectModel.customAlertList[k].subFriday,
					subSaturday:self.RAKConnectModel.customAlertList[k].subSaturday,
					subSunday:self.RAKConnectModel.customAlertList[k].subSunday,
					subRemarks:self.RAKConnectModel.customAlertList[k].subRemarks,
					subRemove:self.RAKConnectModel.customAlertList[k].subRemove,
					subDbts:self.RAKConnectModel.customAlertList[k].subDbts,
					subHostId:self.RAKConnectModel.customAlertList[k].subHostId,
					subDcId:self.RAKConnectModel.customAlertList[k].subDcId,
					subLangId:self.RAKConnectModel.customAlertList[k].subLangId,
					subChannelInfoString:self.RAKConnectModel.customAlertList[k].subChannelInfoString,
					subInputParamString:self.RAKConnectModel.customAlertList[k].subInputParamString,
					subAlertIndex:self.RAKConnectModel.customAlertList[k].subAlertIndex
				});
			}
		}
	};
	self.createFinalSubmitArray = function(){
		/** self.RAKConnectModel.finalSubmitArray  --> This array needs to
		 * be filled and send to EB. This array must have details of New Alerts array
		 * and Existing Alerts array.
		 */
		self.RAKConnectModel.finalSubmitArray = new Array(); //Always initialize before filling

		/**
		 * First fill the final submit array with new alerts
		 */
		for (var k = 0 ; k<(self.RAKConnectModel.newAlertDataArray).length; k++){
			(self.RAKConnectModel.finalSubmitArray).push({
				finalAlertID:self.RAKConnectModel.newAlertDataArray[k].alertId,
				finalAlertIDDesc:self.RAKConnectModel.newAlertDataArray[k].alertType,
				finalAlertIDType:self.RAKConnectModel.newAlertDataArray[k].alertCode,
				finalAlertCode:self.RAKConnectModel.newAlertDataArray[k].alertCode,
				finalAccountID:self.RAKConnectModel.newAlertDataArray[k].accOrCcNo,
				finalAlertFreq:self.RAKConnectModel.newAlertDataArray[k].freqTypeCode,
				finalDay:self.RAKConnectModel.newAlertDataArray[k].selDom,
				finalMonday:self.RAKConnectModel.newAlertDataArray[k].selDow[0].flag,
				finalTuesday:self.RAKConnectModel.newAlertDataArray[k].selDow[1].flag,
				finalWednesday:self.RAKConnectModel.newAlertDataArray[k].selDow[2].flag,
				finalThursday:self.RAKConnectModel.newAlertDataArray[k].selDow[3].flag,
				finalFriday:self.RAKConnectModel.newAlertDataArray[k].selDow[4].flag,
				finalSaturday:self.RAKConnectModel.newAlertDataArray[k].selDow[5].flag,
				finalSunday:self.RAKConnectModel.newAlertDataArray[k].selDow[6].flag,
				finalRemarks:"New",
				finalRemove:"N",
				finalDbts:self.RAKConnectModel.newAlertDataArray[k].alertDbts,
				finalHostId:self.RAKConnectModel.newAlertDataArray[k].alertHostId,
				finalDcId:self.RAKConnectModel.newAlertDataArray[k].alertDcId,
				finalLangId:self.RAKConnectModel.newAlertDataArray[k].alertLangId,
				finalChannelInfoString:self.RAKConnectModel.newAlertDataArray[k].alertChannelInfoString,
				finalInputParamString:self.RAKConnectModel.newAlertDataArray[k].alertInputParamString
			});
		}

		function checkForExisitingAlert(alertIdDesc,accountIndex){
			var isExist=false;
			for(var temp=0; temp <(self.RAKConnectModel.finalSubmitArray).length;temp++){
				if(self.RAKConnectModel.finalSubmitArray[temp].finalAlertIDDesc==alertIdDesc && self.RAKConnectModel.finalSubmitArray[temp].finalAccountID==accountIndex){
					isExist=true;
					break;
				}
				
			}
			return isExist;
		}
		// changes for fix
		
		self.RAKConnectModel.newAlertDataArray = new Array();
		// changes for fix
		
		/**
		 * Now add the existing alerts in the final submit array
		 */
		for (var k = 0 ; k<(self.RAKConnectModel.customAlertDataArray).length; k++){
			
			var checkforExisiting=false;
			checkforExisiting=checkForExisitingAlert(self.RAKConnectModel.customAlertDataArray[k].subAlertIDDesccription,self.RAKConnectModel.customAlertDataArray[k].subAccountID);
			
			if(!checkforExisiting){
			(self.RAKConnectModel.finalSubmitArray).push({
				finalAlertID:self.RAKConnectModel.customAlertDataArray[k].subAlertID,
				finalAlertIDType:self.RAKConnectModel.customAlertDataArray[k].subAlertIDType,
				finalAlertIDDesc:self.RAKConnectModel.customAlertDataArray[k].subAlertIDDesccription,
				finalAlertCode:"",
				finalAccountID:self.RAKConnectModel.customAlertDataArray[k].subAccountID,
				finalAlertFreq:self.RAKConnectModel.customAlertDataArray[k].subAlertFreq,
				finalDay:self.RAKConnectModel.customAlertDataArray[k].subDay,
				finalMonday:self.RAKConnectModel.customAlertDataArray[k].subMonday,
				finalTuesday:self.RAKConnectModel.customAlertDataArray[k].subTuesday,
				finalWednesday:self.RAKConnectModel.customAlertDataArray[k].subWednesday,
				finalThursday:self.RAKConnectModel.customAlertDataArray[k].subThursday,
				finalFriday:self.RAKConnectModel.customAlertDataArray[k].subFriday,
				finalSaturday:self.RAKConnectModel.customAlertDataArray[k].subSaturday,
				finalSunday:self.RAKConnectModel.customAlertDataArray[k].subSunday,
				finalRemarks:self.RAKConnectModel.customAlertDataArray[k].subRemarks,
				finalRemove:self.RAKConnectModel.customAlertDataArray[k].subRemove,
				finalDbts:self.RAKConnectModel.customAlertDataArray[k].subDbts,
				finalHostId:self.RAKConnectModel.customAlertDataArray[k].subHostId,
				finalDcId:self.RAKConnectModel.customAlertDataArray[k].subDcId,
				finalLangId:self.RAKConnectModel.customAlertDataArray[k].subLangId,
				finalChannelInfoString:self.RAKConnectModel.customAlertDataArray[k].subChannelInfoString,
				finalInputParamString:self.RAKConnectModel.customAlertDataArray[k].subInputParamString
			});
			}
		}
	};
	self.createFinalVarsToSend = function(){
		var seperator = ": ";
		var space = " ";
		for (var k = 0 ; k<(self.RAKConnectModel.finalSubmitArray).length; k++){
			if(k == 0){
				self.RAKConnectModel.finalAlertID2Send = space+self.RAKConnectModel.finalSubmitArray[k].finalAlertID;
				self.RAKConnectModel.finalAlertID2SendType = space+self.RAKConnectModel.finalSubmitArray[k].finalAlertIDType;
				self.RAKConnectModel.finalAlertIDDesc2Send = space+self.RAKConnectModel.finalSubmitArray[k].finalAlertIDDesc;
				self.RAKConnectModel.finalAlertCode2Send = space+self.RAKConnectModel.finalSubmitArray[k].finalAlertCode;
				self.RAKConnectModel.finalAccountID2Send = space+self.RAKConnectModel.finalSubmitArray[k].finalAccountID;
				self.RAKConnectModel.finalAlertFreq2Send = space+self.RAKConnectModel.finalSubmitArray[k].finalAlertFreq;
				self.RAKConnectModel.finalDay2Send = space+self.RAKConnectModel.finalSubmitArray[k].finalDay;
				self.RAKConnectModel.finalMonday2Send = space+self.RAKConnectModel.finalSubmitArray[k].finalMonday;
				self.RAKConnectModel.finalTuesday2Send = space+self.RAKConnectModel.finalSubmitArray[k].finalTuesday;
				self.RAKConnectModel.finalWednesday2Send = space+self.RAKConnectModel.finalSubmitArray[k].finalWednesday;
				self.RAKConnectModel.finalThursday2Send = space+self.RAKConnectModel.finalSubmitArray[k].finalThursday;
				self.RAKConnectModel.finalFriday2Send = space+self.RAKConnectModel.finalSubmitArray[k].finalFriday;
				self.RAKConnectModel.finalSaturday2Send = space+self.RAKConnectModel.finalSubmitArray[k].finalSaturday;
				self.RAKConnectModel.finalSunday2Send = space+self.RAKConnectModel.finalSubmitArray[k].finalSunday;
				self.RAKConnectModel.finalRemarks2Send = space+self.RAKConnectModel.finalSubmitArray[k].finalRemarks;
				self.RAKConnectModel.finalRemove2Send = space+self.RAKConnectModel.finalSubmitArray[k].finalRemove;
				self.RAKConnectModel.finalDbts2Send = space+self.RAKConnectModel.finalSubmitArray[k].finalDbts;
				self.RAKConnectModel.finalHostId2Send = space+self.RAKConnectModel.finalSubmitArray[k].finalHostId;
				self.RAKConnectModel.finalDcId2Send = space+self.RAKConnectModel.finalSubmitArray[k].finalDcId;
				self.RAKConnectModel.finalLangId2Send = space+self.RAKConnectModel.finalSubmitArray[k].finalLangId;
				self.RAKConnectModel.finalChannelInfoString2Send = space+self.RAKConnectModel.finalSubmitArray[k].finalChannelInfoString;
				self.RAKConnectModel.finalInputParamString2Send = space+self.RAKConnectModel.finalSubmitArray[k].finalInputParamString;
			}
			else {
				self.RAKConnectModel.finalAlertID2Send = space+self.RAKConnectModel.finalAlertID2Send+seperator+self.RAKConnectModel.finalSubmitArray[k].finalAlertID;
				self.RAKConnectModel.finalAlertID2SendType = space+self.RAKConnectModel.finalAlertID2SendType+seperator+self.RAKConnectModel.finalSubmitArray[k].finalAlertIDType;
				self.RAKConnectModel.finalAlertIDDesc2Send = space+self.RAKConnectModel.finalAlertIDDesc2Send+seperator+self.RAKConnectModel.finalSubmitArray[k].finalAlertIDDesc;
				self.RAKConnectModel.finalAlertCode2Send = space+self.RAKConnectModel.finalAlertCode2Send+seperator+self.RAKConnectModel.finalSubmitArray[k].finalAlertCode;
				self.RAKConnectModel.finalAccountID2Send = space+self.RAKConnectModel.finalAccountID2Send+seperator+self.RAKConnectModel.finalSubmitArray[k].finalAccountID;
				self.RAKConnectModel.finalAlertFreq2Send = space+self.RAKConnectModel.finalAlertFreq2Send+seperator+self.RAKConnectModel.finalSubmitArray[k].finalAlertFreq;
				self.RAKConnectModel.finalDay2Send = space+self.RAKConnectModel.finalDay2Send+seperator+self.RAKConnectModel.finalSubmitArray[k].finalDay;
				self.RAKConnectModel.finalMonday2Send = space+self.RAKConnectModel.finalMonday2Send+seperator+self.RAKConnectModel.finalSubmitArray[k].finalMonday;
				self.RAKConnectModel.finalTuesday2Send = space+self.RAKConnectModel.finalTuesday2Send+seperator+self.RAKConnectModel.finalSubmitArray[k].finalTuesday;
				self.RAKConnectModel.finalWednesday2Send = space+self.RAKConnectModel.finalWednesday2Send+seperator+self.RAKConnectModel.finalSubmitArray[k].finalWednesday;
				self.RAKConnectModel.finalThursday2Send = space+self.RAKConnectModel.finalThursday2Send+seperator+self.RAKConnectModel.finalSubmitArray[k].finalThursday;
				self.RAKConnectModel.finalFriday2Send = space+self.RAKConnectModel.finalFriday2Send+seperator+self.RAKConnectModel.finalSubmitArray[k].finalFriday;
				self.RAKConnectModel.finalSaturday2Send = space+self.RAKConnectModel.finalSaturday2Send+seperator+self.RAKConnectModel.finalSubmitArray[k].finalSaturday;
				self.RAKConnectModel.finalSunday2Send = space+self.RAKConnectModel.finalSunday2Send+seperator+self.RAKConnectModel.finalSubmitArray[k].finalSunday;
				self.RAKConnectModel.finalRemarks2Send = space+self.RAKConnectModel.finalRemarks2Send+seperator+self.RAKConnectModel.finalSubmitArray[k].finalRemarks;
				self.RAKConnectModel.finalRemove2Send = space+self.RAKConnectModel.finalRemove2Send+seperator+self.RAKConnectModel.finalSubmitArray[k].finalRemove;
				self.RAKConnectModel.finalDbts2Send = space+self.RAKConnectModel.finalDbts2Send+seperator+self.RAKConnectModel.finalSubmitArray[k].finalDbts;
				self.RAKConnectModel.finalHostId2Send = space+self.RAKConnectModel.finalHostId2Send+seperator+self.RAKConnectModel.finalSubmitArray[k].finalHostId;
				self.RAKConnectModel.finalDcId2Send = space+self.RAKConnectModel.finalDcId2Send+seperator+self.RAKConnectModel.finalSubmitArray[k].finalDcId;
				self.RAKConnectModel.finalLangId2Send = space+self.RAKConnectModel.finalLangId2Send+seperator+self.RAKConnectModel.finalSubmitArray[k].finalLangId;
				self.RAKConnectModel.finalChannelInfoString2Send = space+self.RAKConnectModel.finalChannelInfoString2Send+seperator+self.RAKConnectModel.finalSubmitArray[k].finalChannelInfoString;
				self.RAKConnectModel.finalInputParamString2Send = space+self.RAKConnectModel.finalInputParamString2Send+seperator+self.RAKConnectModel.finalSubmitArray[k].finalInputParamString;
			}
		}
		self.RAKConnectModel.finalMonday2Send = self.RAKConnectModel.finalMonday2Send.replace(/true/g, "Y");
		self.RAKConnectModel.finalMonday2Send = self.RAKConnectModel.finalMonday2Send.replace(/false/g, "N");

		self.RAKConnectModel.finalTuesday2Send = self.RAKConnectModel.finalTuesday2Send.replace(/true/g, "Y");
		self.RAKConnectModel.finalTuesday2Send = self.RAKConnectModel.finalTuesday2Send.replace(/false/g, "N");

		self.RAKConnectModel.finalWednesday2Send = self.RAKConnectModel.finalWednesday2Send.replace(/true/g, "Y");
		self.RAKConnectModel.finalWednesday2Send = self.RAKConnectModel.finalWednesday2Send.replace(/false/g, "N");

		self.RAKConnectModel.finalThursday2Send = self.RAKConnectModel.finalThursday2Send.replace(/true/g, "Y");
		self.RAKConnectModel.finalThursday2Send = self.RAKConnectModel.finalThursday2Send.replace(/false/g, "N");

		self.RAKConnectModel.finalFriday2Send = self.RAKConnectModel.finalFriday2Send.replace(/true/g, "Y");
		self.RAKConnectModel.finalFriday2Send = self.RAKConnectModel.finalFriday2Send.replace(/false/g, "N");

		self.RAKConnectModel.finalSaturday2Send = self.RAKConnectModel.finalSaturday2Send.replace(/true/g, "Y");
		self.RAKConnectModel.finalSaturday2Send = self.RAKConnectModel.finalSaturday2Send.replace(/false/g, "N");

		self.RAKConnectModel.finalSunday2Send = self.RAKConnectModel.finalSunday2Send.replace(/true/g, "Y");
		self.RAKConnectModel.finalSunday2Send = self.RAKConnectModel.finalSunday2Send.replace(/false/g, "N");

	};
	self.calcEverythingForFinalSubmit = function(){
		self.createFinalSubmitArray();
		self.createFinalVarsToSend();
	};
	self.loadCustomAlertEditPageData = function(){
		self.RAKConnectModel.selectedSubAlertID = self.RAKConnectModel.customAlertDataArray[self.RAKConnectModel.editableCustomAlertIndex].subAlertID;
		self.RAKConnectModel.selectedSubAlertIDType = self.RAKConnectModel.customAlertDataArray[self.RAKConnectModel.editableCustomAlertIndex].subAlertIDType;
		self.RAKConnectModel.selectedAlertIDDesccription = self.RAKConnectModel.customAlertDataArray[self.RAKConnectModel.editableCustomAlertIndex].subAlertIDDesccription;
		self.RAKConnectModel.selectedSubAccountID = self.RAKConnectModel.customAlertDataArray[self.RAKConnectModel.editableCustomAlertIndex].subAccountID;
		self.RAKConnectModel.selectedSubAlertFreq = self.RAKConnectModel.customAlertDataArray[self.RAKConnectModel.editableCustomAlertIndex].subAlertFreq;
		self.RAKConnectModel.selectedSubAlertFreqDesc = self.detectFreqDescSelected(self.RAKConnectModel.selectedSubAlertFreq);
		self.RAKConnectModel.selectedSubDay = self.RAKConnectModel.customAlertDataArray[self.RAKConnectModel.editableCustomAlertIndex].subDay;
		self.RAKConnectModel.selectedSubMonday = self.RAKConnectModel.customAlertDataArray[self.RAKConnectModel.editableCustomAlertIndex].subMonday;
		self.RAKConnectModel.selectedSubTuesday = self.RAKConnectModel.customAlertDataArray[self.RAKConnectModel.editableCustomAlertIndex].subTuesday;
		self.RAKConnectModel.selectedSubWednesday = self.RAKConnectModel.customAlertDataArray[self.RAKConnectModel.editableCustomAlertIndex].subWednesday;
		self.RAKConnectModel.selectedSubThursday = self.RAKConnectModel.customAlertDataArray[self.RAKConnectModel.editableCustomAlertIndex].subThursday;
		self.RAKConnectModel.selectedSubFriday = self.RAKConnectModel.customAlertDataArray[self.RAKConnectModel.editableCustomAlertIndex].subFriday;
		self.RAKConnectModel.selectedSubSaturday = self.RAKConnectModel.customAlertDataArray[self.RAKConnectModel.editableCustomAlertIndex].subSaturday;
		self.RAKConnectModel.selectedSubSunday = self.RAKConnectModel.customAlertDataArray[self.RAKConnectModel.editableCustomAlertIndex].subSunday;
		self.RAKConnectModel.selectedSubRemarks = self.RAKConnectModel.customAlertDataArray[self.RAKConnectModel.editableCustomAlertIndex].subRemarks;
		self.RAKConnectModel.selectedSubRemove = self.RAKConnectModel.customAlertDataArray[self.RAKConnectModel.editableCustomAlertIndex].subRemove;
	};
	self.updateCustomAlertData = function(){
		self.RAKConnectModel.customAlertDataArray[self.RAKConnectModel.editableCustomAlertIndex].subAlertID = self.RAKConnectModel.selectedSubAlertID;
		self.RAKConnectModel.customAlertDataArray[self.RAKConnectModel.editableCustomAlertIndex].subAlertIDType = self.RAKConnectModel.selectedSubAlertIDType;
		self.RAKConnectModel.customAlertDataArray[self.RAKConnectModel.editableCustomAlertIndex].subAlertIDDesccription = self.RAKConnectModel.selectedAlertIDDesccription;
		self.RAKConnectModel.customAlertDataArray[self.RAKConnectModel.editableCustomAlertIndex].subAccountID = self.RAKConnectModel.selectedSubAccountID;
		self.RAKConnectModel.customAlertDataArray[self.RAKConnectModel.editableCustomAlertIndex].subAlertFreq = self.RAKConnectModel.selectedSubAlertFreq;
		self.RAKConnectModel.customAlertDataArray[self.RAKConnectModel.editableCustomAlertIndex].subDay = self.RAKConnectModel.selectedSubDay;
		self.RAKConnectModel.customAlertDataArray[self.RAKConnectModel.editableCustomAlertIndex].subMonday = (self.RAKConnectModel.dowArrayCustom[0].flag == "true" || self.RAKConnectModel.dowArrayCustom[0].flag == true)?"Y":"N";
		self.RAKConnectModel.customAlertDataArray[self.RAKConnectModel.editableCustomAlertIndex].subTuesday = (self.RAKConnectModel.dowArrayCustom[1].flag == "true" || self.RAKConnectModel.dowArrayCustom[1].flag == true)?"Y":"N";
		self.RAKConnectModel.customAlertDataArray[self.RAKConnectModel.editableCustomAlertIndex].subWednesday = (self.RAKConnectModel.dowArrayCustom[2].flag == "true" || self.RAKConnectModel.dowArrayCustom[2].flag == true)?"Y":"N";
		self.RAKConnectModel.customAlertDataArray[self.RAKConnectModel.editableCustomAlertIndex].subThursday = (self.RAKConnectModel.dowArrayCustom[3].flag == "true" || self.RAKConnectModel.dowArrayCustom[3].flag == true)?"Y":"N";
		self.RAKConnectModel.customAlertDataArray[self.RAKConnectModel.editableCustomAlertIndex].subFriday = (self.RAKConnectModel.dowArrayCustom[4].flag == "true" || self.RAKConnectModel.dowArrayCustom[4].flag == true)?"Y":"N";
		self.RAKConnectModel.customAlertDataArray[self.RAKConnectModel.editableCustomAlertIndex].subSaturday = (self.RAKConnectModel.dowArrayCustom[5].flag == "true" || self.RAKConnectModel.dowArrayCustom[5].flag == true)?"Y":"N";
		self.RAKConnectModel.customAlertDataArray[self.RAKConnectModel.editableCustomAlertIndex].subSunday = (self.RAKConnectModel.dowArrayCustom[6].flag == "true" || self.RAKConnectModel.dowArrayCustom[6].flag == true)?"Y":"N";
		self.RAKConnectModel.customAlertDataArray[self.RAKConnectModel.editableCustomAlertIndex].subRemarks = self.RAKConnectModel.selectedSubRemarks;
	};
	self.modifyCustomAlertData = function(){
		if(rootScope.RakPageValidation){
		self.updateCustomAlertData();
		self.RAKConnectModel.customAlertDataArray[self.RAKConnectModel.editableCustomAlertIndex].subRemove = self.RAKConnectModel.selectedSubRemove;
		}
	};
	self.deleteCustomAlertData = function(){
		self.updateCustomAlertData();
		self.RAKConnectModel.customAlertDataArray[self.RAKConnectModel.editableCustomAlertIndex].subRemove = "Y";
	};
	self.detectFreqDescSelected = function(freqCode){

		var freqDesc = "";

		if(freqCode == 'D')
			freqDesc = "Daily";
		else if(freqCode == 'M')
			freqDesc = "Monthly";
		else if(freqCode == 'W')
			freqDesc = "Weekly";
		else
			freqDesc = "Realtime";

		return freqDesc;
	};
	self.detectCustomFreqCodeSelected = function(){
		if(self.RAKConnectModel.selectedSubAlertFreqDesc == 'Daily')
			self.RAKConnectModel.selectedSubAlertFreq = "D";
		else if(self.RAKConnectModel.selectedSubAlertFreqDesc == 'Monthly')
			self.RAKConnectModel.selectedSubAlertFreq = "M";
		else if(self.RAKConnectModel.selectedSubAlertFreqDesc == 'Weekly')
			self.RAKConnectModel.selectedSubAlertFreq = "W";
		else
			self.RAKConnectModel.selectedSubAlertFreq = "R";
	};
	self.fetchDaysOfWeekCustomAlerts = function(){
		self.RAKConnectModel.dowArrayCustom = new Array();
		var flagTrue = "Y";
		if(self.RAKConnectModel.selectedSubMonday == flagTrue){
			(self.RAKConnectModel.dowArrayCustom).push({
				dayOfWeekDesc:"Monday",
				dayOfWeekCode:"Monday",
				flag:true
			});
		}
		else {
			(self.RAKConnectModel.dowArrayCustom).push({
				dayOfWeekDesc:"Monday",
				dayOfWeekCode:"Monday",
				flag:false
			});
		}
		if(self.RAKConnectModel.selectedSubTuesday == flagTrue){
			(self.RAKConnectModel.dowArrayCustom).push({
				dayOfWeekDesc:"Tuesday",
				dayOfWeekCode:"Tuesday",
				flag:true
			});
		}
		else {
			(self.RAKConnectModel.dowArrayCustom).push({
				dayOfWeekDesc:"Tuesday",
				dayOfWeekCode:"Tuesday",
				flag:false
			});
		}
		if(self.RAKConnectModel.selectedSubWednesday == flagTrue){
			(self.RAKConnectModel.dowArrayCustom).push({
				dayOfWeekDesc:"Wednesday",
				dayOfWeekCode:"Wednesday",
				flag:true
			});
		}
		else {
			(self.RAKConnectModel.dowArrayCustom).push({
				dayOfWeekDesc:"Wednesday",
				dayOfWeekCode:"Wednesday",
				flag:false
			});
		}
		if(self.RAKConnectModel.selectedSubThursday == flagTrue){
			(self.RAKConnectModel.dowArrayCustom).push({
				dayOfWeekDesc:"Thursday",
				dayOfWeekCode:"Thursday",
				flag:true
			});
		}
		else {
			(self.RAKConnectModel.dowArrayCustom).push({
				dayOfWeekDesc:"Thursday",
				dayOfWeekCode:"Thursday",
				flag:false
			});
		}
		if(self.RAKConnectModel.selectedSubFriday == flagTrue){
			(self.RAKConnectModel.dowArrayCustom).push({
				dayOfWeekDesc:"Friday",
				dayOfWeekCode:"Friday",
				flag:true
			});
		}
		else {
			(self.RAKConnectModel.dowArrayCustom).push({
				dayOfWeekDesc:"Friday",
				dayOfWeekCode:"Friday",
				flag:false
			});
		}
		if(self.RAKConnectModel.selectedSubSaturday == flagTrue){
			(self.RAKConnectModel.dowArrayCustom).push({
				dayOfWeekDesc:"Saturday",
				dayOfWeekCode:"Saturday",
				flag:true
			});
		}
		else {
			(self.RAKConnectModel.dowArrayCustom).push({
				dayOfWeekDesc:"Saturday",
				dayOfWeekCode:"Saturday",
				flag:false
			});
		}
		if(self.RAKConnectModel.selectedSubSunday == flagTrue){
			(self.RAKConnectModel.dowArrayCustom).push({
				dayOfWeekDesc:"Sunday",
				dayOfWeekCode:"Sunday",
				flag:true
			});
		}
		else {
			(self.RAKConnectModel.dowArrayCustom).push({
				dayOfWeekDesc:"Sunday",
				dayOfWeekCode:"Sunday",
				flag:false
			});
		}
	};
	self.initRAKConnectSuccess = function(responsesList) {
		if (!responsesList[0].hasOwnProperty('errorMessage'))
			self.RAKConnectModel.successMessage = responsesList[0].successMsg;
	};
	self.detectIfAlreadyPresentAlertAll = function(){
		var presenceCounterAcc = 0;
		var presenceCounterCc = 0;

		var isPresentAcc = true;
		var isPresentCc = true;
		self.detectFreqCodeSelected();
		if(self.RAKConnectModel.selectedCCNum != "0"){
			for (var j = 1 ; j<(self.RAKConnectModel.OprAccList).length; j++){
				presenceCounterAcc = 0;
				for (var k = 0 ; k<(self.RAKConnectModel.newAlertDataArray).length; k++){
					if(self.RAKConnectModel.selectedAlertType == self.RAKConnectModel.newAlertDataArray[k].alertTypeIndex
							&& self.RAKConnectModel.OprAccList[j].accountIndex == self.RAKConnectModel.newAlertDataArray[k].accIndex){
						presenceCounterAcc++;
					}
				}
				if(presenceCounterAcc == 0){
					isPresentAcc = false;
					(self.RAKConnectModel.newAlertDataArray).push({
						alertType:self.RAKConnectModel.alertTypeList[self.RAKConnectModel.selectedAlertType].alertTypeDesc,
						alertId:self.RAKConnectModel.alertTypeList[self.RAKConnectModel.selectedAlertType].alertTypeID,
						alertCode:self.RAKConnectModel.alertTypeList[self.RAKConnectModel.selectedAlertType].alertTypeCode,
						alertTypeIndex:self.RAKConnectModel.selectedAlertType,
						accountNum:self.RAKConnectModel.OprAccList[j].acctTypeDesc + " - " +
						self.RAKConnectModel.OprAccList[j].accountNumber,
						accIndex:self.RAKConnectModel.OprAccList[j].accountIndex,
						ccNum:"",
						ccIndex:"",
						accOrCcNo:self.RAKConnectModel.OprAccList[j].accIDIndex,
						freqType:self.RAKConnectModel.selectedFreq,
						freqTypeCode:self.RAKConnectModel.selectedFreqCode,
						selDom:self.RAKConnectModel.selectedDom,
						selDow:self.RAKConnectModel.dowArray,
						alertDbts:self.RAKConnectModel.alertTypeList[self.RAKConnectModel.selectedAlertType].alertTypeDbts,
						alertHostId:self.RAKConnectModel.alertTypeList[self.RAKConnectModel.selectedAlertType].alertTypeHostId,
						alertDcId:self.RAKConnectModel.alertTypeList[self.RAKConnectModel.selectedAlertType].alertTypeDcId,
						alertLangId:self.RAKConnectModel.alertTypeList[self.RAKConnectModel.selectedAlertType].alertTypeLangId,
						alertChannelInfoString:self.RAKConnectModel.alertTypeList[self.RAKConnectModel.selectedAlertType].alertTypeChannelInfoString,
						alertInputParamString:self.RAKConnectModel.alertTypeList[self.RAKConnectModel.selectedAlertType].alertTypeInputParamString,
						newAlCounter:self.RAKConnectModel.newAlertCounter
					});
				}

			}
			if(isPresentAcc){
				rootScope.showErrorPopup(rootScope.appLiterals.APP.RAKCONNECT.ALERT_ALREADY_PRESENT_FOR_ALL_ERR_MSG);
				return;
			}
		}
		if(self.RAKConnectModel.selectedAccNum != "0"){
			for (var j = 1 ; j<(self.RAKConnectModel.CreditCardList).length; j++){
				presenceCounterCc = 0;
				for (var k = 0 ; k<(self.RAKConnectModel.newAlertDataArray).length; k++){
					if(self.RAKConnectModel.selectedAlertType == self.RAKConnectModel.newAlertDataArray[k].alertTypeIndex
							&& self.RAKConnectModel.CreditCardList[j].creditcardIndex == self.RAKConnectModel.newAlertDataArray[k].ccIndex){
						presenceCounterCc++;
					}
				}
				if(presenceCounterCc == 0){
					isPresentCc = false;
					(self.RAKConnectModel.newAlertDataArray).push({
						alertType:self.RAKConnectModel.alertTypeList[self.RAKConnectModel.selectedAlertType].alertTypeDesc,
						alertId:self.RAKConnectModel.alertTypeList[self.RAKConnectModel.selectedAlertType].alertTypeID,
						alertCode:self.RAKConnectModel.alertTypeList[self.RAKConnectModel.selectedAlertType].alertTypeCode,
						alertTypeIndex:self.RAKConnectModel.selectedAlertType,
						accountNum:"",
						accIndex:"",
						ccNum:self.RAKConnectModel.CreditCardList[j].creditcardNumber,
						ccIndex:self.RAKConnectModel.CreditCardList[j].creditcardIndex,
						accOrCcNo:self.RAKConnectModel.CreditCardList[j].ccIDIndex,
						freqType:self.RAKConnectModel.selectedFreq,
						freqTypeCode:self.RAKConnectModel.selectedFreqCode,
						selDom:self.RAKConnectModel.selectedDom,
						selDow:self.RAKConnectModel.dowArray,
						alertDbts:self.RAKConnectModel.alertTypeList[self.RAKConnectModel.selectedAlertType].alertTypeDbts,
						alertHostId:self.RAKConnectModel.alertTypeList[self.RAKConnectModel.selectedAlertType].alertTypeHostId,
						alertDcId:self.RAKConnectModel.alertTypeList[self.RAKConnectModel.selectedAlertType].alertTypeDcId,
						alertLangId:self.RAKConnectModel.alertTypeList[self.RAKConnectModel.selectedAlertType].alertTypeLangId,
						alertChannelInfoString:self.RAKConnectModel.alertTypeList[self.RAKConnectModel.selectedAlertType].alertTypeChannelInfoString,
						alertInputParamString:self.RAKConnectModel.alertTypeList[self.RAKConnectModel.selectedAlertType].alertTypeInputParamString,
						newAlCounter:self.RAKConnectModel.newAlertCounter
					});
				}

			}
			if(isPresentCc){
				rootScope.showErrorPopup(rootScope.appLiterals.APP.RAKCONNECT.ALERT_ALREADY_PRESENT_FOR_ALL_ERR_MSG);
				return;
			}
		}
		
		scope.setEvent('onRAKConnectAddNewAlertSaveClick');
	};
	self.detectWhetherAlertsAlreadyPresentOrNew = function(){
		if(rootScope.RakPageValidation){
		if(self.RAKConnectModel.selectedAccNum == "0" || self.RAKConnectModel.selectedCCNum == "0"){
			self.detectIfAlreadyPresentAlertAll();
		}
		else {
			self.detectIfAlreadyPresentAlert();
		}
		}
	};
	self.whetherAccOrCCValidatnRqd = function(){
		if(self.RAKConnectModel.selectedAlertType != ""){
		if(self.RAKConnectModel.alertTypeList[self.RAKConnectModel.selectedAlertType].alertTypeCode=='FNCA'){
			self.RAKConnectModel.isAccValidatnRqd = true;
			self.RAKConnectModel.isCcValidatnRqd = false;
		}
		else if(self.RAKConnectModel.alertTypeList[self.RAKConnectModel.selectedAlertType].alertTypeCode=='CRCA'){
			self.RAKConnectModel.isCcValidatnRqd = true;
			self.RAKConnectModel.isAccValidatnRqd = false;
		}
		}
	};
	self.whetherFreqDomDowValidatnRqd = function(){
		if(self.RAKConnectModel.selectedAlertType != ""){
		if(self.RAKConnectModel.alertTypeList[self.RAKConnectModel.selectedAlertType].alertTypeFreq!='R'){
			self.RAKConnectModel.isFreqValidatnRqd = true;
		}
		else {
			self.RAKConnectModel.isFreqValidatnRqd = false;
		}

		if(self.RAKConnectModel.selectedFreqCode=='M'
			&& self.RAKConnectModel.alertTypeList[self.RAKConnectModel.selectedAlertType].alertTypeFreq!='R'){
			self.RAKConnectModel.isDomValidatnRqd = true;
		}
		else {
			self.RAKConnectModel.isDomValidatnRqd = false;
		}

		if(self.RAKConnectModel.selectedFreqCode=='W'
			&& self.RAKConnectModel.alertTypeList[self.RAKConnectModel.selectedAlertType].alertTypeFreq!='R'){
			self.RAKConnectModel.isDowValidatnRqd = true;
		}
		else {
			self.RAKConnectModel.isDowValidatnRqd = false;
		}
	}
	};
	self.whetherCustomDomDowValidatnRqd = function(){
		self.RAKConnectModel.isCustomFreqValidatnRqd = true;

		if(self.RAKConnectModel.selectedSubAlertFreq=='M'){
			self.RAKConnectModel.isCustomDomValidatnRqd = true;
		}
		else {
			self.RAKConnectModel.isCustomDomValidatnRqd = false;
		}

		if(self.RAKConnectModel.selectedSubAlertFreq=='W'){
			self.RAKConnectModel.isCustomDowValidatnRqd = true;
		}
		else {
			self.RAKConnectModel.isCustomDowValidatnRqd = false;
		}
	};
	self.detectIfAlertAccOrCcPresent = function(){
		if(self.RAKConnectModel.OprAccList.length == 0 && self.RAKConnectModel.alertTypeList[self.RAKConnectModel.selectedAlertType].alertTypeCode=='FNCA'){
			rootScope.showErrorPopup(rootScope.appLiterals.APP.RAKCONNECT.ALERT_NO_ACC);
			scope.setEvent('onRAKConnectNoAccOrCcPresentForAlertCheck');
		}
		else if(self.RAKConnectModel.CreditCardList.length == 0 && self.RAKConnectModel.alertTypeList[self.RAKConnectModel.selectedAlertType].alertTypeCode=='CRCA'){
			rootScope.showErrorPopup(rootScope.appLiterals.APP.RAKCONNECT.ALERT_NO_CC);
			scope.setEvent('onRAKConnectNoAccOrCcPresentForAlertCheck');
		}
	};
	//  - Added for RAK Connect : END
	
	
	self.TLUpload = {
			
		licenceNo:'',
		expiryDate:'',
		imagefile:'',
		isBack:false,
		transactionPassword:'',
		auth:'',
		finalMsg:'',
		popUpFlag:'',
		backflag:false,
		
		resetTLUpload : function() {
			self.TLUpload.licenceNo='';
			self.TLUpload.expiryDate='';
			self.TLUpload.imagefile='';
			self.TLUpload.transactionPassword='';
			self.TLUpload.auth='';
			self.TLUpload.finalMsg="";
			self.TLUpload.popUpFlag='';
			self.TLUpload.backflag=false;
			self.TLUpload.isBack=false;
		
		},
		initTLUpload : function(responseList) {
			if (!responseList[0].hasOwnProperty('errorMessage') && !self.TLUpload.isBack) {
				self.TLUpload.isBack = false;
				self.TLUpload.popUpFlag=true;
				self.TLUpload.licenceNo=responseList[0].TLNumber;
				self.TLUpload.expiryDate=responseList[0].ExpDate;
			}
		}
		
	};
	
	
	self.initTLUploadConfirm = function(responsesList) {
		if (!responsesList[0].hasOwnProperty('errorMessage')) {

			self.common.message=responsesList[0].MESSAGE ? responsesList[0].MESSAGE :'';

			self.TLUpload.auth = responsesList[0].auth;
			self.TLUpload.transactionPassword = "";
		
		}
	};
	
	self.initTLUploadSuccess = function(responsesList) {
		if (!responsesList[0].hasOwnProperty('errorMessage')) {


			self.TLUpload.finalMsg = responsesList[0].responseMsg;
			
		
		}
	};
	
	
// ----------------------------------------------------------------------------------------------------------------
	//RAK: Trade Finance Limit Details : START
	
	self.RakTFLimitDetails = {
		customLimitDetailsArrayList:[],	
		
		resetTFLimitDetailsData : function(){
			self.RakTFLimitDetails.customLimitDetailsArrayList = [];
		},
		
		initTFLimitDetailsData : function(responsesList){
			if(!responsesList[0].hasOwnProperty('errorMessage')){
				self.RakTFLimitDetails.customLimitDetailsArrayList = responsesList[0].customLimitDetailsArrayList;
			}			
		}
	}
		
	//RAK: Trade Finance Limit Details : END
// ----------------------------------------------------------------------------------------------------------------
	//RAK: 2FA DeRegistration STARTS
	self.Rak2FADeRegModel={
			userName:"",
			message:"",
			mobNo:"",
			reasonList:[],
			selectedReason:"",
			enteredOTP:"",
			successMessage : "",
			authFlag:"N",
			auth:"",
			authMode:"",
			authStatus:true,
			txnPwd:"",
			isSameUser:"",
			reasonDisplay:"",
			otp:""			
	};
	self.resetRak2FADeRegData = function(){
		self.Rak2FADeRegModel.userName = "";
		self.Rak2FADeRegModel.message = "";
		self.Rak2FADeRegModel.mobNo = "";
		self.Rak2FADeRegModel.reasonList = [];
		self.Rak2FADeRegModel.selectedReason = "";
		self.Rak2FADeRegModel.enteredOTP = "";
		self.Rak2FADeRegModel.successMessage = "",
		self.Rak2FADeRegModel.authFlag = "N";
		self.Rak2FADeRegModel.auth = "";
		self.Rak2FADeRegModel.authMode = "";
		self.Rak2FADeRegModel.authStatus = true;
		self.Rak2FADeRegModel.txnPwd = "";
		self.Rak2FADeRegModel.otp = "";
		self.Rak2FADeRegModel.isSameUser = "";
		self.Rak2FADeRegModel.reasonDisplay = "";
		
	};
	self.fetchRak2FADeRegData = function(responsesList){
		if (!responsesList[0].hasOwnProperty('errorMessage')) {
			if(responsesList[0].hasOwnProperty('UserName')){
				self.Rak2FADeRegModel.userName = responsesList[0].UserName;
			}
			if(responsesList[0].hasOwnProperty('MobileNo')){
				self.Rak2FADeRegModel.mobNo = responsesList[0].MobileNo;
			}
			if (responsesList[0].hasOwnProperty('ReasonsList')) {
				self.Rak2FADeRegModel.reasonList = responsesList[0].ReasonsList;
			}
			if (responsesList[0].hasOwnProperty('DeregisterWarning')) {
				self.Rak2FADeRegModel.message = responsesList[0].DeregisterWarning;
			}
		}
	};
	self.fetchRak2FADeRegData_preLogin = function(responsesList){
		if (!responsesList.hasOwnProperty('errorMessage')) {
			var response = responsesList.responsesList[0];
			rootScope.rakHome.otpModel.populateModeArray(response);
			if(response.hasOwnProperty('UserName')){
				self.Rak2FADeRegModel.userName = response.UserName;
			}
			if(response.hasOwnProperty('MobileNo')){
				self.Rak2FADeRegModel.mobNo = response.MobileNo;
			}
			if (response.hasOwnProperty('ReasonsList')) {
				self.Rak2FADeRegModel.reasonList = response.ReasonsList;
			}
			if (response.hasOwnProperty('DeregisterWarning')) {
				self.Rak2FADeRegModel.message = response.DeregisterWarning;
			}
			rootScope.isUserLoggedIn = false;
			rootScope.$apply();
		}
	};
	self.confirmRak2FADeReg = function(responsesList){
		if(!responsesList[0].hasOwnProperty('errorMessage')){
			if(responsesList[0].hasOwnProperty('authFlag'))
			{
				
					if(responsesList[0].auth == "")
						self.Rak2FADeRegModel.authStatus=false;
					else
					{
						self.Rak2FADeRegModel.authStatus=true;
						self.Rak2FADeRegModel.authMode = responsesList[0].auth;
					}
			
			}

			self.common.message=responsesList[0].MESSAGE ? responsesList[0].MESSAGE :'';
			if(responsesList[0].hasOwnProperty('tokenSrlNumber')){
				self.Rak2FADeRegModel.tokenSrlNumber = responsesList[0].tokenSrlNumber;
				if(rootScope.rak2FARegister.EzComToken.tsn == self.Rak2FADeRegModel.tokenSrlNumber)
					{
						self.Rak2FADeRegModel.isSameUser = "YES";
					}
				
			}
			if(responsesList[0].hasOwnProperty('ReasonDisplay')){
				self.Rak2FADeRegModel.reasonDisplay = responsesList[0].ReasonDisplay;
								
			}
		}
	};
	self.initRak2FADeRegSuccess = function(responsesList) {
		if (!responsesList[0].hasOwnProperty('errorMessage'))
			{
			self.Rak2FADeRegModel.successMessage = responsesList[0].successMsg;
			
			if(self.Rak2FADeRegModel.isSameUser=="YES")
			{
				rootScope.rak2FARegister.EzComToken.deRegClearEzComObject();
			}
			}
	};
	//RAK: 2FA DeRegistration ENDS
	
	
	
	
	// RAK : Bank Reference Letter changes
	
	
	self.rakBankRefLetter = {
			selectedDate:new Date(),
			addressdTo:"",
			address:"",
			selectedAcctNo:"",
			selectedLang:"",
			selectedDelMode:"address",
			isSelectedDelModeBranch:false,
			selectedbranch:"",
			selectedBranchDesc:"",
			mobile:"",
			mobileNoString:"",
			notes:"",
			authFlag:"N",
			auth:"",
			authMode:"",
			authStatus:false,
			txnPwd:"",
			otp:"",
			registeredAddress:"",
			successMessage:"",
			mobileNoString:"",
			selectedAccountNumber:"",
			previewDateOne:"",
			//CHANGES FOR OPERATIVE ACCOUNT DATE DISPALY IN USER DATE FORMAT START
			selectedDate_day:"",
			selectedDate_month:"",
			selectedDate_year:"",
			//CHANGES FOR OPERATIVE ACCOUNT DATE DISPALY IN USER DATE FORMAT END
			selectedDelModeToServer:"",
			emirateList:[],
			emiBranchList:[],
			emirateSeletected:"",
			emiCategorizedBranchList:[],
			isEmiSelected:false,
			emiSelDesc:"",
			isDuplicateReqPresent:"Y",
			dupliMsg:"",
			selectedForAcc:"",
			accountList:[],
			forAccounts:[],
			applicantName:'',
			reqdDetailsBank:false,
			reqdDetailsIBAN:false,
			reqdDetailsSwift:false,
			reqdDetailsCurrency:false,
			reqdDetailsBankVal:'',
			reqdDetailsIBANVal:'',
			reqdDetailsSwiftVal:'',
			reqdDetailsCurrencyVal:'',
			reqdDetailsDesc:'',



			resetBankRefLetterData:function(){
				self.rakBankRefLetter.selectedDate= new Date();
				self.rakBankRefLetter.addressdTo="";
				self.rakBankRefLetter.address="";
				self.rakBankRefLetter.selectedbranch="";
				self.rakBankRefLetter.selectedBranchDesc="";
				self.rakBankRefLetter.notes="";
				self.rakBankRefLetter.registeredAddress="";
				self.rakBankRefLetter.mobile="";
				self.rakBankRefLetter.mobileNoString="";
				self.rakBankRefLetter.selectedAcctNo="";
				self.rakBankRefLetter.isSelectedDelModeBranch=false;
				self.rakBankRefLetter.selectedbranch="";
				self.rakBankRefLetter.authFlag="N";
				self.rakBankRefLetter.auth="";
				self.rakBankRefLetter.authMode="";
				self.rakBankRefLetter.authStatus=false;
				self.rakBankRefLetter.txnPwd="";
				self.rakBankRefLetter.otp="";
				self.rakBankRefLetter.successMessage="";
		
				self.rakBankRefLetter.selectedAccountNumber="";
				self.rakBankRefLetter.selectedDelModeToServer="";
				self.rakBankRefLetter.selectedLang="E";
				self.rakBankRefLetter.selectedDelMode=rootScope.appLiterals.APP.RAK_SERVICES.RAKBANKREFLETTER.DELMYADD;
				self.rakBankRefLetter.previewDateOne = "";
				//CHANGES FOR OPERATIVE ACCOUNT DATE DISPALY IN USER DATE FORMAT START
				self.rakBankRefLetter.selectedDate_day ="";
				self.rakBankRefLetter.selectedDate_month="";
				self.rakBankRefLetter.selectedDate_year="";
				//CHANGES FOR OPERATIVE ACCOUNT DATE DISPALY IN USER DATE FORMAT END
				self.rakBankRefLetter.emirateList=[];
				self.rakBankRefLetter.emiBranchList=[];
				self.rakBankRefLetter.emirateSeletected="";
				self.rakBankRefLetter.accountList =[];
				self.rakBankRefLetter.forAccounts=[];
				self.rakBankRefLetter.emiCategorizedBranchList=[];
				self.rakBankRefLetter.isEmiSelected=false;
				self.rakBankRefLetter.selectedForAcc="";
				self.rakBankRefLetter.applicantName="";
				self.rakBankRefLetter.reqdDetailsBank=false;
				self.rakBankRefLetter.reqdDetailsIBAN=false;
				self.rakBankRefLetter.reqdDetailsSwift=false;
				self.rakBankRefLetter.reqdDetailsCurrency=false;
				self.rakBankRefLetter.reqdDetailsBankVal='';
				self.rakBankRefLetter.reqdDetailsIBANVal='';
				self.rakBankRefLetter.reqdDetailsSwiftVal='';
				self.rakBankRefLetter.reqdDetailsCurrencyVal='';
				self.acceptTermscondition="N";
				self.rakBankRefLetter.reqdDetailsDesc='';

			},

			//CHANGES FOR OPERATIVE ACCOUNT DATE DISPALY IN USER DATE FORMAT START
			setRAKOprAcctBalConfDate : function() {
				self.common.displayDate = self.rakBankRefLetter.selectedDate;
				self.populateCurrentDateDetails(self.rakBankRefLetter.selectedDate);
				self.rakBankRefLetter.selectedDate_day =self.common.date;
				self.rakBankRefLetter.selectedDate_month=self.common.month;
				self.rakBankRefLetter.selectedDate_year=self.common.year;
			},
			//CHANGES FOR OPERATIVE ACCOUNT DATE DISPALY IN USER DATE FORMAT END

			initRAKOprAcctBalConfReqData:function(responsesList){
				if(!responsesList[0].hasOwnProperty('errorMessage')){
					if(responsesList[0].hasOwnProperty('accountList'))
						self.rakBankRefLetter.accountList = responsesList[0].accountList;
					if(responsesList[0].hasOwnProperty('forAccounts'))
						self.rakBankRefLetter.forAccounts = responsesList[0].forAccounts;
					if(responsesList[0].hasOwnProperty('branchListArray'))
						self.rakBankRefLetter.branchList = responsesList[0].branchListArray;

					if(responsesList[0].hasOwnProperty('emirateList')){
						self.rakBankRefLetter.emirateList = responsesList[0].emirateList;
					}

					if(responsesList[0].hasOwnProperty('emiBranchList')){
						self.rakBankRefLetter.emiBranchList = responsesList[0].emiBranchList;
					}

					if(responsesList[0].hasOwnProperty('registeredAddress') && !(responsesList[0].registeredAddress == '' )){
						self.rakBankRefLetter.registeredAddress = responsesList[0].registeredAddress[0].address;
					}
					
					if(responsesList[0].hasOwnProperty('ApplicantName') && !(responsesList[0].ApplicantName == '' )){
						self.rakBankRefLetter.applicantName = responsesList[0].ApplicantName;
					}
					if(responsesList[0].hasOwnProperty('REQUESTDATE') && !(responsesList[0].REQUESTDATE == '' )){
						self.common.initDate = responsesList[0].REQUESTDATE;
					}
					

				}
			},
			handleReqdDetails :function(){
				self.rakBankRefLetter.reqdDetailsDesc='';
				self.rakBankRefLetter.reqdDetailsBankVal=self.rakBankRefLetter.reqdDetailsBank ? "Y" :"";
				self.rakBankRefLetter.reqdDetailsIBANVal=self.rakBankRefLetter.reqdDetailsIBAN ? "Y" :"";
				self.rakBankRefLetter.reqdDetailsSwiftVal=self.rakBankRefLetter.reqdDetailsSwift ? "Y" :"";
				self.rakBankRefLetter.reqdDetailsCurrencyVal=self.rakBankRefLetter.reqdDetailsCurrency ? "Y" :"";

				
				self.rakBankRefLetter.reqdDetailsDesc=self.rakBankRefLetter.reqdDetailsBank ? rootScope.appLiterals.APP.RAK_SERVICES.RAKBANKREFLETTER.BANKADD :"";
				self.rakBankRefLetter.reqdDetailsDesc=self.rakBankRefLetter.reqdDetailsIBAN ? self.rakBankRefLetter.reqdDetailsDesc ? self.rakBankRefLetter.reqdDetailsDesc+", "+rootScope.appLiterals.APP.RAK_SERVICES.RAKBANKREFLETTER.IBAN : rootScope.appLiterals.APP.RAK_SERVICES.RAKBANKREFLETTER.IBAN   : self.rakBankRefLetter.reqdDetailsDesc ;
				self.rakBankRefLetter.reqdDetailsDesc=self.rakBankRefLetter.reqdDetailsSwift ? self.rakBankRefLetter.reqdDetailsDesc ? self.rakBankRefLetter.reqdDetailsDesc+", "+rootScope.appLiterals.APP.RAK_SERVICES.RAKBANKREFLETTER.SWIFT : rootScope.appLiterals.APP.RAK_SERVICES.RAKBANKREFLETTER.SWIFT   : self.rakBankRefLetter.reqdDetailsDesc ;
				self.rakBankRefLetter.reqdDetailsDesc=self.rakBankRefLetter.reqdDetailsCurrency ? self.rakBankRefLetter.reqdDetailsDesc ? self.rakBankRefLetter.reqdDetailsDesc+", "+rootScope.appLiterals.APP.RAK_SERVICES.RAKBANKREFLETTER.ACCOUNTCURRENCY : rootScope.appLiterals.APP.RAK_SERVICES.RAKBANKREFLETTER.ACCOUNTCURRENCY   : self.rakBankRefLetter.reqdDetailsDesc ;

				/*		if(!self.rakBankRefLetter.reqdDetailsBankVal && !self.rakBankRefLetter.reqdDetailsIBANVal && !self.rakBankRefLetter.reqdDetailsSwiftVal && !self.rakBankRefLetter.reqdDetailsCurrencyVal ){

								rootScope.showErrorPopup(rootScope.appLiterals.APP.RAKERRORMSG.VALIDATORTYPEMSG.SELECTATLEASTONEREQDTDET);
					            return;
							}
				*/

				scope.setEvent('onRAKOprAcctBalConfReqConfirmClick');
			},
//			Added by  For Emirates based Branch Dropdown Change
			rakOprAcctBalConfBranchOptionChange : function() {

				var branchListCount = 0;
				var emBranchDesc = [];
				self.rakBankRefLetter.emiCategorizedBranchList = [];
				self.rakBankRefLetter.selectedbranch='';
				self.rakBankRefLetter.isEmiSelected = true;
				for (var x = 0; x < self.rakBankRefLetter.emiBranchList.length; x++) {
					if (self.rakBankRefLetter.emiBranchList[x].code == self.rakBankRefLetter.emirateSeletected) {
						emBranchDesc = self.rakBankRefLetter.emiBranchList[x].codeDesc
						.split("|");
						break;
					}
				}

				for (var x = 0; x < emBranchDesc.length; x++) {
					for (var y = 0; y < self.rakBankRefLetter.branchList.length; y++) {
						if (emBranchDesc[x] == self.rakBankRefLetter.branchList[y].branchIndex) {
							self.rakBankRefLetter.emiCategorizedBranchList[branchListCount] = self.rakBankRefLetter.branchList[y];
							branchListCount++;
						}
					}
				}

			},
			mobileNoToString:function(){
				self.rakBankRefLetter.mobileNoString = self.rakBankRefLetter.mobile+"";
			},



			checkForDelModeBranch:function(){

				switch(self.rakBankRefLetter.selectedDelMode){

				case self.DELMODETYPECONSTANTS.TOMYADD:
					self.rakBankRefLetter.selectedbranch="";
					self.rakBankRefLetter.selectedDelModeToServer=self.DELMODETYPECONSTANTSVAL.TOMYADD;
					self.rakBankRefLetter.isSelectedDelModeBranch=false;
					break;

			
				case self.DELMODETYPECONSTANTS.COLLECTFROMBRNCH:
					self.rakBankRefLetter.isSelectedDelModeBranch=true;
					self.rakBankRefLetter.selectedDelModeToServer=self.DELMODETYPECONSTANTSVAL.COLLECTFROMBRNCH;
					break;

				default:
					break;

				}


			},

			setRAKOprAcctBalConfReqDate :function() {
				//CHANGES SENDING DATE AS DAY,MONTH AND YEAR START
				//self.RAKOprAcctBalConfReq.selectedDate = self.setFormatedDate(self.common.initDate);
				self.rakBankRefLetter.selectedDate = self.common.initDate;
				//CHANGES SENDING DATE AS DAY,MONTH AND YEAR END
			},


			confirmRAKOprAcctBalConfReq:function(responsesList){
				if(!responsesList[0].hasOwnProperty('errorMessage')){
					if(responsesList[0].hasOwnProperty('selectedAccountNumber')){
						self.rakBankRefLetter.selectedAccountNumber = responsesList[0].selectedAccountNumber;
					}

					if(responsesList[0].hasOwnProperty('selectedForAccountNo')){
						self.rakBankRefLetter.selectedForAccountNo = responsesList[0].selectedForAccountNo;
					}
					if(responsesList[0].hasOwnProperty('selectedBranchDesc')){
						self.rakBankRefLetter.selectedBranchDesc = responsesList[0].selectedBranchDesc;
					}
					if (responsesList[0].hasOwnProperty('previewDate')) {
						self.rakBankRefLetter.previewDateOne =        responsesList[0].previewDate;
					}

					if(responsesList[0].hasOwnProperty('authFlag'))
					{
						self.rakBankRefLetter.authFlag = responsesList[0].authFlag;
						if(self.rakBankRefLetter.authFlag == "Y"){
							if(responsesList[0].auth == "")
								self.rakBankRefLetter.authStatus=false;
							else
							{
								self.rakBankRefLetter.authStatus=true;
								self.rakBankRefLetter.authMode = responsesList[0].auth;
							}
						}
					}

					self.common.message=responsesList[0].MESSAGE ? responsesList[0].MESSAGE :'';
				}


				for (var x=0; x<self.rakBankRefLetter.emiCategorizedBranchList.length;x++)
				{
					if (self.rakBankRefLetter.emiCategorizedBranchList[x].branchIndex==self.rakBankRefLetter.selectedbranch)
					{
						self.rakBankRefLetter.selectedBranchDesc=self.rakBankRefLetter.emiCategorizedBranchList[x].branchName;
					}
				}


//				Added By  For Emirate Desc

				for (var x=0; x<self.rakBankRefLetter.emirateList.length;x++)
				{
					if (self.rakBankRefLetter.emirateList[x].code==self.rakBankRefLetter.emirateSeletected)
					{
						self.rakBankRefLetter.emiSelDesc =self.rakBankRefLetter.emirateList[x].codeDesc;
					}
				}
			},

			initRAKOprAcctBalConfReqSucess : function(responsesList){
				if(!responsesList[0].hasOwnProperty('errorMessage'))
					self.rakBankRefLetter.successMessage = responsesList[0].successMsg;
			}


	};

	// RAK : Bank Reference Letter changes
	
self.backNavigation = function() {
		
		if(rootScope.rakAccounts.myProducts.navigationFlag==false)
		{
			scope.setGlobalEvent('onDashboardClick');
		}
		else if(rootScope.rakAccounts.myProducts.navigationType=='ProductsAccounts' && rootScope.rakAccounts.myProducts.navigationFlag==true)
			{
				rootScope.fields.browseAccountIndexInt = 0;
				
				rootScope.fields.mainAccountType="OPR";rootScope.fields.accountType="OPR";
	            rootScope.rakAccounts.clearPage();	
				scope.setGlobalEvent('onOperativeListClick');
			}
		else if(rootScope.rakAccounts.myProducts.navigationType=='TradeAccounts' && rootScope.rakAccounts.myProducts.navigationFlag==true)
		{
			rootScope.fields.browseAccountIndexInt = 0;
		
			rootScope.fields.mainAccountType="OPR";rootScope.fields.accountType="CAA";
			rootScope.rakAccounts.clearPage();
			scope.setGlobalEvent('onTradeAccountListClick');
		}
		
		else if(rootScope.rakAccounts.myProducts.navigationType=='ProductsCards' && rootScope.rakAccounts.myProducts.navigationFlag==true)
		{
			scope.setGlobalEvent('onCreditAccountClick');
		}
		else if(rootScope.rakAccounts.myProducts.navigationType=='ProductsDeposit' && rootScope.rakAccounts.myProducts.navigationFlag==true)
		{
			rootScope.fields.browseAccountIndexInt = 0;
			rootScope.fields.mainAccountType="DEP";
          
            rootScope.rakAccounts.clearPage();
			scope.setGlobalEvent('onDepositListClick');
		}
		else if(rootScope.rakAccounts.myProducts.navigationType=='ProductsLoan' && rootScope.rakAccounts.myProducts.navigationFlag==true)
		{
			rootScope.fields.browseAccountIndexInt = 0;
			
			rootScope.fields.mainAccountType="LON";
            rootScope.rakAccounts.clearPage();
			scope.setGlobalEvent('onLoanListClick');
		}
		else if(rootScope.rakAccounts.myProducts.navigationType=='ProductsInvestment' && rootScope.rakAccounts.myProducts.navigationFlag==true)
		{
			rootScope.fields.browseAccountIndexInt = 0;
		
			rootScope.fields.mainAccountType="INV";
            rootScope.rakAccounts.clearPage();
			scope.setGlobalEvent('onInvestmentListClick');
		}
		else if(rootScope.rakAccounts.myProducts.navigationType=='ProductsGold' && rootScope.rakAccounts.myProducts.navigationFlag==true)
		{
			scope.setGlobalEvent('onGoldListClick');
		}
		
		
	};
	
self.resetNavigation = function() {
		
		rootScope.rakAccounts.myProducts.navigationFlag=false;
		
	
		
		
	};
		//Business Elite SR start
	
	
	
	self.RakBusinessEliteSubscribe = {
			TermsAndConditionsContent : "",		
			transactionPassword : "",
			responseText : "",
			confirmResponse : [],
			auth : "",
			authStatus : true,
		
		

			resetRakBusinessEliteSubscribeModel : function() {

				self.RakBusinessEliteSubscribe.TermsAndConditionsContent = "";
				self.RakBusinessEliteSubscribe.transactionPassword = "";
				self.RakBusinessEliteSubscribe.responseText = "";
				self.RakBusinessEliteSubscribe.confirmResponse = [];				
		  		self.common.message = "";
			
			},
			
			
			
			initRakBusinessEliteSubscribe : function(responseList) {
				if (!responseList[0].hasOwnProperty('errorMessage')
						&& !self.RakBusinessEliteSubscribe.isBack) {
					
					/*$("#termsConditions").html(responseList[0].TermsAndConditionsContent);*/
					var fileName = responseList[0].FileName;
					var serverLink = rootScope.rakHome.disclaimerURL.replace(/['"]+/g,'')+"../L001/corporate/Common/";
					//var serverLink = "http://blp4ux09:13421/corp/";
					var extn = ".html";
					var finalUrl = serverLink+fileName+extn;
					jQuery("#termsConditions").load(finalUrl);
					MBaaS.setTermsAndConditionUrl(finalUrl);
					self.RakBusinessEliteSubscribe.isBack = false;
				

				}
				//Added for Terms And Condition Back button(issue PE-373)
				else if(self.RakBusinessEliteSubscribe.isBack){
					var finalUrl = MBaaS.getTermsAndConditionUrl();
					jQuery("#termsConditions").load(finalUrl);
					self.RakBusinessEliteSubscribe.isBack = false;
				}
			},
			resetRakEliteSubcribeDetails : function() {
				self.RakBusinessEliteSubscribe.acceptTermscondition="";
				self.RakBusinessEliteSubscribe.TermsAndConditionsContent = "";
				self.RakBusinessEliteSubscribe.transactionPassword = "";
				self.RakBusinessEliteSubscribe.responseText = "";
				self.RakBusinessEliteSubscribe.confirmResponse = [];
				self.RakBusinessEliteSubscribe.auth = "";
				self.RakBusinessEliteSubscribe.isBack=false;
				self.acceptTermscondition="N";

				
		  		self.common.message = "";
				
			},
			
			setTermsnConditionsFlag : function(acceptTermscondition) {
				
				self.RakBusinessEliteSubscribe.acceptTermscondition = true;
				scope.setEvent('onConfirmClick');
				
				/*if(acceptTermscondition=='Y')
					{
					
					self.RakBusinessEliteSubscribe.acceptTermscondition = true;
					scope.setEvent('onConfirmClick');
					
					
					}
				else{
					//rootScope.showErrorPopup(rootScope.appLiterals.APP.RAK_COMMON.SELECTTERMSANDCONDITION);
					self.RakBusinessEliteSubscribe.acceptTermscondition = false;
				}*/
				
			},
			
			
			rakBusinessEliteSubscribeConfirm : function(responseList) {
				if (!responseList[0].hasOwnProperty('errorMessage')
						&& !self.RakBusinessEliteSubscribe.isBack) {
					
					$("#termsConditions").html(responseList[0].TermsAndConditionsContent);				
					
					self.RakBusinessEliteSubscribe.isBack = false;	
					self.RakBusinessEliteSubscribe.auth=responseList[0].auth;
				}
				//self.RakBusinessEliteSubscribe.auth=responseList[0].auth;				
			},
			
			rakBusinessEliteUnSubscribeConfirm : function(responseList) {
				if (!responseList[0].hasOwnProperty('errorMessage')
						&& !self.RakBusinessEliteSubscribe.isBack) {
					
					$("#termsConditions").html(responseList[0].TermsAndConditionsContent);		
					self.common.message=responseList[0].MESSAGE ? responseList[0].MESSAGE :'';
					self.RakBusinessEliteSubscribe.isBack = false;	
					self.RakBusinessEliteSubscribe.auth=responseList[0].auth;				

				}
				
				//self.RakBusinessEliteSubscribe.auth=responseList[0].auth;			
			},
			
			RakBusinessEliteSubscribeSuccess : function(responseList) {
				if(!responseList[0].hasOwnProperty('errorMessage'))
					self.RakBusinessEliteSubscribe.successMessage = responseList[0].successMsg;
				
			},	
			RakBusinessEliteUnSubscribeSuccess : function(responseList) {
				if(!responseList[0].hasOwnProperty('errorMessage'))
					self.RakBusinessEliteSubscribe.successMessage = responseList[0].successMsg;
				
			},		
		
		};


	//Business Elite SR End
	    self.ACDLimitChangeRqConstants={
	    		TRANSACTIONPASSWORD:'Transaction Password',
	            TRANSACTIOPASSWORDSMSOTP:'Transaction PasswordSMS OTP',
	            SMSOTP:'SMS OTP',
	    };
	    self.ATMCashDepositeLimitChangeReq={
	    		sameCurrencyTransferLimit :"",
	    		isAuthSet:false,
	    		authType : "",
	            secAuthType: "",
	            minacdlimit: "",
	    		OTP:0,
	    		TransactionPassword:1,
	    		None:-1,
	    		Both:2,

	    		isTransactionPwd:false,
	    		isSmsOtp:false,
	    		isFirstAuthMode:false,
	    		isSecAuthMode:false,

	    		firstAuthMode:"",
	    		secAuthMode:"",

	    		firstAuthModeValue:"",
	    		secAuthModeValue:"",

	            ACDLimitSuccessMsg:"",
	            disclaimerTxt:"",
	            acceptTermscondition:"N",
	            remarks:"",
	            selectedfromAccountNumber:"",
	            message: "",
	            
	            
	            initTransactionLimitChange:function(){
	    	    	 self.ATMCashDepositeLimitChangeReq.authType=self.ATMCashDepositeLimitChangeReq.None;
	    	    	 self.ATMCashDepositeLimitChangeReq.secAuthType=self.ATMCashDepositeLimitChangeReq.None;
	    	     },

	    	     initATMCashDepositeLimit:function(responsesList){
	    	    	 if(responsesList[0].hasOwnProperty('acd_min_limit')){
	    		    	 self.ATMCashDepositeLimitChangeReq.minacdlimit=responsesList[0].acd_min_limit;
	    		    	 /*self.ATMCashDepositeLimitChangeReq.disclaimerTxt=rootScope.appLiterals.APP.DISCLAIMER.RAK_DAILY_LIMI_UPDATE_RET+self.ATMCashDepositeLimitChangeReq.minacdlimit+rootScope.appLiterals.APP.DISCLAIMER.RAK_DAILY_LIMI_UPDATE_RET1;*/
	    	    	 }
	    	    },
	    	    previewACDLimitChange :function(responsesList) {
	    	    	if (!responsesList[0].hasOwnProperty("errorMessage")) {
	    	    		self.ATMCashDepositeLimitChangeReq.message=responsesList[0].MESSAGE ? responsesList[0].MESSAGE :'';
	    	    	     if(responsesList[0].auth == self.ACDLimitChangeRqConstants.TRANSACTIONPASSWORD||responsesList[0].auth == self.ACDLimitChangeRqConstants.TRANSACTIOPASSWORDSMSOTP||responsesList[0].auth == self.ACDLimitChangeRqConstants.SMSOTP){
	    					self.ATMCashDepositeLimitChangeReq.isAuthSet = true;
	    					switch(responsesList[0].auth){
	    					case self.ACDLimitChangeRqConstants.TRANSACTIONPASSWORD:
	    						 self.ATMCashDepositeLimitChangeReq.authType=self.ATMCashDepositeLimitChangeReq.TransactionPassword;
	    						 self.ATMCashDepositeLimitChangeReq.isFirstAuthMode=true;
	    						 break;
	    					 case self.ACDLimitChangeRqConstants.TRANSACTIOPASSWORDSMSOTP:
	    						 self.ATMCashDepositeLimitChangeReq.authType=self.ATMCashDepositeLimitChangeReq.TransactionPassword;
	    						 self.ATMCashDepositeLimitChangeReq.secAuthType=self.ATMCashDepositeLimitChangeReq.OTP;
	    						 self.ATMCashDepositeLimitChangeReq.isFirstAuthMode=true;
	    						 self.ATMCashDepositeLimitChangeReq.isSecAuthMode=true;
	    						 break;
	    					 case self.ACDLimitChangeRqConstants.SMSOTP:
	    						 self.ATMCashDepositeLimitChangeReq.authType=self.ATMCashDepositeLimitChangeReq.OTP;
	    						 self.ATMCashDepositeLimitChangeReq.isFirstAuthMode=true;
	    						 break;
	    					 default:
	    						 self.ATMCashDepositeLimitChangeReq.authType=self.ATMCashDepositeLimitChangeReq.None;
	    						 self.ATMCashDepositeLimitChangeReq.secAuthType=self.ATMCashDepositeLimitChangeReq.None;
	    						 break;
	    					 }

	    				  }
	    				else{
	    					self.ATMCashDepositeLimitChangeReq.isAuthSet = false;
	    				}
	    	    	 }
	    	     },
	    	     successACDLimitChange :function(responseList) {
	         		if (responseList[0].hasOwnProperty("successACDMsg")) {
	         			self.ATMCashDepositeLimitChangeReq.ACDLimitSuccessMsg=responseList[0].successACDMsg;
	         		}

	    	     },
	    	     
	    	     resetACDLimitChangeModel: function(){
	    	    	 self.ATMCashDepositeLimitChangeReq.sameCurrencyTransferLimit = "";
	    	    	 self.ATMCashDepositeLimitChangeReq.isAuthSet=false;
	    	    	 self.ATMCashDepositeLimitChangeReq.authType = "";
	    	    	 self.ATMCashDepositeLimitChangeReq.secAuthType ="";

	    	    	 self.ATMCashDepositeLimitChangeReq.OTP=0;
	    	    	 self.ATMCashDepositeLimitChangeReq.TransactionPassword=1;
	    	    	 self.ATMCashDepositeLimitChangeReq.None=-1;
	    	    	 self.ATMCashDepositeLimitChangeReq.Both=2;

	    	    	 self.ATMCashDepositeLimitChangeReq.isTransactionPwd=false;
	    	    	 self.ATMCashDepositeLimitChangeReq.isSmsOtp=false;
	    	    	 self.ATMCashDepositeLimitChangeReq.isFirstAuthMode=false;
	    	    	 self.ATMCashDepositeLimitChangeReq.isSecAuthMode=false;

	    	    	 self.ATMCashDepositeLimitChangeReq.firstAuthMode="";
	    	    	 self.ATMCashDepositeLimitChangeReq.secAuthMode="";

	    	    	 self.ATMCashDepositeLimitChangeReq.firstAuthModeValue="";
	    	    	 self.ATMCashDepositeLimitChangeReq.secAuthModeValue="";
	    	    	 self.ATMCashDepositeLimitChangeReq.minacdlimit="";
	    	    	 self.ATMCashDepositeLimitChangeReq.authType=self.ATMCashDepositeLimitChangeReq.None;
	    	    	 self.ATMCashDepositeLimitChangeReq.secAuthType=self.ATMCashDepositeLimitChangeReq.None;

	    	    	 self.ATMCashDepositeLimitChangeReq.ACDLimitSuccessMsg="";
	    	    	 self.ATMCashDepositeLimitChangeReq.acceptTermscondition='N';
	    	    	 self.ATMCashDepositeLimitChangeReq.disclaimerTxt="";
	    	    	 self.ATMCashDepositeLimitChangeReq.remarks="";
	    	    	 self.ATMCashDepositeLimitChangeReq.selectedfromAccountNumber="";
	    	    	 self.ATMCashDepositeLimitChangeReq.message="";
	    	     },
	    	     
	    	     parseACDRequestInit : function(response) {

	    				if (!response.responsesList[0].hasOwnProperty("errorMessage") && response.responsesList[0].hasOwnProperty("fromAccountNo")) {

	    					//self.ATMCashDepositeLimitChangeReq.ACDInitResponse = response.responsesList[0];

	    					self.ATMCashDepositeLimitChangeReq.fromAccountNumbers = response.responsesList[0].fromAccountNo;
	    					
	    				}

	    			},
    			fetchATMPreviewEvent: function(){
					//var objName = document.getElementById("loanValue");
					if(self.ATMCashDepositeLimitChangeReq.acceptTermscondition == 'N'){
						rootScope.showErrorPopup(rootScope.appLiterals.APP.RAK_COMMON.SELECTTERMSANDCONDITION);
					}
					else{
						scope.setEvent('onRakATMLimitChangeContinueClick');
					}
				},
	    	    
	    };
	
	  // DAC CR changes start
	    
	    self.rakDigitalAccessCardBlock={
	    		isSignatory:'',
	    		digitalAccessCardListSignatory:[],
	    		digitalAccessCardListNonSignatory:[],
	    		digitalAccessCardListBlock:[],
	    		dacBlockCardRadioButton:'',
	    		reasonList:[],
	    		other:'',
	    		enteredOTP:'',
	    		enteredCVV:'',
	    		dateOfBirth:'',
	    		cardHolderName:'',
	    		embossingName: '',
	    		isBranchOrAddress: '',
	    		emirateList: [],
	    		emirateSeletected:'',
	    		selectedBranchId:'',
	    		emiCategorizedBranchList: [],
	    		mailingAddress: '',
	    		OprAcctBranchList: [],
	    		dacUserList: [],
	    		digitalAccessCardUsersEligible: [],
	    		isInitial: 'Y',
	    		acceptTermscondition: 'N',
	    		message: '',
	    		reason: '',
	    		dacCardNumberBlockConfirm: '',
	    		successMessage: '',
	    		dacIssuanceName: '',
	    		dacIssuanceCif: '',
	    		dacCardNumberPinIssue: '',
	    		dacCardNamePinIssue: '',
	    		newpin: '',
	    		status: '',
	    		dateOfBirthDisp:'',
	    		
	    		resetDACList: function(){
	    			self.rakDigitalAccessCardBlock.isSignatory='',
	    			self.rakDigitalAccessCardBlock.digitalAccessCardListSignatory=[];
	    			self.rakDigitalAccessCardBlock.digitalAccessCardListNonSignatory=[];
	    			self.rakDigitalAccessCardBlock.digitalAccessCardListBlock=[];
	    			self.rakDigitalAccessCardBlock.dacBlockCardRadioButton='';
	    			self.rakDigitalAccessCardBlock.reasonList=[];
	    			self.rakDigitalAccessCardBlock.other='';
	    			self.rakDigitalAccessCardBlock.enteredOTP='';
	    			self.rakDigitalAccessCardBlock.enteredCVV='';
	    			self.rakDigitalAccessCardBlock.dateOfBirth='';
	    			self.rakDigitalAccessCardBlock.dateOfBirth='';
	    			self.rakDigitalAccessCardBlock.dob_day ='';
					self.rakDigitalAccessCardBlock.dob_month='';
					self.rakDigitalAccessCardBlock.dob_year='';
	    			self.rakDigitalAccessCardBlock.cardHolderName='';
	    			self.rakDigitalAccessCardBlock.embossingName='';
	    			self.rakDigitalAccessCardBlock.isBranchOrAddress = rootScope.appLiterals.APP.RAKDCAPPLYSR.DCAPPLY_DISPATCH_ADDRESS;
	    			self.rakDigitalAccessCardBlock.emirateList = [];
	    			self.rakDigitalAccessCardBlock.emirateSeletected = "";
	    			self.rakDigitalAccessCardBlock.selectedBranchId = "";
	    			self.rakDigitalAccessCardBlock.emiCategorizedBranchList = [];
	    			self.rakDigitalAccessCardBlock.mailingAddress = "";
	    			self.rakDigitalAccessCardBlock.OprAcctBranchList = [];
	    			self.rakDigitalAccessCardBlock.dacUserList = [];
	    			self.rakDigitalAccessCardBlock.digitalAccessCardUsersEligible = [];
	    			self.rakDigitalAccessCardBlock.isInitial = 'Y';
	    			self.rakDigitalAccessCardBlock.acceptTermscondition = 'N';
	    			self.rakDigitalAccessCardBlock.selectedDACRequest = '';
	    			self.rakDigitalAccessCardBlock.message = '';
	    			self.rakDigitalAccessCardBlock.reason = '';
	    			self.rakDigitalAccessCardBlock.dacCardNumberBlockConfirm = '';
	    			self.rakDigitalAccessCardBlock.successMessage = '';
	    			self.rakDigitalAccessCardBlock.dacIssuanceName = '';
	    			self.rakDigitalAccessCardBlock.dacIssuanceCif='';
	    			self.rakDigitalAccessCardBlock.dacCardNumberPinIssue='';
	    			self.rakDigitalAccessCardBlock.dacCardNamePinIssue='';
	    			self.rakDigitalAccessCardBlock.newpin='';
		    		self.rakDigitalAccessCardBlock.status='';
		    		self.rakDigitalAccessCardBlock.dateOfBirthDisp='';
	    			
	    		},
	    		
	    		resetOnDACSRChange: function(){
	    			self.rakDigitalAccessCardBlock.dacBlockCardRadioButton='';
	    			self.rakDigitalAccessCardBlock.other='';
	    			self.rakDigitalAccessCardBlock.enteredOTP='';
	    			self.rakDigitalAccessCardBlock.enteredCVV='';
	    			self.rakDigitalAccessCardBlock.dateOfBirth='';
	    			self.rakDigitalAccessCardBlock.dob_day ='';
					self.rakDigitalAccessCardBlock.dob_month='';
					self.rakDigitalAccessCardBlock.dob_year='';
		    		self.rakDigitalAccessCardBlock.isBranchOrAddress = rootScope.appLiterals.APP.RAKDCAPPLYSR.DCAPPLY_DISPATCH_ADDRESS;
		    		self.rakDigitalAccessCardBlock.emirateSeletected = "";
		    		self.rakDigitalAccessCardBlock.selectedBranchId = "";
		    		self.rakDigitalAccessCardBlock.mailingAddress = "";
		    		self.rakDigitalAccessCardBlock.emiCategorizedBranchList = [];
		    		self.rakDigitalAccessCardBlock.acceptTermscondition = 'N';
		    		self.rakDigitalAccessCardBlock.message = '';
		    		self.rakDigitalAccessCardBlock.reason = '';
		    		self.rakDigitalAccessCardBlock.dacCardNumberBlockConfirm = '';
		    		self.rakDigitalAccessCardBlock.dacIssuanceName = '';
		    		self.rakDigitalAccessCardBlock.dacIssuanceCif='';
		    		self.rakDigitalAccessCardBlock.dacCardNumberPinIssue='';
		    		self.rakDigitalAccessCardBlock.dacCardNamePinIssue='';
		    		self.rakDigitalAccessCardBlock.selectedUser='';
		    		self.rakDigitalAccessCardBlock.selectedPinIssuanceCard='';
		    		self.rakDigitalAccessCardBlock.newpin='';
		    		self.rakDigitalAccessCardBlock.status='';
		    		self.rakDigitalAccessCardBlock.dateOfBirthDisp='';
		    		
		    		
		    		if(self.rakDigitalAccessCardBlock.selectedDACRequest=="B" && self.rakDigitalAccessCardBlock.selectedDACRequest){
		    			scope.setEvent('onRakDACBlockClick');
		    		}
		    		else if(self.rakDigitalAccessCardBlock.selectedDACRequest=="P" && self.rakDigitalAccessCardBlock.selectedDACRequest){
		    			scope.setEvent('onRakDACPinIssuanceClick');
		    		}
		    		else if(self.rakDigitalAccessCardBlock.selectedDACRequest=="A" && self.rakDigitalAccessCardBlock.selectedDACRequest){
		    			if(self.rakDigitalAccessCardBlock.digitalAccessCardUsersEligible.length==0){
		    				rootScope.showErrorPopup(rootScope.appLiterals.APP.RAK_SERVICES.RAKDACBLOCK.PIN_ISSUANCE_ERROR);
		    			}
		    		}
	    		},
	    		
	    		rakBlockDigitalAccessCardClick: function()
	    		{
	    			if (self.rakDigitalAccessCardBlock.reason=='Others'){
	    				self.rakDigitalAccessCardBlock.otherMandatory=true;
	    			}
	    			else{
	    				self.rakDigitalAccessCardBlock.otherMandatory=false;
	    			}
	    			
	    			/*if(self.rakDigitalAccessCardBlock.acceptTermscondition == 'N'){
						rootScope.showErrorPopup(rootScope.appLiterals.APP.RAK_COMMON.SELECTTERMSANDCONDITION);
					}
					else{*/
						scope.setEvent('onRAKDigitalAccessCardBlockConfirmClick');
					//}

	    		},
	    		
	    		rakIssuanceDigitalAccessCardClick: function()
	    		{
	    			if(self.rakDigitalAccessCardBlock.acceptTermscondition == 'N'){
						rootScope.showErrorPopup(rootScope.appLiterals.APP.RAK_COMMON.SELECTTERMSANDCONDITION);
					}
					else{
						scope.setEvent('onRAKDigitalAccessCardIssuanceConfirmClick');
					}
	    		},
	    		
	    		rakPinIssuanceDigitalAccessCardClick: function()
	    		{
	    			/*if(self.rakDigitalAccessCardBlock.acceptTermscondition == 'N'){
						rootScope.showErrorPopup(rootScope.appLiterals.APP.RAK_COMMON.SELECTTERMSANDCONDITION);
					}
					else{*/
						self.common.displayDate = self.rakDigitalAccessCardBlock.dateOfBirth;
						self.populateCurrentDateDetails();

						self.rakDigitalAccessCardBlock.dob_day =self.common.date;
						self.rakDigitalAccessCardBlock.dob_month=self.common.month;
						self.rakDigitalAccessCardBlock.dob_year=self.common.year;
						scope.setEvent('onRAKDigitalAccessCardPinIssuanceConfirmClick');
					// }
	    		},
	    		
	    		rakDigitalAccessCardInit: function(response){
	    			if(!response[0].hasOwnProperty("errorMessage") && self.rakDigitalAccessCardBlock.isInitial == 'Y'){
	    				self.rakDigitalAccessCardBlock.isSignatory = response[0].isSignatory;
	    				self.rakDigitalAccessCardBlock.digitalAccessCardListSignatory = response[0].digitalAccessCardServiceRequestSignatory;
	    				self.rakDigitalAccessCardBlock.digitalAccessCardListNonSignatory = response[0].digitalAccessCardServiceRequestNonSignatory;
	    				self.rakDigitalAccessCardBlock.digitalAccessCardUsersEligible = response[0].digitalAccessCardUsersEligible;	    				
	    				self.rakDigitalAccessCardBlock.emirateList = response[0].emirateList;
	    				self.rakDigitalAccessCardBlock.emiBranchList = response[0].emiBranchList;
	    				self.rakDigitalAccessCardBlock.OprAcctBranchList = response[0].OprAcctBranchList;
	    				self.rakDigitalAccessCardBlock.isInitial = 'N';
	    			}
	    			
	    		},
	    		
	    		initBlockDACConfirmPage: function(response){
	    			if(!response[0].hasOwnProperty("errorMessage")){
	    				self.rakDigitalAccessCardBlock.message = response[0].DUP_SUCCESS_MESSAGE;
	    				if(self.rakDigitalAccessCardBlock.selectedDACRequest && self.rakDigitalAccessCardBlock.selectedDACRequest=="B"){
	    					self.rakDigitalAccessCardBlock.dacCardNumberBlockConfirm = self.rakDigitalAccessCardBlock.digitalAccessCardListBlock[self.rakDigitalAccessCardBlock.selectedBlockCard].dacCardNo;
	    				}
	    				
	    				else if(self.rakDigitalAccessCardBlock.selectedDACRequest && self.rakDigitalAccessCardBlock.selectedDACRequest=="A"){
		    					self.rakDigitalAccessCardBlock.dacIssuanceName=self.rakDigitalAccessCardBlock.digitalAccessCardUsersEligible[self.rakDigitalAccessCardBlock.selectedUser].cardCustName;
		    					self.rakDigitalAccessCardBlock.dacIssuanceCif=self.rakDigitalAccessCardBlock.digitalAccessCardUsersEligible[self.rakDigitalAccessCardBlock.selectedUser].cardRcif;
		    				}
	    				else if(self.rakDigitalAccessCardBlock.selectedDACRequest && self.rakDigitalAccessCardBlock.selectedDACRequest=="P"){
	    					self.rakDigitalAccessCardBlock.dacCardNumberPinIssue=self.rakDigitalAccessCardBlock.digitalAccessCardPinIssuance[self.rakDigitalAccessCardBlock.selectedPinIssuanceCard].dacCardNo;
	    					self.rakDigitalAccessCardBlock.dacCardNamePinIssue=self.rakDigitalAccessCardBlock.digitalAccessCardPinIssuance[self.rakDigitalAccessCardBlock.selectedPinIssuanceCard].cardCustName;
	    					self.rakDigitalAccessCardBlock.dateOfBirthDisp = response[0].dob;
	    				}
	    			}
	    		},
	    		
	    		rakrakDigitalAccessCardBlockCardInit: function(response){
	    			if(!response[0].hasOwnProperty("errorMessage") && response[0].hasOwnProperty("digitalAccessCardListBlockCardEligible")){
	    				self.rakDigitalAccessCardBlock.digitalAccessCardListBlock = response[0].digitalAccessCardListBlockCardEligible;
	    				self.rakDigitalAccessCardBlock.reasonList = response[0].reasonList;
	    			}
	    		},
	    		
	    		rakrakDigitalAccessCardPinIssuanceInit: function(response){
	    			if(!response[0].hasOwnProperty("errorMessage") && response[0].hasOwnProperty("digitalAccessCardPinIssuanceListEligible")){
	    				self.rakDigitalAccessCardBlock.digitalAccessCardPinIssuance = response[0].digitalAccessCardPinIssuanceListEligible;
	    			}
	    		},
	    		rakDigitalAccessCardSuccess: function(responselist){

	    			if (!responselist[0].hasOwnProperty('errorMessage'))
	    			{
	    				self.rakDigitalAccessCardBlock.successMessage=responselist[0].successRequest;
	    				self.rakDigitalAccessCardBlock.newpin = responselist[0].NewPin;
	    				self.rakDigitalAccessCardBlock.status = responselist[0].status;
	    			}
	    		}
	    		/*branchOrAddressRqdCheck: function(){
	    			if(self.rakDigitalAccessCardBlock.isBranchOrAddress=="Collect from Branch"){
	    				self.rakDigitalAccessCardBlock.isBranchIdValidationRqd = true;
	    				self.rakDigitalAccessCardBlock.isAddressValidationRqd = false;
	    				self.rakDigitalAccessCardBlock.branchOrAddressToSend = "BRANCH";
	    				if(self.rakDigitalAccessCardBlock.selectedBranchId!="")
	    				self.rakDigitalAccessCardBlock.selectedBranchIdSend = self.rakDigitalAccessCardBlock.OprAcctBranchList[self.rakDigitalAccessCardBlock.selectedBranchId].branchId;
	    			}
	    			else{
	    				self.rakDigitalAccessCardBlock.isBranchIdValidationRqd = false;
	    				self.rakDigitalAccessCardBlock.isAddressValidationRqd = true;
	    				self.rakDigitalAccessCardBlock.branchOrAddressToSend = "COURIER";
	    				self.rakDigitalAccessCardBlock.selectedBranchIdSend = "";
	    			}
	    			// Added By  For Emirate Desc

		    		for (var x = 0; x < self.rakDigitalAccessCardBlock.emirateList.length; x++) {
		    			if (self.rakDigitalAccessCardBlock.emirateList[x].code == self.rakDigitalAccessCardBlock.emirateSeletected) {
		    				self.rakDigitalAccessCardBlock.emiSelDesc = self.rakDigitalAccessCardBlock.emirateList[x].codeDesc;
		    			}
		    		}
	    		},*/
	    		
	    		/*rakDACApplyModelOptionChange : function() {

	    			var branchListCount = 0;
	    			var emBranchDesc = [];
	    			self.rakDigitalAccessCardBlock.emiCategorizedBranchList = [];
	    			self.rakDigitalAccessCardBlock.isEmiSelected = true;
	    			for (var x = 0; x < self.rakDigitalAccessCardBlock.emiBranchList.length; x++) {
	    				if (self.rakDigitalAccessCardBlock.emiBranchList[x].code == self.rakDigitalAccessCardBlock.emirateSeletected) {
	    					emBranchDesc = self.rakDigitalAccessCardBlock.emiBranchList[x].codeDesc
	    							.split("|");
	    					break;
	    				}
	    			}

	    			for (var x = 0; x < emBranchDesc.length; x++) {
	    				for (var y = 0; y < self.rakDigitalAccessCardBlock.OprAcctBranchList.length; y++) {
	    					if (emBranchDesc[x] == self.rakDigitalAccessCardBlock.OprAcctBranchList[y].branchId) {
	    						self.rakDigitalAccessCardBlock.emiCategorizedBranchList[branchListCount] = self.rakDigitalAccessCardBlock.OprAcctBranchList[y];
	    						branchListCount++;
	    					}
	    				}
	    			}

	    		}*/
	    }
	    
	  // DAC CR changes end
	    
	    
};
