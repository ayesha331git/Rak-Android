/**
 *
 */
package com.rakcorp;

import java.security.MessageDigest;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;

/**
 * @author Ravi_Rudra
 *
 */
public class FinacleParamSensitizer extends CordovaPlugin{

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
    	System.out.println("Param sensitizer called");
    	if(action.equals("encrypt")){
    		try{
	    		String plainText = args.getString(0);
	    		FinacleEncryptor encryptor = new FinacleEncryptor();
		    	String cipherText = encryptor.encryptPassword(plainText);
		    	callbackContext.success(cipherText);
		    	return true;
    		}catch(Exception e){
    			e.printStackTrace();
    			callbackContext.success("Failed encrypting params");
    			return false;
    		}
    	} else if(action.equals("urlEncrypt")){	//URL Hashing starts
    		try{
	    		String plainText = args.getString(0);
	    		URLEncryptor encryptor = new URLEncryptor();
	    		String cipherText = encryptor.encryptURL(plainText);
		    	callbackContext.success(cipherText);
		    	return true;
    		}catch(Exception e){
    			e.printStackTrace();
    			callbackContext.success("Failed encrypting params");
    			return false;
    		}
    	} else if(action.equals("hashURL")){
    		try{
	    		String plainText = args.getString(0);
	    		URLEncryptor encryptor = new URLEncryptor();
	    		String hashCode = encryptor.hashURL(plainText);
		    	System.out.println("hashCode is :"+hashCode);
		    	callbackContext.success(hashCode);
		    	return true;
    		}catch(Exception e){
    			callbackContext.success("Failed encrypting params");
    			return false;
    		}
    	} else if(action.equals("encryptUserName")){
    		try{
	    		String jsonCred = args.getString(0);
	    		String deviceId = args.getString(1);
	    		String userName = args.getString(2);
	    		if(deviceId.length() > 16){
	    			deviceId = deviceId.substring(0, 16);
	    		} else if (deviceId.length() < 16){
	    			while(deviceId.length() < 16){
	    				deviceId = deviceId + "e";
	    			}
	    		}
	    		FinacleEncryptor encryptor = new FinacleEncryptor();
		    	String cipherText = encryptor.getEncryptedUserName(userName, deviceId, jsonCred);
	    		callbackContext.success(cipherText);
		    	return true;
    		}catch(Exception e){
    			e.printStackTrace();
    			callbackContext.error(e.getMessage());
    			return false;
    		}
    	} else if(action.equals("decryptUserName")){
    		try{
	    		String jsonCred = args.getString(0);
	    		String deviceId = args.getString(1);
	    		String userName = args.getString(2);
	    		if(deviceId.length() > 16){
	    			deviceId = deviceId.substring(0, 16);
	    		} else if (deviceId.length() < 16){
	    			while(deviceId.length() < 16){
	    				deviceId = deviceId + "e";
	    			}
	    		}
	    		FinacleEncryptor encryptor = new FinacleEncryptor();
		    	String decodedCipherText = encryptor.getDecryptedUserName(userName, deviceId, jsonCred);
	    		callbackContext.success(decodedCipherText);
		    	return true;
    		}catch(Exception e){
    			e.printStackTrace();
    			callbackContext.error(e.getMessage());
    			return false;
    		}
    	}
    	return false;
    }

}
