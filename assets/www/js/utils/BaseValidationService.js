
	
AppController.factory('BaseValidationService', ['$http', '$rootScope',
                                          function($http, $rootScope) {

  return {
		requiredValidator: function(param){
			var fieldValue = $rootScope.$eval(param);
			var flag = true; 
			/* fix for 770724 added undefined condition */
			if(fieldValue===undefined || fieldValue === null || fieldValue.length === 0 || fieldValue == "null"){
				$rootScope.pageErrorArr[param] = "emptyField";
				flag = false; 
			}
			return flag;
		},
		
		stepUpRequiredValidator: function(param, stepUpAuthString){
			var fieldValue = $rootScope.$eval(param);
			var flag = true; 
			stepUpAuthString=$rootScope.$eval(stepUpAuthString);
			if(stepUpAuthString == "RSA_SECURE_ID" || stepUpAuthString == "SMS_OTP"){
				if(fieldValue===undefined || fieldValue ==="" || fieldValue === null || fieldValue == "null"){
					$rootScope.pageErrorArr[param] = "stepUpRequired";
					flag = false; 
				}
			}
			return flag;
		},
		
		isSameRoleSelectedValidator: function(param){
			var fieldValue = $rootScope.$eval(param);
			var flag = true; 
			if(fieldValue!=null)
			{
				for(var i=0; i<fieldValue.length;i++)
					{
						for(var j=i+1; j<fieldValue.length;j++)
						{
							if(fieldValue[i] === fieldValue[j])
							{
								$rootScope.pageErrorArr[param] = "SameRoles";
								flag = false;
								return flag;
							}
						}
					}
			}
			
			return flag;
		},
		
		hasSpaceValidator: function(param){
			var fieldValue = $rootScope.$eval(param);
			var flag = true; 
			if(/\s/g.test(fieldValue)){
				$rootScope.pageErrorArr[param] = "hasSpace";
				flag = false; 
			}

			return flag;
		},
		textWithoutZeroValidator: function(param){
			var fieldValue = $rootScope.$eval(param);
			var flag = true; 
			var numValue= fieldValue*1;
			if(typeof fieldValue == "number" || fieldValue.length>0){
				if(numValue==0){
				$rootScope.pageErrorArr[param] = "textWithoutZero";
				flag = false; 
				}
			}

			return flag;
		},
		
		
		mandatoryAndNonZeroValidator: function(param){
			var fieldValue = $rootScope.$eval(param);
			var flag = true; 
			if(fieldValue === null || fieldValue.length === 0 || fieldValue == "null" || fieldValue <= 0 || isNaN(fieldValue)){
				if(fieldValue === 0 || fieldValue==="0" || fieldValue==="" || fieldValue <= 0){
				$rootScope.pageErrorArr[param] = "requiredNonZero";
				flag = false; 
				}
			}

			return flag;
		},
		
			mandatoryNonZeroSpecialCharValidator: function(param){
			var fieldValue = $rootScope.$eval(param);
			var flag = true;
			
			if((/^[a-zA-Z0-9- ]*$/.test(fieldValue) === false)){
				
				$rootScope.pageErrorArr[param] = "requiredNonZero";
				flag = false; 
				
			}

			return flag;
		},
		
		
		mandatoryValidator: function(param){
			var fieldValue = $rootScope.$eval(param);
			var flag = true;
			
			if(fieldValue===undefined || fieldValue === null || fieldValue.length === 0 || fieldValue == "null" || fieldValue <= 0 ||fieldValue === 0 || fieldValue==="0" || fieldValue==="" || fieldValue <= 0 || fieldValue === 0 || fieldValue==="0" || fieldValue==="" || fieldValue <= 0)
			{
				
				$rootScope.pageErrorArr[param] = "requiredNonZero";
				flag = false; 
				
			}

			return flag;
		},
		
		requiredNonZeroValidator: function(param){
			var fieldValue = $rootScope.$eval(param);
			var flag = true; 
			if(fieldValue === null || fieldValue.length === 0 || fieldValue == "null" || fieldValue <= 0 || isNaN(fieldValue)){
				if(fieldValue === 0){
				$rootScope.pageErrorArr[param] = "requiredNonZero";
				flag = false; 
				}
			}

			return flag;
		},
		// not in use
		isNumberValidator: function(param){
			var fieldValue = $rootScope.$eval(param);
			var flag = true; 
//			alert(fieldValue);
//			alert(isNaN(fieldValue));
			if(isNaN(fieldValue)){
//				alert('IN');
				$rootScope.pageErrorArr[param] = "isNumber";
				flag = false; 
			}
			return flag;
		},
		isNumberRange: function(param,conditionvar){
			var fieldValue = $rootScope.$eval(param);
			var secondFieldValue = $rootScope.$eval(conditionvar);
			var flag = true; 
//			alert(fieldValue);
//			alert(isNaN(fieldValue));
			     if(secondFieldValue == true)
				{
			     if(!isNaN(fieldValue)){
				 var intvalue = parseInt(fieldValue);
				if((intvalue < 2)|| (intvalue >= 99))
				{
				$rootScope.pageErrorArr[param] = "isNumberRange";
				flag = false;
			    }
			}
				}
			return flag;
				
		},
		
		isNumberRangeCondition: function(param,conditionvar){
			var fieldValue = $rootScope.$eval(param);
			var secondFieldValue = $rootScope.$eval(conditionvar);
			var flag = true; 
//			alert(fieldValue);
//			alert(isNaN(fieldValue));
			if(secondFieldValue == true)
				{
			     if(!isNaN(fieldValue)){
				var intvalue = parseInt(fieldValue);
				if((intvalue < 2)|| (intvalue > 100))
				{
				$rootScope.pageErrorArr[param] = "isNumberRangeCondition";
				flag = false;
			    }
			}
				}
			return flag;
		},
		
		byPassRequiredValidator: function(param){
			var fieldValue = $rootScope.$eval(param);
			var flag = true; 
			if(fieldValue === null || fieldValue.length === 0 || fieldValue == "null"){
				$rootScope.pageErrorArr[param] = "byPassRequired";
				flag = false; 
			}
			return flag;
		},
		
		nonZeroMultipleFieldValidator: function(param,secondField){
			var fieldValue = $rootScope.$eval(param);
			var secondFieldValue = $rootScope.$eval(secondField);
			var flag = true; 
				if(fieldValue === 0 && !isNaN(fieldValue) && !isNaN( secondFieldValue) && secondFieldValue === 0 || ( fieldValue === 0 && !isNaN(fieldValue) && isNaN( secondFieldValue))  || secondFieldValue === 0 && !isNaN(secondFieldValue) && isNaN( fieldValue) ){
					this.requiredNonZeroValidator(param);
					this.requiredNonZeroValidator(secondField);
					$rootScope.pageErrorArr[param] = "nonZeroMultipleField";
					flag = false; 
				}
			return flag;
		},
		
		NonZeroifValueConditionallyValidator: function(param){
			var fieldValue = $rootScope.$eval(param);
			var flag = true; 
			//if(fieldValue == null || fieldValue.length == 0 || fieldValue == "null" || fieldValue <= 0 || isNaN(fieldValue)){
			if(fieldValue !== null && typeof fieldValue !='undefined' && fieldValue.length > 0){
				if(fieldValue === 0){
				$rootScope.pageErrorArr[param] = "NonZeroifValueConditionally";
				flag = false; 
				}
			}

			return flag;
		},
		
		requiredNonZeroConditionallyValidator: function(param,conditionVar){
			var fieldValue = $rootScope.$eval(conditionVar);
			var flag = true; 
			if ( fieldValue === true ) {
//				return requiredNonZeroValidator(param);
				return this.NonZeroifValueConditionallyValidator(param);
			} 
			return flag;
		},
		
		conditionalRequiredValidator: function(param, conditionVar) {

			var fieldValue = $rootScope.$eval(conditionVar);

			if (fieldValue === null || fieldValue == "null" || fieldValue === true || fieldValue.length === 0) {
				return this.requiredValidator(param);
			} 

			return true;
		},
		
		conditionalMandatoryValidator: function(param,
				conditionVar) {

			var fieldValue = $rootScope.$eval(conditionVar);
	        
			if (fieldValue == null || fieldValue == "null"
					|| fieldValue == false
					|| fieldValue.length == 0) {
				return true;
			}
			return this.requiredValidator(param);
		},
		conditionalRequiredForDateValidator: function(param, conditionVar, dateField) {

			var fieldValue = $rootScope.$eval(conditionVar);
			var currentDateField = $rootScope.$eval(param);
			var alternamtiveDateField = $rootScope.$eval(dateField);

			if (fieldValue === null || fieldValue == "null" || fieldValue === true || fieldValue.length === 0) {
				return this.requiredValidator(param);
			} 
			
			if (fieldValue > 0 && currentDateField === "" &&  alternamtiveDateField !== "" ) {
				return this.requiredValidator(param);
			} 
			return true;
		},
		
		conditionalRequiredNotOneValidator: function(param, conditionVar) {
			
			var list= conditionVar.split(',');
			var conditionalBool=false;
			for (var i=0; i<list.length; i++){
				var fieldValue = $rootScope.$eval(list[i]);
				if(typeof fieldValue != 'undefined'){
				if (!(fieldValue === null || fieldValue == "null" || fieldValue.length === 0)) {
					conditionalBool=true;
				} 
				};
			}
			
			if(!conditionalBool)
				return this.requiredValidator(param);
			return true;
		},
		
		conditionalRequiredNullValidator: function(param, conditionVar) {

			var fieldValue = $rootScope.$eval(conditionVar);

			if (fieldValue === null || fieldValue === "" || fieldValue == "null") 
			{
				return true;
			} 
			else
			{
				return this.requiredValidator(param);
			}
		},
		
		conditionalAccountRequiredValidator: function(param, conditionVar) {

			var fieldValue = $rootScope.$eval(conditionVar);

			if ( fieldValue == "Debit to Account" || fieldValue == "Credit to Account" || fieldValue == "account") {
				return this.requiredValidator(param);
			} 

			return true;
		},
		
		conditionalParamEqualValidator: function(param, conditionVar, value) {

			var fieldValue = $rootScope.$eval(conditionVar);
			var definedValue = value;
			if ( fieldValue == definedValue ) {
				return this.requiredValidator(param);
			} 

			return true;
		},
		conditionalRequiredValidatorForForcePasword: function(param, conditionVar) {

			var fieldValue = $rootScope.$eval(conditionVar);
			if ( fieldValue === true ) {
				return this.requiredValidator(param);
			} 
			return true;
		},
		
		conditionalRequiredValidatorForTrueCondition: function(param, conditionVar) {

			var fieldValue = $rootScope.$eval(conditionVar); 
			if ( fieldValue === true ) {
				return this.requiredValidator(param);
			} 

			return true;
		},
		conditionalNonZeroRequiredValidatorForTrueCondition: function(param, conditionVar) {
			flag=true;
			var fieldValue1 = $rootScope.$eval(conditionVar);
			var fieldValue2 = parseInt($rootScope.$eval(param));
			if ( fieldValue1 === true ) {
				if(fieldValue2 === null || fieldValue2.length === 0 || fieldValue2 == "null" || fieldValue2 <= 0 || isNaN(fieldValue2)){
					$rootScope.pageErrorArr[param] = "requiredNonZero";
					flag = false; 
			} 
			}
			return flag;
		},
		
		
		maxLengthValidator: function(param, maxLength){
			var fieldValue = $rootScope.$eval(param);
			var flag = true; 

			if( typeof fieldValue != 'undefined' && fieldValue !== null ){
				if( fieldValue.toString().length > maxLength ){
					$rootScope.pageErrorArr[param] = "maxLength";
					flag = false; 
				}
			}
			return flag;

		},
		
		arrayMaxLengthValidator: function(param, maxLength){
			var fieldValue = $rootScope.$eval(param);
			var flag = true; 	 
			for(var index=0; index < fieldValue.length; index ++)
				{
					if(typeof fieldValue[index] != 'undefined' && fieldValue[index] !== null ){
					if( fieldValue[index].toString().length > maxLength )
						{
						$rootScope.pageErrorArr[param+"["+index+"]"] = "arrayMaxLength";
						flag = false; 
						}
				}
		}
			return flag;
		},
		
		numberMaxLengthValidator: function(param, maxLength){
			var fieldValue = $rootScope.$eval(param);
			var flag = true; 

			if( typeof fieldValue != 'undefined' && fieldValue !== null ){
				fieldValue=fieldValue.toString();
				if( fieldValue.length > maxLength ){
					$rootScope.pageErrorArr[param] = "numberMaxLength";
					flag = false; 
				}
			}
			return flag;

		},
		
		minLengthValidator: function(param, minLength){
			var fieldValue = $rootScope.$eval(param);
			var flag = true; 

			if(fieldValue.length < minLength){
				$rootScope.pageErrorArr[param] = "minLength";
				flag = false; 
				// $rootScope.$eval(param).errorFlag = true;
				//$rootScope.$eval(param).errorType = "minLength";
				//validationError = true;
			}

			return flag;
		},
		
		pinAndCVVMinLengthValidator: function(param, minLength){
			var fieldValue = $rootScope.$eval(param);
			minLength  = $rootScope.$eval(minLength);
			var flag = true; 

			if(fieldValue.length < minLength){
				$rootScope.pageErrorArr[param] = "pinAndCVVMinLength";
				flag = false; 
			}
			return flag;
		},

		monthDayCheck: function(param, conditionVar){
			var fieldValue = Math.floor($rootScope.$eval(param));
			var nextValue  = Math.floor($rootScope.$eval(conditionVar));
			var flag = true; 
			if((nextValue === 0 || nextValue === '' || nextValue === null) && (fieldValue === 0 || fieldValue > 999))
			{
				$rootScope.pageErrorArr[param] = "notvalidperiod";
				flag = false;
			}
			if(nextValue > 0  && (fieldValue > 31))
			{
				$rootScope.pageErrorArr[param] = "notvalidperiod";
				flag = false;
			}
			if(nextValue > 99)
			{
				$rootScope.pageErrorArr[param] = "notvalidperiod";
				flag = false;
			}
			return flag;
		},
		
		stringEqualsValidator: function(param, definedValue){
			
			var fieldValue = $rootScope.$eval(param);
		    definedValue = $rootScope.$eval(definedValue);
			
			var flag = true; 
				
			if((fieldValue !== '' && definedValue !== '') && fieldValue != definedValue){
				$rootScope.pageErrorArr[param] = "stringNotEqual";
				flag = false; 
			}
			return flag;
		},
		
		notAllCapsValidator: function(param) {
			var fieldValue = $rootScope.$eval(param);
			var flag = true; 
			if(fieldValue.length > 0 && fieldValue === fieldValue.toUpperCase()){
				$rootScope.pageErrorArr[param] = "notAllCaps";
				flag = false; 
			}

			return flag;
		},
		
		actualDateLessThanValidator: function(param, definedValue){
			var fromDate = $rootScope.$eval(param);
			var flag = true; 
			toDate = $rootScope.$eval(definedValue);
			if(fromDate instanceof Date && toDate instanceof Date && fromDate > toDate){
				$rootScope.pageErrorArr[param] = "actualDateLessThan";
				flag = false; 
			}
			return flag;
			
		},
		
		actualDateGreaterThanValidator: function(param, definedValue){
			var toDate = $rootScope.$eval(param);
			var flag = true; 
			var fromDate = $rootScope.$eval(definedValue);
			if(toDate === "" || toDate === null || fromDate > toDate){
				$rootScope.pageErrorArr[param] = "actualDateGreaterThan";
				flag = false; 
			}
			return flag;
		},
		
		conditionalBaseFromAndToDateValidator: function(param, definedValue){
			var currentDateFieldValue = $rootScope.$eval(param);
			var flag = true; 
			var otherDateFieldvalue = $rootScope.$eval(definedValue);
			if( typeof currentDateFieldValue != "object" && typeof otherDateFieldvalue == "object"  ){
				return this.requiredValidator(param);
			}
			if( typeof currentDateFieldValue == "object" && typeof otherDateFieldvalue != "object"  ){
				return this.requiredValidator(definedValue);
			}
			return flag;
		},
		
		dateLessThanValidator: function(param, definedValue){
			var fieldValue = $rootScope.$eval(param);
			var flag = true; 
			fieldValue = this.getStringifiedDate(fieldValue);
			definedValue = this.getStringifiedDate(definedValue);
			if(fieldValue > definedValue){
				$rootScope.pageErrorArr[param] = "dateLessThan";
				flag = false; 
			}
			return flag;
		},
		
		dateGreaterThanValidator: function(param, definedValue){
			var fieldValue = $rootScope.$eval(param);
			var flag = true; 
			fieldValue = this.getStringifiedDate(fieldValue);
			definedValue = this.getStringifiedDate(definedValue);
			if(fieldValue < definedValue){
				$rootScope.pageErrorArr[param] = "dateGreaterThan";
				flag = false; 
			}
			return flag;
		},
		
		dateLessThanVarValidator: function(param, variable){
			var fieldValue = $rootScope.$eval(param);
	        var flag = true;
	                                            
	        if(fieldValue === null || fieldValue.length === 0){
	            $rootScope.pageErrorArr[param] = "emptyField";
	            flag = false;
	        } else {
	            var variableFieldValue = $rootScope.$eval(variable);
	            if(variableFieldValue === null || variableFieldValue.length === 0){
	              $rootScope.pageErrorArr[variable] = "emptyField";
	              flag = false;
	            } else {
	                if(this.getStringifiedDate(fieldValue)  > this.getStringifiedDate(variableFieldValue)){
	                    $rootScope.pageErrorArr[param] = "dateLessThanVar";
	                    flag = false;
	                }
	            }
	        }

			return flag;
		},
		
		dateGreaterThanVarValidator: function(param, variable){
	                                            
			var fieldValue = $rootScope.$eval(param);
	        var flag = true;
	                                            
	        if(fieldValue === null || fieldValue.length === 0){
	           $rootScope.pageErrorArr[param] = "emptyField";
	           flag = false;
	        } else {
	            var variableFieldValue = $rootScope.$eval(variable);
	            if(variableFieldValue === null || variableFieldValue.length === 0){
	                $rootScope.pageErrorArr[variable] = "emptyField";
	                flag = false;
	            } else {
	                variableFieldValue = this.getStringifiedDate(variableFieldValue);
	                if(this.getStringifiedDate(fieldValue) < variableFieldValue){
	                    $rootScope.pageErrorArr[param] = "dateGreaterThanVar";
	                    flag = false;
	                }
	            }
	        }
			return flag;
		},
		
		validDateValidator: function(param){
			var fieldValue = $rootScope.$eval(param);
			var flag = true;
			if ( Object.prototype.toString.call(fieldValue) === "[object Date]" ) {
				  // it is a date
				  if ( isNaN( fieldValue.getTime() ) ) {  // d.valueOf() could also work
				    flag=false;// date is not valid
				  }
				}
				else {
				 flag=false; // not a date
				}
				  
		    if(!flag){
		    	$rootScope.pageErrorArr[param] = "invalidDate";
		    }
		    return flag;
		},
		
		conditionalDateGreaterThanVarValidator: function(param, conditionVar, variable) {

			var fieldValue = $rootScope.$eval(conditionVar);
			var fromDate = $rootScope.$eval(param);
			var toDate = $rootScope.$eval(variable);

			if (fieldValue === null || fieldValue == "null" || fieldValue.length === 0) {
				return this.dateGreaterThanVarValidator(param, variable);
			}
			else
			{
				if ( fromDate !== "" &&  toDate !== "" ) {
					return this.dateGreaterThanVarValidator(param,variable);
				} 
			}

			return true;
		},
		
		dateGreaterThanNowValidator: function(param){
			var currDate = new Date();
			var fieldValue = $rootScope.$eval(param);
			var flag = true; 
			if(fieldValue != "" && fieldValue > currDate){
				$rootScope.pageErrorArr[param] = "dateGreaterThanNow";
				flag = false; 
			}
			return flag;
		},
		
		dateGreaterThanNowUpdateWorkAddrValidator: function(param){
			var currDate = new Date();
			var fieldValue = $rootScope.$eval(param);
			var flag = true; 
			if(fieldValue === "" || fieldValue > currDate){
				$rootScope.pageErrorArr[param] = "dateGreaterThanNow";
				flag = false; 
			}
			return flag;
		},
	
		dateGreaterThanNowUpdateCommAddrValidator: function(param){
			var currDate = new Date();
			var fieldValue = $rootScope.$eval(param);
			var flag = true; 
			if(fieldValue === "" || fieldValue > currDate){
				$rootScope.pageErrorArr[param] = "dateGreaterThanNow";
				flag = false; 
			}
			return flag;
		},
	
		dateGreaterThanNowUpdatePermAddrValidator: function(param){
			var currDate = new Date();
			var fieldValue = $rootScope.$eval(param);
			var flag = true; 
			if(fieldValue === "" || fieldValue > currDate){
				$rootScope.pageErrorArr[param] = "dateGreaterThanNow";
				flag = false; 
			}
			return flag;
		},

		
		checkForDateGreaterThanCurrentDate: function(param){
			var currDate = new Date();
			var fieldValue = $rootScope.$eval(param);
			var flag = true; 
			if(fieldValue > currDate){
				flag = false; 
			}
			return flag;
		},
		
		dateGreaterThanFromDateNowValidator: function(param){
			flag = this.checkForDateGreaterThanCurrentDate(param);
			
			if(!flag){
				$rootScope.pageErrorArr[param] = "dateGreaterThanFromDateNow";
				flag = false; 
			}
			return flag;
			
		},
		
		dateGreaterThanToDateNowValidator: function(param){
			flag = this.checkForDateGreaterThanCurrentDate(param);
			
			if(!flag){
				$rootScope.pageErrorArr[param] = "dateGreaterThanToDateNow";
				flag = false; 
			}
			return flag;
		},
		
		dateGreaterThanNowAndEqualValidator: function(param){
			var currDate = new Date();
			currDate = currDate.clearTime();
			var fieldValue = $rootScope.$eval(param);
			var flag = true; 
			if(fieldValue === "" || fieldValue < currDate){
				$rootScope.pageErrorArr[param] = "dateGreaterThanNowAndEqual";
				flag = false; 
			}
			return flag;
		},
		
		dateLessThanNowValidator: function(param){
			var fieldValue = $rootScope.$eval(param);
			//fieldValue = moment(fieldValue);
			//var currDate = moment(new Date());
			var currDate =new Date();
			currDate = currDate.clearTime();
			var flag = true; 
			if(fieldValue === "" || fieldValue < currDate || fieldValue.compareTo(currDate) < 0){
				$rootScope.pageErrorArr[param] = "dateLessThanNow";
				flag = false; 
			}
			return flag;
		},
		
		futureDateCheckValidator: function(param){
			var fieldValue = $rootScope.$eval(param);
			var inputDate = self.parseDate(fieldValue);
			
			var currDate =new Date();
			currDate = currDate.clearTime();
			var flag = true; 
			if(inputDate === "" || inputDate > currDate || inputDate.compareTo(currDate) > 0){
				$rootScope.pageErrorArr[param] = "futureDateCheck";
				flag = false; 
			}
			return flag;
		},
		
		futureDateCheckTwoValidator: function(param){
			var fieldValue = $rootScope.$eval(param);
			var inputDate = self.parseDateTwo(fieldValue);
			
			var currDate =new Date();
			currDate = currDate.clearTime();
			var flag = true; 
			if(inputDate === "" || inputDate > currDate || inputDate.compareTo(currDate) > 0){
				$rootScope.pageErrorArr[param] = "futureDateCheckTwo";
				flag = false; 
			}
			return flag;
		},
		
		lessThanOptionalValidator: function(param, variable){
			var fieldValue = $rootScope.$eval(param);
			var flag = true; 
			if(fieldValue !== null || fieldValue.length !== 0){
				var variableFieldValue = $rootScope.$eval(variable);
				if(variableFieldValue !== null || variableFieldValue.length !== 0)
					if(parseFloat(variableFieldValue) < parseFloat(fieldValue)){
	            		$rootScope.pageErrorArr[param] = "lessThanOptional";
	        			flag = false;
					}
			}
			return flag;
		},
		
		atleatOneFieldSelectedValidator: function(param, secondField,selectedStatus){
			var fieldValue = $rootScope.$eval(param);
			var secondFieldValue = $rootScope.$eval(secondField);
			var status = $rootScope.$eval(selectedStatus);
			var flag = true; 
			if(fieldValue === '' && secondFieldValue === '' && status ){
				$rootScope.pageErrorArr[param] = "atleatOneFieldSelected";
				this.requiredValidator(param);
				this.requiredValidator(secondField);
				flag = false; 
			}
			return flag;
		},
		
		atleatOneYearFieldSelectedValidator: function(param, month1,day2,month2,day3,month3,day4,month4,day5,month5,day6,month6,selectedStatus){
			var day1Value = $rootScope.$eval(param);
			var month1Value = $rootScope.$eval(month1);
			var day2Value = $rootScope.$eval(day2);
			var month2Value = $rootScope.$eval(month2);
			var day3Value = $rootScope.$eval(day3);
			var month3Value = $rootScope.$eval(month3);
			var day4Value = $rootScope.$eval(day4);
			var month4Value = $rootScope.$eval(month4);
			var day5Value = $rootScope.$eval(day5);
			var month5Value = $rootScope.$eval(month5);
			var day6Value = $rootScope.$eval(day6);
			var month6Value = $rootScope.$eval(month6);
			var status = $rootScope.$eval(selectedStatus);
			var flag = true; 
			if(day1Value === '' && month1Value === '' && day2Value === '' && month2Value === '' && day3Value === '' && month3Value === '' && day4Value === '' && month4Value === '' && day5Value === '' && month5Value === '' && day6Value === '' && month6Value === '' && status ){
				$rootScope.pageErrorArr[param] = "atleatOneYearFieldSelected";
				this.requiredValidator(param);
				this.requiredValidator(month1);
				flag = false; 
			}
			return flag;
		},
		
		
		getStringifiedDate: function(value){
			var data = (value.toString()).split("-");
			var returnData = parseInt(data[0]) * 365 + parseInt(data[1]) * 30 + parseInt(data[2]);
			return returnData;
		}, 
		
		
	    isEmailValidator: function(value){
	    	var fieldValue = $rootScope.$eval(value);
	    	
			var flag = true;
			if(fieldValue !== '' && fieldValue!='undefined'){
			var regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		    flag = regex.test(fieldValue);
		    if(!flag){
		    	$rootScope.pageErrorArr[value] = "Invalid Email";
		    }
			}
		    return flag;
	    },
	    
	    
	    isAlphaNumericValidator: function(value){
	    	var fieldValue = $rootScope.$eval(value);
			var flag = true;
			var regex = /^[a-zA-Z0-9]*$/;
			//Bug fix for 1743
			if(fieldValue !== ''){
			flag = regex.test(fieldValue);
			}
			
		    if(!flag){
//		    	$rootScope.pageErrorArr[value] = "Not Alphanumeric";
		    	$rootScope.pageErrorArr[value] = "isAlphaNumeric";
		    }
		    return flag;
	    	
	    },
	    
	    isDayGreaterThanThirtyValidator: function(param,value){
	    	var monthFieldValue = $rootScope.$eval(value);
	    	var fieldValue = $rootScope.$eval(param);
			var flag = true;
			
		    if(fieldValue > 31 && monthFieldValue !== '' && monthFieldValue !== null && monthFieldValue != "null" ){
		    	flag = false;
		    	$rootScope.pageErrorArr[param] = "Invalid date";
		    }
		    return flag;
	    	
	    },
	    
	    isEmailNotReqValidator: function(value){
	    	var fieldValue = $rootScope.$eval(value);
			var flag = true;
			var regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		    if(fieldValue.length>0 || fieldValue !== "")
		    	flag = regex.test(fieldValue);
		    if(!flag){
		    	$rootScope.pageErrorArr[value] = "Invalid Email";
		    }
		    return flag;
	    },
	    
	    
	    isPhnNumberNotReqValidator: function(value){
	    	var fieldValue = $rootScope.$eval(value);
			var flag = true;
			var regex =/(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]‌​)\s*)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)([2-9]1[02-9]‌​|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})\s*(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+)\s*)?$/;
		    if(fieldValue.length>0 || fieldValue !== "")
		    	flag = regex.test(fieldValue);
		    if(!flag){
		    	$rootScope.pageErrorArr[value] = "Invalid Contact";
		    }
		    return flag;
	    },
	    
	    isMobNumberNotReqValidator: function(value){
	    	var fieldValue = $rootScope.$eval(value);
			var flag = true;
			var regex =/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/;
		    if(fieldValue.length>0 || fieldValue !== "")
		    	flag = regex.test(fieldValue);
		    if(!flag){
		    	$rootScope.pageErrorArr[value] = "Invalid Contact";
		    }
		    return flag;
	    },
	    
	    isPasswordValidator: function(value){
	    	var fieldValue = $rootScope.$eval(value);
			var flag = true;
			var regex = /^[A-Za-z0-9]{8,}$/; 
		    flag = regex.test(fieldValue);
		    if(!flag){
		    	$rootScope.pageErrorArr[value] = "Invalid Password";
		    	flag = false;
		    }
		    return flag;
	    },
	    
		lengthEqualsValidator: function(param, variable){
			var fieldValue = $rootScope.$eval(param);
			var flag = true; 
			fieldValue += "";
			if(fieldValue.length != variable){
				$rootScope.pageErrorArr[param] = "lengthNotEquals";
				flag = false;
			}
			return flag;
		},
		
		nonEmptylengthEqualsValidator: function(param, variable){
			var fieldValue = $rootScope.$eval(param);
			var flag = true; 
			fieldValue += "";
			if(fieldValue !== '' && fieldValue!='undefined' && fieldValue!='null'){
			if(fieldValue.length != variable){
				$rootScope.pageErrorArr[param] = "nonEmptylengthNotEquals";
				flag = false;
			}
		}
			return flag;
		},
		
		lengthEqualsNotReqValidator: function(param, variable){
			var fieldValue = $rootScope.$eval(param);
			var flag = true; 
			fieldValue += "";
			if(fieldValue!="null"){
			if(fieldValue.length>0 || fieldValue !== "" ){
			if(fieldValue.length != variable){
				$rootScope.pageErrorArr[param] = "lengthNotEqualsAndNotMandetory";
				flag = false;
			}
			}
		}
			return flag;
		},
		
		validateBasedOnIndex: function(param, variable){
			var fieldValue = $rootScope.$eval(param);
			var data = $rootScope.$eval(variable);
			var flag = true; 
			for(var index=0; index < data.length; index ++)
				{
					
			//flag=false;
				flag=this.mandatoryAndNonZeroValidator(param+"["+data[index]+"]");
						
					}
				
			return flag;
		},
		rqdValidateBasedOnIndex: function(param, variable){
			var fieldValue = $rootScope.$eval(param);
			var data = $rootScope.$eval(variable);
			var flag = true; 
			for(var index=0; index < data.length; index ++)
				{
					
			//flag=false;
				flag=this.mandatoryValidator(param+"["+data[index]+"]");
						
					}
				
			return flag;
		},
		
		arrayBasedOnKeyValidator: function(param, key, stepUpAuthString,selectedQuestions,questions){
			var fieldValue = $rootScope.$eval(key);
			var selectedQuestions = $rootScope.$eval(selectedQuestions);
			var questions = $rootScope.$eval(questions);
			//var data = $rootScope.$eval(variable);
			var flag = true; 
			stepUpAuthString=$rootScope.$eval(stepUpAuthString);
			if(stepUpAuthString=="SECURITY_QUESTIONS"){
				var fieldKeyValue=fieldValue.split('|');
			for(var index=0; index < fieldKeyValue.length; index ++)
				{
				var answer=fieldKeyValue[index].split(',')[1];
					if(answer==="undefined" || answer === null || answer === "")
						{
							flag=false;
							$rootScope.pageErrorArr[param+"["+index+"]"] = "arrayBasedOnKey";
						}
				}
			}
			if(stepUpAuthString=="SET_SECURITY_QUESTIONS"){
				var fieldKeyValue=fieldValue.split('|');
				count=0;
				for(var i=0; i < questions.length; i ++)
				{
					if(selectedQuestions[i]){
						var answer=fieldKeyValue[count].split(',')[1];
						if(answer==="undefined" || answer === null || answer === "")
						{
							flag=false;
							$rootScope.pageErrorArr[param+"["+i+"]"] = "arrayBasedOnKey";
						}
						count++;
				}
				}
				
			}
			return flag;
		},
		
		validateBasedOnArrayValidation: function(param){
			var fieldValue = $rootScope.$eval(param);
			//var data = $rootScope.$eval(variable);
			var flag = true; 
			for(var index=0; index < fieldValue.length; index ++)
				{
					if(fieldValue[index] === null || fieldValue[index] === "" || fieldValue[index] == "null" || fieldValue[index].toString() == "NaN" )
						{
							flag=false;
							$rootScope.pageErrorArr[param+"["+index+"]"] = "indexEmptyField";
							//this.requiredValidator(param+"["+index+"]");
						}
				}
			return flag;
		},
		
		validateNonZeroArrayValidation: function(param){
			var fieldValue = $rootScope.$eval(param);
			var flag = true; 
			for(var index=0; index < fieldValue.length; index ++)
				{
					if(fieldValue[index] === 0 || fieldValue[index].toString()==="0" ||fieldValue[index] <= 0 || fieldValue[index].length === 0 )
						{
							flag=false;
							$rootScope.pageErrorArr[param+"["+index+"]"] = "requiredNonZero";
						}
				}
			return flag;
		},
		
		fieldValueVariableValidator: function(param, field, value, variable){
			var fieldValue = $rootScope.$eval(param);
			var flag = true;
			var regex;
			var objValue;
			var flag2;
			
			for (var index = 0; index < fieldValue.length; index++) {
				var objName = param +"[" + index + "]" + "." + value;
				objValue = $rootScope.$eval(objName) + '';
				if( fieldValue[index][field].toLowerCase() == "mobile no" || fieldValue[index][field].toLowerCase() == "consumer code" || fieldValue[index][field].toLowerCase() =="generic number"){
					
					var variableValue = $rootScope.$eval(param +"[" + index + "]" + "." + variable);
					objValue = $rootScope.$eval(objName) + '';
					
					if(objValue.length > variableValue || objValue.length === 0 || parseInt(objValue) === 0 ){ 
							$rootScope.pageErrorArr[objName] = "lengthNotEquals";
							flag = flag && false;
						}
				}
				
				if(fieldValue[index][field].toLowerCase() == "sms" ) {
					if(objValue.length === 0 ){ 
						$rootScope.pageErrorArr[objName] = "lengthNotEquals";
						flag = flag && false;
					}
				}
				else if(fieldValue[index][field].toLowerCase() == "email"){
					flag2=true;
					regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				    flag2 = regex.test(objValue);
				    if(!flag2){
				    	$rootScope.pageErrorArr[objName] = "Invalid Email";
				    	flag = flag && flag2;
				    }
				}
				// else will do check for text
				else{
					if(objValue === null || objValue.length === 0 || objValue == "null"){
						$rootScope.pageErrorArr[objName] = "emptyField";
						flag = flag && false;
					}
				}
				if(fieldValue[index][field].toLowerCase() == "consumer code" || fieldValue[index][field].toLowerCase() =="generic number"){
					regex = /^[a-zA-Z0-9]*$/;
					flag2 = regex.test(objValue);
				    if(!flag2){
				    	$rootScope.pageErrorArr[objName] = "Special Characters";
				    	flag = flag && flag2;
				    }
				}
			}
			return flag;
		},
		
		fieldValueValidator: function(param, field, value, variable){ 
			var fieldValue = $rootScope.$eval(param);
			var flag = true;
			for (var index = 0; index < fieldValue.length; index++) {
				
				var objName = param +"[" + index + "]" + "." + value;
				var objValue = $rootScope.$eval(objName) + '';
				
				var sizeLength = parseInt(fieldValue[index].payeeInputSize);
				if(!isNaN(sizeLength) && objValue.length > sizeLength){
					$rootScope.pageErrorArr[objName] = "lengthNotEquals";
					flag = flag && false;
				}
				//objValue += "";
				
				if((fieldValue[index][field].toLowerCase() == "sms" || fieldValue[index][field].toLowerCase() == "fax" || fieldValue[index][field].toLowerCase() == "mobile no") && objValue.length > 0){
					//Call email validator
					
					if(objValue.length != variable){
						$rootScope.pageErrorArr[objName] = "lengthNotEquals";
						flag = flag && false;
					}
					//return flag;
				}
				else if(fieldValue[index][field].toLowerCase() == "email" && objValue.length > 0){
					var flag2=true;
					var regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				    flag2 = regex.test(objValue);
				    if(!flag2){
				    	$rootScope.pageErrorArr[objName] = "Invalid Email";
				    	flag = flag && flag2;
				    }
				}
				// else will do check for text
//				else{
//					if(objValue == null || objValue.length == 0 || objValue == "null"){
//						$rootScope.pageErrorArr[objName] = "emptyField";
//						flag = flag && false;
//					}
//				}
			}
			return flag;
		},
		
		requiredIfPresentInArrayValidator: function(param,variable){
			var fieldValue = $rootScope.$eval(param);
			var count=$rootScope.$eval(variable);
			for(var index=0; index < count; index++) {
				if(fieldValue[index] === null || fieldValue[index].length === 0){
					var appendedParam=param+"["+index+"]";
					$rootScope.pageErrorArr[param] = "emptyField";
					flag = false; 
				}

				return flag;
			}
		},
		
//		conditionalLabelNumeric: function(param, conditionVar) {
	//
//			var fieldValue = $rootScope.$eval(conditionVar);
	//
//			if (fieldValue.toLowerCase() == "numeric" || fieldValue == "Numeric") {
//				return lengthEqualsValidator(param,10);
//			} 
	//
//			return true;
//		},
		
		startValueValidator: function(param,value){
			var fieldValue = $rootScope.$eval(param) +'';
			var cmpValue='^'+ $rootScope.$eval(value)+'';
	         flag=true;
				if(fieldValue.match(cmpValue)){
					$rootScope.pageErrorArr[param] = "notValid";
					flag = false;
				}
				return flag;
		},
		
		specialCharaterValidator: function(param){
			var fieldValue = $rootScope.$eval(param) +'';
			flag=true;
			if(/^[a-zA-Z0-9- ]*$/.test(fieldValue) === false) {
				$rootScope.pageErrorArr[param] = "notValid";
				flag = false; 
			}
			return flag;
		},
		alphabetsOnly: function(param){
			var fieldValue = $rootScope.$eval(param) +'';
			flag=true;
			if(/^[a-zA-Z ]*$/.test(fieldValue) === false) {
				$rootScope.pageErrorArr[param] = "notValid";
				flag = false; 
			}
			return flag;
		},
		
		isNumericPasswordValidator: function(param){
			var fieldValue = $rootScope.$eval(param) +'';
			flag=true;
			if(/^[0-9]*$/.test(fieldValue) === false) {
				$rootScope.pageErrorArr[param] = "isNumericPassword";
				flag = false; 
			}
			return flag;
		},
		
		isAlphaNumericWithSpaceValidator: function(param){
			var fieldValue = $rootScope.$eval(param) +'';
			flag=true;
			if(/^[a-zA-Z0-9 ]*$/.test(fieldValue) === false) {
				$rootScope.pageErrorArr[param] = "isAlphaNumericWithSpace";
				flag = false; 
			}
			return flag;
		},
		
		isAlphaNumericWithSpaceAndDotValidator: function(param){
			var fieldValue = $rootScope.$eval(param) +'';
			flag=true;
			if(/^[.a-zA-Z0-9 ]*$/.test(fieldValue) === false) {
				$rootScope.pageErrorArr[param] = "isAlphaNumericWithSpaceAndDot";
				flag = false; 
			}
			return flag;
		},
		
		isAlphaNumericWithUnderScoreValidator: function(param){
			var fieldValue = $rootScope.$eval(param) +'';
			flag=true;
			if(/^[a-zA-Z0-9_]*$/.test(fieldValue) === false) {
				$rootScope.pageErrorArr[param] = "isAlphaNumericWithUnderScore";
				flag = false; 
			}
			return flag;
		},
		
		dateYearLimitValidator: function(param){
			var fieldValue = $rootScope.$eval(param);
			var year="";		
			flag=true;
			if(fieldValue){
			year=fieldValue.getFullYear();	
			if(year === "" || year>10000) {
				$rootScope.pageErrorArr[param] = "dateYearLimit";
				flag = false; 
			}
			}
			return flag;
		},
		
		cardExpiryYearAndMonthValidator: function(param,year){
			var month = $rootScope.$eval(param);
			year = $rootScope.$eval(year);
			var curYear=$rootScope.currentDateObj.getFullYear();
			var curMonth=$rootScope.currentDateObj.getMonth();
			flag=true;
			if(month && year){
				if(year<curYear ) {
					$rootScope.pageErrorArr[param] = "cardExpiryYearAndMonth";
					flag = false; 
				}
				else if(year==curYear && month<curMonth){
					$rootScope.pageErrorArr[param] = "cardExpiryYearAndMonth";
					flag = false; 
				}
			}
			return flag;
		},
		
		stringDateYearLimitValidator: function(param){
			var fieldValue = $rootScope.$eval(param);
			var year="";		
			flag=true;
			if(fieldValue && fieldValue !=" "){
				
				if(fieldValue instanceof Date){
					year=fieldValue.getFullYear();
				}else{
					var formattedDate = moment(fieldValue).format('YYYY-MM-DD');
					year=formattedDate.split('-')[0];
				}
				
				/*if(/-/g.test(fieldValue)){
					year=fieldValue.split('-')[0];	
				}
				else{
					year=fieldValue.getFullYear();	
				}*/
				
				if(year === "" || year > 10000 || year < 1900 ) {
						$rootScope.pageErrorArr[param] = "stringDateYearLimit";
						flag = false; 
				}			
			}
			return flag;
		},
		
		ifValuethanNumberValidator: function(param){
			var fieldValue = $rootScope.$eval(param);
			flag=true;
			if(fieldValue){
				fieldValue=fieldValue*1;	
			if(fieldValue === 0) {
				$rootScope.pageErrorArr[param] = "ifValuethanNumber";
				flag = false; 
			}
			}
			return flag;
		},
		
		/*
		 * Three inputs are required here in this module. 
		 * argument[0] - Is the field value
		 * argument[1] - Is the comparative value
		 * argument[2] - Macro for mathematical operation to be performed
		 */
		numericValueLogicValidator: function(){
//			Three inputs are expected.
			if(arguments.length != 3){
				return false;
			}
			var fieldValue = parseInt($rootScope.$eval(arguments[0]));
			var comparativeValue = parseInt($rootScope.$eval(arguments[1]));
			var flag = true; 
			switch (arguments[2]) {
			case "LOGIC_INT_GREATER_THAN":
				if(fieldValue <= comparativeValue){
					$rootScope.pageErrorArr[arguments[0]] = "numericValueGreaterthan";
					flag = false;
				}
				break;
			case "LOGIC_INT_LESSER_THAN":
				if(fieldValue >= comparativeValue){
					$rootScope.pageErrorArr[arguments[0]] = "numericValueLesserthan";
					flag = false;
				}
				break;
			default:
				$rootScope.pageErrorArr[arguments[0]] = "numericValueLogicValidation";
				flag = false;
				break;
			}
			
			return flag;
		},
  }
  
}]);