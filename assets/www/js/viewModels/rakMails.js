App.viewModels.rakMails=function(rootScope,Logger){
	var self=this;
	m=self;
	self.broadcastCount="";
	self.isStatusError=false;
	self.successMessage="";
	self.fromInbox=false;
	self.isInboxEmpty=false;
	self.isMailDeleted=false;
	self.isDeleteClicked=false;
	//self.showInboxInMenu=false;
	self.selectedMailId="";
	self.mailFromId="";
	self.mailToId="";
	self.mailBody="";
	self.mailDate="";
	self.mailSubject="";
	self.detailType=""; //Broadcast,Inbox,Sent
	self.subjectList=[]; // CHANGES FOR DRAFT MODULE 
	self.mailSubjectSelected="";
	self.selectedFolderId='';
    // CHANGES FOR HEADER TAB FOR MAILS MODULE START
	self.inboxTab=true;
	self.sentMailsTab=false;
	self.draftsTab=false;
	self.trashTab=false;
	self.inboxComposeFlag=false;
	self.inboxCompose="";
	// CHANGES FOR HEADER TAB FOR MAILS MODULE END
	self.composeTab=true;
	self.replyTab=false;
	self.forwardTab=false;
	// CHANGES FOR BRAODCAST RECIEVER START
	self.fromBroadcast=false;
	self.fromSentMail=false;
	// CHANGES FOR BRAODCAST RECIEVER END
	self.mailOptions=[];
	self.selectedMailType = "";
	self.selectedMail = "";
	
	self.selectBtn=function (index) {
	   
		mail.mBoxId= index;
	};
	
	self.getMailEvent=function () {
		var type = self.selectedMailType;
		var eventName;
		if(type == 'IB' ){
			self.inbox.clear();
			eventName = "onRakMailClick";
		}
		else if(type == 'CM' ){
			self.compose.clear();
			self.fromInbox=false;
			self.inboxComposeFlag=true;
			eventName = 'onRakComposeClick';
		}		
		else if(type == 'ML' ){
			self.clearTab();
			eventName = "onRakSentMailsClick";
		}		
		else if(type == 'DR' ){
			self.draft.clear();
			eventName = "onRakDraftClick";
		}
		else if(type == 'TR' ){			
			eventName = "onRakTrashClick";
		}
		else if(type == 'PF' ){
			self.personal.clear();
			eventName = "onRakPersonalClick";
		}
		return eventName;
		
	};
	
	// CHANGES FOR HEADER TAB FOR MAILS MODULE START
	self.clearTab = function() {
		self.inboxTab=false;
		self.sentMailsTab=false;
		self.draftsTab=false;
		self.trashTab=false;
	};
	// CHANGES FOR HEADER TAB FOR MAILS MODULE END
	
	
	//CHANGES DONE FOR SENDING DATE AS DAY,MONTH AND YEAR START
	self.common={

            initDate:new Date(),
		    date:null,
			month:null,
			year:null,
			fromAuthPage:false,
			displayDate:new Date(),
			searchToDate:null,
			searchFromDate:null
       };
	
	self.populateCurrentDateDetails = function(){
		if(self.common.displayDate !="" && self.common.displayDate !=null){
			var date=self.common.displayDate.getDate().toString();
			var currMonth = self.common.displayDate.getMonth() + 1;
			var month=currMonth.toString();
			var year=self.common.displayDate.getFullYear().toString();
			self.common.date =date;
			self.common.month=month;
			self.common.year=year;
		}
	};
	//CHANGES DONE FOR SENDING DATE AS DAY,MONTH AND YEAR END
	

	self.setBackPageName = function(pageName){
		var eventName;
		if(pageName == 'Sent' ){
			eventName = "MailsSentList";
		}
		if(pageName == 'Trash' ){
			eventName = "MailsTrashList";
		}
		/*if(pageName == 'Broadcast' ){
			eventName = "MailsBroadcastList";
		}*/
		//RAK:1:added for draft and personal folder
		if(pageName == 'Draft' ){
			eventName = "MailsDraftList";
		}
		
		if(pageName == 'Personal' ){
			eventName = "MailsPersonalList";
		}
		return eventName;
	};
	
	self.setDeletePageName = function(pageName){
		var deleteEventName;
		
		if(pageName == 'Inbox' ){
			deleteEventName = "InboxMailDelete";
		}
		
		
		if(pageName == 'Sent' ){
			deleteEventName = "SentMailDelete";
		}
		if(pageName == 'Trash' ){
			deleteEventName = "TrashMailDelete";
		}
		//RAK:1:added for Personal folder delete event
		if(pageName == 'Personal' ){
			deleteEventName = "PersonalMailDelete";
		}
		
		
		//delete option is 
		
		return deleteEventName;
	};
	
	self.initDetailsPage=function(responseList){
		if(self.detailType == 'Inbox'){
			
			if(self.selectedMail.folderIDS=='AL'){
				self.mailBody = responseList[0].mailSubject.replace(/EOM/g, "\r\n");
				self.mailBody=self.mailBody.replace(/&lt;br &gt;/g, "\r\n");
				self.mailSubject= rootScope.appLiterals.APP.RAK_MAILS.RAKMESSAGECENTRE_PAGE.BROADCAST;
			}
			else{			
				self.mailSubject=responseList[0].mailSubject;			
				self.mailBody=responseList[0].mailBody.replace(/EOM/g, "\r\n");
				self.mailBody=self.mailBody.replace(/&lt;br &gt;/g, "\r\n");			
			}
			
			//self.mailFromId=responseList[0].fromId;
			self.mailFromId= rootScope.appLiterals.APP.RAK_MAILS.RAKMESSAGECENTRE_PAGE.RAKRM;
			self.mailToId=responseList[0].toId;
			self.mailDate=responseList[0].mailDate;
			self.selectedFolderId="IB";

		}
		if(self.detailType == 'Broadcast'){
			self.mailFromId=responseList[0].fromId;
			self.mailSubject=responseList[0].mailSubject;
			self.mailDate=responseList[0].mailDate;
			//self.mailBody=responseList[0].mailSubject;
			self.mailBody=responseList[0].mailBody.replace(/EOM/g, "\r\n");
			self.mailBody=self.mailBody.replace(/&lt;br &gt;/g, "\r\n");
			self.selectedFolderId="AL";
		}
		if(self.detailType == 'Sent'){
			//self.mailToId=responseList[0].toId;
			self.mailToId=rootScope.appLiterals.APP.RAK_MAILS.RAKMESSAGECENTRE_PAGE.RAKRM
			// CHANGES SETTING PROPER FROM FOR INBOX DETAILS COMING FROM SENT PAGE START
			self.mailFromId=responseList[0].fromId;
			// CHANGES SETTING PROPER FROM FOR INBOX DETAILS COMING FROM SENT PAGE END
			self.mailSubject=responseList[0].mailSubject;
			self.mailDate=responseList[0].mailDate;
			self.mailBody=responseList[0].mailBody.replace(/EOM/g, "\r\n");
			
			//need to check for internal ticket fixing
			/*self.mailBody=self.mailBody.replace(/</, "/&lt;");
			self.mailBody=self.mailBody.replace(/>/, "/&gt;");*/
			self.mailBody=self.mailBody.replace(/&lt;br &gt;/g, "\r\n");
			self.selectedFolderId="ML";
		}
		
	/*	added by : Modified BY DEV FOR MAILS DRAFT MODULE START*/
		if(self.detailType == 'Draft'){
			self.subjectList=responseList[0].SubjectList;
			self.mailFromId=responseList[0].fromId;
			self.mailSubject=responseList[0].mailSubject;
			self.mailToId=responseList[0].toID;
			self.mailDate=responseList[0].mailDate;
			self.mailBody=responseList[0].mailBody.replace(/EOM/g, "\r\n");
			self.mailBody=self.mailBody.replace(/<br>/g, "\r\n");
			self.mailBody=self.mailBody.replace(/&lt;br &gt;/g, "\r\n");
			self.mailBody=self.mailBody.replace(/</g, "&lt;");
			self.mailBody=self.mailBody.replace(/>/g, "&gt;");
	// CHANGES FOR MAIL DRAFT MODULE END
			//self.selectedFolderId="DL";
			
			//CHANGES DONE AS FIX OF PROUAT-2315 START
			self.mailSubjectSelected="";
			for (var x = 0; x < self.subjectList.length; x++) {
				if (self.subjectList[x].code == self.mailSubject) {
					self.mailSubjectSelected = self.subjectList[x].description;
					break;
				}
			}
			//CHANGES DONE AS FIX OF PROUAT-2315 END
			
			self.selectedFolderId="DR";
					
		}
		if(self.detailType == 'Trash'){
			self.mailFromId=responseList[0].fromIdDisplayView;
			self.mailToId=responseList[0].toIdDisplayView;
			self.mailSubject=responseList[0].mailSubject;
			self.mailDate=responseList[0].mailDate;
			self.mailBody=responseList[0].mailBody.replace(/EOM/g, "\r\n");
			self.mailBody=self.mailBody.replace(/&lt;br &gt;/g, "\r\n");
			self.selectedFolderId="TR";
			
			if(responseList[0].FROM == responseList[0].TO){
				self.trash.inboxToTrash = true;
				self.mailToId = responseList[0].userId;
			}
			else{
				self.mailFromId = responseList[0].userId;
			}
		}
		if(self.detailType == 'Personal'){
			self.mailFromId=responseList[0].fromId;
			self.mailToId=responseList[0].toId;
			self.mailSubject=responseList[0].mailSubject;
			self.mailDate=responseList[0].mailDate;
			self.mailBody=responseList[0].mailBody.replace(/EOM/g, "\r\n");
			self.mailBody=self.mailBody.replace(/&lt;br &gt;/g, "\r\n");
			// CHANGES FOR PERSONAL FOLDER START
			//self.selectedFolderId="PL";
			self.selectedFolderId="PF";
		}
	};
	
	// CHANGES CLEARING DATA ON BACK OR FROM INITIAL PAGE START
	self.clearMailData=function(){
		self.mailFromId="";
		self.mailSubject="";
		self.mailToId="";
		self.mailDate="";
		self.mailBody="";
		self.mailTextNew="";
		self.selectedMail="";
	};
	// CHANGES CLEARING DATA ON BACK OR FROM INITIAL PAGE END
	
	//RAK:1: added for Draft 
	self.draft={
			count:"",
			draftList:[],
			
			//isSubjectEmpty:false,
			isSendClicked:false,
			isCancelClicked:false,
			isMailSent:false,
			isSaved:false,
			
			initDraftPage:function(responseList){
				// CHANGES FOR MAILS DRAFT MODULE START
				//self.selectedFolderId="DL";
				self.selectedFolderId="DR";
				if(responseList[0].hasOwnProperty('noMailsMsg')){
					self.isDraftEmpty=true;
					self.successMessage=responseList[0].noMailsMsg;
				}
				if(responseList[0].hasOwnProperty('deleteMsg')){
					self.successMessage=responseList[0].deleteMsg;
				}
				// CHANGES FOR DRAFT MODULE START
				else if(responseList[0].hasOwnProperty('draftMailList')){
					self.draft.draftList=responseList[0].draftMailList;
					// CHANGES FOR DRAFT TAB FLAG START
					self.drafts=true;
					// CHANGES FOR DRAFT TAB FLAG END
				}
			},
			
			//CHNAGES DONE AS FIX OF PROUAT-2315 START
			/*getSelectedSubject:function(){
				if(self.draft.draftList[index].mailSubject!='')
					self.mailSubjectSelected=self.mailSubject;
				else
					self.mailSubjectSelected='';	
			},*/
			//CHANGES DONE AS FIX OF PROUAT-2315 END
			
			initAfterSend:function(responseList){
				if(responseList[0].hasOwnProperty('errorMessage')){
					self.isStatusError=true;
					self.successMessage=responseList[0].errorMessage;
				}
				else{
					self.isStatusError=false;
					self.successMessage=responseList[0].successMsg;
				}
				self.draft.isMailSent=true;
			},
			
			initAfterSave:function(responseList){
				if(responseList[0].hasOwnProperty('errorMessage')){
					self.isStatusError=true;
					self.successMessage=responseList[0].errorMessage;
				}
				else{
					self.isStatusError=false;
					self.successMessage=responseList[0].successMsg;
				}
				self.draft.isSaved=true;
			},
		
			getSendEvent:function(){
				
				
					self.draft.isSendClicked=true;
					// CHANGES COMMENTING BELOW EVENT NOT DEFINED IN BASE WORKFLOW ALSO START
					/*if(self.fromInbox)
						return 'onRakReplyDraftSendClick';
					else*/
					// CHANGES COMMENTING BELOW EVENT NOT DEFINED IN BASE WORKFLOW ALSO END
						return 'onRakSendDraftClick';
				
			},
			getSendOKEvent:function(){
				if(self.isStatusError)
					return 'onRakDraftErrorClick';
				else
					return 'onRakSendDraftOKClick';	
			},
			clear:function(){
				self.draft.count="";
				self.draft.draftList=[];
				self.draft.isDraftEmpty=false;
			}
	};
	// DRAFT ENDED////
	
	

	
	
	///RAK  ADDED FOR INBOX///
	self.inbox={
			mailCount:"",
			inboxList:[],
			broadcastList:[],
			folderName:"",
			broadcastFolder:"",
			
			initInboxPage:function(responseList){
				self.selectedFolderId="IB";
				self.fromSentMail=false;
				if(responseList[0].hasOwnProperty('mailOptions')){
					self.mailOptions = responseList[0].mailOptions;	
					self.selectedMailType = "IB";
				}
				
				if(responseList[0].hasOwnProperty('noMailsMsg')){
					// CHANGES FOR TRASH EMPTY
					if(self.trash.isTrashEmpty==true)
					{
					  self.successMessage=responseList[0].noMailsMsg;
					}
					else
					{
					self.isInboxEmpty=true;
					self.successMessage=responseList[0].noMailsMsg;
					}
				}
				if(responseList[0].hasOwnProperty('deleteMsg')){
					self.successMessage=responseList[0].deleteMsg;
				}
				else{
					
					if(responseList[0].hasOwnProperty('inboxMailList')){
					//RAK CHANGES FOR MAIL COUNT START
						if (responseList[0].unreadMailCount == "0"){
							self.inbox.mailCount="";
						}
						else{
							self.inbox.mailCount=responseList[0].unreadMailCount;
						}
				    
				    rootScope.rakHome.fromHome=false;
				    //RAK CHANGES FOR MAIL COUNT END
					self.inbox.inboxList=responseList[0].inboxMailList;
					self.inbox.searchList=responseList[0].inboxMailList;
					}
					
					/*if(responseList[1].hasOwnProperty('broadcastList')){
						// CHANGES FOR MAIL COUNT START
						if (responseList[1].unreadMailCount == "0"){
					     self.inbox.mailCount="";
						}
						else{
							self.inbox.mailCount=responseList[1].unreadMailCount;
						}
					    // CHANGES FOR MAIL COUNT END
						self.inbox.broadcastList=responseList[1].broadcastList;
						}*/
					
					self.isChecked=true;
					}
				
			},
			initAfterDelete:function(responseList){
				self.fromSentMail=false;
				if(responseList[0].hasOwnProperty('errorMessage')){
					self.isStatusError=true;
					self.successMessage=responseList[0].errorMessage;
				}
				else{
					self.successMessage=responseList[0].deleteMsg;
				}
				self.inbox.inboxList=responseList[0].inboxMailList;
				//self.inbox.broadcastList=responseList[1].broadcastList;
				self.isMailDeleted=true;
			},
			clear:function(){
				self.inbox.mailCount="";
				self.inbox.inboxList=[];
				self.inbox.broadcastList=[];
				self.inbox.folderName="";
				self.inbox.broadcastFolder="";
			}
	};
	
	
	

	self.sent={
			list:[],
			isSentEmpty:false,
			initListPage:function(responseList){
				self.selectedFolderId="ML";
				if(responseList[0].hasOwnProperty('noMailsMsg')){
					self.sent.isSentEmpty=true;
					self.successMessage=responseList[0].noMailsMsg;
				}
				else if(responseList[0].hasOwnProperty('inboxMailList')){
					self.sent.isSentEmpty=false;
					self.sent.list=responseList[0].inboxMailList;
				}
				else if(responseList[0].hasOwnProperty('sentList')){
					self.sent.isSentEmpty=false;
					self.sent.list=responseList[0].sentList;
					}
			},
			initAfterDelete:function(responseList){
				if(responseList[0].hasOwnProperty('errorMessage')){
					self.isStatusError=true;
					self.successMessage=responseList[0].errorMessage;
				}
				else{
					self.successMessage=responseList[0].deleteMsg;
				}
				self.inbox.inboxList=responseList[1].inboxMailList;
			//	self.inbox.broadcastList=responseList[1].broadcastList;
				
				self.isMailDeleted=true;
			}
	};
	
	/// ENDED FOR INBOX//
	//RAK:1: added for personal folder
	
	// CHANGES FOR PERSONAL FOLDER START
	self.personal={
			count:"",
			personalList:[],
			personalMailListItems:[],
			
			initPersonalPage:function(responseList){
				// CHANGES FOR PERSONAL FOLDER START
				//self.selectedFolderId="PL";
				self.selectedFolderId="PF";
				if(responseList[0].hasOwnProperty('noMailsMsg')){
					self.isPersonalEmpty=true;
					self.successMessage=responseList[0].noMailsMsg;
				}
				else if(responseList[0].hasOwnProperty('deleteMsg')){
					self.successMessage=responseList[0].deleteMsg;
				}
				else if(responseList[0].hasOwnProperty('personalMailList'))
				{
					self.personal.personalList=responseList[0].personalMailList;
				}
				else if(responseList[0].hasOwnProperty('personalMailListItems'))
				{
					self.personal.personalMailListItems=responseList[0].personalMailListItems;
				}
			},
			initAfterDelete:function(responseList){
				if(responseList[0].hasOwnProperty('errorMessage')){
					self.isStatusError=true;
					self.successMessage=responseList[0].errorMessage;
				}
				else{
					self.successMessage=responseList[0].deleteMsg;
				}
				self.personal.personalList=responseList[1].personalMailList;
				self.isMailDeleted=true;
			},
			clear:function(){
				self.personal.count="";
				self.personal.personalList=[];
				self.personal.personalMailListItems=[];
			}
	};
	
	///ADDED FOR PERSONAL FOLDER: CHNAGES FOR MAILS MODULE START
	self.trash={
			list:[],
			isTrashEmpty:false,
			inboxToTrash:false,
			
			initListPage:function(responseList){
				self.selectedFolderId="TR";
				if(responseList[0].hasOwnProperty('noMailsMsg')){
					self.trash.isTrashEmpty=true;
					self.successMessage=responseList[0].noMailsMsg;
				}
				else if(responseList[0].hasOwnProperty('trashList')){
					self.trash.isTrashEmpty=false;
					self.trash.list=responseList[0].trashList;
				}
				else{
				     self.trash.list=responseList[1].trashList;
			      }
			},
			
			// CHANGES SENDING EVENT NAME DYNAMICALLY ACCORDING TO MAIL DELETION IN PARTICULAR TAB START
			getEventNameAfterDelete:function(responseList){
				if(self.inboxTab){
					return 'onRakFromInboxTrashMailDelete';
				  }
				else if(self.sentMailsTab){
					return 'onRakFromSentTrashMailDelete';
				  }
				else if(self.trashTab){
					return 'onRakFromTrashTrashMailDelete';
				  }
			},
			// CHANGES SENDING EVENT NAME DYNAMICALLY ACCORDING TO MAIL DELETION IN PARTICULAR TAB END
			
			initAfterDelete:function(responseList){
				if(responseList[0].hasOwnProperty('errorMessage')){
					self.isStatusError=true;
					self.successMessage=responseList[0].errorMessage;
				  }
				else{
					if(responseList[0].hasOwnProperty('deleteMsg'))
					{
					self.successMessage=responseList[0].deleteMsg;
					self.isMailDeleted=true;
					}
					else if(responseList[0].hasOwnProperty('noMailsMsg'))
					{
					self.successMessage=responseList[0].noMailsMsg;
					self.trash.isTrashEmpty=true;
					}
					// CHANGES AFTER DELETE START
					self.trash.list=responseList[1].trashList;
				}
				
				
			//	self.inbox.inboxList=responseList[1].broadcastList;
				// COMMENTED
				//self.isMailDeleted=true;
			},
			prepareForDeleteAll:function(){
				for(var index=0;index<self.trash.list.length;index++){
					if(index===0)
						self.selectedMailId += self.trash.list[index].mboxId;
					else
						self.selectedMailId += "," + self.trash.list[index].mboxId;
				}
			}
	};
	
	// ADDED FOR COMPOSE//
	
	self.compose={
			toList:[],
			date:"",
			subjectList:[],
			mailText:"",
			mailTextNew:"",
			emailfromID:"",
			//mailHistory:"",
			toId:null,
			subject:"",
			isSubjectEmpty:false,
			isSendClicked:false,
			isCancelClicked:false,
			isMailSent:false,
			fromUser:"",     // CHANGES FOR FROM USER IN COMPOSE MAIL START
			
			//checked:true,
			//added for personal sent folders
			initComposePage:function(responseList){
				// CHANGES FOR INBOX REPLY HISTORY REGAIN START
				var history="";
				if((self.fromInbox && !self.compose.isCancelClicked)||
						(self.selectedFolderId=="ML")||
						(self.selectedFolderId=="TR")||
						(self.selectedFolderId=="IB")||
						(self.selectedFolderId=="PL")){
					
					setTimeout(function(){jQuery('textarea').focus()},1000)
					
					self.compose.toList=responseList[0].toList;
					self.compose.toId=responseList[0].fromId;
					self.compose.date=responseList[0].mailDate;
					self.compose.subjectList=responseList[0].subjectList;
					// CHANGES SETTING PROPER SUBJECT START
					self.compose.subject=responseList[0].mailSubject;
					// CHANGES SETTING PROPER SUBJECT END
					
					if(self.detailType=='Sent'||self.detailType=='Personal')
						{
						self.compose.subject=responseList[0].mailSubjectRe;
						}
					
					 // CHANGES ONLY SHOWING WHEN CLICK ON REPLY BUTTON PREPOPULATED HISTORY IN MAILBOX START
					if(self.fromInbox  && self.detailType=='Inbox')
				     {
					 history = '\r' +  '\r' + 
									'From: ' + rootScope.appLiterals.APP.RAK_MAILS.RAKMESSAGECENTRE_PAGE.RAKRM + 'EOM' + 
									'Sent: ' + responseList[0].mailDate + 'EOM' + 
									'To: ' + responseList[0].toIdView + 'EOM' +
									'Subject: ' + responseList[0].mailSubject + 'EOM'+ 
									responseList[0].mailBody
									;
					
					 history=history.replace(/EOM/g, "\r\n");
					 history=history.replace(/&lt;br &gt;/g, "\r\n");
					
					 self.compose.mailText= history;
				     }
					
					 if(self.fromSentMail && self.detailType == 'Sent'){
						 history = '\r' +  '\r' + 
							'From: ' + self.mailFromId + 'EOM' + 
							'Sent: ' + responseList[0].mailDate + 'EOM' + 
							'To: ' + self.mailToId + 'EOM' +
							'Subject: ' + responseList[0].mailSubject + 'EOM'+ 
							responseList[0].mailBody
							;
			
						 history=history.replace(/EOM/g, "\r\n");
						 history=history.replace(/&lt;br &gt;/g, "\r\n");
						 self.compose.mailText= history;
					}
					
					
					 if(self.detailType == 'Trash' && !self.trash.inboxToTrash){
						 history = '\r' +  '\r' + 
							'From: ' + self.mailFromId + 'EOM' + 
							'Sent: ' + responseList[0].mailDate + 'EOM' + 
							'To: ' + self.mailToId + 'EOM' +
							'Subject: ' + responseList[0].mailSubject + 'EOM'+ 
							responseList[0].mailBody
							;
			
						 history=history.replace(/EOM/g, "\r\n");
						 history=history.replace(/&lt;br &gt;/g, "\r\n");
			
						 self.compose.mailText= history;
					}
						 if(self.detailType == 'Trash' && self.trash.inboxToTrash){
							 history = '\r' +  '\r' + 
								'From: ' +self.mailFromId + 'EOM' + 
								'Sent: ' + responseList[0].mailDate + 'EOM' + 
								'To: ' + self.mailToId + 'EOM' +
								'Subject: ' + responseList[0].mailSubject + 'EOM'+ 
								responseList[0].mailBody
								;
				
							 history=history.replace(/EOM/g, "\r\n");
							 history=history.replace(/&lt;br &gt;/g, "\r\n");
				
							 self.compose.mailText= history;
						}
					
						self.compose.subject=responseList[0].mailSubject;
						
						
					  self.compose.detailsFrom=responseList[0].fromIdView;
					// CHANHES SETTING FROM USER IN COMPOSE MAIL START
						self.compose.fromUser=responseList[0].fromUserId;
						// CHANHES SETTING FROM USER IN COMPOSE MAIL END
					 WL.Logger.info("Response from mail"+responseList[0].subjectList);
					 WL.Logger.info("Response from mail to list"+responseList[0].toList);
					//self.compose.mailHistory = responseList[0].mailBody;
					 
	
				}
				else{
					//self.compose.toList=responseList[0].toList;
					self.compose.emailfromID=responseList[0].email;
					self.compose.subjectList=responseList[0].subjectList;
	//					/WL.Logger.info("Response from mail"+responseList[0].subjectList);
					 //WL.Logger.info("Response from mail to list"+responseList[0].toList);
					if(!responseList[0].hasOwnProperty('errorMessage')){
						self.compose.date=responseList[0].mailDate;
						// CHANHES SETTING FROM USER IN COMPOSE MAIL START
						self.compose.fromUser=responseList[0].fromUserId;
						// CHANHES SETTING FROM USER IN COMPOSE MAIL END
					}
					self.compose.isCancelClicked = false;
				}
			},
			onClickSend:function(){
				if(self.compose.subject){
					if(self.compose.mailTextNew!='')
					self.compose.mailText = self.compose.mailTextNew+"EOM"+'\r' +  self.compose.mailText;
					self.compose.mailText = self.compose.mailText.replace(/\n/g, "EOM");
					self.compose.isCancelClicked=false;
				}
				
				if(self.detailType == 'Draft'){					
					self.mailBody = self.mailBody.replace(/\n/g, "EOM");
					self.mailBody = self.mailBody.replace(/<br>/g, "EOM");
				}
			},
			initAfterSend:function(responseList){
				if(responseList[0].hasOwnProperty('errorMessage')){
					self.isStatusError=true;
					self.successMessage=responseList[0].errorMessage;
				}
				else{
					self.isStatusError=false;
					self.successMessage=responseList[0].successMsg;
				}
				self.compose.isMailSent=true;
			},
			getSendEvent:function(){
				if(self.compose.subject === ""){
					return 'onRakSubjectEmptySendClick';
				}
				else{
					self.compose.isSendClicked=true;
					if(self.fromInbox)
						return 'onRakReplySendClick';
					else
						{
						// CHANGES CHECKING COMPOSING MAIL FROM INBOX OR REPLYING FROM SENT START
						if(self.inboxComposeFlag)
							{
							self.inboxCompose='Yes';
							}
						else
							{
							self.inboxCompose='No';
							}
						// CHANGES CHECKING COMPOSING MAIL FROM INBOX OR REPLYING FROM SENT END
						return 'onRakSendClick';
						}
						
				}
			},
			getSendOKEvent:function(){
				if(self.isStatusError)
					return 'onRakErrorClick';
				else
					return 'onRakSendOKClick';	
			},
			clear:function(){
				self.compose.toList=[];
				self.compose.date="";
				self.compose.subjectList=[];
				self.compose.mailText="";
				self.compose.mailTextNew="";
				self.compose.toId="";
				self.compose.subject="";
				self.compose.emailfromID="";
				self.compose.isSubjectEmpty=false;
				self.compose.isSendClicked=false;
				self.compose.isStatusError=false;
				self.compose.isCancelClicked=false;
			}
	};
	
	///ENDED FOR COMPOSE MAIL///

	self.clearData=function(){
		self.isStatusError=false;
		self.fromInbox=false;
		self.isInboxEmpty=false;
		self.isMailDeleted=false;
		self.isDeleteClicked=false;
		self.selectedMailId="";
		self.mailFromId="";
		self.mailToId="";
		self.mailBody="";
		self.mailDate="";
		self.mailSubject="";
		self.selectedFolderId="";
		self.mailTextNew="";
	};
	
	self.handlePullDown=function(elem){
		var pullDwnELem = jQuery(elem.target);
		//RAK  CHANGES FOR SIDEVIEW FOR MAILS MODULE START
		if(pullDwnELem.hasClass('rakellipse')){
			pullDwnELem = pullDwnELem.parent();
		}
		//RAK  CHANGES FOR SIDEVIEW FOR MAILS MODULE END
		
		jQuery('.rakPullDownMenu').slideUp();
		//jQuery('.col-sm-11').unbind('click');
		
		if(pullDwnELem.hasClass("pullOpen")){
			pullDwnELem.removeClass("pullOpen");
		}
	    else {
			jQuery(".rakPullDown").removeClass("pullOpen");
			pullDwnELem.addClass("pullOpen");
			pullDwnELem.siblings('ul').slideDown();
			jQuery('.col-sm-11').bind('click',function(){
				jQuery('.rakPullDownMenu').slideUp();
				pullDwnELem.removeClass("pullOpen");
				jQuery('.col-sm-11').unbind('click');
			});
			elem.preventDefault();
			elem.stopImmediatePropagation();
			return false;
		}
		
	};
	
	//RAK ADDED BY  FOR SEARCH MAILS
	self.RakSearchMails = {

			folderId : "",
			subjectList:"",
			selectedSubject:"",
			toDate:"",
			fromDate:"",
			attachment:"",
			pfmFolderId:"",
		 searchFromDate_year:"",
   		 searchFromDate_month:"",
   		 searchFromDate_day:"",
   		 searchToDate_year:"",
   		 searchToDate_month:"",
   		 searchToDate_day:"",
			isMailsListPresent:false,
			criteriaFlag:false,
			
			fromInboxFlag:false,
			fromSentFlag:false,
			fromDraftFlag:false,
			fromTrashFlag:false,
			

			rakMailFolderIdInbox : function() {

				self.RakSearchMails.folderId = "IB";
				self.RakSearchMails.pfmFolderId = "";
			},
			rakMailFolderIdSent : function() {

				self.RakSearchMails.folderId = "ML";
				self.RakSearchMails.pfmFolderId = "";
			},
			rakMailFolderIdTrash : function() {
				self.RakSearchMails.pfmFolderId = "";
				self.RakSearchMails.folderId = "TR";

			},
			rakMailFolderIdDraft : function() {
				self.RakSearchMails.pfmFolderId = "";
				self.RakSearchMails.folderId = "DR";

			},
			rakMailFolderIdPersonal : function() {

				self.RakSearchMails.folderId = "PF";

			},
		
				
		//CHANGES DONE FOR BACK EVENT FROM PREVIOUS PARTICULAR PAGE START	
			getBackEvent:function()
			{
				    if (self.RakSearchMails.fromInboxFlag)
				    {
				    self.RakSearchMails.fromInboxFlag=false;	
				    return 'onRakMailClick';
				    }
				    
				    else if (self.RakSearchMails.fromSentFlag)
				    {
				    	self.RakSearchMails.fromSentFlag=false;	
					    return 'onRakSentMailsClick';
				    }
				    
				    else if (self.RakSearchMails.fromDraftFlag)
				    {
				    	 self.RakSearchMails.fromDraftFlag=false;	
				    	 return 'onRakDraftClick';
				    }
					   
				    else if (self.RakSearchMails.fromTrashFlag)
				    {
				    	self.RakSearchMails.fromTrashFlag=false;	
					    return 'onRakTrashClick';
				    }
			},
		 //CHANGES DONE FOR BACK EVENT FROM PREVIOUS PARTICULAR PAGE END	
			
			 //CHANGES DONE FOR SENDING DATE AS DAY,MONTH AND YEAR START
		    setFromToDate: function() {
				self.common.displayDate = self.RakSearchMails.fromDate;
				self.populateCurrentDateDetails(self.RakSearchMails.fromDate);
                self.RakSearchMails.searchFromDate_day =self.common.date;
				self.RakSearchMails.searchFromDate_month=self.common.month;
				self.RakSearchMails.searchFromDate_year=self.common.year;

				self.common.displayDate = self.RakSearchMails.toDate;
				self.populateCurrentDateDetails(self.RakSearchMails.toDate);
                self.RakSearchMails.searchToDate_day =self.common.date;
				self.RakSearchMails.searchToDate_month=self.common.month;
				self.RakSearchMails.searchToDate_year=self.common.year;
			},
			//CHANGES DONE FOR SENDING DATE AS DAY,MONTH AND YEAR END
			//Rak For mail Serach withou selecting the Date range Changes to popluate with 1 month
			setInitialDate : function(){
				
				if ((null == self.common.searchToDate || "" ==self.common.searchToDate)&&(null == self.common.searchFromDate || ""==self.common.searchFromDate) ){
					self.common.searchToDate = new Date();
					self.common.searchFromDate = new Date().addMonths(-1);

					self.common.displayDate = self.common.searchFromDate;
					self.populateCurrentDateDetails();

					self.RakSearchMails.searchFromDate_day =self.common.date;
					self.RakSearchMails.searchFromDate_month=self.common.month;
					self.RakSearchMails.searchFromDate_year=self.common.year;

					self.common.displayDate = self.common.searchToDate;
					self.populateCurrentDateDetails();

					self.RakSearchMails.searchToDate_day =self.common.date;
					self.RakSearchMails.searchToDate_month=self.common.month;
					self.RakSearchMails.searchToDate_year=self.common.year;

					/*self.payBill.searchFromDate=self.common.searchFromDate;
					self.payBill.searchToDate=self.common.searchToDate;*/
						
				}
				else{
					self.common.displayDate = self.RakSearchMails.fromDate;
					self.populateCurrentDateDetails(self.RakSearchMails.fromDate);
	                self.RakSearchMails.searchFromDate_day =self.common.date;
					self.RakSearchMails.searchFromDate_month=self.common.month;
					self.RakSearchMails.searchFromDate_year=self.common.year;

					self.common.displayDate = self.RakSearchMails.toDate;
					self.populateCurrentDateDetails(self.RakSearchMails.toDate);
	                self.RakSearchMails.searchToDate_day =self.common.date;
					self.RakSearchMails.searchToDate_month=self.common.month;
					self.RakSearchMails.searchToDate_year=self.common.year;
					
		
				}
			},
			
			rakSearchMailsInit : function(responselist) {

				if (!responselist[0].hasOwnProperty('errorMessage')) {
					if (responselist[0].hasOwnProperty('mailCategoryList')) {
						self.RakSearchMails.subjectList = responselist[0].mailCategoryList;
					}
					if (responselist[0].hasOwnProperty('searchMailsList')) {
						self.RakSearchMails.searchMailsList = responselist[0].searchMailsList;
						self.RakSearchMails.isMailsListPresent=true;
						self.RakSearchMails.criteriaFlag=true;
					}
					else
						{
						self.RakSearchMails.searchMailsList=[];
						self.RakSearchMails.isMailsListPresent=false;
						}

				}
				
				//CHANGES DONE TO SHOW CRITERIA PART IF ERROR COMES START
				else
					{
					self.RakSearchMails.criteriaFlag=false;
					}
				//CHANGES DONE TO SHOW CRITERIA PART IF ERROR COMES END
           },
			
           rakSearchMailReset: function() {
					self.RakSearchMails.folderId = "";
					self.RakSearchMails.subjectList="";
					self.RakSearchMails.selectedSubject="";
					self.RakSearchMails.toDate="";
					self.RakSearchMails.fromDate="";
					self.RakSearchMails.attachment="";
					self.RakSearchMails.isMailsListPresent=false;
		
				}
	};
	
	
   
	 
	//RAK ADDED BY  FOR SEARCH MAILS END
};
