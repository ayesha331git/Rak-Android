AppController.factory('CurrencyConfigProcessor', ['$http', '$q','Logger','$rootScope',
                               function($http, $q, Logger, $rootScope) {
	/**
	 * variables that will be used across this service
	 */ 
	var currencyConfig = {};
	var lastFormattedCurrency='';
	
	return {
		
		/**
		 * The init method which initializes processing of all currency configurations
		 * @constructor
		 * @return {object} Return all currencies from JSON file
		 */ 
		init: function() {
			Logger.debug("Initiliazing currency configuration");
			/**
			 * Note that we will have to return a promise because the caller
			 * is waiting on us to complete some functionality
			 */ 
			var deferred = $q.defer();
			/**
			 * Let us read the file now.
			 */
		    $http.get('js/utils/CurrencyConfig.json').success(function(data) {
		    	/**
				 * The only thing to do is to process the currency config file
				 */
		    	currencyConfig = data;
		    	Logger.debug("Finished processing currency configuration");
		    	deferred.resolve(data);
		    }).error(function(msg, code) {
		    	Logger.debug("Error in processing currency configuration::msg:: "+msg+", code:: "+code);
		    	deferred.reject(msg);
		    });
		    
		    /** 
		     * Let us return the promise now
		     */
		    return deferred.promise;
		},
		getCurrencyConfig: function(currency){
			//Logger.debug("getCurrencyConfig Input params:: currency:: "+currency);
			if(currency==undefined){
				throw new Error("Get Currency Config Error:: Currency is blank");
			}
			var crnConfig1 = currencyConfig[currency];
			if(crnConfig1 == undefined){
				throw new Error("Get Currency Config Error:: Currency config is not defined for the currency");
			}
			return crnConfig1;
		},
		unFormatAmount: function(amount, currency, isParseMoney) {
			
			/** First, let us find the config for the currency. */
			//Logger.debug("UnFormat Amount Input params:: amount:: "+amount+", currency:: "+currency+", isParseMoney:: "+isParseMoney);
			
			if(isParseMoney){
				if(amount==undefined || amount==null || amount.length==0){
					Logger.fatal("UnFormat Amount Error:: Amount is blank");
					return amount;
				}
				var sAmount = amount.toString();
				while(sAmount.indexOf(",")!=-1){
					sAmount = sAmount.replace(",","");
				}
				
				//Logger.debug("unformatted amount:: "+sAmount);
				if(isNaN(sAmount)){
					sAmount="";
				}
				return sAmount;
			}
			
			if((amount==undefined || amount==null || amount.length==0) || (currency==undefined || currency==null || currency.length==0)){
				Logger.fatal("UnFormat Amount Error:: Either amount or currency is blank");
				return amount;
				//throw new Error("UnFormat Amount Error:: Either amount or currency is blank");
			}
			var crnConfig1 = currencyConfig[currency];
			if(crnConfig1 == undefined){
				Logger.fatal("UnFormat Amount Error:: Currency config is not defined for the currency");
				return amount;
				//throw new Error("UnFormat Amount Error:: Currency config is not defined for the currency");
			}
			/*Logger.debug("Currency Config-->> Symbol:: "+crnConfig1.CURRENCY_SYM+", Decimal Seperator:: "+crnConfig1.DECIMAL_SEP+", Group Seperator:: "+crnConfig1.GROUP_SEP
					+", lower group size:: "+crnConfig1.lgSize+", group size:: "+crnConfig1.gSize+", decimal places:: "+crnConfig1.decimalPlaces 
					+", negative prefix:: "+crnConfig1.negPre+", negative suffix:: "+crnConfig1.negSuf);*/
			
			//unFormat the amount here
			var sAmount = amount.toString();
			//Logger.debug("sAmount::orig:: "+sAmount);
			
			if(sAmount.indexOf(crnConfig1.GROUP_SEP)!=-1){
				
				if(crnConfig1.GROUP_SEP=="."){
					var tempAmountArr = sAmount.split(".");
					//to identify if the second part is decimal places
					if(tempAmountArr.length==2 && tempAmountArr[1].length==crnConfig1.decimalPlaces){
						//do nothing
					}else{
						while(sAmount.indexOf(crnConfig1.GROUP_SEP)!=-1){
							sAmount = sAmount.replace(crnConfig1.GROUP_SEP,"");
						}
					}
				}else{
					while(sAmount.indexOf(crnConfig1.GROUP_SEP)!=-1){
						sAmount = sAmount.replace(crnConfig1.GROUP_SEP,"");
					}
				}
			}
			//Logger.debug("sAmount::after replacing group sep:: "+sAmount);
			if(sAmount.indexOf(crnConfig1.DECIMAL_SEP)!=-1){
				sAmount = sAmount.replace(crnConfig1.DECIMAL_SEP,".");
			}
			//Logger.debug("unformatted amount:: "+sAmount);
			if(isNaN(sAmount)){
				sAmount="";
			}
			return sAmount;
		},
		/** The method which fetches the start page for a given feature */
		formatAmount: function(amount, currency, isParseMoney/*, unformatWithCrn*/) {
			/** First, let us find the config for the currency. */
			//Logger.debug("Format Amount Input params:: amount:: "+amount+", currency:: "+currency+", isParseMoney:: "+isParseMoney/*+", unformatWithCrn"+unformatWithCrn*/);
			var amountFormatMode = $rootScope.mobileAppConfig.appConfigData.amountFormatMode;
			if(isParseMoney==undefined){
				isParseMoney = false;
			}
			
			/*if(unformatWithCrn==undefined){
				unformatWithCrn = false;
			}*/
			
			if((amount==undefined || amount==null || amount.length==0) || (currency==undefined || currency==null || currency.length==0)){
				if((amount==undefined || amount==null || amount.length==0) && amountFormatMode && amountFormatMode == "INPUT"){
					throw new Error("Format Amount Error:: Either amount or currency is blank");
					//return "0.00";
				}else{
					throw new Error("Format Amount Error:: Either amount or currency is blank");
				}
			}
			var crnConfig1 = currencyConfig[currency];
			if(crnConfig1 == undefined){
				throw new Error("Format Amount Error:: Currency config is not defined for the currency");
			}
			/*Logger.debug("Currency Config-->> Symbol:: "+crnConfig1.CURRENCY_SYM+", Decimal Seperator:: "+crnConfig1.DECIMAL_SEP+", Group Seperator:: "+crnConfig1.GROUP_SEP
					+", lower group size:: "+crnConfig1.lgSize+", group size:: "+crnConfig1.gSize+", decimal places:: "+crnConfig1.decimalPlaces 
					+", negative prefix:: "+crnConfig1.negPre+", negative suffix:: "+crnConfig1.negSuf);*/
			
			//format the amount here
			var numberValue;
			
			//Unformat the amount
			if(isParseMoney){
				numberValue = parseFloat(this.unFormatAmount(amount, currency, isParseMoney));
			}else if(this.lastFormattedCurrency && this.lastFormattedCurrency!=currency){
				numberValue = parseFloat(this.unFormatAmount(amount, this.lastFormattedCurrency));
				//Logger.info("numberValue:: "+numberValue);
				if(isNaN(numberValue)){
					numberValue = parseFloat(this.unFormatAmount(amount, currency));
				}
			}else{
				numberValue = parseFloat(this.unFormatAmount(amount, currency));
			}
			//Logger.info("numberValue:: "+numberValue);
			var precison = crnConfig1.decimalPlaces; 
			precison = isNaN(precison = Math.abs(precison)) ? 2 : precison;
			
			var decimalSeperator = crnConfig1.DECIMAL_SEP;
			decimalSeperator = decimalSeperator == undefined ? "." : decimalSeperator;
			
			var groupSeperator = crnConfig1.GROUP_SEP;
			groupSeperator = groupSeperator == undefined ? "," : groupSeperator;
			
			var groupSize = crnConfig1.gSize;
			groupSize = isNaN(groupSize = Math.abs(groupSize)) ? 3 : groupSize;
			
			var largeGroupSize = crnConfig1.lgSize;
			largeGroupSize = isNaN(largeGroupSize = Math.abs(largeGroupSize)) ? 3 : largeGroupSize;
			
			if(groupSize == largeGroupSize){
				//Logger.debug("Math.abs(+numberValue || 0):: "+Math.abs(+numberValue || 0));
				var i = parseInt(numberValue = Math.abs(+numberValue || 0).toFixed(precison)) + "", 
		        j = (j = i.length) > groupSize ? j % groupSize : 0;
		        var regEx = new RegExp("(\\d{"+groupSize+"})(?=\\d)","g");
		        /*Logger.debug("Currency Config::Regex "+regEx);
		        Logger.debug("i:: "+i);
		        Logger.debug("Part 1:: "+(j ? i.substr(0, j) + groupSeperator : ""));
		        Logger.debug("Part 2:: "+i.substr(j).replace(regEx, "$1" + groupSeperator));
		        Logger.debug("Part 3:: "+(precison ? decimalSeperator + Math.abs(numberValue - i).toFixed(precison).slice(2) : ""));*/
		        var res = (j ? i.substr(0, j) + groupSeperator : "") + 
		        			i.substr(j).replace(regEx, "$1" + groupSeperator) + 
		        			(precison ? decimalSeperator + Math.abs(numberValue - i).toFixed(precison).slice(2) : "");
			}else{
				//Format for uneven formats like lakhFormat
				var sAmount = numberValue.toString();
				//Split the amount in 2 parts --> lower group size and rest of the amount
				var decimalPart = "";
				if(sAmount.indexOf('.') > 0){
					
					decimalPart =  sAmount.substring(sAmount.indexOf('.')+1,sAmount.length);
					
					if(decimalPart.length<precison){
						var amountWithDecimal = Math.abs(sAmount).toFixed(precison);
						decimalPart =  amountWithDecimal.substring(amountWithDecimal.indexOf('.')+1,amountWithDecimal.length);
					}else if(decimalPart.length>precison){
						decimalPart = decimalPart.substring(0,precison);
					}
				}else if(precison){
					var amountWithDecimal = Math.abs(sAmount).toFixed(precison);
					decimalPart =  amountWithDecimal.substring(amountWithDecimal.indexOf('.')+1,amountWithDecimal.length);
				}
				
				sAmount = Math.floor(sAmount);
				sAmount=sAmount.toString();
				
				var lowerGroup = sAmount.substring(sAmount.length-largeGroupSize);
				var restOfNumber = sAmount.substring(0,sAmount.length-largeGroupSize);
				if(restOfNumber && restOfNumber!=""){
					
					var i = parseInt(restOfNumber = Math.abs(+restOfNumber || 0).toFixed(precison)) + "", 
			        j = (j = i.length) > groupSize ? j % groupSize : 0;
					var regEx = new RegExp("(\\d{"+groupSize+"})(?=\\d)","g");
					var res = (j ? i.substr(0, j) + groupSeperator : "") + 
	        			i.substr(j).replace(regEx, "$1" + groupSeperator) + groupSeperator + lowerGroup +
	        			(precison ? decimalSeperator + decimalPart : "");
				}else{
					var res = lowerGroup + (precison ? decimalSeperator + decimalPart : "");
				}
			}
			//Logger.debug("Currency Config::result "+res);
			if(!isParseMoney){
				this.lastFormattedCurrency = currency;
			}
			
			return res;
		},
		
		unFormatAmountNew : function(amount) {
			var sAmount = amount.toString();
			var unformattedAmt = "";
			for(var i=0;i<sAmount.length;i++){
				var cAmt = sAmount.charAt(i);
				if(cAmt!=" " && !isNaN(cAmt)){
					unformattedAmt = unformattedAmt + cAmt;
				}
			}
			
			return unformattedAmt;
		},
		
		formatAmountNew: function(amount, currency) {
			/** First, let us find the config for the currency. */
			//Logger.debug("Format Amount Input params:: amount:: "+amount+", currency:: "+currency);
			
			if((amount==undefined || amount==null || amount.length==0) || (currency==undefined || currency==null || currency.length==0)){
				throw new Error("Format Amount Error:: Either amount or currency is blank");
			}
			var crnConfig1 = currencyConfig[currency];
			if(crnConfig1 == undefined){
				throw new Error("Format Amount Error:: Currency config is not defined for the currency");
			}
			/*Logger.debug("Currency Config-->> Symbol:: "+crnConfig1.CURRENCY_SYM+", Decimal Seperator:: "+crnConfig1.DECIMAL_SEP+", Group Seperator:: "+crnConfig1.GROUP_SEP
					+", lower group size:: "+crnConfig1.lgSize+", group size:: "+crnConfig1.gSize+", decimal places:: "+crnConfig1.decimalPlaces 
					+", negative prefix:: "+crnConfig1.negPre+", negative suffix:: "+crnConfig1.negSuf);*/
			
			//Unformat the amount
			var numberValue = parseFloat(this.unFormatAmountNew(amount));
			//Logger.info("number value after unformatting:: "+numberValue);
			if(numberValue==0){
				return "";
			}
			var precison = crnConfig1.decimalPlaces; 
			precison = isNaN(precison = Math.abs(precison)) ? 2 : precison;
			
			var decimalSeperator = crnConfig1.DECIMAL_SEP;
			decimalSeperator = decimalSeperator == undefined ? "." : decimalSeperator;
			
			var groupSeperator = crnConfig1.GROUP_SEP;
			groupSeperator = groupSeperator == undefined ? "," : groupSeperator;
			
			var groupSize = crnConfig1.gSize;
			groupSize = isNaN(groupSize = Math.abs(groupSize)) ? 3 : groupSize;
			
			var largeGroupSize = crnConfig1.lgSize;
			largeGroupSize = isNaN(largeGroupSize = Math.abs(largeGroupSize)) ? 3 : largeGroupSize;
			
			if(precison){
				var decimal = Math.pow(10, precison);
				numberValue = numberValue/decimal;
			}
			
			if(groupSize == largeGroupSize){
				
				var i = parseInt(numberValue = Math.abs(+numberValue || 0).toFixed(precison)) + "", 
		        j = (j = i.length) > groupSize ? j % groupSize : 0;
		        var regEx = new RegExp("(\\d{"+groupSize+"})(?=\\d)","g");
		        //Logger.debug("Currency Config::Regex "+regEx);
		        //Logger.debug("Currency Config::number value "+numberValue);
		        //Logger.debug("Currency Config::i "+i);
		        /*var res = (j ? i.substr(0, j) + groupSeperator : "") + 
		        			i.substr(j).replace(regEx, "$1" + groupSeperator) + 
		        			(precison && (numberValue-i!=0)? decimalSeperator + Math.abs(numberValue - i).toFixed(precison).slice(2) : "");*/
		        var res = (j ? i.substr(0, j) + groupSeperator : "") + 
    						i.substr(j).replace(regEx, "$1" + groupSeperator) + 
    						(precison ? decimalSeperator + Math.abs(numberValue - i).toFixed(precison).slice(2) : "");
			}else{
				//Format for uneven formats like lakhFormat
				var sAmount = numberValue.toString();
				//Split the amount in 2 parts --> lower group size and rest of the amount
				var decimalPart = "";
				
				var intPart = parseInt(numberValue = Math.abs(+numberValue || 0).toFixed(precison)) + "";
				
				if(sAmount.indexOf('.') > 0){
					
					decimalPart =  sAmount.substring(sAmount.indexOf('.')+1,sAmount.length);
					
					if(decimalPart.length<precison){
						var amountWithDecimal = Math.abs(sAmount).toFixed(precison);
						decimalPart =  amountWithDecimal.substring(amountWithDecimal.indexOf('.')+1,amountWithDecimal.length);
					}else if(decimalPart.length>precison){
						decimalPart = decimalPart.substring(0,precison);
					}
				}else if(precison){
					var amountWithDecimal = Math.abs(sAmount).toFixed(precison);
					decimalPart =  amountWithDecimal.substring(amountWithDecimal.indexOf('.')+1,amountWithDecimal.length);
				}
				//Logger.debug("Currency Config::number value "+numberValue);
				sAmount = Math.floor(sAmount);
				sAmount=sAmount.toString();
				
				var lowerGroup = sAmount.substring(sAmount.length-largeGroupSize);
				var restOfNumber = sAmount.substring(0,sAmount.length-largeGroupSize);
				//Logger.info("numberValue-intPart: "+numberValue-intPart);
				//Logger.info("numberValue-intPart!=0:: "+numberValue-intPart!=0);
				if(restOfNumber && restOfNumber!=""){
					
					var i = parseInt(restOfNumber = Math.abs(+restOfNumber || 0).toFixed(precison)) + "", 
			        j = (j = i.length) > groupSize ? j % groupSize : 0;
					var regEx = new RegExp("(\\d{"+groupSize+"})(?=\\d)","g");
					var res = (j ? i.substr(0, j) + groupSeperator : "") + 
	        			i.substr(j).replace(regEx, "$1" + groupSeperator) + groupSeperator + lowerGroup +
	        			(precison? decimalSeperator + decimalPart : "");
				}else{
					var res = lowerGroup + (precison? decimalSeperator + decimalPart : "");
				}
			}
			//Logger.debug("Currency Config::result "+res);
				this.lastFormattedCurrency = currency;
			
			return res;
		}
	};
}]);