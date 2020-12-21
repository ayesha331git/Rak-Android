App.viewModels.home=function(isStub,Logger){

	var self=this;
	//define all your variables this scope
	self.atmBranchDetails=null;
	self.branchDetails;
	self.atmBranchList;
	self.mode=isStub; // for stub its true
	/**
	 *define all your functions this scope.
	 * @constructor
	 */
	self.getLoginEventForAppMode=function(){
		return self.mode ? 'onStubLoginClick' :'onLoginClick'; 
	};
	self.getLoginEventForAppModeOnLoginLoad=function(){
		return self.mode ? 'onStubLoginLoad' :'onLoginLoad'; 
	};
	/**
	* Initialize responseLocator model
	* @constructor
	*/
	
	//modified for rak customization
	self.responseLocator=function(responseList){
		if(responseList[0].data){
			self.atmBranchDetails=responseList[0].data;
		
		}
		else{
			self.atmBranchDetails=[];
		}
	};
	self.locateUs = {
			
			branchName:"",
			Monday:"",
			Tuesday:"",
			Wednesday:"",
			Thursday:"",
			Friday:"",
			Saturday:"",
			Sunday:"",
			todaysTimings:"",
			startTime:"",
			endTime:"",
			ContactNumber:"",
			Email:"",
			image:"",
			iconClass:"",
		getBranchDetails:function(responseList){
			if(!responseList[0].hasOwnProperty('errorMessage')){
				self.locateUs.branchName = responseList[0].BranchName;
				self.locateUs.Monday = responseList[0].MonOT;
				self.locateUs.Tuesday = responseList[0].TueOT;
				self.locateUs.Wednesday = responseList[0].WedOT;
				self.locateUs.Thursday = responseList[0].ThuOT;
				self.locateUs.Friday = responseList[0].FriOT;
				self.locateUs.Saturday = responseList[0].SatOT;
				self.locateUs.Sunday = responseList[0].SunOT;
				self.locateUs.todaysTimings = responseList[0].todaysTimings;
				self.locateUs.startTime = responseList[0].startTime;
				self.locateUs.endTime = responseList[0].endTime;
				self.locateUs.ContactNumber = responseList[0].ContactNumber;
				self.locateUs.Email = responseList[0].Email;
			}
		}
		
		
	};
	 /* for branch details popover */
    
    
    self.handlePullDown=function(elem){
          var pullDwnELem = jQuery(elem.target);
          jQuery('.PullDownMenu').slideUp();
          if(pullDwnELem.hasClass("pullOpen")){
                pullDwnELem.removeClass("pullOpen");
                jQuery(".view-branch").removeClass("pullOpen");
          }else {
                jQuery(".view-branch").removeClass("pullOpen");
                pullDwnELem.addClass("pullOpen");
                pullDwnELem.siblings('ul').slideDown();
          }
          
    };
    
    //modified for rak customization
    self.getIconImage=function(marker,type_id,selectedLocationId,currentLoopId){
    	
    /*	if(!(selectedLocationId == currentLoopId)){
    		self.locateUs.image = 'images/gray.png';
    	}
    	else{*/
    	 /*if(selectedLocationId == currentLoopId){
     		self.locateUs.image = 'images/blue.png';
     	}*/
    
    		if(marker == 'A'  && type_id!='EDM'){
    			self.locateUs.image = "images/red.png";
    		}
    		else if(marker == 'B'){
    			self.locateUs.image = 'images/grey.png';
    		}
    		
    		else if(marker == 'A' && type_id=='EDM'){
    			self.locateUs.image = 'images/green.png';
    		}
    	 
    /*	}*/
    	return self.locateUs.image;
		
	};
};