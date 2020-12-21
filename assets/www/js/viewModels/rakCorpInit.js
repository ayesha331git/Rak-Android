App.viewModels.rakCorpInit=function(scope, rootScope, Logger){
	var self=this;
	self.scope=scope;
	rootScope.overlappingRule=true;
	self.corpModel={	
			selectedRuleId:'',
			selectedUserRole:[],
			ruleAuthority:[],
			followHierarchy:'',
			userRoleDetails:[],
			ruleCount:0,
			ruleAuthorityforSingle:'',
			selectedRoleasString:'',
			remarks:'',
			selectedUserRoleId:'',
			loopCount:'',
			corpResponseList:[],
			ruleIndex:'',
			selectedRuleDescription:'',
			searchText:'',
			
			///   //////
			   ruleId:'',
			   corpAuthority:'',
			   followHierarchy:'',
			   apprRoleId:'',
			   userId:'',
			   roleDesc:'',
			   roleId:'',
			   userName:'',
			   apprRoleDesc:'',
			   backFlag:'N',
			   backEvent:'',
			   eventName:'',
			   index:'',
			   validationReqd:false,
			   rulesFlag:false,
			   lookUpvalidationReqd:false,
			roleSelectedFlag:'N',
			processCorpInit : function(responseList){
				Logger.info("Process status of Corp Init response : " );
				if(self.corpModel.backFlag=='N'){
				if(responseList[0].hasOwnProperty("ruleAuthority")){
					corpResponseList=responseList[0];
				}
				
				else if (responseList[1]!==undefined && responseList[1].hasOwnProperty("ruleAuthority")){
					corpResponseList=responseList[1];
				}
				
				if(corpResponseList){
				if(corpResponseList!==undefined && corpResponseList.ruleAuthority[0]!==undefined && corpResponseList.ruleAuthority[0].hasOwnProperty("rules")){
					
					//if(responseList[0].ruleAuthority!==undefined && responseList[0].ruleAuthority.length >0){
					self.corpModel.ruleAuthority = corpResponseList.ruleAuthority;
					self.corpModel.ruleCount = self.corpModel.ruleAuthority[0].rules.length;
					if(self.corpModel.ruleCount>0){
						self.corpModel.validationReqd=true;
					}
					else{
						self.corpModel.validationReqd=false;
					}
					if (self.corpModel.ruleCount==1){
						self.corpModel.ruleAuthorityforSingle = self.corpModel.ruleAuthority[0].rules[0].ruleValue;
						self.corpModel.followHierarchy=self.corpModel.ruleAuthority[0].rules[0].followHierarchy;
						self.corpModel.selectedRuleId = self.corpModel.ruleAuthority[0].rules[0].ruleId;
						self.corpModel.loopCount=corpResponseList.ruleAuthority[0].rules[0].noOfApprovers;
						self.corpModel.index=corpResponseList.ruleAuthority[0].rules[0].index;
						if(corpResponseList.hasOwnProperty("userRoleDetails")){
							self.corpModel.userRoleDetails= corpResponseList.userRoleDetails;
						}
					}
					if(self.corpModel.ruleCount>1){
						self.corpModel.lookUpvalidationReqd=true;
					}
					else{
						self.corpModel.lookUpvalidationReqd=false;
					}
						
	
					
				}
				}
				}
				
			},
			
			processRoleDetail : function(responseList){
				
				if(responseList[0].hasOwnProperty("userRoleDetails")){
					self.corpModel.userRoleDetails= responseList[0].userRoleDetails;
				}
			},
			hideLayOut:function(){
				$("#MainBenificaiary").hide();
			},
			///CORP FLOW
			resolveEventForLookUp:function(flowSelected){
				if(flowSelected){
					
					switch(flowSelected){
					case 'SENDMONEY':
						scope.setGlobalEvent('onBackClickedToSendMoney');
						
						break;
						
					case 'TRADEFINANCE':
						scope.setGlobalEvent('onBackClickedToTradeFinance');
						
						break;
					
					case 'PAYCARDS':
						scope.setGlobalEvent('onBackClickedToPayCards');
						
						break;
					case 'PREPAIDCARDS':
						scope.setGlobalEvent('onBackClickedToPrePaidCard');
						
						break;
					case 'PAYPPCARDSMODIFY':
						scope.setGlobalEvent('onBackClickedToPrePaidCard');
						
						break;
						
					case 'SENDMONEYAGAIN':
						scope.setGlobalEvent('onBackClickedToSendMoneyAgain');
						
						break;
					case 'SENDMONEYMODIFY':
						scope.setGlobalEvent('onBackClickedToSendMoneyModify');
						
						break;
					case 'PAYCARDSAGAIN':
						scope.setGlobalEvent('onBackClickedToPayCardsAgain');
						
						break;
					case 'PAYCARDSMODIFY':
						scope.setGlobalEvent('onBackClickedToPayCardsModify');
						
						break;
					case 'BILLPMT':
						scope.setGlobalEvent('onBackClickedToBillPay');
						
						break;
					case 'BILLPMTAGAIN':
						scope.setGlobalEvent('onBackClickedToBillPayAgain');
					
						break;
					case 'BILLPMTMODIFY':
						scope.setGlobalEvent('onBackClickedToBillModify');
					
						break;
					case 'MULTIBILLPMT':
						scope.setGlobalEvent('onBackClickedToBillMultiple');
					
						break;
						
					case 'SENDMONEYSTOP':
						scope.setGlobalEvent('onBackClickedToSendMoneyStop');
						break;
						
					case 'CARDSTOP':
						scope.setGlobalEvent('onBackClickedToCardStop');
						break;
						
					case 'PAYEESTOP':
						scope.setGlobalEvent('onBackClickedToPayeeStop');
						break;
						
					case 'REMTCANCEL':
						scope.setGlobalEvent('onBackClickedToRemtCancel');
						break;
					case 'CANCELTRANSFER':
						scope.setGlobalEvent('onBackClickedToTransferCancel');
						break;
					case 'CANCELTRANSFERPAYCARD':
						scope.setGlobalEvent('onBackClickedToTransferPayCardCancel');
						break;
						
					case 'QUICKPAY':
						scope.setGlobalEvent('onBackClickedToQuickPay');
						break;
						
					case 'MOBILECASH'	 :
						scope.setGlobalEvent('onBackClickedToMobileCash');
						break;
					case 'XFRSUBMIT':
						scope.setGlobalEvent('onBackClickedToIncompXFR');						
						break;
						
					case 'PCDSUBMIT':
						scope.setGlobalEvent('onBackClickedToIncompPCD');						
						break;
						
					case 'PMTSUBMIT':
						scope.setGlobalEvent('onBackClickedToIncompPMT');						
						break;
					case 'MPMTSUBMIT':
						scope.setGlobalEvent('onBackClickedToIncompMPMT');						
						break;
					case 'MOBILECASHCANCELTRANSFER':
						scope.setGlobalEvent('onBackClickedToMobileCashCancel');						
						break;				
					default:
						break;
					
					}
					
					
				}
			},
			
			updateCorpRoleDetails: function(responseList)
			{
				Logger.info("Process status of updateCorpRoleDetails response : " );
				self.corpModel.userRoleDetails= responseList[0].userRoleDetails;
				self.corpModel.loopCount=responseList[0].LookUpCount;
			},
		/*	updateSelectedRoleDetails:function(index)
			{
				//alert(self.corpModel.userRoleDetails[index].selectedUserRole);
				self.corpModel.selectedUserRole[index]=self.corpModel.userRoleDetails[index].selectedUserRole;
				//self.corpModel.ruleIndex=index;
			},*/
			updateSelectedRuleDetails:function()
			{
				for (var index=0; index<self.corpModel.ruleAuthority[0].rules.length; index++ )
				{
					var strTempString = self.corpModel.ruleAuthority[0].rules[index].ruleId;
					
					if (self.corpModel.selectedRuleId==strTempString){
						self.corpModel.ruleIndex=index.toString();
						self.corpModel.loopCount=corpResponseList.ruleAuthority[0].rules[index].noOfApprovers;
						break;
					}
					
				}
				
			},
			getSelectedRoleDetailsAsString:function()
			{
				self.corpModel.selectedRoleasString='';
				
				for (var index=0; index<self.corpModel.selectedUserRole.length; index++ )
				{
					var strTempString = self.corpModel.selectedUserRole[index];
					if (strTempString===undefined) strTempString = "-";
					if (index==self.corpModel.selectedUserRole.length-1)
						self.corpModel.selectedRoleasString += strTempString;
					else
						self.corpModel.selectedRoleasString += strTempString +"|";
				}
			},
			resetRoleDetails:function()
			{
				for (var index=0; index<self.corpModel.userRoleDetails.length; index++ )
				{
					if (self.corpModel.userRoleDetails[index]!=undefined)
					{
						self.corpModel.userRoleDetails[index].selectedUserRole=[];
					}
				}
				self.corpModel.selectedRoleasString='';
				
			},
			resetCorpInitDetails:function()
			{
				self.corpModel.selectedRuleId='';
				self.corpModel.selectedUserRole=[];
				self.corpModel.ruleAuthority=[];
				self.corpModel.followHierarchy='';
				self.corpModel.userRoleDetails=[];
				self.corpModel.ruleCount=0;
				self.corpModel.ruleAuthorityforSingle='';
				self.corpModel.selectedRoleasString='';
				self.corpModel.remarks='';				
				self.corpModel.selectedUserRoleId='';
				self.corpModel.loopCount='';
				corpResponseList=[];/* for remarks pre population issue in services , change debit card pin flow*/
				
				/////////////////////////////
				self.corpModel.ruleId='';
				self.corpModel.corpAuthority='';
				self.corpModel.followHierarchy='';
				self.corpModel.apprRoleId='';
				self.corpModel.apprRoleDesc='';
				self.corpModel.userId='';
				self.corpModel.roleDesc='';
				self.corpModel.roleId='';
				self.corpModel.userName='';
				self.corpModel.backFlag='';
				self.corpModel.eventName='';
				self.corpModel.validationReqd=false;
				self.corpModel.selectedRuleDescription='';
				self.corpModel.lookUpvalidationReqd=false;
			},
			setOverlapping:function(){
				self.corpModel.rulesFlag=true;
				self.corpModel.apprRoleId='';
				self.corpModel.searchText='';
			},
			resetCorpRoleDetailsandRemarks:function()
			{
				self.corpModel.resetRoleDetails();
				self.corpModel.followHierarchy='';
				self.corpModel.remarks='';
				self.corpModel.loopCount='';
				self.corpModel.selectedRoleasString='';
			}
			
	};
		
};