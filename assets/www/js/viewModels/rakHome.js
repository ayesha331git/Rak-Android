App.viewModels.rakHome=function(isStub,Logger,ActionProcessor,scope,rootScope,UIControlsService){
 
      var self=this;
      //define all your variables this scope
      self.lastLoggedIntime="";
      self.customerName="";
	   self.mailCount="";
	   self.approvalCount="";
	   self.rakPMACount='';
		self.rakPCACount='';
		self.rakPIACount='';
	   self.chatUrl="";
	   self.islamicChatUrl="";
	   self.lastLoginChannel="";
	   self.lastUnsucessfullLogin="";
	   rootScope.corploginCliked="N";
	   rootScope.buildType="";
	   rootScope.SMEWrkflow="N";
	   self.corpFlagValue=false;
	   self.cifId="";
	   self.modifyFlag="N";
	   //RAK CHANGES FOR MAIL COUNT START
	   self.fromHome=false;
	   self.typeOfCustomer='';
	   self.typeOfCustomerArr=[{"valueDesc":"Business Banking Customer","valueCode":"sme"},{"valueDesc":"Corporate Banking Customer","valueCode":"corp"}];
	   self.fromApprovalHome=false;
	   self.CorpeventClicked='N';
	   self.retaileventClicked='N';
	   rootScope.forceloginFlag='FORCELOGIN';
	   rootScope.deviceBackClick='N';
	   self.corpFlag=function(){
		   rootScope.corploginCliked="Y";
		   self.corpFlagValue=true;
	   }
	   
		
		
		//RAK CHANGES FOR EMIRATES ID START
		self.emiratesIdFlag='N';
		self.emiratesIdPopUpFlag='N';
	
		
		self.checkEmidValidation = function(responseList){
	    	if(self.emiratesIdFlag=='N'){
	    		self.emiratesIdPopUpFlag = responseList.eidFlag
	    		self.emiratesIdFlag='Y';
	    	}
	    };
		//RAK CHANGES FOR EMIRATES ID end
	   self.redirectPage=function(){
		   //alert('hi');
		   dochkApp(function (successResponse) {
               console.log("dochkApp successResponse --> ");
              
               
               },
               function (errorResponse) {
               console.log("dochkApp errorResponse --> ");
               });


},
	   
	   self.SMEbuildType=function(){
		   rootScope.buildType="SME";
	   }
	   self.CORPbuildType=function(){
		   rootScope.buildType="CORP";
	   }
	   self.RETbuildType=function(){
		   rootScope.buildType="RET";
	   }
	   self.onCustomerTypeChange=function(){
		   if(self.typeOfCustomer=='corp'){
			   self.CorpeventClicked='Y';
			   self.retaileventClicked='N';
			  
		   }
		   if(self.typeOfCustomer=='sme'){
			   self.retaileventClicked='Y';
			   self.CorpeventClicked='N';
			 
		   }
	   };
	   
	   self.logoChange=function(){
		   if(self.typeOfCustomer=='corp'){
			  
			   rootScope.headerLogo='app_logo_wrap img-responsive';
		   }
		   if(self.typeOfCustomer=='sme'){
			 
			   rootScope.headerLogo='app_logo_wrap_sme img-responsive';
		   }
	   };
	   
	   self.switchProfileBusiness =function(){
		 
			   self.retaileventClicked='Y';
			   rootScope.isRetailcheked=true;
			   rootScope.isCorpcheked=false;
			   self.CorpeventClicked='N';
			   self.typeOfCustomer='sme';
			   rootScope.headerLogo='app_logo_wrap_sme img-responsive';
			  
		  
	   };
	   
	   self.switchProfileCorp =function(){
		   self.retaileventClicked='N';
		   rootScope.isRetailcheked=false;
		   rootScope.isCorpcheked=true;
		   self.CorpeventClicked='Y';
		   self.typeOfCustomer='corp';
		 rootScope.headerLogo='app_logo_wrap img-responsive';
	  
   };
	   
	   self.ModifyTransaction=function(){
		   self.modifyFlag="Y";
	   }
      self.getBurgerMenuHeaderContent=function(responseList){
            self.customerName=responseList.customerName;
            self.lastLoggedIntime=responseList.lastLogin;
            self.lastLoginChannel=responseList.lastLoginChannel;
            self.lastUnsucessfullLogin=responseList.lastUnsucessfullLogin;
			   //Customized by  : START
			              /*
			  			   self.mailCount=responseList.mailCount;*/
			              if(responseList.mailCount != "0"){
			              	self.mailCount=responseList.mailCount;
			              }
			              else{
			              	self.mailCount="";
			              }

			              if(responseList.UserTypeIDValue=="CORPORATE" || rootScope.SMEWrkflow=='Y'){
			            		self.rakPMACount=responseList.rakPMACount;
			            		self.rakPCACount=responseList.rakPCACount;
			            		self.rakPIACount=responseList.rakPIACount;
			            		self.approvalCount=responseList.approvalCount;
			            		

			            	/*if(null!=self.rakPMACount && ""!=self.rakPMACount && null!=self.rakPIACount && ""!=self.rakPIACount){
			            		if((parseInt(self.rakPMACount) + parseInt(self.rakPIACount)).toString()!="0"){
			            			self.approvalCount=(parseInt(self.rakPMACount) + parseInt(self.rakPIACount)).toString();
			            		}
			            		else{
					              	self.approvalCount="";
					            }
			            	}*/
			              }
            //Customized by  : END
			 //RAK CHANGES FOR MAIL COUNT START
			   self.fromHome=true;
			   self.fromApprovalHome=true;
			 }

      self.isPremiumUser="";
      self.noAccountsLinked="";
      self.cssPath="finacle-css";
      self.checkForPremiumUser=function(responseList){
    	  self.isPremiumUser=responseList.isPremium;
    	  self.noAccountsLinked=responseList.noActiveAccountLinked;
    	  if ((self.isPremiumUser == "Y"  ||self.isPremiumUser == "B") && self.userTypeIDValue=="SME"){
    		  self.cssPath = "finacle-css-elite";
    	  }
    	  if (self.isPremiumUser == "B" && self.userTypeIDValue=="SME"){
    		  rootScope.headerLogo='app_logo_wrap_sme_elite img-responsive';
    		  
    	  }
    	  /*else{
    		  self.rootscope.cssPath = "css/finacle-css.css";
    	  }*/
      }

            //Added for Footer menu highlighting

      self.footerClearTab=function()
   	{
      	self.chatIcon=false;
   		self.sendMoneyIcon=false;
   		self.footerPayBillIcon=false;
   		self.footerPayCardIcon=false;
   		self.footerContactUsIcon=false;

   	}

      rootScope.userTypeValue="";
      self.userTypeIDValue="";
      self.nicknameEnable=true;
      self.chkUserType="";
     // self.disclaimerURL='https://rakbankonline.ae/Digital/MobileBanking/';
      self.disclaimerURL='https://conv.rakbankonline.ae/corp4corporate/MobileBanking/';
        self.menuProfileID='';
      self.checkUserType=function(responseList){
    	  self.disclaimerURL=responseList.disclaimerURL;
    	  self.menuProfileID=responseList.menuProfileID;
    	  if(self.menuProfileID =='SUSRW'){
    		  rootScope.SMEWrkflow="Y";
    	  }
    	  else{
    		  rootScope.SMEWrkflow="N";  
    	  }
    	  rootScope.customerType=responseList.customerType;
	 if(responseList.UserTypeValue){
    		  self.chkUserType=responseList.UserTypeValue;
    	  }
    	  rootScope.userTypeValue=responseList.UserTypeValue;
    	  if(responseList.UserTypeIDValue){
    		  self.userTypeIDValue=responseList.UserTypeIDValue;
    	  }
    	  if(self.userTypeIDValue=="CORPORATE"){
    		  localStorage.setItem("PageType", "Corp");
    		  self.loginCorpcliked=true;
    	  }
	      if(self.userTypeIDValue=="SME"){
    		  rootScope.headerLogo='app_logo_wrap_sme img-responsive';
    	  }
    	  if(self.userTypeIDValue=="RET" || self.userTypeIDValue=="SME" ){
    		  localStorage.setItem("PageType", "Ret");
    		  self.loginCorpcliked=false;
    	  }
    	  rootScope.customerId=responseList.customerId;
    	  if(rootScope.userTypeValue=="2")
    		  {	self.nicknameEnable=false;
    		
    		  }

      };
      self.setCifId=function(responseList){
    	  self.cifId=responseList.cifId;
    	  rootScope.customerId=responseList.cifId;
    	  rootScope.rak2FARegister.EzComToken.tsn ="";
    	  
    	  if (responseList.hasOwnProperty('tokenPinLength') && responseList.tokenPinLength){
    		
    		  rootScope.rak2FARegister.constants.PRPMPINLENGTH = responseList.tokenPinLength;
    		  console.log(" PINLENGTH "+rootScope.rak2FARegister.constants.PINLENGTH);
              
          }
    	  
    		if(responseList.hasOwnProperty("fromDate")){
    			rootScope.rakPendingApproval.prpmFromDate=responseList.fromDate;
    			rootScope.rakPendingApproval.prpmToDate=responseList.toDate;
    			rootScope.rakELMSApproval.prpmFromDate=responseList.fromDate;
    			rootScope.rakELMSApproval.prpmToDate=responseList.toDate;
    		}
    	  
    	  fetchTsnFromEzComObject(function (successResponse) {
                                  //console.log("fetchTsnFromEzComObject successResponse --> "+successResponse);
                                  
                                  self.result = successResponse.result;
                                  
                                  //console.log("fetchTsnFromEzComObject"+self.result);
                                  rootScope.rak2FARegister.EzComToken.fetchTsnActionResponse(self.result);
                                  
                                  },
                                  function (errorResponse) {
                                  //console.log("fetchTsnFromEzComObject errorResponse --> "+errorResponse);
              },rootScope.rak2FARegister.constants.buildType);
    	//  WL.App.sendActionToNative("fetchTsnFromEzComObject");
      };

      rootScope.isUnsubscribeRequested=false;
      self.doSubscribeNotification=function(){
    	  var modifiedCIF=rootScope.customerId;
    		if(modifiedCIF && modifiedCIF.indexOf('.')){
    			modifiedCIF=modifiedCIF.replace('.','');
    		}
    	  storeDetails(function (successResponse) {
   		  } , function (errorResponse) {
   			  },modifiedCIF+"#Y");

    	 // MFP 8 Changes. Comment and Add different line
             	 // doSubscribe();
             	 registerDevice();
    	  scope.setGlobalEvent('onLogoutClickCancel');

      }

      self.pushReject=function(){
    	  var modifiedCIF=rootScope.customerId;
  		if(modifiedCIF && modifiedCIF.indexOf('.')){
  			modifiedCIF=modifiedCIF.replace('.','');
  		}
    	  storeDetails(function (successResponse) {
   		  } , function (errorResponse) {
   			  },modifiedCIF+"#N");

    	  // MFP 8 changes
             	 // doSubscribe();
    	  rootScope.isUnsubscribeRequested=true;
    	  scope.setGlobalEvent('onLogoutClickCancel');
      }



      self.clearBurgerMenuHeaderContent=function(){
            self.lastLoggedIntime="";
            self.customerName="";
            self.lastLoginChannel="";
            self.lastUnsucessfullLogin="";
            self.cssPath="finacle-css";
            //self.chatUrlLinkConstant="https://revamp.rakbank.ae/WebAPI802/SimpleSamples802/Chat/ChatFrameSet.jsp?email=&fullName=undefined";
           self.chatUrlLinkConstant="https://revamp.rakbank.ae/WebAPI802/SimpleSamples802/ChatRevamp/ChatFrameSet.jsp?email=&fullName=undefined";
      }


      self.openSubMenu=function(elem){
            if (!jQuery(elem.target).parent().hasClass('menuActive')){
            	 // : Added to close earlier opened menu : START
          	  	 jQuery('[id="navSubMenu"]').slideUp();
                 jQuery(elem.target).parent().removeClass('menuActive');
                 // : Added to close earlier opened menu : END
                  jQuery('#navSubMenu').slideUp();
                  jQuery('.burgercontainer ul.nav-justified li').removeClass('menuActive');
                  var elem1 = jQuery(elem.target);
                  elem1.parent().addClass('menuActive');
                  elem1.siblings('ul').slideDown();
            }
            else
            {
            	  jQuery('[id="navSubMenu"]').slideUp();
                  jQuery(elem.target).parent().removeClass('menuActive');

            }
      }
      
  	self.expandMenu=function(elem){        
        var listElem = jQuery(elem.target).parent();
        if(listElem.hasClass('rakExpand')){
            listElem.removeClass('rakExpand');
            listElem.addClass('rakCollapse');
            listElem.children('ul').slideUp();
        }
        else{
        	jQuery('.rakExpand #navSubMenu').slideUp();
        	jQuery('.rakExpand').removeClass('rakExpand').addClass('rakCollapse');
        	listElem.removeClass('rakCollapse');
            listElem.children('ul').slideDown();
            listElem.addClass('rakExpand');
            //jQuery('#navSubMenu').slideDown();
        }
	};
      self.closeMenu=function(){
    	  self.footerClearTab();
    	  if(rootScope.rakServiceReq.RakDiscApply.isFirstTimeFlag==false){
    			rootScope.rakServiceReq.rakServicesModel.expandFlag='';
    	  }
    	  jQuery('.rak-inboxlink').removeClass('rakBurgerFix');
    	  jQuery('.rak-appr-link').removeClass('rakinfoiconFix');
          jQuery('.desktop-moblie-block').removeClass('open');
          jQuery('body').removeClass('move');
          jQuery('.navbar-fixed-top').removeAttr('style');

          jQuery('#rakOverlayForBurger').removeClass('rakBurgerTransition');
          jQuery('#rakOverlayForBurger').toggleClass('rakHideElement');
          jQuery('.rakHTCBlocker').remove();
          jQuery('.rakHTCBlocker1').remove();
          jQuery(".swiper-slide:visible").removeClass('htcLoginFix');
      }


      /* for pulldonw menu */


      self.handlePullDown=function(elem){
            var pullDwnELem = jQuery(elem.target);
            jQuery('.rakPullDownMenu').slideUp();
            if(pullDwnELem.hasClass("pullOpen")){
                  pullDwnELem.removeClass("pullOpen");
            }else {
                  jQuery(".rakPullDown").removeClass("pullOpen");
                  pullDwnELem.addClass("pullOpen");
            pullDwnELem.closest('[class*="croll"]').addClass('rakPullTransform');
            jQuery('.rak-scroll').addClass('rakPullTransform');
            pullDwnELem.parent().prepend('<div class="rakPullDownBlocker"/>');
           
            jQuery(".icons-block").prepend('<div class="rakPullDownBottomBlocker"/>');
            jQuery(".navbar-fixed-top").prepend('<div class="rakPullDownTopBlocker"/>');
			 jQuery(".homeCorner").addClass('homeCornerHiding');
			  jQuery(".rak-back-img").addClass('homeCornerHiding');
			


            pullDwnELem.siblings('ul').slideDown();
            if(WL.Client.getEnvironment() == WL.Environment.IPHONE){
            	 pullDwnELem.siblings('ul').wrap('<div class="pullMenuWrap"/>');
            }
            jQuery('.col-sm-11,.rakPullDownBlocker,.rakPullDownTopBlocker,.rakPullDownBottomBlocker,.rakBackBtnBlocker').bind('click', function() {
                                                                                                           jQuery('.rakPullDownMenu').hide();
                                                                                                           if(WL.Client.getEnvironment() == WL.Environment.IPHONE){
                                                                                                        	   jQuery('.pullMenuWrap ul').unwrap();
																											   jQuery('.pullMenuWrap').remove();
                                                                                                           }
                                                                                                           jQuery('.rak-scroll').removeClass('rakPullTransform');
                                                                                                           jQuery('.rakPullTransform').removeClass('rakPullTransform');
                                                                                                           jQuery('.rakPullDownBlocker').remove();
                                                                                                           jQuery('.rakPullDownBottomBlocker').remove();
                                                                                                           jQuery('.rakPullDownTopBlocker').remove();
                                                                                                          
																										    jQuery(".homeCorner").removeClass('homeCornerHiding');
																											jQuery(".rak-back-img").removeClass('homeCornerHiding');
      				pullDwnELem.removeClass("pullOpen");
      				jQuery('.col-sm-11').unbind('click');
      			});
      			elem.preventDefault();
      			elem.stopImmediatePropagation();
      			return false;
            }

      }

	   self.openServiceSubMenu=function(elem){
    	  var elem1 = jQuery(elem.target);
    	  jQuery('.rakServiceReqList ul.rak-accordianUL li').removeClass('rak-accordianListdown');
          if (elem1.parent().hasClass('rak-accordianList')){
                jQuery('#srId').slideUp();
                elem1.parent().removeClass('rak-accordianList');
                elem1.parent().addClass('rak-accordianListdown');
                elem1.siblings('li').slideDown();
          }
          else
          {
                jQuery('#srId').slideUp();
                jQuery(elem.target).parent().addClass('rak-accordianList');
          }
    }


	   self.preLoginChatUrl=function(){
			var path = self.chatUrlLinkConstant;
			var cmd="window.location.href='"+path+"';";
			function reloadChat(){
				win.removeEventListener("loadstop",reloadChat);
				ActionProcessor.resetTimer("update");
				win.executeScript({code:cmd});
			}
			
			
			function closeChat(){
				ActionProcessor.resetTimer("reset");
			}
			if(path==''){
				alert("Not allowed for webchat");
			} else{
				var win=window.open('./PreChatLogin.html','_new','location=no,hardwareback=no');
				console.log("CHAT CAME HERE 111 before opening");
				win.addEventListener("loadstop",reloadChat);
				win.addEventListener("exit",closeChat);
				console.log("CHAT CAME HERE 112 before opening");
			}
		}

//RAK Customization Changes
	   self.productUrl=function(){

		 window.open("https://rakbank.ae/wps/portal/business-banking",'_system','location=no,hardwareback=no');

	   }
	   
	   self.rakvalueUrl=function(){
		   	 
		   // CORP3
			// window.open("https://revamp.rakbank.ae/wps/portal/business-banking/accounts/other-services/rakvaluesme",'_new','location=no,hardwareback=no');
			 
			 // PROD
			 window.open("https://rakbank.ae/wps/portal/business-banking/accounts/other-services/rakvaluesme",'_system','location=no,hardwareback=no');
			 
		   }

	   self.contactUs=function(){
             // UAT
			 window.open("https://revamp.rakbank.ae/wps/portal/header/contact-us",'_system','location=no,hardwareback=no');

             // PRODUCTION
			 //window.open("https://rakbank.ae/wps/portal/header/contact-us?WT.svl=7&WT.ac=ContactUs",'_new','location=no,hardwareback=no');


		   }
//added for SMEOUK CR
	   
	   self.smeouk=function(){

			 window.open("https://rakbank.ae/wps/portal/business-banking/smesouk",'_system','location=no,hardwareback=no');

		   }
	   
	   //Quick Apply
	   self.quickApply=function(){

				//uat
			 window.open("https://quickapplyuat.rakbank.ae/business/accounts",'_system','location=no,hardwareback=no');
			 
			 //production
			 //window.open("https://quickapply.rakbank.ae/business",'_system','location=no,hardwareback=no');

		   }
	   
	self.openWebChat=function(urlNormal,urlIslamic){
		var path = urlNormal;
		if(window.location.href.indexOf("RAKRetailUserIslamicDashboardPage")!=-1){
			path = urlIslamic;
		}
		var cmd="window.location.href='"+path+"';";
		console.log(path);
		if(path==''){
			alert("Not allowed for webchat");
		} else{
			//window.open(path,"chatWindow");
			var win=window.open('./PreChatLogin.html','_new','location=no,hardwareback=no');
			win.addEventListener("loadstop",reloadChat);
		}

		function reloadChat(){
			win.removeEventListener("loadstop",reloadChat);
			win.executeScript({code:cmd});
		}
	}
	self.urlCreation=function(response)
    {
		/*ActionProcessor.setEvent(eventName).then(function(url) {
					//console.log("Update url");
					//console.log(JSON.stringify(url));
					var response=url;
					self.chatUrl=response.responsesList[0].url;
					self.islamicChatUrl=response.responsesList[0].islamicUrl;
					scope.$apply();
				},function(errorUrl){
					self.chatUrl='';
				});*/
				self.chatUrl=response.url;
		self.islamicChatUrl=response.islamicUrl;
		}


	self.otpModel={

			MODESCONSTANT:{
				SMS:"SMS",
				EMAIL:"EMAIL",
				TOKEN:"TOKEN"
			},

			otpModeSelected:'SMS',
			otpModesList:[],
			benfModesList:[],
			populateModeArray:function(response){
				self.otpModel.otpModesList=response.otpModeArray;
				self.otpModel.benfModesList=response.benfModeArray;
			},

			getKeyUp:function(otpModel,otpModelValue){

			}
	};
	
	self.benfToken=function(){
        
        
		
		var modeSelected = rootScope.rakHome.otpModel.otpModeSelected;

		var msg=rootScope.rakHome.otpModel.otpModeSelected==rootScope.rakHome.otpModel.MODESCONSTANT.SMS ? rootScope.appLiterals.APP.RAK_COMMON.OTP_MSG :rootScope.appLiterals.APP.RAK_COMMON.OTP_EMAIL_MSG;

		if(modeSelected==rootScope.rakHome.otpModel.MODESCONSTANT.TOKEN){
			//rakHome.AuthPageData.authType ='3';
            rootScope.resetPageError();
            scope.setEvent('BenfTokenCheckStatus');
             self.AuthPageData.firstAuthModeValue='';
        }
        else if(modeSelected==rootScope.rakHome.otpModel.MODESCONSTANT.SMS){ 
            rootScope.resetPageError();
             self.regenerateOtp('onGenerateOtp');
           
        }
        
       



	}

    self.regenerateOtp=function(eventName){
        
        var msg=rootScope.rakHome.otpModel.otpModeSelected==rootScope.rakHome.otpModel.MODESCONSTANT.SMS ? rootScope.appLiterals.APP.RAK_COMMON.OTP_MSG :rootScope.appLiterals.APP.RAK_COMMON.OTP_EMAIL_MSG;
        
        ActionProcessor.setEvent(eventName).then(function(payload) {
                                                 
                                               //  console.log(JSON.stringify(payload));
                                                 var response=payload;
                                                 if(!response.responsesList[0].hasOwnProperty("errorMessage")){
                                                 rootScope.showErrorPopup(msg);
                                                  self.otpModel.otpModeSelected='';
                                                 self.AuthPageData.firstAuthModeValue='';
                                                 }
                                                 
                                                 },function(errorPayload){
                                                // self.common.availBal='';
                                                 });
        
        
        
    }

	self.wcmContentMapping=function(response){

		self.OPR_MSG=response.OPR_MSG;
		self.CCD_MSG=response.CCD_MSG;
		self.LON_MSG=response.LON_MSG;
		self.DEP_MSG=response.DEP_MSG;
		self.GLD_MSG=response.GLD_MSG;
		self.INV_MSG=response.INV_MSG;

	}

	// RAK Demo tour code starts here. Based on flag set in Login response this View is shown.

	self.startDemoTour=function(response){
		if(response.UserTypeIDValue=="CORPORATE"){
			if((response.invokeDemoTour && response.invokeDemoTour=='I' )|| response.invokeDemoTour=='' ){
				scope.setGlobalEvent('startDemoTourCorp');
			}
		}
		else if(response.UserTypeIDValue=="SME" && 
				((response.invokeDemoTour &&  response.invokeDemoTour === 'Y') ||
				  response.invokeDemoTour === '' )){
			scope.setGlobalEvent('startDemoTourSME');
		} else if(response.UserTypeIDValue=="RET"){
			if((response.invokeDemoTour && response.invokeDemoTour=='Y' )|| response.invokeDemoTour==''){
				scope.setGlobalEvent('startDemoTour');
			}
		}
		
	};

	self.checkMsgvalidity=function(){

		if(jQuery('.rakNotificationListView').is(':visible')){
			return true;
		}

		return false;
	};

	self.onPushMessageNavigation=function(response){
		rootScope.notifications.getAllNotification(rootScope.customerId);
		scope.setGlobalEvent('openNotificationInbox');
	};

		self.onBackClick=function(){
			
			if(jQuery('.TopBenificiary').length && jQuery('.TopBenificiary').is(':visible')){
				jQuery('.TopBenificiary1').click();
				rootScope.deviceBackClick='Y';
				return;
			}
		if(jQuery('.rak-back-header').length && jQuery('.rak-back-header').is(':visible') && rootScope.deviceBackClick=='N'){
			jQuery('.rak-back-img').click();
		}
		else if(jQuery("button:contains('Back')").is(':visible')){
			jQuery("button:contains('Back')").click();
		}
		else if(jQuery("button:contains('isLoginPageBack')").is(':hidden')){
			isBackClicked(function(response){
			 	console.log("is back clicked success");
			},function(error){
				console.log("is back clicked failure");
			},{});

//			if(location && location.hash.indexOf('RetailUserLoginPage')!=-1){
//				navigator.app.exitApp();
//			}
		}

		else{
			console.log('back disabled');
		}
		rootScope.deviceBackClick='N';
	};


		self.pushPopUpClick=function(){

			UIControlsService.pushAlertFunction(rootScope.appLiterals.APP.ERROR_MESSAGE.PUSH_NOTIFY,rootScope.appLiterals.APP.ERROR_MESSAGE.PUSH_NOT_REG, "YES", "NO");



	};



	   self.getIconImage=function(marker,type_id,selectedLocationId,currentLoopId){

		    /*	if(!(selectedLocationId == currentLoopId)){
		    		self.locateUs.image = 'images/gray.png';
		    	}
		    	else{*/
		    		if(marker == 'A'){
		    			self.locateUs.image = "images/green.png";
		    		}
		    		else if(marker == 'B'){
		    			self.locateUs.image = 'images/red.png';
		    		}
		    		if((marker == 'A'||marker == 'B') && type_id=='EDM'){
		    			self.locateUs.image = 'images/grey.png';
		    		}
		    /*	}*/
		    	return self.locateUs.image;

			};


		self.checkForBadgesPermission=function(){
			checkBadge(function(response){
				console.log("The app has permission");
			},function(error){
				console.log("The app has permission error block"+error);
			},{});
		};


		self.resetBadgeCount=function(){
			clearBadge(function(response){
			 	console.log("Clear badge Success");
			},function(error){
				console.log("Clear badge failure");
			},{});
		}


		self.decrementBadgeCount=function(){
			getBadge(function(response){
				console.log("decrement badge count before");
				var count=response;
				if(count==0){

				}
				else{
					count--;
				}


				console.log("decrement badge count"+count);
				setBadge(function(response){
					console.log("Inside set count for decrement");
				},function(error){

				},count)
			},function(error){
				console.log("Error"+response);
			},{});
		}

		self.getCount=function(){
			getBadge(function(response){
				var count=response;
				count++;

				console.log("get badge count");
				setBadge(function(response){
					console.log("Inside set count");
				},function(error){

				},count)
			},function(error){
				console.log("Error"+response);
			},{});


		};

	self.isIphone=function(){
             // CHANGES FOR RAK MFP 8
            rootScope.isIphone = false;
            document.addEventListener('deviceReady', function(){
             return (device  && device.platform === 'iOS' ?  true : false);
             //rootScope.$apply();
           });

            // CHANGES FOR RAK MFP 8
	};

	self.navigateToLogin=function(){
		rootScope.setSingleStepRealmAuthFailure();
		setTimeout(function(){
			scope.setEvent('onBackClick');
		},500);
	}	;

    self.softToken = function(regezToken){

        var deviceId = rootScope.deviceID;
        console.log("DEVICEID --> "+deviceId);

        var appId = WL.Client.getAppProperty(WL.AppProperty.APP_DISPLAY_NAME);
	       console.log("APPID --> "+appId);
        data = JSON.parse(regezToken);
        data.deviceId = deviceId;
        data.appId = appId;
        console.log(" soft token start");

        WL.App.sendActionToNative("processActivationString",data);

        console.log(" soft token END");
    };

    	//For Custom Component for Authentication modes : TXNPWD OTP 2FA Start
	self.constants={
			TRANSACTIONPASSWORD:'Transaction Password',
			TRANSACTIOPASSWORDSMSOTP:'Transaction PasswordSMS OTP',
			SMSOTP:'SMS OTP',
			SOFTTOKEN:'SOFT TOKEN',
			OFFLINEOTP:'OFFLINE OTP',
			HARDTOKEN:'HardToken'
		};

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
			HardToken:5,
			isTransactionPwd:false,
			isSmsOtp:false,
			isFirstAuthMode:false,
			isSecAuthMode:false,
			approvalLookUpClick:'',

			firstAuthMode:"",
			secAuthMode:"",
			firstAuthModeValue:"",
            firstAuthModeValuePIN:"",
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
				self.AuthPageData.approvalLookUpClick="";
			},
			
			resetConfirmPageDataAfterNavigation :function(){
				if(self.AuthPageData.approvalLookUpClick!='Y')
				{	self.AuthPageData.firstAuthModeValue="";
					self.AuthPageData.approvalLookUpClick='';
					rootScope.rakPayee.payCard.authField='';
					rootScope.rakFundTfr.remitSummary.transactionPassword='';
					rootScope.rakSendMoney.txnHistory.authField='';
					
					
				}
				else
				{	self.AuthPageData.approvalLookUpClick='';
				
				}
			},
			
			
			corp2FAauthMode: function(response){
			  if (!response.hasOwnProperty('errorMessage')) {
				self.mode=response.auth;
				if(self.mode){
				switch(self.mode){
				case self.constants.SOFTTOKEN:
				 self.AuthPageData.authType=self.AuthPageData.SoftToken;
				 self.AuthPageData.isFirstAuthMode=true;
				 self.AuthPageData.authStatus = true;
				 break;
				 
				case self.constants.OFFLINEOTP:
					 self.AuthPageData.authType=self.AuthPageData.OfflineOtp;
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
			  }
			},
			
			
			initConfirmationPageData : function(responseList){
				if (!responseList[0].hasOwnProperty('errorMessage') && !responseList[0].hasOwnProperty('otpMessage') && rootScope.rakCorpInit.corpModel.backFlag!='Y') {
					/*if (responseList[0].auth == "")
						self.AuthPageData.authStatus = false;
					else {
						self.AuthPageData.authStatus = true;
						self.AuthPageData.authMode = responseList[0].auth;
					}*/
					for(var index=0;index < responseList.length;index++){
				if (!responseList[index].hasOwnProperty('errorMessage')) {
						if(responseList[index].auth == self.constants.TRANSACTIONPASSWORD
								||responseList[index].auth == self.constants.TRANSACTIOPASSWORDSMSOTP
								||responseList[index].auth == self.constants.SMSOTP
								||responseList[index].auth == self.constants.SOFTTOKEN
								||responseList[index].auth == self.constants.OFFLINEOTP
								||responseList[index].auth == self.constants.HARDTOKEN){
							self.AuthPageData.authStatus = true;
							switch(responseList[index].auth){
							 case self.constants.TRANSACTIONPASSWORD :
								 self.AuthPageData.authType=self.AuthPageData.TransactionPassword;
								 self.AuthPageData.isFirstAuthMode=true;
								 break;
							 case self.constants.TRANSACTIOPASSWORDSMSOTP:
								 self.AuthPageData.authType=self.authMode.TransactionPassword;
								 self.AuthPageData.secAuthType=self.AuthPageData.OTP;
								 self.AuthPageData.isFirstAuthMode=true;
								 self.AuthPageData.isSecAuthMode=true;
								 break;
							 case self.constants.SMSOTP:
								 self.AuthPageData.authType=self.AuthPageData.OTP;
								 self.AuthPageData.isFirstAuthMode=true;
								 break;
							 case self.constants.SOFTTOKEN:
								 self.AuthPageData.authType=self.AuthPageData.SoftToken;
								 self.AuthPageData.isFirstAuthMode=true;
								 break;
							 case self.constants.OFFLINEOTP:
								 self.AuthPageData.authType=self.AuthPageData.OfflineOtp;
								 self.AuthPageData.isFirstAuthMode=true;
								 break;
							 case self.constants.HARDTOKEN:
								 self.AuthPageData.authType=self.AuthPageData.HardToken;
								 self.AuthPageData.isFirstAuthMode=true;
								 break;
							 default:
								 self.AuthPageData.authType=self.AuthPageData.None;
							     self.AuthPageData.secAuthType=self.AuthPageData.None;
								 break;
							 }
						}
						else{
							self.AuthPageData.authStatus = false;
							 self.AuthPageData.isFirstAuthMode=false;
						}
					}
				}
			}
		},

			fetchOtp :function(event){
				self.AuthPageData.eventSelected=event;
				if(self.AuthPageData.authType == self.AuthPageData.SoftToken && self.AuthPageData.isFirstAuthMode && self.AuthPageData.firstAuthModeValue){
					rootScope.rak2FARegister.EzComToken.generateEzComTokenNumber(self.AuthPageData.firstAuthModeValue);
					//self.AuthPageData.firstAuthModeValue = rootScope.rak2FARegister.EzComToken.generatedToken;
					// WL.App.sendActionToNative("fetchTsnFromEzComObject");
					// var data={};
				    // data.tsn = rootScope.rak2FARegister.EzComToken.tsn;
					// WL.App.sendActionToNative("fetchEzComObjectFromTsn",data);
				}
				else{
					scope.setEvent(self.AuthPageData.eventSelected);
				}
			},
            
            fetchRejectBenf :function(event){
                self.AuthPageData.eventSelected=event;
                if(self.AuthPageData.authType == self.AuthPageData.SoftToken && self.AuthPageData.isFirstAuthMode && self.AuthPageData.firstAuthModeValue && rootScope.rakPayee.rakSelfConfirmationPayeeListFetch.model.remarks && rootScope.rakPayee.rakSelfConfirmationPayeeListFetch.model.action==rootScope.rakPayee.constants.REJECT){
                    
                	rootScope.rak2FARegister.EzComToken.generateEzComTokenNumber(self.AuthPageData.firstAuthModeValue);
                  
                } else  if(self.AuthPageData.authType == self.AuthPageData.SoftToken && self.AuthPageData.isFirstAuthMode && self.AuthPageData.firstAuthModeValue && rootScope.rakPayee.rakSelfConfirmationPayeeListFetch.model.action==rootScope.rakPayee.constants.SUBMIT){
                    
                	rootScope.rak2FARegister.EzComToken.generateEzComTokenNumber(self.AuthPageData.firstAuthModeValue);
                  
                }
                else{
                    scope.setEvent(self.AuthPageData.eventSelected);
                }
            },
		
		CorpfetchOtp :function(event){
			self.AuthPageData.eventSelected=event;
			if(self.AuthPageData.authType == self.AuthPageData.SoftToken && self.AuthPageData.isFirstAuthMode && self.AuthPageData.firstAuthModeValue){
				rootScope.rak2FARegister.EzComToken.generateEzComTokenNumber(self.AuthPageData.firstAuthModeValue);
				//self.AuthPageData.firstAuthModeValue = rootScope.rak2FARegister.EzComToken.generatedToken;
				// WL.App.sendActionToNative("fetchTsnFromEzComObject");
				// var data={};
			    // data.tsn = rootScope.rak2FARegister.EzComToken.tsn;
				// WL.App.sendActionToNative("fetchEzComObjectFromTsn",data);
			}
			else{
					scope.setEvent(self.AuthPageData.eventSelected);
				}
		},
			
			 setCorpTsn:function(responseList){
				 rootScope.rak2FARegister.constants.buildType="CORP";
				 fetchTsnFromEzComObject(function (successResponse) {
                     console.log("fetchTsnFromEzComObject successResponse --> ");
                     
                     self.result = successResponse.result;
                     
                     console.log("fetchTsnFromEzComObject"+self.result);
                     rootScope.rak2FARegister.EzComToken.fetchCorpTsnActionResponse(self.result);
                     
                     },
                     function (errorResponse) {
                     console.log("fetchTsnFromEzComObject errorResponse --> ");
                     },rootScope.rak2FARegister.constants.buildType);
		    	
		    	 // WL.App.sendActionToNative("fetchTsnFromEzComObject");
		      }

		
		};		//For Custom Component for Authentication modes : TXNPWD OTP 2FA End


self.forceLogout=function(){
	  rootScope.reloadFunction();
},	
     self.handleLoginPage=function(){

		 if(rootScope.isReloadReqd){
            rootScope.reloadFunction();
		 }
		 else if(!rootScope.stepupAuthentication.isCompleted || rootScope.stepupAuthentication.isCompleted==false){
			 rootScope.reloadFunction();
		 }
		 else{
			 scope.setGlobalEvent("onLoginClick");
		 }

	 };
	 
	 
	 self.getDeviceID=function(){
		 var envionment = WL.Client.getEnvironment();
		 if(!(envionment == WL.Environment.MOBILE_WEB || envionment == WL.Environment.DESKTOPBROWSER) && !rootScope.deviceID)
	     {
	     rootScope.deviceID = device.uuid;
//	     WL.Device.getID({onSuccess : function(o) {
//	                     console.log ("getID: " + o.deviceID);
//	                     rootScope.deviceID = o.deviceID;
//	                     }, onFailure : function(e) {
//	                     console.log ("Error getting ID: " + e);
//	                     }});
	     }

	 };
	 
	  self.checkIsIPad= function(){
        
	        if(window.device && window.device.model && window.device.model.toString().indexOf("iPad")==0)
	        {
	            $(".col-sm-11").addClass("ipad");
	            $(".icons-block").addClass("ipad");
          
            
	         }
  	  };
	 
	 self.getLoginLoadEvent= function()
	 {
		 if((rootScope.isEdhirhamAuth!='true' && !rootScope.rakEDirham.eDirhamDetails.fromWelcomePage) ||(rootScope.isEdhirhamAuth!='false' && !rootScope.rakEDirham.eDirhamDetails.fromWelcomePage))
		{
			 scope.setEvent(rootScope.home.getLoginEventForAppModeOnLoginLoad(rootScope.isStubbedVersion),true);
		}
	 }
	 
	 
	 

};
