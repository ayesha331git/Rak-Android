/**
 * @ngdoc Services
 * @name PageProcessor
 * @description
 *   Implementation of {@link PageProcessor}
 */

AppController.factory('PageProcessor', ['$http', '$q', 'Logger','$rootScope','MBaaS',
                               function($http, $q, Logger,$rootScope,MBaaS) {
	/** variables that will be used across this service */
	var pagesConfig = {};
	
	return {
		
		/**
		 * The init method which initializes processing of all pages configurations
		 */ 
		init: function() {
			
			/**
			 * Note that we will have to return a promise because the caller
			 * is waiting on us to complete some functionality
			 */ 
			var deferred = $q.defer();
			/** Let us read the file now. This is the TemplateProcessor */
		    $http.get('navigation/PagesConfig.json').success(function(data) {
		    	/** The only thing to do is to process the pagesconfig and do any initialization that is required.*/
		    	pagesConfig = data;
		    	Logger.debug("Finished processing pages configuration");
		    	deferred.resolve(data);
		    }).error(function(msg, code) {
		    	deferred.reject(msg);
		    });
		    
		    /** Let us return the promise now */
		    return deferred.promise;
		},
		/**
		 * The method which fetches the URL path for a given page
		 * @constructor
		 * @param page {object} page name
		 * @return {srting} Return URL path of given page
		 */ 
		getLocationUrlForPage: function(page) {
			var pageObj=pagesConfig[page];
			$rootScope.hideFooterFlag=false;
			$rootScope.isSuccessPage=false;
			// restrct help will be false if not defined in config.
			$rootScope.showHelpIcon=false;
			if (pageObj.hasOwnProperty('showHelp')) {
				$rootScope.showHelpIcon=pageObj.showHelp;
			}
			// menu bar will be visible if not defined in config.
			$rootScope.removeMenuBarFlag = false;
			if (pageObj.hasOwnProperty('removeMenu') && $rootScope.isUserLoggedIn != true) {
				$rootScope.removeMenuBarFlag=pageObj.removeMenu;
			}
			if (pageObj.hasOwnProperty('hideFooter') && $rootScope.rakEDirham.common.hideMenuFlag) {
				$rootScope.hideFooterFlag=pageObj.hideFooter;
			}
			if (pageObj.hasOwnProperty('isSuccessPage')) {
				$rootScope.isSuccessPage=pageObj.isSuccessPage;
			}
			if (!pageObj.hasOwnProperty('startTimer')) {
				$rootScope.rakEDirham.stopInterval();
			}
			 if(!pageObj.hasOwnProperty('showAuthTimer')) {
                 $rootScope.rakEDirham.stopAuthInterval();
			 	}
			
			/*MBaaS.overrideBackButton(function onbackClicked() {
				if (pageObj.hasOwnProperty('enableBack')) {
					//document.getElementById(pageObj.enableBack).trigger('click');
					//angular.element(pageObj.enableBack).trigger('click');
					angular.element(document.getElementById(pageObj.enableBack)).trigger('click');
					//document.getElementById(pageObj.enableBack).onclick();
					}
			}); */
			return pageObj.templateUrl;
		},
		getHelpPageTemplate: function(page) {
			var pageObj=pagesConfig[page];
			$rootScope.showHelpIcon=false;
			if (pageObj.hasOwnProperty('showHelp') && pageObj.hasOwnProperty('helpTemplate')) {
				return pageObj.helpTemplate;
			}
			return "";
		}
	};
}]);