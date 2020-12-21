App.viewModels.dashboard=function(rootScope,scope,$filter,Logger,CurrencyConfigProcessor,$mdDateLocale,ExtMultiBrandingService,jsonStore,MBaaS, ActionProcessor, PushNotification){

	var self=this;
	// declare variables here
	self.isInitExec = false;
	self.loginTime = "";
	self.oppAccountIndex = 0; 
	self.loanAccountIndex = 0; 
	self.depositAccountIndex = 0; 
	self.selectAcccountMax = 0;
	self.customerInfo=null;
	self.customerName=null;
	self.emptyStr="";
	self.currencyCode=null;
	self.statmentDate=null;
	self.fromDateDay = "";
	self.fromDateMonth = "";
	self.fromDateYear = "";
	self.toDateDay = "";
	self.toDateMonth = "";
	self.toDateYear = "";
	self.isCCSearch=false;
	self.isViewDetails=false;
	self.ccIndex=0;
	self.ccIndexStr='';
	self.selectedAccount=null;
	self.cardDetails=null;
	self.currAccountDetails=null;
	self.ccTxnHistory=null;
	self.userType=null;
	self.currSuccessResponse=null;
	self.prevSuccessResponse=null;
	self.chequeInstrumentId='0';
	self.unreadMailCount='';
	//self.displayDateOption = true;
	
	self.relationShipDetails = null;
	self.relationUsertype = '';
	self.relationUserID = '';

	var deviceHeight=window.innerHeight;
	var boxHeight=280;
	self.actualHeight= (deviceHeight/2) - (boxHeight/2);
	var headerHeight=60;
	self.loginHeight= deviceHeight - headerHeight;
	self.menuOptionList = null;
	
	/**
	 * Get list of Menu ids to which user has access
	 * 
	 * @constructor
	 */
	self.getMenuOptionDetails = function(responseList){
		rootScope.rakEDirham.eDirhamSettings.isRegistered=responseList.edRegistration;
		rootScope.rakEDirham.eDirhamSettings.isAcctBlocked=responseList.edBlock;
		self.menuOptionList = responseList.MenuOptionList;
	};

	/*added to test Parrallel Calls */
	self.setParamsForParallelcall= function()
	{
		self.mainAccountType='OPR';
		self.accountIndex='0';
		self.accountType='SBA';
	};
	
	self.updateBalance1=function(responseList)
	{
		self.Balance1=responseList.responsesList[0].accountLedgerBalance;
		
	};
	
	self.updateNickName1= function(responseList)
	{
		self.NickName1=responseList.responsesList[0].NickName;
	};
	
	self.updateBalance2=function(responseList)
	{
		self.Balance2=responseList.responsesList[0].accountLedgerBalance;
		
	};
	
	self.updateNickName2= function(responseList)
	{
		self.NickName2=responseList.responsesList[0].NickName;
	};
	/*added to test Parrallel Calls */


	document.addEventListener('mfpjsloaded', function(){
	  console.log("MFPJS LOADED EVEBT");

	  	setTimeout(function() {
      		 console.log("MFP JS LOADED EVENT WL"+WL);
      		 WL.App.addActionReceiver("MyActionReceiverId", actionReceiver);
      		},100);
	})

	document.addEventListener("deviceready", function() {
		console.log("INSIDE DEVICE READY");

       MBaaS.addActionReceiver("MyActionReceiverId", actionReceiver);

		setTimeout(function() {
		 console.log("WL TESTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT"+WL);
		},4000);
//		if(!(MBaaS.getEnvironment() == WL.Environment.MOBILE_WEB || WL.Client.getEnvironment() == WL.Environment.DESKTOPBROWSER) && !rootScope.deviceID)
//        {
//        WL.Device.getID({onSuccess : function(o) {
//                        console.log ("getID: " + o.deviceID);
//                        rootScope.deviceID = o.deviceID;
//                        }, onFailure : function(e) {
//                        console.log ("Error getting ID: " + e);		
//                        }});		
//        }
//		MBaaS.addActionReceiver("MyActionReceiverId", actionReceiver);
	}, false);
	function actionReceiver(received) {
            console.log("Inside action reciever"+received.action);
		if (received.action === "pushJSONWriter") {
			// perform required actions, e.g., update web user interface
			self.pushNotificationReceived(received.data);
                rootScope.rakHome.getCount();
		}
		
 //RAK 2FA Start
        
        
        if(received.action=="iconChangeEZComObjectCheck"){
            
            console.log("iconChangeEZComObjectCheck"+received.data.isEzComAccAvailable);
            rootScope.rak2FARegister.EzComToken.tokenIconCheck = received.data.isEzComAccFound;
            rootScope.rak2FARegister.constants.PINLENGTH = received.data.tokenPinLength;
            
        }
        
        //Response of native processActivationString
        if(received.action=="encodedResponseAction"){
            console.log("encodedResponseAction Invoked >>>>>>>>>"+received.data);
            rootScope.rak2FARegister.EzComToken.payLoadGenerationReceivedData =received.data;
            
           if(! rootScope.rak2FARegister.EzComToken.isFromNonLoginFlow)
            {	
            	rootScope.rak2FARegister.initTxnPayLoadGeneration(received.data);
            }
        }
        
      
        if(received.action=="processPostActivationAction"){

            console.log("processPostActivationAction"+received.data);
            rootScope.rak2FARegister.EzComToken.processPostActivationActionResponse(received.data);
            
        }

        if(received.action=="setEzComAccountPinAction"){

            console.log("setEzComAccountPinAction"+received.data);
            rootScope.rak2FARegister.EzComToken.setEzComAccountPinActionResponse(received.data);
            
        }
        
       
        if(received.action=="checkEzComObjectAction"){

            console.log("checkEzComObjectAction"+received.data);
            rootScope.rak2FARegister.EzComToken.checkEzComObjectResponse(received.data);
           
        }
        
        if(received.action=="generateEzComTokenNumberAction"){

            console.log("generateEzComTokenNumberAction"+received.data);
            rootScope.rak2FARegister.EzComToken.generateEzComTokenNumberActionResponse(received.data);
            
        }
        if(received.action=="fetchTsnAction"){

            console.log("fetchTsnAction"+received.data);
            rootScope.rak2FARegister.EzComToken.fetchTsnActionResponse(received.data);
            
        }
        
        
        
     //RAK 2FA END
     // MFP 8 Changes
		if (received.action === "pushData") {
                  rootScope.pushData = received.data;
                  Logger.info("props :: " + JSON.stringify(received.data));
                  rootScope.rakHome.decrementBadgeCount();
                  // handle data if user is logged in
                  if(rootScope.pushData.userId=="__ALL__")
                        {
                        if(typeof rootScope.pushData.eventName!="undefined")
                              {
                              scope.setGlobalEvent(rootScope.pushData.eventName);
                              }
                        else
                              {
                              rootScope.rakHome.onPushMessageNavigation();
                              }
                        }
                  
                  if(rootScope.pushData && rootScope.pushData.NOTIFICATIONTYPE){
                 	 console.log("Back from Native dashboard.js extractInfoFromPushMsg ");
                      
                       rootScope.rak2FARegister.transactionApproval.notificationData = received.data;
                       rootScope.rak2FARegister.transactionApproval.approvalFlow=true;
                       rootScope.approvalFlow=true;
                        rootScope.$apply();
                        if(rootScope.isUserLoggedIn)
                {//rootScope.rak2FARegister.transactionApproval.initTransactionApprovalFlow(received.data);
                   
                     	  }
                   }
                  
                  if (rootScope.isUserLoggedIn
                              && rootScope.pushData.userId == rootScope.customerId
                              && rootScope.pushData.isClicked == "true") {
                        //rootScope.pushData.isClicked = "false";
                        if(rootScope.pushData.eventName!==undefined)
                  {
                  scope.setGlobalEvent(rootScope.pushData.eventName);
                  }
            else
                  {
                    //rootScope.notifications.getAllNotification(rootScope.customerId);
                    rootScope.rakHome.onPushMessageNavigation();
                  }
                  }
                  
                
//            if(rootScope.pushData && rootScope.pushData.NOTIFICATIONTYPE){
//                console.log("Back from Native dashboard.js extractInfoFromPushMsg ");
//                rootScope.rak2FARegister.transactionApproval.initTransactionApprovalFlow(received.data);
//            }
	    //MFP8-Push changes
            else{
                self.pushNotificationReceived(JSON.parse(received.data.payload));
            }
            }
		// to display notification popup when app is in foreground for iOS
		if (received.action === "displayNotification") {
//            console.log("Inside display notification"+ JSON.stringify(received.data));
//            rootScope.pushData = received.data;
////            Logger.info("props inside display notification:: " + JSON.stringify(received.data));
//            rootScope.pushData.message="Divakar";
//            rootScope.showConfirmBox(rootScope.pushData.message,"Proceed","Cancel",
//                                     function(){
//                                     rootScope.confirmResult = true;
//                                     self.callBackFunctionForConfirnBox();
//                                     });
//            if(!rootScope.$$phase){
//                rootScope.$apply();
//            }else{
////                Logger.debug("Skipped root scope apply as it was already in progress");
//            }
            rootScope.pushData = received.data;
            if(rootScope.isUserLoggedIn){
                WL.SimpleDialog.show("RAKBANK", JSON.stringify(rootScope.pushData.notificationText), [ {
                      text : 'Close',
                       handler : function() {}
                    },
                      {
                        text : 'Notifications',
                        handler : function() {
                        if(rootScope.isUserLoggedIn){
                          setTimeout(function(){
                         // rootScope.notifications.getAllNotification(rootScope.customerId);
                          rootScope.rakHome.onPushMessageNavigation();
                         },1);
                      }
                    }
                  }

                ]);
            }
            else{

                WL.SimpleDialog.show("RAKBANK", JSON.stringify(rootScope.pushData.notificationText), [ {
                                                                                                    text : 'Close',
                                                                                                    handler : function() {}
                                                                                                    }

                                                                                                    ]);
            }
        }
		// to open URL for iOS
		if (received.action === "openURL"){
            window.open(received.data, '_system', 'height=570,width=520,scrollbars=yes,status=yes');
        }
		// to make a call for iOS
        if (received.action === "makeCall"){
            window.location.href="tel://"+received.data;
        }
        if(received.action==="extractInfoFromPushMsg"){
        	if(MBaaS.isIPhoneEnv()){
        	console.log("Back from Native dashboard.js extractInfoFromPushMsg 268");
            rootScope.rak2FARegister.transactionApproval.notificationData = received.data;
                rootScope.pushData = received.data;
            rootScope.rak2FARegister.transactionApproval.approvalFlow=true;
            rootScope.approvalFlow=true;
             rootScope.$apply();
        	}
        	//rootScope.rak2FARegister.transactionApproval.initTransactionApprovalFlow(received.data);
        }
        
        if(received.action==="navigateToEnterPin"){
        	console.log("Back from Native dashboard.js navigateToEnterPin ");
        	rootScope.rak2FARegister.transactionApproval.navigateToPinPage(received.data);
        }
        
        if(received.action==="navigateToTxnDet"){
        	console.log("Back from Native dashboard.js extractInfoFromPushMsg ");
        	rootScope.rak2FARegister.transactionApproval.navigateToTxnDetails(received.data);
        }
        
        if(received.action==="navigateToTxnApprovalSuccess"){
        	console.log("Back from Native dashboard.js navigateToTxnApprovalSuccess ");
        	rootScope.rak2FARegister.transactionApproval.navigateToApprovalSuccess(received.data);
        }

	};
	self.callBackFunctionForConfirnBox = function(){
        if(rootScope.confirmResult){
        	// handle data if user is logged in
                  if(rootScope.pushData.userId=="__ALL__")
                        {
                        if(typeof rootScope.pushData.eventName!="undefined")
                              {
                              scope.setGlobalEvent(rootScope.pushData.eventName);
                              }
                        else
                              {
                                  scope.setGlobalEvent("openNotificationInbox");
                              }
                        }
                  if (rootScope.isUserLoggedIn
                              && rootScope.pushData.userId == rootScope.customerId
                              && rootScope.pushData.isClicked == "true") {
                        //rootScope.pushData.isClicked = "false";
                        if(rootScope.pushData.eventName!==undefined)
                  {
                  scope.setGlobalEvent(rootScope.pushData.eventName);
                  }
            else
                  {
                    scope.setGlobalEvent("openNotificationInbox");
                }
                  }
        }
    };
	self.pushNotificationReceived = function(datas) {
		// alert("pushNotificationReceived");
		
		Logger.info("props :: " + JSON.stringify(datas));
		
		// WL.Logger.info("payload :: " + JSON.stringify(payload));
		// var jsonStore=new App.viewModels.jsonStore();
        self.initUnreadNotificationsCount();
        
		jsonStore.addNotification(datas);
        rootScope.unreadCount = rootScope.unreadCount+1;
        if(!rootScope.$$phase){
            rootScope.$apply();
        }else{
            Logger.debug("Skipped root scope apply as it was already in progress");
        }
        localStorage.UnreadNotifications = rootScope.unreadCount;
        Logger.info("unread notifications count" +localStorage.UnreadNotifications);
	};
    // Fetches the count of unread push notifications
    self.initUnreadNotificationsCount = function(){
        if(typeof localStorage.UnreadNotifications != 'undefined'){
            rootScope.unreadCount = Number(localStorage.UnreadNotifications);
        }
        else{
            rootScope.unreadCount = 0;
        }
        if(!rootScope.$$phase){
            rootScope.$apply();
        }else{
            Logger.debug("Skipped root scope apply as it was already in progress");
        }
        
    };
    self.resetNotificationsCount = function(){
        rootScope.unreadCount=0;
        localStorage.UnreadNotifications=0;
        if(!rootScope.$$phase){
            rootScope.$apply();
        }else{
            Logger.debug("Skipped root scope apply as it was already in progress");
        }
    };

	// handle if user is not logged in
	self.pushEvent = function() {
		if (rootScope.pushData && rootScope.pushData.isClicked == "true") {
			if (rootScope.isUserLoggedIn
					&& rootScope.pushData.userId === rootScope.customerId) {



					scope.setGlobalEvent(rootScope.pushData.eventName);
				
			}
		}
	};
	 self.showOverScreen=function()
    {
    	rootScope.showOverlayFlag=true;
    };
	self.getFormattingDetailsofuser=function(responseList){
		if(!rootScope.homeCurrencyCode){
			rootScope.homeCurrencyCode=responseList.UserAppPrefrences.Formatting.currency.code;
		}
		Logger.info("Home Currency:: "+rootScope.homeCurrencyCode);
	};
	self.setBrandForUser=function(responseList){
		ExtMultiBrandingService.setBrandForUser(responseList);
	};
	// Fix for 772419
	self.unFormatNumbers=function(){
		if(rootScope.fields.tmpTxnSrcMinAmt!==undefined && rootScope.fields.tmpTxnSrcMinAmt!==null && rootScope.fields.tmpTxnSrcMinAmt!==""){
			Logger.info("Unformatted field:: "+rootScope.fields.tmpTxnSrcMinAmt);
			rootScope.fields.tmpTxnSrcMinAmt = parseFloat(CurrencyConfigProcessor.unFormatAmount(rootScope.fields.tmpTxnSrcMinAmt, rootScope.fields.currAccountDetails.currency));
			
		}
		if(rootScope.fields.txnSrcMinAmt!==undefined && rootScope.fields.txnSrcMinAmt!==null && rootScope.fields.txnSrcMinAmt!==""){
			rootScope.fields.txnSrcMinAmt= parseFloat(CurrencyConfigProcessor.unFormatAmount(rootScope.fields.txnSrcMinAmt, rootScope.fields.currAccountDetails.currency));
		}
		if(rootScope.fields.txnSrcMaxAmt!==undefined && rootScope.fields.txnSrcMaxAmt!==null && rootScope.fields.txnSrcMaxAmt!==""){
			rootScope.fields.txnSrcMaxAmt= parseFloat(CurrencyConfigProcessor.unFormatAmount(rootScope.fields.txnSrcMaxAmt, rootScope.fields.currAccountDetails.currency));
		}
		
	};
	/**
	 * Filter switch profile  Account list.
	 * 
	 * @constructor
	 */
	
	self.initSwitchUserData = function(responseList){
		if( responseList.hasOwnProperty('relationshipDetails')){
			self.relationShipDetails = $filter('filter')(responseList.relationshipDetails.relationshipDetails_rec,{ is_relationship_enabled: "Y" });
			if(!self.relationShipDetails.length){
//				alert('No link account');
				scope.setEvent('onProfileClick');
			}
			else{
				$('.app-burger').hide();
			}
		}
		else{
			scope.setEvent('onProfileClick');
		}
	};
	
	/**
	 * Display the dashboard page with all the Account list.
	 * 
	 * @constructor
	 */
	self.getDashboard = function(responseList){
		Logger.debug("GetDashboard ");
		self.oppAccountIndex = 0; 
		self.loanAccountIndex = 0; 
		self.depositAccountIndex = 0; 
		self.selectAcccountMax = 0;
		self.customerInfo = responseList;
		rootScope.analytics.userProfile.customerName = responseList.customerName;
        userProfile.customerName = responseList.customerName;
        self.operativeAccountsList = responseList.operativeAccountsList;
        self.depositAccountsList = responseList.depositAccountsList;
        self.loanAccountsList = responseList.loanAccountsList;
        self.ccList = responseList.ccList;
	};
	/**
	* Set user date format and seperator
	* @constructor
	* @param date format, date format seperator
	*/
	self.setUserDateFormat=function(dateFormat, seperator){
		Logger.info("Date format:: "+dateFormat);
		Logger.info("seperator:: "+seperator);
		
		if(!rootScope.userDateFormat && dateFormat!==undefined){
			rootScope.userDateFormat=dateFormat;
		}
		
		if(!rootScope.userDateFormatSeperator && seperator!==undefined){
			rootScope.userDateFormatSeperator=seperator;
		}
		
		var displayDateFormat = rootScope.mobileAppConfig.appConfigData.displayDateFormat;
		
		if(displayDateFormat.toUpperCase() === "USERFORMAT"){
			$mdDateLocale.formatDate = function(date) {
			       var userDF = rootScope.userDateFormat;
			       var formattedDate = moment(date).format(userDF.toUpperCase());
			       return date?formattedDate:"";
			 };
		}
	};
	
	//772297 start
	/**
	* Set user date format and seperator
	* @constructor
	* @param date format, date format seperator
	*/
	self.setBusinessDate=function(dateFormat){
		
		
		if(dateFormat && dateFormat.ServerDate){
			rootScope.serverBusinessDate = dateFormat.ServerDate;
			
		}
		
	};
	//772297 end
	
	/**
	* Set user date format and seperator
	* @constructor
	* @param date format, date format seperator
	*/
	self.setLastLoginTime=function(lastLoginTime){
		Logger.info("Last Login Time:: "+lastLoginTime+"::");
		if(lastLoginTime!=undefined && lastLoginTime!==null && lastLoginTime!=''){
			var dateObj = new Date(lastLoginTime);
			if(dateObj=="Invalid Date"){
				Logger.info("Invalid Date");

				//unformat the date as per the user format in root scope
				var userDF = rootScope.userDateFormat;
				var userDFSeperator = rootScope.userDateFormatSeperator;
				Logger.debug("user date format::<<"+userDF+">>, date format seperator::<<"+userDFSeperator+">>");
				if(userDF.indexOf(userDFSeperator)!=-1){
					var splitFormat = userDF.split(userDFSeperator);
					var formatSize = splitFormat.length;
					var i=0;
					var dayFormat = "";
					var monthFormat = "";
					var yearFormat = "";
					var dayIndex, monthIndex, yearIndex;
					while(i<formatSize){
						var tempFormat = splitFormat[i];
						if(tempFormat.indexOf("Y")!=-1 || tempFormat.indexOf("y")!=-1){
							yearFormat = tempFormat;
							yearIndex = i;
						}else if(tempFormat.indexOf("D")!=-1 || tempFormat.indexOf("d")!=-1){
							dayFormat = tempFormat;
							dayIndex = i;
						}else if(tempFormat.indexOf("M")!=-1 || tempFormat.indexOf("m")!=-1){
							monthFormat = tempFormat;
							monthIndex = i;
						}
						i++;
					}
					var dateSplit = lastLoginTime.split(userDFSeperator);
					var dayString = dateSplit[dayIndex];
					var monthString = dateSplit[monthIndex];
					var yearString = dateSplit[yearIndex];
					//checking for year if its a 2 digit format
					if(yearFormat.length==2){
						var currDate = new Date();
						var currYear = currDate.getFullYear();
						var sCurrYear = currYear.toString();
						var yearInTwoDigit = parseInt(sCurrYear.substring(sCurrYear.length-2, sCurrYear.length));
						var yearPrefix = parseInt(sCurrYear.substring(0,sCurrYear.length-2));
						if((yearInTwoDigit+10)<parseInt(yearFormat)){
							yearString = (yearPrefix-1) + yearString;
						}else{
							yearString = yearPrefix + yearString;
						}
					}
					if(monthFormat.length==2){
						monthString = parseInt(monthString)-1;
					}
					Logger.debug("Year:: "+yearString+", month:: "+monthString+", day:: "+dayString);
					var hourString,minuteString,secondString="";
					if(yearString.indexOf(" ")!=-1){
						var yearArray = yearString.split(" ");
						//yearString = yearString.substring(0,yearString.indexOf(" "));
						yearString = yearArray[0];
						Logger.debug("year:: "+yearString);
						var timeString = yearArray[1];
						var timeArray = timeString.split(":");
						Logger.info("timeArray:: "+timeArray);
						if(timeArray.length==3){
							hourString = timeArray[0];
							minuteString = timeArray[1];
							secondString = timeArray[2];
						}
						if(yearArray.length>2){
							var ampm = yearArray[2];
							if(ampm!=null && (ampm=="PM" || ampm=="pm") && parseInt(hourString)<12){
								hourString = parseInt(hourString)+12;
							}
						}
					}
					var tempDateObj = new Date(yearString, monthString, dayString, hourString, minuteString, secondString);
					Logger.debug("Date:: "+tempDateObj);
					dateObj = tempDateObj;
				}
			
			}/*else{
				Logger.info("Hours:: "+dateObj.getHours());
				Logger.info("Minutes:: "+dateObj.getMinutes());
				Logger.info("Seconds:: "+dateObj.getSeconds());
				Logger.info("MilliSeconds:: "+dateObj.getMilliseconds());
			}*/
			var hours,minutes,seconds="";
			var timeSuffix = rootScope.appLiterals.APP.COMMON.TIME.AM;
			hours = dateObj.getHours();

			if(hours==12){
				timeSuffix = rootScope.appLiterals.APP.COMMON.TIME.PM;
			}
			if(hours>12){
				hours = hours-12;
				timeSuffix = rootScope.appLiterals.APP.COMMON.TIME.PM;
			}
			if(hours<10){
				hours="0"+hours;
			}
			
			if(dateObj.getMinutes()<10){
				minutes="0"+dateObj.getMinutes();
			}else{
				minutes=""+dateObj.getMinutes();
			}
			
			if(dateObj.getSeconds()<10){
				seconds="0"+dateObj.getSeconds();
			}else{
				seconds=""+dateObj.getSeconds();
			}
			
			self.loginTime=hours+":"+minutes+":"+seconds+" "+timeSuffix;
			Logger.info("loginTime:: "+self.loginTime);
			//rootScope.$apply();
			Logger.info("loginTime2:: "+self.loginTime);
		}else{
			Logger.info("Last Login time is not present");
		}
	};
	/**
	* Initialize push notification
	* @constructor
	*/
	self.initPushNotify=function(){
		console.log("==initPushNotify===");
		// Push Changes Start
		self.pushEvent();
		if(!rootScope.pushInitSuccess){
			var jsonInitPromise = rootScope.pushNotificationHandler.initPushCollection();
			jsonInitPromise.then(function(success){
				console.log("JSON Init successful..");
				rootScope.pushInitSuccess = true;
				rootScope.notifications.getAllNotification(rootScope.fields.finacleUserCorporateId);
			},function(failure){
				console.log("JSON Init failure..");
				rootScope.pushInitSuccess = false;
			});
		} else {
			rootScope.notifications.getAllNotification(rootScope.fields.finacleUserCorporateId);
		}

		//Ravi changes for updating push message pop . TOL : 893667
		var userPushPref = window.localStorage.getItem('userPushRegisterPref')
		console.log("==userPushPref=="+userPushPref);
		//Ravi changes for updating push message pop . TOL : 893667
		// Push Changes End
		if(!rootScope.isSubscribedForPush) {
			console.log("before calling registerDevice");
			if(userPushPref == null)
				PushNotification.registerDevice();
		}
		//initPush();
	};
	
	
	self.init2FAPush=function(mode){
		var pushType = rootScope.mobileAppConfig.appConfigData.SoftToken_PUSH;
		console.log("For Push Invoker 2fa Mode"+mode);
		if(mode && mode=='LOGIN'){
			initPushForLogin(pushType);
		}
		else{
			initPush(pushType);
		}
		//  RAK specific MFP  8 changes

	};
	
	
	/**
	* Set count of unread mails
	* @constructor
	* @param {int} count no of unread mail
	*/
	self.setUnreadMailCount=function(count){
		if(count!==''&& count!="0" && count!==null)
		self.unreadMailCount="("+count+")";
		else
			self.unreadMailCount="";	
		
			
	};
	/**
	* Set customer name
	* @constructor
	*/
	self.setCustomerName = function(customerName,userType) {
		self.customerName = customerName;
		if(userType!==undefined && self.userType===null)
			self.userType=userType;
	};

	/**
	 * parsing from date into date, month and year. 
	 * @constructor
	 */
	self.selectFromDate = function(){
		self.fromDateDay = self.selectedFromDate.getDate().toString();
		self.fromDateMonth = (self.selectedFromDate.getMonth() +  1).toString();
		self.fromDateYear = self.selectedFromDate.getFullYear().toString();
		//return;
	};
	/**
	 * parsing to date into date, month and year. 
	 * @constructor
	 */
	self.selectToDate = function(){
		self.toDateDay = self.selectedToDate.getDate().toString();
		self.toDateMonth = (self.selectedToDate.getMonth() +  1).toString();
		self.toDateYear = self.selectedToDate.getFullYear().toString();
		//return;
	};
	
	/**
	 * It will get the index value of the selected Credit Card. 
	 * @constructor
	 */
	self.selectedCC=function(){
		self.ccIndexStr=self.ccIndex+'';
		self.selectedOprAccount = self.ccList[self.ccIndex]; 
		self.selectAcccountMax = self.ccList.length; 
		self.selectedAccount = self.selectedOprAccount; 
		self.accountAmountLabel = rootScope.appLiterals.APP.COMMON.TEXT.AVL_BAL; 
		self.accountBlockTitle = rootScope.appLiterals.APP.COMMON.TEXT.CC; 
		self.accountDetailSource = rootScope.appLiterals.APP.COMMON.TEXT.DASHBOARD;
		self.browseAccountIndexInt = self.ccIndex;
		self.dashboardResponseList = self.ccList;
		self.currAccountDetails={mainAccountType:'CC'};
	};
	/**
	 * Capturing the response from service
	 * @constructor
	 * @param {Array} responseList- response from service received
	 */
	self.responseAcDetails=function(response){
		self.isViewDetails=false;
		// this call receives response of 2 adapters together
		if(response.responsesList.length>1){
		self.cardDetails=response.responsesList[0];
		self.currencyCode=self.cardDetails.currencyCode;
		self.statmentDate=self.cardDetails.statementDate.split(' ')[0];
		self.ccTxnHistory=response.responsesList[1].ccTxnDetailsList;
		}
		else{
			if(typeof d.ccTxnDetailsList != 'undefined'){
			self.ccTxnHistory=response.responsesList[0].ccTxnDetailsList;
		}
			self.isCCSearch=false;
		}
	};
	self.isUndefined = function (thing) {
	  return  (typeof thing === "undefined");
	   //console.log('v=',v);
	   //return v;
	};
	self.goResponseViewDetail=function(response){
		self.cardDetails=response.responsesList[0];
	};
	self.reset=function(){
		self.selectedFromDate='';
		self.selectedToDate='';	
	};
	
	self.initRetailAccountsPage=function(fromCheque){
		Logger.info(self.currSuccessResponse);
		if(!fromCheque)
			self.prevSuccessResponse = self.currSuccessResponse;
		else
			self.currSuccessResponse = self.prevSuccessResponse;
	};
	
	self.getLastTransactionNumber = function(value){
		if(value === null || value === 'null'){
			return "";
		}
		return value;
	};
	
	self.mmid={
			message:"",
		    mmidValue: "",
		    mobileNo: "",
		    accountId: "",
		  //MMID flag to know weather mmid is present for this account 
		  //and account value to share for the next mmid request
		    accountValue:"",
		    mmidFlag:"",
		    hasMMID:"",
		    accountIndex:"",
		    isBack:false,
		 //clear mmid flag data   
		  clearMMIDFlagData:function(){
			  self.mmid.accountValue="";
				 self.mmid.mmidFlag= "";
				 self.mmid.hasMMID= "";
//				 self.mmid.accountIndex="";
				 self.mmid.isBack=true;
				 self.mmid.clearData();
		  },   
		 //init retails user accounts page 
		  initRetailUserAccountsPage:function(response){
			 
			  if(response && response.hasOwnProperty('mmidFlag')){
				  self.mmid.clearMMIDFlagData();
				  self.mmid.accountValue=response.accountValue;
					 self.mmid.mmidFlag= response.mmidFlag;
					 self.mmid.hasMMID= response.mmidGenerated;
			}
			  
		  },
		  
		// clear mmid generate/view/delink data
		 clearData:function(){
			 self.mmid.message="";
			 self.mmid.mmidValue= "";
			 self.mmid.mobileNo= "";
			 self.mmid.accountId="";
		    },
		   initMMID:function(response){
			   self.mmid.clearData();
			   if(response.hasOwnProperty('mmid')){
				   if(response.hasOwnProperty('successMessage'))
				   self.mmid.message=response.successMessage;
					 self.mmid.mmidValue= response.mmid;
					 self.mmid.mobileNo= response.mobileNo;
					 self.mmid.accountId=response.accountId;
				   
				   
			   }
			   
		   } 	    
	};
	// MFP-8 Changes start
	self.dashboardInit = function(successResponse) {
		console.log("===dashboardInit===called===="+successResponse);
		if(!rootScope.isStubbedVersion){
			// Add entry in RetailUserLoginWorkflow.json
			if(!self.isInitExec){
				ActionProcessor.setEvent("fetchDashboard").then(
				function(successData) {
					self.isInitExec = true;
					console.log("===successData====", successData);
				}, function(errorData){
					self.isInitExec = true;
					console.log("===errorData====", errorData);
				});
			}
			else{
				self.dashboardInitFunc(successResponse);
			}
		}
		else{
			self.isInitExec = true; // For TouchID - Stubbed mode
			self.dashboardInitFunc(successResponse);
		}
	};

    self.dashboardInitFunc = function(successResponse)
    {
        rootScope.menuProfile.pageheadingName=rootScope.appLiterals.APP.MENUTEXT.MY_FINANCE;
        successResponse.invocationResult=successResponse.hasOwnProperty("responsesList")?successResponse.responsesList[0]:successResponse.invocationResult;

        if(!successResponse.invocationResult.hasOwnProperty("errorMessage")){
	    	rootScope.myProfile.rememberUserID.rememberUserIDChk==true? rootScope.jsonStore.addDoc(rootScope.fields.finacleUserCorporateId):rootScope.jsonStore.removeDoc(rootScope.fields.finacleUserCorporateId);
	    	rootScope.myProfile.saveCheckBoxStatus(rootScope.myProfile.rememberUserID.rememberUserIDChk);
            rootScope.oppAccountIndex = 0;
            rootScope.loanAccountIndex = 0;
            rootScope.depositAccountIndex = 0;
            rootScope.fields.selectAcccountMax = 0;
	    	rootScope.fields.masterUserID = successResponse.invocationResult.masterUserID;
            rootScope.fields.customerInfo = successResponse.invocationResult;
            self.setCustomerName(successResponse.invocationResult.customerName,successResponse.invocationResult.userType);
            rootScope.creditCard.getList(successResponse.invocationResult);
            rootScope.notifications.getAllNotification(rootScope.fields.finacleUserCorporateId);
            self.setUserDateFormat(successResponse.invocationResult.UserAppPrefrences.Formatting.date.Format,
				successResponse.invocationResult.UserAppPrefrences.Formatting.date.Separator);
            self.setBusinessDate(successResponse.invocationResult.UserAppPrefrences.Formatting.date);
            self.setLastLoginTime(successResponse.invocationResult.lastLogin);
            self.setUnreadMailCount(successResponse.invocationResult.UserAppPrefrences.Formatting.otherAppParameters.unreadMailCount);
	   		rootScope.myProfile.updateProfilePic();
	   		self.getMenuOptionDetails(successResponse.invocationResult);
	   		rootScope.menuProfile.menuItems.processInit(rootScope.menuList);
            //self.pushEvent();
	   		self.getFormattingDetailsofuser(successResponse.invocationResult);
	   		rootScope.myProfile.addPwdToKeychain();
	   		self.setBrandForUser(successResponse.invocationResult);


        }
    }

    // MFP-8 Changes END
	self.initTransactionHistory = function(successResponse) {
		if (!successResponse.responsesList[0].hasOwnProperty('errorMessage')) {
			rootScope.fields.selectedAccountDetails = successResponse;
			rootScope.fields.TxnType = "05,04";
			rootScope.fields.txnSrcMinAmt = "";
			rootScope.fields.txnSrcMaxAmt = "";
			rootScope.fields.trxnSearchByDateOption = 0;
			rootScope.fields.trxnSearchByDate1 = "";
			rootScope.fields.trxnSearchByDate2 = "";
			rootScope.fields.txnSrcToDate_day = "";
	        rootScope.fields.txnSrcToDate_month = "";
	        rootScope.fields.txnSrcToDate_year = "";
	        rootScope.fields.txnSrcFromDate_day = "";
	        rootScope.fields.txnSrcFromDate_month = "";
	        rootScope.fields.txnSrcFromDate_year = "";
			self.tmpTxnSrcMinAmt = null;
			self.tmpTxnSrcMaxAmt = null;
			self.tmpLastNTxn = "";
			//Not Required for backened
			self.dateOptions=[{"label":rootScope.appLiterals.APP.DASHBOARD.TRANSACTION_SEARCH_PAGE.BUTTON_TRANSACTION_PERIOD1,"value":1},
			                  {"label":rootScope.appLiterals.APP.DASHBOARD.TRANSACTION_SEARCH_PAGE.BUTTON_TRANSACTION_PERIOD2,"value":2},
			                  {"label":rootScope.appLiterals.APP.DASHBOARD.TRANSACTION_SEARCH_PAGE.BUTTON_TRANSACTION_PERIOD3,"value":3},
			                  {"label":rootScope.appLiterals.APP.DASHBOARD.TRANSACTION_SEARCH_PAGE.BUTTON_SPECIFIC_DATE,"value":4},
			                  {"label":rootScope.appLiterals.APP.DASHBOARD.TRANSACTION_SEARCH_PAGE.BUTTON_PICK_DATE_RANGE,"value":5}];
			//Sent to backened
			self.transactionType=[{"label":rootScope.appLiterals.APP.DASHBOARD.TRANSACTION_SEARCH_PAGE.BUTTON_CREDIT,"value":"04"},
				                  {"label":rootScope.appLiterals.APP.DASHBOARD.TRANSACTION_SEARCH_PAGE.BUTTON_DEBIT,"value":"05"},
				                  {"label":rootScope.appLiterals.APP.DASHBOARD.TRANSACTION_SEARCH_PAGE.BUTTON_BOTH,"value":"05,04"}];
			rootScope.pageErrorArr["rootScope.fields.trxnSearchByDateOption"] = null;
		}
		
	};

	self.transactionHistoryReset = function() {
		rootScope.fields.trxnSearchByDateOption = 0;
		rootScope.fields.tmpTxnSrcMinAmt = null;
		rootScope.fields.trxnSearchByDate1 = null;
		rootScope.fields.trxnSearchByDate2 = null;
		rootScope.fields.txnSrcToDate_day = "";
        rootScope.fields.txnSrcToDate_month = "";
        rootScope.fields.txnSrcToDate_year = "";
        rootScope.fields.txnSrcFromDate_day = "";
        rootScope.fields.txnSrcFromDate_month = "";
        rootScope.fields.txnSrcFromDate_year = "";
		rootScope.fields.TxnType = "05,04";
		rootScope.fields.txnSrcMinAmt = "";
		rootScope.fields.txnSrcMaxAmt = "";
		self.tmpTxnSrcMinAmt = null;
		self.tmpTxnSrcMaxAmt = null;
		self.tmpLastNTxn = "";
		rootScope.pageErrorArr["$rootScope.fields.trxnSearchByDateOption"] = null;
		rootScope.pageErrorArr["$rootScope.fields.txnSrcMinAmt"] = null;
		rootScope.pageErrorArr["$rootScope.fields.trxnSearchByDate1"]=null;
		rootScope.pageErrorArr["$rootScope.fields.trxnSearchByDate2"]=null;
	};

	self.initTransactionHistoryClearData = function() {
		rootScope.fields.entryAccountsFlag = null;
		rootScope.fields.successResponsePrev = null;
		rootScope.fields.transSearchResultData = null;
	};
	self.dateCorrection = function() {
        rootScope.fields.txnSrcToDate_month = parseInt(rootScope.fields.txnSrcToDate_month) + 1;
        rootScope.fields.txnSrcFromDate_month = parseInt(rootScope.fields.txnSrcFromDate_month) + 1;
        rootScope.fields.txnSrcToDate_month = rootScope.fields.txnSrcToDate_month.toString();
        rootScope.fields.txnSrcFromDate_month = rootScope.fields.txnSrcFromDate_month.toString();
    };

	self.transactionHistorySubmit = function() {
		self.unFormatNumbers();
		rootScope.fields.accountDetailSource = "ACC_SEARCH_CLICK";
		rootScope.fields.trxSearchFlag = true;
		rootScope.fields.txnSrcMinAmt = ""
				+ (rootScope.fields.txnSrcMinAmt == null ? ""
						: rootScope.fields.txnSrcMinAmt) + "";
		rootScope.fields.txnSrcMaxAmt = ""
				+ (rootScope.fields.txnSrcMaxAmt == null ? ""
						: rootScope.fields.txnSrcMaxAmt) + "";
		if (rootScope.fields.trxnSearchByDateOption != 0) {
			scope.transactionSearchSetup(
					rootScope.fields.trxnSearchByDateOption,
					rootScope.fields.trxnSearchByDate1,
					rootScope.fields.trxnSearchByDate2);
		}
		/*Yogesh commented 788117 
		if (rootScope.fields.trxnSearchByDateOption < 4 ) {
			rootScope.fields.trxnSearchByDate1 = "";
			rootScope.fields.trxnSearchByDate2 = "";
		}*/
		rootScope.fields.successResponsePrev = null;
		rootScope.fields.transSearchResultData = false;
		rootScope.fields.trxnSearchByDate1Prev = rootScope.fields.trxnSearchByDate1;
		rootScope.fields.trxnSearchByDate2Prev = rootScope.fields.trxnSearchByDate2;
		rootScope.fields.transSearchResultFlag = true;
		rootScope.fields.applyFilter = rootScope.fields.trxnSearchByDateOption == 0 ? "lastntxn": "daterange";

		rootScope.fields.txnSrcLatestNoOfTxns = "" + self.tmpLastNTxn;
		//788211  start
//		self.dateCorrection();
		//788211  end
		if (rootScope.fields.selectedAccount.mainAccountType == "LON") {
			scope.setEvent("onLoanTransSearchClick");
		} else if (rootScope.fields.selectedAccount.mainAccountType == "OPR") {
			scope.setEvent("onOprTransSearchClick");
		} else {
			scope.setEvent("onDepTransSearchClick");
		}
	};
	
	self.onchangeClearDateFields = function(){
//		changes for 788873 start : Pawan
		rootScope.fields.trxnSearchByDate1 = null;
		rootScope.fields.trxnSearchByDate2 = null;
//		changes for 788873 end : Pawan
		rootScope.fields.txnSrcToDate_day = "";
        rootScope.fields.txnSrcToDate_month = "";
        rootScope.fields.txnSrcToDate_year = "";
        rootScope.fields.txnSrcFromDate_day = "";
        rootScope.fields.txnSrcFromDate_month = "";
        rootScope.fields.txnSrcFromDate_year = "";
	};

	self.transactionHistoryOnLeftArrowClick = function() {
		rootScope.fields.browseAccountIndexInt = (rootScope.fields.browseAccountIndexInt == 0 ? (rootScope.fields.selectAcccountMax - 1)
				: rootScope.fields.browseAccountIndexInt - 1);
		rootScope.fields.accountDetailSource = "ACC_ITEM";
		rootScope.fields.browseAccountIndex = ""
				+ rootScope.fields.browseAccountIndexInt + "";
		//changes for loan account 785049
		rootScope.fields.selectedAccount.accountIndex = rootScope.fields.browseAccountIndex;
		rootScope.fields.currAccountDetails = rootScope.fields.dashboardResponseList[rootScope.fields.browseAccountIndexInt];
		scope.setEvent(rootScope.fields.acccountEventName);
	};

	self.transactionHistoryOnRightArrowClick = function() {
		rootScope.fields.browseAccountIndexInt = (rootScope.fields.browseAccountIndexInt == (rootScope.fields.selectAcccountMax - 1) ? 0
				: (rootScope.fields.browseAccountIndexInt + 1));
		rootScope.fields.accountDetailSource = "ACC_ITEM";
		rootScope.fields.browseAccountIndex = ""
				+ rootScope.fields.browseAccountIndexInt + "";
		//changes for loan account 785049
		rootScope.fields.selectedAccount.accountIndex = rootScope.fields.browseAccountIndex;
		rootScope.fields.currAccountDetails = rootScope.fields.dashboardResponseList[rootScope.fields.browseAccountIndexInt];
		scope.setEvent(rootScope.fields.acccountEventName);

	};
};