/* Ravi changes for updating push message in Notification List . Fix for TOL :893627 */
App.viewModels.pushNotificationHandler = function(Logger, MBaaS,$rootScope, keyStorage,$filter, $q, ActionProcessor) {
    // json store init function

    var self = this;
    self.pushCollectionName = 'push';

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

    self.initPushCollection = function(){
        //return function()
        {
            var defer = $q.defer(); //creating promise here..
            if(!$rootScope.pushInitSuccess){
                MBaaS.getJSONStore().init(self.pushCollections, self.options)
                .then(function() {
                    console.log("==pushNotificationHandler==>>>>>>>>Push collections init successfull..");
                    //$rootScope.pushInitSuccess = true;
                    defer.resolve();
                },function(error){
                    console.log("==pushNotificationHandler==>>>>>>>>Error init of Push collections..",JSON.stringify(error));
                    //$rootScope.pushInitSuccess = false;
                    defer.reject();
                })
                .fail(function(error){
                    console.log("==pushNotificationHandler==>>>>>>>>Fail init of Push collections..",JSON.stringify(error));
                    //$rootScope.pushInitSuccess = false;
                    defer.reject();
                });
            }
            return defer.promise;
        }
    }

    self.closePushCollection = function(){
        $rootScope.pushInitSuccess = false;
        MBaaS.getJSONStore().closeAll()
            .then(function() {
                console.log("==pushNotificationHandler==>>>>>>>>Push collections close successfull..");
            },function(error){
                console.log("==pushNotificationHandler==>>>>>>>>Error close of Push collections..",JSON.stringify(error));
            })
        .fail(function(error){
            console.log("==pushNotificationHandler==>>>>>>>>Fail close of Push collections..",JSON.stringify(error));
        });
    }

/* Ravi changes for updating push message in Notification List . Fix for TOL :893627 */
/*
//This function is not used now.. Hence commented
    self.addNotification = function(data,callback) {
        if(data.type==0){
            data.userId='__ALL__';
        }

        if($rootScope.pushInitSuccess){
            console.log('==pushNotificationHandler==>>>>>>>>inside addNotification');
            // Optional options for add.

            var addOptions = {
                markDirty: true
            };
            MBaaS.getJSONStore().get(self.pushCollectionName).add(data, addOptions)
            .then(function(success) {
                console.log('==pushNotificationHandler==>>>>>>>>inside addNotification get',success);
                //if(callback)
                //    callback();
                //Ravi changes for push
                var pushPayload = JSON.parse(data.payload);
                var userId = pushPayload["userId"];

                if(userId == rootScope.fields.finacleUserCorporateId || userId =="__ALL__"){
                    rootScope.unreadCount = rootScope.unreadCount+1;
                    //localStorage.UnreadNotifications = rootScope.unreadCount;
                    rootScope.$apply();
                }
                //Ravi changes for push
            });
        }else {
            console.log("==pushNotificationHandler==>>>>>>>>JSONStore is not initialized. Initializing now..");
            //self.initPushCollection();
            //$rootScope.pushInitSuccess = true;
        }
    };
*/
      self.updateReadStatus = function(){
        var userId = rootScope.fields.finacleUserCorporateId;
        console.log("==pushNotificationHandler==>>>>>>>>user Id in getUnreadNotificationCount is:"+userId);
        var options = {
            markDirty: true
        };
        console.log("==pushNotificationHandler==>>>>>>>>$rootScope.pushInitSuccess"+$rootScope.pushInitSuccess);
        var queryPart1 = MBaaS.getJSONStore().QueryPart().equal('userId',userId);
        var queryPart2 = MBaaS.getJSONStore().QueryPart().equal('userId','__ALL__');
        if($rootScope.pushInitSuccess){
            MBaaS.getJSONStore().get(self.pushCollectionName).advancedFind([queryPart1, queryPart2])
            .then(function(pushs){
                console.log("==pushNotificationHandler==>>>>>>>>success to get records");
                if(pushs){
                	for(var i=0;i<pushs.length;i++){
                        if(pushs[i].json.readFlag.indexOf(userId)==-1){
                            //pushs[i].json.readFlag.pop();
                            pushs[i].json.readFlag.push(userId);
                            console.log("==pushNotificationHandler==>>>>>>>>Push record updated..");
                            MBaaS.getJSONStore().get(self.pushCollectionName).replace(pushs[i],options)
                            .then(function(numberOfDocumentsReplaced){
                                console.log("==pushNotificationHandler==>>>>>>>>Records Updated is"+numberOfDocumentsReplaced);
                                rootScope.unreadCount = 0;
                                //localStorage.UnreadNotifications = rootScope.unreadCount;
                                rootScope.$apply();
                                Logger.info("unread notifications count" +localStorage.UnreadNotifications);
                            },function(error){
                                console.log("==pushNotificationHandler==>>>>>>>>Error in replace"+JSON.stringify(error));
                            })
                            .fail(function(errorObject){
                                console.log("==pushNotificationHandler==>>>>>>>>failed updating JSONStore"+JSON.stringify(errorObject));
                            });
                        }
                	}
                }
            })
            .fail(function(error){
                console.log("==pushNotificationHandler==>>>>>>>>failed to get records"+JSON.stringify(error));
            })
        } else {
            console.log("==pushNotificationHandler==>>>>>>>>JSONStore is not initialized. Initializing now..");
            //self.initPushCollection();
            //$rootScope.pushInitSuccess = true;
        }
    }

    self.getNotifications = function(userId,maxNotifications,callback) {
        var userId = rootScope.fields.finacleUserCorporateId;   /* Ravi changes for updating push message in Notification List . Fix for TOL :893627 */
             // handle success
        var options = {
            exact: true
        };

        var queryPart1 = MBaaS.getJSONStore().QueryPart().equal('userId',userId);
        var queryPart2 = MBaaS.getJSONStore().QueryPart().equal('userId','__ALL__');

        if($rootScope.pushInitSuccess){
            MBaaS.getJSONStore().get(self.pushCollectionName).advancedFind([queryPart1, queryPart2])
            .then(function(pushs){
                if(pushs){
                    console.log("==pushNotificationHandler==>>>>>>>>get notification success");
                    console.log(pushs);
                    var today=$filter('date')(new Date(), 'dd/MMM/yyyy');
                    console.log("I==pushNotificationHandler==>>>>>>>>today is:"+today);

                    var todayTime = new Date().getTime();
                    console.log("I==pushNotificationHandler==>>>>>>>>today time is:"+todayTime);
                    //var indexArr=[];
                    // check expiry and remove
                    var res = [];
                    for(var v=0;v<pushs.length;v++){
                        console.log("I==pushNotificationHandler==>>>>>>>>index is:"+v+",ID is:"+pushs[v]._id);
                        var pushCreatedOn = $filter('date')(new Date(pushs[v].json.createdOn), 'dd/MMM/yyyy');
                        console.log("==pushNotificationHandler==>>>>>>>>pushCreatedOn is:"+pushCreatedOn);
                        var pushExpiresOn = $filter('date')(new Date(pushs[v].json.expiresOn), 'dd/MMM/yyyy');
                        console.log("==pushNotificationHandler==>>>>>>>>expiresOn is:"+pushExpiresOn);
                        console.log("==pushNotificationHandler==>>>>>>>>expiresOn time is:"+new Date(pushs[v].json.expiresOn).getTime());
                        if(todayTime > new Date(pushs[v].json.expiresOn).getTime()){
                            //remove the notification here..
                            console.log("==pushNotificationHandler==>>>>>>>>notification expired is:"+pushs[v]._id);
                            self.removeUserNotification(pushs[v]._id);
                            pushs.splice(v, 1);;
                        } else {
                            res.push(pushs[v]);
                        }
                    }

                            var notificationCount = 0;
                            /* Ravi changes for updating push message in Notification List . Fix for TOL :893627 */
                            if(ActionProcessor.getCurrentPage() == "NotificationList"){
                                console.log("==pushNotificationHandler==>>>>>>>>notification count rest as it is in list page");
                                self.updateReadStatus();
                            } else {
                                pushs.filter((data) => {
                                    console.log(JSON.stringify(data,null,4));
                                    if((data.json.userId === userId || data.json.userId === '__ALL__')){
                                        if(data.json.readFlag.indexOf(userId)==-1)
                                        notificationCount++;
                                    }
                                });
                            }
                            rootScope.unreadCount = notificationCount;

                            //localStorage.UnreadNotifications = notificationCount;
                            //rootScope.isCountReadDone = true;
                            console.log("==pushNotificationHandler==>>>>>>>>Notification Count for User "+userId+" is:"+rootScope.unreadCount);
                            //Ravi changes for push -END

                            for(var i=0;i<res.len;i++){
                                console.log(JSON.stringify(res[i],null,4));
                            }
                            /* Ravi changes for updating push message in Notification List . Fix for TOL :893627 */
                            rootScope.notifications.notificationsList = res;
                            console.log("==pushNotificationHandler==>>>>>>>>NotificationList Count for User "+rootScope.notifications.notificationsList.length);
                        if(callback)
                            callback(res);
                    }
                })
                .fail(function(errorObject) {
                    // Handle failure for any of the previous JSONStore operations
                    Logger.info("==pushNotificationHandler==>>>>>>>>failed added json data...");
                });
            }
            else {
                console.log("==pushNotificationHandler==>>>>>>>>JSONStore is not initialized. Initializing now..");
                //self.initPushCollection();
                //$rootScope.pushInitSuccess = true;
            }
    };

    self.removeNotification=function(id,type,userId,callback){
        if($rootScope.pushInitSuccess){
            var query = {_id: id};
            var options = {exact: true};
            try {
                MBaaS.getJSONStore().get(self.pushCollectionName).findById(id).then(function (res) {
                    if(res[0].json.userId == userId){
                        self.removeUserNotification(id);
                    } else {
                        res[0].json.deleteFlag.push(userId);
                        console.log("==pushNotificationHandler==>>>>>>>>Push record updated..");
                        MBaaS.getJSONStore().get(self.pushCollectionName).replace(res[0],options)
                        .then(function(numberOfDocumentsReplaced){
                                console.log("==pushNotificationHandler==>>>>>>>>Records Updated is"+numberOfDocumentsReplaced);
                        },function(error){
                                console.log("==pushNotificationHandler==>>>>>>>>Error in replace"+JSON.stringify(error));
                        })
                        .fail(function(errorObject){
                                console.log("==pushNotificationHandler==>>>>>>>>failed updating JSONStore"+JSON.stringify(errorObject));
                        });
                    }
                    if(callback)
                        callback();
                }).fail(function (errorObject) {
                    console.log("==pushNotificationHandler==>>>>>>>>Push record delete failed.."+JSON.stringify(errorObject));
                });
            } catch (e) {
                console.log("==pushNotificationHandler==>>>>>>>>Push record delete failed.."+JSON.stringify(e));
            }
        } else {
            console.log("==pushNotificationHandler==>>>>>>>>JSONStore is not initialized. Initializing now..");
            //self.initPushCollection();
        }
    }
    self.removeUserNotification = function(id){
        if($rootScope.pushInitSuccess){
            var query = {_id: id};
            var options = {exact: true};
            try {
                MBaaS.getJSONStore().get(self.pushCollectionName).remove(query, options).then(function (res) {
                    console.log("==pushNotificationHandler==>>>>>>>>Push record deleted..");
                }).fail(function (errorObject) {
                    console.log("==pushNotificationHandler==>>>>>>>>Push record delete failed.."+JSON.stringify(errorObject));
                });
            } catch (e) {
                console.log("==pushNotificationHandler==>>>>>>>>Push record delete failed.."+JSON.stringify(e));
            }
        } else {
            console.log("==pushNotificationHandler==>>>>>>>>JSONStore is not initialized. Initializing now..");
            //self.initPushCollection();
        }
    }

	self.removeAllNotification=function(list,userId,callback){
        if($rootScope.pushInitSuccess){
            if(list){
                var options = {
                    markDirty: true
                };

                for(var i=0;i<list.length;i++){
                    if((list[i].json.userId === userId)){
                        //remove the notification here
                        self.removeUserNotification(list[i]._id);
                    }
                    else if(list[i].json.userId === '__ALL__') {
                        list[i].json.deleteFlag.push(userId);
                        console.log("==pushNotificationHandler==>>>>>>>>Push record updated..");
                        MBaaS.getJSONStore().get(self.pushCollectionName).replace(list[i],options)
                        .then(function(numberOfDocumentsReplaced){
                                console.log("==pushNotificationHandler==>>>>>>>>Records Updated is"+numberOfDocumentsReplaced);
                        },function(error){
                                console.log("==pushNotificationHandler==>>>>>>>>Error in replace"+JSON.stringify(error));
                        })
                        .fail(function(errorObject){
                                console.log("==pushNotificationHandler==>>>>>>>>failed updating JSONStore"+JSON.stringify(errorObject));
                        });
                    }
                }
                rootScope.unreadCount = 0;
                //localStorage.UnreadNotifications = rootScope.unreadCount;
                rootScope.$apply();

                if(callback)
                    callback();
            }
        } else {
            console.log("==pushNotificationHandler==>>>>>>>>JSONStore is not initialized. Initializing now..");
            //self.initPushCollection();
            //$rootScope.pushInitSuccess = true;
        }
    };
};