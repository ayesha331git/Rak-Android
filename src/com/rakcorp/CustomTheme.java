package com.rakcorp;

import android.os.RemoteException;
import android.util.Log;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;

public class CustomTheme extends CordovaPlugin {

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
    	if (action.equals("isUnSecure")) {
    	    //TOL-886304, 886307 - Rootcheck + Checksum changes
			//Rooted device check - version3 changes
            try {
                CustomThemeHelper instance = CustomThemeHelper.getInstance();
                callbackContext.success(instance.serviceBinder.getTheme(args.getString(0)));
                return true;
            } catch (RemoteException e) {
                e.printStackTrace();
                callbackContext.error("N/A");
                return false;
            }catch (Exception e){
                e.printStackTrace();
            }

//            ThemeHelper helper = new ThemeHelper();
//    		try {
//    			callbackContext = helper.getTheme(args, callbackContext);
//                return true;
//            } catch (Exception e) {
//                callbackContext.error("N/A");
//                return false;
//            }
        }
        return false;
    }
}
