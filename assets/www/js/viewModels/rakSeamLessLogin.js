App.viewModels.rakSeamLessLogin = function(scope, rootScope, UIControlsService) {
	
	var self = this;
	
	self.tabVisble={
			tab4:false
	};
	
	
			 self.checkTab=function()
			   	{
				 	if(jQuery('#tabs-slide4').hasClass('swiper-slide-active'))
				 		{
				 		self.tabVisble.tab4=true;
				 		}
				 	
					if(jQuery('#tabs-slide4').hasClass('swiper-slide-active'))
			 		{
			 		self.tabVisble.tab4=true;
			 		}

			   	}

//----------------------------------------------------------------------------------------------------------------
					    //RAK:  - Added for Seam Less Login : START
						self.RakSeamLessLoginModel={
					    		actionDetails:[],
								ExistingIBId:"",
					    		ExistingMBId:"",
					    		IndividualId:"",
					    		IsUserIdChanged:"",
					    		IsUserMigrated:"",
					    		IsUserIdSame:"",
					    		IsIBUserIdAvailable:"",
								IsIBUserIdAvailableShow:"",
					    		IsMBUserIdAvailable:"",
								IsMBUserIdAvailableShow:"",
					    		IsSingleChannel:"",
								UserName:"",
								UserId:"",
								isIBorMBUserIdSelected:"",
								isIBandMBDiffAndBothAvl:false,
								isIBandMBSameAndAvl:false,
								isEitherIBorMBAvl:false,
								isNeitherIBorMBAvl:false,
								isSingleChannelAvl:false,
								selectedUserIdToSend:"",
								selectedUserIdToSendReEnter:"",
								userEnteredSignOnPwd:"",
								userEnteredSignOnPwdReType:"",
								userEnteredTxnPwd:"",
								userEnteredTxnPwdReType:"",
								isPreLoginFlow:false,
								preOrPostLoginClick:"",
								isExistingOrNewPwd:"",
								isExistingOrNewPwdValRqd:false,
								isNewPwdForNeitherIBMBAvl:false,
								successMessage:"",
								authFlag:"N",
								authMode:"",
								responseText:"",
								authStatus:false,
								txnPwd:"",
								isBack:false,
								successMsg:"",
								detailsPage:false,
								infoPage:true,
								userType:"1",
								tabValue:"1",
								sessionClear:"",
						};
					    self.resetRakSeamLessLoginDetails=function(){
					    	self.RakSeamLessLoginModel.actionDetails=[];
					    	self.RakSeamLessLoginModel.ExistingIBId="";
					    	self.RakSeamLessLoginModel.ExistingMBId="";
					    	self.RakSeamLessLoginModel.IndividualId="";
					    	self.RakSeamLessLoginModel.IsUserIdChanged="";
					    	self.RakSeamLessLoginModel.IsUserMigrated="";
					    	self.RakSeamLessLoginModel.IsUserIdSame="";
					    	self.RakSeamLessLoginModel.IsIBUserIdAvailable="";
							self.RakSeamLessLoginModel.IsIBUserIdAvailableShow="";
					    	self.RakSeamLessLoginModel.IsMBUserIdAvailable="";
							self.RakSeamLessLoginModel.IsMBUserIdAvailableShow="";
					    	self.RakSeamLessLoginModel.IsSingleChannel="";
							self.RakSeamLessLoginModel.UserName="";
							self.RakSeamLessLoginModel.UserId="";
							self.RakSeamLessLoginModel.isIBorMBUserIdSelected="";
							self.RakSeamLessLoginModel.isIBandMBDiffAndBothAvl=false;
							self.RakSeamLessLoginModel.isIBandMBSameAndAvl=false;
							self.RakSeamLessLoginModel.isEitherIBorMBAvl=false;
							self.RakSeamLessLoginModel.isNeitherIBorMBAvl=false;
							self.RakSeamLessLoginModel.isSingleChannelAvl=false;
							self.RakSeamLessLoginModel.selectedUserIdToSend="";
							self.RakSeamLessLoginModel.selectedUserIdToSendReEnter="";
							self.RakSeamLessLoginModel.userEnteredSignOnPwd="";
							self.RakSeamLessLoginModel.userEnteredSignOnPwdReType="";
							self.RakSeamLessLoginModel.userEnteredTxnPwd="";
							self.RakSeamLessLoginModel.userEnteredTxnPwdReType="";
							self.RakSeamLessLoginModel.isPreLoginFlow=false;
							self.RakSeamLessLoginModel.preOrPostLoginClick="";
							self.RakSeamLessLoginModel.isExistingOrNewPwd="";
							self.RakSeamLessLoginModel.isExistingOrNewPwdValRqd=false;
							self.RakSeamLessLoginModel.isNewPwdForNeitherIBMBAvl=false;
					    	self.RakSeamLessLoginModel.successMessage="";
					    	self.RakSeamLessLoginModel.authFlag="N";
					    	self.RakSeamLessLoginModel.authMode="";
					    	self.RakSeamLessLoginModel.authStatus=false;
					    	self.RakSeamLessLoginModel.txnPwd="";
					    	self.RakSeamLessLoginModel.responseText="";
					    	self.RakSeamLessLoginModel.isBack="";
					    	self.RakSeamLessLoginModel.successMsg="";
					    	self.RakSeamLessLoginModel.detailsPage=false;
					    	self.RakSeamLessLoginModel.userType="1";
					    	self.RakSeamLessLoginModel.infoPage=true;
					    	self.RakSeamLessLoginModel.tabValue="1";
					    	self.RakSeamLessLoginModel.sessionClear="NO";
					    };
					    self.getIsUserMigrated=function(responsesList){
					    	
					    	if(responsesList)
					    	{
						    	if (!responsesList.hasOwnProperty('errorMessage'))
								{
							    	if (responsesList.hasOwnProperty('params')) {
							    		self.RakSeamLessLoginModel.IsUserMigrated=responsesList.params.IsUserMigrated;
									}
								}
					    	}
					    	
					    };
						self.fetchRakSeamLessLoginData=function(responsesList){
							
							if(responsesList)
					    	{
								if (!responsesList.hasOwnProperty('errorMessage'))
								{
									if (responsesList.hasOwnProperty('params')) {
							    		
									  self.RakSeamLessLoginModel.userType=responsesList.params.userType;
									  self.RakSeamLessLoginModel.ExistingIBId=responsesList.params.ExistingIBId;
									  self.RakSeamLessLoginModel.ExistingMBId=responsesList.params.ExistingMBId;
									  self.RakSeamLessLoginModel.IndividualId=responsesList.params.IndividualId;
									  self.RakSeamLessLoginModel.IsUserIdChanged=responsesList.params.IsUserIdChanged;
									  self.RakSeamLessLoginModel.IsUserMigrated=responsesList.params.IsUserMigrated;
									  self.RakSeamLessLoginModel.IsUserIdSame=responsesList.params.IsUserIdSame;
									  self.RakSeamLessLoginModel.IsIBUserIdAvailable=responsesList.params.IsIBUserIdAvailable;
									  self.RakSeamLessLoginModel.IsMBUserIdAvailable=responsesList.params.IsMBUserIdAvailable;
									  self.RakSeamLessLoginModel.IsSingleChannel=responsesList.params.IsSingleChannel;
									  self.RakSeamLessLoginModel.UserName=responsesList.params.UserName;
									  
									  rootScope.isUserLoggedIn = false;
									  rootScope.stepupAuthentication.isEnabled = false;
									}
								}
					    	}
				    	};
				    	self.setRakSeamLessLoginValues=function(){
				    	  if(self.RakSeamLessLoginModel.IsIBUserIdAvailable == "Y")
			    		  {
							  self.RakSeamLessLoginModel.IsIBUserIdAvailableShow="YES";
			    		  }
						  else
						  {
							  self.RakSeamLessLoginModel.IsIBUserIdAvailableShow="NO";
						  }
						  
				    	  if(self.RakSeamLessLoginModel.IsMBUserIdAvailable == "Y")
			    		  {
							  self.RakSeamLessLoginModel.IsMBUserIdAvailableShow="YES";
			    		  }
						  else
						  {
							  self.RakSeamLessLoginModel.IsMBUserIdAvailableShow="NO";
						  }

				    	};
				    	self.detectWhetherIBandMBDiffAndBothAvl=function(){
				    		if(self.RakSeamLessLoginModel.IsIBUserIdAvailable == "Y" 
				    			&& self.RakSeamLessLoginModel.IsMBUserIdAvailable == "Y"
				    			&& self.RakSeamLessLoginModel.ExistingIBId != self.RakSeamLessLoginModel.ExistingMBId
				    			&& self.RakSeamLessLoginModel.IsSingleChannel == "N") {
				    			self.RakSeamLessLoginModel.isIBandMBDiffAndBothAvl=true;
				    		}
				    		else {
				    			self.RakSeamLessLoginModel.isIBandMBDiffAndBothAvl=false;
				    		}
				    	};
				    	self.detectIfEitherIBorMBAvl=function(){
				    		if(((self.RakSeamLessLoginModel.IsIBUserIdAvailable == "Y" 
				    				&& self.RakSeamLessLoginModel.IsMBUserIdAvailable == "N") || 
				    			(self.RakSeamLessLoginModel.IsIBUserIdAvailable == "N" 
					    			&& self.RakSeamLessLoginModel.IsMBUserIdAvailable == "Y"))
					    		&& self.RakSeamLessLoginModel.IsSingleChannel == "N") {
				    			self.RakSeamLessLoginModel.isEitherIBorMBAvl=true;
				    		}
				    		else {
				    			self.RakSeamLessLoginModel.isEitherIBorMBAvl=false;
				    		}
				    		
				    		if(!self.RakSeamLessLoginModel.detailsPage && self.RakSeamLessLoginModel.isEitherIBorMBAvl){
					    		if(self.RakSeamLessLoginModel.IsIBUserIdAvailable == "Y"){
					    			self.RakSeamLessLoginModel.selectedUserIdToSend = self.RakSeamLessLoginModel.ExistingIBId;
					    		}
					    		else if(!self.RakSeamLessLoginModel.detailsPage && self.RakSeamLessLoginModel.IsMBUserIdAvailable == "Y"){
					    			self.RakSeamLessLoginModel.selectedUserIdToSend = self.RakSeamLessLoginModel.ExistingMBId;
					    		}
				    		}

				    	};
				    	self.detectIfNeitherIBorMBAvl=function(){
				    		if((self.RakSeamLessLoginModel.IsSingleChannel == "I" && self.RakSeamLessLoginModel.IsIBUserIdAvailable == "N")
				    		|| (self.RakSeamLessLoginModel.IsSingleChannel == "M" && self.RakSeamLessLoginModel.IsMBUserIdAvailable == "N")
				    		|| (self.RakSeamLessLoginModel.IsSingleChannel == "N" && self.RakSeamLessLoginModel.IsMBUserIdAvailable == "N" && self.RakSeamLessLoginModel.IsIBUserIdAvailable == "N")) {
				    			self.RakSeamLessLoginModel.isNeitherIBorMBAvl=true;
				    		}
				    		else {
				    			self.RakSeamLessLoginModel.isNeitherIBorMBAvl=false;
				    		}
				    	};
				    	self.detectExistingOrNewPwdWhenNeitherIBMBAvl=function(){
				    		if(self.RakSeamLessLoginModel.IsSingleChannel == "M" && self.RakSeamLessLoginModel.IsMBUserIdAvailable == "N"){
				    			self.RakSeamLessLoginModel.isNewPwdForNeitherIBMBAvl=true;
				    		}
				    		else {
				    			self.RakSeamLessLoginModel.isNewPwdForNeitherIBMBAvl=false;
				    		}
				    	};
				    	self.detectWhetherIBandMBSameAndAvl=function(){
				    		if(self.RakSeamLessLoginModel.IsUserIdSame == "Y" && self.RakSeamLessLoginModel.IsSingleChannel == "N") {
				    			self.RakSeamLessLoginModel.isIBandMBSameAndAvl=true;
				    			self.RakSeamLessLoginModel.selectedUserIdToSend = self.RakSeamLessLoginModel.ExistingIBId;
				    		}
				    		else {
				    			self.RakSeamLessLoginModel.isIBandMBSameAndAvl=false;
				    		}
				    		
				    		//Need to test
				    	//			self.RakSeamLessLoginModel.selectedUserIdToSend = self.RakSeamLessLoginModel.ExistingIBId;
				    		
				    	};
				    	self.detectWhetherSingleChannelAvl=function(){
				    		if((self.RakSeamLessLoginModel.IsSingleChannel == "I" || self.RakSeamLessLoginModel.IsSingleChannel == "M")
				    			&& !self.RakSeamLessLoginModel.isNeitherIBorMBAvl) {
				    			self.RakSeamLessLoginModel.isSingleChannelAvl=true;
				    		}
				    		else {
				    			self.RakSeamLessLoginModel.isSingleChannelAvl=false;
				    		}				    		
				    		
				    		if(!self.RakSeamLessLoginModel.detailsPage && self.RakSeamLessLoginModel.isSingleChannelAvl){
					    		if(self.RakSeamLessLoginModel.IsSingleChannel == "I"){
					    			self.RakSeamLessLoginModel.selectedUserIdToSend = self.RakSeamLessLoginModel.ExistingIBId;
					    		}
					    		else if(!self.RakSeamLessLoginModel.detailsPage && self.RakSeamLessLoginModel.IsSingleChannel == "M"){
					    			self.RakSeamLessLoginModel.selectedUserIdToSend = self.RakSeamLessLoginModel.ExistingMBId;
					    		}
				    		}
				    	};
				    	
				    	self.initSeamLessSuccess= function(responseList) {
				    		
				    		rootScope.isUserLoggedIn=false;
				    			if (responseList[0].successMsg) {
					    			self.RakSeamLessLoginModel.responseText = responseList[0].successMsg;
					    		}
					    	
				    	};
				    	self.ifExistingOrNewPwdValRqd1=function(){
				    		if(rootScope.rakRegister.RegistrationModel.requestType!='FPON')
				    			self.RakSeamLessLoginModel.isExistingOrNewPwdValRqd=true;
				    		else
				    			self.RakSeamLessLoginModel.isExistingOrNewPwdValRqd=false;
				    	};
				    	self.ifExistingOrNewPwdValRqd2=function(){
				    		if(rootScope.rakRegister.RegistrationModel.requestType!='FPON' && self.RakSeamLessLoginModel.IsSingleChannel == 'I')
				    			self.RakSeamLessLoginModel.isExistingOrNewPwdValRqd=true;
				    		else
				    			self.RakSeamLessLoginModel.isExistingOrNewPwdValRqd=false;
				    	};
				    	self.ifExistingOrNewPwdValRqd3=function(){
				    		if(rootScope.rakRegister.RegistrationModel.requestType!='FPON' && !self.RakSeamLessLoginModel.isNewPwdForNeitherIBMBAvl)
				    			self.RakSeamLessLoginModel.isExistingOrNewPwdValRqd=true;
				    		else
				    			self.RakSeamLessLoginModel.isExistingOrNewPwdValRqd=false;
				    	};
				    	self.detectPreLoginOrPostLogin=function(){
							if(self.RakSeamLessLoginModel.isPreLoginFlow == true) {
								self.RakSeamLessLoginModel.preOrPostLoginClick = "onRakSeamLessLoginSubmitNonAuthClick";
							}
							else {
								self.RakSeamLessLoginModel.preOrPostLoginClick = "onRakSeamLessLoginSubmitClick";
							}
						};
						self.validateUserID=function(){
							if(self.RakSeamLessLoginModel.selectedUserIdToSend != "")
								self.RakSeamLessLoginModel.detailsPage = true;
							else
								self.RakSeamLessLoginModel.detailsPage = false;
						};
						self.validateUserIdAndReenterUserId=function(){
							if(self.RakSeamLessLoginModel.selectedUserIdToSend != "" && self.RakSeamLessLoginModel.selectedUserIdToSendReEnter != "") {
								if(self.RakSeamLessLoginModel.selectedUserIdToSend == self.RakSeamLessLoginModel.selectedUserIdToSendReEnter)
									self.RakSeamLessLoginModel.detailsPage = true;
								else
									self.RakSeamLessLoginModel.detailsPage = false;
							}
							else
								self.RakSeamLessLoginModel.detailsPage = false;
						};
						
						self.initSuccess = function(responsesList){
							if(responsesList)
					    	{
							
								if(self.RakSeamLessLoginModel.isNeitherIBorMBAvl)
								{
									if(!responsesList[0].hasOwnProperty('errorMessage')){
										if (responsesList[0].hasOwnProperty('successMsg')){
											self.RakSeamLessLoginModel.successMsg = responsesList[0].successMsg;
											self.RakSeamLessLoginModel.detailsPage = true;
										}
										else
											self.RakSeamLessLoginModel.detailsPage = false;
									}
									else
									{	if(self.RakSeamLessLoginModel.detailsPage)
										{
										self.RakSeamLessLoginModel.userEnteredSignOnPwd='';
										self.RakSeamLessLoginModel.userEnteredSignOnPwdReType='';
										self.RakSeamLessLoginModel.isExistingOrNewPwd='';
										}
										else{
											self.RakSeamLessLoginModel.detailsPage = false;
											self.RakSeamLessLoginModel.selectedUserIdToSend="";
											self.RakSeamLessLoginModel.selectedUserIdToSendReEnter="";
											self.RakSeamLessLoginModel.isBack=false;
	
										}
									}
								}
					    	}
						};
						
					
						self.resetOnCondition = function(){
							
							if(!self.RakSeamLessLoginModel.isBack)
							{
								self.RakSeamLessLoginModel.selectedUserIdToSend='';
							}
							
							
						};
						

						self.resetRadioOnProceedClick = function(){
							
							self.RakSeamLessLoginModel.userEnteredSignOnPwd='';
							self.RakSeamLessLoginModel.userEnteredSignOnPwdReType='';
							self.RakSeamLessLoginModel.isExistingOrNewPwd='';
							
							
						};
						
						self.logoutLoginSuccess = function(){
							rootScope.isUserLoggedIn=true;
							scope.setEvent('onLoginClick');
							
							
						};
						
						self.seamLessSwipeControl=function(){
							jQuery(".rakSwipeLstBtn").addClass("ng-hide");
						};
						
						
						
						
						
						
					    //RAK:  - Added for Seam Less Login : END
//----------------------------------------------------------------------------------------------------------------

	
};
