App.viewModels.wcmclienthandlers=function(scope,rootScope, Logger,ActionProcessor){
	var self=this;

		self.wcmOpr=function(response){
			if (response.operativeAccountsList.length == 0){


				self.getTEXTFromWCM("MB","RAK","d51785e2-f2f4-42a6-81d7-ad05e2770d4f","Accounts","","WCMGETTEXTOPR","WCM Content not Available");
			}
		}
		self.wcmOpr=function(response){
			if (response.tradeFinAccountsList.length == 0){


				self.getTEXTFromWCM("MB","RAK","d51785e2-f2f4-42a6-81d7-ad05e2770d4f","Accounts","","WCMGETTEXTOPR","WCM Content not Available");
			}
		}
		self.wcmDep=function(response){
			if (response.depositAccountsList.length == 0){
				self.getTEXTFromWCM("MB","RAK","5824d11f-4257-45fc-9f0f-b3362ab9ea28","Accounts","","WCMGETTEXTDEP","WCM Content not Available");

			    	}
		}
		self.wcmLon=function(response){
			if (response.loanAccountsList.length == 0){
				self.getTEXTFromWCM("MB","RAK","5de878ff-2a69-4e2a-8569-be424506bf9d","Accounts","","WCMGETTEXTLON","WCM Content not Available");

			}
		}
		self.wcmGld=function(response){
			if (response.goldAccountsList.length == 0){
				self.getTEXTFromWCM("MB","RAK","f435a2a0-d2f4-432b-a5c0-39de6262c7a9","Accounts","","WCMGETTEXTGLD","WCM Content not Available");

			}
		}

		self.wcmConGld=function(){
				self.getTEXTFromWCM("MB","RAK","f435a2a0-d2f4-432b-a5c0-39de6262c7a9","Accounts","","WCMGETTEXTGLD","WCM Content not Available");
		}

		self.wcmInv=function(response){
			if (response.invAccountsList.length == 0){
				self.getTEXTFromWCM("MB","RAK","db2abac7-fb47-480b-ac72-39a6aa26da34","Accounts","","WCMGETTEXTINV","WCM Content not Available");

			}
		}
		self.wcmCc=function(response){
			if (response.ccList.length == 0){
				self.getTEXTFromWCM("MB","RAK","5235ee62-ee53-48c6-abf5-f5b1157577df","Accounts","","WCMGETTEXTCC","WCM Content not Available");

			}
		}
			self.wcmConCcPrimary=function(){

					self.getTEXTFromWCM("MB","RAK","5235ee62-ee53-48c6-abf5-f5b1157577df","Accounts","","WCMGETTEXTPCC","WCM Content not Available");
			}

			self.wcmConCcSec=function(){

				self.getTEXTFromWCM("MB","RAK","5235ee62-ee53-48c6-abf5-f5b1157577df","Accounts","","WCMGETTEXTSCC","WCM Content not Available");
		}






/**
 * the callback function to handle banner click with autolayout (1)
 */
function handleBannerClick(bannerData) {
	/*
	 * bannerData==> { 'type':'Internal/external', 'imageUrl':'',
	 * 'params':'','link':'' //additional params for image }
	 */
	alert('{' + bannerData.type + '} click : <<' + bannerData.link + '>>');

	// handle app internal clicks
	if (bannerData.type == 'Internal') {

		// tell the wcm plugin that the callback finished executing
		return wcm.EVENTSTATE.COMPLETE;
	}

	// tell the wcm plugin to continue with default action
	return wcm.EVENTSTATE.CONTINUE;
}

/**
 *
 * This function needs to be written the clients - the below is only a
 * demonstration code
 *
 *
 * 000
 * 001 - generic content id
 * 002 - error
 * 003 - no content
 */
function insertRemoteBanners(response,targetId,defaultImg) {
	var responseCode = response.responseCode;
	if(responseCode==="000" || responseCode==="001"){
		var banners = response.contentListMap;


		var html = "";
		jQuery.each(banners, function(index, value) {

			/*html += '<img style="width:100%;height:100%" src="' + value.bannerImageURL.replace(wcmDomain,wcmIp) + '" target-url="'
					+ value.bannerLinkURL.replace(wcmDomain,wcmIp) + '"';*/
			html += '<img style="width:100%;height:100%" src="' + value.bannerImageURL + '" target-url="'
			+ value.bannerLinkURL+ '"';

			if (value.bannerType == "Internal") {
				// custom code to handle internal redirects - this needs to be
				// binded with the image click or howver the client wishes to handle
				// the logic
				// here we use jquery click bind later with class
				html += " class='wcm-image-internal'";
			} else if (value.bannerType == "External") {
				// custom code to handle internal redirects - this needs to be
				// binded with the image click or howver the client wishes to handle
				// the logic
				// here we use jquery click bind later with class
				html += " class='wcm-image-external'";
			}
			html += ' >';

		});
		jQuery("[id='"+targetId+"']").html(html);

		jQuery("img.wcm-image-internal").unbind('click');

		jQuery("img.wcm-image-internal").bind('click', function() {
			var urlKey = jQuery(this).attr('target-url');
			// resolve the key to the actual URLs
			var actualURL = appURLs[urlKey];
			console.log(actualURL);
			window.location.replace(actualURL);
		});

		jQuery("img.wcm-image-external").unbind('click');

		jQuery("img.wcm-image-external").bind('click', function() {
			var urlKey = jQuery(this).attr('target-url');
			window.open(urlKey);
		});
	} else {
		jQuery("[id='"+targetId+"']").html('<img src="./images/'+defaultImg+'" alt="banner" title="banner" class="defaultBanner" id="bannerImage" border="0">');
	}

}

function getWCMBanner(channelId,bankId,cId,pageContext,userSegment,targetId,defaultImg){

	// request object to send data
	var requestData = {};

	// the requestor details - security
	requestData.client = {
	// TODO:
	}


	requestData.channelId = channelId;
	requestData.bankId=bankId;
	requestData.cId=cId;
	requestData.pageContext=pageContext;
	requestData.userSegment=userSegment;
	// use the WCM API to get the banners
	var response = jQuery.getBanner(requestData);

	// handle the successful response -this is required only when the requestor
	// would handle the insertion of images into the document
	/*
	 * response.banners==> { 'type':'internal/external', 'url':'', 'params':''
	 * //additional params for image }
	 *
	 * Note: the below function will not be called if autolayout is set to '1' -
	 * use callbacks instead
	 */
	response.then(function(response){
		insertRemoteBanners(response,targetId,defaultImg)
		});

	// to be handled in case of failure - if there any failure while making the
	// WCM call
	response.fail(function(error) {
		jQuery("[id='"+targetId+"']").html('<img src="./images/'+defaultImg+'" alt="banner" title="banner" class="defaultBanner" id="bannerImage" border="0">');
	});
}

self.clearDDSTab=function()
	{
	self.ddsPayeeTab=false;
	self.ddsTxnHistoryTab=false;
//	self.ddsTab=false;

	};
	self.getHTMLFromWCM=function(channelId,bankId,cId,pageContext,userSegment,targetId,defaultImg){
	var requestData = {};

	// the requestor details - security
	requestData.client = {
	// TODO:
	}

	// lets prepare the banner request data
	requestData.channelId = channelId;
	requestData.bankId=bankId;
	requestData.cId=cId;
	requestData.pageContext=pageContext;
	requestData.userSegment=userSegment;

	//requestData.contentId="36adb4af-457d-4938-90c1-58eeaf45f748";
	var response = jQuery.getHtml(requestData);

	// handle the successful response
	/*
	 * Note: the below function will not be called if autolayout is set to '1' -
	 * use callbacks instead
	 */
	response.then(function(response){
		insertRemoteHTML(response,targetId,defaultImg)
	});


	// to be handled in case of failure - if there any failure while making the
	// WCM call
	response.fail(function(error) {
		jQuery("[id*='"+targetId+"']").html('<img src="./images/'+defaultImg+'" alt="banner" title="banner" class="defaultBanner" id="bannerImage" border="0">');
	});
}

	self.getTEXTFromWCM=function(channelId,bankId,cId,pageContext,userSegment,targetId,defaultImg){
		var requestData = {};

		// the requestor details - security
		requestData.client = {
		// TODO:
		}

		// lets prepare the banner request data
		requestData.channelId = channelId;
		requestData.bankId=bankId;
		requestData.cId=cId;
		requestData.pageContext=pageContext;
		requestData.userSegment=userSegment;

		//requestData.contentId="36adb4af-457d-4938-90c1-58eeaf45f748";
		var response = jQuery.getText(requestData);

		// handle the successful response
		/*
		 * Note: the below function will not be called if autolayout is set to '1' -
		 * use callbacks instead
		 */
		response.then(function(response){
			insertRemoteTEXT(response,targetId,defaultImg,cId)
		});


		// to be handled in case of failure - if there any failure while making the
		// WCM call
		response.fail(function(error) {
			jQuery("[id*='"+targetId+"']").html('<img src="./images/'+defaultImg+'" alt="banner" title="banner" class="defaultBanner" id="bannerImage" border="0">');
		});
	}



function insertRemoteHTML(response,targetId,defaultImg){
	var responseCode = response.responseCode;
	var mergedhtml = "";
	var contentIdMap = [];
	if(responseCode==="000" || responseCode==="001"){
		var contentMap = response.contentListMap;
		jQuery.each(contentMap, function (i, contentData) {
			var contentId = contentData.contentId;
             if(contentData.hasOwnProperty('htmlContent') && contentIdMap.indexOf("contentId")==-1){
				contentIdMap.push(contentId);
            	 mergedhtml = mergedhtml+contentData.htmlContent;
             }
        });
		mergedhtml = jQuery('<div/>').append(mergedhtml).text();
		var wcmScripts = mergedhtml.match(new RegExp('<script[^>]*>([\\S\\s]*?)<\/script>', 'img'));
		var wcmCss = mergedhtml.match(new RegExp('<link[^>]*>','img'));
		mergedhtml=mergedhtml.replace(new RegExp('<script[^>]*>([\\S\\s]*?)<\/script>', 'img'),"");
		mergedhtml=mergedhtml.replace(new RegExp('<link[^>]*>', 'img'),"");
		jQuery("[id*='"+targetId+"']").html(wcmCss);
		jQuery("[id*='"+targetId+"']").append(mergedhtml);
		var scriptsLength=wcmScripts.length;
		for(var index=0;index<scriptsLength;index++ ){
			try{
				jQuery("[id*='"+targetId+"']").append(wcmScripts[index]);
			}
			catch(e){
			}
		}
	}else {
		jQuery("[id*='"+targetId+"']").html('<img src="./images/'+defaultImg+'" alt="banner" title="banner" id="bannerImage" class="defaultBanner" border="0">');
	}
}


function insertRemoteTEXT(response,targetId,defaultImg){
	var responseCode = response.responseCode;
	var mergedhtml = "";
	var contentIdMap = [];
	if(responseCode==="000" || responseCode==="001"){
		var contentMap = response.contentListMap;
		jQuery.each(contentMap, function (i, contentData) {
			var contentId = contentData.contentId;
             if(contentData.hasOwnProperty('textContent')){
            	 mergedhtml = mergedhtml+contentData.textContent;
             }
        });
		try{
			jQuery("[id*='"+targetId+"']").append("<p>"+mergedhtml+"</p>");
		}
		catch(e){
		}

	}else {
		//jQuery("[id*='"+targetId+"']").html('<img src="L001/consumer/images/'+defaultImg+'" alt="banner" title="banner" id="bannerImage" border="0">');
	}
}

};