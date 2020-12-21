package com.rakcorp;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;

import android.content.Context;

/**
 * @author Ravi_Rudra
 * 
 */
public class JSONCredInitializer extends CordovaPlugin {
	@Override
	public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
		System.out.println("JSONCredInitializer called");
		if (action.equals("getCreds")) {
			try {
				Context context = this.cordova.getActivity().getApplicationContext();
				DeviceDataFinder dataFinder = new DeviceDataFinder();
				String data[] = dataFinder.getDeviceData(context);
				callbackContext.success(data[0] + ":" + data[1]);
				return true;
			} catch (Exception e) {
				e.printStackTrace();
				callbackContext.error("Failed initializing JSONCredInitializer");
				return false;
			}
		}
		return false;
	}
}
