App.viewModels.utils=function(){
	
	var self=this;
	/**
	* Define all your variables this scope
	* @constructor
	* @param {string} format Date format
	* @param {int} value Date entered by user
	*/
	self.formatDate = function(format,value){
		var date = moment(value);
    	Logger.info(date.format("'"+format+"'"));
    	return date.format("'"+format+"'");
	};
	/**
	* Formating and checking special character in string
	* @constructor
	* @param {string} dateString Date entered by user
	*/
	self.checkSpecialCharacterInString = function(dateString){
		var specialChars = "-\/|,:";
		for (var index = 0; index < dateString.length; index++) {
			if (specialChars.indexOf(dateString.charAt(index)) != -1) {
//				  	  alert ("Your string has special characters. nThese are not allowed.");
				  	return dateString.charAt(index);
			}
		}
	};
	/**
	* Format date to UTC
	* @constructor
	* @param {string} dateString Date entered by user
	*/
	self.convertStringToUTCformattedDateString=function(dateString){
		
		if( new Date(dateString) == 'Invalid Date' && typeof dateString == "string" ){
			var separater = self.checkSpecialCharacterInString(dateString);
			var explodeArray = dateString.split(separater);
			var tempVar = explodeArray[0];
			explodeArray[0] = explodeArray[1];
			explodeArray[1] = tempVar;
			
			dateString = explodeArray.join(separater);

//			dateString = new Date(explodeArray.join(separater));
		}
		return new Date(dateString);
	};
	/**
	* Adding Suffix to day
	* @constructor
	* @param {int} day day selected by user
	*/
	self.getDayNumberSuffix= function(day) {
	    if (day >= 11 && day <= 13) {
	        return "th";
	    }
	    switch (day % 10) {
	    case 1:
	        return "st";
	    case 2:
	        return "nd";
	    case 3:
	        return "rd";
	    default:
	        return "th";
	    }
	};
	/**
	* Return an array range
	* @constructor
	* @param {int} start Initial value
	* @param {int} end final value
	* @param {int} step increment between number
	*/
	self.range = function(start, end, step) {
	    var range = [];
	    var typeofStart = typeof start;
	    var typeofEnd = typeof end;

	    if (step === 0) {
	        throw TypeError("Step cannot be zero.");
	    }

	    if (typeofStart == "undefined" || typeofEnd == "undefined") {
	        throw TypeError("Must pass start and end arguments.");
	    } else if (typeofStart != typeofEnd) {
	        throw TypeError("Start and end arguments must be of same type.");
	    }

	    typeof step == "undefined" && (step = 1);

	    if (end < start) {
	        step = -step;
	    }

	    if (typeofStart == "number") {

	        while (step > 0 ? end >= start : end <= start) {
//	            range.push(start);
//	            start += step;
	        	range.push({"index":start,"value":start});
	        	start += step;
	        }

	    } else if (typeofStart == "string") {

	        if (start.length != 1 || end.length != 1) {
	            throw TypeError("Only strings with one character are supported.");
	        }

	        start = start.charCodeAt(0);
	        end = end.charCodeAt(0);

	        while (step > 0 ? end >= start : end <= start) {
	            range.push(String.fromCharCode(start));
	            start += step;
	        }

	    } else {
	        throw TypeError("Only string and number types are supported");
	    }

	    return range;

	};
};