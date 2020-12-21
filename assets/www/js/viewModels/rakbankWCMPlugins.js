/**
 * Convergence wcmjQuery Plugin for All channels
 * 
 * 
 */

(function(wcmQuery) {

	var pluginProperties = {};

	var wcmResponse;


	var urlIB = 'https://conv.rakbankonline.ae/rakbank-contenthandler/IB';
	var urlMB = 'https://conv.rakbankonline.ae/rakbank-contenthandler/MB';
	/**
	 * Below check to identified jQuery or Angular JS is loaded
	 * 
	 */
	if (typeof (jQuery) != 'undefined') {

		console.log(' JQuery is Loaded');

	} else if (typeof (angular) != 'undefined') {

		console.log(' jQuery is not Defined');
		console.log(' Angular JS is Loaded');

	} else {

		console
				.log(' JQuery & Angular JS is not Available, Stop further Exceution');
		return false;
	}

	/**
	 * Below method to Initialize browser, domain details to establish the
	 * connection with Channels
	 * 
	 */
	wcmQuery.getInitialized = function(request) {

		request.browser = navigator.appCodeName;
		request.platform = navigator.platform;
		return request;
	};

	/**
	 * Below method to return Banners to channels
	 * 
	 */
	wcmQuery.getBanner = function(request) {

		request.mode = "BANNER";
		if (requestValidation(request)) {
			return rakbankWCMServiceCall(request);
		}

	};

	/**
	 * Below method to return Text to channels
	 * 
	 */
	wcmQuery.getText = function(request) {
	
		request.mode = "TEXT";
		if (requestValidation(request)) {
			return rakbankWCMServiceCall(request);
		}

	};

	/**
	 * Below method to return HTML to channels
	 * 
	 */
	wcmQuery.getHtml = function(request) {

		request.mode = "HTML";
		if (requestValidation(request)) {
			return rakbankWCMServiceCall(request);
		}

	};

	/**
	 * Below method to return content to channels
	 * 
	 */
	wcmQuery.getContents = function(request) {
		
		request.mode = "CONTENT";
		if (requestValidation(request)) {
			return rakbankWCMServiceCall(request);
		}
	};

	/**
	 * Below method to return JSON value to channels
	 * 
	 */
	wcmQuery.getJson = function(request) {
	
		request.mode = "JSON";
		return rakbankWCMServiceCall(request);
	};
	
	/**
	 * Below method to return single html from the list of html
	 */
	wcmQuery.mergeHTMLData = function(contentListMap) {
		var mergedhtml ="";
		jQuery.each(contentListMap, function (i, contentData) {
             if(contentData.hasOwnProperty('htmlContent')){
            	 mergedhtml = mergedhtml+contentData.htmlContent;
             }
        });
		return mergedhtml;
	};
	
	
	/**
	 * Below method to return array with filtered content type
	 */
	wcmQuery.filterContentsWithType = function(contentDatas,contentype) {
		var filteredArray = new Array();
		jQuery.each(contentDatas, function (i, contentitem) {
             if(contentitem.hasOwnProperty('type') && contentitem.type == contentype){
            	 filteredArray.push(contentitem);
             }
        });
		return filteredArray;
	};
	
	/**
	 * Below method to return the contentListMAp as Array
	 */
	wcmQuery.valuesAsList = function(contentListMap) {
		var contentDatas = new Array();
		jQuery.each(contentListMap, function (i, contentitem) {
			contentDatas.push(contentitem);
		});
		return contentDatas;
	};

	/**
	 * To validate Form having mandatory fields
	 * 
	 */
	function requestValidation(request) {

		if (jQuery("#contentType").val() == '-- Select --') {
			alert('Select Valid Content Type');
			return false;
		}
		
		//CHECK WHETHER THE LANGUAGE IS PRESENT
		
		if(!request.lang){
			//Setting default language
			request.lang = "EN";
		} 
		
		if(!request.bankId){
			alert('Input Valid Bank Id');
			return false;
		}
		
		if (!request.channelId) { // this check whether channel id is null or undefined or empty
			alert('Input Valid Channel Id');
			return false;
		}
		return true;
	}

	/**
	 * Ajax call to remote WCM server of Asynchronous call to fetch JSON
	 * response.
	 * 
	 */
	function rakbankWCMServiceCall(request) {

		var response = "";

		var defer = jQuery.Deferred();

		/**
		 * WCM Provider remote WCM server URL configuration Test WCM remote server
		 * url
		 * 
		 */
		if(request.channelId == 'IB'){
			pluginProperties.url = urlIB;
			
		}else if(request.channelId == 'MB' || request.channelId == 'TB'){
			pluginProperties.url = urlMB;
			
		}
		
		/**
		 * ajax call to remote WCM server to get Banner, Text & Html details
		 * 
		 */
		var post = jQuery.ajax({
			type : "POST",
			/* For Security reason, Cross domain is restricted */
			//crossDomain : true,
			//jQuery.support.cors = true,
			data : jQuery.param(request),
			url : pluginProperties.url

		});
		
		/**
		 * On ajax call success will show below console Log REJECT the DEFERRED
		 * (this will trigger all the done()
		 * 
		 */
		post.done(function(jsonString) {
			
			response = jsonString;
			
			defer.resolve(jQuery.parseJSON(response));
		});
		/**
		 * On ajax call failure will show below console Log REJECT the DEFERRED
		 * (this will trigger all the fail()
		 * 
		 */
		post.fail(function(xhr, status, errorThrown) {
			console.log("Error While Calling remote Server");
			console.log("Error: " + errorThrown);
			console.log("Status: " + status);

			defer.reject({
				responseCode : 'E02',
				reason : 'Failed to call remote WCM server'
			});

		});
		/**
		 * Code to run regardless of success or failure
		 * 
		 */
		post.always(function(xhr, status) {

			if (xhr.status != '200') {

				defer.reject({
					responseCode : 'E01',
					reason : 'Failed to get content from WCM Server'
				});
			}

			console.log(" Message :" + xhr);
			

		});

		/**
		 * return the promise of this deferred
		 * 
		 */
		return defer.promise();

	}

})(jQuery);