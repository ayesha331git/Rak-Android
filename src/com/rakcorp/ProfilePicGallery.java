package com.rakcorp;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.content.Intent;
import android.os.Build;

public class ProfilePicGallery extends CordovaPlugin{
	public static String maxSize= "";
	public static String minSize= "";
	public static String locale= "";
	public static String formats= "";
	 public static CallbackContext gallery_callbackContext;
	
	public boolean execute(String action, JSONArray args, final CallbackContext callbackContext) throws JSONException {
		ProfilePicGallery.gallery_callbackContext = callbackContext;
		 UserPermissionUtility marshMallowPermission = new UserPermissionUtility(
					this.cordova.getActivity());
			if (Build.VERSION.SDK_INT > Build.VERSION_CODES.LOLLIPOP_MR1) {
				if (!marshMallowPermission.checkPermissionForExternalStorage()) {
					return true;
				}
			}
		
		//actionforgallery
		
				if (action.equals("choosePhoto")){
					minSize=args.getString(0);
					maxSize=args.getString(1);
					locale = args.getString(2);
					formats=args.getString(3);
					Intent intent = new Intent(this.cordova.getActivity().getApplicationContext(), OpenGalleryActivity.class);
					this.cordova.startActivityForResult((CordovaPlugin) this, intent, 0);
			    }
				
				return true;
				
			}
}
