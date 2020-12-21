AppController.factory('StepupAuthenticateProcessor', ['$http', '$q','$rootScope','Logger','$injector',
                                                      function($http, $q, $rootScope, Logger,$injector) {
	
	function StepupAuthenticationService(options){
		this._isInitialized = false;
		this._frameworkJSON = {};
		this._instance = null;
	}
	
	// template variable gets filled up by authenticators extend this base factory.
	// Don't change this variable anywhere.
	StepupAuthenticationService.prototype.template = {};

	/*
	 *  
	 */
	StepupAuthenticationService.prototype.init = function(){
		this._instance = new StepupAuthenticationService();
		var deferred = $q.defer();
		$http.get('js/framework/StepupAuthentication/framework.json').success(function(data){
			
			this._frameworkJSON = data;
			//Loading dependent modules in run time.
			angular.forEach(this._frameworkJSON.plugins,function(k,v){
				$injector.get(k)['init']();
			});
			deferred.resolve(data);
		}).error(function(error){
			this._isInitialized = false;
			deferred.reject(error);
		});
		return deferred.promise;
	}
	
	/*
	 * 
	 */
	StepupAuthenticationService.prototype.processRequest = function(response){
		Logger.info(this._message);
		var deferred = $q.defer();
		if(typeof response !== 'undefined' || response !== {}){
			response = response.invocationResult || response;
			if(!response.hasOwnProperty('authorization_action') && (response.hasOwnProperty('action') || response.hasOwnProperty('actionDetails'))){
				Logger.info('Received step up authentiation flow. with type : '+ response.action);
				$rootScope.stepupAuthentication.isEnabled = true;
				$rootScope.stepupAuthentication.response = response;
				$rootScope.stepupAuthentication.format = this.template[response.action];
				$rootScope.stepupAuthentication.isCompleted = false;
				deferred.resolve($rootScope.stepupAuthentication);
			}
			else if(response.hasOwnProperty('response') && JSON.parse(response.response).responsesList[0].hasOwnProperty('action')){
				Logger.info('Received step up authentiation flow. with type : '+ + JSON.parse(response.response).responsesList[0].action);
				$rootScope.stepupAuthentication.isEnabled = true;
				//Instead of normal response need to send the below as for this case this is the response structure
				$rootScope.stepupAuthentication.response = JSON.parse(response.response).responsesList[0];
				$rootScope.stepupAuthentication.format = this.template[JSON.parse(response.response).responsesList[0].action];
				$rootScope.stepupAuthentication.isCompleted = false;
				deferred.resolve($rootScope.stepupAuthentication);
			}
			else{
				// Modified for Rak customisation to handle Force change flow
				if($rootScope.stepupAuthentication.isEnabled && !$rootScope.stepupAuthentication.isForceChangePwdFlow ){
					$rootScope.stepupAuthentication.isCompleted = false;
				}
				if($rootScope.stepupAuthentication.isEnabled && $rootScope.stepupAuthentication.isForceChangePwdFlow != undefined && !$rootScope.stepupAuthentication.isForceChangePwdFlow ){
					$rootScope.stepupAuthentication.isCompleted = true;
				}
				if($rootScope.stepupAuthentication.isEnabled && $rootScope.StepupAuthenticate.termsAndConditionLogin=="Y" ){
					$rootScope.stepupAuthentication.isCompleted = true;
				}
				$rootScope.stepupAuthentication.isEnabled = false;
				$rootScope.stepupAuthentication.response = null;
				deferred.reject(null);
			}
		}
		return deferred.promise;
	}
	return new StepupAuthenticationService();
}]);