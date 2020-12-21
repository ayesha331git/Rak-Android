
/* JavaScript content from js/utils/jsonStore.js in folder common */
App.viewModels.jsonStore = function(Logger, $scope, $http,MBaaS) {
    // json store init function

    var self = this;
	var mobileAppConfigData = new App.viewModels.mobileAppConfig($scope,Logger);
	/**  Let us read the mobileAppConfig file now. */
    $http.get('mobileAppConfig.json').success(function(data) {    	
    	mobileAppConfigData.loadMobileAppConfigData(data);
    	self.collectionName =  mobileAppConfigData.appConfigData.FIN_COLLECTION; // 'finCollection';
        self.mpinCollectionName = mobileAppConfigData.appConfigData.M_PINS; // 'mpins';
        self.pushCollectionName = mobileAppConfigData.appConfigData.PUSH; // 'push';
        self.localeCollectionName=mobileAppConfigData.appConfigData.LOCALE; // 'locale';
        self.bankIdCollectionName=mobileAppConfigData.appConfigData.BANK_ID; // 'bankId';
        self.buildTypeCollectionName=mobileAppConfigData.appConfigData.BUILD_TYPE; // 'buildType';       
        self.options = mobileAppConfigData.appConfigData.JSONSTORE_CREDENTIALS;
    }).error(function(msg, code) {
    	Logger.info("Error occured while trying to fecth mobileAppConfig data !! "+msg);
    });
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
    // notification collection
    self.pushCollections = {
    		  push : {
    		    searchFields : {userId: 'string', type: 'integer'}
    		  }
    		};
    // Optional options object.
    self.options = {
        // Optional username, default 'jsonstore'.
    	//Dynamic generation of JSON Creds. Removed hard coding	
        username: '',
        password: '',
        // Optional local key generation flag, default false.
        localKeyGen: false
    };
    /**
	 * This utility adds a notification, also it executes callback function
	 * @constructor
	 * @param {object} data - notification object payload
	 * @param {function} callback - callback support.
	 */
    self.addNotification = function(data,callback) {
//    	if(!data)
//    		data={userId:'RMBPWC1',type:0,messege:'testing title',time:'today',target_type:'Link',target:'http://www.futurebank.com/DebitCardOffers.htmls', login_required:'true',customer_id:'PWC2',payload:{content:'Your electricity bill dated 09/06/2015 has been generated for an amount of Rs.650.'},isRead:false,expiresOn:5,createdOn:new Date()};
//    	
//    	alert(data);
//    	var type=0//prompt("enter type");
//    	data.type=type*1;
    	
    	if(data.type===0){
    		data.userId='__ALL__';
    		}
    	
        MBaaS.getJSONStore().init(self.pushCollections, self.options)
        .then(function() {
        	console.log('inside init');
                        // Optional options for add.
                        var addOptions = {
                            markDirty: true
                        };
                       
                        MBaaS.getJSONStore().get(self.pushCollectionName).add(data, addOptions)
                            .then(function(success) {
                            	console.log('inside getting',success);
                            	if(callback)
                         			callback();
                                self.close();
                            });
                   
            })

        .fail(function(errorObject) {
            // Handle failure for any of the previous JSONStore operations
            Logger.info("failed added json data...");
        });
    };
    /*This Utility is added to Add Bank Id 
     * The Bank id is used only during developemnt process 
     * */
    
    self.addBankId = function(bankId,callback) {
    	self.removeAllBankId();
        var data={};
    	MBaaS.getJSONStore().init(self.bankIdCollections, self.options)
    	        .then(function() {
    	        	console.log('inside init');
    	                       
    	                        var addOptions = {
    	                            markDirty: true
    	                        };
    	                        
    	                      
    	                        data['bankId']=bankId;
    	                        MBaaS.getJSONStore().get(self.bankIdCollectionName).add(data, addOptions)
    	                            .then(function(success) {
    	                            	
    	                            	console.log('inside getting',success);
    	                            	if(callback)
    	                            		callback(null, "SUCCESS");
    	                                self.close();
    	                            });
    	                   
    	            })

    	        .fail(function(errorObject) {
    	            // Handle failure for any of the previous JSONStore operations
    	            Logger.info("failed added json data...");
    	        });
    	    };
    	    
    	    
    	    self.getBankid = function(callback) {

    	    	
    	        MBaaS.getJSONStore().init(self.bankIdCollections, self.options)
    	            .then(function() {
    	                // handle success
    	               
    	                var options = {
    	                	    limit: 10 //returns a maximum of 10 documents
    	                };
    	                
    	                
    	                MBaaS.getJSONStore().get(self.bankIdCollectionName)
    	                .findAll(options)
    	                .then(function(arrayResults) {
               
    	                        self.close();
    	                        bankIds = [];
    	                        for (var i = 0; i < arrayResults.length; i++) {
    	                            var obj = {};
    	                            obj.bankId = arrayResults[i].json.bankId;
    	                            bankIds.push(obj);
    	                        }
    	                        callback(null, bankIds);

    	                    })
    	                .fail(function(errorObject) {
    	                        Logger.info("failed getdata json data...");
    	                        callback('Failed to get USER IDs', null);
    	                        // handle failure
    	                    });
    	            }).fail(function(errorObject) {
    	           // alert("Failed to retrive");
    	            callback('Failed to connect to JSON Store', null);
    	        });

    	    };
    	    
    	    
    	    
    	    self.removeAllBankId=function(){
    	    	MBaaS.getJSONStore().init(self.bankIdCollections, self.options)
    	    	.then(function() {
    	    		
    		    	MBaaS.getJSONStore().get(self.bankIdCollectionName).clear()
    	    	});

    	    };
    	    
    	    self.setBuildType = function(buildType,callback) {
    	    	self.removeAllbuildType();
    	        var data={};
    	    	MBaaS.getJSONStore().init(self.buildTypeCollections, self.options)
    	    	        .then(function() {
    	    	        	console.log('inside init');
    	    	                       
    	    	                        var addOptions = {
    	    	                            markDirty: true
    	    	                        };
    	    	                        
    	    	                      
    	    	                        data['buildType']=buildType;
    	    	                        MBaaS.getJSONStore().get(self.buildTypeCollectionName).add(data, addOptions)
    	    	                            .then(function(success) {
    	    	                            	
    	    	                            	console.log('inside getting',success);
    	    	                            	if(callback)
    	    	                         			callback();
    	    	                                self.close();
    	    	                            });
    	    	                   
    	    	            })

    	    	        .fail(function(errorObject) {
    	    	            // Handle failure for any of the previous JSONStore operations
    	    	            Logger.info("failed added json data...");
    	    	        });
    	    	    };
    	    
    	    	    self.getbuildType= function(callback) {
    	    	    	 MBaaS.getJSONStore().init(self.buildTypeCollections, self.options)
    	    	    	    	            .then(function() {
    	    	    	    	                // handle success
    	    	    	    	               
    	    	    	    	                var options = {
    	    	    	    	                	    limit: 10 //returns a maximum of 10 documents
    	    	    	    	                };
    	    	    	    	                
    	    	    	    	                
    	    	    	    	                MBaaS.getJSONStore().get(self.buildTypeCollectionName)
    	    	    	    	                .findAll(options)
    	    	    	    	                .then(function(arrayResults) {
    	    	    	               
    	    	    	    	                        self.close();
    	    	    	    	                        buildType = [];
    	    	    	    	                        for (var i = 0; i < arrayResults.length; i++) {
    	    	    	    	                            var obj = {};
    	    	    	    	                            obj.buildType = arrayResults[i].json.buildType;
    	    	    	    	                            buildType.push(obj);
    	    	    	    	                        }
    	    	    	    	                        callback(null, buildType);

    	    	    	    	                    })
    	    	    	    	                .fail(function(errorObject) {
    	    	    	    	                        Logger.info("failed getdata json data...");
    	    	    	    	                        callback('Failed to get USER IDs', null);
    	    	    	    	                        // handle failure
    	    	    	    	                    });
    	    	    	    	            }).fail(function(errorObject) {
    	    	    	    	           
    	    	    	    	            callback('Failed to connect to JSON Store', null);
    	    	    	    	        });

    	    	    	    	    };
    	    	    	    	    
    	    	    	    	    
    	    	    	    	    
    	    	    	    	    self.removeAllbuildType=function(){
    	    	    	    	    	MBaaS.getJSONStore().init(self.buildTypeCollections, self.options)
    	    	    	    	    	.then(function() {
    	    	    	    	    		
    	    	    	    		    	MBaaS.getJSONStore().get(self.buildTypeCollectionName).clear()
    	    	    	    	    	});

    	    	    	    	    };
    /**
	 * This utility gets all notification using userId also callback supportable
	 * @constructor
	 * @param {string} userId - logged in user id
	 * @param {function} callback - callback support.
	 */
    self.getNotifications = function(userId,callback) {
	
    	userId=userId||'__ALL__';
    	 // handle success
        var options = {
            exact: true
        };
        
        var queryPart1 = MBaaS.getJSONStore().QueryPart().equal('userId',userId);
        
        var queryPart2 = MBaaS.getJSONStore().QueryPart().equal('userId','__ALL__');
        
        MBaaS.getJSONStore().init(self.pushCollections, self.options)
        .then(function() {
        	MBaaS.getJSONStore().get(self.pushCollectionName).advancedFind([queryPart1, queryPart2])
        	.then(function(pushs){
        		if(pushs){
             		console.log("get notification success");    
             		console.log(pushs);
             	// Added for RAK customisation
             		/*var today=new Date();*/
             	// Added for RAK customisation
             		var indexArr=[];
             	// check expiry and remove
             		for(var v=0;v<pushs.length;v++){
             			/*var createdOn=new Date(pushs[v].json.createdOn);
             			if(createdOn instanceof Date){
             			var expiryDate=createdOn.setDate(createdOn.getDate()+pushs[v].json.expiresOn);*/
             			// Added for RAK customisation
             			var today=moment(new Date());
             			var expiryDate=moment(pushs[v].json.expiresOn);
             			// Added for RAK customisation
             			if(today > expiryDate){
             				setTimeout(function(){
             					self.removeNotification(pushs[v]._id,-1); //	
             				},200);
             				
             				indexArr.push(v);
             			}
             			/*}*/
             		}
             		for(var i=0;i<indexArr.length;i++){
             			pushs.splice(indexArr[i],1);
             		}
             		//end of check expiry
             	
             		if(callback)
             			callback(pushs);
             		self.close();
             	}
        	})
        	.fail(function(errorObject) {
                // Handle failure for any of the previous JSONStore operations
                Logger.info("failed added json data...");
            });
        	 
            })

        .fail(function(errorObject) {
            // Handle failure for any of the previous JSONStore operations
            Logger.info("failed added json data...");
        });
    };
    /**
	 * This utility removes all notification from jsonstore
	 * @constructor
	 */
    self.removeAllNoti=function(){
    	MBaaS.getJSONStore().init(self.pushCollections, self.options)
    	.then(function() {
	    	MBaaS.getJSONStore().get(self.pushCollectionName).removeCollection();
    	});

    };
    /**
	 * This utility remove notification for a user
	 * @constructor
	 * @param {string} id - jsonstore id
	 * @param {number} type - type of notification multicast(1)/broadcast(0)
	 * @param {string} userId - user id
	 * @param {function} callback - callback support.
	 */
    self.removeNotification= function(id,type,userId,callback) {
//    	if(!userId)
//    		uid='RMBPWC1';
//    	if(!type)
//    		type=0;

    	var options = {
    			  exact: true,
    			  markDirty: true};
//    	id=prompt("enter json id")*1;
//    	console.log(id);
//    	type=prompt("enter type")*1;
//    	console.log(type);
    	// get the record using Id.
    	MBaaS.getJSONStore().init(self.pushCollections, self.options)
    	.then(function() {
    	
      // type ==0 then fetch and update
    	if(type===0){
        	 MBaaS.getJSONStore().get(self.pushCollectionName)
             .findById(id)
             .then(function(results){
        		 // userid inserted in the field
        		 if(typeof results[0].json.exceptUser == 'undefined'){
        			 results[0].json.exceptUser=[];
        		 }
        		 results[0].json.exceptUser.push(userId);
        		 var addOptions = {
                         push: true
                     };
        		 // update the records
        		 MBaaS.getJSONStore().get(self.pushCollectionName).replace(results[0], addOptions)
                 .then(function(res) {
                	 //console.log('update completed:',res);
                 	
                	 if(callback)
                        callback();
                     self.close();
                 }); 
        	 });
         }
        	 else{
        		 var queries = {_id: id};
        		 MBaaS.getJSONStore().get(self.pushCollectionName)
        		 .remove(queries, options)
        		 .then(function (numberOfDocumentsRemoved) {
        			 console.log("deleted rows="+numberOfDocumentsRemoved);
        			 if(callback)
                         callback();
        			 
        			})

        			.fail(function (errorObject) {
        			  //console.log('error while delete');
        			});
        	 }
         });
    	
  	  };
  	/**
  	 * This utility remove all notification for a user
  	 * @constructor
  	 * @param {Array} list - jsonstore notification list
  	 * @param {string} userId - user id
  	 * @param {function} callback - callback support.
  	 */
  	self.removeAllNotification=function(list,userId,callback){
   	 var addOptions = {
      push: true
   	 };
  		if(list){
  			var query={};
  			MBaaS.getJSONStore().init(self.pushCollections, self.options)
  	        .then(function() {
  			for(var i=0;i<list.length;i++){
  				query={_id:list[i]._id};
  				if(list[i].json.userId!="__ALL__"){
  					 MBaaS.getJSONStore().get(self.pushCollectionName)
  		             .remove(query)
  		             .then(function (res) {
  		                 //handle success
  		             	console.log('remove all success',res);
  		             	if(i==list.length){
		                	if(callback)
		                         callback();
		                self.close();
		                }
  		             })
  		             .fail(function (errorObject) {
  		                 //handle failure
  		             	console.log('error while removing uid');
  		             });
  					 	
  				}else{

 					 MBaaS.getJSONStore().get(self.pushCollectionName)
 		        	 .find(query)
 		        	 .then(function(results){
 		        		 //for(var count=0;count<results.length;count++){
 		        		
 		        		  if(typeof results[0].json.exceptUser == 'undefined'){
 		        			 results[0].json.exceptUser=[];
 		        		 //}
 		        		 results[0].json.exceptUser.push(userId);
 		        		
 		        		 // update the records
 		        		 MBaaS.getJSONStore().get(self.pushCollectionName).replace(results[0], addOptions)
 		                 .then(function(res) {
 		                	 //console.log('update completed:',res)               	
 		                	 if(i==list.length){
 		                		 if(callback)
 		                             callback();
 		                		 self.close();
 		                	 }
 		                 });
 		        		 
 		        	 }
 		        });
 				
  				}
  			}
  	        });
  		}
        
        
    };
  	  
    //To get a unique password
    //	self.createPassword=function(){
    //	alert(self.options.password);
    //	self.options.password=WL.Device.getID(function(err,result){
    //	if(err){
    ////	alert(err); return;
    //	}
    //	alert(result);
    //	});

    //	}

    // add userName to the jsonStore
    // Data to add, you probably want to get
    // this data from a network call (e.g. Worklight Adapter).
    // var data = [{name: 'carlos', age: 10}];

    /**
  	 * This utility gets all Mpin history 
  	 * @constructor
  	 * @param {function} callback - callback support.
  	 */
    self.getAllMPINHistory=function(callback){
        MBaaS.getJSONStore().init(self.mpinCollections, self.options)
        .then(function() {
        	Logger.info('init complete');
           
            MBaaS.getJSONStore().get(self.mpinCollectionName)
            .findAll()
            .then(function(mPINS) {
            	Logger.info('find all Mpins completed');
            	 
            	if(mPINS){
            		console.log("Initializing mPINS Object for first time usage.");            		
            		callback(null,mPINS);
            	}

                })

            .fail(function(errorObject) {
                    Logger.info("failed to get all mpin 1...");
                    //callback('Failed to get USER IDs', null);
                    // handle failure
                });
        }).fail(function(errorObject) {
        // handle failure
        	 Logger.info("failed to get all mpin 2...");
    });
    };
    
    /**
  	 * This utility remove all notification for a user
  	 * @constructor
  	 * @param {string} userID - user ID.
  	 * @param {number} maxHistoryCount - max history allowed.
  	 * @param {string} mPin - mPin provided by user.
  	 * @param {function} callback - callback support.
  	 */
    self.validateAndStoreMPIN=function(userID,maxHistoryCount,mPin,callback){

        MBaaS.getJSONStore().init(self.mpinCollections, self.options)
        .then(function() {
            // handle success
            var options = {
                exact: true
            };
            MBaaS.getJSONStore().get(self.mpinCollectionName)
            .findAll()
            .then(function(res) {
            	var isInsert=false;
            	var mPINS={};
            	if(res.length>0)
            		mPINS=res[0].json;
            	
            	 Logger.info("failed getdata json data..."+mPINS);
            	if(!mPINS || Object.keys(mPINS).length === 0){
            		//console.log("Initializing mPINS Object for first time usage.");
            		//mPINS = {};
            		isInsert=true;
            	}
            	if(typeof mPINS[userID] != 'undefined'){
            		var userData = mPINS[userID];
            		mPin+='';
            		
            		//console.log("Data : "+ userData.mPINs[mPin] + " -- " + mPin) ;
            		if(userData.mPINs.indexOf(mPin) != -1){
            			//Error condition, mpin already exists
            			//console.log("MPIN already exists, please choose another MPIN.");
            			return;
            		}
            		//debugger;
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
            		//console.log(mPINS);
            	}
            	if(isInsert){
            		 var addOptions = {

                             // Mark data as dirty (true = yes, false = no),
                             // default true.
                             markDirty: true
                         };
            		 MBaaS.getJSONStore().get(self.mpinCollectionName).add(mPINS)
                     .then(function() {
                    	 callback(null,res);
                    	 Logger.info("add data json data...");
                         self.close();
                     });
            	}else{
            		res[0].json=mPINS;
            		var addOptions = {

                            // Mark data as dirty (true = yes, false = no),
                            // default true.
                            push: true
                        };
           		 MBaaS.getJSONStore().get(self.mpinCollectionName).replace(res, addOptions)
                    .then(function() {
                    	callback(null,res);
                        self.close();
                    });

            	}

                })

            .fail(
                function(errorObject) {
                    Logger.info("failed to get ...");
                    //callback('Failed to get USER IDs', null);
                    // handle failure
                });
        })

    .fail(function(errorObject) {
        // handle failure
    	 Logger.info("failed to get ...");
    });
    
    };

    /**
  	 * This utility add username to jsonstore when "remember userId" checked
  	 * @constructor
  	 * @param {object} data - user ID.
  	 */
    self.addDoc = function(data) {

            MBaaS.getJSONStore().init(self.collections, self.options)
            .then(
                function() {
                    self.getCount(data, function(err, result) {
                        if (err) {
                            //							alert(err); return;
                        }
                        if (result <= 0) {
                            var jsonData = {
                                name: data
                            };
                            // Optional options for add.
                            var addOptions = {

                                // Mark data as dirty (true = yes, false = no),
                                // default true.
                                markDirty: true
                            };
                            // Get an accessor to the people collection and add
                            // data.

                            MBaaS.getJSONStore().get(self.collectionName).add(jsonData, addOptions)
                                .then(function() {
                                    self.close();
                                });

                        }
                    });
                }, function(error){
                	console.log("jstore===>error in addDoc json init",error);
                })

            .then(function(numberOfDocumentsAdded) {
                // Add was successful.
                Logger.info("successfully added json data...");
            })

            .fail(function(errorObject) {
                // Handle failure for any of the previous JSONStore operations
                Logger.info("failed added json data...");
            });
        };
        /**
      	 * This utility gets the count of the data
      	 * @constructor
      	 * @param {object} data - user ID.
      	 */
    self.getCount = function(data, callback) {
        var query = {
            name: data
        };
        var options = {
            // Exact match (true) or fuzzy search (false), default fuzzy search.
            exact: true
        };

        MBaaS.getJSONStore().get(self.collectionName)
        .count(query, options)
        .then(function(numberOfDocumentsThatMatchedTheQuery) {
            // Handle success.
            callback(null, numberOfDocumentsThatMatchedTheQuery);
            return numberOfDocumentsThatMatchedTheQuery;
        })
        .fail(function(errorObject) {
            // Handle failure.
            callback('Failed to get count', null);
            return 0;
        });

    };

    /**
  	 * this utility remove a document from the json store for now user
  	 * @constructor
  	 * @param {object} data - user ID.
  	 */
    self.removeDoc= function(data) {
    	
    	  MBaaS.getJSONStore().init(self.collections, self.options)

          .then(
              function() {
            		var query = {
                            name: data
                        };
               
                var options = {
                    push: true
                };

                MBaaS.getJSONStore().get(self.collectionName)
                .remove(query, options)
                .then(function (numberOfDocumentsRemoved) {
                    //handle success
                	res=numberOfDocumentsRemoved;
                })
                .fail(function (errorObject) {
                    //handle failure
                	res=errorObject;
                });

              })

    .then(function (numberOfDocumentsRemoved) {
        //handle success
    	res=numberOfDocumentsRemoved;
    }).fail(function (errorObject) {
        //handle failure
    	 Logger.info("failed to remove data...");
    });
    	  };


   // gets all the data
   /**
   * this utility remove a document from the json store for now user
   * @constructor
   * @param {function} callback - callback function on success.
   */
    self.getAllDocs = function(callback) {

        MBaaS.getJSONStore().init(self.collections, self.options)
            .then(function() {
                // handle success
                var options = {
                    // Exact match (true) or fuzzy search (false),
                    exact: true
                };
                MBaaS.getJSONStore().get(self.collectionName)
                .findAll(options)
                .then(function(arrayResults) {

                        self.close();
                        userIDs = [];
                        for (var i = 0; i < arrayResults.length; i++) {
                            var obj = {};
                            obj.name = arrayResults[i].json.name;
                            userIDs.push(obj);
                        }
                        callback(null, userIDs);

                    })
                .fail(function(errorObject) {
                        Logger.info("failed getdata json data...");
                        callback('Failed to get USER IDs', null);
                        // handle failure
                    });
            }).fail(function(errorObject) {
            // handle failure
            callback('Failed to connect to JSON Store==getAllDocs==', null);
        });

    };
    // this is the utility to add locale in the json store 
    
    self.removeAllLocale=function(){
    	MBaaS.getJSONStore().init(self.localeCollections, self.options)
    	.then(function() {
    		//alert("localeCollections Cleared");
	    	MBaaS.getJSONStore().get(self.localeCollectionName).clear();
    	});

    };
    
    
    self.addLocale=function (locale,callback)
    {
    	 self.removeAllLocale();
    	 var data={};   	
    	
    	 
    	 MBaaS.getJSONStore().init(self.localeCollections, self.options)
	        .then(function() {
	        	console.log('inside locale init');
	                       
	                        var addOptions = {
	                            markDirty: true
	                        };
	//                        alert("in JSON Store");
	                      
	                        data['locale']=locale;
	                        MBaaS.getJSONStore().get(self.localeCollectionName).add(data, addOptions)
	                            .then(function(success) {
	  //                          	alert("locale Data Saved Successfully");
	                            	console.log('inside getting',success);
	                            	if(callback)
	                         			callback();
	                                self.close();
	                            });
	                   
	            })

	        .fail(function(errorObject) {
	            // Handle failure for any of the previous JSONStore operations
	            Logger.info("failed added locale json data...");
	        });
    	
    };
    
    
    self.getLocale = function(callback) {

    	
        MBaaS.getJSONStore().init(self.localeCollections, self.options)
            .then(function() {
                // handle success
               
             
                
                
                MBaaS.getJSONStore().get(self.localeCollectionName)
                .findAll()
                .then(function(arrayResults) {
       
                        self.close();
                        locale = [];                      
                        obj={};
                            obj.locale = arrayResults[0].json.locale;
                            locale.push(obj);
                       
                        callback(null, locale);

                    })
                .fail(function(errorObject) {
                        Logger.info("failed getdata json data...");
                        callback('Failed to get locale', null);
                        // handle failure
                    });
            }).fail(function(errorObject) {
           // alert("Failed to retrive"+errorObject);
            callback('Failed to connect to JSON Store', null);
        });

    };
   
    /**
  	 * This utility closes the json store until the init function is called again
  	 * @constructor
  	 */
    self.close = function() {
        MBaaS.getJSONStore().closeAll()
        .then(function() {
            // handle success
        }).fail(function(errorObject) {
            // handle failure
        	 Logger.info("failed close connection call...");
        });
    };
};