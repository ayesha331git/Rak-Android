package com.rakcorp;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;

import android.content.Intent;

public class SmsReaderPlugin extends CordovaPlugin {
	 public static CallbackContext SmsReadCallbackContext;
	  @Override
	    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) {
	        this.SmsReadCallbackContext = callbackContext;
	        Intent intent = new Intent(this.cordova.getActivity().getApplicationContext(), SmsReaderActivity.class);
	        this.cordova.getActivity().startService(intent);
			
	    
		
		return true;
	       
	  }
}
