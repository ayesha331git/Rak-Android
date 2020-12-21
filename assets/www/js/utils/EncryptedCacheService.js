var AppController = angular.module("AppController");
/**
 * this factory handles encryption cache
 * @factory
 */
AppController.factory('EncryptedCacheService', ['$q','Logger','$rootScope',
                               function($q, Logger,$rootScope) {
	
	
	return{
		/**
		 * this utility handles Error
		 * @constructor
		 */
		onErrorHandler:function(status){
			switch(status){
			case WL.EncryptedCache.ERROR_KEY_CREATION_IN_PROGRESS:
				Logger.fatal("ERROR: KEY CREATION IN PROGRESS");
				break;
			case WL.EncryptedCache.ERROR_LOCAL_STORAGE_NOT_SUPPORTED:
				Logger.fatal("ERROR: LOCAL STORAGE NOT SUPPORTED");
				break;
			case WL.EncryptedCache.ERROR_NO_EOC:
				Logger.fatal("ERROR: NO EOC");
				break;
			case WL.EncryptedCache.ERROR_COULD_NOT_GENERATE_KEY:
				Logger.fatal("ERROR: COULD NOT GENERATE KEY");
				break;
			case WL.EncryptedCache.ERROR_CREDENTIALS_MISMATCH:
				Logger.fatal("ERROR: CREDENTIALS MISMATCH");
				break;
			default:
				Logger.fatal("AN ERROR HAS OCCURED. STATUS :: " + status);
			}
		},
		/**
		 * this utility open cache
		 * @constructor
		 */
		openCache:function(){
			var openKey=$rootScope.appLiterals.APP.ENCYPTMSG.openKey;
			function onOpenComplete(status){
				//Open the cache
				if(status == WL.EncryptedCache.OK){
					Logger.info("Cache opened successfully");
				}
			}
			function onError(status){
				onErrorHandler(status);
			}
			WL.EncryptedCache.open(openKey, true, onOpenComplete, onError);
		},
		/**
		 * this utility closes cache
		 * @constructor
		 */
		closeCache:function(){
			function onCloseComplete(status){
				Logger.info("Cache closed successfully");
			}
			function onCloseError(status){	
				Logger.fatal("AN ERROR HAS OCCURED. STATUS :: " + status);
			}
			WL.EncryptedCache.close(onCloseComplete, onCloseError);
		},
		/**
		 * this utility destroy cache
		 * @constructor
		 */
		destoryCache:function(){
			function onDestoryComplete(status){
				Logger.info("Cache closed successfully");
			}
			function onDestroyError(status){	
				Logger.fatal("AN ERROR HAS OCCURED. STATUS :: " + status);
			}
			WL.EncryptedCache.destroy(onDestoryComplete, onDestroyError);
		},
		/**
		 * this utility writes cache
		 * @constructor
		 * @param {string} customKey-  
		 * @param {string} value-  
		 */
		writeCache:function(customKey, value){
			var deferred = $q.defer();
			function onWriteSuccess(status){
				Logger.info("Cache written successfully");
				deferred.resolve();			
			}
			function onError(status){
				onErrorHandler(status);
				deferred.reject();
			}
			WL.EncryptedCache.write(customKey, value, onWriteSuccess, onError);
			return deferred.promise;
		},
		/**
		 * this utility reads cache
		 * @constructor
		 * @param {string} customKey- reads cache for the key
		 */
		readCache:function(customKey){
			var deferred = $q.defer();
			function onReadSuccess(value){
				Logger.info("Cache read successfully");
				deferred.resolve(value);
			}
			function onError(status){
				onErrorHandler(status);
				deferred.reject();
			}
			WL.EncryptedCache.read(customKey, onReadSuccess, onError);
			return deferred.promise;
		},
		/**
		 * this utility removes cache
		 * @constructor
		 * @param {string} key- 
		 */
		removeCache:function(key){
			var deferred = $q.defer();
			function onRemoveSuccess(status){
				Logger.info("Cache removed successfully");
				deferred.resolve();
			}
			function onError(status){
				onErrorHandler(status);
				deferred.reject();
			}
			WL.EncryptedCache.read(customKey, onRemoveSuccess, onError);
			return deferred.promise;
		}
	};
}]);