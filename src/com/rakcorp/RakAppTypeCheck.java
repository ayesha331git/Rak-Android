package com.rakcorp;

import java.security.KeyStore;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.annotation.TargetApi;
import android.app.Activity;
import android.app.KeyguardManager;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.SharedPreferences.Editor;
import android.net.Uri;

@TargetApi(23)
public class RakAppTypeCheck extends CordovaPlugin {
	public static final String TAG = "RakAppTypeCheck";
	public static String packageName;



	


	public RakAppTypeCheck() {
	}

	public boolean execute(final String action, JSONArray args, CallbackContext callbackContext)
			throws JSONException {
		//final String appPackageName=getPackageName();
		if(action.equalsIgnoreCase("dochkApp")){
			Intent i = this.cordova.getActivity().getPackageManager().getLaunchIntentForPackage("com.rak");
			if(i==null){
				 i = new Intent(android.content.Intent.ACTION_VIEW);
					i.setData(Uri.parse("market://details?id=com.rak"));
			}
			i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
			this.cordova.getActivity().startActivity(i);
	
			callbackContext.success();  
			return true;
		}

		
		return false;
		
		


	}
}
