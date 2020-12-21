AppController.factory('UIControlsService', ['$rootScope', '$compile','$location','$timeout','$parse','CurrencyConfigProcessor', 'Logger','$mdDialog','PhoneFormatConfigProcessor',
                               function($rootScope, $compile,$location,$timeout,$parse,CurrencyConfigProcessor,Logger,$mdDialog,PhoneFormatConfigProcessor) {
	var dialogBoxOpenFlag = false;
    return {
    	/**
	  	 * The method initializes variables
	  	 * @constructor
	  	 */
        init: function() {

            // create UI variables          
            if(_.isUndefined($rootScope.showMenu)){
                $rootScope.showMenu = false;
            }
        }, 
		/*		
         * This method will show all the dialog box		
         * @param {string} titleText- title to be displayed on confirm box 		
         * @param {string} messageText- messageText to be displayed on confirm box 		
         * @param {string} okText - 'ok' button text		
         * @param {string} cancelText - 'cancel' button text		
         * @param {function} okClickEvent - function to be called when user click on click button		
         * @param {function} cancelClickEvent - function to be called when user click on cancel button 		
         */		
        showDialogBox : function(titleText,messageText,okText,cancelText,okClickEvent,cancelClickEvent){		
        	if(dialogBoxOpenFlag === false){
        		dialogBoxOpenFlag = true;
        		$mdDialog.show({		
            		clickOutsideToClose: false,		
            		templateUrl : 'navigation/common/resources/FinacleDialogBoxPage.html',	
    				focusOnOpen : false,
            		locals : {		
            			dialogBoxMessage : {  		
            				title : titleText,		
            				message : messageText,		
            				ok : okText || 'Ok',		
            				cancel : cancelText		
            			}		
            		},		
            		controller : function($scope,dialogBoxMessage){        					
            			$scope.dialogBoxMessage = dialogBoxMessage;		
            			$scope.okButtonClick = function(){
            				dialogBoxOpenFlag = false;
            				$mdDialog.hide();		
            				okClickEvent && okClickEvent();        							
            			};		
            			$scope.cancelButtonClick = function(){		
            				dialogBoxOpenFlag = false;
            				$mdDialog.hide();		
            				cancelClickEvent && cancelClickEvent();        						
            			};		
            		}        			
            	});          		
        	}            		
        },
        
        showHelpPage : function(titleText,helpPageURL,okText,okClickEvent){		
        	if(dialogBoxOpenFlag === false){
        		if(helpPageURL){
        			var urlPresent=true;
        		}
        		dialogBoxOpenFlag = true;
        		$mdDialog.show({		
            		clickOutsideToClose: false,		
            		templateUrl : 'navigation/common/resources/FinacleHelpPage.html',	
    				focusOnOpen : false,
            		locals : {		
            			dialogBoxMessage : {  		
            				title : titleText,		
            				url : helpPageURL,
            				isURL : urlPresent,
            				ok : okText || 'Ok'	,
            				message : $rootScope.appLiterals.APP.CREDIT_CARD.HELP.NO_HELP,
            				language : $rootScope.selectedLocale.locale
            			}		
            		},		
            		controller : function($scope,dialogBoxMessage){        					
            			$scope.dialogBoxMessage = dialogBoxMessage;		
            			$scope.okButtonClick = function(){
            				dialogBoxOpenFlag = false;
            				$mdDialog.hide();		
            				okClickEvent && okClickEvent();        							
            			};		
            		}        			
            	});          		
        	}            		
        },
        /**
	  	 * The method shows confirm box.
	  	 * @constructor
	  	 * @param {string} title- title to be displayed on confirm box
	  	 * @param {string} message- message to be displayed on confirm box
		 * @param {string} okText - 'ok' button text
		 * @param {string} cancelText - 'cancel' button text
	  	 */
        showConfirmationScreen: function(title, message, okText, cancelText) {
            $rootScope.confirmationObj = {
            	title: title,
                message: message,
                okText: _.isUndefined(cancelText) ? "OK" : okText,
                cancelText: _.isUndefined(cancelText) ? null : cancelText
            }; 
            $location.path("navigation/common/resources/FinacleConfirmationPage");
            //$("body").append('<div confirmation-screen id="confirmation-screen"></div>');
            //$compile(document.body)($rootScope);
        },
      //added for eDirham customization
        showAlertScreen: function(title, message, okText, cancelText) {
            $rootScope.confirmationObj = {
            	title: title,
                message: message,
                okText: _.isUndefined(cancelText) ? "OK" : okText,
                cancelText: _.isUndefined(cancelText) ? null : cancelText
            }; 
            $location.path("navigation/common/resources/FinacleDialogBoxPage");
            //$("body").append('<div confirmation-screen id="confirmation-screen"></div>');
            //$compile(document.body)($rootScope);
        },
        //added for rak customization
        showAlertFunction: function(title, message, okText, cancelText) {
            $rootScope.confirmationObj = {
            	title: title,
                message: message,
                okText: _.isUndefined(cancelText) ? "OK" : okText,
                cancelText: _.isUndefined(cancelText) ? null : cancelText
            }; 
            $location.path("navigation/common/resources/RakFinacleConfirmationPage");
            $rootScope.sessionTimeValue = true;
            if(!rootScope.$$phase){
                console.log("Safe root scope apply");
                $rootScope.$apply();
               
            }
            //$("body").append('<div confirmation-screen id="confirmation-screen"></div>');
            //$compile(document.body)($rootScope);
        },
        //Added for Push Alert
        
        pushAlertFunction: function(title, message, okText, cancelText) {
            $rootScope.confirmationObj = {
            	title: title,
                message: message,
                okText: _.isUndefined(cancelText) ? "YES" : okText,
                cancelText: _.isUndefined(cancelText) ?"NO" : cancelText
            }; 
            $location.path("navigation/common/resources/RakFinacleNotificationConfirmationPage");
            if(!rootScope.$$phase){
                console.log("Safe root scope apply");
                $rootScope.$apply();
               
            }
            
           
            //$("body").append('<div confirmation-screen id="confirmation-screen"></div>');
            //$compile(document.body)($rootScope);
        },
        /**
	  	 * This utility shows validation alerts.
	  	 * @constructor
	  	 * @param {string} message- message to be displayed on confirm box
		 * @param {string} okText - 'ok' button text
	  	 */
        showValidationAlert: function(message, okText) {
        	var index=message.trim().lastIndexOf('.');
        	if(index>-1){
        		message=message.replace(/.\s*$/, "");
        	}
        	message=message.replace(/\{/g, '').replace(/\}/g,'');
        	message=message.replace(/\]/g, '').replace(/\[/g,'');
            $rootScope.alertOverlayObj = {
                message: message,
                okText: _.isUndefined(okText) ? $rootScope.$eval('appLiterals.APP.COMMON.BUTTON.OK') : okText,
                isCancel: true
            }; 
            $rootScope.showValidationAlertFlag = true;
            // $("body").append('<div alert-overlay-screen id="alert-overlay-screen"></div>');
            // $compile(document.body)($rootScope);
        },
        
        
        /**
	  	 * This utility display Toast.
	  	 * 
	  	 */
        
        displayToast: function(message) {
        	$rootScope.alertOverlayObj = {
               message: message,
               
            }; 
            $rootScope.showToast = true;
            $timeout(function() {
            	$rootScope.showToast = false;
              }, 2000);
        },
        /**
	  	 * This utility hides validation alert.
	  	 * @constructor
	  	 */
        hideValidationAlert: function() {
          $rootScope.showValidationAlertFlag = false;
        },
        /**
	  	 * This utility hides confirm box.
	  	 * @constructor
	  	 */
        hideConfirmBox: function() {
            $rootScope.showConfirmBoxFlag = false;
            $rootScope.alertOverlayObj.callback();
          },
          /**
  		 * It will show alert pop overlay.
  		 * @constructor
  		 * @param {string} msg- Error messege to be displayed
  		 * @param {string} okText- 'Ok' button code
  		 */
        showAlertOverlayScreen: function(message, okText) {
            // $("body").append('<confirmation-screen id="confirmation-screen" message="Hello world"></confirmation-screen>');
        	
        	var index=message.trim().lastIndexOf('.');
        	if(index>-1){
        		message=message.replace(/\\s*$/, "");
        	}
        	message=message.replace(/\{/g, '').replace(/\}/g,'');
        	message=message.replace(/\]/g, '').replace(/\[/g,'');
//FS Ticket 781395 and 782708
        	if($rootScope.checkLoginPageNetworkDown){
        		 $rootScope.alertOverlayObj = {
        	                message: message,
        	                okText: _.isUndefined(okText) ? "OK" : okText,
        	                noSetEvent:true,
        	                isCancel:true
        	            }; 
        	}
        	else{
        		 $rootScope.alertOverlayObj = {
        	                message: message,
        	                okText: _.isUndefined(okText) ? "OK" : okText,
        	                isCancel:true
        	            }; 
        	}
           
            $rootScope.showAlertFlag = true;
            // $("body").append('<div alert-overlay-screen id="alert-overlay-screen"></div>');
            // $compile(document.body)($rootScope);
        },
        
        showApplicationSwitchScreen: function(message, okText) {
            // $("body").append('<confirmation-screen id="confirmation-screen" message="Hello world"></confirmation-screen>');
        	
        	var index=message.trim().lastIndexOf('.');
        	if(index>-1){
        		message=message.replace(/\\s*$/, "");
        	}
        	message=message.replace(/\{/g, '').replace(/\}/g,'');
        	message=message.replace(/\]/g, '').replace(/\[/g,'');
//FS Ticket 781395 and 782708
        	
        	if($rootScope.checkLoginPageNetworkDown){
       		 $rootScope.alertOverlayObj = {
       	                message: message,
       	                okText: _.isUndefined(okText) ? "OK" : okText,
       	                noSetEvent:true,
       	                isCancel:true
       	            }; 
       	}
       	else{
       		 $rootScope.alertOverlayObj = {
       	                message: message,
       	                okText: _.isUndefined(okText) ? "OK" : okText,
       	                isCancel:true
       	            }; 
       	}
           
            $rootScope.checkAppSwitch = true;
            // $("body").append('<div alert-overlay-screen id="alert-overlay-screen"></div>');
            // $compile(document.body)($rootScope);
        },

		/**
		 * It will show alert
		 * @constructor
		 * @param {string} msg- messege to be displayed on alert box
		 * @param {string} okText- 'Ok' button code
		 */
        showSuccessOverlayScreen: function(message, okText) {
            // $("body").append('<confirmation-screen id="confirmation-screen" message="Hello world"></confirmation-screen>');
        	var index=message.trim().lastIndexOf('.');
        	if(index>-1){
        		message=message.replace(/.\s*$/, "");
        	}
        	message=message.replace(/\{/g, '').replace(/\}/g,'');
        	message=message.replace(/\]/g, '').replace(/\[/g,'');
        			$rootScope.alertOverlayObj = {
                message: message,
                okText: _.isUndefined(okText) ? "OK" : okText,
                isCancel:false
            }; 
            $rootScope.showAlertFlag = true;
        },
        /**
		 * It will show confirm box with callback function support
		 * @constructor
		 * @param {string} message- message to be displayed on confirm box
		 * @param {string} okText - 'ok' button text
		 * @param {string} cancelText - 'cancel' button text
		 * @param {function} callback - callback function on click of 'ok' button
		 * @param {boolean} noSuccessIcon - boolean to handle the icon to be displayed.
		 */
        showConfirmOverlay: function(message, okText,cancelText,callback, noSuccessIcon) {
        	var index=message.trim().lastIndexOf('.');
        	if(index>-1){
        		message=message.replace(/.\s*$/, "");
        	}
        	message=message.replace(/\{/g, '').replace(/\}/g,'');
        	message=message.replace(/\]/g, '').replace(/\[/g,'');
        			$rootScope.alertOverlayObj = {
                message: message,
                okText: _.isUndefined(okText) ? "OK" : okText,
                cancelText: cancelText,
                callback:callback,
                noSuccessIcon:noSuccessIcon
            }; 
            $rootScope.showConfirmBoxFlag = true;
        },
        /**
		 * It will show Campaign overlay.
		 * @constructor
		 * @param {string} message- Campaign overlay to be displayed
		 * @param {string} okText - 'ok' button text
		 */
        showCampaignOverlayScreen: function(message, okText) {
            // $("body").append('<confirmation-screen id="confirmation-screen" message="Hello world"></confirmation-screen>');
        	var index=message.trim().lastIndexOf('.');
        	if(index>-1){
        		message=message.replace(/.\s*$/, "");
        	}
        	message=message.replace(/\{/g, '').replace(/\}/g,'');
        	message=message.replace(/\]/g, '').replace(/\[/g,'');
        			$rootScope.alertOverlayObj = {
                message: message,
                okText: _.isUndefined(okText) ? "OK" : okText,
                isCancel:false
            }; 
            $rootScope.showCampaignOverlayFlag = true;
        },
        /**
		 * It will hide Campaign overlay.
		 * @constructor
		 */
        hideCampaignOverlayScreen: function() {
            $rootScope.showCampaignOverlayFlag = false; 
        },
        /**
		 * It will show alert on same page overlay.
		 * @constructor
		 * @param {string} message- Message overlay to be displayed
		 * @param {string} okText - 'ok' button text
		 */
        showAlertReturnSamePageOverlayScreen: function(message, okText) {
        	var index=message.trim().lastIndexOf('.');
        	if(index>-1){
        		message=message.replace(/.\s*$/, "");
        	}
        	message=message.replace(/\{/g, '').replace(/\}/g,'');
        	message=message.replace(/\]/g, '').replace(/\[/g,'');
        			$rootScope.alertOverlayObj = {
                message: message,
                okText: _.isUndefined(okText) ? "OK" : okText,
                isCancel:false
            }; 
            $rootScope.showAlertReturnSamePageFlag = true;
        },
        /**
		 * It will alert shown on same page overlay.
		 * @constructor
		 */
        hideAlertReturnSamePageOverlayScreen: function() {
            $rootScope.showAlertReturnSamePageFlag = false; 
        },
        /**
		 * It will hide alert overlay.
		 * @constructor
		 */
        hideAlertOverlayScreen: function() {
//FS Ticket 781395 and 782708        	
        	if($rootScope.checkLoginPageNetworkDown){
        		 $rootScope.showAlertFlag = false;
        		 //Commented Below Line to Avoid reload of App; To make OFFLINE 2FA Token Generation Without Network 
        		//WL.Client.reloadApp();
        	}
        	else{
        		 $rootScope.showAlertFlag = false; 
        	}
           
        },
        /**
		 * It will return visibility of burger menu.
		 * @constructor
		 */
        isToggleMenuVisible: function(){
            return $rootScope.showMenu;
        },
        /**
		 * It will hide the burger menu.
		 * @constructor
		 */
        toggleHideMenu: function(){
            $rootScope.showMenu = true;
            this.toggleShowMenu();
        },
        /**
		 * this utility toggles the burger menu.
		 * @constructor
		 */
        toggleShowMenu:  function() {
            if(_.isUndefined($rootScope.showMenu)){
                $rootScope.showMenu = false;
            } 
			
            $rootScope.showMenu = !$rootScope.showMenu;  
            var dir = $("html").attr("dir");
    		if(dir == "rtl") {
            	
            	if ($rootScope.showMenu) {
            		$rootScope.addClassNameForMenuChange = "";
	            } else {
	            	$rootScope.addClassNameForMenuChange = "openMenuNav";
	            }
            	
	            
            }
            else {            	

	            if ($rootScope.showMenu) {
	            	$rootScope.addClassNameForMenuChange = "openMenuNav";
	            } else {
	            	$rootScope.addClassNameForMenuChange = "";
	            }
            }

        },
        /**
		 * this utility navigates to a path.
		 * @constructor
		 */
        gotoPage :function(path) {
            $rootScope.showMenu = true;
            toggleShowMenu();    
            $location.path(path);  
        },
        /**MY PROFILE SLIDER START**/
        /**
		 * It will return visibility of Profile burger menu.
		 * @constructor
		 */
        isToggleProfileMenuVisible: function(){
            return $rootScope.showProfileMenu;
        },
        /**
		 * It will hide the Profile burger menu.
		 * @constructor
		 */
        toggleHideProfileMenu: function(){
            $rootScope.showProfileMenu = true;
            this.toggleShowProfileMenu();
        },
        /**
		 * this utility toggles the Profile burger menu.
		 * @constructor
		 */
        toggleShowProfileMenu:  function() {
            if(_.isUndefined($rootScope.showProfileMenu)){
                $rootScope.showProfileMenu = false;
            } 
            $rootScope.showProfileMenu = !$rootScope.showProfileMenu;  
            if ($rootScope.showProfileMenu) {
                $("#profileMenuContent").css("margin-right", "28em");
                $(".finacle-container").css({"position": "fixed", "width": "100%"});
                $(".absolute").css({"position": "absolute", "width": "100%"});
            } else {
                $("#profileMenuContent").css("margin-right", "0");
                $(".finacle-container").css({"position": "relative", "width": "100%"});
    			$(".absolute").css({"position": "fixed", "width": "100%"});
            }
        },
        
        /**
		 * this utility navigates to a path.
		 * @constructor
		 */
        gotoProfilePage :function(path) {
            $rootScope.showProfileMenu = true;
            toggleShowProfileMenu();    
            $location.path(path);  
        },
        /**MY PROFILE SLIDER END**/
        
        /**
    	 * This is a utility function to split tye money into Main money and the fractions
    	 * @constructor
    	 * @param {float/string} money- money to be parsed
    	 */
        parseMoney: function(money, currency) {
            var processedMoney = {};

            if (_.isUndefined(money) || money==="") {
                return {"rs": "0", "ps": "00", "seperator":".", "curr":" "};
            }
            
            processedMoney.curr = currency;
            
            var formattedAmount = CurrencyConfigProcessor.formatAmount(money, currency, true);
            var crnConfig = CurrencyConfigProcessor.getCurrencyConfig(currency);
            
            var arr = formattedAmount.split(crnConfig.DECIMAL_SEP);
            if(parseFloat(money)<0){
            	processedMoney.rs = crnConfig.negPre + arr[0];
            }else{
            	processedMoney.rs = arr[0];
            }
            
            if (arr.length == 1) {
            	if(parseFloat(money)<0){
                	processedMoney.ps = ""+crnConfig.negSuf;
                }else{
                	processedMoney.ps = "";
                }
                processedMoney.seperator="";
                return processedMoney;
            }
            
            processedMoney.seperator = crnConfig.DECIMAL_SEP;
            if(parseFloat(money)<0){
            	processedMoney.ps = arr[1]+crnConfig.negSuf;
            }else{
            	processedMoney.ps = arr[1];
            }
                                            
            /*var arr = money.split(".");
            processedMoney.rs = arr[0];

            if (arr.length == 1) {
              processedMoney.ps = "00";
              return processedMoney;
            }
                                            
            processedMoney.ps = arr[1].split(" ")[0];
            processedMoney.ps += processedMoney.ps.length === 0 ? "00" : processedMoney.ps.length === 1 ? "0" : "";*/
            //Logger.debug("PROCESSED MONEY:: "+processedMoney);
            return processedMoney;
        },
        /**
    	 * Utility method that returns an array of options which can be used by fin-input
    	 * @constructor
    	 * @param {Array} dataArr- Actual list for dropdown  
    	 * @param {Array} keyStr- 
    	 * @param {Array} valueStr-  
    	 * @param {string} beginStrArr-  
    	 * @param {string} endStrArr- 
    	 */
        createDropDownOptionArray: function(dataArr, keyStrArr, valueStr, beginStrArr, endStrArr) {
          var result = [];
          if(dataArr !== null){
    	  	var preStr = "";
    	  	var preIndex=-1;
	        if (beginStrArr && beginStrArr !== null) {
		        for (var k = 0; k < beginStrArr.length; k++) {
		        	preStr += beginStrArr[k];
		        }
	        }	
 
             var postStr = "";
             var postIndex=-1;
             if (endStrArr && endStrArr !== null) {
               for (var n = 0; n < endStrArr.length; n++) {
            	      postStr += endStrArr[n];
               	}
             }
        	  for (var i = 0; i < dataArr.length; i++) {
          
	            var keyStr = "";
	            for (var j = 0; j < keyStrArr.length; j++) {
	              if (_.isUndefined(dataArr[i][keyStrArr[j]])) {
	                keyStr += (keyStrArr[j].length === 0 ? " " : keyStrArr[j]);
	              } else {
	                keyStr += dataArr[i][keyStrArr[j]];
	              }
	            }
	            result[i] = { "label": preStr + keyStr + postStr, "value": dataArr[i][valueStr]};
	          }
          }

          return result;
        },
		/**
    	 * Utility method that returns an array of Account options which can be used by fin-input
    	 * @constructor
    	 * @param {Array} dataArr- Actual list for dropdown  
    	 * @param {Array} keyStr- 
    	 * @param {Array} valueStr-  
    	 * @param {string} beginStrArr-  
    	 * @param {string} endStrArr- 
    	 */
        createDropDownOptionAccountArray: function(dataArr, keyStrArr, valueStr, beginStrArr, endStrArr) {
        	//Logger.info("dataArr:: "+dataArr);
          var result = [];
          if(dataArr !== null){
        	  for (var i = 0; i < dataArr.length; i++) {
        		  var displayString = dataArr[i][keyStrArr[keyStrArr.length-1]];
        		  result[i] = { "label": displayString, "value": dataArr[i][valueStr]};
        	  }
        	  
        	
    	  	/*var preStr = "";
    	  	var preIndex=-1;
	        if (beginStrArr && beginStrArr !== null) {
		        for (var k = 0; k < beginStrArr.length; k++) {
		        	preStr += beginStrArr[k];
		        }
	        }	
 
             var postStr = "";
             var postIndex=-1;
             if (endStrArr && endStrArr !== null) {
               for (var n = 0; n < endStrArr.length; n++) {
            	      postStr += endStrArr[n];
               	}
             }
        	  for (var i = 0; i < dataArr.length; i++) {
          
	            var keyStr = "";
	            for (var j = 0; j < keyStrArr.length; j++) {
	              if (_.isUndefined(dataArr[i][keyStrArr[j]])) {
	                keyStr += (keyStrArr[j].length === 0 ? " " : keyStrArr[j]);
	              } else {
	                keyStr += dataArr[i][keyStrArr[j]];
	              }
	            }
	            result[i] = { "label": preStr + keyStr + postStr, "value": dataArr[i][valueStr]};
	          }*/
          }

          return result;
        },
        /**
    	 * This is a transaction search utility
    	 * @constructor
    	 * @param {object} option- option 
    	 * @param {date} date1- from date 
    	 * @param {date} date2- to date
    	 */
        transactionSearchSetup: function(byDateOption, date1, date2) {
        	 $rootScope.fields.txnSrcToDate_day = "";
             $rootScope.fields.txnSrcToDate_month = "";
             $rootScope.fields.txnSrcToDate_year = "";
             $rootScope.fields.txnSrcFromDate_day = "";
             $rootScope.fields.txnSrcFromDate_month = "";
             $rootScope.fields.txnSrcFromDate_year = "";
             
             byDateOption = parseInt(byDateOption);
             
            if (_.isUndefined(byDateOption) || isNaN(byDateOption) || byDateOption === 0 || byDateOption===null) {
            	//default to "null"
            	$rootScope.fields.trxnSearchByDate1 = "";
                	$rootScope.fields.trxnSearchByDate2 = "";
                return;
            }

            if (byDateOption < 4) {
                var totalDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                
                //772297 start
                //var currdate = new Date();
                var currdate = $rootScope.formatServerDate($rootScope.serverBusinessDate);
                //772297 end

                var date = currdate.getDate();
                if ($rootScope.inputStyle == "material"){
                	var month = currdate.getMonth(); 
                }
                else{
                	var month = currdate.getMonth()+1; 
                }
                 
                var year = currdate.getFullYear();

                $rootScope.fields.txnSrcToDate_day = "" + date + "";
                $rootScope.fields.txnSrcToDate_month = "" + month + "";
                $rootScope.fields.txnSrcToDate_year = "" + year + "";
                if ($rootScope.fields.txnSrcToDate_day < 10) 
    			{ 
                	$rootScope.fields.txnSrcToDate_day = '0' + $rootScope.fields.txnSrcToDate_day; 
    			}
                if ($rootScope.fields.txnSrcToDate_month < 10) 
    			{ 
                	$rootScope.fields.txnSrcToDate_month = '0' + $rootScope.fields.txnSrcToDate_month; 
    			}
                switch (byDateOption) {
                    case 1: 
                          /*if (date < 7) {
                          
                            if (month == 1) {
                              month = 12;
                              year--;


                            } else {
                              month--;
                            }
                            monthDays = totalDays[month-1];
                            monthDays += (month == 2 && ((year % 4) === 0)) ? 1 : 0;
                            date = monthDays - (7 - date) ;
                          } else {
                            date -= 7;
                          }*/
                    	if (date < 7) {
                    	 if (month == 1) {
                             month = 12;
                             year--;


                           } else {
                             month--;
                           }
                    	}
                    	var prevWeek = new Date(new Date(currdate).setDate(currdate.getDate() - 7));
                    	date = prevWeek.getDate();
                          break;

                    case 2: 

                          if (month == 1) {
                              month = 12;
                              year--;
                            } else {
                              month--;
                            }
                          break;          

                    case 3: 

                          if (month < 3) {
                              month = 12 - (3 - month);
                              year--;
                            } else {
                              month -= 3;
                            }
                          break;                    
                }

                $rootScope.fields.txnSrcFromDate_day = "" + date + "";
                $rootScope.fields.txnSrcFromDate_month = "" + month + "";
                $rootScope.fields.txnSrcFromDate_year = "" + year + "";
                
                if ($rootScope.fields.txnSrcFromDate_day < 10) 
    			{ 
                	$rootScope.fields.txnSrcFromDate_day = '0' + $rootScope.fields.txnSrcFromDate_day; 
    			}
                if ($rootScope.fields.txnSrcFromDate_month < 10) 
    			{ 
                	$rootScope.fields.txnSrcFromDate_month = '0' + $rootScope.fields.txnSrcFromDate_month; 
    			}
                if ($rootScope.inputStyle == "material"){
                	$rootScope.fields.trxnSearchByDate1 = new Date($rootScope.fields.txnSrcFromDate_year,$rootScope.fields.txnSrcFromDate_month,$rootScope.fields.txnSrcFromDate_day);
                    $rootScope.fields.trxnSearchByDate2 = new Date($rootScope.fields.txnSrcToDate_year , $rootScope.fields.txnSrcToDate_month , $rootScope.fields.txnSrcToDate_day);
                }
                else{
                	  $rootScope.fields.trxnSearchByDate1 = $rootScope.fields.txnSrcFromDate_year + "-" + $rootScope.fields.txnSrcFromDate_month + "-" + $rootScope.fields.txnSrcFromDate_day;                			
                	  $rootScope.fields.trxnSearchByDate2 = $rootScope.fields.txnSrcToDate_year + "-" + $rootScope.fields.txnSrcToDate_month + "-" + $rootScope.fields.txnSrcToDate_day;                           
                }
                           
               
            } else {
            	
                switch (byDateOption) {
                	case 4: 
                        if (date1 === null || date1 === "null" || date1 === "" || _.isUndefined(date1)) { 
                        	$rootScope.fields.trxnSearchByDate1 = "";
                        	$rootScope.fields.trxnSearchByDate2 = "";
                        } else {
                        	
                        	if(Date.parse(date1)!==null)
                			{
                				date1=Date.parse(date1);
                			}
                        	$rootScope.fields.txnSrcFromDate_day = "" + date1.getDate() + "";
                        	if ($rootScope.inputStyle == "material"){
                        		$rootScope.fields.txnSrcFromDate_month = "" + date1.getMonth() + "";
                        	}
                        	else{
                        		$rootScope.fields.txnSrcFromDate_month = "" + (date1.getMonth() + 1) + "";
                        	}
                            
                            $rootScope.fields.txnSrcFromDate_year = "" + date1.getFullYear() + ""; 
                            
                            if ($rootScope.fields.txnSrcFromDate_day < 10) 
                			{ 
                            	$rootScope.fields.txnSrcFromDate_day = '0' + $rootScope.fields.txnSrcFromDate_day; 
                			}
                            if ($rootScope.fields.txnSrcFromDate_month < 10) 
                			{ 
                            	$rootScope.fields.txnSrcFromDate_month = '0' + $rootScope.fields.txnSrcFromDate_month; 
                			}
                           

                            $rootScope.fields.txnSrcToDate_day = "" + date1.getDate() + "";
                            if ($rootScope.inputStyle == "material"){
                            	$rootScope.fields.txnSrcToDate_month = "" + date1.getMonth() + "";
                            }
                            else{
                            	$rootScope.fields.txnSrcToDate_month = "" + (date1.getMonth() + 1) + "";
                            }
                            
                            $rootScope.fields.txnSrcToDate_year = "" + date1.getFullYear() + ""; 
                            if ($rootScope.fields.txnSrcToDate_day < 10) 
                			{ 
                            	$rootScope.fields.txnSrcToDate_day = '0' + $rootScope.fields.txnSrcToDate_day; 
                			}
                            if ($rootScope.fields.txnSrcToDate_month < 10) 
                			{ 
                            	$rootScope.fields.txnSrcToDate_month = '0' + $rootScope.fields.txnSrcToDate_month; 
                			}
                              
                           
                            if ($rootScope.inputStyle == "material"){
                            	$rootScope.fields.trxnSearchByDate1 = new Date($rootScope.fields.txnSrcFromDate_year,$rootScope.fields.txnSrcFromDate_month,$rootScope.fields.txnSrcFromDate_day);
                                $rootScope.fields.trxnSearchByDate2 = new Date($rootScope.fields.txnSrcToDate_year , $rootScope.fields.txnSrcToDate_month , $rootScope.fields.txnSrcToDate_day);

                            }
                            else{
                            	$rootScope.fields.trxnSearchByDate1 = $rootScope.fields.txnSrcFromDate_year + "-" + $rootScope.fields.txnSrcFromDate_month + "-" + $rootScope.fields.txnSrcFromDate_day;
                            	$rootScope.fields.trxnSearchByDate2 = $rootScope.fields.txnSrcToDate_year + "-" + $rootScope.fields.txnSrcToDate_month + "-" + $rootScope.fields.txnSrcToDate_day;
                            }
                            
                        }
                		break;
                		
                	case 5: 
                		
                		if (date1 === null || date1 === "null" || date1 === "" || _.isUndefined(date1)) { 
                        	$rootScope.fields.trxnSearchByDate1 = "";
                		} else {
                           
                			if(Date.parse(date1)!==null)
                			{
                				date1=Date.parse(date1);
                			}
                            $rootScope.fields.txnSrcFromDate_day = "" + date1.getDate() + "";
                            if ($rootScope.inputStyle == "material"){
                            	$rootScope.fields.txnSrcFromDate_month = "" + date1.getMonth() + "";
                            }
                            else{
                            	$rootScope.fields.txnSrcFromDate_month = "" +  (date1.getMonth() + 1) + "";
                            }
                            
                            $rootScope.fields.txnSrcFromDate_year = "" + date1.getFullYear() + ""; 
                            if ($rootScope.fields.txnSrcFromDate_day < 10) 
                			{ 
                            	$rootScope.fields.txnSrcFromDate_day = '0' + $rootScope.fields.txnSrcFromDate_day; 
                			}
                            if ($rootScope.fields.txnSrcFromDate_month < 10) 
                			{ 
                            	$rootScope.fields.txnSrcFromDate_month = '0' + $rootScope.fields.txnSrcFromDate_month; 
                			}
                            
                            if ($rootScope.inputStyle == "material"){
                            	$rootScope.fields.trxnSearchByDate1 = new Date($rootScope.fields.txnSrcFromDate_year,$rootScope.fields.txnSrcFromDate_month,$rootScope.fields.txnSrcFromDate_day);
                            }
                            else{
                            	$rootScope.fields.trxnSearchByDate1 = $rootScope.fields.txnSrcFromDate_year + "-" + $rootScope.fields.txnSrcFromDate_month + "-" + $rootScope.fields.txnSrcFromDate_day;
                            }
                            
                            

                		}
                		
                		if(date2 === null || date2 === "" || _.isUndefined(date2)){
                        	$rootScope.fields.trxnSearchByDate2 = "";
                		} else {
                            // var arr = date2.split("-");
                			if(Date.parse(date2)!==null)
                			{
                				date2=Date.parse(date2);
                			}
                			
                            $rootScope.fields.txnSrcToDate_day = "" + date2.getDate() + "";
                            if ($rootScope.inputStyle == "material"){
                            	$rootScope.fields.txnSrcToDate_month = "" + date2.getMonth() + "";
                            }
                            else{
                            	$rootScope.fields.txnSrcToDate_month = "" + (date2.getMonth() + 1)  + "";
                            }
                            
                            $rootScope.fields.txnSrcToDate_year = "" + date2.getFullYear() + ""; 
                            if ($rootScope.fields.txnSrcToDate_day < 10) 
                			{ 
                            	$rootScope.fields.txnSrcToDate_day = '0' + $rootScope.fields.txnSrcToDate_day; 
                			}
                            if ($rootScope.fields.txnSrcToDate_month < 10) 
                			{ 
                            	$rootScope.fields.txnSrcToDate_month = '0' + $rootScope.fields.txnSrcToDate_month; 
                			}
                            if ($rootScope.inputStyle == "material"){
                            	$rootScope.fields.trxnSearchByDate2 = new Date($rootScope.fields.txnSrcToDate_year , $rootScope.fields.txnSrcToDate_month , $rootScope.fields.txnSrcToDate_day);
                            }
                            else{
                            	$rootScope.fields.trxnSearchByDate2 = $rootScope.fields.txnSrcToDate_year + "-" + $rootScope.fields.txnSrcToDate_month + "-" + $rootScope.fields.txnSrcToDate_day;
                            }
                              
                            
                			
                		}
                		
                		break;
                }
            }             
        }
                                            
    };                        
}]);

/**
 * confirmation screen directive
 * @directive
*/
AppController.directive('confirmationScreen', function() {
  return {
    restrict: 'AE',
    templateUrl: 'navigation/common/resources/FinacleConfirmationPage.html'
  };
});

/**
 * alert overlay screen directive
 * @directive
*/
AppController.directive('alertOverlayScreen', function() {
      return {
        restrict: 'AE',
        templateUrl: 'navigation/common/resources/FinacleLoaderErrorPage.html'
      };
});

/**
 * fin campaign directive
 * @directive
*/
AppController.directive('finCampaign', function() {
    return {
      restrict: 'AE',
      templateUrl: 'navigation/common/resources/FinacleCampaignInlineContainer.html'
    };
});

AppController.directive('finStepauth', function() {
    return {
      restrict: 'AE',
      templateUrl: 'navigation/common/resources/FinacleStepupAuthPage.html'
    };
});

AppController.directive('finDynamicauth', function() {
    return {
      restrict: 'AE',
      templateUrl: 'navigation/common/resources/FinacleDynamicAuthPage.html'
    };
});

AppController.directive('finDynamicbenfauth', function() {
    return {
      restrict: 'AE',
      templateUrl: 'navigation/common/resources/FinacleDynamicBenfAuthPage.html'
    };
});

AppController.directive('finDynamicbenfauthresend', function() {
    return {
      restrict: 'AE',
      templateUrl: 'navigation/common/resources/RakDynamicBenfAuthPage.html'
    };
});


AppController.directive('corpDynamicauth', function() {
    return {
      restrict: 'AE',
      templateUrl: 'navigation/common/resources/CorpFinacleDynamicAuthPage.html'
    };
});
/**
 * amount input validate directive
 * @directive
*/
/*AppController.directive('amountInputValidate', function($rootScope,$parse,CurrencyConfigProcessor, Logger) {
  return function(scope, element, attrs) {
    element.bind(
      "keypress",
      function(event) {       	 
    	  var currencyField = attrs.relatedField;
    	  var currencyModel = $parse(currencyField);
    	  var currency = currencyModel($rootScope);
    	  
    	  var decimalPlaces=0;
    	  var decimalSeperator='.';
    	  
    	  try{
    		  var crnConfig1 = CurrencyConfigProcessor.getCurrencyConfig(currency);
    		  decimalPlaces = crnConfig1.decimalPlaces; 
    		  decimalPlaces = isNaN(decimalPlaces = Math.abs(decimalPlaces)) ? 2 : decimalPlaces;
    	  }catch(error){
    		  Console.log("error"+error);
    		  //Add error handling here if needed
    		  //throw error;
    		  // in case of error, default decimal places as 2
    		  decimalPlaces=2;
    	  }
    	  // changed to use event.keyCode or event.which whichever has value as in some cases keyCode doesn't return any value.
    	  if(event.keyCode){
	        if (event.keyCode !== 46 && (event.keyCode < 0x30 || event.keyCode > 0x39)) {
	          event.preventDefault();
	        } else if (event.keyCode == 46 && (element[0].value==="" || (element[0].value.indexOf('.') !== -1))) {
	            event.preventDefault();
	        } else {
		          var money = element[0].value.split(decimalSeperator);
		          if (!_.isUndefined(money[1]) && money[1].length >= decimalPlaces+1) {
	            event.preventDefault();
	          }
	          
		        var ele=event.currentTarget;
		      	var limit= ele.getAttribute('ng-maxLength')*1;
		      	var valueLen=ele.value.length;
			      	// move to next input
			      	if(limit!==0 && valueLen>=limit){
			      		
			      		event.preventDefault();
			      	}
		      	
		        }
    	  }else if(event.which){
    		  
    		if (event.which !== 46 && (event.which < 48 || event.which > 57)) {
    			
    	        event.preventDefault();
	        } else if (event.which == 46 && (element[0].value==="" || (element[0].value.indexOf('.') !== -1))) {
	        	
	            event.preventDefault();
	        } else {
	          var money = element[0].value.split(decimalSeperator);
	          if (!_.isUndefined(money[1]) && money[1].length >= decimalPlaces+1) {
	        	  
	            event.preventDefault();
	          }
	          
		        var ele=event.currentTarget;
		      	var limit= ele.getAttribute('ng-maxLength')*1;
		      	var valueLen=ele.value.length;
	      	// move to next input
	      	if(limit!==0 && valueLen>=limit){
	      		event.preventDefault();
	      	}
      	
        }
    	  }
      }
    );
    element.bind(
        	"keyup",function(event) { 
    	    	var currencyField = attrs.relatedField;
    	    	  var currencyModel = $parse(currencyField);
    	    	  var currency = currencyModel($rootScope);
    	    	  
    	    	  var decimalPlaces=0;
    	    	  var decimalSeperator='.';
    	    	  
    	    	  try{
    	    		  var crnConfig1 = CurrencyConfigProcessor.getCurrencyConfig(currency);
    	    		  decimalPlaces = crnConfig1.decimalPlaces; 
    	    		  decimalPlaces = isNaN(decimalPlaces = Math.abs(decimalPlaces)) ? 2 : decimalPlaces;
    	    		  var money = element[0].value.split(decimalSeperator);
    		          if (!_.isUndefined(money[1]) && money[1].length > decimalPlaces) {
    		        	  var decimalVal = money[1].substring(0,decimalPlaces);
    		        	  element[0].value = money[0] + decimalSeperator + decimalVal;
    		            event.preventDefault();
    		          }
    	    	  }catch(error){
    	    		  Console.log("error"+error);
    	    		  //Add error handling here if needed
    	    		  throw error;
    	    	  }
    	    	  
        	}
	);
  };
});
*/

AppController.directive('amountInputFormat', function($rootScope,$parse,CurrencyConfigProcessor, Logger) {
	  return function(scope, element, attrs) {
		  element.bind(
			      "input",
			      function(event) {
			    		  var currencyField = attrs.relatedField;
			    		  if(currencyField.indexOf("$index")!=-1){
			    			  currencyField = currencyField.replace("$index",scope.$index?scope.$index+"":"0");
			    		  }
		    	    	  var currencyModel = $parse(currencyField);
		    	    	  var currency = currencyModel($rootScope);
		    	    	  
		    	    	  if(currency==undefined || currency==null || currency.length==0){
		    	    		  currency=$rootScope.homeCurrencyCode;
		    	    	  }
		    	    	  
						  var length = event.currentTarget.maxLength*1;
						  var previousValue = event.target.defaultValue;
						  var inputValue=event.currentTarget.value;
						  //Logger.info("raw amount value:: "+inputValue+"::: previous value::: "+previousValue);
						  inputValue=inputValue.trim();
					      var tempVal="";
					      var pattern=/[0-9]/;
						  //validate pattern
						  if (length=="undefined" ||length==undefined||length==-1)
						  {
							  event.target.defaultValue =patterValidator(pattern,inputValue);
							  element[0].value=event.target.defaultValue;
						  }
				    	  else
				    	  {
				    		  event.target.defaultValue =patterValidatorLength(pattern,inputValue,length);
				    		  element[0].value=event.target.defaultValue;
				    	  }
						  
						  //Test for max numeric value possible in JS as per IEEE 754
						  /*var tempNumber=parseFloat(element[0].value);
						  var crnConfig = CurrencyConfigProcessor.getCurrencyConfig(currency);
						  var precison = crnConfig.decimalPlaces; 
						  precison = isNaN(precison = Math.abs(precison)) ? 2 : precison;
						  if(precison){
								var decimal = Math.pow(10, precison);
								tempNumber = tempNumber/decimal;
						  }*/
						  
						  if(element[0].value.length>15){
							  event.target.defaultValue = previousValue;
							  element[0].value=previousValue;
						  }
							  
						  //update the model value
						  var ngModelName = attrs.ngModel;
						  if(ngModelName.indexOf("$index")!=-1){
			    			  //Logger.info("index:: "+scope.$index);
			    			  ngModelName = ngModelName.replace("$index",scope.$index?scope.$index+"":"0");
			    		  }
		    	    	  var amountModel = $parse(ngModelName);
		    	    	  //Logger.info("Amount Value in the directive:: "+element[0].value);
		    	    	  
		    	    	  var formattedAmount = CurrencyConfigProcessor.formatAmountNew(element[0].value, currency);
		    	    	  //Logger.info("formattedAmount:: "+formattedAmount);
		    	    	  amountModel.assign(scope,formattedAmount);
			  			  if(!$rootScope.$$phase){
			  					//Logger.debug("Safe root scope apply");
			  					$rootScope.$apply();
			  			  }else{
			  					//Logger.debug("Skipped root scope apply as it was already in progress");
			  					$rootScope.$applyAsync();
			  					//Logger.debug("Called asynch apply");
			  				}
						  }
			    );
			    };
			});

//latest sundeep

AppController.directive('mailId', function($rootScope) {
    return function(scope, element, attrs) {
    element.bind(
              "input",
              function(event) {
            	length = event.currentTarget.maxLength*1;
                inputValue=event.currentTarget.value;
 
               var pattern =/[0-9a-zA-Z@_\[.\]:]/;
               if (length=="undefined" ||length==undefined||length==-1 || length==524288)
                      element[0].value=patterValidatorLength(pattern,inputValue,"80");
               else
                   element[0].value=patterValidatorLength(pattern,inputValue,length);
           }
            );
            };
        });


AppController.directive('postalCode', function($rootScope) {
	  return function(scope, element, attrs) {
	  element.bind(
	            "input",
	            function(event) {
	            	length = event.currentTarget.maxLength*1;
	              inputValue=event.currentTarget.value;
	              var pattern=/[0-9a-zA-Z]/;
	              if (length=="undefined" ||length==undefined||length==-1 || length==524288)
	              element[0].value=patterValidatorLength(pattern,inputValue,"10");
	              else
	                  element[0].value=patterValidatorLength(pattern,inputValue,length);
	            }
	          );
	          };
	      });


AppController.directive('accountId', function($rootScope) {
    return function(scope, element, attrs) {
          
          element.bind(
                    "input",
                    function(event) {
                      length = event.currentTarget.maxLength*1;
                      inputValue=event.currentTarget.value;
                     var pattern=/[0-9a-zA-Z]/;
                     
                      if (length=="undefined" ||length==undefined||length==-1)
                            element[0].value=patterValidator(pattern,inputValue);
                      else
                            element[0].value=patterValidatorLength(pattern,inputValue,length);
                    }
                  );
                  };
              });

//latest sundeep
AppController.directive('amountInputValidate', function($rootScope,$parse,CurrencyConfigProcessor, Logger) {
	  return function(scope, element, attrs) {
		  element.bind(
			      "input",
			      function(event) {
			    	  //commmented for RAK
			    		  //var currencyField = attrs.relatedField;
			    		 /* if(currencyField.indexOf("$index")!=-1){
			    			  Logger.info("index:: "+scope.$index);
			    			  currencyField = currencyField.replace("$index",scope.$index?scope.$index+"":"0");
			    		  }*/
		    	    	/*  var currencyModel = $parse(currencyField);
		    	    	  var currency = currencyModel($rootScope);*/
			    	  	var start = this.selectionStart,end = this.selectionEnd;
						  var length = event.currentTarget.maxLength*1;
						  var  previousValue = event.target.defaultValue;
						  var inputValue=event.currentTarget.value;
						  inputValue=inputValue.trim();
					      var tempVal="";
					      var pattern=/[0-9.]/;
					      var decimalcounter= inputValue.split(".");
						  decimalcounter=decimalcounter.length-1;
						  if(decimalcounter>1)
							  {

							  //remove the recent entered decimal
							  if(previousValue!="")
							  {

								  element[0].value=event.target.defaultValue;
								  event.target.defaultValue =element[0].value;
							  }
							  else
								 {
								  	index=inputValue.lastIndexOf(".");
							  		inputValue = inputValue.slice(0, index) + inputValue.slice(index+1);
							  		 event.target.defaultValue =inputValue;
									  element[0].value=event.target.defaultValue;
								 }



							  }

						  else{
							  //validate patter
							  if (length=="undefined" ||length==undefined||length==-1)
							  {
								  event.target.defaultValue =patterValidator(pattern,inputValue);
								  element[0].value=event.target.defaultValue;
								  this.setSelectionRange(start,end);
								  
							  }
					    	  else
					    	  {
					    		  event.target.defaultValue =patterValidatorLength(pattern,inputValue,length);
					    		  element[0].value=event.target.defaultValue;
					    		  this.setSelectionRange(start,end);
					    	  }
							 //commented for RAK customization
							 /* try{
			    	    		  var crnConfig1 = CurrencyConfigProcessor.getCurrencyConfig(currency);
			    	    		  decimalPlaces = crnConfig1.decimalPlaces;
			    	    		  decimalPlaces = isNaN(decimalPlaces = Math.abs(decimalPlaces)) ? 2 : decimalPlaces;
			    	    		  var money =  event.target.defaultValue.split(decimalSeperator);
			    		          if (!_.isUndefined(money[1]) && money[1].length > decimalPlaces) {
			    		        	  var decimalVal = money[1].substring(0,decimalPlaces);
			    		        	  event.target.defaultValue = money[0] + decimalSeperator + decimalVal;
			    		        	  element[0].value=event.target.defaultValue;
			    		            event.preventDefault();
			    		          }


							  }*/
							/*  catch(error){
								  Logger.fatal("error"+error);
			    	    		  //Add error handling here if needed

			    	    		  throw error;
			    	    	  }*/
						  }
						  //update the model value
						  var ngModelName = attrs.ngModel;
						  if(ngModelName.indexOf("$index")!=-1){
			    			  Logger.info("index:: "+scope.$index);
			    			  ngModelName = ngModelName.replace("$index",scope.$index?scope.$index+"":"0");
			    		  }




		    	   	  var amountModel = $parse(ngModelName);
		    	    	  amountModel.assign(scope,element[0].value);
			  			  if(!$rootScope.$$phase){
			  					Logger.debug("Safe root scope apply");
			  					$rootScope.$apply();
			  			  }else{
			  					Logger.debug("Skipped root scope apply as it was already in progress");
			  				}
						  }



			    );



	  };
			});

AppController.directive('amountInputIphoneValidate', function() {
	  return function(scope, element, attrs) {
	    element.bind(
	      "keypress",
	      function(event) {  
	    	  var start = this.selectionStart,end = this.selectionEnd;
	        if (event.keyCode !== 46 && (event.keyCode < 0x30 || event.keyCode > 0x39)) {
	          event.preventDefault();
	        } else if (event.keyCode == 46 && (element[0].value==="" || (element[0].value.indexOf('.') !== -1))) {
	            event.preventDefault();
	        } else {
	          	          
	          
		        var ele=event.currentTarget;
		      	var limit= ele.getAttribute('ng-maxLength')*1;
		      	var valueLen=ele.value.length;
		      	
		      	// move to next input
		      	if(limit!==0 && valueLen>=limit){
		      		event.preventDefault();
		      	}
	      	
	        }
	        this.setSelectionRange(start,end);
	      }
	    );};
	});
	/*
/*AppController.directive('amountInputValidate', function($rootScope,$parse,CurrencyConfigProcessor, Logger) {
	  return function(scope, element, attrs) {
		  element.bind(
			      "input",
			      function(event) {
			    	  //commmented for RAK
			    		  //var currencyField = attrs.relatedField;
			    		  if(currencyField.indexOf("$index")!=-1){
			    			  //Logger.info("index:: "+scope.$index);
			    			  currencyField = currencyField.replace("$index",scope.$index?scope.$index+"":"0");
			    		  }
		    	    	  var currencyModel = $parse(currencyField);
		    	    	  var currency = currencyModel($rootScope);
		    	    	  var decimalPlaces=0;
		    	    	  var decimalSeperator='.';
						  var length = event.currentTarget.maxLength*1;
						  var  previousValue = event.target.defaultValue;
						  var inputValue=event.currentTarget.value;
						  inputValue=inputValue.trim();
					      var tempVal="";
					      var pattern=/[0-9.]/;
					      var decimalcounter= inputValue.split(".");
						  decimalcounter=decimalcounter.length-1;
						  if(decimalcounter>1)
							  {
							  
							  //remove the recent entered decimal
							  if(previousValue!="")
							  {
								
								  element[0].value=event.target.defaultValue;
								  event.target.defaultValue =element[0].value
							  }
							  else
								 {
								  	index=inputValue.lastIndexOf(".");
							  		inputValue = inputValue.slice(0, index) + inputValue.slice(index+1);
							  		 event.target.defaultValue =inputValue;
									  element[0].value=event.target.defaultValue;
								 } 
								  
							 
							  
							  }
						   
						  else{  
							  //validate patter
							  if (length=="undefined" ||length==undefined||length==-1)
							  {
								  event.target.defaultValue =patterValidator(pattern,inputValue);
								  element[0].value=event.target.defaultValue;
							  }
					    	  else
					    	  {
					    		  event.target.defaultValue =patterValidatorLength(pattern,inputValue,length);
					    		  element[0].value=event.target.defaultValue;
					    	  }
							 //commented for RAK customization
							  try{
			    	    		  var crnConfig1 = CurrencyConfigProcessor.getCurrencyConfig(currency);
			    	    		  decimalPlaces = crnConfig1.decimalPlaces; 
			    	    		  decimalPlaces = isNaN(decimalPlaces = Math.abs(decimalPlaces)) ? 2 : decimalPlaces;
			    	    		  var money =  event.target.defaultValue.split(decimalSeperator);
			    		          if (!_.isUndefined(money[1]) && money[1].length > decimalPlaces) {
			    		        	  var decimalVal = money[1].substring(0,decimalPlaces);
			    		        	  event.target.defaultValue = money[0] + decimalSeperator + decimalVal;
			    		        	  element[0].value=event.target.defaultValue;
			    		            event.preventDefault();
			    		          }
							 
							
							  }
							  catch(error){
								  //Logger.fatal("error"+error);
			    	    		  //Add error handling here if needed
				
			    	    		  throw error;
			    	    	  }
						  }
						  //update the model value
						  var ngModelName = attrs.ngModel;
						  if(ngModelName.indexOf("$index")!=-1){
			    			  //Logger.info("index:: "+scope.$index);
			    			  ngModelName = ngModelName.replace("$index",scope.$index?scope.$index+"":"0");
			    		  }
		    	    	  var amountModel = $parse(ngModelName);
		    	    	  amountModel.assign(scope,element[0].value);
			  			  if(!$rootScope.$$phase){
			  					//Logger.debug("Safe root scope apply");
			  					$rootScope.$apply();
			  			  }else{
			  					//Logger.debug("Skipped root scope apply as it was already in progress");
			  				}
						  }
						   
		                 
			      
			    );
			    };
			});

/**
 * number input validate directive keypress handling for space and handling length
 * @directive
*/
AppController.directive('numberInputValidate', function($rootScope) {
  return function(scope, element, attrs) {
    element.bind(
      "keypress",
      function(event) {
       /* if (event.keyCode < 0x30 || event.keyCode > 0x39) {
          event.preventDefault();
        }    
        else{
        	var ele=event.currentTarget;
        	var limit= ele.getAttribute('ng-maxLength')*1;
        	var valueLen=ele.value.length;
        	
        	// move to next input
        	if(limit!==0 && valueLen>=limit){
        		event.preventDefault();
        	}
        }*/
      }
    );};
});
AppController.directive('numberInputValidate', function($rootScope) {
	  return function(scope, element, attrs) {
		  element.bind(
			      "input",
			      function(event) {
			    	  length = event.currentTarget.maxLength*1;
			    	  inputValue=event.currentTarget.value.trim();
			    	  var pattern=/[0-9]/;
			    		  if (length=="undefined" ||length==undefined||length==-1)
				    		  element[0].value=patterValidator(pattern,inputValue);
				    	  else
				    		  element[0].value=patterValidatorLength(pattern,inputValue,length);
			      }
			    );
			    };
			});

AppController.directive('cursorMoveNext', function($rootScope){
	return {
		restrict: "A",
		link: function(scope, element){
			element.on("input", function(e) {
				if(element.val().length == element.attr("maxlength")) {
					var nextElelement = element.parent().parent().parent().parent().next().find('input');
					if(element.val().length) {
						nextElelement[0].focus();
					}
					
				}
			})
		}
		
	}	
});
AppController.directive('amountInputValidate', function($rootScope,$parse,CurrencyConfigProcessor, Logger) {
	  return function(scope, element, attrs) {
		  element.bind(
			      "input",
			      function(event) {
			    	  //commmented for RAK
			    		  //var currencyField = attrs.relatedField;
			    		 /* if(currencyField.indexOf("$index")!=-1){
			    			  Logger.info("index:: "+scope.$index);
			    			  currencyField = currencyField.replace("$index",scope.$index?scope.$index+"":"0");
			    		  }*/
		    	    	/*  var currencyModel = $parse(currencyField);
		    	    	  var currency = currencyModel($rootScope);*/
			    	  	var start = this.selectionStart,end = this.selectionEnd;
						  var length = event.currentTarget.maxLength*1;
						  var  previousValue = event.target.defaultValue;
						  var inputValue=event.currentTarget.value;
						  inputValue=inputValue.trim();
					      var tempVal="";
					      var pattern=/[0-9.]/;
					      var decimalcounter= inputValue.split(".");
						  decimalcounter=decimalcounter.length-1;
						  if(decimalcounter>1)
							  {

							  //remove the recent entered decimal
							  if(previousValue!="")
							  {

								  element[0].value=event.target.defaultValue;
								  event.target.defaultValue =element[0].value;
							  }
							  else
								 {
								  	index=inputValue.lastIndexOf(".");
							  		inputValue = inputValue.slice(0, index) + inputValue.slice(index+1);
							  		 event.target.defaultValue =inputValue;
									  element[0].value=event.target.defaultValue;
								 }



							  }

						  else{
							  //validate patter
							  if (length=="undefined" ||length==undefined||length==-1)
							  {
								  event.target.defaultValue =patterValidator(pattern,inputValue);
								  element[0].value=event.target.defaultValue;
								  this.setSelectionRange(start,end);
								  
							  }
					    	  else
					    	  {
					    		  event.target.defaultValue =patterValidatorLength(pattern,inputValue,length);
					    		  element[0].value=event.target.defaultValue;
					    		  this.setSelectionRange(start,end);
					    	  }
							 //commented for RAK customization
							 /* try{
			    	    		  var crnConfig1 = CurrencyConfigProcessor.getCurrencyConfig(currency);
			    	    		  decimalPlaces = crnConfig1.decimalPlaces;
			    	    		  decimalPlaces = isNaN(decimalPlaces = Math.abs(decimalPlaces)) ? 2 : decimalPlaces;
			    	    		  var money =  event.target.defaultValue.split(decimalSeperator);
			    		          if (!_.isUndefined(money[1]) && money[1].length > decimalPlaces) {
			    		        	  var decimalVal = money[1].substring(0,decimalPlaces);
			    		        	  event.target.defaultValue = money[0] + decimalSeperator + decimalVal;
			    		        	  element[0].value=event.target.defaultValue;
			    		            event.preventDefault();
			    		          }


							  }*/
							/*  catch(error){
								  Logger.fatal("error"+error);
			    	    		  //Add error handling here if needed

			    	    		  throw error;
			    	    	  }*/
						  }
						  //update the model value
						  var ngModelName = attrs.ngModel;
						  if(ngModelName.indexOf("$index")!=-1){
			    			  Logger.info("index:: "+scope.$index);
			    			  ngModelName = ngModelName.replace("$index",scope.$index?scope.$index+"":"0");
			    		  }




		    	   	  var amountModel = $parse(ngModelName);
		    	    	  amountModel.assign(scope,element[0].value);
			  			  if(!$rootScope.$$phase){
			  					Logger.debug("Safe root scope apply");
			  					$rootScope.$apply();
			  			  }else{
			  					Logger.debug("Skipped root scope apply as it was already in progress");
			  				}
						  }



			    );



	  };
			});



AppController.directive('numberInputValidate', function() {
	  return function(scope, element, attrs) {
		  element.bind(
			      "input",
			      function(event) {
			    	  length = event.currentTarget.maxLength*1;
			    	  inputValue=event.currentTarget.value;
			    	  inputValue=inputValue.trim();
			    	  var start = this.selectionStart,end = this.selectionEnd;
			    	  var pattern=/[0-9]/;

			    	  if (length=="undefined" ||length==undefined||length==-1)
			    		  element[0].value=patterValidator(pattern,inputValue);
			    	  else
			    		  element[0].value=patterValidatorLength(pattern,inputValue,length);

			    	  this.setSelectionRange(start,end);
			      }
			    );
			    };
			});
///added for time
AppController.directive('timeInputIphoneValidate', function() {
	  return function(scope, element, attrs) {
	    element.bind(
	      "keypress",
	      function(event) {  
	    	  var start = this.selectionStart,end = this.selectionEnd;
		        if (event.keyCode !== 46 && (event.keyCode < 0x30 || event.keyCode > 0x39)) {
		          event.preventDefault();
		        } else if (event.keyCode == 46 && (element[0].value==="" || (element[0].value.indexOf(':') !== -1))) {
		            event.preventDefault();
		        } else {
		          	          
		          
			        var ele=event.currentTarget;
			      	var limit= ele.getAttribute('ng-maxLength')*1;
			      	var valueLen=ele.value.length;
			      	
			      	// move to next input
			      	if(limit!==0 && valueLen>=limit){
			      		event.preventDefault();
			      	}
		      	
		        }
		        this.setSelectionRange(start,end);
		      }
	    );};
	});
AppController.directive('timeInputValidate',function($rootScope,$parse) {
  return function(scope, element, attrs) {
  element.bind(
            "input",
            function(event) {
		    
	    	  	var start = this.selectionStart,end = this.selectionEnd;
				  var length = event.currentTarget.maxLength*1;
				  var inputValue=event.currentTarget.value;
				  inputValue=inputValue.trim();
			    
			      var pattern=/[0-9:]/;
			    
					  if (length=="undefined" ||length==undefined||length==-1)
					  {
						  event.target.defaultValue =patterValidator(pattern,inputValue);
						  element[0].value=event.target.defaultValue;
						  this.setSelectionRange(start,end);
						  
					  }
			    	  else
			    	  {
			    		  event.target.defaultValue =patterValidatorLength(pattern,inputValue,length);
			    		  element[0].value=event.target.defaultValue;
			    		  this.setSelectionRange(start,end);
			    	  }
				
				  //update the model value
				  var ngModelName = attrs.ngModel;
				  if(ngModelName.indexOf("$index")!=-1){
	    			 
	    			  ngModelName = ngModelName.replace("$index",scope.$index?scope.$index+"":"0");
	    		  }




  	   	  var amountModel = $parse(ngModelName);
  	    	  amountModel.assign(scope,element[0].value);
	  			  if(!$rootScope.$$phase){
	  					
	  					$rootScope.$apply();
	  			  }else{
	  				  
	  					
	  				}
				  }
          );
          };
      });

//Added for Write to Us validate Issue

AppController.directive('timeColonInputValidate',function($rootScope,$parse) {
	  return function(scope, element, attrs) {
	  element.bind(
	            "input",
	            function(event) {
			    
		    	  	var start = this.selectionStart,end = this.selectionEnd;
					  var length = event.currentTarget.maxLength*1;
					  var inputValue=event.currentTarget.value;
					  inputValue=inputValue.trim();
				    
				      var pattern=/[0-9:]/;
				    
						  if (length=="undefined" ||length==undefined||length==-1)
						  {
							  event.target.defaultValue =patterValidator(pattern,inputValue);
							  element[0].value=event.target.defaultValue;
							  this.setSelectionRange(start,end);
							  
						  }
				    	  else
				    	  {
				    		  event.target.defaultValue =patterValidatorLength(pattern,inputValue,length);
				    		  element[0].value=event.target.defaultValue;
				    		  this.setSelectionRange(start,end);
				    	  }
					
					  //update the model value
					  var ngModelName = attrs.ngModel;
					  if(ngModelName.indexOf("$index")!=-1){
		    			 
		    			  ngModelName = ngModelName.replace("$index",scope.$index?scope.$index+"":"0");
		    		  }




	  	   	  var amountModel = $parse(ngModelName);
	  	    	  amountModel.assign(scope,element[0].value);
		  			  if(!$rootScope.$$phase){
		  					
		  					$rootScope.$apply();
		  			  }else{
		  				  
		  					
		  				}
					  }
	          );
	          };
	      });

AppController.directive('amountInputIphoneValidate', function() {
	  return function(scope, element, attrs) {
	    element.bind(
	      "keypress",
	      function(event) {  
	    	  var start = this.selectionStart,end = this.selectionEnd;
	        if (event.keyCode !== 46 && (event.keyCode < 0x30 || event.keyCode > 0x39)) {
	          event.preventDefault();
	        } else if (event.keyCode == 46 && (element[0].value==="" || (element[0].value.indexOf('.') !== -1))) {
	            event.preventDefault();
	        } else {
	          	          
	          
		        var ele=event.currentTarget;
		      	var limit= ele.getAttribute('ng-maxLength')*1;
		      	var valueLen=ele.value.length;
		      	
		      	// move to next input
		      	if(limit!==0 && valueLen>=limit){
		      		event.preventDefault();
		      	}
	      	
	        }
	        this.setSelectionRange(start,end);
	      }
	    );};
	});
AppController.directive('textMaxInput', function() {
	  return function(scope, element, attrs) {
	    element.bind(
	      "keyup",
	      function(event) {
//	        if (event.keyCode < 0x30 || event.keyCode > 0x39) {
//	          event.preventDefault();
//	        }    
	        
	        	var ele=event.currentTarget;
	        	var limit= ele.getAttribute('ng-maxLength')*1;
	        	var valueLen=ele.value.length;
	        	
	        	// move to next input
	        	if(limit!==0 && valueLen>=limit){
	        		event.preventDefault();	
	        	}
	        
	      }
	    );};
	});
AppController.directive('textMaxInput', function() {
    return function(scope, element, attrs) {
      element.bind(
        "input",
        function(event) {
          length = event.currentTarget.maxLength*1;
          inputValue=event.currentTarget.value;
          if (length=="undefined" ||length==undefined||length==-1)
                element[0].value=inputValue;
          else
                element[0].value=inputValue.substring(0,length);
          this.setSelectionRange(start,end);
          
        }
      );};
  });

AppController.directive('textMaxInput', function() {
	  return function(scope, element, attrs) {
	    element.bind(
	      "keypress",
	      function(event) {
	    	  k = event.keyCode;
	    	  if((/[;]/.test(String.fromCharCode(event.keyCode)))){
	    		  event.preventDefault();
	          }
	    	
	      }
	    );};
	});
AppController.directive('inputNoSpace', function() {
	  return function(scope, element, attrs) {
	    element.bind(
	      "keypress",
	      function(event) {
	    	  k = event.keyCode;
	    	  if(!(/[0-9a-zA-Z_]/.test(String.fromCharCode(event.keyCode)))){
	    		  event.preventDefault();
	          }
	      }
	    );};
	});
AppController.directive('inputNoSpace', function() {
    return function(scope, element, attrs) {
    element.bind(
              "input",
              function(event) {
                length = event.currentTarget.maxLength*1;
                inputValue=event.currentTarget.value.trim();
                var pattern=/[0-9a-zA-Z_]/;
                 if (length=="undefined" ||length==undefined||length==-1)
                      element[0].value=patterValidator(pattern,inputValue);
                else
                      element[0].value=patterValidatorLength(pattern,inputValue,length);
                 this.setSelectionRange(start,end);
              }
            );
            };
        });



AppController.directive('inputNoSpecialCharacter', function() {
	  return function(scope, element, attrs) {
	    element.bind(
	      "keypress",
	      function(event) {
	    	  k = event.keyCode;
	    	  if(!(/[0-9a-zA-Z]/.test(String.fromCharCode(event.keyCode)))){
	    		  event.preventDefault();
	          }
	      }
	    );};
	});
AppController.directive('inputNoSpecialCharacter', function($rootScope, $parse) {
    return function(scope, element, attrs) {
    element.bind(
              "input",
              function(event) {
	              length = event.currentTarget.maxLength*1;
	              inputValue=event.currentTarget.value;
	              var pattern=/[0-9a-zA-Z]/;
	              if (length=="undefined" ||length==undefined||length==-1)
	                    element[0].value=patterValidator(pattern,inputValue);
	              else
	                    element[0].value=patterValidatorLength(pattern,inputValue,length);
	               
	              //update the model value
				  var ngModelName = attrs.ngModel;
				  if(ngModelName.indexOf("$index")!=-1){
	    			  ngModelName = ngModelName.replace("$index",scope.$index?scope.$index+"":"0");
	    		  }
		    	  var fieldModel = $parse(ngModelName);
		    	  fieldModel.assign(scope,element[0].value);
	  			  if(!$rootScope.$$phase){
	  				  $rootScope.$apply();
	  			  }
               this.setSelectionRange(start,end);
              }
            );
    
            };
        });


AppController.directive('inputNoSpecialCharAndNumber', function() {
	  return function(scope, element, attrs) {
	    element.bind(
	      "keypress",
	      function(event) {
	    	  k = event.keyCode;
	    	  if(!(/[a-zA-Z ]/.test(String.fromCharCode(event.keyCode)))){
	    		  event.preventDefault();
	          }
	      }
	    );};
	});

AppController.directive('mailId', function() {
    return function(scope, element, attrs) {
    element.bind(
              "input",
              function(event) {
            	length = event.currentTarget.maxLength*1;
                inputValue=event.currentTarget.value;
 
               var pattern =/[0-9a-zA-Z@_\[.\]:]/;
               if (length=="undefined" ||length==undefined||length==-1 || length==524288)
                      element[0].value=patterValidatorLength(pattern,inputValue,"80");
               else
                   element[0].value=patterValidatorLength(pattern,inputValue,length);
           }
            );
            };
        });

AppController.directive('postalCode', function($rootScope) {
  return function(scope, element, attrs) {
  element.bind(
            "input",
            function(event) {
            	length = event.currentTarget.maxLength*1;
              inputValue=event.currentTarget.value;
              var pattern=/[0-9a-zA-Z]/;
              if (length=="undefined" ||length==undefined||length==-1 || length==524288)
              element[0].value=patterValidatorLength(pattern,inputValue,"10");
              else
                  element[0].value=patterValidatorLength(pattern,inputValue,length);
            }
          );
          };
      });

AppController.directive('accountId', function($rootScope) {
    return function(scope, element, attrs) {
          
          element.bind(
                    "input",
                    function(event) {
                      length = event.currentTarget.maxLength*1;
                      inputValue=event.currentTarget.value;
                     var pattern=/[0-9a-zA-Z]/;
                     
                      if (length=="undefined" ||length==undefined||length==-1)
                            element[0].value=patterValidator(pattern,inputValue);
                      else
                            element[0].value=patterValidatorLength(pattern,inputValue,length);
                    }
                  );
                  };
              });


AppController.directive('inputNoSpecialCharAndNumber', function($rootScope) {
	  return function(scope, element, attrs) {
	    element.bind(
	      "keypress",
	      function(event) {
	    	  k = event.keyCode;
	    	  if(!(/[a-zA-Z ]/.test(String.fromCharCode(event.keyCode)))){
	    		  event.preventDefault();
	          }
	      }
	    );};
	});
AppController.directive('inputNoSpecialCharAndNumber', function($rootScope) {
    return function(scope, element, attrs) {
      element.bind(
        "input",
        function(event) {
          length = event.currentTarget.maxLength*1;
          inputValue=event.currentTarget.value;
        
          var pattern=/[a-zA-Z ]/;
               if (length=="undefined" ||length==undefined||length==-1)
                element[0].value=patterValidator(pattern,inputValue);
          else
                element[0].value=patterValidatorLength(pattern,inputValue,length);
        }
      );

      };
  });

AppController.directive('inputNoSpecialCharacterWithSpace', function($rootScope) {
    return function(scope, element, attrs) {
          
          element.bind(
                    "input",
                    function(event) {
                      length = event.currentTarget.maxLength*1;
                      inputValue=event.currentTarget.value;
                     var pattern=/[0-9a-zA-Z ]/;
                     
                      if (length=="undefined" ||length==undefined||length==-1)
                            element[0].value=patterValidator(pattern,inputValue);
                      else
                            element[0].value=patterValidatorLength(pattern,inputValue,length);
                    }
                  );
                  };
              });

AppController.directive('inputNoSpecialCharacterWithSpace', function($rootScope) {
	  return function(scope, element, attrs) {
	    element.bind(
	      "keypress",
	      function(event) {
	    	  k = event.keyCode;
	    	  if(!(/[0-9a-zA-Z ]/.test(String.fromCharCode(event.keyCode)))){
	    		  event.preventDefault();
	          }
	      }
	    );};
	});


AppController.directive('inputRestrictedSpecialCharacter', function($rootScope,$parse) {
    return function(scope, element, attrs) {

          element.bind(
                    "input",
                    function(event) {

                    	 length = event.currentTarget.maxLength*1;
   			    	  inputValue=event.currentTarget.value;
   			    	  inputValue=inputValue.trim();
   			    	  var start = this.selectionStart,end = this.selectionEnd;


                      length = event.currentTarget.maxLength*1;
                      inputValue=event.currentTarget.value;
                      var pattern=/[0-9a-zA-Z @#$&+='.^()%-]/;

                      if (length=="undefined" ||length==undefined||length==-1)
                            element[0].value=patterValidator(pattern,inputValue);
                      else
                            element[0].value=patterValidatorLength(pattern,inputValue,length);
                      this.setSelectionRange(start,end);

                    //update the model value
					  var ngModelName = attrs.ngModel;
					  if(ngModelName.indexOf("$index")!=-1){
		    			  Logger.info("index:: "+scope.$index);
		    			  ngModelName = ngModelName.replace("$index",scope.$index?scope.$index+"":"0");
		    		  }

					  var amountModel = $parse(ngModelName);
	    	    	  amountModel.assign(scope,element[0].value);
		  			  if(!$rootScope.$$phase){
		  					
		  					$rootScope.$apply();
		  			  }else{
		  					
		  				}

                    }
                  );
                  };
              });


		AppController.directive('inputRestrictedSpecialCharacter', function() {
			 return function(scope, element, attrs) {
				    element.bind(
				      "keypress",
				      function(event) {

				    	  	var ele=event.currentTarget;
				        	var limit= ele.getAttribute('ng-maxLength')*1;
				        	var valueLen=ele.value.length;

				    	  k = event.keyCode;
				    	  if(!(/[0-9a-zA-Z @#$&+='.^()%-]/.test(String.fromCharCode(event.keyCode)))){
				    		  event.preventDefault();
				          }

			        	if(limit!==0 && valueLen>=limit){
			        		event.preventDefault();
			        	}
				      }
				    );};
		});
AppController.directive('switchBox', function($rootScope,$parse) {
    return function(scope, element, attrs) {

          element.bind(
                    "keyup",
                   function(event) {
                    	var isDelim=false;
                    	var start=this.selectionStart,end=this.selectionEnd;
                    	
                    	
                    	 length = event.currentTarget.maxLength*1;
                         inputValue=event.currentTarget.value;
                         var pattern=/[0-9a-zA-Z]/;

                         if (length=="undefined" ||length==undefined||length==-1)
                               element[0].value=patterValidator(pattern,inputValue);
                         else
                               element[0].value=patterValidatorLength(pattern,inputValue,length);
                    	
                    	var ngModelName = attrs.modelName;
                    	console.log("Model name"+ngModelName);
                    	 var modelVal = $parse(ngModelName);
                    	 
   		  			     if(!$rootScope.$$phase){
   		  					
   		  					$rootScope.$apply();
   		  			      } else{
   		  					
   		  				  }
                    	var val=element.val().split(" ").join("");
                    	console.log("The value read"+val);
                    	modelVal.assign(scope,val);
                    	
                    	if(val.length > 0){
                    		isDelim=(val.length!=1 && val.length % 4 ===1) ? true : false;
                    		val=val.match(new RegExp('.{1,4}','g')).join(" ");
                    		start=isDelim ? start+1  : start;
                    		end=isDelim ? end+1  : end;
                    		
                    	}

                    	console.log("The value inserted"+val);
                    	
                    	element[0].value=val;
                    	this.setSelectionRange(start,end);
                    	
                    	

                    
                    });
                  };
              });

AppController.directive('switchBox', function($rootScope,$parse) {
    return function(scope, element, attrs) {

          element.bind(
                    "keypress",
                    function(event) {
                    	var isDelim=false;
                    	var start=this.selectionStart,end=this.selectionEnd;
                    	
                    	
                    	 length = event.currentTarget.maxLength*1;
                         inputValue=event.currentTarget.value;
                         var pattern=/[0-9a-zA-Z]/;

                         if (length=="undefined" ||length==undefined||length==-1)
                               element[0].value=patterValidator(pattern,inputValue);
                         else
                               element[0].value=patterValidatorLength(pattern,inputValue,length);
                    	
                    	var ngModelName = attrs.modelName;
                    	console.log("Model name"+ngModelName);
                    	 var modelVal = $parse(ngModelName);
                    	 
   		  			     if(!$rootScope.$$phase){
   		  					
   		  					$rootScope.$apply();
   		  			      } else{
   		  					
   		  				  }
                    	var val=element.val().split(" ").join("");
                    	console.log("The value read"+val);
                    	modelVal.assign(scope,val);
                    	
                    	if(val.length > 0){
                    		isDelim=(val.length!=1 && val.length % 4 ===1) ? true : false;
                    		val=val.match(new RegExp('.{1,4}','g')).join(" ");
                    		start=isDelim ? start+1  : start;
                    		end=isDelim ? end+1  : end;
                    		
                    	}

                    	console.log("The value inserted"+val);
                    	
                    	element[0].value=val;
                    	this.setSelectionRange(start,end);
                    	

                    }
                  );
                  };
              });



		AppController.directive('inputRestrictedSpecialCharacterMails', function($rootScope,$parse) {
    return function(scope, element, attrs) {

          element.bind(
                    "input",
                    function(event) {

                    	 length = event.currentTarget.maxLength*1;
   			    	  inputValue=event.currentTarget.value;
   			    	  inputValue=inputValue.trim();
   			    	  var start = this.selectionStart,end = this.selectionEnd;


                      length = event.currentTarget.maxLength*1;
                      inputValue=event.currentTarget.value;
                      var pattern=/[0-9a-zA-Z /?/!/,@#$&+=*_'.^()%-\s]/;

                      if (length=="undefined" ||length==undefined||length==-1)
                            element[0].value=patterValidator(pattern,inputValue);
                      else
                            element[0].value=patterValidatorLength(pattern,inputValue,length);
                      this.setSelectionRange(start,end);

                    //update the model value
					  var ngModelName = attrs.ngModel;
					  if(ngModelName.indexOf("$index")!=-1){
		    			  Logger.info("index:: "+scope.$index);
		    			  ngModelName = ngModelName.replace("$index",scope.$index?scope.$index+"":"0");
		    		  }

					  var amountModel = $parse(ngModelName);
	    	    	  amountModel.assign(scope,element[0].value);
		  			  if(!$rootScope.$$phase){
		  					//Logger.debug("Safe root scope apply");
		  					$rootScope.$apply();
		  			  }else{
		  					//Logger.debug("Skipped root scope apply as it was already in progress");
		  				}

                    }
                  );
                  };
              });


		AppController.directive('inputRestrictedSpecialCharacterMails', function() {
			 return function(scope, element, attrs) {
				    element.bind(
				      "keypress",
				      function(event) {

				    	  	var ele=event.currentTarget;
				        	var limit= ele.getAttribute('ng-maxLength')*1;
				        	var valueLen=ele.value.length;

				    	  k = event.keyCode;
				    	  if(!(/[0-9a-zA-Z /?/!/,@#$&+=*_'.^()%-\s]/.test(String.fromCharCode(event.keyCode)))){
				    		  event.preventDefault();
				          }

			        	if(limit!==0 && valueLen>=limit){
			        		event.preventDefault();
			        	}
				      }
				    );};
				});



		AppController.directive('inputRemittanceRestrictedSpecialCharacter', function($rootScope,$parse) {
		    return function(scope, element, attrs) {

		          element.bind(
		                    "input",
		                    function(event) {

		                    	 length = event.currentTarget.maxLength*1;
		   			    	  inputValue=event.currentTarget.value;
		   			    	  inputValue=inputValue.trim();
		   			    	  var start = this.selectionStart,end = this.selectionEnd;


		                      length = event.currentTarget.maxLength*1;
		                      inputValue=event.currentTarget.value;
		                      var pattern=/[0-9a-zA-Z ]/;

		                      if (length=="undefined" ||length==undefined||length==-1)
		                            element[0].value=patterValidator(pattern,inputValue);
		                      else
		                            element[0].value=patterValidatorLength(pattern,inputValue,length);
		                      this.setSelectionRange(start,end);

		                    //update the model value
							  var ngModelName = attrs.ngModel;
							  if(ngModelName.indexOf("$index")!=-1){
				    			 // Logger.info("index:: "+scope.$index);
				    			  ngModelName = ngModelName.replace("$index",scope.$index?scope.$index+"":"0");
				    		  }

							  var amountModel = $parse(ngModelName);
			    	    	  amountModel.assign(scope,element[0].value);
				  			  if(!$rootScope.$$phase){
				  					//Logger.debug("Safe root scope apply");
				  					$rootScope.$apply();
				  			  }else{
				  					//Logger.debug("Skipped root scope apply as it was already in progress");
				  				}

		                    }
		                  );
		                  };
		              });

		AppController.directive('inputRemittanceRestrictedSpecialCharacter', function() {
			 return function(scope, element, attrs) {
				    element.bind(
				      "keypress",
				      function(event) {

				    	  	var ele=event.currentTarget;
				        	var limit= ele.getAttribute('ng-maxLength')*1;
				        	var valueLen=ele.value.length;

				    	  k = event.keyCode;
				    	  if(!(/[0-9a-zA-Z ]/.test(String.fromCharCode(event.keyCode)))){
				    		  event.preventDefault();
				          }

			        	if(limit!==0 && valueLen>=limit){
			        		event.preventDefault();
			        	}
				      }
				    );};
				});
		AppController.directive('inputBenfRestrictAlphabetNumber', function($rootScope,$parse) {
		    return function(scope, element, attrs) {

		          element.bind(
		                    "input",
		                    function(event) {

		                    	 length = event.currentTarget.maxLength*1;
		   			    	  inputValue=event.currentTarget.value;
		   			    	  inputValue=inputValue.trim();
		   			    	  var start = this.selectionStart,end = this.selectionEnd;


		                      length = event.currentTarget.maxLength*1;
		                      inputValue=event.currentTarget.value;
		                      var pattern=/[0-9a-zA-Z _.]/;

		                      if (length=="undefined" ||length==undefined||length==-1)
		                            element[0].value=patterValidator(pattern,inputValue);
		                      else
		                            element[0].value=patterValidatorLength(pattern,inputValue,length);
		                      this.setSelectionRange(start,end);

		                    //update the model value
							  var ngModelName = attrs.ngModel;
							  if(ngModelName.indexOf("$index")!=-1){
				    			 // Logger.info("index:: "+scope.$index);
				    			  ngModelName = ngModelName.replace("$index",scope.$index?scope.$index+"":"0");
				    		  }

							  var amountModel = $parse(ngModelName);
			    	    	  amountModel.assign(scope,element[0].value);
				  			  if(!$rootScope.$$phase){
				  					//Logger.debug("Safe root scope apply");
				  					$rootScope.$apply();
				  			  }else{
				  					//Logger.debug("Skipped root scope apply as it was already in progress");
				  				}

		                    }
		                  );
		                  };
		              });
		AppController.directive('inputBenfRestrictAlphabetNumber', function() {
			 return function(scope, element, attrs) {
				    element.bind(
				      "keypress",
				      function(event) {

				    	  	var ele=event.currentTarget;
				        	var limit= ele.getAttribute('ng-maxLength')*1;
				        	var valueLen=ele.value.length;

				    	  k = event.keyCode;
				    	  if(!(/[0-9a-zA-Z _.]/.test(String.fromCharCode(event.keyCode)))){
				    		  event.preventDefault();
				          }

			        	if(limit!==0 && valueLen>=limit){
			        		event.preventDefault();
			        	}
				      }
				    );};
				});
AppController.directive('passwordInputValidate', function() {/*
  return function(scope, element, attrs) {
    /*element.bind(
      "keypress",
      function(event) {
        if (event.keyCode == 0x20) {
          event.preventDefault();
        }
        if((/[;]/.test(String.fromCharCode(event.keyCode)))){
  		  event.preventDefault();
        }
      }
    );};*/
});
AppController.directive('passwordInputValidate', function() {
	  return function(scope, element, attrs) {
	        element.bind(
	                  "input",
	                  function(event) {
	                    length = event.currentTarget.maxLength*1;
	                    inputValue=event.currentTarget.value;
	                  inputValue=inputValue.trim();
	                    if (length=="undefined" ||length==undefined||length==-1)
	                          element[0].value=inputValue;
	                    else
	                          element[0].value=inputValue.substring(0,length);
	                  }
	                );
	                };
	            });

///type text for 
AppController.directive('textInputValidate', function() {
	  return function(scope, element, attrs) {
	    element.bind(
	      "keypress",
	      function(event) {
	       
	        if((/[;]/.test(String.fromCharCode(event.keyCode)))){
	  		  event.preventDefault();
	        }
	        
	      }
	    );};
	});
	AppController.directive('textInputValidate', function() {
		  return function(scope, element, attrs) {
		        element.bind(
		                  "input",
		                  function(event) {
		                	  length = event.currentTarget.maxLength*1;
		                      inputValue=event.currentTarget.value;
		                     var pattern=/[;]/;
		                     
		                      if (length=="undefined" ||length==undefined||length==-1)
		                            element[0].value=patternValidator(pattern,inputValue);
		                      else
		                            element[0].value=patternValidatorLength(pattern,inputValue,length);
		                  }
		                );
		                };
		            });
	
	/////////////
	AppController.directive('mailId', function() {
	    return function(scope, element, attrs) {
	    element.bind(
	              "input",
	              function(event) {
	            	length = event.currentTarget.maxLength*1;
	                inputValue=event.currentTarget.value;
	 
	               var pattern =/[0-9a-zA-Z@_\[.\]:]/;
	               if (length=="undefined" ||length==undefined||length==-1 || length==524288)
	                      element[0].value=patterValidatorLength(pattern,inputValue,"80");
	               else
	                   element[0].value=patterValidatorLength(pattern,inputValue,length);
	                  }
	                );
	                };
	            });

AppController.directive('clearWarning', function($rootScope) {
  return function(scope, element, attrs) {
    element.bind(
      "keyup",
      function(event) {
        if (!_.isUndefined($rootScope.pageErrorArr)) {
          $rootScope.pageErrorArr[attrs.clearWarning] = null;
        }
      }
    );};
});

//AppController.directive('repeatDone',function($rootScope, $compile){
//	return function(scope, element, attrs) {
//        if (scope.$last) { // all are rendered
//            scope.$eval(attrs.repeatDone);
//        }
//    };
//});

/**
 * fin input directive to handle all most of UI input controls dynamically
 * @directive
*/
AppController.directive('finInput', function($rootScope, $compile, PhoneFormatConfigProcessor, $parse) {
	


    var getMaterialTemplate = function (scope, displayRow,
            directiveType, ngModelVar, placeholder, valFlag,
            optionArr, readOnlyFlag, maxLength, ngChange,
            relatedField, countryDropdown, row, actualField) {

        var errorTemplate = "<div class=\"fin-input-container\">"
                + "<p class=\"error-text\"> ERROR! "
                + directiveType + "</p>" + "</div>";

        if (_.isUndefined(displayRow)) {
            displayRow = "full";
        }

        if (_.isUndefined(directiveType)) {
            directiveType = "text";
        }

        if (_.isUndefined(ngModelVar)) {
            ngModelVar = "null";
        }

        if (_.isUndefined(placeholder)) {
            placeholder = "";
        }

        if (_.isUndefined(valFlag)) {
            valFlag = "null";
        }

        if (_.isUndefined(relatedField)) {
            relatedField = "";
        }
        
        if (_.isUndefined(countryDropdown)) {
        	countryDropdown = "true";
        }

        var firstline = "";
        switch (displayRow) {
            case "full":
                firstline = "<div class=\"fin-input-container\">";
                break;
            case "half1":
                firstline = "<div class=\"fin-input-container fin-input-container-half1\">";
                break;
            case "half2":
                firstline = "<div class=\"fin-input-container fin-input-container-half2\">";
                break;
            case "qtr1":
                firstline = "<div class=\"fin-input-container fin-input-container-qtr1\">";
                break;
            default:
                return errorTemplate;
        }

        var resTemplate = "";
        switch (directiveType) {
            case "text":
                resTemplate = firstline
                        //+ "<div ng-class='{\"left-line\": !"
                        //+ valFlag
                        //+ ", \"left-line-error\":"
                        //+ valFlag
                        //+ "}'>"
                        //+ "</div>"
                        //+ "<div class=\"input-body\">"
                        + "<md-input-container ng-cut=\"$event.preventDefault()\" ng-copy=\"$event.preventDefault()\" ng-paste=\"$event.preventDefault()\" class=\"input-body2\">"
                        + "<label style=\'display:block;'\>"
                        + placeholder
                        + "</label>"
                        + "<input autocomplete=\"off\" id=\"" 
                        + ngModelVar 
                        + "\" ng-class='{\"\": !" 
                        +  valFlag 
                        +  ", \"bottom-line-error\":"
                        +  valFlag
                        +  "}' type=\"text\" ng-model=\""
                        +  ngModelVar
                        +  "\" "

                        + (_.isUndefined(readOnlyFlag) ? ""
                                : " disabled")
                        + (_.isUndefined(maxLength) ? ""
                                : " maxlength=" + maxLength)
                        + (_.isUndefined(ngChange) ? ""
                                : " ng-change=" + ngChange) + ">"
                        + "</md-input-container>"
                        //+ "<div ng-class='{\"bottom-line\": !"
                        //+ valFlag + ", \"bottom-line-error\":"
                        //+ valFlag + "}'>" + "</div>" + "</div>"
                        //+ "<p class=\"warning-text\" ng-show='"
                        //+ valFlag + "'> ! </p>"
                        //+ "<div ng-class='{\"right-line\": !"
                        //+ valFlag + ", \"right-line-error\":"
                        //+ valFlag + "}'>" + "</div>"

                        + "</div>";
                break;
            case "text_max":
                resTemplate = firstline
                        //+ "<div ng-class='{\"left-line\": !"
                        //+ valFlag
                        //+ ", \"left-line-error\":"
                        //+ valFlag
                        //+ "}'>"
                        //+ "</div>"
                        //+ "<div class=\"input-body\">"
                        + "<md-input-container ng-cut=\"$event.preventDefault()\" ng-copy=\"$event.preventDefault()\" ng-paste=\"$event.preventDefault()\" class=\"input-body2\">"
                        +  "<label style=\" display: block; \">" 
                        +  placeholder
                        +  "</label>"
                        + "<input autocomplete=\"off\" id=\"" 
                        + ngModelVar 
                        + "\" ng-class='{\"\": !"
                        +  valFlag
                        +  ", \"bottom-line-error\":" 
                        +  valFlag 
                        +  "}' text-max-input class=\"fin-input\" type=\"text\" ng-model=\""
                        + ngModelVar
                        

                        + "\""
                        + (_.isUndefined(readOnlyFlag) ? ""
                                : " disabled")
                        + (_.isUndefined(maxLength) ? ""
                                : " maxlength=" + maxLength)
                        + (_.isUndefined(ngChange) ? ""
                                : " ng-change=" + ngChange) + ">"
                        + "</md-input-container>"
                        //+ "<div ng-class='{\"bottom-line\": !"
                        //+ valFlag + ", \"bottom-line-error\":"
                        //+ valFlag + "}'>" + "</div>" + "</div>"
                        //+ "<p class=\"warning-text\" ng-show='"
                        //+ valFlag + "'> ! </p>"
                        //+ "<div ng-class='{\"right-line\": !"
                        //+ valFlag + ", \"right-line-error\":"
                        //+ valFlag + "}'>" + "</div>"
                        + "</div>";
                break;

            case "text_noSpace":
                resTemplate = firstline
                        //+ "<div ng-class='{\"left-line\": !"
                        //+ valFlag
                        //+ ", \"left-line-error\":"
                        //+ valFlag
                        //+ "}'>"
                        //+ "</div>"
                        //+ "<div class=\"input-body\">"
                        + "<md-input-container ng-cut=\"$event.preventDefault()\" ng-copy=\"$event.preventDefault()\" ng-paste=\"$event.preventDefault()\" class=\"input-body2\">"
                        + "<label style=\" display: block; \">"
                        + placeholder
                        + "</label>"
                        + "<input autocomplete=\"off\" id=\"" 
                        + ngModelVar 
                        + "\" input-no-space ng-class='{\"\": !"
                        + valFlag
                        + ", \"bottom-line-error\":"
                        + valFlag
                        + "}' class=\"fin-input\" type=\"text\" ng-model=\""
                        + ngModelVar
                        
                        + "\""
                        + (_.isUndefined(readOnlyFlag) ? ""
                                : " disabled")
                        + (_.isUndefined(maxLength) ? ""
                                : " maxlength=" + maxLength)
                        + (_.isUndefined(ngChange) ? ""
                                : " ng-change=" + ngChange) + ">"
                        + "</md-input-container>"
                        //+ "<div ng-class='{\"bottom-line\": !"
                        //+ valFlag + ", \"bottom-line-error\":"
                        //+ valFlag + "}'>" + "</div>" + "</div>"
                        //+ "<p class=\"warning-text\" ng-show='"
                        //+ valFlag + "'> ! </p>"
                        //+ "<div ng-class='{\"right-line\": !"
                        //+ valFlag + ", \"right-line-error\":"
                        //+ valFlag + "}'>" + "</div>"
                        + "</div>";
                break;

            case "text_noSpecialCharacter":
                resTemplate = firstline
                        //+ "<div ng-class='{\"left-line\": !"
                        //+ valFlag
                        //+ ", \"left-line-error\":"
                        //+ valFlag
                        //+ "}'>"
                        //+ "</div>"
                        //+ "<div class=\"input-body\">"
                        + "<md-input-container ng-cut=\"$event.preventDefault()\" ng-copy=\"$event.preventDefault()\" ng-paste=\"$event.preventDefault()\" class=\"input-body2\">"
                        + "<label style=\" display: block; \">"
                        + placeholder
                        + "</label>"
                        + "<input autocomplete=\"off\" id=\"" 
                        + ngModelVar 
                        + "\" input-no-special-character ng-class='{\"\": !"
                        + valFlag
                        + ", \"bottom-line-error\":"
                        + valFlag
                        + "}' class=\"fin-input\" type=\"text\" ng-model=\""
                        + ngModelVar
                       
                        + "\""
                        + (_.isUndefined(readOnlyFlag) ? ""
                                : " disabled")
                        + (_.isUndefined(maxLength) ? ""
                                : " maxlength=" + maxLength)
                        + (_.isUndefined(ngChange) ? ""
                                : " ng-change=" + ngChange) + ">"
                        + "</md-input-container>"
                        //+ "<div ng-class='{\"bottom-line\": !"
                        //+ valFlag + ", \"bottom-line-error\":"
                        //+ valFlag + "}'>" + "</div>" + "</div>"
                        //+ "<p class=\"warning-text\" ng-show='"
                        //+ valFlag + "'> ! </p>"
                        //+ "<div ng-class='{\"right-line\": !"
                        //+ valFlag + ", \"right-line-error\":"
                        //+ valFlag + "}'>" + "</div>" 
                        + "</div>";
                break;
            case "mail_Id":
                resTemplate = firstline
                        //+ "<div ng-class='{\"left-line\": !"
                        //+ valFlag
                        //+ ", \"left-line-error\":"
                        //+ valFlag
                        //+ "}'>"
                        //+ "</div>"
                        //+ "<div class=\"input-body\">"
                        + "<md-input-container ng-cut=\"$event.preventDefault()\" ng-copy=\"$event.preventDefault()\" ng-paste=\"$event.preventDefault()\" class=\"input-body2\">"
                        + "<label style=\" display: block; \">"
                        + placeholder
                        + "</label>"
                        + "<input autocomplete=\"off\" id=\"" 
                        + ngModelVar 
                        + "\" mail-id ng-class='{\"\": !"
                        + valFlag
                        + ", \"bottom-line-error\":"
                        + valFlag
                        + "}' class=\"fin-input\" type=\"text\" ng-model=\""
                        + ngModelVar
                       
                        + "\""
                        + (_.isUndefined(readOnlyFlag) ? ""
                                : " disabled")
                        + (_.isUndefined(maxLength) ? ""
                                : " maxlength=" + maxLength)
                        + (_.isUndefined(ngChange) ? ""
                                : " ng-change=" + ngChange) + ">"
                        + "</md-input-container>"
                        //+ "<div ng-class='{\"bottom-line\": !"
                        //+ valFlag + ", \"bottom-line-error\":"
                        //+ valFlag + "}'>" + "</div>" + "</div>"
                        //+ "<p class=\"warning-text\" ng-show='"
                        //+ valFlag + "'> ! </p>"
                        //+ "<div ng-class='{\"right-line\": !"
                        //+ valFlag + ", \"right-line-error\":"
                        //+ valFlag + "}'>" + "</div>" 
                        + "</div>";
                break;
            case "postalCode":
                resTemplate = firstline
                        + "<md-input-container ng-cut=\"$event.preventDefault()\" ng-copy=\"$event.preventDefault()\" ng-paste=\"$event.preventDefault()\" class=\"input-body2\">"
                        + "<label style=\" display: block; \">"
                        + placeholder
                        + "</label>"
                        + "<input autocomplete=\"off\" id=\"" 
                        + ngModelVar 
                        + "\" postal-code ng-class='{\"\": !"
                        + valFlag
                        + ", \"bottom-line-error\":"
                        + valFlag
                        + "}' class=\"fin-input\" type=\"text\" ng-model=\""
                        + ngModelVar
                       
                        + "\""
                        + (_.isUndefined(readOnlyFlag) ? ""
                                : " disabled")
                        + (_.isUndefined(maxLength) ? ""
                        		 : " maxlength=" + maxLength)
                        + (_.isUndefined(ngChange) ? ""
                                : " ng-change=" + ngChange) + ">"
                        + "</md-input-container>"
                        + "</div>";
                break;

            case "text_noSpecialCharacterWithSpace":
                resTemplate = firstline
                        //+ "<div ng-class='{\"left-line\": !"
                        //+ valFlag
                        //+ ", \"left-line-error\":"
                        //+ valFlag
                        //+ "}'>"
                        //+ "</div>"
                        //+ "<div class=\"input-body\">"
                        + "<md-input-container ng-cut=\"$event.preventDefault()\" ng-copy=\"$event.preventDefault()\" ng-paste=\"$event.preventDefault()\" class=\"input-body2\">"
                        + "<label style=\" display: block; \">"
                        + placeholder
                        + "</label>"
                        + "<input autocomplete=\"off\" id=\"" 
                        + ngModelVar 
                        + "\" input-no-special-character-with-space ng-class='{\" \": !"
                        + valFlag + ", \"bottom-line-error\":"
                        + valFlag + "}' class=\"fin-input\" type=\"text\" ng-model=\""
                        + ngModelVar
                         
                        + "\""
                        + (_.isUndefined(readOnlyFlag) ? ""
                                : " disabled")
                        + (_.isUndefined(maxLength) ? ""
                                : " maxlength=" + maxLength)
                        + (_.isUndefined(ngChange) ? ""
                                : " ng-change=" + ngChange) + ">"
                        + "</md-input-container>"
                        //+ "<div ng-class='{\"bottom-line\": !"
                        //+ valFlag + ", \"bottom-line-error\":"
                        //+ valFlag + "}'>" + "</div>" + "</div>"
                        //+ "<p class=\"warning-text\" ng-show='"
                        //+ valFlag + "'> ! </p>"
                        //+ "<div ng-class='{\"right-line\": !"
                        //+ valFlag + ", \"right-line-error\":"
                        //+ valFlag + "}'>" + "</div>"
                        + "</div>";
                break;
                
            case "accountId":
                resTemplate = firstline
                        + "<md-input-container ng-cut=\"$event.preventDefault()\" ng-copy=\"$event.preventDefault()\" ng-paste=\"$event.preventDefault()\" class=\"input-body2\">"
                        + "<label style=\" display: block; \">"
                        + placeholder
                        + "</label>"
                        + "<input autocomplete=\"off\" id=\"" 
                        + ngModelVar 
                        + "\" account-id ng-class='{\" \": !"
                        + valFlag + ", \"bottom-line-error\":"
                        + valFlag + "}' class=\"fin-input\" type=\"text\" ng-model=\""
                        + ngModelVar
                         
                        + "\""
                        + (_.isUndefined(readOnlyFlag) ? ""
                                : " disabled")
                        + (_.isUndefined(maxLength) ? ""
                                : " maxlength=" + maxLength)
                        + (_.isUndefined(ngChange) ? ""
                                : " ng-change=" + ngChange) + ">"
                        + "</md-input-container>"
                        + "</div>";
                break;

            case "text_dynamic_disable":
                resTemplate = firstline
         //               + "<div ng-class='{\"left-line\": !"
         //               + valFlag
         //               + ", \"left-line-error\":"
         //               + valFlag
         //               + "}'> \
         //</div> \
         //<div class=\"input-body\"> \
                          + "<md-input-container ng-cut=\"$event.preventDefault()\" ng-copy=\"$event.preventDefault()\" ng-paste=\"$event.preventDefault()\" class=\"input-body2\">"
                          + "<label style=\" display: block; \">"
                        + placeholder
                        + "</label>"
                          + "<input autocomplete=\"off\" id=\"" 
                        + ngModelVar 
                        + "\" ng-class='{\"\": !"
                        + valFlag
                        + ", \"bottom-line-error\":"
                        + valFlag
                        + "}' class=\"fin-input\" type=\"text\" ng-disabled=\""
                        + readOnlyFlag
                        + "\" ng-model=\""
                        + ngModelVar
                        
                        + "\""
                        + (_.isUndefined(maxLength) ? ""
                                : " maxlength=" + maxLength)
                        + (_.isUndefined(ngChange) ? ""
                                : " ng-change=" + ngChange)
                        + "> "
                        + "</md-input-container>" 
                       //<div ng-class='{\"bottom-line\": !"
                       //             + valFlag
                       //             + ", \"bottom-line-error\":"
                       //             + valFlag
                       //             + "}'> \
                       //</div> \
                        /*+ "</div> \
         <p class=\"warning-text\" ng-show='"
                        + valFlag
                        + "'> ! </p> \
         <div ng-class='{\"right-line\": !"*/
         //               + valFlag
         //               + ", \"right-line-error\":"
         //               + valFlag
         //               + "}'> \
         //</div> \
                        + "</div>";
                break;

            case "number_dynamic_disable":
                resTemplate = firstline
                        + "<div ng-class='{\"left-line\": !"
                        + valFlag
                        + ", \"left-line-error\":"
                        + valFlag
                        + "}'> \
         </div> \
         <div class=\"input-body\"> \
           <div class=\"input-body2\"> \
             <input autocomplete=\"off\" id=\"" 
                        + ngModelVar 
                        + "\" number-input-validate class=\"fin-input\" ng-cut=\"$event.preventDefault()\" ng-copy=\"$event.preventDefault()\" ng-paste=\"$event.preventDefault()\" type=\"number\" min=\"0\" pattern=\"[0-9]*\"  id=\""
                        + ngModelVar
                        + "\" ng-disabled=\""
                        + readOnlyFlag
                        + "\" ng-model=\""
                        + ngModelVar
                        + "\" placeholder=\""
                        + placeholder
                        + "\""
                        + (_.isUndefined(maxLength) ? ""
                                : " maxlength =" + maxLength)
                        + (_.isUndefined(ngChange) ? ""
                                : " ng-change=" + ngChange)
                        + "> \
           </div> \
           <div ng-class='{\"\": !"
                        + valFlag
                        + ", \"bottom-line-error\":"
                        + valFlag
                        + "}'> \
           </div> \
         </div> \
         <p class=\"warning-text\" ng-show='"
                        + valFlag
                        + "'> ! </p> \
         <div ng-class='{\"right-line\": !"
                        + valFlag
                        + ", \"right-line-error\":"
                        + valFlag
                        + "}'> \
         </div> \
       </div>";
                break;

            case "text_noSpecialCharacterAndNum":
                resTemplate = firstline
                        //+ "<div ng-class='{\"left-line\": !"
                        //+ valFlag
                        //+ ", \"left-line-error\":"
                        //+ valFlag
                        //+ "}'>"
                        //+ "</div>"
                        //+ "<div class=\"input-body\">"
                        + "<md-input-container ng-cut=\"$event.preventDefault()\" ng-copy=\"$event.preventDefault()\" ng-paste=\"$event.preventDefault()\" class=\"input-body2\">"
                        + "<label style=\" display: block; \">"
                        + placeholder
                        + "</label>"
                        + "<input autocomplete=\"off\" id=\"" 
                        + ngModelVar 
                        + "\" input-no-special-char-and-number ng-class='{\"\": !"
                        + valFlag + ", \"bottom-line-error\":"
                        + valFlag + "}' class=\"fin-input\" type=\"text\" ng-model=\""
                        + ngModelVar
                         
                        + "\""
                        + (_.isUndefined(readOnlyFlag) ? ""
                                : " disabled")
                        + (_.isUndefined(maxLength) ? ""
                                : " maxlength=" + maxLength)
                        + (_.isUndefined(ngChange) ? ""
                                : " ng-change=" + ngChange) + ">"
                        + "</md-input-container>"
                        //+ "<div ng-class='{\"bottom-line\": !"
                        //+ valFlag + ", \"bottom-line-error\":"
                        //+ valFlag + "}'>" + "</div>" + "</div>"
                        //+ "<p class=\"warning-text\" ng-show='"
                        //+ valFlag + "'> ! </p>"
                        //+ "<div ng-class='{\"right-line\": !"
                        //+ valFlag + ", \"right-line-error\":"
                        //+ valFlag + "}'>" + "</div>" 
                        + "</div>";
                break;

            case "password_text":
                resTemplate = firstline
                        //+ "<div ng-class='{\"left-line\": !"
                        //+ valFlag
                        //+ ", \"left-line-error\":"
                        //+ valFlag
                        //+ "}'>"
                        //+ "</div>"
                        //+ "<div class=\"input-body\">"
                        + "<md-input-container class=\"input-body2\">"
                        + "<label style=\" display: block; \">"
                        + placeholder
                        + "</label>"
                        + "<input autocomplete=\"off\" id=\"" 
                        + ngModelVar 
                        + "\" onpaste=\"return false;\"  password-input-validate ng-class='{\"\": !"
                        + valFlag + ", \"bottom-line-error\":"
                        + valFlag + "}' class=\"fin-input\" type=\"password\" ng-model=\""
                        + ngModelVar                        
                        + "\""
                        + (_.isUndefined(readOnlyFlag) ? ""
                                : " disabled")
                        + (_.isUndefined(maxLength) ? ""
                                : " maxlength=" + maxLength)
                        + (_.isUndefined(ngChange) ? ""
                                : " ng-change=" + ngChange) + ">"
                        + "</md-input-container>"
                        //+ "<div ng-class='{\"bottom-line\": !"
                        //+ valFlag + ", \"bottom-line-error\":"
                        //+ valFlag + "}'>" + "</div>" + "</div>"
                        //+ "<p class=\"warning-text\" ng-show='"
                        //+ valFlag + "'> ! </p>"
                        //+ "<div ng-class='{\"right-line\": !"
                        //+ valFlag + ", \"right-line-error\":"
                        //+ valFlag + "}'>" + "</div>"
                        + "</div>";
                // $rootScope.$apply($rootScope.isPassword=true);
                break;
            case "password_num":
                resTemplate = firstline
                        //+ "<div ng-class='{\"left-line\": !"
                        //+ valFlag
                        //+ ", \"left-line-error\":"
                        //+ valFlag
                        //+ "}'>"
                        //+ "</div>"
                        //+ "<div class=\"input-body\">"
                        + "<md-input-container class=\"input-body2\">"
                        + "<label style=\" display: block; \">"
                        + placeholder
                        + "</label>"
                        + "<input autocomplete=\"off\" id=\"" 
                        + ngModelVar 
                        + "\" onpaste=\"return false;\" cursor-move-next ng-class='{\"\": !"
                        + valFlag + ", \"bottom-line-error\":"
                        + valFlag + "}' class=\"fin-input\" number-input-validate type=\"password\" ng-model=\""
                        + ngModelVar
                        
                        + "\" "
                        + (_.isUndefined(readOnlyFlag) ? ""
                                : " disabled")
                        + (_.isUndefined(maxLength) ? ""
                                : " maxlength=" + maxLength)
                        + (_.isUndefined(ngChange) ? ""
                                : " ng-change=" + ngChange) + ">"
                        + "</md-input-container>"
                        //+ "<div ng-class='{\"\": !"
                        //+ valFlag + ", \"bottom-line-error\":"
                        //+ valFlag + "}'>" + "</div>" + "</div>"
                        //+ "<p class=\"warning-text\" ng-show='"
                        //+ valFlag + "'> ! </p>"
                        //+ "<div ng-class='{\"right-line\": !"
                        //+ valFlag + ", \"right-line-error\":"
                        //+ valFlag + "}'>" + "</div>"
                        + "</div>";
                break;
            case "money":
            	
            	var stringComponent="";
            	var amountFormatMode = $rootScope.mobileAppConfig.appConfigData.amountFormatMode;
            	if(amountFormatMode && amountFormatMode == "INPUT"){
            		stringComponent = "<input autocomplete=\"off\" id=\"" + ngModelVar + "\" amount-input-format ng-class='{\"\": !" + valFlag + ", \"bottom-line-error\":" + valFlag + "}' class=\"fin-input\" type=\"tel\" ng-model=\"" + ngModelVar + "\" " + (_.isUndefined(readOnlyFlag) ? "" : " disabled") + (_.isUndefined(relatedField) ? "" : " related-field=" + relatedField) + ""/*(_.isUndefined(maxLength) ? "" : " maxlength=" + maxLength)*/ + (_.isUndefined(ngChange) ? "" : " ng-change=" + ngChange) + ">";
            	}else{
            		stringComponent = "<input autocomplete=\"off\" id=\"" + ngModelVar + "\" amount-input-validate ng-class='{\"\": !" + valFlag + ", \"bottom-line-error\":" + valFlag + "}' class=\"fin-input\" type=\"text\" ng-model=\"" + ngModelVar + "\" onblur=\"angular.element(this).scope().formatAmountCrn('" + ngModelVar + "','" + relatedField + "'" + (ngModelVar.indexOf("$index") != -1 ? ", angular.element(this).scope().$index" : "") + ")\" " + "  onfocus=\"angular.element(this).scope().unFormatAmount('" + ngModelVar + "','" + relatedField + "'" + (ngModelVar.indexOf("$index") != -1 ? ", angular.element(this).scope().$index" : "") + ")\" " + (_.isUndefined(readOnlyFlag) ? "" : " disabled") + (_.isUndefined(relatedField) ? "" : " related-field=" + relatedField) + " maxlength=23"/*(_.isUndefined(maxLength) ? "" : " maxlength=" + maxLength)*/ + (_.isUndefined(ngChange) ? "" : " ng-change=" + ngChange) + ">";
            	}
            	
                resTemplate = firstline
                        /*+ "<div ng-class='{\"left-line\": !"
                        + valFlag
                        + ", \"left-line-error\":"
                        + valFlag
                        + "}'>"
                        + "</div>"
                        + "<div class=\"input-body\">"*/                                
                        + "<md-input-container ng-cut=\"$event.preventDefault()\" ng-copy=\"$event.preventDefault()\" ng-paste=\"$event.preventDefault()\" class=\"input-body2\">"
                        + "<label style=\" display: block; \">"
                        + placeholder
                        + "</label>"
                        + stringComponent
                        + "</md-input-container>"
                        /*+ "<div ng-class='{\"bottom-line\": !"
                        + valFlag + ", \"bottom-line-error\":"
                        + valFlag + "}'>" + "</div>" + "</div>"
                        + "<p class=\"warning-text\" ng-show='"
                        + valFlag + "'> ! </p>"
                        + "<div ng-class='{\"right-line\": !"
                        + valFlag + ", \"right-line-error\":"
                        + valFlag + "}'>" + "</div>" */
                        + "</div>";
                break;
            case "number":
                resTemplate = firstline
                        //+ "<div ng-class='{\"left-line\": !"
                        //+ valFlag
                        //+ ", \"left-line-error\":"
                        //+ valFlag
                        //+ "}'>"
                        //+ "</div>"
                        //+ "<div class=\"input-body\">"
                        + "<md-input-container ng-cut=\"$event.preventDefault()\" ng-copy=\"$event.preventDefault()\" ng-paste=\"$event.preventDefault()\" class=\"input-body2\">"
                        + "<label style=\" display: block; \">"
                        + placeholder
                        + "</label>"
                        + "<input autocomplete=\"off\" id=\"" 
                        + ngModelVar 
                        + "\" number-input-validate ng-class='{\"\": !"
                        + valFlag + ", \"bottom-line-error\":"
                        + valFlag + "}' class=\"fin-input\" type=\"tel\" min=\"0\" pattern=\"[0-9]*\"  id=\""
                        + ngModelVar
                        + "\"  ng-model=\""
                        + ngModelVar
                        
                        + "\""
                        + (_.isUndefined(maxLength) ? ""
                                : " maxlength=" + maxLength)
                        + (_.isUndefined(readOnlyFlag) ? ""
                                : " disabled")
                        + (_.isUndefined(ngChange) ? ""
                                : " ng-change=" + ngChange) + ">"
                        + "</md-input-container >"
                        //+ "<div ng-class='{\"bottom-line\": !"
                        //+ valFlag + ", \"bottom-line-error\":"
                        //+ valFlag + "}'>" + "</div>" + "</div>"
                        //+ "<p class=\"warning-text\" ng-show='"
                        //+ valFlag + "'> ! </p>"
                        //+ "<div ng-class='{\"right-line\": !"
                        //+ valFlag + ", \"right-line-error\":"
                        //+ valFlag + "}'>" + "</div>"
                        + "</div>";
                break;
            case "number_card":
                resTemplate = firstline
                        //+ "<div ng-class='{\"left-line\": !"
                        //+ valFlag
                        //+ ", \"left-line-error\":"
                        //+ valFlag
                        //+ "}'>"
                        //+ "</div>"
                        //+ "<div class=\"input-body\">"
                        + "<md-input-container md-no-float ng-cut=\"$event.preventDefault()\" ng-copy=\"$event.preventDefault()\" ng-paste=\"$event.preventDefault()\" class=\"input-body2\">"                        
                        + "<input placeholder=\"xxxx\" autocomplete=\"off\" id=\"" 
                        + ngModelVar 
                        + "\" number-input-validate cursor-move-next ng-class='{\"\": !"
                        + valFlag + ", \"bottom-line-error\":"
                        + valFlag + "}' class=\"fin-input\" type=\"tel\" min=\"0\" pattern=\"[0-9]*\" ng-model=\""
                        + ngModelVar
                        
                        + "\""
                        + (_.isUndefined(maxLength) ? ""
                                : " maxlength =" + maxLength)
                        + (_.isUndefined(readOnlyFlag) ? ""
                                : " disabled")
                        + (_.isUndefined(ngChange) ? ""
                                : " ng-change=" + ngChange) + ">"
                        + "</md-input-container >"
                        //+ "<div ng-class='{\"bottom-line\": !"
                        //+ valFlag + ", \"bottom-line-error\":"
                        //+ valFlag + "}'>" + "</div>" + "</div>"
                        //+ "<p class=\"warning-text\" ng-show='"
                        //+ valFlag + "'> ! </p>"
                        //+ "<div ng-class='{\"right-line\": !"
                        //+ valFlag + ", \"right-line-error\":"
                        //+ valFlag + "}'>" + "</div>"
                        + "</div>";
                break;
            case "date":
                resTemplate = firstline
                        //+ "<div ng-class='{\"left-line\": !"
                        //+ valFlag
                        //+ ", \"left-line-error\":"
                        //+ valFlag
                        //+ "}'>"
                        //+ "</div>"
                        //+ "<div class=\"input-body\">"
                        //+ "<span class=\"app app-calendar\"  ng-class='{\"icon-calendar-input\": !"
                        //+ valFlag
                        //+ ", \"icon-calendar-input-error\":"
                        //+ valFlag
                        //+ "}' ng-style='"
                        //+ ngModelVar
                        //+ " == null || "
                        //+ ngModelVar
                        //+ " == \"\" ? {\"top\": \"-0.2em\"} : {\"top\": \"-0.95em\"}'></span>"
                        //+ "<div class=\"place-holder\" ng-show='"
                        //+ ngModelVar
                        //+ " == null || "
                        //+ ngModelVar
                        //+ " == \"\"'>"
                        //+ "<span>"
                        //+ placeholder
                        //+ "</span>"
                        //+ "</div>"
                        
                        + "<md-content class=\"input-body2\" ng-init=\""+ngModelVar+" = "+ ngModelVar +" || 'null';\">"
                        + "<md-icon class=\"app app-icon_calender calender_icon\"></md-icon>"
                        + "<md-datepicker md-open-on-focus id=\"" 
                        + ngModelVar 
                        + "\" md-placeholder = \" "
                        + placeholder
                        + " \" ng-class='{\"\": !"
                        + valFlag + ", \"bottom-line-error\":"
                        + valFlag + "}' class=\"fin-input "
                        + (displayRow == "full" ? ""
                                : " fin-input-date")
                        + "\" type=\"date\" ng-model=\""
                        + ngModelVar
                        + "\" '"
                        + (_.isUndefined(readOnlyFlag) ? ""
                                : " disabled")
                        + (_.isUndefined(ngChange) ? ""
                                : " ng-change=" + ngChange) + ">"
                        + "</md-datepicker>"
                        + "</md-content>"
                        //+ "<div ng-class='{\"bottom-line\": !"
                        //+ valFlag + ", \"bottom-line-error\":"
                        //+ valFlag + "}'>" + "</div>" + "</div>"
                        //+ "<p class=\"warning-date\" ng-show='"
                        //+ valFlag + "'> ! </p>"
                        //+ "<div ng-class='{\"right-line\": !"
                        //+ valFlag + ", \"right-line-error\":"
                        //+ valFlag + "}'>" + "</div>"
                        + "</div>";

                break;
            case "label": resTemplate = firstline 
                         +  "<md-input-container ng-cut=\"$event.preventDefault()\" ng-copy=\"$event.preventDefault()\" ng-paste=\"$event.preventDefault()\" class=\"input-body2\">" 
                         +  "<label ng-class='{ \"place-holder\": !" 
                         +  ngModelVar 
                         +  ", \"place-holder shift-label-placeholder\": " 
                         +  ngModelVar 
                         +  "}' style=\" display: block; \">" 
                         +  placeholder 
                         +  "</label>" 
                         +  "<input autocomplete=\"off\" id=\"" 
                        + ngModelVar 
                        + "\" ng-class='{\"bottom-line type-label-bottom-line\": !" 
                         +  valFlag + ", \"bottom-line-error type-label-bottom-line\":" 
                         +  valFlag 
                         +  "}' ng-disabled= \"true\" ng-model=\"" 
                         +  ngModelVar + "\"" + ">" 
                         +  "</md-input-container>" 
                        //+ "<div ng-class='{\"left-line\": !"
                        //+ valFlag
                        //+ ", \"left-line-error\":"
                        //+ valFlag
                        //+ "}'>"
                        //+ "</div>"
                        //+ "<div class=\"input-body\">"
                        //+ "<div class=\"place-holder\" ng-show=\""
                        //+ ngModelVar
                        //+ " == null\">"
                        //+ "<span>"
                        //+ placeholder
                        //+ "</span>"
                        //+ "</div>"
                        //+ "<div class=\"label-holder\" ng-hide=\""
                        //+ ngModelVar
                        //+ " == null\">"
                        //+ "<span> {{"
                        //+ ngModelVar
                        //+ "}}</span>"
                        //+ "</div>"
                        //+ "<div ng-class='{\"bottom-line\": !"
                        //+ valFlag
                        //+ ", \"bottom-line-error\":"
                        //+ valFlag
                        //+ "}'>"
                        //+ "</div>"
                        //+ "</div>"
                        //+ "<p class=\"warning-text warning-select\" ng-show='"
                        //+ valFlag + "'> ! </p>"
                        //+ "<span ng-class='{\"dropdown\": !"
                        //+ valFlag + ", \"dropdown-error\": "
                        //+ valFlag + "}'> </span>"
                        + "</div>";
                break;


            case "textarea":
                resTemplate = firstline +
                     "<md-input-container ng-cut=\"$event.preventDefault()\"  ng-copy=\"$event.preventDefault()\" ng-paste=\"$event.preventDefault()\" class=\"input-body2\">"
									+ "<label>"
									+ placeholder
									+ "</label>"
									+ "<textarea autocomplete=\"off\" id=\"" 
									+  ngModelVar
									+ "\"  ng-class='{\"\": !"
				                    +  valFlag
				                    +  ", \"bottom-line-error\":" 
				                    +  valFlag 
				                    +  "}'"									
									+ "\" class=\"fin-input\" ng-model=\""
									+ ngModelVar
									+ "\""
			                        + (_.isUndefined(maxLength) ? ""
			                                : " maxlength=\"" + maxLength+"\"")
			                        + (_.isUndefined(readOnlyFlag) ? ""
			                                : " disabled")
			                        + (_.isUndefined(ngChange) ? ""
			                                : " ng-change=\"" + ngChange+"\"") + " "+(_.isUndefined(row) ? "" : "rows=\""+ row +"\"")+"></textarea>"
			                                
									+ "</md-input-container>" + "</div>";
                break;



            case "dropdown":
                if (_.isUndefined(optionArr)
                        || optionArr.length === 0) {
                    return errorTemplate;
                }

                resTemplate = firstline
                        //+ "<div ng-class='{\"left-line\": !"
                        //+ valFlag
                        //+ ", \"left-line-error\":"
                        //+ valFlag
                        //+ "}'>"
                        //+ "</div>"
                        //+ "<div class=\"input-body\">"
                        + "<md-input-container class=\"input-body2 input-body2-dropdown\">"
                        + "<label>"
                        + placeholder
                        + "</label>"
                        + "<md-select  id=\"" 
                        + ngModelVar 
                        + "\" ng-class='{\"\": !"
                        + valFlag
                        + ", \"bottom-line-error\":"
                        + valFlag
                        + "}' class=\"fin-input fin-select\" ng-model='"
                        + ngModelVar
                        + "'"
                        + "ng-style='"
                        + ngModelVar
                        + "== null || "
                        + ngModelVar
                        + " == \"\" ? {\"font-size\": \"14px\"} : {\"color\": \"initial\"}' "
                        + (_.isUndefined(readOnlyFlag) ? ""
                                : " disabled")
                        + (_.isUndefined(ngChange) ? ""
                                : " ng-change=" + ngChange)
                        + ">"
                        + "<md-option ng-repeat=\"option in "
                        + optionArr
                        + "\" ng-selected='option.value==\""
                        + scope.$eval(ngModelVar)
                        + "\"' value=\"{{option.value}}\">{{option.label}}</md-option>"
                        + "</md-select>"
                        + "</md-input-container>"
                        //+ "<option class=\"place-holder-select\" value=\"\" ng-selected=\""
                        //+ ngModelVar
                        //+ "== null\""
                        //+ " ng-show=\""
                        //+ ngModelVar
                        //+ "== null\" >"
                        //+ placeholder
                        //+ "</option>"
                        //+ "<option ng-repeat=\"option in "
                        //+ optionArr
                        //+ "\" ng-selected='option.value==\""
                        //+ scope.$eval(ngModelVar)
                        //+ "\"' value=\"{{option.value}}\">{{option.label}}</option>"
                        //+ "</select>"
                        //+ "</div>"
                        //+ "<div ng-class='{\"bottom-line\": !"
                        //+ valFlag
                        //+ ", \"bottom-line-error\":"
                        //+ valFlag
                        //+ "}'>"
                        //+ "</div>"
                        //+ "</div>"
                        //+ "<p class=\"warning-text warning-select\" ng-show='"
                        //+ valFlag + "'> ! </p>"
                        //+ "<span ng-class='{\"dropdown\": !"
                        //+ valFlag + ", \"dropdown-error\": "
                        //+ valFlag + "}'> </span>"
                        + "</div>";
                break;

            case "dropdown_optional":
                if (_.isUndefined(optionArr)
                        || optionArr.length === 0) {
                    return errorTemplate;
                }

                resTemplate = firstline
/*                        + "<div ng-class='{\"left-line\": !"
                        + valFlag
                        + ", \"left-line-error\":"
                        + valFlag
                        + "}'>"
                        + "</div>"
                        + "<div class=\"input-body\">"*/
                        + "<md-input-container class=\"input-body2 input-body2-dropdown\">"
                        + "<label>"
                        + placeholder
                        + "</label>"
                        + "<md-select id=\"" 
                        + ngModelVar 
                        + "\" ng-class='{\"\": !"
                        + valFlag
                        + ", \"bottom-line-error\":"
                        + valFlag
                        + "}' class=\"fin-input fin-select\" ng-model='"
                        + ngModelVar
                        + "'"
                        + "ng-style='"
                        + ngModelVar
                        + "== null || "
                        + ngModelVar
                        + " == \"\" ? {\"font-size\": \"14px\"} : {\"color\": \"initial\"}' "
                        + (_.isUndefined(readOnlyFlag) ? ""
                                : " disabled")
                        + (_.isUndefined(ngChange) ? ""
                                : " ng-change=" + ngChange)
                        + ">"
                        /*+ "<option class=\"place-holder-select\" value=\"\" ng-selected=\""
                        + ngModelVar
                        + "== null\">"
                        + placeholder
                        + "</option>"*/
                        + "<md-option ng-repeat=\"option in "
                        + optionArr
                        + "\" ng-selected='option.value==\""
                        + scope.$eval(ngModelVar)
                        + "\"' value=\"{{option.value}}\">{{option.label}}</md-option>"
                        + "</md-select>"
                        + "</md-input-container>"
                        /*+ "<div ng-class='{\"\": !"
                        + valFlag
                        + ", \"bottom-line-error\":"
                        + valFlag
                        + "}'>"
                        + "</div>"
                        + "</div>"
                        + "<p class=\"warning-text warning-select\" ng-show='"
                        + valFlag + "'> ! </p>"
                        + "<span ng-class='{\"dropdown\": !"
                        + valFlag + ", \"dropdown-error\": "
                        + valFlag + "}'> </span>"*/
                        + "</div>";
                break;
            case "phone":
            	
            	var phoneMask="";
            	
            	if(countryDropdown=="true"){
            		var ngCountryCodeModel = ngModelVar+"__countryCode__";
            		if(actualField){
            			ngCountryCodeModel = actualField+"__countryCode__";
            		}
                	
                	//scope.countryArr = [{"label": "India(+91)", "value": "91"},{"label": "United States(+1)", "value": "1"}];
                	scope.countryArr = PhoneFormatConfigProcessor.getAllCountriesConfig();
                	var countryModel = $parse(ngCountryCodeModel);
            		var country = countryModel(scope);
            		
            		var phoneMaskModelName = ngModelVar+"__phoneMask__";
            		
            		if(actualField){
            			phoneMaskModelName = actualField+"__phoneMask__";
            		}
                	
                	phoneMask = "{{"+phoneMaskModelName+"}}";
                	
                	var prevVal = scope.$eval(ngModelVar);
                	if(prevVal){
                		prevVal = prevVal + "";
                		var countryCode = parseInt(prevVal.substring(0,3));
                		var phoneVal = prevVal.substring(3);
                		//validate the country code, if its invalid do not put country code 
                		if(PhoneFormatConfigProcessor.validateCountry(countryCode)){
                			countryModel.assign(scope,""+countryCode);
                			
                			var phoneMaskVal = PhoneFormatConfigProcessor.getPhoneFormatConfig(""+countryCode).FORMAT;
                    		var phoneMaskModel = $parse(phoneMaskModelName);
                    		var phoneMaskValue = phoneMaskModel(scope);
                    		if(!phoneMaskValue){
                    			phoneMaskModel.assign(scope,phoneMaskVal);
                    		}
                		}
                	}else{
                		var countryCode = PhoneFormatConfigProcessor.getCurrentCountry();
                		countryModel.assign(scope,""+countryCode);
                		
                		var phoneMaskVal = PhoneFormatConfigProcessor.getPhoneFormatConfig(""+countryCode).FORMAT;
                		var phoneMaskModel = $parse(phoneMaskModelName);
                		var phoneMaskValue = phoneMaskModel(scope);
                		if(!phoneMaskValue){
                			phoneMaskModel.assign(scope,phoneMaskVal);
                		}
                	}
                	
                	firstline = "<div class=\"fin-input-container\" layout=\"row\"><div flex=\"30\">";
                	var countrySelect = "<md-input-container class=\"input-body2\">"
						+ "<label>"
						+ "Country Code"
						+ "</label>"
						+ "<md-select "
						+(_.isUndefined(readOnlyFlag) ? "" : "disabled ")
						+"id=\""
						+ ngCountryCodeModel
						+ "\" ng-class='{\"\": !"
						+ valFlag
						+ ", \"bottom-line-error\":"
						+ valFlag
						+ "}' class=\"fin-input fin-select\" ng-model='"
						+ ngCountryCodeModel
						+ "'"
                        + "ng-style='"
                        + ngCountryCodeModel
                        + "== null || "
                        + ngCountryCodeModel
                        + " == \"\" ? {\"font-size\": \"14px\"} : {\"color\": \"initial\"}' "
                        + "ng-change=\"reFormatPhoneNumber('"+ngCountryCodeModel+"','"+ngModelVar+"'"+(_.isUndefined(actualField) ? "" : ",'" + actualField+"'")+")\""
                        + ">"
                        + "<md-option ng-repeat=\"option in countryArr"
                        + "\" ng-selected='option.value==\""
                        + scope.$eval(ngCountryCodeModel)
                        + "\"' value=\"{{option.value}}\">{{option.label}}</md-option>"
                        + "</md-select>"
                        + "</md-input-container>"
                        +"</div>"
                        + "<div flex=\"70\">";
                	firstline = firstline + countrySelect;
            	}else{
            		var countryCode = PhoneFormatConfigProcessor.getCurrentCountry();
            		
            		var phoneMaskVal = PhoneFormatConfigProcessor.getPhoneFormatConfig(""+countryCode).FORMAT;
            		phoneMask=phoneMaskVal;
            		/*var phoneMaskModel = $parse(phoneMaskModelName);
            		var phoneMaskValue = phoneMaskModel(scope);
            		if(!phoneMaskValue){
            			phoneMaskModel.assign(scope,phoneMaskVal);
            		}*/
            	}
            	
            	resTemplate = 
                    firstline
                        + "<md-input-container class=\"input-body2\">"
                        + "<label style=\" display: block; \">"
                        + placeholder
                        + "</label>"
                        + "<input phone-mask=\""+phoneMask+"\" autocomplete=\"off\" id=\"" 
                        + ngModelVar 
                        + "\" ng-class='{\"\": !"
                        + valFlag + ", \"bottom-line-error\":"
                        + valFlag + "}' class=\"fin-input\" type=\"tel\" id=\""
                        + ngModelVar
                        + "\"  ng-model=\""
                        + ngModelVar
                        + "\""
                        + (_.isUndefined(readOnlyFlag) ? ""
                                : " disabled")
                        + (_.isUndefined(ngChange) ? ""
                                : " ng-change=" + ngChange) 
                        + (_.isUndefined(actualField) ? ""
                                : " actual-field=" + actualField)
                        + (_.isUndefined(countryDropdown) ? ""
                                : " country-dropdown=" + countryDropdown) + ">"
                        + "</md-input-container></div></div>";          
                break; 
            default:
                return errorTemplate;
        }

        return resTemplate;
    };

  var getTemplate = function(scope, displayRow, directiveType, ngModelVar, placeholder, valFlag, optionArr, readOnlyFlag, maxLength, ngChange, relatedField,dateValue,errMsg) {
    
    var errorTemplate = 
      "<div class=\"fin-input-container\">"+
        "<p class=\"error-text\"> ERROR! " + directiveType + "</p>"+
      "</div>";
    
    if (_.isUndefined(displayRow)){
      displayRow = "full";
    } 

    if (_.isUndefined(directiveType)){
      directiveType = "text";
    } 

    if (_.isUndefined(ngModelVar)){
      ngModelVar = "null";
    } 

    if (_.isUndefined(placeholder)){
      placeholder = "";
    }

    if (_.isUndefined(valFlag)){
      valFlag = "null";
    }
    
    if (_.isUndefined(relatedField)){
    	relatedField = "";
    }
    if (_.isUndefined(dateValue)){
    	dateValue = "";
     }
    var firstline = "";
    switch(displayRow) {
      case "full":
        firstline = "<div class=\"fin-input-container\">";
        break;
      case "half1":
        firstline = "<div class=\"fin-input-container fin-input-container-half1\">";
        break; 
      case "half2":
        firstline = "<div class=\"fin-input-container fin-input-container-half2\">";
        break;                    
      case "qtr1":
        firstline = "<div class=\"fin-input-container fin-input-container-qtr1\">";
        break;                    
      default: return errorTemplate; 
    }     
      
      var resTemplate = "";
      switch(directiveType) {
        case "text":
          resTemplate = 
              firstline +
                "<div ng-class='{\"left-line\": !" + valFlag + ", \"left-line-error\":" + valFlag + "}'>"+
                "</div>"+
                "<div class=\"input-body\">" +
                  "<div class=\"input-body2\">" +
                    "<input autocorrect=\"off\" clear-warning=\""  + ngModelVar + "\" ng-cut=\"$event.preventDefault()\" ng-copy=\"$event.preventDefault()\" ng-paste=\"$event.preventDefault()\" input-remittance-restricted-special-character class=\"fin-input\" type=\"text\" ng-model=\"" + ngModelVar + "\" placeholder=\"" + placeholder + "\"" + (_.isUndefined(readOnlyFlag) ? "" : " disabled") + (_.isUndefined(maxLength) ? "" : " maxlength=" + maxLength) + (_.isUndefined(ngChange) ? "" : " ng-blur=" + ngChange) + ">" +
                  "</div>" +
                  "<div ng-class='{\"bottom-line\": !" + valFlag + ", \"bottom-line-error\":" + valFlag + "}'>" +
                  "</div> <div ng-hide='" + valFlag + "==null' class=\"rakErrorMsg\"> {{"+valFlag+"}} \</div>" +
                "</div>" +
                "<p class=\"warning-text\" ng-show='" + valFlag + "'> ! </p>" +
                "<div ng-class='{\"right-line\": !" + valFlag + ", \"right-line-error\":" + valFlag + "}'>" +
                "</div>" +
              "</div>";          
          break;
        case "text_noEdited":
            resTemplate = 
                firstline +
                  "<div ng-class='{\"left-line\": !" + valFlag + ", \"left-line-error\":" + valFlag + "}'>"+
                  "</div>"+
                  "<div class=\"input-body\">" +
                    "<div class=\"input-body2 input-body2-dropdown\">" +
                      "<input autocorrect=\"off\" clear-warning=\""  + ngModelVar + "\" ng-cut=\"$event.preventDefault()\" ng-copy=\"$event.preventDefault()\" ng-paste=\"$event.preventDefault()\" input-remittance-restricted-special-character class=\"fin-input\" type=\"text\" ng-model=\"" + ngModelVar + "\" placeholder=\"" + placeholder + "\"" + (_.isUndefined(readOnlyFlag) ? "" : " readOnly") +(_.isUndefined(maxLength) ? "" : " maxlength=" + maxLength) + (_.isUndefined(ngChange) ? "" : " ng-blur=" + ngChange) + ">" +
                    "</div>" +
                    "<div ng-class='{\"bottom-line\": !" + valFlag + ", \"bottom-line-error\":" + valFlag + "}'>" +
                    "</div> <div ng-hide='" + valFlag + "==null' class=\"rakErrorMsg\"> {{"+valFlag+"}} \</div>" +
                  "</div>" +
                  "<p class=\"warning-text\" ng-show='" + valFlag + "'> ! </p>" +
                  "<div ng-class='{\"right-line\": !" + valFlag + ", \"right-line-error\":" + valFlag + "}'>" +
                  "</div>" +
                "</div>";          
            break;
        case "textWithBlank":
            resTemplate = 
                firstline +
                  "<div ng-class='{\"left-line\": !" + valFlag + ", \"left-line-error\":" + valFlag + "}'>"+
                  "</div>"+
                  "<div class=\"input-body\">" +
                    "<div class=\"input-body2\">" +
                      "<input autocorrect=\"off\" clear-warning=\""  + ngModelVar + "\" ng-cut=\"$event.preventDefault()\" ng-copy=\"$event.preventDefault()\" ng-paste=\"$event.preventDefault()\"  switch-box class=\"fin-input\" type=\"text\" id=\"" + ngModelVar +"\" ng-model=\"rakHome.textModelWithSpace\" model-name=\""+ngModelVar+"\" placeholder=\"" + placeholder + "\"" + (_.isUndefined(readOnlyFlag) ? "" : " disabled") + (_.isUndefined(maxLength) ? "" : " maxlength=" + maxLength) + (_.isUndefined(ngChange) ? "" : " ng-change=" + ngChange) + ">" +
                    "</div>" +
                    "<div ng-class='{\"bottom-line\": !" + valFlag + ", \"bottom-line-error\":" + valFlag + "}'>" +
                    "</div> <div ng-hide='" + valFlag + "==null' class=\"rakErrorMsg\"> {{"+valFlag+"}} \</div>" +
                  "</div>" +
                  "<p class=\"warning-text\" ng-show='" + valFlag + "'> ! </p>" +
                  "<div ng-class='{\"right-line\": !" + valFlag + ", \"right-line-error\":" + valFlag + "}'>" +
                  "</div>" +
                "</div>";          
            break;
        case "text_restriction":
            resTemplate = 
                firstline +
                  "<div ng-class='{\"left-line\": !" + valFlag + ", \"left-line-error\":" + valFlag + "}'>"+
                  "</div>"+
                  "<div class=\"input-body\">" +
                    "<div class=\"input-body2\">" +
                      "<input autocorrect=\"off\" clear-warning=\""  + ngModelVar + "\" ng-cut=\"$event.preventDefault()\" ng-copy=\"$event.preventDefault()\" ng-paste=\"$event.preventDefault()\" input-remittance-restricted-special-character class=\"fin-input\" type=\"text\" ng-model=\"" + ngModelVar + "\" placeholder=\"" + placeholder + "\"" + (_.isUndefined(readOnlyFlag) ? "" : " disabled") + (_.isUndefined(maxLength) ? "" : " maxlength=" + maxLength) + (_.isUndefined(ngChange) ? "" : " ng-blur=" + ngChange) + ">" +
                    "</div>" +
                    "<div ng-class='{\"bottom-line\": !" + valFlag + ", \"bottom-line-error\":" + valFlag + "}'>" +
                    "</div> <div ng-hide='" + valFlag + "==null' class=\"rakErrorMsg\"> {{"+valFlag+"}} \</div>" +
                  "</div>" +
                  "<p class=\"warning-text\" ng-show='" + valFlag + "'> ! </p>" +
                  "<div ng-class='{\"right-line\": !" + valFlag + ", \"right-line-error\":" + valFlag + "}'>" +
                  "</div>" +
                "</div>";          
            break;
        case "text_max":
            resTemplate = 
                firstline +
                  "<div ng-class='{\"left-line\": !" + valFlag + ", \"left-line-error\":" + valFlag + "}'>" +
                  "</div>" +
                  "<div class=\"input-body\">" +
                    "<div class=\"input-body2\">" +
                      "<input autocorrect=\"off\" clear-warning=\""  + ngModelVar + "\" ng-cut=\"$event.preventDefault()\" ng-copy=\"$event.preventDefault()\" ng-paste=\"$event.preventDefault()\" text-max-input input-remittance-restricted-special-character class=\"fin-input\" type=\"text\" ng-model=\"" + ngModelVar + "\" placeholder=\"" + placeholder + "\"" + (_.isUndefined(readOnlyFlag) ? "" : " disabled") + (_.isUndefined(maxLength) ? "" : " maxlength=" + maxLength) + (_.isUndefined(ngChange) ? "" : " ng-change=" + ngChange) + ">" +
                    "</div>" +
                    "<div ng-class='{\"bottom-line\": !" + valFlag + ", \"bottom-line-error\":" + valFlag + "}'>" +
                    "</div> <div ng-hide='" + valFlag + "==null' class=\"rakErrorMsg\"> {{"+valFlag+"}} \</div>" +
                  "</div>" +
                  "<p class=\"warning-text\" ng-show='" + valFlag + "'> ! </p>" +
                  "<div ng-class='{\"right-line\": !" + valFlag + ", \"right-line-error\":" + valFlag + "}'>" +
                  "</div>" +
                "</div>";          
            break;
            
        case "text_noSpace":
            resTemplate = 
                firstline +
                  "<div ng-class='{\"left-line\": !" + valFlag + ", \"left-line-error\":" + valFlag + "}'>" +
                  "</div>" +
                  "<div class=\"input-body\">" +
                    "<div class=\"input-body2\">" +
                      "<input autocorrect=\"off\" clear-warning=\""  + ngModelVar + "\" ng-cut=\"$event.preventDefault()\" ng-copy=\"$event.preventDefault()\" ng-paste=\"$event.preventDefault()\" input-no-space class=\"fin-input\" type=\"text\" ng-model=\"" + ngModelVar + "\" placeholder=\"" + placeholder + "\"" + (_.isUndefined(readOnlyFlag) ? "" : " disabled") + (_.isUndefined(maxLength) ? "" : " maxlength=" + maxLength) + (_.isUndefined(ngChange) ? "" : " ng-change=" + ngChange) + ">" +
                    "</div>" +
                    "<div ng-class='{\"bottom-line\": !" + valFlag + ", \"bottom-line-error\":" + valFlag + "}'>" +
                    "</div>" +
                  "</div>" +
                  "<p class=\"warning-text\" ng-show='" + valFlag + "'> ! </p>" +
                  "<div ng-class='{\"right-line\": !" + valFlag + ", \"right-line-error\":" + valFlag + "}'>" +
                  "</div>" +
                "</div>";          
            break;

        case "text_noSpecialCharacter":
            resTemplate = 
                firstline +
                  "<div ng-class='{\"left-line\": !" + valFlag + ", \"left-line-error\":" + valFlag + "}'>" +
                  "</div>" +
                  "<div class=\"input-body\">" +
                    "<div class=\"input-body2\">" +
                      "<input autocorrect=\"off\" autocomplete=\"off\" clear-warning=\""  + ngModelVar + "\" ng-cut=\"$event.preventDefault()\" ng-copy=\"$event.preventDefault()\" ng-paste=\"$event.preventDefault()\" input-no-special-character class=\"fin-input\" type=\"text\" ng-model=\"" + ngModelVar + "\" placeholder=\"" + placeholder + "\"" + (_.isUndefined(readOnlyFlag) ? "" : " disabled") + (_.isUndefined(maxLength) ? "" : " maxlength=" + maxLength) + (_.isUndefined(ngChange) ? "" : " ng-change=" + ngChange) + ">"+
                    "</div>" +
                    "<div ng-class='{\"bottom-line\": !" + valFlag + ", \"bottom-line-error\":" + valFlag + "}'>" +
                    "</div><div ng-hide='" + valFlag + "==null' class=\"rakErrorMsg\"> {{"+valFlag+"}} \</div>" +
                  "</div>" +
                  "<p class=\"warning-text\" ng-show='" + valFlag + "'> ! </p>" +
                  "<div ng-class='{\"right-line\": !" + valFlag + ", \"right-line-error\":" + valFlag + "}'>" +
                  "</div>" +
                "</div>";          
            break;
        
        case "text_noSpecialCharacterWithSpace":
            resTemplate = 
                firstline +
                  "<div ng-class='{\"left-line\": !" + valFlag + ", \"left-line-error\":" + valFlag + "}'>" +
                  "</div>" +
                  "<div class=\"input-body\">" +
                    "<div class=\"input-body2\">" +
                      "<input autocorrect=\"off\" autocomplete=\"off\" clear-warning=\""  + ngModelVar + "\" ng-cut=\"$event.preventDefault()\" ng-copy=\"$event.preventDefault()\" ng-paste=\"$event.preventDefault()\" input-no-special-character-with-space class=\"fin-input\" type=\"text\" ng-model=\"" + ngModelVar + "\" placeholder=\"" + placeholder + "\"" + (_.isUndefined(readOnlyFlag) ? "" : " disabled") + (_.isUndefined(maxLength) ? "" : " maxlength=" + maxLength) + (_.isUndefined(ngChange) ? "" : " ng-change=" + ngChange) + ">"+
                    "</div>" +
                    "<div ng-class='{\"bottom-line\": !" + valFlag + ", \"bottom-line-error\":" + valFlag + "}'>" +
                    "</div> <div ng-hide='" + valFlag + "==null' class=\"rakErrorMsg\"> {{"+valFlag+"}} \</div>" +
                  "</div>" +
                  "<p class=\"warning-text\" ng-show='" + valFlag + "'> ! </p>" +
                  "<div ng-class='{\"right-line\": !" + valFlag + ", \"right-line-error\":" + valFlag + "}'>" +
                  "</div>" +
                "</div>";          
            break;
			
            ///added for special resricted char at benf module
            
            
        case "text_restrictedSpecialCharacter":
            resTemplate = 
                firstline +
                  "<div ng-class='{\"left-line\": !" + valFlag + ", \"left-line-error\":" + valFlag + "}'>" +
                  "</div>" +
                  "<div class=\"input-body\">" +
                    "<div class=\"input-body2\">" +
                      "<input autocomplete=\"off\" clear-warning=\""  + ngModelVar + "\" onpaste=\"return false;\" input-remittance-restricted-special-character class=\"fin-input\" type=\"text\" ng-model=\"" + ngModelVar + "\" placeholder=\"" + placeholder + "\"" + (_.isUndefined(readOnlyFlag) ? "" : " disabled") + (_.isUndefined(maxLength) ? "" : " maxlength=" + maxLength) + (_.isUndefined(ngChange) ? "" : " ng-change=" + ngChange) + ">"+
                    "</div>" +
                    "<div ng-class='{\"bottom-line\": !" + valFlag + ", \"bottom-line-error\":" + valFlag + "}'>" +
                    "</div> <div ng-hide='" + valFlag + "==null' class=\"rakErrorMsg\"> {{"+valFlag+"}} \</div>" +
                  "</div>" +
                  "<p class=\"warning-text\" ng-show='" + valFlag + "'> ! </p>" +
                  "<div ng-class='{\"right-line\": !" + valFlag + ", \"right-line-error\":" + valFlag + "}'>" +
                  "</div>" +
                "</div>";          
            break;
			
			
			case "text_dynamic_disable":
							resTemplate = firstline
									+ "<div ng-class='{\"left-line\": !"
									+ valFlag
									+ ", \"left-line-error\":"
									+ valFlag
									+ "}'> \
                         </div> \
                         <div class=\"input-body\"> \
                           <div class=\"input-body2\"> \
                             <input ng-cut=\"$event.preventDefault()\" autocorrect=\"off\" ng-copy=\"$event.preventDefault()\" ng-paste=\"$event.preventDefault()\" class=\"fin-input\" type=\"text\" ng-disabled=\""
									+ readOnlyFlag
									+ "\" ng-model=\""
									+ ngModelVar
									+ "\" placeholder=\""
									+ placeholder
									+ "\""
									+ (_.isUndefined(maxLength) ? ""
											: " maxlength=" + maxLength)
									+ (_.isUndefined(ngChange) ? ""
											: " ng-change=" + ngChange)
									+ "> \
                           </div> \
                           <div ng-class='{\"bottom-line\": !"
									+ valFlag
									+ ", \"bottom-line-error\":"
									+ valFlag
									+ "}'> \
                           </div> \
                         </div> \
                         <p class=\"warning-text\" ng-show='"
									+ valFlag
									+ "'> ! </p> \
                         <div ng-class='{\"right-line\": !"
									+ valFlag
									+ ", \"right-line-error\":"
									+ valFlag
									+ "}'> \
                         </div> \
                       </div>";
							break;

						case "number_dynamic_disable":
							resTemplate = firstline
									+ "<div ng-class='{\"left-line\": !"
									+ valFlag
									+ ", \"left-line-error\":"
									+ valFlag
									+ "}'> \
                         </div> \
                         <div class=\"input-body\"> \
                           <div class=\"input-body2\"> \
                             <input onpaste=\"return false;\" number-input-validate class=\"fin-input\" type=\"number\" min=\"0\" pattern=\"[0-9]*\"  id=\""
									+ ngModelVar
									+ "\" ng-disabled=\""
									+ readOnlyFlag
									+ "\" ng-model=\""
									+ ngModelVar
									+ "\" placeholder=\""
									+ placeholder
									+ "\""
									+ (_.isUndefined(maxLength) ? ""
											: " ng-maxlength=" + maxLength)
									+ (_.isUndefined(ngChange) ? ""
											: " ng-change=" + ngChange)
									+ "> \
                           </div> \
                           <div ng-class='{\"bottom-line\": !"
									+ valFlag
									+ ", \"bottom-line-error\":"
									+ valFlag
									+ "}'> \
                           </div> \
                         </div> \
                         <p class=\"warning-text\" ng-show='"
									+ valFlag
									+ "'> ! </p> \
                         <div ng-class='{\"right-line\": !"
									+ valFlag
									+ ", \"right-line-error\":"
									+ valFlag
									+ "}'> \
                         </div> \
                       </div>";
							break;
            
        case "text_noSpecialCharacterAndNum":
            resTemplate = 
                firstline +
                  "<div ng-class='{\"left-line\": !" + valFlag + ", \"left-line-error\":" + valFlag + "}'>" +
                  "</div>" +
                  "<div class=\"input-body\">" +
                    "<div class=\"input-body2\">" +
                      "<input autocorrect=\"off\" autocomplete=\"off\" clear-warning=\""  + ngModelVar + "\" ng-cut=\"$event.preventDefault()\" ng-copy=\"$event.preventDefault()\" ng-paste=\"$event.preventDefault()\" input-no-special-char-and-number class=\"fin-input\" type=\"text\" ng-model=\"" + ngModelVar + "\" placeholder=\"" + placeholder + "\"" + (_.isUndefined(readOnlyFlag) ? "" : " disabled") + (_.isUndefined(maxLength) ? "" : " maxlength=" + maxLength) + (_.isUndefined(ngChange) ? "" : " ng-change=" + ngChange) + ">"+
                    "</div>" +
                    "<div ng-class='{\"bottom-line\": !" + valFlag + ", \"bottom-line-error\":" + valFlag + "}'>" +
                    "</div> <div ng-hide='" + valFlag + "==null' class=\"rakErrorMsg\"> {{"+valFlag+"}} \</div>" +
                  "</div>" +
                  "<p class=\"warning-text\" ng-show='" + valFlag + "'> ! </p>" +
                  "<div ng-class='{\"right-line\": !" + valFlag + ", \"right-line-error\":" + valFlag + "}'>" +
                  "</div>" +
                "</div>";          
            break;
        
        case "password_text":
          resTemplate = 
              firstline +
                "<div ng-class='{\"left-line\": !" + valFlag + ", \"left-line-error\":" + valFlag + "}'>" +
                "</div>" +
                "<div class=\"input-body\">" +
                  "<div class=\"input-body2\">" +
                    "<input autocomplete=\"off\" clear-warning=\""  + ngModelVar + "\" onpaste=\"return false;\"  password-input-validate class=\"fin-input\" type=\"password\" ng-model=\"" + ngModelVar + "\" placeholder=\"" + placeholder + "\"" + (_.isUndefined(readOnlyFlag) ? "" : " disabled") + (_.isUndefined(maxLength) ? "" : " maxlength=" + maxLength) + (_.isUndefined(ngChange) ? "" : " ng-change=" + ngChange) + ">"+
                  "</div>" +
                  "<div ng-class='{\"bottom-line\": !" + valFlag + ", \"bottom-line-error\":" + valFlag + "}'>" +
                  "</div> <div ng-hide='" + valFlag + "==null' class=\"rakErrorMsg\"> {{"+valFlag+"}} \</div>" +
                "</div>" +
                "<p class=\"warning-text\" ng-show='" + valFlag + "'> ! </p>" +
                "<div ng-class='{\"right-line\": !" + valFlag + ", \"right-line-error\":" + valFlag + "}'>" +
                "</div>" +
              "</div>";    
//          $rootScope.$apply($rootScope.isPassword=true);
          break;
        case "password_num":
          resTemplate = 
              firstline +
                "<div ng-class='{\"left-line\": !" + valFlag + ", \"left-line-error\":" + valFlag + "}'>" +
                "</div>" +
                "<div class=\"input-body\">" +
                  "<div class=\"input-body2\">" +
                  "<input autocomplete=\"off\" clear-warning=\""  + ngModelVar + "\" onpaste=\"return false;\" class=\"fin-input\" number-input-validate  type=\"tel\" min=\"0\" pattern=\"[0-9]*\" data-type=\"otp\"  ng-model=\"" + ngModelVar + "\" placeholder=\"" + placeholder + "\" " + (_.isUndefined(readOnlyFlag) ? "" : " disabled") + (_.isUndefined(maxLength) ? "" : " maxlength=" + maxLength) + (_.isUndefined(ngChange) ? "" : " ng-change=" + ngChange) + " ng-model-options=\"{updateOn:'blur'}\">" +
                  "</div>" +
                  "<div ng-class='{\"bottom-line\": !" + valFlag + ", \"bottom-line-error\":" + valFlag + "}'>" +
                  "</div> <div ng-hide='" + valFlag + "==null' class=\"rakErrorMsg\"> {{"+valFlag+"}} \</div>" +
                "</div>" +
                "<p class=\"warning-text\" ng-show='" + valFlag + "'> ! </p>" +
                "<div ng-class='{\"right-line\": !" + valFlag + ", \"right-line-error\":" + valFlag + "}'>" +
                "</div>" +
              "</div>";
          break;
   /*     case "money":
          resTemplate =
              firstline +
                "<div ng-class='{\"left-line\": !" + valFlag + ", \"left-line-error\":" + valFlag + "}'>" +
                "</div>" +
                "<div class=\"input-body\">" +
                  "<div class=\"input-body2\">" +
                    "<input amount-input-validate class=\"fin-input\" type=\"tel\" ng-model=\"" + ngModelVar + "\" placeholder=\""+ placeholder + "\" onblur=\"angular.element(this).scope().formatAmountCrn('"+ngModelVar+"','"+relatedField+"'"+(ngModelVar.indexOf("$index")!=-1 ? ", angular.element(this).scope().$index" : "")+")\" "+ "  onfocus=\"angular.element(this).scope().unFormatAmount('"+ngModelVar+"','"+relatedField+"'"+(ngModelVar.indexOf("$index")!=-1 ? ", angular.element(this).scope().$index" : "")+")\" " + (_.isUndefined(readOnlyFlag) ? "" : " disabled") + (_.isUndefined(relatedField) ? "" : " related-field=" + relatedField) + (_.isUndefined(maxLength) ? "" : " ng-maxlength=" + maxLength) + (_.isUndefined(ngChange) ? "" : " ng-change=" + ngChange) + ">"+
                  "</div>" +
                  "<div ng-class='{\"bottom-line\": !" + valFlag + ", \"bottom-line-error\":" + valFlag + "}'>" +
                  "</div>" +
                "</div>" +
                "<p class=\"warning-text\" ng-show='" + valFlag + "'> ! </p>" +
                "<div ng-class='{\"right-line\": !" + valFlag + ", \"right-line-error\":" + valFlag + "}'>" +
                "</div>" +
              "</div>";
          break; */
      case "money":
        	var type="";
        	if(WL.Client.getEnvironment() == WL.Environment.IPHONE){
	        		//type="number";
        			console.log("navigator language::::::::::", navigator.language);
	        		if(navigator.language !== "en-US")
        			{
	        			type = "text";
        			}
	        		else
        			{
	        			type = "number";
        			}
	        		  resTemplate =
	                      firstline +
	                        "<div ng-class='{\"left-line\": !" + valFlag + ", \"left-line-error\":" + valFlag + "}'>" +
	                        "</div>" +
	                        "<div class=\"input-body\">" +
	                          "<div class=\"input-body2\">" +
	                            "<input autocomplete=\"off\" autocorrect=\"off\" clear-warning=\""  + ngModelVar + "\" type=\""+type+"\" onpaste=\"return false;\" amount-input-iphone-validate class=\"fin-input\"  ng-model=\"" + ngModelVar + "\" placeholder=\"" + placeholder + "\"" + (_.isUndefined(readOnlyFlag) ? "" : " disabled") + "\"" + (_.isUndefined(maxLength) ? "" : " ng-maxlength=" + maxLength)  + (_.isUndefined(ngChange) ? "" : " ng-blur=" + ngChange)+">"+
	                          "</div>" +
	                          "<div ng-class='{\"bottom-line\": !" + valFlag + ", \"bottom-line-error\":" + valFlag + "}'>" +
	                          "</div> <div ng-hide='" + valFlag + "==null' class=\"rakErrorMsg\"> {{"+valFlag+"}} \</div>" +
	                        "</div>" +
	                        "<p class=\"warning-text\" ng-show='" + valFlag + "'> ! </p>" +
	                        "<div ng-class='{\"right-line\": !" + valFlag + ", \"right-line-error\":" + valFlag + "}'>" +
	                        "</div>" +
	                      "</div>";          
	                  break;
	        	}
	        	else{
	        		type="tel";
	        		  resTemplate =
	                      firstline +
	                        "<div ng-class='{\"left-line\": !" + valFlag + ", \"left-line-error\":" + valFlag + "}'>" +
	                        "</div>" +
	                        "<div class=\"input-body\">" +
	                          "<div class=\"input-body2\">" +
	                            "<input autocomplete=\"off\" autocorrect=\"off\" clear-warning=\""  + ngModelVar + "\" type=\""+type+"\" onpaste=\"return false;\" amount-input-validate class=\"fin-input\"  ng-model=\"" + ngModelVar + "\" placeholder=\"" + placeholder + "\"" + (_.isUndefined(readOnlyFlag) ? "" : " disabled") + "\"" + (_.isUndefined(maxLength) ? "" : " ng-maxlength=" + maxLength)  + (_.isUndefined(ngChange) ? "" : " ng-blur=" + ngChange)+">"+
	                          "</div>" +
	                          "<div ng-class='{\"bottom-line\": !" + valFlag + ", \"bottom-line-error\":" + valFlag + "}'>" +
	                          "</div> <div ng-hide='" + valFlag + "==null' class=\"rakErrorMsg\"> {{"+valFlag+"}} \</div>" +
	                        "</div>" +
	                        "<p class=\"warning-text\" ng-show='" + valFlag + "'> ! </p>" +
	                        "<div ng-class='{\"right-line\": !" + valFlag + ", \"right-line-error\":" + valFlag + "}'>" +
	                        "</div>" +
	                      "</div>";          
	                  break;
	        	}
        case "number":
          resTemplate = 
              firstline +
                "<div ng-class='{\"left-line\": !" + valFlag + ", \"left-line-error\":" + valFlag + "}'>" +
                "</div>" +
                "<div class=\"input-body\">" +
                  "<div class=\"input-body2\">" +
                    "<input autocomplete=\"off\"  autocorrect=\"off\" clear-warning=\""  + ngModelVar + "\" onpaste=\"return false;\" number-input-validate class=\"fin-input\" type=\"number\" min=\"0\" pattern=\"[0-9]*\"  id=\""  + ngModelVar + "\"  ng-model=\""  + ngModelVar + "\" placeholder=\"" + placeholder + "\"" + (_.isUndefined(maxLength) ? "" : " maxlength=" + maxLength) + (_.isUndefined(readOnlyFlag) ? "" : " disabled") + (_.isUndefined(ngChange) ? "" : " ng-change=" + ngChange) + ">"+
                  "</div>" +
                  "<div ng-class='{\"bottom-line\": !" + valFlag + ", \"bottom-line-error\":" + valFlag + "}'>" +
                  "</div><div ng-hide='" + valFlag + "==null' class=\"rakErrorMsg\"> {{"+valFlag+"}} \</div>" +
                "</div>" +
                "<p class=\"warning-text\" ng-show='" + valFlag + "'> ! </p>" +
                "<div ng-class='{\"right-line\": !" + valFlag + ", \"right-line-error\":" + valFlag + "}'>" +
                "</div>" +
              "</div>";          
          break; 

  case "time_number":
        	if(WL.Client.getEnvironment() == WL.Environment.IPHONE){
        		type="number";
        		 resTemplate =
                     firstline +
                       "<div ng-class='{\"left-line\": !" + valFlag + ", \"left-line-error\":" + valFlag + "}'>" +
                       "</div>" +
                       "<div class=\"input-body\">" +
                         "<div class=\"input-body2\">" +
                           "<input autocomplete=\"off\" autocorrect=\"off\" clear-warning=\""  + ngModelVar + "\" type=\""+type+"\" onpaste=\"return false;\" time-input-iphone-validate class=\"fin-input\"  ng-model=\"" + ngModelVar + "\" placeholder=\"" + placeholder + "\"" + (_.isUndefined(readOnlyFlag) ? "" : " disabled") + "\"" + (_.isUndefined(maxLength) ? "" : " ng-maxlength=" + maxLength)  + (_.isUndefined(ngChange) ? "" : " ng-blur=" + ngChange)+">"+
                         "</div>" +
                         "<div ng-class='{\"bottom-line\": !" + valFlag + ", \"bottom-line-error\":" + valFlag + "}'>" +
                         "</div> <div ng-hide='" + valFlag + "==null' class=\"rakErrorMsg\"> {{"+valFlag+"}} \</div>" +
                       "</div>" +
                       "<p class=\"warning-text\" ng-show='" + valFlag + "'> ! </p>" +
                       "<div ng-class='{\"right-line\": !" + valFlag + ", \"right-line-error\":" + valFlag + "}'>" +
                       "</div>" +
                     "</div>";          
                 break;
       	}
       	else{
       		type="tel";
       		  resTemplate =
                     firstline +
                       "<div ng-class='{\"left-line\": !" + valFlag + ", \"left-line-error\":" + valFlag + "}'>" +
                       "</div>" +
                       "<div class=\"input-body\">" +
                         "<div class=\"input-body2\">" +
                           "<input autocomplete=\"off\" autocorrect=\"off\" clear-warning=\""  + ngModelVar + "\" type=\""+type+"\" onpaste=\"return false;\" time-input-validate class=\"fin-input\"  ng-model=\"" + ngModelVar + "\" placeholder=\"" + placeholder + "\"" + (_.isUndefined(readOnlyFlag) ? "" : " disabled") + "\"" + (_.isUndefined(maxLength) ? "" : " ng-maxlength=" + maxLength)  + (_.isUndefined(ngChange) ? "" : " ng-blur=" + ngChange)+">"+
                         "</div>" +
                         "<div ng-class='{\"bottom-line\": !" + valFlag + ", \"bottom-line-error\":" + valFlag + "}'>" +
                         "</div> <div ng-hide='" + valFlag + "==null' class=\"rakErrorMsg\"> {{"+valFlag+"}} \</div>" +
                       "</div>" +
                       "<p class=\"warning-text\" ng-show='" + valFlag + "'> ! </p>" +
                       "<div ng-class='{\"right-line\": !" + valFlag + ", \"right-line-error\":" + valFlag + "}'>" +
                       "</div>" +
                     "</div>";          
                 break;
       	}
        case "number_card":
            resTemplate = 
                firstline +
                  "<div ng-class='{\"left-line\": !" + valFlag + ", \"left-line-error\":" + valFlag + "}'>" +
                  "</div>" +
                  "<div class=\"input-body\">" +
                    "<div class=\"input-body2\">" +
                      "<input autocomplete=\"off\" clear-warning=\""  + ngModelVar + "\" onpaste=\"return false;\" number-input-validate class=\"fin-input\" type=\"tel\" min=\"0\" pattern=\"[0-9]*\" ng-model=\""  + ngModelVar + "\" placeholder=\"" + placeholder + "\"" + (_.isUndefined(maxLength) ? "" : " maxlength=" + maxLength) + (_.isUndefined(readOnlyFlag) ? "" : " disabled") + (_.isUndefined(ngChange) ? "" : " ng-blur=" + ngChange)+">"+
                    "</div>" +
                    "<div ng-class='{\"bottom-line\": !" + valFlag + ", \"bottom-line-error\":" + valFlag + "}'>" +
                    "</div> <div ng-hide='" + valFlag + "==null' class=\"rakErrorMsg\"> {{"+valFlag+"}} \</div>" +
                  "</div>" +
                  "<p class=\"warning-text\" ng-show='" + valFlag + "'> ! </p>" +
                  "<div ng-class='{\"right-line\": !" + valFlag + ", \"right-line-error\":" + valFlag + "}'>" +
                  "</div>" +
                "</div>";          
            break; 
        case "date":
          resTemplate = 
              firstline +
                "<div ng-class='{\"left-line\": !" + valFlag + ", \"left-line-error\":" + valFlag + "}'>" +
                "</div>" +
                "<div class=\"input-body\">" +
                  "<span class=\"app app-calendar\"  ng-class='{\"icon-calendar-input\": !" + valFlag + ", \"icon-calendar-input-error\":" + valFlag + "}' ng-style='" + ngModelVar + " == null || " + ngModelVar + " == \"\" ? {\"top\": \"-0.2em\"} : {\"top\": \"-0.95em\"}'></span>"+
                  "<div class=\"place-holder\" ng-show='" + ngModelVar + " == null || " + ngModelVar + " == \"\"'>"+ 
                    "<span>" + placeholder + "</span>"+
                  "</div>" +
                  "<div class=\"input-body2 date-adjust\">"+
                    "<input datepicker=\"\" onpaste=\"return false;\" class=\"fin-input "+ (displayRow == "full" ? "" : " fin-input-date") + "\" type=\"text\" ng-model=\"" + ngModelVar + "\" '" + (_.isUndefined(readOnlyFlag) ? "" : " disabled") + (_.isUndefined(ngChange) ? "" : " ng-change=" + ngChange) +" ng-value=\""+ dateValue+ "\""+">"+
                  "</div>" +
                  "<div ng-class='{\"bottom-line\": !" + valFlag + ", \"bottom-line-error\":" + valFlag + "}'>" +
                  "</div> <div ng-hide='" + valFlag + "==null' class=\"rakErrorMsg\"> {{"+valFlag+"}} \</div>" +
                "</div>" +
                "<p class=\"warning-date\" ng-show='" + valFlag + "'></p>"+
                "<div ng-class='{\"right-line\": !" + valFlag + ", \"right-line-error\":" + valFlag + "}'>" +
                "</div>" +
              "</div>";

          break; 
        case "label": 
          resTemplate = 
              firstline +
                "<div ng-class='{\"left-line\": !" + valFlag + ", \"left-line-error\":" + valFlag + "}'>" +
                "</div>" +
                "<div class=\"input-body\">" +
                  "<div class=\"place-holder\" ng-show=\"" + ngModelVar + " == null\">"+
                    "<span>" + placeholder + "</span>"+
                  "</div>" +
                  "<div class=\"label-holder\" ng-hide=\"" + ngModelVar + " == null\">"+
                    "<span> {{" + ngModelVar + "}}</span>"+
                  "</div>" +
                  "<div ng-class='{\"bottom-line\": !" + valFlag + ", \"bottom-line-error\":" + valFlag + "}'>" +
                  "</div>" +
                "</div>" +
                "<p class=\"warning-text warning-select\" ng-show='" + valFlag + "'> ! </p>" +
                "<span ng-class='{\"dropdown\": !" + valFlag + ", \"dropdown-error\": " + valFlag + "}'> </span>"+
              "</div>";
          break;          
        case "dropdown":
          if (_.isUndefined(optionArr) || optionArr.length === 0) {
            return errorTemplate;             
          }

          resTemplate = 
              firstline +
                "<div ng-class='{\"left-line\": !" + valFlag + ", \"left-line-error\":" + valFlag + "}'>" +
                "</div>" +
                "<div class=\"input-body\">" +
                  "<div class=\"input-body2 input-body2-dropdown\">"+
                    "<select dropdownpicker=\"\" title=\""+placeholder+"\" class=\"fin-input fin-select\" ng-model='" + ngModelVar + "'"+
                      "ng-style='" + ngModelVar + "== null || " + ngModelVar + " == \"\" ? {\"font-size\": \"14px\"} : {\"color\": \"initial\"}' " + (_.isUndefined(readOnlyFlag) ? "" : " disabled") + (_.isUndefined(ngChange) ? "" : " ng-change=" + ngChange) + ">"+
                      "<option class=\"place-holder-select\" value=\"\"  ng-selected='option.value==\"\"' disabled style=\"display:block !important;\" ng-show=\"" + ngModelVar + "== null\">" + placeholder + "</option>"+
                      "<option ng-repeat=\"option in " + optionArr + "\" ng-selected='option.value==\"" + scope.$eval(ngModelVar) + "\"' value=\"{{option.value}}\">{{option.label}}</option>"+
                    "</select>"+
                  "</div>" +
                  "<div ng-class='{\"bottom-line\": !" + valFlag + ", \"bottom-line-error\":" + valFlag + "}'>" +
                  "</div><div ng-hide='" + valFlag + "==null' class=\"rakErrorMsg\"> {{"+valFlag+"}} </div>" +
                "</div>" +
              /*  "<p class=\"warning-text warning-select\" ng-show='" + valFlag + "'> ! </p>" +*/
                "<span ng-class='{\"dropdown\": !" + valFlag + ", \"dropdown-error\": " + valFlag + "}'> </span>"+
              "</div>";           
          break;  
          
        case "dropdown_optional":
            if (_.isUndefined(optionArr) || optionArr.length === 0) {
              return errorTemplate;             
            }

            resTemplate = 
                firstline +
                  "<div ng-class='{\"left-line\": !" + valFlag + ", \"left-line-error\":" + valFlag + "}'>" +
                  "</div>" +
                  "<div class=\"input-body\">" +
                    "<div class=\"input-body2 input-body2-dropdown\">"+
                      "<select class=\"fin-input fin-select\" ng-model='" + ngModelVar + "'"+
                        "ng-style='" + ngModelVar + "== null || " + ngModelVar + " == \"\" ? {\"font-size\": \"14px\"} : {\"color\": \"initial\"}' " + (_.isUndefined(readOnlyFlag) ? "" : " disabled") + (_.isUndefined(ngChange) ? "" : " ng-change=" + ngChange) + ">"+
                        "<option class=\"place-holder-select\" value=\"\" ng-selected=\"" + ngModelVar + "== null\">"  + placeholder + "</option>"+
                        "<option ng-repeat=\"option in " + optionArr + "\" ng-selected='option.value==\"" + scope.$eval(ngModelVar) + "\"' value=\"{{option.value}}\">{{option.label}}</option>"+
                      "</select>"+
                    "</div>" +
                    "<div ng-class='{\"bottom-line\": !" + valFlag + ", \"bottom-line-error\":" + valFlag + "}'>" +
                    "</div>" +
                  "</div>" +
                  /*"<p class=\"warning-text warning-select\" ng-show='" + valFlag + "'> ! </p>" +
                  "<span ng-class='{\"dropdown\": !" + valFlag + ", \"dropdown-error\": " + valFlag + "}'> </span>"+*/
                "</div>";           
            break; 
	case "phone":
                
                var phoneMask="";
                
                if(countryDropdown=="true"){
                                var ngCountryCodeModel = ngModelVar+"__countryCode__";
                                if(actualField){
                                                ngCountryCodeModel = actualField+"__countryCode__";
                                }
                                
                                //scope.countryArr = [{"label": "India(+91)", "value": "91"},{"label": "United States(+1)", "value": "1"}];
                                scope.countryArr = PhoneFormatConfigProcessor.getAllCountriesConfig();
                                var countryModel = $parse(ngCountryCodeModel);
                                var country = countryModel(scope);
                                
                                var phoneMaskModelName = ngModelVar+"__phoneMask__";
                                
                                if(actualField){
                                                phoneMaskModelName = actualField+"__phoneMask__";
                                }
                                
                                phoneMask = "{{"+phoneMaskModelName+"}}";
                                
                                var prevVal = scope.$eval(ngModelVar);
                                if(prevVal){
                                                prevVal = prevVal + "";
                                                var countryCode = parseInt(prevVal.substring(0,3));
                                                var phoneVal = prevVal.substring(3);
                                                //validate the country code, if its invalid do not put country code 
                                                if(PhoneFormatConfigProcessor.validateCountry(countryCode)){
                                                                countryModel.assign(scope,""+countryCode);
                                                                
                                                                var phoneMaskVal = PhoneFormatConfigProcessor.getPhoneFormatConfig(""+countryCode).FORMAT;
                                                var phoneMaskModel = $parse(phoneMaskModelName);
                                                var phoneMaskValue = phoneMaskModel(scope);
                                                if(!phoneMaskValue){
                                                                phoneMaskModel.assign(scope,phoneMaskVal);
                                                }
                                                }
                                }else{
                                                var countryCode = PhoneFormatConfigProcessor.getCurrentCountry();
                                                countryModel.assign(scope,""+countryCode);
                                                
                                                var phoneMaskVal = PhoneFormatConfigProcessor.getPhoneFormatConfig(""+countryCode).FORMAT;
                                                var phoneMaskModel = $parse(phoneMaskModelName);
                                                var phoneMaskValue = phoneMaskModel(scope);
                                                if(!phoneMaskValue){
                                                                phoneMaskModel.assign(scope,phoneMaskVal);
                                                }
                                }
                                
                                                                                                                                
                                firstline = "<div class=\"fin-input-container\" layout=\"row\"><div flex=\"30\">";
                                var countrySelect = "<div ng-class='{\"left-line\": !" + valFlag + ", \"left-line-error\":" + valFlag + "}'>" +
                                                                                                                                "</div>" +
                                                                                                                                "<div class=\"input-body\">" +
                                                                                                                                  "<div class=\"input-body2 input-body2-dropdown\">"+
                                                                                                                                                "<select class=\"fin-input fin-select\" ng-model='" + ngCountryCodeModel + "'"+
                                                                                                                                                  "ng-style='" + ngCountryCodeModel + "== null || " + ngCountryCodeModel + " == \"\" ? {\"font-size\": \"14px\"} : {\"color\": \"initial\"}' " + (_.isUndefined(readOnlyFlag) ? "" : " disabled") + (_.isUndefined(ngChange) ? "" : " ng-change=" + ngChange) + 
                                                                                                                                                  "ng-change=\"reFormatPhoneNumber('"+ngCountryCodeModel+"','"+ngModelVar+"'"+(_.isUndefined(actualField) ? "" : ",'" + actualField+"'")+")\""+">"+
                                                                                                                                                  "<option class=\"place-holder-select\" value=\"\" ng-selected=\"" + ngCountryCodeModel + "== null\"" + " ng-show=\"" + ngCountryCodeModel + "== null\" >" + placeholder + "</option>"+
                                                                                                                                                  "<option ng-repeat=\"option in " + optionArr + "\" ng-selected='option.value==\"" + scope.$eval(ngCountryCodeModel) + "\"' value=\"{{option.value}}\">{{option.label}}</option>"+
                                                                                                                                                "</select>"+
                                                                                                                                  "</div>" +
                                                                                                                                  "<div ng-class='{\"bottom-line\": !" + valFlag + ", \"bottom-line-error\":" + valFlag + "}'>" +
                                                                                                                                  "</div>" +
                                                                                                                                "</div>" +
                                                                                                                                "<p class=\"warning-text warning-select\" ng-show='" + valFlag + "'> ! </p>" +
                                                                                                                                "<span ng-class='{\"dropdown\": !" + valFlag + ", \"dropdown-error\": " + valFlag + "}'> </span>"+
                                                                                                                    "</div>"
                                                                                                                                +"</div>"
                                                                                                                                + "<div flex=\"70\">";
                                firstline = firstline + countrySelect;
                                                                                                                }else{
                                var countryCode = PhoneFormatConfigProcessor.getCurrentCountry();
                                
                                var phoneMaskVal = PhoneFormatConfigProcessor.getPhoneFormatConfig(""+countryCode).FORMAT;
                                phoneMask=phoneMaskVal;
                                /*var phoneMaskModel = $parse(phoneMaskModelName);
                                var phoneMaskValue = phoneMaskModel(scope);
                                if(!phoneMaskValue){
                                                phoneMaskModel.assign(scope,phoneMaskVal);
                                }*/
                }
                
                                                                
                                                                
                resTemplate = 
                                                                
                                                                firstline +
                                                                                "<div ng-class='{\"left-line\": !"
                                                                                                                                + valFlag
                                                                                                                                + ", \"left-line-error\":"
                                                                                                                                + valFlag
                                                                                                                                + "}'>"
                                                                                                                                + "</div>"
                                                                                                                                + "<div class=\"input-body\">"
                                                                                                                                + "<div class=\"input-body2\">"
                                                                                                                                + "<input phone-mask=\""+phoneMask+"\" autocomplete=\"off\" account-id ng-cut=\"$event.preventDefault()\" ng-copy=\"$event.preventDefault()\" ng-paste=\"$event.preventDefault()\" class=\"fin-input\" type=\"tel\" ng-model=\""
                                                                                                                                + ngModelVar
                                                                                                                                + "\" placeholder=\""
                                                                                                                                + placeholder
                                                                                                                                + "\""
                                                                                                                                + (_.isUndefined(readOnlyFlag) ? ""
                                                                                                                                                                : " disabled")
                                                                                                                                + (_.isUndefined(maxLength) ? ""
                                                                                                                                                                : " maxlength=" + maxLength)
                                                                                                                                + (_.isUndefined(ngChange) ? ""
                                                                                                                                                                : " ng-change=" + ngChange) + ">"
                                                                                                                                + "</div>"
                                                                                                                                + "<div ng-class='{\"bottom-line\": !"
                                                                                                                                + valFlag + ", \"bottom-line-error\":"
                                                                                                                                + valFlag + "}'>" + "</div>" + "</div>"
                                                                                                                                + "<p class=\"warning-text\" ng-show='"
                                                                                                                                + valFlag + "'> ! </p>"
                                                                                                                                + "<div ng-class='{\"right-line\": !"
                                                                                                                                + valFlag + ", \"right-line-error\":"
                                                                                                                                + valFlag + "}'>" + "</div>" + "</div>"; 
                                                                                                                                
                break;
				
            case "mail_Id":        	
        	resTemplate = 
                firstline +
                   "<div ng-class='{\"left-line\": !"
									+ valFlag
									+ ", \"left-line-error\":"
									+ valFlag
									+ "}'>"
									+ "</div>"
									+ "<div class=\"input-body\">"
									+ "<div class=\"input-body2\">"
									+ "<input autocorrect=\"off\" mail-id ng-cut=\"$event.preventDefault()\" ng-copy=\"$event.preventDefault()\" ng-paste=\"$event.preventDefault()\" class=\"fin-input\" type=\"email\" ng-model=\""
									+ ngModelVar
									+ "\" placeholder=\""
									+ placeholder
									+ "\""
									+ (_.isUndefined(readOnlyFlag) ? ""
											: " disabled")
									+ (_.isUndefined(maxLength) ? ""
											: " maxlength=" + maxLength)
									+ (_.isUndefined(ngChange) ? ""
											: " ng-change=" + ngChange) + ">"
									+ "</div>"
									+ "<div ng-class='{\"bottom-line\": !"
									+ valFlag + ", \"bottom-line-error\":"
									+ valFlag + "}'>" + "</div><div ng-hide='" + valFlag + "==null' class=\"rakErrorMsg\"> {{"+valFlag+"}} \</div>" + "</div>"
									+ "<p class=\"warning-text\" ng-show='"
									+ valFlag + "'> ! </p>"
									+ "<div ng-class='{\"right-line\": !"
									+ valFlag + ", \"right-line-error\":"
									+ valFlag + "}'>" + "</div>" + "</div>";          
            break;
            
        case "postalCode":
        	
        	 firstline +
             "<div ng-class='{\"left-line\": !"
								+ valFlag
								+ ", \"left-line-error\":"
								+ valFlag
								+ "}'>"
								+ "</div>"
								+ "<div class=\"input-body\">"
								+ "<div class=\"input-body2\">"
								+ "<input autocorrect=\"off\" postal-code ng-cut=\"$event.preventDefault()\" ng-copy=\"$event.preventDefault()\" ng-paste=\"$event.preventDefault()\" class=\"fin-input\" type=\"text\" ng-model=\""
								+ ngModelVar
								+ "\" placeholder=\""
								+ placeholder
								+ "\""
								+ (_.isUndefined(readOnlyFlag) ? ""
										: " disabled")
								+ (_.isUndefined(maxLength) ? ""
										: " maxlength=" + maxLength)
								+ (_.isUndefined(ngChange) ? ""
										: " ng-change=" + ngChange) + ">"
								+ "</div>"
								+ "<div ng-class='{\"bottom-line\": !"
								+ valFlag + ", \"bottom-line-error\":"
								+ valFlag + "}'>" + "</div>" + "</div>"
								+ "<p class=\"warning-text\" ng-show='"
								+ valFlag + "'> ! </p>"
								+ "<div ng-class='{\"right-line\": !"
								+ valFlag + ", \"right-line-error\":"
								+ valFlag + "}'>" + "</div>" + "</div>";            	 
            break;
            
        case "accountId":
        	
        	firstline +
            "<div ng-class='{\"left-line\": !"
								+ valFlag
								+ ", \"left-line-error\":"
								+ valFlag
								+ "}'>"
								+ "</div>"
								+ "<div class=\"input-body\">"
								+ "<div class=\"input-body2\">"
								+ "<input autocomplete=\"off\" account-id ng-cut=\"$event.preventDefault()\" ng-copy=\"$event.preventDefault()\" ng-paste=\"$event.preventDefault()\" class=\"fin-input\" type=\"text\" ng-model=\""
								+ ngModelVar
								+ "\" placeholder=\""
								+ placeholder
								+ "\""
								+ (_.isUndefined(readOnlyFlag) ? ""
										: " disabled")
								+ (_.isUndefined(maxLength) ? ""
										: " maxlength=" + maxLength)
								+ (_.isUndefined(ngChange) ? ""
										: " ng-change=" + ngChange) + ">"
								+ "</div>"
								+ "<div ng-class='{\"bottom-line\": !"
								+ valFlag + ", \"bottom-line-error\":"
								+ valFlag + "}'>" + "</div>" + "</div>"
								+ "<p class=\"warning-text\" ng-show='"
								+ valFlag + "'> ! </p>"
								+ "<div ng-class='{\"right-line\": !"
								+ valFlag + ", \"right-line-error\":"
								+ valFlag + "}'>" + "</div>" + "</div>";  
        	
        	
            break;
            
           //Added for Write To US Time Zone
            
        case "time_number_colon":
        	if(WL.Client.getEnvironment() == WL.Environment.IPHONE){
        		type="text";
        		 resTemplate =
                     firstline +
                       "<div ng-class='{\"left-line\": !" + valFlag + ", \"left-line-error\":" + valFlag + "}'>" +
                       "</div>" +
                       "<div class=\"input-body\">" +
                         "<div class=\"input-body2\">" +
                           "<input autocomplete=\"off\" autocorrect=\"off\" clear-warning=\""  + ngModelVar + "\" type=\""+type+"\" onpaste=\"return false;\" time-colon-input-validate class=\"fin-input\"  ng-model=\"" + ngModelVar + "\" placeholder=\"" + placeholder + "\"" + (_.isUndefined(readOnlyFlag) ? "" : " disabled") + "\"" + (_.isUndefined(maxLength) ? "" : " ng-maxlength=" + maxLength)  + (_.isUndefined(ngChange) ? "" : " ng-blur=" + ngChange)+">"+
                         "</div>" +
                         "<div ng-class='{\"bottom-line\": !" + valFlag + ", \"bottom-line-error\":" + valFlag + "}'>" +
                         "</div> <div ng-hide='" + valFlag + "==null' class=\"rakErrorMsg\"> {{"+valFlag+"}} \</div>" +
                       "</div>" +
                       "<p class=\"warning-text\" ng-show='" + valFlag + "'> ! </p>" +
                       "<div ng-class='{\"right-line\": !" + valFlag + ", \"right-line-error\":" + valFlag + "}'>" +
                       "</div>" +
                     "</div>";          
                 break;
       	}
       	else{
       		type="text";
       		  resTemplate =
                     firstline +
                       "<div ng-class='{\"left-line\": !" + valFlag + ", \"left-line-error\":" + valFlag + "}'>" +
                       "</div>" +
                       "<div class=\"input-body\">" +
                         "<div class=\"input-body2\">" +
                           "<input autocomplete=\"off\" autocorrect=\"off\" clear-warning=\""  + ngModelVar + "\" type=\""+type+"\" onpaste=\"return false;\" time-colon-input-validate class=\"fin-input\"  ng-model=\"" + ngModelVar + "\" placeholder=\"" + placeholder + "\"" + (_.isUndefined(readOnlyFlag) ? "" : " disabled") + "\"" + (_.isUndefined(maxLength) ? "" : " ng-maxlength=" + maxLength)  + (_.isUndefined(ngChange) ? "" : " ng-blur=" + ngChange)+">"+
                         "</div>" +
                         "<div ng-class='{\"bottom-line\": !" + valFlag + ", \"bottom-line-error\":" + valFlag + "}'>" +
                         "</div> <div ng-hide='" + valFlag + "==null' class=\"rakErrorMsg\"> {{"+valFlag+"}} \</div>" +
                       "</div>" +
                       "<p class=\"warning-text\" ng-show='" + valFlag + "'> ! </p>" +
                       "<div ng-class='{\"right-line\": !" + valFlag + ", \"right-line-error\":" + valFlag + "}'>" +
                       "</div>" +
                     "</div>";          
                 break;
       	}
            
        default: return errorTemplate; 
      }        

      return resTemplate;       
    };
 

  return {
    link: 
      function(scope, element, attrs) {
        scope.placeholder = attrs.placeholder;
        ngModelVar = attrs.model;
        scope.model = scope.$eval(attrs.model);

        if ($rootScope.inputStyle == "material")
        {
        	var template1 = getMaterialTemplate(scope, attrs.displayRow, attrs.type, attrs.model, attrs.placeholder, attrs.validationFlag, attrs.optionArray, attrs.readonly, attrs.maxLength, attrs.onChange, attrs.relatedField, attrs.countryDropdown, attrs.row, attrs.actualField);
        }
        else
        {
        	var template1 = getTemplate(scope, attrs.displayRow, attrs.type, attrs.model, attrs.placeholder, attrs.validationFlag, attrs.optionArray, attrs.readonly, attrs.maxLength, attrs.onChange, attrs.relatedField, attrs.value);
        }
        

        element.html(template1).show();
        $compile(element.contents())(scope);

      }
    };
});

AppController.directive("datepicker", ['$rootScope', '$parse', 'Logger', 'dateFilter','$compile',function ($rootScope, $parse, Logger, dateFilter, $compile) {
	var updateModel = function (elem, formattedDate, dateObj, modelName, scope, ngModelCtrl) {
		  var dateModel= $parse(modelName);
		  dateModel.assign(scope,dateObj);
		  if(!$rootScope.$$phase){
			$rootScope.$apply();
		  }
		  
	  };
	  var formatDate = function (attrs, inputValue, elem) {
	
		  var userDF = $rootScope.userDateFormat; 
		  var userformattedDate = inputValue;
		  if(!(_.isUndefined(userDF)|| userDF==null || userDF=="" ) && !(_.isUndefined(inputValue) || inputValue==null || inputValue=="")){
			  userformattedDate = moment(inputValue).format(userDF.toUpperCase());
		  }
		  else{
			  var dateFormat = $rootScope.mobileAppConfig.appConfigData.dateFormat;
			  if(!(_.isUndefined(dateFormat)) && !(_.isUndefined(inputValue) || inputValue==null || inputValue==""))
			  {
				  userformattedDate = moment(inputValue).format(dateFormat);
			  }
		  }
		  
		
		  elem.val(userformattedDate);
		  return userformattedDate;
	  };
	  var unformatDate = function (attrs, inputValue, elem) {
		  //Logger.info("unformatDate::inputValue:: "+inputValue);
		  var unformattedDate = moment(inputValue).format("MM/DD/YYYY");
		  elem.val(formatDate(attrs, unformattedDate, elem));
		  return inputValue;
	  };
	  return {
		restrict: "A",
		require: "ngModel",
		link: function (scope, elem, attrs, ngModelCtrl) {
			var currYear = new Date().getFullYear();
			var tempmonth = new Date().getMonth();
			var month = new Date().getMonth() + 2;
			var currDate = new Date().getDate();
			var dateValMin = new Date(new Date().setFullYear(currYear - 120));
			var dateValMax = new Date(2099, 12, 12);
			var dateType=elem.attr('ng-value');
			if(dateType == "pastDatesOnly"){
				dateValMin = new Date(new Date().setFullYear(currYear - 120));
				dateValMax = new Date();
			}
			else if(dateType == "futureDatesOnly"){
				dateValMin = new Date();
				dateValMax = new Date(2099, 12, 12);
			}
			else if(dateType == "future3MonthsOnly"){
				dateValMin = new Date();	
				if(month == 11){
					month = 0;					
					currYear = currYear + 1;
				}
				else if(month == 12){
					month = 1 ;					
					currYear = currYear + 1;
				}
				else if(month > 12){
					month = month - tempmonth ;					
					currYear = currYear + 1;
				}
				else{
					month = month + 1;
				}	
				if(currDate == 1){
					currDate = new Date().getDate();
				}	
				else{
					currDate = new Date().getDate()-1;
				}				
				dateValMax = new Date(currYear, month, currDate);							
			}
			else if(dateType == "past3YearsOnly"){
				dateValMin = new Date(new Date().setFullYear(currYear - 3));
				dateValMax = new Date();
			}
		  elem.mobiscroll().calendar({
			  theme: 'rakbank',
			   display: 'bottom',
			    min: dateValMin,
				max: dateValMax,
				  onBeforeShow: function (dateText, inst) {
					  	var modeldate = 	$rootScope.$eval(elem.attr('ng-model'));
					  	inst.setVal(modeldate);
				    },
				onSet: function (dateText, inst) {
					updateModel(elem, dateText.textValue, new Date(inst.getDate()), attrs.ngModel, scope, ngModelCtrl);
			    }
		  });
			
		  
		  
		  if(!ngModelCtrl){
			  return;
		  }
		  ngModelCtrl.$formatters.unshift(function(value)
	      {
			  return formatDate(attrs, value, elem);
	      });
		  ngModelCtrl.$parsers.unshift(function(viewValue)
	       {
			   return unformatDate(attrs, viewValue, elem);
	       });
		}
	  }
}]);
AppController.directive("dropdownpicker", ['$rootScope', '$parse', 'Logger', '$compile',function ($rootScope, $parse, Logger,$compile) {
	var getSelectModel = function (elem, dropDownValue, modelName, scope, ngModelCtrl) {
		  var modelSelect= $parse(modelName);		  		   
		 scope.$watch(modelSelect, function(newValue, oldValue){
				var presentval = elem.prev().val();
				if(newValue === oldValue) {
					return;
				}							
				else if(newValue==""){
					elem.mobiscroll('option',{
						  placeholder: elem.attr('title')
					});
					
					setTimeout(function(){elem.val("");elem.trigger('change');},500);
				}else if(elem.find('[value="'+oldValue+'"]').text()== presentval){
					if(!newValue){
						elem.val("");
					}
					setTimeout(function(){elem.prev().val(elem.find('option:selected').text())},500);
				} else if(newValue != oldValue) {
					setTimeout(function(){elem.prev().val(elem.find('[value="'+newValue+'"]').text())},500);
				}
		});
		 
		  if(!$rootScope.$$phase){
			$rootScope.$apply();
		  }
		  
	  };
	  return {
		restrict: "A",
		require: "ngModel",
		link: function (scope, elem, attrs, ngModelCtrl) {
			jQuery('.place-holder-select').attr('disabled',true);
			 setTimeout( function(){ elem.mobiscroll().select({
				   
				   theme: 'rakbank',
				   display: 'bottom',				   
                   minWidth: 200,
                   multiline:3,
                 showInput:true,              
                   onBeforeShow: function (inst) {
                	   elem.mobiscroll('refresh');
                   },
                   onMarkupReady: function(event, inst){
                        jQuery(event.target).find(".mbsc-sc-itm.mbsc-btn-e .mbsc-sc-itm-ml").each(function(){
                            var innerHtm=this.innerText;
                           // if(innerHtm && this.innerHTML.indexOf(' - ')!=-1){
                            //  innerHtm = innerHtm.replace(/ - [A-z ]*/,"<br><span>"+innerHtm.split(" - ")[1]+"</span>");
                           // jQuery(this).html(innerHtm);
                          //  }
                            if(innerHtm && this.innerHTML.indexOf(' - ')!=-1){
                                 innerHtm=innerHtm.substring(0,innerHtm.lastIndexOf(' - '))+"<br><span>"+innerHtm.substr(innerHtm.lastIndexOf(' - ')+2)+"</span>"
                               jQuery(this).html(innerHtm);
                               }


                        })
                   }
			   });
			   getSelectModel(elem, elem.value, attrs.ngModel, scope, ngModelCtrl);
			  },200);
		}
	  }
}]);


AppController.directive('finSuccess', ['$rootScope', 'Logger','$compile', function($rootScope, Logger, $compile) {
	var fetchHtmlContent = function (banner, message, crossClick)
	{
		var htmlContent = "";
		if(crossClick){
			htmlContent= htmlContent + "<div class=\"sucs_circle_wrap\">";
				//htmlContent= htmlContent + "<span class=\"app-tickcircle sucs_circle_icon\"></span>";
				htmlContent= htmlContent + "<div id=\"cancelButton\" class=\"title-right-succPage\" role=\"button\" tabindex=\"0\" "+
							"ng-click=\""+crossClick+"\"></div>";
			htmlContent= htmlContent + "</div>";
		}else{
			//htmlContent= htmlContent + "<p class=\"sucs_circle_wrap\"> <span class=\"app-tickcircle sucs_circle_icon\"></span> </p>";
		}
		
		//htmlContent= htmlContent + "<p class=\"trans_sucs_txt\"> "+banner+"</p>";
		htmlContent= htmlContent + "<div class=\"trans_id_wrap\">";
			htmlContent= htmlContent + "<div class=\"id_container\">";
			htmlContent= htmlContent + "</div>";
			htmlContent= htmlContent + "<div class=\"id_txt_wrap\">";
				htmlContent= htmlContent + "<div class=\"id_txt_pad\">";
					htmlContent= htmlContent + "<p id=\"successMessage\" class=\"sucs-id-txt\">"+message+"</p>";
				htmlContent= htmlContent + "</div>";
			htmlContent= htmlContent + "</div>";
		htmlContent= htmlContent + "</div>";
		
		return htmlContent;
	};
	return {
	    link: 
	      function(scope, element, attrs) {
	    	//success-banner success-message
	    	var htmlContent = fetchHtmlContent(attrs.successBanner, attrs.successMessage, attrs.crossClick);
	        element.html(htmlContent).show();
	        $compile(element.contents())(scope);
	      }
	    }
}]);

AppController.directive('finPhone', ['$rootScope', 'Logger', 'PhoneFormatConfigProcessor', function($rootScope, Logger, PhoneFormatConfigProcessor ) {
	var formatPhoneNumber = function (inputNumber, countryDropdown) {
		if(inputNumber == undefined || inputNumber==null || inputNumber.length==0){
			return "";
		}
		var countryCode;
		var phoneVal;
		var phoneMaskPattern;
		
		if(countryDropdown=="true"){
			countryCode = parseInt(inputNumber.substring(0,3));
			phoneVal = inputNumber.substring(3);
			Logger.info("Country Code:: "+countryCode);
			//fetch the mask pattern for the country code
			phoneMaskPattern=PhoneFormatConfigProcessor.getPhoneFormatConfig(""+countryCode).FORMAT;
		}else{
			// In case of error we assume that country code is not present
			countryCode = parseInt(PhoneFormatConfigProcessor.getCurrentCountry());
			phoneVal = inputNumber;
			//fetch the mask pattern for the country code
			phoneMaskPattern=PhoneFormatConfigProcessor.getPhoneFormatConfig(""+countryCode).FORMAT;
		}
		
		var formattedPhoneNumber = "";
		var phoneCounter = 0;
		for(var i=0;i<phoneMaskPattern.length;i++){
			var cPhn = phoneMaskPattern.charAt(i);
			if(cPhn!=" " && !isNaN(cPhn)){
				formattedPhoneNumber = formattedPhoneNumber + phoneVal.charAt(phoneCounter);
				phoneCounter++;
				if(phoneCounter == phoneVal.length){
					break;
				}
			}else{
				formattedPhoneNumber = formattedPhoneNumber + phoneMaskPattern.charAt(i);
			}
		}
		formattedPhoneNumber = "+" + countryCode + " " + formattedPhoneNumber;
		Logger.info("formattedPhoneNumber:: "+formattedPhoneNumber);
		return formattedPhoneNumber;
	  };
	var fetchHtmlContent = function (phoneNumber, countryDropdown)
	{
		var htmlContent = "";
		if(_.isUndefined(phoneNumber)){		//if phoneNumber is not defined, return blank
    		htmlContent="";
    	}else{
    		Logger.info("phoneNumber input for html:: "+phoneNumber);
    		htmlContent = formatPhoneNumber(phoneNumber, countryDropdown);
    	}
		return htmlContent;
	};
	return {
	    link: 
	      function(scope, element, attrs) {
	    	
	    	Logger.debug("Input phone number:: "+attrs.value);
	    	if(attrs.countryDropdown==undefined || attrs.countryDropdown==""){
	    		attrs.countryDropdown = "true";
	    	}
	    	
	    	var tempElem = element[0];
	    	if(tempElem){
	    		if(attrs.class){
	    			var classList = attrs.class.split(" ");
	    			var numOfClasses = classList.length;
		    		var count = 0;
		    		while(count<numOfClasses){
		    			tempElem.classList.add(classList[count]);
		    			count++;
		    		}
	    		}
		    	if(tempElem.parentElement.id){
		    		tempElem.id = tempElem.parentElement.id+"_Phone";
		    	}
	    	}
	    	
	    	var htmlContent = fetchHtmlContent(attrs.value, attrs.countryDropdown);
	        element.html(htmlContent).show();
	        
	        attrs.$observe(
                "value",
                function( phoneNumber ) {
                    Logger.info( "$observe : " + phoneNumber);
                    var htmlContent = fetchHtmlContent(phoneNumber, attrs.countryDropdown);
        	        element.html(htmlContent).show();
                }
            );
	      }
	    }
}]);

AppController.directive("phoneMask", ['$rootScope', '$parse', 'Logger','PhoneFormatConfigProcessor',function ($rootScope, $parse, Logger, PhoneFormatConfigProcessor) {
	var formatPhoneNumber = function (attrs, inputNumber, elem) {
		Logger.info("Mask Pattern1:: "+attrs.phoneMask);
		if(inputNumber == undefined || inputNumber==null || inputNumber.length==0){
			return "";
		}
		var phoneVal;
		if(attrs.countryDropdown=="true"){
			phoneVal = inputNumber.substring(3);
		}else{
			phoneVal = inputNumber;
		}
		
		if(!phoneVal){
			return "";
		}
		
		
		var phoneMaskPattern=attrs.phoneMask;
		var formattedPhoneNumber = "";
		var phoneCounter = 0;
		for(var i=0;i<phoneMaskPattern.length;i++){
			var cPhn = phoneMaskPattern.charAt(i);
			if(cPhn!=" " && !isNaN(cPhn)){
				formattedPhoneNumber = formattedPhoneNumber + phoneVal.charAt(phoneCounter);
				phoneCounter++;
				if(phoneCounter == phoneVal.length){
					break;
				}
			}else{
				formattedPhoneNumber = formattedPhoneNumber + phoneMaskPattern.charAt(i);
			}
		}
		Logger.info("formattedPhoneNumber:: "+formattedPhoneNumber);
		return formattedPhoneNumber;
	  };
	  var unFormatPhoneNumber = function (attrs, inputNumber, elem) {
		  var unFormattedPhoneNumber="";
		  for(var i=0;i<inputNumber.length;i++){
				var cPhn = inputNumber.charAt(i);
				if(cPhn!=" " && !isNaN(cPhn)){
					unFormattedPhoneNumber = unFormattedPhoneNumber + inputNumber.charAt(i);
				}
			}
			Logger.info("unformattedPhoneNumber:: "+unFormattedPhoneNumber);
			
			if(attrs.countryDropdown=="true"){
				//append country code if its not blank
				var countryCodeModelName = attrs.ngModel+"__countryCode__";
				if(attrs.actualField){
					countryCodeModelName = attrs.actualField+"__countryCode__";
				}
				
				var countryCodeModel= $parse(countryCodeModelName);
				var countryCodeVal = countryCodeModel($rootScope);
				Logger.info("Country code val:: "+countryCodeVal);
				var maxLength=parseInt(PhoneFormatConfigProcessor.getPhoneFormatConfig(countryCodeVal).MAX_LENGTH) + 3;
				if(countryCodeVal){
					var countryPad = "000";
					countryCodeVal = countryPad.substring(0, countryPad.length - countryCodeVal.length) + countryCodeVal;
					unFormattedPhoneNumber = countryCodeVal + unFormattedPhoneNumber;
				}
				if(unFormattedPhoneNumber.length>maxLength){
					unFormattedPhoneNumber = unFormattedPhoneNumber.substring(0, maxLength);
				}
			}else{
				var countryCode = PhoneFormatConfigProcessor.getCurrentCountry();
				var maxLength=parseInt(PhoneFormatConfigProcessor.getPhoneFormatConfig(""+countryCode).MAX_LENGTH);
				if(unFormattedPhoneNumber.length>maxLength){
					unFormattedPhoneNumber = unFormattedPhoneNumber.substring(0, maxLength);
				}
			}
			Logger.info("unformattedPhoneNumber:: "+unFormattedPhoneNumber);
			
			//elem.val(formatPhoneNumber(attrs, unFormattedPhoneNumber, elem));
			return unFormattedPhoneNumber;
		  };
	 return {
	        require: '?ngModel',
	        link: function (scope, elem, attrs, ctrl) {
	            if (!ctrl) return;

	            ctrl.$formatters.unshift(function (a) {
	                return formatPhoneNumber(attrs, a, elem);
	            });

	            ctrl.$parsers.unshift(function (viewValue) {
	                var updatedNumber=unFormatPhoneNumber(attrs, viewValue, elem);
	                var formattedNum=formatPhoneNumber(attrs, updatedNumber, elem);
	                ctrl.$viewValue = formattedNum;
	                ctrl.$commitViewValue();
	                ctrl.$render();
	                return updatedNumber;
	            });
	            
	            attrs.$observe(
	                    "phoneMask",
	                    function( inputValue ) {
	                        Logger.info( "phoneMask:: $observe : " + inputValue);
	                        if(elem[0].value){
	                        	var unformattedNumber = unFormatPhoneNumber(attrs, elem[0].value, elem);
	                        	
	                        	var phoneModel = $parse(attrs.ngModel);
	                        	phoneModel.assign(scope,unformattedNumber);
	                        	Logger.info("model value:: "+ctrl.$modelValue);
	                        	if(!$rootScope.$$phase){
							    	$rootScope.$apply();
							    }
	                        	var formattedNum=formatPhoneNumber(attrs, unformattedNumber, elem);
	        	                ctrl.$viewValue = formattedNum;
	        	                ctrl.$commitViewValue();
	        	                ctrl.$render();
	                        }
	                        Logger.info("model value:: "+ctrl.$modelValue);
	                    }
	                );
	        }
	    };
}]);
AppController.directive('finBalance', ['$rootScope', 'Logger', function($rootScope, Logger) {
	var fetchHtmlContent = function (amount,currencyClass,amountClass,id)
	{
		var htmlContent = "";
		if(_.isUndefined(amount)){		//if amount is not defined, return -
    		htmlContent="-";
    	}else{
    		var crnIDHTML="";
    		var amtIDHTML="";
    		if(id){
    			crnIDHTML="id=\""+id+"_curr\"";
    			amtIDHTML="id=\""+id+"_amt\"";
    		}
    		
    		if(_.isUndefined(currencyClass)){
    			currencyClass="amount-curr font-size-initial";
    		}
    		if(_.isUndefined(amountClass)){
    			amountClass="rs-color font-size-initial";
    		}
    		//Logger.info("amount input for html:: "+amount);
    		var amountObj = JSON.parse(amount); 
    		//Logger.info("amount obj for html:: "+amountObj);
    		if(amountObj.curr){
    			htmlContent = "<span "+crnIDHTML+" class=\""+currencyClass+"\">"+amountObj.curr+"</span>";
    		}
    		htmlContent = htmlContent + "<span "+amtIDHTML+" class=\""+amountClass+"\"> "+amountObj.rs+amountObj.seperator+amountObj.ps+"</span>";
    	}
		return htmlContent;
	};
	return {
	    link: 
	      function(scope, element, attrs) {
	    	
	    	//Logger.debug("Input amount object:: "+attrs.amount);
	    	var id="";
	    	if(attrs.id){
	    		id=attrs.id;
	    	}else{
	    		var tempElem = element[0];
		    	if(tempElem){
			    	if(tempElem.parentElement.id){
			    		id = tempElem.parentElement.id+"_Bal";
			    	}
		    	}
	    	}
	    	var htmlContent = fetchHtmlContent(attrs.amount, attrs.currencyClass, attrs.amountClass, id);
	        element.html(htmlContent).show();
	        
	        attrs.$observe(
                "amount",
                function( amount ) {
                    //Logger.info( "$observe : " + amount);
                    var htmlContent = fetchHtmlContent(attrs.amount,attrs.currencyClass, attrs.amountClass, id);
        	        element.html(htmlContent).show();
                }
            );
	      }
	    }
}]);

AppController.directive('finDate', ['$rootScope', 'dateFilter', 'Logger', function($rootScope, dateFilter, Logger) {
	var parseInputDate = function(userDF, userDFSeperator, dateObj){
		//unformat the date as per the user format in root scope
		//Logger.debug("user date format::<<"+userDF+">>, date format seperator::<<"+userDFSeperator+">>");
		if(userDF.indexOf(userDFSeperator)!=-1 && dateObj.indexOf(userDFSeperator)!=-1){
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
			var dayString = "";
			var monthString = "";
			var yearString = "";
			var dateSplit = dateObj.split(userDFSeperator);
			if(dateSplit.length>=3){
				dayString = dateSplit[dayIndex];
				monthString = dateSplit[monthIndex];
				yearString = dateSplit[yearIndex];
			}
			
			if(yearString!=null && yearString!="" && yearString.indexOf(" ")!=-1){
				yearString = yearString.substring(0,yearString.indexOf(" "));
				//Logger.debug("year:: "+yearString);
			}
			
			//checking for year if its a 2 digit format
			if(yearFormat.length==2 && yearString.length==2){
				var currDate = new Date();
				var currYear = currDate.getFullYear();
				var sCurrYear = currYear.toString();
				var yearInTwoDigit = parseInt(sCurrYear.substring(sCurrYear.length-2, sCurrYear.length));
				var yearPrefix = parseInt(sCurrYear.substring(0,sCurrYear.length-2));
				
				if((yearInTwoDigit+10)<parseInt(yearString)){
					yearString = (yearPrefix-1) + yearString;
				}else{
					yearString = yearPrefix + yearString;
				}
			}
			if(monthFormat.length==2){
				monthString = parseInt(monthString)-1;
			}else if(monthFormat.length==3){
				if(monthString.toUpperCase()=="JAN" ){
					monthString = 0;
				}else if(monthString.toUpperCase()=="FEB" ){
					monthString = 1;
				}else if(monthString.toUpperCase()=="MAR" ){
					monthString = 2;
				}else if(monthString.toUpperCase()=="APR" ){
					monthString = 3;
				}else if(monthString.toUpperCase()=="MAY" ){
					monthString = 4;
				}else if(monthString.toUpperCase()=="JUN" ){
					monthString = 5;
				}else if(monthString.toUpperCase()=="JUL" ){
					monthString = 6;
				}else if(monthString.toUpperCase()=="AUG" ){
					monthString = 7;
				}else if(monthString.toUpperCase()=="SEP" ){
					monthString = 8;
				}else if(monthString.toUpperCase()=="OCT" ){
					monthString = 9;
				}else if(monthString.toUpperCase()=="NOV" ){
					monthString = 10;
				}else if(monthString.toUpperCase()=="DEC" ){
					monthString = 11;
				}
			}
			//Logger.debug("Year:: "+yearString+", month:: "+monthString+", day:: "+dayString);
			
			if(isNaN(yearString) || isNaN(monthString) || isNaN(dayString)){
				//Logger.info("Input date is not in user date format");
				return "Invalid Date";
			}
			
			var tempDateObj = new Date(yearString, monthString, dayString);
			//Logger.debug("Date:: "+tempDateObj);
			return tempDateObj;
		}else{
			return "Invalid Date";
		}
	};
	var formatLocaleDate = function (dateObj)
	{
		var formattedDate = "";
		//Format the date as per locale using Date function
		if(dateObj instanceof Date){
			//Logger.debug("Date object is of date type");
			formattedDate = dateObj.toLocaleDateString();
		}else{
			var newDateObj;
			var userDF = $rootScope.userDateFormat;
			var userDFSeperator = $rootScope.userDateFormatSeperator;
			//JS doesnt understand date format starting with dd
			if(!_.isUndefined(userDF) && (userDF.indexOf("dd")==0 || userDF.indexOf("DD")==0)){
				//Logger.debug('Parsing date with user date format');
				newDateObj = parseInputDate(userDF, userDFSeperator, dateObj);
			}
			
			if(newDateObj==null || newDateObj==undefined || newDateObj=="Invalid Date"){
				//Logger.debug("Casting the date to Date object");
				if(isNaN(dateObj)){
					newDateObj = new Date(dateObj);
				}else{
					newDateObj = new Date(parseInt(dateObj));
				}
				//Logger.debug("After casting the date to date object:: "+newDateObj);
			}
			if(newDateObj == "Invalid Date" && !_.isUndefined(userDF) && (userDF.indexOf("dd")!=0 && userDF.indexOf("DD")!=0)){
				//Logger.debug('Parsing date with user date format as cannot cast to date object directly');
				newDateObj = parseInputDate(userDF, userDFSeperator, dateObj);
			}
			
			if(newDateObj == "Invalid Date"){
				formattedDate = dateObj;
			}else{
				formattedDate = newDateObj.toLocaleDateString();
			}
		}
		//Logger.debug('Formatted Date:: '+formattedDate);
		return formattedDate;
	};
	var fetchHtmlContent = function (dateValue, displayFormat)
	{
		var htmlContent = "";
		if(_.isUndefined(dateValue) || dateValue==""){		//if date value is not defined, return
    		//htmlContent="wrong date value";
    		htmlContent="-";
    	}else{
    		if(_.isUndefined(displayFormat)){		//if display format is not defined, format date as per config in mobileAppConfig
    			//get the configuration, if its undefined, we are taking Locale as default
    	    	var displayDateFormat = $rootScope.mobileAppConfig.appConfigData.displayDateFormat;
    	    	//Logger.debug("Date Format will be formatted using:: "+displayDateFormat);
    			if(_.isUndefined(displayDateFormat) || displayDateFormat.toUpperCase() === "LOCALE"){
    				//Logger.debug("Formatting as per locale");
    	    		htmlContent = formatLocaleDate(dateValue);
    	    	}else if(displayDateFormat.toUpperCase() === "USERFORMAT"){
    	    		//Format the date as per user date format
    	    		//If the user format is not defined, fallback to locale format
		    		var userDF = $rootScope.userDateFormat; 
		    		if(_.isUndefined(userDF)){
		    			htmlContent = formatLocaleDate(dateValue);
		    		}else{
		    			//Logger.info("Formatting as per user date format:: "+dateValue+"::: date format:: "+userDF);
		    			var newDate = new Date(formatLocaleDate(dateValue));
			    		htmlContent = dateFilter(newDate, userDF);
			    		//Logger.info("findate: "+htmlContent);
		    		}
    	    	}
    		}else{
    			htmlContent = dateFilter(dateValue, displayFormat);
    		}
    	}
		return htmlContent;
	};
	  return {
	    link: 
	      function(scope, element, attrs) {
	    	var tempElem = element[0];
	    	if(tempElem){
	    		if(attrs.class){
	    			var classList = attrs.class.split(" ");
	    			var numOfClasses = classList.length;
		    		var count = 0;
		    		while(count<numOfClasses){
		    			tempElem.classList.add(classList[count]);
		    			count++;
		    		}
	    		}/*else{
	    			var parentClassList = tempElem.parentElement.classList;
		    		var numOfClasses = parentClassList.length;
		    		var count = 0;
		    		while(count<numOfClasses){
		    			tempElem.classList.add(parentClassList[count]);
		    			count++;
		    		}
		    		tempElem.classList.add("font-size-initial");
			    	//Logger.info("added class list:: "+element[0].classList);
	    		}*/

		    	if(tempElem.parentElement.id){
		    		tempElem.id = tempElem.parentElement.id+"_Date";
		    	}
	    	}
	    	
	    	if(attrs.id){
	    		tempElem.id = attrs.id+"_Date";
	    	}
	    	
	    	//Logger.debug("Input date value:: "+attrs.dateValue);
	    	var htmlContent = fetchHtmlContent(attrs.dateValue, attrs.displayFormat);
	        element.html(htmlContent).show();
	        
	        attrs.$observe(
                "dateValue",
                function( dateValue ) {
                    //Logger.info( "$observe : " + dateValue);
                    var htmlContent = fetchHtmlContent(attrs.dateValue);
        	        element.html(htmlContent).show();
                }
            );
	      }
	    }
}]);

AppController.directive('finCurrency', ['$rootScope', 'currencyFilter', function($rootScope,currencyFilter) {
	  return {
	    link: 
	      function(scope, element, attrs) {
	    	var htmlContent = "";
	    	var currencySign ='';
	    	var currencyLength = 3;
	    	if(_.isUndefined(attrs.curValue)){
	    		htmlContent=$rootScope.appLiterals.APP.UICONTROLLER_MSG.FINCURRNCY;
	    	}else{
	    		var currencyInformation = attrs.curValue.split(" ");
				var currencyformat = currencyFilter(currencyInformation[0], currencyInformation[1],2) ;
				if(currencyformat.indexOf(')') >= 0 ){
					currencyformat = currencyformat.substr(1,currencyformat.length-2);
					currencySign = "-";
				}
				var currencyHTML = '<div class="amount"> <span class="amount-curr">'+currencyformat.substr(0,currencyLength)+'  </span><span class="amount-rs">'+currencySign+currencyformat.substr(currencyLength,currencyformat.length - (2+currencyLength))+'</span><span class="amount-ps"> '+currencyformat.substr(currencyformat.length - 2);+'</span></div>';
				htmlContent = currencyHTML;
	    	}
	        element.html(htmlContent).show();
	      }
	    };
}]);

AppController.directive ('approvalInput',function($rootScope,$compile){
			
			return {
				restrict: 'AE',
				templateUrl: 'navigation/common/resources/WorkFlowApprovalInput.html'
			    };
				
});


AppController.directive ('corpapprovalInput',function($rootScope,$compile){
	
	return {
		restrict: 'AE',
		templateUrl: 'navigation/common/resources/RakWorkFlowApprovalInput.html'
	    };
		
});
AppController.filter('filterMultiple',['$filter',function ($filter) {
	return function (items, keyObj) {
		var filterObj = {
							data:items,
							filteredData:[],
							applyFilter : function(obj,key){
								var fData = [];
								if(this.filteredData.length == 0)
									this.filteredData = this.data;
								if(obj){
									var fObj = {};
									if(!angular.isArray(obj)){
										fObj[key] = obj;
										fData = fData.concat($filter('filter')(this.filteredData,fObj));
									}else if(angular.isArray(obj)){
										if(obj.length > 0){	
											for(var i=0;i<obj.length;i++){
												if(angular.isDefined(obj[i])){
													fObj[key] = obj[i];
													fData = fData.concat($filter('filter')(this.filteredData,fObj));	
												}
											}
											
										}										
									}									
									if(fData.length >= 0){
										this.filteredData = fData;
									}
								}
							}
				};

		if(keyObj){
			angular.forEach(keyObj,function(obj,key){
				filterObj.applyFilter(obj,key);
			});			
		}
		
		return filterObj.filteredData;
	};
}]);

AppController.config(function ($provide) {
      $provide.decorator('mdDatepickerDirective', function ($delegate, $rootScope) {
        (function (configureNgModel) {
          $delegate[0].controller.prototype.configureNgModel = function (ngModelCtrl) {
            $rootScope.$on('$translateChangeStart', function () {
              ngModelCtrl.$render();
            });
            configureNgModel.call(this, ngModelCtrl);
          };
        }($delegate[0].controller.prototype.configureNgModel));
        return $delegate;
      });
    });

function patterValidator(pattern,inputValue)
{
				tempVal="";
			for (var i = 0; i < inputValue.length; i++)
		    	  { 
		    		  if((pattern.test(inputValue.charAt(i)))){
		    			  tempVal=tempVal+inputValue.charAt(i);
		    	  		}
		    	  }
				  return tempVal;
}
function patterValidatorLength(pattern,inputValue,length)
{
				tempVal="";
			for (var i = 0; i < inputValue.length; i++)
		    	  { 
		    		  if((pattern.test(inputValue.charAt(i)))){
		    			  tempVal=tempVal+inputValue.charAt(i);
		    	  		}
		    	  }
				  return tempVal.substring(0, length);
}

AppController.filter('counter', ['$rootScope',function($rootScope) {
	
    
    return function(seconds) {
    if(seconds==0)
    {
    	
    	$rootScope.rakEDirham.timerFinished();
    }
    else
    {
        return new Date(1970, 0, 1).setSeconds(seconds);
    }
    };
    
 
}])