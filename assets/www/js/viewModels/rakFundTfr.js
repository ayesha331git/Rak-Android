App.viewModels.rakFundTfr = function(scope, rootScope, UIControlsService) {
	
	var self = this;
	
	/* FOR SERVICE LANDING PAGE : START */
	/*self.expandMenu=function(elem){
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
	};*/
	
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
				displayDate:new Date()

    };
    
    self.populateCurrentDateDetails = function(){
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


    
   //----------------------------------------------------------------------------------------------------------------

						
						// For rakSendMoneyRemit - start
						
						self.remitSummary = {
								
								refnolist:[],
								refnolist1:[],
								channellist:[],
								debitlist:[],
								reqdatelist:[],
								reqTxnTypelist:[],
								reqTxnCrnlist:[],
								reqAmountAEDList:[],
								reqTxnAmtlist:[],
								benfnamelist:[],
								benfacclist:[],
								benfbanklist:[],
								amountlist:[],
								deletelist:[],
								poStatlist:[],
								remarks:[],
								remarksTemp:[],
								channelDesc:[],
								transferMode:"",
								refArray: new Array(),
								refArray1: new Array(),
								channelArray: new Array(),
								channelArrayDesc: new Array(),
								debitArray: new Array(),
								reqdateArray: new Array(),
								reqTxnCrnArray: new Array(),
								reqTxnTypeArray: new Array(),
								reqAmountAEDArray: new Array(),
								benfnameArray: new Array(),
								benfaccnoArray: new Array(),
								benfbankArray: new Array(),
								amountArray: new Array(),
								//testArray: new Array(),
								testArraySend: new Array(),
								testArrayShow: new Array(),
								deleteArray: new Array(),
								poStatusArray: new Array(),
								testArraySuccess: new Array(),
								clicked:false,
								radioSelected:'',
								
								concatRemarksSubmit:function(){
									//console.log();
									self.remitSummary.remarks = self.remitSummary.remarksTemp.join("|");
									scope.setEvent('onCancelConfirm');
								},
						/*		
								concatRemarksSubmitOther:function(eventName){

									//rootScope.showErrorPopup(rootScope.appLiterals.APP.RAK_COMMON.OTP_MSG);
										ActionProcessor.setEvent(eventName).then(function(payload) {

											console.log(JSON.stringify(payload));
											var response=payload;

										},function(errorPayload){
											self.common.availBal='';
										});



							},*/
								
								resetRemitValues:function(){
									
									self.remitSummary.remarks = [];
									self.remitSummary.testArrayShow = [];
									remitSummary.transactionPassword="";
									
								},
								
								
								
								
								resetRemitSummCancel : function() {
									
									self.remitSummary.refnolist = [];
									self.remitSummary.refnolist1 = [];
									self.remitSummary.channellist = [];
									self.remitSummary.debitlist = [];
									self.remitSummary.reqdatelist = [];
									self.remitSummary.reqTxnTypelist = [];
									self.remitSummary.reqTxnCrnlist = [];
									self.remitSummary.reqAmountAEDList = [];
									self.remitSummary.reqTxnAmtlist = [];
									self.remitSummary.benfnamelist = [];
									self.remitSummary.benfacclist = [];
									self.remitSummary.benfbanklist = [];
									self.remitSummary.amountlist = [];
									self.remitSummary.deletelist = [];
									self.remitSummary.poStatlist = [];
									self.remitSummary.remarks = [];
									self.remitSummary.channelDesc = [];
									self.remitSummary.pmtStatusCodeList = [];
									self.remitSummary.currencyList = [];
									self.remitSummary.OtherDetails = [];
									
									//self.remitSummary.remarks = "";
									self.remitSummary.transferMode = "";
									self.remitSummary.refArray = new Array();
									self.remitSummary.refArray1 = new Array();
									self.remitSummary.channelArray = new Array();
									self.remitSummary.channelArrayDesc = new Array();
									self.remitSummary.debitArray = new Array();
									self.remitSummary.reqdateArray = new Array();
									self.remitSummary.reqTxnCrnArray = new Array();
									self.remitSummary.reqTxnTypeArray = new Array();
									self.remitSummary.reqAmountAEDArray = new Array();
									self.remitSummary.benfnameArray = new Array();
									self.remitSummary.benfaccnoArray = new Array();
									self.remitSummary.benfbankArray = new Array();
									self.remitSummary.amountArray = new Array();
									self.remitSummary.pmtStatusCodeArray = new Array();
									self.remitSummary.currencyArray = new Array();
									
								//	self.remitSummary.testArray = new Array();
									self.remitSummary.testArraySend = new Array();
									self.remitSummary.testArrayShow = new Array();
									self.remitSummary.deleteArray = new Array();
									self.remitSummary.poStatusArray = new Array();
									self.remitSummary.testArraySuccess = new Array();
									self.remitSummary.clicked = false;
									self.remitSummary.radioSelected = '';
									
								},
								
								remittanceSummaryPre : function(responsesList) {
									
									var fullDate = new Date();
									//console.log(fullDate);
									//Thu May 19 2011 17:25:38 GMT+1000 {}
									 
									//convert month to 2 digits
									var twoDigitMonth = ((fullDate.getMonth().length+1) === 1)? (fullDate.getMonth()+1) : '0' + (fullDate.getMonth()+1);
									 
									/*var currentDate = fullDate.getDate() + "/" + twoDigitMonth + "/" + fullDate.getFullYear();
									console.log(currentDate);*/
									
									self.remitSummary.toYear = fullDate.getFullYear().toString();
									self.remitSummary.toMonth = twoDigitMonth;
									self.remitSummary.toDay = fullDate.getDate().toString();
									
									
									
									
								},
								
								checkForRadioBtnClicked:function()
								{
									if (self.remitSummary.clicked==false)
									{
										rootScope.showErrorPopup(rootScope.appLiterals.APP.RAK_COMMON.REMITANCY_MANDFILED);
									}
								
								},
								
								remittanceSummaryInit : function(responsesList) {
									
									self.remitSummary.testArray = new Array();
									
									
									 
										
										switch(rootScope.rakHome.userTypeIDValue+"|"+rootScope.SMEWrkflow){
										case "CORPORATE|N":
											rootScope.userTypeComponent="RADIOCOMPONENT";
											break;
										case "SME|N":
											rootScope.userTypeComponent="CHECKBOXCOMPONENT";
											break;
										case "SME|Y":
											rootScope.userTypeComponent="RADIOCOMPONENT";
											break;
										case "RETAIL|N":
											rootScope.userTypeComponent="CHECKBOXCOMPONENT";
											break;
										default:
											rootScope.userTypeComponent="CHECKBOXCOMPONENT";
											break;
										
										}
									
									
									
									if (responsesList[0].hasOwnProperty('ReferenceNumberList')) {
										self.remitSummary.refnolist = responsesList[0].ReferenceNumberList;
										
										for (var i = 0; i < (self.remitSummary.refnolist).length; i++){
											(self.remitSummary.refArray).push(self.remitSummary.refnolist[i].referenceNumber);
										}
									}
									
									if (responsesList[0].hasOwnProperty('channelNameList')) {
										self.remitSummary.channellist = responsesList[0].channelNameList;
										for (var i = 0; i < (self.remitSummary.channellist).length; i++){
											(self.remitSummary.channelArray).push(self.remitSummary.channellist[i].channelName);
										}
									}
									/*RAK:: Added for the the channel description Start*/
									
									if (responsesList[0].hasOwnProperty('channelNameDesc')) {
										self.remitSummary.channelDesc = responsesList[0].channelNameDesc;
										for (var i = 0; i < (self.remitSummary.channellist).length; i++){
											for(var j=0; j < (self.remitSummary.channelDesc).length; j++)
											{
												if(self.remitSummary.channellist[i].channelName == self.remitSummary.channelDesc[j].code)
												{
													(self.remitSummary.channelArrayDesc).push(self.remitSummary.channelDesc[j].channelNameDesc);
												}
												
												
											}
										}
									}
									/*RAK: Added for the the channel description End*/
									
									if (responsesList[0].hasOwnProperty('debitAccountList')) {
										self.remitSummary.debitlist = responsesList[0].debitAccountList;
										for (var i = 0; i < (self.remitSummary.debitlist).length; i++){
											(self.remitSummary.debitArray).push(self.remitSummary.debitlist[i].debitAccount);
										}
									}
									
									if (responsesList[0].hasOwnProperty('requestDateList')) {
										self.remitSummary.reqdatelist = responsesList[0].requestDateList;
										for (var i = 0; i < (self.remitSummary.reqdatelist).length; i++){
											(self.remitSummary.reqdateArray).push(self.remitSummary.reqdatelist[i].requestDate);
										}
									}
									
									if (responsesList[0].hasOwnProperty('requestTxnTypeList')) {
										self.remitSummary.reqTxnTypelist = responsesList[0].requestTxnTypeList;
										for (var i = 0; i < (self.remitSummary.reqTxnTypelist).length; i++){
											(self.remitSummary.reqTxnTypeArray).push(self.remitSummary.reqTxnTypelist[i].txnType);
										}
									}
									
			
							if (responsesList[0].hasOwnProperty('requestAmountAEDList')) {
										self.remitSummary.reqAmountAEDList = responsesList[0].requestAmountAEDList;
										for (var i = 0; i < (self.remitSummary.reqAmountAEDList).length; i++){
											(self.remitSummary.reqAmountAEDArray).push(self.remitSummary.reqAmountAEDList[i].requestDate);
											
										}
									}

									if (responsesList[0].hasOwnProperty('requestTxnAmtList')) {
										self.remitSummary.reqTxnAmtlist = responsesList[0].requestTxnAmtList;
										for (var i = 0; i < (self.remitSummary.reqTxnAmtlist).length; i++){
											(self.remitSummary.reqTxnCrnArray).push(self.remitSummary.reqTxnAmtlist[i].txnCrn);
										}
									}

									if (responsesList[0].hasOwnProperty('requestTxnCrnList')) {
										self.remitSummary.reqTxnCrnlist = responsesList[0].requestTxnCrnList;
										for (var i = 0; i < (self.remitSummary.reqTxnCrnlist).length; i++){
											(self.remitSummary.reqTxnCrnArray).push(self.remitSummary.reqTxnCrnlist[i].txnCrn);
										}
									}
									if (responsesList[0].hasOwnProperty('benfNameList')) {
										self.remitSummary.benfnamelist = responsesList[0].benfNameList;
										for (var i = 0; i < (self.remitSummary.benfnamelist).length; i++){
											(self.remitSummary.benfnameArray).push(self.remitSummary.benfnamelist[i].benfName);
										}
									}
									
									if (responsesList[0].hasOwnProperty('benfAccountNumberList')) {
										self.remitSummary.benfacclist = responsesList[0].benfAccountNumberList;
										for (var i = 0; i < (self.remitSummary.benfacclist).length; i++){
											(self.remitSummary.benfaccnoArray).push(self.remitSummary.benfacclist[i].benfAccountNumber);
										}
									}
									
									if (responsesList[0].hasOwnProperty('benfBankList')) {
										self.remitSummary.benfbanklist = responsesList[0].benfBankList;
										for (var i = 0; i < (self.remitSummary.benfbanklist).length; i++){
											(self.remitSummary.benfbankArray).push(self.remitSummary.benfbanklist[i].benfBank);
										}
									}
									
									if (responsesList[0].hasOwnProperty('amountList')) {
										self.remitSummary.amountlist = responsesList[0].amountList;
										for (var i = 0; i < (self.remitSummary.amountlist).length; i++){
											(self.remitSummary.amountArray).push(self.remitSummary.amountlist[i].amount);
										}
									}
									
									if (responsesList[0].hasOwnProperty('OtherDetails')) {
										self.remitSummary.OtherDetails = responsesList[0].OtherDetails;
										for (var i = 0; i < (self.remitSummary.OtherDetails).length; i++){
											(self.remitSummary.pmtStatusCodeArray).push(self.remitSummary.OtherDetails[i].pmtStatusCode);
											(self.remitSummary.currencyArray).push(self.remitSummary.OtherDetails[i].currency);
										}
									}
									
									for (var k = 0 ; k<(self.remitSummary.refnolist).length; k++){
										(self.remitSummary.testArray).push({refno:self.remitSummary.refArray[k],
											chanlist:self.remitSummary.channelArray[k],
											chanlistDesc:self.remitSummary.channelArrayDesc[k],
											debitlist:self.remitSummary.debitArray[k],
											reqdatelist:self.remitSummary.reqdateArray[k],
											reqAmountAEDList:self.remitSummary.reqAmountAEDArray[k],
											reqTxnTypelist:self.remitSummary.reqTxnTypeArray[k],
											reqTxnCrnlist:self.remitSummary.reqTxnCrnArray[k],
											reqTxnAmtlist:self.remitSummary.reqTxnCrnArray[k],
											benfnamelist:self.remitSummary.benfnameArray[k],
											benfacclist:self.remitSummary.benfaccnoArray[k],
											benfbanklist:self.remitSummary.benfbankArray[k],
											amountlist:self.remitSummary.amountArray[k],
											pmtStatusCodeList:self.remitSummary.pmtStatusCodeArray[k],
											currencyList:self.remitSummary.currencyArray[k],
											flag:false
											
										});
										}
									
									//self.remitSummary.testArraySend = new Array();
									//self.remitSummary.testArrayShow = new Array();
									
								},
								
								remittanceSummaryCancel :function(responsesList){
									
									
									
									if (!responsesList[0].hasOwnProperty('errorMessage') && rootScope.rakCorpInit.corpModel.backFlag =='N') {
										self.remitSummary.remarksTemp =[];
										self.remitSummary.previewResponse = responsesList[0];
										self.remitSummary.auth = responsesList[0].auth;
										self.remitSummary.transactionPassword = "";
									}
									self.remitSummary.transactionPassword = "";
									
									
								},
								
								remittanceSummaryCancelSuccess : function(responsesList){
									
									self.remitSummary.testArraySuccess = new Array();
									
									self.remitSummary.refArray1 = new Array();
									self.remitSummary.deleteArray = new Array();
									self.remitSummary.poStatlist = new Array();
									
									if (responsesList[0].hasOwnProperty('ReferenceList')) {
										self.remitSummary.refnolist1 = responsesList[0].ReferenceList;
										
										for (var i = 0; i < (self.remitSummary.refnolist1).length; i++){
											(self.remitSummary.refArray1).push(self.remitSummary.refnolist1[i].referenceNum);
										}
									}
									
									if (responsesList[0].hasOwnProperty('deleteIndicatorList')) {
										self.remitSummary.deletelist = responsesList[0].deleteIndicatorList;
										for (var i = 0; i < (self.remitSummary.deletelist).length; i++){
											(self.remitSummary.deleteArray).push(self.remitSummary.deletelist[i].delIndName);
										}
									}
									
									if (responsesList[0].hasOwnProperty('poStatusList')) {
										self.remitSummary.poStatlist = responsesList[0].poStatusList;
										for (var i = 0; i < (self.remitSummary.poStatlist).length; i++){
											(self.remitSummary.poStatusArray).push(self.remitSummary.poStatlist[i].poStatus);
										}
									}
									
									
									for(var j=0; j<self.remitSummary.testArray.length; j++)
									{
										for(var k=0; k<self.remitSummary.refArray1.length; k++)
										 {
										if(rootScope.userTypeComponent=='RADIOCOMPONENT' && self.remitSummary.testArray[j].refno == self.remitSummary.radioSelected
											&& self.remitSummary.testArray[j].refno == self.remitSummary.refArray1[k])
											{
																						
											self.remitSummary.testArraySuccess.push
											({refnum:self.remitSummary.refArray1[k],
												channellist:self.remitSummary.testArray[j].chanlist,
													channelDesc:self.remitSummary.testArray[j].chanlistDesc,
													debitnolist:self.remitSummary.testArray[j].debitlist,
														requestdtlist:self.remitSummary.testArray[j].reqdatelist,
															benfnmlist:self.remitSummary.testArray[j].benfnamelist,
																benfaccountlist:self.remitSummary.testArray[j].benfacclist,
																	benfbankslist:self.remitSummary.testArray[j].benfbanklist,
																		amtlist:self.remitSummary.testArray[j].amountlist,
																			txnCurr:self.remitSummary.testArray[j].currencyArray,
																			poStat:self.remitSummary.poStatusArray[k],
																				pmtStatus:self.remitSummary.testArray[j].pmtStatusCodeArray
																		  
											});
											}
										else if(self.remitSummary.testArray[j].flag == true
												&& self.remitSummary.testArray[j].refno == self.remitSummary.refArray1[k])
										{
																					
										self.remitSummary.testArraySuccess.push
										({refnum:self.remitSummary.refArray1[k],
											channellist:self.remitSummary.testArray[j].chanlist,
												channelDesc:self.remitSummary.testArray[j].chanlistDesc,
												debitnolist:self.remitSummary.testArray[j].debitlist,
													requestdtlist:self.remitSummary.testArray[j].reqdatelist,
														benfnmlist:self.remitSummary.testArray[j].benfnamelist,
															benfaccountlist:self.remitSummary.testArray[j].benfacclist,
																benfbankslist:self.remitSummary.testArray[j].benfbanklist,
																	amtlist:self.remitSummary.testArray[j].amountlist,
																		txnCurr:self.remitSummary.testArray[j].currencyArray,
																		poStat:self.remitSummary.poStatusArray[k],
																			pmtStatus:self.remitSummary.testArray[j].pmtStatusCodeArray
																	  
										});
										}
										 }
									}
									
								}
								
						};
						self.CheckBoxClicked = function(){
							self.remitSummary.refNumSend = "";
							self.remitSummary.testFlag = "";
							
							self.remitSummary.txnDate= "";
							self.remitSummary.txnCurrency= "";
								
							self.remitSummary.amtAED= "";
							self.remitSummary.txnAmt= "";
							self.remitSummary.txnType= "";
							self.remitSummary.channel= "";
							self.remitSummary.debitAcc= "";
							self.remitSummary.status = "";
							self.remitSummary.currency = "";
							self.remitSummary.benfname = "";
							self.remitSummary.benfbank = "";
							self.remitSummary.benfacc = "";
							
							
							
							
							
							
							self.remitSummary.testArrayShow = new Array();
							var counter = 0;
							
							
							for(var j=0; j<self.remitSummary.testArray.length; j++){
								if (rootScope.userTypeComponent=='RADIOCOMPONENT' && self.remitSummary.testArray[j].refno == self.remitSummary.radioSelected){
									self.remitSummary.testFlag = 'Y';
									counter = counter + 1;
								}
								else if (rootScope.userTypeComponent=='CHECKBOXCOMPONENT' && self.remitSummary.testArray[j].flag == true || self.remitSummary.testArray[j].flag == "true"){
									self.remitSummary.testFlag = 'Y';
									counter = counter + 1;
								}
								
							}
							
						if(self.remitSummary.testFlag == 'Y')
								{
							
									if (counter > 5){
										rootScope.showErrorPopup('Maximum Number of Selection Should be 5');
									}
									else
										{
							for(var j=0; j<self.remitSummary.testArray.length; j++)
								{
									if(rootScope.userTypeComponent=='RADIOCOMPONENT' && self.remitSummary.testArray[j].refno == self.remitSummary.radioSelected){
										self.remitSummary.refNumSend =  self.remitSummary.testArray[j].refno + "|" + self.remitSummary.refNumSend ; 
										self.remitSummary.txnDate=  self.remitSummary.testArray[j].reqdatelist + "|" + self.remitSummary.txnDate ;
										self.remitSummary.txnCurrency=  self.remitSummary.testArray[j].reqTxnCrnlist + "|" +  self.remitSummary.txnCurrency ;
											self.remitSummary.amtAED=  self.remitSummary.testArray[j].reqAmountAEDList  + "-" + self.remitSummary.amtAED ;
										self.remitSummary.txnAmt=self.remitSummary.testArray[j].reqTxnAmtlist  + "-" +  self.remitSummary.txnAmt;
										self.remitSummary.txnType=  self.remitSummary.testArray[j].reqTxnTypelist + "|" + self.remitSummary.txnType ;
										self.remitSummary.channel=  self.remitSummary.testArray[j].chanlist + "|" + self.remitSummary.channel ;
										self.remitSummary.debitAcc=  self.remitSummary.testArray[j].debitlist + "|" + self.remitSummary.debitAcc ;
										self.remitSummary.status =   self.remitSummary.testArray[j].pmtStatusCodeList + "|" + self.remitSummary.status ;
										self.remitSummary.currency =   self.remitSummary.testArray[j].currencyList + "|" + self.remitSummary.currency;
										self.remitSummary.benfname =   self.remitSummary.testArray[j].benfnamelist + "|" + self.remitSummary.benfname;
										self.remitSummary.benfacc =   self.remitSummary.testArray[j].benfacclist + "|" + self.remitSummary.benfacc;
										self.remitSummary.benfbank =   self.remitSummary.testArray[j].benfbanklist + "|" + self.remitSummary.benfbank;
										
										
										self.remitSummary.testArrayShow.push
										({refnum:self.remitSummary.testArray[j].refno,
											channellist:self.remitSummary.testArray[j].chanlist,
											channelDesc:self.remitSummary.testArray[j].chanlistDesc,
												debitnolist:self.remitSummary.testArray[j].debitlist,
													requestdtlist:self.remitSummary.testArray[j].reqdatelist,
													reqAmountAEDList:self.remitSummary.testArray[j].reqAmountAEDList,
														benfnmlist:self.remitSummary.testArray[j].benfnamelist,
															benfaccountlist:self.remitSummary.testArray[j].benfacclist,
																benfbankslist:self.remitSummary.testArray[j].benfbanklist,
																	amtlist:self.remitSummary.testArray[j].amountlist
										});
										}
									else if(rootScope.userTypeComponent=='CHECKBOXCOMPONENT' && self.remitSummary.testArray[j].flag == true || self.remitSummary.testArray[j].flag == "true"){
										self.remitSummary.refNumSend =  self.remitSummary.testArray[j].refno + "|" + self.remitSummary.refNumSend ; 
										self.remitSummary.txnDate=  self.remitSummary.testArray[j].reqdatelist + "|" + self.remitSummary.txnDate ;
										self.remitSummary.txnCurrency=  self.remitSummary.testArray[j].reqTxnCrnlist + "|" +  self.remitSummary.txnCurrency ;
											self.remitSummary.amtAED=  self.remitSummary.testArray[j].reqAmountAEDList  + "-" + self.remitSummary.amtAED ;
										self.remitSummary.txnAmt=self.remitSummary.testArray[j].reqTxnAmtlist  + "-" +  self.remitSummary.txnAmt;
										self.remitSummary.txnType=  self.remitSummary.testArray[j].reqTxnTypelist + "|" + self.remitSummary.txnType ;
										self.remitSummary.channel=  self.remitSummary.testArray[j].chanlist + "|" + self.remitSummary.channel ;
										self.remitSummary.debitAcc=  self.remitSummary.testArray[j].debitlist + "|" + self.remitSummary.debitAcc ;
										self.remitSummary.status =   self.remitSummary.testArray[j].pmtStatusCodeList + "|" + self.remitSummary.status ;
										self.remitSummary.currency =   self.remitSummary.testArray[j].currencyList + "|" + self.remitSummary.currency;
										self.remitSummary.benfname =   self.remitSummary.testArray[j].benfnamelist + "|" + self.remitSummary.benfname;
										self.remitSummary.benfbank =   self.remitSummary.testArray[j].benfbanklist + "|" + self.remitSummary.benfbank;
										
										self.remitSummary.benfacc =   self.remitSummary.testArray[j].benfacclist + "|" + self.remitSummary.benfacc;
										
										
										self.remitSummary.testArrayShow.push
										({refnum:self.remitSummary.testArray[j].refno,
											channellist:self.remitSummary.testArray[j].chanlist,
											channelDesc:self.remitSummary.testArray[j].chanlistDesc,
												debitnolist:self.remitSummary.testArray[j].debitlist,
													requestdtlist:self.remitSummary.testArray[j].reqdatelist,
													reqAmountAEDList:self.remitSummary.testArray[j].reqAmountAEDList,
														benfnmlist:self.remitSummary.testArray[j].benfnamelist,
															benfaccountlist:self.remitSummary.testArray[j].benfacclist,
																benfbankslist:self.remitSummary.testArray[j].benfbanklist,
																	amtlist:self.remitSummary.testArray[j].amountlist
										});
										}
									}
							
											scope.setEvent('onSelectForCancel');
										}
								}
						else
							rootScope.showErrorPopup('Select atleast one to Proceed');
								
						};
						
						/*self.onCancelBackButtonConfirm = function(){
							self.remitSummary.resetRemitSummCancel();
							scope.setEvent('onRakSendMoneyRemitInitClick');
						};*/
						
						// For rakSendMoneyRemit - End
//----------------------------------------------------------------------------------------------------------//						
						
						
};
