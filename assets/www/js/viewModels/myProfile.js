/**
 * 
 */
App.viewModels.myProfile = function(jsonStore, Logger, rootScope, scope,
		ActionProcessor, CurrencyConfigProcessor, window,
		EncryptDecryptService, MBaaS, UIControlsService, $mdDialog, PushNotification) {
	var self = this;
	self.passwordType = {
		Both : 0,
		Transaction : 1,
		Login : 2,
		MPINLogin : 3,
		None : -1
	};

	/**
	 * It wont allow the user to enter empty space in the password field
	 * 
	 * @constructor
	 */
	self.spaceCheckInPassword = function(event) {
		var KeyID = event.keyCode;
		// alert(KeyID);
		if (KeyID === 32) {
			event.preventDefault();
		}

	};
	self.isBack = false;
	self.isClose = false;
	self.isCurrentUser = false;
	self.isSubscribed = false;
	self.updateFlag = 'init';
	self.updateNickNameDetailsResponse = [];
	/**
	 * User can select preferred language from the list
	 * 
	 * @constructor
	 */
	self.updateLiterals = function(lang, event) {

		rootScope.selectedLocale = lang;
		var ele = event.currentTarget;
		if (ele) {
			$('.set-arrow>span').removeClass('select');
			$($(ele).find('span.glyphicon-ok')[0]).addClass('select');
		}

	};

	/* Profile Pic Pop Up open and close */
	
	self.displayChequeImg = function(event, id) {
			$mdDialog.show({
			contentElement : id,
			parent : angular.element(document.body),
			targetEvent : event,
			clickOutsideToClose : false
		});
	}
	self.showprofilePop = function(event) {
		$mdDialog.show({
			templateUrl: 'navigation/dashboard/resources/ProfilePicPop.html',
			//contentElement : popUpId,
			parent : angular.element(document.body),
			targetEvent : event,
			clickOutsideToClose : false,
			locals :{appLiterals : rootScope.appLiterals,
				imageSrc: self.userProfilePic,
				checkStatus:self.userProfilePicPresent },
			controller : DialogController
		});
		function DialogController($scope, $mdDialog, appLiterals, imageSrc, checkStatus){
			$scope.appLiterals = appLiterals;
			$scope.imageSrc = imageSrc;
			$scope.checkStatus = checkStatus;
			$scope.hidemdDilogue = function(){
				$mdDialog.hide();
			}
			
			$scope.picImage = function() {

				openPhotos(
						function(response) {

							$scope.hidemdDilogue();
							
							// if(WL.Client.getEnvironment() == WL.Environment.IPHONE ||
							// WL.Client.getEnvironment() == WL.Environment.IPAD){
							if (MBaaS.isIPhoneEnv() || MBaaS.isIPadEnv()) {
								response = JSON.parse(response);
							}

							if (response.image != "") {
		                        self.content_type = response.content_type;
								self.userProfilePicTemp = response.image;
								ActionProcessor
										.setEvent("uploadProfilePic")
										.then(
												function(data) {

													if (data.responsesList[0].successMessage != "") {
														rootScope
																.displayToast(rootScope.appLiterals.APP.SUCCESS_MESSAGE.PROFILE_PHOTO_SUCCESS_MSG);
														self.userProfilePicPresent = true;
														self.userProfilePic = "data:image/jpeg;base64,"
																+ response.image;
														$scope.imageSrc = self.userProfilePic;
														rootScope.$apply();

													}

												}, function(error) {
													// Error reading framework.json
													// file. Handle this with a retry.
													alert(response.errorMessage);
												});
								;
							}
							console.log(self.userProfilePic);
						}, function(response) {
							alert(response.errorMessage);
						}, self.minSize, self.maxSize, rootScope.selectedLocale.locale,
						self.imageFormat);

			};
			
			$scope.captureImage = function() {

				capturePhoto(
						function(response) {
							$scope.hidemdDilogue();
							// if(WL.Client.getEnvironment() == WL.Environment.IPHONE ||
							// WL.Client.getEnvironment() == WL.Environment.IPAD){
							if (MBaaS.isIPhoneEnv() || MBaaS.isIPadEnv()) {
								response = JSON.parse(response);
							}

							if (response.image != "") {
							self.content_type = response.content_type;
								self.userProfilePicTemp = response.image;
								ActionProcessor
										.setEvent("uploadProfilePic")
										.then(
												function(data) {

													if (data.responsesList[0].successMessage != "") {
														rootScope
																.displayToast(rootScope.appLiterals.APP.SUCCESS_MESSAGE.PROFILE_PHOTO_SUCCESS_MSG);
														self.userProfilePicPresent = true;
														self.userProfilePic = "data:image/jpeg;base64,"
																+ response.image;
														$scope.imageSrc = self.userProfilePic;
														rootScope.$apply();

													}

												}, function(error) {
													// Error reading framework.json
													// file. Handle this with a retry.
													alert(response.errorMessage);
												});
								;
							}

						}, function(response) {
							alert(response.errorMessage);
						}, self.minSize, self.maxSize, rootScope.selectedLocale.locale);

			};
		}
	};

	self.hidemdDilogue = function() {
		$mdDialog.hide();
	};
	/* Profile Pic Pop Up open and close */

	self.addLocaleinjsonstore = function(locale) {
		jsonStore.addLocale(locale, function(err, result) {
			if (err) {
				Logger.info(err);
			}
		});
	};
	self.addLocaleinLocalStorage = function(locale) {
		var strLocalejson = JSON.stringify(locale);
		console.log("selected locale" + strLocalejson);
		window.localStorage.setItem("MBLocale", strLocalejson);
	};
	self.resettouserLocale = function() {

		rootScope.menuProfile.menulistnotInitialized = true;
		setLocalizedLiteralsForLocale(rootScope.selectedLocale);

	};

	self.setBankId = function() {

		rootScope.menuProfile.menulistnotInitialized = true;
		jsonStore.addBankId(self.bankId, function(err, result) {
			if (result == "SUCCESS") {
				MBaaS.showSimpleDialog("", "Bank Id Updated", "Close",
						function() {
						});
				/*
				 * WL.SimpleDialog.show( "", "Bank Id Updated", [{ text:
				 * "Close", handler: function() {} }]) }
				 */
			}
		});

	};

	self.setBuildType = function() {

		rootScope.menuProfile.menulistnotInitialized = true;
		window.localStorage.setItem("buildType", self.buildType);
		setTimeout(function() {
			MBaaS.reloadApp();
		}, 500);
		MBaaS.showSimpleDialog("", "Build Type  Updated", "Close", function() {
		});
		/*
		 * WL.SimpleDialog.show( "", "Build Type Updated", [{ text: "Close",
		 * handler: function() {} }]);
		 */

		rootScope.buildType = window.localStorage.getItem("buildType");

	};

	/* to save user id checkox status */
	self.saveCheckBoxStatus = function(status) {
		localStorage.setItem("rememberUserIdStatus",localStorage.getItem("status"));
	};

	self.setAppType = function() {

		rootScope.menuProfile.menulistnotInitialized = true;
		window.localStorage.setItem("isStubbed", self.appType);
		MBaaS.showSimpleDialog("", "App Mode  Updated", "Close", function() {
		});
		rootScope.isStubbed = window.localStorage.getItem("isStubbed");
		setTimeout(function() {
			MBaaS.reloadApp();
		}, 500);

	};

	self.getAppType = function() {

		rootScope.menuProfile.menulistnotInitialized = true;
		if (window.localStorage.getItem("isStubbed") != null
				&& window.localStorage.getItem("isStubbed") != "") {
			if (window.localStorage.getItem("isStubbed") == "true") {
				self.currentAppType = "STUBBED";
			} else if (window.localStorage.getItem("isStubbed") == "false") {
				self.currentAppType = "REAL TIME";
			}
		} else {
			self.appType = "REAL TIME";
		}

	};

	self.getBankId = function() {

		rootScope.menuProfile.menulistnotInitialized = true;
		if (rootScope.devMode) {
			jsonStore.getBankid(function(err, result) {
				if (err) {
					Logger.info(err);
					return;
				}
				if (result != undefined && result.length > 0) {
					rootScope.setBankId = result[0].bankId;
					rootScope.$apply();
				}
			});
		}

	};
	self.setServerURL = function() {
		var serverURL = self.MBAASURL;
		MBaaS.setServerUrl(serverURL, self.setServerURLSuccess,
				self.setServerURLFailure);
	};

	self.setServerURLSuccess = function() {
		// Display the newly set server URL.
		setTimeout(function() {
			MBaaS.reloadApp();
		}, 500);
	};

	self.setServerURLFailure = function() {
		MBaaS.showSimpleDialog("Change Server URL",
				"Failed setting Server URL", "Close", function() {
				});
		/*
		 * WL.SimpleDialog.show( "Change Server URL", "Failed setting Server
		 * URL", [{ text: "Close", handler: function() {} }] )
		 */
	};

	self.getServerURL = function() {
		MBaaS.getServerUrl(self.getServerURLSuccess, self.getServerURLFailure);
	};

	self.getServerURLSuccess = function(serverURL) {
		self.CURRENT_MBAASURL = JSON.stringify(serverURL);
		rootScope.$apply();

	};

	self.getServerURLFailure = function() {
		MBaaS.showSimpleDialog("Change MBAAS URL",
				"Failed retrieving the server URL", "Close", function() {
				});
	};
	self.picImage = function() {

		openPhotos(
				function(response) {

					// if(WL.Client.getEnvironment() == WL.Environment.IPHONE ||
					// WL.Client.getEnvironment() == WL.Environment.IPAD){
					if (MBaaS.isIPhoneEnv() || MBaaS.isIPadEnv()) {
						response = JSON.parse(response);
					}

					if (response.image != "") {
                        self.content_type = response.content_type;
						self.userProfilePicTemp = response.image;
						ActionProcessor
								.setEvent("uploadProfilePic")
								.then(
										function(data) {

											if (data.responsesList[0].successMessage == "SUCCESS") {
												rootScope
														.displayToast(rootScope.appLiterals.APP.SUCCESS_MESSAGE.PROFILE_PHOTO_SUCCESS_MSG);
												self.userProfilePicPresent = true;
												self.userProfilePic = "data:image/jpeg;base64,"
														+ response.image;
												rootScope.$apply();

											}

										}, function(error) {
											// Error reading framework.json
											// file. Handle this with a retry.
											alert(response.errorMessage);
										});
						;
					}
					console.log(self.userProfilePic);
				}, function(response) {
					alert(response.errorMessage);
				}, self.minSize, self.maxSize, rootScope.selectedLocale.locale,
				self.imageFormat);

	};

	self.captureImage = function() {

		capturePhoto(
				function(response) {
					// if(WL.Client.getEnvironment() == WL.Environment.IPHONE ||
					// WL.Client.getEnvironment() == WL.Environment.IPAD){
					if (MBaaS.isIPhoneEnv() || MBaaS.isIPadEnv()) {
						response = JSON.parse(response);
					}

					if (response.image != "") {
						self.userProfilePicTemp = response.image;
						ActionProcessor
								.setEvent("uploadProfilePic")
								.then(
										function(data) {

											if (data.responsesList[0].successMessage == "SUCCESS") {
												rootScope
														.displayToast(rootScope.appLiterals.APP.SUCCESS_MESSAGE.PROFILE_PHOTO_SUCCESS_MSG);
												self.userProfilePicPresent = true;
												self.userProfilePic = "data:image/jpeg;base64,"
														+ response.image;
												rootScope.$apply();

											}

										}, function(error) {
											// Error reading framework.json
											// file. Handle this with a retry.
											alert(response.errorMessage);
										});
						;
					}

				}, function(response) {
					alert(response.errorMessage);
				}, self.minSize, self.maxSize, rootScope.selectedLocale.locale);

	};
	self.getSubscriptionStatus = function() {
		// alert("is getSubscriptionStatus called")
		// if(isPushSubscribed()!=null || isPushSubscribed()!=undefined)
		// self.isSubscribed=isPushSubscribed();

		self.isSubscribed = PushNotification.getSubscriptionStatus();

		//self.isSubscribed = getSubscriptionStatus();
	};

	self.changeNotifySubscriptionStatus = function() {
		// alert("change :"+self.isSubscribed);
		// if(status==='sub'){
		if (PushNotification.getSubscriptionStatus()) { //true

		    rootScope.showConfirmBox("Do you want to Un-register for Push Notifications","Yes","Cancel",
            function(){
                PushNotification.deRegisterForPush();
                self.isSubscribed = true;
            }, self.isSubscribed = false);

/*		    WL.SimpleDialog.show(
            "Push Notification",
            "Do you want to Un-register for Push Notifications.",
            [
                {
                    text : 'No',
                    handler :function() {
                        //do nothing
                        self.isSubscribed = true;
                    }
                },
                {
                    text : 'Yes',
                    handler : function() {
                        PushNotification.deRegisterForPush();
                        self.isSubscribed = false;
                    }
                }
            ]
            );
*/
		}
		else {
		     rootScope.showConfirmBox("Do you want to register for Push Notifications","Yes","Cancel",
                         function(){
                             PushNotification.registerForPush();
                             self.isSubscribed = false;
                         }, self.isSubscribed = true);

		     /* WL.SimpleDialog.show(
                "Push Notification",
                "Do you want to register for Push Notifications.",
                [
                    {
                        text : 'No',
                        handler :function() {
                            //do nothing
                            self.isSubscribed = false;
                        }
                    },
                    {
                        text : 'Yes',
                        handler : function() {
                            PushNotification.registerForPush();
                            self.isSubscribed = true;
                        }
                    }
                ]
             );
             */
		}
	};

	/**
	 * All the password fields are resetted and also for password strength
	 * fields
	 * 
	 * @constructor
	 */

	self.password = {
		strengthRules : [],
		currentPasswordType : self.passwordType.None,

		isLgnTooShort : false,
		isLgnWeak : false,
		isLgnFair : false,
		isLgnStrong : false,
		isLgnIronclad : false,

		isTxnTooShort : false,
		isTxnWeak : false,
		isTxnFair : false,
		isTxnStrong : false,
		isTxnIronclad : false,

		isMPINTooShort : false,
		isMPINWeak : false,
		isMPINFair : false,
		isMPINStrong : false,
		isMPINIronclad : false,

		icDigitsRE : "",
		icSpecialsRE : "",
		weakDigitsRE : "",
		weakSpecialsRE : "",
		fairDigitsRE : "",
		fairSpecialsRE : "",
		strongDigitsRE : "",
		strongSpecialsRE : "",
		passwordStrengthLgnText : "",
		passwordStrengthTxnText : "",
		passwordStrengthMPINText : "",
		hideTxnPasswordStrength : true,
		hideLgnPasswordStrength : true,
		hideMPINLgnPasswordStrength : true,
		changeTransactionPassword : false,
		changeLoginPassword : false,

		forgotPasswordSubmit : function() {
			if (self.password.changeLoginPassword == true
					&& self.password.changeTransactionPassword == true
					&& (self.newPassword === '' || self.confirmPassword === ''
							|| self.txnNewPassword === '' || self.txnConfirmPassword === '')) {
				self.newPassword = '';
				self.confirmPassword = '';
				self.txnNewPassword = '';
				self.txnConfirmPassword = '';
			} else if (self.password.changeTransactionPassword == true
					&& (self.txnNewPassword === '' || self.txnConfirmPassword === '')) {
				self.txnNewPassword = '';
				self.txnConfirmPassword = '';
			}

			else if (self.password.changeLoginPassword == true
					&& (self.newPassword === '' || self.confirmPassword === '')) {
				self.newPassword = '';
				self.confirmPassword = '';
			}
			scope.setEvent("onForgotLoginTranDoneClick");
		},

		initPasswordStrengthRules : function(response) {
			self.password.clearStrengthData();
			if (!response[0].hasOwnProperty('errorMessage')
					&& (self.password.strengthRules === undefined || self.password.strengthRules.length == 0)) {
				// 775195
				if (response[0].rules[0] != undefined
						&& response[0].rules[0].length != 0) {
					self.password.strengthRules = response[0].rules[0];
				} else if (response[0].mpinRules[0] != undefined
						&& response[0].mpinRules[0].length != 0) {
					self.password.strengthRules = response[0].mpinRules[0];
				}
				self.password.generateRegExpBasedOnRules();
			}
		},

		/**
		 * Password Rules are generated according to the Regular Expression
		 * Values. Check the rules for ironclad, strong, fair and weak. Create
		 * regex for each of these rules. Create the RegExp for ironclad rules.
		 * 
		 * @constructor
		 */
		generateRegExpBasedOnRules : function() {

			// 1. Check the rules for ironclad, strong, fair and weak
			// 2. Create regex for each of these rules
			// Create the RegExp for ironclad rules
			var ironcladRules = self.password.strengthRules.ironclad;
			self.password.icDigitsRE = new RegExp(self.password
					.getDigitsRegExp(ironcladRules.digits));
			// self.password.icCharsRE = new
			// RegExp(self.password.getCharsRegExp(ironcladRules.char));
			self.password.icSpecialsRE = new RegExp(self.password
					.getSpecialsRegExp(ironcladRules.specials));

			// Create the RegExp for strong rules
			var strongRules = self.password.strengthRules.strong;
			self.password.strongDigitsRE = new RegExp(self.password
					.getDigitsRegExp(strongRules.digits));
			// self.password.strongCharRE = new
			// RegExp(self.password.getCharsRegExp(strongRules.char));
			self.password.strongSpecialsRE = new RegExp(self.password
					.getSpecialsRegExp(strongRules.specials));

			// Create the RegExp for fair rules
			var fairRules = self.password.strengthRules.fair;
			self.password.fairDigitsRE = new RegExp(self.password
					.getDigitsRegExp(fairRules.digits));
			// self.password.fairCharRE = new
			// RegExp(self.password.getCharsRegExp(fairRules.char));
			self.password.fairSpecialsRE = new RegExp(self.password
					.getSpecialsRegExp(fairRules.specials));

			// Create the RegExp for weak rules
			var weakRules = self.password.strengthRules.weak;
			self.password.weakDigitsRE = new RegExp(self.password
					.getDigitsRegExp(weakRules.digits));
			// self.password.weakCharRE = new
			// RegExp(self.password.getCharsRegExp(weakRules.char));
			self.password.weakSpecialsRE = new RegExp(self.password
					.getSpecialsRegExp(weakRules.specials));
		},

		/**
		 * This function checks the strength of the password
		 * 
		 * @constructor
		 */
		checkPasswordStrength : function(password, isAppactivation) {
			var isnum = /^\d+$/.test(password);
			if (password.length === 0 || isnum) {
				if (self.password.currentPasswordType === self.passwordType.Transaction)
					self.password.hideTxnPasswordStrength = true;
				if (self.password.currentPasswordType === self.passwordType.Login)
					self.password.hideLgnPasswordStrength = true;
				if (self.password.currentPasswordType === self.passwordType.MPINLogin)
					self.password.hideMPINLgnPasswordStrength = true;
				return;
			} else {
				if (self.password.currentPasswordType === self.passwordType.Transaction)
					self.password.hideTxnPasswordStrength = false;
				if (self.password.currentPasswordType === self.passwordType.Login)
					self.password.hideLgnPasswordStrength = false;
				if (self.password.currentPasswordType === self.passwordType.MPINLogin)
					self.password.hideMPINLgnPasswordStrength = false;
			}
			// Check the first criteria for password strength i.e. min length
			// If password is greater than min length then proceed, else return
			// weak

			// first set all the bools to false.
			if (self.password.currentPasswordType === self.passwordType.Transaction) {
				self.password.isTxnTooShort = false;
				self.password.isTxnWeak = false;
				self.password.isTxnFair = false;
				self.password.isTxnStrong = false;
				self.password.isTxnIronclad = false;
			}
			if (self.password.currentPasswordType === self.passwordType.Login) {
				self.password.isLgnTooShort = false;
				self.password.isLgnWeak = false;
				self.password.isLgnFair = false;
				self.password.isLgnStrong = false;
				self.password.isLgnIronclad = false;
			}
			if (self.password.currentPasswordType === self.passwordType.MPINLogin) {
				self.password.isMPINTooShort = false;
				self.password.isMPINWeak = false;
				self.password.isMPINFair = false;
				self.password.isMPINStrong = false;
				self.password.isMPINIronclad = false;
			}

			var minLength = parseInt(self.password.strengthRules.minLengthOfPassword);
			if (password.length < minLength) {
				// password is weak
				// self.password.isTooShort=true;
				if (self.password.currentPasswordType === self.passwordType.Transaction) {
					self.password.isTxnTooShort = true;
					self.password.passwordStrengthTxnText = rootScope.appLiterals.APP.MYPROFILE.PASSWORD_STRENGTH.TXT_TOO_SHORT;
				} else if (self.password.currentPasswordType === self.passwordType.Login) {
					self.password.isLgnTooShort = true;
					self.password.passwordStrengthLgnText = rootScope.appLiterals.APP.MYPROFILE.PASSWORD_STRENGTH.TXT_TOO_SHORT;
				} else if (self.password.currentPasswordType === self.passwordType.MPINLogin) {
					self.password.isMPINTooShort = true;
					self.password.passwordStrengthMPINText = rootScope.appLiterals.APP.MYPROFILE.PASSWORD_STRENGTH.TXT_TOO_SHORT;
				} else {
					self.password.isTxnTooShort = true;
					self.password.isLgnTooShort = true;
					self.password.isMPINTooShort = true;
					self.password.passwordStrengthLgnText = rootScope.appLiterals.APP.MYPROFILE.PASSWORD_STRENGTH.TXT_TOO_SHORT;
					self.password.passwordStrengthTxnText = rootScope.appLiterals.APP.MYPROFILE.PASSWORD_STRENGTH.TXT_TOO_SHORT;
					self.password.passwordStrengthMPINText = rootScope.appLiterals.APP.MYPROFILE.PASSWORD_STRENGTH.TXT_TOO_SHORT;
				}
				return;
			} else {
				var weakLength = minLength
						+ parseInt(self.password.strengthRules.weak.char);
				var strongLength = minLength
						+ parseInt(self.password.strengthRules.strong.char);
				var fairLength = minLength
						+ parseInt(self.password.strengthRules.fair.char);
				var ironcladLength = minLength
						+ parseInt(self.password.strengthRules.ironclad.char);
				var ironclad = false;
				var strong = false;
				var fair = false;

				// for appactivation by cm
				if (isAppactivation) {
					weakLength = parseInt(self.password.strengthRules.weak.char)
							+ parseInt(self.password.strengthRules.weak.digits)
							+ parseInt(self.password.strengthRules.weak.specials);
					weakLength = weakLength || 1;
					strongLength = parseInt(self.password.strengthRules.strong.char)
							+ parseInt(self.password.strengthRules.strong.digits)
							+ parseInt(self.password.strengthRules.strong.specials);
					fairLength = parseInt(self.password.strengthRules.fair.char)
							+ parseInt(self.password.strengthRules.fair.digits)
							+ parseInt(self.password.strengthRules.fair.specials);
					ironcladLength = parseInt(self.password.strengthRules.ironclad.char)
							+ parseInt(self.password.strengthRules.ironclad.digits)
							+ parseInt(self.password.strengthRules.ironclad.specials);
				}

				// check for ironclad first
				if (password.length >= ironcladLength) {
					ironclad = self.password.icDigitsRE.test(password)
							&& self.password.icSpecialsRE.test(password);
					// self.password.icCharsRE.test(password);
					if (self.password.currentPasswordType === self.passwordType.Transaction)
						self.password.isTxnIronclad = ironclad;
					else if (self.password.currentPasswordType === self.passwordType.Login)
						self.password.isLgnIronclad = ironclad;
					else if (self.password.currentPasswordType === self.passwordType.MPINLogin)
						self.password.isMPINIronclad = ironclad;
					else {
						self.password.isTxnIronclad = ironclad;
						self.password.isLgnIronclad = ironclad;
						self.password.isMPINIronclad = ironclad;
					}
				}
				// if the password is not iron clad then check for strong
				if (!ironclad) {
					// set everything else to false
					if (self.password.currentPasswordType === self.passwordType.Transaction) {
						self.password.isTxnWeak = false;
						self.password.isTxnFair = false;
					}
					if (self.password.currentPasswordType === self.passwordType.Login) {
						self.password.isLgnWeak = false;
						self.password.isLgnFair = false;
					}
					if (self.password.currentPasswordType === self.passwordType.MPINLogin) {
						self.password.isMPINWeak = false;
						self.password.isMPINFair = false;
					}
					if (password.length >= strongLength) {
						strong = self.password.strongDigitsRE.test(password)
								&& self.password.strongSpecialsRE
										.test(password);// &&
						// self.password.strongCharRE.test(password);
						if (self.password.currentPasswordType === self.passwordType.Transaction)
							self.password.isTxnStrong = strong;
						else if (self.password.currentPasswordType === self.passwordType.Login)
							self.password.isLgnStrong = strong;
						else if (self.password.currentPasswordType === self.passwordType.MPINLogin)
							self.password.isMPINStrong = strong;
						else {
							self.password.isTxnStrong = strong;
							self.password.isLgnStrong = strong;
							self.password.isMPINStrong = strong;
						}
					}
					// if the password is not strong, then check fair
					if (!strong) {
						if (self.password.currentPasswordType === self.passwordType.Transaction)
							self.password.isTxnWeak = false;
						if (self.password.currentPasswordType === self.passwordType.Login)
							self.password.isLgnWeak = false;
						if (password.length >= fairLength) {
							fair = self.password.fairDigitsRE.test(password)
									&& self.password.fairSpecialsRE
											.test(password);// &&
							// self.password.fairCharRE.test(password);
							if (self.password.currentPasswordType === self.passwordType.Transaction)
								self.password.isTxnFair = fair;
							else if (self.password.currentPasswordType === self.passwordType.Login)
								self.password.isLgnFair = fair;
							else if (self.password.currentPasswordType === self.passwordType.MPINLogin)
								self.password.isMPINFair = fair;
							else {
								self.password.isTxnFair = fair;
								self.password.isLgnFair = fair;
								self.password.isMPINFair = fair;
							}
						}
						// if the password is not fair then it is weak
						if (!fair) {
							if (self.password.currentPasswordType === self.passwordType.Transaction) {
								self.password.isTxnWeak = true;
								self.password.passwordStrengthTxnText = rootScope.appLiterals.APP.MYPROFILE.PASSWORD_STRENGTH.TXT_WEAK;
							} else if (self.password.currentPasswordType === self.passwordType.Login) {
								self.password.isLgnWeak = true;
								self.password.passwordStrengthLgnText = rootScope.appLiterals.APP.MYPROFILE.PASSWORD_STRENGTH.TXT_WEAK;
							} else if (self.password.currentPasswordType === self.passwordType.MPINLogin) {
								self.password.isMPINWeak = true;
								self.password.passwordStrengthMPINText = rootScope.appLiterals.APP.MYPROFILE.PASSWORD_STRENGTH.TXT_WEAK;
							} else {
								self.password.isTxnWeak = true;
								self.password.isLgnWeak = true;
								self.password.isMPINWeak = true;
								self.password.passwordStrengthLgnText = rootScope.appLiterals.APP.MYPROFILE.PASSWORD_STRENGTH.TXT_WEAK;
								self.password.passwordStrengthTxnText = rootScope.appLiterals.APP.MYPROFILE.PASSWORD_STRENGTH.TXT_WEAK;
								self.password.passwordStrengthMPINText = rootScope.appLiterals.APP.MYPROFILE.PASSWORD_STRENGTH.TXT_WEAK;
							}

						} else {
							if (self.password.currentPasswordType === self.passwordType.Transaction) {
								self.password.passwordStrengthTxnText = rootScope.appLiterals.APP.MYPROFILE.PASSWORD_STRENGTH.TXT_FAIR;
							} else if (self.password.currentPasswordType === self.passwordType.Login) {
								self.password.passwordStrengthLgnText = rootScope.appLiterals.APP.MYPROFILE.PASSWORD_STRENGTH.TXT_FAIR;
							} else if (self.password.currentPasswordType === self.passwordType.MPINLogin) {
								self.password.passwordStrengthMPINText = rootScope.appLiterals.APP.MYPROFILE.PASSWORD_STRENGTH.TXT_FAIR;
							} else {
								self.password.passwordStrengthLgnText = rootScope.appLiterals.APP.MYPROFILE.PASSWORD_STRENGTH.TXT_FAIR;
								self.password.passwordStrengthTxnText = rootScope.appLiterals.APP.MYPROFILE.PASSWORD_STRENGTH.TXT_FAIR;
								self.password.passwordStrengthMPINText = rootScope.appLiterals.APP.MYPROFILE.PASSWORD_STRENGTH.TXT_FAIR;
							}
						}
					} else {
						if (self.password.currentPasswordType === self.passwordType.Transaction) {
							self.password.passwordStrengthTxnText = rootScope.appLiterals.APP.MYPROFILE.PASSWORD_STRENGTH.TXT_STRONG;
						} else if (self.password.currentPasswordType === self.passwordType.Login) {
							self.password.passwordStrengthLgnText = rootScope.appLiterals.APP.MYPROFILE.PASSWORD_STRENGTH.TXT_STRONG;
						} else if (self.password.currentPasswordType === self.passwordType.MPINLogin) {
							self.password.passwordStrengthMPINText = rootScope.appLiterals.APP.MYPROFILE.PASSWORD_STRENGTH.TXT_STRONG;
						} else {
							self.password.passwordStrengthLgnText = rootScope.appLiterals.APP.MYPROFILE.PASSWORD_STRENGTH.TXT_STRONG;
							self.password.passwordStrengthTxnText = rootScope.appLiterals.APP.MYPROFILE.PASSWORD_STRENGTH.TXT_STRONG;
							self.password.passwordStrengthMPINText = rootScope.appLiterals.APP.MYPROFILE.PASSWORD_STRENGTH.TXT_STRONG;
						}
					}
				} else {
					if (self.password.currentPasswordType === self.passwordType.Transaction) {
						self.password.passwordStrengthTxnText = rootScope.appLiterals.APP.MYPROFILE.PASSWORD_STRENGTH.TXT_VERY_STRONG;
					} else if (self.password.currentPasswordType === self.passwordType.Login) {
						self.password.passwordStrengthLgnText = rootScope.appLiterals.APP.MYPROFILE.PASSWORD_STRENGTH.TXT_VERY_STRONG;
					} else if (self.password.currentPasswordType === self.passwordType.MPINLogin) {
						self.password.passwordStrengthMPINText = rootScope.appLiterals.APP.MYPROFILE.PASSWORD_STRENGTH.TXT_VERY_STRONG;
					} else {
						self.password.passwordStrengthLgnText = rootScope.appLiterals.APP.MYPROFILE.PASSWORD_STRENGTH.TXT_VERY_STRONG;
						self.password.passwordStrengthTxnText = rootScope.appLiterals.APP.MYPROFILE.PASSWORD_STRENGTH.TXT_VERY_STRONG;
						self.password.passwordStrengthMPINText = rootScope.appLiterals.APP.MYPROFILE.PASSWORD_STRENGTH.TXT_VERY_STRONG;
					}
				}
			}
		},

		/**
		 * Clear the password strength Indicator
		 * 
		 * @constructor
		 */
		clearStrengthData : function() {
			self.password.isTxnTooShort = false;
			self.password.isTxnWeak = false;
			self.password.isTxnFair = false;
			self.password.isTxnStrong = false;
			self.password.isTxnIronclad = false;

			self.password.isLgnTooShort = false;
			self.password.isLgnWeak = false;
			self.password.isLgnFair = false;
			self.password.isLgnStrong = false;
			self.password.isLgnIronclad = false;

			self.password.isMPINTooShort = false;
			self.password.isMPINWeak = false;
			self.password.isMPINFair = false;
			self.password.isMPINStrong = false;
			self.password.isMPINIronclad = false;

			self.password.passwordStrengthLgnText = "";
			self.password.passwordStrengthTxnText = "";
			self.password.passwordStrengthMPINText = "";
			self.password.hideLgnPasswordStrength = true;
			self.password.hideTxnPasswordStrength = true;
			self.password.hideMPINLgnPasswordStrength = true;
		},

		/**
		 * Creates the regexp for characters - both lower and upper case
		 * 
		 * @constructor
		 */
		getCharsRegExp : function(charCount) {
			var charRule = "";
			for (index = 0; index < charCount; index++) {
				if (charCount === 1) {
					charRule = "[a-zA-Z]";
					break;
				} else {
					charRule += ".*[a-zA-Z]";
				}
			}
			return charRule;
		},

		/**
		 * This function will return a regexp for specials Characters
		 * 
		 * @constructor
		 */
		getSpecialsRegExp : function(specialsCount) {
			var specialRule = "";
			for (index = 0; index < specialsCount; index++) {
				if (specialsCount === 1) {
					specialRule = "[!,@,#,$,%,\^,&,*,?,_,~,<,>]";
					break;
				} else {
					specialRule += ".*[!,@,#,$,%,\^,&,*,?,_,~,<,>]";
				}
			}
			return specialRule;
		},
		/**
		 * This function will return a regexp for digits
		 * 
		 * @constructor
		 */
		getDigitsRegExp : function(digitsCount) {
			var digitsRule = "";
			for (var index = 0; index < digitsCount; index++) {
				if (digitsCount === 1) {
					digitsRule = "[0-9]";
					break;
				} else {
					digitsRule += ".*[0-9]";
				}
			}
			return digitsRule;
		},
	};

			self.rememberUserID = {
				rememberUserIDChk : false,
				rememberUserIDChkStatus : false,
				rememberUser : [],
				userID : "",
				autoCompleteChk : '0',
				stayFocused : false,

				// init of login page
				initLoginPage : function() {
					//self.rememberUserID.rememberUserIDChk = false;
					//self.rememberUserID.autoCompleteChk = '0';
					//self.rememberUserID.rememberUser = [];
					/*
					 * to display last stored status of remember userd id
					 * checkbox
					 */
					/*self.rememberUserID.rememberUserIDChkStatus = localStorage
							.getItem("rememberUserIdStatus");*/
					localStorage.setItem("status", self.rememberUserID.rememberUserIDChk);
					if (localStorage.getItem("status") == "true")
						self.rememberUserID.rememberUserIDChk = true;
					/*
					 * to display last stored status of remember userd id
					 * checkbox
					 */
					//self.rememberUserID.getData();
					if (!rootScope.$$phase) {
						Logger.debug("Safe root scope apply");
						rootScope.$apply();
					} else {
						Logger.debug("Skipped root scope apply as it was already in progress");
					}
				},

				// display userID in the login page if the stored userId size is
				// just one
				// onlyUser:function(){
				// userID="";
				// self.rememberUserID.rememberUser.length===1?userID=self.rememberUserID.rememberUser[0]:userID
				// ="";
				// return userID;
				// },

				// //on text changed of userID
				// onTextChanged:function(){

				// (self.rememberUserID.rememberUser.length===0 ||
				// (self.rememberUserID.rememberUser |
				// filter:fields.finacleUserCorporateId).length ===0)?
				// myProfile.rememberUserID.autoCompleteChk='0':fields.finacleUserCorporateId.length===0
				// ?
				// myProfile.rememberUserID.autoCompleteChk='0':myProfile.rememberUserID.autoCompleteChk='1';
				// },

				// when focus shifts out of userid textbox
				focusShift : function() {
					setTimeout(function() {
						if (self.rememberUserID.stayFocused === true) {
							self.rememberUserID.autoCompleteChk = '1';
							self.rememberUserID.stayFocused = false;
						} else {
							self.rememberUserID.autoCompleteChk = '0';
							//$('#dummy-btn').click();	//Fix for ticket 785533

						}
					}, 5);
				},
				getData : function() {
					jsonStore
							.getAllDocs(function(err, result) {
								if (err) {
									console.log('error result', err);
								}
								console.log('success result', result);
								rootScope.notifications
										.getAllNotificationFirst();
								// //putting the condition to fetch the mpins
								// if(rootScope.appVersionDetails.appConfigParams[1].BUILDTYPE
								// === 'MPIN'){
								// self.getMPINsHistory();
								// }

								self.rememberUserID.rememberUser = result;
								if (self.rememberUserID.rememberUser !== null)
									if (self.rememberUserID.rememberUser.length === 1) {
										if (self.rememberUserID.rememberUser[0] != null) {
											/* 765019 START */
											rootScope.fields.finacleUserCorporateId = self.rememberUserID.rememberUser[0].name;
											rootScope.$apply();
											/* 765019 END */
											self.rememberUserID.userID = self.rememberUserID.rememberUser[0].name;
											// self.rememberUserID.rememberUserIDChk=true;
										}
									}
								// else
								// self.rememberUserID.userID ="";
								// $('#dummy2-btn').click();
								// alert(JSON.stringify(self.rememberUser));
							});
				}

			},

			self.referAndShare = {
				// first page
				message : "",
				shareOnline : function(mess) {
					shareMessage(function(response) {
						Logger.info("======share success: ");
					}, function(response) {
						Logger.info("======share errorerror: ");

					}, mess);
				},
				// 770289 fix
				/*
				 * getMessage:function(otherTemp){
				 * if(otherTemp.hasOwnProperty('referFriendMessage'))
				 * self.referAndShare.message=otherTemp.referFriendMessage; },
				 */

				getMessage : function() {
					self.referAndShare.message = rootScope.appLiterals.APP.OTHER_TEMPLATES.REFER_FRND_MSG;
				},

				// second page
				alpha : "",
				name : "",
				contactId : "",
				fullName : "",
				number : "",
				toSendNumber:"",
				isFromContact : false,

				getContact : function() {

					openContact(
							function(response) {
								// alert(JSON.stringify(response));
								// if(response.message ==="yes"){
								// self.chooseContact=true;
								// Logger.info("response for mobile recharge" +
								// JSON.stringify(response));
								// alert(JSON.stringify(response));
								// self.contact.contactId=response.id;
								// self.contact.name=response.name;
								// self.referAndShare.contactId=response.id;
								rootScope.getContactBtnClicked=true;
								if (response.hasOwnProperty('name')) {
									self.referAndShare.name = response.name.givenName;
									self.referAndShare.alpha = self.referAndShare.name
											.charAt(0);
									self.referAndShare.fullName = response.name.formatted;

									if (response.phoneNumbers.length !== 0) {

										self.referAndShare.number = response.phoneNumbers[0].value;
										self.referAndShare.toSendNumber = self.referAndShare.number.replace(/\s+/g, ''); // FS 797371

										// alert('cm');
										self.referAndShare.isFromContact = true;

									} else {
										alert(rootScope.appLiterals.APP.MOBILE_RECHARGE.ERROR_MESSAGE.NO_NUM_FOUND_FOR_THIS_CONTACT);
										self.referAndShare.clearContactData();

									}
								}

								$('#hide-btn').click();

							}, function(error) {
								self.referAndShare.phoneNumber = "";
								$('#hide-btn').click();
							}, {});
					 
				},
				// FS 797371
				getFormattedPhoneNumber: function(){
					console.log("self.referAndShare.toSendNumber"+self.referAndShare.toSendNumber);
					console.log("self.referAndShare.number"+self.referAndShare.number);
					if(self.referAndShare.toSendNumber =="")
					{
					self.referAndShare.message='RefferingAFriend-'+self.referAndShare.fullName+'-Mbnumber-'+self.referAndShare.number;
					self.referAndShare.getNumber(self.referAndShare.number);
					}
					else {
						
						if(self.referAndShare.toSendNumber.includes(self.referAndShare.number))
							{
							self.referAndShare.toSendNumber=self.referAndShare.toSendNumber.replace('+','%2b');
								self.referAndShare.message='RefferingAFriend-'+self.referAndShare.fullName+'-Mbnumber-'+self.referAndShare.toSendNumber;
								
							}
							else{
								self.referAndShare.message='RefferingAFriend-'+self.referAndShare.fullName+'-Mbnumber-'+self.referAndShare.number;
							}
					}
				},
					
				// FS 797371

				getNumber : function(num) {
					if (num !== "") {
						num = num.replace(/\D/g, '');

						if (num.length >= 10) {
							countryCode = num.slice(0, num.length - 10);

							num = num.slice(num.length - 10, num.length);
							self.referAndShare.number = num * 1;

						} else {
							alert(rootScope.appLiterals.APP.MOBILE_RECHARGE.ERROR_MESSAGE.NOT_VALID_NUM);
							num = "";
							self.referAndShare.number = num;
						}

					} else
						self.referAndShare.number = num;
				},

				clearContactData : function() {
					self.referAndShare.alpha = "";
					self.referAndShare.name = "";
					self.referAndShare.contactId = "";
					self.referAndShare.fullName = "";
					self.referAndShare.number = "";
					self.referAndShare.toSendNumber = "";//FS 797371
					self.referAndShare.isFromContact = false;					
				},
				// third page

				successMessage : "",

				initSuccesspage : function(response) {
					if (response.hasOwnProperty('successMsg')) {
						self.referAndShare.successMessage = response.successMsg;
					}
				}
			};

	self.oldPassword = '';
	self.newPassword = '';
	self.confirmPassword = '';

	self.txnOldPassword = '';
	self.txnNewPassword = '';
	self.txnConfirmPassword = '';

	self.oldForceTxnPassword = '';
	self.newForceTxnPassword = '';
	self.confirmForceTxnPassword = '';

	self.oldForceLoginPassword = '';
	self.newForceLoginPassword = '';
	self.confirmForceLoginPassword = '';

	self.loginPwdExp = false;
	self.txnPwdExp = false;

	self.forGotPasswordMessage = '';

	self.userID = '';
	self.authenticateOTP = '';

	// remember user ids

	self.loginPwdChk = "LginPwd";
	self.txnPwdChk = "TxnPwd";

	self.callOTP = false;
	self.OTP = '';

	self.passBlank = "";
	// activity model starts here
	self.activityModel = {};
	self.emptyStr = '';
	self.activityModel.channel = '';
	self.activityModel.isDays = 'Y';
	self.activityModel.activityList = [];
	self.activityModel.isSearch = false;
	self.activityModel.channels = [];
	self.activityModel.fromDate = new Date().addDays(-5);
	self.activityModel.toDate = new Date();

	self.activityModel.parseFromDate = function() {
		self.activityModel.fromDay = self.activityModel.fromDate.getDate()
				.toString();
		self.activityModel.fromMonth = (self.activityModel.fromDate.getMonth() + 1)
				.toString();
		self.activityModel.fromYear = self.activityModel.fromDate.getFullYear()
				.toString();
	};
	self.activityModel.parseToDate = function() {
		self.activityModel.toDay = self.activityModel.toDate.getDate()
				.toString();
		self.activityModel.toMonth = (self.activityModel.toDate.getMonth() + 1)
				.toString();
		self.activityModel.toYear = self.activityModel.toDate.getFullYear()
				.toString();
	};
	self.activityModel.parseFromDate();
	self.activityModel.parseToDate();

	self.activityModel.responseInit = function(response) {
		if (!(response.hasOwnProperty('errorMessage') || response
				.hasOwnProperty('genericErrorMsg'))) {
			self.activityModel.channels = response.channelList;
			self.activityModel.fromDate = null;// new Date().addDays(-5);
			self.activityModel.toDate = null;// new Date();
			self.activityModel.channel = '';
		}
	};
	self.activityModel.responseContinue = function(response) {
		if (!(response.hasOwnProperty('errorMessage')
				|| response.hasOwnProperty('genericErrorMsg') || response
				.hasOwnProperty('channelList'))) {
			self.activityModel.activityList = response.selfAuditList;
			self.activityModel.displayFromDate = self
					.setFormatedDate(self.activityModel.fromDate);
			self.activityModel.displayToDate = self
					.setFormatedDate(self.activityModel.toDate);
		}
	};
	// end of activity model

	// passwordMessageString:"",
	self.otpLinkenable = true;
	/**
	 * Used to Display the OTP Message with the Valid Number.
	 * 
	 * @constructor
	 */
	self.setOTP = function(response) {
		console.log(response.otpMessage);
		message = response.otpMessage;
		matches = message.match(/(\d+)/);
		self.OTP = matches[1];
		self.regenerateOTPTimeoutInSeconds = response.regenerateOTPTimeoutInSeconds;
	};

	/**
	 * Disable the Regenerate OTP button for the value given in the
	 * regenerateOTPTimeoutInSeconds
	 * 
	 * @constructor
	 */
	self.disableOTPClick = function() {
		self.otpLinkenable = false;
		setTimeout(function() {
			self.otpLinkenable = true;
			rootScope.$apply();
		}, self.regenerateOTPTimeoutInSeconds * 1000);
	};
	/*
	 * Method call for download profile Pic
	 */

	self.updateProfilePic = function() {

		if (self.userProfilePic == undefined) {
			if(!rootScope.isStubbedVersion){
				rootScope.showOverlayFlag = true;
			}
			ActionProcessor
					.setEvent("loadProfilePic")
					.then(
							function(data) {

								console
										.log(JSON
												.stringify(data.responsesList[0].userProfilePic));
								self.userProfilePic = data.responsesList[0].userProfilePic;
								if (data.responsesList[0].userProfilePic != null
										&& data.responsesList[0].userProfilePic != null) {
									self.userProfilePicPresent = true;
									self.minSize = data.responsesList[0].PHOTO_MINIMUM_SIZE;
									self.maxSize = data.responsesList[0].PHOTO_MAXIMUM_SIZE;
									self.imageFormat = data.responsesList[0].PHOTO_FORMAT;
								}
								if (data.responsesList[0].userProfilePic == "") {
									self.userProfilePicPresent = false;

								}
								rootScope.showOverlayFlag = false;

							}, function(error) {
								// Error reading framework.json file. Handle
								// this with a retry.
								rootScope.showOverlayFlag = false;

							});
			;
		}

		else if (self.userProfilePic == "") {
			self.userProfilePicPresent = false;

		}
	};
	/**
	 * It will display the Force Changed Password
	 * 
	 * @constructor
	 */
	self.forcePasswordMessagePageOnLoad = function(response) {

		if (response.forceLoginPassword === 'TRUE') {
			self.loginPwdExp = true;
			self.loginPwdChk = "LginPwd";
		} else {
			self.loginPwdExp = false;
			self.loginPwdChk = "";
		}
		if (response.forceTxnPassword === 'TRUE') {
			self.txnPwdExp = true;
			self.txnPwdChk = "TxnPwd";
		} else {
			self.txnPwdExp = false;
			self.txnPwdChk = "";
		}
		self.sessionId = response.sessKey;
		self.mparam = response.mbParam;
		console.log(response);

		// Now set the rules for password strength here.
		self.password.strengthRules = response.rules[0];
		self.password.generateRegExpBasedOnRules();
	};

	self.forgotPwdAuthResponse = function(response) {
		if (typeof response != 'undefined') {
			if (typeof response.errorMessage === 'undefined'
					&& typeof response.errors === 'undefined'
					&& self.userID !== '') {
				self.sessionId = response.sessKey;
				self.mparam = response.mbParam;
				self.callOTP = true;
			}
		}
	};

	self.setForGotPasswordMessage = function(message) {
		self.forGotPasswordMessage = message;
	};

	/**
	 * Function to reset all the password enabled fields.
	 * 
	 * @constructor
	 */
	self.resetPwdFields = function() {

		self.userID = '';
		self.oldPassword = '';
		self.newPassword = '';
		self.confirmPassword = '';

		self.txnOldPassword = '';
		self.txnNewPassword = '';
		self.txnConfirmPassword = '';

		self.oldForceTxnPassword = '';
		self.newForceTxnPassword = '';
		self.confirmForceTxnPassword = '';

		self.oldForceLoginPassword = '';
		self.newForceLoginPassword = '';
		self.confirmForceLoginPassword = '';

		self.authenticateOTP = '';

		self.passwordMessageString = '';

		// rootScope.finacleUserCorporateId = 'User Name';
		// rootScope.finacleUserPassword = 'Password';
		// console.log(rootScope);
	};
	// Added for Touch id- password flow
	self.addPwdToKeychain = function() {

		if (self.confirmForceLoginPassword !== "") {
			self.keychainPwd = self.confirmForceLoginPassword;
		} else if (self.confirmPassword !== "") {
			self.keychainPwd = self.confirmPassword;
		} else if (rootScope.stepupAuthentication.PASSWORD_CHALLENGE.strPasswordChallenge !== "") {
			self.keychainPwd = rootScope.fields.finacleUserPassword;
		}
		if (typeof rootScope.stepupAuthentication.PASSWORD_CHALLENGE.strUserId != 'undefined'
				&& rootScope.stepupAuthentication.PASSWORD_CHALLENGE.strUserId !== "") {
			self.updateKeychainUserId();
		}

		if (typeof self.keychainPwd != 'undefined' && self.keychainPwd !== ""
				&& self.keychainPwd !== null) {
			self.keychainPwd = EncryptDecryptService
					.encryption(self.keychainPwd);
			cordova
					.exec(
							function(response) {

								console.log(response);
								if (response.toUpperCase() == rootScope.fields.finacleUserCorporateId
										.toUpperCase()) {
									rootScope.appActivation
											.setKeyChain(
													"MPIN",
													rootScope.appActivation.keyChainServiceName,
													self.keychainPwd);
									self.keychainPwd = '';
								}
							},
							function(response) {

								console.log(response);
							},
							"Keychain",
							"getForKey",
							[ "username",
									rootScope.appActivation.keyChainServiceName ]);
		}

	};
	// Added for Touch id- password flow
	self.updateKeychainUserId = function() {
		cordova.exec(function(response) {

			console.log(response);
			if (response == rootScope.fields.masterUserID) {
				rootScope.appActivation.setKeyChain("username",
						rootScope.appActivation.keyChainServiceName,
						rootScope.fields.finacleUserCorporateId);
			}
		}, function(response) {

			console.log(response);
		}, "Keychain", "getForKey", [ "masterUserID",
				rootScope.appActivation.keyChainServiceName ]);
	};
	// added for error login scenarios
	self.errorCheck = function(responseList) {
		if (responseList && !responseList[0].hasOwnProperty('errorMessage')) {
			rootScope.finacleUserCorporateId = 'User Name';
			rootScope.finacleUserPassword = 'Password';
		}
	};

	// ///////////////////////////// Forgot User ID //////////////////////

	self.forgotUserID = {
		firstName : '',
		lastName : '',
		birthDate : '',
		accountID : '',
		address1 : '',
		address2 : '',
		city : '',
		state : '',
		postalCode : '',
		mailID : '',
		mobileNumber : '',
		country : '',
		countrylist : [],
		currentDate : '',

		clearForgotUserIDDetails : function() {
			self.forgotUserID.firstName = '';
			self.forgotUserID.lastName = '';
			self.forgotUserID.birthDate = '';
			self.forgotUserID.accountID = '';
			self.forgotUserID.address1 = '';
			self.forgotUserID.address2 = '';
			self.forgotUserID.city = '';
			self.forgotUserID.state = '';
			self.forgotUserID.postalCode = '';
			self.forgotUserID.mailID = '';
			self.forgotUserID.mobileNumber = '';
			self.forgotUserID.country = '';
			self.forgotUserID.countrylist = [];
			self.forgotUserID.dateDay = '';
			self.forgotUserID.dateMonth = '';
			self.forgotUserID.dateYear = '';
			self.forgotUserID.currentDate = '';

		},

		initForgotUID : function(responseList) {
			if (!responseList[0].hasOwnProperty('errorMessage')) {
				self.forgotUserID.countrylist = responseList[0].country;
				self.forgotUserID.forgotUserID = responseList[0].sessKey;
			}
		},
		onClickFUID : function() {
			self.forgotUserID.address = self.forgotUserID.address1 + " "
					+ self.forgotUserID.address2;
			if (self.forgotUserID.birthDate !== ""
					&& self.forgotUserID.birthDate !== "null") {
				self.forgotUserID.dateDay = self.forgotUserID.birthDate
						.getDate().toString();
				self.forgotUserID.dateMonth = (self.forgotUserID.birthDate
						.getMonth() + 1).toString();
				self.forgotUserID.dateYear = self.forgotUserID.birthDate
						.getFullYear().toString();
				self.forgotUserID.currentDate = new Date();
			}
		}
	};

	// ///////////////////////////////// Update Nickname //////////////
	self.updateNickname = {

		nicknameDetails : [],
		submitNicknameDetails : [],
		authStatus : false,
		transactionPassword : '',
		selectedIndexArray : [],
		selectedNicknameArray : [],
		selectedIndexAsString : '',
		selectedNicknameAsString : '',
		isDisabled : false,
		isLandingPage : true,
		nickname : [],
		isNicknameModified : false,
		isBack : false,
		lastupdatedIndex : '',
		tempNickNameList:[],
		

		clearNicknameDetails : function() {
			self.updateNickname.nicknameDetails = [];
			self.updateNickname.submitNicknameDetails = [];
			self.updateNickname.authStatus = false;
			self.updateNickname.transactionPassword = '';
			self.updateNickname.selectedIndexArray = [];
			self.updateNickname.selectedNicknameArray = [];
			self.updateNickname.selectedIndexAsString = '';
			self.updateNickname.selectedNicknameAsString = '';
			self.updateNickname.isDisabled = false;
			self.updateNickname.isLandingPage = true;
			self.updateNickname.isNicknameModified = false;
			self.updateNickname.nickname = [];
			self.updateNickname.lastupdatedIndex = '';
		},

		inputModified : function() {
			self.updateNickname.isNicknameModified = true;
		},

		initNicknameDetails : function(responseList) {
			/*
			 * if(self.updateNickname.isLandingPage){
			 * self.updateNickname.nicknameDetails =
			 * responseList[0].updateNickName; self.updateNickname.isLandingPage =
			 * false; }
			 */

			if (self.updateNickname.isLandingPage) {
				
				
				if(self.updateNickname.isBack){
					self.updateNickname.isBack = false;
					self.updateNickname.nicknameDetails = self.updateNickname.tempNickNameList;
				}else{
					self.updateNickname.nicknameDetails = responseList[0].updateNickName;
					
					self.updateNickname.nicknameDetails=_.sortBy(self.updateNickname.nicknameDetails,"subAccountTypeDesc");//Fix for 788472
					//self.updateNickNameDetailsResponse = responseList[0].updateNickName;
				}
				/*if( self.updateFlag==undefined ||  self.updateFlag !== 'continue' ){
					self.updateNickNameDetailsResponse = responseList[0].updateNickName;
					this.setFlag('init');
				}else if(self.updateFlag === 'continue'){
					self.updateNickname.nicknameDetails.forEach(
							function(updatedValue){
								updateNickNameDetailsResponse = updateNickNameDetailsResponse.filter(
										function(responseValue){
											return responseValue.accountNumber !== updatedValue.accountNumber;
										}
								);
							});
					self.updateNickname.nicknameDetails.concat(updateNickNameDetailsResponse);
					this.setFlag('init');
				}*/
				
				for (var index = 0; index < self.updateNickname.nicknameDetails.length; index++) {
					self.updateNickname.Oldnickname[index] = self.updateNickname.nicknameDetails[index].accountNickName;
				}
				self.updateNickname.isLandingPage = false;
			}
			self.updateNickname.isNickNameModified = false;
		},
		submitNicknameResponseDetails : function(responseList) {
			if (!responseList[0].hasOwnProperty('errorMessage')) {
				self.updateNickname.submitNicknameDetails = responseList[0].updateNickName;

				if (responseList[0].auth === 'Transaction Password') {
					self.updateNickname.authStatus = true;
				}
			}
		},
		selectedChangeNicknameIndex : function(index) {
			if (self.updateNickname.selectedIndexArray.indexOf(index) === -1) {
				self.updateNickname.selectedIndexArray.push(index);
				self.updateNickname.isDisabled = true;
				// self.updateNickname.selectedIndexAsString =
				// self.updateNickname.selectedIndexArray.toString();
			}
		},
		updateNicknameModelData : function(index) {
			self.updateNickname.nickname[index] = self.updateNickname.nicknameDetails[index].accountNickName;
		},
		setFlag : function(flag){
			self.updateFlag = flag;
		},
		continueClick : function() {
			
			//this.setFlag('continue');
			
			self.updateNickname.tempNickNameList = self.updateNickname.nicknameDetails;
			self.updateNickname.selectedNicknameArray = [];
			var selectedAccIndex=[];
			for (var index = 0; index < self.updateNickname.selectedIndexArray.length; index++) {
				self.updateNickname.selectedNicknameArray
						.push(self.updateNickname.nickname[self.updateNickname.selectedIndexArray[index]]);
				selectedAccIndex.push(self.updateNickname.nicknameDetails[self.updateNickname.selectedIndexArray[index]].accountNumberValue);
			}
			self.updateNickname.selectedIndexAsString = selectedAccIndex.toString();
			self.updateNickname.selectedNicknameAsString = self.updateNickname.selectedNicknameArray
					.toString();
		}
	};

	// added for update user ids
	self.updateIdInitResponse = {
		masterID : "",
		channelList : []
	};

	self.updateIdModel = {

		masterID : "",
		channelList : "",
		Userid : [],
		UserIndex : [],
		confirmResponse : "",
		transactionPwD : "",
		auth : "",
		strUpdateIndex : "",
		strUpdateIds : "",
		responseText : [],
		isUserIdModified : false,
		editFlag : [],

		inputModified : function() {
			self.updateIdModel.isUserIdModified = true;
		},

		resetUpdateIDModel : function() {
			self.updateIdModel.confirmResponse = "";
			self.updateIdModel.Userid = [];
			self.updateIdModel.editFlag = [];
			self.updateIdModel.UserIndex = [];
			self.updateIdModel.transactionPwD = "";
			self.updateIdModel.strUpdateIndex = "";
			self.updateIdModel.isBack = false;
			self.updateIdModel.isUserIdModified = false;
			self.updateIdModel.strUpdateIds = "";
		}
	};

	self.initUpdateIdPage = function(responseList) {
		if (!responseList[0].hasOwnProperty('errorMessage')
				&& !self.updateIdModel.isBack) {
			self.updateIdModel.isBack = false;
			self.updateIdInitResponse.masterID = responseList[0].masterId;
			self.updateIdInitResponse.channelList = responseList[0].channelList;
			self.updateIdInitResponse.warningMessage = responseList[0].warningMessage;
			self.updateIdInitResponse.isUserIdshared = responseList[0].isUserIdshared;
		}
		self.indexLoop = 0;
	};
	self.checkUserIdPreference = function(index) {
		self.updateNickname.lastupdatedIndex = index;
    	/*for (var i = 0; i < self.updateIdInitResponse.channelList.length; i++) {
			if (i != index) {
				self.updateIdModel.editFlag[i] = false;
			}

			else {
				self.updateIdModel.editFlag[i] = true;
			}
			}*/
	};

	self.changeValue = function(userIndex) {
		if (self.updateIdModel.UserIndex.indexOf(userIndex) === -1) {
			self.updateIdModel.UserIndex[self.indexLoop] = userIndex;
			self.indexLoop++;
		}
	};

	self.updateList = function(value) {

		self.updateIdModel.Userid[value] = self.updateIdInitResponse.channelList[value].userId;
	};

	self.convertToString = function() {
		var indexOf;
		self.userIndexString = "";
		self.userIdString = "";
		self.selectedUserIdChanged = false;
		for (i = 0; i < self.updateIdModel.UserIndex.length; i++) {
			indexOf = parseInt(self.updateIdModel.UserIndex[i]);
			if (self.updateIdModel.UserIndex[i] === self.updateNickname.lastupdatedIndex) {
				self.userIndexString = self.userIndexString
						+ self.updateIdModel.UserIndex[i] + ",";
				self.userIdString = self.userIdString
						+ self.updateIdModel.Userid[indexOf] + ",";
				self.selectedUserIdChanged = true;
			}

		}
		self.userIndexString = self.userIndexString.substring(0,
				self.userIndexString.length - 1);
		self.userIdString = self.userIdString.substring(0,
				self.userIdString.length - 1);
		self.updateIdModel.strUpdateIndex = self.userIndexString;
		self.updateIdModel.strUpdateIds = self.userIdString;
		if (!self.selectedUserIdChanged) {
			rootScope
					.showErrorPopup(rootScope.appLiterals.APP.MYPROFILE.UPDATEUSERID.CHECKED_USER_ID_NOT_MODIFIED);
		}
		/* 773803 START */
		else if (self.updateIdInitResponse.isUserIdshared === 'Y') {
			scope.setEvent('onUserIdEdit');
		} else if (self.updateIdInitResponse.isUserIdshared === 'N') {
			// scope.setEvent('onNNConfirmClick');
			UIControlsService
					.showDialogBox(
							self.updateIdInitResponse.warningMessage,
							rootScope.appLiterals.APP.MYPROFILE.UPDATEUSERID.USER_ID_SHARED_WARNING_MSG,
							rootScope.appLiterals.APP.MYPROFILE.UPDATEUSERID.YES_BTN,
							rootScope.appLiterals.APP.MYPROFILE.UPDATEUSERID.NO_BTN,
							function() {
								ActionProcessor
										.setEvent("onWarningNNConfirmClick")
							}, function() {
								ActionProcessor.setEvent("onNoClick")
							});
		}
		/* 773803 END */
	};

	self.initUpdateIdConfirm = function(responseList) {
		if (!responseList[0].hasOwnProperty('errorMessage')) {
			self.updateIdModel.confirmResponse = responseList[0];
			self.updateIdModel.auth = responseList[0].auth;
			self.updateIdModel.transactionPwD = "";
		}
		self.updateIdModel.transactionPwD = "";
	};

	self.initUpdateIdSuccesspage = function(responseList) {
		self.updateIdModel.responseText = responseList[0].successMessage;
		if (responseList[0].CHANNEL_ID == 'G' && rootScope.isTouchIDActivation) {

			rootScope.fields.finacleUserCorporateId = responseList[0].USER_ID;
			self.updateKeychainUserId();

		}
	};

	self.updatedContactResponse = {
		homePhnNumber : "",
		workPhnNumber : "",
		commNumber : "",
		mobileNumber : "",
		faxNumber : "",
		personalEmail : "",
		workEmail : "",
		workExtensionNumber : ""
	};

	self.updateContactModel = {

		homePhnNumber : "",
		workPhnNumber : "",
		mobileNumber : "",
		personalEmail : "",
		workEmail : "",
		workExtensionNumber : "",
		confirmResponse : "",
		transactionPwD : "",
		auth : "",
		phn : [],
		email : [],
		homePhoneNumberCountry : "",
		homePhoneNumberCity : "",
		homePhoneNumberLocalCode : "",
		homePhoneNumberComplete : "",
		mobileNumberComplete : "",
		mobileNumberCountry : "",
		mobileNumberCity : "",
		mobileNumberLocalCode : "",
		workPhoneNumberCountry : "",
		workPhoneNumberCity : "",
		workPhoneNumberLocalCode : "",
		workPhoneNumberComplete : "",
		workExtenNumber : "",
		prefPhn : "",
		prefEmail : "",
		validatePrsEmailOrMob : false,
		responseText : [],
		resetupdateContactModel : function() {
			self.updateContactModel.homePhnNumber = "";
			self.updateContactModel.workPhnNumber = "";
			self.updateContactModel.mobileNumber = "";
			self.updateContactModel.personalEmail = "";
			self.updateContactModel.workEmail = "";
			self.updateContactModel.workExtensionNumber = "";
			self.updateContactModel.confirmResponse = "";
			self.updateContactModel.transactionPwD = "";
			self.updateContactModel.cocdCountryCodes = [];
			self.updateContactModel.homePhoneNumberCountry = "";
			self.updateContactModel.homePhoneNumberCity = "";
			self.updateContactModel.homePhoneNumberLocalCode = "";
			self.updateContactModel.homePhoneNumberComplete = "";

			self.updateContactModel.mobileNumberCountry = "";
			self.updateContactModel.mobileNumberCity = "";
			self.updateContactModel.mobileNumberLocalCode = "";
			self.updateContactModel.mobileNumberComplete = "";

			self.updateContactModel.workPhoneNumberCountry = "";
			self.updateContactModel.workPhoneNumberCity = "";
			self.updateContactModel.workPhoneNumberLocalCode = "";
			self.updateContactModel.workPhoneNumberComplete = "";

			self.updateContactModel.workExtenNumber = "";
			self.updateContactModel.validatePrsEmailOrMob = false;
		}
	};
	self.initUpdateContactDetails = function(responseList) {
		if (!responseList[0].hasOwnProperty('errorMessage')
				&& !self.updateContactModel.isBack) {

			self.updateContactModel.personalEmail = responseList[0].personalEmailId;
			self.updateContactModel.workEmail = responseList[0].workEmailId;
			self.updateContactModel.cocdCountryCodes = responseList[0].cocdCountryCodes;
			self.updateContactModel.prefPhn = responseList[0].preferredPhone;
			self.updateContactModel.prefEmail = responseList[0].preferredEMail;

			if (self.updateContactModel.prefPhn === 'HOMEPH1') {
				self.updateContactModel.phn[0] = true;
			} else if (self.updateContactModel.prefPhn === 'WORKPH1') {
				self.updateContactModel.phn[1] = true;
			} else if (self.updateContactModel.prefPhn === 'CELLPH') {
				self.updateContactModel.phn[2] = true;
			}

			if (self.updateContactModel.prefEmail === 'HOMEEML') {

				self.updateContactModel.email[1] = true;
			} else if (self.updateContactModel.prefEmail === 'WORKEML') {

				self.updateContactModel.email[0] = true;
			}

			if (responseList[0].homePhoneNumberCountry != "") {
				self.updateContactModel.homePhoneNumberCountry = responseList[0].homePhoneNumberCountry;
				var countryPad = "000";
				self.updateContactModel.homePhoneNumberCountry = countryPad
						.substring(
								0,
								countryPad.length
										- self.updateContactModel.homePhoneNumberCountry.length)
						+ self.updateContactModel.homePhoneNumberCountry;
			}
			if (responseList[0].homePhoneNumberCity != "")
				self.updateContactModel.homePhoneNumberCity = parseFloat(responseList[0].homePhoneNumberCity);
			if (responseList[0].homePhoneNumberLocalCode != "")
				self.updateContactModel.homePhoneNumberLocalCode = parseFloat(responseList[0].homePhoneNumberLocalCode);

			self.updateContactModel.homePhoneNumberComplete = self.updateContactModel.homePhoneNumberCountry
					+ self.updateContactModel.homePhoneNumberCity
					+ self.updateContactModel.homePhoneNumberLocalCode;
			if (self.updateContactModel.homePhoneNumberComplete.length > 13) {
				self.updateContactModel.homePhoneNumberComplete = self.updateContactModel.homePhoneNumberComplete
						.substring(0, 13);
			}

			if (responseList[0].mobileNumberCountry != "") {
				self.updateContactModel.mobileNumber = responseList[0].mobileNumberCountry;
				self.updateContactModel.mobileNumberCountry = responseList[0].mobileNumberCountry;
				var countryPad = "000";
				self.updateContactModel.mobileNumberCountry = countryPad
						.substring(
								0,
								countryPad.length
										- self.updateContactModel.mobileNumberCountry.length)
						+ self.updateContactModel.mobileNumberCountry;
			}

			if (responseList[0].mobileNumberCity != "") {
				self.updateContactModel.mobileNumber = self.updateContactModel.mobileNumber
						+ responseList[0].mobileNumberCity;
				self.updateContactModel.mobileNumberCity = responseList[0].mobileNumberCity;
			}

			if (responseList[0].mobileNumberLocalCode != "") {
				self.updateContactModel.mobileNumber = self.updateContactModel.mobileNumber
						+ responseList[0].mobileNumberLocalCode;
				self.updateContactModel.mobileNumberLocalCode = responseList[0].mobileNumberLocalCode;
			}

			self.updateContactModel.mobileNumberComplete = self.updateContactModel.mobileNumberCountry
					+ self.updateContactModel.mobileNumberCity
					+ self.updateContactModel.mobileNumberLocalCode;
			if (self.updateContactModel.mobileNumberComplete.length > 13) {
				self.updateContactModel.mobileNumberComplete = self.updateContactModel.mobileNumberComplete
						.substring(0, 13);
			}
			Logger.info("mobileNumberLocalCode:: "
					+ self.updateContactModel.mobileNumberComplete);

			if (responseList[0].workPhoneNumberCountry != "") {
				self.updateContactModel.workPhoneNumberCountry = responseList[0].workPhoneNumberCountry;
				var countryPad = "000";
				self.updateContactModel.workPhoneNumberCountry = countryPad
						.substring(
								0,
								countryPad.length
										- self.updateContactModel.workPhoneNumberCountry.length)
						+ self.updateContactModel.workPhoneNumberCountry;
			}
			if (responseList[0].workPhoneNumberCity != "")
				self.updateContactModel.workPhoneNumberCity = parseFloat(responseList[0].workPhoneNumberCity);

			if (responseList[0].workPhoneNumberLocalCode != "")
				self.updateContactModel.workPhoneNumberLocalCode = parseFloat(responseList[0].workPhoneNumberLocalCode);

			self.updateContactModel.workPhoneNumberComplete = self.updateContactModel.workPhoneNumberCountry
					+ self.updateContactModel.workPhoneNumberCity
					+ self.updateContactModel.workPhoneNumberLocalCode;
			if (self.updateContactModel.workPhoneNumberComplete.length > 13) {
				self.updateContactModel.workPhoneNumberComplete = self.updateContactModel.workPhoneNumberComplete
						.substring(0, 13);
			}
			if (responseList[0].workExtenNumber != "")
				self.updateContactModel.workExtenNumber = parseFloat(responseList[0].workExtenNumber);
		}
	};
	self.onback = function() {

		/*
		 * if (self.updateContactModel.homePhoneNumberCity != "")
		 * self.updateContactModel.homePhoneNumberCity =
		 * parseFloat(self.updateContactModel.homePhoneNumberCity);
		 * 
		 * if (self.updateContactModel.homePhoneNumberLocalCode != "")
		 * self.updateContactModel.homePhoneNumberLocalCode =
		 * parseFloat(self.updateContactModel.homePhoneNumberLocalCode);
		 * 
		 * if (self.updateContactModel.mobileNumberCity != "")
		 * self.updateContactModel.mobileNumberCity =
		 * parseFloat(self.updateContactModel.mobileNumberCity);
		 * 
		 * if (self.updateContactModel.mobileNumberLocalCode != "")
		 * self.updateContactModel.mobileNumberLocalCode =
		 * parseFloat(self.updateContactModel.mobileNumberLocalCode);
		 * 
		 * 
		 * if (self.updateContactModel.workPhoneNumberCity != "")
		 * self.updateContactModel.workPhoneNumberCity =
		 * parseFloat(self.updateContactModel.workPhoneNumberCity);
		 * 
		 * if (self.updateContactModel.workPhoneNumberLocalCode!= "")
		 * self.updateContactModel.workPhoneNumberLocalCode =
		 * parseFloat(self.updateContactModel.workPhoneNumberLocalCode);
		 */

	};
	self.checkPhnPreference = function(value, index) {
		if (self.updateContactModel.phn[index] === true)
			self.updateContactModel.prefPhn = value;
		else
			self.updateContactModel.prefPhn = "";
		for (var i = 0; i < 3; i++) {
			if (i != index)
				self.updateContactModel.phn[i] = false;
		}

	};

	self.checkEmailPreference = function(value, index) {
		if (self.updateContactModel.email[index] === true)
			self.updateContactModel.prefEmail = value;
		else
			self.updateContactModel.prefEmail = "";
		for (var i = 0; i < 3; i++) {
			if (i != index)
				self.updateContactModel.email[i] = false;
		}

	};
	self.checkAddressPreference = function(value, index) {
		self.updateAddressModel.preferredAddress = value;
		if (self.updateAddressModel.prefferedAdd[index] == true) {
			for (var i = 0; i < 3; i++) {
				if (i != index) {
					self.updateAddressModel.prefferedAdd[i] = false;

				}

			}

		}

		else {
			/* added for 771610 */
			self.updateAddressModel.prefferedAdd[index] = true;
			/* added for 771610 */

		}

	};
	self.updateAddressDetail = function() {

		self.updateAddressModel.workPostalCode = self.updateAddressModel.workPostalCode
				+ "";
		self.updateAddressModel.communicationPostalCode = self.updateAddressModel.communicationPostalCode
				+ "";
		self.updateAddressModel.permanentPostalCode = self.updateAddressModel.permanentPostalCode
				+ "";
		// 775849 date format issue fix
		if (self.updateAddressModel.workAddressSince != 'Invalid Date') {
			self.updateAddressModel.workAddressSince = self.updateAddressModel.workAddressSince;
		} else {
			self.updateAddressModel.workAddressSince = "";
		}
		self.updateAddressModel.communicationAddressSince = self.updateAddressModel.communicationAddressSince;
		self.updateAddressModel.permanentAddressSince = self.updateAddressModel.permanentAddressSince;

	};
	self.setFormatedDate = function(unformatedDate) {
		var today;
		if(unformatedDate instanceof Date){
			today = unformatedDate;
		}else{
			today = new Date(unformatedDate);
		}
		var dd = today.getDate();
		var mm = today.getMonth() + 1; // January is 0!

		var yyyy = today.getFullYear();
		if (dd < 10) {
			dd = '0' + dd;
		}
		if (mm < 10) {
			mm = '0' + mm;
		}

		var formatDate = mm + '/' + dd + '/' + yyyy;

		return formatDate;

	};

	/* changes for 771660 added not empty checks */
	self.makeUpdateContactResponse = function() {
		if (self.updateContactModel
				.isEmpty(self.updateContactModel.workExtenNumber)) {
			self.updateContactModel.workExtenNumber = "";

		} else {
			self.updateContactModel.workExtenNumber = self.updateContactModel.workExtenNumber
					+ "";

		}

		/*
		 * if(self.updateContactModel.isEmpty(self.updateContactModel.mobileNumberCountry)) {
		 * self.updateContactModel.mobileNumberCountry=""; } else{
		 * self.updateContactModel.mobileNumberCountry =
		 * self.updateContactModel.mobileNumberCountry + ""; }
		 * if(self.updateContactModel.isEmpty(self.updateContactModel.mobileNumberCity)){
		 * self.updateContactModel.mobileNumberCity=""; } else{
		 * self.updateContactModel.mobileNumberCity =
		 * self.updateContactModel.mobileNumberCity + ""; }
		 * if(self.updateContactModel.isEmpty(self.updateContactModel.mobileNumberLocalCode)) {
		 * self.updateContactModel.mobileNumberLocalCode=""; } else {
		 * self.updateContactModel.mobileNumberLocalCode =
		 * self.updateContactModel.mobileNumberLocalCode+ ""; }
		 */

		if (self.updateContactModel
				.isEmpty(self.updateContactModel.mobileNumberComplete)) {
			self.updateContactModel.mobileNumberCountry = "";
			self.updateContactModel.mobileNumberCity = "";
			self.updateContactModel.mobileNumberLocalCode = "";
		} else {
			self.updateContactModel.mobileNumberCountry = self.updateContactModel.mobileNumberComplete
					.substring(0, 3);
			self.updateContactModel.mobileNumberCity = self.updateContactModel.mobileNumberComplete
					.substring(3, 6);
			self.updateContactModel.mobileNumberLocalCode = self.updateContactModel.mobileNumberComplete
					.substring(6);
		}

		/*
		 * if(self.updateContactModel.isEmpty(self.updateContactModel.workPhoneNumberCountry)) {
		 * self.updateContactModel.workPhoneNumberCountry=""; } else {
		 * self.updateContactModel.workPhoneNumberCountry =
		 * self.updateContactModel.workPhoneNumberCountry+""; }
		 * 
		 * if(self.updateContactModel.isEmpty(self.updateContactModel.workPhoneNumberCity)) {
		 * self.updateContactModel.workPhoneNumberCity=""; } else{
		 * self.updateContactModel.workPhoneNumberCity =
		 * self.updateContactModel.workPhoneNumberCity + ""; }
		 * 
		 * if(self.updateContactModel.isEmpty(self.updateContactModel.workPhoneNumberLocalCode)) {
		 * self.updateContactModel.workPhoneNumberLocalCode = ""; } else {
		 * self.updateContactModel.workPhoneNumberLocalCode =
		 * self.updateContactModel.workPhoneNumberLocalCode+ ""; }
		 */

		if (self.updateContactModel
				.isEmpty(self.updateContactModel.workPhoneNumberComplete)) {
			self.updateContactModel.workPhoneNumberCountry = "";
			self.updateContactModel.workPhoneNumberCity = "";
			self.updateContactModel.workPhoneNumberLocalCode = "";
		} else {
			self.updateContactModel.workPhoneNumberCountry = self.updateContactModel.workPhoneNumberComplete
					.substring(0, 3);
			self.updateContactModel.workPhoneNumberCity = self.updateContactModel.workPhoneNumberComplete
					.substring(3, 6);
			self.updateContactModel.workPhoneNumberLocalCode = self.updateContactModel.workPhoneNumberComplete
					.substring(6);
		}

		// if(
		// !self.updateContactModel.isEmpty(self.updateContactModel.mobileNumberCountry)
		// &&
		// !self.updateContactModel.isEmpty(self.updateContactModel.mobileNumberCity)
		// &&
		// !self.updateContactModel.isEmpty(self.updateContactModel.mobileNumberLocalCode)&&
		// !self.updateContactModel.isEmpty(self.updateContactModel.personalEmail))
		if (!self.updateContactModel
				.isEmpty(self.updateContactModel.mobileNumberLocalCode)
				&& !self.updateContactModel
						.isEmpty(self.updateContactModel.personalEmail)) {
			self.updateContactModel.validatePrsEmailOrMob = true;
		}

		/*
		 * if(self.updateContactModel.isEmpty(self.updateContactModel.homePhoneNumberCountry)) {
		 * self.updateContactModel.homePhoneNumberCountry= ""; } else {
		 * self.updateContactModel.homePhoneNumberCountry =
		 * self.updateContactModel.homePhoneNumberCountry + ""; }
		 * 
		 * if(self.updateContactModel.isEmpty(self.updateContactModel.homePhoneNumberCity)) {
		 * self.updateContactModel.homePhoneNumberCity=""; } else {
		 * self.updateContactModel.homePhoneNumberCity =
		 * self.updateContactModel.homePhoneNumberCity+ ""; }
		 * 
		 * 
		 * if(self.updateContactModel.isEmpty(self.updateContactModel.homePhoneNumberLocalCode)) {
		 * self.updateContactModel.homePhoneNumberLocalCode =""; } else{
		 * self.updateContactModel.homePhoneNumberLocalCode =
		 * self.updateContactModel.homePhoneNumberLocalCode+ ""; }
		 */

		if (self.updateContactModel
				.isEmpty(self.updateContactModel.homePhoneNumberComplete)) {
			self.updateContactModel.homePhoneNumberCountry = "";
			self.updateContactModel.homePhoneNumberCity = "";
			self.updateContactModel.homePhoneNumberLocalCode = "";
		} else {
			self.updateContactModel.homePhoneNumberCountry = self.updateContactModel.homePhoneNumberComplete
					.substring(0, 3);
			self.updateContactModel.homePhoneNumberCity = self.updateContactModel.homePhoneNumberComplete
					.substring(3, 6);
			self.updateContactModel.homePhoneNumberLocalCode = self.updateContactModel.homePhoneNumberComplete
					.substring(6);
		}

	};
	/* changes for 771660 added not empty checks */

	self.updateContactModel.isEmpty = function(val) {
		return (val === undefined || val == null || val.length <= 0 || val === "") ? true
				: false;
	};

	self.convertStringContact = function() {
		if (self.updateContactModel.homePhnNumber !== "")
			self.updateContactModel.homePhnNumber = self.updateContactModel.homePhnNumber * 1;
		if (self.updateContactModel.workPhnNumber !== "")
			self.updateContactModel.workPhnNumber = self.updateContactModel.workPhnNumber * 1;
		if (self.updateContactModel.commNumber !== "")
			self.updateContactModel.commNumber = self.updateContactModel.commNumber * 1;
		self.updateContactModel.mobileNumber = self.updateContactModel.mobileNumber;
		if (self.updateContactModel.faxNumber !== "")
			self.updateContactModel.faxNumber = self.updateContactModel.faxNumber * 1;
		self.updateContactModel.workExtensionNumber = self.updateContactModel.workExtensionNumber;
	};

	self.initUpdateAddressDetails = function(responseList) {
		if (!responseList[0].hasOwnProperty('errorCode')) {
			if (responseList[0].hasOwnProperty('stateFetch')) {
				if (responseList[0].activeTab == "work") {
					self.updateAddressModel.StateCodeWork = responseList[0].stateArray;
					self.updateAddressModel.workState = "";
					self.updateAddressModel.workCity = "";
					self.updateAddressModel.workPostalCode = "";
					self.updateAddressModel.workAddressSince = "";
				} else if (responseList[0].activeTab == "comm") {
					self.updateAddressModel.StateCodeComm = responseList[0].stateArray;
					self.updateAddressModel.communicationState = "";
					self.updateAddressModel.communicationCity = "";
					self.updateAddressModel.communicationPostalCode = "";
					self.updateAddressModel.communicationAddressSince = "";
				} else if (responseList[0].activeTab == "perm") {
					self.updateAddressModel.StateCodePerm = responseList[0].stateArray;
					self.updateAddressModel.permanentState = "";
					self.updateAddressModel.permanentCity = "";
					self.updateAddressModel.permanentPostalCode = "";
					self.updateAddressModel.permanentAddressSince = "";
				}

			} else if (!self.addressIntialized) {
				self.updateAddressModel.StateCodeWork = responseList[0].stateArray;
				self.updateAddressModel.StateCodeComm = responseList[0].stateArrayComm;
				self.updateAddressModel.StateCodePerm = responseList[0].stateArrayPerm;
				self.updateAddressModel.preferredAddress = responseList[0].preferredAddress;
				self.updateAddressModel.firstName = responseList[0].firstName;
				self.updateAddressModel.lastName = responseList[0].lastName;
				self.updateAddressModel.cocdCountryCodes = responseList[0].cocdArrayCountry;
				self.updateAddressModel.workAddressLineOne = responseList[0].workAddressLineOne;
				self.updateAddressModel.workAddressLineTwo = responseList[0].workAddressLineTwo;
				self.updateAddressModel.workAddressLineThree = responseList[0].workAddressLineThree;
				self.updateAddressModel.workCountry = responseList[0].workCountry;
				self.updateAddressModel.workState = responseList[0].workState;
				self.updateAddressModel.workCity = responseList[0].workCity;
				if (responseList[0].workPostalCode != "")
					self.updateAddressModel.workPostalCode = responseList[0].workPostalCode;
				// 775849 fix
				if (responseList[0].workAddressSince != "")
					self.updateAddressModel.workAddressSince = self
							.parseDate(responseList[0].workAddressSince);
				else
					self.updateAddressModel.workAddressSince = responseList[0].workAddressSince;
				self.updateAddressModel.communicationAddressLineOne = responseList[0].communicationAddressLineOne;
				self.updateAddressModel.communicationAddressLineTwo = responseList[0].communicationAddressLineTwo;
				self.updateAddressModel.communicationAddressLineThree = responseList[0].communicationAddressLineThree;
				self.updateAddressModel.communicationCountry = responseList[0].communicationCountry;
				self.updateAddressModel.communicationState = responseList[0].communicationState;
				self.updateAddressModel.communicationCity = responseList[0].communicationCity;
				if (responseList[0].communicationPostalCode != "")
					self.updateAddressModel.communicationPostalCode = responseList[0].communicationPostalCode;

				if (responseList[0].communicationAddressSince != "")
					self.updateAddressModel.communicationAddressSince = self
							.parseDate(responseList[0].communicationAddressSince);
				else
					self.updateAddressModel.communicationAddressSince = responseList[0].communicationAddressSince;
				self.updateAddressModel.permanentAddressLineOne = responseList[0].permanentAddressLineOne;
				self.updateAddressModel.permanentAddressLineTwo = responseList[0].permanentAddressLineTwo;
				self.updateAddressModel.permanentAddressLineThree = responseList[0].permanentAddressLineThree;
				self.updateAddressModel.permanentCountry = responseList[0].permanentCountry;
				self.updateAddressModel.permanentState = responseList[0].permanentState;
				self.updateAddressModel.permanentCity = responseList[0].permanentCity;
				if (responseList[0].permanentPostalCode != "")
					self.updateAddressModel.permanentPostalCode = responseList[0].permanentPostalCode;

				if (responseList[0].permanentAddressSince != "")
					self.updateAddressModel.permanentAddressSince = self
							.parseDate(responseList[0].permanentAddressSince);
				else
					self.updateAddressModel.permanentAddressSince = responseList[0].permanentAddressSince;
				self.updateAddressModel.StateCode == responseList[0].stateArray;
				self.addressIntialized = true;
				if (self.updateAddressModel.preferredAddress === 'Work') {
					self.updateAddressModel.prefferedAdd[0] = true;
				} else if (self.updateAddressModel.preferredAddress === 'Mailing') {
					self.updateAddressModel.prefferedAdd[1] = true;
				} else if (self.updateAddressModel.preferredAddress === 'Home') {
					self.updateAddressModel.prefferedAdd[2] = true;
				}
			}

		}
	};

	self.parseDate = function(input) {

		input = input + "";
		var parts = input.split('/');

		return new Date(parts[2], parts[0] - 1, parts[1]);
	};

	self.updateAddressModel = {
		preferredAddress : "",
		firstName : "",
		lastName : "",
		workAddressLineOne : "",
		workAddressLineTwo : "",
		workAddressLineThree : "",
		workCountry : "",
		workState : "",
		workCity : "",
		workPostalCode : "",
		responseText : [],
		workAddressSince : "",
		prefferedAdd : [],
		communicationAddressLineOne : "",
		communicationAddressLineTwo : "",
		communicationAddressLineThree : "",
		communicationCountry : "",
		communicationState : "",
		communicationCity : "",
		communicationPostalCode : "",
		communicationAddressSince : "",
		permanentAddressLineOne : "",
		permanentAddressLineTwo : "",
		permanentAddressLineThree : "",
		permanentCountry : "",
		permanentState : "",
		permanentCity : "",
		permanentPostalCode : "",
		permanentAddressSince : "",

		resetupdateAddressModel : function() {
			self.updateAddressModel.firstName = "";
			self.updateAddressModel.lastName = "";
			self.updateAddressModel.workAddressLineOne = "";
			self.updateAddressModel.workAddressLineTwo = "";
			self.updateAddressModel.workAddressLineThree = "";
			self.updateAddressModel.workPostalCode = "";
			self.updateAddressModel.workCountry = "";
			self.updateAddressModel.workState = "";
			self.updateAddressModel.workCity = "";
			self.updateAddressModel.workAddressSince = "";
			self.updateAddressModel.cocdCountryCodes = [];
			self.updateAddressModel.preferredAddress = "";
			self.updateAddressModel.communicationAddressLineOne = "";
			self.updateAddressModel.communicationAddressLineTwo = "";
			self.updateAddressModel.communicationAddressLineThree = "";
			self.updateAddressModel.communicationCountry = "";
			self.updateAddressModel.communicationState = "";
			self.updateAddressModel.communicationCity = "";
			self.updateAddressModel.communicationPostalCode = "";
			self.updateAddressModel.communicationAddressSince = "";
			self.updateAddressModel.permanentAddressLineOne = "";
			self.updateAddressModel.permanentAddressLineTwo = "";
			self.updateAddressModel.permanentAddressLineThree = "";
			self.updateAddressModel.permanentCountry = "";
			self.updateAddressModel.permanentState = "";
			self.updateAddressModel.permanentCity = "";
			self.updateAddressModel.permanentPostalCode = "";
			self.updateAddressModel.permanentAddressSince = "";
			self.updateAddressModel.StateCode = [];

		}
	};

	self.initUpdateAddressDetailsConfirm = function(responseList) {
		if (!responseList[0].hasOwnProperty('errorMessage')) {
			self.updateAddressModel.confirmResponse = responseList[0];
			self.updateAddressModel.auth = responseList[0].auth;
			self.updateAddressModel.transactionPwD = "";
		}
		self.updateAddressModel.transactionPwD = "";
	};

	self.initUpdateContactDetailsConfirm = function(responseList) {
		if (!responseList[0].hasOwnProperty('errorMessage')) {
			self.updateContactModel.confirmResponse = responseList[0];
			self.updateContactModel.auth = responseList[0].auth;
			self.updateContactModel.transactionPwD = "";
		}
		self.updateContactModel.transactionPwD = "";
	};
	self.initUpdateContactSuccesspage = function(responseList) {
		self.updateContactModel.responseText = responseList[0].successMessage;
	};

	self.manageDevice = {
		deviceList : [],
		isHomePage : true,

		/**
		 * List of Devices that was Added in the device was shown. Currently
		 * Logged in device will shown in top in the list.
		 * 
		 * @constructor
		 */
		initManageDeviceDetails : function(responseList) {
			if (self.manageDevice.isHomePage) {
				self.manageDevice.deviceList = responseList[0].deviceDetails;
				self.manageDevice.isHomePage = true;

			}
		},
		/**
		 * User can change the Name of the device which is already activated.
		 * 
		 * @constructor
		 */
		editDeviceDetails : function(deviceDetails) {
			if(deviceDetails === undefined){
				UIControlsService
				.showDialogBox(undefined,rootScope.appLiterals.APP.MYPROFILE.MANAGE_AC_DEVICES.NO_DEVICE_SELECTED,rootScope.appLiterals.APP.COMMON.BUTTON.DONE,undefined);
				return;
			}
			deviceDetails = JSON.parse(deviceDetails);
			if (self.manageDevice.isHomePage){
				self.oldDeviceName = deviceDetails.deviceName;
				rootScope.appActivation.deviceName = deviceDetails.deviceName;
				self.manageDevice.selDeviceDetails = deviceDetails;
			}
			self.manageDevice.isHomePage = true;
		},
		/**
		 * User will be de-activated and will be navigated to Device List Page
		 * 
		 * @constructor
		 */
		deactivateDevice : function(deviceDetails) {
			if(deviceDetails === undefined){
				UIControlsService
				.showDialogBox(undefined,rootScope.appLiterals.APP.MYPROFILE.MANAGE_AC_DEVICES.NO_DEVICE_SELECTED,rootScope.appLiterals.APP.COMMON.BUTTON.DONE,undefined);
				return;
			}
			deviceDetails = JSON.parse(deviceDetails);
			if (self.manageDevice.isHomePage) {
				self.oldDeviceName = deviceDetails.deviceName;
				self.manageDevice.selDeviceDetails = deviceDetails;	
			}
			if (deviceDetails.isLoggedIn === true) {
				self.isCurrentUser = true;
				UIControlsService
						.showDialogBox(
								rootScope.appLiterals.APP.MYPROFILE.MANAGE_AC_DEVICES.DE_ACT_TITLE,
								rootScope.appLiterals.APP.MYPROFILE.MANAGE_AC_DEVICES.DE_ACT_MSG1
										+ self.oldDeviceName + '\n '
										+ rootScope.appLiterals.APP.MYPROFILE.MANAGE_AC_DEVICES.DE_ACT_MSG2,
										rootScope.appLiterals.APP.COMMON.BUTTON.NO,rootScope.appLiterals.APP.COMMON.BUTTON.YES, function() {
									ActionProcessor.setEvent('onNoDeActClick');
								}, function() {
									self.manageDevice.userDeactive();
								});
			} else {
				if (!rootScope.isUserLoggedIn) {
					ActionProcessor.setEvent('onMaxDeActClick');
				} else {
					ActionProcessor.setEvent('onDeActClick');
				}
			}
			self.manageDevice.isHomePage = true;
		},
		/**
		 * If the currently Logged User is Deactivating the device ,User will be
		 * Logged out.
		 * 
		 * @constructor
		 */
		userDeactive : function() {
			if (self.isCurrentUser) {
				scope.setEvent('onCurrentDeviceDeActivate');
			}
			self.isCurrentUser = true;
		}
	};
	self.primaryAcc = '';
	self.checkPrimary = true;
	self.updatePrimaryAccount = {

		primaryAccountDetails : [],
		submitprimaryAccountDetails : [],
		isDisabled : false,
		isPrimary : true,
		mode : '',

		/**
		 * Used to get the List of Account which user can set as a primary
		 * Account By default it will show the selected Account. If there is no
		 * valid account,It will throw a error and user will be navigated to My
		 * profile page.
		 * 
		 * @constructor
		 */
		initPrimaryAccountDetails : function(responseList) {
			if (!self.isBack && responseList !== undefined) {
				self.updatePrimaryAccount.primaryAccountDetails = responseList[0].accountNumberList;
				var res = _.where(
						self.updatePrimaryAccount.primaryAccountDetails, {
							isPrimary : 'Y'
						});

				if (self.updatePrimaryAccount.primaryAccountDetails.length === 0) {
					rootScope
							.showErrorPopup(
									rootScope.appLiterals.APP.ERROR_MESSAGE.NO_ACTIVE_ACC,
									rootScope.appLiterals.APP.BUTTON_TEXT.OK);
					scope.setEvent('noPrimaryAccount');
				} else {
					if (res.length > 0) {
						self.checkPrimary = true;
						self.primaryAcc = res[0].index * 1;
					}
				}
			}
			self.isClose = false;
			self.isBack = false;
			if (self.primaryAcc === 'NONE') {
				self.updatePrimaryAccount.primaryAuthBack();
			}

		},
		/**
		 * This function is used to submit the selected primary Account. User
		 * was notified with a Success Message with "OK" button. On Click of
		 * 'OK' button , User will be navigated to Update Primary Page.
		 * 
		 * @constructor
		 */
		submitPrimaryAccountDetails : function(responseList) {
			self.updatePrimaryAccount.responseText = responseList[0].successMessage;

		},
		/**
		 * According to "mode" value Transaction Fields will be displayed. When
		 * User Click on "Back" Button, He will be navigated to previous page
		 * where the selected values will be retained.
		 * 
		 * @constructor
		 */
		authResponse : function(responseList) {

			if (!responseList[0].hasOwnProperty('errorMessage')) {
				self.updatePrimaryAccount.mode = '';
				if (!self.isBack) {
					self.updatePrimaryAccount.primaryAuthModel = responseList[0];
				}
				self.isBack = false;
			}
		},
		/**
		 * A handler function to toggle between the checkbox in Set primary
		 * Account Page
		 * 
		 * @constructor
		 */
		checkBoxhandler : function(event) {
			ele = event.currentTarget;
			self.checkPrimary = ele.checked;
			if (self.checkPrimary) {
				$('.radio-check input[type=checkbox]').not($(ele)).attr(
						'checked', false);
			}

		},
		/**
		 * When User is navigated back by clicking "back" button the checked
		 * value in the primary Account page is retained.
		 * 
		 * @constructor
		 */
		primaryAuthBack : function() {
			var res = _.where(self.updatePrimaryAccount.primaryAccountDetails,
					{
						isPrimary : 'Y'
					});
			self.primaryAcc = res[0].index * 1;
		},

		/**
		 * When the User a Account it will be assigned a value isPrimary = "N"
		 * and if he deselect a Account "isPrimary" = "Y"
		 * 
		 * @constructor
		 */
		accountNumberHandler : function() {
			if (self.primaryAcc === -1) {
				self.primaryAcc = "NONE";
			}
			for (var i = 0; i < self.updatePrimaryAccount.primaryAccountDetails.length; i++) {
				self.updatePrimaryAccount.primaryAccountDetails[i].isPrimary = 'N';
				/* 766261 changed === to == */
				if (self.updatePrimaryAccount.primaryAccountDetails[i].index == self.primaryAcc)
					self.updatePrimaryAccount.primaryAccountDetails[i].isPrimary = 'Y';
			}
		}
	};
	/**
	 * Use to get the MPIN history from the JSON STORE
	 * 
	 * @constructor
	 */
	// moved to appActivation.js - 770314
	/*
	 * self.getMPINsHistory=function(){
	 * jsonStore.getAllMPINHistory(function(err,result){ if(err){
	 * Logger.info(err); return; } if(result.length>0) self.userMPINHistory =
	 * result[0].json; }); };
	 */

	// DND Settings
	self.dndSettings = {
		timeDropdown : [],
		userAlertRegFlg : "",
		dndEnabled : "",
		dndFromTime : "",
		dndToTime : "",
		isInputModified : "",
		responseText : [],
		toggleClick : function() {
			if (self.dndSettings.dndEnabled == "Y") {
				self.dndSettings.dndEnabled = "Y";
			} else {
				self.dndSettings.dndEnabled = "N";
			}
		},
		inputModified : function(responseList) {
			if (self.dndSettings.dndEnabled == responseList[0].DND_Enabled
					&& self.dndSettings.dndFromTime == responseList[0].fromTime
					&& self.dndSettings.dndToTime == responseList[0].toTime) {
				self.dndSettings.isInputModified = false;

			} else {
				self.dndSettings.isInputModified = true;
			}

		}

	};

	self.initDNDSettings = function(responseList) {
		if (!responseList[0].hasOwnProperty('errorMessage')
				&& !self.dndSettings.isBack) {
			self.dndSettings.userAlertRegFlg = responseList[0].userAlertRegFlag;
			if (self.dndSettings.userAlertRegFlg == "N") {
				rootScope
						.showErrorPopup(
								rootScope.appLiterals.APP.ERROR_MESSAGE.ALERT_SUBSCRIPTION,
								rootScope.appLiterals.APP.BUTTON_TEXT.OK);
				scope.setEvent('notRegisteredForAlerts');
			} else {
				self.dndSettings.dndEnabled = responseList[0].DND_Enabled;
				self.dndSettings.dndFromTime = responseList[0].fromTime;
				self.dndSettings.dndToTime = responseList[0].toTime;
				self.dndSettings.timeDropdown = responseList[0].cocdDNDSettingsTimeDropdown;
				self.dndSettings.isInputModified = false;
			}
		}

	};

	self.submitDNDSettings = function(responseList) {
		self.dndSettings.responseText = responseList[0].successMessage;

	};

	// //////////// manage alert //////
	self.manageAlert = {
		alertList : [],
		isAuth : false,
		isBack : false,
		selectedCategoryIndex : '',
		selectedSubCategoryIndex : '',

		alertCategory : '',
		alertCategoryDescription : '',
		alertDeliveryChannels : '',
		alertId : '',
		alertDescription : '',
		alertStatus : '',
		existingAlertStatus : '',
		accountAlert : '',
		showAccountAlert : false,
		// validateAccountAlert:false,
		accountNumber : '',
		dispAccountNumber : '',
		preDispAccountNumber : '',
		preAccountNumber : '',
		amountAlert : '',
		showAmountAlert : false,
		// validateAmountAlert:false,
		currencyValue : '',
		amount : '',
		displayAmtConfirm : false,
		preAmount : '',
		amountValue : '',
		alertParamName : '',
		showNumberOfDays : false,
		// validateNumberOfDays:false,
		days : '', // FS 766875
		numberOfDays : '',
		preNumberOfDays : '',
		frequencyAlert : '',
		validateFrequencyAlert : false,
		alertFrequency : '',
		email : false,
		textMessage : false,
		inbox : false,
		fax : false,
		voice : false,
		selectedAlertDeliveryChannels : [],
		selectedAlertStatus : '',
		preSelectedAlertStatus : '',
		frequenceAlert : '',
		preFrequencyAlert : '',

		yearFirstDate : [],
		accountNumberArr : [],

		dailySelected : false,
		weeklyData : [],
		weeklyFirstDate : '',
		weeklySecondDate : '',
		weeklySelected : false,
		weekRefNo1 : '',
		weekRefNo2 : '',
		monthlyData : [],
		monthlyFirstDate : '',
		monthlySecondDate : '',
		monthlySelected : false,
		monthRefNo1 : '',
		monthRefNo2 : '',
		yearlyData : [],
		yearDate1 : '',
		yearMonth1 : '',
		yearDate2 : '',
		yearMonth2 : '',
		yearDate3 : '',
		yearMonth3 : '',
		yearDate4 : '',
		yearMonth4 : '',
		yearDate5 : '',
		yearMonth5 : '',
		yearDate6 : '',
		yearMonth6 : '',
		yearRefNo1 : '',
		yearRefNo2 : '',
		yearRefNo3 : '',
		yearRefNo4 : '',
		yearRefNo5 : '',
		yearRefNo6 : '',
		preYearDate1 : '',
		preYearMonth1 : '',
		preYearDate2 : '',
		preYearMonth2 : '',
		preYearDate3 : '',
		preYearMonth3 : '',
		preYearDate4 : '',
		preYearMonth4 : '',
		preYearDate5 : '',
		preYearMonth5 : '',
		preYearDate6 : '',
		preYearMonth6 : '',
		invalidYearlyData : false,
		yearlySelected : false,
		pageUpdateStatus : false,
		isValidAlertData : false,
		subscribedUpdateStatus : false,
		preSelectedAccountNumber : '',

		initFetchAlert : function(responseList) {
			if (!self.manageAlert.isBack) {
				self.manageAlert.alertList = responseList[0].alertList;
				if (responseList[0].auth === ""
						|| typeof (responseList[0].auth) === "undefined") {
					self.manageAlert.isAuth = false;
				} else {
					self.manageAlert.isAuth = true;
				}
			}
		},
		selectedIndex : function(categoryIndex, subcategoryIndex) {

			// alert(categoryIndex);
			self.manageAlert.accountNumberArr = [];

			var subCat = self.manageAlert.alertList[categoryIndex];

			for (index = 0; index < subCat.subAlerts.length; index++) {
				var myJSONObj = {
					"accountNumber" : /* subCat.subAlerts[index].nickName+ */subCat.subAlerts[index].maskedAccountNumber,
					"value" : subCat.subAlerts[index].accountNumber
				};
				self.manageAlert.accountNumberArr.push(myJSONObj);
			}

			self.manageAlert.selectedCategoryIndex = categoryIndex;
			self.manageAlert.selectedSubcategoryIndex = subcategoryIndex;

			self.manageAlert.alertCategory = self.manageAlert.alertList[self.manageAlert.selectedCategoryIndex].alertCategory;
			self.manageAlert.alertCategoryDescription = self.manageAlert.alertList[self.manageAlert.selectedCategoryIndex].subAlerts[self.manageAlert.selectedSubcategoryIndex].alertDescription;
			self.manageAlert.alertId = self.manageAlert.alertList[self.manageAlert.selectedCategoryIndex].subAlerts[self.manageAlert.selectedSubcategoryIndex].alertId;
			self.manageAlert.alertDescription = self.manageAlert.alertList[self.manageAlert.selectedCategoryIndex].subAlerts[self.manageAlert.selectedSubcategoryIndex].alertDescription;
			self.manageAlert.accountAlert = self.manageAlert.alertList[self.manageAlert.selectedCategoryIndex].subAlerts[self.manageAlert.selectedSubcategoryIndex].accountAlert;

			if (self.manageAlert.accountAlert === "Y") {
				self.manageAlert.showAccountAlert = true;
				// self.manageAlert.validateAccountAlert = true;
				// self.manageAlert.accountNumber =
				// parseInt(self.manageAlert.alertList[self.manageAlert.selectedCategoryIndex].subAlerts[self.manageAlert.selectedSubcategoryIndex].accountNumber);
				self.manageAlert.accountNumber = self.manageAlert.alertList[self.manageAlert.selectedCategoryIndex].subAlerts[self.manageAlert.selectedSubcategoryIndex].accountNumber;
				self.manageAlert.dispAccountNumber = self.manageAlert.alertList[self.manageAlert.selectedCategoryIndex].subAlerts[self.manageAlert.selectedSubcategoryIndex].maskedAccountNumber;
				if (self.manageAlert.accountNumber === '') {
					self.manageAlert.accountNumber = self.manageAlert.accountNumberArr[0].value;
					self.manageAlert.dispAccountNumber = self.manageAlert.accountNumberArr[0].accountNumber;
				}
				self.manageAlert.preAccountNumber = self.manageAlert.accountNumber;
				self.manageAlert.preSelectedAccountNumber = self.manageAlert.accountNumber;
				self.manageAlert.preDispAccountNumber = self.manageAlert.dispAccountNumber;
			} else {
				self.manageAlert.showAccountAlert = false;
				// self.manageAlert.validateAccountAlert = false;
			}
			// self.manageAlert.amount.replace(/,/g,"");
			self.manageAlert.amountAlert = self.manageAlert.alertList[self.manageAlert.selectedCategoryIndex].subAlerts[self.manageAlert.selectedSubcategoryIndex].amountAlert;
			if (self.manageAlert.amountAlert === 'Y') {
				self.manageAlert.showAmountAlert = true;
				self.manageAlert.amount = parseFloat(self.manageAlert.alertList[self.manageAlert.selectedCategoryIndex].subAlerts[self.manageAlert.selectedSubcategoryIndex].amountValue
						.replace(/,/g, ""));
				self.manageAlert.preAmount = self.manageAlert.amount;
				self.manageAlert.currencyValue = self.manageAlert.alertList[self.manageAlert.selectedCategoryIndex].subAlerts[self.manageAlert.selectedSubcategoryIndex].currencyValue;
			} else {
				self.manageAlert.showAmountAlert = false;
			}

			self.manageAlert.alertParamName = self.manageAlert.alertList[self.manageAlert.selectedCategoryIndex].subAlerts[self.manageAlert.selectedSubcategoryIndex].alertParamName;

			if (self.manageAlert.alertParamName !== '') {
				self.manageAlert.showNumberOfDays = true;
				self.manageAlert.numberOfDays = self.manageAlert.alertList[self.manageAlert.selectedCategoryIndex].subAlerts[self.manageAlert.selectedSubcategoryIndex].numberOfDays;
				self.manageAlert.numberOfDays = parseInt(self.manageAlert.numberOfDays); // fix
																							// for
																							// 769260
				self.manageAlert.preNumberOfDays = self.manageAlert.numberOfDays;
			} else {
				self.manageAlert.showNumberOfDays = false;
			}

			self.manageAlert.existingAlertStatus = self.manageAlert.alertList[self.manageAlert.selectedCategoryIndex].subAlerts[self.manageAlert.selectedSubcategoryIndex].alertStatus;
			self.manageAlert.alertStatus = self.manageAlert.existingAlertStatus;

			if (self.manageAlert.alertStatus === "Unsubscribed") {
				self.manageAlert.selectedAlertStatus = "OFF";
				// self.manageAlert.submitButtonClickStatus = false; // comment
				// by sadasiba on 1st Dec
				// self.manageAlert.validateAccountAlert = false;
				// self.manageAlert.validateAmountAlert = false;
				// self.manageAlert.validateNumberOfDays = false;
				// self.manageAlert.validateFrequencyAlert = false; // comment
				// by sadasiba on 28th Nov
			} else {
				self.manageAlert.selectedAlertStatus = "ON";
				// self.manageAlert.submitButtonClickStatus = true; // comment
				// by sadasiba on 1st Dec
				// self.manageAlert.validateAccountAlert =
				// self.manageAlert.showAccountAlert;
				// self.manageAlert.validateAmountAlert =
				// self.manageAlert.showAmountAlert;
				// self.manageAlert.validateNumberOfDays =
				// self.manageAlert.showNumberOfDays;
				// self.manageAlert.validateFrequencyAlert = true; // comment by
				// sadasiba on 28th Nov
			}

			self.manageAlert.preSelectedAlertStatus = self.manageAlert.selectedAlertStatus;
			// Commented for Bug 1645
			/*
			 * if(self.manageAlert.frequencyAlert === 'Y'){
			 * self.manageAlert.validateFrequencyAlert = true;
			 */
			self.manageAlert.frequencyAlert = self.manageAlert.alertList[self.manageAlert.selectedCategoryIndex].subAlerts[self.manageAlert.selectedSubcategoryIndex].frequencyAlert;
			// Added for Bug 1645
			if (self.manageAlert.frequencyAlert.length > 0) {
				self.manageAlert.validateFrequencyAlert = true;
				self.manageAlert.preFrequencyAlert = self.manageAlert.frequencyAlert;
				// alert(self.manageAlert.frequencyAlert);

				if (self.manageAlert.frequencyAlert === 'Daily') {
					self.manageAlert.dailySelected = true;
				} else {
					self.manageAlert.dailySelected = false;
				}

				if (self.manageAlert.frequencyAlert === 'Weekly'
						|| self.manageAlert.frequencyAlert === 'Monthly'
						|| self.manageAlert.frequencyAlert === 'Yearly') {
					self.manageAlert.alertFrequency = self.manageAlert.alertList[self.manageAlert.selectedCategoryIndex].subAlerts[self.manageAlert.selectedSubcategoryIndex].alertFrequency;
				}

				if (self.manageAlert.frequencyAlert === 'Weekly') {
					// Bug 1751
					/*
					 * self.manageAlert.weeklyFirstDate =
					 * self.manageAlert.alertFrequency.weekly[0]%7;
					 * self.manageAlert.weeklySecondDate =
					 * self.manageAlert.alertFrequency.weekly[1]%7;
					 */
					weeklyData = self.manageAlert.alertFrequency;
					weeklyData = weeklyData.replace(/([a-z][^:]*)(?=\s*:)/g,
							'"$1"');
					weeklyData = JSON.parse(weeklyData);
					if (2 == weeklyData.alertFrequencyInfoString.length) {
						self.manageAlert.weeklyFirstDate = weeklyData.alertFrequencyInfoString[0].weekDay
								+ ""; // fix for 766719
						self.manageAlert.weeklySecondDate = weeklyData.alertFrequencyInfoString[1].weekDay
								+ "";// fix for 766719
						self.manageAlert.weekRefNo1 = weeklyData.alertFrequencyInfoString[0].freqSeqNumber;
						self.manageAlert.weekRefNo2 = weeklyData.alertFrequencyInfoString[1].freqSeqNumber;
					} else {
						self.manageAlert.weeklyFirstDate = weeklyData.alertFrequencyInfoString[0].weekDay;
						self.manageAlert.weekRefNo1 = weeklyData.alertFrequencyInfoString[0].freqSeqNumber;
					}
					self.manageAlert.weeklySelected = true;
				} else {
					self.manageAlert.weeklySelected = false;
				}

				if (self.manageAlert.frequencyAlert === 'Monthly') {
					// Bug 1751
					/*
					 * self.manageAlert.monthlyFirstDate =
					 * self.manageAlert.alertFrequency.monthly[0];
					 * self.manageAlert.monthlySecondDate =
					 * self.manageAlert.alertFrequency.monthly[1];
					 */
					monthlyData = self.manageAlert.alertFrequency;
					monthlyData = monthlyData.replace(/([a-z][^:]*)(?=\s*:)/g,
							'"$1"');
					monthlyData = JSON.parse(monthlyData);
					if (2 == monthlyData.alertFrequencyInfoString.length) {
						self.manageAlert.monthlyFirstDate = monthlyData.alertFrequencyInfoString[0].date
								+ "";// fix for 766719
						self.manageAlert.monthlySecondDate = monthlyData.alertFrequencyInfoString[1].date
								+ "";// fix for 766719
						self.manageAlert.monthRefNo1 = monthlyData.alertFrequencyInfoString[0].freqSeqNumber;
						self.manageAlert.monthRefNo2 = monthlyData.alertFrequencyInfoString[1].freqSeqNumber;
					} else {
						self.manageAlert.monthlyFirstDate = monthlyData.alertFrequencyInfoString[0].date;
						self.manageAlert.monthRefNo1 = monthlyData.alertFrequencyInfoString[0].freqSeqNumber;
					}
					self.manageAlert.monthlySelected = true;
				} else {
					self.manageAlert.monthlySelected = false;
				}

				if (self.manageAlert.frequencyAlert === 'Yearly') {
					// Bug 1751
					/*
					 * var yearlyData = self.manageAlert.alertFrequency.yearly;
					 * var keys = Object.keys(yearlyData); var variableIndex =
					 * 1; for(index = 0 ; index< keys.length ; index++){ var
					 * monthDetails = yearlyData[keys[index]]; for(innerIndex =
					 * 0 ; innerIndex< monthDetails.length ; innerIndex++){ //
					 * self.manageAlert.yearFirstDate[innerIndex+1] =
					 * monthDetails[innerIndex];
					 * 
					 * eval("self.manageAlert.preYearDate"+variableIndex+ "=" +
					 * monthDetails[innerIndex]);
					 * eval("self.manageAlert.yearDate"+variableIndex+ "=" +
					 * monthDetails[innerIndex]);
					 * eval("self.manageAlert.preYearMonth"+variableIndex+ "=" +
					 * keys[index]);
					 * eval("self.manageAlert.yearMonth"+variableIndex+ "=" +
					 * keys[index]); self.manageAlert.days = variableIndex;
					 * variableIndex++; } }
					 */
					yearlyData = self.manageAlert.alertFrequency;
					yearlyData = yearlyData.replace(/([a-z][^:]*)(?=\s*:)/g,
							'"$1"');
					yearlyData = JSON.parse(yearlyData);
					for (var tempIndex = 0; tempIndex < yearlyData.alertFrequencyInfoString.length
							&& tempIndex <= 6; tempIndex++) {
						var temp = tempIndex + 1;
						eval("self.manageAlert.preYearDate"
								+ temp
								+ "="
								+ yearlyData.alertFrequencyInfoString[tempIndex].date
								+ "+\"\""); // fix for 766719
						eval("self.manageAlert.yearDate"
								+ temp
								+ "="
								+ yearlyData.alertFrequencyInfoString[tempIndex].date
								+ "+\"\"");// fix for 766719
						eval("self.manageAlert.preYearMonth"
								+ temp
								+ "="
								+ yearlyData.alertFrequencyInfoString[tempIndex].month
								+ "+\"\"");// fix for 766719
						eval("self.manageAlert.yearMonth"
								+ temp
								+ "="
								+ yearlyData.alertFrequencyInfoString[tempIndex].month
								+ "+\"\"");// fix for 766719
						eval("self.manageAlert.yearRefNo"
								+ temp
								+ "="
								+ yearlyData.alertFrequencyInfoString[tempIndex].freqSeqNumber);
						self.manageAlert.days = temp;
					}
					self.manageAlert.yearlySelected = true;
				} else {
					self.manageAlert.yearlySelected = false;
				}
			} else {
				self.manageAlert.validateFrequencyAlert = false;
			}

			self.manageAlert.alertDeliveryChannels = self.manageAlert.alertList[self.manageAlert.selectedCategoryIndex].subAlerts[self.manageAlert.selectedSubcategoryIndex].alertDeliveryChannels;

			if (self.manageAlert.alertDeliveryChannels.emailAlert === "Yes") {
				self.manageAlert.email = true;
				self.manageAlert.preEmail = true;
			} else {
				self.manageAlert.email = false;
				self.manageAlert.preEmail = false;
			}

			if (self.manageAlert.alertDeliveryChannels.smsAlert === "Yes") {
				self.manageAlert.textMessage = true;
				self.manageAlert.preTextMessage = true;
			} else {
				self.manageAlert.textMessage = false;
				self.manageAlert.preTextMessage = false;
			}

			if (self.manageAlert.alertDeliveryChannels.inboxAlert === "Yes") {
				self.manageAlert.inbox = true;
				self.manageAlert.preInbox = true;
			} else {
				self.manageAlert.inbox = false;
				self.manageAlert.preInbox = false;
			}

			if (self.manageAlert.alertDeliveryChannels.faxAlert === "Yes") {
				self.manageAlert.fax = true;
				self.manageAlert.preFax = true;
			} else {
				self.manageAlert.fax = false;
				self.manageAlert.preFax = false;
			}

			if (self.manageAlert.alertDeliveryChannels.voiceAlert === "Yes") {
				self.manageAlert.voice = true;
				self.manageAlert.preVoice = true;
			} else {
				self.manageAlert.voice = false;
				self.manageAlert.preVoice = false;
			}
		},
		setDeliveryMode : function() {
			self.manageAlert.selectedAlertDeliveryChannels = [];
			if (self.manageAlert.email) {
				self.manageAlert.selectedAlertDeliveryChannels.push("Email");
			}
			if (self.manageAlert.textMessage) {
				self.manageAlert.selectedAlertDeliveryChannels
						.push("Text Message");
			}
			if (self.manageAlert.voice) {
				self.manageAlert.selectedAlertDeliveryChannels.push("Voice");
			}
			if (self.manageAlert.fax) {
				self.manageAlert.selectedAlertDeliveryChannels.push("Fax");
			}
			if (self.manageAlert.inbox) {
				self.manageAlert.selectedAlertDeliveryChannels.push("Inbox");
			}

			// alert(self.manageAlert.selectedAlertDeliveryChannels.length);
		},
		toggleClick : function() {
			self.manageAlert.checkAlertStatus();
		},
		checkAlertStatus : function() {
			self.manageAlert.subscribedUpdateStatus = true;

			if (self.manageAlert.alertStatus === "Unsubscribed") {
				self.manageAlert.alertStatus = "Unsubscribed";
			} else {
				self.manageAlert.alertStatus = "Subscribed";
			}
			self.manageAlert.checkSelectedAlertStatusForDisplay();
		},
		validateManageAlertDetails : function() {

			if (self.manageAlert.frequencyAlert === 'Weekly'
					&& self.manageAlert.weeklyFirstDate !== ''
					&& parseInt(self.manageAlert.weeklyFirstDate) === parseInt(self.manageAlert.weeklySecondDate)) {
				rootScope
						.showAlertReturnSamePage(rootScope.appLiterals.APP.ERROR_MESSAGE.FREQ_DISTINCT_WEEKLY);
				self.manageAlert.isValidAlertData = false;
			}

			else if (self.manageAlert.frequencyAlert === 'Monthly'
					&& self.manageAlert.monthlyFirstDate !== ''
					&& parseInt(self.manageAlert.monthlyFirstDate) === parseInt(self.manageAlert.monthlySecondDate)) {
				rootScope
						.showAlertReturnSamePage(rootScope.appLiterals.APP.ERROR_MESSAGE.FREQ_DISTINCT_MONTHLY);
				self.manageAlert.isValidAlertData = false;
			}

			else if (!self.manageAlert.email && !self.manageAlert.fax
					&& !self.manageAlert.inbox && !self.manageAlert.textMessage
					&& !self.manageAlert.voice
					&& self.manageAlert.selectedAlertStatus === "ON") {
				rootScope
						.showAlertReturnSamePage(rootScope.appLiterals.APP.ERROR_MESSAGE.DELIVERY_MODE);
				self.manageAlert.isValidAlertData = false;
			}

			else if (self.manageAlert.preSelectedAlertStatus === self.manageAlert.selectedAlertStatus
					&& !self.manageAlert.pageUpdateStatus) {
				self.manageAlert.isValidAlertData = false;
				rootScope
						.showAlertReturnSamePage(rootScope.appLiterals.APP.ERROR_MESSAGE.NO_CHANGE_ERROR);
			} else if (self.manageAlert.preSelectedAlertStatus === self.manageAlert.selectedAlertStatus
					&& self.manageAlert.selectedAlertStatus === "OFF") {
				self.manageAlert.isValidAlertData = false;
				rootScope
						.showAlertReturnSamePage(rootScope.appLiterals.APP.ERROR_MESSAGE.MODIFY_ALERT);
			}
			// fix for 766719
			else if (self.manageAlert.frequencyAlert === 'Yearly') {
				for (index = 1; index <= self.manageAlert.days; index++) {
					for (innerIndex = index + 1; innerIndex < self.manageAlert.days + 1; innerIndex++) {
						if (eval("self.manageAlert.yearDate" + index + "==="
								+ "self.manageAlert.yearDate" + innerIndex)) {
							if (eval("self.manageAlert.yearMonth" + index
									+ "===" + "self.manageAlert.yearMonth"
									+ innerIndex)) {
								if (eval("self.manageAlert.yearMonth" + index
										+ "!=''")) {
									self.manageAlert.invalidYearlyData = true; // fix
																				// for
																				// 766719
									rootScope
											.showAlertReturnSamePage(rootScope.appLiterals.APP.ERROR_MESSAGE.FREQ_DISTINCT_YEARLY);
									self.manageAlert.isValidAlertData = false;
								}
							}
						}
					}

					if (self.manageAlert.checkValidDate(
							eval("self.manageAlert.yearDate" + index),
							eval("self.manageAlert.yearMonth" + index))) {
						self.manageAlert.invalidYearlyData = true;
						rootScope
								.showAlertReturnSamePage(rootScope.appLiterals.APP.ERROR_MESSAGE.INVALID_DATE);
						self.manageAlert.isValidAlertData = false;
					}
				}
			} else {
				self.manageAlert.isValidAlertData = true;
			}

		},
		checkSelectedAlertStatusForDisplay : function() {
			if (self.manageAlert.alertStatus === "Unsubscribed") {
				self.manageAlert.selectedAlertStatus = "OFF";
				// self.manageAlert.validateAccountAlert = false;
				// self.manageAlert.validateAmountAlert = false;
				// self.manageAlert.validateNumberOfDays = false;
				// self.manageAlert.validateFrequencyAlert = false; // comment
				// by sadasiba on 28th Nov
				$('.col-sm-10 input, select').attr('disabled', 'disabled');
			} else {
				self.manageAlert.selectedAlertStatus = "ON";
				// self.manageAlert.validateAccountAlert =
				// self.manageAlert.showAccountAlert;
				// self.manageAlert.validateAmountAlert =
				// self.manageAlert.showAmountAlert;
				// self.manageAlert.validateNumberOfDays =
				// self.manageAlert.showNumberOfDays;
				// self.manageAlert.validateFrequencyAlert = true; // comment by
				// sadasiba on 28th Nov
				$('.col-sm-10 input, select').removeAttr('disabled');
			}
		},
		selectFrequence : function() {
			alert(self.manageAlert.frequenceAlert);
		},
		onChangeAccount : function() {
			self.manageAlert.checkForPageUpdateStatus();
			if (self.manageAlert.pageUpdateStatus
					|| self.manageAlert.subscribedUpdateStatus) {
				rootScope
						.showConfirmBox(
								rootScope.appLiterals.APP.ERROR_MESSAGE.ALERT_PREF_SUBMIT,
								rootScope.appLiterals.APP.COMMON.BUTTON.OK,
								rootScope.appLiterals.APP.COMMON.BUTTON.CANCEL,
								function() {
									rootScope.confirmResult = true;
									self.manageAlert
											.callBackFunctionForConfirnBox();
								}, function() {
									rootScope.confirmResult = false;
									self.manageAlert
											.callBackFunctionForConfirnBox();
								});
				// rootScope.$apply();
				// var result = confirm("Alert preferences will not be saved
				// unless you submit. Do you wish to Continue?");
			} else {
				self.manageAlert.refreshManageAlertDate();
			}
		},
		refreshManageAlertDate : function() {
			var alertData = self.manageAlert.alertList[self.manageAlert.selectedCategoryIndex];
			var index = self.manageAlert.functiontofindIndexByKeyValue(
					alertData.subAlerts, "accountNumber",
					self.manageAlert.accountNumber);
			self.manageAlert.dispAccountNumber = self.manageAlert.accountNumberArr[index]["accountNumber"];
			self.manageAlert.preSelectedAccountNumber = self.manageAlert.accountNumber;
			self.manageAlert.selectedIndex(
					self.manageAlert.selectedCategoryIndex, index);
		},
		functiontofindIndexByKeyValue : function(arraytosearch, key,
				valuetosearch) {
			for (var i = 0; i < arraytosearch.length; i++) {
				if (arraytosearch[i][key] == valuetosearch) {
					return i;
				}
			}
			return null;
		},
		callBackFunctionForConfirnBox : function() {
			if (rootScope.confirmResult) {
				self.manageAlert.refreshManageAlertDate();
			} else {
				// self.manageAlert.accountNumber =
				// self.manageAlert.preSelectedAccountNumber.toString();
				self.manageAlert.accountNumber = self.manageAlert.preSelectedAccountNumber;
				self.manageAlert.dispAccountNumber = self.manageAlert.preDispAccountNumber;
			}
		},
		selectEventName : function() {
			if (self.manageAlert.preSelectedAlertStatus === 'OFF'
					&& self.manageAlert.selectedAlertStatus === 'ON')
				return "onManageAlertDetailsSubscribedClick";
			else if (self.manageAlert.preSelectedAlertStatus === 'ON'
					&& self.manageAlert.selectedAlertStatus === 'OFF')
				return "onManageAlertDetailsUnsubscribedClick";
			else
				return "onManageAlertDetailsSubmitClick";
		},
		selectEventNameAlertDetailsPage : function() {
			if (self.manageAlert.frequencyAlert === 'Yearly'
					&& self.manageAlert.invalidYearlyData == false) // fix for
																	// 766719
			{
				self.manageAlert.isValidAlertData = true;
			}
			if (self.manageAlert.isValidAlertData
					&& self.manageAlert.preSelectedAlertStatus === 'OFF')
				return "onManageAlertDetailsSubscribeOFFSubmitClick";
			else if (self.manageAlert.isValidAlertData
					&& self.manageAlert.preSelectedAlertStatus === 'ON')
				return "onManageAlertDetailsSubmitClick";
			else
				return "onManageAlertDetailsClick";
		},
		clearAlertFrequency : function() {
			// self.manageAlert.isBack=false;
			self.manageAlert.weeklyFirstDate = '';
			self.manageAlert.weeklySecondDate = '';
			self.manageAlert.monthlyFirstDate = '';
			self.manageAlert.monthlySecondDate = '';
			self.manageAlert.yearDate1 = '';
			self.manageAlert.yearMonth1 = '';
			self.manageAlert.yearDate2 = '';
			self.manageAlert.yearMonth2 = '';
			self.manageAlert.yearDate3 = '';
			self.manageAlert.yearMonth3 = '';
			self.manageAlert.yearDate4 = '';
			self.manageAlert.yearMonth4 = '';
			self.manageAlert.yearDate5 = '';
			self.manageAlert.yearMonth5 = '';
			self.manageAlert.yearDate6 = '';
			self.manageAlert.yearMonth6 = '';
			self.manageAlert.subscribedUpdateStatus = false;
			self.manageAlert.isValidAlertData = false;
			self.manageAlert.pageUpdateStatus = false;
			self.manageAlert.weekRefNo1 = '';
			self.manageAlert.weekRefNo2 = '';
			self.manageAlert.monthRefNo1 = '';
			self.manageAlert.monthRefNo2 = '';
			self.manageAlert.yearRefNo1 = '';
			self.manageAlert.yearRefNo2 = '';
			self.manageAlert.yearRefNo3 = '';
			self.manageAlert.yearRefNo4 = '';
			self.manageAlert.yearRefNo5 = '';
			self.manageAlert.yearRefNo6 = '';
		},
		alertDeliveryChannelsParameter : function(param) {
			if (param)
				return "Y";
			else
				return "N";
		},
		checkForPageUpdateStatus : function() {
			if (self.manageAlert.frequencyAlert === 'Daily') {
				self.manageAlert.dailySelected = true;
				self.manageAlert.weeklyFirstDate = '';
				self.manageAlert.weeklySecondDate = '';
				self.manageAlert.monthlyFirstDate = '';
				self.manageAlert.monthlySecondDate = '';
				self.manageAlert.yearDate1 = '';
				self.manageAlert.yearMonth1 = '';
				self.manageAlert.yearDate2 = '';
				self.manageAlert.yearMonth2 = '';
				self.manageAlert.yearDate3 = '';
				self.manageAlert.yearMonth3 = '';
				self.manageAlert.yearDate4 = '';
				self.manageAlert.yearMonth4 = '';
				self.manageAlert.yearDate5 = '';
				self.manageAlert.yearMonth5 = '';
				self.manageAlert.yearDate6 = '';
				self.manageAlert.yearMonth6 = '';
				self.manageAlert.weekRefNo1 = '';
				self.manageAlert.weekRefNo2 = '';
				self.manageAlert.monthRefNo1 = '';
				self.manageAlert.monthRefNo2 = '';
				self.manageAlert.yearRefNo1 = '';
				self.manageAlert.yearRefNo2 = '';
				self.manageAlert.yearRefNo3 = '';
				self.manageAlert.yearRefNo4 = '';
				self.manageAlert.yearRefNo5 = '';
				self.manageAlert.yearRefNo6 = '';
			} else {
				self.manageAlert.dailySelected = false;
			}
			if (self.manageAlert.frequencyAlert === 'Weekly') {
				self.manageAlert.weeklySelected = true;
				self.manageAlert.monthlyFirstDate = '';
				self.manageAlert.monthlySecondDate = '';
				self.manageAlert.yearDate1 = '';
				self.manageAlert.yearMonth1 = '';
				self.manageAlert.yearDate2 = '';
				self.manageAlert.yearMonth2 = '';
				self.manageAlert.yearDate3 = '';
				self.manageAlert.yearMonth3 = '';
				self.manageAlert.yearDate4 = '';
				self.manageAlert.yearMonth4 = '';
				self.manageAlert.yearDate5 = '';
				self.manageAlert.yearMonth5 = '';
				self.manageAlert.yearDate6 = '';
				self.manageAlert.yearMonth6 = '';
				self.manageAlert.monthRefNo1 = '';
				self.manageAlert.monthRefNo2 = '';
				self.manageAlert.yearRefNo1 = '';
				self.manageAlert.yearRefNo2 = '';
				self.manageAlert.yearRefNo3 = '';
				self.manageAlert.yearRefNo4 = '';
				self.manageAlert.yearRefNo5 = '';
				self.manageAlert.yearRefNo6 = '';
			} else {
				self.manageAlert.weeklySelected = false;
			}
			if (self.manageAlert.frequencyAlert === 'Monthly') {
				self.manageAlert.monthlySelected = true;
				self.manageAlert.weeklyFirstDate = '';
				self.manageAlert.weeklySecondDate = '';
				self.manageAlert.yearDate1 = '';
				self.manageAlert.yearMonth1 = '';
				self.manageAlert.yearDate2 = '';
				self.manageAlert.yearMonth2 = '';
				self.manageAlert.yearDate3 = '';
				self.manageAlert.yearMonth3 = '';
				self.manageAlert.yearDate4 = '';
				self.manageAlert.yearMonth4 = '';
				self.manageAlert.yearDate5 = '';
				self.manageAlert.yearMonth5 = '';
				self.manageAlert.yearDate6 = '';
				self.manageAlert.yearMonth6 = '';
				self.manageAlert.weekRefNo1 = '';
				self.manageAlert.weekRefNo2 = '';
				self.manageAlert.yearRefNo1 = '';
				self.manageAlert.yearRefNo2 = '';
				self.manageAlert.yearRefNo3 = '';
				self.manageAlert.yearRefNo4 = '';
				self.manageAlert.yearRefNo5 = '';
				self.manageAlert.yearRefNo6 = '';
			} else {
				self.manageAlert.monthlySelected = false;
			}
			if (self.manageAlert.frequencyAlert === 'Yearly') {
				self.manageAlert.yearlySelected = true;
				self.manageAlert.weeklyFirstDate = '';
				self.manageAlert.weeklySecondDate = '';
				self.manageAlert.monthlyFirstDate = '';
				self.manageAlert.monthlySecondDate = '';
				self.manageAlert.weekRefNo1 = '';
				self.manageAlert.weekRefNo2 = '';
				self.manageAlert.monthRefNo1 = '';
				self.manageAlert.monthRefNo2 = '';
			} else {
				self.manageAlert.yearlySelected = false;
			}

			if (self.manageAlert.preNumberOfDays !== self.manageAlert.numberOfDays
					|| self.manageAlert.amount !== self.manageAlert.preAmount
					|| self.manageAlert.preEmail !== self.manageAlert.email
					|| self.manageAlert.preTextMessage !== self.manageAlert.textMessage
					|| self.manageAlert.preInbox !== self.manageAlert.inbox
					|| self.manageAlert.preFax !== self.manageAlert.fax
					|| self.manageAlert.preVoice !== self.manageAlert.voice
					|| self.manageAlert.preFrequencyAlert !== self.manageAlert.frequencyAlert) {

				self.manageAlert.pageUpdateStatus = true;

			}

			else if (!self.manageAlert.pageUpdateStatus
					&& self.manageAlert.frequencyAlert.length > 0) {
				if (self.manageAlert.frequencyAlert === 'Weekly'
						&& (parseInt(self.manageAlert.weeklyFirstDate) !== weeklyData.alertFrequencyInfoString[0].weekDay || (weeklyData.alertFrequencyInfoString[1] && parseInt(self.manageAlert.weeklySecondDate) !== weeklyData.alertFrequencyInfoString[1].weekDay))) {
					self.manageAlert.pageUpdateStatus = true;
				} else if (self.manageAlert.frequencyAlert === 'Monthly'
						&& (parseInt(self.manageAlert.monthlyFirstDate) !== monthlyData.alertFrequencyInfoString[0].date || (monthlyData.alertFrequencyInfoString[1] && parseInt(self.manageAlert.monthlySecondDate) !== monthlyData.alertFrequencyInfoString[1].date))) {
					self.manageAlert.pageUpdateStatus = true;
				} else if (self.manageAlert.frequencyAlert === 'Yearly'
						&& (self.manageAlert.yearMonth1 !== self.manageAlert.preYearMonth1
								|| self.manageAlert.yearDate1 !== self.manageAlert.preYearDate1
								|| self.manageAlert.yearMonth2 !== self.manageAlert.preYearMonth2
								|| self.manageAlert.yearDate2 !== self.manageAlert.preYearDate2
								|| self.manageAlert.yearMonth3 !== self.manageAlert.preYearMonth3
								|| self.manageAlert.yearDate3 !== self.manageAlert.preYearDate3
								|| self.manageAlert.yearMonth4 !== self.manageAlert.preYearMonth4
								|| self.manageAlert.yearDate4 !== self.manageAlert.preYearDate4
								|| self.manageAlert.yearMonth5 !== self.manageAlert.preYearMonth5
								|| self.manageAlert.yearDate5 !== self.manageAlert.preYearDate5
								|| self.manageAlert.yearMonth6 !== self.manageAlert.preYearMonth6 || self.manageAlert.yearDate6 !== self.manageAlert.preYearDate6)) {
					self.manageAlert.pageUpdateStatus = true;
				} else {
					self.manageAlert.pageUpdateStatus = false;
				}
			} else {
				self.manageAlert.pageUpdateStatus = false;
			}

			self.manageAlert.validateManageAlertDetails();

		},
		checkValidDate : function(date, month) {
			if (date === '' && month === '') {
				return false;
			} else if (date === '' || month === '') {
				return true;
			} else {
				if (date > 28) {
					if (month === 2) {
						return true;
					} else if (date > 30) {
						if (month === 4 || month === 6 || month === 9
								|| month === 11) {
							return true;
						}
					}
				}
			}
		},
		disableAllInputField : function() {
			setTimeout(function() {
				self.manageAlert.checkSelectedAlertStatusForDisplay();
			}, 600);
		},
	};

	self.manageAlert.unFormatNumbers = function() {
		if (self.manageAlert.amount != undefined
				&& self.manageAlert.amount !== null
				&& self.manageAlert.amount.length != "") {
			Logger.info("Unformatted field:: " + self.manageAlert.amount);
			self.manageAlert.amount = parseFloat(CurrencyConfigProcessor
					.unFormatAmount(self.manageAlert.amount,
							self.manageAlert.currencyValue));
			if (self.manageAlert.amount > 0) {
				self.manageAlert.displayAmtConfirm = true;
			}
		}
	};
};
