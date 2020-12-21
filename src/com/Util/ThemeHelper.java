package com.Util;

import org.apache.cordova.CallbackContext;
import org.json.JSONArray;

public class ThemeHelper {
	static {
		System.loadLibrary("themecheckjni"); 
	}
	
	public native String rootFunction(int themeInt);
	
	public CallbackContext getTheme(JSONArray args, CallbackContext callbackContext) {
		try {
        	callbackContext.success(rootFunction(Integer.parseInt(args.getString(0))));
        } catch (Exception e) {
            callbackContext.error("N/A");
        }
		return callbackContext;
	}
}
