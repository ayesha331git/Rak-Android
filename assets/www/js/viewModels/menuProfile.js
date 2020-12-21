App.viewModels.menuProfile=function(rootScope, Logger){
	var self=this;
	self.menulistnotInitialized=true,
	
	self.menuItems={
			menuList:[],
			menuKeyList:[],
			menuMasterAccessList:[],
			menuUserAccessList:[],
			
			
	
			processInit : function(responseList){
				
				Logger.info("Process status of menuList response : " + JSON.stringify(responseList));
				self.menuItems.menuKeyList= responseList;
				index=0;
				for (key in self.menuItems.menuKeyList)
				{
					self.menuItems.menuList[index]= responseList[key];
					
					index++;
				}
				setTimeout(0.5);
				self.menuItems.getMenuDisplayStatusafterlogin();
				self.menulistnotInitialized=false;
			},
			getMenuName: function (item)
			{
				var menutext = item.menutext;
								
				return rootScope.$eval("appLiterals."+ menutext);
				
			},
			getImgProperty : function (item)
			{
							
				
				return item.Properties.imgName + " "+ item.Properties.imgStyle;
			},
			getClickProperties : function(item) {
				 //model reinitialise fix
				//return item.Properties.extraAction;
				return rootScope.$eval(item.Properties.extraAction);

			},
			getMenuDisplayStatusafterlogin : function() {
				
				var loginstatus = rootScope.isUserLoggedIn;
				console.log("getMenuDisplayStatusafterlogin");
			
				if (rootScope.dashboard.menuOptionList != undefined)
					self.menuItems.checkAccessforUser(
									self.menuItems.menuList,
									rootScope.dashboard.menuOptionList,
									loginstatus);
			

			},
			checkAccessforUser : function(
					configMnuList, actualMnuList,
					loginstatus) {

				var menuCount = 0;
				var index = 0;
				accessStatus = false;
				for (var i = 0; i < configMnuList.length; i++) {
					var strTemp = configMnuList[i].menuAccessString
							.toString();
					if (strTemp == 'BASIC') {
						menuCount += 1;
						index += 1;
					} else if (strTemp != 'BASIC'												
							&& actualMnuList
									.indexOf(strTemp) > -1) {
						menuCount += 1;
						index += 1;
					}
					if (menuCount>0){
						self.menuItems.menuUserAccessList[index]=configMnuList[i];
						menuCount=0;
					}

				}
				
			}


	};
		
};