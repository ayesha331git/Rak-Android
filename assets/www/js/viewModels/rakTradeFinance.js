
/* JavaScript content from js/viewModels/rakTradeFinance.js in folder common */
App.viewModels.rakTradeFinance = function(scope,rootScope, Logger) {

	var self = this;
	
	 self.common={

				message:''

	 };
	 
	 self.clearCommonData =function(){
	    
	    	self.common.message='';
	    
	    };
	
	self.rakTradeFinanceInquiry = {
			
			importFinList:[],
			importFinDesc:"",
			importFinCode:"",
			
			guaranteeList:[],
			guaranteeDesc:"",
			guaranteeCode:"",
			
			exportList:[],
			exportDesc:"",
			exportCode:"",
			
			inlandTradeFinList:[],
			inlandTradeFinDesc:"",
			inlandTradeFinCode:"",
			
			entityList:[],
			displayOne:10,
			displayTwo:10,
			displayThree:10,
			displayFour:10,
			displayFive:10,
			displaySix:10,
			displaySeven:10,
			displayEight:10,
			displayNine:10,
			displayTen:10,
			displayTwelve:10,
			displayThirteen:10,
			displayFourteen:10,
			displayFifteen:10,
			displaySixteen:10,
			
			grandTotalAmt:"",
			NoTFRecordsMsg:"",
			
			selectedImportFinCode:"",
			selectedGuaranteeCode:"",
			selectedExportCode:"",
			selectedInlandTradeCode:"",
					
			isCalled:false,
			
			incrementDisplayCounter: function(type){

				switch(type){
				case 'ONE':
					self.rakTradeFinanceInquiry.displayOne = self.rakTradeFinanceInquiry.displayOne + 10;
					break;
				case 'TWO':
					self.rakTradeFinanceInquiry.displayTwo = self.rakTradeFinanceInquiry.displayTwo + 10;
					break;
				case 'THREE':
					self.rakTradeFinanceInquiry.displayThree = self.rakTradeFinanceInquiry.displayThree + 10;
					break;
				case 'FOUR':
					self.rakTradeFinanceInquiry.displayFour = self.rakTradeFinanceInquiry.displayFour + 10;
					break;
				case 'FIVE':
					self.rakTradeFinanceInquiry.displayFive = self.rakTradeFinanceInquiry.displayFive + 10;
					break;
				case 'SIX':
					self.rakTradeFinanceInquiry.displaySix = self.rakTradeFinanceInquiry.displaySix + 10;
					break;
				case 'SEVEN':
					self.rakTradeFinanceInquiry.displaySeven = self.rakTradeFinanceInquiry.displaySeven + 10;
					break;
				case 'EIGHT':
					self.rakTradeFinanceInquiry.displayEight = self.rakTradeFinanceInquiry.displayEight + 10;
					break;
				case 'NINE':
					self.rakTradeFinanceInquiry.displayEight = self.rakTradeFinanceInquiry.displayNine + 10;
					break;
				case 'TEN':
					self.rakTradeFinanceInquiry.displayTen = self.rakTradeFinanceInquiry.displayTen + 10;
					break;
				case 'ELEVEN':
					self.rakTradeFinanceInquiry.displayEleven = self.rakTradeFinanceInquiry.displayEleven + 10;
					break;
				case 'TWELVE':
					self.rakTradeFinanceInquiry.displayTwelve = self.rakTradeFinanceInquiry.displayTwelve + 10;
					break;
				case 'THIRTEEN':
					self.rakTradeFinanceInquiry.displayThirteen = self.rakTradeFinanceInquiry.displayThirteen + 10;
					break;
				case 'FOURTEEN':
					self.rakTradeFinanceInquiry.displayFourteen = self.rakTradeFinanceInquiry.displayFourteen + 10;
					break;
				case 'FIFTEEN':
					self.rakTradeFinanceInquiry.displayFifteen = self.rakTradeFinanceInquiry.displayFifteen + 10;
					break;
				case 'SIXTEEN':
					self.rakTradeFinanceInquiry.displaySixteen = self.rakTradeFinanceInquiry.displaySixteen + 10;
					break;
				case 'SEVENTEEN':
					self.rakTradeFinanceInquiry.displaySeventeen = self.rakTradeFinanceInquiry.displaySeventeen + 10;
					break;
					
				}
			},
			
			resetTradeFinanceDashboard: function(){
				self.rakTradeFinanceInquiry.selectedImportFinCode="";
				self.rakTradeFinanceInquiry.selectedGuaranteeCode="";
				self.rakTradeFinanceInquiry.selectedExportCode="";
				self.rakTradeFinanceInquiry.selectedInlandTradeCode="";
				self.rakTradeFinanceInquiry.showListFlag=false;
				self.rakTradeFinanceInquiry.NoTFRecordsMsg="";
				self.rakTradeFinanceInquiry.submitFlag="";
				self.rakTradeFinanceInquiry.isCalled=false;
			},
			
			clickImportFinanceTab: function(){
				if(self.rakTradeFinanceInquiry.selectedTrade != "IMFN"){
					self.rakTradeFinanceInquiry.selectedTrade = "IMFN";
					self.rakTradeFinanceInquiry.showListFlag=false;
					self.rakTradeFinanceInquiry.selectedImportFinCode="";
				}
			},
			clickGuaranteesTab: function(){
				if(self.rakTradeFinanceInquiry.selectedTrade != "GUAT"){
					self.rakTradeFinanceInquiry.selectedTrade = "GUAT";
					self.rakTradeFinanceInquiry.showListFlag=false;
					self.rakTradeFinanceInquiry.selectedGuaranteeCode="";
				}
			},

			clickExportTab: function(){
				if(self.rakTradeFinanceInquiry.selectedTrade != "EXPT"){
					self.rakTradeFinanceInquiry.selectedTrade = "EXPT";
					self.rakTradeFinanceInquiry.showListFlag=false;
					self.rakTradeFinanceInquiry.selectedExportCode="";
				}
			},

			clickInlandTradeFinancesTab: function(){
				if(self.rakTradeFinanceInquiry.selectedTrade != "INTF"){
					self.rakTradeFinanceInquiry.selectedTrade = "INTF";
					self.rakTradeFinanceInquiry.showListFlag=false;
					self.rakTradeFinanceInquiry.selectedInlandTradeCode="";
				}
			},

			sortImportFinList:function(a,b){
				return (b.importFinDesc < a.importFinDesc) ? 1 : -1;
			},
			sortGuaranteeList:function(a,b){
				return (b.guaranteeDesc < a.guaranteeDesc) ? 1 : -1;
			},
			sortExportList:function(a,b){
				return (b.exportDesc < a.exportDesc) ? 1 : -1;
			},
			sortInlandTradeFinList:function(a,b){
				return (b.inlandTradeFinDesc < a.inlandTradeFinDesc) ? 1 : -1;
			},

			initTradeFinanceDashboard: function(responsesList){
				
			if(!(self.rakTradeFinanceInquiry.isCalled)){
				if (!responsesList[0].hasOwnProperty('errorMessage')){
					
					if (responsesList[0].hasOwnProperty('NoTFRecords')){
						self.rakTradeFinanceInquiry.NoTFRecordsMsg=responsesList[0].NoTFRecords;
					}
					
					if (responsesList[0].hasOwnProperty('importFinList')){
						self.rakTradeFinanceInquiry.importFinList = responsesList[0].importFinList;
					}
					if (responsesList[0].hasOwnProperty('guaranteeList')){
						self.rakTradeFinanceInquiry.guaranteeList = jQuery(responsesList[0].guaranteeList).sort(self.rakTradeFinanceInquiry.sortGuaranteeList).toArray();
					}
					if (responsesList[0].hasOwnProperty('exportList')){
						self.rakTradeFinanceInquiry.exportList = jQuery(responsesList[0].exportList).sort(self.rakTradeFinanceInquiry.sortExportList).toArray();
					}
					if (responsesList[0].hasOwnProperty('inlandTradeFinList')){
						self.rakTradeFinanceInquiry.inlandTradeFinList = jQuery(responsesList[0].inlandTradeFinList).sort(self.rakTradeFinanceInquiry.sortInlandTradeFinList).toArray();
					}
				}				
				self.rakTradeFinanceInquiry.selectedTrade='IMFN';				
				self.rakTradeFinanceInquiry.showListFlag=false;				
				self.rakTradeFinanceInquiry.isCalled=true;			
			}
		}
	};
	
	self.customTradeSelected = function(responsesList){
		
				
		if(self.rakTradeFinanceInquiry.submitFlag=='SUB'){
	
		   self.rakTradeFinanceInquiry.tradeTestArray = new Array();
		
		    if (!responsesList[0].hasOwnProperty('errorMessage')) {
		    	
		    	if (responsesList[0].hasOwnProperty('NoTFRecords')){
					self.rakTradeFinanceInquiry.NoTFRecordsMsg=responsesList[0].NoTFRecords;
				}
			
			 if (responsesList[0].hasOwnProperty('entityList')) {
				self.rakTradeFinanceInquiry.entityList = responsesList[0].entityList;
			 }
			 if (responsesList[0].hasOwnProperty('grandTotal')) {
					self.rakTradeFinanceInquiry.grandTotalAmt = responsesList[0].grandTotal;
			}
				for(var j=0; j<self.rakTradeFinanceInquiry.entityList.length; j++)
					{
							
						self.rakTradeFinanceInquiry.tradeTestArray.push
						  ({selectedIndex:j,
							  entityID:responsesList[0].entityList[j].entityID,
							  entityValue:responsesList[0].entityValueList[j].entityValue,
							  entityCurrency:responsesList[0].entityCurrencyList[j].entityCurrency,
							  loanBalanceWithCrn:responsesList[0].loanBalanceWithCrnArray[j].loanBalanceWithCrn,
							  entityValueWithCrn:responsesList[0].entityValueWithCrnArray[j].entityValueWithCrn,
							  otherAmount:responsesList[0].otherAmountList[j].otherAmount,
							  otherAmtCurrency:responsesList[0].otherAmountCurrencyList[j].otherAmtCurrency,
							
							  otherAmtCrnAED:responsesList[0].otherAmtCrnAEDArry[j].otherAmtCrnAED, 
							  benfName:responsesList[0].benfNameList[j].benfName,
							  otherRefNum:responsesList[0].otherRefNumList[j].otherRefNum,
							  category:responsesList[0].categoryList[j].category,
							  opendate:responsesList[0].openDateList[j].openDate.split(' ')[0],
							  loanCurrency:responsesList[0].loanCurrencyList[j].loanCurrency,
							  expdate:responsesList[0].expiryDateList[j].expiryDate.split(' ')[0],
							  openValue:responsesList[0].openValueList[j].openValue,
							  bankName:responsesList[0].bankNameList[j].bankName,
							  loanBalance:responsesList[0].loanBalanceList[j].loanBalance,
							  otherData:responsesList[0].otherDataList[j].otherData,
							  entityStatus:responsesList[0].entityStatusList[j].entityStatus,
							  tenor:responsesList[0].tenorList[j].tenor,
							  interest:responsesList[0].interestList[j].interest,
							  otherAmountAED:responsesList[0].otherAmountAEDList[j].otherAmountAED,
							  closeDate:responsesList[0].closeDateList[j].closeDate.split(' ')[0],
							  closeDateNoSpace:responsesList[0].closeDateList[j].closeDate,
							  loanAmountAED:responsesList[0].loanAmountAEDList[j].loanAmountAED,
							  grandTotal:responsesList[0].grandTotal});
			
					}
			}
		    self.rakTradeFinanceInquiry.showListFlag=true;
					
		}
	};
	
	
	self.tradeFlag = function(selectedOnChangeElement){
	if(null!=selectedOnChangeElement)
	{
		if(self.rakTradeFinanceInquiry.selectedTrade=="IMFN")
			{
			   self.rakTradeFinanceInquiry.selectedGuaranteeCode='';
			   self.rakTradeFinanceInquiry.selectedExportCode='';
			   self.rakTradeFinanceInquiry.selectedInlandTradeCode='';
			   self.rakTradeFinanceInquiry.selectedProductCode = self.rakTradeFinanceInquiry.selectedImportFinCode;
			   
			}
		else if(self.rakTradeFinanceInquiry.selectedTrade=="GUAT")
			{
			   self.rakTradeFinanceInquiry.selectedImportFinCode='';
			   self.rakTradeFinanceInquiry.selectedExportCode='';
			   self.rakTradeFinanceInquiry.selectedInlandTradeCode='';
			   self.rakTradeFinanceInquiry.selectedProductCode = self.rakTradeFinanceInquiry.selectedGuaranteeCode;
			  
			}
		else if(self.rakTradeFinanceInquiry.selectedTrade=="EXPT")
			{
			   self.rakTradeFinanceInquiry.selectedImportFinCode='';
			   self.rakTradeFinanceInquiry.selectedGuaranteeCode='';
			   self.rakTradeFinanceInquiry.selectedInlandTradeCode='';
			   self.rakTradeFinanceInquiry.selectedProductCode = self.rakTradeFinanceInquiry.selectedExportCode;
			   
			}
		else if(self.rakTradeFinanceInquiry.selectedTrade=="INTF")
			{
			   self.rakTradeFinanceInquiry.selectedImportFinCode='';
			   self.rakTradeFinanceInquiry.selectedGuaranteeCode='';
			   self.rakTradeFinanceInquiry.selectedExportCode='';
			   self.rakTradeFinanceInquiry.selectedProductCode = self.rakTradeFinanceInquiry.selectedInlandTradeCode;
			   
			}
		
		scope.setEvent('onSubmitOfSelectedProduct');
		self.rakTradeFinanceInquiry.submitFlag='SUB';
	}
	
	};
	
	//For Pending Trade Finance SR approvals START
	self.searchFromDate=new Date();
	self.searchToDate=new Date();
	self.searchReqBy='';
	self.pendingListTFSRApprovals=[];
	self.pendingListTF=[];
	self.pendingListTFBackup=[];
	self.tfsrItem={};
	self.tfsrDetItem={};
	self.isTfsrApprRejClicked="N";
	self.tfsrApprRejClicked="A";
	self.approveAuthModel={};

	self.displayDate = new Date();
	self.fromSearchResult = false;
	self.searchFromDate_year="";
	self.searchFromDate_month="";
	self.searchFromDate_day="";
	self.searchToDate_year="";
	self.searchToDate_month="";
	self.searchToDate_day="";
	self.fromLandingPage=false;
	
	self.resetSearchVals = function() {
		self.searchFromDate=new Date();
		self.searchToDate=new Date();
		self.searchReqBy='';
	};
	self.responseTFPendingApproval=function(responseList){
		if(responseList[0].hasOwnProperty("errorMessage")){
			return false;
		}
		self.pendingListTFSRApprovals=responseList[0].approvalsTFList;
		return true;
	};
	
	self.resetIndividualTFList= function(){
		self.pendingListTF='';
		self.pendingListTFBackup='';
	};
	self.responseIndividualTFList=function(responseList){
		if(responseList[0].hasOwnProperty("errorMessage") || self.fromSearchResult){
			self.fromSearchResult=false;
			return false;
		}
		if(self.fromLandingPage){
		self.searchFromDate=new Date();
		self.searchToDate=new Date();
		self.searchFromDate.setDate(self.searchFromDate.getDate() + parseInt(responseList[0].fromDate));
		self.searchToDate.setDate(self.searchToDate.getDate() + parseInt(responseList[0].toDate));
		self.fromLandingPage=false;
		}
		
		if (responseList[0].hasOwnProperty('NoTFRecords')){
			self.NoTFRecordsMsg=responseList[0].NoTFRecords;
		}
		if (responseList[0].hasOwnProperty('approvalsIndividualTFList')){
			self.pendingListTF=responseList[0].approvalsIndividualTFList;
			self.pendingListTFBackup=responseList[0].approvalsIndividualTFList;
		}
			
		
		return true;
	};
	self.setFormatedDate = function( unformatedDate ) {

        var today = unformatedDate;
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!

        var yyyy = today.getFullYear();
        if(dd<10){
			dd = '0' + dd;
        }
        if(mm<10){
			mm = '0' + mm;
        }

		var formatDate = mm + '/' + dd + '/' + yyyy;

        return formatDate;

    };
	self.filterPendingList = function() {
		self.tempList=[];
		self.pendingListTF=self.pendingListTFBackup;
		if(""!=self.searchReqBy){
			for(var j=0; j<self.pendingListTF.length; j++){
				if(self.pendingListTF[j].tfSrReqSerialNo == self.searchReqBy){
					self.tempList.push({tfSrReqSerialNo:self.pendingListTF[j].tfSrReqSerialNo, 
							tfSrReqAccNo:self.pendingListTF[j].tfSrReqAccNo, 
							tfSrReqSubBy:self.pendingListTF[j].tfSrReqSubBy, 
							tfSrReqSubDt:self.pendingListTF[j].tfSrReqSubDt,
							tfSrReqSubDtCalc:self.pendingListTF[j].tfSrReqSubDtCalc,
							tfSrIndex:self.pendingListTF[j].tfSrIndex});
				}
			}
			self.pendingListTF=self.tempList;
		}
		self.tempList=[];
		if(null!=self.searchFromDate && null!=self.searchToDate){
			for(var j=0; j<self.pendingListTF.length; j++){
				var rqdDate = Date.parse(self.pendingListTF[j].tfSrReqSubDtCalc);
				var rqdFromDate = Date.parse(self.setFormatedDate(self.searchFromDate));
				var rqdToDate = Date.parse(self.setFormatedDate(self.searchToDate));
				if((rqdDate <= rqdToDate && rqdDate >= rqdFromDate)){
					self.tempList.push({tfSrReqSerialNo:self.pendingListTF[j].tfSrReqSerialNo, 
						tfSrReqAccNo:self.pendingListTF[j].tfSrReqAccNo, 
						tfSrReqSubBy:self.pendingListTF[j].tfSrReqSubBy, 
						tfSrReqSubDt:self.pendingListTF[j].tfSrReqSubDt,
						tfSrReqSubDtCalc:self.pendingListTF[j].tfSrReqSubDtCalc,
						tfSrIndex:self.pendingListTF[j].tfSrIndex});
				}
			}
			self.pendingListTF=self.tempList;
		}
	};
	self.populateCurrentDateDetails = function() {
		if (self.displayDate != ""
				&& self.displayDate != null) {
			var date = self.displayDate.getDate().toString();
			var currMonth = self.displayDate.getMonth() + 1;
			var month = currMonth.toString();
			var year = self.displayDate.getFullYear().toString();
			self.date = date;
			self.month = month;
			self.year = year;
		}
	};
	self.setFromToDate = function() {
		self.displayDate = self.searchFromDate;
		self.populateCurrentDateDetails();

		self.searchFromDate_day =self.date;
		self.searchFromDate_month=self.month;
		self.searchFromDate_year=self.year;

		self.displayDate = self.searchToDate;
		self.populateCurrentDateDetails();

		self.searchToDate_day =self.date;
		self.searchToDate_month=self.month;
		self.searchToDate_year=self.year;
	};
	
	//For Trade Finance Approval Details START
	self.tfServiceRequestStatusModel = {
			detailModel : {},
			selectedRequestId : "",
			selectedRefId : ""
	};
	
	self.setVals = function(){
		self.tfServiceRequestStatusModel.selectedRefId = self.tfsrDetItem.tfSrReqSerialNo;
		self.tfServiceRequestStatusModel.selectedRequestId = self.tfsrDetItem.tfsrReqId;
	//	self.tfServiceRequestStatusModel.selectedRequestId = self.tfsrItem.tfsrReqId;
	};
	self.rakFetchTFSRStatusDetResponse=function(responseList){
		if(!responseList[0].hasOwnProperty("errorMessage") && !responseList[0].hasOwnProperty("otpMessage")){
		self.tfServiceRequestStatusModel.detailModel = responseList[0];
		self.tfServiceRequestStatusModel.detailModel.srHeader = rootScope.$eval(self.tfServiceRequestStatusModel.detailModel.srHeader);
		if(self.tfServiceRequestStatusModel.detailModel.labelKeySet){
			self.tfServiceRequestStatusModel.detailModel.labelKeySetArr=[];
			var res=self.tfServiceRequestStatusModel.detailModel.labelKeySet.split('|');
			for(var v=0;v<res.length-1;v++){
				var resArr =res[v].split('^');
				var labetStr = rootScope.$eval(resArr[0]);
				var obj={label:labetStr,value:self.tfServiceRequestStatusModel.detailModel[resArr[1]]};
				self.tfServiceRequestStatusModel.detailModel.labelKeySetArr.push(obj);
			}
			self.tfServiceRequestStatusModel.detailModel.labelKeySetArr = self.rakPopulateStatusReqCheck(self.tfServiceRequestStatusModel.detailModel.labelKeySetArr);
		}
		
		self.common.message=responseList[0].MESSAGE ? responseList[0].MESSAGE :'';
		}
		return true;
	};
	self.rakPopulateStatusReqCheck=function(labelKeySetArr){
		self.tfServiceRequestStatusModel.detailModel.labelKeySetArrModified=[];
		var isModificationRqd = true;
		for(var arrItemNo=0; arrItemNo<labelKeySetArr.length && isModificationRqd==true; arrItemNo++){
			switch(self.tfServiceRequestStatusModel.selectedRequestId){
			case "DEL"://Export LC presentation of Docs
				if(arrItemNo==6){
					self.tfServiceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:"SrStatusSubHeader", value:rootScope.appLiterals.APP.RAKPENDINGAPPROVAL.TF_APPROVAL.SRLABELS.CHD.ISSU_BANK});
				}
				
			break;	
			case "LAI"://Apply for Loan Against Trust Receipt LAI
				if(arrItemNo==5){
					self.tfServiceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:"SrStatusSubHeader", value:rootScope.appLiterals.APP.RAKPENDINGAPPROVAL.TF_APPROVAL.SRLABELS.LAI.BUY_DET});
				}
				if(arrItemNo==11){
					if(labelKeySetArr[arrItemNo].value == 'A'){
						self.tfServiceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:rootScope.appLiterals.APP.RAKPENDINGAPPROVAL.TF_APPROVAL.SRLABELS.LAI.SPECIAL_INST, 
									value:rootScope.appLiterals.APP.RAKPENDINGAPPROVAL.TF_APPROVAL.SRLABELS.LAI.SPECIAL_INST_1});
						continue;
					}
					else {
						continue;
					}
				}
				if(arrItemNo==12){
					if(labelKeySetArr[arrItemNo].value == 'A'){
						var spInstTxt = '';
						if(labelKeySetArr[10].value != 'A'){
							spInstTxt = rootScope.appLiterals.APP.RAKPENDINGAPPROVAL.TF_APPROVAL.SRLABELS.LAI.SPECIAL_INST;
						}
						self.tfServiceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:spInstTxt, value:rootScope.appLiterals.APP.RAKPENDINGAPPROVAL.TF_APPROVAL.SRLABELS.LAI.SPECIAL_INST_2_1+" "+labelKeySetArr[13].value
									+" "+rootScope.appLiterals.APP.RAKPENDINGAPPROVAL.TF_APPROVAL.SRLABELS.LAI.SPECIAL_INST_2_2+" "+labelKeySetArr[14].value
									+" "+rootScope.appLiterals.APP.RAKPENDINGAPPROVAL.TF_APPROVAL.SRLABELS.LAI.SPECIAL_INST_2_3});
						continue;
					}
					else {
						continue;
					}
				
				}
				if(arrItemNo==15){
					if(labelKeySetArr[arrItemNo].value != '-1'){
						self.tfServiceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[arrItemNo+1].label,value:labelKeySetArr[arrItemNo+1].value});
						arrItemNo++;
						continue;
					}
					else {
						arrItemNo++;
						continue;
					}
				}
				if(arrItemNo==13 || arrItemNo==14){
					continue;
				}
				
			break;		
			case "ALC"://Amendment of Letter Of Credit
				if(arrItemNo == 5){
					self.tfServiceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[4].label,value:labelKeySetArr[4].value+" "+labelKeySetArr[5].value.split(' ')[1]});
					continue;
				}
			
				if(arrItemNo == 14 && labelKeySetArr[14].value!=''){
					self.tfServiceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[13].label,value:labelKeySetArr[13].value+labelKeySetArr[14].value});
					continue;
				}
			
				if(arrItemNo==4 || arrItemNo==10 || arrItemNo==12|| arrItemNo==13){
					continue;
				}
			break;
		/*	case "AMG"://Apply for Amendment to Letter of Guarantee
				if(arrItemNo == 4){
					self.tfServiceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[3].label,value:labelKeySetArr[3].value+" "+labelKeySetArr[4].value.split(' ')[1]});
					continue;
				}
				if((arrItemNo==8 || arrItemNo==9 || arrItemNo==10) && labelKeySetArr[arrItemNo].value != ''){
					self.tfServiceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[arrItemNo].label,value:labelKeySetArr[3].value+" "+labelKeySetArr[arrItemNo].value});
					continue;
				}
				if(arrItemNo == 11 && labelKeySetArr[arrItemNo].value == ''){
					self.tfServiceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:labelKeySetArr[11].label,value:"0.00"});
					continue;
				}
				if(arrItemNo==3){
					continue;
				}
			break;*/
			case "ASG"://Application for Shipping Guarantee
				if(arrItemNo==13 && labelKeySetArr[11].value == 'AED'){
					continue;
				}
			break;
			case "OCD"://Presentation of Outward Collection Document
				if(arrItemNo==6){
					self.tfServiceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:"SrStatusSubHeader", value:rootScope.appLiterals.APP.RAKPENDINGAPPROVAL.TF_APPROVAL.SRLABELS.OCD.DRAWEE_DETAILS});
				}
				if(arrItemNo==10){
					self.tfServiceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:"SrStatusSubHeader", value:rootScope.appLiterals.APP.RAKPENDINGAPPROVAL.TF_APPROVAL.SRLABELS.OCD.COLLECTING_BD});
				}
			break;
			case "ALG"://Guarantees - Letter Of Guarantee ALG
				if(arrItemNo==11){
					self.tfServiceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:"SrStatusSubHeader", value:rootScope.appLiterals.APP.RAKPENDINGAPPROVAL.TF_APPROVAL.SRLABELS.ALG.BENF_DETAILS});
				}
			break;
			case "LAT"://Trust Receipt Application - LAT
				if(arrItemNo==6 || arrItemNo==8 || arrItemNo==10){
					if(labelKeySetArr[arrItemNo].value == 'Y'){
						if(labelKeySetArr[arrItemNo-2].value == 'Y'){
							var document = '';
							self.tfServiceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:document,
									value:labelKeySetArr[arrItemNo+1].label+" "+labelKeySetArr[arrItemNo+1].value});
						}
						else{
							self.tfServiceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:rootScope.appLiterals.APP.RAKPENDINGAPPROVAL.TF_APPROVAL.SRLABELS.LAT.DOC_DOCUMENTS,
									value:labelKeySetArr[arrItemNo+1].label+" "+labelKeySetArr[arrItemNo+1].value});
						}						
						arrItemNo++;
						continue;
					}
					else {						
						arrItemNo++;
						continue;
					}
				}
				if(arrItemNo==15){
					self.tfServiceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:"SrStatusSubHeader", value:rootScope.appLiterals.APP.RAKPENDINGAPPROVAL.TF_APPROVAL.SRLABELS.LAT.SUP_BEN_DET});
				}
				if(arrItemNo==17){
					self.tfServiceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:"SrStatusSubHeader", value:rootScope.appLiterals.APP.RAKPENDINGAPPROVAL.TF_APPROVAL.SRLABELS.LAT.BEN_BANK_DET});
				}
				if(arrItemNo==22){
					self.tfServiceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:"SrStatusSubHeader", value:rootScope.appLiterals.APP.RAKPENDINGAPPROVAL.TF_APPROVAL.SRLABELS.LAT.INT_BANK_DET});
				}
				if(arrItemNo==24){
					if(labelKeySetArr[arrItemNo].value == 'A'){
						self.tfServiceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:rootScope.appLiterals.APP.RAKPENDINGAPPROVAL.TF_APPROVAL.SRLABELS.LAT.SPECIAL_INST, 
									value:rootScope.appLiterals.APP.RAKPENDINGAPPROVAL.TF_APPROVAL.SRLABELS.LAT.SPECIAL_INST_1});
						continue;
					}
					else {
						continue;
					}
				}
				if(arrItemNo==25){
					if(labelKeySetArr[arrItemNo].value == 'A'){
						var spInstTxt = '';
						if(labelKeySetArr[24].value != 'A'){
							spInstTxt = rootScope.appLiterals.APP.RAKPENDINGAPPROVAL.TF_APPROVAL.SRLABELS.LAT.SPECIAL_INST;
						}
						self.tfServiceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:spInstTxt, value:rootScope.appLiterals.APP.RAKPENDINGAPPROVAL.TF_APPROVAL.SRLABELS.LAT.SPECIAL_INST_2_1+" "+labelKeySetArr[26].value
									+" "+rootScope.appLiterals.APP.RAKPENDINGAPPROVAL.TF_APPROVAL.SRLABELS.LAT.SPECIAL_INST_2_2+" "+labelKeySetArr[27].value
									+" "+rootScope.appLiterals.APP.RAKPENDINGAPPROVAL.TF_APPROVAL.SRLABELS.LAT.SPECIAL_INST_2_3});
						continue;
					}
					else {
						continue;
					}
				}
				if(arrItemNo==28){
					if(labelKeySetArr[arrItemNo].value != '-1'){
						self.tfServiceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[arrItemNo+1].label,value:labelKeySetArr[arrItemNo+1].value});
						arrItemNo++;
						continue;
					}
					else {
						arrItemNo++;
						continue;
					}
				}
				if(arrItemNo==26 || arrItemNo==27){
					continue;
				}
			break;
			case "STL"://Apply for Short Term Loan STL
				if(arrItemNo==5 || arrItemNo==7 || arrItemNo==9){
					if(labelKeySetArr[arrItemNo].value == 'Y'){
						var docTxt = '';
						if(arrItemNo==5 && labelKeySetArr[5].value == 'Y'){
							docTxt = rootScope.appLiterals.APP.RAKPENDINGAPPROVAL.TF_APPROVAL.SRLABELS.STL.DOC_DOCUMENTS;
						}
						if(arrItemNo==7 && labelKeySetArr[5].value != 'Y'){
							docTxt = rootScope.appLiterals.APP.RAKPENDINGAPPROVAL.TF_APPROVAL.SRLABELS.STL.DOC_DOCUMENTS;
						}
						if(arrItemNo==9 && labelKeySetArr[5].value != 'Y' && labelKeySetArr[7].value != 'Y'){
							docTxt = rootScope.appLiterals.APP.RAKPENDINGAPPROVAL.TF_APPROVAL.SRLABELS.STL.DOC_DOCUMENTS;
						}
						self.tfServiceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:docTxt,value:labelKeySetArr[arrItemNo+1].label+" "+labelKeySetArr[arrItemNo+1].value});
						continue;
					}
					else {
						continue;
					}
				}
				if(arrItemNo==13){
					self.tfServiceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:"SrStatusSubHeader", value:rootScope.appLiterals.APP.RAKPENDINGAPPROVAL.TF_APPROVAL.SRLABELS.STL.SUP_BEN_DET});
				}
				if(arrItemNo==15){
					self.tfServiceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:"SrStatusSubHeader", value:rootScope.appLiterals.APP.RAKPENDINGAPPROVAL.TF_APPROVAL.SRLABELS.STL.BEN_BANK_DET});
				}
				if(arrItemNo==20){
					self.tfServiceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:"SrStatusSubHeader", value:rootScope.appLiterals.APP.RAKPENDINGAPPROVAL.TF_APPROVAL.SRLABELS.STL.INT_BANK_DET});
				}
				if(arrItemNo==23){
					if(labelKeySetArr[arrItemNo].value == 'A'){
						self.tfServiceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:rootScope.appLiterals.APP.RAKPENDINGAPPROVAL.TF_APPROVAL.SRLABELS.STL.SPECIAL_INST, 
									value:rootScope.appLiterals.APP.RAKPENDINGAPPROVAL.TF_APPROVAL.SRLABELS.STL.SPECIAL_INST_1});
						continue;
					}
					else {
						continue;
					}
				}
				if(arrItemNo==24){
					if(labelKeySetArr[arrItemNo].value == 'A'){
						var spInstTxt = '';
						if(labelKeySetArr[23].value != 'A'){
							spInstTxt = rootScope.appLiterals.APP.RAKPENDINGAPPROVAL.TF_APPROVAL.SRLABELS.STL.SPECIAL_INST;
						}
						self.tfServiceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:spInstTxt,value:rootScope.appLiterals.APP.RAKPENDINGAPPROVAL.TF_APPROVAL.SRLABELS.STL.SPECIAL_INST_2_1+" "+labelKeySetArr[25].value
									+" "+rootScope.appLiterals.APP.RAKPENDINGAPPROVAL.TF_APPROVAL.SRLABELS.STL.SPECIAL_INST_2_2+" "+labelKeySetArr[26].value
									+" "+rootScope.appLiterals.APP.RAKPENDINGAPPROVAL.TF_APPROVAL.SRLABELS.STL.SPECIAL_INST_2_3});
						continue;
					}
					else {
						continue;
					}
				}
				if(arrItemNo==27){
					if(labelKeySetArr[arrItemNo].value != '-1'){
						self.tfServiceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[arrItemNo+1].label,value:labelKeySetArr[arrItemNo+1].value});
						continue;
					}
					else {
						continue;
					}
				}
				if(arrItemNo==6 || arrItemNo==8 || arrItemNo==10 || arrItemNo==25 || arrItemNo==26 || arrItemNo==28){
					continue;
				}
			break;
			default:
				self.tfServiceRequestStatusModel.detailModel.labelKeySetArrModified = labelKeySetArr;
				isModificationRqd = false;
				continue;
			break;
			}
			self.tfServiceRequestStatusModel.detailModel.labelKeySetArrModified.push(
					{label:labelKeySetArr[arrItemNo].label,value:labelKeySetArr[arrItemNo].value});
		}
		return self.tfServiceRequestStatusModel.detailModel.labelKeySetArrModified;
	};

	self.responseApproveAuth=function(responseList){
		/*if(responseList[0].hasOwnProperty("errorMessage")){
			return false;
		}*/
		if(!responseList[0].hasOwnProperty("errorMessage")){
		self.approveAuthModel=responseList[0];
		
		if(responseList[0].hasOwnProperty("userRoleDetails")){
			
			rootScope.rakCorpInit.corpModel.userRoleDetails= responseList[0].userRoleDetails;
			rootScope.rakCorpInit.corpModel.ruleCount=rootScope.rakCorpInit.corpModel.userRoleDetails.length;
		}
		return true;
		}
	};
	//For Trade Finance Approval Details END
	//For Pending Trade Finance SR approvals END
};

