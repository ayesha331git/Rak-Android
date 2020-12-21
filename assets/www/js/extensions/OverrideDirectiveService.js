////overriding directive
finacleMobileApp.config([
            '$provide', function ($provide) {
                $provide.decorator('finCampaignDirective', [
                    '$delegate',
                    function ($delegate) {
                    	 var directive = $delegate[0];
                    	$delegate.splice(0,$delegate.length);
                    	
                    	// give any html page link here
                    	directive.templateUrl = 'navigation/common/resources/FinacleCampaignInlineContainer.html'; 
                    	
                    	// uncomment and overite if using raw html (Note: use either templateUrl or template)
                    	//directive.template="<div>html code</div>"
                    	
                    	// you can add your events here if any and uncomment the below lines.
//                    	 directive.compile = function() {
//                    	 return function(scope, element, attrs) {
//                    	        element.bind('keypress', function() {
//                    	          scope.$apply(function(event) {
//                    	        	  console.log('New logic here');
//                    	            //scope.fn();
//                    	          });
//                    	        });
//                    	      };
//                    	    };
                    	    $delegate.push(directive);
                    	return $delegate;
               }]);
}]);