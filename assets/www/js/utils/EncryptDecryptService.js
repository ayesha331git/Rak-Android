var AppController = angular.module("AppController");
/**
 * this factory handles encryption
 * @factory
 */
AppController.factory('EncryptDecryptService', ['$q','Logger',
                               function($q,Logger) {
	
	var passPhrase = (Date.now()).toString();
	
	return{
		/**
		 * this utility generates the hash of the value and returns it to the calling function using 'sha2' algo
		 * @constructor
		 */
		sha2:function(value){
			var deferred = $q.defer();
			var hash = CryptoJS.SHA512(value);
			Logger.info("Hash generated for : " + value + "is : " + hash);
			deferred.resolve(hash);
			return deferred.promise;
		},
		/**
		 * this utility encryptes the given string.
		 * @constructor
		 * @param {string} value- string to be encrypted
		 */
		encryption:function(value){
			var salt = CryptoJS.lib.WordArray.random(16);
			var salt_hex = CryptoJS.enc.Hex.stringify(salt);

			var iv = CryptoJS.lib.WordArray.random(16);
			var iv_hex = CryptoJS.enc.Hex.stringify(iv);

			var key = CryptoJS.PBKDF2(passPhrase, salt, {
				keySize : 256 / 32,
				iterations : 1
			});
			var key_hex = key;

			var encrypted = CryptoJS.AES.encrypt(value, key, { iv : iv });
			var encryptedtxt = "95f92b2f0cb530542d16d90a6c2af59e20759430" + ":" + salt_hex + ":" + iv_hex + ":" +
							encrypted.ciphertext.toString(CryptoJS.enc.Base64) + ":" + key_hex;
			return encryptedtxt;
		}
	};
}]);
