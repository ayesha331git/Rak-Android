
/* JavaScript content from js/utils/keyStorage.js in folder common */

/* JavaScript content from js/utils/keyStorage.js in folder common */
//TODO Mahesh - KeyStorage.js
/* JavaScript content from js/utils/keyStorage.js in folder common */
App.viewModels.keyStorage = function(Logger, $scope, $http,MBaaS,$rootScope) {
	
	var self = this;
	self.prefName = 'AppDets';
	self.QuickBalUserIDCollectionName = 'QuickBalUserIDCollection';
	self.savedUsersCollectionName = 'savedUsers';
	self.collectionName = 'finCollection';
	self.mpinCollectionName = 'mpins';
	self.pushCollectionName = 'push';
	self.localeCollectionName='locale';
	self.bankIdCollectionName = 'bankId';
	self.buildTypeCollectionName = 'buildType';
	self.userIDCollectionName = 'userID';
	self.touchIDCollections ="touchID";
	self.QuickBalUserIDCollectionData = [];

	/**
	 * Object that defines all the collections.
	 * @variable
	 */
	self.collections = {

			// Object that defines the 'people' collection.
			finCollection: {

				searchFields: {
					name: 'string'
				}
			}
	};
	self.mpinCollections = {
			mpins: {
			}
	};

	//locale setting

	self.localeCollections={
			locale:{

			}
	};
	self.bankIdCollections = {
			bankId: {
			}
	};

	self.buildTypeCollections = {
			buildType: {
			}
	};

	self.userIDCollections={
			userID:{

			}
	};

	// notification collection
	self.pushCollections = {
			push : {
				searchFields : {userId: 'string', type: 'integer'}
			}
	};
	// Optional options object.
	self.options = {
			// Optional username, default 'jsonstore'.
			username: 'finacle',
			password: 'finacle123',
			// Optional local key generation flag, default false.
			localKeyGen: false
	};


	/* =============== BANK ID Functions START====================
	 * This Utility is added to Add Bank Id
	 * The Bank id is used only during development process
	 **/
	self.addBankId = function(bankId,callback) {
		keyStorage(function(addSuccess){
			console.log("==addBankId==addSuccess===="+JSON.stringify(addSuccess));
			if (callback)
				callback(null, "SUCCESS");
		}, function(addError){
			console.log("==addBankId==addError===="+JSON.stringify(addError));
			// Handle failure for any of the previous JSONStore operations
			Logger.info("failed added json data...");
		}, 'putString', [self.prefName, self.bankIdCollectionName, bankId],MBaaS);
	};

	self.getBankid = function(callback) {
		keyStorage(function(getSuccess){
			console.log("==getBankid==getSuccess===="+JSON.stringify(getSuccess));
			var bankIds = [];
			var obj = {};
			obj.bankId = getSuccess;
			bankIds.push(obj);
			callback(null, bankIds);
		}, function(getError){
			console.log("==getBankid==getError===="+JSON.stringify(getError));
			Logger.info("failed getdata json data...");
			callback('Failed to get Bank ID', null);
		}, 'getString', [self.prefName, self.bankIdCollectionName],MBaaS);	
	};

	self.removeAllBankId=function(){
		keyStorage(function(getSuccess){
			console.log("==removeAllBankId==getSuccess===="+JSON.stringify(getSuccess));
		}, function(getError){
			console.log("==removeAllBankId==getError===="+JSON.stringify(getError));
			Logger.info("failed getdata json data...");
		}, 'remove', [self.prefName, self.bankIdCollectionName],MBaaS);	
	};

	/* =============== BANK ID Functions START ==================== */
	
	/* =============== REMEMBERME Functions START ========================= */
	/**
	 * This utility add username to storage when "remember userId" checked
	 * @param {object} userId - user ID.
	 */
	self.addDoc = function(userId) {
//		if($rootScope.isStubbedVersion){
//			return;
//		}
		keyStorage(
				function(successResponse){
					console.log("==addDoc==successResponse===="+JSON.stringify(successResponse));

					var userIDs = JSON.parse(successResponse);
					var isFound = false;
					for(var i in userIDs){
						//to avoid the duplicate entry
						if(userIDs[i]== userId){
							isFound = true;
							break;
						}
					}
					if(!isFound){
						userIDs.push(userId);
						keyStorage(
								function(addSuccess){
									console.log("==addDoc==addSuccess===="+JSON.stringify(addSuccess));
									if(callback)
										callback(null, "SUCCESS");
								}, function(addError){
									console.log("==addDoc==addError===="+JSON.stringify(addError));
									// Handle failure for any of the previous JSONStore operations
									Logger.info("failed added json data...");
								}, 
								'putString', [self.prefName, self.savedUsersCollectionName, userIDs],MBaaS);
					}
				}, function(getError){
					console.log("==addDoc==getError===="+JSON.stringify(getError));
					if(getError === "No data"){
						var userIDs = [];
						userIDs.push(userId);
						keyStorage(
								function(addSuccess){
									console.log("==addDoc==addSuccess===="+JSON.stringify(addSuccess));
									if(callback)
										callback(null, "SUCCESS");
								}, function(addError){
									console.log("==addDoc==addError===="+JSON.stringify(addError));
									// Handle failure for any of the previous JSONStore operations
									Logger.info("failed added json data...");
								}, 
								'putString', [self.prefName, self.savedUsersCollectionName, userIDs],MBaaS);
					}
					else{
						Logger.info("failed getdata json data...");
						callback('Failed to get User ID', null);
					}
				}, 
				'getString', [self.prefName, self.savedUsersCollectionName],MBaaS);
	};

	/**
	 * this utility get all documents from storage
	 * @constructor
	 * @param {function} callback - callback function on success.
	 */
	self.getAllDocs = function(callback) {
//		if($rootScope.isStubbedVersion){
//			return;
//		}
		keyStorage(function(successResponse){
			console.log("==getAllDocs==successResponse===="+JSON.stringify(successResponse));
			callback(null, JSON.parse(successResponse));

		}, function(getError){
			console.log("==getAllDocs==getError===="+JSON.stringify(getError));
			Logger.info("failed getdata json data...");
			callback('Failed to get User ID', null);
		}, 'getString', [self.prefName, self.savedUsersCollectionName],MBaaS);
	};

	/**
	 * this utility remove a document from the json store for now user
	 * @param {object} userId - user ID.
	 */
	self.removeDoc= function(userId) {
//		if($rootScope.isStubbedVersion){
//			return;
//		}
		keyStorage(
				function(successResponse){
					console.log("==RemoveDoc==successResponse===="+JSON.stringify(successResponse));

					var userIDs = JSON.parse(successResponse);
					var isFound = false;
					for(var i in userIDs){
						if(userIDs[i]== userId){
							userIDs.splice(i,1);
							isFound = true;
							break;
						}
					}
					if(isFound){
						keyStorage(
								function(addSuccess){
									console.log("==RemoveDoc==addSuccess===="+JSON.stringify(addSuccess));
									if(callback)
										callback(null, "SUCCESS");
								}, function(addError){
									console.log("==RemoveDoc==addError===="+JSON.stringify(addError));
									// Handle failure for any of the previous JSONStore operations
									Logger.info("failed Remove json data...");
								}, 
								'putString', [self.prefName, self.savedUsersCollectionName, userIDs],MBaaS);
					}
				}, function(getError){
					console.log("==RemoveDoc==getError===="+JSON.stringify(getError));
					Logger.info("failed getdata json data...");
					if(callback)
						callback(null,'Data not available to Remove');
				}, 
				'getString', [self.prefName, self.savedUsersCollectionName],MBaaS);
	};

	/* =============== REMEMBERME Functions END   ========================= */

	/* =============== QUICK BALANCE Functions START ================ */

	/**
	 * This utility adds the quick balance user id to storage system
	 */
	self.addQuickBalUserID = function(userId,callback)
	{
		keyStorage(function(addSuccess){
			console.log("==addQuickBalUserID==addSuccess===="+JSON.stringify(addSuccess));
			if (callback)
				callback(null, "SUCCESS");
		}, function(addError){
			console.log("==addQuickBalUserID==addError===="+JSON.stringify(addError));
			Logger.info("failed to add data...");
		}, 'putString', [self.prefName, self.QuickBalUserIDCollectionName, userId],MBaaS);
	};

	/**
	 * This utility fetches the stored quick balance user id
	 */
	self.getQuickBalUserID = function(callback) {
		if($rootScope.isStubbedVersion){
			return;
		}
		keyStorage(function(successResponse){
			console.log("==getQuickBalUserID==successResponse===="+JSON.stringify(successResponse));
			var userIds = [];
			var obj = {};
			obj.userId = successResponse;
			userIds.push(obj);
			callback(null, bankIds);
		}, function(getError){
			console.log("==getQuickBalUserID==getError===="+JSON.stringify(getError));
			Logger.info("failed getdata json data...");
			callback('Failed to get User ID', null);
		}, 'getString', [self.prefName, self.QuickBalUserIDCollectionName],MBaaS);
	};

	self.removeAllUserId=function(callback){
		keyStorage(function(getSuccess){
			console.log("==removeAllUserId==getSuccess===="+JSON.stringify(getSuccess));
			if(callback)
				callback();
		}, function(getError){
			console.log("==removeAllUserId==getError===="+JSON.stringify(getError));
			Logger.info("failed getdata json data...");
		}, 'remove', [self.prefName, self.QuickBalUserIDCollectionName],MBaaS);
	};

	/* =============== QUICK BALANCE Functions START ================ */

	/* =============== MPIN Functions START ========================= */
	/**
	 * This utility add data for a user
	 * @param {string} userID - user ID.
	 * @param {number} maxHistoryCount - max history allowed.
	 * @param {string} mPin - mPin provided by user.
	 * @param {function} callback - callback support.
	 */
	self.validateAndStoreMPIN = function(userID,maxHistoryCount,mPin,callback){
		keyStorage(
				function(successResponse){
					console.log("==validateAndStoreMPIN==successResponse===="+JSON.stringify(successResponse));

					var mPINS = JSON.parse(successResponse);

					if(typeof mPINS[userID] != 'undefined'){
						var userData = mPINS[userID];
						mPin+='';

						//console.log("Data : "+ userData.mPINs[mPin] + " -- " + mPin) ;
						if(userData.mPINs.indexOf(mPin) != -1){
							//Error condition, mpin already exists
							//console.log("MPIN already exists, please choose another MPIN.");
							return;
						}
						if(userData.mPINs.length >= maxHistoryCount){
							mPINS[userID].mPINs.shift();
						}
						mPINS[userID].mPINs.push(mPin.toString());
					}
					else{
						console.log("New user found");
						// USER ID not found, insert new collection
						var newUser = {};
						userID+='';
						newUser.maxHistoryCount = maxHistoryCount;
						newUser.mPINs = [];
						newUser.mPINs.push(mPin+'');
						mPINS[userID] = newUser;
					}
					keyStorage(
							function(addSuccess){
								console.log("==validateAndStoreMPIN==addSuccess===="+JSON.stringify(addSuccess));
								if(callback)
									callback(null, "SUCCESS");
							}, function(addError){
								console.log("==validateAndStoreMPIN==addError===="+JSON.stringify(addError));
								// Handle failure for any of the previous JSONStore operations
								Logger.info("failed added json data...");
							}, 
							'putString', [self.prefName, self.mpinCollectionName, mPINS],MBaaS);

				}, function(getError){
					console.log("==validateAndStoreMPIN==getError===="+JSON.stringify(getError));
					if(getError === "No data"){
						console.log("First user");
						var mPINS = {};

						var newUser = {};
						userID+='';
						newUser.maxHistoryCount = maxHistoryCount;
						newUser.mPINs = [];
						newUser.mPINs.push(mPin+'');

						mPINS[userID] = newUser;

						keyStorage(
								function(addSuccess){
									console.log("==validateAndStoreMPIN==addSuccess===="+JSON.stringify(addSuccess));
									if(callback)
										callback(null, "SUCCESS");
								}, function(addError){
									console.log("==validateAndStoreMPIN==addError===="+JSON.stringify(addError));
									Logger.info("failed to add data...");
								}, 
								'putString', [self.prefName, self.mpinCollectionName, mPINS],MBaaS);
					}
					else{
						Logger.info("failed getdata json data...");
						callback('Failed to get User ID', null);
					}
				}, 
				'getString', [self.prefName, self.mpinCollectionName],MBaaS);
	};

	/**
	 * This utility gets all Mpin history
	 * @param {function} callback - callback support.
	 */
	self.getAllMPINHistory=function(userID,callback){
		keyStorage(function(successResponse){
			console.log("==getAllMPINHistory==successResponse===="+JSON.stringify(successResponse));
			//TODO Mahesh - If multiple users available, need mechanism of sending that particular user data
			var fullData = JSON.parse(successResponse);
			var mPINS = [];
			if(typeof fullData[userID] != 'undefined'){
				var userData = fullData[userID];
				
				mPINS = userData.mPINs;
			}
			callback(null,mPINS);
		}, function(errorResponse){
			console.log("==getAllMPINHistory==errorResponse===="+JSON.stringify(errorResponse));
			Logger.info("failed to get the data...");
		}, 'getString', [self.prefName, self.mpinCollectionName],MBaaS);
	};

	/* =============== MPIN Functions END ========================= */
	/* =============== NOTIFICATION Functions START ======================= */

	/**
	 * This utility adds a notification, also it executes callback function
	 * @param {object} data - notification object payload
	 * @param {function} callback - callback support.
	 */
	self.addNotification = function(data,callback) {
//		data={userId:'RMBPWC1',type:0,messege:'testing title',time:'today',target_type:'Link',target:'http://www.futurebank.com/DebitCardOffers.htmls', login_required:'true',customer_id:'PWC2',payload:{content:'Your electricity bill dated 09/06/2015 has been generated for an amount of Rs.650.'},isRead:false,expiresOn:5,createdOn:new Date()};

		console.log("addNotification==data:"+data+":");
		keyStorage(
				function(successResponse){
					console.log("==addNotification==successResponse===="+JSON.stringify(successResponse));

					var notifications = JSON.parse(successResponse);
					var notification = notifications[notifications.length - 1];

					data.noticationId = notification.noticationId + 1;
					if(data.type === 0){
						data.userId = '__ALL__';
						data.exceptUser = [];
					}
					notifications.push(data);
					console.log("adding notification:"+data);
					keyStorage(
							function(addSuccess){
								console.log("==addNotification==addSuccess===="+JSON.stringify(addSuccess));
								if(callback)
									callback(null, "SUCCESS");
							}, function(addError){
								console.log("==addNotification==addError===="+JSON.stringify(addError));
								Logger.info("failed in adding data...");
							}, 
							'putString', [self.prefName, self.pushCollectionName, notifications],MBaaS);
				}, function(getError){
					console.log("==addNotification==getError===="+JSON.stringify(getError));
					if(getError === "No data"){
						//First ever notification
						console.log("First ever notification");
						var notifications = [];
						data.noticationId = 1;
						if(data.type === 0){
							data.userId = '__ALL__';
							data.exceptUser = [];
						}
						notifications.push(data);
						console.log("adding notification:"+data);
						keyStorage(
								function(addSuccess){
									console.log("==addNotification==addSuccess===="+JSON.stringify(addSuccess));
									if(callback)
										callback(null, "SUCCESS");
								}, function(addError){
									console.log("==addNotification==addError===="+JSON.stringify(addError));
									Logger.info("failed in adding data...");
								}, 
								'putString', [self.prefName, self.pushCollectionName, notifications],MBaaS);
					}
					else{
						Logger.info("failed to get data...");
						callback('Failed to get Notifications', null);
					}
				}, 
				'getString', [self.prefName, self.pushCollectionName],MBaaS);
	};

	/**
	 * This utility gets all notification using userId also callback supportable
	 * @param {string} userId - logged in user id
	 * @param {function} callback - callback support.
	 */
	self.getNotifications = function(userId,maxNotifications,callback) {
//		if($rootScope.isStubbedVersion){
//			return;
//		}
		console.log("getNotifications :: userId:"+userId+"::maxNotifications:"+maxNotifications+":");
		keyStorage(function(successResponse){
			console.log("==getNotifications==successResponse===="+JSON.stringify(successResponse));
			var allNotifications = JSON.parse(successResponse);
			var resultNotifications  = [];
			var afterExpiryAndMaxCheck = allNotifications;
			
			var today = new Date();
     		// check expiry and remove
			for(var v=0; v < allNotifications.length; v++){
				var createdOn = new Date(allNotifications[v].createdOn);
				if(createdOn instanceof Date){
					var expiryDate=createdOn.setDate(createdOn.getDate()+allNotifications[v].expiresOn);
					if(today > expiryDate){
						afterExpiryAndMaxCheck.splice(v, 1 );
					}
					else{
						if(allNotifications[v].userId === userId)
						{
							resultNotifications.push(allNotifications[v]);
						}
						else if(allNotifications[v].userId === "__ALL__" )
						{
							if(typeof allNotifications[v].exceptUser != 'undefined' &&
									allNotifications[v].exceptUser)
							{
								if(allNotifications[v].exceptUser.indexOf(userId)== -1){
									resultNotifications.push(allNotifications[v]);
								}
							}
						}
						
						// Check for maxNotification
						if(resultNotifications.length > maxNotifications){
							var tempIndex;
							var temp = afterExpiryAndMaxCheck.filter(function( obj ) {
								if(obj.noticationId === resultNotifications[0].noticationId){
									tempIndex = afterExpiryAndMaxCheck.indexOf(obj);
								}
							    return obj.noticationId === resultNotifications[0].noticationId;
							});
							
							if(resultNotifications[0].userId === "__ALL__" )
							{
								if(typeof temp[0].exceptUser == 'undefined'){
									temp[0].exceptUser = [];
									temp[0].exceptUser.push(userId);
								}
								else if(temp[0].exceptUser){
									if(temp[0].exceptUser.indexOf(userId)== -1){
										temp[0].exceptUser.push(userId);
									}
								}
								afterExpiryAndMaxCheck.splice(tempIndex,1,temp[0]); //Replacing old element
							}else{
								afterExpiryAndMaxCheck.splice(tempIndex,1); //Removing the element
							}
							
							resultNotifications.splice(0,1);
						}
					}
				}
			}
			
			keyStorage(function(addSuccess){
				console.log("==getNotifications==addSuccess===="+JSON.stringify(addSuccess));
				console.log("Return of getNotifications:"+resultNotifications);
				if(resultNotifications){
					if(callback)
						callback(resultNotifications);
				}
			}, function(addError){
				console.log("==getNotifications==addError===="+JSON.stringify(addError));
				Logger.info("failed to Remove Exipered data...");
			}, 'putString', [self.prefName, self.pushCollectionName, afterExpiryAndMaxCheck],MBaaS);	
		}, function(errorResponse){
			console.log("==getNotifications==errorResponse===="+JSON.stringify(errorResponse));
			// Handle failure for any of the previous JSONStore operations
			Logger.info("failed get json data...");
			console.log("Notifications Not available");
			var resultNotifications = [];
			if(callback)
				callback(resultNotifications);
		}, 'getString', [self.prefName, self.pushCollectionName],MBaaS);
	};
	
	 /**
	 * This utility removes all notification from storage
	 */
    self.removeAllNoti = function(){
    	keyStorage(function(getSuccess){
			console.log("==removeAllNoti==getSuccess===="+JSON.stringify(getSuccess));
		}, function(getError){
			console.log("==removeAllNoti==getError===="+JSON.stringify(getError));
			Logger.info("failed to Remove data...");
		}, 'remove', [self.prefName, self.pushCollectionName],MBaaS);	
	};
	
	/**
  	 * This utility remove all notification for a user
  	 * @param {string} userId - user id
  	 * @param {function} callback - callback support.
  	 */
	self.removeAllNotification=function(userId,callback){
		console.log("removeAllNotification :: userId:"+userId+":");
		keyStorage(function(successResponse){
			console.log("==removeAllNotification==successResponse===="+JSON.stringify(successResponse));
			var allNotifications = JSON.parse(successResponse);
			var resultNotifications  = allNotifications;

			var count = 0;
			for(var v=0; v < allNotifications.length; v++){
				if(allNotifications[v].userId === userId)
				{
					resultNotifications.splice(v,1);
					count++;
				}
				else if(allNotifications[v].userId === "__ALL__" )
				{
					if(typeof allNotifications[v].exceptUser == 'undefined'){
						resultNotifications[v].exceptUser = [];
						resultNotifications[v].exceptUser.push(userId);
					}
					else if(allNotifications[v].exceptUser){
						if(allNotifications[v].exceptUser.indexOf(userId)== -1){
							resultNotifications[v].exceptUser.push(userId);
						}
					}
					count++;
				}
			}
			console.log("==removeAllNotification==Before Replacing===="+JSON.stringify(resultNotifications));
			keyStorage(function(addSuccess){
				console.log("==removeAllNotification==addSuccess===="+JSON.stringify(addSuccess));
				console.log("Removed "+count+" Notifications Successfully");
				if(resultNotifications){
					if(callback)
						callback();
				}
			}, function(addError){
				console.log("==removeAllNotification==addError===="+JSON.stringify(addError));
				Logger.info("failed to Remove data...");
			}, 'putString', [self.prefName, self.pushCollectionName, resultNotifications],MBaaS);	
		}, function(errorResponse){
			console.log("==removeAllNotification==errorResponse===="+JSON.stringify(errorResponse));
			Logger.info("failed get json data...");
			if(callback)
				callback();
		}, 'getString', [self.prefName, self.pushCollectionName],MBaaS);
	};
	
    /**
	 * This utility remove notification for a user
	 * @param {string} id - notification id
	 * @param {number} type - type of notification multicast(1)/broadcast(0)
	 * @param {string} userId - user id
	 * @param {function} callback - callback support.
	 */
	self.removeNotification= function(noticationId,type,userId,callback) {
		console.log("removeNotification :: userId:"+userId+"::noticationId:"+noticationId+":"+"::type:"+type+":");
		
		keyStorage(function(successResponse){
			console.log("==removeNotification==successResponse===="+JSON.stringify(successResponse));
			var allNotifications = JSON.parse(successResponse);
			var tempIndex;
			var temp = allNotifications.filter(function( obj ) {
				if(obj.noticationId === noticationId){
					tempIndex = allNotifications.indexOf(obj);
				}
				return obj.noticationId === noticationId;
			});

			if(type === 0)
			{
				if(typeof temp[0].exceptUser == 'undefined'){
					temp[0].exceptUser = [];
					temp[0].exceptUser.push(userId);
				}
				else if(temp[0].exceptUser){
					if(temp[0].exceptUser.indexOf(userId)== -1){
						temp[0].exceptUser.push(userId);
					}
				}
				allNotifications.splice(tempIndex,1,temp[0]); //Replacing old element
				console.log("Replacing old element"+ temp[0]);
			}else{
				allNotifications.splice(tempIndex,1); //Removing the element
				console.log("Removing the element");
			}
			keyStorage(function(addSuccess){
				console.log("==removeNotification==addSuccess===="+JSON.stringify(addSuccess));
				if(allNotifications){
					if(callback)
						callback();
				}
			}, function(addError){
				console.log("==removeNotification==addError===="+JSON.stringify(addError));
				Logger.info("failed to Remove data...");
			}, 'putString', [self.prefName, self.pushCollectionName, allNotifications],MBaaS);	
		}, function(errorResponse){
			console.log("==removeNotification==errorResponse===="+JSON.stringify(errorResponse));
			Logger.info("failed get json data...");
			if(callback)
				callback();
		}, 'getString', [self.prefName, self.pushCollectionName],MBaaS);
	};

	

	
	/* =============== NOTIFICATION Functions END ========================= */
	
	
	
	
	
	
	/*   ========== touch id values ============= */
	self.addtouchIDStatus = function(touchIDStatus,callback)
	{
		keyStorage(function(addSuccess){
			console.log("==addtouchIDStatus==addSuccess===="+JSON.stringify(addSuccess));
			if (callback)
				callback(null, "SUCCESS");
		}, function(addError){
			console.log("==addtouchIDStatus==addError===="+JSON.stringify(addError));
			Logger.info("failed to add data...");
		}, 'putString', [self.prefName, self.touchIDActivationStatus, touchIDStatus],MBaaS);
	};
	
	
	self.addisResignedActivation = function(isResignedActivationStatus,callback)
	{
		keyStorage(function(addSuccess){
			console.log("==isResignedActivationStatus==addSuccess===="+JSON.stringify(addSuccess));
			if (callback)
				callback(null, "SUCCESS");
		}, function(addError){
			console.log("==isResignedActivationStatus==addError===="+JSON.stringify(addError));
			Logger.info("failed to add data...");
		}, 'putString', [self.prefName, self.touchIDResignedActivationStatus, isResignedActivationStatus],MBaaS);
	};
	
	self.addValidKeys = function(addValidKeys,callback)
	{
		keyStorage(function(addSuccess){
			console.log("==addValidKeys==addSuccess===="+JSON.stringify(addSuccess));
			if (callback)
				callback(null, "SUCCESS");
		}, function(addError){
			console.log("==addValidKeys==addError===="+JSON.stringify(addError));
			Logger.info("failed to add data...");
		}, 'putString', [self.prefName, self.touchIDaddValidKeys, addValidKeys],MBaaS);
	};
	
	
	self.touchIDStatus = function(callback) {
		keyStorage(function(getSuccess){
			console.log("==getBankid==getSuccess===="+JSON.stringify(getSuccess));
			var touchIDSuccess = [];
			var obj = {};
			obj.touchID = getSuccess;
			touchIDSuccess.push(obj);
			callback(null, touchIDSuccess);
		}, function(getError){
			console.log("==touchIDSuccess==getError===="+JSON.stringify(getError));
			Logger.info("failed getdata json data...");
			callback('Failed to get touchIDSuccess ID', null);
		}, 'getString', [self.prefName, self.touchIDActivationStatus],MBaaS);	
	};
	
	
	self.touchIDStatus = function(callback) {
		keyStorage(function(getSuccess){
			console.log("==getBankid==getSuccess===="+JSON.stringify(getSuccess));
			var touchIDResigned = [];
			var obj = {};
			obj.touchIDResignedActivation = getSuccess;
			touchIDResigned.push(obj);
			callback(null, touchIDResigned);
		}, function(getError){
			console.log("==touchIDSuccess==getError===="+JSON.stringify(getError));
			Logger.info("failed getdata json data...");
			callback('Failed to get touchIDSuccess ID', null);
		}, 'getString', [self.prefName, self.touchIDResignedActivationStatus],MBaaS);	
	};
	
	self.touchIDStatus = function(callback) {
		keyStorage(function(getSuccess){
			console.log("==getBankid==getSuccess===="+JSON.stringify(getSuccess));
			var touchIDaddValid = [];
			var obj = {};
			obj.touchIDaddValidKey = getSuccess;
			touchIDSuccess.push(obj);
			callback(null, touchIDaddValid);
		}, function(getError){
			console.log("==touchIDSuccess==getError===="+JSON.stringify(getError));
			Logger.info("failed getdata json data...");
			callback('Failed to get touchIDSuccess ID', null);
		}, 'getString', [self.prefName, self.touchIDaddValidKeys],MBaaS);	
	};
	
	
	
	
	
	
};