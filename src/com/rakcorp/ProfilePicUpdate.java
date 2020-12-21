package com.rakcorp;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.content.Intent;
import android.hardware.Camera;
import android.os.Build;



public class ProfilePicUpdate extends CordovaPlugin{
	
	 public static CallbackContext profile_callbackContext;
	 
		Camera mCamera;
		public static String locale= "";
		public static String maxSize= "";
		public static String minSize= "";
	public boolean execute(String action, JSONArray args, final CallbackContext callbackContext) throws JSONException {
		ProfilePicUpdate.profile_callbackContext = callbackContext;
		
		 UserPermissionUtility marshMallowPermission = new UserPermissionUtility(
					this.cordova.getActivity());
			if (Build.VERSION.SDK_INT > Build.VERSION_CODES.LOLLIPOP_MR1) {
				if (!marshMallowPermission.checkPermissionForCamera()) {
					return true;
				}
			}
		
		//actionforCamera
		
		if (action.equals("capturePhoto")){
			minSize=args.getString(0);
			maxSize=args.getString(1);
			locale = args.getString(2);
			Intent intent = new Intent(this.cordova.getActivity().getApplicationContext(), OpenCameraActivity.class);
			this.cordova.startActivityForResult((CordovaPlugin) this, intent, 1);
	    }
	
		
		return true;
	}
	
	
	

	
	

}
