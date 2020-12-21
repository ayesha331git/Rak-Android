App.viewModels.rakLocateUs = function(scope, UIControlsService, Logger,rootScope) {
	
	var self = this;
	
	

	self.RAKLocateUsSearchData = {
		data: [],
		areaList : [],
		emrList : [],
		searchData : [],
		searchedAtmDemList : [],
		searchedAtmList : [],
		searchedDemList : [],
		searchedBranchList : [],
		selectedEmr : "",
		selectedEmrDesc : "",
		selectedArea : "",
		selectedAreaDesc : "",
		emrSelectedFlag:false,
		areaSelectedFlag:false,
		searchBtnClicked:false,
		loggedInFlag:false,
		eventExecutedName:"",
		isFromSearchList:false,
		branchFlag1:false,
		searchFlag:'A'
		
	};

	self.getmapClickedEvent=function(){
		if(self.mapClicked){
			MapService.reloadMap();
		}

		
		self.mapClicked=true;
		
	};
	self.initSearchDetais =function(responsesList){
		if (!responsesList[0].hasOwnProperty('errorMessage')) {
			self.jsessionid=responsesList[0].sessKey;
			if (responsesList[0].hasOwnProperty('data')  ){
				self.RAKLocateUsSearchData.data = responsesList[0].data;
			}
			
			
			self.searchATMBranch();
		}
	};
	self.initRAKLocateUsSearchData = function(responsesList) {		
		//if(!responsesList ==null){
			if (!responsesList[0].hasOwnProperty('errorMessage')) {
				self.jsessionid=responsesList[0].sessKey;
				if (responsesList[0].hasOwnProperty('data')){
					self.RAKLocateUsSearchData.data = responsesList[0].data;
				}
				if (responsesList[0].hasOwnProperty('emiratesList')){
					self.RAKLocateUsSearchData.emrList = responsesList[0].emiratesList;
				}
				if (responsesList[0].hasOwnProperty('areaList')){
					self.RAKLocateUsSearchData.areaList = responsesList[0].areaList;
				}
				if (responsesList[0].hasOwnProperty('selectedEmrDesc')){
					self.RAKLocateUsSearchData.selectedEmrDesc = responsesList[0].selectedEmrDesc;
				}
				
				self.searchATMBranch();
			}
		//}
	};
	
	self.resetRAKLocateUsSearchData = function(){		
		self.RAKLocateUsSearchData.selectedEmr = "";
		self.RAKLocateUsSearchData.selectedArea = "";
		self.RAKLocateUsSearchData.emrSelectedFlag = false;	
		self.RAKLocateUsSearchData.searchBtnClicked = false;
		self.RAKLocateUsSearchData.searchedAtmDemList = [];
		self.RAKLocateUsSearchData.searchedAtmList = [];
		self.RAKLocateUsSearchData.searchedDemList = [];
		self.RAKLocateUsSearchData.searchedBranchList = [];
		self.RAKLocateUsSearchData.data = [];
		self.markerFlag=false;
		self.RAKLocateUsSearchData.branchFlag1=false;
		//self.RAKLocateUsSearchData.searchFlag='A';
	};
	
	self.resetRAKLocateUsSearchInput = function(){		
		self.RAKLocateUsSearchData.selectedEmr = "";
		self.RAKLocateUsSearchData.selectedArea = "";
	}
	
	self.resetRAKLocateUsSearchDataLists = function(){			
		self.RAKLocateUsSearchData.searchedAtmDemList = [];
		self.RAKLocateUsSearchData.searchedAtmList = [];
		self.RAKLocateUsSearchData.searchedDemList = [];
		self.RAKLocateUsSearchData.searchedBranchList = [];
		self.RAKLocateUsSearchData.data = [];
	};
/*	self.getImageValue=function(){
		self.dataDetails=responseList[0].data;
		for(var temp in dataDetails ){
			if(dataDetails[temp].marker=='A'){
				
			}
		}
	};
*/	
	self.setEventForSearchATMBranch = function(){
		if(self.RAKLocateUsSearchData.loggedInFlag){
			self.RAKLocateUsSearchData.eventExecutedName = "SearchByEmrAndAreaPostLogin";
		} 
		else{
			self.RAKLocateUsSearchData.eventExecutedName = "SearchByEmrAndArea";
		}
	}
	
	
	self.searchATMBranch = function(){
		self.RAKLocateUsSearchData.searchData = [];	
		self.RAKLocateUsSearchData.searchedAtmList = [];
		self.RAKLocateUsSearchData.searchedBranchList = [];
		
		var index=0;
		var indexAtmDem = 0;
		var indexDem = 0;
		var indexAtm=0;
		var indexBranch=0;
		for(var k=0;k<self.RAKLocateUsSearchData.data.length;k++)
		{
			//if(self.RAKLocateUsSearchData.data[k].state==self.RAKLocateUsSearchData.selectedEmrDesc && self.RAKLocateUsSearchData.data[k].area==self.RAKLocateUsSearchData.selectedArea){
				if(self.RAKLocateUsSearchData.data[k].marker =='A'){
					self.RAKLocateUsSearchData.searchedAtmDemList[indexAtmDem]=self.RAKLocateUsSearchData.data[k];
					indexAtmDem++;
					if(self.RAKLocateUsSearchData.data[k].type_id == "ATM"){
						self.RAKLocateUsSearchData.searchedAtmList[indexAtm]=self.RAKLocateUsSearchData.data[k];
						indexAtm++;
					}
					
				}
				if(self.RAKLocateUsSearchData.data[k].marker =='B'){
					self.RAKLocateUsSearchData.searchedBranchList[indexBranch]=self.RAKLocateUsSearchData.data[k];
					indexBranch++;
				}	
				
				if(((self.RAKLocateUsSearchData.data[k].marker =='A')||(self.RAKLocateUsSearchData.data[k].marker =='B') )&& self.RAKLocateUsSearchData.data[k].type_id == "EDM"){
					self.RAKLocateUsSearchData.searchedDemList[indexDem]=self.RAKLocateUsSearchData.data[k];
					indexDem++;
				}
				self.RAKLocateUsSearchData.searchData[index]=self.RAKLocateUsSearchData.data[k];
				index++;
			//}				
		}		
	};	
	
	self.getCurrentLocation=function(event){
		rootScope.MF.getCurrentLocation();
		setTimeout(function(){scope.setGlobalEvent(event)},50);
	}
	
};