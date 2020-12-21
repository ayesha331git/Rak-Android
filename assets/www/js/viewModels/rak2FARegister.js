
App.viewModels.rak2FARegister = function(rootScope,scope, UIControlsService, Logger,ActionProcessor) {

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
			TRANSACTIONPASSWORD:'Transaction Password',
			TRANSACTIOPASSWORDSMSOTP:'Transaction PasswordSMS OTP',
			SMSOTP:'SMS OTP',
			SOFTTOKEN:'SOFT TOKEN',
			OFFLINEOTP:'OFFLINE OTP',
			 ACCNOTYPE:'A',
			 buildType:'',
			 PRPMPINLENGTH:'',
    PINLENGTH:4,
    PINLENGTHRET:4,
    PINLENGTHCORP:4,
    isRakTknDeReg:'NO'
    };
    
    
    self.RegistrationModel = {
    selectedNoType:"",
    enteredAcctNo:"",
    isRetailNormal:"false",
    isRetailOr:"false",
    isRetailAnd:"false",
    isSme:"false",
    isSmeWrkFlow:"N",
    isShowMobileNo:"false",
    mobileNo:"",
    dob:null,
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
    changeLoginPassword:false,
    isProceedClicked:false,
    isRegisterClicked:false,
    userIdsuccessMsg:'',
    previewDateOne:'',
    	backEvent:'',
		continueEvent:'',
		showSetPinPage:true,
    ezComAccountPin:'',
    setEzComAccountPin:'',
    setEzComAccountPinConfirm:'',
    otpEnableFlag:'',
        seamlessTokenFlow:"",
        fromHardTokenRegPage:"",
        smeUserId:"",
        principalId:"",

        resetRegistrationModelData :function(){
            self.RegistrationModel.selectedNoType=self.constants.ACCNOTYPE;
            self.RegistrationModel.enteredAcctNo="";
            self.RegistrationModel.isRetailNormal="false";
            self.RegistrationModel.isRetailOr="false";
            self.RegistrationModel.isRetailAnd="false";
            self.RegistrationModel.isSme="false";
            self.RegistrationModel.isSmeWrkFlow="N";
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
            self.RegistrationModel.requestType="ORON";
            self.RegistrationModel.cardNo="";
            self.RegistrationModel.pin="";
            self.RegistrationModel.successMsg="";
            self.RegistrationModel.pwdTypeFlag="";
            self.RegistrationModel.userIdsuccessMsg='';
            self.RegistrationModel.previewDateOne='';
            self.RegistrationModel.ezComAccountPin='';
            self.RegistrationModel.setEzComAccountPin='';
            rootScope.rakHome.cifId='';
            self.RegistrationModel.otpEnableFlag='';
             self.RegistrationModel.seamlessTokenFlow='';
             self.RegistrationModel.fromHardTokenRegPage='';
             self.RegistrationModel.smeUserId='';
             self.RegistrationModel.principalId="";
            
        },

    clearFlag:function(){

        self.RegistrationModel.isRegisterClicked=false;
    },

    chkOtpValidation:function(responsesList){
        
        if(responsesList && responsesList[0].hasOwnProperty('ResendMode')){
            self.tempSuccessResponse = self.tempResendAuthSuccessResponse;
        }else{
            self.tempSuccessResponse = responsesList;
        }
    	
    	
    	if (responsesList[0].hasOwnProperty('otpCheck')){
	        self.RegistrationModel.otpCheck = responsesList[0].otpCheck;
	  	}
    	if (responsesList[0].hasOwnProperty('successMsg')){
	      
	        self.RegistrationModel.otpMessage = responsesList[0].successMsg;
    	}
    	if (responsesList[0].hasOwnProperty('ShowBenfPopup')){
  	      
	        self.common.ShowBenfPopup = responsesList[0].ShowBenfPopup;
    	}
        self.common.registerOrErrorPopupFlag = responsesList[0].RegisteredDevice;
        self.RegistrationModel.tokenStatus = responsesList[0].tokenStatus;
        self.RegistrationModel.tsn = responsesList[0].tsn;


    },
        
    resendAuthMode:function(responsesList){
        if(responsesList && responsesList[0].hasOwnProperty('ResendTokenMode')){
            self.tempResendAuthSuccessResponse = responsesList;
        }
        if(responsesList && responsesList[0].hasOwnProperty('ResendMode')){
            
            
           // scope.successResponse.responsesList = self.tempResendAuthSuccessResponse;
            
        }
        
    },
    
    
    
    
    checkProceedClick:function(responsesList){

        if (!responsesList[0].hasOwnProperty('errorMessage')) {
        
            if (responsesList[0].hasOwnProperty('ProceedClick')){
                
            	if(responsesList[0].ProceedClick=="ProceedClicked")
            		{
            		self.RegistrationModel.isProceedClicked=true;
            		}

            }
        }
    },


    initSelfRegistrationData:function(responsesList){

        if (!responsesList[0].hasOwnProperty('errorMessage')) {
            self.RegistrationModel.seamlessTokenFlow="TokenRegistrationFlow";
           
            rootScope.rakRegister.jsessionid=responsesList[0].sessKey;
            self.jsessionid=responsesList[0].sessKey;
            
            if (responsesList[0].hasOwnProperty('tokenPinLength') && responsesList[0].tokenPinLength){
                self.constants.PINLENGTH = responsesList[0].tokenPinLength;
               // console.log(" PINLENGTH "+self.constants.PINLENGTH);
                
            }
            
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
            if (responsesList[0].hasOwnProperty('isSmeWrkFlow')){
                self.RegistrationModel.isSmeWrkFlow = responsesList[0].isSmeWrkFlow;
            }
            if (responsesList[0].hasOwnProperty('smeUserId')){
                self.RegistrationModel.smeUserId = responsesList[0].smeUserId;
            }
            if (responsesList[0].hasOwnProperty('principalId')){
            	self.RegistrationModel.principalId = responsesList[0].principalId;
            }
            if (responsesList[0].hasOwnProperty('isShowMobileNo')){
                self.RegistrationModel.isShowMobileNo = responsesList[0].isShowMobileNo;
            }
            if (responsesList[0].hasOwnProperty('cifId')){
              rootScope.rakHome.cifId = responsesList[0].cifId;
              rootScope.customerId=responsesList[0].cifId;
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
                self.RegistrationModel.previewDateOne =  responsesList[0].previewDate;
            }

            if (responsesList[0].hasOwnProperty('sectionId')){
                self.RegistrationModel.sectionId = responsesList[0].sectionId;

            }
            
        }
    },

		  populateCurrentDateDetails:function(){
              if(self.RegistrationModel.displayDate !="" && self.RegistrationModel.displayDate !=null){
                  var date=self.RegistrationModel.displayDate.getDate().toString();
                  var currMonth = self.RegistrationModel.displayDate.getMonth() + 1;
                  var month=currMonth.toString();
                  var year=self.RegistrationModel.displayDate.getFullYear().toString();
                  self.RegistrationModel.date =date;
                  self.RegistrationModel.month=month;
                  self.RegistrationModel.year=year;
              }
          },

    formatDate:function(selectedDate){
        //self.RegistrationModel.formatedDate = self.setFormatedDate(date);

        self.RegistrationModel.displayDate = selectedDate;
        self.RegistrationModel.populateCurrentDateDetails();
        self.RegistrationModel.selectedDate_day =self.RegistrationModel.date;
        self.RegistrationModel.selectedDate_month=self.RegistrationModel.month;
        self.RegistrationModel.selectedDate_year=self.RegistrationModel.year;


    },

    setPasswordFlag:function(){
        if(self.RegistrationModel.pwdTypeFlag=="S"){
            self.RegistrationModel.changeLoginPassword = true;
        }

        if(self.RegistrationModel.pwdTypeFlag=="B"){
            self.RegistrationModel.changeLoginPassword = true;

        }
    },

    generateOTPServiceCall:function(){
        if(self.RegistrationModel.isReGenOtpBtnClicked){
            //rootScope.showErrorPopup("OTP Generated Successfully and Sent to your Mobile Number.","OK");
            scope.setEvent('rakGenerateOTPServiceCallEvent');
            self.RegistrationModel.isReGenOtpBtnClicked = false;
        }
    },

    initSelfRegistrationPostOTPConfirmData:function(responsesList){
        if (responsesList[0].hasOwnProperty('sectionId')){
            self.RegistrationModel.sectionId = responsesList[0].sectionId;
        }
        if (responsesList[0].hasOwnProperty('cardNo')){
            self.RegistrationModel.cardNo = responsesList[0].cardNo;
        }
        if (responsesList[0].hasOwnProperty('successMsg')){
            self.RegistrationModel.successMsg = responsesList[0].successMsg;
        }

    },
    initSuccessPageMsg:function(responsesList){
        if(!responsesList[0].hasOwnProperty('errorMessage')){
            if (responsesList[0].hasOwnProperty('successMsg')){
                self.RegistrationModel.successMsg = responsesList[0].successMsg;
            }
        }
    },
    initSuccess:function(responsesList){
        if(!responsesList[0].hasOwnProperty('errorMessage')){
            if (responsesList[0].hasOwnProperty('successMsg')){
                self.common.successMsg = responsesList[0].successMsg;
            }
        }
		},

		resolveEventFor2FA:function(flowSelected){


			if(flowSelected){

				switch(flowSelected){
				
							
				case 'BENF_ADD_FUND':
					backEvent='onBackClickedToBenfFund';
					continueEvent='onRakContinueBenfFund';
					self.EzComToken.isFromNonLoginFlow=false;
                    self.EzComToken.isResendFlow='Y';
                    break;
                case 'BENF_CONFIRM':
                    backEvent='onBackClickedToBenfConfirm';
                    continueEvent='onRakContinueWithBenfConfirm';
                    self.EzComToken.isFromNonLoginFlow=false;
                    self.EzComToken.isResendFlow='Y';
                    break;
				case 'BENF_ADD_CARD':
					backEvent='onBackClickedToBenfCard';
					continueEvent='onRakContinueBenfCard';
					self.EzComToken.isFromNonLoginFlow=false;
                    self.EzComToken.isResendFlow='Y';
					break;
				case 'BENF_ADD_MOB':
					backEvent='onBackClickedToBenfMob';
					continueEvent='onRakContinueBenfMob';
					self.EzComToken.isFromNonLoginFlow=false;
                    self.EzComToken.isResendFlow='Y';
					break;
				case 'BENF_ADD_DD_MC':
					backEvent='onBackClickedToBenfDDMC';
					continueEvent='onRakContinueBenfDDMC';
					self.EzComToken.isFromNonLoginFlow=false;
                    self.EzComToken.isResendFlow='Y';
					break;
				case 'BENF_ADD_CARD_PP':
					backEvent='onBackClickedToBenfCardPP';
					continueEvent='onRakContinueBenfCardPP';
					self.EzComToken.isFromNonLoginFlow=false;
                    self.EzComToken.isResendFlow='Y';
					break;
				case 'BENF_ADD_BILLER':
					backEvent='onBackClickedToBenfBiller';
					continueEvent='onRakContinueBenfBiller';
					self.EzComToken.isFromNonLoginFlow=false;
                    self.EzComToken.isResendFlow='Y';
					break;
				case 'SENDMONEY':
					backEvent='onBackClickedToSendMoney';
					continueEvent='onRakContinueWithSendMoney';
					self.EzComToken.isFromNonLoginFlow=false;
                    self.EzComToken.isResendFlow='N';
					break;
				case 'BENF_ADD':
					backEvent='onBackClickedToBenfAdd';
					continueEvent='onRakContinueWithBenfAdd';
					self.EzComToken.isFromNonLoginFlow=false;
                    self.EzComToken.isResendFlow='Y';
					break;
				case 'RAKMONEY':
					backEvent='onBackClickedToRakMoney';
					continueEvent='onRakContinueWithRakMoney';
					self.EzComToken.isFromNonLoginFlow=false;
                    self.EzComToken.isResendFlow='N';
					break;
				case 'MOBILECASH':
					backEvent='onBackClickedToMobileCash';
					continueEvent='onRakContinueWithMobileCash';
					self.EzComToken.isFromNonLoginFlow=false;
                    self.EzComToken.isResendFlow='N';
					break;
				case 'PAYCARDS':
					backEvent='onBackClickedToPayCards';
					continueEvent='onRakContinueWithPayCards';
					rootScope.rakPayCards.common.fromAuthPage=true;
					self.EzComToken.isFromNonLoginFlow=false;
                    self.EzComToken.isResendFlow='N';
					break;
				case 'SENDMONEYAGAIN':
					backEvent='onBackClickedToSendMoneyAgain';
					continueEvent='onRakContinueWithSendMoney';
					self.EzComToken.isFromNonLoginFlow=false;
					rootScope.rakSendMoney.common.fromAuthPage=true;
                    self.EzComToken.isResendFlow='N';
					break;
				case 'SENDMONEYMODIFY':
					continueEvent='onRakContinueWithSendMoney';
					backEvent='onBackClickedToSendMoneyModify';
					self.EzComToken.isFromNonLoginFlow=false;
					rootScope.rakSendMoney.common.fromAuthPage=true;
                    self.EzComToken.isResendFlow='N';
					break;
				case 'RAKMONEYMODIFY':
					backEvent='onBackClickedToRakMoneyModify';
					continueEvent='onRakContinueWithRakMoney';
					self.EzComToken.isFromNonLoginFlow=false;
                    self.EzComToken.isResendFlow='N';
					break;
				case 'RAKMONEYPAYAGAIN':
					backEvent='onBackClickedToRakMoneyAgain';
					continueEvent='onRakContinueWithRakMoney';
					self.EzComToken.isFromNonLoginFlow=false;
                    self.EzComToken.isResendFlow='N';
					break;
				case 'PAYCARDSAGAIN':
					backEvent='onBackClickedToPayCardsAgain';
					continueEvent='onRakContinueWithPayCards';
					rootScope.rakPayCards.common.fromAuthPage=true;
					self.EzComToken.isFromNonLoginFlow=false;
                    self.EzComToken.isResendFlow='N';
					break;
				case 'PAYCARDSMODIFY':
					continueEvent='onRakContinueModifyPayCards';
					backEvent='onBackClickedToModifyPayCards';
					rootScope.rakPayCards.common.fromAuthPage=true;
					self.EzComToken.isFromNonLoginFlow=false;
                    self.EzComToken.isResendFlow='N';
					break;
						
				case 'BILLPMT':
					backEvent='onBackClickedToBillPay';
					continueEvent='onRakContinueWithBillPay';
					self.EzComToken.isFromNonLoginFlow=false;
                    self.EzComToken.isResendFlow='N';
					break;
				case 'BILLPMTAGAIN':
					backEvent='onBackClickedToBillPayAgain';
					continueEvent='onRakContinueWithBillPayAgain';
					self.EzComToken.isFromNonLoginFlow=false;
                    self.EzComToken.isResendFlow='N';
					break;
				case 'BILLPMTEDIT':
					backEvent='onBackClickedToBillEdit';
					continueEvent='onRakContinueWithBillEdit';
					self.EzComToken.isFromNonLoginFlow=false;
					self.EzComToken.isResendFlow='N';
					break;
					
				case 'CONFIRMLATER':
					backEvent='onBackClickedToConfirmLater';
					continueEvent='onRakContinueConfirmLater';
					self.EzComToken.isFromNonLoginFlow=false;
					self.EzComToken.isResendFlow='N';
					rootScope.rakPayee.isUserNavigatingBack=true;
					break;
					
					
				case 'MULTIBILLPAY':
					backEvent='onBackClickedToMultiQuickPay';
					continueEvent='onRakContinueWithMultiQuickPay';
					self.EzComToken.isFromNonLoginFlow=false;
                    self.EzComToken.isResendFlow='N';
					break;
				case 'QUICKPAY':
					backEvent='onBackClickedToQuickPay';
					continueEvent='onRakContinueWithQuickPay';
					self.EzComToken.isFromNonLoginFlow=false;
					break;
				case 'QUICKPAYAGAIN':
					backEvent='onBackClickedToQuickPayAgain';
					continueEvent='onBackClickedToQuickPayAgain';
					self.EzComToken.isFromNonLoginFlow=false;
                    self.EzComToken.isResendFlow='N';
					break
				case 'ADDBENF':
					backEvent='onBackClickedToAddBenf';
					continueEvent='onRakContinueWithAddBenf';
					self.EzComToken.isFromNonLoginFlow=false;
                    self.EzComToken.isResendFlow='N';
					break;
				case 'REG':
					continueEvent='onRakloginLableClick';
                    self.EzComToken.isResendFlow='N';
					break;
				case 'CORPREG':
					continueEvent='onRakCorploginLableClick';
                    self.EzComToken.isResendFlow='N';
					break;
				default:
					break;

				}


			}
		},

		navigateToPreviousFlow:function(){
			rootScope.rakPayee.common.fromAuthPage=true;
			scope.setEvent(backEvent);
		},
		navigateToNextFlow:function(){

			if(self.EzComToken.isFromNonLoginFlow){
				rootScope.reloadFunction2FA();
			}
			else{
				scope.setEvent(continueEvent);
			}
		}



	};



    	self.transactionApproval={
			pushMsg:'',
			pin:'',
			processTxnString:'',
			cifId:'',
			userId:'',
			txnStatus:'',
			serviceType:'',
			fromAcc:'',
			toAcc:'',
			txnCrn:'',
			txnAmount:'',
			txnDate:'',
			fromAccDisplay:'',
			toAccDisplay:'',
			payLoadString:'',
        newPayload:'',
        TxnDateDisplay:'',
        nonServiceType:'',
        benfType:'',
        benfName:'',
        fileName:'',
        isFileUpload:'',
        serviceTypeDescription:'',
    payLoadObject:{
    msg:{
    TypeOfTransaction:'',
    ServiceType:'',
    FromAcct:'',
    ToAcct:'',
    TxnAmount:'',
        TxnCrn:'',
        TxnDate:''
        
    },
        
    },
    
    payLoadObjectFileUpload:{
        msg:{
        TypeOfTransaction:'',
        ServiceType:'',
        TxnAmount:'',
            TxnCrn:'',
            TxnDate:'',
            FileName:''
            
        },
            
        },
    
    nonTxnPayLoadObject:{
        msg:{
        TypeOfTransaction:'',
        ServiceType:'',
		        BenfType:'',
		        BenfName:''            
        	},
            
     },
     
     nonTxnPayLoadObjectFileUpload:{
         msg:{
         TypeOfTransaction:'',
         ServiceType:'',
         FileName:''          
         	},
             
      },
     
    notificationData:'',
    pushTypeOfTransaction:'',
    
    approvalFlow:false,
		    successMessage:'',


			clearModels:function(){
				self.transactionApproval.pin='';
				self.transactionApproval.pushMsg='';
				self.transactionApproval.processTxnString='';
				self.transactionApproval.cifId='';
				self.transactionApproval.userId='';
				self.transactionApproval.txnStatus='2';
				self.transactionApproval.serviceType='';
				self.transactionApproval.fromAcc='';
				self.transactionApproval.toAcc='';
				self.transactionApproval.txnCrn='';
				self.transactionApproval.txnAmount='';
				self.transactionApproval.txnDate='';
				self.transactionApproval.payLoadString='';
				self.transactionApproval.payLoadObject={};
				self.transactionApproval.nonTxnPayLoadObject={};
				self.transactionApproval.payLoadObjectFileUpload={};
				self.transactionApproval.nonTxnPayLoadObjectFileUpload={};
				self.transactionApproval.successMessage='';
				self.transactionApproval.TxnAmountDisplay='';
				self.transactionApproval.TxnDateDisplay='';
				self.transactionApproval.fromAccDisplay='';
				self.transactionApproval.toAccDisplay='';
				self.transactionApproval.TxnAmountDisplay='';
				self.transactionApproval.pushTypeOfTransaction='';
				self.transactionApproval.nonServiceType='';
				self.transactionApproval.benfType='';
				self.transactionApproval.benfName='';
				self.transactionApproval.fileName='';
				self.transactionApproval.isFileUpload='';
				self.transactionApproval.serviceTypeDescription='';
				
				
				
        self.transactionApproval.approvalFlow=false;
        self.transactionApproval.notificationData='';
				
			},
			initTransactionApprovalFlow:function(data){
				// This flow will be moved to dashboard.js action reciever flow based on push payload obtained
				console.log("Init for Push Receival start");
				self.constants.buildType='CORP';
                recievedPushInitiate(function (successResponse) {
                                      //  console.log("recievedPushInitiate successResponse --> "+successResponse);
                                        
                                        self.result = successResponse.result;
                                        
                                        //console.log("recievedPushInitiate"+self.result);
                                        self.transactionApproval.navigateToPinPage(self.result);
                                     
                                     
                                        
                                        },
                                        function (errorResponse) {
                                        //console.log("recievedPushInitiate errorResponse --> "+errorResponse);
                                        },data.content,self.constants.buildType);

                
                
				// WL.App.sendActionToNative("recievedPushInitiate",data.content);
				 console.log("Init for Push Receival cif id");
				 self.transactionApproval.cifId=data.uid;
				 self.transactionApproval.pushMsg=data.content.content;
        self.transactionApproval.approvalFlow=true;
        rootScope.approvalFlow=true;
        console.log("Init for Push Receival end");

			},

			navigateToPinPage:function(statusObj){
			console.log("Init for Pin Page navigation start");
			var customerID = "";
			if(rootScope.customerId)
				{
				 customerID = rootScope.customerId.replace('.','');
				}
        if (rootScope.isUserLoggedIn
            && rootScope.pushData.userId != customerID
            && rootScope.pushData.isClicked == "true") {
            
            rootScope.showErrorPopup("Logged in user in unauthorized to perform the action.","OK");
         		 rootScope.$apply();
            self.approvalFlowFlag();
            
        }
        else{
            
        if(statusObj && statusObj.status  && !rootScope.isUserLoggedIn && rootScope.approvalFlow && self.EzComToken.indexFlow !="yes"){
				scope.setEvent('onInitiateTransaction');
			  }
        else if(statusObj && statusObj.status  && !rootScope.isUserLoggedIn && rootScope.approvalFlow && self.EzComToken.indexFlow=="yes"){
        	self.EzComToken.indexFlow="";
        	scope.setGlobalEvent('onInitiateTransactionIndexFlow');
        	rootScope.$apply();
		  }
        
        
			 else if(statusObj && statusObj.status && rootScope.isUserLoggedIn){
				 scope.setGlobalEvent('onInitiateTransaction');
            rootScope.$apply();
			 }else{
				 rootScope.showErrorPopup("Logged in user is unauthorized to perform the action.");
			 }
        }
			},

			submitPinForApproval:function(){
				console.log("Init for submitPinForApproval start");
                var data={};
		        data.pin = self.transactionApproval.pin;
                
                var isValid = self.validateApprovalTokenPIN();
                console.log("isValid" +isValid);
                
                if(flag){
                    return;
                }
                console.log("isValid" +isValid);
		        data.pushMsg=self.transactionApproval.pushMsg;
		      //  console.log("The Data in Submit Pin for approval"+data.pin +" PUSH MSG "+data.pushMsg);
                
		        self.constants.buildType='CORP';
                submitPinForApproval(function (successResponse) {
                                    console.log("submitPinForApproval successResponse --> ");
                                    
                                    self.result = successResponse.result;
                                    
                                    console.log("submitPinForApproval");
                                    self.transactionApproval.navigateToTxnDetails(self.result);
                                    
                                    
                                    
                                    },
                                    function (errorResponse) {
                                    console.log("submitPinForApproval errorResponse --> ");
                                    },data.pin,data.pushMsg,self.constants.buildType);
                
                
				//WL.App.sendActionToNative("submitPinForApproval",data);
				console.log("Init for submitPinForApproval end");
			},

			navigateToTxnDetails:function(processTxnString){
				console.log("Init for navigateToTxnDetails start");
				self.transactionApproval.processTxnString=processTxnString.processTxnString;
				console.log("Process txn string"+self.transactionApproval.processTxnString);
				console.log("Init for navigateToTxnDetails end");
				scope.setEvent("onSubmitPinClick");
			},
			initApprovalDetailsPage:function(responseList){
				
				if(!responseList[0].hasOwnProperty('errorMessage')){
					//Success Response rc=0
					self.transactionApproval.payLoadObject.s='0';
					self.transactionApproval.payLoadObject.rc='0';
					
					self.transactionApproval.nonTxnPayLoadObject.s='0';
					self.transactionApproval.nonTxnPayLoadObject.rc='0';
					
					self.transactionApproval.payLoadObjectFileUpload.s='0';
					self.transactionApproval.payLoadObjectFileUpload.rc='0';
					
					self.transactionApproval.nonTxnPayLoadObjectFileUpload.s='0';
					self.transactionApproval.nonTxnPayLoadObjectFileUpload.rc='0';
					
					self.transactionApproval.cifId=responseList[0].CIFID;
					self.transactionApproval.userId=responseList[0].UserID;
					//self.transactionApproval.txnStatus="2";
					
					if (responseList[0].hasOwnProperty('pushTypeOfTransaction')){
					      
				        self.transactionApproval.pushTypeOfTransaction = responseList[0].pushTypeOfTransaction;
			    	}
					if (responseList[0].hasOwnProperty('isFileUpload')){
					      
				        self.transactionApproval.isFileUpload = responseList[0].isFileUpload;
			    	}
					
					if(self.transactionApproval.pushTypeOfTransaction && self.transactionApproval.pushTypeOfTransaction=='NFTXN'){
						
						if(self.transactionApproval.isFileUpload && self.transactionApproval.isFileUpload=='Y'){
							
							self.transactionApproval.nonServiceType=responseList[0].nonServiceType;
							self.transactionApproval.fileName=responseList[0].fileName;
							self.transactionApproval.serviceTypeDescription=responseList[0].serviceTypeDescription;
						
							 self.transactionApproval.nonTxnPayLoadObjectFileUpload.msg.TypeOfTransaction="NFTXN";
							 self.transactionApproval.nonTxnPayLoadObjectFileUpload.msg.ServiceType=self.transactionApproval.nonServiceType;
						     self.transactionApproval.nonTxnPayLoadObjectFileUpload.msg.FileName=self.transactionApproval.fileName;
						     
						     
						     self.transactionApproval.newPayload = JSON.stringify(self.transactionApproval.nonTxnPayLoadObjectFileUpload);
							
						}else{
							
							self.transactionApproval.nonServiceType=responseList[0].nonServiceType;
							self.transactionApproval.benfType=responseList[0].pushBenfType;
							self.transactionApproval.benfName=responseList[0].pushBenfName;
							 self.transactionApproval.nonTxnPayLoadObject.msg.TypeOfTransaction="NFTXN";
							 self.transactionApproval.nonTxnPayLoadObject.msg.ServiceType=self.transactionApproval.nonServiceType;
						     self.transactionApproval.nonTxnPayLoadObject.msg.BenfType=self.transactionApproval.benfType;
						     self.transactionApproval.nonTxnPayLoadObject.msg.BenfName=self.transactionApproval.benfName;
						     
						     self.transactionApproval.newPayload = JSON.stringify(self.transactionApproval.nonTxnPayLoadObject);
							
						}
						
						
					 
				
					}
					else{
						
						if(self.transactionApproval.isFileUpload && self.transactionApproval.isFileUpload=='Y'){
							
							self.transactionApproval.serviceType=responseList[0].ServiceType;
						
							self.transactionApproval.txnCrn=responseList[0].TxnCrn;
							self.transactionApproval.txnAmount=responseList[0].TxnAmount;
							self.transactionApproval.txnDate=responseList[0].TxnDate;
							self.transactionApproval.TxnAmountDisplay = responseList[0].TxnAmountDisplay;
							self.transactionApproval.TxnDateDisplay = responseList[0].TxnDate;
							self.transactionApproval.fileName=responseList[0].fileName;
							self.transactionApproval.serviceTypeDescription=responseList[0].serviceTypeDescription;
			
							
	                        self.transactionApproval.payLoadObjectFileUpload.msg.TypeOfTransaction="FTXN";
					        self.transactionApproval.payLoadObjectFileUpload.msg.ServiceType=responseList[0].ServiceType;
					       
					        self.transactionApproval.payLoadObjectFileUpload.msg.TxnAmount=responseList[0].TxnAmount;
			                self.transactionApproval.payLoadObjectFileUpload.msg.TxnCrn=responseList[0].TxnCrn;
		
			                self.transactionApproval.payLoadObjectFileUpload.msg.TxnDate=responseList[0].TxnDateSDK;
			                self.transactionApproval.payLoadObjectFileUpload.msg.FileName=self.transactionApproval.fileName;
			                
			                self.transactionApproval.newPayload = JSON.stringify(self.transactionApproval.payLoadObjectFileUpload);
							
						}
						else{
							
							self.transactionApproval.serviceType=responseList[0].ServiceType;
							self.transactionApproval.fromAcc=responseList[0].FromAcc;
							self.transactionApproval.toAcc=responseList[0].ToAcc;
							self.transactionApproval.fromAccDisplay=responseList[0].FromAccDisplay;
							self.transactionApproval.toAccDisplay=responseList[0].ToAccDisplay;
							self.transactionApproval.txnCrn=responseList[0].TxnCrn;
							self.transactionApproval.txnAmount=responseList[0].TxnAmount;
							self.transactionApproval.txnDate=responseList[0].TxnDate;
							self.transactionApproval.TxnAmountDisplay = responseList[0].TxnAmountDisplay;
							self.transactionApproval.TxnDateDisplay = responseList[0].TxnDate;
			
							//self.transactionApproval.payLoadObject.Status=responseList[0].TxnStatus;
	                        self.transactionApproval.payLoadObject.msg.TypeOfTransaction="FTXN";
					        self.transactionApproval.payLoadObject.msg.ServiceType=responseList[0].ServiceType;
					        self.transactionApproval.payLoadObject.msg.FromAcct=responseList[0].FromAcc;
					        self.transactionApproval.payLoadObject.msg.ToAcct=responseList[0].ToAcc;
					        self.transactionApproval.payLoadObject.msg.TxnAmount=responseList[0].TxnAmount;
			                self.transactionApproval.payLoadObject.msg.TxnCrn=responseList[0].TxnCrn;
		
			                self.transactionApproval.payLoadObject.msg.TxnDate=responseList[0].TxnDateSDK;
			                
			                self.transactionApproval.newPayload = JSON.stringify(self.transactionApproval.payLoadObject);
							
							
							
						}
						
						
					
	                
					}
					
					
		        
				}

             

			},
			submitApproval:function(){
				self.constants.buildType='CORP';
                
                SubmitApproval(function (successResponse) {
                                     console.log("SubmitApproval successResponse --> ");
                                     
                                     self.result = successResponse.result;
                                     
                                     console.log("SubmitApproval"+self.result);
                                     self.transactionApproval.navigateToApprovalSuccess(self.result);
                                     
                                     
                                     
                                     },
                                     function (errorResponse) {
                                     console.log("SubmitApproval errorResponse --> "+errorResponse);
                                     },self.transactionApproval,self.constants.buildType);
                
         
			},
			navigateToApprovalSuccess:function(signedtxnString){

        self.transactionApproval.payLoadString=signedtxnString.signedTxnString;
				scope.setEvent('onApproveClick');
			},

			successPage:function(responseList){
				self.transactionApproval.successMessage=responseList.successMessage;
			}





	};




    self.passwordType={
    Both:0,
    Transaction:1,
    Login:2,
    None:-1
    };


    self.LoginTxnPwdModel ={

    loginPwd:"",
    loginPwdConfirm:"",

    resetPwdFields:function(){

        self.LoginTxnPwdModel.loginPwd = "";
        self.LoginTxnPwdModel.loginPwdConfirm = "";


    },


    };




    //This function checks the strength of the password





    self.common={
    successMsg:"",
			registerOrErrorPopupFlag:false,
			ShowBenfPopup:'NO',
    flag:false

    };


    /*	self.validateUserResponse=function(responsesList){
     if (responsesList[0].hasOwnProperty('userIDsuccessMsg')){
     self.RegistrationModel.userIdsuccessMsg = responsesList[0].userIDsuccessMsg;
     }
     else{
     self.RegistrationModel.userIdsuccessMsg='';
     }
     };
     */

    //can be removed added for auto tab
    self.pinValidate=function(){
        $(".rakPinText22").keyup(function () {
                                 if (this.value.length == this.maxLength) {
                                 var $next = $(this).next('.rakPinText22');
                                 if ($next.length)
                                 $(this).next('.rakPinText22').focus();
                                 else
                                 $(this).blur();
                                 }
                                 });
    };



self.EzComToken= {

    ezComObject:"",
    isEzComAccountAvailable:false,
    generatedPin:'',
    generatedToken:'',
    isEzComAccountCreated:'',
    isEzComAccountSaved:'',
    tsn:'',
    isTokenRegistrationDone:'',
    payLoadGenerationReceivedData:'',
    isFromNonLoginFlow:true,
    isResendFlow:'N',
    loginFlow:'',
    indexFlow:'',
    corpFlow:'',
    tokenIconCheck:"NO",
    fieldList:["rak2FARegister.RegistrationModel.setEzComAccountPin","rak2FARegister.RegistrationModel.setEzComAccountPinConfirm"],


    resetEzComTokenModels: function(){
    	self.EzComToken.ezComObject="";
    	self.EzComToken.isEzComAccountAvailable=false;
    	self.EzComToken.generatedPin="";
    	self.EzComToken.generatedToken="";
    	self.EzComToken.isEzComAccountCreated="";
    	self.EzComToken.isEzComAccountSaved="";
    	self.EzComToken.tsn="";
    	self.EzComToken.isTokenRegistrationDone=false;
    	self.EzComToken.payLoadGenerationReceivedData="";
    	self.EzComToken.isFromNonLoginFlow = true;
    	self.EzComToken.loginFlow = '';
    	self.EzComToken.indexFlow = "no";
       // self.EzComToken.tokenIconCheck="NO";


    },
    
    

 checkTokenImageStatusCORP :function(){
        
        console.log("checkTokenImageStatus");
            checkImageAndPinLength(function (successResponse) {
                                   console.log("checkImageAndPinLength successResponse --> ");
                                   
                                   self.EzComToken.isEzComAccountAvailable = successResponse.result.isEzComAccAvailable;
                                   if(successResponse.result.tokenPinLength){
                                   self.constants.PINLENGTH = successResponse.result.tokenPinLength;
                                   self.constants.PINLENGTHRET = successResponse.result.tokenPinLengthRET;
                                   self.constants.PINLENGTHCORP = successResponse.result.tokenPinLengthCORP;
                                   }
                         
                         if(!self.EzComToken.isEzComAccountAvailable || self.EzComToken.isEzComAccountAvailable=="false")
                         {
                        	 self.EzComToken.tokenIconCheck="NO";

                         }
                         else{
                        	 self.EzComToken.tokenIconCheck="YES";
                         }
                         
                        
                       
                        
                                   },
                                   function (errorResponse) {
                                   console.log("checkImageAndPinLength errorResponse --> ");
                                   },'CORP');
   
        console.log("checkTokenImageStatus end");
    },
    
    

    
    
  checkTSNStatus :function(){
        
        console.log("checkTSNStatus start");
        fetchTsnFromEzComObject(function (successResponse) {
            console.log("checkTSNStatus successResponse --> ");
            self.result = successResponse.result;
            self.EzComToken.tsn = self.result.tsnFromEzAccount;
            var event ="onCheckTSNStatus";
            if(self.EzComToken.corpFlow=='CORP')
	   		 {
            	event ="onCorpCheckTSNStatus";
	            	
	   		 }
            
            ActionProcessor.setEvent(event).then(function(payload) {
        		 console.log("Response for onCheckTSNStatus ");
                 var data={};
                 data = payload.responsesList[0];
                 
                 if (!data.hasOwnProperty('errorMessage')) {
                 console.log("Success Block for onCheckTSNStatus");
	                 if (data.hasOwnProperty('getTSNStatus') && data.getTSNStatus=="REGISTERED"){
	                	 self.EzComToken.clearEzComObject();
                 	}
	                 
                 }
                

                 },function(errorPayload){
                 console.log("Error Block for onCheckTSNStatus");
             });
            
            
            },
            function (errorResponse) {
            console.log("checkTSNStatus errorResponse --> ");
            },self.constants.buildType);
       
        console.log("checkTSNStatus end");
    },
    
    
    deRegClearEzComObject :function(){		
		
        console.log("deRegClearEzComObject");		
        clearEzComObject(function (successResponse) {		
                         console.log("deRegClearEzComObject successResponse --> ");		
                         		
                         self.result = successResponse.result;	
                         self.EzComToken.tokenIconCheck="NO";
                       		
                         		
                         },		
                         function (errorResponse) {		
                         console.log("deRegClearEzComObject errorResponse --> ");		
                         },self.constants.buildType);		
        		
        console.log("deRegClearEzComObject end");		
    },
   

    
    clearEzComObject :function(){
        
        console.log("clearEzComObject");
        clearEzComObject(function (successResponse) {
                         console.log("clearEzComObject successResponse --> ");
                         
                         self.result = successResponse.result;
                         self.EzComToken.tokenIconCheck="NO";
                         
                         if(self.EzComToken.corpFlow!='CORP')
            	   		 {
                        	
	                         resetPageError();
	                         rak2FARegister.RegistrationModel.resetRegistrationModelData();
	                         rak2FARegister.RegistrationModel.requestType='FUON';
	                         rak2FARegister.RegistrationModel.clearFlag();
	                         rak2FARegister.RegistrationModel.isRegisterClicked=true;
	                         rak2FARegister.RegistrationModel.resolveEventFor2FA('REG');
            	   		 }
                         rak2FARegister.EzComToken.checkEzComObject();
                         
                         
                         },
                         function (errorResponse) {
                         console.log("clearEzComObject errorResponse --> ");
                         },self.constants.buildType);
        

        console.log("clearEzComObject end");
    },
    

    checkEzComObject :function(){
        
        console.log("checkEzComObject");
        checkEzComObject(function (successResponse) {
                        console.log("checkEzComObject successResponse --> ");
                        
                         self.result = successResponse.result;
                        
                         console.log("checkEzComObject"+self.result);
                         self.EzComToken.checkEzComObjectResponse(self.result);
                        
                         },
                        function (errorResponse) {
                          console.log("checkEzComObject errorResponse --> ");
                        },self.constants.buildType);
   
        console.log("checkEzComObject end");
    },
    
    
    clearEzComObject :function(){
        
        console.log("clearEzComObject");
        clearEzComObject(function (successResponse) {
                        console.log("clearEzComObject successResponse --> ");
                        
                         self.result = successResponse.result;
                       
                        
                         },
                        function (errorResponse) {
                          console.log("clearEzComObject errorResponse --> ");
                        },self.constants.buildType);
   
        console.log("checkEzComObject end");
    },
    
    
    
    

        getEzEvent:function(){

        	 if(!self.EzComToken.isEzComAccountAvailable || self.EzComToken.isEzComAccountAvailable=="false")
             {
        		 if(self.EzComToken.corpFlow=='CORP')
        		 {
        			  scope.setEvent("onRakCorploginLableClick");
                      console.log("onRakCorploginLableClick Response>>>>>>>>>");
        			 
        		}
        		 else
        		{
        			 
	                 scope.setEvent("onRakTokenIDClick");
	                 console.log("onRakTokenIDClick Response>>>>>>>>>");
        		}
 		self.EzComToken.tokenIconCheck="NO";
             }
             else{
 		if(rootScope.rakHome.corploginCliked){
            		 scope.setEvent("onRakCorpTokenGeneration");
                     console.log("onRakTokenGeneration Response>>>>>>>>>");
            	 }
            	 else{
            		 scope.setEvent("onRakTokenGeneration");
                     console.log("onRakTokenGeneration Response>>>>>>>>>");
            	 }
                  self.EzComToken.tokenIconCheck="YES";

             }
        },


    checkEzComObjectResponse:function(data){
        console.log("checkEzComObjectResponse start");

        self.EzComToken.isEzComAccountAvailable = data.isEzComAccAvailable;

        self.EzComToken.getEzEvent();

    },

      //ADDED FOR CORP 2FA REGISTRATION
    /*    corpCheckEzComObjectResponse:function(data){
            console.log("checkEzComObjectResponse start");

            self.EzComToken.isEzComAccountAvailable = data.isEzComAccAvailable;
            
            if(!isEzComAccountAvailable){
            	rak2FARegister.initiateRegistrationForAuth('onsetupClick');
            }
            else
            	rootScope.showErrorPopup("The device is already registered by other user.","OK");

           // self.EzComToken.getEzEvent();

        },*/

    checkEzComObjectResponse:function(data){
        console.log("checkEzComObjectResponse start");
       
        self.EzComToken.isEzComAccountAvailable = data.isEzComAccAvailable;
   

        self.EzComToken.getEzEvent();

    },



    checkGenericEzComObjectResponse:function(data){
        console.log("checkEzComObjectResponse start");

        self.EzComToken.isEzComAccountAvailable = data.isEzComAccAvailable;

    },

    processPostActivationActionResponse :function(data){

        console.log("processPostActivationActionResponse start");
        self.EzComToken.isEzComAccountCreated = data.isEzComAccountCreated;

        if(self.EzComToken.isEzComAccountCreated || self.EzComToken.isEzComAccountCreated=="true")
        {
            console.log("onRakSetTokenPin Response>>>>>>>>>"+ self.EzComToken.isEzComAccountCreated);
        //    scope.setEvent("onRakSetTokenPin");
            self.EzComToken.setEzComAccountPin();

           
        }
        else{
            console.log("onRakSetTokenPin else Response>>>>>>>>>");

        }
        console.log("processPostActivationActionResponse end");

    },


    setEzComAccountPin :function(){

        console.log("setEzComAccountPin");
        var flag=false;
        
        for(var index in self.EzComToken.fieldList){
        	var fieldName=self.EzComToken.fieldList[index];
            var fieldValue=rootScope.$eval(self.EzComToken.fieldList[index]);
        	if(!fieldValue){
        		rootScope.pageErrorArr[fieldName]=rootScope.appLiterals.APP.RAKERRORMSG.VALIDATORTYPEMSG['required'];
        		flag=true;
        	}
        	
        	 if(fieldValue && fieldValue.length < self.constants.PINLENGTH){
          		//rootScope.pageErrorArr[fieldName]=rootScope.appLiterals.APP.RAKERRORMSG.VALIDATORTYPEMSG['minLength'] +" "+self.constants.PINLENGTH;
        		 rootScope.pageErrorArr[fieldName]=rootScope.appLiterals.APP.RAKERRORMSG.VALIDATORTYPEMSG['min2FALength'] +" "+self.constants.PINLENGTH+" "+rootScope.appLiterals.APP.RAKERRORMSG.VALIDATORTYPEMSG['min2FALengthChar'] ;
          	    flag=true;
              }
        	
        	
        	
        }
        if(flag){
        	return;
        }
      
        
        if(self.RegistrationModel.setEzComAccountPin!=self.RegistrationModel.setEzComAccountPinConfirm){
        	rootScope.showErrorPopup("Entered PINs do not match","OK");
        	return;
        }
        

        var data={};

        data.saveTokenPin = self.RegistrationModel.setEzComAccountPin;
        
        
        
        setEzComAccountPin(function (successResponse) {
                         console.log("setEzComAccountPin successResponse --> ");
                         
                         self.result = successResponse.result;
                         
                         console.log("setEzComAccountPin"+self.result);
                         self.EzComToken.setEzComAccountPinActionResponse(self.result);
                         
                         },
                         function (errorResponse) {
                         console.log("setEzComAccountPin errorResponse --> ");
                         },data.saveTokenPin,self.constants.buildType);
        
        
    
        console.log("setEzComAccountPin end");
    },


     setEzComAccountPinActionResponse :function(data){
    	 	self.EzComToken.tokenIconCheck="YES";

            console.log("setEzComAccountPinActionResponse start");
            self.EzComToken.isEzmComAccountSaved = data.isEzmComAccountSaved;

            if(self.EzComToken.isEzmComAccountSaved || self.EzComToken.isEzmComAccountSaved=="true")
            {
                console.log("onRakSetTokenSavedSuccess Response>>>>>>>>>"+ self.EzComToken.isEzmComAccountSaved);


                if(!(self.EzComToken.corpFlow && self.EzComToken.corpFlow=="CORP"))
	           	{
	           	
	           	 console.log(" Response>>>>>>>>>"+ self.EzComToken.isEzComAccountCreated);
	           
	           	
	               if(! self.EzComToken.isFromNonLoginFlow)
	               {
	            	   rootScope.dashboard.init2FAPush("LOGIN");
	            	   console.log("On EzComAccountPinResponse set event");
	            	
	               }
	               
	               else
	            	   {
	            	   console.log("On initPushNotificationRegister commented");
	            	   rootScope.dashboard.init2FAPush("PRELOGIN");
	            	   
	            	   }
               
	           	}
                else
                {
                	rootScope.dashboard.init2FAPush("LOGIN");
               
               
                }

            }
            else{
                console.log("onRakSetTokenSavedSuccess else Response>>>>>>>>>");

            }
            console.log("setEzComAccountPinActionResponse end");

        },

    generateEzComTokenNumber :function(ezComAccountPin){

        console.log("generateEzComTokenNumber start");
        var data={};
        data.tokenPin = ezComAccountPin;
        
        generateEzComTokenNumber(function (successResponse) {
                         console.log("generateEzComTokenNumber successResponse --> ");
                         
                         self.result = successResponse.result;
                         
                         console.log("generateEzComTokenNumber"+self.result);
                         self.EzComToken.generateEzComTokenNumberActionResponse(self.result);
                         
                         
                         },
                         function (errorResponse) {
                         console.log("generateEzComTokenNumber errorResponse --> ");
                         },data.tokenPin,self.constants.buildType);
        
        
        console.log("generateEzComTokenNumber end");

    },



    generateEzComTokenNumberActionResponse :function(data){

        console.log("generateEzComTokenNumberActionResponse start");
        self.EzComToken.generatedToken = data.generatedToken;

        if(self.EzComToken.generatedToken)
        {
            console.log("onRakTokenIDClick Response>>>>>>>>>"+ self.EzComToken.generatedToken);
            //scope.setEvent("onRakGeneratedPin");
            
            rootScope.rakHome.AuthPageData.firstAuthModeValue = self.EzComToken.generatedToken;
			//console.log('otp generated '+rootScope.rakHome.AuthPageData.firstAuthModeValue);
            
            
            fetchTsnFromEzComObject(function (successResponse) {
                               console.log("fetchTsnFromEzComObject successResponse --> "+successResponse);
                               
                               self.result = successResponse.result;
                               
                              // console.log("fetchTsnFromEzComObject"+self.result);
                               self.EzComToken.fetchTsnActionResponse(self.result);
                               
                               },
                               function (errorResponse) {
                               console.log("fetchTsnFromEzComObject errorResponse --> ");
                               },self.constants.buildType);
            
            
			 var data={};       
		     data.tsn = rootScope.rak2FARegister.EzComToken.tsn;
            fetchEzComObjectFromTsn(function (successResponse) {
                                     console.log("fetchEzComObjectFromTsn successResponse --> ");
                                     
                                  
                                     },
                                     function (errorResponse) {
                                     console.log("fetchEzComObjectFromTsn errorResponse --> ");
                                     },data.tsn,self.constants.buildType);

            
            
			 
			 scope.setEvent(rootScope.rakHome.AuthPageData.eventSelected);

        }
        else{
            console.log("onRakTokenGeneration Response>>>>>>>>>");

        }
        console.log("generateEzComTokenNumberActionResponse end");

    },

    fetchTsnActionResponse :function(data){
    	console.log("fetchTsnActionResponse start");
    	if(data && data.tsnFromEzAccount){
    		 self.EzComToken.tsn = data.tsnFromEzAccount;
        }
       
        console.log("fetchTsnActionResponse end");
    },
    
    fetchCorpTsnActionResponse :function(data){
    	console.log("fetchTsnActionResponse start");
    	self.EzComToken.tsn ="";
    	if(data && data.tsnFromEzAccount){
        self.EzComToken.tsn = data.tsnFromEzAccount;
    	}
       // scope.setEvent(rootScope.home.getLoginEventForAppMode(rootScope.isStubbedVersion));
        console.log("fetchTsnActionResponse end");
    }



    };




    self.softToken= {
    payLoadData:""

    };
    self.softToken.payLoadData='';


    self.buildParameters1=function(){
        var parameters={};
        rootScope.urlType='s/regeztoken';

        rootScope.actionBy="CORP_SME_APP";
        
        if(self.constants.PRPMPINLENGTH)
        {   self.constants.PINLENGTH =  self.constants.PRPMPINLENGTH;
        }
        
        
        
    };

    self.buildParameters2=function(){
        var parameters={};
        rootScope.urlType='s/regeztoken';

        rootScope.actionBy="test";

    };


    self.initiateTxnRegistrationForAuth=function(eventName){
        self.buildParameters1();
        console.log("Call made For initiateTxnRegistrationForAuth");
        ActionProcessor.setEvent(eventName).then(function(payload) {
        	self.EzComToken.isTokenRegistrationDone=true;

                                                 console.log("Call returnedinitiateTxnRegistrationForAuth >>>>>>>>>");
                                                 var appId = rootScope.applicationID;

                                                 // WL.Client.getAppProperty(WL.AppProperty.APP_DISPLAY_NAME);

                                                 var deviceId=rootScope.deviceID;
                                                 console.log("APPID --> "+appId +"device Id "+deviceId);
                                                 console.log("Response ");
                                                 var data={};
                                                 data = payload.responsesList[0];

                                                 data.deviceId = deviceId;
                                                 data.appId = appId;
                                                 console.log(" soft token start");

                                                 
                                                 processActivationString(function (successResponse) {
                                                                  console.log("processActivationString successResponse --> ");
                                                                  
                                                                  self.result = successResponse.result;
                                                                  
                                                                  console.log("processActivationString");
                                                                        
                                                                        self.EzComToken.payLoadGenerationReceivedData =self.result;
                                                                         
                                                                        
                                                                         
                                                                  
                                                                  },
                                                                  function (errorResponse) {
                                                                         },data.encodedQRCodeImg,data.deviceId,data.appId,self.constants.PINLENGTH,self.constants.buildType);

                                                 
                                    
                                                 console.log("Success Block for 2FA");



                                                 },function(errorPayload){
                                                 console.log("Error Block for 2FA");
                                                 });
    };



    self.initTxnPayLoadGeneration=function(data){
        console.log("Call made For Registration initTxnPayLoadGeneration");
        
        var flag=false;
        
        for(var index in self.EzComToken.fieldList){
        	var fieldName=self.EzComToken.fieldList[index];
            var fieldValue=rootScope.$eval(self.EzComToken.fieldList[index]);
        	if(!fieldValue){
        		rootScope.pageErrorArr[fieldName]=rootScope.appLiterals.APP.RAKERRORMSG.VALIDATORTYPEMSG['required'];
        		flag=true;
        	}
        	
        	 if(fieldValue && fieldValue.length < self.constants.PINLENGTH){
          		//rootScope.pageErrorArr[fieldName]=rootScope.appLiterals.APP.RAKERRORMSG.VALIDATORTYPEMSG['minLength'] +" "+self.constants.PINLENGTH;
        		 rootScope.pageErrorArr[fieldName]=rootScope.appLiterals.APP.RAKERRORMSG.VALIDATORTYPEMSG['min2FALength'] +" "+self.constants.PINLENGTH+" "+rootScope.appLiterals.APP.RAKERRORMSG.VALIDATORTYPEMSG['min2FALengthChar'] ;
          	    flag=true;
              }
        	
        	
        	
        }
        if(flag){
        	return;
        }
      
        
        if(self.RegistrationModel.setEzComAccountPin!=self.RegistrationModel.setEzComAccountPinConfirm){
        	rootScope.showErrorPopup("Entered PINs do not match","OK");
        	return;
        }
        
        rootScope.urlType='m/actmp';
        self.softToken.payLoadData=data.encodedResponse;
        ActionProcessor.setEvent("onPayLoadGeneration").then(function(payload) {

                               console.log("Pay Load call ResponseinitTxnPayLoadGeneration>>>>>>>>>");

                               console.log("Response for payload ");
                                                             var data={};
                                                             data = payload.responsesList[0];
                                                             
                                                             processActivatedTsn(function (successResponse) {
                                                                                     console.log("processActivatedTsn successResponse --> ");
                                                                                     
                                                                                     self.result = successResponse.result;
                                                                                     
                                                                                     console.log("processActivatedTsn");
                                                                                 
                                                                                  self.EzComToken.processPostActivationActionResponse(self.result);
                                                                                     
                                                                                     
                                                                                     },
                                                                                     function (errorResponse) {
                                                                                     },data,self.constants.buildType);
                                                             


                                                            // WL.App.sendActionToNative("processActivatedTsn",data);
                                                             console.log("Success Block for 2FA");



                                                             },function(errorPayload){
                                                             console.log("Error Block for 2FA");
                                                             });

  };



    self.initiateRegistrationForAuth=function(eventName){
        self.buildParameters1();
        console.log("Call made For Registration");
        ActionProcessor.setEvent(eventName).then(function(payload) {
        	self.EzComToken.isTokenRegistrationDone=true;

                                                 console.log("Call returned >>>>>>>>>");
                                                 // var appId = WL.Client.getAppProperty(WL.AppProperty.APP_DISPLAY_NAME);

                                                 var appId = rootScope.applicationID;

                                                 var deviceId=rootScope.deviceID;
                                                 console.log("APPID --> "+appId +"device Id "+deviceId);
                                                 console.log("Response ");
                                                 var data={};
                                                 data = payload.responsesList[0];

                                                 data.deviceId = deviceId;
                                                 data.appId = appId;
                                                 console.log(" soft token start");
                                                 
                                                 
                                                 
                                                 processActivationString(function (successResponse) {
                                                                         console.log('processActivationString successResponse --> ');
                                                                         
                                                                         self.result = successResponse.result;
                                                                         
                                                                         console.log("processActivationString");
                                                                         
                                                                         self.EzComToken.payLoadGenerationReceivedData =self.result;
                                                                         
                                                                         if(! self.EzComToken.isFromNonLoginFlow)
                                                                         {
                                                                         self.initPayLoadGeneration(self.result);
                                                                         }
                                                                         
                                                                         
                                                                         },
                                                                         function (errorResponse) {
                                                                         console.log("Error Response is initPayLoadGeneration------------>"+errorResponse);
                                                                         },data.encodedQRCodeImg,data.deviceId,data.appId,self.constants.PINLENGTH,self.constants.buildType);
                                                 
                                                 //   WL.App.sendActionToNative("processActivationString",data);
                                                 console.log("Success Block for 2FA");



                                                 },function(errorPayload){
                                                 console.log("Error Block for 2FA");
                                                 });
    };



    self.initPayLoadGeneration=function(data){
    	
    	var flag=false;
        
        for(var index in self.EzComToken.fieldList){
        	var fieldName=self.EzComToken.fieldList[index];
            var fieldValue=rootScope.$eval(self.EzComToken.fieldList[index]);
        	if(!fieldValue){
        		rootScope.pageErrorArr[fieldName]=rootScope.appLiterals.APP.RAKERRORMSG.VALIDATORTYPEMSG['required'];
        		flag=true;
        	}
        	
        	 if(fieldValue && fieldValue.length < self.constants.PINLENGTH){
          		//rootScope.pageErrorArr[fieldName]=rootScope.appLiterals.APP.RAKERRORMSG.VALIDATORTYPEMSG['minLength'] +" "+self.constants.PINLENGTH;
        		 rootScope.pageErrorArr[fieldName]=rootScope.appLiterals.APP.RAKERRORMSG.VALIDATORTYPEMSG['min2FALength'] +" "+self.constants.PINLENGTH+" "+rootScope.appLiterals.APP.RAKERRORMSG.VALIDATORTYPEMSG['min2FALengthChar'] ;
          	    flag=true;
              }
        	
        	
        	
        }
        if(flag){
        	return;
        }
      
        
        if(self.RegistrationModel.setEzComAccountPin!=self.RegistrationModel.setEzComAccountPinConfirm){
        	rootScope.showErrorPopup("Entered PINs do not match","OK");
        	return;
        }
    	
        console.log("Call made For Registration 22");
        rootScope.urlType='m/actmp';
        if(!data.encodedResponse){
        	rootScope.showErrorPopup("Registration Under Progress.. Kindly submit after some time","OK");
        	return;
        }
        self.softToken.payLoadData=data.encodedResponse;
        ActionProcessor.setEvent("onPayLoadGeneration").then(function(payload) {

                               console.log("Pay Load call Response>>>>>>>>>");

                               console.log("Response for payload ");
                                                             var data={};
                                                             data = payload.responsesList[0];


                                                             processActivatedTsn(function (successResponse) {
                                                                                 console.log("processActivatedTsn successResponse --> ");
                                                                                 
                                                                                 self.result = successResponse.result;
                                                                                 
                                                                                 console.log("processActivatedTsn");
                                                                                 
                                                                                 self.EzComToken.processPostActivationActionResponse(self.result);
                                                                                 
                                                                                 
                                                                                 },
                                                                                 function (errorResponse) {
                                                                                 console.log("Error Response is initPayLoadGeneration------------>"+errorResponse);
                                                                                 },data,self.constants.buildType);
                                                             
                                                             
                                                             //WL.App.sendActionToNative("processActivatedTsn",data);
                                                             console.log("Success Block for 2FA");



                                                             },function(errorPayload){
                                                             console.log("Error Block for 2FA");
                                                             });

  };


    self.initPushNotificationRegister=function(data){
        console.log("Call  For initPushNotificationRegister ");



        ActionProcessor.setEvent("onSetUserIdentifyForPush").then(function(payload) {
        	  console.log("Success onSetUserIdentifyForPush >>>>>>>>>");
        	  if(self.EzComToken.isFromNonLoginFlow)
              {
        		  rootScope.dashboard.init2FAPush("PRELOGIN");

              }


	        },function(errorPayload){
                console.log("Error onSetUserIdentifyForPush");
              });




    };

    self.portFrom2faToRegularFlow=function(){
		if(self.tempSuccessResponse && self.tempSuccessResponse[0] && self.tempSuccessResponse[0].hasOwnProperty('auth')){
			self.tempSuccessResponse[0].auth=rootScope.rakHome.constants.SOFTTOKEN;
            
            fetchTsnFromEzComObject(function (successResponse) {
                                    console.log("fetchTsnFromEzComObject successResponse --> ");
                                    
                                    self.result = successResponse.result;
                                    
                                    console.log("fetchTsnFromEzComObject");
                                    self.EzComToken.fetchTsnActionResponse(self.result);
                                    
                                    },
                                    function (errorResponse) {
                                    console.log("fetchTsnFromEzComObject errorResponse --> ");
                                    },self.constants.buildType);

			//WL.App.sendActionToNative("fetchTsnFromEzComObject");
		}
	};


    self.approvalFlowFlag=function(){
        rootScope.approvalFlow=false;

        if(!rootScope.$$phase){
                        rootScope.$apply();
        }
       
       
    };
    
    self.logoutApply=function(){
      
        if(!rootScope.$$phase){
                        rootScope.$apply();
        }
       
       
    };
///added for corp logion flow
    
    
    
	
	self.AuthPageData ={
	authStatus : false,
	authMode : "",
	txnPwd : "",
	authType : "",
	secAuthType : "",
	
	OTP:0,
	TransactionPassword:1,
	None:-1,
	Both:2,
	SoftToken:3,
	OfflineOtp:4,
	isTransactionPwd:false,
	isSmsOtp:false,
	isFirstAuthMode:false,
	isSecAuthMode:false,

	firstAuthMode:"",
	secAuthMode:"",

	firstAuthModeValue:"",
	secAuthModeValue:"",
	eventSelected:"",
	resetAuthPageData : function(){
		self.AuthPageData.authStatus = false;
		self.AuthPageData.authMode= "";
		self.AuthPageData.txnPwd = "";
		self.AuthPageData.isTransactionPwd=false;
		self.AuthPageData.isSmsOtp=false;
		self.AuthPageData.authType=self.AuthPageData.None;
		self.AuthPageData.secAuthType=self.AuthPageData.None;
		self.AuthPageData.isFirstAuthMode=false;
		self.AuthPageData.isSecAuthMode=false;
		self.AuthPageData.firstAuthMode="";
		self.AuthPageData.secAuthMode="";
		self.AuthPageData.firstAuthModeValue="";
		self.AuthPageData.secAuthModeValue="";
		self.AuthPageData.eventSelected="";
	}
	};
	self.SoftTokenOnLoad = function(response) {

		if (!response.hasOwnProperty('errorMessage')) {
			//self.loginPwdExp = true;
			//self.loginPwdChk = "LginPwd";
		
		self.jsessionid = response.sessKey;
		self.mparam = response.mbParam;
		
		   if (response.hasOwnProperty('tokenPinLength') && response.tokenPinLength){
               self.constants.PINLENGTH = response.tokenPinLength;
              // console.log(" PINLENGTH "+self.constants.PINLENGTH);
               
           }
		
		rootScope.fields.finacleUserSessionId=response.sessKey;
		rootScope.fields.finacleMbParam=response.mbParam;
		//console.log(response);
		}
		
	};
	self.CorpSoftTokenOnLoad = function(response) {

		if (!response[0].hasOwnProperty('errorMessage')){
		self.jsessionid = response[0].sessKey;
		self.mparam = response[0].mbParam;
		}
		
		

		
	};
	self.corp2FAauthMode=function(response){
		self.mode=response.auth;
		if(self.mode){
		switch(self.mode){
		case self.constants.SOFTTOKEN:
		 self.AuthPageData.authType=self.AuthPageData.SoftToken;
		 self.AuthPageData.isFirstAuthMode=true;
		 self.AuthPageData.authStatus = true;
		 break;
		 
		case self.constants.OFFLINEOTP:
			 self.AuthPageData.authType=self.AuthPageData.SoftToken;
			 self.AuthPageData.isFirstAuthMode=true;
			 self.AuthPageData.authStatus = true;
			 break;
			 
		 default:
			 self.AuthPageData.authType=self.AuthPageData.None;
		     self.AuthPageData.secAuthType=self.AuthPageData.None;
		     self.AuthPageData.authStatus = true;
			 break;
		
		}
		}
		
			
			else{
				self.AuthPageData.authStatus = false;
				 self.AuthPageData.isFirstAuthMode=false;
			}
		
		
		
	},
	
	self.CorpfetchOtp =function(event){
		self.AuthPageData.eventSelected=event;
		if(self.AuthPageData.authType == self.AuthPageData.SoftToken){
			self.EzComToken.generateEzComTokenNumber(self.AuthPageData.firstAuthModeValue);
			//self.AuthPageData.firstAuthModeValue = rootScope.rak2FARegister.EzComToken.generatedToken;
			// WL.App.sendActionToNative("fetchTsnFromEzComObject");
			// var data={};
		    // data.tsn = rootScope.rak2FARegister.EzComToken.tsn;
			// WL.App.sendActionToNative("fetchEzComObjectFromTsn",data);
		}
	},
	 self.chkCorpOtpValidation=function(responsesList){
		
		if (!responsesList[0].hasOwnProperty('errorMessage')){
	    	self.tempSuccessResponse = responsesList;
	    
	    	if (responsesList[0].hasOwnProperty('successMsg')){
		      
		        self.RegistrationModel.otpMessage = responsesList[0].successMsg;
	    	}
	        self.common.registerOrErrorPopupFlag = responsesList[0].RegisteredDevice;
	        self.RegistrationModel.tokenStatus = responsesList[0].tokenStatus;
	        self.RegistrationModel.tsn = responsesList[0].tsn;

		}
	    },
	    
	    self.initSoftTokenData=function(responsesList){

	        if (!responsesList.hasOwnProperty('errorMessage')) {
	            self.jsessionid=responsesList.sessKey;
	          
	          
	            if (responsesList.hasOwnProperty('cifId')){
	              rootScope.rakHome.cifId = responsesList.cifId;
	              rootScope.customerId=responsesList.cifId;
	            }

	            if (responsesList.hasOwnProperty('mobileNo')){
	                if(responsesList.mobileNo !='')
	                    self.RegistrationModel.mobileNo = responsesList.mobileNo;
	            }
	        
	        }
	    },
	    
	    
	    self.corpInitSoftTokenData=function(responsesList){

	        if (!responsesList.hasOwnProperty('errorMessage')) {
	            //self.jsessionid=responsesList.sessKey;
	          
	          
	            if (responsesList.hasOwnProperty('cifId')){
	              rootScope.rakHome.cifId = responsesList.cifId;
	              rootScope.customerId=responsesList.cifId;
	            }

	            if (responsesList.hasOwnProperty('mobileNo')){
	                if(responsesList.mobileNo !='')
	                    self.RegistrationModel.mobileNo = responsesList.mobileNo;
	            }
	        
	        }
	    },
	    
	    self.NonLoggedcorpInitSoftTokenData=function(responsesList){

	        if (!responsesList[0].hasOwnProperty('errorMessage')) {
	            //self.jsessionid=responsesList.sessKey;
	        	
	        	  if (responsesList[0].hasOwnProperty('tokenPinLength') && responsesList[0].tokenPinLength){
	                  self.constants.PINLENGTH = responsesList[0].tokenPinLength;
	                 // console.log(" PINLENGTH "+self.constants.PINLENGTH);
	                  
	              }
	          
	          
	            if (responsesList[0].hasOwnProperty('cifId')){
	              rootScope.rakHome.cifId = responsesList[0].cifId;
	              rootScope.customerId=responsesList[0].cifId;
	            }

	            if (responsesList[0].hasOwnProperty('mobileNo')){
	                if(responsesList[0].mobileNo !='')
	                    self.RegistrationModel.mobileNo = responsesList[0].mobileNo;
	            }
	        
	        }
	    },
	    
	    self.chkSoftTokenValidation=function(responsesList){
	    	self.tempSuccessResponse = responsesList;
	    	
	    /*	if (responsesList[0].hasOwnProperty('otpCheck')){
		        self.RegistrationModel.otpCheck = responsesList[0].otpCheck;
		  	}*/
	    	if (responsesList.hasOwnProperty('successMsg')){
		      
		        self.RegistrationModel.otpMessage = responsesList.successMsg;
	    	}
	    	if (responsesList.hasOwnProperty('FORCE_TOKEN_REQYES')){
			      
		        self.RegistrationModel.forceTokenYes = responsesList.FORCE_TOKEN_REQYES;
	    	}
	    	
	        self.common.registerOrErrorPopupFlag = responsesList.RegisteredDevice;
	        self.RegistrationModel.tokenStatus = responsesList.tokenStatus;
	        self.RegistrationModel.tsn = responsesList.tsn;


	    },
	    
	    self.corpinitSuccess=function(responsesList){
	        if(!responsesList.hasOwnProperty('errorMessage')){
	            if (responsesList.hasOwnProperty('successMsg')){
	                self.common.successMsg = responsesList.successMsg;
	            }
	        }
			},
			
		    self.initSuccessPageMsg=function(responsesList){
		        if(!responsesList.hasOwnProperty('errorMessage')){
		            if (responsesList.hasOwnProperty('successMsg')){
		                self.RegistrationModel.successMsg = responsesList.successMsg;
		            }
		        }
		    },
		    
		    self.regenerateOtp=function(eventName){

				var msg=rootScope.rakHome.otpModel.otpModeSelected==rootScope.rakHome.otpModel.MODESCONSTANT.SMS ? rootScope.appLiterals.APP.RAK_COMMON.OTP_MSG :rootScope.appLiterals.APP.RAK_COMMON.OTP_EMAIL_MSG;
				self.RegistrationModel.otpEnableFlag="N";
				
				
				ActionProcessor.setEvent("on2FACorpRegGenerateOTPClick").then(function(payload) {

					//console.log(JSON.stringify(payload));
					var response=payload;
					if(!response.responsesList[0].hasOwnProperty("errorMessage")){
						rootScope.showErrorPopup(msg);
					}

				},function(errorPayload){
					self.common.availBal='';
				});
				
			
				
				setTimeout(function(){
					self.RegistrationModel.otpEnableFlag="Y";
					if(!rootScope.$$phase){
  					//Logger.debug("Safe root scope apply");
  					rootScope.$apply();
  			       }else{
  					//Logger.debug("Skipped root scope apply as it was already in progress");
  					rootScope.$applyAsync();
  					//Logger.debug("Called asynch apply");
  				}},200); 


			}
	self.SoftTokenLoginScenario=function(){
		rootScope.stepupAuthentication.isCompleted = false;
		rootScope.stepupAuthentication.isForceChangePwdFlow=true;
		rootScope.isUserLoggedIn=false;
	 if(!rootScope.$$phase){
		rootScope.$apply();
	 }	
	};
    
    self.validateApprovalTokenPIN=function(){
        
            flag=false;
            var fieldName="rak2FARegister.transactionApproval.pin";
            var fieldValue=rootScope.$eval(fieldName);
            if(!fieldValue){
                rootScope.pageErrorArr[fieldName]=rootScope.appLiterals.APP.RAKERRORMSG.VALIDATORTYPEMSG['required'];
                flag=true;
            }
            
            if(fieldValue && fieldValue.length < self.constants.PINLENGTHRET){
                
                rootScope.pageErrorArr[fieldName]=rootScope.appLiterals.APP.RAKERRORMSG.VALIDATORTYPEMSG['min2FALength'] +" "+self.constants.PINLENGTHRET+" "+rootScope.appLiterals.APP.RAKERRORMSG.VALIDATORTYPEMSG['min2FALengthChar'] ;
                flag=true;
            }
        return flag;
 
       
        
        
    };
    
    self.handleApprovalLogout=function(){
        
        if(rootScope.isUserLoggedIn){
            rootScope.reloadFunction();
        }
        else{
            scope.setGlobalEvent("onLoginClick");
        }
        
    };
    
    self.registerSuccess=function(){
        
            rootScope.reloadFunction();
            rootScope.rakHome.logoChange();
      
        
    };
    
    self.saveRememberChoiceCorp=function(){
        
   		  localStorage.setItem("PageType", "Corp");
   		  self.loginCorpcliked=true;
   	 
    
    };
    self.ClearUserPwdRakRegister=function(responsesList){
        
 		  if(self.RegistrationModel.isSmeWrkFlow=='Y' && responsesList[0].hasOwnProperty('errorMessage'))
 			  {
 			  	rootScope.fields.finacleUserCorporateId='';
 			  	rootScope.fields.finacleUserPassword='';
 			  }
 	 
  
  };
    
    
    
    

};
