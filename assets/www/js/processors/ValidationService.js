AppController.factory('ValidationService', ['$http', '$rootScope', 'ValidationProcessor','Logger','ExtValidationService',
                               function($http, $rootScope, ValidationProcessor, Logger,ExtValidationService) {
	
	var requiredValidator = function(param){
		var fieldValue = $rootScope.$eval(param);
		var flag = true; 
		// fix for 770724 added undefined condition 
		if(fieldValue===undefined || fieldValue === null || fieldValue.length === 0 || fieldValue == "null"){
			$rootScope.pageErrorArr[param] = "emptyField";
			flag = false; 
		}
		return flag;
	};
	
	var stepUpRequiredValidator = function(param, stepUpAuthString){
		var fieldValue = $rootScope.$eval(param);
		var flag = true; 
		stepUpAuthString=$rootScope.$eval(stepUpAuthString);
		if(stepUpAuthString == $rootScope.appLiterals.APP.CONSTANTS.RSA_SECURE_ID || stepUpAuthString == $rootScope.appLiterals.APP.CONSTANTS.SEC_SMSOTP){
			if(fieldValue===undefined || fieldValue ==="" || fieldValue === null || fieldValue == "null"){
				$rootScope.pageErrorArr[param] = "stepUpRequired";
				flag = false; 
			}
		}
		return flag;
	};
	
	var isSameRoleSelectedValidator = function(param){
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
	};
	
	var hasSpaceValidator = function(param){
		var fieldValue = $rootScope.$eval(param);
		var flag = true; 
		if(/\s/g.test(fieldValue)){
			$rootScope.pageErrorArr[param] = "hasSpace";
			flag = false; 
		}

		return flag;
	};
	var textWithoutZeroValidator=function(param){
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
	};
	
	
	var mandatoryAndNonZeroValidator = function(param){
		var fieldValue = $rootScope.$eval(param);
		var flag = true; 
		if(fieldValue === null || fieldValue.length === 0 || fieldValue == "null" || fieldValue <= 0 || isNaN(fieldValue)){
			if(fieldValue === 0 || fieldValue==="0" || fieldValue==="" || fieldValue <= 0){
			$rootScope.pageErrorArr[param] = "Required";
			flag = false; 
			}
		}

		return flag;
	};
	
		var mandatoryNonZeroSpecialCharValidator = function(param){
		var fieldValue = $rootScope.$eval(param);
		var flag = true;
		
		if((/^[a-zA-Z0-9- ]*$/.test(fieldValue) === false)){
			
			$rootScope.pageErrorArr[param] = "requiredNonZero";
			flag = false; 
			
		}

		return flag;
	};
	
	
		var specialCharValidator = function(param){
		var fieldValue = $rootScope.$eval(param)+'';
		var flag = true;
		var regex = /[*:?><\\[\\]!”~|]/;
		if(fieldValue===undefined || fieldValue === null || fieldValue.length === 0 || fieldValue == "null" || fieldValue <= 0 ||fieldValue === 0 || fieldValue==="0" || fieldValue==="" || fieldValue <= 0 || fieldValue === 0 || fieldValue==="0" || fieldValue==="" || fieldValue <= 0 ||(regex.test(fieldValue) == true)){

			$rootScope.pageErrorArr[param] = "Enter valid Input";
			flag = false;

		}

		return flag;
	};
	var mandatoryValidator = function(param){
		var fieldValue = $rootScope.$eval(param);
		var flag = true;
		
		if(fieldValue===undefined || fieldValue === null || fieldValue.length === 0 || fieldValue == "null" || fieldValue <= 0 ||fieldValue === 0 || fieldValue==="0" || fieldValue==="" || fieldValue <= 0 || fieldValue === 0 || fieldValue==="0" || fieldValue==="" || fieldValue <= 0)
		{
			
			$rootScope.pageErrorArr[param] = "requiredNonZero";
			flag = false; 
			
		}

		return flag;
	};
	
	var requiredNonZeroValidator = function(param){
		var fieldValue = $rootScope.$eval(param);
		var flag = true; 
		if(fieldValue === null || fieldValue.length === 0 || fieldValue == "null" || fieldValue <= 0 || isNaN(fieldValue)){
			if(fieldValue === 0){
			$rootScope.pageErrorArr[param] = "requiredNonZero";
			flag = false; 
			}
		}

		return flag;
	};
	// not in use
	var isNumberValidator = function(param){
		var fieldValue = $rootScope.$eval(param);
		var flag = true; 
//		alert(fieldValue);
//		alert(isNaN(fieldValue));
		if(isNaN(fieldValue)){
//			alert('IN');
			$rootScope.pageErrorArr[param] = "isNumber";
			flag = false; 
		}
		return flag;
	};
	var isNumberRange = function(param,conditionvar){
		var fieldValue = $rootScope.$eval(param);
		var secondFieldValue = $rootScope.$eval(conditionvar);
		var flag = true; 
//		alert(fieldValue);
//		alert(isNaN(fieldValue));
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
			
	};
	
	var isNumberRangeCondition = function(param,conditionvar){
		var fieldValue = $rootScope.$eval(param);
		var secondFieldValue = $rootScope.$eval(conditionvar);
		var flag = true; 
//		alert(fieldValue);
//		alert(isNaN(fieldValue));
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
	};
	
	var byPassRequiredValidator = function(param){
		var fieldValue = $rootScope.$eval(param);
		var flag = true; 
		if(fieldValue === null || fieldValue.length === 0 || fieldValue == "null"){
			$rootScope.pageErrorArr[param] = "byPassRequired";
			flag = false; 
		}
		return flag;
	};
	
	var nonZeroMultipleFieldValidator = function(param,secondField){
		var fieldValue = $rootScope.$eval(param);
		var secondFieldValue = $rootScope.$eval(secondField);
		var flag = true; 
			if(fieldValue === 0 && !isNaN(fieldValue) && !isNaN( secondFieldValue) && secondFieldValue === 0 || ( fieldValue === 0 && !isNaN(fieldValue) && isNaN( secondFieldValue))  || secondFieldValue === 0 && !isNaN(secondFieldValue) && isNaN( fieldValue) ){
				requiredNonZeroValidator(param);
				requiredNonZeroValidator(secondField);
				$rootScope.pageErrorArr[param] = "nonZeroMultipleField";
				flag = false; 
			}
		return flag;
	};
	
	var NonZeroifValueConditionallyValidator = function(param){
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
	};
	
	var requiredNonZeroConditionallyValidator = function(param,conditionVar){
		var fieldValue = $rootScope.$eval(conditionVar);
		var flag = true; 
		if ( fieldValue === true ) {
//			return requiredNonZeroValidator(param);
			return NonZeroifValueConditionallyValidator(param);
		} 
		return flag;
	};
	
	var conditionalRequiredValidator = function(param, conditionVar) {

		var fieldValue = $rootScope.$eval(conditionVar);

		if (fieldValue === null || fieldValue == "null" || fieldValue === true || fieldValue.length === 0) {
			return requiredValidator(param);
		} 

		return true;
	};
	
	var conditionalMandatoryValidator = function(param,
			conditionVar) {

		var fieldValue = $rootScope.$eval(conditionVar);
        
		if (fieldValue == null || fieldValue == "null"
				|| fieldValue == false
				|| fieldValue.length == 0) {
			return true;
		}
		return requiredValidator(param);
	};
	var conditionalRequiredForDateValidator = function(param, conditionVar, dateField) {

		var fieldValue = $rootScope.$eval(conditionVar);
		var currentDateField = $rootScope.$eval(param);
		var alternamtiveDateField = $rootScope.$eval(dateField);

		if (fieldValue === null || fieldValue == "null" || fieldValue === true || fieldValue.length === 0) {
			return requiredValidator(param);
		} 
		
		if (fieldValue > 0 && currentDateField === "" &&  alternamtiveDateField !== "" ) {
			return requiredValidator(param);
		} 
		return true;
	};
	
	var conditionalRequiredNotOneValidator = function(param, conditionVar) {
		
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
			return requiredValidator(param);
		return true;
	};
	
	var conditionalRequiredNullValidator = function(param, conditionVar) {

		var fieldValue = $rootScope.$eval(conditionVar);

		if (fieldValue === null || fieldValue === "" || fieldValue == "null") 
		{
			return true;
		} 
		else
		{
			return requiredValidator(param);
		}
	};
	
	var conditionalAccountRequiredValidator = function(param, conditionVar) {

		var fieldValue = $rootScope.$eval(conditionVar);

		if ( fieldValue == "Debit to Account" || fieldValue == "Credit to Account" || fieldValue == "account") {
			return requiredValidator(param);
		} 

		return true;
	};
	
	var conditionalParamEqualValidator = function(param, conditionVar, value) {

		var fieldValue = $rootScope.$eval(conditionVar);
		var definedValue = value;
		if ( fieldValue == definedValue ) {
			return requiredValidator(param);
		} 

		return true;
	};
	var conditionalRequiredValidatorForForcePasword = function(param, conditionVar) {

		var fieldValue = $rootScope.$eval(conditionVar);
		if ( fieldValue === true ) {
			return requiredValidator(param);
		} 
		return true;
	};
	
	var conditionalRequiredValidatorForTrueCondition = function(param, conditionVar) {

		var fieldValue = $rootScope.$eval(conditionVar); 
		if ( fieldValue === true ) {
			return requiredValidator(param);
		} 

		return true;
	};
	var conditionalNonZeroRequiredValidatorForTrueCondition = function(param, conditionVar) {
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
	};
	
	
	var maxLengthValidator = function(param, maxLength){
		var fieldValue = $rootScope.$eval(param);
		var flag = true; 

		if( typeof fieldValue != 'undefined' && fieldValue !== null ){
			if( fieldValue.toString().length > maxLength ){
			  errorMsg=errorObj[validationType]+maxLength;
				$rootScope.pageErrorArr[param] = "maxLength";
				flag = false; 
			}
		}
		return flag;

	};
	
	var arrayMaxLengthValidator = function(param, maxLength){
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
	};
	
	var numberMaxLengthValidator = function(param, maxLength){
		var fieldValue = $rootScope.$eval(param);
		var flag = true; 

		if( typeof fieldValue != 'undefined' && fieldValue !== null ){
			fieldValue=fieldValue.toString();
			if( fieldValue.length > maxLength ){
   errorMsg=errorObj[validationType]+maxLength;
				$rootScope.pageErrorArr[param] = "numberMaxLength";
				flag = false; 
			}
		}
		return flag;

	};
	
	var minLengthValidator = function(param, minLength){
		var fieldValue = $rootScope.$eval(param);
		var flag = true; 

		if(fieldValue.length < minLength){
			$rootScope.pageErrorArr[param] = "minLength";
			errorMsg=errorObj[validationType]+minLength;
			flag = false;
			// $rootScope.$eval(param).errorFlag = true;
			//$rootScope.$eval(param).errorType = "minLength";
			//validationError = true;
		}

		return flag;
	};
	
	
	//added for 2FA
	
	var min2FALengthValidator = function(param, minLength){
		var fieldValue = $rootScope.$eval(param);
		var flag = true; 

		if(fieldValue.length < minLength){
			$rootScope.pageErrorArr[param] = "min2FALength";
			errorMsg=errorObj[validationType]+minLength;
			flag = false; 
		
		}

		return flag;
	};
	
	var pinAndCVVMinLengthValidator = function(param, minLength){
		var fieldValue = $rootScope.$eval(param);
		minLength  = $rootScope.$eval(minLength);
		var flag = true; 

		if(fieldValue.length < minLength){
			errorMsg=errorObj[validationType]+minLength;
			$rootScope.pageErrorArr[param] = "pinAndCVVMinLength";
			flag = false; 
		}
		return flag;
	};

	var monthDayCheck = function(param, conditionVar){
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
	};
	
	var stringEqualsValidator = function(param, definedValue){
		
		var fieldValue = $rootScope.$eval(param);
	    definedValue = $rootScope.$eval(definedValue);
		
		var flag = true; 
			
		if((fieldValue !== '' && definedValue !== '') && fieldValue != definedValue){
			$rootScope.pageErrorArr[param] = "stringNotEqual";
			flag = false; 
		}
		return flag;
	};

	
	var notAllCapsValidator = function(param) {
		var fieldValue = $rootScope.$eval(param);
		var flag = true; 
		if(fieldValue.length > 0 && fieldValue === fieldValue.toUpperCase()){
			$rootScope.pageErrorArr[param] = "notAllCaps";
			flag = false; 
		}

		return flag;
	};
	
	var actualDateLessThanValidator = function(param, definedValue){
		var fromDate = $rootScope.$eval(param);
		var flag = true; 
		toDate = $rootScope.$eval(definedValue);
		if(fromDate instanceof Date && toDate instanceof Date && fromDate > toDate){
			$rootScope.pageErrorArr[param] = "actualDateLessThan";
			flag = false; 
		}
		return flag;
		
	};
	
	var actualDateGreaterThanValidator = function(param, definedValue){
		var toDate = $rootScope.$eval(param);
		var flag = true; 
		var fromDate = $rootScope.$eval(definedValue);
		if(toDate === "" || toDate === null || fromDate > toDate){
			$rootScope.pageErrorArr[param] = "actualDateGreaterThan";
			flag = false; 
		}
		return flag;
	};
	
	var conditionalBaseFromAndToDateValidator = function(param, definedValue){
		var currentDateFieldValue = $rootScope.$eval(param);
		var flag = true; 
		var otherDateFieldvalue = $rootScope.$eval(definedValue);
		if( typeof currentDateFieldValue != "object" && typeof otherDateFieldvalue == "object"  ){
			return requiredValidator(param);
		}
		if( typeof currentDateFieldValue == "object" && typeof otherDateFieldvalue != "object"  ){
			return requiredValidator(definedValue);
		}
		return flag;
	};
	
	var dateLessThanValidator = function(param, definedValue){
		var fieldValue = $rootScope.$eval(param);
		var flag = true; 
		fieldValue = getStringifiedDate(fieldValue);
		definedValue = getStringifiedDate(definedValue);
		if(fieldValue > definedValue){
			$rootScope.pageErrorArr[param] = "dateLessThan";
			flag = false; 
		}
		return flag;
	};
	
	var dateGreaterThanValidator = function(param, definedValue){
		var fieldValue = $rootScope.$eval(param);
		var flag = true; 
		fieldValue = getStringifiedDate(fieldValue);
		definedValue = getStringifiedDate(definedValue);
		if(fieldValue < definedValue){
			$rootScope.pageErrorArr[param] = "dateGreaterThan";
			flag = false; 
		}
		return flag;
	};
	
	var dateLessThanVarValidator = function(param, variable){
		var fieldValue = $rootScope.$eval(param);
        var flag = true;
                                            
        if(fieldValue === null || fieldValue.length === 0){
            $rootScope.pageErrorArr[param] = "required";
            flag = false;
        } else {
            var variableFieldValue = $rootScope.$eval(variable);
            if(variableFieldValue === null || variableFieldValue.length === 0){
              $rootScope.pageErrorArr[variable] = "required";
              flag = false;
            } else {
                if(getStringifiedDate(fieldValue)  > getStringifiedDate(variableFieldValue)){
                    $rootScope.pageErrorArr[param] = "dateLessThanVar";
                    flag = false;
                }
            }
        }

		return flag;
	};
	
	var dateGreaterThanVarValidator = function(param, variable){
                                            
		var fieldValue = $rootScope.$eval(param);
        var flag = true;
                                            
        if(fieldValue === null || fieldValue.length === 0){
           $rootScope.pageErrorArr[param] = "required";
           flag = false;
        } else {
            var variableFieldValue = $rootScope.$eval(variable);
            if(variableFieldValue === null || variableFieldValue.length === 0){
                $rootScope.pageErrorArr[variable] = "required";
                flag = false;
            } else {
                variableFieldValue = getStringifiedDate(variableFieldValue);
                if(getStringifiedDate(fieldValue) < variableFieldValue){
                    $rootScope.pageErrorArr[param] = "dateGreaterThanVar";
                    flag = false;
                }
            }
        }
		return flag;
	};
	
	var validDateValidator = function(param){
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
	};
	
	var conditionalDateGreaterThanVarValidator = function(param, conditionVar, variable) {

		var fieldValue = $rootScope.$eval(conditionVar);
		var fromDate = $rootScope.$eval(param);
		var toDate = $rootScope.$eval(variable);

		if (fieldValue === null || fieldValue == "null" || fieldValue.length === 0) {
			return dateGreaterThanVarValidator(param, variable);
		}
		else
		{
			if ( fromDate !== "" &&  toDate !== "" ) {
				return dateGreaterThanVarValidator(param,variable);
			} 
		}

		return true;
	};
	
	var dateGreaterThanNowValidator = function(param){
		var currDate = new Date();
		var fieldValue = $rootScope.$eval(param);
		var flag = true; 
		if(fieldValue === "" || fieldValue > currDate){
			$rootScope.pageErrorArr[param] = "dateGreaterThanNow";
			flag = false; 
		}
		return flag;
	};
	
	var checkForDateGreaterThanCurrentDate = function(param){
		var currDate = new Date();
		var fieldValue = $rootScope.$eval(param);
		var flag = true; 
		if(fieldValue > currDate){
			flag = false; 
		}
		return flag;
	};
	
	var dateGreaterThanFromDateNowValidator = function(param){
		flag = checkForDateGreaterThanCurrentDate(param);
		
		if(!flag){
			$rootScope.pageErrorArr[param] = "dateGreaterThanFromDateNow";
			flag = false; 
		}
		return flag;
		
	};
	
	var dateGreaterThanToDateNowValidator = function(param){
		flag = checkForDateGreaterThanCurrentDate(param);
		
		if(!flag){
			$rootScope.pageErrorArr[param] = "dateGreaterThanToDateNow";
			flag = false; 
		}
		return flag;
	};
	
	var dateGreaterThanNowAndEqualValidator = function(param){
		var currDate = new Date();
		currDate = currDate.clearTime();
		var fieldValue = $rootScope.$eval(param);
		var flag = true; 
		if(fieldValue === "" || fieldValue < currDate){
			$rootScope.pageErrorArr[param] = "dateGreaterThanNowAndEqual";
			flag = false; 
		}
		return flag;
	};
	
	var dateLessThanNowValidator = function(param){
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
	};
	
	var futureDateCheckValidator = function(param){
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
	};
	
	var futureDateCheckTwoValidator = function(param){
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
	};
	
	self.parseDate = function(input) {

		if(input == ""){
			return input;
		}
		else{
			input = input + "";
			var parts = input.split('-');

			return new Date(parts[0], parts[1] - 1, parts[2]);
		}
	};
	
	self.parseDateTwo = function(input) {

		if(input == ""){
			return input;
		}
		else{
			input = input + "";
			var parts = input.split('-');

			return new Date(parts[2], parts[0] - 1, parts[1]);
		}
	};

	
	var lessThanOptionalValidator = function(param, variable){
		var fieldValue = $rootScope.$eval(param);
		var flag = true; 
		if(fieldValue !== null || fieldValue.length !== 0){
			var variableFieldValue = $rootScope.$eval(variable);
			if(variableFieldValue !== null || variableFieldValue.length !== 0)
				if(parseFloat(variableFieldValue) < parseFloat(fieldValue)){
					errorMsg=errorObj[validationType]+variableFieldValue;
            		$rootScope.pageErrorArr[param] = "lessThanOptional";
        			flag = false;
				}
		}
		return flag;
	};
	
	var atleatOneFieldSelectedValidator = function(param, secondField,selectedStatus){
		var fieldValue = $rootScope.$eval(param);
		var secondFieldValue = $rootScope.$eval(secondField);
		var status = $rootScope.$eval(selectedStatus);
		var flag = true; 
		if(fieldValue === '' && secondFieldValue === '' && status ){
			$rootScope.pageErrorArr[param] = "atleatOneFieldSelected";
			requiredValidator(param);
			requiredValidator(secondField);
			flag = false; 
		}
		return flag;
	};
	
	var atleatOneYearFieldSelectedValidator = function(param, month1,day2,month2,day3,month3,day4,month4,day5,month5,day6,month6,selectedStatus){
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
			requiredValidator(param);
			requiredValidator(month1);
			flag = false; 
		}
		return flag;
	};
	
	
	var getStringifiedDate = function(value){
		var data = (value.toString()).split("-");
		var returnData = parseInt(data[0]) * 365 + parseInt(data[1]) * 30 + parseInt(data[2]);
		return returnData;
	}; 
	
	
    var isEmailValidator = function(value){
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
    };
    
    
    var isAlphaNumericValidator = function(value){
    	var fieldValue = $rootScope.$eval(value);
		var flag = true;
		var regex = /^[a-zA-Z0-9]*$/;
		//Bug fix for 1743
		if(fieldValue !== ''){
		flag = regex.test(fieldValue);
		}
		
	    if(!flag){
//	    	$rootScope.pageErrorArr[value] = "Not Alphanumeric";
	    	$rootScope.pageErrorArr[value] = "isAlphaNumeric";
	    }
	    return flag;
    	
    };
    
    var isDayGreaterThanThirtyValidator = function(param,value){
    	var monthFieldValue = $rootScope.$eval(value);
    	var fieldValue = $rootScope.$eval(param);
		var flag = true;
		
	    if(fieldValue > 31 && monthFieldValue !== '' && monthFieldValue !== null && monthFieldValue != "null" ){
	    	flag = false;
	    	$rootScope.pageErrorArr[param] = "Invalid date";
	    }
	    return flag;
    	
    };
    
    var isEmailNotReqValidator = function(value){
    	var fieldValue = $rootScope.$eval(value);
		var flag = true;
		var regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    if(fieldValue.length>0 || fieldValue !== "")
	    	flag = regex.test(fieldValue);
	    if(!flag){
	    	$rootScope.pageErrorArr[value] = "Invalid Email";
	    }
	    return flag;
    };
    
    
    var isPhnNumberNotReqValidator = function(value){
    	var fieldValue = $rootScope.$eval(value);
		var flag = true;
		var regex =/(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]‌​)\s*)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)([2-9]1[02-9]‌​|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})\s*(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+)\s*)?$/;
	    if(fieldValue.length>0 || fieldValue !== "")
	    	flag = regex.test(fieldValue);
	    if(!flag){
	    	$rootScope.pageErrorArr[value] = "Invalid Contact";
	    }
	    return flag;
    };
    
    var isMobNumberNotReqValidator = function(value){
    	var fieldValue = $rootScope.$eval(value);
		var flag = true;
		var regex =/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/;
	    if(fieldValue.length>0 || fieldValue !== "")
	    	flag = regex.test(fieldValue);
	    if(!flag){
	    	$rootScope.pageErrorArr[value] = "Invalid Contact";
	    }
	    return flag;
    };
    
    var isPasswordValidator = function(value){
    	var fieldValue = $rootScope.$eval(value);
		var flag = true;
		var regex = /^[A-Za-z0-9]{8,}$/; 
	    flag = regex.test(fieldValue);
	    if(!flag){
	    	$rootScope.pageErrorArr[value] = "Invalid Password";
	    	flag = false;
	    }
	    return flag;
    };
    
	var lengthEqualsValidator = function(param, variable){
		var fieldValue = $rootScope.$eval(param);
		var flag = true; 
		fieldValue += "";
		if(fieldValue.length != variable){
			errorMsg=errorObj[validationType]+variable;
			$rootScope.pageErrorArr[param] = "lengthNotEquals";
			flag = false;
		}
		return flag;
	};
	
	var nonEmptylengthEqualsValidator = function(param, variable){
		var fieldValue = $rootScope.$eval(param);
		var flag = true; 
		fieldValue += "";
		if(fieldValue !== '' && fieldValue!='undefined' && fieldValue!='null'){
		if(fieldValue.length != variable){
			errorMsg=errorObj[validationType]+variable;
			$rootScope.pageErrorArr[param] = "nonEmptylengthNotEquals";
			flag = false;
		}
	}
		return flag;
	};
	
	var lengthEqualsNotReqValidator = function(param, variable){
		var fieldValue = $rootScope.$eval(param);
		var flag = true; 
		fieldValue += "";
		if(fieldValue!="null"){
		if(fieldValue.length>0 || fieldValue !== "" ){
		if(fieldValue.length != variable){
			errorMsg=errorObj[validationType]+variable;
			$rootScope.pageErrorArr[param] = "lengthNotEqualsAndNotMandetory";
			flag = false;
		}
		}
	}
		return flag;
	};
	
	var validateBasedOnIndex = function(param, variable){
		var fieldValue = $rootScope.$eval(param);
		var data = $rootScope.$eval(variable);
		var flag = true; 
		for(var index=0; index < data.length; index ++)
			{
				
		//flag=false;
			flag=mandatoryAndNonZeroValidator(param+"["+data[index]+"]");
					
				}
			
		return flag;
	};
	var rqdValidateBasedOnIndex = function(param, variable){
		var fieldValue = $rootScope.$eval(param);
		var data = $rootScope.$eval(variable);
		var flag = true; 
		for(var index=0; index < data.length; index ++)
			{
				
		//flag=false;
			flag=mandatoryValidator(param+"["+data[index]+"]");
					
				}
			
		return flag;
	};
	
	var arrayBasedOnKeyValidator = function(param, key, stepUpAuthString,selectedQuestions,questions){
		var fieldValue = $rootScope.$eval(key);
		var selectedQuestions = $rootScope.$eval(selectedQuestions);
		var questions = $rootScope.$eval(questions);
		//var data = $rootScope.$eval(variable);
		var flag = true; 
		stepUpAuthString=$rootScope.$eval(stepUpAuthString);
		if(stepUpAuthString==$rootScope.appLiterals.APP.CONSTANTS.SECURITY_QUESTIONS){
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
		if(stepUpAuthString==$rootScope.appLiterals.APP.CONSTANTS.SET_SECURITY_QUESTIONS){
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
	};
	
	var validateBasedOnArrayValidation = function(param){
		var fieldValue = $rootScope.$eval(param);
		//var data = $rootScope.$eval(variable);
		var flag = true; 
		for(var index=0; index < fieldValue.length; index ++)
			{
				if(fieldValue[index] === null || fieldValue[index] === "" || fieldValue[index] == "null" || fieldValue[index].toString() == "NaN" )
					{
						flag=false;
						$rootScope.pageErrorArr[param+"["+index+"]"] = "indexEmptyField";
						//requiredValidator(param+"["+index+"]");
					}
			}
		return flag;
	};
	
	var validateNonZeroArrayValidation = function(param){
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
	};
	
	var fieldValueVariableValidator = function(param, field, value, variable){
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
					$rootScope.pageErrorArr[objName] = "required";
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
	};
	
	var fieldValueValidator=function(param, field, value, variable){ 
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
//			else{
//				if(objValue == null || objValue.length == 0 || objValue == "null"){
//					$rootScope.pageErrorArr[objName] = "required";
//					flag = flag && false;
//				}
//			}
		}
		return flag;
	};
	
	var requiredIfPresentInArrayValidator=function(param,variable){
		var fieldValue = $rootScope.$eval(param);
		var count=$rootScope.$eval(variable);
		for(var index=0; index < count; index++) {
			if(fieldValue[index] === null || fieldValue[index].length === 0){
				var appendedParam=param+"["+index+"]";
				$rootScope.pageErrorArr[param] = "required";
				flag = false;
			}

			return flag;
		}
	};
	
//	var conditionalLabelNumeric = function(param, conditionVar) {
//
//		var fieldValue = $rootScope.$eval(conditionVar);
//
//		if (fieldValue.toLowerCase() == "numeric" || fieldValue == "Numeric") {
//			return lengthEqualsValidator(param,10);
//		} 
//
//		return true;
//	};
	
	var startValueValidator=function(param,value){
		var fieldValue = $rootScope.$eval(param) +'';
		var cmpValue='^'+ $rootScope.$eval(value)+'';
         flag=true;
			if(fieldValue.match(cmpValue)){
				$rootScope.pageErrorArr[param] = "notValid";
				flag = false;
			}
			return flag;
	};
	
	var specialCharaterValidator=function(param){
		var fieldValue = $rootScope.$eval(param) +'';
		flag=true;
		if(/^[a-zA-Z0-9- ]*$/.test(fieldValue) === false) {
			$rootScope.pageErrorArr[param] = "notValid";
			flag = false; 
		}
		return flag;
	};
	var alphabetsOnly=function(param){
		var fieldValue = $rootScope.$eval(param) +'';
		flag=true;
		if(/^[a-zA-Z ]*$/.test(fieldValue) === false) {
			$rootScope.pageErrorArr[param] = "notValid";
			flag = false; 
		}
		return flag;
	};
	
	var isNumericPasswordValidator=function(param){
		var fieldValue = $rootScope.$eval(param) +'';
		flag=true;
		if(/^[0-9]*$/.test(fieldValue) === false) {
			$rootScope.pageErrorArr[param] = "isNumericPassword";
			flag = false; 
		}
		return flag;
	};
	
	var isAlphaNumericWithSpaceValidator=function(param){
		var fieldValue = $rootScope.$eval(param) +'';
		flag=true;
		if(/^[a-zA-Z0-9 ]*$/.test(fieldValue) === false) {
			$rootScope.pageErrorArr[param] = "isAlphaNumericWithSpace";
			flag = false; 
		}
		return flag;
	};
	
	var isAlphaNumericWithSpaceAndDotValidator=function(param){
		var fieldValue = $rootScope.$eval(param) +'';
		flag=true;
		if(/^[.a-zA-Z0-9 ]*$/.test(fieldValue) === false) {
			$rootScope.pageErrorArr[param] = "isAlphaNumericWithSpaceAndDot";
			flag = false; 
		}
		return flag;
	};
	
	var isAlphaNumericWithUnderScoreValidator=function(param){
		var fieldValue = $rootScope.$eval(param) +'';
		flag=true;
		if(/^[a-zA-Z0-9_]*$/.test(fieldValue) === false) {
			$rootScope.pageErrorArr[param] = "isAlphaNumericWithUnderScore";
			flag = false; 
		}
		return flag;
	};
	
	var dateYearLimitValidator=function(param){
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
	};
	
	var cardExpiryYearAndMonthValidator=function(param,year){
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
	};
	
	var stringDateYearLimitValidator=function(param){
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
			
			if(/-/g.test(fieldValue)){
				year=fieldValue.split('-')[0];	
			}
			else{
				year=fieldValue.getFullYear();	
			}
			
			if(year === "" || year > 10000 || year < 1900 ) {
					$rootScope.pageErrorArr[param] = "stringDateYearLimit";
					flag = false; 
			}			
		}
		return flag;
	};
	
	var ifValuethanNumberValidator=function(param){
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
	};
	
	/*
	 * Three inputs are required here in this module. 
	 * argument[0] - Is the field value
	 * argument[1] - Is the comparative value
	 * argument[2] - Macro for mathematical operation to be performed
	 */
	var numericValueLogicValidator = function(){
//		Three inputs are expected.
		if(arguments.length != 3){
			return false;
		}
		var fieldValue = $rootScope.$eval(arguments[0]);
		var comparativeValue = $rootScope.$eval(arguments[1]);
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
				errorMsg=errorObj[validationType]+comparativeValue;// Added
//				var label = $rootScope.$eval(arguments[3]);
//				$rootScope.pageErrorArr[arguments[0]] = $rootScope.appLiterals.APP.RAKERRORMSG[label];
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
	};
	
	self.parseDate = function(input) {

		if(input == ""){
			return input;
		}
		else{
			input = input + "";
			var parts = input.split('-');

			return new Date(parts[0], parts[1] - 1, parts[2]);
		}
	};
	
	self.parseDateTwo = function(input) {

		if(input == ""){
			return input;
		}
		else{
			input = input + "";
			var parts = input.split('-');

			return new Date(parts[2], parts[0] - 1, parts[1]);
		}
	};
	var conditionalValidDateValidator = function(param, conditionVar){
		var fieldValue = $rootScope.$eval(conditionVar);
	
		if (fieldValue === null || fieldValue == "null" || fieldValue === true || fieldValue.length === 0) {
			return validDateValidator(param);
		}

		return true;
	};



	//RAK:3: : Added to check Account ID is selected or not for RVC START
	var rakValConditionalRequiredValidator  = function(param, conditionVar1, conditionVar2){
		var acctId = $rootScope.$eval(param);
		var radioOptionAvailable = $rootScope.$eval(conditionVar1);
		var radioBtnClicked = $rootScope.$eval(conditionVar2);
		var flag = true;

		if (radioOptionAvailable === false && radioBtnClicked=== false ) {
			return requiredValidator(acctId);
		}
		if (radioOptionAvailable === true && radioBtnClicked=== true ) {
			return requiredValidator(acctId);
		}
		if (radioOptionAvailable === true && radioBtnClicked=== false ) {
			return flag;
		}

	}

	//RAK:3: : Added to check Account ID is selected or not for RVC END
	//RAK:3: : added to validate from date validations in Credit Card Physical Stmt Request : START


	var errorObj='';
    var errorMsg='';
    var validationType='';


	var fromPeriodOlderThanVarValidator = function(fromYear, fromMonth, yearRange){
		var param1 = $rootScope.$eval(fromYear);
		var param2 = $rootScope.$eval(fromMonth);
		var limit = $rootScope.$eval(yearRange);

		if(param1 === null || param1.length === 0){
	           $rootScope.pageErrorArr[fromYear] = "required";
	           flag = false;
	    }
		if(param2.length === 0||param2 === null){
	           $rootScope.pageErrorArr[fromMonth] = "required";
	           flag = false;
	    }
		else if(limit === null || limit.length === 0){
	           $rootScope.pageErrorArr[yearRange] = "required";
	           flag = false;
	    }
		else{
			var today = new Date();
			var today_month = today.getMonth();
			var today_year = today.getFullYear();

			var flag = true;

			var todayMonths = (today_year - 1)* 12 + today_month;
			var fromMonths = Number(param1 - 1) * 12 + Number(param2);

			if((todayMonths - fromMonths)> Number(limit)){
				flag = false;
			}
			return flag;
		}
	};

	var dateGreaterThanCurrentDateValidator = function(param,conditionVar){

		var fieldValue = $rootScope.$eval(param);
		var year = $rootScope.$eval(conditionVar);
        var flag = true;

        if(fieldValue === null || fieldValue.length === 0){
           $rootScope.pageErrorArr[param] = "required";
           flag = false;
        }
        else if(year === null || year.length === 0){
        	$rootScope.pageErrorArr[conditionVar] = "required";
            flag = false;
        }
        else {
        	var today = new Date();
        	var today_month = today.getMonth();
	   		var today_year = today.getFullYear();

	   		if(Number(year)== today_year){
	   			if(Number(fieldValue) > today_month){
	   				$rootScope.pageErrorArr[param] = "dateGreaterThanCurrentDate";
	   				flag = false;
	   			}
	   		}
	   		else{
	   			if(Number(year) > today_year){
	   				$rootScope.pageErrorArr[param] = "dateGreaterThanCurrentDate";
	   				flag = false;
	   			}
           }
        }
		return flag;
	};

	var fromDateGreaterThanToDateValidator = function(param, conditionVar1, conditionVar2, conditionVar3){

		var fieldValue = $rootScope.$eval(param);
		var fromYear = $rootScope.$eval(conditionVar1);
		var fromMonth = $rootScope.$eval(conditionVar2);
		var toMonth = $rootScope.$eval(conditionVar3);

        var flag = true;

        if(fieldValue === null || fieldValue.length === 0){
	           $rootScope.pageErrorArr[param] = "required";
	           flag = false;
	    }
        else if(fromYear === null || fromYear.length === 0){
	           $rootScope.pageErrorArr[conditionVar1] = "required";
	           flag = false;
	    }
        else if(fromMonth === null || fromMonth.length === 0){
        	$rootScope.pageErrorArr[conditionVar2] = "required";
	        flag = false;
        }
        else if(toMonth === null || toMonth.length === 0){
        	$rootScope.pageErrorArr[conditionVar3] = "required";
	        flag = false;
        }
        else {
        	if(fieldValue != fromYear){
	        	if(Number(fieldValue) < Number(fromYear)){
	        	   $rootScope.pageErrorArr[param] = "dateGreaterThanCurrentDate";
	               flag = false;
	        	}
	        }
	        else{
	        	if(Number(toMonth) < Number(fromMonth)){
	 	       	   $rootScope.pageErrorArr[param] = "dateGreaterThanCurrentDate";
	 	           flag = false;
	 	       	}
        	}
        }
		return flag;
	};

	//RAK:3: : added to validate from date validations in Credit Card Physical Stmt Request : END



	//RAK:3: : added to check if the field value contains & or not in Opr Acct Balance COnfirmation Request : START
	var containsSpecialCharValidator = function(param,conditionVar){
		var fieldValue = $rootScope.$eval(param);
		//var specialChar = $rootScope.$eval(conditionVar);
		var flag = true;
		if(fieldValue.indexOf('&')>-1){
			$rootScope.pageErrorArr[param] = "containsSpecialChar&";
   			flag = false;
   		}
		return flag;
	}

	//RAK:3: : added to check if the field value contains & or not in Opr Acct Balance COnfirmation Request : END


	//RAK:3: : added to validate the DND Time for Alert Pref Req : START
	var dndTimeValidator = function (param,conditionVar){
		var dndTimeFrom = $rootScope.$eval(param);
		var dndTimeTo = $rootScope.$eval(conditionVar);
		var flag = true;

		if(dndTimeFrom==""&& dndTimeTo=="")
			return flag;

		/*if(dndTimeFrom == null || dndTimeFrom.length == 0 || dndTimeFrom == "null" || dndTimeFrom <= 0 || isNaN(dndTimeFrom) ||dndTimeTo == null || dndTimeTo.length == 0 || dndTimeTo == "null" || dndTimeTo <= 0 || isNaN(dndTimeTo)){
			flag=false;
			return flag;
		}*/

		if (dndTimeFrom > dndTimeTo || dndTimeFrom==dndTimeTo )
			flag = false;

		return flag;
	};

	var rakDNDTimeConditionalRequiredValidator = function(param, conditionVar) {
		var fieldValue = $rootScope.$eval(conditionVar);
		var paramValue = $rootScope.$eval(param);
		if(paramValue==""&& fieldValue=="")
			return true;

		if (fieldValue == null || fieldValue == "null" || fieldValue == true || fieldValue.length == 0) {
			return requiredValidator(param);
		}

		return true;
	};

	var rakDNDTimeValueClashValidator = function(param, conditionVar1, conditionVar2, conditionVar3){
		var paramValue = $rootScope.$eval(param);
		var conditionVar1Value = $rootScope.$eval(conditionVar1);
		var conditionVar2Value = $rootScope.$eval(conditionVar2);
		var conditionVar3Value = $rootScope.$eval(conditionVar3);
		var flag = true;

		if(paramValue == "")
			return flag;

		if(paramValue == conditionVar1Value ||paramValue == conditionVar2Value||paramValue == conditionVar3Value)
			flag = false;

		return flag;
	};

	//RAK:3: : added to validate the DND Time for Alert Pref Req : END

	//RAK:3: : added to check the Account No length in Online Registration :START

	var acctNumberLengthValidator = function(param,conditionVar){
		var fieldValue = $rootScope.$eval(param);
		var conditionFlag = $rootScope.$eval(conditionVar);
		var length = 0;
		var flag = true;

		for(var i = fieldValue ; i > 1; ++i){
		     ++length;
		     i = Math.floor(i/10);
		}

		if(conditionFlag == 'A'){
			if(length != 13)
				flag = false;
		}
		if(conditionFlag == 'C'||conditionFlag == 'D'){
			if(length != 16)
				flag = false;
		}
		if(conditionFlag == 'true'){
			if(length != 14)
				flag = false;
		}
		return flag;
	}

	//RAK:3: : added to check the Account No length in Online Registration :END

	//RAK:3: : added to validate password in Online Registration :START

	var conditionalRequiredForPasswordFieldValidator = function(param,conditionVar1){
		var fieldValue = $rootScope.$eval(param);
		var conditionVar1Value = $rootScope.$eval(conditionVar1);
		//var conditionVar2Value = $rootScope.$eval(conditionVar2);

		var flag = true;

		if(conditionVar1Value == "ORON"){
			if(fieldValue == null || fieldValue.length == 0 || fieldValue == "null"){
				$rootScope.pageErrorArr[param] = "conditionalRequiredForPasswordField";
				flag = false;
			}
		}
		if(conditionVar1Value == "FPON"){
			
				if(fieldValue == null || fieldValue.length == 0 || fieldValue == "null"){
					$rootScope.pageErrorArr[param] = "conditionalRequiredForPasswordField";
					flag = false;
			
			}
		}
		return flag;
	}

	//RAK:3: : added to validate password in Online Registration :START

	//RAK:3: : added to validate UserId & Email fields in Online Registration :START
	var conditionalRequiredForORONReqFieldValidator = function(param,conditionVar){
		var fieldValue = $rootScope.$eval(param);
		var conditionVarValue = $rootScope.$eval(conditionVar);
		var flag = true;

		if(conditionVarValue)
		{
			if(fieldValue == null || fieldValue.length == 0 || fieldValue == "null"){
				$rootScope.pageErrorArr[param] = "conditionalRequiredForORONReqField";
				flag = false;
			}
		}
		return flag;
	}

	//RAK:3: : added to validate UserId & Email fields in Online Registration :START


	var requiredValidator = function(param){
		var fieldValue = $rootScope.$eval(param);
		var flag = true; 
		/* fix for 770724 added undefined condition */
		if(fieldValue===undefined || fieldValue === null || fieldValue.length === 0 || fieldValue == "null"){
		$rootScope.pageErrorArr[param] = "emptyField";
		flag = false; 
		}
		return flag;
		};
	//Rak : Added for Array required Validator


	var arrayAllRequiredValidator = function(param,fullLength){
		var fieldValue = $rootScope.$eval(param);
		var flag = true;
		var size=$rootScope.$eval(fullLength);
		var arrayLength=size.length;

		if( fieldValue === null || fieldValue.length == 0){
			$rootScope.pageErrorArr[param+"["+0+"]"] = "required";
			flag = false;
		}

		for(var index=0; index <= (arrayLength-1); index ++)
		{
			if (fieldValue[index] === null|| fieldValue[index] === undefined || fieldValue[index] === "" || fieldValue[index] === 0 || fieldValue[index] == "null"||fieldValue[index] == " ")
				{
				flag = false;
				$rootScope.pageErrorArr[param+"["+index+"]"] = "required";
				}
			}
		return flag;
	};

	//RAK DEV CHNAGES FOR UNDEFINED STRINGS FOR REQUIRED VALIDTORS START
	var undefinedRequiredValidator = function(param){
		var fieldValue = $rootScope.$eval(param);
		var flag = true;
		if(fieldValue===undefined || fieldValue === null || fieldValue.length === 0 || fieldValue == "null"||fieldValue == " "){
			$rootScope.pageErrorArr[param] = "required";
			flag = false;
		}
		return flag;
	};
	//RAK DEV CHNAGES FOR UNDEFINED STRINGS FOR REQUIRED VALIDTORS END





	var specialCharValidator = function(param){
		var fieldValue = $rootScope.$eval(param)+'';
		var flag = true;
		var regex = /[*:?><\\[\\]!”~|]/;
		if(fieldValue===undefined || fieldValue === null || fieldValue.length === 0 || fieldValue == "null" || fieldValue <= 0 ||fieldValue === 0 || fieldValue==="0" || fieldValue==="" || fieldValue <= 0 || fieldValue === 0 || fieldValue==="0" || fieldValue==="" || fieldValue <= 0 ||(regex.test(fieldValue) == true)){

			$rootScope.pageErrorArr[param] = "Enter valid Input";
			flag = false;

		}

		return flag;
	};

		///RAK added by  for date field validation


	var rakDateLessThanNowValidator = function(param){
		var fieldValue = $rootScope.$eval(param);
		//fieldValue = moment(fieldValue);
		//var currDate = moment(new Date());
		var currDate =new Date();
		currDate = currDate.clearTime();
		var flag = true;
		if(fieldValue=="" || fieldValue <= currDate || fieldValue.compareTo(currDate) < 0){
			$rootScope.pageErrorArr[param] = "rakDateLessThanNow";
			flag = false;
		}
		return flag;
	};
	// Added for time Validation

	var rakTimeValidator = function(param){
		var fieldValue = $rootScope.$eval(param);
		var data = (fieldValue.toString()).split(":");

		if(fieldValue=="" || fieldValue.indexOf(':')!=2 || fieldValue.length != 5 || isNaN(data[0])|| isNaN(data[1]) || data[0].length != 2 || data[1].length != 2 || data[0]> 24 || data[1]> 60){
			$rootScope.pageErrorArr[param] = "rakTimeValidator";
			flag = false;
		}
		return flag;
	};



// End



	//RAK DEV CHANGES MAKING CUSTOM LESS THAN AND NON ZERO VALIDATOR START
	var lessThanOptionalNonZeroValidator = function(param, variable){
		var fieldValue = $rootScope.$eval(param);
		var flag = true;
		if(fieldValue != null || fieldValue.length != 0){
			var variableFieldValue = $rootScope.$eval(variable);
			if(variableFieldValue != null || variableFieldValue.length != 0)
				if(parseFloat(fieldValue)<=0 || parseFloat(variableFieldValue) < parseFloat(fieldValue)){
            		$rootScope.pageErrorArr[param] = "lessThanOptional";
        			flag = false;
				}
		}
		return flag;
	};
	//RAK DEV CHANGES MAKING CUSTOM LESS THAN AND NON ZERO VALIDATOR END


		// added to check the special character for Cahneg NickName


	var validateBasedOnIndexSpecialCharCheck = function(param, variable){
		var fieldValue = $rootScope.$eval(param);
		var data = $rootScope.$eval(variable);
		var flag = true;
		for(var index=0; index < data.length; index ++)
			{

		//flag=false;
			flag=specialCharValidator(param+"["+data[index]+"]");

				}

		return flag;
	};


	/*RAK:2:-forBillersDynamicvalidation-Start*/

	var customfieldValueValidator=function(param, field, value, variable,pattern,patternFlag,isRequired,type,index){
		var fieldValue = $rootScope.$eval(param);
		var flag = true;


			var objName = param +"[" + index + "]" + "." + value;
			var objValue = $rootScope.$eval(objName) + '';

//			var sizeLength = parseInt(fieldValue[index].payeeInputSize);
//			if(!isNaN(sizeLength) && objValue.length > sizeLength){
//				$rootScope.pageErrorArr[objName] = "lengthNotEquals";
//				flag = flag && false;
//			}
//


			//Isrequired
			if(fieldValue[index].payeefieldIsRequired != null && fieldValue[index].payeefieldIsRequired != "undefined" && fieldValue[index].payeefieldIsRequired != ""){
				if(fieldValue[index].payeefieldIsRequired){
					if($rootScope.rakPayee.billerModel.displayName=='EMAAR' && fieldValue[index].label=='Others' && $rootScope.rakPayee.billerModel.consumercode0=='OTHR' && $rootScope.rakPayee.billerModel.consumercode1==''){
						flag=false;
					}
					if(objValue == null || objValue.length == 0 || objValue == "null"){
						$rootScope.pageErrorArr[objName] = $rootScope.appLiterals.APP.RAKERRORMSG.VALIDATORTYPEMSG['required'];
						flag = false;
					}
					if(!flag){
						return flag;
					}
				}

			}

			//Check spl chars
			if(fieldValue[index].payeeLabelType != null && fieldValue[index].payeeLabelType != "undefined" && fieldValue[index].payeeLabelType != "" && $rootScope.rakPayee.billerModel.displayName!='RAKTOLL-ABER'){


				if(fieldValue[index].payeeLabelType=="numeric"){
					var regExpNumeric=/^[0-9]*$/;
					flag=regExpNumeric.test(objValue);
					if(!flag){
						$rootScope.pageErrorArr[objName] = $rootScope.appLiterals.APP.RAKERRORMSG.VALIDATORTYPEMSG['numeric'];
						return flag;
					}


				}


				if(fieldValue[index].payeeLabelType=="alphaNumeric"){

				var regexalpha = /^[a-zA-Z0-9\s][a-zA-Z0-9\s]*$/;
			    flag = regexalpha.test(objValue);
			    if( $rootScope.rakPayee.billerModel.displayName=='EMAAR' && fieldValue[index].label=='Others'){
			    	if($rootScope.rakPayee.billerModel.consumercode0=='OTHR' && $rootScope.rakPayee.billerModel.consumercode1==''){
						flag=false;
					}
			    	else{
			    		flag=true;
			    	}
			    }

			    if(!flag){
			    	$rootScope.pageErrorArr[objName] = $rootScope.appLiterals.APP.RAKERRORMSG.VALIDATORTYPEMSG['isAlphaNumeric'];
			    	return flag;
			      }
				}
			}

			//maxlength

			if(fieldValue[index].payeeInputSize != null && fieldValue[index].payeeInputSize != "undefined" && fieldValue[index].payeeInputSize != ""){
				if( objValue.toString().length > fieldValue[index].payeeInputSize ){
	                //errorMsg=errorObj[validationType]+fieldValue[index].payeeInputSize;
	                $rootScope.pageErrorArr[objName] = $rootScope.appLiterals.APP.RAKERRORMSG.VALIDATORTYPEMSG['maxLength']+fieldValue[index].payeeInputSize;
	                flag = false;
				}
			}

			//Pattern
			/*if(fieldValue[index].patternFlag != null && fieldValue[index].pattern != "undefined" && fieldValue[index].patternFlag != ""){
				if(fieldValue[index].patternFlag){
					if(fieldValue[index].pattern != null && fieldValue[index].pattern != "ALL" && fieldValue[index].pattern != "undefined" && fieldValue[index].pattern != ""){
						var regex =fieldValue[index].pattern;
						switch(regex){
						case "^[0-9]{5,8}$":
							regex=/^[0-9]{5,8}$/;
							flag = regex.test(objValue);
							break;
						case "^[0-9]{8,9}$":
							regex=/^[0-9]{8,9}$/;
							flag = regex.test(objValue);
							break;
						case "^[0-9]{10}$":
							regex=/^[0-9]{10}$/;
							flag = regex.test(objValue);
							break;
					    default:
						    break;
						}

//					    flg = regex.test(objValue);
					    if(!flag){
					    	$rootScope.pageErrorArr[objName] = "Invalid";
					    	return flag;
					    }
					}
				}
			}*/


		return flag;
	};
	/*RAK:2:-forBillersDynamicvalidation-End*/




	var QuickPayCustomfieldValueValidator=function(param, field, value, variable,pattern,patternFlag,isRequired,type,index){
		var fieldValue = $rootScope.$eval(param);
		var flag = true;


			var objName = param +"[" + index + "]" + "." + value;
			var objValue = $rootScope.$eval(objName) + '';


			//Isrequired
			if(fieldValue[index].payeefieldIsRequired != null && fieldValue[index].payeefieldIsRequired != "undefined" && fieldValue[index].payeefieldIsRequired != ""){
				if(fieldValue[index].payeefieldIsRequired){
					if($rootScope.rakPayee.billerModel.displayName=='EMAAR' && fieldValue[index].label=='Others' && $rootScope.rakPayee.billerModel.consumercode0=='OTHR' && $rootScope.rakPayee.billerModel.consumercode1==''){
						flag=false;
					}
					if(objValue == null || objValue.length == 0 || objValue == "null"){
						$rootScope.pageErrorArr[objName] = $rootScope.appLiterals.APP.RAKERRORMSG.VALIDATORTYPEMSG['required'];
						flag = false;
					}
					if(!flag){
						return flag;
					}
				}

			}

			//Check spl chars
			if(fieldValue[index].payeeLabelType && $rootScope.rakPayee.quickPay.billerList[$rootScope.rakPayee.quickPay.selectedBiller].billerName!=$rootScope.rakPayee.constants.RAKTOLL){

				if(fieldValue[index].payeeLabelType=="numeric"){
					var regExpNumeric=/^[0-9]*$/;
					flag=regExpNumeric.test(objValue);
					if(!flag){
						$rootScope.pageErrorArr[objName] = $rootScope.appLiterals.APP.RAKERRORMSG.VALIDATORTYPEMSG['numeric'];
						return flag;
						
					}


				}


				if(fieldValue[index].payeeLabelType=="alphaNumeric"){

				var regexalpha = /^[a-zA-Z0-9\s][a-zA-Z0-9\s]*$/;
			    flag = regexalpha.test(objValue);
			    if( $rootScope.rakPayee.billerModel.displayName=='EMAAR' && fieldValue[index].label=='Others'){
			    	if($rootScope.rakPayee.billerModel.consumercode0=='OTHR' && $rootScope.rakPayee.billerModel.consumercode1==''){
						flag=false;
					}
			    	else{
			    		flag=true;
			    	}
			    }

			    if(!flag){
			    	$rootScope.pageErrorArr[objName] = $rootScope.appLiterals.APP.RAKERRORMSG.VALIDATORTYPEMSG['isAlphaNumeric'];
			    	return flag;
			      }
				}
			}

			//maxlength

			if(fieldValue[index].payeeInputSize != null && fieldValue[index].payeeInputSize != "undefined" && fieldValue[index].payeeInputSize != ""){
				if( objValue.toString().length > fieldValue[index].payeeInputSize ){
	                //errorMsg=errorObj[validationType]+fieldValue[index].payeeInputSize;
	                $rootScope.pageErrorArr[objName] = $rootScope.appLiterals.APP.RAKERRORMSG.VALIDATORTYPEMSG['maxLength']+fieldValue[index].payeeInputSize;
	                flag = false;
				}
			}




		return flag;
	};




		//RAK  added for checking flag value for conditional flow
	var  checkForFlagValue= function(conditionVar)
	{
		var fieldValue =  $rootScope.$eval(conditionVar)
		var flag = true;
if ( fieldValue != true)
	 flag= false;

		return flag;

	}
	//RAK  added for checking flag value for conditional flow

	//RAK DEV changes for conditional and greater than current Date start
	var conditionalDateGreaterValidator = function(param, conditionVar) {
         var fieldValue = $rootScope.$eval(conditionVar);
         var dateValue = $rootScope.$eval(param);
        var currDate =new Date();
  		currDate = currDate.clearTime();
  		var flag = true;
         if (fieldValue == null || fieldValue == "null" || fieldValue == true || fieldValue.length == 0) {

     		if(dateValue < currDate || dateValue.compareTo(currDate) < 0){
     			$rootScope.pageErrorArr[param] = "conditionalGreaterDate";
     			flag = false;
     		}

		}

        return flag;
	};
	//RAK DEV changes for conditional and greater than current Date end


	//Rak 

	var rakAmountMulitpleof100Validator = function(param){
		var fieldValue = $rootScope.$eval(param);
		var flag = true;

		if(parseFloat(fieldValue)!=null && parseFloat(fieldValue)%100!=0){
			$rootScope.pageErrorArr[param] = "rakAmountMulitpleof100";
			flag = false;
		}
		return flag;
	};

//Rak 

	var rakConditionalAmountMulitpleof10Validator = function(param, conditionVar){

		var condition = $rootScope.$eval(conditionVar);
		var flag = true;
		if (condition === null || condition == "null" || condition === true || condition.length === 0) {

			var fieldValue = $rootScope.$eval(param);

			if(parseFloat(fieldValue)!=null && parseFloat(fieldValue)%10!=0){
				$rootScope.pageErrorArr[param] = "rakConditionalAmountMulitpleof10";
				flag = false;
			}
		}
		return flag;
	};

	/*RAK:2:-DDS-Start*/
	var rakContainsPipeCharValidator = function(param,conditionVar){
		var fieldValue = $rootScope.$eval(param);
		var flag = true;
		if(fieldValue.indexOf('|')>-1)
			flag = false;
		return flag;
	};
	var rakMaxValueValidator = function(param,rakMaxValue){
		var fieldValue = $rootScope.$eval(param);
		var flag = true;
		if( typeof fieldValue != 'undefined' && fieldValue !== null ){
			if( fieldValue > rakMaxValue ){
				errorMsg=errorObj[validationType]+rakMaxValue;
				$rootScope.pageErrorArr[param] = "rakMaxValueValidator";
				flag = false;
			}
		}
		return flag;
	};
	//Added By  For Txn Change Limit Sr
	var rakMinValueValidator = function(param,rakMaxValue){
		var fieldValue = $rootScope.$eval(param); 
		var rakMaxiumValue = $rootScope.$eval(rakMaxValue); 
		var flag = true;
		if( typeof fieldValue != 'undefined' && fieldValue !== null ){
			if( fieldValue < rakMaxiumValue ){
				errorMsg=errorObj[validationType]+" "+rakMaxiumValue;
				$rootScope.pageErrorArr[param] = "rakMinValueValidator";
				flag = false; 
			}
		}
		return flag;
	};

	/*RAK:2:-DDS-End*/
	//added for chking special character -,^,%,"
	var rakContainsSpecialCharValidator = function(param){

		var fieldValue = $rootScope.$eval(param) +'';
		var flag = true;
		var regex = /^[-^%"]*$/;

	   // flag = regex.test(fieldValue);
	    if(regex.test(fieldValue)== true){
//
	    	$rootScope.pageErrorArr[param] = "rakContainsSpecialCharValidator";
	    	flag= false;
	    }
	    return flag;
	};
	
	var rakRestrictedSpecialCharValidator = function(param){
		
		var fieldValue = $rootScope.$eval(param);
		//var specialChar = $rootScope.$eval(conditionVar);
		var flag = true;
		if(fieldValue.indexOf('&')>-1){
			$rootScope.pageErrorArr[param] = "rakRestrictedSpecialCharValidator";
   			flag = false;
   		}
		return flag;

	/*	var fieldValue = $rootScope.$eval(param) +'';
		var flag = true;
		var regex = /\*|:|\?|\>|\<|\[|\]|\!|\"|\~|\|/;

	   // flag = regex.test(fieldValue);
	    if(regex.test(fieldValue)== true){
//
	    	$rootScope.pageErrorArr[param] = "rakRestrictedSpecialCharValidator";
	    	flag= false;
	    }
	    return flag;*/
	};
	

	//RAK  Added for  Special Character Check specific to Update Personal Profile
	//added for chking special character -,^,%,"

	// Required is disabled
	var rakUPDSpecialCharValidator = function(param){

		var fieldValue = $rootScope.$eval(param) +'';
		var flag = true;
		//var regex = /^[-^|%"]*$/;
		var regex=/[\^%|"]/;
	   // flag = regex.test(fieldValue);
	    if(fieldValue && regex.test(fieldValue)== true){
//
	    	$rootScope.pageErrorArr[param] = "rakUPDSpecialCharValidator";
	    	flag= false;
	    }
	    return flag;



	}

	///added for credit card validation

		var lengthEqualsMaxValidator = function(param, maxLength){

			var fieldValue = $rootScope.$eval(param);
		var flag = true;

		if( typeof fieldValue != 'undefined' && fieldValue !== null ){
			if( fieldValue.toString().length != maxLength ){
                      errorMsg=errorObj[validationType]+maxLength;
				$rootScope.pageErrorArr[param] = "lengthEqualsMax";
				flag = false;
			}
		}
		return flag;

	};
	
	//added for online registartion
	
	var conditionalMinLengthValidator = function(param,minLength,conditionVar){
		var conditionVarValue = $rootScope.$eval(conditionVar);
		var fieldValue = $rootScope.$eval(param);
		var flag = true;
		if(conditionVarValue){
		if( typeof fieldValue != 'undefined' && fieldValue !== null && fieldValue.length < minLength){
			
			$rootScope.pageErrorArr[param] = "conditionalMinLength";
			errorMsg=errorObj[validationType]+minLength;
			flag = false;
			
		}
		}
		return flag;
	};
	
	
	var conditionalMaxLengthValidator = function(param,maxLength,conditionVar){
		var conditionVarValue = $rootScope.$eval(conditionVar);
		var fieldValue = $rootScope.$eval(param);
		var flag = true;
if(conditionVarValue == "ORON"){
	
			if( typeof fieldValue != 'undefined' && fieldValue !== null  && fieldValue.toString().length > maxLength ){
			  errorMsg=errorObj[validationType]+maxLength;
				$rootScope.pageErrorArr[param] = "conditionalMaxLength";
				flag = false;
			}
		}
		return flag;
	};
	
	var conditionalIsEmailValidator = function(value,conditionVar){
		
		var conditionVarValue = $rootScope.$eval(conditionVar);
		var fieldValue = $rootScope.$eval(value);
		var flag = true;
		if(conditionVarValue){
		
		if(fieldValue !== '' && fieldValue!='undefined'){
		var regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    flag = regex.test(fieldValue);
	    if(!flag){
	    	$rootScope.pageErrorArr[value] = "conditionalIsEmail";
	    }
		}
		}
	    return flag;
		
	
	};
var conditionalIsNumericPasswordValidator = function(param,conditionVar){
		
		
		var conditionVarValue = $rootScope.$eval(conditionVar);
		var fieldValue = $rootScope.$eval(param)+'';
		var flag = true;
			if(conditionVarValue){
				if( typeof fieldValue != 'undefined' && fieldValue !== null){
				flag=true;
				if(/^[0-9]*$/.test(fieldValue) === false) {
					$rootScope.pageErrorArr[param] = "conditionalIsNumericPassword";
					flag = false;
				}
			}
			}
		
		return flag;
	};
	
	var moreThanPercentValidator = function(param,conditionVar){
		var fieldValue = parseInt($rootScope.$eval(param));
		var conditionVarValue = $rootScope.$eval(conditionVar);
		var flag = true;
		if (conditionVarValue){
			if(fieldValue > 100){

			$rootScope.pageErrorArr[param] = "moreThanPercent";
			flag = false;

		}
	}

		return flag;
	};

							//  added for Seam Less Login Password
							// validation START
							var isPasswordAlphanumericWithSpecialCharacterValidator = function(
									value) {
								var fieldValue = $rootScope.$eval(value);
								var flag = true;
								var regex = /^[A-Za-z0-9$&+,:;=?@#|'<>.^*()%!-]{8,}$/;
								flag = regex.test(fieldValue);
								if (!flag) {
									$rootScope.pageErrorArr[value] = "Invalid Password";
									flag = false;
								}
								return flag;
							};
							//  added for Seam Less Login Password
							// validation END
							//  added for Value1 less than Value2 START
							var rakValue1LessThanValue2Validator = function(param1,
									param2) {
								var fieldValue1 = $rootScope.$eval(param1);
								var fieldValue2 = $rootScope.$eval(param2);
								var flag = true;
								if (typeof fieldValue1 != 'undefined'
										&& fieldValue1 !== null && typeof fieldValue2 != 'undefined'
											&& fieldValue2 !== null) {
									if (fieldValue1 > fieldValue2) {
										errorMsg = errorObj[validationType]
												+ fieldValue2;
										$rootScope.pageErrorArr[param1] = "rakValue1LessThanValue2Validator";
										flag = false;
									}
								}
								return flag;
							};
							//  added for Value1 less than Value2 END
							//  added for Value1 same as Value2 START
							var rakValue1SameAsValue2Validator = function(param1,
									param2) {
								var fieldValue1 = $rootScope.$eval(param1);
								var fieldValue2 = $rootScope.$eval(param2);
								var flag = true;
								if (typeof fieldValue1 != 'undefined'
										&& fieldValue1 !== null && typeof fieldValue2 != 'undefined'
											&& fieldValue2 !== null) {
									if (fieldValue1 != fieldValue2) {
										errorMsg = errorObj[validationType];
										$rootScope.pageErrorArr[param1] = "rakValue1SameAsValue2Validator";
										flag = false;
									}
								}
								return flag;
							};
							//  added for Value1 same as Value2 END
							//  added for Check Box Flag Value validator START
							var rakValidateCheckBoxFlagValue = function(param, conditionVar){
								var fieldValue = $rootScope.$eval(param);
								var condition = $rootScope.$eval(conditionVar);
								//var data = $rootScope.$eval(variable);
								var flag = true;
								if (condition == null || condition == "null" || condition == true || condition.length == 0) {
								flag = false;
								for(var index=0; index < fieldValue.length; index ++)
								{
									if(fieldValue[index].flag === true || fieldValue[index].flag === "true")
									{
										flag=true;
										$rootScope.pageErrorArr[param+"["+index+"]"] = "Required";
										break;
										//requiredValidator(param+"["+index+"]");
									}
								}
								}
								return flag;
							};
							//  added for Check Box Flag Value validator END

	return{
		performValidation:function(parameters){
			//$q is used to return validation results to ActionProcessor
			//var deferred = $q.defer();
			
			//1. Iterate through the fields to be validated
			//2. Get the corresponding validations from the validation processor
			//3. Iterate through the validations 
			//4. Pass each validation to the corresponding validator.
			$rootScope.pageErrorMsg=[];
			$rootScope.pageErrorArr = [];
			$rootScope.pageErrorCode = [];
			errorObj=$rootScope.appLiterals.APP.RAKERRORMSG.VALIDATORTYPEMSG;

			var validationError = true;
			var focusSet = false;
			for (var i = 0; i < parameters.length; i++) {
				
				var validations = ValidationProcessor.getValidationsForField(parameters[i]);

				for (var j = 0; j < validations.length; j++) {
					errorMsg='';
					validationType=validations[j].validationType;
					var res = true;
					switch(validations[j].validationType){
						case "required":
							res = ExtValidationService.requiredValidator(parameters[i]);
							validationError =validationError && res;
							break;
							
						case "arrayAllRequired":
							res = arrayAllRequiredValidator(parameters[i],validations[j].key);
							validationError =validationError && res;
							break;
							
						case "requiredNonZero":
							res = ExtValidationService.requiredNonZeroValidator(parameters[i]);
							validationError =validationError && res;
							break;
							
						case "NonZeroifValueConditionally":
							res = ExtValidationService.NonZeroifValueConditionallyValidator(parameters[i],validations[j].conditionVar);
							validationError =validationError && res;
							break;
						
						case "conditionalRequired":
							res = ExtValidationService.conditionalRequiredValidator(parameters[i], validations[j].conditionVar);
							validationError =validationError && res;
							break;
						case "conditionalMandatory":
							res = ExtValidationService.conditionalMandatoryValidator(parameters[i], validations[j].conditionVar);
							validationError =validationError && res;
							break;
							
						case "conditionalRequiredForDate":
							res = ExtValidationService.conditionalRequiredForDateValidator(parameters[i], validations[j].conditionVar,validations[j].dateField);
							validationError =validationError && res;
							break;
							
						case "conditionalRequiredNull":
							res = ExtValidationService.conditionalRequiredNullValidator(parameters[i], validations[j].conditionVar);
							validationError =validationError && res;
							break;
							
						case "conditionalRequiredNotOne":
							res = ExtValidationService.conditionalRequiredNotOneValidator(parameters[i], validations[j].conditionVar);
							validationError =validationError && res;
							break;
							
						case "conditionalRequiredForForcePassword":
							res = ExtValidationService.conditionalRequiredValidatorForForcePasword(parameters[i], validations[j].conditionVar);
							validationError =validationError && res;
							break;
							
						case "conditionalParamEqualRequired":
							res = ExtValidationService.conditionalParamEqualValidator(parameters[i], validations[j].conditionVar,validations[j].valueEqual);
							validationError =validationError && res;
							break;	
								
						case "conditionalRequiredValidatorForTrueCondition":
							res = ExtValidationService.conditionalRequiredValidatorForTrueCondition(parameters[i], validations[j].conditionVar);
							validationError =validationError && res;
							break;
						case "conditionalNonZeroRequiredValidatorForTrueCondition":
							res = ExtValidationService.conditionalNonZeroRequiredValidatorForTrueCondition(parameters[i], validations[j].conditionVar);
							validationError =validationError && res;
							break;
							
						case "maxLength":
							res = maxLengthValidator(parameters[i], validations[j].maxLengthValue);
							validationError = validationError && res;
							break;
						case "arrayMaxLength":
							res = ExtValidationService.arrayMaxLengthValidator(parameters[i], validations[j].maxLengthValue);
							validationError = validationError && res;
						break;
						
						case "numberMaxLength":
							res = ExtValidationService.numberMaxLengthValidator(parameters[i], validations[j].maxLengthValue);
							validationError = validationError && res;
						break;
						case "minLength":
							res = minLengthValidator(parameters[i], validations[j].minLengthValue);
							validationError = validationError && res;
							break;
							
						case "min2FALength":
							res = ExtValidationService.min2FALengthValidator(parameters[i], validations[j].minLengthValue);
							validationError = validationError && res;
							break;
						case "pinAndCVVMinLength":
							res = ExtValidationService.pinAndCVVMinLengthValidator(parameters[i], validations[j].minLengthValue);
							validationError = validationError && res;
							break;
						
						case "notAllCaps":
							res = ExtValidationService.notAllCapsValidator(parameters[i]);
							validationError = validationError && res;	
							break;													
						
						case "dateLessThan":
							res = ExtValidationService.dateLessThanValidator(parameters[i], validations[j].dateLessThan);
							validationError = validationError && res;
							break;
						
						case "dateGreaterThan":
							res = ExtValidationService.dateGreaterThanValidator(parameters[i], validations[j].dateGreaterThan);
							validationError = validationError && res;
							break;
						
						case "dateLessThanVar":
							res = ExtValidationService.dateLessThanVarValidator(parameters[i], validations[j].dateLessThanVar);
							validationError = validationError && res;
							break;
						
						case "dateGreaterThanVar":
							res = ExtValidationService.dateGreaterThanVarValidator(parameters[i],validations[j].dateGreaterThanVar);
							validationError = validationError && res;
							break;

						case "conditionalDateGreaterThanVar":
							res = ExtValidationService.conditionalDateGreaterThanVarValidator(parameters[i], validations[j].conditionVar, validations[j].dateGreaterThanVar);
							validationError = validationError && res;
							break;
						
						case "dateGreaterThanNowUpdateWorkAddr":
							res = ExtValidationService.dateGreaterThanNowUpdateWorkAddrValidator(parameters[i]);
							validationError = validationError && res;
							break;
							
						case "dateGreaterThanNowUpdateCommAddr":
							res = ExtValidationService.dateGreaterThanNowUpdateCommAddrValidator(parameters[i]);
							validationError = validationError && res;
							break;
							
						case "dateGreaterThanNowUpdatePermAddr":
							res = ExtValidationService.dateGreaterThanNowUpdatePermAddrValidator(parameters[i]);
							validationError = validationError && res;
							break;
							
						case "dateGreaterThanNow":
							res = ExtValidationService.dateGreaterThanNowValidator(parameters[i]);
							validationError = validationError && res;
							break;
							
						case "dateGreaterThanFromDateNow":
							res = ExtValidationService.dateGreaterThanFromDateNowValidator(parameters[i]);
							validationError = validationError && res;
							break;
							
						case "dateGreaterThanToDateNow":
							res = ExtValidationService.dateGreaterThanToDateNowValidator(parameters[i]);
							validationError = validationError && res;
							break;
							
						case "dateGreaterThanNowAndEqual":
							res = ExtValidationService.dateGreaterThanNowAndEqualValidator(parameters[i]);
							validationError = validationError && res;
							break;
						
						case "dateLessThanNow":
							res = ExtValidationService.dateLessThanNowValidator(parameters[i]);
							validationError = validationError && res;
							break;
							
						case "futureDateCheck":
							res = ExtValidationService.futureDateCheckValidator(parameters[i]);
							validationError = validationError && res;
							break;
							
						case "futureDateCheckTwo":
							res = ExtValidationService.futureDateCheckTwoValidator(parameters[i]);
							validationError = validationError && res;
							break;
						
						case "lessThanOptional":
							res = ExtValidationService.lessThanOptionalValidator(parameters[i], validations[j].lessThanOptional);
							validationError = validationError && res;
							break;
                        
						case "isEmail":
	                        res = ExtValidationService.isEmailValidator(parameters[i]);
	                        validationError = validationError && res;
	                        break;
	                    
						case "isAlphaNumeric":
	                        res = ExtValidationService.isAlphaNumericValidator(parameters[i]);
	                        validationError = validationError && res;
	                        break;
	                        
						case "isEmailNotReq":
	                        res = ExtValidationService.isEmailNotReqValidator(parameters[i]);
	                        validationError = validationError && res;
	                        break;
	                        
	                    case "isPhnNumberNotReq":     
							res = ExtValidationService.isPhnNumberNotReqValidator(parameters[i]);
	                        validationError = validationError && res;
	                        break;
	                        
	                    case "isDayGreaterThanThirty":
	                        res = ExtValidationService.isDayGreaterThanThirtyValidator(parameters[i],validations[j].conditionVar);
	                        validationError = validationError && res;
	                        break;    
	                        
	                    case "isMobNumberNotReq":     
							res = ExtValidationService.isMobNumberNotReqValidator(parameters[i]);
	                        validationError = validationError && res;
	                        break;    
	                        
						case "isPassword":
	                        res = ExtValidationService.isPasswordValidator(parameters[i]);
	                        validationError = validationError && res;
	                        break;
                        
						case "lengthEquals":
	                        res = ExtValidationService.lengthEqualsValidator(parameters[i],validations[j].length);
	                        validationError = validationError && res;
	                        break;
	                        
						case "nonEmptylengthEquals":
	                        res = ExtValidationService.nonEmptylengthEqualsValidator(parameters[i],validations[j].length);
	                        validationError = validationError && res;
	                        break;
	                        
						case "lengthEqualsNotReq":
	                        res = ExtValidationService.lengthEqualsNotReqValidator(parameters[i],validations[j].length);
	                        validationError = validationError && res;
	                        break;
                        
						case "stringEquals":
	                        res = ExtValidationService.stringEqualsValidator(parameters[i],validations[j].newPassword);
	                        validationError = validationError && res;
	                        break;
	                        
					case "stringEqualsPIN":
	                        res = stringEqualsValidator(parameters[i],validations[j].newPassword);
	                        validationError = validationError && res;
	                        break;
				
				case "tokenPinEquals":
	                        res = ExtValidationService.pinEqualsValidator(parameters[i],validations[j].newPassword);
	                        validationError = validationError && res;
	                        break;
	                        
	                        
                        
						case "actualDateGreaterThan":
	                        res = ExtValidationService.actualDateGreaterThanValidator(parameters[i],validations[j].dateGreaterThanVar);
						    validationError = validationError && res;
							break;
	                    
						case "actualDateLessThan":
	                        res = ExtValidationService.actualDateLessThanValidator(parameters[i], validations[j].dateLessThanVar);
							validationError = validationError && res;
							break;	
	                    
						case "conditionalAccountRequired":
							res = ExtValidationService.conditionalAccountRequiredValidator(parameters[i], validations[j].conditionVar);
							validationError =validationError && res;
							break;
	                    
						case "checkMonthDayPeriod":
							res = ExtValidationService.monthDayCheck(parameters[i], validations[j].conditionVar);
							validationError =validationError && res;
							break;
							
						case "fieldValue":
	                    	 res = ExtValidationService.fieldValueValidator(parameters[i], validations[j].field, validations[j].value, validations[j].length||validations[j].mobileLength);
							 validationError =validationError && res;
							 break;
						case "fieldValueVariable":
	                    	 res = ExtValidationService.fieldValueVariableValidator(parameters[i], validations[j].field, validations[j].value, validations[j].length);
							 validationError =validationError && res;
							 break;

						case "validateBasedOnIndex":
							 res = validateBasedOnIndex(parameters[i], validations[j].data);
							 validationError =validationError && res;
							 break;
                                                	// Added for change nick name spl character check
						case "validateBasedOnIndexSpecialCharCheck":
							 res = validateBasedOnIndexSpecialCharCheck(parameters[i], validations[j].data);
							 validationError =validationError && res;
							 break;
						case "reqvalidateBasedOnIndex":
							 res = ExtValidationService.rqdValidateBasedOnIndex(parameters[i], validations[j].data);
							 validationError =validationError && res;
							 break;
						case "validateBasedOnArray":
							 res = ExtValidationService.validateBasedOnArrayValidation(parameters[i]);
							 validationError =validationError && res;
							 break;
						case "validateNonZeroArray":
							 res = ExtValidationService.validateNonZeroArrayValidation(parameters[i]);
							 validationError =validationError && res;
							 break;
						case "dateValid":
	                    	 res = ExtValidationService.validDateValidator(parameters[i]);
							 validationError = validationError && res;
							 break;
							 
							 	case "conditionalDateValid":
	                    	 res = conditionalValidDateValidator(parameters[i],validations[j].conditionVar);
							 validationError = validationError && res;
							 break;
						case "startValueValidator":
	                    	 res = ExtValidationService.startValueValidator(parameters[i],validations[j].conditionVar);
							 validationError = validationError && res;
							 break;	 
						case "spclCharacterValidator":
	                    	 res = ExtValidationService.specialCharaterValidator(parameters[i]);
							 validationError = validationError && res;
							 break;	
						case "alphaOnly":
	                    	 res = ExtValidationService.alphabetsOnly(parameters[i]);
							 validationError = validationError && res;
							 break;
						case "isNumericPassword":
	                    	 res = ExtValidationService.isNumericPasswordValidator(parameters[i]);
							 validationError = validationError && res;
							 break;	
						case "isAlphaNumericWithSpace":
	                    	 res = ExtValidationService.isAlphaNumericWithSpaceValidator(parameters[i]);
							 validationError = validationError && res;
							 break;	
						case "isAlphaNumericWithSpaceAndDot":
	                    	 res = ExtValidationService.isAlphaNumericWithSpaceAndDotValidator(parameters[i]);
							 validationError = validationError && res;
							 break;	
						case "isAlphaNumericWithUnderScore":
	                    	 res = ExtValidationService.isAlphaNumericWithUnderScoreValidator(parameters[i]);
							 validationError = validationError && res;
							 break;
						case "dateYearLimit":
							res = ExtValidationService.dateYearLimitValidator(parameters[i]);
							validationError =validationError && res;
							break;
						case "stringDateYearLimit":
							res = ExtValidationService.stringDateYearLimitValidator(parameters[i]);
							validationError =validationError && res;
							break;
							
						case "conditionalBaseFromAndToDate":
							res = ExtValidationService.conditionalBaseFromAndToDateValidator(parameters[i],validations[j].conditionVar);
							validationError =validationError && res;
							break;
							
						case "numericValueGreaterthan":
							res = ExtValidationService.numericValueLogicValidator(parameters[i], validations[j].numericValue,"LOGIC_INT_GREATER_THAN");
							validationError = validationError && res;
							break;
						case "numericValueLesserthan":
							res = ExtValidationService.numericValueLogicValidator(parameters[i], validations[j].numericValue,"LOGIC_INT_LESSER_THAN");
							validationError = validationError && res;
							break;
						case "ifValuethanNumber":
							res = ExtValidationService.ifValuethanNumberValidator(parameters[i]);
							validationError = validationError && res;
							break;

						case "cardExpiryYearAndMonth":
							res = ExtValidationService.cardExpiryYearAndMonthValidator(parameters[i],validations[j].secondFieldName);
							validationError = validationError && res;
							break;

						case "atleatOneFieldSelected":
							res = ExtValidationService.atleatOneFieldSelectedValidator(parameters[i],validations[j].secondFieldName,validations[j].selectedStatus);
							validationError = validationError && res;
							break;
						case "atleatOneYearFieldSelected":
							res = ExtValidationService.atleatOneYearFieldSelectedValidator(parameters[i],validations[j].yearMonth1,validations[j].yearDate2,validations[j].yearMonth2,validations[j].yearDate3,validations[j].yearMonth3,validations[j].yearDate4,validations[j].yearMonth4,validations[j].yearDate5,validations[j].yearMonth5,validations[j].yearDate6,validations[j].yearMonth6,validations[j].selectedStatus);
							validationError = validationError && res;
							break;	
							
						case "nonZeroMultipleField":
							res = ExtValidationService.nonZeroMultipleFieldValidator(parameters[i],validations[j].secondParam);
							validationError = validationError && res;
							break;	
						
						case "isNumber":
							res = ExtValidationService.isNumberValidator(parameters[i]);
							validationError = validationError && res;
							break;
						case "isNumberRange":
							res = ExtValidationService.isNumberRange(parameters[i],validations[j].conditionVar);
							validationError = validationError && res;
							break;
						case "isNumberRangeCondition":
							res = ExtValidationService.isNumberRangeCondition(parameters[i],validations[j].conditionVar);
							validationError = validationError && res;
							break;
						case "hasSpace":
							res = ExtValidationService.hasSpaceValidator(parameters[i]);
							validationError = validationError && res;
							break;
						
						case "textWithoutZero":
							res = ExtValidationService.textWithoutZeroValidator(parameters[i]);
							validationError = validationError && res;
							break;
							
						case "byPassRequired":
							res = ExtValidationService.byPassRequiredValidator(parameters[i]);
							validationError = validationError && res;
							break;
							
						case "arrayBasedOnKey":
							res = ExtValidationService.arrayBasedOnKeyValidator(parameters[i], validations[j].key, validations[j].stepUpAuthString, validations[j].selectedQuestions ,validations[j].questions);
							validationError = validationError && res;
							break;
							
						case "stepUpRequired":
							res = ExtValidationService.stepUpRequiredValidator(parameters[i], validations[j].stepUpAuthString);
							validationError = validationError && res;
							break;
							
						case "isSameRoleSelected":
							res = ExtValidationService.isSameRoleSelectedValidator(parameters[i]);
							validationError =validationError && res;
							break;
							
//						case "conditionalLabelNumeric":
//							res = conditionalLabelNumeric(parameters[i],validations[j].conditionVar);
//							validationError = validationError && res;
//							 break;
                                                	// Added for change nick name spl character check
					

	//RAK:3: : Added to check Account ID is selected or not for RVC
						case "rakValConditionalRequired":
							res = rakValConditionalRequiredValidator(parameters[i], validations[j].conditionVar1, validations[j].conditionVar2);
							validationError = validationError && res;
							break;
						//RAK:3: : added to validate from date validations in Credit Card Physical Stmt Request : START
						case "fromPeriodOlderThanVar":
							res = fromPeriodOlderThanVarValidator(parameters[i], validations[j].conditionVar1, validations[j].conditionVar2);
							validationError = validationError && res;
							break;

						case "dateGreaterThanCurrentDate":
							res = dateGreaterThanCurrentDateValidator(parameters[i],validations[j].conditionVar);
							validationError = validationError && res;
							break;

						case "fromDateGreaterThanToDate":
							res = fromDateGreaterThanToDateValidator(parameters[i], validations[j].conditionVar1, validations[j].conditionVar2, validations[j].conditionVar3);
							validationError = validationError && res;
							break;

						//RAK:3: : added to validate from date validations in Credit Card Physical Stmt Request : START

						//RAK:3: : added to check if the field value contains & or not in Opr Acct Balance COnfirmation Request : START
						case "containsSpecialChar":
							res = containsSpecialCharValidator(parameters[i], validations[j].conditionVar)
							validationError = validationError && res;
							break;
						//RAK:3: : added to check if the field value contains & or not in Opr Acct Balance COnfirmation Request : END

						//RAK:3: : added to validate the DND Time for Alert Pref Req : START
						case "dndTime":
							res = dndTimeValidator(parameters[i], validations[j].conditionVar);
							validationError = validationError && res;
							break;
						//RAK:3: : added to validate the DND Time for Alert Pref Req : END

						case "checkNumbersLengthValidator":
							res = containsSpecialCharValidator(parameters[i], validations[j].conditionVar);
							validationError = validationError && res;
							break;

//						case "conditionalLabelNumeric":
//							res = conditionalLabelNumeric(parameters[i],validations[j].conditionVar);
//							validationError = validationError && res;
//							 break;

						//RAK Dev added for conditional and greater than current date start
						case "conditionalGreaterDate":
						   	res = conditionalDateGreaterValidator(parameters[i], validations[j].conditionVar);
							validationError =validationError && res;
							break;

						//RAK Dev added for conditional and greater than current date start
						//RAK  added for checking flag value
						case "checkForFlagValue":
							res= checkForFlagValue(validations[j].conditionVar);
							validationError = validationError && res;
							break;
						/*RAK:2:-forBillersDynamicvalidation-End*/
					      case "customfieldValue":
		                    	 var consumerCodeArray=$rootScope.$eval(parameters[i]);
		                    	 var consumerCodeError=[];
		                    for (var index = 0; index < consumerCodeArray.length; index++) {
		                    	  var objName = parameters[i] +"[" + index + "]" + "." + validations[j].value;
					    	      res = customfieldValueValidator(parameters[i], validations[j].field, validations[j].value, validations[j].length,validations[j].pattern,validations[j].isRequired,validations[j].patternFlag,validations[j].type,index);
								  consumerCodeError[objName]=res;
		                    }

		                    for(var temp in consumerCodeError){
		                    	 validationError =validationError && consumerCodeError[temp];
		                    }
								 break;

					      case "quickPayCustomfieldValue":
		                    	 var consumerCodeArray=$rootScope.$eval(parameters[i]);
		                    	 var consumerCodeError=[];
		                    for (var index = 0; index < consumerCodeArray.length; index++) {
		                    	  var objName = parameters[i] +"[" + index + "]" + "." + validations[j].value;
					    	      res = QuickPayCustomfieldValueValidator(parameters[i], validations[j].field, validations[j].value, validations[j].length,validations[j].pattern,validations[j].isRequired,validations[j].patternFlag,validations[j].type,index);
								  consumerCodeError[objName]=res;
		                    }

		                    for(var temp in consumerCodeError){
		                    	 validationError =validationError && consumerCodeError[temp];
		                    }
								 break;

					   /*RAK:2:-forBillersDynamicvalidation-End*/

						/* Rak  - Online Registration*/
					    case "conditionalRequiredForORONReqField":
		                    	 res = conditionalRequiredForORONReqFieldValidator(parameters[i], validations[j].conditionVar);
								 validationError =validationError && res;
							break;

					    case "conditionalRequiredForPasswordField":
		                    	 res = conditionalRequiredForPasswordFieldValidator(parameters[i], validations[j].conditionVar1);
								 validationError =validationError && res;
								 break;
						//Rak added for date less than equal to validator
							case "rakDateLessThanNowValidator":
								res = rakDateLessThanNowValidator(parameters[i]);
								validationError = validationError && res;
								break;
// added for Seam Less Login Password validation START
											case "isPasswordAlphanumericWithSpecialCharacter":
												res = isPasswordAlphanumericWithSpecialCharacterValidator(parameters[i]);
												validationError = validationError
														&& res;
												break;
											// added for Seam Less Login Password validation END

								//Rak : For amount in multiples of 100
							case "rakAmountMulitpleof100":
								res = rakAmountMulitpleof100Validator(parameters[i]);
								validationError = validationError && res;
								break;

									//Rak  added to check resticted specia charcter
							case "rakContainsSpecialCharValidator":
								res = rakContainsSpecialCharValidator(parameters[i]);
								validationError = validationError && res;
								break;
								//Rak Rak restricted Spl Characters 
							case "rakRestrictedSpecialCharValidator":
								res = rakRestrictedSpecialCharValidator(parameters[i]);
								validationError = validationError && res;
								break;
								
							//RAK  Added for  Special Character Check specific to Update Personal Profile
							case "rakUPDSpecialCharValidator":
								res = rakUPDSpecialCharValidator(parameters[i]);
								validationError = validationError && res;
								break;
						    // Added for time Validation
					        case "rakTimeValidator":
						       res = rakTimeValidator(parameters[i]);
						        validationError = validationError && res;
						        break;
						    /*RAK:2:-DDS-Start*/
					       case "rakContainsPipeChar":
						        res = rakContainsPipeCharValidator(parameters[i]);
						        validationError = validationError && res;
						        break;
					       case "rakMaxValue":
						        res = rakMaxValueValidator(parameters[i],validations[j].maxValue);
						        validationError = validationError && res;
						        break;
								//Added By  For Txn-Change limit SR
								case "rakMinValue":
						        res = rakMinValueValidator(parameters[i],validations[j].maxValue);
						        validationError = validationError && res;
						        break;
						        
								case "rakMinValueTxnLimitChange":
						        res = rakMinValueValidator(parameters[i],validations[j].maxValue);
						        validationError = validationError && res;
						        break;
						    /*RAK:2:-DDS-End*/

						        // added for max length validatio for number

					   	case "lengthEqualsMax":
	                        res = lengthEqualsMaxValidator(parameters[i],validations[j].maxLengthValue);
	                        validationError = validationError && res;
	                        break;


	                   //RAK DEV CHNAGES FOR UNDEFINED STRINGS FOR REQUIRED VALIDTORS START
					   	case "undefinedRequired":
	                        res = undefinedRequiredValidator(parameters[i],validations[j].length);
	                        validationError = validationError && res;
	                        break;
	                  //RAK DEV CHNAGES FOR UNDEFINED STRINGS FOR REQUIRED VALIDTORS END
						//  added for Value1 less than Value2 START
						case "rakValue1LessThanValue2Validator":
							res = rakValue1LessThanValue2Validator(
									parameters[i],
									validations[j].otherVal);
							validationError = validationError
									&& res;
							break;
						//  added for Value1 less than Value2 END
							//Rak : For amount in multiples of 100
						case "rakConditionalAmountMulitpleof10":
							res = rakConditionalAmountMulitpleof10Validator(parameters[i], validations[j].conditionVar);
							validationError = validationError && res;
							break;
						//  added for Value1 same as Value2 START
						case "rakValue1SameAsValue2Validator":
							res = rakValue1SameAsValue2Validator(
									parameters[i],
									validations[j].otherVal);
							validationError = validationError
									&& res;
							break;
						//  added for Value1 same as Value2 END
						//  added for Check Box Flag Value validator START
						case "rakValidateCheckBoxFlagValue":
							res = rakValidateCheckBoxFlagValue(
									parameters[i], validations[j].conditionVar);
							validationError = validationError
									&& res;
							break;
						//  added for Check Box Flag Value validator END	
							//added for online registration
						case "conditionalMinLength":
	                    	 res = conditionalMinLengthValidator(parameters[i], validations[j].minLengthValue,validations[j].conditionVar);
							 validationError =validationError && res;
						break;
						case "conditionalMaxLength":
	                    	 res = conditionalMaxLengthValidator(parameters[i],validations[j].maxLengthValue, validations[j].conditionVar);
							 validationError =validationError && res;
						break;
						
						case "conditionalIsNumericPassword":
	                    	 res = conditionalIsNumericPasswordValidator(parameters[i], validations[j].conditionVar);
							 validationError =validationError && res;
						break;
						
						case "moreThanPercent":
							 res = moreThanPercentValidator(parameters[i],validations[j].conditionVar);
							 validationError =validationError && res;
						break;
							case "conditionalIsEmail":
	                        res = conditionalIsEmailValidator(parameters[i],validations[j].conditionVar);
	                        validationError = validationError && res;
	                    break;
	                    
						case "rakDNDTimeConditionalRequired":
		                        res = rakDNDTimeConditionalRequiredValidator(parameters[i],validations[j].conditionVar);
		                        validationError = validationError && res;
		                break;
				
						//RAK DEV CHANGES MAKING CUSTOM LESS THAN AND NON ZERO VALIDATOR START
						case "lessThanOptionalNonZero":
							res = lessThanOptionalNonZeroValidator(parameters[i], validations[j].lessThanOptional);
							validationError = validationError && res;
							break;
					//RAK DEV CHANGES MAKING CUSTOM LESS THAN AND NON ZERO VALIDATOR END
	                        
						
					}

					var keyString=parameters[i];

			        if($rootScope.pageErrorArr[keyString]){
			        	if(errorMsg){
			        		 $rootScope.pageErrorArr[keyString]=errorMsg;
			        	}else{
				        	errorMsg=$rootScope.appLiterals.APP.RAKERRORMSG.VALIDATORTYPEMSG[validations[j].validationType];
				        	$rootScope.pageErrorArr[keyString]=errorMsg;
				        }
			        	if(!focusSet){
			        		console.log('@@ in set Focus');
			        		var elem=jQuery('[ng-model="'+keyString+'"]:visible');
			        		scrollToElem(elem[0]);
			        		focusSet=true;
			        	}
			        	break;

			        }
					
					if (!res) {
						if (_.isUndefined($rootScope.pageErrorCode[parameters[i]])) {
							$rootScope.pageErrorCode[parameters[i]] = validations[j].validationType;
						}
					}
				}
			}

			Logger.info("Validation of Service ValidationService: " + validationError);
			/* 
			 *  Added the below to check whether the validation Passed or Failed
			 * validationError == true means validation Passed
			 * validationError == false means validation Failed
			 * 
			 * NOTE : Check the below variable after calling the event
			 */
			$rootScope.RakPageValidation = validationError;
			//In ActionProcessor, the value is form Valid.Hence the negation.
			return validationError;
		},	
	};
}]);
