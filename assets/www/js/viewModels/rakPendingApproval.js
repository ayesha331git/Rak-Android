
/* JavaScript content from js/viewModels/rakPendingApproval.js in folder common */
App.viewModels.rakPendingApproval=function(Logger, scope, rootScope){
	var self=this;
	
	
	self.common={

			message:'',
			approvalStatus:''

	 };
	 self.validationEvent = function(){
		 if(self.apprRoleId){
			 scope.setEvent('onPenApprUpdtNxtApprConfirmClick');
			 
		 }
		 else{
			 rootScope.showErrorPopup("Next approver value can't be blank");
		 }
	 }
	 self.clearCommonData =function(){
	    
	    	self.common.message='';
	    	self.common.approvalStatus='';
    
    };
	
	self.reason='';
	self.pendingItem={};
	self.pendingList=[];
	self.detailModel={};
	self.mutipleList={};
	self.approveAuthModel={};
	self.nextApprovalArr=[];
	self.approverId='';
	self.isBack=false;
	self.pendingApprovalTab='PMA';
	self.backFlag="N";
	self.backClickFlag="N";
	//For Pending approvals List page
	self.pendingListXFR=[];
	self.pendingListPMT=[];
	self.pendingListPCD=[];
	self.pendingListRCM=[];
	self.pendingListDDS=[];
	self.pendingListWPS=[];
	self.pendingListNPS=[];
	self.pendingListELMS=[];
	self.fromSuccessPage=false;
	self.clickedEvent='';
	self.changeApproverRole='';
	self.fromLandingPage=false;
	self.approvalReasonDesc='';
	self.fromSearch=false;
	self.multiclickedEvent='';
	self.userFinalDate='';
	self.cutOffMsg;
	
	
	self.approvalCount=function(responseList){
		if(self.fromSuccessPage==true){
	
			if(responseList[0].hasOwnProperty("errorMessage")){
				return false;
			}
			self.rakPMACount=responseList[0].rakPMACount;
			self.rakPCACount=responseList[0].rakPCACount;
			self.rakPIACount=responseList[0].rakPIACount;
			if(responseList[0].approvalCount && responseList[0].approvalCount!="")
			{
				rootScope.rakHome.approvalCount = responseList[0].approvalCount;
			}
			
			/*if(null!=self.rakPMACount && ""!=self.rakPMACount && null!=self.rakPIACount && ""!=self.rakPIACount){
				if((parseInt(self.rakPMACount) + parseInt(self.rakPIACount)).toString()!="0"){
					self.rakApprCountDashboard=(parseInt(self.rakPMACount) + parseInt(self.rakPIACount)).toString();
				}
				else{
	              	self.rakApprCountDashboard="";
	            }
			}*/
			
			}
	}
	/**
	* Formating the response
	* @constructor
	*/
	self.responsePendingApproval=function(responseList){
		if(responseList[0].hasOwnProperty("errorMessage") || (responseList[1] && responseList[1].hasOwnProperty("errorMessage"))){
			return false;
		}
		if(self.backClickFlag!="Y"){
		self.pendingListXFR=responseList[0].approvalsFTList;
		self.pendingListPMT=responseList[0].approvalsPaymentList;
		self.pendingListPCD=responseList[0].approvalsPayCardsList;
		self.pendingListRCM=responseList[0].approvalsRemittanceList;
		self.pendingListMOBCASH=responseList[0].approvalsMobCashList;
		self.pendingListDDS=responseList[0].approvalsDDSList;
		self.pendingListWPS=responseList[0].approvalsWPSList;
		self.pendingListNPS=responseList[0].approvalsNPSList;
		if(responseList[0].hasOwnProperty("approvalsELMSList")){
			self.pendingListELMS=responseList[0].approvalsELMSList;
		}
		
		
		self.txnTypeList=responseList[0].rakTxnTypeList;
		self.accIdList=responseList[0].OprAcctList;
		self.txnStatusList=responseList[0].rakTxnStatusList;
	/*	if(responseList[0].selectedTxnType==''){
			self.selectedTxnType=responseList[0].rakTxnTypeList[0].txnTypeCode;
		}*/
		
		//self.selectedAccId=responseList[0].selectedAccId;
		/* if(responseList[0].selectedTxnStatus==''){
		self.selectedTxnStatus=responseList[0].rakTxnStatusList[0].txnStatusCode;
		 }*/
	
		self.prpmFromDate=responseList[0].fromDate;
		self.prpmToDate=responseList[0].toDate;
		if(self.fromLandingPage){
			self.setInitialFromToDate();
		}
		if(responseList[0].hasOwnProperty("approvalsELMSList")){
			self.pendingList=[].concat(responseList[0].approvalsFTList).concat(responseList[0].approvalsPaymentList).concat(responseList[0].approvalsPayCardsList).concat(responseList[0].approvalsRemittanceList).concat(responseList[0].approvalsDDSList).concat(responseList[0].approvalsWPSList).concat(responseList[0].approvalsMobCashList).concat(responseList[0].approvalsELMSList);
		}
		else{
			self.pendingList=[].concat(responseList[0].approvalsFTList).concat(responseList[0].approvalsPaymentList).concat(responseList[0].approvalsPayCardsList).concat(responseList[0].approvalsRemittanceList).concat(responseList[0].approvalsDDSList).concat(responseList[0].approvalsWPSList).concat(responseList[0].approvalsMobCashList).concat(responseList[0].approvalsNPSList);
		}
		
		
	}
		return true;
	};
	/**
	* Handling event on responsePendingApprovalSwipeApproveDetails
	* @constructor
	*/
	self.responsePendingApprovalSwipeApproveDetails=function(responseList){
		if(self.approveAuthModel.backFlag=="N"){
		if(self.isFromLandingPage == true){
			if(responseList[0].hasOwnProperty("errorMessage") || responseList[1].hasOwnProperty("errorMessage")){
				return false;
			}
			self.responsePendingApprovalDetails(responseList);
			self.common.message=responseList[0].MESSAGE ? responseList[0].MESSAGE :'';
			self.cutOffMsg=responseList[0].CUTOFFMESSAGE ? responseList[0].CUTOFFMESSAGE :'';
			var responseForauth=[].concat(responseList[1]);
			self.responseApproveAuth(responseForauth);
		}
		else {
			if(responseList[0].hasOwnProperty("errorMessage")){
				return false;
			}
			self.responseApproveAuth(responseList);
		}
	};
	}
	/**
	* Handling event on responsePendingApprovalSwipeRejectDetails
	* @constructor
	*/
	self.responsePendingApprovalSwipeRejectDetails=function(responseList){
		if(self.approveAuthModel.backFlag=="N"){
		if(self.isFromLandingPage == true){
			if(responseList[0].hasOwnProperty("errorMessage") ){
				return false;
			}
			self.responsePendingApprovalDetails(responseList);
			//var responseForauth=[].concat(responseList[1]);
			self.responseRejectAuth(responseList);
		}
		else {
			if(responseList[0].hasOwnProperty("errorMessage")){
				return false;
			}
			self.responseRejectAuth(responseList);
		}
		}
	};
	/**
	* Initialize  responsePendingApprovalDetails module
	* @constructor
	*/
	self.responsePendingApprovalDetails=function(responseList){
		if(responseList[0].hasOwnProperty("errorMessage") || self.isBack){
			self.isBack=false;
			return false;
		}
		if(!responseList[0].hasOwnProperty("errorMessage")) {
		self.detailModel=responseList[0];
		
		if (responseList[0].hasOwnProperty('mutipleList')){
			self.mutipleList = responseList[0].mutipleList;
		}
		if(self.detailModel.approvalHistory)
			self.detailModel.approvalHistoryArr=self.detailModel.approvalHistory.split(',');
		
		if(self.detailModel.labelKeySet){
			self.detailModel.labelKeySetArr=[];
			var res=self.detailModel.labelKeySet.split('|');
			for(var v=0;v<res.length;v++){
				var resArr =res[v].split('^');
				var obj={label:resArr[0],value:resArr[1]};
				self.detailModel.labelKeySetArr.push(obj);
			}
		}
		return true;
		}
	};
	/**
	* Initialize  responseApproveAuth module
	* @constructor
	*/
	self.responseApproveAuth=function(responseList){
		if(responseList[0].hasOwnProperty("errorMessage")){
			return false;
		}
		self.approveAuthModel=responseList[0];
		return true;
	};
	/**
	* Initialize  responseRejectAuth module
	* @constructor
	*/
	self.responseRejectAuth=function(responseList){
		if(responseList[0].hasOwnProperty("errorMessage")){
			return false;
		}
		self.reason='';
		self.approveAuthModel=responseList[0];
		return true;
	};
	/**
	* Initialize  responseSuccess module
	* @constructor
	*/
	self.responseSuccess=function(responseList){
		if(responseList[0].hasOwnProperty("errorMessage")){
			return false;
		}
		/*if(!responseList[0].hasOwnProperty("referenceId")){
			rootScope.showConfirmBox(responseList[0].message,"Ok","",function(){
				scope.setEvent("gotoLandingPageClick");
				});
		}*/
		if(responseList[0].hasOwnProperty("userFinalDate")){
			self.userFinalDate = responseList[0].userFinalDate;
		}
		
		return true;
	};
	/**
	* Handling event on getAuthEvent
	* @constructor
	*/
	self.getAuthEvent=function(){
		var str="";
		if(!self.approveAuthModel.authPwd)
			self.approveAuthModel.authPwd='';
		
		if(self.pendingItem.txnType=='BIL' || self.pendingItem.txnType=='CPT'){
			str="Biller";
		}
		else if(self.pendingItem.txnType=='SR'){
			str='SR';
		}
		if(self.approveAuthModel.auth===''){
			return "on"+str+"NoPwdConfirmClick";
		}
		else if(self.approveAuthModel.auth==rootScope.txnpwdString || self.approveAuthModel.auth==rootScope.otpString){
			return "on"+str+"ConfirmClick";
		}
	};
	/**
	* Handling getListPageEvent according to the txnType
	* @constructor
	*/
	/*customized for elms */
	self.getListPageEvent=function(txnType){
//		if(self.pendingApprovalTab=='PMA')
//		{
			if(txnType=='XFR' ||txnType=='PMT' ||txnType=='PCD' || txnType=='RCM' || txnType=='DDS' || txnType=='WPS' || txnType=='NPS' ||  txnType=='MCP' || txnType=='LPC' || txnType=='LSC' ){
				return "onPendingPaymentClick";
			}
//		}
		else
			return "";
	};
	/**
	* Handling getSwipeApproveEvent according to the txnType
	* @constructor
	*/
	self.getSwipeApproveEvent=function(txnType){
		txnType=self.pendingItem.txnType;
		if(txnType=='XFR' ||txnType=='PMT' ||txnType=='PCD'){
			return "onPendingSwipePaymentApproveClick";
		}
		else if(txnType=='RCM'){
			return "onPendingSwipeRemittanceApproveClick";
		}
		else if(txnType=='BIL' || txnType=='CPT'){
			return "onPendingSwipeBillerApproveClick";
		}
		else if(txnType=='SR'){
			return 'onPendingSwipeSRApproveClick';
		}
	};
	/**
	* Handling getSwipeRejectEvent according to the txnType
	* @constructor
	*/
	self.getSwipeRejectEvent=function(txnType){
		txnType=self.pendingItem.txnType;
		if(txnType=='XFR' ||txnType=='PMT' ||txnType=='PCD' || txnType=='MCP' || txnType=='DDS' || txnType=='WPS' || txnType=='NPS' || txnType=='LSC' || txnType=='LPC' ){
			return "onPendingSwipePaymentRejectClick";
		}
		else if(txnType=='RCM'){
			return "onPendingSwipeRemittanceRejectClick";
		}
		else if(txnType=='BIL' || txnType=='CPT'){
			return "onPendingSwipeBillerRejectClick";
		}
		else if(txnType=='SR'){
			return 'onPendingSwipeSRRejectClick';
		}
	};
	
	//Added for Rak Corporate Approval Flow START
	self.approvalListToggleXFR =function(position){
		if(self.pendingListXFR){
		for(var i=0;i<self.pendingListXFR.length;i++){
			if(position==i){
				//showing cross image on click of particular transaction
				self.pendingListXFR[i].fullRmrks=!self.pendingListXFR[i].fullRmrks;
				continue;
			}
		  //showing all other transactions with dot	image
			self.pendingListXFR[i].fullRmrks=false;
		}
	}
	};
	self.approvalListTogglePMT =function(position){
		if(self.pendingListPMT){
		for(var i=0;i<self.pendingListPMT.length;i++){
			if(position==i){
				//showing cross image on click of particular transaction
				self.pendingListPMT[i].fullRmrks=!self.pendingListPMT[i].fullRmrks;
				continue;
			}
		  //showing all other transactions with dot	image
			self.pendingListPMT[i].fullRmrks=false;
		}
	}
	};
	self.approvalListTogglePCD =function(position){
		if(self.pendingListPCD){
		for(var i=0;i<self.pendingListPCD.length;i++){
			if(position==i){
				//showing cross image on click of particular transaction
				self.pendingListPCD[i].fullRmrks=!self.pendingListPCD[i].fullRmrks;
				continue;
			}
		  //showing all other transactions with dot	image
			self.pendingListPCD[i].fullRmrks=false;
		}
	}
	};
	self.approvalListToggleRCM =function(position){
		if(self.pendingListRCM){
		for(var i=0;i<self.pendingListRCM.length;i++){
			if(position==i){
				//showing cross image on click of particular transaction
				self.pendingListRCM[i].fullRmrks=!self.pendingListRCM[i].fullRmrks;
				continue;
			}
		  //showing all other transactions with dot	image
			self.pendingListRCM[i].fullRmrks=false;
		}
	}
	};
	
	self.approvalListToggleMOBCASH =function(position){
		if(self.pendingListXFR){
		for(var i=0;i<self.pendingListMOBCASH.length;i++){
			if(position==i){
				//showing cross image on click of particular transaction
				self.pendingListMOBCASH[i].fullRmrks=!self.pendingListMOBCASH[i].fullRmrks;
				continue;
			}
		  //showing all other transactions with dot	image
			self.pendingListMOBCASH[i].fullRmrks=false;
		}
	}
	};
	self.approvalListToggleDDS =function(position){
		if(self.pendingListDDS){
		for(var i=0;i<self.pendingListDDS.length;i++){
			if(position==i){
				//showing cross image on click of particular transaction
				self.pendingListDDS[i].fullRmrks=!self.pendingListDDS[i].fullRmrks;
				continue;
			}
		  //showing all other transactions with dot	image
			self.pendingListDDS[i].fullRmrks=false;
		}
	}
	};
	self.approvalListToggleWPS =function(position){
		if(self.pendingListWPS){
		for(var i=0;i<self.pendingListWPS.length;i++){
			if(position==i){
				//showing cross image on click of particular transaction
				self.pendingListWPS[i].fullRmrks=!self.pendingListWPS[i].fullRmrks;
				continue;
			}
		  //showing all other transactions with dot	image
			self.pendingListWPS[i].fullRmrks=false;
		}
	}
	};
	self.approvalListToggleNPS =function(position){
		if(self.pendingListNPS){
		for(var i=0;i<self.pendingListNPS.length;i++){
			if(position==i){
				//showing cross image on click of particular transaction
				self.pendingListNPS[i].fullRmrks=!self.pendingListNPS[i].fullRmrks;
				continue;
			}
		  //showing all other transactions with dot	image
			self.pendingListNPS[i].fullRmrks=false;
		}
	}
	};
	/*ELMS customization starts here */
	self.approvalListToggleELMS =function(position){
		if(self.pendingListELMS){
		for(var i=0;i<self.pendingListELMS.length;i++){
			if(position==i){
				//showing cross image on click of particular transaction
				self.pendingListELMS[i].fullRmrks=!self.pendingListELMS[i].fullRmrks;
				continue;
			}
		  //showing all other transactions with dot	image
			self.pendingListELMS[i].fullRmrks=false;
		}
	}
	};
	/*ELMS customization ends here */
	//For showing the approval count in the Approvals dashboard START
	self.rakPMACount='';
	self.rakPCACount='';
	self.rakPIACount='';
	
	self.rakApprCountDashboard="";

	self.fetchPenApprCount=function(responseList){
		if(responseList[0].hasOwnProperty("errorMessage")){
			return false;
		}
		
		if(responseList[0].hasOwnProperty("fromDate")){
			self.prpmFromDate=responseList[0].fromDate;
			self.prpmToDate=responseList[0].toDate;
		}
		
		if(responseList[0].hasOwnProperty("RemitTxnStatus")){
			self.common.approvalStatus=responseList[0].RemitTxnStatus;;
		
		}
		
		self.detailModel.txn_status=responseList[0].hasOwnProperty("txnStatus") ? responseList[0].txnStatus : self.detailModel.txn_status;
		
		self.rakPMACount=responseList[0].rakPMACount;
		self.rakPCACount=responseList[0].rakPCACount;
		self.rakPIACount=responseList[0].rakPIACount;
		if(responseList[0].approvalCount && responseList[0].approvalCount!="")
		{
			rootScope.rakHome.approvalCount = responseList[0].approvalCount;
		
		}
		
		
	/*	if(null!=self.rakPMACount && ""!=self.rakPMACount && null!=self.rakPIACount && ""!=self.rakPIACount){
			if((parseInt(self.rakPMACount) + parseInt(self.rakPIACount)).toString()!="0"){
				self.rakApprCountDashboard=(parseInt(self.rakPMACount) + parseInt(self.rakPIACount)).toString();
			}
			else{
              	self.rakApprCountDashboard="";
            }
		}*/
		return true;
	};
	//For showing the approval count in the Approvals dashboard END
	
	//Added for Rak Corporate Approval Flow END
	
	//For Pending Approvals Search START
	self.txnTypeList=[];
	self.selectedTxnType='';
	self.accIdList=[];
	self.selectedAccId='';
	self.searchFromDate=new Date();
	self.searchToDate=new Date();
	self.txnStatusList=[];
	self.selectedTxnStatus='';
	
	self.displayDate = new Date();
	self.fromSearchResult = false;
	self.searchFromDate_year="";
	self.searchFromDate_month="";
	self.searchFromDate_day="";
	self.searchToDate_year="";
	self.searchToDate_month="";
	self.searchToDate_day="";
	
	self.resetSearchVals = function() {
		self.selectedTxnType='';
		self.selectedAccId='';
		self.searchFromDate=new Date();
		self.searchToDate=new Date();
		self.selectedTxnStatus='';
		self.pendingListXFR=[];
		self.pendingListPMT=[];
		self.pendingListPCD=[];
		/*ELMS Customization starts here*/
		self.pendingListELMS=[];
		/*ELMS Customization ends here*/
		self.backClickFlag="N";
		
	};
	self.resetListData=function(){
		self.pendingListXFR=[];
		self.pendingListPMT=[];
		self.pendingListPCD=[];
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
	
	self.resolveEventForLookUp=function(flowSelected){
		if(flowSelected=='APPR' && self.multiclickedEvent != "" && self.multiclickedEvent=='MULTIPLE'){
			scope.setGlobalEvent('onMultiBillClickedApprove');
		}
		else if(flowSelected){
			
			switch(flowSelected){
			case 'APPR':
				scope.setGlobalEvent('onBackClickedApprove');
				
				break;
			
			case 'REJ':
				scope.setGlobalEvent('onBackClickedToPayCards');
				break;
				
			case 'APPRCM':
				scope.setGlobalEvent('onBackClickedRemitApprove');
				
				break;
			
			case 'REJRCM':
				scope.setGlobalEvent('onBackClickedRemitReject');
				break;
				
			case 'CHAPPR':
				scope.setEvent('onPenApprRoleSelClick');
				break;
				
			case 'CHAPPRMULBIL':
				scope.setEvent('onPenApprRoleSelMulipleBillClick');
				break;
				
				
				
			
			default:
				break;
			
			}
			
			
		}
	},
	
	self.resetPendingModel=function(){
		/*self.reason='';
		self.pendingItem={};
		self.pendingList=[];*/
		self.detailModel={};
		self.reason='';
		self.mutipleList={};
		
		/*self.approveAuthModel={};
		self.nextApprovalArr=[];
		self.approverId='';
		self.isBack=false;
		self.pendingApprovalTab='PMA';
		self.backFlag="N";
	
		self.pendingListXFR=[];
		self.pendingListPMT=[];
		self.pendingListPCD=[];
		
		self.clickedEvent='';*/
	},
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
	
	self.setDateFromMenu=function(responseList){
		self.prpmFromDate=responseList.fromDate;
		self.prpmToDate=responseList.toDate;
	
		
	};
self.fromCountPage=function(){
	if(self.fromLandingPage){
	 self.setInitialFromToDate();
	 self.setFromToDate();
}
};

self.setInitialData=function(){
	
	self.selectedTxnType='All';
};


	
	 self.setInitialFromToDate = function() {
		 
		 
			self.searchFromDate=new Date();
			self.searchToDate=new Date();
			
			
			self.searchFromDate.setDate(self.searchFromDate.getDate() + parseInt(self.prpmFromDate));
			self.searchToDate.setDate(self.searchToDate.getDate() + parseInt(self.prpmToDate));
			self.fromLandingPage=false;
			self.fromSearch=false;
		 /*	self.payCard.searchFromDate = new Date().addMonths(-1);
		 	self.payCard.searchToDate = new Date();
			self.common.displayDate = self.payCard.searchFromDate;
			self.utils.populateCurrentDateDetails();

			self.payCard.searchFromDate_day =self.common.date;
			self.payCard.searchFromDate_month=self.common.month;
			self.payCard.searchFromDate_year=self.common.year;

			self.common.displayDate = self.payCard.searchToDate;
			self.utils.populateCurrentDateDetails();

			self.payCard.searchToDate_day =self.common.date;
			self.payCard.searchToDate_month=self.common.month;
			self.payCard.searchToDate_year=self.common.year;*/
		 },

	//For Pending Approvals Search END
	//For Update Next Approver START
	self.userRoleDetails=[];
	self.apprRoleId="";
	self.apprRoleDesc="";
	self.nxtApprIdType="U";
	self.responsePenApprUpdtNxtApprDetails=function(responseList){
		if(responseList[0].hasOwnProperty("errorMessage") || self.isBack){
			self.isBack=false;
			return false;
		}
		if(self.backFlag=='N'){
		self.detailModel=responseList[0];
		
		if (responseList[0].hasOwnProperty('mutipleList')){
			self.mutipleList = responseList[0].mutipleList;
		}
		
		if(self.detailModel.approvalHistory)
			self.detailModel.approvalHistoryArr=self.detailModel.approvalHistory.split(',');
		
		if(self.detailModel.labelKeySet){
			self.detailModel.labelKeySetArr=[];
			var res=self.detailModel.labelKeySet.split('|');
			for(var v=0;v<res.length;v++){
				var resArr =res[v].split('^');
				var obj={label:resArr[0],value:resArr[1]};
				self.detailModel.labelKeySetArr.push(obj);
			}
		}
		
		self.userRoleDetails=responseList[0].userRoleDetails;
		
		if(responseList[0].hasOwnProperty('nextAppr') && self.backFlag!='Y')
			{
				self.apprRoleId = responseList[0].nextAppr;
			}
		
		}
		return true;
	};
	//For Update Next Approver START
};