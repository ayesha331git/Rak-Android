
/* JavaScript content from js/viewModels/rakELMSApproval.js in folder common */
App.viewModels.rakELMSApproval=function(Logger, scope, rootScope){
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
	self.ELMSsrDetItem={};
	
	self.approveAuthModel={};
	self.nextApprovalArr=[];
	self.approverId='';
	self.isBack=false;
	self.pendingApprovalTab='PMA';
	self.approvalReasonDesc='';
	self.backFlag="N";
	self.backClickFlag="N";
	self.ELMSsrApprRejClicked="A";
	//For Pending approvals List page

	//ELMS
	self.pendingListELMS=[];
	self.fromSuccessPage=false;
	self.clickedEvent='';
	self.changeApproverRole='';
	self.fromLandingPage=false;
    self.fromSearch=false;
	self.isELMSsrApprRejClicked="N";
	self.pageName ='';
	
	
	
	
	self.EMLSsrDetItem={};
	/**
	* Formating the response
	* @constructor
	*/
	
	self.approvalCount=function(responseList){
		if(self.fromSuccessPage==true){
	
			if(responseList[0].hasOwnProperty("errorMessage")){
				return false;
			}
			self.rakPMACount=responseList[0].rakPMACount;
			self.rakPCACount=responseList[0].rakPCACount;
			if(responseList[0].approvalCount && responseList[0].approvalCount!="")
			{
				rootScope.rakHome.approvalCount = responseList[0].approvalCount;
			}
			
			
			}
	}
	
	
	
	self.responsePendingApproval=function(responseList){
		if(responseList[0].hasOwnProperty("errorMessage") || (responseList[1] && responseList[1].hasOwnProperty("errorMessage"))){
			return false;
		}
		if(self.backClickFlag!="Y"){
		
		//ELMS
		self.pendingListELMS=responseList[0].approvalsELMSList;
		
		self.txnTypeList=responseList[0].rakTxnTypeList;
		self.accIdList=responseList[0].OprAcctList;
		self.txnStatusList=responseList[0].rakTxnStatusList;

		self.StructureTypeList = responseList[0].StructureTypeList;
		self.MyRoleList = responseList[0].MyRoleList;
		self.prpmFromDate=responseList[0].fromDate;
		self.prpmToDate=responseList[0].toDate;
		if(self.fromLandingPage){
			self.setInitialFromToDate();
		}
	
		self.pendingList=[].concat(responseList[0].approvalsELMSList);
		
	}
		return true;
	};
	self.ELMSServiceRequestStatusModel = {
			detailModel : {},
			selectedRefId : ""
	};
	
	
	
	self.setVals = function(){
		self.ELMSServiceRequestStatusModel.selectedRefId = self.ELMSsrDetItem.txnReferenceId;
		self.ELMSServiceRequestStatusModel.selectedRequestId = self.ELMSsrDetItem.txnType;
		
	
	};
	
    /*ELMS customization for populating vaues from backend dynamically */
	
	self.rakFetchELMSStatusDetResponse=function(responseList){
		if(!responseList[0].hasOwnProperty("errorMessage")){
		self.ELMSServiceRequestStatusModel.detailModel = responseList[0];
		/*self.ELMSServiceRequestStatusModel.detailModel.srHeader = rootScope.$eval(self.ELMSServiceRequestStatusModel.detailModel.srHeader);*/
		if(self.ELMSServiceRequestStatusModel.detailModel.labelKeySet){
			self.ELMSServiceRequestStatusModel.detailModel.labelKeySetArr=[];
			var res=self.ELMSServiceRequestStatusModel.detailModel.labelKeySet.split('|');
			for(var v=0;v<res.length-1;v++){
				var resArr =res[v].split('^');
				var labetStr = rootScope.$eval(resArr[0]);
				var obj={label:labetStr,value:self.ELMSServiceRequestStatusModel.detailModel[resArr[1]]};
				self.ELMSServiceRequestStatusModel.detailModel.labelKeySetArr.push(obj);
			}
			self.ELMSServiceRequestStatusModel.detailModel.labelKeySetArr = self.rakPopulateStatusReqCheck(self.ELMSServiceRequestStatusModel.detailModel.labelKeySetArr);
		}
		
		self.common.message=responseList[0].MESSAGE ? responseList[0].MESSAGE :'';
		}
		return true;
	};
	
	self.rakPopulateStatusReqCheck=function(labelKeySetArr){
		self.ELMSServiceRequestStatusModel.detailModel.labelKeySetArrModified=[];
		var isModificationRqd = true;
		for(var arrItemNo=0; arrItemNo<labelKeySetArr.length && isModificationRqd==true; arrItemNo++){
			
			if(arrItemNo==0){
				self.ELMSServiceRequestStatusModel.detailModel.labelKeySetArrModified.push(
						{label:"SrStatusSubHeader", value:rootScope.appLiterals.APP.RAKELMSPENDINGAPPROVAL.SUBHEADERS.GENERAL_DETAILS});
			}
			switch(self.ELMSServiceRequestStatusModel.selectedRequestId){
			
			case "LSC":
			
			if(arrItemNo==6){
				self.ELMSServiceRequestStatusModel.detailModel.labelKeySetArrModified.push(
						{label:"SrStatusSubHeader", value:rootScope.appLiterals.APP.RAKELMSPENDINGAPPROVAL.SUBHEADERS.SWEEP_DETAILS});
			}
			if(arrItemNo==14){
				if(labelKeySetArr[arrItemNo].value!=''){
					self.ELMSServiceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:"SrStatusSubHeader", value:rootScope.appLiterals.APP.RAKELMSPENDINGAPPROVAL.SUBHEADERS.ACCOUNT_LINKED});
				}
				
			}
			
			break;
			
			case "LSM":
				
				if(arrItemNo==6){
					self.ELMSServiceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:"SrStatusSubHeader", value:rootScope.appLiterals.APP.RAKELMSPENDINGAPPROVAL.SUBHEADERS.SWEEP_DETAILS});
				}
				if(arrItemNo==14){
					if(labelKeySetArr[arrItemNo].value!=''){
						self.ELMSServiceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:"SrStatusSubHeader", value:rootScope.appLiterals.APP.RAKELMSPENDINGAPPROVAL.SUBHEADERS.ACCOUNT_LINKED});
					}
				}
				
			break;
			

			case "LPC":
				
				if(arrItemNo==5){
					self.ELMSServiceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:"SrStatusSubHeader", value:rootScope.appLiterals.APP.RAKELMSPENDINGAPPROVAL.SUBHEADERS.INTEREST_ALLOC_DETAILS});
					}
				
				if(arrItemNo==6 || arrItemNo==9 || arrItemNo==11){
					if(labelKeySetArr[arrItemNo].value!=''){
						self.ELMSServiceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[arrItemNo].label,value:labelKeySetArr[arrItemNo].value+" %"});
					}
					continue;
				}
				
				if(arrItemNo==7){
					if(labelKeySetArr[arrItemNo].value!=''){
						self.ELMSServiceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:"SrStatusSubHeader", value:rootScope.appLiterals.APP.RAKELMSPENDINGAPPROVAL.SUBHEADERS.NOMINATION_DETAILS});
					}
				}
				
				break;
			
			case "LPM":
				
				if(arrItemNo==5){
					self.ELMSServiceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:"SrStatusSubHeader", value:rootScope.appLiterals.APP.RAKELMSPENDINGAPPROVAL.SUBHEADERS.INTEREST_ALLOC_DETAILS});
					}
				
				if(arrItemNo==6 || arrItemNo==9 || arrItemNo==11){
					if(labelKeySetArr[arrItemNo].value!=''){
						self.ELMSServiceRequestStatusModel.detailModel.labelKeySetArrModified.push(
								{label:labelKeySetArr[arrItemNo].label,value:labelKeySetArr[arrItemNo].value+" %"});
					}
					continue;
				}
				
				if(arrItemNo==7){
					if(labelKeySetArr[arrItemNo].value!=''){
						self.ELMSServiceRequestStatusModel.detailModel.labelKeySetArrModified.push(
							{label:"SrStatusSubHeader", value:rootScope.appLiterals.APP.RAKELMSPENDINGAPPROVAL.SUBHEADERS.NOMINATION_DETAILS});
					}
				}
			break;
			
			default:
			
				self.ELMSServiceRequestStatusModel.detailModel.labelKeySetArrModified = labelKeySetArr;
				isModificationRqd = false;
				continue;
			break;
		  }
			
			
			self.ELMSServiceRequestStatusModel.detailModel.labelKeySetArrModified.push(
					{label:labelKeySetArr[arrItemNo].label,value:labelKeySetArr[arrItemNo].value});
		}
		return self.ELMSServiceRequestStatusModel.detailModel.labelKeySetArrModified;
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
	return true;
	};
	

	
	

	
	//For Pending Approvals Search START
	self.txnTypeList=[];
	self.selectedTxnType='';
	self.accIdList=[];
	self.selectedAccId='';
	self.searchFromDate=new Date();
	self.searchToDate=new Date();
	self.txnStatusList=[];
	self.selectedTxnStatus='';
	//for ELMS
	self.StructureTypeList = [];
	self.myRoleList =[];
	self.StructureName='';
	self.selectedStructureType ='All';
	self.selectedRoleType = 'All';
	self.enteredReferenceId = '';
	
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
		self.searchFromDate.setDate(self.searchFromDate.getDate() + parseInt(self.prpmFromDate));
		self.searchToDate=new Date();
		self.selectedTxnStatus='';
		
		/*ELMS Customization starts here*/
		
		self.StructureTypeList = [];
		self.myRoleList =[];
		self.StructureName='';
		self.selectedStructureType ='All';
		self.selectedRoleType = 'All';
		self.enteredReferenceId = '';
		
		/*ELMS Customization ends here*/
		self.backClickFlag="N";
		
	};
	self.resetListData=function(){
		
		self.pendingListELMS=[];
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
	
	
	
	self.resetPendingModel=function(){
		
		self.detailModel={};
		self.reason='';
		self.mutipleList={};
		self.isBack=false;
		self.pendingApprovalTab='PMA';
		self.backFlag="N";
		self.backClickFlag ="N";
		/*self.pendingListELMS=[];*/
		
		
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
			//self.searchToDate.setDate(self.searchToDate.getDate() + parseInt(self.prpmToDate));
			self.fromLandingPage=false;
			self.fromSearch=false;
		
		 },

	//For Pending Approvals Search END
		 
		 
	//For Update Next Approver START
	self.userRoleDetails=[];
	self.apprRoleId="";
	self.apprRoleDesc="";
	self.nxtApprIdType="U";
	self.approverList=function(responseList){
	
		if(self.backFlag=='N'){
	  
			self.userRoleDetails=responseList[0].userRoleDetails;
			if(self.userRoleDetails.length==0){
				self.nxtApprIdType="";
			}
		
		if(responseList[0].hasOwnProperty('nextAppr') && self.backFlag!='Y')
			{
				self.apprRoleId = responseList[0].nextAppr;
			}
		
		}
		self.approverHistoryList = responseList[0].approver_History_List;
		return true;
	};
	//For Update Next Approver START
};