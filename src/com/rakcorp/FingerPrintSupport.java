package com.rakcorp;

import org.apache.cordova.CallbackContext;

import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.content.Intent;
import android.os.Build;
import android.support.v4.hardware.fingerprint.FingerprintManagerCompat;

public class FingerPrintSupport extends CordovaPlugin {
	private CallbackContext callbackContext;
	@Override
	public boolean execute(String action, JSONArray args,
			final CallbackContext callbackContext) throws JSONException {
		this.callbackContext = callbackContext;
		JSONObject fingerPrintAvailable = new JSONObject();
		System.out.println("sundeep in");
		
		if (Build.VERSION.SDK_INT > Build.VERSION_CODES.LOLLIPOP_MR1) {

			FingerprintManagerCompat fingerprintManagerCompat = FingerprintManagerCompat
					.from(this.cordova.getActivity().getApplicationContext());
			try {
				if (!fingerprintManagerCompat.isHardwareDetected()) {
					fingerPrintAvailable.put("Support", "false");
					fingerPrintAvailable.put("enrolled", "true");
					this.callbackContext.success(fingerPrintAvailable);
					return true;
					// Device doesn't support fingerprint authentication
				} else if (!fingerprintManagerCompat.hasEnrolledFingerprints()) {
					// User hasn't enrolled any fingerprints to authenticate
					// with
					fingerPrintAvailable.put("Support", "true");
					fingerPrintAvailable.put("enrolled", "true");
					this.callbackContext.success(fingerPrintAvailable);
					return true;
				} else {
					// Everything is ready for fingerprint authentication
					fingerPrintAvailable.put("Support", "true");
					fingerPrintAvailable.put("enrolled", "false");
					this.callbackContext.success(fingerPrintAvailable);
					return true;
				}
			} catch (Exception e) {
				return false;
			}
		}
		else
			
		{
			try 
			{
			fingerPrintAvailable.put("Support", "false");
			fingerPrintAvailable.put("enrolled", "true");
			}
			catch(Exception e )
			{
				return false;
			}
			this.callbackContext.success(fingerPrintAvailable);
			return true;
		}

	

	}

}
