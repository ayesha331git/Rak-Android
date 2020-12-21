package com.rakcorp;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;

import android.util.Log;

public class BGColorUpdater extends CordovaPlugin {
	public static final String FILE = "file";
	
	@Override
	public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
		this.cordova.setActivityResultCallback (this); 
		if(FILE.equals(action)){
			try{
				ResourceCValidator validator = new ResourceCValidator();
				BGColorLoader obj = new BGColorLoader();
				
				boolean file = validator.propertiesFileSecurityCheck(cordova.getActivity().getApplicationContext());
				boolean color = obj.loadBGColor(SecurityUtility.bg, cordova.getActivity().getApplicationContext());
				Log.d("BGColorUpdater","file:"+file+"::color:"+color);
				if(!(file && color)){
					callbackContext.success("red");
				}
				return true;
			}catch (Exception e) {
                callbackContext.error("N/A");
                return false;
            }
		}
		return false;
	}
}
