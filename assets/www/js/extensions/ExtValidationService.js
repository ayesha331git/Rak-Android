AppController.factory('ExtValidationService', ['$http', '$rootScope','BaseValidationService',
                                          function($http, $rootScope,BaseValidationService) {
var ExtValidationService = Object.create(BaseValidationService);

// uncomment to override "requiredValidator" or same way to override other validation utilities

//ExtValidationService.requiredValidator = function (param) {
//	console.log('override  requireValidation called');
//	  var fieldValue = $rootScope.$eval(param);
//		var flag = true; 
//		if(fieldValue === null || fieldValue.length === 0 || fieldValue == "null"){
//			$rootScope.pageErrorArr[param] = "emptyField";
//			flag = false; 
//		}
//		return flag;
//}


ExtValidationService.pinEqualsValidator = function(param, definedValue){
	
	var fieldValue = $rootScope.$eval(param);
    definedValue = $rootScope.$eval(definedValue);
	
	var flag = true; 
		
	if((fieldValue !== '' && definedValue !== '') && fieldValue != definedValue){
		$rootScope.pageErrorArr[param] = "tokenPinEquals";
		flag = false; 
	}
	return flag;
};
	
return ExtValidationService;
}]);