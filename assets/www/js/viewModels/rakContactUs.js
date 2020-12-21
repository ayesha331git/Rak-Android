App.viewModels.rakContactUs=function(rootScope, UIControlsService){
	
	var self = this;
	

	
	 self.contact={
	    		phone1 :"",
	    		phone2:"",
	    		rakDirect:"",
	    		amalDirect:"",
	    			nameRm:"",
		    		phoneRm:"",
		    		mailRm:"",
		    		nameBud:"",
		    		phoneBud:"",
		    		mailBud:"",
		    		subject:[],
		    		selectedSubject:"",
		    		wsMailContent:"",
		    		wsFromMailID:"",
		    		wsCallBackDate:"",
		    		wsPreferredTime:"",
		    		temp:[],
		    		mailStatus:"",
		    		isPremium:"",
		    		corpSubSegment:"",
		    		popUpFlag:false
		    		
		    		
	    };
		
		self.initContactUs = function(responsesList)
		{
			self.contact.phone1=responsesList[0].RAKCONTACTNO1;
			self.contact.phone2=responsesList[0].RAKCONTACTNO2;
			self.contact.phone3=responsesList[0].RAKCONTACTNO3;
			self.contact.rakDirect=responsesList[0].RAK_DIRECT;
			self.contact.amalDirect=responsesList[0].AMAL_RAK_DIRECT;
			self.contact.nameRm=responsesList[0].nameRm;
			self.contact.phoneRm=responsesList[0].phoneRm;
			self.contact.mailRm=responsesList[0].mailRm;
			self.contact.nameBud=responsesList[0].nameBud;
			self.contact.phoneBud=responsesList[0].phoneBud;
			self.contact.mailBud=responsesList[0].mailBud;
			self.contact.isPremium=responsesList[0].isPremium;
			self.contact.corpSubSegment=responsesList[0].corpSubSegment;
		};
		
		self.subjectList =function(response)
		{
			self.contact.subject=response[0].rakWriteToUsSubject;
		
		};
		self.clear=function(){
			
			self.contact.wsMailContent="";
			self.contact.wsFromMailID="";
			self.contact.wsCallBackDate="";
			self.contact.wsPreferredTime="";
				
		};
		self.timevalidate=function(response){
			
			self.contact.temp = response.split(":").length;
			
			if(temp.length == 2) {
			
				
			}
			
			
		};
	self.popUp=function(response){
			
		if (response[0].hasOwnProperty('mailStatus')){
			if(null != response[0].mailStatus){
			self.contact.mailStatus = response[0].mailStatus;
		}
			self.contact.popUpFlag=true;
			
			
		}
		//self.contact.mailStatus = response[0].mailStatus;
		};
		
};