//extending directives
AppController.directive('numberInputValidate', function($rootScope) {
  return {
	  priority: 11,
	  link:function(scope, element, attrs) {
			element.bind(
		      "keyup",
		      function(event) {  
		     console.log('extended keyup logic here');
//		     var ele=event.currentTarget;
//	        	if(ele.value && ele.value.startsWith('0')){
//	        		//removing all the leading zeros.
//	        		ele.value=ele.value.replace(/^0+/, '');
//	        		return false;
//	        	};
//		      }
		    	  if (event.keyCode < 0x30 || event.keyCode > 0x39) {
		              event.preventDefault();
		            }    
		            else{
		            	var ele=event.currentTarget;
		            	var limit= ele.getAttribute('ng-maxLength')*1;
		            	var valueLen=ele.value.length;
		            	
		            	// move to next input
		            	if(limit!==0 && valueLen>=limit){
		            		event.preventDefault();
		            	}
		            }
		    	  
		      }
			);
    }
}
});

//new directive can also be added here.